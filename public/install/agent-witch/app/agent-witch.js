#!/usr/bin/env node
"use strict";var Bh=Object.create;var ps=Object.defineProperty;var Gh=Object.getOwnPropertyDescriptor;var Vh=Object.getOwnPropertyNames;var zh=Object.getPrototypeOf,Kh=Object.prototype.hasOwnProperty;var d=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var $=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},qe=(e,t)=>{for(var r in t)ps(e,r,{get:t[r],enumerable:!0})},qh=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Vh(t))!Kh.call(e,o)&&o!==r&&ps(e,o,{get:()=>t[o],enumerable:!(n=Gh(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?Bh(zh(e)):{},qh(t||!e||!e.__esModule?ps(r,"default",{value:e,enumerable:!0}):r,e));var il,al,gs=d(()=>{"use strict";il=new Set(["","loginwindow","_mbsetupuser","root"]),al=5e3});var ll,yn,fs=d(()=>{"use strict";ll=require("node:child_process"),yn=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,ll.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ie,bt=d(()=>{"use strict";ie=()=>!0});var An,cl,Jh,Sn,hs=d(()=>{"use strict";An=g(require("node:path")),cl=require("node:url");bt();Jh={},Sn=()=>{if(ie()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return An.default.dirname(An.default.resolve(e))}return An.default.dirname((0,cl.fileURLToPath)(Jh.url))}});var ge,dl,vt=d(()=>{"use strict";ge="agent-witch.js",dl="command"});var As,fl,E,Yh,ys,Ss,Xh,Zh,Qh,ey,Je,ty,ul,ml,pl,_s,fe,_n,bn,gl,wt,Wt,w,hl,bs,yl,Al,vn,Sl,_l,he,vs,ry,ny,xe,oy,L,x=d(()=>{"use strict";As=g(require("node:fs")),fl=g(require("node:os")),E=g(require("node:path"));hs();vt();Yh=Sn(),ys=".agent-witch",Ss=".local-agent-witch",Xh=47892,Zh=47893,Qh="com.agent-witch",ey="com.local-agent-witch",Je="profiles",ty="active-profile.json",ul="harness",ml="sets",pl="manifest.json",_s="projects",fe="logs",_n="agent-witch.log",bn="agent-witch.error.log",gl="reports",wt="device-keypair.json",Wt=e=>e.trim().toLowerCase(),w=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return E.default.resolve(e);let t=E.default.resolve(Yh),r=E.default.basename(t),n=E.default.basename(E.default.dirname(t));return r==="app"&&(n===ys||n===Ss)?E.default.dirname(t):r===ys||r===Ss?t:E.default.join(fl.default.homedir(),ys)},hl=(e=w())=>E.default.join(e,"app"),bs=(e=w())=>E.default.join(hl(e),ge),yl=(e,t,r)=>t!==null?E.default.join(e,Je,t,r):E.default.join(e,r),Al=e=>yl(e.installDir,e.profileEmail,_s),vn=e=>yl(e.installDir,e.profileEmail,fe),Sl=e=>e.profileEmail!==null?E.default.join(e.installDir,Je,e.profileEmail,wt):E.default.join(e.installDir,wt),_l=e=>E.default.basename(e)===Ss,he=(e=w())=>_l(e)?ey:Qh,vs=(e=w())=>_l(e)?Zh:Xh,ry=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Wt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Wt(t):null},ny=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xe=(e=w())=>{let t=E.default.join(e,ty);if(!As.default.existsSync(t))return null;try{let r=JSON.parse(As.default.readFileSync(t,"utf8"));if(ny(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Wt(r.email)}catch{return null}return null},oy=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Wt(r):null}let t=ry();return t!==null?t:xe()},L=e=>{let t=w(),r=hl(t),n=bs(t),o=oy(e);if(o!==null){let v=E.default.join(t,Je,o),A=E.default.join(v,ul),f=E.default.join(v,_s),l=E.default.join(v,fe),_=E.default.join(v,gl),h=E.default.join(v,wt),p=E.default.join(v,fe,_n),S=E.default.join(v,fe,bn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:f,logsDir:l,mainLogPath:p,errorLogPath:S,reportsDir:_,deviceKeypairPath:h,configPath:E.default.join(v,"config.json"),harnessRootDir:A,harnessManifestPath:E.default.join(A,pl),harnessSetsDir:E.default.join(A,ml)}}let s=E.default.join(t,ul),i=E.default.join(t,_s),a=E.default.join(t,fe),c=E.default.join(t,gl),u=E.default.join(t,wt),m=E.default.join(t,fe,_n),y=E.default.join(t,fe,bn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:m,errorLogPath:y,reportsDir:c,deviceKeypairPath:u,configPath:E.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:E.default.join(s,pl),harnessSetsDir:E.default.join(s,ml)}}});var wn,ws,bl,B,vl,Ye=d(()=>{"use strict";wn=g(require("node:fs")),ws=g(require("node:path"));x();bl=e=>{let t=ws.default.join(e,Je);return wn.default.existsSync(t)?wn.default.readdirSync(t).filter(r=>wn.default.statSync(ws.default.join(t,r)).isDirectory()).map(r=>Wt(r)).toSorted():[]},B=(e=w())=>{let t=he(e);return[{profileEmail:bl(e)[0]??null,launchAgentLabel:t}]},vl=(e=w())=>bl(e)});var Wn,Et,wl,Ws,Wl,sy,El,iy,ay,ar,ly,kl,En=d(()=>{"use strict";Wn=require("node:child_process"),Et=g(require("node:fs")),wl=g(require("node:os")),Ws=g(require("node:path")),Wl=require("node:util");Ye();x();sy=(0,Wl.promisify)(Wn.execFile),El=()=>Ws.default.join(wl.default.homedir(),"Library","LaunchAgents"),iy=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await sy("launchctl",["bootout",r]).catch(()=>{})},ay=e=>{let t=Ws.default.join(El(),`${e}.plist`);Et.default.existsSync(t)&&Et.default.unlinkSync(t)},ar=(e=w())=>{let t=he(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of B(e))r.add(o.launchAgentLabel);let n=El();if(Et.default.existsSync(n))for(let o of Et.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},ly=e=>{(0,Wn.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},kl=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=w();if(!Et.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=ar(e);for(let r of t)await iy(r),ay(r);return ly(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var kn,Es=d(()=>{"use strict";fs();En();x();kn=(e=w())=>{for(let t of ar(e))yn(t)}});var Ll,cy,dy,xl,Rl=d(()=>{"use strict";Ll=require("node:child_process");gs();cy=e=>e.trim().toLowerCase(),dy=e=>e==null?!1:!il.has(cy(e)),xl=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Ll.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return dy(t)?t:null}catch{return null}}});var Pl,Cl,ye,lr=d(()=>{"use strict";Pl=g(require("node:os"));Rl();Cl=e=>e.trim().toLowerCase(),ye=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?xl():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??Pl.default.userInfo().username;return Cl(r)===Cl(n)}});var kt,Ln,xn=d(()=>{"use strict";gs();Es();lr();kt=e=>{ye()||(kn(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Ln=(e,t=al)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{ye()||e()},t);return()=>{clearInterval(r)}}});var Tl,Il,Nl,Rn,Cn,Ol,Ml,Lt=d(()=>{"use strict";Tl=".agent-witch",Il="memory",Nl="project.json",Rn="chunks.ndjson",Cn="runs.ndjson",Ol="reports",Ml=".json"});var Hl,Pn,ks=d(()=>{"use strict";Hl=g(require("node:path"));Lt();Pn=(e,t)=>Hl.default.join(e.trim(),`${t.trim()}${Ml}`)});var Xe,Dl,Fl=d(()=>{"use strict";vt();Xe=e=>`'${e.replace(/'/g,"'\\''")}'`,Dl=e=>{let t=`${e.installDir.trim()}/${"app"}/${ge}`,r=[Xe("node"),Xe(t),"report","write","--key",Xe(e.reportKey.trim()),"--agent-run-id",Xe(e.agentRunId.trim()),"--status",Xe(e.status),"--summary",Xe(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Xe(e.details.trim())),r.join(" ")}});var ae,Ul,uy,jl,Tn=d(()=>{"use strict";ks();Fl();ae={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Ul=e=>e===ae.COMPLETED||e===ae.FAILED,uy=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),jl=(e,t)=>{let r=Pn(t.reportsDir,t.reportKey),n=Dl({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:ae.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${uy({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var cr,Bl,$l,Gl,my,In,py,gy,dr,Nn,Vl,zl,ur=d(()=>{"use strict";cr=g(require("node:fs")),Bl=g(require("node:path"));Tn();ks();x();$l=50,Gl=e=>{let t=L(),r=Pn(t.reportsDir,e);return cr.default.mkdirSync(Bl.default.dirname(r),{recursive:!0}),r},my=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},In=e=>{let t=Gl(e);if(!cr.default.existsSync(t))return null;try{let r=JSON.parse(cr.default.readFileSync(t,"utf8"));return my(r)?r:null}catch{return null}},py=(e,t)=>{let r=[...e,t];return r.length>$l?r.slice(r.length-$l):r},gy=e=>{let t=Gl(e.reportKey);cr.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},dr=e=>{let t=In(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:py(t?.history??[],n)};return gy(o),o},Nn=e=>{let t=In(e.reportKey);return t!==null?t:dr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:ae.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Vl=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},zl=e=>{if(e===null||!Ul(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===ae.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var fy,hy,mr,Kl,On,Ls=d(()=>{"use strict";Tn();ur();fy=new Set(Object.values(ae)),hy=e=>fy.has(e),mr=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},Kl=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},On=e=>{if(e[0]!=="write")return Kl(),1;let r=mr(e,"--key"),n=mr(e,"--agent-run-id"),o=mr(e,"--status"),s=mr(e,"--summary"),i=mr(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!hy(o)?(Kl(),1):(dr({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var xs,ql,xt,Mn=d(()=>{"use strict";xs=g(require("node:path")),ql=require("node:url");bt();xt=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=xs.default.resolve(t);return ie()?r===xs.default.resolve(__filename):r===(0,ql.fileURLToPath)(e)}});var pr,Rs,Sy,_y,Zl,G,Ql,Hn,Ze=d(()=>{"use strict";pr=g(require("node:fs")),Rs=g(require("node:path"));x();Sy="install-version.json",_y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zl=(e=w())=>Rs.default.join(e,Sy),G=(e=w())=>{let t=Zl(e);if(!pr.default.existsSync(t))return null;try{let r=JSON.parse(pr.default.readFileSync(t,"utf8"));return!_y(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ql=(e,t=w())=>{let r=Zl(t);pr.default.mkdirSync(Rs.default.dirname(r),{recursive:!0}),pr.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Hn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var tc,rc,nc,oc,sc,gr,by,vy,wy,ec,Re,fr=d(()=>{"use strict";tc=require("node:child_process"),rc=g(require("node:fs")),nc=g(require("node:os")),oc=g(require("node:path")),sc=require("node:util");lr();gr=(0,sc.promisify)(tc.execFile),by=e=>oc.default.join(nc.default.homedir(),"Library","LaunchAgents",`${e}.plist`),vy=async e=>{try{return await gr("launchctl",["print",e]),!0}catch{return!1}},wy=async(e,t,r)=>{await vy(t)&&await gr("launchctl",["bootout",t]).catch(()=>{}),await gr("launchctl",["bootstrap",e,r]),await gr("launchctl",["enable",t])},ec=async e=>{try{return await gr("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Re=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!ye())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await ec(n))return{ok:!0};let o=by(e);if(!rc.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await wy(r,n,o),await ec(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var Wy,Dn,Cs=d(()=>{"use strict";fs();En();Ye();x();Wy=(e=w())=>{let t=new Set(B(e).map(r=>r.launchAgentLabel));return ar(e).filter(r=>!t.has(r))},Dn=(e=w())=>{for(let t of Wy(e))yn(t)}});var Z,Rt=d(()=>{"use strict";Z=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ic,Qe,Ps,Ey,ky,ac,Ct,Fn,Ts=d(()=>{"use strict";ic=require("node:crypto"),Qe=g(require("node:fs")),Ps=g(require("node:path"));x();Ey="self-update-log.ndjson",ky=100,ac=(e=w())=>{let t=L(),r=t.installDir===e?t.logsDir:vn({installDir:e,profileEmail:t.profileEmail});return Ps.default.join(r,Ey)},Ct=(e,t=w())=>{let r={id:(0,ic.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=ac(t);Qe.default.mkdirSync(Ps.default.dirname(n),{recursive:!0});let o=Qe.default.existsSync(n)?Qe.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-ky+1)),JSON.stringify(r)];return Qe.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Fn=(e=20,t=w())=>{let r=ac(t);if(!Qe.default.existsSync(r))return[];let n=Qe.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var lc,cc,dc=d(()=>{"use strict";lc="deps.tar.gz",cc="deps"});var mc,Ce,et,Ly,pc,gc,fc=d(()=>{"use strict";mc=require("node:child_process"),Ce=g(require("node:fs")),et=g(require("node:path"));dc();Ly=e=>et.default.join(e,"app",cc),pc=e=>{let t=et.default.join(e,"app"),r=et.default.join(t,lc);Ce.default.existsSync(r)&&(Ce.default.rmSync(Ly(e),{recursive:!0,force:!0}),Ce.default.mkdirSync(t,{recursive:!0}),(0,mc.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Ce.default.rmSync(r,{force:!0}))},gc=e=>{Ce.default.rmSync(et.default.join(e,"node_modules"),{recursive:!0,force:!0}),Ce.default.rmSync(et.default.join(e,"package.json"),{force:!0}),Ce.default.rmSync(et.default.join(e,"package-lock.json"),{force:!0})}});var jn={};qe(jn,{buildAgentWitchSelfUpdateStatus:()=>Os,fetchAgentWitchRemoteInstallBundleVersion:()=>Is,runAgentWitchSelfUpdate:()=>Ns});var Pe,Un,hc,xy,yc,Is,Ry,Cy,hr,Ns,Os,Pt=d(()=>{"use strict";Pe=g(require("node:fs")),Un=g(require("node:path"));Ze();fr();Cs();Ye();Rt();x();vt();Ts();fc();hc=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xy=e=>{let t=xe(e),r=t===null?L():L(t);if(!Pe.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Pe.default.readFileSync(r.configPath,"utf8"));return!hc(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},yc=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!hc(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},Is=async e=>(await yc(e))?.bundleVersion??null,Ry=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=Un.default.join(t,r);Pe.default.mkdirSync(Un.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());Pe.default.writeFileSync(o,s),r.endsWith(".js")&&Pe.default.chmodSync(o,493)},Cy=async()=>{Dn();let e=B();for(let t of e)await Re(t.launchAgentLabel)},hr=(e,t)=>({localBundleVersion:t,...e}),Ns=async e=>{let t=w(),r=G(t),n=r?.bundleVersion??null,o=xy(t),s=o===null?r?.appOrigin??null:Z(o);if(s===null){let c=hr({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return Ct({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let i=await yc(s);if(i===null){let c=hr({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return Ct({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||Hn(n,i.bundleVersion))){let c=hr({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:i.bundleVersion},n);return Ct({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),c}try{for(let m of i.scripts)await Ry(s,t,m);let c=Un.default.join(t,ge);Pe.default.existsSync(c)&&Pe.default.rmSync(c,{force:!0}),pc(t),gc(t),Ql({bundleVersion:i.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await Cy();let u=hr({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${i.bundleVersion}.`,remoteBundleVersion:i.bundleVersion},i.bundleVersion);return Ct({event:"update_applied",ok:!0,message:u.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),u}catch(c){let u=c instanceof Error?c.message:"Agent Witch self-update failed.",m=hr({ok:!1,updated:!1,message:u,remoteBundleVersion:i.bundleVersion},n);return Ct({event:"update_failed",ok:!1,message:u,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),m}},Os=()=>{let e=w();return{local:G(e),logs:Fn(20,e)}}});var $n,yr,Ac,Ms,Ar,Hs=d(()=>{"use strict";$n=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},yr=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=$n(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},Ac=e=>e>=1&&e<=5,Ms=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return $n(t,"UTC")},Ar=e=>{let t=e.from??new Date,r=$n(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return yr(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=yr(r,e.timeZone,n,0),s=$n(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?yr(Ms(r),e.timeZone,n,0):o;if(!i&&Ac(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=Ms(a),Ac(a.weekday))return yr(a,e.timeZone,n,0);return yr(Ms(r),e.timeZone,n,0)}});var Py,Bn,Ds=d(()=>{"use strict";Py=e=>e==="hourly"||e==="daily"||e==="weekdays",Bn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!Py(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Sr,Gn,Sc,_c,Fs,Te,bc,vc,wc,Wc,_r=d(()=>{"use strict";Sr=g(require("node:fs")),Gn=g(require("node:path"));Ds();Sc="automations.json",_c=e=>e.profileEmail!==null?Gn.default.join(e.installDir,"profiles",e.profileEmail,Sc):Gn.default.join(e.installDir,Sc),Fs=()=>({version:1,automations:[]}),Te=e=>{let t=_c(e);if(!Sr.default.existsSync(t))return Fs();try{let r=JSON.parse(Sr.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Fs():{version:1,automations:r.automations.flatMap(o=>{let s=Bn(o);return s!==null?[s]:[]})}}catch{return Fs()}},bc=(e,t)=>{let r=_c(e);Sr.default.mkdirSync(Gn.default.dirname(r),{recursive:!0}),Sr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},vc=(e,t)=>{bc(e,{version:1,automations:t})},wc=(e,t)=>{let n=Te(e).automations.filter(o=>o.id!==t.id);bc(e,{version:1,automations:[...n,t]})},Wc=(e,t)=>Te(e).automations.find(r=>r.id===t)??null});var Ty,Iy,Vn,Us=d(()=>{"use strict";Hs();Ds();_r();x();Ty=e=>e!==void 0&&e.trim().length>0?L(e.trim()):L(),Iy=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Ar({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Ar({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Vn=e=>{let t=Ty(e.profileEmail),r=Te(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=Bn(s);return i!==null?[Iy(i,n.get(i.id))]:[]});return vc(t,o),{ok:!0,writtenCount:o.length}}});var Ec,kc=d(()=>{"use strict";Ec="x-agent-witch-token"});var Tt,js,Lc,zn,xc,br=d(()=>{"use strict";kc();Rt();Tt=e=>{let t=Z(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},js=e=>({[Ec]:e,"Content-Type":"application/json"}),Lc=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:js(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},zn=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:js(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},xc=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:js(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Kn,vr,H,Ie,Rc,It,tt=d(()=>{"use strict";Kn={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},vr=e=>e.trim().length>0,H=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Ie=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:vr(t)?t.trim():Kn.claudeCommand,codexCommand:vr(r)?r.trim():Kn.codexCommand,cursorCommand:vr(n)?n.trim():Kn.cursorCommand,antigravityCommand:vr(o)?o.trim():Kn.antigravityCommand}},Rc=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},It=(e,t,r,n)=>{let o=t.trim();if(!vr(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var Ne,$s=d(()=>{"use strict";Ne={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Ny,Oy,My,Hy,Dy,Fy,Cc,Pc=d(()=>{"use strict";$s();Ny=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},Oy=async e=>{let t=e.secret.model??Ne.anthropic,r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=Ny(n);return o.length>0&&e.onChunk?.(o),{exitCode:0,output:o}},My=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},Hy=async e=>{let t=e.secret.model??Ne.openai,r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=My(n);return o.length>0&&e.onChunk?.(o),{exitCode:0,output:o}},Dy=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},Fy=async e=>{let t=e.secret.model??Ne.google,r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=Dy(o);return s.length>0&&e.onChunk?.(s),{exitCode:0,output:s}},Cc=async e=>{try{return e.provider==="anthropic"?await Oy(e):e.provider==="openai"?await Hy(e):await Fy(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Oe,wr=d(()=>{"use strict";Oe=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var Tc,Uy,qn,Bs=d(()=>{"use strict";Tc=g(require("node:path")),Uy="writer-api-secrets.json",qn=e=>Tc.default.join(e,Uy)});var Gs,Ic,jy,rt,Me,nt=d(()=>{"use strict";Gs=g(require("node:fs"));Bs();Ic=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jy=e=>{if(!Ic(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"&&e.model.trim().length>0?e.model.trim():void 0;return{apiKey:t,...r!==void 0?{model:r}:{}}},rt=e=>{let t=qn(e);if(!Gs.default.existsSync(t))return{};try{let r=JSON.parse(Gs.default.readFileSync(t,"utf8"));if(!Ic(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=jy(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Me=(e,t)=>rt(e)[t]??null});var V,ot=d(()=>{"use strict";V=e=>e==="api"?"api":"cli"});var Nc,Q,Jn,He=d(()=>{"use strict";Nc=g(require("node:path"));wr();nt();ot();Q=e=>Nc.default.dirname(e),Jn=(e,t)=>{if(V(e.writerExecutionBackend)!=="api")return!1;let r=Oe(t);if(r===null)return!1;let n=Q(e.layout.configPath),o=Me(n,r);return o!==null&&o.apiKey.length>0}});var Yn,Vs=d(()=>{"use strict";Pc();wr();nt();He();Yn=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Oe(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Q(e.layout.configPath),a=Me(i,s);if(a===null){let c=Object.keys(rt(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${c.length===0?"writer-api-secrets.json is empty":`have keys for: ${c.join(", ")}`}).`}}return Cc({provider:s,secret:a,prompt:o,onChunk:n})}});var Oc,Nt,Xn=d(()=>{"use strict";Oc=require("node:child_process");tt();Vs();He();Nt=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Jn(e,t)){Yn(e,t,r).then(n);return}let o=It(t,r,Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Oc.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[];s.stdout?.on("data",a=>{i.push(a.toString("utf8"))}),s.stderr?.on("data",a=>{i.push(a.toString("utf8"))}),s.on("close",a=>{n({exitCode:a??-1,output:i.join("")})}),s.on("error",a=>{n({exitCode:-1,output:a.message})})})});var zs,Ks,qs=d(()=>{"use strict";zs="https://www.agentwitch.com",Ks="wss://www.agentwitch.com/api/agent-witch/ws"});var Zn,Mc,Js=d(()=>{"use strict";Zn=".agent-witch",Mc=".local-agent-witch"});var Hc,$y,Ys,Qn,Xs=d(()=>{"use strict";Hc=g(require("node:path"));qs();Js();$y="ws://localhost:3000/api/agent-witch/ws",Ys=e=>e.replace(/\/$/,""),Qn=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Ys(t);let r=Hc.default.basename(e.installDir);if(r===Zn)return Ks;let n=e.configWsUrl?.trim()??"";return r===Mc?n.length>0?Ys(n):$y:n.length>0?Ys(n):Ks}});var Zs,By,Gy,Vy,zy,Ky,F,st=d(()=>{"use strict";Zs=g(require("node:fs"));Xs();x();ot();By="claude",Gy="codex",Vy="cursor",zy="agy",Ky=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F=()=>{let e=L();if(!Zs.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Zs.default.readFileSync(e.configPath,"utf8"));if(!Ky(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=Qn({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:V(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:By,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:Gy,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:Vy,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:zy,pairingToken:s,layout:e}}catch{return null}}});var Dc,Qs,Ot,eo=d(()=>{"use strict";Dc=require("node:crypto");br();Hs();Xn();_r();st();Qs=!1,Ot=async e=>{if(Qs)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=F();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Tt({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=Wc(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};Qs=!0;let o=(0,Dc.randomUUID)();try{let s=await Nt(t,"claude-cli",n.prompt);await xc(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=Ar({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return wc(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{Qs=!1}}});function Wr(e){return(0,Fc.createHash)("sha256").update(e.trim()).digest("hex")}var Fc,ei=d(()=>{"use strict";Fc=require("node:crypto")});var qy,Uc,Jy,Yy,Er,jc,ti=d(()=>{"use strict";qy=["agentwitch.com","www.agentwitch.com"],Uc=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Jy=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},Yy=e=>{let t=Jy(e);return!!(qy.includes(t)||Uc.test(e.trim().toLowerCase()))},Er=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return Yy(r)?Uc.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},jc=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Er(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var to,$c,Xy,Zy,Bc,Gc,ri,ro,no=d(()=>{"use strict";to=g(require("node:fs")),$c=g(require("node:path")),Xy="wake-port.json",Zy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Bc=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Gc=e=>$c.default.join(e,Xy),ri=e=>{let t=Gc(e);if(!to.default.existsSync(t))return null;try{let r=JSON.parse(to.default.readFileSync(t,"utf8"));if(Zy(r)&&Bc(r.wakePort))return r.wakePort}catch{return null}return null},ro=(e,t)=>{if(!Bc(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Gc(e);to.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var xW,RW,CW,ee,Vc,Mt=d(()=>{"use strict";no();x();no();xW=vs(),RW=`${he()}-wake`,CW=he(),ee=()=>{let e=w(),t=ri(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return vs()},Vc=e=>{let t=w();ri(t)===null&&ro(t,e)}});var Ht,kr,Qy,zc,Kc,qc=d(()=>{"use strict";Ht=g(require("node:fs")),kr=g(require("node:path"));ei();x();Qy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zc=e=>{if(!Ht.default.existsSync(e))return null;try{let t=JSON.parse(Ht.default.readFileSync(e,"utf8"));return!Qy(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Wr(t.pairingToken.trim())}catch{return null}},Kc=(e=w())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(zc(kr.default.join(e,"config.json")));let o=kr.default.join(e,Je);if(!Ht.default.existsSync(o))return t;for(let s of Ht.default.readdirSync(o)){let i=kr.default.join(o,s);Ht.default.statSync(i).isDirectory()&&n(zc(kr.default.join(i,"config.json")))}return t}});var Jc,Yc=d(()=>{"use strict";Jc=["rule","skill","command","instruction","agent"]});var Xc,eA,tA,Zc,Qc=d(()=>{"use strict";Yc();Xc=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eA=e=>typeof e=="string"&&Jc.includes(e),tA=e=>{if(!Xc(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!eA(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Zc=e=>{if(!Xc(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=tA(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var ed,rA,nA,oA,sA,iA,aA,lA,cA,oo,ni=d(()=>{"use strict";ed=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},rA=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},nA=(e,t)=>{let r=rA(t),n=ed(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},oA=(e,t,r)=>{let n=nA(t,r);return`shared/items/${e}/${n}`},sA=["rules","skills","commands","instructions","agents"],iA=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),aA=(e,t)=>[...e.filter(n=>n.id!==t.id),t],lA=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},cA=e=>({id:e.id,kind:e.kind,title:e.title,path:oA(e.id,e.kind,e.title)}),oo=e=>{let t=new Date().toISOString(),r=e.existingManifest??iA(e.hostname,t),n=ed(e.bundle.slug),o=lA(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...sA.map(u=>`sets/${n}/${u}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((u,m)=>{let y=cA(m);return{files:[...u.files,{relativePath:y.path,content:m.content}],nextItems:aA(u.nextItems,y)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var De,td,so,dA,rd,nd=d(()=>{"use strict";De=g(require("node:fs")),td=g(require("node:os")),so=g(require("node:path"));ni();x();dA=e=>{if(!De.default.existsSync(e))return null;try{let t=JSON.parse(De.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},rd=e=>{let t=L(e.profileEmail);try{let r=dA(t.harnessManifestPath),n=oo({bundle:e.bundle,hostname:td.default.hostname(),existingManifest:r});De.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)De.default.mkdirSync(so.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=so.default.join(t.harnessRootDir,o.relativePath);De.default.mkdirSync(so.default.dirname(s),{recursive:!0}),De.default.writeFileSync(s,o.content)}return De.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var od,sd,io,oi=d(()=>{"use strict";od=require("node:child_process"),sd=g(require("node:fs"));lr();x();io=(e=w())=>{let t=bs(e);if(!sd.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!ye())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=xe(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,od.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var si,le,zW,Dt=d(()=>{"use strict";x();si="connection-health.json",le=12e4,zW=`${he()}-watchdog`});var id,it,ii,uA,mA,pA,ad,gA,ld,ao,lo=d(()=>{"use strict";id=require("node:crypto"),it=g(require("node:fs")),ii=g(require("node:path"));x();uA="watchdog-log.ndjson",mA=200,pA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ad=(e=w())=>{let t=L(),r=t.installDir===e?t.logsDir:vn({installDir:e,profileEmail:t.profileEmail});return ii.default.join(r,uA)},gA=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!pA(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},ld=(e,t=w())=>{let r={id:(0,id.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=ad(t);it.default.mkdirSync(ii.default.dirname(n),{recursive:!0});let o=it.default.existsSync(n)?it.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-mA+1)),JSON.stringify(r)];return it.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},ao=(e=20,t=w())=>{let r=ad(t);if(!it.default.existsSync(r))return[];let n=it.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=gA(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var Lr,co,fA,cd,te,ai,ce,xr=d(()=>{"use strict";Lr=g(require("node:fs")),co=g(require("node:path"));Dt();fA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cd=e=>e.profileEmail===null?co.default.join(e.installDir,si):co.default.join(e.installDir,"profiles",e.profileEmail,si),te=e=>{let t=cd(e);if(!Lr.default.existsSync(t))return null;try{let r=JSON.parse(Lr.default.readFileSync(t,"utf8"));return!fA(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},ai=(e,t)=>{let r=cd(e),n=te(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};Lr.default.mkdirSync(co.default.dirname(r),{recursive:!0}),Lr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ce=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var dd,ud,hA,Rr,li=d(()=>{"use strict";dd=require("node:child_process"),ud=require("node:util"),hA=(0,ud.promisify)(dd.execFile),Rr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await hA("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var md,ci=d(()=>{"use strict";md="watchdog-reinstall-state.json"});var pd={};qe(pd,{verifyAgentWitchReviveAfterKickstart:()=>SA});var AA,SA,gd=d(()=>{"use strict";ci();xr();li();x();AA=e=>new Promise(t=>{setTimeout(t,e)}),SA=async e=>{if(await AA(e.verifyDelayMs??3e3),!await Rr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?L():L(e.profileEmail),n=te(r);return!ce(n,e.staleAfterMs)}});var Cr,di,bA,fd,vA,hd,yd,Ad=d(()=>{"use strict";Cr=g(require("node:fs")),di=g(require("node:path"));ci();x();bA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fd=e=>di.default.join(e,md),vA=(e=w())=>{let t=fd(e);if(!Cr.default.existsSync(t))return null;try{let r=JSON.parse(Cr.default.readFileSync(t,"utf8"));return!bA(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},hd=(e=w(),t=Date.now())=>{let r=vA(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},yd=(e=w(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=fd(e);return Cr.default.mkdirSync(di.default.dirname(n),{recursive:!0}),Cr.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Sd,Ft,_d,bd,vd,wA,WA,wd,EA,kA,Wd,Ed=d(()=>{"use strict";Sd=require("node:child_process"),Ft=g(require("node:fs")),_d=g(require("node:os")),bd=g(require("node:path")),vd=require("node:util");Ze();Rt();x();wA=(0,vd.promisify)(Sd.execFile),WA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wd=e=>{let t=xe(e),r=t===null?L():L(t);if(!Ft.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Ft.default.readFileSync(r.configPath,"utf8"));return!WA(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},EA=e=>wd(e)?.wsUrl??null,kA=e=>{let t=EA(e);return t!==null?Z(t):G(e)?.appOrigin??null},Wd=async e=>{let t=e?.installDir??w(),r=wd(t),n=r!==null?Z(r.wsUrl):kA(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=bd.default.join(_d.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Ft.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??xe(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await wA("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Ft.default.existsSync(i)&&Ft.default.unlinkSync(i)}}});var kd={};qe(kd,{attemptAgentWitchWatchdogReinstall:()=>LA});var LA,Ld=d(()=>{"use strict";Ad();fr();Ed();LA=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!hd())return{attempted:!1,ok:!1,targets:e};yd();let r=await Wd();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await Re(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var xd,Rd,Cd,xA,RA,CA,ui,mi=d(()=>{"use strict";lr();Dt();xr();li();fr();Ye();x();oi();lo();xd=e=>e===null?L():L(e),Rd=async(e,t,r)=>{if(!await Rr(e))return"not_running";let o=xd(t),s=te(o);return ce(s,r)?"stale_connection":"healthy"},Cd=async e=>{let t=e?.staleAfterMs??le,r=w(),n=B(r);return Promise.all(n.map(async o=>{let s=await Rd(o.launchAgentLabel,o.profileEmail,t),i=xd(o.profileEmail),a=te(i),c=await Rr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:ce(a,t),needsRevive:s!=="healthy",reason:s}}))},xA=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},RA=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",CA=async e=>{let t=await Re(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(gd(),pd)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},ui=async e=>{if(!ye())return{ok:!0,targets:[]};let t=e?.staleAfterMs??le,r=w(),n=B(r),o=[];for(let m of n){let y=await Rd(m.launchAgentLabel,m.profileEmail,t);if(y==="healthy"){o.push({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,revived:!1,reason:y});continue}o.push(await CA({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,reason:y,staleAfterMs:t}))}if(o.length===0){let m=io();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:m.ok,reason:"not_running",...m.errorMessage!==void 0?{errorMessage:m.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(m=>m.reason!=="healthy"&&!m.revived))try{let{attemptAgentWitchWatchdogReinstall:m}=await Promise.resolve().then(()=>(Ld(),kd)),y=await m(o);s=y.attempted,i=y.ok,a=y.errorMessage,c=[...y.targets]}catch(m){s=!0,i=!1,a=m instanceof Error?m.message:"Watchdog reinstall helper is unavailable."}let u={ok:c.some(m=>m.revived||m.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&ld({event:RA(c,u.ok,{reinstallAttempted:s,reinstallOk:i}),ok:u.ok,message:xA(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),u}});var Pd,Td,Id=d(()=>{"use strict";Pd=g(require("node:os"));Dt();lo();mi();Td=async()=>{let e=await Cd(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Pd.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:le,healthyProfileCount:t,profiles:e,lastLog:ao(1)[0]??null}}});var Nd={};qe(Nd,{buildAgentWitchAutomationStatusFromWakeServer:()=>hi,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>wi,buildAgentWitchWakeHealthResponse:()=>yi,buildAgentWitchWakeIdentityResponse:()=>Ai,buildAgentWitchWatchdogStatus:()=>_i,installHarnessFromWakeServer:()=>mo,readAgentWitchSelfUpdateLogEntries:()=>go,readAgentWitchWatchdogLogEntries:()=>po,restartAgentWitchFromWakeServer:()=>vi,reviveAgentWitchWebSocketFromWakeServer:()=>bi,runAgentWitchSelfUpdateFromWakeServer:()=>Wi,runAgentWitchUninstallLocalFromWakeServer:()=>Ei,runAutomationFromWakeServer:()=>fi,syncAutomationsFromWakeServer:()=>gi,wakeAgentWitchLaunchAgents:()=>Si});var uo,pi,mo,gi,fi,hi,yi,Ai,Si,po,_i,bi,vi,wi,go,Wi,Ei,ki=d(()=>{"use strict";Us();eo();_r();ei();st();uo=g(require("node:os"));ti();Mt();fr();Ye();qc();Qc();nd();oi();Id();lo();Pt();En();Ts();mi();pi=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mo=e=>{if(!pi(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Zc(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Er(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=rd({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},gi=e=>{if(!pi(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Er(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Vn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},fi=async e=>{if(!pi(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Er(t)?Ot(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},hi=()=>{let e=F(),t=e!==null?Te(e.layout):{version:1,automations:[]};return{ok:!0,hostname:uo.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},yi=()=>{let e=B();return{ok:!0,port:ee(),hostname:uo.default.hostname(),profileCount:e.length}},Ai=()=>{let e=B(),t=F()?.pairingToken.trim()??"",r=t.length>0?Wr(t):null,n=Kc();return{hostname:uo.default.hostname(),port:ee(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Si=async()=>{let e=B(),t=[];for(let r of e){let n=await Re(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=io();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},po=(e=20)=>ao(e),_i=Td,bi=ui,vi=ui,wi=Os,go=(e=20)=>Fn(e),Wi=e=>Ns(e),Ei=()=>kl()});var Ae=$((KE,Hd)=>{"use strict";var Od=["nodebuffer","arraybuffer","fragments"],Md=typeof Blob<"u";Md&&Od.push("blob");Hd.exports={BINARY_TYPES:Od,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Md,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Pr=$((qE,fo)=>{"use strict";var{EMPTY_BUFFER:PA}=Ae(),Li=Buffer[Symbol.species];function TA(e,t){if(e.length===0)return PA;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Li(r.buffer,r.byteOffset,n):r}function Dd(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function Fd(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function IA(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function xi(e){if(xi.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Li(e):ArrayBuffer.isView(e)?t=new Li(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),xi.readOnly=!1),t}fo.exports={concat:TA,mask:Dd,toArrayBuffer:IA,toBuffer:xi,unmask:Fd};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");fo.exports.mask=function(t,r,n,o,s){s<48?Dd(t,r,n,o,s):e.mask(t,r,n,o,s)},fo.exports.unmask=function(t,r){t.length<32?Fd(t,r):e.unmask(t,r)}}catch{}});var $d=$((JE,jd)=>{"use strict";var Ud=Symbol("kDone"),Ri=Symbol("kRun"),Ci=class{constructor(t){this[Ud]=()=>{this.pending--,this[Ri]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Ri]()}[Ri](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Ud])}}};jd.exports=Ci});var $t=$((YE,zd)=>{"use strict";var Tr=require("zlib"),Bd=Pr(),NA=$d(),{kStatusCode:Gd}=Ae(),OA=Buffer[Symbol.species],MA=Buffer.from([0,0,255,255]),yo=Symbol("permessage-deflate"),Se=Symbol("total-length"),Ut=Symbol("callback"),Fe=Symbol("buffers"),jt=Symbol("error"),ho,Pi=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!ho){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;ho=new NA(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ut];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){ho.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){ho.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Tr.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Tr.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[yo]=this,this._inflate[Se]=0,this._inflate[Fe]=[],this._inflate.on("error",DA),this._inflate.on("data",Vd)}this._inflate[Ut]=n,this._inflate.write(t),r&&this._inflate.write(MA),this._inflate.flush(()=>{let s=this._inflate[jt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=Bd.concat(this._inflate[Fe],this._inflate[Se]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Se]=0,this._inflate[Fe]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Tr.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Tr.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Se]=0,this._deflate[Fe]=[],this._deflate.on("data",HA)}this._deflate[Ut]=n,this._deflate.write(t),this._deflate.flush(Tr.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Bd.concat(this._deflate[Fe],this._deflate[Se]);r&&(s=new OA(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ut]=null,this._deflate[Se]=0,this._deflate[Fe]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};zd.exports=Pi;function HA(e){this[Fe].push(e),this[Se]+=e.length}function Vd(e){if(this[Se]+=e.length,this[yo]._maxPayload<1||this[Se]<=this[yo]._maxPayload){this[Fe].push(e);return}this[jt]=new RangeError("Max payload size exceeded"),this[jt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[jt][Gd]=1009,this.removeListener("data",Vd),this.reset()}function DA(e){if(this[yo]._inflate=null,this[jt]){this[Ut](this[jt]);return}e[Gd]=1007,this[Ut](e)}});var Bt=$((XE,Ao)=>{"use strict";var{isUtf8:Kd}=require("buffer"),{hasBlob:FA}=Ae(),UA=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function jA(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Ti(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function $A(e){return FA&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Ao.exports={isBlob:$A,isValidStatusCode:jA,isValidUTF8:Ti,tokenChars:UA};if(Kd)Ao.exports.isValidUTF8=function(e){return e.length<24?Ti(e):Kd(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Ao.exports.isValidUTF8=function(t){return t.length<32?Ti(t):e(t)}}catch{}});var Hi=$((ZE,eu)=>{"use strict";var{Writable:BA}=require("stream"),qd=$t(),{BINARY_TYPES:GA,EMPTY_BUFFER:Jd,kStatusCode:VA,kWebSocket:zA}=Ae(),{concat:Ii,toArrayBuffer:KA,unmask:qA}=Pr(),{isValidStatusCode:JA,isValidUTF8:Yd}=Bt(),So=Buffer[Symbol.species],q=0,Xd=1,Zd=2,Qd=3,Ni=4,Oi=5,_o=6,Mi=class extends BA{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||GA[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[zA]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=q}_write(t,r,n){if(this._opcode===8&&this._state==q)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new So(n.buffer,n.byteOffset+t,n.length-t),new So(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new So(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case q:this.getInfo(t);break;case Xd:this.getPayloadLength16(t);break;case Zd:this.getPayloadLength64(t);break;case Qd:this.getMask();break;case Ni:this.getData(t);break;case Oi:case _o:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[qd.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Xd:this._payloadLength===127?this._state=Zd:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Qd:this._state=Ni}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Ni}getData(t){let r=Jd;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&qA(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Oi,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[qd.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===q&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=q;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=Ii(n,r):this._binaryType==="arraybuffer"?o=KA(Ii(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=q):(this._state=_o,setImmediate(()=>{this.emit("message",o,!0),this._state=q,this.startLoop(t)}))}else{let o=Ii(n,r);if(!this._skipUTF8Validation&&!Yd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Oi||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=q):(this._state=_o,setImmediate(()=>{this.emit("message",o,!1),this._state=q,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,Jd),this.end();else{let n=t.readUInt16BE(0);if(!JA(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new So(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!Yd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=q;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=q):(this._state=_o,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=q,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[VA]=o,i}};eu.exports=Mi});var Ui=$((e0,nu)=>{"use strict";var{Duplex:QE}=require("stream"),{randomFillSync:YA}=require("crypto"),{types:{isUint8Array:XA}}=require("util"),tu=$t(),{EMPTY_BUFFER:ZA,kWebSocket:QA,NOOP:eS}=Ae(),{isBlob:Gt,isValidStatusCode:tS}=Bt(),{mask:ru,toBuffer:at}=Pr(),J=Symbol("kByteLength"),rS=Buffer.alloc(4),bo=8*1024,lt,Vt=bo,re=0,nS=1,oS=2,Di=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=re,this.onerror=eS,this[QA]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||rS,r.generateMask?r.generateMask(n):(Vt===bo&&(lt===void 0&&(lt=Buffer.alloc(bo)),YA(lt,0,bo),Vt=0),n[0]=lt[Vt++],n[1]=lt[Vt++],n[2]=lt[Vt++],n[3]=lt[Vt++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[J]!==void 0?a=r[J]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let u=Buffer.allocUnsafe(o?a+s:s);return u[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(u[0]|=64),u[1]=c,c===126?u.writeUInt16BE(a,2):c===127&&(u[2]=u[3]=0,u.writeUIntBE(a,4,6)),r.mask?(u[1]|=128,u[s-4]=n[0],u[s-3]=n[1],u[s-2]=n[2],u[s-1]=n[3],i?[u,t]:o?(ru(t,n,u,s,a),[u]):(ru(t,n,t,0,a),[u,t])):[u,t]}close(t,r,n,o){let s;if(t===void 0)s=ZA;else{if(typeof t!="number"||!tS(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(XA(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[J]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==re?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Gt(t)?(o=t.size,s=!1):(t=at(t),o=t.length,s=at.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[J]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Gt(t)?this._state!==re?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==re?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Gt(t)?(o=t.size,s=!1):(t=at(t),o=t.length,s=at.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[J]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Gt(t)?this._state!==re?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==re?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[tu.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Gt(t)?(a=t.size,c=!1):(t=at(t),a=t.length,c=at.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let u={[J]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Gt(t)?this._state!==re?this.enqueue([this.getBlobData,t,this._compress,u,n]):this.getBlobData(t,this._compress,u,n):this._state!==re?this.enqueue([this.dispatch,t,this._compress,u,n]):this.dispatch(t,this._compress,u,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[J],this._state=oS,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Fi,this,a,o);return}this._bufferedBytes-=n[J];let i=at(s);r?this.dispatch(i,r,n,o):(this._state=re,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(sS,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[tu.extensionName];this._bufferedBytes+=n[J],this._state=nS,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Fi(this,c,o);return}this._bufferedBytes-=n[J],this._state=re,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===re&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][J],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][J],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};nu.exports=Di;function Fi(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function sS(e,t,r){Fi(e,t,r),e.onerror(t)}});var mu=$((t0,uu)=>{"use strict";var{kForOnEventAttribute:Ir,kListener:ji}=Ae(),ou=Symbol("kCode"),su=Symbol("kData"),iu=Symbol("kError"),au=Symbol("kMessage"),lu=Symbol("kReason"),zt=Symbol("kTarget"),cu=Symbol("kType"),du=Symbol("kWasClean"),_e=class{constructor(t){this[zt]=null,this[cu]=t}get target(){return this[zt]}get type(){return this[cu]}};Object.defineProperty(_e.prototype,"target",{enumerable:!0});Object.defineProperty(_e.prototype,"type",{enumerable:!0});var ct=class extends _e{constructor(t,r={}){super(t),this[ou]=r.code===void 0?0:r.code,this[lu]=r.reason===void 0?"":r.reason,this[du]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[ou]}get reason(){return this[lu]}get wasClean(){return this[du]}};Object.defineProperty(ct.prototype,"code",{enumerable:!0});Object.defineProperty(ct.prototype,"reason",{enumerable:!0});Object.defineProperty(ct.prototype,"wasClean",{enumerable:!0});var Kt=class extends _e{constructor(t,r={}){super(t),this[iu]=r.error===void 0?null:r.error,this[au]=r.message===void 0?"":r.message}get error(){return this[iu]}get message(){return this[au]}};Object.defineProperty(Kt.prototype,"error",{enumerable:!0});Object.defineProperty(Kt.prototype,"message",{enumerable:!0});var Nr=class extends _e{constructor(t,r={}){super(t),this[su]=r.data===void 0?null:r.data}get data(){return this[su]}};Object.defineProperty(Nr.prototype,"data",{enumerable:!0});var iS={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[Ir]&&o[ji]===t&&!o[Ir])return;let n;if(e==="message")n=function(s,i){let a=new Nr("message",{data:i?s:s.toString()});a[zt]=this,vo(t,this,a)};else if(e==="close")n=function(s,i){let a=new ct("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[zt]=this,vo(t,this,a)};else if(e==="error")n=function(s){let i=new Kt("error",{error:s,message:s.message});i[zt]=this,vo(t,this,i)};else if(e==="open")n=function(){let s=new _e("open");s[zt]=this,vo(t,this,s)};else return;n[Ir]=!!r[Ir],n[ji]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[ji]===t&&!r[Ir]){this.removeListener(e,r);break}}};uu.exports={CloseEvent:ct,ErrorEvent:Kt,Event:_e,EventTarget:iS,MessageEvent:Nr};function vo(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var wo=$((r0,pu)=>{"use strict";var{tokenChars:Or}=Bt();function de(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function aS(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,u=-1,m=-1,y=0;for(;y<e.length;y++)if(u=e.charCodeAt(y),i===void 0)if(m===-1&&Or[u]===1)c===-1&&(c=y);else if(y!==0&&(u===32||u===9))m===-1&&c!==-1&&(m=y);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y);let A=e.slice(c,m);u===44?(de(t,A,r),r=Object.create(null)):i=A,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);else if(a===void 0)if(m===-1&&Or[u]===1)c===-1&&(c=y);else if(u===32||u===9)m===-1&&c!==-1&&(m=y);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y),de(r,e.slice(c,m),!0),u===44&&(de(t,i,r),r=Object.create(null),i=void 0),c=m=-1}else if(u===61&&c!==-1&&m===-1)a=e.slice(c,y),c=m=-1;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(o){if(Or[u]!==1)throw new SyntaxError(`Unexpected character at index ${y}`);c===-1?c=y:n||(n=!0),o=!1}else if(s)if(Or[u]===1)c===-1&&(c=y);else if(u===34&&c!==-1)s=!1,m=y;else if(u===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(u===34&&e.charCodeAt(y-1)===61)s=!0;else if(m===-1&&Or[u]===1)c===-1&&(c=y);else if(c!==-1&&(u===32||u===9))m===-1&&(m=y);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y);let A=e.slice(c,m);n&&(A=A.replace(/\\/g,""),n=!1),de(r,a,A),u===44&&(de(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);if(c===-1||s||u===32||u===9)throw new SyntaxError("Unexpected end of input");m===-1&&(m=y);let v=e.slice(c,m);return i===void 0?de(t,v,r):(a===void 0?de(r,v,!0):n?de(r,a,v.replace(/\\/g,"")):de(r,a,v),de(t,i,r)),t}function lS(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}pu.exports={format:lS,parse:aS}});var Lo=$((s0,Eu)=>{"use strict";var cS=require("events"),dS=require("https"),uS=require("http"),hu=require("net"),mS=require("tls"),{randomBytes:pS,createHash:gS}=require("crypto"),{Duplex:n0,Readable:o0}=require("stream"),{URL:$i}=require("url"),Ue=$t(),fS=Hi(),hS=Ui(),{isBlob:yS}=Bt(),{BINARY_TYPES:gu,CLOSE_TIMEOUT:AS,EMPTY_BUFFER:Wo,GUID:SS,kForOnEventAttribute:Bi,kListener:_S,kStatusCode:bS,kWebSocket:O,NOOP:yu}=Ae(),{EventTarget:{addEventListener:vS,removeEventListener:wS}}=mu(),{format:WS,parse:ES}=wo(),{toBuffer:kS}=Pr(),Au=Symbol("kAborted"),Gi=[8,13],be=["CONNECTING","OPEN","CLOSING","CLOSED"],LS=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,C=class e extends cS{constructor(t,r,n){super(),this._binaryType=gu[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Wo,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),Su(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){gu.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new fS({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new hS(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[O]=this,s[O]=this,t[O]=this,o.on("conclude",CS),o.on("drain",PS),o.on("error",TS),o.on("message",IS),o.on("ping",NS),o.on("pong",OS),s.onerror=MS,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",vu),t.on("data",ko),t.on("end",wu),t.on("error",Wu),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Ue.extensionName]&&this._extensions[Ue.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){z(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),bu(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Vi(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Wo,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Vi(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Wo,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){Vi(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Ue.extensionName]||(o.compress=!1),this._sender.send(t||Wo,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){z(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(C,"CONNECTING",{enumerable:!0,value:be.indexOf("CONNECTING")});Object.defineProperty(C.prototype,"CONNECTING",{enumerable:!0,value:be.indexOf("CONNECTING")});Object.defineProperty(C,"OPEN",{enumerable:!0,value:be.indexOf("OPEN")});Object.defineProperty(C.prototype,"OPEN",{enumerable:!0,value:be.indexOf("OPEN")});Object.defineProperty(C,"CLOSING",{enumerable:!0,value:be.indexOf("CLOSING")});Object.defineProperty(C.prototype,"CLOSING",{enumerable:!0,value:be.indexOf("CLOSING")});Object.defineProperty(C,"CLOSED",{enumerable:!0,value:be.indexOf("CLOSED")});Object.defineProperty(C.prototype,"CLOSED",{enumerable:!0,value:be.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(C.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(C.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Bi])return t[_S];return null},set(t){for(let r of this.listeners(e))if(r[Bi]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Bi]:!0})}})});C.prototype.addEventListener=vS;C.prototype.removeEventListener=wS;Eu.exports=C;function Su(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:AS,protocolVersion:Gi[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!Gi.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${Gi.join(", ")})`);let s;if(t instanceof $i)s=t;else try{s=new $i(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;Eo(e,l);return}let u=i?443:80,m=pS(16).toString("base64"),y=i?dS.request:uS.request,v=new Set,A;if(o.createConnection=o.createConnection||(i?RS:xS),o.defaultPort=o.defaultPort||u,o.port=s.port||u,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":m,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(A=new Ue({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=WS({[Ue.extensionName]:A.offer()})),r.length){for(let l of r){if(typeof l!="string"||!LS.test(l)||v.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");v.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let f;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[_,h]of Object.entries(l))n.headers[_.toLowerCase()]=h}else if(e.listenerCount("redirect")===0){let l=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),f=e._req=y(o),e._redirects&&e.emit("redirect",e.url,f)}else f=e._req=y(o);o.timeout&&f.on("timeout",()=>{z(e,f,"Opening handshake has timed out")}),f.on("error",l=>{f===null||f[Au]||(f=e._req=null,Eo(e,l))}),f.on("response",l=>{let _=l.headers.location,h=l.statusCode;if(_&&o.followRedirects&&h>=300&&h<400){if(++e._redirects>o.maxRedirects){z(e,f,"Maximum redirects exceeded");return}f.abort();let p;try{p=new $i(_,t)}catch{let b=new SyntaxError(`Invalid URL: ${_}`);Eo(e,b);return}Su(e,p,r,n)}else e.emit("unexpected-response",f,l)||z(e,f,`Unexpected server response: ${l.statusCode}`)}),f.on("upgrade",(l,_,h)=>{if(e.emit("upgrade",l),e.readyState!==C.CONNECTING)return;f=e._req=null;let p=l.headers.upgrade;if(p===void 0||p.toLowerCase()!=="websocket"){z(e,_,"Invalid Upgrade header");return}let S=gS("sha1").update(m+SS).digest("base64");if(l.headers["sec-websocket-accept"]!==S){z(e,_,"Invalid Sec-WebSocket-Accept header");return}let b=l.headers["sec-websocket-protocol"],W;if(b!==void 0?v.size?v.has(b)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":v.size&&(W="Server sent no subprotocol"),W){z(e,_,W);return}b&&(e._protocol=b);let k=l.headers["sec-websocket-extensions"];if(k!==void 0){if(!A){z(e,_,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=ES(k)}catch{z(e,_,"Invalid Sec-WebSocket-Extensions header");return}let se=Object.keys(R);if(se.length!==1||se[0]!==Ue.extensionName){z(e,_,"Server indicated an extension that was not requested");return}try{A.accept(R[Ue.extensionName])}catch{z(e,_,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Ue.extensionName]=A}e.setSocket(_,h,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(f,e):f.end()}function Eo(e,t){e._readyState=C.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function xS(e){return e.path=e.socketPath,hu.connect(e)}function RS(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=hu.isIP(e.host)?"":e.host),mS.connect(e)}function z(e,t,r){e._readyState=C.CLOSING;let n=new Error(r);Error.captureStackTrace(n,z),t.setHeader?(t[Au]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Eo,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function Vi(e,t,r){if(t){let n=yS(t)?t.size:kS(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${be[e.readyState]})`);process.nextTick(r,n)}}function CS(e,t){let r=this[O];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[O]!==void 0&&(r._socket.removeListener("data",ko),process.nextTick(_u,r._socket),e===1005?r.close():r.close(e,t))}function PS(){let e=this[O];e.isPaused||e._socket.resume()}function TS(e){let t=this[O];t._socket[O]!==void 0&&(t._socket.removeListener("data",ko),process.nextTick(_u,t._socket),t.close(e[bS])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function fu(){this[O].emitClose()}function IS(e,t){this[O].emit("message",e,t)}function NS(e){let t=this[O];t._autoPong&&t.pong(e,!this._isServer,yu),t.emit("ping",e)}function OS(e){this[O].emit("pong",e)}function _u(e){e.resume()}function MS(e){let t=this[O];t.readyState!==C.CLOSED&&(t.readyState===C.OPEN&&(t._readyState=C.CLOSING,bu(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function bu(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function vu(){let e=this[O];if(this.removeListener("close",vu),this.removeListener("data",ko),this.removeListener("end",wu),e._readyState=C.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[O]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",fu),e._receiver.on("finish",fu))}function ko(e){this[O]._receiver.write(e)||this.pause()}function wu(){let e=this[O];e._readyState=C.CLOSING,e._receiver.end(),this.end()}function Wu(){let e=this[O];this.removeListener("error",Wu),this.on("error",yu),e&&(e._readyState=C.CLOSING,this.destroy())}});var Ru=$((a0,xu)=>{"use strict";var i0=Lo(),{Duplex:HS}=require("stream");function ku(e){e.emit("close")}function DS(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Lu(e){this.removeListener("error",Lu),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function FS(e,t){let r=!0,n=new HS({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(ku,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(ku,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",DS),n.on("error",Lu),n}xu.exports=FS});var zi=$((l0,Cu)=>{"use strict";var{tokenChars:US}=Bt();function jS(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&US[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}Cu.exports={parse:jS}});var Hu=$((d0,Mu)=>{"use strict";var $S=require("events"),xo=require("http"),{Duplex:c0}=require("stream"),{createHash:BS}=require("crypto"),Pu=wo(),dt=$t(),GS=zi(),VS=Lo(),{CLOSE_TIMEOUT:zS,GUID:KS,kWebSocket:qS}=Ae(),JS=/^[+/0-9A-Za-z]{22}==$/,Tu=0,Iu=1,Ou=2,Ki=class extends $S{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:zS,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:VS,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=xo.createServer((n,o)=>{let s=xo.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=YS(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=Tu}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===Ou){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Mr,this);return}if(t&&this.once("close",t),this._state!==Iu)if(this._state=Iu,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Mr,this):process.nextTick(Mr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Mr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",Nu);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){ut(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){ut(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!JS.test(s)){ut(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){ut(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Hr(r,400);return}let c=t.headers["sec-websocket-protocol"],u=new Set;if(c!==void 0)try{u=GS.parse(c)}catch{ut(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let m=t.headers["sec-websocket-extensions"],y={};if(this.options.perMessageDeflate&&m!==void 0){let v=new dt({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let A=Pu.parse(m);A[dt.extensionName]&&(v.accept(A[dt.extensionName]),y[dt.extensionName]=v)}catch{ut(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let v={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(v,(A,f,l,_)=>{if(!A)return Hr(r,f||401,l,_);this.completeUpgrade(y,s,u,t,r,n,o)});return}if(!this.options.verifyClient(v))return Hr(r,401)}this.completeUpgrade(y,s,u,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[qS])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>Tu)return Hr(s,503);let u=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${BS("sha1").update(r+KS).digest("base64")}`],m=new this.options.WebSocket(null,void 0,this.options);if(n.size){let y=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;y&&(u.push(`Sec-WebSocket-Protocol: ${y}`),m._protocol=y)}if(t[dt.extensionName]){let y=t[dt.extensionName].params,v=Pu.format({[dt.extensionName]:[y]});u.push(`Sec-WebSocket-Extensions: ${v}`),m._extensions=t}this.emit("headers",u,o),s.write(u.concat(`\r
`).join(`\r
`)),s.removeListener("error",Nu),m.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(m),m.on("close",()=>{this.clients.delete(m),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Mr,this)})),a(m,o)}};Mu.exports=Ki;function YS(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Mr(e){e._state=Ou,e.emit("close")}function Nu(){this.destroy()}function Hr(e,t,r,n){r=r||xo.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${xo.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function ut(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,ut),e.emit("wsClientError",i,r,t)}else Hr(r,n,o,s)}});var XS,ZS,QS,e_,t_,r_,Du,n_,Dr,Fu=d(()=>{XS=g(Ru(),1),ZS=g(wo(),1),QS=g($t(),1),e_=g(Hi(),1),t_=g(Ui(),1),r_=g(zi(),1),Du=g(Lo(),1),n_=g(Hu(),1),Dr=Du.default});var qi=d(()=>{"use strict"});var ve,Fr=d(()=>{"use strict";ve=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var qt,mt,Uu,s_,Ji,Yi,ju,$u,Bu,Gu,Xi,Zi=d(()=>{"use strict";qt=g(require("node:fs")),mt=g(require("node:os")),Uu=g(require("node:path"));qi();Fr();s_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ji=(e=mt.default.hostname())=>Uu.default.join(mt.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Yi=e=>{if(!qt.default.existsSync(e))return null;try{let t=JSON.parse(qt.default.readFileSync(e,"utf8"));return!s_(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},ju=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},$u=(e,t)=>{qt.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Bu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Ji(),n=Yi(r);if(n!==null&&n.pid!==process.pid&&ve(n.pid)&&ju(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:mt.default.hostname(),macOsUsername:mt.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return $u(r,o),{ok:!0}},Gu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Ji(),n=Yi(r);return n!==null&&n.pid!==process.pid&&ve(n.pid)&&ju(n)?{ok:!1}:($u(r,{hostname:mt.default.hostname(),macOsUsername:mt.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Xi=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Ji();Yi(r)?.pid===process.pid&&qt.default.existsSync(r)&&qt.default.unlinkSync(r)}});var Qi,Ur,i_,a_,l_,c_,Vu,zu=d(()=>{"use strict";Qi=require("node:child_process"),Ur=g(require("node:path"));Fr();vt();i_=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),a_=(e,t)=>{if(i_(e)||!/\bnode\b/.test(e))return!1;let r=Ur.default.resolve(t),n=Ur.default.join(r,"app",ge),o=Ur.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ge||i==="agent-witch.ts")return e.includes(r);try{let a=Ur.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},l_=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,Qi.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},c_=(e,t,r)=>{let n=l_(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),u=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||a_(u,t)&&o.push(c)}return o},Vu=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Qi.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=c_(r,e.installDir,t),o=[];for(let s of n)if(ve(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var jr,$r,Ku,d_,qu,Ju=d(()=>{"use strict";jr=g(require("node:fs")),$r=g(require("node:path"));x();Ku=(e,t)=>{!jr.default.existsSync(e)||jr.default.existsSync(t)||(jr.default.mkdirSync($r.default.dirname(t),{recursive:!0}),jr.default.renameSync(e,t))},d_=e=>{if(e.profileEmail===null)return;let t=$r.default.join(e.installDir,fe);Ku($r.default.join(t,_n),e.mainLogPath),Ku($r.default.join(t,bn),e.errorLogPath)},qu=e=>{let t=L();e!==void 0&&t.installDir!==e||d_(t)}});var Yu,Xu,Zu,Qu,em=d(()=>{"use strict";Yu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Xu=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?Yu(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?Yu(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Zu=e=>{let t=e.watchdogLogs.map(Xu).join(""),r=e.updateLogs.map(Xu).join("");return`<!doctype html>
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
</html>`},Qu=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var tm,rm,nm=d(()=>{"use strict";tm=g(require("node:net")),rm=()=>new Promise((e,t)=>{let r=tm.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var om,u_,sm,im=d(()=>{"use strict";om=g(require("node:net"));nm();Mt();no();x();u_=e=>new Promise(t=>{let r=om.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),sm=async()=>{let e=w(),t=ee();if(await u_(t))return Vc(t),t;let r=await rm();return ro(e,r),r}});var m_,am,lm=d(()=>{"use strict";m_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),am=e=>({force:m_(e)&&e.force===!0})});var ea,p_,pt,Ro=d(()=>{"use strict";ea=g(require("node:os")),p_=e=>{let t=e.trim();return t.startsWith("~/")?`${ea.default.homedir()}${t.slice(1)}`:t==="~"?ea.default.homedir():t},pt=p_});var gt,je,Br=d(()=>{"use strict";gt=g(require("node:path"));Lt();Ro();je=e=>{let t=pt(e),r=gt.default.join(t,Tl);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:gt.default.join(r,"rag"),memoryDirPath:gt.default.join(r,Il),reportsDirPath:gt.default.join(r,Ol),metaFilePath:gt.default.join(r,Nl),ragChunksFilePath:gt.default.join(r,"rag",Rn)}}});var ue,dm,g_,f_,we,Gr=d(()=>{"use strict";ue=g(require("node:fs")),dm=g(require("node:path"));Lt();Br();g_=(e,t)=>{if(ue.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};ue.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},f_=e=>{ue.default.existsSync(e.ragChunksFilePath)||ue.default.writeFileSync(e.ragChunksFilePath,"");let t=dm.default.join(e.memoryDirPath,Cn);ue.default.existsSync(t)||ue.default.writeFileSync(t,"")},we=e=>{let t=je(e.projectFolderPath);return ue.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),ue.default.mkdirSync(t.ragDirPath,{recursive:!0}),ue.default.mkdirSync(t.memoryDirPath,{recursive:!0}),g_(t,e),f_(t),{ok:!0,layout:t}}});var h_,um,mm=d(()=>{"use strict";Gr();h_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),um=e=>{if(!h_(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:we({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var gm,S_,pm,T,y_,A_,ta,fm=d(()=>{"use strict";gm=g(require("node:http"));ki();ti();em();im();lm();xn();mm();Mn();bt();S_={},pm=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},T=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},y_=e=>{e.writeHead(403),e.end()},A_=async(e,t,r)=>{let n=e.headers.origin,o=jc(n);try{if(n!==void 0&&n.length>0&&!o.allowed){y_(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){T(t,200,yi(),o.headers);return}if(e.method==="GET"&&s==="/identity"){T(t,200,Ai(),o.headers);return}if(e.method==="GET"&&s==="/local"){let i=po(50),a=go(50);t.writeHead(200,Qu()),t.end(Zu({port:r,watchdogLogs:i,updateLogs:a}));return}if(e.method==="GET"&&s==="/watchdog/status"){let i=await _i();T(t,200,i,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let i=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:po(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let i=await bi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/restart"){let i=await vi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let i=wi();T(t,200,{ok:!0,...i},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let i=new URL(e.url??"/update/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:go(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let i=await pm(e),{force:a}=am(i),c=await Wi({force:a});T(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let i=await Ei();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/wake"){let i=await Si();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let i=[];for await(let u of e)i.push(Buffer.from(u));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=mo(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let i=await pm(e),a=um(i);T(t,a.ok?200:400,a,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let i=[];for await(let u of e)i.push(Buffer.from(u));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=mo(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){T(t,200,hi(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let i=[];for await(let u of e)i.push(Buffer.from(u));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=gi(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let i=[];for await(let u of e)i.push(Buffer.from(u));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await fi(a);T(t,c.ok?200:503,c,o.headers);return}T(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{T(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},ta=async()=>{let e=await sm(),t=gm.default.createServer((r,n)=>{A_(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!ie()&&xt(S_.url)&&(async()=>{kt("agent-witch-wake-server");let e=await ta(),t=Ln(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var ra,hm=d(()=>{"use strict";_r();eo();st();ra=async()=>{let e=F();if(e===null)return;let t=Te(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Ot(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var ym,Am=d(()=>{"use strict";qi();fm();Zi();hm();ym=async(e={})=>{let t=await ta();ra();let r=setInterval(()=>{ra()},6e4),n=setInterval(()=>{if(!Gu().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var Vr,Co,v_,Sm,_m,Po,bm,vm,na,wm,To,Wm=d(()=>{"use strict";Vr=g(require("node:fs")),Co=g(require("node:path")),v_="pending-run-inputs.json",Sm=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_m=e=>{let t=e.profileEmail?Co.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Co.default.join(t,v_)},Po=e=>{let t=_m(e);if(!Vr.default.existsSync(t))return{};try{let r=JSON.parse(Vr.default.readFileSync(t,"utf8"));return Sm(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!Sm(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},bm=(e,t)=>{let r=_m(e);Vr.default.mkdirSync(Co.default.dirname(r),{recursive:!0}),Vr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},vm=e=>Object.values(Po(e)),na=(e,t)=>Po(e)[t]!==void 0,wm=(e,t)=>{let r=Po(e);r[t.agentRunId]=t,bm(e,r)},To=(e,t)=>{let r=Po(e);delete r[t],bm(e,r)}});var oa,Em=d(()=>{"use strict";oa={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var sa,ik,km=d(()=>{"use strict";sa={OPEN:"open",APPROVAL:"approval"},ik=sa.APPROVAL});var Jt,Io,Lm,w_,xm,Rm,Cm,No,Pm,ia=d(()=>{"use strict";Jt=g(require("node:fs")),Io=g(require("node:path")),Lm="runs",w_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xm=e=>{let t=e.profileEmail!==null?Io.default.join(e.installDir,"profiles",e.profileEmail,Lm):Io.default.join(e.installDir,Lm);return Jt.default.mkdirSync(t,{recursive:!0}),t},Rm=(e,t)=>Io.default.join(xm(e),`${t}.json`),Cm=(e,t)=>{Jt.default.writeFileSync(Rm(e,t.id),JSON.stringify(t,null,2))},No=(e,t)=>{let r=Rm(e,t);if(!Jt.default.existsSync(r))return null;try{let n=JSON.parse(Jt.default.readFileSync(r,"utf8"));return!w_(n)||typeof n.id!="string"?null:n}catch{return null}},Pm=e=>{let t=xm(e),r=Jt.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=No(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var W_,Tm,Im=d(()=>{"use strict";Em();km();ia();W_=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?oa.COMPLETED:oa.FAILED,dispatchPolicy:sa.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},Tm=(e,t)=>{let r=W_(t);return Cm(e,r),r}});var zr,Oo,E_,aa,Nm,Om,Mm,la,Hm=d(()=>{"use strict";zr=g(require("node:fs")),Oo=g(require("node:path"));br();E_="run-completion-outbox.json",aa=e=>{let t=e.profileEmail?Oo.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Oo.default.join(t,E_)},Nm=e=>{let t=aa(e);if(!zr.default.existsSync(t))return[];try{let r=JSON.parse(zr.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},Om=(e,t)=>{zr.default.mkdirSync(Oo.default.dirname(aa(e)),{recursive:!0}),zr.default.writeFileSync(aa(e),JSON.stringify(t,null,2),"utf8")},Mm=(e,t)=>{let r=[...Nm(e).filter(n=>n.runId!==t.runId),t];Om(e,r)},la=async e=>{if(e.cloudApi===null)return;let t=Nm(e.layout);if(t.length===0)return;let r=[];for(let n of t)await zn(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);Om(e.layout,r)}});var Dm=d(()=>{"use strict"});var ca,Kr,L_,ft,Fm=d(()=>{"use strict";Dm();ca=new Map,Kr=e=>{let t=ca.get(e);t!==void 0&&(clearInterval(t),ca.delete(e))},L_=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},ft=(e,t,r,n={})=>{Kr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Kr(t);return}let i=n.onTick?.()??{};L_(e,t,o,i)};s(),ca.set(t,setInterval(s,15e3))}});var da,qr,ht,Um,$e,jm,Mo=d(()=>{"use strict";da=new Set,qr=new Map,ht=(e,t)=>{if(t.length===0)return;let r=qr.get(e)??[];r.push(t),qr.set(e,r)},Um=e=>{da.add(e);let t=qr.get(e)??[];return qr.delete(e),t},$e=e=>da.has(e),jm=e=>{da.delete(e),qr.delete(e)}});var $m,Bm,Gm,Vm,j,Yt,zm,Km,Jr,qm,Jm,ua,Ym,Xm,Zm,Ho=d(()=>{"use strict";$m=require("node:crypto"),Bm=g(require("node:fs")),Gm=g(require("node:path")),Vm=require("node:url");Fr();bt();hs();j=new Map,zm=async()=>{if(Yt!==void 0)return Yt;try{if(ie()){let e=Sn(),t=Gm.default.join(e,"deps","node-pty","lib","index.js");if(Bm.default.existsSync(t)){let r=await import((0,Vm.pathToFileURL)(t).href);return Yt=r,r}}return Yt=await import("node-pty"),Yt}catch{return Yt=null,null}},Km=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},Jr=(e,t,r)=>{let n=j.get(e);if(n!==void 0){j.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},qm=(e,t)=>{let r=j.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Jm=(e,t,r)=>{let n=j.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},ua=e=>{for(let t of j.values())if(!(t.mode!=="agent"||t.runId!==e))return ve(t.pty.pid);return!1},Ym=e=>{for(let[t,r]of j.entries())if(!(r.mode!=="agent"||r.runId!==e)){j.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Xm=async e=>{let t=await zm();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;j.get(e.shellSessionId)!==void 0&&Jr(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return j.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{Km(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{j.get(e.shellSessionId)?.pty===o&&(j.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Zm=async e=>{let t=e.shellSessionId??(0,$m.randomUUID)(),r=await zm();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return j.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{Km(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{j.get(t)?.pty===n&&(j.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var Do,Qm,ep=d(()=>{"use strict";Do="[[AWAITING_INPUT]]",Qm=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Do,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Yr,tp,Fo=d(()=>{"use strict";ep();Yr=e=>{let t=e.indexOf(Do);if(t<0)return null;let n=e.slice(t+Do.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},tp=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Qm].join(`
`)});var rp,np=d(()=>{"use strict";Mo();Ho();Fo();rp=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if($e(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}ht(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Zm({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=Yr(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var op,sp,ip,Be,Uo=d(()=>{"use strict";op=require("node:child_process"),sp=g(require("node:fs")),ip=g(require("node:path"));vt();Be=(e,t)=>{let r=ip.default.join(e,"app",dl,"ensure-writer.sh");return sp.default.existsSync(r)?new Promise((n,o)=>{let s=(0,op.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var ap,yt,$o,lp,cp,jo,dp,Bo,up,mp,x_,Xr,R_,C_,pp,ma=d(()=>{"use strict";ap=require("node:child_process");tt();Uo();wr();nt();He();ot();yt=new Map,$o=e=>e==="cursor"||e==="antigravity",lp=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",cp=e=>yt.get(e)?.warmed===!0,jo=e=>{let t=yt.get(e);yt.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},dp=e=>yt.get(e)?.conversationStarted===!0,Bo=e=>{let t=yt.get(e);yt.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},up=e=>{yt.delete(e)},mp=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",x_={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Xr=e=>`${x_[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,R_=(e,t,r,n)=>new Promise(o=>{let s=Rc(t,r),i=[],a=(0,ap.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=u=>{let m=u.toString("utf8");i.push(m),n?.(m)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",u=>{o({exitCode:u??-1,output:i.join("").trim()})}),a.on("error",u=>{o({exitCode:-1,output:u.message})})}),C_=(e,t)=>{let r=Xr(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},pp=async e=>{if(!H(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&V(e.runConfig.writerExecutionBackend)==="api"){let r=Oe(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=Q(e.runConfig.layout.configPath);return Me(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),jo(e.writerAgent),{exitCode:0,output:Xr(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Be(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}$o(e.writerAgent)&&jo(e.writerAgent);let t=await R_(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?C_(e.writerAgent,t.output):Xr(e.writerAgent)}}});var gp,Zr,M,pa,fp,hp,ga,yp,Ap,Sp,P_,ne,Qr,Ge,_p,T_,I_,fa,bp,vp,wp,Wp=d(()=>{"use strict";gp=require("node:child_process");tt();Wm();Im();Hm();Fm();Fr();Mo();Ho();Fo();np();ma();Vs();He();ur();Fo();Zr=new Map,M=new Map,pa=new Set,fp=130,hp=`

Stopped by user.`,ga=null,yp=e=>{ga=e},Ap=async e=>{await la({layout:e,cloudApi:ga})},Sp=e=>{let t=Zr.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:ve(t.pid)},P_=e=>Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),ne=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Qr=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=In(s),c=M.get(r);if(a!==null&&c!==void 0){let u=zl(a),m=Sp(r)||ua(r);u!==null&&!m&&Ge(e,t,r,n,u.exitCode,u.output,c.originalPrompt)}return Vl(a)}}),Ge=(e,t,r,n,o,s,i)=>{let a=o,c=s;r!==void 0&&pa.has(r)&&(pa.delete(r),a=fp,c=c.trim().length>0&&!c.includes("Stopped by user.")?`${c.trim()}${hp}`:"Stopped by user."),r!==void 0&&(Kr(r),$e(r)&&(ne(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),jm(r)),Tm(e.layout,{agentRunId:r,originalPrompt:i,exitCode:a,output:c,layout:e.layout}),Mm(e.layout,{runId:r,exitCode:a,output:c,createdAt:new Date().toISOString()}),la({layout:e.layout,cloudApi:ga}),M.delete(r),Zr.delete(r),To(e.layout,r)),ne(t,{type:"command.claude.result",payload:{exitCode:a,output:c,...r!==void 0?{agentRunId:r}:{}},requestId:n})},_p=(e,t,r,n,o,s,i)=>{let a=M.get(r),c=a?.accumulatedOutput??s;wm(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),ft(t,r,()=>na(e.layout,r),Qr(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),ne(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},T_=(e,t,r,n,o,s,i)=>{let a=[],c=!1,u=m=>{if(!(o===void 0||m.length===0)){if($e(o)){ne(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:m},requestId:n});return}ht(o,m)}};if(o!==void 0){let m=M.get(o);Zr.set(o,t),M.set(o,{originalPrompt:s,writerAgent:i,projectFolderPath:m?.projectFolderPath,reportKey:m?.reportKey,accumulatedOutput:m?.accumulatedOutput??""}),ne(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),ft(r,o,()=>Sp(o),Qr(e,r,o,n,m?.projectFolderPath,m?.reportKey))}t.stdout?.on("data",m=>{let y=m.toString("utf8");if(a.push(y),u(y),c||o===void 0)return;let v=Yr(a.join(""));if(v!==null){c=!0,t.kill("SIGTERM");let A=M.get(o),f=[A?.accumulatedOutput??"",v.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),Zr.delete(o),_p(e,r,o,n,v.question,f,s)}}),t.stderr?.on("data",m=>{let y=m.toString("utf8");a.push(y),u(y)}),t.on("close",m=>{if(c)return;Bo(i);let y=o!==void 0?M.get(o):void 0,v=a.join("").trim(),A=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${v}`.trim():v;Ge(e,r,o,n,m??-1,A,s)}),t.on("error",m=>{c||Ge(e,r,o,n,-1,m.message,s)})},I_=(e,t,r,n,o,s,i,a)=>{s!==void 0&&(M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),ne(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),ft(o,s,()=>M.has(s),Qr(e,o,s,n,i,a))),Yn(e,t,r,u=>{if(!(s===void 0||u.length===0)){if($e(s)){ne(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:u},requestId:n});return}ht(s,u)}}).then(u=>{Bo(t),Ge(e,o,s,n,u.exitCode,u.output,r)}).catch(u=>{let m=u instanceof Error?u.message:String(u);Ge(e,o,s,n,-1,m,r)})},fa=(e,t,r,n,o,s,i,a,c,u)=>{if(Jn(e,t)){I_(e,t,r,n,o,s,c,u);return}let m=It(t,r,P_(e),i);if(m===null){Ge(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let y=()=>{let v=(0,gp.spawn)(m.command,[...m.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});T_(e,v,o,n,s,r,t)};if(s===void 0){y();return}M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:u,accumulatedOutput:M.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&u!==void 0&&u.trim().length>0&&Nn({reportKey:u,agentRunId:s,userSummary:"Task started on your Mac."}),ft(o,s,()=>M.has(s),Qr(e,o,s,n,c,u)),rp({socket:o,sendMessage:ne,requestId:n,agentRunId:s,shellSessionId:a,command:m.command,args:m.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:v=>{a!==void 0&&Jr(a,l=>{ne(o,l)},n);let A=M.get(s),f=[A?.accumulatedOutput??"",v.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),_p(e,o,s,n,v.question,f,r)},onFinished:(v,A)=>{Bo(t);let f=M.get(s),l=f!==void 0&&f.accumulatedOutput.length>0?`${f.accumulatedOutput}

${A}`.trim():A;Ge(e,o,s,n,v,l,r)}}).then(v=>{if(!v){y();return}ft(o,s,()=>ua(s),Qr(e,o,s,n,c,u))}).catch(v=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",v instanceof Error?v.message:v),y()})},bp=(e,t,r,n)=>{To(e.layout,t.agentRunId),t.shellSessionId!==void 0&&ne(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=tp(t),s=M.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;fa(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c)},vp=(e,t)=>{for(let r of vm(e.layout))M.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),ft(t,r.agentRunId,()=>na(e.layout,r.agentRunId),{awaitingInput:!0}),ne(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},wp=(e,t,r,n)=>{let o=M.get(r);if(o===void 0)return!1;pa.add(r),Kr(r);let s=Zr.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(Ym(r))return!0;To(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${hp}`:"Stopped by user.";return Ge(e,t,r,n,fp,i,o.originalPrompt),!0}});var N_,Ep,kp=d(()=>{"use strict";Mt();N_=()=>`http://127.0.0.1:${ee()}/restart`,Ep=async()=>{try{let e=await fetch(N_(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var At,ha,O_,M_,ya,St,Go,Lp,Vo=d(()=>{"use strict";At=g(require("node:fs")),ha=g(require("node:path")),O_="local-ws-traffic.ndjson",M_=500,ya=e=>ha.default.join(e.logsDir,O_),St=(e,t)=>{let r=ya(e);At.default.mkdirSync(ha.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});At.default.appendFileSync(r,`${n}
`,"utf8")},Go=(e,t=M_)=>{let r=ya(e);if(!At.default.existsSync(r))return[];let o=At.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},Lp=e=>{let t=ya(e);At.default.existsSync(t)&&At.default.writeFileSync(t,"","utf8")}});var H_,zo,Aa=d(()=>{"use strict";Mt();H_=()=>`http://127.0.0.1:${ee()}/update/run`,zo=async e=>{try{let t=await fetch(H_(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var xp,Rp=d(()=>{"use strict";xp=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var en,D_,Cp,Pp=d(()=>{"use strict";Vo();Ze();Aa();Rp();en=(e,t)=>{St(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},D_=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Pt(),jn)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Cp=async e=>{let t=G(e.layout.installDir)?.bundleVersion??null;if(!xp({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),en(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await zo({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),en(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await D_();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),en(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),en(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),en(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var F_,Tp,Ip=d(()=>{"use strict";F_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tp=e=>{if(!F_(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Np,Op,Mp=d(()=>{"use strict";Us();eo();Np=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Vn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Op=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Ot(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Y,U_,j_,$_,Hp,Dp,Fp,Up,jp,$p,Bp=d(()=>{"use strict";Y=require("node:crypto"),U_=Buffer.from("302a300506032b6570032100","hex"),j_=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},$_=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Y.createPublicKey)({key:Buffer.concat([U_,t]),format:"der",type:"spki"})},Hp=()=>{let{publicKey:e,privateKey:t}=(0,Y.generateKeyPairSync)("ed25519");return{publicKeyRaw:j_(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Dp=e=>(0,Y.createPrivateKey)(e),Fp=(e,t)=>(0,Y.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Up=(e,t,r)=>{try{let n=$_(e);return(0,Y.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},jp=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,$p=()=>(0,Y.randomBytes)(32).toString("base64url")});var We,Ko,Gp,B_,G_,Sa,Vp,zp,_a=d(()=>{"use strict";We=g(require("node:fs")),Ko=g(require("node:path"));Bp();x();Gp=e=>Ko.default.join(e.installDir,wt),B_=(e,t)=>{if(e.profileEmail===null||t===Gp(e)||We.default.existsSync(t))return;let r=Gp(e);We.default.existsSync(r)&&(We.default.mkdirSync(Ko.default.dirname(t),{recursive:!0}),We.default.renameSync(r,t))},G_=e=>{if(!We.default.existsSync(e))return null;try{let t=We.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Sa=e=>{let t=Sl(e);B_(e,t);let r=G_(t);if(r!==null)return r;let n=Hp();return We.default.mkdirSync(Ko.default.dirname(t),{recursive:!0}),We.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},Vp=e=>{let t=Sa(e.layout),r=$p(),n=jp({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=Dp(t.privateKeyPem),s=Fp(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},zp=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Up(e.serverPublicKey,t,e.serverAttestation)}});var qo,ba=d(()=>{"use strict";qo={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var V_,Kp,z_,qp,Jp=d(()=>{"use strict";ba();V_=new Set(Object.values(qo)),Kp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z_=e=>{if(!Kp(e))return!1;let t=e.type;return!(typeof t!="string"||!V_.has(t)||e.payload!==void 0&&!Kp(e.payload)||e.requestId!==void 0&&typeof e.requestId!="string")},qp=z_});var K_,Yp,Xp,Zp=d(()=>{"use strict";Jp();ba();K_=new Set(Object.values(qo)),Yp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xp=e=>{if(!Yp(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;return typeof t!="string"?{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e}:K_.has(t)?e.payload!==void 0&&!Yp(e.payload)?{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:e.requestId!==void 0&&typeof e.requestId!="string"?{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e}:qp(e)?{formatOk:!0,formatError:null,command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}}});var Qp,eg=d(()=>{"use strict";Qp=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var q_,J_,Y_,tn,tg=d(()=>{"use strict";eg();q_=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,J_=e=>q_.test(e),Y_=e=>Qp(e),tn=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>tn(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&J_(n)){r[n]=Y_(o);continue}r[n]=tn(o)}return r}});var me,va,X_,Z_,Q_,wa,rg,ng,og,eb,Wa,Xt,Ea,sg,Jo=d(()=>{"use strict";me=g(require("node:fs")),va=g(require("node:path"));Zp();tg();X_="local-ws-trace.ndjson",Z_=1e4,Q_=1440*60*1e3,wa=e=>va.default.join(e.logsDir,X_),rg=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},ng=e=>{if(!me.default.existsSync(e))return;let t=me.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Q_,o=t.filter(s=>{let i=rg(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-Z_);me.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},og=(e,t)=>{let r=wa(e);me.default.mkdirSync(va.default.dirname(r),{recursive:!0}),me.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),ng(r)},eb=e=>e.parsed===null?{_empty:!0}:tn(e.parsed),Wa=(e,t,r)=>{let n=Xp(r);og(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:eb(n)})},Xt=(e,t)=>{og(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:tn({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Ea=(e,t=80)=>{let r=wa(e);if(ng(r),!me.default.existsSync(r))return[];let n=me.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=rg(s);i!==null&&o.push(i)}return o.reverse()},sg=e=>{let t=wa(e);me.default.existsSync(t)&&me.default.writeFileSync(t,"","utf8")}});var ig,ag,lg=d(()=>{"use strict";Jo();ig=!1,ag=e=>{ig||(ig=!0,process.on("uncaughtException",t=>{Xt(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;Xt(e,{kind:"crash",message:r,stack:n})}))}});var tb,cg,dg=d(()=>{"use strict";tb="local.agentwitch.com",cg=`http://${tb}:43347`});var _t,rb,ug,mg=d(()=>{"use strict";_t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rb=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},ug=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${_t(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?_t(r.direction):_t(r.kind),i=`trace-body-${n}`,a=_t(rb(r.body));return`<tr>
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
    </section>`});var rn,Yo,nb,ob,sb,ib,pg,ab,lb,gg,nn,fg,on,hg,ka=d(()=>{"use strict";rn=g(require("node:fs")),Yo=g(require("node:path"));Lt();Br();nb="rag",ob="http://127.0.0.1:11434",sb="nomic-embed-text",ib=e=>Yo.default.join(e.installDir,nb),pg=(e,t)=>t!==void 0&&t.trim().length>0?je(t).ragChunksFilePath:Yo.default.join(ib(e),Rn),ab=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},lb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},gg=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||ob,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||sb;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},nn=(e,t)=>{let r=pg(e,t);if(!rn.default.existsSync(r))return[];let n=rn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},fg=async e=>{let t=lb(e.text);if(t.length===0)return 0;let r=pg(e.layout,e.projectFolderPath);rn.default.mkdirSync(Yo.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await gg(o);if(s===null)continue;let i={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};rn.default.appendFileSync(r,`${JSON.stringify(i)}
`,"utf8"),n+=1}return n},on=async e=>{let t=await gg(e.query);return t===null?[]:nn(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:ab(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},hg=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var yg,Ag=d(()=>{"use strict";yg=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Sg,Xo,_g,Zo=d(()=>{"use strict";Ag();Sg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xo=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=Sg(e),r=Sg(yg(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},_g=`(function () {
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
})();`});var Zt,bg,vg=d(()=>{"use strict";Zt=(e,t,r)=>e===1?t:r,bg=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Zt(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Zt(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${Zt(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Zt(c,"week","weeks")} ago`;let u=Math.floor(a/30);if(u<12)return`${u} ${Zt(u,"month","months")} ago`;let m=Math.floor(a/365);return`${m} ${Zt(m,"year","years")} ago`}});var La,wg,Wg=d(()=>{"use strict";La=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wg=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${La(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${La(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${La(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Eg,kg,Lg,xg=d(()=>{"use strict";Eg=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,kg=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Lg=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Qt,Rg,Cg=d(()=>{"use strict";Zo();Qt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rg=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Qt(e.wakeError)}</div>`:"",a=Xo(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Qt(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Qt(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Qt(n)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${Qt(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Qt(o)}</p>
      </a>
    </div>`}});var er,cb,Pg,Tg=d(()=>{"use strict";er=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cb=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Pg=e=>{let t=cb.map(i=>`<option value="${er(i.value)}">${er(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${er(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${er(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${er(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${er(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var pe,xa,Ig,Ng=d(()=>{"use strict";$s();pe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xa=(e,t)=>e[t]?.apiKey!==void 0?"Saved (hidden)":"Not set",Ig=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${pe(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
          <span class="field-label">Anthropic API key \u2014 ${pe(xa(e.secrets,"anthropic"))}</span>
          <input class="input mono" type="password" name="anthropicApiKey" autocomplete="off" placeholder="sk-ant-\u2026 (leave blank to keep)" />
        </label>
        <label class="field">
          <span class="field-label">Anthropic model (optional)</span>
          <input class="input mono" type="text" name="anthropicModel" placeholder="${pe(Ne.anthropic)}" value="${pe(e.secrets.anthropic?.model??"")}" />
        </label>
        <label class="field">
          <span class="field-label">OpenAI API key \u2014 ${pe(xa(e.secrets,"openai"))}</span>
          <input class="input mono" type="password" name="openaiApiKey" autocomplete="off" placeholder="sk-\u2026 (leave blank to keep)" />
        </label>
        <label class="field">
          <span class="field-label">OpenAI model (optional)</span>
          <input class="input mono" type="text" name="openaiModel" placeholder="${pe(Ne.openai)}" value="${pe(e.secrets.openai?.model??"")}" />
        </label>
        <label class="field">
          <span class="field-label">Google API key \u2014 ${pe(xa(e.secrets,"google"))}</span>
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
    </section>`}});var Og,Mg=d(()=>{"use strict";Og=`
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
`.trim()});var db,ub,Hg,Dg,Fg=d(()=>{"use strict";Mg();Zo();db=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,ub=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Hg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dg=e=>{let t=ub.map(o=>{let s=o.href===e.activePath;return`<a class="nav-link${s?" is-active":""}" href="${o.href}"${s?' aria-current="page"':""}>${o.label}</a>`}).join(""),r=Hg(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"";return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${Hg(e.title)} \xB7 Agent Witch Local</title>
  <style>${Og}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${db}
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
  <script>${_g}</script>
</body>
</html>`}});var Ra,Ug,jg=d(()=>{"use strict";Ra=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ug=e=>{if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">Nothing in <code>~/.agent-witch</code> yet. Use <strong>Import</strong> below to scan a folder.</p>
    </section>`;let t=e.installed.sets.map(n=>`<li class="harness-installed-set">
          <span><strong>${Ra(n.name)}</strong> <span class="muted mono">(${Ra(n.slug)})</span></span>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join(""),r=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Ra(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">${e.installed.sets.length} set(s) on this Mac. Link them to a repo under <a href="/projects">Projects</a>.</p>
      ${r}
      <ul class="harness-installed-set-list">${t}</ul>
    </section>`}});var mb,$g,Bg,Gg=d(()=>{"use strict";mb=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,$g=e=>e.kind==="folder",Bg=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let u=s.children.get(a);if(u!==void 0&&$g(u)){s=u;continue}let m={kind:"folder",name:a,children:new Map};s.children.set(a,m),s=m}}let r=n=>{let o=[];for(let s of n.children.values()){if($g(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(mb)};return r(t)}});var Vg,Ca,zg=d(()=>{"use strict";Vg=g(require("node:path")),Ca=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Ca(r.children,t)}</ul>
            </details>
          </li>`;let n=Vg.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var Kg,Ve,pb,gb,Qo,fb,qg,Jg=d(()=>{"use strict";Kg=g(require("node:path"));jg();Gg();zg();Ve=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pb=()=>`(() => {
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

})();`,gb=()=>`(() => {
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
})();`,Qo=e=>{let t=Ug({installed:e.installed}),r=e.flashError?`<div class="alert-error">${Ve(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ve(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':fb(e.reveal),o=e.reveal?.scanRoots[0]?.trim()??"",s=o.length>0&&e.scanFolder.trim()===o,i=!e.importSectionExpanded,a=i?`<section class="card">
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
    <script>${pb()}</script>
    <script>${gb()}</script>`;return`${t}${r}${a}${c}`},fb=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let u=Bg(a.items.map(v=>({...v,relativePath:typeof v.relativePath=="string"&&v.relativePath.length>0?v.relativePath:Kg.default.relative(a.sourceRoot,v.sourcePath).replaceAll("\\","/")}))),m=Ca(u,Ve),y=a.items.length;return`<div class="harness-set-block">
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
    </form>`},qg=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let u=Number.parseInt(c[1]??"",10),m=a.trim();Number.isFinite(u)&&m.length>0&&o.set(u,m)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),u=c===null?null:Number.parseInt(c,10),m=u!==null&&Number.isFinite(u)?o.get(u):void 0,y=e.get(`setName-${i}`)?.trim()??m??a,v=t.sets[i];if(v===void 0)continue;let A=a.length>0?a:v.proposedSlug,f=y.length>0?y:v.proposedName,l=r.size===0||r.has(i),_=v.items.map(h=>({id:h.id,kind:h.kind,title:h.title,sourcePath:h.sourcePath,include:l}));s.push({slug:A,name:f,items:_})}return s}});var sn,Pa,Yg,Xg,hb,es,yb,Zg,Ta,Qg=d(()=>{"use strict";sn=g(require("node:fs")),Pa=g(require("node:path")),Yg=require("node:crypto");Ro();Xg=e=>Pa.default.join(e.harnessRootDir,"projects-registry.json"),hb=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),es=e=>{let t=Xg(e);if(!sn.default.existsSync(t))return[];try{let r=JSON.parse(sn.default.readFileSync(t,"utf8"));return hb(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string"):[]}catch{return[]}},yb=(e,t)=>{sn.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};sn.default.writeFileSync(Xg(e),`${JSON.stringify(r,null,2)}
`)},Zg=(e,t)=>{let r=pt(t.projectFolderPath),n=t.name?.trim()||Pa.default.basename(r)||"Project",o=es(e),s=o.find(a=>pt(a.projectFolderPath)===r);if(s!==void 0)return s;let i={id:(0,Yg.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return yb(e,[...o,i]),i},Ta=(e,t)=>es(e).find(r=>r.id===t)??null});var ef,tf=d(()=>{"use strict";ef=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var ts,Ia,an,Ab,Ee,rs,tr=d(()=>{"use strict";ts=g(require("node:fs")),Ia=g(require("node:os")),an=g(require("node:path")),Ab=()=>ts.default.realpathSync(an.default.resolve(Ia.default.homedir())),Ee=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?an.default.join(Ia.default.homedir(),t.slice(1)):t,n;try{n=ts.default.realpathSync(an.default.resolve(r))}catch{return null}let o=Ab();return n===o||n.startsWith(`${o}${an.default.sep}`)?n:null},rs=e=>{let t=Ee(e);if(t===null)return null;try{if(!ts.default.statSync(t).isFile())return null}catch{return null}return t}});var oe,rr,ln,Sb,_b,bb,rf,nf=d(()=>{"use strict";oe=g(require("node:fs")),rr=g(require("node:path"));Ro();Gr();tf();tr();ln=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sb=e=>{if(!oe.default.existsSync(e))return null;try{let t=JSON.parse(oe.default.readFileSync(e,"utf8"));if(ln(t)&&t.version===1)return t}catch{return null}return null},_b=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?rr.default.join(e.harnessRootDir,n):rr.default.join(e.harnessSetsDir,t,n);if(!oe.default.existsSync(o))return null;try{if(!oe.default.statSync(o).isFile())return null}catch{return null}return o},bb=(e,t)=>{let r={};if(oe.default.existsSync(e))try{let o=JSON.parse(oe.default.readFileSync(e,"utf8"));ln(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};oe.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},rf=e=>{let t=[...new Set(e.setSlugs.map(m=>m.trim()).filter(m=>m.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=pt(e.projectFolderPath),n=Ee(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=oe.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Sb(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let i=ln(s.sets)?s.sets:{},a=rr.default.join(n,".cursor"),c=0;for(let m of t){let y=i[m];if(!ln(y))return{ok:!1,errorMessage:`Harness set "${m}" is not installed locally.`};let v=Array.isArray(y.items)?y.items:[];for(let A of v){if(!ln(A))continue;let f=typeof A.path=="string"?A.path.trim():"";if(f.length===0)continue;let l=ef(f);if(l===null)continue;let _=_b(e.layout,m,f);if(_===null)continue;let h=rr.default.join(a,l);oe.default.mkdirSync(rr.default.dirname(h),{recursive:!0}),oe.default.copyFileSync(_,h),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let u=we({projectFolderPath:n});return bb(u.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var ze,Na,of=d(()=>{"use strict";ze=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Na=e=>{let t=e.flashError?`<div class="alert-error">${ze(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ze(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
    </section>`}});var ns,sf,af=d(()=>{"use strict";ns=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sf=e=>{let t=e.flashError?`<div class="alert-error">${ns(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ns(e.flashMessage)}</div>`:"",r=e.projects.length===0?'<p class="empty">No projects yet. Add a repo folder to link harness sets and run tasks in context.</p>':`<ul class="project-list">${e.projects.map(n=>`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${ns(n.name)}</strong>
                  <span class="muted mono">${ns(n.projectFolderPath)}</span>
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
    </section>`}});var Oa,Ma,lf=d(()=>{"use strict";Oa=g(require("node:fs"));Br();Ma=e=>{let t=je(e);if(!Oa.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse(Oa.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var Da,Ha,nr,cf=d(()=>{"use strict";Da=g(require("node:fs")),Ha=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nr=e=>{if(!Da.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Da.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Ha(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=Ha(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!Ha(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,u=typeof i.updatedAt=="string"?i.updatedAt:"",m=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:m.length,updatedAt:u}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Fa,df=d(()=>{"use strict";Fa=()=>"~"});var uf,Ua,mf=d(()=>{"use strict";uf=require("node:child_process"),Ua=()=>{if(process.platform!=="darwin")return null;try{let t=(0,uf.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var pf,gf,ff=d(()=>{"use strict";pf=require("node:crypto"),gf=e=>`local-${(0,pf.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var ja,hf=d(()=>{"use strict";ja=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var cn,os,$a=d(()=>{"use strict";cn=g(require("node:path")),os=e=>{let t=cn.default.dirname(e),r=cn.default.basename(t);return r==="agents"?cn.default.basename(cn.default.dirname(t)):r}});var dn,ke,yf,vb,wb,Wb,ss,Af,Ba=d(()=>{"use strict";dn=g(require("node:fs")),ke=g(require("node:path"));ff();hf();$a();yf=new Set(["node_modules",".git","dist","build",".next","coverage"]),vb=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},wb=(e,t)=>{let r=ke.default.basename(t);if(e==="skill"){let n=t.split(ke.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Wb=e=>{let t=[],r=(o,s)=>{let i;try{i=dn.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&yf.has(a.name))continue;let c=ke.default.join(o,a.name),u=s?ke.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,u);continue}if(!a.isFile())continue;ja(u.replaceAll("\\","/"))!==null&&t.push({relativePath:u,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=ke.default.join(e,o);dn.default.existsSync(s)&&r(s,o)}let n=ke.default.join(e,"skills");return dn.default.existsSync(n)&&r(n,"skills"),t},ss=e=>{let t=Wb(e);if(t.length===0)return null;let r=ke.default.dirname(e),n=os(e),o=vb(n),s=t.map(i=>{let a=ja(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:gf(i.absolutePath),kind:a,title:wb(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},Af=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=dn.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||yf.has(a.name))continue;let c=ke.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var Sf,Ga,Eb,_f,bf=d(()=>{"use strict";Sf=g(require("node:fs")),Ga=g(require("node:path"));Ba();tr();Eb=e=>{let t=Ee(e.trim());if(t===null)return null;if(Ga.default.basename(t)===".cursor")return t;let r=Ga.default.join(t,".cursor");try{if(Sf.default.statSync(r).isDirectory())return Ee(r)}catch{return null}return null},_f=e=>{let t=Eb(e.projectPath);if(t===null)return null;let r=ss(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var vf,kb,is,wf,Wf=d(()=>{"use strict";vf=g(require("node:path"));Ba();tr();$a();kb=5,is=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},wf=e=>{let t=Ee(e.scanRoot.trim());if(t===null)return is(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of Af(t,kb,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Ee(s);if(i===null)continue;let a=os(i);is(e.response,"folder",{cursorDir:i,groupName:a,repoPath:vf.default.dirname(i)});let c=ss(i);c!==null&&(r.push(c),is(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(u=>u.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return is(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var Ef,kf,Lf=d(()=>{"use strict";Ef=g(require("node:path")),kf=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Ef.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var U,xf,Va,Lb,Rf,za,Ka,Cf,as,Pf=d(()=>{"use strict";U=g(require("node:fs")),xf=g(require("node:os")),Va=g(require("node:path"));ni();tr();Lf();Lb=e=>{if(!U.default.existsSync(e))return null;try{let t=JSON.parse(U.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Rf=e=>{let t=e.hostname??xf.default.hostname(),r=Lb(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(m=>m.include);if(a.length===0)continue;let c=[];for(let m of a){let y=rs(m.sourcePath);if(y===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${m.sourcePath}`};let v=U.default.readFileSync(y,"utf8");c.push({id:m.id,kind:m.kind,title:m.title,content:v,setSlugs:[i.slug]})}let u=oo({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=u.manifest;for(let m of u.directories)o.add(m);for(let m of u.files)s.push(m),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{U.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)U.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Va.default.join(e.layout.harnessRootDir,i.relativePath);U.default.mkdirSync(Va.default.dirname(a),{recursive:!0}),U.default.writeFileSync(a,i.content)}return U.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},za="reveal-cache.json",Ka=(e,t)=>{U.default.mkdirSync(e.harnessRootDir,{recursive:!0}),U.default.writeFileSync(`${e.harnessRootDir}/${za}`,`${JSON.stringify(t,null,2)}
`)},Cf=e=>{let t=`${e.harnessRootDir}/${za}`;U.default.existsSync(t)&&U.default.unlinkSync(t)},as=e=>{let t=`${e.harnessRootDir}/${za}`;if(!U.default.existsSync(t))return null;try{let r=JSON.parse(U.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return kf(r)}catch{return null}return null}});var Tf,If=d(()=>{"use strict";Tf=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Ke,Nf,xb,Of,qa,Mf=d(()=>{"use strict";Ke=g(require("node:fs")),Nf=g(require("node:path")),xb=256e3,Of=e=>{Ke.default.mkdirSync(Nf.default.dirname(e),{recursive:!0}),Ke.default.writeFileSync(e,"","utf8")},qa=(e,t=xb)=>{if(!Ke.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Ke.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Ke.default.openSync(e,"r");try{Ke.default.readSync(a,i,0,s,o)}finally{Ke.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let u=c.indexOf(`
`);u>=0&&(c=c.slice(u+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var Hf,Df,Ja,Ff,Uf=d(()=>{"use strict";Hf=require("node:crypto"),Df=g(require("node:fs"));br();Xn();tt();st();Ja=!1,Ff=async e=>{if(Ja)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!H(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=F();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Tt({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&Df.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,Hf.randomUUID)();Ja=!0;try{if(await Lc(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Nt(r,e.writerAgent,t);return await zn(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Ja=!1}}});var ls,jf,$f=d(()=>{"use strict";ls=g(require("node:fs"));Bs();jf=(e,t)=>{let r=qn(e);ls.default.mkdirSync(e,{recursive:!0}),ls.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{ls.default.chmodSync(r,384)}catch{}}});var un,Rb,Ya,Bf,Gf=d(()=>{"use strict";un=g(require("node:fs"));nt();$f();He();Rb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ya=(e,t,r,n)=>{let o=r?.trim()??"",s=n?.trim()??"",i=e[t];if(o.length===0&&s.length===0)return e;let a=o.length>0?o:i?.apiKey;if(a===void 0||a.length===0)return e;let c=s.length>0?s:i?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Bf=e=>{let t=Q(e.configPath),r={};if(un.default.existsSync(e.configPath))try{let o=JSON.parse(un.default.readFileSync(e.configPath,"utf8"));Rb(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,un.default.mkdirSync(t,{recursive:!0}),un.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=Ya(Ya(Ya(rt(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);jf(t,n)}});var Vf,cs,Xa=d(()=>{"use strict";Vf=g(require("node:path"));qs();Js();st();Rt();x();cs=e=>{let t=F()?.layout.installDir??w();if(Vf.default.basename(t)===Zn)return zs;let r=F(),n=r!==null?Z(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):zs}});var zf,Kf=d(()=>{"use strict";Ze();Pt();Xa();zf=async e=>{let t=G(e.installDir),r=t?.bundleVersion??null,n=cs(t);try{let o=await Is(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Hn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var qf,Jf=d(()=>{"use strict";qf=e=>!e});var Yf,Xf,Zf=d(()=>{"use strict";Aa();Yf=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Xf=async()=>{let e=await zo({force:!0});if(e.ok)return{ok:!0,message:Yf(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:Yf(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Pt(),jn)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var eh,mn,th,Qa,Qf,Cb,Za,D,el,N,K,or,Pb,Tb,rh,nh,oh=d(()=>{"use strict";eh=g(require("node:http")),mn=g(require("node:fs")),th=g(require("node:path"));dg();Vo();Jo();mg();ka();xr();Dt();Zo();vg();Wg();xg();Cg();Tg();Ng();Fg();Jg();Qg();nf();of();af();lf();cf();df();mf();bf();tr();Wf();Pf();Gr();If();Mf();Ze();Uf();st();Gf();nt();ot();He();Xa();Kf();Jf();Zf();_a();Qa=e=>bg(e)??"never",Qf=48e3,Cb=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0?!0:nr(e).sets.length===0,Za=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Fa(),reveal:t.reveal,installed:nr(e),flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),D=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),el={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},N=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...el}),e.end(JSON.stringify(r))},K=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},or=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Pb=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${D(e.status.wakeError)}</div>`:"",o=qf(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Xo(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${D(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${D(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${D(Qa(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${D(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},Tb=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},rh=e=>{let t=th.default.join(e.layout.installDir,"link-code.txt"),r=()=>G(e.layout.installDir),n=()=>{let A=r();return{installBundleVersion:Tf(A),installBundleUpdatedAt:A?.updatedAt??null,installVersion:A}},o=async A=>{let f=A.installVersion??r(),l=await i(),_=kg(l),h=Lg(A.updateFlash??null);return Dg({title:A.title,activePath:A.activePath,body:A.body,cloudAppOrigin:cs(f),prependBody:`${h}${_}`,headerUpdateButtonHtml:Eg(l)})},s=null,i=async()=>{let A=Date.now();if(s!==null&&A-s.cachedAtMs<6e4)return s.offer;let f=await zf(e.layout);return s={cachedAtMs:A,offer:f},f},a=()=>{s=null},c=!1,u=()=>{c||(c=!0,Xf().catch(A=>{console.error("[agent-witch-local-app] install bundle update failed:",A)}).finally(()=>{c=!1,a()}))},m=async A=>{if(a(),!(await i()).updateAvailable){A.writeHead(303,{Location:"/?update=ok"}),A.end();return}A.writeHead(303,{Location:"/?update=started"}),A.end(),u()},y=()=>{if(mn.default.existsSync(t))return mn.default.readFileSync(t,"utf8").trim();let A=Math.random().toString(36).slice(2,8).toUpperCase();return mn.default.writeFileSync(t,A,"utf8"),A},v=eh.default.createServer((A,f)=>{(async()=>{let l=A.url?.split("?")[0]??"/",_=A.method??"GET";if(_==="OPTIONS"){f.writeHead(204,el),f.end();return}if(_==="GET"&&l==="/health"){let h=e.controllers.getStatus(),p=n();N(f,200,{ok:!0,...h,installBundleVersion:p.installBundleVersion,installBundleUpdatedAt:p.installBundleUpdatedAt});return}if(_==="GET"&&l==="/api/status"){let h=n();N(f,200,{...e.controllers.getStatus(),linkCode:y(),installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(_==="GET"&&l==="/api/traffic"){N(f,200,{entries:Go(e.layout)});return}if(_==="DELETE"&&l==="/api/traffic"){Lp(e.layout),N(f,200,{ok:!0});return}if(_==="GET"&&l==="/api/trace"){N(f,200,{entries:Ea(e.layout)});return}if(_==="DELETE"&&l==="/api/trace"||_==="POST"&&l==="/api/trace/clear"){if(sg(e.layout),_==="POST"){f.writeHead(303,{Location:"/status"}),f.end();return}N(f,200,{ok:!0});return}if(_==="POST"&&l==="/api/errors/clear"){Of(e.layout.errorLogPath),f.writeHead(303,{Location:"/errors"}),f.end();return}if(_==="GET"&&l==="/api/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(p.length>0){let S=await on({layout:e.layout,query:p,limit:20});N(f,200,{chunks:S,query:p});return}N(f,200,{chunks:nn(e.layout).slice(-50).reverse()});return}if(_==="POST"&&l==="/api/revive"){e.controllers.reviveWebSocket(),N(f,200,{ok:!0});return}if(_==="GET"&&l==="/api/update-status"){let h=await i();N(f,200,{ok:!0,...h});return}if((_==="GET"||_==="POST")&&l==="/api/update"){await m(f);return}if(_==="GET"&&l==="/"){let h=e.controllers.getStatus(),p=n(),S=nr(e.layout),b=qa(e.layout.errorLogPath);K(f,await o({title:"Home",activePath:"/",installVersion:p.installVersion,updateFlash:Tb(A.url??void 0),body:Rg({wsConnected:h.wsConnected,lastHeartbeatAt:h.lastHeartbeatAt,installBundleVersion:p.installBundleVersion,harnessSetCount:S.sets.length,knowledgeChunkCount:nn(e.layout).length,trafficEntryCount:Go(e.layout).length,wakeError:h.wakeError,errorLogByteSize:b.byteSize,errorLogExists:b.exists})}));return}if(_==="GET"&&l==="/task"){let h=e.controllers.getStatus(),p=n(),S=F(),b=new URL(A.url??"/",`http://127.0.0.1:${43347}`),W=b.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=b.searchParams.get("failed")==="1"?b.searchParams.get("error")?.trim()??"Task failed.":null,R=b.searchParams.get("runId");K(f,await o({title:"Task",activePath:"/task",installVersion:p.installVersion,body:Pg({defaultWorkspace:S?.workspace??"",wsConnected:h.wsConnected,flashMessage:W,flashError:k,lastRunId:R})}));return}if(_==="POST"&&l==="/task/dispatch"){let h=await or(A),p=new URLSearchParams(h),S=p.get("prompt")?.trim()??"",b=p.get("writerAgent")?.trim()??"claude-cli",W=p.get("projectFolder")?.trim()??"",k=await Ff({prompt:S,writerAgent:b,...W.length>0?{projectFolderPath:W}:{}}),R=new URLSearchParams;k.ok?R.set("ok","1"):(R.set("failed","1"),k.errorMessage!==void 0&&R.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&R.set("runId",k.agentRunId),f.writeHead(303,{Location:`/task?${R.toString()}`}),f.end();return}if(_==="GET"&&l==="/errors"){let h=n(),p=qa(e.layout.errorLogPath);K(f,await o({title:"Errors",activePath:"/errors",installVersion:h.installVersion,body:wg({errorLogPath:e.layout.errorLogPath,content:p.content,exists:p.exists,truncated:p.truncated,byteSize:p.byteSize})}));return}if(_==="GET"&&l==="/status"){let h=e.controllers.getStatus(),p=te(e.layout),S=ce(p,le),b=n();K(f,await o({title:"Status",activePath:"/status",installVersion:b.installVersion,body:`${Pb({status:h,stale:S,linkCode:y(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt})}${ug({entries:Ea(e.layout)})}`}));return}if(_==="GET"&&l==="/traffic"){let h=Go(e.layout),p=n(),S=h.map(W=>`<tr><td title="${D(W.at)}">${D(Qa(W.at))}</td><td>${D(W.direction)}</td><td><code>${D(W.type)}</code></td><td>${D(W.summary)}</td><td>${D(W.action??"")}</td></tr>`).join(""),b=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${S}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';K(f,await o({title:"Traffic",activePath:"/traffic",installVersion:p.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${b}
            </section>`}));return}if(_==="GET"&&l==="/projects"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),S=h.searchParams.get("added")==="1"?"Project added.":null;K(f,await o({title:"Projects",activePath:"/projects",installVersion:p.installVersion,body:sf({projects:es(e.layout),flashMessage:S})}));return}if(_==="GET"&&l==="/project"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=h.searchParams.get("id")?.trim()??"",S=Ta(e.layout,p);if(S===null){f.writeHead(404),f.end("Project not found");return}let b=n(),W=h.searchParams.get("linked")==="1"?`Harness linked (${h.searchParams.get("files")??"0"} file(s) written).`:null;K(f,await o({title:S.name,activePath:"/projects",installVersion:b.installVersion,body:Na({project:S,installed:nr(e.layout),linkedSetSlugs:Ma(S.projectFolderPath),flashMessage:W})}));return}if(_==="POST"&&l==="/projects/add"){let h=Ua();if(h===null){f.writeHead(303,{Location:"/projects"}),f.end();return}we({projectFolderPath:h}),Zg(e.layout,{projectFolderPath:h}),f.writeHead(303,{Location:"/projects?added=1"}),f.end();return}if(_==="POST"&&l==="/projects/link-harness"){let h=await or(A),p=new URLSearchParams(h),S=p.get("projectId")?.trim()??"",b=Ta(e.layout,S);if(b===null){f.writeHead(404),f.end("Project not found");return}let W=p.getAll("applySet").map(R=>String(R)),k=rf({layout:e.layout,projectFolderPath:b.projectFolderPath,setSlugs:W});if(!k.ok){let R=n();K(f,await o({title:b.name,activePath:"/projects",installVersion:R.installVersion,body:Na({project:b,installed:nr(e.layout),linkedSetSlugs:Ma(b.projectFolderPath),flashError:k.errorMessage})}));return}f.writeHead(303,{Location:`/project?id=${encodeURIComponent(b.id)}&linked=1&files=${k.writtenFileCount}`}),f.end();return}if(_==="GET"&&l==="/harness"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),S=as(e.layout),b=h.searchParams.get("submitted")==="1",W=b?h.searchParams.get("syncFailed")==="1"?`Local harness updated (${h.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:h.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${h.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":h.searchParams.get("stopped")==="1"?`Reveal stopped. ${S?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:h.searchParams.get("revealed")==="1"?`Reveal found ${S?.sets.length??0} set(s).`:null,k=S?.scanRoots[0]??Fa(),R=Cb(e.layout,{reveal:S,importQuery:h.searchParams.get("import")==="1",justSubmitted:b});K(f,await o({title:"Harness",activePath:"/harness",installVersion:p.installVersion,body:Qo(Za(e.layout,{reveal:S,scanFolder:k,flashMessage:W,importSectionExpanded:R}))}));return}if(_==="POST"&&l==="/api/harness/pick-folder"){let h=Ua();if(h===null){N(f,200,{cancelled:!0});return}N(f,200,{path:h});return}if(_==="GET"&&l==="/api/harness/file-content"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",S=rs(p);if(S===null){N(f,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let b=mn.default.readFileSync(S,"utf8"),W=b.length>Qf?`${b.slice(0,Qf)}
\u2026 (truncated)`:b;N(f,200,{content:W})}catch{N(f,500,{errorMessage:"Could not read file."})}return}if(_==="POST"&&l==="/api/harness/reveal/add-project"){let h=await or(A),p="";try{let W=JSON.parse(h);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(p=W.projectPath.trim())}catch{N(f,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(p.length===0){N(f,400,{ok:!1,errorMessage:"projectPath is required."});return}let S=as(e.layout),b=_f({reveal:S,projectPath:p});if(b===null||b.sets.length===0){N(f,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Ka(e.layout,b),N(f,200,{ok:!0,setCount:b.sets.length});return}if(_==="GET"&&l==="/api/harness/reveal/stream"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(p.length===0){N(f,400,{errorMessage:"Choose a folder to scan first."});return}let S=!1;A.on("close",()=>{S=!0}),f.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...el});let b=wf({scanRoot:p,response:f,shouldAbort:()=>S});Ka(e.layout,b),f.end();return}if(_==="POST"&&l==="/harness/reveal"){f.writeHead(410,{"Content-Type":"text/plain"}),f.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(_==="POST"&&l==="/harness/submit"){let h=as(e.layout);if(h===null){let se=n();K(f,await o({title:"Harness",activePath:"/harness",installVersion:se.installVersion,body:Qo(Za(e.layout,{reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let p=await or(A),S=new URLSearchParams(p),b=qg(S,h),W=Rf({layout:e.layout,sets:b});if(!W.ok){let se=n();K(f,await o({title:"Harness",activePath:"/harness",installVersion:se.installVersion,body:Qo(Za(e.layout,{reveal:h,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Cf(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";f.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${R}`}),f.end();return}if(_==="GET"&&l==="/writer-api"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),S=F()?.writerExecutionBackend??V(void 0),b=Q(e.layout.configPath),W=rt(b),k=h.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();K(f,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:Ig({writerExecutionBackend:S,secrets:W,flashMessage:k})}));return}if(_==="POST"&&l==="/writer-api"){let h=await or(A),p=new URLSearchParams(h),S=p.get("writerExecutionBackend")?.trim()??"cli";Bf({configPath:e.layout.configPath,writerExecutionBackend:V(S),anthropicApiKey:p.get("anthropicApiKey")??void 0,anthropicModel:p.get("anthropicModel")??void 0,openaiApiKey:p.get("openaiApiKey")??void 0,openaiModel:p.get("openaiModel")??void 0,googleApiKey:p.get("googleApiKey")??void 0,googleModel:p.get("googleModel")??void 0}),f.writeHead(303,{Location:"/writer-api?saved=1"}),f.end();return}if(_==="GET"&&l==="/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",S=n(),W=(p.length>0?await on({layout:e.layout,query:p,limit:20}):nn(e.layout).slice(-50).reverse()).map(k=>`<article class="card"><div class="muted" title="${D(k.createdAt)}">${D(Qa(k.createdAt))}${k.source?` \xB7 ${D(k.source)}`:""}</div><pre>${D(k.text)}</pre></article>`).join("");K(f,await o({title:"Knowledge",activePath:"/knowledge",installVersion:S.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${D(p)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${W||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}_==="POST"&&await or(A),f.writeHead(404),f.end("Not found")})().catch(l=>{console.error("[agent-witch-local-app]",l),f.writeHead(500),f.end("Internal error")})});return v.on("error",A=>{if(A.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",A)}),v.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${cg}`)}),v},nh=e=>Sa(e).publicKeyRaw});var pn,tl,sh,ih,ah,lh,ch=d(()=>{"use strict";pn=g(require("node:fs")),tl=g(require("node:path"));Lt();Br();sh=(e,t)=>tl.default.join(je(t).memoryDirPath,Cn),ih=(e,t)=>{let r=sh(e,t);if(!pn.default.existsSync(r))return[];let n=pn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},ah=e=>{let t=sh(e.layout,e.projectFolderPath);pn.default.mkdirSync(tl.default.dirname(t),{recursive:!0}),pn.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},lh=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var dh,Ib,Nb,Ob,uh,mh=d(()=>{"use strict";dh=g(require("node:os"));x();Ib="Default",Nb=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),Ob=e=>{let t=dh.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},uh=()=>{let e=L(),t=Al(e),r=Nb(Ib);return`${Ob(t)}/${r.length>0?r:"project"}`}});var ph,Mb,gh,fh=d(()=>{"use strict";ph=require("node:child_process");Uo();tt();wr();nt();He();ot();Mb=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,ph.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},gh=async e=>{if(!H(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&V(e.runConfig.writerExecutionBackend)==="api"){let r=Oe(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=Q(e.layout.configPath),o=Me(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Be(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await Mb(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var hh,yh=d(()=>{"use strict";hh=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var Ah,Sh,_h=d(()=>{"use strict";Ah=require("node:crypto"),Sh=()=>(0,Ah.randomUUID)()});var gn,Hb,bh,ds=d(()=>{"use strict";gn="[[WORKING_ESTIMATE]]",Hb=["Put this marker on its own line:",gn,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),bh=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",Hb,"","Task to estimate:",e.trim()].join(`
`)});var vh,wh=d(()=>{"use strict";vh=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Wh,Eh=d(()=>{"use strict";Wh=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var Db,kh,Lh=d(()=>{"use strict";ds();Db=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,kh=e=>{if(!e.includes(gn))return null;let t=null;for(let r of e.matchAll(Db)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var xh,Rh=d(()=>{"use strict";Xn();ds();wh();Eh();Lh();ur();xh=async e=>{let t=vh(e.wrappedPrompt),r=bh(t),n=await Nt(e.config,e.writerAgent,r),o=kh(n.output),s=Wh(o);return dr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:ae.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var Ch={};qe(Ch,{buildContinuationPromptWithContext:()=>jb});var Fb,Ub,jb,Ph=d(()=>{"use strict";Fb=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Ub=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),jb=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=Ub(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${Fb(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var Th={};qe(Th,{readHarnessExportSets:()=>Bb});var fn,rl,us,$b,Bb,Ih=d(()=>{"use strict";fn=g(require("node:fs")),rl=g(require("node:path"));x();us=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$b=e=>{if(!fn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(fn.default.readFileSync(e.harnessManifestPath,"utf8"));if(us(t))return t}catch{return null}return null},Bb=(e,t)=>{let r=L(t),n=$b(r);if(n===null)return[];let o=us(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!us(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],u=[];for(let m of c){if(!us(m))continue;let y=typeof m.path=="string"?m.path:void 0,v=typeof m.id=="string"?m.id:"",A=typeof m.kind=="string"?m.kind:"",f=typeof m.title=="string"?m.title:"";if(y===void 0||v.length===0||A.length===0||f.length===0)continue;let l=y.startsWith("shared/")?rl.default.join(r.harnessRootDir,y):rl.default.join(r.harnessSetsDir,i,y);fn.default.existsSync(l)&&u.push({id:v,kind:A,title:f,content:fn.default.readFileSync(l,"utf8")})}u.length>0&&s.push({name:a.name,slug:i,items:u})}return s}});var Uh={};qe(Uh,{startAgentWitchClient:()=>nv});var sl,hn,sr,ov,Gb,Vb,zb,Kb,Nh,qb,Oh,Mh,Hh,nl,P,Dh,I,ol,Jb,ms,Yb,Xb,Zb,Qb,ev,tv,rv,Fh,nv,jh=d(()=>{"use strict";sl=require("node:child_process"),hn=g(require("node:fs")),sr=g(require("node:os"));Fu();xn();Cs();Es();Zi();Ye();zu();Ju();Am();Mt();x();Wp();br();Ho();ma();Uo();tt();ia();xr();Dt();Mo();kp();Pp();Ze();Ip();Mp();_a();Vo();Jo();lg();oh();ka();ch();Rt();mh();Gr();fh();Ls();Mn();bt();Tn();yh();_h();ds();ur();Rh();Xs();ot();ov={},Gb="claude",Vb="codex",zb="cursor",Kb="agy",Nh=3e4,qb=3e4,Oh=new Map,Mh=new Map,Hh=new Map,nl=e=>{let t=e?.trim()??"";return t.length>0?t:uh()},P=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dh=e=>{let t=L(e);if(!hn.default.existsSync(t.configPath))return null;try{let r=JSON.parse(hn.default.readFileSync(t.configPath,"utf8"));if(!P(r))throw new Error("Config must be a JSON object.");let n=typeof r.wsUrl=="string"?r.wsUrl.trim():"",o=Qn({installDir:t.installDir,configWsUrl:n}),s=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),i=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??Gb,a=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??Vb,c=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??zb,u=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??Kb,m=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",y=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return m.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:y,wsUrl:o,workspace:s,claudeCommand:i,codexCommand:a,cursorCommand:c,antigravityCommand:u,pairingToken:m,writerExecutionBackend:V(r.writerExecutionBackend),layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},I=(e,t,r)=>{e.readyState===Dr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(St(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Wa(r,"out",t)))},ol=e=>e,Jb=e=>{if(!hn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(hn.default.readFileSync(e.harnessManifestPath,"utf8"));if(P(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},ms=(e,t)=>{let r=Jb(t);r!==null&&I(e,{type:"harness.manifest.report",payload:{hostname:sr.default.hostname(),manifest:r}})},Yb=async(e,t,r,n,o,s,i=!1,a,c,u,m)=>{if(!H(t)){I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let y=$o(t)&&!cp(t);if(y){try{await Be(e.layout.installDir,t)}catch(S){let b=S instanceof Error?S.message:String(S);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}jo(t)}else if(!$o(t))try{await Be(e.layout.installDir,t)}catch(S){let b=S instanceof Error?S.message:String(S);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let v=i&&lp(t)&&dp(t)?"continue":"first",A=r;if(i&&v==="first"&&typeof c=="string"&&c.length>0){let S=No(e.layout,c);if(S!==null){let{buildContinuationPromptWithContext:b}=await Promise.resolve().then(()=>(Ph(),Ch));A=b({priorPrompt:S.prompt,priorOutput:S.resultOutput??"",userMessage:r})}}let f=nl(u);we({projectFolderPath:f});let l=await on({layout:e.layout,query:A,limit:5,projectFolderPath:f}),_=ih(e.layout,f),h=`${lh(_)}${hg(l)}${A}`,p=m?.trim()??(s!==void 0&&f.trim().length>0?Sh():void 0);if(s!==void 0&&p!==void 0&&p.length>0&&f.trim().length>0){Nn({reportKey:p,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let S=await xh({config:e,writerAgent:t,wrappedPrompt:h,reportKey:p,agentRunId:s});if(S.estimateSeconds!==null){let b=`${gn}
${S.estimateSeconds}
`;$e(s)?I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:b},requestId:n}):ht(s,b)}h=hh(h,S),h=jl(h,{agentRunId:s,reportKey:p,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}fa(e,t,h,n,ol(o),s,{sessionTurn:v},a,f,p),y&&s!==void 0&&I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:mp(t)},requestId:n})},Xb=async(e,t,r,n,o)=>{let s=(i,a)=>{I(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await pp({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:m=>{i+=m,I(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:m},requestId:n})}}),c=H(t)?t:"claude-cli",u=a.exitCode!==0?a.output:i.length>0?Xr(c):a.output;s(u,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Zb=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=It(t,r,Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,sl.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),Qb=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(I(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!H(o)){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let i=await(async()=>{try{await Be(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return Zb(e,o,s)})();I(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),ms(n,e.layout)},ev=e=>{let t=1e3*2**e;return Math.min(qb,t)},tv=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,Ep().then(_=>{if(_.ok){console.log("[agent-witch] Local restart completed.");return}if(!_.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",_.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,_="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,Cp({layout:e.layout,remoteBundleVersion:l,trigger:_}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=te(e.layout);l!==null&&ce(l,le)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),A())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let l=t.socket;t.socket=void 0,t.wsConnected=!1,l.removeAllListeners("open"),l.removeAllListeners("message"),l.removeAllListeners("close"),l.on("error",()=>{}),(l.readyState===Dr.OPEN||l.readyState===Dr.CONNECTING)&&l.close()},u=()=>{i(),t.localHealthTimer=setInterval(o,Nh)},m=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=ev(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},l)},y=l=>{s();let _=()=>{let h=G(e.layout.installDir)?.bundleVersion??null,p=ee();I(l,{type:"agent.heartbeat",payload:{hostname:sr.default.hostname(),macOsUsername:sr.default.userInfo().username,wakeError:t.wakeError,wakePort:p,...e.email!==null?{email:e.email}:{},...h!==null?{installBundleVersion:h}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};_(),t.heartbeatTimer=setInterval(_,Nh)},v=(l,_)=>{if(typeof l.type!="string")return;St(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"}),Wa(e.layout,"in",l);let h=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&P(l.payload)){let p=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",S=typeof l.payload.origin=="string"?l.payload.origin:"",b=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",W=typeof l.payload.challenge=="string"?l.payload.challenge:"",k=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!zp({serverPublicKey:p,origin:S,devicePublicKey:b,challenge:W,serverAttestation:k})){t.wakeError="Server attestation verification failed",St(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&P(l.payload)){let p=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";St(e.layout,{direction:"local",type:"writer.ensure",summary:p,action:"ensure-writer"}),gh({layout:e.layout,writerAgent:p,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(S=>{I(_,{type:"writer.status",payload:S},e.layout)})}if(l.type==="install.bundle.update"&&P(l.payload)){let p=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";p.length>0&&n(p,"install.bundle.update")}if(l.type==="system.ack"){ai(e.layout,{wsUrl:e.wsUrl});let p=P(l.payload)?l.payload:null,S=Tp(p);S!==null&&n(S)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&P(l.payload)&&Np(l.payload),l.type==="automations.run"&&P(l.payload)&&Op(l.payload),l.type==="terminal.stream.accepted"&&P(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"";if(p.length>0){let S=Um(p);for(let b of S)I(_,{type:"terminal.stream.chunk",payload:{runId:p,chunk:b},requestId:h})}}if(l.type==="agent.agentRun.list"&&I(_,{type:"dashboard.agentRun.list.result",payload:{runs:Pm(e.layout)},requestId:h}),l.type==="agent.agentRun.get"&&P(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"",S=p.length>0?No(e.layout,p):null;I(_,{type:"dashboard.agentRun.get.result",payload:{run:S},requestId:h})}if(l.type==="command.claude.run"&&P(l.payload)){let p=l.payload.prompt,S=typeof l.payload.writerAgent=="string"&&H(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",b=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,W=l.payload.sessionContinuation===!0,k=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,R=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,se=nl(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),ir=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof p=="string"&&p.trim().length>0&&(console.log(`[agent-witch] Running ${S} task (${W?"continue":"first"})\u2026`),b!==void 0&&R!==void 0&&Oh.set(b,R),b!==void 0&&(Mh.set(b,se),Hh.set(b,p.trim()),we({projectFolderPath:se})),Yb(e,S,p.trim(),h,_,b,W,R,k,se,ir))}if(l.type==="shell.session.open"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",S=typeof l.payload.cols=="number"?l.payload.cols:120,b=typeof l.payload.rows=="number"?l.payload.rows:32;p.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Xm({shellSessionId:p,cwd:e.workspace,cols:S,rows:b,send:W=>{I(_,W)},requestId:h}))}if(l.type==="shell.session.close"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";p.length>0&&Jr(p,S=>{I(_,S)},h)}if(l.type==="shell.input"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",S=typeof l.payload.data=="string"?l.payload.data:"";p.length>0&&S.length>0&&qm(p,S)}if(l.type==="shell.resize"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",S=typeof l.payload.cols=="number"?l.payload.cols:0,b=typeof l.payload.rows=="number"?l.payload.rows:0;p.length>0&&S>0&&b>0&&Jm(p,S,b)}if(l.type==="command.writer.session.end"&&P(l.payload)){let p=l.payload.writerAgent;typeof p=="string"&&H(p)&&up(p)}if(l.type==="command.writer.session.start"&&P(l.payload)){let p=l.payload.writerAgent,S=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof p=="string"&&H(p)&&S.length>0&&(console.log(`[agent-witch] Starting ${p} session\u2026`),Xb(e,p,S,h,_))}if(l.type==="command.claude.stop"&&P(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";p.length>0&&(console.log(`[agent-witch] Stopping run ${p}\u2026`),wp(e,ol(_),p,h))}if(l.type==="command.claude.input_respond"&&P(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",S=typeof l.payload.response=="string"?l.payload.response.trim():"",b=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",W=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",k=typeof l.payload.question=="string"?l.payload.question:"";p.length>0&&S.length>0&&b.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),bp(e,{agentRunId:p,originalPrompt:b,partialOutput:W,question:k,response:S,shellSessionId:Oh.get(p)},h,ol(_)))}if(l.type==="dispatch.approval.required"&&P(l.payload)){let p=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",S=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${p}: ${S}`),process.platform==="darwin"&&(0,sl.spawn)("osascript",["-e",`display notification "${S.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${p.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&P(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),Qb(e,l.payload,h,_)),l.type==="harness.export.request"&&P(l.payload)){let p=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",S=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,b=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(W=>typeof W=="string"):[];p.length>0&&b.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(Ih(),Th)),k=W(b,e.email);I(_,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:p,...S!==void 0?{targetDeviceId:S}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:h})})()}if(l.type==="harness.manifest.request"&&ms(_,e.layout),l.type==="command.claude.result"&&P(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,S=nl(p!==void 0?Mh.get(p):void 0),b=p!==void 0?Hh.get(p)??"":"";fg({layout:e.layout,text:l.payload.output,source:p??"command.claude.result",projectFolderPath:S}),b.trim().length>0&&ah({layout:e.layout,projectFolderPath:S,entry:{id:`${Date.now()}-${p??"run"}`,...p!==void 0?{agentRunId:p}:{},prompt:b,output:l.payload.output,createdAt:new Date().toISOString()}})}},A=()=>{if(t.stopped)return;a(),c();let l=new Dr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),ai(e.layout,{wsUrl:e.wsUrl}),yp(Tt({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Ap(e.layout);let _=Z(e.wsUrl)??"http://localhost:3000",h=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),p=Vp({layout:e.layout,origin:_,...h!==void 0&&h.length>0?{claimToken:h}:{}});I(l,{type:"agent.register",payload:{role:"agent",hostname:sr.default.hostname(),macOsUsername:sr.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...p}},e.layout),ms(l,e.layout),vp(e,l),y(l)}),l.on("message",_=>{let h=typeof _=="string"?_:_.toString("utf8");try{let p=JSON.parse(h);if(!P(p))return;v(p,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",(_,h)=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1;let p=typeof h=="string"?h:h.toString("utf8");Xt(e.layout,{kind:"ws_close",message:"WebSocket closed",code:_,reason:p}),console.log("[agent-witch] Disconnected from server."),m()}),l.on("error",_=>{t.wakeError=_.message,Xt(e.layout,{kind:"ws_error",message:_.message,stack:_.stack}),console.error(`[agent-witch] Socket error: ${_.message}`)})};return{connect:A,startLocalHealthCheck:u,stop:()=>{t.stopped=!0,s(),i(),a(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:nh(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(ms(l,e.layout),{ok:!0})}}},rv=async()=>{let e=()=>{let r=vl();if(r.length===0){let n=Dh(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=Dh(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},Fh=async()=>{kt("agent-witch"),Bu().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=w();qu(t);let r=Vu({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),Dn();let n=await rv(),o=n[0];o!==void 0&&ag(o.layout);let s=n.map(y=>tv(y)),i=s[0];i===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Xi(),process.exit(0));let a=()=>{n.forEach((y,v)=>{let A=te(y.layout);A!==null&&!ce(A,le)||s[v]?.reviveWebSocket()})},c=()=>{},u=await ym({reconnectWebSockets:a,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),c()}});rh({layout:n[0].layout,controllers:{getStatus:i.getStatus,reviveWebSocket:a,reportHarnessManifestIfConnected:i.reportHarnessManifestIfConnected}});for(let y of s)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Bridging ${s.length} account profile(s) in one process.`);let m=Ln(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),kn(),c()});c=()=>{m(),u.stop(),Xi(),console.log("[agent-witch] Shutting down.");for(let y of s)y.stop();process.exit(0)},process.on("SIGINT",()=>{c()}),process.on("SIGTERM",()=>{c()})},nv=Fh;if(xt(ov.url)&&!ie()){let e=process.argv.indexOf("report");e>=0&&process.exit(On(process.argv.slice(e))),Fh()}});xn();Ls();Mn();var Jl="20.x",Yl="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var Ay=e=>[`Node.js ${Jl} or newer is required (found ${e}).`,Yl].join(" "),Xl=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${Ay(process.version)}
`),process.exit(1))};var lv={},sv=async()=>{kt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Pt(),jn)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},iv=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(ki(),Nd)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},av=async()=>{if(!xt(lv.url))return;Xl();let e=process.argv.indexOf("report");e>=0&&process.exit(On(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await sv();return}if(t==="wake"){await iv();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(jh(),Uh));await r()};av();
