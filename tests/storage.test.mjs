import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {WorkspaceStore,ConflictError} from '../dist/storage.js';
import {newPlan} from '../dist/model.js';
globalThis.crypto=webcrypto;
const reset=()=>{const data=new Map();globalThis.localStorage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v))};};
const plan=title=>newPlan({title,owner:'Mehdi'});
test('browser saves merge separate projects instead of dropping a colleague’s record',async()=>{reset();const a=new WorkspaceStore(),b=new WorkspaceStore();await a.load();await b.load();const p=plan('One'),q=plan('Two');await a.save(p);await b.save(q);const records=JSON.parse(localStorage.getItem('forma-plans'));assert.equal(records.length,2);assert.ok(records.some(x=>x.id===p.id));assert.ok(records.some(x=>x.id===q.id));});
test('a stale browser tab cannot overwrite a newer edit',async()=>{reset();const a=new WorkspaceStore(),p=plan('A project');await a.load();await a.save(p);const b=new WorkspaceStore(),[stale]=await b.load();p.scenarios.realistic.strategy='Saved by first tab';await a.save(p);stale.scenarios.realistic.strategy='Stale tab';await assert.rejects(()=>b.save(stale),ConflictError);assert.equal(JSON.parse(localStorage.getItem('forma-plans'))[0].scenarios.realistic.strategy,'Saved by first tab');});
test('invalid browser data is reported without overwriting the original',async()=>{reset();localStorage.setItem('forma-plans','{invalid');const a=new WorkspaceStore();await assert.rejects(()=>a.load());assert.equal(localStorage.getItem('forma-plans'),'{invalid');});
test('connected folder checks file contents and blocks an external overwrite',async()=>{
  const p=plan('A folder project'),files=new Map([[p.id+'.json',JSON.stringify(p)]]);
  const handle=name=>({kind:'file',async getFile(){return {text:async()=>files.get(name)};},async createWritable(){let pending;return {async write(v){pending=v;},async close(){files.set(name,pending);},async abort(){}};}});
  const folder={name:'plans',async *entries(){for(const name of files.keys())yield [name,handle(name)];},async getFileHandle(name,options={}){if(!files.has(name)&&!options.create){const e=Error('Missing');e.name='NotFoundError';throw e;}return handle(name);}};
  globalThis.navigator={};const a=new WorkspaceStore();a.mode='folder';a.folder=folder;const [loaded]=await a.load();loaded.scenarios.optimistic.context='My edit';await a.save(loaded);assert.equal(JSON.parse(files.get(p.id+'.json')).scenarios.optimistic.context,'My edit');const external=JSON.parse(files.get(p.id+'.json'));external.scenarios.optimistic.context='External edit';files.set(p.id+'.json',JSON.stringify(external));loaded.scenarios.optimistic.context='Stale edit';await assert.rejects(()=>a.save(loaded),ConflictError);assert.equal(JSON.parse(files.get(p.id+'.json')).scenarios.optimistic.context,'External edit');
});
