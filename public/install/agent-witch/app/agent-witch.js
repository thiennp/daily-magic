#!/usr/bin/env node
"use strict";var gA=Object.create;var Zs=Object.defineProperty;var fA=Object.getOwnPropertyDescriptor;var hA=Object.getOwnPropertyNames;var yA=Object.getPrototypeOf,AA=Object.prototype.hasOwnProperty;var d=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var q=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Ce=(e,t)=>{for(var r in t)Zs(e,r,{get:t[r],enumerable:!0})},SA=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of hA(t))!AA.call(e,o)&&o!==r&&Zs(e,o,{get:()=>t[o],enumerable:!(n=fA(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?gA(yA(e)):{},SA(t||!e||!e.__esModule?Zs(r,"default",{value:e,enumerable:!0}):r,e));var Yl,Xl,Qs=d(()=>{"use strict";Yl=new Set(["","loginwindow","_mbsetupuser","root"]),Xl=5e3});var Zl,On,ei=d(()=>{"use strict";Zl=require("node:child_process"),On=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Zl.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var re,Rt=d(()=>{"use strict";re=()=>!0});var Nn,Ql,_A,Mn,ti=d(()=>{"use strict";Nn=g(require("node:path")),Ql=require("node:url");Rt();_A={},Mn=()=>{if(re()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Nn.default.dirname(Nn.default.resolve(e))}return Nn.default.dirname((0,Ql.fileURLToPath)(_A.url))}});var Se,ec,xt=d(()=>{"use strict";Se="agent-witch.js",ec="command"});var ni,sc,E,bA,ri,oi,WA,wA,vA,EA,tt,kA,tc,rc,nc,si,_e,Hn,Dn,oc,Pt,Ct,w,ic,yr,ac,lc,Fn,cc,dc,ne,ii,LA,RA,Ie,xA,L,R=d(()=>{"use strict";ni=g(require("node:fs")),sc=g(require("node:os")),E=g(require("node:path"));ti();xt();bA=Mn(),ri=".agent-witch",oi=".local-agent-witch",WA=47892,wA=47893,vA="com.agent-witch",EA="com.local-agent-witch",tt="profiles",kA="active-profile.json",tc="harness",rc="sets",nc="manifest.json",si="projects",_e="logs",Hn="agent-witch.log",Dn="agent-witch.error.log",oc="reports",Pt="device-keypair.json",Ct=e=>e.trim().toLowerCase(),w=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return E.default.resolve(e);let t=E.default.resolve(bA),r=E.default.basename(t),n=E.default.basename(E.default.dirname(t));return r==="app"&&(n===ri||n===oi)?E.default.dirname(t):r===ri||r===oi?t:E.default.join(sc.default.homedir(),ri)},ic=(e=w())=>E.default.join(e,"app"),yr=(e=w())=>E.default.join(ic(e),Se),ac=(e,t,r)=>t!==null?E.default.join(e,tt,t,r):E.default.join(e,r),lc=e=>ac(e.installDir,e.profileEmail,si),Fn=e=>ac(e.installDir,e.profileEmail,_e),cc=e=>e.profileEmail!==null?E.default.join(e.installDir,tt,e.profileEmail,Pt):E.default.join(e.installDir,Pt),dc=e=>E.default.basename(e)===oi,ne=(e=w())=>dc(e)?EA:vA,ii=(e=w())=>dc(e)?wA:WA,LA=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Ct(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Ct(t):null},RA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ie=(e=w())=>{let t=E.default.join(e,kA);if(!ni.default.existsSync(t))return null;try{let r=JSON.parse(ni.default.readFileSync(t,"utf8"));if(RA(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Ct(r.email)}catch{return null}return null},xA=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Ct(r):null}let t=LA();return t!==null?t:Ie()},L=e=>{let t=w(),r=ic(t),n=yr(t),o=xA(e);if(o!==null){let W=E.default.join(t,tt,o),A=E.default.join(W,tc),f=E.default.join(W,si),l=E.default.join(W,_e),S=E.default.join(W,oc),y=E.default.join(W,Pt),p=E.default.join(W,_e,Hn),_=E.default.join(W,_e,Dn);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:f,logsDir:l,mainLogPath:p,errorLogPath:_,reportsDir:S,deviceKeypairPath:y,configPath:E.default.join(W,"config.json"),harnessRootDir:A,harnessManifestPath:E.default.join(A,nc),harnessSetsDir:E.default.join(A,rc)}}let s=E.default.join(t,tc),i=E.default.join(t,si),a=E.default.join(t,_e),c=E.default.join(t,oc),u=E.default.join(t,Pt),m=E.default.join(t,_e,Hn),h=E.default.join(t,_e,Dn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:m,errorLogPath:h,reportsDir:c,deviceKeypairPath:u,configPath:E.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:E.default.join(s,nc),harnessSetsDir:E.default.join(s,rc)}}});var Un,ai,uc,U,mc,Oe=d(()=>{"use strict";Un=g(require("node:fs")),ai=g(require("node:path"));R();uc=e=>{let t=ai.default.join(e,tt);return Un.default.existsSync(t)?Un.default.readdirSync(t).filter(r=>Un.default.statSync(ai.default.join(t,r)).isDirectory()).map(r=>Ct(r)).toSorted():[]},U=(e=w())=>{let t=ne(e);return[{profileEmail:uc(e)[0]??null,launchAgentLabel:t}]},mc=(e=w())=>uc(e)});var jn,Tt,pc,li,gc,PA,fc,CA,TA,Ar,IA,hc,$n=d(()=>{"use strict";jn=require("node:child_process"),Tt=g(require("node:fs")),pc=g(require("node:os")),li=g(require("node:path")),gc=require("node:util");Oe();R();PA=(0,gc.promisify)(jn.execFile),fc=()=>li.default.join(pc.default.homedir(),"Library","LaunchAgents"),CA=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await PA("launchctl",["bootout",r]).catch(()=>{})},TA=e=>{let t=li.default.join(fc(),`${e}.plist`);Tt.default.existsSync(t)&&Tt.default.unlinkSync(t)},Ar=(e=w())=>{let t=ne(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of U(e))r.add(o.launchAgentLabel);let n=fc();if(Tt.default.existsSync(n))for(let o of Tt.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},IA=e=>{(0,jn.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},hc=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=w();if(!Tt.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Ar(e);for(let r of t)await CA(r),TA(r);return IA(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Bn,ci=d(()=>{"use strict";ei();$n();R();Bn=(e=w())=>{for(let t of Ar(e))On(t)}});var yc,OA,NA,Ac,Sc=d(()=>{"use strict";yc=require("node:child_process");Qs();OA=e=>e.trim().toLowerCase(),NA=e=>e==null?!1:!Yl.has(OA(e)),Ac=()=>{if(process.platform!=="darwin")return null;try{let t=(0,yc.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return NA(t)?t:null}catch{return null}}});var bc,_c,be,Sr=d(()=>{"use strict";bc=g(require("node:os"));Sc();_c=e=>e.trim().toLowerCase(),be=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Ac():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??bc.default.userInfo().username;return _c(r)===_c(n)}});var rt,_r,Gn=d(()=>{"use strict";Qs();ci();Sr();rt=e=>{be()||(Bn(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},_r=(e,t=Xl)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{be()||e()},t);return()=>{clearInterval(r)}}});var Wc,wc,vc,Vn,qn,Ec,kc,It=d(()=>{"use strict";Wc=".agent-witch",wc="memory",vc="project.json",Vn="chunks.ndjson",qn="runs.ndjson",Ec="reports",kc=".json"});var Lc,zn,di=d(()=>{"use strict";Lc=g(require("node:path"));It();zn=(e,t)=>Lc.default.join(e.trim(),`${t.trim()}${kc}`)});var nt,Rc,xc=d(()=>{"use strict";xt();nt=e=>`'${e.replace(/'/g,"'\\''")}'`,Rc=e=>{let t=`${e.installDir.trim()}/${"app"}/${Se}`,r=[nt("node"),nt(t),"report","write","--key",nt(e.reportKey.trim()),"--agent-run-id",nt(e.agentRunId.trim()),"--status",nt(e.status),"--summary",nt(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",nt(e.details.trim())),r.join(" ")}});var ue,Pc,MA,Cc,Kn=d(()=>{"use strict";di();xc();ue={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},Pc=e=>e===ue.COMPLETED||e===ue.FAILED,MA=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Cc=(e,t)=>{let r=zn(t.reportsDir,t.reportKey),n=Rc({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:ue.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${MA({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var br,Ic,Tc,Oc,HA,Jn,DA,FA,Wr,Yn,Nc,Mc,wr=d(()=>{"use strict";br=g(require("node:fs")),Ic=g(require("node:path"));Kn();di();R();Tc=50,Oc=e=>{let t=L(),r=zn(t.reportsDir,e);return br.default.mkdirSync(Ic.default.dirname(r),{recursive:!0}),r},HA=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Jn=e=>{let t=Oc(e);if(!br.default.existsSync(t))return null;try{let r=JSON.parse(br.default.readFileSync(t,"utf8"));return HA(r)?r:null}catch{return null}},DA=(e,t)=>{let r=[...e,t];return r.length>Tc?r.slice(r.length-Tc):r},FA=e=>{let t=Oc(e.reportKey);br.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Wr=e=>{let t=Jn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:DA(t?.history??[],n)};return FA(o),o},Yn=e=>{let t=Jn(e.reportKey);return t!==null?t:Wr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:ue.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Nc=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},Mc=e=>{if(e===null||!Pc(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===ue.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var UA,jA,vr,Hc,Xn,ui=d(()=>{"use strict";Kn();wr();UA=new Set(Object.values(ue)),jA=e=>UA.has(e),vr=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},Hc=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Xn=e=>{if(e[0]!=="write")return Hc(),1;let r=vr(e,"--key"),n=vr(e,"--agent-run-id"),o=vr(e,"--status"),s=vr(e,"--summary"),i=vr(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!jA(o)?(Hc(),1):(Wr({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var mi,Dc,ot,Zn=d(()=>{"use strict";mi=g(require("node:path")),Dc=require("node:url");Rt();ot=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=mi.default.resolve(t);return re()?r===mi.default.resolve(__filename):r===(0,Dc.fileURLToPath)(e)}});var $c=d(()=>{"use strict"});var Er,pi,GA,VA,Gc,z,gi,Vc,qc,Qn,st=d(()=>{"use strict";Er=g(require("node:fs")),pi=g(require("node:path"));$c();R();GA="install-version.json",VA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gc=(e=w())=>pi.default.join(e,GA),z=(e=w())=>{let t=Gc(e);if(!Er.default.existsSync(t))return null;try{let r=JSON.parse(Er.default.readFileSync(t,"utf8"));return!VA(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},gi=(e,t=w())=>{let r=Gc(t);Er.default.mkdirSync(pi.default.dirname(r),{recursive:!0}),Er.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Vc=(e=w())=>z(e)?.bundleVersion??"114",qc=(e,t)=>{let r=z(e);if(r!==null)return r;let n={bundleVersion:"114",appOrigin:t,updatedAt:new Date().toISOString()};return gi(n,e),n},Qn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var qA,eo,fi=d(()=>{"use strict";ei();$n();Oe();R();qA=(e=w())=>{let t=new Set(U(e).map(r=>r.launchAgentLabel));return Ar(e).filter(r=>!t.has(r))},eo=(e=w())=>{for(let t of qA(e))On(t)}});var Z,Ot=d(()=>{"use strict";Z=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var zc,it,hi,zA,KA,Kc,Nt,to,yi=d(()=>{"use strict";zc=require("node:crypto"),it=g(require("node:fs")),hi=g(require("node:path"));R();zA="self-update-log.ndjson",KA=100,Kc=(e=w())=>{let t=L(),r=t.installDir===e?t.logsDir:Fn({installDir:e,profileEmail:t.profileEmail});return hi.default.join(r,zA)},Nt=(e,t=w())=>{let r={id:(0,zc.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Kc(t);it.default.mkdirSync(hi.default.dirname(n),{recursive:!0});let o=it.default.existsSync(n)?it.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-KA+1)),JSON.stringify(r)];return it.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},to=(e=20,t=w())=>{let r=Kc(t);if(!it.default.existsSync(r))return[];let n=it.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Jc,Yc,Xc=d(()=>{"use strict";Jc="deps.tar.gz",Yc="deps"});var Qc,Ne,at,JA,ed,td,rd=d(()=>{"use strict";Qc=require("node:child_process"),Ne=g(require("node:fs")),at=g(require("node:path"));Xc();JA=e=>at.default.join(e,"app",Yc),ed=e=>{let t=at.default.join(e,"app"),r=at.default.join(t,Jc);Ne.default.existsSync(r)&&(Ne.default.rmSync(JA(e),{recursive:!0,force:!0}),Ne.default.mkdirSync(t,{recursive:!0}),(0,Qc.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Ne.default.rmSync(r,{force:!0}))},td=e=>{Ne.default.rmSync(at.default.join(e,"node_modules"),{recursive:!0,force:!0}),Ne.default.rmSync(at.default.join(e,"package.json"),{force:!0}),Ne.default.rmSync(at.default.join(e,"package-lock.json"),{force:!0})}});var od,sd,id,ad,ld,kr,YA,XA,ZA,nd,oe,Mt=d(()=>{"use strict";od=require("node:child_process"),sd=g(require("node:fs")),id=g(require("node:os")),ad=g(require("node:path")),ld=require("node:util");Sr();kr=(0,ld.promisify)(od.execFile),YA=e=>ad.default.join(id.default.homedir(),"Library","LaunchAgents",`${e}.plist`),XA=async e=>{try{return await kr("launchctl",["print",e]),!0}catch{return!1}},ZA=async(e,t,r)=>{await XA(t)&&await kr("launchctl",["bootout",t]).catch(()=>{}),await kr("launchctl",["bootstrap",e,r]),await kr("launchctl",["enable",t])},nd=async e=>{try{return await kr("launchctl",["kickstart","-k",e]),!0}catch{return!1}},oe=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!be())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await nd(n))return{ok:!0};let o=YA(e);if(!sd.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await ZA(r,n,o),await nd(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var Ai={};Ce(Ai,{kickstartAgentWitchClientLaunchAgents:()=>QA});var QA,Si=d(()=>{"use strict";Mt();Oe();R();QA=async(e=w())=>{let t=[];for(let r of U(e))(await oe(r.launchAgentLabel)).ok&&t.push(r.launchAgentLabel);return t}});var no={};Ce(no,{buildAgentWitchSelfUpdateStatus:()=>Wi,fetchAgentWitchRemoteInstallBundleVersion:()=>_i,runAgentWitchSelfUpdate:()=>bi});var Me,ro,cd,eS,dd,_i,tS,rS,Lr,bi,Wi,Ht=d(()=>{"use strict";Me=g(require("node:fs")),ro=g(require("node:path"));st();fi();Ot();R();xt();yi();rd();cd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eS=e=>{let t=Ie(e),r=t===null?L():L(t);if(!Me.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Me.default.readFileSync(r.configPath,"utf8"));return!cd(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},dd=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!cd(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},_i=async e=>(await dd(e))?.bundleVersion??null,tS=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=ro.default.join(t,r);Me.default.mkdirSync(ro.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());Me.default.writeFileSync(o,s),r.endsWith(".js")&&Me.default.chmodSync(o,493)},rS=async()=>{eo();let{kickstartAgentWitchClientLaunchAgents:e}=await Promise.resolve().then(()=>(Si(),Ai));await e()},Lr=(e,t)=>({localBundleVersion:t,...e}),bi=async e=>{let t=w(),r=z(t),n=r?.bundleVersion??null,o=eS(t),s=o===null?r?.appOrigin??null:Z(o);if(s===null){let c=Lr({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return Nt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let i=await dd(s);if(i===null){let c=Lr({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return Nt({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||Qn(n,i.bundleVersion))){let c=Lr({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:i.bundleVersion},n);return Nt({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),c}try{for(let m of i.scripts)await tS(s,t,m);let c=ro.default.join(t,Se);Me.default.existsSync(c)&&Me.default.rmSync(c,{force:!0}),ed(t),td(t),gi({bundleVersion:i.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await rS();let u=Lr({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${i.bundleVersion}.`,remoteBundleVersion:i.bundleVersion},i.bundleVersion);return Nt({event:"update_applied",ok:!0,message:u.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),u}catch(c){let u=c instanceof Error?c.message:"Agent Witch self-update failed.",m=Lr({ok:!1,updated:!1,message:u,remoteBundleVersion:i.bundleVersion},n);return Nt({event:"update_failed",ok:!1,message:u,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),m}},Wi=()=>{let e=w();return{local:z(e),logs:to(20,e)}}});var oo,Rr,ud,wi,xr,vi=d(()=>{"use strict";oo=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},Rr=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=oo(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},ud=e=>e>=1&&e<=5,wi=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return oo(t,"UTC")},xr=e=>{let t=e.from??new Date,r=oo(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Rr(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Rr(r,e.timeZone,n,0),s=oo(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?Rr(wi(r),e.timeZone,n,0):o;if(!i&&ud(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=wi(a),ud(a.weekday))return Rr(a,e.timeZone,n,0);return Rr(wi(r),e.timeZone,n,0)}});var nS,so,Ei=d(()=>{"use strict";nS=e=>e==="hourly"||e==="daily"||e==="weekdays",so=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!nS(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Pr,io,md,pd,ki,He,gd,fd,hd,yd,Cr=d(()=>{"use strict";Pr=g(require("node:fs")),io=g(require("node:path"));Ei();md="automations.json",pd=e=>e.profileEmail!==null?io.default.join(e.installDir,"profiles",e.profileEmail,md):io.default.join(e.installDir,md),ki=()=>({version:1,automations:[]}),He=e=>{let t=pd(e);if(!Pr.default.existsSync(t))return ki();try{let r=JSON.parse(Pr.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?ki():{version:1,automations:r.automations.flatMap(o=>{let s=so(o);return s!==null?[s]:[]})}}catch{return ki()}},gd=(e,t)=>{let r=pd(e);Pr.default.mkdirSync(io.default.dirname(r),{recursive:!0}),Pr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},fd=(e,t)=>{gd(e,{version:1,automations:t})},hd=(e,t)=>{let n=He(e).automations.filter(o=>o.id!==t.id);gd(e,{version:1,automations:[...n,t]})},yd=(e,t)=>He(e).automations.find(r=>r.id===t)??null});var oS,sS,ao,Li=d(()=>{"use strict";vi();Ei();Cr();R();oS=e=>e!==void 0&&e.trim().length>0?L(e.trim()):L(),sS=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??xr({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??xr({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},ao=e=>{let t=oS(e.profileEmail),r=He(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=so(s);return i!==null?[sS(i,n.get(i.id))]:[]});return fd(t,o),{ok:!0,writtenCount:o.length}}});var Ad,Sd=d(()=>{"use strict";Ad="x-agent-witch-token"});var De,lo,_d,co,iS,bd,Wd,Dt=d(()=>{"use strict";Sd();Ot();De=e=>{let t=Z(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},lo=e=>({[Ad]:e,"Content-Type":"application/json"}),_d=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:lo(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let n=await r.json();if(typeof n!="object"||n===null)return null;let o=n.run;if(typeof o!="object"||o===null)return null;let s=o,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},co=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:lo(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},iS=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let n of t.projects){if(typeof n!="object"||n===null)continue;let o=n,s=typeof o.id=="string"?o.id.trim():"",i=typeof o.name=="string"?o.name.trim():"",a=typeof o.folderPath=="string"?o.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},bd=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:lo(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return iS(r)}catch{return null}},Wd=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:lo(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var uo,Tr,H,Fe,wd,Ft,lt=d(()=>{"use strict";uo={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Tr=e=>e.trim().length>0,H=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Fe=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:Tr(t)?t.trim():uo.claudeCommand,codexCommand:Tr(r)?r.trim():uo.codexCommand,cursorCommand:Tr(n)?n.trim():uo.cursorCommand,antigravityCommand:Tr(o)?o.trim():uo.antigravityCommand}},wd=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},Ft=(e,t,r,n)=>{let o=t.trim();if(!Tr(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var Ri,aS,lS,mo,xi=d(()=>{"use strict";Ri=e=>e.toLocaleString("en-US"),aS=e=>e<.01?e.toFixed(4):e.toFixed(3),lS=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${aS(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Ri(e.inputTokens)} in / ${Ri(e.outputTokens)} out (${Ri(e.totalTokens)} total)`,t].join(`
`)},mo=(e,t)=>{if(t===void 0)return e;let r=lS(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let n=e.trimEnd();return n.length>0?`${n}
${r}`:r}});var po,Pi=d(()=>{"use strict";po={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Ut,Ci,Ti,Ii=d(()=>{"use strict";Pi();Ut="auto",Ci=e=>({value:Ut,label:`Auto (${po[e]})`}),Ti={anthropic:[Ci("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Ci("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Ci("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var jt,go,vd,Ir=d(()=>{"use strict";Pi();Ii();jt=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Ut))return t},go=(e,t)=>{let r=jt(t);return r===void 0?po[e]:r},vd=e=>{let t=jt(e);return t===void 0?Ut:t}});var fo,cS,dS,ho,Ed=d(()=>{"use strict";fo={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},cS=e=>{let t=fo[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?fo["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?fo["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?fo["gemini-2.0-flash"]:null},dS=(e,t,r)=>{let n=cS(e);if(n===null)return null;let o=t/1e6*n.inputUsd,s=r/1e6*n.outputUsd;return o+s},ho=e=>{let t=dS(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var $t,uS,mS,pS,yo,kd=d(()=>{"use strict";Ed();$t=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),uS=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=$t(r.input_tokens),o=$t(r.output_tokens);return n===0&&o===0?null:ho({provider:"anthropic",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},mS=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let n=$t(r.prompt_tokens),o=$t(r.completion_tokens);return n===0&&o===0?null:ho({provider:"openai",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},pS=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let n=$t(r.promptTokenCount),o=$t(r.candidatesTokenCount);return n===0&&o===0?null:ho({provider:"google",model:t,inputTokens:n,outputTokens:o,totalTokens:n+o})},yo=(e,t,r)=>e==="anthropic"?uS(t,r):e==="openai"?mS(t,r):pS(t,r)});var gS,fS,hS,yS,AS,SS,Ld,Rd=d(()=>{"use strict";Ir();kd();gS=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let n=r;return n.type==="text"&&typeof n.text=="string"?n.text:""}).join(""):""},fS=async e=>{let t=go("anthropic",e.secret.model),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Anthropic API error (${String(r.status)})`};let o=gS(n);o.length>0&&e.onChunk?.(o);let s=yo("anthropic",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},hS=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.message;return typeof n?.content=="string"?n.content:""},yS=async e=>{let t=go("openai",e.secret.model),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),n=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`OpenAI API error (${String(r.status)})`};let o=hS(n);o.length>0&&e.onChunk?.(o);let s=yo("openai",n,t);return{exitCode:0,output:o,...s!==null?{llmUsage:s}:{}}},AS=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let n=r.content?.parts;return Array.isArray(n)?n.map(o=>{if(typeof o!="object"||o===null)return"";let s=o.text;return typeof s=="string"?s:""}).join(""):""},SS=async e=>{let t=go("google",e.secret.model),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,n=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),o=await n.json().catch(()=>null);if(!n.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Google API error (${String(n.status)})`};let s=AS(o);s.length>0&&e.onChunk?.(s);let i=yo("google",o,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Ld=async e=>{try{return e.provider==="anthropic"?await fS(e):e.provider==="openai"?await yS(e):await SS(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ue,Or=d(()=>{"use strict";Ue=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var xd,_S,Ao,Oi=d(()=>{"use strict";xd=g(require("node:path")),_S="writer-api-secrets.json",Ao=e=>xd.default.join(e,_S)});var Ni,Pd,bS,ct,je,dt=d(()=>{"use strict";Ni=g(require("node:fs"));Ir();Oi();Pd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bS=e=>{if(!Pd(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,n=jt(r);return{apiKey:t,...n!==void 0?{model:n}:{}}},ct=e=>{let t=Ao(e);if(!Ni.default.existsSync(t))return{};try{let r=JSON.parse(Ni.default.readFileSync(t,"utf8"));if(!Pd(r))return{};let n={},o=["anthropic","openai","google"];for(let s of o){let i=bS(r[s]);i!==null&&(n[s]=i)}return n}catch{return{}}},je=(e,t)=>ct(e)[t]??null});var K,ut=d(()=>{"use strict";K=e=>e==="api"?"api":"cli"});var Cd,se,So,$e=d(()=>{"use strict";Cd=g(require("node:path"));Or();dt();ut();se=e=>Cd.default.dirname(e),So=(e,t)=>{if(K(e.writerExecutionBackend)!=="api")return!1;let r=Ue(t);if(r===null)return!1;let n=se(e.layout.configPath),o=je(n,r);return o!==null&&o.apiKey.length>0}});var _o,Mi=d(()=>{"use strict";xi();Rd();Or();dt();$e();_o=async(e,t,r,n)=>{let o=r.trim();if(o.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ue(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=se(e.layout.configPath),a=je(i,s);if(a===null){let u=Object.keys(ct(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${u.length===0?"writer-api-secrets.json is empty":`have keys for: ${u.join(", ")}`}).`}}let c=await Ld({provider:s,secret:a,prompt:o,onChunk:n});return{exitCode:c.exitCode,output:mo(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Td,Bt,bo=d(()=>{"use strict";Td=require("node:child_process");lt();Mi();$e();Bt=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(So(e,t)){_o(e,t,r).then(n);return}let o=Ft(t,r,Fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Td.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[];s.stdout?.on("data",a=>{i.push(a.toString("utf8"))}),s.stderr?.on("data",a=>{i.push(a.toString("utf8"))}),s.on("close",a=>{n({exitCode:a??-1,output:i.join("")})}),s.on("error",a=>{n({exitCode:-1,output:a.message})})})});var mt,Nr,Id=d(()=>{"use strict";mt="https://www.agentwitch.com",Nr="wss://www.agentwitch.com/api/agent-witch/ws"});var Hi,Wo,Od=d(()=>{"use strict";Hi="local.agentwitch.com",Wo=`http://${Hi}:43347`});var Di=d(()=>{"use strict";Id();Od()});var wo=d(()=>{"use strict";Di()});var vo,Nd,Fi=d(()=>{"use strict";vo=".agent-witch",Nd=".local-agent-witch"});var Md,vS,Ui,Eo,ji=d(()=>{"use strict";Md=g(require("node:path"));wo();Fi();vS="ws://localhost:3000/api/agent-witch/ws",Ui=e=>e.replace(/\/$/,""),Eo=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Ui(t);let r=Md.default.basename(e.installDir);if(r===vo)return Nr;let n=e.configWsUrl?.trim()??"";return r===Nd?n.length>0?Ui(n):vS:n.length>0?Ui(n):Nr}});var $i,ES,kS,LS,RS,xS,D,pt=d(()=>{"use strict";$i=g(require("node:fs"));ji();R();ut();ES="claude",kS="codex",LS="cursor",RS="agy",xS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),D=()=>{let e=L();if(!$i.default.existsSync(e.configPath))return null;try{let t=JSON.parse($i.default.readFileSync(e.configPath,"utf8"));if(!xS(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",n=Eo({installDir:e.installDir,configWsUrl:r}),o=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:n,workspace:o,writerExecutionBackend:K(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:ES,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:kS,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:LS,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:RS,pairingToken:s,layout:e}}catch{return null}}});var Hd,Bi,Gt,ko=d(()=>{"use strict";Hd=require("node:crypto");Dt();vi();bo();Cr();pt();Bi=!1,Gt=async e=>{if(Bi)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=D();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=De({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=yd(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};Bi=!0;let o=(0,Hd.randomUUID)();try{let s=await Bt(t,"claude-cli",n.prompt);await Wd(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=xr({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return hd(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{Bi=!1}}});function Mr(e){return(0,Dd.createHash)("sha256").update(e.trim()).digest("hex")}var Dd,Gi=d(()=>{"use strict";Dd=require("node:crypto")});var PS,Fd,CS,TS,Hr,Vi,qi=d(()=>{"use strict";PS=["agentwitch.com","www.agentwitch.com"],Fd=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,CS=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},TS=e=>{let t=CS(e);return!!(PS.includes(t)||Fd.test(e.trim().toLowerCase()))},Hr=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return TS(r)?Fd.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Vi=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Hr(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Lo,Ud,IS,OS,jd,Ro,Dr,xo,Fr=d(()=>{"use strict";Lo=g(require("node:fs")),Ud=g(require("node:path")),IS="wake-port.json",OS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jd=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Ro=e=>Ud.default.join(e,IS),Dr=e=>{let t=Ro(e);if(!Lo.default.existsSync(t))return null;try{let r=JSON.parse(Lo.default.readFileSync(t,"utf8"));if(OS(r)&&jd(r.wakePort))return r.wakePort}catch{return null}return null},xo=(e,t)=>{if(!jd(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Ro(e);Lo.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var N0,M0,H0,ie,$d,Vt=d(()=>{"use strict";Fr();R();Fr();N0=ii(),M0=`${ne()}-wake`,H0=ne(),ie=()=>{let e=w(),t=Dr(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return ii()},$d=e=>{let t=w();Dr(t)===null&&xo(t,e)}});var Po,Gd,Vd,Bd,NS,MS,Co,zi=d(()=>{"use strict";Po=g(require("node:fs")),Gd=g(require("node:os")),Vd=g(require("node:path"));Mt();Oe();Fr();R();Bd=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},NS=e=>Vd.default.join(Gd.default.homedir(),"Library","LaunchAgents",`${e}.plist`),MS=async e=>Po.default.existsSync(NS(e))?(await oe(e)).ok:!1,Co=async(e=w())=>{let t=Po.default.existsSync(Ro(e)),r=!Po.default.existsSync(yr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let n=Dr(e);if(n===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await Bd(n))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ne(e)}-wake`;await MS(i)&&s.push(i);for(let c of U(e))(await oe(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await Bd(n);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var qt,Ur,HS,qd,zd,Kd=d(()=>{"use strict";qt=g(require("node:fs")),Ur=g(require("node:path"));Gi();R();HS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qd=e=>{if(!qt.default.existsSync(e))return null;try{let t=JSON.parse(qt.default.readFileSync(e,"utf8"));return!HS(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Mr(t.pairingToken.trim())}catch{return null}},zd=(e=w())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(qd(Ur.default.join(e,"config.json")));let o=Ur.default.join(e,tt);if(!qt.default.existsSync(o))return t;for(let s of qt.default.readdirSync(o)){let i=Ur.default.join(o,s);qt.default.statSync(i).isDirectory()&&n(qd(Ur.default.join(i,"config.json")))}return t}});var Jd,Yd=d(()=>{"use strict";Jd=["rule","skill","command","instruction","agent"]});var Xd,DS,FS,Zd,Qd=d(()=>{"use strict";Yd();Xd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DS=e=>typeof e=="string"&&Jd.includes(e),FS=e=>{if(!Xd(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!DS(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Zd=e=>{if(!Xd(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=FS(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var eu,US,jS,$S,BS,GS,VS,qS,zS,To,Ki=d(()=>{"use strict";eu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},US=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},jS=(e,t)=>{let r=US(t),n=eu(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},$S=(e,t,r)=>{let n=jS(t,r);return`shared/items/${e}/${n}`},BS=["rules","skills","commands","instructions","agents"],GS=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),VS=(e,t)=>[...e.filter(n=>n.id!==t.id),t],qS=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},zS=e=>({id:e.id,kind:e.kind,title:e.title,path:$S(e.id,e.kind,e.title)}),To=e=>{let t=new Date().toISOString(),r=e.existingManifest??GS(e.hostname,t),n=eu(e.bundle.slug),o=qS(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...BS.map(u=>`sets/${n}/${u}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((u,m)=>{let h=zS(m);return{files:[...u.files,{relativePath:h.path,content:m.content}],nextItems:VS(u.nextItems,h)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var Be,tu,Io,KS,ru,nu=d(()=>{"use strict";Be=g(require("node:fs")),tu=g(require("node:os")),Io=g(require("node:path"));Ki();R();KS=e=>{if(!Be.default.existsSync(e))return null;try{let t=JSON.parse(Be.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},ru=e=>{let t=L(e.profileEmail);try{let r=KS(t.harnessManifestPath),n=To({bundle:e.bundle,hostname:tu.default.hostname(),existingManifest:r});Be.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)Be.default.mkdirSync(Io.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=Io.default.join(t.harnessRootDir,o.relativePath);Be.default.mkdirSync(Io.default.dirname(s),{recursive:!0}),Be.default.writeFileSync(s,o.content)}return Be.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var ou,su,Oo,Ji=d(()=>{"use strict";ou=require("node:child_process"),su=g(require("node:fs"));Sr();R();Oo=(e=w())=>{let t=yr(e);if(!su.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!be())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ie(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,ou.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var Yi,me,ok,zt=d(()=>{"use strict";R();Yi="connection-health.json",me=12e4,ok=`${ne()}-watchdog`});var iu,gt,Xi,JS,YS,XS,au,ZS,lu,No,Mo=d(()=>{"use strict";iu=require("node:crypto"),gt=g(require("node:fs")),Xi=g(require("node:path"));R();JS="watchdog-log.ndjson",YS=200,XS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),au=(e=w())=>{let t=L(),r=t.installDir===e?t.logsDir:Fn({installDir:e,profileEmail:t.profileEmail});return Xi.default.join(r,JS)},ZS=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!XS(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},lu=(e,t=w())=>{let r={id:(0,iu.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=au(t);gt.default.mkdirSync(Xi.default.dirname(n),{recursive:!0});let o=gt.default.existsSync(n)?gt.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-YS+1)),JSON.stringify(r)];return gt.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},No=(e=20,t=w())=>{let r=au(t);if(!gt.default.existsSync(r))return[];let n=gt.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=ZS(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var jr,Ho,QS,cu,ae,Zi,pe,$r=d(()=>{"use strict";jr=g(require("node:fs")),Ho=g(require("node:path"));zt();QS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cu=e=>e.profileEmail===null?Ho.default.join(e.installDir,Yi):Ho.default.join(e.installDir,"profiles",e.profileEmail,Yi),ae=e=>{let t=cu(e);if(!jr.default.existsSync(t))return null;try{let r=JSON.parse(jr.default.readFileSync(t,"utf8"));return!QS(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},Zi=(e,t)=>{let r=cu(e),n=ae(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};jr.default.mkdirSync(Ho.default.dirname(r),{recursive:!0}),jr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},pe=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var du,uu,e_,Br,Qi=d(()=>{"use strict";du=require("node:child_process"),uu=require("node:util"),e_=(0,uu.promisify)(du.execFile),Br=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await e_("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var mu,ea=d(()=>{"use strict";mu="watchdog-reinstall-state.json"});var pu={};Ce(pu,{verifyAgentWitchReviveAfterKickstart:()=>n_});var r_,n_,gu=d(()=>{"use strict";ea();$r();Qi();R();r_=e=>new Promise(t=>{setTimeout(t,e)}),n_=async e=>{if(await r_(e.verifyDelayMs??3e3),!await Br(e.launchAgentLabel))return!1;let r=e.profileEmail===null?L():L(e.profileEmail),n=ae(r);return!pe(n,e.staleAfterMs)}});var Gr,ta,s_,fu,i_,hu,yu,Au=d(()=>{"use strict";Gr=g(require("node:fs")),ta=g(require("node:path"));ea();R();s_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fu=e=>ta.default.join(e,mu),i_=(e=w())=>{let t=fu(e);if(!Gr.default.existsSync(t))return null;try{let r=JSON.parse(Gr.default.readFileSync(t,"utf8"));return!s_(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},hu=(e=w(),t=Date.now())=>{let r=i_(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},yu=(e=w(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=fu(e);return Gr.default.mkdirSync(ta.default.dirname(n),{recursive:!0}),Gr.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var Su,Kt,_u,bu,Wu,a_,l_,wu,c_,d_,vu,Eu=d(()=>{"use strict";Su=require("node:child_process"),Kt=g(require("node:fs")),_u=g(require("node:os")),bu=g(require("node:path")),Wu=require("node:util");st();Ot();R();a_=(0,Wu.promisify)(Su.execFile),l_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wu=e=>{let t=Ie(e),r=t===null?L():L(t);if(!Kt.default.existsSync(r.configPath))return null;try{let n=JSON.parse(Kt.default.readFileSync(r.configPath,"utf8"));return!l_(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},c_=e=>wu(e)?.wsUrl??null,d_=e=>{let t=c_(e);return t!==null?Z(t):z(e)?.appOrigin??null},vu=async e=>{let t=e?.installDir??w(),r=wu(t),n=r!==null?Z(r.wsUrl):d_(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=bu.default.join(_u.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Kt.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Ie(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await a_("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{Kt.default.existsSync(i)&&Kt.default.unlinkSync(i)}}});var ku={};Ce(ku,{attemptAgentWitchWatchdogReinstall:()=>u_});var u_,Lu=d(()=>{"use strict";Au();Mt();Eu();u_=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!hu())return{attempted:!1,ok:!1,targets:e};yu();let r=await vu();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await oe(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var Ru,xu,Pu,m_,p_,g_,ra,na=d(()=>{"use strict";Sr();zt();$r();Qi();zi();Mt();Oe();R();Ji();Mo();Ru=e=>e===null?L():L(e),xu=async(e,t,r)=>{if(!await Br(e))return"not_running";let o=Ru(t),s=ae(o);return pe(s,r)?"stale_connection":"healthy"},Pu=async e=>{let t=e?.staleAfterMs??me,r=w(),n=U(r);return Promise.all(n.map(async o=>{let s=await xu(o.launchAgentLabel,o.profileEmail,t),i=Ru(o.profileEmail),a=ae(i),c=await Br(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:pe(a,t),needsRevive:s!=="healthy",reason:s}}))},m_=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},p_=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",g_=async e=>{let t=await oe(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(gu(),pu)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},ra=async e=>{if(!be())return{ok:!0,targets:[]};let t=e?.staleAfterMs??me,r=w();await Co(r);let n=U(r),o=[];for(let m of n){let h=await xu(m.launchAgentLabel,m.profileEmail,t);if(h==="healthy"){o.push({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,revived:!1,reason:h});continue}o.push(await g_({launchAgentLabel:m.launchAgentLabel,profileEmail:m.profileEmail,reason:h,staleAfterMs:t}))}if(o.length===0){let m=Oo();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:m.ok,reason:"not_running",...m.errorMessage!==void 0?{errorMessage:m.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(m=>m.reason!=="healthy"&&!m.revived))try{let{attemptAgentWitchWatchdogReinstall:m}=await Promise.resolve().then(()=>(Lu(),ku)),h=await m(o);s=h.attempted,i=h.ok,a=h.errorMessage,c=[...h.targets]}catch(m){s=!0,i=!1,a=m instanceof Error?m.message:"Watchdog reinstall helper is unavailable."}let u={ok:c.some(m=>m.revived||m.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&lu({event:p_(c,u.ok,{reinstallAttempted:s,reinstallOk:i}),ok:u.ok,message:m_(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),u}});var Cu,Tu,Iu=d(()=>{"use strict";Cu=g(require("node:os"));zt();Mo();na();Tu=async()=>{let e=await Pu(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:Cu.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:me,healthyProfileCount:t,profiles:e,lastLog:No(1)[0]??null}}});var Ou={};Ce(Ou,{buildAgentWitchAutomationStatusFromWakeServer:()=>$o,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Jo,buildAgentWitchWakeHealthResponse:()=>Bo,buildAgentWitchWakeIdentityResponse:()=>Go,buildAgentWitchWatchdogStatus:()=>qo,installHarnessFromWakeServer:()=>Fo,readAgentWitchSelfUpdateLogEntries:()=>Yt,readAgentWitchWatchdogLogEntries:()=>Jt,restartAgentWitchFromWakeServer:()=>Ko,reviveAgentWitchWebSocketFromWakeServer:()=>zo,runAgentWitchSelfUpdateFromWakeServer:()=>Yo,runAgentWitchUninstallLocalFromWakeServer:()=>Xo,runAutomationFromWakeServer:()=>jo,syncAutomationsFromWakeServer:()=>Uo,wakeAgentWitchLaunchAgents:()=>Vo});var Do,oa,Fo,Uo,jo,$o,Bo,Go,Vo,Jt,qo,zo,Ko,Jo,Yt,Yo,Xo,sa=d(()=>{"use strict";Li();ko();Cr();Gi();pt();Do=g(require("node:os"));qi();Vt();zi();Mt();Oe();Kd();Qd();nu();Ji();Iu();Mo();Ht();$n();yi();na();oa=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fo=e=>{if(!oa(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Zd(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Hr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=ru({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},Uo=e=>{if(!oa(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Hr(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=ao({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},jo=async e=>{if(!oa(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Hr(t)?Gt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},$o=()=>{let e=D(),t=e!==null?He(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Do.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},Bo=()=>{let e=U();return{ok:!0,port:ie(),hostname:Do.default.hostname(),profileCount:e.length}},Go=()=>{let e=U(),t=D()?.pairingToken.trim()??"",r=t.length>0?Mr(t):null,n=zd();return{hostname:Do.default.hostname(),port:ie(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},Vo=async()=>{await Co();let e=U(),t=[];for(let r of e){let n=await oe(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Oo();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Jt=(e=20)=>No(e),qo=Tu,zo=ra,Ko=ra,Jo=Wi,Yt=(e=20)=>to(e),Yo=e=>bi(e),Xo=()=>hc()});var We=q((aL,Hu)=>{"use strict";var Nu=["nodebuffer","arraybuffer","fragments"],Mu=typeof Blob<"u";Mu&&Nu.push("blob");Hu.exports={BINARY_TYPES:Nu,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Mu,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Vr=q((lL,Zo)=>{"use strict";var{EMPTY_BUFFER:f_}=We(),ia=Buffer[Symbol.species];function h_(e,t){if(e.length===0)return f_;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new ia(r.buffer,r.byteOffset,n):r}function Du(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function Fu(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function y_(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function aa(e){if(aa.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new ia(e):ArrayBuffer.isView(e)?t=new ia(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),aa.readOnly=!1),t}Zo.exports={concat:h_,mask:Du,toArrayBuffer:y_,toBuffer:aa,unmask:Fu};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Zo.exports.mask=function(t,r,n,o,s){s<48?Du(t,r,n,o,s):e.mask(t,r,n,o,s)},Zo.exports.unmask=function(t,r){t.length<32?Fu(t,r):e.unmask(t,r)}}catch{}});var $u=q((cL,ju)=>{"use strict";var Uu=Symbol("kDone"),la=Symbol("kRun"),ca=class{constructor(t){this[Uu]=()=>{this.pending--,this[la]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[la]()}[la](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[Uu])}}};ju.exports=ca});var Qt=q((dL,qu)=>{"use strict";var qr=require("zlib"),Bu=Vr(),A_=$u(),{kStatusCode:Gu}=We(),S_=Buffer[Symbol.species],__=Buffer.from([0,0,255,255]),es=Symbol("permessage-deflate"),we=Symbol("total-length"),Xt=Symbol("callback"),Ge=Symbol("buffers"),Zt=Symbol("error"),Qo,da=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Qo){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Qo=new A_(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Xt];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Qo.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){Qo.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?qr.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=qr.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[es]=this,this._inflate[we]=0,this._inflate[Ge]=[],this._inflate.on("error",W_),this._inflate.on("data",Vu)}this._inflate[Xt]=n,this._inflate.write(t),r&&this._inflate.write(__),this._inflate.flush(()=>{let s=this._inflate[Zt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=Bu.concat(this._inflate[Ge],this._inflate[we]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[we]=0,this._inflate[Ge]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?qr.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=qr.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[we]=0,this._deflate[Ge]=[],this._deflate.on("data",b_)}this._deflate[Xt]=n,this._deflate.write(t),this._deflate.flush(qr.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Bu.concat(this._deflate[Ge],this._deflate[we]);r&&(s=new S_(s.buffer,s.byteOffset,s.length-4)),this._deflate[Xt]=null,this._deflate[we]=0,this._deflate[Ge]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};qu.exports=da;function b_(e){this[Ge].push(e),this[we]+=e.length}function Vu(e){if(this[we]+=e.length,this[es]._maxPayload<1||this[we]<=this[es]._maxPayload){this[Ge].push(e);return}this[Zt]=new RangeError("Max payload size exceeded"),this[Zt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Zt][Gu]=1009,this.removeListener("data",Vu),this.reset()}function W_(e){if(this[es]._inflate=null,this[Zt]){this[Xt](this[Zt]);return}e[Gu]=1007,this[Xt](e)}});var er=q((uL,ts)=>{"use strict";var{isUtf8:zu}=require("buffer"),{hasBlob:w_}=We(),v_=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function E_(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function ua(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function k_(e){return w_&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}ts.exports={isBlob:k_,isValidStatusCode:E_,isValidUTF8:ua,tokenChars:v_};if(zu)ts.exports.isValidUTF8=function(e){return e.length<24?ua(e):zu(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");ts.exports.isValidUTF8=function(t){return t.length<32?ua(t):e(t)}}catch{}});var ha=q((mL,em)=>{"use strict";var{Writable:L_}=require("stream"),Ku=Qt(),{BINARY_TYPES:R_,EMPTY_BUFFER:Ju,kStatusCode:x_,kWebSocket:P_}=We(),{concat:ma,toArrayBuffer:C_,unmask:T_}=Vr(),{isValidStatusCode:I_,isValidUTF8:Yu}=er(),rs=Buffer[Symbol.species],Q=0,Xu=1,Zu=2,Qu=3,pa=4,ga=5,ns=6,fa=class extends L_{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||R_[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[P_]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Q}_write(t,r,n){if(this._opcode===8&&this._state==Q)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new rs(n.buffer,n.byteOffset+t,n.length-t),new rs(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new rs(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Q:this.getInfo(t);break;case Xu:this.getPayloadLength16(t);break;case Zu:this.getPayloadLength64(t);break;case Qu:this.getMask();break;case pa:this.getData(t);break;case ga:case ns:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[Ku.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Xu:this._payloadLength===127?this._state=Zu:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Qu:this._state=pa}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=pa}getData(t){let r=Ju;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&T_(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=ga,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[Ku.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Q&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Q;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=ma(n,r):this._binaryType==="arraybuffer"?o=C_(ma(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=Q):(this._state=ns,setImmediate(()=>{this.emit("message",o,!0),this._state=Q,this.startLoop(t)}))}else{let o=ma(n,r);if(!this._skipUTF8Validation&&!Yu(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===ga||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=Q):(this._state=ns,setImmediate(()=>{this.emit("message",o,!1),this._state=Q,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,Ju),this.end();else{let n=t.readUInt16BE(0);if(!I_(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new rs(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!Yu(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=Q;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Q):(this._state=ns,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Q,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[x_]=o,i}};em.exports=fa});var Sa=q((gL,nm)=>{"use strict";var{Duplex:pL}=require("stream"),{randomFillSync:O_}=require("crypto"),{types:{isUint8Array:N_}}=require("util"),tm=Qt(),{EMPTY_BUFFER:M_,kWebSocket:H_,NOOP:D_}=We(),{isBlob:tr,isValidStatusCode:F_}=er(),{mask:rm,toBuffer:ft}=Vr(),ee=Symbol("kByteLength"),U_=Buffer.alloc(4),os=8*1024,ht,rr=os,le=0,j_=1,$_=2,ya=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=le,this.onerror=D_,this[H_]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||U_,r.generateMask?r.generateMask(n):(rr===os&&(ht===void 0&&(ht=Buffer.alloc(os)),O_(ht,0,os),rr=0),n[0]=ht[rr++],n[1]=ht[rr++],n[2]=ht[rr++],n[3]=ht[rr++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[ee]!==void 0?a=r[ee]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let u=Buffer.allocUnsafe(o?a+s:s);return u[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(u[0]|=64),u[1]=c,c===126?u.writeUInt16BE(a,2):c===127&&(u[2]=u[3]=0,u.writeUIntBE(a,4,6)),r.mask?(u[1]|=128,u[s-4]=n[0],u[s-3]=n[1],u[s-2]=n[2],u[s-1]=n[3],i?[u,t]:o?(rm(t,n,u,s,a),[u]):(rm(t,n,t,0,a),[u,t])):[u,t]}close(t,r,n,o){let s;if(t===void 0)s=M_;else{if(typeof t!="number"||!F_(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(N_(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[ee]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==le?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):tr(t)?(o=t.size,s=!1):(t=ft(t),o=t.length,s=ft.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ee]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};tr(t)?this._state!==le?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==le?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):tr(t)?(o=t.size,s=!1):(t=ft(t),o=t.length,s=ft.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[ee]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};tr(t)?this._state!==le?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==le?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[tm.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):tr(t)?(a=t.size,c=!1):(t=ft(t),a=t.length,c=ft.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let u={[ee]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};tr(t)?this._state!==le?this.enqueue([this.getBlobData,t,this._compress,u,n]):this.getBlobData(t,this._compress,u,n):this._state!==le?this.enqueue([this.dispatch,t,this._compress,u,n]):this.dispatch(t,this._compress,u,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[ee],this._state=$_,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(Aa,this,a,o);return}this._bufferedBytes-=n[ee];let i=ft(s);r?this.dispatch(i,r,n,o):(this._state=le,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(B_,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[tm.extensionName];this._bufferedBytes+=n[ee],this._state=j_,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");Aa(this,c,o);return}this._bufferedBytes-=n[ee],this._state=le,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===le&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][ee],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][ee],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};nm.exports=ya;function Aa(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function B_(e,t,r){Aa(e,t,r),e.onerror(t)}});var mm=q((fL,um)=>{"use strict";var{kForOnEventAttribute:zr,kListener:_a}=We(),om=Symbol("kCode"),sm=Symbol("kData"),im=Symbol("kError"),am=Symbol("kMessage"),lm=Symbol("kReason"),nr=Symbol("kTarget"),cm=Symbol("kType"),dm=Symbol("kWasClean"),ve=class{constructor(t){this[nr]=null,this[cm]=t}get target(){return this[nr]}get type(){return this[cm]}};Object.defineProperty(ve.prototype,"target",{enumerable:!0});Object.defineProperty(ve.prototype,"type",{enumerable:!0});var yt=class extends ve{constructor(t,r={}){super(t),this[om]=r.code===void 0?0:r.code,this[lm]=r.reason===void 0?"":r.reason,this[dm]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[om]}get reason(){return this[lm]}get wasClean(){return this[dm]}};Object.defineProperty(yt.prototype,"code",{enumerable:!0});Object.defineProperty(yt.prototype,"reason",{enumerable:!0});Object.defineProperty(yt.prototype,"wasClean",{enumerable:!0});var or=class extends ve{constructor(t,r={}){super(t),this[im]=r.error===void 0?null:r.error,this[am]=r.message===void 0?"":r.message}get error(){return this[im]}get message(){return this[am]}};Object.defineProperty(or.prototype,"error",{enumerable:!0});Object.defineProperty(or.prototype,"message",{enumerable:!0});var Kr=class extends ve{constructor(t,r={}){super(t),this[sm]=r.data===void 0?null:r.data}get data(){return this[sm]}};Object.defineProperty(Kr.prototype,"data",{enumerable:!0});var G_={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[zr]&&o[_a]===t&&!o[zr])return;let n;if(e==="message")n=function(s,i){let a=new Kr("message",{data:i?s:s.toString()});a[nr]=this,ss(t,this,a)};else if(e==="close")n=function(s,i){let a=new yt("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[nr]=this,ss(t,this,a)};else if(e==="error")n=function(s){let i=new or("error",{error:s,message:s.message});i[nr]=this,ss(t,this,i)};else if(e==="open")n=function(){let s=new ve("open");s[nr]=this,ss(t,this,s)};else return;n[zr]=!!r[zr],n[_a]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[_a]===t&&!r[zr]){this.removeListener(e,r);break}}};um.exports={CloseEvent:yt,ErrorEvent:or,Event:ve,EventTarget:G_,MessageEvent:Kr};function ss(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var is=q((hL,pm)=>{"use strict";var{tokenChars:Jr}=er();function ge(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function V_(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,u=-1,m=-1,h=0;for(;h<e.length;h++)if(u=e.charCodeAt(h),i===void 0)if(m===-1&&Jr[u]===1)c===-1&&(c=h);else if(h!==0&&(u===32||u===9))m===-1&&c!==-1&&(m=h);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${h}`);m===-1&&(m=h);let A=e.slice(c,m);u===44?(ge(t,A,r),r=Object.create(null)):i=A,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${h}`);else if(a===void 0)if(m===-1&&Jr[u]===1)c===-1&&(c=h);else if(u===32||u===9)m===-1&&c!==-1&&(m=h);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${h}`);m===-1&&(m=h),ge(r,e.slice(c,m),!0),u===44&&(ge(t,i,r),r=Object.create(null),i=void 0),c=m=-1}else if(u===61&&c!==-1&&m===-1)a=e.slice(c,h),c=m=-1;else throw new SyntaxError(`Unexpected character at index ${h}`);else if(o){if(Jr[u]!==1)throw new SyntaxError(`Unexpected character at index ${h}`);c===-1?c=h:n||(n=!0),o=!1}else if(s)if(Jr[u]===1)c===-1&&(c=h);else if(u===34&&c!==-1)s=!1,m=h;else if(u===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${h}`);else if(u===34&&e.charCodeAt(h-1)===61)s=!0;else if(m===-1&&Jr[u]===1)c===-1&&(c=h);else if(c!==-1&&(u===32||u===9))m===-1&&(m=h);else if(u===59||u===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${h}`);m===-1&&(m=h);let A=e.slice(c,m);n&&(A=A.replace(/\\/g,""),n=!1),ge(r,a,A),u===44&&(ge(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=m=-1}else throw new SyntaxError(`Unexpected character at index ${h}`);if(c===-1||s||u===32||u===9)throw new SyntaxError("Unexpected end of input");m===-1&&(m=h);let W=e.slice(c,m);return i===void 0?ge(t,W,r):(a===void 0?ge(r,W,!0):n?ge(r,a,W.replace(/\\/g,"")):ge(r,a,W),ge(t,i,r)),t}function q_(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}pm.exports={format:q_,parse:V_}});var ds=q((SL,Em)=>{"use strict";var z_=require("events"),K_=require("https"),J_=require("http"),hm=require("net"),Y_=require("tls"),{randomBytes:X_,createHash:Z_}=require("crypto"),{Duplex:yL,Readable:AL}=require("stream"),{URL:ba}=require("url"),Ve=Qt(),Q_=ha(),eb=Sa(),{isBlob:tb}=er(),{BINARY_TYPES:gm,CLOSE_TIMEOUT:rb,EMPTY_BUFFER:as,GUID:nb,kForOnEventAttribute:Wa,kListener:ob,kStatusCode:sb,kWebSocket:N,NOOP:ym}=We(),{EventTarget:{addEventListener:ib,removeEventListener:ab}}=mm(),{format:lb,parse:cb}=is(),{toBuffer:db}=Vr(),Am=Symbol("kAborted"),wa=[8,13],Ee=["CONNECTING","OPEN","CLOSING","CLOSED"],ub=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,C=class e extends z_{constructor(t,r,n){super(),this._binaryType=gm[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=as,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),Sm(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){gm.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new Q_({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new eb(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[N]=this,s[N]=this,t[N]=this,o.on("conclude",gb),o.on("drain",fb),o.on("error",hb),o.on("message",yb),o.on("ping",Ab),o.on("pong",Sb),s.onerror=_b,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",Wm),t.on("data",cs),t.on("end",wm),t.on("error",vm),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Ve.extensionName]&&this._extensions[Ve.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){J(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),bm(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){va(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||as,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){va(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||as,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){va(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Ve.extensionName]||(o.compress=!1),this._sender.send(t||as,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){J(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(C,"CONNECTING",{enumerable:!0,value:Ee.indexOf("CONNECTING")});Object.defineProperty(C.prototype,"CONNECTING",{enumerable:!0,value:Ee.indexOf("CONNECTING")});Object.defineProperty(C,"OPEN",{enumerable:!0,value:Ee.indexOf("OPEN")});Object.defineProperty(C.prototype,"OPEN",{enumerable:!0,value:Ee.indexOf("OPEN")});Object.defineProperty(C,"CLOSING",{enumerable:!0,value:Ee.indexOf("CLOSING")});Object.defineProperty(C.prototype,"CLOSING",{enumerable:!0,value:Ee.indexOf("CLOSING")});Object.defineProperty(C,"CLOSED",{enumerable:!0,value:Ee.indexOf("CLOSED")});Object.defineProperty(C.prototype,"CLOSED",{enumerable:!0,value:Ee.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(C.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(C.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[Wa])return t[ob];return null},set(t){for(let r of this.listeners(e))if(r[Wa]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[Wa]:!0})}})});C.prototype.addEventListener=ib;C.prototype.removeEventListener=ab;Em.exports=C;function Sm(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:rb,protocolVersion:wa[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!wa.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${wa.join(", ")})`);let s;if(t instanceof ba)s=t;else try{s=new ba(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;ls(e,l);return}let u=i?443:80,m=X_(16).toString("base64"),h=i?K_.request:J_.request,W=new Set,A;if(o.createConnection=o.createConnection||(i?pb:mb),o.defaultPort=o.defaultPort||u,o.port=s.port||u,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":m,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(A=new Ve({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=lb({[Ve.extensionName]:A.offer()})),r.length){for(let l of r){if(typeof l!="string"||!ub.test(l)||W.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");W.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let f;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[S,y]of Object.entries(l))n.headers[S.toLowerCase()]=y}else if(e.listenerCount("redirect")===0){let l=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),f=e._req=h(o),e._redirects&&e.emit("redirect",e.url,f)}else f=e._req=h(o);o.timeout&&f.on("timeout",()=>{J(e,f,"Opening handshake has timed out")}),f.on("error",l=>{f===null||f[Am]||(f=e._req=null,ls(e,l))}),f.on("response",l=>{let S=l.headers.location,y=l.statusCode;if(S&&o.followRedirects&&y>=300&&y<400){if(++e._redirects>o.maxRedirects){J(e,f,"Maximum redirects exceeded");return}f.abort();let p;try{p=new ba(S,t)}catch{let b=new SyntaxError(`Invalid URL: ${S}`);ls(e,b);return}Sm(e,p,r,n)}else e.emit("unexpected-response",f,l)||J(e,f,`Unexpected server response: ${l.statusCode}`)}),f.on("upgrade",(l,S,y)=>{if(e.emit("upgrade",l),e.readyState!==C.CONNECTING)return;f=e._req=null;let p=l.headers.upgrade;if(p===void 0||p.toLowerCase()!=="websocket"){J(e,S,"Invalid Upgrade header");return}let _=Z_("sha1").update(m+nb).digest("base64");if(l.headers["sec-websocket-accept"]!==_){J(e,S,"Invalid Sec-WebSocket-Accept header");return}let b=l.headers["sec-websocket-protocol"],v;if(b!==void 0?W.size?W.has(b)||(v="Server sent an invalid subprotocol"):v="Server sent a subprotocol but none was requested":W.size&&(v="Server sent no subprotocol"),v){J(e,S,v);return}b&&(e._protocol=b);let k=l.headers["sec-websocket-extensions"];if(k!==void 0){if(!A){J(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let P;try{P=cb(k)}catch{J(e,S,"Invalid Sec-WebSocket-Extensions header");return}let $=Object.keys(P);if($.length!==1||$[0]!==Ve.extensionName){J(e,S,"Server indicated an extension that was not requested");return}try{A.accept(P[Ve.extensionName])}catch{J(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Ve.extensionName]=A}e.setSocket(S,y,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(f,e):f.end()}function ls(e,t){e._readyState=C.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function mb(e){return e.path=e.socketPath,hm.connect(e)}function pb(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=hm.isIP(e.host)?"":e.host),Y_.connect(e)}function J(e,t,r){e._readyState=C.CLOSING;let n=new Error(r);Error.captureStackTrace(n,J),t.setHeader?(t[Am]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(ls,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function va(e,t,r){if(t){let n=tb(t)?t.size:db(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${Ee[e.readyState]})`);process.nextTick(r,n)}}function gb(e,t){let r=this[N];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[N]!==void 0&&(r._socket.removeListener("data",cs),process.nextTick(_m,r._socket),e===1005?r.close():r.close(e,t))}function fb(){let e=this[N];e.isPaused||e._socket.resume()}function hb(e){let t=this[N];t._socket[N]!==void 0&&(t._socket.removeListener("data",cs),process.nextTick(_m,t._socket),t.close(e[sb])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function fm(){this[N].emitClose()}function yb(e,t){this[N].emit("message",e,t)}function Ab(e){let t=this[N];t._autoPong&&t.pong(e,!this._isServer,ym),t.emit("ping",e)}function Sb(e){this[N].emit("pong",e)}function _m(e){e.resume()}function _b(e){let t=this[N];t.readyState!==C.CLOSED&&(t.readyState===C.OPEN&&(t._readyState=C.CLOSING,bm(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function bm(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function Wm(){let e=this[N];if(this.removeListener("close",Wm),this.removeListener("data",cs),this.removeListener("end",wm),e._readyState=C.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[N]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",fm),e._receiver.on("finish",fm))}function cs(e){this[N]._receiver.write(e)||this.pause()}function wm(){let e=this[N];e._readyState=C.CLOSING,e._receiver.end(),this.end()}function vm(){let e=this[N];this.removeListener("error",vm),this.on("error",ym),e&&(e._readyState=C.CLOSING,this.destroy())}});var xm=q((bL,Rm)=>{"use strict";var _L=ds(),{Duplex:bb}=require("stream");function km(e){e.emit("close")}function Wb(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Lm(e){this.removeListener("error",Lm),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function wb(e,t){let r=!0,n=new bb({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(km,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(km,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",Wb),n.on("error",Lm),n}Rm.exports=wb});var Ea=q((WL,Pm)=>{"use strict";var{tokenChars:vb}=er();function Eb(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&vb[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}Pm.exports={parse:Eb}});var Hm=q((vL,Mm)=>{"use strict";var kb=require("events"),us=require("http"),{Duplex:wL}=require("stream"),{createHash:Lb}=require("crypto"),Cm=is(),At=Qt(),Rb=Ea(),xb=ds(),{CLOSE_TIMEOUT:Pb,GUID:Cb,kWebSocket:Tb}=We(),Ib=/^[+/0-9A-Za-z]{22}==$/,Tm=0,Im=1,Nm=2,ka=class extends kb{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:Pb,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:xb,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=us.createServer((n,o)=>{let s=us.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=Ob(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=Tm}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===Nm){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Yr,this);return}if(t&&this.once("close",t),this._state!==Im)if(this._state=Im,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Yr,this):process.nextTick(Yr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Yr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",Om);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){St(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){St(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Ib.test(s)){St(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){St(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Xr(r,400);return}let c=t.headers["sec-websocket-protocol"],u=new Set;if(c!==void 0)try{u=Rb.parse(c)}catch{St(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let m=t.headers["sec-websocket-extensions"],h={};if(this.options.perMessageDeflate&&m!==void 0){let W=new At({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let A=Cm.parse(m);A[At.extensionName]&&(W.accept(A[At.extensionName]),h[At.extensionName]=W)}catch{St(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let W={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(W,(A,f,l,S)=>{if(!A)return Xr(r,f||401,l,S);this.completeUpgrade(h,s,u,t,r,n,o)});return}if(!this.options.verifyClient(W))return Xr(r,401)}this.completeUpgrade(h,s,u,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Tb])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>Tm)return Xr(s,503);let u=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${Lb("sha1").update(r+Cb).digest("base64")}`],m=new this.options.WebSocket(null,void 0,this.options);if(n.size){let h=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;h&&(u.push(`Sec-WebSocket-Protocol: ${h}`),m._protocol=h)}if(t[At.extensionName]){let h=t[At.extensionName].params,W=Cm.format({[At.extensionName]:[h]});u.push(`Sec-WebSocket-Extensions: ${W}`),m._extensions=t}this.emit("headers",u,o),s.write(u.concat(`\r
`).join(`\r
`)),s.removeListener("error",Om),m.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(m),m.on("close",()=>{this.clients.delete(m),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Yr,this)})),a(m,o)}};Mm.exports=ka;function Ob(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function Yr(e){e._state=Nm,e.emit("close")}function Om(){this.destroy()}function Xr(e,t,r,n){r=r||us.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${us.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function St(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,St),e.emit("wsClientError",i,r,t)}else Xr(r,n,o,s)}});var Nb,Mb,Hb,Db,Fb,Ub,Dm,jb,Zr,Fm=d(()=>{Nb=g(xm(),1),Mb=g(is(),1),Hb=g(Qt(),1),Db=g(ha(),1),Fb=g(Sa(),1),Ub=g(Ea(),1),Dm=g(ds(),1),jb=g(Hm(),1),Zr=Dm.default});var La=d(()=>{"use strict"});var ke,Qr=d(()=>{"use strict";ke=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var sr,_t,Um,Bb,Ra,xa,jm,$m,Bm,Gm,Pa,Ca=d(()=>{"use strict";sr=g(require("node:fs")),_t=g(require("node:os")),Um=g(require("node:path"));La();Qr();Bb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ra=(e=_t.default.hostname())=>Um.default.join(_t.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),xa=e=>{if(!sr.default.existsSync(e))return null;try{let t=JSON.parse(sr.default.readFileSync(e,"utf8"));return!Bb(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},jm=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},$m=(e,t)=>{sr.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Bm=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Ra(),n=xa(r);if(n!==null&&n.pid!==process.pid&&ke(n.pid)&&jm(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:_t.default.hostname(),macOsUsername:_t.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return $m(r,o),{ok:!0}},Gm=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Ra(),n=xa(r);return n!==null&&n.pid!==process.pid&&ke(n.pid)&&jm(n)?{ok:!1}:($m(r,{hostname:_t.default.hostname(),macOsUsername:_t.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},Pa=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Ra();xa(r)?.pid===process.pid&&sr.default.existsSync(r)&&sr.default.unlinkSync(r)}});var Ta,en,Gb,Vb,qb,zb,Vm,qm=d(()=>{"use strict";Ta=require("node:child_process"),en=g(require("node:path"));Qr();xt();Gb=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Vb=(e,t)=>{if(Gb(e)||!/\bnode\b/.test(e))return!1;let r=en.default.resolve(t),n=en.default.join(r,"app",Se),o=en.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Se||i==="agent-witch.ts")return e.includes(r);try{let a=en.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},qb=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,Ta.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},zb=(e,t,r)=>{let n=qb(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),u=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||Vb(u,t)&&o.push(c)}return o},Vm=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,Ta.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=zb(r,e.installDir,t),o=[];for(let s of n)if(ke(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var tn,rn,zm,Kb,Km,Jm=d(()=>{"use strict";tn=g(require("node:fs")),rn=g(require("node:path"));R();zm=(e,t)=>{!tn.default.existsSync(e)||tn.default.existsSync(t)||(tn.default.mkdirSync(rn.default.dirname(t),{recursive:!0}),tn.default.renameSync(e,t))},Kb=e=>{if(e.profileEmail===null)return;let t=rn.default.join(e.installDir,_e);zm(rn.default.join(t,Hn),e.mainLogPath),zm(rn.default.join(t,Dn),e.errorLogPath)},Km=e=>{let t=L();e!==void 0&&t.installDir!==e||Kb(t)}});var Ym,Xm,Ia,Oa,Zm=d(()=>{"use strict";Ym=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Xm=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?Ym(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?Ym(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Ia=e=>{let t=e.watchdogLogs.map(Xm).join(""),r=e.updateLogs.map(Xm).join("");return`<!doctype html>
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
</html>`},Oa=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Qm,ep,tp=d(()=>{"use strict";Qm=g(require("node:net")),ep=()=>new Promise((e,t)=>{let r=Qm.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var rp,Jb,Na,np=d(()=>{"use strict";rp=g(require("node:net"));tp();Vt();Fr();R();Jb=e=>new Promise(t=>{let r=rp.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Na=async()=>{let e=w(),t=ie();if(await Jb(t))return $d(t),t;let r=await ep();return xo(e,r),r}});var Yb,Ma,op=d(()=>{"use strict";Yb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ma=e=>({force:Yb(e)&&e.force===!0})});var Ha,Xb,qe,ms=d(()=>{"use strict";Ha=g(require("node:os")),Xb=e=>{let t=e.trim();return t.startsWith("~/")?`${Ha.default.homedir()}${t.slice(1)}`:t==="~"?Ha.default.homedir():t},qe=Xb});var bt,ze,nn=d(()=>{"use strict";bt=g(require("node:path"));It();ms();ze=e=>{let t=qe(e),r=bt.default.join(t,Wc);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:bt.default.join(r,"rag"),memoryDirPath:bt.default.join(r,wc),reportsDirPath:bt.default.join(r,Ec),metaFilePath:bt.default.join(r,vc),ragChunksFilePath:bt.default.join(r,"rag",Vn)}}});var fe,ip,Zb,Qb,Le,on=d(()=>{"use strict";fe=g(require("node:fs")),ip=g(require("node:path"));It();nn();Zb=(e,t)=>{if(fe.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};fe.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},Qb=e=>{fe.default.existsSync(e.ragChunksFilePath)||fe.default.writeFileSync(e.ragChunksFilePath,"");let t=ip.default.join(e.memoryDirPath,qn);fe.default.existsSync(t)||fe.default.writeFileSync(t,"")},Le=e=>{let t=ze(e.projectFolderPath);return fe.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),fe.default.mkdirSync(t.ragDirPath,{recursive:!0}),fe.default.mkdirSync(t.memoryDirPath,{recursive:!0}),Zb(t,e),Qb(t),{ok:!0,layout:t}}});var eW,Da,ap=d(()=>{"use strict";on();eW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Da=e=>{if(!eW(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Le({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Y=d(()=>{"use strict";sa();qi();Zm();np();op();ap();Gn();Zn();Rt()});var lp,x,cp,dp,ps,he=d(()=>{"use strict";lp=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},x=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},cp=e=>{e.writeHead(403),e.end()},dp=e=>e.url?.split("?")[0]??"/",ps=(e,t,r=20,n=200)=>{let o=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(o.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,n):r}});var tW,up,mp=d(()=>{"use strict";Y();he();tW=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return x(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},up=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return x(e.response,200,$o(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await tW(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let n=Uo(t);return x(e.response,n.ok?200:400,n,e.cors.headers),!0}let r=await jo(t);return x(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var rW,pp,gp=d(()=>{"use strict";Y();he();rW=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return x(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},pp=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await rW(e);if(t===null)return!0;let r=Fo(t);return x(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var fp,hp=d(()=>{"use strict";Y();he();fp=async e=>{if(e.request.method!=="POST"||e.pathname!=="/projects/ensure")return!1;let t=await e.readJsonBody(),r=Da(t);return x(e.response,r.ok?200:400,r,e.cors.headers),!0}});var yp,Ap=d(()=>{"use strict";Y();yp=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Jt(50),r=Yt(50);return e.response.writeHead(200,Oa()),e.response.end(Ia({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var Sp,_p=d(()=>{"use strict";Y();he();Sp=e=>e.request.method==="GET"&&e.pathname==="/health"?(x(e.response,200,Bo(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(x(e.response,200,Go(),e.cors.headers),!0):!1});var bp,Wp=d(()=>{"use strict";Y();he();bp=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Xo();return x(e.response,t.ok?200:503,t,e.cors.headers),!0}});var wp,vp=d(()=>{"use strict";Y();he();wp=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await zo();return x(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Ko();return x(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Vo();return x(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var Ep,kp=d(()=>{"use strict";Y();he();Ep=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Jo();return x(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=ps(e.request,"/update/logs",20,200);return x(e.response,200,{ok:!0,logs:Yt(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=Ma(t),n=await Yo({force:r});return x(e.response,n.ok?200:503,n,e.cors.headers),!0}return!1}});var Lp,Rp=d(()=>{"use strict";Y();he();Lp=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await qo();return x(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=ps(e.request,"/watchdog/logs",20,200);return x(e.response,200,{ok:!0,logs:Jt(t)},e.cors.headers),!0}return!1}});var nW,xp,Pp=d(()=>{"use strict";mp();gp();hp();Ap();_p();Wp();vp();kp();Rp();Y();he();nW=(e,t,r,n)=>({request:e,response:t,wakePort:r,cors:n,pathname:dp(e),readJsonBody:()=>lp(e)}),xp=async(e,t,r)=>{let n=e.headers.origin,o=Vi(n);try{if(n!==void 0&&n.length>0&&!o.allowed){cp(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=nW(e,t,r,o);if(Sp(s)||yp(s)||await Lp(s)||await wp(s)||await Ep(s)||await bp(s)||await pp(s)||await fp(s)||await up(s))return;x(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{x(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}}});var Cp,sn,gs,Fa=d(()=>{"use strict";Cp=g(require("node:http"));Y();Pp();sn=async()=>{let e=await Na(),t=Cp.default.createServer((r,n)=>{xp(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},gs=sn});var oW,Tp=d(()=>{"use strict";Y();Fa();Fa();oW={};!re()&&ot(oW.url)&&(async()=>{rt("agent-witch-wake-server");let e=await sn(),t=_r(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var Ip=d(()=>{"use strict";Tp()});var Ua,Op=d(()=>{"use strict";Cr();ko();pt();Ua=async()=>{let e=D();if(e===null)return;let t=He(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await Gt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var Np,Mp=d(()=>{"use strict";La();Ip();Ca();Op();Np=async(e={})=>{let t=await gs();Ua();let r=setInterval(()=>{Ua()},6e4),n=setInterval(()=>{if(!Gm().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var an,fs,aW,Hp,Dp,hs,Fp,Up,ja,jp,ys,$p=d(()=>{"use strict";an=g(require("node:fs")),fs=g(require("node:path")),aW="pending-run-inputs.json",Hp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dp=e=>{let t=e.profileEmail?fs.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return fs.default.join(t,aW)},hs=e=>{let t=Dp(e);if(!an.default.existsSync(t))return{};try{let r=JSON.parse(an.default.readFileSync(t,"utf8"));return Hp(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!Hp(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},Fp=(e,t)=>{let r=Dp(e);an.default.mkdirSync(fs.default.dirname(r),{recursive:!0}),an.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Up=e=>Object.values(hs(e)),ja=(e,t)=>hs(e)[t]!==void 0,jp=(e,t)=>{let r=hs(e);r[t.agentRunId]=t,Fp(e,r)},ys=(e,t)=>{let r=hs(e);delete r[t],Fp(e,r)}});var $a,Bp=d(()=>{"use strict";$a={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var Ba,gx,Gp=d(()=>{"use strict";Ba={OPEN:"open",APPROVAL:"approval"},gx=Ba.APPROVAL});var ir,As,Vp,lW,qp,zp,Kp,Ss,Jp,Ga=d(()=>{"use strict";ir=g(require("node:fs")),As=g(require("node:path")),Vp="runs",lW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qp=e=>{let t=e.profileEmail!==null?As.default.join(e.installDir,"profiles",e.profileEmail,Vp):As.default.join(e.installDir,Vp);return ir.default.mkdirSync(t,{recursive:!0}),t},zp=(e,t)=>As.default.join(qp(e),`${t}.json`),Kp=(e,t)=>{ir.default.writeFileSync(zp(e,t.id),JSON.stringify(t,null,2))},Ss=(e,t)=>{let r=zp(e,t);if(!ir.default.existsSync(r))return null;try{let n=JSON.parse(ir.default.readFileSync(r,"utf8"));return!lW(n)||typeof n.id!="string"?null:n}catch{return null}},Jp=e=>{let t=qp(e),r=ir.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Ss(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var cW,Yp,Xp=d(()=>{"use strict";Bp();Gp();Ga();cW=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?$a.COMPLETED:$a.FAILED,dispatchPolicy:Ba.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},Yp=(e,t)=>{let r=cW(t);return Kp(e,r),r}});var ln,_s,dW,Va,Zp,Qp,eg,qa,tg=d(()=>{"use strict";ln=g(require("node:fs")),_s=g(require("node:path"));Dt();dW="run-completion-outbox.json",Va=e=>{let t=e.profileEmail?_s.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return _s.default.join(t,dW)},Zp=e=>{let t=Va(e);if(!ln.default.existsSync(t))return[];try{let r=JSON.parse(ln.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},Qp=(e,t)=>{ln.default.mkdirSync(_s.default.dirname(Va(e)),{recursive:!0}),ln.default.writeFileSync(Va(e),JSON.stringify(t,null,2),"utf8")},eg=(e,t)=>{let r=[...Zp(e).filter(n=>n.runId!==t.runId),t];Qp(e,r)},qa=async e=>{if(e.cloudApi===null)return;let t=Zp(e.layout);if(t.length===0)return;let r=[];for(let n of t)await co(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);Qp(e.layout,r)}});var rg=d(()=>{"use strict"});var za,cn,mW,Wt,ng=d(()=>{"use strict";rg();za=new Map,cn=e=>{let t=za.get(e);t!==void 0&&(clearInterval(t),za.delete(e))},mW=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Wt=(e,t,r,n={})=>{cn(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){cn(t);return}let i=n.onTick?.()??{};mW(e,t,o,i)};s(),za.set(t,setInterval(s,15e3))}});var Ka,dn,wt,og,Ke,sg,bs=d(()=>{"use strict";Ka=new Set,dn=new Map,wt=(e,t)=>{if(t.length===0)return;let r=dn.get(e)??[];r.push(t),dn.set(e,r)},og=e=>{Ka.add(e);let t=dn.get(e)??[];return dn.delete(e),t},Ke=e=>Ka.has(e),sg=e=>{Ka.delete(e),dn.delete(e)}});var ig,ag,lg,cg,G,ar,dg,ug,un,mg,pg,Ja,gg,fg,hg,Ws=d(()=>{"use strict";ig=require("node:crypto"),ag=g(require("node:fs")),lg=g(require("node:path")),cg=require("node:url");Qr();Rt();ti();G=new Map,dg=async()=>{if(ar!==void 0)return ar;try{if(re()){let e=Mn(),t=lg.default.join(e,"deps","node-pty","lib","index.js");if(ag.default.existsSync(t)){let r=await import((0,cg.pathToFileURL)(t).href);return ar=r,r}}return ar=await import("node-pty"),ar}catch{return ar=null,null}},ug=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},un=(e,t,r)=>{let n=G.get(e);if(n!==void 0){G.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},mg=(e,t)=>{let r=G.get(e);return r===void 0?!1:(r.pty.write(t),!0)},pg=(e,t,r)=>{let n=G.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},Ja=e=>{for(let t of G.values())if(!(t.mode!=="agent"||t.runId!==e))return ke(t.pty.pid);return!1},gg=e=>{for(let[t,r]of G.entries())if(!(r.mode!=="agent"||r.runId!==e)){G.delete(t);try{r.pty.kill()}catch{}return!0}return!1},fg=async e=>{let t=await dg();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;G.get(e.shellSessionId)!==void 0&&un(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return G.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{ug(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{G.get(e.shellSessionId)?.pty===o&&(G.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},hg=async e=>{let t=e.shellSessionId??(0,ig.randomUUID)(),r=await dg();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return G.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{ug(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{G.get(t)?.pty===n&&(G.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var ws,yg,Ag=d(()=>{"use strict";ws="[[AWAITING_INPUT]]",yg=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",ws,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var mn,Sg,vs=d(()=>{"use strict";Ag();mn=e=>{let t=e.indexOf(ws);if(t<0)return null;let n=e.slice(t+ws.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},Sg=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",yg].join(`
`)});var _g,bg=d(()=>{"use strict";bs();Ws();vs();_g=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Ke(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}wt(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await hg({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=mn(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var Wg,wg,vg,Je,Es=d(()=>{"use strict";Wg=require("node:child_process"),wg=g(require("node:fs")),vg=g(require("node:path"));xt();Je=(e,t)=>{let r=vg.default.join(e,"app",ec,"ensure-writer.sh");return wg.default.existsSync(r)?new Promise((n,o)=>{let s=(0,Wg.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var Eg,vt,Ls,kg,Lg,ks,Rg,Rs,xg,Pg,pW,pn,gW,fW,Cg,Ya=d(()=>{"use strict";Eg=require("node:child_process");lt();Es();Or();dt();$e();ut();vt=new Map,Ls=e=>e==="cursor"||e==="antigravity",kg=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Lg=e=>vt.get(e)?.warmed===!0,ks=e=>{let t=vt.get(e);vt.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Rg=e=>vt.get(e)?.conversationStarted===!0,Rs=e=>{let t=vt.get(e);vt.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},xg=e=>{vt.delete(e)},Pg=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",pW={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},pn=e=>`${pW[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,gW=(e,t,r,n)=>new Promise(o=>{let s=wd(t,r),i=[],a=(0,Eg.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=u=>{let m=u.toString("utf8");i.push(m),n?.(m)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",u=>{o({exitCode:u??-1,output:i.join("").trim()})}),a.on("error",u=>{o({exitCode:-1,output:u.message})})}),fW=(e,t)=>{let r=pn(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Cg=async e=>{if(!H(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&K(e.runConfig.writerExecutionBackend)==="api"){let r=Ue(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let n=se(e.runConfig.layout.configPath);return je(n,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this Mac (no local CLI).
`),ks(e.writerAgent),{exitCode:0,output:pn(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await Je(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}Ls(e.writerAgent)&&ks(e.writerAgent);let t=await gW(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?fW(e.writerAgent,t.output):pn(e.writerAgent)}}});var Tg,gn,M,Xa,Ig,Og,Za,Ng,Mg,Hg,hW,ce,fn,Ye,Dg,yW,AW,Qa,Fg,Ug,jg,$g=d(()=>{"use strict";Tg=require("node:child_process");lt();$p();Xp();tg();ng();Qr();bs();Ws();vs();bg();Ya();xi();Mi();$e();wr();vs();gn=new Map,M=new Map,Xa=new Set,Ig=130,Og=`

Stopped by user.`,Za=null,Ng=e=>{Za=e},Mg=async e=>{await qa({layout:e,cloudApi:Za})},Hg=e=>{let t=gn.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:ke(t.pid)},hW=e=>Fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),ce=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},fn=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Jn(s),c=M.get(r);if(a!==null&&c!==void 0){let u=Mc(a),m=Hg(r)||Ja(r);u!==null&&!m&&Ye(e,t,r,n,u.exitCode,u.output,c.originalPrompt)}return Nc(a)}}),Ye=(e,t,r,n,o,s,i,a)=>{let c=o,u=mo(s,a);r!==void 0&&Xa.has(r)&&(Xa.delete(r),c=Ig,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${Og}`:"Stopped by user."),r!==void 0&&(cn(r),Ke(r)&&(ce(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),sg(r)),Yp(e.layout,{agentRunId:r,originalPrompt:i,exitCode:c,output:u,layout:e.layout}),eg(e.layout,{runId:r,exitCode:c,output:u,createdAt:new Date().toISOString()}),qa({layout:e.layout,cloudApi:Za}),M.delete(r),gn.delete(r),ys(e.layout,r)),ce(t,{type:"command.claude.result",payload:{exitCode:c,output:u,...r!==void 0?{agentRunId:r}:{},...a!==void 0?{llmUsage:a}:{}},requestId:n})},Dg=(e,t,r,n,o,s,i)=>{let a=M.get(r),c=a?.accumulatedOutput??s;jp(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),Wt(t,r,()=>ja(e.layout,r),fn(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),ce(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},yW=(e,t,r,n,o,s,i)=>{let a=[],c=!1,u=m=>{if(!(o===void 0||m.length===0)){if(Ke(o)){ce(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:m},requestId:n});return}wt(o,m)}};if(o!==void 0){let m=M.get(o);gn.set(o,t),M.set(o,{originalPrompt:s,writerAgent:i,projectFolderPath:m?.projectFolderPath,reportKey:m?.reportKey,accumulatedOutput:m?.accumulatedOutput??""}),ce(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Wt(r,o,()=>Hg(o),fn(e,r,o,n,m?.projectFolderPath,m?.reportKey))}t.stdout?.on("data",m=>{let h=m.toString("utf8");if(a.push(h),u(h),c||o===void 0)return;let W=mn(a.join(""));if(W!==null){c=!0,t.kill("SIGTERM");let A=M.get(o),f=[A?.accumulatedOutput??"",W.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),gn.delete(o),Dg(e,r,o,n,W.question,f,s)}}),t.stderr?.on("data",m=>{let h=m.toString("utf8");a.push(h),u(h)}),t.on("close",m=>{if(c)return;Rs(i);let h=o!==void 0?M.get(o):void 0,W=a.join("").trim(),A=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${W}`.trim():W;Ye(e,r,o,n,m??-1,A,s)}),t.on("error",m=>{c||Ye(e,r,o,n,-1,m.message,s)})},AW=(e,t,r,n,o,s,i,a)=>{s!==void 0&&(M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),ce(o,{type:"terminal.stream.start",payload:{runId:s},requestId:n}),Wt(o,s,()=>M.has(s),fn(e,o,s,n,i,a))),_o(e,t,r,u=>{if(!(s===void 0||u.length===0)){if(Ke(s)){ce(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:u},requestId:n});return}wt(s,u)}}).then(u=>{Rs(t),Ye(e,o,s,n,u.exitCode,u.output,r,u.llmUsage)}).catch(u=>{let m=u instanceof Error?u.message:String(u);Ye(e,o,s,n,-1,m,r)})},Qa=(e,t,r,n,o,s,i,a,c,u)=>{if(So(e,t)){AW(e,t,r,n,o,s,c,u);return}let m=Ft(t,r,hW(e),i);if(m===null){Ye(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let h=()=>{let W=(0,Tg.spawn)(m.command,[...m.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});yW(e,W,o,n,s,r,t)};if(s===void 0){h();return}M.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:u,accumulatedOutput:M.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&u!==void 0&&u.trim().length>0&&Yn({reportKey:u,agentRunId:s,userSummary:"Task started on your Mac."}),Wt(o,s,()=>M.has(s),fn(e,o,s,n,c,u)),_g({socket:o,sendMessage:ce,requestId:n,agentRunId:s,shellSessionId:a,command:m.command,args:m.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:W=>{a!==void 0&&un(a,l=>{ce(o,l)},n);let A=M.get(s),f=[A?.accumulatedOutput??"",W.partialOutput].filter(l=>l.length>0).join(`

`);A!==void 0&&(A.accumulatedOutput=f),Dg(e,o,s,n,W.question,f,r)},onFinished:(W,A)=>{Rs(t);let f=M.get(s),l=f!==void 0&&f.accumulatedOutput.length>0?`${f.accumulatedOutput}

${A}`.trim():A;Ye(e,o,s,n,W,l,r)}}).then(W=>{if(!W){h();return}Wt(o,s,()=>Ja(s),fn(e,o,s,n,c,u))}).catch(W=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",W instanceof Error?W.message:W),h()})},Fg=(e,t,r,n)=>{ys(e.layout,t.agentRunId),t.shellSessionId!==void 0&&ce(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=Sg(t),s=M.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Qa(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c)},Ug=(e,t)=>{for(let r of Up(e.layout))M.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Wt(t,r.agentRunId,()=>ja(e.layout,r.agentRunId),{awaitingInput:!0}),ce(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},jg=(e,t,r,n)=>{let o=M.get(r);if(o===void 0)return!1;Xa.add(r),cn(r);let s=gn.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(gg(r))return!0;ys(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${Og}`:"Stopped by user.";return Ye(e,t,r,n,Ig,i,o.originalPrompt),!0}});var SW,Bg,Gg=d(()=>{"use strict";Vt();SW=()=>`http://127.0.0.1:${ie()}/restart`,Bg=async()=>{try{let e=await fetch(SW(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Et,el,_W,bW,tl,kt,xs,Vg,Ps=d(()=>{"use strict";Et=g(require("node:fs")),el=g(require("node:path")),_W="local-ws-traffic.ndjson",bW=500,tl=e=>el.default.join(e.logsDir,_W),kt=(e,t)=>{let r=tl(e);Et.default.mkdirSync(el.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Et.default.appendFileSync(r,`${n}
`,"utf8")},xs=(e,t=bW)=>{let r=tl(e);if(!Et.default.existsSync(r))return[];let o=Et.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},Vg=e=>{let t=tl(e);Et.default.existsSync(t)&&Et.default.writeFileSync(t,"","utf8")}});var WW,Cs,rl=d(()=>{"use strict";Vt();WW=()=>`http://127.0.0.1:${ie()}/update/run`,Cs=async e=>{try{let t=await fetch(WW(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var qg,zg=d(()=>{"use strict";qg=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var hn,wW,Kg,Jg=d(()=>{"use strict";Ps();st();rl();zg();hn=(e,t)=>{kt(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},wW=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ht(),no)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},Kg=async e=>{let t=z(e.layout.installDir)?.bundleVersion??null;if(!qg({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),hn(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await Cs({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),hn(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await wW();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),hn(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),hn(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),hn(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var vW,Yg,Xg=d(()=>{"use strict";vW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yg=e=>{if(!vW(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Zg,Qg,ef=d(()=>{"use strict";Li();ko();Zg=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=ao({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Qg=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Gt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var te,EW,kW,LW,tf,rf,nf,of,sf,af,lf=d(()=>{"use strict";te=require("node:crypto"),EW=Buffer.from("302a300506032b6570032100","hex"),kW=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},LW=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,te.createPublicKey)({key:Buffer.concat([EW,t]),format:"der",type:"spki"})},tf=()=>{let{publicKey:e,privateKey:t}=(0,te.generateKeyPairSync)("ed25519");return{publicKeyRaw:kW(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},rf=e=>(0,te.createPrivateKey)(e),nf=(e,t)=>(0,te.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),of=(e,t,r)=>{try{let n=LW(e);return(0,te.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},sf=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,af=()=>(0,te.randomBytes)(32).toString("base64url")});var Re,Ts,cf,RW,xW,nl,df,uf,ol=d(()=>{"use strict";Re=g(require("node:fs")),Ts=g(require("node:path"));lf();R();cf=e=>Ts.default.join(e.installDir,Pt),RW=(e,t)=>{if(e.profileEmail===null||t===cf(e)||Re.default.existsSync(t))return;let r=cf(e);Re.default.existsSync(r)&&(Re.default.mkdirSync(Ts.default.dirname(t),{recursive:!0}),Re.default.renameSync(r,t))},xW=e=>{if(!Re.default.existsSync(e))return null;try{let t=Re.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},nl=e=>{let t=cc(e);RW(e,t);let r=xW(t);if(r!==null)return r;let n=tf();return Re.default.mkdirSync(Ts.default.dirname(t),{recursive:!0}),Re.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},df=e=>{let t=nl(e.layout),r=af(),n=sf({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=rf(t.privateKeyPem),s=nf(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},uf=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return of(e.serverPublicKey,t,e.serverAttestation)}});var lr,mf=d(()=>{"use strict";lr={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status"}});var pf=d(()=>{"use strict";mf()});var sl=d(()=>{"use strict";pf()});var PW,gf,CW,ff,hf=d(()=>{"use strict";sl();PW=new Set(Object.values(lr)),gf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),CW=e=>{if(!gf(e))return!1;let t=e.type;return!(typeof t!="string"||!PW.has(t)||e.payload!==void 0&&!gf(e.payload)||e.requestId!==void 0&&typeof e.requestId!="string")},ff=CW});var TW,yf,Af,Sf=d(()=>{"use strict";hf();sl();TW=new Set(Object.values(lr)),yf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Af=e=>{if(!yf(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;return typeof t!="string"?{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e}:TW.has(t)?e.payload!==void 0&&!yf(e.payload)?{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:e.requestId!==void 0&&typeof e.requestId!="string"?{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e}:ff(e)?{formatOk:!0,formatError:null,command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}:{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e}}});var _f,bf=d(()=>{"use strict";_f=(e,t=4,r=4)=>{let n=e.length;return n===0?"***":n<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(n-r)}`}});var IW,OW,NW,yn,Wf=d(()=>{"use strict";bf();IW=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,OW=e=>IW.test(e),NW=e=>_f(e),yn=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(n=>yn(n));if(typeof e!="object")return e;let t=e,r={};for(let[n,o]of Object.entries(t)){if(typeof o=="string"&&OW(n)){r[n]=NW(o);continue}r[n]=yn(o)}return r}});var ye,il,MW,HW,DW,al,wf,vf,Ef,FW,ll,cr,cl,kf,Is=d(()=>{"use strict";ye=g(require("node:fs")),il=g(require("node:path"));Sf();Wf();MW="local-ws-trace.ndjson",HW=1e4,DW=1440*60*1e3,al=e=>il.default.join(e.logsDir,MW),wf=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},vf=e=>{if(!ye.default.existsSync(e))return;let t=ye.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-DW,o=t.filter(s=>{let i=wf(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-HW);ye.default.writeFileSync(e,o.length>0?`${o.join(`
`)}
`:"","utf8")},Ef=(e,t)=>{let r=al(e);ye.default.mkdirSync(il.default.dirname(r),{recursive:!0}),ye.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),vf(r)},FW=e=>e.parsed===null?{_empty:!0}:yn(e.parsed),ll=(e,t,r)=>{let n=Af(r);Ef(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:n.command,type:n.type,requestId:n.requestId,formatOk:n.formatOk,formatError:n.formatError,body:FW(n)})},cr=(e,t)=>{Ef(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:yn({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},cl=(e,t=80)=>{let r=al(e);if(vf(r),!ye.default.existsSync(r))return[];let n=ye.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n.slice(-t)){let i=wf(s);i!==null&&o.push(i)}return o.reverse()},kf=e=>{let t=al(e);ye.default.existsSync(t)&&ye.default.writeFileSync(t,"","utf8")}});var Lf,Rf,xf=d(()=>{"use strict";Is();Lf=!1,Rf=e=>{Lf||(Lf=!0,process.on("uncaughtException",t=>{cr(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",n=t instanceof Error?t.stack:void 0;cr(e,{kind:"crash",message:r,stack:n})}))}});var Pf=d(()=>{"use strict";Di()});var Lt,UW,Cf,Tf=d(()=>{"use strict";Lt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UW=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},Cf=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,n)=>{let o=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Lt(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Lt(r.direction):Lt(r.kind),i=`trace-body-${n}`,a=Lt(UW(r.body));return`<tr>
        <td title="${Lt(r.at)}">${Lt(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Lt(r.command)}</code></td>
        <td>${o}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var An,Os,jW,$W,BW,GW,If,VW,qW,Of,Sn,Nf,_n,Mf,dl=d(()=>{"use strict";An=g(require("node:fs")),Os=g(require("node:path"));It();nn();jW="rag",$W="http://127.0.0.1:11434",BW="nomic-embed-text",GW=e=>Os.default.join(e.installDir,jW),If=(e,t)=>t!==void 0&&t.trim().length>0?ze(t).ragChunksFilePath:Os.default.join(GW(e),Vn),VW=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},qW=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},Of=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||$W,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||BW;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Sn=(e,t)=>{let r=If(e,t);if(!An.default.existsSync(r))return[];let n=An.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Nf=async e=>{let t=qW(e.text);if(t.length===0)return 0;let r=If(e.layout,e.projectFolderPath);An.default.mkdirSync(Os.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await Of(o);if(s===null)continue;let i={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};An.default.appendFileSync(r,`${JSON.stringify(i)}
`,"utf8"),n+=1}return n},_n=async e=>{let t=await Of(e.query);return t===null?[]:Sn(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:VW(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Mf=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var Hf,Df=d(()=>{"use strict";Hf=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Ff,Ns,Uf,Ms=d(()=>{"use strict";Df();Ff=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ns=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=Ff(e),r=Ff(Hf(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Uf=`(function () {
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
})();`});var dr,jf,$f=d(()=>{"use strict";dr=(e,t,r)=>e===1?t:r,jf=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${dr(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${dr(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${dr(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${dr(c,"week","weeks")} ago`;let u=Math.floor(a/30);if(u<12)return`${u} ${dr(u,"month","months")} ago`;let m=Math.floor(a/365);return`${m} ${dr(m,"year","years")} ago`}});var ul,Bf,Gf=d(()=>{"use strict";ul=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bf=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${ul(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${ul(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${ul(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Vf,qf,zf,Kf=d(()=>{"use strict";Vf=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,qf=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,zf=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var ur,Jf,Yf=d(()=>{"use strict";Ms();ur=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jf=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${ur(e.wakeError)}</div>`:"",a=Ns(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${ur(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${ur(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${ur(n)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${ur(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${ur(o)}</p>
      </a>
    </div>`}});var mr,zW,Xf,Zf=d(()=>{"use strict";mr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zW=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Xf=e=>{let t=zW.map(i=>`<option value="${mr(i.value)}">${mr(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this Mac on the cloud dashboard before delegating.</div>',n=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${mr(e.flashMessage)}</div>`:"",o=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${mr(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${mr(e.lastRunId)}</p>`:"";return`${n}${o}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${mr(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var ml,Qf,pl=d(()=>{"use strict";ml=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),n=t.slice(-4);return`${r}${"\u2022".repeat(12)}${n}`},Qf=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===ml(t)}});var eh,th=d(()=>{"use strict";eh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var V,KW,JW,gl,fl,rh,nh=d(()=>{"use strict";pl();Ir();th();Ii();V=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KW=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},JW=(e,t,r)=>{let n=e[t]?.apiKey;if(n!==void 0&&n.length>0){let o=ml(n);return`value="${V(o)}" placeholder="Paste a new key to replace"`}return`placeholder="${V(r)}"`},gl=(e,t,r,n,o)=>{let s=eh[t];return`<label class="field">
          <span class="field-label">${V(n)} API key \u2014 ${V(KW(e,t))} \xB7 <a class="field-link" href="${V(s.href)}" target="_blank" rel="noopener noreferrer">${V(s.label)}</a></span>
          <input class="input mono" type="password" name="${V(r)}" autocomplete="off" ${JW(e,t,o)} />
        </label>`},fl=(e,t,r,n)=>{let o=vd(e[t]?.model),s=new Set(Ti[t].map(c=>c.value)),i=Ti[t].map(c=>{let u=c.value===o?" selected":"";return`<option value="${V(c.value)}"${u}>${V(c.label)}</option>`}).join(""),a=o!==Ut&&!s.has(o)?`<option value="${V(o)}" selected>${V(o)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${V(n)}</span>
          <select class="input mono" name="${V(r)}">${i}${a}</select>
        </label>`},rh=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${V(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",n=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${gl(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${fl(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${gl(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${fl(e.secrets,"openai","openaiModel","OpenAI model")}
        ${gl(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${fl(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var oh,sh=d(()=>{"use strict";oh=`
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
`.trim()});var YW,XW,hl,ih,ah=d(()=>{"use strict";sh();Ms();YW=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,XW=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],hl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ih=e=>{let t=XW.map(s=>{let i=s.href===e.activePath;return`<a class="nav-link${i?" is-active":""}" href="${s.href}"${i?' aria-current="page"':""}>${s.label}</a>`}).join(""),r=hl(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"",o=hl(e.installBundleVersionLabel?.trim()??"unknown");return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${hl(e.title)} \xB7 Agent Witch Local</title>
  <style>${oh}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home, install bundle ${o}">
        ${YW}
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
  <script>${Uf}</script>
</body>
</html>`}});var Hs,Ds,yl=d(()=>{"use strict";Hs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ds=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Hs(e.syncMessage)}</p>`:"",n=Hs(e.manageHref),o=Hs(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Hs(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${n}" target="_blank" rel="noopener noreferrer">${o} \u2197</a></p>
    </div>`}});var Fs,lh,ch=d(()=>{"use strict";Fs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lh=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${Fs(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks on Agent Witch Live</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">Nothing installed yet. Install from Agent Witch Live (library or marketplace) \u2014 files land in your profile harness on this Mac. ${r}</p>
    </section>`;let n=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${Fs(s.name)}</strong> <span class="muted mono">(${Fs(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),o=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${Fs(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this Mac</h2>
      <p class="lede">${e.installed.sets.length} set(s) from Agent Witch Live. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${o}
      <ul class="harness-installed-set-list">${n}</ul>
    </section>`}});var ZW,dh,uh,mh=d(()=>{"use strict";ZW=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,dh=e=>e.kind==="folder",uh=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let u=s.children.get(a);if(u!==void 0&&dh(u)){s=u;continue}let m={kind:"folder",name:a,children:new Map};s.children.set(a,m),s=m}}let r=n=>{let o=[];for(let s of n.children.values()){if(dh(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(ZW)};return r(t)}});var ph,Al,gh=d(()=>{"use strict";ph=g(require("node:path")),Al=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Al(r.children,t)}</ul>
            </details>
          </li>`;let n=ph.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var fh,Xe,QW,ew,Us,tw,hh,yh=d(()=>{"use strict";yl();fh=g(require("node:path"));ch();mh();gh();Xe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QW=()=>`(() => {
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

})();`,ew=()=>`(() => {
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
})();`,Us=e=>{let t=Ds({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks on Agent Witch Live",body:"Install and update playbooks in the browser; this Mac keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=lh({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),n=e.flashError?`<div class="alert-error">${Xe(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Xe(e.flashMessage)}</div>`:"",o=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':tw(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
        <p class="muted">Advanced: pull rules from an existing folder on disk (does not replace installing from Agent Witch Live).</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",u=a?"":`<section class="card">
      <p class="eyebrow">Advanced</p>
      <h1>Import from disk</h1>
      <p class="lede">Scan a folder for existing <code>.cursor</code> rules and copy them into the profile harness on this Mac. Prefer installing playbooks from Agent Witch Live when possible.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Xe(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Xe(s)}" />
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
    <script>${QW()}</script>
    <script>${ew()}</script>`;return`${t}${r}${n}${c}${u}`},tw=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let u=uh(a.items.map(W=>({...W,relativePath:typeof W.relativePath=="string"&&W.relativePath.length>0?W.relativePath:fh.default.relative(a.sourceRoot,W.sourcePath).replaceAll("\\","/")}))),m=Al(u,Xe),h=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Xe(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Xe(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${h} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${m}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Xe(n)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},hh=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let u=Number.parseInt(c[1]??"",10),m=a.trim();Number.isFinite(u)&&m.length>0&&o.set(u,m)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),u=c===null?null:Number.parseInt(c,10),m=u!==null&&Number.isFinite(u)?o.get(u):void 0,h=e.get(`setName-${i}`)?.trim()??m??a,W=t.sets[i];if(W===void 0)continue;let A=a.length>0?a:W.proposedSlug,f=h.length>0?h:W.proposedName,l=r.size===0||r.has(i),S=W.items.map(y=>({id:y.id,kind:y.kind,title:y.title,sourcePath:y.sourcePath,include:l}));s.push({slug:A,name:f,items:S})}return s}});var bn,Sl,Sh,_h,rw,Wn,bh,Wh,_l,Ah,wh,bl=d(()=>{"use strict";bn=g(require("node:fs")),Sl=g(require("node:path")),Sh=require("node:crypto");ms();_h=e=>Sl.default.join(e.harnessRootDir,"projects-registry.json"),rw=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),Wn=e=>{let t=_h(e);if(!bn.default.existsSync(t))return[];try{let r=JSON.parse(bn.default.readFileSync(t,"utf8"));return rw(r)?r.projects.filter(n=>typeof n.id=="string"&&typeof n.name=="string"&&typeof n.projectFolderPath=="string").map(n=>({id:n.id,name:n.name,projectFolderPath:n.projectFolderPath,addedAt:typeof n.addedAt=="string"?n.addedAt:new Date().toISOString(),...typeof n.cloudProjectId=="string"&&n.cloudProjectId.length>0?{cloudProjectId:n.cloudProjectId}:{}})):[]}catch{return[]}},bh=(e,t)=>{bn.default.mkdirSync(e.harnessRootDir,{recursive:!0});let r={version:1,projects:[...t]};bn.default.writeFileSync(_h(e),`${JSON.stringify(r,null,2)}
`)},Wh=(e,t)=>{let r=qe(t.projectFolderPath),n=t.name?.trim()||Sl.default.basename(r)||"Project",o=Wn(e),s=o.find(a=>qe(a.projectFolderPath)===r);if(s!==void 0)return s;let i={id:(0,Sh.randomUUID)(),name:n,projectFolderPath:t.projectFolderPath.trim(),addedAt:new Date().toISOString()};return bh(e,[...o,i]),i},_l=(e,t)=>Wn(e).find(r=>r.id===t||r.cloudProjectId===t)??null,Ah=e=>qe(e),wh=(e,t)=>{let r=Wn(e),n=new Date().toISOString(),o=0,s=0,i=[...r];for(let a of t){let c=Ah(a.folderPath),u=i.findIndex(W=>W.cloudProjectId===a.id||W.id===a.id||Ah(W.projectFolderPath)===c);if(u===-1){i.push({id:a.id,cloudProjectId:a.id,name:a.name,projectFolderPath:a.folderPath,addedAt:n}),o+=1;continue}let m=i[u],h={...m,name:a.name,projectFolderPath:a.folderPath,cloudProjectId:a.id};(h.name!==m.name||h.projectFolderPath!==m.projectFolderPath||h.cloudProjectId!==m.cloudProjectId)&&(s+=1),i[u]=h}return bh(e,i),{added:o,updated:s}}});var vh,Eh=d(()=>{"use strict";vh=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var js,Wl,wn,nw,xe,$s,pr=d(()=>{"use strict";js=g(require("node:fs")),Wl=g(require("node:os")),wn=g(require("node:path")),nw=()=>js.default.realpathSync(wn.default.resolve(Wl.default.homedir())),xe=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?wn.default.join(Wl.default.homedir(),t.slice(1)):t,n;try{n=js.default.realpathSync(wn.default.resolve(r))}catch{return null}let o=nw();return n===o||n.startsWith(`${o}${wn.default.sep}`)?n:null},$s=e=>{let t=xe(e);if(t===null)return null;try{if(!js.default.statSync(t).isFile())return null}catch{return null}return t}});var de,gr,vn,ow,sw,iw,kh,Lh=d(()=>{"use strict";de=g(require("node:fs")),gr=g(require("node:path"));ms();on();Eh();pr();vn=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ow=e=>{if(!de.default.existsSync(e))return null;try{let t=JSON.parse(de.default.readFileSync(e,"utf8"));if(vn(t)&&t.version===1)return t}catch{return null}return null},sw=(e,t,r)=>{let n=r.trim();if(n.length===0)return null;let o=n.startsWith("shared/")?gr.default.join(e.harnessRootDir,n):gr.default.join(e.harnessSetsDir,t,n);if(!de.default.existsSync(o))return null;try{if(!de.default.statSync(o).isFile())return null}catch{return null}return o},iw=(e,t)=>{let r={};if(de.default.existsSync(e))try{let o=JSON.parse(de.default.readFileSync(e,"utf8"));vn(o)&&(r=o)}catch{r={}}let n={...r,harnessSetSlugs:[...t],harnessAppliedAt:new Date().toISOString()};de.default.writeFileSync(e,`${JSON.stringify(n,null,2)}
`)},kh=e=>{let t=[...new Set(e.setSlugs.map(m=>m.trim()).filter(m=>m.length>0))];if(t.length===0)return{ok:!1,errorMessage:"Choose at least one harness set."};let r=qe(e.projectFolderPath),n=xe(r);if(n===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let o;try{o=de.default.statSync(n)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!o.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=ow(e.layout.harnessManifestPath);if(s===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let i=vn(s.sets)?s.sets:{},a=gr.default.join(n,".cursor"),c=0;for(let m of t){let h=i[m];if(!vn(h))return{ok:!1,errorMessage:`Harness set "${m}" is not installed locally.`};let W=Array.isArray(h.items)?h.items:[];for(let A of W){if(!vn(A))continue;let f=typeof A.path=="string"?A.path.trim():"";if(f.length===0)continue;let l=vh(f);if(l===null)continue;let S=sw(e.layout,m,f);if(S===null)continue;let y=gr.default.join(a,l);de.default.mkdirSync(gr.default.dirname(y),{recursive:!0}),de.default.copyFileSync(S,y),c+=1}}if(c===0)return{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."};let u=Le({projectFolderPath:n});return iw(u.layout.metaFilePath,t),{ok:!0,writtenFileCount:c,projectFolderPath:n,appliedSetSlugs:t}}});var Ze,wl,Rh=d(()=>{"use strict";Ze=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wl=e=>{let t=e.flashError?`<div class="alert-error">${Ze(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ze(e.flashMessage)}</div>`:"",r=new Set(e.linkedSetSlugs),n=e.installed.sets.length===0?'<p class="empty">No harness on this Mac yet. Use <a href="/harness?import=1">Harness \u2192 Import</a> first.</p>':`<ul class="harness-installed-set-list">${e.installed.sets.map(o=>`<li class="harness-installed-set">
          <label class="check-row">
            <input type="checkbox" name="applySet" value="${Ze(o.slug)}"${r.has(o.slug)?" checked":""} />
            <span><strong>${Ze(o.name)}</strong> <span class="muted mono">(${Ze(o.slug)})</span></span>
          </label>
          <p class="muted">${o.itemCount} item(s)</p>
        </li>`).join("")}</ul>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Ze(e.project.name)}</h1>
      <p class="muted mono">${Ze(e.project.projectFolderPath)}</p>
      <p class="lede">Linked harness sets are copied into this project&apos;s <code>.cursor</code> folder and recorded in <code>.agent-witch/project.json</code>.</p>
      <form method="POST" action="/projects/link-harness" class="stack">
        <input type="hidden" name="projectId" value="${Ze(e.project.id)}" />
        <p class="field-label">Harness sets</p>
        ${n}
        <div class="actions">
          <button class="btn btn-primary" type="submit"${e.installed.sets.length===0?" disabled":""}>Save linked harness</button>
        </div>
      </form>
    </section>`}});var Bs,xh,Ph=d(()=>{"use strict";yl();Bs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xh=e=>{let t=e.flashError?`<div class="alert-error">${Bs(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Bs(e.flashMessage)}</div>`:"",r=Ds({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/agent`,manageLabel:"Manage repositories on Agent Witch Live",body:"Repositories are created in the browser task composer. This page syncs them to this Mac so you can link playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),n=e.projects.length===0?'<p class="empty">No repositories synced yet. Add one in Agent Witch Live (task composer), then refresh this page.</p>':`<ul class="project-list">${e.projects.map(o=>{let s=o.cloudProjectId!==void 0?'<span class="project-live-badge">Live</span>':'<span class="project-local-badge">Mac only</span>';return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(o.id)}">
                  <strong>${Bs(o.name)}</strong> ${s}
                  <span class="muted mono">${Bs(o.projectFolderPath)}</span>
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
    </section>`}});var Ch,Th=d(()=>{"use strict";Dt();bl();Ch=async(e,t)=>{let r=De({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,syncedCount:0,message:"Could not sync \u2014 check pairing token and wsUrl in config.json."};let n=await bd(r);if(n===null)return{ok:!1,syncedCount:0,message:"Could not reach Agent Witch Live. Repositories may be Mac-only until the Mac client reconnects."};let{added:o,updated:s}=wh(e,n);return{ok:!0,syncedCount:n.length,message:n.length===0?"Synced with Agent Witch Live \u2014 no repositories yet. Add one in the task composer on the website.":`Synced ${n.length} repositor${n.length===1?"y":"ies"} from Agent Witch Live${o+s>0?` (${o} new, ${s} updated on this Mac)`:""}.`}}});var vl,El,Ih=d(()=>{"use strict";vl=g(require("node:fs"));nn();El=e=>{let t=ze(e);if(!vl.default.existsSync(t.metaFilePath))return[];try{let r=JSON.parse(vl.default.readFileSync(t.metaFilePath,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.harnessSetSlugs)?[]:r.harnessSetSlugs.filter(n=>typeof n=="string"&&n.length>0)}catch{return[]}}});var Ll,kl,En,Oh=d(()=>{"use strict";Ll=g(require("node:fs")),kl=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),En=e=>{if(!Ll.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Ll.default.readFileSync(e.harnessManifestPath,"utf8"));if(!kl(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,n=kl(t.sets)?t.sets:{},o=Object.entries(n).map(([s,i])=>{if(!kl(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,u=typeof i.updatedAt=="string"?i.updatedAt:"",m=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:m.length,updatedAt:u}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:o}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Rl,Nh=d(()=>{"use strict";Rl=()=>"~"});var Mh,xl,Hh=d(()=>{"use strict";Mh=require("node:child_process"),xl=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Mh.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var Dh,Fh,Uh=d(()=>{"use strict";Dh=require("node:crypto"),Fh=e=>`local-${(0,Dh.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Pl,jh=d(()=>{"use strict";Pl=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var kn,Gs,Cl=d(()=>{"use strict";kn=g(require("node:path")),Gs=e=>{let t=kn.default.dirname(e),r=kn.default.basename(t);return r==="agents"?kn.default.basename(kn.default.dirname(t)):r}});var Ln,Pe,$h,aw,lw,cw,Vs,Bh,Tl=d(()=>{"use strict";Ln=g(require("node:fs")),Pe=g(require("node:path"));Uh();jh();Cl();$h=new Set(["node_modules",".git","dist","build",".next","coverage"]),aw=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},lw=(e,t)=>{let r=Pe.default.basename(t);if(e==="skill"){let n=t.split(Pe.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},cw=e=>{let t=[],r=(o,s)=>{let i;try{i=Ln.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&$h.has(a.name))continue;let c=Pe.default.join(o,a.name),u=s?Pe.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,u);continue}if(!a.isFile())continue;Pl(u.replaceAll("\\","/"))!==null&&t.push({relativePath:u,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=Pe.default.join(e,o);Ln.default.existsSync(s)&&r(s,o)}let n=Pe.default.join(e,"skills");return Ln.default.existsSync(n)&&r(n,"skills"),t},Vs=e=>{let t=cw(e);if(t.length===0)return null;let r=Pe.default.dirname(e),n=Gs(e),o=aw(n),s=t.map(i=>{let a=Pl(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:Fh(i.absolutePath),kind:a,title:lw(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},Bh=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=Ln.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||$h.has(a.name))continue;let c=Pe.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var Gh,Il,dw,Vh,qh=d(()=>{"use strict";Gh=g(require("node:fs")),Il=g(require("node:path"));Tl();pr();dw=e=>{let t=xe(e.trim());if(t===null)return null;if(Il.default.basename(t)===".cursor")return t;let r=Il.default.join(t,".cursor");try{if(Gh.default.statSync(r).isDirectory())return xe(r)}catch{return null}return null},Vh=e=>{let t=dw(e.projectPath);if(t===null)return null;let r=Vs(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var zh,uw,qs,Kh,Jh=d(()=>{"use strict";zh=g(require("node:path"));Tl();pr();Cl();uw=5,qs=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Kh=e=>{let t=xe(e.scanRoot.trim());if(t===null)return qs(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of Bh(t,uw,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=xe(s);if(i===null)continue;let a=Gs(i);qs(e.response,"folder",{cursorDir:i,groupName:a,repoPath:zh.default.dirname(i)});let c=Vs(i);c!==null&&(r.push(c),qs(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(u=>u.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return qs(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var Yh,Xh,Zh=d(()=>{"use strict";Yh=g(require("node:path")),Xh=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:Yh.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var j,Qh,Ol,mw,ey,Nl,Ml,ty,zs,ry=d(()=>{"use strict";j=g(require("node:fs")),Qh=g(require("node:os")),Ol=g(require("node:path"));Ki();pr();Zh();mw=e=>{if(!j.default.existsSync(e))return null;try{let t=JSON.parse(j.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},ey=e=>{let t=e.hostname??Qh.default.hostname(),r=mw(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(m=>m.include);if(a.length===0)continue;let c=[];for(let m of a){let h=$s(m.sourcePath);if(h===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${m.sourcePath}`};let W=j.default.readFileSync(h,"utf8");c.push({id:m.id,kind:m.kind,title:m.title,content:W,setSlugs:[i.slug]})}let u=To({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=u.manifest;for(let m of u.directories)o.add(m);for(let m of u.files)s.push(m),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{j.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)j.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Ol.default.join(e.layout.harnessRootDir,i.relativePath);j.default.mkdirSync(Ol.default.dirname(a),{recursive:!0}),j.default.writeFileSync(a,i.content)}return j.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Nl="reveal-cache.json",Ml=(e,t)=>{j.default.mkdirSync(e.harnessRootDir,{recursive:!0}),j.default.writeFileSync(`${e.harnessRootDir}/${Nl}`,`${JSON.stringify(t,null,2)}
`)},ty=e=>{let t=`${e.harnessRootDir}/${Nl}`;j.default.existsSync(t)&&j.default.unlinkSync(t)},zs=e=>{let t=`${e.harnessRootDir}/${Nl}`;if(!j.default.existsSync(t))return null;try{let r=JSON.parse(j.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return Xh(r)}catch{return null}return null}});var Hl,ny=d(()=>{"use strict";Hl=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Qe,oy,pw,sy,Dl,iy=d(()=>{"use strict";Qe=g(require("node:fs")),oy=g(require("node:path")),pw=256e3,sy=e=>{Qe.default.mkdirSync(oy.default.dirname(e),{recursive:!0}),Qe.default.writeFileSync(e,"","utf8")},Dl=(e,t=pw)=>{if(!Qe.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Qe.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Qe.default.openSync(e,"r");try{Qe.default.readSync(a,i,0,s,o)}finally{Qe.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let u=c.indexOf(`
`);u>=0&&(c=c.slice(u+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var ay,ly,Fl,cy,dy=d(()=>{"use strict";ay=require("node:crypto"),ly=g(require("node:fs"));Dt();bo();lt();pt();Fl=!1,cy=async e=>{if(Fl)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!H(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=D();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let n=De({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(n===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let o=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&ly.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,ay.randomUUID)();Fl=!0;try{if(await _d(n,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Bt({...r,workspace:o},e.writerAgent,t);return await co(n,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{Fl=!1}}});var Ks,uy,my=d(()=>{"use strict";Ks=g(require("node:fs"));Oi();uy=(e,t)=>{let r=Ao(e);Ks.default.mkdirSync(e,{recursive:!0}),Ks.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Ks.default.chmodSync(r,384)}catch{}}});var Rn,gw,Ul,py,gy=d(()=>{"use strict";Rn=g(require("node:fs"));dt();my();pl();Ir();$e();gw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ul=(e,t,r,n)=>{let o=e[t],s=r?.trim()??"",i=Qf(s,o?.apiKey)?"":s,a=i.length>0?i:o?.apiKey;if(a===void 0||a.length===0)return e;let c=n!==void 0?jt(n):o?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},py=e=>{let t=se(e.configPath),r={};if(Rn.default.existsSync(e.configPath))try{let o=JSON.parse(Rn.default.readFileSync(e.configPath,"utf8"));gw(o)&&(r={...o})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Rn.default.mkdirSync(t,{recursive:!0}),Rn.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let n=Ul(Ul(Ul(ct(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);uy(t,n)}});var fy,et,jl=d(()=>{"use strict";fy=g(require("node:path"));wo();Fi();pt();Ot();R();et=e=>{let t=D()?.layout.installDir??w();if(fy.default.basename(t)===vo)return mt;let r=D(),n=r!==null?Z(r.wsUrl):null;if(n!==null&&n.length>0)return n;let o=e?.appOrigin?.trim();return o!==void 0&&o.length>0?o.replace(/\/$/,""):mt}});var hy,yy=d(()=>{"use strict";st();Ht();jl();hy=async e=>{let t=z(e.installDir),r=t?.bundleVersion??null,n=et(t);try{let o=await _i(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Qn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Ay,Sy=d(()=>{"use strict";Ay=e=>!e});var _y,by,Wy=d(()=>{"use strict";rl();_y=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},by=async()=>{let e=await Cs({force:!0});if(e.ok)return{ok:!0,message:_y(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:_y(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Ht(),no)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var Ey,xn,ky,Bl,wy,fw,$l,vy,F,Gl,O,X,fr,hw,yw,Ly,Ry,xy=d(()=>{"use strict";Ey=g(require("node:http")),xn=g(require("node:fs")),ky=g(require("node:path"));Pf();Ps();Is();Tf();dl();$r();zt();Ms();$f();Gf();Kf();Yf();Zf();nh();ah();yh();bl();Lh();Rh();Ph();Th();Ih();Oh();Nh();Hh();qh();pr();Jh();ry();on();ny();iy();st();dy();pt();gy();dt();ut();$e();jl();yy();Sy();Wy();ol();Bl=e=>jf(e)??"never",wy=48e3,fw=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,$l=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Rl(),reveal:t.reveal,installed:En(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),vy=async e=>{let t=D();if(t===null)return{ok:!1,message:"Mac client config missing \u2014 showing folders registered on this Mac only."};let r=await Ch(e,t);return{ok:r.ok,message:r.message}},F=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gl={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},O=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...Gl}),e.end(JSON.stringify(r))},X=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},fr=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},hw=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${F(e.status.wakeError)}</div>`:"",o=Ay(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Ns(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${F(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${F(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${F(Bl(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${F(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},yw=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},Ly=e=>{let t=ky.default.join(e.layout.installDir,"link-code.txt"),r=()=>z(e.layout.installDir),n=()=>{let A=r();return{installBundleVersion:Hl(A),installBundleUpdatedAt:A?.updatedAt??null,installVersion:A}},o=async A=>{let f=A.installVersion??r(),l=await i(),S=qf(l),y=zf(A.updateFlash??null);return ih({title:A.title,activePath:A.activePath,body:A.body,cloudAppOrigin:et(f),installBundleVersionLabel:Hl(f),prependBody:`${y}${S}`,headerUpdateButtonHtml:Vf(l)})},s=null,i=async()=>{let A=Date.now();if(s!==null&&A-s.cachedAtMs<6e4)return s.offer;let f=await hy(e.layout);return s={cachedAtMs:A,offer:f},f},a=()=>{s=null},c=!1,u=()=>{c||(c=!0,by().catch(A=>{console.error("[agent-witch-local-app] install bundle update failed:",A)}).finally(()=>{c=!1,a()}))},m=async A=>{if(a(),!(await i()).updateAvailable){A.writeHead(303,{Location:"/?update=ok"}),A.end();return}A.writeHead(303,{Location:"/?update=started"}),A.end(),u()},h=()=>{if(xn.default.existsSync(t))return xn.default.readFileSync(t,"utf8").trim();let A=Math.random().toString(36).slice(2,8).toUpperCase();return xn.default.writeFileSync(t,A,"utf8"),A},W=Ey.default.createServer((A,f)=>{(async()=>{let l=A.url?.split("?")[0]??"/",S=A.method??"GET";if(S==="OPTIONS"){f.writeHead(204,Gl),f.end();return}if(S==="GET"&&l==="/health"){let y=e.controllers.getStatus(),p=n();O(f,200,{ok:!0,...y,installBundleVersion:p.installBundleVersion,installBundleUpdatedAt:p.installBundleUpdatedAt});return}if(S==="GET"&&l==="/api/status"){let y=n();O(f,200,{...e.controllers.getStatus(),linkCode:h(),installBundleVersion:y.installBundleVersion,installBundleUpdatedAt:y.installBundleUpdatedAt});return}if(S==="GET"&&l==="/api/traffic"){O(f,200,{entries:xs(e.layout)});return}if(S==="DELETE"&&l==="/api/traffic"){Vg(e.layout),O(f,200,{ok:!0});return}if(S==="GET"&&l==="/api/trace"){O(f,200,{entries:cl(e.layout)});return}if(S==="DELETE"&&l==="/api/trace"||S==="POST"&&l==="/api/trace/clear"){if(kf(e.layout),S==="POST"){f.writeHead(303,{Location:"/status"}),f.end();return}O(f,200,{ok:!0});return}if(S==="POST"&&l==="/api/errors/clear"){sy(e.layout.errorLogPath),f.writeHead(303,{Location:"/errors"}),f.end();return}if(S==="GET"&&l==="/api/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(p.length>0){let _=await _n({layout:e.layout,query:p,limit:20});O(f,200,{chunks:_,query:p});return}O(f,200,{chunks:Sn(e.layout).slice(-50).reverse()});return}if(S==="POST"&&l==="/api/revive"){e.controllers.reviveWebSocket(),O(f,200,{ok:!0});return}if(S==="GET"&&l==="/api/update-status"){let y=await i();O(f,200,{ok:!0,...y});return}if((S==="GET"||S==="POST")&&l==="/api/update"){await m(f);return}if(S==="GET"&&l==="/"){let y=e.controllers.getStatus(),p=n(),_=En(e.layout),b=Dl(e.layout.errorLogPath);X(f,await o({title:"Home",activePath:"/",installVersion:p.installVersion,updateFlash:yw(A.url??void 0),body:Jf({wsConnected:y.wsConnected,lastHeartbeatAt:y.lastHeartbeatAt,installBundleVersion:p.installBundleVersion,harnessSetCount:_.sets.length,knowledgeChunkCount:Sn(e.layout).length,trafficEntryCount:xs(e.layout).length,wakeError:y.wakeError,errorLogByteSize:b.byteSize,errorLogExists:b.exists})}));return}if(S==="GET"&&l==="/task"){let y=e.controllers.getStatus(),p=n(),_=D(),b=new URL(A.url??"/",`http://127.0.0.1:${43347}`),v=b.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,k=b.searchParams.get("failed")==="1"?b.searchParams.get("error")?.trim()??"Task failed.":null,P=b.searchParams.get("runId");X(f,await o({title:"Task",activePath:"/task",installVersion:p.installVersion,body:Xf({defaultWorkspace:_?.workspace??"",wsConnected:y.wsConnected,flashMessage:v,flashError:k,lastRunId:P})}));return}if(S==="POST"&&l==="/task/dispatch"){let y=await fr(A),p=new URLSearchParams(y),_=p.get("prompt")?.trim()??"",b=p.get("writerAgent")?.trim()??"claude-cli",v=p.get("projectFolder")?.trim()??"",k=await cy({prompt:_,writerAgent:b,...v.length>0?{projectFolderPath:v}:{}}),P=new URLSearchParams;k.ok?P.set("ok","1"):(P.set("failed","1"),k.errorMessage!==void 0&&P.set("error",k.errorMessage.slice(0,240))),k.agentRunId!==void 0&&P.set("runId",k.agentRunId),f.writeHead(303,{Location:`/task?${P.toString()}`}),f.end();return}if(S==="GET"&&l==="/errors"){let y=n(),p=Dl(e.layout.errorLogPath);X(f,await o({title:"Errors",activePath:"/errors",installVersion:y.installVersion,body:Bf({errorLogPath:e.layout.errorLogPath,content:p.content,exists:p.exists,truncated:p.truncated,byteSize:p.byteSize})}));return}if(S==="GET"&&l==="/status"){let y=e.controllers.getStatus(),p=ae(e.layout),_=pe(p,me),b=n();X(f,await o({title:"Status",activePath:"/status",installVersion:b.installVersion,body:`${hw({status:y,stale:_,linkCode:h(),installBundleVersion:b.installBundleVersion,installBundleUpdatedAt:b.installBundleUpdatedAt})}${Cf({entries:cl(e.layout)})}`}));return}if(S==="GET"&&l==="/traffic"){let y=xs(e.layout),p=n(),_=y.map(v=>`<tr><td title="${F(v.at)}">${F(Bl(v.at))}</td><td>${F(v.direction)}</td><td><code>${F(v.type)}</code></td><td>${F(v.summary)}</td><td>${F(v.action??"")}</td></tr>`).join(""),b=y.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${_}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';X(f,await o({title:"Traffic",activePath:"/traffic",installVersion:p.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${b}
            </section>`}));return}if(S==="GET"&&l==="/projects"){let y=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),_=et(p.installVersion),b=await vy(e.layout),v=y.searchParams.get("added")==="1"?"Project added.":null;X(f,await o({title:"Projects",activePath:"/projects",installVersion:p.installVersion,body:xh({projects:Wn(e.layout),cloudAppOrigin:_,syncMessage:b.message,syncOk:b.ok,flashMessage:v})}));return}if(S==="GET"&&l==="/project"){let y=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=y.searchParams.get("id")?.trim()??"",_=n();await vy(e.layout);let b=_l(e.layout,p);if(b===null){f.writeHead(404),f.end("Project not found");return}let v=y.searchParams.get("linked")==="1"?`Harness linked (${y.searchParams.get("files")??"0"} file(s) written).`:null;X(f,await o({title:b.name,activePath:"/projects",installVersion:_.installVersion,body:wl({project:b,installed:En(e.layout),linkedSetSlugs:El(b.projectFolderPath),flashMessage:v})}));return}if(S==="POST"&&l==="/projects/add"){let y=xl();if(y===null){f.writeHead(303,{Location:"/projects"}),f.end();return}Le({projectFolderPath:y}),Wh(e.layout,{projectFolderPath:y}),f.writeHead(303,{Location:"/projects?added=1"}),f.end();return}if(S==="POST"&&l==="/projects/link-harness"){let y=await fr(A),p=new URLSearchParams(y),_=p.get("projectId")?.trim()??"",b=_l(e.layout,_);if(b===null){f.writeHead(404),f.end("Project not found");return}let v=p.getAll("applySet").map(P=>String(P)),k=kh({layout:e.layout,projectFolderPath:b.projectFolderPath,setSlugs:v});if(!k.ok){let P=n();X(f,await o({title:b.name,activePath:"/projects",installVersion:P.installVersion,body:wl({project:b,installed:En(e.layout),linkedSetSlugs:El(b.projectFolderPath),flashError:k.errorMessage})}));return}f.writeHead(303,{Location:`/project?id=${encodeURIComponent(b.id)}&linked=1&files=${k.writtenFileCount}`}),f.end();return}if(S==="GET"&&l==="/harness"){let y=new URL(A.url??"/",`http://127.0.0.1:${43347}`),p=n(),_=zs(e.layout),b=y.searchParams.get("submitted")==="1",v=b?y.searchParams.get("syncFailed")==="1"?`Local harness updated (${y.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:y.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${y.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":y.searchParams.get("stopped")==="1"?`Reveal stopped. ${_?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:y.searchParams.get("revealed")==="1"?`Reveal found ${_?.sets.length??0} set(s).`:null,k=_?.scanRoots[0]??Rl(),P=fw(e.layout,{reveal:_,importQuery:y.searchParams.get("import")==="1",justSubmitted:b}),$=et(p.installVersion);X(f,await o({title:"Harness",activePath:"/harness",installVersion:p.installVersion,body:Us($l(e.layout,{cloudAppOrigin:$,reveal:_,scanFolder:k,flashMessage:v,importSectionExpanded:P}))}));return}if(S==="POST"&&l==="/api/harness/pick-folder"){let y=xl();if(y===null){O(f,200,{cancelled:!0});return}O(f,200,{path:y});return}if(S==="GET"&&l==="/api/harness/file-content"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",_=$s(p);if(_===null){O(f,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let b=xn.default.readFileSync(_,"utf8"),v=b.length>wy?`${b.slice(0,wy)}
\u2026 (truncated)`:b;O(f,200,{content:v})}catch{O(f,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&l==="/api/harness/reveal/add-project"){let y=await fr(A),p="";try{let v=JSON.parse(y);typeof v=="object"&&v!==null&&typeof v.projectPath=="string"&&(p=v.projectPath.trim())}catch{O(f,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(p.length===0){O(f,400,{ok:!1,errorMessage:"projectPath is required."});return}let _=zs(e.layout),b=Vh({reveal:_,projectPath:p});if(b===null||b.sets.length===0){O(f,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Ml(e.layout,b),O(f,200,{ok:!0,setCount:b.sets.length});return}if(S==="GET"&&l==="/api/harness/reveal/stream"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(p.length===0){O(f,400,{errorMessage:"Choose a folder to scan first."});return}let _=!1;A.on("close",()=>{_=!0}),f.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...Gl});let b=Kh({scanRoot:p,response:f,shouldAbort:()=>_});Ml(e.layout,b),f.end();return}if(S==="POST"&&l==="/harness/reveal"){f.writeHead(410,{"Content-Type":"text/plain"}),f.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&l==="/harness/submit"){let y=zs(e.layout);if(y===null){let $=n(),Ae=et($.installVersion);X(f,await o({title:"Harness",activePath:"/harness",installVersion:$.installVersion,body:Us($l(e.layout,{cloudAppOrigin:Ae,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let p=await fr(A),_=new URLSearchParams(p),b=hh(_,y),v=ey({layout:e.layout,sets:b});if(!v.ok){let $=n(),Ae=et($.installVersion);X(f,await o({title:"Harness",activePath:"/harness",installVersion:$.installVersion,body:Us($l(e.layout,{cloudAppOrigin:Ae,reveal:y,flashError:v.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}ty(e.layout);let P=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";f.writeHead(303,{Location:`/harness?submitted=1&count=${v.writtenItemCount??0}${P}`}),f.end();return}if(S==="GET"&&l==="/writer-api"){let y=new URL(A.url??"/",`http://127.0.0.1:${43347}`),_=D()?.writerExecutionBackend??K(void 0),b=se(e.layout.configPath),v=ct(b),k=y.searchParams.get("saved")==="1"?"Writer API settings saved on this Mac.":null,P=n();X(f,await o({title:"Writer API",activePath:"/writer-api",installVersion:P.installVersion,body:rh({writerExecutionBackend:_,secrets:v,flashMessage:k})}));return}if(S==="POST"&&l==="/writer-api"){let y=await fr(A),p=new URLSearchParams(y),_=p.get("writerExecutionBackend")?.trim()??"cli";py({configPath:e.layout.configPath,writerExecutionBackend:K(_),anthropicApiKey:p.get("anthropicApiKey")??void 0,anthropicModel:p.get("anthropicModel")??void 0,openaiApiKey:p.get("openaiApiKey")??void 0,openaiModel:p.get("openaiModel")??void 0,googleApiKey:p.get("googleApiKey")??void 0,googleModel:p.get("googleModel")??void 0}),f.writeHead(303,{Location:"/writer-api?saved=1"}),f.end();return}if(S==="GET"&&l==="/knowledge"){let p=new URL(A.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",_=n(),v=(p.length>0?await _n({layout:e.layout,query:p,limit:20}):Sn(e.layout).slice(-50).reverse()).map(k=>`<article class="card"><div class="muted" title="${F(k.createdAt)}">${F(Bl(k.createdAt))}${k.source?` \xB7 ${F(k.source)}`:""}</div><pre>${F(k.text)}</pre></article>`).join("");X(f,await o({title:"Knowledge",activePath:"/knowledge",installVersion:_.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${F(p)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${v||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}S==="POST"&&await fr(A),f.writeHead(404),f.end("Not found")})().catch(l=>{console.error("[agent-witch-local-app]",l),f.writeHead(500),f.end("Internal error")})});return W.on("error",A=>{if(A.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",A)}),W.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Wo}`)}),W},Ry=e=>nl(e).publicKeyRaw});var Pn,Vl,Py,Cy,Ty,Iy,Oy=d(()=>{"use strict";Pn=g(require("node:fs")),Vl=g(require("node:path"));It();nn();Py=(e,t)=>Vl.default.join(ze(t).memoryDirPath,qn),Cy=(e,t)=>{let r=Py(e,t);if(!Pn.default.existsSync(r))return[];let n=Pn.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Ty=e=>{let t=Py(e.layout,e.projectFolderPath);Pn.default.mkdirSync(Vl.default.dirname(t),{recursive:!0}),Pn.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},Iy=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Ny,Aw,Sw,_w,My,Hy=d(()=>{"use strict";Ny=g(require("node:os"));R();Aw="Default",Sw=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),_w=e=>{let t=Ny.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},My=()=>{let e=L(),t=lc(e),r=Sw(Aw);return`${_w(t)}/${r.length>0?r:"project"}`}});var Dy,bw,Fy,Uy=d(()=>{"use strict";Dy=require("node:child_process");Es();lt();Or();dt();$e();ut();bw=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,Dy.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},Fy=async e=>{if(!H(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&K(e.runConfig.writerExecutionBackend)==="api"){let r=Ue(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let n=se(e.layout.configPath),o=je(n,r),s=o!==null&&o.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await Je(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await bw(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var jy,$y=d(()=>{"use strict";jy=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var By,Gy,Vy=d(()=>{"use strict";By=require("node:crypto"),Gy=()=>(0,By.randomUUID)()});var Cn,Ww,qy,Js=d(()=>{"use strict";Cn="[[WORKING_ESTIMATE]]",Ww=["Put this marker on its own line:",Cn,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),qy=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",Ww,"","Task to estimate:",e.trim()].join(`
`)});var zy,Ky=d(()=>{"use strict";zy=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Jy,Yy=d(()=>{"use strict";Jy=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var ww,Xy,Zy=d(()=>{"use strict";Js();ww=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Xy=e=>{if(!e.includes(Cn))return null;let t=null;for(let r of e.matchAll(ww)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var Qy,eA=d(()=>{"use strict";bo();Js();Ky();Yy();Zy();wr();Qy=async e=>{let t=zy(e.wrappedPrompt),r=qy(t),n=await Bt(e.config,e.writerAgent,r),o=Xy(n.output),s=Jy(o);return Wr({reportKey:e.reportKey,agentRunId:e.agentRunId,status:ue.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var tA={};Ce(tA,{buildContinuationPromptWithContext:()=>kw});var vw,Ew,kw,rA=d(()=>{"use strict";vw=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Ew=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),kw=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=Ew(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${vw(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var nA={};Ce(nA,{readHarnessExportSets:()=>Rw});var Tn,ql,Ys,Lw,Rw,oA=d(()=>{"use strict";Tn=g(require("node:fs")),ql=g(require("node:path"));R();Ys=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lw=e=>{if(!Tn.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Tn.default.readFileSync(e.harnessManifestPath,"utf8"));if(Ys(t))return t}catch{return null}return null},Rw=(e,t)=>{let r=L(t),n=Lw(r);if(n===null)return[];let o=Ys(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!Ys(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],u=[];for(let m of c){if(!Ys(m))continue;let h=typeof m.path=="string"?m.path:void 0,W=typeof m.id=="string"?m.id:"",A=typeof m.kind=="string"?m.kind:"",f=typeof m.title=="string"?m.title:"";if(h===void 0||W.length===0||A.length===0||f.length===0)continue;let l=h.startsWith("shared/")?ql.default.join(r.harnessRootDir,h):ql.default.join(r.harnessSetsDir,i,h);Tn.default.existsSync(l)&&u.push({id:W,kind:A,title:f,content:Tn.default.readFileSync(l,"utf8")})}u.length>0&&s.push({name:a.name,slug:i,items:u})}return s}});var uA={};Ce(uA,{startAgentWitchClient:()=>$w});var Jl,In,hr,Bw,xw,Pw,Cw,Tw,sA,Iw,iA,aA,lA,zl,T,cA,I,Kl,Ow,Xs,Nw,Mw,Hw,Dw,Fw,Uw,jw,dA,$w,mA=d(()=>{"use strict";Jl=require("node:child_process"),In=g(require("node:fs")),hr=g(require("node:os"));Fm();Gn();fi();ci();Ca();Oe();qm();Jm();Mp();Vt();R();$g();Dt();Ws();Ya();Es();lt();Ga();$r();zt();bs();Gg();Jg();wo();st();Ot();Xg();ef();ol();Ps();Is();xf();xy();dl();Oy();Hy();on();Uy();ui();Zn();Rt();Kn();$y();Vy();Js();wr();eA();ji();ut();Bw={},xw="claude",Pw="codex",Cw="cursor",Tw="agy",sA=3e4,Iw=3e4,iA=new Map,aA=new Map,lA=new Map,zl=e=>{let t=e?.trim()??"";return t.length>0?t:My()},T=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cA=e=>{let t=L(e);if(!In.default.existsSync(t.configPath))return null;try{let r=JSON.parse(In.default.readFileSync(t.configPath,"utf8"));if(!T(r))throw new Error("Config must be a JSON object.");let n=typeof r.wsUrl=="string"?r.wsUrl.trim():"",o=Eo({installDir:t.installDir,configWsUrl:n}),s=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),i=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??xw,a=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??Pw,c=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??Cw,u=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??Tw,m=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",h=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return m.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:h,wsUrl:o,workspace:s,claudeCommand:i,codexCommand:a,cursorCommand:c,antigravityCommand:u,pairingToken:m,writerExecutionBackend:K(r.writerExecutionBackend),layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},I=(e,t,r)=>{e.readyState===Zr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(kt(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),ll(r,"out",t)))},Kl=e=>e,Ow=e=>{if(!In.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(In.default.readFileSync(e.harnessManifestPath,"utf8"));if(T(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Xs=(e,t)=>{let r=Ow(t);r!==null&&I(e,{type:"harness.manifest.report",payload:{hostname:hr.default.hostname(),manifest:r}})},Nw=async(e,t,r,n,o,s,i=!1,a,c,u,m)=>{if(!H(t)){I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=Ls(t)&&!Lg(t);if(h){try{await Je(e.layout.installDir,t)}catch(_){let b=_ instanceof Error?_.message:String(_);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}ks(t)}else if(!Ls(t))try{await Je(e.layout.installDir,t)}catch(_){let b=_ instanceof Error?_.message:String(_);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let W=i&&kg(t)&&Rg(t)?"continue":"first",A=r;if(i&&W==="first"&&typeof c=="string"&&c.length>0){let _=Ss(e.layout,c);if(_!==null){let{buildContinuationPromptWithContext:b}=await Promise.resolve().then(()=>(rA(),tA));A=b({priorPrompt:_.prompt,priorOutput:_.resultOutput??"",userMessage:r})}}let f=zl(u);Le({projectFolderPath:f});let l=await _n({layout:e.layout,query:A,limit:5,projectFolderPath:f}),S=Cy(e.layout,f),y=`${Iy(S)}${Mf(l)}${A}`,p=m?.trim()??(s!==void 0&&f.trim().length>0?Gy():void 0);if(s!==void 0&&p!==void 0&&p.length>0&&f.trim().length>0){Yn({reportKey:p,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let _=await Qy({config:e,writerAgent:t,wrappedPrompt:y,reportKey:p,agentRunId:s});if(_.estimateSeconds!==null){let b=`${Cn}
${_.estimateSeconds}
`;Ke(s)?I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:b},requestId:n}):wt(s,b)}y=jy(y,_),y=Cc(y,{agentRunId:s,reportKey:p,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}Qa(e,t,y,n,Kl(o),s,{sessionTurn:W},a,f,p),h&&s!==void 0&&I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Pg(t)},requestId:n})},Mw=async(e,t,r,n,o)=>{let s=(i,a)=>{I(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await Cg({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:m=>{i+=m,I(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:m},requestId:n})}}),c=H(t)?t:"claude-cli",u=a.exitCode!==0?a.output:i.length>0?pn(c):a.output;s(u,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Hw=(e,t,r)=>new Promise(n=>{if(!H(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=Ft(t,r,Fe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,Jl.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),Dw=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(I(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!H(o)){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let i=await(async()=>{try{await Je(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return Hw(e,o,s)})();I(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Xs(n,e.layout)},Fw=e=>{let t=1e3*2**e;return Math.min(Iw,t)},Uw=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,Bg().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,S="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,Kg({layout:e.layout,remoteBundleVersion:l,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=ae(e.layout);l!==null&&pe(l,me)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),A())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{if(t.socket===void 0)return;let l=t.socket;t.socket=void 0,t.wsConnected=!1,l.removeAllListeners("open"),l.removeAllListeners("message"),l.removeAllListeners("close"),l.on("error",()=>{}),(l.readyState===Zr.OPEN||l.readyState===Zr.CONNECTING)&&l.close()},u=()=>{i(),t.localHealthTimer=setInterval(o,sA)},m=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=Fw(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},l)},h=l=>{s();let S=()=>{let y=Vc(e.layout.installDir),p=ie();I(l,{type:"agent.heartbeat",payload:{hostname:hr.default.hostname(),macOsUsername:hr.default.userInfo().username,wakeError:t.wakeError,wakePort:p,...e.email!==null?{email:e.email}:{},installBundleVersion:y}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,sA)},W=(l,S)=>{if(typeof l.type!="string")return;kt(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"}),ll(e.layout,"in",l);let y=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&T(l.payload)){let p=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",_=typeof l.payload.origin=="string"?l.payload.origin:"",b=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",v=typeof l.payload.challenge=="string"?l.payload.challenge:"",k=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!uf({serverPublicKey:p,origin:_,devicePublicKey:b,challenge:v,serverAttestation:k})){t.wakeError="Server attestation verification failed",kt(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&T(l.payload)){let p=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";kt(e.layout,{direction:"local",type:"writer.ensure",summary:p,action:"ensure-writer"}),Fy({layout:e.layout,writerAgent:p,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(_=>{I(S,{type:"writer.status",payload:_},e.layout)})}if(l.type==="install.bundle.update"&&T(l.payload)){let p=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";p.length>0&&n(p,"install.bundle.update")}if(l.type==="system.ack"){Zi(e.layout,{wsUrl:e.wsUrl});let p=T(l.payload)?l.payload:null,_=Yg(p);_!==null&&n(_)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&T(l.payload)&&Zg(l.payload),l.type==="automations.run"&&T(l.payload)&&Qg(l.payload),l.type==="terminal.stream.accepted"&&T(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"";if(p.length>0){let _=og(p);for(let b of _)I(S,{type:"terminal.stream.chunk",payload:{runId:p,chunk:b},requestId:y})}}if(l.type==="agent.agentRun.list"&&I(S,{type:"dashboard.agentRun.list.result",payload:{runs:Jp(e.layout)},requestId:y}),l.type==="agent.agentRun.get"&&T(l.payload)){let p=typeof l.payload.runId=="string"?l.payload.runId:"",_=p.length>0?Ss(e.layout,p):null;I(S,{type:"dashboard.agentRun.get.result",payload:{run:_},requestId:y})}if(l.type==="command.claude.run"&&T(l.payload)){let p=l.payload.prompt,_=typeof l.payload.writerAgent=="string"&&H(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",b=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,v=l.payload.sessionContinuation===!0,k=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,P=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,$=zl(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),Ae=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof p=="string"&&p.trim().length>0&&(console.log(`[agent-witch] Running ${_} task (${v?"continue":"first"})\u2026`),b!==void 0&&P!==void 0&&iA.set(b,P),b!==void 0&&(aA.set(b,$),lA.set(b,p.trim()),Le({projectFolderPath:$})),Nw(e,_,p.trim(),y,S,b,v,P,k,$,Ae))}if(l.type==="shell.session.open"&&T(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",_=typeof l.payload.cols=="number"?l.payload.cols:120,b=typeof l.payload.rows=="number"?l.payload.rows:32;p.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),fg({shellSessionId:p,cwd:e.workspace,cols:_,rows:b,send:v=>{I(S,v)},requestId:y}))}if(l.type==="shell.session.close"&&T(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";p.length>0&&un(p,_=>{I(S,_)},y)}if(l.type==="shell.input"&&T(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",_=typeof l.payload.data=="string"?l.payload.data:"";p.length>0&&_.length>0&&mg(p,_)}if(l.type==="shell.resize"&&T(l.payload)){let p=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",_=typeof l.payload.cols=="number"?l.payload.cols:0,b=typeof l.payload.rows=="number"?l.payload.rows:0;p.length>0&&_>0&&b>0&&pg(p,_,b)}if(l.type==="command.writer.session.end"&&T(l.payload)){let p=l.payload.writerAgent;typeof p=="string"&&H(p)&&xg(p)}if(l.type==="command.writer.session.start"&&T(l.payload)){let p=l.payload.writerAgent,_=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof p=="string"&&H(p)&&_.length>0&&(console.log(`[agent-witch] Starting ${p} session\u2026`),Mw(e,p,_,y,S))}if(l.type==="command.claude.stop"&&T(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";p.length>0&&(console.log(`[agent-witch] Stopping run ${p}\u2026`),jg(e,Kl(S),p,y))}if(l.type==="command.claude.input_respond"&&T(l.payload)){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",_=typeof l.payload.response=="string"?l.payload.response.trim():"",b=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",v=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",k=typeof l.payload.question=="string"?l.payload.question:"";p.length>0&&_.length>0&&b.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),Fg(e,{agentRunId:p,originalPrompt:b,partialOutput:v,question:k,response:_,shellSessionId:iA.get(p)},y,Kl(S)))}if(l.type==="dispatch.approval.required"&&T(l.payload)){let p=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",_=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${p}: ${_}`),process.platform==="darwin"&&(0,Jl.spawn)("osascript",["-e",`display notification "${_.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${p.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&T(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),Dw(e,l.payload,y,S)),l.type==="harness.export.request"&&T(l.payload)){let p=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",_=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,b=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(v=>typeof v=="string"):[];p.length>0&&b.length>0&&(async()=>{let{readHarnessExportSets:v}=await Promise.resolve().then(()=>(oA(),nA)),k=v(b,e.email);I(S,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:p,..._!==void 0?{targetDeviceId:_}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:y})})()}if(l.type==="harness.manifest.request"&&Xs(S,e.layout),l.type==="command.claude.result"&&T(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let p=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,_=zl(p!==void 0?aA.get(p):void 0),b=p!==void 0?lA.get(p)??"":"";Nf({layout:e.layout,text:l.payload.output,source:p??"command.claude.result",projectFolderPath:_}),b.trim().length>0&&Ty({layout:e.layout,projectFolderPath:_,entry:{id:`${Date.now()}-${p??"run"}`,...p!==void 0?{agentRunId:p}:{},prompt:b,output:l.payload.output,createdAt:new Date().toISOString()}})}},A=()=>{if(t.stopped)return;a(),c();let l=new Zr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),Zi(e.layout,{wsUrl:e.wsUrl}),Ng(De({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),Mg(e.layout);let S=Z(e.wsUrl)??"http://localhost:3000",y=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),p=df({layout:e.layout,origin:S,...y!==void 0&&y.length>0?{claimToken:y}:{}});I(l,{type:"agent.register",payload:{role:"agent",hostname:hr.default.hostname(),macOsUsername:hr.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...p}},e.layout),Xs(l,e.layout),Ug(e,l),h(l)}),l.on("message",S=>{let y=typeof S=="string"?S:S.toString("utf8");try{let p=JSON.parse(y);if(!T(p))return;W(p,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",(S,y)=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1;let p=typeof y=="string"?y:y.toString("utf8");cr(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:p}),console.log("[agent-witch] Disconnected from server."),m()}),l.on("error",S=>{t.wakeError=S.message,cr(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})};return{connect:A,startLocalHealthCheck:u,stop:()=>{t.stopped=!0,s(),i(),a(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Ry(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Xs(l,e.layout),{ok:!0})}}},jw=async()=>{let e=()=>{let r=mc();if(r.length===0){let n=cA(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=cA(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},dA=async()=>{rt("agent-witch");let e=w();if(!Bm().ok){let{kickstartAgentWitchClientLaunchAgents:h}=await Promise.resolve().then(()=>(Si(),Ai));await h(e),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`),process.exit(0)}Km(e);let r=Vm({installDir:e});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),eo();let n=await jw(),o=n[0];o!==void 0&&Rf(o.layout);for(let h of n){let W=Z(h.wsUrl)??mt;qc(h.layout.installDir,W)}let s=n.map(h=>Uw(h)),i=s[0];i===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),Pa(),process.exit(0));let a=()=>{n.forEach((h,W)=>{let A=ae(h.layout);A!==null&&!pe(A,me)||s[W]?.reviveWebSocket()})},c=()=>{},u=await Np({reconnectWebSockets:a,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),c()}});Ly({layout:n[0].layout,controllers:{getStatus:i.getStatus,reviveWebSocket:a,reportHarnessManifestIfConnected:i.reportHarnessManifestIfConnected}});for(let h of s)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Bridging ${s.length} account profile(s) in one process.`);let m=_r(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Bn(),c()});c=()=>{m(),u.stop(),Pa(),console.log("[agent-witch] Shutting down.");for(let h of s)h.stop();process.exit(0)},process.on("SIGINT",()=>{c()}),process.on("SIGTERM",()=>{c()})},$w=dA;if(ot(Bw.url)&&!re()){let e=process.argv.indexOf("report");e>=0&&process.exit(Xn(process.argv.slice(e))),dA()}});Gn();ui();Zn();var Fc="20.x",Uc="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var BA=e=>[`Node.js ${Fc} or newer is required (found ${e}).`,Uc].join(" "),jc=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${BA(process.version)}
`),process.exit(1))};var zw={},Gw=async()=>{rt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Ht(),no)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},Vw=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(sa(),Ou)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},qw=async()=>{if(!ot(zw.url))return;jc();let e=process.argv.indexOf("report");e>=0&&process.exit(Xn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Gw();return}if(t==="wake"){await Vw();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(mA(),uA));await r()};qw();
