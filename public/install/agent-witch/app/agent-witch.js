#!/usr/bin/env node
"use strict";var vy=Object.create;var ks=Object.defineProperty;var wy=Object.getOwnPropertyDescriptor;var Wy=Object.getOwnPropertyNames;var Ey=Object.getPrototypeOf,ky=Object.prototype.hasOwnProperty;var u=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var G=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Xe=(e,t)=>{for(var r in t)ks(e,r,{get:t[r],enumerable:!0})},Ly=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Wy(t))!ky.call(e,o)&&o!==r&&ks(e,o,{get:()=>t[o],enumerable:!(n=wy(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?vy(Ey(e)):{},Ly(t||!e||!e.__esModule?ks(r,"default",{value:e,enumerable:!0}):r,e));var Rl,Pl,Ls=u(()=>{"use strict";Rl=new Set(["","loginwindow","_mbsetupuser","root"]),Pl=5e3});var Cl,wn,xs=u(()=>{"use strict";Cl=require("node:child_process"),wn=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Cl.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ae,wt=u(()=>{"use strict";ae=()=>!0});var Wn,Tl,xy,En,Rs=u(()=>{"use strict";Wn=g(require("node:path")),Tl=require("node:url");wt();xy={},En=()=>{if(ae()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Wn.default.dirname(Wn.default.resolve(e))}return Wn.default.dirname((0,Tl.fileURLToPath)(xy.url))}});var fe,Il,Wt=u(()=>{"use strict";fe="agent-witch.js",Il="command"});var Cs,Dl,E,Ry,Ps,Ts,Py,Cy,Ty,Iy,Ze,Oy,Ol,Nl,Ml,Is,he,kn,Ln,Hl,Et,kt,w,Fl,Os,Ul,jl,xn,$l,Bl,ye,Ns,Ny,My,Re,Hy,L,x=u(()=>{"use strict";Cs=g(require("node:fs")),Dl=g(require("node:os")),E=g(require("node:path"));Rs();Wt();Ry=En(),Ps=".agent-witch",Ts=".local-agent-witch",Py=47892,Cy=47893,Ty="com.agent-witch",Iy="com.local-agent-witch",Ze="profiles",Oy="active-profile.json",Ol="harness",Nl="sets",Ml="manifest.json",Is="projects",he="logs",kn="agent-witch.log",Ln="agent-witch.error.log",Hl="reports",Et="device-keypair.json",kt=e=>e.trim().toLowerCase(),w=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return E.default.resolve(e);let t=E.default.resolve(Ry),r=E.default.basename(t),n=E.default.basename(E.default.dirname(t));return r==="app"&&(n===Ps||n===Ts)?E.default.dirname(t):r===Ps||r===Ts?t:E.default.join(Dl.default.homedir(),Ps)},Fl=(e=w())=>E.default.join(e,"app"),Os=(e=w())=>E.default.join(Fl(e),fe),Ul=(e,t,r)=>t!==null?E.default.join(e,Ze,t,r):E.default.join(e,r),jl=e=>Ul(e.installDir,e.profileEmail,Is),xn=e=>Ul(e.installDir,e.profileEmail,he),$l=e=>e.profileEmail!==null?E.default.join(e.installDir,Ze,e.profileEmail,Et):E.default.join(e.installDir,Et),Bl=e=>E.default.basename(e)===Ts,ye=(e=w())=>Bl(e)?Iy:Ty,Ns=(e=w())=>Bl(e)?Cy:Py,Ny=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return kt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?kt(t):null},My=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Re=(e=w())=>{let t=E.default.join(e,Oy);if(!Cs.default.existsSync(t))return null;try{let r=JSON.parse(Cs.default.readFileSync(t,"utf8"));if(My(r)&&typeof r.email=="string"&&r.email.trim().length>0)return kt(r.email)}catch{return null}return null},Hy=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?kt(r):null}let t=Ny();return t!==null?t:Re()},L=e=>{let t=w(),r=Fl(t),n=Os(t),o=Hy(e);if(o!==null){let v=E.default.join(t,Ze,o),A=E.default.join(v,Ol),f=E.default.join(v,Is),l=E.default.join(v,he),S=E.default.join(v,Hl),h=E.default.join(v,Et),p=E.default.join(v,he,kn),b=E.default.join(v,he,Ln);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:f,logsDir:l,mainLogPath:p,errorLogPath:b,reportsDir:S,deviceKeypairPath:h,configPath:E.default.join(v,"config.json"),harnessRootDir:A,harnessManifestPath:E.default.join(A,Ml),harnessSetsDir:E.default.join(A,Nl)}}let s=E.default.join(t,Ol),i=E.default.join(t,Is),a=E.default.join(t,he),c=E.default.join(t,Hl),d=E.default.join(t,Et),m=E.default.join(t,he,kn),y=E.default.join(t,he,Ln);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:m,errorLogPath:y,reportsDir:c,deviceKeypairPath:d,configPath:E.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:E.default.join(s,Ml),harnessSetsDir:E.default.join(s,Nl)}}});var Rn,Ms,Gl,V,Vl,Qe=u(()=>{"use strict";Rn=g(require("node:fs")),Ms=g(require("node:path"));x();Gl=e=>{let t=Ms.default.join(e,Ze);return Rn.default.existsSync(t)?Rn.default.readdirSync(t).filter(r=>Rn.default.statSync(Ms.default.join(t,r)).isDirectory()).map(r=>kt(r)).toSorted():[]},V=(e=w())=>{let t=ye(e);return[{profileEmail:Gl(e)[0]??null,launchAgentLabel:t}]},Vl=(e=w())=>Gl(e)});var Pn,Lt,zl,Hs,Kl,Dy,ql,Fy,Uy,dr,jy,Jl,Cn=u(()=>{"use strict";Pn=require("node:child_process"),Lt=g(require("node:fs")),zl=g(require("node:os")),Hs=g(require("node:path")),Kl=require("node:util");Qe();x();Dy=(0,Kl.promisify)(Pn.execFile),ql=()=>Hs.default.join(zl.default.homedir(),"Library","LaunchAgents"),Fy=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Dy("launchctl",["bootout",r]).catch(()=>{})},Uy=e=>{let t=Hs.default.join(ql(),`${e}.plist`);Lt.default.existsSync(t)&&Lt.default.unlinkSync(t)},dr=(e=w())=>{let t=ye(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of V(e))r.add(o.launchAgentLabel);let n=ql();if(Lt.default.existsSync(n))for(let o of Lt.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},jy=e=>{(0,Pn.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Jl=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=w();if(!Lt.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=dr(e);for(let r of t)await Fy(r),Uy(r);return jy(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Tn,Ds=u(()=>{"use strict";xs();Cn();x();Tn=(e=w())=>{for(let t of dr(e))wn(t)}});var Yl,$y,By,Xl,Zl=u(()=>{"use strict";Yl=require("node:child_process");Ls();$y=e=>e.trim().toLowerCase(),By=e=>e==null?!1:!Rl.has($y(e)),Xl=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Yl.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return By(t)?t:null}catch{return null}}});var ec,Ql,Ae,ur=u(()=>{"use strict";ec=g(require("node:os"));Zl();Ql=e=>e.trim().toLowerCase(),Ae=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Xl():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??ec.default.userInfo().username;return Ql(r)===Ql(n)}});var xt,In,On=u(()=>{"use strict";Ls();Ds();ur();xt=e=>{Ae()||(Tn(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},In=(e,t=Pl)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Ae()||e()},t);return()=>{clearInterval(r)}}});var tc,rc,nc,Nn,Mn,oc,sc,Rt=u(()=>{"use strict";tc=".agent-witch",rc="memory",nc="project.json",Nn="chunks.ndjson",Mn="runs.ndjson",oc="reports",sc=".json"});var ic,Hn,Fs=u(()=>{"use strict";ic=g(require("node:path"));Rt();Hn=(e,t)=>ic.default.join(e.trim(),`${t.trim()}${sc}`)});var et,ac,lc=u(()=>{"use strict";Wt();et=e=>`'${e.replace(/'/g,"'\\''")}'`,ac=e=>{let t=`${e.installDir.trim()}/${"app"}/${fe}`,r=[et("node"),et(t),"report","write","--key",et(e.reportKey.trim()),"--agent-run-id",et(e.agentRunId.trim()),"--status",et(e.status),"--summary",et(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",et(e.details.trim())),r.join(" ")}});var le,cc,Gy,dc,Dn=u(()=>{"use strict";Fs();lc();le={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},cc=e=>e===le.COMPLETED||e===le.FAILED,Gy=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),dc=(e,t)=>{let r=Hn(t.reportsDir,t.reportKey),n=ac({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:le.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${Gy({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var mr,mc,uc,pc,Vy,Fn,zy,Ky,pr,Un,gc,fc,gr=u(()=>{"use strict";mr=g(require("node:fs")),mc=g(require("node:path"));Dn();Fs();x();uc=50,pc=e=>{let t=L(),r=Hn(t.reportsDir,e);return mr.default.mkdirSync(mc.default.dirname(r),{recursive:!0}),r},Vy=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Fn=e=>{let t=pc(e);if(!mr.default.existsSync(t))return null;try{let r=JSON.parse(mr.default.readFileSync(t,"utf8"));return Vy(r)?r:null}catch{return null}},zy=(e,t)=>{let r=[...e,t];return r.length>uc?r.slice(r.length-uc):r},Ky=e=>{let t=pc(e.reportKey);mr.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},pr=e=>{let t=Fn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:zy(t?.history??[],n)};return Ky(o),o},Un=e=>{let t=Fn(e.reportKey);return t!==null?t:pr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:le.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},gc=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},fc=e=>{if(e===null||!cc(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===le.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var qy,Jy,fr,hc,jn,Us=u(()=>{"use strict";Dn();gr();qy=new Set(Object.values(le)),Jy=e=>qy.has(e),fr=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},hc=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},jn=e=>{if(e[0]!=="write")return hc(),1;let r=fr(e,"--key"),n=fr(e,"--agent-run-id"),o=fr(e,"--status"),s=fr(e,"--summary"),i=fr(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!Jy(o)?(hc(),1):(pr({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var js,yc,Pt,$n=u(()=>{"use strict";js=g(require("node:path")),yc=require("node:url");wt();Pt=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=js.default.resolve(t);return ae()?r===js.default.resolve(__filename):r===(0,yc.fileURLToPath)(e)}});var hr,$s,Zy,Qy,_c,z,vc,Bn,tt=u(()=>{"use strict";hr=g(require("node:fs")),$s=g(require("node:path"));x();Zy="install-version.json",Qy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_c=(e=w())=>$s.default.join(e,Zy),z=(e=w())=>{let t=_c(e);if(!hr.default.existsSync(t))return null;try{let r=JSON.parse(hr.default.readFileSync(t,"utf8"));return!Qy(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},vc=(e,t=w())=>{let r=_c(t);hr.default.mkdirSync($s.default.dirname(r),{recursive:!0}),hr.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Bn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var Wc,Ec,kc,Lc,xc,yr,eA,tA,rA,wc,Pe,Ar=u(()=>{"use strict";Wc=require("node:child_process"),Ec=g(require("node:fs")),kc=g(require("node:os")),Lc=g(require("node:path")),xc=require("node:util");ur();yr=(0,xc.promisify)(Wc.execFile),eA=e=>Lc.default.join(kc.default.homedir(),"Library","LaunchAgents",`${e}.plist`),tA=async e=>{try{return await yr("launchctl",["print",e]),!0}catch{return!1}},rA=async(e,t,r)=>{await tA(t)&&await yr("launchctl",["bootout",t]).catch(()=>{}),await yr("launchctl",["bootstrap",e,r]),await yr("launchctl",["enable",t])},wc=async e=>{try{return await yr("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Pe=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Ae())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await wc(n))return{ok:!0};let o=eA(e);if(!Ec.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await rA(r,n,o),await wc(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var nA,Gn,Bs=u(()=>{"use strict";xs();Cn();Qe();x();nA=(e=w())=>{let t=new Set(V(e).map(r=>r.launchAgentLabel));return dr(e).filter(r=>!t.has(r))},Gn=(e=w())=>{for(let t of nA(e))wn(t)}});var ee,Ct=u(()=>{"use strict";ee=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Rc,rt,Gs,oA,sA,Pc,Tt,Vn,Vs=u(()=>{"use strict";Rc=require("node:crypto"),rt=g(require("node:fs")),Gs=g(require("node:path"));x();oA="self-update-log.ndjson",sA=100,Pc=(e=w())=>{let t=L(),r=t.installDir===e?t.logsDir:xn({installDir:e,profileEmail:t.profileEmail});return Gs.default.join(r,oA)},Tt=(e,t=w())=>{let r={id:(0,Rc.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Pc(t);rt.default.mkdirSync(Gs.default.dirname(n),{recursive:!0});let o=rt.default.existsSync(n)?rt.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-sA+1)),JSON.stringify(r)];return rt.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Vn=(e=20,t=w())=>{let r=Pc(t);if(!rt.default.existsSync(r))return[];let n=rt.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Cc,Tc,Ic=u(()=>{"use strict";Cc="deps.tar.gz",Tc="deps"});var Nc,Ce,nt,iA,Mc,Hc,Dc=u(()=>{"use strict";Nc=require("node:child_process"),Ce=g(require("node:fs")),nt=g(require("node:path"));Ic();iA=e=>nt.default.join(e,"app",Tc),Mc=e=>{let t=nt.default.join(e,"app"),r=nt.default.join(t,Cc);Ce.default.existsSync(r)&&(Ce.default.rmSync(iA(e),{recursive:!0,force:!0}),Ce.default.mkdirSync(t,{recursive:!0}),(0,Nc.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Ce.default.rmSync(r,{force:!0}))},Hc=e=>{Ce.default.rmSync(nt.default.join(e,"node_modules"),{recursive:!0,force:!0}),Ce.default.rmSync(nt.default.join(e,"package.json"),{force:!0}),Ce.default.rmSync(nt.default.join(e,"package-lock.json"),{force:!0})}});var Kn={};Xe(Kn,{buildAgentWitchSelfUpdateStatus:()=>qs,fetchAgentWitchRemoteInstallBundleVersion:()=>zs,runAgentWitchSelfUpdate:()=>Ks});var Te,zn,Fc,aA,Uc,zs,lA,cA,Sr,Ks,qs,It=u(()=>{"use strict";Te=g(require("node:fs")),zn=g(require("node:path"));tt();Ar();Bs();Qe();Ct();x();Wt();Vs();Dc();Fc=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aA=e=>{let t=Re(e),r=t===null?L():L(t);if(!Te.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Te.default.readFileSync(r.configPath,"utf8"));return!Fc(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},Uc=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!Fc(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},zs=async e=>(await Uc(e))?.bundleVersion??null,lA=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=zn.default.join(t,r);Te.default.mkdirSync(zn.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());Te.default.writeFileSync(o,s),r.endsWith(".js")&&Te.default.chmodSync(o,493)},cA=async()=>{Gn();let e=V();for(let t of e)await Pe(t.launchAgentLabel)},Sr=(e,t)=>({localBundleVersion:t,...e}),Ks=async e=>{let t=w(),r=z(t),n=r?.bundleVersion??null,o=aA(t),s=o===null?r?.appOrigin??null:ee(o);if(s===null){let c=Sr({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return Tt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let i=await Uc(s);if(i===null){let c=Sr({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return Tt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||Bn(n,i.bundleVersion))){let c=Sr({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:i.bundleVersion},n);return Tt({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),c}try{for(let m of i.scripts)await lA(s,t,m);let c=zn.default.join(t,fe);Te.default.existsSync(c)&&Te.default.rmSync(c,{force:!0}),Mc(t),Hc(t),vc({bundleVersion:i.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await cA();let d=Sr({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${i.bundleVersion}.`,remoteBundleVersion:i.bundleVersion},i.bundleVersion);return Tt({event:"update_applied",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),d}catch(c){let d=c instanceof Error?c.message:"Agent Witch self-update failed.",m=Sr({ok:!1,updated:!1,message:d,remoteBundleVersion:i.bundleVersion},n);return Tt({event:"update_failed",ok:!1,message:d,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),m}},qs=()=>{let e=w();return{local:z(e),logs:Vn(20,e)}}});var qn,br,jc,Js,_r,Ys=u(()=>{"use strict";qn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},br=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=qn(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},jc=e=>e>=1&&e<=5,Js=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return qn(t,"UTC")},_r=e=>{let t=e.from??new Date,r=qn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return br(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=br(r,e.timeZone,n,0),s=qn(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?br(Js(r),e.timeZone,n,0):o;if(!i&&jc(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=Js(a),jc(a.weekday))return br(a,e.timeZone,n,0);return br(Js(r),e.timeZone,n,0)}});var dA,Jn,Xs=u(()=>{"use strict";dA=e=>e==="hourly"||e==="daily"||e==="weekdays",Jn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!dA(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var vr,Yn,$c,Bc,Zs,Ie,Gc,Vc,zc,Kc,wr=u(()=>{"use strict";vr=g(require("node:fs")),Yn=g(require("node:path"));Xs();$c="automations.json",Bc=e=>e.profileEmail!==null?Yn.default.join(e.installDir,"profiles",e.profileEmail,$c):Yn.default.join(e.installDir,$c),Zs=()=>({version:1,automations:[]}),Ie=e=>{let t=Bc(e);if(!vr.default.existsSync(t))return Zs();try{let r=JSON.parse(vr.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Zs():{version:1,automations:r.automations.flatMap(o=>{let s=Jn(o);return s!==null?[s]:[]})}}catch{return Zs()}},Gc=(e,t)=>{let r=Bc(e);vr.default.mkdirSync(Yn.default.dirname(r),{recursive:!0}),vr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Vc=(e,t)=>{Gc(e,{version:1,automations:t})},zc=(e,t)=>{let n=Ie(e).automations.filter(o=>o.id!==t.id);Gc(e,{version:1,automations:[...n,t]})},Kc=(e,t)=>Ie(e).automations.find(r=>r.id===t)??null});var uA,mA,Xn,Qs=u(()=>{"use strict";Ys();Xs();wr();x();uA=e=>e!==void 0&&e.trim().length>0?L(e.trim()):L(),mA=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??_r({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??_r({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Xn=e=>{let t=uA(e.profileEmail),r=Ie(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=Jn(s);return i!==null?[mA(i,n.get(i.id))]:[]});return Vc(t,o),{ok:!0,writtenCount:o.length}}});var qc,Jc=u(()=>{"use strict";qc="x-agent-witch-token"});var Oe,Zn,Yc,Qn,pA,Xc,Zc,Ot=u(()=>{"use strict";Jc();Ct();Oe=e=>{let t=ee(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Zn=e=>({[qc]:e,"Content-Type":"application/json"}),Yc=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Zn(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Qn=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Zn(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},pA=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},Xc=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Zn(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return pA(r)}catch{return null}},Zc=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Zn(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var eo,Wr,H,Ne,Qc,Nt,ot=u(()=>{"use strict";eo={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Wr=e=>e.trim().length>0,H=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Ne=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:Wr(t)?t.trim():eo.claudeCommand,codexCommand:Wr(r)?r.trim():eo.codexCommand,cursorCommand:Wr(n)?n.trim():eo.cursorCommand,antigravityCommand:Wr(o)?o.trim():eo.antigravityCommand}},Qc=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},Nt=(e,t,r,n)=>{let o=t.trim();if(!Wr(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var ei,gA,fA,to,ti=u(()=>{"use strict";ei=e=>e.toLocaleString("en-US"),gA=e=>e<.01?e.toFixed(4):e.toFixed(3),fA=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${gA(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${ei(e.inputTokens)} in / ${ei(e.outputTokens)} out (${ei(e.totalTokens)} total)`,t].join(`
`)},to=(e,t)=>{if(t===void 0)return e;let r=fA(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var ro,ri=u(()=>{"use strict";ro={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Mt,ni,oi,si=u(()=>{"use strict";ri();Mt="auto",ni=e=>({value:Mt,label:`Auto (${ro[e]})`}),oi={anthropic:[ni("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[ni("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[ni("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Ht,no,ed,Er=u(()=>{"use strict";ri();si();Ht=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Mt))return t},no=(e,t)=>{let r=Ht(t);return r===void 0?ro[e]:r},ed=e=>{let t=Ht(e);return t===void 0?Mt:t}});var oo,hA,yA,so,td=u(()=>{"use strict";oo={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},hA=e=>{let t=oo[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?oo["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?oo["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?oo["gemini-2.0-flash"]:null},yA=(e,t,r)=>{let n=hA(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},so=e=>{let t=yA(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Dt,AA,SA,bA,io,rd=u(()=>{"use strict";td();Dt=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),AA=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=Dt(r.input_tokens),o=Dt(r.output_tokens);return n===0&&o===0?null:so({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},SA=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=Dt(r.prompt_tokens),o=Dt(r.completion_tokens);return n===0&&o===0?null:so({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},bA=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=Dt(r.promptTokenCount),o=Dt(r.candidatesTokenCount);return n===0&&o===0?null:so({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},io=(e,t,r)=>e==="anthropic"?AA(t,r):e==="openai"?SA(t,r):bA(t,r)});var _A,vA,wA,WA,EA,kA,nd,od=u(()=>{"use strict";Er();rd();_A=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},vA=async e=>{let t=no("anthropic",e.secret.model),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=_A(n);o.length>0&&e.onChunk?.(o);let s=io("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},wA=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},WA=async e=>{let t=no("openai",e.secret.model),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=wA(n);o.length>0&&e.onChunk?.(o);let s=io("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},EA=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},kA=async e=>{let t=no("google",e.secret.model),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=EA(o);s.length>0&&e.onChunk?.(s);let i=io("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},nd=async e=>{try{return e.provider==="anthropic"?await vA(e):e.provider==="openai"?await WA(e):await kA(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Me,kr=u(()=>{"use strict";Me=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var sd,LA,ao,ii=u(()=>{"use strict";sd=g(require("node:path")),LA="writer-api-secrets.json",ao=e=>sd.default.join(e,LA)});var ai,id,xA,st,He,it=u(()=>{"use strict";ai=g(require("node:fs"));Er();ii();id=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xA=e=>{if(!id(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=Ht(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},st=e=>{let t=ao(e);if(!ai.default.existsSync(t))return{};try{let r=JSON.parse(ai.default.readFileSync(t,"utf8"));if(!id(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=xA(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},He=(e,t)=>st(e)[t]??null});var K,at=u(()=>{"use strict";K=e=>e==="api"?"api":"cli"});var ad,te,lo,De=u(()=>{"use strict";ad=g(require("node:path"));kr();it();at();te=e=>ad.default.dirname(e),lo=(e,t)=>{if(K(e.writerExecutionBackend)!=="api")return!1;let r=Me(t);if(r===null)return!1;let n=te(e.layout.configPath),o=He(n,r);return o!==null&&o.apiKey.length>0}});var co,li=u(()=>{"use strict";ti();od();kr();it();De();co=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Me(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=te(e.layout.configPath),a=He(i,s);if(a===null){let d=Object.keys(st(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await nd({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:to(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var ld,Ft,uo=u(()=>{"use strict";ld=require("node:child_process");ot();li();De();Ft=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(lo(e,t)){co(e,t,r).then(n);return}let o=Nt(t,r,Ne({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,ld.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[];s.stdout?.on("data",a=>{i.push(a.toString("utf8"))}),s.stderr?.on("data",a=>{i.push(a.toString("utf8"))}),s.on("close",a=>{n({exitCode:a??-1,output:i.join("")})}),s.on("error",a=>{n({exitCode:-1,output:a.message})})})});var ci,di,ui=u(()=>{"use strict";ci="https://www.agentwitch.com",di="wss://www.agentwitch.com/api/agent-witch/ws"});var mo,cd,mi=u(()=>{"use strict";mo=".agent-witch",cd=".local-agent-witch"});var dd,RA,pi,po,gi=u(()=>{"use strict";dd=g(require("node:path"));ui();mi();RA="ws://localhost:3000/api/agent-witch/ws",pi=e=>e.replace(/\/$/,""),po=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return pi(t);let r=dd.default.basename(e.installDir);if(r===mo)return di;let n=e.configWsUrl?.trim()??"";return r===cd?n.length>0?pi(n):RA:n.length>0?pi(n):di}});var fi,PA,CA,TA,IA,OA,D,lt=u(()=>{"use strict";fi=g(require("node:fs"));gi();x();at();PA="claude",CA="codex",TA="cursor",IA="agy",OA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),D=()=>{let e=L();if(!fi.default.existsSync(e.configPath))return null;try{let t=JSON.parse(fi.default.readFileSync(e.configPath,"utf8"));if(!OA(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=po({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:K(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:PA,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:CA,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:TA,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:IA,pairingToken:s,layout:e}}catch{return null}}});var ud,hi,Ut,go=u(()=>{"use strict";ud=require("node:crypto");Ot();Ys();uo();wr();lt();hi=!1,Ut=async e=>{if(hi)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=D();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Oe({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=Kc(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};hi=!0;let o=(0,ud.randomUUID)();try{let s=await Ft(t,"claude-cli",n.prompt);await Zc(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=_r({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return zc(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{hi=!1}}});function Lr(e){return(0,md.createHash)("sha256").update(e.trim()).digest("hex")}var md,yi=u(()=>{"use strict";md=require("node:crypto")});var NA,pd,MA,HA,xr,gd,Ai=u(()=>{"use strict";NA=["agentwitch.com","www.agentwitch.com"],pd=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,MA=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},HA=e=>{let t=MA(e);return!!(NA.includes(t)||pd.test(e.trim().toLowerCase()))},xr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return HA(r)?pd.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},gd=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:xr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var fo,fd,DA,FA,hd,yd,Si,ho,yo=u(()=>{"use strict";fo=g(require("node:fs")),fd=g(require("node:path")),DA="wake-port.json",FA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hd=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,yd=e=>fd.default.join(e,DA),Si=e=>{let t=yd(e);if(!fo.default.existsSync(t))return null;try{let r=JSON.parse(fo.default.readFileSync(t,"utf8"));if(FA(r)&&hd(r.wakePort))return r.wakePort}catch{return null}return null},ho=(e,t)=>{if(!hd(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=yd(e);fo.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var x0,R0,P0,re,Ad,jt=u(()=>{"use strict";yo();x();yo();x0=Ns(),R0=`${ye()}-wake`,P0=ye(),re=()=>{let e=w(),t=Si(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return Ns()},Ad=e=>{let t=w();Si(t)===null&&ho(t,e)}});var $t,Rr,UA,Sd,bd,_d=u(()=>{"use strict";$t=g(require("node:fs")),Rr=g(require("node:path"));yi();x();UA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sd=e=>{if(!$t.default.existsSync(e))return null;try{let t=JSON.parse($t.default.readFileSync(e,"utf8"));return!UA(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Lr(t.pairingToken.trim())}catch{return null}},bd=(e=w())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(Sd(Rr.default.join(e,"config.json")));let o=Rr.default.join(e,Ze);if(!$t.default.existsSync(o))return t;for(let s of $t.default.readdirSync(o)){let i=Rr.default.join(o,s);$t.default.statSync(i).isDirectory()&&n(Sd(Rr.default.join(i,"config.json")))}return t}});var vd,wd=u(()=>{"use strict";vd=["rule","skill","command","instruction","agent"]});var Wd,jA,$A,Ed,kd=u(()=>{"use strict";wd();Wd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jA=e=>typeof e=="string"&&vd.includes(e),$A=e=>{if(!Wd(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!jA(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Ed=e=>{if(!Wd(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=$A(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var Ld,BA,GA,VA,zA,KA,qA,JA,YA,Ao,bi=u(()=>{"use strict";Ld=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},BA=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},GA=(e,t)=>{let r=BA(t),n=Ld(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},VA=(e,t,r)=>{let n=GA(t,r);return`shared/items/${e}/${n}`},zA=["rules","skills","commands","instructions","agents"],KA=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),qA=(e,t)=>[...e.filter(n=>n.id!==t.id),t],JA=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},YA=e=>({id:e.id,kind:e.kind,title:e.title,path:VA(e.id,e.kind,e.title)}),Ao=e=>{let t=new Date().toISOString(),r=e.existingManifest??KA(e.hostname,t),n=Ld(e.bundle.slug),o=JA(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...zA.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,m)=>{let y=YA(m);return{files:[...d.files,{relativePath:y.path,content:m.content}],nextItems:qA(d.nextItems,y)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var Fe,xd,So,XA,Rd,Pd=u(()=>{"use strict";Fe=g(require("node:fs")),xd=g(require("node:os")),So=g(require("node:path"));bi();x();XA=e=>{if(!Fe.default.existsSync(e))return null;try{let t=JSON.parse(Fe.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Rd=e=>{let t=L(e.profileEmail);try{let r=XA(t.harnessManifestPath),n=Ao({bundle:e.bundle,hostname:xd.default.hostname(),existingManifest:r});Fe.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)Fe.default.mkdirSync(So.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=So.default.join(t.harnessRootDir,o.relativePath);Fe.default.mkdirSync(So.default.dirname(s),{recursive:!0}),Fe.default.writeFileSync(s,o.content)}return Fe.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var Cd,Td,bo,_i=u(()=>{"use strict";Cd=require("node:child_process"),Td=g(require("node:fs"));ur();x();bo=(e=w())=>{let t=Os(e);if(!Td.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Ae())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Re(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,Cd.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var vi,ce,z0,Bt=u(()=>{"use strict";x();vi="connection-health.json",ce=12e4,z0=`${ye()}-watchdog`});var Id,ct,wi,ZA,QA,eS,Od,tS,Nd,_o,vo=u(()=>{"use strict";Id=require("node:crypto"),ct=g(require("node:fs")),wi=g(require("node:path"));x();ZA="watchdog-log.ndjson",QA=200,eS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Od=(e=w())=>{let t=L(),r=t.installDir===e?t.logsDir:xn({installDir:e,profileEmail:t.profileEmail});return wi.default.join(r,ZA)},tS=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!eS(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Nd=(e,t=w())=>{let r={id:(0,Id.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=Od(t);ct.default.mkdirSync(wi.default.dirname(n),{recursive:!0});let o=ct.default.existsSync(n)?ct.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-QA+1)),JSON.stringify(r)];return ct.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},_o=(e=20,t=w())=>{let r=Od(t);if(!ct.default.existsSync(r))return[];let n=ct.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=tS(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var Pr,wo,rS,Md,ne,Wi,de,Cr=u(()=>{"use strict";Pr=g(require("node:fs")),wo=g(require("node:path"));Bt();rS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Md=e=>e.profileEmail===null?wo.default.join(e.installDir,vi):wo.default.join(e.installDir,"profiles",e.profileEmail,vi),ne=e=>{let t=Md(e);if(!Pr.default.existsSync(t))return null;try{let r=JSON.parse(Pr.default.readFileSync(t,"utf8"));return!rS(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},Wi=(e,t)=>{let r=Md(e),n=ne(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};Pr.default.mkdirSync(wo.default.dirname(r),{recursive:!0}),Pr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},de=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Hd,Dd,nS,Tr,Ei=u(()=>{"use strict";Hd=require("node:child_process"),Dd=require("node:util"),nS=(0,Dd.promisify)(Hd.execFile),Tr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await nS("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Fd,ki=u(()=>{"use strict";Fd="watchdog-reinstall-state.json"});var Ud={};Xe(Ud,{verifyAgentWitchReviveAfterKickstart:()=>iS});var sS,iS,jd=u(()=>{"use strict";ki();Cr();Ei();x();sS=e=>new Promise(t=>{setTimeout(t,e)}),iS=async e=>{if(await sS(e.verifyDelayMs??3e3),!await Tr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?L():L(e.profileEmail),n=ne(r);return!de(n,e.staleAfterMs)}});var Ir,Li,lS,$d,cS,Bd,Gd,Vd=u(()=>{"use strict";Ir=g(require("node:fs")),Li=g(require("node:path"));ki();x();lS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$d=e=>Li.default.join(e,Fd),cS=(e=w())=>{let t=$d(e);if(!Ir.default.existsSync(t))return null;try{let r=JSON.parse(Ir.default.readFileSync(t,"utf8"));return!lS(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Bd=(e=w(),t=Date.now())=>{let r=cS(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},Gd=(e=w(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=$d(e);return Ir.default.mkdirSync(Li.default.dirname(n),{recursive:!0}),Ir.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var zd,Gt,Kd,qd,Jd,dS,uS,Yd,mS,pS,Xd,Zd=u(()=>{"use strict";zd=require("node:child_process"),Gt=g(require("node:fs")),Kd=g(require("node:os")),qd=g(require("node:path")),Jd=require("node:util");tt();Ct();x();dS=(0,Jd.promisify)(zd.execFile),uS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yd=e=>{let t=Re(e),r=t===null?L():L(t);if(!Gt.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Gt.default.readFileSync(r.configPath,"utf8"));return!uS(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},mS=e=>Yd(e)?.wsUrl??null,pS=e=>{let t=mS(e);return t!==null?ee(t):z(e)?.appOrigin??null},Xd=async e=>{let t=e?.installDir??w(),r=Yd(t),n=r!==null?ee(r.wsUrl):pS(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=qd.default.join(Kd.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Gt.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Re(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await dS("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Gt.default.existsSync(i)&&Gt.default.unlinkSync(i)}}});var Qd={};Xe(Qd,{attemptAgentWitchWatchdogReinstall:()=>gS});var gS,eu=u(()=>{"use strict";Vd();Ar();Zd();gS=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!Bd())return{attempted:!1,ok:!1,targets:e};Gd();let r=await Xd();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await Pe(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var tu,ru,nu,fS,hS,yS,xi,Ri=u(()=>{"use strict";ur();Bt();Cr();Ei();Ar();Qe();x();_i();vo();tu=e=>e===null?L():L(e),ru=async(e,t,r)=>{if(!await Tr(e))return"not_running";let o=tu(t),s=ne(o);return de(s,r)?"stale_connection":"healthy"},nu=async e=>{let t=e?.staleAfterMs??ce,r=w(),n=V(r);return Promise.all(n.map(async o=>{let s=await ru(o.launchAgentLabel,o.profileEmail,t),i=tu(o.profileEmail),a=ne(i),c=await Tr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:de(a,t),needsRevive:s!=="healthy",reason:s}}))},fS=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},hS=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",yS=async e=>{let t=await Pe(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(jd(),Ud)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},xi=async e=>{if(!Ae())return{ok:!0,targets:[]};let t=e?.staleAfterMs??ce,r=w(),n=V(r),o=[];for(let m of n){let y=await ru(m.launchAgentLabel,m.profileEmail,t);if(y==="healthy"){o.push({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,revived:!1,reason:y});continue}o.push(await yS({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,reason:y,staleAfterMs:t}))}if(o.length===0){let m=bo();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:m.ok,reason:"not_running",...m.errorMessage!==void 0?{errorMessage:m.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(m=>m.reason!=="healthy"&&!m.revived))try{let{attemptAgentWitchWatchdogReinstall:m}=await Promise.resolve().then(()=>(eu(),Qd)),y=await m(o);s=y.attempted,i=y.ok,a=y.errorMessage,c=[...y.targets]}catch(m){s=!0,i=!1,a=m instanceof Error?m.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(m=>m.revived||m.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&Nd({event:hS(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:fS(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var ou,su,iu=u(()=>{"use strict";ou=g(require("node:os"));Bt();vo();Ri();su=async()=>{let e=await nu(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:ou.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:ce,healthyProfileCount:t,profiles:e,lastLog:_o(1)[0]??null}}});var au={};Xe(au,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ii,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ui,buildAgentWitchWakeHealthResponse:()=>Oi,buildAgentWitchWakeIdentityResponse:()=>Ni,buildAgentWitchWatchdogStatus:()=>Hi,installHarnessFromWakeServer:()=>Eo,readAgentWitchSelfUpdateLogEntries:()=>Lo,readAgentWitchWatchdogLogEntries:()=>ko,restartAgentWitchFromWakeServer:()=>Fi,reviveAgentWitchWebSocketFromWakeServer:()=>Di,runAgentWitchSelfUpdateFromWakeServer:()=>ji,runAgentWitchUninstallLocalFromWakeServer:()=>$i,runAutomationFromWakeServer:()=>Ti,syncAutomationsFromWakeServer:()=>Ci,wakeAgentWitchLaunchAgents:()=>Mi});var Wo,Pi,Eo,Ci,Ti,Ii,Oi,Ni,Mi,ko,Hi,Di,Fi,Ui,Lo,ji,$i,Bi=u(()=>{"use strict";Qs();go();wr();yi();lt();Wo=g(require("node:os"));Ai();jt();Ar();Qe();_d();kd();Pd();_i();iu();vo();It();Cn();Vs();Ri();Pi=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Eo=e=>{if(!Pi(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Ed(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!xr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Rd({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},Ci=e=>{if(!Pi(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!xr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Xn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Ti=async e=>{if(!Pi(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:xr(t)?Ut(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ii=()=>{let e=D(),t=e!==null?Ie(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Wo.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},Oi=()=>{let e=V();return{ok:!0,port:re(),hostname:Wo.default.hostname(),profileCount:e.length}},Ni=()=>{let e=V(),t=D()?.pairingToken.trim()??"",r=t.length>0?Lr(t):null,n=bd();return{hostname:Wo.default.hostname(),port:re(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Mi=async()=>{let e=V(),t=[];for(let r of e){let n=await Pe(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=bo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},ko=(e=20)=>_o(e),Hi=su,Di=xi,Fi=xi,Ui=qs,Lo=(e=20)=>Vn(e),ji=e=>Ks(e),$i=()=>Jl()});var Se=G((KE,du)=>{"use strict";var lu=["nodebuffer","arraybuffer","fragments"],cu=typeof Blob<"u";cu&&lu.push("blob");du.exports={BINARY_TYPES:lu,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:cu,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Or=G((qE,xo)=>{"use strict";var{EMPTY_BUFFER:AS}=Se(),Gi=Buffer[Symbol.species];function SS(e,t){if(e.length===0)return AS;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Gi(r.buffer,r.byteOffset,n):r}function uu(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function mu(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function bS(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Vi(e){if(Vi.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Gi(e):ArrayBuffer.isView(e)?t=new Gi(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Vi.readOnly=!1),t}xo.exports={concat:SS,mask:uu,toArrayBuffer:bS,toBuffer:Vi,unmask:mu};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");xo.exports.mask=function(t,r,n,o,s){s<48?uu(t,r,n,o,s):e.mask(t,r,n,o,s)},xo.exports.unmask=function(t,r){t.length<32?mu(t,r):e.unmask(t,r)}}catch{}});var fu=G((JE,gu)=>{"use strict";var pu=Symbol("kDone"),zi=Symbol("kRun"),Ki=class{constructor(t){this[pu]=()=>{this.pending--,this[zi]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[zi]()}[zi](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[pu])}}};gu.exports=Ki});var Kt=G((YE,Su)=>{"use strict";var Nr=require("zlib"),hu=Or(),_S=fu(),{kStatusCode:yu}=Se(),vS=Buffer[Symbol.species],wS=Buffer.from([0,0,255,255]),Po=Symbol("permessage-deflate"),be=Symbol("total-length"),Vt=Symbol("callback"),Ue=Symbol("buffers"),zt=Symbol("error"),Ro,qi=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Ro){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Ro=new _S(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Vt];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Ro.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){Ro.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Nr.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Nr.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Po]=this,this._inflate[be]=0,this._inflate[Ue]=[],this._inflate.on("error",ES),this._inflate.on("data",Au)}this._inflate[Vt]=n,this._inflate.write(t),r&&this._inflate.write(wS),this._inflate.flush(()=>{let s=this._inflate[zt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=hu.concat(this._inflate[Ue],this._inflate[be]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[be]=0,this._inflate[Ue]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Nr.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Nr.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[be]=0,this._deflate[Ue]=[],this._deflate.on("data",WS)}this._deflate[Vt]=n,this._deflate.write(t),this._deflate.flush(Nr.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=hu.concat(this._deflate[Ue],this._deflate[be]);r&&(s=new vS(s.buffer,s.byteOffset,s.length-4)),this._deflate[Vt]=null,this._deflate[be]=0,this._deflate[Ue]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};Su.exports=qi;function WS(e){this[Ue].push(e),this[be]+=e.length}function Au(e){if(this[be]+=e.length,this[Po]._maxPayload<1||this[be]<=this[Po]._maxPayload){this[Ue].push(e);return}this[zt]=new RangeError("Max payload size exceeded"),this[zt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[zt][yu]=1009,this.removeListener("data",Au),this.reset()}function ES(e){if(this[Po]._inflate=null,this[zt]){this[Vt](this[zt]);return}e[yu]=1007,this[Vt](e)}});var qt=G((XE,Co)=>{"use strict";var{isUtf8:bu}=require("buffer"),{hasBlob:kS}=Se(),LS=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function xS(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Ji(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function RS(e){return kS&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Co.exports={isBlob:RS,isValidStatusCode:xS,isValidUTF8:Ji,tokenChars:LS};if(bu)Co.exports.isValidUTF8=function(e){return e.length<24?Ji(e):bu(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Co.exports.isValidUTF8=function(t){return t.length<32?Ji(t):e(t)}}catch{}});var ea=G((ZE,Lu)=>{"use strict";var{Writable:PS}=require("stream"),_u=Kt(),{BINARY_TYPES:CS,EMPTY_BUFFER:vu,kStatusCode:TS,kWebSocket:IS}=Se(),{concat:Yi,toArrayBuffer:OS,unmask:NS}=Or(),{isValidStatusCode:MS,isValidUTF8:wu}=qt(),To=Buffer[Symbol.species],Y=0,Wu=1,Eu=2,ku=3,Xi=4,Zi=5,Io=6,Qi=class extends PS{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||CS[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[IS]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Y}_write(t,r,n){if(this._opcode===8&&this._state==Y)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new To(n.buffer,n.byteOffset+t,n.length-t),new To(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new To(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Y:this.getInfo(t);break;case Wu:this.getPayloadLength16(t);break;case Eu:this.getPayloadLength64(t);break;case ku:this.getMask();break;case Xi:this.getData(t);break;case Zi:case Io:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[_u.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Wu:this._payloadLength===127?this._state=Eu:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=ku:this._state=Xi}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Xi}getData(t){let r=vu;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&NS(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Zi,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[_u.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Y&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Y;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=Yi(n,r):this._binaryType==="arraybuffer"?o=OS(Yi(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=Y):(this._state=Io,setImmediate(()=>{this.emit("message",o,!0),this._state=Y,this.startLoop(t)}))}else{let o=Yi(n,r);if(!this._skipUTF8Validation&&!wu(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Zi||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=Y):(this._state=Io,setImmediate(()=>{this.emit("message",o,!1),this._state=Y,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,vu),this.end();else{let n=t.readUInt16BE(0);if(!MS(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new To(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!wu(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=Y;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Y):(this._state=Io,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Y,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[TS]=o,i}};Lu.exports=Qi});var na=G((ek,Pu)=>{"use strict";var{Duplex:QE}=require("stream"),{randomFillSync:HS}=require("crypto"),{types:{isUint8Array:DS}}=require("util"),xu=Kt(),{EMPTY_BUFFER:FS,kWebSocket:US,NOOP:jS}=Se(),{isBlob:Jt,isValidStatusCode:$S}=qt(),{mask:Ru,toBuffer:dt}=Or(),X=Symbol("kByteLength"),BS=Buffer.alloc(4),Oo=8*1024,ut,Yt=Oo,oe=0,GS=1,VS=2,ta=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=oe,this.onerror=jS,this[US]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||BS,r.generateMask?r.generateMask(n):(Yt===Oo&&(ut===void 0&&(ut=Buffer.alloc(Oo)),HS(ut,0,Oo),Yt=0),n[0]=ut[Yt++],n[1]=ut[Yt++],n[2]=ut[Yt++],n[3]=ut[Yt++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[X]!==void 0?a=r[X]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(Ru(t,n,d,s,a),[d]):(Ru(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=FS;else{if(typeof t!="number"||!$S(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(DS(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[X]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==oe?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Jt(t)?(o=t.size,s=!1):(t=dt(t),o=t.length,s=dt.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[X]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Jt(t)?this._state!==oe?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==oe?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Jt(t)?(o=t.size,s=!1):(t=dt(t),o=t.length,s=dt.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[X]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Jt(t)?this._state!==oe?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==oe?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[xu.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Jt(t)?(a=t.size,c=!1):(t=dt(t),a=t.length,c=dt.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[X]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Jt(t)?this._state!==oe?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==oe?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[X],this._state=VS,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(ra,this,a,o);return}this._bufferedBytes-=n[X];let i=dt(s);r?this.dispatch(i,r,n,o):(this._state=oe,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(zS,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[xu.extensionName];this._bufferedBytes+=n[X],this._state=GS,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");ra(this,c,o);return}this._bufferedBytes-=n[X],this._state=oe,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===oe&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][X],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][X],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Pu.exports=ta;function ra(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function zS(e,t,r){ra(e,t,r),e.onerror(t)}});var Fu=G((tk,Du)=>{"use strict";var{kForOnEventAttribute:Mr,kListener:oa}=Se(),Cu=Symbol("kCode"),Tu=Symbol("kData"),Iu=Symbol("kError"),Ou=Symbol("kMessage"),Nu=Symbol("kReason"),Xt=Symbol("kTarget"),Mu=Symbol("kType"),Hu=Symbol("kWasClean"),_e=class{constructor(t){this[Xt]=null,this[Mu]=t}get target(){return this[Xt]}get type(){return this[Mu]}};Object.defineProperty(_e.prototype,"target",{enumerable:!0});Object.defineProperty(_e.prototype,"type",{enumerable:!0});var mt=class extends _e{constructor(t,r={}){super(t),this[Cu]=r.code===void 0?0:r.code,this[Nu]=r.reason===void 0?"":r.reason,this[Hu]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Cu]}get reason(){return this[Nu]}get wasClean(){return this[Hu]}};Object.defineProperty(mt.prototype,"code",{enumerable:!0});Object.defineProperty(mt.prototype,"reason",{enumerable:!0});Object.defineProperty(mt.prototype,"wasClean",{enumerable:!0});var Zt=class extends _e{constructor(t,r={}){super(t),this[Iu]=r.error===void 0?null:r.error,this[Ou]=r.message===void 0?"":r.message}get error(){return this[Iu]}get message(){return this[Ou]}};Object.defineProperty(Zt.prototype,"error",{enumerable:!0});Object.defineProperty(Zt.prototype,"message",{enumerable:!0});var Hr=class extends _e{constructor(t,r={}){super(t),this[Tu]=r.data===void 0?null:r.data}get data(){return this[Tu]}};Object.defineProperty(Hr.prototype,"data",{enumerable:!0});var KS={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[Mr]&&o[oa]===t&&!o[Mr])return;let n;if(e==="message")n=function(s,i){let a=new Hr("message",{data:i?s:s.toString()});a[Xt]=this,No(t,this,a)};else if(e==="close")n=function(s,i){let a=new mt("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Xt]=this,No(t,this,a)};else if(e==="error")n=function(s){let i=new Zt("error",{error:s,message:s.message});i[Xt]=this,No(t,this,i)};else if(e==="open")n=function(){let s=new _e("open");s[Xt]=this,No(t,this,s)};else return;n[Mr]=!!r[Mr],n[oa]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[oa]===t&&!r[Mr]){this.removeListener(e,r);break}}};Du.exports={CloseEvent:mt,ErrorEvent:Zt,Event:_e,EventTarget:KS,MessageEvent:Hr};function No(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Mo=G((rk,Uu)=>{"use strict";var{tokenChars:Dr}=qt();function ue(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function qS(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,m=-1,y=0;for(;y<e.length;y++)if(d=e.charCodeAt(y),i===void 0)if(m===-1&&Dr[d]===1)c===-1&&(c=y);else if(y!==0&&(d===32||d===9))m===-1&&c!==-1&&(m=y);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y);let A=e.slice(c,m);d===44?(ue(t,A,r),r=Object.create(null)):i=A,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);else if(a===void 0)if(m===-1&&Dr[d]===1)c===-1&&(c=y);else if(d===32||d===9)m===-1&&c!==-1&&(m=y);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y),ue(r,e.slice(c,m),!0),d===44&&(ue(t,i,r),r=Object.create(null),i=void 0),c=m=-1}else if(d===61&&c!==-1&&m===-1)a=e.slice(c,y),c=m=-1;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(o){if(Dr[d]!==1)throw new SyntaxError(`Unexpected character at index ${y}`);c===-1?c=y:n||(n=!0),o=!1}else if(s)if(Dr[d]===1)c===-1&&(c=y);else if(d===34&&c!==-1)s=!1,m=y;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(d===34&&e.charCodeAt(y-1)===61)s=!0;else if(m===-1&&Dr[d]===1)c===-1&&(c=y);else if(c!==-1&&(d===32||d===9))m===-1&&(m=y);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);m===-1&&(m=y);let A=e.slice(c,m);n&&(A=A.replace(/\\/g,""),n=!1),ue(r,a,A),d===44&&(ue(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");m===-1&&(m=y);let v=e.slice(c,m);return i===void 0?ue(t,v,r):(a===void 0?ue(r,v,!0):n?ue(r,a,v.replace(/\\/g,"")):ue(r,a,v),ue(t,i,r)),t}function JS(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Uu.exports={format:JS,parse:qS}});var Uo=G((sk,Zu)=>{"use strict";var YS=require("events"),XS=require("https"),ZS=require("http"),Bu=require("net"),QS=require("tls"),{randomBytes:eb,createHash:tb}=require("crypto"),{Duplex:nk,Readable:ok}=require("stream"),{URL:sa}=require("url"),je=Kt(),rb=ea(),nb=na(),{isBlob:ob}=qt(),{BINARY_TYPES:ju,CLOSE_TIMEOUT:sb,EMPTY_BUFFER:Ho,GUID:ib,kForOnEventAttribute:ia,kListener:ab,kStatusCode:lb,kWebSocket:N,NOOP:Gu}=Se(),{EventTarget:{addEventListener:cb,removeEventListener:db}}=Fu(),{format:ub,parse:mb}=Mo(),{toBuffer:pb}=Or(),Vu=Symbol("kAborted"),aa=[8,13],ve=["CONNECTING","OPEN","CLOSING","CLOSED"],gb=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,P=class e extends YS{constructor(t,r,n){super(),this._binaryType=ju[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Ho,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),zu(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){ju.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new rb({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new nb(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[N]=this,s[N]=this,t[N]=this,o.on("conclude",yb),o.on("drain",Ab),o.on("error",Sb),o.on("message",bb),o.on("ping",_b),o.on("pong",vb),s.onerror=wb,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",Ju),t.on("data",Fo),t.on("end",Yu),t.on("error",Xu),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[je.extensionName]&&this._extensions[je.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){q(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),qu(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){la(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Ho,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){la(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Ho,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){la(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[je.extensionName]||(o.compress=!1),this._sender.send(t||Ho,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){q(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(P,"CONNECTING",{enumerable:!0,value:ve.indexOf("CONNECTING")});Object.defineProperty(P.prototype,"CONNECTING",{enumerable:!0,value:ve.indexOf("CONNECTING")});Object.defineProperty(P,"OPEN",{enumerable:!0,value:ve.indexOf("OPEN")});Object.defineProperty(P.prototype,"OPEN",{enumerable:!0,value:ve.indexOf("OPEN")});Object.defineProperty(P,"CLOSING",{enumerable:!0,value:ve.indexOf("CLOSING")});Object.defineProperty(P.prototype,"CLOSING",{enumerable:!0,value:ve.indexOf("CLOSING")});Object.defineProperty(P,"CLOSED",{enumerable:!0,value:ve.indexOf("CLOSED")});Object.defineProperty(P.prototype,"CLOSED",{enumerable:!0,value:ve.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(P.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(P.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[ia])return t[ab];return null},set(t){for(let r of this.listeners(e))if(r[ia]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[ia]:!0})}})});P.prototype.addEventListener=cb;P.prototype.removeEventListener=db;Zu.exports=P;function zu(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:sb,protocolVersion:aa[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!aa.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${aa.join(", ")})`);let s;if(t instanceof sa)s=t;else try{s=new sa(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;Do(e,l);return}let d=i?443:80,m=eb(16).toString("base64"),y=i?XS.request:ZS.request,v=new Set,A;if(o.createConnection=o.createConnection||(i?hb:fb),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":m,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(A=new je({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=ub({[je.extensionName]:A.offer()})),r.length){for(let l of r){if(typeof l!="string"||!gb.test(l)||v.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");v.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let f;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[S,h]of Object.entries(l))n.headers[S.toLowerCase()]=h}else if(e.listenerCount("redirect")===0){let l=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),f=e._req=y(o),e._redirects&&e.emit("redirect",e.url,f)}else f=e._req=y(o);o.timeout&&f.on("timeout",()=>{q(e,f,"Opening handshake has timed out")}),f.on("error",l=>{f===null||f[Vu]||(f=e._req=null,Do(e,l))}),f.on("response",l=>{let S=l.headers.location,h=l.statusCode;if(S&&o.followRedirects&&h>=300&&h<400){if(++e._redirects>o.maxRedirects){q(e,f,"Maximum redirects exceeded");return}f.abort();let p;try{p=new sa(S,t)}catch{let _=new SyntaxError(`Invalid URL: ${S}`);Do(e,_);return}zu(e,p,r,n)}else e.emit("unexpected-response",f,l)||q(e,f,`Unexpected server response: ${l.statusCode}`)}),f.on("upgrade",(l,S,h)=>{if(e.emit("upgrade",l),e.readyState!==P.CONNECTING)return;f=e._req=null;let p=l.headers.upgrade;if(p===void 0||p.toLowerCase()!=="websocket"){q(e,S,"Invalid Upgrade header");return}let b=tb("sha1").update(m+ib).digest("base64");if(l.headers["sec-websocket-accept"]!==b){q(e,S,"Invalid Sec-WebSocket-Accept header");return}let _=l.headers["sec-websocket-protocol"],W;if(_!==void 0?v.size?v.has(_)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":v.size&&(W="Server sent no subprotocol"),W){q(e,S,W);return}_&&(e._protocol=_);let k=l.headers["sec-websocket-extensions"];if(k!==void 0){if(!A){q(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=mb(k)}catch{q(e,S,"Invalid Sec-WebSocket-Extensions header");return}let j=Object.keys(R);if(j.length!==1||j[0]!==je.extensionName){q(e,S,"Server indicated an extension that was not requested");return}try{A.accept(R[je.extensionName])}catch{q(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[je.extensionName]=A}e.setSocket(S,h,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(f,e):f.end()}function Do(e,t){e._readyState=P.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function fb(e){return e.path=e.socketPath,Bu.connect(e)}function hb(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Bu.isIP(e.host)?"":e.host),QS.connect(e)}function q(e,t,r){e._readyState=P.CLOSING;let n=new Error(r);Error.captureStackTrace(n,q),t.setHeader?(t[Vu]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Do,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function la(e,t,r){if(t){let n=ob(t)?t.size:pb(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${ve[e.readyState]})`);process.nextTick(r,n)}}function yb(e,t){let r=this[N];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[N]!==void 0&&(r._socket.removeListener("data",Fo),process.nextTick(Ku,r._socket),e===1005?r.close():r.close(e,t))}function Ab(){let e=this[N];e.isPaused||e._socket.resume()}function Sb(e){let t=this[N];t._socket[N]!==void 0&&(t._socket.removeListener("data",Fo),process.nextTick(Ku,t._socket),t.close(e[lb])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function $u(){this[N].emitClose()}function bb(e,t){this[N].emit("message",e,t)}function _b(e){let t=this[N];t._autoPong&&t.pong(e,!this._isServer,Gu),t.emit("ping",e)}function vb(e){this[N].emit("pong",e)}function Ku(e){e.resume()}function wb(e){let t=this[N];t.readyState!==P.CLOSED&&(t.readyState===P.OPEN&&(t._readyState=P.CLOSING,qu(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function qu(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function Ju(){let e=this[N];if(this.removeListener("close",Ju),this.removeListener("data",Fo),this.removeListener("end",Yu),e._readyState=P.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[N]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",$u),e._receiver.on("finish",$u))}function Fo(e){this[N]._receiver.write(e)||this.pause()}function Yu(){let e=this[N];e._readyState=P.CLOSING,e._receiver.end(),this.end()}function Xu(){let e=this[N];this.removeListener("error",Xu),this.on("error",Gu),e&&(e._readyState=P.CLOSING,this.destroy())}});var rm=G((ak,tm)=>{"use strict";var ik=Uo(),{Duplex:Wb}=require("stream");function Qu(e){e.emit("close")}function Eb(){!this.destroyed&&this._writableState.finished&&this.destroy()}function em(e){this.removeListener("error",em),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function kb(e,t){let r=!0,n=new Wb({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(Qu,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(Qu,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",Eb),n.on("error",em),n}tm.exports=kb});var ca=G((lk,nm)=>{"use strict";var{tokenChars:Lb}=qt();function xb(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&Lb[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}nm.exports={parse:xb}});var dm=G((dk,cm)=>{"use strict";var Rb=require("events"),jo=require("http"),{Duplex:ck}=require("stream"),{createHash:Pb}=require("crypto"),om=Mo(),pt=Kt(),Cb=ca(),Tb=Uo(),{CLOSE_TIMEOUT:Ib,GUID:Ob,kWebSocket:Nb}=Se(),Mb=/^[+/0-9A-Za-z]{22}==$/,sm=0,im=1,lm=2,da=class extends Rb{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:Ib,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:Tb,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=jo.createServer((n,o)=>{let s=jo.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=Hb(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=sm}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===lm){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Fr,this);return}if(t&&this.once("close",t),this._state!==im)if(this._state=im,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Fr,this):process.nextTick(Fr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Fr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",am);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){gt(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){gt(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Mb.test(s)){gt(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){gt(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Ur(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=Cb.parse(c)}catch{gt(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let m=t.headers["sec-websocket-extensions"],y={};if(this.options.perMessageDeflate&&m!==void 0){let v=new pt({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let A=om.parse(m);A[pt.extensionName]&&(v.accept(A[pt.extensionName]),y[pt.extensionName]=v)}catch{gt(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let v={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(v,(A,f,l,S)=>{if(!A)return Ur(r,f||401,l,S);this.completeUpgrade(y,s,d,t,r,n,o)});return}if(!this.options.verifyClient(v))return Ur(r,401)}this.completeUpgrade(y,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Nb])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>sm)return Ur(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${Pb("sha1").update(r+Ob).digest("base64")}`],m=new this.options.WebSocket(null,void 0,this.options);if(n.size){let y=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;y&&(d.push(`Sec-WebSocket-Protocol: ${y}`),m._protocol=y)}if(t[pt.extensionName]){let y=t[pt.extensionName].params,v=om.format({[pt.extensionName]:[y]});d.push(`Sec-WebSocket-Extensions: ${v}`),m._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",am),m.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(m),m.on("close",()=>{this.clients.delete(m),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Fr,this)})),a(m,o)}};cm.exports=da;function Hb(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Fr(e){e._state=lm,e.emit("close")}function am(){this.destroy()}function Ur(e,t,r,n){r=r||jo.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${jo.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function gt(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,gt),e.emit("wsClientError",i,r,t)}else Ur(r,n,o,s)}});var Db,Fb,Ub,jb,$b,Bb,um,Gb,jr,mm=u(()=>{Db=g(rm(),1),Fb=g(Mo(),1),Ub=g(Kt(),1),jb=g(ea(),1),$b=g(na(),1),Bb=g(ca(),1),um=g(Uo(),1),Gb=g(dm(),1),jr=um.default});var ua=u(()=>{"use strict"});var we,$r=u(()=>{"use strict";we=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Qt,ft,pm,zb,ma,pa,gm,fm,hm,ym,ga,fa=u(()=>{"use strict";Qt=g(require("node:fs")),ft=g(require("node:os")),pm=g(require("node:path"));ua();$r();zb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ma=(e=ft.default.hostname())=>pm.default.join(ft.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),pa=e=>{if(!Qt.default.existsSync(e))return null;try{let t=JSON.parse(Qt.default.readFileSync(e,"utf8"));return!zb(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},gm=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},fm=(e,t)=>{Qt.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},hm=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ma(),n=pa(r);if(n!==null&&n.pid!==process.pid&&we(n.pid)&&gm(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:ft.default.hostname(),macOsUsername:ft.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return fm(r,o),{ok:!0}},ym=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??ma(),n=pa(r);return n!==null&&n.pid!==process.pid&&we(n.pid)&&gm(n)?{ok:!1}:(fm(r,{hostname:ft.default.hostname(),macOsUsername:ft.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ga=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??ma();pa(r)?.pid===process.pid&&Qt.default.existsSync(r)&&Qt.default.unlinkSync(r)}});var ha,Br,Kb,qb,Jb,Yb,Am,Sm=u(()=>{"use strict";ha=require("node:child_process"),Br=g(require("node:path"));$r();Wt();Kb=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),qb=(e,t)=>{if(Kb(e)||!/\bnode\b/.test(e))return!1;let r=Br.default.resolve(t),n=Br.default.join(r,"app",fe),o=Br.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===fe||i==="agent-witch.ts")return e.includes(r);try{let a=Br.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},Jb=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,ha.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Yb=(e,t,r)=>{let n=Jb(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||qb(d,t)&&o.push(c)}return o},Am=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,ha.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=Yb(r,e.installDir,t),o=[];for(let s of n)if(we(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var Gr,Vr,bm,Xb,_m,vm=u(()=>{"use strict";Gr=g(require("node:fs")),Vr=g(require("node:path"));x();bm=(e,t)=>{!Gr.default.existsSync(e)||Gr.default.existsSync(t)||(Gr.default.mkdirSync(Vr.default.dirname(t),{recursive:!0}),Gr.default.renameSync(e,t))},Xb=e=>{if(e.profileEmail===null)return;let t=Vr.default.join(e.installDir,he);bm(Vr.default.join(t,kn),e.mainLogPath),bm(Vr.default.join(t,Ln),e.errorLogPath)},_m=e=>{let t=L();e!==void 0&&t.installDir!==e||Xb(t)}});var wm,Wm,Em,km,Lm=u(()=>{"use strict";wm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Wm=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?wm(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?wm(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Em=e=>{let t=e.watchdogLogs.map(Wm).join(""),r=e.updateLogs.map(Wm).join("");return`<!doctype html>
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
</html>`},km=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var xm,Rm,Pm=u(()=>{"use strict";xm=g(require("node:net")),Rm=()=>new Promise((e,t)=>{let r=xm.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var Cm,Zb,Tm,Im=u(()=>{"use strict";Cm=g(require("node:net"));Pm();jt();yo();x();Zb=e=>new Promise(t=>{let r=Cm.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Tm=async()=>{let e=w(),t=re();if(await Zb(t))return Ad(t),t;let r=await Rm();return ho(e,r),r}});var Qb,Om,Nm=u(()=>{"use strict";Qb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Om=e=>({force:Qb(e)&&e.force===!0})});var ya,e_,$e,$o=u(()=>{"use strict";ya=g(require("node:os")),e_=e=>{let t=e.trim();return t.startsWith("~/")?`${ya.default.homedir()}${t.slice(1)}`:t==="~"?ya.default.homedir():t},$e=e_});var ht,Be,zr=u(()=>{"use strict";ht=g(require("node:path"));Rt();$o();Be=e=>{let t=$e(e),r=ht.default.join(t,tc);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:ht.default.join(r,"rag"),memoryDirPath:ht.default.join(r,rc),reportsDirPath:ht.default.join(r,oc),metaFilePath:ht.default.join(r,nc),ragChunksFilePath:ht.default.join(r,"rag",Nn)}}});var me,Hm,t_,r_,We,Kr=u(()=>{"use strict";me=g(require("node:fs")),Hm=g(require("node:path"));Rt();zr();t_=(e,t)=>{if(me.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};me.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},r_=e=>{me.default.existsSync(e.ragChunksFilePath)||me.default.writeFileSync(e.ragChunksFilePath,"");let t=Hm.default.join(e.memoryDirPath,Mn);me.default.existsSync(t)||me.default.writeFileSync(t,"")},We=e=>{let t=Be(e.projectFolderPath);return me.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),me.default.mkdirSync(t.ragDirPath,{recursive:!0}),me.default.mkdirSync(t.memoryDirPath,{recursive:!0}),t_(t,e),r_(t),{ok:!0,layout:t}}});var n_,Dm,Fm=u(()=>{"use strict";Kr();n_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dm=e=>{if(!n_(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:We({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var jm,i_,Um,T,o_,s_,Aa,$m=u(()=>{"use strict";jm=g(require("node:http"));Bi();Ai();Lm();Im();Nm();On();Fm();$n();wt();i_={},Um=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},T=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},o_=e=>{e.writeHead(403),e.end()},s_=async(e,t,r)=>{let n=e.headers.origin,o=gd(n);try{if(n!==void 0&&n.length>0&&!o.allowed){o_(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){T(t,200,Oi(),o.headers);return}if(e.method==="GET"&&s==="/identity"){T(t,200,Ni(),o.headers);return}if(e.method==="GET"&&s==="/local"){let i=ko(50),a=Lo(50);t.writeHead(200,km()),t.end(Em({port:r,watchdogLogs:i,updateLogs:a}));return}if(e.method==="GET"&&s==="/watchdog/status"){let i=await Hi();T(t,200,i,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let i=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:ko(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let i=await Di();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/restart"){let i=await Fi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let i=Ui();T(t,200,{ok:!0,...i},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let i=new URL(e.url??"/update/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:Lo(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let i=await Um(e),{force:a}=Om(i),c=await ji({force:a});T(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let i=await $i();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/wake"){let i=await Mi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Eo(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let i=await Um(e),a=Dm(i);T(t,a.ok?200:400,a,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Eo(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){T(t,200,Ii(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Ci(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await Ti(a);T(t,c.ok?200:503,c,o.headers);return}T(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{T(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},Aa=async()=>{let e=await Tm(),t=jm.default.createServer((r,n)=>{s_(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!ae()&&Pt(i_.url)&&(async()=>{xt("agent-witch-wake-server");let e=await Aa(),t=In(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var Sa,Bm=u(()=>{"use strict";wr();go();lt();Sa=async()=>{let e=D();if(e===null)return;let t=Ie(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Ut(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Gm,Vm=u(()=>{"use strict";ua();$m();fa();Bm();Gm=async(e={})=>{let t=await Aa();Sa();let r=setInterval(()=>{Sa()},6e4),n=setInterval(()=>{if(!ym().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var qr,Bo,c_,zm,Km,Go,qm,Jm,ba,Ym,Vo,Xm=u(()=>{"use strict";qr=g(require("node:fs")),Bo=g(require("node:path")),c_="pending-run-inputs.json",zm=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Km=e=>{let t=e.profileEmail?Bo.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Bo.default.join(t,c_)},Go=e=>{let t=Km(e);if(!qr.default.existsSync(t))return{};try{let r=JSON.parse(qr.default.readFileSync(t,"utf8"));return zm(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!zm(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},qm=(e,t)=>{let r=Km(e);qr.default.mkdirSync(Bo.default.dirname(r),{recursive:!0}),qr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Jm=e=>Object.values(Go(e)),ba=(e,t)=>Go(e)[t]!==void 0,Ym=(e,t)=>{let r=Go(e);r[t.agentRunId]=t,qm(e,r)},Vo=(e,t)=>{let r=Go(e);delete r[t],qm(e,r)}});var _a,Zm=u(()=>{"use strict";_a={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var va,iL,Qm=u(()=>{"use strict";va={OPEN:"open",APPROVAL:"approval"},iL=va.APPROVAL});var er,zo,ep,d_,tp,rp,np,Ko,op,wa=u(()=>{"use strict";er=g(require("node:fs")),zo=g(require("node:path")),ep="runs",d_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tp=e=>{let t=e.profileEmail!==null?zo.default.join(e.installDir,"profiles",e.profileEmail,ep):zo.default.join(e.installDir,ep);return er.default.mkdirSync(t,{recursive:!0}),t},rp=(e,t)=>zo.default.join(tp(e),`${t}.json`),np=(e,t)=>{er.default.writeFileSync(rp(e,t.id),JSON.stringify(t,null,2))},Ko=(e,t)=>{let r=rp(e,t);if(!er.default.existsSync(r))return null;try{let n=JSON.parse(er.default.readFileSync(r,"utf8"));return!d_(n)||typeof n.id!="string"?null:n}catch{return null}},op=e=>{let t=tp(e),r=er.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Ko(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var u_,sp,ip=u(()=>{"use strict";Zm();Qm();wa();u_=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?_a.COMPLETED:_a.FAILED,dispatchPolicy:va.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},sp=(e,t)=>{let r=u_(t);return np(e,r),r}});var Jr,qo,m_,Wa,ap,lp,cp,Ea,dp=u(()=>{"use strict";Jr=g(require("node:fs")),qo=g(require("node:path"));Ot();m_="run-completion-outbox.json",Wa=e=>{let t=e.profileEmail?qo.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return qo.default.join(t,m_)},ap=e=>{let t=Wa(e);if(!Jr.default.existsSync(t))return[];try{let r=JSON.parse(Jr.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},lp=(e,t)=>{Jr.default.mkdirSync(qo.default.dirname(Wa(e)),{recursive:!0}),Jr.default.writeFileSync(Wa(e),JSON.stringify(t,null,2),"utf8")},cp=(e,t)=>{let r=[...ap(e).filter(n=>n.runId!==t.runId),t];lp(e,r)},Ea=async e=>{if(e.cloudApi===null)return;let t=ap(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Qn(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);lp(e.layout,r)}});var up=u(()=>{"use strict"});var ka,Yr,g_,yt,mp=u(()=>{"use strict";up();ka=new Map,Yr=e=>{let t=ka.get(e);t!==void 0&&(clearInterval(t),ka.delete(e))},g_=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},yt=(e,t,r,n={})=>{Yr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Yr(t);return}let i=n.onTick?.()??{};g_(e,t,o,i)};s(),ka.set(t,setInterval(s,15e3))}});var La,Xr,At,pp,Ge,gp,Jo=u(()=>{"use strict";La=new Set,Xr=new Map,At=(e,t)=>{if(t.length===0)return;let r=Xr.get(e)??[];r.push(t),Xr.set(e,r)},pp=e=>{La.add(e);let t=Xr.get(e)??[];return Xr.delete(e),t},Ge=e=>La.has(e),gp=e=>{La.delete(e),Xr.delete(e)}});var fp,hp,yp,Ap,$,tr,Sp,bp,Zr,_p,vp,xa,wp,Wp,Ep,Yo=u(()=>{"use strict";fp=require("node:crypto"),hp=g(require("node:fs")),yp=g(require("node:path")),Ap=require("node:url");$r();wt();Rs();$=new Map,Sp=async()=>{if(tr!==void 0)return tr;try{if(ae()){let e=En(),t=yp.default.join(e,"deps","node-pty","lib","index.js");if(hp.default.existsSync(t)){let r=await import((0,Ap.pathToFileURL)(t).href);return tr=r,r}}return tr=await import("node-pty"),tr}catch{return tr=null,null}},bp=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},Zr=(e,t,r)=>{let n=$.get(e);if(n!==void 0){$.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},_p=(e,t)=>{let r=$.get(e);return r===void 0?!1:(r.pty.write(t),!0)},vp=(e,t,r)=>{let n=$.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},xa=e=>{for(let t of $.values())if(!(t.mode!=="agent"||t.runId!==e))return we(t.pty.pid);return!1},wp=e=>{for(let[t,r]of $.entries())if(!(r.mode!=="agent"||r.runId!==e)){$.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Wp=async e=>{let t=await Sp();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;$.get(e.shellSessionId)!==void 0&&Zr(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return $.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{bp(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{$.get(e.shellSessionId)?.pty===o&&($.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Ep=async e=>{let t=e.shellSessionId??(0,fp.randomUUID)(),r=await Sp();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return $.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{bp(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{$.get(t)?.pty===n&&($.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var Xo,kp,Lp=u(()=>{"use strict";Xo="[[AWAITING_INPUT]]",kp=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Xo,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Qr,xp,Zo=u(()=>{"use strict";Lp();Qr=e=>{let t=e.indexOf(Xo);if(t<0)return null;let n=e.slice(t+Xo.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},xp=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",kp].join(`
`)});var Rp,Pp=u(()=>{"use strict";Jo();Yo();Zo();Rp=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Ge(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}At(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Ep({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=Qr(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var Cp,Tp,Ip,Ve,Qo=u(()=>{"use strict";Cp=require("node:child_process"),Tp=g(require("node:fs")),Ip=g(require("node:path"));Wt();Ve=(e,t)=>{let r=Ip.default.join(e,"app",Il,"ensure-writer.sh");return Tp.default.existsSync(r)?new Promise((n,o)=>{let s=(0,Cp.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var Op,St,ts,Np,Mp,es,Hp,rs,Dp,Fp,f_,en,h_,y_,Up,Ra=u(()=>{"use strict";Op=require("node:child_process");ot();Qo();kr();it();De();at();St=new Map,ts=e=>e==="cursor"||e==="antigravity",Np=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Mp=e=>St.get(e)?.warmed===!0,es=e=>{let t=St.get(e);St.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Hp=e=>St.get(e)?.conversationStarted===!0,rs=e=>{let t=St.get(e);St.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Dp=e=>{St.delete(e)},Fp=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",f_={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},en=e=>`${f_[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,h_=(e,t,r,n)=>new Promise(o=>{let s=Qc(t,r),i=[],a=(0,Op.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let m=d.toString("utf8");i.push(m),n?.(m)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),y_=(e,t)=>{let r=en(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Up=async e=>{if(!H(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&K(e.runConfig.writerExecutionBackend)==="api"){let r=Me(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=te(e.runConfig.layout.configPath);return He(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),es(e.writerAgent),{exitCode:0,output:en(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Ve(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}ts(e.writerAgent)&&es(e.writerAgent);let t=await h_(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?y_(e.writerAgent,t.output):en(e.writerAgent)}}});var jp,tn,M,Pa,$p,Bp,Ca,Gp,Vp,zp,A_,se,rn,ze,Kp,S_,b_,Ta,qp,Jp,Yp,Xp=u(()=>{"use strict";jp=require("node:child_process");ot();Xm();ip();dp();mp();$r();Jo();Yo();Zo();Pp();Ra();ti();li();De();gr();Zo();tn=new Map,M=new Map,Pa=new Set,$p=130,Bp=`

Stopped by user.`,Ca=null,Gp=e=>{Ca=e},Vp=async e=>{await Ea({layout:e,cloudApi:Ca})},zp=e=>{let t=tn.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:we(t.pid)},A_=e=>Ne({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),se=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},rn=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Fn(s),c=M.get(r);if(a!==null&&c!==void 0){let d=fc(a),m=zp(r)||xa(r);d!==null&&!m&&ze(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return gc(a)}}),ze=(e,t,r,n,o,s,i,a)=>{let c=o,d=to(s,a);r!==void 0&&Pa.has(r)&&(Pa.delete(r),c=$p,d=d.trim().length>0&&!d.includes("Stopped by user.")?`${d.trim()}${Bp}`:"Stopped by user."),r!==void 0&&(Yr(r),Ge(r)&&(se(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),gp(r)),sp(e.layout,{agentRunId:r,originalPrompt:i,exitCode:c,output:d,layout:e.layout}),cp(e.layout,{runId:r,exitCode:c,output:d,createdAt:new Date().toISOString()}),Ea({layout:e.layout,cloudApi:Ca}),M.delete(r),tn.delete(r),Vo(e.layout,r)),se(t,{type:"command.claude.result",payload:{exitCode:c,output:d,...r!==void 0?{agentRunId:r}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n})},Kp=(e,t,r,n,o,s,i)=>{let a=M.get(r),c=a?.accumulatedOutput??s;Ym(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),yt(t,r,()=>ba(e.layout,r),rn(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),se(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},S_=(e,t,r,n,o,s,i)=>{let a=[],c=!1,d=m=>{if(!(o===void 0||m.length===0)){if(Ge(o)){se(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:m},requestId:n});return}At(o,m)}};if(o!==void 0){let m=M.get(o);tn.set(o,t),M.set(o,{originalPrompt:s,writerAgent:i,projectFolderPath:m?.projectFolderPath,reportKey:m?.reportKey,accumulatedOutput:m?.accumulatedOutput??""}),se(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),yt(r,o,()=>zp(o),rn(e,r,o,n,m?.projectFolderPath,m?.reportKey))}t.stdout?.on("data",m=>{let y=m.toString("utf8");if(a.push(y),d(y),c||o===void 0)return;let v=Qr(a.join(""));if(v!==null){c=!0,t.kill("SIGTERM");let A=M.get(o),f=[A?.accumulatedOutput??"",v.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),tn.delete(o),Kp(e,r,o,n,v.question,f,s)}}),t.stderr?.on("data",m=>{let y=m.toString("utf8");a.push(y),d(y)}),t.on("close",m=>{if(c)return;rs(i);let y=o!==void 0?M.get(o):void 0,v=a.join("").trim(),A=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${v}`.trim():v;ze(e,r,o,n,m??-1,A,s)}),t.on("error",m=>{c||ze(e,r,o,n,-1,m.message,s)})},b_=(e,t,r,n,o,s,i,a)=>{s!==void 0&&(M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),se(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),yt(o,s,()=>M.has(s),rn(e,o,s,n,i,a))),co(e,t,r,d=>{if(!(s===void 0||d.length===0)){if(Ge(s)){se(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:d},requestId:n});return}At(s,d)}}).then(d=>{rs(t),ze(e,o,s,n,d.exitCode,d.output,r,d.llmUsage)}).catch(d=>{let m=d instanceof Error?d.message:String(d);ze(e,o,s,n,-1,m,r)})},Ta=(e,t,r,n,o,s,i,a,c,d)=>{if(lo(e,t)){b_(e,t,r,n,o,s,c,d);return}let m=Nt(t,r,A_(e),i);if(m===null){ze(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let y=()=>{let v=(0,jp.spawn)(m.command,[...m.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});S_(e,v,o,n,s,r,t)};if(s===void 0){y();return}M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:M.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Un({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),yt(o,s,()=>M.has(s),rn(e,o,s,n,c,d)),Rp({socket:o,sendMessage:se,requestId:n,agentRunId:s,shellSessionId:a,command:m.command,args:m.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:v=>{a!==void 0&&Zr(a,l=>{se(o,l)},n);let A=M.get(s),f=[A?.accumulatedOutput??"",v.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),Kp(e,o,s,n,v.question,f,r)},onFinished:(v,A)=>{rs(t);let f=M.get(s),l=f!==void 0&&f.accumulatedOutput.length>0?`${f.accumulatedOutput}

${A}`.trim():A;ze(e,o,s,n,v,l,r)}}).then(v=>{if(!v){y();return}yt(o,s,()=>xa(s),rn(e,o,s,n,c,d))}).catch(v=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",v instanceof Error?v.message:v),y()})},qp=(e,t,r,n)=>{Vo(e.layout,t.agentRunId),t.shellSessionId!==void 0&&se(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=xp(t),s=M.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Ta(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c)},Jp=(e,t)=>{for(let r of Jm(e.layout))M.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),yt(t,r.agentRunId,()=>ba(e.layout,r.agentRunId),{awaitingInput:!0}),se(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Yp=(e,t,r,n)=>{let o=M.get(r);if(o===void 0)return!1;Pa.add(r),Yr(r);let s=tn.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(wp(r))return!0;Vo(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${Bp}`:"Stopped by user.";return ze(e,t,r,n,$p,i,o.originalPrompt),!0}});var __,Zp,Qp=u(()=>{"use strict";jt();__=()=>`http://127.0.0.1:${re()}/restart`,Zp=async()=>{try{let e=await fetch(__(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var bt,Ia,v_,w_,Oa,_t,ns,eg,os=u(()=>{"use strict";bt=g(require("node:fs")),Ia=g(require("node:path")),v_="local-ws-traffic.ndjson",w_=500,Oa=e=>Ia.default.join(e.logsDir,v_),_t=(e,t)=>{let r=Oa(e);bt.default.mkdirSync(Ia.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});bt.default.appendFileSync(r,`${n}
`,"utf8")},ns=(e,t=w_)=>{let r=Oa(e);if(!bt.default.existsSync(r))return[];let o=bt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},eg=e=>{let t=Oa(e);bt.default.existsSync(t)&&bt.default.writeFileSync(t,"","utf8")}});var W_,ss,Na=u(()=>{"use strict";jt();W_=()=>`http://127.0.0.1:${re()}/update/run`,ss=async e=>{try{let t=await fetch(W_(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var tg,rg=u(()=>{"use strict";tg=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var nn,E_,ng,og=u(()=>{"use strict";os();tt();Na();rg();nn=(e,t)=>{_t(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},E_=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(It(),Kn)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},ng=async e=>{let t=z(e.layout.installDir)?.bundleVersion??null;if(!tg({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),nn(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await ss({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),nn(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await E_();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),nn(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),nn(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),nn(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var k_,sg,ig=u(()=>{"use strict";k_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sg=e=>{if(!k_(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var ag,lg,cg=u(()=>{"use strict";Qs();go();ag=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Xn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},lg=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Ut(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Z,L_,x_,R_,dg,ug,mg,pg,gg,fg,hg=u(()=>{"use strict";Z=require("node:crypto"),L_=Buffer.from("302a300506032b6570032100","hex"),x_=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},R_=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Z.createPublicKey)({key:Buffer.concat([L_,t]),format:"der",type:"spki"})},dg=()=>{let{publicKey:e,privateKey:t}=(0,Z.generateKeyPairSync)("ed25519");return{publicKeyRaw:x_(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},ug=e=>(0,Z.createPrivateKey)(e),mg=(e,t)=>(0,Z.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),pg=(e,t,r)=>{try{let n=R_(e);return(0,Z.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},gg=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,fg=()=>(0,Z.randomBytes)(32).toString("base64url")});var Ee,is,yg,P_,C_,Ma,Ag,Sg,Ha=u(()=>{"use strict";Ee=g(require("node:fs")),is=g(require("node:path"));hg();x();yg=e=>is.default.join(e.installDir,Et),P_=(e,t)=>{if(e.profileEmail===null||t===yg(e)||Ee.default.existsSync(t))return;let r=yg(e);Ee.default.existsSync(r)&&(Ee.default.mkdirSync(is.default.dirname(t),{recursive:!0}),Ee.default.renameSync(r,t))},C_=e=>{if(!Ee.default.existsSync(e))return null;try{let t=Ee.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Ma=e=>{let t=$l(e);P_(e,t);let r=C_(t);if(r!==null)return r;let n=dg();return Ee.default.mkdirSync(is.default.dirname(t),{recursive:!0}),Ee.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},Ag=e=>{let t=Ma(e.layout),r=fg(),n=gg({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=ug(t.privateKeyPem),s=mg(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Sg=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return pg(e.serverPublicKey,t,e.serverAttestation)}});var as,Da=u(()=>{"use strict";as={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var T_,bg,I_,_g,vg=u(()=>{"use strict";Da();T_=new Set(Object.values(as)),bg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),I_=e=>{if(!bg(e))return!1;let t=e.type;return!(typeof t!="string"||!T_.has(t)||e.payload!==void 0&&!bg(e.payload)||e.requestId!==void 0&&typeof e.requestId!="string")},_g=I_});var O_,wg,Wg,Eg=u(()=>{"use strict";vg();Da();O_=new Set(Object.values(as)),wg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wg=e=>{if(!wg(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;return typeof t!="string"?{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e}:O_.has(t)?e.payload!==void 0&&!wg(e.payload)?{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:e.requestId!==void 0&&typeof e.requestId!="string"?{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e}:_g(e)?{formatOk:!0,formatError:null,command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}}});var kg,Lg=u(()=>{"use strict";kg=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var N_,M_,H_,on,xg=u(()=>{"use strict";Lg();N_=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,M_=e=>N_.test(e),H_=e=>kg(e),on=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>on(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&M_(n)){r[n]=H_(o);continue}r[n]=on(o)}return r}});var pe,Fa,D_,F_,U_,Ua,Rg,Pg,Cg,j_,ja,rr,$a,Tg,ls=u(()=>{"use strict";pe=g(require("node:fs")),Fa=g(require("node:path"));Eg();xg();D_="local-ws-trace.ndjson",F_=1e4,U_=1440*60*1e3,Ua=e=>Fa.default.join(e.logsDir,D_),Rg=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},Pg=e=>{if(!pe.default.existsSync(e))return;let t=pe.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-U_,o=t.filter(s=>{let i=Rg(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-F_);pe.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},Cg=(e,t)=>{let r=Ua(e);pe.default.mkdirSync(Fa.default.dirname(r),{recursive:!0}),pe.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),Pg(r)},j_=e=>e.parsed===null?{_empty:!0}:on(e.parsed),ja=(e,t,r)=>{let n=Wg(r);Cg(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:j_(n)})},rr=(e,t)=>{Cg(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:on({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},$a=(e,t=80)=>{let r=Ua(e);if(Pg(r),!pe.default.existsSync(r))return[];let n=pe.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=Rg(s);i!==null&&o.push(i)}return o.reverse()},Tg=e=>{let t=Ua(e);pe.default.existsSync(t)&&pe.default.writeFileSync(t,"","utf8")}});var Ig,Og,Ng=u(()=>{"use strict";ls();Ig=!1,Og=e=>{Ig||(Ig=!0,process.on("uncaughtException",t=>{rr(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;rr(e,{kind:"crash",message:r,stack:n})}))}});var $_,Mg,Hg=u(()=>{"use strict";$_="local.agentwitch.com",Mg=`http://${$_}:43347`});var vt,B_,Dg,Fg=u(()=>{"use strict";vt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),B_=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Dg=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${vt(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?vt(r.direction):vt(r.kind),i=`trace-body-${n}`,a=vt(B_(r.body));return`<tr>
        <td title="${vt(r.at)}">${vt(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${vt(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var sn,cs,G_,V_,z_,K_,Ug,q_,J_,jg,an,$g,ln,Bg,Ba=u(()=>{"use strict";sn=g(require("node:fs")),cs=g(require("node:path"));Rt();zr();G_="rag",V_="http://127.0.0.1:11434",z_="nomic-embed-text",K_=e=>cs.default.join(e.installDir,G_),Ug=(e,t)=>t!==void 0&&t.trim().length>0?Be(t).ragChunksFilePath:cs.default.join(K_(e),Nn),q_=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},J_=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},jg=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||V_,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||z_;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},an=(e,t)=>{let r=Ug(e,t);if(!sn.default.existsSync(r))return[];let n=sn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},$g=async e=>{let t=J_(e.text);if(t.length===0)return 0;let r=Ug(e.layout,e.projectFolderPath);sn.default.mkdirSync(cs.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await jg(o);if(s===null)continue;let i={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};sn.default.appendFileSync(r,`${JSON.stringify(i)}
`,"utf8"),n+=1}return n},ln=async e=>{let t=await jg(e.query);return t===null?[]:an(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:q_(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Bg=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var Gg,Vg=u(()=>{"use strict";Gg=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var zg,ds,Kg,us=u(()=>{"use strict";Vg();zg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ds=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=zg(e),r=zg(Gg(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Kg=`(function () {
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
})();`});var nr,qg,Jg=u(()=>{"use strict";nr=(e,t,r)=>e===1?t:r,qg=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${nr(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${nr(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${nr(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${nr(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${nr(d,"month","months")} ago`;let m=Math.floor(a/365);return`${m} ${nr(m,"year","years")} ago`}});var Ga,Yg,Xg=u(()=>{"use strict";Ga=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yg=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${Ga(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Ga(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${Ga(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Zg,Qg,ef,tf=u(()=>{"use strict";Zg=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Qg=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,ef=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var or,rf,nf=u(()=>{"use strict";us();or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rf=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${or(e.wakeError)}</div>`:"",a=ds(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${or(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${or(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${or(n)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${or(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${or(o)}</p>
      </a>
    </div>`}});var sr,Y_,of,sf=u(()=>{"use strict";sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Y_=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],of=e=>{let t=Y_.map(i=>`<option value="${sr(i.value)}">${sr(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${sr(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${sr(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${sr(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${sr(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Va,af,za=u(()=>{"use strict";Va=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},af=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Va(t)}});var lf,cf=u(()=>{"use strict";lf={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var B,X_,Z_,Ka,qa,df,uf=u(()=>{"use strict";za();Er();cf();si();B=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X_=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Z_=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=Va(n);return`value="${B(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${B(r)}"`},Ka=(e,t,r,n,o)=>{let s=lf[t];return`<label class="field">
          <span class="field-label">${B(n)} API key \u2014 ${B(X_(e,t))} \xB7 <a class="field-link" href="${B(s.href)}" target="_blank" rel="noopener noreferrer">${B(s.label)}</a></span>
          <input class="input mono" type="password" name="${B(r)}" autocomplete="off" ${Z_(e,t,o)} />
        </label>`},qa=(e,t,r,n)=>{let o=ed(e[t]?.model),s=new Set(oi[t].map(c=>c.value)),i=oi[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${B(c.value)}"${d}>${B(c.label)}</option>`}).join(""),a=o!==Mt&&!s.has(o)?`<option value="${B(o)}" selected>${B(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${B(n)}</span>
          <select class="input mono" name="${B(r)}">${i}${a}</select>
        </label>`},df=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${B(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${Ka(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${qa(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Ka(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${qa(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Ka(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${qa(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var mf,pf=u(()=>{"use strict";mf=`
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
.field-link {
  color: var(--aw-zinc-700);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.field-link:hover { color: var(--aw-zinc-900); }

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
.project-list-title-row { align-items: center; display: flex; flex-wrap: wrap; gap: 0.35rem 0.5rem; }
.project-live-badge {
  background: var(--aw-emerald-50);
  border-radius: 9999px;
  color: var(--aw-emerald-700);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.1rem 0.45rem;
  text-transform: uppercase;
}
.project-local-badge {
  background: var(--aw-zinc-100);
  border-radius: 9999px;
  color: var(--aw-zinc-600);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.1rem 0.45rem;
  text-transform: uppercase;
}
.local-cloud-banner {
  background: rgb(255 255 255 / 0.9);
  border: 1px solid var(--aw-zinc-200);
  border-radius: var(--aw-radius-xl);
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
}
.local-cloud-banner-warn {
  background: var(--aw-amber-50);
  border-color: rgb(251 191 36 / 0.45);
}
.local-cloud-banner-lede { font-size: 0.875rem; line-height: 1.45; margin: 0; color: var(--aw-zinc-700); }
.local-cloud-banner-sync { font-size: 0.8125rem; margin: 0.5rem 0 0; color: var(--aw-zinc-600); }
.local-cloud-banner-actions { margin: 0.65rem 0 0; }
.local-advanced-block { margin-top: 1.25rem; }
.local-advanced-block > summary {
  color: var(--aw-zinc-600);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  list-style: none;
  user-select: none;
}
.local-advanced-block > summary::-webkit-details-marker { display: none; }

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
`.trim()});var Q_,ev,Ja,gf,ff=u(()=>{"use strict";pf();us();Q_=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,ev=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gf=e=>{let t=ev.map(s=>{let i=s.href===e.activePath;return`<a class="nav-link${i?" is-active":""}" href="${s.href}"${i?' aria-current="page"':""}>${s.label}</a>`}).join(""),r=Ja(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=Ja(e.installBundleVersionLabel?.trim()??"unknown");return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${Ja(e.title)} \xB7 Agent Witch Local</title>
  <style>${mf}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home, install bundle ${o}">
        ${Q_}
        <span class="brand-text">Agent Witch<span class="brand-sub">Local(${o})</span></span>
      </a>
      <div class="site-header-actions">
        <nav class="site-nav" aria-label="Local bridge">${t}</nav>
        ${n}
        <a class="btn btn-secondary cloud-open-link" href="${r}" target="_blank" rel="noopener noreferrer" aria-label="Open Agent Witch cloud at ${r}">Open cloud \u2197</a>
      </div>
    </div>
  </header>
  <main class="site-main">${e.prependBody??""}${e.body}</main>
  <script>${Kg}</script>
</body>
</html>`}});var cn,ms,Ya=u(()=>{"use strict";cn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ms=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${cn(e.syncMessage)}</p>`:"",n=cn(e.cloudAppOrigin),o=cn(e.manageHref),s=cn(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${cn(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${s} \u2197</a></p>
    </div>`}});var ps,hf,yf=u(()=>{"use strict";ps=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hf=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${ps(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks on Agent Witch Live</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install from Agent Witch Live (library or marketplace) \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let n=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${ps(s.name)}</strong> <span class="muted mono">(${ps(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),o=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${ps(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${o}
      <ul class="harness-installed-set-list">${n}</ul>
    </section>`}});var tv,Af,Sf,bf=u(()=>{"use strict";tv=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,Af=e=>e.kind==="folder",Sf=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&Af(d)){s=d;continue}let m={kind:"folder",name:a,children:new Map};s.children.set(a,m),s=m}}let r=n=>{let o=[];for(let s of n.children.values()){if(Af(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(tv)};return r(t)}});var _f,Xa,vf=u(()=>{"use strict";_f=g(require("node:path")),Xa=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Xa(r.children,t)}</ul>
            </details>
          </li>`;let n=_f.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var wf,Ke,rv,nv,gs,ov,Wf,Ef=u(()=>{"use strict";Ya();wf=g(require("node:path"));yf();bf();vf();Ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rv=()=>`(() => {
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

})();`,nv=()=>`(() => {
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
})();`,gs=e=>{let t=ms({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks on Agent Witch Live",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=hf({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${Ke(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ke(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':ov(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
        <p class="muted">Advanced: pull rules from an existing folder on disk (does not replace installing from Agent Witch Live).</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",d=a?"":`<section class="card">
      <p class="eyebrow">Advanced</p>
      <h1>Import from disk</h1>
      <p class="lede">Scan a folder for existing <code>.cursor</code> rules and copy them into the profile harness on this Mac. Prefer installing playbooks from Agent Witch Live when possible.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Ke(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Ke(s)}" />
        </label>
        <div class="actions">
          <button class="btn btn-secondary" type="button" id="pickFolder">Choose folder\u2026</button>
          <button class="btn btn-primary" type="button" id="revealStart"${i?" hidden":""}>Reveal</button>
          <button class="btn btn-secondary" type="button" id="revealStop" hidden>Stop</button>
        </div>
        <div class="reveal-progress" id="revealProgress" hidden>
          <p class="muted">Scanning\u2026 folders with <code>.cursor</code> appear below.</p>
          <div class="reveal-live-list" id="revealFolderList"></div>
        </div>
      </div>
    </section>
    ${o}
    <script>${rv()}</script>
    <script>${nv()}</script>`;return`${t}${r}${n}${c}${d}`},ov=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=Sf(a.items.map(v=>({...v,relativePath:typeof v.relativePath=="string"&&v.relativePath.length>0?v.relativePath:wf.default.relative(a.sourceRoot,v.sourcePath).replaceAll("\\","/")}))),m=Xa(d,Ke),y=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Ke(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Ke(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${y} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${m}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Ke(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Wf=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),m=a.trim();Number.isFinite(d)&&m.length>0&&o.set(d,m)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),m=d!==null&&Number.isFinite(d)?o.get(d):void 0,y=e.get(`setName-${i}`)?.trim()??m??a,v=t.sets[i];if(v===void 0)continue;let A=a.length>0?a:v.proposedSlug,f=y.length>0?y:v.proposedName,l=r.size===0||r.has(i),S=v.items.map(h=>({id:h.id,kind:h.kind,title:h.title,sourcePath:h.sourcePath,include:l}));s.push({slug:A,name:f,items:S})}return s}});var dn,Za,Lf,xf,sv,un,Rf,Pf,Qa,kf,Cf,el=u(()=>{"use strict";dn=g(require("node:fs")),Za=g(require("node:path")),Lf=require("node:crypto");$o();xf=e=>Za.default.join(e.harnessRootDir,"projects-registry.json"),sv=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),un=e=>{let t=xf(e);if(!dn.default.existsSync(t))return[];try{let r=JSON.parse(dn.default.readFileSync(t,"utf8"));return sv(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},Rf=(e,t)=>{dn.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};dn.default.writeFileSync(xf(e),`${JSON.stringify(r,null,2)}
`)},Pf=(e,t)=>{let r=$e(t.projectFolderPath),n=t.name?.trim()||Za.default.basename(r)||"Project",o=un(e),s=o.find(a=>$e(a.projectFolderPath)===r);if(s!==void 0)return s;let i={id:(0,Lf.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return Rf(e,[...o,i]),i},Qa=(e,t)=>un(e).find(r=>r.id===t||r.cloudProjectId===t)??null,kf=e=>$e(e),Cf=(e,t)=>{let r=un(e),n=new Date().toISOString(),o=0,s=0,i=[...r];for(let a of t){let c=kf(a.folderPath),d=i.findIndex(v=>v.cloudProjectId===a.id||v.id===a.id||kf(v.projectFolderPath)===c);if(d===-1){i.push({id:a.id,cloudProjectId:a.id,name:a.name,projectFolderPath:a.folderPath,addedAt:n}),o+=1;continue}let m=i[d],y={...m,name:a.name,projectFolderPath:a.folderPath,cloudProjectId:a.id};(y.name!==m.name||y.projectFolderPath!==m.projectFolderPath||y.cloudProjectId!==m.cloudProjectId)&&(s+=1),i[d]=y}return Rf(e,i),{added:o,updated:s}}});var Tf,If=u(()=>{"use strict";Tf=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var fs,tl,mn,iv,ke,hs,ir=u(()=>{"use strict";fs=g(require("node:fs")),tl=g(require("node:os")),mn=g(require("node:path")),iv=()=>fs.default.realpathSync(mn.default.resolve(tl.default.homedir())),ke=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?mn.default.join(tl.default.homedir(),t.slice(1)):t,n;try{n=fs.default.realpathSync(mn.default.resolve(r))}catch{return null}let o=iv();return n===o||n.startsWith(`${o}${mn.default.sep}`)?n:null},hs=e=>{let t=ke(e);if(t===null)return null;try{if(!fs.default.statSync(t).isFile())return null}catch{return null}return t}});var ie,ar,pn,av,lv,cv,Of,Nf=u(()=>{"use strict";ie=g(require("node:fs")),ar=g(require("node:path"));$o();Kr();If();ir();pn=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),av=e=>{if(!ie.default.existsSync(e))return null;try{let t=JSON.parse(ie.default.readFileSync(e,"utf8"));if(pn(t)&&t.version===1)return t}catch{return null}return null},lv=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?ar.default.join(e.harnessRootDir,n):ar.default.join(e.harnessSetsDir,t,n);if(!ie.default.existsSync(o))return null;try{if(!ie.default.statSync(o).isFile())return null}catch{return null}return o},cv=(e,t)=>{let r={};if(ie.default.existsSync(e))try{let o=JSON.parse(ie.default.readFileSync(e,"utf8"));pn(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};ie.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},Of=e=>{let t=[...new Set(e.setSlugs.map(m=>m.trim()).filter(m=>m.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=$e(e.projectFolderPath),n=ke(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=ie.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=av(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let i=pn(s.sets)?s.sets:{},a=ar.default.join(n,".cursor"),c=0;for(let m of t){let y=i[m];if(!pn(y))return{ok:!1,errorMessage:`Harness set "${m}" is not installed locally.`};let v=Array.isArray(y.items)?y.items:[];for(let A of v){if(!pn(A))continue;let f=typeof A.path=="string"?A.path.trim():"";if(f.length===0)continue;let l=Tf(f);if(l===null)continue;let S=lv(e.layout,m,f);if(S===null)continue;let h=ar.default.join(a,l);ie.default.mkdirSync(ar.default.dirname(h),{recursive:!0}),ie.default.copyFileSync(S,h),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let d=We({projectFolderPath:n});return cv(d.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var qe,rl,Mf=u(()=>{"use strict";qe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rl=e=>{let t=e.flashError?`<div class="alert-error">${qe(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${qe(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${qe(o.slug)}"${r.has(o.slug)?" checked":""} />
            <span><strong>${qe(o.name)}</strong> <span class="muted mono">(${qe(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${qe(e.project.name)}</h1>
      <p class="muted mono">${qe(e.project.projectFolderPath)}</p>
      <p class="lede">Linked harness sets are copied into this project&apos;s <code>.cursor</code> folder and recorded in <code>.agent-witch/project.json</code>.</p>
      <form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${qe(e.project.id)}" />
        <p class="field-label">Harness sets</p>
        ${n}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${e.installed.sets.length===0?" disabled":""}>Save linked harness</button>
        </div>
      </form>
    </section>`}});var ys,Hf,Df=u(()=>{"use strict";Ya();ys=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hf=e=>{let t=e.flashError?`<div class="alert-error">${ys(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ys(e.flashMessage)}</div>`:"",r=ms({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/agent`,manageLabel:"Manage repositories on Agent Witch Live",body:"Repositories are created in the browser task composer. This page syncs them to this Mac so you can link playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No repositories synced yet. Add one in Agent Witch Live (task composer), then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=o.cloudProjectId!==void 0?'<span class="project-live-badge">Live</span>':'<span class="project-local-badge">Mac only</span>';return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${ys(o.name)}</strong> ${s}
                  <span class="muted mono">${ys(o.projectFolderPath)}</span>
                </a>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects</h1>
      <p class="lede">Synced from Agent Witch Live when the Mac client is paired. Open a project to link installed playbooks into that folder.</p>
      <details class="local-advanced-block">
        <summary>Advanced: register a folder on this Mac only</summary>
        <form method="POST" action="/projects/add" class="stack">
          <p class="muted">Use when a repo is not in Agent Witch Live yet. Prefer adding repositories in the browser so tasks and this list stay aligned.</p>
          <div class="actions">
            <button class="btn btn-secondary" type="submit">Choose folder\u2026</button>
          </div>
        </form>
      </details>
      ${n}
    </section>`}});var Ff,Uf=u(()=>{"use strict";Ot();el();Ff=async(e,t)=>{let r=Oe({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,syncedCount:0,message:"Could not sync \u2014 check pairing token and wsUrl in config.json."};let n=await Xc(r);if(n===null)return{ok:!1,syncedCount:0,message:"Could not reach Agent Witch Live. Repositories may be Mac-only until the Mac client reconnects."};let{added:o,updated:s}=Cf(e,n);return{ok:!0,syncedCount:n.length,message:n.length===0?"Synced with Agent Witch Live \u2014 no repositories yet. Add one in the task composer on the website.":`Synced ${n.length} repositor${n.length===1?"y":"ies"} from Agent Witch Live${o+s>0?` (${o} new, ${s} updated on this Mac)`:""}.`}}});var nl,ol,jf=u(()=>{"use strict";nl=g(require("node:fs"));zr();ol=e=>{let t=Be(e);if(!nl.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse(nl.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var il,sl,gn,$f=u(()=>{"use strict";il=g(require("node:fs")),sl=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gn=e=>{if(!il.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(il.default.readFileSync(e.harnessManifestPath,"utf8"));if(!sl(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=sl(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!sl(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",m=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:m.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var al,Bf=u(()=>{"use strict";al=()=>"~"});var Gf,ll,Vf=u(()=>{"use strict";Gf=require("node:child_process"),ll=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Gf.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var zf,Kf,qf=u(()=>{"use strict";zf=require("node:crypto"),Kf=e=>`local-${(0,zf.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var cl,Jf=u(()=>{"use strict";cl=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var fn,As,dl=u(()=>{"use strict";fn=g(require("node:path")),As=e=>{let t=fn.default.dirname(e),r=fn.default.basename(t);return r==="agents"?fn.default.basename(fn.default.dirname(t)):r}});var hn,Le,Yf,dv,uv,mv,Ss,Xf,ul=u(()=>{"use strict";hn=g(require("node:fs")),Le=g(require("node:path"));qf();Jf();dl();Yf=new Set(["node_modules",".git","dist","build",".next","coverage"]),dv=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},uv=(e,t)=>{let r=Le.default.basename(t);if(e==="skill"){let n=t.split(Le.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},mv=e=>{let t=[],r=(o,s)=>{let i;try{i=hn.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&Yf.has(a.name))continue;let c=Le.default.join(o,a.name),d=s?Le.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;cl(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=Le.default.join(e,o);hn.default.existsSync(s)&&r(s,o)}let n=Le.default.join(e,"skills");return hn.default.existsSync(n)&&r(n,"skills"),t},Ss=e=>{let t=mv(e);if(t.length===0)return null;let r=Le.default.dirname(e),n=As(e),o=dv(n),s=t.map(i=>{let a=cl(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:Kf(i.absolutePath),kind:a,title:uv(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},Xf=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=hn.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||Yf.has(a.name))continue;let c=Le.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var Zf,ml,pv,Qf,eh=u(()=>{"use strict";Zf=g(require("node:fs")),ml=g(require("node:path"));ul();ir();pv=e=>{let t=ke(e.trim());if(t===null)return null;if(ml.default.basename(t)===".cursor")return t;let r=ml.default.join(t,".cursor");try{if(Zf.default.statSync(r).isDirectory())return ke(r)}catch{return null}return null},Qf=e=>{let t=pv(e.projectPath);if(t===null)return null;let r=Ss(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var th,gv,bs,rh,nh=u(()=>{"use strict";th=g(require("node:path"));ul();ir();dl();gv=5,bs=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},rh=e=>{let t=ke(e.scanRoot.trim());if(t===null)return bs(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of Xf(t,gv,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=ke(s);if(i===null)continue;let a=As(i);bs(e.response,"folder",{cursorDir:i,groupName:a,repoPath:th.default.dirname(i)});let c=Ss(i);c!==null&&(r.push(c),bs(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return bs(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var oh,sh,ih=u(()=>{"use strict";oh=g(require("node:path")),sh=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:oh.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var U,ah,pl,fv,lh,gl,fl,ch,_s,dh=u(()=>{"use strict";U=g(require("node:fs")),ah=g(require("node:os")),pl=g(require("node:path"));bi();ir();ih();fv=e=>{if(!U.default.existsSync(e))return null;try{let t=JSON.parse(U.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},lh=e=>{let t=e.hostname??ah.default.hostname(),r=fv(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(m=>m.include);if(a.length===0)continue;let c=[];for(let m of a){let y=hs(m.sourcePath);if(y===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${m.sourcePath}`};let v=U.default.readFileSync(y,"utf8");c.push({id:m.id,kind:m.kind,title:m.title,content:v,setSlugs:[i.slug]})}let d=Ao({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let m of d.directories)o.add(m);for(let m of d.files)s.push(m),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{U.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)U.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=pl.default.join(e.layout.harnessRootDir,i.relativePath);U.default.mkdirSync(pl.default.dirname(a),{recursive:!0}),U.default.writeFileSync(a,i.content)}return U.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},gl="reveal-cache.json",fl=(e,t)=>{U.default.mkdirSync(e.harnessRootDir,{recursive:!0}),U.default.writeFileSync(`${e.harnessRootDir}/${gl}`,`${JSON.stringify(t,null,2)}
`)},ch=e=>{let t=`${e.harnessRootDir}/${gl}`;U.default.existsSync(t)&&U.default.unlinkSync(t)},_s=e=>{let t=`${e.harnessRootDir}/${gl}`;if(!U.default.existsSync(t))return null;try{let r=JSON.parse(U.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return sh(r)}catch{return null}return null}});var hl,uh=u(()=>{"use strict";hl=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Je,mh,hv,ph,yl,gh=u(()=>{"use strict";Je=g(require("node:fs")),mh=g(require("node:path")),hv=256e3,ph=e=>{Je.default.mkdirSync(mh.default.dirname(e),{recursive:!0}),Je.default.writeFileSync(e,"","utf8")},yl=(e,t=hv)=>{if(!Je.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Je.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Je.default.openSync(e,"r");try{Je.default.readSync(a,i,0,s,o)}finally{Je.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var fh,hh,Al,yh,Ah=u(()=>{"use strict";fh=require("node:crypto"),hh=g(require("node:fs"));Ot();uo();ot();lt();Al=!1,yh=async e=>{if(Al)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!H(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=D();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Oe({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&hh.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,fh.randomUUID)();Al=!0;try{if(await Yc(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Ft({...r,workspace:o},e.writerAgent,t);return await Qn(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Al=!1}}});var vs,Sh,bh=u(()=>{"use strict";vs=g(require("node:fs"));ii();Sh=(e,t)=>{let r=ao(e);vs.default.mkdirSync(e,{recursive:!0}),vs.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{vs.default.chmodSync(r,384)}catch{}}});var yn,yv,Sl,_h,vh=u(()=>{"use strict";yn=g(require("node:fs"));it();bh();za();Er();De();yv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sl=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=af(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?Ht(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},_h=e=>{let t=te(e.configPath),r={};if(yn.default.existsSync(e.configPath))try{let o=JSON.parse(yn.default.readFileSync(e.configPath,"utf8"));yv(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,yn.default.mkdirSync(t,{recursive:!0}),yn.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=Sl(Sl(Sl(st(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);Sh(t,n)}});var wh,Ye,bl=u(()=>{"use strict";wh=g(require("node:path"));ui();mi();lt();Ct();x();Ye=e=>{let t=D()?.layout.installDir??w();if(wh.default.basename(t)===mo)return ci;let r=D(),n=r!==null?ee(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):ci}});var Wh,Eh=u(()=>{"use strict";tt();It();bl();Wh=async e=>{let t=z(e.installDir),r=t?.bundleVersion??null,n=Ye(t);try{let o=await zs(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Bn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var kh,Lh=u(()=>{"use strict";kh=e=>!e});var xh,Rh,Ph=u(()=>{"use strict";Na();xh=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Rh=async()=>{let e=await ss({force:!0});if(e.ok)return{ok:!0,message:xh(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:xh(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(It(),Kn)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Ih,An,Oh,vl,Ch,Av,_l,Th,F,wl,O,J,lr,Sv,bv,Nh,Mh,Hh=u(()=>{"use strict";Ih=g(require("node:http")),An=g(require("node:fs")),Oh=g(require("node:path"));Hg();os();ls();Fg();Ba();Cr();Bt();us();Jg();Xg();tf();nf();sf();uf();ff();Ef();el();Nf();Mf();Df();Uf();jf();$f();Bf();Vf();eh();ir();nh();dh();Kr();uh();gh();tt();Ah();lt();vh();it();at();De();bl();Eh();Lh();Ph();Ha();vl=e=>qg(e)??"never",Ch=48e3,Av=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,_l=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??al(),reveal:t.reveal,installed:gn(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Th=async e=>{let t=D();if(t===null)return{ok:!1,message:"Mac client config missing \u2014 showing folders registered on this Mac only."};let r=await Ff(e,t);return{ok:r.ok,message:r.message}},F=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wl={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},O=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...wl}),e.end(JSON.stringify(r))},J=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},lr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Sv=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${F(e.status.wakeError)}</div>`:"",o=kh(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${ds(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${F(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${F(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${F(vl(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${F(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},bv=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},Nh=e=>{let t=Oh.default.join(e.layout.installDir,"link-code.txt"),r=()=>z(e.layout.installDir),n=()=>{let A=r();return{installBundleVersion:hl(A),installBundleUpdatedAt:A?.updatedAt??null,installVersion:A}},o=async A=>{let f=A.installVersion??r(),l=await i(),S=Qg(l),h=ef(A.updateFlash??null);return gf({title:A.title,activePath:A.activePath,body:A.body,cloudAppOrigin:Ye(f),installBundleVersionLabel:hl(f),prependBody:`${h}${S}`,headerUpdateButtonHtml:Zg(l)})},s=null,i=async()=>{let A=Date.now();if(s!==null&&A-s.cachedAtMs<6e4)return s.offer;let f=await Wh(e.layout);return s={cachedAtMs:A,offer:f},f},a=()=>{s=null},c=!1,d=()=>{c||(c=!0,Rh().catch(A=>{console.error("[agent-witch-local-app] install bundle update failed:",A)}).finally(()=>{c=!1,a()}))},m=async A=>{if(a(),!(await i()).updateAvailable){A.writeHead(303,{Location:"/?update=ok"}),A.end();return}A.writeHead(303,{Location:"/?update=started"}),A.end(),d()},y=()=>{if(An.default.existsSync(t))return An.default.readFileSync(t,"utf8").trim();let A=Math.random().toString(36).slice(2,8).toUpperCase();return An.default.writeFileSync(t,A,"utf8"),A},v=Ih.default.createServer((A,f)=>{(async()=>{let l=A.url?.split("?")[0]??"/",S=A.method??"GET";if(S==="OPTIONS"){f.writeHead(204,wl),f.end();return}if(S==="GET"&&l==="/health"){let h=e.controllers.getStatus(),p=n();O(f,200,{ok:!0,...h,installBundleVersion:p.installBundleVersion,installBundleUpdatedAt:p.installBundleUpdatedAt});return}if(S==="GET"&&l==="/api/status"){let h=n();O(f,200,{...e.controllers.getStatus(),linkCode:y(),installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(S==="GET"&&l==="/api/traffic"){O(f,200,{entries:ns(e.layout)});return}if(S==="DELETE"&&l==="/api/traffic"){eg(e.layout),O(f,200,{ok:!0});return}if(S==="GET"&&l==="/api/trace"){O(f,200,{entries:$a(e.layout)});return}if(S==="DELETE"&&l==="/api/trace"||S==="POST"&&l==="/api/trace/clear"){if(Tg(e.layout),S==="POST"){f.writeHead(303,{Location:"/status"}),f.end();return}O(f,200,{ok:!0});return}if(S==="POST"&&l==="/api/errors/clear"){ph(e.layout.errorLogPath),f.writeHead(303,{Location:"/errors"}),f.end();return}if(S==="GET"&&l==="/api/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(p.length>0){let b=await ln({layout:e.layout,query:p,limit:20});O(f,200,{chunks:b,query:p});return}O(f,200,{chunks:an(e.layout).slice(-50).reverse()});return}if(S==="POST"&&l==="/api/revive"){e.controllers.reviveWebSocket(),O(f,200,{ok:!0});return}if(S==="GET"&&l==="/api/update-status"){let h=await i();O(f,200,{ok:!0,...h});return}if((S==="GET"||S==="POST")&&l==="/api/update"){await m(f);return}if(S==="GET"&&l==="/"){let h=e.controllers.getStatus(),p=n(),b=gn(e.layout),_=yl(e.layout.errorLogPath);J(f,await o({title:"Home",activePath:"/",installVersion:p.installVersion,updateFlash:bv(A.url??void 0),body:rf({wsConnected:h.wsConnected,lastHeartbeatAt:h.lastHeartbeatAt,installBundleVersion:p.installBundleVersion,harnessSetCount:b.sets.length,knowledgeChunkCount:an(e.layout).length,trafficEntryCount:ns(e.layout).length,wakeError:h.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(S==="GET"&&l==="/task"){let h=e.controllers.getStatus(),p=n(),b=D(),_=new URL(A.url??"/",`http://127.0.0.1:${43347}`),W=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,R=_.searchParams.get("runId");J(f,await o({title:"Task",activePath:"/task",installVersion:p.installVersion,body:of({defaultWorkspace:b?.workspace??"",wsConnected:h.wsConnected,flashMessage:W,flashError:k,lastRunId:R})}));return}if(S==="POST"&&l==="/task/dispatch"){let h=await lr(A),p=new URLSearchParams(h),b=p.get("prompt")?.trim()??"",_=p.get("writerAgent")?.trim()??"claude-cli",W=p.get("projectFolder")?.trim()??"",k=await yh({prompt:b,writerAgent:_,...W.length>0?{projectFolderPath:W}:{}}),R=new URLSearchParams;k.ok?R.set("ok","1"):(R.set("failed","1"),k.errorMessage!==void 0&&R.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&R.set("runId",k.agentRunId),f.writeHead(303,{Location:`/task?${R.toString()}`}),f.end();return}if(S==="GET"&&l==="/errors"){let h=n(),p=yl(e.layout.errorLogPath);J(f,await o({title:"Errors",activePath:"/errors",installVersion:h.installVersion,body:Yg({errorLogPath:e.layout.errorLogPath,content:p.content,exists:p.exists,truncated:p.truncated,byteSize:p.byteSize})}));return}if(S==="GET"&&l==="/status"){let h=e.controllers.getStatus(),p=ne(e.layout),b=de(p,ce),_=n();J(f,await o({title:"Status",activePath:"/status",installVersion:_.installVersion,body:`${Sv({status:h,stale:b,linkCode:y(),installBundleVersion:_.installBundleVersion,installBundleUpdatedAt:_.installBundleUpdatedAt})}${Dg({entries:$a(e.layout)})}`}));return}if(S==="GET"&&l==="/traffic"){let h=ns(e.layout),p=n(),b=h.map(W=>`<tr><td title="${F(W.at)}">${F(vl(W.at))}</td><td>${F(W.direction)}</td><td><code>${F(W.type)}</code></td><td>${F(W.summary)}</td><td>${F(W.action??"")}</td></tr>`).join(""),_=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${b}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';J(f,await o({title:"Traffic",activePath:"/traffic",installVersion:p.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${_}
            </section>`}));return}if(S==="GET"&&l==="/projects"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),b=Ye(p.installVersion),_=await Th(e.layout),W=h.searchParams.get("added")==="1"?"Project added.":null;J(f,await o({title:"Projects",activePath:"/projects",installVersion:p.installVersion,body:Hf({projects:un(e.layout),cloudAppOrigin:b,syncMessage:_.message,syncOk:_.ok,flashMessage:W})}));return}if(S==="GET"&&l==="/project"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=h.searchParams.get("id")?.trim()??"",b=n();await Th(e.layout);let _=Qa(e.layout,p);if(_===null){f.writeHead(404),f.end("Project not found");return}let W=h.searchParams.get("linked")==="1"?`Harness linked (${h.searchParams.get("files")??"0"} file(s) written).`:null;J(f,await o({title:_.name,activePath:"/projects",installVersion:b.installVersion,body:rl({project:_,installed:gn(e.layout),linkedSetSlugs:ol(_.projectFolderPath),flashMessage:W})}));return}if(S==="POST"&&l==="/projects/add"){let h=ll();if(h===null){f.writeHead(303,{Location:"/projects"}),f.end();return}We({projectFolderPath:h}),Pf(e.layout,{projectFolderPath:h}),f.writeHead(303,{Location:"/projects?added=1"}),f.end();return}if(S==="POST"&&l==="/projects/link-harness"){let h=await lr(A),p=new URLSearchParams(h),b=p.get("projectId")?.trim()??"",_=Qa(e.layout,b);if(_===null){f.writeHead(404),f.end("Project not found");return}let W=p.getAll("applySet").map(R=>String(R)),k=Of({layout:e.layout,projectFolderPath:_.projectFolderPath,setSlugs:W});if(!k.ok){let R=n();J(f,await o({title:_.name,activePath:"/projects",installVersion:R.installVersion,body:rl({project:_,installed:gn(e.layout),linkedSetSlugs:ol(_.projectFolderPath),flashError:k.errorMessage})}));return}f.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&linked=1&files=${k.writtenFileCount}`}),f.end();return}if(S==="GET"&&l==="/harness"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),b=_s(e.layout),_=h.searchParams.get("submitted")==="1",W=_?h.searchParams.get("syncFailed")==="1"?`Local harness updated (${h.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:h.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${h.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":h.searchParams.get("stopped")==="1"?`Reveal stopped. ${b?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:h.searchParams.get("revealed")==="1"?`Reveal found ${b?.sets.length??0} set(s).`:null,k=b?.scanRoots[0]??al(),R=Av(e.layout,{reveal:b,importQuery:h.searchParams.get("import")==="1",justSubmitted:_}),j=Ye(p.installVersion);J(f,await o({title:"Harness",activePath:"/harness",installVersion:p.installVersion,body:gs(_l(e.layout,{cloudAppOrigin:j,reveal:b,scanFolder:k,flashMessage:W,importSectionExpanded:R}))}));return}if(S==="POST"&&l==="/api/harness/pick-folder"){let h=ll();if(h===null){O(f,200,{cancelled:!0});return}O(f,200,{path:h});return}if(S==="GET"&&l==="/api/harness/file-content"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",b=hs(p);if(b===null){O(f,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=An.default.readFileSync(b,"utf8"),W=_.length>Ch?`${_.slice(0,Ch)}
\u2026 (truncated)`:_;O(f,200,{content:W})}catch{O(f,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&l==="/api/harness/reveal/add-project"){let h=await lr(A),p="";try{let W=JSON.parse(h);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(p=W.projectPath.trim())}catch{O(f,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(p.length===0){O(f,400,{ok:!1,errorMessage:"projectPath is required."});return}let b=_s(e.layout),_=Qf({reveal:b,projectPath:p});if(_===null||_.sets.length===0){O(f,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}fl(e.layout,_),O(f,200,{ok:!0,setCount:_.sets.length});return}if(S==="GET"&&l==="/api/harness/reveal/stream"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(p.length===0){O(f,400,{errorMessage:"Choose a folder to scan first."});return}let b=!1;A.on("close",()=>{b=!0}),f.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...wl});let _=rh({scanRoot:p,response:f,shouldAbort:()=>b});fl(e.layout,_),f.end();return}if(S==="POST"&&l==="/harness/reveal"){f.writeHead(410,{"Content-Type":"text/plain"}),f.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&l==="/harness/submit"){let h=_s(e.layout);if(h===null){let j=n(),ge=Ye(j.installVersion);J(f,await o({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:gs(_l(e.layout,{cloudAppOrigin:ge,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let p=await lr(A),b=new URLSearchParams(p),_=Wf(b,h),W=lh({layout:e.layout,sets:_});if(!W.ok){let j=n(),ge=Ye(j.installVersion);J(f,await o({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:gs(_l(e.layout,{cloudAppOrigin:ge,reveal:h,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}ch(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";f.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${R}`}),f.end();return}if(S==="GET"&&l==="/writer-api"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),b=D()?.writerExecutionBackend??K(void 0),_=te(e.layout.configPath),W=st(_),k=h.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();J(f,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:df({writerExecutionBackend:b,secrets:W,flashMessage:k})}));return}if(S==="POST"&&l==="/writer-api"){let h=await lr(A),p=new URLSearchParams(h),b=p.get("writerExecutionBackend")?.trim()??"cli";_h({configPath:e.layout.configPath,writerExecutionBackend:K(b),anthropicApiKey:p.get("anthropicApiKey")??void 0,anthropicModel:p.get("anthropicModel")??void 0,openaiApiKey:p.get("openaiApiKey")??void 0,openaiModel:p.get("openaiModel")??void 0,googleApiKey:p.get("googleApiKey")??void 0,googleModel:p.get("googleModel")??void 0}),f.writeHead(303,{Location:"/writer-api?saved=1"}),f.end();return}if(S==="GET"&&l==="/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",b=n(),W=(p.length>0?await ln({layout:e.layout,query:p,limit:20}):an(e.layout).slice(-50).reverse()).map(k=>`<article class="card"><div class="muted" title="${F(k.createdAt)}">${F(vl(k.createdAt))}${k.source?` \xB7 ${F(k.source)}`:""}</div><pre>${F(k.text)}</pre></article>`).join("");J(f,await o({title:"Knowledge",activePath:"/knowledge",installVersion:b.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${F(p)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${W||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}S==="POST"&&await lr(A),f.writeHead(404),f.end("Not found")})().catch(l=>{console.error("[agent-witch-local-app]",l),f.writeHead(500),f.end("Internal error")})});return v.on("error",A=>{if(A.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",A)}),v.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Mg}`)}),v},Mh=e=>Ma(e).publicKeyRaw});var Sn,Wl,Dh,Fh,Uh,jh,$h=u(()=>{"use strict";Sn=g(require("node:fs")),Wl=g(require("node:path"));Rt();zr();Dh=(e,t)=>Wl.default.join(Be(t).memoryDirPath,Mn),Fh=(e,t)=>{let r=Dh(e,t);if(!Sn.default.existsSync(r))return[];let n=Sn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Uh=e=>{let t=Dh(e.layout,e.projectFolderPath);Sn.default.mkdirSync(Wl.default.dirname(t),{recursive:!0}),Sn.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},jh=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Bh,_v,vv,wv,Gh,Vh=u(()=>{"use strict";Bh=g(require("node:os"));x();_v="Default",vv=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),wv=e=>{let t=Bh.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Gh=()=>{let e=L(),t=jl(e),r=vv(_v);return`${wv(t)}/${r.length>0?r:"project"}`}});var zh,Wv,Kh,qh=u(()=>{"use strict";zh=require("node:child_process");Qo();ot();kr();it();De();at();Wv=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,zh.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},Kh=async e=>{if(!H(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&K(e.runConfig.writerExecutionBackend)==="api"){let r=Me(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=te(e.layout.configPath),o=He(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Ve(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await Wv(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Jh,Yh=u(()=>{"use strict";Jh=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var Xh,Zh,Qh=u(()=>{"use strict";Xh=require("node:crypto"),Zh=()=>(0,Xh.randomUUID)()});var bn,Ev,ey,ws=u(()=>{"use strict";bn="[[WORKING_ESTIMATE]]",Ev=["Put this marker on its own line:",bn,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),ey=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",Ev,"","Task to estimate:",e.trim()].join(`
`)});var ty,ry=u(()=>{"use strict";ty=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var ny,oy=u(()=>{"use strict";ny=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var kv,sy,iy=u(()=>{"use strict";ws();kv=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,sy=e=>{if(!e.includes(bn))return null;let t=null;for(let r of e.matchAll(kv)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var ay,ly=u(()=>{"use strict";uo();ws();ry();oy();iy();gr();ay=async e=>{let t=ty(e.wrappedPrompt),r=ey(t),n=await Ft(e.config,e.writerAgent,r),o=sy(n.output),s=ny(o);return pr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:le.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var cy={};Xe(cy,{buildContinuationPromptWithContext:()=>Rv});var Lv,xv,Rv,dy=u(()=>{"use strict";Lv=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,xv=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Rv=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=xv(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${Lv(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var uy={};Xe(uy,{readHarnessExportSets:()=>Cv});var _n,El,Ws,Pv,Cv,my=u(()=>{"use strict";_n=g(require("node:fs")),El=g(require("node:path"));x();Ws=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pv=e=>{if(!_n.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(_n.default.readFileSync(e.harnessManifestPath,"utf8"));if(Ws(t))return t}catch{return null}return null},Cv=(e,t)=>{let r=L(t),n=Pv(r);if(n===null)return[];let o=Ws(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!Ws(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let m of c){if(!Ws(m))continue;let y=typeof m.path=="string"?m.path:void 0,v=typeof m.id=="string"?m.id:"",A=typeof m.kind=="string"?m.kind:"",f=typeof m.title=="string"?m.title:"";if(y===void 0||v.length===0||A.length===0||f.length===0)continue;let l=y.startsWith("shared/")?El.default.join(r.harnessRootDir,y):El.default.join(r.harnessSetsDir,i,y);_n.default.existsSync(l)&&d.push({id:v,kind:A,title:f,content:_n.default.readFileSync(l,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var Sy={};Xe(Sy,{startAgentWitchClient:()=>Vv});var xl,vn,cr,zv,Tv,Iv,Ov,Nv,py,Mv,gy,fy,hy,kl,C,yy,I,Ll,Hv,Es,Dv,Fv,Uv,jv,$v,Bv,Gv,Ay,Vv,by=u(()=>{"use strict";xl=require("node:child_process"),vn=g(require("node:fs")),cr=g(require("node:os"));mm();On();Bs();Ds();fa();Qe();Sm();vm();Vm();jt();x();Xp();Ot();Yo();Ra();Qo();ot();wa();Cr();Bt();Jo();Qp();og();tt();ig();cg();Ha();os();ls();Ng();Hh();Ba();$h();Ct();Vh();Kr();qh();Us();$n();wt();Dn();Yh();Qh();ws();gr();ly();gi();at();zv={},Tv="claude",Iv="codex",Ov="cursor",Nv="agy",py=3e4,Mv=3e4,gy=new Map,fy=new Map,hy=new Map,kl=e=>{let t=e?.trim()??"";return t.length>0?t:Gh()},C=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yy=e=>{let t=L(e);if(!vn.default.existsSync(t.configPath))return null;try{let r=JSON.parse(vn.default.readFileSync(t.configPath,"utf8"));if(!C(r))throw new Error("Config must be a JSON object.");let n=typeof r.wsUrl=="string"?r.wsUrl.trim():"",o=po({installDir:t.installDir,configWsUrl:n}),s=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),i=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??Tv,a=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??Iv,c=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??Ov,d=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??Nv,m=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",y=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return m.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:y,wsUrl:o,workspace:s,claudeCommand:i,codexCommand:a,cursorCommand:c,antigravityCommand:d,pairingToken:m,writerExecutionBackend:K(r.writerExecutionBackend),layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},I=(e,t,r)=>{e.readyState===jr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(_t(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),ja(r,"out",t)))},Ll=e=>e,Hv=e=>{if(!vn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(vn.default.readFileSync(e.harnessManifestPath,"utf8"));if(C(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Es=(e,t)=>{let r=Hv(t);r!==null&&I(e,{type:"harness.manifest.report",payload:{hostname:cr.default.hostname(),manifest:r}})},Dv=async(e,t,r,n,o,s,i=!1,a,c,d,m)=>{if(!H(t)){I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let y=ts(t)&&!Mp(t);if(y){try{await Ve(e.layout.installDir,t)}catch(b){let _=b instanceof Error?b.message:String(b);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}es(t)}else if(!ts(t))try{await Ve(e.layout.installDir,t)}catch(b){let _=b instanceof Error?b.message:String(b);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${_}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let v=i&&Np(t)&&Hp(t)?"continue":"first",A=r;if(i&&v==="first"&&typeof c=="string"&&c.length>0){let b=Ko(e.layout,c);if(b!==null){let{buildContinuationPromptWithContext:_}=await Promise.resolve().then(()=>(dy(),cy));A=_({priorPrompt:b.prompt,priorOutput:b.resultOutput??"",userMessage:r})}}let f=kl(d);We({projectFolderPath:f});let l=await ln({layout:e.layout,query:A,limit:5,projectFolderPath:f}),S=Fh(e.layout,f),h=`${jh(S)}${Bg(l)}${A}`,p=m?.trim()??(s!==void 0&&f.trim().length>0?Zh():void 0);if(s!==void 0&&p!==void 0&&p.length>0&&f.trim().length>0){Un({reportKey:p,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let b=await ay({config:e,writerAgent:t,wrappedPrompt:h,reportKey:p,agentRunId:s});if(b.estimateSeconds!==null){let _=`${bn}
${b.estimateSeconds}
`;Ge(s)?I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:_},requestId:n}):At(s,_)}h=Jh(h,b),h=dc(h,{agentRunId:s,reportKey:p,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}Ta(e,t,h,n,Ll(o),s,{sessionTurn:v},a,f,p),y&&s!==void 0&&I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Fp(t)},requestId:n})},Fv=async(e,t,r,n,o)=>{let s=(i,a)=>{I(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await Up({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Ne({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:m=>{i+=m,I(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:m},requestId:n})}}),c=H(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?en(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Uv=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=Nt(t,r,Ne({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,xl.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),jv=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(I(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!H(o)){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let i=await(async()=>{try{await Ve(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return Uv(e,o,s)})();I(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Es(n,e.layout)},$v=e=>{let t=1e3*2**e;return Math.min(Mv,t)},Bv=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,Zp().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,S="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,ng({layout:e.layout,remoteBundleVersion:l,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=ne(e.layout);l!==null&&de(l,ce)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),A())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let l=t.socket;t.socket=void 0,t.wsConnected=!1,l.removeAllListeners("open"),l.removeAllListeners("message"),l.removeAllListeners("close"),l.on("error",()=>{}),(l.readyState===jr.OPEN||l.readyState===jr.CONNECTING)&&l.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,py)},m=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=$v(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},l)},y=l=>{s();let S=()=>{let h=z(e.layout.installDir)?.bundleVersion??null,p=re();I(l,{type:"agent.heartbeat",payload:{hostname:cr.default.hostname(),macOsUsername:cr.default.userInfo().username,wakeError:t.wakeError,wakePort:p,...e.email!==null?{email:e.email}:{},...h!==null?{installBundleVersion:h}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,py)},v=(l,S)=>{if(typeof l.type!="string")return;_t(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"}),ja(e.layout,"in",l);let h=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&C(l.payload)){let p=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",b=typeof l.payload.origin=="string"?l.payload.origin:"",_=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",W=typeof l.payload.challenge=="string"?l.payload.challenge:"",k=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!Sg({serverPublicKey:p,origin:b,devicePublicKey:_,challenge:W,serverAttestation:k})){t.wakeError="Server attestation verification failed",_t(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&C(l.payload)){let p=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";_t(e.layout,{direction:"local",type:"writer.ensure",summary:p,action:"ensure-writer"}),Kh({layout:e.layout,writerAgent:p,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{I(S,{type:"writer.status",payload:b},e.layout)})}if(l.type==="install.bundle.update"&&C(l.payload)){let p=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";p.length>0&&n(p,"install.bundle.update")}if(l.type==="system.ack"){Wi(e.layout,{wsUrl:e.wsUrl});let p=C(l.payload)?l.payload:null,b=sg(p);b!==null&&n(b)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&C(l.payload)&&ag(l.payload),l.type==="automations.run"&&C(l.payload)&&lg(l.payload),l.type==="terminal.stream.accepted"&&C(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"";if(p.length>0){let b=pp(p);for(let _ of b)I(S,{type:"terminal.stream.chunk",payload:{runId:p,chunk:_},requestId:h})}}if(l.type==="agent.agentRun.list"&&I(S,{type:"dashboard.agentRun.list.result",payload:{runs:op(e.layout)},requestId:h}),l.type==="agent.agentRun.get"&&C(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"",b=p.length>0?Ko(e.layout,p):null;I(S,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:h})}if(l.type==="command.claude.run"&&C(l.payload)){let p=l.payload.prompt,b=typeof l.payload.writerAgent=="string"&&H(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",_=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,W=l.payload.sessionContinuation===!0,k=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,R=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,j=kl(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),ge=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof p=="string"&&p.trim().length>0&&(console.log(`[agent-witch] Running ${b} task (${W?"continue":"first"})\u2026`),_!==void 0&&R!==void 0&&gy.set(_,R),_!==void 0&&(fy.set(_,j),hy.set(_,p.trim()),We({projectFolderPath:j})),Dv(e,b,p.trim(),h,S,_,W,R,k,j,ge))}if(l.type==="shell.session.open"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:120,_=typeof l.payload.rows=="number"?l.payload.rows:32;p.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Wp({shellSessionId:p,cwd:e.workspace,cols:b,rows:_,send:W=>{I(S,W)},requestId:h}))}if(l.type==="shell.session.close"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";p.length>0&&Zr(p,b=>{I(S,b)},h)}if(l.type==="shell.input"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.data=="string"?l.payload.data:"";p.length>0&&b.length>0&&_p(p,b)}if(l.type==="shell.resize"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:0,_=typeof l.payload.rows=="number"?l.payload.rows:0;p.length>0&&b>0&&_>0&&vp(p,b,_)}if(l.type==="command.writer.session.end"&&C(l.payload)){let p=l.payload.writerAgent;typeof p=="string"&&H(p)&&Dp(p)}if(l.type==="command.writer.session.start"&&C(l.payload)){let p=l.payload.writerAgent,b=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof p=="string"&&H(p)&&b.length>0&&(console.log(`[agent-witch] Starting ${p} session\u2026`),Fv(e,p,b,h,S))}if(l.type==="command.claude.stop"&&C(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";p.length>0&&(console.log(`[agent-witch] Stopping run ${p}\u2026`),Yp(e,Ll(S),p,h))}if(l.type==="command.claude.input_respond"&&C(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",b=typeof l.payload.response=="string"?l.payload.response.trim():"",_=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",W=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",k=typeof l.payload.question=="string"?l.payload.question:"";p.length>0&&b.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),qp(e,{agentRunId:p,originalPrompt:_,partialOutput:W,question:k,response:b,shellSessionId:gy.get(p)},h,Ll(S)))}if(l.type==="dispatch.approval.required"&&C(l.payload)){let p=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",b=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${p}: ${b}`),process.platform==="darwin"&&(0,xl.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${p.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&C(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),jv(e,l.payload,h,S)),l.type==="harness.export.request"&&C(l.payload)){let p=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",b=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,_=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(W=>typeof W=="string"):[];p.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(my(),uy)),k=W(_,e.email);I(S,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:p,...b!==void 0?{targetDeviceId:b}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:h})})()}if(l.type==="harness.manifest.request"&&Es(S,e.layout),l.type==="command.claude.result"&&C(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,b=kl(p!==void 0?fy.get(p):void 0),_=p!==void 0?hy.get(p)??"":"";$g({layout:e.layout,text:l.payload.output,source:p??"command.claude.result",projectFolderPath:b}),_.trim().length>0&&Uh({layout:e.layout,projectFolderPath:b,entry:{id:`${Date.now()}-${p??"run"}`,...p!==void 0?{agentRunId:p}:{},prompt:_,output:l.payload.output,createdAt:new Date().toISOString()}})}},A=()=>{if(t.stopped)return;a(),c();let l=new jr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Wi(e.layout,{wsUrl:e.wsUrl}),Gp(Oe({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Vp(e.layout);let S=ee(e.wsUrl)??"http://localhost:3000",h=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),p=Ag({layout:e.layout,origin:S,...h!==void 0&&h.length>0?{claimToken:h}:{}});I(l,{type:"agent.register",payload:{role:"agent",hostname:cr.default.hostname(),macOsUsername:cr.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...p}},e.layout),Es(l,e.layout),Jp(e,l),y(l)}),l.on("message",S=>{let h=typeof S=="string"?S:S.toString("utf8");try{let p=JSON.parse(h);if(!C(p))return;v(p,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",(S,h)=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1;let p=typeof h=="string"?h:h.toString("utf8");rr(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:p}),console.log("[agent-witch] Disconnected from server."),m()}),l.on("error",S=>{t.wakeError=S.message,rr(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})};return{connect:A,startLocalHealthCheck:d,stop:()=>{t.stopped=!0,s(),i(),a(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Mh(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Es(l,e.layout),{ok:!0})}}},Gv=async()=>{let e=()=>{let r=Vl();if(r.length===0){let n=yy(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=yy(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},Ay=async()=>{xt("agent-witch"),hm().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=w();_m(t);let r=Am({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),Gn();let n=await Gv(),o=n[0];o!==void 0&&Og(o.layout);let s=n.map(y=>Bv(y)),i=s[0];i===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ga(),process.exit(0));let a=()=>{n.forEach((y,v)=>{let A=ne(y.layout);A!==null&&!de(A,ce)||s[v]?.reviveWebSocket()})},c=()=>{},d=await Gm({reconnectWebSockets:a,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),c()}});Nh({layout:n[0].layout,controllers:{getStatus:i.getStatus,reviveWebSocket:a,reportHarnessManifestIfConnected:i.reportHarnessManifestIfConnected}});for(let y of s)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Bridging ${s.length} account profile(s) in one process.`);let m=In(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Tn(),c()});c=()=>{m(),d.stop(),ga(),console.log("[agent-witch] Shutting down.");for(let y of s)y.stop();process.exit(0)},process.on("SIGINT",()=>{c()}),process.on("SIGTERM",()=>{c()})},Vv=Ay;if(Pt(zv.url)&&!ae()){let e=process.argv.indexOf("report");e>=0&&process.exit(jn(process.argv.slice(e))),Ay()}});On();Us();$n();var Ac="20.x",Sc="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var Xy=e=>[`Node.js ${Ac} or newer is required (found ${e}).`,Sc].join(" "),bc=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${Xy(process.version)}
`),process.exit(1))};var Yv={},Kv=async()=>{xt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(It(),Kn)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},qv=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Bi(),au)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Jv=async()=>{if(!Pt(Yv.url))return;bc();let e=process.argv.indexOf("report");e>=0&&process.exit(jn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Kv();return}if(t==="wake"){await qv();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(by(),Sy));await r()};Jv();
