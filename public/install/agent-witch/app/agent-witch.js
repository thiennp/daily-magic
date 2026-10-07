#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var cQ=Object.create;var Gb=Object.defineProperty;var dQ=Object.getOwnPropertyDescriptor;var uQ=Object.getOwnPropertyNames;var pQ=Object.getPrototypeOf,mQ=Object.prototype.hasOwnProperty;var a=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var w=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Et=(e,t)=>{for(var r in t)Gb(e,r,{get:t[r],enumerable:!0})},gQ=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of uQ(t))!mQ.call(e,n)&&n!==r&&Gb(e,n,{get:()=>t[n],enumerable:!(o=dQ(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?cQ(pQ(e)):{},gQ(t||!e||!e.__esModule?Gb(r,"default",{value:e,enumerable:!0}):r,e));var ec,oj,nj,tc,Kb,Fhe,sj,Un,Lr,ao,qm,Jm,Ii,vi,ct,Vb,Ym,Xm,Zm,rc,rr,Bn,Gn,oc,Zo,qb,ij,Ue=a(()=>{"use strict";ec={production:".agent-witch",localhost:".local-agent-witch"},oj={production:47892,localhost:47893},nj={production:"com.agent-witch",localhost:"com.local-agent-witch"},tc={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Kb="app",Fhe=`${Kb}/agent-witch.js`,sj=`${Kb}/command`,Un={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},Lr=ec.production,ao=ec.localhost,qm=oj.production,Jm=oj.localhost,Ii=nj.production,vi=nj.localhost,ct="profiles",Vb=tc.activeProfile,Ym="harness",Xm="sets",Zm="manifest.json",rc=Un.projectsDir,rr=Un.logsDir,Bn="agent-witch.log",Gn="agent-witch.error.log",oc=Un.reportsDir,Zo=Un.deviceKeypairJson,qb=Kb,ij="agent-witch.js"});var aj=a(()=>{"use strict";Ue()});var lj,Qo,Kn,nc=a(()=>{"use strict";lj=m(require("node:path"));Ue();Qo=e=>lj.default.basename(e)===ao,Kn=e=>Qo(e)?vi:Ii});var Ir,xi=a(()=>{"use strict";Ir="agent-witch.service"});var wt,Qm,cj=a(()=>{"use strict";wt="https://www.agentwitch.com",Qm="wss://www.agentwitch.com/api/agent-witch/ws"});var sc,Ft,Wi,dj=a(()=>{"use strict";sc="127.0.0.1",Ft=`http://${sc}:43347`,Wi=Ft});var Tt=a(()=>{"use strict";cj();dj()});var fQ,Vn,eg,uj,yQ,hQ,SQ,PQ,AQ,ic,Jb=a(()=>{"use strict";xi();Tt();fQ={darwin:"mac",mac:"mac",macos:"mac",linux:"linux",wsl:"linux",win32:"windows",windows:"windows"},Vn=e=>fQ[(e??"").trim().toLowerCase()]??"unknown",eg=e=>`nohup "$HOME/${e}/app/command/run.sh" >/dev/null 2>&1 &`,uj=()=>`curl -sS -m 5 "http://127.0.0.1:${43347}/health" || echo "AWL still not responding \u2014 see logs:"`,yQ=e=>({platform:"mac",label:"macOS",instructions:"On this computer, open Terminal, paste this command, and press Return.",command:`AW_HOME="$HOME/${e.installDirName}"
launchctl kickstart -k "gui/$(id -u)/${e.launchAgentPrefix}"
sleep 2
${uj()}
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`,note:"Paste and run the whole block so AW_HOME is set before tail. Ignore com.agent-witch-live unless you installed Live as a separate LaunchAgent."}),hQ=e=>({platform:"linux",label:"Linux or WSL",instructions:"On this computer, open a terminal (on Windows, your WSL distro's terminal), paste this command, and press Enter.",command:`systemctl --user restart ${Ir}
sleep 2
${uj()}
journalctl --user -u ${Ir} -n 50 --no-pager`,note:`If systemctl is not available, the installer did not set up auto-start on this computer. Start the client by hand: ${eg(e.installDirName)}`}),SQ=()=>({platform:"windows",label:"Windows (WSL)",instructions:"On this computer, open PowerShell, paste these commands, and press Enter.",command:`wsl.exe -e bash -lc 'systemctl --user restart ${Ir}'
wsl.exe -e bash -lc 'systemctl --user status ${Ir}'`,note:"AgentWitch runs inside WSL on Windows. These commands use your default WSL distro; if you installed into another distro, add -d <distro name> after wsl.exe."}),PQ={mac:yQ,linux:hQ,windows:SQ},AQ=["mac","linux","windows"],ic=e=>(e.platform==="unknown"?AQ:[e.platform]).map(r=>PQ[r](e))});var pj,mj,bQ,_Q,kQ,Yb,gj=a(()=>{"use strict";pj=m(require("node:path"));Jb();nc();mj=e=>e instanceof Error?e.message:String(e),bQ=e=>typeof e=="object"&&e!==null&&"code"in e&&e.code==="ENOENT",_Q=async(e,t)=>{try{let r=await e.kickstartLaunchAgents();return r.length>0?{ok:!0,platform:"mac",outcome:"restarted",message:`Kickstarted ${r.join(", ")}.`,manualCommand:null}:{ok:!1,platform:"mac",outcome:"failed",message:"No AgentWitch LaunchAgent was kickstarted on this computer.",manualCommand:t}}catch(r){return{ok:!1,platform:"mac",outcome:"failed",message:`LaunchAgent kickstart failed: ${mj(r)}`,manualCommand:t}}},kQ=async(e,t)=>{try{return await e.restartSystemdUserService(),{ok:!0,platform:"linux",outcome:"restarted",message:"Restarted the agent-witch.service systemd user unit.",manualCommand:null}}catch(r){return bQ(r)?{ok:!1,platform:"linux",outcome:"manual-step-required",message:"systemctl is not available on this computer, so the installer set up no auto-start. Start the client by hand.",manualCommand:t}:{ok:!1,platform:"linux",outcome:"failed",message:`systemd user restart failed: ${mj(r)}`,manualCommand:t}}},Yb=async e=>{let t=Vn(e.platform),r=pj.default.basename(e.installDir),o=n=>ic({platform:n,installDirName:r,launchAgentPrefix:Kn(e.installDir)})[0]?.command??null;return t==="mac"?_Q(e.runners,o("mac")):t==="linux"?kQ(e.runners,eg(r)):t==="windows"?{ok:!1,platform:t,outcome:"unsupported-platform",message:"AgentWitch runs inside WSL on Windows. Restart it from PowerShell with the command below.",manualCommand:o("windows")}:{ok:!1,platform:t,outcome:"unsupported-platform",message:`Restarting the AgentWitch client is not supported on ${e.platform||"this platform"}.`,manualCommand:null}}});var ac=a(()=>{"use strict";aj();nc();Jb();gj()});var fj,Xb,RQ,lc,EQ,wQ,yj,TQ,CQ,hj=a(()=>{"use strict";ac();Ue();fj=m(require("node:os")),Xb=m(require("node:path")),RQ=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?Xb.default.resolve(e):Xb.default.join(fj.default.homedir(),Lr)},lc=Kn(RQ()),EQ=`${lc}-wake`,wQ=`${lc}-live`,yj=`${lc}-watchdog`,TQ=`${lc}-automation-scheduler`,CQ=`${lc}-updater`});var Oi=w(Zb=>{"use strict";Object.defineProperty(Zb,"__esModule",{value:!0});Zb.stringify=LQ;function LQ(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var F=w(Qb=>{"use strict";Object.defineProperty(Qb,"__esModule",{value:!0});Qb.generateTypeGuardError=IQ;var Sj=Oi();function IQ(e,t,r){return(0,Sj.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,Sj.stringify)(e)}) to be "${r}"`}});var en=w(tg=>{"use strict";Object.defineProperty(tg,"__esModule",{value:!0});tg.isNonNullObject=void 0;var vQ=F(),xQ=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,vQ.generateTypeGuardError)(e,t.identifier,"non-null object")),r};tg.isNonNullObject=xQ});var vr=w(Me=>{"use strict";Object.defineProperty(Me,"__esModule",{value:!0});Me.attachTypeGuardMeta=Me.isArrayTypeGuard=Me.isNestedObjectTypeGuard=Me.getTypeGuardWrapperKind=Me.getTypeGuardInnerGuard=Me.getTypeGuardItemGuard=Me.getTypeGuardSchema=void 0;var WQ=e=>e.schema;Me.getTypeGuardSchema=WQ;var OQ=e=>e.itemGuard;Me.getTypeGuardItemGuard=OQ;var MQ=e=>e.innerGuard;Me.getTypeGuardInnerGuard=MQ;var jQ=e=>e.wrapperKind;Me.getTypeGuardWrapperKind=jQ;var NQ=e=>{if((0,Me.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Me.isNestedObjectTypeGuard=NQ;var DQ=e=>{if((0,Me.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Me.isArrayTypeGuard=DQ;var HQ=(e,t)=>Object.assign(e,t);Me.attachTypeGuardMeta=HQ});var cc=w(qn=>{"use strict";Object.defineProperty(qn,"__esModule",{value:!0});qn.getExpectedTypeName=qn.getTypeGuardDisplayName=void 0;var Pj=vr(),FQ=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};qn.getTypeGuardDisplayName=FQ;var $Q=e=>{let t=(0,Pj.getTypeGuardWrapperKind)(e),r=(0,Pj.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,qn.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};qn.getExpectedTypeName=$Q});var Jn=w(rg=>{"use strict";Object.defineProperty(rg,"__esModule",{value:!0});rg.createValidationResult=void 0;var zQ=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});rg.createValidationResult=zQ});var Mi=w(og=>{"use strict";Object.defineProperty(og,"__esModule",{value:!0});og.createValidationError=void 0;var UQ=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});og.createValidationError=UQ});var ji=w(ng=>{"use strict";Object.defineProperty(ng,"__esModule",{value:!0});ng.createTreeNode=void 0;var BQ=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});ng.createTreeNode=BQ});var dc=w(sg=>{"use strict";Object.defineProperty(sg,"__esModule",{value:!0});sg.combineResults=void 0;var GQ=Jn(),KQ=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,GQ.createValidationResult)(r,o,n)};sg.combineResults=KQ});var ag=w(ig=>{"use strict";Object.defineProperty(ig,"__esModule",{value:!0});ig.createSimplifiedTree=void 0;var Aj=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=Aj(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},VQ=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=Aj(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};ig.createSimplifiedTree=VQ});var pc=w(cg=>{"use strict";Object.defineProperty(cg,"__esModule",{value:!0});cg.validateObject=void 0;var qQ=en(),uc=Jn(),JQ=Mi(),lg=ji(),YQ=dc(),bj=dg(),XQ=(e,t,r)=>{let o=()=>{let i=(0,JQ.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),l=(0,lg.createTreeNode)(r.path,!1,"non-null object",e);return l.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,uc.createValidationResult)(!1,[],l):(0,uc.createValidationResult)(!1,[i],l)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,uc.createValidationResult)(!0,[],(0,lg.createTreeNode)(r.path,!0,"object",e));let l=c=>{let[d,...u]=c,g=d,f=t[g],y=e[g],A=(0,bj.validateProperty)(g,y,f,r);return A.valid?u.length===0?(0,uc.createValidationResult)(!0,[],(0,lg.createTreeNode)(r.path,!0,"object",e)):l(u):A};return l(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,bj.validateProperty)(d,e[d],u,r)}),l=(0,YQ.combineResults)(i,r.path),c=(0,lg.createTreeNode)(r.path,l.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,uc.createValidationResult)(l.valid,l.errors,c)};return(0,qQ.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};cg.validateObject=XQ});var kj=w(mg=>{"use strict";Object.defineProperty(mg,"__esModule",{value:!0});mg.validateArray=void 0;var ZQ=Oi(),ug=Jn(),_j=Mi(),pg=ji(),QQ=dc(),eee=pc(),tee=cc(),ree=vr(),oee=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,_j.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,pg.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,ug.createValidationResult)(!1,[c],d)}let n=(0,ree.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,g={path:u,config:r.config||null};if(n)return(0,eee.validateObject)(c,n,g);let f=t(c,null),y=(0,tee.getExpectedTypeName)(t),A=(0,ZQ.stringify)(c);if(f)return(0,ug.createValidationResult)(!0,[],(0,pg.createTreeNode)(u,!0,y,c));let P=A.length>200?`Expected ${u} to be "${y}"`:`Expected ${u} (${A}) to be "${y}"`,S=(0,_j.createValidationError)(u,y,c,P),p=(0,pg.createTreeNode)(u,!1,y,c);return p.errors=[S],(0,ug.createValidationResult)(!1,[S],p)}),i=(0,QQ.combineResults)(s,o),l=(0,pg.createTreeNode)(o,i.valid,"Array",e);return l.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";l.children[d]=c.tree}}),(0,ug.createValidationResult)(i.valid,i.errors,l)};mg.validateArray=oee});var dg=w(fg=>{"use strict";Object.defineProperty(fg,"__esModule",{value:!0});fg.validateProperty=void 0;var Rj=Jn(),nee=Mi(),Ej=ji(),see=cc(),gg=vr(),iee=pc(),aee=kj(),lee=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",l=(0,gg.getTypeGuardSchema)(r),c=(0,gg.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(l)return(0,iee.validateObject)(t,l,s);if(c&&(0,gg.isArrayTypeGuard)(r))return(0,aee.validateArray)(t,c,s)}let d=u=>{let g=r(t,u),f=(0,see.getExpectedTypeName)(r);return g?(0,Rj.createValidationResult)(!0,[],(0,Ej.createTreeNode)(n,!0,f,t)):(()=>{let y=(0,nee.createValidationError)(n,f,t,`Expected ${n} (${JSON.stringify(t)}) to be "${f}"`),A=(0,Ej.createTreeNode)(n,!1,f,t);return A.errors=[y],(0,Rj.createValidationResult)(!1,[y],A)})()};if((0,gg.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};fg.validateProperty=lee});var hg=w(yg=>{"use strict";Object.defineProperty(yg,"__esModule",{value:!0});yg.isNil=void 0;var cee=F(),dee=function(e,t){return e!=null?(t&&t.callbackOnError((0,cee.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};yg.isNil=dee});var e_=w(Sg=>{"use strict";Object.defineProperty(Sg,"__esModule",{value:!0});Sg.isDefined=void 0;var uee=F(),pee=hg(),mee=function(e,t){return(0,pee.isNil)(e,null)?(t&&t.callbackOnError((0,uee.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Sg.isDefined=mee});var t_=w(Pg=>{"use strict";Object.defineProperty(Pg,"__esModule",{value:!0});Pg.reportValidationResults=void 0;var gee=ag(),wj=e_(),fee=hg(),yee=(e,t)=>{if(e.valid===!0||(0,fee.isNil)(t))return;let r=t.errorMode||"multi",o=(i,l)=>{(0,wj.isDefined)(l)&&i.callbackOnError(JSON.stringify((0,gee.createSimplifiedTree)(l),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let l=e.errors[0];l&&i.callbackOnError(l.message)}};r==="json"&&(0,wj.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Pg.reportValidationResults=yee});var r_=w(Se=>{"use strict";Object.defineProperty(Se,"__esModule",{value:!0});Se.Validation=Se.reportValidationResults=Se.validateObject=Se.validateProperty=Se.createSimplifiedTree=Se.combineResults=Se.createTreeNode=Se.createValidationError=Se.createValidationResult=Se.getExpectedTypeName=void 0;var hee=cc();Object.defineProperty(Se,"getExpectedTypeName",{enumerable:!0,get:function(){return hee.getExpectedTypeName}});var See=Jn();Object.defineProperty(Se,"createValidationResult",{enumerable:!0,get:function(){return See.createValidationResult}});var Pee=Mi();Object.defineProperty(Se,"createValidationError",{enumerable:!0,get:function(){return Pee.createValidationError}});var Aee=ji();Object.defineProperty(Se,"createTreeNode",{enumerable:!0,get:function(){return Aee.createTreeNode}});var bee=dc();Object.defineProperty(Se,"combineResults",{enumerable:!0,get:function(){return bee.combineResults}});var _ee=ag();Object.defineProperty(Se,"createSimplifiedTree",{enumerable:!0,get:function(){return _ee.createSimplifiedTree}});var kee=dg();Object.defineProperty(Se,"validateProperty",{enumerable:!0,get:function(){return kee.validateProperty}});var Ree=pc();Object.defineProperty(Se,"validateObject",{enumerable:!0,get:function(){return Ree.validateObject}});var Eee=t_();Object.defineProperty(Se,"reportValidationResults",{enumerable:!0,get:function(){return Eee.reportValidationResults}});var wee=Jn(),Tee=dc(),Cee=Mi(),Lee=ji(),Iee=dg(),vee=pc(),xee=t_(),Wee=ag();Se.Validation={result:wee.createValidationResult,combine:Tee.combineResults,error:Cee.createValidationError,treeNode:Lee.createTreeNode,property:Iee.validateProperty,object:vee.validateObject,report:xee.reportValidationResults,createSimplifiedTree:Wee.createSimplifiedTree}});var Ag=w(o_=>{"use strict";Object.defineProperty(o_,"__esModule",{value:!0});o_.isType=Mee;var Tj=en(),Cj=r_(),Oee=vr();function Mee(e){if(!(0,Tj.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,Cj.validateObject)(r,e,s);return(0,Cj.reportValidationResults)(i,o||null),i.valid}return(0,Tj.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,Oee.attachTypeGuardMeta)(t,{schema:e})}});var xj=w(Yn=>{"use strict";Object.defineProperty(Yn,"__esModule",{value:!0});Yn.isNestedType=Yn.isShape=void 0;Yn.isSchema=mc;var Lj=en(),Ij=r_(),vj=vr();function mc(e){if(!(0,Lj.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=Nee(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},l=(0,Ij.validateObject)(o,t,i);return(0,Ij.reportValidationResults)(l,n||null),l.valid}return(0,Lj.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let l=t[i];return l?l(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,vj.attachTypeGuardMeta)(r,{schema:t})}function jee(e){return typeof e=="function"?e:Array.isArray(e)?Dee(e):typeof e=="object"&&e!==null?mc(e):e}function Nee(e){let t={};for(let[r,o]of Object.entries(e))t[r]=jee(o);return t}function Dee(e){let t=e[0],r=mc(t);function o(n,s){return Array.isArray(n)?n.every((i,l)=>r(i,s?{...s,identifier:`${s.identifier}[${l}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,vj.attachTypeGuardMeta)(o,{itemGuard:r})}Yn.isShape=mc;Yn.isNestedType=mc});var Wj=w(n_=>{"use strict";Object.defineProperty(n_,"__esModule",{value:!0});n_.isObjectWith=Fee;var Hee=Ag();function Fee(e){return(0,Hee.isType)(e)}});var Oj=w(s_=>{"use strict";Object.defineProperty(s_,"__esModule",{value:!0});s_.isObject=zee;var $ee=Ag();function zee(e){return(0,$ee.isType)(e)}});var Mj=w(i_=>{"use strict";Object.defineProperty(i_,"__esModule",{value:!0});i_.guardWithTolerance=Uee;function Uee(e,t,r){return t(e,r),e}});var jj=w(a_=>{"use strict";Object.defineProperty(a_,"__esModule",{value:!0});a_.isBranded=Gee;var Bee=F();function Gee(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,Bee.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var Nj=w(bg=>{"use strict";Object.defineProperty(bg,"__esModule",{value:!0});bg.BrandSymbols=void 0;bg.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var Dj=w(_g=>{"use strict";Object.defineProperty(_g,"__esModule",{value:!0});_g.isAny=void 0;var Kee=function(e){return!0};_g.isAny=Kee});var gc=w(l_=>{"use strict";Object.defineProperty(l_,"__esModule",{value:!0});l_.reportTypeGuardError=qee;var Vee=F();function qee(e,t,r){e&&e.callbackOnError((0,Vee.generateTypeGuardError)(t,e.identifier,r))}});var Hj=w(kg=>{"use strict";Object.defineProperty(kg,"__esModule",{value:!0});kg.isBoolean=void 0;var Jee=gc(),Yee=function(t,r){return typeof t!="boolean"?((0,Jee.reportTypeGuardError)(r,t,"boolean"),!1):!0};kg.isBoolean=Yee});var Fj=w(Rg=>{"use strict";Object.defineProperty(Rg,"__esModule",{value:!0});Rg.isDate=void 0;var Xee=F(),Zee=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,Xee.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Rg.isDate=Zee});var c_=w(Eg=>{"use strict";Object.defineProperty(Eg,"__esModule",{value:!0});Eg.isNumber=void 0;var Qee=gc(),ete=function(t,r){return typeof t!="number"||isNaN(t)?((0,Qee.reportTypeGuardError)(r,t,"number"),!1):!0};Eg.isNumber=ete});var $j=w(wg=>{"use strict";Object.defineProperty(wg,"__esModule",{value:!0});wg.isString=void 0;var tte=gc(),rte=function(t,r){return typeof t!="string"?((0,tte.reportTypeGuardError)(r,t,"string"),!1):!0};wg.isString=rte});var zj=w(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.isUnknown=void 0;var ote=function(e){return!0};Tg.isUnknown=ote});var Uj=w(Cg=>{"use strict";Object.defineProperty(Cg,"__esModule",{value:!0});Cg.isFunction=void 0;var nte=F(),ste=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,nte.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Cg.isFunction=ste});var Gj=w(Lg=>{"use strict";Object.defineProperty(Lg,"__esModule",{value:!0});Lg.isFile=void 0;var Bj=F(),ite=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,Bj.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,Bj.generateTypeGuardError)(e,t.identifier,"File")),!1)};Lg.isFile=ite});var Vj=w(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isFileList=void 0;var Kj=F(),ate=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,Kj.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,Kj.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Ig.isFileList=ate});var Jj=w(vg=>{"use strict";Object.defineProperty(vg,"__esModule",{value:!0});vg.isBlob=void 0;var qj=F(),lte=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,qj.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,qj.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};vg.isBlob=lte});var Xj=w(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isFormData=void 0;var Yj=F(),cte=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Yj.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Yj.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};xg.isFormData=cte});var Qj=w(Wg=>{"use strict";Object.defineProperty(Wg,"__esModule",{value:!0});Wg.isURL=void 0;var Zj=F(),dte=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,Zj.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,Zj.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Wg.isURL=dte});var tN=w(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.isURLSearchParams=void 0;var eN=F(),ute=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,eN.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,eN.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Og.isURLSearchParams=ute});var rN=w(Mg=>{"use strict";Object.defineProperty(Mg,"__esModule",{value:!0});Mg.isMap=void 0;var pte=F(),mte=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,pte.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Mg.isMap=mte});var oN=w(jg=>{"use strict";Object.defineProperty(jg,"__esModule",{value:!0});jg.isSet=void 0;var gte=F(),fte=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,gte.generateTypeGuardError)(e,t.identifier,"Set")),!1)};jg.isSet=fte});var nN=w(d_=>{"use strict";Object.defineProperty(d_,"__esModule",{value:!0});d_.isIndexSignature=hte;var yte=F();function hte(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,yte.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),l=Object.getOwnPropertySymbols(s);return[...i,...l].every((d,u)=>{let g=s[d],f=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),y=t(g,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return f&&y})}}});var sN=w(Ng=>{"use strict";Object.defineProperty(Ng,"__esModule",{value:!0});Ng.isError=void 0;var Ste=gc(),Pte=function(t,r){return t instanceof Error?!0:((0,Ste.reportTypeGuardError)(r,t,"Error"),!1)};Ng.isError=Pte});var p_=w(u_=>{"use strict";Object.defineProperty(u_,"__esModule",{value:!0});u_.isArrayWithEachItem=_te;var Ate=F(),bte=vr();function _te(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,Ate.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,bte.attachTypeGuardMeta)(t,{itemGuard:e})}});var m_=w(Dg=>{"use strict";Object.defineProperty(Dg,"__esModule",{value:!0});Dg.isNonEmptyArray=void 0;var kte=F(),Rte=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,kte.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Dg.isNonEmptyArray=Rte});var iN=w(g_=>{"use strict";Object.defineProperty(g_,"__esModule",{value:!0});g_.isNonEmptyArrayWithEachItem=Tte;var Ete=p_(),wte=m_();function Tte(e){return function(t,r){return(0,Ete.isArrayWithEachItem)(e)(t,r)&&(0,wte.isNonEmptyArray)(t,r)}}});var lN=w(f_=>{"use strict";Object.defineProperty(f_,"__esModule",{value:!0});f_.isTuple=Cte;var aN=F();function Cte(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,aN.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,aN.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var cN=w(y_=>{"use strict";Object.defineProperty(y_,"__esModule",{value:!0});y_.isObjectWithEachItem=Ite;var Lte=F();function Ite(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Lte.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var dN=w(h_=>{"use strict";Object.defineProperty(h_,"__esModule",{value:!0});h_.isPartialOf=xte;var vte=en();function xte(e){return function(t,r){if(!(0,vte.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var uN=w(S_=>{"use strict";Object.defineProperty(S_,"__esModule",{value:!0});S_.isPick=Ote;var Wte=en();function Ote(e,...t){return function(r,o){if(!(0,Wte.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var pN=w(P_=>{"use strict";Object.defineProperty(P_,"__esModule",{value:!0});P_.isOmit=jte;var Mte=en();function jte(e,...t){return function(r,o){if(!(0,Mte.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let l=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),g=u.indexOf(" ("),f=g>=0?u.slice(0,g):u;if(l.has(f))return!1;let y=f.startsWith(s+".")&&f.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var mN=w(Hg=>{"use strict";Object.defineProperty(Hg,"__esModule",{value:!0});Hg.isNonEmptyString=void 0;var Nte=F(),Dte=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,Nte.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Hg.isNonEmptyString=Dte});var gN=w(Fg=>{"use strict";Object.defineProperty(Fg,"__esModule",{value:!0});Fg.isNonNegativeNumber=void 0;var Hte=F(),Fte=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,Hte.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Fg.isNonNegativeNumber=Fte});var fN=w($g=>{"use strict";Object.defineProperty($g,"__esModule",{value:!0});$g.isPositiveNumber=void 0;var $te=F(),zte=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,$te.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};$g.isPositiveNumber=zte});var yN=w(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});zg.isNonPositiveNumber=void 0;var Ute=F(),Bte=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,Ute.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};zg.isNonPositiveNumber=Bte});var hN=w(Ug=>{"use strict";Object.defineProperty(Ug,"__esModule",{value:!0});Ug.isNegativeNumber=void 0;var Gte=F(),Kte=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,Gte.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Ug.isNegativeNumber=Kte});var SN=w(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isInteger=void 0;var Vte=F(),qte=c_(),Jte=function(e,t){return!(0,qte.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Vte.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Bg.isInteger=Jte});var PN=w(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.isPositiveInteger=void 0;var Yte=F(),Xte=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Yte.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Gg.isPositiveInteger=Xte});var AN=w(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.isNegativeInteger=void 0;var Zte=F(),Qte=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Zte.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Kg.isNegativeInteger=Qte});var bN=w(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.isNonNegativeInteger=void 0;var ere=F(),tre=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,ere.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Vg.isNonNegativeInteger=tre});var _N=w(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.isNonPositiveInteger=void 0;var rre=F(),ore=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,rre.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};qg.isNonPositiveInteger=ore});var kN=w(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.isNumeric=void 0;var Jg=F(),nre=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Jg.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Jg.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Jg.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Jg.generateTypeGuardError)(e,t.identifier,"number key")),!1};Yg.isNumeric=nre});var RN=w(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.isBooleanLike=void 0;var A_=F(),sre=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,A_.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,A_.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Xg.isBooleanLike=sre});var EN=w(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.isDateLike=void 0;var fc=F(),ire=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,fc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,fc.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,fc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,fc.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,fc.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Zg.isDateLike=ire});var wN=w(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.isBigInt=void 0;var are=F(),lre=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,are.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Qg.isBigInt=lre});var __=w(b_=>{"use strict";Object.defineProperty(b_,"__esModule",{value:!0});b_.isOneOf=cre;var TN=Oi();function cre(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,TN.stringify)(t)}) must be one of following values ${e.map(TN.stringify).join(" | ")}`),o}}});var CN=w(k_=>{"use strict";Object.defineProperty(k_,"__esModule",{value:!0});k_.isOneOfTypes=pre;var dre=Oi(),ure=cc();function pre(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,dre.stringify)(t),l=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,ure.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;l.includes(u)||l.push(u)}})),r.callbackOnError(l.join(`
`))}return n}}});var LN=w(R_=>{"use strict";Object.defineProperty(R_,"__esModule",{value:!0});R_.isIntersectionOf=mre;function mre(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var IN=w(E_=>{"use strict";Object.defineProperty(E_,"__esModule",{value:!0});E_.isExtensionOf=gre;function gre(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var vN=w(w_=>{"use strict";Object.defineProperty(w_,"__esModule",{value:!0});w_.isNullOr=yre;var fre=vr();function yre(e){function t(r,o){return r===null?!0:e(r,o)}return(0,fre.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var xN=w(T_=>{"use strict";Object.defineProperty(T_,"__esModule",{value:!0});T_.isUndefinedOr=Sre;var hre=vr();function Sre(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,hre.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var WN=w(C_=>{"use strict";Object.defineProperty(C_,"__esModule",{value:!0});C_.isNilOr=Are;var Pre=vr();function Are(e){function t(r,o){return r==null?!0:e(r,o)}return(0,Pre.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var ON=w(L_=>{"use strict";Object.defineProperty(L_,"__esModule",{value:!0});L_.isAsserted=bre;function bre(e){return!0}});var MN=w(I_=>{"use strict";Object.defineProperty(I_,"__esModule",{value:!0});I_.isEnum=kre;var _re=__();function kre(e){return function(t,r){return(0,_re.isOneOf)(...Object.values(e))(t,r)}}});var jN=w(v_=>{"use strict";Object.defineProperty(v_,"__esModule",{value:!0});v_.isEqualTo=wre;var Rre=F(),Ere=Oi();function wre(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,Rre.generateTypeGuardError)(t,r.identifier,`equal to ${(0,Ere.stringify)(e)}`)),!1):!0}}});var NN=w(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.isRegex=void 0;var Tre=F(),Cre=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,Tre.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};ef.isRegex=Cre});var HN=w(x_=>{"use strict";Object.defineProperty(x_,"__esModule",{value:!0});x_.isPattern=Lre;var DN=F();function Lre(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,DN.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,DN.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var FN=w(W_=>{"use strict";Object.defineProperty(W_,"__esModule",{value:!0});W_.by=Ire;function Ire(e){return function(t){return e(t,null)}}});var $N=w(O_=>{"use strict";Object.defineProperty(O_,"__esModule",{value:!0});O_.toNumber=vre;function vre(e){return typeof e=="number"?e:Number(e)}});var zN=w(M_=>{"use strict";Object.defineProperty(M_,"__esModule",{value:!0});M_.toDate=xre;function xre(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var UN=w(j_=>{"use strict";Object.defineProperty(j_,"__esModule",{value:!0});j_.toBoolean=Wre;function Wre(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var BN=w(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.isSymbol=void 0;var Ore=F(),Mre=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,Ore.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};tf.isSymbol=Mre});var Ni=w(k=>{"use strict";Object.defineProperty(k,"__esModule",{value:!0});k.isDateLike=k.isBooleanLike=k.isNumeric=k.isNonPositiveInteger=k.isNonNegativeInteger=k.isNegativeInteger=k.isPositiveInteger=k.isInteger=k.isNegativeNumber=k.isNonPositiveNumber=k.isPositiveNumber=k.isNonNegativeNumber=k.isNonEmptyString=k.isOmit=k.isPick=k.isPartialOf=k.isObjectWithEachItem=k.isNonNullObject=k.isTuple=k.isNonEmptyArrayWithEachItem=k.isNonEmptyArray=k.isArrayWithEachItem=k.isError=k.isIndexSignature=k.isSet=k.isMap=k.isURLSearchParams=k.isURL=k.isFormData=k.isBlob=k.isFileList=k.isFile=k.isFunction=k.isUnknown=k.isString=k.isNumber=k.isNil=k.isDefined=k.isDate=k.isBoolean=k.isAny=k.BrandSymbols=k.isBranded=k.guardWithTolerance=k.isObject=k.isObjectWith=k.isNestedType=k.isShape=k.isSchema=k.isType=void 0;k.isSymbol=k.toBoolean=k.toDate=k.toNumber=k.by=k.generateTypeGuardError=k.isPattern=k.isRegex=k.isEqualTo=k.isEnum=k.isAsserted=k.isNilOr=k.isUndefinedOr=k.isNullOr=k.isExtensionOf=k.isIntersectionOf=k.isOneOfTypes=k.isOneOf=k.isBigInt=void 0;var jre=Ag();Object.defineProperty(k,"isType",{enumerable:!0,get:function(){return jre.isType}});var N_=xj();Object.defineProperty(k,"isSchema",{enumerable:!0,get:function(){return N_.isSchema}});Object.defineProperty(k,"isShape",{enumerable:!0,get:function(){return N_.isShape}});Object.defineProperty(k,"isNestedType",{enumerable:!0,get:function(){return N_.isNestedType}});var Nre=Wj();Object.defineProperty(k,"isObjectWith",{enumerable:!0,get:function(){return Nre.isObjectWith}});var Dre=Oj();Object.defineProperty(k,"isObject",{enumerable:!0,get:function(){return Dre.isObject}});var Hre=Mj();Object.defineProperty(k,"guardWithTolerance",{enumerable:!0,get:function(){return Hre.guardWithTolerance}});var Fre=jj();Object.defineProperty(k,"isBranded",{enumerable:!0,get:function(){return Fre.isBranded}});var $re=Nj();Object.defineProperty(k,"BrandSymbols",{enumerable:!0,get:function(){return $re.BrandSymbols}});var zre=Dj();Object.defineProperty(k,"isAny",{enumerable:!0,get:function(){return zre.isAny}});var Ure=Hj();Object.defineProperty(k,"isBoolean",{enumerable:!0,get:function(){return Ure.isBoolean}});var Bre=Fj();Object.defineProperty(k,"isDate",{enumerable:!0,get:function(){return Bre.isDate}});var Gre=e_();Object.defineProperty(k,"isDefined",{enumerable:!0,get:function(){return Gre.isDefined}});var Kre=hg();Object.defineProperty(k,"isNil",{enumerable:!0,get:function(){return Kre.isNil}});var Vre=c_();Object.defineProperty(k,"isNumber",{enumerable:!0,get:function(){return Vre.isNumber}});var qre=$j();Object.defineProperty(k,"isString",{enumerable:!0,get:function(){return qre.isString}});var Jre=zj();Object.defineProperty(k,"isUnknown",{enumerable:!0,get:function(){return Jre.isUnknown}});var Yre=Uj();Object.defineProperty(k,"isFunction",{enumerable:!0,get:function(){return Yre.isFunction}});var Xre=Gj();Object.defineProperty(k,"isFile",{enumerable:!0,get:function(){return Xre.isFile}});var Zre=Vj();Object.defineProperty(k,"isFileList",{enumerable:!0,get:function(){return Zre.isFileList}});var Qre=Jj();Object.defineProperty(k,"isBlob",{enumerable:!0,get:function(){return Qre.isBlob}});var eoe=Xj();Object.defineProperty(k,"isFormData",{enumerable:!0,get:function(){return eoe.isFormData}});var toe=Qj();Object.defineProperty(k,"isURL",{enumerable:!0,get:function(){return toe.isURL}});var roe=tN();Object.defineProperty(k,"isURLSearchParams",{enumerable:!0,get:function(){return roe.isURLSearchParams}});var ooe=rN();Object.defineProperty(k,"isMap",{enumerable:!0,get:function(){return ooe.isMap}});var noe=oN();Object.defineProperty(k,"isSet",{enumerable:!0,get:function(){return noe.isSet}});var soe=nN();Object.defineProperty(k,"isIndexSignature",{enumerable:!0,get:function(){return soe.isIndexSignature}});var ioe=sN();Object.defineProperty(k,"isError",{enumerable:!0,get:function(){return ioe.isError}});var aoe=p_();Object.defineProperty(k,"isArrayWithEachItem",{enumerable:!0,get:function(){return aoe.isArrayWithEachItem}});var loe=m_();Object.defineProperty(k,"isNonEmptyArray",{enumerable:!0,get:function(){return loe.isNonEmptyArray}});var coe=iN();Object.defineProperty(k,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return coe.isNonEmptyArrayWithEachItem}});var doe=lN();Object.defineProperty(k,"isTuple",{enumerable:!0,get:function(){return doe.isTuple}});var uoe=en();Object.defineProperty(k,"isNonNullObject",{enumerable:!0,get:function(){return uoe.isNonNullObject}});var poe=cN();Object.defineProperty(k,"isObjectWithEachItem",{enumerable:!0,get:function(){return poe.isObjectWithEachItem}});var moe=dN();Object.defineProperty(k,"isPartialOf",{enumerable:!0,get:function(){return moe.isPartialOf}});var goe=uN();Object.defineProperty(k,"isPick",{enumerable:!0,get:function(){return goe.isPick}});var foe=pN();Object.defineProperty(k,"isOmit",{enumerable:!0,get:function(){return foe.isOmit}});var yoe=mN();Object.defineProperty(k,"isNonEmptyString",{enumerable:!0,get:function(){return yoe.isNonEmptyString}});var hoe=gN();Object.defineProperty(k,"isNonNegativeNumber",{enumerable:!0,get:function(){return hoe.isNonNegativeNumber}});var Soe=fN();Object.defineProperty(k,"isPositiveNumber",{enumerable:!0,get:function(){return Soe.isPositiveNumber}});var Poe=yN();Object.defineProperty(k,"isNonPositiveNumber",{enumerable:!0,get:function(){return Poe.isNonPositiveNumber}});var Aoe=hN();Object.defineProperty(k,"isNegativeNumber",{enumerable:!0,get:function(){return Aoe.isNegativeNumber}});var boe=SN();Object.defineProperty(k,"isInteger",{enumerable:!0,get:function(){return boe.isInteger}});var _oe=PN();Object.defineProperty(k,"isPositiveInteger",{enumerable:!0,get:function(){return _oe.isPositiveInteger}});var koe=AN();Object.defineProperty(k,"isNegativeInteger",{enumerable:!0,get:function(){return koe.isNegativeInteger}});var Roe=bN();Object.defineProperty(k,"isNonNegativeInteger",{enumerable:!0,get:function(){return Roe.isNonNegativeInteger}});var Eoe=_N();Object.defineProperty(k,"isNonPositiveInteger",{enumerable:!0,get:function(){return Eoe.isNonPositiveInteger}});var woe=kN();Object.defineProperty(k,"isNumeric",{enumerable:!0,get:function(){return woe.isNumeric}});var Toe=RN();Object.defineProperty(k,"isBooleanLike",{enumerable:!0,get:function(){return Toe.isBooleanLike}});var Coe=EN();Object.defineProperty(k,"isDateLike",{enumerable:!0,get:function(){return Coe.isDateLike}});var Loe=wN();Object.defineProperty(k,"isBigInt",{enumerable:!0,get:function(){return Loe.isBigInt}});var Ioe=__();Object.defineProperty(k,"isOneOf",{enumerable:!0,get:function(){return Ioe.isOneOf}});var voe=CN();Object.defineProperty(k,"isOneOfTypes",{enumerable:!0,get:function(){return voe.isOneOfTypes}});var xoe=LN();Object.defineProperty(k,"isIntersectionOf",{enumerable:!0,get:function(){return xoe.isIntersectionOf}});var Woe=IN();Object.defineProperty(k,"isExtensionOf",{enumerable:!0,get:function(){return Woe.isExtensionOf}});var Ooe=vN();Object.defineProperty(k,"isNullOr",{enumerable:!0,get:function(){return Ooe.isNullOr}});var Moe=xN();Object.defineProperty(k,"isUndefinedOr",{enumerable:!0,get:function(){return Moe.isUndefinedOr}});var joe=WN();Object.defineProperty(k,"isNilOr",{enumerable:!0,get:function(){return joe.isNilOr}});var Noe=ON();Object.defineProperty(k,"isAsserted",{enumerable:!0,get:function(){return Noe.isAsserted}});var Doe=MN();Object.defineProperty(k,"isEnum",{enumerable:!0,get:function(){return Doe.isEnum}});var Hoe=jN();Object.defineProperty(k,"isEqualTo",{enumerable:!0,get:function(){return Hoe.isEqualTo}});var Foe=NN();Object.defineProperty(k,"isRegex",{enumerable:!0,get:function(){return Foe.isRegex}});var $oe=HN();Object.defineProperty(k,"isPattern",{enumerable:!0,get:function(){return $oe.isPattern}});var zoe=F();Object.defineProperty(k,"generateTypeGuardError",{enumerable:!0,get:function(){return zoe.generateTypeGuardError}});var Uoe=FN();Object.defineProperty(k,"by",{enumerable:!0,get:function(){return Uoe.by}});var Boe=$N();Object.defineProperty(k,"toNumber",{enumerable:!0,get:function(){return Boe.toNumber}});var Goe=zN();Object.defineProperty(k,"toDate",{enumerable:!0,get:function(){return Goe.toDate}});var Koe=UN();Object.defineProperty(k,"toBoolean",{enumerable:!0,get:function(){return Koe.toBoolean}});var Voe=BN();Object.defineProperty(k,"isSymbol",{enumerable:!0,get:function(){return Voe.isSymbol}})});var Di,GN,qoe,KN,VN=a(()=>{"use strict";Di=m(require("node:path")),GN=require("node:url"),qoe=()=>!0,KN=()=>{if(qoe()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Di.default.dirname(Di.default.resolve(e)):Di.default.dirname(Di.default.resolve(__filename))}return Di.default.dirname((0,GN.fileURLToPath)(__agentWitchImportMetaUrl))}});var D_,qN,$,JN,Joe,xr,H_,L,yc,Wr,F_,hc,Xn,$_,z_,U_,Sc,Re,tn,rf,Qe,of,j,B_=a(()=>{"use strict";D_=m(require("node:fs")),qN=m(require("node:os")),$=m(require("node:path")),JN=m(Ni());Ue();VN();nc();nc();Joe=KN(),xr=e=>e.trim().toLowerCase(),H_=e=>xr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return $.default.resolve(e);let t=$.default.resolve(Joe),r=$.default.basename(t),o=$.default.basename($.default.dirname(t));return r===qb&&(o===Lr||o===ao)?$.default.dirname(t):r===Lr||r===ao?t:$.default.join(qN.default.homedir(),Lr)},yc=(e=L())=>$.default.join(e,qb),Wr=(e=L())=>$.default.join(yc(e),ij),F_=(e,t,r)=>t!==null?$.default.join(e,ct,t,r):$.default.join(e,r),hc=e=>F_(e.installDir,e.profileEmail,rc),Xn=e=>F_(e.installDir,e.profileEmail,rr),$_=e=>$.default.join(e.logsDir,Bn),z_=e=>$.default.join(e.logsDir,Gn),U_=e=>F_(e.installDir,e.profileEmail,oc),Sc=e=>e.profileEmail!==null?$.default.join(e.installDir,ct,e.profileEmail,Zo):$.default.join(e.installDir,Zo),Re=(e=L())=>Kn(e),tn=(e=L())=>Qo(e)?Jm:qm,rf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return xr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?xr(t):null},Qe=(e=L())=>{let t=$.default.join(e,Vb);if(!D_.default.existsSync(t))return null;try{let r=JSON.parse(D_.default.readFileSync(t,"utf8"));if((0,JN.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return xr(r.email)}catch{return null}return null},of=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?xr(r):null}let t=rf();return t!==null?t:Qe()},j=e=>{let t=L(),r=yc(t),o=Wr(t),n=of(e);if(n!==null){let y=$.default.join(t,ct,n),A=$.default.join(y,Ym),P=$.default.join(y,rc),S=$.default.join(y,Un.projectDataDir),p=$.default.join(y,rr),b=$.default.join(y,oc),C=$.default.join(y,Zo),h=$.default.join(y,rr,Bn),_=$.default.join(y,rr,Gn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:P,projectDataDir:S,logsDir:p,mainLogPath:h,errorLogPath:_,reportsDir:b,deviceKeypairPath:C,configPath:$.default.join(y,"config.json"),harnessRootDir:A,harnessManifestPath:$.default.join(A,Zm),harnessSetsDir:$.default.join(A,Xm)}}let s=$.default.join(t,Ym),i=$.default.join(t,rc),l=$.default.join(t,Un.projectDataDir),c=$.default.join(t,rr),d=$.default.join(t,oc),u=$.default.join(t,Zo),g=$.default.join(t,rr,Bn),f=$.default.join(t,rr,Gn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:l,logsDir:c,mainLogPath:g,errorLogPath:f,reportsDir:d,deviceKeypairPath:u,configPath:$.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:$.default.join(s,Zm),harnessSetsDir:$.default.join(s,Xm)}}});var Hi,G_=a(()=>{"use strict";Hi=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var Yoe,Fi,K_=a(()=>{"use strict";Yoe=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},Fi=e=>e.filePort??Yoe(e.envValue)??e.defaultPort});var V_,YN,Xoe,Pc,$i,XN=a(()=>{"use strict";V_=m(require("node:fs")),YN=m(require("node:path"));Ue();B_();G_();K_();Xoe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pc=e=>{let t=YN.default.join(e,tc.wakePort);if(!V_.default.existsSync(t))return null;try{let r=JSON.parse(V_.default.readFileSync(t,"utf8"));if(Xoe(r)&&Hi(r.wakePort))return r.wakePort}catch{return null}return null},$i=(e=L())=>Fi({filePort:Pc(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:tn(e)})});var q_={};Et(q_,{isAgentWitchLocalInstallDir:()=>Qo,isValidAgentWitchWakePort:()=>Hi,readActiveProfileEmailFromFile:()=>Qe,readAgentWitchWakePortFromFile:()=>Pc,resolveActiveProfileEmail:()=>of,resolveActiveProfileEmailFromEnv:()=>rf,resolveAgentWitchAppBundlePath:()=>Wr,resolveAgentWitchAppDir:()=>yc,resolveAgentWitchDefaultWakePort:()=>tn,resolveAgentWitchDeviceKeypairPath:()=>Sc,resolveAgentWitchErrorLogPath:()=>z_,resolveAgentWitchInstallDir:()=>L,resolveAgentWitchLaunchAgentPrefix:()=>Re,resolveAgentWitchLocalLayout:()=>j,resolveAgentWitchLogsDir:()=>Xn,resolveAgentWitchMainLogPath:()=>$_,resolveAgentWitchProjectsDir:()=>hc,resolveAgentWitchReportsDir:()=>U_,resolveAgentWitchRuntimeWakePort:()=>$i,resolveAgentWitchWakePortFromSources:()=>Fi,sanitizeProfileEmailForDir:()=>xr,sanitizeProfileEmailForLaunchAgentLabel:()=>H_});var q=a(()=>{"use strict";B_();G_();XN();K_()});var J_,Y_,nf=a(()=>{"use strict";J_=new Set(["","loginwindow","_mbsetupuser","root"]),Y_=5e3});var ZN,Zoe,QN,X_,Z_=a(()=>{"use strict";ZN=require("node:child_process");nf();Zoe=e=>e.trim().toLowerCase(),QN=e=>e==null?!1:!J_.has(Zoe(e)),X_=()=>{if(process.platform!=="darwin")return null;try{let t=(0,ZN.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return QN(t)?t:null}catch{return null}}});var tD,eD,or,Ac=a(()=>{"use strict";tD=m(require("node:os"));Z_();eD=e=>e.trim().toLowerCase(),or=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?X_():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??tD.default.userInfo().username;return eD(r)===eD(o)}});var rD,oD,Zn,nD=a(()=>{"use strict";rD=require("node:child_process"),oD=m(require("node:fs"));q();Ac();Zn=(e=L())=>{let t=Wr(e);if(!oD.default.existsSync(t))return{ok:!1,errorMessage:"AgentWitch install not found."};if(!or())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Qe(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,rD.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var Q_,$t,zi,sD=a(()=>{"use strict";Q_="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",$t=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[Q_]==="1"},zi=e=>`Refusing ${e} host side effects under VITEST (set ${Q_}=1 to override).`});var Qn=a(()=>{"use strict";sD()});var iD,bc,sf=a(()=>{"use strict";iD=require("node:child_process");Qn();bc=e=>{if(process.platform!=="darwin"||!$t())return;let t=process.getuid?.();if(t!==void 0)try{(0,iD.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var af,ek,aD,Pe,lf,_c=a(()=>{"use strict";af=m(require("node:fs")),ek=m(require("node:path"));q();Ue();aD=e=>{let t=ek.default.join(e,ct);return af.default.existsSync(t)?af.default.readdirSync(t).filter(r=>af.default.statSync(ek.default.join(t,r)).isDirectory()).map(r=>xr(r)).toSorted():[]},Pe=(e=L())=>{let t=Re(e),r=aD(e);return[{profileEmail:Qe(e)??r[0]??null,launchAgentLabel:t}]},lf=(e=L())=>aD(e)});var tk,lD,cD,Qoe,lo,cf=a(()=>{"use strict";tk=m(require("node:fs")),lD=m(require("node:os")),cD=m(require("node:path"));q();_c();Qoe=()=>cD.default.join(lD.default.homedir(),"Library","LaunchAgents"),lo=(e=L())=>{let t=Re(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of Pe(e))r.add(n.launchAgentLabel);let o=Qoe();if(tk.default.existsSync(o))for(let n of tk.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var dD,kc,uD=a(()=>{"use strict";q();sf();cf();_c();dD=(e=L())=>{let t=new Set(Pe(e).map(r=>r.launchAgentLabel));return lo(e).filter(r=>!t.has(r))},kc=(e=L())=>{for(let t of dD(e))bc(t)}});var Rc,rk=a(()=>{"use strict";q();sf();cf();Rc=(e=L())=>{for(let t of lo(e))bc(t)}});var pD,mD,ene,es,gD=a(()=>{"use strict";pD=require("node:child_process"),mD=require("node:util"),ene=(0,mD.promisify)(pD.execFile),es=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await ene("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var ts,tne,ok,nk=a(()=>{"use strict";ts=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tne=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,ok=e=>{let t=e.pathValue??tne(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${ts(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${ts(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${ts(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${ts(e.homeDir)}</string>
    <key>PATH</key>
    <string>${ts(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${ts(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${ts(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var df,sk=a(()=>{"use strict";df=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Ec,ik,uf,pf,co,mf=a(()=>{"use strict";Ec=m(require("node:fs")),ik=m(require("node:os")),uf=m(require("node:path"));Ue();q();nk();sk();pf=(e,t=ik.default.homedir())=>uf.default.join(t,"Library","LaunchAgents",`${e}.plist`),co=e=>{let t=e.installDir??L(),r=e.homeDir??ik.default.homedir(),o=pf(e.launchAgentLabel,r),n=Ec.default.existsSync(o)?Ec.default.readFileSync(o,"utf8"):null;if(n!==null&&df(n))return{ok:!0,rewritten:!1,plistPath:o};let s=ok({launchAgentLabel:e.launchAgentLabel,runPath:uf.default.join(t,sj,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??$i(t)});if(!df(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Ec.default.mkdirSync(uf.default.dirname(o),{recursive:!0}),Ec.default.writeFileSync(o,s,"utf8")}catch(i){let l=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:l}}return{ok:!0,rewritten:!0,plistPath:o}}});var yD,hD,SD,wc,rne,one,fD,et,ak=a(()=>{"use strict";yD=require("node:child_process"),hD=m(require("node:fs")),SD=require("node:util");q();Qn();mf();Ac();wc=(0,SD.promisify)(yD.execFile),rne=async e=>{try{return await wc("launchctl",["print",e]),!0}catch{return!1}},one=async(e,t,r)=>{await rne(t)&&await wc("launchctl",["bootout",t]).catch(()=>{}),await wc("launchctl",["bootstrap",e,r]),await wc("launchctl",["enable",t])},fD=async e=>{try{return await wc("launchctl",["kickstart","-k",e]),!0}catch{return!1}},et=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!$t())return{ok:!1,errorMessage:zi("launchctl")};if(!or())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=co({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await fD(n))return{ok:!0};let i=s.plistPath;if(!hD.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await one(o,n,i),await fD(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(l){return{ok:!1,errorMessage:l instanceof Error?l.message:"launchctl bootstrap failed."}}}});var rs,PD=a(()=>{"use strict";q();ak();_c();rs=async(e=L(),t=process.platform)=>{if(t!=="darwin")return[];let r=[];for(let o of Pe(e))(await et(o.launchAgentLabel,e)).ok&&r.push(o.launchAgentLabel);return r}});var gf,Ui,AD,bD,_D,kD=a(()=>{"use strict";gf=require("node:child_process"),Ui=m(require("node:fs")),AD="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",bD=e=>{try{return(0,gf.execFileSync)("plutil",["-extract",AD,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},_D=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=Ui.default.statSync(e);try{Ui.default.copyFileSync(e,r),(0,gf.execFileSync)("plutil",["-replace",AD,"-string",String(t),r],{stdio:"ignore"}),(0,gf.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),Ui.default.chmodSync(r,o&4095),Ui.default.renameSync(r,e)}finally{Ui.default.rmSync(r,{force:!0})}}});var RD,ED=a(()=>{"use strict";q();RD=e=>Hi(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var wD,TD,nne,Tc,CD=a(()=>{"use strict";wD=m(require("node:fs")),TD=m(require("node:os"));kD();ED();mf();nne=(e,t)=>{let r=RD({filePort:t,plistValue:bD(e)});return r.kind!=="sync"?!1:(_D(e,r.wakePort),!0)},Tc=e=>{let t=e.homeDir??TD.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>pf(o,t)).filter(o=>wD.default.existsSync(o)).filter(o=>nne(o,e.wakePort))}});var Ct,uo,LD=a(()=>{"use strict";rk();Ac();nf();Ct=e=>{or()||(Rc(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},uo=(e,t=Y_)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{or()||e()},t);return()=>{clearInterval(r)}}});var pe=a(()=>{"use strict";hj();nD();sf();uD();rk();cf();Ac();gD();PD();ak();mf();sk();CD();nk();_c();Z_();nf();LD()});var lk=a(()=>{"use strict";pe()});var Cc,ID,ff,vD,Bi,xD,WD,rn=a(()=>{"use strict";Cc=".agent-witch",ID="memory",ff="project.json",vD="chunks.ndjson",Bi="runs.ndjson",xD="reports",WD=".json"});var OD=a(()=>{"use strict";rn()});var MD,yf,ck=a(()=>{"use strict";MD=m(require("node:path"));OD();yf=(e,t)=>MD.default.join(e.trim(),`${t.trim()}${WD}`)});var Lc,jD,ND=a(()=>{"use strict";Lc="agent-witch.js",jD="command"});var hf=a(()=>{"use strict";ND()});var os,DD,HD=a(()=>{"use strict";hf();os=e=>`'${e.replace(/'/g,"'\\''")}'`,DD=e=>{let t=`${e.installDir.trim()}/${"app"}/${Lc}`,r=[os("node"),os(t),"report","write","--key",os(e.reportKey.trim()),"--agent-run-id",os(e.agentRunId.trim()),"--status",os(e.status),"--summary",os(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",os(e.details.trim())),r.join(" ")}});var Or,FD,sne,dk,Sf=a(()=>{"use strict";ck();HD();Or={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},FD=e=>e===Or.COMPLETED||e===Or.FAILED,sne=e=>["Maintain a machine-readable job report so the user can check status later.","AgentWitch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),dk=(e,t)=>{let r=yf(t.reportsDir,t.reportKey),o=DD({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Or.IN_PROGRESS,summary:"Task started on your computer."});return`${e.trim()}

---
${sne({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var tt=a(()=>{"use strict";Ue();q()});var vc,zD,$D,UD,ine,Gi,ane,BD,xc,Wc,uk,GD,KD,Oc=a(()=>{"use strict";vc=m(require("node:fs")),zD=m(require("node:path"));Sf();ck();tt();$D=50,UD=e=>{let t=j(),r=yf(t.reportsDir,e);return vc.default.mkdirSync(zD.default.dirname(r),{recursive:!0}),r},ine=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Gi=e=>{let t=UD(e);if(!vc.default.existsSync(t))return null;try{let r=JSON.parse(vc.default.readFileSync(t,"utf8"));return ine(r)?r:null}catch{return null}},ane=(e,t)=>{let r=[...e,t];return r.length>$D?r.slice(r.length-$D):r},BD=e=>{let t=UD(e.reportKey);vc.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},xc=e=>{let t=Gi(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:ane(t?.history??[],o)};return BD(n),n},Wc=e=>{let t=Gi(e.reportKey);return t!==null?t:xc({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Or.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},uk=(e,t)=>{let r=t.trim();if(r.length===0)return Gi(e);let o=Gi(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return BD(s),s},GD=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},KD=e=>{if(e===null||!FD(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Or.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var lne,cne,Mc,VD,Pf,pk=a(()=>{"use strict";Sf();Oc();lne=new Set(Object.values(Or)),cne=e=>lne.has(e),Mc=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},VD=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Pf=e=>{if(e[0]!=="write")return VD(),1;let r=Mc(e,"--key"),o=Mc(e,"--agent-run-id"),n=Mc(e,"--status"),s=Mc(e,"--summary"),i=Mc(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!cne(n)?(VD(),1):(xc({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Lt,ns=a(()=>{"use strict";Lt=()=>!0});var mk,qD,ss,Af=a(()=>{"use strict";mk=m(require("node:path")),qD=require("node:url");ns();ss=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=mk.default.resolve(t);return Lt()?r===mk.default.resolve(__filename):e===void 0?!1:r===(0,qD.fileURLToPath)(e)}});var gk,fk,yk,hk,ve,Sk=a(()=>{"use strict";gk=["block","warn","info"],fk=["seed","project","retired"],yk="warn",hk="29b404a2-d2be-45bf-8f88-143b675a94f2",ve={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var Pk,po,ZD,QD,Ak,on,eH=a(()=>{"use strict";Sk();Pk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),po=e=>typeof e=="string"?e:null,ZD=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],QD=e=>{if(!Pk(e))return null;let t=po(e.id)?.trim()??"",r=po(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=fk.find(d=>d===e.source)??"project",n=gk.find(d=>d===e.severity)??yk,s=Pk(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",l=po(s?.value)?.trim()??"",c=po(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:po(e.cause)?.trim()??"",avoidance:po(e.avoidance)?.trim()??"",check:{kind:i,value:l.length>0?l:t},keywords:ZD(e.keywords),tags:ZD(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:po(e.lastSeenAt),updatedAt:po(e.updatedAt),severity:n}},Ak=e=>!Pk(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>QD(t)).filter(t=>t!==null),syncedAt:po(e.syncedAt)},on=e=>e.filter(t=>t.source!=="retired").length});var is,bk=a(()=>{"use strict";is=e=>e.replace(/\s+/g," ").trim()});var nr,_k=a(()=>{"use strict";nr=e=>Math.ceil(e.length/4)});var bf,tH=a(()=>{"use strict";_k();bf=(e,t)=>{if(t<=0)return"";if(nr(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var jc,rH=a(()=>{"use strict";bk();jc=e=>`${is(e.id)}|${is(e.avoidance)}`});var oH=a(()=>{"use strict"});var dt=a(()=>{"use strict";Sk();eH();bk();_k();tH();rH();oH()});var as,Ki,Vi,qi,Nc,_f,nH,sH,iH,aH,lH,Dc,Hc,kf,Ji,Rf,kk,sr=a(()=>{"use strict";as="agent-witch-token-saver",Ki=`# BEGIN ${as}`,Vi=`# END ${as}`,qi=`<!-- BEGIN ${as} -->`,Nc=`<!-- END ${as} -->`,_f=".cursor/rules/agent-witch-check-context.mdc",nH=".cursor/mcp.json",sH=".codex/config.toml",iH=".codex/AGENTS.md",aH=".claude/settings.json",lH="declined-projects.json",Dc="agent-witch",Hc="agent-witch",kf=["mcp"],Ji="mcp-hook",Rf="check_context",kk=`${Hc} ${Ji} ${Rf}`});var Ef,wf,Tf,Yi,Rk,Fc,Cf=a(()=>{"use strict";dt();sr();Ef=ve.symptom,wf=ve.cause,Tf=ve.avoidance,Yi=64,Rk="token-saver.db",Fc=1});var Lf,Xi,mne,j_e,Zi=a(()=>{"use strict";Lf="agent-witch.js",Xi="deps.tar.gz",mne="install.sh",j_e={mainScript:`app/${Lf}`,depsArchive:`app/${Xi}`,installShell:mne}});var cH=a(()=>{"use strict";Zi()});var dH=a(()=>{"use strict";Zi();cH()});var $c,wk,If,gne,zc,Be,ea,Uc,Bc,ls,Tk=a(()=>{"use strict";$c=m(require("node:fs")),wk=m(require("node:path"));dH();q();If="install-version.json",gne=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zc=(e=L())=>wk.default.join(e,If),Be=(e=L())=>{let t=zc(e);if(!$c.default.existsSync(t))return null;try{let r=JSON.parse($c.default.readFileSync(t,"utf8"));return!gne(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},ea=(e,t=L())=>{let r=zc(t);$c.default.mkdirSync(wk.default.dirname(r),{recursive:!0}),$c.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Uc=(e=L())=>Be(e)?.bundleVersion??"267",Bc=(e,t)=>{let r=Be(e);if(r!==null)return r;let o={bundleVersion:"267",appOrigin:t,updatedAt:new Date().toISOString()};return ea(o,e),o},ls=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var uH,cs,Ck,Lk,Ik,vf,Mr,ds,vk=a(()=>{"use strict";uH=require("node:crypto"),cs=m(require("node:fs")),Ck=m(require("node:path"));q();Lk="self-update-log.ndjson",Ik=100,vf=(e=L())=>{let t=j(),r=t.installDir===e?t.logsDir:Xn({installDir:e,profileEmail:t.profileEmail});return Ck.default.join(r,Lk)},Mr=(e,t=L())=>{let r={id:(0,uH.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=vf(t);cs.default.mkdirSync(Ck.default.dirname(o),{recursive:!0});let n=cs.default.existsSync(o)?cs.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Ik+1)),JSON.stringify(r)];return cs.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},ds=(e=20,t=L())=>{let r=vf(t);if(!cs.default.existsSync(r))return[];let o=cs.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var xk,Q_e,Wk=a(()=>{"use strict";Zi();xk="deps",Q_e=`${"app"}/${Xi}`});var pH=a(()=>{"use strict";Wk()});var mH,nn,us,gH,Ok,Mk,fH=a(()=>{"use strict";mH=require("node:child_process"),nn=m(require("node:fs")),us=m(require("node:path"));Zi();Wk();gH=e=>us.default.join(e,"app",xk),Ok=e=>{let t=us.default.join(e,"app"),r=us.default.join(t,Xi);nn.default.existsSync(r)&&(nn.default.rmSync(gH(e),{recursive:!0,force:!0}),nn.default.mkdirSync(t,{recursive:!0}),(0,mH.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),nn.default.rmSync(r,{force:!0}))},Mk=e=>{nn.default.rmSync(us.default.join(e,"node_modules"),{recursive:!0,force:!0}),nn.default.rmSync(us.default.join(e,"package.json"),{force:!0}),nn.default.rmSync(us.default.join(e,"package-lock.json"),{force:!0})}});var yH=a(()=>{"use strict";pH();fH()});var hH=a(()=>{"use strict";xi()});var xf,Wf,Of=a(()=>{"use strict";xf="AGENT_WITCH_EXTERNAL_BRIDGE",Wf="AGENT_WITCH_EXTERNAL_LIVE"});var SH=a(()=>{"use strict";Of();xi()});var PH,Gc,AH=a(()=>{"use strict";PH=require("node:child_process");xi();Gc=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,PH.spawn)("systemctl",["--user","restart",Ir],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${Ir} exited ${o??"unknown"}`))})})});var jk=a(()=>{"use strict";xi();hH();SH();AH()});var Ut,ta=a(()=>{"use strict";Ut=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Kc,Mf,bH,yne,Nk,hne,_H,Sne,Fk,Pne,$k,ir,Vc,qc,zk,Dk,Hk,Jc,Yc,Uk,Bk,ra=a(()=>{"use strict";Kc=m(require("node:fs")),Mf=m(require("node:path"));ta();bH="active-writer-work.json",yne=1440*60*1e3,Nk=new Set,hne=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_H=e=>e.profileEmail===null?Mf.default.join(e.installDir,bH):Mf.default.join(e.installDir,"profiles",e.profileEmail,bH),Sne=e=>{let t=_H(e);if(!Kc.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Kc.default.readFileSync(t,"utf8"));if(!hne(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},Fk=(e,t)=>{let r=_H(e);Kc.default.mkdirSync(Mf.default.dirname(r),{recursive:!0}),Kc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Pne=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??Ut;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>yne},$k=e=>{let t=Sne(e);if(!Pne(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{Fk(e,r)}catch{}return r},ir=e=>$k(e).activeCount>0,Vc=e=>{let t=$k(e);Fk(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},qc=e=>{let t=$k(e),r=Math.max(0,t.activeCount-1);if(Fk(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of Nk)o()},zk=e=>(Nk.add(e),()=>{Nk.delete(e)}),Dk=null,Hk=null,Jc=e=>{Dk=e},Yc=e=>{Hk=e},Uk=()=>{let e=Dk;return Dk=null,e},Bk=()=>{let e=Hk;return Hk=null,e}});var Ge,jf=a(()=>{"use strict";Ge=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var oa,Nf,Xc,Gk=a(()=>{"use strict";oa="qwen2.5:7b",Nf="nomic-embed-text",Xc="Install Ollama from https://ollama.com/download"});var Zc,Kk,Df=a(()=>{"use strict";Gk();Zc=()=>`
agent_witch_ollama_api_up() {
  curl -fsS --max-time 2 http://127.0.0.1:11434/api/tags >/dev/null 2>&1
}

agent_witch_ensure_ollama_serving() {
  if agent_witch_ollama_api_up; then
    return 0
  fi
  local brew_bin
  brew_bin="$(command -v brew || true)"
  if [[ -n "\${brew_bin}" ]]; then
    "\${brew_bin}" services start ollama >/dev/null 2>&1 || true
  fi
  if agent_witch_ollama_api_up; then
    return 0
  fi
  if ! command -v ollama >/dev/null 2>&1; then
    echo "Ollama is not on PATH." >&2
    return 1
  fi
  nohup ollama serve >/dev/null 2>&1 &
  local attempt
  for attempt in 1 2 3 4 5 6 7 8 9 10; do
    if agent_witch_ollama_api_up; then
      return 0
    fi
    sleep 1
  done
  echo "Ollama is installed but not responding on http://127.0.0.1:11434." >&2
  return 1
}

agent_witch_ollama_has_model() {
  local model="$1"
  ollama list 2>/dev/null | awk 'NR>1 { print $1 }' | grep -Fx "\${model}" >/dev/null 2>&1
}

agent_witch_ensure_ollama_model() {
  local model="$1"
  local pull_log="$2"
  if agent_witch_ollama_has_model "\${model}"; then
    echo "Ollama model \${model} is already present."
    return 0
  fi
  echo "Pulling Ollama model \${model} in the background\u2026"
  nohup ollama pull "\${model}" >>"\${pull_log}" 2>&1 &
}

agent_witch_install_ollama_from_release() {
  if [[ "$(uname -s)" != "Darwin" ]]; then
    echo "Ollama is missing. ${Xc}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Xc}" >&2
    return 1
  fi
  tar -xzf "\${archive}" -C "\${ollama_home}/ollama"
  rm -f "\${archive}"
  bin="$(find "\${ollama_home}/ollama" -type f -name ollama | head -n 1)"
  if [[ -z "\${bin}" ]]; then
    echo "Ollama archive did not contain the ollama command." >&2
    return 1
  fi
  chmod +x "\${bin}"
  ln -sfn "\${bin}" "\${HOME}/.local/bin/ollama"
  export PATH="\${HOME}/.local/bin:\${PATH}"
}

agent_witch_ensure_ollama() {
  local ollama_home pull_log
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  pull_log="\${ollama_home}/logs/ollama-pull.log"
  mkdir -p "\${ollama_home}/logs"
  if ! command -v ollama >/dev/null 2>&1; then
    local brew_bin
    brew_bin="$(command -v brew || true)"
    if [[ -n "\${brew_bin}" ]]; then
      echo "Installing Ollama via Homebrew\u2026"
      "\${brew_bin}" install ollama || true
    fi
    if ! command -v ollama >/dev/null 2>&1; then
      agent_witch_install_ollama_from_release || return 1
    fi
  else
    echo "Ollama is already installed."
  fi
  agent_witch_ensure_ollama_serving || return 1
  agent_witch_ensure_ollama_model "${oa}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Nf}" "\${pull_log}"
}
`,Kk=()=>`
${Zc()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. AgentWitch will continue without it." >&2
`});var kH,Ane,Hf,Vk=a(()=>{"use strict";kH=require("node:child_process");q();Qn();Df();Ane=e=>new Promise(t=>{if(!$t()){t({exitCode:1,output:zi("Ollama")});return}let r=(0,kH.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Hf=async(e=Ane)=>{let t=`${Zc()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var sn,Ff,RH,bne,EH,sa,_ne,kne,Rne,na,ps,ms,wH=a(()=>{"use strict";sn=m(require("node:fs")),Ff=m(require("node:path"));yH();jk();pe();q();Zi();Tt();Tk();ra();jf();vk();Vk();RH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bne=e=>{let t=Qe(e),r=t===null?j():j(t);if(!sn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(sn.default.readFileSync(r.configPath,"utf8"));return!RH(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},EH=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!RH(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},sa=async e=>(await EH(e))?.bundleVersion??null,_ne=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Ff.default.join(t,r);sn.default.mkdirSync(Ff.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());sn.default.writeFileSync(n,s),r.endsWith(".js")&&sn.default.chmodSync(n,493)},kne=async()=>{if(process.platform==="linux"){try{await Gc()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}kc(),await rs()},Rne=(e,t)=>e!==null?Ge(e):t??wt,na=(e,t)=>({localBundleVersion:t,...e}),ps=async e=>{let t=L(),r=Be(t),o=r?.bundleVersion??null,n=await Hf();Mr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=bne(t),i=Rne(s,r?.appOrigin);if(i===null){let d=na({ok:!1,updated:!1,message:"Could not resolve the AgentWitch app origin for updates.",remoteBundleVersion:null},o);return Mr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let l=await EH(i);if(l===null){let d=na({ok:!1,updated:!1,message:"Could not fetch the remote AgentWitch install bundle.",remoteBundleVersion:null},o);return Mr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||ls(o,l.bundleVersion))){let d=na({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:l.bundleVersion},o);return Mr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:l.bundleVersion}),d}try{for(let f of l.scripts)await _ne(i,t,f);let d=Ff.default.join(t,Lf);sn.default.existsSync(d)&&sn.default.rmSync(d,{force:!0}),Ok(t),Mk(t),ea({bundleVersion:l.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=j(Qe(t));if(ir(u)){Yc("install-bundle-update");let f=na({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:l.bundleVersion},l.bundleVersion);return Mr({event:"update_applied",ok:!0,message:f.message,localBundleVersion:o,remoteBundleVersion:l.bundleVersion}),f}await kne();let g=na({ok:!0,updated:!0,message:`Updated AgentWitch bundle ${o??"unknown"} -> ${l.bundleVersion}.`,remoteBundleVersion:l.bundleVersion},l.bundleVersion);return Mr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:l.bundleVersion}),g}catch(d){let u=d instanceof Error?d.message:"AgentWitch self-update failed.",g=na({ok:!1,updated:!1,message:u,remoteBundleVersion:l.bundleVersion},o);return Mr({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:l.bundleVersion}),g}},ms=()=>{let e=L();return{local:Be(e),logs:ds(20,e)}}});var TH={};Et(TH,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>If,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Xc,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Nf,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>oa,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Lk,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Ik,appendAgentWitchSelfUpdateLog:()=>Mr,buildAgentWitchEnsureOllamaShell:()=>Zc,buildAgentWitchInstallScriptOllama:()=>Kk,buildAgentWitchSelfUpdateStatus:()=>ms,ensureAgentWitchInstallVersionRecorded:()=>Bc,ensureAgentWitchOllamaInstalled:()=>Hf,fetchAgentWitchRemoteInstallBundleVersion:()=>sa,isRemoteAgentWitchBundleVersionNewer:()=>ls,readAgentWitchInstallVersion:()=>Be,readAgentWitchSelfUpdateLogs:()=>ds,resolveAgentWitchAppOriginFromWsUrl:()=>Ge,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Uc,resolveAgentWitchInstallVersionPath:()=>zc,resolveAgentWitchSelfUpdateLogPath:()=>vf,runAgentWitchSelfUpdate:()=>ps,writeAgentWitchInstallVersion:()=>ea});var jr=a(()=>{"use strict";Tk();vk();wH();jf();Gk();Df();Vk()});var qk={};Et(qk,{buildAgentWitchSelfUpdateStatus:()=>ms,fetchAgentWitchRemoteInstallBundleVersion:()=>sa,runAgentWitchSelfUpdate:()=>ps});var Jk=a(()=>{"use strict";jr()});function ia(e){return(0,CH.createHash)("sha256").update(e.trim()).digest("hex")}var CH,$f=a(()=>{"use strict";CH=require("node:crypto")});var aa,Qc,Ene,la,Yk,zf=a(()=>{"use strict";aa=m(require("node:fs")),Qc=m(require("node:path"));$f();tt();Ene=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),la=e=>{if(!aa.default.existsSync(e))return null;try{let t=JSON.parse(aa.default.readFileSync(e,"utf8"));return!Ene(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:ia(t.pairingToken.trim())}catch{return null}},Yk=(e=L())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(la(Qc.default.join(e,"config.json")));let n=Qc.default.join(e,ct);if(!aa.default.existsSync(n))return t;for(let s of aa.default.readdirSync(n)){let i=Qc.default.join(n,s);aa.default.statSync(i).isDirectory()&&o(la(Qc.default.join(i,"config.json")))}return t}});var ca,ed=a(()=>{"use strict";ca="connection-health.json"});var gs,Uf,wne,td,Oe,Xk,Bf,Ke,Gf=a(()=>{"use strict";gs=m(require("node:fs")),Uf=m(require("node:path"));ed();wne=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),td=e=>e.profileEmail===null?Uf.default.join(e.installDir,ca):Uf.default.join(e.installDir,"profiles",e.profileEmail,ca),Oe=e=>{let t=td(e);if(!gs.default.existsSync(t))return null;try{let r=JSON.parse(gs.default.readFileSync(t,"utf8"));return!wne(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},Xk=e=>{let t=td(e);gs.default.existsSync(t)&&gs.default.rmSync(t,{force:!0})},Bf=(e,t)=>{let r=td(e),o=Oe(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};gs.default.mkdirSync(Uf.default.dirname(r),{recursive:!0}),gs.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ke=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var rd,LH=a(()=>{"use strict";ed();Gf();rd=(e,t)=>{if(!t.socketOpen)return!1;let r=Oe(e);return r===null?!1:!Ke(r,t.staleAfterMs??12e4,t.nowMs)}});var Zk,IH=a(()=>{"use strict";Gf();Zk=(e,t)=>!(e!==null&&!Ke(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var fs=a(()=>{"use strict";Gf();LH();IH();ed()});var Kf,Qk,Tne,Cne,vH,xH=a(()=>{"use strict";Kf=m(require("node:fs")),Qk=m(require("node:path"));q();Ue();fs();zf();Tne=12e4,Cne=e=>{let t=Qk.default.join(e,ct);return Kf.default.existsSync(t)?Kf.default.readdirSync(t).filter(r=>Kf.default.statSync(Qk.default.join(t,r)).isDirectory()):[]},vH=(e=L())=>{let t=null,r=-1;for(let o of Cne(e)){let n=j(o),s=Oe(n);if(s===null||Ke(s,Tne))continue;let i=la(n.configPath);if(i===null)continue;let l=Date.parse(s.lastAckAt);!Number.isFinite(l)||l<=r||(r=l,t=i)}return t}});var ys,eR=a(()=>{"use strict";ys={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var WH,Lne,Ine,OH,vne,tR,MH=a(()=>{"use strict";eR();WH=/you(?:'|')ve hit your session limit/i,Lne=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Ine=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,OH=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},vne=e=>{let t=Ine.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},tR=e=>{let t=e.trim();if(t.length===0)return null;if(WH.test(t))return{code:ys.SESSION_LIMIT,resetHint:vne(t),matchedLine:OH(t,WH)};for(let r of Lne)if(r.test(t))return{code:ys.PROVIDER_QUOTA,resetHint:null,matchedLine:OH(t,r)};return null}});var Vf,qf,rR,oR=a(()=>{"use strict";Vf="[[AGENT_RUN_WRITER_EXECUTION]]",qf="cli-writer-api-key-missing",rR="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var nR=a(()=>{"use strict";oR()});var jH=a(()=>{"use strict";nR()});var se,sR=a(()=>{"use strict";se={FOLDER_REQUIRED:"folder_required",FOLDER_NOT_REGISTERED:"folder_not_registered",FOLDER_NOT_FOUND:"folder_not_found",FOLDER_CHECK_UNAVAILABLE:"folder_check_unavailable",CODING_TOOLS_PAUSED:"coding_tools_paused"}});var hs,iR=a(()=>{"use strict";hs={computerFallback:"This computer",folderNotAllowed:"Blocked: that folder isn't this project's folder on {computer}. Nothing ran.",folderMissing:"This project has no folder on {computer} yet. Set it in AgentWitch Local, then send the task again.",folderMissingReason:"Set this project's folder on {computer} first.",pauseLabel:"Pause all coding tools",pauseHint:"Running tasks stop. New tasks wait until you turn this off.",pauseStatus:"Paused",pauseReason:"Paused on {computer}. Turn it back on in AgentWitch Local.",secretHidden:"Output hidden: it looked like it had a secret. Open the report on {computer}.",folderCheckUnavailablePlaceholder:"Couldn't check this project's folder on {computer}. Nothing ran."}});var One,da,Ss,NH=a(()=>{"use strict";sR();iR();One={[se.FOLDER_REQUIRED]:"folderMissing",[se.FOLDER_NOT_FOUND]:"folderMissing",[se.FOLDER_NOT_REGISTERED]:"folderNotAllowed",[se.FOLDER_CHECK_UNAVAILABLE]:"folderCheckUnavailablePlaceholder",[se.CODING_TOOLS_PAUSED]:"pauseReason"},da=(e,t=hs.computerFallback)=>hs[e].replace("{computer}",t),Ss=(e,t)=>da(One[e],t)});var Nr,HH,DH,Mne,aR,FH,lR=a(()=>{"use strict";Nr="[redacted-secret]",HH="[redacted-private-key]",DH="(?!\\[redacted)",Mne="(?:[A-Z0-9]+_)*(?:KEY|APIKEY|SECRET|TOKEN|PASSWORD|PASSWD|PAT|CREDENTIALS?)(?:_[A-Z0-9]+)*",aR=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----(?:[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----|[\s\S]*$)/g,replacement:HH},{pattern:new RegExp(`^(\\s*(?:export\\s+)?${Mne}\\s*=\\s*)${DH}(["']?)[^\\s"'#]{4,}\\2`,"gm"),replacement:`$1${Nr}`},{pattern:/("?pairing_?token"?\s*[:=]\s*"?)(?!\[redacted)[^\s",}]{6,}/gi,replacement:`$1${Nr}`},{pattern:/\bsk-[A-Za-z0-9_-]{20,}/g,replacement:Nr},{pattern:/\bgithub_pat_[A-Za-z0-9_]{20,}/g,replacement:Nr},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:Nr},{pattern:/\bxox[a-z]-[A-Za-z0-9-]{10,}/g,replacement:Nr},{pattern:/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,replacement:Nr},{pattern:/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{8,}=*/gi,replacement:`Bearer ${Nr}`},{pattern:new RegExp(`\\b(api[_-]?key|secret|token|password|passwd|credential)(["']?\\s*[:=]\\s*)${DH}(["']?)[^\\s"'\\\\(),;]{8,}\\3`,"gi"),replacement:`$1$2${Nr}`}],FH=[/-----(?:BEGIN|END) [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[A-Za-z0-9_-]{20,}/,/\bgithub_pat_[A-Za-z0-9_]{20,}/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[a-z]-[A-Za-z0-9-]{10,}/,/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{12,}/i]});var od,an,nd,$H=a(()=>{"use strict";lR();od=e=>FH.some(t=>t.test(e)),an=e=>{let t={replacements:0},r=aR.reduce((o,n)=>o.replace(n.pattern,(...s)=>{t.replacements+=1;let i=s.slice(1,-2).map(l=>typeof l=="string"?l:"");return n.replacement.replace(/\$(\d)/g,(l,c)=>i[Number(c)-1]??"")}),e);return{scrubbed:r,residualSecret:od(r),replacementCount:t.replacements}},nd=(e,t)=>{let r=an(e);return r.residualSecret?t:r.scrubbed}});var ut=a(()=>{"use strict";eR();MH();oR();nR();jH();sR();iR();NH();lR();$H()});var sd,zH,UH,Jf=a(()=>{"use strict";sd={maxTurns:30,maxMinutes:30,maxBudgetUsd:2},zH=["Read","Glob","Grep","Edit","Write","TodoWrite","Bash(git status *)","Bash(git diff *)","Bash(git log *)","Bash(git show *)"],UH=124});var cR,BH,Yf,id,ad,jne,Nne,Dne,GH,xe,Ae,Xf,Hne,Fne,$ne,Bt,ar=a(()=>{"use strict";cR=m(require("node:fs")),BH=m(require("node:os")),Yf=m(require("node:path"));Jf();id={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},ad=e=>e.trim().length>0,jne=e=>{let t=Yf.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},Nne=()=>{let e=BH.default.homedir(),t=Yf.default.join(e,".local","bin","agent");if(cR.default.existsSync(t))return t;let r=Yf.default.join(e,".local","bin","cursor-agent");return cR.default.existsSync(r)?r:id.cursorCommand},Dne=e=>{let t=e.trim();return!ad(t)||t===id.cursorCommand?Nne():t},GH=(e,t)=>jne(e)?t:["agent",...t],xe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Ae=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:ad(t)?t.trim():id.claudeCommand,codexCommand:ad(r)?r.trim():id.codexCommand,cursorCommand:Dne(o),antigravityCommand:ad(n)?n.trim():id.antigravityCommand}},Xf=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:GH(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Hne=["--permission-mode","dontAsk","--allowedTools",zH.join(","),"--max-turns",String(sd.maxTurns),"--max-budget-usd",sd.maxBudgetUsd.toFixed(2)],Fne=["-s","workspace-write","-c",'approval_policy="never"'],$ne=["--trust","--sandbox","enabled"],Bt=(e,t,r,o)=>{let n=t.trim();if(!ad(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json",...Hne,n]}:e==="codex"?{command:r.codexCommand,args:["exec",...Fne,n]}:e==="cursor"?{command:r.cursorCommand,args:GH(r.cursorCommand,[...s,"-p",...$ne,n])}:{command:r.antigravityCommand,args:[...s,"--sandbox","-p",n]}}});var ln,zne,Ps,Une,ua,ld=a(()=>{"use strict";ln=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,zne=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:ln(s.inputTokens)+ln(s.outputTokens)+ln(s.cacheReadInputTokens)+ln(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Ps=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let l=i,c=ln(l.input_tokens)+ln(l.cache_creation_input_tokens)+ln(l.cache_read_input_tokens),d=ln(l.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:zne(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},Une=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),ua=(e,t)=>{let r=Ps(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??Une(r)}}});var dR,Bne,Gne,uR,pR=a(()=>{"use strict";dR=e=>e.toLocaleString("en-US"),Bne=e=>e<.01?e.toFixed(4):e.toFixed(3),Gne=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Bne(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${dR(e.inputTokens)} in / ${dR(e.outputTokens)} out (${dR(e.totalTokens)} total)`,t].join(`
`)},uR=(e,t)=>{if(t===void 0)return e;let r=Gne(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Zf,mR=a(()=>{"use strict";Zf={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var As,gR,Qf,fR=a(()=>{"use strict";mR();As="auto",gR=e=>({value:As,label:`Auto (${Zf[e]})`}),Qf={anthropic:[gR("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[gR("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[gR("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var pa,cd,ey,ma=a(()=>{"use strict";mR();fR();pa=e=>{let t=e?.trim()??"";if(!(t.length===0||t===As))return t},cd=(e,t)=>{let r=pa(t);return r===void 0?Zf[e]:r},ey=e=>{let t=pa(e);return t===void 0?As:t}});var ty,Kne,Vne,ry,KH=a(()=>{"use strict";ty={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},Kne=e=>{let t=ty[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?ty["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?ty["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?ty["gemini-2.0-flash"]:null},Vne=(e,t,r)=>{let o=Kne(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},ry=e=>{let t=Vne(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var ga,qne,Jne,Yne,oy,VH=a(()=>{"use strict";KH();ga=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),qne=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ga(r.input_tokens),n=ga(r.output_tokens);return o===0&&n===0?null:ry({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Jne=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ga(r.prompt_tokens),n=ga(r.completion_tokens);return o===0&&n===0?null:ry({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Yne=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=ga(r.promptTokenCount),n=ga(r.candidatesTokenCount);return o===0&&n===0?null:ry({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},oy=(e,t,r)=>e==="anthropic"?qne(t,r):e==="openai"?Jne(t,r):Yne(t,r)});var Xne,yR,Zne,Qne,ese,tse,rse,hR,SR=a(()=>{"use strict";ma();VH();Xne=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},yR=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:cd(e,t.model)},Zne=async e=>{let t=yR("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=Xne(o);n.length>0&&e.onChunk?.(n);let s=oy("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},Qne=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},ese=async e=>{let t=yR("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=Qne(o);n.length>0&&e.onChunk?.(n);let s=oy("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},tse=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},rse=async e=>{let t=yR("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=tse(n);s.length>0&&e.onChunk?.(s);let i=oy("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},hR=async e=>{try{return e.provider==="anthropic"?await Zne(e):e.provider==="openai"?await ese(e):await rse(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var It,dd=a(()=>{"use strict";It=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var qH,ose,ny,PR=a(()=>{"use strict";qH=m(require("node:path")),ose="writer-api-secrets.json",ny=e=>qH.default.join(e,ose)});var AR,JH,nse,cn,yt,dn=a(()=>{"use strict";AR=m(require("node:fs"));ma();PR();JH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nse=e=>{if(!JH(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=pa(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},cn=e=>{let t=ny(e);if(!AR.default.existsSync(t))return{};try{let r=JSON.parse(AR.default.readFileSync(t,"utf8"));if(!JH(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=nse(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},yt=(e,t)=>cn(e)[t]??null});var rt,ud=a(()=>{"use strict";rt=e=>e==="api"?"api":"cli"});var YH,qe,bs,mo=a(()=>{"use strict";YH=m(require("node:path"));dd();dn();ud();qe=e=>YH.default.dirname(e),bs=(e,t)=>{if(rt(e.writerExecutionBackend)!=="api")return!1;let r=It(t);if(r===null)return!1;let o=qe(e.layout.configPath),n=yt(o,r);return n!==null&&n.apiKey.length>0}});var pd,bR=a(()=>{"use strict";pR();SR();dd();dn();mo();pd=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=It(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=qe(e.layout.configPath),l=yt(i,s);if(l===null){let d=Object.keys(cn(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in AgentWitch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await hR({provider:s,secret:l,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:uR(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var sse,XH,ZH,QH=a(()=>{"use strict";sse={paused:!1,updatedAt:null},XH={paused:!0,updatedAt:null},ZH=e=>{if(e===null)return sse;try{let t=JSON.parse(e);if(typeof t!="object"||t===null||typeof t.paused!="boolean")return XH;let r=t;return{paused:r.paused,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:null}}catch{return XH}}});var md,sy,ise,ase,_R,lse,_s,go,kR,iy=a(()=>{"use strict";md=m(require("node:fs")),sy=m(require("node:path"));QH();ise="coding-tools-pause.json",ase="unreadable",_R=e=>sy.default.join(sy.default.dirname(e),ise),lse=e=>{try{return md.default.readFileSync(e,"utf8")}catch(t){return t.code==="ENOENT"?null:ase}},_s=e=>ZH(lse(_R(e))),go=e=>_s(e).paused,kR=(e,t,r=new Date)=>{let o=_R(e),n={paused:t,updatedAt:r.toISOString()};md.default.mkdirSync(sy.default.dirname(o),{recursive:!0,mode:448});let s=`${o}.${process.pid}.tmp`;return md.default.writeFileSync(s,`${JSON.stringify(n)}
`,{mode:384}),md.default.renameSync(s,o),n}});var eF,fa,RR=a(()=>{"use strict";eF=require("node:child_process");ut();ar();ld();bR();mo();iy();fa=(e,t,r)=>new Promise(o=>{if(!xe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(go(e.layout.configPath)){o({exitCode:-1,output:Ss(se.CODING_TOOLS_PAUSED)});return}if(bs(e,t)){pd(e,t,r).then(o);return}let n=Bt(t,r,Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,eF.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],l=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{l.push(c.toString("utf8"))}),s.on("close",c=>{let d=ua(i.join("")),u=l.join("").trim(),g=[d.output.trim(),u].filter(f=>f.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var tF=a(()=>{"use strict"});var rF=a(()=>{"use strict";pR();RR();SR();tF();dn();mo()});var oF,nF,sF,iF=a(()=>{"use strict";oF="claude",nF="codex",sF="cursor"});var aF,cse,ER,gd,ay=a(()=>{"use strict";aF=m(require("node:path"));Tt();Ue();cse="ws://localhost:3000/api/agent-witch/ws",ER=e=>e.replace(/\/$/,""),gd=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return ER(t);let r=aF.default.basename(e.installDir);if(r===ec.production)return Qm;let o=e.configWsUrl?.trim()??"";return r===ec.localhost?o.length>0?ER(o):cse:o.length>0?ER(o):Qm}});var use,wR,TR=a(()=>{"use strict";iF();ay();ud();use=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wR=e=>{if(!use(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=gd({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??oF,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??nF,l=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??sF,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:l,antigravityCommand:c,pairingToken:d,writerExecutionBackend:rt(t.writerExecutionBackend),layout:e.layout}}}});var CR,LR,IR=a(()=>{"use strict";CR=m(require("node:fs"));q();TR();LR=e=>{let t=j(e);if(!CR.default.existsSync(t.configPath))return null;try{let r=JSON.parse(CR.default.readFileSync(t.configPath,"utf8")),o=wR({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var fd,lF=a(()=>{"use strict";fd=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var vR,pse,xR,cF=a(()=>{"use strict";vR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),pse=e=>{if(!vR(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!vR(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",l=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||l.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(g=>{if(!vR(g))return[];let f=typeof g.itemKey=="string"?g.itemKey.trim():"",y=typeof g.relativePath=="string"?g.relativePath:"",A=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return f.length===0||A.length===0?[]:[{itemKey:f,relativePath:y,contentSha256:A}]});return u.length===0?[]:[{componentId:i,versionId:l,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},xR=pse});var dF,mse,ly,WR=a(()=>{"use strict";dF=m(require("node:path")),mse=(e,t)=>{let r=t.trim();return dF.default.join(e,"components","store",r.slice(0,2),r)},ly=mse});var uF,gse,OR,pF=a(()=>{"use strict";uF=m(require("node:fs"));WR();gse=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=ly(e.installDir,n.contentSha256);uF.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this computer. Open Harness to sync, then retry.`},OR=gse});var yd,ya,fse,MR,yse,jR,NR=a(()=>{"use strict";yd=m(require("node:fs")),ya=m(require("node:path"));WR();fse=(e,t)=>ya.default.join(e.installDir,"runs",t,"overlay"),MR=(e,t)=>ya.default.join(fse(e,t),".cursor"),yse=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=MR(e,t);yd.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let l=ly(e.installDir,i.contentSha256);if(!yd.default.existsSync(l))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this computer."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?ya.default.join(n,c):ya.default.join(n,i.itemKey);yd.default.mkdirSync(ya.default.dirname(d),{recursive:!0}),yd.default.copyFileSync(l,d)}return{ok:!0}},jR=yse});var DR,mF,hse,hd,gF=a(()=>{"use strict";DR=m(require("node:fs")),mF=m(require("node:path")),hse=(e,t)=>{let r=mF.default.join(e.installDir,"runs",t);DR.default.existsSync(r)&&DR.default.rmSync(r,{recursive:!0,force:!0})},hd=hse});var Sse,HR,fF=a(()=>{"use strict";NR();Sse=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=MR(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},HR=Sse});var FR,Pse,Ase,bse,_se,kse,H,yF=a(()=>{"use strict";FR=m(require("node:fs"));ay();q();ud();Pse="claude",Ase="codex",bse="cursor",_se="agy",kse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=j();if(!FR.default.existsSync(e.configPath))return null;try{let t=JSON.parse(FR.default.readFileSync(e.configPath,"utf8"));if(!kse(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=gd({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:rt(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:Pse,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:Ase,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:bse,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:_se,pairingToken:s,layout:e}}catch{return null}}});var cy,hF,SF=a(()=>{"use strict";cy=m(require("node:fs"));PR();hF=(e,t)=>{let r=ny(e);cy.default.mkdirSync(e,{recursive:!0}),cy.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{cy.default.chmodSync(r,384)}catch{}}});var Sd,PF,dy=a(()=>{"use strict";Sd=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},PF=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Sd(t)}});var Pd,Rse,$R,zR,AF=a(()=>{"use strict";Pd=m(require("node:fs"));dn();SF();dy();ma();mo();Rse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$R=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=PF(s,n?.apiKey)?"":s,l=i.length>0?i:n?.apiKey;if(l===void 0||l.length===0)return e;let c=o!==void 0?pa(o):n?.model;return{...e,[t]:{apiKey:l,...c!==void 0?{model:c}:{}}}},zR=e=>{let t=qe(e.configPath),r={};if(Pd.default.existsSync(e.configPath))try{let n=JSON.parse(Pd.default.readFileSync(e.configPath,"utf8"));Rse(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Pd.default.mkdirSync(t,{recursive:!0}),Pd.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=$R($R($R(cn(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);hF(t,o)}});var uy,UR=a(()=>{"use strict";uy={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var BR,bF=a(()=>{"use strict";dd();dn();mo();mo();BR=(e,t)=>{if(bs(e,t)||t==="antigravity")return!1;let r=It(t);if(r===null)return!1;let o=qe(e.layout.configPath),n=yt(o,r);return n===null||n.apiKey.trim().length===0}});var _F,GR,KR=a(()=>{"use strict";_F=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},GR=async e=>{let t=_F(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=_F(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var Ese,VR,kF=a(()=>{"use strict";pe();IR();KR();Ese=1e4,VR=()=>GR({listProfileEmails:lf,readConfig:LR,pollIntervalMs:Ese,logWaiting:e=>{console.error(e)}})});var wse,qR,RF=a(()=>{"use strict";wse={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This AgentWitch Local cannot handle Connect/restart. Update from /download."},qR=e=>({status:e.status,reason:e.reason,message:wse[e.status]})});var Tse,JR,ks,EF=a(()=>{"use strict";ut();Tse=new Set(["terminal.stream.chunk","command.claude.result","command.claude.input_required","command.writer.session.chunk","command.writer.session.ready","harness.request.result","shell.data","run.heartbeat","dashboard.agentRun.get.result","dashboard.agentRun.list.result"]),JR=(e,t)=>typeof e=="string"?nd(e,t):Array.isArray(e)?e.map(r=>JR(r,t)):typeof e=="object"&&e!==null?Object.fromEntries(Object.entries(e).map(([r,o])=>[r,JR(o,t)])):e,ks=e=>typeof e.type!="string"||!Tse.has(e.type)||e.payload===void 0?{...e}:{...e,payload:JR(e.payload,da("secretHidden"))}});var Cse,YR,wF=a(()=>{"use strict";iy();Cse=1e3,YR=(e,t,r=Cse)=>{let o={paused:_s(e).paused},s=setInterval(()=>{let i=_s(e).paused;i!==o.paused&&(o.paused=i,t(i))},r);return s.unref?.(),()=>{clearInterval(s)}}});var py,Ad,TF=a(()=>{"use strict";py=(e,t,r=500)=>[...e.filter(o=>o!==t),t].slice(-r),Ad=(e=500)=>{let t={ids:[]};return{has:r=>t.ids.includes(r),add:r=>{t.ids=py(t.ids,r,e)}}}});var bd,CF=a(()=>{"use strict";ut();bd=e=>({type:"command.claude.result",payload:{exitCode:-1,output:Ss(e.code,e.computer),errorCode:e.code,...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{}},...e.requestId!==void 0?{requestId:e.requestId}:{}})});var Z=a(()=>{"use strict";RR();rF();IR();ay();lF();cF();pF();NR();gF();fF();ud();yF();AF();dn();mo();dy();ma();UR();bR();mo();bF();dd();dn();kF();TR();KR();RF();EF();iy();wF();TF();CF()});var LF,XR,IF=a(()=>{"use strict";LF=m(require("node:path"));q();Ue();xH();$f();zf();Z();XR=(e=L())=>{let t=vH(e);if(t!==null)return t;let r=Qe(e);if(r!==null){let n=la(LF.default.join(e,ct,r,"config.json"));if(n!==null)return n}let o=H()?.pairingToken.trim()??"";return o.length===0?null:ia(o)}});var my,vF,Lse,Ise,xF,gy,_d,fy,kd=a(()=>{"use strict";my=m(require("node:fs")),vF=m(require("node:path")),Lse="wake-port.json",Ise=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xF=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,gy=e=>vF.default.join(e,Lse),_d=e=>{let t=gy(e);if(!my.default.existsSync(t))return null;try{let r=JSON.parse(my.default.readFileSync(t,"utf8"));if(Ise(r)&&xF(r.wakePort))return r.wakePort}catch{return null}return null},fy=(e,t)=>{if(!xF(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=gy(e);my.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var VTe,qTe,JTe,lr,WF,Rd=a(()=>{"use strict";q();kd();tt();kd();VTe=tn(),qTe=`${Re()}-wake`,JTe=Re(),lr=()=>{let e=L();return Fi({filePort:_d(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:tn(e)})},WF=e=>{let t=L();_d(t)===null&&fy(t,e)}});var OF=a(()=>{"use strict";$f();pe();zf();IF();Z();Rd()});var ZR,Ed,wd,MF=a(()=>{"use strict";ZR=m(require("node:os"));OF();Ed=()=>{let e=Pe();return{ok:!0,port:lr(),hostname:ZR.default.hostname(),profileCount:e.length}},wd=()=>{let e=Pe(),t=XR(),r=Yk();return{hostname:ZR.default.hostname(),port:lr(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var QR=a(()=>{"use strict";MF()});var jF,NF,DF,yy,ha=a(()=>{"use strict";jF="materialization.json",NF="backups",DF=".gitignore",yy=e=>`harness-set:${e.trim()}`});var HF,FF,hy,$F=a(()=>{"use strict";HF=m(require("node:crypto")),FF=m(require("node:fs")),hy=e=>{try{let t=FF.default.readFileSync(e);return HF.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var un,Rs,vse,zF,eE,UF=a(()=>{"use strict";un=m(require("node:fs")),Rs=m(require("node:path"));$F();vse=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Rs.default.join(t,n,o);return un.default.mkdirSync(Rs.default.dirname(s),{recursive:!0}),un.default.copyFileSync(r,s),Rs.default.relative(e,s).replaceAll("\\","/")},zF=e=>{let t=Rs.default.join(e.repoRoot,e.repoRelativeDestination),r=hy(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(un.default.existsSync(t)){let n=hy(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=vse(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return un.default.mkdirSync(Rs.default.dirname(t),{recursive:!0}),un.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return un.default.mkdirSync(Rs.default.dirname(t),{recursive:!0}),un.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},eE=e=>{let t=hy(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var tE,BF,Sa,Sy=a(()=>{"use strict";tE=m(require("node:fs"));ha();BF=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sa=e=>{if(!tE.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(tE.default.readFileSync(e,"utf8"));if(BF(t)&&t.version===1&&BF(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var pn,Py,Ay,rE=a(()=>{"use strict";pn=m(require("node:fs")),Py=m(require("node:path"));ha();Ay=e=>{let t=new Set(e.setSlugs.map(s=>yy(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let l=Py.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Py.default.join(e.repoRoot,i.backupPath);pn.default.existsSync(c)?(pn.default.mkdirSync(Py.default.dirname(l),{recursive:!0}),pn.default.copyFileSync(c,l),o.push(s)):pn.default.existsSync(l)&&pn.default.rmSync(l,{force:!0})}else pn.default.existsSync(l)&&pn.default.rmSync(l,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var oE,Pa,by=a(()=>{"use strict";oE=m(require("node:path"));ha();Pa=e=>({ledgerFilePath:oE.default.join(e.metaDirPath,jF),backupsDirPath:oE.default.join(e.metaDirPath,NF)})});var nE,GF,KF=a(()=>{"use strict";nE=m(require("node:path")),GF=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return nE.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return nE.default.posix.join(s,e,n)}});var sE,VF,Cd,iE=a(()=>{"use strict";sE=m(require("node:fs")),VF=m(require("node:path")),Cd=(e,t)=>{sE.default.mkdirSync(VF.default.dirname(e),{recursive:!0}),sE.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var aE,xse,je,fo=a(()=>{"use strict";aE=m(require("node:os")),xse=e=>{let t=e.trim();return t.startsWith("~/")?`${aE.default.homedir()}${t.slice(1)}`:t==="~"?aE.default.homedir():t},je=xse});var _y,qF,Wse,JF,YF=a(()=>{"use strict";_y=m(require("node:fs")),qF=m(require("node:path"));ha();rn();Wse=`*
!${ff}
`,JF=e=>{let t=qF.default.join(e,DF);_y.default.existsSync(t)||(_y.default.mkdirSync(e,{recursive:!0}),_y.default.writeFileSync(t,Wse))}});var Es,Gt,ws=a(()=>{"use strict";Es=m(require("node:path"));rn();fo();Gt=e=>{let t=je(e),r=Es.default.join(t,Cc);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Es.default.join(r,"rag"),memoryDirPath:Es.default.join(r,ID),reportsDirPath:Es.default.join(r,xD),metaFilePath:Es.default.join(r,ff),ragChunksFilePath:Es.default.join(r,"rag",vD)}}});var Dr,ZF,Ose,Mse,pt,ky=a(()=>{"use strict";Dr=m(require("node:fs")),ZF=m(require("node:path"));rn();YF();ws();Ose=(e,t)=>{if(Dr.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Dr.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},Mse=e=>{Dr.default.existsSync(e.ragChunksFilePath)||Dr.default.writeFileSync(e.ragChunksFilePath,"");let t=ZF.default.join(e.memoryDirPath,Bi);Dr.default.existsSync(t)||Dr.default.writeFileSync(t,"")},pt=e=>{let t=Gt(e.projectFolderPath);return Dr.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Dr.default.mkdirSync(t.ragDirPath,{recursive:!0}),Dr.default.mkdirSync(t.memoryDirPath,{recursive:!0}),JF(t.metaDirPath),Ose(t,e),Mse(t),{ok:!0,layout:t}}});var QF,e$,t$,r$,Ry,Ey=a(()=>{"use strict";QF="components",e$="store",t$="versions",r$="installed.json",Ry=e=>`harness-set:${e.trim()}`});var lE,o$,wy,cE=a(()=>{"use strict";lE=m(require("node:fs")),o$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wy=e=>{if(!lE.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(lE.default.readFileSync(e,"utf8"));if(o$(t)&&t.version===1&&o$(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var Ld,Aa,Ty=a(()=>{"use strict";Ld=m(require("node:path"));Ey();Aa=e=>{let t=Ld.default.join(e,QF);return{componentsRootDir:t,storeDir:Ld.default.join(t,e$),versionsDir:Ld.default.join(t,t$),installedFilePath:Ld.default.join(t,r$)}}});var dE,n$,Cy,Ly,Iy=a(()=>{"use strict";dE=m(require("node:crypto")),n$=m(require("node:fs")),Cy=e=>dE.default.createHash("sha256").update(e,"utf8").digest("hex"),Ly=e=>{try{let t=n$.default.readFileSync(e);return dE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var uE,s$,i$,a$=a(()=>{"use strict";uE=m(require("node:fs")),s$=m(require("node:path")),i$=(e,t)=>{uE.default.mkdirSync(s$.default.dirname(e),{recursive:!0}),uE.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var pE,mE,l$,c$=a(()=>{"use strict";pE=m(require("node:fs")),mE=m(require("node:path")),l$=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=mE.default.join(e,r),n=mE.default.join(o,`${t.versionId}.json`);pE.default.mkdirSync(o,{recursive:!0}),pE.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var vy,d$,u$,p$=a(()=>{"use strict";vy=m(require("node:fs")),d$=m(require("node:path"));Iy();u$=e=>{let t=Cy(e.content),r=d$.default.join(e.storeDir,t);return vy.default.existsSync(r)||(vy.default.mkdirSync(e.storeDir,{recursive:!0}),vy.default.writeFileSync(r,e.content)),t}});var gE,m$,jse,xy,fE=a(()=>{"use strict";gE=m(require("node:fs")),m$=m(require("node:path"));Ey();cE();Ty();Iy();a$();c$();p$();jse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xy=e=>{let t=Aa(e.installDir),r=Ry(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!jse(i))continue;let l=typeof i.path=="string"?i.path.trim():"";if(l.length===0)continue;let c=m$.default.join(e.harnessRootDir,l);if(!gE.default.existsSync(c))continue;let d=gE.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Ly(c);if(u!==null){if(Cy(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);u$({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:l,contentSha256:u})}}if(n.length===0)return;l$(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=wy(t.installedFilePath);i$(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var hE,yE,g$,f$=a(()=>{"use strict";hE=m(require("node:fs"));fE();cE();Ty();yE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),g$=e=>{if(!hE.default.existsSync(e.harnessManifestPath))return;let t=Aa(e.installDir),r=wy(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(hE.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!yE(o)||o.version!==1||!yE(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!yE(s))continue;let i=typeof s.version=="number"?s.version:1,l=Array.isArray(s.items)?s.items:[];xy({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:l}})}}});var SE,y$,h$,S$=a(()=>{"use strict";SE=m(require("node:fs")),y$=m(require("node:path")),h$=e=>{let t=e.componentId.replaceAll("/","_"),r=y$.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!SE.default.existsSync(r))return null;try{let o=JSON.parse(SE.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Wy,Oy,P$,A$=a(()=>{"use strict";Wy=m(require("node:fs")),Oy=m(require("node:path"));Ey();f$();S$();Ty();Iy();P$=e=>{g$({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Aa(e.layout.installDir),r=Ry(e.setSlug),o=h$({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(l=>l.id===e.manifestItemId);if(i!==void 0){let l=Oy.default.join(t.storeDir,i.contentSha256);if(Wy.default.existsSync(l)&&Ly(l)===i.contentSha256)return l}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Oy.default.join(e.layout.harnessRootDir,n):Oy.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Wy.default.existsSync(s))return null;try{if(!Wy.default.statSync(s).isFile())return null}catch{return null}return s}});var b$,Nse,PE,Hr,Id=a(()=>{"use strict";Sy();by();ws();b$="harness-set:",Nse=e=>{let t=e.trim();if(!t.startsWith(b$))return null;let r=t.slice(b$.length).trim();return r.length>0?r:null},PE=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=Nse(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Hr=e=>{let t=Gt(e),{ledgerFilePath:r}=Pa(t),o=Sa(r);return PE(o)}});var My,AE,vd,Dse,yo,xd,ba=a(()=>{"use strict";My=m(require("node:fs")),AE=m(require("node:os")),vd=m(require("node:path")),Dse=()=>My.default.realpathSync(vd.default.resolve(AE.default.homedir())),yo=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?vd.default.join(AE.default.homedir(),t.slice(1)):t,o;try{o=My.default.realpathSync(vd.default.resolve(r))}catch{return null}let n=Dse();return o===n||o.startsWith(`${n}${vd.default.sep}`)?o:null},xd=e=>{let t=yo(e);if(t===null)return null;try{if(!My.default.statSync(t).isFile())return null}catch{return null}return t}});var bE,_E=a(()=>{"use strict";bE=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Ny,_$,jy,Hse,Wd,kE=a(()=>{"use strict";Ny=m(require("node:fs")),_$=m(require("node:path"));ha();UF();Sy();rE();by();KF();iE();fo();ky();A$();Id();ba();_E();jy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hse=e=>{if(!Ny.default.existsSync(e))return null;try{let t=JSON.parse(Ny.default.readFileSync(e,"utf8"));if(jy(t)&&t.version===1)return t}catch{return null}return null},Wd=e=>{let t=[...new Set(e.setSlugs.map(p=>p.trim()).filter(p=>p.length>0))],r=je(e.projectFolderPath),o=yo(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Ny.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=pt({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:l}=Pa(s.layout),d=Hr(o).filter(p=>!t.includes(p)),u=Sa(i),g=0;if(d.length>0){let p=Ay({repoRoot:o,setSlugs:d,ledger:u});u=p.ledger,g=p.summary.removedPaths.length}if(t.length===0)return Cd(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let f=Hse(e.layout.harnessManifestPath);if(f===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=jy(f.sets)?f.sets:{},A=0,P=0,S=0;for(let p of t){let b=y[p];if(!jy(b))return{ok:!1,errorMessage:`Harness set "${p}" is not installed locally.`};let C=typeof b.version=="number"?String(b.version):"1",h=yy(p),_=Array.isArray(b.items)?b.items:[];for(let R of _){if(!jy(R))continue;let E=typeof R.path=="string"?R.path.trim():"";if(E.length===0)continue;let T=bE(E);if(T===null)continue;let x=GF(p,T),W=_$.default.posix.join(".cursor",x).replaceAll("\\","/"),z=typeof R.id=="string"?R.id.trim():"",O=P$({layout:e.layout,setSlug:p,setVersion:typeof b.version=="number"?b.version:1,manifestItemPath:E,manifestItemId:z});if(O===null)continue;let U=zF({repoRoot:o,backupsDir:l,repoRelativeDestination:W,sourceAbsolutePath:O,componentId:h,versionId:C,ledger:u});if(U.kind==="skipped_unchanged"){P+=1;continue}if(U.kind==="backed_up_user_file"){S+=1,A+=1,u={version:1,entries:{...u.entries,[W]:eE({componentId:h,versionId:C,sourceAbsolutePath:O,backupPath:U.backupPath})}};continue}A+=1,u={version:1,entries:{...u.entries,[W]:eE({componentId:h,versionId:C,sourceAbsolutePath:O})}}}}return A===0&&P===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Cd(i,u),{ok:!0,writtenFileCount:A,skippedFileCount:P,backedUpFileCount:S,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var k$,Dy,Fse,$se,zse,Use,Bse,Gse,Kse,Vse,qse,Od,Hy=a(()=>{"use strict";k$=m(require("node:crypto")),Dy=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Fse=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},$se=(e,t)=>{let r=Fse(t),o=Dy(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},zse=(e,t,r)=>{let o=$se(t,r);return`shared/items/${e}/${o}`},Use=["rules","skills","commands","instructions","agents"],Bse=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Gse=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Kse=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Vse=e=>k$.default.createHash("sha256").update(e,"utf8").digest("hex"),qse=e=>({id:e.id,kind:e.kind,title:e.title,path:zse(e.id,e.kind,e.title),contentSha256:Vse(e.content)}),Od=e=>{let t=new Date().toISOString(),r=e.existingManifest??Bse(e.hostname,t),o=Dy(e.bundle.slug),n=Kse(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...Use.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:l}=e.bundle.items.reduce((d,u)=>{let g=qse(u);return{files:[...d.files,{relativePath:g.path,content:u.content}],nextItems:Gse(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:l}}},directories:s,files:i}}});var mn,R$,Fy,Jse,Ts,RE=a(()=>{"use strict";mn=m(require("node:fs")),R$=m(require("node:os")),Fy=m(require("node:path"));Hy();Jse=e=>{if(!mn.default.existsSync(e))return null;try{let t=JSON.parse(mn.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Ts=e=>{try{let t=Jse(e.layout.harnessManifestPath),r=Od({bundle:e.bundle,hostname:R$.default.hostname(),existingManifest:t});mn.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)mn.default.mkdirSync(Fy.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Fy.default.join(e.layout.harnessRootDir,o.relativePath);mn.default.mkdirSync(Fy.default.dirname(n),{recursive:!0}),mn.default.writeFileSync(n,o.content)}return mn.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var EE,E$=a(()=>{"use strict";RE();kE();EE=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Ts({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Wd({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var w$,T$=a(()=>{"use strict";w$=["rule","skill","command","instruction","agent"]});var C$,Yse,Xse,Fr,wE=a(()=>{"use strict";T$();C$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yse=e=>typeof e=="string"&&w$.includes(e),Xse=e=>{if(!C$(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Yse(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Fr=e=>{if(!C$(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=Xse(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var L$,Zse,TE,I$=a(()=>{"use strict";L$=require("node:zlib");wE();Zse="x-agent-witch-token",TE=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[Zse]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,L$.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),l=Fr(i);return l===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:l}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var LE,CE,$r,v$=a(()=>{"use strict";LE=m(require("node:fs")),CE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$r=e=>{if(!LE.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(LE.default.readFileSync(e.harnessManifestPath,"utf8"));if(!CE(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=CE(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!CE(i))return null;let l=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:l,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:l,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var $y,x$=a(()=>{"use strict";$y=()=>"~"});var W$,O$,M$=a(()=>{"use strict";W$=require("node:crypto"),O$=e=>`local-${(0,W$.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var IE,j$=a(()=>{"use strict";IE=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Md,zy,vE=a(()=>{"use strict";Md=m(require("node:path")),zy=e=>{let t=Md.default.dirname(e),r=Md.default.basename(t);return r==="agents"?Md.default.basename(Md.default.dirname(t)):r}});var jd,ho,N$,Qse,eie,tie,Uy,D$,xE=a(()=>{"use strict";jd=m(require("node:fs")),ho=m(require("node:path"));M$();j$();vE();N$=new Set(["node_modules",".git","dist","build",".next","coverage"]),Qse=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},eie=(e,t)=>{let r=ho.default.basename(t);if(e==="skill"){let o=t.split(ho.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},tie=e=>{let t=[],r=(n,s)=>{let i;try{i=jd.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let l of i){if(l.name.startsWith(".")||l.isDirectory()&&N$.has(l.name))continue;let c=ho.default.join(n,l.name),d=s?ho.default.join(s,l.name):l.name;if(l.isDirectory()){r(c,d);continue}if(!l.isFile())continue;IE(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=ho.default.join(e,n);jd.default.existsSync(s)&&r(s,n)}let o=ho.default.join(e,"skills");return jd.default.existsSync(o)&&r(o,"skills"),t},Uy=e=>{let t=tie(e);if(t.length===0)return null;let r=ho.default.dirname(e),o=zy(e),n=Qse(o),s=t.map(i=>{let l=IE(i.relativePath.replaceAll("\\","/"));if(l===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:O$(i.absolutePath),kind:l,title:eie(l,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},D$=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=jd.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let l of i){if(r())return;if(!l.isDirectory()||N$.has(l.name))continue;let c=ho.default.join(n,l.name);if(l.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var H$,WE,rie,OE,F$=a(()=>{"use strict";H$=m(require("node:fs")),WE=m(require("node:path"));xE();ba();rie=e=>{let t=yo(e.trim());if(t===null)return null;if(WE.default.basename(t)===".cursor")return t;let r=WE.default.join(t,".cursor");try{if(H$.default.statSync(r).isDirectory())return yo(r)}catch{return null}return null},OE=e=>{let t=rie(e.projectPath);if(t===null)return null;let r=Uy(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,l)=>i.proposedName.localeCompare(l.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var $$,oie,By,ME,z$=a(()=>{"use strict";$$=m(require("node:path"));xE();ba();vE();oie=5,By=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},ME=e=>{let t=yo(e.scanRoot.trim());if(t===null)return By(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of D$(t,oie,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=yo(s);if(i===null)continue;let l=zy(i);By(e.response,"folder",{cursorDir:i,groupName:l,repoPath:$$.default.dirname(i)});let c=Uy(i);c!==null&&(r.push(c),By(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:l,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return By(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var U$,B$,G$=a(()=>{"use strict";U$=m(require("node:path")),B$=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:U$.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var mt,K$,jE,nie,NE,DE,Gy,HE,Nd,V$=a(()=>{"use strict";mt=m(require("node:fs")),K$=m(require("node:os")),jE=m(require("node:path"));Hy();fE();ba();G$();nie=e=>{if(!mt.default.existsSync(e))return null;try{let t=JSON.parse(mt.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},NE=e=>{let t=e.hostname??K$.default.hostname(),r=nie(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let l=i.items.filter(u=>u.include);if(l.length===0)continue;let c=[];for(let u of l){let g=xd(u.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let f=mt.default.readFileSync(g,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:f,setSlugs:[i.slug]})}let d=Od({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{mt.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)mt.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let l=jE.default.join(e.layout.harnessRootDir,i.relativePath);mt.default.mkdirSync(jE.default.dirname(l),{recursive:!0}),mt.default.writeFileSync(l,i.content)}mt.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Dy(i.slug),d=r.sets[c];d!==void 0&&xy({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},DE="reveal-cache.json",Gy=(e,t)=>{mt.default.mkdirSync(e.harnessRootDir,{recursive:!0}),mt.default.writeFileSync(`${e.harnessRootDir}/${DE}`,`${JSON.stringify(t,null,2)}
`)},HE=e=>{let t=`${e.harnessRootDir}/${DE}`;mt.default.existsSync(t)&&mt.default.unlinkSync(t)},Nd=e=>{let t=`${e.harnessRootDir}/${DE}`;if(!mt.default.existsSync(t))return null;try{let r=JSON.parse(mt.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return B$(r)}catch{return null}return null}});var gn=a(()=>{"use strict";kE();E$();_E();RE();I$();wE();Hy();v$();x$();F$();ba();z$();V$()});var FE,q$=a(()=>{"use strict";gn();tt();FE=e=>{let t=j(e.profileEmail);return Ts({bundle:e.bundle,layout:t})}});var J$=a(()=>{"use strict";q$();gn()});var sie,Y$,iie,X$,Cs,Ky,Z$=a(()=>{"use strict";sie=["agentwitch.com","www.agentwitch.com"],Y$=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,iie=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},X$=e=>{let t=iie(e);return!!(sie.includes(t)||Y$.test(e.trim().toLowerCase()))},Cs=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return X$(r)?Y$.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Ky=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Cs(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Dd=a(()=>{"use strict";Z$()});var So,Hd=a(()=>{"use strict";So=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Fd,Q$=a(()=>{"use strict";J$();Dd();Hd();Fd=e=>{if(!So(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Fr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Cs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=FE({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var $E=a(()=>{"use strict";Q$()});var aie,_a,zE=a(()=>{"use strict";aie=e=>e==="hourly"||e==="daily"||e==="weekdays",_a=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",l=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!aie(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:l,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var $d,Vy,ez,tz,UE,cr,qy,Jy,Yy,Xy,Zy=a(()=>{"use strict";$d=m(require("node:fs")),Vy=m(require("node:path"));zE();ez="automations.json",tz=e=>e.profileEmail!==null?Vy.default.join(e.installDir,"profiles",e.profileEmail,ez):Vy.default.join(e.installDir,ez),UE=()=>({version:1,automations:[]}),cr=e=>{let t=tz(e);if(!$d.default.existsSync(t))return UE();try{let r=JSON.parse($d.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?UE():{version:1,automations:r.automations.flatMap(n=>{let s=_a(n);return s!==null?[s]:[]})}}catch{return UE()}},qy=(e,t)=>{let r=tz(e);$d.default.mkdirSync(Vy.default.dirname(r),{recursive:!0}),$d.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Jy=(e,t)=>{qy(e,{version:1,automations:t})},Yy=(e,t)=>{let o=cr(e).automations.filter(n=>n.id!==t.id);qy(e,{version:1,automations:[...o,t]})},Xy=(e,t)=>cr(e).automations.find(r=>r.id===t)??null});var Q,gt=a(()=>{"use strict";Q="x-agent-witch-token"});var BE=a(()=>{"use strict";jf();Df()});var K,Ls,GE,zd,KE,lie,VE,Is,vs,qE,zr=a(()=>{"use strict";gt();BE();K=e=>{let t=Ge(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Ls=e=>({[Q]:e,"Content-Type":"application/json"}),GE=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Ls(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",l=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||l.length===0?null:{id:i,prompt:l,writerAgent:c}}catch{return null}},zd=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Ls(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},KE=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Ls(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},lie=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",l=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||l.length===0||r.push({id:s,name:i,folderPath:l})}return r},VE=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Ls(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",l=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||l.length===0||c.length===0?null:{id:i,name:l,folderPath:c}}catch{return null}},Is=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Ls(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return lie(r)}catch{return null}},vs=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Ls(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},qE=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Ls(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var xs,rz,oz,cie,JE,nz,YE=a(()=>{"use strict";xs=m(require("node:fs")),rz=m(require("node:path")),oz=e=>rz.default.join(e.harnessRootDir,"projects-registry.json"),cie=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),JE=e=>{let t=oz(e);if(!xs.default.existsSync(t))return[];try{let r=JSON.parse(xs.default.readFileSync(t,"utf8"));return cie(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},nz=e=>{let t=oz(e);if(!xs.default.existsSync(t))return;let r=`${t}.migrated`;if(xs.default.existsSync(r)){xs.default.unlinkSync(t);return}xs.default.renameSync(t,r)}});var sz,die,uie,iz,az=a(()=>{"use strict";fo();sz=e=>je(e),die=e=>new Set(e.map(t=>sz(t.folderPath))),uie=e=>new Set(e.map(t=>t.id)),iz=(e,t)=>{let r=die(t),o=uie(t),n=[],s=new Set;for(let i of e){let l=sz(i.projectFolderPath);l.length!==0&&(r.has(l)||s.has(l)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(l),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var XE,ZE=a(()=>{"use strict";zr();YE();az();XE=async(e,t)=>{let r=JE(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=K({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Is(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=iz(r,n),i=r.length-s.length,l=0,c=0;for(let d of s)await VE(o,{name:d.name,folderPath:d.folderPath})?l+=1:c+=1;return c===0&&nz(e),{migratedCount:l,skippedCount:i,failedCount:c}}});var QE,dr,ka=a(()=>{"use strict";QE=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),dr=(e,t)=>e.find(r=>r.id===t)??null});var Ur,Ra=a(()=>{"use strict";zr();ZE();ka();Ur=async(e,t)=>{t!==void 0&&await XE(t,e);let r=K({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Is(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach AgentWitch Cloud. Check the computer connection and try again."};let n=QE(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in AgentWitch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from AgentWitch Cloud.`}}});var lz=a(()=>{"use strict"});var ew,pie,Qy,tw=a(()=>{"use strict";ew=m(require("node:fs"));ws();pie=e=>{let t=Gt(e);if(!ew.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(ew.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Qy=pie});var rw,ow,cz=a(()=>{"use strict";rw=m(require("node:path"));fo();tw();ow=e=>{let t=rw.default.resolve(je(e)),r=o=>{let{projectId:n}=Qy(o);if(n!==null)return n;let s=rw.default.dirname(o);return s===o?null:r(s)};return r(t)}});var mie,gie,eh,nw=a(()=>{"use strict";mie="Default",gie=e=>e.trim().toLowerCase()===mie.toLowerCase(),eh=gie});var th,rh,oh=a(()=>{"use strict";th={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},rh=e=>{let t=Object.entries(th).find(([,r])=>r===e);return t===void 0?null:t[0]}});var dz,Ee,pz,fie,sw,iw,uz,yie,hie,Ud,aw,Sie,Pie,Aie,mz,gz=a(()=>{"use strict";dt();oh();dz="new",Ee=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),pz={block:"Must fix",warn:"Warning",info:"Note"},fie={seed:"Built-in",project:"This project",retired:"Retired"},sw=6e4,iw=60*sw,uz=24*iw,yie=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<sw)return"Last hit just now";if(o<iw)return`Last hit ${Math.floor(o/sw)} min ago`;if(o<uz)return`Last hit ${Math.floor(o/iw)}h ago`;let n=Math.floor(o/uz);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},hie=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},Ud=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,aw=e=>e?{retired:"1"}:{},Sie=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=l=>`<option value="${l}"${r===l?" selected":""}>${pz[l]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${Ee(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${Ee(t?.id??"")}" />
      <input type="hidden" name="tags" value="${Ee((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${ve.symptom}" value="${Ee(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${ve.avoidance}" rows="3" placeholder="What to do instead">${Ee(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${ve.cause}" rows="2" placeholder="What leads to this trap">${Ee(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${Ee((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${ve.checkValue}" value="${Ee(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${Ee(Ud(e.projectId,aw(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},Pie=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${Ee(r)}" />
            <input type="hidden" name="pitfallId" value="${Ee(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${Ee(Ud(r,{...aw(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,l=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>Ee(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${Ee(t.id)}">
        <p><strong>${Ee(t.symptom)}</strong> <span class="muted">\xB7 ${pz[t.severity]} \xB7 ${fie[t.source]}</span></p>
        <p>Fix: ${Ee(t.avoidance)}</p>
        ${l}
        <p class="muted">${Ee(yie(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${Ee(hie(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},Aie=e=>{let t=e.postPaths??th;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this computer on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=on(o),s=n>=64,i=e.showRetired?o:o.filter(y=>y.source!=="retired"),l=e.editId===null?null:e.editId===dz?s?null:{item:null}:(()=>{let y=o.find(A=>A.id===e.editId&&A.source!=="retired");return y===void 0?null:{item:y}})(),c=l===null?"":Sie({projectId:e.projectId,item:l.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">Limit reached: ${64} active pitfalls. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${Ee(Ud(e.projectId,{...aw(e.showRetired),edit:dz}))}">Add pitfall</a>`,u=e.showRetired?`<a class="btn btn-secondary" href="${Ee(Ud(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${Ee(Ud(e.projectId,{retired:"1"}))}">Show retired</a>`,g=o.length>0?"No active pitfalls. Turn on Show retired to see retired ones.":"No pitfalls for this project. Add one when you spot a mistake that keeps coming back.",f=i.length===0?`<p class="empty">${g}</p>`:`<ul class="harness-installed-set-list">${i.map(y=>Pie({projectId:e.projectId,item:y,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      ${o.length===0?"":`<p class="muted">${n} of ${o.length} active</p>`}
      <div class="actions">${l===null?d:""}${u}</div>
      ${c}
      ${f}
    </section>`},mz=Aie});var le,fz,bie,_ie,kie,Rie,Eie,fn,nh=a(()=>{"use strict";nw();dt();gz();le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fz=(e,t)=>e.length===0?`<p class="empty">${le(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${le(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${le(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in AgentWitch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,bie=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this computer yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,_ie=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from AgentWitch Cloud.":"This project\u2019s playbook is linked in AgentWitch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${le(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},kie=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${le(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
          <input type="hidden" name="projectId" value="${le(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${le(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the profile harness on this computer \u2014 refresh from AgentWitch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${le(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this computer if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},Rie=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?kie({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?_ie({project:e.project,alreadyInRepo:!1}):bie();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",l=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
            <input type="hidden" name="projectId" value="${le(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${le(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${le(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${le(c.name)}</strong> <span class="muted mono">(${le(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${u}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${le(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${l}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},Eie=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${le(t)} from recent runs. Review in AgentWitch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${le(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},fn=e=>{let t=e.flashError?`<div class="alert-error">${le(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${le(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(f,y)=>`<a class="project-tab${e.activeTab===f?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${f}">${le(y)}</a>`,n=e.composition?.items.filter(f=>f.kind==="workflow")??[],s=e.composition?.items.filter(f=>f.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":{let f=Rie({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}),y=e.harnessExtraHtml?.trim()??"";return y.length===0?f:`${f}${y}`}case"workflows":return fz(n,"No workflows installed for this project yet.");case"agents":return fz(s,"No agents installed for this project yet.");case"knowledge":return Eie({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return mz({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),l=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${on(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,u=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${le(c)}" target="_blank" rel="noopener noreferrer">Open in AgentWitch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${le(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,g=eh(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from AgentWitch Cloud only. The folder on this computer is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from AgentWitch Cloud? Your repo folder on this computer will stay.');">
          <input type="hidden" name="projectId" value="${le(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${le(e.project.name)}</h1>
      <p class="muted mono">${le(e.project.projectFolderPath)}</p>
      ${u}
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(e.project.id)}">Change folder\u2026</a></div>
      <nav class="project-tabs" aria-label="Project composition">
        ${o("harness",`Playbooks (${r.harness})`)}
        ${o("workflows",`Workflows (${r.workflow})`)}
        ${o("agents",`Agents (${r.agent})`)}
        ${o("knowledge",`Knowledge (${e.knowledgeCandidateCount})`)}
        ${o("pitfalls",l)}
      </nav>
      <div class="project-tab-panel">
        ${i}
      </div>
    </section>${g}`}});var wie,Tie,yz,hz=a(()=>{"use strict";gn();gt();wie=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tie=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[Q]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!wie(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Fr(n);return s===null?[]:[s]})}catch{return null}},yz=Tie});var Sz,lw,Pz=a(()=>{"use strict";Z();gn();nh();Ra();hz();ka();Id();zr();Tt();Sz=e=>({kind:"page",title:e.project.name,body:fn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:$r(e.layout),linkedSetSlugs:Hr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),lw=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await Ur(r,e.layout),n=dr(o.projects,t);if(n===null)return{kind:"not_found"};let s=K({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??wt,l=s===null?null:await yz(s,n.id);if(l===null)return Sz({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from AgentWitch Cloud."});let c=EE({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:l});if(!c.ok)return Sz({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await vs(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var Az,cw,bz=a(()=>{"use strict";Z();gn();Tt();zr();nh();ky();fo();Ra();ka();Id();Sy();rE();by();iE();Az=e=>({kind:"page",title:e.project.name,body:fn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:$r(e.layout),linkedSetSlugs:Hr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),cw=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=H();if(n===null)return{kind:"not_found"};let s=await Ur(n,e.layout),i=dr(s.projects,r);if(i===null)return{kind:"not_found"};let l=K({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=l?.appOrigin??wt;if(o.length===0)return Az({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=je(i.projectFolderPath),u=pt({projectFolderPath:d}),{ledgerFilePath:g}=Pa(u.layout),f=Sa(g),y=PE(f);if(!y.includes(o))return Az({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let A=y.filter(b=>b!==o),P=Ay({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:f});Cd(g,P.ledger);let S=l===null?!1:await vs(l,i.id,A),p=new URLSearchParams({linked:"1",removed:o,files:String(P.summary.removedPaths.length),bindingsSynced:S?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${p.toString()}`}}});var Cie,Lie,_z,Iie,vie,Bd,dw=a(()=>{"use strict";dt();gt();Cie=1e4,Lie=15e3,_z=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},Iie=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},vie=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(_z(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[Q]:e.pairingToken},signal:AbortSignal.timeout(Cie)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=Ak(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(_z(e.appOrigin,r),{method:"PUT",headers:{[Q]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(Lie)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:Iie(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Bd=vie});var uw,kz,xie,Wie,Oie,Mie,Rz,Ez=a(()=>{"use strict";dt();uw=e=>e.replace(/\s+/g," ").trim(),kz=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=uw(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},xie=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),Wie=(e,t)=>{let r=xie(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,ve.id).replace(/-+$/g,"")},Oie=e=>e==="block"||e==="info"?e:"warn",Mie=e=>{let{form:t}=e,r=uw(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=uw(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>ve.symptom||o.length>ve.avoidance||n.length>ve.cause||s.length>ve.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),l=i.length>0?i:Wie(r,e.randomSuffix());return{ok:!0,pitfall:{id:l,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:l},keywords:kz(t.get("keywords")??"",ve.keywords,ve.keyword),tags:kz(t.get("tags")??"",ve.tags,ve.tag),source:"project",severity:Oie(t.get("severity"))}}},Rz=Mie});var Tz,jie,Po,wz,sh,Nie,Die,Cz,Lz=a(()=>{"use strict";Tz=require("node:crypto");dt();Ez();oh();jie=()=>(0,Tz.randomBytes)(3).toString("hex"),Po=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},wz=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),sh=new Map,Nie=async(e,t)=>{let r=sh.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);sh.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),sh.get(e)===s&&sh.delete(e)}},Die=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return Nie(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return Po(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return Po(o,"unavailable",s);if(e.action==="save"){let d=Rz({form:e.form,randomSuffix:e.randomSuffix??jie});if(!d.ok)return Po(o,"invalid",s);let u=i.items.find(y=>y.id===d.pitfall.id);if((u===void 0||u.source==="retired")&&on(i.items)>=64)return Po(o,"limit",s);let f=await n.upsertPitfall(o,d.pitfall);return Po(o,f.ok?"saved":f.reason==="active_limit"?"limit":f.reason,s)}let l=i.items.find(d=>d.id===t);if(l===void 0)return Po(o,"missing",s);if(e.action==="restore"){if(l.source==="retired"&&on(i.items)>=64)return Po(o,"limit",s);let d=await n.upsertPitfall(o,wz(l,"project"));return Po(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,wz(l,"retired"));return Po(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},Cz=Die});var ih,Iz,vz,pw=a(()=>{"use strict";ih=new Map,Iz=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=ih.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&ih.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},vz=e=>{if(e===void 0){ih.clear();return}ih.delete(e)}});var mw,xz=a(()=>{"use strict";Z();zr();Ra();ka();dw();Lz();pw();mw=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=H();if(o===null)return{kind:"not_found"};let n=await Ur(o,e.layout),s=dr(n.projects,r);if(s===null)return{kind:"not_found"};let i=K({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),l=e.createStore??Bd,c=i===null?null:l(i),d=await Cz({action:e.action,form:t,projectId:s.id,store:c});return vz(s.id),{kind:"redirect",location:d}}});var Hie,gw,Wz=a(()=>{"use strict";Hie=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,gw=Hie});var Oz=a(()=>{"use strict"});var Mz=a(()=>{"use strict"});var jz=a(()=>{"use strict";Oz();Mz()});var Fie,yn,Nz=a(()=>{"use strict";Fie=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],yn=(e=process.env)=>{let t={...e};for(let r of Fie)delete t[r];return t}});var Dz=a(()=>{"use strict";Nz()});var fw,Hz=a(()=>{"use strict";fw={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#2150d6",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var yw=a(()=>{"use strict";Hz()});var ah,hw=a(()=>{"use strict";ah={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history"}});var lh=a(()=>{"use strict";jz();Dz();Tt();yw();hw()});var Fz,$z,$ie,ch,dh,zz=a(()=>{"use strict";Fz=require("node:child_process"),$z=require("node:util");lh();$ie=(0,$z.promisify)(Fz.execFile),ch=async(e,t)=>{try{let{stdout:r}=await $ie("git",t,{cwd:e,env:yn(),maxBuffer:1048576});return r.trim()}catch{return null}},dh=async e=>{let t=await ch(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await ch(e,["rev-parse","--abbrev-ref","HEAD"]),o=await ch(e,["status","--porcelain"]),n=await ch(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var Sw,Uz=a(()=>{"use strict";Sw=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var zie,Pw,Bz=a(()=>{"use strict";zie=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},Pw=zie});var Uie,Bie,ur,Ea=a(()=>{"use strict";ut();Uie=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,Bie=e=>an(e).scrubbed.replace(Uie,"[redacted-email]"),ur=Bie});var Gie,Aw,Gz=a(()=>{"use strict";gt();Ea();Gie=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[Q]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:ur(r.lesson)}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Aw=Gie});var Kz,hn,Vz=a(()=>{"use strict";Kz=require("node:child_process"),hn=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,Kz.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var qz=a(()=>{"use strict";Ra()});var Gd,Jz=a(()=>{"use strict";gt();Gd=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[Q]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var bw,Yz=a(()=>{"use strict";gt();bw=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[Q]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach AgentWitch Cloud."}}}});var Xz,Kie,Ao,_w,kw=a(()=>{"use strict";Xz=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},Kie=e=>e===""?null:e,Ao=e=>e??"",_w=e=>({id:e.id,projectId:Kie(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:Xz(e.keywords_json),tags:Xz(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var Zz,Vie,qie,Rw,wa,uh,Kd=a(()=>{"use strict";kw();Zz=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,Vie=e=>e,qie=e=>e??null,Rw=(e,t,r=t)=>Vie(e.prepare(Zz).all(Ao(r),Ao(t))).map(_w),wa=(e,t,r,o=t)=>{let n=qie(e.prepare(`${Zz} AND p.id = ?`).get(Ao(o),Ao(t),r));return n===null?null:_w(n)},uh=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
      project_id, id, symptom, cause, avoidance,
      check_kind, check_value, keywords_json, tags_json,
      source, severity
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(project_id, id) DO UPDATE SET
      symptom = excluded.symptom,
      cause = excluded.cause,
      avoidance = excluded.avoidance,
      check_kind = excluded.check_kind,
      check_value = excluded.check_value,
      keywords_json = excluded.keywords_json,
      tags_json = excluded.tags_json,
      source = excluded.source,
      severity = excluded.severity`).run(Ao(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var ph,Ew=a(()=>{"use strict";dt();ph=e=>e.map(t=>({id:is(t.id),avoidance:is(t.avoidance)}))});var mh,Qz,gh=a(()=>{"use strict";mh=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},Qz=e=>e.filter(t=>t.source!=="retired").length});var Ws,eU,Vd=a(()=>{"use strict";dt();Ew();Kd();gh();Ws=(e,t={})=>{let r=t.projectId??null,o=Rw(e,null,r),n=r===null||r===""?[]:Rw(e,r);return mh({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},eU=(e,t={})=>{let r=Ws(e,t);return t.format==="bot"?{format:"bot",items:ph(r),lines:r.map(o=>jc(o))}:{format:"full",items:r}}});var fh,ww=a(()=>{"use strict";Kd();Vd();fh=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?wa(e,null,r):Ws(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var Tw=a(()=>{"use strict"});var Sn,Ta,tU,rU,oU=a(()=>{"use strict";Sn=e=>({type:"string",description:e}),Ta={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Sn("Absolute working directory for the current session."),message:Sn("User prompt or task text to match."),sessionId:Sn("Optional session id for first-message tracking."),projectId:Sn("Optional project id when already known.")},additionalProperties:!1}},tU={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Sn("Absolute working directory."),projectId:Sn("Optional project id when already known.")},additionalProperties:!1}},rU={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Sn("Project id."),q:Sn("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Os,nU,sU,iU=a(()=>{"use strict";Os=e=>({type:"string",description:e}),nU={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Os("Project id."),skillId:Os("Skill id when known."),q:Os("Optional search text.")},required:["projectId"],additionalProperties:!1}},sU={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Os("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Os("Pitfall id when kind is pitfall."),preflightId:Os("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Os("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var aU=a(()=>{"use strict";oU();iU()});var Jd,lU=a(()=>{"use strict";dt();Tw();Jd=e=>{let t=bf("AgentWitch tip \xB7 check_context",120);if(nr(t)>=120)return t;let r=[t],o=nr(t);for(let n of e){if(r.length-1>=4)break;let s=jc(n),i=nr(s);if(o+i>120){if(r.length===1){let l=120-o,c=bf(s,l);c.length>0&&(r.push(c),o+=nr(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var cU=a(()=>{"use strict";dt()});var Yd=a(()=>{"use strict";Tw();aU();lU();cU()});var Jie,Yie,Ca,Cw=a(()=>{"use strict";Yd();Jie=e=>e.toLowerCase(),Yie=(e,t)=>{let r=Jie(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},Ca=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:Yie(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var dU,uU=a(()=>{"use strict";Vd();Cw();dU=(e,t)=>{let r=Ws(e,{projectId:t.projectId,includeRetired:!1});return Ca({pitfalls:r,text:t.text})}});var Xie,Zie,Qie,eae,pU,vt,mU,hh,Lw=a(()=>{"use strict";Xie="22.13",Zie=e=>typeof e=="object"&&e!==null&&typeof e.DatabaseSync=="function",Qie=e=>{let t={ok:!1,reason:`Node ${e.nodeVersion} has no node:sqlite (needs Node ${Xie}+)`};if(e.getBuiltinModule===null)return t;try{let r=e.getBuiltinModule("node:sqlite");return Zie(r)?{ok:!0,sqlite:r}:t}catch{return t}},eae=()=>typeof process.getBuiltinModule=="function"?e=>process.getBuiltinModule(e):null,pU=new Map,vt=()=>{let e=pU.get("process");if(e!==void 0)return e;let t=Qie({getBuiltinModule:eae(),nodeVersion:process.version});return pU.set("process",t),t},mU=()=>{let e=vt();if(!e.ok)throw new Error(`Pitfall cache unavailable: ${e.reason}`);return e.sqlite},hh=()=>{let e=vt();return e.ok?null:`[agent-witch] Pitfall cache (check_context) is off: ${e.reason}. Everything else runs.`}});var gU,Xd=a(()=>{"use strict";Cf();gU=3e3});var fU,yU=a(()=>{"use strict";Xd();fU=`
CREATE TABLE IF NOT EXISTS pitfall_meta (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pitfalls (
  project_id TEXT NOT NULL DEFAULT '',
  id TEXT NOT NULL,
  symptom TEXT NOT NULL,
  cause TEXT NOT NULL,
  avoidance TEXT NOT NULL,
  check_kind TEXT NOT NULL,
  check_value TEXT NOT NULL,
  keywords_json TEXT NOT NULL,
  tags_json TEXT NOT NULL,
  source TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'warn',
  PRIMARY KEY (project_id, id)
);

CREATE INDEX IF NOT EXISTS pitfalls_project_source_idx
  ON pitfalls (project_id, source);

CREATE TABLE IF NOT EXISTS pitfall_hits (
  project_id TEXT NOT NULL DEFAULT '',
  pitfall_id TEXT NOT NULL,
  hit_count INTEGER NOT NULL DEFAULT 0,
  last_seen_at TEXT,
  PRIMARY KEY (project_id, pitfall_id)
);
`});var hU,SU,tae,rae,PU,AU,bU=a(()=>{"use strict";hU=m(require("node:fs")),SU=m(require("node:path"));Lw();Xd();yU();tae=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},rae=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},PU=e=>{hU.default.mkdirSync(SU.default.dirname(e),{recursive:!0});let{DatabaseSync:t}=mU(),r=new t(e);return r.exec(`PRAGMA busy_timeout = ${gU}`),r.exec(fU),tae(r)<Fc&&rae(r,Fc),r},AU=e=>{e.close()}});var _U,kU,Iw=a(()=>{"use strict";kw();_U=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Ao(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},kU=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Ao(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var RU,EU=a(()=>{"use strict";ww();Iw();RU=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:fh(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=_U(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var vw,Sh,xw=a(()=>{"use strict";vw=m(require("node:path"));Ue();Sh=(e,t)=>e.profileEmail!==null?vw.default.join(e.installDir,ct,e.profileEmail,t):vw.default.join(e.installDir,t)});var La,Ww=a(()=>{"use strict";Xd();xw();La=e=>Sh(e,Rk)});var TU,wU=a(()=>{TU=[{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]}]});var nae,sae,Ph,Ow=a(()=>{"use strict";wU();nae=TU,sae=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),Ph=()=>nae.map(sae)});var CU,LU,IU=a(()=>{"use strict";dt();CU="id, symptom, cause, avoidance, check_kind, check_value, keywords_json, tags_json",LU=(e,t)=>{let r=t.map(()=>"?").join(", "),o=`project_id = '' AND source = 'seed'${t.length>0?` AND id NOT IN (${r})`:""}`,n=hk;e.prepare(`INSERT INTO pitfalls (project_id, ${CU}, source, severity)
     SELECT ?, ${CU}, 'project', severity
     FROM pitfalls
     WHERE ${o}
       AND (EXISTS (SELECT 1 FROM pitfalls WHERE project_id = ?)
         OR EXISTS (SELECT 1 FROM pitfall_hits WHERE project_id = ?))
     ON CONFLICT(project_id, id) DO NOTHING`).run(n,...t,n,n);let s=e.prepare(`DELETE FROM pitfalls WHERE ${o}`).run(...t);return Number(s.changes)}});var vU,xU=a(()=>{"use strict";Ow();Kd();IU();vU=e=>{let t=Ph();return LU(e,t.map(r=>r.id)),t.reduce((r,o)=>wa(e,null,o.id)!==null?r:(uh(e,o),r+1),0)}});var WU,OU,MU=a(()=>{"use strict";Xd();WU=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>Ef?{kind:"field_too_long",field:"symptom",max:Ef}:e.cause.length>wf?{kind:"field_too_long",field:"cause",max:wf}:e.avoidance.length>Tf?{kind:"field_too_long",field:"avoidance",max:Tf}:null,OU=e=>e.activeCountAfter>Yi?{kind:"active_cap",max:Yi}:null});var jU,NU=a(()=>{"use strict";Kd();Iw();Vd();gh();MU();jU=(e,t)=>{let r=WU(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=wa(e,t.projectId,o),s=kU(e,t.projectId,o),i=t.source??"project",l={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=Ws(e,{projectId:t.projectId,includeRetired:!0}).filter(f=>f.id!==l.id),u=Qz([...d,l]),g=OU({activeCountAfter:u});return g!==null?{ok:!1,error:g}:(uh(e,l),{ok:!0,pitfall:l})}});var Ms,Mw=a(()=>{"use strict";ww();Vd();uU();bU();EU();Ww();xU();NU();Ms=e=>{let t=e.dbPath??(e.layout!==void 0?La(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=PU(t);return vU(r),{dbPath:t,listPitfalls:o=>eU(r,o),getPitfall:o=>fh(r,o),upsertPitfall:o=>jU(r,o),recordHit:o=>RU(r,o),matchPitfalls:o=>dU(r,o),close:()=>AU(r)}}});var iae,aae,Ah,jw=a(()=>{"use strict";Yd();Ew();iae=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},aae=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},Ah=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=iae(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};aae(e,e.registry,n,s);let i=ph(s);return{status:"hit",projectId:n,pitfalls:i,tip:Jd(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var bh,DU=a(()=>{"use strict";Yd();bh={name:Ta.name,description:Ta.description,inputSchema:Ta.inputSchema}});var bo,HU,FU,_o,lae,Ia,$U,Zd=a(()=>{"use strict";bo=m(require("node:fs")),HU=m(require("node:os")),FU=m(require("node:path")),_o=()=>({readUtf8:e=>bo.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{bo.default.writeFileSync(e,t,"utf8")},exists:e=>bo.default.existsSync(e),mkdirp:e=>{bo.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{bo.default.renameSync(e,t)},realpath:e=>bo.default.realpathSync.native(e)}),lae=()=>({homedir:()=>HU.default.homedir()}),Ia=()=>({..._o(),...lae()}),$U=e=>({..._o(),homedir:()=>e,realpath:r=>{let o=FU.default.resolve(r);return bo.default.existsSync(o)?bo.default.realpathSync.native(o):o}})});var _h,zU=a(()=>{"use strict";_h=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var Nw,UU=a(()=>{"use strict";xw();sr();Nw=e=>Sh(e,lH)});var BU,Je,ko=a(()=>{"use strict";BU=m(require("node:path")),Je=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(BU.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var kh,cae,Qd,GU,Rh,Eh,va,wh=a(()=>{"use strict";Zd();zU();UU();ko();kh=()=>({byRealpath:{}}),cae=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return kh();let r=t.byRealpath;return typeof r!="object"||r===null?kh():{byRealpath:r}}catch{return kh()}},Qd=(e,t=_o())=>{let r=Nw(e);return t.exists(r)?cae(t.readUtf8(r)):kh()},GU=(e,t,r)=>{Je({fs:r,filePath:Nw(e),contents:`${JSON.stringify(t,null,2)}
`})},Rh=e=>{let t=e.fs??_o(),r=_h(e.cwd,t),o={declinedAt:e.nowIso??new Date().toISOString(),cwd:e.cwd},n=Qd(e.layout,t);return GU(e.layout,{byRealpath:{...n.byRealpath,[r]:o}},t),o},Eh=e=>{let t=e.fs??_o(),r=_h(e.cwd,t),o=Qd(e.layout,t);if(o.byRealpath[r]===void 0)return!1;let n=Object.fromEntries(Object.entries(o.byRealpath).filter(([s])=>s!==r));return GU(e.layout,{byRealpath:n},t),!0},va=e=>{let t=e.fs??_o(),r=_h(e.cwd,t);return Qd(e.layout,t).byRealpath[r]!==void 0}});var Pn,Th,Dw=a(()=>{"use strict";Pn=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},Th=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Pn(t,"cwd")!==void 0?{cwd:Pn(t,"cwd")}:{},...Pn(t,"message")!==void 0?{message:Pn(t,"message")}:{},...Pn(t,"sessionId")!==void 0?{sessionId:Pn(t,"sessionId")}:{},...Pn(t,"projectId")!==void 0?{projectId:Pn(t,"projectId")}:{}}}});var An,Ch=a(()=>{"use strict";xt();jw();Mw();wh();Dw();An=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>va({layout:e.layout,cwd:o}));return o=>{let n=Th(o),s=null;try{return s=Ms({layout:e.layout}),Ah({registry:s,resolveProjectId:ow,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var KU,VU=a(()=>{"use strict";KU=["AgentWitch \xB7 check_context: this folder is not an AgentWitch project yet.","Ask the user once whether to add it in AgentWitch Local (Projects) so saved pitfalls show up here.","If they decline or ignore it, do not ask again this session."].join(`
`)});var dae,Hw,uae,pae,mae,Lh,Fw=a(()=>{"use strict";VU();dae="UserPromptSubmit",Hw=(e,t)=>{let r=e[t];return typeof r=="string"&&r.trim().length>0?r:void 0},uae=e=>{let t;try{t=JSON.parse(e)}catch{return null}if(typeof t!="object"||t===null||Array.isArray(t))return null;let r=t,o=Hw(r,"cwd"),n=Hw(r,"prompt"),s=Hw(r,"session_id");return{...o!==void 0?{cwd:o}:{},...n!==void 0?{message:n}:{},...s!==void 0?{sessionId:s}:{}}},pae=e=>{if(e.status==="hit"){let t=e.tip?.trim()??"";return t.length>0?t:null}return e.status==="none"&&e.promptCreate===!0?KU:null},mae=e=>`${JSON.stringify({hookSpecificOutput:{hookEventName:dae,additionalContext:e}})}
`,Lh=async e=>{try{let t=uae(await e.readStdin());if(t===null)return e.writeStderr(`[agent-witch] mcp-hook: stdin is not a JSON object
`),0;let r=pae(await e.runCheckContext(t));r!==null&&e.writeStdout(mae(r))}catch(t){let r=t instanceof Error?t.message:String(t);try{e.writeStderr(`[agent-witch] mcp-hook: ${r}
`)}catch{}}return 0}});var gae,fae,qU,JU=a(()=>{"use strict";Ch();Fw();gae=1500,fae=(e,t)=>new Promise(r=>{let o=[],n=!1,s=()=>{n||(n=!0,clearTimeout(i),e.removeAllListeners("data"),e.removeAllListeners("end"),e.removeAllListeners("error"),e.pause(),r(Buffer.concat(o).toString("utf8")))},i=setTimeout(s,t);e.on("data",l=>{o.push(Buffer.isBuffer(l)?l:Buffer.from(l,"utf8"))}),e.on("end",s),e.on("error",s)}),qU=async e=>{let t=r=>{process.stderr.write(r)};return Lh({readStdin:()=>fae(process.stdin,gae),writeStdout:r=>{process.stdout.write(r)},writeStderr:t,runCheckContext:An({layout:e.layout,logError:r=>{let o=r instanceof Error?r.message:String(r);t(`[agent-witch] mcp-hook check_context: ${o}
`)}})})}});var yae,Ih,YU=a(()=>{"use strict";Ch();Dw();yae="/api/local/check-context",Ih=async e=>{if(e.pathname!==yae)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=An({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(Th(t))),!0}});var XU,vh,hae,Sae,ZU,QU=a(()=>{"use strict";XU=m(require("node:path"));sr();ko();vh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hae={hooks:[{type:"command",command:kk,timeout:3,[as]:!0}]},Sae=e=>Array.isArray(e)&&e.some(t=>vh(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>vh(r)&&(r.command===kk||r[as]===!0))),ZU=e=>{let t=XU.default.join(e.io.homedir(),aH),r={};if(e.io.exists(t))try{let l=JSON.parse(e.io.readUtf8(t));vh(l)&&(r={...l})}catch{r={}}let o=vh(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(Sae(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(hae),o.UserPromptSubmit=s;let{backupPath:i}=Je({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var xa,xh=a(()=>{"use strict";sr();xa=e=>{let t=e.begin??Ki,r=e.end??Vi,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let u=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:u,changed:u!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,l=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${l}`;return{next:c,changed:c!==e.existing}}});var e1,Pae,t1,r1=a(()=>{"use strict";e1=m(require("node:path"));xh();sr();ko();Pae=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),t1=e=>{let t=e1.default.join(e.io.homedir(),iH),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=xa({existing:r,blockBody:Pae,begin:Ki,end:Vi});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Je({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var o1,n1,s1=a(()=>{"use strict";o1=m(require("node:path"));xh();sr();ko();n1=e=>{let t=o1.default.join(e.io.homedir(),sH),r=kf.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${Dc}]`,`command = "${Hc}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=xa({existing:n,blockBody:o,begin:Ki,end:Vi});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:l}=Je({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:l}}});var i1,$w,a1,l1=a(()=>{"use strict";i1=m(require("node:path"));sr();ko();$w=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),a1=e=>{let t=i1.default.join(e.io.homedir(),nH),r={command:Hc,args:[...kf]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));$w(d)&&(o={...d})}catch{o={}}let n=$w(o.mcpServers)?{...o.mcpServers}:{},s=n[Dc];if($w(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[Dc]=r;let l={...o,mcpServers:n},{backupPath:c}=Je({fs:e.io,filePath:t,contents:`${JSON.stringify(l,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var Wa,zw=a(()=>{"use strict";Zd();QU();r1();s1();l1();Wa=e=>{let t=e?.io??Ia();return{ok:!0,cursorMcp:a1({io:t}),codexConfig:n1({io:t}),codexAgents:t1({io:t}),claudeHook:ZU({io:t})}}});var c1,d1=a(()=>{"use strict";sr();c1=e=>{let t=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with this folder's cwd.",`projectId: ${e}`,"If status is miss or none (already declined), stay silent.","If status is hit, follow the tip. Do not dump large context."].join(`
`);return["---","description: AgentWitch check_context (token-saver)","alwaysApply: true","---","",qi,t,Nc,""].join(`
`)}});var u1,Aae,p1,m1=a(()=>{"use strict";u1=m(require("node:path"));d1();sr();xh();ko();Aae=e=>e.slice(e.indexOf(qi)+qi.length,e.indexOf(Nc)).trim(),p1=e=>{let t=u1.default.join(e.projectRoot,_f),r=c1(e.projectId);if(!e.fs.exists(t))return Je({fs:e.fs,filePath:t,contents:r}),{ok:!0,path:t,wrote:!0};let{next:o,changed:n}=xa({existing:e.fs.readUtf8(t),blockBody:Aae(r),begin:qi,end:Nc});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Je({fs:e.fs,filePath:t,contents:o,backup:!0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var Bw,Uw,g1,f1=a(()=>{"use strict";Bw=m(require("node:path"));ko();Uw="# agent-witch-token-saver (local; never commit)",g1=e=>{let t=Bw.default.join(e.repoRoot,".git");if(!e.fs.exists(t))return{ok:!1,reason:"not a git working tree"};let r=Bw.default.join(t,"info","exclude"),o=e.fs.exists(r)?e.fs.readUtf8(r):"",n=o.length>0?o.split(/\r?\n/):[],s=new Set(n.map(c=>c.trim())),i=e.relativePaths.filter(c=>!s.has(c));if(i.length===0&&s.has(Uw))return{ok:!0,path:r,wrote:!1};let l=[...n];for(;l.length>0&&l[l.length-1]==="";)l.pop();s.has(Uw)||l.push("",Uw);for(let c of i)l.push(c);return l.push(""),Je({fs:e.fs,filePath:r,contents:l.join(`
`)}),{ok:!0,path:r,wrote:i.length>0}}});var Wh,Gw=a(()=>{"use strict";sr();m1();f1();Wh=e=>{let t=p1({fs:e.fs,projectRoot:e.projectRoot,projectId:e.projectId}),r=g1({fs:e.fs,repoRoot:e.projectRoot,relativePaths:[_f]});return{ok:!0,cursorRule:t,gitExclude:r}}});var Kw,Vw,Oh,qw,Jw=a(()=>{"use strict";Kw=["pitfalls","preflight","localMcp","history","ollama","skillGen"],Vw=["on","off","degraded","unavailable"],Oh={pitfalls:"on",preflight:"on",localMcp:"on",history:"off",ollama:"off",skillGen:"off"},qw=()=>({...Oh})});var bae,_ae,Yw,y1=a(()=>{"use strict";Jw();bae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_ae=e=>Vw.find(t=>t===e)??null,Yw=e=>{if(!bae(e))return null;let t={...Oh};for(let r of Kw){let o=_ae(e[r]);o!==null&&(t[r]=o)}return t}});var h1=a(()=>{"use strict";Jw();y1()});var S1,kae,Rae,P1,A1=a(()=>{"use strict";S1=m(require("node:path"));xt();h1();ko();kae="token-saver.json",Rae=(e,t)=>{if(!e.exists(t))return null;try{return Yw(JSON.parse(e.readUtf8(t)))}catch{return null}},P1=e=>{let t=S1.default.join(e.projectRoot,Cc,kae),r=e.flags??{...qw(),...Rae(e.fs,t)},o=`${JSON.stringify(r,null,2)}
`;return e.fs.exists(t)&&e.fs.readUtf8(t)===o?{ok:!0,path:t,wrote:!1}:(Je({fs:e.fs,filePath:t,contents:o}),{ok:!0,path:t,wrote:!0})}});var Ro,Br,Mh,Xw=a(()=>{"use strict";Ro=(e,t)=>{if(t==="remove")return{ok:!0,state:"Connected"};switch(e){case"Unconnected":return t==="connect"?{ok:!0,state:"SigningIn"}:Br(e,t);case"SigningIn":return t==="signInComplete"?{ok:!0,state:"Connected"}:Br(e,t);case"Connected":return t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Br(e,t);case"GlobalTriggersWritten":return t==="decline"?{ok:!0,state:"Declined"}:t==="accept"?{ok:!0,state:"ProjectResolved"}:t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Br(e,t);case"Declined":return t==="clearDecline"?{ok:!0,state:"GlobalTriggersWritten"}:Br(e,t);case"ProjectResolved":return t==="applyDefaults"?{ok:!0,state:"DefaultsApplied"}:Br(e,t);case"DefaultsApplied":return t==="writeProjectFragments"?{ok:!0,state:"ProjectFragmentsWritten"}:Br(e,t);case"ProjectFragmentsWritten":return t==="verify"?{ok:!0,state:"Verified"}:Br(e,t);case"Verified":return t==="accept"||t==="writeProjectFragments"?{ok:!0,state:e}:Br(e,t);default:return Br(e,t)}},Br=(e,t)=>({ok:!1,reason:`Illegal transition ${e} + ${t}`,state:e}),Mh=e=>e==="Declined"});var Eae,wae,b1,_1=a(()=>{"use strict";A1();Zd();wh();Xw();zw();Gw();Eae="projectId required on accept",wae=e=>{let t=e.projectId;if(e.resolveProject!==void 0)try{t=e.resolveProject(e.cwd).projectId}catch(o){return{ok:!1,reason:`project resolve failed: ${o instanceof Error?o.message:String(o)}`}}let r=t?.trim()??"";return r.length>0?{ok:!0,projectId:r}:{ok:!1,reason:Eae}},b1=e=>{let t=e.fs??_o(),r=e.io??Ia(),o=e.fromState??"GlobalTriggersWritten";if(!e.accept){let d=Ro(o,"decline");return d.ok?(Rh({layout:e.layout,cwd:e.cwd,fs:t}),{ok:!0,state:"Declined"}):{ok:!1,state:d.state,reason:d.reason}}let n=Mh(o)||va({layout:e.layout,cwd:e.cwd,fs:t});n&&(o="Declined");let s=wae(e);if(!s.ok)return{ok:!1,state:o,reason:s.reason};if(n){let d=Ro(o,"clearDecline");if(!d.ok)return{ok:!1,state:d.state,reason:d.reason};Eh({layout:e.layout,cwd:e.cwd,fs:t}),o=d.state}Wa({io:r}),o=Ro(o,"writeGlobalTriggers").ok?"GlobalTriggersWritten":o;let i=Ro(o,"accept");if(!i.ok)return{ok:!1,state:i.state,reason:i.reason};o=i.state;let l=Ro(o,"applyDefaults");if(!l.ok)return{ok:!1,state:l.state,reason:l.reason};P1({fs:t,projectRoot:e.cwd}),o=l.state;let c=Ro(o,"writeProjectFragments");return c.ok?(Wh({fs:t,projectRoot:e.cwd,projectId:s.projectId}),{ok:!0,state:c.state,projectId:s.projectId}):{ok:!1,state:c.state,reason:c.reason}}});var k1={};Et(k1,{AWL_CHECK_CONTEXT_TOOL:()=>bh,checkContext:()=>Ah,clearProjectDecline:()=>Eh,createCheckContextRunner:()=>An,createNodeCliIo:()=>Ia,createPitfallRegistry:()=>Ms,createTempCliIo:()=>$U,declineProjectForCwd:()=>Rh,describePitfallCacheAvailability:()=>hh,isDeclinedCwd:()=>va,isDeclinedTerminal:()=>Mh,listBundledSeedPitfalls:()=>Ph,loadNodeSqlite:()=>vt,matchPitfallsByKeywords:()=>Ca,readDeclinedProjectsStore:()=>Qd,resolveTokenSaverDbPath:()=>La,runCheckContextHook:()=>Lh,runCheckContextHookCli:()=>qU,runSetupProject:()=>b1,shadowPitfalls:()=>mh,transitionSetupProject:()=>Ro,tryHandleTokenSaverLocalRequest:()=>Ih,writeGlobalTriggers:()=>Wa,writeProjectFragments:()=>Wh});var Gr=a(()=>{"use strict";Mw();Lw();Ww();Cw();gh();Ow();jw();DU();Ch();Fw();JU();YU();zw();Gw();_1();wh();Xw();Zd()});var Zw,R1=a(()=>{"use strict";Zw=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var E1,w1,Tae,Cae,Lae,jh,Qw=a(()=>{"use strict";Gr();Cf();R1();E1=e=>{try{return e.dbPath!==void 0?Ms({dbPath:e.dbPath}):e.layout!==void 0?(La(e.layout),Ms({layout:e.layout})):null}catch{return null}},w1=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},Tae=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},Cae=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},Lae=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=E1(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(Tae(n,r,i.items),{ok:!0,items:w1(n,r,o.includeRetired).map(Zw),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:w1(n,r,o.includeRetired).map(Zw),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=E1(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:Cae(s.error)}finally{n.close()}}}},jh=Lae});var Oa,eu,eT=a(()=>{"use strict";Oa=m(require("node:path")),eu=(e,t)=>{if(!Oa.default.isAbsolute(e)||!Oa.default.isAbsolute(t))return!1;let r=Oa.default.relative(t,e);return r.length===0?!0:r!==".."&&!r.startsWith(`..${Oa.default.sep}`)&&!Oa.default.isAbsolute(r)}});var Nh,T1,C1=a(()=>{"use strict";ut();eT();Nh=e=>({ok:!1,code:e}),T1=e=>{let t=e.requestedLexicalPath;if(t===null)return Nh(se.FOLDER_REQUIRED);if(e.roots===null)return Nh(se.FOLDER_CHECK_UNAVAILABLE);let r=e.requestedRealPath;if(r===null){let n=e.roots.some(s=>eu(t,s.lexicalPath));return Nh(n?se.FOLDER_NOT_FOUND:se.FOLDER_NOT_REGISTERED)}return e.roots.some(n=>n.realPath!==null&&eu(r,n.realPath))?{ok:!0,folderRealPath:r}:Nh(se.FOLDER_NOT_REGISTERED)}});var oT,L1,tT,rT,Iae,nT,I1=a(()=>{"use strict";oT=m(require("node:fs")),L1=m(require("node:path"));fo();C1();eT();tT=e=>L1.default.resolve(je(e)),rT=e=>{try{return oT.default.realpathSync.native(e)}catch{return null}},Iae=e=>{let t=e.projectId?.trim()??"";if(t.length>0)return e.registeredFolders===null?null:e.registeredFolders.filter(o=>o.projectId===t).map(o=>o.folderPath);let r=(e.registeredFolders??[]).map(o=>o.folderPath);return[e.defaultFolderPath,...r]},nT=e=>{let t=Iae(e)?.map(tT)??null,r=e.requestedFolderPath?.trim()??"",o=r.length>0?tT(r):null;return o!==null&&rT(o)===null&&eu(o,tT(e.managedProjectsDir))&&(t??[]).includes(o)&&oT.default.mkdirSync(o,{recursive:!0}),T1({requestedLexicalPath:o,requestedRealPath:o===null?null:rT(o),roots:t?.map(n=>({lexicalPath:n,realPath:rT(n)}))??null})}});var v1,sT,x1=a(()=>{"use strict";zr();v1=new Map,sT=async(e,t=Is)=>{let r=K(e);if(r===null)return null;let o=await t(r);if(o===null)return v1.get(r.pairingToken)??null;let n=o.map(s=>({projectId:s.id,folderPath:s.folderPath}));return v1.set(r.pairingToken,n),n}});var xt=a(()=>{"use strict";Ra();ka();lz();fo();ky();cz();rn();Pz();bz();xz();oh();Id();Wz();zz();Uz();Bz();Gz();Vz();qz();Jz();Yz();ZE();YE();zr();Qw();I1();x1()});var Dh,tu,W1,iT,js,aT=a(()=>{"use strict";Dh=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=l=>o.find(c=>c.type===l)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},tu=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Dh(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},W1=e=>e>=1&&e<=5,iT=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Dh(t,"UTC")},js=e=>{let t=e.from??new Date,r=Dh(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return tu(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=tu(r,e.timeZone,o,0),s=Dh(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?tu(iT(r),e.timeZone,o,0):n;if(!i&&W1(s.weekday))return n;let l=r;for(let c=0;c<8;c+=1)if(l=iT(l),W1(l.weekday))return tu(l,e.timeZone,o,0);return tu(iT(r),e.timeZone,o,0)}});var O1,lT,Eo,cT=a(()=>{"use strict";O1=require("node:crypto");Z();xt();aT();Zy();lT=!1,Eo=async e=>{if(lT)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let r=K({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let o=Xy(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this computer."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};lT=!0;let n=(0,O1.randomUUID)();try{let s=await fa(t,"claude-cli",o.prompt);await qE(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,l=js({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Yy(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:l.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{lT=!1}}});var Hh,M1=a(()=>{"use strict";Z();cT();Zy();Hh=async()=>{let e=H();if(e===null)return;let t=cr(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Eo(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var ru=a(()=>{"use strict";Zy();M1();cT();aT()});var j1=a(()=>{"use strict";ru()});var N1=a(()=>{"use strict";zE()});var D1=a(()=>{"use strict";N1()});var dT=a(()=>{"use strict";ru()});var vae,xae,ou,uT=a(()=>{"use strict";j1();D1();dT();tt();vae=e=>e!==void 0&&e.trim().length>0?j(e.trim()):j(),xae=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??js({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??js({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},ou=e=>{let t=vae(e.profileEmail),r=cr(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=_a(s);return i!==null?[xae(i,o.get(i.id))]:[]});return Jy(t,n),{ok:!0,writtenCount:n.length}}});var pT=a(()=>{"use strict";ru()});var H1=a(()=>{"use strict";Z()});var F1=a(()=>{"use strict";uT();pT();dT();H1()});var $1,nu,su,iu,z1=a(()=>{"use strict";$1=m(require("node:os"));F1();Dd();Hd();nu=e=>{if(!So(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Cs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=ou({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},su=async e=>{if(!So(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Cs(t)?Eo(r):{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."}},iu=()=>{let e=H(),t=e!==null?cr(e.layout):{version:1,automations:[]};return{ok:!0,hostname:$1.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var mT=a(()=>{"use strict";z1()});var Fh=a(()=>{"use strict";pe()});var $h=a(()=>{"use strict";pe()});var zh,B1,G1,U1,Wae,Oae,Ma,gT=a(()=>{"use strict";zh=m(require("node:fs")),B1=m(require("node:os")),G1=m(require("node:path"));Fh();$h();kd();tt();U1=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},Wae=e=>G1.default.join(B1.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Oae=async e=>zh.default.existsSync(Wae(e))?(await et(e)).ok:!1,Ma=async(e=L())=>{let t=zh.default.existsSync(gy(e)),r=!zh.default.existsSync(Wr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=_d(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await U1(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Re(e)}-wake`;await Oae(i)&&s.push(i);for(let c of Pe(e))(await et(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let l=await U1(o);return{ok:l||s.length>0,wakePortFileExists:!0,wakeReachable:l,hollowInstall:!1,kickstartedLabels:s}}});var K1=a(()=>{"use strict";pe()});var fT=a(()=>{"use strict";fs();pe()});var yT=a(()=>{"use strict";fs()});var hT=a(()=>{"use strict";pe()});var q1,V1,au,ST=a(()=>{"use strict";q1=m(require("node:fs"));Tt();Fh();$h();tt();V1=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},au=async(e=L())=>{if(!q1.default.existsSync(Wr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await V1())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of Pe(e))(await et(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await V1();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var J1=a(()=>{"use strict";pe()});var Y1,Ns,PT,Mae,jae,Nae,X1,Dae,Z1,ja,Uh=a(()=>{"use strict";Y1=require("node:crypto"),Ns=m(require("node:fs")),PT=m(require("node:path"));tt();Mae="watchdog-log.ndjson",jae=200,Nae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X1=(e=L())=>{let t=j(),r=t.installDir===e?t.logsDir:Xn({installDir:e,profileEmail:t.profileEmail});return PT.default.join(r,Mae)},Dae=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Nae(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},Z1=(e,t=L())=>{let r={id:(0,Y1.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=X1(t);Ns.default.mkdirSync(PT.default.dirname(o),{recursive:!0});let n=Ns.default.existsSync(o)?Ns.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-jae+1)),JSON.stringify(r)];return Ns.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},ja=(e=20,t=L())=>{let r=X1(t);if(!Ns.default.existsSync(r))return[];let o=Ns.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=Dae(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var AT,bT,_T,kT=a(()=>{"use strict";Ue();AT=tc.watchdogReinstallState,bT=900*1e3,_T=3e3});var Q1=a(()=>{"use strict";kT()});var eB={};Et(eB,{verifyAgentWitchReviveAfterKickstart:()=>Fae});var Hae,Fae,tB=a(()=>{"use strict";Q1();yT();hT();tt();Hae=e=>new Promise(t=>{setTimeout(t,e)}),Fae=async e=>{if(await Hae(e.verifyDelayMs??_T),!await es(e.launchAgentLabel))return!1;let r=e.profileEmail===null?j():j(e.profileEmail),o=Oe(r);return!Ke(o,e.staleAfterMs)}});var lu,RT,$ae,rB,oB,ET,wT,TT=a(()=>{"use strict";lu=m(require("node:fs")),RT=m(require("node:path"));q();kT();$ae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rB=e=>RT.default.join(e,AT),oB=(e=L())=>{let t=rB(e);if(!lu.default.existsSync(t))return null;try{let r=JSON.parse(lu.default.readFileSync(t,"utf8"));return!$ae(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},ET=(e=L(),t=Date.now())=>{let r=oB(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=bT:!0},wT=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=rB(e);return lu.default.mkdirSync(RT.default.dirname(o),{recursive:!0}),lu.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var CT,nB=a(()=>{"use strict";pe();TT();CT=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!ET())return{attempted:!1,ok:!1,targets:e};wT();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await et(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var sB=a(()=>{"use strict";TT();nB()});var LT=a(()=>{"use strict";jr()});var iB=a(()=>{"use strict";jr()});var aB,Na,lB,cB,dB,zae,Uae,uB,Bae,Gae,pB,mB=a(()=>{"use strict";aB=require("node:child_process"),Na=m(require("node:fs")),lB=m(require("node:os")),cB=m(require("node:path")),dB=require("node:util");LT();iB();tt();zae=(0,dB.promisify)(aB.execFile),Uae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uB=e=>{let t=Qe(e),r=t===null?j():j(t);if(!Na.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Na.default.readFileSync(r.configPath,"utf8"));return!Uae(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},Bae=e=>uB(e)?.wsUrl??null,Gae=e=>{let t=Bae(e);return t!==null?Ge(t):Be(e)?.appOrigin??null},pB=async e=>{let t=e?.installDir??L(),r=uB(t),o=r!==null?Ge(r.wsUrl):Gae(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=cB.default.join(lB.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Na.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let l=e?.profileEmail??Qe(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...l===null?{}:{AGENT_WITCH_PROFILE:l}};return await zae("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(l){return{ok:!1,errorMessage:l instanceof Error?l.message:"AgentWitch reinstall script failed."}}finally{Na.default.existsSync(i)&&Na.default.unlinkSync(i)}}});var gB={};Et(gB,{attemptAgentWitchWatchdogReinstall:()=>Kae});var Kae,fB=a(()=>{"use strict";sB();mB();Kae=async e=>CT(e,()=>pB())});var yB,hB,SB,Vae,qae,Jae,cu,IT=a(()=>{"use strict";K1();fT();yT();hT();ST();gT();Fh();$h();tt();ra();J1();Uh();yB=e=>e===null?j():j(e),hB=async(e,t,r)=>{if(!await es(e))return"not_running";let n=yB(t);if(ir(n))return"healthy";let s=Oe(n);return Ke(s,r)?"stale_connection":"healthy"},SB=async e=>{let t=e?.staleAfterMs??12e4,r=L(),o=Pe(r);return Promise.all(o.map(async n=>{let s=await hB(n.launchAgentLabel,n.profileEmail,t),i=yB(n.profileEmail),l=Oe(i),c=await es(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:l,isConnectionStale:Ke(l,t),needsRevive:s!=="healthy",reason:s}}))},Vae=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled AgentWitch from install script and retried kickstart.":t.reinstallErrorMessage??"AgentWitch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All AgentWitch WebSocket connections are healthy."},qae=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",Jae=async e=>{let t=await et(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(tB(),eB)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},cu=async e=>{if(!or())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await Ma(r),await au(r);let o=Pe(r),n=[];for(let u of o){let g=await hB(u.launchAgentLabel,u.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:g});continue}n.push(await Jae({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let u=Zn();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,l,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(fB(),gB)),g=await u(n);s=g.attempted,i=g.ok,l=g.errorMessage,c=[...g.targets]}catch(u){s=!0,i=!1,l=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...l!==void 0?{reinstallErrorMessage:l}:{}}:{}};return e?.skipLog!==!0&&Z1({event:qae(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Vae(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:l}),targets:c}),d}});var PB,Bh,AB=a(()=>{"use strict";PB=m(require("node:os"));fT();Uh();IT();Bh=async()=>{let e=await SB(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:PB.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ja(1)[0]??null}}});var vT=a(()=>{"use strict";gT();IT();AB();Uh()});var du,uu,pu,bB=a(()=>{"use strict";pe();vT();du=async()=>{await Ma();let e=Pe(),t=[];for(let r of e){let o=await et(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Zn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},uu=cu,pu=cu});var xT=a(()=>{"use strict";bB()});var Kh,Gh,_B,WT,kB,Yae,Xae,Zae,Qae,ele,Vh,RB=a(()=>{"use strict";Kh=require("node:child_process"),Gh=m(require("node:fs")),_B=m(require("node:os")),WT=m(require("node:path")),kB=require("node:util");pe();q();Qn();Yae=(0,kB.promisify)(Kh.execFile),Xae=()=>WT.default.join(_B.default.homedir(),"Library","LaunchAgents"),Zae=async e=>{if(!$t())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Yae("launchctl",["bootout",r]).catch(()=>{})},Qae=e=>{let t=WT.default.join(Xae(),`${e}.plist`);Gh.default.existsSync(t)&&Gh.default.unlinkSync(t)},ele=e=>{(0,Kh.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Vh=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!Gh.default.existsSync(e))return{ok:!1,message:"No local AgentWitch install directory was found.",removedLaunchAgentLabels:[]};let t=lo(e);for(let r of t)await Zae(r),Qae(r);return ele(e),{ok:!0,message:"Local AgentWitch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var EB,qh,wB,Da,TB,tle,rle,ole,OT,nle,MT,CB=a(()=>{"use strict";EB=require("node:child_process"),qh=m(require("node:fs")),wB=m(require("node:os")),Da=m(require("node:path")),TB=require("node:util");pe();Qn();tle=(0,TB.promisify)(EB.execFile),rle=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],ole=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],OT=e=>{qh.default.existsSync(e)&&qh.default.rmSync(e,{force:!0})},nle=async e=>{if(!$t())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await tle("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},MT=async e=>{let r=(e.listLaunchAgentLabels??lo)(e.layout.installDir),o=e.launchAgentsDir??Da.default.join(wB.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??nle;for(let i of r)await n(i),OT(Da.default.join(o,`${i}.plist`));let s=Da.default.dirname(e.layout.configPath);for(let i of rle)OT(Da.default.join(s,i));for(let i of ole)OT(Da.default.join(e.layout.installDir,i));return qh.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var jT,LB=a(()=>{"use strict";jT="unknown_identity"});var NT=a(()=>{"use strict";hw();LB()});var sle,DT,IB=a(()=>{"use strict";NT();sle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DT=e=>e.type!=="system.error"||!sle(e.payload)?!1:e.payload.errorCode===jT});var HT=a(()=>{"use strict";RB();CB();IB()});var Jh=a(()=>{"use strict";pe();jr();HT();vT()});var Ha,Yh,Xh=a(()=>{"use strict";Jh();Ha=(e=20)=>ja(e),Yh=Bh});var Zh,Fa,Qh,eS=a(()=>{"use strict";Jh();Zh=ms,Fa=(e=20)=>ds(e),Qh=e=>ps(e)});var tS,FT=a(()=>{"use strict";Jh();tS=()=>Vh()});var vB=a(()=>{"use strict";QR();$E();mT();xT();Xh();eS();FT()});var xB={};Et(xB,{buildAgentWitchAutomationStatusFromWakeServer:()=>iu,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Zh,buildAgentWitchWakeHealthResponse:()=>Ed,buildAgentWitchWakeIdentityResponse:()=>wd,buildAgentWitchWatchdogStatus:()=>Yh,installHarnessFromWakeServer:()=>Fd,readAgentWitchSelfUpdateLogEntries:()=>Fa,readAgentWitchWatchdogLogEntries:()=>Ha,restartAgentWitchFromWakeServer:()=>pu,reviveAgentWitchWebSocketFromWakeServer:()=>uu,runAgentWitchSelfUpdateFromWakeServer:()=>Qh,runAgentWitchUninstallLocalFromWakeServer:()=>tS,runAutomationFromWakeServer:()=>su,syncAutomationsFromWakeServer:()=>nu,wakeAgentWitchLaunchAgents:()=>du});var WB=a(()=>{"use strict";vB()});var OB,MB,$T,zT,jB=a(()=>{"use strict";OB=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),MB=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?OB(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?OB(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},$T=e=>{let t=e.watchdogLogs.map(MB).join(""),r=e.updateLogs.map(MB).join("");return`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AgentWitch local logs</title>
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
  <h1>AgentWitch local logs</h1>
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
</html>`},zT=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var NB,DB,HB=a(()=>{"use strict";NB=m(require("node:net")),DB=()=>new Promise((e,t)=>{let r=NB.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var FB,ile,ale,UT,$B=a(()=>{"use strict";FB=m(require("node:net"));pe();HB();Rd();kd();tt();ile=e=>new Promise(t=>{let r=FB.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),ale=e=>new Promise(t=>{setTimeout(t,e)}),UT=async(e={})=>{let t=L(),r=lr(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await ile(r))return WF(r),r;i<o&&await ale(n)}let s=await DB();fy(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{Tc({launchAgentPrefix:Re(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var lle,BT,zB=a(()=>{"use strict";lle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BT=e=>({force:lle(e)&&e.force===!0})});var mu=a(()=>{"use strict";Dd();jB();$B();zB();lk();Af();ns()});var GT,G,KT,VT,gu,UB=a(()=>{"use strict";GT=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},G=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},KT=e=>{e.writeHead(403),e.end()},VT=e=>e.url?.split("?")[0]??"/",gu=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var pr=a(()=>{"use strict";UB()});var cle,BB,GB=a(()=>{"use strict";mT();pr();cle=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return G(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},BB=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return G(e.response,200,iu(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await cle(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=nu(t);return G(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await su(t);return G(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var dle,VB,KB,qB,qT,JB,JT=a(()=>{"use strict";dle=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],VB=e=>/embed|minilm|^bge-/i.test(e),KB=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),qB=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),qT=e=>e.filter(t=>t.trim().length>0&&!VB(t)),JB=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!VB(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>KB(s,o));if(n!==void 0)return n}for(let n of dle){let s=r.find(i=>KB(i,n));if(s!==void 0)return s}return r[0]??null}});var YT,ZB,QB,rS,eG,YB,XB,ule,ple,mle,gle,fle,yle,mr,fu=a(()=>{"use strict";YT=require("node:child_process"),ZB=m(require("node:fs")),QB=m(require("node:os")),rS=m(require("node:path"));jr();ar();JT();eG=3e3,YB=["claude-cli","codex","cursor","antigravity"],XB={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},ule=(e,t)=>new Promise(r=>{let o=(0,YT.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},eG);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),ple=()=>{let e=QB.default.homedir();return["ollama",rS.default.join(e,".local","bin","ollama"),rS.default.join(e,".agent-witch","ollama","ollama"),rS.default.join(e,".local-agent-witch","ollama","ollama")]},mle=e=>new Promise(t=>{let r=(0,YT.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},eG);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(qB(Buffer.concat(o).toString("utf8")))})}),gle=async()=>{for(let e of ple()){if(e!=="ollama"&&!ZB.default.existsSync(e))continue;let t=await mle(e);if(t!==null)return t}return[]},fle=e=>{let t=e.installedWriterIds.map(s=>XB[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=xe(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${XB[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},yle=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:oa},mr=async e=>{let t=YB.map(i=>{let l=Xf(i,e.commands);return ule(l.command,l.args)}),[r,...o]=await Promise.all([gle(),...t]),n=YB.flatMap((i,l)=>o[l]===!0?[i]:[]),s=JB(r,yle());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:fle({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var hle,Sle,XT,tG=a(()=>{"use strict";hle="http://127.0.0.1:11434",Sle=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},XT=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||hle;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Sle(await o.json()):null}catch{return null}}});var ZT=a(()=>{"use strict";ar();fu();tG();JT()});var Ple,rG,oG=a(()=>{"use strict";ZT();Ple={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},rG=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Ple[t]})),ollamaModels:qT(e.ollamaModels)})});var Ale,nG,sG=a(()=>{"use strict";ZT();pr();oG();Ale=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return G(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},nG=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await mr({commands:Ae({})});return G(e.response,200,{ok:!0,...rG({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await Ale(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await XT({model:r,prompt:o});return n===null?(G(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(G(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var ble,iG,aG=a(()=>{"use strict";$E();pr();ble=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return G(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},iG=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await ble(e);if(t===null)return!0;let r=Fd(t);return G(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var lG=a(()=>{"use strict";xt()});var QT,cG=a(()=>{"use strict";lG();Hd();QT=e=>{if(!So(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:pt({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var dG,eC,tC=a(()=>{"use strict";Z();xt();Hd();dG=e=>{if(!So(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},eC=async e=>{let t=dG(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=hn("Choose a folder for this AgentWitch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"AgentWitch is not configured on this computer."};let n=K({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve AgentWitch cloud connection."}:(pt({projectFolderPath:r}),await Gd(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to AgentWitch Cloud."})}});var uG=a(()=>{"use strict";cG();tC()});var pG,mG=a(()=>{"use strict";uG();tC();pr();pG=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=QT(t);return G(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await eC(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return G(e.response,o,r,e.cors.headers),!0}return!1}});var gG,fG=a(()=>{"use strict";mu();eS();Xh();gG=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=Ha(50),r=Fa(50);return e.response.writeHead(200,zT()),e.response.end($T({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var yG,hG=a(()=>{"use strict";QR();pr();yG=e=>e.request.method==="GET"&&e.pathname==="/health"?(G(e.response,200,Ed(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(G(e.response,200,wd(),e.cors.headers),!0):!1});var SG,PG=a(()=>{"use strict";FT();pr();SG=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await tS();return G(e.response,t.ok?200:503,t,e.cors.headers),!0}});var AG,bG=a(()=>{"use strict";xT();pr();AG=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await uu();return G(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await pu();return G(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await du();return G(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var _G,kG=a(()=>{"use strict";mu();eS();pr();_G=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Zh();return G(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=gu(e.request,"/update/logs",20,200);return G(e.response,200,{ok:!0,logs:Fa(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=BT(t),o=await Qh({force:r});return G(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var RG,EG=a(()=>{"use strict";Xh();pr();RG=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Yh();return G(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=gu(e.request,"/watchdog/logs",20,200);return G(e.response,200,{ok:!0,logs:Ha(t)},e.cors.headers),!0}return!1}});var wG,TG=a(()=>{"use strict";GB();sG();aG();mG();fG();hG();PG();bG();kG();EG();wG=[yG,gG,RG,AG,_G,SG,iG,pG,BB,nG]});var CG,LG=a(()=>{"use strict";TG();CG=async e=>{for(let t of wG)if(await t(e))return!0;return!1}});var _le,IG,vG=a(()=>{"use strict";Dd();pr();LG();_le=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:VT(e),readJsonBody:()=>GT(e)}),IG=async(e,t,r)=>{let o=e.headers.origin,n=Ky(o);try{if(o!==void 0&&o.length>0&&!n.allowed){KT(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=_le(e,t,r,n);if(await CG(s))return;G(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{G(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var xG,Ds,oS,nS=a(()=>{"use strict";xG=m(require("node:http"));mu();vG();Ds=async()=>{let e=await UT(),t=xG.default.createServer((r,o)=>{IG(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`AgentWitch wake server listening on http://127.0.0.1:${e}
`),t},oS=Ds});var WG={};Et(WG,{runAgentWitchBridgeCli:()=>kle});var kle,OG=a(()=>{"use strict";pe();nS();kle=async()=>{Ct("agent-witch-bridge");let e=await Ds(),t=uo(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var rC=a(()=>{"use strict";Tt()});var $a,oC,MG=a(()=>{"use strict";$a=(e,t,r)=>e===1?t:r,oC=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${$a(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${$a(i,"min","mins")} ago`;let l=Math.floor(o/864e5);if(l<7)return`${l} ${$a(l,"day","days")} ago`;let c=Math.floor(l/7);if(c<5)return`${c} ${$a(c,"week","weeks")} ago`;let d=Math.floor(l/30);if(d<12)return`${d} ${$a(d,"month","months")} ago`;let u=Math.floor(l/365);return`${u} ${$a(u,"year","years")} ago`}});var Hs,nC,Rle,Ele,sC,bn,yu,iC,jG=a(()=>{"use strict";Hs=m(require("node:fs")),nC=m(require("node:path")),Rle="local-ws-traffic.ndjson",Ele=500,sC=e=>nC.default.join(e.logsDir,Rle),bn=(e,t)=>{let r=sC(e);Hs.default.mkdirSync(nC.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Hs.default.appendFileSync(r,`${o}
`,"utf8")},yu=(e,t=Ele)=>{let r=sC(e);if(!Hs.default.existsSync(r))return[];let n=Hs.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let l=JSON.parse(i);typeof l=="object"&&l!==null&&"at"in l&&"direction"in l&&"type"in l&&"summary"in l&&s.push(l)}catch{}return s.reverse()},iC=e=>{let t=sC(e);Hs.default.existsSync(t)&&Hs.default.writeFileSync(t,"","utf8")}});var wle,NG,DG,HG=a(()=>{"use strict";NT();wle=new Set(Object.values(ah)),NG=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DG=e=>{if(!NG(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!wle.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!NG(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var FG,$G=a(()=>{"use strict";FG=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Tle,Cle,Lle,hu,zG=a(()=>{"use strict";$G();Tle=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Cle=e=>Tle.test(e),Lle=e=>FG(e),hu=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>hu(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Cle(o)){r[o]=Lle(n);continue}r[o]=hu(n)}return r}});var Kr,aC,Ile,vle,xle,lC,UG,BG,GG,Wle,sS,Fs,iS,cC,KG=a(()=>{"use strict";Kr=m(require("node:fs")),aC=m(require("node:path"));HG();zG();Ile="local-ws-trace.ndjson",vle=1e4,xle=1440*60*1e3,lC=e=>aC.default.join(e.logsDir,Ile),UG=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},BG=e=>{if(!Kr.default.existsSync(e))return;let t=Kr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-xle,n=t.filter(s=>{let i=UG(s);if(i===null)return!1;let l=Date.parse(i.at);return Number.isFinite(l)&&l>=r}).slice(-vle);Kr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},GG=(e,t)=>{let r=lC(e);Kr.default.mkdirSync(aC.default.dirname(r),{recursive:!0}),Kr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),BG(r)},Wle=e=>e.parsed===null?{_empty:!0}:hu(e.parsed),sS=(e,t,r)=>{let o=DG(r);GG(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Wle(o)})},Fs=(e,t)=>{GG(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:hu({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},iS=(e,t=80)=>{let r=lC(e);if(BG(r),!Kr.default.existsSync(r))return[];let o=Kr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=UG(s);i!==null&&n.push(i)}return n.reverse()},cC=e=>{let t=lC(e);Kr.default.existsSync(t)&&Kr.default.writeFileSync(t,"","utf8")}});var _n,VG,Ole,dC,aS,qG=a(()=>{"use strict";_n=m(require("node:fs")),VG=m(require("node:path")),Ole=256e3,dC=e=>{_n.default.mkdirSync(VG.default.dirname(e),{recursive:!0}),_n.default.writeFileSync(e,"","utf8")},aS=(e,t=Ole)=>{if(!_n.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=_n.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),l=_n.default.openSync(e,"r");try{_n.default.readSync(l,i,0,s,n)}finally{_n.default.closeSync(l)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Su=a(()=>{"use strict";jG();KG();qG()});var uC,pC,JG=a(()=>{"use strict";uC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pC=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${uC(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${uC(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the AgentWitch client stderr log on this computer (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${uC(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var YG=a(()=>{"use strict";JG()});var mC,gC=a(()=>{"use strict";mC=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),l=Math.floor(o%3600/60);return l>0?`${i}h ${l}m`:`${i}h`}});var fC=a(()=>{"use strict";ed()});var yC,hC,XG=a(()=>{"use strict";fC();yC=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},hC=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var ZG=a(()=>{"use strict";gC();XG()});var QG,Pu,SC,Au=a(()=>{"use strict";gC();QG=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pu=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=QG(e),r=QG(mC(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},SC=`(function () {
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
})();`});var $s,Mle,PC,e2=a(()=>{"use strict";$s=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mle=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},PC=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${$s(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?$s(r.direction):$s(r.kind),i=`trace-body-${o}`,l=$s(Mle(r.body));return`<tr>
        <td title="${$s(r.at)}">${$s(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${$s(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${l}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var t2,jle,lS,Nle,AC,r2=a(()=>{"use strict";ac();Ue();Tt();t2=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},jle=e=>t2(e)===ao?vi:Ii,lS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nle=(e,t)=>`${t?`<h3>${lS(e.label)}</h3>`:""}
    <p class="muted">${lS(e.instructions)}</p>
    <pre class="sdlc-pre mono">${lS(e.command)}</pre>
    <p class="muted">${lS(e.note)}</p>`,AC=e=>{let t=ic({platform:Vn(e.platform),installDirName:t2(e.installDir),launchAgentPrefix:jle(e.installDir)}),r=t.length>1;return`<section class="card">
    <p class="eyebrow">AgentWitch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if AgentWitch Cloud cannot open Status, restart the AgentWitch client on this computer.</p>${r?`
    <p class="muted">Use the command for this computer's operating system.</p>`:""}
    ${t.map(n=>Nle(n,r)).join(`
    `)}
  </section>`}});var bC,o2=a(()=>{"use strict";ac();bC=e=>Vn(e)==="mac"?"Revive requested. The bridge will reconnect if this Mac can reach launchd.":"Revive requested. The bridge will reconnect when this computer can reach AgentWitch Cloud."});var n2=a(()=>{"use strict";Au();e2();r2();o2();Au()});var s2,i2,a2,l2,c2,d2,u2,za=a(()=>{"use strict";s2="projects",i2="knowledge",a2="chunks.ndjson",l2="lessons.ndjson",c2="error-chunks.ndjson",d2="usage-stats.json",u2="knowledge-location.json"});var cS,Dle,dS,_C=a(()=>{"use strict";cS=m(require("node:path"));za();Dle=(e,t)=>{let r=t.trim(),o=cS.default.join(e.installDir,s2,r,i2);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:cS.default.join(o,a2),memoryRunsFilePath:cS.default.join(o,l2)}},dS=Dle});var kC,Hle,p2,m2=a(()=>{"use strict";kC=m(require("node:fs"));za();ws();Hle=e=>{let t=Gt(e.projectFolderPath),r=`${t.metaDirPath}/${u2}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your AgentWitch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};kC.default.mkdirSync(t.metaDirPath,{recursive:!0}),kC.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},p2=Hle});var Ua,f2,g2,Fle,y2,h2=a(()=>{"use strict";Ua=m(require("node:fs")),f2=m(require("node:path"));rn();ws();_C();m2();g2=(e,t)=>{Ua.default.existsSync(e)&&(Ua.default.existsSync(t)&&Ua.default.statSync(t).size>0||(Ua.default.mkdirSync(f2.default.dirname(t),{recursive:!0}),Ua.default.copyFileSync(e,t)))},Fle=e=>{let t=Gt(e.projectFolderPath),r=dS(e.layout,e.projectId),o=`${t.memoryDirPath}/${Bi}`;g2(t.ragChunksFilePath,r.ragChunksFilePath),g2(o,r.memoryRunsFilePath),p2({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},y2=Fle});var S2,$le,Ba,uS=a(()=>{"use strict";S2=m(require("node:path"));rn();ws();h2();tw();_C();$le=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Qy(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){y2({layout:e.layout,projectFolderPath:t,projectId:o});let s=dS(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=Gt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:S2.default.join(n.memoryDirPath,Bi),projectId:null}},Ba=$le});var pS,Ule,mS,RC=a(()=>{"use strict";pS=m(require("node:fs"));za();Ule=(e,t=500)=>{if(!pS.default.existsSync(e))return;let r=pS.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);pS.default.writeFileSync(e,`${o.join(`
`)}
`)},mS=Ule});var gS,Ble,zs,EC=a(()=>{"use strict";gS=m(require("node:path"));za();uS();Ble=e=>{let t=Ba(e);if(t===null)return null;let r=gS.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:gS.default.join(r,d2),errorChunksFilePath:gS.default.join(r,c2)}},zs=Ble});var A2,bu,b2,P2,wC,_2,Vle,TC,k2,CC,LC,IC,vC=a(()=>{"use strict";A2=require("node:crypto"),bu=m(require("node:fs")),b2=m(require("node:path"));Ea();za();EC();P2=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),wC=e=>{if(!bu.default.existsSync(e))return P2();try{let t=JSON.parse(bu.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return P2()},_2=(e,t)=>{bu.default.mkdirSync(b2.default.dirname(e),{recursive:!0}),bu.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Vle=e=>{let t=ur(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,A2.createHash)("sha256").update(o).digest("hex").slice(0,16)},TC=e=>{let t=zs(e);return t===null?null:wC(t.usageStatsFilePath)},k2=e=>{if(e.chunkIds.length===0)return;let t=zs(e);if(t===null)return;let r=wC(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;_2(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},CC=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=zs(e);if(r===null)return null;let o=Vle(t),n=wC(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return _2(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},LC=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,IC=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var _u,R2,qle,Jle,E2,Yle,xC,ku,Ga,WC,Ka,OC,MC=a(()=>{"use strict";_u=m(require("node:fs")),R2=m(require("node:path"));Ea();uS();RC();vC();qle="http://127.0.0.1:11434",Jle="nomic-embed-text",E2=(e,t,r)=>Ba({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,Yle=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let l=e[i]??0,c=t[i]??0;o+=l*c,n+=l*l,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},xC=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},ku=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||qle,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Jle;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Ga=(e,t,r)=>{let o=E2(e,t,r);if(o===null||!_u.default.existsSync(o))return[];let n=_u.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},WC=async e=>{let t=ur(e.text),r=xC(t);if(r.length===0)return 0;let o=E2(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;_u.default.mkdirSync(R2.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await ku(s);if(i===null)continue;let l={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};_u.default.appendFileSync(o,`${JSON.stringify(l)}
`,"utf8"),n+=1}return mS(o),n},Ka=async e=>{let t=await ku(e.query);if(t===null)return[];let r=e.minScore??0,s=Ga(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:Yle(t,i.embedding)})).filter(i=>i.score>=r).sort((i,l)=>l.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return k2({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},OC=e=>e.length===0?"":`Local knowledge (from this computer):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var Ru,w2,Xle,Zle,jC,NC,DC,T2=a(()=>{"use strict";Ru=m(require("node:fs")),w2=m(require("node:path"));Ea();EC();RC();MC();Xle=e=>{if(!Ru.default.existsSync(e))return[];let t=Ru.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Zle=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let l=e[i]??0,c=t[i]??0;o+=l*c,n+=l*l,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},jC=async e=>{let t=zs(e);if(t===null)return 0;let r=ur(e.text),o=xC(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;Ru.default.mkdirSync(w2.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let l=await ku(i);if(l===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:l,createdAt:new Date().toISOString(),source:e.source??"run.failure"};Ru.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return mS(n,200),s},NC=async e=>{let t=zs(e);if(t===null)return[];let r=await ku(e.query);if(r===null)return[];let o=e.minScore??.3;return Xle(t.errorChunksFilePath).map(s=>({chunk:s,score:Zle(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},DC=e=>e.length===0?"":`Past failures on this computer (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var HC=a(()=>{"use strict";MC();vC();T2()});var Ne,FC,$C=a(()=>{"use strict";yw();Ne=fw,FC=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${Ne.gray50};
  --aw-zinc-100: ${Ne.gray100};
  --aw-zinc-200: ${Ne.gray200};
  --aw-zinc-400: ${Ne.gray400};
  --aw-zinc-500: ${Ne.gray500};
  --aw-zinc-600: ${Ne.gray600};
  --aw-zinc-700: ${Ne.gray700};
  --aw-zinc-800: ${Ne.gray900};
  --aw-zinc-900: ${Ne.gray900};
  --aw-brand-600: ${Ne.brand600};
  --aw-brand-700: ${Ne.brand700};
  --aw-brand-50: ${Ne.brand50};
  --aw-emerald-50: ${Ne.success50};
  --aw-emerald-700: ${Ne.success700};
  --aw-amber-50: ${Ne.warning50};
  --aw-amber-900: ${Ne.warning900};
  --aw-red-50: ${Ne.error50};
  --aw-red-700: ${Ne.error700};
  --aw-radius-lg: 0.5rem;
  --aw-radius-xl: 0.75rem;
  --aw-radius-2xl: 1rem;
  --aw-shadow-sm: 0 1px 2px rgb(16 24 40 / 0.06);
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
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
.nav-link.is-active { color: var(--aw-brand-700); background: var(--aw-brand-50); }

.site-sidebar { display: none; }

@media (max-width: 767px) {
  .site-header-inner {
    flex-direction: column;
    align-items: stretch;
  }

  .site-header-actions {
    justify-content: flex-start;
  }

  .site-nav-header { width: 100%; }
}

@media (min-width: 768px) {
  body { padding-left: 14rem; }

  .site-sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    width: 14rem;
    height: 100vh;
    overflow-y: auto;
    gap: 1rem;
    padding: 1rem 0.75rem;
    border-right: 1px solid rgb(228 228 231 / 0.7);
    background: rgb(255 255 255 / 0.96);
  }

  .site-sidebar .brand {
    align-self: flex-start;
    align-items: flex-start;
  }

  .site-sidebar .brand-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    white-space: nowrap;
  }

  .site-sidebar .brand-sub { margin-left: 0; }

  .site-sidebar .site-nav {
    flex-direction: column;
    align-items: stretch;
    flex-wrap: nowrap;
  }

  .site-sidebar .nav-link { width: 100%; }

  .brand-in-header,
  .site-nav-header { display: none; }

  .site-header-inner {
    max-width: none;
    justify-content: flex-end;
  }
}

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
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--aw-brand-700);
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

.card h1 + .empty {
  margin-top: 1rem;
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
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
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
  outline: 2px solid rgb(26 68 190 / 0.45);
  outline-offset: 2px;
}

.btn:disabled,
.btn[disabled] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
  transform: none;
}

.btn-primary {
  background: var(--aw-brand-600);
  color: #fff;
  box-shadow: var(--aw-shadow-sm);
}
.btn-primary:hover { background: var(--aw-brand-700); }

.btn-secondary {
  background: #fff;
  color: var(--aw-zinc-700);
  border: 1px solid var(--aw-zinc-200);
  box-shadow: var(--aw-shadow-sm);
}
.btn-secondary:hover { background: var(--aw-zinc-50); border-color: var(--aw-zinc-400); }

.btn-danger {
  background: #fff;
  color: var(--aw-error-600, #dc2626);
  border: 1px solid color-mix(in srgb, var(--aw-error-600, #dc2626) 35%, transparent);
  box-shadow: var(--aw-shadow-sm);
}
.btn-danger:hover {
  background: color-mix(in srgb, var(--aw-error-600, #dc2626) 8%, #fff);
}

.btn-link {
  height: auto;
  padding: 0;
  background: transparent;
  color: var(--aw-brand-600);
  border: none;
  box-shadow: none;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
.btn-link:hover { color: var(--aw-brand-700); background: transparent; }

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
  border-color: var(--aw-brand-600);
  box-shadow: 0 0 0 2px rgb(26 68 190 / 0.2);
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

.history-table-wrap { overflow-x: auto; }

.history-row { cursor: pointer; }
.history-row:hover td,
.history-row:focus-within td { background: var(--aw-brand-50); }

.history-open {
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  color: var(--aw-brand-700);
  text-align: left;
  cursor: pointer;
}

.history-dialog {
  width: min(48rem, calc(100vw - 2rem));
  max-height: calc(100vh - 2rem);
  margin: auto;
  padding: 0;
  border: 1px solid var(--aw-zinc-200);
  border-radius: var(--aw-radius-2xl);
  background: #fff;
  color: var(--aw-zinc-900);
  box-shadow: 0 24px 48px rgb(16 24 40 / 0.18);
}

.history-dialog::backdrop { background: rgb(16 24 40 / 0.45); }

.history-dialog-bar {
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 0.75rem 0;
}

.history-dialog-bar form {
  margin: 0;
}

.history-dialog-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 1px solid transparent;
  border-radius: var(--aw-radius-lg);
  background: transparent;
  color: var(--aw-zinc-500);
  cursor: pointer;
  font: inherit;
}

.history-dialog-close:hover {
  background: var(--aw-zinc-100);
  color: var(--aw-zinc-700);
}

.history-dialog-close:focus-visible {
  outline: 2px solid var(--aw-brand-600);
  outline-offset: 2px;
}

.history-dialog-close-icon {
  width: 1.125rem;
  height: 1.125rem;
  display: block;
}

.history-dialog-body {
  overflow: auto;
  max-height: calc(100vh - 5.5rem);
  padding: 0 1.25rem 1.25rem;
}

.history-dialog-body h2 {
  margin: 1rem 0 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.history-dialog-body .sdlc-node-dialog-goal {
  margin: 0.5rem 0 0.75rem;
}

pre {
  margin: 0.75rem 0 0;
  padding: 0.75rem;
  border-radius: var(--aw-radius-lg);
  border: 1px solid var(--aw-zinc-200);
  background: var(--aw-zinc-50);
  white-space: pre-wrap;
  word-break: break-word;
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
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

h1 + .empty,
h2 + .empty,
.search-row + .empty,
.project-tab-panel > .empty {
  margin-top: 0.75rem;
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
  font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
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

.task-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.task-form > .actions { margin-top: 0.25rem; }

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

.textarea { min-height: 6rem; resize: vertical; font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.8125rem; }
form.sdlc-form { display: flex; flex-direction: column; }
.sdlc-compose .lede { margin-bottom: 1.25rem; }
.sdlc-compose.sdlc-compose-run-focus:not(.sdlc-compose-viewing-finished) { display: none; }
.sdlc-compose-run-started:not(.sdlc-compose-viewing-finished) .sdlc-compose-details-body { display: none; }
.sdlc-compose-run-started .sdlc-compose-step-actions { display: none !important; }
.sdlc-compose-run-started:not(.sdlc-compose-viewing-finished) [data-sdlc-compose-head-actions] {
  display: none !important;
}
.sdlc-compose-viewing-result [data-writer-status] { display: none; }
.sdlc-compose-viewing-finished .sdlc-compose-summary-collapsed {
  min-height: 3rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: var(--aw-radius-lg);
  background: var(--aw-zinc-50);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
}
.sdlc-compose-summary-chevron {
  flex: none;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--aw-zinc-500);
  margin-top: 0.15rem;
}
.sdlc-compose-details[open] > .sdlc-compose-summary-collapsed .sdlc-compose-summary-chevron { transform: rotate(90deg); }
.sdlc-compose-summary-copy { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
.sdlc-compose-summary-preview { font-size: 0.8125rem; line-height: 1.35; }
.sdlc-compose-summary-collapsed .sdlc-compose-summary-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--aw-zinc-700);
}
.sdlc-compose-viewing-finished .sdlc-compose-summary-collapsed::after {
  margin-left: 0.5rem;
}
.sdlc-run-success-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
}
.sdlc-run-complete-note { margin: 0.5rem 0 0; font-size: 0.8125rem; }
.sdlc-wizard-module-results { scroll-margin-top: 1rem; outline: none; }
.sdlc-wizard-module-results-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.5rem;
}
.sdlc-wizard-module-results-head .sdlc-run-panel-title { margin: 0; }
.sdlc-wizard-module-results-sub { margin: 0.15rem 0 0; font-size: 0.8125rem; }
.sdlc-copy-feedback-btn { min-width: 11.5rem; justify-content: center; }
.sdlc-run-toast {
  position: fixed;
  top: 4.5rem;
  right: 1.25rem;
  z-index: 40;
  max-width: min(22rem, calc(100vw - 2rem));
  padding: 0.65rem 1rem;
  border-radius: var(--aw-radius-lg);
  background: var(--aw-zinc-900);
  color: #fff;
  font-size: 0.875rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
  opacity: 0;
  transform: translateY(0.35rem);
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
}
.sdlc-run-toast-visible { opacity: 1; transform: translateY(0); }
.sdlc-wizard-source-compare { margin: 0 0 0.75rem; font-size: 0.875rem; }
.sdlc-wizard-source-prompt { margin: 0.5rem 0 0; max-height: 8rem; overflow: auto; }
.sdlc-wizard-outcome-table tr.sdlc-score-near-pass td:nth-child(2) {
  color: #b45309;
  font-weight: 600;
}
.sdlc-wizard-module-prompt-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.35rem;
}
.sdlc-wizard-module-prompt-row .sdlc-pre { flex: 1 1 12rem; margin: 0; }
.sdlc-wizard-copy-one { flex: none; font-size: 0.8125rem; padding: 0.3rem 0.65rem; }
.sdlc-wizard-module-results-highlight {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.35);
  border-radius: var(--aw-radius-xl);
}
.sdlc-wizard-process-details {
  margin-top: 0.65rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: var(--aw-radius-lg);
  padding: 0.35rem 0.75rem;
}
.sdlc-wizard-process-details-summary { cursor: pointer; font-weight: 600; }
.sdlc-wizard-process-details-body { padding-top: 0.35rem; }
.sdlc-run-panel-timeline-compact { padding: 0.75rem 1rem; }
.sdlc-run-progress-compact { margin: 0; display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.35rem 0.75rem; }
.sdlc-run-progress-compact-title { margin: 0; font-size: 0.875rem; }
.sdlc-compose-summary-hint { font-size: 0.8125rem; line-height: 1.35; }
.sdlc-history-badge-viewing { background: #eff6ff; color: #1d4ed8; }
.sdlc-history-item-viewing {
  background: #f8fafc;
  border-left: 3px solid #2563eb;
  border-radius: var(--aw-radius-lg);
  padding: 0.35rem 0.5rem 0.35rem 0.65rem;
  margin: 0 -0.5rem;
}
.sdlc-history-row-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; flex: none; }
.sdlc-history-delete { font-size: 0.8125rem; padding: 0.25rem 0.5rem; }
.btn-link {
  background: none;
  border: none;
  color: var(--aw-zinc-600);
  cursor: pointer;
  text-decoration: underline;
}
.btn-link:hover { color: var(--aw-zinc-900); }
.sdlc-writer-summary { margin: 0 0 0.75rem; }
.sdlc-compose-details-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 0.75rem;
}
.sdlc-goal-presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.4rem;
  margin: 0.35rem 0 0.5rem;
}
.sdlc-goal-presets-label {
  font-size: 0.75rem;
  margin-right: 0.15rem;
}
.sdlc-goal-preset-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--aw-zinc-200);
  background: var(--aw-zinc-50);
  font-size: 0.75rem;
  line-height: 1.3;
  color: var(--aw-zinc-700);
  cursor: pointer;
}
.sdlc-goal-preset-chip:hover {
  border-color: var(--aw-zinc-300);
  background: #fff;
  color: var(--aw-zinc-900);
}
.sdlc-goal-preset-chip:focus-visible {
  outline: 2px solid rgb(26 68 190 / 0.45);
  outline-offset: 2px;
}
.sdlc-compose-stepper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.5rem;
  margin: 0 0 0.25rem;
  padding: 0;
  list-style: none;
}
.sdlc-compose-stepper-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--aw-zinc-200);
  background: var(--aw-zinc-50);
  font-size: 0.75rem;
  color: var(--aw-zinc-600);
}
.sdlc-compose-stepper-item[aria-current="step"] {
  border-color: #2563eb;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
}
.sdlc-compose-stepper-item[aria-current="step"] .sdlc-compose-stepper-index {
  background: #2563eb;
  color: #fff;
}
.sdlc-compose-stepper-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999px;
  background: var(--aw-zinc-200);
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1;
}
.sdlc-compose-stepper-label { white-space: nowrap; }
.sdlc-compose-step { display: flex; flex-direction: column; gap: 1rem; }
.sdlc-compose-step[hidden] { display: none !important; }
.sdlc-compose-step-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--aw-zinc-900);
}
.sdlc-compose-step-lede { margin: 0; font-size: 0.875rem; line-height: 1.45; }
.sdlc-compose-step-error { margin: 0; }
.sdlc-block-flush { gap: 1rem; }
.sdlc-block-flush + .sdlc-block-flush { padding-top: 0; border-top: 0; }
.sdlc-compose-step-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem 0.65rem;
  padding-top: 0.25rem;
}
.sdlc-compose-step-actions .btn-primary,
.sdlc-compose-step-actions .sdlc-run-wizard-btn {
  margin-left: auto;
}
.sdlc-compose-review {
  margin: 0;
  display: grid;
  gap: 0.65rem 1rem;
  grid-template-columns: minmax(5.5rem, auto) 1fr;
  font-size: 0.875rem;
}
.sdlc-compose-review dt {
  margin: 0;
  font-weight: 600;
  color: var(--aw-zinc-600);
}
.sdlc-compose-review dd {
  margin: 0;
  color: var(--aw-zinc-900);
  word-break: break-word;
}
.sdlc-compose-review-preview {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.8125rem;
  color: var(--aw-zinc-600);
  white-space: pre-wrap;
  max-height: 6rem;
  overflow: auto;
}
.sdlc-compose-step .sdlc-submit-bar {
  margin-top: 0;
  padding-top: 0.75rem;
}
.sdlc-compose-summary {
  cursor: pointer;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--aw-zinc-900);
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.75rem;
}
.sdlc-compose-head {
  width: 100%;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  margin-bottom: 0.5rem;
}
.sdlc-compose-summary-leading {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.75rem;
}
.sdlc-compose-viewing-finished .sdlc-compose-head {
  align-items: flex-start;
}
.sdlc-compose-viewing-finished .sdlc-compose-summary-leading {
  align-items: flex-start;
}
.sdlc-compose-summary::-webkit-details-marker { display: none; }
.sdlc-compose-summary .eyebrow { margin: 0; }
.sdlc-form-head-actions { flex: none; margin-left: auto; }
.sdlc-form-head-actions .btn { flex: none; margin-top: 0; }
.sdlc-fields {
  border: 0;
  margin: 0;
  padding: 0;
  min-inline-size: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.sdlc-fields:disabled textarea,
.sdlc-fields:disabled input,
.sdlc-fields:disabled select {
  color: var(--aw-zinc-900);
  -webkit-text-fill-color: var(--aw-zinc-900);
  background: var(--aw-zinc-100);
  opacity: 1;
}
.sdlc-fields:disabled .btn { opacity: 0.55; }
.sdlc-block { display: flex; flex-direction: column; gap: 1rem; }
.sdlc-block + .sdlc-block { padding-top: 1.25rem; border-top: 1px solid var(--aw-zinc-200); }
.sdlc-block-title {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--aw-zinc-500);
}
.sdlc-locked {
  margin: 0;
  padding: 0.7rem 0.9rem;
  border-radius: 0.75rem;
  background: #eff6ff;
  color: #1e3a8a;
  font-size: 0.875rem;
}
.sdlc-writer {
  padding: 0.85rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: 0.75rem;
  background: var(--aw-zinc-50);
}
.sdlc-submit-bar {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--aw-zinc-200);
}
.sdlc-submit-bar .sdlc-writer-summary { margin: 0; }
.sdlc-submit-bar .sdlc-run-hint {
  margin: 0;
  line-height: 1.45;
}
.sdlc-submit-bar .sdlc-run-hint.alert-error {
  margin-top: 0.15rem;
  margin-bottom: 0.1rem;
}
.sdlc-submit-bar .sdlc-wizard-limits-callout {
  margin: 0;
  line-height: 1.45;
}
.sdlc-compose-step-actions .btn-primary { min-width: 8.5rem; }
.sdlc-run-wizard-btn[aria-busy="true"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.sdlc-wizard-resume-inputs { margin: 0; }
.sdlc-wizard-resume-inputs summary {
  list-style: none;
  cursor: pointer;
}
.sdlc-wizard-resume-inputs summary::-webkit-details-marker { display: none; }
.sdlc-wizard-resume-inputs-list {
  margin: 0.75rem 0 0;
  display: grid;
  gap: 0.65rem;
  font-size: 0.875rem;
}
.sdlc-wizard-resume-inputs-list dt {
  font-weight: 600;
  color: var(--aw-zinc-700);
}
.sdlc-wizard-resume-inputs-list dd {
  margin: 0.15rem 0 0;
  color: var(--aw-zinc-800);
  white-space: pre-wrap;
}
.sdlc-wizard-resume-active .lede {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
#prompt-optimizer-wizard-gate-slot { margin-bottom: 1.25rem; }
.sdlc-wizard-accordion {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.sdlc-wizard-accordion-item {
  border: 1px solid var(--aw-zinc-200);
  border-radius: 0.75rem;
  background: var(--aw-zinc-50);
  padding: 0.35rem 0.85rem 0.85rem;
}
.sdlc-wizard-accordion-summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--aw-zinc-800);
  padding: 0.45rem 0;
  list-style: none;
}
.sdlc-wizard-accordion-summary::-webkit-details-marker { display: none; }
.sdlc-wizard-accordion-body {
  padding-top: 0.5rem;
  border-top: 1px solid var(--aw-zinc-200);
  margin-top: 0.35rem;
}
.sdlc-wizard-gate,
.sdlc-wizard-resume {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.sdlc-wizard-gate h2,
.sdlc-wizard-resume h2 { margin: 0; }
.sdlc-wizard-gate > p:first-of-type,
.sdlc-wizard-resume .lede { margin: 0; }
.sdlc-wizard-gate-lede { margin: 0; font-size: 0.9375rem; color: var(--aw-zinc-700); line-height: 1.5; }
.sdlc-wizard-gate-active {
  outline: 1px solid rgb(26 68 190 / 0.25);
  background: linear-gradient(180deg, rgb(239 246 255 / 0.65), #fff 2.5rem);
}
form.sdlc-wizard-feedback {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
  border: 0;
}
.sdlc-wizard-actions,
.sdlc-wizard-interrupt-actions,
.sdlc-wizard-resume .actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}
.sdlc-wizard-vars,
.sdlc-wizard-revisions,
.sdlc-wizard-parent-prompt {
  margin: 0 0 1.25rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: 0.75rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.sdlc-wizard-parent-prompt-title {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
}
.sdlc-wizard-parent-prompt-body {
  margin: 0;
  max-height: min(40vh, 16rem);
  overflow: auto;
}
.sdlc-wizard-splits {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.sdlc-wizard-split-option {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: 0.75rem;
  background: var(--aw-zinc-50);
  box-shadow: var(--aw-shadow-sm);
}
.sdlc-wizard-split-option-label {
  display: block;
  cursor: pointer;
}
.sdlc-wizard-split-option-detail {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.15rem;
  padding-top: 0.65rem;
  border-top: 1px solid var(--aw-zinc-200);
}
.sdlc-wizard-split-orchestration {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.45;
}
.sdlc-wizard-split-parent-details {
  margin: 0;
}
.sdlc-wizard-split-parent-summary {
  cursor: pointer;
  font-size: 0.8125rem;
  color: var(--aw-brand-600);
}
.sdlc-wizard-split-modules-heading {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}
.sdlc-topology-explainer {
  margin: 0 0 1rem;
}
.sdlc-wizard-chunks {
  margin: 0.35rem 0 0 1.25rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.sdlc-wizard-chunk-prompt {
  margin: 0.35rem 0 0;
  font-size: 0.8125rem;
  max-height: 8rem;
  overflow: auto;
}
.sdlc-wizard-step-retry {
  margin: 0 0 0.75rem;
  padding: 0;
}
.sdlc-wizard-step-retry-btn {
  font-size: 0.8125rem;
}
.sdlc-wizard-separated-summary {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.sdlc-wizard-vars li,
.sdlc-wizard-revisions li,
.sdlc-wizard-splits li { line-height: 1.45; }
.sdlc-wizard-revisions label,
.sdlc-wizard-splits label { display: block; cursor: pointer; }
.sdlc-wizard-revision-row {
  display: block;
  line-height: 1.45;
}
.sdlc-wizard-revision-label {
  display: inline;
  cursor: pointer;
}
.sdlc-wizard-revision-title {
  font-weight: 600;
}
.sdlc-wizard-revision-row .sdlc-wizard-revision-prompt-info,
.sdlc-wizard-revision-row .sdlc-wizard-revision-judge-info {
  display: inline-flex;
  vertical-align: middle;
  margin: 0 0 0 0.2rem;
}
.sdlc-wizard-interrupt {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.25rem;
}
.sdlc-wizard-interrupt p { margin: 0; }
.sdlc-wizard-gate-end {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--aw-zinc-200);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
}
.sdlc-wizard-end-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
}
.sdlc-wizard-outcome h2 { margin: 0.35rem 0 0.75rem; }
.sdlc-wizard-outcome-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-bottom: 0.35rem;
}
.sdlc-wizard-outcome-head .sdlc-run-panel-title { margin: 0; }
.sdlc-wizard-outcome-head-actions { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.sdlc-wizard-outcome-toggle { font-size: 0.8125rem; padding: 0.3rem 0.65rem; }
.sdlc-wizard-outcome-module-table { margin-bottom: 0.75rem; overflow-x: auto; }
.sdlc-node-open[data-sdlc-outcome-step] { cursor: pointer; }
.sdlc-node-open[data-sdlc-outcome-step]:hover .sdlc-node-label { text-decoration: underline; }
.sdlc-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.sdlc-wizard-outcome-modules { margin: 0.5rem 0 1rem; padding-left: 1.25rem; }
.sdlc-wizard-outcome-step {
  margin-top: 0.65rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: var(--aw-radius-lg);
  padding: 0.35rem 0.75rem;
}
.sdlc-wizard-outcome-step-done {
  border-color: #bbf7d0;
  background: #f0fdf4;
}
.sdlc-wizard-outcome-step-failed {
  border-color: #fecaca;
  background: #fef2f2;
  box-shadow: 0 0 0 1px #fecaca;
}
.sdlc-wizard-outcome-step-pending {
  border-color: var(--aw-zinc-200);
  background: var(--aw-zinc-50);
  opacity: 0.92;
}
.sdlc-wizard-outcome-mark {
  flex: none;
  width: 0.95rem;
  height: 0.95rem;
  margin-top: 0.1rem;
  border-radius: 999px;
  position: relative;
}
.sdlc-wizard-outcome-mark-done {
  background: #166534;
  box-shadow: 0 0 0 3px #dcfce7;
}
.sdlc-wizard-outcome-mark-failed {
  background: #b91c1c;
  box-shadow: 0 0 0 3px #fee2e2;
}
.sdlc-wizard-outcome-mark-pending {
  background: transparent;
  border: 2px solid var(--aw-zinc-300);
  box-shadow: none;
}
.sdlc-wizard-outcome-step-title { font-weight: 600; }
.sdlc-wizard-active-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}
.sdlc-exact-prompt-pre {
  max-height: min(70vh, 28rem);
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
}
.sdlc-wizard-outcome-status {
  flex: none;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
}
.sdlc-wizard-outcome-status-done {
  color: #166534;
  background: #dcfce7;
}
.sdlc-wizard-outcome-status-failed {
  color: #b91c1c;
  background: #fee2e2;
}
.sdlc-wizard-outcome-status-pending {
  color: var(--aw-zinc-600);
  background: var(--aw-zinc-100);
}
.sdlc-wizard-outcome-step > summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}
.sdlc-wizard-outcome-step > summary::-webkit-details-marker { display: none; }
.sdlc-wizard-outcome-step > summary::before {
  content: "\u25B8";
  flex: none;
  font-size: 0.75rem;
  color: var(--aw-zinc-500);
}
.sdlc-wizard-outcome-step[open] > summary::before { content: "\u25BE"; }
.sdlc-wizard-outcome-step-body { padding: 0.5rem 0 0.35rem; }
.sdlc-badge {
  display: inline-block;
  margin-left: 0.35rem;
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: #dcfce7;
  color: #166534;
}
.sdlc-runner-block .sdlc-writer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.sdlc-writers { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem 1.25rem; align-items: start; }
.sdlc-limits { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(14rem, 0.9fr); gap: 1rem 1.5rem; align-items: start; }
form.sdlc-form textarea.input.sdlc-instruction {
  min-height: 4.5rem;
  font-family: inherit;
  font-size: 0.875rem;
}
.field-label-row { display: inline-flex; align-items: center; gap: 0.3rem; max-width: 100%; }
.sdlc-tip {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--aw-zinc-500);
  cursor: help;
}
.sdlc-tip:hover,
.sdlc-tip:focus-visible { color: var(--aw-zinc-900); background: var(--aw-zinc-100); }
.sdlc-tip-icon { width: 0.95rem; height: 0.95rem; display: block; }
.sdlc-tip-panel {
  display: none;
  position: absolute;
  z-index: 30;
  top: calc(100% + 0.4rem);
  left: 0;
  width: min(22rem, 72vw);
  padding: 0.75rem 0.85rem;
  border: 1px solid var(--aw-zinc-200);
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 10px 28px rgba(16, 24, 40, 0.12);
  color: var(--aw-zinc-800);
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.45;
  text-align: left;
  text-transform: none;
}
.sdlc-tip:hover .sdlc-tip-panel,
.sdlc-tip:focus .sdlc-tip-panel,
.sdlc-tip:focus-visible .sdlc-tip-panel,
.sdlc-tip[aria-expanded="true"] .sdlc-tip-panel {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.sdlc-tip-kicker {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--aw-zinc-500);
}
.sdlc-tip-example { white-space: pre-wrap; }
.sdlc-writer:nth-child(2) .sdlc-tip-panel,
.sdlc-limits > :last-child .sdlc-tip-panel { left: auto; right: 0; }
@media (max-width: 767px) {
  .sdlc-writers,
  .sdlc-limits { grid-template-columns: 1fr; }
  .sdlc-folder { flex-direction: column; align-items: stretch; }
  .sdlc-writer:nth-child(2) .sdlc-tip-panel,
  .sdlc-limits > :last-child .sdlc-tip-panel { left: 0; right: auto; }
}
.sdlc-writer { display: flex; flex-direction: column; gap: 0.35rem; }
.sdlc-writer p { margin: 0; }
.sdlc-run-head { display: flex; flex-direction: column; gap: 0.75rem; }
.sdlc-run-head-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem 1rem; }
.sdlc-run-head-top .eyebrow { margin-bottom: 0; }
.sdlc-run-goal { margin: 0.35rem 0 0.75rem; font-size: 1.05rem; font-weight: 600; line-height: 1.35; color: var(--text-primary, inherit); }
.sdlc-rerun-hint { margin: 0.35rem 0 0; font-size: 0.875rem; }
.sdlc-run-badge {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  white-space: nowrap;
}
.sdlc-run-badge-live { background: #dcfce7; color: #166534; }
.sdlc-run-badge-paused { background: #fef9c3; color: #854d0e; }
.sdlc-run-badge-done { background: #ecfdf5; color: #047857; }
.sdlc-run-badge-finished { background: #fffbeb; color: #92400e; }
.sdlc-run-badge-failed { background: #fee2e2; color: #991b1b; }
.sdlc-run-badge-budget { background: #ffedd5; color: #9a3412; box-shadow: inset 0 0 0 1px #fdba74; }
.sdlc-history-badge-failed { background: #fee2e2; color: #991b1b; }
.sdlc-cost-confirm .sdlc-cost-proposal { display: grid; gap: 0.5rem; margin: 0.75rem 0 1rem; }
.sdlc-cost-confirm .sdlc-cost-proposal > div { display: flex; justify-content: space-between; gap: 1rem; }
.sdlc-cost-confirm .sdlc-cost-proposal dt { color: var(--aw-zinc-500); }
.sdlc-cost-confirm .sdlc-cost-proposal dd { margin: 0; font-weight: 600; font-variant-numeric: tabular-nums; }
.sdlc-cost-controls { margin-top: 0.75rem; }
.sdlc-cost-early-stop .sdlc-checkbox-label { display: flex; gap: 0.5rem; align-items: flex-start; }
.sdlc-cost-estimate { margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--aw-zinc-200); }
.sdlc-cost-estimate-proposal { display: grid; gap: 0.4rem; margin: 0.5rem 0 0.75rem; }
.sdlc-cost-estimate-proposal > div { display: flex; justify-content: space-between; gap: 1rem; }
.sdlc-cost-estimate-proposal dt { color: var(--aw-zinc-500); }
.sdlc-cost-estimate-proposal dd { margin: 0; font-weight: 600; font-variant-numeric: tabular-nums; }
.sdlc-cost-rate-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--aw-zinc-100);
  border: 1px solid var(--aw-zinc-200);
  font-size: 0.85em;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.sdlc-cost-estimate-over { margin: 0.5rem 0 0; }
.sdlc-run-activity {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 1rem 1.1rem;
  border-radius: var(--aw-radius-xl);
  background: var(--aw-zinc-50);
  border: 1px solid var(--aw-zinc-200);
}
.sdlc-run-activity-icon { flex: none; display: flex; align-items: flex-start; padding-top: 0.2rem; }
.sdlc-run-activity-success {
  background: #ecfdf5;
  border-color: #a7f3d0;
}
.sdlc-run-activity-success .sdlc-run-title { color: #047857; }
.sdlc-run-activity-partial {
  background: #fffbeb;
  border-radius: var(--aw-radius-lg);
  padding: 0.65rem 0.75rem;
  border: 1px solid #fde68a;
}
.sdlc-run-activity-partial .sdlc-run-title { color: #92400e; }
.sdlc-wizard-outcome-step4-note { margin: 0 0 0.65rem; font-size: 0.8125rem; }
.sdlc-run-status-dot-success {
  background: #22c55e;
  box-shadow: 0 0 0 3px #dcfce7;
}
.sdlc-run-status-dot-partial {
  background: #f59e0b;
  box-shadow: 0 0 0 3px #fef3c7;
}
.sdlc-wizard-outcome-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.sdlc-wizard-outcome-step-hint { font-weight: 400; font-size: 0.8125rem; }
.sdlc-run-activity-copy { min-width: 0; flex: 1; }
.sdlc-run-title { margin: 0; font-size: 1.125rem; font-weight: 600; line-height: 1.35; color: var(--aw-zinc-900); }
.sdlc-run-detail { margin: 0.35rem 0 0; }
.sdlc-run-detail-block { margin-top: 0.35rem; }
.sdlc-run-reply-preview-label { margin: 0.5rem 0 0.25rem; font-size: 0.8125rem; }
.sdlc-run-reply-preview {
  margin: 0;
  max-height: min(50vh, 28rem);
  overflow: auto;
  padding: 0.5rem 0.65rem;
  font-size: 0.75rem;
  line-height: 1.35;
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--sdlc-reply-preview-bg, #f4f4f5);
  border: 1px solid var(--sdlc-reply-preview-border, #e4e4e7);
  border-radius: 0.375rem;
}
.sdlc-run-status-dot {
  width: 0.65rem;
  height: 0.65rem;
  margin-top: 0.35rem;
  border-radius: 999px;
  background: var(--aw-zinc-400);
}
.sdlc-run[data-live="true"] .sdlc-run-status-dot { background: #22c55e; box-shadow: 0 0 0 3px #dcfce7; }
.sdlc-run-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.8125rem;
  color: var(--aw-zinc-700);
}
.sdlc-run-meta-item { display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: baseline; }
.sdlc-run-meta-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--aw-zinc-500);
}
.sdlc-run-actions { margin-top: 0.15rem; }
.sdlc-run-actions form { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.75rem; }
.sdlc-run-grid {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--aw-zinc-200);
}
@media (min-width: 768px) {
  .sdlc-run-grid:not(.sdlc-run-grid-single) { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); align-items: start; }
}
.sdlc-run-panel-title {
  margin: 0 0 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--aw-zinc-500);
}
.sdlc-run-panel-scoring .sdlc-score { margin-top: 0; }
.sdlc-run-panel-scoring .muted { margin: 0.65rem 0 0; }
.sdlc-run-panel-timeline .sdlc-tree { margin-top: 0; }
.sdlc-run-prompts { display: flex; flex-direction: column; gap: 0.75rem; }
.sdlc-run-prompts-heading {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--aw-zinc-800);
}
.sdlc-run-prompts-list { display: flex; flex-direction: column; gap: 0.75rem; }
.sdlc-run-prompt-card { padding: 1.1rem 1.25rem; }
.sdlc-run-prompt-card-title { margin: 0; font-size: 1rem; font-weight: 600; }
.sdlc-run-prompt-card-score { margin: 0.25rem 0 0.5rem; }
.sdlc-working { display: flex; gap: 0.75rem; align-items: flex-start; }
.sdlc-spin {
  width: 0.95rem;
  height: 0.95rem;
  margin-top: 0.15rem;
  border: 2px solid #d0d5dd;
  border-top-color: #2150d6;
  border-radius: 50%;
  animation: sdlc-spin 0.8s linear infinite;
  flex: none;
}
@keyframes sdlc-spin { to { transform: rotate(360deg); } }
.sdlc-score { display: flex; gap: 0.35rem; flex-wrap: wrap; margin-top: 1rem; }
.sdlc-band { flex: 1 1 6.5rem; padding: 0.4rem 0.5rem; border-radius: 0.5rem; font-size: 0.75rem; text-align: center; }
.sdlc-band-bad { background: #fee2e2; color: #991b1b; }
.sdlc-band-weak { background: #ffedd5; color: #9a3412; }
.sdlc-band-close { background: #fef9c3; color: #854d0e; }
.sdlc-band-passes { background: #dcfce7; color: #166534; }
.sdlc-tree { list-style: none; margin: 1rem 0 0; padding: 0; }
.sdlc-node { display: block; position: relative; padding-bottom: 1rem; }
.sdlc-node:last-child { padding-bottom: 0; }
.sdlc-node:not(:last-child)::after { content: ""; position: absolute; left: 0.42rem; top: 1.05rem; bottom: 0; width: 2px; background: #d0d5dd; }
.sdlc-node-row { display: flex; align-items: flex-start; gap: 0.5rem; }
.sdlc-node-row .sdlc-node-open { flex: 1; min-width: 0; }
.sdlc-node-row-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.05rem;
}
.sdlc-node-skip { flex-shrink: 0; margin: 0; padding: 0; }
.sdlc-node-skip-link {
  font-size: 0.8125rem;
  line-height: 1.2;
  min-height: 0;
  white-space: nowrap;
}
.sdlc-node-open { display: grid; grid-template-columns: 1.25rem minmax(0, 1fr); column-gap: 0.75rem; align-items: start; width: 100%; margin: 0; padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.sdlc-node-open:hover .sdlc-node-label,
.sdlc-node-open:focus-visible .sdlc-node-label { text-decoration: underline; }
.sdlc-node-mark { width: 0.95rem; height: 0.95rem; margin-top: 0.15rem; border-radius: 999px; background: #166534; box-shadow: 0 0 0 4px #dcfce7; position: relative; z-index: 1; }
.sdlc-node-mark-failed { background: #b91c1c; box-shadow: 0 0 0 4px #fee2e2; }
.sdlc-node-reason-failed { color: #b91c1c; }
.sdlc-node-active .sdlc-spin { margin-top: 0.15rem; position: relative; z-index: 1; }
.sdlc-node-label { line-height: 1.4; padding-top: 0.05rem; }
.sdlc-node-reason { display: block; margin-top: 0.25rem; color: var(--aw-zinc-700); font-size: 0.8125rem; }
.sdlc-pipeline {
  list-style: none;
  margin: 0.65rem 0 0 2rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.sdlc-pipeline-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  line-height: 1.35;
}
.sdlc-pipeline-label { flex: 1; min-width: 0; color: var(--aw-zinc-800); }
.sdlc-pipeline-mark {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  border: 2px solid var(--aw-zinc-300);
  flex-shrink: 0;
}
.sdlc-pipeline-mark-done {
  border-color: #166534;
  background: #166534;
  box-shadow: none;
}
.sdlc-pipeline-step-active .sdlc-pipeline-label { font-weight: 600; color: var(--aw-zinc-900); }
.sdlc-pipeline-step-pending .sdlc-pipeline-label { color: var(--aw-zinc-500); }
.sdlc-pipeline-modal { margin-left: 0; margin-top: 0.5rem; }
.sdlc-wizard-step-modal .sdlc-pre-preview {
  margin: 0.35rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--aw-zinc-800);
  white-space: pre-wrap;
  word-break: break-word;
}
.sdlc-wizard-step-modal .sdlc-pre-expand { margin-top: 0.35rem; }
.sdlc-pipeline-terminal {
  margin-top: 0.5rem;
  padding: 0.65rem 0.75rem;
  font-size: 0.75rem;
  max-height: 10rem;
  overflow: auto;
  background: var(--aw-zinc-900);
  color: #e4e4e7;
  border-radius: 0.5rem;
}
.sdlc-field-info {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  border: 1px solid var(--aw-zinc-300);
  border-radius: 999px;
  background: #fff;
  color: var(--aw-zinc-600);
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
}
.sdlc-field-info:hover,
.sdlc-field-info:focus-visible {
  border-color: var(--aw-brand-500);
  color: var(--aw-brand-600);
}
.sdlc-manual { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
.sdlc-manual-verdict { margin: 0; }
.sdlc-manual textarea.input { min-height: 6rem; }
.sdlc-manual-score { max-width: 8rem; }
.sdlc-pass { max-width: none; gap: 0.45rem; }
.sdlc-pass-head { display: flex; justify-content: space-between; align-items: baseline; }
.sdlc-pass-value { font-size: 1.25rem; font-weight: 600; font-variant-numeric: tabular-nums; color: #166534; }
.sdlc-pass-scale { position: relative; padding-bottom: 1.15rem; }
.sdlc-pass-bar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0.5rem;
  height: 0.75rem;
  border-radius: 999px;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    #f87171 0%,
    #fb923c var(--sdlc-weak),
    #facc15 var(--sdlc-close),
    #4ade80 100%
  );
}
.sdlc-pass-range {
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 1.75rem;
  margin: 0;
  background: transparent;
  cursor: pointer;
}
.sdlc-pass-range:focus { outline: none; }
.sdlc-pass-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 3px #bbf7d0; }
.sdlc-pass-range::-webkit-slider-runnable-track {
  height: 0.75rem;
  background: transparent;
  border-radius: 999px;
}
.sdlc-pass-range::-moz-range-track {
  height: 0.75rem;
  border: none;
  background: transparent;
  border-radius: 999px;
}
.sdlc-pass-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.15rem;
  height: 1.15rem;
  margin-top: -0.2rem;
  border-radius: 999px;
  background: #fff;
  border: 2px solid #166534;
  box-shadow: 0 1px 2px rgb(0 0 0 / 18%);
}
.sdlc-pass-range::-moz-range-thumb {
  width: 1.15rem;
  height: 1.15rem;
  border: none;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 0 0 2px #166534;
}
.sdlc-pass-mark {
  position: absolute;
  top: 1.45rem;
  width: 2px;
  height: 0.4rem;
  background: #166534;
  transform: translateX(-1px);
  pointer-events: none;
}
.sdlc-pass-mark-label {
  position: absolute;
  top: 0.45rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.6875rem;
  font-weight: 600;
  color: #166534;
}
.sdlc-pass-legend { margin: 0; font-size: 0.75rem; color: var(--aw-zinc-600); }
.sdlc-folder { display: flex; gap: 0.75rem; align-items: flex-end; }
.sdlc-folder > .field { flex: 1 1 auto; }
form.sdlc-form > .actions { margin-top: 0.25rem; }
form.sdlc-form textarea.input {
  height: auto;
  min-height: 6rem;
  max-height: none;
  padding: 0.75rem;
  line-height: 1.45;
  overflow: hidden;
  resize: none;
}
form.sdlc-form textarea.input[name="prompt"] { min-height: 12rem; }
.sdlc-history-details { margin-top: 0.5rem; }
.sdlc-history-details-summary {
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  list-style: none;
  margin: 0;
  padding: 0.25rem 0;
}
.sdlc-history-details-summary::-webkit-details-marker { display: none; }
.sdlc-history-details-summary .eyebrow { display: block; margin-bottom: 0.15rem; }
.sdlc-history-heading { margin: 0; font-size: 1.125rem; }
.sdlc-history-badge {
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.55rem;
  text-transform: uppercase;
  white-space: nowrap;
}
.sdlc-history-badge-done { background: #ecfdf5; color: #047857; }

.sdlc-history-badge-passed { background: color-mix(in srgb, #059669 14%, #fff); color: #047857; }
.sdlc-history-badge-failed { background: color-mix(in srgb, #dc2626 12%, #fff); color: #b91c1c; }
.sdlc-history-badge-stopped { background: color-mix(in srgb, #d97706 14%, #fff); color: #b45309; }
.sdlc-outcome-badge { display: inline-flex; align-items: center; border-radius: 999px; padding: 0.15rem 0.65rem; font-size: 0.75rem; font-weight: 600; }
.sdlc-outcome-badge-passed { background: color-mix(in srgb, #059669 14%, #fff); color: #047857; }
.sdlc-outcome-badge-failed { background: color-mix(in srgb, #dc2626 12%, #fff); color: #b91c1c; }
.sdlc-outcome-badge-stopped { background: color-mix(in srgb, #d97706 14%, #fff); color: #b45309; }
.sdlc-module-status-passed { font-weight: 600; color: #047857; }
.sdlc-module-status-failed { font-weight: 600; color: #b91c1c; }
.sdlc-module-status-stopped { font-weight: 600; color: #b45309; }
.sdlc-best-outcome-row { margin: 0.35rem 0 0.5rem; }
.sdlc-timeout-tip { cursor: help; }
.sdlc-best-readonly { margin-top: 0.75rem; }
.sdlc-best-readonly summary { cursor: pointer; font-weight: 600; }

.sdlc-history-badge-live { background: #eff6ff; color: #1d4ed8; }
.sdlc-history-badge-paused { background: #fffbeb; color: #b45309; }
.sdlc-history-row-main { align-items: flex-start; display: flex; gap: 0.65rem; min-width: 0; }
.sdlc-history-row-copy { min-width: 0; }
.sdlc-history { list-style: none; margin: 0.75rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 1.25rem; }
.sdlc-history li { margin: 0; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.sdlc-history p { margin: 0.2rem 0 0; }
.sdlc-history form { margin: 0; }
.sdlc-history button { flex: none; }

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
.project-tabs { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 1.25rem 0 0.75rem; }
.project-tab { border: 1px solid var(--aw-zinc-200); border-radius: 9999px; font-size: 0.8125rem; padding: 0.35rem 0.75rem; text-decoration: none; color: inherit; }
.project-tab-active { background: var(--aw-zinc-900); border-color: var(--aw-zinc-900); color: #fff; }
.project-tab-panel { margin-top: 0.5rem; }
.project-cloud-actions { margin-top: 0.75rem; }
.inline-form { display: inline; }
.danger-zone {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid color-mix(in srgb, var(--aw-error-600, #dc2626) 25%, var(--aw-zinc-200));
}
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
`.trim()});var Qle,ece,zC,C2,UC,L2=a(()=>{"use strict";$C();Au();Qle=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,ece=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],zC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C2=(e,t)=>`<a class="${e}" href="/" aria-label="AgentWitch Local home, install bundle ${t}">${Qle}<span class="brand-text">AgentWitch<span class="brand-sub">Local(${t})</span></span></a>`,UC=e=>{let t=ece.map(l=>{let c=l.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${l.href}"${c?' aria-current="page"':""}>${l.label}</a>`}).join(""),r=zC(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=zC(e.installBundleVersionLabel?.trim()??"unknown"),s=C2("brand brand-in-sidebar",n),i=C2("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${zC(e.title)} \xB7 AgentWitch Local</title>
  <style>${FC}</style>
</head>
<body>
  <aside class="site-sidebar">
    ${s}
    <nav class="site-nav site-nav-sidebar" aria-label="Local bridge">${t}</nav>
  </aside>
  <header class="site-header">
    <div class="site-header-inner">
      ${i}
      <div class="site-header-actions">
        <nav class="site-nav site-nav-header" aria-label="Local bridge">${t}</nav>
        ${o}
        <a class="btn btn-secondary cloud-open-link" href="${r}" target="_blank" rel="noopener noreferrer" aria-label="Open AgentWitch cloud at ${r}">Open cloud \u2197</a>
      </div>
    </div>
  </header>
  <main class="site-main">${e.prependBody??""}${e.body}</main>
  <script>${SC}</script>
</body>
</html>`}});var fS,Eu,yS=a(()=>{"use strict";fS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Eu=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${fS(e.syncMessage)}</p>`:"",o=fS(e.manageHref),n=fS(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${fS(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var BC,GC,KC,I2=a(()=>{"use strict";BC=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,GC=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer AgentWitch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,KC=e=>e==="ok"?'<div class="alert-success">Update finished. This computer may restart the AgentWitch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var v2=a(()=>{"use strict";L2();yS();I2()});var Va,VC,x2=a(()=>{"use strict";Au();Va=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VC=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this computer",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this computer",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Va(e.wakeError)}</div>`:"",l=Pu(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This computer</p>
      <h1>AgentWitch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this computer.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Va(e.installBundleVersion)}</code></span>
        <span class="muted">Last heartbeat \xB7 ${l}</span>
      </div>
    </section>
    <div class="home-grid">
      <a class="home-card" href="/task">
        <p class="home-card-eyebrow">Delegate</p>
        <h2 class="home-card-title">Task</h2>
        <p class="home-card-lede">Run a writer on this computer and report status to cloud when done.</p>
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
        <p class="home-card-meta">${Va(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this computer.</p>
        <p class="home-card-meta">${Va(o)}</p>
      </a>
      <a class="home-card" href="/writer-sessions">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Writer transcripts</h2>
        <p class="home-card-lede">Full local writer conversation logs and cold-continue context bundles.</p>
        <p class="home-card-meta">Canonical turns stored under ~/.agent-witch</p>
      </a>
      <a class="home-card" href="/errors">
        <p class="home-card-eyebrow">Diagnostics</p>
        <h2 class="home-card-title">Error log</h2>
        <p class="home-card-lede">Tail of client stderr \u2014 crashes, module errors, and bridge failures on this computer.</p>
        <p class="home-card-meta">${Va(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this computer and the cloud bridge.</p>
        <p class="home-card-meta">${Va(n)}</p>
      </a>
    </div>`}});var W2=a(()=>{"use strict";x2()});var v,qa=a(()=>{"use strict";v=e=>e==="passed"||e==="stopped"||e==="failed"});var O2,qC,Us,JC,hS=a(()=>{"use strict";O2="Stopped at the round limit. The best prompt is kept.",qC="Stopped because the score stopped rising. The best prompt is kept.",Us="Finished. The best prompt is the result.",JC="Wizard ended. Progress from finished steps is kept."});var kn,YC=a(()=>{"use strict";kn=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var tce,rce,wu,M2,SS=a(()=>{"use strict";tce=/\n+|;\s+/,rce=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,wu=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(tce).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,rce(s)]},[]);return[...t,...o]},[]),M2=e=>{let t=wu(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var we,Ja=a(()=>{"use strict";we=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Tu,XC=a(()=>{"use strict";SS();Ja();Tu=e=>{let t=[...e.priorRounds,e.current],r=we(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:M2(o)}}});var ZC,oce,nce,PS,QC=a(()=>{"use strict";ZC={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},oce=e=>{try{let t=JSON.parse(e.fragment);return{...ZC,objects:[...e.objects,t]}}catch{return{...ZC,objects:e.objects}}},nce=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:oce(r)},PS=e=>[...e].reduce(nce,ZC).objects});var sce,eL,ice,j2,tL=a(()=>{"use strict";QC();sce=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},eL=e=>{let t=PS(e).filter(sce),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},ice=(e,t)=>({...e,passed:e.score>=t}),j2=(e,t)=>{let r=eL(e);return r===null?null:ice(r,t)}});var rL,oL,AS=a(()=>{"use strict";rL="The judge reply needs a score and a reason.",oL="The improver reply was empty."});var N2,D2=a(()=>{"use strict";N2=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var H2,F2=a(()=>{"use strict";H2=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var lce,$2,z2=a(()=>{"use strict";D2();F2();hS();SS();lce=e=>{let t=wu(e);return t.length===0?qC:`${qC} Avoid: ${t.join("; ")}.`},$2=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:O2};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(N2(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:lce(H2(r))}}return null}});var Rn,cce,Bs,U2,bS=a(()=>{"use strict";Rn=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},cce=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,Bs=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",cce(e.tokens),`Delay: ${Rn(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},U2=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var dce,B2,G2=a(()=>{"use strict";tL();dce=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,B2=e=>{let r=(dce.exec(e)?.[1]??e).trim();return r.length===0||eL(r)!==null?null:r}});var K2,_S,V2=a(()=>{"use strict";bS();G2();AS();K2=e=>({type:"call",role:"judge",choice:e.choice,prompt:U2({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),_S=e=>{let t=B2(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:oL}}:{nextPrompt:t,continuation:K2({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var nL,q2=a(()=>{"use strict";YC();XC();tL();AS();hS();z2();AS();V2();nL=e=>{let t=j2(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:rL}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(l=>({score:l.score,reasons:l.reasons})),{score:t.score,reasons:t.reasons}],s=$2({scores:n.map(l=>l.score),reasons:n.map(l=>l.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Tu({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:kn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Cu,sL=a(()=>{"use strict";Cu=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var J2=a(()=>{"use strict"});var Y2=a(()=>{"use strict";J2()});var Gs,X2=a(()=>{"use strict";Gs=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var uce,iL,Z2=a(()=>{"use strict";bS();uce=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,iL=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",uce(e.tokens),`Delay: ${Rn(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var pce,mce,gce,aL,Q2=a(()=>{"use strict";pce=/[A-Za-z0-9_./~-]{3,180}/g,mce=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,gce=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||mce.test(t)},aL=(e,t=12)=>{let r=[];for(let o of e.matchAll(pce)){let n=o[0].replace(/\.+$/,"");if(!(!gce(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var Lu,eK=a(()=>{"use strict";Lu=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var kS,lL,tK,Iu,cL=a(()=>{"use strict";kS=e=>Math.floor(e/2),lL=e=>Math.max(kS(e)+1,e-20),tK=(e,t)=>e>=t?"passes":e>=lL(t)?"close":e>=kS(t)?"weak":"bad",Iu=e=>[{band:"bad",label:`0\u2013${kS(e)-1} bad`},{band:"weak",label:`${kS(e)}\u2013${lL(e)-1} weak`},{band:"close",label:`${lL(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var RS,dL=a(()=>{"use strict";cL();RS=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${tK(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var gr,uL=a(()=>{"use strict";gr=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var rK,oK=a(()=>{"use strict";rK=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var fce,yce,nK,sK=a(()=>{"use strict";qa();dL();uL();oK();fce=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],yce=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",nK=e=>{let t=e.wizard;if(t===void 0)return[];let r=gr(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=fce.map((y,A)=>{let P=!s&&!n&&A===r?"active":"done";return{id:`wizard-${A+1}`,label:y,state:P,detail:null}}).filter((y,A)=>s?!0:A<=o),l=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=RS(e),d=c.filter(y=>y.id==="round-0"),u=rK(t)&&(!n||l)?c.filter(y=>y.id!=="round-0"):[],g=v(e.status)&&!s,f=g?[{id:"end",label:yce(e),state:"done",detail:e.errorMessage}]:[];if(g&&f.length>0){let y=Math.min(r,i.length),A=i.slice(0,y).map(P=>({...P,state:"done"}));return[...d,...A,...f,...u]}return[...d,...i,...u,...f]}});var hce,pL,iK=a(()=>{"use strict";qa();dL();sK();hce=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",pL=e=>{if(e.wizard!==void 0)return nK(e);let t=RS(e),r=v(e.status)?[{id:"end",label:hce(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var vu,aK=a(()=>{"use strict";vu=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var lK=a(()=>{"use strict";Tt()});var cK,xu,Wu,Xa,ES,mL,dK=a(()=>{"use strict";lK();cK="/prompt-optimizer/agent",xu=`${Ft}${cK}`,Wu=`${Ft}/prompt-optimizer`,Xa="The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",ES=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${Xa}`,mL="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Vr=a(()=>{"use strict"});var be,Ou=a(()=>{"use strict";Vr();be=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var gL,uK=a(()=>{"use strict";gL="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var pK,mK=a(()=>{"use strict";pK=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Mu,fK=a(()=>{"use strict";mK();Vr();Mu=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:pK(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var fL,yK=a(()=>{"use strict";Vr();fL=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var yL,hK=a(()=>{"use strict";Vr();yL=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var SK,ju,PK=a(()=>{"use strict";SK=["generalize","evaluate","separate","optimize_modules"],ju=(e,t)=>{let r=SK.indexOf(t);if(r===-1)return e;let o=SK.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var wS,hL=a(()=>{"use strict";SS();wS=e=>{let t=wu(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Nu,AK=a(()=>{"use strict";hL();Nu=e=>{let t=wS(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Pce,Ace,bce,bK,_K=a(()=>{"use strict";Pce=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Ace=/^\{\{[a-zA-Z0-9_-]+\}\}$/,bce=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let l=new RegExp(Pce(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(l,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},bK=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>Ace.test(n)?n:bce(n,r)).join("")}});var SL,kK=a(()=>{"use strict";_K();SL=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:bK(o.prompt,t)}))}))});var _ce,Du,RK=a(()=>{"use strict";Vr();hL();_ce=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Du=e=>{let t=wS(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=_ce(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Hu,EK=a(()=>{"use strict";sL();Hu=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(l=>l.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(l=>l.length>0).join(`
`);return Cu({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Fu,AL=a(()=>{"use strict";Ja();Fu=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=we(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var bL,wK=a(()=>{"use strict";AL();bL=e=>{let t=Fu({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Ks,TK=a(()=>{"use strict";Ks=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var kce,Rce,me,TS=a(()=>{"use strict";Ou();kce=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},Rce=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,me=e=>{let t=be(e),r=e.modules.map((i,l)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:kce(e,l),status:i.status})),o=r.length,n=r.filter((i,l)=>Rce(e.modules[l],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var CK,LK=a(()=>{"use strict";Ou();TS();CK=e=>{let t=me(e.wizard),r=be(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var _L,IK=a(()=>{"use strict";LK();_L=e=>{let t=CK({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var Ece,vK,xK=a(()=>{"use strict";Ece=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},vK=e=>[...e].reduce(Ece,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var wce,WK,OK=a(()=>{"use strict";wce=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},WK=e=>[...e].reduce(wce,{out:"",inString:!1,escaped:!1}).out});var Tce,Cce,MK,jK=a(()=>{"use strict";xK();OK();Tce=e=>e.charCodeAt(0)===65279?e.slice(1):e,Cce=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},MK=e=>WK(vK(Cce(Tce(e))))});var Lce,Ice,vce,NK,xce,Za,CS=a(()=>{"use strict";QC();jK();Lce=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Ice=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},vce=e=>[...e].reduce(Ice,{out:"",inString:!1,escaped:!1}).out,NK=e=>{let t=PS(e);return t.length===0?null:t[t.length-1]},xce=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Za=e=>{let t=MK(Lce(e)),r=NK(t);if(r!==null)return r;let o=vce(t),n=NK(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw xce(i)}}});var Wce,Oce,kL,DK,HK=a(()=>{"use strict";Wce=/^[a-z0-9][a-z0-9-]{0,62}$/,Oce=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return Wce.test(t)?t:""},kL=e=>e.replace(/\s+/gu," ").trim(),DK=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=Oce(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=kL(n.name),l=kL(n.description),c=kL(n.rationale);if(!(i.length===0||l.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:l,rationale:c}),o.length>=3))break}return o}});var FK,$K,zK=a(()=>{"use strict";FK=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},$K=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var RL,UK=a(()=>{"use strict";CS();HK();zK();RL=(e,t)=>{let r=(()=>{try{return Za(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(FK(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map($K).filter(l=>l!==null),i=DK({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var EL,BK=a(()=>{"use strict";EL=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var wL,GK=a(()=>{"use strict";wL=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var TL,KK=a(()=>{"use strict";Ou();TS();TL=e=>{let t=me(e.wizard),r=be(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var $u,VK=a(()=>{"use strict";$u=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var fr,Mce,CL,qK=a(()=>{"use strict";fr=m(Ni());CS();Mce=(0,fr.isType)({name:fr.isNonEmptyString,description:fr.isString,sampleValue:fr.isString}),CL=e=>{let t=Za(e);if(!(0,fr.isType)({templatedPrompt:fr.isNonEmptyString,variables:(0,fr.isArrayWithEachItem)(Mce)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var Te,jce,Nce,LL,JK=a(()=>{"use strict";Te=m(Ni());Vr();CS();jce=(0,Te.isType)({id:Te.isNonEmptyString,title:Te.isNonEmptyString,prompt:Te.isNonEmptyString,order:Te.isNumber}),Nce=(0,Te.isType)({id:Te.isNonEmptyString,title:Te.isNonEmptyString,summary:Te.isString,topology:(0,Te.isOneOf)("chain","parallel"),modules:(0,Te.isArrayWithEachItem)(jce),recommended:Te.isBoolean}),LL=e=>{let t=Za(e);if(!(0,Te.isType)({options:(0,Te.isArrayWithEachItem)(Nce)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Qa,YK=a(()=>{"use strict";Qa=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var Dce,IL,vL=a(()=>{"use strict";Dce=/\{\{([a-zA-Z0-9_-]+)\}\}/g,IL=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(Dce,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var yr,hr,XK=a(()=>{"use strict";Ja();vL();yr=e=>IL(e.templatedPrompt,e.variables),hr=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return we(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??yr(e.wizard)}});var Hce,Vs,ZK=a(()=>{"use strict";Hce=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Vs=(e,t)=>e.replace(Hce,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var Fce,qs,LS=a(()=>{"use strict";Fce=/\{\{([a-zA-Z0-9_-]+)\}\}/g,qs=e=>{let t=new Set,r=[];for(let o of e.matchAll(Fce)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var zu,QK=a(()=>{"use strict";LS();zu=e=>e.variables.length>0||qs(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var xL,WL=a(()=>{"use strict";Vr();xL=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Uu,eV=a(()=>{"use strict";Ja();WL();Uu=e=>{let t=e.wizard.evaluateSelectedRound??we(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:xL(r.judgement,e.passScore)}});var Bu,tV=a(()=>{"use strict";Bu=e=>e.length===1&&e[0].modules.length===1});var OL,rV=a(()=>{"use strict";OL=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var De,IS,Gu=a(()=>{"use strict";De=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),IS=(e,t)=>`<p class="muted">The computer runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var oV,nV=a(()=>{"use strict";Gu();oV=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[De("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),De("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[De("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var sV,iV=a(()=>{"use strict";qa();Gu();sV=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!v(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[De("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this computer.</p>"),De("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),De("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this computer",IS(e.writerLabel,e.folder)),De("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[De("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var aV,lV=a(()=>{"use strict";Gu();aV=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[De("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),De("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[De("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var cV,dV=a(()=>{"use strict";Gu();cV=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[De("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),De("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",IS(e.writerLabel,e.folder)),...r?[De("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var vS,uV=a(()=>{"use strict";qa();nV();iV();lV();dV();vS=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(v(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return sV(r);case"evaluate":return oV({...r,currentRound:e.currentRound});case"separate":return cV(r);case"optimize_modules":return aV({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Ku,wo,pV=a(()=>{"use strict";Ku=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),wo=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var $ce,xS,ML,mV=a(()=>{"use strict";LS();$ce="wizardParam_",xS=e=>`${$ce}${e}`,ML=e=>{let t=qs(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=xS(n),i=e.posted.get(s),l=i!==null?i.trim():r[n]?.trim()??"";if(l.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=l}return{ok:!0,parameterValues:r}}});var Ot,gV=a(()=>{"use strict";Ot=["generalize","evaluate","separate","optimize_modules"]});var Vu,Js,el,To=a(()=>{"use strict";Vu="Stopped because the confirmed token or spend budget was exceeded.",Js="Approaching the confirmed budget. Further trials may hard-stop.",el="Confirm the Step 4 token and spend budget before optimizing modules."});var ht,tl=a(()=>{"use strict";ht=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var Kt,qu=a(()=>{"use strict";To();Kt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var zce,Vt,Ju=a(()=>{"use strict";To();zce={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},Vt=e=>{let t=e?.trim()??"";return t.length===0?.01:zce[t]??.01}});var WS,jL=a(()=>{"use strict";To();Ju();WS=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=Vt(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var NL,Yu,MS,DL=a(()=>{"use strict";To();tl();qu();jL();Ju();NL=e=>{let t=WS({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??Vt(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:ht({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Yu=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),MS=e=>{let t=e.existing??Kt(),r=NL({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Yu(t,r)}});var Ys,rl,hV=a(()=>{"use strict";To();Vr();tl();qu();DL();jL();Ju();Ys=e=>{let t=WS({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??Vt(e.writerId),i=r*4e3,l=n*o*8e3,c=i+l;return{targetTokenBudget:c,estimatedSpendUsd:ht({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},rl=e=>{let t=e.existing??Kt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Ys({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Yu(t,r)}});var qr,SV=a(()=>{"use strict";tl();To();qu();qr=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??Kt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=ht({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var FL,ol,PV=a(()=>{"use strict";To();tl();FL=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=ht({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,l=s!==null&&s>0&&o>=s;if(i||l)return{kind:"hard_stop",errorMessage:Vu,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Vu,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:Js,costControls:{...t,softWarnFired:!0,softWarnMessage:Js}}:null},ol=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var $L,AV=a(()=>{"use strict";$L=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var I=a(()=>{"use strict";qa();hS();q2();YC();bS();sL();Y2();X2();Z2();Q2();XC();eK();Ja();iK();uL();cL();aK();dK();Vr();Ou();uK();fK();yK();hK();PK();AK();kK();RK();EK();AL();wK();TK();TS();IK();UK();BK();GK();KK();VK();qK();JK();YK();XK();vL();ZK();LS();QK();eV();tV();WL();rV();uV();pV();mV();gV();To();tl();qu();DL();hV();Ju();SV();PV();AV()});var zL=a(()=>{"use strict";ld()});var Uce,kV,RV=a(()=>{"use strict";zL();Uce=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,kV=e=>{let t=Ps(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Uce)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var wV,Bce,Gce,Jr,Kce,Vce,EV,NS,TV,qce,qt,CV,LV,IV,Pr=a(()=>{"use strict";zL();RV();wV=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),Bce=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,Gce=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Jr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(Bce.test(e.errorMessage))return"usage_limit";if(Gce.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},Kce="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Vce="The writer waited on terminal input and did not return a prompt.",EV=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,NS=e=>{let t=e.trim();if(t.length===0||t.length>=500||!EV.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>EV.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},TV=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},qce=e=>NS(e.stdout)??NS(e.stderr)??(TV(e.replyFile)?NS(e.replyFile):null),qt=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Kce;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Vce:null},CV=e=>{let t=e.trim();return t.length===0?null:qt(t)!==null?t:NS(t)??(TV(t)?t:null)},LV=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],IV=e=>{let t=e.replyFileText?.trim()??"",r=qt([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=qce({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Jr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=kV([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Ps(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var Jce,xV,vV,Zs,DS=a(()=>{"use strict";Pr();Jce=400,xV=(e,t=Jce)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},vV=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:CV(e.promptText)},Zs=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:vV(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=vV(e.revisions[n]);if(s!==null)return s.trim()}return null}});var M,Yce,HS,_e,Qs,OV,WV,MV,jV,He=a(()=>{"use strict";M="manual",Yce=["claude-cli","codex","cursor","antigravity"],HS={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},_e=e=>e===M?"You":e in HS?HS[e]:e,Qs=e=>Yce.filter(t=>e.includes(t)),OV=e=>{let t=Qs(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},WV=(e,t)=>t===M?M:e.find(r=>r===t)??null,MV=(e,t,r)=>{let o=Qs(e),n=WV(o,t),s=WV(o,r);return n===null||s===null?null:{judge:n,improver:s}},jV=(e,t,r)=>{let o=Qs(e);return t===null||t.trim()===""?r!==M?r:o[0]??null:t===M?null:o.find(n=>n===t)??null}});var NV,FS,UL,ei,BL,Mt,Co,Ce,ft=a(()=>{"use strict";NV=m(require("node:fs")),FS=m(require("node:os")),UL=m(require("node:path"));fo();ei="~",BL=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Mt=e=>{let t=FS.default.homedir(),r=BL(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Co=e=>{let t=e.trim().length===0?"~":e.trim(),r=je(t),o=UL.default.isAbsolute(r)?BL(r):BL(UL.default.resolve(FS.default.homedir(),r));try{if(!NV.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}return{ok:!0,path:o,display:Mt(o)}},Ce=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:FS.default.homedir()});var St,En=a(()=>{"use strict";St='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var GL,DV,Xce,HV,FV,KL=a(()=>{"use strict";I();He();ft();En();GL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),DV=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Xce=e=>{let t=DV(e.state),r=`<h2>${GL(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${GL(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${St}</button></div><template>${r}</template></li>`},HV=e=>{let t=e.wizard;if(t===void 0)return"";let r=vS({status:e.status,wizard:t,writerLabel:_e(e.judgeModel),runnerLabel:_e(e.runnerModel??e.judgeModel),folderDisplay:Mt(Ce(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this computer">${r.map(Xce).join("")}</ol>`},FV=e=>{let t=e.wizard;if(t===void 0)return"";let r=vS({status:e.status,wizard:t,writerLabel:_e(e.judgeModel),runnerLabel:_e(e.runnerModel??e.judgeModel),folderDisplay:Mt(Ce(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this computer</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${DV(n.state)}<span class="sdlc-pipeline-label">${GL(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Ar,$V,zV,UV,VL=a(()=>{"use strict";I();Ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$V="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",zV=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Ar($V)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Ar(i.name)}}}</strong> \u2014 ${Ar(i.description)} (sample: ${Ar(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Ar(r)}</pre>`,n=yr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Ar(n)}</pre>`;return`${t}${o}${s}`},UV=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Ar($V)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Ar(n.name)}}}</strong> \u2014 ${Ar(n.description)} (sample: ${Ar(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Ar(r)}</pre>`;return`${t}${o}`}});var Xu,qL=a(()=>{"use strict";Xu=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var BV,GV=a(()=>{"use strict";I();BV=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Gs({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=Bs({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var JL,Zu,YL=a(()=>{"use strict";En();GV();JL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zu=e=>{let t=BV(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${JL(r)}">${St}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${JL(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${JL(t)}</pre></template>`}});var XL,Qu,ZL=a(()=>{"use strict";En();XL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qu=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${XL(r)}">${St}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${XL(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${XL(t)}</pre></template>`}});var $S,nl,QL=a(()=>{"use strict";qL();YL();ZL();$S=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nl=e=>{let t=Xu(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",l=e.caption===void 0?"":`<p class="muted">${$S(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,u=e.cycle.revisions.map(g=>{let f=g.judgement?.score,y=f==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${f}`,A=g.judgement?.reasons?.trim()??"",P=A.length===0?"":`<br><span class="muted">${$S(A)}</span>`,S=Qu({roundLabel:d(g.roundNumber),promptText:g.promptText}),p=Zu({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run}),b=`${S}${p}`;if(e.interactive){let C=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${C}> <span class="sdlc-wizard-revision-title">${$S(y)}</span></label>${b}${P}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${$S(y)}</span>${b}${P}</li>`}).join("");return`${i}${l}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var eI,KV,VV,qV,tI=a(()=>{"use strict";eI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KV=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${eI(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${eI(t.prompt)}</pre></li>`).join("")}</ol>`,VV=e=>KV([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),qV=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${eI(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${KV(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var ep,Zce,zS,rI=a(()=>{"use strict";I();tI();ep=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zce=e=>{let t=e.wizard;return t===void 0?"":hr({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},zS=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Zce(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${ep(n.orchestratorSkill.fileName)}</code> \u2014 ${ep(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${ep(o)}</pre></details>`,l=t.modules.length,c=l===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${l})</h4>`,d=VV(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${ep(r)} <span class="muted">${ep(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Xe,Qce,ede,tde,rde,US,ode,nde,sde,ide,ade,lde,sl,BS=a(()=>{"use strict";I();KL();VL();QL();YL();ZL();rI();Xe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qce={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},ede=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Xe(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Xe(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Xe(o)}</pre></details>`;return`<h2>${Xe(e)}</h2>${n}`},tde=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=yr(t).trim(),n=hr({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!v(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${ede("What is being evaluated",i)}`},rde=(e,t)=>{let r=e.wizard;if(r===void 0||v(e.status))return"";let o=Qce[t];return o===void 0||r.phase!==o?"":FV(e)},US=(e,t,r)=>{let o=rde(e,t),n=t==="wizard-2"?tde(e):"";return`${o}${n}${r}`},ode=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let l=i,c=l.roundNumber,d=l.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof l.score=="number"?l.score:null,passed:typeof l.passed=="boolean"?l.passed:null,reasons:typeof l.reasons=="string"?l.reasons:null})}return s.length===0?null:s},nde=e=>{let t=e.wizard;return t===void 0?"":zV(t)},sde=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",l=n.reasons?.trim()??"",c=l.length===0?"":`<br><span class="muted">${Xe(l)}</span>`,d=`Round ${n.roundNumber}`,u=Qu({roundLabel:d,promptText:n.promptText}),g=Zu({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Xe(s)}${i}</span>${u}${g}${c}</li>`}).join("")}</ul>`,ide=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return nl({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=ode(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${sde(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=hr({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Xe(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(l=>l.judgement!==null&&l.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,g=Qu({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),f=Zu({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Xe(u)}</span>${g}${f}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Xe(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},ade=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Xe(n.title)}</strong> <span class="muted">(${Xe(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Xe(o.title)}</strong>${n}${Xe(s)}${zS(e,o)}</li>`}).join("")}</ul>`},lde=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,l=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Xe(i)}</span> <strong>${Xe(n.title)}</strong>${Xe(l)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Xe(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?nl({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},sl=(e,t)=>{switch(t){case"wizard-1":return US(e,t,nde(e));case"wizard-2":return US(e,t,ide(e));case"wizard-3":return US(e,t,ade(e));case"wizard-4":return US(e,t,lde(e));default:return""}}});var cde,dde,JV,YV,XV=a(()=>{"use strict";I();DS();Pr();BS();cde=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},dde=e=>{let t=e.goal.trim();return t.length===0?null:t},JV=(e,t,r,o,n)=>{let s=qt(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},YV=(e,t)=>{let r=dde(e);if(t.id.startsWith("wizard-")){let s=sl(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=vu(e,t);if(s!==null){let l=Zs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:l,promptNote:null,bodyHtml:null}}let i=we(e.revisions.map(l=>({roundNumber:l.roundNumber,promptText:l.promptText,score:l.judgement?.score??null,reasons:l.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:JV(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:cde(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:JV(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var ti,ZV,QV=a(()=>{"use strict";ti=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ZV=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${ti(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ti(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${ti(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${ti(n)}</h2><pre class="mono">${ti(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${ti(e.goal)}</dd></div></dl>`;return`<h2>${ti(e.title)}</h2>${i}${t}${r}${o}${s}`}});var ude,e5,tp,oI,GS=a(()=>{"use strict";I();ude=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),e5=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||v(e.status))return null;let r=gr(t);return r<0||r>3?null:`wizard-${r+1}`},tp=(e,t)=>ude.has(t)?e5(e)===t:!1,oI="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var pde,KS,nI=a(()=>{"use strict";pde='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',KS=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${pde}</button>`});var ri,VS=a(()=>{"use strict";I();ri=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Tu({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:Lu(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var mde,t5,gde,sI,r5,fde,yde,hde,Sde,o5,n5=a(()=>{"use strict";I();VS();mde={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},t5=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},gde=e=>mde[e]??null,sI=(e,t)=>{let r=e.wizard,o=gde(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=gr(r);return o<n||o===n},r5=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},fde=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:yr(t).trim();return o.length===0?null:Nu({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:t5(e,"generalize")})},yde=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=ri(e);return n===null?null:kn({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=r5(e)?.promptText.trim()??hr({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Gs({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},hde=e=>{let t=e.wizard;if(t===void 0)return null;let r=hr({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Du({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:t5(e,"separate")})},Sde=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=wo(t),s=Vs(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=ri(e);return c===null?null:kn({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=r5(e),l=i?.run;return l!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||v(e.status)&&i?.judgement!==null)?Bs({goal:e.goal,lookedAt:l.lookedAt??"the writer reply",evidence:l.evidence??l.output,tokens:l.tokens,delayMs:l.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Hu({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Ks(t,r).output,moduleTitle:o.title})},o5=(e,t)=>{if(!sI(e,t))return null;switch(t){case"wizard-1":return fde(e);case"wizard-2":return yde(e);case"wizard-3":return hde(e);case"wizard-4":return Sde(e);default:return null}}});var Pde,qS,iI=a(()=>{"use strict";I();Pde=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},qS=(e,t)=>{let r=e.wizard,o=Pde(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=gr(r);return o<n?"done":o===n&&v(e.status)&&e.status==="failed"?"failed":o<=n&&v(e.status)?"done":"pending"}});var Ade,il,JS=a(()=>{"use strict";En();n5();iI();Ade=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),il=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(qS(e,t)==="pending")return""}else if(!sI(e,t))return"";let o=o5(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${St}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${Ade(o)}</pre></template>`}});var oi,Lo,al=a(()=>{"use strict";oi=e=>e.toLocaleString("en-US"),Lo=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Yr,bde,s5,YS,i5,a5,XS=a(()=>{"use strict";I();XV();QV();GS();nI();En();DS();KL();JS();al();Yr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bde=(e,t)=>{let r=vu(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Lo(t,Number(s[1])):0,l=i>0?`<span class="sdlc-node-reason">${oi(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Yr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Yr(r)}</span>`:"",d=ZV(YV(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&v(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Yr(e.id)}"`:"",g=tp(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Yr(oI)}"><input type="hidden" name="cycleId" value="${Yr(t.id)}"><input type="hidden" name="wizardStepId" value="${Yr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",f=e.state==="active"&&e.id.startsWith("wizard-")?HV(t):"",y=o?"failed":e.state,A=o?Zs(t):null,P=A!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${St}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Yr(A)}</pre></template>`:"",S=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?il(t,e.id):"";return`<li class="sdlc-node sdlc-node-${y}" data-sdlc-step-id="${Yr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${Yr(e.label)}${c}${l}</span></button><div class="sdlc-node-row-actions">${g}${S}${P}</div></div>${f}<template>${d}</template></li>`},s5=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>bde(r,t)).join("")}</ol>`,YS=e=>`<div class="sdlc-score" aria-label="What the score means">${Iu(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Yr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,i5=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${KS({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,a5=`<script>
(() => {
  const dialog = document.getElementById("sdlc-node-dialog");
  const body = dialog?.querySelector("[data-sdlc-dialog-body]");
  if (!dialog || !body) return;
  const readNodeTemplate = (node) => {
    if (!(node instanceof Element)) return null;
    const direct = node.querySelector(":scope > template");
    return direct instanceof HTMLTemplateElement ? direct : null;
  };
  const readStepId = (node) => {
    if (!(node instanceof HTMLElement)) return "";
    const stepId = node.dataset.sdlcStepId;
    return typeof stepId === "string" ? stepId : "";
  };
  const openFromTemplate = (template, stepId) => {
    if (!(template instanceof HTMLTemplateElement)) return;
    body.replaceChildren(template.content.cloneNode(true));
    if (stepId.length > 0) {
      dialog.dataset.sdlcDialogStepId = stepId;
    } else {
      delete dialog.dataset.sdlcDialogStepId;
    }
    dialog.showModal();
  };
  const refreshOpenDialog = () => {
    if (!dialog.open) return;
    const stepId = dialog.dataset.sdlcDialogStepId ?? "";
    if (stepId.length === 0) return;
    const node = document.querySelector('[data-sdlc-step-id="' + stepId + '"]');
    const template = readNodeTemplate(node);
    if (template === null) return;
    body.replaceChildren(template.content.cloneNode(true));
  };
  document.addEventListener("sdlc-node-dialog-refresh", refreshOpenDialog);
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const info = target.closest("[data-sdlc-pipeline-info]");
    if (info instanceof HTMLElement) {
      const template = info.closest(".sdlc-pipeline-step")?.querySelector("template");
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const stepPromptInfo = target.closest("[data-sdlc-wizard-step-prompt-info]");
    if (stepPromptInfo instanceof HTMLElement) {
      event.stopPropagation();
      event.preventDefault();
      const template = stepPromptInfo.parentElement?.querySelector(
        "template[data-sdlc-wizard-step-prompt]",
      );
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const failureInfo = target.closest("[data-sdlc-failure-reply-info]");
    if (failureInfo instanceof HTMLElement) {
      event.stopPropagation();
      event.preventDefault();
      const template = failureInfo.parentElement?.querySelector(
        "template[data-sdlc-failure-reply]",
      );
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const revisionPromptInfo = target.closest(
      "[data-sdlc-revision-round-prompt-info]",
    );
    if (revisionPromptInfo instanceof HTMLElement) {
      event.stopPropagation();
      event.preventDefault();
      const template = revisionPromptInfo.parentElement?.querySelector(
        "template[data-sdlc-revision-round-prompt]",
      );
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const revisionJudgeInfo = target.closest(
      "[data-sdlc-revision-judge-prompt-info]",
    );
    if (revisionJudgeInfo instanceof HTMLElement) {
      event.stopPropagation();
      event.preventDefault();
      const template = revisionJudgeInfo.parentElement?.querySelector(
        "template[data-sdlc-revision-judge-prompt]",
      );
      if (!(template instanceof HTMLTemplateElement)) return;
      delete dialog.dataset.sdlcDialogStepId;
      openFromTemplate(template, "");
      return;
    }
    const opener = target.closest("[data-sdlc-node]");
    if (!opener) return;
    const node = opener.closest(".sdlc-node");
    const template = readNodeTemplate(node);
    if (template === null) return;
    openFromTemplate(template, readStepId(node));
  });
})();
</script>`});var ZS,QS,eP,l5,aI=a(()=>{"use strict";ZS="support-reply",QS="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",eP=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),l5=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var tP,lI,cI=a(()=>{"use strict";I();XS();aI();tP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lI=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${YS(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this computer</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${tP(QS)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${tP(eP)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${tP(l5)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${tP(ZS)}">Run this sample</a>
      </div>
    </section>`});var dI,rP,_de,c5,d5=a(()=>{"use strict";dI=m(require("node:fs")),rP=m(require("node:path")),_de=e=>rP.default.join(rP.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),c5=(e,t)=>{let r=_de(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;dI.default.mkdirSync(rP.default.dirname(r),{recursive:!0}),dI.default.appendFileSync(r,o,"utf8")}});var ll,u5,kde,p5,Rde,m5,Xr,ie,g5,B,jt=a(()=>{"use strict";ll=m(require("node:fs")),u5=m(require("node:path"));I();d5();kde=e=>e.wizard===void 0?e:{...e,wizard:fL(e.wizard)},p5=new Set,Rde=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),m5=(e,t)=>{ll.default.mkdirSync(u5.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;ll.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),ll.default.renameSync(r,e)},Xr=e=>{if(!ll.default.existsSync(e))return[];try{let t=JSON.parse(ll.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Rde).map(kde):[]}catch{return[]}},ie=(e,t)=>Xr(e).find(r=>r.id===t)??null,g5=(e,t)=>{p5.add(t);let r=Xr(e).filter(o=>o.id!==t);m5(e,r)},B=(e,t)=>{if(p5.has(t.id))return;let r=Xr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];m5(e,o),c5(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var cl,Zr,rp,f5,oP,Ede,y5,h5,S5,uI=a(()=>{"use strict";cl=m(require("node:fs")),Zr=m(require("node:path")),rp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},f5=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),oP=(e,t)=>{let r=rp(e);return r.length>0?r:rp(t)},Ede=e=>{let t=oP(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${f5(o)}`,...n.length>0?[`description: ${f5(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},y5=e=>`.cursor/skills/${e}/SKILL.md`,h5=(e,t)=>{let r=rp(t);if(r.length===0)return!1;let o=Zr.default.resolve(e),n=Zr.default.resolve(o,".cursor","skills"),s=Zr.default.resolve(o,y5(r));return s.startsWith(`${n}${Zr.default.sep}`)?cl.default.existsSync(s):!1},S5=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(oP(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Zr.default.resolve(e.workingDirectory);try{if(!cl.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Ede({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=y5(r.slug),n=Zr.default.resolve(t,".cursor","skills"),s=Zr.default.resolve(t,o);if(!s.startsWith(`${n}${Zr.default.sep}`))return{ok:!1,errorCode:"path"};if(cl.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{cl.default.mkdirSync(Zr.default.dirname(s),{recursive:!0}),cl.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var wde,P5,A5,b5=a(()=>{"use strict";I();jt();ft();Pr();uI();wde=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,P5=e=>{let t=e.get("savedSkill");return t!==null&&wde.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this computer.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this computer.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},A5=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=ie(e.storePath,t),o=l=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${l}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!v(r.status))return{kind:"redirect",location:o("skillError=working")};let n=we(r.revisions.map(l=>({roundNumber:l.roundNumber,promptText:l.promptText,score:l.judgement?.score??null,reasons:l.judgement?.reasons??null})));if(n===null||qt(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=S5({workingDirectory:Ce(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let l=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${l}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var nP,sP,op=a(()=>{"use strict";I();nP=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=qr({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},sP=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var wn,np=a(()=>{"use strict";I();op();wn=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=OL(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=MS({moduleCount:o.length,existing:e.costControls,writerId:n}),i=nP(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Ku(r.variables)},updatedAt:new Date().toISOString()}}});var Tn,sp=a(()=>{"use strict";Tn=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var iP=a(()=>{"use strict";ar();fu();ld()});var pI,_5,mI,k5,R5=a(()=>{"use strict";pI={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},_5=e=>e.exitCode===null&&e.signalCode===null,mI=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{l(o)},l=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{l("SIGTERM");return}if(!_5(e)){l("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!_5(e)){l(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}l("SIGKILL")},t)}),k5=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),mI(e).then(s=>{r({...pI,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var E5,ip,w5,gI,Tde,yI,hI,Cde,Lde,Ide,T5,vde,fI,C5,ap,L5,xde,Wde,Pt,ni=a(()=>{"use strict";E5=require("node:child_process"),ip=m(require("node:fs")),w5=m(require("node:os")),gI=m(require("node:path"));iP();R5();Pr();Tde=["claude-cli","codex","cursor","antigravity"],yI=18e4,hI=6e5,Cde=12e4,Lde=9e5,Ide="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",T5="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",vde="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",fI=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},C5=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=fI(process.env[T5])??Math.max(r,hI));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:fI(process.env[vde])??Lde;return Math.min(o,Math.max(Cde,r))},ap=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?fI(process.env[T5])??hI:yI,L5=e=>`The writer timed out after ${e}ms.`,xde=e=>Tde.includes(e),Wde=e=>e===!0||process.env[Ide]==="1",Pt=e=>new Promise(t=>{if(e.signal?.aborted){t(pI);return}if(Wde(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!xde(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this computer."});return}let r=e.writerAgent,o=Bt(r,e.prompt,Ae({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!ip.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this computer."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:yI,s=gI.default.join(ip.default.mkdtempSync(gI.default.join(w5.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=LV({writerAgent:r,baseArgs:o.args,replyPath:s}),l=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,E5.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),g=f=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(f))};k5(u,e.signal,g,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",mI(u).then(f=>{g({ok:!1,errorMessage:L5(n),errorKind:"writer_timeout",killSignal:f})})},n),u.stdout.on("data",f=>{l.push(Buffer.from(f))}),u.stderr.on("data",f=>{c.push(Buffer.from(f))}),u.on("error",()=>g({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let f=ip.default.existsSync(s)?ip.default.readFileSync(s,"utf8"):null,y=IV({writerAgent:r,stdout:Buffer.concat(l).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:f});if(y.ok&&d.stopReason!=="abort"){g(y);return}d.stopReason===null&&g(y)})})});var Ode,lp,SI=a(()=>{"use strict";I();al();Ode=e=>{if(e.wizard!==void 0){let t=$u(e.wizard),r=Lo(e);return(t??0)+r}return Lo(e)},lp=e=>{let t=FL({costControls:e.costControls,spentTokens:Ode(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var I5,Mde,cp,aP,lP=a(()=>{"use strict";I();He();SI();I5=e=>e===M?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},Mde=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),cp=(e,t,r=null)=>{let o=e.revisions.find(l=>l.roundNumber===e.currentRound),n=nL({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:I5(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?$L({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:Lu(e.revisions.map(l=>({roundNumber:l.roundNumber,promptText:l.promptText,score:l.judgement?.score??null,reasons:l.judgement?.reasons??null})),e.currentRound)}),s=Mde(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?lp({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):lp({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},aP=(e,t,r=null)=>{let o=_S({raw:t,judge:I5(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var cP,PI=a(()=>{"use strict";cP=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var W5,dP,uP,v5,x5,AI,jde,O5,bI,Nde,M5,Dde,Hde,j5,N5=a(()=>{"use strict";W5=require("node:child_process"),dP=m(require("node:fs")),uP=m(require("node:path"));lh();I();v5=4e3,x5=12e3,AI=(e,t)=>{let r=(0,W5.spawnSync)("git",[...t],{cwd:e,env:yn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},jde=e=>AI(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",O5=e=>{let t=AI(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},bI=(e,t)=>{let r=uP.default.resolve(e,t),o=uP.default.relative(e,r);if(o.startsWith("..")||uP.default.isAbsolute(o)||!dP.default.existsSync(r)||!dP.default.statSync(r).isFile())return null;let n=dP.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>v5?`${n.slice(0,v5)}
\u2026truncated`:n},Nde=e=>e.length>x5?`${e.slice(0,x5)}
\u2026truncated`:e,M5=e=>{let t=aL(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,bI(e.workingDirectory,n)])),o=jde(e.workingDirectory);return{git:o,status:o?O5(e.workingDirectory):{},files:r,paths:t}},Dde=(e,t)=>{let r=AI(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=bI(e,t);return o===null?`${t} is missing.`:o},Hde=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",j5=e=>{let t=e.before.git?O5(e.workingDirectory):{},r=Object.keys(t).filter(l=>t[l]!==e.before.status[l]),o=e.before.paths.map(l=>{let c=e.before.files[l]??null,d=bI(e.workingDirectory,l);return c===d?`${l} did not change.`:`${l} changed.
${d??`${l} is missing.`}`}),n=r.map(l=>Dde(e.workingDirectory,l)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(l=>t[l]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(l=>l.length>0);return{lookedAt:Hde(e.before.git,e.before.paths.length>0),evidence:Nde(i.join(`

`))}}});var RI,ee,EI,Ze,D5,Fde,$de,H5,dl,F5,ul,zde,Ude,dp,_I,kI,Bde,$5,Gde,Kde,Vde,z5,qde,U5,B5,Jde,Yde,G5,K5=a(()=>{"use strict";RI=require("node:child_process"),ee=m(require("node:fs")),EI=m(require("node:os")),Ze=m(require("node:path"));lh();D5=8e6,Fde=16e6,$de=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],H5=(e,t)=>{let r=(0,RI.spawnSync)("git",[...t],{cwd:e,env:yn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},dl=(e,t)=>(0,RI.spawnSync)("git",[...t],{cwd:e,env:yn(),timeout:8e3}).status===0,F5=e=>{let t=H5(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},ul=(e,t)=>{let r=Ze.default.resolve(e,t),o=Ze.default.relative(e,r);return o.startsWith("..")||Ze.default.isAbsolute(o)?null:r},zde=(e,t)=>{let r=ul(e,t);if(r===null||!ee.default.existsSync(r))return null;let o=ee.default.statSync(r);return!o.isFile()||o.size>D5?null:ee.default.readFileSync(r)},Ude=(e,t,r)=>{let o=ul(e,t);o!==null&&(ee.default.mkdirSync(Ze.default.dirname(o),{recursive:!0}),ee.default.writeFileSync(o,r))},dp=(e,t)=>{let r=ul(e,t);r===null||!ee.default.existsSync(r)||ee.default.rmSync(r,{recursive:!0,force:!0})},_I=(e,t)=>dl(e,["cat-file","-e",`HEAD:${t}`]),kI=e=>{let t=H5(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},Bde=e=>Ze.default.resolve(e)!==Ze.default.resolve(EI.default.homedir()),$5=e=>{if(!ee.default.existsSync(e))return 0;let t=ee.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?ee.default.readdirSync(e).reduce((r,o)=>r+$5(Ze.default.join(e,o)),0):0},Gde=(e,t,r)=>{let o=ul(e,r);if(o===null||!ee.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if($5(o)>Fde)return{relativePath:r,existed:!0,copyDir:null};let n=Ze.default.join(t,"cache",r);return ee.default.mkdirSync(Ze.default.dirname(n),{recursive:!0}),ee.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},Kde=400,Vde=32e6,z5=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!ee.default.existsSync(s)))for(let i of ee.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let l=Ze.default.join(s,i),c=ee.default.statSync(l);if(c.isDirectory()){n(l);continue}if(!(!c.isFile()||c.size>D5)){if(t.length>=Kde||r+c.size>Vde){o=!1;return}r+=c.size,t.push(Ze.default.relative(e,l))}}};return n(e),{paths:t,complete:o}},qde=(e,t,r)=>{let o=ul(e,r);if(o===null||!ee.default.existsSync(o))return null;let n=zde(e,r);if(n===null)return"skip";let s=Ze.default.join(t,"files",r);return ee.default.mkdirSync(Ze.default.dirname(s),{recursive:!0}),ee.default.writeFileSync(s,n),s},U5=e=>{let t=ee.default.mkdtempSync(Ze.default.join(EI.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?F5(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:z5(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,qde(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?kI(e.workingDirectory):null,isolateCaches:Bde(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:$de.map(i=>Gde(e.workingDirectory,t,i))}},B5=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){dp(e.workingDirectory,t);return}Ude(e.workingDirectory,t,ee.default.readFileSync(r))}},Jde=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?B5(e,t):_I(e.workingDirectory,t)?dl(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):dp(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&_I(e.workingDirectory,t)&&dl(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!_I(e.workingDirectory,t)&&dl(e.workingDirectory,["reset","-q","HEAD","--",t])},Yde=(e,t)=>{let r=ul(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){dp(e.workingDirectory,t.relativePath),ee.default.mkdirSync(Ze.default.dirname(r),{recursive:!0}),ee.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){dp(e.workingDirectory,t.relativePath);return}if(ee.default.existsSync(r))for(let o of ee.default.readdirSync(r)){let n=Ze.default.join(r,o);ee.default.statSync(n).mtimeMs>=e.startedMs-1e3&&ee.default.rmSync(n,{recursive:!0,force:!0})}}}},G5=e=>{try{if(e.git){if(kI(e.workingDirectory)!==e.head&&(!(e.head===null?dl(e.workingDirectory,["update-ref","-d","HEAD"]):dl(e.workingDirectory,["reset","--hard",e.head]))||kI(e.workingDirectory)!==e.head))throw new Error("head");let r=F5(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Jde(e,o)}else{if(e.complete)for(let t of z5(e.workingDirectory).paths)e.files[t]===void 0&&dp(e.workingDirectory,t);for(let t of Object.keys(e.files))B5(e,t)}for(let t of e.caches)Yde(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{ee.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var pP,mP,Xde,Zde,Qde,eue,tue,V5,rue,q5,J5=a(()=>{"use strict";I();lP();PI();N5();K5();He();ft();Pr();ni();pP=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),mP=e=>({...e,status:"stopped",errorMessage:Us,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),Xde=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Zde=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==M?t:e.improverModel!==M?e.improverModel:null}return e.judgeModel!==M?e.judgeModel:e.improverModel!==M?e.improverModel:null},Qde=async e=>{let t=Ce(e.cycle),r=M5({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=U5({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Hu({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ks(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Cu({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",l=C5({promptText:e.revision.promptText,isModuleRun:i}),c=ap({isModuleRun:i,timeoutMs:l}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await Pt({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),g=u.ok?j5({workingDirectory:t,before:r,writerReply:u.text}):null,f=G5(o),y={...e.cycle,revisions:e.cycle.revisions.map(A=>A.roundNumber===e.cycle.currentRound?d:A)};return u.ok?!f.ok||g===null?{ok:!1,cycle:pP(y,f.ok?"Could not put the folder back after the run.":f.errorMessage)}:{ok:!0,cycle:y,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:g.lookedAt,evidence:g.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:mP(y)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:pP(y,u.errorMessage,Jr(u))})},eue=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:Qde({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),tue=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),V5=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Pt({writerAgent:e.reviewer,workingDirectory:Ce(e.cycle),prompt:iL({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:mP(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},rue=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===M)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Pt({writerAgent:t.judgeModel,workingDirectory:Ce(t),prompt:Gs({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...cp(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?mP(o):(e.onWriterFailure?.(t.judgeModel),pP(o,n.errorMessage,Jr(n)))},q5=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return rue(e);let o=Zde(t),n=await eue({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?Xde(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===M){let u=await V5({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...tue(s,u.text),judgePhase:void 0}}let i=await Pt({writerAgent:t.judgeModel,workingDirectory:Ce(t),prompt:Bs({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?mP(s):(e.onWriterFailure?.(t.judgeModel),pP(s,i.errorMessage,Jr(i)));let l=await V5({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(l.kind==="stopped")return l.cycle;let c=i.tokens===null&&l.tokens===null?null:(i.tokens??0)+(l.tokens??0),d=cp(s,i.text,c);return cP(d,l.text)}});var gP,oue,nue,wI,Y5=a(()=>{"use strict";I();lP();J5();VS();Pr();He();SI();ft();ni();gP=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),oue=e=>({...e,status:"stopped",errorMessage:Us,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),nue=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?oue(e):(n?.(r),gP(e,t.errorMessage,Jr(t))),wI=async(e,t,r,o)=>{let n=lp(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return gP(e,"This round has no prompt.");if(e.status==="judging")return q5({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return gP(e,"This cycle is waiting on a step this computer cannot run.");if(e.improverModel===M)return e;let i=ri(e);if(i===null)return gP(e,"The improver needs the score and the reason.");let l=await Pt({writerAgent:e.improverModel,workingDirectory:Ce(e),prompt:kn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:ap()}),c=nue(e,l,e.improverModel,r,t);return c!==null?c:aP(e,l.ok?l.text:"",l.ok?l.tokens:null)}});var up,TI,sue,Z5,X5,iue,aue,fP,Q5,eq,lue,cue,si,tq,rq,pp=a(()=>{"use strict";I();np();sp();He();ft();Pr();ni();Y5();qL();up=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),TI=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return up(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},sue=e=>{let t=Jr(e);return wV(e)||t==="usage_limit"||t==="action_required"},Z5=(e,t,r)=>sue(r)?up(e,r.errorMessage,Jr(r)):TI(e,t,r.errorMessage),X5=e=>{let t=e.wizard;return t===void 0||Xu(e).length===0?e:{...e,wizard:Qa({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},iue=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",aue=e=>{let t=e.wizard;if(t===void 0)return e;let r=Fu({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Qa({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},fP=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),Q5=e=>e.judgeModel!==M?e.judgeModel:e.improverModel!==M?e.improverModel:null,eq=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},lue=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Q5(e);if(n===null)return up(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??yr(o),i=Nu({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:eq(e,"generalize")}),l=await Pt({writerAgent:n,prompt:i,workingDirectory:Ce(e),signal:t});if(!l.ok)return r?.(n),Z5(e,"generalize",l);try{let c=CL(l.text),d=Qa({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Ku(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return zu(d)?si({...u,wizard:{...d,gate:null}}):fP(u,"generalize")}catch(c){return TI(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",l.text)}},cue=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=Q5(e);if(n===null)return up(e,"Choose a writer to suggest splits.");let s=hr({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Du({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:eq(e,"separate")}),l=await Pt({writerAgent:n,prompt:i,workingDirectory:Ce(e),signal:t});if(!l.ok)return r?.(n),Z5(e,"separate",l);try{let c=LL(l.text),d=SL(c,o.variables),u=Qa({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:u};return Bu(d)?wn(g,d[0]):fP(g,"separate")}catch(c){return TI(e,"separate",c instanceof Error?c.message:"Could not read split options.",l.text)}},si=e=>{let t=e.wizard;if(t===void 0)return e;let r=yr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},tq=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return up(e,"This module is missing.");let n=wo(r),s=Vs(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==M?e.runnerModel:e.judgeModel!==M?e.judgeModel:e.improverModel,l=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:be(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:l}},rq=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return wI(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return lue(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return cue(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await wI(e,t,r,o);if(v(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Xu(s).length===0)return s;let l=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=we(s.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??0,reasons:f.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;l={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&Uu({revisions:l.revisions,wizard:l.wizard,passScore:l.passScore})){let u=X5(fP(l,i));return Tn(u)}let c=fP(l,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=bL({wizard:{...c.wizard,modules:c.wizard.modules.map((g,f)=>f===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:iue(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?X5(d):aue(d)}return s}return n.phase==="complete",e}});var pl,yP=a(()=>{"use strict";I();He();pl=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:EL(r,e.judgeModel===M),updatedAt:new Date().toISOString()}}});var ml,hP=a(()=>{"use strict";ml=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Jt,oq,due,nq=a(()=>{"use strict";I();ft();hP();Pr();uI();Jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oq=e=>{if(!v(e.status))return"";let t=we(e.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??null,reasons:f.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=qt(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Jt(t.reasons.trim())}</p>`,i=e.status==="passed",l=ml(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Jt(l??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Jt(l??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${Jt(n)}</div>`:i?due({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Ce(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Jt(l??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Jt(t.promptText)}</pre></details>`,g=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${g}</h2>${d}${o}${s}${u}</section>`},due=e=>{let t=e.sourceSkill?.fileName??rp(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=oP(t,r),s=n.length>0&&h5(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Jt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Jt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Jt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Jt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Jt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Jt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var sq,iq=a(()=>{"use strict";sq=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var aq,uue,SP,At,PP,CI=a(()=>{"use strict";I();He();iq();DS();Pr();hP();aq=["Generalize","Evaluate","Separate","Optimize modules"],uue=e=>{let t=gr(e),r=t>=0&&t<aq.length?aq[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},SP=(e,t)=>{let r=Zs(e),o=r===null?null:sq(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},At=(e,t)=>({title:e,detail:t,replyPreview:null}),PP=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=Zs(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:xV(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!v(e.status)){let t=e.judgeModel;return At(`${_e(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this computer.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!v(e.status)){let t=e.judgeModel;return At(`${_e(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this computer.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===M?At(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?At(`${_e(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):At(`${_e(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===M){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==M?At(`${_e(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):At(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this computer can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return At(`${_e(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=be(t);return At(`${_e(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return At(`${_e(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=be(t);return At(`${_e(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return At(`${_e(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===M){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return At("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return At(`${_e(e.improverModel)} is rewriting the prompt.`,"That writer is working on this computer. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>qt(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=me(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||v(e.status)),l=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=l?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?SP(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=ml(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?SP(e,{title:`${uue(r)}${s}`,detail:t.length>0?t:n}):SP(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(v(e.status)){let t=e.errorMessage?.trim()??"";return SP(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this computer.",detail:"This panel keeps updating.",replyPreview:null}}});var Qr,mp=a(()=>{"use strict";He();Qr=e=>{if(e.status==="improving"&&e.improverModel===M)return!0;if(e.status!=="judging"||e.judgeModel!==M)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===M}});var lq,cq=a(()=>{"use strict";lq=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Cn,pue,dq,uq=a(()=>{"use strict";I();Cn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pue=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Cn(r)}</p>`},dq=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Cn(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Cn(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),l=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${l.length===0?"":`<p class="muted">Looked at ${Cn(l)}.</p>`}<pre class="mono">${Cn(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Rn(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Cn(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",g=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Cn(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${pue(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Cn(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var gp,mue,pq,mq=a(()=>{"use strict";I();Pr();gp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mue=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=qt(t.promptText),n=t.judgement?.reasons?`<p class="muted">${gp(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",l=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${gp(i)}.</p>`}<pre class="mono">${gp(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Rn(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${gp(d)}</pre>`:`<div class="alert-error">${gp(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${l}${u}</article>`},pq=e=>e.revisions.map(t=>mue(e,t)).join("")});var gq,fq=a(()=>{"use strict";I();gq=e=>{if(v(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var eo,gue,LI,fue,yue,hue,Sue,yq,hq,II=a(()=>{"use strict";fq();eo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gue="Stop this run? Writers will stop and the best prompt is kept.",LI="End the wizard? Writers will stop and progress from finished steps is kept.",fue="Skip this module and pause at the step gate?",yue=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${eo(gue)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${eo(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,hue=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${eo(LI)}"><input type="hidden" name="cycleId" value="${eo(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,Sue=e=>{let t=eo(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${eo(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${eo(fue)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${eo(LI)}">End wizard</button>
    </form>
  </div>`},yq=e=>{let t=gq(e);return t==="none"?"":t==="legacy_stop"?yue(e.id):t==="wizard_end_only"?hue(e.id):Sue(e)},hq=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=eo(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${eo(LI)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var Sq,Pq=a(()=>{"use strict";I();al();Sq=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let l=i.judgement?.score??null;return l===null?s:s===null?l:Math.max(s,l)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=me(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,l)=>l.bestScore===null?i:i===null||i.bestScore===null||l.bestScore<i.bestScore?l:i,null),s=o.rows.reduce((i,l)=>i+(l.tokens??0),0);return n===null||n.bestScore===null?`${oi(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${oi(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${be(r)}`}return""}});var Pue,Aue,Aq,bue,bq,_q=a(()=>{"use strict";I();Pq();iI();BS();JS();Pue=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',Aue=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',Aq=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bue=(e,t,r)=>{let o=sl(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=Sq(e,t),i=qS(e,t),l=Pue(i),c=Aue(i),d=il(e,t,{forOutcomeSummary:!0}),u=`${l}<span class="sdlc-wizard-outcome-step-title">${Aq(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${Aq(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",f=i==="failed"&&t!=="wizard-4"?" open":"",y=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${y}"${g}${f}><summary aria-controls="${y}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${y}-body">${o}</div></details>`},bq=e=>{let t=e.wizard;if(t===void 0||!v(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>bue(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var kq,Rq,Eq=a(()=>{"use strict";kq=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rq=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${kq(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${kq(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var vI,wq,xI=a(()=>{"use strict";vI=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,wq=(e,t)=>{if(vI(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var Tq,Cq=a(()=>{"use strict";Tq=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var AP,Lq,Iq=a(()=>{"use strict";I();xI();xI();Cq();AP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lq=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=me(t),o=be(t),n=r.terminalStatusSuggestion==="passed"?"":Tq(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,y=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",A=u===void 0?c.status:wq(u,o),P=u!==void 0&&vI(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':A==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':A==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':AP(A);return`<tr${y}><td>${AP(c.title)}</td><td>${AP(g)}</td><td>${c.tokens??"\u2014"}</td><td>${P}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${AP(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var ii,bP,WI=a(()=>{"use strict";ii=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bP=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${ii(r.fileName)}</code> \u2014 ${ii(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${ii(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${ii(i.name)}</strong> <code>.cursor/skills/${ii(i.fileName)}/SKILL.md</code></p><p class="muted">${ii(i.description)}</p><p>${ii(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var _ue,vq,xq=a(()=>{"use strict";I();Eq();Iq();WI();_ue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vq=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!v(e.status)||t.modules.length===0)return"";let r=Lq(e),o=Rq(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=me(t),i=s.passedModuleCount<s.totalModules?" open":"",l=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${_ue(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${bP(e)}${l}${r}${o}</section>`}});var re,_P=a(()=>{"use strict";I();re={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var kP,OI=a(()=>{"use strict";kP=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var Wq,Oq=a(()=>{"use strict";_P();OI();Wq=e=>{let t=kP({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:re.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Io,fp=a(()=>{"use strict";Io=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var vo,RP,MI=a(()=>{"use strict";I();XS();nq();CI();mp();cq();VS();uq();mq();II();_q();xq();al();Oq();ft();fp();vo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RP=e=>{let t=!v(e.status)&&e.status!=="wizard_paused"&&!Qr(e),r=PP(e),o=s5(pL(lq(e)),e),n=v(e.status)?"":yq(e),s=bq(e),i=vq(e),l=oq(e),c=e.errorMessage===null?"":`<div class="alert-error">${vo(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?me(e.wizard):null,f=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,y=!t&&e.wizard!==void 0&&v(e.status)&&(e.wizard.phase==="complete"||me(e.wizard).passedModuleCount>0),A=y?f?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",P=y&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${vo(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",S=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${vo(r.replyPreview)}</pre>`,p=r.detail.length===0&&P.length===0&&S.length===0||r.detail.length===0&&S.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${vo(r.detail)}${u}</p>`}${S}</div>`,b=e.revisions.find(Cr=>Cr.roundNumber===e.currentRound),C=e.status==="improving"?ri(e):null,h=Lo(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),R=Qr(e)?dq({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:C?.promptText??b?.promptText??"",score:C?.score??b?.judgement?.score??null,reasons:C?.reasons??b?.judgement?.reasons??null,avoid:C?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:b?.run??null,minJudgeScore:_?1:0}):"",E=e.wizard!==void 0&&e.wizard.phase==="complete"&&v(e.status),T=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",x=e.wizard!==void 0&&!E&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?be(e.wizard):e.passScore,W=T?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${YS(x)}</div>`:"",z=e.status==="failed"?Wq({status:e.status,errorKind:e.errorKind}):null,O=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':v(e.status)?z!==null?`<span class="${z.badgeClass}">${z.badgeLabel}</span>`:E&&g!==null&&!f?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",U=t?d:y?f?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',he=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${vo(Mt(Ce(e)))}</li>`:"",h>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${oi(h)} so far</li>`:""].filter(Cr=>Cr.length>0),N=he.length===0?"":`<ul class="sdlc-run-meta">${he.join("")}</ul>`,J=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Er=E?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,wr=E?"":W.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Er}</div>`:`<div class="sdlc-run-grid">${Er}${W}</div>`,Xo=pq(e),Tr=e.wizard!==void 0&&v(e.status)&&e.revisions.every(Cr=>Cr.roundNumber===0&&(Cr.judgement===void 0||Cr.judgement===null)),Ub=Xo.length===0||Tr?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Xo}</div></section>`,Ql=`<p class="sdlc-run-goal" title="${vo(e.goal.trim())}">${vo(Io(e.goal))}</p>`,Gm=E?`${c}${i}${s}${R}${l}`:`${c}${wr}${R}${s}${l}`,Km='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',Bb=E?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${vo(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Km}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${O}</div>${Ql}<div class="sdlc-run-activity${A}"${y?' role="status"':""}><div class="sdlc-run-activity-icon">${U}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${vo(r.title)}</h2>${p}${P}${Bb}</div></div>${N}${J}</header>${Gm}</section>${Ub}`}});var Mq,jq=a(()=>{"use strict";I();sp();Mq=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Uu({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Tn(e)}});var Nq,Dq=a(()=>{"use strict";I();pp();Nq=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!zu(t)?e:si({...e,wizard:{...t,gate:null}})}});var Hq,Fq=a(()=>{"use strict";I();np();Hq=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Bu(t.splitOptions))return e;let r=t.splitOptions[0];return wn(e,r)}});var kue,ai,EP=a(()=>{"use strict";jq();Dq();Fq();jt();kue=e=>{let t=Nq(e),r=Mq(t);return Hq(r)},ai=(e,t)=>{let r=kue(t);return r!==t?(B(e,r),r):t}});var $q,xo,yp=a(()=>{"use strict";I();$q=e=>Ot.indexOf(e),xo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||v(e.status)?Ot.length:t.gate!==null?$q(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?$q(t.phase):null}});var zq,Uq=a(()=>{"use strict";zq=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var li,Bq,Gq=a(()=>{"use strict";I();Uq();li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bq=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Ks(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${li(zq(o))}</pre></div>`:"",s=qs(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=wo(t),l=s.map(c=>{let d=t.variables.find(A=>A.name===c),u=xS(c),g=i[c]??"",f=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${li(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${li(u)}">${li(f)}</label>
        ${y}
        <input class="input" type="text" id="${li(u)}" name="${li(u)}" value="${li(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${l}</div>`}});var Kq,Vq=a(()=>{"use strict";Kq={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var hp,Rue,Le,Ln=a(()=>{"use strict";Vq();En();hp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rue=e=>{let t=Kq[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${hp(t.title)}" aria-describedby="${r}" aria-expanded="false">${St}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${hp(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${hp(t.example)}</span></span></button>`},Le=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${hp(r)}"`}>${hp(e)}</span>${Rue(t)}</span>`});var Yt,qq,Jq,Yq=a(()=>{"use strict";I();op();_P();Ln();Yt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qq=e=>{let t=e.costControls;if(t===void 0||ol(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??ht({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,l=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${Yt(re.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${Yt(t.softWarnMessage??Js)}</p>`:"",d=sP({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${Yt(re.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,g=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${Yt(re.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${Yt(re.confirmLede)}</p>
  ${g}
  ${l}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${Yt(el)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${Yt(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${Yt(re.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${Yt(re.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${Yt(re.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${Le(re.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${Le(re.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${Yt(re.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${Yt(re.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},Jq=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!ol(r)}});var Eue,Xq,Zq=a(()=>{"use strict";En();Eue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xq=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${St}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${Eue(t)}</pre></template>`}});var Sp,Qq,eJ=a(()=>{"use strict";I();VL();Gq();QL();II();WI();rI();Yq();Zq();Sp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qq=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(Jq(e))return qq(e);let n=be(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?UV(r):"",l=o==="evaluate"?bP(e):"",c=o==="evaluate"?nl({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let W=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',z=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",O=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Sp(x.id)}" required${O}> <strong>${Sp(x.title)}</strong>${W}${z}</label>${zS(e,x)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],y=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",A=g?.title??"Module",P=g?.prompt??"",S=g?.status==="pending",p=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Sp(A)}</p>${S?Bq({cycle:e,modulePrompt:P}):""}<p class="muted">Test run prompt preview: ${Sp(Vs(P,wo(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${nl({cycle:e,interactive:!1,caption:S?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${A}\u201D (runner + judge).`})}`:"",b=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":S?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",C=$u(r),h=C===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${C}</p>`,_=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?Xq(r.lastWriterParseFailureReply??""):"",R=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",E=t?.active===!0?" sdlc-wizard-gate-active":"",T=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${R}"`:"";return`<section class="card sdlc-wizard-gate${E}"${T}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${b}</p>
    ${_}
    ${h}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Sp(e.id)}">
    ${i}
    ${l}
    ${c}
    ${u}
    ${p}
      <div class="field">
        <label class="field-label" for="wizardFeedback">Feedback to rerun this step</label>
        <textarea class="input textarea" id="wizardFeedback" name="wizardFeedback" rows="3" placeholder="What should change?"></textarea>
      </div>
      <div class="field">
        <label class="field-label" for="wizardStepInstructions">Extra instructions (optional)</label>
        <textarea class="input textarea" id="wizardStepInstructions" name="wizardStepInstructions" rows="2" placeholder="Added to this step only when you rerun with feedback."></textarea>
      </div>
      <div class="sdlc-wizard-actions">
        <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue"${y}>Continue</button>
        <button class="btn btn-secondary" type="submit" name="intent" value="wizard-feedback-rerun" formnovalidate>Rerun with feedback</button>
      </div>
    </form>
    ${hq(e)}
  </section>`}});var wue,tJ,rJ=a(()=>{"use strict";I();JS();wue=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tJ=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||v(e.status))return"";let r=(o,n)=>{let s=il(e,o);return`<h2 class="sdlc-wizard-active-head">${wue(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    ${r("wizard-3","Suggesting module splits")}
    <p class="muted">The writer is proposing split options. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`;if(t.phase==="optimize_modules"&&t.modules.length>0){let o=t.currentModuleIndex,s=t.modules[o]?.title??"Module";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4">
    <p class="eyebrow">Step 4 \u2014 Optimize modules</p>
    ${r("wizard-4",`Module ${o+1} of ${t.modules.length}: ${s}`)}
    <p class="muted">The runner executes this module in your folder, then the judge scores it. When the round finishes, the Step 4 review gate appears here. Until then, watch <strong>This run</strong> above.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`}return t.phase==="evaluate"?`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-2">
    <p class="eyebrow">Step 2 \u2014 Evaluate</p>
    ${r("wizard-2","Scoring prompt revisions")}
    <p class="muted">The judge is revising and scoring prompt text. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`:t.phase==="generalize"?`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-1">
    <p class="eyebrow">Step 1 \u2014 Generalize</p>
    ${r("wizard-1","Generalizing your prompt")}
    <p class="muted">The writer is building {{variables}}. <strong>This run</strong> above updates while it works.</p>
    <p><a class="btn btn-secondary" href="#prompt-optimizer-run">Jump to This run</a></p>
  </section>`:""}});var jI,oJ,nJ,In,sJ,gl=a(()=>{"use strict";I();jt();jI=new Map,oJ=e=>{let t=new AbortController;return jI.set(e,t),t.signal},nJ=e=>{jI.delete(e)},In=e=>{jI.get(e)?.abort()},sJ=(e,t)=>{let r=ie(e,t);return r===null||r.wizard!==void 0?!1:(v(r.status)||(B(e,{...r,status:"stopped",errorMessage:Us,updatedAt:new Date().toISOString()}),In(t)),!0)}});var iJ,aJ,NI,lJ,DI=a(()=>{"use strict";I();yp();gl();iJ="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",aJ=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Ot[r]??null},NI=(e,t)=>{let r=aJ(t);if(r===null||e.wizard===void 0)return!1;let o=Ot.indexOf(r);if(o===-1)return!1;let n=xo(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Ot.length)},lJ=(e,t)=>{let r=aJ(t);if(r===null||e.wizard===void 0||!NI(e,t))return e;In(e.id);let o=Ot.slice(Ot.indexOf(r)),n=ju(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(l=>!o.includes(l.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var HI,cJ,dJ=a(()=>{"use strict";DI();HI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cJ=(e,t)=>NI(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${HI(iJ)}"><input type="hidden" name="cycleId" value="${HI(e.id)}"><input type="hidden" name="wizardStepId" value="${HI(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var Tue,uJ,Cue,pJ,mJ=a(()=>{"use strict";I();yp();eJ();rJ();dJ();BS();Tue={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},uJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cue=(e,t,r)=>{let o=cJ(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${uJ(t)}">
  <summary class="sdlc-wizard-accordion-summary">${uJ(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${sl(e,t)}</div>
</details>`},pJ=e=>{let t=e.wizard;if(t===void 0)return"";let r=xo(e);if(r===null)return"";let o=Ot.slice(0,r).map((i,l)=>Cue(e,`wizard-${l+1}`,Tue[i])),n=t.gate!==null?Qq(e,{active:!0}):tJ(e),s=r>=Ot.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var wP,FI=a(()=>{"use strict";mJ();tI();I();wP=e=>{if(e===null||e.wizard!==void 0&&v(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=pJ(e),r=qV(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Lue,$I,gJ=a(()=>{"use strict";I();He();ft();ni();Lue=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},$I=async(e,t,r)=>{if(!Lue(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===M)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=_L({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Pt({writerAgent:e.judgeModel,prompt:n,workingDirectory:Ce(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=RL(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Pp,TP,fJ,zI,yJ,hJ,SJ,CP,UI=a(()=>{"use strict";Pp=m(require("node:fs")),TP=m(require("node:path")),fJ=e=>TP.default.join(TP.default.dirname(e),"prompt-optimizer-writer-ready.json"),zI=e=>{let t=fJ(e);if(!Pp.default.existsSync(t))return{};try{let r=JSON.parse(Pp.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},yJ=(e,t)=>{Pp.default.mkdirSync(TP.default.dirname(e),{recursive:!0}),Pp.default.writeFileSync(fJ(e),`${JSON.stringify(t,null,2)}
`)},hJ=(e,t)=>zI(e)[t]?.message??null,SJ=(e,t,r)=>{yJ(e,{...zI(e),[t]:{message:r}})},CP=(e,t)=>{let r=zI(e);r[t]!==void 0&&yJ(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var BI,LP,IP,PJ,Fe,ci=a(()=>{"use strict";I();iP();pp();gJ();mp();gl();UI();EP();jt();BI=new Set,LP={atMs:0,ids:[]},IP=async()=>{if(Date.now()-LP.atMs<3e4)return LP.ids;let e=await mr({commands:Ae({})});return LP.atMs=Date.now(),LP.ids=e.installedWriterIds,e.installedWriterIds},PJ=async(e,t,r)=>{let o=ie(e,t);if(o===null||r.aborted)return;let n=ai(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(v(n.status)&&!s||n.status==="wizard_paused"||Qr(n))return;if(s){let c=await $I(n,r,d=>{CP(e,d)});B(e,c);return}let i=await rq(n,c=>{CP(e,c)},r,c=>{ie(e,t)?.status==="stopped"||r.aborted||B(e,c)});if(!(ie(e,t)?.status==="stopped"||r.aborted)){if(B(e,i),v(i.status)){let c=await $I(i,r,d=>{CP(e,d)});B(e,c);return}await PJ(e,t,r)}},Fe=(e,t)=>{if(BI.has(t))return;let r=ie(e,t);if(r===null)return;let o=ai(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(v(o.status)&&!n||o.status==="wizard_paused"||Qr(o))return;BI.add(t);let s=oJ(t);PJ(e,t,s).finally(()=>{BI.delete(t),nJ(t)})}});var vn,Ap=a(()=>{"use strict";MI();EP();FI();ci();vn=(e,t)=>{let r=ai(e,t);return Fe(e,r.id),`${RP(r)}${wP(r)}`}});var AJ,bJ,_J=a(()=>{"use strict";AJ=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,bJ=e=>e!==null&&e>0});var Iue,vue,xue,kJ,RJ=a(()=>{"use strict";I();pp();yP();np();sp();gl();GS();GS();Iue=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),vue=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=we(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},xue=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=me(o);return pl({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},kJ=(e,t)=>{if(!tp(e,t))return e;In(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return si({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Tn(vue(r));if(t==="wizard-3"){let n=o.splitOptions[0]??Iue(o.templatedPrompt);return wn(r,n)}return t==="wizard-4"?xue(r):e}});var vP,EJ,GI=a(()=>{"use strict";I();yP();gl();vP=e=>(In(e.id),{...pl(e,"stopped"),errorMessage:JC}),EJ=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;In(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var Wue,wJ,TJ,CJ=a(()=>{"use strict";I();pp();yP();np();sp();Ap();jt();ci();_J();DI();RJ();GI();Wue="Pick a revision scored above 0 before continuing to Separate.",wJ=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),TJ=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=ie(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},l=c=>{if(!r){i(c);return}let d=ie(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(vn(e.storePath,d))};if(o==="wizard-stop-all"){let c=vP(s);return B(e.storePath,c),Fe(e.storePath,n),l(n),!0}if(o==="wizard-skip-module"){let c=EJ(s);return B(e.storePath,c),l(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=lJ(s,c);return B(e.storePath,d),l(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=kJ(s,c);return B(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Fe(e.storePath,n),l(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return l(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",g=yL(s.wizard,d,c);g=ju(g,d),g={...g,pendingStepInstructions:u};let f={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return B(e.storePath,f),Fe(e.storePath,n),l(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return l(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(f=>f.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?wJ(s):si({...s,wizard:{...s.wizard,gate:null}});return B(e.storePath,g),Fe(e.storePath,n),l(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=AJ(s,u??-1);if(!bJ(g)){let y={...s,errorMessage:Wue,updatedAt:new Date().toISOString()};return B(e.storePath,y),l(n),!0}let f=Tn({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return B(e.storePath,f),Fe(e.storePath,n),l(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let y=wJ(s);return B(e.storePath,y),Fe(e.storePath,n),l(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(y=>y.id===u);if(g===void 0){let y={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return B(e.storePath,y),l(n),!0}let f=wn(s,g);return B(e.storePath,f),l(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,g=d.modules[u];if(g===void 0)return l(n),!0;if(!ol(s.costControls)){let S=t.get("confirmedTokenBudget")?.trim()??"",p=t.get("confirmedMaxSpendUsd")?.trim()??"";if(S.length===0){let C={...s,errorMessage:el,updatedAt:new Date().toISOString()};return B(e.storePath,C),l(n),!0}let b=qr({existing:s.costControls,confirmedTokenBudget:Number(S),confirmedMaxSpendUsd:p.length===0?null:Number(p),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!b.ok){let C={...s,errorMessage:b.errorMessage,updatedAt:new Date().toISOString()};return B(e.storePath,C),l(n),!0}s={...s,costControls:b.costControls,errorMessage:null,updatedAt:new Date().toISOString()},B(e.storePath,s)}let f=ML({wizard:d,modulePrompt:g.prompt,posted:t});if(!f.ok){let S={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return B(e.storePath,S),l(n),!0}let y={...d,parameterValues:f.parameterValues};if(g.status==="pending"){let S=tq({...s,wizard:{...y,gate:null}},u);return B(e.storePath,S),Fe(e.storePath,n),l(n),!0}let A=u+1;if(A>=d.modules.length){let S=me(y),p=pl({...s,wizard:y},S.terminalStatusSuggestion);return B(e.storePath,p),Fe(e.storePath,n),l(n),!0}let P={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...y,gate:"optimize_modules",currentModuleIndex:A},updatedAt:new Date().toISOString()};return B(e.storePath,P),l(n),!0}}return l(n),!0}});var Oue,LJ,Mue,KI,jue,IJ,vJ=a(()=>{"use strict";He();gl();GI();PI();lP();mp();jt();Oue="Add a score from 0 to 100 and the reason for it.",LJ="Add a score from 1 to 100 and the reason for it.",Mue="Write the next prompt.",KI="This step is not waiting for you.",jue=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},IJ=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",l=ie(e.storePath,i);return l===null?{kind:"missing"}:l.wizard!==void 0?(B(e.storePath,vP(l)),{kind:"saved",cycleId:i}):sJ(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=ie(e.storePath,r);if(o===null||!Qr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:KI};if(t==="manual-judge"){if(o.judgeModel!==M)return{kind:"invalid",cycle:o,errorMessage:KI};let i=jue(e.posted.get("score")??""),l=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||l.length===0)return{kind:"invalid",cycle:o,errorMessage:c?LJ:Oue};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:LJ};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",u=cP(cp(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:l})),d);return B(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==M)return{kind:"invalid",cycle:o,errorMessage:KI};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:Mue};let s=aP(o,n);return B(e.storePath,s),{kind:"saved",cycleId:o.id}}});var xJ,WJ=a(()=>{"use strict";xJ=`<script>
(() => {
  let root = null;
  let pollTimer = null;
  let lastWizardGateScrollStepId = null;

  const paintElapsed = () => {
    if (root === null) return;
    const slot = root.querySelector("[data-elapsed]");
    const since = root.dataset.since;
    if (!slot || !since) return;
    const seconds = Math.max(0, Math.floor((Date.now() - Date.parse(since)) / 1000));
    const minutes = Math.floor(seconds / 60);
    const rest = String(seconds % 60).padStart(2, "0");
    slot.textContent = minutes > 0 ? minutes + "m " + rest + "s" : seconds + "s";
  };
  const applyIncomingRun = (incoming) => {
    if (root === null) return;
    root.dataset.live = incoming.dataset.live ?? "";
    root.dataset.since = incoming.dataset.since ?? "";
    const busy = incoming.getAttribute("aria-busy");
    root.setAttribute(
      "aria-busy",
      busy ?? (root.dataset.live === "true" ? "true" : "false"),
    );
    root.innerHTML = incoming.innerHTML;
    paintElapsed();
  };
  const applyIncomingGate = (holder) => {
    const incomingGateSlot = holder.querySelector("#prompt-optimizer-wizard-gate-slot");
    const gateSlot = document.getElementById("prompt-optimizer-wizard-gate-slot");
    if (incomingGateSlot === null || gateSlot === null) return;
    const accordionDom = window.__promptSdlcWizardAccordionDom;
    const openAccordionSteps = accordionDom?.readOpen() ?? new Set();
    gateSlot.replaceWith(incomingGateSlot);
    accordionDom?.restoreOpen(openAccordionSteps);
    const fields = document.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement) fields.disabled = true;
    const active = document.getElementById("prompt-optimizer-wizard-active-step");
    if (active instanceof HTMLElement) {
      const stepId = active.dataset.sdlcStepId ?? "";
      if (stepId.length > 0 && stepId !== lastWizardGateScrollStepId) {
        lastWizardGateScrollStepId = stepId;
        active.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  const poll = async () => {
    if (root === null || root.dataset.live !== "true") return;
    const url = new URL(location.href);
    url.searchParams.set("fragment", "run");
    const response = await fetch(url, { cache: "no-store" }).catch(() => null);
    if (response === null || !response.ok) {
      pollTimer = setTimeout(poll, 2000);
      return;
    }
    const holder = document.createElement("div");
    holder.innerHTML = await response.text();
    applyIncomingGate(holder);
    const incoming = holder.querySelector("#prompt-optimizer-run");
    if (!incoming) {
      pollTimer = setTimeout(poll, 2000);
      return;
    }
    applyIncomingRun(incoming);
    document.dispatchEvent(new Event("sdlc-node-dialog-refresh"));
    if (root.dataset.live !== "true") {
      lastWizardGateScrollStepId = null;
      document.dispatchEvent(new Event("sdlc-run-finished"));
      return;
    }
    pollTimer = setTimeout(poll, 2000);
  };
  const startPoll = () => {
    if (pollTimer !== null) clearTimeout(pollTimer);
    pollTimer = null;
    if (root !== null && root.dataset.live === "true") {
      pollTimer = setTimeout(poll, 2000);
    }
  };
  const attach = () => {
    root = document.getElementById("prompt-optimizer-run");
    paintElapsed();
    startPoll();
  };
  attach();
  setInterval(paintElapsed, 1000);
  document.addEventListener("sdlc-live-restart", attach);
})();
</script>`});var OJ,MJ=a(()=>{"use strict";OJ=`<script>
(() => {
  const enterComposeRunStarted = () => {
    const compose = document.getElementById("prompt-optimizer-compose");
    const details = document.getElementById("prompt-optimizer-compose-details");
    if (details instanceof HTMLDetailsElement) {
      details.open = false;
    }
    if (compose instanceof HTMLElement) {
      compose.classList.add("sdlc-compose-run-started");
      compose.classList.remove("sdlc-compose-run-focus");
    }
    document.querySelectorAll("[data-sdlc-compose-head-actions]").forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = true;
      }
    });
  };

  const focusRunPanel = () => {
    const run = document.getElementById("prompt-optimizer-run");
    if (run === null) return;
    enterComposeRunStarted();
    run.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const lockCompose = () => {
    const fields = document.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement) fields.disabled = true;
    document.querySelector("[data-sdlc-locked]")?.remove();
    const compose = document.getElementById("prompt-optimizer-compose");
    if (compose) {
      const locked = document.createElement("p");
      locked.className = "sdlc-locked";
      locked.dataset.sdlcLocked = "true";
      locked.textContent = "This run is using these choices.";
      fields?.prepend(locked);
    }
    document
      .querySelectorAll(".sdlc-compose-step-actions")
      .forEach((node) => {
        if (node instanceof HTMLElement) {
          node.hidden = true;
        }
      });
    document.querySelector(".sdlc-wizard-resume-paused")?.remove();
    focusRunPanel();
  };

  let lastWizardAutofocusStepId = null;

  const readWizardAutofocusStepId = () => {
    const active = document.getElementById("prompt-optimizer-wizard-active-step");
    if (!(active instanceof HTMLElement)) return null;
    const stepId = active.dataset.sdlcStepId;
    return typeof stepId === "string" && stepId.length > 0 ? stepId : null;
  };

  const focusActiveWizardStep = () => {
    const stepId = readWizardAutofocusStepId();
    if (stepId === null) return;
    if (stepId === lastWizardAutofocusStepId) return;
    const active = document.getElementById("prompt-optimizer-wizard-active-step");
    if (active === null) return;
    lastWizardAutofocusStepId = stepId;
    active.scrollIntoView({ behavior: "smooth", block: "start" });
    const focusTarget = active.querySelector(
      "textarea, input:not([type=hidden]), button, select",
    );
    if (focusTarget instanceof HTMLElement) focusTarget.focus({ preventScroll: true });
  };

  document.addEventListener("sdlc-run-finished", () => {
    lastWizardAutofocusStepId = null;
  });

  const applyLiveFragment = (html) => {
    const holder = document.createElement("div");
    holder.innerHTML = html;
    let applied = false;
    let runApplied = false;
    const incomingGateSlot = holder.querySelector("#prompt-optimizer-wizard-gate-slot");
    const gateSlot = document.getElementById("prompt-optimizer-wizard-gate-slot");
    const accordionDom = window.__promptSdlcWizardAccordionDom;
    const openAccordionSteps = accordionDom?.readOpen() ?? new Set();
    if (incomingGateSlot !== null && gateSlot !== null) {
      gateSlot.replaceWith(incomingGateSlot);
      accordionDom?.restoreOpen(openAccordionSteps);
      applied = true;
    } else if (incomingGateSlot !== null && gateSlot === null) {
      const runAnchor = document.getElementById("prompt-optimizer-run");
      const resume = document.querySelector(".sdlc-wizard-resume");
      const compose = document.getElementById("prompt-optimizer-compose");
      const insertAfter =
        runAnchor ?? resume ?? compose;
      insertAfter?.insertAdjacentElement("afterend", incomingGateSlot);
      accordionDom?.restoreOpen(openAccordionSteps);
      applied = true;
    }
    const incomingRun = holder.querySelector("#prompt-optimizer-run");
    const run = document.getElementById("prompt-optimizer-run");
    if (incomingRun !== null && run !== null) {
      run.replaceWith(incomingRun);
      applied = true;
      runApplied = true;
    } else if (incomingRun !== null && run === null) {
      const resume = document.querySelector(".sdlc-wizard-resume");
      const compose = document.getElementById("prompt-optimizer-compose");
      const insertAfter = resume ?? compose;
      insertAfter?.insertAdjacentElement("afterend", incomingRun);
      applied = true;
      runApplied = true;
    }
    const incomingDialog = holder.querySelector("#sdlc-node-dialog");
    if (incomingDialog !== null && document.getElementById("sdlc-node-dialog") === null) {
      document.body.appendChild(incomingDialog);
    }
    if (!applied) {
      document.dispatchEvent(new Event("sdlc-run-start-failed"));
      return;
    }
    if (runApplied) {
      lockCompose();
    } else {
      focusActiveWizardStep();
    }
    const runAfter = document.getElementById("prompt-optimizer-run");
    if (runAfter instanceof HTMLElement && runAfter.dataset.live !== "true") {
      document.dispatchEvent(new Event("sdlc-run-finished"));
    }
    document.dispatchEvent(new CustomEvent("sdlc-live-restart"));
    document.dispatchEvent(new Event("sdlc-node-dialog-refresh"));
  };

  const formDataFromSubmit = (form, submitter) =>
    submitter instanceof HTMLElement
      ? new FormData(form, submitter)
      : new FormData(form);

  const readConfirmMessage = (form, submitter) => {
    if (submitter instanceof HTMLElement) {
      const fromButton = submitter.dataset.confirmMessage;
      if (typeof fromButton === "string" && fromButton.length > 0) {
        return fromButton;
      }
    }
    const fromForm = form.dataset.confirmMessage;
    return typeof fromForm === "string" && fromForm.length > 0 ? fromForm : "";
  };

  const shouldLivePost = (form, intent) => {
    if (!(form instanceof HTMLFormElement)) return false;
    if (form.classList.contains("sdlc-form")) return false;
    if (typeof intent !== "string") return false;
    if (intent === "stop") return true;
    return intent.startsWith("wizard-");
  };

  const postLiveFragment = async (body) => {
    body.set("liveFragment", "1");
    const response = await fetch("/prompt-optimizer", {
      method: "POST",
      body,
      cache: "no-store",
    }).catch(() => null);
    if (response === null || !response.ok) {
      document.dispatchEvent(new Event("sdlc-run-start-failed"));
      return false;
    }
    const html = await response.text();
    if (html.trim().length === 0) {
      document.dispatchEvent(new Event("sdlc-run-start-failed"));
      return false;
    }
    applyLiveFragment(html);
    const cycleId = response.headers.get("X-Prompt-Sdlc-Cycle-Id");
    if (cycleId) {
      const url = new URL(location.href);
      url.searchParams.set("cycle", cycleId);
      history.replaceState(null, "", url);
    }
    return true;
  };

  document.addEventListener(
    "submit",
    (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      const submitter = event.submitter;
      const body = formDataFromSubmit(form, submitter);
      const intent = body.get("intent");
      if (!shouldLivePost(form, intent)) return;
      const confirmMessage = readConfirmMessage(form, submitter);
      if (confirmMessage.length > 0 && !window.confirm(confirmMessage)) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      void postLiveFragment(body);
    },
    true,
  );

  document.querySelector("form.sdlc-form")?.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const submitter = event.submitter;
    const intent =
      submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
        ? submitter.value
        : "";
    if (intent !== "run") return;
    const summaryStep = document.getElementById("sdlc-compose-step-4");
    if (summaryStep instanceof HTMLElement && summaryStep.hidden) {
      return;
    }
    event.preventDefault();
    void postLiveFragment(formDataFromSubmit(form, submitter));
  });

  if (document.querySelector(".sdlc-fields[disabled]")) {
    const compose = document.getElementById("prompt-optimizer-compose");
    if (
      compose instanceof HTMLElement &&
      !compose.classList.contains("sdlc-compose-viewing-finished")
    ) {
      compose.classList.add("sdlc-compose-run-focus");
    }
  }

  const announceCopy = (message) => {
    const live = document.getElementById("sdlc-run-live-region");
    if (live instanceof HTMLElement) live.textContent = message;
    const toast = document.getElementById("sdlc-run-toast");
    if (!(toast instanceof HTMLElement)) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add("sdlc-run-toast-visible");
    window.clearTimeout(announceCopy._hideTimer);
    announceCopy._hideTimer = window.setTimeout(() => {
      toast.hidden = true;
      toast.classList.remove("sdlc-run-toast-visible");
      toast.textContent = "";
    }, 2800);
  };

  const copyTextWithFeedback = (button, text, okLabel, announceOk, announceFail) => {
    if (!(button instanceof HTMLButtonElement)) return;
    const previous = button.textContent ?? "";
    void navigator.clipboard
      .writeText(text)
      .then(() => {
        button.textContent = okLabel;
        announceCopy(announceOk);
        window.setTimeout(() => {
          button.textContent = previous;
        }, 2500);
      })
      .catch(() => {
        announceCopy(announceFail);
      });
  };

  const moduleResultsRoot = () =>
    document.getElementById("prompt-optimizer-wizard-module-results");

  document.querySelector("[data-sdlc-copy-wizard-modules]")?.addEventListener("click", (event) => {
    const root = moduleResultsRoot();
    if (root === null) return;
    const chunks = [...root.querySelectorAll(".sdlc-wizard-chunk-prompt")]
      .map((node) => node.textContent?.trim() ?? "")
      .filter((text) => text.length > 0);
    if (chunks.length === 0) return;
    const text = chunks
      .map((prompt, index) => \`## Module \${index + 1}\\n\\n\${prompt}\`)
      .join("\\n\\n");
    const button = event.currentTarget;
    copyTextWithFeedback(
      button,
      text,
      "Copied \u2713",
      "All module prompts copied to clipboard.",
      "Could not copy module prompts.",
    );
  });

  document.querySelectorAll("[data-sdlc-copy-module-prompt]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const button = event.currentTarget;
      const row = button instanceof HTMLElement ? button.closest(".sdlc-wizard-module-prompt-row") : null;
      const pre = row?.querySelector(".sdlc-wizard-chunk-prompt");
      const text = pre?.textContent?.trim() ?? "";
      if (text.length === 0) return;
      copyTextWithFeedback(
        button,
        text,
        "Copied \u2713",
        "Module prompt copied to clipboard.",
        "Could not copy module prompt.",
      );
    });
  });

  const outcomeRoot = document.getElementById("prompt-optimizer-wizard-outcome");
  if (outcomeRoot !== null) {
    outcomeRoot.querySelector("[data-sdlc-outcome-expand-all]")?.addEventListener("click", () => {
      outcomeRoot.querySelectorAll(".sdlc-wizard-outcome-step").forEach((node) => {
        if (node instanceof HTMLDetailsElement) node.open = true;
      });
    });
    outcomeRoot.querySelector("[data-sdlc-outcome-collapse-all]")?.addEventListener("click", () => {
      outcomeRoot.querySelectorAll(".sdlc-wizard-outcome-step").forEach((node) => {
        if (node instanceof HTMLDetailsElement) node.open = false;
      });
    });
    document.querySelectorAll("[data-sdlc-outcome-step]").forEach((node) => {
      node.addEventListener("click", (event) => {
        const stepId = node instanceof HTMLElement ? node.dataset.sdlcOutcomeStep : null;
        if (stepId === undefined || stepId === null || stepId.length === 0) return;
        const target = document.getElementById(\`prompt-optimizer-wizard-outcome-\${stepId}\`);
        if (!(target instanceof HTMLDetailsElement)) return;
        event.preventDefault();
        event.stopPropagation();
        target.open = true;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  const viewModuleLink = document.querySelector("[data-sdlc-view-module-results]");
  const moduleResultsSection = document.getElementById(
    "prompt-optimizer-wizard-module-results",
  );
  if (
    viewModuleLink instanceof HTMLAnchorElement &&
    moduleResultsSection !== null
  ) {
    viewModuleLink.hidden = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        viewModuleLink.hidden = entry.isIntersecting;
      },
      { threshold: 0.12, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(moduleResultsSection);
  }

  const runOnLoad = document.getElementById("prompt-optimizer-run");
  const runBusyOnLoad =
    runOnLoad instanceof HTMLElement &&
    runOnLoad.getAttribute("aria-busy") === "true";
  const stepOnLoad = readWizardAutofocusStepId();
  if (runBusyOnLoad && stepOnLoad !== null) {
    lastWizardAutofocusStepId = stepOnLoad;
  } else {
    focusActiveWizardStep();
  }
})();
</script>`});var jJ,NJ=a(()=>{"use strict";jJ=`<script>
(() => {
  const fit = (area) => {
    area.style.height = "auto";
    area.style.height = area.scrollHeight + "px";
  };
  document.querySelectorAll("form.sdlc-form textarea").forEach((area) => {
    fit(area);
    area.addEventListener("input", () => fit(area));
  });
  document.querySelectorAll("[data-sdlc-compose-head-actions]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
  const COMPOSE_STEP_COUNT = 4;
  let composeStep = 1;
  const composeStepError = document.querySelector("[data-sdlc-compose-step-error]");
  const composeStepPanels = [
    ...document.querySelectorAll("[data-sdlc-compose-step]"),
  ];
  const composeStepperItems = [
    ...document.querySelectorAll("[data-sdlc-stepper-item]"),
  ];
  const composeReview = document.querySelector("[data-sdlc-compose-review]");
  const runButton = document.querySelector("[data-sdlc-run-wizard]");
  const hint = document.querySelector("[data-sdlc-run-hint]");
  const RUN_LABEL = "Run";
  const WAITING_LABEL = "Waiting for you";
  const paintRunButton = (loading) => {
    if (!(runButton instanceof HTMLButtonElement)) return;
    if (loading) {
      runButton.disabled = true;
      runButton.setAttribute("aria-busy", "true");
      runButton.innerHTML =
        '<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026';
      return;
    }
    runButton.removeAttribute("aria-busy");
    runButton.textContent = RUN_LABEL;
  };
  const focusRunPanel = () => {
    const run = document.getElementById("prompt-optimizer-run");
    if (run === null) return;
    const compose = document.getElementById("prompt-optimizer-compose");
    if (
      compose instanceof HTMLElement &&
      !compose.classList.contains("sdlc-compose-viewing-finished")
    ) {
      compose.classList.add("sdlc-compose-run-focus");
    }
    run.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const setComposeHeadActionsHidden = (hidden) => {
    document.querySelectorAll("[data-sdlc-compose-head-actions]").forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = hidden;
      }
    });
  };
  const revertRunStartUi = () => {
    paintRunButton(false);
    const compose = document.getElementById("prompt-optimizer-compose");
    compose?.classList.remove("sdlc-compose-run-focus");
    compose?.classList.remove("sdlc-compose-run-started");
    document.querySelectorAll(".sdlc-compose-step-actions").forEach((node) => {
      if (node instanceof HTMLElement) {
        node.hidden = false;
      }
    });
    setComposeHeadActionsHidden(false);
    paintReady();
  };
  const paintRunButtonWaiting = () => {
    if (!(runButton instanceof HTMLButtonElement)) return;
    runButton.disabled = true;
    runButton.removeAttribute("aria-busy");
    runButton.textContent = WAITING_LABEL;
  };
  const slots = [...document.querySelectorAll("[data-writer-status]")];
  const viewingFinishedRun =
    document.querySelector("#prompt-optimizer-run .sdlc-run-badge-done") !== null ||
    document.querySelector("#prompt-optimizer-run .sdlc-run-badge-finished") !== null;
  const staticPreview = window.location.protocol === "file:";
  let showRunBlockHint = false;
  const clearRunHint = () => {
    showRunBlockHint = false;
    if (!(hint instanceof HTMLElement)) return;
    hint.textContent = "";
    hint.hidden = true;
    hint.className = "muted sdlc-run-hint";
  };
  const paintRunHint = () => {
    if (!(hint instanceof HTMLElement)) return;
    if (!showRunBlockHint) {
      hint.textContent = "";
      hint.hidden = true;
      hint.className = "muted sdlc-run-hint";
      return;
    }
    const reason = readRunBlockReason();
    if (reason === null) {
      clearRunHint();
      return;
    }
    hint.textContent = reason;
    hint.hidden = false;
    hint.className = "alert-error sdlc-run-hint";
  };
  const readRunBlockReason = () => {
    const fields = document.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement && fields.disabled) {
      return "This run is in progress. Use the gate or This run panel above.";
    }
    const compose = readComposeFields();
    if (!compose.hasGoal || !compose.hasPrompt) {
      return "Fill in the goal and prompt before you run.";
    }
    const pending = slots.find((slot) => slot.dataset.ready !== "true");
    if (pending) {
      const writer = pending.dataset.writer ?? "writer";
      if (writer.length === 0) {
        return "Choose who scores and who rewrites the prompt.";
      }
      if (writer === "manual") {
        return "You chose a manual step. Run will pause when that step is due.";
      }
      if (pending.textContent === "Checking\u2026") {
        return "Checking that the chosen writer is ready\u2026";
      }
      return pending.textContent.trim().length > 0
        ? pending.textContent.trim()
        : "Fix the writer error above, then run again.";
    }
    return null;
  };
  const readSelectLabel = (select) => {
    if (!(select instanceof HTMLSelectElement)) return "";
    if (select.value.length === 0) return "";
    const option = select.selectedOptions[0];
    return option ? option.textContent.trim() : select.value;
  };
  const truncatePreview = (text, max = 220) => {
    if (text.length <= max) return text;
    return text.slice(0, max - 1) + "\u2026";
  };
  const escapeComposeText = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  const paintComposeReview = () => {
    if (!(composeReview instanceof HTMLElement)) return;
    const compose = readComposeFields();
    const judgeSelect = document.querySelector('[data-writer-select="judge"]');
    const improverSelect = document.querySelector('[data-writer-select="improver"]');
    const runnerSelect = document.querySelector('[data-writer-select="runner"]');
    const judgeLabel = readSelectLabel(judgeSelect);
    const improverLabel = readSelectLabel(improverSelect);
    const runnerLabel = readSelectLabel(runnerSelect);
    const folder = compose.folder.length > 0 ? escapeComposeText(compose.folder) : "\u2014";
    const goal = compose.hasGoal ? escapeComposeText(truncatePreview(compose.goal)) : "\u2014";
    const prompt = compose.hasPrompt
      ? escapeComposeText(truncatePreview(compose.prompt))
      : "\u2014";
    const judge = judgeLabel.length > 0 ? escapeComposeText(judgeLabel) : "\u2014";
    const improver =
      improverLabel.length > 0 ? escapeComposeText(improverLabel) : "\u2014";
    const runner =
      runnerLabel.length > 0
        ? escapeComposeText(runnerLabel)
        : "Not set (uses judge when step 4 runs)";
    const composeFormEl = document.querySelector("form.sdlc-form");
    const passStep2 =
      composeFormEl instanceof HTMLFormElement
        ? composeFormEl.querySelector('[name="passScore"]')
        : null;
    const passStep4 =
      composeFormEl instanceof HTMLFormElement
        ? composeFormEl.querySelector('[name="modulePassScore"]')
        : null;
    const passStep2Text =
      passStep2 instanceof HTMLInputElement ? passStep2.value : "70";
    const passStep4Text =
      passStep4 instanceof HTMLInputElement ? passStep4.value : "90";
    composeReview.innerHTML =
      "<dt>Folder</dt><dd>" +
      folder +
      "</dd>" +
      "<dt>Goal</dt><dd>" +
      goal +
      "</dd>" +
      "<dt>Prompt</dt><dd><span class=" +
      '"sdlc-compose-review-preview"' +
      ">" +
      prompt +
      "</span></dd>" +
      "<dt>Judge</dt><dd>" +
      judge +
      "</dd>" +
      "<dt>Improver</dt><dd>" +
      improver +
      "</dd>" +
      "<dt>Runner</dt><dd>" +
      runner +
      "</dd>" +
      "<dt>Step 2 pass</dt><dd>" +
      escapeComposeText(passStep2Text) +
      "</dd>" +
      "<dt>Step 4 pass</dt><dd>" +
      escapeComposeText(passStep4Text) +
      "</dd>" +
      "<dt>Est. tokens</dt><dd>" +
      escapeComposeText(String(readCostEstimate().targetTokenBudget)) +
      "</dd>" +
      "<dt>Est. spend</dt><dd>$" +
      escapeComposeText(readCostEstimate().estimatedSpendUsd.toFixed(4)) +
      "</dd>";
  };
  const COST_EARLY_TOKENS_PER_ROUND = 4000;
  const COST_PREVIEW_STEP4_MODULES = 2;
  const COST_STEP4_TOKENS_PER_MODULE_TRIAL = 8000;
  const COST_WIZARD_MAX_ROUNDS = 5;
  const COST_DEFAULT_RATE = 0.01;
  const COST_WRITER_RATES = {
    "claude-cli": 0.009,
    codex: 0.008,
    cursor: 0.01,
    "cursor-cloud": 0.01,
    antigravity: 0.01,
  };
  const resolveWriterRate = (writerId) => {
    const id = typeof writerId === "string" ? writerId.trim() : "";
    if (id.length === 0 || id === "manual") return COST_DEFAULT_RATE;
    const rate = COST_WRITER_RATES[id];
    return typeof rate === "number" ? rate : COST_DEFAULT_RATE;
  };
  const estimateSpendUsd = (tokens, rate) => {
    if (!Number.isFinite(tokens) || !Number.isFinite(rate) || tokens < 0 || rate < 0) {
      return 0;
    }
    return Math.round((tokens / 1000) * rate * 10000) / 10000;
  };
  const readCostEstimate = () => {
    const trialsInput = document.querySelector("[data-sdlc-max-trials]");
    const trialsRaw =
      trialsInput instanceof HTMLInputElement ? Number(trialsInput.value) : 1;
    const trials =
      Number.isInteger(trialsRaw) && trialsRaw >= 1 ? trialsRaw : 1;
    const judgeSelect = document.querySelector('[data-writer-select="judge"]');
    const writerId =
      judgeSelect instanceof HTMLSelectElement ? judgeSelect.value.trim() : "";
    const rate = resolveWriterRate(writerId);
    const earlyTokens = COST_WIZARD_MAX_ROUNDS * COST_EARLY_TOKENS_PER_ROUND;
    const step4Tokens =
      COST_PREVIEW_STEP4_MODULES * trials * COST_STEP4_TOKENS_PER_MODULE_TRIAL;
    const targetTokenBudget = earlyTokens + step4Tokens;
    return {
      targetTokenBudget,
      estimatedSpendUsd: estimateSpendUsd(targetTokenBudget, rate),
      rateUsdPer1kTokens: rate,
      writerId: writerId.length === 0 || writerId === "manual" ? "default" : writerId,
    };
  };
  const paintCostEstimate = () => {
    const estimateRoot = document.querySelector("[data-sdlc-cost-estimate]");
    if (!(estimateRoot instanceof HTMLElement)) return;
    const proposal = readCostEstimate();
    const tokensEl = estimateRoot.querySelector("[data-sdlc-target-tokens]");
    const spendEl = estimateRoot.querySelector("[data-sdlc-estimated-spend]");
    const rateChip = estimateRoot.querySelector("[data-sdlc-writer-rate-chip]");
    const tokensInput = document.querySelector(
      "[data-sdlc-target-token-budget-input]",
    );
    const spendInput = document.querySelector("[data-sdlc-estimated-spend-input]");
    const rateInput = document.querySelector("[data-sdlc-cost-rate]");
    const overEl = document.querySelector("[data-sdlc-estimate-over-ceiling]");
    const maxSpendInput = document.querySelector("[data-sdlc-max-spend-usd]");
    if (tokensEl instanceof HTMLElement) {
      tokensEl.textContent = proposal.targetTokenBudget.toLocaleString("en-US");
    }
    if (spendEl instanceof HTMLElement) {
      spendEl.textContent = "$" + proposal.estimatedSpendUsd.toFixed(4);
    }
    if (rateChip instanceof HTMLElement) {
      rateChip.textContent =
        "$" +
        proposal.rateUsdPer1kTokens.toFixed(4) +
        " / 1k \xB7 " +
        proposal.writerId;
      rateChip.dataset.writerId = proposal.writerId;
    }
    if (tokensInput instanceof HTMLInputElement) {
      tokensInput.value = String(proposal.targetTokenBudget);
    }
    if (spendInput instanceof HTMLInputElement) {
      spendInput.value = String(proposal.estimatedSpendUsd);
    }
    if (rateInput instanceof HTMLInputElement) {
      rateInput.value = String(proposal.rateUsdPer1kTokens);
    }
    if (overEl instanceof HTMLElement) {
      const spendRaw =
        maxSpendInput instanceof HTMLInputElement
          ? maxSpendInput.value.trim()
          : "";
      const ceiling = spendRaw.length === 0 ? null : Number(spendRaw);
      const over =
        ceiling !== null &&
        Number.isFinite(ceiling) &&
        proposal.estimatedSpendUsd > ceiling;
      overEl.hidden = !over;
    }
  };
  const paintComposeStepError = (message) => {
    if (!(composeStepError instanceof HTMLElement)) return;
    if (message === null || message.length === 0) {
      composeStepError.textContent = "";
      composeStepError.hidden = true;
      return;
    }
    composeStepError.textContent = message;
    composeStepError.hidden = false;
  };
  const validateComposeStep = (step) => {
    const compose = readComposeFields();
    if (step === 1) {
      if (compose.folder.length === 0) {
        return "Choose a folder path or use Choose folder\u2026";
      }
      return null;
    }
    if (step === 2) {
      if (!compose.hasGoal || !compose.hasPrompt) {
        return "Fill in the goal and the prompt before you continue.";
      }
      return null;
    }
    if (step === 3) {
      const judgeSelect = document.querySelector('[data-writer-select="judge"]');
      const improverSelect = document.querySelector('[data-writer-select="improver"]');
      const judge =
        judgeSelect instanceof HTMLSelectElement ? judgeSelect.value.trim() : "";
      const improver =
        improverSelect instanceof HTMLSelectElement
          ? improverSelect.value.trim()
          : "";
      if (judge.length === 0 || improver.length === 0) {
        return "Choose who scores and who rewrites the prompt.";
      }
      const pending = slots.find((slot) => slot.dataset.ready !== "true");
      if (pending) {
        const writer = pending.dataset.writer ?? "writer";
        if (pending.textContent === "Checking\u2026") {
          return "Checking that the chosen writers are ready\u2026";
        }
        if (pending.textContent.trim().length > 0) {
          return pending.textContent.trim();
        }
        return "Fix the writer error above, then continue.";
      }
      return null;
    }
    return null;
  };
  const showComposeStep = (step) => {
    const next = Math.min(COMPOSE_STEP_COUNT, Math.max(1, step));
    clearRunHint();
    composeStep = next;
    composeStepPanels.forEach((panel) => {
      if (!(panel instanceof HTMLElement)) return;
      const panelStep = Number(panel.dataset.sdlcComposeStep ?? "0");
      panel.hidden = panelStep !== next;
    });
    composeStepperItems.forEach((item) => {
      if (!(item instanceof HTMLElement)) return;
      const itemStep = Number(item.dataset.sdlcStepperItem ?? "0");
      if (itemStep === next) {
        item.setAttribute("aria-current", "step");
      } else {
        item.removeAttribute("aria-current");
      }
    });
    paintComposeStepError(null);
    paintCostEstimate();
    if (next === COMPOSE_STEP_COUNT) {
      paintComposeReview();
      paintReady();
      document.getElementById("sdlc-compose-step-4")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };
  const readComposeFields = () => {
    const form = document.querySelector("form.sdlc-form");
    if (!(form instanceof HTMLFormElement)) {
      return {
        hasGoal: false,
        hasPrompt: false,
        goal: "",
        prompt: "",
        folder: "",
        judge: "",
      };
    }
    const goal = form.querySelector('[name="goal"]');
    const prompt = form.querySelector('[name="prompt"]');
    const folder = form.querySelector('[name="folder"]');
    const judgeSelect = form.querySelector('[data-writer-select="judge"]');
    const goalText = goal instanceof HTMLTextAreaElement ? goal.value : "";
    const promptText = prompt instanceof HTMLTextAreaElement ? prompt.value : "";
    const goalTrim = goalText.trim();
    const promptTrim = promptText.trim();
    const folderText = folder instanceof HTMLInputElement ? folder.value.trim() : "";
    const judgeText =
      judgeSelect instanceof HTMLSelectElement ? judgeSelect.value.trim() : "";
    return {
      hasGoal: goalTrim.length > 0,
      hasPrompt: promptTrim.length > 0,
      goal: goalTrim,
      prompt: promptTrim,
      folder: folderText,
      judge: judgeText,
    };
  };
  const paintReady = () => {
    const fields = document.querySelector(".sdlc-fields");
    const fieldsDisabled =
      fields instanceof HTMLFieldSetElement && fields.disabled;
    const compose = readComposeFields();
    if (runButton instanceof HTMLButtonElement) {
      const writersReady = slots.every((slot) => slot.dataset.ready === "true");
      const canRun =
        !fieldsDisabled &&
        compose.hasGoal &&
        compose.hasPrompt &&
        writersReady;
      runButton.dataset.canRun = canRun ? "true" : "false";
      if (fieldsDisabled) {
        if (runButton.dataset.sdlcRunState === "waiting") {
          paintRunButtonWaiting();
        } else {
          paintRunButton(true);
        }
      } else {
        runButton.disabled = false;
        paintRunButton(false);
      }
    }
    paintRunHint();
    paintWriterSummary();
  };
  const paintWriterSummary = () => {
    const summary = document.querySelector("[data-sdlc-writer-summary]");
    const compose = document.getElementById("prompt-optimizer-compose");
    if (compose instanceof HTMLElement) {
      compose.classList.toggle("sdlc-compose-viewing-result", viewingFinishedRun);
    }
    if (!(summary instanceof HTMLElement)) return;
    const blocked = slots.filter(
      (slot) =>
        slot.dataset.ready !== "true" &&
        slot.classList.contains("alert-error"),
    );
    if (viewingFinishedRun) {
      const anyWarn = slots.some(
        (slot) =>
          slot.classList.contains("alert-warn") ||
          slot.classList.contains("alert-error"),
      );
      if (anyWarn) {
        summary.hidden = false;
        summary.className = "alert-warn sdlc-writer-summary";
        summary.textContent =
          "Writers were not verified for this finished run. Check CLI login before your next run.";
        return;
      }
    } else if (blocked.length > 0) {
      summary.hidden = false;
      summary.className = "alert-error sdlc-writer-summary";
      summary.textContent =
        blocked[0].textContent?.trim() ||
        "Fix the writer error above, then run again.";
      return;
    }
    summary.hidden = true;
    summary.textContent = "";
    summary.className = "sdlc-writer-summary";
    if (composeStep === COMPOSE_STEP_COUNT) paintComposeReview();
  };
  const paintWriter = async (writer) => {
    const targets = slots.filter((slot) => slot.dataset.writer === writer);
    if (writer.length === 0) {
      targets.forEach((slot) => {
        slot.textContent = "Choose who does this step.";
        slot.dataset.ready = "false";
        slot.className = "muted";
      });
      paintReady();
      return;
    }
    if (writer === "manual") {
      targets.forEach((slot) => {
        slot.textContent = "You will do this step.";
        slot.dataset.ready = "true";
        slot.className = "muted";
      });
      paintReady();
      return;
    }
    if (staticPreview) {
      targets.forEach((slot) => {
        slot.textContent = "Writer check skipped (static preview).";
        slot.dataset.ready = "true";
        slot.className = "muted";
      });
      paintReady();
      return;
    }
    targets.forEach((slot) => {
      slot.textContent = "Checking\u2026";
      slot.dataset.ready = "false";
    });
    paintReady();
    const url = "/prompt-optimizer?writer-check=" + encodeURIComponent(writer);
    const response = await fetch(url, { cache: "no-store" }).catch(() => null);
    const body = response === null || !response.ok ? null : await response.json().catch(() => null);
    const message = body && typeof body.message === "string" ? body.message : "The writer did not reply.";
    const ok = body !== null && body.ok === true;
    targets.forEach((slot) => {
      slot.textContent = message;
      if (viewingFinishedRun && !ok) {
        slot.dataset.ready = "true";
        slot.className = "alert-warn";
        return;
      }
      slot.dataset.ready = ok ? "true" : "false";
      slot.className = ok ? "muted" : "alert-error";
    });
    paintReady();
  };
  const rememberSelection = () => {
    const form = document.querySelector("form.sdlc-form");
    if (!(form instanceof HTMLFormElement)) return;
    const fields = form.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement && fields.disabled) return;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => {
      if (typeof value === "string") body.append(key, value);
    });
    body.set("intent", "remember");
    void fetch("/prompt-optimizer", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      cache: "no-store",
    }).catch(() => null);
  };
  const syncRunnerFromJudge = () => {
    const judgeSelect = document.querySelector('[data-writer-select="judge"]');
    const runnerSelect = document.querySelector('[data-writer-select="runner"]');
    if (!(judgeSelect instanceof HTMLSelectElement)) return;
    if (!(runnerSelect instanceof HTMLSelectElement)) return;
    if (runnerSelect.value.length > 0) return;
    if (judgeSelect.value.length === 0 || judgeSelect.value === "manual") return;
    runnerSelect.value = judgeSelect.value;
    const slot = document.querySelector('[data-writer-status="runner"]');
    if (slot instanceof HTMLElement) slot.dataset.writer = judgeSelect.value;
    void paintWriter(judgeSelect.value);
  };
  document.querySelectorAll("[data-writer-select]").forEach((select) => {
    select.addEventListener("change", () => {
      clearRunHint();
      rememberSelection();
      const slot = document.querySelector('[data-writer-status="' + select.dataset.writerSelect + '"]');
      if (!slot) return;
      slot.dataset.writer = select.value;
      if (select instanceof HTMLSelectElement && select.dataset.writerSelect === "judge") {
        syncRunnerFromJudge();
      }
      void paintWriter(select.value);
    });
  });
  syncRunnerFromJudge();
  const folderInput = document.querySelector('form.sdlc-form [name="folder"]');
  if (folderInput instanceof HTMLInputElement) {
    folderInput.addEventListener("change", rememberSelection);
    folderInput.addEventListener("blur", rememberSelection);
    folderInput.addEventListener("input", () => {
      clearRunHint();
      paintReady();
    });
  }
  const composeForm = document.querySelector("form.sdlc-form");
  const goalInput = document.querySelector('form.sdlc-form [name="goal"]');
  const promptInput = document.querySelector('form.sdlc-form [name="prompt"]');
  composeForm?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const chip = target.closest("[data-sdlc-goal-preset]");
    if (!(chip instanceof HTMLButtonElement)) return;
    const preset = chip.dataset.sdlcGoalPreset?.trim() ?? "";
    if (preset.length === 0) return;
    const goal =
      composeForm?.querySelector('[name="goal"]') ?? goalInput;
    if (!(goal instanceof HTMLTextAreaElement)) return;
    goal.value = preset;
    paintComposeStepError(null);
    goal.dispatchEvent(new Event("input", { bubbles: true }));
    goal.focus();
  });
  if (goalInput instanceof HTMLTextAreaElement) {
    goalInput.addEventListener("input", () => {
      clearRunHint();
      paintReady();
      if (composeStep === COMPOSE_STEP_COUNT) paintComposeReview();
    });
  }
  if (promptInput instanceof HTMLTextAreaElement) {
    promptInput.addEventListener("input", () => {
      clearRunHint();
      paintReady();
      if (composeStep === COMPOSE_STEP_COUNT) paintComposeReview();
    });
  }
  const refreshCostEstimate = () => {
    paintCostEstimate();
    if (composeStep === COMPOSE_STEP_COUNT) paintComposeReview();
  };
  document
    .querySelectorAll(
      "[data-sdlc-max-trials], [data-sdlc-max-spend-usd], [data-writer-select='judge']",
    )
    .forEach((node) => {
      node.addEventListener("input", refreshCostEstimate);
      node.addEventListener("change", refreshCostEstimate);
    });
  document.querySelectorAll("[data-sdlc-compose-continue]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const reason = validateComposeStep(composeStep);
      if (reason !== null) {
        paintComposeStepError(reason);
        return;
      }
      showComposeStep(composeStep + 1);
    });
  });
  document.querySelectorAll("[data-sdlc-compose-back]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showComposeStep(composeStep - 1);
    });
  });
  document.querySelectorAll("[data-sdlc-compose-skip-to-summary]").forEach((btn) => {
    btn.addEventListener("click", () => {
      paintComposeStepError(null);
      showComposeStep(COMPOSE_STEP_COUNT);
    });
  });
  [...new Set(slots.map((slot) => slot.dataset.writer))].forEach((writer) => {
    if (writer) void paintWriter(writer);
  });
  const closeFieldTips = () => {
    document.querySelectorAll(".sdlc-tip[aria-expanded='true']").forEach((btn) => {
      if (btn instanceof HTMLButtonElement) btn.setAttribute("aria-expanded", "false");
    });
  };
  document.querySelectorAll(".sdlc-tip").forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    const open = () => {
      closeFieldTips();
      btn.setAttribute("aria-expanded", "true");
    };
    btn.addEventListener("focus", open);
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        btn.setAttribute("aria-expanded", "false");
      } else {
        open();
      }
    });
    btn.addEventListener("blur", () => btn.setAttribute("aria-expanded", "false"));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFieldTips();
  });
  document.querySelectorAll("[data-sdlc-start-new-run], [data-sdlc-rerun-same]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const details = document.getElementById("prompt-optimizer-compose-details");
      if (details instanceof HTMLDetailsElement) details.open = true;
      showComposeStep(1);
      document.getElementById("prompt-optimizer-compose")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
  const form = document.querySelector("form.sdlc-form");
  if (form instanceof HTMLFormElement) {
    form.addEventListener(
      "submit",
      (event) => {
        const submitter = event.submitter;
        if (!(submitter instanceof HTMLButtonElement)) return;
        if (!submitter.hasAttribute("data-sdlc-run-wizard")) return;
        const reason = readRunBlockReason();
        if (composeStep !== COMPOSE_STEP_COUNT) {
          event.preventDefault();
          event.stopImmediatePropagation();
          showComposeStep(COMPOSE_STEP_COUNT);
          paintComposeStepError(
            "Review the summary on step 4 before you run.",
          );
          return;
        }
        if (reason !== null) {
          event.preventDefault();
          event.stopImmediatePropagation();
          showRunBlockHint = true;
          paintRunHint();
          paintWriterSummary();
          document.querySelector("[data-sdlc-submit-bar]")?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
          submitter.focus({ preventScroll: true });
          return;
        }
        const run = document.getElementById("prompt-optimizer-run");
        if (run !== null) {
          const details = document.getElementById("prompt-optimizer-compose-details");
          if (details instanceof HTMLDetailsElement) {
            details.open = false;
          }
          document
            .getElementById("prompt-optimizer-compose")
            ?.classList.add("sdlc-compose-run-started");
          setComposeHeadActionsHidden(true);
          document.querySelectorAll(".sdlc-compose-step-actions").forEach((node) => {
            if (node instanceof HTMLElement) {
              node.hidden = true;
            }
          });
          run.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
      true,
    );
  }
  const composeRoot = document.getElementById("prompt-optimizer-compose");
  if (composeRoot?.classList.contains("sdlc-compose-viewing-finished")) {
    showComposeStep(COMPOSE_STEP_COUNT);
  } else {
    showComposeStep(1);
  }
  paintCostEstimate();
  paintReady();
  document.addEventListener("sdlc-run-start-failed", revertRunStartUi);
  document.addEventListener("sdlc-run-finished", () => {
    const gateSlot = document.getElementById("prompt-optimizer-wizard-gate-slot");
    const atWizardGate =
      gateSlot !== null && gateSlot.innerHTML.trim().length > 0;
    if (!atWizardGate) {
      const fields = document.querySelector(".sdlc-fields");
      if (fields instanceof HTMLFieldSetElement) fields.disabled = false;
      document.querySelector("[data-sdlc-locked]")?.remove();
      const compose = document.getElementById("prompt-optimizer-compose");
      compose?.classList.remove("sdlc-compose-run-focus");
      compose?.classList.remove("sdlc-compose-run-started");
      document.querySelectorAll(".sdlc-compose-step-actions").forEach((node) => {
        if (node instanceof HTMLElement) {
          node.hidden = false;
        }
      });
      setComposeHeadActionsHidden(false);
      const details = document.getElementById("prompt-optimizer-compose-details");
      if (details instanceof HTMLDetailsElement) {
        details.open = document.getElementById("prompt-optimizer-run") === null;
      }
      showComposeStep(COMPOSE_STEP_COUNT);
      paintRunButton(false);
      paintReady();
    }
  });
})();
</script>`});var DJ,HJ=a(()=>{"use strict";DJ=`<script>
(() => {
  const globalKey = "__promptSdlcWizardAccordionDom";
  const existing = window[globalKey];
  if (existing !== undefined && existing !== null) return;

  const userOpenSteps = new Set();

  const readOpenWizardAccordionSteps = () => {
    const open = new Set(userOpenSteps);
    document
      .querySelectorAll("[data-sdlc-wizard-accordion-step]")
      .forEach((node) => {
        if (!(node instanceof HTMLDetailsElement) || !node.open) return;
        const stepId = node.dataset.sdlcWizardAccordionStep;
        if (typeof stepId === "string" && stepId.length > 0) open.add(stepId);
      });
    return open;
  };

  const restoreOpenWizardAccordionSteps = (openIds, root = document) => {
    openIds.forEach((stepId) => {
      const node = root.querySelector(
        \`[data-sdlc-wizard-accordion-step="\${stepId}"]\`,
      );
      if (node instanceof HTMLDetailsElement) {
        node.open = true;
        userOpenSteps.add(stepId);
      }
    });
  };

  document.addEventListener(
    "toggle",
    (event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement)) return;
      if (!target.hasAttribute("data-sdlc-wizard-accordion-step")) return;
      const stepId = target.dataset.sdlcWizardAccordionStep;
      if (typeof stepId !== "string" || stepId.length === 0) return;
      if (target.open) userOpenSteps.add(stepId);
      else userOpenSteps.delete(stepId);
    },
    true,
  );

  window[globalKey] = {
    readOpen: readOpenWizardAccordionSteps,
    restoreOpen: restoreOpenWizardAccordionSteps,
  };
})();
</script>`});var FJ,$J=a(()=>{"use strict";I();ft();FJ=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Mt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(be(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!v(t.status)}}});var zJ,UJ=a(()=>{"use strict";zJ=`<script>
(() => {
  const list = document.querySelector(".sdlc-history");
  if (!(list instanceof HTMLUListElement)) return;
  const items = [...list.querySelectorAll("[data-sdlc-history-kind]")];
  const buttons = [...document.querySelectorAll("[data-sdlc-history-filter]")];
  const apply = (kind) => {
    items.forEach((item) => {
      if (!(item instanceof HTMLLIElement)) return;
      const itemKind = item.dataset.sdlcHistoryKind ?? "legacy";
      item.hidden = kind !== "all" && itemKind !== kind;
    });
    buttons.forEach((button) => {
      if (!(button instanceof HTMLButtonElement)) return;
      button.setAttribute(
        "aria-pressed",
        button.dataset.sdlcHistoryFilter === kind ? "true" : "false",
      );
    });
  };
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const kind = button.dataset.sdlcHistoryFilter ?? "all";
      apply(kind);
    });
  });
  apply("all");
})();
</script>`});var BJ,GJ=a(()=>{"use strict";I();yp();hP();BJ=e=>{let t=ml(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:v(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=xo(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=me(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=me(e.wizard),n=o.rows.reduce((i,l)=>l.bestScore===null?i:i===null?l.bestScore:Math.min(i,l.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return v(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var KJ,VJ=a(()=>{"use strict";KJ=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Wo,Nue,Due,qJ,JJ=a(()=>{"use strict";GJ();VJ();fp();Wo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nue=e=>e.wizard===void 0?"legacy":"wizard",Due=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Wo(t)}">`,o=BJ(e),n=KJ(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,l=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Wo(o.badgeClass)}">${Wo(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Wo(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Wo(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${Nue(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Wo(e.id)}">${Wo(Io(e.goal))}</a><p class="muted">${Wo(l)}</p></div></div><div class="sdlc-history-row-actions">${u}${g}</div></li>`},qJ=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(l=>Due(l,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Wo(s)}</summary>${i}</details>`:i}});var VI,xP,YJ,Hue,Fue,bp,XJ,WP=a(()=>{"use strict";VI=m(require("node:fs")),xP=m(require("node:path"));ft();YJ=/^[a-z0-9-]+$/,Hue=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},Fue=(e,t)=>{if(!YJ.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let l=r.indexOf(`
---`,3);if(l!==-1){let c=r.slice(3,l);s=r.slice(l+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let g=Hue(u[2]??"");u[1]==="name"&&g.length>0&&(o=g),u[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},bp=e=>{let t=Co(e);if(!t.ok)return[];let r=xP.default.resolve(t.path,".cursor","skills"),o=[];try{o=VI.default.readdirSync(r)}catch{return[]}return o.filter(n=>YJ.test(n)).flatMap(n=>{let s=xP.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${xP.default.sep}`))return[];try{let i=Fue(VI.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},XJ=(e,t)=>bp(e).find(r=>r.fileName===t)??null});var ZJ,$ue,QJ,e4,t4=a(()=>{"use strict";Ln();ZJ=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$ue=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),QJ=e=>{if(e.length===0)return`<div class="field">${Le("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${ZJ(r.fileName)}">${ZJ(r.fileName)}</option>`).join("");return`<div class="field">${Le("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${$ue(e)}</script>`},e4=`<script>
(() => {
  const select = document.querySelector("[data-skill-select]");
  const catalog = document.getElementById("prompt-optimizer-skill-catalog");
  if (!(select instanceof HTMLSelectElement) || catalog === null) return;
  let skills = [];
  try {
    skills = JSON.parse(catalog.textContent || "[]");
  } catch {
    skills = [];
  }
  const orchestratorInput = document.querySelector("[data-orchestrator-skill-file]");
  const orchestratorNote = document.querySelector("[data-orchestrator-skill-note]");
  const paintOrchestratorNote = (fileName) => {
    if (!(orchestratorNote instanceof HTMLElement)) return;
    if (typeof fileName !== "string" || fileName.length === 0) {
      orchestratorNote.textContent = "";
      orchestratorNote.hidden = true;
      return;
    }
    orchestratorNote.textContent =
      "Orchestrator skill: " +
      fileName +
      ". The prompt may change in Step 2 evaluate; this skill keeps the orchestrator role.";
    orchestratorNote.hidden = false;
  };
  const setOrchestratorFile = (fileName) => {
    if (orchestratorInput instanceof HTMLInputElement) {
      orchestratorInput.value = fileName;
    }
    paintOrchestratorNote(fileName);
  };
  select.addEventListener("change", () => {
    const skill = skills.find((item) => item.fileName === select.value);
    const prompt = document.querySelector('textarea[name="prompt"]');
    if (!(prompt instanceof HTMLTextAreaElement) || skill === undefined) return;
    if (typeof skill.promptText !== "string") return;
    prompt.value = skill.promptText;
    prompt.dispatchEvent(new Event("input"));
    setOrchestratorFile(select.value);
  });
  if (select.value.length > 0) {
    setOrchestratorFile(select.value);
  }
})();
</script>`});var bt,r4,o4=a(()=>{"use strict";I();_P();op();Ln();bt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r4=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=bt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,l=Ys({maxRounds:i,maxTrials:r,writerId:s}),c=l.rateUsdPer1kTokens??Vt(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),g=sP({estimatedSpendUsd:l.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",f=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${bt(re.knobsSectionTitle)}</p>
  <p class="muted">${bt(re.knobsSectionLede)}</p>
  <div class="field">
    ${Le(re.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${Le(re.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${bt(re.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${bt(re.earlyStopLabel)}</span>
    </label>
    <p class="muted">${bt(re.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${bt(re.estimateSectionTitle)}</p>
    <p class="muted">${bt(re.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${bt(re.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${l.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${bt(re.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${l.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${bt(re.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${bt(f)}">$${c.toFixed(4)} / 1k \xB7 ${bt(f)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${l.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${l.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${g}>${bt(re.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var st,n4,s4,zue,i4,a4,l4,c4=a(()=>{"use strict";I();CI();He();fp();yp();st=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n4=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s4=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,zue=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},i4=e=>e===M?"You":_e(e),a4=e=>{let t=zue(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":_e(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${st(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${st(t)}</dd></div>
      <div><dt>Judge</dt><dd>${st(i4(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${st(i4(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${st(r)}</dd></div>
    </dl>
  </details>`},l4=e=>{let t=e.wizard;if(t===void 0)return"";let r=Io(e.goal),o=e.status==="wizard_paused",n=!v(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=PP(e),g=s4(t),f=g===null?"":n4(g),y=xo(e),A=f.length===0?"":y===null||y>=4?` <strong>${st(f)}</strong>`:` <strong>${st(f)}</strong> (step ${y+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${st(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${st(u.title)}${A}</p>
    <p class="muted">${st(u.detail)}</p>
    <div class="actions">
      ${a4(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${st(e.id)}">Open this run</a>
    </div>
  </section>`}let s=s4(t),i=s===null?"Wizard":n4(s),l=xo(e),c=l===null||l>=4?"":` (step ${l+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${st(r)}</h2>
    <p class="lede">Paused at <strong>${st(i)}</strong>${st(c)} (last updated ${st(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${a4(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${st(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var _p,d4,u4=a(()=>{"use strict";Ln();_p=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d4=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${_p(n.id)}"${n.id===e.runner?" selected":""}>${_p(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${_p(e.runner)}">Checking ${_p(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Le("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Le("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${_p(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var p4,m4=a(()=>{"use strict";p4=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var fl,g4,f4,y4,h4,S4=a(()=>{"use strict";Ln();fl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g4=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${fl(c.id)}"${c.id===r?" selected":""}>${fl(c.label)}</option>`).join(""),l=`<option value="manual"${r==="manual"?" selected":""}>${fl(n)}</option>`;return`<div class="field">${Le(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${l}</select></div>`},f4=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${fl(t)}">Checking ${fl(o)}\u2026</p>`},y4=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Le(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${fl(r)}</textarea><span class="muted">${o}</span></div></details>`,h4=e=>{let t=`<div class="sdlc-writer">${g4("judge","Judge",e.judge,e.writers,"I'll score it")}${f4("judge",e.judge,e.writers)}${y4("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${g4("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${f4("improver",e.improver,e.writers)}${y4("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var P4,A4=a(()=>{"use strict";P4=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var kp,Uue,OP,qI=a(()=>{"use strict";A4();kp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Uue=(e,t)=>{let r=kp(e.goal),o=kp(e.label);return t===void 0?`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${r}" title="${r}">${o}</button>`:`<button type="submit" class="sdlc-goal-preset-chip" name="${kp(t)}" value="${r}" title="${r}">${o}</button>`},OP=(e={})=>{let t=e.presets??P4,r=e.groupLabel??"Common goals",o=e.leadLabel??"Quick fill:",n=t.map(s=>Uue(s,e.submitName)).join("");return`<div class="sdlc-goal-presets" role="group" aria-label="${kp(r)}"><span class="sdlc-goal-presets-label muted">${kp(o)}</span>${n}</div>`}});var Rp,Bue,Gue,JI,b4=a(()=>{"use strict";I();Ln();Rp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bue=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},Gue=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,JI=e=>{let t=Bue(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Iu(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,l=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${Le(e.label,e.fieldTipKey,l)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Rp(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Rp(e.inputId)}" class="sdlc-pass-range" type="range" name="${Rp(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Rp(l)}"><span class="sdlc-pass-mark" style="left:${Gue(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Rp(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var Vue,YI,Oo,XI,ZI=a(()=>{"use strict";mp();MI();WJ();MJ();XS();NJ();HJ();$J();UJ();JJ();WP();t4();Ln();FI();o4();c4();fp();u4();m4();S4();I();qI();b4();Vue=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,YI='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Oo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XI=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Oo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Oo(e.skillNotice??"")}</div>`,o=`${i5}${a5}`,n=e.resumableWizardCycle??null,s=n===null?"":l4(n),i=wP(e.cycle),l=e.cycle===null?"":RP(e.cycle),c=e.cycle!==null&&Qr(e.cycle),d=FJ(e),u=Vue(d.goal,d.prompt,e.canRun),g=h4({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),f=d4({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y=`${JI({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${JI({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,A=r4({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),P=gL,S=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",p=e.cycle!==null&&v(e.cycle.status),b=d.running&&!p,C=p||b?"":" open",h=b?" sdlc-compose-run-focus":"",R=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${p?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,E=p?(()=>{let N=e.cycle!==null?Io(e.cycle.goal):Io(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Oo(N)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${R}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${R}</summary>`,T=p?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",W=c?"waiting":d.running?"running":"idle",z=d.running&&!c?' aria-busy="true"':"",O=`<section class="card sdlc-compose${T}${h}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${C}>
        ${E}
        <div class="sdlc-compose-details-body">
      <p class="lede">${P} ${Oo(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${S}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${Le("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Oo(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${QJ(bp(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${YI}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Le("Goal","goal")}
            ${OP()}
            <textarea class="input textarea" name="goal" rows="4" required>${Oo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Le("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Oo(d.prompt)}</textarea>
          </div>
          ${y}
          ${A}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${YI}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="3" id="sdlc-compose-step-3" hidden>
          <h3 class="sdlc-compose-step-title">CLI</h3>
          <p class="muted sdlc-compose-step-lede">Pick who scores, who rewrites, and who runs wizard step 4 modules.</p>
          <div class="sdlc-block sdlc-block-flush">
          <p class="sdlc-block-title">Judge and improver</p>
          ${g}
        </div>
        ${f}
        ${p4()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${YI}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="4" id="sdlc-compose-step-4" hidden>
          <h3 class="sdlc-compose-step-title">Summary</h3>
          <p class="muted sdlc-compose-step-lede">Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Check these settings, then start.</p>
          <dl class="sdlc-compose-review" data-sdlc-compose-review></dl>
          <div class="sdlc-submit-bar" data-sdlc-submit-bar>
          <p class="sdlc-writer-summary" data-sdlc-writer-summary hidden></p>
          <p class="muted sdlc-run-hint" data-sdlc-run-hint role="status" hidden></p>
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Oo(d.passScore)}; Step 4 pass \u2265 ${Oo(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${W}" data-can-run="${u?"true":"false"}"${z}${d.running?" disabled":""}>${x}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,U=e.history.length>0?zJ:"",he=`${""}${DJ}${xJ}${OJ}${jJ}${e4}${U}`;return`${t}${r}${O}${s}${l}${i}${o}${qJ(e.history,e.cycle?.id??null)}${he}`}});var Ep,QI=a(()=>{"use strict";ZI();Ep=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:XI(t)}))}});var _4,k4=a(()=>{"use strict";vJ();Ap();QI();jt();ci();_4=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:IJ({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=ie(e.storePath,o.cycleId);return Fe(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(vn(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await Ep(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Xr(e.storePath),resumableWizardCycle:null}),!0)}});var R4,MP,ev=a(()=>{"use strict";I();R4=m(require("node:os")),MP=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??R4.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??Kt()}}});var E4,yl,tv,w4,T4,wp=a(()=>{"use strict";I();He();aI();E4=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,yl=e=>{let t=OV(e),r=Qs(e).map(s=>({id:s,label:HS[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},tv=(e,t,r)=>t===M||t!==null&&e.writers.some(o=>o.id===t)?t:r,w4=(e,t,r,o=null)=>({judge:tv(e,t,e.judge),improver:tv(e,r,e.improver),runner:tv(e,o,e.runner)}),T4=e=>e===ZS?{goal:QS,prompt:eP}:{goal:"",prompt:""}});var rv,C4=a(()=>{"use strict";rv=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var L4,que,I4,v4,x4,W4=a(()=>{"use strict";I();L4=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},que=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},I4=(e,t)=>e.has("earlyStop")?!0:t!=="run",v4=e=>{let t=L4(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=que(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=L4(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},x4=e=>Kt(e)});var O4,M4,jP,ov=a(()=>{"use strict";I();He();ft();wp();C4();W4();O4=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=rv(o);return n.ok?String(n.passScore):String(r)},M4=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return rv(n)},jP=e=>{let t=w4(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=O4(e.posted,"passScore",70),o=O4(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",l=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",g=e.posted?.get("intent")??"",f=e.posted===null?!0:I4(e.posted,g),y=(E,T)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:E,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:T,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:l,maxTrials:d,maxSpendUsd:u,earlyStop:f});if(e.posted===null)return y(e.defaultFolder??ei,null);let A=e.posted.get("folder")??ei;if(e.posted.get("intent")==="choose-folder"){let E=e.pickFolder();return y(E===null?A:Mt(E),null)}if((e.posted.get("intent")??"")!=="run")return y(A,null);let S=E4(e.goal,e.prompt);if(S!==null)return y(A,S);let p=M4(e.posted,"passScore",r);if(!p.ok)return y(A,p.errorMessage);let b=M4(e.posted,"modulePassScore",o);if(!b.ok)return y(A,b.errorMessage);let C=MV(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(C===null)return y(A,"Choose a judge and an improver.");let h=Co(A);if(!h.ok)return y(A,h.errorMessage);let _=jV(e.installedIds,c,C.judge);if(_===null)return y(A,"Choose a runner for wizard step 4.");let R=v4({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return R.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:C.judge,improver:C.improver,workingDirectory:h.path,passScore:p.passScore,modulePassScore:b.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:_,runnerInstructions:l,costControls:x4(R.knobs)}:y(A,R.errorMessage)}});var hl,DP,Jue,nv,j4,NP,N4,Yue,D4,sv,Xue,Zue,Que,iv,H4,F4,$4=a(()=>{"use strict";hl=m(require("node:fs")),DP=m(require("node:path"));He();ft();Jue=["remember","choose-folder","run"],nv=()=>({folder:ei,judge:"",improver:"",runner:""}),j4=e=>DP.default.join(DP.default.dirname(e),"prompt-optimizer-preferences.json"),NP=e=>typeof e=="string"?e:"",N4=e=>{let t=j4(e);if(!hl.default.existsSync(t))return nv();try{let r=JSON.parse(hl.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return nv();let o=r,n=NP(o.folder).trim();return{folder:n.length===0?ei:n,judge:NP(o.judge),improver:NP(o.improver),runner:NP(o.runner)}}catch{return nv()}},Yue=(e,t)=>{let r=j4(e);hl.default.mkdirSync(DP.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;hl.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),hl.default.renameSync(o,r)},D4=(e,t)=>e===M||Qs(t).some(r=>r===e),sv=(e,t,r)=>e===null?t:e.length===0?"":D4(e,r)?e:t,Xue=(e,t)=>{if(e===null)return t;let r=Co(e);return r.ok?r.display:t},Zue=e=>{let t=N4(e.storePath),r={folder:Xue(e.folder,t.folder),judge:sv(e.judge,t.judge,e.installedIds),improver:sv(e.improver,t.improver,e.installedIds),runner:sv(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Yue(e.storePath,r)},Que=e=>{let t=Co(e);return t.ok?t.display:ei},iv=(e,t)=>D4(e,t)?e:"",H4=e=>{let t=N4(e.storePath);return{selection:{...e.selection,judge:iv(t.judge,e.installedIds)||e.selection.judge,improver:iv(t.improver,e.installedIds)||e.selection.improver,runner:iv(t.runner,e.installedIds)||e.selection.runner},defaultFolder:Que(t.folder)}},F4=e=>{let t=e.posted.get("intent")??"";if(!Jue.includes(t))return;let r=e.posted.get("folder");Zue({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var z4,epe,tpe,av,rpe,HP,FP=a(()=>{"use strict";z4=m(require("node:os"));He();UI();ni();epe="Reply with the single word ok. Do not use tools.",tpe=45e3,av=async(e,t)=>{if(t===M)return{ok:!0,message:"You will do this step."};let r=hJ(e,t);if(r!==null)return{ok:!0,message:r};let o=await Pt({writerAgent:t,prompt:epe,workingDirectory:z4.default.tmpdir(),timeoutMs:tpe});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${_e(t)} is ready.`;return SJ(e,t,n),{ok:!0,message:n}},rpe=e=>[...new Set(e.filter(t=>t.length>0))],HP=async(e,t,r,o)=>{for(let n of rpe([t,r,o??""])){let s=await av(e,n);if(!s.ok)return s.message}return null}});var lv,U4=a(()=>{"use strict";I();lv=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!v(r.status)&&!(t!==null&&r.id===t))return r;return null}});var B4,G4=a(()=>{"use strict";xt();I();op();Ap();ev();ov();QI();jt();ft();$4();WP();FP();U4();EP();ci();B4=async e=>{let t=e.posted===null?H4({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=jP({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>hn("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(F4({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Mt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await HP(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await Ep(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Mt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Xr(e.route.storePath),resumableWizardCycle:lv(Xr(e.route.storePath),null)});return}if(r.kind==="start"){let s=XJ(r.workingDirectory,r.sourceSkillFile),i=nP(rl({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),l=MP({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:wL({...Mu(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(B(e.route.storePath,l),Fe(e.route.storePath,l.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":l.id}),e.route.response.end(vn(e.route.storePath,l));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(l.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:ie(e.route.storePath,e.cycleId);n!==null&&(n=ai(e.route.storePath,n),Fe(e.route.storePath,n.id)),await Ep(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Xr(e.route.storePath),resumableWizardCycle:lv(Xr(e.route.storePath),n?.id??null)})}});var K4,V4=a(()=>{"use strict";jt();K4=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";g5(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var q4,J4=a(()=>{"use strict";q4=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let l=/name="([^"]+)"/.exec(i);if(l===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(l[1],d)}return n}return new URLSearchParams(t)}});var Y4,X4=a(()=>{"use strict";b5();CJ();k4();G4();V4();wp();J4();ci();Y4=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await IP(),o=yl(r),n=e.method==="POST"?q4(e.request.headers["content-type"],await e.readBody(e.request)):null;if(TJ({posted:n,storePath:e.storePath,response:e.response})||await _4(e,n,o))return;let s=T4(t.searchParams.get("example")),i=K4({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let l=A5({posted:n,storePath:e.storePath});if(l.kind==="redirect"){e.response.writeHead(303,{Location:l.location}),e.response.end();return}await B4({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:P5(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var ope,Z4,Q4=a(()=>{"use strict";I();jt();ope=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",Z4=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=ie(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!v(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=TL({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${ope(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var eY,tY=a(()=>{"use strict";Ap();jt();eY=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:ie(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":vn(e.storePath,o)),!0}});var npe,rY,oY=a(()=>{"use strict";He();FP();npe=["claude-cli","codex","cursor","antigravity"],rY=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===M||npe.includes(t)?await av(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var nY,sY=a(()=>{"use strict";I();nY=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:xu,page:Wu,context:Xa,installedWriters:e,post:{method:"POST",url:xu,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this computer",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${xu}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var $P,iY=a(()=>{"use strict";I();OI();al();$P=e=>{let t=e.revisions[e.revisions.length-1]??null,r=we(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=v(e.status),n=e.errorKind??null,s=kP({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Lo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Xa,page:`${Wu}?cycle=${encodeURIComponent(e.id)}`}}});var Y,spe,aY,lY,cY=a(()=>{"use strict";Y=m(Ni());I();spe=(0,Y.isType)({goal:Y.isString,prompt:Y.isString,workingDirectory:Y.isString,judge:(0,Y.isUndefinedOr)(Y.isString),improver:(0,Y.isUndefinedOr)(Y.isString),passScore:(0,Y.isUndefinedOr)(Y.isNumber),maxRounds:(0,Y.isUndefinedOr)(Y.isNumber),maxTrials:(0,Y.isUndefinedOr)(Y.isNumber),maxSpendUsd:(0,Y.isUndefinedOr)(Y.isNumber),earlyStop:(0,Y.isUndefinedOr)(Y.isBoolean),earlyStopFlatRounds:(0,Y.isUndefinedOr)(Y.isNumber),confirmedTokenBudget:(0,Y.isUndefinedOr)(Y.isNumber),confirmedMaxSpendUsd:(0,Y.isUndefinedOr)(Y.isNumber),rateUsdPer1kTokens:(0,Y.isUndefinedOr)(Y.isNumber)}),aY=e=>{let t=e?.trim()??"";return t.length===0?null:t},lY=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return spe(t)?t.workingDirectory.trim().length===0?{ok:!1,error:ES}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:aY(t.judge),improver:aY(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:ES}}});var Mo,ipe,dY,uY,pY=a(()=>{"use strict";I();Mo=m(Ni()),ipe=(0,Mo.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Mo.isNumber,confirmedMaxSpendUsd:(0,Mo.isUndefinedOr)(Mo.isNumber),rateUsdPer1kTokens:(0,Mo.isUndefinedOr)(Mo.isNumber)}),dY=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:ipe(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},uY=(e,t)=>{let r=qr({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var ape,mY,gY=a(()=>{"use strict";I();He();ov();wp();ape=e=>e.map(t=>t.id).join(", "),mY=e=>{let t=yl(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===M||n===M)return{ok:!1,error:mL,installedWriters:t.writers};if(o===null||n===null){let l=ape(t.writers);return{ok:!1,error:l.length===0?"No reasoning writer is installed on this computer.":`Set judge and improver to installed writer ids: ${l}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=jP({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var lpe,fY,yY=a(()=>{"use strict";I();ev();sY();iY();wp();cY();pY();gY();jt();lpe=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},fY=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=ie(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this computer."}}:{status:200,body:$P(u)}}let r=await e.handlers.readInstalledIds(),o=yl(r);if(e.method==="GET")return{status:200,body:nY(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=dY(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let g=ie(e.storePath,t);if(g===null)return{status:404,body:{ok:!1,error:"That run is not on this computer."}};let f=uY(g,u.body);return f.ok?(B(e.storePath,f.cycle),{status:200,body:$P(f.cycle)}):{status:400,body:{ok:!1,error:f.error}}}let n=lpe(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=Ys({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=lY(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=mY({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let l=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(l!==null)return{status:400,body:{ok:!1,error:l,installedWriters:o.writers}};let c=rl({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:ht({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=qr({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=MP({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Mu(i.prompt),runnerModel:i.runner,costControls:c});return B(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:$P(d)}}});var hY,SY=a(()=>{"use strict";ci();FP();yY();hY=async e=>{let t=await fY({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:IP,readWritersReady:HP,startCycle:Fe}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var AY,cpe,dpe,PY,upe,bY,_Y=a(()=>{"use strict";AY=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],cpe=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},dpe=e=>{let t={};for(let n of e)for(let s of new Set(AY(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},PY=(e,t)=>{let r=cpe(AY(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},upe=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[l,c])=>i+c*(t[l]??0),0),n=Math.sqrt(r.reduce((i,[,l])=>i+l*l,0)),s=Math.sqrt(Object.values(t).reduce((i,l)=>i+l*l,0));return n===0||s===0?0:o/(n*s)},bY=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=dpe(e.map(i=>i.text)),s=PY(o,n);return e.map(i=>({id:i.id,score:upe(s,PY(i.text,n))})).filter(i=>i.score>0).toSorted((i,l)=>l.score-i.score).slice(0,r)}});var cv,ppe,mpe,kY,gpe,fpe,ype,hpe,dv,uv=a(()=>{"use strict";cv=m(require("node:path"));ft();_Y();WP();ppe=5,mpe=20,kY=280,gpe=e=>[e.name,e.description,e.promptText].join(`
`),fpe=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=kY?t:`${t.slice(0,kY-3)}...`},ype=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),hpe=e=>e===void 0||!Number.isFinite(e)?ppe:Math.min(mpe,Math.max(1,Math.floor(e))),dv=e=>{let t=e.query.trim(),r=hpe(e.limit),o=Co(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=bp(o.path),s=bY(n.map(d=>({id:d.fileName,text:gpe(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),l=cv.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:cv.default.join(l,u.fileName,"SKILL.md"),excerpt:fpe(u),source:"filesystem"}]});return{query:t,hits:c,context:ype(c)}}});var RY,EY=a(()=>{"use strict";uv();RY=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:dv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var wY,TY=a(()=>{"use strict";EY();wY=async e=>{let t=RY({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var Spe,pv,CY=a(()=>{"use strict";cI();X4();Q4();tY();oY();SY();TY();Spe=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},pv=async e=>{let t=Spe(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await hY(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await wY(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:lI()})),!0):(await rY({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||Z4({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||eY({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await Y4(e),!0)}});var mv,Ppe,Ape,Tp,zP=a(()=>{"use strict";mv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ppe=e=>!mv(e)||typeof e.ruleId!="string"||typeof e.title!="string"||typeof e.source!="string"||typeof e.active!="boolean"||typeof e.hitCount!="number"||!Number.isFinite(e.hitCount)||e.lastHitAt!==null&&typeof e.lastHitAt!="string"?null:{ruleId:e.ruleId,title:e.title,source:e.source,active:e.active,hitCount:e.hitCount,lastHitAt:e.lastHitAt},Ape=e=>!mv(e)||typeof e.ruleIdA!="string"||typeof e.ruleIdB!="string"||e.reason!=="duplicate"&&e.reason!=="overlap"||typeof e.score!="number"||!Number.isFinite(e.score)?null:{ruleIdA:e.ruleIdA,ruleIdB:e.ruleIdB,reason:e.reason,score:e.score},Tp=e=>{if(!mv(e)||e.ok!==!0||typeof e.projectId!="string"||e.windowDays!==null||!Array.isArray(e.rules)||!Array.isArray(e.overlaps))return null;let t=[];for(let o of e.rules){let n=Ppe(o);if(n===null)return null;t.push(n)}let r=[];for(let o of e.overlaps){let n=Ape(o);if(n===null)return null;r.push(n)}return{ok:!0,projectId:e.projectId,windowDays:null,rules:t,overlaps:r}}});var bpe,_pe,gv,fv=a(()=>{"use strict";zP();bpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_pe=e=>Tp({ok:!0,projectId:"x",windowDays:null,rules:[e],overlaps:[]})?.rules[0]??null,gv=e=>{if(!bpe(e)||e.ok!==!0||typeof e.projectId!="string"||typeof e.changed!="boolean")return null;let t=_pe(e.rule);return t===null?null:{ok:!0,projectId:e.projectId,rule:t,changed:e.changed}}});var kpe,LY,yv,IY=a(()=>{"use strict";zP();kpe=1e4,LY=(e,t,r=30)=>{let o=new URL(`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/usage`);return o.searchParams.set("days",String(r)),o.toString()},yv=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"not_connected"};let r=e.fetchImpl??fetch;try{let o=await r(LY(e.appOrigin,e.projectId,e.days??30),{method:"GET",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(kpe)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=Tp(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var Rpe,vY,hv,xY=a(()=>{"use strict";fv();Rpe=15e3,vY=(e,t,r,o)=>`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/${encodeURIComponent(r)}/${o}`,hv=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"unauthorized"};let r=e.fetchImpl??fetch;try{let o=await r(vY(e.appOrigin,e.projectId,e.ruleId,e.action),{method:"POST",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(Rpe)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(o.status===404)return{ok:!1,reason:"not_found"};if(o.status===409)return{ok:!1,reason:"limit_exceeded"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=gv(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var D,jo=a(()=>{"use strict";dt();D={heading:"Compare rules",intro:"See which rules kick in for a prompt and what they add to each request.",groupLabel:"Sample prompts",lead:"Try a sample:",customLabel:"Or write your own prompt",customHint:"Use a prompt that has nothing to do with this project. Any rule that still kicks in is probably in the wrong place.",button:"Compare",emptyPrompt:"Pick a sample prompt or write your own.",noRules:"No rules kick in for this prompt.",oneRule:"1 rule kicks in for this prompt:",nRules:e=>`${e} rules kick in for this prompt:`,tokenLine:(e,t)=>`Prompt alone: ${e} tokens. Rules add ${t} tokens.`,costLine:e=>`About ${e} more per request.`,rulesUnavailable:"Rules for this project aren't available right now.",ruleUseHeading:"Rule use",ruleUseIntro:"Rules marked below may be safe to drop. You decide. Nothing is removed for you.",usedOnce:"Used 1 time",usedN:e=>`Used ${e} times`,neverUsed:"Never used",notUsedInDays:e=>`Not used in ${e} days`,sameAs:e=>`Same as ${e}`,overlapsWith:e=>`Overlaps with ${e}`,emptyRules:"No rules to check yet.",usageError:"Couldn't load rule usage. Try again.",tryAgain:"Try again",connectComputer:"Connect this computer to AgentWitch to see rule use.",ownerOnlyUsage:"Only the project owner can see rule use.",drop:"Drop",restore:"Restore",undo:"Undo",dropped:e=>`Dropped "${e}".`,ownerOnlyDrop:"Only the project owner can drop rules.",dropFailed:"Couldn't drop the rule. Try again.",restoreFailed:"Couldn't restore the rule. Try again.",limitReached:`Limit reached: ${64} active pitfalls. Retire one to add another.`}});var Epe,wpe,Sv,Pv,Av=a(()=>{"use strict";jo();Epe=1440*60*1e3,wpe=(e,t)=>{let r=Date.parse(e);return Number.isFinite(r)?Math.max(0,Math.floor((t-r)/Epe)):null},Sv=e=>{let t=e.nowMs??Date.now(),r=e.staleAfterDays??30,o=[];if(e.rule.hitCount===0)o.push({kind:"never_used"});else if(e.rule.lastHitAt!==null){let n=wpe(e.rule.lastHitAt,t);n!==null&&n>r&&o.push({kind:"stale",days:n})}for(let n of e.overlaps){let s=n.ruleIdA===e.rule.ruleId?n.ruleIdB:n.ruleIdB===e.rule.ruleId?n.ruleIdA:null;if(s===null)continue;let l=e.rulesById.get(s)?.title??s;n.reason==="duplicate"?o.push({kind:"same_as",ruleTitle:l}):o.push({kind:"overlaps",ruleTitle:l})}return o},Pv=e=>{switch(e.kind){case"never_used":return D.neverUsed;case"stale":return D.notUsedInDays(e.days);case"same_as":return D.sameAs(e.ruleTitle);case"overlaps":return D.overlapsWith(e.ruleTitle);default:return e}}});var WY=a(()=>{"use strict";I();I();I();I();I()});var bv,_v=a(()=>{"use strict";dt();Yd();WY();bv=e=>{let t=nr(e.prompt),r=Jd(e.matched.map(s=>({id:s.id,avoidance:s.avoidance}))),o=e.matched.length===0?0:nr(r),n=Vt(null);return{promptTokens:t,rulesTokens:o,addedCostUsd:o/1e3*n}}});var UP=a(()=>{"use strict";CY();uv();ni();zP();fv();IY();xY();Av();_v();jo()});var Tpe,Cpe,Lpe,OY,MY=a(()=>{"use strict";Z();ut();rC();Tpe="/api/local/coding-tools/pause",Cpe=e=>e===void 0||e===Ft||e===Wi,Lpe=e=>{try{let r=JSON.parse(e)?.paused;return typeof r=="boolean"?r:null}catch{return null}},OY=async e=>{if(e.pathname!==Tpe)return!1;let t=(s,i,l)=>e.sendJson(e.response,s,{ok:!0,paused:i,updatedAt:l,label:hs.pauseLabel,hint:hs.pauseHint});if(e.method==="GET"){let s=_s(e.configPath);return t(200,s.paused,s.updatedAt),!0}if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let r=e.request.headers.origin;if(!Cpe(typeof r=="string"?r:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let o=Lpe(await e.readBody(e.request));if(o===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body"}),!0;let n=kR(e.configPath,o);return t(200,n.paused,n.updatedAt),!0}});var kv,Rv,Ev=a(()=>{"use strict";kv="2025-03-26",Rv={name:"agent-witch",version:"1.0.0"}});var Sl,BP,jY,Ipe,Cp,NY=a(()=>{"use strict";Ev();Sl=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),BP=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),jY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,Ipe=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return Sl(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return Sl(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return BP(e,i)}catch(i){try{r.onToolError?.(n,i)}catch{}return Sl(e,-32603,`Tool ${n} failed`)}},Cp=async(e,t,r)=>{let o=jY(e);if(o===null)return Sl(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?Sl(n,-32600,"Invalid Request"):s==="initialize"?BP(n,{protocolVersion:kv,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?BP(n,{}):s==="tools/list"?BP(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?Ipe(n,jY(o.params),t,r):Sl(n,-32601,"Method not found")}});var wv,DY=a(()=>{"use strict";wv=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var GP=a(()=>{"use strict";NY();DY();Ev()});var vpe,xn,KP=a(()=>{"use strict";Gr();GP();vpe=(e,t)=>{let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] mcp tool ${e} failed: ${r}
`)},xn=e=>{let t=An({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:Rv,tools:[{definition:bh,call:r=>wv(JSON.stringify(t(r)))}],onToolError:e.logToolError??vpe}}});var HY,xpe,Wpe,FY,$Y=a(()=>{"use strict";GP();KP();HY=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},xpe=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let l=Number.parseInt(i[1]??"0",10),c=n+4+l;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}await t(u)}},Wpe=async(e,t)=>{await xpe(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await Cp(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&HY(t.stdout,s);return}HY(t.stdout,s)})},FY=async e=>{await Wpe(xn({layout:e.layout,isDeclined:e.isDeclined}),e.streams??{stdin:process.stdin,stdout:process.stdout})}});var Ope,VP,zY=a(()=>{"use strict";GP();KP();Ope="/mcp",VP=async e=>{if(e.pathname!==Ope)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??xn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await Cp(t,r,void 0)),!0}});var UY={};Et(UY,{createAwlMcpServer:()=>xn,runAwlMcpStdio:()=>FY,tryHandleAwlMcpHttpRequest:()=>VP});var Tv=a(()=>{"use strict";KP();$Y();zY()});var di,Lp,Mpe,jpe,Npe,Dpe,BY,GY=a(()=>{"use strict";di=m(require("node:fs")),Lp=m(require("node:path")),Mpe="prompt-optimizer-cycles.json",jpe="prompt-optimizer-preferences.json",Npe="prompt-sdlc-cycles.json",Dpe="prompt-sdlc-preferences.json",BY=e=>{let t=Lp.default.join(e,Mpe),r=Lp.default.join(e,Npe);if(di.default.existsSync(t)||!di.default.existsSync(r))return t;try{di.default.renameSync(r,t)}catch{return r}let o=Lp.default.join(e,Dpe),n=Lp.default.join(e,jpe);if(di.default.existsSync(o)&&!di.default.existsSync(n))try{di.default.renameSync(o,n)}catch{}return t}});var Pl,Hpe,Cv,KY=a(()=>{"use strict";Pl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hpe=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],Cv=e=>{let t=Hpe.map(i=>`<option value="${Pl(i.value)}">${Pl(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this computer on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Pl(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Pl(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Pl(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
      <p class="eyebrow">Delegate</p>
      <h1>Run a task on this computer</h1>
      <p class="lede">Dispatch work locally and report status to cloud when finished \u2014 no live terminal stream required.</p>
      ${r}
      <form class="task-form" method="POST" action="/task/dispatch">
        <label class="field">
          <span class="field-label">Writer</span>
          <select class="input" name="writerAgent" required>${t}</select>
        </label>
        <label class="field">
          <span class="field-label">Project folder (optional)</span>
          <input class="input mono" type="text" name="projectFolder" value="${Pl(e.defaultWorkspace)}" placeholder="/path/to/repo" />
        </label>
        <label class="field">
          <span class="field-label">Task</span>
          <textarea class="input textarea" name="prompt" rows="8" required placeholder="What should the writer do on this computer?"></textarea>
        </label>
        <div class="actions">
          <button class="btn btn-primary" type="submit" ${e.wsConnected?"":"disabled"}>Delegate task</button>
        </div>
      </form>
      ${s}
    </section>`}});var Ip,JY,Fpe,YY,$pe,zpe,XY,JP,VY,qY,Upe,Bpe,No,vp,qP,Gpe,YP,Lv,Kpe,Iv,ZY,vv,QY,Vpe,qpe,Jpe,e8,t8,r8,xp=a(()=>{"use strict";Ip=m(require("node:fs")),JY=m(require("node:path")),Fpe="estimate-history.ndjson",YY=100,$pe=500,zpe=2e4,XY=e=>JY.default.join(e,Fpe),JP=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,$pe),VY=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,zpe),qY=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,Upe=e=>({...e,estimateTokens:qY(e.estimateTokens),actualTokens:qY(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),Bpe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},No=e=>{let t=XY(e);return Ip.default.existsSync(t)?Ip.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return Bpe(n)?[Upe(n)]:[]}catch{return[]}}):[]},vp=(e,t)=>{Ip.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Ip.default.writeFileSync(XY(e),r,"utf8")},qP=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),Gpe=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this computer. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${qP(o.task)} | ${qP(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},YP=e=>{let t=No(e.reportsDir),r=JP(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);vp(e.reportsDir,[...s,n])},Lv=e=>{let t=No(e.reportsDir),r=t.find(l=>l.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?JP(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(l=>l.id!==e.agentRunId);vp(e.reportsDir,[...i,s])},Kpe=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-YY),Iv=e=>[...No(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),ZY=e=>{let t=No(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=VY(e.input),n=VY(e.output),s=JP(o),i=e.writerLabel?.trim()??"",l={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);vp(e.reportsDir,[...c,l])},vv=(e,t)=>{let r=No(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},QY=e=>({table:Gpe(Kpe(No(e))),embedding:null}),Vpe=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],l=s[s.length-2];s.length>=3&&i!==void 0&&l!==void 0&&i>l*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},qpe=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-YY),Jpe=e=>{let t=Vpe(qpe(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",l=r.get(i)??[];l.push(s.actualTokens),r.set(i,l)}let o=[...r.entries()].map(([s,i])=>{let l=Math.min(...i),c=Math.max(...i);return l===c?`${s} actuals are ${l}`:`${s} actuals are ${l}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${qP(s.task)} | ${qP(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},e8=e=>{let t=No(e.reportsDir),r=JP(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);vp(e.reportsDir,[...s,n])},t8=e=>{let t=No(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);vp(e.reportsDir,[...s,n])},r8=e=>Jpe(No(e))});var o8=a(()=>{"use strict";xp()});var Do,xv,Ype,Wv,Xpe,Zpe,XP,ZP,Qpe,Ov,n8=a(()=>{"use strict";o8();nI();Do=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},Ype=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${xv(-r)} under`:`${xv(r)} over`},Wv=e=>e.toLocaleString("en-US"),Xpe=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Wv(-r)} under`:`${Wv(r)} over`},Zpe=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},XP=e=>e===null?"\u2014":xv(e),ZP=e=>e===null?"\u2014":Wv(e),Qpe=`(function () {
  const dialog = document.getElementById("history-detail");
  const body = document.getElementById("history-detail-body");
  const table = document.getElementById("history-table");
  if (!(dialog instanceof HTMLDialogElement) || body === null || table === null) {
    return;
  }
  const openDetail = (sourceId) => {
    const template = document.getElementById(sourceId);
    if (!(template instanceof HTMLTemplateElement)) {
      return;
    }
    body.replaceChildren(template.content.cloneNode(true));
    if (!dialog.open) {
      dialog.showModal();
    }
  };
  table.addEventListener("click", (event) => {
    const row = event.target instanceof Element
      ? event.target.closest("[data-history-detail]")
      : null;
    const sourceId = row?.getAttribute("data-history-detail");
    if (sourceId !== null && sourceId !== undefined) {
      openDetail(sourceId);
    }
  });
  const closeButton = document.getElementById("history-detail-close");
  if (closeButton !== null) {
    closeButton.addEventListener("click", () => {
      dialog.close();
    });
  }
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
})();`,Ov=e=>{let r=Iv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,l=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":Ype(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":Xpe(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${Do(Zpe(i))}</button></td>
        <td>${Do(c)}</td>
        <td>${XP(n.estimateSeconds)}</td>
        <td>${XP(n.actualSeconds)}</td>
        <td>${Do(d)}</td>
        <td>${ZP(n.estimateTokens)}</td>
        <td>${ZP(n.actualTokens)}</td>
        <td>${Do(u)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${Do(c)}</p>
        <h2>Input</h2>
        <pre>${Do(i)}</pre>
        <h2>Output</h2>
        <pre>${Do(l)}</pre>
        <p>Time: estimated ${XP(n.estimateSeconds)} \xB7 actual ${XP(n.actualSeconds)} \xB7 ${Do(d)}</p>
        <p>Tokens: estimated ${ZP(n.estimateTokens)} \xB7 actual ${ZP(n.actualTokens)} \xB7 ${Do(u)}</p>
      </template>`}});return`<section class="card">
      <p class="eyebrow">This computer</p>
      <h1>History</h1>
      <p class="lede">Every prompt on this computer. Select a row to read the input, output, and estimate.</p>
      ${r.length===0?'<p class="empty">No prompt history yet.</p>':`<div class="table-wrap history-table-wrap"><table id="history-table">
          <thead><tr><th>Prompt</th><th>Writer</th><th>Estimated</th><th>Actual</th><th>Comparison</th><th>Estimated tokens</th><th>Actual tokens</th><th>Token comparison</th></tr></thead>
          <tbody>${r.map(n=>n.row).join("")}</tbody>
        </table></div>
        ${r.map(n=>n.template).join("")}
        <dialog id="history-detail" class="history-dialog" aria-label="Prompt detail">
          <div class="history-dialog-bar">
            ${KS({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${Qpe}</script>`}
    </section>`}});var s8=a(()=>{"use strict";KY();n8()});var Al,eme,tme,Mv,i8=a(()=>{"use strict";Al=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eme=(e,t,r)=>{let o=Al(t),n=Al(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},tme=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Al(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>eme(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Al(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Al(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Al(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},Mv=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(tme).join(""):'<section class="card"><p class="muted">No writer sessions stored on this computer yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var a8=a(()=>{"use strict";i8()});var Wp,l8,c8,jv,Nv,Dv,d8=a(()=>{"use strict";Wp=m(require("node:fs")),l8=m(require("node:path"));Ea();uS();c8=(e,t,r)=>Ba({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,jv=(e,t,r)=>{let o=c8(e,t,r);if(o===null)return[];if(!Wp.default.existsSync(o))return[];let n=Wp.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},Nv=e=>{let t=c8(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:ur(e.entry.prompt),output:ur(e.entry.output)};Wp.default.mkdirSync(l8.default.dirname(t),{recursive:!0}),Wp.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},Dv=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,l=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${l}`}).join(`

`)}

---

`});var rme,ome,Op,QP,Hv=a(()=>{"use strict";rme=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),ome=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Op=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],l=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=rme(i.assistantOutput),d=c.length>0?`Assistant: ${ome(c,t)}`:null,u=[l,d].filter(g=>g!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},QP=e=>{let t=e.userMessage.trim(),r=Op({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var to,Mp,zv,nme,sme,Fv,ime,Uv,eA,u8,p8,ame,bl,Bv,$v,m8,lme,g8,_l,tA,jp,cme,Np,Gv,rA,oA,f8=a(()=>{"use strict";to=m(require("node:fs")),Mp=m(require("node:path")),zv=require("node:crypto");Hv();nme="writer-sessions",sme="active-index.json",Fv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ime=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Uv=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},eA=e=>{let t=Mp.default.join(e.installDir,nme);return to.default.mkdirSync(t,{recursive:!0}),t},u8=e=>Mp.default.join(eA(e),sme),p8=(e,t)=>Mp.default.join(eA(e),`${t}.canonical.json`),ame=(e,t)=>Mp.default.join(eA(e),`${t}.continuation.json`),bl=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,Bv=e=>{let t=u8(e);if(!to.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(to.default.readFileSync(t,"utf8"));if(!Fv(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!Fv(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!ime(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},$v=(e,t)=>{to.default.writeFileSync(u8(e),JSON.stringify(t,null,2))},m8=(e,t)=>{to.default.writeFileSync(p8(e,t.sessionId),JSON.stringify(t,null,2))},lme=(e,t)=>{to.default.writeFileSync(ame(e,t.sessionId),JSON.stringify(t,null,2))},g8=(e,t)=>{let r=Op({turns:t.turns});lme(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},_l=(e,t)=>{let r=p8(e,t);if(!to.default.existsSync(r))return null;try{let o=JSON.parse(to.default.readFileSync(r,"utf8"));return!Fv(o)||typeof o.sessionId!="string"?null:o}catch{return null}},tA=(e,t=20)=>{let r=eA(e),o=to.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),l=_l(e,i);l!==null&&n.push(l)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},jp=(e,t,r)=>{let o=Uv(r);return Bv(e).entries.find(i=>bl(i)===bl({writerAgent:t,projectFolderPath:o}))?.sessionId??null},cme=(e,t,r,o)=>{let n=Bv(e),s=bl({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(l=>bl(l)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];$v(e,{entries:i})},Np=(e,t,r)=>{let o=(0,zv.randomUUID)(),n=new Date().toISOString(),s=Uv(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return m8(e,i),g8(e,i),cme(e,t,s,o),o},Gv=(e,t,r)=>{let o=jp(e,t,r);return o!==null?o:Np(e,t,r)},rA=(e,t,r)=>{let o=Uv(r),n=Bv(e);if(o===null&&r===void 0){$v(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=bl({writerAgent:t,projectFolderPath:o});$v(e,{entries:n.entries.filter(i=>bl(i)!==s)})},oA=e=>{let t=Gv(e.layout,e.writerAgent,e.projectFolderPath),r=_l(e.layout,t);if(r===null)return;let o={id:(0,zv.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};m8(e.layout,n),g8(e.layout,n)}});var dme,ume,nA,Kv,y8=a(()=>{"use strict";dme=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",ume=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},nA=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",Kv=e=>{let t=nA(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=dme(r,e.userPromptCharacterCount),n=ume({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var sA=a(()=>{"use strict";d8();f8();Hv();y8()});var h8=a(()=>{"use strict";dy();ma();UR()});var S8=a(()=>{"use strict";fR()});var _t,mme,gme,Vv,qv,Jv,P8=a(()=>{"use strict";h8();S8();_t=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mme=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},gme=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Sd(o);return`value="${_t(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${_t(r)}"`},Vv=(e,t,r,o,n)=>{let s=uy[t];return`<label class="field">
          <span class="field-label">${_t(o)} API key \u2014 ${_t(mme(e,t))} \xB7 <a class="field-link" href="${_t(s.href)}" target="_blank" rel="noopener noreferrer">${_t(s.label)}</a></span>
          <input class="input mono" type="password" name="${_t(r)}" autocomplete="off" ${gme(e,t,n)} />
        </label>`},qv=(e,t,r,o)=>{let n=ey(e[t]?.model),s=new Set(Qf[t].map(c=>c.value)),i=Qf[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${_t(c.value)}"${d}>${_t(c.label)}</option>`}).join(""),l=n!==As&&!s.has(n)?`<option value="${_t(n)}" selected>${_t(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${_t(o)}</span>
          <select class="input mono" name="${_t(r)}">${i}${l}</select>
        </label>`},Jv=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${_t(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
      <p class="eyebrow">Writer</p>
      <h1>API keys (optional)</h1>
      <p class="lede">Run Claude, Codex, or Antigravity tasks with provider HTTP APIs instead of installing their CLIs on this computer. Keys stay in <span class="mono">writer-api-secrets.json</span> on this machine only.</p>
      <form class="task-form" method="POST" action="/writer-api">
        <fieldset class="field">
          <span class="field-label">Execution</span>
          <label><input type="radio" name="writerExecutionBackend" value="cli"${r} /> Local CLI (default)</label>
          <label><input type="radio" name="writerExecutionBackend" value="api"${o} /> API key + AgentWitch script</label>
        </fieldset>
        <p class="muted">Maps: Claude \u2192 Anthropic, Codex \u2192 OpenAI, Antigravity \u2192 Google Gemini. Cursor still requires CLI or Cursor Cloud on the website.</p>
        ${Vv(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${qv(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${Vv(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${qv(e.secrets,"openai","openaiModel","OpenAI model")}
        ${Vv(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${qv(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var A8=a(()=>{"use strict";P8()});var iA,b8,_8=a(()=>{"use strict";iA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b8=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${iA(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in AgentWitch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">Nothing installed yet. Install playbooks in AgentWitch Cloud \u2014 files land in your profile harness on this computer. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${iA(s.name)}</strong> <span class="muted mono">(${iA(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${iA(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from AgentWitch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var fme,k8,R8,E8=a(()=>{"use strict";fme=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,k8=e=>e.kind==="folder",R8=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let l=n[i];if(l===void 0)continue;if(i===n.length-1){s.children.set(l,o);continue}let d=s.children.get(l);if(d!==void 0&&k8(d)){s=d;continue}let u={kind:"folder",name:l,children:new Map};s.children.set(l,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(k8(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(fme)};return r(t)}});var w8,Yv,T8=a(()=>{"use strict";w8=m(require("node:path")),Yv=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${Yv(r.children,t)}</ul>
            </details>
          </li>`;let o=w8.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
          <button
            type="button"
            class="harness-tree-preview"
            data-source-path="${t(r.item.sourcePath)}"
            title="${t(r.item.relativePath)}"
          >
            <span class="harness-tree-file-name">${t(o)}</span>
            <span class="muted harness-tree-file-kind">${t(r.item.kind)}</span>
          </button>
          <pre class="harness-tree-preview-body" hidden></pre>
        </li>`}).join("")});var C8,Wn,yme,hme,Dp,Sme,Xv,L8=a(()=>{"use strict";yS();C8=m(require("node:path"));_8();E8();T8();Wn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yme=()=>`(() => {
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
    const status = document.getElementById("pickFolderStatus");
    const unavailableMessage =
      "Folder picker is only available on the computer that runs AgentWitch. Type the folder path instead.";
    const showPickerUnavailable = () => {
      if (status instanceof HTMLElement) {
        status.textContent = unavailableMessage;
        status.hidden = false;
        return;
      }
      window.alert(unavailableMessage);
    };
    const clearPickerStatus = () => {
      if (status instanceof HTMLElement) {
        status.textContent = "";
        status.hidden = true;
      }
    };

    const response = await fetch("/api/harness/pick-folder", {
      method: "POST",
    }).catch(() => null);
    if (response === null || !response.ok) {
      showPickerUnavailable();
      return;
    }

    const payload = await response.json().catch(() => null);
    const cancelled =
      payload !== null &&
      typeof payload === "object" &&
      payload.cancelled === true;
    const pickedPath =
      payload !== null &&
      typeof payload === "object" &&
      typeof payload.path === "string"
        ? payload.path
        : "";
    if (cancelled || pickedPath.trim().length === 0) {
      showPickerUnavailable();
      return;
    }

    clearPickerStatus();
    if (scanInput instanceof HTMLInputElement) {
      scanInput.value = pickedPath;
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

})();`,hme=()=>`(() => {
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
})();`,Dp=e=>{let t=Eu({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in AgentWitch Cloud",body:"Install and update playbooks in the browser; this computer keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=b8({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Wn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Wn(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Sme(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,l=!e.importSectionExpanded,c=l?`<section class="card">
        <p class="muted">Advanced: pull rules from an existing folder on disk (does not replace installing from AgentWitch Cloud).</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",d=l?"":`<section class="card">
      <p class="eyebrow">Advanced</p>
      <h1>Import from disk</h1>
      <p class="lede">Scan a folder for existing <code>.cursor</code> rules and copy them into the profile harness on this computer. Prefer installing playbooks from AgentWitch Cloud when possible.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Wn(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Wn(s)}" />
        </label>
        <div class="actions">
          <div>
            <button class="btn btn-secondary" type="button" id="pickFolder">Choose folder\u2026</button>
            <p class="muted" id="pickFolderStatus" hidden></p>
          </div>
          <button class="btn btn-primary" type="button" id="revealStart"${i?" hidden":""}>Reveal</button>
          <button class="btn btn-secondary" type="button" id="revealStop" hidden>Stop</button>
        </div>
        <div class="reveal-progress" id="revealProgress" hidden>
          <p class="muted">Scanning\u2026 folders with <code>.cursor</code> appear below.</p>
          <div class="reveal-live-list" id="revealFolderList"></div>
        </div>
      </div>
    </section>
    ${n}
    <script>${yme()}</script>
    <script>${hme()}</script>`;return`${t}${r}${o}${c}${d}`},Sme=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:l,setIndex:c})=>{let d=R8(l.items.map(f=>({...f,relativePath:typeof f.relativePath=="string"&&f.relativePath.length>0?f.relativePath:C8.default.relative(l.sourceRoot,f.sourcePath).replaceAll("\\","/")}))),u=Yv(d,Wn),g=l.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Wn(l.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Wn(l.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Wn(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},Xv=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,l]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=l.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let l=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??u??l,f=t.sets[i];if(f===void 0)continue;let y=l.length>0?l:f.proposedSlug,A=g.length>0?g:f.proposedName,P=r.has(i),S=f.items.map(p=>({id:p.id,kind:p.kind,title:p.title,sourcePath:p.sourcePath,include:P}));s.push({slug:y,name:A,items:S})}return s}});var I8=a(()=>{"use strict";L8()});var Pme,Zv,v8=a(()=>{"use strict";gt();Pme=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[Q]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},Zv=Pme});var Ame,x8,W8=a(()=>{"use strict";gt();Ame=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[Q]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},x8=Ame});var O8,bme,M8,j8=a(()=>{"use strict";dt();O8={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:`This project already has ${64} active pitfalls, the most allowed. Retire one, then try again.`},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"AgentWitch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach AgentWitch Cloud. Check this computer on Status, then try again."}},bme=e=>e!==null&&Object.prototype.hasOwnProperty.call(O8,e)?O8[e]:null,M8=bme});var N8,D8=a(()=>{"use strict";N8=[{label:"Haiku",goal:"Write a short haiku about morning rain."},{label:"Trip plan",goal:"Plan a quiet weekend trip to a nearby lake."},{label:"Rainbows",goal:"Explain how rainbows form in simple words."},{label:"Dinner idea",goal:"Suggest a quick vegetarian dinner for two."}]});var br,Hp,Qv=a(()=>{"use strict";jo();D8();qI();br=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hp=e=>{let t=e.promptValue??"",r=OP({presets:N8,groupLabel:D.groupLabel,leadLabel:D.lead,submitName:"rulePrompt"}),o=e.promptError!==void 0&&e.promptError!==null?`<p class="alert-error">${br(e.promptError)}</p>`:"",n=e.resultHtml!==void 0&&e.resultHtml.length>0?`<div class="stack">${e.resultHtml}</div>`:"",s=e.usageHtml!==void 0&&e.usageHtml.length>0?`<section class="stack">
          <h3>${br(D.ruleUseHeading)}</h3>
          <p class="lede">${br(D.ruleUseIntro)}</p>
          ${e.usageHtml}
        </section>`:"";return`<section class="stack" aria-label="${br(D.heading)}">
      <h2>${br(D.heading)}</h2>
      <p class="lede">${br(D.intro)}</p>
      <form method="GET" action="/project" class="stack">
        <input type="hidden" name="id" value="${br(e.projectId)}" />
        <input type="hidden" name="tab" value="harness" />
        ${r}
        <label class="field-label" for="rule-compare-prompt">${br(D.customLabel)}</label>
        <p class="muted">${br(D.customHint)}</p>
        <textarea class="input" id="rule-compare-prompt" name="rulePrompt" rows="3">${br(t)}</textarea>
        ${o}
        <div class="actions">
          <button class="btn btn-primary" type="submit">${br(D.button)}</button>
        </div>
      </form>
      ${n}
      ${s}
    </section>`}});var kl,ex,tx=a(()=>{"use strict";jo();kl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ex=e=>{if(e.matched.length===0)return`<p class="empty">${kl(D.noRules)}</p>`;let t=e.matched.length===1?D.oneRule:D.nRules(e.matched.length),r=`<ul class="stack">${e.matched.map(n=>`<li><strong>${kl(n.title)}</strong> <span class="muted mono">${kl(n.id)}</span></li>`).join("")}</ul>`,o=`$${e.tokens.addedCostUsd.toFixed(4)}`;return`<div class="stack">
      <p>${kl(t)}</p>
      ${r}
      <p class="muted">${kl(D.tokenLine(e.tokens.promptTokens,e.tokens.rulesTokens))}</p>
      <p class="muted">${kl(D.costLine(o))}</p>
    </div>`}});var Xt,_me,rx,ox=a(()=>{"use strict";Av();jo();Xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_me=e=>e===1?D.usedOnce:D.usedN(e),rx=e=>{let t=e.flashHtml??"";if(e.rules.length===0)return`${t}<p class="empty">${Xt(D.emptyRules)}</p>`;let r=new Map(e.rules.map(n=>[n.ruleId,n])),o=e.rules.map(n=>{let i=Sv({rule:n,rulesById:r,overlaps:e.overlaps,nowMs:e.nowMs}).map(c=>`<span class="muted">${Xt(Pv(c))}</span>`).join(" \xB7 "),l=n.active?`<form method="POST" action="/project/rules/drop" class="inline-form">
            <input type="hidden" name="projectId" value="${Xt(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${Xt(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Xt(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${Xt(D.drop)}</button>
          </form>`:`<form method="POST" action="/project/rules/restore" class="inline-form">
            <input type="hidden" name="projectId" value="${Xt(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${Xt(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Xt(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${Xt(D.restore)}</button>
          </form>`;return`<li class="stack">
          <p><strong>${Xt(n.title)}</strong> <span class="muted">${Xt(_me(n.hitCount))}</span></p>
          ${i?`<p>${i}</p>`:""}
          ${l}
        </li>`}).join("");return`${t}<ul class="stack">${o}</ul>`}});var Ho,H8,Fo,F8,nx=a(()=>{"use strict";jo();Ho=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H8=e=>{let t=D.dropped(e.title),r=e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Ho(e.prompt)}" />`:"";return`<div class="alert-success actions">
      <span>${Ho(t)}</span>
      <form method="POST" action="/project/rules/restore" class="inline-form">
        <input type="hidden" name="projectId" value="${Ho(e.projectId)}" />
        <input type="hidden" name="ruleId" value="${Ho(e.ruleId)}" />
        ${r}
        <button class="btn btn-secondary btn-compact" type="submit">${Ho(D.undo)}</button>
      </form>
    </div>`},Fo=(e,t="error")=>`<p class="${t==="error"?"alert-error":"muted"}">${Ho(e)}</p>`,F8=e=>{let t=`/project?id=${encodeURIComponent(e.projectId)}&tab=harness&rulePrompt=${encodeURIComponent(e.prompt)}`;return`<p class="alert-error">${Ho(D.usageError)} <a href="${Ho(t)}">${Ho(D.tryAgain)}</a></p>`}});var kme,$8,z8=a(()=>{"use strict";jo();nx();ox();kme=(e,t)=>e.ok?"":e.reason==="forbidden"?Fo(D.ownerOnlyDrop):e.reason==="limit_exceeded"?Fo(D.limitReached):Fo(t==="restore"?D.restoreFailed:D.dropFailed),$8=e=>{if(e.usage===null)return Fo(D.connectComputer,"muted");if(!e.usage.ok)return e.usage.reason==="not_connected"?Fo(D.connectComputer,"muted"):e.usage.reason==="forbidden"?Fo(D.ownerOnlyUsage,"muted"):F8({projectId:e.projectId,prompt:e.prompt});let t="";return e.changeError!==void 0&&e.changeError!==null?t=kme(e.changeError,e.changeAction??"drop"):e.dropFlash&&(t=H8({projectId:e.projectId,ruleId:e.dropFlash.ruleId,title:e.dropFlash.title,prompt:e.prompt})),rx({projectId:e.projectId,rules:e.usage.data.rules,overlaps:e.usage.data.overlaps,flashHtml:t,prompt:e.prompt})}});var Rme,aA,U8=a(()=>{"use strict";Gr();_v();jo();Qv();tx();z8();nx();Rme=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,source:e.source,hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,severity:e.severity}),aA=e=>{let t=e.prompt?.trim()??"";if(t.length===0)return Hp({projectId:e.projectId,promptError:e.prompt!==null&&e.prompt!==void 0?D.emptyPrompt:null});if(e.rulesUnavailable||e.activeRules===null)return Hp({projectId:e.projectId,promptValue:t,resultHtml:Fo(D.rulesUnavailable,"muted")});let o=Ca({pitfalls:e.activeRules.map(Rme),text:t}).map(s=>({id:s.id,title:s.symptom,avoidance:s.avoidance})),n=bv({prompt:t,matched:o});return Hp({projectId:e.projectId,promptValue:t,resultHtml:ex({matched:o,tokens:n}),usageHtml:$8({projectId:e.projectId,prompt:t,usage:e.usage,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})})}});var B8=a(()=>{"use strict";cI();ZI();Qv();tx();ox();U8()});var G8,K8=a(()=>{"use strict";gt();UP();B8();G8=async e=>{if(e.prompt===null)return aA({projectId:e.projectId,prompt:null,activeRules:[],usage:null});let t=e.cloudConfig===null?{ok:!1,reason:"not_connected"}:await yv({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:e.projectId,pairingHeaderName:Q}),r=e.pitfalls,o=r==null||!r.ok,n=o?null:r.items.filter(s=>s.source!=="retired");return aA({projectId:e.projectId,prompt:e.prompt,activeRules:n,rulesUnavailable:o,usage:t,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})}});var sx,V8,q8=a(()=>{"use strict";gt();UP();sx=(e,t)=>e.get(t)?.trim()??"",V8=async e=>{let t=new URLSearchParams(e.rawBody),r=sx(t,"projectId"),o=sx(t,"ruleId"),n=sx(t,"rulePrompt");if(r.length===0||o.length===0)return{kind:"not_found"};let s=n.length>0?`&rulePrompt=${encodeURIComponent(n)}`:"",i=`/project?id=${encodeURIComponent(r)}&tab=harness${s}`;if(e.cloudConfig===null)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent("unavailable")}`};let l=await hv({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:r,ruleId:o,action:e.action,pairingHeaderName:Q});if(!l.ok)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent(l.reason)}&ruleChangeAction=${e.action}`};if(e.action==="drop"&&l.data.changed){let c=new URLSearchParams({id:r,tab:"harness",ruleDropped:l.data.rule.ruleId,ruleDroppedTitle:l.data.rule.title});return n.length>0&&c.set("rulePrompt",n),{kind:"redirect",location:`/project?${c.toString()}`}}return{kind:"redirect",location:i}}});var J8=a(()=>{"use strict"});var ui,Eme,ix,Y8=a(()=>{"use strict";yS();nw();ui=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Eme=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,ix=e=>{let t=e.flashError?`<div class="alert-error">${ui(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ui(e.flashMessage)}</div>`:"",r=Eu({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in AgentWitch Cloud",body:"Projects are created in the browser. This page chooses their folders on this computer and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in AgentWitch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${ui(Eme(s))}</span>`:"",l=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${ui(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=eh(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from AgentWitch Cloud? The folder on this computer stays.');">
                  <input type="hidden" name="projectId" value="${ui(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${ui(n.name)}</strong>
                  <span class="muted mono">${ui(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${l}${u}${g}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this computer</h1>
      <p class="lede">Synced from AgentWitch Cloud for this paired computer only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var X8=a(()=>{"use strict";J8();nh();Y8()});var lA,Z8=a(()=>{"use strict";lA=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var Q8,_r,ax=a(()=>{"use strict";Q8=m(require("node:path"));Tt();Ue();q();Z();BE();_r=e=>{let t=H()?.layout.installDir??L();if(Q8.default.basename(t)===Lr)return wt;let r=H(),o=r!==null?Ge(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):wt}});var lx,e3=a(()=>{"use strict";jr();ax();lx=async e=>{let t=Be(e.installDir),r=t?.bundleVersion??null,o=_r(t);try{let n=await sa(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:ls(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var cx,t3=a(()=>{"use strict";cx=e=>!e});var dx,Rl,ux=a(()=>{"use strict";q();dx=()=>`http://127.0.0.1:${$i()}/update/run`,Rl=async e=>{try{let t=await fetch(dx(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var wme,r3,px,o3=a(()=>{"use strict";q();pe();ux();wme=()=>{co({launchAgentLabel:Re(),installDir:L()})},r3=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},px=async()=>{wme();let e=await Rl({force:!0});if(e.ok)return{ok:!0,message:r3(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:r3(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(jr(),TH)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var mx=a(()=>{"use strict";$C();Z8();ax();e3();t3();o3();ux()});var n3,s3=a(()=>{"use strict";n3=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var i3,a3,gx,fx,l3=a(()=>{"use strict";i3=require("node:crypto"),a3=m(require("node:fs"));xt();Z();Z();s3();gx=!1,fx=async e=>{if(gx)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!n3(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let o=K({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&a3.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,i3.randomUUID)();gx=!0;try{if(await GE(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let l=await fa({...r,workspace:n},e.writerAgent,t);return await zd(o,s,l.exitCode,l.output)?{ok:l.exitCode===0,agentRunId:s,...l.exitCode===0?{}:{errorMessage:l.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{gx=!1}}});var c3=a(()=>{"use strict";l3()});var ro,Fp=a(()=>{"use strict";ro=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var Nt,ge,kr,pi,d3,On,ce,cA,dA,u3,uA,pA,mA,gA,yx,hx,Sx,te=a(()=>{"use strict";Nt="history",ge="skills",kr="_drafts",pi="_tombstones",d3="state.json",On="meta.json",ce="skillgen",cA="episodes.json",dA="budget.json",u3="metrics.jsonl",uA="SKILL.md",pA="meta.json",mA="learned-pitfalls.json",gA="flags.json",yx="index",hx="store.db",Sx="acks"});var mi,m3,kt,fe,Dt=a(()=>{"use strict";mi=m(require("node:fs")),m3=m(require("node:path"));te();kt=e=>{mi.default.mkdirSync(e,{recursive:!0,mode:448});try{mi.default.chmodSync(e,448)}catch{}},fe=(e,t)=>{kt(m3.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;mi.default.writeFileSync(r,t,{mode:384});try{mi.default.chmodSync(r,384)}catch{}mi.default.renameSync(r,e);try{mi.default.chmodSync(e,384)}catch{}}});var gi,V,de,oe=a(()=>{"use strict";gi=m(require("node:path"));q();Fp();Dt();te();V=e=>{if(!ro(e))throw new Error("invalid_project_id");let t=j();return gi.default.join(t.projectDataDir,e)},de=e=>{let t=V(e);kt(t),kt(gi.default.join(t,Nt));let r=gi.default.join(t,ge);return kt(r),kt(gi.default.join(r,kr)),kt(gi.default.join(r,pi)),kt(gi.default.join(t,ce)),t}});var Px,Ax,fA=a(()=>{"use strict";Px=/^[a-z0-9][a-z0-9_-]{0,63}$/,Ax="sha256:"});var g3,it,$p=a(()=>{"use strict";g3=require("node:crypto");fA();it=e=>`${Ax}${(0,g3.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var fi,zp=a(()=>{"use strict";fA();fi=e=>Px.test(e)});var Up,yA=a(()=>{"use strict";Up=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var bx,_x=a(()=>{"use strict";bx=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var kx,Rx=a(()=>{"use strict";zp();kx=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>fi(r.skillId))}catch{return[]}}});var Ex,wx=a(()=>{"use strict";Ex=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var Tx,Cx=a(()=>{"use strict";$p();Tx=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:it(t.body)===t.contentHash?t:null}catch{return null}}});var Lx,Ix=a(()=>{"use strict";$p();zp();Lx=async e=>{if(!fi(e.skillId))return{ok:!1,code:"unavailable"};let t=it(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var vx,xx=a(()=>{"use strict";zp();vx=async e=>{if(!fi(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var Wx,Ox=a(()=>{"use strict";$p();yA();Cx();Ix();Wx=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await Tx({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(Up({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||it(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let l=await Lx({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return l.ok?l.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:l.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var Mx,jx=a(()=>{"use strict";yA();xx();Mx=async e=>Up({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await vx({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var Bp,hA,f3=a(()=>{"use strict";_x();Rx();wx();Ox();jx();Bp="[project-skill-pull-mirror]",hA=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await bx({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await Ex({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(Bp,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await Wx({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(u){console.warn(Bp,"skill_failed",d.skillId,u),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let l=await kx({port:t,projectId:e.projectId});for(let d of l)if(!s.has(d.skillId))try{i.push(await Mx({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(u){console.warn(Bp,"orphan_tombstone_failed",d.skillId,u),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(Bp,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(Bp,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var yi=a(()=>{"use strict";fA();$p();zp();yA();_x();Rx();wx();Cx();Ix();xx();Ox();jx();f3()});var hi,Gp,Tme,Cme,Dx,Hx=a(()=>{"use strict";hi=m(require("node:fs")),Gp=m(require("node:path"));Dt();yi();te();oe();Tme=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Cme=e=>`v${String(e).padStart(4,"0")}.md`,Dx=e=>{if(!Tme(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=de(e.projectId),r=Gp.default.join(t,ge,e.skillId),o=Gp.default.join(r,Cme(e.version)),n=Gp.default.join(r,On),s=it(e.body);if(hi.default.existsSync(o)&&hi.default.existsSync(n))try{let l=JSON.parse(hi.default.readFileSync(n,"utf8"));if(l.version===e.version&&l.contentHash===s&&hi.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}fe(o,e.body),fe(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=Gp.default.join(t,ge,pi,`${e.skillId}.json`);return hi.default.existsSync(i)&&hi.default.unlinkSync(i),{path:o,contentHash:s}}});var Kp,SA,Fx,$x=a(()=>{"use strict";Kp=m(require("node:fs")),SA=m(require("node:path"));yi();te();oe();Fx=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=V(e.projectId)}catch{return null}let r=SA.default.join(t,ge,e.skillId),o=SA.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=SA.default.join(r,On);if(!Kp.default.existsSync(o)||!Kp.default.existsSync(n))return null;try{let s=Kp.default.readFileSync(o,"utf8"),i=JSON.parse(Kp.default.readFileSync(n,"utf8")),l=typeof i.contentHash=="string"?i.contentHash:null;return l===null||i.version!==e.version||it(s)!==l?null:{body:s,contentHash:l}}catch{return null}}});var $o,Mn,y3,Lme,zx,Ux,Bx=a(()=>{"use strict";$o=m(require("node:fs")),Mn=m(require("node:path"));Dt();te();oe();y3=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Lme=(e,t)=>{if(!$o.default.existsSync(e))return;let r=`.${t}.`;for(let o of $o.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=Mn.default.join(e,o);try{$o.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},zx=e=>{if(!y3(e.skillId))throw new Error("invalid_project_skill_id");let t=de(e.projectId),r=Mn.default.join(t,ge),o=Mn.default.join(r,e.skillId),n=!1;if($o.default.existsSync(o)){let c=Mn.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{$o.default.renameSync(o,c),$o.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}Lme(r,e.skillId);let s=Mn.default.join(r,pi);kt(s);let i=Mn.default.join(s,`${e.skillId}.json`),l={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return fe(i,`${JSON.stringify(l)}
`),{removed:n}},Ux=e=>{if(!y3(e.skillId))return null;let t;try{t=V(e.projectId)}catch{return null}let r=Mn.default.join(t,ge,pi,`${e.skillId}.json`);if(!$o.default.existsSync(r))return null;try{let o=JSON.parse($o.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var Vp,Gx,Kx,Vx=a(()=>{"use strict";Vp=m(require("node:fs")),Gx=m(require("node:path"));te();oe();Kx=e=>{let t;try{t=V(e.projectId)}catch{return[]}let r=Gx.default.join(t,ge);if(!Vp.default.existsSync(r))return[];let o=[];for(let n of Vp.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=Gx.default.join(r,n,On);if(Vp.default.existsSync(s))try{let i=JSON.parse(Vp.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var qx,Jx=a(()=>{"use strict";qx=e=>e.toMembershipId===null&&e.toUserId===null&&e.toTeamLabel===null});var h3,Ime,vme,xme,Wme,Yx,S3,P3,LQe,IQe,Ome,vQe,Mme,jme,xQe,Xx=a(()=>{"use strict";h3=(e,t)=>{let r=process.env[e]?.trim();if(!r)return t;let o=Number.parseInt(r,10);return Number.isFinite(o)&&o>0?o:t},Ime="peer.silent",vme="peer.silent_blocked",xme="composer.recipient_sticky_cleared",Wme="project.updated",Yx=[Ime,vme,xme],S3="System",P3="Owner",LQe=5*6e4,IQe=10*6e4,Ome=300,vQe=h3("AWC_PROJECT_MESSAGE_HOURLY_CAP",Ome),Mme=300,jme=h3("AWC_PROJECT_MESSAGE_UNREAD_CAP",Mme),xQe=["peer.joined","peer.left","peer.renamed",Wme,...Yx]});var PA,Zx=a(()=>{"use strict";Xx();PA="whole"});var Nme,Qx,A3=a(()=>{"use strict";Jx();Zx();Nme=e=>e==="owner"||e==="member",Qx=e=>{let{row:t}=e;return t.senderKind==="owner"||t.senderKind==="member"?qx(t)?PA:t.toMembershipId!==null&&e.botIds.has(t.toMembershipId)?t.toMembershipId:null:t.senderKind!=="bot"||t.senderMembershipId===null||!e.botIds.has(t.senderMembershipId)||!Nme(t.recipientKind)?null:e.inReplyTo!==null&&e.wholeMessageIds.has(e.inReplyTo)?PA:t.senderMembershipId}});var Dme,eW,b3=a(()=>{"use strict";Dme=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,eW=e=>{let t=Dme.exec(e);if(t===null)return{inReplyTo:null,text:e};let r=e.replace(new RegExp(`${t[0]}\\s*:?`)," ").replace(/\s+/g," ").trim();return{inReplyTo:t[0].toLowerCase(),text:r.length>0?r:e}}});var Hme,tW,_3=a(()=>{"use strict";Xx();Hme=new Set(Yx),tW=e=>e.sender_membership_id===null||e.sender_membership_id===void 0?Hme.has(String(e.kind))?S3:P3:e.sender_display_name?String(e.sender_display_name):null});var rW=a(()=>{"use strict";A3();Jx();Zx();b3();_3()});var AA,at,qp=a(()=>{"use strict";AA=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},at=(e,t)=>{for(let r of t){let o=AA(e[r]);if(o!==null)return o}return null}});var oW,nW=a(()=>{"use strict";rW();qp();oW=e=>{let t=at(e,["fromProjectDisplayName","senderLabel","sender_label"]);return t!==null?t:tW({sender_membership_id:e.sender_membership_id??e.fromMembershipId??e.senderMembershipId??null,sender_display_name:e.sender_display_name??e.senderDisplayName??null,kind:e.kind})}});var k3,R3=a(()=>{"use strict";qp();k3=e=>{let t=at(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),r=at(e,["toMembershipId","to_membership_id"]);return t===null&&r!==null?new Set([r]):t!==null&&r===null?new Set([t]):t!==null&&r!==null?new Set([r]):new Set}});var E3,Fme,sW,iW=a(()=>{"use strict";rW();R3();qp();E3=(e,t,r)=>e===null?r:t.has(e)?"bot":r,Fme=(e,t)=>{let r=at(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),o=at(e,["toMembershipId","to_membership_id"]),n=at(e,["toUserId","to_user_id"]),s=at(e,["toTeamLabel","to_team_label"]),i=E3(r,t,"owner"),l=o!==null?E3(o,t,"member"):n!==null?"owner":"none";return{messageId:at(e,["messageId","id"])??"unknown",kind:AA(e.kind)??"chat.note",summary:AA(e.summary)??"",createdAt:at(e,["createdAt","created_at"])??new Date(0).toISOString(),senderKind:i,senderMembershipId:r,senderUserId:"history-local",senderDisplayName:null,recipientKind:l,toMembershipId:o,toUserId:n,toTeamLabel:s}},sW=e=>{let t=at(e.message,["threadKey","thread_key"]);if(t!==null)return t;let r=e.botIds??k3(e.message),o=Fme(e.message,r),n=at(e.message,["inReplyTo","in_reply_to"])??(o.senderKind==="bot"?eW(o.summary).inReplyTo:null);return Qx({row:o,botIds:r,wholeMessageIds:e.wholeMessageIds??new Set,inReplyTo:n})}});var aW,lW,We=a(()=>{"use strict";aW="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM",lW="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM_DRY_RUN"});var cW,dW=a(()=>{"use strict";nW();iW();We();qp();cW=e=>{let t=at(e.message,["createdAt","created_at"])??e.savedAt;return{messageId:e.messageId,projectId:e.projectId,message:e.message,savedAt:e.savedAt,version:2,threadKey:sW({message:e.message,botIds:e.botIds,wholeMessageIds:e.wholeMessageIds}),createdAt:t,senderLabel:oW(e.message)}}});var zo,Si=a(()=>{"use strict";zo="message"});var uW,w3,Jp,bA=a(()=>{"use strict";uW=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},w3=(e,t)=>{for(let r of t){let o=uW(e[r]);if(o!==null)return o}return null},Jp=e=>{let t=e,r=uW(t.threadKey)??w3(e.message,["threadKey","thread_key"]),o=uW(t.createdAt)??w3(e.message,["createdAt","created_at"])??e.savedAt;return{threadKey:r,createdAt:o}}});var T3,C3=a(()=>{"use strict";Si();T3=`
CREATE TABLE IF NOT EXISTS history_store_meta (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS records (
  message_id TEXT NOT NULL PRIMARY KEY,
  project_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  thread_key TEXT,
  created_at TEXT NOT NULL,
  saved_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS records_project_thread_created_idx
  ON records (project_id, thread_key, created_at);

CREATE INDEX IF NOT EXISTS records_project_created_idx
  ON records (project_id, created_at);
`});var L3,I3,v3=a(()=>{"use strict";L3=m(require("node:path"));te();oe();I3=e=>L3.default.join(V(e),yx,hx)});var x3,W3,Ume,Bme,jn,Nn,wl=a(()=>{"use strict";x3=m(require("node:fs")),W3=m(require("node:path"));Gr();Si();C3();v3();Ume=e=>{let t=e.prepare("SELECT value FROM history_store_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},Bme=(e,t)=>{e.prepare(`INSERT INTO history_store_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},jn=e=>{let t=vt();if(!t.ok)return{ok:!1,reason:t.reason};let r=I3(e);x3.default.mkdirSync(W3.default.dirname(r),{recursive:!0,mode:448});let o=new t.sqlite.DatabaseSync(r);return o.exec(`PRAGMA busy_timeout = ${3e3}`),o.exec(T3),Ume(o)<1&&Bme(o,1),{ok:!0,db:o}},Nn=e=>{e.close()}});var Gme,_A,kA=a(()=>{"use strict";Si();bA();wl();Gme="[project-history-index]",_A=e=>{let t=jn(e.record.projectId);if(!t.ok)return{ok:!1,reason:t.reason};let{threadKey:r,createdAt:o}=Jp(e.record),n=e.kind??zo;try{return t.db.prepare(`INSERT INTO records (message_id, project_id, kind, thread_key, created_at, saved_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(message_id) DO UPDATE SET
           project_id = excluded.project_id,
           kind = excluded.kind,
           thread_key = excluded.thread_key,
           created_at = excluded.created_at,
           saved_at = excluded.saved_at`).run(e.record.messageId,e.record.projectId,n,r,o,e.record.savedAt),{ok:!0,threadKey:r,createdAt:o}}catch(s){return console.error(Gme,"ingest_failed",e.record.projectId,e.record.messageId,s),{ok:!1,reason:"ingest_failed"}}finally{Nn(t.db)}}});var mW,M3,Kme,Vme,O3,gW,fW=a(()=>{"use strict";mW=m(require("node:fs")),M3=m(require("node:path"));Dt();dW();kA();te();oe();Kme="[project-history-write]",Vme=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),O3=e=>{try{_A({record:e})}catch(t){console.error(Kme,"index_ingest_failed",e.projectId,e.messageId,t)}},gW=e=>{let t=e.messageId.trim();if(!Vme(t))throw new Error("invalid_message_id");let r=de(e.projectId),o=M3.default.join(r,Nt,`${t}.json`);if(mW.default.existsSync(o))try{let s=JSON.parse(mW.default.readFileSync(o,"utf8"));if(s.messageId===t)return O3(s),s}catch{}let n=cW({messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString(),botIds:e.botIds,wholeMessageIds:e.wholeMessageIds});return fe(o,`${JSON.stringify(n)}
`),O3(n),n}});var Yp,j3,N3,Dn,Tl,yW,Pi=a(()=>{"use strict";Yp=m(require("node:fs")),j3=m(require("node:path"));Dt();te();oe();q();N3=e=>j3.default.join(V(e),Nt,d3),Dn=e=>{try{let t=N3(e);if(!Yp.default.existsSync(t))return null;let r=JSON.parse(Yp.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},Tl=e=>{de(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return fe(N3(e.projectId),`${JSON.stringify(t)}
`),t},yW=()=>{let t=j().projectDataDir;if(!Yp.default.existsSync(t))return[];let r=[];for(let o of Yp.default.readdirSync(t)){if(!ro(o))continue;let n=Dn(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var D3,H3=a(()=>{"use strict";gt();D3=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[Q]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var hW,SW=a(()=>{"use strict";hW=e=>{let t=e.deviceId.trim(),r=e.messageId.trim();if(t.length===0)throw new Error("invalid_device_id");if(r.length===0)throw new Error("invalid_message_id");let o=e.ackedAt??new Date().toISOString();return{deviceId:t,messageId:r,ackedAt:o,lastSeenAt:e.lastSeenAt??o}}});var PW,$3,F3,AW,bW=a(()=>{"use strict";PW=m(require("node:fs")),$3=m(require("node:path"));Dt();SW();te();oe();F3=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),AW=e=>{let t=e.messageId.trim(),r=e.deviceId.trim();if(!F3(t)||!F3(r))throw new Error("invalid_ack_ids");let o=de(e.projectId),n=$3.default.join(o,Nt,Sx,`${t}.json`),s=e.nowIso??new Date().toISOString();if(PW.default.existsSync(n))try{let l=JSON.parse(PW.default.readFileSync(n,"utf8"));if(l.messageId===t&&l.deviceId===r&&typeof l.ackedAt=="string"){let c={...l,lastSeenAt:s};return fe(n,`${JSON.stringify(c)}
`),c}}catch{}let i=hW({deviceId:r,messageId:t,ackedAt:s,lastSeenAt:s});return fe(n,`${JSON.stringify(i)}
`),i}});var Cl,z3,qme,_W,U3=a(()=>{"use strict";zr();Z();Pi();H3();bW();fW();Cl="[project-history-dispatch]",z3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qme=()=>{let e=H();return e===null?null:K({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},_W=async e=>{if(!z3(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!z3(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{gW({projectId:t,messageId:o,message:r}),Tl({projectId:t,state:"on_ready"});let s=typeof e.deviceId=="string"?e.deviceId.trim():"";if(s.length>0)try{AW({projectId:t,deviceId:s,messageId:o})}catch(i){console.error(Cl,"local_ack_failed",t,o,i)}}catch(s){console.error(Cl,"write_failed",t,o,s);try{Tl({projectId:t,state:"degraded"})}catch(i){console.error(Cl,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?qme():e.cloudApi;if(n===null)return console.error(Cl,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await D3({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(Cl,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(Cl,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var kW,RW=a(()=>{"use strict";Vx();Pi();$x();oe();Bx();Hx();kW=()=>({isHistoryEnabled:e=>{let t=Dn(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>V(e),writeProjectSkillVersion:e=>Dx(e),readProjectSkillVersion:e=>Fx(e),tombstoneProjectSkill:e=>zx(e),readProjectSkillTombstone:e=>Ux(e),listProjectSkillIds:e=>Kx(e)})});var B3,EW,wW=a(()=>{"use strict";gt();B3=e=>({[Q]:e,Accept:"application/json"}),EW=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:B3(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let l=s;return{skillId:l.skillId,publishedVersion:l.publishedVersion,contentHash:l.contentHash,...typeof l.skillRowId=="string"?{skillRowId:l.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:B3(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var TW,CW=a(()=>{"use strict";We();TW=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var LW,IW=a(()=>{"use strict";We();LW=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(u=>u.createdAtMs)),i=n.length>=t,l=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!l&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":l?"idle":"max_interval",messageIds:n.map(u=>u.messageId)}}});var Il,RA=a(()=>{"use strict";We();Il=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var Y3,X3,Yme,EA,vW=a(()=>{"use strict";We();Y3=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),X3=e=>e.trim().toLowerCase().replace(/\s+/g," "),Yme=(e,t)=>{let r=new Set(e.map(X3).filter(i=>i.length>0)),o=new Set(t.map(X3).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},EA=e=>{let t=e.nearDupJaccard??.6,r=Y3(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(Y3(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(Yme(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var xW,WW=a(()=>{"use strict";xW=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var OW,Zme,MW,Qme,jW,NW=a(()=>{"use strict";We();OW=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},Zme=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,MW=e=>Zme.test(e),Qme=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,jW=e=>Qme.test(e)});var Xp,wA=a(()=>{"use strict";Xp=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var Z3,vl,Q3,Zp=a(()=>{"use strict";ut();Z3=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,vl=e=>{let t=an(e),r=t.scrubbed.match(Z3)?.length??0,o=t.scrubbed.replace(Z3,"[redacted-email]");return{scrubbed:o,residualSecret:od(o),replacementCount:t.replacementCount+r}},Q3=e=>od(e)});var DW,HW,FW,Qp=a(()=>{"use strict";DW=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],HW={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},FW=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var $W,zW=a(()=>{"use strict";Qp();$W=(e,t)=>{let r=HW[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var ege,oo,BW=a(()=>{"use strict";zW();We();ege=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},oo=e=>{let t=ege(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=$W(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var oge,e6,nge,sge,GW,em,TA=a(()=>{"use strict";We();Zp();oge=/^[a-z0-9][a-z0-9-]{0,63}$/,e6=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let l=i.indexOf(":");if(l<=0)continue;let c=i.slice(0,l).trim(),d=i.slice(l+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},nge=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,sge=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},GW=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(Q3(o))return{ok:!1,reason:"residual_secret"};let s=e6(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:l}=s,c=i.name??"";if(!oge.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let u=i.version??"";if(u.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let g=sge(i.source_message_ids??i.source_message_ids);if(g===null||g.length===0)return{ok:!1,reason:"missing_source_message_ids"};let f=nge(l);return f<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:u,sourceMessageIds:g,stepCount:f,bodyBytes:n}},em=e=>(((e6(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var r6,ige,no,CA,LA=a(()=>{"use strict";r6=require("node:crypto");yi();We();CW();IW();RA();vW();WW();NW();wA();Zp();BW();TA();ige=e=>Math.ceil(e.length/4),no=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),CA=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??ige,l=e.messages.map(u=>u.text).join(`
`),c=(u,g,f)=>{r.push(Xp({projectId:t.projectId,episodeId:t.episodeId,fromState:u,toState:g,reason:f,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let u=0;u<16;u+=1){let g=Il({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let f=LW({messages:e.messages.map(P=>({messageId:P.messageId,createdAtMs:P.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),y=oo({state:t.state,verdict:{kind:"close",ready:f.ready}});if(!y.ok)break;let A=t.state;t=no(t,y.nextState,f.ready?f.reason:null,{messageIds:f.ready?f.messageIds:t.messageIds,closedAtMs:f.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(P=>jW(P.text)),hasSuccessSignal:e.messages.some(P=>MW(P.text))}),c(A,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(g.capReached){let P=oo({state:t.state,verdict:{kind:"draft_cap",reached:!0}});P.ok&&(c(t.state,P.nextState,"draft_cap_reached"),t=no(t,P.nextState,"draft_cap_reached"));break}let f=TW({tokensUsedToday:e.tokensUsedToday+n}),y=oo({state:t.state,verdict:{kind:"budget",ok:f.ok}});if(!y.ok)break;let A=t.state;t=no(t,y.nextState,f.ok?"budget_ok":f.reason),c(A,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let f=vl(l),y=oo({state:t.state,verdict:{kind:"scrub",residualSecret:f.residualSecret}});if(!y.ok)break;let A=t.state;t=no(t,y.nextState,f.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:f.scrubbed}),c(A,t.state,t.reason);continue}if(t.state==="TRIAGE"){let f=OW({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),y=oo({state:t.state,verdict:{kind:"qualify",ok:f.ok}});if(!y.ok)break;let A=t.state;t=no(t,y.nextState,f.reason),c(A,t.state,t.reason);continue}if(t.state==="DEDUP"){let f=it(t.scrubbedTranscript??l),y=EA({contentHash:f,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((y.action==="create_new"||y.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let A=oo({state:t.state,verdict:{kind:"dedup",action:y.action}});if(!A.ok)break;let P=t.state;t=no(t,A.nextState,y.action,{contentHash:f,mergeDraftId:y.action==="update_draft"?y.draftId:t.mergeDraftId}),c(P,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let f=t.scrubbedTranscript??"",y=xW({estimatedInputTokens:i(f),inputTokenCap:12e3}),A=await e.deps.ownerLlm({scrubbedTranscript:f,similarDraftHints:[],mode:y});n+=A.tokensUsed;let P=oo({state:t.state,verdict:{kind:"extract",ok:A.ok}});if(!P.ok)break;let S=t.state;A.ok&&(s=A.skillMarkdown),t=no(t,P.nextState,A.ok?"extract_ok":A.reason,{tokensUsed:t.tokensUsed+A.tokensUsed}),c(S,t.state,t.reason);continue}if(t.state==="VALIDATE"){let f=s??"",y=GW({skillMarkdown:f}),A=t.validateAttempts+(y.ok?0:1),P=oo({state:t.state,verdict:{kind:"validate",ok:y.ok,attempts:y.ok?t.validateAttempts:Math.max(1,A)}});if(!P.ok)break;let S=t.state;if(y.ok){let p=it(f),b=em(f),C=EA({contentHash:p,name:y.name,stepLines:b,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(C.action==="skip_exact"){t=no(t,"SKIPPED_DEDUP","skip_exact",{contentHash:p,validateAttempts:A}),c(S,t.state,"skip_exact");break}let h=C.action==="update_draft"?C.draftId:t.mergeDraftId??(0,r6.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:h,skillMarkdown:f,episodeId:t.episodeId,sourceMessageIds:y.sourceMessageIds,name:y.name,description:y.description}),t=no(t,P.nextState,"validate_ok",{draftId:h,contentHash:o.contentHash,validateAttempts:A}),c(S,t.state,t.reason);break}if(P.nextState==="EXTRACT"&&(s=null),t=no(t,P.nextState,y.reason,{validateAttempts:A}),c(S,t.state,t.reason),P.nextState==="EXTRACT"&&A>1)break;continue}break}let d=Il({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var KW,VW,tm,IA=a(()=>{"use strict";KW=m(require("node:fs")),VW=m(require("node:path"));Dt();te();oe();tm=e=>{if(e.events.length===0)return;let t=de(e.projectId),r=VW.default.join(t,ce);kt(r);let o=VW.default.join(r,u3),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;KW.default.appendFileSync(o,n,{mode:384});try{KW.default.chmodSync(o,384)}catch{}}});var xl,vA=a(()=>{"use strict";xl=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var i6,o6,n6,lge,cge,qW,JW=a(()=>{"use strict";i6=require("node:crypto");We();vA();Zp();o6=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,n6=e=>e.toLowerCase().replace(/_/g," "),lge=(e,t)=>`sha256:${(0,i6.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,cge=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},qW=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],l=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():n6(c.state),u=vl(d);if(u.residualSecret){l+=1;continue}let g=`Avoid repeating this history failure (${n6(c.state)}).`,f=vl(g);if(f.residualSecret){l+=1;continue}let y=o6(u.scrubbed.replace(/\s+/g," ").trim(),120),A=o6(f.scrubbed.replace(/\s+/g," ").trim(),280);if(y.length===0||A.length===0)continue;let P=xl(`${y}|${A}`);if(n.has(P))continue;n.add(P);let S=lge(y,A),p=`- **${y}:** ${A}`;s.length<t&&s.push(p),i.length<r&&i.push({id:cge(c.episodeId,S),symptom:y,avoidance:A,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:S,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:l}}});var dge,YW,XW=a(()=>{"use strict";vA();We();dge=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},YW=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?dge(n[3]??""):[],i=new Set(s.map(g=>xl(g))),l=[...s],c=0;for(let g of e.newPitfallLines){let f=g.trim();if(f.length===0)continue;let y=f.startsWith("- ")?f:`- ${f}`,A=xl(y);if(!i.has(A)){if(l.length>=t)break;i.add(A),l.push(y),c+=1}}let d=l.length>0?`${l.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(f,y,A)=>`${y}${A}${d}`),appendedCount:c,totalPitfallBullets:l.length};let u=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${u}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:l.length}}});var ZW,l6,a6,OA,QW,e0=a(()=>{"use strict";ZW=m(require("node:fs")),l6=m(require("node:path"));te();oe();a6="[project-history-skillgen]",OA=()=>({items:[],updatedAt:new Date(0).toISOString()}),QW=e=>{let t=l6.default.join(V(e),ce,mA);if(!ZW.default.existsSync(t))return OA();try{let r=JSON.parse(ZW.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(a6,"learned_pitfalls_corrupt",e),OA()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:OA().updatedAt}}catch(r){return console.error(a6,"learned_pitfalls_read_failed",e,r),OA()}}});var uge,c6,d6=a(()=>{"use strict";uge=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],c6=e=>uge.includes(e)});var t0,r0=a(()=>{"use strict";d6();t0=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||c6(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var o0,rm,pge,om,MA,jA=a(()=>{"use strict";o0=m(require("node:fs")),rm=m(require("node:path"));yi();Dt();te();oe();pge=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),om=e=>{if(!pge(e.draftId))throw new Error("invalid_draft_id");let t=de(e.projectId),r=rm.default.join(t,ge,kr,e.draftId);kt(r);let o=rm.default.join(r,uA),n=rm.default.join(r,pA),s=it(e.skillMarkdown);return fe(o,e.skillMarkdown),fe(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},MA=e=>{let t=de(e),r=rm.default.join(t,ge,kr);return o0.default.existsSync(r)?o0.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var u6,n0,s0=a(()=>{"use strict";u6=m(require("node:path"));Dt();te();oe();n0=e=>{let t=de(e.projectId),r=u6.default.join(t,ce,mA),o={...e.file,updatedAt:new Date().toISOString()};return fe(r,`${JSON.stringify(o)}
`),o}});var i0,m6,p6,NA,mge,nm,DA=a(()=>{"use strict";i0=m(require("node:fs")),m6=m(require("node:path"));te();oe();p6="[project-history-skillgen]",NA=()=>({historyLearnedPitfalls:null,skillgenDraftsReview:null,updatedAt:new Date(0).toISOString()}),mge=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.active!="boolean"||typeof t.openDraftCount!="number"||typeof t.maxOpenDrafts!="number"||typeof t.miningPaused!="boolean"||typeof t.notifiedAt!="string"||typeof t.summary!="string"?null:{active:t.active,openDraftCount:Math.max(0,t.openDraftCount),maxOpenDrafts:Math.max(0,t.maxOpenDrafts),miningPaused:t.miningPaused,notifiedAt:t.notifiedAt,summary:t.summary}},nm=e=>{let t=m6.default.join(V(e),ce,gA);if(!i0.default.existsSync(t))return NA();try{let r=JSON.parse(i0.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return console.error(p6,"flags_corrupt",e),NA();let o=r;return{historyLearnedPitfalls:o.historyLearnedPitfalls??null,skillgenDraftsReview:mge(o.skillgenDraftsReview),updatedAt:typeof o.updatedAt=="string"?o.updatedAt:NA().updatedAt}}catch(r){return console.error(p6,"flags_read_failed",e,r),NA()}}});var g6,sm,HA=a(()=>{"use strict";g6=m(require("node:path"));Dt();te();oe();sm=e=>{let t=de(e.projectId),r=g6.default.join(t,ce,gA),o={historyLearnedPitfalls:e.file.historyLearnedPitfalls,skillgenDraftsReview:e.file.skillgenDraftsReview??null,updatedAt:new Date().toISOString()};return fe(r,`${JSON.stringify(o)}
`),o}});var l0,f6,a0,gge,fge,FA,c0,d0=a(()=>{"use strict";l0=m(require("node:fs")),f6=m(require("node:path"));IA();JW();XW();We();e0();wA();r0();jA();s0();DA();HA();a0="[project-history-skillgen]",gge=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},fge=e=>{try{let t=JSON.parse(l0.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},FA=e=>{try{tm({projectId:e.projectId,events:[Xp({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},c0=e=>{let t=new Date(e.nowMs).toISOString();try{let r=t0({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=qW({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=fge(e.draftWritten.metaPath),i=l0.default.readFileSync(e.draftWritten.skillPath,"utf8"),l=YW({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=l.appendedCount,l.skillMarkdown!==i&&om({projectId:e.projectId,draftId:f6.default.basename(e.draftWritten.draftDir),skillMarkdown:l.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(a0,"pitfalls_draft_merge_failed",e.projectId,s),FA({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=QW(e.projectId),i=gge(s.items,o.localEntries);n0({projectId:e.projectId,file:{items:i,updatedAt:t}});let l=nm(e.projectId);return sm({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},skillgenDraftsReview:l.skillgenDraftsReview,updatedAt:t}}),FA({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(a0,"pitfalls_store_failed",e.projectId,s),FA({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(a0,"pitfalls_attach_failed",e.projectId,r),FA({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var y6,u0,p0,m0=a(()=>{"use strict";y6=e=>e.length===0?"(none)":e.map(t=>`- ${t.name}: ${t.description}`).join(`
`),u0=e=>["You are preparing a reusable project skill from a scrubbed chat transcript.","Do NOT invent secrets. Summarize the procedure only.","Return a short reflection covering: goal, inputs, 3\u20138 concrete steps,","pitfalls, and how to verify success. Plain text, no SKILL.md yet.","","Similar existing drafts/skills to avoid overlap:",y6(e.similarDraftHints),"","Transcript:",e.scrubbedTranscript].join(`
`),p0=e=>{let t=e.reflection!==void 0&&e.reflection.trim().length>0?["","Prior reflection (use as outline):",e.reflection.trim(),""]:[""];return["Write ONE SKILL.md draft from the scrubbed transcript.","Output ONLY the markdown file: YAML frontmatter then body.","Frontmatter keys: name (kebab-case), description, version: 0.1.0,","source_message_ids: [] (ids unknown \u2014 leave empty array), status: draft.","Body sections: When to use, Inputs, Steps (3\u20138, use placeholders for specifics),","Pitfalls, Verification.","Avoid overlapping similar drafts/skills listed below.","","Similar existing drafts/skills:",y6(e.similarDraftHints),...t,"Transcript:",e.scrubbedTranscript].join(`
`)}});var g0,f0=a(()=>{"use strict";g0=e=>{let t=e.trim();if(t.length===0)return null;let r=t.match(/```(?:markdown|md|skill)?\s*\n([\s\S]*?)```/i);if(r?.[1]!==void 0&&r[1].trim().length>0)return r[1].trim();let o=t.indexOf("---");if(o>=0){let n=t.slice(o).trim();if(/^---[\s\S]*?\n---/.test(n))return n}return t.includes("## Steps")||t.includes("## When to use")?t:null}});var P6,A6,yge,hge,Sge,h6,b6,Pge,S6,y0,h0=a(()=>{"use strict";P6=require("node:child_process"),A6=m(require("node:os"));iP();We();m0();f0();yge="cursor",hge="codex",Sge=18e4,h6=e=>Math.ceil(e.length/4),b6=e=>new Promise(t=>{let r=Bt(e.writerAgent,e.prompt,Ae({}));if(r===null){t({ok:!1,reason:"writer_cli_unavailable",tokensUsed:0});return}let o=[],n=[],s=(0,P6.spawn)(r.command,[...r.args],{cwd:A6.default.homedir(),stdio:["ignore","pipe","pipe"]}),i=!1,l=d=>{i||(i=!0,clearTimeout(c),t(d))},c=setTimeout(()=>{s.kill("SIGTERM"),l({ok:!1,reason:"writer_timeout",tokensUsed:0})},e.timeoutMs);s.stdout.on("data",d=>{o.push(Buffer.from(d))}),s.stderr.on("data",d=>{n.push(Buffer.from(d))}),s.on("error",()=>l({ok:!1,reason:"writer_start_failed",tokensUsed:0})),s.on("close",()=>{let d=`${Buffer.concat(o).toString("utf8")}
${Buffer.concat(n).toString("utf8")}`;l({ok:!0,text:d,tokensUsed:h6(e.prompt)+h6(d)})})}),Pge=`---
name: history-skill-dry-run
description: Stub skill from owner-LLM dry-run (no CLI spawn).
version: 0.1.0
source_message_ids: []
status: draft
---
## When to use
Dry-run only.

## Inputs
- None

## Steps
1. Replace this stub with a real draft
2. Verify frontmatter and sections

## Pitfalls
- Dry-run never calls Cursor or Codex

## Verification
- Confirm SKILL.md validates locally
`,S6=async(e,t,r)=>{let o=await e({writerAgent:yge,prompt:t,timeoutMs:r});if(o.ok)return o;let n=await e({writerAgent:hge,prompt:t,timeoutMs:r});return n.ok?n:{ok:!1,reason:`cursor:${o.reason};codex:${n.reason}`,tokensUsed:o.tokensUsed+n.tokensUsed}},y0=(e={})=>{let t=e.runCli??b6,r=e.timeoutMs??Sge,o=e.dryRun===!0||process.env[lW]==="1";return async n=>{if(o)return{ok:!0,skillMarkdown:Pge,tokensUsed:1};let s,i=0;if(n.mode==="reflect_then_write"){let d=await S6(t,u0({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints}),r);if(i+=d.tokensUsed,!d.ok)return{ok:!1,reason:d.reason,tokensUsed:i};s=d.text}let l=await S6(t,p0({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints,mode:n.mode,reflection:s}),r);if(i+=l.tokensUsed,!l.ok)return{ok:!1,reason:l.reason,tokensUsed:i};let c=g0(l.text);return c===null?{ok:!1,reason:"empty_or_unparseable_skill_markdown",tokensUsed:i}:{ok:!0,skillMarkdown:c,tokensUsed:i}}}});var im,$A=a(()=>{"use strict";im=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var _6,k6=a(()=>{"use strict";Qp();_6=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&FW.includes(o.state))return o}return null}});var am,zA=a(()=>{"use strict";am=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var S0,R6,Age,Wl,lm=a(()=>{"use strict";S0=m(require("node:fs")),R6=m(require("node:path"));te();oe();Age=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},Wl=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=R6.default.join(V(e.projectId),Nt,`${t}.json`);if(!S0.default.existsSync(r))return null;try{let o=JSON.parse(S0.default.readFileSync(r,"utf8"));return Age(o)?o:null}catch{return null}}});var P0,E6,Ai,cm=a(()=>{"use strict";P0=m(require("node:fs")),E6=m(require("node:path"));te();lm();oe();Ai=e=>{let t=E6.default.join(V(e),Nt);if(!P0.default.existsSync(t))return[];let r=P0.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=Wl({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),l=Date.parse(s.savedAt);return i!==l?i-l:n.messageId.localeCompare(s.messageId)})}});var bi,UA,w6,T6=a(()=>{"use strict";bi=m(require("node:fs")),UA=m(require("node:path"));te();oe();TA();w6=e=>{let t=UA.default.join(V(e),ge,kr);if(!bi.default.existsSync(t))return[];let r=[];for(let o of bi.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=UA.default.join(t,o.name,uA),s=UA.default.join(t,o.name,pA);if(bi.default.existsSync(n))try{let i=bi.default.readFileSync(n,"utf8"),l="",c=o.name;if(bi.default.existsSync(s)){let d=JSON.parse(bi.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(l=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(l.length===0)continue;r.push({id:o.name,contentHash:l,name:c,stepLines:em(i)})}catch{}}return r}});var dm,A0,C6,L6=a(()=>{"use strict";dm=m(require("node:fs")),A0=m(require("node:path"));te();oe();C6=e=>{let t=A0.default.join(V(e),ge);if(!dm.default.existsSync(t))return[];let r=[];for(let o of dm.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=A0.default.join(t,o.name,On);if(dm.default.existsSync(n))try{let s=JSON.parse(dm.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var bge,b0,_0=a(()=>{"use strict";$A();cm();bge=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,b0=e=>{let t=Ai(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||bge(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:im(o)})}return r}});var I6,v6=a(()=>{"use strict";I6=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var x6,k0,R0=a(()=>{"use strict";x6=m(require("node:path"));Dt();te();oe();k0=e=>{let t=de(e.projectId),r=x6.default.join(t,ce,dA),o={...e.budget,updatedAt:new Date().toISOString()};return fe(r,`${JSON.stringify(o)}
`),o}});var W6,E0,w0=a(()=>{"use strict";W6=m(require("node:path"));Dt();te();oe();E0=e=>{let t=de(e.projectId),r=W6.default.join(t,ce,cA),o={...e.file,updatedAt:new Date().toISOString()};return fe(r,`${JSON.stringify(o)}
`),o}});var O6,M6=a(()=>{"use strict";IA();v6();R0();w0();O6=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,l=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],l=t.episode.lastMessageAtMs??l),E0({projectId:n,file:{episodes:I6(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:l,updatedAt:new Date(s).toISOString()}}),k0({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),tm({projectId:n,events:t.metrics})}});var BA,T0=a(()=>{"use strict";We();DA();HA();BA=e=>{try{let t=new Date(e.nowMs).toISOString(),r=e.maxOpenDrafts??20,o=nm(e.projectId),{reviewFlag:n}=e;sm({projectId:e.projectId,file:{historyLearnedPitfalls:o.historyLearnedPitfalls,skillgenDraftsReview:n.miningPaused?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!0,notifiedAt:t,summary:`Mining paused: ${n.draftWaitingCount}/${r} open skill drafts await review`}:n.draftWaitingCount>0?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!1,notifiedAt:t,summary:`${n.draftWaitingCount} skill draft(s) await owner review`}:null,updatedAt:t}})}catch{}}});var GA,C0=a(()=>{"use strict";GA=e=>new Date(e).toISOString().slice(0,10)});var KA,j6=a(()=>{"use strict";C0();KA=e=>({dayKey:GA(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var L0,D6,N6,_ge,I0,v0=a(()=>{"use strict";L0=m(require("node:fs")),D6=m(require("node:path"));j6();te();oe();C0();N6="[project-history-skillgen]",_ge=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=GA(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},I0=e=>{let t=D6.default.join(V(e.projectId),ce,dA);if(!L0.default.existsSync(t))return KA(e.nowMs);try{let r=JSON.parse(L0.default.readFileSync(t,"utf8")),o=_ge(r,e.nowMs);return o===null?(console.error(N6,"budget_corrupt",e.projectId),KA(e.nowMs)):o}catch(r){return console.error(N6,"budget_read_failed",e.projectId,r),KA(e.nowMs)}}});var VA,H6=a(()=>{"use strict";VA=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var x0,$6,F6,kge,Rge,Ege,W0,O0=a(()=>{"use strict";x0=m(require("node:fs")),$6=m(require("node:path"));H6();Qp();te();oe();F6="[project-history-skillgen]",kge=e=>typeof e=="string"&&DW.includes(e),Rge=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&kge(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},Ege=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(Rge);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},W0=e=>{let t=$6.default.join(V(e),ce,cA);if(!x0.default.existsSync(t))return VA();try{let r=JSON.parse(x0.default.readFileSync(t,"utf8")),o=Ege(r);return o===null?(console.error(F6,"episodes_corrupt",e),VA()):o}catch(r){return console.error(F6,"episodes_read_failed",e,r),VA()}}});var U6,wge,Tge,Cge,z6,M0,j0=a(()=>{"use strict";U6=require("node:crypto");LA();d0();h0();$A();k6();zA();cm();T6();L6();_0();Pi();M6();T0();We();RA();v0();O0();jA();wge="[project-history-skillgen]",Tge=e=>e!==void 0?e:process.env[aW]==="0"?null:y0(),Cge=(e,t)=>{let r=new Map;for(let o of Ai(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:im(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},z6=e=>{let t=e.messages[0],r=e.messages[e.messages.length-1];return{episodeId:(0,U6.randomUUID)(),projectId:e.projectId,state:"CAPTURING",messageIds:e.messages.map(o=>o.messageId),startedAtMs:t.createdAtMs,lastMessageAtMs:r.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}},M0=(e={})=>{let t=Tge(e.ownerLlm),r=e.nowMs??Date.now;return async o=>{try{let n=Dn(o.projectId);if(!am(n?.state))return;let s=r(),i=W0(o.projectId),l=I0({projectId:o.projectId,nowMs:s}),c=b0({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=MA(o.projectId),u=Il({openDraftCount:d,maxOpenDrafts:20});BA({projectId:o.projectId,reviewFlag:u,nowMs:s});let g=_6(i.episodes,o.projectId);if(u.miningPaused&&g!==null&&g.state==="EPISODE_READY"){let A=new Set(g.messageIds),P=c.filter(S=>!A.has(S.messageId));P.length>0&&(g=z6({projectId:o.projectId,messages:P}))}else if(g===null){if(c.length===0)return;g=z6({projectId:o.projectId,messages:c})}else if(g.state==="CAPTURING"&&c.length>0){let A=new Set(g.messageIds),P=[...g.messageIds],S=g.lastMessageAtMs;for(let p of c)A.has(p.messageId)||(P.push(p.messageId),A.add(p.messageId),S=Math.max(S,p.createdAtMs));g={...g,messageIds:P,lastMessageAtMs:S}}let f=Cge(o.projectId,g.messageIds);if(f.length===0)return;let y=await CA({episode:g,messages:f,tokensUsedToday:l.tokensUsedToday,lastClosedAtMs:l.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:om,listDraftFingerprints:()=>w6(o.projectId),listPublishedFingerprints:()=>C6(o.projectId),openDraftCount:()=>MA(o.projectId)}});if(O6({projectId:o.projectId,episodesFile:i,budget:l,result:y,nowMs:s}),BA({projectId:o.projectId,reviewFlag:y.reviewFlag,nowMs:s}),y.draftWritten!==null&&y.episode.state==="AWAITING_REVIEW"){let A=[...i.episodes.filter(P=>P.episodeId!==y.episode.episodeId),y.episode];c0({projectId:o.projectId,successEpisode:y.episode,episodes:A,draftWritten:y.draftWritten,nowMs:s})}}catch(n){console.error(wge,"run_failed",o.projectId,n)}}}});var B6,N0,qA,D0=a(()=>{"use strict";B6=m(require("node:fs")),N0=m(require("node:path"));te();oe();qA=e=>{let t=V(e);return[N0.default.join(t,ge,kr),N0.default.join(t,ce)].some(r=>B6.default.existsSync(r))}});var H0,G6,K6=a(()=>{"use strict";H0=m(require("node:fs"));q();D0();Fp();G6=()=>{let e=j().projectDataDir;if(!H0.default.existsSync(e))return[];let t=[];for(let r of H0.default.readdirSync(e))ro(r)&&qA(r)&&t.push(r);return t}});var V6,q6=a(()=>{"use strict";V6=e=>e==="purged"||e==="nothing_to_purge"||e==="purge_failed"});var J6,Y6=a(()=>{"use strict";J6=e=>e.cloudState.kind!=="known"?"skipped_unknown":e.cloudState.state!=="off"?"history_on":e.hasPurgeTargets?"purge":"nothing_to_purge"});var Lge,X6,Z6=a(()=>{"use strict";gt();Lge=["off","on_configuring","on_ready","degraded"],X6=async e=>{try{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history`,{method:"GET",headers:{[Q]:e.cloudApi.pairingToken,Accept:"application/json"},signal:AbortSignal.timeout(3e4)});if(!t.ok)return{kind:"unknown",reason:`http_${t.status}`};let r=await t.json();if(typeof r!="object"||r===null||r.ok!==!0)return{kind:"unknown",reason:"malformed_body"};let o=r.state;return typeof o!="string"||!Lge.includes(o)?{kind:"unknown",reason:"unknown_state"}:{kind:"known",state:o}}catch{return{kind:"unknown",reason:"fetch_failed"}}}});var F0,$0,Q6,z0,U0=a(()=>{"use strict";F0=m(require("node:fs")),$0=m(require("node:path"));te();oe();Q6=e=>F0.default.existsSync(e)?(F0.default.rmSync(e,{recursive:!0,force:!0}),!0):!1,z0=e=>{let t=V(e.projectId),r=Q6($0.default.join(t,ge,kr)),o=Q6($0.default.join(t,ce));return{removedDrafts:r,removedSkillgen:o}}});var JA,e7,t7=a(()=>{"use strict";Y6();Z6();D0();zA();Pi();U0();JA="[project-history-off-purge]",e7=async e=>{let t=e.deps?.fetchCloudState??X6,r=e.deps?.hasPurgeTargets??qA,o=e.deps?.purge??z0,n=e.deps?.isLocalOn??(l=>am(Dn(l)?.state)),s=e.deps?.markLocalOff??(l=>{Tl({projectId:l,state:"off"})}),i;try{let l=e.cloudApi===null?{kind:"unknown",reason:"no_cloud_api"}:await t({cloudApi:e.cloudApi,projectId:e.projectId}),c=l.kind==="known"&&l.state==="off",d=c?r(e.projectId):!1,u=J6({cloudState:l,hasPurgeTargets:d}),g=!1;if(c&&n(e.projectId))try{s(e.projectId),g=!0}catch(f){console.error(JA,"mark_off_failed",e.projectId,f)}if(u==="purge"||u==="nothing_to_purge"&&g)try{o({projectId:e.projectId}),i=u==="purge"?"purged":"nothing_to_purge"}catch(f){console.error(JA,"purge_failed",e.projectId,f),i="purge_failed"}else i=u}catch(l){console.error(JA,"reconcile_failed",e.projectId,l),i="skipped_unknown"}return i!=="history_on"&&console.info(JA,`outcome=${i}`,`projectId=${e.projectId}`),i}});var YA,B0,G0=a(()=>{"use strict";yi();Z();zr();wW();RW();j0();Pi();K6();q6();t7();YA="[project-history-tick]",B0=async(e={})=>{let t=e.listProjectIds?.()??yW(),r=e.listPurgeCandidateIds?.()??G6(),o=new Set(t),n=[...t,...r.filter(g=>!o.has(g))];if(n.length===0)return;let s=H(),i=e.cloudApi!==void 0?e.cloudApi:s===null?null:K({wsUrl:s.wsUrl,pairingToken:s.pairingToken}),l=kW(),c=e.pullSkills??hA,d=e.runSkillgen??M0({...e.ownerLlm!==void 0?{ownerLlm:e.ownerLlm}:{}}),u=e.reconcileOffPurge??e7;for(let g of n){let f="skipped_unknown";try{f=await u({projectId:g,cloudApi:i})}catch(y){console.error(YA,"off_purge_failed",g,y)}if(!V6(f)&&o.has(g)){try{await d({projectId:g})}catch(y){console.error(YA,"skillgen_failed",g,y)}if(i===null){console.error(YA,"pull_skipped_no_cloud_api",g);continue}try{await c({projectId:g,deps:{history:l,awcPublished:EW(i)}})}catch(y){console.error(YA,"pull_failed",g,y)}}}}});var K0,o7=a(()=>{"use strict";We();G0();K0=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>B0());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var n7=a(()=>{"use strict";LA()});var s7=a(()=>{"use strict";Si();kA();wl();te();lm();oe()});var um,Ige,vge,xge,Wge,Oge,Mge,V0,pm,XA=a(()=>{"use strict";Si();bA();cm();wl();Gr();um=(e,t)=>{let r=e[t];return typeof r=="string"?r:null},Ige=e=>{let t=um(e,"messageId"),r=um(e,"projectId"),o=um(e,"kind"),n=um(e,"createdAt"),s=um(e,"savedAt");if(t===null||r===null||o===null||n===null||s===null)return null;let i=e.threadKey,l=i==null?null:typeof i=="string"?i:null;return{messageId:t,projectId:r,kind:o==="summary"?"summary":zo,threadKey:l,createdAt:n,savedAt:s}},vge=50,xge=200,Wge=e=>typeof e!="number"||!Number.isFinite(e)||e<=0?vge:Math.min(Math.floor(e),xge),Oge=(e,t)=>{let r=Date.parse(e.createdAt),o=Date.parse(t.createdAt);return r!==o?o-r:t.messageId.localeCompare(e.messageId)},Mge=(e,t,r)=>{if(t==null||t==="")return!0;let o=Date.parse(e.createdAt),n=Date.parse(t);return o<n?!0:o>n?!1:r==null||r===""?!0:e.messageId.localeCompare(r)<0},V0=(e,t)=>{let r=e.threadKey===void 0||e.threadKey===null?null:e.threadKey;return{available:!0,rows:Ai(e.projectId).map(n=>{let s=Jp(n);return{messageId:n.messageId,projectId:n.projectId,kind:zo,threadKey:s.threadKey,createdAt:s.createdAt,savedAt:n.savedAt}}).filter(n=>r===null?!0:n.threadKey===r).filter(n=>Mge(n,e.beforeCreatedAt,e.beforeMessageId)).sort(Oge).slice(0,t)}},pm=e=>{let t=Wge(e.limit);if(!vt().ok)return V0(e,t);let o=jn(e.projectId);if(!o.ok)return{...V0(e,t),reason:o.reason};try{let n=[e.projectId,zo],s=`SELECT message_id AS messageId, project_id AS projectId, kind,
              thread_key AS threadKey, created_at AS createdAt, saved_at AS savedAt
       FROM records
       WHERE project_id = ? AND kind = ?`;e.threadKey!==void 0&&e.threadKey!==null&&(s+=" AND thread_key = ?",n.push(e.threadKey)),e.beforeCreatedAt!==void 0&&e.beforeCreatedAt!==null&&e.beforeCreatedAt!==""&&(e.beforeMessageId!==void 0&&e.beforeMessageId!==null&&e.beforeMessageId!==""?(s+=" AND (created_at < ? OR (created_at = ? AND message_id < ?))",n.push(e.beforeCreatedAt,e.beforeCreatedAt,e.beforeMessageId)):(s+=" AND created_at < ?",n.push(e.beforeCreatedAt))),s+=" ORDER BY created_at DESC, message_id DESC LIMIT ?",n.push(t);let i=o.db.prepare(s).all(...n),l=[];for(let c of i){let d=Ige(c);d!==null&&l.push(d)}return{available:!0,rows:l}}catch{return V0(e,t)}finally{Nn(o.db)}}});var q0,J0=a(()=>{"use strict";lm();q0=e=>Wl(e)});var Y0,X0=a(()=>{"use strict";XA();Gr();wl();Si();Y0=e=>{let t=vt();if(t.ok){let n=jn(e.projectId);if(n.ok)try{let s=n.db.prepare(`SELECT DISTINCT thread_key AS threadKey
             FROM records
             WHERE project_id = ? AND kind = ? AND thread_key IS NOT NULL
             ORDER BY thread_key ASC`).all(e.projectId,zo),i=[];for(let l of s){let c=l.threadKey;typeof c=="string"&&c.length>0&&i.push(c)}return{available:!0,threadKeys:i}}catch{}finally{Nn(n.db)}else return{available:!1,threadKeys:[],reason:n.reason}}let r=pm({projectId:e.projectId,limit:200}),o=[...new Set(r.rows.map(n=>n.threadKey).filter(n=>typeof n=="string"&&n.length>0))].sort();return{available:r.available,threadKeys:o,reason:t.ok?void 0:t.reason}}});var jge,Nge,Dge,Z0,i7=a(()=>{"use strict";Gr();J0();Fp();XA();X0();jge=/^\/api\/local\/projects\/([^/]+)\/chats$/,Nge=/^\/api\/local\/projects\/([^/]+)\/chats\/([^/]+)\/messages$/,Dge=e=>{if(e===null||e==="")return;let t=Number.parseInt(e,10);return Number.isFinite(t)?t:void 0},Z0=e=>{let t=jge.exec(e.pathname);if(t!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(t[1]??"");if(!ro(o))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;let n=vt(),s=Y0({projectId:o});return n.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKeys:s.threadKeys}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:n.reason,threadKeys:s.threadKeys}),!0)}let r=Nge.exec(e.pathname);if(r!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(r[1]??""),n=decodeURIComponent(r[2]??"");if(!ro(o)||n.length===0)return e.sendJson(e.response,400,{ok:!1,error:"invalid_path"}),!0;let s=new URL(e.requestUrl,"http://127.0.0.1").searchParams,i=s.get("before"),l=s.get("beforeMessageId"),c=Dge(s.get("limit")),d=vt(),g=pm({projectId:o,threadKey:n,beforeCreatedAt:i,beforeMessageId:l,limit:c}).rows.map(f=>{let y=q0({projectId:o,messageId:f.messageId});return{messageId:f.messageId,threadKey:f.threadKey,createdAt:f.createdAt,savedAt:f.savedAt,message:y?.message??null}});return d.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKey:n,messages:g}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:d.reason,projectId:o,threadKey:n,messages:g}),!0)}return!1}});var Q0=a(()=>{"use strict";Fp();oe();Hx();$x();Bx();Vx();fW();U3();We();RW();wW();G0();yi();o7();Pi();We();IW();CW();NW();Zp();vW();WW();h0();m0();f0();T0();TA();jA();RA();wA();U0();zW();BW();LA();n7();Qp();lm();cm();$A();_0();O0();w0();v0();R0();IA();j0();zA();vA();r0();JW();XW();d0();e0();s0();DA();HA();We();kA();s7();XA();J0();X0();i7();wl();bA();te();dW();iW();nW();SW();bW()});var Zt,Hge,a7,l7,eO,tO,rO,oO,nO,sO,iO=a(()=>{"use strict";Zt=require("node:crypto"),Hge=Buffer.from("302a300506032b6570032100","hex"),a7=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},l7=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Zt.createPublicKey)({key:Buffer.concat([Hge,t]),format:"der",type:"spki"})},eO=()=>{let{publicKey:e,privateKey:t}=(0,Zt.generateKeyPairSync)("ed25519");return{publicKeyRaw:a7(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},tO=e=>(0,Zt.createPrivateKey)(e),rO=(e,t)=>(0,Zt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),oO=(e,t,r)=>{try{let o=l7(e);return(0,Zt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},nO=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,sO=()=>(0,Zt.randomBytes)(32).toString("base64url")});var Uo,ZA,c7,Fge,$ge,QA,aO,lO,d7=a(()=>{"use strict";Uo=m(require("node:fs")),ZA=m(require("node:path"));iO();q();Ue();c7=e=>ZA.default.join(e.installDir,Zo),Fge=(e,t)=>{if(e.profileEmail===null||t===c7(e)||Uo.default.existsSync(t))return;let r=c7(e);Uo.default.existsSync(r)&&(Uo.default.mkdirSync(ZA.default.dirname(t),{recursive:!0}),Uo.default.renameSync(r,t))},$ge=e=>{if(!Uo.default.existsSync(e))return null;try{let t=Uo.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},QA=e=>{let t=Sc(e);Fge(e,t);let r=$ge(t);if(r!==null)return r;let o=eO();return Uo.default.mkdirSync(ZA.default.dirname(t),{recursive:!0}),Uo.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},aO=e=>{let t=QA(e.layout),r=sO(),o=nO({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=tO(t.privateKeyPem),s=rO(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},lO=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return oO(e.serverPublicKey,t,e.serverAttestation)}});var cO=a(()=>{"use strict";d7();iO()});var u7,p7,m7=a(()=>{"use strict";u7=m(require("node:path")),p7=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:u7.default.basename(e.installDir)})});var g7=a(()=>{"use strict";Qn()});var S7,mm,pO,mO,f7,Uge,dO,eb,ke,P7,Bge,uO,Gge,Kge,gO,ye,$e,lt,Vge,y7,h7,gm,fm,A7=a(()=>{"use strict";S7=m(require("node:http")),mm=m(require("node:fs")),pO=m(require("node:path"));tb();Su();YG();ZG();n2();fs();fC();HC();v2();W2();UP();MY();Gr();Tv();GY();s8();a8();sA();A8();I8();gn();xt();gt();v8();W8();dw();Qw();pw();j8();K8();q8();X8();mx();jr();c3();Q0();Z();cO();m7();g7();mO=e=>oC(e)??"never",f7=48e3,Uge=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,dO=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??$y(),reveal:t.reveal,installed:$r(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),eb=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Client config missing \u2014 pair this computer in AgentWitch Cloud to load projects."}:Ur(t,e)},ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P7=200,Bge=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',uO=e=>{let t=e.trim().slice(0,P7),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},Gge=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${ke(t)}</div>`,Kge=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${ke(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',gO={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},ye=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...gO}),e.end(JSON.stringify(r))},$e=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},lt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Vge=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Not linked</span>',r=e.status.wsConnected?"":'<p class="status-hint">This computer is not linked to AgentWitch cloud (token missing or revoked). Open Home \u2192 Connect this computer for a fresh install command \u2014 do not reuse an old one.</p>',o=Bge(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${ke(e.status.wakeError)}</div>`:"",s=e.revived?`<div class="alert-success">${ke(bC(process.platform))}</div>`:"",i=cx(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for AgentWitch on this computer.</p>
      ${s}
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>${r}
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Pu(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${o}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${ke(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${ke(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${ke(mO(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${ke(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${i}
    </section>`},y7=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},h7=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,P7)},gm=e=>{let t=pO.default.join(e.layout.installDir,"link-code.txt"),r=()=>Be(e.layout.installDir),o=()=>{let P=r();return{installBundleVersion:lA(P),installBundleUpdatedAt:P?.updatedAt??null,installVersion:P}},n=async P=>{let S=P.installVersion??r(),p=await i(),b=GC(p),C=P.updateFlash??null,h=KC(C),_=Gge(C,P.updateError??null);return UC({title:P.title,activePath:P.activePath,body:P.body,cloudAppOrigin:_r(S),installBundleVersionLabel:lA(S),prependBody:`${h}${_}${b}`,headerUpdateButtonHtml:BC(p)})},s=null,i=async()=>{let P=Date.now();if(s!==null&&P-s.cachedAtMs<6e4)return s.offer;let S=await lx(e.layout);return s={cachedAtMs:P,offer:S},S},l=()=>{s=null},c=!1,d=async P=>{if(l(),!(await i()).updateAvailable){P.writeHead(303,{Location:"/?update=ok"}),P.end();return}if(c){P.writeHead(303,{Location:uO("An update is already running.")}),P.end();return}c=!0;try{let p=await px(),b=p.ok?"/?update=ok":uO(p.message);P.writeHead(303,{Location:b}),P.end()}catch(p){let b=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";P.writeHead(303,{Location:uO(b)}),P.end()}finally{c=!1,l()}},u=async(P,S)=>{let p=S==="Project not found"?"That project is not available on this computer.":"That page does not exist on this computer.",b=o(),C=await n({title:S,activePath:S==="Project not found"?"/projects":"/",installVersion:b.installVersion,body:`<section class="card">
      <h1>${ke(S)}</h1>
      <p>${ke(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});P.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),P.end(C)},g=()=>{if(mm.default.existsSync(t))return mm.default.readFileSync(t,"utf8").trim();let P=Math.random().toString(36).slice(2,8).toUpperCase();return mm.default.writeFileSync(t,P,"utf8"),P},f=xn({layout:e.layout}),y=S7.default.createServer((P,S)=>{(async()=>{let p=P.url?.split("?")[0]??"/",b=P.method??"GET";if(b==="OPTIONS"){S.writeHead(204,gO),S.end();return}if(await pv({method:b,pathname:p,request:P,response:S,requestUrl:P.url??"/",storePath:BY(pO.default.dirname(e.layout.configPath)),readBody:lt,sendHtml:$e,renderShell:n})||await OY({method:b,pathname:p,request:P,response:S,configPath:e.layout.configPath,readBody:lt,sendJson:ye})||await Ih({method:b,pathname:p,request:P,response:S,layout:e.layout,readBody:lt,sendJson:ye})||Z0({method:b,pathname:p,requestUrl:P.url??"/",response:S,sendJson:ye})||await VP({method:b,pathname:p,request:P,response:S,layout:e.layout,readBody:lt,sendJson:ye,server:f}))return;if(b==="GET"&&p==="/health"){let h=e.controllers.getStatus(),_=o();ye(S,200,{ok:!0,...h,installBundleVersion:_.installBundleVersion,installBundleUpdatedAt:_.installBundleUpdatedAt,...p7({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(b==="GET"&&p==="/api/status"){let h=o();ye(S,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(b==="GET"&&p==="/api/traffic"){ye(S,200,{entries:yu(e.layout)});return}if(b==="DELETE"&&p==="/api/traffic"||b==="POST"&&p==="/api/traffic/clear"){if(iC(e.layout),b==="POST"){S.writeHead(303,{Location:"/traffic?cleared=1"}),S.end();return}ye(S,200,{ok:!0});return}if(b==="GET"&&p==="/api/trace"){ye(S,200,{entries:iS(e.layout)});return}if(b==="DELETE"&&p==="/api/trace"||b==="POST"&&p==="/api/trace/clear"){if(cC(e.layout),b==="POST"){S.writeHead(303,{Location:"/status"}),S.end();return}ye(S,200,{ok:!0});return}if(b==="POST"&&p==="/api/errors/clear"){dC(e.layout.errorLogPath),S.writeHead(303,{Location:"/errors?cleared=1"}),S.end();return}if(b==="GET"&&p==="/api/knowledge"){let _=new URL(P.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(_.length>0){let R=await Ka({layout:e.layout,query:_,limit:20});ye(S,200,{chunks:R,query:_});return}ye(S,200,{chunks:Ga(e.layout).slice(-50).reverse()});return}if(b==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),S.writeHead(303,{Location:"/status?revived=1"}),S.end();return}if(b==="GET"&&p==="/api/update-status"){let h=await i();ye(S,200,{ok:!0,...h});return}if((b==="GET"||b==="POST")&&p==="/api/update"){await d(S);return}if(b==="GET"&&p==="/"){let h=e.controllers.getStatus(),_=o(),R=$r(e.layout),E=aS(e.layout.errorLogPath);$e(S,await n({title:"Home",activePath:"/",installVersion:_.installVersion,updateFlash:y7(P.url??void 0),updateError:h7(P.url??void 0),body:VC({wsConnected:h.wsConnected,lastHeartbeatAt:h.lastHeartbeatAt,installBundleVersion:_.installBundleVersion,harnessSetCount:R.sets.length,knowledgeChunkCount:Ga(e.layout).length,trafficEntryCount:yu(e.layout).length,wakeError:h.wakeError,errorLogByteSize:E.byteSize,errorLogExists:E.exists})}));return}if(b==="GET"&&p==="/task"){let h=e.controllers.getStatus(),_=o(),R=H(),E=new URL(P.url??"/",`http://127.0.0.1:${43347}`),T=E.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,x=E.searchParams.get("failed")==="1"?E.searchParams.get("error")?.trim()??"Task failed.":null,W=E.searchParams.get("runId");$e(S,await n({title:"Task",activePath:"/task",installVersion:_.installVersion,body:Cv({defaultWorkspace:R?.workspace??"",wsConnected:h.wsConnected,flashMessage:T,flashError:x,lastRunId:W})}));return}if(b==="POST"&&p==="/task/dispatch"){let h=await lt(P),_=new URLSearchParams(h),R=_.get("prompt")?.trim()??"",E=_.get("writerAgent")?.trim()??"claude-cli",T=_.get("projectFolder")?.trim()??"",x=await fx({prompt:R,writerAgent:E,...T.length>0?{projectFolderPath:T}:{}}),W=new URLSearchParams;x.ok?W.set("ok","1"):(W.set("failed","1"),x.errorMessage!==void 0&&W.set("error",x.errorMessage.slice(0,240))),x.agentRunId!==void 0&&W.set("runId",x.agentRunId),S.writeHead(303,{Location:`/task?${W.toString()}`}),S.end();return}if(b==="GET"&&p==="/writer-sessions"){let h=o(),_=tA(e.layout,12);$e(S,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:h.installVersion,updateFlash:y7(P.url??void 0),updateError:h7(P.url??void 0),body:Mv({sessions:_})}));return}if(b==="GET"&&p==="/errors"){let h=o(),_=aS(e.layout.errorLogPath);$e(S,await n({title:"Errors",activePath:"/errors",installVersion:h.installVersion,body:pC({errorLogPath:e.layout.errorLogPath,content:_.content,exists:_.exists,truncated:_.truncated,byteSize:_.byteSize,cleared:new URL(P.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(b==="GET"&&p==="/status"){let h=new URL(P.url??"/",`http://127.0.0.1:${43347}`),_=e.controllers.getStatus(),R=Oe(e.layout),E=R!==null?Ke(R,12e4):yC(_.lastHeartbeatAt,12e4),T=hC({lastHeartbeatAt:_.lastHeartbeatAt,heartbeatIsStale:E}),x=o();$e(S,await n({title:"Status",activePath:"/status",installVersion:x.installVersion,body:`${Vge({status:_,healthBadge:T,revived:h.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:x.installBundleVersion,installBundleUpdatedAt:x.installBundleUpdatedAt})}${AC({installDir:e.layout.installDir,platform:process.platform})}${PC({entries:iS(e.layout)})}`}));return}if(b==="GET"&&p==="/traffic"){let h=new URL(P.url??"/",`http://127.0.0.1:${43347}`),_=yu(e.layout),R=o(),E=_.map(W=>`<tr><td title="${ke(W.at)}">${ke(mO(W.at))}</td><td>${ke(W.direction)}</td><td><code>${ke(W.type)}</code></td><td>${ke(W.summary)}</td><td>${ke(W.action??"")}</td></tr>`).join(""),T=_.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${E}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',x=h.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";$e(S,await n({title:"Traffic",activePath:"/traffic",installVersion:R.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${x}
              ${T}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(b==="GET"&&p==="/projects"){let h=new URL(P.url??"/",`http://127.0.0.1:${43347}`),_=o(),R=_r(_.installVersion),E=await eb(e.layout),T=h.searchParams.get("folderError")==="1"?"Could not save the selected folder to AgentWitch. Check the Mac connection and try again.":h.searchParams.get("deleteError")==="1"?"Could not delete the project in AgentWitch Cloud. Check pairing on Status.":null,x=h.searchParams.get("deleted")==="1"?"Project removed from AgentWitch Cloud. Folders on your computer were not deleted.":null,W=H(),z=W===null?null:K({wsUrl:W.wsUrl,pairingToken:W.pairingToken}),O=z===null?{}:Object.fromEntries((await Promise.all(E.projects.map(async U=>{let he=await Zv(z,U.id);return[U.id,he?.counts??null]}))).filter(U=>U[1]!==null));$e(S,await n({title:"Projects",activePath:"/projects",installVersion:_.installVersion,body:ix({projects:E.projects,compositionCountsByProjectId:O,cloudAppOrigin:R,syncMessage:E.message,syncOk:E.ok,flashMessage:x,flashError:T})}));return}if(b==="GET"&&p==="/projects/select-folder"){let _=new URL(P.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",R=H(),E=R===null?null:K({wsUrl:R.wsUrl,pairingToken:R.pairingToken}),T=_.length>0&&E!==null?hn():null;if(T===null||E===null){S.writeHead(303,{Location:"/projects"}),S.end();return}if(pt({projectFolderPath:T}),!await Gd(E,_,T)){S.writeHead(303,{Location:"/projects?folderError=1"}),S.end();return}S.writeHead(303,{Location:`/project?id=${encodeURIComponent(_)}&folderUpdated=1`}),S.end();return}if(b==="POST"&&p==="/projects/delete"){let h=await lt(P),_=new URLSearchParams(h).get("projectId")?.trim()??"",R=H(),E=R===null?null:K({wsUrl:R.wsUrl,pairingToken:R.pairingToken});if(E===null||_.length===0){S.writeHead(303,{Location:"/projects?deleteError=1"}),S.end();return}let T=await bw(E,_);S.writeHead(303,{Location:T.ok?"/projects?deleted=1":"/projects?deleteError=1"}),S.end();return}if(b==="GET"&&p==="/project"){let h=new URL(P.url??"/",`http://127.0.0.1:${43347}`),_=h.searchParams.get("id")?.trim()??"",R=o(),E=_r(R.installVersion),T=await eb(e.layout),x=dr(T.projects,_);if(x===null){await u(S,"Project not found");return}let W=h.searchParams.get("linked")==="1"?h.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${h.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${h.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:h.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with AgentWitch.":null,z=h.searchParams.get("knowledgePromoted"),O=z!==null?`Marked ${z} lesson(s) as promoted in AgentWitch.`:null,U=h.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,he=h.searchParams.get("tab")?.trim()??"harness",N=he==="workflows"||he==="agents"||he==="knowledge"||he==="pitfalls"?he:"harness",J=h.searchParams.get("retired")==="1",Er=h.searchParams.get("edit")?.trim()||null,wr=M8(h.searchParams.get("pitfall")),Xo=H(),Tr=Xo===null?null:K({wsUrl:Xo.wsUrl,pairingToken:Xo.pairingToken}),Ub=Tr===null?null:await Zv(Tr,x.id),Ql=0;if(Tr!==null)try{let rj=await fetch(`${Tr.appOrigin}/api/agent-witch/projects/${encodeURIComponent(x.id)}/knowledge`,{method:"GET",headers:{[Q]:Tr.pairingToken},signal:AbortSignal.timeout(1e4)});if(rj.ok){let Vm=await rj.json();typeof Vm=="object"&&Vm!==null&&typeof Vm.candidateCount=="number"&&(Ql=Vm.candidateCount)}}catch{Ql=0}let Gm=h.searchParams.get("rulePrompt"),Km=Gm!==null,Bb=Gm?.trim()??"",Cr=h.searchParams.get("ruleDropped")?.trim()||null,QM=h.searchParams.get("ruleDroppedTitle")?.trim()||null,ej=h.searchParams.get("ruleChangeError")?.trim()||null,iQ=(h.searchParams.get("ruleChangeAction")?.trim()||null)==="restore"?"restore":"drop",aQ=ej===null?null:{ok:!1,reason:ej},tj=N==="pitfalls"||N==="harness"&&Km?await Iz({store:jh({layout:e.layout,cloud:Tr===null?null:Bd(Tr)}),projectId:x.id,includeRetired:N==="pitfalls"?J:!1}):void 0,lQ=N!=="harness"?void 0:await G8({projectId:x.id,prompt:Km?Bb:null,cloudConfig:Tr,pitfalls:tj,dropFlash:Cr!==null&&QM!==null?{ruleId:Cr,title:QM}:null,changeError:aQ,changeAction:iQ});$e(S,await n({title:x.name,activePath:"/projects",installVersion:R.installVersion,body:fn({project:x,cloudAppOrigin:E,installed:$r(e.layout),linkedSetSlugs:Hr(x.projectFolderPath),composition:Ub,knowledgeCandidateCount:Ql,pitfalls:tj,pitfallsShowRetired:J,pitfallsEditId:Er,activeTab:N,harnessExtraHtml:lQ,flashMessage:W??O??wr?.message??null,flashError:U??wr?.error??null})}));return}if(b==="POST"&&(p==="/project/rules/drop"||p==="/project/rules/restore")){let h=await lt(P),_=H(),R=_===null?null:K({wsUrl:_.wsUrl,pairingToken:_.pairingToken}),E=await V8({action:p.endsWith("/drop")?"drop":"restore",rawBody:h,cloudConfig:R});if(E.kind==="not_found"){await u(S,"Project not found");return}S.writeHead(303,{Location:E.location}),S.end();return}if(b==="POST"&&p==="/projects/pull-bound-harness"){let h=await lt(P),_=await lw({rawBody:h,layout:e.layout});if(_.kind==="not_found"){await u(S,"Project not found");return}if(_.kind==="redirect"){S.writeHead(303,{Location:_.location}),S.end();return}let R=o();$e(S,await n({title:_.title,activePath:"/projects",installVersion:R.installVersion,body:_.body}));return}if(b==="POST"&&p==="/projects/link-harness"){let h=await lt(P),_=new URLSearchParams(h),R=_.get("projectId")?.trim()??"",E=await eb(e.layout),T=dr(E.projects,R);if(T===null){await u(S,"Project not found");return}let x=_.getAll("applySet").map(N=>String(N)),W=Wd({layout:e.layout,projectFolderPath:T.projectFolderPath,setSlugs:x});if(!W.ok){let N=o(),J=_r(N.installVersion);$e(S,await n({title:T.name,activePath:"/projects",installVersion:N.installVersion,body:fn({project:T,cloudAppOrigin:J,installed:$r(e.layout),linkedSetSlugs:Hr(T.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:W.errorMessage})}));return}let z=H(),O=z===null?null:K({wsUrl:z.wsUrl,pairingToken:z.pairingToken}),U=O===null?!1:await vs(O,T.id,W.appliedSetSlugs),he=new URLSearchParams({linked:"1",files:String(W.writtenFileCount),bindingsSynced:U?"1":"0"});S.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${he.toString()}`}),S.end();return}if(b==="POST"&&p==="/projects/remove-harness-set"){let h=await lt(P),_=await cw({rawBody:h,layout:e.layout});if(_.kind==="not_found"){await u(S,"Project not found");return}if(_.kind==="redirect"){S.writeHead(303,{Location:_.location}),S.end();return}let R=o();$e(S,await n({title:_.title,activePath:"/projects",installVersion:R.installVersion,body:_.body}));return}if(b==="POST"&&p==="/project/knowledge/promote-all"){let h=await lt(P),R=new URLSearchParams(h).get("projectId")?.trim()??"",E=await eb(e.layout),T=dr(E.projects,R);if(T===null){await u(S,"Project not found");return}let x=H(),W=x===null?null:K({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),z=W===null?{ok:!1,promotedCount:0}:await x8(W,T.id),O=new URLSearchParams({tab:"knowledge",...z.ok?{knowledgePromoted:String(z.promotedCount)}:{knowledgePromoteFailed:"1"}});S.writeHead(303,{Location:`/project?id=${encodeURIComponent(T.id)}&${O.toString()}`}),S.end();return}let C=rh(p);if(b==="POST"&&C!==null){let h=await lt(P),_=await mw({rawBody:h,action:C,layout:e.layout,createStore:R=>jh({layout:e.layout,cloud:Bd(R)})});if(_.kind==="not_found"){await u(S,"Project not found");return}S.writeHead(303,{Location:_.location}),S.end();return}if(b==="GET"&&p==="/harness"){let h=new URL(P.url??"/",`http://127.0.0.1:${43347}`),_=o(),R=Nd(e.layout),E=h.searchParams.get("submitted")==="1",T=E?h.searchParams.get("syncFailed")==="1"?`Local harness updated (${h.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:h.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${h.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":h.searchParams.get("stopped")==="1"?`Reveal stopped. ${R?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:h.searchParams.get("revealed")==="1"?`Reveal found ${R?.sets.length??0} set(s).`:null,x=R?.scanRoots[0]??$y(),W=Uge(e.layout,{reveal:R,importQuery:h.searchParams.get("import")==="1",justSubmitted:E}),z=_r(_.installVersion);$e(S,await n({title:"Harness",activePath:"/harness",installVersion:_.installVersion,body:Dp(dO(e.layout,{cloudAppOrigin:z,reveal:R,scanFolder:x,flashMessage:T,importSectionExpanded:W}))}));return}if(b==="POST"&&p==="/api/harness/pick-folder"){let h=hn();if(h===null){ye(S,200,{cancelled:!0});return}ye(S,200,{path:h});return}if(b==="GET"&&p==="/api/harness/file-content"){let _=new URL(P.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",R=xd(_);if(R===null){ye(S,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let E=mm.default.readFileSync(R,"utf8"),T=E.length>f7?`${E.slice(0,f7)}
\u2026 (truncated)`:E;ye(S,200,{content:T})}catch{ye(S,500,{errorMessage:"Could not read file."})}return}if(b==="POST"&&p==="/api/harness/reveal/add-project"){let h=await lt(P),_="";try{let T=JSON.parse(h);typeof T=="object"&&T!==null&&typeof T.projectPath=="string"&&(_=T.projectPath.trim())}catch{ye(S,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(_.length===0){ye(S,400,{ok:!1,errorMessage:"projectPath is required."});return}let R=Nd(e.layout),E=OE({reveal:R,projectPath:_});if(E===null||E.sets.length===0){ye(S,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Gy(e.layout,E),ye(S,200,{ok:!0,setCount:E.sets.length});return}if(b==="GET"&&p==="/api/harness/reveal/stream"){let _=new URL(P.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(_.length===0){ye(S,400,{errorMessage:"Choose a folder to scan first."});return}let R=!1;P.on("close",()=>{R=!0}),S.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...gO});let E=ME({scanRoot:_,response:S,shouldAbort:()=>R});Gy(e.layout,E),S.end();return}if(b==="POST"&&p==="/harness/reveal"){S.writeHead(410,{"Content-Type":"text/plain"}),S.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(b==="POST"&&p==="/harness/submit"){let h=Nd(e.layout);if(h===null){let z=o(),O=_r(z.installVersion);$e(S,await n({title:"Harness",activePath:"/harness",installVersion:z.installVersion,body:Dp(dO(e.layout,{cloudAppOrigin:O,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let _=await lt(P),R=new URLSearchParams(_),E=Xv(R,h),T=NE({layout:e.layout,sets:E});if(!T.ok){let z=o(),O=_r(z.installVersion);$e(S,await n({title:"Harness",activePath:"/harness",installVersion:z.installVersion,body:Dp(dO(e.layout,{cloudAppOrigin:O,reveal:h,flashError:T.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}HE(e.layout);let W=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";S.writeHead(303,{Location:`/harness?submitted=1&count=${T.writtenItemCount??0}${W}`}),S.end();return}if(b==="GET"&&p==="/writer-api"){let h=new URL(P.url??"/",`http://127.0.0.1:${43347}`),R=H()?.writerExecutionBackend??rt(void 0),E=qe(e.layout.configPath),T=cn(E),x=h.searchParams.get("saved")==="1"?"Writer API settings saved on this computer.":null,W=o();$e(S,await n({title:"Writer API",activePath:"/writer-api",installVersion:W.installVersion,body:Jv({writerExecutionBackend:R,secrets:T,flashMessage:x})}));return}if(b==="POST"&&p==="/writer-api"){let h=await lt(P),_=new URLSearchParams(h),R=_.get("writerExecutionBackend")?.trim()??"cli";zR({configPath:e.layout.configPath,writerExecutionBackend:rt(R),anthropicApiKey:_.get("anthropicApiKey")??void 0,anthropicModel:_.get("anthropicModel")??void 0,openaiApiKey:_.get("openaiApiKey")??void 0,openaiModel:_.get("openaiModel")??void 0,googleApiKey:_.get("googleApiKey")??void 0,googleModel:_.get("googleModel")??void 0}),S.writeHead(303,{Location:"/writer-api?saved=1"}),S.end();return}if(b==="GET"&&p==="/estimates"){S.writeHead(302,{Location:"/history"}),S.end();return}if(b==="GET"&&p==="/history"){let h=o();$e(S,await n({title:"History",activePath:"/history",installVersion:h.installVersion,body:Ov({reportsDir:e.layout.reportsDir})}));return}if(b==="GET"&&p==="/knowledge"){let _=new URL(P.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",R=o(),E=TC({layout:e.layout}),T=IC(E),x=_.length>0?await Ka({layout:e.layout,query:_,limit:20}):Ga(e.layout).slice(-50).reverse(),W=x.map(O=>{let U=LC(E,O.id),he=U>0?` \xB7 used in ${U} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${ke(O.createdAt)}">${ke(mO(O.createdAt))}${O.source?` \xB7 ${ke(O.source)}`:""}${he}</div><pre>${ke(O.text)}</pre></article>`}).join(""),z=T.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${T.map(O=>`<li><strong>P${O.priority}</strong> \u2014 ${ke(O.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your computer.</p></section>`:"";$e(S,await n({title:"Knowledge",activePath:"/knowledge",installVersion:R.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this computer. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${ke(_)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${Kge(_,x.length)}
            </section>${z}${W}`}));return}b==="POST"&&await lt(P),await u(S,"Not found")})().catch(p=>{console.error("[agent-witch-local-app]",p),S.writeHead(500),S.end("Internal error")})});y.on("error",P=>{if(P.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",P)});let A=K0();return y.on("close",()=>{A.stop()}),y.listen(43347,"127.0.0.1",()=>{try{Wa()}catch(S){let p=S instanceof Error?S.message:String(S);console.error(`[agent-witch] writeGlobalTriggers failed: ${p}`)}console.log(`[agent-witch] Local app ${Ft}`);let P=hh();P!==null&&console.warn(P)}),y},fm=e=>QA(e).publicKeyRaw});var tb=a(()=>{"use strict";rC();MG();A7()});var _7={};Et(_7,{runAgentWitchExternalLiveCli:()=>Jge});var fO,b7,qge,Jge,k7=a(()=>{"use strict";fO=m(require("node:fs")),b7=m(require("node:path"));fs();q();ac();jk();pe();tb();pe();qge=e=>{let t=b7.default.join(e,"link-code.txt");if(!fO.default.existsSync(t))return null;let r=fO.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},Jge=()=>{Ct("agent-witch-live");let e=L(),t=j(),r=qge(e),o=fm(t);gm({layout:t,controllers:{getStatus:()=>{let n=Oe(t);return{wsConnected:rd(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Yb({platform:process.platform,installDir:e,runners:{kickstartLaunchAgents:()=>rs(e,process.platform),restartSystemdUserService:Gc}}).then(n=>{n.ok||console.warn(`[agent-witch-live] Revive: ${n.message}`)})}}})}});var Bo=w((elt,w7)=>{"use strict";var R7=["nodebuffer","arraybuffer","fragments"],E7=typeof Blob<"u";E7&&R7.push("blob");w7.exports={BINARY_TYPES:R7,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:E7,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var ym=w((tlt,rb)=>{"use strict";var{EMPTY_BUFFER:Yge}=Bo(),yO=Buffer[Symbol.species];function Xge(e,t){if(e.length===0)return Yge;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new yO(r.buffer,r.byteOffset,o):r}function T7(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function C7(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function Zge(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function hO(e){if(hO.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new yO(e):ArrayBuffer.isView(e)?t=new yO(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),hO.readOnly=!1),t}rb.exports={concat:Xge,mask:T7,toArrayBuffer:Zge,toBuffer:hO,unmask:C7};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");rb.exports.mask=function(t,r,o,n,s){s<48?T7(t,r,o,n,s):e.mask(t,r,o,n,s)},rb.exports.unmask=function(t,r){t.length<32?C7(t,r):e.unmask(t,r)}}catch{}});var v7=w((rlt,I7)=>{"use strict";var L7=Symbol("kDone"),SO=Symbol("kRun"),PO=class{constructor(t){this[L7]=()=>{this.pending--,this[SO]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[SO]()}[SO](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[L7])}}};I7.exports=PO});var jl=w((olt,M7)=>{"use strict";var hm=require("zlib"),x7=ym(),Qge=v7(),{kStatusCode:W7}=Bo(),efe=Buffer[Symbol.species],tfe=Buffer.from([0,0,255,255]),nb=Symbol("permessage-deflate"),Go=Symbol("total-length"),Ol=Symbol("callback"),Hn=Symbol("buffers"),Ml=Symbol("error"),ob,AO=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!ob){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;ob=new Qge(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ol];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){ob.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){ob.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?hm.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=hm.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[nb]=this,this._inflate[Go]=0,this._inflate[Hn]=[],this._inflate.on("error",ofe),this._inflate.on("data",O7)}this._inflate[Ol]=o,this._inflate.write(t),r&&this._inflate.write(tfe),this._inflate.flush(()=>{let s=this._inflate[Ml];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=x7.concat(this._inflate[Hn],this._inflate[Go]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Go]=0,this._inflate[Hn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?hm.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=hm.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Go]=0,this._deflate[Hn]=[],this._deflate.on("data",rfe)}this._deflate[Ol]=o,this._deflate.write(t),this._deflate.flush(hm.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=x7.concat(this._deflate[Hn],this._deflate[Go]);r&&(s=new efe(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ol]=null,this._deflate[Go]=0,this._deflate[Hn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};M7.exports=AO;function rfe(e){this[Hn].push(e),this[Go]+=e.length}function O7(e){if(this[Go]+=e.length,this[nb]._maxPayload<1||this[Go]<=this[nb]._maxPayload){this[Hn].push(e);return}this[Ml]=new RangeError("Max payload size exceeded"),this[Ml].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Ml][W7]=1009,this.removeListener("data",O7),this.reset()}function ofe(e){if(this[nb]._inflate=null,this[Ml]){this[Ol](this[Ml]);return}e[W7]=1007,this[Ol](e)}});var Nl=w((nlt,sb)=>{"use strict";var{isUtf8:j7}=require("buffer"),{hasBlob:nfe}=Bo(),sfe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function ife(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function bO(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function afe(e){return nfe&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}sb.exports={isBlob:afe,isValidStatusCode:ife,isValidUTF8:bO,tokenChars:sfe};if(j7)sb.exports.isValidUTF8=function(e){return e.length<24?bO(e):j7(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");sb.exports.isValidUTF8=function(t){return t.length<32?bO(t):e(t)}}catch{}});var wO=w((slt,U7)=>{"use strict";var{Writable:lfe}=require("stream"),N7=jl(),{BINARY_TYPES:cfe,EMPTY_BUFFER:D7,kStatusCode:dfe,kWebSocket:ufe}=Bo(),{concat:_O,toArrayBuffer:pfe,unmask:mfe}=ym(),{isValidStatusCode:gfe,isValidUTF8:H7}=Nl(),ib=Buffer[Symbol.species],Qt=0,F7=1,$7=2,z7=3,kO=4,RO=5,ab=6,EO=class extends lfe{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||cfe[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[ufe]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Qt}_write(t,r,o){if(this._opcode===8&&this._state==Qt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new ib(o.buffer,o.byteOffset+t,o.length-t),new ib(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new ib(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Qt:this.getInfo(t);break;case F7:this.getPayloadLength16(t);break;case $7:this.getPayloadLength64(t);break;case z7:this.getMask();break;case kO:this.getData(t);break;case RO:case ab:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[N7.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=F7:this._payloadLength===127?this._state=$7:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=z7:this._state=kO}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=kO}getData(t){let r=D7;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&mfe(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=RO,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[N7.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Qt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Qt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=_O(o,r):this._binaryType==="arraybuffer"?n=pfe(_O(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=Qt):(this._state=ab,setImmediate(()=>{this.emit("message",n,!0),this._state=Qt,this.startLoop(t)}))}else{let n=_O(o,r);if(!this._skipUTF8Validation&&!H7(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===RO||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=Qt):(this._state=ab,setImmediate(()=>{this.emit("message",n,!1),this._state=Qt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,D7),this.end();else{let o=t.readUInt16BE(0);if(!gfe(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new ib(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!H7(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=Qt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Qt):(this._state=ab,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Qt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[dfe]=n,i}};U7.exports=EO});var LO=w((alt,K7)=>{"use strict";var{Duplex:ilt}=require("stream"),{randomFillSync:ffe}=require("crypto"),{types:{isUint8Array:yfe}}=require("util"),B7=jl(),{EMPTY_BUFFER:hfe,kWebSocket:Sfe,NOOP:Pfe}=Bo(),{isBlob:Dl,isValidStatusCode:Afe}=Nl(),{mask:G7,toBuffer:_i}=ym(),er=Symbol("kByteLength"),bfe=Buffer.alloc(4),lb=8*1024,ki,Hl=lb,Rr=0,_fe=1,kfe=2,TO=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Rr,this.onerror=Pfe,this[Sfe]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||bfe,r.generateMask?r.generateMask(o):(Hl===lb&&(ki===void 0&&(ki=Buffer.alloc(lb)),ffe(ki,0,lb),Hl=0),o[0]=ki[Hl++],o[1]=ki[Hl++],o[2]=ki[Hl++],o[3]=ki[Hl++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let l;typeof t=="string"?(!r.mask||i)&&r[er]!==void 0?l=r[er]:(t=Buffer.from(t),l=t.length):(l=t.length,n=r.mask&&r.readOnly&&!i);let c=l;l>=65536?(s+=8,c=127):l>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?l+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(l,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(l,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(G7(t,o,d,s,l),[d]):(G7(t,o,t,0,l),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=hfe;else{if(typeof t!="number"||!Afe(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let l=Buffer.byteLength(r);if(l>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+l),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(yfe(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[er]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Rr?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Dl(t)?(n=t.size,s=!1):(t=_i(t),n=t.length,s=_i.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[er]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Dl(t)?this._state!==Rr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Rr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Dl(t)?(n=t.size,s=!1):(t=_i(t),n=t.length,s=_i.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[er]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Dl(t)?this._state!==Rr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Rr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[B7.extensionName],s=r.binary?2:1,i=r.compress,l,c;typeof t=="string"?(l=Buffer.byteLength(t),c=!1):Dl(t)?(l=t.size,c=!1):(t=_i(t),l=t.length,c=_i.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=l>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[er]:l,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Dl(t)?this._state!==Rr?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Rr?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[er],this._state=kfe,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let l=new Error("The socket was closed while the blob was being read");process.nextTick(CO,this,l,n);return}this._bufferedBytes-=o[er];let i=_i(s);r?this.dispatch(i,r,o,n):(this._state=Rr,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(Rfe,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[B7.extensionName];this._bufferedBytes+=o[er],this._state=_fe,s.compress(t,o.fin,(i,l)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");CO(this,c,n);return}this._bufferedBytes-=o[er],this._state=Rr,o.readOnly=!1,this.sendFrame(e.frame(l,o),n),this.dequeue()})}dequeue(){for(;this._state===Rr&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][er],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][er],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};K7.exports=TO;function CO(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function Rfe(e,t,r){CO(e,t,r),e.onerror(t)}});var tX=w((llt,eX)=>{"use strict";var{kForOnEventAttribute:Sm,kListener:IO}=Bo(),V7=Symbol("kCode"),q7=Symbol("kData"),J7=Symbol("kError"),Y7=Symbol("kMessage"),X7=Symbol("kReason"),Fl=Symbol("kTarget"),Z7=Symbol("kType"),Q7=Symbol("kWasClean"),Ko=class{constructor(t){this[Fl]=null,this[Z7]=t}get target(){return this[Fl]}get type(){return this[Z7]}};Object.defineProperty(Ko.prototype,"target",{enumerable:!0});Object.defineProperty(Ko.prototype,"type",{enumerable:!0});var Ri=class extends Ko{constructor(t,r={}){super(t),this[V7]=r.code===void 0?0:r.code,this[X7]=r.reason===void 0?"":r.reason,this[Q7]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[V7]}get reason(){return this[X7]}get wasClean(){return this[Q7]}};Object.defineProperty(Ri.prototype,"code",{enumerable:!0});Object.defineProperty(Ri.prototype,"reason",{enumerable:!0});Object.defineProperty(Ri.prototype,"wasClean",{enumerable:!0});var $l=class extends Ko{constructor(t,r={}){super(t),this[J7]=r.error===void 0?null:r.error,this[Y7]=r.message===void 0?"":r.message}get error(){return this[J7]}get message(){return this[Y7]}};Object.defineProperty($l.prototype,"error",{enumerable:!0});Object.defineProperty($l.prototype,"message",{enumerable:!0});var Pm=class extends Ko{constructor(t,r={}){super(t),this[q7]=r.data===void 0?null:r.data}get data(){return this[q7]}};Object.defineProperty(Pm.prototype,"data",{enumerable:!0});var Efe={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Sm]&&n[IO]===t&&!n[Sm])return;let o;if(e==="message")o=function(s,i){let l=new Pm("message",{data:i?s:s.toString()});l[Fl]=this,cb(t,this,l)};else if(e==="close")o=function(s,i){let l=new Ri("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});l[Fl]=this,cb(t,this,l)};else if(e==="error")o=function(s){let i=new $l("error",{error:s,message:s.message});i[Fl]=this,cb(t,this,i)};else if(e==="open")o=function(){let s=new Ko("open");s[Fl]=this,cb(t,this,s)};else return;o[Sm]=!!r[Sm],o[IO]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[IO]===t&&!r[Sm]){this.removeListener(e,r);break}}};eX.exports={CloseEvent:Ri,ErrorEvent:$l,Event:Ko,EventTarget:Efe,MessageEvent:Pm};function cb(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var db=w((clt,rX)=>{"use strict";var{tokenChars:Am}=Nl();function so(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function wfe(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,l,c=-1,d=-1,u=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(u===-1&&Am[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(c,u);d===44?(so(t,y,r),r=Object.create(null)):i=y,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(l===void 0)if(u===-1&&Am[d]===1)c===-1&&(c=g);else if(d===32||d===9)u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g),so(r,e.slice(c,u),!0),d===44&&(so(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)l=e.slice(c,g),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(Am[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(Am[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,u=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(u===-1&&Am[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))u===-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(c,u);o&&(y=y.replace(/\\/g,""),o=!1),so(r,l,y),d===44&&(so(t,i,r),r=Object.create(null),i=void 0),l=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=g);let f=e.slice(c,u);return i===void 0?so(t,f,r):(l===void 0?so(r,f,!0):o?so(r,l,f.replace(/\\/g,"")):so(r,l,f),so(t,i,r)),t}function Tfe(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}rX.exports={format:Tfe,parse:wfe}});var gb=w((plt,gX)=>{"use strict";var Cfe=require("events"),Lfe=require("https"),Ife=require("http"),sX=require("net"),vfe=require("tls"),{randomBytes:xfe,createHash:Wfe}=require("crypto"),{Duplex:dlt,Readable:ult}=require("stream"),{URL:vO}=require("url"),Fn=jl(),Ofe=wO(),Mfe=LO(),{isBlob:jfe}=Nl(),{BINARY_TYPES:oX,CLOSE_TIMEOUT:Nfe,EMPTY_BUFFER:ub,GUID:Dfe,kForOnEventAttribute:xO,kListener:Hfe,kStatusCode:Ffe,kWebSocket:ze,NOOP:iX}=Bo(),{EventTarget:{addEventListener:$fe,removeEventListener:zfe}}=tX(),{format:Ufe,parse:Bfe}=db(),{toBuffer:Gfe}=ym(),aX=Symbol("kAborted"),WO=[8,13],Vo=["CONNECTING","OPEN","CLOSING","CLOSED"],Kfe=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,ue=class e extends Cfe{constructor(t,r,o){super(),this._binaryType=oX[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=ub,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),lX(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){oX.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new Ofe({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new Mfe(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[ze]=this,s[ze]=this,t[ze]=this,n.on("conclude",Jfe),n.on("drain",Yfe),n.on("error",Xfe),n.on("message",Zfe),n.on("ping",Qfe),n.on("pong",eye),s.onerror=tye,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",uX),t.on("data",mb),t.on("end",pX),t.on("error",mX),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Fn.extensionName]&&this._extensions[Fn.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ht(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,dX(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){OO(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||ub,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){OO(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||ub,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){OO(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Fn.extensionName]||(n.compress=!1),this._sender.send(t||ub,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ht(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(ue,"CONNECTING",{enumerable:!0,value:Vo.indexOf("CONNECTING")});Object.defineProperty(ue.prototype,"CONNECTING",{enumerable:!0,value:Vo.indexOf("CONNECTING")});Object.defineProperty(ue,"OPEN",{enumerable:!0,value:Vo.indexOf("OPEN")});Object.defineProperty(ue.prototype,"OPEN",{enumerable:!0,value:Vo.indexOf("OPEN")});Object.defineProperty(ue,"CLOSING",{enumerable:!0,value:Vo.indexOf("CLOSING")});Object.defineProperty(ue.prototype,"CLOSING",{enumerable:!0,value:Vo.indexOf("CLOSING")});Object.defineProperty(ue,"CLOSED",{enumerable:!0,value:Vo.indexOf("CLOSED")});Object.defineProperty(ue.prototype,"CLOSED",{enumerable:!0,value:Vo.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(ue.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(ue.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[xO])return t[Hfe];return null},set(t){for(let r of this.listeners(e))if(r[xO]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[xO]:!0})}})});ue.prototype.addEventListener=$fe;ue.prototype.removeEventListener=zfe;gX.exports=ue;function lX(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Nfe,protocolVersion:WO[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!WO.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${WO.join(", ")})`);let s;if(t instanceof vO)s=t;else try{s=new vO(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",l=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!l?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:l&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let P=new SyntaxError(c);if(e._redirects===0)throw P;pb(e,P);return}let d=i?443:80,u=xfe(16).toString("base64"),g=i?Lfe.request:Ife.request,f=new Set,y;if(n.createConnection=n.createConnection||(i?qfe:Vfe),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(y=new Fn({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=Ufe({[Fn.extensionName]:y.offer()})),r.length){for(let P of r){if(typeof P!="string"||!Kfe.test(P)||f.has(P))throw new SyntaxError("An invalid or duplicated subprotocol was specified");f.add(P)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),l){let P=n.path.split(":");n.socketPath=P[0],n.path=P[1]}let A;if(n.followRedirects){if(e._redirects===0){e._originalIpc=l,e._originalSecure=i,e._originalHostOrSocketPath=l?n.socketPath:s.host;let P=o&&o.headers;if(o={...o,headers:{}},P)for(let[S,p]of Object.entries(P))o.headers[S.toLowerCase()]=p}else if(e.listenerCount("redirect")===0){let P=l?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!P||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,P||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),A=e._req=g(n),e._redirects&&e.emit("redirect",e.url,A)}else A=e._req=g(n);n.timeout&&A.on("timeout",()=>{Ht(e,A,"Opening handshake has timed out")}),A.on("error",P=>{A===null||A[aX]||(A=e._req=null,pb(e,P))}),A.on("response",P=>{let S=P.headers.location,p=P.statusCode;if(S&&n.followRedirects&&p>=300&&p<400){if(++e._redirects>n.maxRedirects){Ht(e,A,"Maximum redirects exceeded");return}A.abort();let b;try{b=new vO(S,t)}catch{let h=new SyntaxError(`Invalid URL: ${S}`);pb(e,h);return}lX(e,b,r,o)}else e.emit("unexpected-response",A,P)||Ht(e,A,`Unexpected server response: ${P.statusCode}`)}),A.on("upgrade",(P,S,p)=>{if(e.emit("upgrade",P),e.readyState!==ue.CONNECTING)return;A=e._req=null;let b=P.headers.upgrade;if(b===void 0||b.toLowerCase()!=="websocket"){Ht(e,S,"Invalid Upgrade header");return}let C=Wfe("sha1").update(u+Dfe).digest("base64");if(P.headers["sec-websocket-accept"]!==C){Ht(e,S,"Invalid Sec-WebSocket-Accept header");return}let h=P.headers["sec-websocket-protocol"],_;if(h!==void 0?f.size?f.has(h)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":f.size&&(_="Server sent no subprotocol"),_){Ht(e,S,_);return}h&&(e._protocol=h);let R=P.headers["sec-websocket-extensions"];if(R!==void 0){if(!y){Ht(e,S,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let E;try{E=Bfe(R)}catch{Ht(e,S,"Invalid Sec-WebSocket-Extensions header");return}let T=Object.keys(E);if(T.length!==1||T[0]!==Fn.extensionName){Ht(e,S,"Server indicated an extension that was not requested");return}try{y.accept(E[Fn.extensionName])}catch{Ht(e,S,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Fn.extensionName]=y}e.setSocket(S,p,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(A,e):A.end()}function pb(e,t){e._readyState=ue.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Vfe(e){return e.path=e.socketPath,sX.connect(e)}function qfe(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=sX.isIP(e.host)?"":e.host),vfe.connect(e)}function Ht(e,t,r){e._readyState=ue.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Ht),t.setHeader?(t[aX]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(pb,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function OO(e,t,r){if(t){let o=jfe(t)?t.size:Gfe(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Vo[e.readyState]})`);process.nextTick(r,o)}}function Jfe(e,t){let r=this[ze];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[ze]!==void 0&&(r._socket.removeListener("data",mb),process.nextTick(cX,r._socket),e===1005?r.close():r.close(e,t))}function Yfe(){let e=this[ze];e.isPaused||e._socket.resume()}function Xfe(e){let t=this[ze];t._socket[ze]!==void 0&&(t._socket.removeListener("data",mb),process.nextTick(cX,t._socket),t.close(e[Ffe])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function nX(){this[ze].emitClose()}function Zfe(e,t){this[ze].emit("message",e,t)}function Qfe(e){let t=this[ze];t._autoPong&&t.pong(e,!this._isServer,iX),t.emit("ping",e)}function eye(e){this[ze].emit("pong",e)}function cX(e){e.resume()}function tye(e){let t=this[ze];t.readyState!==ue.CLOSED&&(t.readyState===ue.OPEN&&(t._readyState=ue.CLOSING,dX(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function dX(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function uX(){let e=this[ze];if(this.removeListener("close",uX),this.removeListener("data",mb),this.removeListener("end",pX),e._readyState=ue.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[ze]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",nX),e._receiver.on("finish",nX))}function mb(e){this[ze]._receiver.write(e)||this.pause()}function pX(){let e=this[ze];e._readyState=ue.CLOSING,e._receiver.end(),this.end()}function mX(){let e=this[ze];this.removeListener("error",mX),this.on("error",iX),e&&(e._readyState=ue.CLOSING,this.destroy())}});var SX=w((glt,hX)=>{"use strict";var mlt=gb(),{Duplex:rye}=require("stream");function fX(e){e.emit("close")}function oye(){!this.destroyed&&this._writableState.finished&&this.destroy()}function yX(e){this.removeListener("error",yX),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function nye(e,t){let r=!0,o=new rye({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let l=!i&&o._readableState.objectMode?s.toString():s;o.push(l)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(fX,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(fX,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",oye),o.on("error",yX),o}hX.exports=nye});var MO=w((flt,PX)=>{"use strict";var{tokenChars:sye}=Nl();function iye(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&sye[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let l=e.slice(r,o);if(t.has(l))throw new SyntaxError(`The "${l}" subprotocol is duplicated`);t.add(l),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}PX.exports={parse:iye}});var wX=w((hlt,EX)=>{"use strict";var aye=require("events"),fb=require("http"),{Duplex:ylt}=require("stream"),{createHash:lye}=require("crypto"),AX=db(),Ei=jl(),cye=MO(),dye=gb(),{CLOSE_TIMEOUT:uye,GUID:pye,kWebSocket:mye}=Bo(),gye=/^[+/0-9A-Za-z]{22}==$/,bX=0,_X=1,RX=2,jO=class extends aye{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:uye,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:dye,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=fb.createServer((o,n)=>{let s=fb.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=fye(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=bX}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===RX){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(bm,this);return}if(t&&this.once("close",t),this._state!==_X)if(this._state=_X,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(bm,this):process.nextTick(bm,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{bm(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",kX);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,l=+t.headers["sec-websocket-version"];if(t.method!=="GET"){wi(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){wi(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!gye.test(s)){wi(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(l!==13&&l!==8){wi(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){_m(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=cye.parse(c)}catch{wi(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&u!==void 0){let f=new Ei({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=AX.parse(u);y[Ei.extensionName]&&(f.accept(y[Ei.extensionName]),g[Ei.extensionName]=f)}catch{wi(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let f={origin:t.headers[`${l===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(f,(y,A,P,S)=>{if(!y)return _m(r,A||401,P,S);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(f))return _m(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,l){if(!s.readable||!s.writable)return s.destroy();if(s[mye])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>bX)return _m(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${lye("sha1").update(r+pye).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),u._protocol=g)}if(t[Ei.extensionName]){let g=t[Ei.extensionName].params,f=AX.format({[Ei.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${f}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",kX),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(bm,this)})),l(u,n)}};EX.exports=jO;function fye(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function bm(e){e._state=RX,e.emit("close")}function kX(){this.destroy()}function _m(e,t,r,o){r=r||fb.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${fb.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function wi(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,wi),e.emit("wsClientError",i,r,t)}else _m(r,o,n,s)}});var yye,hye,Sye,Pye,Aye,bye,TX,_ye,zl,CX=a(()=>{yye=m(SX(),1),hye=m(db(),1),Sye=m(jl(),1),Pye=m(wO(),1),Aye=m(LO(),1),bye=m(MO(),1),TX=m(gb(),1),_ye=m(wX(),1),zl=TX.default});var NO,LX=a(()=>{"use strict";NO=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var kye,DO,IX=a(()=>{"use strict";Of();LX();kye=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",DO=(e={})=>{let t=e.env??process.env,r=NO(t[xf]),o=NO(t[Wf]);return{mode:kye(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var vX=a(()=>{"use strict";Of()});var xX=a(()=>{"use strict";IX();vX()});var Rye,WX,OX=a(()=>{"use strict";Z();xt();ut();Rye={isPaused:go,loadFolders:sT,resolveFolder:nT},WX=async(e,t=Rye)=>{if(t.isPaused(e.config.layout.configPath))return{ok:!1,code:se.CODING_TOOLS_PAUSED};if(e.requestedFolderPath===null)return{ok:!1,code:se.FOLDER_REQUIRED};let r=await t.loadFolders({wsUrl:e.config.wsUrl,pairingToken:e.config.pairingToken});return t.resolveFolder({...e.projectId!==void 0?{projectId:e.projectId}:{},requestedFolderPath:e.requestedFolderPath,registeredFolders:r,managedProjectsDir:e.config.layout.projectsDir,defaultFolderPath:e.defaultFolderPath})}});var HO=a(()=>{"use strict"});var Ul,Ti,MX,wye,FO,$O,jX,NX,zO,DX,km,UO=a(()=>{"use strict";Ul=m(require("node:fs")),Ti=m(require("node:os")),MX=m(require("node:path"));HO();ta();wye=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FO=(e=Ti.default.hostname())=>MX.default.join(Ti.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),$O=e=>{if(!Ul.default.existsSync(e))return null;try{let t=JSON.parse(Ul.default.readFileSync(e,"utf8"));return!wye(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},jX=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},NX=(e,t)=>{Ul.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},zO=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??FO(),o=$O(r);if(o!==null&&o.pid!==process.pid&&Ut(o.pid)&&jX(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Ti.default.hostname(),macOsUsername:Ti.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return NX(r,n),{ok:!0}},DX=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??FO(),o=$O(r);return o!==null&&o.pid!==process.pid&&Ut(o.pid)&&jX(o)?{ok:!1}:(NX(r,{hostname:Ti.default.hostname(),macOsUsername:Ti.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},km=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??FO();$O(r)?.pid===process.pid&&Ul.default.existsSync(r)&&Ul.default.unlinkSync(r)}});var BO,Rm,Tye,Cye,Lye,Iye,GO,HX=a(()=>{"use strict";BO=require("node:child_process"),Rm=m(require("node:path"));ta();hf();Tye=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Cye=(e,t)=>{if(Tye(e)||!/\bnode\b/.test(e))return!1;let r=Rm.default.resolve(t),o=Rm.default.join(r,"app",Lc),n=Rm.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===Lc||i==="agent-witch.ts")return e.includes(r);try{let l=Rm.default.resolve(i);return l===o||l===n}catch{return i===o||i===n}})},Lye=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,BO.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Iye=(e,t,r)=>{let o=Lye(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let l=/^(\d+)\s+(.+)$/.exec(i);if(l===null)continue;let c=Number.parseInt(l[1]??"",10),d=l[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||Cye(d,t)&&n.push(c)}return n},GO=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,BO.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=Iye(r,e.installDir,t),n=[];for(let s of o)if(Ut(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var Em,wm,FX,vye,KO,$X=a(()=>{"use strict";Em=m(require("node:fs")),wm=m(require("node:path"));tt();FX=(e,t)=>{!Em.default.existsSync(e)||Em.default.existsSync(t)||(Em.default.mkdirSync(wm.default.dirname(t),{recursive:!0}),Em.default.renameSync(e,t))},vye=e=>{if(e.profileEmail===null)return;let t=wm.default.join(e.installDir,rr);FX(wm.default.join(t,Bn),e.mainLogPath),FX(wm.default.join(t,Gn),e.errorLogPath)},KO=e=>{let t=j();e!==void 0&&t.installDir!==e||vye(t)}});var zX=a(()=>{"use strict";mu();nS();nS();!Lt()&&ss(__agentWitchImportMetaUrl)&&(async()=>{Ct("agent-witch-wake-server");let e=await Ds(),t=uo(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var UX=a(()=>{"use strict";zX()});var BX=a(()=>{"use strict";ru()});var VO,GX=a(()=>{"use strict";HO();UX();UO();BX();VO=async(e={})=>{let t=e.skipInProcessBridge?null:await oS();Hh();let r=setInterval(()=>{Hh()},6e4),o=setInterval(()=>{if(!DX().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Tm,yb,Oye,KX,VX,hb,qX,JX,qO,YX,Sb,XX=a(()=>{"use strict";Tm=m(require("node:fs")),yb=m(require("node:path")),Oye="pending-run-inputs.json",KX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),VX=e=>{let t=e.profileEmail?yb.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return yb.default.join(t,Oye)},hb=e=>{let t=VX(e);if(!Tm.default.existsSync(t))return{};try{let r=JSON.parse(Tm.default.readFileSync(t,"utf8"));return KX(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!KX(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",l=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||l.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:l,accumulatedOutput:c}]]})):{}}catch{return{}}},qX=(e,t)=>{let r=VX(e);Tm.default.mkdirSync(yb.default.dirname(r),{recursive:!0}),Tm.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},JX=e=>Object.values(hb(e)),qO=(e,t)=>hb(e)[t]!==void 0,YX=(e,t)=>{let r=hb(e);r[t.agentRunId]=t,qX(e,r)},Sb=(e,t)=>{let r=hb(e);delete r[t],qX(e,r)}});var Pb=a(()=>{"use strict";Z()});var ZX=a(()=>{"use strict";Z()});var Ab=a(()=>{"use strict";Z()});var bb=a(()=>{"use strict";Z()});var Cm=a(()=>{"use strict";Z()});var Mye,jye,Lm,JO=a(()=>{"use strict";ar();Pb();ZX();Ab();bb();Cm();Mye={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},jye={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Lm=e=>{if(!xe(e.writerAgent))return"the selected writer";let t=It(e.writerAgent);if(rt(e.writerExecutionBackend)==="api"&&t!==null){let r=yt(qe(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=cd(t,r.model);return`${jye[t]} model ${o}`}}return Mye[e.writerAgent]}});var Nye,Dye,QX,e9,t9=a(()=>{"use strict";Nye=/"input_tokens"\s*:\s*(\d+)/,Dye=/"output_tokens"\s*:\s*(\d+)/,QX=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},e9=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=QX(Nye.exec(t)),o=QX(Dye.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var _b=a(()=>{"use strict";xt()});var $n,Im,Hye,n9,XO,YO,s9,Fye,i9,ZO,a9,r9,l9,$ye,o9,QO,c9=a(()=>{"use strict";$n=m(require("node:fs")),Im=m(require("node:path"));ut();Z();_b();Hye="run-completion-outbox.json",n9="run-completion-posted.json",XO=(e,t)=>{let r=e.profileEmail?Im.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Im.default.join(r,t)},YO=e=>XO(e,Hye),s9=e=>{try{let t=JSON.parse($n.default.readFileSync(XO(e,n9),"utf8"));return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]}catch{return[]}},Fye=(e,t)=>{let r=XO(e,n9);$n.default.mkdirSync(Im.default.dirname(r),{recursive:!0}),$n.default.writeFileSync(r,JSON.stringify(py(s9(e),t)),"utf8")},i9=(e,t)=>s9(e).includes(t),ZO=e=>{let t=YO(e);if(!$n.default.existsSync(t))return[];try{let r=JSON.parse($n.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},a9=(e,t)=>{$n.default.mkdirSync(Im.default.dirname(YO(e)),{recursive:!0}),$n.default.writeFileSync(YO(e),JSON.stringify(t,null,2),"utf8")},r9=(e,t)=>{a9(e,ZO(e).filter(r=>r.runId!==t))},l9=(e,t)=>{if(i9(e,t.runId))return;let r={...t,output:nd(t.output,da("secretHidden"))},o=[...ZO(e).filter(n=>n.runId!==t.runId),r];a9(e,o)},$ye=async e=>{for(let t of ZO(e.layout)){if(i9(e.layout,t.runId)){r9(e.layout,t.runId);continue}await zd(e.cloudApi,t.runId,t.exitCode,t.output,{estimateSeconds:t.estimateSeconds,actualSeconds:t.actualSeconds})&&(Fye(e.layout,t.runId),r9(e.layout,t.runId))}},o9={chain:Promise.resolve()},QO=e=>{let t=e.cloudApi;if(t===null)return Promise.resolve();let r=o9.chain.then(()=>$ye({layout:e.layout,cloudApi:t}));return o9.chain=r.catch(()=>{}),r}});var d9=a(()=>{"use strict"});var eM,vm,Uye,Ci,u9=a(()=>{"use strict";Z();d9();eM=new Map,vm=e=>{let t=eM.get(e);t!==void 0&&(clearInterval(t),eM.delete(e))},Uye=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify(ks({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}})))},Ci=(e,t,r,o={})=>{vm(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){vm(t);return}let i=o.onTick?.()??{};Uye(e,t,n,i)};s(),eM.set(t,setInterval(s,15e3))}});var p9=a(()=>{"use strict";xt()});var m9,g9=a(()=>{"use strict";p9();m9=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:je(t)}});var tM,xm,qo,rM,io,f9,kb=a(()=>{"use strict";tM=new Set,xm=new Map,qo=(e,t)=>{if(t.length===0)return;let r=xm.get(e)??[];r.push(t),xm.set(e,r)},rM=e=>{tM.add(e);let t=xm.get(e)??[];return xm.delete(e),t},io=e=>tM.has(e),f9=e=>{tM.delete(e),xm.delete(e)}});var y9,h9=a(()=>{"use strict";y9=e=>e==null||!Number.isFinite(e)||e<=0?null:{limitSeconds:Math.floor(e)}});var S9,oM,Rb,P9,Wm,Bye,A9,Gye,b9,nM=a(()=>{"use strict";h9();Jf();S9=y9(sd.maxMinutes*60)??{limitSeconds:1800},oM=5e3,Rb=new Map,P9=(e,t,r=S9)=>{Wm(e);let o=setTimeout(()=>{Rb.delete(e),t()},r.limitSeconds*1e3);o.unref?.(),Rb.set(e,o)},Wm=e=>{let t=Rb.get(e);t!==void 0&&(clearTimeout(t),Rb.delete(e))},Bye=(e=S9)=>`You've hit your session limit on this computer: the run was stopped after ${Math.round(e.limitSeconds/60)} minutes.`,A9=e=>{let t=Bye(),r=e.trim();return r.length>0?`${r}

${t}`:t},Gye=e=>e.exitCode===null&&e.signalCode===null,b9=(e,t=oM)=>{let r=n=>{let s=e.pid;if(typeof s=="number"&&process.platform!=="win32")try{process.kill(-s,n);return}catch{}try{e.kill(n)}catch{}};r("SIGTERM"),setTimeout(()=>{Gye(e)&&r("SIGKILL")},t).unref?.()}});var Bl,_9,k9,R9=a(()=>{"use strict";Bl=m(require("node:path")),_9=require("node:url");ns();k9=()=>{if(Lt()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Bl.default.dirname(Bl.default.resolve(e)):Bl.default.dirname(Bl.default.resolve(__filename))}return Bl.default.dirname((0,_9.fileURLToPath)(__agentWitchImportMetaUrl))}});var E9,w9,T9,C9,Rt,Gl,L9,I9,Kl,sM,iM,aM,v9,lM,x9,Eb=a(()=>{"use strict";E9=require("node:crypto"),w9=m(require("node:fs")),T9=m(require("node:path")),C9=require("node:url");ta();nM();ns();R9();Rt=new Map,L9=async()=>{if(Gl!==void 0)return Gl;try{if(Lt()){let e=k9(),t=T9.default.join(e,"deps","node-pty","lib","index.js");if(w9.default.existsSync(t)){let r=await import((0,C9.pathToFileURL)(t).href);return Gl=r,r}}return Gl=await import("node-pty"),Gl}catch{return Gl=null,null}},I9=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Kl=(e,t,r)=>{let o=Rt.get(e);if(o!==void 0){Rt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},sM=(e,t)=>{let r=Rt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},iM=(e,t,r)=>{let o=Rt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},aM=e=>{for(let t of Rt.values())if(!(t.mode!=="agent"||t.runId!==e))return Ut(t.pty.pid);return!1},v9=e=>{for(let[t,r]of Rt.entries()){if(r.mode!=="agent"||r.runId!==e)continue;Rt.delete(t);let o=r.pty.pid;try{r.pty.kill()}catch{}return setTimeout(()=>{if(Ut(o))try{process.kill(o,"SIGKILL")}catch{}},oM).unref(),!0}return!1},lM=async e=>{let t=await L9();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this computer. Install AgentWitch deps again.\r
`},requestId:e.requestId}),!1;Rt.get(e.shellSessionId)!==void 0&&Kl(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Rt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{I9(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Rt.get(e.shellSessionId)?.pty===n&&(Rt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},x9=async e=>{let t=e.shellSessionId??(0,E9.randomUUID)(),r=await L9();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Rt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{I9(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Rt.get(t)?.pty===o&&(Rt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var wb,W9,O9=a(()=>{"use strict";wb="[[AWAITING_INPUT]]",W9=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",wb,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Om,M9,Tb=a(()=>{"use strict";O9();Om=e=>{let t=e.indexOf(wb);if(t<0)return null;let o=e.slice(t+wb.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},M9=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",W9].join(`
`)});var j9,N9=a(()=>{"use strict";kb();Eb();Tb();j9=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(io(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}qo(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await x9({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Om(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var H9,F9,$9,D9,Jo,Cb=a(()=>{"use strict";H9=require("node:child_process"),F9=m(require("node:fs")),$9=m(require("node:path"));hf();D9=12e4,Jo=(e,t)=>{let r=$9.default.join(e,"app",jD,"ensure-writer.sh");return F9.default.existsSync(r)?new Promise((o,n)=>{let s=(0,H9.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},l=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(D9/1e3)}s`))},D9);s.on("error",c=>{clearTimeout(l),n(c)}),s.on("close",c=>{if(clearTimeout(l),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var z9,Li,jm,Lb,cM,Mm,Ib,vb,dM,uM,Kye,Vl,Vye,qye,pM,mM=a(()=>{"use strict";z9=require("node:child_process");ar();Cb();Ab();Pb();Cm();bb();Li=new Map,jm=e=>e==="cursor"||e==="antigravity",Lb=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",cM=e=>Li.get(e)?.warmed===!0,Mm=e=>{let t=Li.get(e);Li.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Ib=e=>Li.get(e)?.conversationStarted===!0,vb=e=>{let t=Li.get(e);Li.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},dM=e=>{Li.delete(e)},uM=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Kye={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Vl=e=>`${Kye[e]} is ready on your computer.
Send a task from the box below when you are ready.
`,Vye=(e,t,r,o)=>new Promise(n=>{let s=Xf(t,r),i=[],l=(0,z9.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};l.stdout?.on("data",c),l.stderr?.on("data",c),l.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),l.on("error",d=>{n({exitCode:-1,output:d.message})})}),qye=(e,t)=>{let r=Vl(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},pM=async e=>{if(!xe(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&rt(e.runConfig.writerExecutionBackend)==="api"){let r=It(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=qe(e.runConfig.layout.configPath);return yt(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this computer (no local CLI).
`),Mm(e.writerAgent),{exitCode:0,output:Vl(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your computer\u2026
`),await Jo(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}jm(e.writerAgent)&&Mm(e.writerAgent);let t=await Vye(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?qye(e.writerAgent,t.output):Vl(e.writerAgent)}}});var xb,U9=a(()=>{"use strict";xb={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var B9,G9=a(()=>{"use strict";B9="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var K9,V9=a(()=>{"use strict";ut();G9();K9=e=>e.code===ys.SESSION_LIMIT?B9:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var q9,J9=a(()=>{"use strict";ut();U9();V9();q9=e=>{let t=tR(e.output);return t!==null?{status:xb.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:K9(t)}:{status:e.exitCode===0?xb.COMPLETED:xb.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var gM,Pdt,Y9=a(()=>{"use strict";gM={OPEN:"open",APPROVAL:"approval"},Pdt=gM.APPROVAL});var ql,Wb,X9,Jye,Z9,Q9,eZ,Jl,fM,yM=a(()=>{"use strict";ql=m(require("node:fs")),Wb=m(require("node:path")),X9="runs",Jye=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z9=e=>{let t=e.profileEmail!==null?Wb.default.join(e.installDir,"profiles",e.profileEmail,X9):Wb.default.join(e.installDir,X9);return ql.default.mkdirSync(t,{recursive:!0}),t},Q9=(e,t)=>Wb.default.join(Z9(e),`${t}.json`),eZ=(e,t)=>{ql.default.writeFileSync(Q9(e,t.id),JSON.stringify(t,null,2))},Jl=(e,t)=>{let r=Q9(e,t);if(!ql.default.existsSync(r))return null;try{let o=JSON.parse(ql.default.readFileSync(r,"utf8"));return!Jye(o)||typeof o.id!="string"?null:o}catch{return null}},fM=e=>{let t=Z9(e),r=ql.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Jl(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var Yye,tZ,rZ=a(()=>{"use strict";J9();Y9();yM();Yye=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=q9({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:gM.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},tZ=(e,t)=>{let r=Yye(t);return eZ(e,r),r}});var oZ=a(()=>{"use strict";sA()});var nZ,sZ=a(()=>{"use strict";ut();nZ=()=>[Vf,`agentRunWriterExecutionBackend=${qf}`,`agentRunWriterExecutionReasonCode=${rR}`].join(`
`)});var zn,Ob=a(()=>{"use strict";zn=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var hM,Xye,Zye,iZ,aZ=a(()=>{"use strict";hM=e=>e.toLocaleString("en-US"),Xye=e=>e<.01?e.toFixed(4):e.toFixed(3),Zye=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Xye(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${hM(e.inputTokens)} in / ${hM(e.outputTokens)} out (${hM(e.totalTokens)} total)`,t].join(`
`)},iZ=(e,t)=>{if(t===void 0)return e;let r=Zye(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var lZ=a(()=>{"use strict";Z()});var uZ,Nm,Ie,Mb,SM,jb,cZ,dZ,Qye,ehe,pZ,mZ,gZ,Dm,PM,AM,bM,fZ,the,tr,Hm,Yo,yZ,rhe,ohe,Nb,_M,kM,Fm,nhe,RM,hZ=a(()=>{"use strict";uZ=require("node:child_process");Z();ut();ar();XX();xp();JO();t9();ld();c9();_b();u9();ta();g9();kb();Eb();Tb();N9();nM();Jf();mM();rZ();oZ();sZ();Ob();aZ();ra();lZ();Cm();Oc();Tb();Nm=new Map,Ie=new Map,Mb=new Set,SM=new Set,jb=new Map,cZ=Ad(),dZ=e=>{e!==void 0&&!jb.has(e)&&jb.set(e,Date.now())},Qye=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(io(t)){tr(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}qo(t,n)},ehe=(e,t,r,o,n)=>{if(!BR(e,n))return;let s=`${nZ()}
`;Qye(t,r,o,s);let i=Ie.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},pZ=130,mZ=`

Stopped by user.`,gZ=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:zn(e)},Dm=null,PM=e=>{Dm=e},AM=(e,t)=>{if(Dm===null)return;let r=vv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||KE(Dm,t,r)},bM=async e=>{await QO({layout:e,cloudApi:Dm})},fZ=e=>{let t=Nm.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Ut(t.pid)},the=e=>Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),tr=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(ks(t)))},Hm=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let l=Gi(s),c=Ie.get(r);if(l!==null&&c!==void 0){let d=KD(l),u=fZ(r)||aM(r);d!==null&&!u&&Yo(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return GD(l)}}),Yo=(e,t,r,o,n,s,i,l,c)=>{if(r!==void 0){if(cZ.has(r))return;cZ.add(r)}let d=ua(s,l),u=n,g=iZ(d.output,d.llmUsage);if(r!==void 0){let y=jb.get(r);jb.delete(r),y!==void 0&&Lv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-y)/1e3))});let A=e9(d.llmUsage,g);A!==null&&t8({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:A})}r!==void 0&&Wm(r),r!==void 0&&SM.has(r)?(SM.delete(r),Mb.delete(r),u=UH,g=A9(g.replace(/\n*Stopped by user\.$/,""))):r!==void 0&&Mb.has(r)&&(Mb.delete(r),u=pZ,g=g.trim().length>0&&!g.includes("Stopped by user.")?`${g.trim()}${mZ}`:"Stopped by user."),g=an(g).scrubbed;let f=r!==void 0?vv(e.layout.reportsDir,r):null;if(r!==void 0){vm(r),hd(e.layout,r),io(r)&&(tr(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),f9(r));let y=Ie.get(r);ZY({reportsDir:e.layout.reportsDir,agentRunId:r,input:zn(i),output:g,...y!==void 0?{writerLabel:Lm({writerAgent:y.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),y!==void 0&&oA({layout:e.layout,writerAgent:y.writerAgent,projectFolderPath:y.projectFolderPath,userPrompt:y.userTranscriptPrompt,assistantOutput:g,agentRunId:r}),tZ(e.layout,{agentRunId:r,originalPrompt:i,exitCode:u,output:g,layout:e.layout}),l9(e.layout,{runId:r,exitCode:u,output:g,createdAt:new Date().toISOString(),...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{}}),QO({layout:e.layout,cloudApi:Dm}),Ie.delete(r),Nm.delete(r),Sb(e.layout,r)}tr(t,{type:"command.claude.result",payload:{exitCode:u,output:g,...r!==void 0?{agentRunId:r}:{},...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{},...l!==void 0?{llmUsage:l}:{},...c!==void 0?{errorCode:c}:{}},requestId:o}),qc(e.layout)},yZ=(e,t,r,o,n,s,i)=>{let l=Ie.get(r),c=l?.accumulatedOutput??s;Wm(r),YX(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Ci(t,r,()=>qO(e.layout,r),Hm(e,t,r,o,l?.projectFolderPath,l?.reportKey,!0)),tr(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},rhe=(e,t,r,o,n,s,i,l)=>{let c=[],d=!1,u=y=>{if(!(n===void 0||y.length===0)){if(io(n)){tr(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:y},requestId:o});return}qo(n,y)}};if(n!==void 0){let y=Ie.get(n);Nm.set(n,t),Ie.set(n,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:l,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,accumulatedOutput:y?.accumulatedOutput??""}),tr(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Ci(r,n,()=>fZ(n),Hm(e,r,n,o,y?.projectFolderPath,y?.reportKey))}let g=l==="claude-cli",f=[];t.stdout?.on("data",y=>{let A=y.toString("utf8");if(g?f.push(A):(c.push(A),u(A)),d||n===void 0)return;let P=Om(c.join(""));if(P!==null){d=!0,t.kill("SIGTERM");let S=Ie.get(n),p=[S?.accumulatedOutput??"",P.partialOutput].filter(b=>b.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=p),Nm.delete(n),yZ(e,r,n,o,P.question,p,s)}}),t.stderr?.on("data",y=>{let A=y.toString("utf8");c.push(A),u(A)}),t.on("close",y=>{if(d)return;vb(l);let A=n!==void 0?Ie.get(n):void 0,P=g?ua(f.join("")):{output:c.join("").trim(),llmUsage:void 0},S=g?c.join("").trim():"",p=[P.output.trim(),S].filter(C=>C.length>0).join(`
`);g&&P.output.trim().length>0&&u(P.output);let b=A!==void 0&&A.accumulatedOutput.length>0?`${A.accumulatedOutput}

${p}`.trim():p;Yo(e,r,n,o,y??-1,b,s,P.llmUsage)}),t.on("error",y=>{d||Yo(e,r,n,o,-1,y.message,s)})},ohe=(e,t,r,o,n,s,i,l,c)=>{let d=gZ(r,c);s!==void 0&&(Ie.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:l,accumulatedOutput:""}),tr(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Ci(n,s,()=>Ie.has(s),Hm(e,n,s,o,i,l))),pd(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(io(s)){tr(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}qo(s,g)}}).then(g=>{vb(t),Yo(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let f=g instanceof Error?g.message:String(g);Yo(e,n,s,o,-1,f,r)})},Nb=(e,t,r,o,n,s,i,l,c,d,u,g)=>{let f=gZ(r,u);Vc(e.layout);let y=p=>{Yo(e,n,s,o,-1,Ss(p),r,void 0,p)};if(go(e.layout.configPath)){y(se.CODING_TOOLS_PAUSED);return}if(bs(e,t)){dZ(s),ohe(e,t,r,o,n,s,c,d,f);return}let A=Bt(t,r,the(e),i);if(A===null){Yo(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}if(c===void 0||c.trim().length===0){y(se.FOLDER_REQUIRED);return}dZ(s);let P=m9({workspace:e.workspace,projectFolderPath:c}),S=()=>{let p=(0,uZ.spawn)(A.command,[...A.args],{cwd:P,stdio:["ignore","pipe","pipe"],env:g??process.env,detached:process.platform!=="win32"});rhe(e,p,n,o,s,r,f,t)};if(s===void 0){S();return}P9(s,()=>{nhe(e,n,s,o)}),Ie.set(s,{originalPrompt:r,userTranscriptPrompt:f,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Ie.get(s)?.accumulatedOutput??""}),ehe(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Wc({reportKey:d,agentRunId:s,userSummary:"Task started on your computer."}),Ci(n,s,()=>Ie.has(s),Hm(e,n,s,o,c,d)),j9({socket:n,sendMessage:tr,requestId:o,agentRunId:s,shellSessionId:l,command:A.command,args:A.args,cwd:P,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:p=>{l!==void 0&&Kl(l,h=>{tr(n,h)},o);let b=Ie.get(s),C=[b?.accumulatedOutput??"",p.partialOutput].filter(h=>h.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=C),yZ(e,n,s,o,p.question,C,r)},onFinished:(p,b)=>{vb(t);let C=ua(b),h=Ie.get(s),_=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${C.output}`.trim():C.output;Yo(e,n,s,o,p,_,r,C.llmUsage)}}).then(p=>{if(!p){S();return}Ci(n,s,()=>aM(s),Hm(e,n,s,o,c,d))}).catch(p=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",p instanceof Error?p.message:p),S()})},_M=(e,t,r,o)=>{Sb(e.layout,t.agentRunId),t.shellSessionId!==void 0&&tr(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=M9(t),s=Ie.get(t.agentRunId),i=s?.writerAgent??"claude-cli",l=s?.projectFolderPath,c=s?.reportKey;Nb(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,l,c,s?.userTranscriptPrompt)},kM=(e,t)=>{for(let r of JX(e.layout))Ie.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:zn(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Ci(t,r.agentRunId,()=>qO(e.layout,r.agentRunId),{awaitingInput:!0}),tr(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Fm=(e,t,r,o)=>{let n=Ie.get(r);if(n===void 0)return!1;Mb.add(r),vm(r),Wm(r);let s=Nm.get(r);if(s!==void 0)return b9(s),!0;if(v9(r))return!0;Sb(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${mZ}`:"Stopped by user.";return Yo(e,t,r,o,pZ,i,n.originalPrompt),!0},nhe=(e,t,r,o)=>Ie.has(r)?(SM.add(r),Fm(e,t,r,o)):!1,RM=(e,t)=>[...Ie.keys()].filter(r=>Fm(e,t,r)).length});var she,EM,SZ=a(()=>{"use strict";Rd();she=()=>`http://127.0.0.1:${lr()}/restart`,EM=async()=>{try{let e=await fetch(she(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var PZ=a(()=>{"use strict";Su()});var AZ=a(()=>{"use strict";mx()});var wM,bZ=a(()=>{"use strict";wM=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var $m,ihe,TM,CM,_Z=a(()=>{"use strict";q();pe();PZ();LT();AZ();bZ();ra();$m=(e,t)=>{bn(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},ihe=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Jk(),qk)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},TM=e=>wM({localBundleVersion:Be(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),CM=async e=>{let t=Be(e.layout.installDir)?.bundleVersion??null;if(!wM({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(ir(e.layout)){Jc({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),$m(e.layout,{summary:r,action:"install-bundle-update-start"}),co({launchAgentLabel:Re(e.layout.installDir),installDir:e.layout.installDir});let o=await Rl({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),$m(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await ihe();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),$m(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),$m(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),$m(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var ahe,LM,kZ=a(()=>{"use strict";ahe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LM=e=>{if(!ahe(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var IM,vM,RZ=a(()=>{"use strict";uT();pT();IM=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=ou({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},vM=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Eo(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var EZ,lhe,che,dhe,Yl,wZ=a(()=>{"use strict";EZ=m(require("node:os"));tt();lhe="Default",che=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),dhe=e=>{let t=EZ.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Yl=()=>{let e=j(),t=hc(e),r=che(lhe);return`${dhe(t)}/${r.length>0?r:"project"}`}});var TZ=a(()=>{"use strict";Su()});var CZ,xM,LZ=a(()=>{"use strict";TZ();CZ=!1,xM=e=>{CZ||(CZ=!0,process.on("uncaughtException",t=>{Fs(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;Fs(e,{kind:"crash",message:r,stack:o})}))}});var IZ,uhe,WM,vZ=a(()=>{"use strict";IZ=require("node:child_process");Cb();ar();Ab();Pb();Cm();bb();uhe=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,IZ.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},WM=async e=>{if(!xe(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&rt(e.runConfig.writerExecutionBackend)==="api"){let r=It(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=qe(e.layout.configPath),n=yt(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.`}}}try{await Jo(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await uhe(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var OM,xZ=a(()=>{"use strict";OM=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var WZ,MM,OZ=a(()=>{"use strict";WZ=require("node:crypto"),MM=()=>(0,WZ.randomUUID)()});var Xl,MZ,Db=a(()=>{"use strict";Xl="[[WORKING_ESTIMATE]]",MZ=(e,t,r,o="")=>["Estimate how long the following task will take on this computer, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Xl,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var jZ,NZ=a(()=>{"use strict";jZ=e=>e===null||e<=0?"Estimate saved locally. Starting work on your computer\u2026":e<60?`Estimated ~${e}s. Starting work on your computer\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your computer\u2026`});var phe,DZ,HZ=a(()=>{"use strict";Db();phe=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,DZ=e=>{if(!e.includes(Xl))return null;let t=null;for(let r of e.matchAll(phe)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var mhe,jM,FZ=a(()=>{"use strict";HZ();mhe=/^(\d{1,6})\b/,jM=e=>{let t=DZ(e);if(t!==null)return t;let r=mhe.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var ghe,fhe,yhe,Hb,NM=a(()=>{"use strict";ar();fu();ghe="http://127.0.0.1:11434",fhe=45e3,yhe=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Hb=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||ghe,o=t===void 0?(await mr({commands:Ae({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(fhe)});return n.ok?yhe(await n.json()):null}catch{return null}}});var DM,HM,FM,$Z=a(()=>{"use strict";Oc();Db();Ob();NZ();FZ();xp();NM();DM=async e=>{let t=zn(e.wrappedPrompt),r=QY(e.reportsDir);return{estimateOutput:await Hb(MZ(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},HM=e=>{let t=jM(e.estimateOutput);t!==null&&YP({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},FM=e=>{let t=jM(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=jZ(t);return xc({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Or.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),YP({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Fb,zZ,$M=a(()=>{"use strict";Fb="[[WORKING_TOKEN_ESTIMATE]]",zZ=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this computer.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Fb,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var UZ,hhe,BZ,GZ=a(()=>{"use strict";$M();UZ=/^(\d{1,8})\b/,hhe=e=>{let t=e.indexOf(Fb);if(t<0)return null;let r=e.slice(t+Fb.length).trim(),o=UZ.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},BZ=e=>{let t=hhe(e);if(t!==null)return t;let r=UZ.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var zM,UM,KZ=a(()=>{"use strict";$M();Ob();GZ();xp();NM();zM=async e=>{let t=zn(e.wrappedPrompt),r=r8(e.reportsDir);return{estimateOutput:await Hb(zZ(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},UM=e=>{let t=BZ(e.estimateOutput);return t===null?null:(e8({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var VZ=a(()=>{"use strict";UO();HX();$X();GX();Rd();hZ();Cb();ar();yM();kb();SZ();ST();_Z();ra();kZ();RZ();_b();wZ();LZ();vZ();Sf();xZ();OZ();Db();Oc();$Z();KZ();JO();fu();Eb();mM()});var qZ={};Et(qZ,{buildContinuationPromptWithContext:()=>Ahe});var She,Phe,Ahe,JZ=a(()=>{"use strict";She=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Phe=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Ahe=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=Phe(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${She(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var YZ={};Et(YZ,{readHarnessExportSets:()=>_he});var zm,BM,$b,bhe,_he,XZ=a(()=>{"use strict";zm=m(require("node:fs")),BM=m(require("node:path"));tt();$b=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bhe=e=>{if(!zm.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(zm.default.readFileSync(e.harnessManifestPath,"utf8"));if($b(t))return t}catch{return null}return null},_he=(e,t)=>{let r=j(t),o=bhe(r);if(o===null)return[];let n=$b(o.sets)?o.sets:{},s=[];for(let i of e){let l=n[i];if(!$b(l)||typeof l.name!="string")continue;let c=Array.isArray(l.items)?l.items:[],d=[];for(let u of c){if(!$b(u))continue;let g=typeof u.path=="string"?u.path:void 0,f=typeof u.id=="string"?u.id:"",y=typeof u.kind=="string"?u.kind:"",A=typeof u.title=="string"?u.title:"";if(g===void 0||f.length===0||y.length===0||A.length===0)continue;let P=g.startsWith("shared/")?BM.default.join(r.harnessRootDir,g):BM.default.join(r.harnessSetsDir,i,g);zm.default.existsSync(P)&&d.push({id:f,kind:y,title:A,content:zm.default.readFileSync(P,"utf8")})}d.length>0&&s.push({name:l.name,slug:i,items:d})}return s}});var XM,VM,Zl,ZZ,khe,QZ,eQ,GM,tQ,qM,JM,YM,rQ,KM,ae,X,zb,Rhe,Um,Ehe,whe,The,Che,Lhe,Ihe,vhe,xhe,Bm,oQ=a(()=>{"use strict";XM=require("node:child_process"),VM=m(require("node:fs")),Zl=m(require("node:os"));CX();q();pe();fs();cO();xX();Z();Q0();Z();jr();Su();HC();tb();sA();xt();gn();HT();Tt();ut();OX();VZ();ZZ=3e4,khe=3e4,QZ=new Map,eQ=new Map,GM=new Map,tQ=new Map,qM=new Map,JM=new Map,YM=new Map,rQ=Ad(),KM=new Set,ae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X=(e,t,r)=>{if(e.readyState===zl.OPEN){let o=ks(t);e.send(JSON.stringify(o)),r!==void 0&&(bn(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),sS(r,"out",o))}},zb=e=>e,Rhe=e=>{if(!VM.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(VM.default.readFileSync(e.harnessManifestPath,"utf8"));if(ae(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Um=(e,t)=>{let r=Rhe(t);r!==null&&X(e,{type:"harness.manifest.report",payload:{hostname:Zl.default.hostname(),manifest:r}})},Ehe=async(e,t,r,o,n,s,i=!1,l,c,d,u,g)=>{let f=g?.trim()??"";if(!xe(t)){X(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let y=Lm({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),A=await mr({commands:Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),P=s!==void 0?DM({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:A?.estimateModel,capabilityNote:A?.capabilityNote}).catch(()=>null):null,S=s!==void 0?zM({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:A?.estimateModel,capabilityNote:A?.capabilityNote}).catch(()=>null):null,p=jm(t)&&!cM(t);if(p){try{await Jo(e.layout.installDir,t)}catch(N){let J=N instanceof Error?N.message:String(N);X(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${J}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Mm(t)}else if(!jm(t))try{await Jo(e.layout.installDir,t)}catch(N){let J=N instanceof Error?N.message:String(N);X(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${J}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let b=fd(d,Yl,g);if(b===null){X(n,bd({code:se.FOLDER_REQUIRED,...s!==void 0?{agentRunId:s}:{},...o!==void 0?{requestId:o}:{}}));return}pt({projectFolderPath:b,...f.length>0?{projectId:f}:{}}),i||Np(e.layout,t,b);let C=nA({sessionContinuation:i,supportsWriterSessionContinuation:Lb(t),isWriterConversationStarted:Ib(t)}),h=i&&C==="first"?jp(e.layout,t,b):null,_=h!==null?_l(e.layout,h):null,R=_!==null&&_.turns.length>0,E=Kv({sessionContinuation:i,supportsWriterSessionContinuation:Lb(t),isWriterConversationStarted:Ib(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:R,userPromptCharacterCount:r.length}),T=r;if(E.continuationStrategy==="source_run_seed"){let N=typeof c=="string"&&c.length>0?Jl(e.layout,c):null;if(N!==null){let{buildContinuationPromptWithContext:J}=await Promise.resolve().then(()=>(JZ(),qZ));T=J({priorPrompt:N.prompt,priorOutput:N.resultOutput??"",userMessage:r})}}else E.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(T=QP({priorTurns:_.turns,userMessage:r}));let x=E.ragLimit>0?await Ka({layout:e.layout,query:T,limit:E.ragLimit,minScore:E.ragMinScore,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],W=E.ragLimit>0&&b.trim().length>0?await NC({layout:e.layout,query:T,limit:2,minScore:.32,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],z=E.injectMemory?jv(e.layout,b,f.length>0?f:void 0):[],O=`${Dv(z,E.memoryEntryLimit)}${OC(x)}${DC(W)}${T}`,U=u?.trim()??(s!==void 0&&b.trim().length>0?MM():void 0);if(s!==void 0&&U!==void 0&&U.length>0&&b.trim().length>0){Wc({reportKey:U,agentRunId:s,userSummary:"Working on your computer\u2026"});let N=O;P!==null&&P.then(J=>{if(J===null)return;let Er=FM({estimateOutput:J.estimateOutput??"",reportKey:U,agentRunId:s,reportsDir:e.layout.reportsDir,task:J.task,writerLabel:J.writerLabel,embedding:J.embedding});if(Er.estimateSeconds===null)return;AM(e.layout.reportsDir,s);let wr=`${Xl}
${Er.estimateSeconds}
`;if(io(s)){X(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:wr},requestId:o});return}qo(s,wr)}).catch(()=>{}),O=OM(N),O=dk(O,{agentRunId:s,reportKey:U,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&P!==null&&P.then(N=>{N!==null&&HM({estimateOutput:N.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:N.task,writerLabel:N.writerLabel,embedding:N.embedding})}).catch(()=>{}),s!==void 0&&S!==null&&S.then(N=>{N!==null&&UM({estimateOutput:N.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:N.task,writerLabel:N.writerLabel})}).catch(()=>{});let he=s!==void 0&&YM.get(s)===!0;if(s!==void 0&&b.trim().length>0){let N=await dh(b);JM.set(s,N),U!==void 0&&U.length>0&&qM.set(s,U)}Nb(e,t,O,o,zb(n),s,{sessionTurn:E.sessionTurn},l,b,U,r,HR(e.layout,s,he)),p&&s!==void 0&&X(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:uM(t)},requestId:o})},whe=async(e,t,r,o,n)=>{let s=(i,l)=>{X(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:l},requestId:o})};try{let i="",l=await pM({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,X(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=xe(t)?t:"claude-cli",d=l.exitCode!==0?l.output:i.length>0?Vl(c):l.output;s(d,l.exitCode)}catch(i){let l=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",l),s(`Failed to start ${t} session: ${l}
`,-1)}},The=(e,t,r)=>new Promise(o=>{if(!xe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Bt(t,r,Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,XM.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",l=>{s.push(l.toString("utf8"))}),i.stderr?.on("data",l=>{s.push(l.toString("utf8"))}),i.on("close",l=>{o({exitCode:l??-1,output:s.join("").trim()})}),i.on("error",l=>{o({exitCode:-1,output:l.message})})}),Che=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;X(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Fr(t.bundle),s=ae(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Ge(e.wsUrl)??wt,g=await TE({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return X(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let l=Ts({bundle:i,layout:e.layout});return X(o,{type:"harness.request.result",payload:{success:l.ok,writerAgent:"deterministic",exitCode:l.ok?0:1,output:l.ok?`Installed harness set "${i.slug}" (${l.writtenItemCount??0} files).`:l.errorMessage??"Harness install failed.",...l.ok?{}:{errorMessage:l.errorMessage??"Harness install failed."}},requestId:r}),l.ok&&Um(o,e.layout),!0},Lhe=async(e,t,r,o)=>{if(await Che(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(X(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){X(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!xe(n)){X(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}if(go(e.layout.configPath)){X(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorCode:se.CODING_TOOLS_PAUSED,errorMessage:bd({code:se.CODING_TOOLS_PAUSED}).payload.output},requestId:r});return}Vc(e.layout);let i=await(async()=>{try{await Jo(e.layout.installDir,n)}catch(l){let c=l instanceof Error?l.message:String(l);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return The(e,n,s)})().finally(()=>{qc(e.layout)});X(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Um(o,e.layout)},Ihe=e=>{let t=1e3*2**e;return Math.min(khe,t)},vhe=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>t.restartInFlight?"already_in_progress":ir(e.layout)?(Yc(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,EM().then(b=>{if(b.ok){console.log("[agent-witch] Local restart completed.");return}if(!b.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",b.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=(p,b,C,h)=>{X(p,{type:"device.restart.ack",payload:qR({status:C,reason:b}),...h!==void 0?{requestId:h}:{}},e.layout)},n=(p,b="system.ack")=>{if(!t.selfUpdateInFlight&&TM({installDir:e.layout.installDir,remoteBundleVersion:p})){if(ir(e.layout)){Jc({layout:e.layout,remoteBundleVersion:p,trigger:b}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${b}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,CM({layout:e.layout,remoteBundleVersion:p,trigger:b}).finally(()=>{t.selfUpdateInFlight=!1})}},s=()=>{let p=Oe(e.layout);p!==null&&Ke(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,c(),d(),A())},i=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},l=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},c=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},d=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===zl.OPEN||p.readyState===zl.CONNECTING)&&p.close()},u=()=>{l(),t.localHealthTimer=setInterval(s,ZZ)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=Ihe(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},p)},f=p=>{i();let b=()=>{let C=Uc(e.layout.installDir),h=lr();X(p,{type:"agent.heartbeat",payload:{hostname:Zl.default.hostname(),macOsUsername:Zl.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:C}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};b(),t.heartbeatTimer=setInterval(b,ZZ)},y=(p,b)=>{if(typeof p.type!="string")return;if(DT(p)){t.stopped=!0,i(),c(),d(),MT({layout:e.layout}).finally(()=>{km(),process.exit(0)});return}bn(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),sS(e.layout,"in",p);let C=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&ae(p.payload)){let h=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",_=typeof p.payload.origin=="string"?p.payload.origin:"",R=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",E=typeof p.payload.challenge=="string"?p.payload.challenge:"",T=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!lO({serverPublicKey:h,origin:_,devicePublicKey:R,challenge:E,serverAttestation:T})){t.wakeError="Server attestation verification failed",bn(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&ae(p.payload)){let h=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";bn(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),WM({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(_=>{X(b,{type:"writer.status",payload:_},e.layout)})}if(p.type==="install.bundle.update"&&ae(p.payload)){let h=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";h.length>0&&n(h,"install.bundle.update")}if(p.type==="system.ack"){Bf(e.layout,{wsUrl:e.wsUrl});let h=ae(p.payload)?p.payload:null,_=LM(h);_!==null&&n(_)}if(p.type==="device.restart"){let h=r("cloud-device-restart");o(b,"cloud-device-restart",h,C)}if(p.type==="automations.sync"&&ae(p.payload)&&IM(p.payload),p.type==="project.message.history"&&ae(p.payload)){_W({payload:p.payload});return}if(p.type==="automations.run"&&ae(p.payload)&&vM(p.payload),p.type==="terminal.stream.accepted"&&ae(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"";if(h.length>0){let _=rM(h);for(let R of _)X(b,{type:"terminal.stream.chunk",payload:{runId:h,chunk:R},requestId:C})}}if(p.type==="agent.agentRun.list"&&X(b,{type:"dashboard.agentRun.list.result",payload:{runs:fM(e.layout)},requestId:C}),p.type==="agent.agentRun.get"&&ae(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"",_=h.length>0?Jl(e.layout,h):null;X(b,{type:"dashboard.agentRun.get.result",payload:{run:_},requestId:C})}if(p.type==="command.claude.run"&&ae(p.payload)){let h=p.payload.prompt,_=typeof p.payload.writerAgent=="string"&&xe(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",R=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,E=p.payload.sessionContinuation===!0,T=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,x=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,W=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,z=fd(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,Yl,W),O=xR(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${_} task (${E?"continue":"first"})\u2026`),R!==void 0&&(rQ.has(R)||KM.has(R)||Jl(e.layout,R)!==null)){console.log(`[agent-witch] Ignoring duplicate run ${R}.`);return}let he=J=>{X(b,bd({code:J,...R!==void 0?{agentRunId:R}:{},...C!==void 0?{requestId:C}:{}}))},N=J=>{if(O!==null){let Er=OR(e.layout,O);if(Er!==null){X(b,{type:"command.claude.result",payload:{exitCode:-1,output:Er,...R!==void 0?{agentRunId:R}:{}},requestId:C});return}if(R!==void 0){let wr=jR(e.layout,R,O);if(!wr.ok){X(b,{type:"command.claude.result",payload:{exitCode:-1,output:wr.errorMessage,...R!==void 0?{agentRunId:R}:{}},requestId:C});return}YM.set(R,O.entries.some(Xo=>Xo.scope==="run"))}}R!==void 0&&x!==void 0&&QZ.set(R,x),R!==void 0&&(eQ.set(R,J),W!==void 0&&W.trim().length>0&&GM.set(R,W.trim()),tQ.set(R,h.trim()),pt({projectFolderPath:J,...W!==void 0&&W.trim().length>0?{projectId:W.trim()}:{}})),Ehe(e,_,h.trim(),C,b,R,E,x,T,J,U,W)};R!==void 0&&KM.add(R),WX({config:e,...W!==void 0?{projectId:W}:{},requestedFolderPath:z,defaultFolderPath:Yl()}).catch(()=>({ok:!1,code:se.FOLDER_CHECK_UNAVAILABLE})).then(J=>{if(R!==void 0&&KM.delete(R),!J.ok){he(J.code);return}R!==void 0&&rQ.add(R),N(J.folderRealPath)}).catch(J=>{console.error("[agent-witch] Run start failed:",J instanceof Error?J.message:J)})}}if(p.type==="shell.session.open"&&ae(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",_=typeof p.payload.cols=="number"?p.payload.cols:120,R=typeof p.payload.rows=="number"?p.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),lM({shellSessionId:h,cwd:e.workspace,cols:_,rows:R,send:E=>{X(b,E)},requestId:C}))}if(p.type==="shell.session.close"&&ae(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";h.length>0&&Kl(h,_=>{X(b,_)},C)}if(p.type==="shell.input"&&ae(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",_=typeof p.payload.data=="string"?p.payload.data:"";h.length>0&&_.length>0&&sM(h,_)}if(p.type==="shell.resize"&&ae(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",_=typeof p.payload.cols=="number"?p.payload.cols:0,R=typeof p.payload.rows=="number"?p.payload.rows:0;h.length>0&&_>0&&R>0&&iM(h,_,R)}if(p.type==="command.writer.session.end"&&ae(p.payload)){let h=p.payload.writerAgent;typeof h=="string"&&xe(h)&&(dM(h),rA(e.layout,h))}if(p.type==="command.writer.session.start"&&ae(p.payload)){let h=p.payload.writerAgent,_=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof h=="string"&&xe(h)&&_.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),whe(e,h,_,C,b))}if(p.type==="command.claude.stop"&&ae(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),Fm(e,zb(b),h,C))}if(p.type==="command.claude.input_respond"&&ae(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",_=typeof p.payload.response=="string"?p.payload.response.trim():"",R=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",E=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",T=typeof p.payload.question=="string"?p.payload.question:"";h.length>0&&_.length>0&&R.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),_M(e,{agentRunId:h,originalPrompt:R,partialOutput:E,question:T,response:_,shellSessionId:QZ.get(h)},C,zb(b)))}if(p.type==="dispatch.approval.required"&&ae(p.payload)){let h=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",_=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${_}`),process.platform==="darwin"&&(0,XM.spawn)("osascript",["-e",`display notification "${_.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&ae(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),Lhe(e,p.payload,C,b)),p.type==="harness.export.request"&&ae(p.payload)){let h=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",_=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,R=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(E=>typeof E=="string"):[];h.length>0&&R.length>0&&(async()=>{let{readHarnessExportSets:E}=await Promise.resolve().then(()=>(XZ(),YZ)),T=E(R,e.email);X(b,{type:"harness.export.result",payload:{success:T.length>0,borrowerUserId:h,..._!==void 0?{targetDeviceId:_}:{},sets:T,errorMessage:T.length>0?void 0:"No readable harness sets were found on this machine."},requestId:C})})()}if(p.type==="harness.manifest.request"&&Um(b,e.layout),p.type==="command.claude.result"&&ae(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,_=typeof p.payload.output=="string"?p.payload.output:"",R=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,E=fd(h!==void 0?eQ.get(h):void 0,Yl),T=h!==void 0?GM.get(h):void 0,x=h!==void 0?tQ.get(h)??"":"",W=gw({exitCode:R,output:_});if(W&&E!==null&&WC({layout:e.layout,text:_,source:h??"command.claude.result",projectFolderPath:E,...T!==void 0?{projectId:T}:{}}),R!=null&&R!==0&&_.trim().length>0&&E!==null&&(CC({layout:e.layout,errorText:_,projectFolderPath:E,...T!==void 0?{projectId:T}:{}}),jC({layout:e.layout,text:_,source:h??"command.claude.result.failure",projectFolderPath:E,...T!==void 0?{projectId:T}:{}})),W&&x.trim().length>0&&E!==null&&Nv({layout:e.layout,projectFolderPath:E,...T!==void 0?{projectId:T}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:x,output:_,createdAt:new Date().toISOString()}}),h!==void 0&&E!==null){let O=qM.get(h),U=JM.get(h);O!==void 0&&U!==void 0&&dh(E).then(he=>{let N=Sw({before:U,after:he});uk(O,N),JM.delete(h),qM.delete(h)})}if(W&&T!==void 0&&T.trim().length>0){let O=H(),U=O===null?null:K({wsUrl:O.wsUrl,pairingToken:O.pairingToken});U!==null&&Aw(U,T,{...h!==void 0?{sourceRunId:h}:{},lesson:Pw({prompt:x,output:_})})}h!==void 0&&(hd(e.layout,h),YM.delete(h),GM.delete(h))}},A=()=>{if(t.stopped)return;c(),d();let p=new zl(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),PM(K({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),bM(e.layout);let b=Ge(e.wsUrl)??"http://localhost:3000",C=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=aO({layout:e.layout,origin:b,...C!==void 0&&C.length>0?{claimToken:C}:{}});X(p,{type:"agent.register",payload:{role:"agent",hostname:Zl.default.hostname(),macOsUsername:Zl.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),Um(p,e.layout),kM(e,p),f(p)}),p.on("message",b=>{let C=typeof b=="string"?b:b.toString("utf8");try{let h=JSON.parse(C);if(!ae(h))return;y(h,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(b,C)=>{i(),t.socket=void 0,t.wsConnected=!1,Xk(e.layout),t.reconnectAttempt+=1;let h=typeof C=="string"?C:C.toString("utf8");Fs(e.layout,{kind:"ws_close",message:"WebSocket closed",code:b,reason:h}),console.log("[agent-witch] Disconnected from server."),g()}),p.on("error",b=>{t.wakeError=b.message,Fs(e.layout,{kind:"ws_error",message:b.message,stack:b.stack}),console.error(`[agent-witch] Socket error: ${b.message}`)})},P=YR(e.layout.configPath,p=>{if(!p)return;let b=RM(e,zb(t.socket??{readyState:zl.CLOSED,send:()=>{}}));console.log(`[agent-witch] Coding tools paused; stopped ${b} run(s).`)}),S=()=>{t.stopped=!0,P(),i(),l(),c(),d()};return zk(()=>{let p=Uk();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&n(p.remoteBundleVersion,p.trigger);let b=Bk();b!==null&&r(b)}),{connect:A,startLocalHealthCheck:u,stop:S,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:rd(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:fm(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to AgentWitch \u2014 manifest saved locally only."}:(Um(p,e.layout),{ok:!0})}}},xhe=async()=>{Ct("agent-witch");let e=DO(),t=L();zO().ok||(process.platform==="darwin"?(await rs(t),process.stdout.write(`[agent-witch] Another AgentWitch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another AgentWitch process may already be running \u2014 exiting.
`),process.exit(0)),KO(t);let o=GO({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){co({launchAgentLabel:Re(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let A=Tc({launchAgentPrefix:Re(t),wakePort:Pc(t)});A.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(A.length)} LaunchAgent plist(s).`)}catch(A){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${A instanceof Error?A.message:String(A)}`)}kc()}let n=await VR(),s=n[0];s!==void 0&&xM(s.layout);for(let y of n){let A=Ge(y.wsUrl)??wt;Bc(y.layout.installDir,A)}let i=n.map(y=>vhe(y)),l=i[0];l===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),km(),process.exit(0));let c=()=>{n.forEach((y,A)=>{let P=i[A];if(P===void 0)return;let S=Oe(y.layout);Zk(S,{socketOpen:P.hasMacSocketOpen(),staleAfterMs:12e4})&&P.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let y=n[0]?.layout;y!==void 0&&(ir(y)||au(y.installDir))},g=await VO({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):gm({layout:n[0].layout,controllers:{getStatus:l.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:l.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let y of i)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let f=uo(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Rc(),d()});d=()=>{f(),g.stop(),km(),console.log("[agent-witch] Shutting down.");for(let y of i)y.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Bm=xhe});var ZM=a(()=>{"use strict";oQ()});var nQ={};Et(nQ,{startAgentWitchClient:()=>Bm});var sQ=a(()=>{"use strict";ZM();ZM();ns();pk();Af();if(!Lt()&&ss(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Pf(process.argv.slice(e))),Bm()}});lk();pk();ns();Af();var JD="20.x",YD="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var une=e=>[`Node.js ${JD} or newer is required (found ${e}).`,YD].join(" "),XD=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${une(process.version)}
`),process.exit(1))};Cf();var Whe=async()=>{Ct("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(Jk(),qk)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},Ohe=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(WB(),xB)),t=await e();if(t.ok){process.stdout.write(`AgentWitch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake AgentWitch. ${r}
`),process.exit(1)},Mhe=async e=>{try{if(e===Rf){let{resolveAgentWitchLocalLayout:t}=await Promise.resolve().then(()=>(q(),q_)),{runCheckContextHookCli:r}=await Promise.resolve().then(()=>(Gr(),k1));await r({layout:t()})}else process.stderr.write(`[agent-witch] ${Ji}: unknown hook ${e??"(none)"}
`)}catch(t){let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] ${Ji}: ${r}
`)}await new Promise(t=>{process.stdout.write("",()=>t())}),process.exit(0)},jhe=async()=>{if(!ss(Lt()?void 0:__agentWitchImportMetaUrl))return;process.argv[2]===Ji&&await Mhe(process.argv[3]),XD();let e=process.argv.indexOf("report");e>=0&&process.exit(Pf(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Whe();return}if(t==="wake"){await Ohe();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(OG(),WG));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(k7(),_7));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(q(),q_)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(Tv(),UY));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(sQ(),nQ));await r()};jhe();
