#!/usr/bin/env node
"use strict";var Yg=Object.create;var No=Object.defineProperty;var Xg=Object.getOwnPropertyDescriptor;var Zg=Object.getOwnPropertyNames;var Qg=Object.getPrototypeOf,ef=Object.prototype.hasOwnProperty;var m=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var F=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Te=(e,t)=>{for(var r in t)No(e,r,{get:t[r],enumerable:!0})},tf=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Zg(t))!ef.call(e,o)&&o!==r&&No(e,o,{get:()=>t[o],enumerable:!(n=Xg(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?Yg(Qg(e)):{},tf(t||!e||!e.__esModule?No(r,"default",{value:e,enumerable:!0}):r,e));var oi,si,Oo=m(()=>{"use strict";oi=new Set(["","loginwindow","_mbsetupuser","root"]),si=5e3});var ai,Gr,Mo=m(()=>{"use strict";ai=require("node:child_process"),Gr=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,ai.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var X,tt=m(()=>{"use strict";X=()=>!0});var Vr,ii,rf,zr,Ho=m(()=>{"use strict";Vr=g(require("node:path")),ii=require("node:url");tt();rf={},zr=()=>{if(X()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Vr.default.dirname(Vr.default.resolve(e))}return Vr.default.dirname((0,ii.fileURLToPath)(rf.url))}});var re,li,rt=m(()=>{"use strict";re="agent-witch.js",li="command"});var Do,pi,E,nf,Fo,Uo,of,sf,af,lf,Ne,cf,ci,di,ui,jo,ne,Kr,qr,mi,nt,ot,_,gi,Bo,fi,hi,Jr,yi,Ai,oe,$o,df,uf,be,mf,W,x=m(()=>{"use strict";Do=g(require("node:fs")),pi=g(require("node:os")),E=g(require("node:path"));Ho();rt();nf=zr(),Fo=".agent-witch",Uo=".local-agent-witch",of=47892,sf=47893,af="com.agent-witch",lf="com.local-agent-witch",Ne="profiles",cf="active-profile.json",ci="harness",di="sets",ui="manifest.json",jo="projects",ne="logs",Kr="agent-witch.log",qr="agent-witch.error.log",mi="reports",nt="device-keypair.json",ot=e=>e.trim().toLowerCase(),_=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return E.default.resolve(e);let t=E.default.resolve(nf),r=E.default.basename(t),n=E.default.basename(E.default.dirname(t));return r==="app"&&(n===Fo||n===Uo)?E.default.dirname(t):r===Fo||r===Uo?t:E.default.join(pi.default.homedir(),Fo)},gi=(e=_())=>E.default.join(e,"app"),Bo=(e=_())=>E.default.join(gi(e),re),fi=(e,t,r)=>t!==null?E.default.join(e,Ne,t,r):E.default.join(e,r),hi=e=>fi(e.installDir,e.profileEmail,jo),Jr=e=>fi(e.installDir,e.profileEmail,ne),yi=e=>e.profileEmail!==null?E.default.join(e.installDir,Ne,e.profileEmail,nt):E.default.join(e.installDir,nt),Ai=e=>E.default.basename(e)===Uo,oe=(e=_())=>Ai(e)?lf:af,$o=(e=_())=>Ai(e)?sf:of,df=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return ot(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?ot(t):null},uf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),be=(e=_())=>{let t=E.default.join(e,cf);if(!Do.default.existsSync(t))return null;try{let r=JSON.parse(Do.default.readFileSync(t,"utf8"));if(uf(r)&&typeof r.email=="string"&&r.email.trim().length>0)return ot(r.email)}catch{return null}return null},mf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?ot(r):null}let t=df();return t!==null?t:be()},W=e=>{let t=_(),r=gi(t),n=Bo(t),o=mf(e);if(o!==null){let h=E.default.join(t,Ne,o),S=E.default.join(h,ci),y=E.default.join(h,jo),l=E.default.join(h,ne),A=E.default.join(h,mi),b=E.default.join(h,nt),f=E.default.join(h,ne,Kr),v=E.default.join(h,ne,qr);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:l,mainLogPath:f,errorLogPath:v,reportsDir:A,deviceKeypairPath:b,configPath:E.default.join(h,"config.json"),harnessRootDir:S,harnessManifestPath:E.default.join(S,ui),harnessSetsDir:E.default.join(S,di)}}let s=E.default.join(t,ci),a=E.default.join(t,jo),i=E.default.join(t,ne),c=E.default.join(t,mi),u=E.default.join(t,nt),d=E.default.join(t,ne,Kr),p=E.default.join(t,ne,qr);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:a,logsDir:i,mainLogPath:d,errorLogPath:p,reportsDir:c,deviceKeypairPath:u,configPath:E.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:E.default.join(s,ui),harnessSetsDir:E.default.join(s,di)}}});var Yr,Go,Si,D,vi,Oe=m(()=>{"use strict";Yr=g(require("node:fs")),Go=g(require("node:path"));x();Si=e=>{let t=Go.default.join(e,Ne);return Yr.default.existsSync(t)?Yr.default.readdirSync(t).filter(r=>Yr.default.statSync(Go.default.join(t,r)).isDirectory()).map(r=>ot(r)).toSorted():[]},D=(e=_())=>{let t=oe(e);return[{profileEmail:Si(e)[0]??null,launchAgentLabel:t}]},vi=(e=_())=>Si(e)});var Xr,st,bi,Vo,_i,pf,wi,gf,ff,Ut,hf,Ei,Zr=m(()=>{"use strict";Xr=require("node:child_process"),st=g(require("node:fs")),bi=g(require("node:os")),Vo=g(require("node:path")),_i=require("node:util");Oe();x();pf=(0,_i.promisify)(Xr.execFile),wi=()=>Vo.default.join(bi.default.homedir(),"Library","LaunchAgents"),gf=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await pf("launchctl",["bootout",r]).catch(()=>{})},ff=e=>{let t=Vo.default.join(wi(),`${e}.plist`);st.default.existsSync(t)&&st.default.unlinkSync(t)},Ut=(e=_())=>{let t=oe(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of D(e))r.add(o.launchAgentLabel);let n=wi();if(st.default.existsSync(n))for(let o of st.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},hf=e=>{(0,Xr.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Ei=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=_();if(!st.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Ut(e);for(let r of t)await gf(r),ff(r);return hf(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Qr,zo=m(()=>{"use strict";Mo();Zr();x();Qr=(e=_())=>{for(let t of Ut(e))Gr(t)}});var Wi,yf,Af,xi,ki=m(()=>{"use strict";Wi=require("node:child_process");Oo();yf=e=>e.trim().toLowerCase(),Af=e=>e==null?!1:!oi.has(yf(e)),xi=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Wi.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Af(t)?t:null}catch{return null}}});var Ri,Li,se,jt=m(()=>{"use strict";Ri=g(require("node:os"));ki();Li=e=>e.trim().toLowerCase(),se=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?xi():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??Ri.default.userInfo().username;return Li(r)===Li(n)}});var at,en,tn=m(()=>{"use strict";Oo();zo();jt();at=e=>{se()||(Qr(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},en=(e,t=si)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{se()||e()},t);return()=>{clearInterval(r)}}});var Ci,Pi,Ii,rn,nn,Ti,Ni,it=m(()=>{"use strict";Ci=".agent-witch",Pi="memory",Ii="project.json",rn="chunks.ndjson",nn="runs.ndjson",Ti="reports",Ni=".json"});var Oi,on,Ko=m(()=>{"use strict";Oi=g(require("node:path"));it();on=(e,t)=>Oi.default.join(e.trim(),`${t.trim()}${Ni}`)});var Me,Mi,Hi=m(()=>{"use strict";rt();Me=e=>`'${e.replace(/'/g,"'\\''")}'`,Mi=e=>{let t=`${e.installDir.trim()}/${"app"}/${re}`,r=[Me("node"),Me(t),"report","write","--key",Me(e.reportKey.trim()),"--agent-run-id",Me(e.agentRunId.trim()),"--status",Me(e.status),"--summary",Me(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Me(e.details.trim())),r.join(" ")}});var Z,Fi,Sf,Di,sn=m(()=>{"use strict";Ko();Hi();Z={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Fi=e=>e===Z.COMPLETED||e===Z.FAILED,Sf=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Di=(e,t)=>{let r=on(t.reportsDir,t.reportKey),n=Mi({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Z.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${Sf({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Bt,ji,Ui,Bi,vf,an,bf,_f,$t,ln,$i,Gi,Gt=m(()=>{"use strict";Bt=g(require("node:fs")),ji=g(require("node:path"));sn();Ko();x();Ui=50,Bi=e=>{let t=W(),r=on(t.reportsDir,e);return Bt.default.mkdirSync(ji.default.dirname(r),{recursive:!0}),r},vf=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},an=e=>{let t=Bi(e);if(!Bt.default.existsSync(t))return null;try{let r=JSON.parse(Bt.default.readFileSync(t,"utf8"));return vf(r)?r:null}catch{return null}},bf=(e,t)=>{let r=[...e,t];return r.length>Ui?r.slice(r.length-Ui):r},_f=e=>{let t=Bi(e.reportKey);Bt.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},$t=e=>{let t=an(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:bf(t?.history??[],n)};return _f(o),o},ln=e=>{let t=an(e.reportKey);return t!==null?t:$t({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Z.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},$i=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},Gi=e=>{if(e===null||!Fi(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Z.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var wf,Ef,Vt,Vi,cn,qo=m(()=>{"use strict";sn();Gt();wf=new Set(Object.values(Z)),Ef=e=>wf.has(e),Vt=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},Vi=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},cn=e=>{if(e[0]!=="write")return Vi(),1;let r=Vt(e,"--key"),n=Vt(e,"--agent-run-id"),o=Vt(e,"--status"),s=Vt(e,"--summary"),a=Vt(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!Ef(o)?(Vi(),1):($t({reportKey:r,agentRunId:n,status:o,userSummary:s,details:a}),0)}});var Jo,zi,lt,dn=m(()=>{"use strict";Jo=g(require("node:path")),zi=require("node:url");tt();lt=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Jo.default.resolve(t);return X()?r===Jo.default.resolve(__filename):r===(0,zi.fileURLToPath)(e)}});var zt,Yo,kf,Lf,Yi,U,Xi,un,He=m(()=>{"use strict";zt=g(require("node:fs")),Yo=g(require("node:path"));x();kf="install-version.json",Lf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yi=(e=_())=>Yo.default.join(e,kf),U=(e=_())=>{let t=Yi(e);if(!zt.default.existsSync(t))return null;try{let r=JSON.parse(zt.default.readFileSync(t,"utf8"));return!Lf(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Xi=(e,t=_())=>{let r=Yi(t);zt.default.mkdirSync(Yo.default.dirname(r),{recursive:!0}),zt.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},un=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var Qi,el,tl,rl,nl,Kt,Rf,Cf,Pf,Zi,_e,qt=m(()=>{"use strict";Qi=require("node:child_process"),el=g(require("node:fs")),tl=g(require("node:os")),rl=g(require("node:path")),nl=require("node:util");jt();Kt=(0,nl.promisify)(Qi.execFile),Rf=e=>rl.default.join(tl.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Cf=async e=>{try{return await Kt("launchctl",["print",e]),!0}catch{return!1}},Pf=async(e,t,r)=>{await Cf(t)&&await Kt("launchctl",["bootout",t]).catch(()=>{}),await Kt("launchctl",["bootstrap",e,r]),await Kt("launchctl",["enable",t])},Zi=async e=>{try{return await Kt("launchctl",["kickstart","-k",e]),!0}catch{return!1}},_e=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!se())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await Zi(n))return{ok:!0};let o=Rf(e);if(!el.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Pf(r,n,o),await Zi(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var If,mn,Xo=m(()=>{"use strict";Mo();Zr();Oe();x();If=(e=_())=>{let t=new Set(D(e).map(r=>r.launchAgentLabel));return Ut(e).filter(r=>!t.has(r))},mn=(e=_())=>{for(let t of If(e))Gr(t)}});var K,ct=m(()=>{"use strict";K=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var ol,Fe,Zo,Tf,Nf,sl,dt,pn,Qo=m(()=>{"use strict";ol=require("node:crypto"),Fe=g(require("node:fs")),Zo=g(require("node:path"));x();Tf="self-update-log.ndjson",Nf=100,sl=(e=_())=>{let t=W(),r=t.installDir===e?t.logsDir:Jr({installDir:e,profileEmail:t.profileEmail});return Zo.default.join(r,Tf)},dt=(e,t=_())=>{let r={id:(0,ol.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=sl(t);Fe.default.mkdirSync(Zo.default.dirname(n),{recursive:!0});let o=Fe.default.existsSync(n)?Fe.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Nf+1)),JSON.stringify(r)];return Fe.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},pn=(e=20,t=_())=>{let r=sl(t);if(!Fe.default.existsSync(r))return[];let n=Fe.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var al,il,ll=m(()=>{"use strict";al="deps.tar.gz",il="deps"});var dl,we,De,Of,ul,ml,pl=m(()=>{"use strict";dl=require("node:child_process"),we=g(require("node:fs")),De=g(require("node:path"));ll();Of=e=>De.default.join(e,"app",il),ul=e=>{let t=De.default.join(e,"app"),r=De.default.join(t,al);we.default.existsSync(r)&&(we.default.rmSync(Of(e),{recursive:!0,force:!0}),we.default.mkdirSync(t,{recursive:!0}),(0,dl.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),we.default.rmSync(r,{force:!0}))},ml=e=>{we.default.rmSync(De.default.join(e,"node_modules"),{recursive:!0,force:!0}),we.default.rmSync(De.default.join(e,"package.json"),{force:!0}),we.default.rmSync(De.default.join(e,"package-lock.json"),{force:!0})}});var fn={};Te(fn,{buildAgentWitchSelfUpdateStatus:()=>rs,fetchAgentWitchRemoteInstallBundleVersion:()=>es,runAgentWitchSelfUpdate:()=>ts});var Ee,gn,gl,Mf,fl,es,Hf,Ff,Jt,ts,rs,ut=m(()=>{"use strict";Ee=g(require("node:fs")),gn=g(require("node:path"));He();qt();Xo();Oe();ct();x();rt();Qo();pl();gl=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mf=e=>{let t=be(e),r=t===null?W():W(t);if(!Ee.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Ee.default.readFileSync(r.configPath,"utf8"));return!gl(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},fl=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!gl(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},es=async e=>(await fl(e))?.bundleVersion??null,Hf=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=gn.default.join(t,r);Ee.default.mkdirSync(gn.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());Ee.default.writeFileSync(o,s),r.endsWith(".js")&&Ee.default.chmodSync(o,493)},Ff=async()=>{mn();let e=D();for(let t of e)await _e(t.launchAgentLabel)},Jt=(e,t)=>({localBundleVersion:t,...e}),ts=async e=>{let t=_(),r=U(t),n=r?.bundleVersion??null,o=Mf(t),s=o===null?r?.appOrigin??null:K(o);if(s===null){let c=Jt({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return dt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let a=await fl(s);if(a===null){let c=Jt({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return dt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||un(n,a.bundleVersion))){let c=Jt({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return dt({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),c}try{for(let d of a.scripts)await Hf(s,t,d);let c=gn.default.join(t,re);Ee.default.existsSync(c)&&Ee.default.rmSync(c,{force:!0}),ul(t),ml(t),Xi({bundleVersion:a.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await Ff();let u=Jt({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return dt({event:"update_applied",ok:!0,message:u.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),u}catch(c){let u=c instanceof Error?c.message:"Agent Witch self-update failed.",d=Jt({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},n);return dt({event:"update_failed",ok:!1,message:u,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}},rs=()=>{let e=_();return{local:U(e),logs:pn(20,e)}}});var hn,Yt,hl,ns,Xt,os=m(()=>{"use strict";hn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=i=>n.find(c=>c.type===i)?.value??"0",s=o("weekday"),a={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:a[s]??0}},Yt=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=hn(o,t),a=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-a*6e4)},hl=e=>e>=1&&e<=5,ns=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return hn(t,"UTC")},Xt=e=>{let t=e.from??new Date,r=hn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Yt(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Yt(r,e.timeZone,n,0),s=hn(o,e.timeZone),a=t.getTime()>=o.getTime();if(e.preset==="daily")return a?Yt(ns(r),e.timeZone,n,0):o;if(!a&&hl(s.weekday))return o;let i=r;for(let c=0;c<8;c+=1)if(i=ns(i),hl(i.weekday))return Yt(i,e.timeZone,n,0);return Yt(ns(r),e.timeZone,n,0)}});var Df,yn,ss=m(()=>{"use strict";Df=e=>e==="hourly"||e==="daily"||e==="weekdays",yn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",a=typeof t.schedulePreset=="string"?t.schedulePreset:"",i=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!Df(a)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:a,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:i,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Zt,An,yl,Al,as,We,Sl,vl,bl,_l,Qt=m(()=>{"use strict";Zt=g(require("node:fs")),An=g(require("node:path"));ss();yl="automations.json",Al=e=>e.profileEmail!==null?An.default.join(e.installDir,"profiles",e.profileEmail,yl):An.default.join(e.installDir,yl),as=()=>({version:1,automations:[]}),We=e=>{let t=Al(e);if(!Zt.default.existsSync(t))return as();try{let r=JSON.parse(Zt.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?as():{version:1,automations:r.automations.flatMap(o=>{let s=yn(o);return s!==null?[s]:[]})}}catch{return as()}},Sl=(e,t)=>{let r=Al(e);Zt.default.mkdirSync(An.default.dirname(r),{recursive:!0}),Zt.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},vl=(e,t)=>{Sl(e,{version:1,automations:t})},bl=(e,t)=>{let n=We(e).automations.filter(o=>o.id!==t.id);Sl(e,{version:1,automations:[...n,t]})},_l=(e,t)=>We(e).automations.find(r=>r.id===t)??null});var Uf,jf,Sn,is=m(()=>{"use strict";os();ss();Qt();x();Uf=e=>e!==void 0&&e.trim().length>0?W(e.trim()):W(),jf=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Xt({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Xt({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Sn=e=>{let t=Uf(e.profileEmail),r=We(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let a=yn(s);return a!==null?[jf(a,n.get(a.id))]:[]});return vl(t,o),{ok:!0,writtenCount:o.length}}});var wl,El=m(()=>{"use strict";wl="x-agent-witch-token"});var vn,Wl,xl,kl,bn=m(()=>{"use strict";El();ct();vn=e=>{let t=K(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Wl=e=>({[wl]:e,"Content-Type":"application/json"}),xl=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Wl(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},kl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Wl(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var _n,er,M,xe,Ll,mt,pt=m(()=>{"use strict";_n={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},er=e=>e.trim().length>0,M=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",xe=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:er(t)?t.trim():_n.claudeCommand,codexCommand:er(r)?r.trim():_n.codexCommand,cursorCommand:er(n)?n.trim():_n.cursorCommand,antigravityCommand:er(o)?o.trim():_n.antigravityCommand}},Ll=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},mt=(e,t,r,n)=>{let o=t.trim();if(!er(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var Rl,wn,ls=m(()=>{"use strict";Rl=require("node:child_process");pt();wn=(e,t,r)=>new Promise(n=>{if(!M(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=mt(t,r,xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Rl.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),a=[];s.stdout?.on("data",i=>{a.push(i.toString("utf8"))}),s.stderr?.on("data",i=>{a.push(i.toString("utf8"))}),s.on("close",i=>{n({exitCode:i??-1,output:a.join("")})}),s.on("error",i=>{n({exitCode:-1,output:i.message})})})});var cs,Bf,$f,Gf,Vf,zf,Kf,ae,tr=m(()=>{"use strict";cs=g(require("node:fs"));x();Bf="ws://localhost:3000/api/agent-witch/ws",$f="claude",Gf="codex",Vf="cursor",zf="agy",Kf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ae=()=>{let e=W();if(!cs.default.existsSync(e.configPath))return null;try{let t=JSON.parse(cs.default.readFileSync(e.configPath,"utf8"));if(!Kf(t))return null;let r=typeof t.wsUrl=="string"&&t.wsUrl.length>0?t.wsUrl:Bf,n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),o=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:r,workspace:n,claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:$f,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:Gf,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:Vf,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:zf,pairingToken:o,layout:e}}catch{return null}}});var Cl,ds,gt,En=m(()=>{"use strict";Cl=require("node:crypto");bn();os();ls();Qt();tr();ds=!1,gt=async e=>{if(ds)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=ae();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=vn({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=_l(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};ds=!0;let o=(0,Cl.randomUUID)();try{let s=await wn(t,"claude-cli",n.prompt);await kl(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let a=new Date,i=Xt({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:a});return bl(t.layout,{...n,lastRunAt:a.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:i.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{ds=!1}}});function rr(e){return(0,Pl.createHash)("sha256").update(e.trim()).digest("hex")}var Pl,us=m(()=>{"use strict";Pl=require("node:crypto")});var qf,Il,Jf,Yf,nr,Tl,ms=m(()=>{"use strict";qf=["agentwitch.com","www.agentwitch.com"],Il=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Jf=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},Yf=e=>{let t=Jf(e);return!!(qf.includes(t)||Il.test(e.trim().toLowerCase()))},nr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return Yf(r)?Il.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Tl=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:nr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Wn,Nl,Xf,Zf,Ol,Ml,ps,xn,kn=m(()=>{"use strict";Wn=g(require("node:fs")),Nl=g(require("node:path")),Xf="wake-port.json",Zf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ol=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Ml=e=>Nl.default.join(e,Xf),ps=e=>{let t=Ml(e);if(!Wn.default.existsSync(t))return null;try{let r=JSON.parse(Wn.default.readFileSync(t,"utf8"));if(Zf(r)&&Ol(r.wakePort))return r.wakePort}catch{return null}return null},xn=(e,t)=>{if(!Ol(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Ml(e);Wn.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var jb,Bb,$b,q,Hl,ft=m(()=>{"use strict";kn();x();kn();jb=$o(),Bb=`${oe()}-wake`,$b=oe(),q=()=>{let e=_(),t=ps(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return $o()},Hl=e=>{let t=_();ps(t)===null&&xn(t,e)}});var ht,or,Qf,Fl,Dl,Ul=m(()=>{"use strict";ht=g(require("node:fs")),or=g(require("node:path"));us();x();Qf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fl=e=>{if(!ht.default.existsSync(e))return null;try{let t=JSON.parse(ht.default.readFileSync(e,"utf8"));return!Qf(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:rr(t.pairingToken.trim())}catch{return null}},Dl=(e=_())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(Fl(or.default.join(e,"config.json")));let o=or.default.join(e,Ne);if(!ht.default.existsSync(o))return t;for(let s of ht.default.readdirSync(o)){let a=or.default.join(o,s);ht.default.statSync(a).isDirectory()&&n(Fl(or.default.join(a,"config.json")))}return t}});var jl,Bl=m(()=>{"use strict";jl=["rule","skill","command","instruction","agent"]});var $l,eh,th,Gl,Vl=m(()=>{"use strict";Bl();$l=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eh=e=>typeof e=="string"&&jl.includes(e),th=e=>{if(!$l(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!eh(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Gl=e=>{if(!$l(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let a=th(s);return a===null?[]:[a]});return{name:t,slug:r,items:o}}});var zl,rh,nh,oh,sh,ah,ih,lh,ch,Ln,gs=m(()=>{"use strict";zl=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},rh=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},nh=(e,t)=>{let r=rh(t),n=zl(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},oh=(e,t,r)=>{let n=nh(t,r);return`shared/items/${e}/${n}`},sh=["rules","skills","commands","instructions","agents"],ah=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),ih=(e,t)=>[...e.filter(n=>n.id!==t.id),t],lh=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},ch=e=>({id:e.id,kind:e.kind,title:e.title,path:oh(e.id,e.kind,e.title)}),Ln=e=>{let t=new Date().toISOString(),r=e.existingManifest??ah(e.hostname,t),n=zl(e.bundle.slug),o=lh(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...sh.map(u=>`sets/${n}/${u}`),"shared/items"],{files:a,nextItems:i}=e.bundle.items.reduce((u,d)=>{let p=ch(d);return{files:[...u.files,{relativePath:p.path,content:d.content}],nextItems:ih(u.nextItems,p)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:i}}},directories:s,files:a}}});var ke,Kl,Rn,dh,ql,Jl=m(()=>{"use strict";ke=g(require("node:fs")),Kl=g(require("node:os")),Rn=g(require("node:path"));gs();x();dh=e=>{if(!ke.default.existsSync(e))return null;try{let t=JSON.parse(ke.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},ql=e=>{let t=W(e.profileEmail);try{let r=dh(t.harnessManifestPath),n=Ln({bundle:e.bundle,hostname:Kl.default.hostname(),existingManifest:r});ke.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)ke.default.mkdirSync(Rn.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=Rn.default.join(t.harnessRootDir,o.relativePath);ke.default.mkdirSync(Rn.default.dirname(s),{recursive:!0}),ke.default.writeFileSync(s,o.content)}return ke.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var Yl,Xl,Cn,fs=m(()=>{"use strict";Yl=require("node:child_process"),Xl=g(require("node:fs"));jt();x();Cn=(e=_())=>{let t=Bo(e);if(!Xl.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!se())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=be(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,Yl.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var hs,ie,s_,yt=m(()=>{"use strict";x();hs="connection-health.json",ie=12e4,s_=`${oe()}-watchdog`});var Zl,Ue,ys,uh,mh,ph,Ql,gh,ec,Pn,In=m(()=>{"use strict";Zl=require("node:crypto"),Ue=g(require("node:fs")),ys=g(require("node:path"));x();uh="watchdog-log.ndjson",mh=200,ph=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ql=(e=_())=>{let t=W(),r=t.installDir===e?t.logsDir:Jr({installDir:e,profileEmail:t.profileEmail});return ys.default.join(r,uh)},gh=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!ph(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},ec=(e,t=_())=>{let r={id:(0,Zl.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=Ql(t);Ue.default.mkdirSync(ys.default.dirname(n),{recursive:!0});let o=Ue.default.existsSync(n)?Ue.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-mh+1)),JSON.stringify(r)];return Ue.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Pn=(e=20,t=_())=>{let r=Ql(t);if(!Ue.default.existsSync(r))return[];let n=Ue.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=gh(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var sr,Tn,fh,tc,Q,As,le,ar=m(()=>{"use strict";sr=g(require("node:fs")),Tn=g(require("node:path"));yt();fh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tc=e=>e.profileEmail===null?Tn.default.join(e.installDir,hs):Tn.default.join(e.installDir,"profiles",e.profileEmail,hs),Q=e=>{let t=tc(e);if(!sr.default.existsSync(t))return null;try{let r=JSON.parse(sr.default.readFileSync(t,"utf8"));return!fh(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},As=(e,t)=>{let r=tc(e),n=Q(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};sr.default.mkdirSync(Tn.default.dirname(r),{recursive:!0}),sr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},le=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var rc,nc,hh,ir,Ss=m(()=>{"use strict";rc=require("node:child_process"),nc=require("node:util"),hh=(0,nc.promisify)(rc.execFile),ir=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await hh("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var oc,vs=m(()=>{"use strict";oc="watchdog-reinstall-state.json"});var sc={};Te(sc,{verifyAgentWitchReviveAfterKickstart:()=>Sh});var Ah,Sh,ac=m(()=>{"use strict";vs();ar();Ss();x();Ah=e=>new Promise(t=>{setTimeout(t,e)}),Sh=async e=>{if(await Ah(e.verifyDelayMs??3e3),!await ir(e.launchAgentLabel))return!1;let r=e.profileEmail===null?W():W(e.profileEmail),n=Q(r);return!le(n,e.staleAfterMs)}});var lr,bs,bh,ic,_h,lc,cc,dc=m(()=>{"use strict";lr=g(require("node:fs")),bs=g(require("node:path"));vs();x();bh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ic=e=>bs.default.join(e,oc),_h=(e=_())=>{let t=ic(e);if(!lr.default.existsSync(t))return null;try{let r=JSON.parse(lr.default.readFileSync(t,"utf8"));return!bh(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},lc=(e=_(),t=Date.now())=>{let r=_h(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},cc=(e=_(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=ic(e);return lr.default.mkdirSync(bs.default.dirname(n),{recursive:!0}),lr.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var uc,At,mc,pc,gc,wh,Eh,fc,Wh,xh,hc,yc=m(()=>{"use strict";uc=require("node:child_process"),At=g(require("node:fs")),mc=g(require("node:os")),pc=g(require("node:path")),gc=require("node:util");He();ct();x();wh=(0,gc.promisify)(uc.execFile),Eh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fc=e=>{let t=be(e),r=t===null?W():W(t);if(!At.default.existsSync(r.configPath))return null;try{let n=JSON.parse(At.default.readFileSync(r.configPath,"utf8"));return!Eh(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},Wh=e=>fc(e)?.wsUrl??null,xh=e=>{let t=Wh(e);return t!==null?K(t):U(e)?.appOrigin??null},hc=async e=>{let t=e?.installDir??_(),r=fc(t),n=r!==null?K(r.wsUrl):xh(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let a=pc.default.join(mc.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{At.default.writeFileSync(a,await s.text(),{encoding:"utf8",mode:448});let i=e?.profileEmail??be(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...i===null?{}:{AGENT_WITCH_PROFILE:i}};return await wh("bash",[a],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Agent Witch reinstall script failed."}}finally{At.default.existsSync(a)&&At.default.unlinkSync(a)}}});var Ac={};Te(Ac,{attemptAgentWitchWatchdogReinstall:()=>kh});var kh,Sc=m(()=>{"use strict";dc();qt();yc();kh=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!lc())return{attempted:!1,ok:!1,targets:e};cc();let r=await hc();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await _e(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var vc,bc,_c,Lh,Rh,Ch,_s,ws=m(()=>{"use strict";jt();yt();ar();Ss();qt();Oe();x();fs();In();vc=e=>e===null?W():W(e),bc=async(e,t,r)=>{if(!await ir(e))return"not_running";let o=vc(t),s=Q(o);return le(s,r)?"stale_connection":"healthy"},_c=async e=>{let t=e?.staleAfterMs??ie,r=_(),n=D(r);return Promise.all(n.map(async o=>{let s=await bc(o.launchAgentLabel,o.profileEmail,t),a=vc(o.profileEmail),i=Q(a),c=await ir(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:i,isConnectionStale:le(i,t),needsRevive:s!=="healthy",reason:s}}))},Lh=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Rh=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",Ch=async e=>{let t=await _e(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(ac(),sc)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},_s=async e=>{if(!se())return{ok:!0,targets:[]};let t=e?.staleAfterMs??ie,r=_(),n=D(r),o=[];for(let d of n){let p=await bc(d.launchAgentLabel,d.profileEmail,t);if(p==="healthy"){o.push({launchAgentLabel:d.launchAgentLabel,profileEmail:d.profileEmail,revived:!1,reason:p});continue}o.push(await Ch({launchAgentLabel:d.launchAgentLabel,profileEmail:d.profileEmail,reason:p,staleAfterMs:t}))}if(o.length===0){let d=Cn();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:d.ok,reason:"not_running",...d.errorMessage!==void 0?{errorMessage:d.errorMessage}:{}})}let s=!1,a=!1,i,c=o;if(o.some(d=>d.reason!=="healthy"&&!d.revived))try{let{attemptAgentWitchWatchdogReinstall:d}=await Promise.resolve().then(()=>(Sc(),Ac)),p=await d(o);s=p.attempted,a=p.ok,i=p.errorMessage,c=[...p.targets]}catch(d){s=!0,a=!1,i=d instanceof Error?d.message:"Watchdog reinstall helper is unavailable."}let u={ok:c.some(d=>d.revived||d.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:a,...i!==void 0?{reinstallErrorMessage:i}:{}}:{}};return e?.skipLog!==!0&&ec({event:Rh(c,u.ok,{reinstallAttempted:s,reinstallOk:a}),ok:u.ok,message:Lh(c,{reinstallAttempted:s,reinstallOk:a,reinstallErrorMessage:i}),targets:c}),u}});var wc,Ec,Wc=m(()=>{"use strict";wc=g(require("node:os"));yt();In();ws();Ec=async()=>{let e=await _c(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:wc.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:ie,healthyProfileCount:t,profiles:e,lastLog:Pn(1)[0]??null}}});var xc={};Te(xc,{buildAgentWitchAutomationStatusFromWakeServer:()=>ks,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ns,buildAgentWitchWakeHealthResponse:()=>Ls,buildAgentWitchWakeIdentityResponse:()=>Rs,buildAgentWitchWatchdogStatus:()=>Ps,installHarnessFromWakeServer:()=>On,readAgentWitchSelfUpdateLogEntries:()=>Hn,readAgentWitchWatchdogLogEntries:()=>Mn,restartAgentWitchFromWakeServer:()=>Ts,reviveAgentWitchWebSocketFromWakeServer:()=>Is,runAgentWitchSelfUpdateFromWakeServer:()=>Os,runAgentWitchUninstallLocalFromWakeServer:()=>Ms,runAutomationFromWakeServer:()=>xs,syncAutomationsFromWakeServer:()=>Ws,wakeAgentWitchLaunchAgents:()=>Cs});var Nn,Es,On,Ws,xs,ks,Ls,Rs,Cs,Mn,Ps,Is,Ts,Ns,Hn,Os,Ms,Hs=m(()=>{"use strict";is();En();Qt();us();tr();Nn=g(require("node:os"));ms();ft();qt();Oe();Ul();Vl();Jl();fs();Wc();In();ut();Zr();Qo();ws();Es=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),On=e=>{if(!Es(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Gl(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!nr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=ql({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},Ws=e=>{if(!Es(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!nr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Sn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},xs=async e=>{if(!Es(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:nr(t)?gt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},ks=()=>{let e=ae(),t=e!==null?We(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Nn.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},Ls=()=>{let e=D();return{ok:!0,port:q(),hostname:Nn.default.hostname(),profileCount:e.length}},Rs=()=>{let e=D(),t=ae()?.pairingToken.trim()??"",r=t.length>0?rr(t):null,n=Dl();return{hostname:Nn.default.hostname(),port:q(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Cs=async()=>{let e=D(),t=[];for(let r of e){let n=await _e(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Cn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Mn=(e=20)=>Pn(e),Ps=Ec,Is=_s,Ts=_s,Ns=rs,Hn=(e=20)=>pn(e),Os=e=>ts(e),Ms=()=>Ei()});var ce=F((a0,Rc)=>{"use strict";var kc=["nodebuffer","arraybuffer","fragments"],Lc=typeof Blob<"u";Lc&&kc.push("blob");Rc.exports={BINARY_TYPES:kc,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Lc,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var cr=F((i0,Fn)=>{"use strict";var{EMPTY_BUFFER:Ph}=ce(),Fs=Buffer[Symbol.species];function Ih(e,t){if(e.length===0)return Ph;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Fs(r.buffer,r.byteOffset,n):r}function Cc(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function Pc(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function Th(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Ds(e){if(Ds.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Fs(e):ArrayBuffer.isView(e)?t=new Fs(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Ds.readOnly=!1),t}Fn.exports={concat:Ih,mask:Cc,toArrayBuffer:Th,toBuffer:Ds,unmask:Pc};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Fn.exports.mask=function(t,r,n,o,s){s<48?Cc(t,r,n,o,s):e.mask(t,r,n,o,s)},Fn.exports.unmask=function(t,r){t.length<32?Pc(t,r):e.unmask(t,r)}}catch{}});var Nc=F((l0,Tc)=>{"use strict";var Ic=Symbol("kDone"),Us=Symbol("kRun"),js=class{constructor(t){this[Ic]=()=>{this.pending--,this[Us]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Us]()}[Us](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Ic])}}};Tc.exports=js});var bt=F((c0,Fc)=>{"use strict";var dr=require("zlib"),Oc=cr(),Nh=Nc(),{kStatusCode:Mc}=ce(),Oh=Buffer[Symbol.species],Mh=Buffer.from([0,0,255,255]),Un=Symbol("permessage-deflate"),de=Symbol("total-length"),St=Symbol("callback"),Le=Symbol("buffers"),vt=Symbol("error"),Dn,Bs=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Dn){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Dn=new Nh(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[St];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Dn.add(o=>{this._decompress(t,r,(s,a)=>{o(),n(s,a)})})}compress(t,r,n){Dn.add(o=>{this._compress(t,r,(s,a)=>{o(),n(s,a)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?dr.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=dr.createInflateRaw({...this._options.zlibInflateOptions,windowBits:a}),this._inflate[Un]=this,this._inflate[de]=0,this._inflate[Le]=[],this._inflate.on("error",Fh),this._inflate.on("data",Hc)}this._inflate[St]=n,this._inflate.write(t),r&&this._inflate.write(Mh),this._inflate.flush(()=>{let s=this._inflate[vt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let a=Oc.concat(this._inflate[Le],this._inflate[de]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[de]=0,this._inflate[Le]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,a)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?dr.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=dr.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:a}),this._deflate[de]=0,this._deflate[Le]=[],this._deflate.on("data",Hh)}this._deflate[St]=n,this._deflate.write(t),this._deflate.flush(dr.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Oc.concat(this._deflate[Le],this._deflate[de]);r&&(s=new Oh(s.buffer,s.byteOffset,s.length-4)),this._deflate[St]=null,this._deflate[de]=0,this._deflate[Le]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};Fc.exports=Bs;function Hh(e){this[Le].push(e),this[de]+=e.length}function Hc(e){if(this[de]+=e.length,this[Un]._maxPayload<1||this[de]<=this[Un]._maxPayload){this[Le].push(e);return}this[vt]=new RangeError("Max payload size exceeded"),this[vt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[vt][Mc]=1009,this.removeListener("data",Hc),this.reset()}function Fh(e){if(this[Un]._inflate=null,this[vt]){this[St](this[vt]);return}e[Mc]=1007,this[St](e)}});var _t=F((d0,jn)=>{"use strict";var{isUtf8:Dc}=require("buffer"),{hasBlob:Dh}=ce(),Uh=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function jh(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function $s(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function Bh(e){return Dh&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}jn.exports={isBlob:Bh,isValidStatusCode:jh,isValidUTF8:$s,tokenChars:Uh};if(Dc)jn.exports.isValidUTF8=function(e){return e.length<24?$s(e):Dc(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");jn.exports.isValidUTF8=function(t){return t.length<32?$s(t):e(t)}}catch{}});var qs=F((u0,zc)=>{"use strict";var{Writable:$h}=require("stream"),Uc=bt(),{BINARY_TYPES:Gh,EMPTY_BUFFER:jc,kStatusCode:Vh,kWebSocket:zh}=ce(),{concat:Gs,toArrayBuffer:Kh,unmask:qh}=cr(),{isValidStatusCode:Jh,isValidUTF8:Bc}=_t(),Bn=Buffer[Symbol.species],G=0,$c=1,Gc=2,Vc=3,Vs=4,zs=5,$n=6,Ks=class extends $h{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||Gh[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[zh]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=G}_write(t,r,n){if(this._opcode===8&&this._state==G)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Bn(n.buffer,n.byteOffset+t,n.length-t),new Bn(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Bn(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case G:this.getInfo(t);break;case $c:this.getPayloadLength16(t);break;case Gc:this.getPayloadLength64(t);break;case Vc:this.getMask();break;case Vs:this.getData(t);break;case zs:case $n:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[Uc.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=$c:this._payloadLength===127?this._state=Gc:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Vc:this._state=Vs}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Vs}getData(t){let r=jc;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&qh(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=zs,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[Uc.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let a=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(a);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let a=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(a);return}this._fragments.push(s)}this.dataMessage(r),this._state===G&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=G;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=Gs(n,r):this._binaryType==="arraybuffer"?o=Kh(Gs(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=G):(this._state=$n,setImmediate(()=>{this.emit("message",o,!0),this._state=G,this.startLoop(t)}))}else{let o=Gs(n,r);if(!this._skipUTF8Validation&&!Bc(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===zs||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=G):(this._state=$n,setImmediate(()=>{this.emit("message",o,!1),this._state=G,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,jc),this.end();else{let n=t.readUInt16BE(0);if(!Jh(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Bn(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!Bc(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=G;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=G):(this._state=$n,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=G,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let a=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(a,this.createError),a.code=s,a[Vh]=o,a}};zc.exports=Ks});var Xs=F((p0,Jc)=>{"use strict";var{Duplex:m0}=require("stream"),{randomFillSync:Yh}=require("crypto"),{types:{isUint8Array:Xh}}=require("util"),Kc=bt(),{EMPTY_BUFFER:Zh,kWebSocket:Qh,NOOP:ey}=ce(),{isBlob:wt,isValidStatusCode:ty}=_t(),{mask:qc,toBuffer:je}=cr(),V=Symbol("kByteLength"),ry=Buffer.alloc(4),Gn=8*1024,Be,Et=Gn,J=0,ny=1,oy=2,Js=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=J,this.onerror=ey,this[Qh]=void 0}static frame(t,r){let n,o=!1,s=2,a=!1;r.mask&&(n=r.maskBuffer||ry,r.generateMask?r.generateMask(n):(Et===Gn&&(Be===void 0&&(Be=Buffer.alloc(Gn)),Yh(Be,0,Gn),Et=0),n[0]=Be[Et++],n[1]=Be[Et++],n[2]=Be[Et++],n[3]=Be[Et++]),a=(n[0]|n[1]|n[2]|n[3])===0,s=6);let i;typeof t=="string"?(!r.mask||a)&&r[V]!==void 0?i=r[V]:(t=Buffer.from(t),i=t.length):(i=t.length,o=r.mask&&r.readOnly&&!a);let c=i;i>=65536?(s+=8,c=127):i>125&&(s+=2,c=126);let u=Buffer.allocUnsafe(o?i+s:s);return u[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(u[0]|=64),u[1]=c,c===126?u.writeUInt16BE(i,2):c===127&&(u[2]=u[3]=0,u.writeUIntBE(i,4,6)),r.mask?(u[1]|=128,u[s-4]=n[0],u[s-3]=n[1],u[s-2]=n[2],u[s-1]=n[3],a?[u,t]:o?(qc(t,n,u,s,i),[u]):(qc(t,n,t,0,i),[u,t])):[u,t]}close(t,r,n,o){let s;if(t===void 0)s=Zh;else{if(typeof t!="number"||!ty(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let i=Buffer.byteLength(r);if(i>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+i),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(Xh(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let a={[V]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==J?this.enqueue([this.dispatch,s,!1,a,o]):this.sendFrame(e.frame(s,a),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):wt(t)?(o=t.size,s=!1):(t=je(t),o=t.length,s=je.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[V]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};wt(t)?this._state!==J?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==J?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):wt(t)?(o=t.size,s=!1):(t=je(t),o=t.length,s=je.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[V]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};wt(t)?this._state!==J?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==J?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}send(t,r,n){let o=this._extensions[Kc.extensionName],s=r.binary?2:1,a=r.compress,i,c;typeof t=="string"?(i=Buffer.byteLength(t),c=!1):wt(t)?(i=t.size,c=!1):(t=je(t),i=t.length,c=je.readOnly),this._firstFragment?(this._firstFragment=!1,a&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(a=i>=o._threshold),this._compress=a):(a=!1,s=0),r.fin&&(this._firstFragment=!0);let u={[V]:i,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:a};wt(t)?this._state!==J?this.enqueue([this.getBlobData,t,this._compress,u,n]):this.getBlobData(t,this._compress,u,n):this._state!==J?this.enqueue([this.dispatch,t,this._compress,u,n]):this.dispatch(t,this._compress,u,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[V],this._state=oy,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let i=new Error("The socket was closed while the blob was being read");process.nextTick(Ys,this,i,o);return}this._bufferedBytes-=n[V];let a=je(s);r?this.dispatch(a,r,n,o):(this._state=J,this.sendFrame(e.frame(a,n),o),this.dequeue())}).catch(s=>{process.nextTick(sy,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[Kc.extensionName];this._bufferedBytes+=n[V],this._state=ny,s.compress(t,n.fin,(a,i)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Ys(this,c,o);return}this._bufferedBytes-=n[V],this._state=J,n.readOnly=!1,this.sendFrame(e.frame(i,n),o),this.dequeue()})}dequeue(){for(;this._state===J&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][V],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][V],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Jc.exports=Js;function Ys(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function sy(e,t,r){Ys(e,t,r),e.onerror(t)}});var od=F((g0,nd)=>{"use strict";var{kForOnEventAttribute:ur,kListener:Zs}=ce(),Yc=Symbol("kCode"),Xc=Symbol("kData"),Zc=Symbol("kError"),Qc=Symbol("kMessage"),ed=Symbol("kReason"),Wt=Symbol("kTarget"),td=Symbol("kType"),rd=Symbol("kWasClean"),ue=class{constructor(t){this[Wt]=null,this[td]=t}get target(){return this[Wt]}get type(){return this[td]}};Object.defineProperty(ue.prototype,"target",{enumerable:!0});Object.defineProperty(ue.prototype,"type",{enumerable:!0});var $e=class extends ue{constructor(t,r={}){super(t),this[Yc]=r.code===void 0?0:r.code,this[ed]=r.reason===void 0?"":r.reason,this[rd]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Yc]}get reason(){return this[ed]}get wasClean(){return this[rd]}};Object.defineProperty($e.prototype,"code",{enumerable:!0});Object.defineProperty($e.prototype,"reason",{enumerable:!0});Object.defineProperty($e.prototype,"wasClean",{enumerable:!0});var xt=class extends ue{constructor(t,r={}){super(t),this[Zc]=r.error===void 0?null:r.error,this[Qc]=r.message===void 0?"":r.message}get error(){return this[Zc]}get message(){return this[Qc]}};Object.defineProperty(xt.prototype,"error",{enumerable:!0});Object.defineProperty(xt.prototype,"message",{enumerable:!0});var mr=class extends ue{constructor(t,r={}){super(t),this[Xc]=r.data===void 0?null:r.data}get data(){return this[Xc]}};Object.defineProperty(mr.prototype,"data",{enumerable:!0});var ay={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[ur]&&o[Zs]===t&&!o[ur])return;let n;if(e==="message")n=function(s,a){let i=new mr("message",{data:a?s:s.toString()});i[Wt]=this,Vn(t,this,i)};else if(e==="close")n=function(s,a){let i=new $e("close",{code:s,reason:a.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});i[Wt]=this,Vn(t,this,i)};else if(e==="error")n=function(s){let a=new xt("error",{error:s,message:s.message});a[Wt]=this,Vn(t,this,a)};else if(e==="open")n=function(){let s=new ue("open");s[Wt]=this,Vn(t,this,s)};else return;n[ur]=!!r[ur],n[Zs]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Zs]===t&&!r[ur]){this.removeListener(e,r);break}}};nd.exports={CloseEvent:$e,ErrorEvent:xt,Event:ue,EventTarget:ay,MessageEvent:mr};function Vn(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var zn=F((f0,sd)=>{"use strict";var{tokenChars:pr}=_t();function ee(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function iy(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,a,i,c=-1,u=-1,d=-1,p=0;for(;p<e.length;p++)if(u=e.charCodeAt(p),a===void 0)if(d===-1&&pr[u]===1)c===-1&&(c=p);else if(p!==0&&(u===32||u===9))d===-1&&c!==-1&&(d=p);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${p}`);d===-1&&(d=p);let S=e.slice(c,d);u===44?(ee(t,S,r),r=Object.create(null)):a=S,c=d=-1}else throw new SyntaxError(`Unexpected character at index ${p}`);else if(i===void 0)if(d===-1&&pr[u]===1)c===-1&&(c=p);else if(u===32||u===9)d===-1&&c!==-1&&(d=p);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${p}`);d===-1&&(d=p),ee(r,e.slice(c,d),!0),u===44&&(ee(t,a,r),r=Object.create(null),a=void 0),c=d=-1}else if(u===61&&c!==-1&&d===-1)i=e.slice(c,p),c=d=-1;else throw new SyntaxError(`Unexpected character at index ${p}`);else if(o){if(pr[u]!==1)throw new SyntaxError(`Unexpected character at index ${p}`);c===-1?c=p:n||(n=!0),o=!1}else if(s)if(pr[u]===1)c===-1&&(c=p);else if(u===34&&c!==-1)s=!1,d=p;else if(u===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${p}`);else if(u===34&&e.charCodeAt(p-1)===61)s=!0;else if(d===-1&&pr[u]===1)c===-1&&(c=p);else if(c!==-1&&(u===32||u===9))d===-1&&(d=p);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${p}`);d===-1&&(d=p);let S=e.slice(c,d);n&&(S=S.replace(/\\/g,""),n=!1),ee(r,i,S),u===44&&(ee(t,a,r),r=Object.create(null),a=void 0),i=void 0,c=d=-1}else throw new SyntaxError(`Unexpected character at index ${p}`);if(c===-1||s||u===32||u===9)throw new SyntaxError("Unexpected end of input");d===-1&&(d=p);let h=e.slice(c,d);return a===void 0?ee(t,h,r):(i===void 0?ee(r,h,!0):n?ee(r,i,h.replace(/\\/g,"")):ee(r,i,h),ee(t,a,r)),t}function ly(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(a=>a===!0?o:`${o}=${a}`).join("; ")})).join("; ")).join(", ")}).join(", ")}sd.exports={format:ly,parse:iy}});var Yn=F((A0,yd)=>{"use strict";var cy=require("events"),dy=require("https"),uy=require("http"),ld=require("net"),my=require("tls"),{randomBytes:py,createHash:gy}=require("crypto"),{Duplex:h0,Readable:y0}=require("stream"),{URL:Qs}=require("url"),Re=bt(),fy=qs(),hy=Xs(),{isBlob:yy}=_t(),{BINARY_TYPES:ad,CLOSE_TIMEOUT:Ay,EMPTY_BUFFER:Kn,GUID:Sy,kForOnEventAttribute:ea,kListener:vy,kStatusCode:by,kWebSocket:I,NOOP:cd}=ce(),{EventTarget:{addEventListener:_y,removeEventListener:wy}}=od(),{format:Ey,parse:Wy}=zn(),{toBuffer:xy}=cr(),dd=Symbol("kAborted"),ta=[8,13],me=["CONNECTING","OPEN","CLOSING","CLOSED"],ky=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,k=class e extends cy{constructor(t,r,n){super(),this._binaryType=ad[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Kn,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),ud(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){ad.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new fy({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new hy(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[I]=this,s[I]=this,t[I]=this,o.on("conclude",Cy),o.on("drain",Py),o.on("error",Iy),o.on("message",Ty),o.on("ping",Ny),o.on("pong",Oy),s.onerror=My,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",gd),t.on("data",Jn),t.on("end",fd),t.on("error",hd),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Re.extensionName]&&this._extensions[Re.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){j(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),pd(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){ra(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Kn,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){ra(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Kn,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){ra(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Re.extensionName]||(o.compress=!1),this._sender.send(t||Kn,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){j(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(k,"CONNECTING",{enumerable:!0,value:me.indexOf("CONNECTING")});Object.defineProperty(k.prototype,"CONNECTING",{enumerable:!0,value:me.indexOf("CONNECTING")});Object.defineProperty(k,"OPEN",{enumerable:!0,value:me.indexOf("OPEN")});Object.defineProperty(k.prototype,"OPEN",{enumerable:!0,value:me.indexOf("OPEN")});Object.defineProperty(k,"CLOSING",{enumerable:!0,value:me.indexOf("CLOSING")});Object.defineProperty(k.prototype,"CLOSING",{enumerable:!0,value:me.indexOf("CLOSING")});Object.defineProperty(k,"CLOSED",{enumerable:!0,value:me.indexOf("CLOSED")});Object.defineProperty(k.prototype,"CLOSED",{enumerable:!0,value:me.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(k.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(k.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[ea])return t[vy];return null},set(t){for(let r of this.listeners(e))if(r[ea]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[ea]:!0})}})});k.prototype.addEventListener=_y;k.prototype.removeEventListener=wy;yd.exports=k;function ud(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Ay,protocolVersion:ta[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!ta.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${ta.join(", ")})`);let s;if(t instanceof Qs)s=t;else try{s=new Qs(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let a=s.protocol==="wss:",i=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!a&&!i?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:i&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;qn(e,l);return}let u=a?443:80,d=py(16).toString("base64"),p=a?dy.request:uy.request,h=new Set,S;if(o.createConnection=o.createConnection||(a?Ry:Ly),o.defaultPort=o.defaultPort||u,o.port=s.port||u,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":d,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(S=new Re({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=Ey({[Re.extensionName]:S.offer()})),r.length){for(let l of r){if(typeof l!="string"||!ky.test(l)||h.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");h.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),i){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=i,e._originalSecure=a,e._originalHostOrSocketPath=i?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[A,b]of Object.entries(l))n.headers[A.toLowerCase()]=b}else if(e.listenerCount("redirect")===0){let l=i?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!a)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=p(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=p(o);o.timeout&&y.on("timeout",()=>{j(e,y,"Opening handshake has timed out")}),y.on("error",l=>{y===null||y[dd]||(y=e._req=null,qn(e,l))}),y.on("response",l=>{let A=l.headers.location,b=l.statusCode;if(A&&o.followRedirects&&b>=300&&b<400){if(++e._redirects>o.maxRedirects){j(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new Qs(A,t)}catch{let w=new SyntaxError(`Invalid URL: ${A}`);qn(e,w);return}ud(e,f,r,n)}else e.emit("unexpected-response",y,l)||j(e,y,`Unexpected server response: ${l.statusCode}`)}),y.on("upgrade",(l,A,b)=>{if(e.emit("upgrade",l),e.readyState!==k.CONNECTING)return;y=e._req=null;let f=l.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){j(e,A,"Invalid Upgrade header");return}let v=gy("sha1").update(d+Sy).digest("base64");if(l.headers["sec-websocket-accept"]!==v){j(e,A,"Invalid Sec-WebSocket-Accept header");return}let w=l.headers["sec-websocket-protocol"],C;if(w!==void 0?h.size?h.has(w)||(C="Server sent an invalid subprotocol"):C="Server sent a subprotocol but none was requested":h.size&&(C="Server sent no subprotocol"),C){j(e,A,C);return}w&&(e._protocol=w);let $=l.headers["sec-websocket-extensions"];if($!==void 0){if(!S){j(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let Se;try{Se=Wy($)}catch{j(e,A,"Invalid Sec-WebSocket-Extensions header");return}let et=Object.keys(Se);if(et.length!==1||et[0]!==Re.extensionName){j(e,A,"Server indicated an extension that was not requested");return}try{S.accept(Se[Re.extensionName])}catch{j(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Re.extensionName]=S}e.setSocket(A,b,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function qn(e,t){e._readyState=k.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Ly(e){return e.path=e.socketPath,ld.connect(e)}function Ry(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=ld.isIP(e.host)?"":e.host),my.connect(e)}function j(e,t,r){e._readyState=k.CLOSING;let n=new Error(r);Error.captureStackTrace(n,j),t.setHeader?(t[dd]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(qn,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function ra(e,t,r){if(t){let n=yy(t)?t.size:xy(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${me[e.readyState]})`);process.nextTick(r,n)}}function Cy(e,t){let r=this[I];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[I]!==void 0&&(r._socket.removeListener("data",Jn),process.nextTick(md,r._socket),e===1005?r.close():r.close(e,t))}function Py(){let e=this[I];e.isPaused||e._socket.resume()}function Iy(e){let t=this[I];t._socket[I]!==void 0&&(t._socket.removeListener("data",Jn),process.nextTick(md,t._socket),t.close(e[by])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function id(){this[I].emitClose()}function Ty(e,t){this[I].emit("message",e,t)}function Ny(e){let t=this[I];t._autoPong&&t.pong(e,!this._isServer,cd),t.emit("ping",e)}function Oy(e){this[I].emit("pong",e)}function md(e){e.resume()}function My(e){let t=this[I];t.readyState!==k.CLOSED&&(t.readyState===k.OPEN&&(t._readyState=k.CLOSING,pd(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function pd(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function gd(){let e=this[I];if(this.removeListener("close",gd),this.removeListener("data",Jn),this.removeListener("end",fd),e._readyState=k.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[I]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",id),e._receiver.on("finish",id))}function Jn(e){this[I]._receiver.write(e)||this.pause()}function fd(){let e=this[I];e._readyState=k.CLOSING,e._receiver.end(),this.end()}function hd(){let e=this[I];this.removeListener("error",hd),this.on("error",cd),e&&(e._readyState=k.CLOSING,this.destroy())}});var bd=F((v0,vd)=>{"use strict";var S0=Yn(),{Duplex:Hy}=require("stream");function Ad(e){e.emit("close")}function Fy(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Sd(e){this.removeListener("error",Sd),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function Dy(e,t){let r=!0,n=new Hy({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,a){let i=!a&&n._readableState.objectMode?s.toString():s;n.push(i)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(Ad,n);return}let a=!1;e.once("error",function(c){a=!0,s(c)}),e.once("close",function(){a||s(o),process.nextTick(Ad,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,a){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,a)});return}e.send(o,a)},n.on("end",Fy),n.on("error",Sd),n}vd.exports=Dy});var na=F((b0,_d)=>{"use strict";var{tokenChars:Uy}=_t();function jy(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let a=e.charCodeAt(o);if(n===-1&&Uy[a]===1)r===-1&&(r=o);else if(o!==0&&(a===32||a===9))n===-1&&r!==-1&&(n=o);else if(a===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let i=e.slice(r,n);if(t.has(i))throw new SyntaxError(`The "${i}" subprotocol is duplicated`);t.add(i),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}_d.exports={parse:jy}});var Rd=F((w0,Ld)=>{"use strict";var By=require("events"),Xn=require("http"),{Duplex:_0}=require("stream"),{createHash:$y}=require("crypto"),wd=zn(),Ge=bt(),Gy=na(),Vy=Yn(),{CLOSE_TIMEOUT:zy,GUID:Ky,kWebSocket:qy}=ce(),Jy=/^[+/0-9A-Za-z]{22}==$/,Ed=0,Wd=1,kd=2,oa=class extends By{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:zy,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:Vy,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Xn.createServer((n,o)=>{let s=Xn.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=Yy(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,a)=>{this.handleUpgrade(o,s,a,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=Ed}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===kd){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(gr,this);return}if(t&&this.once("close",t),this._state!==Wd)if(this._state=Wd,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(gr,this):process.nextTick(gr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{gr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",xd);let s=t.headers["sec-websocket-key"],a=t.headers.upgrade,i=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Ve(this,t,r,405,"Invalid HTTP method");return}if(a===void 0||a.toLowerCase()!=="websocket"){Ve(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Jy.test(s)){Ve(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(i!==13&&i!==8){Ve(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){fr(r,400);return}let c=t.headers["sec-websocket-protocol"],u=new Set;if(c!==void 0)try{u=Gy.parse(c)}catch{Ve(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let d=t.headers["sec-websocket-extensions"],p={};if(this.options.perMessageDeflate&&d!==void 0){let h=new Ge({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let S=wd.parse(d);S[Ge.extensionName]&&(h.accept(S[Ge.extensionName]),p[Ge.extensionName]=h)}catch{Ve(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let h={origin:t.headers[`${i===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(h,(S,y,l,A)=>{if(!S)return fr(r,y||401,l,A);this.completeUpgrade(p,s,u,t,r,n,o)});return}if(!this.options.verifyClient(h))return fr(r,401)}this.completeUpgrade(p,s,u,t,r,n,o)}completeUpgrade(t,r,n,o,s,a,i){if(!s.readable||!s.writable)return s.destroy();if(s[qy])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>Ed)return fr(s,503);let u=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${$y("sha1").update(r+Ky).digest("base64")}`],d=new this.options.WebSocket(null,void 0,this.options);if(n.size){let p=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;p&&(u.push(`Sec-WebSocket-Protocol: ${p}`),d._protocol=p)}if(t[Ge.extensionName]){let p=t[Ge.extensionName].params,h=wd.format({[Ge.extensionName]:[p]});u.push(`Sec-WebSocket-Extensions: ${h}`),d._extensions=t}this.emit("headers",u,o),s.write(u.concat(`\r
`).join(`\r
`)),s.removeListener("error",xd),d.setSocket(s,a,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(d),d.on("close",()=>{this.clients.delete(d),this._shouldEmitClose&&!this.clients.size&&process.nextTick(gr,this)})),i(d,o)}};Ld.exports=oa;function Yy(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function gr(e){e._state=kd,e.emit("close")}function xd(){this.destroy()}function fr(e,t,r,n){r=r||Xn.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Xn.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Ve(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let a=new Error(o);Error.captureStackTrace(a,Ve),e.emit("wsClientError",a,r,t)}else fr(r,n,o,s)}});var Xy,Zy,Qy,eA,tA,rA,Cd,nA,hr,Pd=m(()=>{Xy=g(bd(),1),Zy=g(zn(),1),Qy=g(bt(),1),eA=g(qs(),1),tA=g(Xs(),1),rA=g(na(),1),Cd=g(Yn(),1),nA=g(Rd(),1),hr=Cd.default});var sa=m(()=>{"use strict"});var pe,yr=m(()=>{"use strict";pe=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var kt,ze,Id,sA,aa,ia,Td,Nd,Od,Md,la,ca=m(()=>{"use strict";kt=g(require("node:fs")),ze=g(require("node:os")),Id=g(require("node:path"));sa();yr();sA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aa=(e=ze.default.hostname())=>Id.default.join(ze.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),ia=e=>{if(!kt.default.existsSync(e))return null;try{let t=JSON.parse(kt.default.readFileSync(e,"utf8"));return!sA(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},Td=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},Nd=(e,t)=>{kt.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Od=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??aa(),n=ia(r);if(n!==null&&n.pid!==process.pid&&pe(n.pid)&&Td(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:ze.default.hostname(),macOsUsername:ze.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return Nd(r,o),{ok:!0}},Md=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??aa(),n=ia(r);return n!==null&&n.pid!==process.pid&&pe(n.pid)&&Td(n)?{ok:!1}:(Nd(r,{hostname:ze.default.hostname(),macOsUsername:ze.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},la=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??aa();ia(r)?.pid===process.pid&&kt.default.existsSync(r)&&kt.default.unlinkSync(r)}});var da,Ar,aA,iA,lA,cA,Hd,Fd=m(()=>{"use strict";da=require("node:child_process"),Ar=g(require("node:path"));yr();rt();aA=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),iA=(e,t)=>{if(aA(e)||!/\bnode\b/.test(e))return!1;let r=Ar.default.resolve(t),n=Ar.default.join(r,"app",re),o=Ar.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(a=>a.length>0).some(a=>{if(a===re||a==="agent-witch.ts")return e.includes(r);try{let i=Ar.default.resolve(a);return i===n||i===o}catch{return a===n||a===o}})},lA=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,da.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},cA=(e,t,r)=>{let n=lA(r),o=[];for(let s of e.split(`
`)){let a=s.trim();if(a.length===0)continue;let i=/^(\d+)\s+(.+)$/.exec(a);if(i===null)continue;let c=Number.parseInt(i[1]??"",10),u=i[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||iA(u,t)&&o.push(c)}return o},Hd=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,da.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=cA(r,e.installDir,t),o=[];for(let s of n)if(pe(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var Sr,vr,Dd,dA,Ud,jd=m(()=>{"use strict";Sr=g(require("node:fs")),vr=g(require("node:path"));x();Dd=(e,t)=>{!Sr.default.existsSync(e)||Sr.default.existsSync(t)||(Sr.default.mkdirSync(vr.default.dirname(t),{recursive:!0}),Sr.default.renameSync(e,t))},dA=e=>{if(e.profileEmail===null)return;let t=vr.default.join(e.installDir,ne);Dd(vr.default.join(t,Kr),e.mainLogPath),Dd(vr.default.join(t,qr),e.errorLogPath)},Ud=e=>{let t=W();e!==void 0&&t.installDir!==e||dA(t)}});var Bd,$d,Gd,Vd,zd=m(()=>{"use strict";Bd=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),$d=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?Bd(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?Bd(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Gd=e=>{let t=e.watchdogLogs.map($d).join(""),r=e.updateLogs.map($d).join("");return`<!doctype html>
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
</html>`},Vd=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Kd,qd,Jd=m(()=>{"use strict";Kd=g(require("node:net")),qd=()=>new Promise((e,t)=>{let r=Kd.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var Yd,uA,Xd,Zd=m(()=>{"use strict";Yd=g(require("node:net"));Jd();ft();kn();x();uA=e=>new Promise(t=>{let r=Yd.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Xd=async()=>{let e=_(),t=q();if(await uA(t))return Hl(t),t;let r=await qd();return xn(e,r),r}});var mA,Qd,eu=m(()=>{"use strict";mA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qd=e=>({force:mA(e)&&e.force===!0})});var ua,pA,Zn,ma=m(()=>{"use strict";ua=g(require("node:os")),pA=e=>{let t=e.trim();return t.startsWith("~/")?`${ua.default.homedir()}${t.slice(1)}`:t==="~"?ua.default.homedir():t},Zn=pA});var Ke,Lt,Qn=m(()=>{"use strict";Ke=g(require("node:path"));it();ma();Lt=e=>{let t=Zn(e),r=Ke.default.join(t,Ci);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Ke.default.join(r,"rag"),memoryDirPath:Ke.default.join(r,Pi),reportsDirPath:Ke.default.join(r,Ti),metaFilePath:Ke.default.join(r,Ii),ragChunksFilePath:Ke.default.join(r,"rag",rn)}}});var te,ru,gA,fA,qe,eo=m(()=>{"use strict";te=g(require("node:fs")),ru=g(require("node:path"));it();Qn();gA=(e,t)=>{if(te.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};te.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},fA=e=>{te.default.existsSync(e.ragChunksFilePath)||te.default.writeFileSync(e.ragChunksFilePath,"");let t=ru.default.join(e.memoryDirPath,nn);te.default.existsSync(t)||te.default.writeFileSync(t,"")},qe=e=>{let t=Lt(e.projectFolderPath);return te.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),te.default.mkdirSync(t.ragDirPath,{recursive:!0}),te.default.mkdirSync(t.memoryDirPath,{recursive:!0}),gA(t,e),fA(t),{ok:!0,layout:t}}});var hA,nu,ou=m(()=>{"use strict";eo();hA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nu=e=>{if(!hA(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:qe({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var au,SA,su,R,yA,AA,pa,iu=m(()=>{"use strict";au=g(require("node:http"));Hs();ms();zd();Zd();eu();tn();ou();dn();tt();SA={},su=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},R=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},yA=e=>{e.writeHead(403),e.end()},AA=async(e,t,r)=>{let n=e.headers.origin,o=Tl(n);try{if(n!==void 0&&n.length>0&&!o.allowed){yA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){R(t,200,Ls(),o.headers);return}if(e.method==="GET"&&s==="/identity"){R(t,200,Rs(),o.headers);return}if(e.method==="GET"&&s==="/local"){let a=Mn(50),i=Hn(50);t.writeHead(200,Vd()),t.end(Gd({port:r,watchdogLogs:a,updateLogs:i}));return}if(e.method==="GET"&&s==="/watchdog/status"){let a=await Ps();R(t,200,a,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let a=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;R(t,200,{ok:!0,logs:Mn(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let a=await Is();R(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/restart"){let a=await Ts();R(t,a.ok?200:503,a,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let a=Ns();R(t,200,{ok:!0,...a},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let a=new URL(e.url??"/update/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;R(t,200,{ok:!0,logs:Hn(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let a=await su(e),{force:i}=Qd(a),c=await Os({force:i});R(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let a=await Ms();R(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/wake"){let a=await Cs();R(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let a=[];for await(let u of e)a.push(Buffer.from(u));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{R(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=On(i);R(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let a=await su(e),i=nu(a);R(t,i.ok?200:400,i,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let a=[];for await(let u of e)a.push(Buffer.from(u));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{R(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=On(i);R(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){R(t,200,ks(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let a=[];for await(let u of e)a.push(Buffer.from(u));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{R(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Ws(i);R(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let a=[];for await(let u of e)a.push(Buffer.from(u));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{R(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await xs(i);R(t,c.ok?200:503,c,o.headers);return}R(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{R(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},pa=async()=>{let e=await Xd(),t=au.default.createServer((r,n)=>{AA(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!X()&&lt(SA.url)&&(async()=>{at("agent-witch-wake-server");let e=await pa(),t=en(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var ga,lu=m(()=>{"use strict";Qt();En();tr();ga=async()=>{let e=ae();if(e===null)return;let t=We(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await gt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var cu,du=m(()=>{"use strict";sa();iu();ca();lu();cu=async(e={})=>{let t=await pa();ga();let r=setInterval(()=>{ga()},6e4),n=setInterval(()=>{if(!Md().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var br,to,_A,uu,mu,ro,pu,gu,fa,fu,no,hu=m(()=>{"use strict";br=g(require("node:fs")),to=g(require("node:path")),_A="pending-run-inputs.json",uu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mu=e=>{let t=e.profileEmail?to.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return to.default.join(t,_A)},ro=e=>{let t=mu(e);if(!br.default.existsSync(t))return{};try{let r=JSON.parse(br.default.readFileSync(t,"utf8"));return uu(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!uu(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",a=typeof o.partialOutput=="string"?o.partialOutput:"",i=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:a;return s.length===0||i.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:a,question:i,accumulatedOutput:c}]]})):{}}catch{return{}}},pu=(e,t)=>{let r=mu(e);br.default.mkdirSync(to.default.dirname(r),{recursive:!0}),br.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},gu=e=>Object.values(ro(e)),fa=(e,t)=>ro(e)[t]!==void 0,fu=(e,t)=>{let r=ro(e);r[t.agentRunId]=t,pu(e,r)},no=(e,t)=>{let r=ro(e);delete r[t],pu(e,r)}});var ha,yu=m(()=>{"use strict";ha={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var ya,Sw,Au=m(()=>{"use strict";ya={OPEN:"open",APPROVAL:"approval"},Sw=ya.APPROVAL});var Rt,oo,Su,wA,vu,bu,_u,so,wu,Aa=m(()=>{"use strict";Rt=g(require("node:fs")),oo=g(require("node:path")),Su="runs",wA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vu=e=>{let t=e.profileEmail!==null?oo.default.join(e.installDir,"profiles",e.profileEmail,Su):oo.default.join(e.installDir,Su);return Rt.default.mkdirSync(t,{recursive:!0}),t},bu=(e,t)=>oo.default.join(vu(e),`${t}.json`),_u=(e,t)=>{Rt.default.writeFileSync(bu(e,t.id),JSON.stringify(t,null,2))},so=(e,t)=>{let r=bu(e,t);if(!Rt.default.existsSync(r))return null;try{let n=JSON.parse(Rt.default.readFileSync(r,"utf8"));return!wA(n)||typeof n.id!="string"?null:n}catch{return null}},wu=e=>{let t=vu(e),r=Rt.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),a=so(e,s);a!==null&&n.push(a)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var EA,Eu,Wu=m(()=>{"use strict";yu();Au();Aa();EA=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?ha.COMPLETED:ha.FAILED,dispatchPolicy:ya.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},Eu=(e,t)=>{let r=EA(t);return _u(e,r),r}});var _r,ao,WA,Sa,xu,ku,Lu,va,Ru=m(()=>{"use strict";_r=g(require("node:fs")),ao=g(require("node:path"));bn();WA="run-completion-outbox.json",Sa=e=>{let t=e.profileEmail?ao.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return ao.default.join(t,WA)},xu=e=>{let t=Sa(e);if(!_r.default.existsSync(t))return[];try{let r=JSON.parse(_r.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},ku=(e,t)=>{_r.default.mkdirSync(ao.default.dirname(Sa(e)),{recursive:!0}),_r.default.writeFileSync(Sa(e),JSON.stringify(t,null,2),"utf8")},Lu=(e,t)=>{let r=[...xu(e).filter(n=>n.runId!==t.runId),t];ku(e,r)},va=async e=>{if(e.cloudApi===null)return;let t=xu(e.layout);if(t.length===0)return;let r=[];for(let n of t)await xl(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);ku(e.layout,r)}});var Cu=m(()=>{"use strict"});var ba,wr,kA,Ct,Pu=m(()=>{"use strict";Cu();ba=new Map,wr=e=>{let t=ba.get(e);t!==void 0&&(clearInterval(t),ba.delete(e))},kA=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Ct=(e,t,r,n={})=>{wr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){wr(t);return}let a=n.onTick?.()??{};kA(e,t,o,a)};s(),ba.set(t,setInterval(s,15e3))}});var _a,Er,Pt,Iu,Je,Tu,io=m(()=>{"use strict";_a=new Set,Er=new Map,Pt=(e,t)=>{if(t.length===0)return;let r=Er.get(e)??[];r.push(t),Er.set(e,r)},Iu=e=>{_a.add(e);let t=Er.get(e)??[];return Er.delete(e),t},Je=e=>_a.has(e),Tu=e=>{_a.delete(e),Er.delete(e)}});var Nu,Ou,Mu,Hu,H,It,Fu,Du,Wr,Uu,ju,wa,Bu,$u,Gu,lo=m(()=>{"use strict";Nu=require("node:crypto"),Ou=g(require("node:fs")),Mu=g(require("node:path")),Hu=require("node:url");yr();tt();Ho();H=new Map,Fu=async()=>{if(It!==void 0)return It;try{if(X()){let e=zr(),t=Mu.default.join(e,"deps","node-pty","lib","index.js");if(Ou.default.existsSync(t)){let r=await import((0,Hu.pathToFileURL)(t).href);return It=r,r}}return It=await import("node-pty"),It}catch{return It=null,null}},Du=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},Wr=(e,t,r)=>{let n=H.get(e);if(n!==void 0){H.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Uu=(e,t)=>{let r=H.get(e);return r===void 0?!1:(r.pty.write(t),!0)},ju=(e,t,r)=>{let n=H.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},wa=e=>{for(let t of H.values())if(!(t.mode!=="agent"||t.runId!==e))return pe(t.pty.pid);return!1},Bu=e=>{for(let[t,r]of H.entries())if(!(r.mode!=="agent"||r.runId!==e)){H.delete(t);try{r.pty.kill()}catch{}return!0}return!1},$u=async e=>{let t=await Fu();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;H.get(e.shellSessionId)!==void 0&&Wr(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let a=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${a}).\r
`},requestId:e.requestId}),!1}return H.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{Du(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{H.get(e.shellSessionId)?.pty===o&&(H.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Gu=async e=>{let t=e.shellSessionId??(0,Nu.randomUUID)(),r=await Fu();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return H.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{Du(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{H.get(t)?.pty===n&&(H.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var co,Vu,zu=m(()=>{"use strict";co="[[AWAITING_INPUT]]",Vu=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",co,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var xr,Ku,uo=m(()=>{"use strict";zu();xr=e=>{let t=e.indexOf(co);if(t<0)return null;let n=e.slice(t+co.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},Ku=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Vu].join(`
`)});var qu,Ju=m(()=>{"use strict";io();lo();uo();qu=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Je(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Pt(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Gu({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let a=xr(t.join(""));a!==null&&(r=!0,e.onInputRequired(a))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var Yu,Xu,Zu,Ce,mo=m(()=>{"use strict";Yu=require("node:child_process"),Xu=g(require("node:fs")),Zu=g(require("node:path"));rt();Ce=(e,t)=>{let r=Zu.default.join(e,"app",li,"ensure-writer.sh");return Xu.default.existsSync(r)?new Promise((n,o)=>{let s=(0,Yu.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",a=>{o(a)}),s.on("close",a=>{if(a===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(a??-1)}`))})}):Promise.resolve()}});var Qu,Ye,po,em,tm,Ea,rm,Wa,nm,om,LA,go,RA,CA,sm,xa=m(()=>{"use strict";Qu=require("node:child_process");pt();mo();Ye=new Map,po=e=>e==="cursor"||e==="antigravity",em=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",tm=e=>Ye.get(e)?.warmed===!0,Ea=e=>{let t=Ye.get(e);Ye.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},rm=e=>Ye.get(e)?.conversationStarted===!0,Wa=e=>{let t=Ye.get(e);Ye.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},nm=e=>{Ye.delete(e)},om=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",LA={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},go=e=>`${LA[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,RA=(e,t,r,n)=>new Promise(o=>{let s=Ll(t,r),a=[],i=(0,Qu.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=u=>{let d=u.toString("utf8");a.push(d),n?.(d)};i.stdout?.on("data",c),i.stderr?.on("data",c),i.on("close",u=>{o({exitCode:u??-1,output:a.join("").trim()})}),i.on("error",u=>{o({exitCode:-1,output:u.message})})}),CA=(e,t)=>{let r=go(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},sm=async e=>{if(!M(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Ce(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}po(e.writerAgent)&&Ea(e.writerAgent);let t=await RA(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?CA(e.writerAgent,t.output):go(e.writerAgent)}}});var am,kr,O,ka,im,lm,La,cm,dm,um,PA,ge,fo,Tt,mm,IA,Ra,pm,gm,fm,hm=m(()=>{"use strict";am=require("node:child_process");pt();hu();Wu();Ru();Pu();yr();io();lo();uo();Ju();xa();Gt();uo();kr=new Map,O=new Map,ka=new Set,im=130,lm=`

Stopped by user.`,La=null,cm=e=>{La=e},dm=async e=>{await va({layout:e,cloudApi:La})},um=e=>{let t=kr.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:pe(t.pid)},PA=e=>xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),ge=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},fo=(e,t,r,n,o,s,a=!1)=>({awaitingInput:a,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let i=an(s),c=O.get(r);if(i!==null&&c!==void 0){let u=Gi(i),d=um(r)||wa(r);u!==null&&!d&&Tt(e,t,r,n,u.exitCode,u.output,c.originalPrompt)}return $i(i)}}),Tt=(e,t,r,n,o,s,a)=>{let i=o,c=s;r!==void 0&&ka.has(r)&&(ka.delete(r),i=im,c=c.trim().length>0&&!c.includes("Stopped by user.")?`${c.trim()}${lm}`:"Stopped by user."),r!==void 0&&(wr(r),Je(r)&&(ge(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),Tu(r)),Eu(e.layout,{agentRunId:r,originalPrompt:a,exitCode:i,output:c,layout:e.layout}),Lu(e.layout,{runId:r,exitCode:i,output:c,createdAt:new Date().toISOString()}),va({layout:e.layout,cloudApi:La}),O.delete(r),kr.delete(r),no(e.layout,r)),ge(t,{type:"command.claude.result",payload:{exitCode:i,output:c,...r!==void 0?{agentRunId:r}:{}},requestId:n})},mm=(e,t,r,n,o,s,a)=>{let i=O.get(r),c=i?.accumulatedOutput??s;fu(e.layout,{agentRunId:r,originalPrompt:a,partialOutput:s,question:o,accumulatedOutput:c}),Ct(t,r,()=>fa(e.layout,r),fo(e,t,r,n,i?.projectFolderPath,i?.reportKey,!0)),ge(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},IA=(e,t,r,n,o,s,a)=>{let i=[],c=!1,u=d=>{if(!(o===void 0||d.length===0)){if(Je(o)){ge(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:d},requestId:n});return}Pt(o,d)}};if(o!==void 0){let d=O.get(o);kr.set(o,t),O.set(o,{originalPrompt:s,writerAgent:a,projectFolderPath:d?.projectFolderPath,reportKey:d?.reportKey,accumulatedOutput:d?.accumulatedOutput??""}),ge(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Ct(r,o,()=>um(o),fo(e,r,o,n,d?.projectFolderPath,d?.reportKey))}t.stdout?.on("data",d=>{let p=d.toString("utf8");if(i.push(p),u(p),c||o===void 0)return;let h=xr(i.join(""));if(h!==null){c=!0,t.kill("SIGTERM");let S=O.get(o),y=[S?.accumulatedOutput??"",h.partialOutput].filter(l=>l.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=y),kr.delete(o),mm(e,r,o,n,h.question,y,s)}}),t.stderr?.on("data",d=>{let p=d.toString("utf8");i.push(p),u(p)}),t.on("close",d=>{if(c)return;Wa(a);let p=o!==void 0?O.get(o):void 0,h=i.join("").trim(),S=p!==void 0&&p.accumulatedOutput.length>0?`${p.accumulatedOutput}

${h}`.trim():h;Tt(e,r,o,n,d??-1,S,s)}),t.on("error",d=>{c||Tt(e,r,o,n,-1,d.message,s)})},Ra=(e,t,r,n,o,s,a,i,c,u)=>{let d=mt(t,r,PA(e),a);if(d===null){Tt(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let p=()=>{let h=(0,am.spawn)(d.command,[...d.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});IA(e,h,o,n,s,r,t)};if(s===void 0){p();return}O.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:u,accumulatedOutput:O.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&u!==void 0&&u.trim().length>0&&ln({reportKey:u,agentRunId:s,userSummary:"Task started on your Mac."}),Ct(o,s,()=>O.has(s),fo(e,o,s,n,c,u)),qu({socket:o,sendMessage:ge,requestId:n,agentRunId:s,shellSessionId:i,command:d.command,args:d.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:h=>{i!==void 0&&Wr(i,l=>{ge(o,l)},n);let S=O.get(s),y=[S?.accumulatedOutput??"",h.partialOutput].filter(l=>l.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=y),mm(e,o,s,n,h.question,y,r)},onFinished:(h,S)=>{Wa(t);let y=O.get(s),l=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${S}`.trim():S;Tt(e,o,s,n,h,l,r)}}).then(h=>{if(!h){p();return}Ct(o,s,()=>wa(s),fo(e,o,s,n,c,u))}).catch(h=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",h instanceof Error?h.message:h),p()})},pm=(e,t,r,n)=>{no(e.layout,t.agentRunId),t.shellSessionId!==void 0&&ge(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=Ku(t),s=O.get(t.agentRunId),a=s?.writerAgent??"claude-cli",i=s?.projectFolderPath,c=s?.reportKey;Ra(e,a,o,r,n,t.agentRunId,void 0,t.shellSessionId,i,c)},gm=(e,t)=>{for(let r of gu(e.layout))O.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Ct(t,r.agentRunId,()=>fa(e.layout,r.agentRunId),{awaitingInput:!0}),ge(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},fm=(e,t,r,n)=>{let o=O.get(r);if(o===void 0)return!1;ka.add(r),wr(r);let s=kr.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(Bu(r))return!0;no(e.layout,r);let a=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${lm}`:"Stopped by user.";return Tt(e,t,r,n,im,a,o.originalPrompt),!0}});var TA,ym,Am=m(()=>{"use strict";ft();TA=()=>`http://127.0.0.1:${q()}/restart`,ym=async()=>{try{let e=await fetch(TA(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Xe,Ca,NA,OA,Pa,Ze,ho,Sm,yo=m(()=>{"use strict";Xe=g(require("node:fs")),Ca=g(require("node:path")),NA="local-ws-traffic.ndjson",OA=500,Pa=e=>Ca.default.join(e.logsDir,NA),Ze=(e,t)=>{let r=Pa(e);Xe.default.mkdirSync(Ca.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Xe.default.appendFileSync(r,`${n}
`,"utf8")},ho=(e,t=OA)=>{let r=Pa(e);if(!Xe.default.existsSync(r))return[];let o=Xe.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let a of o)try{let i=JSON.parse(a);typeof i=="object"&&i!==null&&"at"in i&&"direction"in i&&"type"in i&&"summary"in i&&s.push(i)}catch{}return s.reverse()},Sm=e=>{let t=Pa(e);Xe.default.existsSync(t)&&Xe.default.writeFileSync(t,"","utf8")}});var MA,Ao,Ia=m(()=>{"use strict";ft();MA=()=>`http://127.0.0.1:${q()}/update/run`,Ao=async e=>{try{let t=await fetch(MA(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var vm,bm=m(()=>{"use strict";vm=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Lr,HA,_m,wm=m(()=>{"use strict";yo();He();Ia();bm();Lr=(e,t)=>{Ze(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},HA=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ut(),fn)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},_m=async e=>{let t=U(e.layout.installDir)?.bundleVersion??null;if(!vm({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Lr(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await Ao({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Lr(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await HA();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Lr(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Lr(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Lr(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var FA,Em,Wm=m(()=>{"use strict";FA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Em=e=>{if(!FA(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var xm,km,Lm=m(()=>{"use strict";is();En();xm=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Sn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},km=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await gt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var z,DA,UA,jA,Rm,Cm,Pm,Im,Tm,Nm,Om=m(()=>{"use strict";z=require("node:crypto"),DA=Buffer.from("302a300506032b6570032100","hex"),UA=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},jA=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,z.createPublicKey)({key:Buffer.concat([DA,t]),format:"der",type:"spki"})},Rm=()=>{let{publicKey:e,privateKey:t}=(0,z.generateKeyPairSync)("ed25519");return{publicKeyRaw:UA(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Cm=e=>(0,z.createPrivateKey)(e),Pm=(e,t)=>(0,z.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Im=(e,t,r)=>{try{let n=jA(e);return(0,z.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},Tm=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Nm=()=>(0,z.randomBytes)(32).toString("base64url")});var fe,So,Mm,BA,$A,Ta,Hm,Fm,Na=m(()=>{"use strict";fe=g(require("node:fs")),So=g(require("node:path"));Om();x();Mm=e=>So.default.join(e.installDir,nt),BA=(e,t)=>{if(e.profileEmail===null||t===Mm(e)||fe.default.existsSync(t))return;let r=Mm(e);fe.default.existsSync(r)&&(fe.default.mkdirSync(So.default.dirname(t),{recursive:!0}),fe.default.renameSync(r,t))},$A=e=>{if(!fe.default.existsSync(e))return null;try{let t=fe.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Ta=e=>{let t=yi(e);BA(e,t);let r=$A(t);if(r!==null)return r;let n=Rm();return fe.default.mkdirSync(So.default.dirname(t),{recursive:!0}),fe.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},Hm=e=>{let t=Ta(e.layout),r=Nm(),n=Tm({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=Cm(t.privateKeyPem),s=Pm(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Fm=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Im(e.serverPublicKey,t,e.serverAttestation)}});var GA,Dm,Um=m(()=>{"use strict";GA="local.agentwitch.com",Dm=`http://${GA}:43347`});var Rr,vo,VA,zA,KA,qA,jm,JA,YA,Bm,Cr,$m,Pr,Gm,Oa=m(()=>{"use strict";Rr=g(require("node:fs")),vo=g(require("node:path"));it();Qn();VA="rag",zA="http://127.0.0.1:11434",KA="nomic-embed-text",qA=e=>vo.default.join(e.installDir,VA),jm=(e,t)=>t!==void 0&&t.trim().length>0?Lt(t).ragChunksFilePath:vo.default.join(qA(e),rn),JA=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let a=0;a<r;a+=1){let i=e[a]??0,c=t[a]??0;n+=i*c,o+=i*i,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},YA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},Bm=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||zA,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||KA;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Cr=(e,t)=>{let r=jm(e,t);if(!Rr.default.existsSync(r))return[];let n=Rr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},$m=async e=>{let t=YA(e.text);if(t.length===0)return 0;let r=jm(e.layout,e.projectFolderPath);Rr.default.mkdirSync(vo.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await Bm(o);if(s===null)continue;let a={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Rr.default.appendFileSync(r,`${JSON.stringify(a)}
`,"utf8"),n+=1}return n},Pr=async e=>{let t=await Bm(e.query);return t===null?[]:Cr(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:JA(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Gm=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var Vm,zm=m(()=>{"use strict";Vm=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let a=Math.floor(n/3600),i=Math.floor(n%3600/60);return i>0?`${a}h ${i}m`:`${a}h`}});var Km,bo,qm,_o=m(()=>{"use strict";zm();Km=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bo=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=Km(e),r=Km(Vm(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},qm=`(function () {
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
})();`});var Nt,Jm,Ym=m(()=>{"use strict";Nt=(e,t,r)=>e===1?t:r,Jm=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Nt(o,"min","mins")} ago`;let s=Math.floor(n/36e5),a=Math.floor(n%36e5/6e4);if(s<24)return a===0?`${s}h ago`:`${s}h ${a} ${Nt(a,"min","mins")} ago`;let i=Math.floor(n/864e5);if(i<7)return`${i} ${Nt(i,"day","days")} ago`;let c=Math.floor(i/7);if(c<5)return`${c} ${Nt(c,"week","weeks")} ago`;let u=Math.floor(i/30);if(u<12)return`${u} ${Nt(u,"month","months")} ago`;let d=Math.floor(i/365);return`${d} ${Nt(d,"year","years")} ago`}});var Ma,Xm,Zm=m(()=>{"use strict";Ma=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xm=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${Ma(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Ma(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom).</p>
      <p class="muted mono">${Ma(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Qm,ep,tp,rp=m(()=>{"use strict";Qm=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,ep=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,tp=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Ir,np,op=m(()=>{"use strict";_o();Ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),np=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",a=e.wakeError?`<div class="alert-error">${Ir(e.wakeError)}</div>`:"",i=bo(e.lastHeartbeatAt);return`${a}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Last heartbeat \xB7 ${i}</span>
      </div>
    </section>
    <div class="home-grid">
      <a class="home-card" href="/harness">
        <p class="home-card-eyebrow">Setup</p>
        <h2 class="home-card-title">Harness</h2>
        <p class="home-card-lede">View installed sets, apply them to a project <code>.cursor</code>, or import from repos.</p>
        <p class="home-card-meta">${Ir(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Ir(n)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Ir(o)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${Ir(s)}</p>
      </a>
      <a class="home-card" href="/status">
        <p class="home-card-eyebrow">Health</p>
        <h2 class="home-card-title">Bridge status</h2>
        <p class="home-card-lede">WebSocket, link code, install bundle, and revive actions.</p>
        <p class="home-card-meta">${e.wsConnected?"Bridge is up":"Check connection details"}</p>
      </a>
    </div>`}});var sp,ap=m(()=>{"use strict";sp=`
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
`.trim()});var XA,ZA,ip,lp,cp=m(()=>{"use strict";ap();_o();XA=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,ZA=[{href:"/",label:"Home"},{href:"/status",label:"Status"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"},{href:"/knowledge",label:"Knowledge"},{href:"/harness",label:"Harness"}],ip=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lp=e=>{let t=ZA.map(o=>{let s=o.href===e.activePath;return`<a class="nav-link${s?" is-active":""}" href="${o.href}"${s?' aria-current="page"':""}>${o.label}</a>`}).join(""),r=ip(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"";return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${ip(e.title)} \xB7 Agent Witch Local</title>
  <style>${sp}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${XA}
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
  <script>${qm}</script>
</body>
</html>`}});var Qe,dp,up=m(()=>{"use strict";Qe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dp=e=>{let t=e.applyFlashError?`<div class="alert-error">${Qe(e.applyFlashError)}</div>`:e.applyFlashMessage?`<div class="alert-success">${Qe(e.applyFlashMessage)}</div>`:"";if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">Nothing in <code>~/.agent-witch</code> yet. Use <strong>Reveal &amp; submit</strong> below to import from a repo.</p>
    </section>`;let r=e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Qe(o.slug)}" checked />
            <span><strong>${Qe(o.name)}</strong> <span class="muted mono">(${Qe(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Qe(e.installed.manifestUpdatedAt)}</p>`:"";return`${t}<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">${e.installed.sets.length} set(s) stored on this Mac. Apply selected sets into a project&apos;s <code>.cursor</code> folder and record the link in <code>.agent-witch/project.json</code>.</p>
      ${n}
      <form method="POST" action="/harness/apply-to-project" class="stack harness-apply-form">
        <label class="field">
          <span class="field-label">Project folder (repo root)</span>
          <input class="input" id="applyProjectFolder" name="projectFolder" type="text" value="${Qe(e.defaultProjectFolder)}" placeholder="~/dev/my-app" autocomplete="off" required />
        </label>
        <div class="actions">
          <button class="btn btn-secondary" type="button" id="pickApplyProjectFolder">Choose folder\u2026</button>
        </div>
        <p class="field-label">Sets to apply</p>
        <ul class="harness-installed-set-list">${r}</ul>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Apply to project</button>
        </div>
      </form>
    </section>
    <script>(() => {
      const pickBtn = document.getElementById("pickApplyProjectFolder");
      const projectInput = document.getElementById("applyProjectFolder");
      pickBtn?.addEventListener("click", async () => {
        const response = await fetch("/api/harness/pick-folder", { method: "POST" });
        const payload = await response.json();
        if (projectInput instanceof HTMLInputElement && typeof payload.path === "string") {
          projectInput.value = payload.path;
        }
      });
    })();</script>`}});var QA,mp,pp,gp=m(()=>{"use strict";QA=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,mp=e=>e.kind==="folder",pp=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let a=0;a<o.length;a+=1){let i=o[a];if(i===void 0)continue;if(a===o.length-1){s.children.set(i,n);continue}let u=s.children.get(i);if(u!==void 0&&mp(u)){s=u;continue}let d={kind:"folder",name:i,children:new Map};s.children.set(i,d),s=d}}let r=n=>{let o=[];for(let s of n.children.values()){if(mp(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(QA)};return r(t)}});var fp,Ha,hp=m(()=>{"use strict";fp=g(require("node:path")),Ha=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Ha(r.children,t)}</ul>
            </details>
          </li>`;let n=fp.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var yp,Pe,eS,tS,Tr,rS,Ap,Sp=m(()=>{"use strict";yp=g(require("node:path"));up();gp();hp();Pe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eS=()=>`(() => {
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

  document.getElementById("addProject")?.addEventListener("click", async () => {
    const pickResponse = await fetch("/api/harness/pick-folder", {
      method: "POST",
    });
    const picked = await pickResponse.json();
    if (typeof picked.path !== "string") {
      return;
    }
    const addResponse = await fetch("/api/harness/reveal/add-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectPath: picked.path }),
    });
    const result = await addResponse.json();
    if (result.ok !== true) {
      window.alert(
        typeof result.errorMessage === "string"
          ? result.errorMessage
          : "Could not add project.",
      );
      return;
    }
    window.location.href = "/harness?added=1";
  });
})();`,tS=()=>`(() => {
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
})();`,Tr=e=>{let t=dp({installed:e.installed,defaultProjectFolder:e.defaultProjectFolder,applyFlashMessage:e.applyFlashMessage,applyFlashError:e.applyFlashError}),r=e.flashError?`<div class="alert-error">${Pe(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Pe(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':rS(e.reveal),o=e.reveal?.scanRoots[0]?.trim()??"",s=o.length>0&&e.scanFolder.trim()===o;return`${t}${r}<section class="card">
      <p class="eyebrow">Import</p>
      <h1>Reveal &amp; submit</h1>
      <p class="lede">Pick one folder under your home directory, scan for projects with <code>.cursor</code>, then submit your selection to the local harness. Scanning <code>~</code> can take a while \u2014 prefer a project folder or use <strong>Stop</strong>.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Pe(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Pe(o)}" />
        </label>
        <div class="actions">
          <button class="btn btn-secondary" type="button" id="pickFolder">Choose folder\u2026</button>
          <button class="btn btn-secondary" type="button" id="addProject">Add project\u2026</button>
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
    <script>${eS()}</script>
    <script>${tS()}</script>`},rS=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,a=t.get(s)??{sets:[]};t.set(s,{sets:[...a.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let a=o.sets.map(({set:i,setIndex:c})=>{let u=pp(i.items.map(h=>({...h,relativePath:typeof h.relativePath=="string"&&h.relativePath.length>0?h.relativePath:yp.default.relative(i.sourceRoot,h.sourcePath).replaceAll("\\","/")}))),d=Ha(u,Pe),p=i.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Pe(i.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Pe(i.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${p} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${d}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Pe(n)}" autocomplete="off" />
          </label>
          ${a}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Ap=(e,t)=>{let r=new Set(e.getAll("includeSet").map(a=>Number.parseInt(String(a),10)).filter(a=>Number.isFinite(a))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[a,i]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(a);if(c===null)continue;let u=Number.parseInt(c[1]??"",10),d=i.trim();Number.isFinite(u)&&d.length>0&&o.set(u,d)}let s=[];for(let a=0;a<n;a+=1){let i=e.get(`setSlug-${a}`)?.trim()??"",c=e.get(`setGroupIndex-${a}`),u=c===null?null:Number.parseInt(c,10),d=u!==null&&Number.isFinite(u)?o.get(u):void 0,p=e.get(`setName-${a}`)?.trim()??d??i,h=t.sets[a];if(h===void 0)continue;let S=i.length>0?i:h.proposedSlug,y=p.length>0?p:h.proposedName,l=r.size===0||r.has(a),A=h.items.map(b=>({id:b.id,kind:b.kind,title:b.title,sourcePath:b.sourcePath,include:l}));s.push({slug:S,name:y,items:A})}return s}});var vp,bp=m(()=>{"use strict";vp=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var wo,Fa,Nr,nS,he,Eo,Ot=m(()=>{"use strict";wo=g(require("node:fs")),Fa=g(require("node:os")),Nr=g(require("node:path")),nS=()=>wo.default.realpathSync(Nr.default.resolve(Fa.default.homedir())),he=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Nr.default.join(Fa.default.homedir(),t.slice(1)):t,n;try{n=wo.default.realpathSync(Nr.default.resolve(r))}catch{return null}let o=nS();return n===o||n.startsWith(`${o}${Nr.default.sep}`)?n:null},Eo=e=>{let t=he(e);if(t===null)return null;try{if(!wo.default.statSync(t).isFile())return null}catch{return null}return t}});var Y,Mt,Or,oS,sS,aS,_p,wp=m(()=>{"use strict";Y=g(require("node:fs")),Mt=g(require("node:path"));ma();eo();bp();Ot();Or=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oS=e=>{if(!Y.default.existsSync(e))return null;try{let t=JSON.parse(Y.default.readFileSync(e,"utf8"));if(Or(t)&&t.version===1)return t}catch{return null}return null},sS=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?Mt.default.join(e.harnessRootDir,n):Mt.default.join(e.harnessSetsDir,t,n);if(!Y.default.existsSync(o))return null;try{if(!Y.default.statSync(o).isFile())return null}catch{return null}return o},aS=(e,t)=>{let r={};if(Y.default.existsSync(e))try{let o=JSON.parse(Y.default.readFileSync(e,"utf8"));Or(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};Y.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},_p=e=>{let t=[...new Set(e.setSlugs.map(d=>d.trim()).filter(d=>d.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=Zn(e.projectFolderPath),n=he(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=Y.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=oS(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let a=Or(s.sets)?s.sets:{},i=Mt.default.join(n,".cursor"),c=0;for(let d of t){let p=a[d];if(!Or(p))return{ok:!1,errorMessage:`Harness set "${d}" is not installed locally.`};let h=Array.isArray(p.items)?p.items:[];for(let S of h){if(!Or(S))continue;let y=typeof S.path=="string"?S.path.trim():"";if(y.length===0)continue;let l=vp(y);if(l===null)continue;let A=sS(e.layout,d,y);if(A===null)continue;let b=Mt.default.join(i,l);Y.default.mkdirSync(Mt.default.dirname(b),{recursive:!0}),Y.default.copyFileSync(A,b),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let u=qe({projectFolderPath:n});return aS(u.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var Ua,Da,ja,Ep=m(()=>{"use strict";Ua=g(require("node:fs")),Da=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ja=e=>{if(!Ua.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Ua.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Da(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=Da(t.sets)?t.sets:{},o=Object.entries(n).map(([s,a])=>{if(!Da(a))return null;let i=typeof a.slug=="string"&&a.slug.length>0?a.slug:s,c=typeof a.name=="string"&&a.name.length>0?a.name:i,u=typeof a.updatedAt=="string"?a.updatedAt:"",d=Array.isArray(a.items)?a.items:[];return{slug:i,name:c,itemCount:d.length,updatedAt:u}}).filter(s=>s!==null).toSorted((s,a)=>s.name.localeCompare(a.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Ba,Wp=m(()=>{"use strict";Ba=()=>"~"});var xp,kp,Lp=m(()=>{"use strict";xp=require("node:child_process"),kp=()=>{if(process.platform!=="darwin")return null;try{let t=(0,xp.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var Rp,Cp,Pp=m(()=>{"use strict";Rp=require("node:crypto"),Cp=e=>`local-${(0,Rp.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var $a,Ip=m(()=>{"use strict";$a=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Mr,Wo,Ga=m(()=>{"use strict";Mr=g(require("node:path")),Wo=e=>{let t=Mr.default.dirname(e),r=Mr.default.basename(t);return r==="agents"?Mr.default.basename(Mr.default.dirname(t)):r}});var Hr,ye,Tp,iS,lS,cS,xo,Np,Va=m(()=>{"use strict";Hr=g(require("node:fs")),ye=g(require("node:path"));Pp();Ip();Ga();Tp=new Set(["node_modules",".git","dist","build",".next","coverage"]),iS=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},lS=(e,t)=>{let r=ye.default.basename(t);if(e==="skill"){let n=t.split(ye.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},cS=e=>{let t=[],r=(o,s)=>{let a;try{a=Hr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(i.name.startsWith(".")||i.isDirectory()&&Tp.has(i.name))continue;let c=ye.default.join(o,i.name),u=s?ye.default.join(s,i.name):i.name;if(i.isDirectory()){r(c,u);continue}if(!i.isFile())continue;$a(u.replaceAll("\\","/"))!==null&&t.push({relativePath:u,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=ye.default.join(e,o);Hr.default.existsSync(s)&&r(s,o)}let n=ye.default.join(e,"skills");return Hr.default.existsSync(n)&&r(n,"skills"),t},xo=e=>{let t=cS(e);if(t.length===0)return null;let r=ye.default.dirname(e),n=Wo(e),o=iS(n),s=t.map(a=>{let i=$a(a.relativePath.replaceAll("\\","/"));if(i===null)throw new Error(`Unexpected harness file: ${a.relativePath}`);return{id:Cp(a.absolutePath),kind:i,title:lS(i,a.relativePath),sourcePath:a.absolutePath,relativePath:a.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},Np=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let a;try{a=Hr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(r())return;if(!i.isDirectory()||Tp.has(i.name))continue;let c=ye.default.join(o,i.name);if(i.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var Op,za,dS,Mp,Hp=m(()=>{"use strict";Op=g(require("node:fs")),za=g(require("node:path"));Va();Ot();dS=e=>{let t=he(e.trim());if(t===null)return null;if(za.default.basename(t)===".cursor")return t;let r=za.default.join(t,".cursor");try{if(Op.default.statSync(r).isDirectory())return he(r)}catch{return null}return null},Mp=e=>{let t=dS(e.projectPath);if(t===null)return null;let r=xo(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(a=>a.sourceRoot!==r.sourceRoot),r].toSorted((a,i)=>a.proposedName.localeCompare(i.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var Fp,uS,ko,Dp,Up=m(()=>{"use strict";Fp=g(require("node:path"));Va();Ot();Ga();uS=5,ko=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Dp=e=>{let t=he(e.scanRoot.trim());if(t===null)return ko(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of Np(t,uS,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let a=he(s);if(a===null)continue;let i=Wo(a);ko(e.response,"folder",{cursorDir:a,groupName:i,repoPath:Fp.default.dirname(a)});let c=xo(a);c!==null&&(r.push(c),ko(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:i,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(u=>u.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,a)=>s.proposedName.localeCompare(a.proposedName))};return ko(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var jp,Bp,$p=m(()=>{"use strict";jp=g(require("node:path")),Bp=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:jp.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var B,Gp,Ka,mS,Vp,zp,qa,Fr,Kp=m(()=>{"use strict";B=g(require("node:fs")),Gp=g(require("node:os")),Ka=g(require("node:path"));gs();Ot();$p();mS=e=>{if(!B.default.existsSync(e))return null;try{let t=JSON.parse(B.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Vp=e=>{let t=e.hostname??Gp.default.hostname(),r=mS(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let a of e.sets){let i=a.items.filter(d=>d.include);if(i.length===0)continue;let c=[];for(let d of i){let p=Eo(d.sourcePath);if(p===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${d.sourcePath}`};let h=B.default.readFileSync(p,"utf8");c.push({id:d.id,kind:d.kind,title:d.title,content:h,setSlugs:[a.slug]})}let u=Ln({bundle:{name:a.name,slug:a.slug,items:c},hostname:t,existingManifest:r});r=u.manifest;for(let d of u.directories)o.add(d);for(let d of u.files)s.push(d),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{B.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let a of o)B.default.mkdirSync(`${e.layout.harnessRootDir}/${a}`,{recursive:!0});for(let a of s){let i=Ka.default.join(e.layout.harnessRootDir,a.relativePath);B.default.mkdirSync(Ka.default.dirname(i),{recursive:!0}),B.default.writeFileSync(i,a.content)}return B.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Harness submit failed."}}},zp="reveal-cache.json",qa=(e,t)=>{B.default.mkdirSync(e.harnessRootDir,{recursive:!0}),B.default.writeFileSync(`${e.harnessRootDir}/${zp}`,`${JSON.stringify(t,null,2)}
`)},Fr=e=>{let t=`${e.harnessRootDir}/${zp}`;if(!B.default.existsSync(t))return null;try{let r=JSON.parse(B.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return Bp(r)}catch{return null}return null}});var qp,Jp=m(()=>{"use strict";qp=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Ht,pS,Ja,Yp=m(()=>{"use strict";Ht=g(require("node:fs")),pS=256e3,Ja=(e,t=pS)=>{if(!Ht.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Ht.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,a=Buffer.alloc(s),i=Ht.default.openSync(e,"r");try{Ht.default.readSync(i,a,0,s,o)}finally{Ht.default.closeSync(i)}let c=a.toString("utf8");if(o>0){let u=c.indexOf(`
`);u>=0&&(c=c.slice(u+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var Xp,Zp=m(()=>{"use strict";Xp="https://www.agentwitch.com"});var Lo,Ya=m(()=>{"use strict";Zp();tr();ct();Lo=e=>{let t=ae(),r=t!==null?K(t.wsUrl):null;if(r!==null&&r.length>0)return r;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Xp}});var Qp,eg=m(()=>{"use strict";He();ut();Ya();Qp=async e=>{let t=U(e.installDir),r=t?.bundleVersion??null,n=Lo(t);try{let o=await es(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:un(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var tg,rg=m(()=>{"use strict";tg=e=>!e});var ng,og,sg=m(()=>{"use strict";Ia();ng=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},og=async()=>{let e=await Ao({force:!0});if(e.ok)return{ok:!0,message:ng(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:ng(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(ut(),fn)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var ig,Dr,lg,Xa,ag,gS,Ro,N,Za,T,Ae,Co,fS,hS,cg,dg,ug=m(()=>{"use strict";ig=g(require("node:http")),Dr=g(require("node:fs")),lg=g(require("node:path"));Um();yo();Oa();ar();yt();_o();Ym();Zm();rp();op();cp();Sp();wp();Ep();Wp();Lp();Hp();Ot();Up();Kp();Jp();Yp();He();Ya();eg();rg();sg();Na();Xa=e=>Jm(e)??"never",ag=48e3,gS=e=>e?.sets.find(r=>r.repoPath.trim().length>0)?.repoPath?.trim()??"",Ro=e=>({scanFolder:e.scanFolder??e.reveal?.scanRoots[0]??Ba(),reveal:e.reveal,installed:ja(e.layout),defaultProjectFolder:gS(e.reveal),flashMessage:e.flashMessage,flashError:e.flashError,applyFlashMessage:e.applyFlashMessage,applyFlashError:e.applyFlashError}),N=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Za={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},T=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Za}),e.end(JSON.stringify(r))},Ae=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Co=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},fS=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${N(e.status.wakeError)}</div>`:"",o=tg(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${bo(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${N(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${N(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${N(Xa(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${N(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},hS=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":null},cg=e=>{let t=lg.default.join(e.layout.installDir,"link-code.txt"),r=()=>U(e.layout.installDir),n=()=>{let d=r();return{installBundleVersion:qp(d),installBundleUpdatedAt:d?.updatedAt??null,installVersion:d}},o=async d=>{let p=d.installVersion??r(),h=await a(),S=ep(h),y=tp(d.updateFlash??null);return lp({title:d.title,activePath:d.activePath,body:d.body,cloudAppOrigin:Lo(p),prependBody:`${y}${S}`,headerUpdateButtonHtml:Qm(h)})},s=null,a=async()=>{let d=Date.now();if(s!==null&&d-s.cachedAtMs<6e4)return s.offer;let p=await Qp(e.layout);return s={cachedAtMs:d,offer:p},p},i=()=>{s=null},c=()=>{if(Dr.default.existsSync(t))return Dr.default.readFileSync(t,"utf8").trim();let d=Math.random().toString(36).slice(2,8).toUpperCase();return Dr.default.writeFileSync(t,d,"utf8"),d},u=ig.default.createServer((d,p)=>{(async()=>{let h=d.url?.split("?")[0]??"/",S=d.method??"GET";if(S==="OPTIONS"){p.writeHead(204,Za),p.end();return}if(S==="GET"&&h==="/health"){let y=e.controllers.getStatus(),l=n();T(p,200,{ok:!0,...y,installBundleVersion:l.installBundleVersion,installBundleUpdatedAt:l.installBundleUpdatedAt});return}if(S==="GET"&&h==="/api/status"){let y=n();T(p,200,{...e.controllers.getStatus(),linkCode:c(),installBundleVersion:y.installBundleVersion,installBundleUpdatedAt:y.installBundleUpdatedAt});return}if(S==="GET"&&h==="/api/traffic"){T(p,200,{entries:ho(e.layout)});return}if(S==="DELETE"&&h==="/api/traffic"){Sm(e.layout),T(p,200,{ok:!0});return}if(S==="GET"&&h==="/api/knowledge"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(l.length>0){let A=await Pr({layout:e.layout,query:l,limit:20});T(p,200,{chunks:A,query:l});return}T(p,200,{chunks:Cr(e.layout).slice(-50).reverse()});return}if(S==="POST"&&h==="/api/revive"){e.controllers.reviveWebSocket(),T(p,200,{ok:!0});return}if(S==="GET"&&h==="/api/update-status"){let y=await a();T(p,200,{ok:!0,...y});return}if(S==="POST"&&h==="/api/update"){i();let y=await og();i(),p.writeHead(303,{Location:y.ok?"/?update=ok":"/?update=failed"}),p.end();return}if(S==="GET"&&h==="/"){let y=e.controllers.getStatus(),l=n(),A=ja(e.layout),b=Ja(e.layout.errorLogPath);Ae(p,await o({title:"Home",activePath:"/",installVersion:l.installVersion,updateFlash:hS(d.url??void 0),body:np({wsConnected:y.wsConnected,lastHeartbeatAt:y.lastHeartbeatAt,harnessSetCount:A.sets.length,knowledgeChunkCount:Cr(e.layout).length,trafficEntryCount:ho(e.layout).length,wakeError:y.wakeError,errorLogByteSize:b.byteSize,errorLogExists:b.exists})}));return}if(S==="GET"&&h==="/errors"){let y=n(),l=Ja(e.layout.errorLogPath);Ae(p,await o({title:"Errors",activePath:"/errors",installVersion:y.installVersion,body:Xm({errorLogPath:e.layout.errorLogPath,content:l.content,exists:l.exists,truncated:l.truncated,byteSize:l.byteSize})}));return}if(S==="GET"&&h==="/status"){let y=e.controllers.getStatus(),l=Q(e.layout),A=le(l,ie),b=n();Ae(p,await o({title:"Status",activePath:"/status",installVersion:b.installVersion,body:fS({status:y,stale:A,linkCode:c(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt})}));return}if(S==="GET"&&h==="/traffic"){let y=ho(e.layout),l=n(),A=y.map(f=>`<tr><td title="${N(f.at)}">${N(Xa(f.at))}</td><td>${N(f.direction)}</td><td><code>${N(f.type)}</code></td><td>${N(f.summary)}</td><td>${N(f.action??"")}</td></tr>`).join(""),b=y.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${A}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';Ae(p,await o({title:"Traffic",activePath:"/traffic",installVersion:l.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${b}
            </section>`}));return}if(S==="GET"&&h==="/harness"){let y=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=n(),A=Fr(e.layout),b=y.searchParams.get("files"),f=y.searchParams.get("submitted")==="1"?y.searchParams.get("syncFailed")==="1"?`Local harness updated (${y.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:y.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${y.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":y.searchParams.get("added")==="1"?"Project added to reveal list.":y.searchParams.get("stopped")==="1"?`Reveal stopped. ${A?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:y.searchParams.get("revealed")==="1"?`Reveal found ${A?.sets.length??0} set(s).`:null,v=y.searchParams.get("applied")==="1"?`Applied harness to project (${b??"0"} file(s)). Link saved in project metadata.`:null,w=A?.scanRoots[0]??Ba();Ae(p,await o({title:"Harness",activePath:"/harness",installVersion:l.installVersion,body:Tr(Ro({layout:e.layout,reveal:A,scanFolder:w,flashMessage:f,applyFlashMessage:v}))}));return}if(S==="POST"&&h==="/api/harness/pick-folder"){let y=kp();if(y===null){T(p,200,{cancelled:!0});return}T(p,200,{path:y});return}if(S==="GET"&&h==="/api/harness/file-content"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",A=Eo(l);if(A===null){T(p,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let b=Dr.default.readFileSync(A,"utf8"),f=b.length>ag?`${b.slice(0,ag)}
\u2026 (truncated)`:b;T(p,200,{content:f})}catch{T(p,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&h==="/api/harness/reveal/add-project"){let y=await Co(d),l="";try{let f=JSON.parse(y);typeof f=="object"&&f!==null&&typeof f.projectPath=="string"&&(l=f.projectPath.trim())}catch{T(p,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(l.length===0){T(p,400,{ok:!1,errorMessage:"projectPath is required."});return}let A=Fr(e.layout),b=Mp({reveal:A,projectPath:l});if(b===null||b.sets.length===0){T(p,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}qa(e.layout,b),T(p,200,{ok:!0,setCount:b.sets.length});return}if(S==="GET"&&h==="/api/harness/reveal/stream"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(l.length===0){T(p,400,{errorMessage:"Choose a folder to scan first."});return}let A=!1;d.on("close",()=>{A=!0}),p.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Za});let b=Dp({scanRoot:l,response:p,shouldAbort:()=>A});qa(e.layout,b),p.end();return}if(S==="POST"&&h==="/harness/reveal"){p.writeHead(410,{"Content-Type":"text/plain"}),p.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&h==="/harness/apply-to-project"){let y=Fr(e.layout),l=await Co(d),A=new URLSearchParams(l),b=A.get("projectFolder")?.trim()??"",f=A.getAll("applySet").map(w=>String(w)),v=_p({layout:e.layout,projectFolderPath:b,setSlugs:f});if(!v.ok){let w=n();Ae(p,await o({title:"Harness",activePath:"/harness",installVersion:w.installVersion,body:Tr(Ro({layout:e.layout,reveal:y,applyFlashError:v.errorMessage}))}));return}p.writeHead(303,{Location:`/harness?applied=1&files=${v.writtenFileCount}`}),p.end();return}if(S==="POST"&&h==="/harness/submit"){let y=Fr(e.layout);if(y===null){let C=n();Ae(p,await o({title:"Harness",activePath:"/harness",installVersion:C.installVersion,body:Tr(Ro({layout:e.layout,reveal:null,flashError:"Run reveal before submit."}))}));return}let l=await Co(d),A=new URLSearchParams(l),b=Ap(A,y),f=Vp({layout:e.layout,sets:b});if(!f.ok){let C=n();Ae(p,await o({title:"Harness",activePath:"/harness",installVersion:C.installVersion,body:Tr(Ro({layout:e.layout,reveal:y,flashError:f.errorMessage??"Submit failed."}))}));return}let w=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";p.writeHead(303,{Location:`/harness?submitted=1&count=${f.writtenItemCount??0}${w}`}),p.end();return}if(S==="GET"&&h==="/knowledge"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",A=n(),f=(l.length>0?await Pr({layout:e.layout,query:l,limit:20}):Cr(e.layout).slice(-50).reverse()).map(v=>`<article class="card"><div class="muted" title="${N(v.createdAt)}">${N(Xa(v.createdAt))}${v.source?` \xB7 ${N(v.source)}`:""}</div><pre>${N(v.text)}</pre></article>`).join("");Ae(p,await o({title:"Knowledge",activePath:"/knowledge",installVersion:A.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${N(l)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${f||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}S==="POST"&&await Co(d),p.writeHead(404),p.end("Not found")})().catch(h=>{console.error("[agent-witch-local-app]",h),p.writeHead(500),p.end("Internal error")})});return u.on("error",d=>{if(d.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",d)}),u.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Dm}`)}),u},dg=e=>Ta(e).publicKeyRaw});var Ur,Qa,mg,pg,gg,fg,hg=m(()=>{"use strict";Ur=g(require("node:fs")),Qa=g(require("node:path"));it();Qn();mg=(e,t)=>Qa.default.join(Lt(t).memoryDirPath,nn),pg=(e,t)=>{let r=mg(e,t);if(!Ur.default.existsSync(r))return[];let n=Ur.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},gg=e=>{let t=mg(e.layout,e.projectFolderPath);Ur.default.mkdirSync(Qa.default.dirname(t),{recursive:!0}),Ur.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},fg=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let a=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,i=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${a}
Result: ${i}`}).join(`

`)}

---

`});var yg,yS,AS,SS,Ag,Sg=m(()=>{"use strict";yg=g(require("node:os"));x();yS="Default",AS=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),SS=e=>{let t=yg.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Ag=()=>{let e=W(),t=hi(e),r=AS(yS);return`${SS(t)}/${r.length>0?r:"project"}`}});var vg,vS,bg,_g=m(()=>{"use strict";vg=require("node:child_process");mo();pt();vS=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,vg.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",a=>{o(a===0)})})},bg=async e=>{if(!M(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};try{await Ce(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await vS(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var wg,Eg=m(()=>{"use strict";wg=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var Wg,xg,kg=m(()=>{"use strict";Wg=require("node:crypto"),xg=()=>(0,Wg.randomUUID)()});var jr,bS,Lg,Po=m(()=>{"use strict";jr="[[WORKING_ESTIMATE]]",bS=["Put this marker on its own line:",jr,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),Lg=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",bS,"","Task to estimate:",e.trim()].join(`
`)});var Rg,Cg=m(()=>{"use strict";Rg=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Pg,Ig=m(()=>{"use strict";Pg=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var _S,Tg,Ng=m(()=>{"use strict";Po();_S=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Tg=e=>{if(!e.includes(jr))return null;let t=null;for(let r of e.matchAll(_S)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var Og,Mg=m(()=>{"use strict";ls();Po();Cg();Ig();Ng();Gt();Og=async e=>{let t=Rg(e.wrappedPrompt),r=Lg(t),n=await wn(e.config,e.writerAgent,r),o=Tg(n.output),s=Pg(o);return $t({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Z.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var Hg={};Te(Hg,{buildContinuationPromptWithContext:()=>WS});var wS,ES,WS,Fg=m(()=>{"use strict";wS=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,ES=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),WS=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=ES(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${wS(n,o)}`:null].filter(a=>a!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var Dg={};Te(Dg,{readHarnessExportSets:()=>kS});var Br,ei,Io,xS,kS,Ug=m(()=>{"use strict";Br=g(require("node:fs")),ei=g(require("node:path"));x();Io=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xS=e=>{if(!Br.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Br.default.readFileSync(e.harnessManifestPath,"utf8"));if(Io(t))return t}catch{return null}return null},kS=(e,t)=>{let r=W(t),n=xS(r);if(n===null)return[];let o=Io(n.sets)?n.sets:{},s=[];for(let a of e){let i=o[a];if(!Io(i)||typeof i.name!="string")continue;let c=Array.isArray(i.items)?i.items:[],u=[];for(let d of c){if(!Io(d))continue;let p=typeof d.path=="string"?d.path:void 0,h=typeof d.id=="string"?d.id:"",S=typeof d.kind=="string"?d.kind:"",y=typeof d.title=="string"?d.title:"";if(p===void 0||h.length===0||S.length===0||y.length===0)continue;let l=p.startsWith("shared/")?ei.default.join(r.harnessRootDir,p):ei.default.join(r.harnessSetsDir,a,p);Br.default.existsSync(l)&&u.push({id:h,kind:S,title:y,content:Br.default.readFileSync(l,"utf8")})}u.length>0&&s.push({name:i.name,slug:a,items:u})}return s}});var Kg={};Te(Kg,{startAgentWitchClient:()=>BS});var ni,$r,Ft,$S,LS,RS,CS,PS,IS,jg,TS,Bg,$g,Gg,ti,L,Vg,P,ri,NS,To,OS,MS,HS,FS,DS,US,jS,zg,BS,qg=m(()=>{"use strict";ni=require("node:child_process"),$r=g(require("node:fs")),Ft=g(require("node:os"));Pd();tn();Xo();zo();ca();Oe();Fd();jd();du();ft();x();hm();bn();lo();xa();mo();pt();Aa();ar();yt();io();Am();wm();He();Wm();Lm();Na();yo();ug();Oa();hg();ct();Sg();eo();_g();qo();dn();tt();sn();Eg();kg();Po();Gt();Mg();$S={},LS="ws://localhost:3000/api/agent-witch/ws",RS="claude",CS="codex",PS="cursor",IS="agy",jg=3e4,TS=3e4,Bg=new Map,$g=new Map,Gg=new Map,ti=e=>{let t=e?.trim()??"";return t.length>0?t:Ag()},L=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vg=e=>{let t=W(e);if(!$r.default.existsSync(t.configPath))return null;try{let r=JSON.parse($r.default.readFileSync(t.configPath,"utf8"));if(!L(r))throw new Error("Config must be a JSON object.");let n=process.env.AGENT_WITCH_WS_URL?.trim()??"",o=typeof r.wsUrl=="string"?r.wsUrl.trim():"",s=n.length>0?n:o.length>0?o:LS,a=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),i=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??RS,c=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??CS,u=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??PS,d=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??IS,p=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",h=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return p.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:h,wsUrl:s,workspace:a,claudeCommand:i,codexCommand:c,cursorCommand:u,antigravityCommand:d,pairingToken:p,layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},P=(e,t,r)=>{e.readyState===hr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&Ze(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}))},ri=e=>e,NS=e=>{if(!$r.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse($r.default.readFileSync(e.harnessManifestPath,"utf8"));if(L(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},To=(e,t)=>{let r=NS(t);r!==null&&P(e,{type:"harness.manifest.report",payload:{hostname:Ft.default.hostname(),manifest:r}})},OS=async(e,t,r,n,o,s,a=!1,i,c,u,d)=>{if(!M(t)){P(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let p=po(t)&&!tm(t);if(p){try{await Ce(e.layout.installDir,t)}catch(v){let w=v instanceof Error?v.message:String(v);P(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ea(t)}else if(!po(t))try{await Ce(e.layout.installDir,t)}catch(v){let w=v instanceof Error?v.message:String(v);P(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=a&&em(t)&&rm(t)?"continue":"first",S=r;if(a&&h==="first"&&typeof c=="string"&&c.length>0){let v=so(e.layout,c);if(v!==null){let{buildContinuationPromptWithContext:w}=await Promise.resolve().then(()=>(Fg(),Hg));S=w({priorPrompt:v.prompt,priorOutput:v.resultOutput??"",userMessage:r})}}let y=ti(u);qe({projectFolderPath:y});let l=await Pr({layout:e.layout,query:S,limit:5,projectFolderPath:y}),A=pg(e.layout,y),b=`${fg(A)}${Gm(l)}${S}`,f=d?.trim()??(s!==void 0&&y.trim().length>0?xg():void 0);if(s!==void 0&&f!==void 0&&f.length>0&&y.trim().length>0){ln({reportKey:f,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let v=await Og({config:{workspace:e.workspace,claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand},writerAgent:t,wrappedPrompt:b,reportKey:f,agentRunId:s});if(v.estimateSeconds!==null){let w=`${jr}
${v.estimateSeconds}
`;Je(s)?P(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:w},requestId:n}):Pt(s,w)}b=wg(b,v),b=Di(b,{agentRunId:s,reportKey:f,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}Ra(e,t,b,n,ri(o),s,{sessionTurn:h},i,y,f),p&&s!==void 0&&P(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:om(t)},requestId:n})},MS=async(e,t,r,n,o)=>{let s=(a,i)=>{P(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:a,exitCode:i},requestId:n})};try{let a="",i=await sm({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,commands:xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:d=>{a+=d,P(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:d},requestId:n})}}),c=M(t)?t:"claude-cli",u=i.exitCode!==0?i.output:a.length>0?go(c):i.output;s(u,i.exitCode)}catch(a){let i=a instanceof Error?a.message:String(a);console.error("[agent-witch] Writer session start failed:",i),s(`Failed to start ${t} session: ${i}
`,-1)}},HS=(e,t,r)=>new Promise(n=>{if(!M(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=mt(t,r,xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],a=(0,ni.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});a.stdout?.on("data",i=>{s.push(i.toString("utf8"))}),a.stderr?.on("data",i=>{s.push(i.toString("utf8"))}),a.on("close",i=>{n({exitCode:i??-1,output:s.join("").trim()})}),a.on("error",i=>{n({exitCode:-1,output:i.message})})}),FS=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(P(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){P(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!M(o)){P(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let a=await(async()=>{try{await Ce(e.layout.installDir,o)}catch(i){let c=i instanceof Error?i.message:String(i);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return HS(e,o,s)})();P(n,{type:"harness.request.result",payload:{success:a.exitCode===0,writerAgent:o,exitCode:a.exitCode,output:a.output},requestId:r}),To(n,e.layout)},DS=e=>{let t=1e3*2**e;return Math.min(TS,t)},US=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,ym().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,A="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,_m({layout:e.layout,remoteBundleVersion:l,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=Q(e.layout);l!==null&&le(l,ie)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,i(),c(),S())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},i=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{t.socket!==void 0&&(t.socket.removeAllListeners(),(t.socket.readyState===hr.OPEN||t.socket.readyState===hr.CONNECTING)&&t.socket.close(),t.socket=void 0,t.wsConnected=!1)},u=()=>{a(),t.localHealthTimer=setInterval(o,jg)},d=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=DS(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,S()},l)},p=l=>{s();let A=()=>{let b=U(e.layout.installDir)?.bundleVersion??null,f=q();P(l,{type:"agent.heartbeat",payload:{hostname:Ft.default.hostname(),macOsUsername:Ft.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},...b!==null?{installBundleVersion:b}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,jg)},h=(l,A)=>{if(typeof l.type!="string")return;Ze(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"});let b=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&L(l.payload)){let f=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",v=typeof l.payload.origin=="string"?l.payload.origin:"",w=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",C=typeof l.payload.challenge=="string"?l.payload.challenge:"",$=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!Fm({serverPublicKey:f,origin:v,devicePublicKey:w,challenge:C,serverAttestation:$})){t.wakeError="Server attestation verification failed",Ze(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&L(l.payload)){let f=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";Ze(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),bg({layout:e.layout,writerAgent:f,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(v=>{P(A,{type:"writer.status",payload:v},e.layout)})}if(l.type==="install.bundle.update"&&L(l.payload)){let f=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";f.length>0&&n(f,"install.bundle.update")}if(l.type==="system.ack"){As(e.layout,{wsUrl:e.wsUrl});let f=L(l.payload)?l.payload:null,v=Em(f);v!==null&&n(v)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&L(l.payload)&&xm(l.payload),l.type==="automations.run"&&L(l.payload)&&km(l.payload),l.type==="terminal.stream.accepted"&&L(l.payload)){let f=typeof l.payload.runId=="string"?l.payload.runId:"";if(f.length>0){let v=Iu(f);for(let w of v)P(A,{type:"terminal.stream.chunk",payload:{runId:f,chunk:w},requestId:b})}}if(l.type==="agent.agentRun.list"&&P(A,{type:"dashboard.agentRun.list.result",payload:{runs:wu(e.layout)},requestId:b}),l.type==="agent.agentRun.get"&&L(l.payload)){let f=typeof l.payload.runId=="string"?l.payload.runId:"",v=f.length>0?so(e.layout,f):null;P(A,{type:"dashboard.agentRun.get.result",payload:{run:v},requestId:b})}if(l.type==="command.claude.run"&&L(l.payload)){let f=l.payload.prompt,v=typeof l.payload.writerAgent=="string"&&M(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",w=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,C=l.payload.sessionContinuation===!0,$=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,Se=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,et=ti(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),Dt=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof f=="string"&&f.trim().length>0&&(console.log(`[agent-witch] Running ${v} task (${C?"continue":"first"})\u2026`),w!==void 0&&Se!==void 0&&Bg.set(w,Se),w!==void 0&&($g.set(w,et),Gg.set(w,f.trim()),qe({projectFolderPath:et})),OS(e,v,f.trim(),b,A,w,C,Se,$,et,Dt))}if(l.type==="shell.session.open"&&L(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",v=typeof l.payload.cols=="number"?l.payload.cols:120,w=typeof l.payload.rows=="number"?l.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),$u({shellSessionId:f,cwd:e.workspace,cols:v,rows:w,send:C=>{P(A,C)},requestId:b}))}if(l.type==="shell.session.close"&&L(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";f.length>0&&Wr(f,v=>{P(A,v)},b)}if(l.type==="shell.input"&&L(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",v=typeof l.payload.data=="string"?l.payload.data:"";f.length>0&&v.length>0&&Uu(f,v)}if(l.type==="shell.resize"&&L(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",v=typeof l.payload.cols=="number"?l.payload.cols:0,w=typeof l.payload.rows=="number"?l.payload.rows:0;f.length>0&&v>0&&w>0&&ju(f,v,w)}if(l.type==="command.writer.session.end"&&L(l.payload)){let f=l.payload.writerAgent;typeof f=="string"&&M(f)&&nm(f)}if(l.type==="command.writer.session.start"&&L(l.payload)){let f=l.payload.writerAgent,v=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof f=="string"&&M(f)&&v.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),MS(e,f,v,b,A))}if(l.type==="command.claude.stop"&&L(l.payload)){let f=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),fm(e,ri(A),f,b))}if(l.type==="command.claude.input_respond"&&L(l.payload)){let f=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",v=typeof l.payload.response=="string"?l.payload.response.trim():"",w=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",C=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",$=typeof l.payload.question=="string"?l.payload.question:"";f.length>0&&v.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),pm(e,{agentRunId:f,originalPrompt:w,partialOutput:C,question:$,response:v,shellSessionId:Bg.get(f)},b,ri(A)))}if(l.type==="dispatch.approval.required"&&L(l.payload)){let f=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",v=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${v}`),process.platform==="darwin"&&(0,ni.spawn)("osascript",["-e",`display notification "${v.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&L(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),FS(e,l.payload,b,A)),l.type==="harness.export.request"&&L(l.payload)){let f=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",v=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,w=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(C=>typeof C=="string"):[];f.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:C}=await Promise.resolve().then(()=>(Ug(),Dg)),$=C(w,e.email);P(A,{type:"harness.export.result",payload:{success:$.length>0,borrowerUserId:f,...v!==void 0?{targetDeviceId:v}:{},sets:$,errorMessage:$.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(l.type==="harness.manifest.request"&&To(A,e.layout),l.type==="command.claude.result"&&L(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let f=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,v=ti(f!==void 0?$g.get(f):void 0),w=f!==void 0?Gg.get(f)??"":"";$m({layout:e.layout,text:l.payload.output,source:f??"command.claude.result",projectFolderPath:v}),w.trim().length>0&&gg({layout:e.layout,projectFolderPath:v,entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:w,output:l.payload.output,createdAt:new Date().toISOString()}})}},S=()=>{if(t.stopped)return;i(),c();let l=new hr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),As(e.layout,{wsUrl:e.wsUrl}),cm(vn({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),dm(e.layout);let A=K(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Hm({layout:e.layout,origin:A,...b!==void 0&&b.length>0?{claimToken:b}:{}});P(l,{type:"agent.register",payload:{role:"agent",hostname:Ft.default.hostname(),macOsUsername:Ft.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),To(l,e.layout),gm(e,l),p(l)}),l.on("message",A=>{let b=typeof A=="string"?A:A.toString("utf8");try{let f=JSON.parse(b);if(!L(f))return;h(f,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",()=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1,console.log("[agent-witch] Disconnected from server."),d()}),l.on("error",A=>{t.wakeError=A.message,console.error(`[agent-witch] Socket error: ${A.message}`)})};return{connect:S,startLocalHealthCheck:u,stop:()=>{t.stopped=!0,s(),a(),i(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:dg(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,S()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(To(l,e.layout),{ok:!0})}}},jS=async()=>{let e=()=>{let r=vi();if(r.length===0){let n=Vg(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=Vg(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},zg=async()=>{at("agent-witch"),Od().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=_();Ud(t);let r=Hd({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),mn();let n=await jS(),o=n.map(d=>US(d)),s=o[0];s===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),la(),process.exit(0));let a=()=>{for(let d of o)d.reviveWebSocket()},i=()=>{},c=await cu({reconnectWebSockets:a,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),i()}});cg({layout:n[0].layout,controllers:{getStatus:s.getStatus,reviveWebSocket:a,reportHarnessManifestIfConnected:s.reportHarnessManifestIfConnected}});for(let d of o)d.startLocalHealthCheck(),d.connect();console.log(`[agent-witch] Bridging ${o.length} account profile(s) in one process.`);let u=en(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Qr(),i()});i=()=>{u(),c.stop(),la(),console.log("[agent-witch] Shutting down.");for(let d of o)d.stop();process.exit(0)},process.on("SIGINT",()=>{i()}),process.on("SIGTERM",()=>{i()})},BS=zg;if(lt($S.url)&&!X()){let e=process.argv.indexOf("report");e>=0&&process.exit(cn(process.argv.slice(e))),zg()}});tn();qo();dn();var Ki="20.x",qi="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var xf=e=>[`Node.js ${Ki} or newer is required (found ${e}).`,qi].join(" "),Ji=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${xf(process.version)}
`),process.exit(1))};var KS={},GS=async()=>{at("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ut(),fn)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},VS=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Hs(),xc)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},zS=async()=>{if(!lt(KS.url))return;Ji();let e=process.argv.indexOf("report");e>=0&&process.exit(cn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await GS();return}if(t==="wake"){await VS();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(qg(),Kg));await r()};zS();
