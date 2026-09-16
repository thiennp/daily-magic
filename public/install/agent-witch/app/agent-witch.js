#!/usr/bin/env node
"use strict";var Zh=Object.create;var As=Object.defineProperty;var Qh=Object.getOwnPropertyDescriptor;var ey=Object.getOwnPropertyNames;var ty=Object.getPrototypeOf,ry=Object.prototype.hasOwnProperty;var u=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var $=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},qe=(e,t)=>{for(var r in t)As(e,r,{get:t[r],enumerable:!0})},ny=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of ey(t))!ry.call(e,o)&&o!==r&&As(e,o,{get:()=>t[o],enumerable:!(n=Qh(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?Zh(ty(e)):{},ny(t||!e||!e.__esModule?As(r,"default",{value:e,enumerable:!0}):r,e));var pl,gl,Ss=u(()=>{"use strict";pl=new Set(["","loginwindow","_mbsetupuser","root"]),gl=5e3});var fl,An,_s=u(()=>{"use strict";fl=require("node:child_process"),An=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,fl.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ie,bt=u(()=>{"use strict";ie=()=>!0});var Sn,hl,oy,_n,bs=u(()=>{"use strict";Sn=g(require("node:path")),hl=require("node:url");bt();oy={},_n=()=>{if(ie()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Sn.default.dirname(Sn.default.resolve(e))}return Sn.default.dirname((0,hl.fileURLToPath)(oy.url))}});var ge,yl,wt=u(()=>{"use strict";ge="agent-witch.js",yl="command"});var vs,wl,E,sy,ws,Ws,iy,ay,ly,cy,Je,dy,Al,Sl,_l,Es,fe,bn,wn,bl,vt,Wt,v,vl,ks,Wl,El,vn,kl,Ll,he,Ls,uy,my,xe,py,L,x=u(()=>{"use strict";vs=g(require("node:fs")),wl=g(require("node:os")),E=g(require("node:path"));bs();wt();sy=_n(),ws=".agent-witch",Ws=".local-agent-witch",iy=47892,ay=47893,ly="com.agent-witch",cy="com.local-agent-witch",Je="profiles",dy="active-profile.json",Al="harness",Sl="sets",_l="manifest.json",Es="projects",fe="logs",bn="agent-witch.log",wn="agent-witch.error.log",bl="reports",vt="device-keypair.json",Wt=e=>e.trim().toLowerCase(),v=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return E.default.resolve(e);let t=E.default.resolve(sy),r=E.default.basename(t),n=E.default.basename(E.default.dirname(t));return r==="app"&&(n===ws||n===Ws)?E.default.dirname(t):r===ws||r===Ws?t:E.default.join(wl.default.homedir(),ws)},vl=(e=v())=>E.default.join(e,"app"),ks=(e=v())=>E.default.join(vl(e),ge),Wl=(e,t,r)=>t!==null?E.default.join(e,Je,t,r):E.default.join(e,r),El=e=>Wl(e.installDir,e.profileEmail,Es),vn=e=>Wl(e.installDir,e.profileEmail,fe),kl=e=>e.profileEmail!==null?E.default.join(e.installDir,Je,e.profileEmail,vt):E.default.join(e.installDir,vt),Ll=e=>E.default.basename(e)===Ws,he=(e=v())=>Ll(e)?cy:ly,Ls=(e=v())=>Ll(e)?ay:iy,uy=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Wt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Wt(t):null},my=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xe=(e=v())=>{let t=E.default.join(e,dy);if(!vs.default.existsSync(t))return null;try{let r=JSON.parse(vs.default.readFileSync(t,"utf8"));if(my(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Wt(r.email)}catch{return null}return null},py=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Wt(r):null}let t=uy();return t!==null?t:xe()},L=e=>{let t=v(),r=vl(t),n=ks(t),o=py(e);if(o!==null){let w=E.default.join(t,Je,o),A=E.default.join(w,Al),f=E.default.join(w,Es),l=E.default.join(w,fe),_=E.default.join(w,bl),h=E.default.join(w,vt),p=E.default.join(w,fe,bn),S=E.default.join(w,fe,wn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:f,logsDir:l,mainLogPath:p,errorLogPath:S,reportsDir:_,deviceKeypairPath:h,configPath:E.default.join(w,"config.json"),harnessRootDir:A,harnessManifestPath:E.default.join(A,_l),harnessSetsDir:E.default.join(A,Sl)}}let s=E.default.join(t,Al),i=E.default.join(t,Es),a=E.default.join(t,fe),c=E.default.join(t,bl),d=E.default.join(t,vt),m=E.default.join(t,fe,bn),y=E.default.join(t,fe,wn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:m,errorLogPath:y,reportsDir:c,deviceKeypairPath:d,configPath:E.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:E.default.join(s,_l),harnessSetsDir:E.default.join(s,Sl)}}});var Wn,xs,xl,B,Rl,Ye=u(()=>{"use strict";Wn=g(require("node:fs")),xs=g(require("node:path"));x();xl=e=>{let t=xs.default.join(e,Je);return Wn.default.existsSync(t)?Wn.default.readdirSync(t).filter(r=>Wn.default.statSync(xs.default.join(t,r)).isDirectory()).map(r=>Wt(r)).toSorted():[]},B=(e=v())=>{let t=he(e);return[{profileEmail:xl(e)[0]??null,launchAgentLabel:t}]},Rl=(e=v())=>xl(e)});var En,Et,Cl,Rs,Pl,gy,Tl,fy,hy,lr,yy,Il,kn=u(()=>{"use strict";En=require("node:child_process"),Et=g(require("node:fs")),Cl=g(require("node:os")),Rs=g(require("node:path")),Pl=require("node:util");Ye();x();gy=(0,Pl.promisify)(En.execFile),Tl=()=>Rs.default.join(Cl.default.homedir(),"Library","LaunchAgents"),fy=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await gy("launchctl",["bootout",r]).catch(()=>{})},hy=e=>{let t=Rs.default.join(Tl(),`${e}.plist`);Et.default.existsSync(t)&&Et.default.unlinkSync(t)},lr=(e=v())=>{let t=he(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of B(e))r.add(o.launchAgentLabel);let n=Tl();if(Et.default.existsSync(n))for(let o of Et.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},yy=e=>{(0,En.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Il=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=v();if(!Et.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=lr(e);for(let r of t)await fy(r),hy(r);return yy(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Ln,Cs=u(()=>{"use strict";_s();kn();x();Ln=(e=v())=>{for(let t of lr(e))An(t)}});var Nl,Ay,Sy,Ol,Ml=u(()=>{"use strict";Nl=require("node:child_process");Ss();Ay=e=>e.trim().toLowerCase(),Sy=e=>e==null?!1:!pl.has(Ay(e)),Ol=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Nl.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Sy(t)?t:null}catch{return null}}});var Dl,Hl,ye,cr=u(()=>{"use strict";Dl=g(require("node:os"));Ml();Hl=e=>e.trim().toLowerCase(),ye=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Ol():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??Dl.default.userInfo().username;return Hl(r)===Hl(n)}});var kt,xn,Rn=u(()=>{"use strict";Ss();Cs();cr();kt=e=>{ye()||(Ln(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},xn=(e,t=gl)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{ye()||e()},t);return()=>{clearInterval(r)}}});var Fl,Ul,jl,Cn,Pn,$l,Bl,Lt=u(()=>{"use strict";Fl=".agent-witch",Ul="memory",jl="project.json",Cn="chunks.ndjson",Pn="runs.ndjson",$l="reports",Bl=".json"});var Gl,Tn,Ps=u(()=>{"use strict";Gl=g(require("node:path"));Lt();Tn=(e,t)=>Gl.default.join(e.trim(),`${t.trim()}${Bl}`)});var Xe,Vl,zl=u(()=>{"use strict";wt();Xe=e=>`'${e.replace(/'/g,"'\\''")}'`,Vl=e=>{let t=`${e.installDir.trim()}/${"app"}/${ge}`,r=[Xe("node"),Xe(t),"report","write","--key",Xe(e.reportKey.trim()),"--agent-run-id",Xe(e.agentRunId.trim()),"--status",Xe(e.status),"--summary",Xe(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Xe(e.details.trim())),r.join(" ")}});var ae,Kl,_y,ql,In=u(()=>{"use strict";Ps();zl();ae={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Kl=e=>e===ae.COMPLETED||e===ae.FAILED,_y=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),ql=(e,t)=>{let r=Tn(t.reportsDir,t.reportKey),n=Vl({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:ae.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${_y({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var dr,Yl,Jl,Xl,by,Nn,wy,vy,ur,On,Zl,Ql,mr=u(()=>{"use strict";dr=g(require("node:fs")),Yl=g(require("node:path"));In();Ps();x();Jl=50,Xl=e=>{let t=L(),r=Tn(t.reportsDir,e);return dr.default.mkdirSync(Yl.default.dirname(r),{recursive:!0}),r},by=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Nn=e=>{let t=Xl(e);if(!dr.default.existsSync(t))return null;try{let r=JSON.parse(dr.default.readFileSync(t,"utf8"));return by(r)?r:null}catch{return null}},wy=(e,t)=>{let r=[...e,t];return r.length>Jl?r.slice(r.length-Jl):r},vy=e=>{let t=Xl(e.reportKey);dr.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},ur=e=>{let t=Nn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:wy(t?.history??[],n)};return vy(o),o},On=e=>{let t=Nn(e.reportKey);return t!==null?t:ur({reportKey:e.reportKey,agentRunId:e.agentRunId,status:ae.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Zl=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},Ql=e=>{if(e===null||!Kl(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===ae.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Wy,Ey,pr,ec,Mn,Ts=u(()=>{"use strict";In();mr();Wy=new Set(Object.values(ae)),Ey=e=>Wy.has(e),pr=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},ec=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Mn=e=>{if(e[0]!=="write")return ec(),1;let r=pr(e,"--key"),n=pr(e,"--agent-run-id"),o=pr(e,"--status"),s=pr(e,"--summary"),i=pr(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!Ey(o)?(ec(),1):(ur({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var Is,tc,xt,Hn=u(()=>{"use strict";Is=g(require("node:path")),tc=require("node:url");bt();xt=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Is.default.resolve(t);return ie()?r===Is.default.resolve(__filename):r===(0,tc.fileURLToPath)(e)}});var gr,Ns,xy,Ry,sc,G,ic,Dn,Ze=u(()=>{"use strict";gr=g(require("node:fs")),Ns=g(require("node:path"));x();xy="install-version.json",Ry=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sc=(e=v())=>Ns.default.join(e,xy),G=(e=v())=>{let t=sc(e);if(!gr.default.existsSync(t))return null;try{let r=JSON.parse(gr.default.readFileSync(t,"utf8"));return!Ry(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ic=(e,t=v())=>{let r=sc(t);gr.default.mkdirSync(Ns.default.dirname(r),{recursive:!0}),gr.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Dn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var lc,cc,dc,uc,mc,fr,Cy,Py,Ty,ac,Re,hr=u(()=>{"use strict";lc=require("node:child_process"),cc=g(require("node:fs")),dc=g(require("node:os")),uc=g(require("node:path")),mc=require("node:util");cr();fr=(0,mc.promisify)(lc.execFile),Cy=e=>uc.default.join(dc.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Py=async e=>{try{return await fr("launchctl",["print",e]),!0}catch{return!1}},Ty=async(e,t,r)=>{await Py(t)&&await fr("launchctl",["bootout",t]).catch(()=>{}),await fr("launchctl",["bootstrap",e,r]),await fr("launchctl",["enable",t])},ac=async e=>{try{return await fr("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Re=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!ye())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await ac(n))return{ok:!0};let o=Cy(e);if(!cc.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Ty(r,n,o),await ac(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var Iy,Fn,Os=u(()=>{"use strict";_s();kn();Ye();x();Iy=(e=v())=>{let t=new Set(B(e).map(r=>r.launchAgentLabel));return lr(e).filter(r=>!t.has(r))},Fn=(e=v())=>{for(let t of Iy(e))An(t)}});var Z,Rt=u(()=>{"use strict";Z=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var pc,Qe,Ms,Ny,Oy,gc,Ct,Un,Hs=u(()=>{"use strict";pc=require("node:crypto"),Qe=g(require("node:fs")),Ms=g(require("node:path"));x();Ny="self-update-log.ndjson",Oy=100,gc=(e=v())=>{let t=L(),r=t.installDir===e?t.logsDir:vn({installDir:e,profileEmail:t.profileEmail});return Ms.default.join(r,Ny)},Ct=(e,t=v())=>{let r={id:(0,pc.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=gc(t);Qe.default.mkdirSync(Ms.default.dirname(n),{recursive:!0});let o=Qe.default.existsSync(n)?Qe.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Oy+1)),JSON.stringify(r)];return Qe.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Un=(e=20,t=v())=>{let r=gc(t);if(!Qe.default.existsSync(r))return[];let n=Qe.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var fc,hc,yc=u(()=>{"use strict";fc="deps.tar.gz",hc="deps"});var Sc,Ce,et,My,_c,bc,wc=u(()=>{"use strict";Sc=require("node:child_process"),Ce=g(require("node:fs")),et=g(require("node:path"));yc();My=e=>et.default.join(e,"app",hc),_c=e=>{let t=et.default.join(e,"app"),r=et.default.join(t,fc);Ce.default.existsSync(r)&&(Ce.default.rmSync(My(e),{recursive:!0,force:!0}),Ce.default.mkdirSync(t,{recursive:!0}),(0,Sc.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Ce.default.rmSync(r,{force:!0}))},bc=e=>{Ce.default.rmSync(et.default.join(e,"node_modules"),{recursive:!0,force:!0}),Ce.default.rmSync(et.default.join(e,"package.json"),{force:!0}),Ce.default.rmSync(et.default.join(e,"package-lock.json"),{force:!0})}});var $n={};qe($n,{buildAgentWitchSelfUpdateStatus:()=>Us,fetchAgentWitchRemoteInstallBundleVersion:()=>Ds,runAgentWitchSelfUpdate:()=>Fs});var Pe,jn,vc,Hy,Wc,Ds,Dy,Fy,yr,Fs,Us,Pt=u(()=>{"use strict";Pe=g(require("node:fs")),jn=g(require("node:path"));Ze();hr();Os();Ye();Rt();x();wt();Hs();wc();vc=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hy=e=>{let t=xe(e),r=t===null?L():L(t);if(!Pe.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Pe.default.readFileSync(r.configPath,"utf8"));return!vc(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},Wc=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!vc(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},Ds=async e=>(await Wc(e))?.bundleVersion??null,Dy=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=jn.default.join(t,r);Pe.default.mkdirSync(jn.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());Pe.default.writeFileSync(o,s),r.endsWith(".js")&&Pe.default.chmodSync(o,493)},Fy=async()=>{Fn();let e=B();for(let t of e)await Re(t.launchAgentLabel)},yr=(e,t)=>({localBundleVersion:t,...e}),Fs=async e=>{let t=v(),r=G(t),n=r?.bundleVersion??null,o=Hy(t),s=o===null?r?.appOrigin??null:Z(o);if(s===null){let c=yr({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return Ct({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let i=await Wc(s);if(i===null){let c=yr({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return Ct({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||Dn(n,i.bundleVersion))){let c=yr({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:i.bundleVersion},n);return Ct({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),c}try{for(let m of i.scripts)await Dy(s,t,m);let c=jn.default.join(t,ge);Pe.default.existsSync(c)&&Pe.default.rmSync(c,{force:!0}),_c(t),bc(t),ic({bundleVersion:i.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await Fy();let d=yr({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${i.bundleVersion}.`,remoteBundleVersion:i.bundleVersion},i.bundleVersion);return Ct({event:"update_applied",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),d}catch(c){let d=c instanceof Error?c.message:"Agent Witch self-update failed.",m=yr({ok:!1,updated:!1,message:d,remoteBundleVersion:i.bundleVersion},n);return Ct({event:"update_failed",ok:!1,message:d,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),m}},Us=()=>{let e=v();return{local:G(e),logs:Un(20,e)}}});var Bn,Ar,Ec,js,Sr,$s=u(()=>{"use strict";Bn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},Ar=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=Bn(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},Ec=e=>e>=1&&e<=5,js=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Bn(t,"UTC")},Sr=e=>{let t=e.from??new Date,r=Bn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Ar(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Ar(r,e.timeZone,n,0),s=Bn(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?Ar(js(r),e.timeZone,n,0):o;if(!i&&Ec(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=js(a),Ec(a.weekday))return Ar(a,e.timeZone,n,0);return Ar(js(r),e.timeZone,n,0)}});var Uy,Gn,Bs=u(()=>{"use strict";Uy=e=>e==="hourly"||e==="daily"||e==="weekdays",Gn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!Uy(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var _r,Vn,kc,Lc,Gs,Te,xc,Rc,Cc,Pc,br=u(()=>{"use strict";_r=g(require("node:fs")),Vn=g(require("node:path"));Bs();kc="automations.json",Lc=e=>e.profileEmail!==null?Vn.default.join(e.installDir,"profiles",e.profileEmail,kc):Vn.default.join(e.installDir,kc),Gs=()=>({version:1,automations:[]}),Te=e=>{let t=Lc(e);if(!_r.default.existsSync(t))return Gs();try{let r=JSON.parse(_r.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Gs():{version:1,automations:r.automations.flatMap(o=>{let s=Gn(o);return s!==null?[s]:[]})}}catch{return Gs()}},xc=(e,t)=>{let r=Lc(e);_r.default.mkdirSync(Vn.default.dirname(r),{recursive:!0}),_r.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Rc=(e,t)=>{xc(e,{version:1,automations:t})},Cc=(e,t)=>{let n=Te(e).automations.filter(o=>o.id!==t.id);xc(e,{version:1,automations:[...n,t]})},Pc=(e,t)=>Te(e).automations.find(r=>r.id===t)??null});var jy,$y,zn,Vs=u(()=>{"use strict";$s();Bs();br();x();jy=e=>e!==void 0&&e.trim().length>0?L(e.trim()):L(),$y=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Sr({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Sr({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},zn=e=>{let t=jy(e.profileEmail),r=Te(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=Gn(s);return i!==null?[$y(i,n.get(i.id))]:[]});return Rc(t,o),{ok:!0,writtenCount:o.length}}});var Tc,Ic=u(()=>{"use strict";Tc="x-agent-witch-token"});var Tt,zs,Nc,Kn,Oc,wr=u(()=>{"use strict";Ic();Rt();Tt=e=>{let t=Z(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},zs=e=>({[Tc]:e,"Content-Type":"application/json"}),Nc=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:zs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Kn=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:zs(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Oc=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:zs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var qn,vr,H,Ie,Mc,It,tt=u(()=>{"use strict";qn={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},vr=e=>e.trim().length>0,H=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Ie=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:vr(t)?t.trim():qn.claudeCommand,codexCommand:vr(r)?r.trim():qn.codexCommand,cursorCommand:vr(n)?n.trim():qn.cursorCommand,antigravityCommand:vr(o)?o.trim():qn.antigravityCommand}},Mc=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},It=(e,t,r,n)=>{let o=t.trim();if(!vr(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var Ks,By,Gy,Jn,qs=u(()=>{"use strict";Ks=e=>e.toLocaleString("en-US"),By=e=>e<.01?e.toFixed(4):e.toFixed(3),Gy=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${By(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Ks(e.inputTokens)} in / ${Ks(e.outputTokens)} out (${Ks(e.totalTokens)} total)`,t].join(`
`)},Jn=(e,t)=>{if(t===void 0)return e;let r=Gy(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var Ne,Js=u(()=>{"use strict";Ne={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Yn,Vy,zy,Xn,Hc=u(()=>{"use strict";Yn={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},Vy=e=>{let t=Yn[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Yn["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Yn["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Yn["gemini-2.0-flash"]:null},zy=(e,t,r)=>{let n=Vy(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},Xn=e=>{let t=zy(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Nt,Ky,qy,Jy,Zn,Dc=u(()=>{"use strict";Hc();Nt=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),Ky=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=Nt(r.input_tokens),o=Nt(r.output_tokens);return n===0&&o===0?null:Xn({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},qy=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=Nt(r.prompt_tokens),o=Nt(r.completion_tokens);return n===0&&o===0?null:Xn({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},Jy=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=Nt(r.promptTokenCount),o=Nt(r.candidatesTokenCount);return n===0&&o===0?null:Xn({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},Zn=(e,t,r)=>e==="anthropic"?Ky(t,r):e==="openai"?qy(t,r):Jy(t,r)});var Yy,Xy,Zy,Qy,eA,tA,Fc,Uc=u(()=>{"use strict";Js();Dc();Yy=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},Xy=async e=>{let t=e.secret.model??Ne.anthropic,r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=Yy(n);o.length>0&&e.onChunk?.(o);let s=Zn("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},Zy=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},Qy=async e=>{let t=e.secret.model??Ne.openai,r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=Zy(n);o.length>0&&e.onChunk?.(o);let s=Zn("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},eA=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},tA=async e=>{let t=e.secret.model??Ne.google,r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=eA(o);s.length>0&&e.onChunk?.(s);let i=Zn("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Fc=async e=>{try{return e.provider==="anthropic"?await Xy(e):e.provider==="openai"?await Qy(e):await tA(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Oe,Wr=u(()=>{"use strict";Oe=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var jc,rA,Qn,Ys=u(()=>{"use strict";jc=g(require("node:path")),rA="writer-api-secrets.json",Qn=e=>jc.default.join(e,rA)});var Xs,$c,nA,rt,Me,nt=u(()=>{"use strict";Xs=g(require("node:fs"));Ys();$c=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nA=e=>{if(!$c(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"&&e.model.trim().length>0?e.model.trim():void 0;return{apiKey:t,...r!==void 0?{model:r}:{}}},rt=e=>{let t=Qn(e);if(!Xs.default.existsSync(t))return{};try{let r=JSON.parse(Xs.default.readFileSync(t,"utf8"));if(!$c(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=nA(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Me=(e,t)=>rt(e)[t]??null});var V,ot=u(()=>{"use strict";V=e=>e==="api"?"api":"cli"});var Bc,Q,eo,He=u(()=>{"use strict";Bc=g(require("node:path"));Wr();nt();ot();Q=e=>Bc.default.dirname(e),eo=(e,t)=>{if(V(e.writerExecutionBackend)!=="api")return!1;let r=Oe(t);if(r===null)return!1;let n=Q(e.layout.configPath),o=Me(n,r);return o!==null&&o.apiKey.length>0}});var to,Zs=u(()=>{"use strict";qs();Uc();Wr();nt();He();to=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Oe(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Q(e.layout.configPath),a=Me(i,s);if(a===null){let d=Object.keys(rt(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Fc({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:Jn(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Gc,Ot,ro=u(()=>{"use strict";Gc=require("node:child_process");tt();Zs();He();Ot=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(eo(e,t)){to(e,t,r).then(n);return}let o=It(t,r,Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Gc.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[];s.stdout?.on("data",a=>{i.push(a.toString("utf8"))}),s.stderr?.on("data",a=>{i.push(a.toString("utf8"))}),s.on("close",a=>{n({exitCode:a??-1,output:i.join("")})}),s.on("error",a=>{n({exitCode:-1,output:a.message})})})});var Qs,ei,ti=u(()=>{"use strict";Qs="https://www.agentwitch.com",ei="wss://www.agentwitch.com/api/agent-witch/ws"});var no,Vc,ri=u(()=>{"use strict";no=".agent-witch",Vc=".local-agent-witch"});var zc,oA,ni,oo,oi=u(()=>{"use strict";zc=g(require("node:path"));ti();ri();oA="ws://localhost:3000/api/agent-witch/ws",ni=e=>e.replace(/\/$/,""),oo=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return ni(t);let r=zc.default.basename(e.installDir);if(r===no)return ei;let n=e.configWsUrl?.trim()??"";return r===Vc?n.length>0?ni(n):oA:n.length>0?ni(n):ei}});var si,sA,iA,aA,lA,cA,F,st=u(()=>{"use strict";si=g(require("node:fs"));oi();x();ot();sA="claude",iA="codex",aA="cursor",lA="agy",cA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F=()=>{let e=L();if(!si.default.existsSync(e.configPath))return null;try{let t=JSON.parse(si.default.readFileSync(e.configPath,"utf8"));if(!cA(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=oo({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:V(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:sA,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:iA,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:aA,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:lA,pairingToken:s,layout:e}}catch{return null}}});var Kc,ii,Mt,so=u(()=>{"use strict";Kc=require("node:crypto");wr();$s();ro();br();st();ii=!1,Mt=async e=>{if(ii)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=F();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Tt({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=Pc(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};ii=!0;let o=(0,Kc.randomUUID)();try{let s=await Ot(t,"claude-cli",n.prompt);await Oc(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=Sr({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return Cc(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{ii=!1}}});function Er(e){return(0,qc.createHash)("sha256").update(e.trim()).digest("hex")}var qc,ai=u(()=>{"use strict";qc=require("node:crypto")});var dA,Jc,uA,mA,kr,Yc,li=u(()=>{"use strict";dA=["agentwitch.com","www.agentwitch.com"],Jc=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,uA=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},mA=e=>{let t=uA(e);return!!(dA.includes(t)||Jc.test(e.trim().toLowerCase()))},kr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return mA(r)?Jc.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Yc=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:kr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var io,Xc,pA,gA,Zc,Qc,ci,ao,lo=u(()=>{"use strict";io=g(require("node:fs")),Xc=g(require("node:path")),pA="wake-port.json",gA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zc=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Qc=e=>Xc.default.join(e,pA),ci=e=>{let t=Qc(e);if(!io.default.existsSync(t))return null;try{let r=JSON.parse(io.default.readFileSync(t,"utf8"));if(gA(r)&&Zc(r.wakePort))return r.wakePort}catch{return null}return null},ao=(e,t)=>{if(!Zc(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Qc(e);io.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var YW,XW,ZW,ee,ed,Ht=u(()=>{"use strict";lo();x();lo();YW=Ls(),XW=`${he()}-wake`,ZW=he(),ee=()=>{let e=v(),t=ci(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return Ls()},ed=e=>{let t=v();ci(t)===null&&ao(t,e)}});var Dt,Lr,fA,td,rd,nd=u(()=>{"use strict";Dt=g(require("node:fs")),Lr=g(require("node:path"));ai();x();fA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),td=e=>{if(!Dt.default.existsSync(e))return null;try{let t=JSON.parse(Dt.default.readFileSync(e,"utf8"));return!fA(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Er(t.pairingToken.trim())}catch{return null}},rd=(e=v())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(td(Lr.default.join(e,"config.json")));let o=Lr.default.join(e,Je);if(!Dt.default.existsSync(o))return t;for(let s of Dt.default.readdirSync(o)){let i=Lr.default.join(o,s);Dt.default.statSync(i).isDirectory()&&n(td(Lr.default.join(i,"config.json")))}return t}});var od,sd=u(()=>{"use strict";od=["rule","skill","command","instruction","agent"]});var id,hA,yA,ad,ld=u(()=>{"use strict";sd();id=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hA=e=>typeof e=="string"&&od.includes(e),yA=e=>{if(!id(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!hA(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},ad=e=>{if(!id(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=yA(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var cd,AA,SA,_A,bA,wA,vA,WA,EA,co,di=u(()=>{"use strict";cd=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},AA=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},SA=(e,t)=>{let r=AA(t),n=cd(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},_A=(e,t,r)=>{let n=SA(t,r);return`shared/items/${e}/${n}`},bA=["rules","skills","commands","instructions","agents"],wA=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),vA=(e,t)=>[...e.filter(n=>n.id!==t.id),t],WA=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},EA=e=>({id:e.id,kind:e.kind,title:e.title,path:_A(e.id,e.kind,e.title)}),co=e=>{let t=new Date().toISOString(),r=e.existingManifest??wA(e.hostname,t),n=cd(e.bundle.slug),o=WA(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...bA.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,m)=>{let y=EA(m);return{files:[...d.files,{relativePath:y.path,content:m.content}],nextItems:vA(d.nextItems,y)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var De,dd,uo,kA,ud,md=u(()=>{"use strict";De=g(require("node:fs")),dd=g(require("node:os")),uo=g(require("node:path"));di();x();kA=e=>{if(!De.default.existsSync(e))return null;try{let t=JSON.parse(De.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},ud=e=>{let t=L(e.profileEmail);try{let r=kA(t.harnessManifestPath),n=co({bundle:e.bundle,hostname:dd.default.hostname(),existingManifest:r});De.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)De.default.mkdirSync(uo.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=uo.default.join(t.harnessRootDir,o.relativePath);De.default.mkdirSync(uo.default.dirname(s),{recursive:!0}),De.default.writeFileSync(s,o.content)}return De.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var pd,gd,mo,ui=u(()=>{"use strict";pd=require("node:child_process"),gd=g(require("node:fs"));cr();x();mo=(e=v())=>{let t=ks(e);if(!gd.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!ye())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=xe(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,pd.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var mi,le,g0,Ft=u(()=>{"use strict";x();mi="connection-health.json",le=12e4,g0=`${he()}-watchdog`});var fd,it,pi,LA,xA,RA,hd,CA,yd,po,go=u(()=>{"use strict";fd=require("node:crypto"),it=g(require("node:fs")),pi=g(require("node:path"));x();LA="watchdog-log.ndjson",xA=200,RA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hd=(e=v())=>{let t=L(),r=t.installDir===e?t.logsDir:vn({installDir:e,profileEmail:t.profileEmail});return pi.default.join(r,LA)},CA=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!RA(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},yd=(e,t=v())=>{let r={id:(0,fd.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=hd(t);it.default.mkdirSync(pi.default.dirname(n),{recursive:!0});let o=it.default.existsSync(n)?it.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-xA+1)),JSON.stringify(r)];return it.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},po=(e=20,t=v())=>{let r=hd(t);if(!it.default.existsSync(r))return[];let n=it.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=CA(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var xr,fo,PA,Ad,te,gi,ce,Rr=u(()=>{"use strict";xr=g(require("node:fs")),fo=g(require("node:path"));Ft();PA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ad=e=>e.profileEmail===null?fo.default.join(e.installDir,mi):fo.default.join(e.installDir,"profiles",e.profileEmail,mi),te=e=>{let t=Ad(e);if(!xr.default.existsSync(t))return null;try{let r=JSON.parse(xr.default.readFileSync(t,"utf8"));return!PA(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},gi=(e,t)=>{let r=Ad(e),n=te(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};xr.default.mkdirSync(fo.default.dirname(r),{recursive:!0}),xr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ce=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Sd,_d,TA,Cr,fi=u(()=>{"use strict";Sd=require("node:child_process"),_d=require("node:util"),TA=(0,_d.promisify)(Sd.execFile),Cr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await TA("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var bd,hi=u(()=>{"use strict";bd="watchdog-reinstall-state.json"});var wd={};qe(wd,{verifyAgentWitchReviveAfterKickstart:()=>OA});var NA,OA,vd=u(()=>{"use strict";hi();Rr();fi();x();NA=e=>new Promise(t=>{setTimeout(t,e)}),OA=async e=>{if(await NA(e.verifyDelayMs??3e3),!await Cr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?L():L(e.profileEmail),n=te(r);return!ce(n,e.staleAfterMs)}});var Pr,yi,HA,Wd,DA,Ed,kd,Ld=u(()=>{"use strict";Pr=g(require("node:fs")),yi=g(require("node:path"));hi();x();HA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wd=e=>yi.default.join(e,bd),DA=(e=v())=>{let t=Wd(e);if(!Pr.default.existsSync(t))return null;try{let r=JSON.parse(Pr.default.readFileSync(t,"utf8"));return!HA(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Ed=(e=v(),t=Date.now())=>{let r=DA(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},kd=(e=v(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=Wd(e);return Pr.default.mkdirSync(yi.default.dirname(n),{recursive:!0}),Pr.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var xd,Ut,Rd,Cd,Pd,FA,UA,Td,jA,$A,Id,Nd=u(()=>{"use strict";xd=require("node:child_process"),Ut=g(require("node:fs")),Rd=g(require("node:os")),Cd=g(require("node:path")),Pd=require("node:util");Ze();Rt();x();FA=(0,Pd.promisify)(xd.execFile),UA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Td=e=>{let t=xe(e),r=t===null?L():L(t);if(!Ut.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Ut.default.readFileSync(r.configPath,"utf8"));return!UA(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},jA=e=>Td(e)?.wsUrl??null,$A=e=>{let t=jA(e);return t!==null?Z(t):G(e)?.appOrigin??null},Id=async e=>{let t=e?.installDir??v(),r=Td(t),n=r!==null?Z(r.wsUrl):$A(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=Cd.default.join(Rd.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Ut.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??xe(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await FA("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Ut.default.existsSync(i)&&Ut.default.unlinkSync(i)}}});var Od={};qe(Od,{attemptAgentWitchWatchdogReinstall:()=>BA});var BA,Md=u(()=>{"use strict";Ld();hr();Nd();BA=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!Ed())return{attempted:!1,ok:!1,targets:e};kd();let r=await Id();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await Re(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var Hd,Dd,Fd,GA,VA,zA,Ai,Si=u(()=>{"use strict";cr();Ft();Rr();fi();hr();Ye();x();ui();go();Hd=e=>e===null?L():L(e),Dd=async(e,t,r)=>{if(!await Cr(e))return"not_running";let o=Hd(t),s=te(o);return ce(s,r)?"stale_connection":"healthy"},Fd=async e=>{let t=e?.staleAfterMs??le,r=v(),n=B(r);return Promise.all(n.map(async o=>{let s=await Dd(o.launchAgentLabel,o.profileEmail,t),i=Hd(o.profileEmail),a=te(i),c=await Cr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:ce(a,t),needsRevive:s!=="healthy",reason:s}}))},GA=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},VA=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",zA=async e=>{let t=await Re(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(vd(),wd)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Ai=async e=>{if(!ye())return{ok:!0,targets:[]};let t=e?.staleAfterMs??le,r=v(),n=B(r),o=[];for(let m of n){let y=await Dd(m.launchAgentLabel,m.profileEmail,t);if(y==="healthy"){o.push({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,revived:!1,reason:y});continue}o.push(await zA({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,reason:y,staleAfterMs:t}))}if(o.length===0){let m=mo();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:m.ok,reason:"not_running",...m.errorMessage!==void 0?{errorMessage:m.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(m=>m.reason!=="healthy"&&!m.revived))try{let{attemptAgentWitchWatchdogReinstall:m}=await Promise.resolve().then(()=>(Md(),Od)),y=await m(o);s=y.attempted,i=y.ok,a=y.errorMessage,c=[...y.targets]}catch(m){s=!0,i=!1,a=m instanceof Error?m.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(m=>m.revived||m.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&yd({event:VA(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:GA(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var Ud,jd,$d=u(()=>{"use strict";Ud=g(require("node:os"));Ft();go();Si();jd=async()=>{let e=await Fd(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Ud.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:le,healthyProfileCount:t,profiles:e,lastLog:po(1)[0]??null}}});var Bd={};qe(Bd,{buildAgentWitchAutomationStatusFromWakeServer:()=>vi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ci,buildAgentWitchWakeHealthResponse:()=>Wi,buildAgentWitchWakeIdentityResponse:()=>Ei,buildAgentWitchWatchdogStatus:()=>Li,installHarnessFromWakeServer:()=>yo,readAgentWitchSelfUpdateLogEntries:()=>So,readAgentWitchWatchdogLogEntries:()=>Ao,restartAgentWitchFromWakeServer:()=>Ri,reviveAgentWitchWebSocketFromWakeServer:()=>xi,runAgentWitchSelfUpdateFromWakeServer:()=>Pi,runAgentWitchUninstallLocalFromWakeServer:()=>Ti,runAutomationFromWakeServer:()=>wi,syncAutomationsFromWakeServer:()=>bi,wakeAgentWitchLaunchAgents:()=>ki});var ho,_i,yo,bi,wi,vi,Wi,Ei,ki,Ao,Li,xi,Ri,Ci,So,Pi,Ti,Ii=u(()=>{"use strict";Vs();so();br();ai();st();ho=g(require("node:os"));li();Ht();hr();Ye();nd();ld();md();ui();$d();go();Pt();kn();Hs();Si();_i=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yo=e=>{if(!_i(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=ad(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!kr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=ud({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},bi=e=>{if(!_i(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!kr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=zn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},wi=async e=>{if(!_i(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:kr(t)?Mt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},vi=()=>{let e=F(),t=e!==null?Te(e.layout):{version:1,automations:[]};return{ok:!0,hostname:ho.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},Wi=()=>{let e=B();return{ok:!0,port:ee(),hostname:ho.default.hostname(),profileCount:e.length}},Ei=()=>{let e=B(),t=F()?.pairingToken.trim()??"",r=t.length>0?Er(t):null,n=rd();return{hostname:ho.default.hostname(),port:ee(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},ki=async()=>{let e=B(),t=[];for(let r of e){let n=await Re(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=mo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Ao=(e=20)=>po(e),Li=jd,xi=Ai,Ri=Ai,Ci=Us,So=(e=20)=>Un(e),Pi=e=>Fs(e),Ti=()=>Il()});var Ae=$((fE,zd)=>{"use strict";var Gd=["nodebuffer","arraybuffer","fragments"],Vd=typeof Blob<"u";Vd&&Gd.push("blob");zd.exports={BINARY_TYPES:Gd,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Vd,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Tr=$((hE,_o)=>{"use strict";var{EMPTY_BUFFER:KA}=Ae(),Ni=Buffer[Symbol.species];function qA(e,t){if(e.length===0)return KA;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Ni(r.buffer,r.byteOffset,n):r}function Kd(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function qd(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function JA(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Oi(e){if(Oi.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Ni(e):ArrayBuffer.isView(e)?t=new Ni(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Oi.readOnly=!1),t}_o.exports={concat:qA,mask:Kd,toArrayBuffer:JA,toBuffer:Oi,unmask:qd};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");_o.exports.mask=function(t,r,n,o,s){s<48?Kd(t,r,n,o,s):e.mask(t,r,n,o,s)},_o.exports.unmask=function(t,r){t.length<32?qd(t,r):e.unmask(t,r)}}catch{}});var Xd=$((yE,Yd)=>{"use strict";var Jd=Symbol("kDone"),Mi=Symbol("kRun"),Hi=class{constructor(t){this[Jd]=()=>{this.pending--,this[Mi]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Mi]()}[Mi](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Jd])}}};Yd.exports=Hi});var Bt=$((AE,tu)=>{"use strict";var Ir=require("zlib"),Zd=Tr(),YA=Xd(),{kStatusCode:Qd}=Ae(),XA=Buffer[Symbol.species],ZA=Buffer.from([0,0,255,255]),wo=Symbol("permessage-deflate"),Se=Symbol("total-length"),jt=Symbol("callback"),Fe=Symbol("buffers"),$t=Symbol("error"),bo,Di=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!bo){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;bo=new YA(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[jt];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){bo.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){bo.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Ir.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Ir.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[wo]=this,this._inflate[Se]=0,this._inflate[Fe]=[],this._inflate.on("error",eS),this._inflate.on("data",eu)}this._inflate[jt]=n,this._inflate.write(t),r&&this._inflate.write(ZA),this._inflate.flush(()=>{let s=this._inflate[$t];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=Zd.concat(this._inflate[Fe],this._inflate[Se]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Se]=0,this._inflate[Fe]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Ir.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Ir.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Se]=0,this._deflate[Fe]=[],this._deflate.on("data",QA)}this._deflate[jt]=n,this._deflate.write(t),this._deflate.flush(Ir.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Zd.concat(this._deflate[Fe],this._deflate[Se]);r&&(s=new XA(s.buffer,s.byteOffset,s.length-4)),this._deflate[jt]=null,this._deflate[Se]=0,this._deflate[Fe]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};tu.exports=Di;function QA(e){this[Fe].push(e),this[Se]+=e.length}function eu(e){if(this[Se]+=e.length,this[wo]._maxPayload<1||this[Se]<=this[wo]._maxPayload){this[Fe].push(e);return}this[$t]=new RangeError("Max payload size exceeded"),this[$t].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[$t][Qd]=1009,this.removeListener("data",eu),this.reset()}function eS(e){if(this[wo]._inflate=null,this[$t]){this[jt](this[$t]);return}e[Qd]=1007,this[jt](e)}});var Gt=$((SE,vo)=>{"use strict";var{isUtf8:ru}=require("buffer"),{hasBlob:tS}=Ae(),rS=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function nS(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Fi(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function oS(e){return tS&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}vo.exports={isBlob:oS,isValidStatusCode:nS,isValidUTF8:Fi,tokenChars:rS};if(ru)vo.exports.isValidUTF8=function(e){return e.length<24?Fi(e):ru(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");vo.exports.isValidUTF8=function(t){return t.length<32?Fi(t):e(t)}}catch{}});var Gi=$((_E,cu)=>{"use strict";var{Writable:sS}=require("stream"),nu=Bt(),{BINARY_TYPES:iS,EMPTY_BUFFER:ou,kStatusCode:aS,kWebSocket:lS}=Ae(),{concat:Ui,toArrayBuffer:cS,unmask:dS}=Tr(),{isValidStatusCode:uS,isValidUTF8:su}=Gt(),Wo=Buffer[Symbol.species],q=0,iu=1,au=2,lu=3,ji=4,$i=5,Eo=6,Bi=class extends sS{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||iS[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[lS]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=q}_write(t,r,n){if(this._opcode===8&&this._state==q)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Wo(n.buffer,n.byteOffset+t,n.length-t),new Wo(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Wo(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case q:this.getInfo(t);break;case iu:this.getPayloadLength16(t);break;case au:this.getPayloadLength64(t);break;case lu:this.getMask();break;case ji:this.getData(t);break;case $i:case Eo:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[nu.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=iu:this._payloadLength===127?this._state=au:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=lu:this._state=ji}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=ji}getData(t){let r=ou;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&dS(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=$i,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[nu.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===q&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=q;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=Ui(n,r):this._binaryType==="arraybuffer"?o=cS(Ui(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=q):(this._state=Eo,setImmediate(()=>{this.emit("message",o,!0),this._state=q,this.startLoop(t)}))}else{let o=Ui(n,r);if(!this._skipUTF8Validation&&!su(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===$i||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=q):(this._state=Eo,setImmediate(()=>{this.emit("message",o,!1),this._state=q,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,ou),this.end();else{let n=t.readUInt16BE(0);if(!uS(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Wo(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!su(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=q;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=q):(this._state=Eo,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=q,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[aS]=o,i}};cu.exports=Bi});var Ki=$((wE,mu)=>{"use strict";var{Duplex:bE}=require("stream"),{randomFillSync:mS}=require("crypto"),{types:{isUint8Array:pS}}=require("util"),du=Bt(),{EMPTY_BUFFER:gS,kWebSocket:fS,NOOP:hS}=Ae(),{isBlob:Vt,isValidStatusCode:yS}=Gt(),{mask:uu,toBuffer:at}=Tr(),J=Symbol("kByteLength"),AS=Buffer.alloc(4),ko=8*1024,lt,zt=ko,re=0,SS=1,_S=2,Vi=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=re,this.onerror=hS,this[fS]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||AS,r.generateMask?r.generateMask(n):(zt===ko&&(lt===void 0&&(lt=Buffer.alloc(ko)),mS(lt,0,ko),zt=0),n[0]=lt[zt++],n[1]=lt[zt++],n[2]=lt[zt++],n[3]=lt[zt++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[J]!==void 0?a=r[J]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(uu(t,n,d,s,a),[d]):(uu(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=gS;else{if(typeof t!="number"||!yS(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(pS(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[J]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==re?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Vt(t)?(o=t.size,s=!1):(t=at(t),o=t.length,s=at.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[J]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Vt(t)?this._state!==re?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==re?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Vt(t)?(o=t.size,s=!1):(t=at(t),o=t.length,s=at.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[J]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Vt(t)?this._state!==re?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==re?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[du.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Vt(t)?(a=t.size,c=!1):(t=at(t),a=t.length,c=at.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[J]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Vt(t)?this._state!==re?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==re?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[J],this._state=_S,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(zi,this,a,o);return}this._bufferedBytes-=n[J];let i=at(s);r?this.dispatch(i,r,n,o):(this._state=re,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(bS,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[du.extensionName];this._bufferedBytes+=n[J],this._state=SS,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");zi(this,c,o);return}this._bufferedBytes-=n[J],this._state=re,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===re&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][J],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][J],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};mu.exports=Vi;function zi(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function bS(e,t,r){zi(e,t,r),e.onerror(t)}});var bu=$((vE,_u)=>{"use strict";var{kForOnEventAttribute:Nr,kListener:qi}=Ae(),pu=Symbol("kCode"),gu=Symbol("kData"),fu=Symbol("kError"),hu=Symbol("kMessage"),yu=Symbol("kReason"),Kt=Symbol("kTarget"),Au=Symbol("kType"),Su=Symbol("kWasClean"),_e=class{constructor(t){this[Kt]=null,this[Au]=t}get target(){return this[Kt]}get type(){return this[Au]}};Object.defineProperty(_e.prototype,"target",{enumerable:!0});Object.defineProperty(_e.prototype,"type",{enumerable:!0});var ct=class extends _e{constructor(t,r={}){super(t),this[pu]=r.code===void 0?0:r.code,this[yu]=r.reason===void 0?"":r.reason,this[Su]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[pu]}get reason(){return this[yu]}get wasClean(){return this[Su]}};Object.defineProperty(ct.prototype,"code",{enumerable:!0});Object.defineProperty(ct.prototype,"reason",{enumerable:!0});Object.defineProperty(ct.prototype,"wasClean",{enumerable:!0});var qt=class extends _e{constructor(t,r={}){super(t),this[fu]=r.error===void 0?null:r.error,this[hu]=r.message===void 0?"":r.message}get error(){return this[fu]}get message(){return this[hu]}};Object.defineProperty(qt.prototype,"error",{enumerable:!0});Object.defineProperty(qt.prototype,"message",{enumerable:!0});var Or=class extends _e{constructor(t,r={}){super(t),this[gu]=r.data===void 0?null:r.data}get data(){return this[gu]}};Object.defineProperty(Or.prototype,"data",{enumerable:!0});var wS={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[Nr]&&o[qi]===t&&!o[Nr])return;let n;if(e==="message")n=function(s,i){let a=new Or("message",{data:i?s:s.toString()});a[Kt]=this,Lo(t,this,a)};else if(e==="close")n=function(s,i){let a=new ct("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Kt]=this,Lo(t,this,a)};else if(e==="error")n=function(s){let i=new qt("error",{error:s,message:s.message});i[Kt]=this,Lo(t,this,i)};else if(e==="open")n=function(){let s=new _e("open");s[Kt]=this,Lo(t,this,s)};else return;n[Nr]=!!r[Nr],n[qi]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[qi]===t&&!r[Nr]){this.removeListener(e,r);break}}};_u.exports={CloseEvent:ct,ErrorEvent:qt,Event:_e,EventTarget:wS,MessageEvent:Or};function Lo(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var xo=$((WE,wu)=>{"use strict";var{tokenChars:Mr}=Gt();function de(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function vS(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,m=-1,y=0;for(;y<e.length;y++)if(d=e.charCodeAt(y),i===void 0)if(m===-1&&Mr[d]===1)c===-1&&(c=y);else if(y!==0&&(d===32||d===9))m===-1&&c!==-1&&(m=y);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y);let A=e.slice(c,m);d===44?(de(t,A,r),r=Object.create(null)):i=A,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);else if(a===void 0)if(m===-1&&Mr[d]===1)c===-1&&(c=y);else if(d===32||d===9)m===-1&&c!==-1&&(m=y);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y),de(r,e.slice(c,m),!0),d===44&&(de(t,i,r),r=Object.create(null),i=void 0),c=m=-1}else if(d===61&&c!==-1&&m===-1)a=e.slice(c,y),c=m=-1;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(o){if(Mr[d]!==1)throw new SyntaxError(`Unexpected character at index ${y}`);c===-1?c=y:n||(n=!0),o=!1}else if(s)if(Mr[d]===1)c===-1&&(c=y);else if(d===34&&c!==-1)s=!1,m=y;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(d===34&&e.charCodeAt(y-1)===61)s=!0;else if(m===-1&&Mr[d]===1)c===-1&&(c=y);else if(c!==-1&&(d===32||d===9))m===-1&&(m=y);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y);let A=e.slice(c,m);n&&(A=A.replace(/\\/g,""),n=!1),de(r,a,A),d===44&&(de(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");m===-1&&(m=y);let w=e.slice(c,m);return i===void 0?de(t,w,r):(a===void 0?de(r,w,!0):n?de(r,a,w.replace(/\\/g,"")):de(r,a,w),de(t,i,r)),t}function WS(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}wu.exports={format:WS,parse:vS}});var To=$((LE,Nu)=>{"use strict";var ES=require("events"),kS=require("https"),LS=require("http"),Eu=require("net"),xS=require("tls"),{randomBytes:RS,createHash:CS}=require("crypto"),{Duplex:EE,Readable:kE}=require("stream"),{URL:Ji}=require("url"),Ue=Bt(),PS=Gi(),TS=Ki(),{isBlob:IS}=Gt(),{BINARY_TYPES:vu,CLOSE_TIMEOUT:NS,EMPTY_BUFFER:Ro,GUID:OS,kForOnEventAttribute:Yi,kListener:MS,kStatusCode:HS,kWebSocket:O,NOOP:ku}=Ae(),{EventTarget:{addEventListener:DS,removeEventListener:FS}}=bu(),{format:US,parse:jS}=xo(),{toBuffer:$S}=Tr(),Lu=Symbol("kAborted"),Xi=[8,13],be=["CONNECTING","OPEN","CLOSING","CLOSED"],BS=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,C=class e extends ES{constructor(t,r,n){super(),this._binaryType=vu[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Ro,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),xu(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){vu.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new PS({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new TS(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[O]=this,s[O]=this,t[O]=this,o.on("conclude",zS),o.on("drain",KS),o.on("error",qS),o.on("message",JS),o.on("ping",YS),o.on("pong",XS),s.onerror=ZS,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",Pu),t.on("data",Po),t.on("end",Tu),t.on("error",Iu),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Ue.extensionName]&&this._extensions[Ue.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){z(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),Cu(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Zi(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Ro,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Zi(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Ro,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Zi(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Ue.extensionName]||(o.compress=!1),this._sender.send(t||Ro,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){z(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(C,"CONNECTING",{enumerable:!0,value:be.indexOf("CONNECTING")});Object.defineProperty(C.prototype,"CONNECTING",{enumerable:!0,value:be.indexOf("CONNECTING")});Object.defineProperty(C,"OPEN",{enumerable:!0,value:be.indexOf("OPEN")});Object.defineProperty(C.prototype,"OPEN",{enumerable:!0,value:be.indexOf("OPEN")});Object.defineProperty(C,"CLOSING",{enumerable:!0,value:be.indexOf("CLOSING")});Object.defineProperty(C.prototype,"CLOSING",{enumerable:!0,value:be.indexOf("CLOSING")});Object.defineProperty(C,"CLOSED",{enumerable:!0,value:be.indexOf("CLOSED")});Object.defineProperty(C.prototype,"CLOSED",{enumerable:!0,value:be.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(C.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(C.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Yi])return t[MS];return null},set(t){for(let r of this.listeners(e))if(r[Yi]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Yi]:!0})}})});C.prototype.addEventListener=DS;C.prototype.removeEventListener=FS;Nu.exports=C;function xu(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:NS,protocolVersion:Xi[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!Xi.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${Xi.join(", ")})`);let s;if(t instanceof Ji)s=t;else try{s=new Ji(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;Co(e,l);return}let d=i?443:80,m=RS(16).toString("base64"),y=i?kS.request:LS.request,w=new Set,A;if(o.createConnection=o.createConnection||(i?VS:GS),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":m,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(A=new Ue({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=US({[Ue.extensionName]:A.offer()})),r.length){for(let l of r){if(typeof l!="string"||!BS.test(l)||w.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");w.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let f;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[_,h]of Object.entries(l))n.headers[_.toLowerCase()]=h}else if(e.listenerCount("redirect")===0){let l=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),f=e._req=y(o),e._redirects&&e.emit("redirect",e.url,f)}else f=e._req=y(o);o.timeout&&f.on("timeout",()=>{z(e,f,"Opening handshake has timed out")}),f.on("error",l=>{f===null||f[Lu]||(f=e._req=null,Co(e,l))}),f.on("response",l=>{let _=l.headers.location,h=l.statusCode;if(_&&o.followRedirects&&h>=300&&h<400){if(++e._redirects>o.maxRedirects){z(e,f,"Maximum redirects exceeded");return}f.abort();let p;try{p=new Ji(_,t)}catch{let b=new SyntaxError(`Invalid URL: ${_}`);Co(e,b);return}xu(e,p,r,n)}else e.emit("unexpected-response",f,l)||z(e,f,`Unexpected server response: ${l.statusCode}`)}),f.on("upgrade",(l,_,h)=>{if(e.emit("upgrade",l),e.readyState!==C.CONNECTING)return;f=e._req=null;let p=l.headers.upgrade;if(p===void 0||p.toLowerCase()!=="websocket"){z(e,_,"Invalid Upgrade header");return}let S=CS("sha1").update(m+OS).digest("base64");if(l.headers["sec-websocket-accept"]!==S){z(e,_,"Invalid Sec-WebSocket-Accept header");return}let b=l.headers["sec-websocket-protocol"],W;if(b!==void 0?w.size?w.has(b)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":w.size&&(W="Server sent no subprotocol"),W){z(e,_,W);return}b&&(e._protocol=b);let k=l.headers["sec-websocket-extensions"];if(k!==void 0){if(!A){z(e,_,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=jS(k)}catch{z(e,_,"Invalid Sec-WebSocket-Extensions header");return}let se=Object.keys(R);if(se.length!==1||se[0]!==Ue.extensionName){z(e,_,"Server indicated an extension that was not requested");return}try{A.accept(R[Ue.extensionName])}catch{z(e,_,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Ue.extensionName]=A}e.setSocket(_,h,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(f,e):f.end()}function Co(e,t){e._readyState=C.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function GS(e){return e.path=e.socketPath,Eu.connect(e)}function VS(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Eu.isIP(e.host)?"":e.host),xS.connect(e)}function z(e,t,r){e._readyState=C.CLOSING;let n=new Error(r);Error.captureStackTrace(n,z),t.setHeader?(t[Lu]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Co,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function Zi(e,t,r){if(t){let n=IS(t)?t.size:$S(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${be[e.readyState]})`);process.nextTick(r,n)}}function zS(e,t){let r=this[O];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[O]!==void 0&&(r._socket.removeListener("data",Po),process.nextTick(Ru,r._socket),e===1005?r.close():r.close(e,t))}function KS(){let e=this[O];e.isPaused||e._socket.resume()}function qS(e){let t=this[O];t._socket[O]!==void 0&&(t._socket.removeListener("data",Po),process.nextTick(Ru,t._socket),t.close(e[HS])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function Wu(){this[O].emitClose()}function JS(e,t){this[O].emit("message",e,t)}function YS(e){let t=this[O];t._autoPong&&t.pong(e,!this._isServer,ku),t.emit("ping",e)}function XS(e){this[O].emit("pong",e)}function Ru(e){e.resume()}function ZS(e){let t=this[O];t.readyState!==C.CLOSED&&(t.readyState===C.OPEN&&(t._readyState=C.CLOSING,Cu(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function Cu(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function Pu(){let e=this[O];if(this.removeListener("close",Pu),this.removeListener("data",Po),this.removeListener("end",Tu),e._readyState=C.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[O]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",Wu),e._receiver.on("finish",Wu))}function Po(e){this[O]._receiver.write(e)||this.pause()}function Tu(){let e=this[O];e._readyState=C.CLOSING,e._receiver.end(),this.end()}function Iu(){let e=this[O];this.removeListener("error",Iu),this.on("error",ku),e&&(e._readyState=C.CLOSING,this.destroy())}});var Du=$((RE,Hu)=>{"use strict";var xE=To(),{Duplex:QS}=require("stream");function Ou(e){e.emit("close")}function e_(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Mu(e){this.removeListener("error",Mu),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function t_(e,t){let r=!0,n=new QS({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(Ou,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(Ou,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",e_),n.on("error",Mu),n}Hu.exports=t_});var Qi=$((CE,Fu)=>{"use strict";var{tokenChars:r_}=Gt();function n_(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&r_[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}Fu.exports={parse:n_}});var zu=$((TE,Vu)=>{"use strict";var o_=require("events"),Io=require("http"),{Duplex:PE}=require("stream"),{createHash:s_}=require("crypto"),Uu=xo(),dt=Bt(),i_=Qi(),a_=To(),{CLOSE_TIMEOUT:l_,GUID:c_,kWebSocket:d_}=Ae(),u_=/^[+/0-9A-Za-z]{22}==$/,ju=0,$u=1,Gu=2,ea=class extends o_{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:l_,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:a_,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Io.createServer((n,o)=>{let s=Io.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=m_(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=ju}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===Gu){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Hr,this);return}if(t&&this.once("close",t),this._state!==$u)if(this._state=$u,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Hr,this):process.nextTick(Hr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Hr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",Bu);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){ut(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){ut(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!u_.test(s)){ut(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){ut(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Dr(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=i_.parse(c)}catch{ut(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let m=t.headers["sec-websocket-extensions"],y={};if(this.options.perMessageDeflate&&m!==void 0){let w=new dt({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let A=Uu.parse(m);A[dt.extensionName]&&(w.accept(A[dt.extensionName]),y[dt.extensionName]=w)}catch{ut(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let w={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(w,(A,f,l,_)=>{if(!A)return Dr(r,f||401,l,_);this.completeUpgrade(y,s,d,t,r,n,o)});return}if(!this.options.verifyClient(w))return Dr(r,401)}this.completeUpgrade(y,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[d_])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>ju)return Dr(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${s_("sha1").update(r+c_).digest("base64")}`],m=new this.options.WebSocket(null,void 0,this.options);if(n.size){let y=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;y&&(d.push(`Sec-WebSocket-Protocol: ${y}`),m._protocol=y)}if(t[dt.extensionName]){let y=t[dt.extensionName].params,w=Uu.format({[dt.extensionName]:[y]});d.push(`Sec-WebSocket-Extensions: ${w}`),m._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",Bu),m.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(m),m.on("close",()=>{this.clients.delete(m),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Hr,this)})),a(m,o)}};Vu.exports=ea;function m_(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Hr(e){e._state=Gu,e.emit("close")}function Bu(){this.destroy()}function Dr(e,t,r,n){r=r||Io.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Io.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function ut(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,ut),e.emit("wsClientError",i,r,t)}else Dr(r,n,o,s)}});var p_,g_,f_,h_,y_,A_,Ku,S_,Fr,qu=u(()=>{p_=g(Du(),1),g_=g(xo(),1),f_=g(Bt(),1),h_=g(Gi(),1),y_=g(Ki(),1),A_=g(Qi(),1),Ku=g(To(),1),S_=g(zu(),1),Fr=Ku.default});var ta=u(()=>{"use strict"});var we,Ur=u(()=>{"use strict";we=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Jt,mt,Ju,b_,ra,na,Yu,Xu,Zu,Qu,oa,sa=u(()=>{"use strict";Jt=g(require("node:fs")),mt=g(require("node:os")),Ju=g(require("node:path"));ta();Ur();b_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ra=(e=mt.default.hostname())=>Ju.default.join(mt.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),na=e=>{if(!Jt.default.existsSync(e))return null;try{let t=JSON.parse(Jt.default.readFileSync(e,"utf8"));return!b_(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},Yu=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},Xu=(e,t)=>{Jt.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Zu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ra(),n=na(r);if(n!==null&&n.pid!==process.pid&&we(n.pid)&&Yu(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:mt.default.hostname(),macOsUsername:mt.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return Xu(r,o),{ok:!0}},Qu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ra(),n=na(r);return n!==null&&n.pid!==process.pid&&we(n.pid)&&Yu(n)?{ok:!1}:(Xu(r,{hostname:mt.default.hostname(),macOsUsername:mt.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},oa=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??ra();na(r)?.pid===process.pid&&Jt.default.existsSync(r)&&Jt.default.unlinkSync(r)}});var ia,jr,w_,v_,W_,E_,em,tm=u(()=>{"use strict";ia=require("node:child_process"),jr=g(require("node:path"));Ur();wt();w_=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),v_=(e,t)=>{if(w_(e)||!/\bnode\b/.test(e))return!1;let r=jr.default.resolve(t),n=jr.default.join(r,"app",ge),o=jr.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ge||i==="agent-witch.ts")return e.includes(r);try{let a=jr.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},W_=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,ia.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},E_=(e,t,r)=>{let n=W_(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||v_(d,t)&&o.push(c)}return o},em=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,ia.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=E_(r,e.installDir,t),o=[];for(let s of n)if(we(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var $r,Br,rm,k_,nm,om=u(()=>{"use strict";$r=g(require("node:fs")),Br=g(require("node:path"));x();rm=(e,t)=>{!$r.default.existsSync(e)||$r.default.existsSync(t)||($r.default.mkdirSync(Br.default.dirname(t),{recursive:!0}),$r.default.renameSync(e,t))},k_=e=>{if(e.profileEmail===null)return;let t=Br.default.join(e.installDir,fe);rm(Br.default.join(t,bn),e.mainLogPath),rm(Br.default.join(t,wn),e.errorLogPath)},nm=e=>{let t=L();e!==void 0&&t.installDir!==e||k_(t)}});var sm,im,am,lm,cm=u(()=>{"use strict";sm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),im=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?sm(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?sm(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},am=e=>{let t=e.watchdogLogs.map(im).join(""),r=e.updateLogs.map(im).join("");return`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Agent Witch local logs</title>
  <style>
    :root { color-scheme: light dark; font-family: ui-sans-serif, system-ui, sans-serif; }
    body { margin: 0; padding: 16px; background: #0b1020; color: #e8edf8; }
    h1 { font-size: 18px; margin: 0 0 8px; }
    .meta { color: #9aa7c7; margin-bottom: 16px; font-size: 13px; }
    section { margin-bottom: 20px; }
    h2 { font-size: 14px; margin: 0 0 8px; color: #c7d2f0; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { border: 1px solid #24304f; border-radius: 8px; padding: 10px; margin-bottom: 8px; background: #121a31; }
    time { display: block; font-size: 11px; color: #8ea0cc; margin-bottom: 6px; }
    pre { margin: 0; white-space: pre-wrap; word-break: break-word; font-size: 12px; line-height: 1.45; }
    .empty { color: #8ea0cc; font-size: 13px; }
  </style>
</head>
<body>
  <h1>Agent Witch local logs</h1>
  <p class="meta">Wake server on 127.0.0.1:${e.port}</p>
  <section>
    <h2>Watchdog</h2>
    <ul>${t||'<li class="empty">No watchdog log entries yet.</li>'}</ul>
  </section>
  <section>
    <h2>Self-update</h2>
    <ul>${r||'<li class="empty">No self-update log entries yet.</li>'}</ul>
  </section>
</body>
</html>`},lm=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var dm,um,mm=u(()=>{"use strict";dm=g(require("node:net")),um=()=>new Promise((e,t)=>{let r=dm.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var pm,L_,gm,fm=u(()=>{"use strict";pm=g(require("node:net"));mm();Ht();lo();x();L_=e=>new Promise(t=>{let r=pm.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),gm=async()=>{let e=v(),t=ee();if(await L_(t))return ed(t),t;let r=await um();return ao(e,r),r}});var x_,hm,ym=u(()=>{"use strict";x_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hm=e=>({force:x_(e)&&e.force===!0})});var aa,R_,pt,No=u(()=>{"use strict";aa=g(require("node:os")),R_=e=>{let t=e.trim();return t.startsWith("~/")?`${aa.default.homedir()}${t.slice(1)}`:t==="~"?aa.default.homedir():t},pt=R_});var gt,je,Gr=u(()=>{"use strict";gt=g(require("node:path"));Lt();No();je=e=>{let t=pt(e),r=gt.default.join(t,Fl);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:gt.default.join(r,"rag"),memoryDirPath:gt.default.join(r,Ul),reportsDirPath:gt.default.join(r,$l),metaFilePath:gt.default.join(r,jl),ragChunksFilePath:gt.default.join(r,"rag",Cn)}}});var ue,Sm,C_,P_,ve,Vr=u(()=>{"use strict";ue=g(require("node:fs")),Sm=g(require("node:path"));Lt();Gr();C_=(e,t)=>{if(ue.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};ue.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},P_=e=>{ue.default.existsSync(e.ragChunksFilePath)||ue.default.writeFileSync(e.ragChunksFilePath,"");let t=Sm.default.join(e.memoryDirPath,Pn);ue.default.existsSync(t)||ue.default.writeFileSync(t,"")},ve=e=>{let t=je(e.projectFolderPath);return ue.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),ue.default.mkdirSync(t.ragDirPath,{recursive:!0}),ue.default.mkdirSync(t.memoryDirPath,{recursive:!0}),C_(t,e),P_(t),{ok:!0,layout:t}}});var T_,_m,bm=u(()=>{"use strict";Vr();T_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_m=e=>{if(!T_(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:ve({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var vm,O_,wm,T,I_,N_,la,Wm=u(()=>{"use strict";vm=g(require("node:http"));Ii();li();cm();fm();ym();Rn();bm();Hn();bt();O_={},wm=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},T=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},I_=e=>{e.writeHead(403),e.end()},N_=async(e,t,r)=>{let n=e.headers.origin,o=Yc(n);try{if(n!==void 0&&n.length>0&&!o.allowed){I_(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){T(t,200,Wi(),o.headers);return}if(e.method==="GET"&&s==="/identity"){T(t,200,Ei(),o.headers);return}if(e.method==="GET"&&s==="/local"){let i=Ao(50),a=So(50);t.writeHead(200,lm()),t.end(am({port:r,watchdogLogs:i,updateLogs:a}));return}if(e.method==="GET"&&s==="/watchdog/status"){let i=await Li();T(t,200,i,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let i=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:Ao(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let i=await xi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/restart"){let i=await Ri();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let i=Ci();T(t,200,{ok:!0,...i},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let i=new URL(e.url??"/update/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:So(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let i=await wm(e),{force:a}=hm(i),c=await Pi({force:a});T(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let i=await Ti();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/wake"){let i=await ki();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=yo(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let i=await wm(e),a=_m(i);T(t,a.ok?200:400,a,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=yo(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){T(t,200,vi(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=bi(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await wi(a);T(t,c.ok?200:503,c,o.headers);return}T(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{T(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},la=async()=>{let e=await gm(),t=vm.default.createServer((r,n)=>{N_(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!ie()&&xt(O_.url)&&(async()=>{kt("agent-witch-wake-server");let e=await la(),t=xn(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var ca,Em=u(()=>{"use strict";br();so();st();ca=async()=>{let e=F();if(e===null)return;let t=Te(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Mt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var km,Lm=u(()=>{"use strict";ta();Wm();sa();Em();km=async(e={})=>{let t=await la();ca();let r=setInterval(()=>{ca()},6e4),n=setInterval(()=>{if(!Qu().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var zr,Oo,D_,xm,Rm,Mo,Cm,Pm,da,Tm,Ho,Im=u(()=>{"use strict";zr=g(require("node:fs")),Oo=g(require("node:path")),D_="pending-run-inputs.json",xm=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Rm=e=>{let t=e.profileEmail?Oo.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Oo.default.join(t,D_)},Mo=e=>{let t=Rm(e);if(!zr.default.existsSync(t))return{};try{let r=JSON.parse(zr.default.readFileSync(t,"utf8"));return xm(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!xm(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},Cm=(e,t)=>{let r=Rm(e);zr.default.mkdirSync(Oo.default.dirname(r),{recursive:!0}),zr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Pm=e=>Object.values(Mo(e)),da=(e,t)=>Mo(e)[t]!==void 0,Tm=(e,t)=>{let r=Mo(e);r[t.agentRunId]=t,Cm(e,r)},Ho=(e,t)=>{let r=Mo(e);delete r[t],Cm(e,r)}});var ua,Nm=u(()=>{"use strict";ua={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var ma,xk,Om=u(()=>{"use strict";ma={OPEN:"open",APPROVAL:"approval"},xk=ma.APPROVAL});var Yt,Do,Mm,F_,Hm,Dm,Fm,Fo,Um,pa=u(()=>{"use strict";Yt=g(require("node:fs")),Do=g(require("node:path")),Mm="runs",F_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hm=e=>{let t=e.profileEmail!==null?Do.default.join(e.installDir,"profiles",e.profileEmail,Mm):Do.default.join(e.installDir,Mm);return Yt.default.mkdirSync(t,{recursive:!0}),t},Dm=(e,t)=>Do.default.join(Hm(e),`${t}.json`),Fm=(e,t)=>{Yt.default.writeFileSync(Dm(e,t.id),JSON.stringify(t,null,2))},Fo=(e,t)=>{let r=Dm(e,t);if(!Yt.default.existsSync(r))return null;try{let n=JSON.parse(Yt.default.readFileSync(r,"utf8"));return!F_(n)||typeof n.id!="string"?null:n}catch{return null}},Um=e=>{let t=Hm(e),r=Yt.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Fo(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var U_,jm,$m=u(()=>{"use strict";Nm();Om();pa();U_=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?ua.COMPLETED:ua.FAILED,dispatchPolicy:ma.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},jm=(e,t)=>{let r=U_(t);return Fm(e,r),r}});var Kr,Uo,j_,ga,Bm,Gm,Vm,fa,zm=u(()=>{"use strict";Kr=g(require("node:fs")),Uo=g(require("node:path"));wr();j_="run-completion-outbox.json",ga=e=>{let t=e.profileEmail?Uo.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Uo.default.join(t,j_)},Bm=e=>{let t=ga(e);if(!Kr.default.existsSync(t))return[];try{let r=JSON.parse(Kr.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},Gm=(e,t)=>{Kr.default.mkdirSync(Uo.default.dirname(ga(e)),{recursive:!0}),Kr.default.writeFileSync(ga(e),JSON.stringify(t,null,2),"utf8")},Vm=(e,t)=>{let r=[...Bm(e).filter(n=>n.runId!==t.runId),t];Gm(e,r)},fa=async e=>{if(e.cloudApi===null)return;let t=Bm(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Kn(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);Gm(e.layout,r)}});var Km=u(()=>{"use strict"});var ha,qr,B_,ft,qm=u(()=>{"use strict";Km();ha=new Map,qr=e=>{let t=ha.get(e);t!==void 0&&(clearInterval(t),ha.delete(e))},B_=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},ft=(e,t,r,n={})=>{qr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){qr(t);return}let i=n.onTick?.()??{};B_(e,t,o,i)};s(),ha.set(t,setInterval(s,15e3))}});var ya,Jr,ht,Jm,$e,Ym,jo=u(()=>{"use strict";ya=new Set,Jr=new Map,ht=(e,t)=>{if(t.length===0)return;let r=Jr.get(e)??[];r.push(t),Jr.set(e,r)},Jm=e=>{ya.add(e);let t=Jr.get(e)??[];return Jr.delete(e),t},$e=e=>ya.has(e),Ym=e=>{ya.delete(e),Jr.delete(e)}});var Xm,Zm,Qm,ep,j,Xt,tp,rp,Yr,np,op,Aa,sp,ip,ap,$o=u(()=>{"use strict";Xm=require("node:crypto"),Zm=g(require("node:fs")),Qm=g(require("node:path")),ep=require("node:url");Ur();bt();bs();j=new Map,tp=async()=>{if(Xt!==void 0)return Xt;try{if(ie()){let e=_n(),t=Qm.default.join(e,"deps","node-pty","lib","index.js");if(Zm.default.existsSync(t)){let r=await import((0,ep.pathToFileURL)(t).href);return Xt=r,r}}return Xt=await import("node-pty"),Xt}catch{return Xt=null,null}},rp=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},Yr=(e,t,r)=>{let n=j.get(e);if(n!==void 0){j.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},np=(e,t)=>{let r=j.get(e);return r===void 0?!1:(r.pty.write(t),!0)},op=(e,t,r)=>{let n=j.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Aa=e=>{for(let t of j.values())if(!(t.mode!=="agent"||t.runId!==e))return we(t.pty.pid);return!1},sp=e=>{for(let[t,r]of j.entries())if(!(r.mode!=="agent"||r.runId!==e)){j.delete(t);try{r.pty.kill()}catch{}return!0}return!1},ip=async e=>{let t=await tp();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;j.get(e.shellSessionId)!==void 0&&Yr(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return j.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{rp(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{j.get(e.shellSessionId)?.pty===o&&(j.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},ap=async e=>{let t=e.shellSessionId??(0,Xm.randomUUID)(),r=await tp();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return j.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{rp(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{j.get(t)?.pty===n&&(j.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var Bo,lp,cp=u(()=>{"use strict";Bo="[[AWAITING_INPUT]]",lp=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Bo,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Xr,dp,Go=u(()=>{"use strict";cp();Xr=e=>{let t=e.indexOf(Bo);if(t<0)return null;let n=e.slice(t+Bo.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},dp=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",lp].join(`
`)});var up,mp=u(()=>{"use strict";jo();$o();Go();up=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if($e(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}ht(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await ap({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=Xr(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var pp,gp,fp,Be,Vo=u(()=>{"use strict";pp=require("node:child_process"),gp=g(require("node:fs")),fp=g(require("node:path"));wt();Be=(e,t)=>{let r=fp.default.join(e,"app",yl,"ensure-writer.sh");return gp.default.existsSync(r)?new Promise((n,o)=>{let s=(0,pp.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var hp,yt,Ko,yp,Ap,zo,Sp,qo,_p,bp,G_,Zr,V_,z_,wp,Sa=u(()=>{"use strict";hp=require("node:child_process");tt();Vo();Wr();nt();He();ot();yt=new Map,Ko=e=>e==="cursor"||e==="antigravity",yp=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Ap=e=>yt.get(e)?.warmed===!0,zo=e=>{let t=yt.get(e);yt.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Sp=e=>yt.get(e)?.conversationStarted===!0,qo=e=>{let t=yt.get(e);yt.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},_p=e=>{yt.delete(e)},bp=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",G_={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Zr=e=>`${G_[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,V_=(e,t,r,n)=>new Promise(o=>{let s=Mc(t,r),i=[],a=(0,hp.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let m=d.toString("utf8");i.push(m),n?.(m)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),z_=(e,t)=>{let r=Zr(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},wp=async e=>{if(!H(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&V(e.runConfig.writerExecutionBackend)==="api"){let r=Oe(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=Q(e.runConfig.layout.configPath);return Me(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),zo(e.writerAgent),{exitCode:0,output:Zr(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Be(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Ko(e.writerAgent)&&zo(e.writerAgent);let t=await V_(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?z_(e.writerAgent,t.output):Zr(e.writerAgent)}}});var vp,Qr,M,_a,Wp,Ep,ba,kp,Lp,xp,K_,ne,en,Ge,Rp,q_,J_,wa,Cp,Pp,Tp,Ip=u(()=>{"use strict";vp=require("node:child_process");tt();Im();$m();zm();qm();Ur();jo();$o();Go();mp();Sa();qs();Zs();He();mr();Go();Qr=new Map,M=new Map,_a=new Set,Wp=130,Ep=`

Stopped by user.`,ba=null,kp=e=>{ba=e},Lp=async e=>{await fa({layout:e,cloudApi:ba})},xp=e=>{let t=Qr.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:we(t.pid)},K_=e=>Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),ne=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},en=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Nn(s),c=M.get(r);if(a!==null&&c!==void 0){let d=Ql(a),m=xp(r)||Aa(r);d!==null&&!m&&Ge(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return Zl(a)}}),Ge=(e,t,r,n,o,s,i,a)=>{let c=o,d=Jn(s,a);r!==void 0&&_a.has(r)&&(_a.delete(r),c=Wp,d=d.trim().length>0&&!d.includes("Stopped by user.")?`${d.trim()}${Ep}`:"Stopped by user."),r!==void 0&&(qr(r),$e(r)&&(ne(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),Ym(r)),jm(e.layout,{agentRunId:r,originalPrompt:i,exitCode:c,output:d,layout:e.layout}),Vm(e.layout,{runId:r,exitCode:c,output:d,createdAt:new Date().toISOString()}),fa({layout:e.layout,cloudApi:ba}),M.delete(r),Qr.delete(r),Ho(e.layout,r)),ne(t,{type:"command.claude.result",payload:{exitCode:c,output:d,...r!==void 0?{agentRunId:r}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n})},Rp=(e,t,r,n,o,s,i)=>{let a=M.get(r),c=a?.accumulatedOutput??s;Tm(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),ft(t,r,()=>da(e.layout,r),en(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),ne(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},q_=(e,t,r,n,o,s,i)=>{let a=[],c=!1,d=m=>{if(!(o===void 0||m.length===0)){if($e(o)){ne(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:m},requestId:n});return}ht(o,m)}};if(o!==void 0){let m=M.get(o);Qr.set(o,t),M.set(o,{originalPrompt:s,writerAgent:i,projectFolderPath:m?.projectFolderPath,reportKey:m?.reportKey,accumulatedOutput:m?.accumulatedOutput??""}),ne(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),ft(r,o,()=>xp(o),en(e,r,o,n,m?.projectFolderPath,m?.reportKey))}t.stdout?.on("data",m=>{let y=m.toString("utf8");if(a.push(y),d(y),c||o===void 0)return;let w=Xr(a.join(""));if(w!==null){c=!0,t.kill("SIGTERM");let A=M.get(o),f=[A?.accumulatedOutput??"",w.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),Qr.delete(o),Rp(e,r,o,n,w.question,f,s)}}),t.stderr?.on("data",m=>{let y=m.toString("utf8");a.push(y),d(y)}),t.on("close",m=>{if(c)return;qo(i);let y=o!==void 0?M.get(o):void 0,w=a.join("").trim(),A=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${w}`.trim():w;Ge(e,r,o,n,m??-1,A,s)}),t.on("error",m=>{c||Ge(e,r,o,n,-1,m.message,s)})},J_=(e,t,r,n,o,s,i,a)=>{s!==void 0&&(M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),ne(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),ft(o,s,()=>M.has(s),en(e,o,s,n,i,a))),to(e,t,r,d=>{if(!(s===void 0||d.length===0)){if($e(s)){ne(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:d},requestId:n});return}ht(s,d)}}).then(d=>{qo(t),Ge(e,o,s,n,d.exitCode,d.output,r,d.llmUsage)}).catch(d=>{let m=d instanceof Error?d.message:String(d);Ge(e,o,s,n,-1,m,r)})},wa=(e,t,r,n,o,s,i,a,c,d)=>{if(eo(e,t)){J_(e,t,r,n,o,s,c,d);return}let m=It(t,r,K_(e),i);if(m===null){Ge(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let y=()=>{let w=(0,vp.spawn)(m.command,[...m.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});q_(e,w,o,n,s,r,t)};if(s===void 0){y();return}M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:M.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&On({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),ft(o,s,()=>M.has(s),en(e,o,s,n,c,d)),up({socket:o,sendMessage:ne,requestId:n,agentRunId:s,shellSessionId:a,command:m.command,args:m.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:w=>{a!==void 0&&Yr(a,l=>{ne(o,l)},n);let A=M.get(s),f=[A?.accumulatedOutput??"",w.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),Rp(e,o,s,n,w.question,f,r)},onFinished:(w,A)=>{qo(t);let f=M.get(s),l=f!==void 0&&f.accumulatedOutput.length>0?`${f.accumulatedOutput}

${A}`.trim():A;Ge(e,o,s,n,w,l,r)}}).then(w=>{if(!w){y();return}ft(o,s,()=>Aa(s),en(e,o,s,n,c,d))}).catch(w=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",w instanceof Error?w.message:w),y()})},Cp=(e,t,r,n)=>{Ho(e.layout,t.agentRunId),t.shellSessionId!==void 0&&ne(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=dp(t),s=M.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;wa(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c)},Pp=(e,t)=>{for(let r of Pm(e.layout))M.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),ft(t,r.agentRunId,()=>da(e.layout,r.agentRunId),{awaitingInput:!0}),ne(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Tp=(e,t,r,n)=>{let o=M.get(r);if(o===void 0)return!1;_a.add(r),qr(r);let s=Qr.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(sp(r))return!0;Ho(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${Ep}`:"Stopped by user.";return Ge(e,t,r,n,Wp,i,o.originalPrompt),!0}});var Y_,Np,Op=u(()=>{"use strict";Ht();Y_=()=>`http://127.0.0.1:${ee()}/restart`,Np=async()=>{try{let e=await fetch(Y_(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var At,va,X_,Z_,Wa,St,Jo,Mp,Yo=u(()=>{"use strict";At=g(require("node:fs")),va=g(require("node:path")),X_="local-ws-traffic.ndjson",Z_=500,Wa=e=>va.default.join(e.logsDir,X_),St=(e,t)=>{let r=Wa(e);At.default.mkdirSync(va.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});At.default.appendFileSync(r,`${n}
`,"utf8")},Jo=(e,t=Z_)=>{let r=Wa(e);if(!At.default.existsSync(r))return[];let o=At.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},Mp=e=>{let t=Wa(e);At.default.existsSync(t)&&At.default.writeFileSync(t,"","utf8")}});var Q_,Xo,Ea=u(()=>{"use strict";Ht();Q_=()=>`http://127.0.0.1:${ee()}/update/run`,Xo=async e=>{try{let t=await fetch(Q_(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Hp,Dp=u(()=>{"use strict";Hp=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var tn,eb,Fp,Up=u(()=>{"use strict";Yo();Ze();Ea();Dp();tn=(e,t)=>{St(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},eb=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Pt(),$n)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Fp=async e=>{let t=G(e.layout.installDir)?.bundleVersion??null;if(!Hp({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),tn(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await Xo({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),tn(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await eb();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),tn(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),tn(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),tn(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var tb,jp,$p=u(()=>{"use strict";tb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jp=e=>{if(!tb(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Bp,Gp,Vp=u(()=>{"use strict";Vs();so();Bp=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=zn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Gp=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Mt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Y,rb,nb,ob,zp,Kp,qp,Jp,Yp,Xp,Zp=u(()=>{"use strict";Y=require("node:crypto"),rb=Buffer.from("302a300506032b6570032100","hex"),nb=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},ob=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Y.createPublicKey)({key:Buffer.concat([rb,t]),format:"der",type:"spki"})},zp=()=>{let{publicKey:e,privateKey:t}=(0,Y.generateKeyPairSync)("ed25519");return{publicKeyRaw:nb(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Kp=e=>(0,Y.createPrivateKey)(e),qp=(e,t)=>(0,Y.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Jp=(e,t,r)=>{try{let n=ob(e);return(0,Y.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},Yp=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Xp=()=>(0,Y.randomBytes)(32).toString("base64url")});var We,Zo,Qp,sb,ib,ka,eg,tg,La=u(()=>{"use strict";We=g(require("node:fs")),Zo=g(require("node:path"));Zp();x();Qp=e=>Zo.default.join(e.installDir,vt),sb=(e,t)=>{if(e.profileEmail===null||t===Qp(e)||We.default.existsSync(t))return;let r=Qp(e);We.default.existsSync(r)&&(We.default.mkdirSync(Zo.default.dirname(t),{recursive:!0}),We.default.renameSync(r,t))},ib=e=>{if(!We.default.existsSync(e))return null;try{let t=We.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},ka=e=>{let t=kl(e);sb(e,t);let r=ib(t);if(r!==null)return r;let n=zp();return We.default.mkdirSync(Zo.default.dirname(t),{recursive:!0}),We.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},eg=e=>{let t=ka(e.layout),r=Xp(),n=Yp({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=Kp(t.privateKeyPem),s=qp(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},tg=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Jp(e.serverPublicKey,t,e.serverAttestation)}});var Qo,xa=u(()=>{"use strict";Qo={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var ab,rg,lb,ng,og=u(()=>{"use strict";xa();ab=new Set(Object.values(Qo)),rg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lb=e=>{if(!rg(e))return!1;let t=e.type;return!(typeof t!="string"||!ab.has(t)||e.payload!==void 0&&!rg(e.payload)||e.requestId!==void 0&&typeof e.requestId!="string")},ng=lb});var cb,sg,ig,ag=u(()=>{"use strict";og();xa();cb=new Set(Object.values(Qo)),sg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ig=e=>{if(!sg(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;return typeof t!="string"?{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e}:cb.has(t)?e.payload!==void 0&&!sg(e.payload)?{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:e.requestId!==void 0&&typeof e.requestId!="string"?{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e}:ng(e)?{formatOk:!0,formatError:null,command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}}});var lg,cg=u(()=>{"use strict";lg=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var db,ub,mb,rn,dg=u(()=>{"use strict";cg();db=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,ub=e=>db.test(e),mb=e=>lg(e),rn=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>rn(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&ub(n)){r[n]=mb(o);continue}r[n]=rn(o)}return r}});var me,Ra,pb,gb,fb,Ca,ug,mg,pg,hb,Pa,Zt,Ta,gg,es=u(()=>{"use strict";me=g(require("node:fs")),Ra=g(require("node:path"));ag();dg();pb="local-ws-trace.ndjson",gb=1e4,fb=1440*60*1e3,Ca=e=>Ra.default.join(e.logsDir,pb),ug=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},mg=e=>{if(!me.default.existsSync(e))return;let t=me.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-fb,o=t.filter(s=>{let i=ug(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-gb);me.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},pg=(e,t)=>{let r=Ca(e);me.default.mkdirSync(Ra.default.dirname(r),{recursive:!0}),me.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),mg(r)},hb=e=>e.parsed===null?{_empty:!0}:rn(e.parsed),Pa=(e,t,r)=>{let n=ig(r);pg(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:hb(n)})},Zt=(e,t)=>{pg(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:rn({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Ta=(e,t=80)=>{let r=Ca(e);if(mg(r),!me.default.existsSync(r))return[];let n=me.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=ug(s);i!==null&&o.push(i)}return o.reverse()},gg=e=>{let t=Ca(e);me.default.existsSync(t)&&me.default.writeFileSync(t,"","utf8")}});var fg,hg,yg=u(()=>{"use strict";es();fg=!1,hg=e=>{fg||(fg=!0,process.on("uncaughtException",t=>{Zt(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;Zt(e,{kind:"crash",message:r,stack:n})}))}});var yb,Ag,Sg=u(()=>{"use strict";yb="local.agentwitch.com",Ag=`http://${yb}:43347`});var _t,Ab,_g,bg=u(()=>{"use strict";_t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ab=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},_g=e=>e.entries.length===0?`<section class="card">
      <p class="eyebrow">WebSocket trace</p>
      <h2>Message trace</h2>
      <p class="lede muted">Redacted WS frames and local errors (kept 24h). Nothing recorded yet.</p>
    </section>`:`<section class="card">
      <p class="eyebrow">WebSocket trace</p>
      <h2>Message trace</h2>
      <p class="lede">Latest frames (tokens masked as <code>h***t</code>). Auto-pruned after 24 hours.</p>
      <form method="POST" action="/api/trace/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear trace</button>
      </form>
      <div class="table-wrap trace-table-wrap">
        <table>
          <thead>
            <tr><th>Time (UTC)</th><th>Dir</th><th>Command</th><th>Format</th><th>Body</th></tr>
          </thead>
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${_t(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?_t(r.direction):_t(r.kind),i=`trace-body-${n}`,a=_t(Ab(r.body));return`<tr>
        <td title="${_t(r.at)}">${_t(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${_t(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var nn,ts,Sb,_b,bb,wb,wg,vb,Wb,vg,on,Wg,sn,Eg,Ia=u(()=>{"use strict";nn=g(require("node:fs")),ts=g(require("node:path"));Lt();Gr();Sb="rag",_b="http://127.0.0.1:11434",bb="nomic-embed-text",wb=e=>ts.default.join(e.installDir,Sb),wg=(e,t)=>t!==void 0&&t.trim().length>0?je(t).ragChunksFilePath:ts.default.join(wb(e),Cn),vb=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},Wb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},vg=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||_b,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||bb;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},on=(e,t)=>{let r=wg(e,t);if(!nn.default.existsSync(r))return[];let n=nn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Wg=async e=>{let t=Wb(e.text);if(t.length===0)return 0;let r=wg(e.layout,e.projectFolderPath);nn.default.mkdirSync(ts.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await vg(o);if(s===null)continue;let i={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};nn.default.appendFileSync(r,`${JSON.stringify(i)}
`,"utf8"),n+=1}return n},sn=async e=>{let t=await vg(e.query);return t===null?[]:on(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:vb(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Eg=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var kg,Lg=u(()=>{"use strict";kg=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var xg,rs,Rg,ns=u(()=>{"use strict";Lg();xg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rs=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=xg(e),r=xg(kg(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Rg=`(function () {
  var formatElapsed = function (iso, nowMs) {
    if (!iso) return "never";
    var t = Date.parse(iso);
    if (Number.isNaN(t)) return "unknown";
    var elapsedSec = Math.max(0, Math.floor((nowMs - t) / 1000));
    if (elapsedSec < 60) return elapsedSec + "s";
    var totalMinutes = Math.floor(elapsedSec / 60);
    var remainingSeconds = elapsedSec % 60;
    if (totalMinutes < 60) {
      return remainingSeconds > 0
        ? totalMinutes + "m " + remainingSeconds + "s"
        : totalMinutes + "m";
    }
    var totalHours = Math.floor(elapsedSec / 3600);
    var remainingMinutes = Math.floor((elapsedSec % 3600) / 60);
    return remainingMinutes > 0
      ? totalHours + "h " + remainingMinutes + "m"
      : totalHours + "h";
  };
  var tick = function () {
    var nowMs = Date.now();
    document.querySelectorAll("[data-heartbeat-at]").forEach(function (el) {
      var iso = el.getAttribute("data-heartbeat-at");
      if (!iso) return;
      el.textContent = formatElapsed(iso, nowMs);
    });
  };
  tick();
  window.setInterval(tick, 1000);
})();`});var Qt,Cg,Pg=u(()=>{"use strict";Qt=(e,t,r)=>e===1?t:r,Cg=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Qt(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Qt(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${Qt(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Qt(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Qt(d,"month","months")} ago`;let m=Math.floor(a/365);return`${m} ${Qt(m,"year","years")} ago`}});var Na,Tg,Ig=u(()=>{"use strict";Na=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tg=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${Na(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Na(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${Na(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Ng,Og,Mg,Hg=u(()=>{"use strict";Ng=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Og=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Mg=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var er,Dg,Fg=u(()=>{"use strict";ns();er=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dg=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${er(e.wakeError)}</div>`:"",a=rs(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${er(e.installBundleVersion)}</code></span>
        <span class="muted">Last heartbeat \xB7 ${a}</span>
      </div>
    </section>
    <div class="home-grid">
      <a class="home-card" href="/task">
        <p class="home-card-eyebrow">Delegate</p>
        <h2 class="home-card-title">Task</h2>
        <p class="home-card-lede">Run a writer on this Mac and report status to cloud when done.</p>
        <p class="home-card-meta">${e.wsConnected?"Bridge connected \u2014 ready to delegate":"Connect bridge on Status first"}</p>
      </a>
      <a class="home-card" href="/status">
        <p class="home-card-eyebrow">Health</p>
        <h2 class="home-card-title">Bridge status</h2>
        <p class="home-card-lede">WebSocket, link code, install bundle, and revive actions.</p>
        <p class="home-card-meta">${e.wsConnected?"Bridge is up":"Check connection details"}</p>
      </a>
      <a class="home-card" href="/harness">
        <p class="home-card-eyebrow">Setup</p>
        <h2 class="home-card-title">Harness</h2>
        <p class="home-card-lede">View installed sets, apply them to a project <code>.cursor</code>, or import from repos.</p>
        <p class="home-card-meta">${er(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${er(n)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${er(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${er(o)}</p>
      </a>
    </div>`}});var tr,Eb,Ug,jg=u(()=>{"use strict";tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Eb=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Ug=e=>{let t=Eb.map(i=>`<option value="${tr(i.value)}">${tr(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${tr(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${tr(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${tr(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
      <p class="eyebrow">Delegate</p>
      <h1>Run a task on this Mac</h1>
      <p class="lede">Dispatch work locally and report status to cloud when finished \u2014 no live terminal stream required.</p>
      ${r}
      <form class="task-form" method="POST" action="/task/dispatch">
        <label class="field">
          <span class="field-label">Writer</span>
          <select class="input" name="writerAgent" required>${t}</select>
        </label>
        <label class="field">
          <span class="field-label">Project folder (optional)</span>
          <input class="input mono" type="text" name="projectFolder" value="${tr(e.defaultWorkspace)}" placeholder="/path/to/repo" />
        </label>
        <label class="field">
          <span class="field-label">Task</span>
          <textarea class="input textarea" name="prompt" rows="8" required placeholder="What should the writer do on this Mac?"></textarea>
        </label>
        <div class="actions">
          <button class="btn btn-primary" type="submit" ${e.wsConnected?"":"disabled"}>Delegate task</button>
        </div>
      </form>
      ${s}
    </section>`}});var pe,Oa,$g,Bg=u(()=>{"use strict";Js();pe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Oa=(e,t)=>e[t]?.apiKey!==void 0?"Saved (hidden)":"Not set",$g=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${pe(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
      <p class="eyebrow">Writer</p>
      <h1>API keys (optional)</h1>
      <p class="lede">Run Claude, Codex, or Antigravity tasks with provider HTTP APIs instead of installing their CLIs on this Mac. Keys stay in <span class="mono">writer-api-secrets.json</span> on this machine only.</p>
      <form class="task-form" method="POST" action="/writer-api">
        <fieldset class="field">
          <span class="field-label">Execution</span>
          <label><input type="radio" name="writerExecutionBackend" value="cli"${r} /> Local CLI (default)</label>
          <label><input type="radio" name="writerExecutionBackend" value="api"${n} /> API key + Agent Witch script</label>
        </fieldset>
        <p class="muted">Maps: Claude \u2192 Anthropic, Codex \u2192 OpenAI, Antigravity \u2192 Google Gemini. Cursor still requires CLI or Cursor Cloud on the website.</p>
        <label class="field">
          <span class="field-label">Anthropic API key \u2014 ${pe(Oa(e.secrets,"anthropic"))}</span>
          <input class="input mono" type="password" name="anthropicApiKey" autocomplete="off" placeholder="sk-ant-\u2026 (leave blank to keep)" />
        </label>
        <label class="field">
          <span class="field-label">Anthropic model (optional)</span>
          <input class="input mono" type="text" name="anthropicModel" placeholder="${pe(Ne.anthropic)}" value="${pe(e.secrets.anthropic?.model??"")}" />
        </label>
        <label class="field">
          <span class="field-label">OpenAI API key \u2014 ${pe(Oa(e.secrets,"openai"))}</span>
          <input class="input mono" type="password" name="openaiApiKey" autocomplete="off" placeholder="sk-\u2026 (leave blank to keep)" />
        </label>
        <label class="field">
          <span class="field-label">OpenAI model (optional)</span>
          <input class="input mono" type="text" name="openaiModel" placeholder="${pe(Ne.openai)}" value="${pe(e.secrets.openai?.model??"")}" />
        </label>
        <label class="field">
          <span class="field-label">Google API key \u2014 ${pe(Oa(e.secrets,"google"))}</span>
          <input class="input mono" type="password" name="googleApiKey" autocomplete="off" placeholder="AI\u2026 (leave blank to keep)" />
        </label>
        <label class="field">
          <span class="field-label">Gemini model (optional)</span>
          <input class="input mono" type="text" name="googleModel" placeholder="${pe(Ne.google)}" value="${pe(e.secrets.google?.model??"")}" />
        </label>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var Gg,Vg=u(()=>{"use strict";Gg=`
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: #fafafa;
  --aw-zinc-100: #f4f4f5;
  --aw-zinc-200: #e4e4e7;
  --aw-zinc-400: #a1a1aa;
  --aw-zinc-500: #71717a;
  --aw-zinc-600: #52525b;
  --aw-zinc-700: #3f3f46;
  --aw-zinc-800: #27272a;
  --aw-zinc-900: #18181b;
  --aw-emerald-50: #ecfdf5;
  --aw-emerald-700: #047857;
  --aw-amber-50: #fffbeb;
  --aw-amber-900: #78350f;
  --aw-red-50: #fef2f2;
  --aw-red-700: #b91c1c;
  --aw-radius-lg: 0.5rem;
  --aw-radius-xl: 0.75rem;
  --aw-radius-2xl: 1rem;
  --aw-shadow-sm: 0 1px 2px rgb(24 24 27 / 0.05);
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: Outfit, ui-sans-serif, system-ui, sans-serif;
  background: var(--aw-zinc-50);
  color: var(--aw-zinc-900);
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgb(228 228 231 / 0.7);
  background: rgb(255 255 255 / 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.site-header-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--aw-zinc-900);
}

.brand-mark { width: 1.75rem; height: 1.75rem; flex-shrink: 0; }
.brand-mark-fill { fill: rgb(24 24 27 / 0.05); stroke: none; }
.brand-mark-cross { stroke: var(--aw-zinc-900); stroke-width: 2.5; fill: none; }
.brand-mark-slash { stroke: var(--aw-zinc-400); stroke-width: 1.5; fill: none; }
.brand-mark-outline { stroke: currentColor; stroke-width: 2; fill: none; }

.brand-text {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.brand-sub {
  margin-left: 0.35rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--aw-zinc-500);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.brand-version {
  margin-left: 0.5rem;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--aw-zinc-700);
  background: var(--aw-zinc-100);
  border: 1px solid var(--aw-zinc-200);
  text-transform: none;
  vertical-align: middle;
}

.site-header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.cloud-open-link {
  flex-shrink: 0;
  white-space: nowrap;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  height: 2.25rem;
  padding: 0 0.75rem;
  border-radius: var(--aw-radius-lg);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--aw-zinc-700);
  transition: background 0.15s ease, color 0.15s ease;
}

.nav-link:hover { color: var(--aw-zinc-900); background: var(--aw-zinc-100); }
.nav-link.is-active { color: var(--aw-zinc-900); background: var(--aw-zinc-100); }

.site-main {
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: #fff;
  border-radius: var(--aw-radius-2xl);
  padding: 1.5rem;
  box-shadow: var(--aw-shadow-sm);
  outline: 1px solid rgb(228 228 231 / 0.5);
}

.card + .card { margin-top: 0; }

.eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--aw-zinc-500);
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--aw-zinc-900);
}

.lede {
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--aw-zinc-600);
}

.muted { color: var(--aw-zinc-500); font-size: 0.875rem; }

.meta-grid {
  display: grid;
  gap: 0.75rem;
  margin: 1.25rem 0 0;
}

@media (min-width: 640px) {
  .meta-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

.meta-item {
  border-radius: var(--aw-radius-xl);
  background: var(--aw-zinc-50);
  border: 1px solid var(--aw-zinc-200);
  padding: 0.875rem 1rem;
}

.meta-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--aw-zinc-500);
  margin-bottom: 0.25rem;
}

.meta-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--aw-zinc-900);
  word-break: break-word;
}

code, .mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  height: 1.5rem;
  padding: 0 0.625rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-online { background: #166534; color: #fff; }
.badge-offline { background: var(--aw-zinc-100); color: var(--aw-zinc-600); }
.badge-warn { background: var(--aw-amber-50); color: var(--aw-amber-900); }
.badge-error { background: var(--aw-red-50); color: var(--aw-red-700); }

.actions { margin-top: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.75rem;
  padding: 0 1.25rem;
  border-radius: var(--aw-radius-lg);
  border: none;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.btn:focus-visible {
  outline: 2px solid rgb(24 24 27 / 0.4);
  outline-offset: 2px;
}

.btn-primary {
  background: var(--aw-zinc-900);
  color: #fff;
  box-shadow: var(--aw-shadow-sm);
}
.btn-primary:hover { background: var(--aw-zinc-800); }

.btn-secondary {
  background: #fff;
  color: var(--aw-zinc-700);
  border: 1px solid var(--aw-zinc-200);
  box-shadow: var(--aw-shadow-sm);
}
.btn-secondary:hover { background: var(--aw-zinc-50); border-color: var(--aw-zinc-400); }

.btn-compact {
  height: 2.25rem;
  padding: 0 0.85rem;
  font-size: 0.8125rem;
}

.header-update-form { margin: 0; }

.update-banner {
  background: #fffbeb;
  border-color: #fde68a;
  margin-bottom: 1rem;
}

.update-banner-title {
  font-size: 1.125rem;
  margin: 0.35rem 0 0;
}

.site-main > .alert-success:first-child,
.site-main > .alert-error:first-child {
  margin-bottom: 1rem;
  margin-top: 0;
}

.search-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.search-row .input {
  flex: 1 1 16rem;
}

.input {
  min-width: 0;
  height: 2.75rem;
  padding: 0 0.75rem;
  border-radius: var(--aw-radius-lg);
  border: 1px solid var(--aw-zinc-200);
  background: #fff;
  color: var(--aw-zinc-900);
  font: inherit;
  font-size: 0.875rem;
  box-shadow: var(--aw-shadow-sm);
}

.input::placeholder { color: var(--aw-zinc-400); }
.input:focus {
  outline: none;
  border-color: var(--aw-zinc-900);
  box-shadow: 0 0 0 2px rgb(24 24 27 / 0.15);
}

.table-wrap {
  margin-top: 1.25rem;
  overflow: hidden;
  border-radius: var(--aw-radius-xl);
  border: 1px solid var(--aw-zinc-200);
  background: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

th {
  text-align: left;
  padding: 0.75rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--aw-zinc-500);
  background: var(--aw-zinc-50);
  border-bottom: 1px solid var(--aw-zinc-200);
}

td {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--aw-zinc-100);
  vertical-align: top;
  color: var(--aw-zinc-900);
}

tbody tr:last-child td { border-bottom: none; }

pre {
  margin: 0.75rem 0 0;
  padding: 0.75rem;
  border-radius: var(--aw-radius-lg);
  border: 1px solid var(--aw-zinc-200);
  background: var(--aw-zinc-50);
  white-space: pre-wrap;
  word-break: break-word;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  color: var(--aw-zinc-800);
}

.empty {
  margin: 0;
  padding: 1.25rem;
  border-radius: var(--aw-radius-xl);
  border: 1px dashed var(--aw-zinc-200);
  background: var(--aw-zinc-50);
  color: var(--aw-zinc-500);
  font-size: 0.875rem;
  text-align: center;
}

.alert-error {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--aw-radius-lg);
  background: var(--aw-red-50);
  color: var(--aw-red-700);
  font-size: 0.875rem;
}

.alert-success {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--aw-radius-lg);
  background: #ecfdf5;
  color: #047857;
  font-size: 0.875rem;
}

.home-footnote { margin-top: 0.5rem; }
.home-hero-badges {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}
.home-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  margin-top: 1rem;
}
.home-card {
  background: #fff;
  border: 1px solid var(--aw-zinc-200);
  border-radius: var(--aw-radius-xl);
  box-shadow: var(--aw-shadow-sm);
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem;
  text-decoration: none;
  transition: border-color 0.12s ease, box-shadow 0.12s ease;
}
.home-card:hover {
  border-color: var(--aw-zinc-400);
  box-shadow: 0 4px 14px rgb(24 24 27 / 0.08);
}
.home-card-eyebrow {
  color: var(--aw-zinc-500);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  margin: 0;
  text-transform: uppercase;
}
.home-card-title {
  font-size: 1.125rem;
  margin: 0;
}
.home-card-lede {
  color: var(--aw-zinc-600);
  font-size: 0.875rem;
  line-height: 1.45;
  margin: 0;
}
.home-card-meta {
  color: var(--aw-emerald-800);
  font-size: 0.8125rem;
  margin: 0.35rem 0 0;
}

.alert-warn {
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: var(--aw-radius-lg);
  color: #92400e;
  font-size: 0.875rem;
  margin: 0.75rem 0 0;
  padding: 0.65rem 0.85rem;
}
.error-log-view {
  background: var(--aw-zinc-900);
  border-radius: var(--aw-radius-lg);
  color: var(--aw-zinc-50);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  line-height: 1.45;
  margin-top: 0.75rem;
  max-height: 28rem;
  overflow: auto;
  padding: 0.85rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.stack { display: flex; flex-direction: column; gap: 0.75rem; }

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 0 0 auto;
  align-self: stretch;
}

.field > .input,
input.input[type="text"] {
  flex: none;
  box-sizing: border-box;
  width: 100%;
  height: 2.75rem;
  min-height: 2.75rem;
  max-height: 2.75rem;
}

.search-row input.input[type="text"] {
  flex: 1 1 16rem;
  width: auto;
}

.field-label { font-size: 0.8125rem; color: var(--aw-zinc-600); }

.textarea { min-height: 6rem; resize: vertical; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.8125rem; }

.check-list { list-style: none; margin: 0.75rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.reveal-live-list { display: flex; flex-direction: column; gap: 0.5rem; max-height: 16rem; overflow-y: auto; margin-top: 0.5rem; }
.reveal-live-group { border: 1px solid var(--aw-zinc-200); border-radius: 0.375rem; padding: 0.35rem 0.5rem; background: var(--aw-zinc-50); }
.reveal-group-summary { cursor: pointer; font-weight: 600; }
.reveal-live-tree { list-style: none; margin: 0.35rem 0 0; padding-left: 0.75rem; display: flex; flex-direction: column; gap: 0.2rem; }
.harness-group-name-field { margin-bottom: 0.75rem; }
.harness-group-title-input {
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.harness-group-title { font-size: 1.125rem; margin: 0 0 0.75rem; }
.harness-set-block + .harness-set-block { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--aw-zinc-200); }
.harness-set-include { margin-bottom: 0.5rem; }
.harness-tree-root { margin-top: 0.35rem; }
.harness-tree-root-summary { cursor: pointer; font-size: 0.875rem; color: var(--aw-zinc-600); list-style: none; }
.harness-tree-root-list { margin-top: 0.35rem; padding-left: 0.25rem; border-left: 1px solid var(--aw-zinc-200); }
.harness-tree { list-style: none; margin: 0; padding-left: 0.5rem; display: flex; flex-direction: column; gap: 0.1rem; }
.harness-tree-details { margin: 0.1rem 0; }
.harness-tree-summary {
  align-items: center;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  gap: 0.35rem;
  list-style: none;
  padding: 0.2rem 0.35rem;
  user-select: none;
}
.harness-tree-summary::-webkit-details-marker { display: none; }
.harness-tree-summary::before {
  color: var(--aw-zinc-500);
  content: "\u25B8";
  display: inline-block;
  font-size: 0.75rem;
  line-height: 1;
  transition: transform 0.12s ease;
  width: 0.75rem;
}
.harness-tree-details[open] > .harness-tree-summary::before { transform: rotate(90deg); }
.harness-tree-summary:hover { background: var(--aw-zinc-100); }
.harness-tree-folder-name { font-size: 0.875rem; font-weight: 500; }
.harness-tree-file {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-left: 1.1rem;
}
.harness-tree-file-name { font-size: 0.875rem; }
.harness-tree-file-kind { font-size: 0.75rem; margin-left: 0.35rem; }
.harness-tree-preview {
  align-items: baseline;
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: inherit;
  cursor: pointer;
  display: flex;
  font: inherit;
  gap: 0.35rem;
  padding: 0.2rem 0.35rem;
  text-align: left;
  width: 100%;
}
.harness-tree-preview:hover { background: var(--aw-zinc-100); color: var(--aw-emerald-800); }
.harness-tree-preview-body { margin: 0.25rem 0 0.5rem 1.1rem; padding: 0.75rem; max-height: 14rem; overflow: auto; background: var(--aw-zinc-900); color: var(--aw-zinc-50); border-radius: 0.375rem; font-size: 0.75rem; white-space: pre-wrap; }
.reveal-live-group > summary { cursor: pointer; font-weight: 600; list-style: none; user-select: none; }
.reveal-live-group > summary::-webkit-details-marker { display: none; }
.reveal-live-group > summary::before {
  color: var(--aw-zinc-500);
  content: "\u25B8";
  display: inline-block;
  margin-right: 0.35rem;
  transition: transform 0.12s ease;
}
.reveal-live-group[open] > summary::before { transform: rotate(90deg); }
.harness-tree-root-summary::-webkit-details-marker { display: none; }
.harness-tree-root-summary::before {
  color: var(--aw-zinc-500);
  content: "\u25B8";
  display: inline-block;
  margin-right: 0.35rem;
  transition: transform 0.12s ease;
}
.harness-tree-root[open] > .harness-tree-root-summary::before { transform: rotate(90deg); }
.reveal-folder-row { font-size: 0.8125rem; }
.reveal-progress { margin-top: 0.25rem; }

.check-row label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; }

.check-row input { margin-right: 0.35rem; }

.harness-set { margin-top: 1rem; }
.harness-installed + .card { margin-top: 1rem; }
.harness-installed-set-list { list-style: none; margin: 0.5rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.harness-installed-set { padding: 0.65rem 0.75rem; border: 1px solid var(--aw-zinc-200); border-radius: 0.5rem; }
.harness-apply-form { margin-top: 1rem; }
.project-list { list-style: none; margin: 1rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.project-list-link { display: flex; flex-direction: column; gap: 0.2rem; padding: 0.65rem 0.75rem; border: 1px solid var(--aw-zinc-200); border-radius: 0.5rem; text-decoration: none; color: inherit; }
.project-list-link:hover { border-color: var(--aw-zinc-400); background: var(--aw-zinc-50); }

.trace-table-wrap { margin-top: 0.75rem; }
.trace-body-pre {
  margin: 0.5rem 0 0;
  max-height: 16rem;
  overflow: auto;
  padding: 0.65rem 0.75rem;
  border-radius: var(--aw-radius-lg);
  background: var(--aw-zinc-50);
  border: 1px solid var(--aw-zinc-200);
  font-size: 0.75rem;
  white-space: pre-wrap;
  word-break: break-word;
}
`.trim()});var kb,Lb,zg,Kg,qg=u(()=>{"use strict";Vg();ns();kb=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Lb=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],zg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Kg=e=>{let t=Lb.map(o=>{let s=o.href===e.activePath;return`<a class="nav-link${s?" is-active":""}" href="${o.href}"${s?' aria-current="page"':""}>${o.label}</a>`}).join(""),r=zg(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"";return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${zg(e.title)} \xB7 Agent Witch Local</title>
  <style>${Gg}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${kb}
        <span class="brand-text">Agent Witch<span class="brand-sub">Local</span></span>
      </a>
      <div class="site-header-actions">
        <nav class="site-nav" aria-label="Local bridge">${t}</nav>
        ${n}
        <a class="btn btn-secondary cloud-open-link" href="${r}" target="_blank" rel="noopener noreferrer" aria-label="Open Agent Witch cloud at ${r}">Open cloud \u2197</a>
      </div>
    </div>
  </header>
  <main class="site-main">${e.prependBody??""}${e.body}</main>
  <script>${Rg}</script>
</body>
</html>`}});var Ma,Jg,Yg=u(()=>{"use strict";Ma=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jg=e=>{if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">Nothing in <code>~/.agent-witch</code> yet. Use <strong>Import</strong> below to scan a folder.</p>
    </section>`;let t=e.installed.sets.map(n=>`<li class="harness-installed-set">
          <span><strong>${Ma(n.name)}</strong> <span class="muted mono">(${Ma(n.slug)})</span></span>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join(""),r=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Ma(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">${e.installed.sets.length} set(s) on this Mac. Link them to a repo under <a href="/projects">Projects</a>.</p>
      ${r}
      <ul class="harness-installed-set-list">${t}</ul>
    </section>`}});var xb,Xg,Zg,Qg=u(()=>{"use strict";xb=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,Xg=e=>e.kind==="folder",Zg=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&Xg(d)){s=d;continue}let m={kind:"folder",name:a,children:new Map};s.children.set(a,m),s=m}}let r=n=>{let o=[];for(let s of n.children.values()){if(Xg(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(xb)};return r(t)}});var ef,Ha,tf=u(()=>{"use strict";ef=g(require("node:path")),Ha=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Ha(r.children,t)}</ul>
            </details>
          </li>`;let n=ef.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
          <button
            type="button"
            class="harness-tree-preview"
            data-source-path="${t(r.item.sourcePath)}"
            title="${t(r.item.relativePath)}"
          >
            <span class="harness-tree-file-name">${t(n)}</span>
            <span class="muted harness-tree-file-kind">${t(r.item.kind)}</span>
          </button>
          <pre class="harness-tree-preview-body" hidden></pre>
        </li>`}).join("")});var rf,Ve,Rb,Cb,os,Pb,nf,of=u(()=>{"use strict";rf=g(require("node:path"));Yg();Qg();tf();Ve=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rb=()=>`(() => {
  const scanInput = document.getElementById("scanFolder");
  const revealBtn = document.getElementById("revealStart");
  const stopBtn = document.getElementById("revealStop");
  const folderList = document.getElementById("revealFolderList");
  const progress = document.getElementById("revealProgress");
  let source = null;

  const readLastRevealScanFolder = () => {
    if (!(scanInput instanceof HTMLInputElement)) {
      return "";
    }
    return scanInput.dataset.lastRevealScan ?? "";
  };

  const normalizeScanFolder = (value) => value.trim();

  const syncRevealButtonVisibility = () => {
    if (!(scanInput instanceof HTMLInputElement)) {
      return;
    }
    if (!(revealBtn instanceof HTMLButtonElement)) {
      return;
    }
    const lastRevealScanFolder = readLastRevealScanFolder();
    if (lastRevealScanFolder.length === 0) {
      revealBtn.hidden = false;
      return;
    }
    const matchesLastReveal =
      normalizeScanFolder(scanInput.value) ===
      normalizeScanFolder(lastRevealScanFolder);
    revealBtn.hidden = matchesLastReveal;
  };

  const setRevealRunning = (running) => {
    if (revealBtn instanceof HTMLButtonElement) {
      if (running) {
        revealBtn.hidden = true;
      } else {
        syncRevealButtonVisibility();
      }
    }
    if (stopBtn instanceof HTMLButtonElement) {
      stopBtn.hidden = !running;
    }
    if (progress instanceof HTMLElement) {
      progress.hidden = !running;
    }
  };

  syncRevealButtonVisibility();
  scanInput?.addEventListener("input", syncRevealButtonVisibility);
  scanInput?.addEventListener("change", syncRevealButtonVisibility);

  const finishReveal = (query) => {
    if (source) {
      source.close();
      source = null;
    }
    setRevealRunning(false);
    window.location.href = "/harness?" + query;
  };

  document.getElementById("pickFolder")?.addEventListener("click", async () => {
    const response = await fetch("/api/harness/pick-folder", { method: "POST" });
    const payload = await response.json();
    if (scanInput instanceof HTMLInputElement && typeof payload.path === "string") {
      scanInput.value = payload.path;
      syncRevealButtonVisibility();
    }
  });

  revealBtn?.addEventListener("click", () => {
    if (!(scanInput instanceof HTMLInputElement)) {
      return;
    }
    const scanRoot = scanInput.value.trim();
    if (scanRoot.length === 0) {
      window.alert("Choose a folder to scan first.");
      return;
    }
    if (folderList instanceof HTMLElement) {
      folderList.replaceChildren();
    }
    setRevealRunning(true);
    source = new EventSource(
      "/api/harness/reveal/stream?scanRoot=" + encodeURIComponent(scanRoot),
    );
    source.addEventListener("folder", (event) => {
      const data = JSON.parse(event.data);
      if (!(folderList instanceof HTMLElement)) {
        return;
      }
      let group = folderList.querySelector(
        '[data-group-name="' + CSS.escape(data.groupName) + '"]',
      );
      if (!(group instanceof HTMLDetailsElement)) {
        group = document.createElement("details");
        group.className = "reveal-live-group";
        group.open = false;
        group.dataset.groupName = data.groupName;
        group.innerHTML =
          '<summary class="reveal-group-summary">' +
          data.groupName +
          '</summary><ul class="reveal-live-tree"></ul>';
        folderList.appendChild(group);
      }
    });
    source.addEventListener("set", (event) => {
      const data = JSON.parse(event.data);
      if (!(folderList instanceof HTMLElement)) {
        return;
      }
      let group = folderList.querySelector(
        '[data-group-name="' + CSS.escape(data.groupName) + '"]',
      );
      if (!(group instanceof HTMLDetailsElement)) {
        group = document.createElement("details");
        group.className = "reveal-live-group";
        group.open = false;
        group.dataset.groupName = data.groupName;
        group.innerHTML =
          '<summary class="reveal-group-summary">' +
          data.groupName +
          '</summary><ul class="reveal-live-tree"></ul>';
        folderList.appendChild(group);
      }
      const list = group.querySelector(".reveal-live-tree");
      if (!(list instanceof HTMLUListElement)) {
        return;
      }
      for (const relativePath of data.tree ?? []) {
        const row = document.createElement("li");
        row.className = "reveal-folder-row mono";
        row.textContent = relativePath;
        list.appendChild(row);
      }
    });
    source.addEventListener("done", () => {
      finishReveal("revealed=1");
    });
    source.addEventListener("stopped", () => {
      finishReveal("revealed=1&stopped=1");
    });
    source.addEventListener("error", () => {
      if (source) {
        finishReveal("revealed=1&stopped=1");
      }
    });
  });

  stopBtn?.addEventListener("click", () => {
    finishReveal("revealed=1&stopped=1");
  });

})();`,Cb=()=>`(() => {
  document.querySelectorAll(".harness-tree-preview").forEach((button) => {
    button.addEventListener("click", async () => {
      const preview = button.nextElementSibling;
      if (!(preview instanceof HTMLPreElement)) {
        return;
      }
      if (!preview.hidden) {
        preview.hidden = true;
        return;
      }
      if (preview.dataset.loaded !== "1") {
        const sourcePath = button.getAttribute("data-source-path") ?? "";
        const response = await fetch(
          "/api/harness/file-content?path=" + encodeURIComponent(sourcePath),
        );
        const payload = await response.json();
        preview.textContent =
          typeof payload.content === "string"
            ? payload.content
            : payload.errorMessage ?? "Could not load file.";
        preview.dataset.loaded = "1";
      }
      preview.hidden = false;
    });
  });
})();`,os=e=>{let t=Jg({installed:e.installed}),r=e.flashError?`<div class="alert-error">${Ve(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ve(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Pb(e.reveal),o=e.reveal?.scanRoots[0]?.trim()??"",s=o.length>0&&e.scanFolder.trim()===o,i=!e.importSectionExpanded,a=i?`<section class="card">
        <p class="muted">Import is hidden after a successful submit. Scan another folder when you need more harness files.</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",c=i?"":`<section class="card">
      <p class="eyebrow">Import</p>
      <h1>Reveal &amp; submit</h1>
      <p class="lede">Pick one folder under your home directory, scan for projects with <code>.cursor</code>, then submit your selection to the local harness. Scanning <code>~</code> can take a while \u2014 prefer a project folder or use <strong>Stop</strong>.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Ve(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Ve(o)}" />
        </label>
        <div class="actions">
          <button class="btn btn-secondary" type="button" id="pickFolder">Choose folder\u2026</button>
          <button class="btn btn-primary" type="button" id="revealStart"${s?" hidden":""}>Reveal</button>
          <button class="btn btn-secondary" type="button" id="revealStop" hidden>Stop</button>
        </div>
        <div class="reveal-progress" id="revealProgress" hidden>
          <p class="muted">Scanning\u2026 folders with <code>.cursor</code> appear below.</p>
          <div class="reveal-live-list" id="revealFolderList"></div>
        </div>
      </div>
    </section>
    ${n}
    <script>${Rb()}</script>
    <script>${Cb()}</script>`;return`${t}${r}${a}${c}`},Pb=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=Zg(a.items.map(w=>({...w,relativePath:typeof w.relativePath=="string"&&w.relativePath.length>0?w.relativePath:rf.default.relative(a.sourceRoot,w.sourcePath).replaceAll("\\","/")}))),m=Ha(d,Ve),y=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Ve(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Ve(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${y} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${m}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Ve(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},nf=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),m=a.trim();Number.isFinite(d)&&m.length>0&&o.set(d,m)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),m=d!==null&&Number.isFinite(d)?o.get(d):void 0,y=e.get(`setName-${i}`)?.trim()??m??a,w=t.sets[i];if(w===void 0)continue;let A=a.length>0?a:w.proposedSlug,f=y.length>0?y:w.proposedName,l=r.size===0||r.has(i),_=w.items.map(h=>({id:h.id,kind:h.kind,title:h.title,sourcePath:h.sourcePath,include:l}));s.push({slug:A,name:f,items:_})}return s}});var an,Da,sf,af,Tb,ss,Ib,lf,Fa,cf=u(()=>{"use strict";an=g(require("node:fs")),Da=g(require("node:path")),sf=require("node:crypto");No();af=e=>Da.default.join(e.harnessRootDir,"projects-registry.json"),Tb=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),ss=e=>{let t=af(e);if(!an.default.existsSync(t))return[];try{let r=JSON.parse(an.default.readFileSync(t,"utf8"));return Tb(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string"):[]}catch{return[]}},Ib=(e,t)=>{an.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};an.default.writeFileSync(af(e),`${JSON.stringify(r,null,2)}
`)},lf=(e,t)=>{let r=pt(t.projectFolderPath),n=t.name?.trim()||Da.default.basename(r)||"Project",o=ss(e),s=o.find(a=>pt(a.projectFolderPath)===r);if(s!==void 0)return s;let i={id:(0,sf.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return Ib(e,[...o,i]),i},Fa=(e,t)=>ss(e).find(r=>r.id===t)??null});var df,uf=u(()=>{"use strict";df=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var is,Ua,ln,Nb,Ee,as,rr=u(()=>{"use strict";is=g(require("node:fs")),Ua=g(require("node:os")),ln=g(require("node:path")),Nb=()=>is.default.realpathSync(ln.default.resolve(Ua.default.homedir())),Ee=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?ln.default.join(Ua.default.homedir(),t.slice(1)):t,n;try{n=is.default.realpathSync(ln.default.resolve(r))}catch{return null}let o=Nb();return n===o||n.startsWith(`${o}${ln.default.sep}`)?n:null},as=e=>{let t=Ee(e);if(t===null)return null;try{if(!is.default.statSync(t).isFile())return null}catch{return null}return t}});var oe,nr,cn,Ob,Mb,Hb,mf,pf=u(()=>{"use strict";oe=g(require("node:fs")),nr=g(require("node:path"));No();Vr();uf();rr();cn=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ob=e=>{if(!oe.default.existsSync(e))return null;try{let t=JSON.parse(oe.default.readFileSync(e,"utf8"));if(cn(t)&&t.version===1)return t}catch{return null}return null},Mb=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?nr.default.join(e.harnessRootDir,n):nr.default.join(e.harnessSetsDir,t,n);if(!oe.default.existsSync(o))return null;try{if(!oe.default.statSync(o).isFile())return null}catch{return null}return o},Hb=(e,t)=>{let r={};if(oe.default.existsSync(e))try{let o=JSON.parse(oe.default.readFileSync(e,"utf8"));cn(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};oe.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},mf=e=>{let t=[...new Set(e.setSlugs.map(m=>m.trim()).filter(m=>m.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=pt(e.projectFolderPath),n=Ee(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=oe.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Ob(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let i=cn(s.sets)?s.sets:{},a=nr.default.join(n,".cursor"),c=0;for(let m of t){let y=i[m];if(!cn(y))return{ok:!1,errorMessage:`Harness set "${m}" is not installed locally.`};let w=Array.isArray(y.items)?y.items:[];for(let A of w){if(!cn(A))continue;let f=typeof A.path=="string"?A.path.trim():"";if(f.length===0)continue;let l=df(f);if(l===null)continue;let _=Mb(e.layout,m,f);if(_===null)continue;let h=nr.default.join(a,l);oe.default.mkdirSync(nr.default.dirname(h),{recursive:!0}),oe.default.copyFileSync(_,h),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let d=ve({projectFolderPath:n});return Hb(d.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var ze,ja,gf=u(()=>{"use strict";ze=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ja=e=>{let t=e.flashError?`<div class="alert-error">${ze(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ze(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${ze(o.slug)}"${r.has(o.slug)?" checked":""} />
            <span><strong>${ze(o.name)}</strong> <span class="muted mono">(${ze(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${ze(e.project.name)}</h1>
      <p class="muted mono">${ze(e.project.projectFolderPath)}</p>
      <p class="lede">Linked harness sets are copied into this project&apos;s <code>.cursor</code> folder and recorded in <code>.agent-witch/project.json</code>.</p>
      <form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${ze(e.project.id)}" />
        <p class="field-label">Harness sets</p>
        ${n}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${e.installed.sets.length===0?" disabled":""}>Save linked harness</button>
        </div>
      </form>
    </section>`}});var ls,ff,hf=u(()=>{"use strict";ls=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ff=e=>{let t=e.flashError?`<div class="alert-error">${ls(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ls(e.flashMessage)}</div>`:"",r=e.projects.length===0?'<p class="empty">No projects yet. Add a repo folder to link harness sets and run tasks in context.</p>':`<ul class="project-list">${e.projects.map(n=>`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${ls(n.name)}</strong>
                  <span class="muted mono">${ls(n.projectFolderPath)}</span>
                </a>
              </li>`).join("")}</ul>`;return`${t}<section class="card">
      <p class="eyebrow">Workspaces</p>
      <h1>Projects</h1>
      <p class="lede">Register repo folders on this Mac. Open a project to choose which profile harness sets apply to its <code>.cursor</code> tree.</p>
      <form method="POST" action="/projects/add" class="stack">
        <div class="actions">
          <button class="btn btn-primary" type="submit">Add project\u2026</button>
        </div>
      </form>
      ${r}
    </section>`}});var $a,Ba,yf=u(()=>{"use strict";$a=g(require("node:fs"));Gr();Ba=e=>{let t=je(e);if(!$a.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse($a.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var Va,Ga,or,Af=u(()=>{"use strict";Va=g(require("node:fs")),Ga=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),or=e=>{if(!Va.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Va.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Ga(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=Ga(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!Ga(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",m=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:m.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var za,Sf=u(()=>{"use strict";za=()=>"~"});var _f,Ka,bf=u(()=>{"use strict";_f=require("node:child_process"),Ka=()=>{if(process.platform!=="darwin")return null;try{let t=(0,_f.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var wf,vf,Wf=u(()=>{"use strict";wf=require("node:crypto"),vf=e=>`local-${(0,wf.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var qa,Ef=u(()=>{"use strict";qa=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var dn,cs,Ja=u(()=>{"use strict";dn=g(require("node:path")),cs=e=>{let t=dn.default.dirname(e),r=dn.default.basename(t);return r==="agents"?dn.default.basename(dn.default.dirname(t)):r}});var un,ke,kf,Db,Fb,Ub,ds,Lf,Ya=u(()=>{"use strict";un=g(require("node:fs")),ke=g(require("node:path"));Wf();Ef();Ja();kf=new Set(["node_modules",".git","dist","build",".next","coverage"]),Db=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Fb=(e,t)=>{let r=ke.default.basename(t);if(e==="skill"){let n=t.split(ke.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Ub=e=>{let t=[],r=(o,s)=>{let i;try{i=un.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&kf.has(a.name))continue;let c=ke.default.join(o,a.name),d=s?ke.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;qa(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=ke.default.join(e,o);un.default.existsSync(s)&&r(s,o)}let n=ke.default.join(e,"skills");return un.default.existsSync(n)&&r(n,"skills"),t},ds=e=>{let t=Ub(e);if(t.length===0)return null;let r=ke.default.dirname(e),n=cs(e),o=Db(n),s=t.map(i=>{let a=qa(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:vf(i.absolutePath),kind:a,title:Fb(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},Lf=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=un.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||kf.has(a.name))continue;let c=ke.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var xf,Xa,jb,Rf,Cf=u(()=>{"use strict";xf=g(require("node:fs")),Xa=g(require("node:path"));Ya();rr();jb=e=>{let t=Ee(e.trim());if(t===null)return null;if(Xa.default.basename(t)===".cursor")return t;let r=Xa.default.join(t,".cursor");try{if(xf.default.statSync(r).isDirectory())return Ee(r)}catch{return null}return null},Rf=e=>{let t=jb(e.projectPath);if(t===null)return null;let r=ds(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var Pf,$b,us,Tf,If=u(()=>{"use strict";Pf=g(require("node:path"));Ya();rr();Ja();$b=5,us=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Tf=e=>{let t=Ee(e.scanRoot.trim());if(t===null)return us(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of Lf(t,$b,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Ee(s);if(i===null)continue;let a=cs(i);us(e.response,"folder",{cursorDir:i,groupName:a,repoPath:Pf.default.dirname(i)});let c=ds(i);c!==null&&(r.push(c),us(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return us(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var Nf,Of,Mf=u(()=>{"use strict";Nf=g(require("node:path")),Of=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Nf.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var U,Hf,Za,Bb,Df,Qa,el,Ff,ms,Uf=u(()=>{"use strict";U=g(require("node:fs")),Hf=g(require("node:os")),Za=g(require("node:path"));di();rr();Mf();Bb=e=>{if(!U.default.existsSync(e))return null;try{let t=JSON.parse(U.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Df=e=>{let t=e.hostname??Hf.default.hostname(),r=Bb(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(m=>m.include);if(a.length===0)continue;let c=[];for(let m of a){let y=as(m.sourcePath);if(y===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${m.sourcePath}`};let w=U.default.readFileSync(y,"utf8");c.push({id:m.id,kind:m.kind,title:m.title,content:w,setSlugs:[i.slug]})}let d=co({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let m of d.directories)o.add(m);for(let m of d.files)s.push(m),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{U.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)U.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Za.default.join(e.layout.harnessRootDir,i.relativePath);U.default.mkdirSync(Za.default.dirname(a),{recursive:!0}),U.default.writeFileSync(a,i.content)}return U.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Qa="reveal-cache.json",el=(e,t)=>{U.default.mkdirSync(e.harnessRootDir,{recursive:!0}),U.default.writeFileSync(`${e.harnessRootDir}/${Qa}`,`${JSON.stringify(t,null,2)}
`)},Ff=e=>{let t=`${e.harnessRootDir}/${Qa}`;U.default.existsSync(t)&&U.default.unlinkSync(t)},ms=e=>{let t=`${e.harnessRootDir}/${Qa}`;if(!U.default.existsSync(t))return null;try{let r=JSON.parse(U.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return Of(r)}catch{return null}return null}});var jf,$f=u(()=>{"use strict";jf=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Ke,Bf,Gb,Gf,tl,Vf=u(()=>{"use strict";Ke=g(require("node:fs")),Bf=g(require("node:path")),Gb=256e3,Gf=e=>{Ke.default.mkdirSync(Bf.default.dirname(e),{recursive:!0}),Ke.default.writeFileSync(e,"","utf8")},tl=(e,t=Gb)=>{if(!Ke.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Ke.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Ke.default.openSync(e,"r");try{Ke.default.readSync(a,i,0,s,o)}finally{Ke.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var zf,Kf,rl,qf,Jf=u(()=>{"use strict";zf=require("node:crypto"),Kf=g(require("node:fs"));wr();ro();tt();st();rl=!1,qf=async e=>{if(rl)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!H(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=F();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Tt({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&Kf.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,zf.randomUUID)();rl=!0;try{if(await Nc(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Ot({...r,workspace:o},e.writerAgent,t);return await Kn(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{rl=!1}}});var ps,Yf,Xf=u(()=>{"use strict";ps=g(require("node:fs"));Ys();Yf=(e,t)=>{let r=Qn(e);ps.default.mkdirSync(e,{recursive:!0}),ps.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{ps.default.chmodSync(r,384)}catch{}}});var mn,Vb,nl,Zf,Qf=u(()=>{"use strict";mn=g(require("node:fs"));nt();Xf();He();Vb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nl=(e,t,r,n)=>{let o=r?.trim()??"",s=n?.trim()??"",i=e[t];if(o.length===0&&s.length===0)return e;let a=o.length>0?o:i?.apiKey;if(a===void 0||a.length===0)return e;let c=s.length>0?s:i?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Zf=e=>{let t=Q(e.configPath),r={};if(mn.default.existsSync(e.configPath))try{let o=JSON.parse(mn.default.readFileSync(e.configPath,"utf8"));Vb(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,mn.default.mkdirSync(t,{recursive:!0}),mn.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=nl(nl(nl(rt(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);Yf(t,n)}});var eh,gs,ol=u(()=>{"use strict";eh=g(require("node:path"));ti();ri();st();Rt();x();gs=e=>{let t=F()?.layout.installDir??v();if(eh.default.basename(t)===no)return Qs;let r=F(),n=r!==null?Z(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):Qs}});var th,rh=u(()=>{"use strict";Ze();Pt();ol();th=async e=>{let t=G(e.installDir),r=t?.bundleVersion??null,n=gs(t);try{let o=await Ds(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Dn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var nh,oh=u(()=>{"use strict";nh=e=>!e});var sh,ih,ah=u(()=>{"use strict";Ea();sh=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},ih=async()=>{let e=await Xo({force:!0});if(e.ok)return{ok:!0,message:sh(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:sh(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Pt(),$n)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var ch,pn,dh,il,lh,zb,sl,D,al,N,K,sr,Kb,qb,uh,mh,ph=u(()=>{"use strict";ch=g(require("node:http")),pn=g(require("node:fs")),dh=g(require("node:path"));Sg();Yo();es();bg();Ia();Rr();Ft();ns();Pg();Ig();Hg();Fg();jg();Bg();qg();of();cf();pf();gf();hf();yf();Af();Sf();bf();Cf();rr();If();Uf();Vr();$f();Vf();Ze();Jf();st();Qf();nt();ot();He();ol();rh();oh();ah();La();il=e=>Cg(e)??"never",lh=48e3,zb=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0?!0:or(e).sets.length===0,sl=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??za(),reveal:t.reveal,installed:or(e),flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),D=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),al={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},N=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...al}),e.end(JSON.stringify(r))},K=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},sr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Kb=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${D(e.status.wakeError)}</div>`:"",o=nh(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${rs(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${D(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${D(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${D(il(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${D(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},qb=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},uh=e=>{let t=dh.default.join(e.layout.installDir,"link-code.txt"),r=()=>G(e.layout.installDir),n=()=>{let A=r();return{installBundleVersion:jf(A),installBundleUpdatedAt:A?.updatedAt??null,installVersion:A}},o=async A=>{let f=A.installVersion??r(),l=await i(),_=Og(l),h=Mg(A.updateFlash??null);return Kg({title:A.title,activePath:A.activePath,body:A.body,cloudAppOrigin:gs(f),prependBody:`${h}${_}`,headerUpdateButtonHtml:Ng(l)})},s=null,i=async()=>{let A=Date.now();if(s!==null&&A-s.cachedAtMs<6e4)return s.offer;let f=await th(e.layout);return s={cachedAtMs:A,offer:f},f},a=()=>{s=null},c=!1,d=()=>{c||(c=!0,ih().catch(A=>{console.error("[agent-witch-local-app] install bundle update failed:",A)}).finally(()=>{c=!1,a()}))},m=async A=>{if(a(),!(await i()).updateAvailable){A.writeHead(303,{Location:"/?update=ok"}),A.end();return}A.writeHead(303,{Location:"/?update=started"}),A.end(),d()},y=()=>{if(pn.default.existsSync(t))return pn.default.readFileSync(t,"utf8").trim();let A=Math.random().toString(36).slice(2,8).toUpperCase();return pn.default.writeFileSync(t,A,"utf8"),A},w=ch.default.createServer((A,f)=>{(async()=>{let l=A.url?.split("?")[0]??"/",_=A.method??"GET";if(_==="OPTIONS"){f.writeHead(204,al),f.end();return}if(_==="GET"&&l==="/health"){let h=e.controllers.getStatus(),p=n();N(f,200,{ok:!0,...h,installBundleVersion:p.installBundleVersion,installBundleUpdatedAt:p.installBundleUpdatedAt});return}if(_==="GET"&&l==="/api/status"){let h=n();N(f,200,{...e.controllers.getStatus(),linkCode:y(),installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(_==="GET"&&l==="/api/traffic"){N(f,200,{entries:Jo(e.layout)});return}if(_==="DELETE"&&l==="/api/traffic"){Mp(e.layout),N(f,200,{ok:!0});return}if(_==="GET"&&l==="/api/trace"){N(f,200,{entries:Ta(e.layout)});return}if(_==="DELETE"&&l==="/api/trace"||_==="POST"&&l==="/api/trace/clear"){if(gg(e.layout),_==="POST"){f.writeHead(303,{Location:"/status"}),f.end();return}N(f,200,{ok:!0});return}if(_==="POST"&&l==="/api/errors/clear"){Gf(e.layout.errorLogPath),f.writeHead(303,{Location:"/errors"}),f.end();return}if(_==="GET"&&l==="/api/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(p.length>0){let S=await sn({layout:e.layout,query:p,limit:20});N(f,200,{chunks:S,query:p});return}N(f,200,{chunks:on(e.layout).slice(-50).reverse()});return}if(_==="POST"&&l==="/api/revive"){e.controllers.reviveWebSocket(),N(f,200,{ok:!0});return}if(_==="GET"&&l==="/api/update-status"){let h=await i();N(f,200,{ok:!0,...h});return}if((_==="GET"||_==="POST")&&l==="/api/update"){await m(f);return}if(_==="GET"&&l==="/"){let h=e.controllers.getStatus(),p=n(),S=or(e.layout),b=tl(e.layout.errorLogPath);K(f,await o({title:"Home",activePath:"/",installVersion:p.installVersion,updateFlash:qb(A.url??void 0),body:Dg({wsConnected:h.wsConnected,lastHeartbeatAt:h.lastHeartbeatAt,installBundleVersion:p.installBundleVersion,harnessSetCount:S.sets.length,knowledgeChunkCount:on(e.layout).length,trafficEntryCount:Jo(e.layout).length,wakeError:h.wakeError,errorLogByteSize:b.byteSize,errorLogExists:b.exists})}));return}if(_==="GET"&&l==="/task"){let h=e.controllers.getStatus(),p=n(),S=F(),b=new URL(A.url??"/",`http://127.0.0.1:${43347}`),W=b.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=b.searchParams.get("failed")==="1"?b.searchParams.get("error")?.trim()??"Task failed.":null,R=b.searchParams.get("runId");K(f,await o({title:"Task",activePath:"/task",installVersion:p.installVersion,body:Ug({defaultWorkspace:S?.workspace??"",wsConnected:h.wsConnected,flashMessage:W,flashError:k,lastRunId:R})}));return}if(_==="POST"&&l==="/task/dispatch"){let h=await sr(A),p=new URLSearchParams(h),S=p.get("prompt")?.trim()??"",b=p.get("writerAgent")?.trim()??"claude-cli",W=p.get("projectFolder")?.trim()??"",k=await qf({prompt:S,writerAgent:b,...W.length>0?{projectFolderPath:W}:{}}),R=new URLSearchParams;k.ok?R.set("ok","1"):(R.set("failed","1"),k.errorMessage!==void 0&&R.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&R.set("runId",k.agentRunId),f.writeHead(303,{Location:`/task?${R.toString()}`}),f.end();return}if(_==="GET"&&l==="/errors"){let h=n(),p=tl(e.layout.errorLogPath);K(f,await o({title:"Errors",activePath:"/errors",installVersion:h.installVersion,body:Tg({errorLogPath:e.layout.errorLogPath,content:p.content,exists:p.exists,truncated:p.truncated,byteSize:p.byteSize})}));return}if(_==="GET"&&l==="/status"){let h=e.controllers.getStatus(),p=te(e.layout),S=ce(p,le),b=n();K(f,await o({title:"Status",activePath:"/status",installVersion:b.installVersion,body:`${Kb({status:h,stale:S,linkCode:y(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt})}${_g({entries:Ta(e.layout)})}`}));return}if(_==="GET"&&l==="/traffic"){let h=Jo(e.layout),p=n(),S=h.map(W=>`<tr><td title="${D(W.at)}">${D(il(W.at))}</td><td>${D(W.direction)}</td><td><code>${D(W.type)}</code></td><td>${D(W.summary)}</td><td>${D(W.action??"")}</td></tr>`).join(""),b=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${S}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';K(f,await o({title:"Traffic",activePath:"/traffic",installVersion:p.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${b}
            </section>`}));return}if(_==="GET"&&l==="/projects"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),S=h.searchParams.get("added")==="1"?"Project added.":null;K(f,await o({title:"Projects",activePath:"/projects",installVersion:p.installVersion,body:ff({projects:ss(e.layout),flashMessage:S})}));return}if(_==="GET"&&l==="/project"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=h.searchParams.get("id")?.trim()??"",S=Fa(e.layout,p);if(S===null){f.writeHead(404),f.end("Project not found");return}let b=n(),W=h.searchParams.get("linked")==="1"?`Harness linked (${h.searchParams.get("files")??"0"} file(s) written).`:null;K(f,await o({title:S.name,activePath:"/projects",installVersion:b.installVersion,body:ja({project:S,installed:or(e.layout),linkedSetSlugs:Ba(S.projectFolderPath),flashMessage:W})}));return}if(_==="POST"&&l==="/projects/add"){let h=Ka();if(h===null){f.writeHead(303,{Location:"/projects"}),f.end();return}ve({projectFolderPath:h}),lf(e.layout,{projectFolderPath:h}),f.writeHead(303,{Location:"/projects?added=1"}),f.end();return}if(_==="POST"&&l==="/projects/link-harness"){let h=await sr(A),p=new URLSearchParams(h),S=p.get("projectId")?.trim()??"",b=Fa(e.layout,S);if(b===null){f.writeHead(404),f.end("Project not found");return}let W=p.getAll("applySet").map(R=>String(R)),k=mf({layout:e.layout,projectFolderPath:b.projectFolderPath,setSlugs:W});if(!k.ok){let R=n();K(f,await o({title:b.name,activePath:"/projects",installVersion:R.installVersion,body:ja({project:b,installed:or(e.layout),linkedSetSlugs:Ba(b.projectFolderPath),flashError:k.errorMessage})}));return}f.writeHead(303,{Location:`/project?id=${encodeURIComponent(b.id)}&linked=1&files=${k.writtenFileCount}`}),f.end();return}if(_==="GET"&&l==="/harness"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),S=ms(e.layout),b=h.searchParams.get("submitted")==="1",W=b?h.searchParams.get("syncFailed")==="1"?`Local harness updated (${h.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:h.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${h.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":h.searchParams.get("stopped")==="1"?`Reveal stopped. ${S?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:h.searchParams.get("revealed")==="1"?`Reveal found ${S?.sets.length??0} set(s).`:null,k=S?.scanRoots[0]??za(),R=zb(e.layout,{reveal:S,importQuery:h.searchParams.get("import")==="1",justSubmitted:b});K(f,await o({title:"Harness",activePath:"/harness",installVersion:p.installVersion,body:os(sl(e.layout,{reveal:S,scanFolder:k,flashMessage:W,importSectionExpanded:R}))}));return}if(_==="POST"&&l==="/api/harness/pick-folder"){let h=Ka();if(h===null){N(f,200,{cancelled:!0});return}N(f,200,{path:h});return}if(_==="GET"&&l==="/api/harness/file-content"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",S=as(p);if(S===null){N(f,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let b=pn.default.readFileSync(S,"utf8"),W=b.length>lh?`${b.slice(0,lh)}
\u2026 (truncated)`:b;N(f,200,{content:W})}catch{N(f,500,{errorMessage:"Could not read file."})}return}if(_==="POST"&&l==="/api/harness/reveal/add-project"){let h=await sr(A),p="";try{let W=JSON.parse(h);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(p=W.projectPath.trim())}catch{N(f,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(p.length===0){N(f,400,{ok:!1,errorMessage:"projectPath is required."});return}let S=ms(e.layout),b=Rf({reveal:S,projectPath:p});if(b===null||b.sets.length===0){N(f,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}el(e.layout,b),N(f,200,{ok:!0,setCount:b.sets.length});return}if(_==="GET"&&l==="/api/harness/reveal/stream"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(p.length===0){N(f,400,{errorMessage:"Choose a folder to scan first."});return}let S=!1;A.on("close",()=>{S=!0}),f.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...al});let b=Tf({scanRoot:p,response:f,shouldAbort:()=>S});el(e.layout,b),f.end();return}if(_==="POST"&&l==="/harness/reveal"){f.writeHead(410,{"Content-Type":"text/plain"}),f.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(_==="POST"&&l==="/harness/submit"){let h=ms(e.layout);if(h===null){let se=n();K(f,await o({title:"Harness",activePath:"/harness",installVersion:se.installVersion,body:os(sl(e.layout,{reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let p=await sr(A),S=new URLSearchParams(p),b=nf(S,h),W=Df({layout:e.layout,sets:b});if(!W.ok){let se=n();K(f,await o({title:"Harness",activePath:"/harness",installVersion:se.installVersion,body:os(sl(e.layout,{reveal:h,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Ff(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";f.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${R}`}),f.end();return}if(_==="GET"&&l==="/writer-api"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),S=F()?.writerExecutionBackend??V(void 0),b=Q(e.layout.configPath),W=rt(b),k=h.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();K(f,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:$g({writerExecutionBackend:S,secrets:W,flashMessage:k})}));return}if(_==="POST"&&l==="/writer-api"){let h=await sr(A),p=new URLSearchParams(h),S=p.get("writerExecutionBackend")?.trim()??"cli";Zf({configPath:e.layout.configPath,writerExecutionBackend:V(S),anthropicApiKey:p.get("anthropicApiKey")??void 0,anthropicModel:p.get("anthropicModel")??void 0,openaiApiKey:p.get("openaiApiKey")??void 0,openaiModel:p.get("openaiModel")??void 0,googleApiKey:p.get("googleApiKey")??void 0,googleModel:p.get("googleModel")??void 0}),f.writeHead(303,{Location:"/writer-api?saved=1"}),f.end();return}if(_==="GET"&&l==="/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",S=n(),W=(p.length>0?await sn({layout:e.layout,query:p,limit:20}):on(e.layout).slice(-50).reverse()).map(k=>`<article class="card"><div class="muted" title="${D(k.createdAt)}">${D(il(k.createdAt))}${k.source?` \xB7 ${D(k.source)}`:""}</div><pre>${D(k.text)}</pre></article>`).join("");K(f,await o({title:"Knowledge",activePath:"/knowledge",installVersion:S.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${D(p)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${W||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}_==="POST"&&await sr(A),f.writeHead(404),f.end("Not found")})().catch(l=>{console.error("[agent-witch-local-app]",l),f.writeHead(500),f.end("Internal error")})});return w.on("error",A=>{if(A.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",A)}),w.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Ag}`)}),w},mh=e=>ka(e).publicKeyRaw});var gn,ll,gh,fh,hh,yh,Ah=u(()=>{"use strict";gn=g(require("node:fs")),ll=g(require("node:path"));Lt();Gr();gh=(e,t)=>ll.default.join(je(t).memoryDirPath,Pn),fh=(e,t)=>{let r=gh(e,t);if(!gn.default.existsSync(r))return[];let n=gn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},hh=e=>{let t=gh(e.layout,e.projectFolderPath);gn.default.mkdirSync(ll.default.dirname(t),{recursive:!0}),gn.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},yh=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Sh,Jb,Yb,Xb,_h,bh=u(()=>{"use strict";Sh=g(require("node:os"));x();Jb="Default",Yb=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),Xb=e=>{let t=Sh.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},_h=()=>{let e=L(),t=El(e),r=Yb(Jb);return`${Xb(t)}/${r.length>0?r:"project"}`}});var wh,Zb,vh,Wh=u(()=>{"use strict";wh=require("node:child_process");Vo();tt();Wr();nt();He();ot();Zb=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,wh.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},vh=async e=>{if(!H(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&V(e.runConfig.writerExecutionBackend)==="api"){let r=Oe(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=Q(e.layout.configPath),o=Me(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Be(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await Zb(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Eh,kh=u(()=>{"use strict";Eh=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var Lh,xh,Rh=u(()=>{"use strict";Lh=require("node:crypto"),xh=()=>(0,Lh.randomUUID)()});var fn,Qb,Ch,fs=u(()=>{"use strict";fn="[[WORKING_ESTIMATE]]",Qb=["Put this marker on its own line:",fn,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),Ch=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",Qb,"","Task to estimate:",e.trim()].join(`
`)});var Ph,Th=u(()=>{"use strict";Ph=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Ih,Nh=u(()=>{"use strict";Ih=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var ew,Oh,Mh=u(()=>{"use strict";fs();ew=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Oh=e=>{if(!e.includes(fn))return null;let t=null;for(let r of e.matchAll(ew)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var Hh,Dh=u(()=>{"use strict";ro();fs();Th();Nh();Mh();mr();Hh=async e=>{let t=Ph(e.wrappedPrompt),r=Ch(t),n=await Ot(e.config,e.writerAgent,r),o=Oh(n.output),s=Ih(o);return ur({reportKey:e.reportKey,agentRunId:e.agentRunId,status:ae.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var Fh={};qe(Fh,{buildContinuationPromptWithContext:()=>nw});var tw,rw,nw,Uh=u(()=>{"use strict";tw=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,rw=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),nw=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=rw(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${tw(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var jh={};qe(jh,{readHarnessExportSets:()=>sw});var hn,cl,hs,ow,sw,$h=u(()=>{"use strict";hn=g(require("node:fs")),cl=g(require("node:path"));x();hs=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ow=e=>{if(!hn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(hn.default.readFileSync(e.harnessManifestPath,"utf8"));if(hs(t))return t}catch{return null}return null},sw=(e,t)=>{let r=L(t),n=ow(r);if(n===null)return[];let o=hs(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!hs(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let m of c){if(!hs(m))continue;let y=typeof m.path=="string"?m.path:void 0,w=typeof m.id=="string"?m.id:"",A=typeof m.kind=="string"?m.kind:"",f=typeof m.title=="string"?m.title:"";if(y===void 0||w.length===0||A.length===0||f.length===0)continue;let l=y.startsWith("shared/")?cl.default.join(r.harnessRootDir,y):cl.default.join(r.harnessSetsDir,i,y);hn.default.existsSync(l)&&d.push({id:w,kind:A,title:f,content:hn.default.readFileSync(l,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var Jh={};qe(Jh,{startAgentWitchClient:()=>Sw});var ml,yn,ir,_w,iw,aw,lw,cw,Bh,dw,Gh,Vh,zh,dl,P,Kh,I,ul,uw,ys,mw,pw,gw,fw,hw,yw,Aw,qh,Sw,Yh=u(()=>{"use strict";ml=require("node:child_process"),yn=g(require("node:fs")),ir=g(require("node:os"));qu();Rn();Os();Cs();sa();Ye();tm();om();Lm();Ht();x();Ip();wr();$o();Sa();Vo();tt();pa();Rr();Ft();jo();Op();Up();Ze();$p();Vp();La();Yo();es();yg();ph();Ia();Ah();Rt();bh();Vr();Wh();Ts();Hn();bt();In();kh();Rh();fs();mr();Dh();oi();ot();_w={},iw="claude",aw="codex",lw="cursor",cw="agy",Bh=3e4,dw=3e4,Gh=new Map,Vh=new Map,zh=new Map,dl=e=>{let t=e?.trim()??"";return t.length>0?t:_h()},P=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kh=e=>{let t=L(e);if(!yn.default.existsSync(t.configPath))return null;try{let r=JSON.parse(yn.default.readFileSync(t.configPath,"utf8"));if(!P(r))throw new Error("Config must be a JSON object.");let n=typeof r.wsUrl=="string"?r.wsUrl.trim():"",o=oo({installDir:t.installDir,configWsUrl:n}),s=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),i=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??iw,a=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??aw,c=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??lw,d=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??cw,m=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",y=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return m.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:y,wsUrl:o,workspace:s,claudeCommand:i,codexCommand:a,cursorCommand:c,antigravityCommand:d,pairingToken:m,writerExecutionBackend:V(r.writerExecutionBackend),layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},I=(e,t,r)=>{e.readyState===Fr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(St(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Pa(r,"out",t)))},ul=e=>e,uw=e=>{if(!yn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(yn.default.readFileSync(e.harnessManifestPath,"utf8"));if(P(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},ys=(e,t)=>{let r=uw(t);r!==null&&I(e,{type:"harness.manifest.report",payload:{hostname:ir.default.hostname(),manifest:r}})},mw=async(e,t,r,n,o,s,i=!1,a,c,d,m)=>{if(!H(t)){I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let y=Ko(t)&&!Ap(t);if(y){try{await Be(e.layout.installDir,t)}catch(S){let b=S instanceof Error?S.message:String(S);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}zo(t)}else if(!Ko(t))try{await Be(e.layout.installDir,t)}catch(S){let b=S instanceof Error?S.message:String(S);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let w=i&&yp(t)&&Sp(t)?"continue":"first",A=r;if(i&&w==="first"&&typeof c=="string"&&c.length>0){let S=Fo(e.layout,c);if(S!==null){let{buildContinuationPromptWithContext:b}=await Promise.resolve().then(()=>(Uh(),Fh));A=b({priorPrompt:S.prompt,priorOutput:S.resultOutput??"",userMessage:r})}}let f=dl(d);ve({projectFolderPath:f});let l=await sn({layout:e.layout,query:A,limit:5,projectFolderPath:f}),_=fh(e.layout,f),h=`${yh(_)}${Eg(l)}${A}`,p=m?.trim()??(s!==void 0&&f.trim().length>0?xh():void 0);if(s!==void 0&&p!==void 0&&p.length>0&&f.trim().length>0){On({reportKey:p,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let S=await Hh({config:e,writerAgent:t,wrappedPrompt:h,reportKey:p,agentRunId:s});if(S.estimateSeconds!==null){let b=`${fn}
${S.estimateSeconds}
`;$e(s)?I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:b},requestId:n}):ht(s,b)}h=Eh(h,S),h=ql(h,{agentRunId:s,reportKey:p,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}wa(e,t,h,n,ul(o),s,{sessionTurn:w},a,f,p),y&&s!==void 0&&I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:bp(t)},requestId:n})},pw=async(e,t,r,n,o)=>{let s=(i,a)=>{I(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await wp({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:m=>{i+=m,I(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:m},requestId:n})}}),c=H(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Zr(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},gw=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=It(t,r,Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,ml.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),fw=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(I(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!H(o)){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let i=await(async()=>{try{await Be(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return gw(e,o,s)})();I(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),ys(n,e.layout)},hw=e=>{let t=1e3*2**e;return Math.min(dw,t)},yw=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,Np().then(_=>{if(_.ok){console.log("[agent-witch] Local restart completed.");return}if(!_.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",_.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,_="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,Fp({layout:e.layout,remoteBundleVersion:l,trigger:_}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=te(e.layout);l!==null&&ce(l,le)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),A())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let l=t.socket;t.socket=void 0,t.wsConnected=!1,l.removeAllListeners("open"),l.removeAllListeners("message"),l.removeAllListeners("close"),l.on("error",()=>{}),(l.readyState===Fr.OPEN||l.readyState===Fr.CONNECTING)&&l.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,Bh)},m=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=hw(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},l)},y=l=>{s();let _=()=>{let h=G(e.layout.installDir)?.bundleVersion??null,p=ee();I(l,{type:"agent.heartbeat",payload:{hostname:ir.default.hostname(),macOsUsername:ir.default.userInfo().username,wakeError:t.wakeError,wakePort:p,...e.email!==null?{email:e.email}:{},...h!==null?{installBundleVersion:h}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};_(),t.heartbeatTimer=setInterval(_,Bh)},w=(l,_)=>{if(typeof l.type!="string")return;St(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"}),Pa(e.layout,"in",l);let h=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&P(l.payload)){let p=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",S=typeof l.payload.origin=="string"?l.payload.origin:"",b=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",W=typeof l.payload.challenge=="string"?l.payload.challenge:"",k=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!tg({serverPublicKey:p,origin:S,devicePublicKey:b,challenge:W,serverAttestation:k})){t.wakeError="Server attestation verification failed",St(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&P(l.payload)){let p=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";St(e.layout,{direction:"local",type:"writer.ensure",summary:p,action:"ensure-writer"}),vh({layout:e.layout,writerAgent:p,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(S=>{I(_,{type:"writer.status",payload:S},e.layout)})}if(l.type==="install.bundle.update"&&P(l.payload)){let p=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";p.length>0&&n(p,"install.bundle.update")}if(l.type==="system.ack"){gi(e.layout,{wsUrl:e.wsUrl});let p=P(l.payload)?l.payload:null,S=jp(p);S!==null&&n(S)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&P(l.payload)&&Bp(l.payload),l.type==="automations.run"&&P(l.payload)&&Gp(l.payload),l.type==="terminal.stream.accepted"&&P(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"";if(p.length>0){let S=Jm(p);for(let b of S)I(_,{type:"terminal.stream.chunk",payload:{runId:p,chunk:b},requestId:h})}}if(l.type==="agent.agentRun.list"&&I(_,{type:"dashboard.agentRun.list.result",payload:{runs:Um(e.layout)},requestId:h}),l.type==="agent.agentRun.get"&&P(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"",S=p.length>0?Fo(e.layout,p):null;I(_,{type:"dashboard.agentRun.get.result",payload:{run:S},requestId:h})}if(l.type==="command.claude.run"&&P(l.payload)){let p=l.payload.prompt,S=typeof l.payload.writerAgent=="string"&&H(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",b=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,W=l.payload.sessionContinuation===!0,k=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,R=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,se=dl(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),ar=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof p=="string"&&p.trim().length>0&&(console.log(`[agent-witch] Running ${S} task (${W?"continue":"first"})\u2026`),b!==void 0&&R!==void 0&&Gh.set(b,R),b!==void 0&&(Vh.set(b,se),zh.set(b,p.trim()),ve({projectFolderPath:se})),mw(e,S,p.trim(),h,_,b,W,R,k,se,ar))}if(l.type==="shell.session.open"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",S=typeof l.payload.cols=="number"?l.payload.cols:120,b=typeof l.payload.rows=="number"?l.payload.rows:32;p.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),ip({shellSessionId:p,cwd:e.workspace,cols:S,rows:b,send:W=>{I(_,W)},requestId:h}))}if(l.type==="shell.session.close"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";p.length>0&&Yr(p,S=>{I(_,S)},h)}if(l.type==="shell.input"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",S=typeof l.payload.data=="string"?l.payload.data:"";p.length>0&&S.length>0&&np(p,S)}if(l.type==="shell.resize"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",S=typeof l.payload.cols=="number"?l.payload.cols:0,b=typeof l.payload.rows=="number"?l.payload.rows:0;p.length>0&&S>0&&b>0&&op(p,S,b)}if(l.type==="command.writer.session.end"&&P(l.payload)){let p=l.payload.writerAgent;typeof p=="string"&&H(p)&&_p(p)}if(l.type==="command.writer.session.start"&&P(l.payload)){let p=l.payload.writerAgent,S=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof p=="string"&&H(p)&&S.length>0&&(console.log(`[agent-witch] Starting ${p} session\u2026`),pw(e,p,S,h,_))}if(l.type==="command.claude.stop"&&P(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";p.length>0&&(console.log(`[agent-witch] Stopping run ${p}\u2026`),Tp(e,ul(_),p,h))}if(l.type==="command.claude.input_respond"&&P(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",S=typeof l.payload.response=="string"?l.payload.response.trim():"",b=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",W=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",k=typeof l.payload.question=="string"?l.payload.question:"";p.length>0&&S.length>0&&b.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Cp(e,{agentRunId:p,originalPrompt:b,partialOutput:W,question:k,response:S,shellSessionId:Gh.get(p)},h,ul(_)))}if(l.type==="dispatch.approval.required"&&P(l.payload)){let p=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",S=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${p}: ${S}`),process.platform==="darwin"&&(0,ml.spawn)("osascript",["-e",`display notification "${S.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${p.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&P(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),fw(e,l.payload,h,_)),l.type==="harness.export.request"&&P(l.payload)){let p=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",S=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,b=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(W=>typeof W=="string"):[];p.length>0&&b.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>($h(),jh)),k=W(b,e.email);I(_,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:p,...S!==void 0?{targetDeviceId:S}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:h})})()}if(l.type==="harness.manifest.request"&&ys(_,e.layout),l.type==="command.claude.result"&&P(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,S=dl(p!==void 0?Vh.get(p):void 0),b=p!==void 0?zh.get(p)??"":"";Wg({layout:e.layout,text:l.payload.output,source:p??"command.claude.result",projectFolderPath:S}),b.trim().length>0&&hh({layout:e.layout,projectFolderPath:S,entry:{id:`${Date.now()}-${p??"run"}`,...p!==void 0?{agentRunId:p}:{},prompt:b,output:l.payload.output,createdAt:new Date().toISOString()}})}},A=()=>{if(t.stopped)return;a(),c();let l=new Fr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),gi(e.layout,{wsUrl:e.wsUrl}),kp(Tt({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Lp(e.layout);let _=Z(e.wsUrl)??"http://localhost:3000",h=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),p=eg({layout:e.layout,origin:_,...h!==void 0&&h.length>0?{claimToken:h}:{}});I(l,{type:"agent.register",payload:{role:"agent",hostname:ir.default.hostname(),macOsUsername:ir.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...p}},e.layout),ys(l,e.layout),Pp(e,l),y(l)}),l.on("message",_=>{let h=typeof _=="string"?_:_.toString("utf8");try{let p=JSON.parse(h);if(!P(p))return;w(p,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",(_,h)=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1;let p=typeof h=="string"?h:h.toString("utf8");Zt(e.layout,{kind:"ws_close",message:"WebSocket closed",code:_,reason:p}),console.log("[agent-witch] Disconnected from server."),m()}),l.on("error",_=>{t.wakeError=_.message,Zt(e.layout,{kind:"ws_error",message:_.message,stack:_.stack}),console.error(`[agent-witch] Socket error: ${_.message}`)})};return{connect:A,startLocalHealthCheck:d,stop:()=>{t.stopped=!0,s(),i(),a(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:mh(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(ys(l,e.layout),{ok:!0})}}},Aw=async()=>{let e=()=>{let r=Rl();if(r.length===0){let n=Kh(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=Kh(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},qh=async()=>{kt("agent-witch"),Zu().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=v();nm(t);let r=em({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),Fn();let n=await Aw(),o=n[0];o!==void 0&&hg(o.layout);let s=n.map(y=>yw(y)),i=s[0];i===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),oa(),process.exit(0));let a=()=>{n.forEach((y,w)=>{let A=te(y.layout);A!==null&&!ce(A,le)||s[w]?.reviveWebSocket()})},c=()=>{},d=await km({reconnectWebSockets:a,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),c()}});uh({layout:n[0].layout,controllers:{getStatus:i.getStatus,reviveWebSocket:a,reportHarnessManifestIfConnected:i.reportHarnessManifestIfConnected}});for(let y of s)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Bridging ${s.length} account profile(s) in one process.`);let m=xn(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Ln(),c()});c=()=>{m(),d.stop(),oa(),console.log("[agent-witch] Shutting down.");for(let y of s)y.stop();process.exit(0)},process.on("SIGINT",()=>{c()}),process.on("SIGTERM",()=>{c()})},Sw=qh;if(xt(_w.url)&&!ie()){let e=process.argv.indexOf("report");e>=0&&process.exit(Mn(process.argv.slice(e))),qh()}});Rn();Ts();Hn();var rc="20.x",nc="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var Ly=e=>[`Node.js ${rc} or newer is required (found ${e}).`,nc].join(" "),oc=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${Ly(process.version)}
`),process.exit(1))};var Ww={},bw=async()=>{kt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Pt(),$n)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},ww=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Ii(),Bd)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},vw=async()=>{if(!xt(Ww.url))return;oc();let e=process.argv.indexOf("report");e>=0&&process.exit(Mn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await bw();return}if(t==="wake"){await ww();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(Yh(),Jh));await r()};vw();
