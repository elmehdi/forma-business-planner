import {validatePlan,migratePlan} from './model.js';
export class ConflictError extends Error {constructor(){super('This plan changed elsewhere. Reload it before saving.');this.name='ConflictError';}}
export const decodePlans=values=>values.map(p=>migratePlan(validatePlan(p)));
const folderDB=()=>new Promise((resolve,reject)=>{const r=indexedDB.open('forma-workspace',1);r.onupgradeneeded=()=>r.result.createObjectStore('settings');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
async function rememberFolder(handle){const db=await folderDB();await new Promise((resolve,reject)=>{const tx=db.transaction('settings','readwrite');tx.objectStore('settings').put(handle,'directory');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});db.close();}
async function recalledFolder(){const db=await folderDB();return new Promise((resolve,reject)=>{const r=db.transaction('settings').objectStore('settings').get('directory');r.onsuccess=()=>{resolve(r.result);db.close();};r.onerror=()=>reject(r.error);});}
export class WorkspaceStore {
  constructor(){this.mode='browser';this.revisions=new Map();this.folder=null;}
  async initial(){
    try{const handle=await recalledFolder();if(handle&&await handle.queryPermission({mode:'readwrite'})==='granted'){this.folder=handle;this.mode='folder';return await this.load();}}catch{}
    try{const r=await fetch('/api/plans',{signal:AbortSignal.timeout(2500)});if(r.ok&&r.headers.get('content-type')?.includes('application/json')){const result=await r.json();if(result.plans&&result.revisions){const plans=decodePlans(result.plans);this.mode='server';this.revisions=new Map(Object.entries(result.revisions));return plans;}}}catch{}
    return this.load();
  }
  async load(){
    if(this.mode==='server'){const r=await fetch('/api/plans',{cache:'no-store'});if(!r.ok)throw Error('Could not read workspace files.');const data=await r.json();const plans=decodePlans(data.plans);this.revisions=new Map(Object.entries(data.revisions));return plans;}
    if(this.mode==='folder'){
      const originals=[],revisions=new Map();
      for await(const [name,handle] of this.folder.entries()){if(handle.kind!=='file'||!name.endsWith('.json'))continue;const text=await(await handle.getFile()).text();const p=validatePlan(JSON.parse(text));if(name!==p.id+'.json')throw Error('A plan filename does not match its ID.');originals.push(p);revisions.set(p.id,text);}
      const plans=decodePlans(originals);this.revisions=revisions;return plans;
    }
    const values=JSON.parse(localStorage.getItem('forma-plans')||'[]');const plans=decodePlans(values);this.revisions=new Map(values.map(p=>[p.id,JSON.stringify(p)]));return plans;
  }
  async connect(){
    if(!window.showDirectoryPicker)throw Error('Folder connection needs Chrome or Edge. Use JSON export and import in this browser.');
    const handle=await window.showDirectoryPicker({id:'forma-plans',mode:'readwrite',startIn:'documents'});
    const previous={mode:this.mode,folder:this.folder,revisions:this.revisions};this.folder=handle;this.mode='folder';
    try{const plans=await this.load();try{await rememberFolder(handle);}catch{}return plans;}catch(e){Object.assign(this,previous);throw e;}
  }
  async save(plan){
    validatePlan(plan);
    if(this.mode==='server'){
      const r=await fetch('/api/plans/'+plan.id,{method:'PUT',headers:{'Content-Type':'application/json','If-Match':this.revisions.get(plan.id)||'new'},body:JSON.stringify(plan)});
      if(r.status===409)throw new ConflictError();if(!r.ok)throw Error('File save failed. Your browser copy is safe; export a backup.');const result=await r.json();this.revisions.set(plan.id,result.revision);return;
    }
    if(this.mode==='folder'){
      const write=async()=>{let handle,current;try{handle=await this.folder.getFileHandle(plan.id+'.json');current=await(await handle.getFile()).text();}catch(e){if(e.name!=='NotFoundError')throw e;}
        if(current!==this.revisions.get(plan.id))throw new ConflictError();
        if(!handle)handle=await this.folder.getFileHandle(plan.id+'.json',{create:true});const stream=await handle.createWritable();const text=JSON.stringify(plan,null,2)+'\n';try{await stream.write(text);await stream.close();}catch(e){await stream.abort().catch(()=>{});throw e;}this.revisions.set(plan.id,text);};
      if(navigator.locks)await navigator.locks.request('forma-file-'+this.folder.name+'-'+plan.id,write);else await write();return;
    }
    const values=JSON.parse(localStorage.getItem('forma-plans')||'[]');const index=values.findIndex(p=>p.id===plan.id);const current=index<0?undefined:JSON.stringify(values[index]);if(current!==this.revisions.get(plan.id))throw new ConflictError();if(index<0)values.push(plan);else values[index]=plan;localStorage.setItem('forma-plans',JSON.stringify(values));this.revisions.set(plan.id,JSON.stringify(plan));
  }
  backup(plans){localStorage.setItem('forma-recovery',JSON.stringify(plans));}
}
