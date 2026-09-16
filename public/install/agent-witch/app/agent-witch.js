#!/usr/bin/env node
"use strict";var dh=Object.create;var Jo=Object.defineProperty;var uh=Object.getOwnPropertyDescriptor;var mh=Object.getOwnPropertyNames;var ph=Object.getPrototypeOf,gh=Object.prototype.hasOwnProperty;var m=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var U=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},De=(e,t)=>{for(var r in t)Jo(e,r,{get:t[r],enumerable:!0})},fh=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of mh(t))!gh.call(e,o)&&o!==r&&Jo(e,o,{get:()=>t[o],enumerable:!(n=uh(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?dh(ph(e)):{},fh(t||!e||!e.__esModule?Jo(r,"default",{value:e,enumerable:!0}):r,e));var Di,Fi,Yo=m(()=>{"use strict";Di=new Set(["","loginwindow","_mbsetupuser","root"]),Fi=5e3});var Ui,rn,Xo=m(()=>{"use strict";Ui=require("node:child_process"),rn=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Ui.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var te,lt=m(()=>{"use strict";te=()=>!0});var nn,ji,hh,on,Zo=m(()=>{"use strict";nn=g(require("node:path")),ji=require("node:url");lt();hh={},on=()=>{if(te()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return nn.default.dirname(nn.default.resolve(e))}return nn.default.dirname((0,ji.fileURLToPath)(hh.url))}});var le,$i,ct=m(()=>{"use strict";le="agent-witch.js",$i="command"});var es,Ki,E,yh,Qo,ts,Ah,Sh,_h,bh,Fe,wh,Bi,Gi,Vi,rs,ce,sn,an,zi,dt,ut,v,qi,ns,Ji,Yi,ln,Xi,Zi,de,os,vh,Eh,Ee,Wh,W,L=m(()=>{"use strict";es=g(require("node:fs")),Ki=g(require("node:os")),E=g(require("node:path"));Zo();ct();yh=on(),Qo=".agent-witch",ts=".local-agent-witch",Ah=47892,Sh=47893,_h="com.agent-witch",bh="com.local-agent-witch",Fe="profiles",wh="active-profile.json",Bi="harness",Gi="sets",Vi="manifest.json",rs="projects",ce="logs",sn="agent-witch.log",an="agent-witch.error.log",zi="reports",dt="device-keypair.json",ut=e=>e.trim().toLowerCase(),v=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return E.default.resolve(e);let t=E.default.resolve(yh),r=E.default.basename(t),n=E.default.basename(E.default.dirname(t));return r==="app"&&(n===Qo||n===ts)?E.default.dirname(t):r===Qo||r===ts?t:E.default.join(Ki.default.homedir(),Qo)},qi=(e=v())=>E.default.join(e,"app"),ns=(e=v())=>E.default.join(qi(e),le),Ji=(e,t,r)=>t!==null?E.default.join(e,Fe,t,r):E.default.join(e,r),Yi=e=>Ji(e.installDir,e.profileEmail,rs),ln=e=>Ji(e.installDir,e.profileEmail,ce),Xi=e=>e.profileEmail!==null?E.default.join(e.installDir,Fe,e.profileEmail,dt):E.default.join(e.installDir,dt),Zi=e=>E.default.basename(e)===ts,de=(e=v())=>Zi(e)?bh:_h,os=(e=v())=>Zi(e)?Sh:Ah,vh=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return ut(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?ut(t):null},Eh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ee=(e=v())=>{let t=E.default.join(e,wh);if(!es.default.existsSync(t))return null;try{let r=JSON.parse(es.default.readFileSync(t,"utf8"));if(Eh(r)&&typeof r.email=="string"&&r.email.trim().length>0)return ut(r.email)}catch{return null}return null},Wh=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?ut(r):null}let t=vh();return t!==null?t:Ee()},W=e=>{let t=v(),r=qi(t),n=ns(t),o=Wh(e);if(o!==null){let h=E.default.join(t,Fe,o),S=E.default.join(h,Bi),y=E.default.join(h,rs),l=E.default.join(h,ce),A=E.default.join(h,zi),_=E.default.join(h,dt),f=E.default.join(h,ce,sn),b=E.default.join(h,ce,an);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:l,mainLogPath:f,errorLogPath:b,reportsDir:A,deviceKeypairPath:_,configPath:E.default.join(h,"config.json"),harnessRootDir:S,harnessManifestPath:E.default.join(S,Vi),harnessSetsDir:E.default.join(S,Gi)}}let s=E.default.join(t,Bi),a=E.default.join(t,rs),i=E.default.join(t,ce),c=E.default.join(t,zi),p=E.default.join(t,dt),d=E.default.join(t,ce,sn),u=E.default.join(t,ce,an);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:a,logsDir:i,mainLogPath:d,errorLogPath:u,reportsDir:c,deviceKeypairPath:p,configPath:E.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:E.default.join(s,Vi),harnessSetsDir:E.default.join(s,Gi)}}});var cn,ss,Qi,j,el,Ue=m(()=>{"use strict";cn=g(require("node:fs")),ss=g(require("node:path"));L();Qi=e=>{let t=ss.default.join(e,Fe);return cn.default.existsSync(t)?cn.default.readdirSync(t).filter(r=>cn.default.statSync(ss.default.join(t,r)).isDirectory()).map(r=>ut(r)).toSorted():[]},j=(e=v())=>{let t=de(e);return[{profileEmail:Qi(e)[0]??null,launchAgentLabel:t}]},el=(e=v())=>Qi(e)});var dn,mt,tl,as,rl,Lh,nl,Rh,kh,Jt,xh,ol,un=m(()=>{"use strict";dn=require("node:child_process"),mt=g(require("node:fs")),tl=g(require("node:os")),as=g(require("node:path")),rl=require("node:util");Ue();L();Lh=(0,rl.promisify)(dn.execFile),nl=()=>as.default.join(tl.default.homedir(),"Library","LaunchAgents"),Rh=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Lh("launchctl",["bootout",r]).catch(()=>{})},kh=e=>{let t=as.default.join(nl(),`${e}.plist`);mt.default.existsSync(t)&&mt.default.unlinkSync(t)},Jt=(e=v())=>{let t=de(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of j(e))r.add(o.launchAgentLabel);let n=nl();if(mt.default.existsSync(n))for(let o of mt.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},xh=e=>{(0,dn.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},ol=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=v();if(!mt.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Jt(e);for(let r of t)await Rh(r),kh(r);return xh(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var mn,is=m(()=>{"use strict";Xo();un();L();mn=(e=v())=>{for(let t of Jt(e))rn(t)}});var sl,Th,Ch,al,il=m(()=>{"use strict";sl=require("node:child_process");Yo();Th=e=>e.trim().toLowerCase(),Ch=e=>e==null?!1:!Di.has(Th(e)),al=()=>{if(process.platform!=="darwin")return null;try{let t=(0,sl.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Ch(t)?t:null}catch{return null}}});var cl,ll,ue,Yt=m(()=>{"use strict";cl=g(require("node:os"));il();ll=e=>e.trim().toLowerCase(),ue=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?al():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??cl.default.userInfo().username;return ll(r)===ll(n)}});var pt,pn,gn=m(()=>{"use strict";Yo();is();Yt();pt=e=>{ue()||(mn(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},pn=(e,t=Fi)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{ue()||e()},t);return()=>{clearInterval(r)}}});var dl,ul,ml,fn,hn,pl,gl,gt=m(()=>{"use strict";dl=".agent-witch",ul="memory",ml="project.json",fn="chunks.ndjson",hn="runs.ndjson",pl="reports",gl=".json"});var fl,yn,ls=m(()=>{"use strict";fl=g(require("node:path"));gt();yn=(e,t)=>fl.default.join(e.trim(),`${t.trim()}${gl}`)});var je,hl,yl=m(()=>{"use strict";ct();je=e=>`'${e.replace(/'/g,"'\\''")}'`,hl=e=>{let t=`${e.installDir.trim()}/${"app"}/${le}`,r=[je("node"),je(t),"report","write","--key",je(e.reportKey.trim()),"--agent-run-id",je(e.agentRunId.trim()),"--status",je(e.status),"--summary",je(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",je(e.details.trim())),r.join(" ")}});var re,Al,Ih,Sl,An=m(()=>{"use strict";ls();yl();re={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Al=e=>e===re.COMPLETED||e===re.FAILED,Ih=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Sl=(e,t)=>{let r=yn(t.reportsDir,t.reportKey),n=hl({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:re.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${Ih({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Xt,bl,_l,wl,Ph,Sn,Nh,Oh,Zt,_n,vl,El,Qt=m(()=>{"use strict";Xt=g(require("node:fs")),bl=g(require("node:path"));An();ls();L();_l=50,wl=e=>{let t=W(),r=yn(t.reportsDir,e);return Xt.default.mkdirSync(bl.default.dirname(r),{recursive:!0}),r},Ph=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Sn=e=>{let t=wl(e);if(!Xt.default.existsSync(t))return null;try{let r=JSON.parse(Xt.default.readFileSync(t,"utf8"));return Ph(r)?r:null}catch{return null}},Nh=(e,t)=>{let r=[...e,t];return r.length>_l?r.slice(r.length-_l):r},Oh=e=>{let t=wl(e.reportKey);Xt.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Zt=e=>{let t=Sn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Nh(t?.history??[],n)};return Oh(o),o},_n=e=>{let t=Sn(e.reportKey);return t!==null?t:Zt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:re.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},vl=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},El=e=>{if(e===null||!Al(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===re.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Mh,Hh,er,Wl,bn,cs=m(()=>{"use strict";An();Qt();Mh=new Set(Object.values(re)),Hh=e=>Mh.has(e),er=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},Wl=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},bn=e=>{if(e[0]!=="write")return Wl(),1;let r=er(e,"--key"),n=er(e,"--agent-run-id"),o=er(e,"--status"),s=er(e,"--summary"),a=er(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!Hh(o)?(Wl(),1):(Zt({reportKey:r,agentRunId:n,status:o,userSummary:s,details:a}),0)}});var ds,Ll,ft,wn=m(()=>{"use strict";ds=g(require("node:path")),Ll=require("node:url");lt();ft=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=ds.default.resolve(t);return te()?r===ds.default.resolve(__filename):r===(0,Ll.fileURLToPath)(e)}});var tr,us,Uh,jh,Tl,$,Cl,vn,$e=m(()=>{"use strict";tr=g(require("node:fs")),us=g(require("node:path"));L();Uh="install-version.json",jh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tl=(e=v())=>us.default.join(e,Uh),$=(e=v())=>{let t=Tl(e);if(!tr.default.existsSync(t))return null;try{let r=JSON.parse(tr.default.readFileSync(t,"utf8"));return!jh(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Cl=(e,t=v())=>{let r=Tl(t);tr.default.mkdirSync(us.default.dirname(r),{recursive:!0}),tr.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},vn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var Pl,Nl,Ol,Ml,Hl,rr,$h,Bh,Gh,Il,We,nr=m(()=>{"use strict";Pl=require("node:child_process"),Nl=g(require("node:fs")),Ol=g(require("node:os")),Ml=g(require("node:path")),Hl=require("node:util");Yt();rr=(0,Hl.promisify)(Pl.execFile),$h=e=>Ml.default.join(Ol.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Bh=async e=>{try{return await rr("launchctl",["print",e]),!0}catch{return!1}},Gh=async(e,t,r)=>{await Bh(t)&&await rr("launchctl",["bootout",t]).catch(()=>{}),await rr("launchctl",["bootstrap",e,r]),await rr("launchctl",["enable",t])},Il=async e=>{try{return await rr("launchctl",["kickstart","-k",e]),!0}catch{return!1}},We=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!ue())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await Il(n))return{ok:!0};let o=$h(e);if(!Nl.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Gh(r,n,o),await Il(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var Vh,En,ms=m(()=>{"use strict";Xo();un();Ue();L();Vh=(e=v())=>{let t=new Set(j(e).map(r=>r.launchAgentLabel));return Jt(e).filter(r=>!t.has(r))},En=(e=v())=>{for(let t of Vh(e))rn(t)}});var J,ht=m(()=>{"use strict";J=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Dl,Be,ps,zh,Kh,Fl,yt,Wn,gs=m(()=>{"use strict";Dl=require("node:crypto"),Be=g(require("node:fs")),ps=g(require("node:path"));L();zh="self-update-log.ndjson",Kh=100,Fl=(e=v())=>{let t=W(),r=t.installDir===e?t.logsDir:ln({installDir:e,profileEmail:t.profileEmail});return ps.default.join(r,zh)},yt=(e,t=v())=>{let r={id:(0,Dl.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Fl(t);Be.default.mkdirSync(ps.default.dirname(n),{recursive:!0});let o=Be.default.existsSync(n)?Be.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Kh+1)),JSON.stringify(r)];return Be.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Wn=(e=20,t=v())=>{let r=Fl(t);if(!Be.default.existsSync(r))return[];let n=Be.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Ul,jl,$l=m(()=>{"use strict";Ul="deps.tar.gz",jl="deps"});var Gl,Le,Ge,qh,Vl,zl,Kl=m(()=>{"use strict";Gl=require("node:child_process"),Le=g(require("node:fs")),Ge=g(require("node:path"));$l();qh=e=>Ge.default.join(e,"app",jl),Vl=e=>{let t=Ge.default.join(e,"app"),r=Ge.default.join(t,Ul);Le.default.existsSync(r)&&(Le.default.rmSync(qh(e),{recursive:!0,force:!0}),Le.default.mkdirSync(t,{recursive:!0}),(0,Gl.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Le.default.rmSync(r,{force:!0}))},zl=e=>{Le.default.rmSync(Ge.default.join(e,"node_modules"),{recursive:!0,force:!0}),Le.default.rmSync(Ge.default.join(e,"package.json"),{force:!0}),Le.default.rmSync(Ge.default.join(e,"package-lock.json"),{force:!0})}});var Rn={};De(Rn,{buildAgentWitchSelfUpdateStatus:()=>ys,fetchAgentWitchRemoteInstallBundleVersion:()=>fs,runAgentWitchSelfUpdate:()=>hs});var Re,Ln,ql,Jh,Jl,fs,Yh,Xh,or,hs,ys,At=m(()=>{"use strict";Re=g(require("node:fs")),Ln=g(require("node:path"));$e();nr();ms();Ue();ht();L();ct();gs();Kl();ql=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jh=e=>{let t=Ee(e),r=t===null?W():W(t);if(!Re.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Re.default.readFileSync(r.configPath,"utf8"));return!ql(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},Jl=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!ql(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},fs=async e=>(await Jl(e))?.bundleVersion??null,Yh=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=Ln.default.join(t,r);Re.default.mkdirSync(Ln.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());Re.default.writeFileSync(o,s),r.endsWith(".js")&&Re.default.chmodSync(o,493)},Xh=async()=>{En();let e=j();for(let t of e)await We(t.launchAgentLabel)},or=(e,t)=>({localBundleVersion:t,...e}),hs=async e=>{let t=v(),r=$(t),n=r?.bundleVersion??null,o=Jh(t),s=o===null?r?.appOrigin??null:J(o);if(s===null){let c=or({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return yt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let a=await Jl(s);if(a===null){let c=or({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return yt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||vn(n,a.bundleVersion))){let c=or({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},n);return yt({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),c}try{for(let d of a.scripts)await Yh(s,t,d);let c=Ln.default.join(t,le);Re.default.existsSync(c)&&Re.default.rmSync(c,{force:!0}),Vl(t),zl(t),Cl({bundleVersion:a.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await Xh();let p=or({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return yt({event:"update_applied",ok:!0,message:p.message,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),p}catch(c){let p=c instanceof Error?c.message:"Agent Witch self-update failed.",d=or({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},n);return yt({event:"update_failed",ok:!1,message:p,localBundleVersion:n,remoteBundleVersion:a.bundleVersion}),d}},ys=()=>{let e=v();return{local:$(e),logs:Wn(20,e)}}});var kn,sr,Yl,As,ar,Ss=m(()=>{"use strict";kn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=i=>n.find(c=>c.type===i)?.value??"0",s=o("weekday"),a={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:a[s]??0}},sr=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=kn(o,t),a=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-a*6e4)},Yl=e=>e>=1&&e<=5,As=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return kn(t,"UTC")},ar=e=>{let t=e.from??new Date,r=kn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return sr(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=sr(r,e.timeZone,n,0),s=kn(o,e.timeZone),a=t.getTime()>=o.getTime();if(e.preset==="daily")return a?sr(As(r),e.timeZone,n,0):o;if(!a&&Yl(s.weekday))return o;let i=r;for(let c=0;c<8;c+=1)if(i=As(i),Yl(i.weekday))return sr(i,e.timeZone,n,0);return sr(As(r),e.timeZone,n,0)}});var Zh,xn,_s=m(()=>{"use strict";Zh=e=>e==="hourly"||e==="daily"||e==="weekdays",xn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",a=typeof t.schedulePreset=="string"?t.schedulePreset:"",i=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!Zh(a)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:a,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:i,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var ir,Tn,Xl,Zl,bs,ke,Ql,ec,tc,rc,lr=m(()=>{"use strict";ir=g(require("node:fs")),Tn=g(require("node:path"));_s();Xl="automations.json",Zl=e=>e.profileEmail!==null?Tn.default.join(e.installDir,"profiles",e.profileEmail,Xl):Tn.default.join(e.installDir,Xl),bs=()=>({version:1,automations:[]}),ke=e=>{let t=Zl(e);if(!ir.default.existsSync(t))return bs();try{let r=JSON.parse(ir.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?bs():{version:1,automations:r.automations.flatMap(o=>{let s=xn(o);return s!==null?[s]:[]})}}catch{return bs()}},Ql=(e,t)=>{let r=Zl(e);ir.default.mkdirSync(Tn.default.dirname(r),{recursive:!0}),ir.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ec=(e,t)=>{Ql(e,{version:1,automations:t})},tc=(e,t)=>{let n=ke(e).automations.filter(o=>o.id!==t.id);Ql(e,{version:1,automations:[...n,t]})},rc=(e,t)=>ke(e).automations.find(r=>r.id===t)??null});var Qh,ey,Cn,ws=m(()=>{"use strict";Ss();_s();lr();L();Qh=e=>e!==void 0&&e.trim().length>0?W(e.trim()):W(),ey=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??ar({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??ar({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Cn=e=>{let t=Qh(e.profileEmail),r=ke(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let a=xn(s);return a!==null?[ey(a,n.get(a.id))]:[]});return ec(t,o),{ok:!0,writtenCount:o.length}}});var nc,oc=m(()=>{"use strict";nc="x-agent-witch-token"});var St,vs,sc,In,ac,cr=m(()=>{"use strict";oc();ht();St=e=>{let t=J(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},vs=e=>({[nc]:e,"Content-Type":"application/json"}),sc=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:vs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,a=typeof s.id=="string"?s.id:"",i=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return a.length===0||i.length===0?null:{id:a,prompt:i,writerAgent:c}}catch{return null}},In=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:vs(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},ac=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:vs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Pn,dr,N,xe,ic,_t,Ve=m(()=>{"use strict";Pn={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},dr=e=>e.trim().length>0,N=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",xe=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:dr(t)?t.trim():Pn.claudeCommand,codexCommand:dr(r)?r.trim():Pn.codexCommand,cursorCommand:dr(n)?n.trim():Pn.cursorCommand,antigravityCommand:dr(o)?o.trim():Pn.antigravityCommand}},ic=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},_t=(e,t,r,n)=>{let o=t.trim();if(!dr(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var lc,bt,Nn=m(()=>{"use strict";lc=require("node:child_process");Ve();bt=(e,t,r)=>new Promise(n=>{if(!N(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=_t(t,r,xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,lc.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),a=[];s.stdout?.on("data",i=>{a.push(i.toString("utf8"))}),s.stderr?.on("data",i=>{a.push(i.toString("utf8"))}),s.on("close",i=>{n({exitCode:i??-1,output:a.join("")})}),s.on("error",i=>{n({exitCode:-1,output:i.message})})})});var Es,Ws,Ls=m(()=>{"use strict";Es="https://www.agentwitch.com",Ws="wss://www.agentwitch.com/api/agent-witch/ws"});var On,cc,Rs=m(()=>{"use strict";On=".agent-witch",cc=".local-agent-witch"});var dc,ty,ks,Mn,xs=m(()=>{"use strict";dc=g(require("node:path"));Ls();Rs();ty="ws://localhost:3000/api/agent-witch/ws",ks=e=>e.replace(/\/$/,""),Mn=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return ks(t);let r=dc.default.basename(e.installDir);if(r===On)return Ws;let n=e.configWsUrl?.trim()??"";return r===cc?n.length>0?ks(n):ty:n.length>0?ks(n):Ws}});var Ts,ry,ny,oy,sy,ay,D,ze=m(()=>{"use strict";Ts=g(require("node:fs"));xs();L();ry="claude",ny="codex",oy="cursor",sy="agy",ay=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),D=()=>{let e=W();if(!Ts.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Ts.default.readFileSync(e.configPath,"utf8"));if(!ay(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=Mn({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:ry,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:ny,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:oy,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:sy,pairingToken:s,layout:e}}catch{return null}}});var uc,Cs,wt,Hn=m(()=>{"use strict";uc=require("node:crypto");cr();Ss();Nn();lr();ze();Cs=!1,wt=async e=>{if(Cs)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=D();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=St({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=rc(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};Cs=!0;let o=(0,uc.randomUUID)();try{let s=await bt(t,"claude-cli",n.prompt);await ac(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let a=new Date,i=ar({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:a});return tc(t.layout,{...n,lastRunAt:a.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:i.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{Cs=!1}}});function ur(e){return(0,mc.createHash)("sha256").update(e.trim()).digest("hex")}var mc,Is=m(()=>{"use strict";mc=require("node:crypto")});var iy,pc,ly,cy,mr,gc,Ps=m(()=>{"use strict";iy=["agentwitch.com","www.agentwitch.com"],pc=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,ly=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},cy=e=>{let t=ly(e);return!!(iy.includes(t)||pc.test(e.trim().toLowerCase()))},mr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return cy(r)?pc.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},gc=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:mr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Dn,fc,dy,uy,hc,yc,Ns,Fn,Un=m(()=>{"use strict";Dn=g(require("node:fs")),fc=g(require("node:path")),dy="wake-port.json",uy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hc=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,yc=e=>fc.default.join(e,dy),Ns=e=>{let t=yc(e);if(!Dn.default.existsSync(t))return null;try{let r=JSON.parse(Dn.default.readFileSync(t,"utf8"));if(uy(r)&&hc(r.wakePort))return r.wakePort}catch{return null}return null},Fn=(e,t)=>{if(!hc(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=yc(e);Dn.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Sv,_v,bv,Y,Ac,vt=m(()=>{"use strict";Un();L();Un();Sv=os(),_v=`${de()}-wake`,bv=de(),Y=()=>{let e=v(),t=Ns(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return os()},Ac=e=>{let t=v();Ns(t)===null&&Fn(t,e)}});var Et,pr,my,Sc,_c,bc=m(()=>{"use strict";Et=g(require("node:fs")),pr=g(require("node:path"));Is();L();my=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sc=e=>{if(!Et.default.existsSync(e))return null;try{let t=JSON.parse(Et.default.readFileSync(e,"utf8"));return!my(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:ur(t.pairingToken.trim())}catch{return null}},_c=(e=v())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(Sc(pr.default.join(e,"config.json")));let o=pr.default.join(e,Fe);if(!Et.default.existsSync(o))return t;for(let s of Et.default.readdirSync(o)){let a=pr.default.join(o,s);Et.default.statSync(a).isDirectory()&&n(Sc(pr.default.join(a,"config.json")))}return t}});var wc,vc=m(()=>{"use strict";wc=["rule","skill","command","instruction","agent"]});var Ec,py,gy,Wc,Lc=m(()=>{"use strict";vc();Ec=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),py=e=>typeof e=="string"&&wc.includes(e),gy=e=>{if(!Ec(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!py(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Wc=e=>{if(!Ec(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let a=gy(s);return a===null?[]:[a]});return{name:t,slug:r,items:o}}});var Rc,fy,hy,yy,Ay,Sy,_y,by,wy,jn,Os=m(()=>{"use strict";Rc=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},fy=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},hy=(e,t)=>{let r=fy(t),n=Rc(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},yy=(e,t,r)=>{let n=hy(t,r);return`shared/items/${e}/${n}`},Ay=["rules","skills","commands","instructions","agents"],Sy=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),_y=(e,t)=>[...e.filter(n=>n.id!==t.id),t],by=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},wy=e=>({id:e.id,kind:e.kind,title:e.title,path:yy(e.id,e.kind,e.title)}),jn=e=>{let t=new Date().toISOString(),r=e.existingManifest??Sy(e.hostname,t),n=Rc(e.bundle.slug),o=by(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...Ay.map(p=>`sets/${n}/${p}`),"shared/items"],{files:a,nextItems:i}=e.bundle.items.reduce((p,d)=>{let u=wy(d);return{files:[...p.files,{relativePath:u.path,content:d.content}],nextItems:_y(p.nextItems,u)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:i}}},directories:s,files:a}}});var Te,kc,$n,vy,xc,Tc=m(()=>{"use strict";Te=g(require("node:fs")),kc=g(require("node:os")),$n=g(require("node:path"));Os();L();vy=e=>{if(!Te.default.existsSync(e))return null;try{let t=JSON.parse(Te.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},xc=e=>{let t=W(e.profileEmail);try{let r=vy(t.harnessManifestPath),n=jn({bundle:e.bundle,hostname:kc.default.hostname(),existingManifest:r});Te.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)Te.default.mkdirSync($n.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=$n.default.join(t.harnessRootDir,o.relativePath);Te.default.mkdirSync($n.default.dirname(s),{recursive:!0}),Te.default.writeFileSync(s,o.content)}return Te.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var Cc,Ic,Bn,Ms=m(()=>{"use strict";Cc=require("node:child_process"),Ic=g(require("node:fs"));Yt();L();Bn=(e=v())=>{let t=ns(e);if(!Ic.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!ue())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ee(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,Cc.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var Hs,ne,Hv,Wt=m(()=>{"use strict";L();Hs="connection-health.json",ne=12e4,Hv=`${de()}-watchdog`});var Pc,Ke,Ds,Ey,Wy,Ly,Nc,Ry,Oc,Gn,Vn=m(()=>{"use strict";Pc=require("node:crypto"),Ke=g(require("node:fs")),Ds=g(require("node:path"));L();Ey="watchdog-log.ndjson",Wy=200,Ly=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nc=(e=v())=>{let t=W(),r=t.installDir===e?t.logsDir:ln({installDir:e,profileEmail:t.profileEmail});return Ds.default.join(r,Ey)},Ry=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Ly(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Oc=(e,t=v())=>{let r={id:(0,Pc.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=Nc(t);Ke.default.mkdirSync(Ds.default.dirname(n),{recursive:!0});let o=Ke.default.existsSync(n)?Ke.default.readFileSync(n,"utf8").split(`
`).filter(a=>a.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Wy+1)),JSON.stringify(r)];return Ke.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Gn=(e=20,t=v())=>{let r=Nc(t);if(!Ke.default.existsSync(r))return[];let n=Ke.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=Ry(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var gr,zn,ky,Mc,X,Fs,oe,fr=m(()=>{"use strict";gr=g(require("node:fs")),zn=g(require("node:path"));Wt();ky=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mc=e=>e.profileEmail===null?zn.default.join(e.installDir,Hs):zn.default.join(e.installDir,"profiles",e.profileEmail,Hs),X=e=>{let t=Mc(e);if(!gr.default.existsSync(t))return null;try{let r=JSON.parse(gr.default.readFileSync(t,"utf8"));return!ky(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},Fs=(e,t)=>{let r=Mc(e),n=X(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};gr.default.mkdirSync(zn.default.dirname(r),{recursive:!0}),gr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},oe=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Hc,Dc,xy,hr,Us=m(()=>{"use strict";Hc=require("node:child_process"),Dc=require("node:util"),xy=(0,Dc.promisify)(Hc.execFile),hr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await xy("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Fc,js=m(()=>{"use strict";Fc="watchdog-reinstall-state.json"});var Uc={};De(Uc,{verifyAgentWitchReviveAfterKickstart:()=>Iy});var Cy,Iy,jc=m(()=>{"use strict";js();fr();Us();L();Cy=e=>new Promise(t=>{setTimeout(t,e)}),Iy=async e=>{if(await Cy(e.verifyDelayMs??3e3),!await hr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?W():W(e.profileEmail),n=X(r);return!oe(n,e.staleAfterMs)}});var yr,$s,Ny,$c,Oy,Bc,Gc,Vc=m(()=>{"use strict";yr=g(require("node:fs")),$s=g(require("node:path"));js();L();Ny=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$c=e=>$s.default.join(e,Fc),Oy=(e=v())=>{let t=$c(e);if(!yr.default.existsSync(t))return null;try{let r=JSON.parse(yr.default.readFileSync(t,"utf8"));return!Ny(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Bc=(e=v(),t=Date.now())=>{let r=Oy(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},Gc=(e=v(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=$c(e);return yr.default.mkdirSync($s.default.dirname(n),{recursive:!0}),yr.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var zc,Lt,Kc,qc,Jc,My,Hy,Yc,Dy,Fy,Xc,Zc=m(()=>{"use strict";zc=require("node:child_process"),Lt=g(require("node:fs")),Kc=g(require("node:os")),qc=g(require("node:path")),Jc=require("node:util");$e();ht();L();My=(0,Jc.promisify)(zc.execFile),Hy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yc=e=>{let t=Ee(e),r=t===null?W():W(t);if(!Lt.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Lt.default.readFileSync(r.configPath,"utf8"));return!Hy(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},Dy=e=>Yc(e)?.wsUrl??null,Fy=e=>{let t=Dy(e);return t!==null?J(t):$(e)?.appOrigin??null},Xc=async e=>{let t=e?.installDir??v(),r=Yc(t),n=r!==null?J(r.wsUrl):Fy(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let a=qc.default.join(Kc.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Lt.default.writeFileSync(a,await s.text(),{encoding:"utf8",mode:448});let i=e?.profileEmail??Ee(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...i===null?{}:{AGENT_WITCH_PROFILE:i}};return await My("bash",[a],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Agent Witch reinstall script failed."}}finally{Lt.default.existsSync(a)&&Lt.default.unlinkSync(a)}}});var Qc={};De(Qc,{attemptAgentWitchWatchdogReinstall:()=>Uy});var Uy,ed=m(()=>{"use strict";Vc();nr();Zc();Uy=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!Bc())return{attempted:!1,ok:!1,targets:e};Gc();let r=await Xc();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await We(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var td,rd,nd,jy,$y,By,Bs,Gs=m(()=>{"use strict";Yt();Wt();fr();Us();nr();Ue();L();Ms();Vn();td=e=>e===null?W():W(e),rd=async(e,t,r)=>{if(!await hr(e))return"not_running";let o=td(t),s=X(o);return oe(s,r)?"stale_connection":"healthy"},nd=async e=>{let t=e?.staleAfterMs??ne,r=v(),n=j(r);return Promise.all(n.map(async o=>{let s=await rd(o.launchAgentLabel,o.profileEmail,t),a=td(o.profileEmail),i=X(a),c=await hr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:i,isConnectionStale:oe(i,t),needsRevive:s!=="healthy",reason:s}}))},jy=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},$y=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",By=async e=>{let t=await We(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(jc(),Uc)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Bs=async e=>{if(!ue())return{ok:!0,targets:[]};let t=e?.staleAfterMs??ne,r=v(),n=j(r),o=[];for(let d of n){let u=await rd(d.launchAgentLabel,d.profileEmail,t);if(u==="healthy"){o.push({launchAgentLabel:d.launchAgentLabel,profileEmail:d.profileEmail,revived:!1,reason:u});continue}o.push(await By({launchAgentLabel:d.launchAgentLabel,profileEmail:d.profileEmail,reason:u,staleAfterMs:t}))}if(o.length===0){let d=Bn();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:d.ok,reason:"not_running",...d.errorMessage!==void 0?{errorMessage:d.errorMessage}:{}})}let s=!1,a=!1,i,c=o;if(o.some(d=>d.reason!=="healthy"&&!d.revived))try{let{attemptAgentWitchWatchdogReinstall:d}=await Promise.resolve().then(()=>(ed(),Qc)),u=await d(o);s=u.attempted,a=u.ok,i=u.errorMessage,c=[...u.targets]}catch(d){s=!0,a=!1,i=d instanceof Error?d.message:"Watchdog reinstall helper is unavailable."}let p={ok:c.some(d=>d.revived||d.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:a,...i!==void 0?{reinstallErrorMessage:i}:{}}:{}};return e?.skipLog!==!0&&Oc({event:$y(c,p.ok,{reinstallAttempted:s,reinstallOk:a}),ok:p.ok,message:jy(c,{reinstallAttempted:s,reinstallOk:a,reinstallErrorMessage:i}),targets:c}),p}});var od,sd,ad=m(()=>{"use strict";od=g(require("node:os"));Wt();Vn();Gs();sd=async()=>{let e=await nd(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:od.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:ne,healthyProfileCount:t,profiles:e,lastLog:Gn(1)[0]??null}}});var id={};De(id,{buildAgentWitchAutomationStatusFromWakeServer:()=>qs,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>ta,buildAgentWitchWakeHealthResponse:()=>Js,buildAgentWitchWakeIdentityResponse:()=>Ys,buildAgentWitchWatchdogStatus:()=>Zs,installHarnessFromWakeServer:()=>qn,readAgentWitchSelfUpdateLogEntries:()=>Yn,readAgentWitchWatchdogLogEntries:()=>Jn,restartAgentWitchFromWakeServer:()=>ea,reviveAgentWitchWebSocketFromWakeServer:()=>Qs,runAgentWitchSelfUpdateFromWakeServer:()=>ra,runAgentWitchUninstallLocalFromWakeServer:()=>na,runAutomationFromWakeServer:()=>Ks,syncAutomationsFromWakeServer:()=>zs,wakeAgentWitchLaunchAgents:()=>Xs});var Kn,Vs,qn,zs,Ks,qs,Js,Ys,Xs,Jn,Zs,Qs,ea,ta,Yn,ra,na,oa=m(()=>{"use strict";ws();Hn();lr();Is();ze();Kn=g(require("node:os"));Ps();vt();nr();Ue();bc();Lc();Tc();Ms();ad();Vn();At();un();gs();Gs();Vs=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qn=e=>{if(!Vs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Wc(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=xc({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},zs=e=>{if(!Vs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!mr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=Cn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Ks=async e=>{if(!Vs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:mr(t)?wt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},qs=()=>{let e=D(),t=e!==null?ke(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Kn.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},Js=()=>{let e=j();return{ok:!0,port:Y(),hostname:Kn.default.hostname(),profileCount:e.length}},Ys=()=>{let e=j(),t=D()?.pairingToken.trim()??"",r=t.length>0?ur(t):null,n=_c();return{hostname:Kn.default.hostname(),port:Y(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Xs=async()=>{let e=j(),t=[];for(let r of e){let n=await We(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Bn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Jn=(e=20)=>Gn(e),Zs=sd,Qs=Bs,ea=Bs,ta=ys,Yn=(e=20)=>Wn(e),ra=e=>hs(e),na=()=>ol()});var me=U((D0,dd)=>{"use strict";var ld=["nodebuffer","arraybuffer","fragments"],cd=typeof Blob<"u";cd&&ld.push("blob");dd.exports={BINARY_TYPES:ld,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:cd,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Ar=U((F0,Xn)=>{"use strict";var{EMPTY_BUFFER:Gy}=me(),sa=Buffer[Symbol.species];function Vy(e,t){if(e.length===0)return Gy;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new sa(r.buffer,r.byteOffset,n):r}function ud(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function md(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function zy(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function aa(e){if(aa.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new sa(e):ArrayBuffer.isView(e)?t=new sa(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),aa.readOnly=!1),t}Xn.exports={concat:Vy,mask:ud,toArrayBuffer:zy,toBuffer:aa,unmask:md};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Xn.exports.mask=function(t,r,n,o,s){s<48?ud(t,r,n,o,s):e.mask(t,r,n,o,s)},Xn.exports.unmask=function(t,r){t.length<32?md(t,r):e.unmask(t,r)}}catch{}});var fd=U((U0,gd)=>{"use strict";var pd=Symbol("kDone"),ia=Symbol("kRun"),la=class{constructor(t){this[pd]=()=>{this.pending--,this[ia]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[ia]()}[ia](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[pd])}}};gd.exports=la});var xt=U((j0,Sd)=>{"use strict";var Sr=require("zlib"),hd=Ar(),Ky=fd(),{kStatusCode:yd}=me(),qy=Buffer[Symbol.species],Jy=Buffer.from([0,0,255,255]),Qn=Symbol("permessage-deflate"),pe=Symbol("total-length"),Rt=Symbol("callback"),Ce=Symbol("buffers"),kt=Symbol("error"),Zn,ca=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Zn){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Zn=new Ky(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Rt];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Zn.add(o=>{this._decompress(t,r,(s,a)=>{o(),n(s,a)})})}compress(t,r,n){Zn.add(o=>{this._compress(t,r,(s,a)=>{o(),n(s,a)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?Sr.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Sr.createInflateRaw({...this._options.zlibInflateOptions,windowBits:a}),this._inflate[Qn]=this,this._inflate[pe]=0,this._inflate[Ce]=[],this._inflate.on("error",Xy),this._inflate.on("data",Ad)}this._inflate[Rt]=n,this._inflate.write(t),r&&this._inflate.write(Jy),this._inflate.flush(()=>{let s=this._inflate[kt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let a=hd.concat(this._inflate[Ce],this._inflate[pe]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[pe]=0,this._inflate[Ce]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,a)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,a=typeof this.params[s]!="number"?Sr.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Sr.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:a}),this._deflate[pe]=0,this._deflate[Ce]=[],this._deflate.on("data",Yy)}this._deflate[Rt]=n,this._deflate.write(t),this._deflate.flush(Sr.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=hd.concat(this._deflate[Ce],this._deflate[pe]);r&&(s=new qy(s.buffer,s.byteOffset,s.length-4)),this._deflate[Rt]=null,this._deflate[pe]=0,this._deflate[Ce]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};Sd.exports=ca;function Yy(e){this[Ce].push(e),this[pe]+=e.length}function Ad(e){if(this[pe]+=e.length,this[Qn]._maxPayload<1||this[pe]<=this[Qn]._maxPayload){this[Ce].push(e);return}this[kt]=new RangeError("Max payload size exceeded"),this[kt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[kt][yd]=1009,this.removeListener("data",Ad),this.reset()}function Xy(e){if(this[Qn]._inflate=null,this[kt]){this[Rt](this[kt]);return}e[yd]=1007,this[Rt](e)}});var Tt=U(($0,eo)=>{"use strict";var{isUtf8:_d}=require("buffer"),{hasBlob:Zy}=me(),Qy=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function eA(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function da(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function tA(e){return Zy&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}eo.exports={isBlob:tA,isValidStatusCode:eA,isValidUTF8:da,tokenChars:Qy};if(_d)eo.exports.isValidUTF8=function(e){return e.length<24?da(e):_d(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");eo.exports.isValidUTF8=function(t){return t.length<32?da(t):e(t)}}catch{}});var fa=U((B0,Rd)=>{"use strict";var{Writable:rA}=require("stream"),bd=xt(),{BINARY_TYPES:nA,EMPTY_BUFFER:wd,kStatusCode:oA,kWebSocket:sA}=me(),{concat:ua,toArrayBuffer:aA,unmask:iA}=Ar(),{isValidStatusCode:lA,isValidUTF8:vd}=Tt(),to=Buffer[Symbol.species],V=0,Ed=1,Wd=2,Ld=3,ma=4,pa=5,ro=6,ga=class extends rA{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||nA[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[sA]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=V}_write(t,r,n){if(this._opcode===8&&this._state==V)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new to(n.buffer,n.byteOffset+t,n.length-t),new to(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new to(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case V:this.getInfo(t);break;case Ed:this.getPayloadLength16(t);break;case Wd:this.getPayloadLength64(t);break;case Ld:this.getMask();break;case ma:this.getData(t);break;case pa:case ro:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[bd.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Ed:this._payloadLength===127?this._state=Wd:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Ld:this._state=ma}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=ma}getData(t){let r=wd;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&iA(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=pa,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[bd.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let a=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(a);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let a=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(a);return}this._fragments.push(s)}this.dataMessage(r),this._state===V&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=V;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=ua(n,r):this._binaryType==="arraybuffer"?o=aA(ua(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=V):(this._state=ro,setImmediate(()=>{this.emit("message",o,!0),this._state=V,this.startLoop(t)}))}else{let o=ua(n,r);if(!this._skipUTF8Validation&&!vd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===pa||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=V):(this._state=ro,setImmediate(()=>{this.emit("message",o,!1),this._state=V,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,wd),this.end();else{let n=t.readUInt16BE(0);if(!lA(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new to(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!vd(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=V;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=V):(this._state=ro,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=V,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let a=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(a,this.createError),a.code=s,a[oA]=o,a}};Rd.exports=ga});var Aa=U((V0,Td)=>{"use strict";var{Duplex:G0}=require("stream"),{randomFillSync:cA}=require("crypto"),{types:{isUint8Array:dA}}=require("util"),kd=xt(),{EMPTY_BUFFER:uA,kWebSocket:mA,NOOP:pA}=me(),{isBlob:Ct,isValidStatusCode:gA}=Tt(),{mask:xd,toBuffer:qe}=Ar(),z=Symbol("kByteLength"),fA=Buffer.alloc(4),no=8*1024,Je,It=no,Z=0,hA=1,yA=2,ha=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Z,this.onerror=pA,this[mA]=void 0}static frame(t,r){let n,o=!1,s=2,a=!1;r.mask&&(n=r.maskBuffer||fA,r.generateMask?r.generateMask(n):(It===no&&(Je===void 0&&(Je=Buffer.alloc(no)),cA(Je,0,no),It=0),n[0]=Je[It++],n[1]=Je[It++],n[2]=Je[It++],n[3]=Je[It++]),a=(n[0]|n[1]|n[2]|n[3])===0,s=6);let i;typeof t=="string"?(!r.mask||a)&&r[z]!==void 0?i=r[z]:(t=Buffer.from(t),i=t.length):(i=t.length,o=r.mask&&r.readOnly&&!a);let c=i;i>=65536?(s+=8,c=127):i>125&&(s+=2,c=126);let p=Buffer.allocUnsafe(o?i+s:s);return p[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(p[0]|=64),p[1]=c,c===126?p.writeUInt16BE(i,2):c===127&&(p[2]=p[3]=0,p.writeUIntBE(i,4,6)),r.mask?(p[1]|=128,p[s-4]=n[0],p[s-3]=n[1],p[s-2]=n[2],p[s-1]=n[3],a?[p,t]:o?(xd(t,n,p,s,i),[p]):(xd(t,n,t,0,i),[p,t])):[p,t]}close(t,r,n,o){let s;if(t===void 0)s=uA;else{if(typeof t!="number"||!gA(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let i=Buffer.byteLength(r);if(i>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+i),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(dA(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let a={[z]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Z?this.enqueue([this.dispatch,s,!1,a,o]):this.sendFrame(e.frame(s,a),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Ct(t)?(o=t.size,s=!1):(t=qe(t),o=t.length,s=qe.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[z]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Ct(t)?this._state!==Z?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==Z?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Ct(t)?(o=t.size,s=!1):(t=qe(t),o=t.length,s=qe.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let a={[z]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Ct(t)?this._state!==Z?this.enqueue([this.getBlobData,t,!1,a,n]):this.getBlobData(t,!1,a,n):this._state!==Z?this.enqueue([this.dispatch,t,!1,a,n]):this.sendFrame(e.frame(t,a),n)}send(t,r,n){let o=this._extensions[kd.extensionName],s=r.binary?2:1,a=r.compress,i,c;typeof t=="string"?(i=Buffer.byteLength(t),c=!1):Ct(t)?(i=t.size,c=!1):(t=qe(t),i=t.length,c=qe.readOnly),this._firstFragment?(this._firstFragment=!1,a&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(a=i>=o._threshold),this._compress=a):(a=!1,s=0),r.fin&&(this._firstFragment=!0);let p={[z]:i,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:a};Ct(t)?this._state!==Z?this.enqueue([this.getBlobData,t,this._compress,p,n]):this.getBlobData(t,this._compress,p,n):this._state!==Z?this.enqueue([this.dispatch,t,this._compress,p,n]):this.dispatch(t,this._compress,p,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[z],this._state=yA,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let i=new Error("The socket was closed while the blob was being read");process.nextTick(ya,this,i,o);return}this._bufferedBytes-=n[z];let a=qe(s);r?this.dispatch(a,r,n,o):(this._state=Z,this.sendFrame(e.frame(a,n),o),this.dequeue())}).catch(s=>{process.nextTick(AA,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[kd.extensionName];this._bufferedBytes+=n[z],this._state=hA,s.compress(t,n.fin,(a,i)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");ya(this,c,o);return}this._bufferedBytes-=n[z],this._state=Z,n.readOnly=!1,this.sendFrame(e.frame(i,n),o),this.dequeue()})}dequeue(){for(;this._state===Z&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][z],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][z],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Td.exports=ha;function ya(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function AA(e,t,r){ya(e,t,r),e.onerror(t)}});var Fd=U((z0,Dd)=>{"use strict";var{kForOnEventAttribute:_r,kListener:Sa}=me(),Cd=Symbol("kCode"),Id=Symbol("kData"),Pd=Symbol("kError"),Nd=Symbol("kMessage"),Od=Symbol("kReason"),Pt=Symbol("kTarget"),Md=Symbol("kType"),Hd=Symbol("kWasClean"),ge=class{constructor(t){this[Pt]=null,this[Md]=t}get target(){return this[Pt]}get type(){return this[Md]}};Object.defineProperty(ge.prototype,"target",{enumerable:!0});Object.defineProperty(ge.prototype,"type",{enumerable:!0});var Ye=class extends ge{constructor(t,r={}){super(t),this[Cd]=r.code===void 0?0:r.code,this[Od]=r.reason===void 0?"":r.reason,this[Hd]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Cd]}get reason(){return this[Od]}get wasClean(){return this[Hd]}};Object.defineProperty(Ye.prototype,"code",{enumerable:!0});Object.defineProperty(Ye.prototype,"reason",{enumerable:!0});Object.defineProperty(Ye.prototype,"wasClean",{enumerable:!0});var Nt=class extends ge{constructor(t,r={}){super(t),this[Pd]=r.error===void 0?null:r.error,this[Nd]=r.message===void 0?"":r.message}get error(){return this[Pd]}get message(){return this[Nd]}};Object.defineProperty(Nt.prototype,"error",{enumerable:!0});Object.defineProperty(Nt.prototype,"message",{enumerable:!0});var br=class extends ge{constructor(t,r={}){super(t),this[Id]=r.data===void 0?null:r.data}get data(){return this[Id]}};Object.defineProperty(br.prototype,"data",{enumerable:!0});var SA={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[_r]&&o[Sa]===t&&!o[_r])return;let n;if(e==="message")n=function(s,a){let i=new br("message",{data:a?s:s.toString()});i[Pt]=this,oo(t,this,i)};else if(e==="close")n=function(s,a){let i=new Ye("close",{code:s,reason:a.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});i[Pt]=this,oo(t,this,i)};else if(e==="error")n=function(s){let a=new Nt("error",{error:s,message:s.message});a[Pt]=this,oo(t,this,a)};else if(e==="open")n=function(){let s=new ge("open");s[Pt]=this,oo(t,this,s)};else return;n[_r]=!!r[_r],n[Sa]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Sa]===t&&!r[_r]){this.removeListener(e,r);break}}};Dd.exports={CloseEvent:Ye,ErrorEvent:Nt,Event:ge,EventTarget:SA,MessageEvent:br};function oo(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var so=U((K0,Ud)=>{"use strict";var{tokenChars:wr}=Tt();function se(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function _A(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,a,i,c=-1,p=-1,d=-1,u=0;for(;u<e.length;u++)if(p=e.charCodeAt(u),a===void 0)if(d===-1&&wr[p]===1)c===-1&&(c=u);else if(u!==0&&(p===32||p===9))d===-1&&c!==-1&&(d=u);else if(p===59||p===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${u}`);d===-1&&(d=u);let S=e.slice(c,d);p===44?(se(t,S,r),r=Object.create(null)):a=S,c=d=-1}else throw new SyntaxError(`Unexpected character at index ${u}`);else if(i===void 0)if(d===-1&&wr[p]===1)c===-1&&(c=u);else if(p===32||p===9)d===-1&&c!==-1&&(d=u);else if(p===59||p===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${u}`);d===-1&&(d=u),se(r,e.slice(c,d),!0),p===44&&(se(t,a,r),r=Object.create(null),a=void 0),c=d=-1}else if(p===61&&c!==-1&&d===-1)i=e.slice(c,u),c=d=-1;else throw new SyntaxError(`Unexpected character at index ${u}`);else if(o){if(wr[p]!==1)throw new SyntaxError(`Unexpected character at index ${u}`);c===-1?c=u:n||(n=!0),o=!1}else if(s)if(wr[p]===1)c===-1&&(c=u);else if(p===34&&c!==-1)s=!1,d=u;else if(p===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${u}`);else if(p===34&&e.charCodeAt(u-1)===61)s=!0;else if(d===-1&&wr[p]===1)c===-1&&(c=u);else if(c!==-1&&(p===32||p===9))d===-1&&(d=u);else if(p===59||p===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${u}`);d===-1&&(d=u);let S=e.slice(c,d);n&&(S=S.replace(/\\/g,""),n=!1),se(r,i,S),p===44&&(se(t,a,r),r=Object.create(null),a=void 0),i=void 0,c=d=-1}else throw new SyntaxError(`Unexpected character at index ${u}`);if(c===-1||s||p===32||p===9)throw new SyntaxError("Unexpected end of input");d===-1&&(d=u);let h=e.slice(c,d);return a===void 0?se(t,h,r):(i===void 0?se(r,h,!0):n?se(r,i,h.replace(/\\/g,"")):se(r,i,h),se(t,a,r)),t}function bA(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(a=>a===!0?o:`${o}=${a}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Ud.exports={format:bA,parse:_A}});var co=U((Y0,Zd)=>{"use strict";var wA=require("events"),vA=require("https"),EA=require("http"),Bd=require("net"),WA=require("tls"),{randomBytes:LA,createHash:RA}=require("crypto"),{Duplex:q0,Readable:J0}=require("stream"),{URL:_a}=require("url"),Ie=xt(),kA=fa(),xA=Aa(),{isBlob:TA}=Tt(),{BINARY_TYPES:jd,CLOSE_TIMEOUT:CA,EMPTY_BUFFER:ao,GUID:IA,kForOnEventAttribute:ba,kListener:PA,kStatusCode:NA,kWebSocket:P,NOOP:Gd}=me(),{EventTarget:{addEventListener:OA,removeEventListener:MA}}=Fd(),{format:HA,parse:DA}=so(),{toBuffer:FA}=Ar(),Vd=Symbol("kAborted"),wa=[8,13],fe=["CONNECTING","OPEN","CLOSING","CLOSED"],UA=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,R=class e extends wA{constructor(t,r,n){super(),this._binaryType=jd[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=ao,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),zd(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){jd.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new kA({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new xA(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[P]=this,s[P]=this,t[P]=this,o.on("conclude",BA),o.on("drain",GA),o.on("error",VA),o.on("message",zA),o.on("ping",KA),o.on("pong",qA),s.onerror=JA,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",Jd),t.on("data",lo),t.on("end",Yd),t.on("error",Xd),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Ie.extensionName]&&this._extensions[Ie.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){B(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),qd(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){va(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||ao,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){va(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||ao,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){va(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Ie.extensionName]||(o.compress=!1),this._sender.send(t||ao,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){B(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(R,"CONNECTING",{enumerable:!0,value:fe.indexOf("CONNECTING")});Object.defineProperty(R.prototype,"CONNECTING",{enumerable:!0,value:fe.indexOf("CONNECTING")});Object.defineProperty(R,"OPEN",{enumerable:!0,value:fe.indexOf("OPEN")});Object.defineProperty(R.prototype,"OPEN",{enumerable:!0,value:fe.indexOf("OPEN")});Object.defineProperty(R,"CLOSING",{enumerable:!0,value:fe.indexOf("CLOSING")});Object.defineProperty(R.prototype,"CLOSING",{enumerable:!0,value:fe.indexOf("CLOSING")});Object.defineProperty(R,"CLOSED",{enumerable:!0,value:fe.indexOf("CLOSED")});Object.defineProperty(R.prototype,"CLOSED",{enumerable:!0,value:fe.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(R.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(R.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[ba])return t[PA];return null},set(t){for(let r of this.listeners(e))if(r[ba]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[ba]:!0})}})});R.prototype.addEventListener=OA;R.prototype.removeEventListener=MA;Zd.exports=R;function zd(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:CA,protocolVersion:wa[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!wa.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${wa.join(", ")})`);let s;if(t instanceof _a)s=t;else try{s=new _a(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let a=s.protocol==="wss:",i=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!a&&!i?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:i&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;io(e,l);return}let p=a?443:80,d=LA(16).toString("base64"),u=a?vA.request:EA.request,h=new Set,S;if(o.createConnection=o.createConnection||(a?$A:jA),o.defaultPort=o.defaultPort||p,o.port=s.port||p,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":d,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(S=new Ie({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=HA({[Ie.extensionName]:S.offer()})),r.length){for(let l of r){if(typeof l!="string"||!UA.test(l)||h.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");h.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),i){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=i,e._originalSecure=a,e._originalHostOrSocketPath=i?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[A,_]of Object.entries(l))n.headers[A.toLowerCase()]=_}else if(e.listenerCount("redirect")===0){let l=i?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!a)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=u(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=u(o);o.timeout&&y.on("timeout",()=>{B(e,y,"Opening handshake has timed out")}),y.on("error",l=>{y===null||y[Vd]||(y=e._req=null,io(e,l))}),y.on("response",l=>{let A=l.headers.location,_=l.statusCode;if(A&&o.followRedirects&&_>=300&&_<400){if(++e._redirects>o.maxRedirects){B(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new _a(A,t)}catch{let w=new SyntaxError(`Invalid URL: ${A}`);io(e,w);return}zd(e,f,r,n)}else e.emit("unexpected-response",y,l)||B(e,y,`Unexpected server response: ${l.statusCode}`)}),y.on("upgrade",(l,A,_)=>{if(e.emit("upgrade",l),e.readyState!==R.CONNECTING)return;y=e._req=null;let f=l.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){B(e,A,"Invalid Upgrade header");return}let b=RA("sha1").update(d+IA).digest("base64");if(l.headers["sec-websocket-accept"]!==b){B(e,A,"Invalid Sec-WebSocket-Accept header");return}let w=l.headers["sec-websocket-protocol"],T;if(w!==void 0?h.size?h.has(w)||(T="Server sent an invalid subprotocol"):T="Server sent a subprotocol but none was requested":h.size&&(T="Server sent no subprotocol"),T){B(e,A,T);return}w&&(e._protocol=w);let G=l.headers["sec-websocket-extensions"];if(G!==void 0){if(!S){B(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let we;try{we=DA(G)}catch{B(e,A,"Invalid Sec-WebSocket-Extensions header");return}let it=Object.keys(we);if(it.length!==1||it[0]!==Ie.extensionName){B(e,A,"Server indicated an extension that was not requested");return}try{S.accept(we[Ie.extensionName])}catch{B(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Ie.extensionName]=S}e.setSocket(A,_,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function io(e,t){e._readyState=R.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function jA(e){return e.path=e.socketPath,Bd.connect(e)}function $A(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Bd.isIP(e.host)?"":e.host),WA.connect(e)}function B(e,t,r){e._readyState=R.CLOSING;let n=new Error(r);Error.captureStackTrace(n,B),t.setHeader?(t[Vd]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(io,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function va(e,t,r){if(t){let n=TA(t)?t.size:FA(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${fe[e.readyState]})`);process.nextTick(r,n)}}function BA(e,t){let r=this[P];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[P]!==void 0&&(r._socket.removeListener("data",lo),process.nextTick(Kd,r._socket),e===1005?r.close():r.close(e,t))}function GA(){let e=this[P];e.isPaused||e._socket.resume()}function VA(e){let t=this[P];t._socket[P]!==void 0&&(t._socket.removeListener("data",lo),process.nextTick(Kd,t._socket),t.close(e[NA])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function $d(){this[P].emitClose()}function zA(e,t){this[P].emit("message",e,t)}function KA(e){let t=this[P];t._autoPong&&t.pong(e,!this._isServer,Gd),t.emit("ping",e)}function qA(e){this[P].emit("pong",e)}function Kd(e){e.resume()}function JA(e){let t=this[P];t.readyState!==R.CLOSED&&(t.readyState===R.OPEN&&(t._readyState=R.CLOSING,qd(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function qd(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function Jd(){let e=this[P];if(this.removeListener("close",Jd),this.removeListener("data",lo),this.removeListener("end",Yd),e._readyState=R.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[P]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",$d),e._receiver.on("finish",$d))}function lo(e){this[P]._receiver.write(e)||this.pause()}function Yd(){let e=this[P];e._readyState=R.CLOSING,e._receiver.end(),this.end()}function Xd(){let e=this[P];this.removeListener("error",Xd),this.on("error",Gd),e&&(e._readyState=R.CLOSING,this.destroy())}});var ru=U((Z0,tu)=>{"use strict";var X0=co(),{Duplex:YA}=require("stream");function Qd(e){e.emit("close")}function XA(){!this.destroyed&&this._writableState.finished&&this.destroy()}function eu(e){this.removeListener("error",eu),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function ZA(e,t){let r=!0,n=new YA({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,a){let i=!a&&n._readableState.objectMode?s.toString():s;n.push(i)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(Qd,n);return}let a=!1;e.once("error",function(c){a=!0,s(c)}),e.once("close",function(){a||s(o),process.nextTick(Qd,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,a){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,a)});return}e.send(o,a)},n.on("end",XA),n.on("error",eu),n}tu.exports=ZA});var Ea=U((Q0,nu)=>{"use strict";var{tokenChars:QA}=Tt();function eS(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let a=e.charCodeAt(o);if(n===-1&&QA[a]===1)r===-1&&(r=o);else if(o!==0&&(a===32||a===9))n===-1&&r!==-1&&(n=o);else if(a===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let i=e.slice(r,n);if(t.has(i))throw new SyntaxError(`The "${i}" subprotocol is duplicated`);t.add(i),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}nu.exports={parse:eS}});var du=U((tE,cu)=>{"use strict";var tS=require("events"),uo=require("http"),{Duplex:eE}=require("stream"),{createHash:rS}=require("crypto"),ou=so(),Xe=xt(),nS=Ea(),oS=co(),{CLOSE_TIMEOUT:sS,GUID:aS,kWebSocket:iS}=me(),lS=/^[+/0-9A-Za-z]{22}==$/,su=0,au=1,lu=2,Wa=class extends tS{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:sS,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:oS,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=uo.createServer((n,o)=>{let s=uo.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=cS(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,a)=>{this.handleUpgrade(o,s,a,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=su}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===lu){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(vr,this);return}if(t&&this.once("close",t),this._state!==au)if(this._state=au,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(vr,this):process.nextTick(vr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{vr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",iu);let s=t.headers["sec-websocket-key"],a=t.headers.upgrade,i=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Ze(this,t,r,405,"Invalid HTTP method");return}if(a===void 0||a.toLowerCase()!=="websocket"){Ze(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!lS.test(s)){Ze(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(i!==13&&i!==8){Ze(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Er(r,400);return}let c=t.headers["sec-websocket-protocol"],p=new Set;if(c!==void 0)try{p=nS.parse(c)}catch{Ze(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let d=t.headers["sec-websocket-extensions"],u={};if(this.options.perMessageDeflate&&d!==void 0){let h=new Xe({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let S=ou.parse(d);S[Xe.extensionName]&&(h.accept(S[Xe.extensionName]),u[Xe.extensionName]=h)}catch{Ze(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let h={origin:t.headers[`${i===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(h,(S,y,l,A)=>{if(!S)return Er(r,y||401,l,A);this.completeUpgrade(u,s,p,t,r,n,o)});return}if(!this.options.verifyClient(h))return Er(r,401)}this.completeUpgrade(u,s,p,t,r,n,o)}completeUpgrade(t,r,n,o,s,a,i){if(!s.readable||!s.writable)return s.destroy();if(s[iS])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>su)return Er(s,503);let p=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${rS("sha1").update(r+aS).digest("base64")}`],d=new this.options.WebSocket(null,void 0,this.options);if(n.size){let u=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;u&&(p.push(`Sec-WebSocket-Protocol: ${u}`),d._protocol=u)}if(t[Xe.extensionName]){let u=t[Xe.extensionName].params,h=ou.format({[Xe.extensionName]:[u]});p.push(`Sec-WebSocket-Extensions: ${h}`),d._extensions=t}this.emit("headers",p,o),s.write(p.concat(`\r
`).join(`\r
`)),s.removeListener("error",iu),d.setSocket(s,a,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(d),d.on("close",()=>{this.clients.delete(d),this._shouldEmitClose&&!this.clients.size&&process.nextTick(vr,this)})),i(d,o)}};cu.exports=Wa;function cS(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function vr(e){e._state=lu,e.emit("close")}function iu(){this.destroy()}function Er(e,t,r,n){r=r||uo.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${uo.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function Ze(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let a=new Error(o);Error.captureStackTrace(a,Ze),e.emit("wsClientError",a,r,t)}else Er(r,n,o,s)}});var dS,uS,mS,pS,gS,fS,uu,hS,Wr,mu=m(()=>{dS=g(ru(),1),uS=g(so(),1),mS=g(xt(),1),pS=g(fa(),1),gS=g(Aa(),1),fS=g(Ea(),1),uu=g(co(),1),hS=g(du(),1),Wr=uu.default});var La=m(()=>{"use strict"});var he,Lr=m(()=>{"use strict";he=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Ot,Qe,pu,AS,Ra,ka,gu,fu,hu,yu,xa,Ta=m(()=>{"use strict";Ot=g(require("node:fs")),Qe=g(require("node:os")),pu=g(require("node:path"));La();Lr();AS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ra=(e=Qe.default.hostname())=>pu.default.join(Qe.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),ka=e=>{if(!Ot.default.existsSync(e))return null;try{let t=JSON.parse(Ot.default.readFileSync(e,"utf8"));return!AS(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},gu=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},fu=(e,t)=>{Ot.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},hu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Ra(),n=ka(r);if(n!==null&&n.pid!==process.pid&&he(n.pid)&&gu(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Qe.default.hostname(),macOsUsername:Qe.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return fu(r,o),{ok:!0}},yu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Ra(),n=ka(r);return n!==null&&n.pid!==process.pid&&he(n.pid)&&gu(n)?{ok:!1}:(fu(r,{hostname:Qe.default.hostname(),macOsUsername:Qe.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},xa=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Ra();ka(r)?.pid===process.pid&&Ot.default.existsSync(r)&&Ot.default.unlinkSync(r)}});var Ca,Rr,SS,_S,bS,wS,Au,Su=m(()=>{"use strict";Ca=require("node:child_process"),Rr=g(require("node:path"));Lr();ct();SS=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),_S=(e,t)=>{if(SS(e)||!/\bnode\b/.test(e))return!1;let r=Rr.default.resolve(t),n=Rr.default.join(r,"app",le),o=Rr.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(a=>a.length>0).some(a=>{if(a===le||a==="agent-witch.ts")return e.includes(r);try{let i=Rr.default.resolve(a);return i===n||i===o}catch{return a===n||a===o}})},bS=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,Ca.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},wS=(e,t,r)=>{let n=bS(r),o=[];for(let s of e.split(`
`)){let a=s.trim();if(a.length===0)continue;let i=/^(\d+)\s+(.+)$/.exec(a);if(i===null)continue;let c=Number.parseInt(i[1]??"",10),p=i[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||_S(p,t)&&o.push(c)}return o},Au=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Ca.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=wS(r,e.installDir,t),o=[];for(let s of n)if(he(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var kr,xr,_u,vS,bu,wu=m(()=>{"use strict";kr=g(require("node:fs")),xr=g(require("node:path"));L();_u=(e,t)=>{!kr.default.existsSync(e)||kr.default.existsSync(t)||(kr.default.mkdirSync(xr.default.dirname(t),{recursive:!0}),kr.default.renameSync(e,t))},vS=e=>{if(e.profileEmail===null)return;let t=xr.default.join(e.installDir,ce);_u(xr.default.join(t,sn),e.mainLogPath),_u(xr.default.join(t,an),e.errorLogPath)},bu=e=>{let t=W();e!==void 0&&t.installDir!==e||vS(t)}});var vu,Eu,Wu,Lu,Ru=m(()=>{"use strict";vu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Eu=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?vu(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?vu(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Wu=e=>{let t=e.watchdogLogs.map(Eu).join(""),r=e.updateLogs.map(Eu).join("");return`<!doctype html>
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
</html>`},Lu=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var ku,xu,Tu=m(()=>{"use strict";ku=g(require("node:net")),xu=()=>new Promise((e,t)=>{let r=ku.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var Cu,ES,Iu,Pu=m(()=>{"use strict";Cu=g(require("node:net"));Tu();vt();Un();L();ES=e=>new Promise(t=>{let r=Cu.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Iu=async()=>{let e=v(),t=Y();if(await ES(t))return Ac(t),t;let r=await xu();return Fn(e,r),r}});var WS,Nu,Ou=m(()=>{"use strict";WS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nu=e=>({force:WS(e)&&e.force===!0})});var Ia,LS,et,mo=m(()=>{"use strict";Ia=g(require("node:os")),LS=e=>{let t=e.trim();return t.startsWith("~/")?`${Ia.default.homedir()}${t.slice(1)}`:t==="~"?Ia.default.homedir():t},et=LS});var tt,Pe,Tr=m(()=>{"use strict";tt=g(require("node:path"));gt();mo();Pe=e=>{let t=et(e),r=tt.default.join(t,dl);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:tt.default.join(r,"rag"),memoryDirPath:tt.default.join(r,ul),reportsDirPath:tt.default.join(r,pl),metaFilePath:tt.default.join(r,ml),ragChunksFilePath:tt.default.join(r,"rag",fn)}}});var ae,Hu,RS,kS,ye,Cr=m(()=>{"use strict";ae=g(require("node:fs")),Hu=g(require("node:path"));gt();Tr();RS=(e,t)=>{if(ae.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};ae.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},kS=e=>{ae.default.existsSync(e.ragChunksFilePath)||ae.default.writeFileSync(e.ragChunksFilePath,"");let t=Hu.default.join(e.memoryDirPath,hn);ae.default.existsSync(t)||ae.default.writeFileSync(t,"")},ye=e=>{let t=Pe(e.projectFolderPath);return ae.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),ae.default.mkdirSync(t.ragDirPath,{recursive:!0}),ae.default.mkdirSync(t.memoryDirPath,{recursive:!0}),RS(t,e),kS(t),{ok:!0,layout:t}}});var xS,Du,Fu=m(()=>{"use strict";Cr();xS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Du=e=>{if(!xS(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:ye({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var ju,IS,Uu,x,TS,CS,Pa,$u=m(()=>{"use strict";ju=g(require("node:http"));oa();Ps();Ru();Pu();Ou();gn();Fu();wn();lt();IS={},Uu=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},x=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},TS=e=>{e.writeHead(403),e.end()},CS=async(e,t,r)=>{let n=e.headers.origin,o=gc(n);try{if(n!==void 0&&n.length>0&&!o.allowed){TS(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){x(t,200,Js(),o.headers);return}if(e.method==="GET"&&s==="/identity"){x(t,200,Ys(),o.headers);return}if(e.method==="GET"&&s==="/local"){let a=Jn(50),i=Yn(50);t.writeHead(200,Lu()),t.end(Wu({port:r,watchdogLogs:a,updateLogs:i}));return}if(e.method==="GET"&&s==="/watchdog/status"){let a=await Zs();x(t,200,a,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let a=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;x(t,200,{ok:!0,logs:Jn(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let a=await Qs();x(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/restart"){let a=await ea();x(t,a.ok?200:503,a,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let a=ta();x(t,200,{ok:!0,...a},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let a=new URL(e.url??"/update/logs","http://127.0.0.1"),i=Number.parseInt(a.searchParams.get("limit")??"20",10),c=Number.isFinite(i)&&i>0?Math.min(i,200):20;x(t,200,{ok:!0,logs:Yn(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let a=await Uu(e),{force:i}=Nu(a),c=await ra({force:i});x(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let a=await na();x(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/wake"){let a=await Xs();x(t,a.ok?200:503,a,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let a=[];for await(let p of e)a.push(Buffer.from(p));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{x(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=qn(i);x(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let a=await Uu(e),i=Du(a);x(t,i.ok?200:400,i,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let a=[];for await(let p of e)a.push(Buffer.from(p));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{x(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=qn(i);x(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){x(t,200,qs(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let a=[];for await(let p of e)a.push(Buffer.from(p));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{x(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=zs(i);x(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let a=[];for await(let p of e)a.push(Buffer.from(p));let i={};try{i=JSON.parse(Buffer.concat(a).toString("utf8"))}catch{x(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await Ks(i);x(t,c.ok?200:503,c,o.headers);return}x(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{x(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},Pa=async()=>{let e=await Iu(),t=ju.default.createServer((r,n)=>{CS(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!te()&&ft(IS.url)&&(async()=>{pt("agent-witch-wake-server");let e=await Pa(),t=pn(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var Na,Bu=m(()=>{"use strict";lr();Hn();ze();Na=async()=>{let e=D();if(e===null)return;let t=ke(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await wt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Gu,Vu=m(()=>{"use strict";La();$u();Ta();Bu();Gu=async(e={})=>{let t=await Pa();Na();let r=setInterval(()=>{Na()},6e4),n=setInterval(()=>{if(!yu().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var Ir,po,OS,zu,Ku,go,qu,Ju,Oa,Yu,fo,Xu=m(()=>{"use strict";Ir=g(require("node:fs")),po=g(require("node:path")),OS="pending-run-inputs.json",zu=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ku=e=>{let t=e.profileEmail?po.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return po.default.join(t,OS)},go=e=>{let t=Ku(e);if(!Ir.default.existsSync(t))return{};try{let r=JSON.parse(Ir.default.readFileSync(t,"utf8"));return zu(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!zu(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",a=typeof o.partialOutput=="string"?o.partialOutput:"",i=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:a;return s.length===0||i.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:a,question:i,accumulatedOutput:c}]]})):{}}catch{return{}}},qu=(e,t)=>{let r=Ku(e);Ir.default.mkdirSync(po.default.dirname(r),{recursive:!0}),Ir.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Ju=e=>Object.values(go(e)),Oa=(e,t)=>go(e)[t]!==void 0,Yu=(e,t)=>{let r=go(e);r[t.agentRunId]=t,qu(e,r)},fo=(e,t)=>{let r=go(e);delete r[t],qu(e,r)}});var Ma,Zu=m(()=>{"use strict";Ma={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var Ha,XE,Qu=m(()=>{"use strict";Ha={OPEN:"open",APPROVAL:"approval"},XE=Ha.APPROVAL});var Mt,ho,em,MS,tm,rm,nm,yo,om,Da=m(()=>{"use strict";Mt=g(require("node:fs")),ho=g(require("node:path")),em="runs",MS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tm=e=>{let t=e.profileEmail!==null?ho.default.join(e.installDir,"profiles",e.profileEmail,em):ho.default.join(e.installDir,em);return Mt.default.mkdirSync(t,{recursive:!0}),t},rm=(e,t)=>ho.default.join(tm(e),`${t}.json`),nm=(e,t)=>{Mt.default.writeFileSync(rm(e,t.id),JSON.stringify(t,null,2))},yo=(e,t)=>{let r=rm(e,t);if(!Mt.default.existsSync(r))return null;try{let n=JSON.parse(Mt.default.readFileSync(r,"utf8"));return!MS(n)||typeof n.id!="string"?null:n}catch{return null}},om=e=>{let t=tm(e),r=Mt.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),a=yo(e,s);a!==null&&n.push(a)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var HS,sm,am=m(()=>{"use strict";Zu();Qu();Da();HS=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?Ma.COMPLETED:Ma.FAILED,dispatchPolicy:Ha.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},sm=(e,t)=>{let r=HS(t);return nm(e,r),r}});var Pr,Ao,DS,Fa,im,lm,cm,Ua,dm=m(()=>{"use strict";Pr=g(require("node:fs")),Ao=g(require("node:path"));cr();DS="run-completion-outbox.json",Fa=e=>{let t=e.profileEmail?Ao.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Ao.default.join(t,DS)},im=e=>{let t=Fa(e);if(!Pr.default.existsSync(t))return[];try{let r=JSON.parse(Pr.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},lm=(e,t)=>{Pr.default.mkdirSync(Ao.default.dirname(Fa(e)),{recursive:!0}),Pr.default.writeFileSync(Fa(e),JSON.stringify(t,null,2),"utf8")},cm=(e,t)=>{let r=[...im(e).filter(n=>n.runId!==t.runId),t];lm(e,r)},Ua=async e=>{if(e.cloudApi===null)return;let t=im(e.layout);if(t.length===0)return;let r=[];for(let n of t)await In(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);lm(e.layout,r)}});var um=m(()=>{"use strict"});var ja,Nr,US,Ht,mm=m(()=>{"use strict";um();ja=new Map,Nr=e=>{let t=ja.get(e);t!==void 0&&(clearInterval(t),ja.delete(e))},US=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Ht=(e,t,r,n={})=>{Nr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Nr(t);return}let a=n.onTick?.()??{};US(e,t,o,a)};s(),ja.set(t,setInterval(s,15e3))}});var $a,Or,Dt,pm,rt,gm,So=m(()=>{"use strict";$a=new Set,Or=new Map,Dt=(e,t)=>{if(t.length===0)return;let r=Or.get(e)??[];r.push(t),Or.set(e,r)},pm=e=>{$a.add(e);let t=Or.get(e)??[];return Or.delete(e),t},rt=e=>$a.has(e),gm=e=>{$a.delete(e),Or.delete(e)}});var fm,hm,ym,Am,F,Ft,Sm,_m,Mr,bm,wm,Ba,vm,Em,Wm,_o=m(()=>{"use strict";fm=require("node:crypto"),hm=g(require("node:fs")),ym=g(require("node:path")),Am=require("node:url");Lr();lt();Zo();F=new Map,Sm=async()=>{if(Ft!==void 0)return Ft;try{if(te()){let e=on(),t=ym.default.join(e,"deps","node-pty","lib","index.js");if(hm.default.existsSync(t)){let r=await import((0,Am.pathToFileURL)(t).href);return Ft=r,r}}return Ft=await import("node-pty"),Ft}catch{return Ft=null,null}},_m=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},Mr=(e,t,r)=>{let n=F.get(e);if(n!==void 0){F.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},bm=(e,t)=>{let r=F.get(e);return r===void 0?!1:(r.pty.write(t),!0)},wm=(e,t,r)=>{let n=F.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Ba=e=>{for(let t of F.values())if(!(t.mode!=="agent"||t.runId!==e))return he(t.pty.pid);return!1},vm=e=>{for(let[t,r]of F.entries())if(!(r.mode!=="agent"||r.runId!==e)){F.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Em=async e=>{let t=await Sm();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;F.get(e.shellSessionId)!==void 0&&Mr(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let a=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${a}).\r
`},requestId:e.requestId}),!1}return F.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{_m(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{F.get(e.shellSessionId)?.pty===o&&(F.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Wm=async e=>{let t=e.shellSessionId??(0,fm.randomUUID)(),r=await Sm();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return F.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{_m(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{F.get(t)?.pty===n&&(F.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var bo,Lm,Rm=m(()=>{"use strict";bo="[[AWAITING_INPUT]]",Lm=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",bo,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Hr,km,wo=m(()=>{"use strict";Rm();Hr=e=>{let t=e.indexOf(bo);if(t<0)return null;let n=e.slice(t+bo.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},km=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Lm].join(`
`)});var xm,Tm=m(()=>{"use strict";So();_o();wo();xm=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(rt(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Dt(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Wm({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let a=Hr(t.join(""));a!==null&&(r=!0,e.onInputRequired(a))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var Cm,Im,Pm,Ne,vo=m(()=>{"use strict";Cm=require("node:child_process"),Im=g(require("node:fs")),Pm=g(require("node:path"));ct();Ne=(e,t)=>{let r=Pm.default.join(e,"app",$i,"ensure-writer.sh");return Im.default.existsSync(r)?new Promise((n,o)=>{let s=(0,Cm.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",a=>{o(a)}),s.on("close",a=>{if(a===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(a??-1)}`))})}):Promise.resolve()}});var Nm,nt,Eo,Om,Mm,Ga,Hm,Va,Dm,Fm,jS,Wo,$S,BS,Um,za=m(()=>{"use strict";Nm=require("node:child_process");Ve();vo();nt=new Map,Eo=e=>e==="cursor"||e==="antigravity",Om=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Mm=e=>nt.get(e)?.warmed===!0,Ga=e=>{let t=nt.get(e);nt.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Hm=e=>nt.get(e)?.conversationStarted===!0,Va=e=>{let t=nt.get(e);nt.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Dm=e=>{nt.delete(e)},Fm=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",jS={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Wo=e=>`${jS[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,$S=(e,t,r,n)=>new Promise(o=>{let s=ic(t,r),a=[],i=(0,Nm.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=p=>{let d=p.toString("utf8");a.push(d),n?.(d)};i.stdout?.on("data",c),i.stderr?.on("data",c),i.on("close",p=>{o({exitCode:p??-1,output:a.join("").trim()})}),i.on("error",p=>{o({exitCode:-1,output:p.message})})}),BS=(e,t)=>{let r=Wo(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Um=async e=>{if(!N(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Ne(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Eo(e.writerAgent)&&Ga(e.writerAgent);let t=await $S(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?BS(e.writerAgent,t.output):Wo(e.writerAgent)}}});var jm,Dr,M,Ka,$m,Bm,qa,Gm,Vm,zm,GS,Ae,Lo,Ut,Km,VS,Ja,qm,Jm,Ym,Xm=m(()=>{"use strict";jm=require("node:child_process");Ve();Xu();am();dm();mm();Lr();So();_o();wo();Tm();za();Qt();wo();Dr=new Map,M=new Map,Ka=new Set,$m=130,Bm=`

Stopped by user.`,qa=null,Gm=e=>{qa=e},Vm=async e=>{await Ua({layout:e,cloudApi:qa})},zm=e=>{let t=Dr.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:he(t.pid)},GS=e=>xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Ae=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Lo=(e,t,r,n,o,s,a=!1)=>({awaitingInput:a,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let i=Sn(s),c=M.get(r);if(i!==null&&c!==void 0){let p=El(i),d=zm(r)||Ba(r);p!==null&&!d&&Ut(e,t,r,n,p.exitCode,p.output,c.originalPrompt)}return vl(i)}}),Ut=(e,t,r,n,o,s,a)=>{let i=o,c=s;r!==void 0&&Ka.has(r)&&(Ka.delete(r),i=$m,c=c.trim().length>0&&!c.includes("Stopped by user.")?`${c.trim()}${Bm}`:"Stopped by user."),r!==void 0&&(Nr(r),rt(r)&&(Ae(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),gm(r)),sm(e.layout,{agentRunId:r,originalPrompt:a,exitCode:i,output:c,layout:e.layout}),cm(e.layout,{runId:r,exitCode:i,output:c,createdAt:new Date().toISOString()}),Ua({layout:e.layout,cloudApi:qa}),M.delete(r),Dr.delete(r),fo(e.layout,r)),Ae(t,{type:"command.claude.result",payload:{exitCode:i,output:c,...r!==void 0?{agentRunId:r}:{}},requestId:n})},Km=(e,t,r,n,o,s,a)=>{let i=M.get(r),c=i?.accumulatedOutput??s;Yu(e.layout,{agentRunId:r,originalPrompt:a,partialOutput:s,question:o,accumulatedOutput:c}),Ht(t,r,()=>Oa(e.layout,r),Lo(e,t,r,n,i?.projectFolderPath,i?.reportKey,!0)),Ae(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},VS=(e,t,r,n,o,s,a)=>{let i=[],c=!1,p=d=>{if(!(o===void 0||d.length===0)){if(rt(o)){Ae(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:d},requestId:n});return}Dt(o,d)}};if(o!==void 0){let d=M.get(o);Dr.set(o,t),M.set(o,{originalPrompt:s,writerAgent:a,projectFolderPath:d?.projectFolderPath,reportKey:d?.reportKey,accumulatedOutput:d?.accumulatedOutput??""}),Ae(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Ht(r,o,()=>zm(o),Lo(e,r,o,n,d?.projectFolderPath,d?.reportKey))}t.stdout?.on("data",d=>{let u=d.toString("utf8");if(i.push(u),p(u),c||o===void 0)return;let h=Hr(i.join(""));if(h!==null){c=!0,t.kill("SIGTERM");let S=M.get(o),y=[S?.accumulatedOutput??"",h.partialOutput].filter(l=>l.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=y),Dr.delete(o),Km(e,r,o,n,h.question,y,s)}}),t.stderr?.on("data",d=>{let u=d.toString("utf8");i.push(u),p(u)}),t.on("close",d=>{if(c)return;Va(a);let u=o!==void 0?M.get(o):void 0,h=i.join("").trim(),S=u!==void 0&&u.accumulatedOutput.length>0?`${u.accumulatedOutput}

${h}`.trim():h;Ut(e,r,o,n,d??-1,S,s)}),t.on("error",d=>{c||Ut(e,r,o,n,-1,d.message,s)})},Ja=(e,t,r,n,o,s,a,i,c,p)=>{let d=_t(t,r,GS(e),a);if(d===null){Ut(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let u=()=>{let h=(0,jm.spawn)(d.command,[...d.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});VS(e,h,o,n,s,r,t)};if(s===void 0){u();return}M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:p,accumulatedOutput:M.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&p!==void 0&&p.trim().length>0&&_n({reportKey:p,agentRunId:s,userSummary:"Task started on your Mac."}),Ht(o,s,()=>M.has(s),Lo(e,o,s,n,c,p)),xm({socket:o,sendMessage:Ae,requestId:n,agentRunId:s,shellSessionId:i,command:d.command,args:d.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:h=>{i!==void 0&&Mr(i,l=>{Ae(o,l)},n);let S=M.get(s),y=[S?.accumulatedOutput??"",h.partialOutput].filter(l=>l.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=y),Km(e,o,s,n,h.question,y,r)},onFinished:(h,S)=>{Va(t);let y=M.get(s),l=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${S}`.trim():S;Ut(e,o,s,n,h,l,r)}}).then(h=>{if(!h){u();return}Ht(o,s,()=>Ba(s),Lo(e,o,s,n,c,p))}).catch(h=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",h instanceof Error?h.message:h),u()})},qm=(e,t,r,n)=>{fo(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Ae(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=km(t),s=M.get(t.agentRunId),a=s?.writerAgent??"claude-cli",i=s?.projectFolderPath,c=s?.reportKey;Ja(e,a,o,r,n,t.agentRunId,void 0,t.shellSessionId,i,c)},Jm=(e,t)=>{for(let r of Ju(e.layout))M.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Ht(t,r.agentRunId,()=>Oa(e.layout,r.agentRunId),{awaitingInput:!0}),Ae(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Ym=(e,t,r,n)=>{let o=M.get(r);if(o===void 0)return!1;Ka.add(r),Nr(r);let s=Dr.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(vm(r))return!0;fo(e.layout,r);let a=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${Bm}`:"Stopped by user.";return Ut(e,t,r,n,$m,a,o.originalPrompt),!0}});var zS,Zm,Qm=m(()=>{"use strict";vt();zS=()=>`http://127.0.0.1:${Y()}/restart`,Zm=async()=>{try{let e=await fetch(zS(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var ot,Ya,KS,qS,Xa,st,Ro,ep,ko=m(()=>{"use strict";ot=g(require("node:fs")),Ya=g(require("node:path")),KS="local-ws-traffic.ndjson",qS=500,Xa=e=>Ya.default.join(e.logsDir,KS),st=(e,t)=>{let r=Xa(e);ot.default.mkdirSync(Ya.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});ot.default.appendFileSync(r,`${n}
`,"utf8")},Ro=(e,t=qS)=>{let r=Xa(e);if(!ot.default.existsSync(r))return[];let o=ot.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let a of o)try{let i=JSON.parse(a);typeof i=="object"&&i!==null&&"at"in i&&"direction"in i&&"type"in i&&"summary"in i&&s.push(i)}catch{}return s.reverse()},ep=e=>{let t=Xa(e);ot.default.existsSync(t)&&ot.default.writeFileSync(t,"","utf8")}});var JS,xo,Za=m(()=>{"use strict";vt();JS=()=>`http://127.0.0.1:${Y()}/update/run`,xo=async e=>{try{let t=await fetch(JS(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var tp,rp=m(()=>{"use strict";tp=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Fr,YS,np,op=m(()=>{"use strict";ko();$e();Za();rp();Fr=(e,t)=>{st(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},YS=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(At(),Rn)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},np=async e=>{let t=$(e.layout.installDir)?.bundleVersion??null;if(!tp({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Fr(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await xo({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Fr(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await YS();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Fr(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Fr(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Fr(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var XS,sp,ap=m(()=>{"use strict";XS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sp=e=>{if(!XS(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var ip,lp,cp=m(()=>{"use strict";ws();Hn();ip=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Cn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},lp=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await wt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var K,ZS,QS,e_,dp,up,mp,pp,gp,fp,hp=m(()=>{"use strict";K=require("node:crypto"),ZS=Buffer.from("302a300506032b6570032100","hex"),QS=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},e_=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,K.createPublicKey)({key:Buffer.concat([ZS,t]),format:"der",type:"spki"})},dp=()=>{let{publicKey:e,privateKey:t}=(0,K.generateKeyPairSync)("ed25519");return{publicKeyRaw:QS(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},up=e=>(0,K.createPrivateKey)(e),mp=(e,t)=>(0,K.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),pp=(e,t,r)=>{try{let n=e_(e);return(0,K.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},gp=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,fp=()=>(0,K.randomBytes)(32).toString("base64url")});var Se,To,yp,t_,r_,Qa,Ap,Sp,ei=m(()=>{"use strict";Se=g(require("node:fs")),To=g(require("node:path"));hp();L();yp=e=>To.default.join(e.installDir,dt),t_=(e,t)=>{if(e.profileEmail===null||t===yp(e)||Se.default.existsSync(t))return;let r=yp(e);Se.default.existsSync(r)&&(Se.default.mkdirSync(To.default.dirname(t),{recursive:!0}),Se.default.renameSync(r,t))},r_=e=>{if(!Se.default.existsSync(e))return null;try{let t=Se.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Qa=e=>{let t=Xi(e);t_(e,t);let r=r_(t);if(r!==null)return r;let n=dp();return Se.default.mkdirSync(To.default.dirname(t),{recursive:!0}),Se.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},Ap=e=>{let t=Qa(e.layout),r=fp(),n=gp({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=up(t.privateKeyPem),s=mp(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Sp=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return pp(e.serverPublicKey,t,e.serverAttestation)}});var Co,ti=m(()=>{"use strict";Co={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var n_,_p,o_,bp,wp=m(()=>{"use strict";ti();n_=new Set(Object.values(Co)),_p=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),o_=e=>{if(!_p(e))return!1;let t=e.type;return!(typeof t!="string"||!n_.has(t)||e.payload!==void 0&&!_p(e.payload)||e.requestId!==void 0&&typeof e.requestId!="string")},bp=o_});var s_,vp,Ep,Wp=m(()=>{"use strict";wp();ti();s_=new Set(Object.values(Co)),vp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ep=e=>{if(!vp(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;return typeof t!="string"?{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e}:s_.has(t)?e.payload!==void 0&&!vp(e.payload)?{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:e.requestId!==void 0&&typeof e.requestId!="string"?{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e}:bp(e)?{formatOk:!0,formatError:null,command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}}});var Lp,Rp=m(()=>{"use strict";Lp=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var a_,i_,l_,Ur,kp=m(()=>{"use strict";Rp();a_=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,i_=e=>a_.test(e),l_=e=>Lp(e),Ur=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>Ur(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&i_(n)){r[n]=l_(o);continue}r[n]=Ur(o)}return r}});var ie,ri,c_,d_,u_,ni,xp,Tp,Cp,m_,oi,jt,si,Ip,Io=m(()=>{"use strict";ie=g(require("node:fs")),ri=g(require("node:path"));Wp();kp();c_="local-ws-trace.ndjson",d_=1e4,u_=1440*60*1e3,ni=e=>ri.default.join(e.logsDir,c_),xp=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},Tp=e=>{if(!ie.default.existsSync(e))return;let t=ie.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-u_,o=t.filter(s=>{let a=xp(s);if(a===null)return!1;let i=Date.parse(a.at);return Number.isFinite(i)&&i>=r}).slice(-d_);ie.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},Cp=(e,t)=>{let r=ni(e);ie.default.mkdirSync(ri.default.dirname(r),{recursive:!0}),ie.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),Tp(r)},m_=e=>e.parsed===null?{_empty:!0}:Ur(e.parsed),oi=(e,t,r)=>{let n=Ep(r);Cp(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:m_(n)})},jt=(e,t)=>{Cp(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Ur({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},si=(e,t=80)=>{let r=ni(e);if(Tp(r),!ie.default.existsSync(r))return[];let n=ie.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let a=xp(s);a!==null&&o.push(a)}return o.reverse()},Ip=e=>{let t=ni(e);ie.default.existsSync(t)&&ie.default.writeFileSync(t,"","utf8")}});var Pp,Np,Op=m(()=>{"use strict";Io();Pp=!1,Np=e=>{Pp||(Pp=!0,process.on("uncaughtException",t=>{jt(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;jt(e,{kind:"crash",message:r,stack:n})}))}});var p_,Mp,Hp=m(()=>{"use strict";p_="local.agentwitch.com",Mp=`http://${p_}:43347`});var at,g_,Dp,Fp=m(()=>{"use strict";at=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g_=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Dp=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${at(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?at(r.direction):at(r.kind),a=`trace-body-${n}`,i=at(g_(r.body));return`<tr>
        <td title="${at(r.at)}">${at(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${at(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${a}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${a}" class="trace-body-pre" hidden>${i}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var jr,Po,f_,h_,y_,A_,Up,S_,__,jp,$r,$p,Br,Bp,ai=m(()=>{"use strict";jr=g(require("node:fs")),Po=g(require("node:path"));gt();Tr();f_="rag",h_="http://127.0.0.1:11434",y_="nomic-embed-text",A_=e=>Po.default.join(e.installDir,f_),Up=(e,t)=>t!==void 0&&t.trim().length>0?Pe(t).ragChunksFilePath:Po.default.join(A_(e),fn),S_=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let a=0;a<r;a+=1){let i=e[a]??0,c=t[a]??0;n+=i*c,o+=i*i,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},__=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},jp=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||h_,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||y_;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},$r=(e,t)=>{let r=Up(e,t);if(!jr.default.existsSync(r))return[];let n=jr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},$p=async e=>{let t=__(e.text);if(t.length===0)return 0;let r=Up(e.layout,e.projectFolderPath);jr.default.mkdirSync(Po.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await jp(o);if(s===null)continue;let a={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};jr.default.appendFileSync(r,`${JSON.stringify(a)}
`,"utf8"),n+=1}return n},Br=async e=>{let t=await jp(e.query);return t===null?[]:$r(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:S_(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Bp=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var Gp,Vp=m(()=>{"use strict";Gp=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let a=Math.floor(n/3600),i=Math.floor(n%3600/60);return i>0?`${a}h ${i}m`:`${a}h`}});var zp,No,Kp,Oo=m(()=>{"use strict";Vp();zp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),No=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=zp(e),r=zp(Gp(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Kp=`(function () {
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
})();`});var $t,qp,Jp=m(()=>{"use strict";$t=(e,t,r)=>e===1?t:r,qp=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${$t(o,"min","mins")} ago`;let s=Math.floor(n/36e5),a=Math.floor(n%36e5/6e4);if(s<24)return a===0?`${s}h ago`:`${s}h ${a} ${$t(a,"min","mins")} ago`;let i=Math.floor(n/864e5);if(i<7)return`${i} ${$t(i,"day","days")} ago`;let c=Math.floor(i/7);if(c<5)return`${c} ${$t(c,"week","weeks")} ago`;let p=Math.floor(i/30);if(p<12)return`${p} ${$t(p,"month","months")} ago`;let d=Math.floor(i/365);return`${d} ${$t(d,"year","years")} ago`}});var ii,Yp,Xp=m(()=>{"use strict";ii=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yp=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${ii(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${ii(e.errorLogPath)}</code>.</p>`;return`<section class="card">
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
    </section>`}});var Zp,Qp,eg,tg=m(()=>{"use strict";Zp=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
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
    </section>`,eg=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Gr,rg,ng=m(()=>{"use strict";Oo();Gr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rg=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",a=e.wakeError?`<div class="alert-error">${Gr(e.wakeError)}</div>`:"",i=No(e.lastHeartbeatAt);return`${a}<section class="card home-hero">
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
    </div>`}});var Bt,b_,og,sg=m(()=>{"use strict";Bt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b_=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],og=e=>{let t=b_.map(a=>`<option value="${Bt(a.value)}">${Bt(a.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Bt(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Bt(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Bt(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Bt(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var ag,ig=m(()=>{"use strict";ag=`
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
`.trim()});var w_,v_,lg,cg,dg=m(()=>{"use strict";ig();Oo();w_=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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
</html>`}});var li,ug,mg=m(()=>{"use strict";li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ug=e=>{if(e.installed.sets.length===0)return`<section class="card harness-installed">
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
    </section>`}});var E_,pg,gg,fg=m(()=>{"use strict";E_=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,pg=e=>e.kind==="folder",gg=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let a=0;a<o.length;a+=1){let i=o[a];if(i===void 0)continue;if(a===o.length-1){s.children.set(i,n);continue}let p=s.children.get(i);if(p!==void 0&&pg(p)){s=p;continue}let d={kind:"folder",name:i,children:new Map};s.children.set(i,d),s=d}}let r=n=>{let o=[];for(let s of n.children.values()){if(pg(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(E_)};return r(t)}});var hg,ci,yg=m(()=>{"use strict";hg=g(require("node:path")),ci=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
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
        </li>`}).join("")});var Ag,Oe,W_,L_,Mo,R_,Sg,_g=m(()=>{"use strict";Ag=g(require("node:path"));mg();fg();yg();Oe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),W_=()=>`(() => {
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
})();`,Mo=e=>{let t=ug({installed:e.installed}),r=e.flashError?`<div class="alert-error">${Oe(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Oe(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':R_(e.reveal),o=e.reveal?.scanRoots[0]?.trim()??"",s=o.length>0&&e.scanFolder.trim()===o,a=!e.importSectionExpanded,i=a?`<section class="card">
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
    <script>${W_()}</script>
    <script>${L_()}</script>`;return`${t}${r}${i}${c}`},R_=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,a=t.get(s)??{sets:[]};t.set(s,{sets:[...a.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let a=o.sets.map(({set:i,setIndex:c})=>{let p=gg(i.items.map(h=>({...h,relativePath:typeof h.relativePath=="string"&&h.relativePath.length>0?h.relativePath:Ag.default.relative(i.sourceRoot,h.sourcePath).replaceAll("\\","/")}))),d=ci(p,Oe),u=i.items.length;return`<div class="harness-set-block">
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
    </form>`},Sg=(e,t)=>{let r=new Set(e.getAll("includeSet").map(a=>Number.parseInt(String(a),10)).filter(a=>Number.isFinite(a))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[a,i]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(a);if(c===null)continue;let p=Number.parseInt(c[1]??"",10),d=i.trim();Number.isFinite(p)&&d.length>0&&o.set(p,d)}let s=[];for(let a=0;a<n;a+=1){let i=e.get(`setSlug-${a}`)?.trim()??"",c=e.get(`setGroupIndex-${a}`),p=c===null?null:Number.parseInt(c,10),d=p!==null&&Number.isFinite(p)?o.get(p):void 0,u=e.get(`setName-${a}`)?.trim()??d??i,h=t.sets[a];if(h===void 0)continue;let S=i.length>0?i:h.proposedSlug,y=u.length>0?u:h.proposedName,l=r.size===0||r.has(a),A=h.items.map(_=>({id:_.id,kind:_.kind,title:_.title,sourcePath:_.sourcePath,include:l}));s.push({slug:S,name:y,items:A})}return s}});var Vr,di,bg,wg,k_,Ho,x_,vg,ui,Eg=m(()=>{"use strict";Vr=g(require("node:fs")),di=g(require("node:path")),bg=require("node:crypto");mo();wg=e=>di.default.join(e.harnessRootDir,"projects-registry.json"),k_=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Ho=e=>{let t=wg(e);if(!Vr.default.existsSync(t))return[];try{let r=JSON.parse(Vr.default.readFileSync(t,"utf8"));return k_(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string"):[]}catch{return[]}},x_=(e,t)=>{Vr.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};Vr.default.writeFileSync(wg(e),`${JSON.stringify(r,null,2)}
`)},vg=(e,t)=>{let r=et(t.projectFolderPath),n=t.name?.trim()||di.default.basename(r)||"Project",o=Ho(e),s=o.find(i=>et(i.projectFolderPath)===r);if(s!==void 0)return s;let a={id:(0,bg.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return x_(e,[...o,a]),a},ui=(e,t)=>Ho(e).find(r=>r.id===t)??null});var Wg,Lg=m(()=>{"use strict";Wg=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Do,mi,zr,T_,_e,Fo,Gt=m(()=>{"use strict";Do=g(require("node:fs")),mi=g(require("node:os")),zr=g(require("node:path")),T_=()=>Do.default.realpathSync(zr.default.resolve(mi.default.homedir())),_e=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?zr.default.join(mi.default.homedir(),t.slice(1)):t,n;try{n=Do.default.realpathSync(zr.default.resolve(r))}catch{return null}let o=T_();return n===o||n.startsWith(`${o}${zr.default.sep}`)?n:null},Fo=e=>{let t=_e(e);if(t===null)return null;try{if(!Do.default.statSync(t).isFile())return null}catch{return null}return t}});var Q,Vt,Kr,C_,I_,P_,Rg,kg=m(()=>{"use strict";Q=g(require("node:fs")),Vt=g(require("node:path"));mo();Cr();Lg();Gt();Kr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),C_=e=>{if(!Q.default.existsSync(e))return null;try{let t=JSON.parse(Q.default.readFileSync(e,"utf8"));if(Kr(t)&&t.version===1)return t}catch{return null}return null},I_=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?Vt.default.join(e.harnessRootDir,n):Vt.default.join(e.harnessSetsDir,t,n);if(!Q.default.existsSync(o))return null;try{if(!Q.default.statSync(o).isFile())return null}catch{return null}return o},P_=(e,t)=>{let r={};if(Q.default.existsSync(e))try{let o=JSON.parse(Q.default.readFileSync(e,"utf8"));Kr(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};Q.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},Rg=e=>{let t=[...new Set(e.setSlugs.map(d=>d.trim()).filter(d=>d.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=et(e.projectFolderPath),n=_e(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=Q.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=C_(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let a=Kr(s.sets)?s.sets:{},i=Vt.default.join(n,".cursor"),c=0;for(let d of t){let u=a[d];if(!Kr(u))return{ok:!1,errorMessage:`Harness set "${d}" is not installed locally.`};let h=Array.isArray(u.items)?u.items:[];for(let S of h){if(!Kr(S))continue;let y=typeof S.path=="string"?S.path.trim():"";if(y.length===0)continue;let l=Wg(y);if(l===null)continue;let A=I_(e.layout,d,y);if(A===null)continue;let _=Vt.default.join(i,l);Q.default.mkdirSync(Vt.default.dirname(_),{recursive:!0}),Q.default.copyFileSync(A,_),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let p=ye({projectFolderPath:n});return P_(p.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var Me,pi,xg=m(()=>{"use strict";Me=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pi=e=>{let t=e.flashError?`<div class="alert-error">${Me(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Me(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
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
    </section>`}});var Uo,Tg,Cg=m(()=>{"use strict";Uo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tg=e=>{let t=e.flashError?`<div class="alert-error">${Uo(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Uo(e.flashMessage)}</div>`:"",r=e.projects.length===0?'<p class="empty">No projects yet. Add a repo folder to link harness sets and run tasks in context.</p>':`<ul class="project-list">${e.projects.map(n=>`<li class="project-list-item">
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
    </section>`}});var gi,fi,Ig=m(()=>{"use strict";gi=g(require("node:fs"));Tr();fi=e=>{let t=Pe(e);if(!gi.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse(gi.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var yi,hi,zt,Pg=m(()=>{"use strict";yi=g(require("node:fs")),hi=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zt=e=>{if(!yi.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(yi.default.readFileSync(e.harnessManifestPath,"utf8"));if(!hi(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=hi(t.sets)?t.sets:{},o=Object.entries(n).map(([s,a])=>{if(!hi(a))return null;let i=typeof a.slug=="string"&&a.slug.length>0?a.slug:s,c=typeof a.name=="string"&&a.name.length>0?a.name:i,p=typeof a.updatedAt=="string"?a.updatedAt:"",d=Array.isArray(a.items)?a.items:[];return{slug:i,name:c,itemCount:d.length,updatedAt:p}}).filter(s=>s!==null).toSorted((s,a)=>s.name.localeCompare(a.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Ai,Ng=m(()=>{"use strict";Ai=()=>"~"});var Og,Si,Mg=m(()=>{"use strict";Og=require("node:child_process"),Si=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Og.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var Hg,Dg,Fg=m(()=>{"use strict";Hg=require("node:crypto"),Dg=e=>`local-${(0,Hg.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var _i,Ug=m(()=>{"use strict";_i=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var qr,jo,bi=m(()=>{"use strict";qr=g(require("node:path")),jo=e=>{let t=qr.default.dirname(e),r=qr.default.basename(t);return r==="agents"?qr.default.basename(qr.default.dirname(t)):r}});var Jr,be,jg,N_,O_,M_,$o,$g,wi=m(()=>{"use strict";Jr=g(require("node:fs")),be=g(require("node:path"));Fg();Ug();bi();jg=new Set(["node_modules",".git","dist","build",".next","coverage"]),N_=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},O_=(e,t)=>{let r=be.default.basename(t);if(e==="skill"){let n=t.split(be.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},M_=e=>{let t=[],r=(o,s)=>{let a;try{a=Jr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(i.name.startsWith(".")||i.isDirectory()&&jg.has(i.name))continue;let c=be.default.join(o,i.name),p=s?be.default.join(s,i.name):i.name;if(i.isDirectory()){r(c,p);continue}if(!i.isFile())continue;_i(p.replaceAll("\\","/"))!==null&&t.push({relativePath:p,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=be.default.join(e,o);Jr.default.existsSync(s)&&r(s,o)}let n=be.default.join(e,"skills");return Jr.default.existsSync(n)&&r(n,"skills"),t},$o=e=>{let t=M_(e);if(t.length===0)return null;let r=be.default.dirname(e),n=jo(e),o=N_(n),s=t.map(a=>{let i=_i(a.relativePath.replaceAll("\\","/"));if(i===null)throw new Error(`Unexpected harness file: ${a.relativePath}`);return{id:Dg(a.absolutePath),kind:i,title:O_(i,a.relativePath),sourcePath:a.absolutePath,relativePath:a.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},$g=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let a;try{a=Jr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let i of a){if(r())return;if(!i.isDirectory()||jg.has(i.name))continue;let c=be.default.join(o,i.name);if(i.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var Bg,vi,H_,Gg,Vg=m(()=>{"use strict";Bg=g(require("node:fs")),vi=g(require("node:path"));wi();Gt();H_=e=>{let t=_e(e.trim());if(t===null)return null;if(vi.default.basename(t)===".cursor")return t;let r=vi.default.join(t,".cursor");try{if(Bg.default.statSync(r).isDirectory())return _e(r)}catch{return null}return null},Gg=e=>{let t=H_(e.projectPath);if(t===null)return null;let r=$o(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(a=>a.sourceRoot!==r.sourceRoot),r].toSorted((a,i)=>a.proposedName.localeCompare(i.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var zg,D_,Bo,Kg,qg=m(()=>{"use strict";zg=g(require("node:path"));wi();Gt();bi();D_=5,Bo=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Kg=e=>{let t=_e(e.scanRoot.trim());if(t===null)return Bo(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of $g(t,D_,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let a=_e(s);if(a===null)continue;let i=jo(a);Bo(e.response,"folder",{cursorDir:a,groupName:i,repoPath:zg.default.dirname(a)});let c=$o(a);c!==null&&(r.push(c),Bo(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:i,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(p=>p.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,a)=>s.proposedName.localeCompare(a.proposedName))};return Bo(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var Jg,Yg,Xg=m(()=>{"use strict";Jg=g(require("node:path")),Yg=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Jg.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var H,Zg,Ei,F_,Qg,Wi,Li,ef,Go,tf=m(()=>{"use strict";H=g(require("node:fs")),Zg=g(require("node:os")),Ei=g(require("node:path"));Os();Gt();Xg();F_=e=>{if(!H.default.existsSync(e))return null;try{let t=JSON.parse(H.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Qg=e=>{let t=e.hostname??Zg.default.hostname(),r=F_(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let a of e.sets){let i=a.items.filter(d=>d.include);if(i.length===0)continue;let c=[];for(let d of i){let u=Fo(d.sourcePath);if(u===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${d.sourcePath}`};let h=H.default.readFileSync(u,"utf8");c.push({id:d.id,kind:d.kind,title:d.title,content:h,setSlugs:[a.slug]})}let p=jn({bundle:{name:a.name,slug:a.slug,items:c},hostname:t,existingManifest:r});r=p.manifest;for(let d of p.directories)o.add(d);for(let d of p.files)s.push(d),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{H.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let a of o)H.default.mkdirSync(`${e.layout.harnessRootDir}/${a}`,{recursive:!0});for(let a of s){let i=Ei.default.join(e.layout.harnessRootDir,a.relativePath);H.default.mkdirSync(Ei.default.dirname(i),{recursive:!0}),H.default.writeFileSync(i,a.content)}return H.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Harness submit failed."}}},Wi="reveal-cache.json",Li=(e,t)=>{H.default.mkdirSync(e.harnessRootDir,{recursive:!0}),H.default.writeFileSync(`${e.harnessRootDir}/${Wi}`,`${JSON.stringify(t,null,2)}
`)},ef=e=>{let t=`${e.harnessRootDir}/${Wi}`;H.default.existsSync(t)&&H.default.unlinkSync(t)},Go=e=>{let t=`${e.harnessRootDir}/${Wi}`;if(!H.default.existsSync(t))return null;try{let r=JSON.parse(H.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return Yg(r)}catch{return null}return null}});var rf,nf=m(()=>{"use strict";rf=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var He,of,U_,sf,Ri,af=m(()=>{"use strict";He=g(require("node:fs")),of=g(require("node:path")),U_=256e3,sf=e=>{He.default.mkdirSync(of.default.dirname(e),{recursive:!0}),He.default.writeFileSync(e,"","utf8")},Ri=(e,t=U_)=>{if(!He.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=He.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,a=Buffer.alloc(s),i=He.default.openSync(e,"r");try{He.default.readSync(i,a,0,s,o)}finally{He.default.closeSync(i)}let c=a.toString("utf8");if(o>0){let p=c.indexOf(`
`);p>=0&&(c=c.slice(p+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var lf,cf,ki,df,uf=m(()=>{"use strict";lf=require("node:crypto"),cf=g(require("node:fs"));cr();Nn();Ve();ze();ki=!1,df=async e=>{if(ki)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!N(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=D();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=St({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&cf.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,lf.randomUUID)();ki=!0;try{if(await sc(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let i=await bt({workspace:o,claudeCommand:r.claudeCommand,codexCommand:r.codexCommand,cursorCommand:r.cursorCommand,antigravityCommand:r.antigravityCommand},e.writerAgent,t);return await In(n,s,i.exitCode,i.output)?{ok:i.exitCode===0,agentRunId:s,...i.exitCode===0?{}:{errorMessage:i.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{ki=!1}}});var mf,Vo,xi=m(()=>{"use strict";mf=g(require("node:path"));Ls();Rs();ze();ht();L();Vo=e=>{let t=D()?.layout.installDir??v();if(mf.default.basename(t)===On)return Es;let r=D(),n=r!==null?J(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):Es}});var pf,gf=m(()=>{"use strict";$e();At();xi();pf=async e=>{let t=$(e.installDir),r=t?.bundleVersion??null,n=Vo(t);try{let o=await fs(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:vn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var ff,hf=m(()=>{"use strict";ff=e=>!e});var yf,Af,Sf=m(()=>{"use strict";Za();yf=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},Af=async()=>{let e=await xo({force:!0});if(e.ok)return{ok:!0,message:yf(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:yf(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(At(),Rn)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var bf,Xr,wf,Ci,_f,j_,Ti,O,Ii,I,q,Yr,$_,B_,vf,Ef,Wf=m(()=>{"use strict";bf=g(require("node:http")),Xr=g(require("node:fs")),wf=g(require("node:path"));Hp();ko();Io();Fp();ai();fr();Wt();Oo();Jp();Xp();tg();ng();sg();dg();_g();Eg();kg();xg();Cg();Ig();Pg();Ng();Mg();Vg();Gt();qg();tf();Cr();nf();af();$e();uf();ze();xi();gf();hf();Sf();ei();Ci=e=>qp(e)??"never",_f=48e3,j_=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0?!0:zt(e).sets.length===0,Ti=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Ai(),reveal:t.reveal,installed:zt(e),flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),O=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ii={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},I=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Ii}),e.end(JSON.stringify(r))},q=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Yr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},$_=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${O(e.status.wakeError)}</div>`:"",o=ff(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${O(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${O(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${O(Ci(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${O(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},B_=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":null},vf=e=>{let t=wf.default.join(e.layout.installDir,"link-code.txt"),r=()=>$(e.layout.installDir),n=()=>{let d=r();return{installBundleVersion:rf(d),installBundleUpdatedAt:d?.updatedAt??null,installVersion:d}},o=async d=>{let u=d.installVersion??r(),h=await a(),S=Qp(h),y=eg(d.updateFlash??null);return cg({title:d.title,activePath:d.activePath,body:d.body,cloudAppOrigin:Vo(u),prependBody:`${y}${S}`,headerUpdateButtonHtml:Zp(h)})},s=null,a=async()=>{let d=Date.now();if(s!==null&&d-s.cachedAtMs<6e4)return s.offer;let u=await pf(e.layout);return s={cachedAtMs:d,offer:u},u},i=()=>{s=null},c=()=>{if(Xr.default.existsSync(t))return Xr.default.readFileSync(t,"utf8").trim();let d=Math.random().toString(36).slice(2,8).toUpperCase();return Xr.default.writeFileSync(t,d,"utf8"),d},p=bf.default.createServer((d,u)=>{(async()=>{let h=d.url?.split("?")[0]??"/",S=d.method??"GET";if(S==="OPTIONS"){u.writeHead(204,Ii),u.end();return}if(S==="GET"&&h==="/health"){let y=e.controllers.getStatus(),l=n();I(u,200,{ok:!0,...y,installBundleVersion:l.installBundleVersion,installBundleUpdatedAt:l.installBundleUpdatedAt});return}if(S==="GET"&&h==="/api/status"){let y=n();I(u,200,{...e.controllers.getStatus(),linkCode:c(),installBundleVersion:y.installBundleVersion,installBundleUpdatedAt:y.installBundleUpdatedAt});return}if(S==="GET"&&h==="/api/traffic"){I(u,200,{entries:Ro(e.layout)});return}if(S==="DELETE"&&h==="/api/traffic"){ep(e.layout),I(u,200,{ok:!0});return}if(S==="GET"&&h==="/api/trace"){I(u,200,{entries:si(e.layout)});return}if(S==="DELETE"&&h==="/api/trace"||S==="POST"&&h==="/api/trace/clear"){if(Ip(e.layout),S==="POST"){u.writeHead(303,{Location:"/status"}),u.end();return}I(u,200,{ok:!0});return}if(S==="POST"&&h==="/api/errors/clear"){sf(e.layout.errorLogPath),u.writeHead(303,{Location:"/errors"}),u.end();return}if(S==="GET"&&h==="/api/knowledge"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(l.length>0){let A=await Br({layout:e.layout,query:l,limit:20});I(u,200,{chunks:A,query:l});return}I(u,200,{chunks:$r(e.layout).slice(-50).reverse()});return}if(S==="POST"&&h==="/api/revive"){e.controllers.reviveWebSocket(),I(u,200,{ok:!0});return}if(S==="GET"&&h==="/api/update-status"){let y=await a();I(u,200,{ok:!0,...y});return}if(S==="POST"&&h==="/api/update"){i();let y=await Af();i(),u.writeHead(303,{Location:y.ok?"/?update=ok":"/?update=failed"}),u.end();return}if(S==="GET"&&h==="/"){let y=e.controllers.getStatus(),l=n(),A=zt(e.layout),_=Ri(e.layout.errorLogPath);q(u,await o({title:"Home",activePath:"/",installVersion:l.installVersion,updateFlash:B_(d.url??void 0),body:rg({wsConnected:y.wsConnected,lastHeartbeatAt:y.lastHeartbeatAt,harnessSetCount:A.sets.length,knowledgeChunkCount:$r(e.layout).length,trafficEntryCount:Ro(e.layout).length,wakeError:y.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(S==="GET"&&h==="/task"){let y=e.controllers.getStatus(),l=n(),A=D(),_=new URL(d.url??"/",`http://127.0.0.1:${43347}`),f=_.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,b=_.searchParams.get("failed")==="1"?_.searchParams.get("error")?.trim()??"Task failed.":null,w=_.searchParams.get("runId");q(u,await o({title:"Task",activePath:"/task",installVersion:l.installVersion,body:og({defaultWorkspace:A?.workspace??"",wsConnected:y.wsConnected,flashMessage:f,flashError:b,lastRunId:w})}));return}if(S==="POST"&&h==="/task/dispatch"){let y=await Yr(d),l=new URLSearchParams(y),A=l.get("prompt")?.trim()??"",_=l.get("writerAgent")?.trim()??"claude-cli",f=l.get("projectFolder")?.trim()??"",b=await df({prompt:A,writerAgent:_,...f.length>0?{projectFolderPath:f}:{}}),w=new URLSearchParams;b.ok?w.set("ok","1"):(w.set("failed","1"),b.errorMessage!==void 0&&w.set("error",b.errorMessage.slice(0,240))),b.agentRunId!==void 0&&w.set("runId",b.agentRunId),u.writeHead(303,{Location:`/task?${w.toString()}`}),u.end();return}if(S==="GET"&&h==="/errors"){let y=n(),l=Ri(e.layout.errorLogPath);q(u,await o({title:"Errors",activePath:"/errors",installVersion:y.installVersion,body:Yp({errorLogPath:e.layout.errorLogPath,content:l.content,exists:l.exists,truncated:l.truncated,byteSize:l.byteSize})}));return}if(S==="GET"&&h==="/status"){let y=e.controllers.getStatus(),l=X(e.layout),A=oe(l,ne),_=n();q(u,await o({title:"Status",activePath:"/status",installVersion:_.installVersion,body:`${$_({status:y,stale:A,linkCode:c(),installBundleVersion:_.installBundleVersion,installBundleUpdatedAt:_.installBundleUpdatedAt})}${Dp({entries:si(e.layout)})}`}));return}if(S==="GET"&&h==="/traffic"){let y=Ro(e.layout),l=n(),A=y.map(f=>`<tr><td title="${O(f.at)}">${O(Ci(f.at))}</td><td>${O(f.direction)}</td><td><code>${O(f.type)}</code></td><td>${O(f.summary)}</td><td>${O(f.action??"")}</td></tr>`).join(""),_=y.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${A}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';q(u,await o({title:"Traffic",activePath:"/traffic",installVersion:l.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${_}
            </section>`}));return}if(S==="GET"&&h==="/projects"){let y=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=n(),A=y.searchParams.get("added")==="1"?"Project added.":null;q(u,await o({title:"Projects",activePath:"/projects",installVersion:l.installVersion,body:Tg({projects:Ho(e.layout),flashMessage:A})}));return}if(S==="GET"&&h==="/project"){let y=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=y.searchParams.get("id")?.trim()??"",A=ui(e.layout,l);if(A===null){u.writeHead(404),u.end("Project not found");return}let _=n(),f=y.searchParams.get("linked")==="1"?`Harness linked (${y.searchParams.get("files")??"0"} file(s) written).`:null;q(u,await o({title:A.name,activePath:"/projects",installVersion:_.installVersion,body:pi({project:A,installed:zt(e.layout),linkedSetSlugs:fi(A.projectFolderPath),flashMessage:f})}));return}if(S==="POST"&&h==="/projects/add"){let y=Si();if(y===null){u.writeHead(303,{Location:"/projects"}),u.end();return}ye({projectFolderPath:y}),vg(e.layout,{projectFolderPath:y}),u.writeHead(303,{Location:"/projects?added=1"}),u.end();return}if(S==="POST"&&h==="/projects/link-harness"){let y=await Yr(d),l=new URLSearchParams(y),A=l.get("projectId")?.trim()??"",_=ui(e.layout,A);if(_===null){u.writeHead(404),u.end("Project not found");return}let f=l.getAll("applySet").map(w=>String(w)),b=Rg({layout:e.layout,projectFolderPath:_.projectFolderPath,setSlugs:f});if(!b.ok){let w=n();q(u,await o({title:_.name,activePath:"/projects",installVersion:w.installVersion,body:pi({project:_,installed:zt(e.layout),linkedSetSlugs:fi(_.projectFolderPath),flashError:b.errorMessage})}));return}u.writeHead(303,{Location:`/project?id=${encodeURIComponent(_.id)}&linked=1&files=${b.writtenFileCount}`}),u.end();return}if(S==="GET"&&h==="/harness"){let y=new URL(d.url??"/",`http://127.0.0.1:${43347}`),l=n(),A=Go(e.layout),_=y.searchParams.get("submitted")==="1",f=_?y.searchParams.get("syncFailed")==="1"?`Local harness updated (${y.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:y.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${y.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":y.searchParams.get("stopped")==="1"?`Reveal stopped. ${A?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:y.searchParams.get("revealed")==="1"?`Reveal found ${A?.sets.length??0} set(s).`:null,b=A?.scanRoots[0]??Ai(),w=j_(e.layout,{reveal:A,importQuery:y.searchParams.get("import")==="1",justSubmitted:_});q(u,await o({title:"Harness",activePath:"/harness",installVersion:l.installVersion,body:Mo(Ti(e.layout,{reveal:A,scanFolder:b,flashMessage:f,importSectionExpanded:w}))}));return}if(S==="POST"&&h==="/api/harness/pick-folder"){let y=Si();if(y===null){I(u,200,{cancelled:!0});return}I(u,200,{path:y});return}if(S==="GET"&&h==="/api/harness/file-content"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",A=Fo(l);if(A===null){I(u,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=Xr.default.readFileSync(A,"utf8"),f=_.length>_f?`${_.slice(0,_f)}
\u2026 (truncated)`:_;I(u,200,{content:f})}catch{I(u,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&h==="/api/harness/reveal/add-project"){let y=await Yr(d),l="";try{let f=JSON.parse(y);typeof f=="object"&&f!==null&&typeof f.projectPath=="string"&&(l=f.projectPath.trim())}catch{I(u,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(l.length===0){I(u,400,{ok:!1,errorMessage:"projectPath is required."});return}let A=Go(e.layout),_=Gg({reveal:A,projectPath:l});if(_===null||_.sets.length===0){I(u,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Li(e.layout,_),I(u,200,{ok:!0,setCount:_.sets.length});return}if(S==="GET"&&h==="/api/harness/reveal/stream"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(l.length===0){I(u,400,{errorMessage:"Choose a folder to scan first."});return}let A=!1;d.on("close",()=>{A=!0}),u.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Ii});let _=Kg({scanRoot:l,response:u,shouldAbort:()=>A});Li(e.layout,_),u.end();return}if(S==="POST"&&h==="/harness/reveal"){u.writeHead(410,{"Content-Type":"text/plain"}),u.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&h==="/harness/submit"){let y=Go(e.layout);if(y===null){let T=n();q(u,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:Mo(Ti(e.layout,{reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let l=await Yr(d),A=new URLSearchParams(l),_=Sg(A,y),f=Qg({layout:e.layout,sets:_});if(!f.ok){let T=n();q(u,await o({title:"Harness",activePath:"/harness",installVersion:T.installVersion,body:Mo(Ti(e.layout,{reveal:y,flashError:f.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}ef(e.layout);let w=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";u.writeHead(303,{Location:`/harness?submitted=1&count=${f.writtenItemCount??0}${w}`}),u.end();return}if(S==="GET"&&h==="/knowledge"){let l=new URL(d.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",A=n(),f=(l.length>0?await Br({layout:e.layout,query:l,limit:20}):$r(e.layout).slice(-50).reverse()).map(b=>`<article class="card"><div class="muted" title="${O(b.createdAt)}">${O(Ci(b.createdAt))}${b.source?` \xB7 ${O(b.source)}`:""}</div><pre>${O(b.text)}</pre></article>`).join("");q(u,await o({title:"Knowledge",activePath:"/knowledge",installVersion:A.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${O(l)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${f||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}S==="POST"&&await Yr(d),u.writeHead(404),u.end("Not found")})().catch(h=>{console.error("[agent-witch-local-app]",h),u.writeHead(500),u.end("Internal error")})});return p.on("error",d=>{if(d.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",d)}),p.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Mp}`)}),p},Ef=e=>Qa(e).publicKeyRaw});var Zr,Pi,Lf,Rf,kf,xf,Tf=m(()=>{"use strict";Zr=g(require("node:fs")),Pi=g(require("node:path"));gt();Tr();Lf=(e,t)=>Pi.default.join(Pe(t).memoryDirPath,hn),Rf=(e,t)=>{let r=Lf(e,t);if(!Zr.default.existsSync(r))return[];let n=Zr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},kf=e=>{let t=Lf(e.layout,e.projectFolderPath);Zr.default.mkdirSync(Pi.default.dirname(t),{recursive:!0}),Zr.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},xf=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let a=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,i=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${a}
Result: ${i}`}).join(`

`)}

---

`});var Cf,G_,V_,z_,If,Pf=m(()=>{"use strict";Cf=g(require("node:os"));L();G_="Default",V_=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),z_=e=>{let t=Cf.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},If=()=>{let e=W(),t=Yi(e),r=V_(G_);return`${z_(t)}/${r.length>0?r:"project"}`}});var Nf,K_,Of,Mf=m(()=>{"use strict";Nf=require("node:child_process");vo();Ve();K_=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,Nf.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",a=>{o(a===0)})})},Of=async e=>{if(!N(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};try{await Ne(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await K_(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var Hf,Df=m(()=>{"use strict";Hf=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var Ff,Uf,jf=m(()=>{"use strict";Ff=require("node:crypto"),Uf=()=>(0,Ff.randomUUID)()});var Qr,q_,$f,zo=m(()=>{"use strict";Qr="[[WORKING_ESTIMATE]]",q_=["Put this marker on its own line:",Qr,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),$f=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",q_,"","Task to estimate:",e.trim()].join(`
`)});var Bf,Gf=m(()=>{"use strict";Bf=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Vf,zf=m(()=>{"use strict";Vf=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var J_,Kf,qf=m(()=>{"use strict";zo();J_=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Kf=e=>{if(!e.includes(Qr))return null;let t=null;for(let r of e.matchAll(J_)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var Jf,Yf=m(()=>{"use strict";Nn();zo();Gf();zf();qf();Qt();Jf=async e=>{let t=Bf(e.wrappedPrompt),r=$f(t),n=await bt(e.config,e.writerAgent,r),o=Kf(n.output),s=Vf(o);return Zt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:re.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var Xf={};De(Xf,{buildContinuationPromptWithContext:()=>Z_});var Y_,X_,Z_,Zf=m(()=>{"use strict";Y_=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,X_=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Z_=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=X_(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${Y_(n,o)}`:null].filter(a=>a!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var Qf={};De(Qf,{readHarnessExportSets:()=>eb});var en,Ni,Ko,Q_,eb,eh=m(()=>{"use strict";en=g(require("node:fs")),Ni=g(require("node:path"));L();Ko=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Q_=e=>{if(!en.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(en.default.readFileSync(e.harnessManifestPath,"utf8"));if(Ko(t))return t}catch{return null}return null},eb=(e,t)=>{let r=W(t),n=Q_(r);if(n===null)return[];let o=Ko(n.sets)?n.sets:{},s=[];for(let a of e){let i=o[a];if(!Ko(i)||typeof i.name!="string")continue;let c=Array.isArray(i.items)?i.items:[],p=[];for(let d of c){if(!Ko(d))continue;let u=typeof d.path=="string"?d.path:void 0,h=typeof d.id=="string"?d.id:"",S=typeof d.kind=="string"?d.kind:"",y=typeof d.title=="string"?d.title:"";if(u===void 0||h.length===0||S.length===0||y.length===0)continue;let l=u.startsWith("shared/")?Ni.default.join(r.harnessRootDir,u):Ni.default.join(r.harnessSetsDir,a,u);en.default.existsSync(l)&&p.push({id:h,kind:S,title:y,content:en.default.readFileSync(l,"utf8")})}p.length>0&&s.push({name:i.name,slug:a,items:p})}return s}});var ih={};De(ih,{startAgentWitchClient:()=>gb});var Hi,tn,Kt,fb,tb,rb,nb,ob,th,sb,rh,nh,oh,Oi,k,sh,C,Mi,ab,qo,ib,lb,cb,db,ub,mb,pb,ah,gb,lh=m(()=>{"use strict";Hi=require("node:child_process"),tn=g(require("node:fs")),Kt=g(require("node:os"));mu();gn();ms();is();Ta();Ue();Su();wu();Vu();vt();L();Xm();cr();_o();za();vo();Ve();Da();fr();Wt();So();Qm();op();$e();ap();cp();ei();ko();Io();Op();Wf();ai();Tf();ht();Pf();Cr();Mf();cs();wn();lt();An();Df();jf();zo();Qt();Yf();xs();fb={},tb="claude",rb="codex",nb="cursor",ob="agy",th=3e4,sb=3e4,rh=new Map,nh=new Map,oh=new Map,Oi=e=>{let t=e?.trim()??"";return t.length>0?t:If()},k=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sh=e=>{let t=W(e);if(!tn.default.existsSync(t.configPath))return null;try{let r=JSON.parse(tn.default.readFileSync(t.configPath,"utf8"));if(!k(r))throw new Error("Config must be a JSON object.");let n=typeof r.wsUrl=="string"?r.wsUrl.trim():"",o=Mn({installDir:t.installDir,configWsUrl:n}),s=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),a=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??tb,i=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??rb,c=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??nb,p=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??ob,d=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",u=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return d.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:u,wsUrl:o,workspace:s,claudeCommand:a,codexCommand:i,cursorCommand:c,antigravityCommand:p,pairingToken:d,layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},C=(e,t,r)=>{e.readyState===Wr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(st(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),oi(r,"out",t)))},Mi=e=>e,ab=e=>{if(!tn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(tn.default.readFileSync(e.harnessManifestPath,"utf8"));if(k(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},qo=(e,t)=>{let r=ab(t);r!==null&&C(e,{type:"harness.manifest.report",payload:{hostname:Kt.default.hostname(),manifest:r}})},ib=async(e,t,r,n,o,s,a=!1,i,c,p,d)=>{if(!N(t)){C(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let u=Eo(t)&&!Mm(t);if(u){try{await Ne(e.layout.installDir,t)}catch(b){let w=b instanceof Error?b.message:String(b);C(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}Ga(t)}else if(!Eo(t))try{await Ne(e.layout.installDir,t)}catch(b){let w=b instanceof Error?b.message:String(b);C(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=a&&Om(t)&&Hm(t)?"continue":"first",S=r;if(a&&h==="first"&&typeof c=="string"&&c.length>0){let b=yo(e.layout,c);if(b!==null){let{buildContinuationPromptWithContext:w}=await Promise.resolve().then(()=>(Zf(),Xf));S=w({priorPrompt:b.prompt,priorOutput:b.resultOutput??"",userMessage:r})}}let y=Oi(p);ye({projectFolderPath:y});let l=await Br({layout:e.layout,query:S,limit:5,projectFolderPath:y}),A=Rf(e.layout,y),_=`${xf(A)}${Bp(l)}${S}`,f=d?.trim()??(s!==void 0&&y.trim().length>0?Uf():void 0);if(s!==void 0&&f!==void 0&&f.length>0&&y.trim().length>0){_n({reportKey:f,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let b=await Jf({config:{workspace:e.workspace,claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand},writerAgent:t,wrappedPrompt:_,reportKey:f,agentRunId:s});if(b.estimateSeconds!==null){let w=`${Qr}
${b.estimateSeconds}
`;rt(s)?C(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:w},requestId:n}):Dt(s,w)}_=Hf(_,b),_=Sl(_,{agentRunId:s,reportKey:f,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}Ja(e,t,_,n,Mi(o),s,{sessionTurn:h},i,y,f),u&&s!==void 0&&C(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Fm(t)},requestId:n})},lb=async(e,t,r,n,o)=>{let s=(a,i)=>{C(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:a,exitCode:i},requestId:n})};try{let a="",i=await Um({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,commands:xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:d=>{a+=d,C(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:d},requestId:n})}}),c=N(t)?t:"claude-cli",p=i.exitCode!==0?i.output:a.length>0?Wo(c):i.output;s(p,i.exitCode)}catch(a){let i=a instanceof Error?a.message:String(a);console.error("[agent-witch] Writer session start failed:",i),s(`Failed to start ${t} session: ${i}
`,-1)}},cb=(e,t,r)=>new Promise(n=>{if(!N(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=_t(t,r,xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],a=(0,Hi.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});a.stdout?.on("data",i=>{s.push(i.toString("utf8"))}),a.stderr?.on("data",i=>{s.push(i.toString("utf8"))}),a.on("close",i=>{n({exitCode:i??-1,output:s.join("").trim()})}),a.on("error",i=>{n({exitCode:-1,output:i.message})})}),db=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(C(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){C(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!N(o)){C(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let a=await(async()=>{try{await Ne(e.layout.installDir,o)}catch(i){let c=i instanceof Error?i.message:String(i);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return cb(e,o,s)})();C(n,{type:"harness.request.result",payload:{success:a.exitCode===0,writerAgent:o,exitCode:a.exitCode,output:a.output},requestId:r}),qo(n,e.layout)},ub=e=>{let t=1e3*2**e;return Math.min(sb,t)},mb=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,Zm().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,A="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,np({layout:e.layout,remoteBundleVersion:l,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=X(e.layout);l!==null&&oe(l,ne)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,i(),c(),S())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},i=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let l=t.socket;t.socket=void 0,t.wsConnected=!1,l.removeAllListeners("open"),l.removeAllListeners("message"),l.removeAllListeners("close"),l.on("error",()=>{}),(l.readyState===Wr.OPEN||l.readyState===Wr.CONNECTING)&&l.close()},p=()=>{a(),t.localHealthTimer=setInterval(o,th)},d=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=ub(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,S()},l)},u=l=>{s();let A=()=>{let _=$(e.layout.installDir)?.bundleVersion??null,f=Y();C(l,{type:"agent.heartbeat",payload:{hostname:Kt.default.hostname(),macOsUsername:Kt.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},..._!==null?{installBundleVersion:_}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,th)},h=(l,A)=>{if(typeof l.type!="string")return;st(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"}),oi(e.layout,"in",l);let _=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&k(l.payload)){let f=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",b=typeof l.payload.origin=="string"?l.payload.origin:"",w=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",T=typeof l.payload.challenge=="string"?l.payload.challenge:"",G=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!Sp({serverPublicKey:f,origin:b,devicePublicKey:w,challenge:T,serverAttestation:G})){t.wakeError="Server attestation verification failed",st(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&k(l.payload)){let f=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";st(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),Of({layout:e.layout,writerAgent:f,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{C(A,{type:"writer.status",payload:b},e.layout)})}if(l.type==="install.bundle.update"&&k(l.payload)){let f=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";f.length>0&&n(f,"install.bundle.update")}if(l.type==="system.ack"){Fs(e.layout,{wsUrl:e.wsUrl});let f=k(l.payload)?l.payload:null,b=sp(f);b!==null&&n(b)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&k(l.payload)&&ip(l.payload),l.type==="automations.run"&&k(l.payload)&&lp(l.payload),l.type==="terminal.stream.accepted"&&k(l.payload)){let f=typeof l.payload.runId=="string"?l.payload.runId:"";if(f.length>0){let b=pm(f);for(let w of b)C(A,{type:"terminal.stream.chunk",payload:{runId:f,chunk:w},requestId:_})}}if(l.type==="agent.agentRun.list"&&C(A,{type:"dashboard.agentRun.list.result",payload:{runs:om(e.layout)},requestId:_}),l.type==="agent.agentRun.get"&&k(l.payload)){let f=typeof l.payload.runId=="string"?l.payload.runId:"",b=f.length>0?yo(e.layout,f):null;C(A,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:_})}if(l.type==="command.claude.run"&&k(l.payload)){let f=l.payload.prompt,b=typeof l.payload.writerAgent=="string"&&N(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",w=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,T=l.payload.sessionContinuation===!0,G=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,we=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,it=Oi(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),qt=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof f=="string"&&f.trim().length>0&&(console.log(`[agent-witch] Running ${b} task (${T?"continue":"first"})\u2026`),w!==void 0&&we!==void 0&&rh.set(w,we),w!==void 0&&(nh.set(w,it),oh.set(w,f.trim()),ye({projectFolderPath:it})),ib(e,b,f.trim(),_,A,w,T,we,G,it,qt))}if(l.type==="shell.session.open"&&k(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:120,w=typeof l.payload.rows=="number"?l.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Em({shellSessionId:f,cwd:e.workspace,cols:b,rows:w,send:T=>{C(A,T)},requestId:_}))}if(l.type==="shell.session.close"&&k(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";f.length>0&&Mr(f,b=>{C(A,b)},_)}if(l.type==="shell.input"&&k(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.data=="string"?l.payload.data:"";f.length>0&&b.length>0&&bm(f,b)}if(l.type==="shell.resize"&&k(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:0,w=typeof l.payload.rows=="number"?l.payload.rows:0;f.length>0&&b>0&&w>0&&wm(f,b,w)}if(l.type==="command.writer.session.end"&&k(l.payload)){let f=l.payload.writerAgent;typeof f=="string"&&N(f)&&Dm(f)}if(l.type==="command.writer.session.start"&&k(l.payload)){let f=l.payload.writerAgent,b=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof f=="string"&&N(f)&&b.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),lb(e,f,b,_,A))}if(l.type==="command.claude.stop"&&k(l.payload)){let f=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),Ym(e,Mi(A),f,_))}if(l.type==="command.claude.input_respond"&&k(l.payload)){let f=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",b=typeof l.payload.response=="string"?l.payload.response.trim():"",w=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",T=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",G=typeof l.payload.question=="string"?l.payload.question:"";f.length>0&&b.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),qm(e,{agentRunId:f,originalPrompt:w,partialOutput:T,question:G,response:b,shellSessionId:rh.get(f)},_,Mi(A)))}if(l.type==="dispatch.approval.required"&&k(l.payload)){let f=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",b=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${b}`),process.platform==="darwin"&&(0,Hi.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&k(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),db(e,l.payload,_,A)),l.type==="harness.export.request"&&k(l.payload)){let f=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",b=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,w=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(T=>typeof T=="string"):[];f.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:T}=await Promise.resolve().then(()=>(eh(),Qf)),G=T(w,e.email);C(A,{type:"harness.export.result",payload:{success:G.length>0,borrowerUserId:f,...b!==void 0?{targetDeviceId:b}:{},sets:G,errorMessage:G.length>0?void 0:"No readable harness sets were found on this machine."},requestId:_})})()}if(l.type==="harness.manifest.request"&&qo(A,e.layout),l.type==="command.claude.result"&&k(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let f=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,b=Oi(f!==void 0?nh.get(f):void 0),w=f!==void 0?oh.get(f)??"":"";$p({layout:e.layout,text:l.payload.output,source:f??"command.claude.result",projectFolderPath:b}),w.trim().length>0&&kf({layout:e.layout,projectFolderPath:b,entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:w,output:l.payload.output,createdAt:new Date().toISOString()}})}},S=()=>{if(t.stopped)return;i(),c();let l=new Wr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Fs(e.layout,{wsUrl:e.wsUrl}),Gm(St({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Vm(e.layout);let A=J(e.wsUrl)??"http://localhost:3000",_=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Ap({layout:e.layout,origin:A,..._!==void 0&&_.length>0?{claimToken:_}:{}});C(l,{type:"agent.register",payload:{role:"agent",hostname:Kt.default.hostname(),macOsUsername:Kt.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),qo(l,e.layout),Jm(e,l),u(l)}),l.on("message",A=>{let _=typeof A=="string"?A:A.toString("utf8");try{let f=JSON.parse(_);if(!k(f))return;h(f,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",(A,_)=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1;let f=typeof _=="string"?_:_.toString("utf8");jt(e.layout,{kind:"ws_close",message:"WebSocket closed",code:A,reason:f}),console.log("[agent-witch] Disconnected from server."),d()}),l.on("error",A=>{t.wakeError=A.message,jt(e.layout,{kind:"ws_error",message:A.message,stack:A.stack}),console.error(`[agent-witch] Socket error: ${A.message}`)})};return{connect:S,startLocalHealthCheck:p,stop:()=>{t.stopped=!0,s(),a(),i(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Ef(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,S()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(qo(l,e.layout),{ok:!0})}}},pb=async()=>{let e=()=>{let r=el();if(r.length===0){let n=sh(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=sh(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},ah=async()=>{pt("agent-witch"),hu().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=v();bu(t);let r=Au({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),En();let n=await pb(),o=n[0];o!==void 0&&Np(o.layout);let s=n.map(u=>mb(u)),a=s[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),xa(),process.exit(0));let i=()=>{n.forEach((u,h)=>{let S=X(u.layout);S!==null&&!oe(S,ne)||s[h]?.reviveWebSocket()})},c=()=>{},p=await Gu({reconnectWebSockets:i,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),c()}});vf({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:i,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}});for(let u of s)u.startLocalHealthCheck(),u.connect();console.log(`[agent-witch] Bridging ${s.length} account profile(s) in one process.`);let d=pn(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),mn(),c()});c=()=>{d(),p.stop(),xa(),console.log("[agent-witch] Shutting down.");for(let u of s)u.stop();process.exit(0)},process.on("SIGINT",()=>{c()}),process.on("SIGTERM",()=>{c()})},gb=ah;if(ft(fb.url)&&!te()){let e=process.argv.indexOf("report");e>=0&&process.exit(bn(process.argv.slice(e))),ah()}});gn();cs();wn();var Rl="20.x",kl="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var Fh=e=>[`Node.js ${Rl} or newer is required (found ${e}).`,kl].join(" "),xl=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${Fh(process.version)}
`),process.exit(1))};var Sb={},hb=async()=>{pt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(At(),Rn)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},yb=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(oa(),id)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Ab=async()=>{if(!ft(Sb.url))return;xl();let e=process.argv.indexOf("report");e>=0&&process.exit(bn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await hb();return}if(t==="wake"){await yb();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(lh(),ih));await r()};Ab();
