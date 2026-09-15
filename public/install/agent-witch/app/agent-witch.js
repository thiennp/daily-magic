#!/usr/bin/env node
"use strict";var Og=Object.create;var xo=Object.defineProperty;var Mg=Object.getOwnPropertyDescriptor;var Hg=Object.getOwnPropertyNames;var Dg=Object.getPrototypeOf,Fg=Object.prototype.hasOwnProperty;var m=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var D=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Ie=(e,t)=>{for(var r in t)xo(e,r,{get:t[r],enumerable:!0})},Ug=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Hg(t))!Fg.call(e,o)&&o!==r&&xo(e,o,{get:()=>t[o],enumerable:!(n=Mg(t,o))||n.enumerable});return e};var g=(e,t,r)=>(r=e!=null?Og(Dg(e)):{},Ug(t||!e||!e.__esModule?xo(r,"default",{value:e,enumerable:!0}):r,e));var qi,Ji,ko=m(()=>{"use strict";qi=new Set(["","loginwindow","_mbsetupuser","root"]),Ji=5e3});var Yi,Fr,Lo=m(()=>{"use strict";Yi=require("node:child_process"),Fr=e=>{if(process.platform!=="darwin")return;let t=process.getuid?.();if(t!==void 0)try{(0,Yi.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Y,Ze=m(()=>{"use strict";Y=()=>!0});var Ur,Xi,Bg,Br,Ro=m(()=>{"use strict";Ur=g(require("node:path")),Xi=require("node:url");Ze();Bg={},Br=()=>{if(Y()){let e=process.argv[1];if(e!==void 0&&e.trim().length>0)return Ur.default.dirname(Ur.default.resolve(e))}return Ur.default.dirname((0,Xi.fileURLToPath)(Bg.url))}});var te,Zi,Qe=m(()=>{"use strict";te="agent-witch.js",Zi="command"});var Io,na,E,$g,Co,To,jg,Gg,Vg,zg,Te,Kg,Qi,ea,ta,Po,re,$r,jr,ra,et,tt,b,oa,No,sa,ia,Gr,aa,la,ne,Oo,qg,Jg,Ae,Yg,W,x=m(()=>{"use strict";Io=g(require("node:fs")),na=g(require("node:os")),E=g(require("node:path"));Ro();Qe();$g=Br(),Co=".agent-witch",To=".local-agent-witch",jg=47892,Gg=47893,Vg="com.agent-witch",zg="com.local-agent-witch",Te="profiles",Kg="active-profile.json",Qi="harness",ea="sets",ta="manifest.json",Po="projects",re="logs",$r="agent-witch.log",jr="agent-witch.error.log",ra="reports",et="device-keypair.json",tt=e=>e.trim().toLowerCase(),b=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return E.default.resolve(e);let t=E.default.resolve($g),r=E.default.basename(t),n=E.default.basename(E.default.dirname(t));return r==="app"&&(n===Co||n===To)?E.default.dirname(t):r===Co||r===To?t:E.default.join(na.default.homedir(),Co)},oa=(e=b())=>E.default.join(e,"app"),No=(e=b())=>E.default.join(oa(e),te),sa=(e,t,r)=>t!==null?E.default.join(e,Te,t,r):E.default.join(e,r),ia=e=>sa(e.installDir,e.profileEmail,Po),Gr=e=>sa(e.installDir,e.profileEmail,re),aa=e=>e.profileEmail!==null?E.default.join(e.installDir,Te,e.profileEmail,et):E.default.join(e.installDir,et),la=e=>E.default.basename(e)===To,ne=(e=b())=>la(e)?zg:Vg,Oo=(e=b())=>la(e)?Gg:jg,qg=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return tt(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?tt(t):null},Jg=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ae=(e=b())=>{let t=E.default.join(e,Kg);if(!Io.default.existsSync(t))return null;try{let r=JSON.parse(Io.default.readFileSync(t,"utf8"));if(Jg(r)&&typeof r.email=="string"&&r.email.trim().length>0)return tt(r.email)}catch{return null}return null},Yg=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?tt(r):null}let t=qg();return t!==null?t:Ae()},W=e=>{let t=b(),r=oa(t),n=No(t),o=Yg(e);if(o!==null){let h=E.default.join(t,Te,o),S=E.default.join(h,Qi),y=E.default.join(h,Po),l=E.default.join(h,re),A=E.default.join(h,ra),_=E.default.join(h,et),f=E.default.join(h,re,$r),v=E.default.join(h,re,jr);return{profileEmail:o,installDir:t,appDir:r,appBundlePath:n,projectsDir:y,logsDir:l,mainLogPath:f,errorLogPath:v,reportsDir:A,deviceKeypairPath:_,configPath:E.default.join(h,"config.json"),harnessRootDir:S,harnessManifestPath:E.default.join(S,ta),harnessSetsDir:E.default.join(S,ea)}}let s=E.default.join(t,Qi),i=E.default.join(t,Po),a=E.default.join(t,re),c=E.default.join(t,ra),d=E.default.join(t,et),u=E.default.join(t,re,$r),p=E.default.join(t,re,jr);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:n,projectsDir:i,logsDir:a,mainLogPath:u,errorLogPath:p,reportsDir:c,deviceKeypairPath:d,configPath:E.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:E.default.join(s,ta),harnessSetsDir:E.default.join(s,ea)}}});var Vr,Mo,ca,F,ua,Pe=m(()=>{"use strict";Vr=g(require("node:fs")),Mo=g(require("node:path"));x();ca=e=>{let t=Mo.default.join(e,Te);return Vr.default.existsSync(t)?Vr.default.readdirSync(t).filter(r=>Vr.default.statSync(Mo.default.join(t,r)).isDirectory()).map(r=>tt(r)).toSorted():[]},F=(e=b())=>{let t=ne(e);return[{profileEmail:ca(e)[0]??null,launchAgentLabel:t}]},ua=(e=b())=>ca(e)});var zr,rt,da,Ho,ma,Xg,pa,Zg,Qg,Ot,ef,ga,Kr=m(()=>{"use strict";zr=require("node:child_process"),rt=g(require("node:fs")),da=g(require("node:os")),Ho=g(require("node:path")),ma=require("node:util");Pe();x();Xg=(0,ma.promisify)(zr.execFile),pa=()=>Ho.default.join(da.default.homedir(),"Library","LaunchAgents"),Zg=async e=>{let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Xg("launchctl",["bootout",r]).catch(()=>{})},Qg=e=>{let t=Ho.default.join(pa(),`${e}.plist`);rt.default.existsSync(t)&&rt.default.unlinkSync(t)},Ot=(e=b())=>{let t=ne(e),r=new Set([`${t}-wake`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let o of F(e))r.add(o.launchAgentLabel);let n=pa();if(rt.default.existsSync(n))for(let o of rt.default.readdirSync(n)){if(!o.endsWith(".plist"))continue;let s=o.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]},ef=e=>{(0,zr.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},ga=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=b();if(!rt.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Ot(e);for(let r of t)await Zg(r),Qg(r);return ef(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var qr,Do=m(()=>{"use strict";Lo();Kr();x();qr=(e=b())=>{for(let t of Ot(e))Fr(t)}});var fa,tf,rf,ha,ya=m(()=>{"use strict";fa=require("node:child_process");ko();tf=e=>e.trim().toLowerCase(),rf=e=>e==null?!1:!qi.has(tf(e)),ha=()=>{if(process.platform!=="darwin")return null;try{let t=(0,fa.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return rf(t)?t:null}catch{return null}}});var Sa,Aa,oe,Mt=m(()=>{"use strict";Sa=g(require("node:os"));ya();Aa=e=>e.trim().toLowerCase(),oe=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?ha():e.consoleUsername;if(r===null)return!1;let n=e?.currentUsername??Sa.default.userInfo().username;return Aa(r)===Aa(n)}});var nt,Jr,Yr=m(()=>{"use strict";ko();Do();Mt();nt=e=>{oe()||(qr(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Jr=(e,t=Ji)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{oe()||e()},t);return()=>{clearInterval(r)}}});var va,_a,ba,Xr,Zr,wa,Ea,ot=m(()=>{"use strict";va=".agent-witch",_a="memory",ba="project.json",Xr="chunks.ndjson",Zr="runs.ndjson",wa="reports",Ea=".json"});var Wa,Qr,Fo=m(()=>{"use strict";Wa=g(require("node:path"));ot();Qr=(e,t)=>Wa.default.join(e.trim(),`${t.trim()}${Ea}`)});var Ne,xa,ka=m(()=>{"use strict";Qe();Ne=e=>`'${e.replace(/'/g,"'\\''")}'`,xa=e=>{let t=`${e.installDir.trim()}/${"app"}/${te}`,r=[Ne("node"),Ne(t),"report","write","--key",Ne(e.reportKey.trim()),"--agent-run-id",Ne(e.agentRunId.trim()),"--status",Ne(e.status),"--summary",Ne(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ne(e.details.trim())),r.join(" ")}});var X,La,nf,Ra,en=m(()=>{"use strict";Fo();ka();X={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},La=e=>e===X.COMPLETED||e===X.FAILED,nf=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Ra=(e,t)=>{let r=Qr(t.reportsDir,t.reportKey),n=xa({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:X.IN_PROGRESS,summary:"Task started on your Mac."});return`${e.trim()}

---
${nf({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:n})}`}});var Ht,Ia,Ca,Ta,of,tn,sf,af,Dt,rn,Pa,Na,Ft=m(()=>{"use strict";Ht=g(require("node:fs")),Ia=g(require("node:path"));en();Fo();x();Ca=50,Ta=e=>{let t=W(),r=Qr(t.reportsDir,e);return Ht.default.mkdirSync(Ia.default.dirname(r),{recursive:!0}),r},of=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},tn=e=>{let t=Ta(e);if(!Ht.default.existsSync(t))return null;try{let r=JSON.parse(Ht.default.readFileSync(t,"utf8"));return of(r)?r:null}catch{return null}},sf=(e,t)=>{let r=[...e,t];return r.length>Ca?r.slice(r.length-Ca):r},af=e=>{let t=Ta(e.reportKey);Ht.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Dt=e=>{let t=tn(e.reportKey),r=new Date().toISOString(),n={at:r,status:e.status,summary:e.userSummary.trim()},o={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:sf(t?.history??[],n)};return af(o),o},rn=e=>{let t=tn(e.reportKey);return t!==null?t:Dt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:X.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Pa=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},Na=e=>{if(e===null||!La(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===X.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var lf,cf,Ut,Oa,nn,Uo=m(()=>{"use strict";en();Ft();lf=new Set(Object.values(X)),cf=e=>lf.has(e),Ut=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let n=e[r+1];return typeof n=="string"&&n.trim().length>0?n.trim():void 0},Oa=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},nn=e=>{if(e[0]!=="write")return Oa(),1;let r=Ut(e,"--key"),n=Ut(e,"--agent-run-id"),o=Ut(e,"--status"),s=Ut(e,"--summary"),i=Ut(e,"--details");return r===void 0||n===void 0||o===void 0||s===void 0||!cf(o)?(Oa(),1):(Dt({reportKey:r,agentRunId:n,status:o,userSummary:s,details:i}),0)}});var Bo,Ma,st,on=m(()=>{"use strict";Bo=g(require("node:path")),Ma=require("node:url");Ze();st=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Bo.default.resolve(t);return Y()?r===Bo.default.resolve(__filename):r===(0,Ma.fileURLToPath)(e)}});var Bt,$o,mf,pf,Ua,U,Ba,sn,Oe=m(()=>{"use strict";Bt=g(require("node:fs")),$o=g(require("node:path"));x();mf="install-version.json",pf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ua=(e=b())=>$o.default.join(e,mf),U=(e=b())=>{let t=Ua(e);if(!Bt.default.existsSync(t))return null;try{let r=JSON.parse(Bt.default.readFileSync(t,"utf8"));return!pf(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ba=(e,t=b())=>{let r=Ua(t);Bt.default.mkdirSync($o.default.dirname(r),{recursive:!0}),Bt.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},sn=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),n=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(n)?n>r:e!==t}});var ja,Ga,Va,za,Ka,$t,gf,ff,hf,$a,Se,jt=m(()=>{"use strict";ja=require("node:child_process"),Ga=g(require("node:fs")),Va=g(require("node:os")),za=g(require("node:path")),Ka=require("node:util");Mt();$t=(0,Ka.promisify)(ja.execFile),gf=e=>za.default.join(Va.default.homedir(),"Library","LaunchAgents",`${e}.plist`),ff=async e=>{try{return await $t("launchctl",["print",e]),!0}catch{return!1}},hf=async(e,t,r)=>{await ff(t)&&await $t("launchctl",["bootout",t]).catch(()=>{}),await $t("launchctl",["bootstrap",e,r]),await $t("launchctl",["enable",t])},$a=async e=>{try{return await $t("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Se=async e=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!oe())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let t=process.getuid?.();if(t===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let r=`gui/${t}`,n=`${r}/${e}`;if(await $a(n))return{ok:!0};let o=gf(e);if(!Ga.default.existsSync(o))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await hf(r,n,o),await $a(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(s){return{ok:!1,errorMessage:s instanceof Error?s.message:"launchctl bootstrap failed."}}}});var yf,an,jo=m(()=>{"use strict";Lo();Kr();Pe();x();yf=(e=b())=>{let t=new Set(F(e).map(r=>r.launchAgentLabel));return Ot(e).filter(r=>!t.has(r))},an=(e=b())=>{for(let t of yf(e))Fr(t)}});var K,it=m(()=>{"use strict";K=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var qa,Me,Go,Af,Sf,Ja,at,ln,Vo=m(()=>{"use strict";qa=require("node:crypto"),Me=g(require("node:fs")),Go=g(require("node:path"));x();Af="self-update-log.ndjson",Sf=100,Ja=(e=b())=>{let t=W(),r=t.installDir===e?t.logsDir:Gr({installDir:e,profileEmail:t.profileEmail});return Go.default.join(r,Af)},at=(e,t=b())=>{let r={id:(0,qa.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},n=Ja(t);Me.default.mkdirSync(Go.default.dirname(n),{recursive:!0});let o=Me.default.existsSync(n)?Me.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Sf+1)),JSON.stringify(r)];return Me.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},ln=(e=20,t=b())=>{let r=Ja(t);if(!Me.default.existsSync(r))return[];let n=Me.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=o.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return n.slice(Math.max(0,n.length-e))}});var Ya,Xa,Za=m(()=>{"use strict";Ya="deps.tar.gz",Xa="deps"});var el,ve,He,vf,tl,rl,nl=m(()=>{"use strict";el=require("node:child_process"),ve=g(require("node:fs")),He=g(require("node:path"));Za();vf=e=>He.default.join(e,"app",Xa),tl=e=>{let t=He.default.join(e,"app"),r=He.default.join(t,Ya);ve.default.existsSync(r)&&(ve.default.rmSync(vf(e),{recursive:!0,force:!0}),ve.default.mkdirSync(t,{recursive:!0}),(0,el.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),ve.default.rmSync(r,{force:!0}))},rl=e=>{ve.default.rmSync(He.default.join(e,"node_modules"),{recursive:!0,force:!0}),ve.default.rmSync(He.default.join(e,"package.json"),{force:!0}),ve.default.rmSync(He.default.join(e,"package-lock.json"),{force:!0})}});var un={};Ie(un,{buildAgentWitchSelfUpdateStatus:()=>qo,fetchAgentWitchRemoteInstallBundleVersion:()=>zo,runAgentWitchSelfUpdate:()=>Ko});var _e,cn,ol,_f,sl,zo,bf,wf,Gt,Ko,qo,lt=m(()=>{"use strict";_e=g(require("node:fs")),cn=g(require("node:path"));Oe();jt();jo();Pe();it();x();Qe();Vo();nl();ol=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_f=e=>{let t=Ae(e),r=t===null?W():W(t);if(!_e.default.existsSync(r.configPath))return null;try{let n=JSON.parse(_e.default.readFileSync(r.configPath,"utf8"));return!ol(n)||typeof n.wsUrl!="string"?null:n.wsUrl}catch{return null}},sl=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!ol(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let n=r.scripts.filter(o=>typeof o=="string");return{bundleVersion:r.bundleVersion,scripts:n}},zo=async e=>(await sl(e))?.bundleVersion??null,bf=async(e,t,r)=>{let n=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!n.ok)throw new Error(`Failed to download ${r}.`);let o=cn.default.join(t,r);_e.default.mkdirSync(cn.default.dirname(o),{recursive:!0});let s=Buffer.from(await n.arrayBuffer());_e.default.writeFileSync(o,s),r.endsWith(".js")&&_e.default.chmodSync(o,493)},wf=async()=>{an();let e=F();for(let t of e)await Se(t.launchAgentLabel)},Gt=(e,t)=>({localBundleVersion:t,...e}),Ko=async e=>{let t=b(),r=U(t),n=r?.bundleVersion??null,o=_f(t),s=o===null?r?.appOrigin??null:K(o);if(s===null){let c=Gt({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},n);return at({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}let i=await sl(s);if(i===null){let c=Gt({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},n);return at({event:"update_failed",ok:!1,message:c.message,localBundleVersion:n,remoteBundleVersion:null}),c}if(!(e?.force===!0||sn(n,i.bundleVersion))){let c=Gt({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:i.bundleVersion},n);return at({event:"check_complete",ok:!0,message:c.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),c}try{for(let u of i.scripts)await bf(s,t,u);let c=cn.default.join(t,te);_e.default.existsSync(c)&&_e.default.rmSync(c,{force:!0}),tl(t),rl(t),Ba({bundleVersion:i.bundleVersion,appOrigin:s,updatedAt:new Date().toISOString()}),await wf();let d=Gt({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${n??"unknown"} -> ${i.bundleVersion}.`,remoteBundleVersion:i.bundleVersion},i.bundleVersion);return at({event:"update_applied",ok:!0,message:d.message,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),d}catch(c){let d=c instanceof Error?c.message:"Agent Witch self-update failed.",u=Gt({ok:!1,updated:!1,message:d,remoteBundleVersion:i.bundleVersion},n);return at({event:"update_failed",ok:!1,message:d,localBundleVersion:n,remoteBundleVersion:i.bundleVersion}),u}},qo=()=>{let e=b();return{local:U(e),logs:ln(20,e)}}});var dn,Vt,il,Jo,zt,Yo=m(()=>{"use strict";dn=(e,t)=>{let n=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),o=a=>n.find(c=>c.type===a)?.value??"0",s=o("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(o("year")),month:Number(o("month")),day:Number(o("day")),hour:Number(o("hour")),minute:Number(o("minute")),weekday:i[s]??0}},Vt=(e,t,r,n)=>{let o=new Date(Date.UTC(e.year,e.month-1,e.day,r,n,0,0)),s=dn(o,t),i=(s.hour-r)*60+(s.minute-n)+(s.day-e.day)*24*60;return new Date(o.getTime()-i*6e4)},il=e=>e>=1&&e<=5,Jo=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return dn(t,"UTC")},zt=e=>{let t=e.from??new Date,r=dn(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Vt(r,e.timeZone,c,0)}let n=e.scheduleHour??9,o=Vt(r,e.timeZone,n,0),s=dn(o,e.timeZone),i=t.getTime()>=o.getTime();if(e.preset==="daily")return i?Vt(Jo(r),e.timeZone,n,0):o;if(!i&&il(s.weekday))return o;let a=r;for(let c=0;c<8;c+=1)if(a=Jo(a),il(a.weekday))return Vt(a,e.timeZone,n,0);return Vt(Jo(r),e.timeZone,n,0)}});var Ef,mn,Xo=m(()=>{"use strict";Ef=e=>e==="hourly"||e==="daily"||e==="weekdays",mn=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",n=typeof t.name=="string"?t.name.trim():"",o=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||n.length===0||o.length===0||s.trim().length===0||!Ef(i)?null:{id:r,name:n,capabilityId:o,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Kt,pn,al,ll,Zo,be,cl,ul,dl,ml,qt=m(()=>{"use strict";Kt=g(require("node:fs")),pn=g(require("node:path"));Xo();al="automations.json",ll=e=>e.profileEmail!==null?pn.default.join(e.installDir,"profiles",e.profileEmail,al):pn.default.join(e.installDir,al),Zo=()=>({version:1,automations:[]}),be=e=>{let t=ll(e);if(!Kt.default.existsSync(t))return Zo();try{let r=JSON.parse(Kt.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?Zo():{version:1,automations:r.automations.flatMap(o=>{let s=mn(o);return s!==null?[s]:[]})}}catch{return Zo()}},cl=(e,t)=>{let r=ll(e);Kt.default.mkdirSync(pn.default.dirname(r),{recursive:!0}),Kt.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ul=(e,t)=>{cl(e,{version:1,automations:t})},dl=(e,t)=>{let n=be(e).automations.filter(o=>o.id!==t.id);cl(e,{version:1,automations:[...n,t]})},ml=(e,t)=>be(e).automations.find(r=>r.id===t)??null});var Wf,xf,gn,Qo=m(()=>{"use strict";Yo();Xo();qt();x();Wf=e=>e!==void 0&&e.trim().length>0?W(e.trim()):W(),xf=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??zt({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??zt({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},gn=e=>{let t=Wf(e.profileEmail),r=be(t),n=new Map(r.automations.map(s=>[s.id,s])),o=e.automations.flatMap(s=>{let i=mn(s);return i!==null?[xf(i,n.get(i.id))]:[]});return ul(t,o),{ok:!0,writtenCount:o.length}}});var pl,gl=m(()=>{"use strict";pl="x-agent-witch-token"});var fn,fl,hl,yl,hn=m(()=>{"use strict";gl();it();fn=e=>{let t=K(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},fl=e=>({[pl]:e,"Content-Type":"application/json"}),hl=async(e,t,r,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:fl(e.pairingToken),body:JSON.stringify({exitCode:r,output:n}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},yl=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:fl(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var yn,Jt,M,we,Al,ct,ut=m(()=>{"use strict";yn={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Jt=e=>e.trim().length>0,M=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",we=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",n=e.cursorCommand??"",o=e.antigravityCommand??"";return{claudeCommand:Jt(t)?t.trim():yn.claudeCommand,codexCommand:Jt(r)?r.trim():yn.codexCommand,cursorCommand:Jt(n)?n.trim():yn.cursorCommand,antigravityCommand:Jt(o)?o.trim():yn.antigravityCommand}},Al=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:["agent","-v"]}:{command:t.antigravityCommand,args:["--version"]},ct=(e,t,r,n)=>{let o=t.trim();if(!Jt(o))return null;let s=n?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",o]}:e==="cursor"?{command:r.cursorCommand,args:["agent",...s,"-p","--force","--trust","--sandbox","disabled",o]}:{command:r.antigravityCommand,args:[...s,"-p","--dangerously-skip-permissions",o]}}});var Sl,An,es=m(()=>{"use strict";Sl=require("node:child_process");ut();An=(e,t,r)=>new Promise(n=>{if(!M(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=ct(t,r,we({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Sl.spawn)(o.command,o.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[];s.stdout?.on("data",a=>{i.push(a.toString("utf8"))}),s.stderr?.on("data",a=>{i.push(a.toString("utf8"))}),s.on("close",a=>{n({exitCode:a??-1,output:i.join("")})}),s.on("error",a=>{n({exitCode:-1,output:a.message})})})});var ts,kf,Lf,Rf,Cf,If,Tf,se,Yt=m(()=>{"use strict";ts=g(require("node:fs"));x();kf="ws://localhost:3000/api/agent-witch/ws",Lf="claude",Rf="codex",Cf="cursor",If="agy",Tf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),se=()=>{let e=W();if(!ts.default.existsSync(e.configPath))return null;try{let t=JSON.parse(ts.default.readFileSync(e.configPath,"utf8"));if(!Tf(t))return null;let r=typeof t.wsUrl=="string"&&t.wsUrl.length>0?t.wsUrl:kf,n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),o=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:r,workspace:n,claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:Lf,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:Rf,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:Cf,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:If,pairingToken:o,layout:e}}catch{return null}}});var vl,rs,dt,Sn=m(()=>{"use strict";vl=require("node:crypto");hn();Yo();es();qt();Yt();rs=!1,dt=async e=>{if(rs)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=se();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=fn({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this Mac."};let n=ml(t.layout,e);if(n===null)return{ok:!1,errorMessage:"Automation not found on this Mac."};if(!n.enabled)return{ok:!1,errorMessage:"Automation is paused."};rs=!0;let o=(0,vl.randomUUID)();try{let s=await An(t,"claude-cli",n.prompt);await yl(r,n.id,{agentRunId:o,exitCode:s.exitCode,output:s.output,prompt:n.prompt});let i=new Date,a=zt({preset:n.schedulePreset,scheduleHour:n.scheduleHour,timeZone:n.scheduleTimezone,from:i});return dl(t.layout,{...n,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{rs=!1}}});function Xt(e){return(0,_l.createHash)("sha256").update(e.trim()).digest("hex")}var _l,ns=m(()=>{"use strict";_l=require("node:crypto")});var Pf,bl,Nf,Of,Zt,wl,os=m(()=>{"use strict";Pf=["agentwitch.com","www.agentwitch.com"],bl=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Nf=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},Of=e=>{let t=Nf(e);return!!(Pf.includes(t)||bl.test(e.trim().toLowerCase()))},Zt=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return Of(r)?bl.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},wl=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Zt(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var vn,El,Mf,Hf,Wl,xl,ss,_n,bn=m(()=>{"use strict";vn=g(require("node:fs")),El=g(require("node:path")),Mf="wake-port.json",Hf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wl=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,xl=e=>El.default.join(e,Mf),ss=e=>{let t=xl(e);if(!vn.default.existsSync(t))return null;try{let r=JSON.parse(vn.default.readFileSync(t,"utf8"));if(Hf(r)&&Wl(r.wakePort))return r.wakePort}catch{return null}return null},_n=(e,t)=>{if(!Wl(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=xl(e);vn.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var b_,w_,E_,q,kl,mt=m(()=>{"use strict";bn();x();bn();b_=Oo(),w_=`${ne()}-wake`,E_=ne(),q=()=>{let e=b(),t=ss(e);if(t!==null)return t;let r=process.env.AGENT_WITCH_WAKE_PORT?.trim();if(r!==void 0&&r.length>0){let n=Number.parseInt(r,10);if(Number.isFinite(n)&&n>0&&n<=65535)return n}return Oo()},kl=e=>{let t=b();ss(t)===null&&_n(t,e)}});var pt,Qt,Df,Ll,Rl,Cl=m(()=>{"use strict";pt=g(require("node:fs")),Qt=g(require("node:path"));ns();x();Df=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ll=e=>{if(!pt.default.existsSync(e))return null;try{let t=JSON.parse(pt.default.readFileSync(e,"utf8"));return!Df(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Xt(t.pairingToken.trim())}catch{return null}},Rl=(e=b())=>{let t=[],r=new Set,n=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};n(Ll(Qt.default.join(e,"config.json")));let o=Qt.default.join(e,Te);if(!pt.default.existsSync(o))return t;for(let s of pt.default.readdirSync(o)){let i=Qt.default.join(o,s);pt.default.statSync(i).isDirectory()&&n(Ll(Qt.default.join(i,"config.json")))}return t}});var Il,Tl=m(()=>{"use strict";Il=["rule","skill","command","instruction","agent"]});var Pl,Ff,Uf,Nl,Ol=m(()=>{"use strict";Tl();Pl=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ff=e=>typeof e=="string"&&Il.includes(e),Uf=e=>{if(!Pl(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(n=>typeof n=="string"&&n.trim().length>0?[n.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Ff(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Nl=e=>{if(!Pl(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",n=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let o=n.flatMap(s=>{let i=Uf(s);return i===null?[]:[i]});return{name:t,slug:r,items:o}}});var Ml,Bf,$f,jf,Gf,Vf,zf,Kf,qf,wn,is=m(()=>{"use strict";Ml=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Bf=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},$f=(e,t)=>{let r=Bf(t),n=Ml(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${n}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},jf=(e,t,r)=>{let n=$f(t,r);return`shared/items/${e}/${n}`},Gf=["rules","skills","commands","instructions","agents"],Vf=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),zf=(e,t)=>[...e.filter(n=>n.id!==t.id),t],Kf=(e,t,r)=>{let n=e.sets[t.slug];return n!==void 0?{...n,name:t.name,version:n.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},qf=e=>({id:e.id,kind:e.kind,title:e.title,path:jf(e.id,e.kind,e.title)}),wn=e=>{let t=new Date().toISOString(),r=e.existingManifest??Vf(e.hostname,t),n=Ml(e.bundle.slug),o=Kf(r,{...e.bundle,slug:n},t),s=[`sets/${n}`,...Gf.map(d=>`sets/${n}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let p=qf(u);return{files:[...d.files,{relativePath:p.path,content:u.content}],nextItems:zf(d.nextItems,p)}},{files:[],nextItems:o.items}),c=r.activeSetSlugs.includes(n)?r.activeSetSlugs:[...r.activeSetSlugs,n];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[n]:{...o,items:a}}},directories:s,files:i}}});var Ee,Hl,En,Jf,Dl,Fl=m(()=>{"use strict";Ee=g(require("node:fs")),Hl=g(require("node:os")),En=g(require("node:path"));is();x();Jf=e=>{if(!Ee.default.existsSync(e))return null;try{let t=JSON.parse(Ee.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Dl=e=>{let t=W(e.profileEmail);try{let r=Jf(t.harnessManifestPath),n=wn({bundle:e.bundle,hostname:Hl.default.hostname(),existingManifest:r});Ee.default.mkdirSync(t.harnessRootDir,{recursive:!0});for(let o of n.directories)Ee.default.mkdirSync(En.default.join(t.harnessRootDir,o),{recursive:!0});for(let o of n.files){let s=En.default.join(t.harnessRootDir,o.relativePath);Ee.default.mkdirSync(En.default.dirname(s),{recursive:!0}),Ee.default.writeFileSync(s,o.content)}return Ee.default.writeFileSync(t.harnessManifestPath,`${JSON.stringify(n.manifest,null,2)}
`),{ok:!0,writtenItemCount:n.files.length}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness install failed."}}}});var Ul,Bl,Wn,as=m(()=>{"use strict";Ul=require("node:child_process"),Bl=g(require("node:fs"));Mt();x();Wn=(e=b())=>{let t=No(e);if(!Bl.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!oe())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ae(e),n={...process.env};return r!==null&&(n.AGENT_WITCH_PROFILE=r),(0,Ul.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:n}).unref(),{ok:!0}}});var ls,ie,U_,gt=m(()=>{"use strict";x();ls="connection-health.json",ie=12e4,U_=`${ne()}-watchdog`});var $l,De,cs,Yf,Xf,Zf,jl,Qf,Gl,xn,kn=m(()=>{"use strict";$l=require("node:crypto"),De=g(require("node:fs")),cs=g(require("node:path"));x();Yf="watchdog-log.ndjson",Xf=200,Zf=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jl=(e=b())=>{let t=W(),r=t.installDir===e?t.logsDir:Gr({installDir:e,profileEmail:t.profileEmail});return cs.default.join(r,Yf)},Qf=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Zf(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Gl=(e,t=b())=>{let r={id:(0,$l.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},n=jl(t);De.default.mkdirSync(cs.default.dirname(n),{recursive:!0});let o=De.default.existsSync(n)?De.default.readFileSync(n,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...o.slice(Math.max(0,o.length-Xf+1)),JSON.stringify(r)];return De.default.writeFileSync(n,`${s.join(`
`)}
`,"utf8"),r},xn=(e=20,t=b())=>{let r=jl(t);if(!De.default.existsSync(r))return[];let n=De.default.readFileSync(r,"utf8").split(`
`).flatMap(o=>{let s=Qf(o);return s===null?[]:[s]});return n.slice(Math.max(0,n.length-e))}});var er,Ln,eh,Vl,Z,us,ae,tr=m(()=>{"use strict";er=g(require("node:fs")),Ln=g(require("node:path"));gt();eh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vl=e=>e.profileEmail===null?Ln.default.join(e.installDir,ls):Ln.default.join(e.installDir,"profiles",e.profileEmail,ls),Z=e=>{let t=Vl(e);if(!er.default.existsSync(t))return null;try{let r=JSON.parse(er.default.readFileSync(t,"utf8"));return!eh(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},us=(e,t)=>{let r=Vl(e),n=Z(e),o=new Date().toISOString(),s={lastAckAt:o,wsUrl:t.wsUrl,connectedAt:t.connectedAt??n?.connectedAt??o};er.default.mkdirSync(Ln.default.dirname(r),{recursive:!0}),er.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ae=(e,t,r=Date.now())=>{if(e===null)return!0;let n=Date.parse(e.lastAckAt);return Number.isNaN(n)?!0:r-n>t}});var zl,Kl,th,rr,ds=m(()=>{"use strict";zl=require("node:child_process"),Kl=require("node:util"),th=(0,Kl.promisify)(zl.execFile),rr=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await th("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var ql,ms=m(()=>{"use strict";ql="watchdog-reinstall-state.json"});var Jl={};Ie(Jl,{verifyAgentWitchReviveAfterKickstart:()=>oh});var nh,oh,Yl=m(()=>{"use strict";ms();tr();ds();x();nh=e=>new Promise(t=>{setTimeout(t,e)}),oh=async e=>{if(await nh(e.verifyDelayMs??3e3),!await rr(e.launchAgentLabel))return!1;let r=e.profileEmail===null?W():W(e.profileEmail),n=Z(r);return!ae(n,e.staleAfterMs)}});var nr,ps,ih,Xl,ah,Zl,Ql,ec=m(()=>{"use strict";nr=g(require("node:fs")),ps=g(require("node:path"));ms();x();ih=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xl=e=>ps.default.join(e,ql),ah=(e=b())=>{let t=Xl(e);if(!nr.default.existsSync(t))return null;try{let r=JSON.parse(nr.default.readFileSync(t,"utf8"));return!ih(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},Zl=(e=b(),t=Date.now())=>{let r=ah(e);if(r===null)return!0;let n=Date.parse(r.lastAttemptAt);return Number.isFinite(n)?t-n>=9e5:!0},Ql=(e=b(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},n=Xl(e);return nr.default.mkdirSync(ps.default.dirname(n),{recursive:!0}),nr.default.writeFileSync(n,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var tc,ft,rc,nc,oc,lh,ch,sc,uh,dh,ic,ac=m(()=>{"use strict";tc=require("node:child_process"),ft=g(require("node:fs")),rc=g(require("node:os")),nc=g(require("node:path")),oc=require("node:util");Oe();it();x();lh=(0,oc.promisify)(tc.execFile),ch=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sc=e=>{let t=Ae(e),r=t===null?W():W(t);if(!ft.default.existsSync(r.configPath))return null;try{let n=JSON.parse(ft.default.readFileSync(r.configPath,"utf8"));return!ch(n)||typeof n.wsUrl!="string"||typeof n.pairingToken!="string"||n.pairingToken.trim().length===0?null:{wsUrl:n.wsUrl,pairingToken:n.pairingToken.trim(),email:typeof n.email=="string"&&n.email.trim().length>0?n.email.trim().toLowerCase():t??void 0}}catch{return null}},uh=e=>sc(e)?.wsUrl??null,dh=e=>{let t=uh(e);return t!==null?K(t):U(e)?.appOrigin??null},ic=async e=>{let t=e?.installDir??b(),r=sc(t),n=r!==null?K(r.wsUrl):dh(t);if(n===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let o=new URL(`${n}/install/agent-witch.sh`);o.searchParams.set("token",r.pairingToken),r.email!==void 0&&o.searchParams.set("email",r.email);let s=await fetch(o.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=nc.default.join(rc.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{ft.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Ae(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await lh("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{ft.default.existsSync(i)&&ft.default.unlinkSync(i)}}});var lc={};Ie(lc,{attemptAgentWitchWatchdogReinstall:()=>mh});var mh,cc=m(()=>{"use strict";ec();jt();ac();mh=async e=>{if(e.filter(o=>o.reason!=="healthy"&&!o.revived).length===0||!Zl())return{attempted:!1,ok:!1,targets:e};Ql();let r=await ic();if(!r.ok)return{attempted:!0,ok:!1,errorMessage:r.errorMessage,targets:e};let n=await Promise.all(e.map(async o=>{if(o.reason==="healthy"||o.revived)return o;let s=await Se(o.launchAgentLabel);return{...o,revived:s.ok,...s.errorMessage!==void 0?{errorMessage:s.errorMessage}:{}}}));return{attempted:!0,ok:n.some(o=>o.revived||o.reason==="healthy"),targets:n}}});var uc,dc,mc,ph,gh,fh,gs,fs=m(()=>{"use strict";Mt();gt();tr();ds();jt();Pe();x();as();kn();uc=e=>e===null?W():W(e),dc=async(e,t,r)=>{if(!await rr(e))return"not_running";let o=uc(t),s=Z(o);return ae(s,r)?"stale_connection":"healthy"},mc=async e=>{let t=e?.staleAfterMs??ie,r=b(),n=F(r);return Promise.all(n.map(async o=>{let s=await dc(o.launchAgentLabel,o.profileEmail,t),i=uc(o.profileEmail),a=Z(i),c=await rr(o.launchAgentLabel);return{launchAgentLabel:o.launchAgentLabel,profileEmail:o.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:ae(a,t),needsRevive:s!=="healthy",reason:s}}))},ph=(e,t)=>{let r=e.filter(o=>o.revived);if(r.length>0)return`Revived ${r.map(o=>o.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let n=e.filter(o=>o.reason!=="healthy"&&!o.revived);return n.length>0?n.map(o=>o.errorMessage??o.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},gh=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(n=>n.revived)?"revive_triggered":t?"check_complete":"revive_failed",fh=async e=>{let t=await Se(e.launchAgentLabel),r=t.ok,n=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:o}=await Promise.resolve().then(()=>(Yl(),Jl)),s=await o({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(n="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...n!==void 0?{errorMessage:n}:{}}},gs=async e=>{if(!oe())return{ok:!0,targets:[]};let t=e?.staleAfterMs??ie,r=b(),n=F(r),o=[];for(let u of n){let p=await dc(u.launchAgentLabel,u.profileEmail,t);if(p==="healthy"){o.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:p});continue}o.push(await fh({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:p,staleAfterMs:t}))}if(o.length===0){let u=Wn();o.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=o;if(o.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(cc(),lc)),p=await u(o);s=p.attempted,i=p.ok,a=p.errorMessage,c=[...p.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&Gl({event:gh(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:ph(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var pc,gc,fc=m(()=>{"use strict";pc=g(require("node:os"));gt();kn();fs();gc=async()=>{let e=await mc(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:pc.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:ie,healthyProfileCount:t,profiles:e,lastLog:xn(1)[0]??null}}});var hc={};Ie(hc,{buildAgentWitchAutomationStatusFromWakeServer:()=>Ss,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>xs,buildAgentWitchWakeHealthResponse:()=>vs,buildAgentWitchWakeIdentityResponse:()=>_s,buildAgentWitchWatchdogStatus:()=>ws,installHarnessFromWakeServer:()=>Cn,readAgentWitchSelfUpdateLogEntries:()=>Tn,readAgentWitchWatchdogLogEntries:()=>In,restartAgentWitchFromWakeServer:()=>Ws,reviveAgentWitchWebSocketFromWakeServer:()=>Es,runAgentWitchSelfUpdateFromWakeServer:()=>ks,runAgentWitchUninstallLocalFromWakeServer:()=>Ls,runAutomationFromWakeServer:()=>As,syncAutomationsFromWakeServer:()=>ys,wakeAgentWitchLaunchAgents:()=>bs});var Rn,hs,Cn,ys,As,Ss,vs,_s,bs,In,ws,Es,Ws,xs,Tn,ks,Ls,Rs=m(()=>{"use strict";Qo();Sn();qt();ns();Yt();Rn=g(require("node:os"));os();mt();jt();Pe();Cl();Ol();Fl();as();fc();kn();lt();Kr();Vo();fs();hs=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cn=e=>{if(!hs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Nl(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Zt(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let o=Dl({bundle:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenItemCount:o.writtenItemCount}:{ok:!1,errorMessage:o.errorMessage??"Harness install failed."}},ys=e=>{if(!hs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",n=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Zt(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(n===null)return{ok:!1,errorMessage:"automations must be an array."};let o=gn({automations:n,...r.length>0?{profileEmail:r}:{}});return o.ok?{ok:!0,writtenCount:o.writtenCount}:{ok:!1,errorMessage:o.errorMessage??"Automation sync failed."}},As=async e=>{if(!hs(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Zt(t)?dt(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},Ss=()=>{let e=se(),t=e!==null?be(e.layout):{version:1,automations:[]};return{ok:!0,hostname:Rn.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}},vs=()=>{let e=F();return{ok:!0,port:q(),hostname:Rn.default.hostname(),profileCount:e.length}},_s=()=>{let e=F(),t=se()?.pairingToken.trim()??"",r=t.length>0?Xt(t):null,n=Rl();return{hostname:Rn.default.hostname(),port:q(),tokenHash:r,tokenHashes:n.length>0?n:r!==null?[r]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}},bs=async()=>{let e=F(),t=[];for(let r of e){let n=await Se(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:n.ok,...n.errorMessage!==void 0?{errorMessage:n.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Wn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},In=(e=20)=>xn(e),ws=gc,Es=gs,Ws=gs,xs=qo,Tn=(e=20)=>ln(e),ks=e=>Ko(e),Ls=()=>ga()});var le=D((Bb,Sc)=>{"use strict";var yc=["nodebuffer","arraybuffer","fragments"],Ac=typeof Blob<"u";Ac&&yc.push("blob");Sc.exports={BINARY_TYPES:yc,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Ac,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var or=D(($b,Pn)=>{"use strict";var{EMPTY_BUFFER:hh}=le(),Cs=Buffer[Symbol.species];function yh(e,t){if(e.length===0)return hh;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),n=0;for(let o=0;o<e.length;o++){let s=e[o];r.set(s,n),n+=s.length}return n<t?new Cs(r.buffer,r.byteOffset,n):r}function vc(e,t,r,n,o){for(let s=0;s<o;s++)r[n+s]=e[s]^t[s&3]}function _c(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function Ah(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function Is(e){if(Is.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new Cs(e):ArrayBuffer.isView(e)?t=new Cs(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),Is.readOnly=!1),t}Pn.exports={concat:yh,mask:vc,toArrayBuffer:Ah,toBuffer:Is,unmask:_c};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");Pn.exports.mask=function(t,r,n,o,s){s<48?vc(t,r,n,o,s):e.mask(t,r,n,o,s)},Pn.exports.unmask=function(t,r){t.length<32?_c(t,r):e.unmask(t,r)}}catch{}});var Ec=D((jb,wc)=>{"use strict";var bc=Symbol("kDone"),Ts=Symbol("kRun"),Ps=class{constructor(t){this[bc]=()=>{this.pending--,this[Ts]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[Ts]()}[Ts](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[bc])}}};wc.exports=Ps});var At=D((Gb,Lc)=>{"use strict";var sr=require("zlib"),Wc=or(),Sh=Ec(),{kStatusCode:xc}=le(),vh=Buffer[Symbol.species],_h=Buffer.from([0,0,255,255]),On=Symbol("permessage-deflate"),ce=Symbol("total-length"),ht=Symbol("callback"),We=Symbol("buffers"),yt=Symbol("error"),Nn,Ns=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Nn){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Nn=new Sh(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[ht];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,n=t.find(o=>!(r.serverNoContextTakeover===!1&&o.server_no_context_takeover||o.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>o.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&!o.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(n.server_no_context_takeover=!0),r.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(n.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?n.client_max_window_bits=r.clientMaxWindowBits:(n.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(n=>{let o=r[n];if(o.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(o=o[0],n==="client_max_window_bits"){if(o!==!0){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else if(n==="server_max_window_bits"){let s=+o;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${o}`);o=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(o!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${o}`)}else throw new Error(`Unknown parameter "${n}"`);r[n]=o})}),t}decompress(t,r,n){Nn.add(o=>{this._decompress(t,r,(s,i)=>{o(),n(s,i)})})}compress(t,r,n){Nn.add(o=>{this._compress(t,r,(s,i)=>{o(),n(s,i)})})}_decompress(t,r,n){let o=this._isServer?"client":"server";if(!this._inflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?sr.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=sr.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[On]=this,this._inflate[ce]=0,this._inflate[We]=[],this._inflate.on("error",wh),this._inflate.on("data",kc)}this._inflate[ht]=n,this._inflate.write(t),r&&this._inflate.write(_h),this._inflate.flush(()=>{let s=this._inflate[yt];if(s){this._inflate.close(),this._inflate=null,n(s);return}let i=Wc.concat(this._inflate[We],this._inflate[ce]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[ce]=0,this._inflate[We]=[],r&&this.params[`${o}_no_context_takeover`]&&this._inflate.reset()),n(null,i)})}_compress(t,r,n){let o=this._isServer?"server":"client";if(!this._deflate){let s=`${o}_max_window_bits`,i=typeof this.params[s]!="number"?sr.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=sr.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[ce]=0,this._deflate[We]=[],this._deflate.on("data",bh)}this._deflate[ht]=n,this._deflate.write(t),this._deflate.flush(sr.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=Wc.concat(this._deflate[We],this._deflate[ce]);r&&(s=new vh(s.buffer,s.byteOffset,s.length-4)),this._deflate[ht]=null,this._deflate[ce]=0,this._deflate[We]=[],r&&this.params[`${o}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};Lc.exports=Ns;function bh(e){this[We].push(e),this[ce]+=e.length}function kc(e){if(this[ce]+=e.length,this[On]._maxPayload<1||this[ce]<=this[On]._maxPayload){this[We].push(e);return}this[yt]=new RangeError("Max payload size exceeded"),this[yt].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[yt][xc]=1009,this.removeListener("data",kc),this.reset()}function wh(e){if(this[On]._inflate=null,this[yt]){this[ht](this[yt]);return}e[xc]=1007,this[ht](e)}});var St=D((Vb,Mn)=>{"use strict";var{isUtf8:Rc}=require("buffer"),{hasBlob:Eh}=le(),Wh=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function xh(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function Os(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function kh(e){return Eh&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}Mn.exports={isBlob:kh,isValidStatusCode:xh,isValidUTF8:Os,tokenChars:Wh};if(Rc)Mn.exports.isValidUTF8=function(e){return e.length<24?Os(e):Rc(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");Mn.exports.isValidUTF8=function(t){return t.length<32?Os(t):e(t)}}catch{}});var Us=D((zb,Mc)=>{"use strict";var{Writable:Lh}=require("stream"),Cc=At(),{BINARY_TYPES:Rh,EMPTY_BUFFER:Ic,kStatusCode:Ch,kWebSocket:Ih}=le(),{concat:Ms,toArrayBuffer:Th,unmask:Ph}=or(),{isValidStatusCode:Nh,isValidUTF8:Tc}=St(),Hn=Buffer[Symbol.species],G=0,Pc=1,Nc=2,Oc=3,Hs=4,Ds=5,Dn=6,Fs=class extends Lh{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||Rh[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[Ih]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=G}_write(t,r,n){if(this._opcode===8&&this._state==G)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(n)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Hn(n.buffer,n.byteOffset+t,n.length-t),new Hn(n.buffer,n.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let n=this._buffers[0],o=r.length-t;t>=n.length?r.set(this._buffers.shift(),o):(r.set(new Uint8Array(n.buffer,n.byteOffset,t),o),this._buffers[0]=new Hn(n.buffer,n.byteOffset+t,n.length-t)),t-=n.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case G:this.getInfo(t);break;case Pc:this.getPayloadLength16(t);break;case Nc:this.getPayloadLength64(t);break;case Oc:this.getMask();break;case Hs:this.getData(t);break;case Ds:case Dn:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let o=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(o);return}let n=(r[0]&64)===64;if(n&&!this._extensions[Cc.extensionName]){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(!this._fragmented){let o=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let o=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(o);return}if(n){let o=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(o);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let o=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(o);return}}else{let o=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(o);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let o=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(o);return}}else if(this._masked){let o=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(o);return}this._payloadLength===126?this._state=Pc:this._payloadLength===127?this._state=Nc:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),n=r.readUInt32BE(0);if(n>Math.pow(2,21)-1){let o=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(o);return}this._payloadLength=n*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=Oc:this._state=Hs}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=Hs}getData(t){let r=Ic;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&Ph(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._compressed){this._state=Ds,this.decompress(r,t);return}if(r.length){if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(n);return}this._messageLength=this._totalPayloadLength,this._fragments.push(r)}this.dataMessage(t)}decompress(t,r){this._extensions[Cc.extensionName].decompress(t,this._fin,(o,s)=>{if(o)return r(o);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}if(this._maxFragments>0&&this._fragments.length>=this._maxFragments){let i=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===G&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=G;return}let r=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let o;this._binaryType==="nodebuffer"?o=Ms(n,r):this._binaryType==="arraybuffer"?o=Th(Ms(n,r)):this._binaryType==="blob"?o=new Blob(n):o=n,this._allowSynchronousEvents?(this.emit("message",o,!0),this._state=G):(this._state=Dn,setImmediate(()=>{this.emit("message",o,!0),this._state=G,this.startLoop(t)}))}else{let o=Ms(n,r);if(!this._skipUTF8Validation&&!Tc(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===Ds||this._allowSynchronousEvents?(this.emit("message",o,!1),this._state=G):(this._state=Dn,setImmediate(()=>{this.emit("message",o,!1),this._state=G,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,Ic),this.end();else{let n=t.readUInt16BE(0);if(!Nh(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let o=new Hn(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!Tc(o)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",n,o),this.end()}this._state=G;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=G):(this._state=Dn,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=G,this.startLoop(r)}))}createError(t,r,n,o,s){this._loop=!1,this._errored=!0;let i=new t(n?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[Ch]=o,i}};Mc.exports=Fs});var js=D((qb,Fc)=>{"use strict";var{Duplex:Kb}=require("stream"),{randomFillSync:Oh}=require("crypto"),{types:{isUint8Array:Mh}}=require("util"),Hc=At(),{EMPTY_BUFFER:Hh,kWebSocket:Dh,NOOP:Fh}=le(),{isBlob:vt,isValidStatusCode:Uh}=St(),{mask:Dc,toBuffer:Fe}=or(),V=Symbol("kByteLength"),Bh=Buffer.alloc(4),Fn=8*1024,Ue,_t=Fn,J=0,$h=1,jh=2,Bs=class e{constructor(t,r,n){this._extensions=r||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=J,this.onerror=Fh,this[Dh]=void 0}static frame(t,r){let n,o=!1,s=2,i=!1;r.mask&&(n=r.maskBuffer||Bh,r.generateMask?r.generateMask(n):(_t===Fn&&(Ue===void 0&&(Ue=Buffer.alloc(Fn)),Oh(Ue,0,Fn),_t=0),n[0]=Ue[_t++],n[1]=Ue[_t++],n[2]=Ue[_t++],n[3]=Ue[_t++]),i=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[V]!==void 0?a=r[V]:(t=Buffer.from(t),a=t.length):(a=t.length,o=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(o?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=n[0],d[s-3]=n[1],d[s-2]=n[2],d[s-1]=n[3],i?[d,t]:o?(Dc(t,n,d,s,a),[d]):(Dc(t,n,t,0,a),[d,t])):[d,t]}close(t,r,n,o){let s;if(t===void 0)s=Hh;else{if(typeof t!="number"||!Uh(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(Mh(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[V]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==J?this.enqueue([this.dispatch,s,!1,i,o]):this.sendFrame(e.frame(s,i),o)}ping(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):vt(t)?(o=t.size,s=!1):(t=Fe(t),o=t.length,s=Fe.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[V]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};vt(t)?this._state!==J?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==J?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}pong(t,r,n){let o,s;if(typeof t=="string"?(o=Buffer.byteLength(t),s=!1):vt(t)?(o=t.size,s=!1):(t=Fe(t),o=t.length,s=Fe.readOnly),o>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[V]:o,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};vt(t)?this._state!==J?this.enqueue([this.getBlobData,t,!1,i,n]):this.getBlobData(t,!1,i,n):this._state!==J?this.enqueue([this.dispatch,t,!1,i,n]):this.sendFrame(e.frame(t,i),n)}send(t,r,n){let o=this._extensions[Hc.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):vt(t)?(a=t.size,c=!1):(t=Fe(t),a=t.length,c=Fe.readOnly),this._firstFragment?(this._firstFragment=!1,i&&o&&o.params[o._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=o._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[V]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};vt(t)?this._state!==J?this.enqueue([this.getBlobData,t,this._compress,d,n]):this.getBlobData(t,this._compress,d,n):this._state!==J?this.enqueue([this.dispatch,t,this._compress,d,n]):this.dispatch(t,this._compress,d,n)}getBlobData(t,r,n,o){this._bufferedBytes+=n[V],this._state=jh,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick($s,this,a,o);return}this._bufferedBytes-=n[V];let i=Fe(s);r?this.dispatch(i,r,n,o):(this._state=J,this.sendFrame(e.frame(i,n),o),this.dequeue())}).catch(s=>{process.nextTick(Gh,this,s,o)})}dispatch(t,r,n,o){if(!r){this.sendFrame(e.frame(t,n),o);return}let s=this._extensions[Hc.extensionName];this._bufferedBytes+=n[V],this._state=$h,s.compress(t,n.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");$s(this,c,o);return}this._bufferedBytes-=n[V],this._state=J,n.readOnly=!1,this.sendFrame(e.frame(a,n),o),this.dequeue()})}dequeue(){for(;this._state===J&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][V],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][V],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};Fc.exports=Bs;function $s(e,t,r){typeof r=="function"&&r(t);for(let n=0;n<e._queue.length;n++){let o=e._queue[n],s=o[o.length-1];typeof s=="function"&&s(t)}}function Gh(e,t,r){$s(e,t,r),e.onerror(t)}});var qc=D((Jb,Kc)=>{"use strict";var{kForOnEventAttribute:ir,kListener:Gs}=le(),Uc=Symbol("kCode"),Bc=Symbol("kData"),$c=Symbol("kError"),jc=Symbol("kMessage"),Gc=Symbol("kReason"),bt=Symbol("kTarget"),Vc=Symbol("kType"),zc=Symbol("kWasClean"),ue=class{constructor(t){this[bt]=null,this[Vc]=t}get target(){return this[bt]}get type(){return this[Vc]}};Object.defineProperty(ue.prototype,"target",{enumerable:!0});Object.defineProperty(ue.prototype,"type",{enumerable:!0});var Be=class extends ue{constructor(t,r={}){super(t),this[Uc]=r.code===void 0?0:r.code,this[Gc]=r.reason===void 0?"":r.reason,this[zc]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[Uc]}get reason(){return this[Gc]}get wasClean(){return this[zc]}};Object.defineProperty(Be.prototype,"code",{enumerable:!0});Object.defineProperty(Be.prototype,"reason",{enumerable:!0});Object.defineProperty(Be.prototype,"wasClean",{enumerable:!0});var wt=class extends ue{constructor(t,r={}){super(t),this[$c]=r.error===void 0?null:r.error,this[jc]=r.message===void 0?"":r.message}get error(){return this[$c]}get message(){return this[jc]}};Object.defineProperty(wt.prototype,"error",{enumerable:!0});Object.defineProperty(wt.prototype,"message",{enumerable:!0});var ar=class extends ue{constructor(t,r={}){super(t),this[Bc]=r.data===void 0?null:r.data}get data(){return this[Bc]}};Object.defineProperty(ar.prototype,"data",{enumerable:!0});var Vh={addEventListener(e,t,r={}){for(let o of this.listeners(e))if(!r[ir]&&o[Gs]===t&&!o[ir])return;let n;if(e==="message")n=function(s,i){let a=new ar("message",{data:i?s:s.toString()});a[bt]=this,Un(t,this,a)};else if(e==="close")n=function(s,i){let a=new Be("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[bt]=this,Un(t,this,a)};else if(e==="error")n=function(s){let i=new wt("error",{error:s,message:s.message});i[bt]=this,Un(t,this,i)};else if(e==="open")n=function(){let s=new ue("open");s[bt]=this,Un(t,this,s)};else return;n[ir]=!!r[ir],n[Gs]=t,r.once?this.once(e,n):this.on(e,n)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[Gs]===t&&!r[ir]){this.removeListener(e,r);break}}};Kc.exports={CloseEvent:Be,ErrorEvent:wt,Event:ue,EventTarget:Vh,MessageEvent:ar};function Un(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var Bn=D((Yb,Jc)=>{"use strict";var{tokenChars:lr}=St();function Q(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function zh(e){let t=Object.create(null),r=Object.create(null),n=!1,o=!1,s=!1,i,a,c=-1,d=-1,u=-1,p=0;for(;p<e.length;p++)if(d=e.charCodeAt(p),i===void 0)if(u===-1&&lr[d]===1)c===-1&&(c=p);else if(p!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=p);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${p}`);u===-1&&(u=p);let S=e.slice(c,u);d===44?(Q(t,S,r),r=Object.create(null)):i=S,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${p}`);else if(a===void 0)if(u===-1&&lr[d]===1)c===-1&&(c=p);else if(d===32||d===9)u===-1&&c!==-1&&(u=p);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${p}`);u===-1&&(u=p),Q(r,e.slice(c,u),!0),d===44&&(Q(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,p),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${p}`);else if(o){if(lr[d]!==1)throw new SyntaxError(`Unexpected character at index ${p}`);c===-1?c=p:n||(n=!0),o=!1}else if(s)if(lr[d]===1)c===-1&&(c=p);else if(d===34&&c!==-1)s=!1,u=p;else if(d===92)o=!0;else throw new SyntaxError(`Unexpected character at index ${p}`);else if(d===34&&e.charCodeAt(p-1)===61)s=!0;else if(u===-1&&lr[d]===1)c===-1&&(c=p);else if(c!==-1&&(d===32||d===9))u===-1&&(u=p);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${p}`);u===-1&&(u=p);let S=e.slice(c,u);n&&(S=S.replace(/\\/g,""),n=!1),Q(r,a,S),d===44&&(Q(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${p}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=p);let h=e.slice(c,u);return i===void 0?Q(t,h,r):(a===void 0?Q(r,h,!0):n?Q(r,a,h.replace(/\\/g,"")):Q(r,a,h),Q(t,i,r)),t}function Kh(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(n=>[t].concat(Object.keys(n).map(o=>{let s=n[o];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?o:`${o}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Jc.exports={format:Kh,parse:zh}});var Vn=D((Qb,au)=>{"use strict";var qh=require("events"),Jh=require("https"),Yh=require("http"),Zc=require("net"),Xh=require("tls"),{randomBytes:Zh,createHash:Qh}=require("crypto"),{Duplex:Xb,Readable:Zb}=require("stream"),{URL:Vs}=require("url"),xe=At(),ey=Us(),ty=js(),{isBlob:ry}=St(),{BINARY_TYPES:Yc,CLOSE_TIMEOUT:ny,EMPTY_BUFFER:$n,GUID:oy,kForOnEventAttribute:zs,kListener:sy,kStatusCode:iy,kWebSocket:T,NOOP:Qc}=le(),{EventTarget:{addEventListener:ay,removeEventListener:ly}}=qc(),{format:cy,parse:uy}=Bn(),{toBuffer:dy}=or(),eu=Symbol("kAborted"),Ks=[8,13],de=["CONNECTING","OPEN","CLOSING","CLOSED"],my=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,k=class e extends qh{constructor(t,r,n){super(),this._binaryType=Yc[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=$n,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?r=[]:Array.isArray(r)||(typeof r=="object"&&r!==null?(n=r,r=[]):r=[r]),tu(this,t,r,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){Yc.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,n){let o=new ey({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new ty(t,this._extensions,n.generateMask);this._receiver=o,this._sender=s,this._socket=t,o[T]=this,s[T]=this,t[T]=this,o.on("conclude",fy),o.on("drain",hy),o.on("error",yy),o.on("message",Ay),o.on("ping",Sy),o.on("pong",vy),s.onerror=_y,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",ou),t.on("data",Gn),t.on("end",su),t.on("error",iu),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[xe.extensionName]&&this._extensions[xe.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){B(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=e.CLOSING,this._sender.close(t,r,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),nu(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){qs(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||$n,r,n)}pong(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(n=t,t=r=void 0):typeof r=="function"&&(n=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){qs(this,t,n);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||$n,r,n)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,n){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(n=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){qs(this,t,n);return}let o={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[xe.extensionName]||(o.compress=!1),this._sender.send(t||$n,o,n)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){B(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(k,"CONNECTING",{enumerable:!0,value:de.indexOf("CONNECTING")});Object.defineProperty(k.prototype,"CONNECTING",{enumerable:!0,value:de.indexOf("CONNECTING")});Object.defineProperty(k,"OPEN",{enumerable:!0,value:de.indexOf("OPEN")});Object.defineProperty(k.prototype,"OPEN",{enumerable:!0,value:de.indexOf("OPEN")});Object.defineProperty(k,"CLOSING",{enumerable:!0,value:de.indexOf("CLOSING")});Object.defineProperty(k.prototype,"CLOSING",{enumerable:!0,value:de.indexOf("CLOSING")});Object.defineProperty(k,"CLOSED",{enumerable:!0,value:de.indexOf("CLOSED")});Object.defineProperty(k.prototype,"CLOSED",{enumerable:!0,value:de.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(k.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(k.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[zs])return t[sy];return null},set(t){for(let r of this.listeners(e))if(r[zs]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[zs]:!0})}})});k.prototype.addEventListener=ay;k.prototype.removeEventListener=ly;au.exports=k;function tu(e,t,r,n){let o={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:ny,protocolVersion:Ks[1],maxBufferedChunks:1048576,maxFragments:131072,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=o.autoPong,e._closeTimeout=o.closeTimeout,!Ks.includes(o.protocolVersion))throw new RangeError(`Unsupported protocol version: ${o.protocolVersion} (supported versions: ${Ks.join(", ")})`);let s;if(t instanceof Vs)s=t;else try{s=new Vs(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let l=new SyntaxError(c);if(e._redirects===0)throw l;jn(e,l);return}let d=i?443:80,u=Zh(16).toString("base64"),p=i?Jh.request:Yh.request,h=new Set,S;if(o.createConnection=o.createConnection||(i?gy:py),o.defaultPort=o.defaultPort||d,o.port=s.port||d,o.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,o.headers={...o.headers,"Sec-WebSocket-Version":o.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},o.path=s.pathname+s.search,o.timeout=o.handshakeTimeout,o.perMessageDeflate&&(S=new xe({...o.perMessageDeflate,isServer:!1,maxPayload:o.maxPayload}),o.headers["Sec-WebSocket-Extensions"]=cy({[xe.extensionName]:S.offer()})),r.length){for(let l of r){if(typeof l!="string"||!my.test(l)||h.has(l))throw new SyntaxError("An invalid or duplicated subprotocol was specified");h.add(l)}o.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(o.origin&&(o.protocolVersion<13?o.headers["Sec-WebSocket-Origin"]=o.origin:o.headers.Origin=o.origin),(s.username||s.password)&&(o.auth=`${s.username}:${s.password}`),a){let l=o.path.split(":");o.socketPath=l[0],o.path=l[1]}let y;if(o.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?o.socketPath:s.host;let l=n&&n.headers;if(n={...n,headers:{}},l)for(let[A,_]of Object.entries(l))n.headers[A.toLowerCase()]=_}else if(e.listenerCount("redirect")===0){let l=a?e._originalIpc?o.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!l||e._originalSecure&&!i)&&(delete o.headers.authorization,delete o.headers.cookie,l||delete o.headers.host,o.auth=void 0)}o.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(o.auth).toString("base64")),y=e._req=p(o),e._redirects&&e.emit("redirect",e.url,y)}else y=e._req=p(o);o.timeout&&y.on("timeout",()=>{B(e,y,"Opening handshake has timed out")}),y.on("error",l=>{y===null||y[eu]||(y=e._req=null,jn(e,l))}),y.on("response",l=>{let A=l.headers.location,_=l.statusCode;if(A&&o.followRedirects&&_>=300&&_<400){if(++e._redirects>o.maxRedirects){B(e,y,"Maximum redirects exceeded");return}y.abort();let f;try{f=new Vs(A,t)}catch{let w=new SyntaxError(`Invalid URL: ${A}`);jn(e,w);return}tu(e,f,r,n)}else e.emit("unexpected-response",y,l)||B(e,y,`Unexpected server response: ${l.statusCode}`)}),y.on("upgrade",(l,A,_)=>{if(e.emit("upgrade",l),e.readyState!==k.CONNECTING)return;y=e._req=null;let f=l.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){B(e,A,"Invalid Upgrade header");return}let v=Qh("sha1").update(u+oy).digest("base64");if(l.headers["sec-websocket-accept"]!==v){B(e,A,"Invalid Sec-WebSocket-Accept header");return}let w=l.headers["sec-websocket-protocol"],R;if(w!==void 0?h.size?h.has(w)||(R="Server sent an invalid subprotocol"):R="Server sent a subprotocol but none was requested":h.size&&(R="Server sent no subprotocol"),R){B(e,A,R);return}w&&(e._protocol=w);let j=l.headers["sec-websocket-extensions"];if(j!==void 0){if(!S){B(e,A,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let he;try{he=uy(j)}catch{B(e,A,"Invalid Sec-WebSocket-Extensions header");return}let Xe=Object.keys(he);if(Xe.length!==1||Xe[0]!==xe.extensionName){B(e,A,"Server indicated an extension that was not requested");return}try{S.accept(he[xe.extensionName])}catch{B(e,A,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[xe.extensionName]=S}e.setSocket(A,_,{allowSynchronousEvents:o.allowSynchronousEvents,generateMask:o.generateMask,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation})}),o.finishRequest?o.finishRequest(y,e):y.end()}function jn(e,t){e._readyState=k.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function py(e){return e.path=e.socketPath,Zc.connect(e)}function gy(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=Zc.isIP(e.host)?"":e.host),Xh.connect(e)}function B(e,t,r){e._readyState=k.CLOSING;let n=new Error(r);Error.captureStackTrace(n,B),t.setHeader?(t[eu]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(jn,e,n)):(t.destroy(n),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function qs(e,t,r){if(t){let n=ry(t)?t.size:dy(t).length;e._socket?e._sender._bufferedBytes+=n:e._bufferedAmount+=n}if(r){let n=new Error(`WebSocket is not open: readyState ${e.readyState} (${de[e.readyState]})`);process.nextTick(r,n)}}function fy(e,t){let r=this[T];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[T]!==void 0&&(r._socket.removeListener("data",Gn),process.nextTick(ru,r._socket),e===1005?r.close():r.close(e,t))}function hy(){let e=this[T];e.isPaused||e._socket.resume()}function yy(e){let t=this[T];t._socket[T]!==void 0&&(t._socket.removeListener("data",Gn),process.nextTick(ru,t._socket),t.close(e[iy])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function Xc(){this[T].emitClose()}function Ay(e,t){this[T].emit("message",e,t)}function Sy(e){let t=this[T];t._autoPong&&t.pong(e,!this._isServer,Qc),t.emit("ping",e)}function vy(e){this[T].emit("pong",e)}function ru(e){e.resume()}function _y(e){let t=this[T];t.readyState!==k.CLOSED&&(t.readyState===k.OPEN&&(t._readyState=k.CLOSING,nu(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function nu(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function ou(){let e=this[T];if(this.removeListener("close",ou),this.removeListener("data",Gn),this.removeListener("end",su),e._readyState=k.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[T]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",Xc),e._receiver.on("finish",Xc))}function Gn(e){this[T]._receiver.write(e)||this.pause()}function su(){let e=this[T];e._readyState=k.CLOSING,e._receiver.end(),this.end()}function iu(){let e=this[T];this.removeListener("error",iu),this.on("error",Qc),e&&(e._readyState=k.CLOSING,this.destroy())}});var du=D((t0,uu)=>{"use strict";var e0=Vn(),{Duplex:by}=require("stream");function lu(e){e.emit("close")}function wy(){!this.destroyed&&this._writableState.finished&&this.destroy()}function cu(e){this.removeListener("error",cu),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function Ey(e,t){let r=!0,n=new by({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&n._readableState.objectMode?s.toString():s;n.push(a)||e.pause()}),e.once("error",function(s){n.destroyed||(r=!1,n.destroy(s))}),e.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(o,s){if(e.readyState===e.CLOSED){s(o),process.nextTick(lu,n);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(o),process.nextTick(lu,n)}),r&&e.terminate()},n._final=function(o){if(e.readyState===e.CONNECTING){e.once("open",function(){n._final(o)});return}e._socket!==null&&(e._socket._writableState.finished?(o(),n._readableState.endEmitted&&n.destroy()):(e._socket.once("finish",function(){o()}),e.close()))},n._read=function(){e.isPaused&&e.resume()},n._write=function(o,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){n._write(o,s,i)});return}e.send(o,i)},n.on("end",wy),n.on("error",cu),n}uu.exports=Ey});var Js=D((r0,mu)=>{"use strict";var{tokenChars:Wy}=St();function xy(e){let t=new Set,r=-1,n=-1,o=0;for(o;o<e.length;o++){let i=e.charCodeAt(o);if(n===-1&&Wy[i]===1)r===-1&&(r=o);else if(o!==0&&(i===32||i===9))n===-1&&r!==-1&&(n=o);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${o}`);n===-1&&(n=o);let a=e.slice(r,n);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=n=-1}else throw new SyntaxError(`Unexpected character at index ${o}`)}if(r===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,o);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}mu.exports={parse:xy}});var Su=D((o0,Au)=>{"use strict";var ky=require("events"),zn=require("http"),{Duplex:n0}=require("stream"),{createHash:Ly}=require("crypto"),pu=Bn(),$e=At(),Ry=Js(),Cy=Vn(),{CLOSE_TIMEOUT:Iy,GUID:Ty,kWebSocket:Py}=le(),Ny=/^[+/0-9A-Za-z]{22}==$/,gu=0,fu=1,yu=2,Ys=class extends ky{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:1024*1024,maxFragments:128*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:Iy,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:Cy,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=zn.createServer((n,o)=>{let s=zn.STATUS_CODES[426];o.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),o.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=Oy(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(o,s,i)=>{this.handleUpgrade(o,s,i,n)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=gu}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===yu){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(cr,this);return}if(t&&this.once("close",t),this._state!==fu)if(this._state=fu,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(cr,this):process.nextTick(cr,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{cr(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,n,o){r.on("error",hu);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){je(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){je(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Ny.test(s)){je(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){je(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){ur(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=Ry.parse(c)}catch{je(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],p={};if(this.options.perMessageDeflate&&u!==void 0){let h=new $e({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let S=pu.parse(u);S[$e.extensionName]&&(h.accept(S[$e.extensionName]),p[$e.extensionName]=h)}catch{je(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let h={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(h,(S,y,l,A)=>{if(!S)return ur(r,y||401,l,A);this.completeUpgrade(p,s,d,t,r,n,o)});return}if(!this.options.verifyClient(h))return ur(r,401)}this.completeUpgrade(p,s,d,t,r,n,o)}completeUpgrade(t,r,n,o,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[Py])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>gu)return ur(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${Ly("sha1").update(r+Ty).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(n.size){let p=this.options.handleProtocols?this.options.handleProtocols(n,o):n.values().next().value;p&&(d.push(`Sec-WebSocket-Protocol: ${p}`),u._protocol=p)}if(t[$e.extensionName]){let p=t[$e.extensionName].params,h=pu.format({[$e.extensionName]:[p]});d.push(`Sec-WebSocket-Extensions: ${h}`),u._extensions=t}this.emit("headers",d,o),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",hu),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(cr,this)})),a(u,o)}};Au.exports=Ys;function Oy(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let n of Object.keys(t))e.removeListener(n,t[n])}}function cr(e){e._state=yu,e.emit("close")}function hu(){this.destroy()}function ur(e,t,r,n){r=r||zn.STATUS_CODES[t],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...n},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${zn.STATUS_CODES[t]}\r
`+Object.keys(n).map(o=>`${o}: ${n[o]}`).join(`\r
`)+`\r
\r
`+r)}function je(e,t,r,n,o,s){if(e.listenerCount("wsClientError")){let i=new Error(o);Error.captureStackTrace(i,je),e.emit("wsClientError",i,r,t)}else ur(r,n,o,s)}});var My,Hy,Dy,Fy,Uy,By,vu,$y,dr,_u=m(()=>{My=g(du(),1),Hy=g(Bn(),1),Dy=g(At(),1),Fy=g(Us(),1),Uy=g(js(),1),By=g(Js(),1),vu=g(Vn(),1),$y=g(Su(),1),dr=vu.default});var Xs=m(()=>{"use strict"});var me,mr=m(()=>{"use strict";me=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Et,Ge,bu,Gy,Zs,Qs,wu,Eu,Wu,xu,ei,ti=m(()=>{"use strict";Et=g(require("node:fs")),Ge=g(require("node:os")),bu=g(require("node:path"));Xs();mr();Gy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zs=(e=Ge.default.hostname())=>bu.default.join(Ge.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),Qs=e=>{if(!Et.default.existsSync(e))return null;try{let t=JSON.parse(Et.default.readFileSync(e,"utf8"));return!Gy(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},wu=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},Eu=(e,t)=>{Et.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Wu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Zs(),n=Qs(r);if(n!==null&&n.pid!==process.pid&&me(n.pid)&&wu(n))return{ok:!1,reason:"held_by_other_process"};let o={hostname:Ge.default.hostname(),macOsUsername:Ge.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return Eu(r,o),{ok:!0}},xu=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??Zs(),n=Qs(r);return n!==null&&n.pid!==process.pid&&me(n.pid)&&wu(n)?{ok:!1}:(Eu(r,{hostname:Ge.default.hostname(),macOsUsername:Ge.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ei=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??Zs();Qs(r)?.pid===process.pid&&Et.default.existsSync(r)&&Et.default.unlinkSync(r)}});var ri,pr,Vy,zy,Ky,qy,ku,Lu=m(()=>{"use strict";ri=require("node:child_process"),pr=g(require("node:path"));mr();Qe();Vy=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),zy=(e,t)=>{if(Vy(e)||!/\bnode\b/.test(e))return!1;let r=pr.default.resolve(t),n=pr.default.join(r,"app",te),o=pr.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===te||i==="agent-witch.ts")return e.includes(r);try{let a=pr.default.resolve(i);return a===n||a===o}catch{return i===n||i===o}})},Ky=e=>{let t=new Set,r=e;for(let n=0;n<32;n+=1){let o="";try{o=(0,ri.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(o,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},qy=(e,t,r)=>{let n=Ky(r),o=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||n.has(c)||zy(d,t)&&o.push(c)}return o},ku=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,ri.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let n=qy(r,e.installDir,t),o=[];for(let s of n)if(me(s))try{process.kill(s,"SIGTERM"),o.push(s)}catch{}return o}});var gr,fr,Ru,Jy,Cu,Iu=m(()=>{"use strict";gr=g(require("node:fs")),fr=g(require("node:path"));x();Ru=(e,t)=>{!gr.default.existsSync(e)||gr.default.existsSync(t)||(gr.default.mkdirSync(fr.default.dirname(t),{recursive:!0}),gr.default.renameSync(e,t))},Jy=e=>{if(e.profileEmail===null)return;let t=fr.default.join(e.installDir,re);Ru(fr.default.join(t,$r),e.mainLogPath),Ru(fr.default.join(t,jr),e.errorLogPath)},Cu=e=>{let t=W();e!==void 0&&t.installDir!==e||Jy(t)}});var Tu,Pu,Nu,Ou,Mu=m(()=>{"use strict";Tu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Pu=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?Tu(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?Tu(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},Nu=e=>{let t=e.watchdogLogs.map(Pu).join(""),r=e.updateLogs.map(Pu).join("");return`<!doctype html>
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
</html>`},Ou=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var Hu,Du,Fu=m(()=>{"use strict";Hu=g(require("node:net")),Du=()=>new Promise((e,t)=>{let r=Hu.default.createServer();r.listen(0,"127.0.0.1",()=>{let n=r.address();if(n===null||typeof n=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let o=n.port;r.close(s=>{if(s!==void 0){t(s);return}e(o)})}),r.on("error",t)})});var Uu,Yy,Bu,$u=m(()=>{"use strict";Uu=g(require("node:net"));Fu();mt();bn();x();Yy=e=>new Promise(t=>{let r=Uu.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Bu=async()=>{let e=b(),t=q();if(await Yy(t))return kl(t),t;let r=await Du();return _n(e,r),r}});var Xy,ju,Gu=m(()=>{"use strict";Xy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ju=e=>({force:Xy(e)&&e.force===!0})});var ni,Zy,Vu,zu=m(()=>{"use strict";ni=g(require("node:os")),Zy=e=>{let t=e.trim();return t.startsWith("~/")?`${ni.default.homedir()}${t.slice(1)}`:t==="~"?ni.default.homedir():t},Vu=Zy});var Ve,Wt,Kn=m(()=>{"use strict";Ve=g(require("node:path"));ot();zu();Wt=e=>{let t=Vu(e),r=Ve.default.join(t,va);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Ve.default.join(r,"rag"),memoryDirPath:Ve.default.join(r,_a),reportsDirPath:Ve.default.join(r,wa),metaFilePath:Ve.default.join(r,ba),ragChunksFilePath:Ve.default.join(r,"rag",Xr)}}});var ee,qu,Qy,eA,hr,oi=m(()=>{"use strict";ee=g(require("node:fs")),qu=g(require("node:path"));ot();Kn();Qy=(e,t)=>{if(ee.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};ee.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},eA=e=>{ee.default.existsSync(e.ragChunksFilePath)||ee.default.writeFileSync(e.ragChunksFilePath,"");let t=qu.default.join(e.memoryDirPath,Zr);ee.default.existsSync(t)||ee.default.writeFileSync(t,"")},hr=e=>{let t=Wt(e.projectFolderPath);return ee.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),ee.default.mkdirSync(t.ragDirPath,{recursive:!0}),ee.default.mkdirSync(t.memoryDirPath,{recursive:!0}),Qy(t,e),eA(t),{ok:!0,layout:t}}});var tA,Ju,Yu=m(()=>{"use strict";oi();tA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ju=e=>{if(!tA(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:hr({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Zu,oA,Xu,C,rA,nA,si,Qu=m(()=>{"use strict";Zu=g(require("node:http"));Rs();os();Mu();$u();Gu();Yr();Yu();on();Ze();oA={},Xu=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},C=(e,t,r,n)=>{e.writeHead(t,n),e.end(JSON.stringify(r))},rA=e=>{e.writeHead(403),e.end()},nA=async(e,t,r)=>{let n=e.headers.origin,o=wl(n);try{if(n!==void 0&&n.length>0&&!o.allowed){rA(t);return}if(e.method==="OPTIONS"){t.writeHead(204,o.headers),t.end();return}let s=e.url?.split("?")[0]??"/";if(e.method==="GET"&&s==="/health"){C(t,200,vs(),o.headers);return}if(e.method==="GET"&&s==="/identity"){C(t,200,_s(),o.headers);return}if(e.method==="GET"&&s==="/local"){let i=In(50),a=Tn(50);t.writeHead(200,Ou()),t.end(Nu({port:r,watchdogLogs:i,updateLogs:a}));return}if(e.method==="GET"&&s==="/watchdog/status"){let i=await ws();C(t,200,i,o.headers);return}if(e.method==="GET"&&s==="/watchdog/logs"){let i=new URL(e.url??"/watchdog/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;C(t,200,{ok:!0,logs:In(c)},o.headers);return}if(e.method==="POST"&&s==="/watchdog/revive"){let i=await Es();C(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/restart"){let i=await Ws();C(t,i.ok?200:503,i,o.headers);return}if(e.method==="GET"&&s==="/update/status"){let i=xs();C(t,200,{ok:!0,...i},o.headers);return}if(e.method==="GET"&&s==="/update/logs"){let i=new URL(e.url??"/update/logs","http://127.0.0.1"),a=Number.parseInt(i.searchParams.get("limit")??"20",10),c=Number.isFinite(a)&&a>0?Math.min(a,200):20;C(t,200,{ok:!0,logs:Tn(c)},o.headers);return}if(e.method==="POST"&&s==="/update/run"){let i=await Xu(e),{force:a}=ju(i),c=await ks({force:a});C(t,c.ok?200:503,c,o.headers);return}if(e.method==="POST"&&s==="/install/delete"){let i=await Ls();C(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/wake"){let i=await bs();C(t,i.ok?200:503,i,o.headers);return}if(e.method==="POST"&&s==="/harness/install"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{C(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Cn(a);C(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/projects/ensure"){let i=await Xu(e),a=Ju(i);C(t,a.ok?200:400,a,o.headers);return}if(e.method==="POST"&&s==="/harness/borrow"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{C(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=Cn(a);C(t,c.ok?200:400,c,o.headers);return}if(e.method==="GET"&&s==="/automations/status"){C(t,200,Ss(),o.headers);return}if(e.method==="POST"&&s==="/automations/sync"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{C(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=ys(a);C(t,c.ok?200:400,c,o.headers);return}if(e.method==="POST"&&s==="/automations/run"){let i=[];for await(let d of e)i.push(Buffer.from(d));let a={};try{a=JSON.parse(Buffer.concat(i).toString("utf8"))}catch{C(t,400,{ok:!1,errorMessage:"Invalid JSON body."},o.headers);return}let c=await As(a);C(t,c.ok?200:503,c,o.headers);return}C(t,404,{ok:!1,errorMessage:"Not found."},o.headers)}catch{C(t,500,{ok:!1,errorMessage:"Wake server error."},o.headers)}},si=async()=>{let e=await Bu(),t=Zu.default.createServer((r,n)=>{nA(r,n,e)});return await new Promise((r,n)=>{t.once("error",n),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t};!Y()&&st(oA.url)&&(async()=>{nt("agent-witch-wake-server");let e=await si(),t=Jr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var ii,ed=m(()=>{"use strict";qt();Sn();Yt();ii=async()=>{let e=se();if(e===null)return;let t=be(e.layout),r=Date.now();for(let n of t.automations){if(!n.enabled||n.nextRunAt===null||new Date(n.nextRunAt).getTime()>r)continue;let o=await dt(n.id);o.ok||process.stderr.write(`[agent-witch] automation ${n.name}: ${o.errorMessage??"run failed"}
`)}}});var td,rd=m(()=>{"use strict";Xs();Qu();ti();ed();td=async(e={})=>{let t=await si();ii();let r=setInterval(()=>{ii()},6e4),n=setInterval(()=>{if(!xu().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(n),t.close()}}}});var yr,qn,aA,nd,od,Jn,sd,id,ai,ad,Yn,ld=m(()=>{"use strict";yr=g(require("node:fs")),qn=g(require("node:path")),aA="pending-run-inputs.json",nd=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),od=e=>{let t=e.profileEmail?qn.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return qn.default.join(t,aA)},Jn=e=>{let t=od(e);if(!yr.default.existsSync(t))return{};try{let r=JSON.parse(yr.default.readFileSync(t,"utf8"));return nd(r)?Object.fromEntries(Object.entries(r).flatMap(([n,o])=>{if(!nd(o))return[];let s=typeof o.originalPrompt=="string"?o.originalPrompt:"",i=typeof o.partialOutput=="string"?o.partialOutput:"",a=typeof o.question=="string"?o.question:"",c=typeof o.accumulatedOutput=="string"?o.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[n,{agentRunId:n,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},sd=(e,t)=>{let r=od(e);yr.default.mkdirSync(qn.default.dirname(r),{recursive:!0}),yr.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},id=e=>Object.values(Jn(e)),ai=(e,t)=>Jn(e)[t]!==void 0,ad=(e,t)=>{let r=Jn(e);r[t.agentRunId]=t,sd(e,r)},Yn=(e,t)=>{let r=Jn(e);delete r[t],sd(e,r)}});var li,cd=m(()=>{"use strict";li={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var ci,ew,ud=m(()=>{"use strict";ci={OPEN:"open",APPROVAL:"approval"},ew=ci.APPROVAL});var xt,Xn,dd,lA,md,pd,gd,Zn,fd,ui=m(()=>{"use strict";xt=g(require("node:fs")),Xn=g(require("node:path")),dd="runs",lA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),md=e=>{let t=e.profileEmail!==null?Xn.default.join(e.installDir,"profiles",e.profileEmail,dd):Xn.default.join(e.installDir,dd);return xt.default.mkdirSync(t,{recursive:!0}),t},pd=(e,t)=>Xn.default.join(md(e),`${t}.json`),gd=(e,t)=>{xt.default.writeFileSync(pd(e,t.id),JSON.stringify(t,null,2))},Zn=(e,t)=>{let r=pd(e,t);if(!xt.default.existsSync(r))return null;try{let n=JSON.parse(xt.default.readFileSync(r,"utf8"));return!lA(n)||typeof n.id!="string"?null:n}catch{return null}},fd=e=>{let t=md(e),r=xt.default.readdirSync(t,{withFileTypes:!0}),n=[];for(let o of r){if(!o.isFile()||!o.name.endsWith(".json"))continue;let s=o.name.replace(/\.json$/,""),i=Zn(e,s);i!==null&&n.push(i)}return n.toSorted((o,s)=>s.createdAt.localeCompare(o.createdAt))}});var cA,hd,yd=m(()=>{"use strict";cd();ud();ui();cA=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent";return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:e.exitCode===0?li.COMPLETED:li.FAILED,dispatchPolicy:ci.OPEN,resultOutput:e.output,resultExitCode:e.exitCode,denialReason:null,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},hd=(e,t)=>{let r=cA(t);return gd(e,r),r}});var Ar,Qn,uA,di,Ad,Sd,vd,mi,_d=m(()=>{"use strict";Ar=g(require("node:fs")),Qn=g(require("node:path"));hn();uA="run-completion-outbox.json",di=e=>{let t=e.profileEmail?Qn.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Qn.default.join(t,uA)},Ad=e=>{let t=di(e);if(!Ar.default.existsSync(t))return[];try{let r=JSON.parse(Ar.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(n=>typeof n=="object"&&n!==null&&typeof n.runId=="string"&&typeof n.exitCode=="number"&&typeof n.output=="string"&&typeof n.createdAt=="string"):[]}catch{return[]}},Sd=(e,t)=>{Ar.default.mkdirSync(Qn.default.dirname(di(e)),{recursive:!0}),Ar.default.writeFileSync(di(e),JSON.stringify(t,null,2),"utf8")},vd=(e,t)=>{let r=[...Ad(e).filter(n=>n.runId!==t.runId),t];Sd(e,r)},mi=async e=>{if(e.cloudApi===null)return;let t=Ad(e.layout);if(t.length===0)return;let r=[];for(let n of t)await hl(e.cloudApi,n.runId,n.exitCode,n.output)||r.push(n);Sd(e.layout,r)}});var bd=m(()=>{"use strict"});var pi,Sr,mA,kt,wd=m(()=>{"use strict";bd();pi=new Map,Sr=e=>{let t=pi.get(e);t!==void 0&&(clearInterval(t),pi.delete(e))},mA=(e,t,r,n={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...n}}))},kt=(e,t,r,n={})=>{Sr(t);let o=n.awaitingInput===!0,s=()=>{if(!r()){Sr(t);return}let i=n.onTick?.()??{};mA(e,t,o,i)};s(),pi.set(t,setInterval(s,15e3))}});var gi,vr,Lt,Ed,ze,Wd,eo=m(()=>{"use strict";gi=new Set,vr=new Map,Lt=(e,t)=>{if(t.length===0)return;let r=vr.get(e)??[];r.push(t),vr.set(e,r)},Ed=e=>{gi.add(e);let t=vr.get(e)??[];return vr.delete(e),t},ze=e=>gi.has(e),Wd=e=>{gi.delete(e),vr.delete(e)}});var xd,kd,Ld,Rd,H,Rt,Cd,Id,_r,Td,Pd,fi,Nd,Od,Md,to=m(()=>{"use strict";xd=require("node:crypto"),kd=g(require("node:fs")),Ld=g(require("node:path")),Rd=require("node:url");mr();Ze();Ro();H=new Map,Cd=async()=>{if(Rt!==void 0)return Rt;try{if(Y()){let e=Br(),t=Ld.default.join(e,"deps","node-pty","lib","index.js");if(kd.default.existsSync(t)){let r=await import((0,Rd.pathToFileURL)(t).href);return Rt=r,r}}return Rt=await import("node-pty"),Rt}catch{return Rt=null,null}},Id=(e,t,r,n)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:n})},_r=(e,t,r)=>{let n=H.get(e);if(n!==void 0){H.delete(e);try{n.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},Td=(e,t)=>{let r=H.get(e);return r===void 0?!1:(r.pty.write(t),!0)},Pd=(e,t,r)=>{let n=H.get(e);return n===void 0?!1:(n.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},fi=e=>{for(let t of H.values())if(!(t.mode!=="agent"||t.runId!==e))return me(t.pty.pid);return!1},Nd=e=>{for(let[t,r]of H.entries())if(!(r.mode!=="agent"||r.runId!==e)){H.delete(t);try{r.pty.kill()}catch{}return!0}return!1},Od=async e=>{let t=await Cd();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this Mac. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;H.get(e.shellSessionId)!==void 0&&_r(e.shellSessionId,e.send,e.requestId);let n=process.env.SHELL?.trim()||"/bin/zsh",o;try{o=t.spawn(n,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return H.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:o,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),o.onData(s=>{Id(e.send,e.shellSessionId,s,e.requestId)}),o.onExit(()=>{H.get(e.shellSessionId)?.pty===o&&(H.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Md=async e=>{let t=e.shellSessionId??(0,xd.randomUUID)(),r=await Cd();if(r===null)return{shellSessionId:t,usedPty:!1};let n;try{n=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:process.env})}catch(o){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",o instanceof Error?o.message:o),{shellSessionId:t,usedPty:!1}}return H.set(t,{shellSessionId:t,pty:n,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),n.onData(o=>{Id(e.send,t,o,e.requestId),e.onData(o)}),n.onExit(({exitCode:o})=>{H.get(t)?.pty===n&&(H.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(o??-1)}),{shellSessionId:t,usedPty:!0}}});var ro,Hd,Dd=m(()=>{"use strict";ro="[[AWAITING_INPUT]]",Hd=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",ro,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var br,Fd,no=m(()=>{"use strict";Dd();br=e=>{let t=e.indexOf(ro);if(t<0)return null;let n=e.slice(t+ro.length).trim().split(`
`)[0]?.trim()??"";return n.length===0?null:{question:n,partialOutput:e.slice(0,t).trim()}},Fd=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Hd].join(`
`)});var Ud,Bd=m(()=>{"use strict";eo();to();no();Ud=async e=>{let t=[],r=!1,n=s=>{if(s.length!==0){if(ze(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Lt(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Md({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),n(s),r)return;let i=br(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var $d,jd,Gd,ke,oo=m(()=>{"use strict";$d=require("node:child_process"),jd=g(require("node:fs")),Gd=g(require("node:path"));Qe();ke=(e,t)=>{let r=Gd.default.join(e,"app",Zi,"ensure-writer.sh");return jd.default.existsSync(r)?new Promise((n,o)=>{let s=(0,$d.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"]});s.stdout?.resume(),s.stderr?.resume(),s.on("error",i=>{o(i)}),s.on("close",i=>{if(i===0){n();return}o(new Error(`ensure-writer.sh exited with code ${String(i??-1)}`))})}):Promise.resolve()}});var Vd,Ke,so,zd,Kd,hi,qd,yi,Jd,Yd,pA,io,gA,fA,Xd,Ai=m(()=>{"use strict";Vd=require("node:child_process");ut();oo();Ke=new Map,so=e=>e==="cursor"||e==="antigravity",zd=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",Kd=e=>Ke.get(e)?.warmed===!0,hi=e=>{let t=Ke.get(e);Ke.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},qd=e=>Ke.get(e)?.conversationStarted===!0,yi=e=>{let t=Ke.get(e);Ke.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},Jd=e=>{Ke.delete(e)},Yd=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",pA={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},io=e=>`${pA[e]} is ready on your Mac.
Send a task from the box below when you are ready.
`,gA=(e,t,r,n)=>new Promise(o=>{let s=Al(t,r),i=[],a=(0,Vd.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),n?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{o({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{o({exitCode:-1,output:d.message})})}),fA=(e,t)=>{let r=io(e);if(t.length===0)return r;let n=t.endsWith(`
`)?"":`
`;return`${t}${n}${r}`},Xd=async e=>{if(!M(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your Mac\u2026
`),await ke(e.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${n}
`}}so(e.writerAgent)&&hi(e.writerAgent);let t=await gA(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?fA(e.writerAgent,t.output):io(e.writerAgent)}}});var Zd,wr,O,Si,Qd,em,vi,tm,rm,nm,hA,pe,ao,Ct,om,yA,_i,sm,im,am,lm=m(()=>{"use strict";Zd=require("node:child_process");ut();ld();yd();_d();wd();mr();eo();to();no();Bd();Ai();Ft();no();wr=new Map,O=new Map,Si=new Set,Qd=130,em=`

Stopped by user.`,vi=null,tm=e=>{vi=e},rm=async e=>{await mi({layout:e,cloudApi:vi})},nm=e=>{let t=wr.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:me(t.pid)},hA=e=>we({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),pe=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},ao=(e,t,r,n,o,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(o===void 0||o.trim().length===0||s===void 0||s.trim().length===0)return{};let a=tn(s),c=O.get(r);if(a!==null&&c!==void 0){let d=Na(a),u=nm(r)||fi(r);d!==null&&!u&&Ct(e,t,r,n,d.exitCode,d.output,c.originalPrompt)}return Pa(a)}}),Ct=(e,t,r,n,o,s,i)=>{let a=o,c=s;r!==void 0&&Si.has(r)&&(Si.delete(r),a=Qd,c=c.trim().length>0&&!c.includes("Stopped by user.")?`${c.trim()}${em}`:"Stopped by user."),r!==void 0&&(Sr(r),ze(r)&&(pe(t,{type:"terminal.stream.end",payload:{runId:r},requestId:n}),Wd(r)),hd(e.layout,{agentRunId:r,originalPrompt:i,exitCode:a,output:c,layout:e.layout}),vd(e.layout,{runId:r,exitCode:a,output:c,createdAt:new Date().toISOString()}),mi({layout:e.layout,cloudApi:vi}),O.delete(r),wr.delete(r),Yn(e.layout,r)),pe(t,{type:"command.claude.result",payload:{exitCode:a,output:c,...r!==void 0?{agentRunId:r}:{}},requestId:n})},om=(e,t,r,n,o,s,i)=>{let a=O.get(r),c=a?.accumulatedOutput??s;ad(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:o,accumulatedOutput:c}),kt(t,r,()=>ai(e.layout,r),ao(e,t,r,n,a?.projectFolderPath,a?.reportKey,!0)),pe(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:o,partialOutput:c},requestId:n})},yA=(e,t,r,n,o,s,i)=>{let a=[],c=!1,d=u=>{if(!(o===void 0||u.length===0)){if(ze(o)){pe(r,{type:"terminal.stream.chunk",payload:{runId:o,chunk:u},requestId:n});return}Lt(o,u)}};if(o!==void 0){let u=O.get(o);wr.set(o,t),O.set(o,{originalPrompt:s,writerAgent:i,projectFolderPath:u?.projectFolderPath,reportKey:u?.reportKey,accumulatedOutput:u?.accumulatedOutput??""}),pe(r,{type:"terminal.stream.start",payload:{runId:o},requestId:n}),kt(r,o,()=>nm(o),ao(e,r,o,n,u?.projectFolderPath,u?.reportKey))}t.stdout?.on("data",u=>{let p=u.toString("utf8");if(a.push(p),d(p),c||o===void 0)return;let h=br(a.join(""));if(h!==null){c=!0,t.kill("SIGTERM");let S=O.get(o),y=[S?.accumulatedOutput??"",h.partialOutput].filter(l=>l.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=y),wr.delete(o),om(e,r,o,n,h.question,y,s)}}),t.stderr?.on("data",u=>{let p=u.toString("utf8");a.push(p),d(p)}),t.on("close",u=>{if(c)return;yi(i);let p=o!==void 0?O.get(o):void 0,h=a.join("").trim(),S=p!==void 0&&p.accumulatedOutput.length>0?`${p.accumulatedOutput}

${h}`.trim():h;Ct(e,r,o,n,u??-1,S,s)}),t.on("error",u=>{c||Ct(e,r,o,n,-1,u.message,s)})},_i=(e,t,r,n,o,s,i,a,c,d)=>{let u=ct(t,r,hA(e),i);if(u===null){Ct(e,o,s,n,-1,"Writer instruction must be a non-empty string.",r);return}let p=()=>{let h=(0,Zd.spawn)(u.command,[...u.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});yA(e,h,o,n,s,r,t)};if(s===void 0){p();return}O.set(s,{originalPrompt:r,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:O.get(s)?.accumulatedOutput??""}),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&rn({reportKey:d,agentRunId:s,userSummary:"Task started on your Mac."}),kt(o,s,()=>O.has(s),ao(e,o,s,n,c,d)),Ud({socket:o,sendMessage:pe,requestId:n,agentRunId:s,shellSessionId:a,command:u.command,args:u.args,cwd:e.workspace,originalPrompt:r,writerAgent:t,onInputRequired:h=>{a!==void 0&&_r(a,l=>{pe(o,l)},n);let S=O.get(s),y=[S?.accumulatedOutput??"",h.partialOutput].filter(l=>l.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=y),om(e,o,s,n,h.question,y,r)},onFinished:(h,S)=>{yi(t);let y=O.get(s),l=y!==void 0&&y.accumulatedOutput.length>0?`${y.accumulatedOutput}

${S}`.trim():S;Ct(e,o,s,n,h,l,r)}}).then(h=>{if(!h){p();return}kt(o,s,()=>fi(s),ao(e,o,s,n,c,d))}).catch(h=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",h instanceof Error?h.message:h),p()})},sm=(e,t,r,n)=>{Yn(e.layout,t.agentRunId),t.shellSessionId!==void 0&&pe(n,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let o=Fd(t),s=O.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;_i(e,i,o,r,n,t.agentRunId,void 0,t.shellSessionId,a,c)},im=(e,t)=>{for(let r of id(e.layout))O.set(r.agentRunId,{originalPrompt:r.originalPrompt,writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),kt(t,r.agentRunId,()=>ai(e.layout,r.agentRunId),{awaitingInput:!0}),pe(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},am=(e,t,r,n)=>{let o=O.get(r);if(o===void 0)return!1;Si.add(r),Sr(r);let s=wr.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(Nd(r))return!0;Yn(e.layout,r);let i=o.accumulatedOutput.trim().length>0?`${o.accumulatedOutput.trim()}${em}`:"Stopped by user.";return Ct(e,t,r,n,Qd,i,o.originalPrompt),!0}});var AA,cm,um=m(()=>{"use strict";mt();AA=()=>`http://127.0.0.1:${q()}/restart`,cm=async()=>{try{let e=await fetch(AA(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var qe,bi,SA,vA,wi,Je,lo,dm,co=m(()=>{"use strict";qe=g(require("node:fs")),bi=g(require("node:path")),SA="local-ws-traffic.ndjson",vA=500,wi=e=>bi.default.join(e.logsDir,SA),Je=(e,t)=>{let r=wi(e);qe.default.mkdirSync(bi.default.dirname(r),{recursive:!0});let n=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});qe.default.appendFileSync(r,`${n}
`,"utf8")},lo=(e,t=vA)=>{let r=wi(e);if(!qe.default.existsSync(r))return[];let o=qe.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of o)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},dm=e=>{let t=wi(e);qe.default.existsSync(t)&&qe.default.writeFileSync(t,"","utf8")}});var _A,uo,Ei=m(()=>{"use strict";mt();_A=()=>`http://127.0.0.1:${q()}/update/run`,uo=async e=>{try{let t=await fetch(_A(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var mm,pm=m(()=>{"use strict";mm=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Er,bA,gm,fm=m(()=>{"use strict";co();Oe();Ei();pm();Er=(e,t)=>{Je(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},bA=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(lt(),un)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},gm=async e=>{let t=U(e.layout.installDir)?.bundleVersion??null;if(!mm({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Er(e.layout,{summary:r,action:"install-bundle-update-start"});let n=await uo({force:!0});if(n.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,n.payload),Er(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!n.reachable){let o=await bA();if(o.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Er(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",o.message),Er(e.layout,{summary:`Install bundle update failed: ${o.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",n.payload),Er(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var wA,hm,ym=m(()=>{"use strict";wA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hm=e=>{if(!wA(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var Am,Sm,vm=m(()=>{"use strict";Qo();Sn();Am=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=gn({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},Sm=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await dt(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var z,EA,WA,xA,_m,bm,wm,Em,Wm,xm,km=m(()=>{"use strict";z=require("node:crypto"),EA=Buffer.from("302a300506032b6570032100","hex"),WA=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},xA=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,z.createPublicKey)({key:Buffer.concat([EA,t]),format:"der",type:"spki"})},_m=()=>{let{publicKey:e,privateKey:t}=(0,z.generateKeyPairSync)("ed25519");return{publicKeyRaw:WA(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},bm=e=>(0,z.createPrivateKey)(e),wm=(e,t)=>(0,z.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Em=(e,t,r)=>{try{let n=xA(e);return(0,z.verify)(null,Buffer.from(t,"utf8"),n,Buffer.from(r,"base64url"))}catch{return!1}},Wm=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,xm=()=>(0,z.randomBytes)(32).toString("base64url")});var ge,mo,Lm,kA,LA,Wi,Rm,Cm,xi=m(()=>{"use strict";ge=g(require("node:fs")),mo=g(require("node:path"));km();x();Lm=e=>mo.default.join(e.installDir,et),kA=(e,t)=>{if(e.profileEmail===null||t===Lm(e)||ge.default.existsSync(t))return;let r=Lm(e);ge.default.existsSync(r)&&(ge.default.mkdirSync(mo.default.dirname(t),{recursive:!0}),ge.default.renameSync(r,t))},LA=e=>{if(!ge.default.existsSync(e))return null;try{let t=ge.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Wi=e=>{let t=aa(e);kA(e,t);let r=LA(t);if(r!==null)return r;let n=_m();return ge.default.mkdirSync(mo.default.dirname(t),{recursive:!0}),ge.default.writeFileSync(t,JSON.stringify(n,null,2),{mode:384}),n},Rm=e=>{let t=Wi(e.layout),r=xm(),n=Wm({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),o=bm(t.privateKeyPem),s=wm(o,n);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Cm=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Em(e.serverPublicKey,t,e.serverAttestation)}});var RA,Im,Tm=m(()=>{"use strict";RA="local.agentwitch.com",Im=`http://${RA}:43347`});var Wr,po,CA,IA,TA,PA,Pm,NA,OA,Nm,xr,Om,kr,Mm,ki=m(()=>{"use strict";Wr=g(require("node:fs")),po=g(require("node:path"));ot();Kn();CA="rag",IA="http://127.0.0.1:11434",TA="nomic-embed-text",PA=e=>po.default.join(e.installDir,CA),Pm=(e,t)=>t!==void 0&&t.trim().length>0?Wt(t).ragChunksFilePath:po.default.join(PA(e),Xr),NA=(e,t)=>{let r=Math.min(e.length,t.length),n=0,o=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;n+=a*c,o+=a*a,s+=c*c}return o===0||s===0?0:n/(Math.sqrt(o)*Math.sqrt(s))},OA=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let n=[],o=0;for(;o<r.length;)n.push(r.slice(o,o+t)),o+=t;return n},Nm=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||IA,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||TA;try{let n=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!n.ok)return null;let o=await n.json();return typeof o=="object"&&o!==null&&"embedding"in o&&Array.isArray(o.embedding)?o.embedding:null}catch{return null}},xr=(e,t)=>{let r=Pm(e,t);if(!Wr.default.existsSync(r))return[];let n=Wr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Om=async e=>{let t=OA(e.text);if(t.length===0)return 0;let r=Pm(e.layout,e.projectFolderPath);Wr.default.mkdirSync(po.default.dirname(r),{recursive:!0});let n=0;for(let o of t){let s=await Nm(o);if(s===null)continue;let i={id:`${Date.now()}-${n}`,text:o,embedding:s,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Wr.default.appendFileSync(r,`${JSON.stringify(i)}
`,"utf8"),n+=1}return n},kr=async e=>{let t=await Nm(e.query);return t===null?[]:xr(e.layout,e.projectFolderPath).map(o=>({chunk:o,score:NA(t,o.embedding)})).sort((o,s)=>s.score-o.score).slice(0,e.limit??5).map(o=>o.chunk)},Mm=e=>e.length===0?"":`Local knowledge (from this Mac):

${e.map((r,n)=>`[${n+1}] ${r.text}`).join(`

`)}

---

`});var Hm,Dm=m(()=>{"use strict";Hm=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let n=Math.max(0,Math.floor((t-r)/1e3));if(n<60)return`${n}s`;let o=Math.floor(n/60),s=n%60;if(o<60)return s>0?`${o}m ${s}s`:`${o}m`;let i=Math.floor(n/3600),a=Math.floor(n%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var Fm,go,Um,fo=m(()=>{"use strict";Dm();Fm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),go=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=Fm(e),r=Fm(Hm(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Um=`(function () {
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
})();`});var It,Bm,$m=m(()=>{"use strict";It=(e,t,r)=>e===1?t:r,Bm=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=Math.max(0,t-r);if(n<6e4)return"just now";let o=Math.floor(n/6e4);if(o<60)return`${o} ${It(o,"min","mins")} ago`;let s=Math.floor(n/36e5),i=Math.floor(n%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${It(i,"min","mins")} ago`;let a=Math.floor(n/864e5);if(a<7)return`${a} ${It(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${It(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${It(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${It(u,"year","years")} ago`}});var Li,jm,Gm=m(()=>{"use strict";Li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jm=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.exists&&e.content.length>0?`<pre class="error-log-view">${Li(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${Li(e.errorLogPath)}</code>.</p>`;return`<section class="card">
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
    </section>`}});var Vm,zm,Km,qm=m(()=>{"use strict";Vm=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,zm=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,Km=e=>e==="ok"?'<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var Lr,Jm,Ym=m(()=>{"use strict";fo();Lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jm=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} project set(s) ready to submit`:"Scan local .cursor folders and install rules on this Mac",n=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this Mac",o=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Lr(e.wakeError)}</div>`:"",a=go(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This Mac</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this Mac.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Last heartbeat \xB7 ${a}</span>
      </div>
    </section>
    <div class="home-grid">
      <a class="home-card" href="/harness">
        <p class="home-card-eyebrow">Setup</p>
        <h2 class="home-card-title">Harness</h2>
        <p class="home-card-lede">Reveal rules, commands, skills, and agents from your repos. Submit to <code>~/.agent-witch</code>.</p>
        <p class="home-card-meta">${Lr(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this Mac.</p>
        <p class="home-card-meta">${Lr(n)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this Mac and the cloud bridge.</p>
        <p class="home-card-meta">${Lr(o)}</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this Mac.</p>
        <p class="home-card-meta">${Lr(s)}</p>
      </a>
      <a class="home-card" href="/status">
        <p class="home-card-eyebrow">Health</p>
        <h2 class="home-card-title">Bridge status</h2>
        <p class="home-card-lede">WebSocket, link code, install bundle, and revive actions.</p>
        <p class="home-card-meta">${e.wsConnected?"Bridge is up":"Check connection details"}</p>
      </a>
    </div>`}});var Xm,Zm=m(()=>{"use strict";Xm=`
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
.sync-cloud-row { margin-top: 1rem; }

.check-row label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; }

.check-row input { margin-right: 0.35rem; }

.harness-set { margin-top: 1rem; }
`.trim()});var MA,HA,Qm,ep,tp=m(()=>{"use strict";Zm();fo();MA=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,HA=[{href:"/",label:"Home"},{href:"/status",label:"Status"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"},{href:"/knowledge",label:"Knowledge"},{href:"/harness",label:"Harness"}],Qm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ep=e=>{let t=HA.map(o=>{let s=o.href===e.activePath;return`<a class="nav-link${s?" is-active":""}" href="${o.href}"${s?' aria-current="page"':""}>${o.label}</a>`}).join(""),r=Qm(e.cloudAppOrigin),n=e.headerUpdateButtonHtml??"";return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${Qm(e.title)} \xB7 Agent Witch Local</title>
  <style>${Xm}</style>
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <a class="brand" href="/" aria-label="Agent Witch Local home">
        ${MA}
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
  <script>${Um}</script>
</body>
</html>`}});var DA,rp,np,op=m(()=>{"use strict";DA=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,rp=e=>e.kind==="folder",np=e=>{let t={kind:"folder",name:"",children:new Map};for(let n of e){let o=n.relativePath.split("/"),s=t;for(let i=0;i<o.length;i+=1){let a=o[i];if(a===void 0)continue;if(i===o.length-1){s.children.set(a,n);continue}let d=s.children.get(a);if(d!==void 0&&rp(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=n=>{let o=[];for(let s of n.children.values()){if(rp(s)){o.push({type:"folder",name:s.name,children:r(s)});continue}o.push({type:"file",item:s})}return o.toSorted(DA)};return r(t)}});var sp,Ri,ip=m(()=>{"use strict";sp=g(require("node:path")),Ri=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Ri(r.children,t)}</ul>
            </details>
          </li>`;let n=sp.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var ap,Le,FA,UA,ho,BA,lp,cp=m(()=>{"use strict";ap=g(require("node:path"));op();ip();Le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FA=()=>`(() => {
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
})();`,UA=()=>`(() => {
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
})();`,ho=e=>{let t=e.flashError?`<div class="alert-error">${Le(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Le(e.flashMessage)}</div>`:"",r=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':BA(e.reveal),n=e.reveal?.scanRoots[0]?.trim()??"",o=n.length>0&&e.scanFolder.trim()===n;return`${t}<section class="card">
      <p class="eyebrow">Local harness</p>
      <h1>Reveal &amp; submit</h1>
      <p class="lede">Pick one folder under your home directory, scan for projects with <code>.cursor</code>, then submit your selection to the local harness. Scanning <code>~</code> can take a while \u2014 prefer a project folder or use <strong>Stop</strong>.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Le(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Le(n)}" />
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
    <script>${FA()}</script>
    <script>${UA()}</script>`},BA=e=>{let t=new Map;e.sets.forEach((n,o)=>{let s=n.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:n,setIndex:o}]})});let r=[...t.entries()].toSorted(([n],[o])=>n.localeCompare(o)).map(([n,o],s)=>{let i=o.sets.map(({set:a,setIndex:c})=>{let d=np(a.items.map(h=>({...h,relativePath:typeof h.relativePath=="string"&&h.relativePath.length>0?h.relativePath:ap.default.relative(a.sourceRoot,h.sourcePath).replaceAll("\\","/")}))),u=Ri(d,Le),p=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" checked />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Le(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Le(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${p} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Le(n)}" autocomplete="off" />
          </label>
          ${i}
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
    </form>`},lp=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),n=Number.parseInt(e.get("setCount")??"0",10),o=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&o.set(d,u)}let s=[];for(let i=0;i<n;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?o.get(d):void 0,p=e.get(`setName-${i}`)?.trim()??u??a,h=t.sets[i];if(h===void 0)continue;let S=a.length>0?a:h.proposedSlug,y=p.length>0?p:h.proposedName,l=r.size===0||r.has(i),A=h.items.map(_=>({id:_.id,kind:_.kind,title:_.title,sourcePath:_.sourcePath,include:l}));s.push({slug:S,name:y,items:A})}return s}});var Ci,up=m(()=>{"use strict";Ci=()=>"~"});var dp,mp,pp=m(()=>{"use strict";dp=require("node:child_process"),mp=()=>{if(process.platform!=="darwin")return null;try{let t=(0,dp.execFileSync)("/usr/bin/osascript",["-e",'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")'],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return t.length>0?t:null}catch{return null}}});var gp,fp,hp=m(()=>{"use strict";gp=require("node:crypto"),fp=e=>`local-${(0,gp.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Ii,yp=m(()=>{"use strict";Ii=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Rr,yo,Ti=m(()=>{"use strict";Rr=g(require("node:path")),yo=e=>{let t=Rr.default.dirname(e),r=Rr.default.basename(t);return r==="agents"?Rr.default.basename(Rr.default.dirname(t)):r}});var Cr,fe,Ap,$A,jA,GA,Ao,Sp,Pi=m(()=>{"use strict";Cr=g(require("node:fs")),fe=g(require("node:path"));hp();yp();Ti();Ap=new Set(["node_modules",".git","dist","build",".next","coverage"]),$A=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},jA=(e,t)=>{let r=fe.default.basename(t);if(e==="skill"){let n=t.split(fe.default.sep),o=n.indexOf("skills");if(o>=0&&n[o+1]!==void 0)return n[o+1]??r}return r.replace(/\.(mdc|md)$/i,"")},GA=e=>{let t=[],r=(o,s)=>{let i;try{i=Cr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&Ap.has(a.name))continue;let c=fe.default.join(o,a.name),d=s?fe.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Ii(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let o of["rules","commands","agents","instructions"]){let s=fe.default.join(e,o);Cr.default.existsSync(s)&&r(s,o)}let n=fe.default.join(e,"skills");return Cr.default.existsSync(n)&&r(n,"skills"),t},Ao=e=>{let t=GA(e);if(t.length===0)return null;let r=fe.default.dirname(e),n=yo(e),o=$A(n),s=t.map(i=>{let a=Ii(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:fp(i.absolutePath),kind:a,title:jA(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:o,proposedName:n,sourceRoot:e,repoPath:r,items:s}},Sp=function*(e,t,r){let n=function*(o,s){if(r()||s>t)return;let i;try{i=Cr.default.readdirSync(o,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||Ap.has(a.name))continue;let c=fe.default.join(o,a.name);if(a.name===".cursor"){yield c;continue}yield*n(c,s+1)}};yield*n(e,0)}});var So,Ni,Ir,VA,Ye,vo,Tr=m(()=>{"use strict";So=g(require("node:fs")),Ni=g(require("node:os")),Ir=g(require("node:path")),VA=()=>So.default.realpathSync(Ir.default.resolve(Ni.default.homedir())),Ye=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Ir.default.join(Ni.default.homedir(),t.slice(1)):t,n;try{n=So.default.realpathSync(Ir.default.resolve(r))}catch{return null}let o=VA();return n===o||n.startsWith(`${o}${Ir.default.sep}`)?n:null},vo=e=>{let t=Ye(e);if(t===null)return null;try{if(!So.default.statSync(t).isFile())return null}catch{return null}return t}});var vp,Oi,zA,_p,bp=m(()=>{"use strict";vp=g(require("node:fs")),Oi=g(require("node:path"));Pi();Tr();zA=e=>{let t=Ye(e.trim());if(t===null)return null;if(Oi.default.basename(t)===".cursor")return t;let r=Oi.default.join(t,".cursor");try{if(vp.default.statSync(r).isDirectory())return Ye(r)}catch{return null}return null},_p=e=>{let t=zA(e.projectPath);if(t===null)return null;let r=Ao(t);if(r===null)return null;let n=e.reveal??{scanRoots:[],sets:[]},s=[...n.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:n.scanRoots,sets:s}}});var wp,KA,_o,Ep,Wp=m(()=>{"use strict";wp=g(require("node:path"));Pi();Tr();Ti();KA=5,_o=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Ep=e=>{let t=Ye(e.scanRoot.trim());if(t===null)return _o(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],n=!1;for(let s of Sp(t,KA,e.shouldAbort)){if(e.shouldAbort()){n=!0;break}let i=Ye(s);if(i===null)continue;let a=yo(i);_o(e.response,"folder",{cursorDir:i,groupName:a,repoPath:wp.default.dirname(i)});let c=Ao(i);c!==null&&(r.push(c),_o(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(n=!0);let o={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return _o(e.response,n?"stopped":"done",{setCount:o.sets.length,stopped:n}),o}});var xp,kp,Lp=m(()=>{"use strict";xp=g(require("node:path")),kp=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let n=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:xp.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:n,selected:r.selected??!0}})}))})});var $,Rp,Mi,qA,Cp,Ip,Hi,Pr,Tp=m(()=>{"use strict";$=g(require("node:fs")),Rp=g(require("node:os")),Mi=g(require("node:path"));is();Tr();Lp();qA=e=>{if(!$.default.existsSync(e))return null;try{let t=JSON.parse($.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Cp=e=>{let t=e.hostname??Rp.default.hostname(),r=qA(e.layout.harnessManifestPath),n=0,o=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let p=vo(u.sourcePath);if(p===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let h=$.default.readFileSync(p,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:h,setSlugs:[i.slug]})}let d=wn({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)o.add(u);for(let u of d.files)s.push(u),n+=1}if(r===null||n===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{$.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of o)$.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Mi.default.join(e.layout.harnessRootDir,i.relativePath);$.default.mkdirSync(Mi.default.dirname(a),{recursive:!0}),$.default.writeFileSync(a,i.content)}return $.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`),{ok:!0,writtenItemCount:n,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Ip="reveal-cache.json",Hi=(e,t)=>{$.default.mkdirSync(e.harnessRootDir,{recursive:!0}),$.default.writeFileSync(`${e.harnessRootDir}/${Ip}`,`${JSON.stringify(t,null,2)}
`)},Pr=e=>{let t=`${e.harnessRootDir}/${Ip}`;if(!$.default.existsSync(t))return null;try{let r=JSON.parse($.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return kp(r)}catch{return null}return null}});var Pp,Np=m(()=>{"use strict";Pp=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Tt,JA,Di,Op=m(()=>{"use strict";Tt=g(require("node:fs")),JA=256e3,Di=(e,t=JA)=>{if(!Tt.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Tt.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let n=r.size;if(n===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let o=Math.max(0,n-t),s=n-o,i=Buffer.alloc(s),a=Tt.default.openSync(e,"r");try{Tt.default.readSync(a,i,0,s,o)}finally{Tt.default.closeSync(a)}let c=i.toString("utf8");if(o>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:o>0,byteSize:n}}});var Mp,Hp=m(()=>{"use strict";Mp="https://www.agentwitch.com"});var bo,Fi=m(()=>{"use strict";Hp();Yt();it();bo=e=>{let t=se(),r=t!==null?K(t.wsUrl):null;if(r!==null&&r.length>0)return r;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Mp}});var Dp,Fp=m(()=>{"use strict";Oe();lt();Fi();Dp=async e=>{let t=U(e.installDir),r=t?.bundleVersion??null,n=bo(t);try{let o=await zo(n);return o===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:sn(r,o),localBundleVersion:r,remoteBundleVersion:o,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var Up,Bp=m(()=>{"use strict";Up=e=>!e});var $p,jp,Gp=m(()=>{"use strict";Ei();$p=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},jp=async()=>{let e=await uo({force:!0});if(e.ok)return{ok:!0,message:$p(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:$p(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(lt(),un)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var zp,Nr,Kp,Bi,Vp,N,$i,P,Re,Ui,YA,XA,qp,Jp,Yp=m(()=>{"use strict";zp=g(require("node:http")),Nr=g(require("node:fs")),Kp=g(require("node:path"));Tm();co();ki();tr();gt();fo();$m();Gm();qm();Ym();tp();cp();up();pp();bp();Tr();Wp();Tp();Np();Op();Oe();Fi();Fp();Bp();Gp();xi();Bi=e=>Bm(e)??"never",Vp=48e3,N=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$i={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},P=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...$i}),e.end(JSON.stringify(r))},Re=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},Ui=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},YA=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=e.stale?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-online">Fresh</span>',n=e.status.wakeError?`<div class="alert-error">${N(e.status.wakeError)}</div>`:"",o=Up(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive" onsubmit="fetch('/api/revive',{method:'POST'});return false;">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this Mac.</p>
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${go(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${N(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${N(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${N(Bi(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${N(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${o}
    </section>`},XA=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":null},qp=e=>{let t=Kp.default.join(e.layout.installDir,"link-code.txt"),r=()=>U(e.layout.installDir),n=()=>{let u=r();return{installBundleVersion:Pp(u),installBundleUpdatedAt:u?.updatedAt??null,installVersion:u}},o=async u=>{let p=u.installVersion??r(),h=await i(),S=zm(h),y=Km(u.updateFlash??null);return ep({title:u.title,activePath:u.activePath,body:u.body,cloudAppOrigin:bo(p),prependBody:`${y}${S}`,headerUpdateButtonHtml:Vm(h)})},s=null,i=async()=>{let u=Date.now();if(s!==null&&u-s.cachedAtMs<6e4)return s.offer;let p=await Dp(e.layout);return s={cachedAtMs:u,offer:p},p},a=()=>{s=null},c=()=>{if(Nr.default.existsSync(t))return Nr.default.readFileSync(t,"utf8").trim();let u=Math.random().toString(36).slice(2,8).toUpperCase();return Nr.default.writeFileSync(t,u,"utf8"),u},d=zp.default.createServer((u,p)=>{(async()=>{let h=u.url?.split("?")[0]??"/",S=u.method??"GET";if(S==="OPTIONS"){p.writeHead(204,$i),p.end();return}if(S==="GET"&&h==="/health"){let y=e.controllers.getStatus(),l=n();P(p,200,{ok:!0,...y,installBundleVersion:l.installBundleVersion,installBundleUpdatedAt:l.installBundleUpdatedAt});return}if(S==="GET"&&h==="/api/status"){let y=n();P(p,200,{...e.controllers.getStatus(),linkCode:c(),installBundleVersion:y.installBundleVersion,installBundleUpdatedAt:y.installBundleUpdatedAt});return}if(S==="GET"&&h==="/api/traffic"){P(p,200,{entries:lo(e.layout)});return}if(S==="DELETE"&&h==="/api/traffic"){dm(e.layout),P(p,200,{ok:!0});return}if(S==="GET"&&h==="/api/knowledge"){let l=new URL(u.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(l.length>0){let A=await kr({layout:e.layout,query:l,limit:20});P(p,200,{chunks:A,query:l});return}P(p,200,{chunks:xr(e.layout).slice(-50).reverse()});return}if(S==="POST"&&h==="/api/revive"){e.controllers.reviveWebSocket(),P(p,200,{ok:!0});return}if(S==="GET"&&h==="/api/update-status"){let y=await i();P(p,200,{ok:!0,...y});return}if(S==="POST"&&h==="/api/update"){a();let y=await jp();a(),p.writeHead(303,{Location:y.ok?"/?update=ok":"/?update=failed"}),p.end();return}if(S==="GET"&&h==="/"){let y=e.controllers.getStatus(),l=n(),A=Pr(e.layout),_=Di(e.layout.errorLogPath);Re(p,await o({title:"Home",activePath:"/",installVersion:l.installVersion,updateFlash:XA(u.url??void 0),body:Jm({wsConnected:y.wsConnected,lastHeartbeatAt:y.lastHeartbeatAt,harnessSetCount:A?.sets.length??0,knowledgeChunkCount:xr(e.layout).length,trafficEntryCount:lo(e.layout).length,wakeError:y.wakeError,errorLogByteSize:_.byteSize,errorLogExists:_.exists})}));return}if(S==="GET"&&h==="/errors"){let y=n(),l=Di(e.layout.errorLogPath);Re(p,await o({title:"Errors",activePath:"/errors",installVersion:y.installVersion,body:jm({errorLogPath:e.layout.errorLogPath,content:l.content,exists:l.exists,truncated:l.truncated,byteSize:l.byteSize})}));return}if(S==="GET"&&h==="/status"){let y=e.controllers.getStatus(),l=Z(e.layout),A=ae(l,ie),_=n();Re(p,await o({title:"Status",activePath:"/status",installVersion:_.installVersion,body:YA({status:y,stale:A,linkCode:c(),installBundleVersion:_.installBundleVersion,installBundleUpdatedAt:_.installBundleUpdatedAt})}));return}if(S==="GET"&&h==="/traffic"){let y=lo(e.layout),l=n(),A=y.map(f=>`<tr><td title="${N(f.at)}">${N(Bi(f.at))}</td><td>${N(f.direction)}</td><td><code>${N(f.type)}</code></td><td>${N(f.summary)}</td><td>${N(f.action??"")}</td></tr>`).join(""),_=y.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${A}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>';Re(p,await o({title:"Traffic",activePath:"/traffic",installVersion:l.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${_}
            </section>`}));return}if(S==="GET"&&h==="/harness"){let y=new URL(u.url??"/",`http://127.0.0.1:${43347}`),l=n(),A=Pr(e.layout),_=y.searchParams.get("submitted")==="1"?y.searchParams.get("syncFailed")==="1"?`Local harness updated (${y.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:y.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${y.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":y.searchParams.get("added")==="1"?"Project added to reveal list.":y.searchParams.get("stopped")==="1"?`Reveal stopped. ${A?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:y.searchParams.get("revealed")==="1"?`Reveal found ${A?.sets.length??0} set(s).`:null,f=A?.scanRoots[0]??Ci();Re(p,await o({title:"Harness",activePath:"/harness",installVersion:l.installVersion,body:ho({scanFolder:f,reveal:A,flashMessage:_})}));return}if(S==="POST"&&h==="/api/harness/pick-folder"){let y=mp();if(y===null){P(p,200,{cancelled:!0});return}P(p,200,{path:y});return}if(S==="GET"&&h==="/api/harness/file-content"){let l=new URL(u.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",A=vo(l);if(A===null){P(p,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let _=Nr.default.readFileSync(A,"utf8"),f=_.length>Vp?`${_.slice(0,Vp)}
\u2026 (truncated)`:_;P(p,200,{content:f})}catch{P(p,500,{errorMessage:"Could not read file."})}return}if(S==="POST"&&h==="/api/harness/reveal/add-project"){let y=await Ui(u),l="";try{let f=JSON.parse(y);typeof f=="object"&&f!==null&&typeof f.projectPath=="string"&&(l=f.projectPath.trim())}catch{P(p,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(l.length===0){P(p,400,{ok:!1,errorMessage:"projectPath is required."});return}let A=Pr(e.layout),_=_p({reveal:A,projectPath:l});if(_===null||_.sets.length===0){P(p,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Hi(e.layout,_),P(p,200,{ok:!0,setCount:_.sets.length});return}if(S==="GET"&&h==="/api/harness/reveal/stream"){let l=new URL(u.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(l.length===0){P(p,400,{errorMessage:"Choose a folder to scan first."});return}let A=!1;u.on("close",()=>{A=!0}),p.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...$i});let _=Ep({scanRoot:l,response:p,shouldAbort:()=>A});Hi(e.layout,_),p.end();return}if(S==="POST"&&h==="/harness/reveal"){p.writeHead(410,{"Content-Type":"text/plain"}),p.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(S==="POST"&&h==="/harness/submit"){let y=Pr(e.layout);if(y===null){let R=n();Re(p,await o({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:ho({scanFolder:Ci(),reveal:null,flashError:"Run reveal before submit."})}));return}let l=await Ui(u),A=new URLSearchParams(l),_=lp(A,y),f=Cp({layout:e.layout,sets:_});if(!f.ok){let R=n();Re(p,await o({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:ho({scanFolder:y.scanRoots[0]??"",reveal:y,flashError:f.errorMessage??"Submit failed."})}));return}let v=A.get("syncToCloud")==="on",w="";v&&(w=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1"),p.writeHead(303,{Location:`/harness?submitted=1&count=${f.writtenItemCount??0}${w}`}),p.end();return}if(S==="GET"&&h==="/knowledge"){let l=new URL(u.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",A=n(),f=(l.length>0?await kr({layout:e.layout,query:l,limit:20}):xr(e.layout).slice(-50).reverse()).map(v=>`<article class="card"><div class="muted" title="${N(v.createdAt)}">${N(Bi(v.createdAt))}${v.source?` \xB7 ${N(v.source)}`:""}</div><pre>${N(v.text)}</pre></article>`).join("");Re(p,await o({title:"Knowledge",activePath:"/knowledge",installVersion:A.installVersion,body:`<section class="card">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this Mac.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${N(l)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
            </section>${f||'<p class="empty">No chunks yet. Finish an agent turn to index.</p>'}`}));return}S==="POST"&&await Ui(u),p.writeHead(404),p.end("Not found")})().catch(h=>{console.error("[agent-witch-local-app]",h),p.writeHead(500),p.end("Internal error")})});return d.on("error",u=>{if(u.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",u)}),d.listen(43347,"127.0.0.1",()=>{console.log(`[agent-witch] Local app ${Im}`)}),d},Jp=e=>Wi(e).publicKeyRaw});var Or,ji,Xp,Zp,Qp,eg,tg=m(()=>{"use strict";Or=g(require("node:fs")),ji=g(require("node:path"));ot();Kn();Xp=(e,t)=>ji.default.join(Wt(t).memoryDirPath,Zr),Zp=(e,t)=>{let r=Xp(e,t);if(!Or.default.existsSync(r))return[];let n=Or.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),o=[];for(let s of n)try{o.push(JSON.parse(s))}catch{}return o},Qp=e=>{let t=Xp(e.layout,e.projectFolderPath);Or.default.mkdirSync(ji.default.dirname(t),{recursive:!0}),Or.default.appendFileSync(t,`${JSON.stringify(e.entry)}
`,"utf8")},eg=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((o,s)=>{let i=o.prompt.length>240?`${o.prompt.slice(0,240)}\u2026`:o.prompt,a=o.output.length>400?`${o.output.slice(0,400)}\u2026`:o.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var rg,ZA,QA,eS,ng,og=m(()=>{"use strict";rg=g(require("node:os"));x();ZA="Default",QA=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),eS=e=>{let t=rg.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},ng=()=>{let e=W(),t=ia(e),r=QA(ZA);return`${eS(t)}/${r.length>0?r:"project"}`}});var sg,tS,ig,ag=m(()=>{"use strict";sg=require("node:child_process");oo();ut();tS=async(e,t)=>{let n={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(o=>{let s=(0,sg.spawn)(n,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{o(!1)}),s.on("close",i=>{o(i===0)})})},ig=async e=>{if(!M(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};try{await ke(e.layout.installDir,e.writerAgent)}catch(r){let n=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:n}}let t=await tS(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var lg,cg=m(()=>{"use strict";lg=(e,t)=>{let r=t.estimateSeconds!==null?`Recorded estimate: ${t.estimateSeconds} seconds.`:"A time estimate was recorded locally.";return[e.trim(),"","---",["Agent Witch already saved a local job report with your time estimate.",r,`Report summary: ${t.estimateSummary}`,"Proceed with the task immediately.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.","Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly."].join(`
`)].join(`
`)}});var ug,dg,mg=m(()=>{"use strict";ug=require("node:crypto"),dg=()=>(0,ug.randomUUID)()});var Mr,rS,pg,wo=m(()=>{"use strict";Mr="[[WORKING_ESTIMATE]]",rS=["Put this marker on its own line:",Mr,"On the next line, emit only an integer number of seconds (for example: 120).","Then add one short plain-language sentence explaining the estimate.","Do not use [[AWAITING_INPUT]], [[PROGRESS]], or [[NEXT_ACTIONS]]."].join(`
`),pg=e=>["Estimate how long the following task will take on this Mac.","Do not start the task yet. Do not ask the operator to confirm.","",rS,"","Task to estimate:",e.trim()].join(`
`)});var gg,fg=m(()=>{"use strict";gg=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var hg,yg=m(()=>{"use strict";hg=e=>e===null||e<=0?"Estimate saved locally. Starting work on your Mac\u2026":e<60?`Estimated ~${e}s. Starting work on your Mac\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your Mac\u2026`});var nS,Ag,Sg=m(()=>{"use strict";wo();nS=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Ag=e=>{if(!e.includes(Mr))return null;let t=null;for(let r of e.matchAll(nS)){let n=Number.parseInt(r[1]??"",10);Number.isFinite(n)&&n>0&&(t=n)}return t}});var vg,_g=m(()=>{"use strict";es();wo();fg();yg();Sg();Ft();vg=async e=>{let t=gg(e.wrappedPrompt),r=pg(t),n=await An(e.config,e.writerAgent,r),o=Ag(n.output),s=hg(o);return Dt({reportKey:e.reportKey,agentRunId:e.agentRunId,status:X.IN_PROGRESS,userSummary:s,...n.output.trim().length>0?{details:n.output.trim()}:{},...o!==null?{estimateSeconds:o}:{}}),{estimateSeconds:o,estimateSummary:s,estimateOutput:n.output}}});var bg={};Ie(bg,{buildContinuationPromptWithContext:()=>iS});var oS,sS,iS,wg=m(()=>{"use strict";oS=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,sS=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),iS=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),n=sS(e.priorOutput),o=e.maxContextChars??12e3;return r.length===0&&n.length===0?t:["Continue the same task on this Mac using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,n.length>0?`Assistant: ${oS(n,o)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var Eg={};Ie(Eg,{readHarnessExportSets:()=>lS});var Hr,Gi,Eo,aS,lS,Wg=m(()=>{"use strict";Hr=g(require("node:fs")),Gi=g(require("node:path"));x();Eo=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aS=e=>{if(!Hr.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Hr.default.readFileSync(e.harnessManifestPath,"utf8"));if(Eo(t))return t}catch{return null}return null},lS=(e,t)=>{let r=W(t),n=aS(r);if(n===null)return[];let o=Eo(n.sets)?n.sets:{},s=[];for(let i of e){let a=o[i];if(!Eo(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!Eo(u))continue;let p=typeof u.path=="string"?u.path:void 0,h=typeof u.id=="string"?u.id:"",S=typeof u.kind=="string"?u.kind:"",y=typeof u.title=="string"?u.title:"";if(p===void 0||h.length===0||S.length===0||y.length===0)continue;let l=p.startsWith("shared/")?Gi.default.join(r.harnessRootDir,p):Gi.default.join(r.harnessSetsDir,i,p);Hr.default.existsSync(l)&&d.push({id:h,kind:S,title:y,content:Hr.default.readFileSync(l,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var Tg={};Ie(Tg,{startAgentWitchClient:()=>wS});var Ki,Dr,Pt,ES,cS,uS,dS,mS,pS,xg,gS,kg,Lg,Rg,Vi,L,Cg,I,zi,fS,Wo,hS,yS,AS,SS,vS,_S,bS,Ig,wS,Pg=m(()=>{"use strict";Ki=require("node:child_process"),Dr=g(require("node:fs")),Pt=g(require("node:os"));_u();Yr();jo();Do();ti();Pe();Lu();Iu();rd();mt();x();lm();hn();to();Ai();oo();ut();ui();tr();gt();eo();um();fm();Oe();ym();vm();xi();co();Yp();ki();tg();it();og();oi();ag();Uo();on();Ze();en();cg();mg();wo();Ft();_g();ES={},cS="ws://localhost:3000/api/agent-witch/ws",uS="claude",dS="codex",mS="cursor",pS="agy",xg=3e4,gS=3e4,kg=new Map,Lg=new Map,Rg=new Map,Vi=e=>{let t=e?.trim()??"";return t.length>0?t:ng()},L=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cg=e=>{let t=W(e);if(!Dr.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Dr.default.readFileSync(t.configPath,"utf8"));if(!L(r))throw new Error("Config must be a JSON object.");let n=process.env.AGENT_WITCH_WS_URL?.trim()??"",o=typeof r.wsUrl=="string"?r.wsUrl.trim():"",s=n.length>0?n:o.length>0?o:cS,i=typeof r.workspace=="string"&&r.workspace.length>0?r.workspace:process.cwd(),a=typeof r.claudeCommand=="string"&&r.claudeCommand.length>0?r.claudeCommand:process.env.CLAUDE_COMMAND??uS,c=typeof r.codexCommand=="string"&&r.codexCommand.length>0?r.codexCommand:process.env.CODEX_COMMAND??dS,d=typeof r.cursorCommand=="string"&&r.cursorCommand.length>0?r.cursorCommand:process.env.CURSOR_COMMAND??mS,u=typeof r.antigravityCommand=="string"&&r.antigravityCommand.length>0?r.antigravityCommand:process.env.ANTIGRAVITY_COMMAND??pS,p=typeof r.pairingToken=="string"&&r.pairingToken.length>0?r.pairingToken.trim():"",h=typeof r.email=="string"&&r.email.trim().length>0?r.email.trim().toLowerCase():t.profileEmail;return p.length===0?(console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null):{email:h,wsUrl:s,workspace:i,claudeCommand:a,codexCommand:c,cursorCommand:d,antigravityCommand:u,pairingToken:p,layout:t}}catch(r){let n=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${n}`),null}},I=(e,t,r)=>{e.readyState===dr.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&Je(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}))},zi=e=>e,fS=e=>{if(!Dr.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Dr.default.readFileSync(e.harnessManifestPath,"utf8"));if(L(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Wo=(e,t)=>{let r=fS(t);r!==null&&I(e,{type:"harness.manifest.report",payload:{hostname:Pt.default.hostname(),manifest:r}})},hS=async(e,t,r,n,o,s,i=!1,a,c,d,u)=>{if(!M(t)){I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let p=so(t)&&!Kd(t);if(p){try{await ke(e.layout.installDir,t)}catch(v){let w=v instanceof Error?v.message:String(v);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}hi(t)}else if(!so(t))try{await ke(e.layout.installDir,t)}catch(v){let w=v instanceof Error?v.message:String(v);I(o,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:n});return}let h=i&&zd(t)&&qd(t)?"continue":"first",S=r;if(i&&h==="first"&&typeof c=="string"&&c.length>0){let v=Zn(e.layout,c);if(v!==null){let{buildContinuationPromptWithContext:w}=await Promise.resolve().then(()=>(wg(),bg));S=w({priorPrompt:v.prompt,priorOutput:v.resultOutput??"",userMessage:r})}}let y=Vi(d);hr({projectFolderPath:y});let l=await kr({layout:e.layout,query:S,limit:5,projectFolderPath:y}),A=Zp(e.layout,y),_=`${eg(A)}${Mm(l)}${S}`,f=u?.trim()??(s!==void 0&&y.trim().length>0?dg():void 0);if(s!==void 0&&f!==void 0&&f.length>0&&y.trim().length>0){rn({reportKey:f,agentRunId:s,userSummary:"Estimating how long this will take\u2026"});let v=await vg({config:{workspace:e.workspace,claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand},writerAgent:t,wrappedPrompt:_,reportKey:f,agentRunId:s});if(v.estimateSeconds!==null){let w=`${Mr}
${v.estimateSeconds}
`;ze(s)?I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:w},requestId:n}):Lt(s,w)}_=lg(_,v),_=Ra(_,{agentRunId:s,reportKey:f,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}_i(e,t,_,n,zi(o),s,{sessionTurn:h},a,y,f),p&&s!==void 0&&I(o,{type:"terminal.stream.chunk",payload:{runId:s,chunk:Yd(t)},requestId:n})},yS=async(e,t,r,n,o)=>{let s=(i,a)=>{I(o,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:n})};try{let i="",a=await Xd({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,commands:we({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,I(o,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:n})}}),c=M(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?io(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},AS=(e,t,r)=>new Promise(n=>{if(!M(t)){n({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let o=ct(t,r,we({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(o===null){n({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,Ki.spawn)(o.command,[...o.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{n({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{n({exitCode:-1,output:a.message})})}),SS=async(e,t,r,n)=>{let o=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(I(n,{type:"harness.request.ack",payload:{writerAgent:o,status:"dispatching"},requestId:r}),s.length===0){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!M(o)){I(n,{type:"harness.request.result",payload:{success:!1,writerAgent:o,errorMessage:`Unsupported writer agent: ${o}`},requestId:r});return}let i=await(async()=>{try{await ke(e.layout.installDir,o)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${o}: ${c}`}}return AS(e,o,s)})();I(n,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:o,exitCode:i.exitCode,output:i.output},requestId:r}),Wo(n,e.layout)},vS=e=>{let t=1e3*2**e;return Math.min(gS,t)},_S=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=l=>{t.restartInFlight||(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${l})\u2026`),t.wakeError=`restart:${l}`,cm().then(A=>{if(A.ok){console.log("[agent-witch] Local restart completed.");return}if(!A.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",A.payload)}).finally(()=>{t.restartInFlight=!1}))},n=(l,A="system.ack")=>{t.selfUpdateInFlight||(t.selfUpdateInFlight=!0,gm({layout:e.layout,remoteBundleVersion:l,trigger:A}).finally(()=>{t.selfUpdateInFlight=!1}))},o=()=>{let l=Z(e.layout);l!==null&&ae(l,ie)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,a(),c(),S())},s=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},i=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},a=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},c=()=>{t.socket!==void 0&&(t.socket.removeAllListeners(),(t.socket.readyState===dr.OPEN||t.socket.readyState===dr.CONNECTING)&&t.socket.close(),t.socket=void 0,t.wsConnected=!1)},d=()=>{i(),t.localHealthTimer=setInterval(o,xg)},u=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let l=vS(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${l}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,S()},l)},p=l=>{s();let A=()=>{let _=U(e.layout.installDir)?.bundleVersion??null,f=q();I(l,{type:"agent.heartbeat",payload:{hostname:Pt.default.hostname(),macOsUsername:Pt.default.userInfo().username,wakeError:t.wakeError,wakePort:f,...e.email!==null?{email:e.email}:{},..._!==null?{installBundleVersion:_}:{}}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};A(),t.heartbeatTimer=setInterval(A,xg)},h=(l,A)=>{if(typeof l.type!="string")return;Je(e.layout,{direction:"in",type:l.type,summary:"inbound WS frame"});let _=typeof l.requestId=="string"?l.requestId:void 0;if(l.type==="device.auth.attestation"&&L(l.payload)){let f=typeof l.payload.serverPublicKey=="string"?l.payload.serverPublicKey:"",v=typeof l.payload.origin=="string"?l.payload.origin:"",w=typeof l.payload.devicePublicKey=="string"?l.payload.devicePublicKey:"",R=typeof l.payload.challenge=="string"?l.payload.challenge:"",j=typeof l.payload.serverAttestation=="string"?l.payload.serverAttestation:"";if(!Cm({serverPublicKey:f,origin:v,devicePublicKey:w,challenge:R,serverAttestation:j})){t.wakeError="Server attestation verification failed",Je(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(l.type==="writer.ensure"&&L(l.payload)){let f=typeof l.payload.writerAgent=="string"?l.payload.writerAgent:"";Je(e.layout,{direction:"local",type:"writer.ensure",summary:f,action:"ensure-writer"}),ig({layout:e.layout,writerAgent:f,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(v=>{I(A,{type:"writer.status",payload:v},e.layout)})}if(l.type==="install.bundle.update"&&L(l.payload)){let f=typeof l.payload.bundleVersion=="string"?l.payload.bundleVersion.trim():"";f.length>0&&n(f,"install.bundle.update")}if(l.type==="system.ack"){us(e.layout,{wsUrl:e.wsUrl});let f=L(l.payload)?l.payload:null,v=hm(f);v!==null&&n(v)}if(l.type==="device.restart"&&r("cloud-device-restart"),l.type==="automations.sync"&&L(l.payload)&&Am(l.payload),l.type==="automations.run"&&L(l.payload)&&Sm(l.payload),l.type==="terminal.stream.accepted"&&L(l.payload)){let f=typeof l.payload.runId=="string"?l.payload.runId:"";if(f.length>0){let v=Ed(f);for(let w of v)I(A,{type:"terminal.stream.chunk",payload:{runId:f,chunk:w},requestId:_})}}if(l.type==="agent.agentRun.list"&&I(A,{type:"dashboard.agentRun.list.result",payload:{runs:fd(e.layout)},requestId:_}),l.type==="agent.agentRun.get"&&L(l.payload)){let f=typeof l.payload.runId=="string"?l.payload.runId:"",v=f.length>0?Zn(e.layout,f):null;I(A,{type:"dashboard.agentRun.get.result",payload:{run:v},requestId:_})}if(l.type==="command.claude.run"&&L(l.payload)){let f=l.payload.prompt,v=typeof l.payload.writerAgent=="string"&&M(l.payload.writerAgent)?l.payload.writerAgent:"claude-cli",w=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,R=l.payload.sessionContinuation===!0,j=typeof l.payload.sourceRunId=="string"?l.payload.sourceRunId:void 0,he=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:void 0,Xe=Vi(typeof l.payload.projectFolderPath=="string"?l.payload.projectFolderPath:void 0),Nt=typeof l.payload.reportKey=="string"?l.payload.reportKey:void 0;typeof f=="string"&&f.trim().length>0&&(console.log(`[agent-witch] Running ${v} task (${R?"continue":"first"})\u2026`),w!==void 0&&he!==void 0&&kg.set(w,he),w!==void 0&&(Lg.set(w,Xe),Rg.set(w,f.trim()),hr({projectFolderPath:Xe})),hS(e,v,f.trim(),_,A,w,R,he,j,Xe,Nt))}if(l.type==="shell.session.open"&&L(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",v=typeof l.payload.cols=="number"?l.payload.cols:120,w=typeof l.payload.rows=="number"?l.payload.rows:32;f.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),Od({shellSessionId:f,cwd:e.workspace,cols:v,rows:w,send:R=>{I(A,R)},requestId:_}))}if(l.type==="shell.session.close"&&L(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"";f.length>0&&_r(f,v=>{I(A,v)},_)}if(l.type==="shell.input"&&L(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",v=typeof l.payload.data=="string"?l.payload.data:"";f.length>0&&v.length>0&&Td(f,v)}if(l.type==="shell.resize"&&L(l.payload)){let f=typeof l.payload.shellSessionId=="string"?l.payload.shellSessionId:"",v=typeof l.payload.cols=="number"?l.payload.cols:0,w=typeof l.payload.rows=="number"?l.payload.rows:0;f.length>0&&v>0&&w>0&&Pd(f,v,w)}if(l.type==="command.writer.session.end"&&L(l.payload)){let f=l.payload.writerAgent;typeof f=="string"&&M(f)&&Jd(f)}if(l.type==="command.writer.session.start"&&L(l.payload)){let f=l.payload.writerAgent,v=typeof l.payload.writerSessionId=="string"?l.payload.writerSessionId:"";typeof f=="string"&&M(f)&&v.length>0&&(console.log(`[agent-witch] Starting ${f} session\u2026`),yS(e,f,v,_,A))}if(l.type==="command.claude.stop"&&L(l.payload)){let f=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"";f.length>0&&(console.log(`[agent-witch] Stopping run ${f}\u2026`),am(e,zi(A),f,_))}if(l.type==="command.claude.input_respond"&&L(l.payload)){let f=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:"",v=typeof l.payload.response=="string"?l.payload.response.trim():"",w=typeof l.payload.originalPrompt=="string"?l.payload.originalPrompt:"",R=typeof l.payload.partialOutput=="string"?l.payload.partialOutput:"",j=typeof l.payload.question=="string"?l.payload.question:"";f.length>0&&v.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),sm(e,{agentRunId:f,originalPrompt:w,partialOutput:R,question:j,response:v,shellSessionId:kg.get(f)},_,zi(A)))}if(l.type==="dispatch.approval.required"&&L(l.payload)){let f=typeof l.payload.requesterEmail=="string"?l.payload.requesterEmail:"A teammate",v=typeof l.payload.prompt=="string"?l.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${f}: ${v}`),process.platform==="darwin"&&(0,Ki.spawn)("osascript",["-e",`display notification "${v.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${f.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(l.type==="harness.request"&&L(l.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),SS(e,l.payload,_,A)),l.type==="harness.export.request"&&L(l.payload)){let f=typeof l.payload.borrowerUserId=="string"?l.payload.borrowerUserId:"",v=typeof l.payload.targetDeviceId=="string"?l.payload.targetDeviceId:void 0,w=Array.isArray(l.payload.setSlugs)?l.payload.setSlugs.filter(R=>typeof R=="string"):[];f.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:R}=await Promise.resolve().then(()=>(Wg(),Eg)),j=R(w,e.email);I(A,{type:"harness.export.result",payload:{success:j.length>0,borrowerUserId:f,...v!==void 0?{targetDeviceId:v}:{},sets:j,errorMessage:j.length>0?void 0:"No readable harness sets were found on this machine."},requestId:_})})()}if(l.type==="harness.manifest.request"&&Wo(A,e.layout),l.type==="command.claude.result"&&L(l.payload)&&typeof l.payload.output=="string"&&l.payload.output.trim().length>0){let f=typeof l.payload.agentRunId=="string"?l.payload.agentRunId:void 0,v=Vi(f!==void 0?Lg.get(f):void 0),w=f!==void 0?Rg.get(f)??"":"";Om({layout:e.layout,text:l.payload.output,source:f??"command.claude.result",projectFolderPath:v}),w.trim().length>0&&Qp({layout:e.layout,projectFolderPath:v,entry:{id:`${Date.now()}-${f??"run"}`,...f!==void 0?{agentRunId:f}:{},prompt:w,output:l.payload.output,createdAt:new Date().toISOString()}})}},S=()=>{if(t.stopped)return;a(),c();let l=new dr(e.wsUrl);t.socket=l,l.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),us(e.layout,{wsUrl:e.wsUrl}),tm(fn({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),rm(e.layout);let A=K(e.wsUrl)??"http://localhost:3000",_=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),f=Rm({layout:e.layout,origin:A,..._!==void 0&&_.length>0?{claimToken:_}:{}});I(l,{type:"agent.register",payload:{role:"agent",hostname:Pt.default.hostname(),macOsUsername:Pt.default.userInfo().username,pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...f}},e.layout),Wo(l,e.layout),im(e,l),p(l)}),l.on("message",A=>{let _=typeof A=="string"?A:A.toString("utf8");try{let f=JSON.parse(_);if(!L(f))return;h(f,l)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),l.on("close",()=>{s(),t.socket=void 0,t.wsConnected=!1,t.reconnectAttempt+=1,console.log("[agent-witch] Disconnected from server."),u()}),l.on("error",A=>{t.wakeError=A.message,console.error(`[agent-witch] Socket error: ${A.message}`)})};return{connect:S,startLocalHealthCheck:d,stop:()=>{t.stopped=!0,s(),i(),a(),c()},getStatus:()=>({wsConnected:t.wsConnected,lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Jp(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,S()},reportHarnessManifestIfConnected:()=>{let l=t.socket;return!t.wsConnected||l===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:(Wo(l,e.layout),{ok:!0})}}},bS=async()=>{let e=()=>{let r=ua();if(r.length===0){let n=Cg(null);return n===null?[]:[n]}return r.flatMap(n=>{let o=Cg(n);return o===null?[]:[o]})},t=e();return t.length>0?t:(console.error("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let n=()=>{let o=e();if(o.length>0){r(o);return}setTimeout(n,1e4)};n()}))},Ig=async()=>{nt("agent-witch"),Wu().ok||(process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 exiting.
`),process.exit(0));let t=b();Cu(t);let r=ku({installDir:t});r.length>0&&console.log(`[agent-witch] Stopped ${r.length} sibling process(es): ${r.join(", ")}`),an();let n=await bS(),o=n.map(u=>_S(u)),s=o[0];s===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ei(),process.exit(0));let i=()=>{for(let u of o)u.reviveWebSocket()},a=()=>{},c=await td({reconnectWebSockets:i,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),a()}});qp({layout:n[0].layout,controllers:{getStatus:s.getStatus,reviveWebSocket:i,reportHarnessManifestIfConnected:s.reportHarnessManifestIfConnected}});for(let u of o)u.startLocalHealthCheck(),u.connect();console.log(`[agent-witch] Bridging ${o.length} account profile(s) in one process.`);let d=Jr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),qr(),a()});a=()=>{d(),c.stop(),ei(),console.log("[agent-witch] Shutting down.");for(let u of o)u.stop();process.exit(0)},process.on("SIGINT",()=>{a()}),process.on("SIGTERM",()=>{a()})},wS=Ig;if(st(ES.url)&&!Y()){let e=process.argv.indexOf("report");e>=0&&process.exit(nn(process.argv.slice(e))),Ig()}});Yr();Uo();on();var Ha="20.x",Da="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var df=e=>[`Node.js ${Ha} or newer is required (found ${e}).`,Da].join(" "),Fa=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${df(process.version)}
`),process.exit(1))};var LS={},WS=async()=>{nt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(lt(),un)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},xS=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(Rs(),hc)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(n=>!n.ok).map(n=>n.errorMessage??n.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},kS=async()=>{if(!st(LS.url))return;Fa();let e=process.argv.indexOf("report");e>=0&&process.exit(nn(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await WS();return}if(t==="wake"){await xS();return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(Pg(),Tg));await r()};kS();
