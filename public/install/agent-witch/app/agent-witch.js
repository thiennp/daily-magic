#!/usr/bin/env node
"use strict";var Oy=Object.create;var Is=Object.defineProperty;var Ny=Object.getOwnPropertyDescriptor;var My=Object.getOwnPropertyNames;var Hy=Object.getPrototypeOf,Dy=Object.prototype.hasOwnProperty;var u=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var V=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Re=(e,t)=>{for(var r in t)Is(e,r,{get:t[r],enumerable:!0})},Fy=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of My(t))!Dy.call(e,o)&&o!==r&&Is(e,o,{get:()=>t[o],enumerable:!(n=Ny(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?Oy(Hy(e)):{},Fy(t||!e||!e.__esModule?Is(r,"default",{value:e,enumerable:!0}):r,e));var Ml,Hl,Os=u(()=>{"use strict";Ml=new Set(["","loginwindow","_mbsetupuser","root"]),Hl=5e3});var Dl,En,Ns=u(()=>{"use strict";Dl=require("node:child_process"),En=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Dl.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ce,vt=u(()=>{"use strict";ce=()=>!0});var Ln,Fl,Uy,xn,Ms=u(()=>{"use strict";Ln=g(require("node:path")),Fl=require("node:url");vt();Uy={},xn=()=>{if(ce()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Ln.default.dirname(Ln.default.resolve(e))}return Ln.default.dirname((0,Fl.fileURLToPath)(Uy.url))}});var ye,Ul,Wt=u(()=>{"use strict";ye="agent-witch.js",Ul="command"});var Ds,Vl,k,jy,Hs,Fs,$y,By,Gy,Vy,Qe,zy,jl,$l,Bl,Us,Ae,Rn,Pn,Gl,kt,Et,v,zl,ur,Kl,ql,Cn,Jl,Yl,te,js,Ky,qy,Ce,Jy,L,x=u(()=>{"use strict";Ds=g(require("node:fs")),Vl=g(require("node:os")),k=g(require("node:path"));Ms();Wt();jy=xn(),Hs=".agent-witch",Fs=".local-agent-witch",$y=47892,By=47893,Gy="com.agent-witch",Vy="com.local-agent-witch",Qe="profiles",zy="active-profile.json",jl="harness",$l="sets",Bl="manifest.json",Us="projects",Ae="logs",Rn="agent-witch.log",Pn="agent-witch.error.log",Gl="reports",kt="device-keypair.json",Et=e=>e.trim().toLowerCase(),v=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return k.default.resolve(e);let t=k.default.resolve(jy),r=k.default.basename(t),n=k.default.basename(k.default.dirname(t));return r==="app"&&(n===Hs||n===Fs)?k.default.dirname(t):r===Hs||r===Fs?t:k.default.join(Vl.default.homedir(),Hs)},zl=(e=v())=>k.default.join(e,"app"),ur=(e=v())=>k.default.join(zl(e),ye),Kl=(e,t,r)=>t!==null?k.default.join(e,Qe,t,r):k.default.join(e,r),ql=e=>Kl(e.installDir,e.profileEmail,Us),Cn=e=>Kl(e.installDir,e.profileEmail,Ae),Jl=e=>e.profileEmail!==null?k.default.join(e.installDir,Qe,e.profileEmail,kt):k.default.join(e.installDir,kt),Yl=e=>k.default.basename(e)===Fs,te=(e=v())=>Yl(e)?Vy:Gy,js=(e=v())=>Yl(e)?By:$y,Ky=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Et(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Et(t):null},qy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ce=(e=v())=>{let t=k.default.join(e,zy);if(!Ds.default.existsSync(t))return null;try{let r=JSON.parse(Ds.default.readFileSync(t,"utf8"));if(qy(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Et(r.email)}catch{return null}return null},Jy=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Et(r):null}let t=Ky();return t!==null?t:Ce()},L=e=>{let t=v(),r=zl(t),n=ur(t),o=Jy(e);if(o!==null){let _=k.default.join(t,Qe,o),A=k.default.join(_,jl),f=k.default.join(_,Us),l=k.default.join(_,Ae),S=k.default.join(_,Gl),y=k.default.join(_,kt),p=k.default.join(_,Ae,Rn),b=k.default.join(_,Ae,Pn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:f,logsDir:l,mainLogPath:p,errorLogPath:b,reportsDir:S,deviceKeypairPath:y,configPath:k.default.join(_,"config.json"),harnessRootDir:A,harnessManifestPath:k.default.join(A,Bl),harnessSetsDir:k.default.join(A,$l)}}let s=k.default.join(t,jl),i=k.default.join(t,Us),a=k.default.join(t,Ae),c=k.default.join(t,Gl),d=k.default.join(t,kt),m=k.default.join(t,Ae,Rn),h=k.default.join(t,Ae,Pn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:m,errorLogPath:h,reportsDir:c,deviceKeypairPath:d,configPath:k.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:k.default.join(s,Bl),harnessSetsDir:k.default.join(s,$l)}}});var Tn,$s,Xl,U,Zl,Te=u(()=>{"use strict";Tn=g(require("node:fs")),$s=g(require("node:path"));x();Xl=e=>{let t=$s.default.join(e,Qe);return Tn.default.existsSync(t)?Tn.default.readdirSync(t).filter(r=>Tn.default.statSync($s.default.join(t,r)).isDirectory()).map(r=>Et(r)).toSorted():[]},U=(e=v())=>{let t=te(e);return[{profileEmail:Xl(e)[0]??null,launchAgentLabel:t}]},Zl=(e=v())=>Xl(e)});var In,Lt,Ql,Bs,ec,Yy,tc,Xy,Zy,mr,Qy,rc,On=u(()=>{"use strict";In=require("node:child_process"),Lt=g(require("node:fs")),Ql=g(require("node:os")),Bs=g(require("node:path")),ec=require("node:util");Te();x();Yy=(0,ec.promisify)(In.execFile),tc=()=>Bs.default.join(Ql.default.homedir(),"Library","LaunchAgents"),Xy=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Yy("launchctl",["bootout",r]).catch(()=>{})},Zy=e=>{let t=Bs.default.join(tc(),`${e}.plist`);Lt.default.existsSync(t)&&Lt.default.unlinkSync(t)},mr=(e=v())=>{let t=te(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of U(e))r.add(o.launchAgentLabel);let n=tc();if(Lt.default.existsSync(n))for(let o of Lt.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},Qy=e=>{(0,In.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},rc=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=v();if(!Lt.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=mr(e);for(let r of t)await Xy(r),Zy(r);return Qy(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Nn,Gs=u(()=>{"use strict";Ns();On();x();Nn=(e=v())=>{for(let t of mr(e))En(t)}});var nc,eA,tA,oc,sc=u(()=>{"use strict";nc=require("node:child_process");Os();eA=e=>e.trim().toLowerCase(),tA=e=>e==null?!1:!Ml.has(eA(e)),oc=()=>{if(process.platform!=="darwin")return null;try{let t=(0,nc.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return tA(t)?t:null}catch{return null}}});var ac,ic,Se,pr=u(()=>{"use strict";ac=g(require("node:os"));sc();ic=e=>e.trim().toLowerCase(),Se=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?oc():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??ac.default.userInfo().username;return ic(r)===ic(n)}});var xt,Mn,Hn=u(()=>{"use strict";Os();Gs();pr();xt=e=>{Se()||(Nn(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Mn=(e,t=Hl)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Se()||e()},t);return()=>{clearInterval(r)}}});var lc,cc,dc,Dn,Fn,uc,mc,Rt=u(()=>{"use strict";lc=".agent-witch",cc="memory",dc="project.json",Dn="chunks.ndjson",Fn="runs.ndjson",uc="reports",mc=".json"});var pc,Un,Vs=u(()=>{"use strict";pc=g(require("node:path"));Rt();Un=(e,t)=>pc.default.join(e.trim(),`${t.trim()}${mc}`)});var et,gc,fc=u(()=>{"use strict";Wt();et=e=>`'${e.replace(/'/g,"'\\''")}'`,gc=e=>{let t=`${e.installDir.trim()}/${"app"}/${ye}`,r=[et("node"),et(t),"report","write","--key",et(e.reportKey.trim()),"--agent-run-id",et(e.agentRunId.trim()),"--status",et(e.status),"--summary",et(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",et(e.details.trim())),r.join(" ")}});var de,hc,rA,yc,jn=u(()=>{"use strict";Vs();fc();de={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},hc=e=>e===de.COMPLETED||e===de.FAILED,rA=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),yc=(e,t)=>{let r=Un(t.reportsDir,t.reportKey),n=gc({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:de.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${rA({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var gr,Sc,Ac,bc,nA,$n,oA,sA,fr,Bn,wc,_c,hr=u(()=>{"use strict";gr=g(require("node:fs")),Sc=g(require("node:path"));jn();Vs();x();Ac=50,bc=e=>{let t=L(),r=Un(t.reportsDir,e);return gr.default.mkdirSync(Sc.default.dirname(r),{recursive:!0}),r},nA=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},$n=e=>{let t=bc(e);if(!gr.default.existsSync(t))return null;try{let r=JSON.parse(gr.default.readFileSync(t,"utf8"));return nA(r)?r:null}catch{return null}},oA=(e,t)=>{let r=[...e,t];return r.length>Ac?r.slice(r.length-Ac):r},sA=e=>{let t=bc(e.reportKey);gr.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},fr=e=>{let t=$n(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:oA(t?.history??[],n)};return sA(o),o},Bn=e=>{let t=$n(e.reportKey);return t!==null?t:fr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:de.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},wc=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},_c=e=>{if(e===null||!hc(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===de.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var iA,aA,yr,vc,Gn,zs=u(()=>{"use strict";jn();hr();iA=new Set(Object.values(de)),aA=e=>iA.has(e),yr=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},vc=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Gn=e=>{if(e[0]!=="write")return vc(),1;let r=yr(e,"--key"),n=yr(e,"--agent-run-id"),o=yr(e,"--status"),s=yr(e,"--summary"),i=yr(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!aA(o)?(vc(),1):(fr({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var Ks,Wc,Pt,Vn=u(()=>{"use strict";Ks=g(require("node:path")),Wc=require("node:url");vt();Pt=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Ks.default.resolve(t);return ce()?r===Ks.default.resolve(__filename):r===(0,Wc.fileURLToPath)(e)}});var xc=u(()=>{"use strict"});var Ar,qs,dA,uA,Pc,z,Js,Cc,Tc,zn,tt=u(()=>{"use strict";Ar=g(require("node:fs")),qs=g(require("node:path"));xc();x();dA="install-version.json",uA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pc=(e=v())=>qs.default.join(e,dA),z=(e=v())=>{let t=Pc(e);if(!Ar.default.existsSync(t))return null;try{let r=JSON.parse(Ar.default.readFileSync(t,"utf8"));return!uA(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Js=(e,t=v())=>{let r=Pc(t);Ar.default.mkdirSync(qs.default.dirname(r),{recursive:!0}),Ar.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Cc=(e=v())=>z(e)?.bundleVersion??"113",Tc=(e,t)=>{let r=z(e);if(r!==null)return r;let n={bundleVersion:"113",appOrigin:t,updatedAt:new Date().toISOString()};return Js(n,e),n},zn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var mA,Kn,Ys=u(()=>{"use strict";Ns();On();Te();x();mA=(e=v())=>{let t=new Set(U(e).map(r=>r.launchAgentLabel));return mr(e).filter(r=>!t.has(r))},Kn=(e=v())=>{for(let t of mA(e))En(t)}});var Y,Ct=u(()=>{"use strict";Y=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Ic,rt,Xs,pA,gA,Oc,Tt,qn,Zs=u(()=>{"use strict";Ic=require("node:crypto"),rt=g(require("node:fs")),Xs=g(require("node:path"));x();pA="self-update-log.ndjson",gA=100,Oc=(e=v())=>{let t=L(),r=t.installDir===e?t.logsDir:Cn({installDir:e,profileEmail:t.profileEmail});return Xs.default.join(r,pA)},Tt=(e,t=v())=>{let r={id:(0,Ic.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Oc(t);rt.default.mkdirSync(Xs.default.dirname(n),{recursive:!0});let o=rt.default.existsSync(n)?rt.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-gA+1)),JSON.stringify(r)];return rt.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},qn=(e=20,t=v())=>{let r=Oc(t);if(!rt.default.existsSync(r))return[];let n=rt.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Nc,Mc,Hc=u(()=>{"use strict";Nc="deps.tar.gz",Mc="deps"});var Fc,Ie,nt,fA,Uc,jc,$c=u(()=>{"use strict";Fc=require("node:child_process"),Ie=g(require("node:fs")),nt=g(require("node:path"));Hc();fA=e=>nt.default.join(e,"app",Mc),Uc=e=>{let t=nt.default.join(e,"app"),r=nt.default.join(t,Nc);Ie.default.existsSync(r)&&(Ie.default.rmSync(fA(e),{recursive:!0,force:!0}),Ie.default.mkdirSync(t,{recursive:!0}),(0,Fc.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Ie.default.rmSync(r,{force:!0}))},jc=e=>{Ie.default.rmSync(nt.default.join(e,"node_modules"),{recursive:!0,force:!0}),Ie.default.rmSync(nt.default.join(e,"package.json"),{force:!0}),Ie.default.rmSync(nt.default.join(e,"package-lock.json"),{force:!0})}});var Gc,Vc,zc,Kc,qc,Sr,hA,yA,AA,Bc,re,It=u(()=>{"use strict";Gc=require("node:child_process"),Vc=g(require("node:fs")),zc=g(require("node:os")),Kc=g(require("node:path")),qc=require("node:util");pr();Sr=(0,qc.promisify)(Gc.execFile),hA=e=>Kc.default.join(zc.default.homedir(),"Library","LaunchAgents",`${e}.plist`),yA=async e=>{try{return await Sr("launchctl",["print",e]),!0}catch{return!1}},AA=async(e,t,r)=>{await yA(t)&&await Sr("launchctl",["bootout",t]).catch(()=>{}),await Sr("launchctl",["bootstrap",e,r]),await Sr("launchctl",["enable",t])},Bc=async e=>{try{return await Sr("launchctl",["kickstart","-k",e]),!0}catch{return!1}},re=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Se())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await Bc(n))return{ok:!0};let o=hA(e);if(!Vc.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await AA(r,n,o),await Bc(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var Qs={};Re(Qs,{kickstartAgentWitchClientLaunchAgents:()=>SA});var SA,ei=u(()=>{"use strict";It();Te();x();SA=async(e=v())=>{let t=[];for(let r of U(e))(await re(r.launchAgentLabel)).ok&&t.push(r.launchAgentLabel);return t}});var Yn={};Re(Yn,{buildAgentWitchSelfUpdateStatus:()=>ni,fetchAgentWitchRemoteInstallBundleVersion:()=>ti,runAgentWitchSelfUpdate:()=>ri});var Oe,Jn,Jc,bA,Yc,ti,wA,_A,br,ri,ni,Ot=u(()=>{"use strict";Oe=g(require("node:fs")),Jn=g(require("node:path"));tt();Ys();Ct();x();Wt();Zs();$c();Jc=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bA=e=>{let t=Ce(e),r=t===null?L():L(t);if(!Oe.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Oe.default.readFileSync(r.configPath,"utf8"));return!Jc(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},Yc=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!Jc(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},ti=async e=>(await Yc(e))?.bundleVersion??null,wA=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=Jn.default.join(t,r);Oe.default.mkdirSync(Jn.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());Oe.default.writeFileSync(o,s),r.endsWith(".js")&&Oe.default.chmodSync(o,493)},_A=async()=>{Kn();let{kickstartAgentWitchClientLaunchAgents:e}=await Promise.resolve().then(()=>(ei(),Qs));await e()},br=(e,t)=>({localBundleVersion:t,...e}),ri=async e=>{let t=v(),r=z(t),n=r?.bundleVersion??null,o=bA(t),s=o===null?r?.appOrigin??null:Y(o);if(s===null){let c=br({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return Tt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let i=await Yc(s);if(i===null){let c=br({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return Tt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||zn(n,i.bundleVersion))){let c=br({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:i.bundleVersion},n);return Tt({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),c}try{for(let m of i.scripts)await wA(s,t,m);let c=Jn.default.join(t,ye);Oe.default.existsSync(c)&&Oe.default.rmSync(c,{force:!0}),Uc(t),jc(t),Js({bundleVersion:i.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await _A();let d=br({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${i.bundleVersion}.`,remoteBundleVersion:i.bundleVersion},i.bundleVersion);return Tt({event:"update_applied",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),d}catch(c){let d=c instanceof Error?c.message:"Agent Witch self-update failed.",m=br({ok:!1,updated:!1,message:d,remoteBundleVersion:i.bundleVersion},n);return Tt({event:"update_failed",ok:!1,message:d,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),m}},ni=()=>{let e=v();return{local:z(e),logs:qn(20,e)}}});var Xn,wr,Xc,oi,_r,si=u(()=>{"use strict";Xn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},wr=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=Xn(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},Xc=e=>e>=1&&e<=5,oi=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Xn(t,"UTC")},_r=e=>{let t=e.from??new Date,r=Xn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return wr(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=wr(r,e.timeZone,n,0),s=Xn(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?wr(oi(r),e.timeZone,n,0):o;if(!i&&Xc(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=oi(a),Xc(a.weekday))return wr(a,e.timeZone,n,0);return wr(oi(r),e.timeZone,n,0)}});var vA,Zn,ii=u(()=>{"use strict";vA=e=>e==="hourly"||e==="daily"||e==="weekdays",Zn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!vA(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var vr,Qn,Zc,Qc,ai,Ne,ed,td,rd,nd,Wr=u(()=>{"use strict";vr=g(require("node:fs")),Qn=g(require("node:path"));ii();Zc="automations.json",Qc=e=>e.profileEmail!==null?Qn.default.join(e.installDir,"profiles",e.profileEmail,Zc):Qn.default.join(e.installDir,Zc),ai=()=>({version:1,automations:[]}),Ne=e=>{let t=Qc(e);if(!vr.default.existsSync(t))return ai();try{let r=JSON.parse(vr.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?ai():{version:1,automations:r.automations.flatMap(o=>{let s=Zn(o);return s!==null?[s]:[]})}}catch{return ai()}},ed=(e,t)=>{let r=Qc(e);vr.default.mkdirSync(Qn.default.dirname(r),{recursive:!0}),vr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},td=(e,t)=>{ed(e,{version:1,automations:t})},rd=(e,t)=>{let n=Ne(e).automations.filter(o=>o.id!==t.id);ed(e,{version:1,automations:[...n,t]})},nd=(e,t)=>Ne(e).automations.find(r=>r.id===t)??null});var WA,kA,eo,li=u(()=>{"use strict";si();ii();Wr();x();WA=e=>e!==void 0&&e.trim().length>0?L(e.trim()):L(),kA=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??_r({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??_r({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},eo=e=>{let t=WA(e.profileEmail),r=Ne(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=Zn(s);return i!==null?[kA(i,n.get(i.id))]:[]});return td(t,o),{ok:!0,writtenCount:o.length}}});var od,sd=u(()=>{"use strict";od="x-agent-witch-token"});var Me,to,id,ro,EA,ad,ld,Nt=u(()=>{"use strict";sd();Ct();Me=e=>{let t=Y(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},to=e=>({[od]:e,"Content-Type":"application/json"}),id=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:to(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},ro=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:to(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},EA=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},ad=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:to(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return EA(r)}catch{return null}},ld=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:to(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var no,kr,H,He,cd,Mt,ot=u(()=>{"use strict";no={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},kr=e=>e.trim().length>0,H=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",He=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:kr(t)?t.trim():no.claudeCommand,codexCommand:kr(r)?r.trim():no.codexCommand,cursorCommand:kr(n)?n.trim():no.cursorCommand,antigravityCommand:kr(o)?o.trim():no.antigravityCommand}},cd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},Mt=(e,t,r,n)=>{let o=t.trim();if(!kr(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var ci,LA,xA,oo,di=u(()=>{"use strict";ci=e=>e.toLocaleString("en-US"),LA=e=>e<.01?e.toFixed(4):e.toFixed(3),xA=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${LA(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${ci(e.inputTokens)} in / ${ci(e.outputTokens)} out (${ci(e.totalTokens)} total)`,t].join(`
`)},oo=(e,t)=>{if(t===void 0)return e;let r=xA(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var so,ui=u(()=>{"use strict";so={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Ht,mi,pi,gi=u(()=>{"use strict";ui();Ht="auto",mi=e=>({value:Ht,label:`Auto (${so[e]})`}),pi={anthropic:[mi("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[mi("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[mi("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Dt,io,dd,Er=u(()=>{"use strict";ui();gi();Dt=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Ht))return t},io=(e,t)=>{let r=Dt(t);return r===void 0?so[e]:r},dd=e=>{let t=Dt(e);return t===void 0?Ht:t}});var ao,RA,PA,lo,ud=u(()=>{"use strict";ao={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},RA=e=>{let t=ao[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?ao["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?ao["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?ao["gemini-2.0-flash"]:null},PA=(e,t,r)=>{let n=RA(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},lo=e=>{let t=PA(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Ft,CA,TA,IA,co,md=u(()=>{"use strict";ud();Ft=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),CA=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=Ft(r.input_tokens),o=Ft(r.output_tokens);return n===0&&o===0?null:lo({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},TA=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=Ft(r.prompt_tokens),o=Ft(r.completion_tokens);return n===0&&o===0?null:lo({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},IA=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=Ft(r.promptTokenCount),o=Ft(r.candidatesTokenCount);return n===0&&o===0?null:lo({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},co=(e,t,r)=>e==="anthropic"?CA(t,r):e==="openai"?TA(t,r):IA(t,r)});var OA,NA,MA,HA,DA,FA,pd,gd=u(()=>{"use strict";Er();md();OA=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},NA=async e=>{let t=io("anthropic",e.secret.model),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=OA(n);o.length>0&&e.onChunk?.(o);let s=co("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},MA=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},HA=async e=>{let t=io("openai",e.secret.model),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=MA(n);o.length>0&&e.onChunk?.(o);let s=co("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},DA=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},FA=async e=>{let t=io("google",e.secret.model),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=DA(o);s.length>0&&e.onChunk?.(s);let i=co("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},pd=async e=>{try{return e.provider==="anthropic"?await NA(e):e.provider==="openai"?await HA(e):await FA(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var De,Lr=u(()=>{"use strict";De=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var fd,UA,uo,fi=u(()=>{"use strict";fd=g(require("node:path")),UA="writer-api-secrets.json",uo=e=>fd.default.join(e,UA)});var hi,hd,jA,st,Fe,it=u(()=>{"use strict";hi=g(require("node:fs"));Er();fi();hd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jA=e=>{if(!hd(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=Dt(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},st=e=>{let t=uo(e);if(!hi.default.existsSync(t))return{};try{let r=JSON.parse(hi.default.readFileSync(t,"utf8"));if(!hd(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=jA(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},Fe=(e,t)=>st(e)[t]??null});var K,at=u(()=>{"use strict";K=e=>e==="api"?"api":"cli"});var yd,ne,mo,Ue=u(()=>{"use strict";yd=g(require("node:path"));Lr();it();at();ne=e=>yd.default.dirname(e),mo=(e,t)=>{if(K(e.writerExecutionBackend)!=="api")return!1;let r=De(t);if(r===null)return!1;let n=ne(e.layout.configPath),o=Fe(n,r);return o!==null&&o.apiKey.length>0}});var po,yi=u(()=>{"use strict";di();gd();Lr();it();Ue();po=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=De(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ne(e.layout.configPath),a=Fe(i,s);if(a===null){let d=Object.keys(st(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await pd({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:oo(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Ad,Ut,go=u(()=>{"use strict";Ad=require("node:child_process");ot();yi();Ue();Ut=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(mo(e,t)){po(e,t,r).then(n);return}let o=Mt(t,r,He({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Ad.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[];s.stdout?.on("data",a=>{i.push(a.toString("utf8"))}),s.stderr?.on("data",a=>{i.push(a.toString("utf8"))}),s.on("close",a=>{n({exitCode:a??-1,output:i.join("")})}),s.on("error",a=>{n({exitCode:-1,output:a.message})})})});var xr,Ai,fo=u(()=>{"use strict";xr="https://www.agentwitch.com",Ai="wss://www.agentwitch.com/api/agent-witch/ws"});var ho,Sd,Si=u(()=>{"use strict";ho=".agent-witch",Sd=".local-agent-witch"});var bd,$A,bi,yo,wi=u(()=>{"use strict";bd=g(require("node:path"));fo();Si();$A="ws://localhost:3000/api/agent-witch/ws",bi=e=>e.replace(/\/$/,""),yo=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return bi(t);let r=bd.default.basename(e.installDir);if(r===ho)return Ai;let n=e.configWsUrl?.trim()??"";return r===Sd?n.length>0?bi(n):$A:n.length>0?bi(n):Ai}});var _i,BA,GA,VA,zA,KA,D,lt=u(()=>{"use strict";_i=g(require("node:fs"));wi();x();at();BA="claude",GA="codex",VA="cursor",zA="agy",KA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),D=()=>{let e=L();if(!_i.default.existsSync(e.configPath))return null;try{let t=JSON.parse(_i.default.readFileSync(e.configPath,"utf8"));if(!KA(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=yo({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:K(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:BA,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:GA,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:VA,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:zA,pairingToken:s,layout:e}}catch{return null}}});var wd,vi,jt,Ao=u(()=>{"use strict";wd=require("node:crypto");Nt();si();go();Wr();lt();vi=!1,jt=async e=>{if(vi)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=D();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=Me({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=nd(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};vi=!0;let o=(0,wd.randomUUID)();try{let s=await Ut(t,"claude-cli",n.prompt);await ld(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=_r({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return rd(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{vi=!1}}});function Rr(e){return(0,_d.createHash)("sha256").update(e.trim()).digest("hex")}var _d,Wi=u(()=>{"use strict";_d=require("node:crypto")});var qA,vd,JA,YA,Pr,Wd,ki=u(()=>{"use strict";qA=["agentwitch.com","www.agentwitch.com"],vd=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,JA=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},YA=e=>{let t=JA(e);return!!(qA.includes(t)||vd.test(e.trim().toLowerCase()))},Pr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return YA(r)?vd.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Wd=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Pr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var So,kd,XA,ZA,Ed,bo,Cr,wo,Tr=u(()=>{"use strict";So=g(require("node:fs")),kd=g(require("node:path")),XA="wake-port.json",ZA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ed=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,bo=e=>kd.default.join(e,XA),Cr=e=>{let t=bo(e);if(!So.default.existsSync(t))return null;try{let r=JSON.parse(So.default.readFileSync(t,"utf8"));if(ZA(r)&&Ed(r.wakePort))return r.wakePort}catch{return null}return null},wo=(e,t)=>{if(!Ed(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=bo(e);So.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var z0,K0,q0,oe,Ld,$t=u(()=>{"use strict";Tr();x();Tr();z0=js(),K0=`${te()}-wake`,q0=te(),oe=()=>{let e=v(),t=Cr(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return js()},Ld=e=>{let t=v();Cr(t)===null&&wo(t,e)}});var _o,Rd,Pd,xd,QA,eS,vo,Ei=u(()=>{"use strict";_o=g(require("node:fs")),Rd=g(require("node:os")),Pd=g(require("node:path"));It();Te();Tr();x();xd=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},QA=e=>Pd.default.join(Rd.default.homedir(),"Library","LaunchAgents",`${e}.plist`),eS=async e=>_o.default.existsSync(QA(e))?(await re(e)).ok:!1,vo=async(e=v())=>{let t=_o.default.existsSync(bo(e)),r=!_o.default.existsSync(ur(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=Cr(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await xd(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${te(e)}-wake`;await eS(i)&&s.push(i);for(let c of U(e))(await re(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await xd(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var Bt,Ir,tS,Cd,Td,Id=u(()=>{"use strict";Bt=g(require("node:fs")),Ir=g(require("node:path"));Wi();x();tS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cd=e=>{if(!Bt.default.existsSync(e))return null;try{let t=JSON.parse(Bt.default.readFileSync(e,"utf8"));return!tS(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Rr(t.pairingToken.trim())}catch{return null}},Td=(e=v())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(Cd(Ir.default.join(e,"config.json")));let o=Ir.default.join(e,Qe);if(!Bt.default.existsSync(o))return t;for(let s of Bt.default.readdirSync(o)){let i=Ir.default.join(o,s);Bt.default.statSync(i).isDirectory()&&n(Cd(Ir.default.join(i,"config.json")))}return t}});var Od,Nd=u(()=>{"use strict";Od=["rule","skill","command","instruction","agent"]});var Md,rS,nS,Hd,Dd=u(()=>{"use strict";Nd();Md=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rS=e=>typeof e=="string"&&Od.includes(e),nS=e=>{if(!Md(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!rS(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Hd=e=>{if(!Md(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=nS(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var Fd,oS,sS,iS,aS,lS,cS,dS,uS,Wo,Li=u(()=>{"use strict";Fd=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},oS=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},sS=(e,t)=>{let r=oS(t),n=Fd(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},iS=(e,t,r)=>{let n=sS(t,r);return`shared/items/${e}/${n}`},aS=["rules","skills","commands","instructions","agents"],lS=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),cS=(e,t)=>[...e.filter(n=>n.id!==t.id),t],dS=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},uS=e=>({id:e.id,kind:e.kind,title:e.title,path:iS(e.id,e.kind,e.title)}),Wo=e=>{let t=new Date().toISOString(),r=e.existingManifest??lS(e.hostname,t),n=Fd(e.bundle.slug),o=dS(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...aS.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,m)=>{let h=uS(m);return{files:[...d.files,{relativePath:h.path,content:m.content}],nextItems:cS(d.nextItems,h)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var je,Ud,ko,mS,jd,$d=u(()=>{"use strict";je=g(require("node:fs")),Ud=g(require("node:os")),ko=g(require("node:path"));Li();x();mS=e=>{if(!je.default.existsSync(e))return null;try{let t=JSON.parse(je.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},jd=e=>{let t=L(e.profileEmail);try{let r=mS(t.harnessManifestPath),n=Wo({bundle:e.bundle,hostname:Ud.default.hostname(),existingManifest:r});je.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)je.default.mkdirSync(ko.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=ko.default.join(t.harnessRootDir,o.relativePath);je.default.mkdirSync(ko.default.dirname(s),{recursive:!0}),je.default.writeFileSync(s,o.content)}return je.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var Bd,Gd,Eo,xi=u(()=>{"use strict";Bd=require("node:child_process"),Gd=g(require("node:fs"));pr();x();Eo=(e=v())=>{let t=ur(e);if(!Gd.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Se())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ce(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,Bd.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var Ri,ue,fk,Gt=u(()=>{"use strict";x();Ri="connection-health.json",ue=12e4,fk=`${te()}-watchdog`});var Vd,ct,Pi,pS,gS,fS,zd,hS,Kd,Lo,xo=u(()=>{"use strict";Vd=require("node:crypto"),ct=g(require("node:fs")),Pi=g(require("node:path"));x();pS="watchdog-log.ndjson",gS=200,fS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zd=(e=v())=>{let t=L(),r=t.installDir===e?t.logsDir:Cn({installDir:e,profileEmail:t.profileEmail});return Pi.default.join(r,pS)},hS=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!fS(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Kd=(e,t=v())=>{let r={id:(0,Vd.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=zd(t);ct.default.mkdirSync(Pi.default.dirname(n),{recursive:!0});let o=ct.default.existsSync(n)?ct.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-gS+1)),JSON.stringify(r)];return ct.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},Lo=(e=20,t=v())=>{let r=zd(t);if(!ct.default.existsSync(r))return[];let n=ct.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=hS(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var Or,Ro,yS,qd,se,Ci,me,Nr=u(()=>{"use strict";Or=g(require("node:fs")),Ro=g(require("node:path"));Gt();yS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qd=e=>e.profileEmail===null?Ro.default.join(e.installDir,Ri):Ro.default.join(e.installDir,"profiles",e.profileEmail,Ri),se=e=>{let t=qd(e);if(!Or.default.existsSync(t))return null;try{let r=JSON.parse(Or.default.readFileSync(t,"utf8"));return!yS(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},Ci=(e,t)=>{let r=qd(e),n=se(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};Or.default.mkdirSync(Ro.default.dirname(r),{recursive:!0}),Or.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},me=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var Jd,Yd,AS,Mr,Ti=u(()=>{"use strict";Jd=require("node:child_process"),Yd=require("node:util"),AS=(0,Yd.promisify)(Jd.execFile),Mr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await AS("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Xd,Ii=u(()=>{"use strict";Xd="watchdog-reinstall-state.json"});var Zd={};Re(Zd,{verifyAgentWitchReviveAfterKickstart:()=>wS});var bS,wS,Qd=u(()=>{"use strict";Ii();Nr();Ti();x();bS=e=>new Promise(t=>{setTimeout(t,e)}),wS=async e=>{if(await bS(e.verifyDelayMs??3e3),!await Mr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?L():L(e.profileEmail),n=se(r);return!me(n,e.staleAfterMs)}});var Hr,Oi,vS,eu,WS,tu,ru,nu=u(()=>{"use strict";Hr=g(require("node:fs")),Oi=g(require("node:path"));Ii();x();vS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eu=e=>Oi.default.join(e,Xd),WS=(e=v())=>{let t=eu(e);if(!Hr.default.existsSync(t))return null;try{let r=JSON.parse(Hr.default.readFileSync(t,"utf8"));return!vS(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},tu=(e=v(),t=Date.now())=>{let r=WS(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},ru=(e=v(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=eu(e);return Hr.default.mkdirSync(Oi.default.dirname(n),{recursive:!0}),Hr.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var ou,Vt,su,iu,au,kS,ES,lu,LS,xS,cu,du=u(()=>{"use strict";ou=require("node:child_process"),Vt=g(require("node:fs")),su=g(require("node:os")),iu=g(require("node:path")),au=require("node:util");tt();Ct();x();kS=(0,au.promisify)(ou.execFile),ES=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lu=e=>{let t=Ce(e),r=t===null?L():L(t);if(!Vt.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Vt.default.readFileSync(r.configPath,"utf8"));return!ES(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},LS=e=>lu(e)?.wsUrl??null,xS=e=>{let t=LS(e);return t!==null?Y(t):z(e)?.appOrigin??null},cu=async e=>{let t=e?.installDir??v(),r=lu(t),n=r!==null?Y(r.wsUrl):xS(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=iu.default.join(su.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Vt.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Ce(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await kS("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Vt.default.existsSync(i)&&Vt.default.unlinkSync(i)}}});var uu={};Re(uu,{attemptAgentWitchWatchdogReinstall:()=>RS});var RS,mu=u(()=>{"use strict";nu();It();du();RS=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!tu())return{attempted:!1,ok:!1,targets:e};ru();let r=await cu();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await re(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var pu,gu,fu,PS,CS,TS,Ni,Mi=u(()=>{"use strict";pr();Gt();Nr();Ti();Ei();It();Te();x();xi();xo();pu=e=>e===null?L():L(e),gu=async(e,t,r)=>{if(!await Mr(e))return"not_running";let o=pu(t),s=se(o);return me(s,r)?"stale_connection":"healthy"},fu=async e=>{let t=e?.staleAfterMs??ue,r=v(),n=U(r);return Promise.all(n.map(async o=>{let s=await gu(o.launchAgentLabel,o.profileEmail,t),i=pu(o.profileEmail),a=se(i),c=await Mr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:me(a,t),needsRevive:s!=="healthy",reason:s}}))},PS=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},CS=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",TS=async e=>{let t=await re(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(Qd(),Zd)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},Ni=async e=>{if(!Se())return{ok:!0,targets:[]};let t=e?.staleAfterMs??ue,r=v();await vo(r);let n=U(r),o=[];for(let m of n){let h=await gu(m.launchAgentLabel,m.profileEmail,t);if(h==="healthy"){o.push({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,revived:!1,reason:h});continue}o.push(await TS({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,reason:h,staleAfterMs:t}))}if(o.length===0){let m=Eo();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:m.ok,reason:"not_running",...m.errorMessage!==void 0?{errorMessage:m.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(m=>m.reason!=="healthy"&&!m.revived))try{let{attemptAgentWitchWatchdogReinstall:m}=await Promise.resolve().then(()=>(mu(),uu)),h=await m(o);s=h.attempted,i=h.ok,a=h.errorMessage,c=[...h.targets]}catch(m){s=!0,i=!1,a=m instanceof Error?m.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(m=>m.revived||m.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&Kd({event:CS(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:PS(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var hu,yu,Au=u(()=>{"use strict";hu=g(require("node:os"));Gt();xo();Mi();yu=async()=>{let e=await fu(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:hu.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:ue,healthyProfileCount:t,profiles:e,lastLog:Lo(1)[0]??null}}});var Su={};Re(Su,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ui,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ki,buildAgentWitchWakeHealthResponse:()=>ji,buildAgentWitchWakeIdentityResponse:()=>$i,buildAgentWitchWatchdogStatus:()=>Gi,installHarnessFromWakeServer:()=>Co,readAgentWitchSelfUpdateLogEntries:()=>Io,readAgentWitchWatchdogLogEntries:()=>To,restartAgentWitchFromWakeServer:()=>zi,reviveAgentWitchWebSocketFromWakeServer:()=>Vi,runAgentWitchSelfUpdateFromWakeServer:()=>qi,runAgentWitchUninstallLocalFromWakeServer:()=>Ji,runAutomationFromWakeServer:()=>Fi,syncAutomationsFromWakeServer:()=>Di,wakeAgentWitchLaunchAgents:()=>Bi});var Po,Hi,Co,Di,Fi,Ui,ji,$i,Bi,To,Gi,Vi,zi,Ki,Io,qi,Ji,Yi=u(()=>{"use strict";li();Ao();Wr();Wi();lt();Po=g(require("node:os"));ki();$t();Ei();It();Te();Id();Dd();$d();xi();Au();xo();Ot();On();Zs();Mi();Hi=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Co=e=>{if(!Hi(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Hd(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Pr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=jd({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},Di=e=>{if(!Hi(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Pr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=eo({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},Fi=async e=>{if(!Hi(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Pr(t)?jt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ui=()=>{let e=D(),t=e!==null?Ne(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Po.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},ji=()=>{let e=U();return{ok:!0,port:oe(),hostname:Po.default.hostname(),profileCount:e.length}},$i=()=>{let e=U(),t=D()?.pairingToken.trim()??"",r=t.length>0?Rr(t):null,n=Td();return{hostname:Po.default.hostname(),port:oe(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Bi=async()=>{await vo();let e=U(),t=[];for(let r of e){let n=await re(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Eo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},To=(e=20)=>Lo(e),Gi=yu,Vi=Ni,zi=Ni,Ki=ni,Io=(e=20)=>qn(e),qi=e=>ri(e),Ji=()=>rc()});var be=V((AE,_u)=>{"use strict";var bu=["nodebuffer","arraybuffer","fragments"],wu=typeof Blob<"u";wu&&bu.push("blob");_u.exports={BINARY_TYPES:bu,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:wu,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Dr=V((SE,Oo)=>{"use strict";var{EMPTY_BUFFER:IS}=be(),Xi=Buffer[Symbol.species];function OS(e,t){if(e.length===0)return IS;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Xi(r.buffer,r.byteOffset,n):r}function vu(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function Wu(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function NS(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Zi(e){if(Zi.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Xi(e):ArrayBuffer.isView(e)?t=new Xi(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Zi.readOnly=!1),t}Oo.exports={concat:OS,mask:vu,toArrayBuffer:NS,toBuffer:Zi,unmask:Wu};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Oo.exports.mask=function(t,r,n,o,s){s<48?vu(t,r,n,o,s):e.mask(t,r,n,o,s)},Oo.exports.unmask=function(t,r){t.length<32?Wu(t,r):e.unmask(t,r)}}catch{}});var Lu=V((bE,Eu)=>{"use strict";var ku=Symbol("kDone"),Qi=Symbol("kRun"),ea=class{constructor(t){this[ku]=()=>{this.pending--,this[Qi]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Qi]()}[Qi](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[ku])}}};Eu.exports=ea});var qt=V((wE,Cu)=>{"use strict";var Fr=require("zlib"),xu=Dr(),MS=Lu(),{kStatusCode:Ru}=be(),HS=Buffer[Symbol.species],DS=Buffer.from([0,0,255,255]),Mo=Symbol("permessage-deflate"),we=Symbol("total-length"),zt=Symbol("callback"),$e=Symbol("buffers"),Kt=Symbol("error"),No,ta=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!No){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;No=new MS(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[zt];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){No.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){No.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Fr.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Fr.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Mo]=this,this._inflate[we]=0,this._inflate[$e]=[],this._inflate.on("error",US),this._inflate.on("data",Pu)}this._inflate[zt]=n,this._inflate.write(t),r&&this._inflate.write(DS),this._inflate.flush(()=>{let s=this._inflate[Kt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=xu.concat(this._inflate[$e],this._inflate[we]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[we]=0,this._inflate[$e]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?Fr.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Fr.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[we]=0,this._deflate[$e]=[],this._deflate.on("data",FS)}this._deflate[zt]=n,this._deflate.write(t),this._deflate.flush(Fr.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=xu.concat(this._deflate[$e],this._deflate[we]);r&&(s=new HS(s.buffer,s.byteOffset,s.length-4)),this._deflate[zt]=null,this._deflate[we]=0,this._deflate[$e]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};Cu.exports=ta;function FS(e){this[$e].push(e),this[we]+=e.length}function Pu(e){if(this[we]+=e.length,this[Mo]._maxPayload<1||this[we]<=this[Mo]._maxPayload){this[$e].push(e);return}this[Kt]=new RangeError("Max payload size exceeded"),this[Kt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Kt][Ru]=1009,this.removeListener("data",Pu),this.reset()}function US(e){if(this[Mo]._inflate=null,this[Kt]){this[zt](this[Kt]);return}e[Ru]=1007,this[zt](e)}});var Jt=V((_E,Ho)=>{"use strict";var{isUtf8:Tu}=require("buffer"),{hasBlob:jS}=be(),$S=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function BS(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function ra(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function GS(e){return jS&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Ho.exports={isBlob:GS,isValidStatusCode:BS,isValidUTF8:ra,tokenChars:$S};if(Tu)Ho.exports.isValidUTF8=function(e){return e.length<24?ra(e):Tu(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Ho.exports.isValidUTF8=function(t){return t.length<32?ra(t):e(t)}}catch{}});var aa=V((vE,Fu)=>{"use strict";var{Writable:VS}=require("stream"),Iu=qt(),{BINARY_TYPES:zS,EMPTY_BUFFER:Ou,kStatusCode:KS,kWebSocket:qS}=be(),{concat:na,toArrayBuffer:JS,unmask:YS}=Dr(),{isValidStatusCode:XS,isValidUTF8:Nu}=Jt(),Do=Buffer[Symbol.species],X=0,Mu=1,Hu=2,Du=3,oa=4,sa=5,Fo=6,ia=class extends VS{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||zS[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[qS]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=X}_write(t,r,n){if(this._opcode===8&&this._state==X)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Do(n.buffer,n.byteOffset+t,n.length-t),new Do(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Do(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case X:this.getInfo(t);break;case Mu:this.getPayloadLength16(t);break;case Hu:this.getPayloadLength64(t);break;case Du:this.getMask();break;case oa:this.getData(t);break;case sa:case Fo:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[Iu.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Mu:this._payloadLength===127?this._state=Hu:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Du:this._state=oa}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=oa}getData(t){let r=Ou;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&YS(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=sa,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[Iu.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===X&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=X;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=na(n,r):this._binaryType==="arraybuffer"?o=JS(na(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=X):(this._state=Fo,setImmediate(()=>{this.emit("message",o,!0),this._state=X,this.startLoop(t)}))}else{let o=na(n,r);if(!this._skipUTF8Validation&&!Nu(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===sa||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=X):(this._state=Fo,setImmediate(()=>{this.emit("message",o,!1),this._state=X,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,Ou),this.end();else{let n=t.readUInt16BE(0);if(!XS(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Do(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!Nu(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=X;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=X):(this._state=Fo,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=X,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[KS]=o,i}};Fu.exports=ia});var da=V((kE,$u)=>{"use strict";var{Duplex:WE}=require("stream"),{randomFillSync:ZS}=require("crypto"),{types:{isUint8Array:QS}}=require("util"),Uu=qt(),{EMPTY_BUFFER:eb,kWebSocket:tb,NOOP:rb}=be(),{isBlob:Yt,isValidStatusCode:nb}=Jt(),{mask:ju,toBuffer:dt}=Dr(),Z=Symbol("kByteLength"),ob=Buffer.alloc(4),Uo=8*1024,ut,Xt=Uo,ie=0,sb=1,ib=2,la=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=ie,this.onerror=rb,this[tb]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||ob,r.generateMask?r.generateMask(n):(Xt===Uo&&(ut===void 0&&(ut=Buffer.alloc(Uo)),ZS(ut,0,Uo),Xt=0),n[0]=ut[Xt++],n[1]=ut[Xt++],n[2]=ut[Xt++],n[3]=ut[Xt++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Z]!==void 0?a=r[Z]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(ju(t,n,d,s,a),[d]):(ju(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=eb;else{if(typeof t!="number"||!nb(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(QS(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Z]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==ie?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Yt(t)?(o=t.size,s=!1):(t=dt(t),o=t.length,s=dt.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Z]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Yt(t)?this._state!==ie?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ie?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):Yt(t)?(o=t.size,s=!1):(t=dt(t),o=t.length,s=dt.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Z]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Yt(t)?this._state!==ie?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==ie?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[Uu.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Yt(t)?(a=t.size,c=!1):(t=dt(t),a=t.length,c=dt.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Z]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Yt(t)?this._state!==ie?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==ie?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[Z],this._state=ib,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(ca,this,a,o);return}this._bufferedBytes-=n[Z];let i=dt(s);r?this.dispatch(i,r,n,o):(this._state=ie,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(ab,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[Uu.extensionName];this._bufferedBytes+=n[Z],this._state=sb,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");ca(this,c,o);return}this._bufferedBytes-=n[Z],this._state=ie,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===ie&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Z],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Z],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};$u.exports=la;function ca(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function ab(e,t,r){ca(e,t,r),e.onerror(t)}});var Xu=V((EE,Yu)=>{"use strict";var{kForOnEventAttribute:Ur,kListener:ua}=be(),Bu=Symbol("kCode"),Gu=Symbol("kData"),Vu=Symbol("kError"),zu=Symbol("kMessage"),Ku=Symbol("kReason"),Zt=Symbol("kTarget"),qu=Symbol("kType"),Ju=Symbol("kWasClean"),_e=class{constructor(t){this[Zt]=null,this[qu]=t}get target(){return this[Zt]}get type(){return this[qu]}};Object.defineProperty(_e.prototype,"target",{enumerable:!0});Object.defineProperty(_e.prototype,"type",{enumerable:!0});var mt=class extends _e{constructor(t,r={}){super(t),this[Bu]=r.code===void 0?0:r.code,this[Ku]=r.reason===void 0?"":r.reason,this[Ju]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Bu]}get reason(){return this[Ku]}get wasClean(){return this[Ju]}};Object.defineProperty(mt.prototype,"code",{enumerable:!0});Object.defineProperty(mt.prototype,"reason",{enumerable:!0});Object.defineProperty(mt.prototype,"wasClean",{enumerable:!0});var Qt=class extends _e{constructor(t,r={}){super(t),this[Vu]=r.error===void 0?null:r.error,this[zu]=r.message===void 0?"":r.message}get error(){return this[Vu]}get message(){return this[zu]}};Object.defineProperty(Qt.prototype,"error",{enumerable:!0});Object.defineProperty(Qt.prototype,"message",{enumerable:!0});var jr=class extends _e{constructor(t,r={}){super(t),this[Gu]=r.data===void 0?null:r.data}get data(){return this[Gu]}};Object.defineProperty(jr.prototype,"data",{enumerable:!0});var lb={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[Ur]&&o[ua]===t&&!o[Ur])return;let n;if(e==="message")n=function(s,i){let a=new jr("message",{data:i?s:s.toString()});a[Zt]=this,jo(t,this,a)};else if(e==="close")n=function(s,i){let a=new mt("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Zt]=this,jo(t,this,a)};else if(e==="error")n=function(s){let i=new Qt("error",{error:s,message:s.message});i[Zt]=this,jo(t,this,i)};else if(e==="open")n=function(){let s=new _e("open");s[Zt]=this,jo(t,this,s)};else return;n[Ur]=!!r[Ur],n[ua]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[ua]===t&&!r[Ur]){this.removeListener(e,r);break}}};Yu.exports={CloseEvent:mt,ErrorEvent:Qt,Event:_e,EventTarget:lb,MessageEvent:jr};function jo(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var $o=V((LE,Zu)=>{"use strict";var{tokenChars:$r}=Jt();function pe(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function cb(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,m=-1,h=0;for(;h<e.length;h++)if(d=e.charCodeAt(h),i===void 0)if(m===-1&&$r[d]===1)c===-1&&(c=h);else if(h!==0&&(d===32||d===9))m===-1&&c!==-1&&(m=h);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${h}`);m===-1&&(m=h);let A=e.slice(c,m);d===44?(pe(t,A,r),r=Object.create(null)):i=A,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${h}`);else if(a===void 0)if(m===-1&&$r[d]===1)c===-1&&(c=h);else if(d===32||d===9)m===-1&&c!==-1&&(m=h);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${h}`);m===-1&&(m=h),pe(r,e.slice(c,m),!0),d===44&&(pe(t,i,r),r=Object.create(null),i=void 0),c=m=-1}else if(d===61&&c!==-1&&m===-1)a=e.slice(c,h),c=m=-1;else throw new SyntaxError(`Unexpected character at index ${h}`);else if(o){if($r[d]!==1)throw new SyntaxError(`Unexpected character at index ${h}`);c===-1?c=h:n||(n=!0),o=!1}else if(s)if($r[d]===1)c===-1&&(c=h);else if(d===34&&c!==-1)s=!1,m=h;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${h}`);else if(d===34&&e.charCodeAt(h-1)===61)s=!0;else if(m===-1&&$r[d]===1)c===-1&&(c=h);else if(c!==-1&&(d===32||d===9))m===-1&&(m=h);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${h}`);m===-1&&(m=h);let A=e.slice(c,m);n&&(A=A.replace(/\\/g,""),n=!1),pe(r,a,A),d===44&&(pe(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${h}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");m===-1&&(m=h);let _=e.slice(c,m);return i===void 0?pe(t,_,r):(a===void 0?pe(r,_,!0):n?pe(r,a,_.replace(/\\/g,"")):pe(r,a,_),pe(t,i,r)),t}function db(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Zu.exports={format:db,parse:cb}});var zo=V((PE,dm)=>{"use strict";var ub=require("events"),mb=require("https"),pb=require("http"),tm=require("net"),gb=require("tls"),{randomBytes:fb,createHash:hb}=require("crypto"),{Duplex:xE,Readable:RE}=require("stream"),{URL:ma}=require("url"),Be=qt(),yb=aa(),Ab=da(),{isBlob:Sb}=Jt(),{BINARY_TYPES:Qu,CLOSE_TIMEOUT:bb,EMPTY_BUFFER:Bo,GUID:wb,kForOnEventAttribute:pa,kListener:_b,kStatusCode:vb,kWebSocket:N,NOOP:rm}=be(),{EventTarget:{addEventListener:Wb,removeEventListener:kb}}=Xu(),{format:Eb,parse:Lb}=$o(),{toBuffer:xb}=Dr(),nm=Symbol("kAborted"),ga=[8,13],ve=["CONNECTING","OPEN","CLOSING","CLOSED"],Rb=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,P=class e extends ub{constructor(t,r,n){super(),this._binaryType=Qu[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Bo,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),om(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){Qu.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new yb({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new Ab(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[N]=this,s[N]=this,t[N]=this,o.on("conclude",Tb),o.on("drain",Ib),o.on("error",Ob),o.on("message",Nb),o.on("ping",Mb),o.on("pong",Hb),s.onerror=Db,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",am),t.on("data",Vo),t.on("end",lm),t.on("error",cm),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Be.extensionName]&&this._extensions[Be.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){q(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),im(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){fa(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Bo,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){fa(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Bo,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){fa(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Be.extensionName]||(o.compress=!1),this._sender.send(t||Bo,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){q(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(P,"CONNECTING",{enumerable:!0,value:ve.indexOf("CONNECTING")});Object.defineProperty(P.prototype,"CONNECTING",{enumerable:!0,value:ve.indexOf("CONNECTING")});Object.defineProperty(P,"OPEN",{enumerable:!0,value:ve.indexOf("OPEN")});Object.defineProperty(P.prototype,"OPEN",{enumerable:!0,value:ve.indexOf("OPEN")});Object.defineProperty(P,"CLOSING",{enumerable:!0,value:ve.indexOf("CLOSING")});Object.defineProperty(P.prototype,"CLOSING",{enumerable:!0,value:ve.indexOf("CLOSING")});Object.defineProperty(P,"CLOSED",{enumerable:!0,value:ve.indexOf("CLOSED")});Object.defineProperty(P.prototype,"CLOSED",{enumerable:!0,value:ve.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(P.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(P.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[pa])return t[_b];return null},set(t){for(let r of this.listeners(e))if(r[pa]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[pa]:!0})}})});P.prototype.addEventListener=Wb;P.prototype.removeEventListener=kb;dm.exports=P;function om(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:bb,protocolVersion:ga[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!ga.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${ga.join(", ")})`);let s;if(t instanceof ma)s=t;else try{s=new ma(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;Go(e,l);return}let d=i?443:80,m=fb(16).toString("base64"),h=i?mb.request:pb.request,_=new Set,A;if(o.createConnection=o.createConnection||(i?Cb:Pb),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":m,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(A=new Be({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=Eb({[Be.extensionName]:A.offer()})),r.length){for(let l of r){if(typeof l!="string"||!Rb.test(l)||_.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");_.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let f;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[S,y]of Object.entries(l))n.headers[S.toLowerCase()]=y}else if(e.listenerCount("redirect")===0){let l=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),f=e._req=h(o),e._redirects&&e.emit("redirect",e.url,f)}else f=e._req=h(o);o.timeout&&f.on("timeout",()=>{q(e,f,"Opening handshake has timed out")}),f.on("error",l=>{f===null||f[nm]||(f=e._req=null,Go(e,l))}),f.on("response",l=>{let S=l.headers.location,y=l.statusCode;if(S&&o.followRedirects&&y>=300&&y<400){if(++e._redirects>o.maxRedirects){q(e,f,"Maximum redirects exceeded");return}f.abort();let p;try{p=new ma(S,t)}catch{let w=new SyntaxError(`Invalid URL: ${S}`);Go(e,w);return}om(e,p,r,n)}else e.emit("unexpected-response",f,l)||q(e,f,`Unexpected server response: ${l.statusCode}`)}),f.on("upgrade",(l,S,y)=>{if(e.emit("upgrade",l),e.readyState!==P.CONNECTING)return;f=e._req=null;let p=l.headers.upgrade;if(p===void 0||p.toLowerCase()!=="websocket"){q(e,S,"Invalid Upgrade header");return}let b=hb("sha1").update(m+wb).digest("base64");if(l.headers["sec-websocket-accept"]!==b){q(e,S,"Invalid Sec-WebSocket-Accept header");return}let w=l.headers["sec-websocket-protocol"],W;if(w!==void 0?_.size?_.has(w)||(W="Server sent an invalid subprotocol"):W="Server sent a subprotocol but none was requested":_.size&&(W="Server sent no subprotocol"),W){q(e,S,W);return}w&&(e._protocol=w);let E=l.headers["sec-websocket-extensions"];if(E!==void 0){if(!A){q(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=Lb(E)}catch{q(e,S,"Invalid Sec-WebSocket-Extensions header");return}let $=Object.keys(R);if($.length!==1||$[0]!==Be.extensionName){q(e,S,"Server indicated an extension that was not requested");return}try{A.accept(R[Be.extensionName])}catch{q(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Be.extensionName]=A}e.setSocket(S,y,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(f,e):f.end()}function Go(e,t){e._readyState=P.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Pb(e){return e.path=e.socketPath,tm.connect(e)}function Cb(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=tm.isIP(e.host)?"":e.host),gb.connect(e)}function q(e,t,r){e._readyState=P.CLOSING;let n=new Error(r);Error.captureStackTrace(n,q),t.setHeader?(t[nm]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Go,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function fa(e,t,r){if(t){let n=Sb(t)?t.size:xb(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${ve[e.readyState]})`);process.nextTick(r,n)}}function Tb(e,t){let r=this[N];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[N]!==void 0&&(r._socket.removeListener("data",Vo),process.nextTick(sm,r._socket),e===1005?r.close():r.close(e,t))}function Ib(){let e=this[N];e.isPaused||e._socket.resume()}function Ob(e){let t=this[N];t._socket[N]!==void 0&&(t._socket.removeListener("data",Vo),process.nextTick(sm,t._socket),t.close(e[vb])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function em(){this[N].emitClose()}function Nb(e,t){this[N].emit("message",e,t)}function Mb(e){let t=this[N];t._autoPong&&t.pong(e,!this._isServer,rm),t.emit("ping",e)}function Hb(e){this[N].emit("pong",e)}function sm(e){e.resume()}function Db(e){let t=this[N];t.readyState!==P.CLOSED&&(t.readyState===P.OPEN&&(t._readyState=P.CLOSING,im(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function im(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function am(){let e=this[N];if(this.removeListener("close",am),this.removeListener("data",Vo),this.removeListener("end",lm),e._readyState=P.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[N]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",em),e._receiver.on("finish",em))}function Vo(e){this[N]._receiver.write(e)||this.pause()}function lm(){let e=this[N];e._readyState=P.CLOSING,e._receiver.end(),this.end()}function cm(){let e=this[N];this.removeListener("error",cm),this.on("error",rm),e&&(e._readyState=P.CLOSING,this.destroy())}});var gm=V((TE,pm)=>{"use strict";var CE=zo(),{Duplex:Fb}=require("stream");function um(e){e.emit("close")}function Ub(){!this.destroyed&&this._writableState.finished&&this.destroy()}function mm(e){this.removeListener("error",mm),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function jb(e,t){let r=!0,n=new Fb({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(um,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(um,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",Ub),n.on("error",mm),n}pm.exports=jb});var ha=V((IE,fm)=>{"use strict";var{tokenChars:$b}=Jt();function Bb(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&$b[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}fm.exports={parse:Bb}});var _m=V((NE,wm)=>{"use strict";var Gb=require("events"),Ko=require("http"),{Duplex:OE}=require("stream"),{createHash:Vb}=require("crypto"),hm=$o(),pt=qt(),zb=ha(),Kb=zo(),{CLOSE_TIMEOUT:qb,GUID:Jb,kWebSocket:Yb}=be(),Xb=/^[+/0-9A-Za-z]{22}==$/,ym=0,Am=1,bm=2,ya=class extends Gb{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:qb,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:Kb,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Ko.createServer((n,o)=>{let s=Ko.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=Zb(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=ym}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===bm){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Br,this);return}if(t&&this.once("close",t),this._state!==Am)if(this._state=Am,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Br,this):process.nextTick(Br,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Br(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",Sm);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){gt(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){gt(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Xb.test(s)){gt(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){gt(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Gr(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=zb.parse(c)}catch{gt(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let m=t.headers["sec-websocket-extensions"],h={};if(this.options.perMessageDeflate&&m!==void 0){let _=new pt({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let A=hm.parse(m);A[pt.extensionName]&&(_.accept(A[pt.extensionName]),h[pt.extensionName]=_)}catch{gt(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let _={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(_,(A,f,l,S)=>{if(!A)return Gr(r,f||401,l,S);this.completeUpgrade(h,s,d,t,r,n,o)});return}if(!this.options.verifyClient(_))return Gr(r,401)}this.completeUpgrade(h,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Yb])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>ym)return Gr(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${Vb("sha1").update(r+Jb).digest("base64")}`],m=new this.options.WebSocket(null,void 0,this.options);if(n.size){let h=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;h&&(d.push(`Sec-WebSocket-Protocol: ${h}`),m._protocol=h)}if(t[pt.extensionName]){let h=t[pt.extensionName].params,_=hm.format({[pt.extensionName]:[h]});d.push(`Sec-WebSocket-Extensions: ${_}`),m._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",Sm),m.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(m),m.on("close",()=>{this.clients.delete(m),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Br,this)})),a(m,o)}};wm.exports=ya;function Zb(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Br(e){e._state=bm,e.emit("close")}function Sm(){this.destroy()}function Gr(e,t,r,n){r=r||Ko.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Ko.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function gt(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,gt),e.emit("wsClientError",i,r,t)}else Gr(r,n,o,s)}});var Qb,ew,tw,rw,nw,ow,vm,sw,Vr,Wm=u(()=>{Qb=g(gm(),1),ew=g($o(),1),tw=g(qt(),1),rw=g(aa(),1),nw=g(da(),1),ow=g(ha(),1),vm=g(zo(),1),sw=g(_m(),1),Vr=vm.default});var Aa=u(()=>{"use strict"});var We,zr=u(()=>{"use strict";We=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var er,ft,km,aw,Sa,ba,Em,Lm,xm,Rm,wa,_a=u(()=>{"use strict";er=g(require("node:fs")),ft=g(require("node:os")),km=g(require("node:path"));Aa();zr();aw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sa=(e=ft.default.hostname())=>km.default.join(ft.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),ba=e=>{if(!er.default.existsSync(e))return null;try{let t=JSON.parse(er.default.readFileSync(e,"utf8"));return!aw(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},Em=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},Lm=(e,t)=>{er.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},xm=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Sa(),n=ba(r);if(n!==null&&n.pid!==process.pid&&We(n.pid)&&Em(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:ft.default.hostname(),macOsUsername:ft.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return Lm(r,o),{ok:!0}},Rm=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Sa(),n=ba(r);return n!==null&&n.pid!==process.pid&&We(n.pid)&&Em(n)?{ok:!1}:(Lm(r,{hostname:ft.default.hostname(),macOsUsername:ft.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},wa=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Sa();ba(r)?.pid===process.pid&&er.default.existsSync(r)&&er.default.unlinkSync(r)}});var va,Kr,lw,cw,dw,uw,Pm,Cm=u(()=>{"use strict";va=require("node:child_process"),Kr=g(require("node:path"));zr();Wt();lw=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),cw=(e,t)=>{if(lw(e)||!/\bnode\b/.test(e))return!1;let r=Kr.default.resolve(t),n=Kr.default.join(r,"app",ye),o=Kr.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ye||i==="agent-witch.ts")return e.includes(r);try{let a=Kr.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},dw=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,va.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},uw=(e,t,r)=>{let n=dw(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||cw(d,t)&&o.push(c)}return o},Pm=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,va.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=uw(r,e.installDir,t),o=[];for(let s of n)if(We(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var qr,Jr,Tm,mw,Im,Om=u(()=>{"use strict";qr=g(require("node:fs")),Jr=g(require("node:path"));x();Tm=(e,t)=>{!qr.default.existsSync(e)||qr.default.existsSync(t)||(qr.default.mkdirSync(Jr.default.dirname(t),{recursive:!0}),qr.default.renameSync(e,t))},mw=e=>{if(e.profileEmail===null)return;let t=Jr.default.join(e.installDir,Ae);Tm(Jr.default.join(t,Rn),e.mainLogPath),Tm(Jr.default.join(t,Pn),e.errorLogPath)},Im=e=>{let t=L();e!==void 0&&t.installDir!==e||mw(t)}});var Nm,Mm,Hm,Dm,Fm=u(()=>{"use strict";Nm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Mm=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?Nm(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?Nm(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Hm=e=>{let t=e.watchdogLogs.map(Mm).join(""),r=e.updateLogs.map(Mm).join("");return`<!doctype html>
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
</html>`},Dm=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Um,jm,$m=u(()=>{"use strict";Um=g(require("node:net")),jm=()=>new Promise((e,t)=>{let r=Um.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var Bm,pw,Gm,Vm=u(()=>{"use strict";Bm=g(require("node:net"));$m();$t();Tr();x();pw=e=>new Promise(t=>{let r=Bm.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Gm=async()=>{let e=v(),t=oe();if(await pw(t))return Ld(t),t;let r=await jm();return wo(e,r),r}});var gw,zm,Km=u(()=>{"use strict";gw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zm=e=>({force:gw(e)&&e.force===!0})});var Wa,fw,Ge,qo=u(()=>{"use strict";Wa=g(require("node:os")),fw=e=>{let t=e.trim();return t.startsWith("~/")?`${Wa.default.homedir()}${t.slice(1)}`:t==="~"?Wa.default.homedir():t},Ge=fw});var ht,Ve,Yr=u(()=>{"use strict";ht=g(require("node:path"));Rt();qo();Ve=e=>{let t=Ge(e),r=ht.default.join(t,lc);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:ht.default.join(r,"rag"),memoryDirPath:ht.default.join(r,cc),reportsDirPath:ht.default.join(r,uc),metaFilePath:ht.default.join(r,dc),ragChunksFilePath:ht.default.join(r,"rag",Dn)}}});var ge,Jm,hw,yw,ke,Xr=u(()=>{"use strict";ge=g(require("node:fs")),Jm=g(require("node:path"));Rt();Yr();hw=(e,t)=>{if(ge.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};ge.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},yw=e=>{ge.default.existsSync(e.ragChunksFilePath)||ge.default.writeFileSync(e.ragChunksFilePath,"");let t=Jm.default.join(e.memoryDirPath,Fn);ge.default.existsSync(t)||ge.default.writeFileSync(t,"")},ke=e=>{let t=Ve(e.projectFolderPath);return ge.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),ge.default.mkdirSync(t.ragDirPath,{recursive:!0}),ge.default.mkdirSync(t.memoryDirPath,{recursive:!0}),hw(t,e),yw(t),{ok:!0,layout:t}}});var Aw,Ym,Xm=u(()=>{"use strict";Xr();Aw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ym=e=>{if(!Aw(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:ke({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Qm,ww,Zm,T,Sw,bw,ka,ep=u(()=>{"use strict";Qm=g(require("node:http"));Yi();ki();Fm();Vm();Km();Hn();Xm();Vn();vt();ww={},Zm=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},T=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},Sw=e=>{e.writeHead(403),e.end()},bw=async(e,t,r)=>{let n=e.headers.origin,o=Wd(n);try{if(n!==void 0&&n.length>0&&!o.allowed){Sw(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){T(t,200,ji(),o.headers);return}if(e.method==="GET"&&s==="/identity"){T(t,200,$i(),o.headers);return}if(e.method==="GET"&&s==="/local"){let i=To(50),a=Io(50);t.writeHead(200,Dm()),t.end(Hm({port:r,watchdogLogs:i,updateLogs:a}));return}if(e.method==="GET"&&s==="/watchdog/status"){let i=await Gi();T(t,200,i,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let i=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:To(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let i=await Vi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/restart"){let i=await zi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let i=Ki();T(t,200,{ok:!0,...i},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let i=new URL(e.url??"/update/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;T(t,200,{ok:!0,logs:Io(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let i=await Zm(e),{force:a}=zm(i),c=await qi({force:a});T(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let i=await Ji();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/wake"){let i=await Bi();T(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Co(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let i=await Zm(e),a=Ym(i);T(t,a.ok?200:400,a,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Co(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){T(t,200,Ui(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Di(a);T(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{T(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await Fi(a);T(t,c.ok?200:503,c,o.headers);return}T(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{T(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},ka=async()=>{let e=await Gm(),t=Qm.default.createServer((r,n)=>{bw(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!ce()&&Pt(ww.url)&&(async()=>{xt("agent-witch-wake-server");let e=await ka(),t=Mn(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var Ea,tp=u(()=>{"use strict";Wr();Ao();lt();Ea=async()=>{let e=D();if(e===null)return;let t=Ne(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await jt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var rp,np=u(()=>{"use strict";Aa();ep();_a();tp();rp=async(e={})=>{let t=await ka();Ea();let r=setInterval(()=>{Ea()},6e4),n=setInterval(()=>{if(!Rm().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var Zr,Jo,Ww,op,sp,Yo,ip,ap,La,lp,Xo,cp=u(()=>{"use strict";Zr=g(require("node:fs")),Jo=g(require("node:path")),Ww="pending-run-inputs.json",op=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sp=e=>{let t=e.profileEmail?Jo.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Jo.default.join(t,Ww)},Yo=e=>{let t=sp(e);if(!Zr.default.existsSync(t))return{};try{let r=JSON.parse(Zr.default.readFileSync(t,"utf8"));return op(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!op(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},ip=(e,t)=>{let r=sp(e);Zr.default.mkdirSync(Jo.default.dirname(r),{recursive:!0}),Zr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ap=e=>Object.values(Yo(e)),La=(e,t)=>Yo(e)[t]!==void 0,lp=(e,t)=>{let r=Yo(e);r[t.agentRunId]=t,ip(e,r)},Xo=(e,t)=>{let r=Yo(e);delete r[t],ip(e,r)}});var xa,dp=u(()=>{"use strict";xa={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var Ra,CL,up=u(()=>{"use strict";Ra={OPEN:"open",APPROVAL:"approval"},CL=Ra.APPROVAL});var tr,Zo,mp,kw,pp,gp,fp,Qo,hp,Pa=u(()=>{"use strict";tr=g(require("node:fs")),Zo=g(require("node:path")),mp="runs",kw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pp=e=>{let t=e.profileEmail!==null?Zo.default.join(e.installDir,"profiles",e.profileEmail,mp):Zo.default.join(e.installDir,mp);return tr.default.mkdirSync(t,{recursive:!0}),t},gp=(e,t)=>Zo.default.join(pp(e),`${t}.json`),fp=(e,t)=>{tr.default.writeFileSync(gp(e,t.id),JSON.stringify(t,null,2))},Qo=(e,t)=>{let r=gp(e,t);if(!tr.default.existsSync(r))return null;try{let n=JSON.parse(tr.default.readFileSync(r,"utf8"));return!kw(n)||typeof n.id!="string"?null:n}catch{return null}},hp=e=>{let t=pp(e),r=tr.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Qo(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var Ew,yp,Ap=u(()=>{"use strict";dp();up();Pa();Ew=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?xa.COMPLETED:xa.FAILED,dispatchPolicy:Ra.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},yp=(e,t)=>{let r=Ew(t);return fp(e,r),r}});var Qr,es,Lw,Ca,Sp,bp,wp,Ta,_p=u(()=>{"use strict";Qr=g(require("node:fs")),es=g(require("node:path"));Nt();Lw="run-completion-outbox.json",Ca=e=>{let t=e.profileEmail?es.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return es.default.join(t,Lw)},Sp=e=>{let t=Ca(e);if(!Qr.default.existsSync(t))return[];try{let r=JSON.parse(Qr.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},bp=(e,t)=>{Qr.default.mkdirSync(es.default.dirname(Ca(e)),{recursive:!0}),Qr.default.writeFileSync(Ca(e),JSON.stringify(t,null,2),"utf8")},wp=(e,t)=>{let r=[...Sp(e).filter(n=>n.runId!==t.runId),t];bp(e,r)},Ta=async e=>{if(e.cloudApi===null)return;let t=Sp(e.layout);if(t.length===0)return;let r=[];for(let n of t)await ro(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);bp(e.layout,r)}});var vp=u(()=>{"use strict"});var Ia,en,Rw,yt,Wp=u(()=>{"use strict";vp();Ia=new Map,en=e=>{let t=Ia.get(e);t!==void 0&&(clearInterval(t),Ia.delete(e))},Rw=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},yt=(e,t,r,n={})=>{en(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){en(t);return}let i=n.onTick?.()??{};Rw(e,t,o,i)};s(),Ia.set(t,setInterval(s,15e3))}});var Oa,tn,At,kp,ze,Ep,ts=u(()=>{"use strict";Oa=new Set,tn=new Map,At=(e,t)=>{if(t.length===0)return;let r=tn.get(e)??[];r.push(t),tn.set(e,r)},kp=e=>{Oa.add(e);let t=tn.get(e)??[];return tn.delete(e),t},ze=e=>Oa.has(e),Ep=e=>{Oa.delete(e),tn.delete(e)}});var Lp,xp,Rp,Pp,B,rr,Cp,Tp,rn,Ip,Op,Na,Np,Mp,Hp,rs=u(()=>{"use strict";Lp=require("node:crypto"),xp=g(require("node:fs")),Rp=g(require("node:path")),Pp=require("node:url");zr();vt();Ms();B=new Map,Cp=async()=>{if(rr!==void 0)return rr;try{if(ce()){let e=xn(),t=Rp.default.join(e,"deps","node-pty","lib","index.js");if(xp.default.existsSync(t)){let r=await import((0,Pp.pathToFileURL)(t).href);return rr=r,r}}return rr=await import("node-pty"),rr}catch{return rr=null,null}},Tp=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},rn=(e,t,r)=>{let n=B.get(e);if(n!==void 0){B.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Ip=(e,t)=>{let r=B.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Op=(e,t,r)=>{let n=B.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Na=e=>{for(let t of B.values())if(!(t.mode!=="agent"||t.runId!==e))return We(t.pty.pid);return!1},Np=e=>{for(let[t,r]of B.entries())if(!(r.mode!=="agent"||r.runId!==e)){B.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Mp=async e=>{let t=await Cp();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;B.get(e.shellSessionId)!==void 0&&rn(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return B.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{Tp(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{B.get(e.shellSessionId)?.pty===o&&(B.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Hp=async e=>{let t=e.shellSessionId??(0,Lp.randomUUID)(),r=await Cp();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return B.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{Tp(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{B.get(t)?.pty===n&&(B.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var ns,Dp,Fp=u(()=>{"use strict";ns="[[AWAITING_INPUT]]",Dp=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",ns,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var nn,Up,os=u(()=>{"use strict";Fp();nn=e=>{let t=e.indexOf(ns);if(t<0)return null;let n=e.slice(t+ns.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},Up=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Dp].join(`
`)});var jp,$p=u(()=>{"use strict";ts();rs();os();jp=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(ze(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}At(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Hp({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=nn(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var Bp,Gp,Vp,Ke,ss=u(()=>{"use strict";Bp=require("node:child_process"),Gp=g(require("node:fs")),Vp=g(require("node:path"));Wt();Ke=(e,t)=>{let r=Vp.default.join(e,"app",Ul,"ensure-writer.sh");return Gp.default.existsSync(r)?new Promise((n,o)=>{let s=(0,Bp.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var zp,St,as,Kp,qp,is,Jp,ls,Yp,Xp,Pw,on,Cw,Tw,Zp,Ma=u(()=>{"use strict";zp=require("node:child_process");ot();ss();Lr();it();Ue();at();St=new Map,as=e=>e==="cursor"||e==="antigravity",Kp=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",qp=e=>St.get(e)?.warmed===!0,is=e=>{let t=St.get(e);St.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Jp=e=>St.get(e)?.conversationStarted===!0,ls=e=>{let t=St.get(e);St.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Yp=e=>{St.delete(e)},Xp=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Pw={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},on=e=>`${Pw[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Cw=(e,t,r,n)=>new Promise(o=>{let s=cd(t,r),i=[],a=(0,zp.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let m=d.toString("utf8");i.push(m),n?.(m)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),Tw=(e,t)=>{let r=on(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Zp=async e=>{if(!H(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&K(e.runConfig.writerExecutionBackend)==="api"){let r=De(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=ne(e.runConfig.layout.configPath);return Fe(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),is(e.writerAgent),{exitCode:0,output:on(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Ke(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}as(e.writerAgent)&&is(e.writerAgent);let t=await Cw(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Tw(e.writerAgent,t.output):on(e.writerAgent)}}});var Qp,sn,M,Ha,eg,tg,Da,rg,ng,og,Iw,ae,an,qe,sg,Ow,Nw,Fa,ig,ag,lg,cg=u(()=>{"use strict";Qp=require("node:child_process");ot();cp();Ap();_p();Wp();zr();ts();rs();os();$p();Ma();di();yi();Ue();hr();os();sn=new Map,M=new Map,Ha=new Set,eg=130,tg=`

Stopped by user.`,Da=null,rg=e=>{Da=e},ng=async e=>{await Ta({layout:e,cloudApi:Da})},og=e=>{let t=sn.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:We(t.pid)},Iw=e=>He({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),ae=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},an=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=$n(s),c=M.get(r);if(a!==null&&c!==void 0){let d=_c(a),m=og(r)||Na(r);d!==null&&!m&&qe(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return wc(a)}}),qe=(e,t,r,n,o,s,i,a)=>{let c=o,d=oo(s,a);r!==void 0&&Ha.has(r)&&(Ha.delete(r),c=eg,d=d.trim().length>0&&!d.includes("Stopped by user.")?`${d.trim()}${tg}`:"Stopped by user."),r!==void 0&&(en(r),ze(r)&&(ae(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),Ep(r)),yp(e.layout,{agentRunId:r,originalPrompt:i,exitCode:c,output:d,layout:e.layout}),wp(e.layout,{runId:r,exitCode:c,output:d,createdAt:new Date().toISOString()}),Ta({layout:e.layout,cloudApi:Da}),M.delete(r),sn.delete(r),Xo(e.layout,r)),ae(t,{type:"command.claude.result",payload:{exitCode:c,output:d,...r!==void 0?{agentRunId:r}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n})},sg=(e,t,r,n,o,s,i)=>{let a=M.get(r),c=a?.accumulatedOutput??s;lp(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),yt(t,r,()=>La(e.layout,r),an(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),ae(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},Ow=(e,t,r,n,o,s,i)=>{let a=[],c=!1,d=m=>{if(!(o===void 0||m.length===0)){if(ze(o)){ae(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:m},requestId:n});return}At(o,m)}};if(o!==void 0){let m=M.get(o);sn.set(o,t),M.set(o,{originalPrompt:s,writerAgent:i,projectFolderPath:m?.projectFolderPath,reportKey:m?.reportKey,accumulatedOutput:m?.accumulatedOutput??""}),ae(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),yt(r,o,()=>og(o),an(e,r,o,n,m?.projectFolderPath,m?.reportKey))}t.stdout?.on("data",m=>{let h=m.toString("utf8");if(a.push(h),d(h),c||o===void 0)return;let _=nn(a.join(""));if(_!==null){c=!0,t.kill("SIGTERM");let A=M.get(o),f=[A?.accumulatedOutput??"",_.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),sn.delete(o),sg(e,r,o,n,_.question,f,s)}}),t.stderr?.on("data",m=>{let h=m.toString("utf8");a.push(h),d(h)}),t.on("close",m=>{if(c)return;ls(i);let h=o!==void 0?M.get(o):void 0,_=a.join("").trim(),A=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${_}`.trim():_;qe(e,r,o,n,m??-1,A,s)}),t.on("error",m=>{c||qe(e,r,o,n,-1,m.message,s)})},Nw=(e,t,r,n,o,s,i,a)=>{s!==void 0&&(M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),ae(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),yt(o,s,()=>M.has(s),an(e,o,s,n,i,a))),po(e,t,r,d=>{if(!(s===void 0||d.length===0)){if(ze(s)){ae(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:d},requestId:n});return}At(s,d)}}).then(d=>{ls(t),qe(e,o,s,n,d.exitCode,d.output,r,d.llmUsage)}).catch(d=>{let m=d instanceof Error?d.message:String(d);qe(e,o,s,n,-1,m,r)})},Fa=(e,t,r,n,o,s,i,a,c,d)=>{if(mo(e,t)){Nw(e,t,r,n,o,s,c,d);return}let m=Mt(t,r,Iw(e),i);if(m===null){qe(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let h=()=>{let _=(0,Qp.spawn)(m.command,[...m.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});Ow(e,_,o,n,s,r,t)};if(s===void 0){h();return}M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:M.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Bn({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),yt(o,s,()=>M.has(s),an(e,o,s,n,c,d)),jp({socket:o,sendMessage:ae,requestId:n,agentRunId:s,shellSessionId:a,command:m.command,args:m.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:_=>{a!==void 0&&rn(a,l=>{ae(o,l)},n);let A=M.get(s),f=[A?.accumulatedOutput??"",_.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),sg(e,o,s,n,_.question,f,r)},onFinished:(_,A)=>{ls(t);let f=M.get(s),l=f!==void 0&&f.accumulatedOutput.length>0?`${f.accumulatedOutput}

${A}`.trim():A;qe(e,o,s,n,_,l,r)}}).then(_=>{if(!_){h();return}yt(o,s,()=>Na(s),an(e,o,s,n,c,d))}).catch(_=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",_ instanceof Error?_.message:_),h()})},ig=(e,t,r,n)=>{Xo(e.layout,t.agentRunId),t.shellSessionId!==void 0&&ae(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=Up(t),s=M.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Fa(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c)},ag=(e,t)=>{for(let r of ap(e.layout))M.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),yt(t,r.agentRunId,()=>La(e.layout,r.agentRunId),{awaitingInput:!0}),ae(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},lg=(e,t,r,n)=>{let o=M.get(r);if(o===void 0)return!1;Ha.add(r),en(r);let s=sn.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(Np(r))return!0;Xo(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${tg}`:"Stopped by user.";return qe(e,t,r,n,eg,i,o.originalPrompt),!0}});var Mw,dg,ug=u(()=>{"use strict";$t();Mw=()=>`http://127.0.0.1:${oe()}/restart`,dg=async()=>{try{let e=await fetch(Mw(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var bt,Ua,Hw,Dw,ja,wt,cs,mg,ds=u(()=>{"use strict";bt=g(require("node:fs")),Ua=g(require("node:path")),Hw="local-ws-traffic.ndjson",Dw=500,ja=e=>Ua.default.join(e.logsDir,Hw),wt=(e,t)=>{let r=ja(e);bt.default.mkdirSync(Ua.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});bt.default.appendFileSync(r,`${n}
`,"utf8")},cs=(e,t=Dw)=>{let r=ja(e);if(!bt.default.existsSync(r))return[];let o=bt.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},mg=e=>{let t=ja(e);bt.default.existsSync(t)&&bt.default.writeFileSync(t,"","utf8")}});var Fw,us,$a=u(()=>{"use strict";$t();Fw=()=>`http://127.0.0.1:${oe()}/update/run`,us=async e=>{try{let t=await fetch(Fw(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var pg,gg=u(()=>{"use strict";pg=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var ln,Uw,fg,hg=u(()=>{"use strict";ds();tt();$a();gg();ln=(e,t)=>{wt(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},Uw=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ot(),Yn)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},fg=async e=>{let t=z(e.layout.installDir)?.bundleVersion??null;if(!pg({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),ln(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await us({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),ln(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await Uw();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),ln(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),ln(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),ln(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var jw,yg,Ag=u(()=>{"use strict";jw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yg=e=>{if(!jw(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Sg,bg,wg=u(()=>{"use strict";li();Ao();Sg=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=eo({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},bg=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await jt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Q,$w,Bw,Gw,_g,vg,Wg,kg,Eg,Lg,xg=u(()=>{"use strict";Q=require("node:crypto"),$w=Buffer.from("302a300506032b6570032100","hex"),Bw=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},Gw=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Q.createPublicKey)({key:Buffer.concat([$w,t]),format:"der",type:"spki"})},_g=()=>{let{publicKey:e,privateKey:t}=(0,Q.generateKeyPairSync)("ed25519");return{publicKeyRaw:Bw(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},vg=e=>(0,Q.createPrivateKey)(e),Wg=(e,t)=>(0,Q.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),kg=(e,t,r)=>{try{let n=Gw(e);return(0,Q.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},Eg=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Lg=()=>(0,Q.randomBytes)(32).toString("base64url")});var Ee,ms,Rg,Vw,zw,Ba,Pg,Cg,Ga=u(()=>{"use strict";Ee=g(require("node:fs")),ms=g(require("node:path"));xg();x();Rg=e=>ms.default.join(e.installDir,kt),Vw=(e,t)=>{if(e.profileEmail===null||t===Rg(e)||Ee.default.existsSync(t))return;let r=Rg(e);Ee.default.existsSync(r)&&(Ee.default.mkdirSync(ms.default.dirname(t),{recursive:!0}),Ee.default.renameSync(r,t))},zw=e=>{if(!Ee.default.existsSync(e))return null;try{let t=Ee.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Ba=e=>{let t=Jl(e);Vw(e,t);let r=zw(t);if(r!==null)return r;let n=_g();return Ee.default.mkdirSync(ms.default.dirname(t),{recursive:!0}),Ee.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},Pg=e=>{let t=Ba(e.layout),r=Lg(),n=Eg({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=vg(t.privateKeyPem),s=Wg(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Cg=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return kg(e.serverPublicKey,t,e.serverAttestation)}});var ps,Va=u(()=>{"use strict";ps={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var Kw,Tg,qw,Ig,Og=u(()=>{"use strict";Va();Kw=new Set(Object.values(ps)),Tg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qw=e=>{if(!Tg(e))return!1;let t=e.type;return!(typeof t!="string"||!Kw.has(t)||e.payload!==void 0&&!Tg(e.payload)||e.requestId!==void 0&&typeof e.requestId!="string")},Ig=qw});var Jw,Ng,Mg,Hg=u(()=>{"use strict";Og();Va();Jw=new Set(Object.values(ps)),Ng=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Mg=e=>{if(!Ng(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;return typeof t!="string"?{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e}:Jw.has(t)?e.payload!==void 0&&!Ng(e.payload)?{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:e.requestId!==void 0&&typeof e.requestId!="string"?{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e}:Ig(e)?{formatOk:!0,formatError:null,command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}}});var Dg,Fg=u(()=>{"use strict";Dg=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var Yw,Xw,Zw,cn,Ug=u(()=>{"use strict";Fg();Yw=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Xw=e=>Yw.test(e),Zw=e=>Dg(e),cn=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>cn(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&Xw(n)){r[n]=Zw(o);continue}r[n]=cn(o)}return r}});var fe,za,Qw,e_,t_,Ka,jg,$g,Bg,r_,qa,nr,Ja,Gg,gs=u(()=>{"use strict";fe=g(require("node:fs")),za=g(require("node:path"));Hg();Ug();Qw="local-ws-trace.ndjson",e_=1e4,t_=1440*60*1e3,Ka=e=>za.default.join(e.logsDir,Qw),jg=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},$g=e=>{if(!fe.default.existsSync(e))return;let t=fe.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-t_,o=t.filter(s=>{let i=jg(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-e_);fe.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},Bg=(e,t)=>{let r=Ka(e);fe.default.mkdirSync(za.default.dirname(r),{recursive:!0}),fe.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),$g(r)},r_=e=>e.parsed===null?{_empty:!0}:cn(e.parsed),qa=(e,t,r)=>{let n=Mg(r);Bg(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:r_(n)})},nr=(e,t)=>{Bg(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:cn({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Ja=(e,t=80)=>{let r=Ka(e);if($g(r),!fe.default.existsSync(r))return[];let n=fe.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=jg(s);i!==null&&o.push(i)}return o.reverse()},Gg=e=>{let t=Ka(e);fe.default.existsSync(t)&&fe.default.writeFileSync(t,"","utf8")}});var Vg,zg,Kg=u(()=>{"use strict";gs();Vg=!1,zg=e=>{Vg||(Vg=!0,process.on("uncaughtException",t=>{nr(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;nr(e,{kind:"crash",message:r,stack:n})}))}});var n_,qg,Jg=u(()=>{"use strict";n_="local.agentwitch.com",qg=`http://${n_}:43347`});var _t,o_,Yg,Xg=u(()=>{"use strict";_t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),o_=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Yg=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${_t(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?_t(r.direction):_t(r.kind),i=`trace-body-${n}`,a=_t(o_(r.body));return`<tr>
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
    </section>`});var dn,fs,s_,i_,a_,l_,Zg,c_,d_,Qg,un,ef,mn,tf,Ya=u(()=>{"use strict";dn=g(require("node:fs")),fs=g(require("node:path"));Rt();Yr();s_="rag",i_="http://127.0.0.1:11434",a_="nomic-embed-text",l_=e=>fs.default.join(e.installDir,s_),Zg=(e,t)=>t!==void 0&&t.trim().length>0?Ve(t).ragChunksFilePath:fs.default.join(l_(e),Dn),c_=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},d_=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},Qg=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||i_,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||a_;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},un=(e,t)=>{let r=Zg(e,t);if(!dn.default.existsSync(r))return[];let n=dn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},ef=async e=>{let t=d_(e.text);if(t.length===0)return 0;let r=Zg(e.layout,e.projectFolderPath);dn.default.mkdirSync(fs.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await Qg(o);if(s===null)continue;let i={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};dn.default.appendFileSync(r,`${JSON.stringify(i)}
`,"utf8"),n+=1}return n},mn=async e=>{let t=await Qg(e.query);return t===null?[]:un(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:c_(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},tf=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var rf,nf=u(()=>{"use strict";rf=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var of,hs,sf,ys=u(()=>{"use strict";nf();of=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hs=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=of(e),r=of(rf(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},sf=`(function () {
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
})();`});var or,af,lf=u(()=>{"use strict";or=(e,t,r)=>e===1?t:r,af=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${or(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${or(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${or(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${or(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${or(d,"month","months")} ago`;let m=Math.floor(a/365);return`${m} ${or(m,"year","years")} ago`}});var Xa,cf,df=u(()=>{"use strict";Xa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cf=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${Xa(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Xa(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${Xa(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var uf,mf,pf,gf=u(()=>{"use strict";uf=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,mf=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,pf=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var sr,ff,hf=u(()=>{"use strict";ys();sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ff=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${sr(e.wakeError)}</div>`:"",a=hs(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${sr(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${sr(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${sr(n)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${sr(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${sr(o)}</p>
      </a>
    </div>`}});var ir,u_,yf,Af=u(()=>{"use strict";ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u_=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],yf=e=>{let t=u_.map(i=>`<option value="${ir(i.value)}">${ir(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${ir(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${ir(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${ir(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${ir(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Za,Sf,Qa=u(()=>{"use strict";Za=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},Sf=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Za(t)}});var bf,wf=u(()=>{"use strict";bf={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var G,m_,p_,el,tl,_f,vf=u(()=>{"use strict";Qa();Er();wf();gi();G=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),m_=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},p_=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=Za(n);return`value="${G(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${G(r)}"`},el=(e,t,r,n,o)=>{let s=bf[t];return`<label class="field">
          <span class="field-label">${G(n)} API key \u2014 ${G(m_(e,t))} \xB7 <a class="field-link" href="${G(s.href)}" target="_blank" rel="noopener noreferrer">${G(s.label)}</a></span>
          <input class="input mono" type="password" name="${G(r)}" autocomplete="off" ${p_(e,t,o)} />
        </label>`},tl=(e,t,r,n)=>{let o=dd(e[t]?.model),s=new Set(pi[t].map(c=>c.value)),i=pi[t].map(c=>{let d=c.value===o?" selected":"";return`<option value="${G(c.value)}"${d}>${G(c.label)}</option>`}).join(""),a=o!==Ht&&!s.has(o)?`<option value="${G(o)}" selected>${G(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${G(n)}</span>
          <select class="input mono" name="${G(r)}">${i}${a}</select>
        </label>`},_f=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${G(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${el(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${tl(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${el(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${tl(e.secrets,"openai","openaiModel","OpenAI model")}
        ${el(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${tl(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var Wf,kf=u(()=>{"use strict";Wf=`
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
`.trim()});var g_,f_,rl,Ef,Lf=u(()=>{"use strict";kf();ys();g_=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,f_=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],rl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ef=e=>{let t=f_.map(s=>{let i=s.href===e.activePath;return`<a class="nav-link${i?" is-active":""}" href="${s.href}"${i?' aria-current="page"':""}>${s.label}</a>`}).join(""),r=rl(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=rl(e.installBundleVersionLabel?.trim()??"unknown");return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${rl(e.title)} \xB7 Agent Witch Local</title>
  <style>${Wf}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home, install bundle ${o}">
        ${g_}
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
  <script>${sf}</script>
</body>
</html>`}});var As,Ss,nl=u(()=>{"use strict";As=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ss=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${As(e.syncMessage)}</p>`:"",n=As(e.manageHref),o=As(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${As(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var bs,xf,Rf=u(()=>{"use strict";bs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xf=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${bs(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks on Agent Witch Live</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install from Agent Witch Live (library or marketplace) \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let n=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${bs(s.name)}</strong> <span class="muted mono">(${bs(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),o=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${bs(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${o}
      <ul class="harness-installed-set-list">${n}</ul>
    </section>`}});var h_,Pf,Cf,Tf=u(()=>{"use strict";h_=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,Pf=e=>e.kind==="folder",Cf=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&Pf(d)){s=d;continue}let m={kind:"folder",name:a,children:new Map};s.children.set(a,m),s=m}}let r=n=>{let o=[];for(let s of n.children.values()){if(Pf(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(h_)};return r(t)}});var If,ol,Of=u(()=>{"use strict";If=g(require("node:path")),ol=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${ol(r.children,t)}</ul>
            </details>
          </li>`;let n=If.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var Nf,Je,y_,A_,ws,S_,Mf,Hf=u(()=>{"use strict";nl();Nf=g(require("node:path"));Rf();Tf();Of();Je=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y_=()=>`(() => {
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

})();`,A_=()=>`(() => {
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
})();`,ws=e=>{let t=Ss({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks on Agent Witch Live",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=xf({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${Je(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Je(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':S_(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Je(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Je(s)}" />
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
    <script>${y_()}</script>
    <script>${A_()}</script>`;return`${t}${r}${n}${c}${d}`},S_=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=Cf(a.items.map(_=>({..._,relativePath:typeof _.relativePath=="string"&&_.relativePath.length>0?_.relativePath:Nf.default.relative(a.sourceRoot,_.sourcePath).replaceAll("\\","/")}))),m=ol(d,Je),h=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Je(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Je(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${h} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${m}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Je(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Mf=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),m=a.trim();Number.isFinite(d)&&m.length>0&&o.set(d,m)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),m=d!==null&&Number.isFinite(d)?o.get(d):void 0,h=e.get(`setName-${i}`)?.trim()??m??a,_=t.sets[i];if(_===void 0)continue;let A=a.length>0?a:_.proposedSlug,f=h.length>0?h:_.proposedName,l=r.size===0||r.has(i),S=_.items.map(y=>({id:y.id,kind:y.kind,title:y.title,sourcePath:y.sourcePath,include:l}));s.push({slug:A,name:f,items:S})}return s}});var pn,sl,Ff,Uf,b_,gn,jf,$f,il,Df,Bf,al=u(()=>{"use strict";pn=g(require("node:fs")),sl=g(require("node:path")),Ff=require("node:crypto");qo();Uf=e=>sl.default.join(e.harnessRootDir,"projects-registry.json"),b_=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),gn=e=>{let t=Uf(e);if(!pn.default.existsSync(t))return[];try{let r=JSON.parse(pn.default.readFileSync(t,"utf8"));return b_(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},jf=(e,t)=>{pn.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};pn.default.writeFileSync(Uf(e),`${JSON.stringify(r,null,2)}
`)},$f=(e,t)=>{let r=Ge(t.projectFolderPath),n=t.name?.trim()||sl.default.basename(r)||"Project",o=gn(e),s=o.find(a=>Ge(a.projectFolderPath)===r);if(s!==void 0)return s;let i={id:(0,Ff.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return jf(e,[...o,i]),i},il=(e,t)=>gn(e).find(r=>r.id===t||r.cloudProjectId===t)??null,Df=e=>Ge(e),Bf=(e,t)=>{let r=gn(e),n=new Date().toISOString(),o=0,s=0,i=[...r];for(let a of t){let c=Df(a.folderPath),d=i.findIndex(_=>_.cloudProjectId===a.id||_.id===a.id||Df(_.projectFolderPath)===c);if(d===-1){i.push({id:a.id,cloudProjectId:a.id,name:a.name,projectFolderPath:a.folderPath,addedAt:n}),o+=1;continue}let m=i[d],h={...m,name:a.name,projectFolderPath:a.folderPath,cloudProjectId:a.id};(h.name!==m.name||h.projectFolderPath!==m.projectFolderPath||h.cloudProjectId!==m.cloudProjectId)&&(s+=1),i[d]=h}return jf(e,i),{added:o,updated:s}}});var Gf,Vf=u(()=>{"use strict";Gf=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var _s,ll,fn,w_,Le,vs,ar=u(()=>{"use strict";_s=g(require("node:fs")),ll=g(require("node:os")),fn=g(require("node:path")),w_=()=>_s.default.realpathSync(fn.default.resolve(ll.default.homedir())),Le=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?fn.default.join(ll.default.homedir(),t.slice(1)):t,n;try{n=_s.default.realpathSync(fn.default.resolve(r))}catch{return null}let o=w_();return n===o||n.startsWith(`${o}${fn.default.sep}`)?n:null},vs=e=>{let t=Le(e);if(t===null)return null;try{if(!_s.default.statSync(t).isFile())return null}catch{return null}return t}});var le,lr,hn,__,v_,W_,zf,Kf=u(()=>{"use strict";le=g(require("node:fs")),lr=g(require("node:path"));qo();Xr();Vf();ar();hn=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),__=e=>{if(!le.default.existsSync(e))return null;try{let t=JSON.parse(le.default.readFileSync(e,"utf8"));if(hn(t)&&t.version===1)return t}catch{return null}return null},v_=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?lr.default.join(e.harnessRootDir,n):lr.default.join(e.harnessSetsDir,t,n);if(!le.default.existsSync(o))return null;try{if(!le.default.statSync(o).isFile())return null}catch{return null}return o},W_=(e,t)=>{let r={};if(le.default.existsSync(e))try{let o=JSON.parse(le.default.readFileSync(e,"utf8"));hn(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};le.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},zf=e=>{let t=[...new Set(e.setSlugs.map(m=>m.trim()).filter(m=>m.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=Ge(e.projectFolderPath),n=Le(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=le.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=__(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let i=hn(s.sets)?s.sets:{},a=lr.default.join(n,".cursor"),c=0;for(let m of t){let h=i[m];if(!hn(h))return{ok:!1,errorMessage:`Harness set "${m}" is not installed locally.`};let _=Array.isArray(h.items)?h.items:[];for(let A of _){if(!hn(A))continue;let f=typeof A.path=="string"?A.path.trim():"";if(f.length===0)continue;let l=Gf(f);if(l===null)continue;let S=v_(e.layout,m,f);if(S===null)continue;let y=lr.default.join(a,l);le.default.mkdirSync(lr.default.dirname(y),{recursive:!0}),le.default.copyFileSync(S,y),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let d=ke({projectFolderPath:n});return W_(d.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var Ye,cl,qf=u(()=>{"use strict";Ye=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cl=e=>{let t=e.flashError?`<div class="alert-error">${Ye(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ye(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Ye(o.slug)}"${r.has(o.slug)?" checked":""} />
            <span><strong>${Ye(o.name)}</strong> <span class="muted mono">(${Ye(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Ye(e.project.name)}</h1>
      <p class="muted mono">${Ye(e.project.projectFolderPath)}</p>
      <p class="lede">Linked harness sets are copied into this project&apos;s <code>.cursor</code> folder and recorded in <code>.agent-witch/project.json</code>.</p>
      <form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ye(e.project.id)}" />
        <p class="field-label">Harness sets</p>
        ${n}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${e.installed.sets.length===0?" disabled":""}>Save linked harness</button>
        </div>
      </form>
    </section>`}});var Ws,Jf,Yf=u(()=>{"use strict";nl();Ws=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jf=e=>{let t=e.flashError?`<div class="alert-error">${Ws(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ws(e.flashMessage)}</div>`:"",r=Ss({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/agent`,manageLabel:"Manage repositories on Agent Witch Live",body:"Repositories are created in the browser task composer. This page syncs them to this Mac so you can link playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No repositories synced yet. Add one in Agent Witch Live (task composer), then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=o.cloudProjectId!==void 0?'<span class="project-live-badge">Live</span>':'<span class="project-local-badge">Mac only</span>';return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${Ws(o.name)}</strong> ${s}
                  <span class="muted mono">${Ws(o.projectFolderPath)}</span>
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
    </section>`}});var Xf,Zf=u(()=>{"use strict";Nt();al();Xf=async(e,t)=>{let r=Me({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,syncedCount:0,message:"Could not sync \u2014 check pairing token and wsUrl in config.json."};let n=await ad(r);if(n===null)return{ok:!1,syncedCount:0,message:"Could not reach Agent Witch Live. Repositories may be Mac-only until the Mac client reconnects."};let{added:o,updated:s}=Bf(e,n);return{ok:!0,syncedCount:n.length,message:n.length===0?"Synced with Agent Witch Live \u2014 no repositories yet. Add one in the task composer on the website.":`Synced ${n.length} repositor${n.length===1?"y":"ies"} from Agent Witch Live${o+s>0?` (${o} new, ${s} updated on this Mac)`:""}.`}}});var dl,ul,Qf=u(()=>{"use strict";dl=g(require("node:fs"));Yr();ul=e=>{let t=Ve(e);if(!dl.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse(dl.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var pl,ml,yn,eh=u(()=>{"use strict";pl=g(require("node:fs")),ml=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yn=e=>{if(!pl.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(pl.default.readFileSync(e.harnessManifestPath,"utf8"));if(!ml(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=ml(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!ml(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",m=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:m.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var gl,th=u(()=>{"use strict";gl=()=>"~"});var rh,fl,nh=u(()=>{"use strict";rh=require("node:child_process"),fl=()=>{if(process.platform!=="darwin")return null;try{let t=(0,rh.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var oh,sh,ih=u(()=>{"use strict";oh=require("node:crypto"),sh=e=>`local-${(0,oh.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var hl,ah=u(()=>{"use strict";hl=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var An,ks,yl=u(()=>{"use strict";An=g(require("node:path")),ks=e=>{let t=An.default.dirname(e),r=An.default.basename(t);return r==="agents"?An.default.basename(An.default.dirname(t)):r}});var Sn,xe,lh,k_,E_,L_,Es,ch,Al=u(()=>{"use strict";Sn=g(require("node:fs")),xe=g(require("node:path"));ih();ah();yl();lh=new Set(["node_modules",".git","dist","build",".next","coverage"]),k_=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},E_=(e,t)=>{let r=xe.default.basename(t);if(e==="skill"){let n=t.split(xe.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},L_=e=>{let t=[],r=(o,s)=>{let i;try{i=Sn.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&lh.has(a.name))continue;let c=xe.default.join(o,a.name),d=s?xe.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;hl(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=xe.default.join(e,o);Sn.default.existsSync(s)&&r(s,o)}let n=xe.default.join(e,"skills");return Sn.default.existsSync(n)&&r(n,"skills"),t},Es=e=>{let t=L_(e);if(t.length===0)return null;let r=xe.default.dirname(e),n=ks(e),o=k_(n),s=t.map(i=>{let a=hl(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:sh(i.absolutePath),kind:a,title:E_(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},ch=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=Sn.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||lh.has(a.name))continue;let c=xe.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var dh,Sl,x_,uh,mh=u(()=>{"use strict";dh=g(require("node:fs")),Sl=g(require("node:path"));Al();ar();x_=e=>{let t=Le(e.trim());if(t===null)return null;if(Sl.default.basename(t)===".cursor")return t;let r=Sl.default.join(t,".cursor");try{if(dh.default.statSync(r).isDirectory())return Le(r)}catch{return null}return null},uh=e=>{let t=x_(e.projectPath);if(t===null)return null;let r=Es(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var ph,R_,Ls,gh,fh=u(()=>{"use strict";ph=g(require("node:path"));Al();ar();yl();R_=5,Ls=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},gh=e=>{let t=Le(e.scanRoot.trim());if(t===null)return Ls(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of ch(t,R_,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Le(s);if(i===null)continue;let a=ks(i);Ls(e.response,"folder",{cursorDir:i,groupName:a,repoPath:ph.default.dirname(i)});let c=Es(i);c!==null&&(r.push(c),Ls(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Ls(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var hh,yh,Ah=u(()=>{"use strict";hh=g(require("node:path")),yh=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:hh.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var j,Sh,bl,P_,bh,wl,_l,wh,xs,_h=u(()=>{"use strict";j=g(require("node:fs")),Sh=g(require("node:os")),bl=g(require("node:path"));Li();ar();Ah();P_=e=>{if(!j.default.existsSync(e))return null;try{let t=JSON.parse(j.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},bh=e=>{let t=e.hostname??Sh.default.hostname(),r=P_(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(m=>m.include);if(a.length===0)continue;let c=[];for(let m of a){let h=vs(m.sourcePath);if(h===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${m.sourcePath}`};let _=j.default.readFileSync(h,"utf8");c.push({id:m.id,kind:m.kind,title:m.title,content:_,setSlugs:[i.slug]})}let d=Wo({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let m of d.directories)o.add(m);for(let m of d.files)s.push(m),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{j.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)j.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=bl.default.join(e.layout.harnessRootDir,i.relativePath);j.default.mkdirSync(bl.default.dirname(a),{recursive:!0}),j.default.writeFileSync(a,i.content)}return j.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},wl="reveal-cache.json",_l=(e,t)=>{j.default.mkdirSync(e.harnessRootDir,{recursive:!0}),j.default.writeFileSync(`${e.harnessRootDir}/${wl}`,`${JSON.stringify(t,null,2)}
`)},wh=e=>{let t=`${e.harnessRootDir}/${wl}`;j.default.existsSync(t)&&j.default.unlinkSync(t)},xs=e=>{let t=`${e.harnessRootDir}/${wl}`;if(!j.default.existsSync(t))return null;try{let r=JSON.parse(j.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return yh(r)}catch{return null}return null}});var vl,vh=u(()=>{"use strict";vl=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Xe,Wh,C_,kh,Wl,Eh=u(()=>{"use strict";Xe=g(require("node:fs")),Wh=g(require("node:path")),C_=256e3,kh=e=>{Xe.default.mkdirSync(Wh.default.dirname(e),{recursive:!0}),Xe.default.writeFileSync(e,"","utf8")},Wl=(e,t=C_)=>{if(!Xe.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Xe.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Xe.default.openSync(e,"r");try{Xe.default.readSync(a,i,0,s,o)}finally{Xe.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var Lh,xh,kl,Rh,Ph=u(()=>{"use strict";Lh=require("node:crypto"),xh=g(require("node:fs"));Nt();go();ot();lt();kl=!1,Rh=async e=>{if(kl)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!H(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=D();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=Me({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&xh.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,Lh.randomUUID)();kl=!0;try{if(await id(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Ut({...r,workspace:o},e.writerAgent,t);return await ro(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{kl=!1}}});var Rs,Ch,Th=u(()=>{"use strict";Rs=g(require("node:fs"));fi();Ch=(e,t)=>{let r=uo(e);Rs.default.mkdirSync(e,{recursive:!0}),Rs.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Rs.default.chmodSync(r,384)}catch{}}});var bn,T_,El,Ih,Oh=u(()=>{"use strict";bn=g(require("node:fs"));it();Th();Qa();Er();Ue();T_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),El=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=Sf(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?Dt(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Ih=e=>{let t=ne(e.configPath),r={};if(bn.default.existsSync(e.configPath))try{let o=JSON.parse(bn.default.readFileSync(e.configPath,"utf8"));T_(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,bn.default.mkdirSync(t,{recursive:!0}),bn.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=El(El(El(st(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);Ch(t,n)}});var Nh,Ze,Ll=u(()=>{"use strict";Nh=g(require("node:path"));fo();Si();lt();Ct();x();Ze=e=>{let t=D()?.layout.installDir??v();if(Nh.default.basename(t)===ho)return xr;let r=D(),n=r!==null?Y(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):xr}});var Mh,Hh=u(()=>{"use strict";tt();Ot();Ll();Mh=async e=>{let t=z(e.installDir),r=t?.bundleVersion??null,n=Ze(t);try{let o=await ti(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:zn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Dh,Fh=u(()=>{"use strict";Dh=e=>!e});var Uh,jh,$h=u(()=>{"use strict";$a();Uh=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},jh=async()=>{let e=await us({force:!0});if(e.ok)return{ok:!0,message:Uh(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:Uh(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ot(),Yn)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Vh,wn,zh,Rl,Bh,I_,xl,Gh,F,Pl,O,J,cr,O_,N_,Kh,qh,Jh=u(()=>{"use strict";Vh=g(require("node:http")),wn=g(require("node:fs")),zh=g(require("node:path"));Jg();ds();gs();Xg();Ya();Nr();Gt();ys();lf();df();gf();hf();Af();vf();Lf();Hf();al();Kf();qf();Yf();Zf();Qf();eh();th();nh();mh();ar();fh();_h();Xr();vh();Eh();tt();Ph();lt();Oh();it();at();Ue();Ll();Hh();Fh();$h();Ga();Rl=e=>af(e)??"never",Bh=48e3,I_=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,xl=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??gl(),reveal:t.reveal,installed:yn(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),Gh=async e=>{let t=D();if(t===null)return{ok:!1,message:"Mac client config missing \u2014 showing folders registered on this Mac only."};let r=await Xf(e,t);return{ok:r.ok,message:r.message}},F=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pl={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},O=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Pl}),e.end(JSON.stringify(r))},J=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},cr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},O_=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${F(e.status.wakeError)}</div>`:"",o=Dh(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${hs(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${F(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${F(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${F(Rl(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${F(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},N_=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},Kh=e=>{let t=zh.default.join(e.layout.installDir,"link-code.txt"),r=()=>z(e.layout.installDir),n=()=>{let A=r();return{installBundleVersion:vl(A),installBundleUpdatedAt:A?.updatedAt??null,installVersion:A}},o=async A=>{let f=A.installVersion??r(),l=await i(),S=mf(l),y=pf(A.updateFlash??null);return Ef({title:A.title,activePath:A.activePath,body:A.body,cloudAppOrigin:Ze(f),installBundleVersionLabel:vl(f),prependBody:`${y}${S}`,headerUpdateButtonHtml:uf(l)})},s=null,i=async()=>{let A=Date.now();if(s!==null&&A-s.cachedAtMs<6e4)return s.offer;let f=await Mh(e.layout);return s={cachedAtMs:A,offer:f},f},a=()=>{s=null},c=!1,d=()=>{c||(c=!0,jh().catch(A=>{console.error("[agent-witch-local-app] install bundle update failed:",A)}).finally(()=>{c=!1,a()}))},m=async A=>{if(a(),!(await i()).updateAvailable){A.writeHead(303,{Location:"/?update=ok"}),A.end();return}A.writeHead(303,{Location:"/?update=started"}),A.end(),d()},h=()=>{if(wn.default.existsSync(t))return wn.default.readFileSync(t,"utf8").trim();let A=Math.random().toString(36).slice(2,8).toUpperCase();return wn.default.writeFileSync(t,A,"utf8"),A},_=Vh.default.createServer((A,f)=>{(async()=>{let l=A.url?.split("?")[0]??"/",S=A.method??"GET";if(S==="OPTIONS"){f.writeHead(204,Pl),f.end();return}if(S==="GET"&&l==="/health"){let y=e.controllers.getStatus(),p=n();O(f,200,{ok:!0,...y,installBundleVersion:p.installBundleVersion,installBundleUpdatedAt:p.installBundleUpdatedAt});return}if(S==="GET"&&l==="/api/status"){let y=n();O(f,200,{...e.controllers.getStatus(),linkCode:h(),installBundleVersion:y.installBundleVersion,installBundleUpdatedAt:y.installBundleUpdatedAt});return}if(S==="GET"&&l==="/api/traffic"){O(f,200,{entries:cs(e.layout)});return}if(S==="DELETE"&&l==="/api/traffic"){mg(e.layout),O(f,200,{ok:!0});return}if(S==="GET"&&l==="/api/trace"){O(f,200,{entries:Ja(e.layout)});return}if(S==="DELETE"&&l==="/api/trace"||S==="POST"&&l==="/api/trace/clear"){if(Gg(e.layout),S==="POST"){f.writeHead(303,{Location:"/status"}),f.end();return}O(f,200,{ok:!0});return}if(S==="POST"&&l==="/api/errors/clear"){kh(e.layout.errorLogPath),f.writeHead(303,{Location:"/errors"}),f.end();return}if(S==="GET"&&l==="/api/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(p.length>0){let b=await mn({layout:e.layout,query:p,limit:20});O(f,200,{chunks:b,query:p});return}O(f,200,{chunks:un(e.layout).slice(-50).reverse()});return}if(S==="POST"&&l==="/api/revive"){e.controllers.reviveWebSocket(),O(f,200,{ok:!0});return}if(S==="GET"&&l==="/api/update-status"){let y=await i();O(f,200,{ok:!0,...y});return}if((S==="GET"||S==="POST")&&l==="/api/update"){await m(f);return}if(S==="GET"&&l==="/"){let y=e.controllers.getStatus(),p=n(),b=yn(e.layout),w=Wl(e.layout.errorLogPath);J(f,await o({title:"Home",activePath:"/",installVersion:p.installVersion,updateFlash:N_(A.url??void 0),body:ff({wsConnected:y.wsConnected,lastHeartbeatAt:y.lastHeartbeatAt,installBundleVersion:p.installBundleVersion,harnessSetCount:b.sets.length,knowledgeChunkCount:un(e.layout).length,trafficEntryCount:cs(e.layout).length,wakeError:y.wakeError,errorLogByteSize:w.byteSize,errorLogExists:w.exists})}));return}if(S==="GET"&&l==="/task"){let y=e.controllers.getStatus(),p=n(),b=D(),w=new URL(A.url??"/",`http://127.0.0.1:${43347}`),W=w.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,E=w.searchParams.get("failed")==="1"?w.searchParams.get("error")?.trim()??"Task failed.":null,R=w.searchParams.get("runId");J(f,await o({title:"Task",activePath:"/task",installVersion:p.installVersion,body:yf({defaultWorkspace:b?.workspace??"",wsConnected:y.wsConnected,flashMessage:W,flashError:E,lastRunId:R})}));return}if(S==="POST"&&l==="/task/dispatch"){let y=await cr(A),p=new URLSearchParams(y),b=p.get("prompt")?.trim()??"",w=p.get("writerAgent")?.trim()??"claude-cli",W=p.get("projectFolder")?.trim()??"",E=await Rh({prompt:b,writerAgent:w,...W.length>0?{projectFolderPath:W}:{}}),R=new URLSearchParams;E.ok?R.set("ok","1"):(R.set("failed","1"),E.errorMessage!==void 0&&R.set("error",E.errorMessage.slice(0,240))),E.agentRunId!==void 0&&R.set("runId",E.agentRunId),f.writeHead(303,{Location:`/task?${R.toString()}`}),f.end();return}if(S==="GET"&&l==="/errors"){let y=n(),p=Wl(e.layout.errorLogPath);J(f,await o({title:"Errors",activePath:"/errors",installVersion:y.installVersion,body:cf({errorLogPath:e.layout.errorLogPath,content:p.content,exists:p.exists,truncated:p.truncated,byteSize:p.byteSize})}));return}if(S==="GET"&&l==="/status"){let y=e.controllers.getStatus(),p=se(e.layout),b=me(p,ue),w=n();J(f,await o({title:"Status",activePath:"/status",installVersion:w.installVersion,body:`${O_({status:y,stale:b,linkCode:h(),installBundleVersion:w.installBundleVersion,installBundleUpdatedAt:w.installBundleUpdatedAt})}${Yg({entries:Ja(e.layout)})}`}));return}if(S==="GET"&&l==="/traffic"){let y=cs(e.layout),p=n(),b=y.map(W=>`<tr><td title="${F(W.at)}">${F(Rl(W.at))}</td><td>${F(W.direction)}</td><td><code>${F(W.type)}</code></td><td>${F(W.summary)}</td><td>${F(W.action??"")}</td></tr>`).join(""),w=y.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${b}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';J(f,await o({title:"Traffic",activePath:"/traffic",installVersion:p.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${w}
            </section>`}));return}if(S==="GET"&&l==="/projects"){let y=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),b=Ze(p.installVersion),w=await Gh(e.layout),W=y.searchParams.get("added")==="1"?"Project added.":null;J(f,await o({title:"Projects",activePath:"/projects",installVersion:p.installVersion,body:Jf({projects:gn(e.layout),cloudAppOrigin:b,syncMessage:w.message,syncOk:w.ok,flashMessage:W})}));return}if(S==="GET"&&l==="/project"){let y=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=y.searchParams.get("id")?.trim()??"",b=n();await Gh(e.layout);let w=il(e.layout,p);if(w===null){f.writeHead(404),f.end("Project not found");return}let W=y.searchParams.get("linked")==="1"?`Harness linked (${y.searchParams.get("files")??"0"} file(s) written).`:null;J(f,await o({title:w.name,activePath:"/projects",installVersion:b.installVersion,body:cl({project:w,installed:yn(e.layout),linkedSetSlugs:ul(w.projectFolderPath),flashMessage:W})}));return}if(S==="POST"&&l==="/projects/add"){let y=fl();if(y===null){f.writeHead(303,{Location:"/projects"}),f.end();return}ke({projectFolderPath:y}),$f(e.layout,{projectFolderPath:y}),f.writeHead(303,{Location:"/projects?added=1"}),f.end();return}if(S==="POST"&&l==="/projects/link-harness"){let y=await cr(A),p=new URLSearchParams(y),b=p.get("projectId")?.trim()??"",w=il(e.layout,b);if(w===null){f.writeHead(404),f.end("Project not found");return}let W=p.getAll("applySet").map(R=>String(R)),E=zf({layout:e.layout,projectFolderPath:w.projectFolderPath,setSlugs:W});if(!E.ok){let R=n();J(f,await o({title:w.name,activePath:"/projects",installVersion:R.installVersion,body:cl({project:w,installed:yn(e.layout),linkedSetSlugs:ul(w.projectFolderPath),flashError:E.errorMessage})}));return}f.writeHead(303,{Location:`/project?id=${encodeURIComponent(w.id)}&linked=1&files=${E.writtenFileCount}`}),f.end();return}if(S==="GET"&&l==="/harness"){let y=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),b=xs(e.layout),w=y.searchParams.get("submitted")==="1",W=w?y.searchParams.get("syncFailed")==="1"?`Local harness updated (${y.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:y.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${y.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":y.searchParams.get("stopped")==="1"?`Reveal stopped. ${b?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:y.searchParams.get("revealed")==="1"?`Reveal found ${b?.sets.length??0} set(s).`:null,E=b?.scanRoots[0]??gl(),R=I_(e.layout,{reveal:b,importQuery:y.searchParams.get("import")==="1",justSubmitted:w}),$=Ze(p.installVersion);J(f,await o({title:"Harness",activePath:"/harness",installVersion:p.installVersion,body:ws(xl(e.layout,{cloudAppOrigin:$,reveal:b,scanFolder:E,flashMessage:W,importSectionExpanded:R}))}));return}if(S==="POST"&&l==="/api/harness/pick-folder"){let y=fl();if(y===null){O(f,200,{cancelled:!0});return}O(f,200,{path:y});return}if(S==="GET"&&l==="/api/harness/file-content"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",b=vs(p);if(b===null){O(f,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let w=wn.default.readFileSync(b,"utf8"),W=w.length>Bh?`${w.slice(0,Bh)}
\u2026 (truncated)`:w;O(f,200,{content:W})}catch{O(f,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&l==="/api/harness/reveal/add-project"){let y=await cr(A),p="";try{let W=JSON.parse(y);typeof W=="object"&&W!==null&&typeof W.projectPath=="string"&&(p=W.projectPath.trim())}catch{O(f,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(p.length===0){O(f,400,{ok:!1,errorMessage:"projectPath is required."});return}let b=xs(e.layout),w=uh({reveal:b,projectPath:p});if(w===null||w.sets.length===0){O(f,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}_l(e.layout,w),O(f,200,{ok:!0,setCount:w.sets.length});return}if(S==="GET"&&l==="/api/harness/reveal/stream"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(p.length===0){O(f,400,{errorMessage:"Choose a folder to scan first."});return}let b=!1;A.on("close",()=>{b=!0}),f.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Pl});let w=gh({scanRoot:p,response:f,shouldAbort:()=>b});_l(e.layout,w),f.end();return}if(S==="POST"&&l==="/harness/reveal"){f.writeHead(410,{"Content-Type":"text/plain"}),f.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&l==="/harness/submit"){let y=xs(e.layout);if(y===null){let $=n(),he=Ze($.installVersion);J(f,await o({title:"Harness",activePath:"/harness",installVersion:$.installVersion,body:ws(xl(e.layout,{cloudAppOrigin:he,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let p=await cr(A),b=new URLSearchParams(p),w=Mf(b,y),W=bh({layout:e.layout,sets:w});if(!W.ok){let $=n(),he=Ze($.installVersion);J(f,await o({title:"Harness",activePath:"/harness",installVersion:$.installVersion,body:ws(xl(e.layout,{cloudAppOrigin:he,reveal:y,flashError:W.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}wh(e.layout);let R=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";f.writeHead(303,{Location:`/harness?submitted=1&count=${W.writtenItemCount??0}${R}`}),f.end();return}if(S==="GET"&&l==="/writer-api"){let y=new URL(A.url??"/",`http://127.0.0.1:${43347}`),b=D()?.writerExecutionBackend??K(void 0),w=ne(e.layout.configPath),W=st(w),E=y.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,R=n();J(f,await o({title:"Writer API",activePath:"/writer-api",installVersion:R.installVersion,body:_f({writerExecutionBackend:b,secrets:W,flashMessage:E})}));return}if(S==="POST"&&l==="/writer-api"){let y=await cr(A),p=new URLSearchParams(y),b=p.get("writerExecutionBackend")?.trim()??"cli";Ih({configPath:e.layout.configPath,writerExecutionBackend:K(b),anthropicApiKey:p.get("anthropicApiKey")??void 0,anthropicModel:p.get("anthropicModel")??void 0,openaiApiKey:p.get("openaiApiKey")??void 0,openaiModel:p.get("openaiModel")??void 0,googleApiKey:p.get("googleApiKey")??void 0,googleModel:p.get("googleModel")??void 0}),f.writeHead(303,{Location:"/writer-api?saved=1"}),f.end();return}if(S==="GET"&&l==="/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",b=n(),W=(p.length>0?await mn({layout:e.layout,query:p,limit:20}):un(e.layout).slice(-50).reverse()).map(E=>`<article class="card"><div class="muted" title="${F(E.createdAt)}">${F(Rl(E.createdAt))}${E.source?` \xB7 ${F(E.source)}`:""}</div><pre>${F(E.text)}</pre></article>`).join("");J(f,await o({title:"Knowledge",activePath:"/knowledge",installVersion:b.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${F(p)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${W||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}S==="POST"&&await cr(A),f.writeHead(404),f.end("Not found")})().catch(l=>{console.error("[agent-witch-local-app]",l),f.writeHead(500),f.end("Internal error")})});return _.on("error",A=>{if(A.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",A)}),_.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${qg}`)}),_},qh=e=>Ba(e).publicKeyRaw});var _n,Cl,Yh,Xh,Zh,Qh,ey=u(()=>{"use strict";_n=g(require("node:fs")),Cl=g(require("node:path"));Rt();Yr();Yh=(e,t)=>Cl.default.join(Ve(t).memoryDirPath,Fn),Xh=(e,t)=>{let r=Yh(e,t);if(!_n.default.existsSync(r))return[];let n=_n.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Zh=e=>{let t=Yh(e.layout,e.projectFolderPath);_n.default.mkdirSync(Cl.default.dirname(t),{recursive:!0}),_n.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},Qh=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var ty,M_,H_,D_,ry,ny=u(()=>{"use strict";ty=g(require("node:os"));x();M_="Default",H_=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),D_=e=>{let t=ty.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},ry=()=>{let e=L(),t=ql(e),r=H_(M_);return`${D_(t)}/${r.length>0?r:"project"}`}});var oy,F_,sy,iy=u(()=>{"use strict";oy=require("node:child_process");ss();ot();Lr();it();Ue();at();F_=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,oy.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},sy=async e=>{if(!H(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&K(e.runConfig.writerExecutionBackend)==="api"){let r=De(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=ne(e.layout.configPath),o=Fe(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Ke(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await F_(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var ay,ly=u(()=>{"use strict";ay=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var cy,dy,uy=u(()=>{"use strict";cy=require("node:crypto"),dy=()=>(0,cy.randomUUID)()});var vn,U_,my,Ps=u(()=>{"use strict";vn="[[WORKING_ESTIMATE]]",U_=["Put this marker on its own line:",vn,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),my=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",U_,"","Task to estimate:",e.trim()].join(`
`)});var py,gy=u(()=>{"use strict";py=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var fy,hy=u(()=>{"use strict";fy=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var j_,yy,Ay=u(()=>{"use strict";Ps();j_=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,yy=e=>{if(!e.includes(vn))return null;let t=null;for(let r of e.matchAll(j_)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var Sy,by=u(()=>{"use strict";go();Ps();gy();hy();Ay();hr();Sy=async e=>{let t=py(e.wrappedPrompt),r=my(t),n=await Ut(e.config,e.writerAgent,r),o=yy(n.output),s=fy(o);return fr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:de.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var wy={};Re(wy,{buildContinuationPromptWithContext:()=>G_});var $_,B_,G_,_y=u(()=>{"use strict";$_=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,B_=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),G_=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=B_(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${$_(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var vy={};Re(vy,{readHarnessExportSets:()=>z_});var Wn,Tl,Cs,V_,z_,Wy=u(()=>{"use strict";Wn=g(require("node:fs")),Tl=g(require("node:path"));x();Cs=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),V_=e=>{if(!Wn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Wn.default.readFileSync(e.harnessManifestPath,"utf8"));if(Cs(t))return t}catch{return null}return null},z_=(e,t)=>{let r=L(t),n=V_(r);if(n===null)return[];let o=Cs(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!Cs(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let m of c){if(!Cs(m))continue;let h=typeof m.path=="string"?m.path:void 0,_=typeof m.id=="string"?m.id:"",A=typeof m.kind=="string"?m.kind:"",f=typeof m.title=="string"?m.title:"";if(h===void 0||_.length===0||A.length===0||f.length===0)continue;let l=h.startsWith("shared/")?Tl.default.join(r.harnessRootDir,h):Tl.default.join(r.harnessSetsDir,i,h);Wn.default.existsSync(l)&&d.push({id:_,kind:A,title:f,content:Wn.default.readFileSync(l,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var Cy={};Re(Cy,{startAgentWitchClient:()=>iv});var Nl,kn,dr,av,K_,q_,J_,Y_,ky,X_,Ey,Ly,xy,Il,C,Ry,I,Ol,Z_,Ts,Q_,ev,tv,rv,nv,ov,sv,Py,iv,Ty=u(()=>{"use strict";Nl=require("node:child_process"),kn=g(require("node:fs")),dr=g(require("node:os"));Wm();Hn();Ys();Gs();_a();Te();Cm();Om();np();$t();x();cg();Nt();rs();Ma();ss();ot();Pa();Nr();Gt();ts();ug();hg();fo();tt();Ct();Ag();wg();Ga();ds();gs();Kg();Jh();Ya();ey();ny();Xr();iy();zs();Vn();vt();jn();ly();uy();Ps();hr();by();wi();at();av={},K_="claude",q_="codex",J_="cursor",Y_="agy",ky=3e4,X_=3e4,Ey=new Map,Ly=new Map,xy=new Map,Il=e=>{let t=e?.trim()??"";return t.length>0?t:ry()},C=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ry=e=>{let t=L(e);if(!kn.default.existsSync(t.configPath))return null;try{let r=JSON.parse(kn.default.readFileSync(t.configPath,"utf8"));if(!C(r))throw new Error("Config must be a JSON object.");let n=typeof r.wsUrl=="string"?r.wsUrl.trim():"",o=yo({installDir:t.installDir,configWsUrl:n}),s=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),i=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??K_,a=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??q_,c=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??J_,d=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??Y_,m=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",h=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return m.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:h,wsUrl:o,workspace:s,claudeCommand:i,codexCommand:a,cursorCommand:c,antigravityCommand:d,pairingToken:m,writerExecutionBackend:K(r.writerExecutionBackend),layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},I=(e,t,r)=>{e.readyState===Vr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(wt(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),qa(r,"out",t)))},Ol=e=>e,Z_=e=>{if(!kn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(kn.default.readFileSync(e.harnessManifestPath,"utf8"));if(C(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Ts=(e,t)=>{let r=Z_(t);r!==null&&I(e,{type:"harness.manifest.report",payload:{hostname:dr.default.hostname(),manifest:r}})},Q_=async(e,t,r,n,o,s,i=!1,a,c,d,m)=>{if(!H(t)){I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=as(t)&&!qp(t);if(h){try{await Ke(e.layout.installDir,t)}catch(b){let w=b instanceof Error?b.message:String(b);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}is(t)}else if(!as(t))try{await Ke(e.layout.installDir,t)}catch(b){let w=b instanceof Error?b.message:String(b);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let _=i&&Kp(t)&&Jp(t)?"continue":"first",A=r;if(i&&_==="first"&&typeof c=="string"&&c.length>0){let b=Qo(e.layout,c);if(b!==null){let{buildContinuationPromptWithContext:w}=await Promise.resolve().then(()=>(_y(),wy));A=w({priorPrompt:b.prompt,priorOutput:b.resultOutput??"",userMessage:r})}}let f=Il(d);ke({projectFolderPath:f});let l=await mn({layout:e.layout,query:A,limit:5,projectFolderPath:f}),S=Xh(e.layout,f),y=`${Qh(S)}${tf(l)}${A}`,p=m?.trim()??(s!==void 0&&f.trim().length>0?dy():void 0);if(s!==void 0&&p!==void 0&&p.length>0&&f.trim().length>0){Bn({reportKey:p,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let b=await Sy({config:e,writerAgent:t,wrappedPrompt:y,reportKey:p,agentRunId:s});if(b.estimateSeconds!==null){let w=`${vn}
${b.estimateSeconds}
`;ze(s)?I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:w},requestId:n}):At(s,w)}y=ay(y,b),y=yc(y,{agentRunId:s,reportKey:p,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}Fa(e,t,y,n,Ol(o),s,{sessionTurn:_},a,f,p),h&&s!==void 0&&I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Xp(t)},requestId:n})},ev=async(e,t,r,n,o)=>{let s=(i,a)=>{I(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await Zp({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:He({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:m=>{i+=m,I(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:m},requestId:n})}}),c=H(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?on(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},tv=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=Mt(t,r,He({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,Nl.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),rv=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(I(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!H(o)){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let i=await(async()=>{try{await Ke(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return tv(e,o,s)})();I(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Ts(n,e.layout)},nv=e=>{let t=1e3*2**e;return Math.min(X_,t)},ov=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,dg().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,S="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,fg({layout:e.layout,remoteBundleVersion:l,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=se(e.layout);l!==null&&me(l,ue)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),A())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let l=t.socket;t.socket=void 0,t.wsConnected=!1,l.removeAllListeners("open"),l.removeAllListeners("message"),l.removeAllListeners("close"),l.on("error",()=>{}),(l.readyState===Vr.OPEN||l.readyState===Vr.CONNECTING)&&l.close()},d=()=>{i(),t.localHealthTimer=setInterval(o,ky)},m=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=nv(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},l)},h=l=>{s();let S=()=>{let y=Cc(e.layout.installDir),p=oe();I(l,{type:"agent.heartbeat",payload:{hostname:dr.default.hostname(),macOsUsername:dr.default.userInfo().username,wakeError:t.wakeError,wakePort:p,...e.email!==null?{email:e.email}:{},installBundleVersion:y}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,ky)},_=(l,S)=>{if(typeof l.type!="string")return;wt(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"}),qa(e.layout,"in",l);let y=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&C(l.payload)){let p=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",b=typeof l.payload.origin=="string"?l.payload.origin:"",w=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",W=typeof l.payload.challenge=="string"?l.payload.challenge:"",E=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!Cg({serverPublicKey:p,origin:b,devicePublicKey:w,challenge:W,serverAttestation:E})){t.wakeError="Server attestation verification failed",wt(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&C(l.payload)){let p=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";wt(e.layout,{direction:"local",type:"writer.ensure",summary:p,action:"ensure-writer"}),sy({layout:e.layout,writerAgent:p,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{I(S,{type:"writer.status",payload:b},e.layout)})}if(l.type==="install.bundle.update"&&C(l.payload)){let p=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";p.length>0&&n(p,"install.bundle.update")}if(l.type==="system.ack"){Ci(e.layout,{wsUrl:e.wsUrl});let p=C(l.payload)?l.payload:null,b=yg(p);b!==null&&n(b)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&C(l.payload)&&Sg(l.payload),l.type==="automations.run"&&C(l.payload)&&bg(l.payload),l.type==="terminal.stream.accepted"&&C(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"";if(p.length>0){let b=kp(p);for(let w of b)I(S,{type:"terminal.stream.chunk",payload:{runId:p,chunk:w},requestId:y})}}if(l.type==="agent.agentRun.list"&&I(S,{type:"dashboard.agentRun.list.result",payload:{runs:hp(e.layout)},requestId:y}),l.type==="agent.agentRun.get"&&C(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"",b=p.length>0?Qo(e.layout,p):null;I(S,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:y})}if(l.type==="command.claude.run"&&C(l.payload)){let p=l.payload.prompt,b=typeof l.payload.writerAgent=="string"&&H(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",w=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,W=l.payload.sessionContinuation===!0,E=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,R=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,$=Il(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),he=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof p=="string"&&p.trim().length>0&&(console.log(`[agent-witch] Running ${b} task (${W?"continue":"first"})\u2026`),w!==void 0&&R!==void 0&&Ey.set(w,R),w!==void 0&&(Ly.set(w,$),xy.set(w,p.trim()),ke({projectFolderPath:$})),Q_(e,b,p.trim(),y,S,w,W,R,E,$,he))}if(l.type==="shell.session.open"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:120,w=typeof l.payload.rows=="number"?l.payload.rows:32;p.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Mp({shellSessionId:p,cwd:e.workspace,cols:b,rows:w,send:W=>{I(S,W)},requestId:y}))}if(l.type==="shell.session.close"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";p.length>0&&rn(p,b=>{I(S,b)},y)}if(l.type==="shell.input"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.data=="string"?l.payload.data:"";p.length>0&&b.length>0&&Ip(p,b)}if(l.type==="shell.resize"&&C(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",b=typeof l.payload.cols=="number"?l.payload.cols:0,w=typeof l.payload.rows=="number"?l.payload.rows:0;p.length>0&&b>0&&w>0&&Op(p,b,w)}if(l.type==="command.writer.session.end"&&C(l.payload)){let p=l.payload.writerAgent;typeof p=="string"&&H(p)&&Yp(p)}if(l.type==="command.writer.session.start"&&C(l.payload)){let p=l.payload.writerAgent,b=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof p=="string"&&H(p)&&b.length>0&&(console.log(`[agent-witch] Starting ${p} session\u2026`),ev(e,p,b,y,S))}if(l.type==="command.claude.stop"&&C(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";p.length>0&&(console.log(`[agent-witch] Stopping run ${p}\u2026`),lg(e,Ol(S),p,y))}if(l.type==="command.claude.input_respond"&&C(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",b=typeof l.payload.response=="string"?l.payload.response.trim():"",w=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",W=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",E=typeof l.payload.question=="string"?l.payload.question:"";p.length>0&&b.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),ig(e,{agentRunId:p,originalPrompt:w,partialOutput:W,question:E,response:b,shellSessionId:Ey.get(p)},y,Ol(S)))}if(l.type==="dispatch.approval.required"&&C(l.payload)){let p=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",b=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${p}: ${b}`),process.platform==="darwin"&&(0,Nl.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${p.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&C(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),rv(e,l.payload,y,S)),l.type==="harness.export.request"&&C(l.payload)){let p=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",b=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,w=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(W=>typeof W=="string"):[];p.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:W}=await Promise.resolve().then(()=>(Wy(),vy)),E=W(w,e.email);I(S,{type:"harness.export.result",payload:{success:E.length>0,borrowerUserId:p,...b!==void 0?{targetDeviceId:b}:{},sets:E,errorMessage:E.length>0?void 0:"No readable harness sets were found on this machine."},requestId:y})})()}if(l.type==="harness.manifest.request"&&Ts(S,e.layout),l.type==="command.claude.result"&&C(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,b=Il(p!==void 0?Ly.get(p):void 0),w=p!==void 0?xy.get(p)??"":"";ef({layout:e.layout,text:l.payload.output,source:p??"command.claude.result",projectFolderPath:b}),w.trim().length>0&&Zh({layout:e.layout,projectFolderPath:b,entry:{id:`${Date.now()}-${p??"run"}`,...p!==void 0?{agentRunId:p}:{},prompt:w,output:l.payload.output,createdAt:new Date().toISOString()}})}},A=()=>{if(t.stopped)return;a(),c();let l=new Vr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Ci(e.layout,{wsUrl:e.wsUrl}),rg(Me({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),ng(e.layout);let S=Y(e.wsUrl)??"http://localhost:3000",y=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),p=Pg({layout:e.layout,origin:S,...y!==void 0&&y.length>0?{claimToken:y}:{}});I(l,{type:"agent.register",payload:{role:"agent",hostname:dr.default.hostname(),macOsUsername:dr.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...p}},e.layout),Ts(l,e.layout),ag(e,l),h(l)}),l.on("message",S=>{let y=typeof S=="string"?S:S.toString("utf8");try{let p=JSON.parse(y);if(!C(p))return;_(p,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",(S,y)=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1;let p=typeof y=="string"?y:y.toString("utf8");nr(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:p}),console.log("[agent-witch] Disconnected from server."),m()}),l.on("error",S=>{t.wakeError=S.message,nr(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})};return{connect:A,startLocalHealthCheck:d,stop:()=>{t.stopped=!0,s(),i(),a(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:qh(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Ts(l,e.layout),{ok:!0})}}},sv=async()=>{let e=()=>{let r=Zl();if(r.length===0){let n=Ry(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=Ry(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},Py=async()=>{xt("agent-witch");let e=v();if(!xm().ok){let{kickstartAgentWitchClientLaunchAgents:h}=await Promise.resolve().then(()=>(ei(),Qs));await h(e),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`),process.exit(0)}Im(e);let r=Pm({installDir:e});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),Kn();let n=await sv(),o=n[0];o!==void 0&&zg(o.layout);for(let h of n){let _=Y(h.wsUrl)??xr;Tc(h.layout.installDir,_)}let s=n.map(h=>ov(h)),i=s[0];i===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),wa(),process.exit(0));let a=()=>{n.forEach((h,_)=>{let A=se(h.layout);A!==null&&!me(A,ue)||s[_]?.reviveWebSocket()})},c=()=>{},d=await rp({reconnectWebSockets:a,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),c()}});Kh({layout:n[0].layout,controllers:{getStatus:i.getStatus,reviveWebSocket:a,reportHarnessManifestIfConnected:i.reportHarnessManifestIfConnected}});for(let h of s)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Bridging ${s.length} account profile(s) in one process.`);let m=Mn(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Nn(),c()});c=()=>{m(),d.stop(),wa(),console.log("[agent-witch] Shutting down.");for(let h of s)h.stop();process.exit(0)},process.on("SIGINT",()=>{c()}),process.on("SIGTERM",()=>{c()})},iv=Py;if(Pt(av.url)&&!ce()){let e=process.argv.indexOf("report");e>=0&&process.exit(Gn(process.argv.slice(e))),Py()}});Hn();zs();Vn();var kc="20.x",Ec="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var cA=e=>[`Node.js ${kc} or newer is required (found ${e}).`,Ec].join(" "),Lc=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${cA(process.version)}
`),process.exit(1))};var uv={},lv=async()=>{xt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ot(),Yn)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},cv=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Yi(),Su)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},dv=async()=>{if(!Pt(uv.url))return;Lc();let e=process.argv.indexOf("report");e>=0&&process.exit(Gn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await lv();return}if(t==="wake"){await cv();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(Ty(),Cy));await r()};dv();
