import http from 'node:http';
import { readFile, writeFile, readdir, mkdir, rename } from 'node:fs/promises';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { demoPlans, validatePlan } from './dist/model.js';
import { webcrypto, createHash } from 'node:crypto';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
const root=dirname(fileURLToPath(import.meta.url)), dist=join(root,'dist'), data=process.env.FORMA_DATA_DIR?resolve(process.env.FORMA_DATA_DIR):join(root,'data/plans');
await mkdir(data,{recursive:true});
// A marker avoids repopulating an intentionally empty workspace.
try { await readFile(join(data,'.initialized')); }
catch { const existing=(await readdir(data)).filter(f=>f.endsWith('.json'));if(!existing.length)for(const p of demoPlans())await writeFile(join(data,p.id+'.json'),JSON.stringify(p,null,2)+'\n');await writeFile(join(data,'.initialized'),'Forma workspace initialized\n'); }
const revision=text=>createHash('sha256').update(text).digest('hex');
const writes=new Map();
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'};
export const server=http.createServer(async(req,res)=>{
  const json=(status,value)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
  try {
    const url=new URL(req.url,'http://localhost');
    if(url.pathname.startsWith('/api/')){
      // Only the same local origin may read or mutate plan files.
      const host=req.headers.host;
      if(req.headers.origin&&req.headers.origin!==`http://${host}`&&req.headers.origin!==`https://${host}`)return json(403,{error:'Origin is not allowed.'});
      if(req.headers['sec-fetch-site']==='cross-site')return json(403,{error:'Cross-site requests are not allowed.'});
      if(req.method==='GET'&&url.pathname==='/api/plans'){
        const files=(await readdir(data)).filter(f=>f.endsWith('.json')).sort();const revisions={};const plans=await Promise.all(files.map(async f=>{const raw=await readFile(join(data,f),'utf8');const p=validatePlan(JSON.parse(raw));revisions[p.id]=revision(raw);return p;}));return json(200,{plans,revisions});
      }
      const id=url.pathname.match(/^\/api\/plans\/([a-zA-Z0-9-]{1,80})$/)?.[1];
      if(req.method==='PUT'&&id){
        if(!req.headers['content-type']?.startsWith('application/json'))return json(415,{error:'JSON required.'});
        let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>8e6)return json(413,{error:'Plan is too large.'});}
        let p;try{p=validatePlan(JSON.parse(body));if(p.id!==id)throw Error('Plan ID does not match its filename.');}catch(e){return json(400,{error:e.message});}
        const write=async()=>{const path=join(data,id+'.json');let current='new';try{current=revision(await readFile(path,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
          if(req.headers['if-match']!==current)return json(409,{error:'This plan changed elsewhere. Reload it before saving.'});
          const tmp=path+'.'+webcrypto.randomUUID()+'.tmp',text=JSON.stringify(p,null,2)+'\n';await writeFile(tmp,text);await rename(tmp,path);return json(200,{saved:true,revision:revision(text)});};
        const task=(writes.get(id)||Promise.resolve()).catch(()=>{}).then(write);writes.set(id,task);try{await task;}finally{if(writes.get(id)===task)writes.delete(id);}return;
      }
      return json(404,{error:'Not found.'});
    }
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
    const path=resolve(dist,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    if(!path.startsWith(dist+'/')){res.writeHead(403);return res.end();}
    const body=await readFile(path);res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'"});res.end(req.method==='HEAD'?undefined:body);
  }catch(e){if(e.code==='ENOENT'){res.writeHead(404);res.end('Not found');}else{console.error('Request failed:',e.message);json(500,{error:'Unable to read workspace files. Check your terminal and JSON files.'});}}
});
const port=Number(process.env.PORT)||3000;
server.listen(port,'127.0.0.1',()=>console.log(`Forma is ready: http://localhost:${port}`));
