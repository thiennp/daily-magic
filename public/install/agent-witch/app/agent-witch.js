#!/usr/bin/env node
"use strict";var Sp=Object.create;var Wo=Object.defineProperty;var vp=Object.getOwnPropertyDescriptor;var _p=Object.getOwnPropertyNames;var bp=Object.getPrototypeOf,wp=Object.prototype.hasOwnProperty;var m=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var D=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Te=(e,t)=>{for(var r in t)Wo(e,r,{get:t[r],enumerable:!0})},xp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of _p(t))!wp.call(e,o)&&o!==r&&Wo(e,o,{get:()=>t[o],enumerable:!(n=vp(t,o))||n.enumerable});return e};var p=(e,t,r)=>(r=e!=null?Sp(bp(e)):{},xp(t||!e||!e.__esModule?Wo(r,"default",{value:e,enumerable:!0}):r,e));var qi,Ji,Ro=m(()=>{"use strict";qi=new Set(["","loginwindow","_mbsetupuser","root"]),Ji=5e3});var Yi,Fr,ko=m(()=>{"use strict";Yi=require("node:child_process"),Fr=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Yi.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Y,Ze=m(()=>{"use strict";Y=()=>!0});var Ur,Xi,Ep,Br,Lo=m(()=>{"use strict";Ur=p(require("node:path")),Xi=require("node:url");Ze();Ep={},Br=()=>{if(Y()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Ur.default.dirname(Ur.default.resolve(e))}return Ur.default.dirname((0,Xi.fileURLToPath)(Ep.url))}});var te,Zi,Qe=m(()=>{"use strict";te="agent-witch.js",Zi="command"});var To,na,x,Wp,Co,Po,Rp,kp,Lp,Cp,Pe,Tp,Qi,ea,ta,Io,re,$r,jr,ra,et,tt,_,oa,No,sa,ia,Gr,aa,la,ne,Oo,Pp,Ip,Se,Np,E,W=m(()=>{"use strict";To=p(require("node:fs")),na=p(require("node:os")),x=p(require("node:path"));Lo();Qe();Wp=Br(),Co=".agent-witch",Po=".local-agent-witch",Rp=47892,kp=47893,Lp="com.agent-witch",Cp="com.local-agent-witch",Pe="profiles",Tp="active-profile.json",Qi="harness",ea="sets",ta="manifest.json",Io="projects",re="logs",$r="agent-witch.log",jr="agent-witch.error.log",ra="reports",et="device-keypair.json",tt=e=>e.trim().toLowerCase(),_=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return x.default.resolve(e);let t=x.default.resolve(Wp),r=x.default.basename(t),n=x.default.basename(x.default.dirname(t));return r==="app"&&(n===Co||n===Po)?x.default.dirname(t):r===Co||r===Po?t:x.default.join(na.default.homedir(),Co)},oa=(e=_())=>x.default.join(e,"app"),No=(e=_())=>x.default.join(oa(e),te),sa=(e,t,r)=>t!==null?x.default.join(e,Pe,t,r):x.default.join(e,r),ia=e=>sa(e.installDir,e.profileEmail,Io),Gr=e=>sa(e.installDir,e.profileEmail,re),aa=e=>e.profileEmail!==null?x.default.join(e.installDir,Pe,e.profileEmail,et):x.default.join(e.installDir,et),la=e=>x.default.basename(e)===Po,ne=(e=_())=>la(e)?Cp:Lp,Oo=(e=_())=>la(e)?kp:Rp,Pp=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return tt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?tt(t):null},Ip=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Se=(e=_())=>{let t=x.default.join(e,Tp);if(!To.default.existsSync(t))return null;try{let r=JSON.parse(To.default.readFileSync(t,"utf8"));if(Ip(r)&&typeof r.email=="string"&&r.email.trim().length>0)return tt(r.email)}catch{return null}return null},Np=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?tt(r):null}let t=Pp();return t!==null?t:Se()},E=e=>{let t=_(),r=oa(t),n=No(t),o=Np(e);if(o!==null){let f=x.default.join(t,Pe,o),y=x.default.join(f,Qi),A=x.default.join(f,Io),c=x.default.join(f,re),S=x.default.join(f,ra),w=x.default.join(f,et),h=x.default.join(f,re,$r),v=x.default.join(f,re,jr);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:A,logsDir:c,mainLogPath:h,errorLogPath:v,reportsDir:S,deviceKeypairPath:w,configPath:x.default.join(f,"config.json"),harnessRootDir:y,harnessManifestPath:x.default.join(y,ta),harnessSetsDir:x.default.join(y,ea)}}let s=x.default.join(t,Qi),i=x.default.join(t,Io),a=x.default.join(t,re),l=x.default.join(t,ra),d=x.default.join(t,et),u=x.default.join(t,re,$r),g=x.default.join(t,re,jr);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:g,reportsDir:l,deviceKeypairPath:d,configPath:x.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:x.default.join(s,ta),harnessSetsDir:x.default.join(s,ea)}}});var Vr,Mo,ca,F,ua,Ie=m(()=>{"use strict";Vr=p(require("node:fs")),Mo=p(require("node:path"));W();ca=e=>{let t=Mo.default.join(e,Pe);return Vr.default.existsSync(t)?Vr.default.readdirSync(t).filter(r=>Vr.default.statSync(Mo.default.join(t,r)).isDirectory()).map(r=>tt(r)).toSorted():[]},F=(e=_())=>{let t=ne(e);return[{profileEmail:ca(e)[0]??null,launchAgentLabel:t}]},ua=(e=_())=>ca(e)});var zr,rt,da,Ho,ma,Op,ga,Mp,Hp,Mt,Dp,pa,Kr=m(()=>{"use strict";zr=require("node:child_process"),rt=p(require("node:fs")),da=p(require("node:os")),Ho=p(require("node:path")),ma=require("node:util");Ie();W();Op=(0,ma.promisify)(zr.execFile),ga=()=>Ho.default.join(da.default.homedir(),"Library","LaunchAgents"),Mp=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Op("launchctl",["bootout",r]).catch(()=>{})},Hp=e=>{let t=Ho.default.join(ga(),`${e}.plist`);rt.default.existsSync(t)&&rt.default.unlinkSync(t)},Mt=(e=_())=>{let t=ne(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of F(e))r.add(o.launchAgentLabel);let n=ga();if(rt.default.existsSync(n))for(let o of rt.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},Dp=e=>{(0,zr.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},pa=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=_();if(!rt.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Mt(e);for(let r of t)await Mp(r),Hp(r);return Dp(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var qr,Do=m(()=>{"use strict";ko();Kr();W();qr=(e=_())=>{for(let t of Mt(e))Fr(t)}});var fa,Fp,Up,ha,ya=m(()=>{"use strict";fa=require("node:child_process");Ro();Fp=e=>e.trim().toLowerCase(),Up=e=>e==null?!1:!qi.has(Fp(e)),ha=()=>{if(process.platform!=="darwin")return null;try{let t=(0,fa.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Up(t)?t:null}catch{return null}}});var Sa,Aa,oe,Ht=m(()=>{"use strict";Sa=p(require("node:os"));ya();Aa=e=>e.trim().toLowerCase(),oe=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?ha():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??Sa.default.userInfo().username;return Aa(r)===Aa(n)}});var nt,Jr,Yr=m(()=>{"use strict";Ro();Do();Ht();nt=e=>{oe()||(qr(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Jr=(e,t=Ji)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{oe()||e()},t);return()=>{clearInterval(r)}}});var va,_a,ba,Xr,Zr,wa,xa,ot=m(()=>{"use strict";va=".agent-witch",_a="memory",ba="project.json",Xr="chunks.ndjson",Zr="runs.ndjson",wa="reports",xa=".json"});var Ea,Qr,Fo=m(()=>{"use strict";Ea=p(require("node:path"));ot();Qr=(e,t)=>Ea.default.join(e.trim(),`${t.trim()}${xa}`)});var Ne,Wa,Ra=m(()=>{"use strict";Qe();Ne=e=>`'${e.replace(/'/g,"'\\''")}'`,Wa=e=>{let t=`${e.installDir.trim()}/${"app"}/${te}`,r=[Ne("node"),Ne(t),"report","write","--key",Ne(e.reportKey.trim()),"--agent-run-id",Ne(e.agentRunId.trim()),"--status",Ne(e.status),"--summary",Ne(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ne(e.details.trim())),r.join(" ")}});var X,ka,Bp,La,en=m(()=>{"use strict";Fo();Ra();X={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},ka=e=>e===X.COMPLETED||e===X.FAILED,Bp=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),La=(e,t)=>{let r=Qr(t.reportsDir,t.reportKey),n=Wa({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:X.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${Bp({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Dt,Ta,Ca,Pa,$p,tn,jp,Gp,Ft,rn,Ia,Na,Ut=m(()=>{"use strict";Dt=p(require("node:fs")),Ta=p(require("node:path"));en();Fo();W();Ca=50,Pa=e=>{let t=E(),r=Qr(t.reportsDir,e);return Dt.default.mkdirSync(Ta.default.dirname(r),{recursive:!0}),r},$p=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},tn=e=>{let t=Pa(e);if(!Dt.default.existsSync(t))return null;try{let r=JSON.parse(Dt.default.readFileSync(t,"utf8"));return $p(r)?r:null}catch{return null}},jp=(e,t)=>{let r=[...e,t];return r.length>Ca?r.slice(r.length-Ca):r},Gp=e=>{let t=Pa(e.reportKey);Dt.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Ft=e=>{let t=tn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:jp(t?.history??[],n)};return Gp(o),o},rn=e=>{let t=tn(e.reportKey);return t!==null?t:Ft({reportKey:e.reportKey,agentRunId:e.agentRunId,status:X.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Ia=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},Na=e=>{if(e===null||!ka(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===X.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Vp,zp,Bt,Oa,nn,Uo=m(()=>{"use strict";en();Ut();Vp=new Set(Object.values(X)),zp=e=>Vp.has(e),Bt=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},Oa=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},nn=e=>{if(e[0]!=="write")return Oa(),1;let r=Bt(e,"--key"),n=Bt(e,"--agent-run-id"),o=Bt(e,"--status"),s=Bt(e,"--summary"),i=Bt(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!zp(o)?(Oa(),1):(Ft({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var Bo,Ma,st,on=m(()=>{"use strict";Bo=p(require("node:path")),Ma=require("node:url");Ze();st=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Bo.default.resolve(t);return Y()?r===Bo.default.resolve(__filename):r===(0,Ma.fileURLToPath)(e)}});var $t,$o,Jp,Yp,Ua,z,Ba,$a,it=m(()=>{"use strict";$t=p(require("node:fs")),$o=p(require("node:path"));W();Jp="install-version.json",Yp=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ua=(e=_())=>$o.default.join(e,Jp),z=(e=_())=>{let t=Ua(e);if(!$t.default.existsSync(t))return null;try{let r=JSON.parse($t.default.readFileSync(t,"utf8"));return!Yp(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ba=(e,t=_())=>{let r=Ua(t);$t.default.mkdirSync($o.default.dirname(r),{recursive:!0}),$t.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},$a=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var Ga,Va,za,Ka,qa,jt,Xp,Zp,Qp,ja,ve,Gt=m(()=>{"use strict";Ga=require("node:child_process"),Va=p(require("node:fs")),za=p(require("node:os")),Ka=p(require("node:path")),qa=require("node:util");Ht();jt=(0,qa.promisify)(Ga.execFile),Xp=e=>Ka.default.join(za.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Zp=async e=>{try{return await jt("launchctl",["print",e]),!0}catch{return!1}},Qp=async(e,t,r)=>{await Zp(t)&&await jt("launchctl",["bootout",t]).catch(()=>{}),await jt("launchctl",["bootstrap",e,r]),await jt("launchctl",["enable",t])},ja=async e=>{try{return await jt("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ve=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!oe())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await ja(n))return{ok:!0};let o=Xp(e);if(!Va.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Qp(r,n,o),await ja(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var ef,sn,jo=m(()=>{"use strict";ko();Kr();Ie();W();ef=(e=_())=>{let t=new Set(F(e).map(r=>r.launchAgentLabel));return Mt(e).filter(r=>!t.has(r))},sn=(e=_())=>{for(let t of ef(e))Fr(t)}});var K,at=m(()=>{"use strict";K=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Ja,Oe,Go,tf,rf,Ya,lt,an,Vo=m(()=>{"use strict";Ja=require("node:crypto"),Oe=p(require("node:fs")),Go=p(require("node:path"));W();tf="self-update-log.ndjson",rf=100,Ya=(e=_())=>{let t=E(),r=t.installDir===e?t.logsDir:Gr({installDir:e,profileEmail:t.profileEmail});return Go.default.join(r,tf)},lt=(e,t=_())=>{let r={id:(0,Ja.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Ya(t);Oe.default.mkdirSync(Go.default.dirname(n),{recursive:!0});let o=Oe.default.existsSync(n)?Oe.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-rf+1)),JSON.stringify(r)];return Oe.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},an=(e=20,t=_())=>{let r=Ya(t);if(!Oe.default.existsSync(r))return[];let n=Oe.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Xa,Za,Qa=m(()=>{"use strict";Xa="deps.tar.gz",Za="deps"});var tl,_e,Me,nf,rl,nl,ol=m(()=>{"use strict";tl=require("node:child_process"),_e=p(require("node:fs")),Me=p(require("node:path"));Qa();nf=e=>Me.default.join(e,"app",Za),rl=e=>{let t=Me.default.join(e,"app"),r=Me.default.join(t,Xa);_e.default.existsSync(r)&&(_e.default.rmSync(nf(e),{recursive:!0,force:!0}),_e.default.mkdirSync(t,{recursive:!0}),(0,tl.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),_e.default.rmSync(r,{force:!0}))},nl=e=>{_e.default.rmSync(Me.default.join(e,"node_modules"),{recursive:!0,force:!0}),_e.default.rmSync(Me.default.join(e,"package.json"),{force:!0}),_e.default.rmSync(Me.default.join(e,"package-lock.json"),{force:!0})}});var qo={};Te(qo,{buildAgentWitchSelfUpdateStatus:()=>Ko,runAgentWitchSelfUpdate:()=>zo});var be,ln,sl,of,sf,af,lf,Vt,zo,Ko,cn=m(()=>{"use strict";be=p(require("node:fs")),ln=p(require("node:path"));it();Gt();jo();Ie();at();W();Qe();Vo();ol();sl=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),of=e=>{let t=Se(e),r=t===null?E():E(t);if(!be.default.existsSync(r.configPath))return null;try{let n=JSON.parse(be.default.readFileSync(r.configPath,"utf8"));return!sl(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},sf=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!sl(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},af=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=ln.default.join(t,r);be.default.mkdirSync(ln.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());be.default.writeFileSync(o,s),r.endsWith(".js")&&be.default.chmodSync(o,493)},lf=async()=>{sn();let e=F();for(let t of e)await ve(t.launchAgentLabel)},Vt=(e,t)=>({localBundleVersion:t,...e}),zo=async e=>{let t=_(),r=z(t),n=r?.bundleVersion??null,o=of(t),s=o===null?r?.appOrigin??null:K(o);if(s===null){let l=Vt({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return lt({event:"update_failed",ok:!1,message:l.message,localBundleVersion:n,remoteBundleVersion:null}),l}let i=await sf(s);if(i===null){let l=Vt({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return lt({event:"update_failed",ok:!1,message:l.message,localBundleVersion:n,remoteBundleVersion:null}),l}if(!(e?.force===!0||$a(n,i.bundleVersion))){let l=Vt({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:i.bundleVersion},n);return lt({event:"check_complete",ok:!0,message:l.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),l}try{for(let u of i.scripts)await af(s,t,u);let l=ln.default.join(t,te);be.default.existsSync(l)&&be.default.rmSync(l,{force:!0}),rl(t),nl(t),Ba({bundleVersion:i.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await lf();let d=Vt({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${i.bundleVersion}.`,remoteBundleVersion:i.bundleVersion},i.bundleVersion);return lt({event:"update_applied",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),d}catch(l){let d=l instanceof Error?l.message:"Agent Witch self-update failed.",u=Vt({ok:!1,updated:!1,message:d,remoteBundleVersion:i.bundleVersion},n);return lt({event:"update_failed",ok:!1,message:d,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),u}},Ko=()=>{let e=_();return{local:z(e),logs:an(20,e)}}});var un,zt,il,Jo,Kt,Yo=m(()=>{"use strict";un=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(l=>l.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},zt=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=un(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},il=e=>e>=1&&e<=5,Jo=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return un(t,"UTC")},Kt=e=>{let t=e.from??new Date,r=un(t,e.timeZone);if(e.preset==="hourly"){let l=r.minute>=0?r.hour+1:r.hour;return zt(r,e.timeZone,l,0)}let n=e.scheduleHour??9,o=zt(r,e.timeZone,n,0),s=un(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?zt(Jo(r),e.timeZone,n,0):o;if(!i&&il(s.weekday))return o;let a=r;for(let l=0;l<8;l+=1)if(a=Jo(a),il(a.weekday))return zt(a,e.timeZone,n,0);return zt(Jo(r),e.timeZone,n,0)}});var cf,dn,Xo=m(()=>{"use strict";cf=e=>e==="hourly"||e==="daily"||e==="weekdays",dn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!cf(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var qt,mn,al,ll,Zo,we,cl,ul,dl,ml,Jt=m(()=>{"use strict";qt=p(require("node:fs")),mn=p(require("node:path"));Xo();al="automations.json",ll=e=>e.profileEmail!==null?mn.default.join(e.installDir,"profiles",e.profileEmail,al):mn.default.join(e.installDir,al),Zo=()=>({version:1,automations:[]}),we=e=>{let t=ll(e);if(!qt.default.existsSync(t))return Zo();try{let r=JSON.parse(qt.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Zo():{version:1,automations:r.automations.flatMap(o=>{let s=dn(o);return s!==null?[s]:[]})}}catch{return Zo()}},cl=(e,t)=>{let r=ll(e);qt.default.mkdirSync(mn.default.dirname(r),{recursive:!0}),qt.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ul=(e,t)=>{cl(e,{version:1,automations:t})},dl=(e,t)=>{let n=we(e).automations.filter(o=>o.id!==t.id);cl(e,{version:1,automations:[...n,t]})},ml=(e,t)=>we(e).automations.find(r=>r.id===t)??null});var uf,df,gn,Qo=m(()=>{"use strict";Yo();Xo();Jt();W();uf=e=>e!==void 0&&e.trim().length>0?E(e.trim()):E(),df=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Kt({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Kt({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},gn=e=>{let t=uf(e.profileEmail),r=we(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=dn(s);return i!==null?[df(i,n.get(i.id))]:[]});return ul(t,o),{ok:!0,writtenCount:o.length}}});var gl,pl=m(()=>{"use strict";gl="x-agent-witch-token"});var pn,fl,hl,yl,fn=m(()=>{"use strict";pl();at();pn=e=>{let t=K(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},fl=e=>({[gl]:e,"Content-Type":"application/json"}),hl=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:fl(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},yl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:fl(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var hn,Yt,M,xe,Al,ct,ut=m(()=>{"use strict";hn={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Yt=e=>e.trim().length>0,M=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",xe=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:Yt(t)?t.trim():hn.claudeCommand,codexCommand:Yt(r)?r.trim():hn.codexCommand,cursorCommand:Yt(n)?n.trim():hn.cursorCommand,antigravityCommand:Yt(o)?o.trim():hn.antigravityCommand}},Al=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},ct=(e,t,r,n)=>{let o=t.trim();if(!Yt(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var Sl,yn,es=m(()=>{"use strict";Sl=require("node:child_process");ut();yn=(e,t,r)=>new Promise(n=>{if(!M(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=ct(t,r,xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Sl.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[];s.stdout?.on("data",a=>{i.push(a.toString("utf8"))}),s.stderr?.on("data",a=>{i.push(a.toString("utf8"))}),s.on("close",a=>{n({exitCode:a??-1,output:i.join("")})}),s.on("error",a=>{n({exitCode:-1,output:a.message})})})});var ts,mf,gf,pf,ff,hf,yf,se,Xt=m(()=>{"use strict";ts=p(require("node:fs"));W();mf="ws://localhost:3000/api/agent-witch/ws",gf="claude",pf="codex",ff="cursor",hf="agy",yf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),se=()=>{let e=E();if(!ts.default.existsSync(e.configPath))return null;try{let t=JSON.parse(ts.default.readFileSync(e.configPath,"utf8"));if(!yf(t))return null;let r=typeof t.wsUrl=="string"&&t.wsUrl.length>0?t.wsUrl:mf,n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),o=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:r,workspace:n,claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:gf,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:pf,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:ff,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:hf,pairingToken:o,layout:e}}catch{return null}}});var vl,rs,dt,An=m(()=>{"use strict";vl=require("node:crypto");fn();Yo();es();Jt();Xt();rs=!1,dt=async e=>{if(rs)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=se();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=pn({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=ml(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};rs=!0;let o=(0,vl.randomUUID)();try{let s=await yn(t,"claude-cli",n.prompt);await yl(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=Kt({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return dl(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{rs=!1}}});function Zt(e){return(0,_l.createHash)("sha256").update(e.trim()).digest("hex")}var _l,ns=m(()=>{"use strict";_l=require("node:crypto")});var Af,bl,Sf,vf,Qt,wl,os=m(()=>{"use strict";Af=["agentwitch.com","www.agentwitch.com"],bl=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Sf=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},vf=e=>{let t=Sf(e);return!!(Af.includes(t)||bl.test(e.trim().toLowerCase()))},Qt=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return vf(r)?bl.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},wl=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Qt(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Sn,xl,_f,bf,El,Wl,ss,vn,_n=m(()=>{"use strict";Sn=p(require("node:fs")),xl=p(require("node:path")),_f="wake-port.json",bf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),El=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,Wl=e=>xl.default.join(e,_f),ss=e=>{let t=Wl(e);if(!Sn.default.existsSync(t))return null;try{let r=JSON.parse(Sn.default.readFileSync(t,"utf8"));if(bf(r)&&El(r.wakePort))return r.wakePort}catch{return null}return null},vn=(e,t)=>{if(!El(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=Wl(e);Sn.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var i_,a_,l_,q,Rl,mt=m(()=>{"use strict";_n();W();_n();i_=Oo(),a_=`${ne()}-wake`,l_=ne(),q=()=>{let e=_(),t=ss(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return Oo()},Rl=e=>{let t=_();ss(t)===null&&vn(t,e)}});var gt,er,wf,kl,Ll,Cl=m(()=>{"use strict";gt=p(require("node:fs")),er=p(require("node:path"));ns();W();wf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kl=e=>{if(!gt.default.existsSync(e))return null;try{let t=JSON.parse(gt.default.readFileSync(e,"utf8"));return!wf(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Zt(t.pairingToken.trim())}catch{return null}},Ll=(e=_())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(kl(er.default.join(e,"config.json")));let o=er.default.join(e,Pe);if(!gt.default.existsSync(o))return t;for(let s of gt.default.readdirSync(o)){let i=er.default.join(o,s);gt.default.statSync(i).isDirectory()&&n(kl(er.default.join(i,"config.json")))}return t}});var Tl,Pl=m(()=>{"use strict";Tl=["rule","skill","command","instruction","agent"]});var Il,xf,Ef,Nl,Ol=m(()=>{"use strict";Pl();Il=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xf=e=>typeof e=="string"&&Tl.includes(e),Ef=e=>{if(!Il(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!xf(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Nl=e=>{if(!Il(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=Ef(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var Ml,Wf,Rf,kf,Lf,Cf,Tf,Pf,If,bn,is=m(()=>{"use strict";Ml=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Wf=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Rf=(e,t)=>{let r=Wf(t),n=Ml(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},kf=(e,t,r)=>{let n=Rf(t,r);return`shared/items/${e}/${n}`},Lf=["rules","skills","commands","instructions","agents"],Cf=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Tf=(e,t)=>[...e.filter(n=>n.id!==t.id),t],Pf=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},If=e=>({id:e.id,kind:e.kind,title:e.title,path:kf(e.id,e.kind,e.title)}),bn=e=>{let t=new Date().toISOString(),r=e.existingManifest??Cf(e.hostname,t),n=Ml(e.bundle.slug),o=Pf(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...Lf.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let g=If(u);return{files:[...d.files,{relativePath:g.path,content:u.content}],nextItems:Tf(d.nextItems,g)}},{files:[],nextItems:o.items}),l=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:l,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var Ee,Hl,wn,Nf,Dl,Fl=m(()=>{"use strict";Ee=p(require("node:fs")),Hl=p(require("node:os")),wn=p(require("node:path"));is();W();Nf=e=>{if(!Ee.default.existsSync(e))return null;try{let t=JSON.parse(Ee.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Dl=e=>{let t=E(e.profileEmail);try{let r=Nf(t.harnessManifestPath),n=bn({bundle:e.bundle,hostname:Hl.default.hostname(),existingManifest:r});Ee.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)Ee.default.mkdirSync(wn.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=wn.default.join(t.harnessRootDir,o.relativePath);Ee.default.mkdirSync(wn.default.dirname(s),{recursive:!0}),Ee.default.writeFileSync(s,o.content)}return Ee.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var Ul,Bl,xn,as=m(()=>{"use strict";Ul=require("node:child_process"),Bl=p(require("node:fs"));Ht();W();xn=(e=_())=>{let t=No(e);if(!Bl.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!oe())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Se(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,Ul.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var ls,ie,x_,pt=m(()=>{"use strict";W();ls="connection-health.json",ie=12e4,x_=`${ne()}-watchdog`});var $l,He,cs,Of,Mf,Hf,jl,Df,Gl,En,Wn=m(()=>{"use strict";$l=require("node:crypto"),He=p(require("node:fs")),cs=p(require("node:path"));W();Of="watchdog-log.ndjson",Mf=200,Hf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jl=(e=_())=>{let t=E(),r=t.installDir===e?t.logsDir:Gr({installDir:e,profileEmail:t.profileEmail});return cs.default.join(r,Of)},Df=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Hf(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Gl=(e,t=_())=>{let r={id:(0,$l.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=jl(t);He.default.mkdirSync(cs.default.dirname(n),{recursive:!0});let o=He.default.existsSync(n)?He.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Mf+1)),JSON.stringify(r)];return He.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},En=(e=20,t=_())=>{let r=jl(t);if(!He.default.existsSync(r))return[];let n=He.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=Df(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var tr,Rn,Ff,Vl,Z,us,ae,rr=m(()=>{"use strict";tr=p(require("node:fs")),Rn=p(require("node:path"));pt();Ff=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vl=e=>e.profileEmail===null?Rn.default.join(e.installDir,ls):Rn.default.join(e.installDir,"profiles",e.profileEmail,ls),Z=e=>{let t=Vl(e);if(!tr.default.existsSync(t))return null;try{let r=JSON.parse(tr.default.readFileSync(t,"utf8"));return!Ff(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},us=(e,t)=>{let r=Vl(e),n=Z(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};tr.default.mkdirSync(Rn.default.dirname(r),{recursive:!0}),tr.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ae=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var zl,Kl,Uf,nr,ds=m(()=>{"use strict";zl=require("node:child_process"),Kl=require("node:util"),Uf=(0,Kl.promisify)(zl.execFile),nr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Uf("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var ql,ms=m(()=>{"use strict";ql="watchdog-reinstall-state.json"});var Jl={};Te(Jl,{verifyAgentWitchReviveAfterKickstart:()=>jf});var $f,jf,Yl=m(()=>{"use strict";ms();rr();ds();W();$f=e=>new Promise(t=>{setTimeout(t,e)}),jf=async e=>{if(await $f(e.verifyDelayMs??3e3),!await nr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?E():E(e.profileEmail),n=Z(r);return!ae(n,e.staleAfterMs)}});var or,gs,Vf,Xl,zf,Zl,Ql,ec=m(()=>{"use strict";or=p(require("node:fs")),gs=p(require("node:path"));ms();W();Vf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xl=e=>gs.default.join(e,ql),zf=(e=_())=>{let t=Xl(e);if(!or.default.existsSync(t))return null;try{let r=JSON.parse(or.default.readFileSync(t,"utf8"));return!Vf(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Zl=(e=_(),t=Date.now())=>{let r=zf(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},Ql=(e=_(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=Xl(e);return or.default.mkdirSync(gs.default.dirname(n),{recursive:!0}),or.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var tc,ft,rc,nc,oc,Kf,qf,sc,Jf,Yf,ic,ac=m(()=>{"use strict";tc=require("node:child_process"),ft=p(require("node:fs")),rc=p(require("node:os")),nc=p(require("node:path")),oc=require("node:util");it();at();W();Kf=(0,oc.promisify)(tc.execFile),qf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sc=e=>{let t=Se(e),r=t===null?E():E(t);if(!ft.default.existsSync(r.configPath))return null;try{let n=JSON.parse(ft.default.readFileSync(r.configPath,"utf8"));return!qf(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},Jf=e=>sc(e)?.wsUrl??null,Yf=e=>{let t=Jf(e);return t!==null?K(t):z(e)?.appOrigin??null},ic=async e=>{let t=e?.installDir??_(),r=sc(t),n=r!==null?K(r.wsUrl):Yf(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=nc.default.join(rc.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{ft.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Se(t),l={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await Kf("bash",[i],{env:l,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{ft.default.existsSync(i)&&ft.default.unlinkSync(i)}}});var lc={};Te(lc,{attemptAgentWitchWatchdogReinstall:()=>Xf});var Xf,cc=m(()=>{"use strict";ec();Gt();ac();Xf=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!Zl())return{attempted:!1,ok:!1,targets:e};Ql();let r=await ic();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await ve(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var uc,dc,mc,Zf,Qf,eh,ps,fs=m(()=>{"use strict";Ht();pt();rr();ds();Gt();Ie();W();as();Wn();uc=e=>e===null?E():E(e),dc=async(e,t,r)=>{if(!await nr(e))return"not_running";let o=uc(t),s=Z(o);return ae(s,r)?"stale_connection":"healthy"},mc=async e=>{let t=e?.staleAfterMs??ie,r=_(),n=F(r);return Promise.all(n.map(async o=>{let s=await dc(o.launchAgentLabel,o.profileEmail,t),i=uc(o.profileEmail),a=Z(i),l=await nr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:l,connectionHealth:a,isConnectionStale:ae(a,t),needsRevive:s!=="healthy",reason:s}}))},Zf=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Qf=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",eh=async e=>{let t=await ve(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(Yl(),Jl)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},ps=async e=>{if(!oe())return{ok:!0,targets:[]};let t=e?.staleAfterMs??ie,r=_(),n=F(r),o=[];for(let u of n){let g=await dc(u.launchAgentLabel,u.profileEmail,t);if(g==="healthy"){o.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:g});continue}o.push(await eh({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:g,staleAfterMs:t}))}if(o.length===0){let u=xn();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,l=o;if(o.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(cc(),lc)),g=await u(o);s=g.attempted,i=g.ok,a=g.errorMessage,l=[...g.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:l.some(u=>u.revived||u.reason==="healthy"),targets:l,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&Gl({event:Qf(l,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Zf(l,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:l}),d}});var gc,pc,fc=m(()=>{"use strict";gc=p(require("node:os"));pt();Wn();fs();pc=async()=>{let e=await mc(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:gc.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:ie,healthyProfileCount:t,profiles:e,lastLog:En(1)[0]??null}}});var hc={};Te(hc,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ss,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Ws,buildAgentWitchWakeHealthResponse:()=>vs,buildAgentWitchWakeIdentityResponse:()=>_s,buildAgentWitchWatchdogStatus:()=>ws,installHarnessFromWakeServer:()=>Ln,readAgentWitchSelfUpdateLogEntries:()=>Tn,readAgentWitchWatchdogLogEntries:()=>Cn,restartAgentWitchFromWakeServer:()=>Es,reviveAgentWitchWebSocketFromWakeServer:()=>xs,runAgentWitchSelfUpdateFromWakeServer:()=>Rs,runAgentWitchUninstallLocalFromWakeServer:()=>ks,runAutomationFromWakeServer:()=>As,syncAutomationsFromWakeServer:()=>ys,wakeAgentWitchLaunchAgents:()=>bs});var kn,hs,Ln,ys,As,Ss,vs,_s,bs,Cn,ws,xs,Es,Ws,Tn,Rs,ks,Ls=m(()=>{"use strict";Qo();An();Jt();ns();Xt();kn=p(require("node:os"));os();mt();Gt();Ie();Cl();Ol();Fl();as();fc();Wn();cn();Kr();Vo();fs();hs=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ln=e=>{if(!hs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Nl(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Qt(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Dl({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},ys=e=>{if(!hs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Qt(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=gn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},As=async e=>{if(!hs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Qt(t)?dt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ss=()=>{let e=se(),t=e!==null?we(e.layout):{version:1,automations:[]};return{ok:!0,hostname:kn.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},vs=()=>{let e=F();return{ok:!0,port:q(),hostname:kn.default.hostname(),profileCount:e.length}},_s=()=>{let e=F(),t=se()?.pairingToken.trim()??"",r=t.length>0?Zt(t):null,n=Ll();return{hostname:kn.default.hostname(),port:q(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},bs=async()=>{let e=F(),t=[];for(let r of e){let n=await ve(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=xn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Cn=(e=20)=>En(e),ws=pc,xs=ps,Es=ps,Ws=Ko,Tn=(e=20)=>an(e),Rs=e=>zo(e),ks=()=>pa()});var le=D((Eb,Sc)=>{"use strict";var yc=["nodebuffer","arraybuffer","fragments"],Ac=typeof Blob<"u";Ac&&yc.push("blob");Sc.exports={BINARY_TYPES:yc,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Ac,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var sr=D((Wb,Pn)=>{"use strict";var{EMPTY_BUFFER:th}=le(),Cs=Buffer[Symbol.species];function rh(e,t){if(e.length===0)return th;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Cs(r.buffer,r.byteOffset,n):r}function vc(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function _c(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function nh(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Ts(e){if(Ts.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Cs(e):ArrayBuffer.isView(e)?t=new Cs(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Ts.readOnly=!1),t}Pn.exports={concat:rh,mask:vc,toArrayBuffer:nh,toBuffer:Ts,unmask:_c};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Pn.exports.mask=function(t,r,n,o,s){s<48?vc(t,r,n,o,s):e.mask(t,r,n,o,s)},Pn.exports.unmask=function(t,r){t.length<32?_c(t,r):e.unmask(t,r)}}catch{}});var xc=D((Rb,wc)=>{"use strict";var bc=Symbol("kDone"),Ps=Symbol("kRun"),Is=class{constructor(t){this[bc]=()=>{this.pending--,this[Ps]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Ps]()}[Ps](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[bc])}}};wc.exports=Is});var At=D((kb,kc)=>{"use strict";var ir=require("zlib"),Ec=sr(),oh=xc(),{kStatusCode:Wc}=le(),sh=Buffer[Symbol.species],ih=Buffer.from([0,0,255,255]),Nn=Symbol("permessage-deflate"),ce=Symbol("total-length"),ht=Symbol("callback"),We=Symbol("buffers"),yt=Symbol("error"),In,Ns=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!In){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;In=new oh(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[ht];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){In.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){In.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?ir.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=ir.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[Nn]=this,this._inflate[ce]=0,this._inflate[We]=[],this._inflate.on("error",lh),this._inflate.on("data",Rc)}this._inflate[ht]=n,this._inflate.write(t),r&&this._inflate.write(ih),this._inflate.flush(()=>{let s=this._inflate[yt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=Ec.concat(this._inflate[We],this._inflate[ce]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[ce]=0,this._inflate[We]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?ir.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=ir.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[ce]=0,this._deflate[We]=[],this._deflate.on("data",ah)}this._deflate[ht]=n,this._deflate.write(t),this._deflate.flush(ir.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Ec.concat(this._deflate[We],this._deflate[ce]);r&&(s=new sh(s.buffer,s.byteOffset,s.length-4)),this._deflate[ht]=null,this._deflate[ce]=0,this._deflate[We]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};kc.exports=Ns;function ah(e){this[We].push(e),this[ce]+=e.length}function Rc(e){if(this[ce]+=e.length,this[Nn]._maxPayload<1||this[ce]<=this[Nn]._maxPayload){this[We].push(e);return}this[yt]=new RangeError("Max payload size exceeded"),this[yt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[yt][Wc]=1009,this.removeListener("data",Rc),this.reset()}function lh(e){if(this[Nn]._inflate=null,this[yt]){this[ht](this[yt]);return}e[Wc]=1007,this[ht](e)}});var St=D((Lb,On)=>{"use strict";var{isUtf8:Lc}=require("buffer"),{hasBlob:ch}=le(),uh=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function dh(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Os(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function mh(e){return ch&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}On.exports={isBlob:mh,isValidStatusCode:dh,isValidUTF8:Os,tokenChars:uh};if(Lc)On.exports.isValidUTF8=function(e){return e.length<24?Os(e):Lc(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");On.exports.isValidUTF8=function(t){return t.length<32?Os(t):e(t)}}catch{}});var Us=D((Cb,Mc)=>{"use strict";var{Writable:gh}=require("stream"),Cc=At(),{BINARY_TYPES:ph,EMPTY_BUFFER:Tc,kStatusCode:fh,kWebSocket:hh}=le(),{concat:Ms,toArrayBuffer:yh,unmask:Ah}=sr(),{isValidStatusCode:Sh,isValidUTF8:Pc}=St(),Mn=Buffer[Symbol.species],j=0,Ic=1,Nc=2,Oc=3,Hs=4,Ds=5,Hn=6,Fs=class extends gh{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||ph[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[hh]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=j}_write(t,r,n){if(this._opcode===8&&this._state==j)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Mn(n.buffer,n.byteOffset+t,n.length-t),new Mn(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Mn(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case j:this.getInfo(t);break;case Ic:this.getPayloadLength16(t);break;case Nc:this.getPayloadLength64(t);break;case Oc:this.getMask();break;case Hs:this.getData(t);break;case Ds:case Hn:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[Cc.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Ic:this._payloadLength===127?this._state=Nc:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Oc:this._state=Hs}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Hs}getData(t){let r=Tc;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&Ah(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Ds,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[Cc.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===j&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=j;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=Ms(n,r):this._binaryType==="arraybuffer"?o=yh(Ms(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=j):(this._state=Hn,setImmediate(()=>{this.emit("message",o,!0),this._state=j,this.startLoop(t)}))}else{let o=Ms(n,r);if(!this._skipUTF8Validation&&!Pc(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Ds||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=j):(this._state=Hn,setImmediate(()=>{this.emit("message",o,!1),this._state=j,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,Tc),this.end();else{let n=t.readUInt16BE(0);if(!Sh(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Mn(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!Pc(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=j;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=j):(this._state=Hn,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=j,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[fh]=o,i}};Mc.exports=Fs});var js=D((Pb,Fc)=>{"use strict";var{Duplex:Tb}=require("stream"),{randomFillSync:vh}=require("crypto"),{types:{isUint8Array:_h}}=require("util"),Hc=At(),{EMPTY_BUFFER:bh,kWebSocket:wh,NOOP:xh}=le(),{isBlob:vt,isValidStatusCode:Eh}=St(),{mask:Dc,toBuffer:De}=sr(),G=Symbol("kByteLength"),Wh=Buffer.alloc(4),Dn=8*1024,Fe,_t=Dn,J=0,Rh=1,kh=2,Bs=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=J,this.onerror=xh,this[wh]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||Wh,r.generateMask?r.generateMask(n):(_t===Dn&&(Fe===void 0&&(Fe=Buffer.alloc(Dn)),vh(Fe,0,Dn),_t=0),n[0]=Fe[_t++],n[1]=Fe[_t++],n[2]=Fe[_t++],n[3]=Fe[_t++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[G]!==void 0?a=r[G]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let l=a;a>=65536?(s+=8,l=127):a>125&&(s+=2,l=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=l,l===126?d.writeUInt16BE(a,2):l===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(Dc(t,n,d,s,a),[d]):(Dc(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=bh;else{if(typeof t!="number"||!Eh(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(_h(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[G]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==J?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):vt(t)?(o=t.size,s=!1):(t=De(t),o=t.length,s=De.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[G]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};vt(t)?this._state!==J?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==J?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):vt(t)?(o=t.size,s=!1):(t=De(t),o=t.length,s=De.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[G]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};vt(t)?this._state!==J?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==J?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[Hc.extensionName],s=r.binary?2:1,i=r.compress,a,l;typeof t=="string"?(a=Buffer.byteLength(t),l=!1):vt(t)?(a=t.size,l=!1):(t=De(t),a=t.length,l=De.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[G]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:l,rsv1:i};vt(t)?this._state!==J?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==J?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[G],this._state=kh,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick($s,this,a,o);return}this._bufferedBytes-=n[G];let i=De(s);r?this.dispatch(i,r,n,o):(this._state=J,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(Lh,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[Hc.extensionName];this._bufferedBytes+=n[G],this._state=Rh,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let l=new Error("The socket was closed while data was being compressed");$s(this,l,o);return}this._bufferedBytes-=n[G],this._state=J,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===J&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][G],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][G],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Fc.exports=Bs;function $s(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function Lh(e,t,r){$s(e,t,r),e.onerror(t)}});var qc=D((Ib,Kc)=>{"use strict";var{kForOnEventAttribute:ar,kListener:Gs}=le(),Uc=Symbol("kCode"),Bc=Symbol("kData"),$c=Symbol("kError"),jc=Symbol("kMessage"),Gc=Symbol("kReason"),bt=Symbol("kTarget"),Vc=Symbol("kType"),zc=Symbol("kWasClean"),ue=class{constructor(t){this[bt]=null,this[Vc]=t}get target(){return this[bt]}get type(){return this[Vc]}};Object.defineProperty(ue.prototype,"target",{enumerable:!0});Object.defineProperty(ue.prototype,"type",{enumerable:!0});var Ue=class extends ue{constructor(t,r={}){super(t),this[Uc]=r.code===void 0?0:r.code,this[Gc]=r.reason===void 0?"":r.reason,this[zc]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Uc]}get reason(){return this[Gc]}get wasClean(){return this[zc]}};Object.defineProperty(Ue.prototype,"code",{enumerable:!0});Object.defineProperty(Ue.prototype,"reason",{enumerable:!0});Object.defineProperty(Ue.prototype,"wasClean",{enumerable:!0});var wt=class extends ue{constructor(t,r={}){super(t),this[$c]=r.error===void 0?null:r.error,this[jc]=r.message===void 0?"":r.message}get error(){return this[$c]}get message(){return this[jc]}};Object.defineProperty(wt.prototype,"error",{enumerable:!0});Object.defineProperty(wt.prototype,"message",{enumerable:!0});var lr=class extends ue{constructor(t,r={}){super(t),this[Bc]=r.data===void 0?null:r.data}get data(){return this[Bc]}};Object.defineProperty(lr.prototype,"data",{enumerable:!0});var Ch={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[ar]&&o[Gs]===t&&!o[ar])return;let n;if(e==="message")n=function(s,i){let a=new lr("message",{data:i?s:s.toString()});a[bt]=this,Fn(t,this,a)};else if(e==="close")n=function(s,i){let a=new Ue("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[bt]=this,Fn(t,this,a)};else if(e==="error")n=function(s){let i=new wt("error",{error:s,message:s.message});i[bt]=this,Fn(t,this,i)};else if(e==="open")n=function(){let s=new ue("open");s[bt]=this,Fn(t,this,s)};else return;n[ar]=!!r[ar],n[Gs]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Gs]===t&&!r[ar]){this.removeListener(e,r);break}}};Kc.exports={CloseEvent:Ue,ErrorEvent:wt,Event:ue,EventTarget:Ch,MessageEvent:lr};function Fn(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Un=D((Nb,Jc)=>{"use strict";var{tokenChars:cr}=St();function Q(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Th(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,l=-1,d=-1,u=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(u===-1&&cr[d]===1)l===-1&&(l=g);else if(g!==0&&(d===32||d===9))u===-1&&l!==-1&&(u=g);else if(d===59||d===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(l,u);d===44?(Q(t,y,r),r=Object.create(null)):i=y,l=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(u===-1&&cr[d]===1)l===-1&&(l=g);else if(d===32||d===9)u===-1&&l!==-1&&(u=g);else if(d===59||d===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g),Q(r,e.slice(l,u),!0),d===44&&(Q(t,i,r),r=Object.create(null),i=void 0),l=u=-1}else if(d===61&&l!==-1&&u===-1)a=e.slice(l,g),l=u=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(o){if(cr[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);l===-1?l=g:n||(n=!0),o=!1}else if(s)if(cr[d]===1)l===-1&&(l=g);else if(d===34&&l!==-1)s=!1,u=g;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(u===-1&&cr[d]===1)l===-1&&(l=g);else if(l!==-1&&(d===32||d===9))u===-1&&(u=g);else if(d===59||d===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(l,u);n&&(y=y.replace(/\\/g,""),n=!1),Q(r,a,y),d===44&&(Q(t,i,r),r=Object.create(null),i=void 0),a=void 0,l=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(l===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=g);let f=e.slice(l,u);return i===void 0?Q(t,f,r):(a===void 0?Q(r,f,!0):n?Q(r,a,f.replace(/\\/g,"")):Q(r,a,f),Q(t,i,r)),t}function Ph(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Jc.exports={format:Ph,parse:Th}});var Gn=D((Hb,au)=>{"use strict";var Ih=require("events"),Nh=require("https"),Oh=require("http"),Zc=require("net"),Mh=require("tls"),{randomBytes:Hh,createHash:Dh}=require("crypto"),{Duplex:Ob,Readable:Mb}=require("stream"),{URL:Vs}=require("url"),Re=At(),Fh=Us(),Uh=js(),{isBlob:Bh}=St(),{BINARY_TYPES:Yc,CLOSE_TIMEOUT:$h,EMPTY_BUFFER:Bn,GUID:jh,kForOnEventAttribute:zs,kListener:Gh,kStatusCode:Vh,kWebSocket:P,NOOP:Qc}=le(),{EventTarget:{addEventListener:zh,removeEventListener:Kh}}=qc(),{format:qh,parse:Jh}=Un(),{toBuffer:Yh}=sr(),eu=Symbol("kAborted"),Ks=[8,13],de=["CONNECTING","OPEN","CLOSING","CLOSED"],Xh=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,R=class e extends Ih{constructor(t,r,n){super(),this._binaryType=Yc[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Bn,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),tu(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){Yc.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new Fh({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new Uh(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[P]=this,s[P]=this,t[P]=this,o.on("conclude",ey),o.on("drain",ty),o.on("error",ry),o.on("message",ny),o.on("ping",oy),o.on("pong",sy),s.onerror=iy,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",ou),t.on("data",jn),t.on("end",su),t.on("error",iu),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Re.extensionName]&&this._extensions[Re.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){U(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),nu(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){qs(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Bn,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){qs(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Bn,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){qs(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Re.extensionName]||(o.compress=!1),this._sender.send(t||Bn,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){U(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(R,"CONNECTING",{enumerable:!0,value:de.indexOf("CONNECTING")});Object.defineProperty(R.prototype,"CONNECTING",{enumerable:!0,value:de.indexOf("CONNECTING")});Object.defineProperty(R,"OPEN",{enumerable:!0,value:de.indexOf("OPEN")});Object.defineProperty(R.prototype,"OPEN",{enumerable:!0,value:de.indexOf("OPEN")});Object.defineProperty(R,"CLOSING",{enumerable:!0,value:de.indexOf("CLOSING")});Object.defineProperty(R.prototype,"CLOSING",{enumerable:!0,value:de.indexOf("CLOSING")});Object.defineProperty(R,"CLOSED",{enumerable:!0,value:de.indexOf("CLOSED")});Object.defineProperty(R.prototype,"CLOSED",{enumerable:!0,value:de.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(R.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(R.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[zs])return t[Gh];return null},set(t){for(let r of this.listeners(e))if(r[zs]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[zs]:!0})}})});R.prototype.addEventListener=zh;R.prototype.removeEventListener=Kh;au.exports=R;function tu(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:$h,protocolVersion:Ks[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!Ks.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${Ks.join(", ")})`);let s;if(t instanceof Vs)s=t;else try{s=new Vs(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",l;if(s.protocol!=="ws:"&&!i&&!a?l=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?l="The URL's pathname is empty":s.hash&&(l="The URL contains a fragment identifier"),l){let c=new SyntaxError(l);if(e._redirects===0)throw c;$n(e,c);return}let d=i?443:80,u=Hh(16).toString("base64"),g=i?Nh.request:Oh.request,f=new Set,y;if(o.createConnection=o.createConnection||(i?Qh:Zh),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(y=new Re({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=qh({[Re.extensionName]:y.offer()})),r.length){for(let c of r){if(typeof c!="string"||!Xh.test(c)||f.has(c))throw new SyntaxError("An invalid or duplicated subprotocol was specified");f.add(c)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let c=o.path.split(":");o.socketPath=c[0],o.path=c[1]}let A;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let c=n&&n.headers;if(n={...n,headers:{}},c)for(let[S,w]of Object.entries(c))n.headers[S.toLowerCase()]=w}else if(e.listenerCount("redirect")===0){let c=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!c||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,c||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),A=e._req=g(o),e._redirects&&e.emit("redirect",e.url,A)}else A=e._req=g(o);o.timeout&&A.on("timeout",()=>{U(e,A,"Opening handshake has timed out")}),A.on("error",c=>{A===null||A[eu]||(A=e._req=null,$n(e,c))}),A.on("response",c=>{let S=c.headers.location,w=c.statusCode;if(S&&o.followRedirects&&w>=300&&w<400){if(++e._redirects>o.maxRedirects){U(e,A,"Maximum redirects exceeded");return}A.abort();let h;try{h=new Vs(S,t)}catch{let b=new SyntaxError(`Invalid URL: ${S}`);$n(e,b);return}tu(e,h,r,n)}else e.emit("unexpected-response",A,c)||U(e,A,`Unexpected server response: ${c.statusCode}`)}),A.on("upgrade",(c,S,w)=>{if(e.emit("upgrade",c),e.readyState!==R.CONNECTING)return;A=e._req=null;let h=c.headers.upgrade;if(h===void 0||h.toLowerCase()!=="websocket"){U(e,S,"Invalid Upgrade header");return}let v=Dh("sha1").update(u+jh).digest("base64");if(c.headers["sec-websocket-accept"]!==v){U(e,S,"Invalid Sec-WebSocket-Accept header");return}let b=c.headers["sec-websocket-protocol"],T;if(b!==void 0?f.size?f.has(b)||(T="Server sent an invalid subprotocol"):T="Server sent a subprotocol but none was requested":f.size&&(T="Server sent no subprotocol"),T){U(e,S,T);return}b&&(e._protocol=b);let $=c.headers["sec-websocket-extensions"];if($!==void 0){if(!y){U(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let ye;try{ye=Jh($)}catch{U(e,S,"Invalid Sec-WebSocket-Extensions header");return}let Xe=Object.keys(ye);if(Xe.length!==1||Xe[0]!==Re.extensionName){U(e,S,"Server indicated an extension that was not requested");return}try{y.accept(ye[Re.extensionName])}catch{U(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Re.extensionName]=y}e.setSocket(S,w,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(A,e):A.end()}function $n(e,t){e._readyState=R.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Zh(e){return e.path=e.socketPath,Zc.connect(e)}function Qh(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Zc.isIP(e.host)?"":e.host),Mh.connect(e)}function U(e,t,r){e._readyState=R.CLOSING;let n=new Error(r);Error.captureStackTrace(n,U),t.setHeader?(t[eu]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick($n,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function qs(e,t,r){if(t){let n=Bh(t)?t.size:Yh(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${de[e.readyState]})`);process.nextTick(r,n)}}function ey(e,t){let r=this[P];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[P]!==void 0&&(r._socket.removeListener("data",jn),process.nextTick(ru,r._socket),e===1005?r.close():r.close(e,t))}function ty(){let e=this[P];e.isPaused||e._socket.resume()}function ry(e){let t=this[P];t._socket[P]!==void 0&&(t._socket.removeListener("data",jn),process.nextTick(ru,t._socket),t.close(e[Vh])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function Xc(){this[P].emitClose()}function ny(e,t){this[P].emit("message",e,t)}function oy(e){let t=this[P];t._autoPong&&t.pong(e,!this._isServer,Qc),t.emit("ping",e)}function sy(e){this[P].emit("pong",e)}function ru(e){e.resume()}function iy(e){let t=this[P];t.readyState!==R.CLOSED&&(t.readyState===R.OPEN&&(t._readyState=R.CLOSING,nu(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function nu(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function ou(){let e=this[P];if(this.removeListener("close",ou),this.removeListener("data",jn),this.removeListener("end",su),e._readyState=R.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[P]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",Xc),e._receiver.on("finish",Xc))}function jn(e){this[P]._receiver.write(e)||this.pause()}function su(){let e=this[P];e._readyState=R.CLOSING,e._receiver.end(),this.end()}function iu(){let e=this[P];this.removeListener("error",iu),this.on("error",Qc),e&&(e._readyState=R.CLOSING,this.destroy())}});var du=D((Fb,uu)=>{"use strict";var Db=Gn(),{Duplex:ay}=require("stream");function lu(e){e.emit("close")}function ly(){!this.destroyed&&this._writableState.finished&&this.destroy()}function cu(e){this.removeListener("error",cu),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function cy(e,t){let r=!0,n=new ay({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(lu,n);return}let i=!1;e.once("error",function(l){i=!0,s(l)}),e.once("close",function(){i||s(o),process.nextTick(lu,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",ly),n.on("error",cu),n}uu.exports=cy});var Js=D((Ub,mu)=>{"use strict";var{tokenChars:uy}=St();function dy(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&uy[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}mu.exports={parse:dy}});var Su=D(($b,Au)=>{"use strict";var my=require("events"),Vn=require("http"),{Duplex:Bb}=require("stream"),{createHash:gy}=require("crypto"),gu=Un(),Be=At(),py=Js(),fy=Gn(),{CLOSE_TIMEOUT:hy,GUID:yy,kWebSocket:Ay}=le(),Sy=/^[+/0-9A-Za-z]{22}==$/,pu=0,fu=1,yu=2,Ys=class extends my{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:hy,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:fy,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Vn.createServer((n,o)=>{let s=Vn.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=vy(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=pu}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===yu){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(ur,this);return}if(t&&this.once("close",t),this._state!==fu)if(this._state=fu,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ur,this):process.nextTick(ur,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{ur(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",hu);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){$e(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){$e(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Sy.test(s)){$e(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){$e(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){dr(r,400);return}let l=t.headers["sec-websocket-protocol"],d=new Set;if(l!==void 0)try{d=py.parse(l)}catch{$e(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&u!==void 0){let f=new Be({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=gu.parse(u);y[Be.extensionName]&&(f.accept(y[Be.extensionName]),g[Be.extensionName]=f)}catch{$e(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let f={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(f,(y,A,c,S)=>{if(!y)return dr(r,A||401,c,S);this.completeUpgrade(g,s,d,t,r,n,o)});return}if(!this.options.verifyClient(f))return dr(r,401)}this.completeUpgrade(g,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Ay])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>pu)return dr(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${gy("sha1").update(r+yy).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(n.size){let g=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),u._protocol=g)}if(t[Be.extensionName]){let g=t[Be.extensionName].params,f=gu.format({[Be.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${f}`),u._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",hu),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ur,this)})),a(u,o)}};Au.exports=Ys;function vy(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function ur(e){e._state=yu,e.emit("close")}function hu(){this.destroy()}function dr(e,t,r,n){r=r||Vn.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Vn.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function $e(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,$e),e.emit("wsClientError",i,r,t)}else dr(r,n,o,s)}});var _y,by,wy,xy,Ey,Wy,vu,Ry,mr,_u=m(()=>{_y=p(du(),1),by=p(Un(),1),wy=p(At(),1),xy=p(Us(),1),Ey=p(js(),1),Wy=p(Js(),1),vu=p(Gn(),1),Ry=p(Su(),1),mr=vu.default});var Xs=m(()=>{"use strict"});var me,gr=m(()=>{"use strict";me=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var xt,je,bu,Ly,Zs,Qs,wu,xu,Eu,Wu,ei,ti=m(()=>{"use strict";xt=p(require("node:fs")),je=p(require("node:os")),bu=p(require("node:path"));Xs();gr();Ly=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zs=(e=je.default.hostname())=>bu.default.join(je.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Qs=e=>{if(!xt.default.existsSync(e))return null;try{let t=JSON.parse(xt.default.readFileSync(e,"utf8"));return!Ly(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},wu=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},xu=(e,t)=>{xt.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Eu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Zs(),n=Qs(r);if(n!==null&&n.pid!==process.pid&&me(n.pid)&&wu(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:je.default.hostname(),macOsUsername:je.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return xu(r,o),{ok:!0}},Wu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Zs(),n=Qs(r);return n!==null&&n.pid!==process.pid&&me(n.pid)&&wu(n)?{ok:!1}:(xu(r,{hostname:je.default.hostname(),macOsUsername:je.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ei=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Zs();Qs(r)?.pid===process.pid&&xt.default.existsSync(r)&&xt.default.unlinkSync(r)}});var ri,pr,Cy,Ty,Py,Iy,Ru,ku=m(()=>{"use strict";ri=require("node:child_process"),pr=p(require("node:path"));gr();Qe();Cy=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Ty=(e,t)=>{if(Cy(e)||!/\bnode\b/.test(e))return!1;let r=pr.default.resolve(t),n=pr.default.join(r,"app",te),o=pr.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===te||i==="agent-witch.ts")return e.includes(r);try{let a=pr.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},Py=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,ri.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Iy=(e,t,r)=>{let n=Py(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let l=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(l)||l<=0||l===r||n.has(l)||Ty(d,t)&&o.push(l)}return o},Ru=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,ri.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=Iy(r,e.installDir,t),o=[];for(let s of n)if(me(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var fr,hr,Lu,Ny,Cu,Tu=m(()=>{"use strict";fr=p(require("node:fs")),hr=p(require("node:path"));W();Lu=(e,t)=>{!fr.default.existsSync(e)||fr.default.existsSync(t)||(fr.default.mkdirSync(hr.default.dirname(t),{recursive:!0}),fr.default.renameSync(e,t))},Ny=e=>{if(e.profileEmail===null)return;let t=hr.default.join(e.installDir,re);Lu(hr.default.join(t,$r),e.mainLogPath),Lu(hr.default.join(t,jr),e.errorLogPath)},Cu=e=>{let t=E();e!==void 0&&t.installDir!==e||Ny(t)}});var Pu,Iu,Nu,Ou,Mu=m(()=>{"use strict";Pu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Iu=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?Pu(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?Pu(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Nu=e=>{let t=e.watchdogLogs.map(Iu).join(""),r=e.updateLogs.map(Iu).join("");return`<!doctype html>
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
</html>`},Ou=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Hu,Du,Fu=m(()=>{"use strict";Hu=p(require("node:net")),Du=()=>new Promise((e,t)=>{let r=Hu.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var Uu,Oy,Bu,$u=m(()=>{"use strict";Uu=p(require("node:net"));Fu();mt();_n();W();Oy=e=>new Promise(t=>{let r=Uu.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Bu=async()=>{let e=_(),t=q();if(await Oy(t))return Rl(t),t;let r=await Du();return vn(e,r),r}});var My,ju,Gu=m(()=>{"use strict";My=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ju=e=>({force:My(e)&&e.force===!0})});var ni,Hy,Vu,zu=m(()=>{"use strict";ni=p(require("node:os")),Hy=e=>{let t=e.trim();return t.startsWith("~/")?`${ni.default.homedir()}${t.slice(1)}`:t==="~"?ni.default.homedir():t},Vu=Hy});var Ge,Et,zn=m(()=>{"use strict";Ge=p(require("node:path"));ot();zu();Et=e=>{let t=Vu(e),r=Ge.default.join(t,va);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Ge.default.join(r,"rag"),memoryDirPath:Ge.default.join(r,_a),reportsDirPath:Ge.default.join(r,wa),metaFilePath:Ge.default.join(r,ba),ragChunksFilePath:Ge.default.join(r,"rag",Xr)}}});var ee,qu,Dy,Fy,yr,oi=m(()=>{"use strict";ee=p(require("node:fs")),qu=p(require("node:path"));ot();zn();Dy=(e,t)=>{if(ee.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};ee.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},Fy=e=>{ee.default.existsSync(e.ragChunksFilePath)||ee.default.writeFileSync(e.ragChunksFilePath,"");let t=qu.default.join(e.memoryDirPath,Zr);ee.default.existsSync(t)||ee.default.writeFileSync(t,"")},yr=e=>{let t=Et(e.projectFolderPath);return ee.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),ee.default.mkdirSync(t.ragDirPath,{recursive:!0}),ee.default.mkdirSync(t.memoryDirPath,{recursive:!0}),Dy(t,e),Fy(t),{ok:!0,layout:t}}});var Uy,Ju,Yu=m(()=>{"use strict";oi();Uy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ju=e=>{if(!Uy(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:yr({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Zu,jy,Xu,L,By,$y,si,Qu=m(()=>{"use strict";Zu=p(require("node:http"));Ls();os();Mu();$u();Gu();Yr();Yu();on();Ze();jy={},Xu=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},L=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},By=e=>{e.writeHead(403),e.end()},$y=async(e,t,r)=>{let n=e.headers.origin,o=wl(n);try{if(n!==void 0&&n.length>0&&!o.allowed){By(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){L(t,200,vs(),o.headers);return}if(e.method==="GET"&&s==="/identity"){L(t,200,_s(),o.headers);return}if(e.method==="GET"&&s==="/local"){let i=Cn(50),a=Tn(50);t.writeHead(200,Ou()),t.end(Nu({port:r,watchdogLogs:i,updateLogs:a}));return}if(e.method==="GET"&&s==="/watchdog/status"){let i=await ws();L(t,200,i,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let i=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),l=Number.isFinite(a)&&a>0?Math.min(a,200):20;L(t,200,{ok:!0,logs:Cn(l)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let i=await xs();L(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/restart"){let i=await Es();L(t,i.ok?200:503,i,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let i=Ws();L(t,200,{ok:!0,...i},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let i=new URL(e.url??"/update/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),l=Number.isFinite(a)&&a>0?Math.min(a,200):20;L(t,200,{ok:!0,logs:Tn(l)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let i=await Xu(e),{force:a}=ju(i),l=await Rs({force:a});L(t,l.ok?200:503,l,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let i=await ks();L(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/wake"){let i=await bs();L(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{L(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let l=Ln(a);L(t,l.ok?200:400,l,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let i=await Xu(e),a=Ju(i);L(t,a.ok?200:400,a,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{L(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let l=Ln(a);L(t,l.ok?200:400,l,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){L(t,200,Ss(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{L(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let l=ys(a);L(t,l.ok?200:400,l,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{L(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let l=await As(a);L(t,l.ok?200:503,l,o.headers);return}L(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{L(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},si=async()=>{let e=await Bu(),t=Zu.default.createServer((r,n)=>{$y(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!Y()&&st(jy.url)&&(async()=>{nt("agent-witch-wake-server");let e=await si(),t=Jr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var ii,ed=m(()=>{"use strict";Jt();An();Xt();ii=async()=>{let e=se();if(e===null)return;let t=we(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await dt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var td,rd=m(()=>{"use strict";Xs();Qu();ti();ed();td=async(e={})=>{let t=await si();ii();let r=setInterval(()=>{ii()},6e4),n=setInterval(()=>{if(!Wu().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var Ar,Kn,zy,nd,od,qn,sd,id,ai,ad,Jn,ld=m(()=>{"use strict";Ar=p(require("node:fs")),Kn=p(require("node:path")),zy="pending-run-inputs.json",nd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),od=e=>{let t=e.profileEmail?Kn.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Kn.default.join(t,zy)},qn=e=>{let t=od(e);if(!Ar.default.existsSync(t))return{};try{let r=JSON.parse(Ar.default.readFileSync(t,"utf8"));return nd(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!nd(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",l=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:l}]]})):{}}catch{return{}}},sd=(e,t)=>{let r=od(e);Ar.default.mkdirSync(Kn.default.dirname(r),{recursive:!0}),Ar.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},id=e=>Object.values(qn(e)),ai=(e,t)=>qn(e)[t]!==void 0,ad=(e,t)=>{let r=qn(e);r[t.agentRunId]=t,sd(e,r)},Jn=(e,t)=>{let r=qn(e);delete r[t],sd(e,r)}});var li,cd=m(()=>{"use strict";li={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var ci,D0,ud=m(()=>{"use strict";ci={OPEN:"open",APPROVAL:"approval"},D0=ci.APPROVAL});var Wt,Yn,dd,Ky,md,gd,pd,Xn,fd,ui=m(()=>{"use strict";Wt=p(require("node:fs")),Yn=p(require("node:path")),dd="runs",Ky=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),md=e=>{let t=e.profileEmail!==null?Yn.default.join(e.installDir,"profiles",e.profileEmail,dd):Yn.default.join(e.installDir,dd);return Wt.default.mkdirSync(t,{recursive:!0}),t},gd=(e,t)=>Yn.default.join(md(e),`${t}.json`),pd=(e,t)=>{Wt.default.writeFileSync(gd(e,t.id),JSON.stringify(t,null,2))},Xn=(e,t)=>{let r=gd(e,t);if(!Wt.default.existsSync(r))return null;try{let n=JSON.parse(Wt.default.readFileSync(r,"utf8"));return!Ky(n)||typeof n.id!="string"?null:n}catch{return null}},fd=e=>{let t=md(e),r=Wt.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Xn(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var qy,hd,yd=m(()=>{"use strict";cd();ud();ui();qy=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?li.COMPLETED:li.FAILED,dispatchPolicy:ci.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},hd=(e,t)=>{let r=qy(t);return pd(e,r),r}});var Sr,Zn,Jy,di,Ad,Sd,vd,mi,_d=m(()=>{"use strict";Sr=p(require("node:fs")),Zn=p(require("node:path"));fn();Jy="run-completion-outbox.json",di=e=>{let t=e.profileEmail?Zn.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Zn.default.join(t,Jy)},Ad=e=>{let t=di(e);if(!Sr.default.existsSync(t))return[];try{let r=JSON.parse(Sr.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},Sd=(e,t)=>{Sr.default.mkdirSync(Zn.default.dirname(di(e)),{recursive:!0}),Sr.default.writeFileSync(di(e),JSON.stringify(t,null,2),"utf8")},vd=(e,t)=>{let r=[...Ad(e).filter(n=>n.runId!==t.runId),t];Sd(e,r)},mi=async e=>{if(e.cloudApi===null)return;let t=Ad(e.layout);if(t.length===0)return;let r=[];for(let n of t)await hl(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);Sd(e.layout,r)}});var bd=m(()=>{"use strict"});var gi,vr,Xy,Rt,wd=m(()=>{"use strict";bd();gi=new Map,vr=e=>{let t=gi.get(e);t!==void 0&&(clearInterval(t),gi.delete(e))},Xy=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},Rt=(e,t,r,n={})=>{vr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){vr(t);return}let i=n.onTick?.()??{};Xy(e,t,o,i)};s(),gi.set(t,setInterval(s,15e3))}});var pi,_r,kt,xd,Ve,Ed,Qn=m(()=>{"use strict";pi=new Set,_r=new Map,kt=(e,t)=>{if(t.length===0)return;let r=_r.get(e)??[];r.push(t),_r.set(e,r)},xd=e=>{pi.add(e);let t=_r.get(e)??[];return _r.delete(e),t},Ve=e=>pi.has(e),Ed=e=>{pi.delete(e),_r.delete(e)}});var Wd,Rd,kd,Ld,H,Lt,Cd,Td,br,Pd,Id,fi,Nd,Od,Md,eo=m(()=>{"use strict";Wd=require("node:crypto"),Rd=p(require("node:fs")),kd=p(require("node:path")),Ld=require("node:url");gr();Ze();Lo();H=new Map,Cd=async()=>{if(Lt!==void 0)return Lt;try{if(Y()){let e=Br(),t=kd.default.join(e,"deps","node-pty","lib","index.js");if(Rd.default.existsSync(t)){let r=await import((0,Ld.pathToFileURL)(t).href);return Lt=r,r}}return Lt=await import("node-pty"),Lt}catch{return Lt=null,null}},Td=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},br=(e,t,r)=>{let n=H.get(e);if(n!==void 0){H.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Pd=(e,t)=>{let r=H.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Id=(e,t,r)=>{let n=H.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},fi=e=>{for(let t of H.values())if(!(t.mode!=="agent"||t.runId!==e))return me(t.pty.pid);return!1},Nd=e=>{for(let[t,r]of H.entries())if(!(r.mode!=="agent"||r.runId!==e)){H.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Od=async e=>{let t=await Cd();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;H.get(e.shellSessionId)!==void 0&&br(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return H.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{Td(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{H.get(e.shellSessionId)?.pty===o&&(H.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Md=async e=>{let t=e.shellSessionId??(0,Wd.randomUUID)(),r=await Cd();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return H.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{Td(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{H.get(t)?.pty===n&&(H.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var to,Hd,Dd=m(()=>{"use strict";to="[[AWAITING_INPUT]]",Hd=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",to,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var wr,Fd,ro=m(()=>{"use strict";Dd();wr=e=>{let t=e.indexOf(to);if(t<0)return null;let n=e.slice(t+to.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},Fd=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Hd].join(`
`)});var Ud,Bd=m(()=>{"use strict";Qn();eo();ro();Ud=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(Ve(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}kt(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Md({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=wr(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var $d,jd,Gd,ke,no=m(()=>{"use strict";$d=require("node:child_process"),jd=p(require("node:fs")),Gd=p(require("node:path"));Qe();ke=(e,t)=>{let r=Gd.default.join(e,"app",Zi,"ensure-writer.sh");return jd.default.existsSync(r)?new Promise((n,o)=>{let s=(0,$d.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var Vd,ze,oo,zd,Kd,hi,qd,yi,Jd,Yd,Zy,so,Qy,eA,Xd,Ai=m(()=>{"use strict";Vd=require("node:child_process");ut();no();ze=new Map,oo=e=>e==="cursor"||e==="antigravity",zd=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Kd=e=>ze.get(e)?.warmed===!0,hi=e=>{let t=ze.get(e);ze.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},qd=e=>ze.get(e)?.conversationStarted===!0,yi=e=>{let t=ze.get(e);ze.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Jd=e=>{ze.delete(e)},Yd=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Zy={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},so=e=>`${Zy[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,Qy=(e,t,r,n)=>new Promise(o=>{let s=Al(t,r),i=[],a=(0,Vd.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),l=d=>{let u=d.toString("utf8");i.push(u),n?.(u)};a.stdout?.on("data",l),a.stderr?.on("data",l),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),eA=(e,t)=>{let r=so(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Xd=async e=>{if(!M(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await ke(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}oo(e.writerAgent)&&hi(e.writerAgent);let t=await Qy(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?eA(e.writerAgent,t.output):so(e.writerAgent)}}});var Zd,xr,O,Si,Qd,em,vi,tm,rm,nm,tA,ge,io,Ct,om,rA,_i,sm,im,am,lm=m(()=>{"use strict";Zd=require("node:child_process");ut();ld();yd();_d();wd();gr();Qn();eo();ro();Bd();Ai();Ut();ro();xr=new Map,O=new Map,Si=new Set,Qd=130,em=`

Stopped by user.`,vi=null,tm=e=>{vi=e},rm=async e=>{await mi({layout:e,cloudApi:vi})},nm=e=>{let t=xr.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:me(t.pid)},tA=e=>xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),ge=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},io=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=tn(s),l=O.get(r);if(a!==null&&l!==void 0){let d=Na(a),u=nm(r)||fi(r);d!==null&&!u&&Ct(e,t,r,n,d.exitCode,d.output,l.originalPrompt)}return Ia(a)}}),Ct=(e,t,r,n,o,s,i)=>{let a=o,l=s;r!==void 0&&Si.has(r)&&(Si.delete(r),a=Qd,l=l.trim().length>0&&!l.includes("Stopped by user.")?`${l.trim()}${em}`:"Stopped by user."),r!==void 0&&(vr(r),Ve(r)&&(ge(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),Ed(r)),hd(e.layout,{agentRunId:r,originalPrompt:i,exitCode:a,output:l,layout:e.layout}),vd(e.layout,{runId:r,exitCode:a,output:l,createdAt:new Date().toISOString()}),mi({layout:e.layout,cloudApi:vi}),O.delete(r),xr.delete(r),Jn(e.layout,r)),ge(t,{type:"command.claude.result",payload:{exitCode:a,output:l,...r!==void 0?{agentRunId:r}:{}},requestId:n})},om=(e,t,r,n,o,s,i)=>{let a=O.get(r),l=a?.accumulatedOutput??s;ad(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:l}),Rt(t,r,()=>ai(e.layout,r),io(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),ge(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:l},requestId:n})},rA=(e,t,r,n,o,s,i)=>{let a=[],l=!1,d=u=>{if(!(o===void 0||u.length===0)){if(Ve(o)){ge(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:u},requestId:n});return}kt(o,u)}};if(o!==void 0){let u=O.get(o);xr.set(o,t),O.set(o,{originalPrompt:s,writerAgent:i,projectFolderPath:u?.projectFolderPath,reportKey:u?.reportKey,accumulatedOutput:u?.accumulatedOutput??""}),ge(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),Rt(r,o,()=>nm(o),io(e,r,o,n,u?.projectFolderPath,u?.reportKey))}t.stdout?.on("data",u=>{let g=u.toString("utf8");if(a.push(g),d(g),l||o===void 0)return;let f=wr(a.join(""));if(f!==null){l=!0,t.kill("SIGTERM");let y=O.get(o),A=[y?.accumulatedOutput??"",f.partialOutput].filter(c=>c.length>0).join(`

`);y!==void 0&&(y.accumulatedOutput=A),xr.delete(o),om(e,r,o,n,f.question,A,s)}}),t.stderr?.on("data",u=>{let g=u.toString("utf8");a.push(g),d(g)}),t.on("close",u=>{if(l)return;yi(i);let g=o!==void 0?O.get(o):void 0,f=a.join("").trim(),y=g!==void 0&&g.accumulatedOutput.length>0?`${g.accumulatedOutput}

${f}`.trim():f;Ct(e,r,o,n,u??-1,y,s)}),t.on("error",u=>{l||Ct(e,r,o,n,-1,u.message,s)})},_i=(e,t,r,n,o,s,i,a,l,d)=>{let u=ct(t,r,tA(e),i);if(u===null){Ct(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let g=()=>{let f=(0,Zd.spawn)(u.command,[...u.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});rA(e,f,o,n,s,r,t)};if(s===void 0){g();return}O.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:l,reportKey:d,accumulatedOutput:O.get(s)?.accumulatedOutput??""}),l!==void 0&&l.trim().length>0&&d!==void 0&&d.trim().length>0&&rn({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),Rt(o,s,()=>O.has(s),io(e,o,s,n,l,d)),Ud({socket:o,sendMessage:ge,requestId:n,agentRunId:s,shellSessionId:a,command:u.command,args:u.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:f=>{a!==void 0&&br(a,c=>{ge(o,c)},n);let y=O.get(s),A=[y?.accumulatedOutput??"",f.partialOutput].filter(c=>c.length>0).join(`

`);y!==void 0&&(y.accumulatedOutput=A),om(e,o,s,n,f.question,A,r)},onFinished:(f,y)=>{yi(t);let A=O.get(s),c=A!==void 0&&A.accumulatedOutput.length>0?`${A.accumulatedOutput}

${y}`.trim():y;Ct(e,o,s,n,f,c,r)}}).then(f=>{if(!f){g();return}Rt(o,s,()=>fi(s),io(e,o,s,n,l,d))}).catch(f=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",f instanceof Error?f.message:f),g()})},sm=(e,t,r,n)=>{Jn(e.layout,t.agentRunId),t.shellSessionId!==void 0&&ge(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=Fd(t),s=O.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,l=s?.reportKey;_i(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,l)},im=(e,t)=>{for(let r of id(e.layout))O.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Rt(t,r.agentRunId,()=>ai(e.layout,r.agentRunId),{awaitingInput:!0}),ge(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},am=(e,t,r,n)=>{let o=O.get(r);if(o===void 0)return!1;Si.add(r),vr(r);let s=xr.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(Nd(r))return!0;Jn(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${em}`:"Stopped by user.";return Ct(e,t,r,n,Qd,i,o.originalPrompt),!0}});var nA,cm,um=m(()=>{"use strict";mt();nA=()=>`http://127.0.0.1:${q()}/restart`,cm=async()=>{try{let e=await fetch(nA(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Ke,bi,oA,sA,wi,qe,ao,dm,lo=m(()=>{"use strict";Ke=p(require("node:fs")),bi=p(require("node:path")),oA="local-ws-traffic.ndjson",sA=500,wi=e=>bi.default.join(e.logsDir,oA),qe=(e,t)=>{let r=wi(e);Ke.default.mkdirSync(bi.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Ke.default.appendFileSync(r,`${n}
`,"utf8")},ao=(e,t=sA)=>{let r=wi(e);if(!Ke.default.existsSync(r))return[];let o=Ke.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},dm=e=>{let t=wi(e);Ke.default.existsSync(t)&&Ke.default.writeFileSync(t,"","utf8")}});var iA,mm,gm=m(()=>{"use strict";mt();iA=()=>`http://127.0.0.1:${q()}/update/run`,mm=async e=>{try{let t=await fetch(iA(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var pm,fm=m(()=>{"use strict";pm=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Er,aA,hm,ym=m(()=>{"use strict";lo();it();gm();fm();Er=(e,t)=>{qe(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},aA=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(cn(),qo)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},hm=async e=>{let t=z(e.layout.installDir)?.bundleVersion??null;if(!pm({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Er(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await mm({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Er(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await aA();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Er(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Er(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Er(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var lA,Am,Sm=m(()=>{"use strict";lA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Am=e=>{if(!lA(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var vm,_m,bm=m(()=>{"use strict";Qo();An();vm=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=gn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},_m=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await dt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var V,cA,uA,dA,wm,xm,Em,Wm,Rm,km,Lm=m(()=>{"use strict";V=require("node:crypto"),cA=Buffer.from("302a300506032b6570032100","hex"),uA=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},dA=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,V.createPublicKey)({key:Buffer.concat([cA,t]),format:"der",type:"spki"})},wm=()=>{let{publicKey:e,privateKey:t}=(0,V.generateKeyPairSync)("ed25519");return{publicKeyRaw:uA(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},xm=e=>(0,V.createPrivateKey)(e),Em=(e,t)=>(0,V.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Wm=(e,t,r)=>{try{let n=dA(e);return(0,V.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},Rm=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,km=()=>(0,V.randomBytes)(32).toString("base64url")});var pe,co,Cm,mA,gA,xi,Tm,Pm,Ei=m(()=>{"use strict";pe=p(require("node:fs")),co=p(require("node:path"));Lm();W();Cm=e=>co.default.join(e.installDir,et),mA=(e,t)=>{if(e.profileEmail===null||t===Cm(e)||pe.default.existsSync(t))return;let r=Cm(e);pe.default.existsSync(r)&&(pe.default.mkdirSync(co.default.dirname(t),{recursive:!0}),pe.default.renameSync(r,t))},gA=e=>{if(!pe.default.existsSync(e))return null;try{let t=pe.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},xi=e=>{let t=aa(e);mA(e,t);let r=gA(t);if(r!==null)return r;let n=wm();return pe.default.mkdirSync(co.default.dirname(t),{recursive:!0}),pe.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},Tm=e=>{let t=xi(e.layout),r=km(),n=Rm({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=xm(t.privateKeyPem),s=Em(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Pm=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Wm(e.serverPublicKey,t,e.serverAttestation)}});var pA,uo,Tt,Wi=m(()=>{"use strict";pA="local.agentwitch.com",uo=`http://${pA}:43347`,Tt="http://127.0.0.1:43347"});var Wr,mo,fA,hA,yA,AA,Im,SA,vA,Nm,Rr,Om,kr,Mm,Ri=m(()=>{"use strict";Wr=p(require("node:fs")),mo=p(require("node:path"));ot();zn();fA="rag",hA="http://127.0.0.1:11434",yA="nomic-embed-text",AA=e=>mo.default.join(e.installDir,fA),Im=(e,t)=>t!==void 0&&t.trim().length>0?Et(t).ragChunksFilePath:mo.default.join(AA(e),Xr),SA=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,l=t[i]??0;n+=a*l,o+=a*a,s+=l*l}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},vA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},Nm=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||hA,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||yA;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},Rr=(e,t)=>{let r=Im(e,t);if(!Wr.default.existsSync(r))return[];let n=Wr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Om=async e=>{let t=vA(e.text);if(t.length===0)return 0;let r=Im(e.layout,e.projectFolderPath);Wr.default.mkdirSync(mo.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await Nm(o);if(s===null)continue;let i={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Wr.default.appendFileSync(r,`${JSON.stringify(i)}
`,"utf8"),n+=1}return n},kr=async e=>{let t=await Nm(e.query);return t===null?[]:Rr(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:SA(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Mm=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var Pt,go,ki=m(()=>{"use strict";Pt=(e,t,r)=>e===1?t:r,go=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${Pt(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Pt(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${Pt(a,"day","days")} ago`;let l=Math.floor(a/7);if(l<5)return`${l} ${Pt(l,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Pt(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Pt(u,"year","years")} ago`}});var Li,Hm,Dm=m(()=>{"use strict";Li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hm=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${Li(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Li(e.errorLogPath)}</code>.</p>`;return`<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this Mac (newest lines at the bottom).</p>
      <p class="muted mono">${Li(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${r}
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var Le,Fm,Um=m(()=>{"use strict";Wi();ki();Le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fm=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} project set(s) ready to submit`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Le(e.wakeError)}</div>`:"",a=go(e.lastHeartbeatAt)??"never",l=` \xB7 also <code>${Le(uo)}</code> when DNS resolves`;return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this computer (<code>127.0.0.1</code>).</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Last heartbeat \xB7 ${Le(a)}</span>
        <span class="muted">Bundle \xB7 <code>${Le(e.installBundleVersion)}</code></span>
      </div>
    </section>
    <div class="home-grid">
      <a class="home-card" href="/harness">
        <p class="home-card-eyebrow">Setup</p>
        <h2 class="home-card-title">Harness</h2>
        <p class="home-card-lede">Reveal rules, commands, skills, and agents from your repos. Submit to <code>~/.agent-witch</code>.</p>
        <p class="home-card-meta">${Le(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Le(n)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Le(o)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${Le(s)}</p>
      </a>
      <a class="home-card" href="/status">
        <p class="home-card-eyebrow">Health</p>
        <h2 class="home-card-title">Bridge status</h2>
        <p class="home-card-lede">WebSocket, link code, install bundle, and revive actions.</p>
        <p class="home-card-meta">${e.wsConnected?"Bridge is up":"Check connection details"}</p>
      </a>
    </div>
    <section class="card home-footnote">
      <p class="muted">Listening at <a href="${Tt}"><code>${Tt}</code></a>${l}.</p>
    </section>`}});var Bm,$m=m(()=>{"use strict";Bm=`
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
.sync-cloud-row { margin-top: 1rem; }

.check-row label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; }

.check-row input { margin-right: 0.35rem; }

.harness-set { margin-top: 1rem; }
`.trim()});var po,Ci=m(()=>{"use strict";po=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var _A,bA,fo,jm,Gm=m(()=>{"use strict";$m();Ci();_A=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,bA=[{href:"/",label:"Home"},{href:"/status",label:"Status"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"},{href:"/knowledge",label:"Knowledge"},{href:"/harness",label:"Harness"}],fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jm=e=>{let t=po(e.installVersion??null),r=e.installVersion?.updatedAt!==void 0?` title="Updated ${fo(e.installVersion.updatedAt)}"`:"",n=bA.map(s=>{let i=s.href===e.activePath;return`<a class="nav-link${i?" is-active":""}" href="${s.href}"${i?' aria-current="page"':""}>${s.label}</a>`}).join(""),o=fo(e.cloudAppOrigin);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${fo(e.title)} \xB7 Agent Witch Local</title>
  <style>${Bm}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${_A}
        <span class="brand-text">Agent Witch<span class="brand-sub">Local</span><span class="brand-version"${r}>bundle ${fo(t)}</span></span>
      </a>
      <div class="site-header-actions">
        <nav class="site-nav" aria-label="Local bridge">${n}</nav>
        <a class="btn btn-primary cloud-open-link" href="${o}" target="_blank" rel="noopener noreferrer" aria-label="Open Agent Witch cloud at ${o}">Open cloud \u2197</a>
      </div>
    </div>
  </header>
  <main class="site-main">${e.body}</main>
</body>
</html>`}});var wA,Vm,zm,Km=m(()=>{"use strict";wA=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,Vm=e=>e.kind==="folder",zm=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&Vm(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=n=>{let o=[];for(let s of n.children.values()){if(Vm(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(wA)};return r(t)}});var qm,Ti,Jm=m(()=>{"use strict";qm=p(require("node:path")),Ti=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Ti(r.children,t)}</ul>
            </details>
          </li>`;let n=qm.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var Ym,fe,xA,EA,ho,WA,Xm,Zm=m(()=>{"use strict";Ym=p(require("node:path"));Km();Jm();fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xA=()=>`(() => {
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
})();`,EA=()=>`(() => {
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
})();`,ho=e=>{let t=e.flashError?`<div class="alert-error">${fe(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${fe(e.flashMessage)}</div>`:"",r=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':WA(e.reveal),n=e.reveal?.scanRoots[0]?.trim()??"",o=n.length>0&&e.scanFolder.trim()===n;return`${t}<section class="card">
      <p class="eyebrow">Local harness</p>
      <h1>Reveal &amp; submit</h1>
      <p class="lede">Pick one folder under your home directory, scan for projects with <code>.cursor</code>, then submit your selection to the local harness. Scanning <code>~</code> can take a while \u2014 prefer a project folder or use <strong>Stop</strong>.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${fe(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${fe(n)}" />
        </label>
        <div class="actions">
          <button class="btn btn-secondary" type="button" id="pickFolder">Choose folder\u2026</button>
          <button class="btn btn-secondary" type="button" id="addProject">Add project\u2026</button>
          <button class="btn btn-primary" type="button" id="revealStart"${o?" hidden":""}>Reveal</button>
          <button class="btn btn-secondary" type="button" id="revealStop" hidden>Stop</button>
        </div>
        <div class="reveal-progress" id="revealProgress" hidden>
          <p class="muted">Scanning\u2026 folders with <code>.cursor</code> appear below.</p>
          <div class="reveal-live-list" id="revealFolderList"></div>
        </div>
      </div>
    </section>
    ${r}
    <script>${xA()}</script>
    <script>${EA()}</script>`},WA=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o])=>{let s=o.sets.map(({set:i,setIndex:a})=>{let l=zm(i.items.map(g=>({...g,relativePath:typeof g.relativePath=="string"&&g.relativePath.length>0?g.relativePath:Ym.default.relative(i.sourceRoot,g.sourcePath).replaceAll("\\","/")}))),d=Ti(l,fe),u=i.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${a}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${a}" value="${fe(i.proposedSlug)}" />
              <input type="hidden" name="setName-${a}" value="${fe(i.proposedName)}" />
              <p class="muted mono">${fe(i.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${u} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${d}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <h2 class="harness-group-title">${fe(n)}</h2>
          ${s}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Toggle sets with <strong>Include in submit</strong>.</p>
      <label class="check-row sync-cloud-row">
        <input type="checkbox" name="syncToCloud" value="on" />
        Report manifest to cloud after submit (requires WS connected on Status)
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit selected to local harness</button>
      </div>
    </form>`},Xm=(e,t)=>{let r=new Set(e.getAll("includeSet").map(s=>Number.parseInt(String(s),10)).filter(s=>Number.isFinite(s))),n=Number.parseInt(e.get("setCount")??"0",10),o=[];for(let s=0;s<n;s+=1){let i=e.get(`setSlug-${s}`)?.trim()??"",a=e.get(`setName-${s}`)?.trim()??i,l=t.sets[s];if(l===void 0)continue;let d=i.length>0?i:l.proposedSlug,u=a.length>0?a:l.proposedName,g=r.size===0||r.has(s),f=l.items.map(y=>({id:y.id,kind:y.kind,title:y.title,sourcePath:y.sourcePath,include:g}));o.push({slug:d,name:u,items:f})}return o}});var Pi,Qm=m(()=>{"use strict";Pi=()=>"~"});var eg,tg,rg=m(()=>{"use strict";eg=require("node:child_process"),tg=()=>{if(process.platform!=="darwin")return null;try{let t=(0,eg.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var ng,og,sg=m(()=>{"use strict";ng=require("node:crypto"),og=e=>`local-${(0,ng.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Ii,ig=m(()=>{"use strict";Ii=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Lr,yo,Ni=m(()=>{"use strict";Lr=p(require("node:path")),yo=e=>{let t=Lr.default.dirname(e),r=Lr.default.basename(t);return r==="agents"?Lr.default.basename(Lr.default.dirname(t)):r}});var Cr,he,ag,RA,kA,LA,Ao,lg,Oi=m(()=>{"use strict";Cr=p(require("node:fs")),he=p(require("node:path"));sg();ig();Ni();ag=new Set(["node_modules",".git","dist","build",".next","coverage"]),RA=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},kA=(e,t)=>{let r=he.default.basename(t);if(e==="skill"){let n=t.split(he.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},LA=e=>{let t=[],r=(o,s)=>{let i;try{i=Cr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&ag.has(a.name))continue;let l=he.default.join(o,a.name),d=s?he.default.join(s,a.name):a.name;if(a.isDirectory()){r(l,d);continue}if(!a.isFile())continue;Ii(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:l})}};for(let o of["rules","commands","agents","instructions"]){let s=he.default.join(e,o);Cr.default.existsSync(s)&&r(s,o)}let n=he.default.join(e,"skills");return Cr.default.existsSync(n)&&r(n,"skills"),t},Ao=e=>{let t=LA(e);if(t.length===0)return null;let r=he.default.dirname(e),n=yo(e),o=RA(n),s=t.map(i=>{let a=Ii(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:og(i.absolutePath),kind:a,title:kA(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},lg=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=Cr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||ag.has(a.name))continue;let l=he.default.join(o,a.name);if(a.name===".cursor"){yield l;continue}yield*n(l,s+1)}};yield*n(e,0)}});var So,Mi,Tr,CA,Je,vo,Pr=m(()=>{"use strict";So=p(require("node:fs")),Mi=p(require("node:os")),Tr=p(require("node:path")),CA=()=>So.default.realpathSync(Tr.default.resolve(Mi.default.homedir())),Je=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Tr.default.join(Mi.default.homedir(),t.slice(1)):t,n;try{n=So.default.realpathSync(Tr.default.resolve(r))}catch{return null}let o=CA();return n===o||n.startsWith(`${o}${Tr.default.sep}`)?n:null},vo=e=>{let t=Je(e);if(t===null)return null;try{if(!So.default.statSync(t).isFile())return null}catch{return null}return t}});var cg,Hi,TA,ug,dg=m(()=>{"use strict";cg=p(require("node:fs")),Hi=p(require("node:path"));Oi();Pr();TA=e=>{let t=Je(e.trim());if(t===null)return null;if(Hi.default.basename(t)===".cursor")return t;let r=Hi.default.join(t,".cursor");try{if(cg.default.statSync(r).isDirectory())return Je(r)}catch{return null}return null},ug=e=>{let t=TA(e.projectPath);if(t===null)return null;let r=Ao(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var mg,PA,_o,gg,pg=m(()=>{"use strict";mg=p(require("node:path"));Oi();Pr();Ni();PA=5,_o=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},gg=e=>{let t=Je(e.scanRoot.trim());if(t===null)return _o(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of lg(t,PA,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Je(s);if(i===null)continue;let a=yo(i);_o(e.response,"folder",{cursorDir:i,groupName:a,repoPath:mg.default.dirname(i)});let l=Ao(i);l!==null&&(r.push(l),_o(e.response,"set",{proposedSlug:l.proposedSlug,proposedName:l.proposedName,groupName:a,itemCount:l.items.length,sourceRoot:l.sourceRoot,tree:l.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return _o(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var fg,hg,yg=m(()=>{"use strict";fg=p(require("node:path")),hg=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:fg.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var B,Ag,Di,IA,Sg,vg,Fi,Ir,_g=m(()=>{"use strict";B=p(require("node:fs")),Ag=p(require("node:os")),Di=p(require("node:path"));is();Pr();yg();IA=e=>{if(!B.default.existsSync(e))return null;try{let t=JSON.parse(B.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Sg=e=>{let t=e.hostname??Ag.default.hostname(),r=IA(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let l=[];for(let u of a){let g=vo(u.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let f=B.default.readFileSync(g,"utf8");l.push({id:u.id,kind:u.kind,title:u.title,content:f,setSlugs:[i.slug]})}let d=bn({bundle:{name:i.name,slug:i.slug,items:l},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)o.add(u);for(let u of d.files)s.push(u),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{B.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)B.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Di.default.join(e.layout.harnessRootDir,i.relativePath);B.default.mkdirSync(Di.default.dirname(a),{recursive:!0}),B.default.writeFileSync(a,i.content)}return B.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},vg="reveal-cache.json",Fi=(e,t)=>{B.default.mkdirSync(e.harnessRootDir,{recursive:!0}),B.default.writeFileSync(`${e.harnessRootDir}/${vg}`,`${JSON.stringify(t,null,2)}
`)},Ir=e=>{let t=`${e.harnessRootDir}/${vg}`;if(!B.default.existsSync(t))return null;try{let r=JSON.parse(B.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return hg(r)}catch{return null}return null}});var It,NA,Ui,bg=m(()=>{"use strict";It=p(require("node:fs")),NA=256e3,Ui=(e,t=NA)=>{if(!It.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=It.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=It.default.openSync(e,"r");try{It.default.readSync(a,i,0,s,o)}finally{It.default.closeSync(a)}let l=i.toString("utf8");if(o>0){let d=l.indexOf(`
`);d>=0&&(l=l.slice(d+1))}return{content:l,exists:!0,truncated:o>0,byteSize:n}}});var wg,xg=m(()=>{"use strict";wg="https://www.agentwitch.com"});var Eg,Wg=m(()=>{"use strict";xg();Xt();at();Eg=e=>{let t=se(),r=t!==null?K(t.wsUrl):null;if(r!==null&&r.length>0)return r;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):wg}});var Rg,kg=m(()=>{"use strict";Rg=e=>!e});var Cg,Nr,Tg,bo,Lg,N,$i,I,Ce,Bi,OA,Pg,Ig,Ng=m(()=>{"use strict";Cg=p(require("node:http")),Nr=p(require("node:fs")),Tg=p(require("node:path"));Wi();lo();Ri();rr();pt();ki();Dm();Um();Gm();Zm();Qm();rg();dg();Pr();pg();_g();Ci();bg();it();Wg();kg();Ei();bo=e=>go(e)??"never",Lg=48e3,N=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$i={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},I=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...$i}),e.end(JSON.stringify(r))},Ce=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Bi=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},OA=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${N(e.status.wakeError)}</div>`:"",o=Rg(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Mac-side Agent Witch bridge at <a href="${Tt}"><code>${Tt}</code></a>.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${N(bo(e.status.lastHeartbeatAt))}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${N(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${N(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${N(bo(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${N(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},Pg=e=>{let t=Tg.default.join(e.layout.installDir,"link-code.txt"),r=()=>z(e.layout.installDir),n=()=>{let a=r();return{installBundleVersion:po(a),installBundleUpdatedAt:a?.updatedAt??null,installVersion:a}},o=a=>{let l=a.installVersion??r();return jm({...a,installVersion:l,cloudAppOrigin:Eg(l)})},s=()=>{if(Nr.default.existsSync(t))return Nr.default.readFileSync(t,"utf8").trim();let a=Math.random().toString(36).slice(2,8).toUpperCase();return Nr.default.writeFileSync(t,a,"utf8"),a},i=Cg.default.createServer((a,l)=>{(async()=>{let d=a.url?.split("?")[0]??"/",u=a.method??"GET";if(u==="OPTIONS"){l.writeHead(204,$i),l.end();return}if(u==="GET"&&d==="/health"){let g=e.controllers.getStatus(),f=n();I(l,200,{ok:!0,...g,installBundleVersion:f.installBundleVersion,installBundleUpdatedAt:f.installBundleUpdatedAt});return}if(u==="GET"&&d==="/api/status"){let g=n();I(l,200,{...e.controllers.getStatus(),linkCode:s(),installBundleVersion:g.installBundleVersion,installBundleUpdatedAt:g.installBundleUpdatedAt});return}if(u==="GET"&&d==="/api/traffic"){I(l,200,{entries:ao(e.layout)});return}if(u==="DELETE"&&d==="/api/traffic"){dm(e.layout),I(l,200,{ok:!0});return}if(u==="GET"&&d==="/api/knowledge"){let f=new URL(a.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(f.length>0){let y=await kr({layout:e.layout,query:f,limit:20});I(l,200,{chunks:y,query:f});return}I(l,200,{chunks:Rr(e.layout).slice(-50).reverse()});return}if(u==="POST"&&d==="/api/revive"){e.controllers.reviveWebSocket(),I(l,200,{ok:!0});return}if(u==="GET"&&d==="/"){let g=e.controllers.getStatus(),f=n(),y=Ir(e.layout),A=Ui(e.layout.errorLogPath);Ce(l,o({title:"Home",activePath:"/",installVersion:f.installVersion,body:Fm({wsConnected:g.wsConnected,lastHeartbeatAt:g.lastHeartbeatAt,installBundleVersion:f.installBundleVersion,harnessSetCount:y?.sets.length??0,knowledgeChunkCount:Rr(e.layout).length,trafficEntryCount:ao(e.layout).length,wakeError:g.wakeError,errorLogByteSize:A.byteSize,errorLogExists:A.exists})}));return}if(u==="GET"&&d==="/errors"){let g=n(),f=Ui(e.layout.errorLogPath);Ce(l,o({title:"Errors",activePath:"/errors",installVersion:g.installVersion,body:Hm({errorLogPath:e.layout.errorLogPath,content:f.content,exists:f.exists,truncated:f.truncated,byteSize:f.byteSize})}));return}if(u==="GET"&&d==="/status"){let g=e.controllers.getStatus(),f=Z(e.layout),y=ae(f,ie),A=n();Ce(l,o({title:"Status",activePath:"/status",installVersion:A.installVersion,body:OA({status:g,stale:y,linkCode:s(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt})}));return}if(u==="GET"&&d==="/traffic"){let g=ao(e.layout),f=n(),y=g.map(c=>`<tr><td title="${N(c.at)}">${N(bo(c.at))}</td><td>${N(c.direction)}</td><td><code>${N(c.type)}</code></td><td>${N(c.summary)}</td><td>${N(c.action??"")}</td></tr>`).join(""),A=g.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${y}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';Ce(l,o({title:"Traffic",activePath:"/traffic",installVersion:f.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${A}
            </section>`}));return}if(u==="GET"&&d==="/harness"){let g=new URL(a.url??"/",`http://127.0.0.1:${43347}`),f=n(),y=Ir(e.layout),A=g.searchParams.get("submitted")==="1"?g.searchParams.get("syncFailed")==="1"?`Local harness updated (${g.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:g.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${g.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":g.searchParams.get("added")==="1"?"Project added to reveal list.":g.searchParams.get("stopped")==="1"?`Reveal stopped. ${y?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:g.searchParams.get("revealed")==="1"?`Reveal found ${y?.sets.length??0} set(s).`:null,c=y?.scanRoots[0]??Pi();Ce(l,o({title:"Harness",activePath:"/harness",installVersion:f.installVersion,body:ho({scanFolder:c,reveal:y,flashMessage:A})}));return}if(u==="POST"&&d==="/api/harness/pick-folder"){let g=tg();if(g===null){I(l,200,{cancelled:!0});return}I(l,200,{path:g});return}if(u==="GET"&&d==="/api/harness/file-content"){let f=new URL(a.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",y=vo(f);if(y===null){I(l,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let A=Nr.default.readFileSync(y,"utf8"),c=A.length>Lg?`${A.slice(0,Lg)}
\u2026 (truncated)`:A;I(l,200,{content:c})}catch{I(l,500,{errorMessage:"Could not read file."})}return}if(u==="POST"&&d==="/api/harness/reveal/add-project"){let g=await Bi(a),f="";try{let c=JSON.parse(g);typeof c=="object"&&c!==null&&typeof c.projectPath=="string"&&(f=c.projectPath.trim())}catch{I(l,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(f.length===0){I(l,400,{ok:!1,errorMessage:"projectPath is required."});return}let y=Ir(e.layout),A=ug({reveal:y,projectPath:f});if(A===null||A.sets.length===0){I(l,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Fi(e.layout,A),I(l,200,{ok:!0,setCount:A.sets.length});return}if(u==="GET"&&d==="/api/harness/reveal/stream"){let f=new URL(a.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(f.length===0){I(l,400,{errorMessage:"Choose a folder to scan first."});return}let y=!1;a.on("close",()=>{y=!0}),l.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...$i});let A=gg({scanRoot:f,response:l,shouldAbort:()=>y});Fi(e.layout,A),l.end();return}if(u==="POST"&&d==="/harness/reveal"){l.writeHead(410,{"Content-Type":"text/plain"}),l.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(u==="POST"&&d==="/harness/submit"){let g=Ir(e.layout);if(g===null){let h=n();Ce(l,o({title:"Harness",activePath:"/harness",installVersion:h.installVersion,body:ho({scanFolder:Pi(),reveal:null,flashError:"Run reveal before submit."})}));return}let f=await Bi(a),y=new URLSearchParams(f),A=Xm(y,g),c=Sg({layout:e.layout,sets:A});if(!c.ok){let h=n();Ce(l,o({title:"Harness",activePath:"/harness",installVersion:h.installVersion,body:ho({scanFolder:g.scanRoots[0]??"",reveal:g,flashError:c.errorMessage??"Submit failed."})}));return}let S=y.get("syncToCloud")==="on",w="";S&&(w=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1"),l.writeHead(303,{Location:`/harness?submitted=1&count=${c.writtenItemCount??0}${w}`}),l.end();return}if(u==="GET"&&d==="/knowledge"){let f=new URL(a.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",y=n(),c=(f.length>0?await kr({layout:e.layout,query:f,limit:20}):Rr(e.layout).slice(-50).reverse()).map(S=>`<article class="card"><div class="muted" title="${N(S.createdAt)}">${N(bo(S.createdAt))}${S.source?` \xB7 ${N(S.source)}`:""}</div><pre>${N(S.text)}</pre></article>`).join("");Ce(l,o({title:"Knowledge",activePath:"/knowledge",installVersion:y.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${N(f)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${c||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}u==="POST"&&await Bi(a),l.writeHead(404),l.end("Not found")})().catch(d=>{console.error("[agent-witch-local-app]",d),l.writeHead(500),l.end("Internal error")})});return i.on("error",a=>{if(a.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",a)}),i.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${uo}`)}),i},Ig=e=>xi(e).publicKeyRaw});var Or,ji,Og,Mg,Hg,Dg,Fg=m(()=>{"use strict";Or=p(require("node:fs")),ji=p(require("node:path"));ot();zn();Og=(e,t)=>ji.default.join(Et(t).memoryDirPath,Zr),Mg=(e,t)=>{let r=Og(e,t);if(!Or.default.existsSync(r))return[];let n=Or.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Hg=e=>{let t=Og(e.layout,e.projectFolderPath);Or.default.mkdirSync(ji.default.dirname(t),{recursive:!0}),Or.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},Dg=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Ug,MA,HA,DA,Bg,$g=m(()=>{"use strict";Ug=p(require("node:os"));W();MA="Default",HA=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),DA=e=>{let t=Ug.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Bg=()=>{let e=E(),t=ia(e),r=HA(MA);return`${DA(t)}/${r.length>0?r:"project"}`}});var jg,FA,Gg,Vg=m(()=>{"use strict";jg=require("node:child_process");no();ut();FA=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,jg.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},Gg=async e=>{if(!M(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};try{await ke(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await FA(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var zg,Kg=m(()=>{"use strict";zg=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var qg,Jg,Yg=m(()=>{"use strict";qg=require("node:crypto"),Jg=()=>(0,qg.randomUUID)()});var Mr,UA,Xg,wo=m(()=>{"use strict";Mr="[[WORKING_ESTIMATE]]",UA=["Put this marker on its own line:",Mr,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),Xg=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",UA,"","Task to estimate:",e.trim()].join(`
`)});var Zg,Qg=m(()=>{"use strict";Zg=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var ep,tp=m(()=>{"use strict";ep=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var BA,rp,np=m(()=>{"use strict";wo();BA=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,rp=e=>{if(!e.includes(Mr))return null;let t=null;for(let r of e.matchAll(BA)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var op,sp=m(()=>{"use strict";es();wo();Qg();tp();np();Ut();op=async e=>{let t=Zg(e.wrappedPrompt),r=Xg(t),n=await yn(e.config,e.writerAgent,r),o=rp(n.output),s=ep(o);return Ft({reportKey:e.reportKey,agentRunId:e.agentRunId,status:X.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var ip={};Te(ip,{buildContinuationPromptWithContext:()=>GA});var $A,jA,GA,ap=m(()=>{"use strict";$A=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,jA=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),GA=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=jA(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${$A(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var lp={};Te(lp,{readHarnessExportSets:()=>zA});var Hr,Gi,xo,VA,zA,cp=m(()=>{"use strict";Hr=p(require("node:fs")),Gi=p(require("node:path"));W();xo=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VA=e=>{if(!Hr.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Hr.default.readFileSync(e.harnessManifestPath,"utf8"));if(xo(t))return t}catch{return null}return null},zA=(e,t)=>{let r=E(t),n=VA(r);if(n===null)return[];let o=xo(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!xo(a)||typeof a.name!="string")continue;let l=Array.isArray(a.items)?a.items:[],d=[];for(let u of l){if(!xo(u))continue;let g=typeof u.path=="string"?u.path:void 0,f=typeof u.id=="string"?u.id:"",y=typeof u.kind=="string"?u.kind:"",A=typeof u.title=="string"?u.title:"";if(g===void 0||f.length===0||y.length===0||A.length===0)continue;let c=g.startsWith("shared/")?Gi.default.join(r.harnessRootDir,g):Gi.default.join(r.harnessSetsDir,i,g);Hr.default.existsSync(c)&&d.push({id:f,kind:y,title:A,content:Hr.default.readFileSync(c,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var hp={};Te(hp,{startAgentWitchClient:()=>aS});var Ki,Dr,Nt,lS,KA,qA,JA,YA,XA,up,ZA,dp,mp,gp,Vi,k,pp,C,zi,QA,Eo,eS,tS,rS,nS,oS,sS,iS,fp,aS,yp=m(()=>{"use strict";Ki=require("node:child_process"),Dr=p(require("node:fs")),Nt=p(require("node:os"));_u();Yr();jo();Do();ti();Ie();ku();Tu();rd();mt();W();lm();fn();eo();Ai();no();ut();ui();rr();pt();Qn();um();ym();it();Sm();bm();Ei();lo();Ng();Ri();Fg();at();$g();oi();Vg();Uo();on();Ze();en();Kg();Yg();wo();Ut();sp();lS={},KA="ws://localhost:3000/api/agent-witch/ws",qA="claude",JA="codex",YA="cursor",XA="agy",up=3e4,ZA=3e4,dp=new Map,mp=new Map,gp=new Map,Vi=e=>{let t=e?.trim()??"";return t.length>0?t:Bg()},k=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pp=e=>{let t=E(e);if(!Dr.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Dr.default.readFileSync(t.configPath,"utf8"));if(!k(r))throw new Error("Config must be a JSON object.");let n=process.env.AGENT_WITCH_WS_URL?.trim()??"",o=typeof r.wsUrl=="string"?r.wsUrl.trim():"",s=n.length>0?n:o.length>0?o:KA,i=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),a=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??qA,l=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??JA,d=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??YA,u=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??XA,g=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",f=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return g.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:f,wsUrl:s,workspace:i,claudeCommand:a,codexCommand:l,cursorCommand:d,antigravityCommand:u,pairingToken:g,layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},C=(e,t,r)=>{e.readyState===mr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&qe(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}))},zi=e=>e,QA=e=>{if(!Dr.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Dr.default.readFileSync(e.harnessManifestPath,"utf8"));if(k(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Eo=(e,t)=>{let r=QA(t);r!==null&&C(e,{type:"harness.manifest.report",payload:{hostname:Nt.default.hostname(),manifest:r}})},eS=async(e,t,r,n,o,s,i=!1,a,l,d,u)=>{if(!M(t)){C(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let g=oo(t)&&!Kd(t);if(g){try{await ke(e.layout.installDir,t)}catch(v){let b=v instanceof Error?v.message:String(v);C(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}hi(t)}else if(!oo(t))try{await ke(e.layout.installDir,t)}catch(v){let b=v instanceof Error?v.message:String(v);C(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${b}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let f=i&&zd(t)&&qd(t)?"continue":"first",y=r;if(i&&f==="first"&&typeof l=="string"&&l.length>0){let v=Xn(e.layout,l);if(v!==null){let{buildContinuationPromptWithContext:b}=await Promise.resolve().then(()=>(ap(),ip));y=b({priorPrompt:v.prompt,priorOutput:v.resultOutput??"",userMessage:r})}}let A=Vi(d);yr({projectFolderPath:A});let c=await kr({layout:e.layout,query:y,limit:5,projectFolderPath:A}),S=Mg(e.layout,A),w=`${Dg(S)}${Mm(c)}${y}`,h=u?.trim()??(s!==void 0&&A.trim().length>0?Jg():void 0);if(s!==void 0&&h!==void 0&&h.length>0&&A.trim().length>0){rn({reportKey:h,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let v=await op({config:{workspace:e.workspace,claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand},writerAgent:t,wrappedPrompt:w,reportKey:h,agentRunId:s});if(v.estimateSeconds!==null){let b=`${Mr}
${v.estimateSeconds}
`;Ve(s)?C(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:b},requestId:n}):kt(s,b)}w=zg(w,v),w=La(w,{agentRunId:s,reportKey:h,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}_i(e,t,w,n,zi(o),s,{sessionTurn:f},a,A,h),g&&s!==void 0&&C(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Yd(t)},requestId:n})},tS=async(e,t,r,n,o)=>{let s=(i,a)=>{C(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await Xd({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,commands:xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,C(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:n})}}),l=M(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?so(l):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},rS=(e,t,r)=>new Promise(n=>{if(!M(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=ct(t,r,xe({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,Ki.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),nS=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(C(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){C(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!M(o)){C(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let i=await(async()=>{try{await ke(e.layout.installDir,o)}catch(a){let l=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${l}`}}return rS(e,o,s)})();C(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Eo(n,e.layout)},oS=e=>{let t=1e3*2**e;return Math.min(ZA,t)},sS=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=c=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${c})\u2026`),t.wakeError=`restart:${c}`,cm().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(c,S="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,hm({layout:e.layout,remoteBundleVersion:c,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let c=Z(e.layout);c!==null&&ae(c,ie)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),l(),y())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},l=()=>{t.socket!==void 0&&(t.socket.removeAllListeners(),(t.socket.readyState===mr.OPEN||t.socket.readyState===mr.CONNECTING)&&t.socket.close(),t.socket=void 0,t.wsConnected=!1)},d=()=>{i(),t.localHealthTimer=setInterval(o,up)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let c=oS(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${c}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,y()},c)},g=c=>{s();let S=()=>{let w=z(e.layout.installDir)?.bundleVersion??null,h=q();C(c,{type:"agent.heartbeat",payload:{hostname:Nt.default.hostname(),macOsUsername:Nt.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},...w!==null?{installBundleVersion:w}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,up)},f=(c,S)=>{if(typeof c.type!="string")return;qe(e.layout,{direction:"in",type:c.type,summary:"inbound WS frame"});let w=typeof c.requestId=="string"?c.requestId:void 0;if(c.type==="device.auth.attestation"&&k(c.payload)){let h=typeof c.payload.serverPublicKey=="string"?c.payload.serverPublicKey:"",v=typeof c.payload.origin=="string"?c.payload.origin:"",b=typeof c.payload.devicePublicKey=="string"?c.payload.devicePublicKey:"",T=typeof c.payload.challenge=="string"?c.payload.challenge:"",$=typeof c.payload.serverAttestation=="string"?c.payload.serverAttestation:"";if(!Pm({serverPublicKey:h,origin:v,devicePublicKey:b,challenge:T,serverAttestation:$})){t.wakeError="Server attestation verification failed",qe(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(c.type==="writer.ensure"&&k(c.payload)){let h=typeof c.payload.writerAgent=="string"?c.payload.writerAgent:"";qe(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),Gg({layout:e.layout,writerAgent:h,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(v=>{C(S,{type:"writer.status",payload:v},e.layout)})}if(c.type==="install.bundle.update"&&k(c.payload)){let h=typeof c.payload.bundleVersion=="string"?c.payload.bundleVersion.trim():"";h.length>0&&n(h,"install.bundle.update")}if(c.type==="system.ack"){us(e.layout,{wsUrl:e.wsUrl});let h=k(c.payload)?c.payload:null,v=Am(h);v!==null&&n(v)}if(c.type==="device.restart"&&r("cloud-device-restart"),c.type==="automations.sync"&&k(c.payload)&&vm(c.payload),c.type==="automations.run"&&k(c.payload)&&_m(c.payload),c.type==="terminal.stream.accepted"&&k(c.payload)){let h=typeof c.payload.runId=="string"?c.payload.runId:"";if(h.length>0){let v=xd(h);for(let b of v)C(S,{type:"terminal.stream.chunk",payload:{runId:h,chunk:b},requestId:w})}}if(c.type==="agent.agentRun.list"&&C(S,{type:"dashboard.agentRun.list.result",payload:{runs:fd(e.layout)},requestId:w}),c.type==="agent.agentRun.get"&&k(c.payload)){let h=typeof c.payload.runId=="string"?c.payload.runId:"",v=h.length>0?Xn(e.layout,h):null;C(S,{type:"dashboard.agentRun.get.result",payload:{run:v},requestId:w})}if(c.type==="command.claude.run"&&k(c.payload)){let h=c.payload.prompt,v=typeof c.payload.writerAgent=="string"&&M(c.payload.writerAgent)?c.payload.writerAgent:"claude-cli",b=typeof c.payload.agentRunId=="string"?c.payload.agentRunId:void 0,T=c.payload.sessionContinuation===!0,$=typeof c.payload.sourceRunId=="string"?c.payload.sourceRunId:void 0,ye=typeof c.payload.shellSessionId=="string"?c.payload.shellSessionId:void 0,Xe=Vi(typeof c.payload.projectFolderPath=="string"?c.payload.projectFolderPath:void 0),Ot=typeof c.payload.reportKey=="string"?c.payload.reportKey:void 0;typeof h=="string"&&h.trim().length>0&&(console.log(`[agent-witch] Running ${v} task (${T?"continue":"first"})\u2026`),b!==void 0&&ye!==void 0&&dp.set(b,ye),b!==void 0&&(mp.set(b,Xe),gp.set(b,h.trim()),yr({projectFolderPath:Xe})),eS(e,v,h.trim(),w,S,b,T,ye,$,Xe,Ot))}if(c.type==="shell.session.open"&&k(c.payload)){let h=typeof c.payload.shellSessionId=="string"?c.payload.shellSessionId:"",v=typeof c.payload.cols=="number"?c.payload.cols:120,b=typeof c.payload.rows=="number"?c.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Od({shellSessionId:h,cwd:e.workspace,cols:v,rows:b,send:T=>{C(S,T)},requestId:w}))}if(c.type==="shell.session.close"&&k(c.payload)){let h=typeof c.payload.shellSessionId=="string"?c.payload.shellSessionId:"";h.length>0&&br(h,v=>{C(S,v)},w)}if(c.type==="shell.input"&&k(c.payload)){let h=typeof c.payload.shellSessionId=="string"?c.payload.shellSessionId:"",v=typeof c.payload.data=="string"?c.payload.data:"";h.length>0&&v.length>0&&Pd(h,v)}if(c.type==="shell.resize"&&k(c.payload)){let h=typeof c.payload.shellSessionId=="string"?c.payload.shellSessionId:"",v=typeof c.payload.cols=="number"?c.payload.cols:0,b=typeof c.payload.rows=="number"?c.payload.rows:0;h.length>0&&v>0&&b>0&&Id(h,v,b)}if(c.type==="command.writer.session.end"&&k(c.payload)){let h=c.payload.writerAgent;typeof h=="string"&&M(h)&&Jd(h)}if(c.type==="command.writer.session.start"&&k(c.payload)){let h=c.payload.writerAgent,v=typeof c.payload.writerSessionId=="string"?c.payload.writerSessionId:"";typeof h=="string"&&M(h)&&v.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),tS(e,h,v,w,S))}if(c.type==="command.claude.stop"&&k(c.payload)){let h=typeof c.payload.agentRunId=="string"?c.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),am(e,zi(S),h,w))}if(c.type==="command.claude.input_respond"&&k(c.payload)){let h=typeof c.payload.agentRunId=="string"?c.payload.agentRunId:"",v=typeof c.payload.response=="string"?c.payload.response.trim():"",b=typeof c.payload.originalPrompt=="string"?c.payload.originalPrompt:"",T=typeof c.payload.partialOutput=="string"?c.payload.partialOutput:"",$=typeof c.payload.question=="string"?c.payload.question:"";h.length>0&&v.length>0&&b.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),sm(e,{agentRunId:h,originalPrompt:b,partialOutput:T,question:$,response:v,shellSessionId:dp.get(h)},w,zi(S)))}if(c.type==="dispatch.approval.required"&&k(c.payload)){let h=typeof c.payload.requesterEmail=="string"?c.payload.requesterEmail:"A teammate",v=typeof c.payload.prompt=="string"?c.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${v}`),process.platform==="darwin"&&(0,Ki.spawn)("osascript",["-e",`display notification "${v.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(c.type==="harness.request"&&k(c.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),nS(e,c.payload,w,S)),c.type==="harness.export.request"&&k(c.payload)){let h=typeof c.payload.borrowerUserId=="string"?c.payload.borrowerUserId:"",v=typeof c.payload.targetDeviceId=="string"?c.payload.targetDeviceId:void 0,b=Array.isArray(c.payload.setSlugs)?c.payload.setSlugs.filter(T=>typeof T=="string"):[];h.length>0&&b.length>0&&(async()=>{let{readHarnessExportSets:T}=await Promise.resolve().then(()=>(cp(),lp)),$=T(b,e.email);C(S,{type:"harness.export.result",payload:{success:$.length>0,borrowerUserId:h,...v!==void 0?{targetDeviceId:v}:{},sets:$,errorMessage:$.length>0?void 0:"No readable harness sets were found on this machine."},requestId:w})})()}if(c.type==="harness.manifest.request"&&Eo(S,e.layout),c.type==="command.claude.result"&&k(c.payload)&&typeof c.payload.output=="string"&&c.payload.output.trim().length>0){let h=typeof c.payload.agentRunId=="string"?c.payload.agentRunId:void 0,v=Vi(h!==void 0?mp.get(h):void 0),b=h!==void 0?gp.get(h)??"":"";Om({layout:e.layout,text:c.payload.output,source:h??"command.claude.result",projectFolderPath:v}),b.trim().length>0&&Hg({layout:e.layout,projectFolderPath:v,entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:b,output:c.payload.output,createdAt:new Date().toISOString()}})}},y=()=>{if(t.stopped)return;a(),l();let c=new mr(e.wsUrl);t.socket=c,c.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),us(e.layout,{wsUrl:e.wsUrl}),tm(pn({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),rm(e.layout);let S=K(e.wsUrl)??"http://localhost:3000",w=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=Tm({layout:e.layout,origin:S,...w!==void 0&&w.length>0?{claimToken:w}:{}});C(c,{type:"agent.register",payload:{role:"agent",hostname:Nt.default.hostname(),macOsUsername:Nt.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),Eo(c,e.layout),im(e,c),g(c)}),c.on("message",S=>{let w=typeof S=="string"?S:S.toString("utf8");try{let h=JSON.parse(w);if(!k(h))return;f(h,c)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),c.on("close",()=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1,console.log("[agent-witch] Disconnected from server."),u()}),c.on("error",S=>{t.wakeError=S.message,console.error(`[agent-witch] Socket error: ${S.message}`)})};return{connect:y,startLocalHealthCheck:d,stop:()=>{t.stopped=!0,s(),i(),a(),l()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Ig(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,y()},reportHarnessManifestIfConnected:()=>{let c=t.socket;return!t.wsConnected||c===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Eo(c,e.layout),{ok:!0})}}},iS=async()=>{let e=()=>{let r=ua();if(r.length===0){let n=pp(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=pp(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},fp=async()=>{nt("agent-witch"),Eu().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=_();Cu(t);let r=Ru({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),sn();let n=await iS(),o=n.map(u=>sS(u)),s=o[0];s===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ei(),process.exit(0));let i=()=>{for(let u of o)u.reviveWebSocket()},a=()=>{},l=await td({reconnectWebSockets:i,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),a()}});Pg({layout:n[0].layout,controllers:{getStatus:s.getStatus,reviveWebSocket:i,reportHarnessManifestIfConnected:s.reportHarnessManifestIfConnected}});for(let u of o)u.startLocalHealthCheck(),u.connect();console.log(`[agent-witch] Bridging ${o.length} account profile(s) in one process.`);let d=Jr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),qr(),a()});a=()=>{d(),l.stop(),ei(),console.log("[agent-witch] Shutting down.");for(let u of o)u.stop();process.exit(0)},process.on("SIGINT",()=>{a()}),process.on("SIGTERM",()=>{a()})},aS=fp;if(st(lS.url)&&!Y()){let e=process.argv.indexOf("report");e>=0&&process.exit(nn(process.argv.slice(e))),fp()}});Yr();Uo();on();var Ha="20.x",Da="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var qp=e=>[`Node.js ${Ha} or newer is required (found ${e}).`,Da].join(" "),Fa=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${qp(process.version)}
`),process.exit(1))};var mS={},cS=async()=>{nt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(cn(),qo)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},uS=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Ls(),hc)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},dS=async()=>{if(!st(mS.url))return;Fa();let e=process.argv.indexOf("report");e>=0&&process.exit(nn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await cS();return}if(t==="wake"){await uS();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(yp(),hp));await r()};dS();
