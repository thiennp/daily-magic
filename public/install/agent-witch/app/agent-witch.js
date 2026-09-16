#!/usr/bin/env node
"use strict";var dh=Object.create;var Jo=Object.defineProperty;var uh=Object.getOwnPropertyDescriptor;var mh=Object.getOwnPropertyNames;var ph=Object.getPrototypeOf,gh=Object.prototype.hasOwnProperty;var d=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var $=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Fe=(e,t)=>{for(var r in t)Jo(e,r,{get:t[r],enumerable:!0})},fh=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of mh(t))!gh.call(e,o)&&o!==r&&Jo(e,o,{get:()=>t[o],enumerable:!(n=uh(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?dh(ph(e)):{},fh(t||!e||!e.__esModule?Jo(r,"default",{value:e,enumerable:!0}):r,e));var Di,Fi,Yo=d(()=>{"use strict";Di=new Set(["","loginwindow","_mbsetupuser","root"]),Fi=5e3});var Ui,rn,Xo=d(()=>{"use strict";Ui=require("node:child_process"),rn=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Ui.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ne,lt=d(()=>{"use strict";ne=()=>!0});var nn,ji,hh,on,Zo=d(()=>{"use strict";nn=g(require("node:path")),ji=require("node:url");lt();hh={},on=()=>{if(ne()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return nn.default.dirname(nn.default.resolve(e))}return nn.default.dirname((0,ji.fileURLToPath)(hh.url))}});var de,$i,ct=d(()=>{"use strict";de="agent-witch.js",$i="command"});var es,Ki,W,yh,Qo,ts,Ah,Sh,_h,bh,Ue,wh,Bi,Gi,Vi,rs,ue,sn,an,zi,dt,ut,v,qi,ns,Ji,Yi,ln,Xi,Zi,me,os,vh,Eh,We,Wh,R,k=d(()=>{"use strict";es=g(require("node:fs")),Ki=g(require("node:os")),W=g(require("node:path"));Zo();ct();yh=on(),Qo=".agent-witch",ts=".local-agent-witch",Ah=47892,Sh=47893,_h="com.agent-witch",bh="com.local-agent-witch",Ue="profiles",wh="active-profile.json",Bi="harness",Gi="sets",Vi="manifest.json",rs="projects",ue="logs",sn="agent-witch.log",an="agent-witch.error.log",zi="reports",dt="device-keypair.json",ut=e=>e.trim().toLowerCase(),v=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return W.default.resolve(e);let t=W.default.resolve(yh),r=W.default.basename(t),n=W.default.basename(W.default.dirname(t));return r==="app"&&(n===Qo||n===ts)?W.default.dirname(t):r===Qo||r===ts?t:W.default.join(Ki.default.homedir(),Qo)},qi=(e=v())=>W.default.join(e,"app"),ns=(e=v())=>W.default.join(qi(e),de),Ji=(e,t,r)=>t!==null?W.default.join(e,Ue,t,r):W.default.join(e,r),Yi=e=>Ji(e.installDir,e.profileEmail,rs),ln=e=>Ji(e.installDir,e.profileEmail,ue),Xi=e=>e.profileEmail!==null?W.default.join(e.installDir,Ue,e.profileEmail,dt):W.default.join(e.installDir,dt),Zi=e=>W.default.basename(e)===ts,me=(e=v())=>Zi(e)?bh:_h,os=(e=v())=>Zi(e)?Sh:Ah,vh=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return ut(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?ut(t):null},Eh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),We=(e=v())=>{let t=W.default.join(e,wh);if(!es.default.existsSync(t))return null;try{let r=JSON.parse(es.default.readFileSync(t,"utf8"));if(Eh(r)&&typeof r.email=="string"&&r.email.trim().length>0)return ut(r.email)}catch{return null}return null},Wh=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?ut(r):null}let t=vh();return t!==null?t:We()},R=e=>{let t=v(),r=qi(t),n=ns(t),o=Wh(e);if(o!==null){let w=W.default.join(t,Ue,o),A=W.default.join(w,Bi),f=W.default.join(w,rs),l=W.default.join(w,ue),S=W.default.join(w,zi),h=W.default.join(w,dt),p=W.default.join(w,ue,sn),_=W.default.join(w,ue,an);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:f,logsDir:l,mainLogPath:p,errorLogPath:_,reportsDir:S,deviceKeypairPath:h,configPath:W.default.join(w,"config.json"),harnessRootDir:A,harnessManifestPath:W.default.join(A,Vi),harnessSetsDir:W.default.join(A,Gi)}}let s=W.default.join(t,Bi),a=W.default.join(t,rs),i=W.default.join(t,ue),c=W.default.join(t,zi),m=W.default.join(t,dt),u=W.default.join(t,ue,sn),y=W.default.join(t,ue,an);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:a,logsDir:i,mainLogPath:u,errorLogPath:y,reportsDir:c,deviceKeypairPath:m,configPath:W.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:W.default.join(s,Vi),harnessSetsDir:W.default.join(s,Gi)}}});var cn,ss,Qi,B,el,je=d(()=>{"use strict";cn=g(require("node:fs")),ss=g(require("node:path"));k();Qi=e=>{let t=ss.default.join(e,Ue);return cn.default.existsSync(t)?cn.default.readdirSync(t).filter(r=>cn.default.statSync(ss.default.join(t,r)).isDirectory()).map(r=>ut(r)).toSorted():[]},B=(e=v())=>{let t=me(e);return[{profileEmail:Qi(e)[0]??null,launchAgentLabel:t}]},el=(e=v())=>Qi(e)});var dn,mt,tl,as,rl,Lh,nl,Rh,kh,Yt,xh,ol,un=d(()=>{"use strict";dn=require("node:child_process"),mt=g(require("node:fs")),tl=g(require("node:os")),as=g(require("node:path")),rl=require("node:util");je();k();Lh=(0,rl.promisify)(dn.execFile),nl=()=>as.default.join(tl.default.homedir(),"Library","LaunchAgents"),Rh=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Lh("launchctl",["bootout",r]).catch(()=>{})},kh=e=>{let t=as.default.join(nl(),`${e}.plist`);mt.default.existsSync(t)&&mt.default.unlinkSync(t)},Yt=(e=v())=>{let t=me(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of B(e))r.add(o.launchAgentLabel);let n=nl();if(mt.default.existsSync(n))for(let o of mt.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},xh=e=>{(0,dn.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},ol=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=v();if(!mt.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Yt(e);for(let r of t)await Rh(r),kh(r);return xh(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var mn,is=d(()=>{"use strict";Xo();un();k();mn=(e=v())=>{for(let t of Yt(e))rn(t)}});var sl,Th,Ch,al,il=d(()=>{"use strict";sl=require("node:child_process");Yo();Th=e=>e.trim().toLowerCase(),Ch=e=>e==null?!1:!Di.has(Th(e)),al=()=>{if(process.platform!=="darwin")return null;try{let t=(0,sl.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Ch(t)?t:null}catch{return null}}});var cl,ll,pe,Xt=d(()=>{"use strict";cl=g(require("node:os"));il();ll=e=>e.trim().toLowerCase(),pe=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?al():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??cl.default.userInfo().username;return ll(r)===ll(n)}});var pt,pn,gn=d(()=>{"use strict";Yo();is();Xt();pt=e=>{pe()||(mn(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},pn=(e,t=Fi)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{pe()||e()},t);return()=>{clearInterval(r)}}});var dl,ul,ml,fn,hn,pl,gl,gt=d(()=>{"use strict";dl=".agent-witch",ul="memory",ml="project.json",fn="chunks.ndjson",hn="runs.ndjson",pl="reports",gl=".json"});var fl,yn,ls=d(()=>{"use strict";fl=g(require("node:path"));gt();yn=(e,t)=>fl.default.join(e.trim(),`${t.trim()}${gl}`)});var $e,hl,yl=d(()=>{"use strict";ct();$e=e=>`'${e.replace(/'/g,"'\\''")}'`,hl=e=>{let t=`${e.installDir.trim()}/${"app"}/${de}`,r=[$e("node"),$e(t),"report","write","--key",$e(e.reportKey.trim()),"--agent-run-id",$e(e.agentRunId.trim()),"--status",$e(e.status),"--summary",$e(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",$e(e.details.trim())),r.join(" ")}});var oe,Al,Ih,Sl,An=d(()=>{"use strict";ls();yl();oe={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Al=e=>e===oe.COMPLETED||e===oe.FAILED,Ih=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Sl=(e,t)=>{let r=yn(t.reportsDir,t.reportKey),n=hl({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:oe.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${Ih({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Zt,bl,_l,wl,Ph,Sn,Nh,Oh,Qt,_n,vl,El,er=d(()=>{"use strict";Zt=g(require("node:fs")),bl=g(require("node:path"));An();ls();k();_l=50,wl=e=>{let t=R(),r=yn(t.reportsDir,e);return Zt.default.mkdirSync(bl.default.dirname(r),{recursive:!0}),r},Ph=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Sn=e=>{let t=wl(e);if(!Zt.default.existsSync(t))return null;try{let r=JSON.parse(Zt.default.readFileSync(t,"utf8"));return Ph(r)?r:null}catch{return null}},Nh=(e,t)=>{let r=[...e,t];return r.length>_l?r.slice(r.length-_l):r},Oh=e=>{let t=wl(e.reportKey);Zt.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Qt=e=>{let t=Sn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Nh(t?.history??[],n)};return Oh(o),o},_n=e=>{let t=Sn(e.reportKey);return t!==null?t:Qt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:oe.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},vl=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},El=e=>{if(e===null||!Al(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===oe.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Mh,Hh,tr,Wl,bn,cs=d(()=>{"use strict";An();er();Mh=new Set(Object.values(oe)),Hh=e=>Mh.has(e),tr=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},Wl=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},bn=e=>{if(e[0]!=="write")return Wl(),1;let r=tr(e,"--key"),n=tr(e,"--agent-run-id"),o=tr(e,"--status"),s=tr(e,"--summary"),a=tr(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!Hh(o)?(Wl(),1):(Qt({reportKey:r,agentRunId:n,status:o,userSummary:s,details:a}),0)}});var ds,Ll,ft,wn=d(()=>{"use strict";ds=g(require("node:path")),Ll=require("node:url");lt();ft=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=ds.default.resolve(t);return ne()?r===ds.default.resolve(__filename):r===(0,Ll.fileURLToPath)(e)}});var rr,us,Uh,jh,Tl,G,Cl,vn,Be=d(()=>{"use strict";rr=g(require("node:fs")),us=g(require("node:path"));k();Uh="install-version.json",jh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tl=(e=v())=>us.default.join(e,Uh),G=(e=v())=>{let t=Tl(e);if(!rr.default.existsSync(t))return null;try{let r=JSON.parse(rr.default.readFileSync(t,"utf8"));return!jh(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Cl=(e,t=v())=>{let r=Tl(t);rr.default.mkdirSync(us.default.dirname(r),{recursive:!0}),rr.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},vn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var Pl,Nl,Ol,Ml,Hl,nr,$h,Bh,Gh,Il,Le,or=d(()=>{"use strict";Pl=require("node:child_process"),Nl=g(require("node:fs")),Ol=g(require("node:os")),Ml=g(require("node:path")),Hl=require("node:util");Xt();nr=(0,Hl.promisify)(Pl.execFile),$h=e=>Ml.default.join(Ol.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Bh=async e=>{try{return await nr("launchctl",["print",e]),!0}catch{return!1}},Gh=async(e,t,r)=>{await Bh(t)&&await nr("launchctl",["bootout",t]).catch(()=>{}),await nr("launchctl",["bootstrap",e,r]),await nr("launchctl",["enable",t])},Il=async e=>{try{return await nr("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Le=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!pe())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await Il(n))return{ok:!0};let o=$h(e);if(!Nl.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Gh(r,n,o),await Il(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var Vh,En,ms=d(()=>{"use strict";Xo();un();je();k();Vh=(e=v())=>{let t=new Set(B(e).map(r=>r.launchAgentLabel));return Yt(e).filter(r=>!t.has(r))},En=(e=v())=>{for(let t of Vh(e))rn(t)}});var Y,ht=d(()=>{"use strict";Y=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Dl,Ge,ps,zh,Kh,Fl,yt,Wn,gs=d(()=>{"use strict";Dl=require("node:crypto"),Ge=g(require("node:fs")),ps=g(require("node:path"));k();zh="self-update-log.ndjson",Kh=100,Fl=(e=v())=>{let t=R(),r=t.installDir===e?t.logsDir:ln({installDir:e,profileEmail:t.profileEmail});return ps.default.join(r,zh)},yt=(e,t=v())=>{let r={id:(0,Dl.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Fl(t);Ge.default.mkdirSync(ps.default.dirname(n),{recursive:!0});let o=Ge.default.existsSync(n)?Ge.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Kh+1)),JSON.stringify(r)];return Ge.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Wn=(e=20,t=v())=>{let r=Fl(t);if(!Ge.default.existsSync(r))return[];let n=Ge.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Ul,jl,$l=d(()=>{"use strict";Ul="deps.tar.gz",jl="deps"});var Gl,Re,Ve,qh,Vl,zl,Kl=d(()=>{"use strict";Gl=require("node:child_process"),Re=g(require("node:fs")),Ve=g(require("node:path"));$l();qh=e=>Ve.default.join(e,"app",jl),Vl=e=>{let t=Ve.default.join(e,"app"),r=Ve.default.join(t,Ul);Re.default.existsSync(r)&&(Re.default.rmSync(qh(e),{recursive:!0,force:!0}),Re.default.mkdirSync(t,{recursive:!0}),(0,Gl.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Re.default.rmSync(r,{force:!0}))},zl=e=>{Re.default.rmSync(Ve.default.join(e,"node_modules"),{recursive:!0,force:!0}),Re.default.rmSync(Ve.default.join(e,"package.json"),{force:!0}),Re.default.rmSync(Ve.default.join(e,"package-lock.json"),{force:!0})}});var Rn={};Fe(Rn,{buildAgentWitchSelfUpdateStatus:()=>ys,fetchAgentWitchRemoteInstallBundleVersion:()=>fs,runAgentWitchSelfUpdate:()=>hs});var ke,Ln,ql,Jh,Jl,fs,Yh,Xh,sr,hs,ys,At=d(()=>{"use strict";ke=g(require("node:fs")),Ln=g(require("node:path"));Be();or();ms();je();ht();k();ct();gs();Kl();ql=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jh=e=>{let t=We(e),r=t===null?R():R(t);if(!ke.default.existsSync(r.configPath))return null;try{let n=JSON.parse(ke.default.readFileSync(r.configPath,"utf8"));return!ql(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},Jl=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!ql(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},fs=async e=>(await Jl(e))?.bundleVersion??null,Yh=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=Ln.default.join(t,r);ke.default.mkdirSync(Ln.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());ke.default.writeFileSync(o,s),r.endsWith(".js")&&ke.default.chmodSync(o,493)},Xh=async()=>{En();let e=B();for(let t of e)await Le(t.launchAgentLabel)},sr=(e,t)=>({localBundleVersion:t,...e}),hs=async e=>{let t=v(),r=G(t),n=r?.bundleVersion??null,o=Jh(t),s=o===null?r?.appOrigin??null:Y(o);if(s===null){let c=sr({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return yt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let a=await Jl(s);if(a===null){let c=sr({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return yt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||vn(n,a.bundleVersion))){let c=sr({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return yt({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),c}try{for(let u of a.scripts)await Yh(s,t,u);let c=Ln.default.join(t,de);ke.default.existsSync(c)&&ke.default.rmSync(c,{force:!0}),Vl(t),zl(t),Cl({bundleVersion:a.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await Xh();let m=sr({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return yt({event:"update_applied",ok:!0,message:m.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),m}catch(c){let m=c instanceof Error?c.message:"Agent Witch self-update failed.",u=sr({ok:!1,updated:!1,message:m,remoteBundleVersion:a.bundleVersion},n);return yt({event:"update_failed",ok:!1,message:m,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),u}},ys=()=>{let e=v();return{local:G(e),logs:Wn(20,e)}}});var kn,ar,Yl,As,ir,Ss=d(()=>{"use strict";kn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=i=>n.find(c=>c.type===i)?.value??"0",s=o("weekday"),a={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:a[s]??0}},ar=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=kn(o,t),a=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-a*6e4)},Yl=e=>e>=1&&e<=5,As=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return kn(t,"UTC")},ir=e=>{let t=e.from??new Date,r=kn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return ar(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=ar(r,e.timeZone,n,0),s=kn(o,e.timeZone),a=t.getTime()>=o.getTime();if(e.preset==="daily")return a?ar(As(r),e.timeZone,n,0):o;if(!a&&Yl(s.weekday))return o;let i=r;for(let c=0;c<8;c+=1)if(i=As(i),Yl(i.weekday))return ar(i,e.timeZone,n,0);return ar(As(r),e.timeZone,n,0)}});var Zh,xn,_s=d(()=>{"use strict";Zh=e=>e==="hourly"||e==="daily"||e==="weekdays",xn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",a=typeof t.schedulePreset=="string"?t.schedulePreset:"",i=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!Zh(a)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:a,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:i,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var lr,Tn,Xl,Zl,bs,xe,Ql,ec,tc,rc,cr=d(()=>{"use strict";lr=g(require("node:fs")),Tn=g(require("node:path"));_s();Xl="automations.json",Zl=e=>e.profileEmail!==null?Tn.default.join(e.installDir,"profiles",e.profileEmail,Xl):Tn.default.join(e.installDir,Xl),bs=()=>({version:1,automations:[]}),xe=e=>{let t=Zl(e);if(!lr.default.existsSync(t))return bs();try{let r=JSON.parse(lr.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?bs():{version:1,automations:r.automations.flatMap(o=>{let s=xn(o);return s!==null?[s]:[]})}}catch{return bs()}},Ql=(e,t)=>{let r=Zl(e);lr.default.mkdirSync(Tn.default.dirname(r),{recursive:!0}),lr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ec=(e,t)=>{Ql(e,{version:1,automations:t})},tc=(e,t)=>{let n=xe(e).automations.filter(o=>o.id!==t.id);Ql(e,{version:1,automations:[...n,t]})},rc=(e,t)=>xe(e).automations.find(r=>r.id===t)??null});var Qh,ey,Cn,ws=d(()=>{"use strict";Ss();_s();cr();k();Qh=e=>e!==void 0&&e.trim().length>0?R(e.trim()):R(),ey=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??ir({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??ir({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Cn=e=>{let t=Qh(e.profileEmail),r=xe(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let a=xn(s);return a!==null?[ey(a,n.get(a.id))]:[]});return ec(t,o),{ok:!0,writtenCount:o.length}}});var nc,oc=d(()=>{"use strict";nc="x-agent-witch-token"});var St,vs,sc,In,ac,dr=d(()=>{"use strict";oc();ht();St=e=>{let t=Y(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},vs=e=>({[nc]:e,"Content-Type":"application/json"}),sc=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:vs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,a=typeof s.id=="string"?s.id:"",i=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return a.length===0||i.length===0?null:{id:a,prompt:i,writerAgent:c}}catch{return null}},In=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:vs(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},ac=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:vs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Pn,ur,M,Te,ic,_t,ze=d(()=>{"use strict";Pn={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ur=e=>e.trim().length>0,M=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Te=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:ur(t)?t.trim():Pn.claudeCommand,codexCommand:ur(r)?r.trim():Pn.codexCommand,cursorCommand:ur(n)?n.trim():Pn.cursorCommand,antigravityCommand:ur(o)?o.trim():Pn.antigravityCommand}},ic=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},_t=(e,t,r,n)=>{let o=t.trim();if(!ur(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var lc,bt,Nn=d(()=>{"use strict";lc=require("node:child_process");ze();bt=(e,t,r)=>new Promise(n=>{if(!M(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=_t(t,r,Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,lc.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),a=[];s.stdout?.on("data",i=>{a.push(i.toString("utf8"))}),s.stderr?.on("data",i=>{a.push(i.toString("utf8"))}),s.on("close",i=>{n({exitCode:i??-1,output:a.join("")})}),s.on("error",i=>{n({exitCode:-1,output:i.message})})})});var Es,Ws,Ls=d(()=>{"use strict";Es="https://www.agentwitch.com",Ws="wss://www.agentwitch.com/api/agent-witch/ws"});var On,cc,Rs=d(()=>{"use strict";On=".agent-witch",cc=".local-agent-witch"});var dc,ty,ks,Mn,xs=d(()=>{"use strict";dc=g(require("node:path"));Ls();Rs();ty="ws://localhost:3000/api/agent-witch/ws",ks=e=>e.replace(/\/$/,""),Mn=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return ks(t);let r=dc.default.basename(e.installDir);if(r===On)return Ws;let n=e.configWsUrl?.trim()??"";return r===cc?n.length>0?ks(n):ty:n.length>0?ks(n):Ws}});var Ts,ry,ny,oy,sy,ay,U,Ke=d(()=>{"use strict";Ts=g(require("node:fs"));xs();k();ry="claude",ny="codex",oy="cursor",sy="agy",ay=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U=()=>{let e=R();if(!Ts.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Ts.default.readFileSync(e.configPath,"utf8"));if(!ay(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=Mn({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:ry,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:ny,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:oy,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:sy,pairingToken:s,layout:e}}catch{return null}}});var uc,Cs,wt,Hn=d(()=>{"use strict";uc=require("node:crypto");dr();Ss();Nn();cr();Ke();Cs=!1,wt=async e=>{if(Cs)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=U();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=St({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=rc(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};Cs=!0;let o=(0,uc.randomUUID)();try{let s=await bt(t,"claude-cli",n.prompt);await ac(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let a=new Date,i=ir({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:a});return tc(t.layout,{...n,lastRunAt:a.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:i.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{Cs=!1}}});function mr(e){return(0,mc.createHash)("sha256").update(e.trim()).digest("hex")}var mc,Is=d(()=>{"use strict";mc=require("node:crypto")});var iy,pc,ly,cy,pr,gc,Ps=d(()=>{"use strict";iy=["agentwitch.com","www.agentwitch.com"],pc=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,ly=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},cy=e=>{let t=ly(e);return!!(iy.includes(t)||pc.test(e.trim().toLowerCase()))},pr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return cy(r)?pc.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},gc=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:pr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Dn,fc,dy,uy,hc,yc,Ns,Fn,Un=d(()=>{"use strict";Dn=g(require("node:fs")),fc=g(require("node:path")),dy="wake-port.json",uy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hc=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,yc=e=>fc.default.join(e,dy),Ns=e=>{let t=yc(e);if(!Dn.default.existsSync(t))return null;try{let r=JSON.parse(Dn.default.readFileSync(t,"utf8"));if(uy(r)&&hc(r.wakePort))return r.wakePort}catch{return null}return null},Fn=(e,t)=>{if(!hc(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=yc(e);Dn.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Sv,_v,bv,X,Ac,vt=d(()=>{"use strict";Un();k();Un();Sv=os(),_v=`${me()}-wake`,bv=me(),X=()=>{let e=v(),t=Ns(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return os()},Ac=e=>{let t=v();Ns(t)===null&&Fn(t,e)}});var Et,gr,my,Sc,_c,bc=d(()=>{"use strict";Et=g(require("node:fs")),gr=g(require("node:path"));Is();k();my=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sc=e=>{if(!Et.default.existsSync(e))return null;try{let t=JSON.parse(Et.default.readFileSync(e,"utf8"));return!my(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:mr(t.pairingToken.trim())}catch{return null}},_c=(e=v())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(Sc(gr.default.join(e,"config.json")));let o=gr.default.join(e,Ue);if(!Et.default.existsSync(o))return t;for(let s of Et.default.readdirSync(o)){let a=gr.default.join(o,s);Et.default.statSync(a).isDirectory()&&n(Sc(gr.default.join(a,"config.json")))}return t}});var wc,vc=d(()=>{"use strict";wc=["rule","skill","command","instruction","agent"]});var Ec,py,gy,Wc,Lc=d(()=>{"use strict";vc();Ec=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),py=e=>typeof e=="string"&&wc.includes(e),gy=e=>{if(!Ec(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!py(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Wc=e=>{if(!Ec(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let a=gy(s);return a===null?[]:[a]});return{name:t,slug:r,items:o}}});var Rc,fy,hy,yy,Ay,Sy,_y,by,wy,jn,Os=d(()=>{"use strict";Rc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},fy=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},hy=(e,t)=>{let r=fy(t),n=Rc(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},yy=(e,t,r)=>{let n=hy(t,r);return`shared/items/${e}/${n}`},Ay=["rules","skills","commands","instructions","agents"],Sy=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),_y=(e,t)=>[...e.filter(n=>n.id!==t.id),t],by=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},wy=e=>({id:e.id,kind:e.kind,title:e.title,path:yy(e.id,e.kind,e.title)}),jn=e=>{let t=new Date().toISOString(),r=e.existingManifest??Sy(e.hostname,t),n=Rc(e.bundle.slug),o=by(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...Ay.map(m=>`sets/${n}/${m}`),"shared/items"],{files:a,nextItems:i}=e.bundle.items.reduce((m,u)=>{let y=wy(u);return{files:[...m.files,{relativePath:y.path,content:u.content}],nextItems:_y(m.nextItems,y)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:i}}},directories:s,files:a}}});var Ce,kc,$n,vy,xc,Tc=d(()=>{"use strict";Ce=g(require("node:fs")),kc=g(require("node:os")),$n=g(require("node:path"));Os();k();vy=e=>{if(!Ce.default.existsSync(e))return null;try{let t=JSON.parse(Ce.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},xc=e=>{let t=R(e.profileEmail);try{let r=vy(t.harnessManifestPath),n=jn({bundle:e.bundle,hostname:kc.default.hostname(),existingManifest:r});Ce.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)Ce.default.mkdirSync($n.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=$n.default.join(t.harnessRootDir,o.relativePath);Ce.default.mkdirSync($n.default.dirname(s),{recursive:!0}),Ce.default.writeFileSync(s,o.content)}return Ce.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var Cc,Ic,Bn,Ms=d(()=>{"use strict";Cc=require("node:child_process"),Ic=g(require("node:fs"));Xt();k();Bn=(e=v())=>{let t=ns(e);if(!Ic.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!pe())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=We(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,Cc.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var Hs,se,Hv,Wt=d(()=>{"use strict";k();Hs="connection-health.json",se=12e4,Hv=`${me()}-watchdog`});var Pc,qe,Ds,Ey,Wy,Ly,Nc,Ry,Oc,Gn,Vn=d(()=>{"use strict";Pc=require("node:crypto"),qe=g(require("node:fs")),Ds=g(require("node:path"));k();Ey="watchdog-log.ndjson",Wy=200,Ly=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nc=(e=v())=>{let t=R(),r=t.installDir===e?t.logsDir:ln({installDir:e,profileEmail:t.profileEmail});return Ds.default.join(r,Ey)},Ry=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Ly(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Oc=(e,t=v())=>{let r={id:(0,Pc.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=Nc(t);qe.default.mkdirSync(Ds.default.dirname(n),{recursive:!0});let o=qe.default.existsSync(n)?qe.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Wy+1)),JSON.stringify(r)];return qe.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Gn=(e=20,t=v())=>{let r=Nc(t);if(!qe.default.existsSync(r))return[];let n=qe.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=Ry(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var fr,zn,ky,Mc,Z,Fs,ae,hr=d(()=>{"use strict";fr=g(require("node:fs")),zn=g(require("node:path"));Wt();ky=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mc=e=>e.profileEmail===null?zn.default.join(e.installDir,Hs):zn.default.join(e.installDir,"profiles",e.profileEmail,Hs),Z=e=>{let t=Mc(e);if(!fr.default.existsSync(t))return null;try{let r=JSON.parse(fr.default.readFileSync(t,"utf8"));return!ky(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},Fs=(e,t)=>{let r=Mc(e),n=Z(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};fr.default.mkdirSync(zn.default.dirname(r),{recursive:!0}),fr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ae=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Hc,Dc,xy,yr,Us=d(()=>{"use strict";Hc=require("node:child_process"),Dc=require("node:util"),xy=(0,Dc.promisify)(Hc.execFile),yr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await xy("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Fc,js=d(()=>{"use strict";Fc="watchdog-reinstall-state.json"});var Uc={};Fe(Uc,{verifyAgentWitchReviveAfterKickstart:()=>Iy});var Cy,Iy,jc=d(()=>{"use strict";js();hr();Us();k();Cy=e=>new Promise(t=>{setTimeout(t,e)}),Iy=async e=>{if(await Cy(e.verifyDelayMs??3e3),!await yr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?R():R(e.profileEmail),n=Z(r);return!ae(n,e.staleAfterMs)}});var Ar,$s,Ny,$c,Oy,Bc,Gc,Vc=d(()=>{"use strict";Ar=g(require("node:fs")),$s=g(require("node:path"));js();k();Ny=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$c=e=>$s.default.join(e,Fc),Oy=(e=v())=>{let t=$c(e);if(!Ar.default.existsSync(t))return null;try{let r=JSON.parse(Ar.default.readFileSync(t,"utf8"));return!Ny(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Bc=(e=v(),t=Date.now())=>{let r=Oy(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},Gc=(e=v(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=$c(e);return Ar.default.mkdirSync($s.default.dirname(n),{recursive:!0}),Ar.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var zc,Lt,Kc,qc,Jc,My,Hy,Yc,Dy,Fy,Xc,Zc=d(()=>{"use strict";zc=require("node:child_process"),Lt=g(require("node:fs")),Kc=g(require("node:os")),qc=g(require("node:path")),Jc=require("node:util");Be();ht();k();My=(0,Jc.promisify)(zc.execFile),Hy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yc=e=>{let t=We(e),r=t===null?R():R(t);if(!Lt.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Lt.default.readFileSync(r.configPath,"utf8"));return!Hy(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},Dy=e=>Yc(e)?.wsUrl??null,Fy=e=>{let t=Dy(e);return t!==null?Y(t):G(e)?.appOrigin??null},Xc=async e=>{let t=e?.installDir??v(),r=Yc(t),n=r!==null?Y(r.wsUrl):Fy(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let a=qc.default.join(Kc.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Lt.default.writeFileSync(a,await s.text(),{encoding:"utf8",mode:448});let i=e?.profileEmail??We(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...i===null?{}:{AGENT_WITCH_PROFILE:i}};return await My("bash",[a],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Agent Witch reinstall script failed."}}finally{Lt.default.existsSync(a)&&Lt.default.unlinkSync(a)}}});var Qc={};Fe(Qc,{attemptAgentWitchWatchdogReinstall:()=>Uy});var Uy,ed=d(()=>{"use strict";Vc();or();Zc();Uy=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!Bc())return{attempted:!1,ok:!1,targets:e};Gc();let r=await Xc();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await Le(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var td,rd,nd,jy,$y,By,Bs,Gs=d(()=>{"use strict";Xt();Wt();hr();Us();or();je();k();Ms();Vn();td=e=>e===null?R():R(e),rd=async(e,t,r)=>{if(!await yr(e))return"not_running";let o=td(t),s=Z(o);return ae(s,r)?"stale_connection":"healthy"},nd=async e=>{let t=e?.staleAfterMs??se,r=v(),n=B(r);return Promise.all(n.map(async o=>{let s=await rd(o.launchAgentLabel,o.profileEmail,t),a=td(o.profileEmail),i=Z(a),c=await yr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:i,isConnectionStale:ae(i,t),needsRevive:s!=="healthy",reason:s}}))},jy=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},$y=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",By=async e=>{let t=await Le(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(jc(),Uc)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Bs=async e=>{if(!pe())return{ok:!0,targets:[]};let t=e?.staleAfterMs??se,r=v(),n=B(r),o=[];for(let u of n){let y=await rd(u.launchAgentLabel,u.profileEmail,t);if(y==="healthy"){o.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:y});continue}o.push(await By({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:y,staleAfterMs:t}))}if(o.length===0){let u=Bn();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,a=!1,i,c=o;if(o.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(ed(),Qc)),y=await u(o);s=y.attempted,a=y.ok,i=y.errorMessage,c=[...y.targets]}catch(u){s=!0,a=!1,i=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let m={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:a,...i!==void 0?{reinstallErrorMessage:i}:{}}:{}};return e?.skipLog!==!0&&Oc({event:$y(c,m.ok,{reinstallAttempted:s,reinstallOk:a}),ok:m.ok,message:jy(c,{reinstallAttempted:s,reinstallOk:a,reinstallErrorMessage:i}),targets:c}),m}});var od,sd,ad=d(()=>{"use strict";od=g(require("node:os"));Wt();Vn();Gs();sd=async()=>{let e=await nd(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:od.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:se,healthyProfileCount:t,profiles:e,lastLog:Gn(1)[0]??null}}});var id={};Fe(id,{buildAgentWitchAutomationStatusFromWakeServer:()=>qs,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>ta,buildAgentWitchWakeHealthResponse:()=>Js,buildAgentWitchWakeIdentityResponse:()=>Ys,buildAgentWitchWatchdogStatus:()=>Zs,installHarnessFromWakeServer:()=>qn,readAgentWitchSelfUpdateLogEntries:()=>Yn,readAgentWitchWatchdogLogEntries:()=>Jn,restartAgentWitchFromWakeServer:()=>ea,reviveAgentWitchWebSocketFromWakeServer:()=>Qs,runAgentWitchSelfUpdateFromWakeServer:()=>ra,runAgentWitchUninstallLocalFromWakeServer:()=>na,runAutomationFromWakeServer:()=>Ks,syncAutomationsFromWakeServer:()=>zs,wakeAgentWitchLaunchAgents:()=>Xs});var Kn,Vs,qn,zs,Ks,qs,Js,Ys,Xs,Jn,Zs,Qs,ea,ta,Yn,ra,na,oa=d(()=>{"use strict";ws();Hn();cr();Is();Ke();Kn=g(require("node:os"));Ps();vt();or();je();bc();Lc();Tc();Ms();ad();Vn();At();un();gs();Gs();Vs=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qn=e=>{if(!Vs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Wc(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!pr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=xc({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},zs=e=>{if(!Vs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!pr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Cn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Ks=async e=>{if(!Vs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:pr(t)?wt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},qs=()=>{let e=U(),t=e!==null?xe(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Kn.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},Js=()=>{let e=B();return{ok:!0,port:X(),hostname:Kn.default.hostname(),profileCount:e.length}},Ys=()=>{let e=B(),t=U()?.pairingToken.trim()??"",r=t.length>0?mr(t):null,n=_c();return{hostname:Kn.default.hostname(),port:X(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Xs=async()=>{let e=B(),t=[];for(let r of e){let n=await Le(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Bn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Jn=(e=20)=>Gn(e),Zs=sd,Qs=Bs,ea=Bs,ta=ys,Yn=(e=20)=>Wn(e),ra=e=>hs(e),na=()=>ol()});var ge=$((D0,dd)=>{"use strict";var ld=["nodebuffer","arraybuffer","fragments"],cd=typeof Blob<"u";cd&&ld.push("blob");dd.exports={BINARY_TYPES:ld,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:cd,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Sr=$((F0,Xn)=>{"use strict";var{EMPTY_BUFFER:Gy}=ge(),sa=Buffer[Symbol.species];function Vy(e,t){if(e.length===0)return Gy;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new sa(r.buffer,r.byteOffset,n):r}function ud(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function md(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function zy(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function aa(e){if(aa.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new sa(e):ArrayBuffer.isView(e)?t=new sa(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),aa.readOnly=!1),t}Xn.exports={concat:Vy,mask:ud,toArrayBuffer:zy,toBuffer:aa,unmask:md};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Xn.exports.mask=function(t,r,n,o,s){s<48?ud(t,r,n,o,s):e.mask(t,r,n,o,s)},Xn.exports.unmask=function(t,r){t.length<32?md(t,r):e.unmask(t,r)}}catch{}});var fd=$((U0,gd)=>{"use strict";var pd=Symbol("kDone"),ia=Symbol("kRun"),la=class{constructor(t){this[pd]=()=>{this.pending--,this[ia]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[ia]()}[ia](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[pd])}}};gd.exports=la});var xt=$((j0,Sd)=>{"use strict";var _r=require("zlib"),hd=Sr(),Ky=fd(),{kStatusCode:yd}=ge(),qy=Buffer[Symbol.species],Jy=Buffer.from([0,0,255,255]),Qn=Symbol("permessage-deflate"),fe=Symbol("total-length"),Rt=Symbol("callback"),Ie=Symbol("buffers"),kt=Symbol("error"),Zn,ca=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Zn){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Zn=new Ky(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Rt];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Zn.add(o=>{this._decompress(t,r,(s,a)=>{o(),n(s,a)})})}compress(t,r,n){Zn.add(o=>{this._compress(t,r,(s,a)=>{o(),n(s,a)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?_r.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=_r.createInflateRaw({...this._options.zlibInflateOptions,windowBits:a}),this._inflate[Qn]=this,this._inflate[fe]=0,this._inflate[Ie]=[],this._inflate.on("error",Xy),this._inflate.on("data",Ad)}this._inflate[Rt]=n,this._inflate.write(t),r&&this._inflate.write(Jy),this._inflate.flush(()=>{let s=this._inflate[kt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let a=hd.concat(this._inflate[Ie],this._inflate[fe]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[fe]=0,this._inflate[Ie]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,a)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?_r.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=_r.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:a}),this._deflate[fe]=0,this._deflate[Ie]=[],this._deflate.on("data",Yy)}this._deflate[Rt]=n,this._deflate.write(t),this._deflate.flush(_r.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=hd.concat(this._deflate[Ie],this._deflate[fe]);r&&(s=new qy(s.buffer,s.byteOffset,s.length-4)),this._deflate[Rt]=null,this._deflate[fe]=0,this._deflate[Ie]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};Sd.exports=ca;function Yy(e){this[Ie].push(e),this[fe]+=e.length}function Ad(e){if(this[fe]+=e.length,this[Qn]._maxPayload<1||this[fe]<=this[Qn]._maxPayload){this[Ie].push(e);return}this[kt]=new RangeError("Max payload size exceeded"),this[kt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[kt][yd]=1009,this.removeListener("data",Ad),this.reset()}function Xy(e){if(this[Qn]._inflate=null,this[kt]){this[Rt](this[kt]);return}e[yd]=1007,this[Rt](e)}});var Tt=$(($0,eo)=>{"use strict";var{isUtf8:_d}=require("buffer"),{hasBlob:Zy}=ge(),Qy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function eA(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function da(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function tA(e){return Zy&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}eo.exports={isBlob:tA,isValidStatusCode:eA,isValidUTF8:da,tokenChars:Qy};if(_d)eo.exports.isValidUTF8=function(e){return e.length<24?da(e):_d(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");eo.exports.isValidUTF8=function(t){return t.length<32?da(t):e(t)}}catch{}});var fa=$((B0,Rd)=>{"use strict";var{Writable:rA}=require("stream"),bd=xt(),{BINARY_TYPES:nA,EMPTY_BUFFER:wd,kStatusCode:oA,kWebSocket:sA}=ge(),{concat:ua,toArrayBuffer:aA,unmask:iA}=Sr(),{isValidStatusCode:lA,isValidUTF8:vd}=Tt(),to=Buffer[Symbol.species],z=0,Ed=1,Wd=2,Ld=3,ma=4,pa=5,ro=6,ga=class extends rA{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||nA[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[sA]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=z}_write(t,r,n){if(this._opcode===8&&this._state==z)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new to(n.buffer,n.byteOffset+t,n.length-t),new to(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new to(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case z:this.getInfo(t);break;case Ed:this.getPayloadLength16(t);break;case Wd:this.getPayloadLength64(t);break;case Ld:this.getMask();break;case ma:this.getData(t);break;case pa:case ro:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[bd.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Ed:this._payloadLength===127?this._state=Wd:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Ld:this._state=ma}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=ma}getData(t){let r=wd;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&iA(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=pa,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[bd.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let a=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(a);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let a=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(a);return}this._fragments.push(s)}this.dataMessage(r),this._state===z&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=z;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=ua(n,r):this._binaryType==="arraybuffer"?o=aA(ua(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=z):(this._state=ro,setImmediate(()=>{this.emit("message",o,!0),this._state=z,this.startLoop(t)}))}else{let o=ua(n,r);if(!this._skipUTF8Validation&&!vd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===pa||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=z):(this._state=ro,setImmediate(()=>{this.emit("message",o,!1),this._state=z,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,wd),this.end();else{let n=t.readUInt16BE(0);if(!lA(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new to(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!vd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=z;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=z):(this._state=ro,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=z,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let a=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(a,this.createError),a.code=s,a[oA]=o,a}};Rd.exports=ga});var Aa=$((V0,Td)=>{"use strict";var{Duplex:G0}=require("stream"),{randomFillSync:cA}=require("crypto"),{types:{isUint8Array:dA}}=require("util"),kd=xt(),{EMPTY_BUFFER:uA,kWebSocket:mA,NOOP:pA}=ge(),{isBlob:Ct,isValidStatusCode:gA}=Tt(),{mask:xd,toBuffer:Je}=Sr(),K=Symbol("kByteLength"),fA=Buffer.alloc(4),no=8*1024,Ye,It=no,Q=0,hA=1,yA=2,ha=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Q,this.onerror=pA,this[mA]=void 0}static frame(t,r){let n,o=!1,s=2,a=!1;r.mask&&(n=r.maskBuffer||fA,r.generateMask?r.generateMask(n):(It===no&&(Ye===void 0&&(Ye=Buffer.alloc(no)),cA(Ye,0,no),It=0),n[0]=Ye[It++],n[1]=Ye[It++],n[2]=Ye[It++],n[3]=Ye[It++]),a=(n[0]|n[1]|n[2]|n[3])===0,s=6);let i;typeof t=="string"?(!r.mask||a)&&r[K]!==void 0?i=r[K]:(t=Buffer.from(t),i=t.length):(i=t.length,o=r.mask&&r.readOnly&&!a);let c=i;i>=65536?(s+=8,c=127):i>125&&(s+=2,c=126);let m=Buffer.allocUnsafe(o?i+s:s);return m[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(m[0]|=64),m[1]=c,c===126?m.writeUInt16BE(i,2):c===127&&(m[2]=m[3]=0,m.writeUIntBE(i,4,6)),r.mask?(m[1]|=128,m[s-4]=n[0],m[s-3]=n[1],m[s-2]=n[2],m[s-1]=n[3],a?[m,t]:o?(xd(t,n,m,s,i),[m]):(xd(t,n,t,0,i),[m,t])):[m,t]}close(t,r,n,o){let s;if(t===void 0)s=uA;else{if(typeof t!="number"||!gA(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let i=Buffer.byteLength(r);if(i>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+i),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(dA(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let a={[K]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Q?this.enqueue([this.dispatch,s,!1,a,o]):this.sendFrame(e.frame(s,a),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Ct(t)?(o=t.size,s=!1):(t=Je(t),o=t.length,s=Je.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[K]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Ct(t)?this._state!==Q?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==Q?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Ct(t)?(o=t.size,s=!1):(t=Je(t),o=t.length,s=Je.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[K]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Ct(t)?this._state!==Q?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==Q?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}send(t,r,n){let o=this._extensions[kd.extensionName],s=r.binary?2:1,a=r.compress,i,c;typeof t=="string"?(i=Buffer.byteLength(t),c=!1):Ct(t)?(i=t.size,c=!1):(t=Je(t),i=t.length,c=Je.readOnly),this._firstFragment?(this._firstFragment=!1,a&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(a=i>=o._threshold),this._compress=a):(a=!1,s=0),r.fin&&(this._firstFragment=!0);let m={[K]:i,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:a};Ct(t)?this._state!==Q?this.enqueue([this.getBlobData,t,this._compress,m,n]):this.getBlobData(t,this._compress,m,n):this._state!==Q?this.enqueue([this.dispatch,t,this._compress,m,n]):this.dispatch(t,this._compress,m,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[K],this._state=yA,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let i=new Error("The socket was closed while the blob was being read");process.nextTick(ya,this,i,o);return}this._bufferedBytes-=n[K];let a=Je(s);r?this.dispatch(a,r,n,o):(this._state=Q,this.sendFrame(e.frame(a,n),o),this.dequeue())}).catch(s=>{process.nextTick(AA,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[kd.extensionName];this._bufferedBytes+=n[K],this._state=hA,s.compress(t,n.fin,(a,i)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");ya(this,c,o);return}this._bufferedBytes-=n[K],this._state=Q,n.readOnly=!1,this.sendFrame(e.frame(i,n),o),this.dequeue()})}dequeue(){for(;this._state===Q&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][K],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][K],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Td.exports=ha;function ya(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function AA(e,t,r){ya(e,t,r),e.onerror(t)}});var Fd=$((z0,Dd)=>{"use strict";var{kForOnEventAttribute:br,kListener:Sa}=ge(),Cd=Symbol("kCode"),Id=Symbol("kData"),Pd=Symbol("kError"),Nd=Symbol("kMessage"),Od=Symbol("kReason"),Pt=Symbol("kTarget"),Md=Symbol("kType"),Hd=Symbol("kWasClean"),he=class{constructor(t){this[Pt]=null,this[Md]=t}get target(){return this[Pt]}get type(){return this[Md]}};Object.defineProperty(he.prototype,"target",{enumerable:!0});Object.defineProperty(he.prototype,"type",{enumerable:!0});var Xe=class extends he{constructor(t,r={}){super(t),this[Cd]=r.code===void 0?0:r.code,this[Od]=r.reason===void 0?"":r.reason,this[Hd]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Cd]}get reason(){return this[Od]}get wasClean(){return this[Hd]}};Object.defineProperty(Xe.prototype,"code",{enumerable:!0});Object.defineProperty(Xe.prototype,"reason",{enumerable:!0});Object.defineProperty(Xe.prototype,"wasClean",{enumerable:!0});var Nt=class extends he{constructor(t,r={}){super(t),this[Pd]=r.error===void 0?null:r.error,this[Nd]=r.message===void 0?"":r.message}get error(){return this[Pd]}get message(){return this[Nd]}};Object.defineProperty(Nt.prototype,"error",{enumerable:!0});Object.defineProperty(Nt.prototype,"message",{enumerable:!0});var wr=class extends he{constructor(t,r={}){super(t),this[Id]=r.data===void 0?null:r.data}get data(){return this[Id]}};Object.defineProperty(wr.prototype,"data",{enumerable:!0});var SA={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[br]&&o[Sa]===t&&!o[br])return;let n;if(e==="message")n=function(s,a){let i=new wr("message",{data:a?s:s.toString()});i[Pt]=this,oo(t,this,i)};else if(e==="close")n=function(s,a){let i=new Xe("close",{code:s,reason:a.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});i[Pt]=this,oo(t,this,i)};else if(e==="error")n=function(s){let a=new Nt("error",{error:s,message:s.message});a[Pt]=this,oo(t,this,a)};else if(e==="open")n=function(){let s=new he("open");s[Pt]=this,oo(t,this,s)};else return;n[br]=!!r[br],n[Sa]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Sa]===t&&!r[br]){this.removeListener(e,r);break}}};Dd.exports={CloseEvent:Xe,ErrorEvent:Nt,Event:he,EventTarget:SA,MessageEvent:wr};function oo(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var so=$((K0,Ud)=>{"use strict";var{tokenChars:vr}=Tt();function ie(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function _A(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,a,i,c=-1,m=-1,u=-1,y=0;for(;y<e.length;y++)if(m=e.charCodeAt(y),a===void 0)if(u===-1&&vr[m]===1)c===-1&&(c=y);else if(y!==0&&(m===32||m===9))u===-1&&c!==-1&&(u=y);else if(m===59||m===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);u===-1&&(u=y);let A=e.slice(c,u);m===44?(ie(t,A,r),r=Object.create(null)):a=A,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);else if(i===void 0)if(u===-1&&vr[m]===1)c===-1&&(c=y);else if(m===32||m===9)u===-1&&c!==-1&&(u=y);else if(m===59||m===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);u===-1&&(u=y),ie(r,e.slice(c,u),!0),m===44&&(ie(t,a,r),r=Object.create(null),a=void 0),c=u=-1}else if(m===61&&c!==-1&&u===-1)i=e.slice(c,y),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(o){if(vr[m]!==1)throw new SyntaxError(`Unexpected character at index ${y}`);c===-1?c=y:n||(n=!0),o=!1}else if(s)if(vr[m]===1)c===-1&&(c=y);else if(m===34&&c!==-1)s=!1,u=y;else if(m===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${y}`);else if(m===34&&e.charCodeAt(y-1)===61)s=!0;else if(u===-1&&vr[m]===1)c===-1&&(c=y);else if(c!==-1&&(m===32||m===9))u===-1&&(u=y);else if(m===59||m===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${y}`);u===-1&&(u=y);let A=e.slice(c,u);n&&(A=A.replace(/\\/g,""),n=!1),ie(r,i,A),m===44&&(ie(t,a,r),r=Object.create(null),a=void 0),i=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${y}`);if(c===-1||s||m===32||m===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=y);let w=e.slice(c,u);return a===void 0?ie(t,w,r):(i===void 0?ie(r,w,!0):n?ie(r,i,w.replace(/\\/g,"")):ie(r,i,w),ie(t,a,r)),t}function bA(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(a=>a===!0?o:`${o}=${a}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Ud.exports={format:bA,parse:_A}});var co=$((Y0,Zd)=>{"use strict";var wA=require("events"),vA=require("https"),EA=require("http"),Bd=require("net"),WA=require("tls"),{randomBytes:LA,createHash:RA}=require("crypto"),{Duplex:q0,Readable:J0}=require("stream"),{URL:_a}=require("url"),Pe=xt(),kA=fa(),xA=Aa(),{isBlob:TA}=Tt(),{BINARY_TYPES:jd,CLOSE_TIMEOUT:CA,EMPTY_BUFFER:ao,GUID:IA,kForOnEventAttribute:ba,kListener:PA,kStatusCode:NA,kWebSocket:O,NOOP:Gd}=ge(),{EventTarget:{addEventListener:OA,removeEventListener:MA}}=Fd(),{format:HA,parse:DA}=so(),{toBuffer:FA}=Sr(),Vd=Symbol("kAborted"),wa=[8,13],ye=["CONNECTING","OPEN","CLOSING","CLOSED"],UA=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,T=class e extends wA{constructor(t,r,n){super(),this._binaryType=jd[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=ao,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),zd(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){jd.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new kA({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new xA(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[O]=this,s[O]=this,t[O]=this,o.on("conclude",BA),o.on("drain",GA),o.on("error",VA),o.on("message",zA),o.on("ping",KA),o.on("pong",qA),s.onerror=JA,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",Jd),t.on("data",lo),t.on("end",Yd),t.on("error",Xd),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Pe.extensionName]&&this._extensions[Pe.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){V(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),qd(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){va(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||ao,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){va(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||ao,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){va(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Pe.extensionName]||(o.compress=!1),this._sender.send(t||ao,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){V(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(T,"CONNECTING",{enumerable:!0,value:ye.indexOf("CONNECTING")});Object.defineProperty(T.prototype,"CONNECTING",{enumerable:!0,value:ye.indexOf("CONNECTING")});Object.defineProperty(T,"OPEN",{enumerable:!0,value:ye.indexOf("OPEN")});Object.defineProperty(T.prototype,"OPEN",{enumerable:!0,value:ye.indexOf("OPEN")});Object.defineProperty(T,"CLOSING",{enumerable:!0,value:ye.indexOf("CLOSING")});Object.defineProperty(T.prototype,"CLOSING",{enumerable:!0,value:ye.indexOf("CLOSING")});Object.defineProperty(T,"CLOSED",{enumerable:!0,value:ye.indexOf("CLOSED")});Object.defineProperty(T.prototype,"CLOSED",{enumerable:!0,value:ye.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(T.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(T.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[ba])return t[PA];return null},set(t){for(let r of this.listeners(e))if(r[ba]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[ba]:!0})}})});T.prototype.addEventListener=OA;T.prototype.removeEventListener=MA;Zd.exports=T;function zd(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:CA,protocolVersion:wa[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!wa.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${wa.join(", ")})`);let s;if(t instanceof _a)s=t;else try{s=new _a(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let a=s.protocol==="wss:",i=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!a&&!i?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:i&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;io(e,l);return}let m=a?443:80,u=LA(16).toString("base64"),y=a?vA.request:EA.request,w=new Set,A;if(o.createConnection=o.createConnection||(a?$A:jA),o.defaultPort=o.defaultPort||m,o.port=s.port||m,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(A=new Pe({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=HA({[Pe.extensionName]:A.offer()})),r.length){for(let l of r){if(typeof l!="string"||!UA.test(l)||w.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");w.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),i){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let f;if(o.followRedirects){if(e._redirects===0){e._originalIpc=i,e._originalSecure=a,e._originalHostOrSocketPath=i?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[S,h]of Object.entries(l))n.headers[S.toLowerCase()]=h}else if(e.listenerCount("redirect")===0){let l=i?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!a)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),f=e._req=y(o),e._redirects&&e.emit("redirect",e.url,f)}else f=e._req=y(o);o.timeout&&f.on("timeout",()=>{V(e,f,"Opening handshake has timed out")}),f.on("error",l=>{f===null||f[Vd]||(f=e._req=null,io(e,l))}),f.on("response",l=>{let S=l.headers.location,h=l.statusCode;if(S&&o.followRedirects&&h>=300&&h<400){if(++e._redirects>o.maxRedirects){V(e,f,"Maximum redirects exceeded");return}f.abort();let p;try{p=new _a(S,t)}catch{let b=new SyntaxError(`Invalid URL: ${S}`);io(e,b);return}zd(e,p,r,n)}else e.emit("unexpected-response",f,l)||V(e,f,`Unexpected server response: ${l.statusCode}`)}),f.on("upgrade",(l,S,h)=>{if(e.emit("upgrade",l),e.readyState!==T.CONNECTING)return;f=e._req=null;let p=l.headers.upgrade;if(p===void 0||p.toLowerCase()!=="websocket"){V(e,S,"Invalid Upgrade header");return}let _=RA("sha1").update(u+IA).digest("base64");if(l.headers["sec-websocket-accept"]!==_){V(e,S,"Invalid Sec-WebSocket-Accept header");return}let b=l.headers["sec-websocket-protocol"],E;if(b!==void 0?w.size?w.has(b)||(E="Server sent an invalid subprotocol"):E="Server sent a subprotocol but none was requested":w.size&&(E="Server sent no subprotocol"),E){V(e,S,E);return}b&&(e._protocol=b);let L=l.headers["sec-websocket-extensions"];if(L!==void 0){if(!A){V(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let x;try{x=DA(L)}catch{V(e,S,"Invalid Sec-WebSocket-Extensions header");return}let re=Object.keys(x);if(re.length!==1||re[0]!==Pe.extensionName){V(e,S,"Server indicated an extension that was not requested");return}try{A.accept(x[Pe.extensionName])}catch{V(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Pe.extensionName]=A}e.setSocket(S,h,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(f,e):f.end()}function io(e,t){e._readyState=T.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function jA(e){return e.path=e.socketPath,Bd.connect(e)}function $A(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Bd.isIP(e.host)?"":e.host),WA.connect(e)}function V(e,t,r){e._readyState=T.CLOSING;let n=new Error(r);Error.captureStackTrace(n,V),t.setHeader?(t[Vd]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(io,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function va(e,t,r){if(t){let n=TA(t)?t.size:FA(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${ye[e.readyState]})`);process.nextTick(r,n)}}function BA(e,t){let r=this[O];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[O]!==void 0&&(r._socket.removeListener("data",lo),process.nextTick(Kd,r._socket),e===1005?r.close():r.close(e,t))}function GA(){let e=this[O];e.isPaused||e._socket.resume()}function VA(e){let t=this[O];t._socket[O]!==void 0&&(t._socket.removeListener("data",lo),process.nextTick(Kd,t._socket),t.close(e[NA])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function $d(){this[O].emitClose()}function zA(e,t){this[O].emit("message",e,t)}function KA(e){let t=this[O];t._autoPong&&t.pong(e,!this._isServer,Gd),t.emit("ping",e)}function qA(e){this[O].emit("pong",e)}function Kd(e){e.resume()}function JA(e){let t=this[O];t.readyState!==T.CLOSED&&(t.readyState===T.OPEN&&(t._readyState=T.CLOSING,qd(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function qd(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function Jd(){let e=this[O];if(this.removeListener("close",Jd),this.removeListener("data",lo),this.removeListener("end",Yd),e._readyState=T.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[O]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",$d),e._receiver.on("finish",$d))}function lo(e){this[O]._receiver.write(e)||this.pause()}function Yd(){let e=this[O];e._readyState=T.CLOSING,e._receiver.end(),this.end()}function Xd(){let e=this[O];this.removeListener("error",Xd),this.on("error",Gd),e&&(e._readyState=T.CLOSING,this.destroy())}});var ru=$((Z0,tu)=>{"use strict";var X0=co(),{Duplex:YA}=require("stream");function Qd(e){e.emit("close")}function XA(){!this.destroyed&&this._writableState.finished&&this.destroy()}function eu(e){this.removeListener("error",eu),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function ZA(e,t){let r=!0,n=new YA({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,a){let i=!a&&n._readableState.objectMode?s.toString():s;n.push(i)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(Qd,n);return}let a=!1;e.once("error",function(c){a=!0,s(c)}),e.once("close",function(){a||s(o),process.nextTick(Qd,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,a){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,a)});return}e.send(o,a)},n.on("end",XA),n.on("error",eu),n}tu.exports=ZA});var Ea=$((Q0,nu)=>{"use strict";var{tokenChars:QA}=Tt();function eS(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let a=e.charCodeAt(o);if(n===-1&&QA[a]===1)r===-1&&(r=o);else if(o!==0&&(a===32||a===9))n===-1&&r!==-1&&(n=o);else if(a===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let i=e.slice(r,n);if(t.has(i))throw new SyntaxError(`The "${i}" subprotocol is duplicated`);t.add(i),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}nu.exports={parse:eS}});var du=$((tE,cu)=>{"use strict";var tS=require("events"),uo=require("http"),{Duplex:eE}=require("stream"),{createHash:rS}=require("crypto"),ou=so(),Ze=xt(),nS=Ea(),oS=co(),{CLOSE_TIMEOUT:sS,GUID:aS,kWebSocket:iS}=ge(),lS=/^[+/0-9A-Za-z]{22}==$/,su=0,au=1,lu=2,Wa=class extends tS{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:sS,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:oS,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=uo.createServer((n,o)=>{let s=uo.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=cS(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,a)=>{this.handleUpgrade(o,s,a,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=su}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===lu){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Er,this);return}if(t&&this.once("close",t),this._state!==au)if(this._state=au,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Er,this):process.nextTick(Er,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Er(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",iu);let s=t.headers["sec-websocket-key"],a=t.headers.upgrade,i=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Qe(this,t,r,405,"Invalid HTTP method");return}if(a===void 0||a.toLowerCase()!=="websocket"){Qe(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!lS.test(s)){Qe(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(i!==13&&i!==8){Qe(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Wr(r,400);return}let c=t.headers["sec-websocket-protocol"],m=new Set;if(c!==void 0)try{m=nS.parse(c)}catch{Qe(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],y={};if(this.options.perMessageDeflate&&u!==void 0){let w=new Ze({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let A=ou.parse(u);A[Ze.extensionName]&&(w.accept(A[Ze.extensionName]),y[Ze.extensionName]=w)}catch{Qe(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let w={origin:t.headers[`${i===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(w,(A,f,l,S)=>{if(!A)return Wr(r,f||401,l,S);this.completeUpgrade(y,s,m,t,r,n,o)});return}if(!this.options.verifyClient(w))return Wr(r,401)}this.completeUpgrade(y,s,m,t,r,n,o)}completeUpgrade(t,r,n,o,s,a,i){if(!s.readable||!s.writable)return s.destroy();if(s[iS])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>su)return Wr(s,503);let m=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${rS("sha1").update(r+aS).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(n.size){let y=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;y&&(m.push(`Sec-WebSocket-Protocol: ${y}`),u._protocol=y)}if(t[Ze.extensionName]){let y=t[Ze.extensionName].params,w=ou.format({[Ze.extensionName]:[y]});m.push(`Sec-WebSocket-Extensions: ${w}`),u._extensions=t}this.emit("headers",m,o),s.write(m.concat(`\r
`).join(`\r
`)),s.removeListener("error",iu),u.setSocket(s,a,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Er,this)})),i(u,o)}};cu.exports=Wa;function cS(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Er(e){e._state=lu,e.emit("close")}function iu(){this.destroy()}function Wr(e,t,r,n){r=r||uo.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${uo.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Qe(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let a=new Error(o);Error.captureStackTrace(a,Qe),e.emit("wsClientError",a,r,t)}else Wr(r,n,o,s)}});var dS,uS,mS,pS,gS,fS,uu,hS,Lr,mu=d(()=>{dS=g(ru(),1),uS=g(so(),1),mS=g(xt(),1),pS=g(fa(),1),gS=g(Aa(),1),fS=g(Ea(),1),uu=g(co(),1),hS=g(du(),1),Lr=uu.default});var La=d(()=>{"use strict"});var Ae,Rr=d(()=>{"use strict";Ae=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Ot,et,pu,AS,Ra,ka,gu,fu,hu,yu,xa,Ta=d(()=>{"use strict";Ot=g(require("node:fs")),et=g(require("node:os")),pu=g(require("node:path"));La();Rr();AS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ra=(e=et.default.hostname())=>pu.default.join(et.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),ka=e=>{if(!Ot.default.existsSync(e))return null;try{let t=JSON.parse(Ot.default.readFileSync(e,"utf8"));return!AS(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},gu=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},fu=(e,t)=>{Ot.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},hu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Ra(),n=ka(r);if(n!==null&&n.pid!==process.pid&&Ae(n.pid)&&gu(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:et.default.hostname(),macOsUsername:et.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return fu(r,o),{ok:!0}},yu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Ra(),n=ka(r);return n!==null&&n.pid!==process.pid&&Ae(n.pid)&&gu(n)?{ok:!1}:(fu(r,{hostname:et.default.hostname(),macOsUsername:et.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},xa=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Ra();ka(r)?.pid===process.pid&&Ot.default.existsSync(r)&&Ot.default.unlinkSync(r)}});var Ca,kr,SS,_S,bS,wS,Au,Su=d(()=>{"use strict";Ca=require("node:child_process"),kr=g(require("node:path"));Rr();ct();SS=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),_S=(e,t)=>{if(SS(e)||!/\bnode\b/.test(e))return!1;let r=kr.default.resolve(t),n=kr.default.join(r,"app",de),o=kr.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(a=>a.length>0).some(a=>{if(a===de||a==="agent-witch.ts")return e.includes(r);try{let i=kr.default.resolve(a);return i===n||i===o}catch{return a===n||a===o}})},bS=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,Ca.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},wS=(e,t,r)=>{let n=bS(r),o=[];for(let s of e.split(`
`)){let a=s.trim();if(a.length===0)continue;let i=/^(\d+)\s+(.+)$/.exec(a);if(i===null)continue;let c=Number.parseInt(i[1]??"",10),m=i[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||_S(m,t)&&o.push(c)}return o},Au=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Ca.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=wS(r,e.installDir,t),o=[];for(let s of n)if(Ae(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var xr,Tr,_u,vS,bu,wu=d(()=>{"use strict";xr=g(require("node:fs")),Tr=g(require("node:path"));k();_u=(e,t)=>{!xr.default.existsSync(e)||xr.default.existsSync(t)||(xr.default.mkdirSync(Tr.default.dirname(t),{recursive:!0}),xr.default.renameSync(e,t))},vS=e=>{if(e.profileEmail===null)return;let t=Tr.default.join(e.installDir,ue);_u(Tr.default.join(t,sn),e.mainLogPath),_u(Tr.default.join(t,an),e.errorLogPath)},bu=e=>{let t=R();e!==void 0&&t.installDir!==e||vS(t)}});var vu,Eu,Wu,Lu,Ru=d(()=>{"use strict";vu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Eu=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?vu(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?vu(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Wu=e=>{let t=e.watchdogLogs.map(Eu).join(""),r=e.updateLogs.map(Eu).join("");return`<!doctype html>
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
</html>`},Lu=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var ku,xu,Tu=d(()=>{"use strict";ku=g(require("node:net")),xu=()=>new Promise((e,t)=>{let r=ku.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var Cu,ES,Iu,Pu=d(()=>{"use strict";Cu=g(require("node:net"));Tu();vt();Un();k();ES=e=>new Promise(t=>{let r=Cu.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Iu=async()=>{let e=v(),t=X();if(await ES(t))return Ac(t),t;let r=await xu();return Fn(e,r),r}});var WS,Nu,Ou=d(()=>{"use strict";WS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nu=e=>({force:WS(e)&&e.force===!0})});var Ia,LS,tt,mo=d(()=>{"use strict";Ia=g(require("node:os")),LS=e=>{let t=e.trim();return t.startsWith("~/")?`${Ia.default.homedir()}${t.slice(1)}`:t==="~"?Ia.default.homedir():t},tt=LS});var rt,Ne,Cr=d(()=>{"use strict";rt=g(require("node:path"));gt();mo();Ne=e=>{let t=tt(e),r=rt.default.join(t,dl);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:rt.default.join(r,"rag"),memoryDirPath:rt.default.join(r,ul),reportsDirPath:rt.default.join(r,pl),metaFilePath:rt.default.join(r,ml),ragChunksFilePath:rt.default.join(r,"rag",fn)}}});var le,Hu,RS,kS,Se,Ir=d(()=>{"use strict";le=g(require("node:fs")),Hu=g(require("node:path"));gt();Cr();RS=(e,t)=>{if(le.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};le.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},kS=e=>{le.default.existsSync(e.ragChunksFilePath)||le.default.writeFileSync(e.ragChunksFilePath,"");let t=Hu.default.join(e.memoryDirPath,hn);le.default.existsSync(t)||le.default.writeFileSync(t,"")},Se=e=>{let t=Ne(e.projectFolderPath);return le.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),le.default.mkdirSync(t.ragDirPath,{recursive:!0}),le.default.mkdirSync(t.memoryDirPath,{recursive:!0}),RS(t,e),kS(t),{ok:!0,layout:t}}});var xS,Du,Fu=d(()=>{"use strict";Ir();xS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Du=e=>{if(!xS(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Se({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var ju,IS,Uu,I,TS,CS,Pa,$u=d(()=>{"use strict";ju=g(require("node:http"));oa();Ps();Ru();Pu();Ou();gn();Fu();wn();lt();IS={},Uu=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},I=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},TS=e=>{e.writeHead(403),e.end()},CS=async(e,t,r)=>{let n=e.headers.origin,o=gc(n);try{if(n!==void 0&&n.length>0&&!o.allowed){TS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){I(t,200,Js(),o.headers);return}if(e.method==="GET"&&s==="/identity"){I(t,200,Ys(),o.headers);return}if(e.method==="GET"&&s==="/local"){let a=Jn(50),i=Yn(50);t.writeHead(200,Lu()),t.end(Wu({port:r,watchdogLogs:a,updateLogs:i}));return}if(e.method==="GET"&&s==="/watchdog/status"){let a=await Zs();I(t,200,a,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let a=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;I(t,200,{ok:!0,logs:Jn(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let a=await Qs();I(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/restart"){let a=await ea();I(t,a.ok?200:503,a,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let a=ta();I(t,200,{ok:!0,...a},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let a=new URL(e.url??"/update/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;I(t,200,{ok:!0,logs:Yn(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let a=await Uu(e),{force:i}=Nu(a),c=await ra({force:i});I(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let a=await na();I(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/wake"){let a=await Xs();I(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let a=[];for await(let m of e)a.push(Buffer.from(m));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{I(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=qn(i);I(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let a=await Uu(e),i=Du(a);I(t,i.ok?200:400,i,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let a=[];for await(let m of e)a.push(Buffer.from(m));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{I(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=qn(i);I(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){I(t,200,qs(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let a=[];for await(let m of e)a.push(Buffer.from(m));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{I(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=zs(i);I(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let a=[];for await(let m of e)a.push(Buffer.from(m));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{I(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await Ks(i);I(t,c.ok?200:503,c,o.headers);return}I(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{I(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},Pa=async()=>{let e=await Iu(),t=ju.default.createServer((r,n)=>{CS(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!ne()&&ft(IS.url)&&(async()=>{pt("agent-witch-wake-server");let e=await Pa(),t=pn(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var Na,Bu=d(()=>{"use strict";cr();Hn();Ke();Na=async()=>{let e=U();if(e===null)return;let t=xe(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await wt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Gu,Vu=d(()=>{"use strict";La();$u();Ta();Bu();Gu=async(e={})=>{let t=await Pa();Na();let r=setInterval(()=>{Na()},6e4),n=setInterval(()=>{if(!yu().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var Pr,po,OS,zu,Ku,go,qu,Ju,Oa,Yu,fo,Xu=d(()=>{"use strict";Pr=g(require("node:fs")),po=g(require("node:path")),OS="pending-run-inputs.json",zu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ku=e=>{let t=e.profileEmail?po.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return po.default.join(t,OS)},go=e=>{let t=Ku(e);if(!Pr.default.existsSync(t))return{};try{let r=JSON.parse(Pr.default.readFileSync(t,"utf8"));return zu(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!zu(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",a=typeof o.partialOutput=="string"?o.partialOutput:"",i=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:a;return s.length===0||i.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:a,question:i,accumulatedOutput:c}]]})):{}}catch{return{}}},qu=(e,t)=>{let r=Ku(e);Pr.default.mkdirSync(po.default.dirname(r),{recursive:!0}),Pr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Ju=e=>Object.values(go(e)),Oa=(e,t)=>go(e)[t]!==void 0,Yu=(e,t)=>{let r=go(e);r[t.agentRunId]=t,qu(e,r)},fo=(e,t)=>{let r=go(e);delete r[t],qu(e,r)}});var Ma,Zu=d(()=>{"use strict";Ma={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var Ha,XE,Qu=d(()=>{"use strict";Ha={OPEN:"open",APPROVAL:"approval"},XE=Ha.APPROVAL});var Mt,ho,em,MS,tm,rm,nm,yo,om,Da=d(()=>{"use strict";Mt=g(require("node:fs")),ho=g(require("node:path")),em="runs",MS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tm=e=>{let t=e.profileEmail!==null?ho.default.join(e.installDir,"profiles",e.profileEmail,em):ho.default.join(e.installDir,em);return Mt.default.mkdirSync(t,{recursive:!0}),t},rm=(e,t)=>ho.default.join(tm(e),`${t}.json`),nm=(e,t)=>{Mt.default.writeFileSync(rm(e,t.id),JSON.stringify(t,null,2))},yo=(e,t)=>{let r=rm(e,t);if(!Mt.default.existsSync(r))return null;try{let n=JSON.parse(Mt.default.readFileSync(r,"utf8"));return!MS(n)||typeof n.id!="string"?null:n}catch{return null}},om=e=>{let t=tm(e),r=Mt.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),a=yo(e,s);a!==null&&n.push(a)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var HS,sm,am=d(()=>{"use strict";Zu();Qu();Da();HS=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?Ma.COMPLETED:Ma.FAILED,dispatchPolicy:Ha.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},sm=(e,t)=>{let r=HS(t);return nm(e,r),r}});var Nr,Ao,DS,Fa,im,lm,cm,Ua,dm=d(()=>{"use strict";Nr=g(require("node:fs")),Ao=g(require("node:path"));dr();DS="run-completion-outbox.json",Fa=e=>{let t=e.profileEmail?Ao.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ao.default.join(t,DS)},im=e=>{let t=Fa(e);if(!Nr.default.existsSync(t))return[];try{let r=JSON.parse(Nr.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},lm=(e,t)=>{Nr.default.mkdirSync(Ao.default.dirname(Fa(e)),{recursive:!0}),Nr.default.writeFileSync(Fa(e),JSON.stringify(t,null,2),"utf8")},cm=(e,t)=>{let r=[...im(e).filter(n=>n.runId!==t.runId),t];lm(e,r)},Ua=async e=>{if(e.cloudApi===null)return;let t=im(e.layout);if(t.length===0)return;let r=[];for(let n of t)await In(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);lm(e.layout,r)}});var um=d(()=>{"use strict"});var ja,Or,US,Ht,mm=d(()=>{"use strict";um();ja=new Map,Or=e=>{let t=ja.get(e);t!==void 0&&(clearInterval(t),ja.delete(e))},US=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Ht=(e,t,r,n={})=>{Or(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Or(t);return}let a=n.onTick?.()??{};US(e,t,o,a)};s(),ja.set(t,setInterval(s,15e3))}});var $a,Mr,Dt,pm,nt,gm,So=d(()=>{"use strict";$a=new Set,Mr=new Map,Dt=(e,t)=>{if(t.length===0)return;let r=Mr.get(e)??[];r.push(t),Mr.set(e,r)},pm=e=>{$a.add(e);let t=Mr.get(e)??[];return Mr.delete(e),t},nt=e=>$a.has(e),gm=e=>{$a.delete(e),Mr.delete(e)}});var fm,hm,ym,Am,j,Ft,Sm,_m,Hr,bm,wm,Ba,vm,Em,Wm,_o=d(()=>{"use strict";fm=require("node:crypto"),hm=g(require("node:fs")),ym=g(require("node:path")),Am=require("node:url");Rr();lt();Zo();j=new Map,Sm=async()=>{if(Ft!==void 0)return Ft;try{if(ne()){let e=on(),t=ym.default.join(e,"deps","node-pty","lib","index.js");if(hm.default.existsSync(t)){let r=await import((0,Am.pathToFileURL)(t).href);return Ft=r,r}}return Ft=await import("node-pty"),Ft}catch{return Ft=null,null}},_m=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},Hr=(e,t,r)=>{let n=j.get(e);if(n!==void 0){j.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},bm=(e,t)=>{let r=j.get(e);return r===void 0?!1:(r.pty.write(t),!0)},wm=(e,t,r)=>{let n=j.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Ba=e=>{for(let t of j.values())if(!(t.mode!=="agent"||t.runId!==e))return Ae(t.pty.pid);return!1},vm=e=>{for(let[t,r]of j.entries())if(!(r.mode!=="agent"||r.runId!==e)){j.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Em=async e=>{let t=await Sm();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;j.get(e.shellSessionId)!==void 0&&Hr(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let a=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${a}).\r
`},requestId:e.requestId}),!1}return j.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{_m(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{j.get(e.shellSessionId)?.pty===o&&(j.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Wm=async e=>{let t=e.shellSessionId??(0,fm.randomUUID)(),r=await Sm();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return j.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{_m(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{j.get(t)?.pty===n&&(j.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var bo,Lm,Rm=d(()=>{"use strict";bo="[[AWAITING_INPUT]]",Lm=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",bo,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Dr,km,wo=d(()=>{"use strict";Rm();Dr=e=>{let t=e.indexOf(bo);if(t<0)return null;let n=e.slice(t+bo.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},km=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Lm].join(`
`)});var xm,Tm=d(()=>{"use strict";So();_o();wo();xm=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(nt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Dt(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Wm({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let a=Dr(t.join(""));a!==null&&(r=!0,e.onInputRequired(a))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var Cm,Im,Pm,Oe,vo=d(()=>{"use strict";Cm=require("node:child_process"),Im=g(require("node:fs")),Pm=g(require("node:path"));ct();Oe=(e,t)=>{let r=Pm.default.join(e,"app",$i,"ensure-writer.sh");return Im.default.existsSync(r)?new Promise((n,o)=>{let s=(0,Cm.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",a=>{o(a)}),s.on("close",a=>{if(a===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(a??-1)}`))})}):Promise.resolve()}});var Nm,ot,Eo,Om,Mm,Ga,Hm,Va,Dm,Fm,jS,Wo,$S,BS,Um,za=d(()=>{"use strict";Nm=require("node:child_process");ze();vo();ot=new Map,Eo=e=>e==="cursor"||e==="antigravity",Om=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Mm=e=>ot.get(e)?.warmed===!0,Ga=e=>{let t=ot.get(e);ot.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Hm=e=>ot.get(e)?.conversationStarted===!0,Va=e=>{let t=ot.get(e);ot.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Dm=e=>{ot.delete(e)},Fm=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",jS={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Wo=e=>`${jS[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,$S=(e,t,r,n)=>new Promise(o=>{let s=ic(t,r),a=[],i=(0,Nm.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=m=>{let u=m.toString("utf8");a.push(u),n?.(u)};i.stdout?.on("data",c),i.stderr?.on("data",c),i.on("close",m=>{o({exitCode:m??-1,output:a.join("").trim()})}),i.on("error",m=>{o({exitCode:-1,output:m.message})})}),BS=(e,t)=>{let r=Wo(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Um=async e=>{if(!M(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Oe(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Eo(e.writerAgent)&&Ga(e.writerAgent);let t=await $S(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?BS(e.writerAgent,t.output):Wo(e.writerAgent)}}});var jm,Fr,D,Ka,$m,Bm,qa,Gm,Vm,zm,GS,_e,Lo,Ut,Km,VS,Ja,qm,Jm,Ym,Xm=d(()=>{"use strict";jm=require("node:child_process");ze();Xu();am();dm();mm();Rr();So();_o();wo();Tm();za();er();wo();Fr=new Map,D=new Map,Ka=new Set,$m=130,Bm=`

Stopped by user.`,qa=null,Gm=e=>{qa=e},Vm=async e=>{await Ua({layout:e,cloudApi:qa})},zm=e=>{let t=Fr.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Ae(t.pid)},GS=e=>Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),_e=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Lo=(e,t,r,n,o,s,a=!1)=>({awaitingInput:a,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let i=Sn(s),c=D.get(r);if(i!==null&&c!==void 0){let m=El(i),u=zm(r)||Ba(r);m!==null&&!u&&Ut(e,t,r,n,m.exitCode,m.output,c.originalPrompt)}return vl(i)}}),Ut=(e,t,r,n,o,s,a)=>{let i=o,c=s;r!==void 0&&Ka.has(r)&&(Ka.delete(r),i=$m,c=c.trim().length>0&&!c.includes("Stopped by user.")?`${c.trim()}${Bm}`:"Stopped by user."),r!==void 0&&(Or(r),nt(r)&&(_e(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),gm(r)),sm(e.layout,{agentRunId:r,originalPrompt:a,exitCode:i,output:c,layout:e.layout}),cm(e.layout,{runId:r,exitCode:i,output:c,createdAt:new Date().toISOString()}),Ua({layout:e.layout,cloudApi:qa}),D.delete(r),Fr.delete(r),fo(e.layout,r)),_e(t,{type:"command.claude.result",payload:{exitCode:i,output:c,...r!==void 0?{agentRunId:r}:{}},requestId:n})},Km=(e,t,r,n,o,s,a)=>{let i=D.get(r),c=i?.accumulatedOutput??s;Yu(e.layout,{agentRunId:r,originalPrompt:a,partialOutput:s,question:o,accumulatedOutput:c}),Ht(t,r,()=>Oa(e.layout,r),Lo(e,t,r,n,i?.projectFolderPath,i?.reportKey,!0)),_e(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},VS=(e,t,r,n,o,s,a)=>{let i=[],c=!1,m=u=>{if(!(o===void 0||u.length===0)){if(nt(o)){_e(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:u},requestId:n});return}Dt(o,u)}};if(o!==void 0){let u=D.get(o);Fr.set(o,t),D.set(o,{originalPrompt:s,writerAgent:a,projectFolderPath:u?.projectFolderPath,reportKey:u?.reportKey,accumulatedOutput:u?.accumulatedOutput??""}),_e(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Ht(r,o,()=>zm(o),Lo(e,r,o,n,u?.projectFolderPath,u?.reportKey))}t.stdout?.on("data",u=>{let y=u.toString("utf8");if(i.push(y),m(y),c||o===void 0)return;let w=Dr(i.join(""));if(w!==null){c=!0,t.kill("SIGTERM");let A=D.get(o),f=[A?.accumulatedOutput??"",w.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),Fr.delete(o),Km(e,r,o,n,w.question,f,s)}}),t.stderr?.on("data",u=>{let y=u.toString("utf8");i.push(y),m(y)}),t.on("close",u=>{if(c)return;Va(a);let y=o!==void 0?D.get(o):void 0,w=i.join("").trim(),A=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${w}`.trim():w;Ut(e,r,o,n,u??-1,A,s)}),t.on("error",u=>{c||Ut(e,r,o,n,-1,u.message,s)})},Ja=(e,t,r,n,o,s,a,i,c,m)=>{let u=_t(t,r,GS(e),a);if(u===null){Ut(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let y=()=>{let w=(0,jm.spawn)(u.command,[...u.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});VS(e,w,o,n,s,r,t)};if(s===void 0){y();return}D.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:m,accumulatedOutput:D.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&m!==void 0&&m.trim().length>0&&_n({reportKey:m,agentRunId:s,userSummary:"Task started on your Mac."}),Ht(o,s,()=>D.has(s),Lo(e,o,s,n,c,m)),xm({socket:o,sendMessage:_e,requestId:n,agentRunId:s,shellSessionId:i,command:u.command,args:u.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:w=>{i!==void 0&&Hr(i,l=>{_e(o,l)},n);let A=D.get(s),f=[A?.accumulatedOutput??"",w.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),Km(e,o,s,n,w.question,f,r)},onFinished:(w,A)=>{Va(t);let f=D.get(s),l=f!==void 0&&f.accumulatedOutput.length>0?`${f.accumulatedOutput}

${A}`.trim():A;Ut(e,o,s,n,w,l,r)}}).then(w=>{if(!w){y();return}Ht(o,s,()=>Ba(s),Lo(e,o,s,n,c,m))}).catch(w=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",w instanceof Error?w.message:w),y()})},qm=(e,t,r,n)=>{fo(e.layout,t.agentRunId),t.shellSessionId!==void 0&&_e(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=km(t),s=D.get(t.agentRunId),a=s?.writerAgent??"claude-cli",i=s?.projectFolderPath,c=s?.reportKey;Ja(e,a,o,r,n,t.agentRunId,void 0,t.shellSessionId,i,c)},Jm=(e,t)=>{for(let r of Ju(e.layout))D.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Ht(t,r.agentRunId,()=>Oa(e.layout,r.agentRunId),{awaitingInput:!0}),_e(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Ym=(e,t,r,n)=>{let o=D.get(r);if(o===void 0)return!1;Ka.add(r),Or(r);let s=Fr.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(vm(r))return!0;fo(e.layout,r);let a=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${Bm}`:"Stopped by user.";return Ut(e,t,r,n,$m,a,o.originalPrompt),!0}});var zS,Zm,Qm=d(()=>{"use strict";vt();zS=()=>`http://127.0.0.1:${X()}/restart`,Zm=async()=>{try{let e=await fetch(zS(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var st,Ya,KS,qS,Xa,at,Ro,ep,ko=d(()=>{"use strict";st=g(require("node:fs")),Ya=g(require("node:path")),KS="local-ws-traffic.ndjson",qS=500,Xa=e=>Ya.default.join(e.logsDir,KS),at=(e,t)=>{let r=Xa(e);st.default.mkdirSync(Ya.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});st.default.appendFileSync(r,`${n}
`,"utf8")},Ro=(e,t=qS)=>{let r=Xa(e);if(!st.default.existsSync(r))return[];let o=st.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let a of o)try{let i=JSON.parse(a);typeof i=="object"&&i!==null&&"at"in i&&"direction"in i&&"type"in i&&"summary"in i&&s.push(i)}catch{}return s.reverse()},ep=e=>{let t=Xa(e);st.default.existsSync(t)&&st.default.writeFileSync(t,"","utf8")}});var JS,xo,Za=d(()=>{"use strict";vt();JS=()=>`http://127.0.0.1:${X()}/update/run`,xo=async e=>{try{let t=await fetch(JS(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var tp,rp=d(()=>{"use strict";tp=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Ur,YS,np,op=d(()=>{"use strict";ko();Be();Za();rp();Ur=(e,t)=>{at(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},YS=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(At(),Rn)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},np=async e=>{let t=G(e.layout.installDir)?.bundleVersion??null;if(!tp({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Ur(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await xo({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Ur(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await YS();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Ur(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Ur(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Ur(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var XS,sp,ap=d(()=>{"use strict";XS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sp=e=>{if(!XS(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var ip,lp,cp=d(()=>{"use strict";ws();Hn();ip=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Cn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},lp=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await wt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var q,ZS,QS,e_,dp,up,mp,pp,gp,fp,hp=d(()=>{"use strict";q=require("node:crypto"),ZS=Buffer.from("302a300506032b6570032100","hex"),QS=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},e_=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,q.createPublicKey)({key:Buffer.concat([ZS,t]),format:"der",type:"spki"})},dp=()=>{let{publicKey:e,privateKey:t}=(0,q.generateKeyPairSync)("ed25519");return{publicKeyRaw:QS(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},up=e=>(0,q.createPrivateKey)(e),mp=(e,t)=>(0,q.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),pp=(e,t,r)=>{try{let n=e_(e);return(0,q.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},gp=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,fp=()=>(0,q.randomBytes)(32).toString("base64url")});var be,To,yp,t_,r_,Qa,Ap,Sp,ei=d(()=>{"use strict";be=g(require("node:fs")),To=g(require("node:path"));hp();k();yp=e=>To.default.join(e.installDir,dt),t_=(e,t)=>{if(e.profileEmail===null||t===yp(e)||be.default.existsSync(t))return;let r=yp(e);be.default.existsSync(r)&&(be.default.mkdirSync(To.default.dirname(t),{recursive:!0}),be.default.renameSync(r,t))},r_=e=>{if(!be.default.existsSync(e))return null;try{let t=be.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Qa=e=>{let t=Xi(e);t_(e,t);let r=r_(t);if(r!==null)return r;let n=dp();return be.default.mkdirSync(To.default.dirname(t),{recursive:!0}),be.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},Ap=e=>{let t=Qa(e.layout),r=fp(),n=gp({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=up(t.privateKeyPem),s=mp(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Sp=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return pp(e.serverPublicKey,t,e.serverAttestation)}});var Co,ti=d(()=>{"use strict";Co={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var n_,_p,o_,bp,wp=d(()=>{"use strict";ti();n_=new Set(Object.values(Co)),_p=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),o_=e=>{if(!_p(e))return!1;let t=e.type;return!(typeof t!="string"||!n_.has(t)||e.payload!==void 0&&!_p(e.payload)||e.requestId!==void 0&&typeof e.requestId!="string")},bp=o_});var s_,vp,Ep,Wp=d(()=>{"use strict";wp();ti();s_=new Set(Object.values(Co)),vp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ep=e=>{if(!vp(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;return typeof t!="string"?{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e}:s_.has(t)?e.payload!==void 0&&!vp(e.payload)?{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:e.requestId!==void 0&&typeof e.requestId!="string"?{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e}:bp(e)?{formatOk:!0,formatError:null,command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}}});var Lp,Rp=d(()=>{"use strict";Lp=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var a_,i_,l_,jr,kp=d(()=>{"use strict";Rp();a_=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,i_=e=>a_.test(e),l_=e=>Lp(e),jr=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>jr(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&i_(n)){r[n]=l_(o);continue}r[n]=jr(o)}return r}});var ce,ri,c_,d_,u_,ni,xp,Tp,Cp,m_,oi,jt,si,Ip,Io=d(()=>{"use strict";ce=g(require("node:fs")),ri=g(require("node:path"));Wp();kp();c_="local-ws-trace.ndjson",d_=1e4,u_=1440*60*1e3,ni=e=>ri.default.join(e.logsDir,c_),xp=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},Tp=e=>{if(!ce.default.existsSync(e))return;let t=ce.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-u_,o=t.filter(s=>{let a=xp(s);if(a===null)return!1;let i=Date.parse(a.at);return Number.isFinite(i)&&i>=r}).slice(-d_);ce.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},Cp=(e,t)=>{let r=ni(e);ce.default.mkdirSync(ri.default.dirname(r),{recursive:!0}),ce.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),Tp(r)},m_=e=>e.parsed===null?{_empty:!0}:jr(e.parsed),oi=(e,t,r)=>{let n=Ep(r);Cp(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:m_(n)})},jt=(e,t)=>{Cp(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:jr({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},si=(e,t=80)=>{let r=ni(e);if(Tp(r),!ce.default.existsSync(r))return[];let n=ce.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let a=xp(s);a!==null&&o.push(a)}return o.reverse()},Ip=e=>{let t=ni(e);ce.default.existsSync(t)&&ce.default.writeFileSync(t,"","utf8")}});var Pp,Np,Op=d(()=>{"use strict";Io();Pp=!1,Np=e=>{Pp||(Pp=!0,process.on("uncaughtException",t=>{jt(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;jt(e,{kind:"crash",message:r,stack:n})}))}});var p_,Mp,Hp=d(()=>{"use strict";p_="local.agentwitch.com",Mp=`http://${p_}:43347`});var it,g_,Dp,Fp=d(()=>{"use strict";it=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g_=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Dp=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${it(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?it(r.direction):it(r.kind),a=`trace-body-${n}`,i=it(g_(r.body));return`<tr>
        <td title="${it(r.at)}">${it(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${it(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${a}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${a}" class="trace-body-pre" hidden>${i}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var $r,Po,f_,h_,y_,A_,Up,S_,__,jp,Br,$p,Gr,Bp,ai=d(()=>{"use strict";$r=g(require("node:fs")),Po=g(require("node:path"));gt();Cr();f_="rag",h_="http://127.0.0.1:11434",y_="nomic-embed-text",A_=e=>Po.default.join(e.installDir,f_),Up=(e,t)=>t!==void 0&&t.trim().length>0?Ne(t).ragChunksFilePath:Po.default.join(A_(e),fn),S_=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let a=0;a<r;a+=1){let i=e[a]??0,c=t[a]??0;n+=i*c,o+=i*i,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},__=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},jp=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||h_,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||y_;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Br=(e,t)=>{let r=Up(e,t);if(!$r.default.existsSync(r))return[];let n=$r.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},$p=async e=>{let t=__(e.text);if(t.length===0)return 0;let r=Up(e.layout,e.projectFolderPath);$r.default.mkdirSync(Po.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await jp(o);if(s===null)continue;let a={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};$r.default.appendFileSync(r,`${JSON.stringify(a)}
`,"utf8"),n+=1}return n},Gr=async e=>{let t=await jp(e.query);return t===null?[]:Br(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:S_(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Bp=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var Gp,Vp=d(()=>{"use strict";Gp=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let a=Math.floor(n/3600),i=Math.floor(n%3600/60);return i>0?`${a}h ${i}m`:`${a}h`}});var zp,No,Kp,Oo=d(()=>{"use strict";Vp();zp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),No=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=zp(e),r=zp(Gp(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Kp=`(function () {
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
})();`});var $t,qp,Jp=d(()=>{"use strict";$t=(e,t,r)=>e===1?t:r,qp=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${$t(o,"min","mins")} ago`;let s=Math.floor(n/36e5),a=Math.floor(n%36e5/6e4);if(s<24)return a===0?`${s}h ago`:`${s}h ${a} ${$t(a,"min","mins")} ago`;let i=Math.floor(n/864e5);if(i<7)return`${i} ${$t(i,"day","days")} ago`;let c=Math.floor(i/7);if(c<5)return`${c} ${$t(c,"week","weeks")} ago`;let m=Math.floor(i/30);if(m<12)return`${m} ${$t(m,"month","months")} ago`;let u=Math.floor(i/365);return`${u} ${$t(u,"year","years")} ago`}});var ii,Yp,Xp=d(()=>{"use strict";ii=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yp=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${ii(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${ii(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${ii(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Zp,Qp,eg,tg=d(()=>{"use strict";Zp=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,Qp=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,eg=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Bt,rg,ng=d(()=>{"use strict";Oo();Bt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rg=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",a=e.wakeError?`<div class="alert-error">${Bt(e.wakeError)}</div>`:"",i=No(e.lastHeartbeatAt);return`${a}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Bt(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Bt(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Bt(n)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${Bt(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Bt(o)}</p>
      </a>
    </div>`}});var Gt,b_,og,sg=d(()=>{"use strict";Gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b_=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],og=e=>{let t=b_.map(a=>`<option value="${Gt(a.value)}">${Gt(a.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Gt(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Gt(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Gt(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Gt(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var ag,ig=d(()=>{"use strict";ag=`
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
`.trim()});var w_,v_,lg,cg,dg=d(()=>{"use strict";ig();Oo();w_=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,v_=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/knowledge",label:"Knowledge"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],lg=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cg=e=>{let t=v_.map(o=>{let s=o.href===e.activePath;return`<a class="nav-link${s?" is-active":""}" href="${o.href}"${s?' aria-current="page"':""}>${o.label}</a>`}).join(""),r=lg(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"";return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${lg(e.title)} \xB7 Agent Witch Local</title>
  <style>${ag}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${w_}
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
  <script>${Kp}</script>
</body>
</html>`}});var li,ug,mg=d(()=>{"use strict";li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ug=e=>{if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">Nothing in <code>~/.agent-witch</code> yet. Use <strong>Import</strong> below to scan a folder.</p>
    </section>`;let t=e.installed.sets.map(n=>`<li class="harness-installed-set">
          <span><strong>${li(n.name)}</strong> <span class="muted mono">(${li(n.slug)})</span></span>
          <p class="muted">${n.itemCount} item(s)</p>
        </li>`).join(""),r=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${li(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Installed</p>
      <h2>Profile harness</h2>
      <p class="lede">${e.installed.sets.length} set(s) on this Mac. Link them to a repo under <a href="/projects">Projects</a>.</p>
      ${r}
      <ul class="harness-installed-set-list">${t}</ul>
    </section>`}});var E_,pg,gg,fg=d(()=>{"use strict";E_=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,pg=e=>e.kind==="folder",gg=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let a=0;a<o.length;a+=1){let i=o[a];if(i===void 0)continue;if(a===o.length-1){s.children.set(i,n);continue}let m=s.children.get(i);if(m!==void 0&&pg(m)){s=m;continue}let u={kind:"folder",name:i,children:new Map};s.children.set(i,u),s=u}}let r=n=>{let o=[];for(let s of n.children.values()){if(pg(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(E_)};return r(t)}});var hg,ci,yg=d(()=>{"use strict";hg=g(require("node:path")),ci=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${ci(r.children,t)}</ul>
            </details>
          </li>`;let n=hg.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var Ag,Me,W_,L_,Mo,R_,Sg,_g=d(()=>{"use strict";Ag=g(require("node:path"));mg();fg();yg();Me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),W_=()=>`(() => {
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

})();`,L_=()=>`(() => {
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
})();`,Mo=e=>{let t=ug({installed:e.installed}),r=e.flashError?`<div class="alert-error">${Me(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Me(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':R_(e.reveal),o=e.reveal?.scanRoots[0]?.trim()??"",s=o.length>0&&e.scanFolder.trim()===o,a=!e.importSectionExpanded,i=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Me(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Me(o)}" />
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
    <script>${W_()}</script>
    <script>${L_()}</script>`;return`${t}${r}${i}${c}`},R_=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,a=t.get(s)??{sets:[]};t.set(s,{sets:[...a.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let a=o.sets.map(({set:i,setIndex:c})=>{let m=gg(i.items.map(w=>({...w,relativePath:typeof w.relativePath=="string"&&w.relativePath.length>0?w.relativePath:Ag.default.relative(i.sourceRoot,w.sourcePath).replaceAll("\\","/")}))),u=ci(m,Me),y=i.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Me(i.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Me(i.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${y} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Me(n)}" autocomplete="off" />
          </label>
          ${a}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Sg=(e,t)=>{let r=new Set(e.getAll("includeSet").map(a=>Number.parseInt(String(a),10)).filter(a=>Number.isFinite(a))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[a,i]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(a);if(c===null)continue;let m=Number.parseInt(c[1]??"",10),u=i.trim();Number.isFinite(m)&&u.length>0&&o.set(m,u)}let s=[];for(let a=0;a<n;a+=1){let i=e.get(`setSlug-${a}`)?.trim()??"",c=e.get(`setGroupIndex-${a}`),m=c===null?null:Number.parseInt(c,10),u=m!==null&&Number.isFinite(m)?o.get(m):void 0,y=e.get(`setName-${a}`)?.trim()??u??i,w=t.sets[a];if(w===void 0)continue;let A=i.length>0?i:w.proposedSlug,f=y.length>0?y:w.proposedName,l=r.size===0||r.has(a),S=w.items.map(h=>({id:h.id,kind:h.kind,title:h.title,sourcePath:h.sourcePath,include:l}));s.push({slug:A,name:f,items:S})}return s}});var Vr,di,bg,wg,k_,Ho,x_,vg,ui,Eg=d(()=>{"use strict";Vr=g(require("node:fs")),di=g(require("node:path")),bg=require("node:crypto");mo();wg=e=>di.default.join(e.harnessRootDir,"projects-registry.json"),k_=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Ho=e=>{let t=wg(e);if(!Vr.default.existsSync(t))return[];try{let r=JSON.parse(Vr.default.readFileSync(t,"utf8"));return k_(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string"):[]}catch{return[]}},x_=(e,t)=>{Vr.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};Vr.default.writeFileSync(wg(e),`${JSON.stringify(r,null,2)}
`)},vg=(e,t)=>{let r=tt(t.projectFolderPath),n=t.name?.trim()||di.default.basename(r)||"Project",o=Ho(e),s=o.find(i=>tt(i.projectFolderPath)===r);if(s!==void 0)return s;let a={id:(0,bg.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return x_(e,[...o,a]),a},ui=(e,t)=>Ho(e).find(r=>r.id===t)??null});var Wg,Lg=d(()=>{"use strict";Wg=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Do,mi,zr,T_,we,Fo,Vt=d(()=>{"use strict";Do=g(require("node:fs")),mi=g(require("node:os")),zr=g(require("node:path")),T_=()=>Do.default.realpathSync(zr.default.resolve(mi.default.homedir())),we=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?zr.default.join(mi.default.homedir(),t.slice(1)):t,n;try{n=Do.default.realpathSync(zr.default.resolve(r))}catch{return null}let o=T_();return n===o||n.startsWith(`${o}${zr.default.sep}`)?n:null},Fo=e=>{let t=we(e);if(t===null)return null;try{if(!Do.default.statSync(t).isFile())return null}catch{return null}return t}});var ee,zt,Kr,C_,I_,P_,Rg,kg=d(()=>{"use strict";ee=g(require("node:fs")),zt=g(require("node:path"));mo();Ir();Lg();Vt();Kr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),C_=e=>{if(!ee.default.existsSync(e))return null;try{let t=JSON.parse(ee.default.readFileSync(e,"utf8"));if(Kr(t)&&t.version===1)return t}catch{return null}return null},I_=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?zt.default.join(e.harnessRootDir,n):zt.default.join(e.harnessSetsDir,t,n);if(!ee.default.existsSync(o))return null;try{if(!ee.default.statSync(o).isFile())return null}catch{return null}return o},P_=(e,t)=>{let r={};if(ee.default.existsSync(e))try{let o=JSON.parse(ee.default.readFileSync(e,"utf8"));Kr(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};ee.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},Rg=e=>{let t=[...new Set(e.setSlugs.map(u=>u.trim()).filter(u=>u.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=tt(e.projectFolderPath),n=we(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=ee.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=C_(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let a=Kr(s.sets)?s.sets:{},i=zt.default.join(n,".cursor"),c=0;for(let u of t){let y=a[u];if(!Kr(y))return{ok:!1,errorMessage:`Harness set "${u}" is not installed locally.`};let w=Array.isArray(y.items)?y.items:[];for(let A of w){if(!Kr(A))continue;let f=typeof A.path=="string"?A.path.trim():"";if(f.length===0)continue;let l=Wg(f);if(l===null)continue;let S=I_(e.layout,u,f);if(S===null)continue;let h=zt.default.join(i,l);ee.default.mkdirSync(zt.default.dirname(h),{recursive:!0}),ee.default.copyFileSync(S,h),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let m=Se({projectFolderPath:n});return P_(m.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var He,pi,xg=d(()=>{"use strict";He=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pi=e=>{let t=e.flashError?`<div class="alert-error">${He(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${He(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${He(o.slug)}"${r.has(o.slug)?" checked":""} />
            <span><strong>${He(o.name)}</strong> <span class="muted mono">(${He(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${He(e.project.name)}</h1>
      <p class="muted mono">${He(e.project.projectFolderPath)}</p>
      <p class="lede">Linked harness sets are copied into this project&apos;s <code>.cursor</code> folder and recorded in <code>.agent-witch/project.json</code>.</p>
      <form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${He(e.project.id)}" />
        <p class="field-label">Harness sets</p>
        ${n}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${e.installed.sets.length===0?" disabled":""}>Save linked harness</button>
        </div>
      </form>
    </section>`}});var Uo,Tg,Cg=d(()=>{"use strict";Uo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tg=e=>{let t=e.flashError?`<div class="alert-error">${Uo(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Uo(e.flashMessage)}</div>`:"",r=e.projects.length===0?'<p class="empty">No projects yet. Add a repo folder to link harness sets and run tasks in context.</p>':`<ul class="project-list">${e.projects.map(n=>`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Uo(n.name)}</strong>
                  <span class="muted mono">${Uo(n.projectFolderPath)}</span>
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
    </section>`}});var gi,fi,Ig=d(()=>{"use strict";gi=g(require("node:fs"));Cr();fi=e=>{let t=Ne(e);if(!gi.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse(gi.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var yi,hi,Kt,Pg=d(()=>{"use strict";yi=g(require("node:fs")),hi=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kt=e=>{if(!yi.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(yi.default.readFileSync(e.harnessManifestPath,"utf8"));if(!hi(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=hi(t.sets)?t.sets:{},o=Object.entries(n).map(([s,a])=>{if(!hi(a))return null;let i=typeof a.slug=="string"&&a.slug.length>0?a.slug:s,c=typeof a.name=="string"&&a.name.length>0?a.name:i,m=typeof a.updatedAt=="string"?a.updatedAt:"",u=Array.isArray(a.items)?a.items:[];return{slug:i,name:c,itemCount:u.length,updatedAt:m}}).filter(s=>s!==null).toSorted((s,a)=>s.name.localeCompare(a.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Ai,Ng=d(()=>{"use strict";Ai=()=>"~"});var Og,Si,Mg=d(()=>{"use strict";Og=require("node:child_process"),Si=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Og.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var Hg,Dg,Fg=d(()=>{"use strict";Hg=require("node:crypto"),Dg=e=>`local-${(0,Hg.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var _i,Ug=d(()=>{"use strict";_i=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var qr,jo,bi=d(()=>{"use strict";qr=g(require("node:path")),jo=e=>{let t=qr.default.dirname(e),r=qr.default.basename(t);return r==="agents"?qr.default.basename(qr.default.dirname(t)):r}});var Jr,ve,jg,N_,O_,M_,$o,$g,wi=d(()=>{"use strict";Jr=g(require("node:fs")),ve=g(require("node:path"));Fg();Ug();bi();jg=new Set(["node_modules",".git","dist","build",".next","coverage"]),N_=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},O_=(e,t)=>{let r=ve.default.basename(t);if(e==="skill"){let n=t.split(ve.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},M_=e=>{let t=[],r=(o,s)=>{let a;try{a=Jr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(i.name.startsWith(".")||i.isDirectory()&&jg.has(i.name))continue;let c=ve.default.join(o,i.name),m=s?ve.default.join(s,i.name):i.name;if(i.isDirectory()){r(c,m);continue}if(!i.isFile())continue;_i(m.replaceAll("\\","/"))!==null&&t.push({relativePath:m,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=ve.default.join(e,o);Jr.default.existsSync(s)&&r(s,o)}let n=ve.default.join(e,"skills");return Jr.default.existsSync(n)&&r(n,"skills"),t},$o=e=>{let t=M_(e);if(t.length===0)return null;let r=ve.default.dirname(e),n=jo(e),o=N_(n),s=t.map(a=>{let i=_i(a.relativePath.replaceAll("\\","/"));if(i===null)throw new Error(`Unexpected harness file: ${a.relativePath}`);return{id:Dg(a.absolutePath),kind:i,title:O_(i,a.relativePath),sourcePath:a.absolutePath,relativePath:a.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},$g=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let a;try{a=Jr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(r())return;if(!i.isDirectory()||jg.has(i.name))continue;let c=ve.default.join(o,i.name);if(i.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var Bg,vi,H_,Gg,Vg=d(()=>{"use strict";Bg=g(require("node:fs")),vi=g(require("node:path"));wi();Vt();H_=e=>{let t=we(e.trim());if(t===null)return null;if(vi.default.basename(t)===".cursor")return t;let r=vi.default.join(t,".cursor");try{if(Bg.default.statSync(r).isDirectory())return we(r)}catch{return null}return null},Gg=e=>{let t=H_(e.projectPath);if(t===null)return null;let r=$o(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(a=>a.sourceRoot!==r.sourceRoot),r].toSorted((a,i)=>a.proposedName.localeCompare(i.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var zg,D_,Bo,Kg,qg=d(()=>{"use strict";zg=g(require("node:path"));wi();Vt();bi();D_=5,Bo=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Kg=e=>{let t=we(e.scanRoot.trim());if(t===null)return Bo(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of $g(t,D_,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let a=we(s);if(a===null)continue;let i=jo(a);Bo(e.response,"folder",{cursorDir:a,groupName:i,repoPath:zg.default.dirname(a)});let c=$o(a);c!==null&&(r.push(c),Bo(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:i,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(m=>m.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,a)=>s.proposedName.localeCompare(a.proposedName))};return Bo(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var Jg,Yg,Xg=d(()=>{"use strict";Jg=g(require("node:path")),Yg=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Jg.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var F,Zg,Ei,F_,Qg,Wi,Li,ef,Go,tf=d(()=>{"use strict";F=g(require("node:fs")),Zg=g(require("node:os")),Ei=g(require("node:path"));Os();Vt();Xg();F_=e=>{if(!F.default.existsSync(e))return null;try{let t=JSON.parse(F.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Qg=e=>{let t=e.hostname??Zg.default.hostname(),r=F_(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let a of e.sets){let i=a.items.filter(u=>u.include);if(i.length===0)continue;let c=[];for(let u of i){let y=Fo(u.sourcePath);if(y===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let w=F.default.readFileSync(y,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:w,setSlugs:[a.slug]})}let m=jn({bundle:{name:a.name,slug:a.slug,items:c},hostname:t,existingManifest:r});r=m.manifest;for(let u of m.directories)o.add(u);for(let u of m.files)s.push(u),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{F.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let a of o)F.default.mkdirSync(`${e.layout.harnessRootDir}/${a}`,{recursive:!0});for(let a of s){let i=Ei.default.join(e.layout.harnessRootDir,a.relativePath);F.default.mkdirSync(Ei.default.dirname(i),{recursive:!0}),F.default.writeFileSync(i,a.content)}return F.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Harness submit failed."}}},Wi="reveal-cache.json",Li=(e,t)=>{F.default.mkdirSync(e.harnessRootDir,{recursive:!0}),F.default.writeFileSync(`${e.harnessRootDir}/${Wi}`,`${JSON.stringify(t,null,2)}
`)},ef=e=>{let t=`${e.harnessRootDir}/${Wi}`;F.default.existsSync(t)&&F.default.unlinkSync(t)},Go=e=>{let t=`${e.harnessRootDir}/${Wi}`;if(!F.default.existsSync(t))return null;try{let r=JSON.parse(F.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return Yg(r)}catch{return null}return null}});var rf,nf=d(()=>{"use strict";rf=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var De,of,U_,sf,Ri,af=d(()=>{"use strict";De=g(require("node:fs")),of=g(require("node:path")),U_=256e3,sf=e=>{De.default.mkdirSync(of.default.dirname(e),{recursive:!0}),De.default.writeFileSync(e,"","utf8")},Ri=(e,t=U_)=>{if(!De.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=De.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,a=Buffer.alloc(s),i=De.default.openSync(e,"r");try{De.default.readSync(i,a,0,s,o)}finally{De.default.closeSync(i)}let c=a.toString("utf8");if(o>0){let m=c.indexOf(`
`);m>=0&&(c=c.slice(m+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var lf,cf,ki,df,uf=d(()=>{"use strict";lf=require("node:crypto"),cf=g(require("node:fs"));dr();Nn();ze();Ke();ki=!1,df=async e=>{if(ki)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!M(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=U();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=St({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&cf.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,lf.randomUUID)();ki=!0;try{if(await sc(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let i=await bt({workspace:o,claudeCommand:r.claudeCommand,codexCommand:r.codexCommand,cursorCommand:r.cursorCommand,antigravityCommand:r.antigravityCommand},e.writerAgent,t);return await In(n,s,i.exitCode,i.output)?{ok:i.exitCode===0,agentRunId:s,...i.exitCode===0?{}:{errorMessage:i.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{ki=!1}}});var mf,Vo,xi=d(()=>{"use strict";mf=g(require("node:path"));Ls();Rs();Ke();ht();k();Vo=e=>{let t=U()?.layout.installDir??v();if(mf.default.basename(t)===On)return Es;let r=U(),n=r!==null?Y(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):Es}});var pf,gf=d(()=>{"use strict";Be();At();xi();pf=async e=>{let t=G(e.installDir),r=t?.bundleVersion??null,n=Vo(t);try{let o=await fs(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:vn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var ff,hf=d(()=>{"use strict";ff=e=>!e});var yf,Af,Sf=d(()=>{"use strict";Za();yf=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Af=async()=>{let e=await xo({force:!0});if(e.ok)return{ok:!0,message:yf(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:yf(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(At(),Rn)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var bf,Xr,wf,Ci,_f,j_,Ti,H,Ii,N,J,Yr,$_,B_,vf,Ef,Wf=d(()=>{"use strict";bf=g(require("node:http")),Xr=g(require("node:fs")),wf=g(require("node:path"));Hp();ko();Io();Fp();ai();hr();Wt();Oo();Jp();Xp();tg();ng();sg();dg();_g();Eg();kg();xg();Cg();Ig();Pg();Ng();Mg();Vg();Vt();qg();tf();Ir();nf();af();Be();uf();Ke();xi();gf();hf();Sf();ei();Ci=e=>qp(e)??"never",_f=48e3,j_=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0?!0:Kt(e).sets.length===0,Ti=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Ai(),reveal:t.reveal,installed:Kt(e),flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),H=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ii={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},N=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Ii}),e.end(JSON.stringify(r))},J=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Yr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},$_=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${H(e.status.wakeError)}</div>`:"",o=ff(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${No(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${H(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${H(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${H(Ci(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${H(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},B_=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},vf=e=>{let t=wf.default.join(e.layout.installDir,"link-code.txt"),r=()=>G(e.layout.installDir),n=()=>{let A=r();return{installBundleVersion:rf(A),installBundleUpdatedAt:A?.updatedAt??null,installVersion:A}},o=async A=>{let f=A.installVersion??r(),l=await a(),S=Qp(l),h=eg(A.updateFlash??null);return cg({title:A.title,activePath:A.activePath,body:A.body,cloudAppOrigin:Vo(f),prependBody:`${h}${S}`,headerUpdateButtonHtml:Zp(l)})},s=null,a=async()=>{let A=Date.now();if(s!==null&&A-s.cachedAtMs<6e4)return s.offer;let f=await pf(e.layout);return s={cachedAtMs:A,offer:f},f},i=()=>{s=null},c=!1,m=()=>{c||(c=!0,Af().catch(A=>{console.error("[agent-witch-local-app] install bundle update failed:",A)}).finally(()=>{c=!1,i()}))},u=async A=>{if(i(),!(await a()).updateAvailable){A.writeHead(303,{Location:"/?update=ok"}),A.end();return}A.writeHead(303,{Location:"/?update=started"}),A.end(),m()},y=()=>{if(Xr.default.existsSync(t))return Xr.default.readFileSync(t,"utf8").trim();let A=Math.random().toString(36).slice(2,8).toUpperCase();return Xr.default.writeFileSync(t,A,"utf8"),A},w=bf.default.createServer((A,f)=>{(async()=>{let l=A.url?.split("?")[0]??"/",S=A.method??"GET";if(S==="OPTIONS"){f.writeHead(204,Ii),f.end();return}if(S==="GET"&&l==="/health"){let h=e.controllers.getStatus(),p=n();N(f,200,{ok:!0,...h,installBundleVersion:p.installBundleVersion,installBundleUpdatedAt:p.installBundleUpdatedAt});return}if(S==="GET"&&l==="/api/status"){let h=n();N(f,200,{...e.controllers.getStatus(),linkCode:y(),installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(S==="GET"&&l==="/api/traffic"){N(f,200,{entries:Ro(e.layout)});return}if(S==="DELETE"&&l==="/api/traffic"){ep(e.layout),N(f,200,{ok:!0});return}if(S==="GET"&&l==="/api/trace"){N(f,200,{entries:si(e.layout)});return}if(S==="DELETE"&&l==="/api/trace"||S==="POST"&&l==="/api/trace/clear"){if(Ip(e.layout),S==="POST"){f.writeHead(303,{Location:"/status"}),f.end();return}N(f,200,{ok:!0});return}if(S==="POST"&&l==="/api/errors/clear"){sf(e.layout.errorLogPath),f.writeHead(303,{Location:"/errors"}),f.end();return}if(S==="GET"&&l==="/api/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(p.length>0){let _=await Gr({layout:e.layout,query:p,limit:20});N(f,200,{chunks:_,query:p});return}N(f,200,{chunks:Br(e.layout).slice(-50).reverse()});return}if(S==="POST"&&l==="/api/revive"){e.controllers.reviveWebSocket(),N(f,200,{ok:!0});return}if(S==="GET"&&l==="/api/update-status"){let h=await a();N(f,200,{ok:!0,...h});return}if((S==="GET"||S==="POST")&&l==="/api/update"){await u(f);return}if(S==="GET"&&l==="/"){let h=e.controllers.getStatus(),p=n(),_=Kt(e.layout),b=Ri(e.layout.errorLogPath);J(f,await o({title:"Home",activePath:"/",installVersion:p.installVersion,updateFlash:B_(A.url??void 0),body:rg({wsConnected:h.wsConnected,lastHeartbeatAt:h.lastHeartbeatAt,installBundleVersion:p.installBundleVersion,harnessSetCount:_.sets.length,knowledgeChunkCount:Br(e.layout).length,trafficEntryCount:Ro(e.layout).length,wakeError:h.wakeError,errorLogByteSize:b.byteSize,errorLogExists:b.exists})}));return}if(S==="GET"&&l==="/task"){let h=e.controllers.getStatus(),p=n(),_=U(),b=new URL(A.url??"/",`http://127.0.0.1:${43347}`),E=b.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,L=b.searchParams.get("failed")==="1"?b.searchParams.get("error")?.trim()??"Task failed.":null,x=b.searchParams.get("runId");J(f,await o({title:"Task",activePath:"/task",installVersion:p.installVersion,body:og({defaultWorkspace:_?.workspace??"",wsConnected:h.wsConnected,flashMessage:E,flashError:L,lastRunId:x})}));return}if(S==="POST"&&l==="/task/dispatch"){let h=await Yr(A),p=new URLSearchParams(h),_=p.get("prompt")?.trim()??"",b=p.get("writerAgent")?.trim()??"claude-cli",E=p.get("projectFolder")?.trim()??"",L=await df({prompt:_,writerAgent:b,...E.length>0?{projectFolderPath:E}:{}}),x=new URLSearchParams;L.ok?x.set("ok","1"):(x.set("failed","1"),L.errorMessage!==void 0&&x.set("error",L.errorMessage.slice(0,240))),L.agentRunId!==void 0&&x.set("runId",L.agentRunId),f.writeHead(303,{Location:`/task?${x.toString()}`}),f.end();return}if(S==="GET"&&l==="/errors"){let h=n(),p=Ri(e.layout.errorLogPath);J(f,await o({title:"Errors",activePath:"/errors",installVersion:h.installVersion,body:Yp({errorLogPath:e.layout.errorLogPath,content:p.content,exists:p.exists,truncated:p.truncated,byteSize:p.byteSize})}));return}if(S==="GET"&&l==="/status"){let h=e.controllers.getStatus(),p=Z(e.layout),_=ae(p,se),b=n();J(f,await o({title:"Status",activePath:"/status",installVersion:b.installVersion,body:`${$_({status:h,stale:_,linkCode:y(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt})}${Dp({entries:si(e.layout)})}`}));return}if(S==="GET"&&l==="/traffic"){let h=Ro(e.layout),p=n(),_=h.map(E=>`<tr><td title="${H(E.at)}">${H(Ci(E.at))}</td><td>${H(E.direction)}</td><td><code>${H(E.type)}</code></td><td>${H(E.summary)}</td><td>${H(E.action??"")}</td></tr>`).join(""),b=h.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';J(f,await o({title:"Traffic",activePath:"/traffic",installVersion:p.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${b}
            </section>`}));return}if(S==="GET"&&l==="/projects"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),_=h.searchParams.get("added")==="1"?"Project added.":null;J(f,await o({title:"Projects",activePath:"/projects",installVersion:p.installVersion,body:Tg({projects:Ho(e.layout),flashMessage:_})}));return}if(S==="GET"&&l==="/project"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=h.searchParams.get("id")?.trim()??"",_=ui(e.layout,p);if(_===null){f.writeHead(404),f.end("Project not found");return}let b=n(),E=h.searchParams.get("linked")==="1"?`Harness linked (${h.searchParams.get("files")??"0"} file(s) written).`:null;J(f,await o({title:_.name,activePath:"/projects",installVersion:b.installVersion,body:pi({project:_,installed:Kt(e.layout),linkedSetSlugs:fi(_.projectFolderPath),flashMessage:E})}));return}if(S==="POST"&&l==="/projects/add"){let h=Si();if(h===null){f.writeHead(303,{Location:"/projects"}),f.end();return}Se({projectFolderPath:h}),vg(e.layout,{projectFolderPath:h}),f.writeHead(303,{Location:"/projects?added=1"}),f.end();return}if(S==="POST"&&l==="/projects/link-harness"){let h=await Yr(A),p=new URLSearchParams(h),_=p.get("projectId")?.trim()??"",b=ui(e.layout,_);if(b===null){f.writeHead(404),f.end("Project not found");return}let E=p.getAll("applySet").map(x=>String(x)),L=Rg({layout:e.layout,projectFolderPath:b.projectFolderPath,setSlugs:E});if(!L.ok){let x=n();J(f,await o({title:b.name,activePath:"/projects",installVersion:x.installVersion,body:pi({project:b,installed:Kt(e.layout),linkedSetSlugs:fi(b.projectFolderPath),flashError:L.errorMessage})}));return}f.writeHead(303,{Location:`/project?id=${encodeURIComponent(b.id)}&linked=1&files=${L.writtenFileCount}`}),f.end();return}if(S==="GET"&&l==="/harness"){let h=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),_=Go(e.layout),b=h.searchParams.get("submitted")==="1",E=b?h.searchParams.get("syncFailed")==="1"?`Local harness updated (${h.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:h.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${h.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":h.searchParams.get("stopped")==="1"?`Reveal stopped. ${_?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:h.searchParams.get("revealed")==="1"?`Reveal found ${_?.sets.length??0} set(s).`:null,L=_?.scanRoots[0]??Ai(),x=j_(e.layout,{reveal:_,importQuery:h.searchParams.get("import")==="1",justSubmitted:b});J(f,await o({title:"Harness",activePath:"/harness",installVersion:p.installVersion,body:Mo(Ti(e.layout,{reveal:_,scanFolder:L,flashMessage:E,importSectionExpanded:x}))}));return}if(S==="POST"&&l==="/api/harness/pick-folder"){let h=Si();if(h===null){N(f,200,{cancelled:!0});return}N(f,200,{path:h});return}if(S==="GET"&&l==="/api/harness/file-content"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",_=Fo(p);if(_===null){N(f,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let b=Xr.default.readFileSync(_,"utf8"),E=b.length>_f?`${b.slice(0,_f)}
\u2026 (truncated)`:b;N(f,200,{content:E})}catch{N(f,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&l==="/api/harness/reveal/add-project"){let h=await Yr(A),p="";try{let E=JSON.parse(h);typeof E=="object"&&E!==null&&typeof E.projectPath=="string"&&(p=E.projectPath.trim())}catch{N(f,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(p.length===0){N(f,400,{ok:!1,errorMessage:"projectPath is required."});return}let _=Go(e.layout),b=Gg({reveal:_,projectPath:p});if(b===null||b.sets.length===0){N(f,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Li(e.layout,b),N(f,200,{ok:!0,setCount:b.sets.length});return}if(S==="GET"&&l==="/api/harness/reveal/stream"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(p.length===0){N(f,400,{errorMessage:"Choose a folder to scan first."});return}let _=!1;A.on("close",()=>{_=!0}),f.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Ii});let b=Kg({scanRoot:p,response:f,shouldAbort:()=>_});Li(e.layout,b),f.end();return}if(S==="POST"&&l==="/harness/reveal"){f.writeHead(410,{"Content-Type":"text/plain"}),f.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&l==="/harness/submit"){let h=Go(e.layout);if(h===null){let re=n();J(f,await o({title:"Harness",activePath:"/harness",installVersion:re.installVersion,body:Mo(Ti(e.layout,{reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let p=await Yr(A),_=new URLSearchParams(p),b=Sg(_,h),E=Qg({layout:e.layout,sets:b});if(!E.ok){let re=n();J(f,await o({title:"Harness",activePath:"/harness",installVersion:re.installVersion,body:Mo(Ti(e.layout,{reveal:h,flashError:E.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}ef(e.layout);let x=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";f.writeHead(303,{Location:`/harness?submitted=1&count=${E.writtenItemCount??0}${x}`}),f.end();return}if(S==="GET"&&l==="/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",_=n(),E=(p.length>0?await Gr({layout:e.layout,query:p,limit:20}):Br(e.layout).slice(-50).reverse()).map(L=>`<article class="card"><div class="muted" title="${H(L.createdAt)}">${H(Ci(L.createdAt))}${L.source?` \xB7 ${H(L.source)}`:""}</div><pre>${H(L.text)}</pre></article>`).join("");J(f,await o({title:"Knowledge",activePath:"/knowledge",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${H(p)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${E||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}S==="POST"&&await Yr(A),f.writeHead(404),f.end("Not found")})().catch(l=>{console.error("[agent-witch-local-app]",l),f.writeHead(500),f.end("Internal error")})});return w.on("error",A=>{if(A.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",A)}),w.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Mp}`)}),w},Ef=e=>Qa(e).publicKeyRaw});var Zr,Pi,Lf,Rf,kf,xf,Tf=d(()=>{"use strict";Zr=g(require("node:fs")),Pi=g(require("node:path"));gt();Cr();Lf=(e,t)=>Pi.default.join(Ne(t).memoryDirPath,hn),Rf=(e,t)=>{let r=Lf(e,t);if(!Zr.default.existsSync(r))return[];let n=Zr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},kf=e=>{let t=Lf(e.layout,e.projectFolderPath);Zr.default.mkdirSync(Pi.default.dirname(t),{recursive:!0}),Zr.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},xf=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let a=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,i=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${a}
Result: ${i}`}).join(`

`)}

---

`});var Cf,G_,V_,z_,If,Pf=d(()=>{"use strict";Cf=g(require("node:os"));k();G_="Default",V_=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),z_=e=>{let t=Cf.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},If=()=>{let e=R(),t=Yi(e),r=V_(G_);return`${z_(t)}/${r.length>0?r:"project"}`}});var Nf,K_,Of,Mf=d(()=>{"use strict";Nf=require("node:child_process");vo();ze();K_=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,Nf.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",a=>{o(a===0)})})},Of=async e=>{if(!M(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};try{await Oe(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await K_(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Hf,Df=d(()=>{"use strict";Hf=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var Ff,Uf,jf=d(()=>{"use strict";Ff=require("node:crypto"),Uf=()=>(0,Ff.randomUUID)()});var Qr,q_,$f,zo=d(()=>{"use strict";Qr="[[WORKING_ESTIMATE]]",q_=["Put this marker on its own line:",Qr,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),$f=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",q_,"","Task to estimate:",e.trim()].join(`
`)});var Bf,Gf=d(()=>{"use strict";Bf=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Vf,zf=d(()=>{"use strict";Vf=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var J_,Kf,qf=d(()=>{"use strict";zo();J_=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Kf=e=>{if(!e.includes(Qr))return null;let t=null;for(let r of e.matchAll(J_)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var Jf,Yf=d(()=>{"use strict";Nn();zo();Gf();zf();qf();er();Jf=async e=>{let t=Bf(e.wrappedPrompt),r=$f(t),n=await bt(e.config,e.writerAgent,r),o=Kf(n.output),s=Vf(o);return Qt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:oe.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var Xf={};Fe(Xf,{buildContinuationPromptWithContext:()=>Z_});var Y_,X_,Z_,Zf=d(()=>{"use strict";Y_=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,X_=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Z_=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=X_(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${Y_(n,o)}`:null].filter(a=>a!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var Qf={};Fe(Qf,{readHarnessExportSets:()=>eb});var en,Ni,Ko,Q_,eb,eh=d(()=>{"use strict";en=g(require("node:fs")),Ni=g(require("node:path"));k();Ko=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Q_=e=>{if(!en.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(en.default.readFileSync(e.harnessManifestPath,"utf8"));if(Ko(t))return t}catch{return null}return null},eb=(e,t)=>{let r=R(t),n=Q_(r);if(n===null)return[];let o=Ko(n.sets)?n.sets:{},s=[];for(let a of e){let i=o[a];if(!Ko(i)||typeof i.name!="string")continue;let c=Array.isArray(i.items)?i.items:[],m=[];for(let u of c){if(!Ko(u))continue;let y=typeof u.path=="string"?u.path:void 0,w=typeof u.id=="string"?u.id:"",A=typeof u.kind=="string"?u.kind:"",f=typeof u.title=="string"?u.title:"";if(y===void 0||w.length===0||A.length===0||f.length===0)continue;let l=y.startsWith("shared/")?Ni.default.join(r.harnessRootDir,y):Ni.default.join(r.harnessSetsDir,a,y);en.default.existsSync(l)&&m.push({id:w,kind:A,title:f,content:en.default.readFileSync(l,"utf8")})}m.length>0&&s.push({name:i.name,slug:a,items:m})}return s}});var ih={};Fe(ih,{startAgentWitchClient:()=>gb});var Hi,tn,qt,fb,tb,rb,nb,ob,th,sb,rh,nh,oh,Oi,C,sh,P,Mi,ab,qo,ib,lb,cb,db,ub,mb,pb,ah,gb,lh=d(()=>{"use strict";Hi=require("node:child_process"),tn=g(require("node:fs")),qt=g(require("node:os"));mu();gn();ms();is();Ta();je();Su();wu();Vu();vt();k();Xm();dr();_o();za();vo();ze();Da();hr();Wt();So();Qm();op();Be();ap();cp();ei();ko();Io();Op();Wf();ai();Tf();ht();Pf();Ir();Mf();cs();wn();lt();An();Df();jf();zo();er();Yf();xs();fb={},tb="claude",rb="codex",nb="cursor",ob="agy",th=3e4,sb=3e4,rh=new Map,nh=new Map,oh=new Map,Oi=e=>{let t=e?.trim()??"";return t.length>0?t:If()},C=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sh=e=>{let t=R(e);if(!tn.default.existsSync(t.configPath))return null;try{let r=JSON.parse(tn.default.readFileSync(t.configPath,"utf8"));if(!C(r))throw new Error("Config must be a JSON object.");let n=typeof r.wsUrl=="string"?r.wsUrl.trim():"",o=Mn({installDir:t.installDir,configWsUrl:n}),s=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),a=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??tb,i=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??rb,c=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??nb,m=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??ob,u=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",y=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return u.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:y,wsUrl:o,workspace:s,claudeCommand:a,codexCommand:i,cursorCommand:c,antigravityCommand:m,pairingToken:u,layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},P=(e,t,r)=>{e.readyState===Lr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(at(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),oi(r,"out",t)))},Mi=e=>e,ab=e=>{if(!tn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(tn.default.readFileSync(e.harnessManifestPath,"utf8"));if(C(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},qo=(e,t)=>{let r=ab(t);r!==null&&P(e,{type:"harness.manifest.report",payload:{hostname:qt.default.hostname(),manifest:r}})},ib=async(e,t,r,n,o,s,a=!1,i,c,m,u)=>{if(!M(t)){P(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let y=Eo(t)&&!Mm(t);if(y){try{await Oe(e.layout.installDir,t)}catch(_){let b=_ instanceof Error?_.message:String(_);P(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ga(t)}else if(!Eo(t))try{await Oe(e.layout.installDir,t)}catch(_){let b=_ instanceof Error?_.message:String(_);P(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let w=a&&Om(t)&&Hm(t)?"continue":"first",A=r;if(a&&w==="first"&&typeof c=="string"&&c.length>0){let _=yo(e.layout,c);if(_!==null){let{buildContinuationPromptWithContext:b}=await Promise.resolve().then(()=>(Zf(),Xf));A=b({priorPrompt:_.prompt,priorOutput:_.resultOutput??"",userMessage:r})}}let f=Oi(m);Se({projectFolderPath:f});let l=await Gr({layout:e.layout,query:A,limit:5,projectFolderPath:f}),S=Rf(e.layout,f),h=`${xf(S)}${Bp(l)}${A}`,p=u?.trim()??(s!==void 0&&f.trim().length>0?Uf():void 0);if(s!==void 0&&p!==void 0&&p.length>0&&f.trim().length>0){_n({reportKey:p,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let _=await Jf({config:{workspace:e.workspace,claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand},writerAgent:t,wrappedPrompt:h,reportKey:p,agentRunId:s});if(_.estimateSeconds!==null){let b=`${Qr}
${_.estimateSeconds}
`;nt(s)?P(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:b},requestId:n}):Dt(s,b)}h=Hf(h,_),h=Sl(h,{agentRunId:s,reportKey:p,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}Ja(e,t,h,n,Mi(o),s,{sessionTurn:w},i,f,p),y&&s!==void 0&&P(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Fm(t)},requestId:n})},lb=async(e,t,r,n,o)=>{let s=(a,i)=>{P(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:a,exitCode:i},requestId:n})};try{let a="",i=await Um({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,commands:Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{a+=u,P(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:n})}}),c=M(t)?t:"claude-cli",m=i.exitCode!==0?i.output:a.length>0?Wo(c):i.output;s(m,i.exitCode)}catch(a){let i=a instanceof Error?a.message:String(a);console.error("[agent-witch] Writer session start failed:",i),s(`Failed to start ${t} session: ${i}
`,-1)}},cb=(e,t,r)=>new Promise(n=>{if(!M(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=_t(t,r,Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],a=(0,Hi.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});a.stdout?.on("data",i=>{s.push(i.toString("utf8"))}),a.stderr?.on("data",i=>{s.push(i.toString("utf8"))}),a.on("close",i=>{n({exitCode:i??-1,output:s.join("").trim()})}),a.on("error",i=>{n({exitCode:-1,output:i.message})})}),db=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(P(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){P(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!M(o)){P(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let a=await(async()=>{try{await Oe(e.layout.installDir,o)}catch(i){let c=i instanceof Error?i.message:String(i);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return cb(e,o,s)})();P(n,{type:"harness.request.result",payload:{success:a.exitCode===0,writerAgent:o,exitCode:a.exitCode,output:a.output},requestId:r}),qo(n,e.layout)},ub=e=>{let t=1e3*2**e;return Math.min(sb,t)},mb=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,Zm().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,S="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,np({layout:e.layout,remoteBundleVersion:l,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=Z(e.layout);l!==null&&ae(l,se)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,i(),c(),A())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},i=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let l=t.socket;t.socket=void 0,t.wsConnected=!1,l.removeAllListeners("open"),l.removeAllListeners("message"),l.removeAllListeners("close"),l.on("error",()=>{}),(l.readyState===Lr.OPEN||l.readyState===Lr.CONNECTING)&&l.close()},m=()=>{a(),t.localHealthTimer=setInterval(o,th)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=ub(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},l)},y=l=>{s();let S=()=>{let h=G(e.layout.installDir)?.bundleVersion??null,p=X();P(l,{type:"agent.heartbeat",payload:{hostname:qt.default.hostname(),macOsUsername:qt.default.userInfo().username,wakeError:t.wakeError,wakePort:p,...e.email!==null?{email:e.email}:{},...h!==null?{installBundleVersion:h}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,th)},w=(l,S)=>{if(typeof l.type!="string")return;at(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"}),oi(e.layout,"in",l);let h=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&C(l.payload)){let p=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",_=typeof l.payload.origin=="string"?l.payload.origin:"",b=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",E=typeof l.payload.challenge=="string"?l.payload.challenge:"",L=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!Sp({serverPublicKey:p,origin:_,devicePublicKey:b,challenge:E,serverAttestation:L})){t.wakeError="Server attestation verification failed",at(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&C(l.payload)){let p=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";at(e.layout,{direction:"local",type:"writer.ensure",summary:p,action:"ensure-writer"}),Of({layout:e.layout,writerAgent:p,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(_=>{P(S,{type:"writer.status",payload:_},e.layout)})}if(l.type==="install.bundle.update"&&C(l.payload)){let p=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";p.length>0&&n(p,"install.bundle.update")}if(l.type==="system.ack"){Fs(e.layout,{wsUrl:e.wsUrl});let p=C(l.payload)?l.payload:null,_=sp(p);_!==null&&n(_)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&C(l.payload)&&ip(l.payload),l.type==="automations.run"&&C(l.payload)&&lp(l.payload),l.type==="terminal.stream.accepted"&&C(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"";if(p.length>0){let _=pm(p);for(let b of _)P(S,{type:"terminal.stream.chunk",payload:{runId:p,chunk:b},requestId:h})}}if(l.type==="agent.agentRun.list"&&P(S,{type:"dashboard.agentRun.list.result",payload:{runs:om(e.layout)},requestId:h}),l.type==="agent.agentRun.get"&&C(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"",_=p.length>0?yo(e.layout,p):null;P(S,{type:"dashboard.agentRun.get.result",payload:{run:_},requestId:h})}if(l.type==="command.claude.run"&&C(l.payload)){let p=l.payload.prompt,_=typeof l.payload.writerAgent=="string"&&M(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",b=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,E=l.payload.sessionContinuation===!0,L=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,x=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,re=Oi(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),Jt=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof p=="string"&&p.trim().length>0&&(console.log(`[agent-witch] Running ${_} task (${E?"continue":"first"})\u2026`),b!==void 0&&x!==void 0&&rh.set(b,x),b!==void 0&&(nh.set(b,re),oh.set(b,p.trim()),Se({projectFolderPath:re})),ib(e,_,p.trim(),h,S,b,E,x,L,re,Jt))}if(l.type==="shell.session.open"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",_=typeof l.payload.cols=="number"?l.payload.cols:120,b=typeof l.payload.rows=="number"?l.payload.rows:32;p.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Em({shellSessionId:p,cwd:e.workspace,cols:_,rows:b,send:E=>{P(S,E)},requestId:h}))}if(l.type==="shell.session.close"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";p.length>0&&Hr(p,_=>{P(S,_)},h)}if(l.type==="shell.input"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",_=typeof l.payload.data=="string"?l.payload.data:"";p.length>0&&_.length>0&&bm(p,_)}if(l.type==="shell.resize"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",_=typeof l.payload.cols=="number"?l.payload.cols:0,b=typeof l.payload.rows=="number"?l.payload.rows:0;p.length>0&&_>0&&b>0&&wm(p,_,b)}if(l.type==="command.writer.session.end"&&C(l.payload)){let p=l.payload.writerAgent;typeof p=="string"&&M(p)&&Dm(p)}if(l.type==="command.writer.session.start"&&C(l.payload)){let p=l.payload.writerAgent,_=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof p=="string"&&M(p)&&_.length>0&&(console.log(`[agent-witch] Starting ${p} session\u2026`),lb(e,p,_,h,S))}if(l.type==="command.claude.stop"&&C(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";p.length>0&&(console.log(`[agent-witch] Stopping run ${p}\u2026`),Ym(e,Mi(S),p,h))}if(l.type==="command.claude.input_respond"&&C(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",_=typeof l.payload.response=="string"?l.payload.response.trim():"",b=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",E=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",L=typeof l.payload.question=="string"?l.payload.question:"";p.length>0&&_.length>0&&b.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),qm(e,{agentRunId:p,originalPrompt:b,partialOutput:E,question:L,response:_,shellSessionId:rh.get(p)},h,Mi(S)))}if(l.type==="dispatch.approval.required"&&C(l.payload)){let p=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",_=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${p}: ${_}`),process.platform==="darwin"&&(0,Hi.spawn)("osascript",["-e",`display notification "${_.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${p.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&C(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),db(e,l.payload,h,S)),l.type==="harness.export.request"&&C(l.payload)){let p=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",_=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,b=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(E=>typeof E=="string"):[];p.length>0&&b.length>0&&(async()=>{let{readHarnessExportSets:E}=await Promise.resolve().then(()=>(eh(),Qf)),L=E(b,e.email);P(S,{type:"harness.export.result",payload:{success:L.length>0,borrowerUserId:p,..._!==void 0?{targetDeviceId:_}:{},sets:L,errorMessage:L.length>0?void 0:"No readable harness sets were found on this machine."},requestId:h})})()}if(l.type==="harness.manifest.request"&&qo(S,e.layout),l.type==="command.claude.result"&&C(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,_=Oi(p!==void 0?nh.get(p):void 0),b=p!==void 0?oh.get(p)??"":"";$p({layout:e.layout,text:l.payload.output,source:p??"command.claude.result",projectFolderPath:_}),b.trim().length>0&&kf({layout:e.layout,projectFolderPath:_,entry:{id:`${Date.now()}-${p??"run"}`,...p!==void 0?{agentRunId:p}:{},prompt:b,output:l.payload.output,createdAt:new Date().toISOString()}})}},A=()=>{if(t.stopped)return;i(),c();let l=new Lr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Fs(e.layout,{wsUrl:e.wsUrl}),Gm(St({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Vm(e.layout);let S=Y(e.wsUrl)??"http://localhost:3000",h=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),p=Ap({layout:e.layout,origin:S,...h!==void 0&&h.length>0?{claimToken:h}:{}});P(l,{type:"agent.register",payload:{role:"agent",hostname:qt.default.hostname(),macOsUsername:qt.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...p}},e.layout),qo(l,e.layout),Jm(e,l),y(l)}),l.on("message",S=>{let h=typeof S=="string"?S:S.toString("utf8");try{let p=JSON.parse(h);if(!C(p))return;w(p,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",(S,h)=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1;let p=typeof h=="string"?h:h.toString("utf8");jt(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:p}),console.log("[agent-witch] Disconnected from server."),u()}),l.on("error",S=>{t.wakeError=S.message,jt(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})};return{connect:A,startLocalHealthCheck:m,stop:()=>{t.stopped=!0,s(),a(),i(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Ef(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(qo(l,e.layout),{ok:!0})}}},pb=async()=>{let e=()=>{let r=el();if(r.length===0){let n=sh(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=sh(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},ah=async()=>{pt("agent-witch"),hu().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=v();bu(t);let r=Au({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),En();let n=await pb(),o=n[0];o!==void 0&&Np(o.layout);let s=n.map(y=>mb(y)),a=s[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),xa(),process.exit(0));let i=()=>{n.forEach((y,w)=>{let A=Z(y.layout);A!==null&&!ae(A,se)||s[w]?.reviveWebSocket()})},c=()=>{},m=await Gu({reconnectWebSockets:i,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),c()}});vf({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:i,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}});for(let y of s)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Bridging ${s.length} account profile(s) in one process.`);let u=pn(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),mn(),c()});c=()=>{u(),m.stop(),xa(),console.log("[agent-witch] Shutting down.");for(let y of s)y.stop();process.exit(0)},process.on("SIGINT",()=>{c()}),process.on("SIGTERM",()=>{c()})},gb=ah;if(ft(fb.url)&&!ne()){let e=process.argv.indexOf("report");e>=0&&process.exit(bn(process.argv.slice(e))),ah()}});gn();cs();wn();var Rl="20.x",kl="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var Fh=e=>[`Node.js ${Rl} or newer is required (found ${e}).`,kl].join(" "),xl=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${Fh(process.version)}
`),process.exit(1))};var Sb={},hb=async()=>{pt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(At(),Rn)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},yb=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(oa(),id)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Ab=async()=>{if(!ft(Sb.url))return;xl();let e=process.argv.indexOf("report");e>=0&&process.exit(bn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await hb();return}if(t==="wake"){await yb();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(lh(),ih));await r()};Ab();
