#!/usr/bin/env node
"use strict";var Wf=Object.create;var jo=Object.defineProperty;var xf=Object.getOwnPropertyDescriptor;var Ef=Object.getOwnPropertyNames;var kf=Object.getPrototypeOf,Lf=Object.prototype.hasOwnProperty;var p=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var D=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Me=(e,t)=>{for(var r in t)jo(e,r,{get:t[r],enumerable:!0})},Rf=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Ef(t))!Lf.call(e,o)&&o!==r&&jo(e,o,{get:()=>t[o],enumerable:!(n=xf(t,o))||n.enumerable});return e};var f=(e,t,r)=>(r=e!=null?Wf(kf(e)):{},Rf(t||!e||!e.__esModule?jo(r,"default",{value:e,enumerable:!0}):r,e));var Si,vi,$o=p(()=>{"use strict";Si=new Set(["","loginwindow","_mbsetupuser","root"]),vi=5e3});var bi,Zr,Bo=p(()=>{"use strict";bi=require("node:child_process"),Zr=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,bi.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ee,st=p(()=>{"use strict";ee=()=>!0});var Qr,wi,Cf,en,Go=p(()=>{"use strict";Qr=f(require("node:path")),wi=require("node:url");st();Cf={},en=()=>{if(ee()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Qr.default.dirname(Qr.default.resolve(e))}return Qr.default.dirname((0,wi.fileURLToPath)(Cf.url))}});var se,_i,at=p(()=>{"use strict";se="agent-witch.js",_i="command"});var zo,Li,W,Pf,Vo,Ko,If,Tf,Nf,Of,He,Mf,Wi,xi,Ei,qo,ae,tn,rn,ki,it,lt,_,Ri,Jo,Ci,Pi,nn,Ii,Ti,ie,Yo,Hf,Ff,_e,Df,x,E=p(()=>{"use strict";zo=f(require("node:fs")),Li=f(require("node:os")),W=f(require("node:path"));Go();at();Pf=en(),Vo=".agent-witch",Ko=".local-agent-witch",If=47892,Tf=47893,Nf="com.agent-witch",Of="com.local-agent-witch",He="profiles",Mf="active-profile.json",Wi="harness",xi="sets",Ei="manifest.json",qo="projects",ae="logs",tn="agent-witch.log",rn="agent-witch.error.log",ki="reports",it="device-keypair.json",lt=e=>e.trim().toLowerCase(),_=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return W.default.resolve(e);let t=W.default.resolve(Pf),r=W.default.basename(t),n=W.default.basename(W.default.dirname(t));return r==="app"&&(n===Vo||n===Ko)?W.default.dirname(t):r===Vo||r===Ko?t:W.default.join(Li.default.homedir(),Vo)},Ri=(e=_())=>W.default.join(e,"app"),Jo=(e=_())=>W.default.join(Ri(e),se),Ci=(e,t,r)=>t!==null?W.default.join(e,He,t,r):W.default.join(e,r),Pi=e=>Ci(e.installDir,e.profileEmail,qo),nn=e=>Ci(e.installDir,e.profileEmail,ae),Ii=e=>e.profileEmail!==null?W.default.join(e.installDir,He,e.profileEmail,it):W.default.join(e.installDir,it),Ti=e=>W.default.basename(e)===Ko,ie=(e=_())=>Ti(e)?Of:Nf,Yo=(e=_())=>Ti(e)?Tf:If,Hf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return lt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?lt(t):null},Ff=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_e=(e=_())=>{let t=W.default.join(e,Mf);if(!zo.default.existsSync(t))return null;try{let r=JSON.parse(zo.default.readFileSync(t,"utf8"));if(Ff(r)&&typeof r.email=="string"&&r.email.trim().length>0)return lt(r.email)}catch{return null}return null},Df=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?lt(r):null}let t=Hf();return t!==null?t:_e()},x=e=>{let t=_(),r=Ri(t),n=Jo(t),o=Df(e);if(o!==null){let y=W.default.join(t,He,o),v=W.default.join(y,Wi),h=W.default.join(y,qo),l=W.default.join(y,ae),A=W.default.join(y,ki),S=W.default.join(y,it),g=W.default.join(y,ae,tn),b=W.default.join(y,ae,rn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:h,logsDir:l,mainLogPath:g,errorLogPath:b,reportsDir:A,deviceKeypairPath:S,configPath:W.default.join(y,"config.json"),harnessRootDir:v,harnessManifestPath:W.default.join(v,Ei),harnessSetsDir:W.default.join(v,xi)}}let s=W.default.join(t,Wi),a=W.default.join(t,qo),i=W.default.join(t,ae),c=W.default.join(t,ki),u=W.default.join(t,it),d=W.default.join(t,ae,tn),m=W.default.join(t,ae,rn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:a,logsDir:i,mainLogPath:d,errorLogPath:m,reportsDir:c,deviceKeypairPath:u,configPath:W.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:W.default.join(s,Ei),harnessSetsDir:W.default.join(s,xi)}}});var on,Xo,Ni,U,Oi,Fe=p(()=>{"use strict";on=f(require("node:fs")),Xo=f(require("node:path"));E();Ni=e=>{let t=Xo.default.join(e,He);return on.default.existsSync(t)?on.default.readdirSync(t).filter(r=>on.default.statSync(Xo.default.join(t,r)).isDirectory()).map(r=>lt(r)).toSorted():[]},U=(e=_())=>{let t=ie(e);return[{profileEmail:Ni(e)[0]??null,launchAgentLabel:t}]},Oi=(e=_())=>Ni(e)});var sn,ct,Mi,Zo,Hi,Uf,Fi,jf,$f,zt,Bf,Di,an=p(()=>{"use strict";sn=require("node:child_process"),ct=f(require("node:fs")),Mi=f(require("node:os")),Zo=f(require("node:path")),Hi=require("node:util");Fe();E();Uf=(0,Hi.promisify)(sn.execFile),Fi=()=>Zo.default.join(Mi.default.homedir(),"Library","LaunchAgents"),jf=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Uf("launchctl",["bootout",r]).catch(()=>{})},$f=e=>{let t=Zo.default.join(Fi(),`${e}.plist`);ct.default.existsSync(t)&&ct.default.unlinkSync(t)},zt=(e=_())=>{let t=ie(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of U(e))r.add(o.launchAgentLabel);let n=Fi();if(ct.default.existsSync(n))for(let o of ct.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},Bf=e=>{(0,sn.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Di=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=_();if(!ct.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=zt(e);for(let r of t)await jf(r),$f(r);return Bf(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var ln,Qo=p(()=>{"use strict";Bo();an();E();ln=(e=_())=>{for(let t of zt(e))Zr(t)}});var Ui,Gf,Vf,ji,$i=p(()=>{"use strict";Ui=require("node:child_process");$o();Gf=e=>e.trim().toLowerCase(),Vf=e=>e==null?!1:!Si.has(Gf(e)),ji=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Ui.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Vf(t)?t:null}catch{return null}}});var Gi,Bi,le,Kt=p(()=>{"use strict";Gi=f(require("node:os"));$i();Bi=e=>e.trim().toLowerCase(),le=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?ji():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??Gi.default.userInfo().username;return Bi(r)===Bi(n)}});var dt,cn,dn=p(()=>{"use strict";$o();Qo();Kt();dt=e=>{le()||(ln(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},cn=(e,t=vi)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{le()||e()},t);return()=>{clearInterval(r)}}});var Vi,zi,Ki,un,mn,qi,Ji,ut=p(()=>{"use strict";Vi=".agent-witch",zi="memory",Ki="project.json",un="chunks.ndjson",mn="runs.ndjson",qi="reports",Ji=".json"});var Yi,pn,es=p(()=>{"use strict";Yi=f(require("node:path"));ut();pn=(e,t)=>Yi.default.join(e.trim(),`${t.trim()}${Ji}`)});var De,Xi,Zi=p(()=>{"use strict";at();De=e=>`'${e.replace(/'/g,"'\\''")}'`,Xi=e=>{let t=`${e.installDir.trim()}/${"app"}/${se}`,r=[De("node"),De(t),"report","write","--key",De(e.reportKey.trim()),"--agent-run-id",De(e.agentRunId.trim()),"--status",De(e.status),"--summary",De(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",De(e.details.trim())),r.join(" ")}});var te,Qi,zf,el,gn=p(()=>{"use strict";es();Zi();te={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Qi=e=>e===te.COMPLETED||e===te.FAILED,zf=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),el=(e,t)=>{let r=pn(t.reportsDir,t.reportKey),n=Xi({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:te.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${zf({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var qt,rl,tl,nl,Kf,fn,qf,Jf,Jt,hn,ol,sl,Yt=p(()=>{"use strict";qt=f(require("node:fs")),rl=f(require("node:path"));gn();es();E();tl=50,nl=e=>{let t=x(),r=pn(t.reportsDir,e);return qt.default.mkdirSync(rl.default.dirname(r),{recursive:!0}),r},Kf=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},fn=e=>{let t=nl(e);if(!qt.default.existsSync(t))return null;try{let r=JSON.parse(qt.default.readFileSync(t,"utf8"));return Kf(r)?r:null}catch{return null}},qf=(e,t)=>{let r=[...e,t];return r.length>tl?r.slice(r.length-tl):r},Jf=e=>{let t=nl(e.reportKey);qt.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Jt=e=>{let t=fn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:qf(t?.history??[],n)};return Jf(o),o},hn=e=>{let t=fn(e.reportKey);return t!==null?t:Jt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:te.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},ol=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},sl=e=>{if(e===null||!Qi(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===te.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Yf,Xf,Xt,al,yn,ts=p(()=>{"use strict";gn();Yt();Yf=new Set(Object.values(te)),Xf=e=>Yf.has(e),Xt=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},al=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},yn=e=>{if(e[0]!=="write")return al(),1;let r=Xt(e,"--key"),n=Xt(e,"--agent-run-id"),o=Xt(e,"--status"),s=Xt(e,"--summary"),a=Xt(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!Xf(o)?(al(),1):(Jt({reportKey:r,agentRunId:n,status:o,userSummary:s,details:a}),0)}});var rs,il,mt,An=p(()=>{"use strict";rs=f(require("node:path")),il=require("node:url");st();mt=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=rs.default.resolve(t);return ee()?r===rs.default.resolve(__filename):r===(0,il.fileURLToPath)(e)}});var Zt,ns,eh,th,ul,j,ml,Sn,Ue=p(()=>{"use strict";Zt=f(require("node:fs")),ns=f(require("node:path"));E();eh="install-version.json",th=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ul=(e=_())=>ns.default.join(e,eh),j=(e=_())=>{let t=ul(e);if(!Zt.default.existsSync(t))return null;try{let r=JSON.parse(Zt.default.readFileSync(t,"utf8"));return!th(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ml=(e,t=_())=>{let r=ul(t);Zt.default.mkdirSync(ns.default.dirname(r),{recursive:!0}),Zt.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Sn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var gl,fl,hl,yl,Al,Qt,rh,nh,oh,pl,We,er=p(()=>{"use strict";gl=require("node:child_process"),fl=f(require("node:fs")),hl=f(require("node:os")),yl=f(require("node:path")),Al=require("node:util");Kt();Qt=(0,Al.promisify)(gl.execFile),rh=e=>yl.default.join(hl.default.homedir(),"Library","LaunchAgents",`${e}.plist`),nh=async e=>{try{return await Qt("launchctl",["print",e]),!0}catch{return!1}},oh=async(e,t,r)=>{await nh(t)&&await Qt("launchctl",["bootout",t]).catch(()=>{}),await Qt("launchctl",["bootstrap",e,r]),await Qt("launchctl",["enable",t])},pl=async e=>{try{return await Qt("launchctl",["kickstart","-k",e]),!0}catch{return!1}},We=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!le())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await pl(n))return{ok:!0};let o=rh(e);if(!fl.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await oh(r,n,o),await pl(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var sh,vn,os=p(()=>{"use strict";Bo();an();Fe();E();sh=(e=_())=>{let t=new Set(U(e).map(r=>r.launchAgentLabel));return zt(e).filter(r=>!t.has(r))},vn=(e=_())=>{for(let t of sh(e))Zr(t)}});var J,pt=p(()=>{"use strict";J=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Sl,je,ss,ah,ih,vl,gt,bn,as=p(()=>{"use strict";Sl=require("node:crypto"),je=f(require("node:fs")),ss=f(require("node:path"));E();ah="self-update-log.ndjson",ih=100,vl=(e=_())=>{let t=x(),r=t.installDir===e?t.logsDir:nn({installDir:e,profileEmail:t.profileEmail});return ss.default.join(r,ah)},gt=(e,t=_())=>{let r={id:(0,Sl.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=vl(t);je.default.mkdirSync(ss.default.dirname(n),{recursive:!0});let o=je.default.existsSync(n)?je.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-ih+1)),JSON.stringify(r)];return je.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},bn=(e=20,t=_())=>{let r=vl(t);if(!je.default.existsSync(r))return[];let n=je.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var bl,wl,_l=p(()=>{"use strict";bl="deps.tar.gz",wl="deps"});var xl,xe,$e,lh,El,kl,Ll=p(()=>{"use strict";xl=require("node:child_process"),xe=f(require("node:fs")),$e=f(require("node:path"));_l();lh=e=>$e.default.join(e,"app",wl),El=e=>{let t=$e.default.join(e,"app"),r=$e.default.join(t,bl);xe.default.existsSync(r)&&(xe.default.rmSync(lh(e),{recursive:!0,force:!0}),xe.default.mkdirSync(t,{recursive:!0}),(0,xl.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),xe.default.rmSync(r,{force:!0}))},kl=e=>{xe.default.rmSync($e.default.join(e,"node_modules"),{recursive:!0,force:!0}),xe.default.rmSync($e.default.join(e,"package.json"),{force:!0}),xe.default.rmSync($e.default.join(e,"package-lock.json"),{force:!0})}});var _n={};Me(_n,{buildAgentWitchSelfUpdateStatus:()=>cs,fetchAgentWitchRemoteInstallBundleVersion:()=>is,runAgentWitchSelfUpdate:()=>ls});var Ee,wn,Rl,ch,Cl,is,dh,uh,tr,ls,cs,ft=p(()=>{"use strict";Ee=f(require("node:fs")),wn=f(require("node:path"));Ue();er();os();Fe();pt();E();at();as();Ll();Rl=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ch=e=>{let t=_e(e),r=t===null?x():x(t);if(!Ee.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Ee.default.readFileSync(r.configPath,"utf8"));return!Rl(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},Cl=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!Rl(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},is=async e=>(await Cl(e))?.bundleVersion??null,dh=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=wn.default.join(t,r);Ee.default.mkdirSync(wn.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());Ee.default.writeFileSync(o,s),r.endsWith(".js")&&Ee.default.chmodSync(o,493)},uh=async()=>{vn();let e=U();for(let t of e)await We(t.launchAgentLabel)},tr=(e,t)=>({localBundleVersion:t,...e}),ls=async e=>{let t=_(),r=j(t),n=r?.bundleVersion??null,o=ch(t),s=o===null?r?.appOrigin??null:J(o);if(s===null){let c=tr({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return gt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let a=await Cl(s);if(a===null){let c=tr({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return gt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||Sn(n,a.bundleVersion))){let c=tr({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return gt({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),c}try{for(let d of a.scripts)await dh(s,t,d);let c=wn.default.join(t,se);Ee.default.existsSync(c)&&Ee.default.rmSync(c,{force:!0}),El(t),kl(t),ml({bundleVersion:a.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await uh();let u=tr({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return gt({event:"update_applied",ok:!0,message:u.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),u}catch(c){let u=c instanceof Error?c.message:"Agent Witch self-update failed.",d=tr({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},n);return gt({event:"update_failed",ok:!1,message:u,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}},cs=()=>{let e=_();return{local:j(e),logs:bn(20,e)}}});var Wn,rr,Pl,ds,nr,us=p(()=>{"use strict";Wn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=i=>n.find(c=>c.type===i)?.value??"0",s=o("weekday"),a={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:a[s]??0}},rr=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=Wn(o,t),a=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-a*6e4)},Pl=e=>e>=1&&e<=5,ds=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Wn(t,"UTC")},nr=e=>{let t=e.from??new Date,r=Wn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return rr(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=rr(r,e.timeZone,n,0),s=Wn(o,e.timeZone),a=t.getTime()>=o.getTime();if(e.preset==="daily")return a?rr(ds(r),e.timeZone,n,0):o;if(!a&&Pl(s.weekday))return o;let i=r;for(let c=0;c<8;c+=1)if(i=ds(i),Pl(i.weekday))return rr(i,e.timeZone,n,0);return rr(ds(r),e.timeZone,n,0)}});var mh,xn,ms=p(()=>{"use strict";mh=e=>e==="hourly"||e==="daily"||e==="weekdays",xn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",a=typeof t.schedulePreset=="string"?t.schedulePreset:"",i=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!mh(a)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:a,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:i,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var or,En,Il,Tl,ps,ke,Nl,Ol,Ml,Hl,sr=p(()=>{"use strict";or=f(require("node:fs")),En=f(require("node:path"));ms();Il="automations.json",Tl=e=>e.profileEmail!==null?En.default.join(e.installDir,"profiles",e.profileEmail,Il):En.default.join(e.installDir,Il),ps=()=>({version:1,automations:[]}),ke=e=>{let t=Tl(e);if(!or.default.existsSync(t))return ps();try{let r=JSON.parse(or.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?ps():{version:1,automations:r.automations.flatMap(o=>{let s=xn(o);return s!==null?[s]:[]})}}catch{return ps()}},Nl=(e,t)=>{let r=Tl(e);or.default.mkdirSync(En.default.dirname(r),{recursive:!0}),or.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Ol=(e,t)=>{Nl(e,{version:1,automations:t})},Ml=(e,t)=>{let n=ke(e).automations.filter(o=>o.id!==t.id);Nl(e,{version:1,automations:[...n,t]})},Hl=(e,t)=>ke(e).automations.find(r=>r.id===t)??null});var ph,gh,kn,gs=p(()=>{"use strict";us();ms();sr();E();ph=e=>e!==void 0&&e.trim().length>0?x(e.trim()):x(),gh=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??nr({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??nr({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},kn=e=>{let t=ph(e.profileEmail),r=ke(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let a=xn(s);return a!==null?[gh(a,n.get(a.id))]:[]});return Ol(t,o),{ok:!0,writtenCount:o.length}}});var Fl,Dl=p(()=>{"use strict";Fl="x-agent-witch-token"});var ht,fs,Ul,Ln,jl,ar=p(()=>{"use strict";Dl();pt();ht=e=>{let t=J(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},fs=e=>({[Fl]:e,"Content-Type":"application/json"}),Ul=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:fs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,a=typeof s.id=="string"?s.id:"",i=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return a.length===0||i.length===0?null:{id:a,prompt:i,writerAgent:c}}catch{return null}},Ln=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:fs(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},jl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:fs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Rn,ir,N,Le,$l,yt,Be=p(()=>{"use strict";Rn={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ir=e=>e.trim().length>0,N=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Le=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:ir(t)?t.trim():Rn.claudeCommand,codexCommand:ir(r)?r.trim():Rn.codexCommand,cursorCommand:ir(n)?n.trim():Rn.cursorCommand,antigravityCommand:ir(o)?o.trim():Rn.antigravityCommand}},$l=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},yt=(e,t,r,n)=>{let o=t.trim();if(!ir(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var Bl,At,Cn=p(()=>{"use strict";Bl=require("node:child_process");Be();At=(e,t,r)=>new Promise(n=>{if(!N(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=yt(t,r,Le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Bl.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),a=[];s.stdout?.on("data",i=>{a.push(i.toString("utf8"))}),s.stderr?.on("data",i=>{a.push(i.toString("utf8"))}),s.on("close",i=>{n({exitCode:i??-1,output:a.join("")})}),s.on("error",i=>{n({exitCode:-1,output:i.message})})})});var hs,fh,hh,yh,Ah,Sh,vh,$,Ge=p(()=>{"use strict";hs=f(require("node:fs"));E();fh="ws://localhost:3000/api/agent-witch/ws",hh="claude",yh="codex",Ah="cursor",Sh="agy",vh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=x();if(!hs.default.existsSync(e.configPath))return null;try{let t=JSON.parse(hs.default.readFileSync(e.configPath,"utf8"));if(!vh(t))return null;let r=typeof t.wsUrl=="string"&&t.wsUrl.length>0?t.wsUrl:fh,n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),o=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:r,workspace:n,claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:hh,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:yh,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:Ah,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:Sh,pairingToken:o,layout:e}}catch{return null}}});var Gl,ys,St,Pn=p(()=>{"use strict";Gl=require("node:crypto");ar();us();Cn();sr();Ge();ys=!1,St=async e=>{if(ys)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=ht({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=Hl(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};ys=!0;let o=(0,Gl.randomUUID)();try{let s=await At(t,"claude-cli",n.prompt);await jl(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let a=new Date,i=nr({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:a});return Ml(t.layout,{...n,lastRunAt:a.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:i.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{ys=!1}}});function lr(e){return(0,Vl.createHash)("sha256").update(e.trim()).digest("hex")}var Vl,As=p(()=>{"use strict";Vl=require("node:crypto")});var bh,zl,wh,_h,cr,Kl,Ss=p(()=>{"use strict";bh=["agentwitch.com","www.agentwitch.com"],zl=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,wh=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},_h=e=>{let t=wh(e);return!!(bh.includes(t)||zl.test(e.trim().toLowerCase()))},cr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return _h(r)?zl.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Kl=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:cr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var In,ql,Wh,xh,Jl,Yl,vs,Tn,Nn=p(()=>{"use strict";In=f(require("node:fs")),ql=f(require("node:path")),Wh="wake-port.json",xh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jl=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Yl=e=>ql.default.join(e,Wh),vs=e=>{let t=Yl(e);if(!In.default.existsSync(t))return null;try{let r=JSON.parse(In.default.readFileSync(t,"utf8"));if(xh(r)&&Jl(r.wakePort))return r.wakePort}catch{return null}return null},Tn=(e,t)=>{if(!Jl(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Yl(e);In.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var yw,Aw,Sw,Y,Xl,vt=p(()=>{"use strict";Nn();E();Nn();yw=Yo(),Aw=`${ie()}-wake`,Sw=ie(),Y=()=>{let e=_(),t=vs(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return Yo()},Xl=e=>{let t=_();vs(t)===null&&Tn(t,e)}});var bt,dr,Eh,Zl,Ql,ec=p(()=>{"use strict";bt=f(require("node:fs")),dr=f(require("node:path"));As();E();Eh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zl=e=>{if(!bt.default.existsSync(e))return null;try{let t=JSON.parse(bt.default.readFileSync(e,"utf8"));return!Eh(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:lr(t.pairingToken.trim())}catch{return null}},Ql=(e=_())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(Zl(dr.default.join(e,"config.json")));let o=dr.default.join(e,He);if(!bt.default.existsSync(o))return t;for(let s of bt.default.readdirSync(o)){let a=dr.default.join(o,s);bt.default.statSync(a).isDirectory()&&n(Zl(dr.default.join(a,"config.json")))}return t}});var tc,rc=p(()=>{"use strict";tc=["rule","skill","command","instruction","agent"]});var nc,kh,Lh,oc,sc=p(()=>{"use strict";rc();nc=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kh=e=>typeof e=="string"&&tc.includes(e),Lh=e=>{if(!nc(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!kh(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},oc=e=>{if(!nc(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let a=Lh(s);return a===null?[]:[a]});return{name:t,slug:r,items:o}}});var ac,Rh,Ch,Ph,Ih,Th,Nh,Oh,Mh,On,bs=p(()=>{"use strict";ac=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Rh=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Ch=(e,t)=>{let r=Rh(t),n=ac(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Ph=(e,t,r)=>{let n=Ch(t,r);return`shared/items/${e}/${n}`},Ih=["rules","skills","commands","instructions","agents"],Th=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Nh=(e,t)=>[...e.filter(n=>n.id!==t.id),t],Oh=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Mh=e=>({id:e.id,kind:e.kind,title:e.title,path:Ph(e.id,e.kind,e.title)}),On=e=>{let t=new Date().toISOString(),r=e.existingManifest??Th(e.hostname,t),n=ac(e.bundle.slug),o=Oh(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...Ih.map(u=>`sets/${n}/${u}`),"shared/items"],{files:a,nextItems:i}=e.bundle.items.reduce((u,d)=>{let m=Mh(d);return{files:[...u.files,{relativePath:m.path,content:d.content}],nextItems:Nh(u.nextItems,m)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:i}}},directories:s,files:a}}});var Re,ic,Mn,Hh,lc,cc=p(()=>{"use strict";Re=f(require("node:fs")),ic=f(require("node:os")),Mn=f(require("node:path"));bs();E();Hh=e=>{if(!Re.default.existsSync(e))return null;try{let t=JSON.parse(Re.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},lc=e=>{let t=x(e.profileEmail);try{let r=Hh(t.harnessManifestPath),n=On({bundle:e.bundle,hostname:ic.default.hostname(),existingManifest:r});Re.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)Re.default.mkdirSync(Mn.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=Mn.default.join(t.harnessRootDir,o.relativePath);Re.default.mkdirSync(Mn.default.dirname(s),{recursive:!0}),Re.default.writeFileSync(s,o.content)}return Re.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var dc,uc,Hn,ws=p(()=>{"use strict";dc=require("node:child_process"),uc=f(require("node:fs"));Kt();E();Hn=(e=_())=>{let t=Jo(e);if(!uc.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!le())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=_e(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,dc.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var _s,ce,Ow,wt=p(()=>{"use strict";E();_s="connection-health.json",ce=12e4,Ow=`${ie()}-watchdog`});var mc,Ve,Ws,Fh,Dh,Uh,pc,jh,gc,Fn,Dn=p(()=>{"use strict";mc=require("node:crypto"),Ve=f(require("node:fs")),Ws=f(require("node:path"));E();Fh="watchdog-log.ndjson",Dh=200,Uh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pc=(e=_())=>{let t=x(),r=t.installDir===e?t.logsDir:nn({installDir:e,profileEmail:t.profileEmail});return Ws.default.join(r,Fh)},jh=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Uh(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},gc=(e,t=_())=>{let r={id:(0,mc.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=pc(t);Ve.default.mkdirSync(Ws.default.dirname(n),{recursive:!0});let o=Ve.default.existsSync(n)?Ve.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Dh+1)),JSON.stringify(r)];return Ve.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Fn=(e=20,t=_())=>{let r=pc(t);if(!Ve.default.existsSync(r))return[];let n=Ve.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=jh(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var ur,Un,$h,fc,re,xs,de,mr=p(()=>{"use strict";ur=f(require("node:fs")),Un=f(require("node:path"));wt();$h=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fc=e=>e.profileEmail===null?Un.default.join(e.installDir,_s):Un.default.join(e.installDir,"profiles",e.profileEmail,_s),re=e=>{let t=fc(e);if(!ur.default.existsSync(t))return null;try{let r=JSON.parse(ur.default.readFileSync(t,"utf8"));return!$h(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},xs=(e,t)=>{let r=fc(e),n=re(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};ur.default.mkdirSync(Un.default.dirname(r),{recursive:!0}),ur.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},de=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var hc,yc,Bh,pr,Es=p(()=>{"use strict";hc=require("node:child_process"),yc=require("node:util"),Bh=(0,yc.promisify)(hc.execFile),pr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Bh("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Ac,ks=p(()=>{"use strict";Ac="watchdog-reinstall-state.json"});var Sc={};Me(Sc,{verifyAgentWitchReviveAfterKickstart:()=>zh});var Vh,zh,vc=p(()=>{"use strict";ks();mr();Es();E();Vh=e=>new Promise(t=>{setTimeout(t,e)}),zh=async e=>{if(await Vh(e.verifyDelayMs??3e3),!await pr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?x():x(e.profileEmail),n=re(r);return!de(n,e.staleAfterMs)}});var gr,Ls,qh,bc,Jh,wc,_c,Wc=p(()=>{"use strict";gr=f(require("node:fs")),Ls=f(require("node:path"));ks();E();qh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bc=e=>Ls.default.join(e,Ac),Jh=(e=_())=>{let t=bc(e);if(!gr.default.existsSync(t))return null;try{let r=JSON.parse(gr.default.readFileSync(t,"utf8"));return!qh(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},wc=(e=_(),t=Date.now())=>{let r=Jh(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},_c=(e=_(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=bc(e);return gr.default.mkdirSync(Ls.default.dirname(n),{recursive:!0}),gr.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var xc,_t,Ec,kc,Lc,Yh,Xh,Rc,Zh,Qh,Cc,Pc=p(()=>{"use strict";xc=require("node:child_process"),_t=f(require("node:fs")),Ec=f(require("node:os")),kc=f(require("node:path")),Lc=require("node:util");Ue();pt();E();Yh=(0,Lc.promisify)(xc.execFile),Xh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Rc=e=>{let t=_e(e),r=t===null?x():x(t);if(!_t.default.existsSync(r.configPath))return null;try{let n=JSON.parse(_t.default.readFileSync(r.configPath,"utf8"));return!Xh(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},Zh=e=>Rc(e)?.wsUrl??null,Qh=e=>{let t=Zh(e);return t!==null?J(t):j(e)?.appOrigin??null},Cc=async e=>{let t=e?.installDir??_(),r=Rc(t),n=r!==null?J(r.wsUrl):Qh(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let a=kc.default.join(Ec.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{_t.default.writeFileSync(a,await s.text(),{encoding:"utf8",mode:448});let i=e?.profileEmail??_e(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...i===null?{}:{AGENT_WITCH_PROFILE:i}};return await Yh("bash",[a],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Agent Witch reinstall script failed."}}finally{_t.default.existsSync(a)&&_t.default.unlinkSync(a)}}});var Ic={};Me(Ic,{attemptAgentWitchWatchdogReinstall:()=>ey});var ey,Tc=p(()=>{"use strict";Wc();er();Pc();ey=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!wc())return{attempted:!1,ok:!1,targets:e};_c();let r=await Cc();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await We(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var Nc,Oc,Mc,ty,ry,ny,Rs,Cs=p(()=>{"use strict";Kt();wt();mr();Es();er();Fe();E();ws();Dn();Nc=e=>e===null?x():x(e),Oc=async(e,t,r)=>{if(!await pr(e))return"not_running";let o=Nc(t),s=re(o);return de(s,r)?"stale_connection":"healthy"},Mc=async e=>{let t=e?.staleAfterMs??ce,r=_(),n=U(r);return Promise.all(n.map(async o=>{let s=await Oc(o.launchAgentLabel,o.profileEmail,t),a=Nc(o.profileEmail),i=re(a),c=await pr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:i,isConnectionStale:de(i,t),needsRevive:s!=="healthy",reason:s}}))},ty=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},ry=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",ny=async e=>{let t=await We(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(vc(),Sc)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Rs=async e=>{if(!le())return{ok:!0,targets:[]};let t=e?.staleAfterMs??ce,r=_(),n=U(r),o=[];for(let d of n){let m=await Oc(d.launchAgentLabel,d.profileEmail,t);if(m==="healthy"){o.push({launchAgentLabel:d.launchAgentLabel,profileEmail:d.profileEmail,revived:!1,reason:m});continue}o.push(await ny({launchAgentLabel:d.launchAgentLabel,profileEmail:d.profileEmail,reason:m,staleAfterMs:t}))}if(o.length===0){let d=Hn();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:d.ok,reason:"not_running",...d.errorMessage!==void 0?{errorMessage:d.errorMessage}:{}})}let s=!1,a=!1,i,c=o;if(o.some(d=>d.reason!=="healthy"&&!d.revived))try{let{attemptAgentWitchWatchdogReinstall:d}=await Promise.resolve().then(()=>(Tc(),Ic)),m=await d(o);s=m.attempted,a=m.ok,i=m.errorMessage,c=[...m.targets]}catch(d){s=!0,a=!1,i=d instanceof Error?d.message:"Watchdog reinstall helper is unavailable."}let u={ok:c.some(d=>d.revived||d.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:a,...i!==void 0?{reinstallErrorMessage:i}:{}}:{}};return e?.skipLog!==!0&&gc({event:ry(c,u.ok,{reinstallAttempted:s,reinstallOk:a}),ok:u.ok,message:ty(c,{reinstallAttempted:s,reinstallOk:a,reinstallErrorMessage:i}),targets:c}),u}});var Hc,Fc,Dc=p(()=>{"use strict";Hc=f(require("node:os"));wt();Dn();Cs();Fc=async()=>{let e=await Mc(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Hc.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:ce,healthyProfileCount:t,profiles:e,lastLog:Fn(1)[0]??null}}});var Uc={};Me(Uc,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ns,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>js,buildAgentWitchWakeHealthResponse:()=>Os,buildAgentWitchWakeIdentityResponse:()=>Ms,buildAgentWitchWatchdogStatus:()=>Fs,installHarnessFromWakeServer:()=>$n,readAgentWitchSelfUpdateLogEntries:()=>Gn,readAgentWitchWatchdogLogEntries:()=>Bn,restartAgentWitchFromWakeServer:()=>Us,reviveAgentWitchWebSocketFromWakeServer:()=>Ds,runAgentWitchSelfUpdateFromWakeServer:()=>$s,runAgentWitchUninstallLocalFromWakeServer:()=>Bs,runAutomationFromWakeServer:()=>Ts,syncAutomationsFromWakeServer:()=>Is,wakeAgentWitchLaunchAgents:()=>Hs});var jn,Ps,$n,Is,Ts,Ns,Os,Ms,Hs,Bn,Fs,Ds,Us,js,Gn,$s,Bs,Gs=p(()=>{"use strict";gs();Pn();sr();As();Ge();jn=f(require("node:os"));Ss();vt();er();Fe();ec();sc();cc();ws();Dc();Dn();ft();an();as();Cs();Ps=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$n=e=>{if(!Ps(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=oc(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!cr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=lc({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},Is=e=>{if(!Ps(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!cr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=kn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Ts=async e=>{if(!Ps(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:cr(t)?St(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ns=()=>{let e=$(),t=e!==null?ke(e.layout):{version:1,automations:[]};return{ok:!0,hostname:jn.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},Os=()=>{let e=U();return{ok:!0,port:Y(),hostname:jn.default.hostname(),profileCount:e.length}},Ms=()=>{let e=U(),t=$()?.pairingToken.trim()??"",r=t.length>0?lr(t):null,n=Ql();return{hostname:jn.default.hostname(),port:Y(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Hs=async()=>{let e=U(),t=[];for(let r of e){let n=await We(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Hn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Bn=(e=20)=>Fn(e),Fs=Fc,Ds=Rs,Us=Rs,js=cs,Gn=(e=20)=>bn(e),$s=e=>ls(e),Bs=()=>Di()});var ue=D((M0,Bc)=>{"use strict";var jc=["nodebuffer","arraybuffer","fragments"],$c=typeof Blob<"u";$c&&jc.push("blob");Bc.exports={BINARY_TYPES:jc,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:$c,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var fr=D((H0,Vn)=>{"use strict";var{EMPTY_BUFFER:oy}=ue(),Vs=Buffer[Symbol.species];function sy(e,t){if(e.length===0)return oy;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Vs(r.buffer,r.byteOffset,n):r}function Gc(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function Vc(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function ay(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function zs(e){if(zs.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Vs(e):ArrayBuffer.isView(e)?t=new Vs(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),zs.readOnly=!1),t}Vn.exports={concat:sy,mask:Gc,toArrayBuffer:ay,toBuffer:zs,unmask:Vc};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Vn.exports.mask=function(t,r,n,o,s){s<48?Gc(t,r,n,o,s):e.mask(t,r,n,o,s)},Vn.exports.unmask=function(t,r){t.length<32?Vc(t,r):e.unmask(t,r)}}catch{}});var qc=D((F0,Kc)=>{"use strict";var zc=Symbol("kDone"),Ks=Symbol("kRun"),qs=class{constructor(t){this[zc]=()=>{this.pending--,this[Ks]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Ks]()}[Ks](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[zc])}}};Kc.exports=qs});var Et=D((D0,Zc)=>{"use strict";var hr=require("zlib"),Jc=fr(),iy=qc(),{kStatusCode:Yc}=ue(),ly=Buffer[Symbol.species],cy=Buffer.from([0,0,255,255]),Kn=Symbol("permessage-deflate"),me=Symbol("total-length"),Wt=Symbol("callback"),Ce=Symbol("buffers"),xt=Symbol("error"),zn,Js=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!zn){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;zn=new iy(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Wt];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){zn.add(o=>{this._decompress(t,r,(s,a)=>{o(),n(s,a)})})}compress(t,r,n){zn.add(o=>{this._compress(t,r,(s,a)=>{o(),n(s,a)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?hr.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=hr.createInflateRaw({...this._options.zlibInflateOptions,windowBits:a}),this._inflate[Kn]=this,this._inflate[me]=0,this._inflate[Ce]=[],this._inflate.on("error",uy),this._inflate.on("data",Xc)}this._inflate[Wt]=n,this._inflate.write(t),r&&this._inflate.write(cy),this._inflate.flush(()=>{let s=this._inflate[xt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let a=Jc.concat(this._inflate[Ce],this._inflate[me]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[me]=0,this._inflate[Ce]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,a)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?hr.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=hr.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:a}),this._deflate[me]=0,this._deflate[Ce]=[],this._deflate.on("data",dy)}this._deflate[Wt]=n,this._deflate.write(t),this._deflate.flush(hr.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Jc.concat(this._deflate[Ce],this._deflate[me]);r&&(s=new ly(s.buffer,s.byteOffset,s.length-4)),this._deflate[Wt]=null,this._deflate[me]=0,this._deflate[Ce]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};Zc.exports=Js;function dy(e){this[Ce].push(e),this[me]+=e.length}function Xc(e){if(this[me]+=e.length,this[Kn]._maxPayload<1||this[me]<=this[Kn]._maxPayload){this[Ce].push(e);return}this[xt]=new RangeError("Max payload size exceeded"),this[xt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[xt][Yc]=1009,this.removeListener("data",Xc),this.reset()}function uy(e){if(this[Kn]._inflate=null,this[xt]){this[Wt](this[xt]);return}e[Yc]=1007,this[Wt](e)}});var kt=D((U0,qn)=>{"use strict";var{isUtf8:Qc}=require("buffer"),{hasBlob:my}=ue(),py=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function gy(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Ys(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function fy(e){return my&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}qn.exports={isBlob:fy,isValidStatusCode:gy,isValidUTF8:Ys,tokenChars:py};if(Qc)qn.exports.isValidUTF8=function(e){return e.length<24?Ys(e):Qc(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");qn.exports.isValidUTF8=function(t){return t.length<32?Ys(t):e(t)}}catch{}});var ta=D((j0,ad)=>{"use strict";var{Writable:hy}=require("stream"),ed=Et(),{BINARY_TYPES:yy,EMPTY_BUFFER:td,kStatusCode:Ay,kWebSocket:Sy}=ue(),{concat:Xs,toArrayBuffer:vy,unmask:by}=fr(),{isValidStatusCode:wy,isValidUTF8:rd}=kt(),Jn=Buffer[Symbol.species],V=0,nd=1,od=2,sd=3,Zs=4,Qs=5,Yn=6,ea=class extends hy{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||yy[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[Sy]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=V}_write(t,r,n){if(this._opcode===8&&this._state==V)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Jn(n.buffer,n.byteOffset+t,n.length-t),new Jn(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Jn(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case V:this.getInfo(t);break;case nd:this.getPayloadLength16(t);break;case od:this.getPayloadLength64(t);break;case sd:this.getMask();break;case Zs:this.getData(t);break;case Qs:case Yn:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[ed.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=nd:this._payloadLength===127?this._state=od:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=sd:this._state=Zs}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Zs}getData(t){let r=td;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&by(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Qs,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[ed.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let a=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(a);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let a=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(a);return}this._fragments.push(s)}this.dataMessage(r),this._state===V&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=V;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=Xs(n,r):this._binaryType==="arraybuffer"?o=vy(Xs(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=V):(this._state=Yn,setImmediate(()=>{this.emit("message",o,!0),this._state=V,this.startLoop(t)}))}else{let o=Xs(n,r);if(!this._skipUTF8Validation&&!rd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Qs||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=V):(this._state=Yn,setImmediate(()=>{this.emit("message",o,!1),this._state=V,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,td),this.end();else{let n=t.readUInt16BE(0);if(!wy(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Jn(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!rd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=V;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=V):(this._state=Yn,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=V,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let a=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(a,this.createError),a.code=s,a[Ay]=o,a}};ad.exports=ea});var oa=D((B0,cd)=>{"use strict";var{Duplex:$0}=require("stream"),{randomFillSync:_y}=require("crypto"),{types:{isUint8Array:Wy}}=require("util"),id=Et(),{EMPTY_BUFFER:xy,kWebSocket:Ey,NOOP:ky}=ue(),{isBlob:Lt,isValidStatusCode:Ly}=kt(),{mask:ld,toBuffer:ze}=fr(),z=Symbol("kByteLength"),Ry=Buffer.alloc(4),Xn=8*1024,Ke,Rt=Xn,X=0,Cy=1,Py=2,ra=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=X,this.onerror=ky,this[Ey]=void 0}static frame(t,r){let n,o=!1,s=2,a=!1;r.mask&&(n=r.maskBuffer||Ry,r.generateMask?r.generateMask(n):(Rt===Xn&&(Ke===void 0&&(Ke=Buffer.alloc(Xn)),_y(Ke,0,Xn),Rt=0),n[0]=Ke[Rt++],n[1]=Ke[Rt++],n[2]=Ke[Rt++],n[3]=Ke[Rt++]),a=(n[0]|n[1]|n[2]|n[3])===0,s=6);let i;typeof t=="string"?(!r.mask||a)&&r[z]!==void 0?i=r[z]:(t=Buffer.from(t),i=t.length):(i=t.length,o=r.mask&&r.readOnly&&!a);let c=i;i>=65536?(s+=8,c=127):i>125&&(s+=2,c=126);let u=Buffer.allocUnsafe(o?i+s:s);return u[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(u[0]|=64),u[1]=c,c===126?u.writeUInt16BE(i,2):c===127&&(u[2]=u[3]=0,u.writeUIntBE(i,4,6)),r.mask?(u[1]|=128,u[s-4]=n[0],u[s-3]=n[1],u[s-2]=n[2],u[s-1]=n[3],a?[u,t]:o?(ld(t,n,u,s,i),[u]):(ld(t,n,t,0,i),[u,t])):[u,t]}close(t,r,n,o){let s;if(t===void 0)s=xy;else{if(typeof t!="number"||!Ly(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let i=Buffer.byteLength(r);if(i>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+i),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(Wy(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let a={[z]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==X?this.enqueue([this.dispatch,s,!1,a,o]):this.sendFrame(e.frame(s,a),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Lt(t)?(o=t.size,s=!1):(t=ze(t),o=t.length,s=ze.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[z]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Lt(t)?this._state!==X?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==X?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Lt(t)?(o=t.size,s=!1):(t=ze(t),o=t.length,s=ze.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[z]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Lt(t)?this._state!==X?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==X?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}send(t,r,n){let o=this._extensions[id.extensionName],s=r.binary?2:1,a=r.compress,i,c;typeof t=="string"?(i=Buffer.byteLength(t),c=!1):Lt(t)?(i=t.size,c=!1):(t=ze(t),i=t.length,c=ze.readOnly),this._firstFragment?(this._firstFragment=!1,a&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(a=i>=o._threshold),this._compress=a):(a=!1,s=0),r.fin&&(this._firstFragment=!0);let u={[z]:i,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:a};Lt(t)?this._state!==X?this.enqueue([this.getBlobData,t,this._compress,u,n]):this.getBlobData(t,this._compress,u,n):this._state!==X?this.enqueue([this.dispatch,t,this._compress,u,n]):this.dispatch(t,this._compress,u,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[z],this._state=Py,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let i=new Error("The socket was closed while the blob was being read");process.nextTick(na,this,i,o);return}this._bufferedBytes-=n[z];let a=ze(s);r?this.dispatch(a,r,n,o):(this._state=X,this.sendFrame(e.frame(a,n),o),this.dequeue())}).catch(s=>{process.nextTick(Iy,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[id.extensionName];this._bufferedBytes+=n[z],this._state=Cy,s.compress(t,n.fin,(a,i)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");na(this,c,o);return}this._bufferedBytes-=n[z],this._state=X,n.readOnly=!1,this.sendFrame(e.frame(i,n),o),this.dequeue()})}dequeue(){for(;this._state===X&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][z],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][z],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};cd.exports=ra;function na(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function Iy(e,t,r){na(e,t,r),e.onerror(t)}});var Ad=D((G0,yd)=>{"use strict";var{kForOnEventAttribute:yr,kListener:sa}=ue(),dd=Symbol("kCode"),ud=Symbol("kData"),md=Symbol("kError"),pd=Symbol("kMessage"),gd=Symbol("kReason"),Ct=Symbol("kTarget"),fd=Symbol("kType"),hd=Symbol("kWasClean"),pe=class{constructor(t){this[Ct]=null,this[fd]=t}get target(){return this[Ct]}get type(){return this[fd]}};Object.defineProperty(pe.prototype,"target",{enumerable:!0});Object.defineProperty(pe.prototype,"type",{enumerable:!0});var qe=class extends pe{constructor(t,r={}){super(t),this[dd]=r.code===void 0?0:r.code,this[gd]=r.reason===void 0?"":r.reason,this[hd]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[dd]}get reason(){return this[gd]}get wasClean(){return this[hd]}};Object.defineProperty(qe.prototype,"code",{enumerable:!0});Object.defineProperty(qe.prototype,"reason",{enumerable:!0});Object.defineProperty(qe.prototype,"wasClean",{enumerable:!0});var Pt=class extends pe{constructor(t,r={}){super(t),this[md]=r.error===void 0?null:r.error,this[pd]=r.message===void 0?"":r.message}get error(){return this[md]}get message(){return this[pd]}};Object.defineProperty(Pt.prototype,"error",{enumerable:!0});Object.defineProperty(Pt.prototype,"message",{enumerable:!0});var Ar=class extends pe{constructor(t,r={}){super(t),this[ud]=r.data===void 0?null:r.data}get data(){return this[ud]}};Object.defineProperty(Ar.prototype,"data",{enumerable:!0});var Ty={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[yr]&&o[sa]===t&&!o[yr])return;let n;if(e==="message")n=function(s,a){let i=new Ar("message",{data:a?s:s.toString()});i[Ct]=this,Zn(t,this,i)};else if(e==="close")n=function(s,a){let i=new qe("close",{code:s,reason:a.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});i[Ct]=this,Zn(t,this,i)};else if(e==="error")n=function(s){let a=new Pt("error",{error:s,message:s.message});a[Ct]=this,Zn(t,this,a)};else if(e==="open")n=function(){let s=new pe("open");s[Ct]=this,Zn(t,this,s)};else return;n[yr]=!!r[yr],n[sa]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[sa]===t&&!r[yr]){this.removeListener(e,r);break}}};yd.exports={CloseEvent:qe,ErrorEvent:Pt,Event:pe,EventTarget:Ty,MessageEvent:Ar};function Zn(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Qn=D((V0,Sd)=>{"use strict";var{tokenChars:Sr}=kt();function ne(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Ny(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,a,i,c=-1,u=-1,d=-1,m=0;for(;m<e.length;m++)if(u=e.charCodeAt(m),a===void 0)if(d===-1&&Sr[u]===1)c===-1&&(c=m);else if(m!==0&&(u===32||u===9))d===-1&&c!==-1&&(d=m);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);d===-1&&(d=m);let v=e.slice(c,d);u===44?(ne(t,v,r),r=Object.create(null)):a=v,c=d=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(i===void 0)if(d===-1&&Sr[u]===1)c===-1&&(c=m);else if(u===32||u===9)d===-1&&c!==-1&&(d=m);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);d===-1&&(d=m),ne(r,e.slice(c,d),!0),u===44&&(ne(t,a,r),r=Object.create(null),a=void 0),c=d=-1}else if(u===61&&c!==-1&&d===-1)i=e.slice(c,m),c=d=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(o){if(Sr[u]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:n||(n=!0),o=!1}else if(s)if(Sr[u]===1)c===-1&&(c=m);else if(u===34&&c!==-1)s=!1,d=m;else if(u===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(u===34&&e.charCodeAt(m-1)===61)s=!0;else if(d===-1&&Sr[u]===1)c===-1&&(c=m);else if(c!==-1&&(u===32||u===9))d===-1&&(d=m);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);d===-1&&(d=m);let v=e.slice(c,d);n&&(v=v.replace(/\\/g,""),n=!1),ne(r,i,v),u===44&&(ne(t,a,r),r=Object.create(null),a=void 0),i=void 0,c=d=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||u===32||u===9)throw new SyntaxError("Unexpected end of input");d===-1&&(d=m);let y=e.slice(c,d);return a===void 0?ne(t,y,r):(i===void 0?ne(r,y,!0):n?ne(r,i,y.replace(/\\/g,"")):ne(r,i,y),ne(t,a,r)),t}function Oy(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(a=>a===!0?o:`${o}=${a}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Sd.exports={format:Oy,parse:Ny}});var no=D((q0,Pd)=>{"use strict";var My=require("events"),Hy=require("https"),Fy=require("http"),wd=require("net"),Dy=require("tls"),{randomBytes:Uy,createHash:jy}=require("crypto"),{Duplex:z0,Readable:K0}=require("stream"),{URL:aa}=require("url"),Pe=Et(),$y=ta(),By=oa(),{isBlob:Gy}=kt(),{BINARY_TYPES:vd,CLOSE_TIMEOUT:Vy,EMPTY_BUFFER:eo,GUID:zy,kForOnEventAttribute:ia,kListener:Ky,kStatusCode:qy,kWebSocket:I,NOOP:_d}=ue(),{EventTarget:{addEventListener:Jy,removeEventListener:Yy}}=Ad(),{format:Xy,parse:Zy}=Qn(),{toBuffer:Qy}=fr(),Wd=Symbol("kAborted"),la=[8,13],ge=["CONNECTING","OPEN","CLOSING","CLOSED"],eA=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,k=class e extends My{constructor(t,r,n){super(),this._binaryType=vd[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=eo,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),xd(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){vd.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new $y({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new By(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[I]=this,s[I]=this,t[I]=this,o.on("conclude",nA),o.on("drain",oA),o.on("error",sA),o.on("message",aA),o.on("ping",iA),o.on("pong",lA),s.onerror=cA,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",Ld),t.on("data",ro),t.on("end",Rd),t.on("error",Cd),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Pe.extensionName]&&this._extensions[Pe.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){B(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),kd(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){ca(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||eo,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){ca(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||eo,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){ca(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Pe.extensionName]||(o.compress=!1),this._sender.send(t||eo,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){B(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(k,"CONNECTING",{enumerable:!0,value:ge.indexOf("CONNECTING")});Object.defineProperty(k.prototype,"CONNECTING",{enumerable:!0,value:ge.indexOf("CONNECTING")});Object.defineProperty(k,"OPEN",{enumerable:!0,value:ge.indexOf("OPEN")});Object.defineProperty(k.prototype,"OPEN",{enumerable:!0,value:ge.indexOf("OPEN")});Object.defineProperty(k,"CLOSING",{enumerable:!0,value:ge.indexOf("CLOSING")});Object.defineProperty(k.prototype,"CLOSING",{enumerable:!0,value:ge.indexOf("CLOSING")});Object.defineProperty(k,"CLOSED",{enumerable:!0,value:ge.indexOf("CLOSED")});Object.defineProperty(k.prototype,"CLOSED",{enumerable:!0,value:ge.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(k.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(k.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[ia])return t[Ky];return null},set(t){for(let r of this.listeners(e))if(r[ia]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[ia]:!0})}})});k.prototype.addEventListener=Jy;k.prototype.removeEventListener=Yy;Pd.exports=k;function xd(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Vy,protocolVersion:la[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!la.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${la.join(", ")})`);let s;if(t instanceof aa)s=t;else try{s=new aa(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let a=s.protocol==="wss:",i=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!a&&!i?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:i&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;to(e,l);return}let u=a?443:80,d=Uy(16).toString("base64"),m=a?Hy.request:Fy.request,y=new Set,v;if(o.createConnection=o.createConnection||(a?rA:tA),o.defaultPort=o.defaultPort||u,o.port=s.port||u,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":d,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(v=new Pe({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=Xy({[Pe.extensionName]:v.offer()})),r.length){for(let l of r){if(typeof l!="string"||!eA.test(l)||y.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");y.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),i){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let h;if(o.followRedirects){if(e._redirects===0){e._originalIpc=i,e._originalSecure=a,e._originalHostOrSocketPath=i?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[A,S]of Object.entries(l))n.headers[A.toLowerCase()]=S}else if(e.listenerCount("redirect")===0){let l=i?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!a)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),h=e._req=m(o),e._redirects&&e.emit("redirect",e.url,h)}else h=e._req=m(o);o.timeout&&h.on("timeout",()=>{B(e,h,"Opening handshake has timed out")}),h.on("error",l=>{h===null||h[Wd]||(h=e._req=null,to(e,l))}),h.on("response",l=>{let A=l.headers.location,S=l.statusCode;if(A&&o.followRedirects&&S>=300&&S<400){if(++e._redirects>o.maxRedirects){B(e,h,"Maximum redirects exceeded");return}h.abort();let g;try{g=new aa(A,t)}catch{let w=new SyntaxError(`Invalid URL: ${A}`);to(e,w);return}xd(e,g,r,n)}else e.emit("unexpected-response",h,l)||B(e,h,`Unexpected server response: ${l.statusCode}`)}),h.on("upgrade",(l,A,S)=>{if(e.emit("upgrade",l),e.readyState!==k.CONNECTING)return;h=e._req=null;let g=l.headers.upgrade;if(g===void 0||g.toLowerCase()!=="websocket"){B(e,A,"Invalid Upgrade header");return}let b=jy("sha1").update(d+zy).digest("base64");if(l.headers["sec-websocket-accept"]!==b){B(e,A,"Invalid Sec-WebSocket-Accept header");return}let w=l.headers["sec-websocket-protocol"],C;if(w!==void 0?y.size?y.has(w)||(C="Server sent an invalid subprotocol"):C="Server sent a subprotocol but none was requested":y.size&&(C="Server sent no subprotocol"),C){B(e,A,C);return}w&&(e._protocol=w);let G=l.headers["sec-websocket-extensions"];if(G!==void 0){if(!v){B(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let be;try{be=Zy(G)}catch{B(e,A,"Invalid Sec-WebSocket-Extensions header");return}let ot=Object.keys(be);if(ot.length!==1||ot[0]!==Pe.extensionName){B(e,A,"Server indicated an extension that was not requested");return}try{v.accept(be[Pe.extensionName])}catch{B(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Pe.extensionName]=v}e.setSocket(A,S,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(h,e):h.end()}function to(e,t){e._readyState=k.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function tA(e){return e.path=e.socketPath,wd.connect(e)}function rA(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=wd.isIP(e.host)?"":e.host),Dy.connect(e)}function B(e,t,r){e._readyState=k.CLOSING;let n=new Error(r);Error.captureStackTrace(n,B),t.setHeader?(t[Wd]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(to,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function ca(e,t,r){if(t){let n=Gy(t)?t.size:Qy(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${ge[e.readyState]})`);process.nextTick(r,n)}}function nA(e,t){let r=this[I];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[I]!==void 0&&(r._socket.removeListener("data",ro),process.nextTick(Ed,r._socket),e===1005?r.close():r.close(e,t))}function oA(){let e=this[I];e.isPaused||e._socket.resume()}function sA(e){let t=this[I];t._socket[I]!==void 0&&(t._socket.removeListener("data",ro),process.nextTick(Ed,t._socket),t.close(e[qy])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function bd(){this[I].emitClose()}function aA(e,t){this[I].emit("message",e,t)}function iA(e){let t=this[I];t._autoPong&&t.pong(e,!this._isServer,_d),t.emit("ping",e)}function lA(e){this[I].emit("pong",e)}function Ed(e){e.resume()}function cA(e){let t=this[I];t.readyState!==k.CLOSED&&(t.readyState===k.OPEN&&(t._readyState=k.CLOSING,kd(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function kd(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function Ld(){let e=this[I];if(this.removeListener("close",Ld),this.removeListener("data",ro),this.removeListener("end",Rd),e._readyState=k.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[I]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",bd),e._receiver.on("finish",bd))}function ro(e){this[I]._receiver.write(e)||this.pause()}function Rd(){let e=this[I];e._readyState=k.CLOSING,e._receiver.end(),this.end()}function Cd(){let e=this[I];this.removeListener("error",Cd),this.on("error",_d),e&&(e._readyState=k.CLOSING,this.destroy())}});var Od=D((Y0,Nd)=>{"use strict";var J0=no(),{Duplex:dA}=require("stream");function Id(e){e.emit("close")}function uA(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Td(e){this.removeListener("error",Td),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function mA(e,t){let r=!0,n=new dA({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,a){let i=!a&&n._readableState.objectMode?s.toString():s;n.push(i)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(Id,n);return}let a=!1;e.once("error",function(c){a=!0,s(c)}),e.once("close",function(){a||s(o),process.nextTick(Id,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,a){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,a)});return}e.send(o,a)},n.on("end",uA),n.on("error",Td),n}Nd.exports=mA});var da=D((X0,Md)=>{"use strict";var{tokenChars:pA}=kt();function gA(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let a=e.charCodeAt(o);if(n===-1&&pA[a]===1)r===-1&&(r=o);else if(o!==0&&(a===32||a===9))n===-1&&r!==-1&&(n=o);else if(a===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let i=e.slice(r,n);if(t.has(i))throw new SyntaxError(`The "${i}" subprotocol is duplicated`);t.add(i),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}Md.exports={parse:gA}});var Bd=D((Q0,$d)=>{"use strict";var fA=require("events"),oo=require("http"),{Duplex:Z0}=require("stream"),{createHash:hA}=require("crypto"),Hd=Qn(),Je=Et(),yA=da(),AA=no(),{CLOSE_TIMEOUT:SA,GUID:vA,kWebSocket:bA}=ue(),wA=/^[+/0-9A-Za-z]{22}==$/,Fd=0,Dd=1,jd=2,ua=class extends fA{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:SA,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:AA,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=oo.createServer((n,o)=>{let s=oo.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=_A(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,a)=>{this.handleUpgrade(o,s,a,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=Fd}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===jd){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(vr,this);return}if(t&&this.once("close",t),this._state!==Dd)if(this._state=Dd,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(vr,this):process.nextTick(vr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{vr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",Ud);let s=t.headers["sec-websocket-key"],a=t.headers.upgrade,i=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Ye(this,t,r,405,"Invalid HTTP method");return}if(a===void 0||a.toLowerCase()!=="websocket"){Ye(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!wA.test(s)){Ye(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(i!==13&&i!==8){Ye(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){br(r,400);return}let c=t.headers["sec-websocket-protocol"],u=new Set;if(c!==void 0)try{u=yA.parse(c)}catch{Ye(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let d=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&d!==void 0){let y=new Je({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let v=Hd.parse(d);v[Je.extensionName]&&(y.accept(v[Je.extensionName]),m[Je.extensionName]=y)}catch{Ye(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let y={origin:t.headers[`${i===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(y,(v,h,l,A)=>{if(!v)return br(r,h||401,l,A);this.completeUpgrade(m,s,u,t,r,n,o)});return}if(!this.options.verifyClient(y))return br(r,401)}this.completeUpgrade(m,s,u,t,r,n,o)}completeUpgrade(t,r,n,o,s,a,i){if(!s.readable||!s.writable)return s.destroy();if(s[bA])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>Fd)return br(s,503);let u=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${hA("sha1").update(r+vA).digest("base64")}`],d=new this.options.WebSocket(null,void 0,this.options);if(n.size){let m=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;m&&(u.push(`Sec-WebSocket-Protocol: ${m}`),d._protocol=m)}if(t[Je.extensionName]){let m=t[Je.extensionName].params,y=Hd.format({[Je.extensionName]:[m]});u.push(`Sec-WebSocket-Extensions: ${y}`),d._extensions=t}this.emit("headers",u,o),s.write(u.concat(`\r
`).join(`\r
`)),s.removeListener("error",Ud),d.setSocket(s,a,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(d),d.on("close",()=>{this.clients.delete(d),this._shouldEmitClose&&!this.clients.size&&process.nextTick(vr,this)})),i(d,o)}};$d.exports=ua;function _A(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function vr(e){e._state=jd,e.emit("close")}function Ud(){this.destroy()}function br(e,t,r,n){r=r||oo.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${oo.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Ye(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let a=new Error(o);Error.captureStackTrace(a,Ye),e.emit("wsClientError",a,r,t)}else br(r,n,o,s)}});var WA,xA,EA,kA,LA,RA,Gd,CA,wr,Vd=p(()=>{WA=f(Od(),1),xA=f(Qn(),1),EA=f(Et(),1),kA=f(ta(),1),LA=f(oa(),1),RA=f(da(),1),Gd=f(no(),1),CA=f(Bd(),1),wr=Gd.default});var ma=p(()=>{"use strict"});var fe,_r=p(()=>{"use strict";fe=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var It,Xe,zd,IA,pa,ga,Kd,qd,Jd,Yd,fa,ha=p(()=>{"use strict";It=f(require("node:fs")),Xe=f(require("node:os")),zd=f(require("node:path"));ma();_r();IA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pa=(e=Xe.default.hostname())=>zd.default.join(Xe.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),ga=e=>{if(!It.default.existsSync(e))return null;try{let t=JSON.parse(It.default.readFileSync(e,"utf8"));return!IA(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},Kd=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},qd=(e,t)=>{It.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Jd=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??pa(),n=ga(r);if(n!==null&&n.pid!==process.pid&&fe(n.pid)&&Kd(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Xe.default.hostname(),macOsUsername:Xe.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return qd(r,o),{ok:!0}},Yd=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??pa(),n=ga(r);return n!==null&&n.pid!==process.pid&&fe(n.pid)&&Kd(n)?{ok:!1}:(qd(r,{hostname:Xe.default.hostname(),macOsUsername:Xe.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},fa=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??pa();ga(r)?.pid===process.pid&&It.default.existsSync(r)&&It.default.unlinkSync(r)}});var ya,Wr,TA,NA,OA,MA,Xd,Zd=p(()=>{"use strict";ya=require("node:child_process"),Wr=f(require("node:path"));_r();at();TA=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),NA=(e,t)=>{if(TA(e)||!/\bnode\b/.test(e))return!1;let r=Wr.default.resolve(t),n=Wr.default.join(r,"app",se),o=Wr.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(a=>a.length>0).some(a=>{if(a===se||a==="agent-witch.ts")return e.includes(r);try{let i=Wr.default.resolve(a);return i===n||i===o}catch{return a===n||a===o}})},OA=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,ya.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},MA=(e,t,r)=>{let n=OA(r),o=[];for(let s of e.split(`
`)){let a=s.trim();if(a.length===0)continue;let i=/^(\d+)\s+(.+)$/.exec(a);if(i===null)continue;let c=Number.parseInt(i[1]??"",10),u=i[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||NA(u,t)&&o.push(c)}return o},Xd=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,ya.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=MA(r,e.installDir,t),o=[];for(let s of n)if(fe(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var xr,Er,Qd,HA,eu,tu=p(()=>{"use strict";xr=f(require("node:fs")),Er=f(require("node:path"));E();Qd=(e,t)=>{!xr.default.existsSync(e)||xr.default.existsSync(t)||(xr.default.mkdirSync(Er.default.dirname(t),{recursive:!0}),xr.default.renameSync(e,t))},HA=e=>{if(e.profileEmail===null)return;let t=Er.default.join(e.installDir,ae);Qd(Er.default.join(t,tn),e.mainLogPath),Qd(Er.default.join(t,rn),e.errorLogPath)},eu=e=>{let t=x();e!==void 0&&t.installDir!==e||HA(t)}});var ru,nu,ou,su,au=p(()=>{"use strict";ru=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),nu=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?ru(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?ru(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},ou=e=>{let t=e.watchdogLogs.map(nu).join(""),r=e.updateLogs.map(nu).join("");return`<!doctype html>
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
</html>`},su=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var iu,lu,cu=p(()=>{"use strict";iu=f(require("node:net")),lu=()=>new Promise((e,t)=>{let r=iu.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var du,FA,uu,mu=p(()=>{"use strict";du=f(require("node:net"));cu();vt();Nn();E();FA=e=>new Promise(t=>{let r=du.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),uu=async()=>{let e=_(),t=Y();if(await FA(t))return Xl(t),t;let r=await lu();return Tn(e,r),r}});var DA,pu,gu=p(()=>{"use strict";DA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pu=e=>({force:DA(e)&&e.force===!0})});var Aa,UA,Ze,so=p(()=>{"use strict";Aa=f(require("node:os")),UA=e=>{let t=e.trim();return t.startsWith("~/")?`${Aa.default.homedir()}${t.slice(1)}`:t==="~"?Aa.default.homedir():t},Ze=UA});var Qe,Ie,kr=p(()=>{"use strict";Qe=f(require("node:path"));ut();so();Ie=e=>{let t=Ze(e),r=Qe.default.join(t,Vi);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Qe.default.join(r,"rag"),memoryDirPath:Qe.default.join(r,zi),reportsDirPath:Qe.default.join(r,qi),metaFilePath:Qe.default.join(r,Ki),ragChunksFilePath:Qe.default.join(r,"rag",un)}}});var oe,hu,jA,$A,he,Lr=p(()=>{"use strict";oe=f(require("node:fs")),hu=f(require("node:path"));ut();kr();jA=(e,t)=>{if(oe.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};oe.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},$A=e=>{oe.default.existsSync(e.ragChunksFilePath)||oe.default.writeFileSync(e.ragChunksFilePath,"");let t=hu.default.join(e.memoryDirPath,mn);oe.default.existsSync(t)||oe.default.writeFileSync(t,"")},he=e=>{let t=Ie(e.projectFolderPath);return oe.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),oe.default.mkdirSync(t.ragDirPath,{recursive:!0}),oe.default.mkdirSync(t.memoryDirPath,{recursive:!0}),jA(t,e),$A(t),{ok:!0,layout:t}}});var BA,yu,Au=p(()=>{"use strict";Lr();BA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yu=e=>{if(!BA(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:he({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var vu,zA,Su,R,GA,VA,Sa,bu=p(()=>{"use strict";vu=f(require("node:http"));Gs();Ss();au();mu();gu();dn();Au();An();st();zA={},Su=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},R=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},GA=e=>{e.writeHead(403),e.end()},VA=async(e,t,r)=>{let n=e.headers.origin,o=Kl(n);try{if(n!==void 0&&n.length>0&&!o.allowed){GA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){R(t,200,Os(),o.headers);return}if(e.method==="GET"&&s==="/identity"){R(t,200,Ms(),o.headers);return}if(e.method==="GET"&&s==="/local"){let a=Bn(50),i=Gn(50);t.writeHead(200,su()),t.end(ou({port:r,watchdogLogs:a,updateLogs:i}));return}if(e.method==="GET"&&s==="/watchdog/status"){let a=await Fs();R(t,200,a,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let a=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;R(t,200,{ok:!0,logs:Bn(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let a=await Ds();R(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/restart"){let a=await Us();R(t,a.ok?200:503,a,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let a=js();R(t,200,{ok:!0,...a},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let a=new URL(e.url??"/update/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;R(t,200,{ok:!0,logs:Gn(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let a=await Su(e),{force:i}=pu(a),c=await $s({force:i});R(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let a=await Bs();R(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/wake"){let a=await Hs();R(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let a=[];for await(let u of e)a.push(Buffer.from(u));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{R(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=$n(i);R(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let a=await Su(e),i=yu(a);R(t,i.ok?200:400,i,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let a=[];for await(let u of e)a.push(Buffer.from(u));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{R(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=$n(i);R(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){R(t,200,Ns(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let a=[];for await(let u of e)a.push(Buffer.from(u));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{R(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Is(i);R(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let a=[];for await(let u of e)a.push(Buffer.from(u));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{R(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await Ts(i);R(t,c.ok?200:503,c,o.headers);return}R(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{R(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},Sa=async()=>{let e=await uu(),t=vu.default.createServer((r,n)=>{VA(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!ee()&&mt(zA.url)&&(async()=>{dt("agent-witch-wake-server");let e=await Sa(),t=cn(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var va,wu=p(()=>{"use strict";sr();Pn();Ge();va=async()=>{let e=$();if(e===null)return;let t=ke(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await St(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var _u,Wu=p(()=>{"use strict";ma();bu();ha();wu();_u=async(e={})=>{let t=await Sa();va();let r=setInterval(()=>{va()},6e4),n=setInterval(()=>{if(!Yd().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var Rr,ao,JA,xu,Eu,io,ku,Lu,ba,Ru,lo,Cu=p(()=>{"use strict";Rr=f(require("node:fs")),ao=f(require("node:path")),JA="pending-run-inputs.json",xu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Eu=e=>{let t=e.profileEmail?ao.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return ao.default.join(t,JA)},io=e=>{let t=Eu(e);if(!Rr.default.existsSync(t))return{};try{let r=JSON.parse(Rr.default.readFileSync(t,"utf8"));return xu(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!xu(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",a=typeof o.partialOutput=="string"?o.partialOutput:"",i=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:a;return s.length===0||i.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:a,question:i,accumulatedOutput:c}]]})):{}}catch{return{}}},ku=(e,t)=>{let r=Eu(e);Rr.default.mkdirSync(ao.default.dirname(r),{recursive:!0}),Rr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Lu=e=>Object.values(io(e)),ba=(e,t)=>io(e)[t]!==void 0,Ru=(e,t)=>{let r=io(e);r[t.agentRunId]=t,ku(e,r)},lo=(e,t)=>{let r=io(e);delete r[t],ku(e,r)}});var wa,Pu=p(()=>{"use strict";wa={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var _a,J_,Iu=p(()=>{"use strict";_a={OPEN:"open",APPROVAL:"approval"},J_=_a.APPROVAL});var Tt,co,Tu,YA,Nu,Ou,Mu,uo,Hu,Wa=p(()=>{"use strict";Tt=f(require("node:fs")),co=f(require("node:path")),Tu="runs",YA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nu=e=>{let t=e.profileEmail!==null?co.default.join(e.installDir,"profiles",e.profileEmail,Tu):co.default.join(e.installDir,Tu);return Tt.default.mkdirSync(t,{recursive:!0}),t},Ou=(e,t)=>co.default.join(Nu(e),`${t}.json`),Mu=(e,t)=>{Tt.default.writeFileSync(Ou(e,t.id),JSON.stringify(t,null,2))},uo=(e,t)=>{let r=Ou(e,t);if(!Tt.default.existsSync(r))return null;try{let n=JSON.parse(Tt.default.readFileSync(r,"utf8"));return!YA(n)||typeof n.id!="string"?null:n}catch{return null}},Hu=e=>{let t=Nu(e),r=Tt.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),a=uo(e,s);a!==null&&n.push(a)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var XA,Fu,Du=p(()=>{"use strict";Pu();Iu();Wa();XA=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?wa.COMPLETED:wa.FAILED,dispatchPolicy:_a.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},Fu=(e,t)=>{let r=XA(t);return Mu(e,r),r}});var Cr,mo,ZA,xa,Uu,ju,$u,Ea,Bu=p(()=>{"use strict";Cr=f(require("node:fs")),mo=f(require("node:path"));ar();ZA="run-completion-outbox.json",xa=e=>{let t=e.profileEmail?mo.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return mo.default.join(t,ZA)},Uu=e=>{let t=xa(e);if(!Cr.default.existsSync(t))return[];try{let r=JSON.parse(Cr.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},ju=(e,t)=>{Cr.default.mkdirSync(mo.default.dirname(xa(e)),{recursive:!0}),Cr.default.writeFileSync(xa(e),JSON.stringify(t,null,2),"utf8")},$u=(e,t)=>{let r=[...Uu(e).filter(n=>n.runId!==t.runId),t];ju(e,r)},Ea=async e=>{if(e.cloudApi===null)return;let t=Uu(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Ln(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);ju(e.layout,r)}});var Gu=p(()=>{"use strict"});var ka,Pr,eS,Nt,Vu=p(()=>{"use strict";Gu();ka=new Map,Pr=e=>{let t=ka.get(e);t!==void 0&&(clearInterval(t),ka.delete(e))},eS=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Nt=(e,t,r,n={})=>{Pr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Pr(t);return}let a=n.onTick?.()??{};eS(e,t,o,a)};s(),ka.set(t,setInterval(s,15e3))}});var La,Ir,Ot,zu,et,Ku,po=p(()=>{"use strict";La=new Set,Ir=new Map,Ot=(e,t)=>{if(t.length===0)return;let r=Ir.get(e)??[];r.push(t),Ir.set(e,r)},zu=e=>{La.add(e);let t=Ir.get(e)??[];return Ir.delete(e),t},et=e=>La.has(e),Ku=e=>{La.delete(e),Ir.delete(e)}});var qu,Ju,Yu,Xu,F,Mt,Zu,Qu,Tr,em,tm,Ra,rm,nm,om,go=p(()=>{"use strict";qu=require("node:crypto"),Ju=f(require("node:fs")),Yu=f(require("node:path")),Xu=require("node:url");_r();st();Go();F=new Map,Zu=async()=>{if(Mt!==void 0)return Mt;try{if(ee()){let e=en(),t=Yu.default.join(e,"deps","node-pty","lib","index.js");if(Ju.default.existsSync(t)){let r=await import((0,Xu.pathToFileURL)(t).href);return Mt=r,r}}return Mt=await import("node-pty"),Mt}catch{return Mt=null,null}},Qu=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},Tr=(e,t,r)=>{let n=F.get(e);if(n!==void 0){F.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},em=(e,t)=>{let r=F.get(e);return r===void 0?!1:(r.pty.write(t),!0)},tm=(e,t,r)=>{let n=F.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Ra=e=>{for(let t of F.values())if(!(t.mode!=="agent"||t.runId!==e))return fe(t.pty.pid);return!1},rm=e=>{for(let[t,r]of F.entries())if(!(r.mode!=="agent"||r.runId!==e)){F.delete(t);try{r.pty.kill()}catch{}return!0}return!1},nm=async e=>{let t=await Zu();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;F.get(e.shellSessionId)!==void 0&&Tr(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let a=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${a}).\r
`},requestId:e.requestId}),!1}return F.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{Qu(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{F.get(e.shellSessionId)?.pty===o&&(F.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},om=async e=>{let t=e.shellSessionId??(0,qu.randomUUID)(),r=await Zu();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return F.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{Qu(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{F.get(t)?.pty===n&&(F.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var fo,sm,am=p(()=>{"use strict";fo="[[AWAITING_INPUT]]",sm=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",fo,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Nr,im,ho=p(()=>{"use strict";am();Nr=e=>{let t=e.indexOf(fo);if(t<0)return null;let n=e.slice(t+fo.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},im=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",sm].join(`
`)});var lm,cm=p(()=>{"use strict";po();go();ho();lm=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(et(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Ot(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await om({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let a=Nr(t.join(""));a!==null&&(r=!0,e.onInputRequired(a))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var dm,um,mm,Te,yo=p(()=>{"use strict";dm=require("node:child_process"),um=f(require("node:fs")),mm=f(require("node:path"));at();Te=(e,t)=>{let r=mm.default.join(e,"app",_i,"ensure-writer.sh");return um.default.existsSync(r)?new Promise((n,o)=>{let s=(0,dm.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",a=>{o(a)}),s.on("close",a=>{if(a===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(a??-1)}`))})}):Promise.resolve()}});var pm,tt,Ao,gm,fm,Ca,hm,Pa,ym,Am,tS,So,rS,nS,Sm,Ia=p(()=>{"use strict";pm=require("node:child_process");Be();yo();tt=new Map,Ao=e=>e==="cursor"||e==="antigravity",gm=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",fm=e=>tt.get(e)?.warmed===!0,Ca=e=>{let t=tt.get(e);tt.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},hm=e=>tt.get(e)?.conversationStarted===!0,Pa=e=>{let t=tt.get(e);tt.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},ym=e=>{tt.delete(e)},Am=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",tS={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},So=e=>`${tS[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,rS=(e,t,r,n)=>new Promise(o=>{let s=$l(t,r),a=[],i=(0,pm.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=u=>{let d=u.toString("utf8");a.push(d),n?.(d)};i.stdout?.on("data",c),i.stderr?.on("data",c),i.on("close",u=>{o({exitCode:u??-1,output:a.join("").trim()})}),i.on("error",u=>{o({exitCode:-1,output:u.message})})}),nS=(e,t)=>{let r=So(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Sm=async e=>{if(!N(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Te(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Ao(e.writerAgent)&&Ca(e.writerAgent);let t=await rS(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?nS(e.writerAgent,t.output):So(e.writerAgent)}}});var vm,Or,M,Ta,bm,wm,Na,_m,Wm,xm,oS,ye,vo,Ht,Em,sS,Oa,km,Lm,Rm,Cm=p(()=>{"use strict";vm=require("node:child_process");Be();Cu();Du();Bu();Vu();_r();po();go();ho();cm();Ia();Yt();ho();Or=new Map,M=new Map,Ta=new Set,bm=130,wm=`

Stopped by user.`,Na=null,_m=e=>{Na=e},Wm=async e=>{await Ea({layout:e,cloudApi:Na})},xm=e=>{let t=Or.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:fe(t.pid)},oS=e=>Le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),ye=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},vo=(e,t,r,n,o,s,a=!1)=>({awaitingInput:a,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let i=fn(s),c=M.get(r);if(i!==null&&c!==void 0){let u=sl(i),d=xm(r)||Ra(r);u!==null&&!d&&Ht(e,t,r,n,u.exitCode,u.output,c.originalPrompt)}return ol(i)}}),Ht=(e,t,r,n,o,s,a)=>{let i=o,c=s;r!==void 0&&Ta.has(r)&&(Ta.delete(r),i=bm,c=c.trim().length>0&&!c.includes("Stopped by user.")?`${c.trim()}${wm}`:"Stopped by user."),r!==void 0&&(Pr(r),et(r)&&(ye(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),Ku(r)),Fu(e.layout,{agentRunId:r,originalPrompt:a,exitCode:i,output:c,layout:e.layout}),$u(e.layout,{runId:r,exitCode:i,output:c,createdAt:new Date().toISOString()}),Ea({layout:e.layout,cloudApi:Na}),M.delete(r),Or.delete(r),lo(e.layout,r)),ye(t,{type:"command.claude.result",payload:{exitCode:i,output:c,...r!==void 0?{agentRunId:r}:{}},requestId:n})},Em=(e,t,r,n,o,s,a)=>{let i=M.get(r),c=i?.accumulatedOutput??s;Ru(e.layout,{agentRunId:r,originalPrompt:a,partialOutput:s,question:o,accumulatedOutput:c}),Nt(t,r,()=>ba(e.layout,r),vo(e,t,r,n,i?.projectFolderPath,i?.reportKey,!0)),ye(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},sS=(e,t,r,n,o,s,a)=>{let i=[],c=!1,u=d=>{if(!(o===void 0||d.length===0)){if(et(o)){ye(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:d},requestId:n});return}Ot(o,d)}};if(o!==void 0){let d=M.get(o);Or.set(o,t),M.set(o,{originalPrompt:s,writerAgent:a,projectFolderPath:d?.projectFolderPath,reportKey:d?.reportKey,accumulatedOutput:d?.accumulatedOutput??""}),ye(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Nt(r,o,()=>xm(o),vo(e,r,o,n,d?.projectFolderPath,d?.reportKey))}t.stdout?.on("data",d=>{let m=d.toString("utf8");if(i.push(m),u(m),c||o===void 0)return;let y=Nr(i.join(""));if(y!==null){c=!0,t.kill("SIGTERM");let v=M.get(o),h=[v?.accumulatedOutput??"",y.partialOutput].filter(l=>l.length>0).join(`

`);v!==void 0&&(v.accumulatedOutput=h),Or.delete(o),Em(e,r,o,n,y.question,h,s)}}),t.stderr?.on("data",d=>{let m=d.toString("utf8");i.push(m),u(m)}),t.on("close",d=>{if(c)return;Pa(a);let m=o!==void 0?M.get(o):void 0,y=i.join("").trim(),v=m!==void 0&&m.accumulatedOutput.length>0?`${m.accumulatedOutput}

${y}`.trim():y;Ht(e,r,o,n,d??-1,v,s)}),t.on("error",d=>{c||Ht(e,r,o,n,-1,d.message,s)})},Oa=(e,t,r,n,o,s,a,i,c,u)=>{let d=yt(t,r,oS(e),a);if(d===null){Ht(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let m=()=>{let y=(0,vm.spawn)(d.command,[...d.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});sS(e,y,o,n,s,r,t)};if(s===void 0){m();return}M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:u,accumulatedOutput:M.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&u!==void 0&&u.trim().length>0&&hn({reportKey:u,agentRunId:s,userSummary:"Task started on your Mac."}),Nt(o,s,()=>M.has(s),vo(e,o,s,n,c,u)),lm({socket:o,sendMessage:ye,requestId:n,agentRunId:s,shellSessionId:i,command:d.command,args:d.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:y=>{i!==void 0&&Tr(i,l=>{ye(o,l)},n);let v=M.get(s),h=[v?.accumulatedOutput??"",y.partialOutput].filter(l=>l.length>0).join(`

`);v!==void 0&&(v.accumulatedOutput=h),Em(e,o,s,n,y.question,h,r)},onFinished:(y,v)=>{Pa(t);let h=M.get(s),l=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${v}`.trim():v;Ht(e,o,s,n,y,l,r)}}).then(y=>{if(!y){m();return}Nt(o,s,()=>Ra(s),vo(e,o,s,n,c,u))}).catch(y=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",y instanceof Error?y.message:y),m()})},km=(e,t,r,n)=>{lo(e.layout,t.agentRunId),t.shellSessionId!==void 0&&ye(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=im(t),s=M.get(t.agentRunId),a=s?.writerAgent??"claude-cli",i=s?.projectFolderPath,c=s?.reportKey;Oa(e,a,o,r,n,t.agentRunId,void 0,t.shellSessionId,i,c)},Lm=(e,t)=>{for(let r of Lu(e.layout))M.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Nt(t,r.agentRunId,()=>ba(e.layout,r.agentRunId),{awaitingInput:!0}),ye(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Rm=(e,t,r,n)=>{let o=M.get(r);if(o===void 0)return!1;Ta.add(r),Pr(r);let s=Or.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(rm(r))return!0;lo(e.layout,r);let a=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${wm}`:"Stopped by user.";return Ht(e,t,r,n,bm,a,o.originalPrompt),!0}});var aS,Pm,Im=p(()=>{"use strict";vt();aS=()=>`http://127.0.0.1:${Y()}/restart`,Pm=async()=>{try{let e=await fetch(aS(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var rt,Ma,iS,lS,Ha,nt,bo,Tm,wo=p(()=>{"use strict";rt=f(require("node:fs")),Ma=f(require("node:path")),iS="local-ws-traffic.ndjson",lS=500,Ha=e=>Ma.default.join(e.logsDir,iS),nt=(e,t)=>{let r=Ha(e);rt.default.mkdirSync(Ma.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});rt.default.appendFileSync(r,`${n}
`,"utf8")},bo=(e,t=lS)=>{let r=Ha(e);if(!rt.default.existsSync(r))return[];let o=rt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let a of o)try{let i=JSON.parse(a);typeof i=="object"&&i!==null&&"at"in i&&"direction"in i&&"type"in i&&"summary"in i&&s.push(i)}catch{}return s.reverse()},Tm=e=>{let t=Ha(e);rt.default.existsSync(t)&&rt.default.writeFileSync(t,"","utf8")}});var cS,_o,Fa=p(()=>{"use strict";vt();cS=()=>`http://127.0.0.1:${Y()}/update/run`,_o=async e=>{try{let t=await fetch(cS(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Nm,Om=p(()=>{"use strict";Nm=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Mr,dS,Mm,Hm=p(()=>{"use strict";wo();Ue();Fa();Om();Mr=(e,t)=>{nt(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},dS=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ft(),_n)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Mm=async e=>{let t=j(e.layout.installDir)?.bundleVersion??null;if(!Nm({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Mr(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await _o({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Mr(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await dS();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Mr(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Mr(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Mr(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var uS,Fm,Dm=p(()=>{"use strict";uS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fm=e=>{if(!uS(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Um,jm,$m=p(()=>{"use strict";gs();Pn();Um=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=kn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},jm=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await St(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var K,mS,pS,gS,Bm,Gm,Vm,zm,Km,qm,Jm=p(()=>{"use strict";K=require("node:crypto"),mS=Buffer.from("302a300506032b6570032100","hex"),pS=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},gS=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,K.createPublicKey)({key:Buffer.concat([mS,t]),format:"der",type:"spki"})},Bm=()=>{let{publicKey:e,privateKey:t}=(0,K.generateKeyPairSync)("ed25519");return{publicKeyRaw:pS(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Gm=e=>(0,K.createPrivateKey)(e),Vm=(e,t)=>(0,K.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),zm=(e,t,r)=>{try{let n=gS(e);return(0,K.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},Km=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,qm=()=>(0,K.randomBytes)(32).toString("base64url")});var Ae,Wo,Ym,fS,hS,Da,Xm,Zm,Ua=p(()=>{"use strict";Ae=f(require("node:fs")),Wo=f(require("node:path"));Jm();E();Ym=e=>Wo.default.join(e.installDir,it),fS=(e,t)=>{if(e.profileEmail===null||t===Ym(e)||Ae.default.existsSync(t))return;let r=Ym(e);Ae.default.existsSync(r)&&(Ae.default.mkdirSync(Wo.default.dirname(t),{recursive:!0}),Ae.default.renameSync(r,t))},hS=e=>{if(!Ae.default.existsSync(e))return null;try{let t=Ae.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Da=e=>{let t=Ii(e);fS(e,t);let r=hS(t);if(r!==null)return r;let n=Bm();return Ae.default.mkdirSync(Wo.default.dirname(t),{recursive:!0}),Ae.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},Xm=e=>{let t=Da(e.layout),r=qm(),n=Km({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=Gm(t.privateKeyPem),s=Vm(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Zm=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return zm(e.serverPublicKey,t,e.serverAttestation)}});var yS,Qm,ep=p(()=>{"use strict";yS="local.agentwitch.com",Qm=`http://${yS}:43347`});var Hr,xo,AS,SS,vS,bS,tp,wS,_S,rp,Fr,np,Dr,op,ja=p(()=>{"use strict";Hr=f(require("node:fs")),xo=f(require("node:path"));ut();kr();AS="rag",SS="http://127.0.0.1:11434",vS="nomic-embed-text",bS=e=>xo.default.join(e.installDir,AS),tp=(e,t)=>t!==void 0&&t.trim().length>0?Ie(t).ragChunksFilePath:xo.default.join(bS(e),un),wS=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let a=0;a<r;a+=1){let i=e[a]??0,c=t[a]??0;n+=i*c,o+=i*i,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},_S=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},rp=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||SS,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||vS;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Fr=(e,t)=>{let r=tp(e,t);if(!Hr.default.existsSync(r))return[];let n=Hr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},np=async e=>{let t=_S(e.text);if(t.length===0)return 0;let r=tp(e.layout,e.projectFolderPath);Hr.default.mkdirSync(xo.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await rp(o);if(s===null)continue;let a={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Hr.default.appendFileSync(r,`${JSON.stringify(a)}
`,"utf8"),n+=1}return n},Dr=async e=>{let t=await rp(e.query);return t===null?[]:Fr(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:wS(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},op=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var sp,ap=p(()=>{"use strict";sp=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let a=Math.floor(n/3600),i=Math.floor(n%3600/60);return i>0?`${a}h ${i}m`:`${a}h`}});var ip,Eo,lp,ko=p(()=>{"use strict";ap();ip=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Eo=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=ip(e),r=ip(sp(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},lp=`(function () {
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
})();`});var Ft,cp,dp=p(()=>{"use strict";Ft=(e,t,r)=>e===1?t:r,cp=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Ft(o,"min","mins")} ago`;let s=Math.floor(n/36e5),a=Math.floor(n%36e5/6e4);if(s<24)return a===0?`${s}h ago`:`${s}h ${a} ${Ft(a,"min","mins")} ago`;let i=Math.floor(n/864e5);if(i<7)return`${i} ${Ft(i,"day","days")} ago`;let c=Math.floor(i/7);if(c<5)return`${c} ${Ft(c,"week","weeks")} ago`;let u=Math.floor(i/30);if(u<12)return`${u} ${Ft(u,"month","months")} ago`;let d=Math.floor(i/365);return`${d} ${Ft(d,"year","years")} ago`}});var $a,up,mp=p(()=>{"use strict";$a=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),up=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${$a(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${$a(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom).</p>
      <p class="muted mono">${$a(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var pp,gp,fp,hp=p(()=>{"use strict";pp=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,gp=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,fp=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Ur,yp,Ap=p(()=>{"use strict";ko();Ur=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yp=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",a=e.wakeError?`<div class="alert-error">${Ur(e.wakeError)}</div>`:"",i=Eo(e.lastHeartbeatAt);return`${a}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Last heartbeat \xB7 ${i}</span>
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
        <p class="home-card-meta">${Ur(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Ur(n)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${Ur(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Ur(o)}</p>
      </a>
    </div>`}});var Dt,WS,Sp,vp=p(()=>{"use strict";Dt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WS=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Sp=e=>{let t=WS.map(a=>`<option value="${Dt(a.value)}">${Dt(a.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Dt(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Dt(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Dt(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Dt(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var bp,wp=p(()=>{"use strict";bp=`
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
`.trim()});var xS,ES,_p,Wp,xp=p(()=>{"use strict";wp();ko();xS=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,ES=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/knowledge",label:"Knowledge"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],_p=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wp=e=>{let t=ES.map(o=>{let s=o.href===e.activePath;return`<a class="nav-link${s?" is-active":""}" href="${o.href}"${s?' aria-current="page"':""}>${o.label}</a>`}).join(""),r=_p(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"";return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${_p(e.title)} \xB7 Agent Witch Local</title>
  <style>${bp}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${xS}
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
  <script>${lp}</script>
</body>
</html>`}});var Ba,Ep,kp=p(()=>{"use strict";Ba=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ep=e=>{if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">Nothing in <code>~/.agent-witch</code> yet. Use <strong>Import</strong> below to scan a folder.</p>
    </section>`;let t=e.installed.sets.map(n=>`<li class="harness-installed-set">
          <span><strong>${Ba(n.name)}</strong> <span class="muted mono">(${Ba(n.slug)})</span></span>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join(""),r=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Ba(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">${e.installed.sets.length} set(s) on this Mac. Link them to a repo under <a href="/projects">Projects</a>.</p>
      ${r}
      <ul class="harness-installed-set-list">${t}</ul>
    </section>`}});var kS,Lp,Rp,Cp=p(()=>{"use strict";kS=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,Lp=e=>e.kind==="folder",Rp=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let a=0;a<o.length;a+=1){let i=o[a];if(i===void 0)continue;if(a===o.length-1){s.children.set(i,n);continue}let u=s.children.get(i);if(u!==void 0&&Lp(u)){s=u;continue}let d={kind:"folder",name:i,children:new Map};s.children.set(i,d),s=d}}let r=n=>{let o=[];for(let s of n.children.values()){if(Lp(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(kS)};return r(t)}});var Pp,Ga,Ip=p(()=>{"use strict";Pp=f(require("node:path")),Ga=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Ga(r.children,t)}</ul>
            </details>
          </li>`;let n=Pp.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var Tp,Ne,LS,RS,Lo,CS,Np,Op=p(()=>{"use strict";Tp=f(require("node:path"));kp();Cp();Ip();Ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),LS=()=>`(() => {
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

})();`,RS=()=>`(() => {
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
})();`,Lo=e=>{let t=Ep({installed:e.installed}),r=e.flashError?`<div class="alert-error">${Ne(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ne(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':CS(e.reveal),o=e.reveal?.scanRoots[0]?.trim()??"",s=o.length>0&&e.scanFolder.trim()===o,a=!e.importSectionExpanded,i=a?`<section class="card">
        <p class="muted">Import is hidden after a successful submit. Scan another folder when you need more harness files.</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",c=a?"":`<section class="card">
      <p class="eyebrow">Import</p>
      <h1>Reveal &amp; submit</h1>
      <p class="lede">Pick one folder under your home directory, scan for projects with <code>.cursor</code>, then submit your selection to the local harness. Scanning <code>~</code> can take a while \u2014 prefer a project folder or use <strong>Stop</strong>.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Ne(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Ne(o)}" />
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
    <script>${LS()}</script>
    <script>${RS()}</script>`;return`${t}${r}${i}${c}`},CS=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,a=t.get(s)??{sets:[]};t.set(s,{sets:[...a.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let a=o.sets.map(({set:i,setIndex:c})=>{let u=Rp(i.items.map(y=>({...y,relativePath:typeof y.relativePath=="string"&&y.relativePath.length>0?y.relativePath:Tp.default.relative(i.sourceRoot,y.sourcePath).replaceAll("\\","/")}))),d=Ga(u,Ne),m=i.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Ne(i.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Ne(i.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${d}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Ne(n)}" autocomplete="off" />
          </label>
          ${a}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Np=(e,t)=>{let r=new Set(e.getAll("includeSet").map(a=>Number.parseInt(String(a),10)).filter(a=>Number.isFinite(a))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[a,i]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(a);if(c===null)continue;let u=Number.parseInt(c[1]??"",10),d=i.trim();Number.isFinite(u)&&d.length>0&&o.set(u,d)}let s=[];for(let a=0;a<n;a+=1){let i=e.get(`setSlug-${a}`)?.trim()??"",c=e.get(`setGroupIndex-${a}`),u=c===null?null:Number.parseInt(c,10),d=u!==null&&Number.isFinite(u)?o.get(u):void 0,m=e.get(`setName-${a}`)?.trim()??d??i,y=t.sets[a];if(y===void 0)continue;let v=i.length>0?i:y.proposedSlug,h=m.length>0?m:y.proposedName,l=r.size===0||r.has(a),A=y.items.map(S=>({id:S.id,kind:S.kind,title:S.title,sourcePath:S.sourcePath,include:l}));s.push({slug:v,name:h,items:A})}return s}});var jr,Va,Mp,Hp,PS,Ro,IS,Fp,za,Dp=p(()=>{"use strict";jr=f(require("node:fs")),Va=f(require("node:path")),Mp=require("node:crypto");so();Hp=e=>Va.default.join(e.harnessRootDir,"projects-registry.json"),PS=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Ro=e=>{let t=Hp(e);if(!jr.default.existsSync(t))return[];try{let r=JSON.parse(jr.default.readFileSync(t,"utf8"));return PS(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string"):[]}catch{return[]}},IS=(e,t)=>{jr.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};jr.default.writeFileSync(Hp(e),`${JSON.stringify(r,null,2)}
`)},Fp=(e,t)=>{let r=Ze(t.projectFolderPath),n=t.name?.trim()||Va.default.basename(r)||"Project",o=Ro(e),s=o.find(i=>Ze(i.projectFolderPath)===r);if(s!==void 0)return s;let a={id:(0,Mp.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return IS(e,[...o,a]),a},za=(e,t)=>Ro(e).find(r=>r.id===t)??null});var Up,jp=p(()=>{"use strict";Up=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Co,Ka,$r,TS,Se,Po,Ut=p(()=>{"use strict";Co=f(require("node:fs")),Ka=f(require("node:os")),$r=f(require("node:path")),TS=()=>Co.default.realpathSync($r.default.resolve(Ka.default.homedir())),Se=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?$r.default.join(Ka.default.homedir(),t.slice(1)):t,n;try{n=Co.default.realpathSync($r.default.resolve(r))}catch{return null}let o=TS();return n===o||n.startsWith(`${o}${$r.default.sep}`)?n:null},Po=e=>{let t=Se(e);if(t===null)return null;try{if(!Co.default.statSync(t).isFile())return null}catch{return null}return t}});var Z,jt,Br,NS,OS,MS,$p,Bp=p(()=>{"use strict";Z=f(require("node:fs")),jt=f(require("node:path"));so();Lr();jp();Ut();Br=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NS=e=>{if(!Z.default.existsSync(e))return null;try{let t=JSON.parse(Z.default.readFileSync(e,"utf8"));if(Br(t)&&t.version===1)return t}catch{return null}return null},OS=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?jt.default.join(e.harnessRootDir,n):jt.default.join(e.harnessSetsDir,t,n);if(!Z.default.existsSync(o))return null;try{if(!Z.default.statSync(o).isFile())return null}catch{return null}return o},MS=(e,t)=>{let r={};if(Z.default.existsSync(e))try{let o=JSON.parse(Z.default.readFileSync(e,"utf8"));Br(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};Z.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},$p=e=>{let t=[...new Set(e.setSlugs.map(d=>d.trim()).filter(d=>d.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=Ze(e.projectFolderPath),n=Se(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=Z.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=NS(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let a=Br(s.sets)?s.sets:{},i=jt.default.join(n,".cursor"),c=0;for(let d of t){let m=a[d];if(!Br(m))return{ok:!1,errorMessage:`Harness set "${d}" is not installed locally.`};let y=Array.isArray(m.items)?m.items:[];for(let v of y){if(!Br(v))continue;let h=typeof v.path=="string"?v.path.trim():"";if(h.length===0)continue;let l=Up(h);if(l===null)continue;let A=OS(e.layout,d,h);if(A===null)continue;let S=jt.default.join(i,l);Z.default.mkdirSync(jt.default.dirname(S),{recursive:!0}),Z.default.copyFileSync(A,S),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let u=he({projectFolderPath:n});return MS(u.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var Oe,qa,Gp=p(()=>{"use strict";Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qa=e=>{let t=e.flashError?`<div class="alert-error">${Oe(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Oe(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Oe(o.slug)}"${r.has(o.slug)?" checked":""} />
            <span><strong>${Oe(o.name)}</strong> <span class="muted mono">(${Oe(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Oe(e.project.name)}</h1>
      <p class="muted mono">${Oe(e.project.projectFolderPath)}</p>
      <p class="lede">Linked harness sets are copied into this project&apos;s <code>.cursor</code> folder and recorded in <code>.agent-witch/project.json</code>.</p>
      <form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Oe(e.project.id)}" />
        <p class="field-label">Harness sets</p>
        ${n}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${e.installed.sets.length===0?" disabled":""}>Save linked harness</button>
        </div>
      </form>
    </section>`}});var Io,Vp,zp=p(()=>{"use strict";Io=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vp=e=>{let t=e.flashError?`<div class="alert-error">${Io(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Io(e.flashMessage)}</div>`:"",r=e.projects.length===0?'<p class="empty">No projects yet. Add a repo folder to link harness sets and run tasks in context.</p>':`<ul class="project-list">${e.projects.map(n=>`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Io(n.name)}</strong>
                  <span class="muted mono">${Io(n.projectFolderPath)}</span>
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
    </section>`}});var Ja,Ya,Kp=p(()=>{"use strict";Ja=f(require("node:fs"));kr();Ya=e=>{let t=Ie(e);if(!Ja.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse(Ja.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var Za,Xa,$t,qp=p(()=>{"use strict";Za=f(require("node:fs")),Xa=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$t=e=>{if(!Za.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Za.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Xa(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=Xa(t.sets)?t.sets:{},o=Object.entries(n).map(([s,a])=>{if(!Xa(a))return null;let i=typeof a.slug=="string"&&a.slug.length>0?a.slug:s,c=typeof a.name=="string"&&a.name.length>0?a.name:i,u=typeof a.updatedAt=="string"?a.updatedAt:"",d=Array.isArray(a.items)?a.items:[];return{slug:i,name:c,itemCount:d.length,updatedAt:u}}).filter(s=>s!==null).toSorted((s,a)=>s.name.localeCompare(a.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Qa,Jp=p(()=>{"use strict";Qa=()=>"~"});var Yp,ei,Xp=p(()=>{"use strict";Yp=require("node:child_process"),ei=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Yp.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var Zp,Qp,eg=p(()=>{"use strict";Zp=require("node:crypto"),Qp=e=>`local-${(0,Zp.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var ti,tg=p(()=>{"use strict";ti=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Gr,To,ri=p(()=>{"use strict";Gr=f(require("node:path")),To=e=>{let t=Gr.default.dirname(e),r=Gr.default.basename(t);return r==="agents"?Gr.default.basename(Gr.default.dirname(t)):r}});var Vr,ve,rg,HS,FS,DS,No,ng,ni=p(()=>{"use strict";Vr=f(require("node:fs")),ve=f(require("node:path"));eg();tg();ri();rg=new Set(["node_modules",".git","dist","build",".next","coverage"]),HS=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},FS=(e,t)=>{let r=ve.default.basename(t);if(e==="skill"){let n=t.split(ve.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},DS=e=>{let t=[],r=(o,s)=>{let a;try{a=Vr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(i.name.startsWith(".")||i.isDirectory()&&rg.has(i.name))continue;let c=ve.default.join(o,i.name),u=s?ve.default.join(s,i.name):i.name;if(i.isDirectory()){r(c,u);continue}if(!i.isFile())continue;ti(u.replaceAll("\\","/"))!==null&&t.push({relativePath:u,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=ve.default.join(e,o);Vr.default.existsSync(s)&&r(s,o)}let n=ve.default.join(e,"skills");return Vr.default.existsSync(n)&&r(n,"skills"),t},No=e=>{let t=DS(e);if(t.length===0)return null;let r=ve.default.dirname(e),n=To(e),o=HS(n),s=t.map(a=>{let i=ti(a.relativePath.replaceAll("\\","/"));if(i===null)throw new Error(`Unexpected harness file: ${a.relativePath}`);return{id:Qp(a.absolutePath),kind:i,title:FS(i,a.relativePath),sourcePath:a.absolutePath,relativePath:a.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},ng=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let a;try{a=Vr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(r())return;if(!i.isDirectory()||rg.has(i.name))continue;let c=ve.default.join(o,i.name);if(i.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var og,oi,US,sg,ag=p(()=>{"use strict";og=f(require("node:fs")),oi=f(require("node:path"));ni();Ut();US=e=>{let t=Se(e.trim());if(t===null)return null;if(oi.default.basename(t)===".cursor")return t;let r=oi.default.join(t,".cursor");try{if(og.default.statSync(r).isDirectory())return Se(r)}catch{return null}return null},sg=e=>{let t=US(e.projectPath);if(t===null)return null;let r=No(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(a=>a.sourceRoot!==r.sourceRoot),r].toSorted((a,i)=>a.proposedName.localeCompare(i.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var ig,jS,Oo,lg,cg=p(()=>{"use strict";ig=f(require("node:path"));ni();Ut();ri();jS=5,Oo=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},lg=e=>{let t=Se(e.scanRoot.trim());if(t===null)return Oo(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of ng(t,jS,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let a=Se(s);if(a===null)continue;let i=To(a);Oo(e.response,"folder",{cursorDir:a,groupName:i,repoPath:ig.default.dirname(a)});let c=No(a);c!==null&&(r.push(c),Oo(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:i,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(u=>u.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,a)=>s.proposedName.localeCompare(a.proposedName))};return Oo(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var dg,ug,mg=p(()=>{"use strict";dg=f(require("node:path")),ug=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:dg.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var H,pg,si,$S,gg,ai,ii,fg,Mo,hg=p(()=>{"use strict";H=f(require("node:fs")),pg=f(require("node:os")),si=f(require("node:path"));bs();Ut();mg();$S=e=>{if(!H.default.existsSync(e))return null;try{let t=JSON.parse(H.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},gg=e=>{let t=e.hostname??pg.default.hostname(),r=$S(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let a of e.sets){let i=a.items.filter(d=>d.include);if(i.length===0)continue;let c=[];for(let d of i){let m=Po(d.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${d.sourcePath}`};let y=H.default.readFileSync(m,"utf8");c.push({id:d.id,kind:d.kind,title:d.title,content:y,setSlugs:[a.slug]})}let u=On({bundle:{name:a.name,slug:a.slug,items:c},hostname:t,existingManifest:r});r=u.manifest;for(let d of u.directories)o.add(d);for(let d of u.files)s.push(d),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{H.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let a of o)H.default.mkdirSync(`${e.layout.harnessRootDir}/${a}`,{recursive:!0});for(let a of s){let i=si.default.join(e.layout.harnessRootDir,a.relativePath);H.default.mkdirSync(si.default.dirname(i),{recursive:!0}),H.default.writeFileSync(i,a.content)}return H.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Harness submit failed."}}},ai="reveal-cache.json",ii=(e,t)=>{H.default.mkdirSync(e.harnessRootDir,{recursive:!0}),H.default.writeFileSync(`${e.harnessRootDir}/${ai}`,`${JSON.stringify(t,null,2)}
`)},fg=e=>{let t=`${e.harnessRootDir}/${ai}`;H.default.existsSync(t)&&H.default.unlinkSync(t)},Mo=e=>{let t=`${e.harnessRootDir}/${ai}`;if(!H.default.existsSync(t))return null;try{let r=JSON.parse(H.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return ug(r)}catch{return null}return null}});var yg,Ag=p(()=>{"use strict";yg=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Bt,BS,li,Sg=p(()=>{"use strict";Bt=f(require("node:fs")),BS=256e3,li=(e,t=BS)=>{if(!Bt.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Bt.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,a=Buffer.alloc(s),i=Bt.default.openSync(e,"r");try{Bt.default.readSync(i,a,0,s,o)}finally{Bt.default.closeSync(i)}let c=a.toString("utf8");if(o>0){let u=c.indexOf(`
`);u>=0&&(c=c.slice(u+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var vg,bg,ci,wg,_g=p(()=>{"use strict";vg=require("node:crypto"),bg=f(require("node:fs"));ar();Cn();Be();Ge();ci=!1,wg=async e=>{if(ci)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!N(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=ht({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&bg.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,vg.randomUUID)();ci=!0;try{if(await Ul(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let i=await At({workspace:o,claudeCommand:r.claudeCommand,codexCommand:r.codexCommand,cursorCommand:r.cursorCommand,antigravityCommand:r.antigravityCommand},e.writerAgent,t);return await Ln(n,s,i.exitCode,i.output)?{ok:i.exitCode===0,agentRunId:s,...i.exitCode===0?{}:{errorMessage:i.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{ci=!1}}});var Wg,xg=p(()=>{"use strict";Wg="https://www.agentwitch.com"});var Ho,di=p(()=>{"use strict";xg();Ge();pt();Ho=e=>{let t=$(),r=t!==null?J(t.wsUrl):null;if(r!==null&&r.length>0)return r;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Wg}});var Eg,kg=p(()=>{"use strict";Ue();ft();di();Eg=async e=>{let t=j(e.installDir),r=t?.bundleVersion??null,n=Ho(t);try{let o=await is(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Sn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Lg,Rg=p(()=>{"use strict";Lg=e=>!e});var Cg,Pg,Ig=p(()=>{"use strict";Fa();Cg=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Pg=async()=>{let e=await _o({force:!0});if(e.ok)return{ok:!0,message:Cg(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:Cg(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(ft(),_n)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Ng,Kr,Og,mi,Tg,GS,ui,O,pi,T,q,zr,VS,zS,Mg,Hg,Fg=p(()=>{"use strict";Ng=f(require("node:http")),Kr=f(require("node:fs")),Og=f(require("node:path"));ep();wo();ja();mr();wt();ko();dp();mp();hp();Ap();vp();xp();Op();Dp();Bp();Gp();zp();Kp();qp();Jp();Xp();ag();Ut();cg();hg();Lr();Ag();Sg();Ue();_g();Ge();di();kg();Rg();Ig();Ua();mi=e=>cp(e)??"never",Tg=48e3,GS=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0?!0:$t(e).sets.length===0,ui=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Qa(),reveal:t.reveal,installed:$t(e),flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),O=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pi={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},T=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...pi}),e.end(JSON.stringify(r))},q=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},zr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},VS=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${O(e.status.wakeError)}</div>`:"",o=Lg(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Eo(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${O(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${O(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${O(mi(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${O(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},zS=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":null},Mg=e=>{let t=Og.default.join(e.layout.installDir,"link-code.txt"),r=()=>j(e.layout.installDir),n=()=>{let d=r();return{installBundleVersion:yg(d),installBundleUpdatedAt:d?.updatedAt??null,installVersion:d}},o=async d=>{let m=d.installVersion??r(),y=await a(),v=gp(y),h=fp(d.updateFlash??null);return Wp({title:d.title,activePath:d.activePath,body:d.body,cloudAppOrigin:Ho(m),prependBody:`${h}${v}`,headerUpdateButtonHtml:pp(y)})},s=null,a=async()=>{let d=Date.now();if(s!==null&&d-s.cachedAtMs<6e4)return s.offer;let m=await Eg(e.layout);return s={cachedAtMs:d,offer:m},m},i=()=>{s=null},c=()=>{if(Kr.default.existsSync(t))return Kr.default.readFileSync(t,"utf8").trim();let d=Math.random().toString(36).slice(2,8).toUpperCase();return Kr.default.writeFileSync(t,d,"utf8"),d},u=Ng.default.createServer((d,m)=>{(async()=>{let y=d.url?.split("?")[0]??"/",v=d.method??"GET";if(v==="OPTIONS"){m.writeHead(204,pi),m.end();return}if(v==="GET"&&y==="/health"){let h=e.controllers.getStatus(),l=n();T(m,200,{ok:!0,...h,installBundleVersion:l.installBundleVersion,installBundleUpdatedAt:l.installBundleUpdatedAt});return}if(v==="GET"&&y==="/api/status"){let h=n();T(m,200,{...e.controllers.getStatus(),linkCode:c(),installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(v==="GET"&&y==="/api/traffic"){T(m,200,{entries:bo(e.layout)});return}if(v==="DELETE"&&y==="/api/traffic"){Tm(e.layout),T(m,200,{ok:!0});return}if(v==="GET"&&y==="/api/knowledge"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(l.length>0){let A=await Dr({layout:e.layout,query:l,limit:20});T(m,200,{chunks:A,query:l});return}T(m,200,{chunks:Fr(e.layout).slice(-50).reverse()});return}if(v==="POST"&&y==="/api/revive"){e.controllers.reviveWebSocket(),T(m,200,{ok:!0});return}if(v==="GET"&&y==="/api/update-status"){let h=await a();T(m,200,{ok:!0,...h});return}if(v==="POST"&&y==="/api/update"){i();let h=await Pg();i(),m.writeHead(303,{Location:h.ok?"/?update=ok":"/?update=failed"}),m.end();return}if(v==="GET"&&y==="/"){let h=e.controllers.getStatus(),l=n(),A=$t(e.layout),S=li(e.layout.errorLogPath);q(m,await o({title:"Home",activePath:"/",installVersion:l.installVersion,updateFlash:zS(d.url??void 0),body:yp({wsConnected:h.wsConnected,lastHeartbeatAt:h.lastHeartbeatAt,harnessSetCount:A.sets.length,knowledgeChunkCount:Fr(e.layout).length,trafficEntryCount:bo(e.layout).length,wakeError:h.wakeError,errorLogByteSize:S.byteSize,errorLogExists:S.exists})}));return}if(v==="GET"&&y==="/task"){let h=e.controllers.getStatus(),l=n(),A=$(),S=new URL(d.url??"/",`http://127.0.0.1:${43347}`),g=S.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,b=S.searchParams.get("failed")==="1"?S.searchParams.get("error")?.trim()??"Task failed.":null,w=S.searchParams.get("runId");q(m,await o({title:"Task",activePath:"/task",installVersion:l.installVersion,body:Sp({defaultWorkspace:A?.workspace??"",wsConnected:h.wsConnected,flashMessage:g,flashError:b,lastRunId:w})}));return}if(v==="POST"&&y==="/task/dispatch"){let h=await zr(d),l=new URLSearchParams(h),A=l.get("prompt")?.trim()??"",S=l.get("writerAgent")?.trim()??"claude-cli",g=l.get("projectFolder")?.trim()??"",b=await wg({prompt:A,writerAgent:S,...g.length>0?{projectFolderPath:g}:{}}),w=new URLSearchParams;b.ok?w.set("ok","1"):(w.set("failed","1"),b.errorMessage!==void 0&&w.set("error",b.errorMessage.slice(0,240))),b.agentRunId!==void 0&&w.set("runId",b.agentRunId),m.writeHead(303,{Location:`/task?${w.toString()}`}),m.end();return}if(v==="GET"&&y==="/errors"){let h=n(),l=li(e.layout.errorLogPath);q(m,await o({title:"Errors",activePath:"/errors",installVersion:h.installVersion,body:up({errorLogPath:e.layout.errorLogPath,content:l.content,exists:l.exists,truncated:l.truncated,byteSize:l.byteSize})}));return}if(v==="GET"&&y==="/status"){let h=e.controllers.getStatus(),l=re(e.layout),A=de(l,ce),S=n();q(m,await o({title:"Status",activePath:"/status",installVersion:S.installVersion,body:VS({status:h,stale:A,linkCode:c(),installBundleVersion:S.installBundleVersion,installBundleUpdatedAt:S.installBundleUpdatedAt})}));return}if(v==="GET"&&y==="/traffic"){let h=bo(e.layout),l=n(),A=h.map(g=>`<tr><td title="${O(g.at)}">${O(mi(g.at))}</td><td>${O(g.direction)}</td><td><code>${O(g.type)}</code></td><td>${O(g.summary)}</td><td>${O(g.action??"")}</td></tr>`).join(""),S=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${A}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';q(m,await o({title:"Traffic",activePath:"/traffic",installVersion:l.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${S}
            </section>`}));return}if(v==="GET"&&y==="/projects"){let h=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=n(),A=h.searchParams.get("added")==="1"?"Project added.":null;q(m,await o({title:"Projects",activePath:"/projects",installVersion:l.installVersion,body:Vp({projects:Ro(e.layout),flashMessage:A})}));return}if(v==="GET"&&y==="/project"){let h=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=h.searchParams.get("id")?.trim()??"",A=za(e.layout,l);if(A===null){m.writeHead(404),m.end("Project not found");return}let S=n(),g=h.searchParams.get("linked")==="1"?`Harness linked (${h.searchParams.get("files")??"0"} file(s) written).`:null;q(m,await o({title:A.name,activePath:"/projects",installVersion:S.installVersion,body:qa({project:A,installed:$t(e.layout),linkedSetSlugs:Ya(A.projectFolderPath),flashMessage:g})}));return}if(v==="POST"&&y==="/projects/add"){let h=ei();if(h===null){m.writeHead(303,{Location:"/projects"}),m.end();return}he({projectFolderPath:h}),Fp(e.layout,{projectFolderPath:h}),m.writeHead(303,{Location:"/projects?added=1"}),m.end();return}if(v==="POST"&&y==="/projects/link-harness"){let h=await zr(d),l=new URLSearchParams(h),A=l.get("projectId")?.trim()??"",S=za(e.layout,A);if(S===null){m.writeHead(404),m.end("Project not found");return}let g=l.getAll("applySet").map(w=>String(w)),b=$p({layout:e.layout,projectFolderPath:S.projectFolderPath,setSlugs:g});if(!b.ok){let w=n();q(m,await o({title:S.name,activePath:"/projects",installVersion:w.installVersion,body:qa({project:S,installed:$t(e.layout),linkedSetSlugs:Ya(S.projectFolderPath),flashError:b.errorMessage})}));return}m.writeHead(303,{Location:`/project?id=${encodeURIComponent(S.id)}&linked=1&files=${b.writtenFileCount}`}),m.end();return}if(v==="GET"&&y==="/harness"){let h=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=n(),A=Mo(e.layout),S=h.searchParams.get("submitted")==="1",g=S?h.searchParams.get("syncFailed")==="1"?`Local harness updated (${h.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:h.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${h.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":h.searchParams.get("stopped")==="1"?`Reveal stopped. ${A?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:h.searchParams.get("revealed")==="1"?`Reveal found ${A?.sets.length??0} set(s).`:null,b=A?.scanRoots[0]??Qa(),w=GS(e.layout,{reveal:A,importQuery:h.searchParams.get("import")==="1",justSubmitted:S});q(m,await o({title:"Harness",activePath:"/harness",installVersion:l.installVersion,body:Lo(ui(e.layout,{reveal:A,scanFolder:b,flashMessage:g,importSectionExpanded:w}))}));return}if(v==="POST"&&y==="/api/harness/pick-folder"){let h=ei();if(h===null){T(m,200,{cancelled:!0});return}T(m,200,{path:h});return}if(v==="GET"&&y==="/api/harness/file-content"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",A=Po(l);if(A===null){T(m,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let S=Kr.default.readFileSync(A,"utf8"),g=S.length>Tg?`${S.slice(0,Tg)}
\u2026 (truncated)`:S;T(m,200,{content:g})}catch{T(m,500,{errorMessage:"Could not read file."})}return}if(v==="POST"&&y==="/api/harness/reveal/add-project"){let h=await zr(d),l="";try{let g=JSON.parse(h);typeof g=="object"&&g!==null&&typeof g.projectPath=="string"&&(l=g.projectPath.trim())}catch{T(m,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(l.length===0){T(m,400,{ok:!1,errorMessage:"projectPath is required."});return}let A=Mo(e.layout),S=sg({reveal:A,projectPath:l});if(S===null||S.sets.length===0){T(m,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}ii(e.layout,S),T(m,200,{ok:!0,setCount:S.sets.length});return}if(v==="GET"&&y==="/api/harness/reveal/stream"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(l.length===0){T(m,400,{errorMessage:"Choose a folder to scan first."});return}let A=!1;d.on("close",()=>{A=!0}),m.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...pi});let S=lg({scanRoot:l,response:m,shouldAbort:()=>A});ii(e.layout,S),m.end();return}if(v==="POST"&&y==="/harness/reveal"){m.writeHead(410,{"Content-Type":"text/plain"}),m.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(v==="POST"&&y==="/harness/submit"){let h=Mo(e.layout);if(h===null){let C=n();q(m,await o({title:"Harness",activePath:"/harness",installVersion:C.installVersion,body:Lo(ui(e.layout,{reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let l=await zr(d),A=new URLSearchParams(l),S=Np(A,h),g=gg({layout:e.layout,sets:S});if(!g.ok){let C=n();q(m,await o({title:"Harness",activePath:"/harness",installVersion:C.installVersion,body:Lo(ui(e.layout,{reveal:h,flashError:g.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}fg(e.layout);let w=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";m.writeHead(303,{Location:`/harness?submitted=1&count=${g.writtenItemCount??0}${w}`}),m.end();return}if(v==="GET"&&y==="/knowledge"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",A=n(),g=(l.length>0?await Dr({layout:e.layout,query:l,limit:20}):Fr(e.layout).slice(-50).reverse()).map(b=>`<article class="card"><div class="muted" title="${O(b.createdAt)}">${O(mi(b.createdAt))}${b.source?` \xB7 ${O(b.source)}`:""}</div><pre>${O(b.text)}</pre></article>`).join("");q(m,await o({title:"Knowledge",activePath:"/knowledge",installVersion:A.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${O(l)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${g||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}v==="POST"&&await zr(d),m.writeHead(404),m.end("Not found")})().catch(y=>{console.error("[agent-witch-local-app]",y),m.writeHead(500),m.end("Internal error")})});return u.on("error",d=>{if(d.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",d)}),u.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Qm}`)}),u},Hg=e=>Da(e).publicKeyRaw});var qr,gi,Dg,Ug,jg,$g,Bg=p(()=>{"use strict";qr=f(require("node:fs")),gi=f(require("node:path"));ut();kr();Dg=(e,t)=>gi.default.join(Ie(t).memoryDirPath,mn),Ug=(e,t)=>{let r=Dg(e,t);if(!qr.default.existsSync(r))return[];let n=qr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},jg=e=>{let t=Dg(e.layout,e.projectFolderPath);qr.default.mkdirSync(gi.default.dirname(t),{recursive:!0}),qr.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},$g=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let a=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,i=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${a}
Result: ${i}`}).join(`

`)}

---

`});var Gg,KS,qS,JS,Vg,zg=p(()=>{"use strict";Gg=f(require("node:os"));E();KS="Default",qS=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),JS=e=>{let t=Gg.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Vg=()=>{let e=x(),t=Pi(e),r=qS(KS);return`${JS(t)}/${r.length>0?r:"project"}`}});var Kg,YS,qg,Jg=p(()=>{"use strict";Kg=require("node:child_process");yo();Be();YS=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,Kg.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",a=>{o(a===0)})})},qg=async e=>{if(!N(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};try{await Te(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await YS(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Yg,Xg=p(()=>{"use strict";Yg=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var Zg,Qg,ef=p(()=>{"use strict";Zg=require("node:crypto"),Qg=()=>(0,Zg.randomUUID)()});var Jr,XS,tf,Fo=p(()=>{"use strict";Jr="[[WORKING_ESTIMATE]]",XS=["Put this marker on its own line:",Jr,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),tf=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",XS,"","Task to estimate:",e.trim()].join(`
`)});var rf,nf=p(()=>{"use strict";rf=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var of,sf=p(()=>{"use strict";of=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var ZS,af,lf=p(()=>{"use strict";Fo();ZS=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,af=e=>{if(!e.includes(Jr))return null;let t=null;for(let r of e.matchAll(ZS)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var cf,df=p(()=>{"use strict";Cn();Fo();nf();sf();lf();Yt();cf=async e=>{let t=rf(e.wrappedPrompt),r=tf(t),n=await At(e.config,e.writerAgent,r),o=af(n.output),s=of(o);return Jt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:te.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var uf={};Me(uf,{buildContinuationPromptWithContext:()=>tv});var QS,ev,tv,mf=p(()=>{"use strict";QS=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,ev=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),tv=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=ev(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${QS(n,o)}`:null].filter(a=>a!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var pf={};Me(pf,{readHarnessExportSets:()=>nv});var Yr,fi,Do,rv,nv,gf=p(()=>{"use strict";Yr=f(require("node:fs")),fi=f(require("node:path"));E();Do=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rv=e=>{if(!Yr.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Yr.default.readFileSync(e.harnessManifestPath,"utf8"));if(Do(t))return t}catch{return null}return null},nv=(e,t)=>{let r=x(t),n=rv(r);if(n===null)return[];let o=Do(n.sets)?n.sets:{},s=[];for(let a of e){let i=o[a];if(!Do(i)||typeof i.name!="string")continue;let c=Array.isArray(i.items)?i.items:[],u=[];for(let d of c){if(!Do(d))continue;let m=typeof d.path=="string"?d.path:void 0,y=typeof d.id=="string"?d.id:"",v=typeof d.kind=="string"?d.kind:"",h=typeof d.title=="string"?d.title:"";if(m===void 0||y.length===0||v.length===0||h.length===0)continue;let l=m.startsWith("shared/")?fi.default.join(r.harnessRootDir,m):fi.default.join(r.harnessSetsDir,a,m);Yr.default.existsSync(l)&&u.push({id:y,kind:v,title:h,content:Yr.default.readFileSync(l,"utf8")})}u.length>0&&s.push({name:i.name,slug:a,items:u})}return s}});var bf={};Me(bf,{startAgentWitchClient:()=>Av});var Ai,Xr,Gt,Sv,ov,sv,av,iv,lv,ff,cv,hf,yf,Af,hi,L,Sf,P,yi,dv,Uo,uv,mv,pv,gv,fv,hv,yv,vf,Av,wf=p(()=>{"use strict";Ai=require("node:child_process"),Xr=f(require("node:fs")),Gt=f(require("node:os"));Vd();dn();os();Qo();ha();Fe();Zd();tu();Wu();vt();E();Cm();ar();go();Ia();yo();Be();Wa();mr();wt();po();Im();Hm();Ue();Dm();$m();Ua();wo();Fg();ja();Bg();pt();zg();Lr();Jg();ts();An();st();gn();Xg();ef();Fo();Yt();df();Sv={},ov="ws://localhost:3000/api/agent-witch/ws",sv="claude",av="codex",iv="cursor",lv="agy",ff=3e4,cv=3e4,hf=new Map,yf=new Map,Af=new Map,hi=e=>{let t=e?.trim()??"";return t.length>0?t:Vg()},L=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sf=e=>{let t=x(e);if(!Xr.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Xr.default.readFileSync(t.configPath,"utf8"));if(!L(r))throw new Error("Config must be a JSON object.");let n=process.env.AGENT_WITCH_WS_URL?.trim()??"",o=typeof r.wsUrl=="string"?r.wsUrl.trim():"",s=n.length>0?n:o.length>0?o:ov,a=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),i=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??sv,c=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??av,u=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??iv,d=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??lv,m=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",y=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return m.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:y,wsUrl:s,workspace:a,claudeCommand:i,codexCommand:c,cursorCommand:u,antigravityCommand:d,pairingToken:m,layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},P=(e,t,r)=>{e.readyState===wr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&nt(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}))},yi=e=>e,dv=e=>{if(!Xr.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Xr.default.readFileSync(e.harnessManifestPath,"utf8"));if(L(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Uo=(e,t)=>{let r=dv(t);r!==null&&P(e,{type:"harness.manifest.report",payload:{hostname:Gt.default.hostname(),manifest:r}})},uv=async(e,t,r,n,o,s,a=!1,i,c,u,d)=>{if(!N(t)){P(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let m=Ao(t)&&!fm(t);if(m){try{await Te(e.layout.installDir,t)}catch(b){let w=b instanceof Error?b.message:String(b);P(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ca(t)}else if(!Ao(t))try{await Te(e.layout.installDir,t)}catch(b){let w=b instanceof Error?b.message:String(b);P(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let y=a&&gm(t)&&hm(t)?"continue":"first",v=r;if(a&&y==="first"&&typeof c=="string"&&c.length>0){let b=uo(e.layout,c);if(b!==null){let{buildContinuationPromptWithContext:w}=await Promise.resolve().then(()=>(mf(),uf));v=w({priorPrompt:b.prompt,priorOutput:b.resultOutput??"",userMessage:r})}}let h=hi(u);he({projectFolderPath:h});let l=await Dr({layout:e.layout,query:v,limit:5,projectFolderPath:h}),A=Ug(e.layout,h),S=`${$g(A)}${op(l)}${v}`,g=d?.trim()??(s!==void 0&&h.trim().length>0?Qg():void 0);if(s!==void 0&&g!==void 0&&g.length>0&&h.trim().length>0){hn({reportKey:g,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let b=await cf({config:{workspace:e.workspace,claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand},writerAgent:t,wrappedPrompt:S,reportKey:g,agentRunId:s});if(b.estimateSeconds!==null){let w=`${Jr}
${b.estimateSeconds}
`;et(s)?P(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:w},requestId:n}):Ot(s,w)}S=Yg(S,b),S=el(S,{agentRunId:s,reportKey:g,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}Oa(e,t,S,n,yi(o),s,{sessionTurn:y},i,h,g),m&&s!==void 0&&P(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Am(t)},requestId:n})},mv=async(e,t,r,n,o)=>{let s=(a,i)=>{P(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:a,exitCode:i},requestId:n})};try{let a="",i=await Sm({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,commands:Le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:d=>{a+=d,P(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:d},requestId:n})}}),c=N(t)?t:"claude-cli",u=i.exitCode!==0?i.output:a.length>0?So(c):i.output;s(u,i.exitCode)}catch(a){let i=a instanceof Error?a.message:String(a);console.error("[agent-witch] Writer session start failed:",i),s(`Failed to start ${t} session: ${i}
`,-1)}},pv=(e,t,r)=>new Promise(n=>{if(!N(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=yt(t,r,Le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],a=(0,Ai.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});a.stdout?.on("data",i=>{s.push(i.toString("utf8"))}),a.stderr?.on("data",i=>{s.push(i.toString("utf8"))}),a.on("close",i=>{n({exitCode:i??-1,output:s.join("").trim()})}),a.on("error",i=>{n({exitCode:-1,output:i.message})})}),gv=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(P(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){P(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!N(o)){P(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let a=await(async()=>{try{await Te(e.layout.installDir,o)}catch(i){let c=i instanceof Error?i.message:String(i);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return pv(e,o,s)})();P(n,{type:"harness.request.result",payload:{success:a.exitCode===0,writerAgent:o,exitCode:a.exitCode,output:a.output},requestId:r}),Uo(n,e.layout)},fv=e=>{let t=1e3*2**e;return Math.min(cv,t)},hv=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,Pm().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,A="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,Mm({layout:e.layout,remoteBundleVersion:l,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=re(e.layout);l!==null&&de(l,ce)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,i(),c(),v())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},i=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{t.socket!==void 0&&(t.socket.removeAllListeners(),(t.socket.readyState===wr.OPEN||t.socket.readyState===wr.CONNECTING)&&t.socket.close(),t.socket=void 0,t.wsConnected=!1)},u=()=>{a(),t.localHealthTimer=setInterval(o,ff)},d=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=fv(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,v()},l)},m=l=>{s();let A=()=>{let S=j(e.layout.installDir)?.bundleVersion??null,g=Y();P(l,{type:"agent.heartbeat",payload:{hostname:Gt.default.hostname(),macOsUsername:Gt.default.userInfo().username,wakeError:t.wakeError,wakePort:g,...e.email!==null?{email:e.email}:{},...S!==null?{installBundleVersion:S}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,ff)},y=(l,A)=>{if(typeof l.type!="string")return;nt(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"});let S=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&L(l.payload)){let g=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",b=typeof l.payload.origin=="string"?l.payload.origin:"",w=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",C=typeof l.payload.challenge=="string"?l.payload.challenge:"",G=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!Zm({serverPublicKey:g,origin:b,devicePublicKey:w,challenge:C,serverAttestation:G})){t.wakeError="Server attestation verification failed",nt(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&L(l.payload)){let g=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";nt(e.layout,{direction:"local",type:"writer.ensure",summary:g,action:"ensure-writer"}),qg({layout:e.layout,writerAgent:g,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{P(A,{type:"writer.status",payload:b},e.layout)})}if(l.type==="install.bundle.update"&&L(l.payload)){let g=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";g.length>0&&n(g,"install.bundle.update")}if(l.type==="system.ack"){xs(e.layout,{wsUrl:e.wsUrl});let g=L(l.payload)?l.payload:null,b=Fm(g);b!==null&&n(b)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&L(l.payload)&&Um(l.payload),l.type==="automations.run"&&L(l.payload)&&jm(l.payload),l.type==="terminal.stream.accepted"&&L(l.payload)){let g=typeof l.payload.runId=="string"?l.payload.runId:"";if(g.length>0){let b=zu(g);for(let w of b)P(A,{type:"terminal.stream.chunk",payload:{runId:g,chunk:w},requestId:S})}}if(l.type==="agent.agentRun.list"&&P(A,{type:"dashboard.agentRun.list.result",payload:{runs:Hu(e.layout)},requestId:S}),l.type==="agent.agentRun.get"&&L(l.payload)){let g=typeof l.payload.runId=="string"?l.payload.runId:"",b=g.length>0?uo(e.layout,g):null;P(A,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:S})}if(l.type==="command.claude.run"&&L(l.payload)){let g=l.payload.prompt,b=typeof l.payload.writerAgent=="string"&&N(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",w=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,C=l.payload.sessionContinuation===!0,G=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,be=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,ot=hi(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),Vt=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof g=="string"&&g.trim().length>0&&(console.log(`[agent-witch] Running ${b} task (${C?"continue":"first"})\u2026`),w!==void 0&&be!==void 0&&hf.set(w,be),w!==void 0&&(yf.set(w,ot),Af.set(w,g.trim()),he({projectFolderPath:ot})),uv(e,b,g.trim(),S,A,w,C,be,G,ot,Vt))}if(l.type==="shell.session.open"&&L(l.payload)){let g=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:120,w=typeof l.payload.rows=="number"?l.payload.rows:32;g.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),nm({shellSessionId:g,cwd:e.workspace,cols:b,rows:w,send:C=>{P(A,C)},requestId:S}))}if(l.type==="shell.session.close"&&L(l.payload)){let g=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";g.length>0&&Tr(g,b=>{P(A,b)},S)}if(l.type==="shell.input"&&L(l.payload)){let g=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.data=="string"?l.payload.data:"";g.length>0&&b.length>0&&em(g,b)}if(l.type==="shell.resize"&&L(l.payload)){let g=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:0,w=typeof l.payload.rows=="number"?l.payload.rows:0;g.length>0&&b>0&&w>0&&tm(g,b,w)}if(l.type==="command.writer.session.end"&&L(l.payload)){let g=l.payload.writerAgent;typeof g=="string"&&N(g)&&ym(g)}if(l.type==="command.writer.session.start"&&L(l.payload)){let g=l.payload.writerAgent,b=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof g=="string"&&N(g)&&b.length>0&&(console.log(`[agent-witch] Starting ${g} session\u2026`),mv(e,g,b,S,A))}if(l.type==="command.claude.stop"&&L(l.payload)){let g=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";g.length>0&&(console.log(`[agent-witch] Stopping run ${g}\u2026`),Rm(e,yi(A),g,S))}if(l.type==="command.claude.input_respond"&&L(l.payload)){let g=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",b=typeof l.payload.response=="string"?l.payload.response.trim():"",w=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",C=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",G=typeof l.payload.question=="string"?l.payload.question:"";g.length>0&&b.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),km(e,{agentRunId:g,originalPrompt:w,partialOutput:C,question:G,response:b,shellSessionId:hf.get(g)},S,yi(A)))}if(l.type==="dispatch.approval.required"&&L(l.payload)){let g=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",b=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${g}: ${b}`),process.platform==="darwin"&&(0,Ai.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${g.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&L(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),gv(e,l.payload,S,A)),l.type==="harness.export.request"&&L(l.payload)){let g=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",b=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,w=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(C=>typeof C=="string"):[];g.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:C}=await Promise.resolve().then(()=>(gf(),pf)),G=C(w,e.email);P(A,{type:"harness.export.result",payload:{success:G.length>0,borrowerUserId:g,...b!==void 0?{targetDeviceId:b}:{},sets:G,errorMessage:G.length>0?void 0:"No readable harness sets were found on this machine."},requestId:S})})()}if(l.type==="harness.manifest.request"&&Uo(A,e.layout),l.type==="command.claude.result"&&L(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let g=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,b=hi(g!==void 0?yf.get(g):void 0),w=g!==void 0?Af.get(g)??"":"";np({layout:e.layout,text:l.payload.output,source:g??"command.claude.result",projectFolderPath:b}),w.trim().length>0&&jg({layout:e.layout,projectFolderPath:b,entry:{id:`${Date.now()}-${g??"run"}`,...g!==void 0?{agentRunId:g}:{},prompt:w,output:l.payload.output,createdAt:new Date().toISOString()}})}},v=()=>{if(t.stopped)return;i(),c();let l=new wr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),xs(e.layout,{wsUrl:e.wsUrl}),_m(ht({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Wm(e.layout);let A=J(e.wsUrl)??"http://localhost:3000",S=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),g=Xm({layout:e.layout,origin:A,...S!==void 0&&S.length>0?{claimToken:S}:{}});P(l,{type:"agent.register",payload:{role:"agent",hostname:Gt.default.hostname(),macOsUsername:Gt.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...g}},e.layout),Uo(l,e.layout),Lm(e,l),m(l)}),l.on("message",A=>{let S=typeof A=="string"?A:A.toString("utf8");try{let g=JSON.parse(S);if(!L(g))return;y(g,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",()=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1,console.log("[agent-witch] Disconnected from server."),d()}),l.on("error",A=>{t.wakeError=A.message,console.error(`[agent-witch] Socket error: ${A.message}`)})};return{connect:v,startLocalHealthCheck:u,stop:()=>{t.stopped=!0,s(),a(),i(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Hg(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,v()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Uo(l,e.layout),{ok:!0})}}},yv=async()=>{let e=()=>{let r=Oi();if(r.length===0){let n=Sf(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=Sf(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},vf=async()=>{dt("agent-witch"),Jd().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=_();eu(t);let r=Xd({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),vn();let n=await yv(),o=n.map(d=>hv(d)),s=o[0];s===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),fa(),process.exit(0));let a=()=>{for(let d of o)d.reviveWebSocket()},i=()=>{},c=await _u({reconnectWebSockets:a,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),i()}});Mg({layout:n[0].layout,controllers:{getStatus:s.getStatus,reviveWebSocket:a,reportHarnessManifestIfConnected:s.reportHarnessManifestIfConnected}});for(let d of o)d.startLocalHealthCheck(),d.connect();console.log(`[agent-witch] Bridging ${o.length} account profile(s) in one process.`);let u=cn(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),ln(),i()});i=()=>{u(),c.stop(),fa(),console.log("[agent-witch] Shutting down.");for(let d of o)d.stop();process.exit(0)},process.on("SIGINT",()=>{i()}),process.on("SIGTERM",()=>{i()})},Av=vf;if(mt(Sv.url)&&!ee()){let e=process.argv.indexOf("report");e>=0&&process.exit(yn(process.argv.slice(e))),vf()}});dn();ts();An();var ll="20.x",cl="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var Qf=e=>[`Node.js ${ll} or newer is required (found ${e}).`,cl].join(" "),dl=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${Qf(process.version)}
`),process.exit(1))};var _v={},vv=async()=>{dt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ft(),_n)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},bv=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Gs(),Uc)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},wv=async()=>{if(!mt(_v.url))return;dl();let e=process.argv.indexOf("report");e>=0&&process.exit(yn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await vv();return}if(t==="wake"){await bv();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(wf(),bf));await r()};wv();
