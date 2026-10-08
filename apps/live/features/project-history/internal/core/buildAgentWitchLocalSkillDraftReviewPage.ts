import type { ProjectHistorySkillgenDraftReviewItem } from "./projectHistorySkillgenDraftReview.type";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const PAGE_CSS = `:root{
  --awc-bg:#e8e6e1; --awc-surface:#ffffff; --awc-surface-2:#f7f6f4;
  --awc-tile:#f4f3f0; --awc-tile-2:#ebe9e4; --awc-fill:#e9e7e2;
  --awc-accent-soft:#e4ecff; --awc-accent-soft-2:#d6e2ff;
  --awc-border:#e0e5ed; --awc-line:#e0e5ed; --awc-border-strong:#cbd2de; --awc-control-border:#748094;
  --awc-fg:#101828; --awc-fg-muted:#475467; --awc-fg-subtle:#566073;
  --awc-blue-600:#2150d6; --awc-primary:var(--awc-blue-600);
  --font-ui:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  --font-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  --r-s:6px; --r-m:10px; color-scheme:light;
}
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;background:var(--awc-bg);color:var(--awc-fg);font:14px/1.5 var(--font-ui);padding:16px}
button,input,textarea{font:inherit;color:inherit}
:focus-visible{outline:2px solid var(--awc-control-border);outline-offset:2px;border-radius:var(--r-s)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.win{max-width:1280px;margin:0 auto;min-height:560px;height:100%;display:flex;flex-direction:column;background:var(--awc-surface);border:1px solid var(--awc-border);border-radius:12px;overflow:hidden}
.top{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--awc-line);background:var(--awc-surface-2);flex-wrap:wrap}
.brand{font-weight:600}.crumb{color:var(--awc-fg-subtle);display:flex;align-items:center;gap:6px;min-width:0}
.crumb a{color:inherit;text-decoration:none}.crumb b{color:var(--awc-fg);font-weight:500}.top .sp{flex:1}
.pc{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--awc-fg-muted);background:var(--awc-tile);border:1px solid var(--awc-border);padding:2px 10px;border-radius:99px}
.dot{width:7px;height:7px;border-radius:50%;background:#12804a}.pc.off .dot{background:transparent;border:1.5px solid var(--awc-control-border)}
.banner{padding:8px 16px;background:var(--awc-tile-2);border-bottom:1px solid var(--awc-line);font-size:13px}
.body{flex:1;display:grid;grid-template-columns:minmax(260px,320px) 1fr;min-height:0}
.rail{border-right:1px solid var(--awc-line);display:flex;flex-direction:column;min-height:0;background:var(--awc-surface-2)}
.rail-h{display:flex;align-items:center;gap:6px;padding:14px 16px 8px}.rail-h h1{font-size:15px;margin:0;font-weight:600}
.count{font-size:12px;color:var(--awc-fg-subtle)}
.search{margin:0 16px 10px}.search input{width:100%;padding:7px 10px;border:1px solid var(--awc-control-border);border-radius:var(--r-s);background:var(--awc-surface)}
.list{list-style:none;margin:0;padding:0 8px 12px;overflow:auto;flex:1}
.item{display:grid;gap:2px;width:100%;text-align:left;border:1px solid transparent;background:none;padding:10px;border-radius:var(--r-m);cursor:pointer}
.item:hover{background:var(--awc-tile)}.item[aria-current="true"]{background:var(--awc-accent-soft);border-color:var(--awc-accent-soft-2)}
.item .n{font-weight:500;display:flex;gap:6px;align-items:center;min-width:0}
.item .n>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.item .p{color:var(--awc-fg-muted);font-size:13px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.item .m{color:var(--awc-fg-subtle);font-size:12px}.unsaved{width:6px;height:6px;border-radius:50%;background:var(--awc-fg);flex:none}
.main{display:flex;flex-direction:column;min-width:0;min-height:0}
.ed-h{display:flex;align-items:center;gap:8px;padding:12px 20px;border-bottom:1px solid var(--awc-line);flex-wrap:wrap}
.back{display:none}.path{font:12px var(--font-mono);color:var(--awc-fg-subtle);overflow-wrap:anywhere;min-width:0;flex:1}
.ed{flex:1;overflow:auto;padding:20px;display:grid;gap:16px;align-content:start;max-width:860px;width:100%}
label.l{font-size:12px;font-weight:500;color:var(--awc-fg-muted);display:block;margin-bottom:4px}
.title-in{width:100%;font-size:20px;font-weight:600;padding:6px 10px;border:1px solid var(--awc-border);border-radius:var(--r-s);background:var(--awc-surface)}
.meta{font-size:12px;color:var(--awc-fg-subtle);display:flex;gap:12px;flex-wrap:wrap}
.tags{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:5px;border:1px solid var(--awc-control-border);border-radius:var(--r-s);background:var(--awc-surface)}
.tag{display:inline-flex;align-items:center;gap:4px;background:var(--awc-tile-2);border-radius:99px;padding:1px 4px 1px 10px;font-size:12px}
.tag button{border:0;background:none;cursor:pointer;width:20px;height:20px;border-radius:50%;color:var(--awc-fg-muted)}
.tags input{border:0;outline:0;flex:1;min-width:100px;padding:3px 4px;background:transparent}
.seg{display:inline-flex;border:1px solid var(--awc-border);border-radius:var(--r-s);padding:2px;background:var(--awc-tile)}
.seg button{border:0;background:none;padding:3px 10px;border-radius:4px;cursor:pointer;font-size:12px;color:var(--awc-fg-muted)}
.seg button[aria-pressed="true"]{background:var(--awc-surface);color:var(--awc-fg);box-shadow:0 0 0 1px var(--awc-border)}
.body-row{display:flex;justify-content:space-between;align-items:end;gap:8px;margin-bottom:4px}
textarea{width:100%;min-height:320px;resize:vertical;padding:12px;border:1px solid var(--awc-control-border);border-radius:var(--r-s);background:var(--awc-surface);font:13px/1.6 var(--font-mono)}
.preview{min-height:320px;padding:4px 14px;border:1px solid var(--awc-border);border-radius:var(--r-s);background:var(--awc-surface-2);overflow-wrap:anywhere}
.preview code{font:12.5px var(--font-mono);background:var(--awc-tile-2);padding:1px 4px;border-radius:4px}
.preview pre{background:var(--awc-tile-2);padding:10px;border-radius:var(--r-s);overflow-x:auto}.preview pre code{background:none;padding:0}
.bar{display:flex;align-items:center;gap:8px;padding:12px 20px;border-top:1px solid var(--awc-line);background:var(--awc-surface-2);flex-wrap:wrap}
.bar .sp{flex:1}.status{font-size:12px;color:var(--awc-fg-subtle)}
.btn{border:1px solid var(--awc-control-border);background:var(--awc-surface);padding:6px 14px;border-radius:var(--r-s);cursor:pointer;font-weight:500;white-space:nowrap}
.btn:hover{background:var(--awc-tile)}.btn:disabled{opacity:.45;cursor:not-allowed}
.btn.pri{background:var(--awc-primary);border-color:var(--awc-primary);color:#fff}.btn.pri:hover{opacity:.92}
.btn.ghost{border-color:transparent;background:none}.btn.ghost:hover{background:var(--awc-tile)}
.confirm{display:flex;align-items:center;gap:8px;background:var(--awc-tile-2);border:1px solid var(--awc-border-strong);border-radius:var(--r-s);padding:4px 4px 4px 10px;font-size:13px}
.state{flex:1;display:grid;place-items:center;padding:40px 20px;text-align:center}
.state .box{display:grid;gap:10px;justify-items:center;max-width:320px}.state h2{margin:0;font-size:16px}.state p{margin:0;color:var(--awc-fg-muted)}
.glyph{width:44px;height:44px;border-radius:12px;background:var(--awc-tile-2);display:grid;place-items:center;color:var(--awc-fg-muted);font:600 18px var(--font-mono)}
.sk{background:var(--awc-fill);border-radius:6px;height:12px;animation:pulse 1.4s ease-in-out infinite}@keyframes pulse{50%{opacity:.5}}
.info{position:relative;display:inline-flex}
.info>button{width:18px;height:18px;border-radius:50%;border:1px solid var(--awc-control-border);background:var(--awc-surface);font-size:11px;line-height:1;cursor:help;color:var(--awc-fg-muted);padding:0}
.tip{position:absolute;left:0;top:calc(100% + 6px);z-index:5;width:max-content;max-width:240px;background:var(--awc-fg);color:var(--awc-surface);font-size:12px;padding:6px 8px;border-radius:var(--r-s);font-weight:400}
.info:not(:hover):not(:focus-within) .tip{display:none}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--awc-fg);color:var(--awc-surface);padding:8px 14px;border-radius:var(--r-s);font-weight:500;z-index:20}
@media (max-width:767px){
  body{padding:0}.win{border-radius:0;border-inline:0;min-height:100%}.body{grid-template-columns:1fr}
  .rail{border-right:0}.body.detail .rail{display:none}.body:not(.detail) .main{display:none}
  .back{display:inline-flex}.ed{padding:16px}.ed-h,.bar{padding-inline:16px}
  .bar .btn{flex:1}.bar .sp{display:none}.status{width:100%}
}
`;

const PAGE_CLIENT_JS = `(()=>{
const BOOT=window.__AW_SKILL_DRAFT_BOOT__;
const API='/api/local/projects/'+encodeURIComponent(BOOT.projectId)+'/skill-drafts';
const pad=n=>String(n).padStart(2,'0');
const fmt=iso=>{const d=new Date(iso),t=new Date(),y=new Date(t);y.setDate(t.getDate()-1);
  const hm=pad(d.getHours())+':'+pad(d.getMinutes());
  if(d.toDateString()===t.toDateString())return 'Today '+hm;
  if(d.toDateString()===y.toDateString())return 'Yesterday '+hm;
  return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+hm};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let S={mode:'ready',drafts:BOOT.drafts.slice(),sel:BOOT.drafts[0]?BOOT.drafts[0].id:null,edits:{},tab:'edit',confirm:false,detail:false,q:'',online:BOOT.online};
const view=document.getElementById('view');
const cur=()=>S.drafts.find(d=>d.id===S.sel);
const working=d=>S.edits[d.id]||d;
const dirty=d=>!!S.edits[d.id];
const preview=t=>t.replace(/^#+\\s+.*$/m,'').replace(/[#*\`>\\-\\d.]/g,' ').replace(/\\s+/g,' ').trim();
function md(src){
  const L=src.split('\\n');let o='',i=0,list=null;
  const inl=s=>esc(s).replace(/\`([^\`]+)\`/g,'<code>$1</code>').replace(/\\*\\*([^*]+)\\*\\*/g,'<strong>$1</strong>');
  const close=()=>{if(list){o+='</'+list+'>';list=null}};
  while(i<L.length){const l=L[i];
    if(l.startsWith('\`\`\`')){close();let c='';i++;while(i<L.length&&!L[i].startsWith('\`\`\`'))c+=L[i++]+'\\n';o+='<pre><code>'+esc(c)+'</code></pre>';i++;continue}
    let m;
    if(m=l.match(/^(#{1,3})\\s+(.*)/)){close();o+='<h'+m[1].length+'>'+inl(m[2])+'</h'+m[1].length+'>'}
    else if(m=l.match(/^\\d+\\.\\s+(.*)/)){if(list!=='ol'){close();o+='<ol>';list='ol'}o+='<li>'+inl(m[1])+'</li>'}
    else if(m=l.match(/^[-*]\\s+(.*)/)){if(list!=='ul'){close();o+='<ul>';list='ul'}o+='<li>'+inl(m[1])+'</li>'}
    else if(l.trim()===''){close()}
    else{close();o+='<p>'+inl(l)+'</p>'}
    i++}
  close();return o||'<p style="color:var(--awc-fg-subtle)">Nothing to preview.</p>';
}
function stateBox(g,h,p,btn){return '<div class="state"><div class="box"><div class="glyph" aria-hidden="true">'+g+'</div><h2>'+h+'</h2>'+(p?'<p>'+p+'</p>':'')+(btn||'')+'</div></div>'}
async function api(method, path, body){
  const res=await fetch(path,{method,headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined});
  const data=await res.json().catch(()=>({ok:false}));
  if(!res.ok||data.ok===false) throw new Error(data.error||('http_'+res.status));
  return data;
}
async function reload(){
  S.mode='loading';render();
  try{
    const data=await api('GET', API);
    S.drafts=(data.drafts||[]).map(d=>({id:d.id,title:d.title,body:d.body,tags:d.tags||[],source:d.source||'History',updated:d.updatedAt||d.updated,pathLabel:d.pathLabel||('skills/_drafts/'+d.id)}));
    if(!S.drafts.find(d=>d.id===S.sel)) S.sel=S.drafts[0]?S.drafts[0].id:null;
    S.edits={};S.mode=S.drafts.length?'ready':'empty';
  }catch(e){S.mode='error'}
  render();
}
function render(){
  const off=!S.online;
  document.getElementById('offline').hidden=!off;
  document.getElementById('pc').classList.toggle('off',off);
  document.getElementById('pcText').textContent=off?'This computer · offline':'This computer · online';
  view.classList.toggle('detail',S.detail);
  if(S.mode==='loading'){
    view.innerHTML='<aside class="rail" aria-busy="true"><div class="rail-h"><h1>Drafts</h1></div><div style="padding:8px 16px;display:grid;gap:18px">'+[1,2,3,4].map(()=>'<div style="display:grid;gap:6px"><div class="sk" style="width:70%"></div><div class="sk" style="width:95%"></div><div class="sk" style="width:35%;height:10px"></div></div>').join('')+'</div></aside><section class="main">'+stateBox('…','Loading drafts','')+'</section>';
    return;
  }
  if(S.mode==='error'){
    view.innerHTML='<section class="main" style="grid-column:1/-1;display:flex">'+stateBox('!','Couldn’t read drafts','The drafts folder on this computer isn’t readable.','<button class="btn pri" id="retry">Try again</button>')+'</section>';
    document.getElementById('retry').onclick=()=>void reload();
    return;
  }
  const items=S.drafts.filter(d=>{const w=working(d);return !S.q||(w.title+' '+w.body+' '+(w.tags||[]).join(' ')).toLowerCase().includes(S.q.toLowerCase())});
  if(S.mode==='empty'||S.drafts.length===0){
    view.innerHTML='<section class="main" style="grid-column:1/-1;display:flex">'+stateBox('0','No drafts.','New drafts show up here.')+'</section>';
    return;
  }
  const rail='<aside class="rail" aria-label="Drafts"><div class="rail-h"><h1>Drafts</h1><span class="count">'+S.drafts.length+'</span><span class="info"><button type="button" aria-describedby="tipDrafts" aria-label="More info">i</button><span class="tip" role="tooltip" id="tipDrafts">Made from project history and work on this computer. Nothing runs until you publish.</span></span></div><div class="search"><label for="q" class="sr">Search drafts</label><input id="q" type="search" placeholder="Search" value="'+esc(S.q)+'" autocomplete="off"></div><ul class="list" role="list">'+(items.length?items.map(d=>{const w=working(d);return '<li><button class="item" data-id="'+esc(d.id)+'" aria-current="'+(d.id===S.sel)+'"><span class="n">'+(dirty(d)?'<span class="unsaved" title="Unsaved changes"></span><span class="sr">Unsaved. </span>':'')+'<span>'+esc(w.title||'Untitled')+'</span></span><span class="p">'+esc(preview(w.body))+'</span><span class="m">'+esc(d.source)+' · '+fmt(d.updated)+'</span></button></li>'}).join(''):'<li class="status" style="padding:10px">No matches.</li>')+'</ul></aside>';
  const d=cur(); if(!d){view.innerHTML=rail;return}
  const w=working(d), isD=dirty(d);
  const main='<section class="main" aria-label="Draft"><div class="ed-h"><button class="btn ghost back" id="back" aria-label="Back to drafts">‹ Drafts</button><span class="path" title="Draft file">'+esc(d.pathLabel||('skills/_drafts/'+d.id))+'</span><div class="seg" role="group" aria-label="Body view"><button aria-pressed="'+(S.tab==='edit')+'" data-tab="edit">Edit</button><button aria-pressed="'+(S.tab==='preview')+'" data-tab="preview">Preview</button></div></div><div class="ed"><div><label class="l" for="title">Title</label><input id="title" class="title-in" value="'+esc(w.title)+'" autocomplete="off"></div><div class="meta"><span>From '+(d.source==='History'?'project history':'this computer')+'</span><span>Updated '+fmt(d.updated)+'</span></div><div><label class="l" for="tagIn">Tags <span style="font-weight:400;color:var(--awc-fg-subtle)">optional</span></label><div class="tags">'+(w.tags||[]).map((t,i)=>'<span class="tag">'+esc(t)+'<button type="button" data-rm="'+i+'" aria-label="Remove tag '+esc(t)+'">×</button></span>').join('')+'<input id="tagIn" placeholder="Add tag" autocomplete="off"></div></div><div><div class="body-row"><label class="l" for="bodyIn" style="margin:0">Skill</label><span class="status">Markdown</span></div>'+(S.tab==='edit'?'<textarea id="bodyIn" spellcheck="false">'+esc(w.body)+'</textarea>':'<div class="preview" tabindex="0" aria-label="Preview">'+md(w.body)+'</div>')+'</div></div><div class="bar"><span class="status" role="status">'+(isD?'Unsaved changes':'Saved')+'</span><span class="sp"></span>'+(S.confirm?'<span class="confirm" role="alertdialog" aria-label="Confirm discard">Discard this draft?<button class="btn" id="cfYes">Discard</button><button class="btn ghost" id="cfNo">Keep</button></span>':'<button class="btn ghost" id="discard">Discard</button><button class="btn" id="save" '+(isD?'':'disabled')+'>Save</button><button class="btn pri" id="publish" '+(off?'disabled title="Publish when online"':'')+' '+(w.title.trim()&&w.body.trim()?'':'disabled')+'>Publish</button>')+'</div></section>';
  view.innerHTML=rail+main;wire();
}
function edit(patch){const d=cur();const w={...working(d),...patch};
  if(w.title===d.title&&w.body===d.body&&(w.tags||[]).join('|')===(d.tags||[]).join('|'))delete S.edits[d.id];else S.edits[d.id]=w;
  renderSoft()}
function renderSoft(){const st=view.querySelector('.bar .status');const d=cur();if(st)st.textContent=dirty(d)?'Unsaved changes':'Saved';
  const sv=document.getElementById('save');if(sv)sv.disabled=!dirty(d);
  const pb=document.getElementById('publish');const w=working(d);if(pb)pb.disabled=!S.online||!(w.title.trim()&&w.body.trim());
  const it=view.querySelector('.item[data-id="'+d.id+'"]');if(it){it.querySelector('.n').innerHTML=(dirty(d)?'<span class="unsaved" title="Unsaved changes"></span><span class="sr">Unsaved. </span>':'')+'<span>'+esc(w.title||'Untitled')+'</span>';it.querySelector('.p').textContent=preview(w.body)}}
async function save(){const d=cur();if(!dirty(d))return;const w=working(d);
  try{const data=await api('PUT', API+'/'+encodeURIComponent(d.id),{title:w.title,body:w.body,tags:w.tags||[]});
    Object.assign(d,{title:data.draft.title,body:data.draft.body,tags:data.draft.tags||[],updated:data.draft.updatedAt});delete S.edits[d.id];render();toast('Saved.')}
  catch(e){toast('Could not save.')}}
async function discard(){const d=cur();
  try{await api('DELETE', API+'/'+encodeURIComponent(d.id));const i=S.drafts.findIndex(x=>x.id===d.id);S.drafts.splice(i,1);delete S.edits[d.id];
    S.sel=S.drafts.length?S.drafts[Math.min(i,S.drafts.length-1)].id:null;S.confirm=false;S.detail=false;S.mode=S.drafts.length?'ready':'empty';render();toast('Discarded.')}
  catch(e){S.confirm=false;render();toast('Could not discard.')}}
async function publish(){const d=cur();const w=working(d);
  try{await api('POST', API+'/'+encodeURIComponent(d.id)+'/publish',{title:w.title,body:w.body});
    const i=S.drafts.findIndex(x=>x.id===d.id);S.drafts.splice(i,1);delete S.edits[d.id];
    S.sel=S.drafts.length?S.drafts[Math.min(i,S.drafts.length-1)].id:null;S.detail=false;S.mode=S.drafts.length?'ready':'empty';render();toast('Published.')}
  catch(e){toast('Could not publish.')}}
function wire(){
  view.querySelectorAll('.item').forEach(b=>b.onclick=()=>{S.sel=b.dataset.id;S.confirm=false;S.detail=true;render();const t=document.getElementById('title');if(t&&matchMedia('(max-width:767px)').matches)t.focus()});
  const q=document.getElementById('q');if(q)q.oninput=()=>{S.q=q.value;const p=q.selectionStart;render();const n=document.getElementById('q');n.focus();n.setSelectionRange(p,p)};
  view.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{S.tab=b.dataset.tab;render();const n=view.querySelector('[data-tab="'+S.tab+'"]');if(n)n.focus()});
  const t=document.getElementById('title');if(t)t.oninput=()=>edit({title:t.value});
  const b=document.getElementById('bodyIn');if(b)b.oninput=()=>edit({body:b.value});
  const ti=document.getElementById('tagIn');
  if(ti){ti.onkeydown=e=>{const v=ti.value.trim().toLowerCase().replace(/,/g,'');const w=working(cur());
    if((e.key==='Enter'||e.key===',')&&v){e.preventDefault();if(!(w.tags||[]).includes(v)){edit({tags:[...(w.tags||[]),v]});render()}document.getElementById('tagIn').focus()}
    else if(e.key==='Backspace'&&!ti.value&&(w.tags||[]).length){edit({tags:w.tags.slice(0,-1)});render();document.getElementById('tagIn').focus()}};
  view.querySelectorAll('[data-rm]').forEach(x=>x.onclick=()=>{const w=working(cur());edit({tags:w.tags.filter((_,i)=>i!=+x.dataset.rm)});render();document.getElementById('tagIn').focus()})}
  const bk=document.getElementById('back');if(bk)bk.onclick=()=>{S.detail=false;S.confirm=false;render();const c=view.querySelector('.item[data-id="'+S.sel+'"]');if(c)c.focus()};
  const on=(id,f)=>{const e=document.getElementById(id);if(e)e.onclick=f};
  on('save',()=>void save());
  on('discard',()=>{S.confirm=true;render();document.getElementById('cfNo').focus()});
  on('cfNo',()=>{S.confirm=false;render();const d=document.getElementById('discard');if(d)d.focus()});
  on('cfYes',()=>void discard());
  on('publish',()=>void publish());
}
let tt;function toast(msg){const h=document.getElementById('toastHost');clearTimeout(tt);h.innerHTML='<div class="toast">'+esc(msg)+'</div>';tt=setTimeout(()=>h.innerHTML='',4000)}
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'){e.preventDefault();if(S.mode==='ready')void save()}
  if(e.key==='Escape'&&S.confirm){S.confirm=false;render()}});
if(!S.drafts.length) S.mode='empty';
render();
})();
`;

/**
 * AgentWitch Local — skill draft review (EN PASS).
 * System stack; primary = awc-blue-600; no demo state select; no Google Fonts.
 */
export const buildAgentWitchLocalSkillDraftReviewPage = (input: {
  readonly projectId: string;
  readonly projectName: string;
  readonly online: boolean;
  readonly drafts: readonly ProjectHistorySkillgenDraftReviewItem[];
}): string => {
  const boot = JSON.stringify({
    projectId: input.projectId,
    projectName: input.projectName,
    online: input.online,
    drafts: input.drafts.map((d) => ({
      id: d.id,
      title: d.title,
      body: d.body,
      tags: d.tags,
      source: d.source,
      updated: d.updatedAt,
      pathLabel: d.pathLabel,
    })),
  }).replaceAll("<", "\\u003c");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>AgentWitch – AWL skill draft review</title>
<style>${PAGE_CSS}</style>
</head>
<body>
<div class="win" role="application" aria-label="AgentWitch Local">
  <header class="top">
    <span class="brand">AgentWitch</span>
    <nav class="crumb" aria-label="Location">
      <a href="/project?id=${encodeURIComponent(input.projectId)}">${escapeHtml(input.projectName || "Project")}</a>
      <span aria-hidden="true">/</span><b>Skill drafts</b>
    </nav>
    <span class="sp"></span>
    <span class="pc${input.online ? "" : " off"}" id="pc"><span class="dot" aria-hidden="true"></span><span id="pcText">This computer · ${input.online ? "online" : "offline"}</span></span>
  </header>
  <div class="banner" id="offline" ${input.online ? "hidden" : ""} role="status">Offline. Saves stay on this computer. Publish when back online.</div>
  <div id="view" class="body"></div>
</div>
<div id="toastHost" aria-live="polite"></div>
<script>window.__AW_SKILL_DRAFT_BOOT__=${boot};</script>
<script>${PAGE_CLIENT_JS}</script>
</body>
</html>`;
};
