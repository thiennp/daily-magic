#!/usr/bin/env node
"use strict";var uy=Object.create;var vs=Object.defineProperty;var my=Object.getOwnPropertyDescriptor;var py=Object.getOwnPropertyNames;var gy=Object.getPrototypeOf,fy=Object.prototype.hasOwnProperty;var u=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var $=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},ze=(e,t)=>{for(var r in t)vs(e,r,{get:t[r],enumerable:!0})},hy=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of py(t))!fy.call(e,o)&&o!==r&&vs(e,o,{get:()=>t[o],enumerable:!(n=my(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?uy(gy(e)):{},hy(t||!e||!e.__esModule?vs(r,"default",{value:e,enumerable:!0}):r,e));var Wl,El,ws=u(()=>{"use strict";Wl=new Set(["","loginwindow","_mbsetupuser","root"]),El=5e3});var kl,_n,Ws=u(()=>{"use strict";kl=require("node:child_process"),_n=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,kl.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ae,_t=u(()=>{"use strict";ae=()=>!0});var bn,Ll,yy,vn,Es=u(()=>{"use strict";bn=g(require("node:path")),Ll=require("node:url");_t();yy={},vn=()=>{if(ae()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return bn.default.dirname(bn.default.resolve(e))}return bn.default.dirname((0,Ll.fileURLToPath)(yy.url))}});var ge,xl,bt=u(()=>{"use strict";ge="agent-witch.js",xl="command"});var Ls,Il,E,Ay,ks,xs,Sy,_y,by,vy,qe,wy,Rl,Cl,Pl,Rs,fe,wn,Wn,Tl,vt,wt,w,Nl,Cs,Ol,Ml,En,Hl,Dl,he,Ps,Wy,Ey,xe,ky,L,x=u(()=>{"use strict";Ls=g(require("node:fs")),Il=g(require("node:os")),E=g(require("node:path"));Es();bt();Ay=vn(),ks=".agent-witch",xs=".local-agent-witch",Sy=47892,_y=47893,by="com.agent-witch",vy="com.local-agent-witch",qe="profiles",wy="active-profile.json",Rl="harness",Cl="sets",Pl="manifest.json",Rs="projects",fe="logs",wn="agent-witch.log",Wn="agent-witch.error.log",Tl="reports",vt="device-keypair.json",wt=e=>e.trim().toLowerCase(),w=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return E.default.resolve(e);let t=E.default.resolve(Ay),r=E.default.basename(t),n=E.default.basename(E.default.dirname(t));return r==="app"&&(n===ks||n===xs)?E.default.dirname(t):r===ks||r===xs?t:E.default.join(Il.default.homedir(),ks)},Nl=(e=w())=>E.default.join(e,"app"),Cs=(e=w())=>E.default.join(Nl(e),ge),Ol=(e,t,r)=>t!==null?E.default.join(e,qe,t,r):E.default.join(e,r),Ml=e=>Ol(e.installDir,e.profileEmail,Rs),En=e=>Ol(e.installDir,e.profileEmail,fe),Hl=e=>e.profileEmail!==null?E.default.join(e.installDir,qe,e.profileEmail,vt):E.default.join(e.installDir,vt),Dl=e=>E.default.basename(e)===xs,he=(e=w())=>Dl(e)?vy:by,Ps=(e=w())=>Dl(e)?_y:Sy,Wy=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return wt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?wt(t):null},Ey=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xe=(e=w())=>{let t=E.default.join(e,wy);if(!Ls.default.existsSync(t))return null;try{let r=JSON.parse(Ls.default.readFileSync(t,"utf8"));if(Ey(r)&&typeof r.email=="string"&&r.email.trim().length>0)return wt(r.email)}catch{return null}return null},ky=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?wt(r):null}let t=Wy();return t!==null?t:xe()},L=e=>{let t=w(),r=Nl(t),n=Cs(t),o=ky(e);if(o!==null){let v=E.default.join(t,qe,o),A=E.default.join(v,Rl),f=E.default.join(v,Rs),l=E.default.join(v,fe),_=E.default.join(v,Tl),h=E.default.join(v,vt),p=E.default.join(v,fe,wn),S=E.default.join(v,fe,Wn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:f,logsDir:l,mainLogPath:p,errorLogPath:S,reportsDir:_,deviceKeypairPath:h,configPath:E.default.join(v,"config.json"),harnessRootDir:A,harnessManifestPath:E.default.join(A,Pl),harnessSetsDir:E.default.join(A,Cl)}}let s=E.default.join(t,Rl),i=E.default.join(t,Rs),a=E.default.join(t,fe),c=E.default.join(t,Tl),d=E.default.join(t,vt),m=E.default.join(t,fe,wn),y=E.default.join(t,fe,Wn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:m,errorLogPath:y,reportsDir:c,deviceKeypairPath:d,configPath:E.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:E.default.join(s,Pl),harnessSetsDir:E.default.join(s,Cl)}}});var kn,Ts,Fl,B,Ul,Je=u(()=>{"use strict";kn=g(require("node:fs")),Ts=g(require("node:path"));x();Fl=e=>{let t=Ts.default.join(e,qe);return kn.default.existsSync(t)?kn.default.readdirSync(t).filter(r=>kn.default.statSync(Ts.default.join(t,r)).isDirectory()).map(r=>wt(r)).toSorted():[]},B=(e=w())=>{let t=he(e);return[{profileEmail:Fl(e)[0]??null,launchAgentLabel:t}]},Ul=(e=w())=>Fl(e)});var Ln,Wt,jl,Is,$l,Ly,Bl,xy,Ry,cr,Cy,Gl,xn=u(()=>{"use strict";Ln=require("node:child_process"),Wt=g(require("node:fs")),jl=g(require("node:os")),Is=g(require("node:path")),$l=require("node:util");Je();x();Ly=(0,$l.promisify)(Ln.execFile),Bl=()=>Is.default.join(jl.default.homedir(),"Library","LaunchAgents"),xy=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Ly("launchctl",["bootout",r]).catch(()=>{})},Ry=e=>{let t=Is.default.join(Bl(),`${e}.plist`);Wt.default.existsSync(t)&&Wt.default.unlinkSync(t)},cr=(e=w())=>{let t=he(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of B(e))r.add(o.launchAgentLabel);let n=Bl();if(Wt.default.existsSync(n))for(let o of Wt.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},Cy=e=>{(0,Ln.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Gl=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=w();if(!Wt.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=cr(e);for(let r of t)await xy(r),Ry(r);return Cy(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Rn,Ns=u(()=>{"use strict";Ws();xn();x();Rn=(e=w())=>{for(let t of cr(e))_n(t)}});var Vl,Py,Ty,Kl,zl=u(()=>{"use strict";Vl=require("node:child_process");ws();Py=e=>e.trim().toLowerCase(),Ty=e=>e==null?!1:!Wl.has(Py(e)),Kl=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Vl.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Ty(t)?t:null}catch{return null}}});var Jl,ql,ye,dr=u(()=>{"use strict";Jl=g(require("node:os"));zl();ql=e=>e.trim().toLowerCase(),ye=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Kl():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??Jl.default.userInfo().username;return ql(r)===ql(n)}});var Et,Cn,Pn=u(()=>{"use strict";ws();Ns();dr();Et=e=>{ye()||(Rn(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Cn=(e,t=El)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{ye()||e()},t);return()=>{clearInterval(r)}}});var Yl,Xl,Zl,Tn,In,Ql,ec,kt=u(()=>{"use strict";Yl=".agent-witch",Xl="memory",Zl="project.json",Tn="chunks.ndjson",In="runs.ndjson",Ql="reports",ec=".json"});var tc,Nn,Os=u(()=>{"use strict";tc=g(require("node:path"));kt();Nn=(e,t)=>tc.default.join(e.trim(),`${t.trim()}${ec}`)});var Ye,rc,nc=u(()=>{"use strict";bt();Ye=e=>`'${e.replace(/'/g,"'\\''")}'`,rc=e=>{let t=`${e.installDir.trim()}/${"app"}/${ge}`,r=[Ye("node"),Ye(t),"report","write","--key",Ye(e.reportKey.trim()),"--agent-run-id",Ye(e.agentRunId.trim()),"--status",Ye(e.status),"--summary",Ye(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ye(e.details.trim())),r.join(" ")}});var le,oc,Iy,sc,On=u(()=>{"use strict";Os();nc();le={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},oc=e=>e===le.COMPLETED||e===le.FAILED,Iy=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),sc=(e,t)=>{let r=Nn(t.reportsDir,t.reportKey),n=rc({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:le.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${Iy({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var ur,ac,ic,lc,Ny,Mn,Oy,My,mr,Hn,cc,dc,pr=u(()=>{"use strict";ur=g(require("node:fs")),ac=g(require("node:path"));On();Os();x();ic=50,lc=e=>{let t=L(),r=Nn(t.reportsDir,e);return ur.default.mkdirSync(ac.default.dirname(r),{recursive:!0}),r},Ny=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Mn=e=>{let t=lc(e);if(!ur.default.existsSync(t))return null;try{let r=JSON.parse(ur.default.readFileSync(t,"utf8"));return Ny(r)?r:null}catch{return null}},Oy=(e,t)=>{let r=[...e,t];return r.length>ic?r.slice(r.length-ic):r},My=e=>{let t=lc(e.reportKey);ur.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},mr=e=>{let t=Mn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Oy(t?.history??[],n)};return My(o),o},Hn=e=>{let t=Mn(e.reportKey);return t!==null?t:mr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:le.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},cc=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},dc=e=>{if(e===null||!oc(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===le.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Hy,Dy,gr,uc,Dn,Ms=u(()=>{"use strict";On();pr();Hy=new Set(Object.values(le)),Dy=e=>Hy.has(e),gr=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},uc=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Dn=e=>{if(e[0]!=="write")return uc(),1;let r=gr(e,"--key"),n=gr(e,"--agent-run-id"),o=gr(e,"--status"),s=gr(e,"--summary"),i=gr(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!Dy(o)?(uc(),1):(mr({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var Hs,mc,Lt,Fn=u(()=>{"use strict";Hs=g(require("node:path")),mc=require("node:url");_t();Lt=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Hs.default.resolve(t);return ae()?r===Hs.default.resolve(__filename):r===(0,mc.fileURLToPath)(e)}});var fr,Ds,jy,$y,hc,G,yc,Un,Xe=u(()=>{"use strict";fr=g(require("node:fs")),Ds=g(require("node:path"));x();jy="install-version.json",$y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hc=(e=w())=>Ds.default.join(e,jy),G=(e=w())=>{let t=hc(e);if(!fr.default.existsSync(t))return null;try{let r=JSON.parse(fr.default.readFileSync(t,"utf8"));return!$y(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},yc=(e,t=w())=>{let r=hc(t);fr.default.mkdirSync(Ds.default.dirname(r),{recursive:!0}),fr.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Un=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var Sc,_c,bc,vc,wc,hr,By,Gy,Vy,Ac,Re,yr=u(()=>{"use strict";Sc=require("node:child_process"),_c=g(require("node:fs")),bc=g(require("node:os")),vc=g(require("node:path")),wc=require("node:util");dr();hr=(0,wc.promisify)(Sc.execFile),By=e=>vc.default.join(bc.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Gy=async e=>{try{return await hr("launchctl",["print",e]),!0}catch{return!1}},Vy=async(e,t,r)=>{await Gy(t)&&await hr("launchctl",["bootout",t]).catch(()=>{}),await hr("launchctl",["bootstrap",e,r]),await hr("launchctl",["enable",t])},Ac=async e=>{try{return await hr("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Re=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!ye())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await Ac(n))return{ok:!0};let o=By(e);if(!_c.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Vy(r,n,o),await Ac(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var Ky,jn,Fs=u(()=>{"use strict";Ws();xn();Je();x();Ky=(e=w())=>{let t=new Set(B(e).map(r=>r.launchAgentLabel));return cr(e).filter(r=>!t.has(r))},jn=(e=w())=>{for(let t of Ky(e))_n(t)}});var Q,xt=u(()=>{"use strict";Q=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Wc,Ze,Us,zy,qy,Ec,Rt,$n,js=u(()=>{"use strict";Wc=require("node:crypto"),Ze=g(require("node:fs")),Us=g(require("node:path"));x();zy="self-update-log.ndjson",qy=100,Ec=(e=w())=>{let t=L(),r=t.installDir===e?t.logsDir:En({installDir:e,profileEmail:t.profileEmail});return Us.default.join(r,zy)},Rt=(e,t=w())=>{let r={id:(0,Wc.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Ec(t);Ze.default.mkdirSync(Us.default.dirname(n),{recursive:!0});let o=Ze.default.existsSync(n)?Ze.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-qy+1)),JSON.stringify(r)];return Ze.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},$n=(e=20,t=w())=>{let r=Ec(t);if(!Ze.default.existsSync(r))return[];let n=Ze.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var kc,Lc,xc=u(()=>{"use strict";kc="deps.tar.gz",Lc="deps"});var Cc,Ce,Qe,Jy,Pc,Tc,Ic=u(()=>{"use strict";Cc=require("node:child_process"),Ce=g(require("node:fs")),Qe=g(require("node:path"));xc();Jy=e=>Qe.default.join(e,"app",Lc),Pc=e=>{let t=Qe.default.join(e,"app"),r=Qe.default.join(t,kc);Ce.default.existsSync(r)&&(Ce.default.rmSync(Jy(e),{recursive:!0,force:!0}),Ce.default.mkdirSync(t,{recursive:!0}),(0,Cc.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Ce.default.rmSync(r,{force:!0}))},Tc=e=>{Ce.default.rmSync(Qe.default.join(e,"node_modules"),{recursive:!0,force:!0}),Ce.default.rmSync(Qe.default.join(e,"package.json"),{force:!0}),Ce.default.rmSync(Qe.default.join(e,"package-lock.json"),{force:!0})}});var Gn={};ze(Gn,{buildAgentWitchSelfUpdateStatus:()=>Gs,fetchAgentWitchRemoteInstallBundleVersion:()=>$s,runAgentWitchSelfUpdate:()=>Bs});var Pe,Bn,Nc,Yy,Oc,$s,Xy,Zy,Ar,Bs,Gs,Ct=u(()=>{"use strict";Pe=g(require("node:fs")),Bn=g(require("node:path"));Xe();yr();Fs();Je();xt();x();bt();js();Ic();Nc=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yy=e=>{let t=xe(e),r=t===null?L():L(t);if(!Pe.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Pe.default.readFileSync(r.configPath,"utf8"));return!Nc(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},Oc=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!Nc(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},$s=async e=>(await Oc(e))?.bundleVersion??null,Xy=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=Bn.default.join(t,r);Pe.default.mkdirSync(Bn.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());Pe.default.writeFileSync(o,s),r.endsWith(".js")&&Pe.default.chmodSync(o,493)},Zy=async()=>{jn();let e=B();for(let t of e)await Re(t.launchAgentLabel)},Ar=(e,t)=>({localBundleVersion:t,...e}),Bs=async e=>{let t=w(),r=G(t),n=r?.bundleVersion??null,o=Yy(t),s=o===null?r?.appOrigin??null:Q(o);if(s===null){let c=Ar({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return Rt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let i=await Oc(s);if(i===null){let c=Ar({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return Rt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||Un(n,i.bundleVersion))){let c=Ar({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:i.bundleVersion},n);return Rt({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),c}try{for(let m of i.scripts)await Xy(s,t,m);let c=Bn.default.join(t,ge);Pe.default.existsSync(c)&&Pe.default.rmSync(c,{force:!0}),Pc(t),Tc(t),yc({bundleVersion:i.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await Zy();let d=Ar({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${i.bundleVersion}.`,remoteBundleVersion:i.bundleVersion},i.bundleVersion);return Rt({event:"update_applied",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),d}catch(c){let d=c instanceof Error?c.message:"Agent Witch self-update failed.",m=Ar({ok:!1,updated:!1,message:d,remoteBundleVersion:i.bundleVersion},n);return Rt({event:"update_failed",ok:!1,message:d,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),m}},Gs=()=>{let e=w();return{local:G(e),logs:$n(20,e)}}});var Vn,Sr,Mc,Vs,_r,Ks=u(()=>{"use strict";Vn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},Sr=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=Vn(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},Mc=e=>e>=1&&e<=5,Vs=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Vn(t,"UTC")},_r=e=>{let t=e.from??new Date,r=Vn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Sr(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Sr(r,e.timeZone,n,0),s=Vn(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?Sr(Vs(r),e.timeZone,n,0):o;if(!i&&Mc(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=Vs(a),Mc(a.weekday))return Sr(a,e.timeZone,n,0);return Sr(Vs(r),e.timeZone,n,0)}});var Qy,Kn,zs=u(()=>{"use strict";Qy=e=>e==="hourly"||e==="daily"||e==="weekdays",Kn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!Qy(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var br,zn,Hc,Dc,qs,Te,Fc,Uc,jc,$c,vr=u(()=>{"use strict";br=g(require("node:fs")),zn=g(require("node:path"));zs();Hc="automations.json",Dc=e=>e.profileEmail!==null?zn.default.join(e.installDir,"profiles",e.profileEmail,Hc):zn.default.join(e.installDir,Hc),qs=()=>({version:1,automations:[]}),Te=e=>{let t=Dc(e);if(!br.default.existsSync(t))return qs();try{let r=JSON.parse(br.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?qs():{version:1,automations:r.automations.flatMap(o=>{let s=Kn(o);return s!==null?[s]:[]})}}catch{return qs()}},Fc=(e,t)=>{let r=Dc(e);br.default.mkdirSync(zn.default.dirname(r),{recursive:!0}),br.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Uc=(e,t)=>{Fc(e,{version:1,automations:t})},jc=(e,t)=>{let n=Te(e).automations.filter(o=>o.id!==t.id);Fc(e,{version:1,automations:[...n,t]})},$c=(e,t)=>Te(e).automations.find(r=>r.id===t)??null});var eA,tA,qn,Js=u(()=>{"use strict";Ks();zs();vr();x();eA=e=>e!==void 0&&e.trim().length>0?L(e.trim()):L(),tA=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??_r({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??_r({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},qn=e=>{let t=eA(e.profileEmail),r=Te(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=Kn(s);return i!==null?[tA(i,n.get(i.id))]:[]});return Uc(t,o),{ok:!0,writtenCount:o.length}}});var Bc,Gc=u(()=>{"use strict";Bc="x-agent-witch-token"});var Pt,Ys,Vc,Jn,Kc,wr=u(()=>{"use strict";Gc();xt();Pt=e=>{let t=Q(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Ys=e=>({[Bc]:e,"Content-Type":"application/json"}),Vc=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Ys(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Jn=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Ys(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Kc=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Ys(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Yn,Wr,H,Ie,zc,Tt,et=u(()=>{"use strict";Yn={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Wr=e=>e.trim().length>0,H=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Ie=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:Wr(t)?t.trim():Yn.claudeCommand,codexCommand:Wr(r)?r.trim():Yn.codexCommand,cursorCommand:Wr(n)?n.trim():Yn.cursorCommand,antigravityCommand:Wr(o)?o.trim():Yn.antigravityCommand}},zc=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},Tt=(e,t,r,n)=>{let o=t.trim();if(!Wr(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var Xs,rA,nA,Xn,Zs=u(()=>{"use strict";Xs=e=>e.toLocaleString("en-US"),rA=e=>e<.01?e.toFixed(4):e.toFixed(3),nA=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${rA(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Xs(e.inputTokens)} in / ${Xs(e.outputTokens)} out (${Xs(e.totalTokens)} total)`,t].join(`
`)},Xn=(e,t)=>{if(t===void 0)return e;let r=nA(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var Zn,Qs=u(()=>{"use strict";Zn={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var It,ei,ti,ri=u(()=>{"use strict";Qs();It="auto",ei=e=>({value:It,label:`Auto (${Zn[e]})`}),ti={anthropic:[ei("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[ei("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[ei("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Nt,Qn,qc,Er=u(()=>{"use strict";Qs();ri();Nt=e=>{let t=e?.trim()??"";if(!(t.length===0||t===It))return t},Qn=(e,t)=>{let r=Nt(t);return r===void 0?Zn[e]:r},qc=e=>{let t=Nt(e);return t===void 0?It:t}});var eo,oA,sA,to,Jc=u(()=>{"use strict";eo={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},oA=e=>{let t=eo[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?eo["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?eo["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?eo["gemini-2.0-flash"]:null},sA=(e,t,r)=>{let n=oA(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},to=e=>{let t=sA(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Ot,iA,aA,lA,ro,Yc=u(()=>{"use strict";Jc();Ot=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),iA=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=Ot(r.input_tokens),o=Ot(r.output_tokens);return n===0&&o===0?null:to({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},aA=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=Ot(r.prompt_tokens),o=Ot(r.completion_tokens);return n===0&&o===0?null:to({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},lA=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=Ot(r.promptTokenCount),o=Ot(r.candidatesTokenCount);return n===0&&o===0?null:to({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},ro=(e,t,r)=>e==="anthropic"?iA(t,r):e==="openai"?aA(t,r):lA(t,r)});var cA,dA,uA,mA,pA,gA,Xc,Zc=u(()=>{"use strict";Er();Yc();cA=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},dA=async e=>{let t=Qn("anthropic",e.secret.model),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=cA(n);o.length>0&&e.onChunk?.(o);let s=ro("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},uA=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},mA=async e=>{let t=Qn("openai",e.secret.model),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=uA(n);o.length>0&&e.onChunk?.(o);let s=ro("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},pA=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},gA=async e=>{let t=Qn("google",e.secret.model),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=pA(o);s.length>0&&e.onChunk?.(s);let i=ro("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Xc=async e=>{try{return e.provider==="anthropic"?await dA(e):e.provider==="openai"?await mA(e):await gA(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ne,kr=u(()=>{"use strict";Ne=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var Qc,fA,no,ni=u(()=>{"use strict";Qc=g(require("node:path")),fA="writer-api-secrets.json",no=e=>Qc.default.join(e,fA)});var oi,ed,hA,tt,Oe,rt=u(()=>{"use strict";oi=g(require("node:fs"));Er();ni();ed=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hA=e=>{if(!ed(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=Nt(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},tt=e=>{let t=no(e);if(!oi.default.existsSync(t))return{};try{let r=JSON.parse(oi.default.readFileSync(t,"utf8"));if(!ed(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=hA(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Oe=(e,t)=>tt(e)[t]??null});var V,nt=u(()=>{"use strict";V=e=>e==="api"?"api":"cli"});var td,ee,oo,Me=u(()=>{"use strict";td=g(require("node:path"));kr();rt();nt();ee=e=>td.default.dirname(e),oo=(e,t)=>{if(V(e.writerExecutionBackend)!=="api")return!1;let r=Ne(t);if(r===null)return!1;let n=ee(e.layout.configPath),o=Oe(n,r);return o!==null&&o.apiKey.length>0}});var so,si=u(()=>{"use strict";Zs();Zc();kr();rt();Me();so=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ne(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ee(e.layout.configPath),a=Oe(i,s);if(a===null){let d=Object.keys(tt(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Xc({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:Xn(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var rd,Mt,io=u(()=>{"use strict";rd=require("node:child_process");et();si();Me();Mt=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(oo(e,t)){so(e,t,r).then(n);return}let o=Tt(t,r,Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,rd.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[];s.stdout?.on("data",a=>{i.push(a.toString("utf8"))}),s.stderr?.on("data",a=>{i.push(a.toString("utf8"))}),s.on("close",a=>{n({exitCode:a??-1,output:i.join("")})}),s.on("error",a=>{n({exitCode:-1,output:a.message})})})});var ii,ai,li=u(()=>{"use strict";ii="https://www.agentwitch.com",ai="wss://www.agentwitch.com/api/agent-witch/ws"});var ao,nd,ci=u(()=>{"use strict";ao=".agent-witch",nd=".local-agent-witch"});var od,yA,di,lo,ui=u(()=>{"use strict";od=g(require("node:path"));li();ci();yA="ws://localhost:3000/api/agent-witch/ws",di=e=>e.replace(/\/$/,""),lo=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return di(t);let r=od.default.basename(e.installDir);if(r===ao)return ai;let n=e.configWsUrl?.trim()??"";return r===nd?n.length>0?di(n):yA:n.length>0?di(n):ai}});var mi,AA,SA,_A,bA,vA,F,ot=u(()=>{"use strict";mi=g(require("node:fs"));ui();x();nt();AA="claude",SA="codex",_A="cursor",bA="agy",vA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F=()=>{let e=L();if(!mi.default.existsSync(e.configPath))return null;try{let t=JSON.parse(mi.default.readFileSync(e.configPath,"utf8"));if(!vA(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=lo({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:V(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:AA,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:SA,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:_A,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:bA,pairingToken:s,layout:e}}catch{return null}}});var sd,pi,Ht,co=u(()=>{"use strict";sd=require("node:crypto");wr();Ks();io();vr();ot();pi=!1,Ht=async e=>{if(pi)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=F();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Pt({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=$c(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};pi=!0;let o=(0,sd.randomUUID)();try{let s=await Mt(t,"claude-cli",n.prompt);await Kc(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=_r({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return jc(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{pi=!1}}});function Lr(e){return(0,id.createHash)("sha256").update(e.trim()).digest("hex")}var id,gi=u(()=>{"use strict";id=require("node:crypto")});var wA,ad,WA,EA,xr,ld,fi=u(()=>{"use strict";wA=["agentwitch.com","www.agentwitch.com"],ad=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,WA=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},EA=e=>{let t=WA(e);return!!(wA.includes(t)||ad.test(e.trim().toLowerCase()))},xr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return EA(r)?ad.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},ld=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:xr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var uo,cd,kA,LA,dd,ud,hi,mo,po=u(()=>{"use strict";uo=g(require("node:fs")),cd=g(require("node:path")),kA="wake-port.json",LA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dd=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,ud=e=>cd.default.join(e,kA),hi=e=>{let t=ud(e);if(!uo.default.existsSync(t))return null;try{let r=JSON.parse(uo.default.readFileSync(t,"utf8"));if(LA(r)&&dd(r.wakePort))return r.wakePort}catch{return null}return null},mo=(e,t)=>{if(!dd(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=ud(e);uo.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var f0,h0,y0,te,md,Dt=u(()=>{"use strict";po();x();po();f0=Ps(),h0=`${he()}-wake`,y0=he(),te=()=>{let e=w(),t=hi(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return Ps()},md=e=>{let t=w();hi(t)===null&&mo(t,e)}});var Ft,Rr,xA,pd,gd,fd=u(()=>{"use strict";Ft=g(require("node:fs")),Rr=g(require("node:path"));gi();x();xA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pd=e=>{if(!Ft.default.existsSync(e))return null;try{let t=JSON.parse(Ft.default.readFileSync(e,"utf8"));return!xA(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Lr(t.pairingToken.trim())}catch{return null}},gd=(e=w())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(pd(Rr.default.join(e,"config.json")));let o=Rr.default.join(e,qe);if(!Ft.default.existsSync(o))return t;for(let s of Ft.default.readdirSync(o)){let i=Rr.default.join(o,s);Ft.default.statSync(i).isDirectory()&&n(pd(Rr.default.join(i,"config.json")))}return t}});var hd,yd=u(()=>{"use strict";hd=["rule","skill","command","instruction","agent"]});var Ad,RA,CA,Sd,_d=u(()=>{"use strict";yd();Ad=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RA=e=>typeof e=="string"&&hd.includes(e),CA=e=>{if(!Ad(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!RA(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Sd=e=>{if(!Ad(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=CA(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var bd,PA,TA,IA,NA,OA,MA,HA,DA,go,yi=u(()=>{"use strict";bd=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},PA=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},TA=(e,t)=>{let r=PA(t),n=bd(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},IA=(e,t,r)=>{let n=TA(t,r);return`shared/items/${e}/${n}`},NA=["rules","skills","commands","instructions","agents"],OA=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),MA=(e,t)=>[...e.filter(n=>n.id!==t.id),t],HA=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},DA=e=>({id:e.id,kind:e.kind,title:e.title,path:IA(e.id,e.kind,e.title)}),go=e=>{let t=new Date().toISOString(),r=e.existingManifest??OA(e.hostname,t),n=bd(e.bundle.slug),o=HA(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...NA.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,m)=>{let y=DA(m);return{files:[...d.files,{relativePath:y.path,content:m.content}],nextItems:MA(d.nextItems,y)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var He,vd,fo,FA,wd,Wd=u(()=>{"use strict";He=g(require("node:fs")),vd=g(require("node:os")),fo=g(require("node:path"));yi();x();FA=e=>{if(!He.default.existsSync(e))return null;try{let t=JSON.parse(He.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},wd=e=>{let t=L(e.profileEmail);try{let r=FA(t.harnessManifestPath),n=go({bundle:e.bundle,hostname:vd.default.hostname(),existingManifest:r});He.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)He.default.mkdirSync(fo.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=fo.default.join(t.harnessRootDir,o.relativePath);He.default.mkdirSync(fo.default.dirname(s),{recursive:!0}),He.default.writeFileSync(s,o.content)}return He.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var Ed,kd,ho,Ai=u(()=>{"use strict";Ed=require("node:child_process"),kd=g(require("node:fs"));dr();x();ho=(e=w())=>{let t=Cs(e);if(!kd.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!ye())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=xe(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,Ed.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var Si,ce,I0,Ut=u(()=>{"use strict";x();Si="connection-health.json",ce=12e4,I0=`${he()}-watchdog`});var Ld,st,_i,UA,jA,$A,xd,BA,Rd,yo,Ao=u(()=>{"use strict";Ld=require("node:crypto"),st=g(require("node:fs")),_i=g(require("node:path"));x();UA="watchdog-log.ndjson",jA=200,$A=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xd=(e=w())=>{let t=L(),r=t.installDir===e?t.logsDir:En({installDir:e,profileEmail:t.profileEmail});return _i.default.join(r,UA)},BA=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!$A(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Rd=(e,t=w())=>{let r={id:(0,Ld.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=xd(t);st.default.mkdirSync(_i.default.dirname(n),{recursive:!0});let o=st.default.existsSync(n)?st.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-jA+1)),JSON.stringify(r)];return st.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},yo=(e=20,t=w())=>{let r=xd(t);if(!st.default.existsSync(r))return[];let n=st.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=BA(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var Cr,So,GA,Cd,re,bi,de,Pr=u(()=>{"use strict";Cr=g(require("node:fs")),So=g(require("node:path"));Ut();GA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cd=e=>e.profileEmail===null?So.default.join(e.installDir,Si):So.default.join(e.installDir,"profiles",e.profileEmail,Si),re=e=>{let t=Cd(e);if(!Cr.default.existsSync(t))return null;try{let r=JSON.parse(Cr.default.readFileSync(t,"utf8"));return!GA(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},bi=(e,t)=>{let r=Cd(e),n=re(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};Cr.default.mkdirSync(So.default.dirname(r),{recursive:!0}),Cr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},de=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Pd,Td,VA,Tr,vi=u(()=>{"use strict";Pd=require("node:child_process"),Td=require("node:util"),VA=(0,Td.promisify)(Pd.execFile),Tr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await VA("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Id,wi=u(()=>{"use strict";Id="watchdog-reinstall-state.json"});var Nd={};ze(Nd,{verifyAgentWitchReviveAfterKickstart:()=>qA});var zA,qA,Od=u(()=>{"use strict";wi();Pr();vi();x();zA=e=>new Promise(t=>{setTimeout(t,e)}),qA=async e=>{if(await zA(e.verifyDelayMs??3e3),!await Tr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?L():L(e.profileEmail),n=re(r);return!de(n,e.staleAfterMs)}});var Ir,Wi,YA,Md,XA,Hd,Dd,Fd=u(()=>{"use strict";Ir=g(require("node:fs")),Wi=g(require("node:path"));wi();x();YA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Md=e=>Wi.default.join(e,Id),XA=(e=w())=>{let t=Md(e);if(!Ir.default.existsSync(t))return null;try{let r=JSON.parse(Ir.default.readFileSync(t,"utf8"));return!YA(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Hd=(e=w(),t=Date.now())=>{let r=XA(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},Dd=(e=w(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=Md(e);return Ir.default.mkdirSync(Wi.default.dirname(n),{recursive:!0}),Ir.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Ud,jt,jd,$d,Bd,ZA,QA,Gd,eS,tS,Vd,Kd=u(()=>{"use strict";Ud=require("node:child_process"),jt=g(require("node:fs")),jd=g(require("node:os")),$d=g(require("node:path")),Bd=require("node:util");Xe();xt();x();ZA=(0,Bd.promisify)(Ud.execFile),QA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gd=e=>{let t=xe(e),r=t===null?L():L(t);if(!jt.default.existsSync(r.configPath))return null;try{let n=JSON.parse(jt.default.readFileSync(r.configPath,"utf8"));return!QA(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},eS=e=>Gd(e)?.wsUrl??null,tS=e=>{let t=eS(e);return t!==null?Q(t):G(e)?.appOrigin??null},Vd=async e=>{let t=e?.installDir??w(),r=Gd(t),n=r!==null?Q(r.wsUrl):tS(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=$d.default.join(jd.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{jt.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??xe(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await ZA("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{jt.default.existsSync(i)&&jt.default.unlinkSync(i)}}});var zd={};ze(zd,{attemptAgentWitchWatchdogReinstall:()=>rS});var rS,qd=u(()=>{"use strict";Fd();yr();Kd();rS=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!Hd())return{attempted:!1,ok:!1,targets:e};Dd();let r=await Vd();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await Re(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var Jd,Yd,Xd,nS,oS,sS,Ei,ki=u(()=>{"use strict";dr();Ut();Pr();vi();yr();Je();x();Ai();Ao();Jd=e=>e===null?L():L(e),Yd=async(e,t,r)=>{if(!await Tr(e))return"not_running";let o=Jd(t),s=re(o);return de(s,r)?"stale_connection":"healthy"},Xd=async e=>{let t=e?.staleAfterMs??ce,r=w(),n=B(r);return Promise.all(n.map(async o=>{let s=await Yd(o.launchAgentLabel,o.profileEmail,t),i=Jd(o.profileEmail),a=re(i),c=await Tr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:de(a,t),needsRevive:s!=="healthy",reason:s}}))},nS=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},oS=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",sS=async e=>{let t=await Re(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(Od(),Nd)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Ei=async e=>{if(!ye())return{ok:!0,targets:[]};let t=e?.staleAfterMs??ce,r=w(),n=B(r),o=[];for(let m of n){let y=await Yd(m.launchAgentLabel,m.profileEmail,t);if(y==="healthy"){o.push({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,revived:!1,reason:y});continue}o.push(await sS({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,reason:y,staleAfterMs:t}))}if(o.length===0){let m=ho();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:m.ok,reason:"not_running",...m.errorMessage!==void 0?{errorMessage:m.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(m=>m.reason!=="healthy"&&!m.revived))try{let{attemptAgentWitchWatchdogReinstall:m}=await Promise.resolve().then(()=>(qd(),zd)),y=await m(o);s=y.attempted,i=y.ok,a=y.errorMessage,c=[...y.targets]}catch(m){s=!0,i=!1,a=m instanceof Error?m.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(m=>m.revived||m.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&Rd({event:oS(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:nS(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var Zd,Qd,eu=u(()=>{"use strict";Zd=g(require("node:os"));Ut();Ao();ki();Qd=async()=>{let e=await Xd(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Zd.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:ce,healthyProfileCount:t,profiles:e,lastLog:yo(1)[0]??null}}});var tu={};ze(tu,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ci,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Hi,buildAgentWitchWakeHealthResponse:()=>Pi,buildAgentWitchWakeIdentityResponse:()=>Ti,buildAgentWitchWatchdogStatus:()=>Ni,installHarnessFromWakeServer:()=>bo,readAgentWitchSelfUpdateLogEntries:()=>wo,readAgentWitchWatchdogLogEntries:()=>vo,restartAgentWitchFromWakeServer:()=>Mi,reviveAgentWitchWebSocketFromWakeServer:()=>Oi,runAgentWitchSelfUpdateFromWakeServer:()=>Di,runAgentWitchUninstallLocalFromWakeServer:()=>Fi,runAutomationFromWakeServer:()=>Ri,syncAutomationsFromWakeServer:()=>xi,wakeAgentWitchLaunchAgents:()=>Ii});var _o,Li,bo,xi,Ri,Ci,Pi,Ti,Ii,vo,Ni,Oi,Mi,Hi,wo,Di,Fi,Ui=u(()=>{"use strict";Js();co();vr();gi();ot();_o=g(require("node:os"));fi();Dt();yr();Je();fd();_d();Wd();Ai();eu();Ao();Ct();xn();js();ki();Li=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bo=e=>{if(!Li(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Sd(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!xr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=wd({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},xi=e=>{if(!Li(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!xr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=qn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Ri=async e=>{if(!Li(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:xr(t)?Ht(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ci=()=>{let e=F(),t=e!==null?Te(e.layout):{version:1,automations:[]};return{ok:!0,hostname:_o.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},Pi=()=>{let e=B();return{ok:!0,port:te(),hostname:_o.default.hostname(),profileCount:e.length}},Ti=()=>{let e=B(),t=F()?.pairingToken.trim()??"",r=t.length>0?Lr(t):null,n=gd();return{hostname:_o.default.hostname(),port:te(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Ii=async()=>{let e=B(),t=[];for(let r of e){let n=await Re(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=ho();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},vo=(e=20)=>yo(e),Ni=Qd,Oi=Ei,Mi=Ei,Hi=Gs,wo=(e=20)=>$n(e),Di=e=>Bs(e),Fi=()=>Gl()});var Ae=$((NE,ou)=>{"use strict";var ru=["nodebuffer","arraybuffer","fragments"],nu=typeof Blob<"u";nu&&ru.push("blob");ou.exports={BINARY_TYPES:ru,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:nu,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Nr=$((OE,Wo)=>{"use strict";var{EMPTY_BUFFER:iS}=Ae(),ji=Buffer[Symbol.species];function aS(e,t){if(e.length===0)return iS;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new ji(r.buffer,r.byteOffset,n):r}function su(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function iu(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function lS(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function $i(e){if($i.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new ji(e):ArrayBuffer.isView(e)?t=new ji(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),$i.readOnly=!1),t}Wo.exports={concat:aS,mask:su,toArrayBuffer:lS,toBuffer:$i,unmask:iu};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Wo.exports.mask=function(t,r,n,o,s){s<48?su(t,r,n,o,s):e.mask(t,r,n,o,s)},Wo.exports.unmask=function(t,r){t.length<32?iu(t,r):e.unmask(t,r)}}catch{}});var cu=$((ME,lu)=>{"use strict";var au=Symbol("kDone"),Bi=Symbol("kRun"),Gi=class{constructor(t){this[au]=()=>{this.pending--,this[Bi]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Bi]()}[Bi](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[au])}}};lu.exports=Gi});var Gt=$((HE,pu)=>{"use strict";var Or=require("zlib"),du=Nr(),cS=cu(),{kStatusCode:uu}=Ae(),dS=Buffer[Symbol.species],uS=Buffer.from([0,0,255,255]),ko=Symbol("permessage-deflate"),Se=Symbol("total-length"),$t=Symbol("callback"),De=Symbol("buffers"),Bt=Symbol("error"),Eo,Vi=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Eo){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Eo=new cS(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[$t];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Eo.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){Eo.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Or.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Or.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[ko]=this,this._inflate[Se]=0,this._inflate[De]=[],this._inflate.on("error",pS),this._inflate.on("data",mu)}this._inflate[$t]=n,this._inflate.write(t),r&&this._inflate.write(uS),this._inflate.flush(()=>{let s=this._inflate[Bt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=du.concat(this._inflate[De],this._inflate[Se]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Se]=0,this._inflate[De]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Or.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Or.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Se]=0,this._deflate[De]=[],this._deflate.on("data",mS)}this._deflate[$t]=n,this._deflate.write(t),this._deflate.flush(Or.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=du.concat(this._deflate[De],this._deflate[Se]);r&&(s=new dS(s.buffer,s.byteOffset,s.length-4)),this._deflate[$t]=null,this._deflate[Se]=0,this._deflate[De]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};pu.exports=Vi;function mS(e){this[De].push(e),this[Se]+=e.length}function mu(e){if(this[Se]+=e.length,this[ko]._maxPayload<1||this[Se]<=this[ko]._maxPayload){this[De].push(e);return}this[Bt]=new RangeError("Max payload size exceeded"),this[Bt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Bt][uu]=1009,this.removeListener("data",mu),this.reset()}function pS(e){if(this[ko]._inflate=null,this[Bt]){this[$t](this[Bt]);return}e[uu]=1007,this[$t](e)}});var Vt=$((DE,Lo)=>{"use strict";var{isUtf8:gu}=require("buffer"),{hasBlob:gS}=Ae(),fS=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function hS(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Ki(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function yS(e){return gS&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Lo.exports={isBlob:yS,isValidStatusCode:hS,isValidUTF8:Ki,tokenChars:fS};if(gu)Lo.exports.isValidUTF8=function(e){return e.length<24?Ki(e):gu(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Lo.exports.isValidUTF8=function(t){return t.length<32?Ki(t):e(t)}}catch{}});var Xi=$((FE,bu)=>{"use strict";var{Writable:AS}=require("stream"),fu=Gt(),{BINARY_TYPES:SS,EMPTY_BUFFER:hu,kStatusCode:_S,kWebSocket:bS}=Ae(),{concat:zi,toArrayBuffer:vS,unmask:wS}=Nr(),{isValidStatusCode:WS,isValidUTF8:yu}=Vt(),xo=Buffer[Symbol.species],q=0,Au=1,Su=2,_u=3,qi=4,Ji=5,Ro=6,Yi=class extends AS{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||SS[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[bS]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=q}_write(t,r,n){if(this._opcode===8&&this._state==q)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new xo(n.buffer,n.byteOffset+t,n.length-t),new xo(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new xo(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case q:this.getInfo(t);break;case Au:this.getPayloadLength16(t);break;case Su:this.getPayloadLength64(t);break;case _u:this.getMask();break;case qi:this.getData(t);break;case Ji:case Ro:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[fu.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Au:this._payloadLength===127?this._state=Su:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=_u:this._state=qi}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=qi}getData(t){let r=hu;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&wS(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Ji,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[fu.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===q&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=q;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=zi(n,r):this._binaryType==="arraybuffer"?o=vS(zi(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=q):(this._state=Ro,setImmediate(()=>{this.emit("message",o,!0),this._state=q,this.startLoop(t)}))}else{let o=zi(n,r);if(!this._skipUTF8Validation&&!yu(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Ji||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=q):(this._state=Ro,setImmediate(()=>{this.emit("message",o,!1),this._state=q,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,hu),this.end();else{let n=t.readUInt16BE(0);if(!WS(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new xo(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!yu(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=q;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=q):(this._state=Ro,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=q,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[_S]=o,i}};bu.exports=Yi});var ea=$((jE,Wu)=>{"use strict";var{Duplex:UE}=require("stream"),{randomFillSync:ES}=require("crypto"),{types:{isUint8Array:kS}}=require("util"),vu=Gt(),{EMPTY_BUFFER:LS,kWebSocket:xS,NOOP:RS}=Ae(),{isBlob:Kt,isValidStatusCode:CS}=Vt(),{mask:wu,toBuffer:it}=Nr(),J=Symbol("kByteLength"),PS=Buffer.alloc(4),Co=8*1024,at,zt=Co,ne=0,TS=1,IS=2,Zi=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ne,this.onerror=RS,this[xS]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||PS,r.generateMask?r.generateMask(n):(zt===Co&&(at===void 0&&(at=Buffer.alloc(Co)),ES(at,0,Co),zt=0),n[0]=at[zt++],n[1]=at[zt++],n[2]=at[zt++],n[3]=at[zt++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[J]!==void 0?a=r[J]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(wu(t,n,d,s,a),[d]):(wu(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=LS;else{if(typeof t!="number"||!CS(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(kS(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[J]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ne?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Kt(t)?(o=t.size,s=!1):(t=it(t),o=t.length,s=it.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[J]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Kt(t)?this._state!==ne?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ne?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Kt(t)?(o=t.size,s=!1):(t=it(t),o=t.length,s=it.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[J]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Kt(t)?this._state!==ne?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ne?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[vu.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Kt(t)?(a=t.size,c=!1):(t=it(t),a=t.length,c=it.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[J]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Kt(t)?this._state!==ne?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==ne?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[J],this._state=IS,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Qi,this,a,o);return}this._bufferedBytes-=n[J];let i=it(s);r?this.dispatch(i,r,n,o):(this._state=ne,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(NS,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[vu.extensionName];this._bufferedBytes+=n[J],this._state=TS,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Qi(this,c,o);return}this._bufferedBytes-=n[J],this._state=ne,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===ne&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][J],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][J],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Wu.exports=Zi;function Qi(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function NS(e,t,r){Qi(e,t,r),e.onerror(t)}});var Iu=$(($E,Tu)=>{"use strict";var{kForOnEventAttribute:Mr,kListener:ta}=Ae(),Eu=Symbol("kCode"),ku=Symbol("kData"),Lu=Symbol("kError"),xu=Symbol("kMessage"),Ru=Symbol("kReason"),qt=Symbol("kTarget"),Cu=Symbol("kType"),Pu=Symbol("kWasClean"),_e=class{constructor(t){this[qt]=null,this[Cu]=t}get target(){return this[qt]}get type(){return this[Cu]}};Object.defineProperty(_e.prototype,"target",{enumerable:!0});Object.defineProperty(_e.prototype,"type",{enumerable:!0});var lt=class extends _e{constructor(t,r={}){super(t),this[Eu]=r.code===void 0?0:r.code,this[Ru]=r.reason===void 0?"":r.reason,this[Pu]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Eu]}get reason(){return this[Ru]}get wasClean(){return this[Pu]}};Object.defineProperty(lt.prototype,"code",{enumerable:!0});Object.defineProperty(lt.prototype,"reason",{enumerable:!0});Object.defineProperty(lt.prototype,"wasClean",{enumerable:!0});var Jt=class extends _e{constructor(t,r={}){super(t),this[Lu]=r.error===void 0?null:r.error,this[xu]=r.message===void 0?"":r.message}get error(){return this[Lu]}get message(){return this[xu]}};Object.defineProperty(Jt.prototype,"error",{enumerable:!0});Object.defineProperty(Jt.prototype,"message",{enumerable:!0});var Hr=class extends _e{constructor(t,r={}){super(t),this[ku]=r.data===void 0?null:r.data}get data(){return this[ku]}};Object.defineProperty(Hr.prototype,"data",{enumerable:!0});var OS={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[Mr]&&o[ta]===t&&!o[Mr])return;let n;if(e==="message")n=function(s,i){let a=new Hr("message",{data:i?s:s.toString()});a[qt]=this,Po(t,this,a)};else if(e==="close")n=function(s,i){let a=new lt("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[qt]=this,Po(t,this,a)};else if(e==="error")n=function(s){let i=new Jt("error",{error:s,message:s.message});i[qt]=this,Po(t,this,i)};else if(e==="open")n=function(){let s=new _e("open");s[qt]=this,Po(t,this,s)};else return;n[Mr]=!!r[Mr],n[ta]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[ta]===t&&!r[Mr]){this.removeListener(e,r);break}}};Tu.exports={CloseEvent:lt,ErrorEvent:Jt,Event:_e,EventTarget:OS,MessageEvent:Hr};function Po(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var To=$((BE,Nu)=>{"use strict";var{tokenChars:Dr}=Vt();function ue(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function MS(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,m=-1,y=0;for(;y<e.length;y++)if(d=e.charCodeAt(y),i===void 0)if(m===-1&&Dr[d]===1)c===-1&&(c=y);else if(y!==0&&(d===32||d===9))m===-1&&c!==-1&&(m=y);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y);let A=e.slice(c,m);d===44?(ue(t,A,r),r=Object.create(null)):i=A,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);else if(a===void 0)if(m===-1&&Dr[d]===1)c===-1&&(c=y);else if(d===32||d===9)m===-1&&c!==-1&&(m=y);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y),ue(r,e.slice(c,m),!0),d===44&&(ue(t,i,r),r=Object.create(null),i=void 0),c=m=-1}else if(d===61&&c!==-1&&m===-1)a=e.slice(c,y),c=m=-1;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(o){if(Dr[d]!==1)throw new SyntaxError(`Unexpected character at index ${y}`);c===-1?c=y:n||(n=!0),o=!1}else if(s)if(Dr[d]===1)c===-1&&(c=y);else if(d===34&&c!==-1)s=!1,m=y;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(d===34&&e.charCodeAt(y-1)===61)s=!0;else if(m===-1&&Dr[d]===1)c===-1&&(c=y);else if(c!==-1&&(d===32||d===9))m===-1&&(m=y);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y);let A=e.slice(c,m);n&&(A=A.replace(/\\/g,""),n=!1),ue(r,a,A),d===44&&(ue(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");m===-1&&(m=y);let v=e.slice(c,m);return i===void 0?ue(t,v,r):(a===void 0?ue(r,v,!0):n?ue(r,a,v.replace(/\\/g,"")):ue(r,a,v),ue(t,i,r)),t}function HS(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Nu.exports={format:HS,parse:MS}});var Mo=$((KE,Ku)=>{"use strict";var DS=require("events"),FS=require("https"),US=require("http"),Hu=require("net"),jS=require("tls"),{randomBytes:$S,createHash:BS}=require("crypto"),{Duplex:GE,Readable:VE}=require("stream"),{URL:ra}=require("url"),Fe=Gt(),GS=Xi(),VS=ea(),{isBlob:KS}=Vt(),{BINARY_TYPES:Ou,CLOSE_TIMEOUT:zS,EMPTY_BUFFER:Io,GUID:qS,kForOnEventAttribute:na,kListener:JS,kStatusCode:YS,kWebSocket:O,NOOP:Du}=Ae(),{EventTarget:{addEventListener:XS,removeEventListener:ZS}}=Iu(),{format:QS,parse:e_}=To(),{toBuffer:t_}=Nr(),Fu=Symbol("kAborted"),oa=[8,13],be=["CONNECTING","OPEN","CLOSING","CLOSED"],r_=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,C=class e extends DS{constructor(t,r,n){super(),this._binaryType=Ou[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Io,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),Uu(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){Ou.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new GS({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new VS(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[O]=this,s[O]=this,t[O]=this,o.on("conclude",s_),o.on("drain",i_),o.on("error",a_),o.on("message",l_),o.on("ping",c_),o.on("pong",d_),s.onerror=u_,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",Bu),t.on("data",Oo),t.on("end",Gu),t.on("error",Vu),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Fe.extensionName]&&this._extensions[Fe.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){K(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),$u(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){sa(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Io,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){sa(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Io,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){sa(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Fe.extensionName]||(o.compress=!1),this._sender.send(t||Io,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){K(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(C,"CONNECTING",{enumerable:!0,value:be.indexOf("CONNECTING")});Object.defineProperty(C.prototype,"CONNECTING",{enumerable:!0,value:be.indexOf("CONNECTING")});Object.defineProperty(C,"OPEN",{enumerable:!0,value:be.indexOf("OPEN")});Object.defineProperty(C.prototype,"OPEN",{enumerable:!0,value:be.indexOf("OPEN")});Object.defineProperty(C,"CLOSING",{enumerable:!0,value:be.indexOf("CLOSING")});Object.defineProperty(C.prototype,"CLOSING",{enumerable:!0,value:be.indexOf("CLOSING")});Object.defineProperty(C,"CLOSED",{enumerable:!0,value:be.indexOf("CLOSED")});Object.defineProperty(C.prototype,"CLOSED",{enumerable:!0,value:be.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(C.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(C.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[na])return t[JS];return null},set(t){for(let r of this.listeners(e))if(r[na]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[na]:!0})}})});C.prototype.addEventListener=XS;C.prototype.removeEventListener=ZS;Ku.exports=C;function Uu(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:zS,protocolVersion:oa[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!oa.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${oa.join(", ")})`);let s;if(t instanceof ra)s=t;else try{s=new ra(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;No(e,l);return}let d=i?443:80,m=$S(16).toString("base64"),y=i?FS.request:US.request,v=new Set,A;if(o.createConnection=o.createConnection||(i?o_:n_),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":m,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(A=new Fe({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=QS({[Fe.extensionName]:A.offer()})),r.length){for(let l of r){if(typeof l!="string"||!r_.test(l)||v.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");v.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let f;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[_,h]of Object.entries(l))n.headers[_.toLowerCase()]=h}else if(e.listenerCount("redirect")===0){let l=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),f=e._req=y(o),e._redirects&&e.emit("redirect",e.url,f)}else f=e._req=y(o);o.timeout&&f.on("timeout",()=>{K(e,f,"Opening handshake has timed out")}),f.on("error",l=>{f===null||f[Fu]||(f=e._req=null,No(e,l))}),f.on("response",l=>{let _=l.headers.location,h=l.statusCode;if(_&&o.followRedirects&&h>=300&&h<400){if(++e._redirects>o.maxRedirects){K(e,f,"Maximum redirects exceeded");return}f.abort();let p;try{p=new ra(_,t)}catch{let b=new SyntaxError(`Invalid URL: ${_}`);No(e,b);return}Uu(e,p,r,n)}else e.emit("unexpected-response",f,l)||K(e,f,`Unexpected server response: ${l.statusCode}`)}),f.on("upgrade",(l,_,h)=>{if(e.emit("upgrade",l),e.readyState!==C.CONNECTING)return;f=e._req=null;let p=l.headers.upgrade;if(p===void 0||p.toLowerCase()!=="websocket"){K(e,_,"Invalid Upgrade header");return}let S=BS("sha1").update(m+qS).digest("base64");if(l.headers["sec-websocket-accept"]!==S){K(e,_,"Invalid Sec-WebSocket-Accept header");return}let b=l.headers["sec-websocket-protocol"],W;if(b!==void 0?v.size?v.has(b)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":v.size&&(W="Server sent no subprotocol"),W){K(e,_,W);return}b&&(e._protocol=b);let k=l.headers["sec-websocket-extensions"];if(k!==void 0){if(!A){K(e,_,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=e_(k)}catch{K(e,_,"Invalid Sec-WebSocket-Extensions header");return}let ie=Object.keys(R);if(ie.length!==1||ie[0]!==Fe.extensionName){K(e,_,"Server indicated an extension that was not requested");return}try{A.accept(R[Fe.extensionName])}catch{K(e,_,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Fe.extensionName]=A}e.setSocket(_,h,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(f,e):f.end()}function No(e,t){e._readyState=C.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function n_(e){return e.path=e.socketPath,Hu.connect(e)}function o_(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Hu.isIP(e.host)?"":e.host),jS.connect(e)}function K(e,t,r){e._readyState=C.CLOSING;let n=new Error(r);Error.captureStackTrace(n,K),t.setHeader?(t[Fu]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(No,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function sa(e,t,r){if(t){let n=KS(t)?t.size:t_(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${be[e.readyState]})`);process.nextTick(r,n)}}function s_(e,t){let r=this[O];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[O]!==void 0&&(r._socket.removeListener("data",Oo),process.nextTick(ju,r._socket),e===1005?r.close():r.close(e,t))}function i_(){let e=this[O];e.isPaused||e._socket.resume()}function a_(e){let t=this[O];t._socket[O]!==void 0&&(t._socket.removeListener("data",Oo),process.nextTick(ju,t._socket),t.close(e[YS])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function Mu(){this[O].emitClose()}function l_(e,t){this[O].emit("message",e,t)}function c_(e){let t=this[O];t._autoPong&&t.pong(e,!this._isServer,Du),t.emit("ping",e)}function d_(e){this[O].emit("pong",e)}function ju(e){e.resume()}function u_(e){let t=this[O];t.readyState!==C.CLOSED&&(t.readyState===C.OPEN&&(t._readyState=C.CLOSING,$u(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function $u(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function Bu(){let e=this[O];if(this.removeListener("close",Bu),this.removeListener("data",Oo),this.removeListener("end",Gu),e._readyState=C.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[O]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",Mu),e._receiver.on("finish",Mu))}function Oo(e){this[O]._receiver.write(e)||this.pause()}function Gu(){let e=this[O];e._readyState=C.CLOSING,e._receiver.end(),this.end()}function Vu(){let e=this[O];this.removeListener("error",Vu),this.on("error",Du),e&&(e._readyState=C.CLOSING,this.destroy())}});var Yu=$((qE,Ju)=>{"use strict";var zE=Mo(),{Duplex:m_}=require("stream");function zu(e){e.emit("close")}function p_(){!this.destroyed&&this._writableState.finished&&this.destroy()}function qu(e){this.removeListener("error",qu),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function g_(e,t){let r=!0,n=new m_({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(zu,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(zu,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",p_),n.on("error",qu),n}Ju.exports=g_});var ia=$((JE,Xu)=>{"use strict";var{tokenChars:f_}=Vt();function h_(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&f_[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}Xu.exports={parse:h_}});var om=$((XE,nm)=>{"use strict";var y_=require("events"),Ho=require("http"),{Duplex:YE}=require("stream"),{createHash:A_}=require("crypto"),Zu=To(),ct=Gt(),S_=ia(),__=Mo(),{CLOSE_TIMEOUT:b_,GUID:v_,kWebSocket:w_}=Ae(),W_=/^[+/0-9A-Za-z]{22}==$/,Qu=0,em=1,rm=2,aa=class extends y_{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:b_,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:__,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Ho.createServer((n,o)=>{let s=Ho.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=E_(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=Qu}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===rm){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Fr,this);return}if(t&&this.once("close",t),this._state!==em)if(this._state=em,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Fr,this):process.nextTick(Fr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Fr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",tm);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){dt(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){dt(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!W_.test(s)){dt(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){dt(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Ur(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=S_.parse(c)}catch{dt(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let m=t.headers["sec-websocket-extensions"],y={};if(this.options.perMessageDeflate&&m!==void 0){let v=new ct({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let A=Zu.parse(m);A[ct.extensionName]&&(v.accept(A[ct.extensionName]),y[ct.extensionName]=v)}catch{dt(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let v={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(v,(A,f,l,_)=>{if(!A)return Ur(r,f||401,l,_);this.completeUpgrade(y,s,d,t,r,n,o)});return}if(!this.options.verifyClient(v))return Ur(r,401)}this.completeUpgrade(y,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[w_])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>Qu)return Ur(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${A_("sha1").update(r+v_).digest("base64")}`],m=new this.options.WebSocket(null,void 0,this.options);if(n.size){let y=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;y&&(d.push(`Sec-WebSocket-Protocol: ${y}`),m._protocol=y)}if(t[ct.extensionName]){let y=t[ct.extensionName].params,v=Zu.format({[ct.extensionName]:[y]});d.push(`Sec-WebSocket-Extensions: ${v}`),m._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",tm),m.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(m),m.on("close",()=>{this.clients.delete(m),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Fr,this)})),a(m,o)}};nm.exports=aa;function E_(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Fr(e){e._state=rm,e.emit("close")}function tm(){this.destroy()}function Ur(e,t,r,n){r=r||Ho.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Ho.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function dt(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,dt),e.emit("wsClientError",i,r,t)}else Ur(r,n,o,s)}});var k_,L_,x_,R_,C_,P_,sm,T_,jr,im=u(()=>{k_=g(Yu(),1),L_=g(To(),1),x_=g(Gt(),1),R_=g(Xi(),1),C_=g(ea(),1),P_=g(ia(),1),sm=g(Mo(),1),T_=g(om(),1),jr=sm.default});var la=u(()=>{"use strict"});var ve,$r=u(()=>{"use strict";ve=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Yt,ut,am,N_,ca,da,lm,cm,dm,um,ua,ma=u(()=>{"use strict";Yt=g(require("node:fs")),ut=g(require("node:os")),am=g(require("node:path"));la();$r();N_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ca=(e=ut.default.hostname())=>am.default.join(ut.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),da=e=>{if(!Yt.default.existsSync(e))return null;try{let t=JSON.parse(Yt.default.readFileSync(e,"utf8"));return!N_(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},lm=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},cm=(e,t)=>{Yt.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},dm=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ca(),n=da(r);if(n!==null&&n.pid!==process.pid&&ve(n.pid)&&lm(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:ut.default.hostname(),macOsUsername:ut.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return cm(r,o),{ok:!0}},um=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ca(),n=da(r);return n!==null&&n.pid!==process.pid&&ve(n.pid)&&lm(n)?{ok:!1}:(cm(r,{hostname:ut.default.hostname(),macOsUsername:ut.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ua=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??ca();da(r)?.pid===process.pid&&Yt.default.existsSync(r)&&Yt.default.unlinkSync(r)}});var pa,Br,O_,M_,H_,D_,mm,pm=u(()=>{"use strict";pa=require("node:child_process"),Br=g(require("node:path"));$r();bt();O_=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),M_=(e,t)=>{if(O_(e)||!/\bnode\b/.test(e))return!1;let r=Br.default.resolve(t),n=Br.default.join(r,"app",ge),o=Br.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ge||i==="agent-witch.ts")return e.includes(r);try{let a=Br.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},H_=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,pa.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},D_=(e,t,r)=>{let n=H_(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||M_(d,t)&&o.push(c)}return o},mm=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,pa.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=D_(r,e.installDir,t),o=[];for(let s of n)if(ve(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var Gr,Vr,gm,F_,fm,hm=u(()=>{"use strict";Gr=g(require("node:fs")),Vr=g(require("node:path"));x();gm=(e,t)=>{!Gr.default.existsSync(e)||Gr.default.existsSync(t)||(Gr.default.mkdirSync(Vr.default.dirname(t),{recursive:!0}),Gr.default.renameSync(e,t))},F_=e=>{if(e.profileEmail===null)return;let t=Vr.default.join(e.installDir,fe);gm(Vr.default.join(t,wn),e.mainLogPath),gm(Vr.default.join(t,Wn),e.errorLogPath)},fm=e=>{let t=L();e!==void 0&&t.installDir!==e||F_(t)}});var ym,Am,Sm,_m,bm=u(()=>{"use strict";ym=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Am=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?ym(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?ym(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Sm=e=>{let t=e.watchdogLogs.map(Am).join(""),r=e.updateLogs.map(Am).join("");return`<!doctype html>
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
</html>`},_m=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var vm,wm,Wm=u(()=>{"use strict";vm=g(require("node:net")),wm=()=>new Promise((e,t)=>{let r=vm.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var Em,U_,km,Lm=u(()=>{"use strict";Em=g(require("node:net"));Wm();Dt();po();x();U_=e=>new Promise(t=>{let r=Em.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),km=async()=>{let e=w(),t=te();if(await U_(t))return md(t),t;let r=await wm();return mo(e,r),r}});var j_,xm,Rm=u(()=>{"use strict";j_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xm=e=>({force:j_(e)&&e.force===!0})});var ga,$_,mt,Do=u(()=>{"use strict";ga=g(require("node:os")),$_=e=>{let t=e.trim();return t.startsWith("~/")?`${ga.default.homedir()}${t.slice(1)}`:t==="~"?ga.default.homedir():t},mt=$_});var pt,Ue,Kr=u(()=>{"use strict";pt=g(require("node:path"));kt();Do();Ue=e=>{let t=mt(e),r=pt.default.join(t,Yl);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:pt.default.join(r,"rag"),memoryDirPath:pt.default.join(r,Xl),reportsDirPath:pt.default.join(r,Ql),metaFilePath:pt.default.join(r,Zl),ragChunksFilePath:pt.default.join(r,"rag",Tn)}}});var me,Pm,B_,G_,we,zr=u(()=>{"use strict";me=g(require("node:fs")),Pm=g(require("node:path"));kt();Kr();B_=(e,t)=>{if(me.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};me.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},G_=e=>{me.default.existsSync(e.ragChunksFilePath)||me.default.writeFileSync(e.ragChunksFilePath,"");let t=Pm.default.join(e.memoryDirPath,In);me.default.existsSync(t)||me.default.writeFileSync(t,"")},we=e=>{let t=Ue(e.projectFolderPath);return me.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),me.default.mkdirSync(t.ragDirPath,{recursive:!0}),me.default.mkdirSync(t.memoryDirPath,{recursive:!0}),B_(t,e),G_(t),{ok:!0,layout:t}}});var V_,Tm,Im=u(()=>{"use strict";zr();V_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tm=e=>{if(!V_(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:we({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Om,q_,Nm,T,K_,z_,fa,Mm=u(()=>{"use strict";Om=g(require("node:http"));Ui();fi();bm();Lm();Rm();Pn();Im();Fn();_t();q_={},Nm=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},T=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},K_=e=>{e.writeHead(403),e.end()},z_=async(e,t,r)=>{let n=e.headers.origin,o=ld(n);try{if(n!==void 0&&n.length>0&&!o.allowed){K_(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){T(t,200,Pi(),o.headers);return}if(e.method==="GET"&&s==="/identity"){T(t,200,Ti(),o.headers);return}if(e.method==="GET"&&s==="/local"){let i=vo(50),a=wo(50);t.writeHead(200,_m()),t.end(Sm({port:r,watchdogLogs:i,updateLogs:a}));return}if(e.method==="GET"&&s==="/watchdog/status"){let i=await Ni();T(t,200,i,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let i=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:vo(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let i=await Oi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/restart"){let i=await Mi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let i=Hi();T(t,200,{ok:!0,...i},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let i=new URL(e.url??"/update/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:wo(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let i=await Nm(e),{force:a}=xm(i),c=await Di({force:a});T(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let i=await Fi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/wake"){let i=await Ii();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=bo(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let i=await Nm(e),a=Tm(i);T(t,a.ok?200:400,a,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=bo(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){T(t,200,Ci(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=xi(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await Ri(a);T(t,c.ok?200:503,c,o.headers);return}T(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{T(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},fa=async()=>{let e=await km(),t=Om.default.createServer((r,n)=>{z_(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!ae()&&Lt(q_.url)&&(async()=>{Et("agent-witch-wake-server");let e=await fa(),t=Cn(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var ha,Hm=u(()=>{"use strict";vr();co();ot();ha=async()=>{let e=F();if(e===null)return;let t=Te(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Ht(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Dm,Fm=u(()=>{"use strict";la();Mm();ma();Hm();Dm=async(e={})=>{let t=await fa();ha();let r=setInterval(()=>{ha()},6e4),n=setInterval(()=>{if(!um().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var qr,Fo,X_,Um,jm,Uo,$m,Bm,ya,Gm,jo,Vm=u(()=>{"use strict";qr=g(require("node:fs")),Fo=g(require("node:path")),X_="pending-run-inputs.json",Um=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jm=e=>{let t=e.profileEmail?Fo.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Fo.default.join(t,X_)},Uo=e=>{let t=jm(e);if(!qr.default.existsSync(t))return{};try{let r=JSON.parse(qr.default.readFileSync(t,"utf8"));return Um(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!Um(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},$m=(e,t)=>{let r=jm(e);qr.default.mkdirSync(Fo.default.dirname(r),{recursive:!0}),qr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Bm=e=>Object.values(Uo(e)),ya=(e,t)=>Uo(e)[t]!==void 0,Gm=(e,t)=>{let r=Uo(e);r[t.agentRunId]=t,$m(e,r)},jo=(e,t)=>{let r=Uo(e);delete r[t],$m(e,r)}});var Aa,Km=u(()=>{"use strict";Aa={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var Sa,zk,zm=u(()=>{"use strict";Sa={OPEN:"open",APPROVAL:"approval"},zk=Sa.APPROVAL});var Xt,$o,qm,Z_,Jm,Ym,Xm,Bo,Zm,_a=u(()=>{"use strict";Xt=g(require("node:fs")),$o=g(require("node:path")),qm="runs",Z_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jm=e=>{let t=e.profileEmail!==null?$o.default.join(e.installDir,"profiles",e.profileEmail,qm):$o.default.join(e.installDir,qm);return Xt.default.mkdirSync(t,{recursive:!0}),t},Ym=(e,t)=>$o.default.join(Jm(e),`${t}.json`),Xm=(e,t)=>{Xt.default.writeFileSync(Ym(e,t.id),JSON.stringify(t,null,2))},Bo=(e,t)=>{let r=Ym(e,t);if(!Xt.default.existsSync(r))return null;try{let n=JSON.parse(Xt.default.readFileSync(r,"utf8"));return!Z_(n)||typeof n.id!="string"?null:n}catch{return null}},Zm=e=>{let t=Jm(e),r=Xt.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Bo(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var Q_,Qm,ep=u(()=>{"use strict";Km();zm();_a();Q_=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?Aa.COMPLETED:Aa.FAILED,dispatchPolicy:Sa.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},Qm=(e,t)=>{let r=Q_(t);return Xm(e,r),r}});var Jr,Go,eb,ba,tp,rp,np,va,op=u(()=>{"use strict";Jr=g(require("node:fs")),Go=g(require("node:path"));wr();eb="run-completion-outbox.json",ba=e=>{let t=e.profileEmail?Go.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Go.default.join(t,eb)},tp=e=>{let t=ba(e);if(!Jr.default.existsSync(t))return[];try{let r=JSON.parse(Jr.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},rp=(e,t)=>{Jr.default.mkdirSync(Go.default.dirname(ba(e)),{recursive:!0}),Jr.default.writeFileSync(ba(e),JSON.stringify(t,null,2),"utf8")},np=(e,t)=>{let r=[...tp(e).filter(n=>n.runId!==t.runId),t];rp(e,r)},va=async e=>{if(e.cloudApi===null)return;let t=tp(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Jn(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);rp(e.layout,r)}});var sp=u(()=>{"use strict"});var wa,Yr,rb,gt,ip=u(()=>{"use strict";sp();wa=new Map,Yr=e=>{let t=wa.get(e);t!==void 0&&(clearInterval(t),wa.delete(e))},rb=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},gt=(e,t,r,n={})=>{Yr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Yr(t);return}let i=n.onTick?.()??{};rb(e,t,o,i)};s(),wa.set(t,setInterval(s,15e3))}});var Wa,Xr,ft,ap,je,lp,Vo=u(()=>{"use strict";Wa=new Set,Xr=new Map,ft=(e,t)=>{if(t.length===0)return;let r=Xr.get(e)??[];r.push(t),Xr.set(e,r)},ap=e=>{Wa.add(e);let t=Xr.get(e)??[];return Xr.delete(e),t},je=e=>Wa.has(e),lp=e=>{Wa.delete(e),Xr.delete(e)}});var cp,dp,up,mp,j,Zt,pp,gp,Zr,fp,hp,Ea,yp,Ap,Sp,Ko=u(()=>{"use strict";cp=require("node:crypto"),dp=g(require("node:fs")),up=g(require("node:path")),mp=require("node:url");$r();_t();Es();j=new Map,pp=async()=>{if(Zt!==void 0)return Zt;try{if(ae()){let e=vn(),t=up.default.join(e,"deps","node-pty","lib","index.js");if(dp.default.existsSync(t)){let r=await import((0,mp.pathToFileURL)(t).href);return Zt=r,r}}return Zt=await import("node-pty"),Zt}catch{return Zt=null,null}},gp=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},Zr=(e,t,r)=>{let n=j.get(e);if(n!==void 0){j.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},fp=(e,t)=>{let r=j.get(e);return r===void 0?!1:(r.pty.write(t),!0)},hp=(e,t,r)=>{let n=j.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Ea=e=>{for(let t of j.values())if(!(t.mode!=="agent"||t.runId!==e))return ve(t.pty.pid);return!1},yp=e=>{for(let[t,r]of j.entries())if(!(r.mode!=="agent"||r.runId!==e)){j.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Ap=async e=>{let t=await pp();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;j.get(e.shellSessionId)!==void 0&&Zr(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return j.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{gp(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{j.get(e.shellSessionId)?.pty===o&&(j.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Sp=async e=>{let t=e.shellSessionId??(0,cp.randomUUID)(),r=await pp();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return j.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{gp(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{j.get(t)?.pty===n&&(j.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var zo,_p,bp=u(()=>{"use strict";zo="[[AWAITING_INPUT]]",_p=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",zo,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Qr,vp,qo=u(()=>{"use strict";bp();Qr=e=>{let t=e.indexOf(zo);if(t<0)return null;let n=e.slice(t+zo.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},vp=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",_p].join(`
`)});var wp,Wp=u(()=>{"use strict";Vo();Ko();qo();wp=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(je(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}ft(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Sp({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=Qr(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var Ep,kp,Lp,$e,Jo=u(()=>{"use strict";Ep=require("node:child_process"),kp=g(require("node:fs")),Lp=g(require("node:path"));bt();$e=(e,t)=>{let r=Lp.default.join(e,"app",xl,"ensure-writer.sh");return kp.default.existsSync(r)?new Promise((n,o)=>{let s=(0,Ep.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var xp,ht,Xo,Rp,Cp,Yo,Pp,Zo,Tp,Ip,nb,en,ob,sb,Np,ka=u(()=>{"use strict";xp=require("node:child_process");et();Jo();kr();rt();Me();nt();ht=new Map,Xo=e=>e==="cursor"||e==="antigravity",Rp=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Cp=e=>ht.get(e)?.warmed===!0,Yo=e=>{let t=ht.get(e);ht.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Pp=e=>ht.get(e)?.conversationStarted===!0,Zo=e=>{let t=ht.get(e);ht.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Tp=e=>{ht.delete(e)},Ip=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",nb={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},en=e=>`${nb[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,ob=(e,t,r,n)=>new Promise(o=>{let s=zc(t,r),i=[],a=(0,xp.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let m=d.toString("utf8");i.push(m),n?.(m)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),sb=(e,t)=>{let r=en(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Np=async e=>{if(!H(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&V(e.runConfig.writerExecutionBackend)==="api"){let r=Ne(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=ee(e.runConfig.layout.configPath);return Oe(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),Yo(e.writerAgent),{exitCode:0,output:en(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await $e(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Xo(e.writerAgent)&&Yo(e.writerAgent);let t=await ob(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?sb(e.writerAgent,t.output):en(e.writerAgent)}}});var Op,tn,M,La,Mp,Hp,xa,Dp,Fp,Up,ib,oe,rn,Be,jp,ab,lb,Ra,$p,Bp,Gp,Vp=u(()=>{"use strict";Op=require("node:child_process");et();Vm();ep();op();ip();$r();Vo();Ko();qo();Wp();ka();Zs();si();Me();pr();qo();tn=new Map,M=new Map,La=new Set,Mp=130,Hp=`

Stopped by user.`,xa=null,Dp=e=>{xa=e},Fp=async e=>{await va({layout:e,cloudApi:xa})},Up=e=>{let t=tn.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:ve(t.pid)},ib=e=>Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),oe=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},rn=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Mn(s),c=M.get(r);if(a!==null&&c!==void 0){let d=dc(a),m=Up(r)||Ea(r);d!==null&&!m&&Be(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return cc(a)}}),Be=(e,t,r,n,o,s,i,a)=>{let c=o,d=Xn(s,a);r!==void 0&&La.has(r)&&(La.delete(r),c=Mp,d=d.trim().length>0&&!d.includes("Stopped by user.")?`${d.trim()}${Hp}`:"Stopped by user."),r!==void 0&&(Yr(r),je(r)&&(oe(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),lp(r)),Qm(e.layout,{agentRunId:r,originalPrompt:i,exitCode:c,output:d,layout:e.layout}),np(e.layout,{runId:r,exitCode:c,output:d,createdAt:new Date().toISOString()}),va({layout:e.layout,cloudApi:xa}),M.delete(r),tn.delete(r),jo(e.layout,r)),oe(t,{type:"command.claude.result",payload:{exitCode:c,output:d,...r!==void 0?{agentRunId:r}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n})},jp=(e,t,r,n,o,s,i)=>{let a=M.get(r),c=a?.accumulatedOutput??s;Gm(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),gt(t,r,()=>ya(e.layout,r),rn(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),oe(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},ab=(e,t,r,n,o,s,i)=>{let a=[],c=!1,d=m=>{if(!(o===void 0||m.length===0)){if(je(o)){oe(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:m},requestId:n});return}ft(o,m)}};if(o!==void 0){let m=M.get(o);tn.set(o,t),M.set(o,{originalPrompt:s,writerAgent:i,projectFolderPath:m?.projectFolderPath,reportKey:m?.reportKey,accumulatedOutput:m?.accumulatedOutput??""}),oe(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),gt(r,o,()=>Up(o),rn(e,r,o,n,m?.projectFolderPath,m?.reportKey))}t.stdout?.on("data",m=>{let y=m.toString("utf8");if(a.push(y),d(y),c||o===void 0)return;let v=Qr(a.join(""));if(v!==null){c=!0,t.kill("SIGTERM");let A=M.get(o),f=[A?.accumulatedOutput??"",v.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),tn.delete(o),jp(e,r,o,n,v.question,f,s)}}),t.stderr?.on("data",m=>{let y=m.toString("utf8");a.push(y),d(y)}),t.on("close",m=>{if(c)return;Zo(i);let y=o!==void 0?M.get(o):void 0,v=a.join("").trim(),A=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${v}`.trim():v;Be(e,r,o,n,m??-1,A,s)}),t.on("error",m=>{c||Be(e,r,o,n,-1,m.message,s)})},lb=(e,t,r,n,o,s,i,a)=>{s!==void 0&&(M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),oe(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),gt(o,s,()=>M.has(s),rn(e,o,s,n,i,a))),so(e,t,r,d=>{if(!(s===void 0||d.length===0)){if(je(s)){oe(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:d},requestId:n});return}ft(s,d)}}).then(d=>{Zo(t),Be(e,o,s,n,d.exitCode,d.output,r,d.llmUsage)}).catch(d=>{let m=d instanceof Error?d.message:String(d);Be(e,o,s,n,-1,m,r)})},Ra=(e,t,r,n,o,s,i,a,c,d)=>{if(oo(e,t)){lb(e,t,r,n,o,s,c,d);return}let m=Tt(t,r,ib(e),i);if(m===null){Be(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let y=()=>{let v=(0,Op.spawn)(m.command,[...m.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});ab(e,v,o,n,s,r,t)};if(s===void 0){y();return}M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:M.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Hn({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),gt(o,s,()=>M.has(s),rn(e,o,s,n,c,d)),wp({socket:o,sendMessage:oe,requestId:n,agentRunId:s,shellSessionId:a,command:m.command,args:m.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:v=>{a!==void 0&&Zr(a,l=>{oe(o,l)},n);let A=M.get(s),f=[A?.accumulatedOutput??"",v.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),jp(e,o,s,n,v.question,f,r)},onFinished:(v,A)=>{Zo(t);let f=M.get(s),l=f!==void 0&&f.accumulatedOutput.length>0?`${f.accumulatedOutput}

${A}`.trim():A;Be(e,o,s,n,v,l,r)}}).then(v=>{if(!v){y();return}gt(o,s,()=>Ea(s),rn(e,o,s,n,c,d))}).catch(v=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",v instanceof Error?v.message:v),y()})},$p=(e,t,r,n)=>{jo(e.layout,t.agentRunId),t.shellSessionId!==void 0&&oe(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=vp(t),s=M.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Ra(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c)},Bp=(e,t)=>{for(let r of Bm(e.layout))M.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),gt(t,r.agentRunId,()=>ya(e.layout,r.agentRunId),{awaitingInput:!0}),oe(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Gp=(e,t,r,n)=>{let o=M.get(r);if(o===void 0)return!1;La.add(r),Yr(r);let s=tn.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(yp(r))return!0;jo(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${Hp}`:"Stopped by user.";return Be(e,t,r,n,Mp,i,o.originalPrompt),!0}});var cb,Kp,zp=u(()=>{"use strict";Dt();cb=()=>`http://127.0.0.1:${te()}/restart`,Kp=async()=>{try{let e=await fetch(cb(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var yt,Ca,db,ub,Pa,At,Qo,qp,es=u(()=>{"use strict";yt=g(require("node:fs")),Ca=g(require("node:path")),db="local-ws-traffic.ndjson",ub=500,Pa=e=>Ca.default.join(e.logsDir,db),At=(e,t)=>{let r=Pa(e);yt.default.mkdirSync(Ca.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});yt.default.appendFileSync(r,`${n}
`,"utf8")},Qo=(e,t=ub)=>{let r=Pa(e);if(!yt.default.existsSync(r))return[];let o=yt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},qp=e=>{let t=Pa(e);yt.default.existsSync(t)&&yt.default.writeFileSync(t,"","utf8")}});var mb,ts,Ta=u(()=>{"use strict";Dt();mb=()=>`http://127.0.0.1:${te()}/update/run`,ts=async e=>{try{let t=await fetch(mb(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Jp,Yp=u(()=>{"use strict";Jp=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var nn,pb,Xp,Zp=u(()=>{"use strict";es();Xe();Ta();Yp();nn=(e,t)=>{At(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},pb=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ct(),Gn)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Xp=async e=>{let t=G(e.layout.installDir)?.bundleVersion??null;if(!Jp({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),nn(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await ts({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),nn(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await pb();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),nn(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),nn(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),nn(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var gb,Qp,eg=u(()=>{"use strict";gb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qp=e=>{if(!gb(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var tg,rg,ng=u(()=>{"use strict";Js();co();tg=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=qn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},rg=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Ht(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Y,fb,hb,yb,og,sg,ig,ag,lg,cg,dg=u(()=>{"use strict";Y=require("node:crypto"),fb=Buffer.from("302a300506032b6570032100","hex"),hb=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},yb=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Y.createPublicKey)({key:Buffer.concat([fb,t]),format:"der",type:"spki"})},og=()=>{let{publicKey:e,privateKey:t}=(0,Y.generateKeyPairSync)("ed25519");return{publicKeyRaw:hb(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},sg=e=>(0,Y.createPrivateKey)(e),ig=(e,t)=>(0,Y.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),ag=(e,t,r)=>{try{let n=yb(e);return(0,Y.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},lg=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,cg=()=>(0,Y.randomBytes)(32).toString("base64url")});var We,rs,ug,Ab,Sb,Ia,mg,pg,Na=u(()=>{"use strict";We=g(require("node:fs")),rs=g(require("node:path"));dg();x();ug=e=>rs.default.join(e.installDir,vt),Ab=(e,t)=>{if(e.profileEmail===null||t===ug(e)||We.default.existsSync(t))return;let r=ug(e);We.default.existsSync(r)&&(We.default.mkdirSync(rs.default.dirname(t),{recursive:!0}),We.default.renameSync(r,t))},Sb=e=>{if(!We.default.existsSync(e))return null;try{let t=We.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Ia=e=>{let t=Hl(e);Ab(e,t);let r=Sb(t);if(r!==null)return r;let n=og();return We.default.mkdirSync(rs.default.dirname(t),{recursive:!0}),We.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},mg=e=>{let t=Ia(e.layout),r=cg(),n=lg({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=sg(t.privateKeyPem),s=ig(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},pg=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return ag(e.serverPublicKey,t,e.serverAttestation)}});var ns,Oa=u(()=>{"use strict";ns={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var _b,gg,bb,fg,hg=u(()=>{"use strict";Oa();_b=new Set(Object.values(ns)),gg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bb=e=>{if(!gg(e))return!1;let t=e.type;return!(typeof t!="string"||!_b.has(t)||e.payload!==void 0&&!gg(e.payload)||e.requestId!==void 0&&typeof e.requestId!="string")},fg=bb});var vb,yg,Ag,Sg=u(()=>{"use strict";hg();Oa();vb=new Set(Object.values(ns)),yg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ag=e=>{if(!yg(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;return typeof t!="string"?{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e}:vb.has(t)?e.payload!==void 0&&!yg(e.payload)?{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:e.requestId!==void 0&&typeof e.requestId!="string"?{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e}:fg(e)?{formatOk:!0,formatError:null,command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}}});var _g,bg=u(()=>{"use strict";_g=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var wb,Wb,Eb,on,vg=u(()=>{"use strict";bg();wb=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Wb=e=>wb.test(e),Eb=e=>_g(e),on=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>on(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&Wb(n)){r[n]=Eb(o);continue}r[n]=on(o)}return r}});var pe,Ma,kb,Lb,xb,Ha,wg,Wg,Eg,Rb,Da,Qt,Fa,kg,os=u(()=>{"use strict";pe=g(require("node:fs")),Ma=g(require("node:path"));Sg();vg();kb="local-ws-trace.ndjson",Lb=1e4,xb=1440*60*1e3,Ha=e=>Ma.default.join(e.logsDir,kb),wg=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},Wg=e=>{if(!pe.default.existsSync(e))return;let t=pe.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-xb,o=t.filter(s=>{let i=wg(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-Lb);pe.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},Eg=(e,t)=>{let r=Ha(e);pe.default.mkdirSync(Ma.default.dirname(r),{recursive:!0}),pe.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),Wg(r)},Rb=e=>e.parsed===null?{_empty:!0}:on(e.parsed),Da=(e,t,r)=>{let n=Ag(r);Eg(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:Rb(n)})},Qt=(e,t)=>{Eg(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:on({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Fa=(e,t=80)=>{let r=Ha(e);if(Wg(r),!pe.default.existsSync(r))return[];let n=pe.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=wg(s);i!==null&&o.push(i)}return o.reverse()},kg=e=>{let t=Ha(e);pe.default.existsSync(t)&&pe.default.writeFileSync(t,"","utf8")}});var Lg,xg,Rg=u(()=>{"use strict";os();Lg=!1,xg=e=>{Lg||(Lg=!0,process.on("uncaughtException",t=>{Qt(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;Qt(e,{kind:"crash",message:r,stack:n})}))}});var Cb,Cg,Pg=u(()=>{"use strict";Cb="local.agentwitch.com",Cg=`http://${Cb}:43347`});var St,Pb,Tg,Ig=u(()=>{"use strict";St=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pb=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Tg=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${St(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?St(r.direction):St(r.kind),i=`trace-body-${n}`,a=St(Pb(r.body));return`<tr>
        <td title="${St(r.at)}">${St(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${St(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var sn,ss,Tb,Ib,Nb,Ob,Ng,Mb,Hb,Og,an,Mg,ln,Hg,Ua=u(()=>{"use strict";sn=g(require("node:fs")),ss=g(require("node:path"));kt();Kr();Tb="rag",Ib="http://127.0.0.1:11434",Nb="nomic-embed-text",Ob=e=>ss.default.join(e.installDir,Tb),Ng=(e,t)=>t!==void 0&&t.trim().length>0?Ue(t).ragChunksFilePath:ss.default.join(Ob(e),Tn),Mb=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},Hb=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},Og=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Ib,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Nb;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},an=(e,t)=>{let r=Ng(e,t);if(!sn.default.existsSync(r))return[];let n=sn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Mg=async e=>{let t=Hb(e.text);if(t.length===0)return 0;let r=Ng(e.layout,e.projectFolderPath);sn.default.mkdirSync(ss.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await Og(o);if(s===null)continue;let i={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};sn.default.appendFileSync(r,`${JSON.stringify(i)}
`,"utf8"),n+=1}return n},ln=async e=>{let t=await Og(e.query);return t===null?[]:an(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:Mb(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Hg=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var Dg,Fg=u(()=>{"use strict";Dg=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Ug,is,jg,as=u(()=>{"use strict";Fg();Ug=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),is=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=Ug(e),r=Ug(Dg(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},jg=`(function () {
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
})();`});var er,$g,Bg=u(()=>{"use strict";er=(e,t,r)=>e===1?t:r,$g=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${er(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${er(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${er(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${er(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${er(d,"month","months")} ago`;let m=Math.floor(a/365);return`${m} ${er(m,"year","years")} ago`}});var ja,Gg,Vg=u(()=>{"use strict";ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gg=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${ja(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${ja(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${ja(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Kg,zg,qg,Jg=u(()=>{"use strict";Kg=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,zg=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,qg=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var tr,Yg,Xg=u(()=>{"use strict";as();tr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yg=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${tr(e.wakeError)}</div>`:"",a=is(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${tr(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${tr(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${tr(n)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${tr(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${tr(o)}</p>
      </a>
    </div>`}});var rr,Db,Zg,Qg=u(()=>{"use strict";rr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Db=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Zg=e=>{let t=Db.map(i=>`<option value="${rr(i.value)}">${rr(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${rr(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${rr(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${rr(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${rr(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var $a,ef,Ba=u(()=>{"use strict";$a=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},ef=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===$a(t)}});var X,Ga,Va,Ka,tf,rf=u(()=>{"use strict";Ba();Er();ri();X=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ga=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Va=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=$a(n);return`value="${X(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${X(r)}"`},Ka=(e,t,r,n)=>{let o=qc(e[t]?.model),s=new Set(ti[t].map(c=>c.value)),i=ti[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${X(c.value)}"${d}>${X(c.label)}</option>`}).join(""),a=o!==It&&!s.has(o)?`<option value="${X(o)}" selected>${X(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${X(n)}</span>
          <select class="input mono" name="${X(r)}">${i}${a}</select>
        </label>`},tf=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${X(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
          <span class="field-label">Anthropic API key \u2014 ${X(Ga(e.secrets,"anthropic"))}</span>
          <input class="input mono" type="password" name="anthropicApiKey" autocomplete="off" ${Va(e.secrets,"anthropic","sk-ant-\u2026")} />
        </label>
        ${Ka(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        <label class="field">
          <span class="field-label">OpenAI API key \u2014 ${X(Ga(e.secrets,"openai"))}</span>
          <input class="input mono" type="password" name="openaiApiKey" autocomplete="off" ${Va(e.secrets,"openai","sk-\u2026")} />
        </label>
        ${Ka(e.secrets,"openai","openaiModel","OpenAI model")}
        <label class="field">
          <span class="field-label">Google API key \u2014 ${X(Ga(e.secrets,"google"))}</span>
          <input class="input mono" type="password" name="googleApiKey" autocomplete="off" ${Va(e.secrets,"google","AI\u2026")} />
        </label>
        ${Ka(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var nf,of=u(()=>{"use strict";nf=`
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
`.trim()});var Fb,Ub,sf,af,lf=u(()=>{"use strict";of();as();Fb=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Ub=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],sf=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),af=e=>{let t=Ub.map(o=>{let s=o.href===e.activePath;return`<a class="nav-link${s?" is-active":""}" href="${o.href}"${s?' aria-current="page"':""}>${o.label}</a>`}).join(""),r=sf(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"";return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${sf(e.title)} \xB7 Agent Witch Local</title>
  <style>${nf}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${Fb}
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
  <script>${jg}</script>
</body>
</html>`}});var za,cf,df=u(()=>{"use strict";za=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cf=e=>{if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">Nothing in <code>~/.agent-witch</code> yet. Use <strong>Import</strong> below to scan a folder.</p>
    </section>`;let t=e.installed.sets.map(n=>`<li class="harness-installed-set">
          <span><strong>${za(n.name)}</strong> <span class="muted mono">(${za(n.slug)})</span></span>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join(""),r=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${za(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">${e.installed.sets.length} set(s) on this Mac. Link them to a repo under <a href="/projects">Projects</a>.</p>
      ${r}
      <ul class="harness-installed-set-list">${t}</ul>
    </section>`}});var jb,uf,mf,pf=u(()=>{"use strict";jb=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,uf=e=>e.kind==="folder",mf=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&uf(d)){s=d;continue}let m={kind:"folder",name:a,children:new Map};s.children.set(a,m),s=m}}let r=n=>{let o=[];for(let s of n.children.values()){if(uf(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(jb)};return r(t)}});var gf,qa,ff=u(()=>{"use strict";gf=g(require("node:path")),qa=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${qa(r.children,t)}</ul>
            </details>
          </li>`;let n=gf.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var hf,Ge,$b,Bb,ls,Gb,yf,Af=u(()=>{"use strict";hf=g(require("node:path"));df();pf();ff();Ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$b=()=>`(() => {
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

})();`,Bb=()=>`(() => {
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
})();`,ls=e=>{let t=cf({installed:e.installed}),r=e.flashError?`<div class="alert-error">${Ge(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ge(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Gb(e.reveal),o=e.reveal?.scanRoots[0]?.trim()??"",s=o.length>0&&e.scanFolder.trim()===o,i=!e.importSectionExpanded,a=i?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Ge(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Ge(o)}" />
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
    <script>${$b()}</script>
    <script>${Bb()}</script>`;return`${t}${r}${a}${c}`},Gb=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=mf(a.items.map(v=>({...v,relativePath:typeof v.relativePath=="string"&&v.relativePath.length>0?v.relativePath:hf.default.relative(a.sourceRoot,v.sourcePath).replaceAll("\\","/")}))),m=qa(d,Ge),y=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Ge(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Ge(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${y} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${m}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Ge(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},yf=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),m=a.trim();Number.isFinite(d)&&m.length>0&&o.set(d,m)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),m=d!==null&&Number.isFinite(d)?o.get(d):void 0,y=e.get(`setName-${i}`)?.trim()??m??a,v=t.sets[i];if(v===void 0)continue;let A=a.length>0?a:v.proposedSlug,f=y.length>0?y:v.proposedName,l=r.size===0||r.has(i),_=v.items.map(h=>({id:h.id,kind:h.kind,title:h.title,sourcePath:h.sourcePath,include:l}));s.push({slug:A,name:f,items:_})}return s}});var cn,Ja,Sf,_f,Vb,cs,Kb,bf,Ya,vf=u(()=>{"use strict";cn=g(require("node:fs")),Ja=g(require("node:path")),Sf=require("node:crypto");Do();_f=e=>Ja.default.join(e.harnessRootDir,"projects-registry.json"),Vb=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),cs=e=>{let t=_f(e);if(!cn.default.existsSync(t))return[];try{let r=JSON.parse(cn.default.readFileSync(t,"utf8"));return Vb(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string"):[]}catch{return[]}},Kb=(e,t)=>{cn.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};cn.default.writeFileSync(_f(e),`${JSON.stringify(r,null,2)}
`)},bf=(e,t)=>{let r=mt(t.projectFolderPath),n=t.name?.trim()||Ja.default.basename(r)||"Project",o=cs(e),s=o.find(a=>mt(a.projectFolderPath)===r);if(s!==void 0)return s;let i={id:(0,Sf.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return Kb(e,[...o,i]),i},Ya=(e,t)=>cs(e).find(r=>r.id===t)??null});var wf,Wf=u(()=>{"use strict";wf=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var ds,Xa,dn,zb,Ee,us,nr=u(()=>{"use strict";ds=g(require("node:fs")),Xa=g(require("node:os")),dn=g(require("node:path")),zb=()=>ds.default.realpathSync(dn.default.resolve(Xa.default.homedir())),Ee=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?dn.default.join(Xa.default.homedir(),t.slice(1)):t,n;try{n=ds.default.realpathSync(dn.default.resolve(r))}catch{return null}let o=zb();return n===o||n.startsWith(`${o}${dn.default.sep}`)?n:null},us=e=>{let t=Ee(e);if(t===null)return null;try{if(!ds.default.statSync(t).isFile())return null}catch{return null}return t}});var se,or,un,qb,Jb,Yb,Ef,kf=u(()=>{"use strict";se=g(require("node:fs")),or=g(require("node:path"));Do();zr();Wf();nr();un=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qb=e=>{if(!se.default.existsSync(e))return null;try{let t=JSON.parse(se.default.readFileSync(e,"utf8"));if(un(t)&&t.version===1)return t}catch{return null}return null},Jb=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?or.default.join(e.harnessRootDir,n):or.default.join(e.harnessSetsDir,t,n);if(!se.default.existsSync(o))return null;try{if(!se.default.statSync(o).isFile())return null}catch{return null}return o},Yb=(e,t)=>{let r={};if(se.default.existsSync(e))try{let o=JSON.parse(se.default.readFileSync(e,"utf8"));un(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};se.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},Ef=e=>{let t=[...new Set(e.setSlugs.map(m=>m.trim()).filter(m=>m.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=mt(e.projectFolderPath),n=Ee(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=se.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=qb(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let i=un(s.sets)?s.sets:{},a=or.default.join(n,".cursor"),c=0;for(let m of t){let y=i[m];if(!un(y))return{ok:!1,errorMessage:`Harness set "${m}" is not installed locally.`};let v=Array.isArray(y.items)?y.items:[];for(let A of v){if(!un(A))continue;let f=typeof A.path=="string"?A.path.trim():"";if(f.length===0)continue;let l=wf(f);if(l===null)continue;let _=Jb(e.layout,m,f);if(_===null)continue;let h=or.default.join(a,l);se.default.mkdirSync(or.default.dirname(h),{recursive:!0}),se.default.copyFileSync(_,h),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let d=we({projectFolderPath:n});return Yb(d.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var Ve,Za,Lf=u(()=>{"use strict";Ve=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Za=e=>{let t=e.flashError?`<div class="alert-error">${Ve(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ve(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Ve(o.slug)}"${r.has(o.slug)?" checked":""} />
            <span><strong>${Ve(o.name)}</strong> <span class="muted mono">(${Ve(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Ve(e.project.name)}</h1>
      <p class="muted mono">${Ve(e.project.projectFolderPath)}</p>
      <p class="lede">Linked harness sets are copied into this project&apos;s <code>.cursor</code> folder and recorded in <code>.agent-witch/project.json</code>.</p>
      <form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ve(e.project.id)}" />
        <p class="field-label">Harness sets</p>
        ${n}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${e.installed.sets.length===0?" disabled":""}>Save linked harness</button>
        </div>
      </form>
    </section>`}});var ms,xf,Rf=u(()=>{"use strict";ms=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xf=e=>{let t=e.flashError?`<div class="alert-error">${ms(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ms(e.flashMessage)}</div>`:"",r=e.projects.length===0?'<p class="empty">No projects yet. Add a repo folder to link harness sets and run tasks in context.</p>':`<ul class="project-list">${e.projects.map(n=>`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${ms(n.name)}</strong>
                  <span class="muted mono">${ms(n.projectFolderPath)}</span>
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
    </section>`}});var Qa,el,Cf=u(()=>{"use strict";Qa=g(require("node:fs"));Kr();el=e=>{let t=Ue(e);if(!Qa.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse(Qa.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var rl,tl,sr,Pf=u(()=>{"use strict";rl=g(require("node:fs")),tl=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sr=e=>{if(!rl.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(rl.default.readFileSync(e.harnessManifestPath,"utf8"));if(!tl(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=tl(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!tl(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",m=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:m.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var nl,Tf=u(()=>{"use strict";nl=()=>"~"});var If,ol,Nf=u(()=>{"use strict";If=require("node:child_process"),ol=()=>{if(process.platform!=="darwin")return null;try{let t=(0,If.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var Of,Mf,Hf=u(()=>{"use strict";Of=require("node:crypto"),Mf=e=>`local-${(0,Of.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var sl,Df=u(()=>{"use strict";sl=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var mn,ps,il=u(()=>{"use strict";mn=g(require("node:path")),ps=e=>{let t=mn.default.dirname(e),r=mn.default.basename(t);return r==="agents"?mn.default.basename(mn.default.dirname(t)):r}});var pn,ke,Ff,Xb,Zb,Qb,gs,Uf,al=u(()=>{"use strict";pn=g(require("node:fs")),ke=g(require("node:path"));Hf();Df();il();Ff=new Set(["node_modules",".git","dist","build",".next","coverage"]),Xb=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Zb=(e,t)=>{let r=ke.default.basename(t);if(e==="skill"){let n=t.split(ke.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Qb=e=>{let t=[],r=(o,s)=>{let i;try{i=pn.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&Ff.has(a.name))continue;let c=ke.default.join(o,a.name),d=s?ke.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;sl(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=ke.default.join(e,o);pn.default.existsSync(s)&&r(s,o)}let n=ke.default.join(e,"skills");return pn.default.existsSync(n)&&r(n,"skills"),t},gs=e=>{let t=Qb(e);if(t.length===0)return null;let r=ke.default.dirname(e),n=ps(e),o=Xb(n),s=t.map(i=>{let a=sl(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:Mf(i.absolutePath),kind:a,title:Zb(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},Uf=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=pn.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||Ff.has(a.name))continue;let c=ke.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var jf,ll,ev,$f,Bf=u(()=>{"use strict";jf=g(require("node:fs")),ll=g(require("node:path"));al();nr();ev=e=>{let t=Ee(e.trim());if(t===null)return null;if(ll.default.basename(t)===".cursor")return t;let r=ll.default.join(t,".cursor");try{if(jf.default.statSync(r).isDirectory())return Ee(r)}catch{return null}return null},$f=e=>{let t=ev(e.projectPath);if(t===null)return null;let r=gs(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var Gf,tv,fs,Vf,Kf=u(()=>{"use strict";Gf=g(require("node:path"));al();nr();il();tv=5,fs=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Vf=e=>{let t=Ee(e.scanRoot.trim());if(t===null)return fs(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of Uf(t,tv,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Ee(s);if(i===null)continue;let a=ps(i);fs(e.response,"folder",{cursorDir:i,groupName:a,repoPath:Gf.default.dirname(i)});let c=gs(i);c!==null&&(r.push(c),fs(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return fs(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var zf,qf,Jf=u(()=>{"use strict";zf=g(require("node:path")),qf=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:zf.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var U,Yf,cl,rv,Xf,dl,ul,Zf,hs,Qf=u(()=>{"use strict";U=g(require("node:fs")),Yf=g(require("node:os")),cl=g(require("node:path"));yi();nr();Jf();rv=e=>{if(!U.default.existsSync(e))return null;try{let t=JSON.parse(U.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Xf=e=>{let t=e.hostname??Yf.default.hostname(),r=rv(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(m=>m.include);if(a.length===0)continue;let c=[];for(let m of a){let y=us(m.sourcePath);if(y===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${m.sourcePath}`};let v=U.default.readFileSync(y,"utf8");c.push({id:m.id,kind:m.kind,title:m.title,content:v,setSlugs:[i.slug]})}let d=go({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let m of d.directories)o.add(m);for(let m of d.files)s.push(m),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{U.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)U.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=cl.default.join(e.layout.harnessRootDir,i.relativePath);U.default.mkdirSync(cl.default.dirname(a),{recursive:!0}),U.default.writeFileSync(a,i.content)}return U.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},dl="reveal-cache.json",ul=(e,t)=>{U.default.mkdirSync(e.harnessRootDir,{recursive:!0}),U.default.writeFileSync(`${e.harnessRootDir}/${dl}`,`${JSON.stringify(t,null,2)}
`)},Zf=e=>{let t=`${e.harnessRootDir}/${dl}`;U.default.existsSync(t)&&U.default.unlinkSync(t)},hs=e=>{let t=`${e.harnessRootDir}/${dl}`;if(!U.default.existsSync(t))return null;try{let r=JSON.parse(U.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return qf(r)}catch{return null}return null}});var eh,th=u(()=>{"use strict";eh=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Ke,rh,nv,nh,ml,oh=u(()=>{"use strict";Ke=g(require("node:fs")),rh=g(require("node:path")),nv=256e3,nh=e=>{Ke.default.mkdirSync(rh.default.dirname(e),{recursive:!0}),Ke.default.writeFileSync(e,"","utf8")},ml=(e,t=nv)=>{if(!Ke.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Ke.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Ke.default.openSync(e,"r");try{Ke.default.readSync(a,i,0,s,o)}finally{Ke.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var sh,ih,pl,ah,lh=u(()=>{"use strict";sh=require("node:crypto"),ih=g(require("node:fs"));wr();io();et();ot();pl=!1,ah=async e=>{if(pl)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!H(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=F();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Pt({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&ih.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,sh.randomUUID)();pl=!0;try{if(await Vc(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Mt({...r,workspace:o},e.writerAgent,t);return await Jn(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{pl=!1}}});var ys,ch,dh=u(()=>{"use strict";ys=g(require("node:fs"));ni();ch=(e,t)=>{let r=no(e);ys.default.mkdirSync(e,{recursive:!0}),ys.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{ys.default.chmodSync(r,384)}catch{}}});var gn,ov,gl,uh,mh=u(()=>{"use strict";gn=g(require("node:fs"));rt();dh();Ba();Er();Me();ov=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gl=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=ef(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?Nt(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},uh=e=>{let t=ee(e.configPath),r={};if(gn.default.existsSync(e.configPath))try{let o=JSON.parse(gn.default.readFileSync(e.configPath,"utf8"));ov(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,gn.default.mkdirSync(t,{recursive:!0}),gn.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=gl(gl(gl(tt(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);ch(t,n)}});var ph,As,fl=u(()=>{"use strict";ph=g(require("node:path"));li();ci();ot();xt();x();As=e=>{let t=F()?.layout.installDir??w();if(ph.default.basename(t)===ao)return ii;let r=F(),n=r!==null?Q(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):ii}});var gh,fh=u(()=>{"use strict";Xe();Ct();fl();gh=async e=>{let t=G(e.installDir),r=t?.bundleVersion??null,n=As(t);try{let o=await $s(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Un(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var hh,yh=u(()=>{"use strict";hh=e=>!e});var Ah,Sh,_h=u(()=>{"use strict";Ta();Ah=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Sh=async()=>{let e=await ts({force:!0});if(e.ok)return{ok:!0,message:Ah(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:Ah(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ct(),Gn)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var vh,fn,wh,yl,bh,sv,hl,D,Al,N,z,ir,iv,av,Wh,Eh,kh=u(()=>{"use strict";vh=g(require("node:http")),fn=g(require("node:fs")),wh=g(require("node:path"));Pg();es();os();Ig();Ua();Pr();Ut();as();Bg();Vg();Jg();Xg();Qg();rf();lf();Af();vf();kf();Lf();Rf();Cf();Pf();Tf();Nf();Bf();nr();Kf();Qf();zr();th();oh();Xe();lh();ot();mh();rt();nt();Me();fl();fh();yh();_h();Na();yl=e=>$g(e)??"never",bh=48e3,sv=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0?!0:sr(e).sets.length===0,hl=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??nl(),reveal:t.reveal,installed:sr(e),flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),D=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Al={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},N=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Al}),e.end(JSON.stringify(r))},z=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},ir=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},iv=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${D(e.status.wakeError)}</div>`:"",o=hh(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${is(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${D(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${D(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${D(yl(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${D(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},av=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},Wh=e=>{let t=wh.default.join(e.layout.installDir,"link-code.txt"),r=()=>G(e.layout.installDir),n=()=>{let A=r();return{installBundleVersion:eh(A),installBundleUpdatedAt:A?.updatedAt??null,installVersion:A}},o=async A=>{let f=A.installVersion??r(),l=await i(),_=zg(l),h=qg(A.updateFlash??null);return af({title:A.title,activePath:A.activePath,body:A.body,cloudAppOrigin:As(f),prependBody:`${h}${_}`,headerUpdateButtonHtml:Kg(l)})},s=null,i=async()=>{let A=Date.now();if(s!==null&&A-s.cachedAtMs<6e4)return s.offer;let f=await gh(e.layout);return s={cachedAtMs:A,offer:f},f},a=()=>{s=null},c=!1,d=()=>{c||(c=!0,Sh().catch(A=>{console.error("[agent-witch-local-app] install bundle update failed:",A)}).finally(()=>{c=!1,a()}))},m=async A=>{if(a(),!(await i()).updateAvailable){A.writeHead(303,{Location:"/?update=ok"}),A.end();return}A.writeHead(303,{Location:"/?update=started"}),A.end(),d()},y=()=>{if(fn.default.existsSync(t))return fn.default.readFileSync(t,"utf8").trim();let A=Math.random().toString(36).slice(2,8).toUpperCase();return fn.default.writeFileSync(t,A,"utf8"),A},v=vh.default.createServer((A,f)=>{(async()=>{let l=A.url?.split("?")[0]??"/",_=A.method??"GET";if(_==="OPTIONS"){f.writeHead(204,Al),f.end();return}if(_==="GET"&&l==="/health"){let h=e.controllers.getStatus(),p=n();N(f,200,{ok:!0,...h,installBundleVersion:p.installBundleVersion,installBundleUpdatedAt:p.installBundleUpdatedAt});return}if(_==="GET"&&l==="/api/status"){let h=n();N(f,200,{...e.controllers.getStatus(),linkCode:y(),installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(_==="GET"&&l==="/api/traffic"){N(f,200,{entries:Qo(e.layout)});return}if(_==="DELETE"&&l==="/api/traffic"){qp(e.layout),N(f,200,{ok:!0});return}if(_==="GET"&&l==="/api/trace"){N(f,200,{entries:Fa(e.layout)});return}if(_==="DELETE"&&l==="/api/trace"||_==="POST"&&l==="/api/trace/clear"){if(kg(e.layout),_==="POST"){f.writeHead(303,{Location:"/status"}),f.end();return}N(f,200,{ok:!0});return}if(_==="POST"&&l==="/api/errors/clear"){nh(e.layout.errorLogPath),f.writeHead(303,{Location:"/errors"}),f.end();return}if(_==="GET"&&l==="/api/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(p.length>0){let S=await ln({layout:e.layout,query:p,limit:20});N(f,200,{chunks:S,query:p});return}N(f,200,{chunks:an(e.layout).slice(-50).reverse()});return}if(_==="POST"&&l==="/api/revive"){e.controllers.reviveWebSocket(),N(f,200,{ok:!0});return}if(_==="GET"&&l==="/api/update-status"){let h=await i();N(f,200,{ok:!0,...h});return}if((_==="GET"||_==="POST")&&l==="/api/update"){await m(f);return}if(_==="GET"&&l==="/"){let h=e.controllers.getStatus(),p=n(),S=sr(e.layout),b=ml(e.layout.errorLogPath);z(f,await o({title:"Home",activePath:"/",installVersion:p.installVersion,updateFlash:av(A.url??void 0),body:Yg({wsConnected:h.wsConnected,lastHeartbeatAt:h.lastHeartbeatAt,installBundleVersion:p.installBundleVersion,harnessSetCount:S.sets.length,knowledgeChunkCount:an(e.layout).length,trafficEntryCount:Qo(e.layout).length,wakeError:h.wakeError,errorLogByteSize:b.byteSize,errorLogExists:b.exists})}));return}if(_==="GET"&&l==="/task"){let h=e.controllers.getStatus(),p=n(),S=F(),b=new URL(A.url??"/",`http://127.0.0.1:${43347}`),W=b.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=b.searchParams.get("failed")==="1"?b.searchParams.get("error")?.trim()??"Task failed.":null,R=b.searchParams.get("runId");z(f,await o({title:"Task",activePath:"/task",installVersion:p.installVersion,body:Zg({defaultWorkspace:S?.workspace??"",wsConnected:h.wsConnected,flashMessage:W,flashError:k,lastRunId:R})}));return}if(_==="POST"&&l==="/task/dispatch"){let h=await ir(A),p=new URLSearchParams(h),S=p.get("prompt")?.trim()??"",b=p.get("writerAgent")?.trim()??"claude-cli",W=p.get("projectFolder")?.trim()??"",k=await ah({prompt:S,writerAgent:b,...W.length>0?{projectFolderPath:W}:{}}),R=new URLSearchParams;k.ok?R.set("ok","1"):(R.set("failed","1"),k.errorMessage!==void 0&&R.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&R.set("runId",k.agentRunId),f.writeHead(303,{Location:`/task?${R.toString()}`}),f.end();return}if(_==="GET"&&l==="/errors"){let h=n(),p=ml(e.layout.errorLogPath);z(f,await o({title:"Errors",activePath:"/errors",installVersion:h.installVersion,body:Gg({errorLogPath:e.layout.errorLogPath,content:p.content,exists:p.exists,truncated:p.truncated,byteSize:p.byteSize})}));return}if(_==="GET"&&l==="/status"){let h=e.controllers.getStatus(),p=re(e.layout),S=de(p,ce),b=n();z(f,await o({title:"Status",activePath:"/status",installVersion:b.installVersion,body:`${iv({status:h,stale:S,linkCode:y(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt})}${Tg({entries:Fa(e.layout)})}`}));return}if(_==="GET"&&l==="/traffic"){let h=Qo(e.layout),p=n(),S=h.map(W=>`<tr><td title="${D(W.at)}">${D(yl(W.at))}</td><td>${D(W.direction)}</td><td><code>${D(W.type)}</code></td><td>${D(W.summary)}</td><td>${D(W.action??"")}</td></tr>`).join(""),b=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${S}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';z(f,await o({title:"Traffic",activePath:"/traffic",installVersion:p.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${b}
            </section>`}));return}if(_==="GET"&&l==="/projects"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),S=h.searchParams.get("added")==="1"?"Project added.":null;z(f,await o({title:"Projects",activePath:"/projects",installVersion:p.installVersion,body:xf({projects:cs(e.layout),flashMessage:S})}));return}if(_==="GET"&&l==="/project"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=h.searchParams.get("id")?.trim()??"",S=Ya(e.layout,p);if(S===null){f.writeHead(404),f.end("Project not found");return}let b=n(),W=h.searchParams.get("linked")==="1"?`Harness linked (${h.searchParams.get("files")??"0"} file(s) written).`:null;z(f,await o({title:S.name,activePath:"/projects",installVersion:b.installVersion,body:Za({project:S,installed:sr(e.layout),linkedSetSlugs:el(S.projectFolderPath),flashMessage:W})}));return}if(_==="POST"&&l==="/projects/add"){let h=ol();if(h===null){f.writeHead(303,{Location:"/projects"}),f.end();return}we({projectFolderPath:h}),bf(e.layout,{projectFolderPath:h}),f.writeHead(303,{Location:"/projects?added=1"}),f.end();return}if(_==="POST"&&l==="/projects/link-harness"){let h=await ir(A),p=new URLSearchParams(h),S=p.get("projectId")?.trim()??"",b=Ya(e.layout,S);if(b===null){f.writeHead(404),f.end("Project not found");return}let W=p.getAll("applySet").map(R=>String(R)),k=Ef({layout:e.layout,projectFolderPath:b.projectFolderPath,setSlugs:W});if(!k.ok){let R=n();z(f,await o({title:b.name,activePath:"/projects",installVersion:R.installVersion,body:Za({project:b,installed:sr(e.layout),linkedSetSlugs:el(b.projectFolderPath),flashError:k.errorMessage})}));return}f.writeHead(303,{Location:`/project?id=${encodeURIComponent(b.id)}&linked=1&files=${k.writtenFileCount}`}),f.end();return}if(_==="GET"&&l==="/harness"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),S=hs(e.layout),b=h.searchParams.get("submitted")==="1",W=b?h.searchParams.get("syncFailed")==="1"?`Local harness updated (${h.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:h.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${h.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":h.searchParams.get("stopped")==="1"?`Reveal stopped. ${S?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:h.searchParams.get("revealed")==="1"?`Reveal found ${S?.sets.length??0} set(s).`:null,k=S?.scanRoots[0]??nl(),R=sv(e.layout,{reveal:S,importQuery:h.searchParams.get("import")==="1",justSubmitted:b});z(f,await o({title:"Harness",activePath:"/harness",installVersion:p.installVersion,body:ls(hl(e.layout,{reveal:S,scanFolder:k,flashMessage:W,importSectionExpanded:R}))}));return}if(_==="POST"&&l==="/api/harness/pick-folder"){let h=ol();if(h===null){N(f,200,{cancelled:!0});return}N(f,200,{path:h});return}if(_==="GET"&&l==="/api/harness/file-content"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",S=us(p);if(S===null){N(f,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let b=fn.default.readFileSync(S,"utf8"),W=b.length>bh?`${b.slice(0,bh)}
\u2026 (truncated)`:b;N(f,200,{content:W})}catch{N(f,500,{errorMessage:"Could not read file."})}return}if(_==="POST"&&l==="/api/harness/reveal/add-project"){let h=await ir(A),p="";try{let W=JSON.parse(h);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(p=W.projectPath.trim())}catch{N(f,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(p.length===0){N(f,400,{ok:!1,errorMessage:"projectPath is required."});return}let S=hs(e.layout),b=$f({reveal:S,projectPath:p});if(b===null||b.sets.length===0){N(f,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}ul(e.layout,b),N(f,200,{ok:!0,setCount:b.sets.length});return}if(_==="GET"&&l==="/api/harness/reveal/stream"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(p.length===0){N(f,400,{errorMessage:"Choose a folder to scan first."});return}let S=!1;A.on("close",()=>{S=!0}),f.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Al});let b=Vf({scanRoot:p,response:f,shouldAbort:()=>S});ul(e.layout,b),f.end();return}if(_==="POST"&&l==="/harness/reveal"){f.writeHead(410,{"Content-Type":"text/plain"}),f.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(_==="POST"&&l==="/harness/submit"){let h=hs(e.layout);if(h===null){let ie=n();z(f,await o({title:"Harness",activePath:"/harness",installVersion:ie.installVersion,body:ls(hl(e.layout,{reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let p=await ir(A),S=new URLSearchParams(p),b=yf(S,h),W=Xf({layout:e.layout,sets:b});if(!W.ok){let ie=n();z(f,await o({title:"Harness",activePath:"/harness",installVersion:ie.installVersion,body:ls(hl(e.layout,{reveal:h,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Zf(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";f.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${R}`}),f.end();return}if(_==="GET"&&l==="/writer-api"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),S=F()?.writerExecutionBackend??V(void 0),b=ee(e.layout.configPath),W=tt(b),k=h.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();z(f,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:tf({writerExecutionBackend:S,secrets:W,flashMessage:k})}));return}if(_==="POST"&&l==="/writer-api"){let h=await ir(A),p=new URLSearchParams(h),S=p.get("writerExecutionBackend")?.trim()??"cli";uh({configPath:e.layout.configPath,writerExecutionBackend:V(S),anthropicApiKey:p.get("anthropicApiKey")??void 0,anthropicModel:p.get("anthropicModel")??void 0,openaiApiKey:p.get("openaiApiKey")??void 0,openaiModel:p.get("openaiModel")??void 0,googleApiKey:p.get("googleApiKey")??void 0,googleModel:p.get("googleModel")??void 0}),f.writeHead(303,{Location:"/writer-api?saved=1"}),f.end();return}if(_==="GET"&&l==="/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",S=n(),W=(p.length>0?await ln({layout:e.layout,query:p,limit:20}):an(e.layout).slice(-50).reverse()).map(k=>`<article class="card"><div class="muted" title="${D(k.createdAt)}">${D(yl(k.createdAt))}${k.source?` \xB7 ${D(k.source)}`:""}</div><pre>${D(k.text)}</pre></article>`).join("");z(f,await o({title:"Knowledge",activePath:"/knowledge",installVersion:S.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${D(p)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${W||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}_==="POST"&&await ir(A),f.writeHead(404),f.end("Not found")})().catch(l=>{console.error("[agent-witch-local-app]",l),f.writeHead(500),f.end("Internal error")})});return v.on("error",A=>{if(A.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",A)}),v.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Cg}`)}),v},Eh=e=>Ia(e).publicKeyRaw});var hn,Sl,Lh,xh,Rh,Ch,Ph=u(()=>{"use strict";hn=g(require("node:fs")),Sl=g(require("node:path"));kt();Kr();Lh=(e,t)=>Sl.default.join(Ue(t).memoryDirPath,In),xh=(e,t)=>{let r=Lh(e,t);if(!hn.default.existsSync(r))return[];let n=hn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Rh=e=>{let t=Lh(e.layout,e.projectFolderPath);hn.default.mkdirSync(Sl.default.dirname(t),{recursive:!0}),hn.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},Ch=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Th,lv,cv,dv,Ih,Nh=u(()=>{"use strict";Th=g(require("node:os"));x();lv="Default",cv=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),dv=e=>{let t=Th.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Ih=()=>{let e=L(),t=Ml(e),r=cv(lv);return`${dv(t)}/${r.length>0?r:"project"}`}});var Oh,uv,Mh,Hh=u(()=>{"use strict";Oh=require("node:child_process");Jo();et();kr();rt();Me();nt();uv=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,Oh.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},Mh=async e=>{if(!H(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&V(e.runConfig.writerExecutionBackend)==="api"){let r=Ne(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=ee(e.layout.configPath),o=Oe(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await $e(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await uv(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Dh,Fh=u(()=>{"use strict";Dh=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var Uh,jh,$h=u(()=>{"use strict";Uh=require("node:crypto"),jh=()=>(0,Uh.randomUUID)()});var yn,mv,Bh,Ss=u(()=>{"use strict";yn="[[WORKING_ESTIMATE]]",mv=["Put this marker on its own line:",yn,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),Bh=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",mv,"","Task to estimate:",e.trim()].join(`
`)});var Gh,Vh=u(()=>{"use strict";Gh=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Kh,zh=u(()=>{"use strict";Kh=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var pv,qh,Jh=u(()=>{"use strict";Ss();pv=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,qh=e=>{if(!e.includes(yn))return null;let t=null;for(let r of e.matchAll(pv)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var Yh,Xh=u(()=>{"use strict";io();Ss();Vh();zh();Jh();pr();Yh=async e=>{let t=Gh(e.wrappedPrompt),r=Bh(t),n=await Mt(e.config,e.writerAgent,r),o=qh(n.output),s=Kh(o);return mr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:le.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var Zh={};ze(Zh,{buildContinuationPromptWithContext:()=>hv});var gv,fv,hv,Qh=u(()=>{"use strict";gv=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,fv=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),hv=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=fv(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${gv(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var ey={};ze(ey,{readHarnessExportSets:()=>Av});var An,_l,_s,yv,Av,ty=u(()=>{"use strict";An=g(require("node:fs")),_l=g(require("node:path"));x();_s=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yv=e=>{if(!An.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(An.default.readFileSync(e.harnessManifestPath,"utf8"));if(_s(t))return t}catch{return null}return null},Av=(e,t)=>{let r=L(t),n=yv(r);if(n===null)return[];let o=_s(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!_s(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let m of c){if(!_s(m))continue;let y=typeof m.path=="string"?m.path:void 0,v=typeof m.id=="string"?m.id:"",A=typeof m.kind=="string"?m.kind:"",f=typeof m.title=="string"?m.title:"";if(y===void 0||v.length===0||A.length===0||f.length===0)continue;let l=y.startsWith("shared/")?_l.default.join(r.harnessRootDir,y):_l.default.join(r.harnessSetsDir,i,y);An.default.existsSync(l)&&d.push({id:v,kind:A,title:f,content:An.default.readFileSync(l,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var ly={};ze(ly,{startAgentWitchClient:()=>Tv});var wl,Sn,ar,Iv,Sv,_v,bv,vv,ry,wv,ny,oy,sy,bl,P,iy,I,vl,Wv,bs,Ev,kv,Lv,xv,Rv,Cv,Pv,ay,Tv,cy=u(()=>{"use strict";wl=require("node:child_process"),Sn=g(require("node:fs")),ar=g(require("node:os"));im();Pn();Fs();Ns();ma();Je();pm();hm();Fm();Dt();x();Vp();wr();Ko();ka();Jo();et();_a();Pr();Ut();Vo();zp();Zp();Xe();eg();ng();Na();es();os();Rg();kh();Ua();Ph();xt();Nh();zr();Hh();Ms();Fn();_t();On();Fh();$h();Ss();pr();Xh();ui();nt();Iv={},Sv="claude",_v="codex",bv="cursor",vv="agy",ry=3e4,wv=3e4,ny=new Map,oy=new Map,sy=new Map,bl=e=>{let t=e?.trim()??"";return t.length>0?t:Ih()},P=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iy=e=>{let t=L(e);if(!Sn.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Sn.default.readFileSync(t.configPath,"utf8"));if(!P(r))throw new Error("Config must be a JSON object.");let n=typeof r.wsUrl=="string"?r.wsUrl.trim():"",o=lo({installDir:t.installDir,configWsUrl:n}),s=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),i=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??Sv,a=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??_v,c=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??bv,d=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??vv,m=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",y=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return m.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:y,wsUrl:o,workspace:s,claudeCommand:i,codexCommand:a,cursorCommand:c,antigravityCommand:d,pairingToken:m,writerExecutionBackend:V(r.writerExecutionBackend),layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},I=(e,t,r)=>{e.readyState===jr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(At(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Da(r,"out",t)))},vl=e=>e,Wv=e=>{if(!Sn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Sn.default.readFileSync(e.harnessManifestPath,"utf8"));if(P(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},bs=(e,t)=>{let r=Wv(t);r!==null&&I(e,{type:"harness.manifest.report",payload:{hostname:ar.default.hostname(),manifest:r}})},Ev=async(e,t,r,n,o,s,i=!1,a,c,d,m)=>{if(!H(t)){I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let y=Xo(t)&&!Cp(t);if(y){try{await $e(e.layout.installDir,t)}catch(S){let b=S instanceof Error?S.message:String(S);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Yo(t)}else if(!Xo(t))try{await $e(e.layout.installDir,t)}catch(S){let b=S instanceof Error?S.message:String(S);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let v=i&&Rp(t)&&Pp(t)?"continue":"first",A=r;if(i&&v==="first"&&typeof c=="string"&&c.length>0){let S=Bo(e.layout,c);if(S!==null){let{buildContinuationPromptWithContext:b}=await Promise.resolve().then(()=>(Qh(),Zh));A=b({priorPrompt:S.prompt,priorOutput:S.resultOutput??"",userMessage:r})}}let f=bl(d);we({projectFolderPath:f});let l=await ln({layout:e.layout,query:A,limit:5,projectFolderPath:f}),_=xh(e.layout,f),h=`${Ch(_)}${Hg(l)}${A}`,p=m?.trim()??(s!==void 0&&f.trim().length>0?jh():void 0);if(s!==void 0&&p!==void 0&&p.length>0&&f.trim().length>0){Hn({reportKey:p,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let S=await Yh({config:e,writerAgent:t,wrappedPrompt:h,reportKey:p,agentRunId:s});if(S.estimateSeconds!==null){let b=`${yn}
${S.estimateSeconds}
`;je(s)?I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:b},requestId:n}):ft(s,b)}h=Dh(h,S),h=sc(h,{agentRunId:s,reportKey:p,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}Ra(e,t,h,n,vl(o),s,{sessionTurn:v},a,f,p),y&&s!==void 0&&I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Ip(t)},requestId:n})},kv=async(e,t,r,n,o)=>{let s=(i,a)=>{I(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await Np({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:m=>{i+=m,I(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:m},requestId:n})}}),c=H(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?en(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Lv=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=Tt(t,r,Ie({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,wl.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),xv=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(I(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!H(o)){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let i=await(async()=>{try{await $e(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return Lv(e,o,s)})();I(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),bs(n,e.layout)},Rv=e=>{let t=1e3*2**e;return Math.min(wv,t)},Cv=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,Kp().then(_=>{if(_.ok){console.log("[agent-witch] Local restart completed.");return}if(!_.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",_.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,_="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,Xp({layout:e.layout,remoteBundleVersion:l,trigger:_}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=re(e.layout);l!==null&&de(l,ce)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),A())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let l=t.socket;t.socket=void 0,t.wsConnected=!1,l.removeAllListeners("open"),l.removeAllListeners("message"),l.removeAllListeners("close"),l.on("error",()=>{}),(l.readyState===jr.OPEN||l.readyState===jr.CONNECTING)&&l.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,ry)},m=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=Rv(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},l)},y=l=>{s();let _=()=>{let h=G(e.layout.installDir)?.bundleVersion??null,p=te();I(l,{type:"agent.heartbeat",payload:{hostname:ar.default.hostname(),macOsUsername:ar.default.userInfo().username,wakeError:t.wakeError,wakePort:p,...e.email!==null?{email:e.email}:{},...h!==null?{installBundleVersion:h}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};_(),t.heartbeatTimer=setInterval(_,ry)},v=(l,_)=>{if(typeof l.type!="string")return;At(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"}),Da(e.layout,"in",l);let h=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&P(l.payload)){let p=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",S=typeof l.payload.origin=="string"?l.payload.origin:"",b=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",W=typeof l.payload.challenge=="string"?l.payload.challenge:"",k=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!pg({serverPublicKey:p,origin:S,devicePublicKey:b,challenge:W,serverAttestation:k})){t.wakeError="Server attestation verification failed",At(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&P(l.payload)){let p=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";At(e.layout,{direction:"local",type:"writer.ensure",summary:p,action:"ensure-writer"}),Mh({layout:e.layout,writerAgent:p,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(S=>{I(_,{type:"writer.status",payload:S},e.layout)})}if(l.type==="install.bundle.update"&&P(l.payload)){let p=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";p.length>0&&n(p,"install.bundle.update")}if(l.type==="system.ack"){bi(e.layout,{wsUrl:e.wsUrl});let p=P(l.payload)?l.payload:null,S=Qp(p);S!==null&&n(S)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&P(l.payload)&&tg(l.payload),l.type==="automations.run"&&P(l.payload)&&rg(l.payload),l.type==="terminal.stream.accepted"&&P(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"";if(p.length>0){let S=ap(p);for(let b of S)I(_,{type:"terminal.stream.chunk",payload:{runId:p,chunk:b},requestId:h})}}if(l.type==="agent.agentRun.list"&&I(_,{type:"dashboard.agentRun.list.result",payload:{runs:Zm(e.layout)},requestId:h}),l.type==="agent.agentRun.get"&&P(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"",S=p.length>0?Bo(e.layout,p):null;I(_,{type:"dashboard.agentRun.get.result",payload:{run:S},requestId:h})}if(l.type==="command.claude.run"&&P(l.payload)){let p=l.payload.prompt,S=typeof l.payload.writerAgent=="string"&&H(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",b=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,W=l.payload.sessionContinuation===!0,k=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,R=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,ie=bl(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),lr=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof p=="string"&&p.trim().length>0&&(console.log(`[agent-witch] Running ${S} task (${W?"continue":"first"})\u2026`),b!==void 0&&R!==void 0&&ny.set(b,R),b!==void 0&&(oy.set(b,ie),sy.set(b,p.trim()),we({projectFolderPath:ie})),Ev(e,S,p.trim(),h,_,b,W,R,k,ie,lr))}if(l.type==="shell.session.open"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",S=typeof l.payload.cols=="number"?l.payload.cols:120,b=typeof l.payload.rows=="number"?l.payload.rows:32;p.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Ap({shellSessionId:p,cwd:e.workspace,cols:S,rows:b,send:W=>{I(_,W)},requestId:h}))}if(l.type==="shell.session.close"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";p.length>0&&Zr(p,S=>{I(_,S)},h)}if(l.type==="shell.input"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",S=typeof l.payload.data=="string"?l.payload.data:"";p.length>0&&S.length>0&&fp(p,S)}if(l.type==="shell.resize"&&P(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",S=typeof l.payload.cols=="number"?l.payload.cols:0,b=typeof l.payload.rows=="number"?l.payload.rows:0;p.length>0&&S>0&&b>0&&hp(p,S,b)}if(l.type==="command.writer.session.end"&&P(l.payload)){let p=l.payload.writerAgent;typeof p=="string"&&H(p)&&Tp(p)}if(l.type==="command.writer.session.start"&&P(l.payload)){let p=l.payload.writerAgent,S=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof p=="string"&&H(p)&&S.length>0&&(console.log(`[agent-witch] Starting ${p} session\u2026`),kv(e,p,S,h,_))}if(l.type==="command.claude.stop"&&P(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";p.length>0&&(console.log(`[agent-witch] Stopping run ${p}\u2026`),Gp(e,vl(_),p,h))}if(l.type==="command.claude.input_respond"&&P(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",S=typeof l.payload.response=="string"?l.payload.response.trim():"",b=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",W=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",k=typeof l.payload.question=="string"?l.payload.question:"";p.length>0&&S.length>0&&b.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),$p(e,{agentRunId:p,originalPrompt:b,partialOutput:W,question:k,response:S,shellSessionId:ny.get(p)},h,vl(_)))}if(l.type==="dispatch.approval.required"&&P(l.payload)){let p=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",S=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${p}: ${S}`),process.platform==="darwin"&&(0,wl.spawn)("osascript",["-e",`display notification "${S.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${p.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&P(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),xv(e,l.payload,h,_)),l.type==="harness.export.request"&&P(l.payload)){let p=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",S=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,b=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(W=>typeof W=="string"):[];p.length>0&&b.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(ty(),ey)),k=W(b,e.email);I(_,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:p,...S!==void 0?{targetDeviceId:S}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:h})})()}if(l.type==="harness.manifest.request"&&bs(_,e.layout),l.type==="command.claude.result"&&P(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,S=bl(p!==void 0?oy.get(p):void 0),b=p!==void 0?sy.get(p)??"":"";Mg({layout:e.layout,text:l.payload.output,source:p??"command.claude.result",projectFolderPath:S}),b.trim().length>0&&Rh({layout:e.layout,projectFolderPath:S,entry:{id:`${Date.now()}-${p??"run"}`,...p!==void 0?{agentRunId:p}:{},prompt:b,output:l.payload.output,createdAt:new Date().toISOString()}})}},A=()=>{if(t.stopped)return;a(),c();let l=new jr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),bi(e.layout,{wsUrl:e.wsUrl}),Dp(Pt({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Fp(e.layout);let _=Q(e.wsUrl)??"http://localhost:3000",h=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),p=mg({layout:e.layout,origin:_,...h!==void 0&&h.length>0?{claimToken:h}:{}});I(l,{type:"agent.register",payload:{role:"agent",hostname:ar.default.hostname(),macOsUsername:ar.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...p}},e.layout),bs(l,e.layout),Bp(e,l),y(l)}),l.on("message",_=>{let h=typeof _=="string"?_:_.toString("utf8");try{let p=JSON.parse(h);if(!P(p))return;v(p,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",(_,h)=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1;let p=typeof h=="string"?h:h.toString("utf8");Qt(e.layout,{kind:"ws_close",message:"WebSocket closed",code:_,reason:p}),console.log("[agent-witch] Disconnected from server."),m()}),l.on("error",_=>{t.wakeError=_.message,Qt(e.layout,{kind:"ws_error",message:_.message,stack:_.stack}),console.error(`[agent-witch] Socket error: ${_.message}`)})};return{connect:A,startLocalHealthCheck:d,stop:()=>{t.stopped=!0,s(),i(),a(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Eh(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(bs(l,e.layout),{ok:!0})}}},Pv=async()=>{let e=()=>{let r=Ul();if(r.length===0){let n=iy(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=iy(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},ay=async()=>{Et("agent-witch"),dm().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=w();fm(t);let r=mm({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),jn();let n=await Pv(),o=n[0];o!==void 0&&xg(o.layout);let s=n.map(y=>Cv(y)),i=s[0];i===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ua(),process.exit(0));let a=()=>{n.forEach((y,v)=>{let A=re(y.layout);A!==null&&!de(A,ce)||s[v]?.reviveWebSocket()})},c=()=>{},d=await Dm({reconnectWebSockets:a,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),c()}});Wh({layout:n[0].layout,controllers:{getStatus:i.getStatus,reviveWebSocket:a,reportHarnessManifestIfConnected:i.reportHarnessManifestIfConnected}});for(let y of s)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Bridging ${s.length} account profile(s) in one process.`);let m=Cn(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Rn(),c()});c=()=>{m(),d.stop(),ua(),console.log("[agent-witch] Shutting down.");for(let y of s)y.stop();process.exit(0)},process.on("SIGINT",()=>{c()}),process.on("SIGTERM",()=>{c()})},Tv=ay;if(Lt(Iv.url)&&!ae()){let e=process.argv.indexOf("report");e>=0&&process.exit(Dn(process.argv.slice(e))),ay()}});Pn();Ms();Fn();var pc="20.x",gc="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var Uy=e=>[`Node.js ${pc} or newer is required (found ${e}).`,gc].join(" "),fc=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${Uy(process.version)}
`),process.exit(1))};var Hv={},Nv=async()=>{Et("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ct(),Gn)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},Ov=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Ui(),tu)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Mv=async()=>{if(!Lt(Hv.url))return;fc();let e=process.argv.indexOf("report");e>=0&&process.exit(Dn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Nv();return}if(t==="wake"){await Ov();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(cy(),ly));await r()};Mv();
