#!/usr/bin/env node
"use strict";var Qf=Object.create;var Ko=Object.defineProperty;var eh=Object.getOwnPropertyDescriptor;var th=Object.getOwnPropertyNames;var rh=Object.getPrototypeOf,nh=Object.prototype.hasOwnProperty;var m=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var F=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},He=(e,t)=>{for(var r in t)Ko(e,r,{get:t[r],enumerable:!0})},oh=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of th(t))!nh.call(e,o)&&o!==r&&Ko(e,o,{get:()=>t[o],enumerable:!(n=eh(t,o))||n.enumerable});return e};var f=(e,t,r)=>(r=e!=null?Qf(rh(e)):{},oh(t||!e||!e.__esModule?Ko(r,"default",{value:e,enumerable:!0}):r,e));var Ti,Ci,qo=m(()=>{"use strict";Ti=new Set(["","loginwindow","_mbsetupuser","root"]),Ci=5e3});var Pi,rn,Jo=m(()=>{"use strict";Pi=require("node:child_process"),rn=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Pi.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ee,it=m(()=>{"use strict";ee=()=>!0});var nn,Ii,sh,on,Yo=m(()=>{"use strict";nn=f(require("node:path")),Ii=require("node:url");it();sh={},on=()=>{if(ee()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return nn.default.dirname(nn.default.resolve(e))}return nn.default.dirname((0,Ii.fileURLToPath)(sh.url))}});var ae,Ni,lt=m(()=>{"use strict";ae="agent-witch.js",Ni="command"});var Zo,Fi,E,ah,Xo,Qo,ih,lh,ch,dh,De,uh,Oi,Mi,Hi,es,ie,sn,an,Di,ct,dt,v,Ui,ts,ji,$i,ln,Bi,Gi,le,rs,mh,ph,Ee,gh,W,L=m(()=>{"use strict";Zo=f(require("node:fs")),Fi=f(require("node:os")),E=f(require("node:path"));Yo();lt();ah=on(),Xo=".agent-witch",Qo=".local-agent-witch",ih=47892,lh=47893,ch="com.agent-witch",dh="com.local-agent-witch",De="profiles",uh="active-profile.json",Oi="harness",Mi="sets",Hi="manifest.json",es="projects",ie="logs",sn="agent-witch.log",an="agent-witch.error.log",Di="reports",ct="device-keypair.json",dt=e=>e.trim().toLowerCase(),v=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return E.default.resolve(e);let t=E.default.resolve(ah),r=E.default.basename(t),n=E.default.basename(E.default.dirname(t));return r==="app"&&(n===Xo||n===Qo)?E.default.dirname(t):r===Xo||r===Qo?t:E.default.join(Fi.default.homedir(),Xo)},Ui=(e=v())=>E.default.join(e,"app"),ts=(e=v())=>E.default.join(Ui(e),ae),ji=(e,t,r)=>t!==null?E.default.join(e,De,t,r):E.default.join(e,r),$i=e=>ji(e.installDir,e.profileEmail,es),ln=e=>ji(e.installDir,e.profileEmail,ie),Bi=e=>e.profileEmail!==null?E.default.join(e.installDir,De,e.profileEmail,ct):E.default.join(e.installDir,ct),Gi=e=>E.default.basename(e)===Qo,le=(e=v())=>Gi(e)?dh:ch,rs=(e=v())=>Gi(e)?lh:ih,mh=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return dt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?dt(t):null},ph=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ee=(e=v())=>{let t=E.default.join(e,uh);if(!Zo.default.existsSync(t))return null;try{let r=JSON.parse(Zo.default.readFileSync(t,"utf8"));if(ph(r)&&typeof r.email=="string"&&r.email.trim().length>0)return dt(r.email)}catch{return null}return null},gh=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?dt(r):null}let t=mh();return t!==null?t:Ee()},W=e=>{let t=v(),r=Ui(t),n=ts(t),o=gh(e);if(o!==null){let h=E.default.join(t,De,o),_=E.default.join(h,Oi),y=E.default.join(h,es),l=E.default.join(h,ie),A=E.default.join(h,Di),S=E.default.join(h,ct),g=E.default.join(h,ie,sn),b=E.default.join(h,ie,an);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:l,mainLogPath:g,errorLogPath:b,reportsDir:A,deviceKeypairPath:S,configPath:E.default.join(h,"config.json"),harnessRootDir:_,harnessManifestPath:E.default.join(_,Hi),harnessSetsDir:E.default.join(_,Mi)}}let s=E.default.join(t,Oi),a=E.default.join(t,es),i=E.default.join(t,ie),c=E.default.join(t,Di),p=E.default.join(t,ct),d=E.default.join(t,ie,sn),u=E.default.join(t,ie,an);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:a,logsDir:i,mainLogPath:d,errorLogPath:u,reportsDir:c,deviceKeypairPath:p,configPath:E.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:E.default.join(s,Hi),harnessSetsDir:E.default.join(s,Mi)}}});var cn,ns,Vi,U,zi,Fe=m(()=>{"use strict";cn=f(require("node:fs")),ns=f(require("node:path"));L();Vi=e=>{let t=ns.default.join(e,De);return cn.default.existsSync(t)?cn.default.readdirSync(t).filter(r=>cn.default.statSync(ns.default.join(t,r)).isDirectory()).map(r=>dt(r)).toSorted():[]},U=(e=v())=>{let t=le(e);return[{profileEmail:Vi(e)[0]??null,launchAgentLabel:t}]},zi=(e=v())=>Vi(e)});var dn,ut,Ki,os,qi,fh,Ji,hh,yh,Jt,Ah,Yi,un=m(()=>{"use strict";dn=require("node:child_process"),ut=f(require("node:fs")),Ki=f(require("node:os")),os=f(require("node:path")),qi=require("node:util");Fe();L();fh=(0,qi.promisify)(dn.execFile),Ji=()=>os.default.join(Ki.default.homedir(),"Library","LaunchAgents"),hh=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await fh("launchctl",["bootout",r]).catch(()=>{})},yh=e=>{let t=os.default.join(Ji(),`${e}.plist`);ut.default.existsSync(t)&&ut.default.unlinkSync(t)},Jt=(e=v())=>{let t=le(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of U(e))r.add(o.launchAgentLabel);let n=Ji();if(ut.default.existsSync(n))for(let o of ut.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},Ah=e=>{(0,dn.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Yi=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=v();if(!ut.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Jt(e);for(let r of t)await hh(r),yh(r);return Ah(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var mn,ss=m(()=>{"use strict";Jo();un();L();mn=(e=v())=>{for(let t of Jt(e))rn(t)}});var Xi,Sh,_h,Zi,Qi=m(()=>{"use strict";Xi=require("node:child_process");qo();Sh=e=>e.trim().toLowerCase(),_h=e=>e==null?!1:!Ti.has(Sh(e)),Zi=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Xi.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return _h(t)?t:null}catch{return null}}});var tl,el,ce,Yt=m(()=>{"use strict";tl=f(require("node:os"));Qi();el=e=>e.trim().toLowerCase(),ce=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Zi():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??tl.default.userInfo().username;return el(r)===el(n)}});var mt,pn,gn=m(()=>{"use strict";qo();ss();Yt();mt=e=>{ce()||(mn(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},pn=(e,t=Ci)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{ce()||e()},t);return()=>{clearInterval(r)}}});var rl,nl,ol,fn,hn,sl,al,pt=m(()=>{"use strict";rl=".agent-witch",nl="memory",ol="project.json",fn="chunks.ndjson",hn="runs.ndjson",sl="reports",al=".json"});var il,yn,as=m(()=>{"use strict";il=f(require("node:path"));pt();yn=(e,t)=>il.default.join(e.trim(),`${t.trim()}${al}`)});var Ue,ll,cl=m(()=>{"use strict";lt();Ue=e=>`'${e.replace(/'/g,"'\\''")}'`,ll=e=>{let t=`${e.installDir.trim()}/${"app"}/${ae}`,r=[Ue("node"),Ue(t),"report","write","--key",Ue(e.reportKey.trim()),"--agent-run-id",Ue(e.agentRunId.trim()),"--status",Ue(e.status),"--summary",Ue(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ue(e.details.trim())),r.join(" ")}});var te,dl,bh,ul,An=m(()=>{"use strict";as();cl();te={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},dl=e=>e===te.COMPLETED||e===te.FAILED,bh=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),ul=(e,t)=>{let r=yn(t.reportsDir,t.reportKey),n=ll({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:te.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${bh({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Xt,pl,ml,gl,wh,Sn,vh,Eh,Zt,_n,fl,hl,Qt=m(()=>{"use strict";Xt=f(require("node:fs")),pl=f(require("node:path"));An();as();L();ml=50,gl=e=>{let t=W(),r=yn(t.reportsDir,e);return Xt.default.mkdirSync(pl.default.dirname(r),{recursive:!0}),r},wh=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Sn=e=>{let t=gl(e);if(!Xt.default.existsSync(t))return null;try{let r=JSON.parse(Xt.default.readFileSync(t,"utf8"));return wh(r)?r:null}catch{return null}},vh=(e,t)=>{let r=[...e,t];return r.length>ml?r.slice(r.length-ml):r},Eh=e=>{let t=gl(e.reportKey);Xt.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Zt=e=>{let t=Sn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:vh(t?.history??[],n)};return Eh(o),o},_n=e=>{let t=Sn(e.reportKey);return t!==null?t:Zt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:te.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},fl=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},hl=e=>{if(e===null||!dl(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===te.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Wh,Lh,er,yl,bn,is=m(()=>{"use strict";An();Qt();Wh=new Set(Object.values(te)),Lh=e=>Wh.has(e),er=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},yl=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},bn=e=>{if(e[0]!=="write")return yl(),1;let r=er(e,"--key"),n=er(e,"--agent-run-id"),o=er(e,"--status"),s=er(e,"--summary"),a=er(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!Lh(o)?(yl(),1):(Zt({reportKey:r,agentRunId:n,status:o,userSummary:s,details:a}),0)}});var ls,Al,gt,wn=m(()=>{"use strict";ls=f(require("node:path")),Al=require("node:url");it();gt=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=ls.default.resolve(t);return ee()?r===ls.default.resolve(__filename):r===(0,Al.fileURLToPath)(e)}});var tr,cs,xh,Th,wl,j,vl,vn,je=m(()=>{"use strict";tr=f(require("node:fs")),cs=f(require("node:path"));L();xh="install-version.json",Th=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wl=(e=v())=>cs.default.join(e,xh),j=(e=v())=>{let t=wl(e);if(!tr.default.existsSync(t))return null;try{let r=JSON.parse(tr.default.readFileSync(t,"utf8"));return!Th(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},vl=(e,t=v())=>{let r=wl(t);tr.default.mkdirSync(cs.default.dirname(r),{recursive:!0}),tr.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},vn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var Wl,Ll,kl,Rl,xl,rr,Ch,Ph,Ih,El,We,nr=m(()=>{"use strict";Wl=require("node:child_process"),Ll=f(require("node:fs")),kl=f(require("node:os")),Rl=f(require("node:path")),xl=require("node:util");Yt();rr=(0,xl.promisify)(Wl.execFile),Ch=e=>Rl.default.join(kl.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Ph=async e=>{try{return await rr("launchctl",["print",e]),!0}catch{return!1}},Ih=async(e,t,r)=>{await Ph(t)&&await rr("launchctl",["bootout",t]).catch(()=>{}),await rr("launchctl",["bootstrap",e,r]),await rr("launchctl",["enable",t])},El=async e=>{try{return await rr("launchctl",["kickstart","-k",e]),!0}catch{return!1}},We=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!ce())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await El(n))return{ok:!0};let o=Ch(e);if(!Ll.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Ih(r,n,o),await El(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var Nh,En,ds=m(()=>{"use strict";Jo();un();Fe();L();Nh=(e=v())=>{let t=new Set(U(e).map(r=>r.launchAgentLabel));return Jt(e).filter(r=>!t.has(r))},En=(e=v())=>{for(let t of Nh(e))rn(t)}});var J,ft=m(()=>{"use strict";J=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Tl,$e,us,Oh,Mh,Cl,ht,Wn,ms=m(()=>{"use strict";Tl=require("node:crypto"),$e=f(require("node:fs")),us=f(require("node:path"));L();Oh="self-update-log.ndjson",Mh=100,Cl=(e=v())=>{let t=W(),r=t.installDir===e?t.logsDir:ln({installDir:e,profileEmail:t.profileEmail});return us.default.join(r,Oh)},ht=(e,t=v())=>{let r={id:(0,Tl.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Cl(t);$e.default.mkdirSync(us.default.dirname(n),{recursive:!0});let o=$e.default.existsSync(n)?$e.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Mh+1)),JSON.stringify(r)];return $e.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Wn=(e=20,t=v())=>{let r=Cl(t);if(!$e.default.existsSync(r))return[];let n=$e.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Pl,Il,Nl=m(()=>{"use strict";Pl="deps.tar.gz",Il="deps"});var Ml,Le,Be,Hh,Hl,Dl,Fl=m(()=>{"use strict";Ml=require("node:child_process"),Le=f(require("node:fs")),Be=f(require("node:path"));Nl();Hh=e=>Be.default.join(e,"app",Il),Hl=e=>{let t=Be.default.join(e,"app"),r=Be.default.join(t,Pl);Le.default.existsSync(r)&&(Le.default.rmSync(Hh(e),{recursive:!0,force:!0}),Le.default.mkdirSync(t,{recursive:!0}),(0,Ml.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Le.default.rmSync(r,{force:!0}))},Dl=e=>{Le.default.rmSync(Be.default.join(e,"node_modules"),{recursive:!0,force:!0}),Le.default.rmSync(Be.default.join(e,"package.json"),{force:!0}),Le.default.rmSync(Be.default.join(e,"package-lock.json"),{force:!0})}});var kn={};He(kn,{buildAgentWitchSelfUpdateStatus:()=>fs,fetchAgentWitchRemoteInstallBundleVersion:()=>ps,runAgentWitchSelfUpdate:()=>gs});var ke,Ln,Ul,Dh,jl,ps,Fh,Uh,or,gs,fs,yt=m(()=>{"use strict";ke=f(require("node:fs")),Ln=f(require("node:path"));je();nr();ds();Fe();ft();L();lt();ms();Fl();Ul=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dh=e=>{let t=Ee(e),r=t===null?W():W(t);if(!ke.default.existsSync(r.configPath))return null;try{let n=JSON.parse(ke.default.readFileSync(r.configPath,"utf8"));return!Ul(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},jl=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!Ul(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},ps=async e=>(await jl(e))?.bundleVersion??null,Fh=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=Ln.default.join(t,r);ke.default.mkdirSync(Ln.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());ke.default.writeFileSync(o,s),r.endsWith(".js")&&ke.default.chmodSync(o,493)},Uh=async()=>{En();let e=U();for(let t of e)await We(t.launchAgentLabel)},or=(e,t)=>({localBundleVersion:t,...e}),gs=async e=>{let t=v(),r=j(t),n=r?.bundleVersion??null,o=Dh(t),s=o===null?r?.appOrigin??null:J(o);if(s===null){let c=or({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return ht({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let a=await jl(s);if(a===null){let c=or({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return ht({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||vn(n,a.bundleVersion))){let c=or({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return ht({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),c}try{for(let d of a.scripts)await Fh(s,t,d);let c=Ln.default.join(t,ae);ke.default.existsSync(c)&&ke.default.rmSync(c,{force:!0}),Hl(t),Dl(t),vl({bundleVersion:a.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await Uh();let p=or({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return ht({event:"update_applied",ok:!0,message:p.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),p}catch(c){let p=c instanceof Error?c.message:"Agent Witch self-update failed.",d=or({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return ht({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}},fs=()=>{let e=v();return{local:j(e),logs:Wn(20,e)}}});var Rn,sr,$l,hs,ar,ys=m(()=>{"use strict";Rn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=i=>n.find(c=>c.type===i)?.value??"0",s=o("weekday"),a={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:a[s]??0}},sr=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=Rn(o,t),a=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-a*6e4)},$l=e=>e>=1&&e<=5,hs=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Rn(t,"UTC")},ar=e=>{let t=e.from??new Date,r=Rn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return sr(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=sr(r,e.timeZone,n,0),s=Rn(o,e.timeZone),a=t.getTime()>=o.getTime();if(e.preset==="daily")return a?sr(hs(r),e.timeZone,n,0):o;if(!a&&$l(s.weekday))return o;let i=r;for(let c=0;c<8;c+=1)if(i=hs(i),$l(i.weekday))return sr(i,e.timeZone,n,0);return sr(hs(r),e.timeZone,n,0)}});var jh,xn,As=m(()=>{"use strict";jh=e=>e==="hourly"||e==="daily"||e==="weekdays",xn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",a=typeof t.schedulePreset=="string"?t.schedulePreset:"",i=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!jh(a)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:a,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:i,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var ir,Tn,Bl,Gl,Ss,Re,Vl,zl,Kl,ql,lr=m(()=>{"use strict";ir=f(require("node:fs")),Tn=f(require("node:path"));As();Bl="automations.json",Gl=e=>e.profileEmail!==null?Tn.default.join(e.installDir,"profiles",e.profileEmail,Bl):Tn.default.join(e.installDir,Bl),Ss=()=>({version:1,automations:[]}),Re=e=>{let t=Gl(e);if(!ir.default.existsSync(t))return Ss();try{let r=JSON.parse(ir.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Ss():{version:1,automations:r.automations.flatMap(o=>{let s=xn(o);return s!==null?[s]:[]})}}catch{return Ss()}},Vl=(e,t)=>{let r=Gl(e);ir.default.mkdirSync(Tn.default.dirname(r),{recursive:!0}),ir.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},zl=(e,t)=>{Vl(e,{version:1,automations:t})},Kl=(e,t)=>{let n=Re(e).automations.filter(o=>o.id!==t.id);Vl(e,{version:1,automations:[...n,t]})},ql=(e,t)=>Re(e).automations.find(r=>r.id===t)??null});var $h,Bh,Cn,_s=m(()=>{"use strict";ys();As();lr();L();$h=e=>e!==void 0&&e.trim().length>0?W(e.trim()):W(),Bh=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??ar({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??ar({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Cn=e=>{let t=$h(e.profileEmail),r=Re(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let a=xn(s);return a!==null?[Bh(a,n.get(a.id))]:[]});return zl(t,o),{ok:!0,writtenCount:o.length}}});var Jl,Yl=m(()=>{"use strict";Jl="x-agent-witch-token"});var At,bs,Xl,Pn,Zl,cr=m(()=>{"use strict";Yl();ft();At=e=>{let t=J(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},bs=e=>({[Jl]:e,"Content-Type":"application/json"}),Xl=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:bs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,a=typeof s.id=="string"?s.id:"",i=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return a.length===0||i.length===0?null:{id:a,prompt:i,writerAgent:c}}catch{return null}},Pn=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:bs(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},Zl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:bs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var In,dr,N,xe,Ql,St,Ge=m(()=>{"use strict";In={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},dr=e=>e.trim().length>0,N=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",xe=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:dr(t)?t.trim():In.claudeCommand,codexCommand:dr(r)?r.trim():In.codexCommand,cursorCommand:dr(n)?n.trim():In.cursorCommand,antigravityCommand:dr(o)?o.trim():In.antigravityCommand}},Ql=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},St=(e,t,r,n)=>{let o=t.trim();if(!dr(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var ec,_t,Nn=m(()=>{"use strict";ec=require("node:child_process");Ge();_t=(e,t,r)=>new Promise(n=>{if(!N(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=St(t,r,xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,ec.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),a=[];s.stdout?.on("data",i=>{a.push(i.toString("utf8"))}),s.stderr?.on("data",i=>{a.push(i.toString("utf8"))}),s.on("close",i=>{n({exitCode:i??-1,output:a.join("")})}),s.on("error",i=>{n({exitCode:-1,output:i.message})})})});var ws,Gh,Vh,zh,Kh,qh,Jh,$,Ve=m(()=>{"use strict";ws=f(require("node:fs"));L();Gh="ws://localhost:3000/api/agent-witch/ws",Vh="claude",zh="codex",Kh="cursor",qh="agy",Jh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=W();if(!ws.default.existsSync(e.configPath))return null;try{let t=JSON.parse(ws.default.readFileSync(e.configPath,"utf8"));if(!Jh(t))return null;let r=typeof t.wsUrl=="string"&&t.wsUrl.length>0?t.wsUrl:Gh,n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),o=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:r,workspace:n,claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:Vh,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:zh,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:Kh,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:qh,pairingToken:o,layout:e}}catch{return null}}});var tc,vs,bt,On=m(()=>{"use strict";tc=require("node:crypto");cr();ys();Nn();lr();Ve();vs=!1,bt=async e=>{if(vs)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=At({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=ql(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};vs=!0;let o=(0,tc.randomUUID)();try{let s=await _t(t,"claude-cli",n.prompt);await Zl(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let a=new Date,i=ar({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:a});return Kl(t.layout,{...n,lastRunAt:a.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:i.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{vs=!1}}});function ur(e){return(0,rc.createHash)("sha256").update(e.trim()).digest("hex")}var rc,Es=m(()=>{"use strict";rc=require("node:crypto")});var Yh,nc,Xh,Zh,mr,oc,Ws=m(()=>{"use strict";Yh=["agentwitch.com","www.agentwitch.com"],nc=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Xh=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},Zh=e=>{let t=Xh(e);return!!(Yh.includes(t)||nc.test(e.trim().toLowerCase()))},mr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return Zh(r)?nc.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},oc=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:mr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Mn,sc,Qh,ey,ac,ic,Ls,Hn,Dn=m(()=>{"use strict";Mn=f(require("node:fs")),sc=f(require("node:path")),Qh="wake-port.json",ey=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ac=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,ic=e=>sc.default.join(e,Qh),Ls=e=>{let t=ic(e);if(!Mn.default.existsSync(t))return null;try{let r=JSON.parse(Mn.default.readFileSync(t,"utf8"));if(ey(r)&&ac(r.wakePort))return r.wakePort}catch{return null}return null},Hn=(e,t)=>{if(!ac(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=ic(e);Mn.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var nv,ov,sv,Y,lc,wt=m(()=>{"use strict";Dn();L();Dn();nv=rs(),ov=`${le()}-wake`,sv=le(),Y=()=>{let e=v(),t=Ls(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return rs()},lc=e=>{let t=v();Ls(t)===null&&Hn(t,e)}});var vt,pr,ty,cc,dc,uc=m(()=>{"use strict";vt=f(require("node:fs")),pr=f(require("node:path"));Es();L();ty=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cc=e=>{if(!vt.default.existsSync(e))return null;try{let t=JSON.parse(vt.default.readFileSync(e,"utf8"));return!ty(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:ur(t.pairingToken.trim())}catch{return null}},dc=(e=v())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(cc(pr.default.join(e,"config.json")));let o=pr.default.join(e,De);if(!vt.default.existsSync(o))return t;for(let s of vt.default.readdirSync(o)){let a=pr.default.join(o,s);vt.default.statSync(a).isDirectory()&&n(cc(pr.default.join(a,"config.json")))}return t}});var mc,pc=m(()=>{"use strict";mc=["rule","skill","command","instruction","agent"]});var gc,ry,ny,fc,hc=m(()=>{"use strict";pc();gc=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ry=e=>typeof e=="string"&&mc.includes(e),ny=e=>{if(!gc(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!ry(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},fc=e=>{if(!gc(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let a=ny(s);return a===null?[]:[a]});return{name:t,slug:r,items:o}}});var yc,oy,sy,ay,iy,ly,cy,dy,uy,Fn,ks=m(()=>{"use strict";yc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},oy=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},sy=(e,t)=>{let r=oy(t),n=yc(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},ay=(e,t,r)=>{let n=sy(t,r);return`shared/items/${e}/${n}`},iy=["rules","skills","commands","instructions","agents"],ly=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),cy=(e,t)=>[...e.filter(n=>n.id!==t.id),t],dy=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},uy=e=>({id:e.id,kind:e.kind,title:e.title,path:ay(e.id,e.kind,e.title)}),Fn=e=>{let t=new Date().toISOString(),r=e.existingManifest??ly(e.hostname,t),n=yc(e.bundle.slug),o=dy(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...iy.map(p=>`sets/${n}/${p}`),"shared/items"],{files:a,nextItems:i}=e.bundle.items.reduce((p,d)=>{let u=uy(d);return{files:[...p.files,{relativePath:u.path,content:d.content}],nextItems:cy(p.nextItems,u)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:i}}},directories:s,files:a}}});var Te,Ac,Un,my,Sc,_c=m(()=>{"use strict";Te=f(require("node:fs")),Ac=f(require("node:os")),Un=f(require("node:path"));ks();L();my=e=>{if(!Te.default.existsSync(e))return null;try{let t=JSON.parse(Te.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Sc=e=>{let t=W(e.profileEmail);try{let r=my(t.harnessManifestPath),n=Fn({bundle:e.bundle,hostname:Ac.default.hostname(),existingManifest:r});Te.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)Te.default.mkdirSync(Un.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=Un.default.join(t.harnessRootDir,o.relativePath);Te.default.mkdirSync(Un.default.dirname(s),{recursive:!0}),Te.default.writeFileSync(s,o.content)}return Te.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var bc,wc,jn,Rs=m(()=>{"use strict";bc=require("node:child_process"),wc=f(require("node:fs"));Yt();L();jn=(e=v())=>{let t=ts(e);if(!wc.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!ce())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ee(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,bc.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var xs,de,bv,Et=m(()=>{"use strict";L();xs="connection-health.json",de=12e4,bv=`${le()}-watchdog`});var vc,ze,Ts,py,gy,fy,Ec,hy,Wc,$n,Bn=m(()=>{"use strict";vc=require("node:crypto"),ze=f(require("node:fs")),Ts=f(require("node:path"));L();py="watchdog-log.ndjson",gy=200,fy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ec=(e=v())=>{let t=W(),r=t.installDir===e?t.logsDir:ln({installDir:e,profileEmail:t.profileEmail});return Ts.default.join(r,py)},hy=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!fy(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Wc=(e,t=v())=>{let r={id:(0,vc.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=Ec(t);ze.default.mkdirSync(Ts.default.dirname(n),{recursive:!0});let o=ze.default.existsSync(n)?ze.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-gy+1)),JSON.stringify(r)];return ze.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},$n=(e=20,t=v())=>{let r=Ec(t);if(!ze.default.existsSync(r))return[];let n=ze.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=hy(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var gr,Gn,yy,Lc,re,Cs,ue,fr=m(()=>{"use strict";gr=f(require("node:fs")),Gn=f(require("node:path"));Et();yy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lc=e=>e.profileEmail===null?Gn.default.join(e.installDir,xs):Gn.default.join(e.installDir,"profiles",e.profileEmail,xs),re=e=>{let t=Lc(e);if(!gr.default.existsSync(t))return null;try{let r=JSON.parse(gr.default.readFileSync(t,"utf8"));return!yy(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},Cs=(e,t)=>{let r=Lc(e),n=re(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};gr.default.mkdirSync(Gn.default.dirname(r),{recursive:!0}),gr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ue=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var kc,Rc,Ay,hr,Ps=m(()=>{"use strict";kc=require("node:child_process"),Rc=require("node:util"),Ay=(0,Rc.promisify)(kc.execFile),hr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Ay("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var xc,Is=m(()=>{"use strict";xc="watchdog-reinstall-state.json"});var Tc={};He(Tc,{verifyAgentWitchReviveAfterKickstart:()=>by});var _y,by,Cc=m(()=>{"use strict";Is();fr();Ps();L();_y=e=>new Promise(t=>{setTimeout(t,e)}),by=async e=>{if(await _y(e.verifyDelayMs??3e3),!await hr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?W():W(e.profileEmail),n=re(r);return!ue(n,e.staleAfterMs)}});var yr,Ns,vy,Pc,Ey,Ic,Nc,Oc=m(()=>{"use strict";yr=f(require("node:fs")),Ns=f(require("node:path"));Is();L();vy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pc=e=>Ns.default.join(e,xc),Ey=(e=v())=>{let t=Pc(e);if(!yr.default.existsSync(t))return null;try{let r=JSON.parse(yr.default.readFileSync(t,"utf8"));return!vy(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Ic=(e=v(),t=Date.now())=>{let r=Ey(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},Nc=(e=v(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=Pc(e);return yr.default.mkdirSync(Ns.default.dirname(n),{recursive:!0}),yr.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Mc,Wt,Hc,Dc,Fc,Wy,Ly,Uc,ky,Ry,jc,$c=m(()=>{"use strict";Mc=require("node:child_process"),Wt=f(require("node:fs")),Hc=f(require("node:os")),Dc=f(require("node:path")),Fc=require("node:util");je();ft();L();Wy=(0,Fc.promisify)(Mc.execFile),Ly=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Uc=e=>{let t=Ee(e),r=t===null?W():W(t);if(!Wt.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Wt.default.readFileSync(r.configPath,"utf8"));return!Ly(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},ky=e=>Uc(e)?.wsUrl??null,Ry=e=>{let t=ky(e);return t!==null?J(t):j(e)?.appOrigin??null},jc=async e=>{let t=e?.installDir??v(),r=Uc(t),n=r!==null?J(r.wsUrl):Ry(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let a=Dc.default.join(Hc.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Wt.default.writeFileSync(a,await s.text(),{encoding:"utf8",mode:448});let i=e?.profileEmail??Ee(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...i===null?{}:{AGENT_WITCH_PROFILE:i}};return await Wy("bash",[a],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Agent Witch reinstall script failed."}}finally{Wt.default.existsSync(a)&&Wt.default.unlinkSync(a)}}});var Bc={};He(Bc,{attemptAgentWitchWatchdogReinstall:()=>xy});var xy,Gc=m(()=>{"use strict";Oc();nr();$c();xy=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!Ic())return{attempted:!1,ok:!1,targets:e};Nc();let r=await jc();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await We(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var Vc,zc,Kc,Ty,Cy,Py,Os,Ms=m(()=>{"use strict";Yt();Et();fr();Ps();nr();Fe();L();Rs();Bn();Vc=e=>e===null?W():W(e),zc=async(e,t,r)=>{if(!await hr(e))return"not_running";let o=Vc(t),s=re(o);return ue(s,r)?"stale_connection":"healthy"},Kc=async e=>{let t=e?.staleAfterMs??de,r=v(),n=U(r);return Promise.all(n.map(async o=>{let s=await zc(o.launchAgentLabel,o.profileEmail,t),a=Vc(o.profileEmail),i=re(a),c=await hr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:i,isConnectionStale:ue(i,t),needsRevive:s!=="healthy",reason:s}}))},Ty=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Cy=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",Py=async e=>{let t=await We(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(Cc(),Tc)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Os=async e=>{if(!ce())return{ok:!0,targets:[]};let t=e?.staleAfterMs??de,r=v(),n=U(r),o=[];for(let d of n){let u=await zc(d.launchAgentLabel,d.profileEmail,t);if(u==="healthy"){o.push({launchAgentLabel:d.launchAgentLabel,profileEmail:d.profileEmail,revived:!1,reason:u});continue}o.push(await Py({launchAgentLabel:d.launchAgentLabel,profileEmail:d.profileEmail,reason:u,staleAfterMs:t}))}if(o.length===0){let d=jn();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:d.ok,reason:"not_running",...d.errorMessage!==void 0?{errorMessage:d.errorMessage}:{}})}let s=!1,a=!1,i,c=o;if(o.some(d=>d.reason!=="healthy"&&!d.revived))try{let{attemptAgentWitchWatchdogReinstall:d}=await Promise.resolve().then(()=>(Gc(),Bc)),u=await d(o);s=u.attempted,a=u.ok,i=u.errorMessage,c=[...u.targets]}catch(d){s=!0,a=!1,i=d instanceof Error?d.message:"Watchdog reinstall helper is unavailable."}let p={ok:c.some(d=>d.revived||d.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:a,...i!==void 0?{reinstallErrorMessage:i}:{}}:{}};return e?.skipLog!==!0&&Wc({event:Cy(c,p.ok,{reinstallAttempted:s,reinstallOk:a}),ok:p.ok,message:Ty(c,{reinstallAttempted:s,reinstallOk:a,reinstallErrorMessage:i}),targets:c}),p}});var qc,Jc,Yc=m(()=>{"use strict";qc=f(require("node:os"));Et();Bn();Ms();Jc=async()=>{let e=await Kc(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:qc.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:de,healthyProfileCount:t,profiles:e,lastLog:$n(1)[0]??null}}});var Xc={};He(Xc,{buildAgentWitchAutomationStatusFromWakeServer:()=>Us,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ks,buildAgentWitchWakeHealthResponse:()=>js,buildAgentWitchWakeIdentityResponse:()=>$s,buildAgentWitchWatchdogStatus:()=>Gs,installHarnessFromWakeServer:()=>zn,readAgentWitchSelfUpdateLogEntries:()=>qn,readAgentWitchWatchdogLogEntries:()=>Kn,restartAgentWitchFromWakeServer:()=>zs,reviveAgentWitchWebSocketFromWakeServer:()=>Vs,runAgentWitchSelfUpdateFromWakeServer:()=>qs,runAgentWitchUninstallLocalFromWakeServer:()=>Js,runAutomationFromWakeServer:()=>Fs,syncAutomationsFromWakeServer:()=>Ds,wakeAgentWitchLaunchAgents:()=>Bs});var Vn,Hs,zn,Ds,Fs,Us,js,$s,Bs,Kn,Gs,Vs,zs,Ks,qn,qs,Js,Ys=m(()=>{"use strict";_s();On();lr();Es();Ve();Vn=f(require("node:os"));Ws();wt();nr();Fe();uc();hc();_c();Rs();Yc();Bn();yt();un();ms();Ms();Hs=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zn=e=>{if(!Hs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=fc(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Sc({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},Ds=e=>{if(!Hs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Cn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Fs=async e=>{if(!Hs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:mr(t)?bt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Us=()=>{let e=$(),t=e!==null?Re(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Vn.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},js=()=>{let e=U();return{ok:!0,port:Y(),hostname:Vn.default.hostname(),profileCount:e.length}},$s=()=>{let e=U(),t=$()?.pairingToken.trim()??"",r=t.length>0?ur(t):null,n=dc();return{hostname:Vn.default.hostname(),port:Y(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Bs=async()=>{let e=U(),t=[];for(let r of e){let n=await We(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=jn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Kn=(e=20)=>$n(e),Gs=Jc,Vs=Os,zs=Os,Ks=fs,qn=(e=20)=>Wn(e),qs=e=>gs(e),Js=()=>Yi()});var me=F((w0,ed)=>{"use strict";var Zc=["nodebuffer","arraybuffer","fragments"],Qc=typeof Blob<"u";Qc&&Zc.push("blob");ed.exports={BINARY_TYPES:Zc,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Qc,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Ar=F((v0,Jn)=>{"use strict";var{EMPTY_BUFFER:Iy}=me(),Xs=Buffer[Symbol.species];function Ny(e,t){if(e.length===0)return Iy;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Xs(r.buffer,r.byteOffset,n):r}function td(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function rd(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function Oy(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Zs(e){if(Zs.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Xs(e):ArrayBuffer.isView(e)?t=new Xs(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Zs.readOnly=!1),t}Jn.exports={concat:Ny,mask:td,toArrayBuffer:Oy,toBuffer:Zs,unmask:rd};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Jn.exports.mask=function(t,r,n,o,s){s<48?td(t,r,n,o,s):e.mask(t,r,n,o,s)},Jn.exports.unmask=function(t,r){t.length<32?rd(t,r):e.unmask(t,r)}}catch{}});var sd=F((E0,od)=>{"use strict";var nd=Symbol("kDone"),Qs=Symbol("kRun"),ea=class{constructor(t){this[nd]=()=>{this.pending--,this[Qs]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Qs]()}[Qs](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[nd])}}};od.exports=ea});var Rt=F((W0,cd)=>{"use strict";var Sr=require("zlib"),ad=Ar(),My=sd(),{kStatusCode:id}=me(),Hy=Buffer[Symbol.species],Dy=Buffer.from([0,0,255,255]),Xn=Symbol("permessage-deflate"),pe=Symbol("total-length"),Lt=Symbol("callback"),Ce=Symbol("buffers"),kt=Symbol("error"),Yn,ta=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Yn){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Yn=new My(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Lt];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Yn.add(o=>{this._decompress(t,r,(s,a)=>{o(),n(s,a)})})}compress(t,r,n){Yn.add(o=>{this._compress(t,r,(s,a)=>{o(),n(s,a)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?Sr.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Sr.createInflateRaw({...this._options.zlibInflateOptions,windowBits:a}),this._inflate[Xn]=this,this._inflate[pe]=0,this._inflate[Ce]=[],this._inflate.on("error",Uy),this._inflate.on("data",ld)}this._inflate[Lt]=n,this._inflate.write(t),r&&this._inflate.write(Dy),this._inflate.flush(()=>{let s=this._inflate[kt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let a=ad.concat(this._inflate[Ce],this._inflate[pe]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[pe]=0,this._inflate[Ce]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,a)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?Sr.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Sr.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:a}),this._deflate[pe]=0,this._deflate[Ce]=[],this._deflate.on("data",Fy)}this._deflate[Lt]=n,this._deflate.write(t),this._deflate.flush(Sr.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=ad.concat(this._deflate[Ce],this._deflate[pe]);r&&(s=new Hy(s.buffer,s.byteOffset,s.length-4)),this._deflate[Lt]=null,this._deflate[pe]=0,this._deflate[Ce]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};cd.exports=ta;function Fy(e){this[Ce].push(e),this[pe]+=e.length}function ld(e){if(this[pe]+=e.length,this[Xn]._maxPayload<1||this[pe]<=this[Xn]._maxPayload){this[Ce].push(e);return}this[kt]=new RangeError("Max payload size exceeded"),this[kt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[kt][id]=1009,this.removeListener("data",ld),this.reset()}function Uy(e){if(this[Xn]._inflate=null,this[kt]){this[Lt](this[kt]);return}e[id]=1007,this[Lt](e)}});var xt=F((L0,Zn)=>{"use strict";var{isUtf8:dd}=require("buffer"),{hasBlob:jy}=me(),$y=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function By(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function ra(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function Gy(e){return jy&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Zn.exports={isBlob:Gy,isValidStatusCode:By,isValidUTF8:ra,tokenChars:$y};if(dd)Zn.exports.isValidUTF8=function(e){return e.length<24?ra(e):dd(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Zn.exports.isValidUTF8=function(t){return t.length<32?ra(t):e(t)}}catch{}});var ia=F((k0,yd)=>{"use strict";var{Writable:Vy}=require("stream"),ud=Rt(),{BINARY_TYPES:zy,EMPTY_BUFFER:md,kStatusCode:Ky,kWebSocket:qy}=me(),{concat:na,toArrayBuffer:Jy,unmask:Yy}=Ar(),{isValidStatusCode:Xy,isValidUTF8:pd}=xt(),Qn=Buffer[Symbol.species],V=0,gd=1,fd=2,hd=3,oa=4,sa=5,eo=6,aa=class extends Vy{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||zy[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[qy]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=V}_write(t,r,n){if(this._opcode===8&&this._state==V)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Qn(n.buffer,n.byteOffset+t,n.length-t),new Qn(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Qn(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case V:this.getInfo(t);break;case gd:this.getPayloadLength16(t);break;case fd:this.getPayloadLength64(t);break;case hd:this.getMask();break;case oa:this.getData(t);break;case sa:case eo:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[ud.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=gd:this._payloadLength===127?this._state=fd:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=hd:this._state=oa}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=oa}getData(t){let r=md;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&Yy(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=sa,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[ud.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let a=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(a);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let a=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(a);return}this._fragments.push(s)}this.dataMessage(r),this._state===V&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=V;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=na(n,r):this._binaryType==="arraybuffer"?o=Jy(na(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=V):(this._state=eo,setImmediate(()=>{this.emit("message",o,!0),this._state=V,this.startLoop(t)}))}else{let o=na(n,r);if(!this._skipUTF8Validation&&!pd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===sa||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=V):(this._state=eo,setImmediate(()=>{this.emit("message",o,!1),this._state=V,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,md),this.end();else{let n=t.readUInt16BE(0);if(!Xy(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Qn(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!pd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=V;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=V):(this._state=eo,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=V,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let a=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(a,this.createError),a.code=s,a[Ky]=o,a}};yd.exports=aa});var da=F((x0,_d)=>{"use strict";var{Duplex:R0}=require("stream"),{randomFillSync:Zy}=require("crypto"),{types:{isUint8Array:Qy}}=require("util"),Ad=Rt(),{EMPTY_BUFFER:eA,kWebSocket:tA,NOOP:rA}=me(),{isBlob:Tt,isValidStatusCode:nA}=xt(),{mask:Sd,toBuffer:Ke}=Ar(),z=Symbol("kByteLength"),oA=Buffer.alloc(4),to=8*1024,qe,Ct=to,X=0,sA=1,aA=2,la=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=X,this.onerror=rA,this[tA]=void 0}static frame(t,r){let n,o=!1,s=2,a=!1;r.mask&&(n=r.maskBuffer||oA,r.generateMask?r.generateMask(n):(Ct===to&&(qe===void 0&&(qe=Buffer.alloc(to)),Zy(qe,0,to),Ct=0),n[0]=qe[Ct++],n[1]=qe[Ct++],n[2]=qe[Ct++],n[3]=qe[Ct++]),a=(n[0]|n[1]|n[2]|n[3])===0,s=6);let i;typeof t=="string"?(!r.mask||a)&&r[z]!==void 0?i=r[z]:(t=Buffer.from(t),i=t.length):(i=t.length,o=r.mask&&r.readOnly&&!a);let c=i;i>=65536?(s+=8,c=127):i>125&&(s+=2,c=126);let p=Buffer.allocUnsafe(o?i+s:s);return p[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(p[0]|=64),p[1]=c,c===126?p.writeUInt16BE(i,2):c===127&&(p[2]=p[3]=0,p.writeUIntBE(i,4,6)),r.mask?(p[1]|=128,p[s-4]=n[0],p[s-3]=n[1],p[s-2]=n[2],p[s-1]=n[3],a?[p,t]:o?(Sd(t,n,p,s,i),[p]):(Sd(t,n,t,0,i),[p,t])):[p,t]}close(t,r,n,o){let s;if(t===void 0)s=eA;else{if(typeof t!="number"||!nA(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let i=Buffer.byteLength(r);if(i>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+i),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(Qy(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let a={[z]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==X?this.enqueue([this.dispatch,s,!1,a,o]):this.sendFrame(e.frame(s,a),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Tt(t)?(o=t.size,s=!1):(t=Ke(t),o=t.length,s=Ke.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[z]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Tt(t)?this._state!==X?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==X?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Tt(t)?(o=t.size,s=!1):(t=Ke(t),o=t.length,s=Ke.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[z]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Tt(t)?this._state!==X?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==X?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}send(t,r,n){let o=this._extensions[Ad.extensionName],s=r.binary?2:1,a=r.compress,i,c;typeof t=="string"?(i=Buffer.byteLength(t),c=!1):Tt(t)?(i=t.size,c=!1):(t=Ke(t),i=t.length,c=Ke.readOnly),this._firstFragment?(this._firstFragment=!1,a&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(a=i>=o._threshold),this._compress=a):(a=!1,s=0),r.fin&&(this._firstFragment=!0);let p={[z]:i,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:a};Tt(t)?this._state!==X?this.enqueue([this.getBlobData,t,this._compress,p,n]):this.getBlobData(t,this._compress,p,n):this._state!==X?this.enqueue([this.dispatch,t,this._compress,p,n]):this.dispatch(t,this._compress,p,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[z],this._state=aA,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let i=new Error("The socket was closed while the blob was being read");process.nextTick(ca,this,i,o);return}this._bufferedBytes-=n[z];let a=Ke(s);r?this.dispatch(a,r,n,o):(this._state=X,this.sendFrame(e.frame(a,n),o),this.dequeue())}).catch(s=>{process.nextTick(iA,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[Ad.extensionName];this._bufferedBytes+=n[z],this._state=sA,s.compress(t,n.fin,(a,i)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");ca(this,c,o);return}this._bufferedBytes-=n[z],this._state=X,n.readOnly=!1,this.sendFrame(e.frame(i,n),o),this.dequeue()})}dequeue(){for(;this._state===X&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][z],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][z],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};_d.exports=la;function ca(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function iA(e,t,r){ca(e,t,r),e.onerror(t)}});var xd=F((T0,Rd)=>{"use strict";var{kForOnEventAttribute:_r,kListener:ua}=me(),bd=Symbol("kCode"),wd=Symbol("kData"),vd=Symbol("kError"),Ed=Symbol("kMessage"),Wd=Symbol("kReason"),Pt=Symbol("kTarget"),Ld=Symbol("kType"),kd=Symbol("kWasClean"),ge=class{constructor(t){this[Pt]=null,this[Ld]=t}get target(){return this[Pt]}get type(){return this[Ld]}};Object.defineProperty(ge.prototype,"target",{enumerable:!0});Object.defineProperty(ge.prototype,"type",{enumerable:!0});var Je=class extends ge{constructor(t,r={}){super(t),this[bd]=r.code===void 0?0:r.code,this[Wd]=r.reason===void 0?"":r.reason,this[kd]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[bd]}get reason(){return this[Wd]}get wasClean(){return this[kd]}};Object.defineProperty(Je.prototype,"code",{enumerable:!0});Object.defineProperty(Je.prototype,"reason",{enumerable:!0});Object.defineProperty(Je.prototype,"wasClean",{enumerable:!0});var It=class extends ge{constructor(t,r={}){super(t),this[vd]=r.error===void 0?null:r.error,this[Ed]=r.message===void 0?"":r.message}get error(){return this[vd]}get message(){return this[Ed]}};Object.defineProperty(It.prototype,"error",{enumerable:!0});Object.defineProperty(It.prototype,"message",{enumerable:!0});var br=class extends ge{constructor(t,r={}){super(t),this[wd]=r.data===void 0?null:r.data}get data(){return this[wd]}};Object.defineProperty(br.prototype,"data",{enumerable:!0});var lA={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[_r]&&o[ua]===t&&!o[_r])return;let n;if(e==="message")n=function(s,a){let i=new br("message",{data:a?s:s.toString()});i[Pt]=this,ro(t,this,i)};else if(e==="close")n=function(s,a){let i=new Je("close",{code:s,reason:a.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});i[Pt]=this,ro(t,this,i)};else if(e==="error")n=function(s){let a=new It("error",{error:s,message:s.message});a[Pt]=this,ro(t,this,a)};else if(e==="open")n=function(){let s=new ge("open");s[Pt]=this,ro(t,this,s)};else return;n[_r]=!!r[_r],n[ua]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[ua]===t&&!r[_r]){this.removeListener(e,r);break}}};Rd.exports={CloseEvent:Je,ErrorEvent:It,Event:ge,EventTarget:lA,MessageEvent:br};function ro(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var no=F((C0,Td)=>{"use strict";var{tokenChars:wr}=xt();function ne(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function cA(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,a,i,c=-1,p=-1,d=-1,u=0;for(;u<e.length;u++)if(p=e.charCodeAt(u),a===void 0)if(d===-1&&wr[p]===1)c===-1&&(c=u);else if(u!==0&&(p===32||p===9))d===-1&&c!==-1&&(d=u);else if(p===59||p===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${u}`);d===-1&&(d=u);let _=e.slice(c,d);p===44?(ne(t,_,r),r=Object.create(null)):a=_,c=d=-1}else throw new SyntaxError(`Unexpected character at index ${u}`);else if(i===void 0)if(d===-1&&wr[p]===1)c===-1&&(c=u);else if(p===32||p===9)d===-1&&c!==-1&&(d=u);else if(p===59||p===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${u}`);d===-1&&(d=u),ne(r,e.slice(c,d),!0),p===44&&(ne(t,a,r),r=Object.create(null),a=void 0),c=d=-1}else if(p===61&&c!==-1&&d===-1)i=e.slice(c,u),c=d=-1;else throw new SyntaxError(`Unexpected character at index ${u}`);else if(o){if(wr[p]!==1)throw new SyntaxError(`Unexpected character at index ${u}`);c===-1?c=u:n||(n=!0),o=!1}else if(s)if(wr[p]===1)c===-1&&(c=u);else if(p===34&&c!==-1)s=!1,d=u;else if(p===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${u}`);else if(p===34&&e.charCodeAt(u-1)===61)s=!0;else if(d===-1&&wr[p]===1)c===-1&&(c=u);else if(c!==-1&&(p===32||p===9))d===-1&&(d=u);else if(p===59||p===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${u}`);d===-1&&(d=u);let _=e.slice(c,d);n&&(_=_.replace(/\\/g,""),n=!1),ne(r,i,_),p===44&&(ne(t,a,r),r=Object.create(null),a=void 0),i=void 0,c=d=-1}else throw new SyntaxError(`Unexpected character at index ${u}`);if(c===-1||s||p===32||p===9)throw new SyntaxError("Unexpected end of input");d===-1&&(d=u);let h=e.slice(c,d);return a===void 0?ne(t,h,r):(i===void 0?ne(r,h,!0):n?ne(r,i,h.replace(/\\/g,"")):ne(r,i,h),ne(t,a,r)),t}function dA(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(a=>a===!0?o:`${o}=${a}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Td.exports={format:dA,parse:cA}});var io=F((N0,$d)=>{"use strict";var uA=require("events"),mA=require("https"),pA=require("http"),Id=require("net"),gA=require("tls"),{randomBytes:fA,createHash:hA}=require("crypto"),{Duplex:P0,Readable:I0}=require("stream"),{URL:ma}=require("url"),Pe=Rt(),yA=ia(),AA=da(),{isBlob:SA}=xt(),{BINARY_TYPES:Cd,CLOSE_TIMEOUT:_A,EMPTY_BUFFER:oo,GUID:bA,kForOnEventAttribute:pa,kListener:wA,kStatusCode:vA,kWebSocket:I,NOOP:Nd}=me(),{EventTarget:{addEventListener:EA,removeEventListener:WA}}=xd(),{format:LA,parse:kA}=no(),{toBuffer:RA}=Ar(),Od=Symbol("kAborted"),ga=[8,13],fe=["CONNECTING","OPEN","CLOSING","CLOSED"],xA=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,k=class e extends uA{constructor(t,r,n){super(),this._binaryType=Cd[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=oo,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),Md(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){Cd.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new yA({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new AA(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[I]=this,s[I]=this,t[I]=this,o.on("conclude",PA),o.on("drain",IA),o.on("error",NA),o.on("message",OA),o.on("ping",MA),o.on("pong",HA),s.onerror=DA,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",Fd),t.on("data",ao),t.on("end",Ud),t.on("error",jd),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Pe.extensionName]&&this._extensions[Pe.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){B(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),Dd(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){fa(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||oo,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){fa(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||oo,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){fa(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Pe.extensionName]||(o.compress=!1),this._sender.send(t||oo,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){B(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(k,"CONNECTING",{enumerable:!0,value:fe.indexOf("CONNECTING")});Object.defineProperty(k.prototype,"CONNECTING",{enumerable:!0,value:fe.indexOf("CONNECTING")});Object.defineProperty(k,"OPEN",{enumerable:!0,value:fe.indexOf("OPEN")});Object.defineProperty(k.prototype,"OPEN",{enumerable:!0,value:fe.indexOf("OPEN")});Object.defineProperty(k,"CLOSING",{enumerable:!0,value:fe.indexOf("CLOSING")});Object.defineProperty(k.prototype,"CLOSING",{enumerable:!0,value:fe.indexOf("CLOSING")});Object.defineProperty(k,"CLOSED",{enumerable:!0,value:fe.indexOf("CLOSED")});Object.defineProperty(k.prototype,"CLOSED",{enumerable:!0,value:fe.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(k.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(k.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[pa])return t[wA];return null},set(t){for(let r of this.listeners(e))if(r[pa]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[pa]:!0})}})});k.prototype.addEventListener=EA;k.prototype.removeEventListener=WA;$d.exports=k;function Md(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:_A,protocolVersion:ga[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!ga.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${ga.join(", ")})`);let s;if(t instanceof ma)s=t;else try{s=new ma(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let a=s.protocol==="wss:",i=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!a&&!i?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:i&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;so(e,l);return}let p=a?443:80,d=fA(16).toString("base64"),u=a?mA.request:pA.request,h=new Set,_;if(o.createConnection=o.createConnection||(a?CA:TA),o.defaultPort=o.defaultPort||p,o.port=s.port||p,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":d,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(_=new Pe({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=LA({[Pe.extensionName]:_.offer()})),r.length){for(let l of r){if(typeof l!="string"||!xA.test(l)||h.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");h.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),i){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=i,e._originalSecure=a,e._originalHostOrSocketPath=i?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[A,S]of Object.entries(l))n.headers[A.toLowerCase()]=S}else if(e.listenerCount("redirect")===0){let l=i?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!a)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=u(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=u(o);o.timeout&&y.on("timeout",()=>{B(e,y,"Opening handshake has timed out")}),y.on("error",l=>{y===null||y[Od]||(y=e._req=null,so(e,l))}),y.on("response",l=>{let A=l.headers.location,S=l.statusCode;if(A&&o.followRedirects&&S>=300&&S<400){if(++e._redirects>o.maxRedirects){B(e,y,"Maximum redirects exceeded");return}y.abort();let g;try{g=new ma(A,t)}catch{let w=new SyntaxError(`Invalid URL: ${A}`);so(e,w);return}Md(e,g,r,n)}else e.emit("unexpected-response",y,l)||B(e,y,`Unexpected server response: ${l.statusCode}`)}),y.on("upgrade",(l,A,S)=>{if(e.emit("upgrade",l),e.readyState!==k.CONNECTING)return;y=e._req=null;let g=l.headers.upgrade;if(g===void 0||g.toLowerCase()!=="websocket"){B(e,A,"Invalid Upgrade header");return}let b=hA("sha1").update(d+bA).digest("base64");if(l.headers["sec-websocket-accept"]!==b){B(e,A,"Invalid Sec-WebSocket-Accept header");return}let w=l.headers["sec-websocket-protocol"],T;if(w!==void 0?h.size?h.has(w)||(T="Server sent an invalid subprotocol"):T="Server sent a subprotocol but none was requested":h.size&&(T="Server sent no subprotocol"),T){B(e,A,T);return}w&&(e._protocol=w);let G=l.headers["sec-websocket-extensions"];if(G!==void 0){if(!_){B(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let we;try{we=kA(G)}catch{B(e,A,"Invalid Sec-WebSocket-Extensions header");return}let at=Object.keys(we);if(at.length!==1||at[0]!==Pe.extensionName){B(e,A,"Server indicated an extension that was not requested");return}try{_.accept(we[Pe.extensionName])}catch{B(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Pe.extensionName]=_}e.setSocket(A,S,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function so(e,t){e._readyState=k.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function TA(e){return e.path=e.socketPath,Id.connect(e)}function CA(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Id.isIP(e.host)?"":e.host),gA.connect(e)}function B(e,t,r){e._readyState=k.CLOSING;let n=new Error(r);Error.captureStackTrace(n,B),t.setHeader?(t[Od]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(so,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function fa(e,t,r){if(t){let n=SA(t)?t.size:RA(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${fe[e.readyState]})`);process.nextTick(r,n)}}function PA(e,t){let r=this[I];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[I]!==void 0&&(r._socket.removeListener("data",ao),process.nextTick(Hd,r._socket),e===1005?r.close():r.close(e,t))}function IA(){let e=this[I];e.isPaused||e._socket.resume()}function NA(e){let t=this[I];t._socket[I]!==void 0&&(t._socket.removeListener("data",ao),process.nextTick(Hd,t._socket),t.close(e[vA])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function Pd(){this[I].emitClose()}function OA(e,t){this[I].emit("message",e,t)}function MA(e){let t=this[I];t._autoPong&&t.pong(e,!this._isServer,Nd),t.emit("ping",e)}function HA(e){this[I].emit("pong",e)}function Hd(e){e.resume()}function DA(e){let t=this[I];t.readyState!==k.CLOSED&&(t.readyState===k.OPEN&&(t._readyState=k.CLOSING,Dd(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function Dd(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function Fd(){let e=this[I];if(this.removeListener("close",Fd),this.removeListener("data",ao),this.removeListener("end",Ud),e._readyState=k.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[I]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",Pd),e._receiver.on("finish",Pd))}function ao(e){this[I]._receiver.write(e)||this.pause()}function Ud(){let e=this[I];e._readyState=k.CLOSING,e._receiver.end(),this.end()}function jd(){let e=this[I];this.removeListener("error",jd),this.on("error",Nd),e&&(e._readyState=k.CLOSING,this.destroy())}});var zd=F((M0,Vd)=>{"use strict";var O0=io(),{Duplex:FA}=require("stream");function Bd(e){e.emit("close")}function UA(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Gd(e){this.removeListener("error",Gd),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function jA(e,t){let r=!0,n=new FA({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,a){let i=!a&&n._readableState.objectMode?s.toString():s;n.push(i)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(Bd,n);return}let a=!1;e.once("error",function(c){a=!0,s(c)}),e.once("close",function(){a||s(o),process.nextTick(Bd,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,a){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,a)});return}e.send(o,a)},n.on("end",UA),n.on("error",Gd),n}Vd.exports=jA});var ha=F((H0,Kd)=>{"use strict";var{tokenChars:$A}=xt();function BA(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let a=e.charCodeAt(o);if(n===-1&&$A[a]===1)r===-1&&(r=o);else if(o!==0&&(a===32||a===9))n===-1&&r!==-1&&(n=o);else if(a===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let i=e.slice(r,n);if(t.has(i))throw new SyntaxError(`The "${i}" subprotocol is duplicated`);t.add(i),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}Kd.exports={parse:BA}});var eu=F((F0,Qd)=>{"use strict";var GA=require("events"),lo=require("http"),{Duplex:D0}=require("stream"),{createHash:VA}=require("crypto"),qd=no(),Ye=Rt(),zA=ha(),KA=io(),{CLOSE_TIMEOUT:qA,GUID:JA,kWebSocket:YA}=me(),XA=/^[+/0-9A-Za-z]{22}==$/,Jd=0,Yd=1,Zd=2,ya=class extends GA{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:qA,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:KA,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=lo.createServer((n,o)=>{let s=lo.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=ZA(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,a)=>{this.handleUpgrade(o,s,a,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=Jd}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===Zd){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(vr,this);return}if(t&&this.once("close",t),this._state!==Yd)if(this._state=Yd,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(vr,this):process.nextTick(vr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{vr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",Xd);let s=t.headers["sec-websocket-key"],a=t.headers.upgrade,i=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Xe(this,t,r,405,"Invalid HTTP method");return}if(a===void 0||a.toLowerCase()!=="websocket"){Xe(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!XA.test(s)){Xe(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(i!==13&&i!==8){Xe(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Er(r,400);return}let c=t.headers["sec-websocket-protocol"],p=new Set;if(c!==void 0)try{p=zA.parse(c)}catch{Xe(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let d=t.headers["sec-websocket-extensions"],u={};if(this.options.perMessageDeflate&&d!==void 0){let h=new Ye({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let _=qd.parse(d);_[Ye.extensionName]&&(h.accept(_[Ye.extensionName]),u[Ye.extensionName]=h)}catch{Xe(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let h={origin:t.headers[`${i===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(h,(_,y,l,A)=>{if(!_)return Er(r,y||401,l,A);this.completeUpgrade(u,s,p,t,r,n,o)});return}if(!this.options.verifyClient(h))return Er(r,401)}this.completeUpgrade(u,s,p,t,r,n,o)}completeUpgrade(t,r,n,o,s,a,i){if(!s.readable||!s.writable)return s.destroy();if(s[YA])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>Jd)return Er(s,503);let p=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${VA("sha1").update(r+JA).digest("base64")}`],d=new this.options.WebSocket(null,void 0,this.options);if(n.size){let u=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;u&&(p.push(`Sec-WebSocket-Protocol: ${u}`),d._protocol=u)}if(t[Ye.extensionName]){let u=t[Ye.extensionName].params,h=qd.format({[Ye.extensionName]:[u]});p.push(`Sec-WebSocket-Extensions: ${h}`),d._extensions=t}this.emit("headers",p,o),s.write(p.concat(`\r
`).join(`\r
`)),s.removeListener("error",Xd),d.setSocket(s,a,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(d),d.on("close",()=>{this.clients.delete(d),this._shouldEmitClose&&!this.clients.size&&process.nextTick(vr,this)})),i(d,o)}};Qd.exports=ya;function ZA(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function vr(e){e._state=Zd,e.emit("close")}function Xd(){this.destroy()}function Er(e,t,r,n){r=r||lo.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${lo.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Xe(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let a=new Error(o);Error.captureStackTrace(a,Xe),e.emit("wsClientError",a,r,t)}else Er(r,n,o,s)}});var QA,eS,tS,rS,nS,oS,tu,sS,Wr,ru=m(()=>{QA=f(zd(),1),eS=f(no(),1),tS=f(Rt(),1),rS=f(ia(),1),nS=f(da(),1),oS=f(ha(),1),tu=f(io(),1),sS=f(eu(),1),Wr=tu.default});var Aa=m(()=>{"use strict"});var he,Lr=m(()=>{"use strict";he=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Nt,Ze,nu,iS,Sa,_a,ou,su,au,iu,ba,wa=m(()=>{"use strict";Nt=f(require("node:fs")),Ze=f(require("node:os")),nu=f(require("node:path"));Aa();Lr();iS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sa=(e=Ze.default.hostname())=>nu.default.join(Ze.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),_a=e=>{if(!Nt.default.existsSync(e))return null;try{let t=JSON.parse(Nt.default.readFileSync(e,"utf8"));return!iS(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},ou=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},su=(e,t)=>{Nt.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},au=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Sa(),n=_a(r);if(n!==null&&n.pid!==process.pid&&he(n.pid)&&ou(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Ze.default.hostname(),macOsUsername:Ze.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return su(r,o),{ok:!0}},iu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Sa(),n=_a(r);return n!==null&&n.pid!==process.pid&&he(n.pid)&&ou(n)?{ok:!1}:(su(r,{hostname:Ze.default.hostname(),macOsUsername:Ze.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ba=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Sa();_a(r)?.pid===process.pid&&Nt.default.existsSync(r)&&Nt.default.unlinkSync(r)}});var va,kr,lS,cS,dS,uS,lu,cu=m(()=>{"use strict";va=require("node:child_process"),kr=f(require("node:path"));Lr();lt();lS=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),cS=(e,t)=>{if(lS(e)||!/\bnode\b/.test(e))return!1;let r=kr.default.resolve(t),n=kr.default.join(r,"app",ae),o=kr.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(a=>a.length>0).some(a=>{if(a===ae||a==="agent-witch.ts")return e.includes(r);try{let i=kr.default.resolve(a);return i===n||i===o}catch{return a===n||a===o}})},dS=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,va.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},uS=(e,t,r)=>{let n=dS(r),o=[];for(let s of e.split(`
`)){let a=s.trim();if(a.length===0)continue;let i=/^(\d+)\s+(.+)$/.exec(a);if(i===null)continue;let c=Number.parseInt(i[1]??"",10),p=i[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||cS(p,t)&&o.push(c)}return o},lu=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,va.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=uS(r,e.installDir,t),o=[];for(let s of n)if(he(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var Rr,xr,du,mS,uu,mu=m(()=>{"use strict";Rr=f(require("node:fs")),xr=f(require("node:path"));L();du=(e,t)=>{!Rr.default.existsSync(e)||Rr.default.existsSync(t)||(Rr.default.mkdirSync(xr.default.dirname(t),{recursive:!0}),Rr.default.renameSync(e,t))},mS=e=>{if(e.profileEmail===null)return;let t=xr.default.join(e.installDir,ie);du(xr.default.join(t,sn),e.mainLogPath),du(xr.default.join(t,an),e.errorLogPath)},uu=e=>{let t=W();e!==void 0&&t.installDir!==e||mS(t)}});var pu,gu,fu,hu,yu=m(()=>{"use strict";pu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),gu=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?pu(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?pu(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},fu=e=>{let t=e.watchdogLogs.map(gu).join(""),r=e.updateLogs.map(gu).join("");return`<!doctype html>
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
</html>`},hu=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Au,Su,_u=m(()=>{"use strict";Au=f(require("node:net")),Su=()=>new Promise((e,t)=>{let r=Au.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var bu,pS,wu,vu=m(()=>{"use strict";bu=f(require("node:net"));_u();wt();Dn();L();pS=e=>new Promise(t=>{let r=bu.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),wu=async()=>{let e=v(),t=Y();if(await pS(t))return lc(t),t;let r=await Su();return Hn(e,r),r}});var gS,Eu,Wu=m(()=>{"use strict";gS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Eu=e=>({force:gS(e)&&e.force===!0})});var Ea,fS,Qe,co=m(()=>{"use strict";Ea=f(require("node:os")),fS=e=>{let t=e.trim();return t.startsWith("~/")?`${Ea.default.homedir()}${t.slice(1)}`:t==="~"?Ea.default.homedir():t},Qe=fS});var et,Ie,Tr=m(()=>{"use strict";et=f(require("node:path"));pt();co();Ie=e=>{let t=Qe(e),r=et.default.join(t,rl);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:et.default.join(r,"rag"),memoryDirPath:et.default.join(r,nl),reportsDirPath:et.default.join(r,sl),metaFilePath:et.default.join(r,ol),ragChunksFilePath:et.default.join(r,"rag",fn)}}});var oe,ku,hS,yS,ye,Cr=m(()=>{"use strict";oe=f(require("node:fs")),ku=f(require("node:path"));pt();Tr();hS=(e,t)=>{if(oe.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};oe.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},yS=e=>{oe.default.existsSync(e.ragChunksFilePath)||oe.default.writeFileSync(e.ragChunksFilePath,"");let t=ku.default.join(e.memoryDirPath,hn);oe.default.existsSync(t)||oe.default.writeFileSync(t,"")},ye=e=>{let t=Ie(e.projectFolderPath);return oe.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),oe.default.mkdirSync(t.ragDirPath,{recursive:!0}),oe.default.mkdirSync(t.memoryDirPath,{recursive:!0}),hS(t,e),yS(t),{ok:!0,layout:t}}});var AS,Ru,xu=m(()=>{"use strict";Cr();AS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ru=e=>{if(!AS(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:ye({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Cu,bS,Tu,x,SS,_S,Wa,Pu=m(()=>{"use strict";Cu=f(require("node:http"));Ys();Ws();yu();vu();Wu();gn();xu();wn();it();bS={},Tu=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},x=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},SS=e=>{e.writeHead(403),e.end()},_S=async(e,t,r)=>{let n=e.headers.origin,o=oc(n);try{if(n!==void 0&&n.length>0&&!o.allowed){SS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){x(t,200,js(),o.headers);return}if(e.method==="GET"&&s==="/identity"){x(t,200,$s(),o.headers);return}if(e.method==="GET"&&s==="/local"){let a=Kn(50),i=qn(50);t.writeHead(200,hu()),t.end(fu({port:r,watchdogLogs:a,updateLogs:i}));return}if(e.method==="GET"&&s==="/watchdog/status"){let a=await Gs();x(t,200,a,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let a=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;x(t,200,{ok:!0,logs:Kn(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let a=await Vs();x(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/restart"){let a=await zs();x(t,a.ok?200:503,a,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let a=Ks();x(t,200,{ok:!0,...a},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let a=new URL(e.url??"/update/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;x(t,200,{ok:!0,logs:qn(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let a=await Tu(e),{force:i}=Eu(a),c=await qs({force:i});x(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let a=await Js();x(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/wake"){let a=await Bs();x(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let a=[];for await(let p of e)a.push(Buffer.from(p));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{x(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=zn(i);x(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let a=await Tu(e),i=Ru(a);x(t,i.ok?200:400,i,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let a=[];for await(let p of e)a.push(Buffer.from(p));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{x(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=zn(i);x(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){x(t,200,Us(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let a=[];for await(let p of e)a.push(Buffer.from(p));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{x(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Ds(i);x(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let a=[];for await(let p of e)a.push(Buffer.from(p));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{x(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await Fs(i);x(t,c.ok?200:503,c,o.headers);return}x(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{x(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},Wa=async()=>{let e=await wu(),t=Cu.default.createServer((r,n)=>{_S(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!ee()&&gt(bS.url)&&(async()=>{mt("agent-witch-wake-server");let e=await Wa(),t=pn(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var La,Iu=m(()=>{"use strict";lr();On();Ve();La=async()=>{let e=$();if(e===null)return;let t=Re(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await bt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Nu,Ou=m(()=>{"use strict";Aa();Pu();wa();Iu();Nu=async(e={})=>{let t=await Wa();La();let r=setInterval(()=>{La()},6e4),n=setInterval(()=>{if(!iu().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var Pr,uo,ES,Mu,Hu,mo,Du,Fu,ka,Uu,po,ju=m(()=>{"use strict";Pr=f(require("node:fs")),uo=f(require("node:path")),ES="pending-run-inputs.json",Mu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hu=e=>{let t=e.profileEmail?uo.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return uo.default.join(t,ES)},mo=e=>{let t=Hu(e);if(!Pr.default.existsSync(t))return{};try{let r=JSON.parse(Pr.default.readFileSync(t,"utf8"));return Mu(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!Mu(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",a=typeof o.partialOutput=="string"?o.partialOutput:"",i=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:a;return s.length===0||i.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:a,question:i,accumulatedOutput:c}]]})):{}}catch{return{}}},Du=(e,t)=>{let r=Hu(e);Pr.default.mkdirSync(uo.default.dirname(r),{recursive:!0}),Pr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Fu=e=>Object.values(mo(e)),ka=(e,t)=>mo(e)[t]!==void 0,Uu=(e,t)=>{let r=mo(e);r[t.agentRunId]=t,Du(e,r)},po=(e,t)=>{let r=mo(e);delete r[t],Du(e,r)}});var Ra,$u=m(()=>{"use strict";Ra={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var xa,OE,Bu=m(()=>{"use strict";xa={OPEN:"open",APPROVAL:"approval"},OE=xa.APPROVAL});var Ot,go,Gu,WS,Vu,zu,Ku,fo,qu,Ta=m(()=>{"use strict";Ot=f(require("node:fs")),go=f(require("node:path")),Gu="runs",WS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vu=e=>{let t=e.profileEmail!==null?go.default.join(e.installDir,"profiles",e.profileEmail,Gu):go.default.join(e.installDir,Gu);return Ot.default.mkdirSync(t,{recursive:!0}),t},zu=(e,t)=>go.default.join(Vu(e),`${t}.json`),Ku=(e,t)=>{Ot.default.writeFileSync(zu(e,t.id),JSON.stringify(t,null,2))},fo=(e,t)=>{let r=zu(e,t);if(!Ot.default.existsSync(r))return null;try{let n=JSON.parse(Ot.default.readFileSync(r,"utf8"));return!WS(n)||typeof n.id!="string"?null:n}catch{return null}},qu=e=>{let t=Vu(e),r=Ot.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),a=fo(e,s);a!==null&&n.push(a)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var LS,Ju,Yu=m(()=>{"use strict";$u();Bu();Ta();LS=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?Ra.COMPLETED:Ra.FAILED,dispatchPolicy:xa.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},Ju=(e,t)=>{let r=LS(t);return Ku(e,r),r}});var Ir,ho,kS,Ca,Xu,Zu,Qu,Pa,em=m(()=>{"use strict";Ir=f(require("node:fs")),ho=f(require("node:path"));cr();kS="run-completion-outbox.json",Ca=e=>{let t=e.profileEmail?ho.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return ho.default.join(t,kS)},Xu=e=>{let t=Ca(e);if(!Ir.default.existsSync(t))return[];try{let r=JSON.parse(Ir.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},Zu=(e,t)=>{Ir.default.mkdirSync(ho.default.dirname(Ca(e)),{recursive:!0}),Ir.default.writeFileSync(Ca(e),JSON.stringify(t,null,2),"utf8")},Qu=(e,t)=>{let r=[...Xu(e).filter(n=>n.runId!==t.runId),t];Zu(e,r)},Pa=async e=>{if(e.cloudApi===null)return;let t=Xu(e.layout);if(t.length===0)return;let r=[];for(let n of t)await Pn(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);Zu(e.layout,r)}});var tm=m(()=>{"use strict"});var Ia,Nr,xS,Mt,rm=m(()=>{"use strict";tm();Ia=new Map,Nr=e=>{let t=Ia.get(e);t!==void 0&&(clearInterval(t),Ia.delete(e))},xS=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Mt=(e,t,r,n={})=>{Nr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Nr(t);return}let a=n.onTick?.()??{};xS(e,t,o,a)};s(),Ia.set(t,setInterval(s,15e3))}});var Na,Or,Ht,nm,tt,om,yo=m(()=>{"use strict";Na=new Set,Or=new Map,Ht=(e,t)=>{if(t.length===0)return;let r=Or.get(e)??[];r.push(t),Or.set(e,r)},nm=e=>{Na.add(e);let t=Or.get(e)??[];return Or.delete(e),t},tt=e=>Na.has(e),om=e=>{Na.delete(e),Or.delete(e)}});var sm,am,im,lm,D,Dt,cm,dm,Mr,um,mm,Oa,pm,gm,fm,Ao=m(()=>{"use strict";sm=require("node:crypto"),am=f(require("node:fs")),im=f(require("node:path")),lm=require("node:url");Lr();it();Yo();D=new Map,cm=async()=>{if(Dt!==void 0)return Dt;try{if(ee()){let e=on(),t=im.default.join(e,"deps","node-pty","lib","index.js");if(am.default.existsSync(t)){let r=await import((0,lm.pathToFileURL)(t).href);return Dt=r,r}}return Dt=await import("node-pty"),Dt}catch{return Dt=null,null}},dm=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},Mr=(e,t,r)=>{let n=D.get(e);if(n!==void 0){D.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},um=(e,t)=>{let r=D.get(e);return r===void 0?!1:(r.pty.write(t),!0)},mm=(e,t,r)=>{let n=D.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Oa=e=>{for(let t of D.values())if(!(t.mode!=="agent"||t.runId!==e))return he(t.pty.pid);return!1},pm=e=>{for(let[t,r]of D.entries())if(!(r.mode!=="agent"||r.runId!==e)){D.delete(t);try{r.pty.kill()}catch{}return!0}return!1},gm=async e=>{let t=await cm();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;D.get(e.shellSessionId)!==void 0&&Mr(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let a=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${a}).\r
`},requestId:e.requestId}),!1}return D.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{dm(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{D.get(e.shellSessionId)?.pty===o&&(D.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},fm=async e=>{let t=e.shellSessionId??(0,sm.randomUUID)(),r=await cm();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return D.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{dm(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{D.get(t)?.pty===n&&(D.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var So,hm,ym=m(()=>{"use strict";So="[[AWAITING_INPUT]]",hm=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",So,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Hr,Am,_o=m(()=>{"use strict";ym();Hr=e=>{let t=e.indexOf(So);if(t<0)return null;let n=e.slice(t+So.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},Am=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",hm].join(`
`)});var Sm,_m=m(()=>{"use strict";yo();Ao();_o();Sm=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(tt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Ht(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await fm({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let a=Hr(t.join(""));a!==null&&(r=!0,e.onInputRequired(a))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var bm,wm,vm,Ne,bo=m(()=>{"use strict";bm=require("node:child_process"),wm=f(require("node:fs")),vm=f(require("node:path"));lt();Ne=(e,t)=>{let r=vm.default.join(e,"app",Ni,"ensure-writer.sh");return wm.default.existsSync(r)?new Promise((n,o)=>{let s=(0,bm.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",a=>{o(a)}),s.on("close",a=>{if(a===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(a??-1)}`))})}):Promise.resolve()}});var Em,rt,wo,Wm,Lm,Ma,km,Ha,Rm,xm,TS,vo,CS,PS,Tm,Da=m(()=>{"use strict";Em=require("node:child_process");Ge();bo();rt=new Map,wo=e=>e==="cursor"||e==="antigravity",Wm=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Lm=e=>rt.get(e)?.warmed===!0,Ma=e=>{let t=rt.get(e);rt.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},km=e=>rt.get(e)?.conversationStarted===!0,Ha=e=>{let t=rt.get(e);rt.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Rm=e=>{rt.delete(e)},xm=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",TS={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},vo=e=>`${TS[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,CS=(e,t,r,n)=>new Promise(o=>{let s=Ql(t,r),a=[],i=(0,Em.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=p=>{let d=p.toString("utf8");a.push(d),n?.(d)};i.stdout?.on("data",c),i.stderr?.on("data",c),i.on("close",p=>{o({exitCode:p??-1,output:a.join("").trim()})}),i.on("error",p=>{o({exitCode:-1,output:p.message})})}),PS=(e,t)=>{let r=vo(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Tm=async e=>{if(!N(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Ne(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}wo(e.writerAgent)&&Ma(e.writerAgent);let t=await CS(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?PS(e.writerAgent,t.output):vo(e.writerAgent)}}});var Cm,Dr,M,Fa,Pm,Im,Ua,Nm,Om,Mm,IS,Ae,Eo,Ft,Hm,NS,ja,Dm,Fm,Um,jm=m(()=>{"use strict";Cm=require("node:child_process");Ge();ju();Yu();em();rm();Lr();yo();Ao();_o();_m();Da();Qt();_o();Dr=new Map,M=new Map,Fa=new Set,Pm=130,Im=`

Stopped by user.`,Ua=null,Nm=e=>{Ua=e},Om=async e=>{await Pa({layout:e,cloudApi:Ua})},Mm=e=>{let t=Dr.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:he(t.pid)},IS=e=>xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Ae=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Eo=(e,t,r,n,o,s,a=!1)=>({awaitingInput:a,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let i=Sn(s),c=M.get(r);if(i!==null&&c!==void 0){let p=hl(i),d=Mm(r)||Oa(r);p!==null&&!d&&Ft(e,t,r,n,p.exitCode,p.output,c.originalPrompt)}return fl(i)}}),Ft=(e,t,r,n,o,s,a)=>{let i=o,c=s;r!==void 0&&Fa.has(r)&&(Fa.delete(r),i=Pm,c=c.trim().length>0&&!c.includes("Stopped by user.")?`${c.trim()}${Im}`:"Stopped by user."),r!==void 0&&(Nr(r),tt(r)&&(Ae(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),om(r)),Ju(e.layout,{agentRunId:r,originalPrompt:a,exitCode:i,output:c,layout:e.layout}),Qu(e.layout,{runId:r,exitCode:i,output:c,createdAt:new Date().toISOString()}),Pa({layout:e.layout,cloudApi:Ua}),M.delete(r),Dr.delete(r),po(e.layout,r)),Ae(t,{type:"command.claude.result",payload:{exitCode:i,output:c,...r!==void 0?{agentRunId:r}:{}},requestId:n})},Hm=(e,t,r,n,o,s,a)=>{let i=M.get(r),c=i?.accumulatedOutput??s;Uu(e.layout,{agentRunId:r,originalPrompt:a,partialOutput:s,question:o,accumulatedOutput:c}),Mt(t,r,()=>ka(e.layout,r),Eo(e,t,r,n,i?.projectFolderPath,i?.reportKey,!0)),Ae(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},NS=(e,t,r,n,o,s,a)=>{let i=[],c=!1,p=d=>{if(!(o===void 0||d.length===0)){if(tt(o)){Ae(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:d},requestId:n});return}Ht(o,d)}};if(o!==void 0){let d=M.get(o);Dr.set(o,t),M.set(o,{originalPrompt:s,writerAgent:a,projectFolderPath:d?.projectFolderPath,reportKey:d?.reportKey,accumulatedOutput:d?.accumulatedOutput??""}),Ae(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Mt(r,o,()=>Mm(o),Eo(e,r,o,n,d?.projectFolderPath,d?.reportKey))}t.stdout?.on("data",d=>{let u=d.toString("utf8");if(i.push(u),p(u),c||o===void 0)return;let h=Hr(i.join(""));if(h!==null){c=!0,t.kill("SIGTERM");let _=M.get(o),y=[_?.accumulatedOutput??"",h.partialOutput].filter(l=>l.length>0).join(`

`);_!==void 0&&(_.accumulatedOutput=y),Dr.delete(o),Hm(e,r,o,n,h.question,y,s)}}),t.stderr?.on("data",d=>{let u=d.toString("utf8");i.push(u),p(u)}),t.on("close",d=>{if(c)return;Ha(a);let u=o!==void 0?M.get(o):void 0,h=i.join("").trim(),_=u!==void 0&&u.accumulatedOutput.length>0?`${u.accumulatedOutput}

${h}`.trim():h;Ft(e,r,o,n,d??-1,_,s)}),t.on("error",d=>{c||Ft(e,r,o,n,-1,d.message,s)})},ja=(e,t,r,n,o,s,a,i,c,p)=>{let d=St(t,r,IS(e),a);if(d===null){Ft(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let u=()=>{let h=(0,Cm.spawn)(d.command,[...d.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});NS(e,h,o,n,s,r,t)};if(s===void 0){u();return}M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:p,accumulatedOutput:M.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&p!==void 0&&p.trim().length>0&&_n({reportKey:p,agentRunId:s,userSummary:"Task started on your Mac."}),Mt(o,s,()=>M.has(s),Eo(e,o,s,n,c,p)),Sm({socket:o,sendMessage:Ae,requestId:n,agentRunId:s,shellSessionId:i,command:d.command,args:d.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:h=>{i!==void 0&&Mr(i,l=>{Ae(o,l)},n);let _=M.get(s),y=[_?.accumulatedOutput??"",h.partialOutput].filter(l=>l.length>0).join(`

`);_!==void 0&&(_.accumulatedOutput=y),Hm(e,o,s,n,h.question,y,r)},onFinished:(h,_)=>{Ha(t);let y=M.get(s),l=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${_}`.trim():_;Ft(e,o,s,n,h,l,r)}}).then(h=>{if(!h){u();return}Mt(o,s,()=>Oa(s),Eo(e,o,s,n,c,p))}).catch(h=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",h instanceof Error?h.message:h),u()})},Dm=(e,t,r,n)=>{po(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Ae(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=Am(t),s=M.get(t.agentRunId),a=s?.writerAgent??"claude-cli",i=s?.projectFolderPath,c=s?.reportKey;ja(e,a,o,r,n,t.agentRunId,void 0,t.shellSessionId,i,c)},Fm=(e,t)=>{for(let r of Fu(e.layout))M.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Mt(t,r.agentRunId,()=>ka(e.layout,r.agentRunId),{awaitingInput:!0}),Ae(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Um=(e,t,r,n)=>{let o=M.get(r);if(o===void 0)return!1;Fa.add(r),Nr(r);let s=Dr.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(pm(r))return!0;po(e.layout,r);let a=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${Im}`:"Stopped by user.";return Ft(e,t,r,n,Pm,a,o.originalPrompt),!0}});var OS,$m,Bm=m(()=>{"use strict";wt();OS=()=>`http://127.0.0.1:${Y()}/restart`,$m=async()=>{try{let e=await fetch(OS(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var nt,$a,MS,HS,Ba,ot,Wo,Gm,Lo=m(()=>{"use strict";nt=f(require("node:fs")),$a=f(require("node:path")),MS="local-ws-traffic.ndjson",HS=500,Ba=e=>$a.default.join(e.logsDir,MS),ot=(e,t)=>{let r=Ba(e);nt.default.mkdirSync($a.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});nt.default.appendFileSync(r,`${n}
`,"utf8")},Wo=(e,t=HS)=>{let r=Ba(e);if(!nt.default.existsSync(r))return[];let o=nt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let a of o)try{let i=JSON.parse(a);typeof i=="object"&&i!==null&&"at"in i&&"direction"in i&&"type"in i&&"summary"in i&&s.push(i)}catch{}return s.reverse()},Gm=e=>{let t=Ba(e);nt.default.existsSync(t)&&nt.default.writeFileSync(t,"","utf8")}});var DS,ko,Ga=m(()=>{"use strict";wt();DS=()=>`http://127.0.0.1:${Y()}/update/run`,ko=async e=>{try{let t=await fetch(DS(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Vm,zm=m(()=>{"use strict";Vm=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Fr,FS,Km,qm=m(()=>{"use strict";Lo();je();Ga();zm();Fr=(e,t)=>{ot(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},FS=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(yt(),kn)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Km=async e=>{let t=j(e.layout.installDir)?.bundleVersion??null;if(!Vm({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Fr(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await ko({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Fr(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await FS();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Fr(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Fr(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Fr(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var US,Jm,Ym=m(()=>{"use strict";US=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jm=e=>{if(!US(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Xm,Zm,Qm=m(()=>{"use strict";_s();On();Xm=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Cn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Zm=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await bt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var K,jS,$S,BS,ep,tp,rp,np,op,sp,ap=m(()=>{"use strict";K=require("node:crypto"),jS=Buffer.from("302a300506032b6570032100","hex"),$S=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},BS=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,K.createPublicKey)({key:Buffer.concat([jS,t]),format:"der",type:"spki"})},ep=()=>{let{publicKey:e,privateKey:t}=(0,K.generateKeyPairSync)("ed25519");return{publicKeyRaw:$S(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},tp=e=>(0,K.createPrivateKey)(e),rp=(e,t)=>(0,K.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),np=(e,t,r)=>{try{let n=BS(e);return(0,K.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},op=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,sp=()=>(0,K.randomBytes)(32).toString("base64url")});var Se,Ro,ip,GS,VS,Va,lp,cp,za=m(()=>{"use strict";Se=f(require("node:fs")),Ro=f(require("node:path"));ap();L();ip=e=>Ro.default.join(e.installDir,ct),GS=(e,t)=>{if(e.profileEmail===null||t===ip(e)||Se.default.existsSync(t))return;let r=ip(e);Se.default.existsSync(r)&&(Se.default.mkdirSync(Ro.default.dirname(t),{recursive:!0}),Se.default.renameSync(r,t))},VS=e=>{if(!Se.default.existsSync(e))return null;try{let t=Se.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Va=e=>{let t=Bi(e);GS(e,t);let r=VS(t);if(r!==null)return r;let n=ep();return Se.default.mkdirSync(Ro.default.dirname(t),{recursive:!0}),Se.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},lp=e=>{let t=Va(e.layout),r=sp(),n=op({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=tp(t.privateKeyPem),s=rp(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},cp=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return np(e.serverPublicKey,t,e.serverAttestation)}});var xo,Ka=m(()=>{"use strict";xo={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var zS,dp,KS,up,mp=m(()=>{"use strict";Ka();zS=new Set(Object.values(xo)),dp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),KS=e=>{if(!dp(e))return!1;let t=e.type;return!(typeof t!="string"||!zS.has(t)||e.payload!==void 0&&!dp(e.payload)||e.requestId!==void 0&&typeof e.requestId!="string")},up=KS});var qS,pp,gp,fp=m(()=>{"use strict";mp();Ka();qS=new Set(Object.values(xo)),pp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gp=e=>{if(!pp(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;return typeof t!="string"?{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e}:qS.has(t)?e.payload!==void 0&&!pp(e.payload)?{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:e.requestId!==void 0&&typeof e.requestId!="string"?{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e}:up(e)?{formatOk:!0,formatError:null,command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}}});var hp,yp=m(()=>{"use strict";hp=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var JS,YS,XS,Ur,Ap=m(()=>{"use strict";yp();JS=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,YS=e=>JS.test(e),XS=e=>hp(e),Ur=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>Ur(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&YS(n)){r[n]=XS(o);continue}r[n]=Ur(o)}return r}});var se,qa,ZS,QS,e_,Ja,Sp,_p,bp,t_,Ya,Ut,Xa,wp,To=m(()=>{"use strict";se=f(require("node:fs")),qa=f(require("node:path"));fp();Ap();ZS="local-ws-trace.ndjson",QS=1e4,e_=1440*60*1e3,Ja=e=>qa.default.join(e.logsDir,ZS),Sp=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},_p=e=>{if(!se.default.existsSync(e))return;let t=se.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-e_,o=t.filter(s=>{let a=Sp(s);if(a===null)return!1;let i=Date.parse(a.at);return Number.isFinite(i)&&i>=r}).slice(-QS);se.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},bp=(e,t)=>{let r=Ja(e);se.default.mkdirSync(qa.default.dirname(r),{recursive:!0}),se.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),_p(r)},t_=e=>e.parsed===null?{_empty:!0}:Ur(e.parsed),Ya=(e,t,r)=>{let n=gp(r);bp(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:t_(n)})},Ut=(e,t)=>{bp(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Ur({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Xa=(e,t=80)=>{let r=Ja(e);if(_p(r),!se.default.existsSync(r))return[];let n=se.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let a=Sp(s);a!==null&&o.push(a)}return o.reverse()},wp=e=>{let t=Ja(e);se.default.existsSync(t)&&se.default.writeFileSync(t,"","utf8")}});var vp,Ep,Wp=m(()=>{"use strict";To();vp=!1,Ep=e=>{vp||(vp=!0,process.on("uncaughtException",t=>{Ut(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;Ut(e,{kind:"crash",message:r,stack:n})}))}});var r_,Lp,kp=m(()=>{"use strict";r_="local.agentwitch.com",Lp=`http://${r_}:43347`});var st,n_,Rp,xp=m(()=>{"use strict";st=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n_=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Rp=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${st(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?st(r.direction):st(r.kind),a=`trace-body-${n}`,i=st(n_(r.body));return`<tr>
        <td title="${st(r.at)}">${st(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${st(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${a}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${a}" class="trace-body-pre" hidden>${i}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var jr,Co,o_,s_,a_,i_,Tp,l_,c_,Cp,$r,Pp,Br,Ip,Za=m(()=>{"use strict";jr=f(require("node:fs")),Co=f(require("node:path"));pt();Tr();o_="rag",s_="http://127.0.0.1:11434",a_="nomic-embed-text",i_=e=>Co.default.join(e.installDir,o_),Tp=(e,t)=>t!==void 0&&t.trim().length>0?Ie(t).ragChunksFilePath:Co.default.join(i_(e),fn),l_=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let a=0;a<r;a+=1){let i=e[a]??0,c=t[a]??0;n+=i*c,o+=i*i,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},c_=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},Cp=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||s_,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||a_;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},$r=(e,t)=>{let r=Tp(e,t);if(!jr.default.existsSync(r))return[];let n=jr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Pp=async e=>{let t=c_(e.text);if(t.length===0)return 0;let r=Tp(e.layout,e.projectFolderPath);jr.default.mkdirSync(Co.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await Cp(o);if(s===null)continue;let a={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};jr.default.appendFileSync(r,`${JSON.stringify(a)}
`,"utf8"),n+=1}return n},Br=async e=>{let t=await Cp(e.query);return t===null?[]:$r(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:l_(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Ip=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var Np,Op=m(()=>{"use strict";Np=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let a=Math.floor(n/3600),i=Math.floor(n%3600/60);return i>0?`${a}h ${i}m`:`${a}h`}});var Mp,Po,Hp,Io=m(()=>{"use strict";Op();Mp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Po=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=Mp(e),r=Mp(Np(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Hp=`(function () {
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
})();`});var jt,Dp,Fp=m(()=>{"use strict";jt=(e,t,r)=>e===1?t:r,Dp=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${jt(o,"min","mins")} ago`;let s=Math.floor(n/36e5),a=Math.floor(n%36e5/6e4);if(s<24)return a===0?`${s}h ago`:`${s}h ${a} ${jt(a,"min","mins")} ago`;let i=Math.floor(n/864e5);if(i<7)return`${i} ${jt(i,"day","days")} ago`;let c=Math.floor(i/7);if(c<5)return`${c} ${jt(c,"week","weeks")} ago`;let p=Math.floor(i/30);if(p<12)return`${p} ${jt(p,"month","months")} ago`;let d=Math.floor(i/365);return`${d} ${jt(d,"year","years")} ago`}});var Qa,Up,jp=m(()=>{"use strict";Qa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Up=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${Qa(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Qa(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom).</p>
      <p class="muted mono">${Qa(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var $p,Bp,Gp,Vp=m(()=>{"use strict";$p=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Bp=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Gp=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Gr,zp,Kp=m(()=>{"use strict";Io();Gr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zp=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",a=e.wakeError?`<div class="alert-error">${Gr(e.wakeError)}</div>`:"",i=Po(e.lastHeartbeatAt);return`${a}<section class="card home-hero">
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
        <p class="home-card-meta">${Gr(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Gr(n)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${Gr(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Gr(o)}</p>
      </a>
    </div>`}});var $t,d_,qp,Jp=m(()=>{"use strict";$t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d_=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],qp=e=>{let t=d_.map(a=>`<option value="${$t(a.value)}">${$t(a.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${$t(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${$t(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${$t(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${$t(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Yp,Xp=m(()=>{"use strict";Yp=`
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
`.trim()});var u_,m_,Zp,Qp,eg=m(()=>{"use strict";Xp();Io();u_=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,m_=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/knowledge",label:"Knowledge"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],Zp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qp=e=>{let t=m_.map(o=>{let s=o.href===e.activePath;return`<a class="nav-link${s?" is-active":""}" href="${o.href}"${s?' aria-current="page"':""}>${o.label}</a>`}).join(""),r=Zp(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"";return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${Zp(e.title)} \xB7 Agent Witch Local</title>
  <style>${Yp}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${u_}
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
  <script>${Hp}</script>
</body>
</html>`}});var ei,tg,rg=m(()=>{"use strict";ei=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tg=e=>{if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">Nothing in <code>~/.agent-witch</code> yet. Use <strong>Import</strong> below to scan a folder.</p>
    </section>`;let t=e.installed.sets.map(n=>`<li class="harness-installed-set">
          <span><strong>${ei(n.name)}</strong> <span class="muted mono">(${ei(n.slug)})</span></span>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join(""),r=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${ei(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">${e.installed.sets.length} set(s) on this Mac. Link them to a repo under <a href="/projects">Projects</a>.</p>
      ${r}
      <ul class="harness-installed-set-list">${t}</ul>
    </section>`}});var p_,ng,og,sg=m(()=>{"use strict";p_=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,ng=e=>e.kind==="folder",og=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let a=0;a<o.length;a+=1){let i=o[a];if(i===void 0)continue;if(a===o.length-1){s.children.set(i,n);continue}let p=s.children.get(i);if(p!==void 0&&ng(p)){s=p;continue}let d={kind:"folder",name:i,children:new Map};s.children.set(i,d),s=d}}let r=n=>{let o=[];for(let s of n.children.values()){if(ng(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(p_)};return r(t)}});var ag,ti,ig=m(()=>{"use strict";ag=f(require("node:path")),ti=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${ti(r.children,t)}</ul>
            </details>
          </li>`;let n=ag.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var lg,Oe,g_,f_,No,h_,cg,dg=m(()=>{"use strict";lg=f(require("node:path"));rg();sg();ig();Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g_=()=>`(() => {
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

})();`,f_=()=>`(() => {
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
})();`,No=e=>{let t=tg({installed:e.installed}),r=e.flashError?`<div class="alert-error">${Oe(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Oe(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':h_(e.reveal),o=e.reveal?.scanRoots[0]?.trim()??"",s=o.length>0&&e.scanFolder.trim()===o,a=!e.importSectionExpanded,i=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Oe(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Oe(o)}" />
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
    <script>${g_()}</script>
    <script>${f_()}</script>`;return`${t}${r}${i}${c}`},h_=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,a=t.get(s)??{sets:[]};t.set(s,{sets:[...a.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let a=o.sets.map(({set:i,setIndex:c})=>{let p=og(i.items.map(h=>({...h,relativePath:typeof h.relativePath=="string"&&h.relativePath.length>0?h.relativePath:lg.default.relative(i.sourceRoot,h.sourcePath).replaceAll("\\","/")}))),d=ti(p,Oe),u=i.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Oe(i.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Oe(i.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${u} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${d}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Oe(n)}" autocomplete="off" />
          </label>
          ${a}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},cg=(e,t)=>{let r=new Set(e.getAll("includeSet").map(a=>Number.parseInt(String(a),10)).filter(a=>Number.isFinite(a))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[a,i]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(a);if(c===null)continue;let p=Number.parseInt(c[1]??"",10),d=i.trim();Number.isFinite(p)&&d.length>0&&o.set(p,d)}let s=[];for(let a=0;a<n;a+=1){let i=e.get(`setSlug-${a}`)?.trim()??"",c=e.get(`setGroupIndex-${a}`),p=c===null?null:Number.parseInt(c,10),d=p!==null&&Number.isFinite(p)?o.get(p):void 0,u=e.get(`setName-${a}`)?.trim()??d??i,h=t.sets[a];if(h===void 0)continue;let _=i.length>0?i:h.proposedSlug,y=u.length>0?u:h.proposedName,l=r.size===0||r.has(a),A=h.items.map(S=>({id:S.id,kind:S.kind,title:S.title,sourcePath:S.sourcePath,include:l}));s.push({slug:_,name:y,items:A})}return s}});var Vr,ri,ug,mg,y_,Oo,A_,pg,ni,gg=m(()=>{"use strict";Vr=f(require("node:fs")),ri=f(require("node:path")),ug=require("node:crypto");co();mg=e=>ri.default.join(e.harnessRootDir,"projects-registry.json"),y_=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Oo=e=>{let t=mg(e);if(!Vr.default.existsSync(t))return[];try{let r=JSON.parse(Vr.default.readFileSync(t,"utf8"));return y_(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string"):[]}catch{return[]}},A_=(e,t)=>{Vr.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};Vr.default.writeFileSync(mg(e),`${JSON.stringify(r,null,2)}
`)},pg=(e,t)=>{let r=Qe(t.projectFolderPath),n=t.name?.trim()||ri.default.basename(r)||"Project",o=Oo(e),s=o.find(i=>Qe(i.projectFolderPath)===r);if(s!==void 0)return s;let a={id:(0,ug.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return A_(e,[...o,a]),a},ni=(e,t)=>Oo(e).find(r=>r.id===t)??null});var fg,hg=m(()=>{"use strict";fg=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Mo,oi,zr,S_,_e,Ho,Bt=m(()=>{"use strict";Mo=f(require("node:fs")),oi=f(require("node:os")),zr=f(require("node:path")),S_=()=>Mo.default.realpathSync(zr.default.resolve(oi.default.homedir())),_e=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?zr.default.join(oi.default.homedir(),t.slice(1)):t,n;try{n=Mo.default.realpathSync(zr.default.resolve(r))}catch{return null}let o=S_();return n===o||n.startsWith(`${o}${zr.default.sep}`)?n:null},Ho=e=>{let t=_e(e);if(t===null)return null;try{if(!Mo.default.statSync(t).isFile())return null}catch{return null}return t}});var Z,Gt,Kr,__,b_,w_,yg,Ag=m(()=>{"use strict";Z=f(require("node:fs")),Gt=f(require("node:path"));co();Cr();hg();Bt();Kr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),__=e=>{if(!Z.default.existsSync(e))return null;try{let t=JSON.parse(Z.default.readFileSync(e,"utf8"));if(Kr(t)&&t.version===1)return t}catch{return null}return null},b_=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?Gt.default.join(e.harnessRootDir,n):Gt.default.join(e.harnessSetsDir,t,n);if(!Z.default.existsSync(o))return null;try{if(!Z.default.statSync(o).isFile())return null}catch{return null}return o},w_=(e,t)=>{let r={};if(Z.default.existsSync(e))try{let o=JSON.parse(Z.default.readFileSync(e,"utf8"));Kr(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};Z.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},yg=e=>{let t=[...new Set(e.setSlugs.map(d=>d.trim()).filter(d=>d.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=Qe(e.projectFolderPath),n=_e(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=Z.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=__(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let a=Kr(s.sets)?s.sets:{},i=Gt.default.join(n,".cursor"),c=0;for(let d of t){let u=a[d];if(!Kr(u))return{ok:!1,errorMessage:`Harness set "${d}" is not installed locally.`};let h=Array.isArray(u.items)?u.items:[];for(let _ of h){if(!Kr(_))continue;let y=typeof _.path=="string"?_.path.trim():"";if(y.length===0)continue;let l=fg(y);if(l===null)continue;let A=b_(e.layout,d,y);if(A===null)continue;let S=Gt.default.join(i,l);Z.default.mkdirSync(Gt.default.dirname(S),{recursive:!0}),Z.default.copyFileSync(A,S),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let p=ye({projectFolderPath:n});return w_(p.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var Me,si,Sg=m(()=>{"use strict";Me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),si=e=>{let t=e.flashError?`<div class="alert-error">${Me(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Me(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Me(o.slug)}"${r.has(o.slug)?" checked":""} />
            <span><strong>${Me(o.name)}</strong> <span class="muted mono">(${Me(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Me(e.project.name)}</h1>
      <p class="muted mono">${Me(e.project.projectFolderPath)}</p>
      <p class="lede">Linked harness sets are copied into this project&apos;s <code>.cursor</code> folder and recorded in <code>.agent-witch/project.json</code>.</p>
      <form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Me(e.project.id)}" />
        <p class="field-label">Harness sets</p>
        ${n}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${e.installed.sets.length===0?" disabled":""}>Save linked harness</button>
        </div>
      </form>
    </section>`}});var Do,_g,bg=m(()=>{"use strict";Do=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_g=e=>{let t=e.flashError?`<div class="alert-error">${Do(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Do(e.flashMessage)}</div>`:"",r=e.projects.length===0?'<p class="empty">No projects yet. Add a repo folder to link harness sets and run tasks in context.</p>':`<ul class="project-list">${e.projects.map(n=>`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Do(n.name)}</strong>
                  <span class="muted mono">${Do(n.projectFolderPath)}</span>
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
    </section>`}});var ai,ii,wg=m(()=>{"use strict";ai=f(require("node:fs"));Tr();ii=e=>{let t=Ie(e);if(!ai.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse(ai.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var ci,li,Vt,vg=m(()=>{"use strict";ci=f(require("node:fs")),li=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vt=e=>{if(!ci.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(ci.default.readFileSync(e.harnessManifestPath,"utf8"));if(!li(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=li(t.sets)?t.sets:{},o=Object.entries(n).map(([s,a])=>{if(!li(a))return null;let i=typeof a.slug=="string"&&a.slug.length>0?a.slug:s,c=typeof a.name=="string"&&a.name.length>0?a.name:i,p=typeof a.updatedAt=="string"?a.updatedAt:"",d=Array.isArray(a.items)?a.items:[];return{slug:i,name:c,itemCount:d.length,updatedAt:p}}).filter(s=>s!==null).toSorted((s,a)=>s.name.localeCompare(a.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var di,Eg=m(()=>{"use strict";di=()=>"~"});var Wg,ui,Lg=m(()=>{"use strict";Wg=require("node:child_process"),ui=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Wg.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var kg,Rg,xg=m(()=>{"use strict";kg=require("node:crypto"),Rg=e=>`local-${(0,kg.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var mi,Tg=m(()=>{"use strict";mi=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var qr,Fo,pi=m(()=>{"use strict";qr=f(require("node:path")),Fo=e=>{let t=qr.default.dirname(e),r=qr.default.basename(t);return r==="agents"?qr.default.basename(qr.default.dirname(t)):r}});var Jr,be,Cg,v_,E_,W_,Uo,Pg,gi=m(()=>{"use strict";Jr=f(require("node:fs")),be=f(require("node:path"));xg();Tg();pi();Cg=new Set(["node_modules",".git","dist","build",".next","coverage"]),v_=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},E_=(e,t)=>{let r=be.default.basename(t);if(e==="skill"){let n=t.split(be.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},W_=e=>{let t=[],r=(o,s)=>{let a;try{a=Jr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(i.name.startsWith(".")||i.isDirectory()&&Cg.has(i.name))continue;let c=be.default.join(o,i.name),p=s?be.default.join(s,i.name):i.name;if(i.isDirectory()){r(c,p);continue}if(!i.isFile())continue;mi(p.replaceAll("\\","/"))!==null&&t.push({relativePath:p,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=be.default.join(e,o);Jr.default.existsSync(s)&&r(s,o)}let n=be.default.join(e,"skills");return Jr.default.existsSync(n)&&r(n,"skills"),t},Uo=e=>{let t=W_(e);if(t.length===0)return null;let r=be.default.dirname(e),n=Fo(e),o=v_(n),s=t.map(a=>{let i=mi(a.relativePath.replaceAll("\\","/"));if(i===null)throw new Error(`Unexpected harness file: ${a.relativePath}`);return{id:Rg(a.absolutePath),kind:i,title:E_(i,a.relativePath),sourcePath:a.absolutePath,relativePath:a.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},Pg=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let a;try{a=Jr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(r())return;if(!i.isDirectory()||Cg.has(i.name))continue;let c=be.default.join(o,i.name);if(i.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var Ig,fi,L_,Ng,Og=m(()=>{"use strict";Ig=f(require("node:fs")),fi=f(require("node:path"));gi();Bt();L_=e=>{let t=_e(e.trim());if(t===null)return null;if(fi.default.basename(t)===".cursor")return t;let r=fi.default.join(t,".cursor");try{if(Ig.default.statSync(r).isDirectory())return _e(r)}catch{return null}return null},Ng=e=>{let t=L_(e.projectPath);if(t===null)return null;let r=Uo(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(a=>a.sourceRoot!==r.sourceRoot),r].toSorted((a,i)=>a.proposedName.localeCompare(i.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var Mg,k_,jo,Hg,Dg=m(()=>{"use strict";Mg=f(require("node:path"));gi();Bt();pi();k_=5,jo=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Hg=e=>{let t=_e(e.scanRoot.trim());if(t===null)return jo(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of Pg(t,k_,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let a=_e(s);if(a===null)continue;let i=Fo(a);jo(e.response,"folder",{cursorDir:a,groupName:i,repoPath:Mg.default.dirname(a)});let c=Uo(a);c!==null&&(r.push(c),jo(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:i,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(p=>p.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,a)=>s.proposedName.localeCompare(a.proposedName))};return jo(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var Fg,Ug,jg=m(()=>{"use strict";Fg=f(require("node:path")),Ug=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Fg.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var H,$g,hi,R_,Bg,yi,Ai,Gg,$o,Vg=m(()=>{"use strict";H=f(require("node:fs")),$g=f(require("node:os")),hi=f(require("node:path"));ks();Bt();jg();R_=e=>{if(!H.default.existsSync(e))return null;try{let t=JSON.parse(H.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Bg=e=>{let t=e.hostname??$g.default.hostname(),r=R_(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let a of e.sets){let i=a.items.filter(d=>d.include);if(i.length===0)continue;let c=[];for(let d of i){let u=Ho(d.sourcePath);if(u===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${d.sourcePath}`};let h=H.default.readFileSync(u,"utf8");c.push({id:d.id,kind:d.kind,title:d.title,content:h,setSlugs:[a.slug]})}let p=Fn({bundle:{name:a.name,slug:a.slug,items:c},hostname:t,existingManifest:r});r=p.manifest;for(let d of p.directories)o.add(d);for(let d of p.files)s.push(d),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{H.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let a of o)H.default.mkdirSync(`${e.layout.harnessRootDir}/${a}`,{recursive:!0});for(let a of s){let i=hi.default.join(e.layout.harnessRootDir,a.relativePath);H.default.mkdirSync(hi.default.dirname(i),{recursive:!0}),H.default.writeFileSync(i,a.content)}return H.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Harness submit failed."}}},yi="reveal-cache.json",Ai=(e,t)=>{H.default.mkdirSync(e.harnessRootDir,{recursive:!0}),H.default.writeFileSync(`${e.harnessRootDir}/${yi}`,`${JSON.stringify(t,null,2)}
`)},Gg=e=>{let t=`${e.harnessRootDir}/${yi}`;H.default.existsSync(t)&&H.default.unlinkSync(t)},$o=e=>{let t=`${e.harnessRootDir}/${yi}`;if(!H.default.existsSync(t))return null;try{let r=JSON.parse(H.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return Ug(r)}catch{return null}return null}});var zg,Kg=m(()=>{"use strict";zg=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var zt,x_,Si,qg=m(()=>{"use strict";zt=f(require("node:fs")),x_=256e3,Si=(e,t=x_)=>{if(!zt.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=zt.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,a=Buffer.alloc(s),i=zt.default.openSync(e,"r");try{zt.default.readSync(i,a,0,s,o)}finally{zt.default.closeSync(i)}let c=a.toString("utf8");if(o>0){let p=c.indexOf(`
`);p>=0&&(c=c.slice(p+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var Jg,Yg,_i,Xg,Zg=m(()=>{"use strict";Jg=require("node:crypto"),Yg=f(require("node:fs"));cr();Nn();Ge();Ve();_i=!1,Xg=async e=>{if(_i)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!N(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=At({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&Yg.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,Jg.randomUUID)();_i=!0;try{if(await Xl(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let i=await _t({workspace:o,claudeCommand:r.claudeCommand,codexCommand:r.codexCommand,cursorCommand:r.cursorCommand,antigravityCommand:r.antigravityCommand},e.writerAgent,t);return await Pn(n,s,i.exitCode,i.output)?{ok:i.exitCode===0,agentRunId:s,...i.exitCode===0?{}:{errorMessage:i.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{_i=!1}}});var Qg,ef=m(()=>{"use strict";Qg="https://www.agentwitch.com"});var Bo,bi=m(()=>{"use strict";ef();Ve();ft();Bo=e=>{let t=$(),r=t!==null?J(t.wsUrl):null;if(r!==null&&r.length>0)return r;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Qg}});var tf,rf=m(()=>{"use strict";je();yt();bi();tf=async e=>{let t=j(e.installDir),r=t?.bundleVersion??null,n=Bo(t);try{let o=await ps(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:vn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var nf,of=m(()=>{"use strict";nf=e=>!e});var sf,af,lf=m(()=>{"use strict";Ga();sf=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},af=async()=>{let e=await ko({force:!0});if(e.ok)return{ok:!0,message:sf(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:sf(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(yt(),kn)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var df,Xr,uf,vi,cf,T_,wi,O,Ei,P,q,Yr,C_,P_,mf,pf,gf=m(()=>{"use strict";df=f(require("node:http")),Xr=f(require("node:fs")),uf=f(require("node:path"));kp();Lo();To();xp();Za();fr();Et();Io();Fp();jp();Vp();Kp();Jp();eg();dg();gg();Ag();Sg();bg();wg();vg();Eg();Lg();Og();Bt();Dg();Vg();Cr();Kg();qg();je();Zg();Ve();bi();rf();of();lf();za();vi=e=>Dp(e)??"never",cf=48e3,T_=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0?!0:Vt(e).sets.length===0,wi=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??di(),reveal:t.reveal,installed:Vt(e),flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),O=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ei={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},P=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Ei}),e.end(JSON.stringify(r))},q=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Yr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},C_=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${O(e.status.wakeError)}</div>`:"",o=nf(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Po(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${O(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${O(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${O(vi(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${O(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},P_=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":null},mf=e=>{let t=uf.default.join(e.layout.installDir,"link-code.txt"),r=()=>j(e.layout.installDir),n=()=>{let d=r();return{installBundleVersion:zg(d),installBundleUpdatedAt:d?.updatedAt??null,installVersion:d}},o=async d=>{let u=d.installVersion??r(),h=await a(),_=Bp(h),y=Gp(d.updateFlash??null);return Qp({title:d.title,activePath:d.activePath,body:d.body,cloudAppOrigin:Bo(u),prependBody:`${y}${_}`,headerUpdateButtonHtml:$p(h)})},s=null,a=async()=>{let d=Date.now();if(s!==null&&d-s.cachedAtMs<6e4)return s.offer;let u=await tf(e.layout);return s={cachedAtMs:d,offer:u},u},i=()=>{s=null},c=()=>{if(Xr.default.existsSync(t))return Xr.default.readFileSync(t,"utf8").trim();let d=Math.random().toString(36).slice(2,8).toUpperCase();return Xr.default.writeFileSync(t,d,"utf8"),d},p=df.default.createServer((d,u)=>{(async()=>{let h=d.url?.split("?")[0]??"/",_=d.method??"GET";if(_==="OPTIONS"){u.writeHead(204,Ei),u.end();return}if(_==="GET"&&h==="/health"){let y=e.controllers.getStatus(),l=n();P(u,200,{ok:!0,...y,installBundleVersion:l.installBundleVersion,installBundleUpdatedAt:l.installBundleUpdatedAt});return}if(_==="GET"&&h==="/api/status"){let y=n();P(u,200,{...e.controllers.getStatus(),linkCode:c(),installBundleVersion:y.installBundleVersion,installBundleUpdatedAt:y.installBundleUpdatedAt});return}if(_==="GET"&&h==="/api/traffic"){P(u,200,{entries:Wo(e.layout)});return}if(_==="DELETE"&&h==="/api/traffic"){Gm(e.layout),P(u,200,{ok:!0});return}if(_==="GET"&&h==="/api/trace"){P(u,200,{entries:Xa(e.layout)});return}if(_==="DELETE"&&h==="/api/trace"||_==="POST"&&h==="/api/trace/clear"){if(wp(e.layout),_==="POST"){u.writeHead(303,{Location:"/status"}),u.end();return}P(u,200,{ok:!0});return}if(_==="GET"&&h==="/api/knowledge"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(l.length>0){let A=await Br({layout:e.layout,query:l,limit:20});P(u,200,{chunks:A,query:l});return}P(u,200,{chunks:$r(e.layout).slice(-50).reverse()});return}if(_==="POST"&&h==="/api/revive"){e.controllers.reviveWebSocket(),P(u,200,{ok:!0});return}if(_==="GET"&&h==="/api/update-status"){let y=await a();P(u,200,{ok:!0,...y});return}if(_==="POST"&&h==="/api/update"){i();let y=await af();i(),u.writeHead(303,{Location:y.ok?"/?update=ok":"/?update=failed"}),u.end();return}if(_==="GET"&&h==="/"){let y=e.controllers.getStatus(),l=n(),A=Vt(e.layout),S=Si(e.layout.errorLogPath);q(u,await o({title:"Home",activePath:"/",installVersion:l.installVersion,updateFlash:P_(d.url??void 0),body:zp({wsConnected:y.wsConnected,lastHeartbeatAt:y.lastHeartbeatAt,harnessSetCount:A.sets.length,knowledgeChunkCount:$r(e.layout).length,trafficEntryCount:Wo(e.layout).length,wakeError:y.wakeError,errorLogByteSize:S.byteSize,errorLogExists:S.exists})}));return}if(_==="GET"&&h==="/task"){let y=e.controllers.getStatus(),l=n(),A=$(),S=new URL(d.url??"/",`http://127.0.0.1:${43347}`),g=S.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,b=S.searchParams.get("failed")==="1"?S.searchParams.get("error")?.trim()??"Task failed.":null,w=S.searchParams.get("runId");q(u,await o({title:"Task",activePath:"/task",installVersion:l.installVersion,body:qp({defaultWorkspace:A?.workspace??"",wsConnected:y.wsConnected,flashMessage:g,flashError:b,lastRunId:w})}));return}if(_==="POST"&&h==="/task/dispatch"){let y=await Yr(d),l=new URLSearchParams(y),A=l.get("prompt")?.trim()??"",S=l.get("writerAgent")?.trim()??"claude-cli",g=l.get("projectFolder")?.trim()??"",b=await Xg({prompt:A,writerAgent:S,...g.length>0?{projectFolderPath:g}:{}}),w=new URLSearchParams;b.ok?w.set("ok","1"):(w.set("failed","1"),b.errorMessage!==void 0&&w.set("error",b.errorMessage.slice(0,240))),b.agentRunId!==void 0&&w.set("runId",b.agentRunId),u.writeHead(303,{Location:`/task?${w.toString()}`}),u.end();return}if(_==="GET"&&h==="/errors"){let y=n(),l=Si(e.layout.errorLogPath);q(u,await o({title:"Errors",activePath:"/errors",installVersion:y.installVersion,body:Up({errorLogPath:e.layout.errorLogPath,content:l.content,exists:l.exists,truncated:l.truncated,byteSize:l.byteSize})}));return}if(_==="GET"&&h==="/status"){let y=e.controllers.getStatus(),l=re(e.layout),A=ue(l,de),S=n();q(u,await o({title:"Status",activePath:"/status",installVersion:S.installVersion,body:`${C_({status:y,stale:A,linkCode:c(),installBundleVersion:S.installBundleVersion,installBundleUpdatedAt:S.installBundleUpdatedAt})}${Rp({entries:Xa(e.layout)})}`}));return}if(_==="GET"&&h==="/traffic"){let y=Wo(e.layout),l=n(),A=y.map(g=>`<tr><td title="${O(g.at)}">${O(vi(g.at))}</td><td>${O(g.direction)}</td><td><code>${O(g.type)}</code></td><td>${O(g.summary)}</td><td>${O(g.action??"")}</td></tr>`).join(""),S=y.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${A}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';q(u,await o({title:"Traffic",activePath:"/traffic",installVersion:l.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${S}
            </section>`}));return}if(_==="GET"&&h==="/projects"){let y=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=n(),A=y.searchParams.get("added")==="1"?"Project added.":null;q(u,await o({title:"Projects",activePath:"/projects",installVersion:l.installVersion,body:_g({projects:Oo(e.layout),flashMessage:A})}));return}if(_==="GET"&&h==="/project"){let y=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=y.searchParams.get("id")?.trim()??"",A=ni(e.layout,l);if(A===null){u.writeHead(404),u.end("Project not found");return}let S=n(),g=y.searchParams.get("linked")==="1"?`Harness linked (${y.searchParams.get("files")??"0"} file(s) written).`:null;q(u,await o({title:A.name,activePath:"/projects",installVersion:S.installVersion,body:si({project:A,installed:Vt(e.layout),linkedSetSlugs:ii(A.projectFolderPath),flashMessage:g})}));return}if(_==="POST"&&h==="/projects/add"){let y=ui();if(y===null){u.writeHead(303,{Location:"/projects"}),u.end();return}ye({projectFolderPath:y}),pg(e.layout,{projectFolderPath:y}),u.writeHead(303,{Location:"/projects?added=1"}),u.end();return}if(_==="POST"&&h==="/projects/link-harness"){let y=await Yr(d),l=new URLSearchParams(y),A=l.get("projectId")?.trim()??"",S=ni(e.layout,A);if(S===null){u.writeHead(404),u.end("Project not found");return}let g=l.getAll("applySet").map(w=>String(w)),b=yg({layout:e.layout,projectFolderPath:S.projectFolderPath,setSlugs:g});if(!b.ok){let w=n();q(u,await o({title:S.name,activePath:"/projects",installVersion:w.installVersion,body:si({project:S,installed:Vt(e.layout),linkedSetSlugs:ii(S.projectFolderPath),flashError:b.errorMessage})}));return}u.writeHead(303,{Location:`/project?id=${encodeURIComponent(S.id)}&linked=1&files=${b.writtenFileCount}`}),u.end();return}if(_==="GET"&&h==="/harness"){let y=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=n(),A=$o(e.layout),S=y.searchParams.get("submitted")==="1",g=S?y.searchParams.get("syncFailed")==="1"?`Local harness updated (${y.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:y.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${y.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":y.searchParams.get("stopped")==="1"?`Reveal stopped. ${A?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:y.searchParams.get("revealed")==="1"?`Reveal found ${A?.sets.length??0} set(s).`:null,b=A?.scanRoots[0]??di(),w=T_(e.layout,{reveal:A,importQuery:y.searchParams.get("import")==="1",justSubmitted:S});q(u,await o({title:"Harness",activePath:"/harness",installVersion:l.installVersion,body:No(wi(e.layout,{reveal:A,scanFolder:b,flashMessage:g,importSectionExpanded:w}))}));return}if(_==="POST"&&h==="/api/harness/pick-folder"){let y=ui();if(y===null){P(u,200,{cancelled:!0});return}P(u,200,{path:y});return}if(_==="GET"&&h==="/api/harness/file-content"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",A=Ho(l);if(A===null){P(u,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let S=Xr.default.readFileSync(A,"utf8"),g=S.length>cf?`${S.slice(0,cf)}
\u2026 (truncated)`:S;P(u,200,{content:g})}catch{P(u,500,{errorMessage:"Could not read file."})}return}if(_==="POST"&&h==="/api/harness/reveal/add-project"){let y=await Yr(d),l="";try{let g=JSON.parse(y);typeof g=="object"&&g!==null&&typeof g.projectPath=="string"&&(l=g.projectPath.trim())}catch{P(u,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(l.length===0){P(u,400,{ok:!1,errorMessage:"projectPath is required."});return}let A=$o(e.layout),S=Ng({reveal:A,projectPath:l});if(S===null||S.sets.length===0){P(u,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Ai(e.layout,S),P(u,200,{ok:!0,setCount:S.sets.length});return}if(_==="GET"&&h==="/api/harness/reveal/stream"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(l.length===0){P(u,400,{errorMessage:"Choose a folder to scan first."});return}let A=!1;d.on("close",()=>{A=!0}),u.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Ei});let S=Hg({scanRoot:l,response:u,shouldAbort:()=>A});Ai(e.layout,S),u.end();return}if(_==="POST"&&h==="/harness/reveal"){u.writeHead(410,{"Content-Type":"text/plain"}),u.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(_==="POST"&&h==="/harness/submit"){let y=$o(e.layout);if(y===null){let T=n();q(u,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:No(wi(e.layout,{reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let l=await Yr(d),A=new URLSearchParams(l),S=cg(A,y),g=Bg({layout:e.layout,sets:S});if(!g.ok){let T=n();q(u,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:No(wi(e.layout,{reveal:y,flashError:g.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Gg(e.layout);let w=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";u.writeHead(303,{Location:`/harness?submitted=1&count=${g.writtenItemCount??0}${w}`}),u.end();return}if(_==="GET"&&h==="/knowledge"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",A=n(),g=(l.length>0?await Br({layout:e.layout,query:l,limit:20}):$r(e.layout).slice(-50).reverse()).map(b=>`<article class="card"><div class="muted" title="${O(b.createdAt)}">${O(vi(b.createdAt))}${b.source?` \xB7 ${O(b.source)}`:""}</div><pre>${O(b.text)}</pre></article>`).join("");q(u,await o({title:"Knowledge",activePath:"/knowledge",installVersion:A.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${O(l)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${g||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}_==="POST"&&await Yr(d),u.writeHead(404),u.end("Not found")})().catch(h=>{console.error("[agent-witch-local-app]",h),u.writeHead(500),u.end("Internal error")})});return p.on("error",d=>{if(d.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",d)}),p.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Lp}`)}),p},pf=e=>Va(e).publicKeyRaw});var Zr,Wi,ff,hf,yf,Af,Sf=m(()=>{"use strict";Zr=f(require("node:fs")),Wi=f(require("node:path"));pt();Tr();ff=(e,t)=>Wi.default.join(Ie(t).memoryDirPath,hn),hf=(e,t)=>{let r=ff(e,t);if(!Zr.default.existsSync(r))return[];let n=Zr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},yf=e=>{let t=ff(e.layout,e.projectFolderPath);Zr.default.mkdirSync(Wi.default.dirname(t),{recursive:!0}),Zr.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},Af=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let a=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,i=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${a}
Result: ${i}`}).join(`

`)}

---

`});var _f,I_,N_,O_,bf,wf=m(()=>{"use strict";_f=f(require("node:os"));L();I_="Default",N_=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),O_=e=>{let t=_f.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},bf=()=>{let e=W(),t=$i(e),r=N_(I_);return`${O_(t)}/${r.length>0?r:"project"}`}});var vf,M_,Ef,Wf=m(()=>{"use strict";vf=require("node:child_process");bo();Ge();M_=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,vf.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",a=>{o(a===0)})})},Ef=async e=>{if(!N(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};try{await Ne(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await M_(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Lf,kf=m(()=>{"use strict";Lf=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var Rf,xf,Tf=m(()=>{"use strict";Rf=require("node:crypto"),xf=()=>(0,Rf.randomUUID)()});var Qr,H_,Cf,Go=m(()=>{"use strict";Qr="[[WORKING_ESTIMATE]]",H_=["Put this marker on its own line:",Qr,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),Cf=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",H_,"","Task to estimate:",e.trim()].join(`
`)});var Pf,If=m(()=>{"use strict";Pf=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Nf,Of=m(()=>{"use strict";Nf=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var D_,Mf,Hf=m(()=>{"use strict";Go();D_=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Mf=e=>{if(!e.includes(Qr))return null;let t=null;for(let r of e.matchAll(D_)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var Df,Ff=m(()=>{"use strict";Nn();Go();If();Of();Hf();Qt();Df=async e=>{let t=Pf(e.wrappedPrompt),r=Cf(t),n=await _t(e.config,e.writerAgent,r),o=Mf(n.output),s=Nf(o);return Zt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:te.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var Uf={};He(Uf,{buildContinuationPromptWithContext:()=>j_});var F_,U_,j_,jf=m(()=>{"use strict";F_=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,U_=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),j_=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=U_(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${F_(n,o)}`:null].filter(a=>a!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var $f={};He($f,{readHarnessExportSets:()=>B_});var en,Li,Vo,$_,B_,Bf=m(()=>{"use strict";en=f(require("node:fs")),Li=f(require("node:path"));L();Vo=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$_=e=>{if(!en.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(en.default.readFileSync(e.harnessManifestPath,"utf8"));if(Vo(t))return t}catch{return null}return null},B_=(e,t)=>{let r=W(t),n=$_(r);if(n===null)return[];let o=Vo(n.sets)?n.sets:{},s=[];for(let a of e){let i=o[a];if(!Vo(i)||typeof i.name!="string")continue;let c=Array.isArray(i.items)?i.items:[],p=[];for(let d of c){if(!Vo(d))continue;let u=typeof d.path=="string"?d.path:void 0,h=typeof d.id=="string"?d.id:"",_=typeof d.kind=="string"?d.kind:"",y=typeof d.title=="string"?d.title:"";if(u===void 0||h.length===0||_.length===0||y.length===0)continue;let l=u.startsWith("shared/")?Li.default.join(r.harnessRootDir,u):Li.default.join(r.harnessSetsDir,a,u);en.default.existsSync(l)&&p.push({id:h,kind:_,title:y,content:en.default.readFileSync(l,"utf8")})}p.length>0&&s.push({name:i.name,slug:a,items:p})}return s}});var Yf={};He(Yf,{startAgentWitchClient:()=>ob});var xi,tn,Kt,sb,G_,V_,z_,K_,q_,Gf,J_,Vf,zf,Kf,ki,R,qf,C,Ri,Y_,zo,X_,Z_,Q_,eb,tb,rb,nb,Jf,ob,Xf=m(()=>{"use strict";xi=require("node:child_process"),tn=f(require("node:fs")),Kt=f(require("node:os"));ru();gn();ds();ss();wa();Fe();cu();mu();Ou();wt();L();jm();cr();Ao();Da();bo();Ge();Ta();fr();Et();yo();Bm();qm();je();Ym();Qm();za();Lo();To();Wp();gf();Za();Sf();ft();wf();Cr();Wf();is();wn();it();An();kf();Tf();Go();Qt();Ff();sb={},G_="ws://localhost:3000/api/agent-witch/ws",V_="claude",z_="codex",K_="cursor",q_="agy",Gf=3e4,J_=3e4,Vf=new Map,zf=new Map,Kf=new Map,ki=e=>{let t=e?.trim()??"";return t.length>0?t:bf()},R=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qf=e=>{let t=W(e);if(!tn.default.existsSync(t.configPath))return null;try{let r=JSON.parse(tn.default.readFileSync(t.configPath,"utf8"));if(!R(r))throw new Error("Config must be a JSON object.");let n=process.env.AGENT_WITCH_WS_URL?.trim()??"",o=typeof r.wsUrl=="string"?r.wsUrl.trim():"",s=n.length>0?n:o.length>0?o:G_,a=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),i=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??V_,c=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??z_,p=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??K_,d=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??q_,u=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",h=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return u.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:h,wsUrl:s,workspace:a,claudeCommand:i,codexCommand:c,cursorCommand:p,antigravityCommand:d,pairingToken:u,layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},C=(e,t,r)=>{e.readyState===Wr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(ot(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Ya(r,"out",t)))},Ri=e=>e,Y_=e=>{if(!tn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(tn.default.readFileSync(e.harnessManifestPath,"utf8"));if(R(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},zo=(e,t)=>{let r=Y_(t);r!==null&&C(e,{type:"harness.manifest.report",payload:{hostname:Kt.default.hostname(),manifest:r}})},X_=async(e,t,r,n,o,s,a=!1,i,c,p,d)=>{if(!N(t)){C(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let u=wo(t)&&!Lm(t);if(u){try{await Ne(e.layout.installDir,t)}catch(b){let w=b instanceof Error?b.message:String(b);C(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ma(t)}else if(!wo(t))try{await Ne(e.layout.installDir,t)}catch(b){let w=b instanceof Error?b.message:String(b);C(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=a&&Wm(t)&&km(t)?"continue":"first",_=r;if(a&&h==="first"&&typeof c=="string"&&c.length>0){let b=fo(e.layout,c);if(b!==null){let{buildContinuationPromptWithContext:w}=await Promise.resolve().then(()=>(jf(),Uf));_=w({priorPrompt:b.prompt,priorOutput:b.resultOutput??"",userMessage:r})}}let y=ki(p);ye({projectFolderPath:y});let l=await Br({layout:e.layout,query:_,limit:5,projectFolderPath:y}),A=hf(e.layout,y),S=`${Af(A)}${Ip(l)}${_}`,g=d?.trim()??(s!==void 0&&y.trim().length>0?xf():void 0);if(s!==void 0&&g!==void 0&&g.length>0&&y.trim().length>0){_n({reportKey:g,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let b=await Df({config:{workspace:e.workspace,claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand},writerAgent:t,wrappedPrompt:S,reportKey:g,agentRunId:s});if(b.estimateSeconds!==null){let w=`${Qr}
${b.estimateSeconds}
`;tt(s)?C(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:w},requestId:n}):Ht(s,w)}S=Lf(S,b),S=ul(S,{agentRunId:s,reportKey:g,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}ja(e,t,S,n,Ri(o),s,{sessionTurn:h},i,y,g),u&&s!==void 0&&C(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:xm(t)},requestId:n})},Z_=async(e,t,r,n,o)=>{let s=(a,i)=>{C(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:a,exitCode:i},requestId:n})};try{let a="",i=await Tm({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,commands:xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:d=>{a+=d,C(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:d},requestId:n})}}),c=N(t)?t:"claude-cli",p=i.exitCode!==0?i.output:a.length>0?vo(c):i.output;s(p,i.exitCode)}catch(a){let i=a instanceof Error?a.message:String(a);console.error("[agent-witch] Writer session start failed:",i),s(`Failed to start ${t} session: ${i}
`,-1)}},Q_=(e,t,r)=>new Promise(n=>{if(!N(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=St(t,r,xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],a=(0,xi.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});a.stdout?.on("data",i=>{s.push(i.toString("utf8"))}),a.stderr?.on("data",i=>{s.push(i.toString("utf8"))}),a.on("close",i=>{n({exitCode:i??-1,output:s.join("").trim()})}),a.on("error",i=>{n({exitCode:-1,output:i.message})})}),eb=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(C(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){C(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!N(o)){C(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let a=await(async()=>{try{await Ne(e.layout.installDir,o)}catch(i){let c=i instanceof Error?i.message:String(i);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return Q_(e,o,s)})();C(n,{type:"harness.request.result",payload:{success:a.exitCode===0,writerAgent:o,exitCode:a.exitCode,output:a.output},requestId:r}),zo(n,e.layout)},tb=e=>{let t=1e3*2**e;return Math.min(J_,t)},rb=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,$m().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,A="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,Km({layout:e.layout,remoteBundleVersion:l,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=re(e.layout);l!==null&&ue(l,de)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,i(),c(),_())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},i=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{t.socket!==void 0&&(t.socket.removeAllListeners(),(t.socket.readyState===Wr.OPEN||t.socket.readyState===Wr.CONNECTING)&&t.socket.close(),t.socket=void 0,t.wsConnected=!1)},p=()=>{a(),t.localHealthTimer=setInterval(o,Gf)},d=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=tb(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,_()},l)},u=l=>{s();let A=()=>{let S=j(e.layout.installDir)?.bundleVersion??null,g=Y();C(l,{type:"agent.heartbeat",payload:{hostname:Kt.default.hostname(),macOsUsername:Kt.default.userInfo().username,wakeError:t.wakeError,wakePort:g,...e.email!==null?{email:e.email}:{},...S!==null?{installBundleVersion:S}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,Gf)},h=(l,A)=>{if(typeof l.type!="string")return;ot(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"}),Ya(e.layout,"in",l);let S=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&R(l.payload)){let g=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",b=typeof l.payload.origin=="string"?l.payload.origin:"",w=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",T=typeof l.payload.challenge=="string"?l.payload.challenge:"",G=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!cp({serverPublicKey:g,origin:b,devicePublicKey:w,challenge:T,serverAttestation:G})){t.wakeError="Server attestation verification failed",ot(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&R(l.payload)){let g=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";ot(e.layout,{direction:"local",type:"writer.ensure",summary:g,action:"ensure-writer"}),Ef({layout:e.layout,writerAgent:g,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{C(A,{type:"writer.status",payload:b},e.layout)})}if(l.type==="install.bundle.update"&&R(l.payload)){let g=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";g.length>0&&n(g,"install.bundle.update")}if(l.type==="system.ack"){Cs(e.layout,{wsUrl:e.wsUrl});let g=R(l.payload)?l.payload:null,b=Jm(g);b!==null&&n(b)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&R(l.payload)&&Xm(l.payload),l.type==="automations.run"&&R(l.payload)&&Zm(l.payload),l.type==="terminal.stream.accepted"&&R(l.payload)){let g=typeof l.payload.runId=="string"?l.payload.runId:"";if(g.length>0){let b=nm(g);for(let w of b)C(A,{type:"terminal.stream.chunk",payload:{runId:g,chunk:w},requestId:S})}}if(l.type==="agent.agentRun.list"&&C(A,{type:"dashboard.agentRun.list.result",payload:{runs:qu(e.layout)},requestId:S}),l.type==="agent.agentRun.get"&&R(l.payload)){let g=typeof l.payload.runId=="string"?l.payload.runId:"",b=g.length>0?fo(e.layout,g):null;C(A,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:S})}if(l.type==="command.claude.run"&&R(l.payload)){let g=l.payload.prompt,b=typeof l.payload.writerAgent=="string"&&N(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",w=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,T=l.payload.sessionContinuation===!0,G=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,we=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,at=ki(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),qt=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof g=="string"&&g.trim().length>0&&(console.log(`[agent-witch] Running ${b} task (${T?"continue":"first"})\u2026`),w!==void 0&&we!==void 0&&Vf.set(w,we),w!==void 0&&(zf.set(w,at),Kf.set(w,g.trim()),ye({projectFolderPath:at})),X_(e,b,g.trim(),S,A,w,T,we,G,at,qt))}if(l.type==="shell.session.open"&&R(l.payload)){let g=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:120,w=typeof l.payload.rows=="number"?l.payload.rows:32;g.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),gm({shellSessionId:g,cwd:e.workspace,cols:b,rows:w,send:T=>{C(A,T)},requestId:S}))}if(l.type==="shell.session.close"&&R(l.payload)){let g=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";g.length>0&&Mr(g,b=>{C(A,b)},S)}if(l.type==="shell.input"&&R(l.payload)){let g=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.data=="string"?l.payload.data:"";g.length>0&&b.length>0&&um(g,b)}if(l.type==="shell.resize"&&R(l.payload)){let g=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:0,w=typeof l.payload.rows=="number"?l.payload.rows:0;g.length>0&&b>0&&w>0&&mm(g,b,w)}if(l.type==="command.writer.session.end"&&R(l.payload)){let g=l.payload.writerAgent;typeof g=="string"&&N(g)&&Rm(g)}if(l.type==="command.writer.session.start"&&R(l.payload)){let g=l.payload.writerAgent,b=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof g=="string"&&N(g)&&b.length>0&&(console.log(`[agent-witch] Starting ${g} session\u2026`),Z_(e,g,b,S,A))}if(l.type==="command.claude.stop"&&R(l.payload)){let g=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";g.length>0&&(console.log(`[agent-witch] Stopping run ${g}\u2026`),Um(e,Ri(A),g,S))}if(l.type==="command.claude.input_respond"&&R(l.payload)){let g=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",b=typeof l.payload.response=="string"?l.payload.response.trim():"",w=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",T=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",G=typeof l.payload.question=="string"?l.payload.question:"";g.length>0&&b.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Dm(e,{agentRunId:g,originalPrompt:w,partialOutput:T,question:G,response:b,shellSessionId:Vf.get(g)},S,Ri(A)))}if(l.type==="dispatch.approval.required"&&R(l.payload)){let g=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",b=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${g}: ${b}`),process.platform==="darwin"&&(0,xi.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${g.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&R(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),eb(e,l.payload,S,A)),l.type==="harness.export.request"&&R(l.payload)){let g=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",b=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,w=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(T=>typeof T=="string"):[];g.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:T}=await Promise.resolve().then(()=>(Bf(),$f)),G=T(w,e.email);C(A,{type:"harness.export.result",payload:{success:G.length>0,borrowerUserId:g,...b!==void 0?{targetDeviceId:b}:{},sets:G,errorMessage:G.length>0?void 0:"No readable harness sets were found on this machine."},requestId:S})})()}if(l.type==="harness.manifest.request"&&zo(A,e.layout),l.type==="command.claude.result"&&R(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let g=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,b=ki(g!==void 0?zf.get(g):void 0),w=g!==void 0?Kf.get(g)??"":"";Pp({layout:e.layout,text:l.payload.output,source:g??"command.claude.result",projectFolderPath:b}),w.trim().length>0&&yf({layout:e.layout,projectFolderPath:b,entry:{id:`${Date.now()}-${g??"run"}`,...g!==void 0?{agentRunId:g}:{},prompt:w,output:l.payload.output,createdAt:new Date().toISOString()}})}},_=()=>{if(t.stopped)return;i(),c();let l=new Wr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Cs(e.layout,{wsUrl:e.wsUrl}),Nm(At({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Om(e.layout);let A=J(e.wsUrl)??"http://localhost:3000",S=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),g=lp({layout:e.layout,origin:A,...S!==void 0&&S.length>0?{claimToken:S}:{}});C(l,{type:"agent.register",payload:{role:"agent",hostname:Kt.default.hostname(),macOsUsername:Kt.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...g}},e.layout),zo(l,e.layout),Fm(e,l),u(l)}),l.on("message",A=>{let S=typeof A=="string"?A:A.toString("utf8");try{let g=JSON.parse(S);if(!R(g))return;h(g,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",(A,S)=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1;let g=typeof S=="string"?S:S.toString("utf8");Ut(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:g}),console.log("[agent-witch] Disconnected from server."),d()}),l.on("error",A=>{t.wakeError=A.message,Ut(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})};return{connect:_,startLocalHealthCheck:p,stop:()=>{t.stopped=!0,s(),a(),i(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:pf(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,_()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(zo(l,e.layout),{ok:!0})}}},nb=async()=>{let e=()=>{let r=zi();if(r.length===0){let n=qf(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=qf(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},Jf=async()=>{mt("agent-witch"),au().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=v();uu(t);let r=lu({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),En();let n=await nb(),o=n[0];o!==void 0&&Ep(o.layout);let s=n.map(u=>rb(u)),a=s[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ba(),process.exit(0));let i=()=>{for(let u of s)u.reviveWebSocket()},c=()=>{},p=await Nu({reconnectWebSockets:i,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),c()}});mf({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:i,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}});for(let u of s)u.startLocalHealthCheck(),u.connect();console.log(`[agent-witch] Bridging ${s.length} account profile(s) in one process.`);let d=pn(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),mn(),c()});c=()=>{d(),p.stop(),ba(),console.log("[agent-witch] Shutting down.");for(let u of s)u.stop();process.exit(0)},process.on("SIGINT",()=>{c()}),process.on("SIGTERM",()=>{c()})},ob=Jf;if(gt(sb.url)&&!ee()){let e=process.argv.indexOf("report");e>=0&&process.exit(bn(process.argv.slice(e))),Jf()}});gn();is();wn();var Sl="20.x",_l="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var Rh=e=>[`Node.js ${Sl} or newer is required (found ${e}).`,_l].join(" "),bl=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${Rh(process.version)}
`),process.exit(1))};var cb={},ab=async()=>{mt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(yt(),kn)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},ib=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Ys(),Xc)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},lb=async()=>{if(!gt(cb.url))return;bl();let e=process.argv.indexOf("report");e>=0&&process.exit(bn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await ab();return}if(t==="wake"){await ib();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(Xf(),Yf));await r()};lb();
