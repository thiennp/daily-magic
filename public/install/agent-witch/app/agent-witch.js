#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var ooe=Object.create;var rR=Object.defineProperty;var noe=Object.getOwnPropertyDescriptor;var soe=Object.getOwnPropertyNames;var ioe=Object.getPrototypeOf,aoe=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var T=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Mt=(e,t)=>{for(var r in t)rR(e,r,{get:t[r],enumerable:!0})},loe=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of soe(t))!aoe.call(e,n)&&n!==r&&rR(e,n,{get:()=>t[n],enumerable:!(o=noe(t,n))||o.enumerable});return e};var p=(e,t,r)=>(r=e!=null?ooe(ioe(e)):{},loe(t||!e||!e.__esModule?rR(r,"default",{value:e,enumerable:!0}):r,e));var jc,mD,gD,Mc,oR,qbe,Fg,is,Fr,Po,$g,zg,oa,na,yt,nR,Ug,Bg,Gg,Nc,gr,as,ls,Dc,pn,sR,fD,Ge=l(()=>{"use strict";jc={production:".agent-witch",localhost:".local-agent-witch"},mD={production:47892,localhost:47893},gD={production:"com.agent-witch",localhost:"com.local-agent-witch"},Mc={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},oR="app",qbe=`${oR}/agent-witch.js`,Fg=`${oR}/command`,is={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},Fr=jc.production,Po=jc.localhost,$g=mD.production,zg=mD.localhost,oa=gD.production,na=gD.localhost,yt="profiles",nR=Mc.activeProfile,Ug="harness",Bg="sets",Gg="manifest.json",Nc=is.projectsDir,gr=is.logsDir,as="agent-witch.log",ls="agent-witch.error.log",Dc=is.reportsDir,pn=is.deviceKeypairJson,sR=oR,fD="agent-witch.js"});var yD=l(()=>{"use strict";Ge()});var hD,mn,cs,Hc=l(()=>{"use strict";hD=p(require("node:path"));Ge();mn=e=>hD.default.basename(e)===Po,cs=e=>mn(e)?na:oa});var $r,sa=l(()=>{"use strict";$r="agent-witch.service"});var Nt,Kg,SD=l(()=>{"use strict";Nt="https://www.agentwitch.com",Kg="wss://www.agentwitch.com/api/agent-witch/ws"});var Vg,ia,Fc,PD=l(()=>{"use strict";Vg="127.0.0.1",ia=`http://${Vg}:43347`,Fc=ia});var iR,qg,AD,_D,aR,lR,bD=l(()=>{"use strict";iR="local-app-port.json",qg="http://127.0.0.1:<localAppPort>",AD=`~/.agent-witch/profiles/<account email>/${iR}`,_D=`AgentWitch Local listens on a port unique to your account on this computer: read localAppPort from ${AD} and use ${qg}.`,aR="agentwitch-local",lR=(e=".agent-witch")=>`port="$(sed -n 's/.*"localAppPort"[^0-9]*\\([0-9][0-9]*\\).*/\\1/p' "$HOME/${e}"/profiles/*/${iR} | head -n 1)"; curl -sS -m 5 "http://127.0.0.1:\${port}/health"`});var fr=l(()=>{"use strict";SD();PD();bD()});var coe,ds,Jg,RD,doe,uoe,poe,moe,goe,zc,cR=l(()=>{"use strict";sa();fr();coe={darwin:"mac",mac:"mac",macos:"mac",linux:"linux",wsl:"linux",win32:"windows",windows:"windows"},ds=e=>coe[(e??"").trim().toLowerCase()]??"unknown",Jg=e=>`nohup "$HOME/${e}/app/command/run.sh" >/dev/null 2>&1 &`,RD=e=>`${lR(e)} || echo "AWL still not responding \u2014 see logs:"`,doe=e=>({platform:"mac",label:"macOS",instructions:"On this computer, open Terminal, paste this command, and press Return.",command:`AW_HOME="$HOME/${e.installDirName}"
launchctl kickstart -k "gui/$(id -u)/${e.launchAgentPrefix}"
sleep 2
${RD(e.installDirName)}
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`,note:"Paste and run the whole block so AW_HOME is set before tail. Ignore com.agent-witch-live unless you installed Live as a separate LaunchAgent."}),uoe=e=>({platform:"linux",label:"Linux or WSL",instructions:"On this computer, open a terminal (on Windows, your WSL distro's terminal), paste this command, and press Enter.",command:`systemctl --user restart ${$r}
sleep 2
${RD(e.installDirName)}
journalctl --user -u ${$r} -n 50 --no-pager`,note:`If systemctl is not available, the installer did not set up auto-start on this computer. Start the client by hand: ${Jg(e.installDirName)}`}),poe=()=>({platform:"windows",label:"Windows (WSL)",instructions:"On this computer, open PowerShell, paste these commands, and press Enter.",command:`wsl.exe -e bash -lc 'systemctl --user restart ${$r}'
wsl.exe -e bash -lc 'systemctl --user status ${$r}'`,note:"AgentWitch runs inside WSL on Windows. These commands use your default WSL distro; if you installed into another distro, add -d <distro name> after wsl.exe."}),moe={mac:doe,linux:uoe,windows:poe},goe=["mac","linux","windows"],zc=e=>(e.platform==="unknown"?goe:[e.platform]).map(r=>moe[r](e))});var kD,wD,foe,yoe,hoe,dR,ED=l(()=>{"use strict";kD=p(require("node:path"));cR();Hc();wD=e=>e instanceof Error?e.message:String(e),foe=e=>typeof e=="object"&&e!==null&&"code"in e&&e.code==="ENOENT",yoe=async(e,t)=>{try{let r=await e.kickstartLaunchAgents();return r.length>0?{ok:!0,platform:"mac",outcome:"restarted",message:`Kickstarted ${r.join(", ")}.`,manualCommand:null}:{ok:!1,platform:"mac",outcome:"failed",message:"No AgentWitch LaunchAgent was kickstarted on this computer.",manualCommand:t}}catch(r){return{ok:!1,platform:"mac",outcome:"failed",message:`LaunchAgent kickstart failed: ${wD(r)}`,manualCommand:t}}},hoe=async(e,t)=>{try{return await e.restartSystemdUserService(),{ok:!0,platform:"linux",outcome:"restarted",message:"Restarted the agent-witch.service systemd user unit.",manualCommand:null}}catch(r){return foe(r)?{ok:!1,platform:"linux",outcome:"manual-step-required",message:"systemctl is not available on this computer, so the installer set up no auto-start. Start the client by hand.",manualCommand:t}:{ok:!1,platform:"linux",outcome:"failed",message:`systemd user restart failed: ${wD(r)}`,manualCommand:t}}},dR=async e=>{let t=ds(e.platform),r=kD.default.basename(e.installDir),o=n=>zc({platform:n,installDirName:r,launchAgentPrefix:cs(e.installDir)})[0]?.command??null;return t==="mac"?yoe(e.runners,o("mac")):t==="linux"?hoe(e.runners,Jg(r)):t==="windows"?{ok:!1,platform:t,outcome:"unsupported-platform",message:"AgentWitch runs inside WSL on Windows. Restart it from PowerShell with the command below.",manualCommand:o("windows")}:{ok:!1,platform:t,outcome:"unsupported-platform",message:`Restarting the AgentWitch client is not supported on ${e.platform||"this platform"}.`,manualCommand:null}}});var Uc=l(()=>{"use strict";yD();Hc();cR();ED()});var TD,uR,Soe,Bc,Poe,Aoe,CD,_oe,boe,ID=l(()=>{"use strict";Uc();Ge();TD=p(require("node:os")),uR=p(require("node:path")),Soe=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?uR.default.resolve(e):uR.default.join(TD.default.homedir(),Fr)},Bc=cs(Soe()),Poe=`${Bc}-wake`,Aoe=`${Bc}-live`,CD=`${Bc}-watchdog`,_oe=`${Bc}-automation-scheduler`,boe=`${Bc}-updater`});var aa=T(pR=>{"use strict";Object.defineProperty(pR,"__esModule",{value:!0});pR.stringify=Roe;function Roe(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var K=T(mR=>{"use strict";Object.defineProperty(mR,"__esModule",{value:!0});mR.generateTypeGuardError=koe;var LD=aa();function koe(e,t,r){return(0,LD.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,LD.stringify)(e)}) to be "${r}"`}});var gn=T(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.isNonNullObject=void 0;var woe=K(),Eoe=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,woe.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Yg.isNonNullObject=Eoe});var zr=T(Ke=>{"use strict";Object.defineProperty(Ke,"__esModule",{value:!0});Ke.attachTypeGuardMeta=Ke.isArrayTypeGuard=Ke.isNestedObjectTypeGuard=Ke.getTypeGuardWrapperKind=Ke.getTypeGuardInnerGuard=Ke.getTypeGuardItemGuard=Ke.getTypeGuardSchema=void 0;var Toe=e=>e.schema;Ke.getTypeGuardSchema=Toe;var Coe=e=>e.itemGuard;Ke.getTypeGuardItemGuard=Coe;var Ioe=e=>e.innerGuard;Ke.getTypeGuardInnerGuard=Ioe;var Loe=e=>e.wrapperKind;Ke.getTypeGuardWrapperKind=Loe;var voe=e=>{if((0,Ke.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ke.isNestedObjectTypeGuard=voe;var xoe=e=>{if((0,Ke.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ke.isArrayTypeGuard=xoe;var Woe=(e,t)=>Object.assign(e,t);Ke.attachTypeGuardMeta=Woe});var Gc=T(us=>{"use strict";Object.defineProperty(us,"__esModule",{value:!0});us.getExpectedTypeName=us.getTypeGuardDisplayName=void 0;var vD=zr(),Ooe=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};us.getTypeGuardDisplayName=Ooe;var joe=e=>{let t=(0,vD.getTypeGuardWrapperKind)(e),r=(0,vD.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,us.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};us.getExpectedTypeName=joe});var ps=T(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.createValidationResult=void 0;var Moe=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Xg.createValidationResult=Moe});var la=T(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.createValidationError=void 0;var Noe=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Zg.createValidationError=Noe});var ca=T(Qg=>{"use strict";Object.defineProperty(Qg,"__esModule",{value:!0});Qg.createTreeNode=void 0;var Doe=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Qg.createTreeNode=Doe});var Kc=T(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.combineResults=void 0;var Hoe=ps(),Foe=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,Hoe.createValidationResult)(r,o,n)};ef.combineResults=Foe});var rf=T(tf=>{"use strict";Object.defineProperty(tf,"__esModule",{value:!0});tf.createSimplifiedTree=void 0;var xD=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=xD(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},$oe=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=xD(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};tf.createSimplifiedTree=$oe});var qc=T(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.validateObject=void 0;var zoe=gn(),Vc=ps(),Uoe=la(),of=ca(),Boe=Kc(),WD=sf(),Goe=(e,t,r)=>{let o=()=>{let i=(0,Uoe.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,of.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Vc.createValidationResult)(!1,[],a):(0,Vc.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Vc.createValidationResult)(!0,[],(0,of.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,m=d,g=t[m],y=e[m],h=(0,WD.validateProperty)(m,y,g,r);return h.valid?u.length===0?(0,Vc.createValidationResult)(!0,[],(0,of.createTreeNode)(r.path,!0,"object",e)):a(u):h};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,WD.validateProperty)(d,e[d],u,r)}),a=(0,Boe.combineResults)(i,r.path),c=(0,of.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Vc.createValidationResult)(a.valid,a.errors,c)};return(0,zoe.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};nf.validateObject=Goe});var jD=T(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.validateArray=void 0;var Koe=aa(),af=ps(),OD=la(),lf=ca(),Voe=Kc(),qoe=qc(),Joe=Gc(),Yoe=zr(),Xoe=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,OD.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,lf.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,af.createValidationResult)(!1,[c],d)}let n=(0,Yoe.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,m={path:u,config:r.config||null};if(n)return(0,qoe.validateObject)(c,n,m);let g=t(c,null),y=(0,Joe.getExpectedTypeName)(t),h=(0,Koe.stringify)(c);if(g)return(0,af.createValidationResult)(!0,[],(0,lf.createTreeNode)(u,!0,y,c));let S=h.length>200?`Expected ${u} to be "${y}"`:`Expected ${u} (${h}) to be "${y}"`,w=(0,OD.createValidationError)(u,y,c,S),I=(0,lf.createTreeNode)(u,!1,y,c);return I.errors=[w],(0,af.createValidationResult)(!1,[w],I)}),i=(0,Voe.combineResults)(s,o),a=(0,lf.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,af.createValidationResult)(i.valid,i.errors,a)};cf.validateArray=Xoe});var sf=T(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.validateProperty=void 0;var MD=ps(),Zoe=la(),ND=ca(),Qoe=Gc(),df=zr(),ene=qc(),tne=jD(),rne=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,df.getTypeGuardSchema)(r),c=(0,df.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,ene.validateObject)(t,a,s);if(c&&(0,df.isArrayTypeGuard)(r))return(0,tne.validateArray)(t,c,s)}let d=u=>{let m=r(t,u),g=(0,Qoe.getExpectedTypeName)(r);return m?(0,MD.createValidationResult)(!0,[],(0,ND.createTreeNode)(n,!0,g,t)):(()=>{let y=(0,Zoe.createValidationError)(n,g,t,`Expected ${n} (${JSON.stringify(t)}) to be "${g}"`),h=(0,ND.createTreeNode)(n,!1,g,t);return h.errors=[y],(0,MD.createValidationResult)(!1,[y],h)})()};if((0,df.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};uf.validateProperty=rne});var mf=T(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.isNil=void 0;var one=K(),nne=function(e,t){return e!=null?(t&&t.callbackOnError((0,one.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};pf.isNil=nne});var gR=T(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.isDefined=void 0;var sne=K(),ine=mf(),ane=function(e,t){return(0,ine.isNil)(e,null)?(t&&t.callbackOnError((0,sne.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};gf.isDefined=ane});var fR=T(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.reportValidationResults=void 0;var lne=rf(),DD=gR(),cne=mf(),dne=(e,t)=>{if(e.valid===!0||(0,cne.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,DD.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,lne.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,DD.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};ff.reportValidationResults=dne});var yR=T(Re=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.Validation=Re.reportValidationResults=Re.validateObject=Re.validateProperty=Re.createSimplifiedTree=Re.combineResults=Re.createTreeNode=Re.createValidationError=Re.createValidationResult=Re.getExpectedTypeName=void 0;var une=Gc();Object.defineProperty(Re,"getExpectedTypeName",{enumerable:!0,get:function(){return une.getExpectedTypeName}});var pne=ps();Object.defineProperty(Re,"createValidationResult",{enumerable:!0,get:function(){return pne.createValidationResult}});var mne=la();Object.defineProperty(Re,"createValidationError",{enumerable:!0,get:function(){return mne.createValidationError}});var gne=ca();Object.defineProperty(Re,"createTreeNode",{enumerable:!0,get:function(){return gne.createTreeNode}});var fne=Kc();Object.defineProperty(Re,"combineResults",{enumerable:!0,get:function(){return fne.combineResults}});var yne=rf();Object.defineProperty(Re,"createSimplifiedTree",{enumerable:!0,get:function(){return yne.createSimplifiedTree}});var hne=sf();Object.defineProperty(Re,"validateProperty",{enumerable:!0,get:function(){return hne.validateProperty}});var Sne=qc();Object.defineProperty(Re,"validateObject",{enumerable:!0,get:function(){return Sne.validateObject}});var Pne=fR();Object.defineProperty(Re,"reportValidationResults",{enumerable:!0,get:function(){return Pne.reportValidationResults}});var Ane=ps(),_ne=Kc(),bne=la(),Rne=ca(),kne=sf(),wne=qc(),Ene=fR(),Tne=rf();Re.Validation={result:Ane.createValidationResult,combine:_ne.combineResults,error:bne.createValidationError,treeNode:Rne.createTreeNode,property:kne.validateProperty,object:wne.validateObject,report:Ene.reportValidationResults,createSimplifiedTree:Tne.createSimplifiedTree}});var yf=T(hR=>{"use strict";Object.defineProperty(hR,"__esModule",{value:!0});hR.isType=Ine;var HD=gn(),FD=yR(),Cne=zr();function Ine(e){if(!(0,HD.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,FD.validateObject)(r,e,s);return(0,FD.reportValidationResults)(i,o||null),i.valid}return(0,HD.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,Cne.attachTypeGuardMeta)(t,{schema:e})}});var BD=T(ms=>{"use strict";Object.defineProperty(ms,"__esModule",{value:!0});ms.isNestedType=ms.isShape=void 0;ms.isSchema=Jc;var $D=gn(),zD=yR(),UD=zr();function Jc(e){if(!(0,$D.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=vne(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,zD.validateObject)(o,t,i);return(0,zD.reportValidationResults)(a,n||null),a.valid}return(0,$D.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,UD.attachTypeGuardMeta)(r,{schema:t})}function Lne(e){return typeof e=="function"?e:Array.isArray(e)?xne(e):typeof e=="object"&&e!==null?Jc(e):e}function vne(e){let t={};for(let[r,o]of Object.entries(e))t[r]=Lne(o);return t}function xne(e){let t=e[0],r=Jc(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,UD.attachTypeGuardMeta)(o,{itemGuard:r})}ms.isShape=Jc;ms.isNestedType=Jc});var GD=T(SR=>{"use strict";Object.defineProperty(SR,"__esModule",{value:!0});SR.isObjectWith=One;var Wne=yf();function One(e){return(0,Wne.isType)(e)}});var KD=T(PR=>{"use strict";Object.defineProperty(PR,"__esModule",{value:!0});PR.isObject=Mne;var jne=yf();function Mne(e){return(0,jne.isType)(e)}});var VD=T(AR=>{"use strict";Object.defineProperty(AR,"__esModule",{value:!0});AR.guardWithTolerance=Nne;function Nne(e,t,r){return t(e,r),e}});var qD=T(_R=>{"use strict";Object.defineProperty(_R,"__esModule",{value:!0});_R.isBranded=Hne;var Dne=K();function Hne(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,Dne.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var JD=T(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.BrandSymbols=void 0;hf.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var YD=T(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.isAny=void 0;var Fne=function(e){return!0};Sf.isAny=Fne});var Yc=T(bR=>{"use strict";Object.defineProperty(bR,"__esModule",{value:!0});bR.reportTypeGuardError=zne;var $ne=K();function zne(e,t,r){e&&e.callbackOnError((0,$ne.generateTypeGuardError)(t,e.identifier,r))}});var XD=T(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.isBoolean=void 0;var Une=Yc(),Bne=function(t,r){return typeof t!="boolean"?((0,Une.reportTypeGuardError)(r,t,"boolean"),!1):!0};Pf.isBoolean=Bne});var ZD=T(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.isDate=void 0;var Gne=K(),Kne=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,Gne.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Af.isDate=Kne});var RR=T(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.isNumber=void 0;var Vne=Yc(),qne=function(t,r){return typeof t!="number"||isNaN(t)?((0,Vne.reportTypeGuardError)(r,t,"number"),!1):!0};_f.isNumber=qne});var QD=T(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.isString=void 0;var Jne=Yc(),Yne=function(t,r){return typeof t!="string"?((0,Jne.reportTypeGuardError)(r,t,"string"),!1):!0};bf.isString=Yne});var eH=T(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.isUnknown=void 0;var Xne=function(e){return!0};Rf.isUnknown=Xne});var tH=T(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});kf.isFunction=void 0;var Zne=K(),Qne=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,Zne.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};kf.isFunction=Qne});var oH=T(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.isFile=void 0;var rH=K(),ese=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,rH.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,rH.generateTypeGuardError)(e,t.identifier,"File")),!1)};wf.isFile=ese});var sH=T(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.isFileList=void 0;var nH=K(),tse=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,nH.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,nH.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Ef.isFileList=tse});var aH=T(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.isBlob=void 0;var iH=K(),rse=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,iH.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,iH.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Tf.isBlob=rse});var cH=T(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.isFormData=void 0;var lH=K(),ose=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,lH.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,lH.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Cf.isFormData=ose});var uH=T(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.isURL=void 0;var dH=K(),nse=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,dH.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,dH.generateTypeGuardError)(e,t.identifier,"URL")),!1)};If.isURL=nse});var mH=T(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});Lf.isURLSearchParams=void 0;var pH=K(),sse=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,pH.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,pH.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Lf.isURLSearchParams=sse});var gH=T(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.isMap=void 0;var ise=K(),ase=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,ise.generateTypeGuardError)(e,t.identifier,"Map")),!1)};vf.isMap=ase});var fH=T(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.isSet=void 0;var lse=K(),cse=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,lse.generateTypeGuardError)(e,t.identifier,"Set")),!1)};xf.isSet=cse});var yH=T(kR=>{"use strict";Object.defineProperty(kR,"__esModule",{value:!0});kR.isIndexSignature=use;var dse=K();function use(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,dse.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let m=s[d],g=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),y=t(m,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return g&&y})}}});var hH=T(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.isError=void 0;var pse=Yc(),mse=function(t,r){return t instanceof Error?!0:((0,pse.reportTypeGuardError)(r,t,"Error"),!1)};Wf.isError=mse});var ER=T(wR=>{"use strict";Object.defineProperty(wR,"__esModule",{value:!0});wR.isArrayWithEachItem=yse;var gse=K(),fse=zr();function yse(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,gse.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,fse.attachTypeGuardMeta)(t,{itemGuard:e})}});var TR=T(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.isNonEmptyArray=void 0;var hse=K(),Sse=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,hse.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Of.isNonEmptyArray=Sse});var SH=T(CR=>{"use strict";Object.defineProperty(CR,"__esModule",{value:!0});CR.isNonEmptyArrayWithEachItem=_se;var Pse=ER(),Ase=TR();function _se(e){return function(t,r){return(0,Pse.isArrayWithEachItem)(e)(t,r)&&(0,Ase.isNonEmptyArray)(t,r)}}});var AH=T(IR=>{"use strict";Object.defineProperty(IR,"__esModule",{value:!0});IR.isTuple=bse;var PH=K();function bse(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,PH.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,PH.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var _H=T(LR=>{"use strict";Object.defineProperty(LR,"__esModule",{value:!0});LR.isObjectWithEachItem=kse;var Rse=K();function kse(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Rse.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var bH=T(vR=>{"use strict";Object.defineProperty(vR,"__esModule",{value:!0});vR.isPartialOf=Ese;var wse=gn();function Ese(e){return function(t,r){if(!(0,wse.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var RH=T(xR=>{"use strict";Object.defineProperty(xR,"__esModule",{value:!0});xR.isPick=Cse;var Tse=gn();function Cse(e,...t){return function(r,o){if(!(0,Tse.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var kH=T(WR=>{"use strict";Object.defineProperty(WR,"__esModule",{value:!0});WR.isOmit=Lse;var Ise=gn();function Lse(e,...t){return function(r,o){if(!(0,Ise.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),m=u.indexOf(" ("),g=m>=0?u.slice(0,m):u;if(a.has(g))return!1;let y=g.startsWith(s+".")&&g.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var wH=T(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isNonEmptyString=void 0;var vse=K(),xse=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,vse.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};jf.isNonEmptyString=xse});var EH=T(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});Mf.isNonNegativeNumber=void 0;var Wse=K(),Ose=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,Wse.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Mf.isNonNegativeNumber=Ose});var TH=T(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.isPositiveNumber=void 0;var jse=K(),Mse=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,jse.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Nf.isPositiveNumber=Mse});var CH=T(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.isNonPositiveNumber=void 0;var Nse=K(),Dse=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,Nse.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Df.isNonPositiveNumber=Dse});var IH=T(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.isNegativeNumber=void 0;var Hse=K(),Fse=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,Hse.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Hf.isNegativeNumber=Fse});var LH=T(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.isInteger=void 0;var $se=K(),zse=RR(),Use=function(e,t){return!(0,zse.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,$se.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Ff.isInteger=Use});var vH=T($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.isPositiveInteger=void 0;var Bse=K(),Gse=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Bse.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};$f.isPositiveInteger=Gse});var xH=T(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.isNegativeInteger=void 0;var Kse=K(),Vse=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Kse.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};zf.isNegativeInteger=Vse});var WH=T(Uf=>{"use strict";Object.defineProperty(Uf,"__esModule",{value:!0});Uf.isNonNegativeInteger=void 0;var qse=K(),Jse=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,qse.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Uf.isNonNegativeInteger=Jse});var OH=T(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.isNonPositiveInteger=void 0;var Yse=K(),Xse=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Yse.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Bf.isNonPositiveInteger=Xse});var jH=T(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.isNumeric=void 0;var Gf=K(),Zse=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Gf.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Gf.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Gf.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Gf.generateTypeGuardError)(e,t.identifier,"number key")),!1};Kf.isNumeric=Zse});var MH=T(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.isBooleanLike=void 0;var OR=K(),Qse=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,OR.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,OR.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Vf.isBooleanLike=Qse});var NH=T(qf=>{"use strict";Object.defineProperty(qf,"__esModule",{value:!0});qf.isDateLike=void 0;var Xc=K(),eie=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Xc.generateTypeGuardError)(e,t.identifier,"date-like")),!1};qf.isDateLike=eie});var DH=T(Jf=>{"use strict";Object.defineProperty(Jf,"__esModule",{value:!0});Jf.isBigInt=void 0;var tie=K(),rie=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,tie.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Jf.isBigInt=rie});var MR=T(jR=>{"use strict";Object.defineProperty(jR,"__esModule",{value:!0});jR.isOneOf=oie;var HH=aa();function oie(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,HH.stringify)(t)}) must be one of following values ${e.map(HH.stringify).join(" | ")}`),o}}});var FH=T(NR=>{"use strict";Object.defineProperty(NR,"__esModule",{value:!0});NR.isOneOfTypes=iie;var nie=aa(),sie=Gc();function iie(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,nie.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,sie.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var $H=T(DR=>{"use strict";Object.defineProperty(DR,"__esModule",{value:!0});DR.isIntersectionOf=aie;function aie(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var zH=T(HR=>{"use strict";Object.defineProperty(HR,"__esModule",{value:!0});HR.isExtensionOf=lie;function lie(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var UH=T(FR=>{"use strict";Object.defineProperty(FR,"__esModule",{value:!0});FR.isNullOr=die;var cie=zr();function die(e){function t(r,o){return r===null?!0:e(r,o)}return(0,cie.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var BH=T($R=>{"use strict";Object.defineProperty($R,"__esModule",{value:!0});$R.isUndefinedOr=pie;var uie=zr();function pie(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,uie.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var GH=T(zR=>{"use strict";Object.defineProperty(zR,"__esModule",{value:!0});zR.isNilOr=gie;var mie=zr();function gie(e){function t(r,o){return r==null?!0:e(r,o)}return(0,mie.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var KH=T(UR=>{"use strict";Object.defineProperty(UR,"__esModule",{value:!0});UR.isAsserted=fie;function fie(e){return!0}});var VH=T(BR=>{"use strict";Object.defineProperty(BR,"__esModule",{value:!0});BR.isEnum=hie;var yie=MR();function hie(e){return function(t,r){return(0,yie.isOneOf)(...Object.values(e))(t,r)}}});var qH=T(GR=>{"use strict";Object.defineProperty(GR,"__esModule",{value:!0});GR.isEqualTo=Aie;var Sie=K(),Pie=aa();function Aie(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,Sie.generateTypeGuardError)(t,r.identifier,`equal to ${(0,Pie.stringify)(e)}`)),!1):!0}}});var JH=T(Yf=>{"use strict";Object.defineProperty(Yf,"__esModule",{value:!0});Yf.isRegex=void 0;var _ie=K(),bie=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,_ie.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Yf.isRegex=bie});var XH=T(KR=>{"use strict";Object.defineProperty(KR,"__esModule",{value:!0});KR.isPattern=Rie;var YH=K();function Rie(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,YH.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,YH.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var ZH=T(VR=>{"use strict";Object.defineProperty(VR,"__esModule",{value:!0});VR.by=kie;function kie(e){return function(t){return e(t,null)}}});var QH=T(qR=>{"use strict";Object.defineProperty(qR,"__esModule",{value:!0});qR.toNumber=wie;function wie(e){return typeof e=="number"?e:Number(e)}});var eF=T(JR=>{"use strict";Object.defineProperty(JR,"__esModule",{value:!0});JR.toDate=Eie;function Eie(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var tF=T(YR=>{"use strict";Object.defineProperty(YR,"__esModule",{value:!0});YR.toBoolean=Tie;function Tie(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var rF=T(Xf=>{"use strict";Object.defineProperty(Xf,"__esModule",{value:!0});Xf.isSymbol=void 0;var Cie=K(),Iie=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,Cie.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Xf.isSymbol=Iie});var da=T(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.isDateLike=A.isBooleanLike=A.isNumeric=A.isNonPositiveInteger=A.isNonNegativeInteger=A.isNegativeInteger=A.isPositiveInteger=A.isInteger=A.isNegativeNumber=A.isNonPositiveNumber=A.isPositiveNumber=A.isNonNegativeNumber=A.isNonEmptyString=A.isOmit=A.isPick=A.isPartialOf=A.isObjectWithEachItem=A.isNonNullObject=A.isTuple=A.isNonEmptyArrayWithEachItem=A.isNonEmptyArray=A.isArrayWithEachItem=A.isError=A.isIndexSignature=A.isSet=A.isMap=A.isURLSearchParams=A.isURL=A.isFormData=A.isBlob=A.isFileList=A.isFile=A.isFunction=A.isUnknown=A.isString=A.isNumber=A.isNil=A.isDefined=A.isDate=A.isBoolean=A.isAny=A.BrandSymbols=A.isBranded=A.guardWithTolerance=A.isObject=A.isObjectWith=A.isNestedType=A.isShape=A.isSchema=A.isType=void 0;A.isSymbol=A.toBoolean=A.toDate=A.toNumber=A.by=A.generateTypeGuardError=A.isPattern=A.isRegex=A.isEqualTo=A.isEnum=A.isAsserted=A.isNilOr=A.isUndefinedOr=A.isNullOr=A.isExtensionOf=A.isIntersectionOf=A.isOneOfTypes=A.isOneOf=A.isBigInt=void 0;var Lie=yf();Object.defineProperty(A,"isType",{enumerable:!0,get:function(){return Lie.isType}});var XR=BD();Object.defineProperty(A,"isSchema",{enumerable:!0,get:function(){return XR.isSchema}});Object.defineProperty(A,"isShape",{enumerable:!0,get:function(){return XR.isShape}});Object.defineProperty(A,"isNestedType",{enumerable:!0,get:function(){return XR.isNestedType}});var vie=GD();Object.defineProperty(A,"isObjectWith",{enumerable:!0,get:function(){return vie.isObjectWith}});var xie=KD();Object.defineProperty(A,"isObject",{enumerable:!0,get:function(){return xie.isObject}});var Wie=VD();Object.defineProperty(A,"guardWithTolerance",{enumerable:!0,get:function(){return Wie.guardWithTolerance}});var Oie=qD();Object.defineProperty(A,"isBranded",{enumerable:!0,get:function(){return Oie.isBranded}});var jie=JD();Object.defineProperty(A,"BrandSymbols",{enumerable:!0,get:function(){return jie.BrandSymbols}});var Mie=YD();Object.defineProperty(A,"isAny",{enumerable:!0,get:function(){return Mie.isAny}});var Nie=XD();Object.defineProperty(A,"isBoolean",{enumerable:!0,get:function(){return Nie.isBoolean}});var Die=ZD();Object.defineProperty(A,"isDate",{enumerable:!0,get:function(){return Die.isDate}});var Hie=gR();Object.defineProperty(A,"isDefined",{enumerable:!0,get:function(){return Hie.isDefined}});var Fie=mf();Object.defineProperty(A,"isNil",{enumerable:!0,get:function(){return Fie.isNil}});var $ie=RR();Object.defineProperty(A,"isNumber",{enumerable:!0,get:function(){return $ie.isNumber}});var zie=QD();Object.defineProperty(A,"isString",{enumerable:!0,get:function(){return zie.isString}});var Uie=eH();Object.defineProperty(A,"isUnknown",{enumerable:!0,get:function(){return Uie.isUnknown}});var Bie=tH();Object.defineProperty(A,"isFunction",{enumerable:!0,get:function(){return Bie.isFunction}});var Gie=oH();Object.defineProperty(A,"isFile",{enumerable:!0,get:function(){return Gie.isFile}});var Kie=sH();Object.defineProperty(A,"isFileList",{enumerable:!0,get:function(){return Kie.isFileList}});var Vie=aH();Object.defineProperty(A,"isBlob",{enumerable:!0,get:function(){return Vie.isBlob}});var qie=cH();Object.defineProperty(A,"isFormData",{enumerable:!0,get:function(){return qie.isFormData}});var Jie=uH();Object.defineProperty(A,"isURL",{enumerable:!0,get:function(){return Jie.isURL}});var Yie=mH();Object.defineProperty(A,"isURLSearchParams",{enumerable:!0,get:function(){return Yie.isURLSearchParams}});var Xie=gH();Object.defineProperty(A,"isMap",{enumerable:!0,get:function(){return Xie.isMap}});var Zie=fH();Object.defineProperty(A,"isSet",{enumerable:!0,get:function(){return Zie.isSet}});var Qie=yH();Object.defineProperty(A,"isIndexSignature",{enumerable:!0,get:function(){return Qie.isIndexSignature}});var eae=hH();Object.defineProperty(A,"isError",{enumerable:!0,get:function(){return eae.isError}});var tae=ER();Object.defineProperty(A,"isArrayWithEachItem",{enumerable:!0,get:function(){return tae.isArrayWithEachItem}});var rae=TR();Object.defineProperty(A,"isNonEmptyArray",{enumerable:!0,get:function(){return rae.isNonEmptyArray}});var oae=SH();Object.defineProperty(A,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return oae.isNonEmptyArrayWithEachItem}});var nae=AH();Object.defineProperty(A,"isTuple",{enumerable:!0,get:function(){return nae.isTuple}});var sae=gn();Object.defineProperty(A,"isNonNullObject",{enumerable:!0,get:function(){return sae.isNonNullObject}});var iae=_H();Object.defineProperty(A,"isObjectWithEachItem",{enumerable:!0,get:function(){return iae.isObjectWithEachItem}});var aae=bH();Object.defineProperty(A,"isPartialOf",{enumerable:!0,get:function(){return aae.isPartialOf}});var lae=RH();Object.defineProperty(A,"isPick",{enumerable:!0,get:function(){return lae.isPick}});var cae=kH();Object.defineProperty(A,"isOmit",{enumerable:!0,get:function(){return cae.isOmit}});var dae=wH();Object.defineProperty(A,"isNonEmptyString",{enumerable:!0,get:function(){return dae.isNonEmptyString}});var uae=EH();Object.defineProperty(A,"isNonNegativeNumber",{enumerable:!0,get:function(){return uae.isNonNegativeNumber}});var pae=TH();Object.defineProperty(A,"isPositiveNumber",{enumerable:!0,get:function(){return pae.isPositiveNumber}});var mae=CH();Object.defineProperty(A,"isNonPositiveNumber",{enumerable:!0,get:function(){return mae.isNonPositiveNumber}});var gae=IH();Object.defineProperty(A,"isNegativeNumber",{enumerable:!0,get:function(){return gae.isNegativeNumber}});var fae=LH();Object.defineProperty(A,"isInteger",{enumerable:!0,get:function(){return fae.isInteger}});var yae=vH();Object.defineProperty(A,"isPositiveInteger",{enumerable:!0,get:function(){return yae.isPositiveInteger}});var hae=xH();Object.defineProperty(A,"isNegativeInteger",{enumerable:!0,get:function(){return hae.isNegativeInteger}});var Sae=WH();Object.defineProperty(A,"isNonNegativeInteger",{enumerable:!0,get:function(){return Sae.isNonNegativeInteger}});var Pae=OH();Object.defineProperty(A,"isNonPositiveInteger",{enumerable:!0,get:function(){return Pae.isNonPositiveInteger}});var Aae=jH();Object.defineProperty(A,"isNumeric",{enumerable:!0,get:function(){return Aae.isNumeric}});var _ae=MH();Object.defineProperty(A,"isBooleanLike",{enumerable:!0,get:function(){return _ae.isBooleanLike}});var bae=NH();Object.defineProperty(A,"isDateLike",{enumerable:!0,get:function(){return bae.isDateLike}});var Rae=DH();Object.defineProperty(A,"isBigInt",{enumerable:!0,get:function(){return Rae.isBigInt}});var kae=MR();Object.defineProperty(A,"isOneOf",{enumerable:!0,get:function(){return kae.isOneOf}});var wae=FH();Object.defineProperty(A,"isOneOfTypes",{enumerable:!0,get:function(){return wae.isOneOfTypes}});var Eae=$H();Object.defineProperty(A,"isIntersectionOf",{enumerable:!0,get:function(){return Eae.isIntersectionOf}});var Tae=zH();Object.defineProperty(A,"isExtensionOf",{enumerable:!0,get:function(){return Tae.isExtensionOf}});var Cae=UH();Object.defineProperty(A,"isNullOr",{enumerable:!0,get:function(){return Cae.isNullOr}});var Iae=BH();Object.defineProperty(A,"isUndefinedOr",{enumerable:!0,get:function(){return Iae.isUndefinedOr}});var Lae=GH();Object.defineProperty(A,"isNilOr",{enumerable:!0,get:function(){return Lae.isNilOr}});var vae=KH();Object.defineProperty(A,"isAsserted",{enumerable:!0,get:function(){return vae.isAsserted}});var xae=VH();Object.defineProperty(A,"isEnum",{enumerable:!0,get:function(){return xae.isEnum}});var Wae=qH();Object.defineProperty(A,"isEqualTo",{enumerable:!0,get:function(){return Wae.isEqualTo}});var Oae=JH();Object.defineProperty(A,"isRegex",{enumerable:!0,get:function(){return Oae.isRegex}});var jae=XH();Object.defineProperty(A,"isPattern",{enumerable:!0,get:function(){return jae.isPattern}});var Mae=K();Object.defineProperty(A,"generateTypeGuardError",{enumerable:!0,get:function(){return Mae.generateTypeGuardError}});var Nae=ZH();Object.defineProperty(A,"by",{enumerable:!0,get:function(){return Nae.by}});var Dae=QH();Object.defineProperty(A,"toNumber",{enumerable:!0,get:function(){return Dae.toNumber}});var Hae=eF();Object.defineProperty(A,"toDate",{enumerable:!0,get:function(){return Hae.toDate}});var Fae=tF();Object.defineProperty(A,"toBoolean",{enumerable:!0,get:function(){return Fae.toBoolean}});var $ae=rF();Object.defineProperty(A,"isSymbol",{enumerable:!0,get:function(){return $ae.isSymbol}})});var ua,oF,zae,nF,sF=l(()=>{"use strict";ua=p(require("node:path")),oF=require("node:url"),zae=()=>!0,nF=()=>{if(zae()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ua.default.dirname(ua.default.resolve(e)):ua.default.dirname(ua.default.resolve(__filename))}return ua.default.dirname((0,oF.fileURLToPath)(__agentWitchImportMetaUrl))}});var ZR,iF,V,aF,Uae,Ur,QR,x,Zc,Jt,ek,Qc,gs,tk,rk,ok,ed,Le,fn,Zf,lt,Qf,z,nk=l(()=>{"use strict";ZR=p(require("node:fs")),iF=p(require("node:os")),V=p(require("node:path")),aF=p(da());Ge();sF();Hc();Hc();Uae=nF(),Ur=e=>e.trim().toLowerCase(),QR=e=>Ur(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),x=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return V.default.resolve(e);let t=V.default.resolve(Uae),r=V.default.basename(t),o=V.default.basename(V.default.dirname(t));return r===sR&&(o===Fr||o===Po)?V.default.dirname(t):r===Fr||r===Po?t:V.default.join(iF.default.homedir(),Fr)},Zc=(e=x())=>V.default.join(e,sR),Jt=(e=x())=>V.default.join(Zc(e),fD),ek=(e,t,r)=>t!==null?V.default.join(e,yt,t,r):V.default.join(e,r),Qc=e=>ek(e.installDir,e.profileEmail,Nc),gs=e=>ek(e.installDir,e.profileEmail,gr),tk=e=>V.default.join(e.logsDir,as),rk=e=>V.default.join(e.logsDir,ls),ok=e=>ek(e.installDir,e.profileEmail,Dc),ed=e=>e.profileEmail!==null?V.default.join(e.installDir,yt,e.profileEmail,pn):V.default.join(e.installDir,pn),Le=(e=x())=>cs(e),fn=(e=x())=>mn(e)?zg:$g,Zf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Ur(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Ur(t):null},lt=(e=x())=>{let t=V.default.join(e,nR);if(!ZR.default.existsSync(t))return null;try{let r=JSON.parse(ZR.default.readFileSync(t,"utf8"));if((0,aF.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Ur(r.email)}catch{return null}return null},Qf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Ur(r):null}let t=Zf();return t!==null?t:lt()},z=e=>{let t=x(),r=Zc(t),o=Jt(t),n=Qf(e);if(n!==null){let y=V.default.join(t,yt,n),h=V.default.join(y,Ug),S=V.default.join(y,Nc),w=V.default.join(y,is.projectDataDir),I=V.default.join(y,gr),f=V.default.join(y,Dc),k=V.default.join(y,pn),M=V.default.join(y,gr,as),_=V.default.join(y,gr,ls);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:S,projectDataDir:w,logsDir:I,mainLogPath:M,errorLogPath:_,reportsDir:f,deviceKeypairPath:k,configPath:V.default.join(y,"config.json"),harnessRootDir:h,harnessManifestPath:V.default.join(h,Gg),harnessSetsDir:V.default.join(h,Bg)}}let s=V.default.join(t,Ug),i=V.default.join(t,Nc),a=V.default.join(t,is.projectDataDir),c=V.default.join(t,gr),d=V.default.join(t,Dc),u=V.default.join(t,pn),m=V.default.join(t,gr,as),g=V.default.join(t,gr,ls);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:m,errorLogPath:g,reportsDir:d,deviceKeypairPath:u,configPath:V.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:V.default.join(s,Gg),harnessSetsDir:V.default.join(s,Bg)}}});var pa,sk=l(()=>{"use strict";pa=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var Bae,ma,ik=l(()=>{"use strict";Bae=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},ma=e=>e.filePort??Bae(e.envValue)??e.defaultPort});var ak,lF,Gae,td,ga,cF=l(()=>{"use strict";ak=p(require("node:fs")),lF=p(require("node:path"));Ge();nk();sk();ik();Gae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),td=e=>{let t=lF.default.join(e,Mc.wakePort);if(!ak.default.existsSync(t))return null;try{let r=JSON.parse(ak.default.readFileSync(t,"utf8"));if(Gae(r)&&pa(r.wakePort))return r.wakePort}catch{return null}return null},ga=(e=x())=>ma({filePort:td(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:fn(e)})});var lk={};Mt(lk,{isAgentWitchLocalInstallDir:()=>mn,isValidAgentWitchWakePort:()=>pa,readActiveProfileEmailFromFile:()=>lt,readAgentWitchWakePortFromFile:()=>td,resolveActiveProfileEmail:()=>Qf,resolveActiveProfileEmailFromEnv:()=>Zf,resolveAgentWitchAppBundlePath:()=>Jt,resolveAgentWitchAppDir:()=>Zc,resolveAgentWitchDefaultWakePort:()=>fn,resolveAgentWitchDeviceKeypairPath:()=>ed,resolveAgentWitchErrorLogPath:()=>rk,resolveAgentWitchInstallDir:()=>x,resolveAgentWitchLaunchAgentPrefix:()=>Le,resolveAgentWitchLocalLayout:()=>z,resolveAgentWitchLogsDir:()=>gs,resolveAgentWitchMainLogPath:()=>tk,resolveAgentWitchProjectsDir:()=>Qc,resolveAgentWitchReportsDir:()=>ok,resolveAgentWitchRuntimeWakePort:()=>ga,resolveAgentWitchWakePortFromSources:()=>ma,sanitizeProfileEmailForDir:()=>Ur,sanitizeProfileEmailForLaunchAgentLabel:()=>QR});var Z=l(()=>{"use strict";nk();sk();cF();ik()});var ck,dk,ey=l(()=>{"use strict";ck=new Set(["","loginwindow","_mbsetupuser","root"]),dk=5e3});var dF,Kae,uF,uk,pk=l(()=>{"use strict";dF=require("node:child_process");ey();Kae=e=>e.trim().toLowerCase(),uF=e=>e==null?!1:!ck.has(Kae(e)),uk=()=>{if(process.platform!=="darwin")return null;try{let t=(0,dF.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return uF(t)?t:null}catch{return null}}});var mF,pF,yr,rd=l(()=>{"use strict";mF=p(require("node:os"));pk();pF=e=>e.trim().toLowerCase(),yr=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?uk():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??mF.default.userInfo().username;return pF(r)===pF(o)}});var gF,fF,fs,yF=l(()=>{"use strict";gF=require("node:child_process"),fF=p(require("node:fs"));Z();rd();fs=(e=x())=>{let t=Jt(e);if(!fF.default.existsSync(t))return{ok:!1,errorMessage:"AgentWitch install not found."};if(!yr())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=lt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,gF.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var mk,Yt,fa,hF=l(()=>{"use strict";mk="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",Yt=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[mk]==="1"},fa=e=>`Refusing ${e} host side effects under VITEST (set ${mk}=1 to override).`});var ys=l(()=>{"use strict";hF()});var SF,od,ty=l(()=>{"use strict";SF=require("node:child_process");ys();od=e=>{if(process.platform!=="darwin"||!Yt())return;let t=process.getuid?.();if(t!==void 0)try{(0,SF.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var ry,gk,PF,ke,oy,nd=l(()=>{"use strict";ry=p(require("node:fs")),gk=p(require("node:path"));Z();Ge();PF=e=>{let t=gk.default.join(e,yt);return ry.default.existsSync(t)?ry.default.readdirSync(t).filter(r=>ry.default.statSync(gk.default.join(t,r)).isDirectory()).map(r=>Ur(r)).toSorted():[]},ke=(e=x())=>{let t=Le(e),r=PF(e);return[{profileEmail:lt(e)??r[0]??null,launchAgentLabel:t}]},oy=(e=x())=>PF(e)});var fk,AF,_F,Vae,Ao,ny=l(()=>{"use strict";fk=p(require("node:fs")),AF=p(require("node:os")),_F=p(require("node:path"));Z();nd();Vae=()=>_F.default.join(AF.default.homedir(),"Library","LaunchAgents"),Ao=(e=x())=>{let t=Le(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ke(e))r.add(n.launchAgentLabel);let o=Vae();if(fk.default.existsSync(o))for(let n of fk.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var bF,sd,RF=l(()=>{"use strict";Z();ty();ny();nd();bF=(e=x())=>{let t=new Set(ke(e).map(r=>r.launchAgentLabel));return Ao(e).filter(r=>!t.has(r))},sd=(e=x())=>{for(let t of bF(e))od(t)}});var id,yk=l(()=>{"use strict";Z();ty();ny();id=(e=x())=>{for(let t of Ao(e))od(t)}});var kF,wF,qae,hs,EF=l(()=>{"use strict";kF=require("node:child_process"),wF=require("node:util"),qae=(0,wF.promisify)(kF.execFile),hs=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await qae("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Ss,Jae,hk,Sk=l(()=>{"use strict";Ss=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Jae=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,hk=e=>{let t=e.pathValue??Jae(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Ss(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Ss(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Ss(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Ss(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Ss(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Ss(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Ss(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var sy,Pk=l(()=>{"use strict";sy=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var ad,Ak,iy,ay,_o,ly=l(()=>{"use strict";ad=p(require("node:fs")),Ak=p(require("node:os")),iy=p(require("node:path"));Ge();Z();Sk();Pk();ay=(e,t=Ak.default.homedir())=>iy.default.join(t,"Library","LaunchAgents",`${e}.plist`),_o=e=>{let t=e.installDir??x(),r=e.homeDir??Ak.default.homedir(),o=ay(e.launchAgentLabel,r),n=ad.default.existsSync(o)?ad.default.readFileSync(o,"utf8"):null;if(n!==null&&sy(n))return{ok:!0,rewritten:!1,plistPath:o};let s=hk({launchAgentLabel:e.launchAgentLabel,runPath:iy.default.join(t,Fg,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??ga(t)});if(!sy(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{ad.default.mkdirSync(iy.default.dirname(o),{recursive:!0}),ad.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var CF,IF,LF,ld,Yae,Xae,TF,ct,_k=l(()=>{"use strict";CF=require("node:child_process"),IF=p(require("node:fs")),LF=require("node:util");Z();ys();ly();rd();ld=(0,LF.promisify)(CF.execFile),Yae=async e=>{try{return await ld("launchctl",["print",e]),!0}catch{return!1}},Xae=async(e,t,r)=>{await Yae(t)&&await ld("launchctl",["bootout",t]).catch(()=>{}),await ld("launchctl",["bootstrap",e,r]),await ld("launchctl",["enable",t])},TF=async e=>{try{return await ld("launchctl",["kickstart","-k",e]),!0}catch{return!1}},ct=async(e,t=x())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Yt())return{ok:!1,errorMessage:fa("launchctl")};if(!yr())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=_o({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await TF(n))return{ok:!0};let i=s.plistPath;if(!IF.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Xae(o,n,i),await TF(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Ps,vF=l(()=>{"use strict";Z();_k();nd();Ps=async(e=x(),t=process.platform)=>{if(t!=="darwin")return[];let r=[];for(let o of ke(e))(await ct(o.launchAgentLabel,e)).ok&&r.push(o.launchAgentLabel);return r}});var cy,ya,xF,WF,OF,jF=l(()=>{"use strict";cy=require("node:child_process"),ya=p(require("node:fs")),xF="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",WF=e=>{try{return(0,cy.execFileSync)("plutil",["-extract",xF,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},OF=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=ya.default.statSync(e);try{ya.default.copyFileSync(e,r),(0,cy.execFileSync)("plutil",["-replace",xF,"-string",String(t),r],{stdio:"ignore"}),(0,cy.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),ya.default.chmodSync(r,o&4095),ya.default.renameSync(r,e)}finally{ya.default.rmSync(r,{force:!0})}}});var MF,NF=l(()=>{"use strict";Z();MF=e=>pa(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var DF,HF,Zae,cd,FF=l(()=>{"use strict";DF=p(require("node:fs")),HF=p(require("node:os"));jF();NF();ly();Zae=(e,t)=>{let r=MF({filePort:t,plistValue:WF(e)});return r.kind!=="sync"?!1:(OF(e,r.wakePort),!0)},cd=e=>{let t=e.homeDir??HF.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>ay(o,t)).filter(o=>DF.default.existsSync(o)).filter(o=>Zae(o,e.wakePort))}});var Dt,bo,$F=l(()=>{"use strict";yk();rd();ey();Dt=e=>{yr()||(id(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},bo=(e,t=dk)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{yr()||e()},t);return()=>{clearInterval(r)}}});var Ae=l(()=>{"use strict";ID();yF();ty();RF();yk();ny();rd();EF();vF();_k();ly();Pk();FF();Sk();nd();pk();ey();$F()});var bk=l(()=>{"use strict";Ae()});var dd,zF,dy,UF,ha,BF,GF,yn=l(()=>{"use strict";dd=".agent-witch",zF="memory",dy="project.json",UF="chunks.ndjson",ha="runs.ndjson",BF="reports",GF=".json"});var KF=l(()=>{"use strict";yn()});var VF,uy,Rk=l(()=>{"use strict";VF=p(require("node:path"));KF();uy=(e,t)=>VF.default.join(e.trim(),`${t.trim()}${GF}`)});var ud,qF,JF=l(()=>{"use strict";ud="agent-witch.js",qF="command"});var py=l(()=>{"use strict";JF()});var As,YF,XF=l(()=>{"use strict";py();As=e=>`'${e.replace(/'/g,"'\\''")}'`,YF=e=>{let t=`${e.installDir.trim()}/${"app"}/${ud}`,r=[As("node"),As(t),"report","write","--key",As(e.reportKey.trim()),"--agent-run-id",As(e.agentRunId.trim()),"--status",As(e.status),"--summary",As(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",As(e.details.trim())),r.join(" ")}});var Br,ZF,Qae,kk,my=l(()=>{"use strict";Rk();XF();Br={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},ZF=e=>e===Br.COMPLETED||e===Br.FAILED,Qae=e=>["Maintain a machine-readable job report so the user can check status later.","AgentWitch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),kk=(e,t)=>{let r=uy(t.reportsDir,t.reportKey),o=YF({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Br.IN_PROGRESS,summary:"Task started on your computer."});return`${e.trim()}

---
${Qae({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var dt=l(()=>{"use strict";Ge();Z()});var md,e$,QF,t$,ele,Sa,tle,r$,gd,fd,wk,o$,n$,yd=l(()=>{"use strict";md=p(require("node:fs")),e$=p(require("node:path"));my();Rk();dt();QF=50,t$=e=>{let t=z(),r=uy(t.reportsDir,e);return md.default.mkdirSync(e$.default.dirname(r),{recursive:!0}),r},ele=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Sa=e=>{let t=t$(e);if(!md.default.existsSync(t))return null;try{let r=JSON.parse(md.default.readFileSync(t,"utf8"));return ele(r)?r:null}catch{return null}},tle=(e,t)=>{let r=[...e,t];return r.length>QF?r.slice(r.length-QF):r},r$=e=>{let t=t$(e.reportKey);md.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},gd=e=>{let t=Sa(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:tle(t?.history??[],o)};return r$(n),n},fd=e=>{let t=Sa(e.reportKey);return t!==null?t:gd({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Br.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},wk=(e,t)=>{let r=t.trim();if(r.length===0)return Sa(e);let o=Sa(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return r$(s),s},o$=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},n$=e=>{if(e===null||!ZF(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Br.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var rle,ole,hd,s$,gy,Ek=l(()=>{"use strict";my();yd();rle=new Set(Object.values(Br)),ole=e=>rle.has(e),hd=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},s$=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},gy=e=>{if(e[0]!=="write")return s$(),1;let r=hd(e,"--key"),o=hd(e,"--agent-run-id"),n=hd(e,"--status"),s=hd(e,"--summary"),i=hd(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!ole(n)?(s$(),1):(gd({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ht,_s=l(()=>{"use strict";Ht=()=>!0});var Tk,i$,bs,fy=l(()=>{"use strict";Tk=p(require("node:path")),i$=require("node:url");_s();bs=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Tk.default.resolve(t);return Ht()?r===Tk.default.resolve(__filename):e===void 0?!1:r===(0,i$.fileURLToPath)(e)}});var Ck,Ik,Lk,vk,Ne,xk=l(()=>{"use strict";Ck=["block","warn","info"],Ik=["seed","project","retired"],Lk="warn",vk="29b404a2-d2be-45bf-8f88-143b675a94f2",Ne={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var Wk,Ro,d$,u$,Ok,hn,p$=l(()=>{"use strict";xk();Wk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ro=e=>typeof e=="string"?e:null,d$=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],u$=e=>{if(!Wk(e))return null;let t=Ro(e.id)?.trim()??"",r=Ro(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=Ik.find(d=>d===e.source)??"project",n=Ck.find(d=>d===e.severity)??Lk,s=Wk(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=Ro(s?.value)?.trim()??"",c=Ro(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:Ro(e.cause)?.trim()??"",avoidance:Ro(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:d$(e.keywords),tags:d$(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:Ro(e.lastSeenAt),updatedAt:Ro(e.updatedAt),severity:n}},Ok=e=>!Wk(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>u$(t)).filter(t=>t!==null),syncedAt:Ro(e.syncedAt)},hn=e=>e.filter(t=>t.source!=="retired").length});var Rs,jk=l(()=>{"use strict";Rs=e=>e.replace(/\s+/g," ").trim()});var hr,Mk=l(()=>{"use strict";hr=e=>Math.ceil(e.length/4)});var yy,m$=l(()=>{"use strict";Mk();yy=(e,t)=>{if(t<=0)return"";if(hr(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var Sd,g$=l(()=>{"use strict";jk();Sd=e=>`${Rs(e.id)}|${Rs(e.avoidance)}`});var f$=l(()=>{"use strict"});var ht=l(()=>{"use strict";xk();p$();jk();Mk();m$();g$();f$()});var ks,Pa,Aa,_a,Pd,hy,y$,h$,S$,P$,A$,Ad,_d,Sy,ba,Py,Nk,Sr=l(()=>{"use strict";ks="agent-witch-token-saver",Pa=`# BEGIN ${ks}`,Aa=`# END ${ks}`,_a=`<!-- BEGIN ${ks} -->`,Pd=`<!-- END ${ks} -->`,hy=".cursor/rules/agent-witch-check-context.mdc",y$=".cursor/mcp.json",h$=".codex/config.toml",S$=".codex/AGENTS.md",P$=".claude/settings.json",A$="declined-projects.json",Ad="agent-witch",_d="agent-witch",Sy=["mcp"],ba="mcp-hook",Py="check_context",Nk=`${_d} ${ba} ${Py}`});var Ay,_y,by,Ra,Dk,bd,Ry=l(()=>{"use strict";ht();Sr();Ay=Ne.symptom,_y=Ne.cause,by=Ne.avoidance,Ra=64,Dk="token-saver.db",bd=1});var ky,ka,ale,KTe,wa=l(()=>{"use strict";ky="agent-witch.js",ka="deps.tar.gz",ale="install.sh",KTe={mainScript:`app/${ky}`,depsArchive:`app/${ka}`,installShell:ale}});var _$=l(()=>{"use strict";wa()});var b$=l(()=>{"use strict";wa();_$()});var Rd,Fk,wy,lle,kd,ze,Ta,wd,Ed,ws,$k=l(()=>{"use strict";Rd=p(require("node:fs")),Fk=p(require("node:path"));b$();Z();wy="install-version.json",lle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kd=(e=x())=>Fk.default.join(e,wy),ze=(e=x())=>{let t=kd(e);if(!Rd.default.existsSync(t))return null;try{let r=JSON.parse(Rd.default.readFileSync(t,"utf8"));return!lle(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ta=(e,t=x())=>{let r=kd(t);Rd.default.mkdirSync(Fk.default.dirname(r),{recursive:!0}),Rd.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},wd=(e=x())=>ze(e)?.bundleVersion??"276",Ed=(e,t)=>{let r=ze(e);if(r!==null)return r;let o={bundleVersion:"276",appOrigin:t,updatedAt:new Date().toISOString()};return Ta(o,e),o},ws=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var R$,Es,zk,Uk,Bk,Ey,Gr,Ts,Gk=l(()=>{"use strict";R$=require("node:crypto"),Es=p(require("node:fs")),zk=p(require("node:path"));Z();Uk="self-update-log.ndjson",Bk=100,Ey=(e=x())=>{let t=z(),r=t.installDir===e?t.logsDir:gs({installDir:e,profileEmail:t.profileEmail});return zk.default.join(r,Uk)},Gr=(e,t=x())=>{let r={id:(0,R$.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Ey(t);Es.default.mkdirSync(zk.default.dirname(o),{recursive:!0});let n=Es.default.existsSync(o)?Es.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Bk+1)),JSON.stringify(r)];return Es.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Ts=(e=20,t=x())=>{let r=Ey(t);if(!Es.default.existsSync(r))return[];let o=Es.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var Kk,cCe,Vk=l(()=>{"use strict";wa();Kk="deps",cCe=`${"app"}/${ka}`});var k$=l(()=>{"use strict";Vk()});var w$,Sn,Cs,E$,qk,Jk,T$=l(()=>{"use strict";w$=require("node:child_process"),Sn=p(require("node:fs")),Cs=p(require("node:path"));wa();Vk();E$=e=>Cs.default.join(e,"app",Kk),qk=e=>{let t=Cs.default.join(e,"app"),r=Cs.default.join(t,ka);Sn.default.existsSync(r)&&(Sn.default.rmSync(E$(e),{recursive:!0,force:!0}),Sn.default.mkdirSync(t,{recursive:!0}),(0,w$.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Sn.default.rmSync(r,{force:!0}))},Jk=e=>{Sn.default.rmSync(Cs.default.join(e,"node_modules"),{recursive:!0,force:!0}),Sn.default.rmSync(Cs.default.join(e,"package.json"),{force:!0}),Sn.default.rmSync(Cs.default.join(e,"package-lock.json"),{force:!0})}});var C$=l(()=>{"use strict";k$();T$()});var Zt,Ca=l(()=>{"use strict";Zt=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Td,Ty,I$,cle,Yk,dle,L$,ule,Qk,ple,ew,Qt,Cd,Id,tw,Xk,Zk,Ld,Ia,rw,ow,La=l(()=>{"use strict";Td=p(require("node:fs")),Ty=p(require("node:path"));Ca();I$="active-writer-work.json",cle=1440*60*1e3,Yk=new Set,dle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),L$=e=>e.profileEmail===null?Ty.default.join(e.installDir,I$):Ty.default.join(e.installDir,"profiles",e.profileEmail,I$),ule=e=>{let t=L$(e);if(!Td.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Td.default.readFileSync(t,"utf8"));if(!dle(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},Qk=(e,t)=>{let r=L$(e);Td.default.mkdirSync(Ty.default.dirname(r),{recursive:!0}),Td.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ple=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??Zt;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>cle},ew=e=>{let t=ule(e);if(!ple(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{Qk(e,r)}catch{}return r},Qt=e=>ew(e).activeCount>0,Cd=e=>{let t=ew(e);Qk(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},Id=e=>{let t=ew(e),r=Math.max(0,t.activeCount-1);if(Qk(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of Yk)o()},tw=e=>(Yk.add(e),()=>{Yk.delete(e)}),Xk=null,Zk=null,Ld=e=>{Xk=e},Ia=e=>{Zk=e},rw=()=>{let e=Xk;return Xk=null,e},ow=()=>{let e=Zk;return Zk=null,e}});var et,Cy=l(()=>{"use strict";et=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var v$=l(()=>{"use strict";sa()});var Iy,Ly,vy=l(()=>{"use strict";Iy="AGENT_WITCH_EXTERNAL_BRIDGE",Ly="AGENT_WITCH_EXTERNAL_LIVE"});var x$=l(()=>{"use strict";vy();sa()});var W$,vd,O$=l(()=>{"use strict";W$=require("node:child_process");sa();vd=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,W$.spawn)("systemctl",["--user","restart",$r],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${$r} exited ${o??"unknown"}`))})})});var nw=l(()=>{"use strict";sa();v$();x$();O$()});var sw,iw,j$,gle,aw,lw,fle,yle,hle,Sle,xd,cw=l(()=>{"use strict";sw=require("node:child_process"),iw=p(require("node:fs")),j$=p(require("node:path"));nw();Ae();Z();Ge();gle="[agent-witch] Restarting into bundle",aw=null,lw=e=>{aw=e},fle=()=>process.platform==="linux"&&typeof process.env.INVOCATION_ID=="string"&&process.env.INVOCATION_ID.length>0,yle=e=>j$.default.join(e,Fg,"run.sh"),hle=e=>{let t=yle(e);if(iw.default.existsSync(t)){let n=process.platform==="linux"?"setsid":t,s=process.platform==="linux"?[t]:[];return(0,sw.spawn)(n,s,{cwd:e,detached:!0,stdio:"ignore",env:process.env}).unref(),{ok:!0}}let r=Jt(e);return iw.default.existsSync(r)?((0,sw.spawn)(process.execPath,[r],{cwd:e,detached:!0,stdio:"ignore",env:process.env}).unref(),{ok:!0}):{ok:!1,errorMessage:"AgentWitch install bundle entrypoint is missing."}},Sle=async()=>{aw!==null&&await aw()},xd=async e=>{let t=e.exitProcess??(o=>process.exit(o));if(console.log(`${gle} ${e.bundleVersion}`),await Sle(),process.platform==="darwin"){sd();let o=await Ps(e.installDir);if(o.length>0)return t(0),{ok:!0,mode:"launchd",message:`Restarted LaunchAgent(s): ${o.join(", ")}.`}}if(process.platform==="linux"&&fle())try{return await vd(),t(0),{ok:!0,mode:"systemd",message:"Restarted agent-witch.service systemd user unit."}}catch(o){let n=o instanceof Error?o.message:String(o);console.warn(`[agent-witch] systemd restart after bundle update failed: ${n}`)}let r=hle(e.installDir);return r.ok?(t(0),{ok:!0,mode:"detached-relaunch",message:"Relaunched AgentWitch host process."}):{ok:!1,mode:"skipped",message:r.errorMessage??"Could not relaunch AgentWitch after bundle update."}}});var va,xy,Wd,dw=l(()=>{"use strict";va="qwen2.5:7b",xy="nomic-embed-text",Wd="Install Ollama from https://ollama.com/download"});var Od,uw,Wy=l(()=>{"use strict";dw();Od=()=>`
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
    echo "Ollama is missing. ${Wd}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Wd}" >&2
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
  agent_witch_ensure_ollama_model "${va}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${xy}" "\${pull_log}"
}
`,uw=()=>`
${Od()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. AgentWitch will continue without it." >&2
`});var M$,Ple,Oy,pw=l(()=>{"use strict";M$=require("node:child_process");Z();ys();Wy();Ple=e=>new Promise(t=>{if(!Yt()){t({exitCode:1,output:fa("Ollama")});return}let r=(0,M$.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:x()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Oy=async(e=Ple)=>{let t=`${Od()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Pn,jy,N$,Ale,D$,Wa,_le,ble,xa,Is,Ls,H$=l(()=>{"use strict";Pn=p(require("node:fs")),jy=p(require("node:path"));C$();Z();wa();fr();$k();La();Cy();Gk();cw();pw();N$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ale=e=>{let t=lt(e),r=t===null?z():z(t);if(!Pn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Pn.default.readFileSync(r.configPath,"utf8"));return!N$(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},D$=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!N$(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Wa=async e=>(await D$(e))?.bundleVersion??null,_le=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=jy.default.join(t,r);Pn.default.mkdirSync(jy.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Pn.default.writeFileSync(n,s),r.endsWith(".js")&&Pn.default.chmodSync(n,493)},ble=(e,t)=>e!==null?et(e):t??Nt,xa=(e,t)=>({localBundleVersion:t,...e}),Is=async e=>{let t=x(),r=ze(t),o=r?.bundleVersion??null,n=await Oy();Gr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=Ale(t),i=ble(s,r?.appOrigin);if(i===null){let d=xa({ok:!1,updated:!1,message:"Could not resolve the AgentWitch app origin for updates.",remoteBundleVersion:null},o);return Gr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await D$(i);if(a===null){let d=xa({ok:!1,updated:!1,message:"Could not fetch the remote AgentWitch install bundle.",remoteBundleVersion:null},o);return Gr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||ws(o,a.bundleVersion))){let d=xa({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Gr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let y of a.scripts)await _le(i,t,y);let d=jy.default.join(t,ky);Pn.default.existsSync(d)&&Pn.default.rmSync(d,{force:!0}),qk(t),Jk(t),Ta({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=z(lt(t));if(Qt(u)){Ia("install-bundle-update");let y=xa({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Gr({event:"update_applied",ok:!0,message:y.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),y}let m=await xd({installDir:t,bundleVersion:a.bundleVersion});m.ok||console.warn(`[agent-witch-self-update] Host restart after bundle update failed: ${m.message}`);let g=xa({ok:!0,updated:!0,message:`Updated AgentWitch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Gr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let u=d instanceof Error?d.message:"AgentWitch self-update failed.",m=xa({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Gr({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Ls=()=>{let e=x();return{local:ze(e),logs:Ts(20,e)}}});var F$={};Mt(F$,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>wy,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Wd,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>xy,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>va,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>Uk,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Bk,appendAgentWitchSelfUpdateLog:()=>Gr,buildAgentWitchEnsureOllamaShell:()=>Od,buildAgentWitchInstallScriptOllama:()=>uw,buildAgentWitchSelfUpdateStatus:()=>Ls,ensureAgentWitchInstallVersionRecorded:()=>Ed,ensureAgentWitchOllamaInstalled:()=>Oy,fetchAgentWitchRemoteInstallBundleVersion:()=>Wa,isRemoteAgentWitchBundleVersionNewer:()=>ws,readAgentWitchInstallVersion:()=>ze,readAgentWitchSelfUpdateLogs:()=>Ts,resolveAgentWitchAppOriginFromWsUrl:()=>et,resolveAgentWitchHeartbeatInstallBundleVersion:()=>wd,resolveAgentWitchInstallVersionPath:()=>kd,resolveAgentWitchSelfUpdateLogPath:()=>Ey,runAgentWitchSelfUpdate:()=>Is,writeAgentWitchInstallVersion:()=>Ta});var Kr=l(()=>{"use strict";$k();Gk();H$();Cy();dw();Wy();pw()});var mw={};Mt(mw,{buildAgentWitchSelfUpdateStatus:()=>Ls,fetchAgentWitchRemoteInstallBundleVersion:()=>Wa,runAgentWitchSelfUpdate:()=>Is});var gw=l(()=>{"use strict";Kr()});function Oa(e){return(0,$$.createHash)("sha256").update(e.trim()).digest("hex")}var $$,My=l(()=>{"use strict";$$=require("node:crypto")});var ja,jd,Rle,Ma,fw,Ny=l(()=>{"use strict";ja=p(require("node:fs")),jd=p(require("node:path"));My();dt();Rle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ma=e=>{if(!ja.default.existsSync(e))return null;try{let t=JSON.parse(ja.default.readFileSync(e,"utf8"));return!Rle(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Oa(t.pairingToken.trim())}catch{return null}},fw=(e=x())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(Ma(jd.default.join(e,"config.json")));let n=jd.default.join(e,yt);if(!ja.default.existsSync(n))return t;for(let s of ja.default.readdirSync(n)){let i=jd.default.join(n,s);ja.default.statSync(i).isDirectory()&&o(Ma(jd.default.join(i,"config.json")))}return t}});var Na,Md=l(()=>{"use strict";Na="connection-health.json"});var vs,Dy,kle,Nd,Ue,yw,Hy,tt,Fy=l(()=>{"use strict";vs=p(require("node:fs")),Dy=p(require("node:path"));Md();kle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nd=e=>e.profileEmail===null?Dy.default.join(e.installDir,Na):Dy.default.join(e.installDir,"profiles",e.profileEmail,Na),Ue=e=>{let t=Nd(e);if(!vs.default.existsSync(t))return null;try{let r=JSON.parse(vs.default.readFileSync(t,"utf8"));return!kle(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},yw=e=>{let t=Nd(e);vs.default.existsSync(t)&&vs.default.rmSync(t,{force:!0})},Hy=(e,t)=>{let r=Nd(e),o=Ue(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};vs.default.mkdirSync(Dy.default.dirname(r),{recursive:!0}),vs.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},tt=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Dd,z$=l(()=>{"use strict";Md();Fy();Dd=(e,t)=>{if(!t.socketOpen)return!1;let r=Ue(e);return r===null?!1:!tt(r,t.staleAfterMs??12e4,t.nowMs)}});var hw,U$=l(()=>{"use strict";Fy();hw=(e,t)=>!(e!==null&&!tt(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var xs=l(()=>{"use strict";Fy();z$();U$();Md()});var $y,Sw,wle,Ele,B$,G$=l(()=>{"use strict";$y=p(require("node:fs")),Sw=p(require("node:path"));Z();Ge();xs();Ny();wle=12e4,Ele=e=>{let t=Sw.default.join(e,yt);return $y.default.existsSync(t)?$y.default.readdirSync(t).filter(r=>$y.default.statSync(Sw.default.join(t,r)).isDirectory()):[]},B$=(e=x())=>{let t=null,r=-1;for(let o of Ele(e)){let n=z(o),s=Ue(n);if(s===null||tt(s,wle))continue;let i=Ma(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var Ws,Pw=l(()=>{"use strict";Ws={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var K$,Tle,Cle,V$,Ile,Aw,q$=l(()=>{"use strict";Pw();K$=/you(?:'|')ve hit your session limit/i,Tle=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Cle=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,V$=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Ile=e=>{let t=Cle.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Aw=e=>{let t=e.trim();if(t.length===0)return null;if(K$.test(t))return{code:Ws.SESSION_LIMIT,resetHint:Ile(t),matchedLine:V$(t,K$)};for(let r of Tle)if(r.test(t))return{code:Ws.PROVIDER_QUOTA,resetHint:null,matchedLine:V$(t,r)};return null}});var zy,Uy,_w,bw=l(()=>{"use strict";zy="[[AGENT_RUN_WRITER_EXECUTION]]",Uy="cli-writer-api-key-missing",_w="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var Rw=l(()=>{"use strict";bw()});var J$=l(()=>{"use strict";Rw()});var pe,kw=l(()=>{"use strict";pe={FOLDER_REQUIRED:"folder_required",FOLDER_NOT_REGISTERED:"folder_not_registered",FOLDER_NOT_FOUND:"folder_not_found",FOLDER_CHECK_UNAVAILABLE:"folder_check_unavailable",CODING_TOOLS_PAUSED:"coding_tools_paused"}});var Os,ww=l(()=>{"use strict";Os={computerFallback:"This computer",folderNotAllowed:"Blocked: that folder isn't this project's folder on {computer}. Nothing ran.",folderMissing:"This project has no folder on {computer} yet. Set it in AgentWitch Local, then send the task again.",folderMissingReason:"Set this project's folder on {computer} first.",pauseLabel:"Pause all coding tools",pauseHint:"Running tasks stop. New tasks wait until you turn this off.",pauseStatus:"Paused",pauseReason:"Paused on {computer}. Turn it back on in AgentWitch Local.",secretHidden:"Output hidden: it looked like it had a secret. Open the report on {computer}.",folderCheckUnavailablePlaceholder:"Couldn't check this project's folder on {computer}. Nothing ran."}});var xle,Da,js,Y$=l(()=>{"use strict";kw();ww();xle={[pe.FOLDER_REQUIRED]:"folderMissing",[pe.FOLDER_NOT_FOUND]:"folderMissing",[pe.FOLDER_NOT_REGISTERED]:"folderNotAllowed",[pe.FOLDER_CHECK_UNAVAILABLE]:"folderCheckUnavailablePlaceholder",[pe.CODING_TOOLS_PAUSED]:"pauseReason"},Da=(e,t=Os.computerFallback)=>Os[e].replace("{computer}",t),js=(e,t)=>Da(xle[e],t)});var Vr,Z$,X$,Wle,Ew,Q$,Tw=l(()=>{"use strict";Vr="[redacted-secret]",Z$="[redacted-private-key]",X$="(?!\\[redacted)",Wle="(?:[A-Z0-9]+_)*(?:KEY|APIKEY|SECRET|TOKEN|PASSWORD|PASSWD|PAT|CREDENTIALS?)(?:_[A-Z0-9]+)*",Ew=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----(?:[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----|[\s\S]*$)/g,replacement:Z$},{pattern:new RegExp(`^(\\s*(?:export\\s+)?${Wle}\\s*=\\s*)${X$}(["']?)[^\\s"'#]{4,}\\2`,"gm"),replacement:`$1${Vr}`},{pattern:/("?pairing_?token"?\s*[:=]\s*"?)(?!\[redacted)[^\s",}]{6,}/gi,replacement:`$1${Vr}`},{pattern:/\bsk-[A-Za-z0-9_-]{20,}/g,replacement:Vr},{pattern:/\bgithub_pat_[A-Za-z0-9_]{20,}/g,replacement:Vr},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:Vr},{pattern:/\bxox[a-z]-[A-Za-z0-9-]{10,}/g,replacement:Vr},{pattern:/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,replacement:Vr},{pattern:/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{8,}=*/gi,replacement:`Bearer ${Vr}`},{pattern:new RegExp(`\\b(api[_-]?key|secret|token|password|passwd|credential)(["']?\\s*[:=]\\s*)${X$}(["']?)[^\\s"'\\\\(),;]{8,}\\3`,"gi"),replacement:`$1$2${Vr}`}],Q$=[/-----(?:BEGIN|END) [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[A-Za-z0-9_-]{20,}/,/\bgithub_pat_[A-Za-z0-9_]{20,}/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[a-z]-[A-Za-z0-9-]{10,}/,/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{12,}/i]});var Hd,An,Fd,ez=l(()=>{"use strict";Tw();Hd=e=>Q$.some(t=>t.test(e)),An=e=>{let t={replacements:0},r=Ew.reduce((o,n)=>o.replace(n.pattern,(...s)=>{t.replacements+=1;let i=s.slice(1,-2).map(a=>typeof a=="string"?a:"");return n.replacement.replace(/\$(\d)/g,(a,c)=>i[Number(c)-1]??"")}),e);return{scrubbed:r,residualSecret:Hd(r),replacementCount:t.replacements}},Fd=(e,t)=>{let r=An(e);return r.residualSecret?t:r.scrubbed}});var St=l(()=>{"use strict";Pw();q$();bw();Rw();J$();kw();ww();Y$();Tw();ez()});var $d,tz,rz,By=l(()=>{"use strict";$d={maxTurns:30,maxMinutes:30,maxBudgetUsd:2},tz=["Read","Glob","Grep","Edit","Write","TodoWrite","Bash(git status *)","Bash(git diff *)","Bash(git log *)","Bash(git show *)"],rz=124});var Cw,oz,Gy,zd,Ud,Ole,jle,Mle,nz,De,we,Ky,Nle,Dle,Hle,er,Pr=l(()=>{"use strict";Cw=p(require("node:fs")),oz=p(require("node:os")),Gy=p(require("node:path"));By();zd={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Ud=e=>e.trim().length>0,Ole=e=>{let t=Gy.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},jle=()=>{let e=oz.default.homedir(),t=Gy.default.join(e,".local","bin","agent");if(Cw.default.existsSync(t))return t;let r=Gy.default.join(e,".local","bin","cursor-agent");return Cw.default.existsSync(r)?r:zd.cursorCommand},Mle=e=>{let t=e.trim();return!Ud(t)||t===zd.cursorCommand?jle():t},nz=(e,t)=>Ole(e)?t:["agent",...t],De=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",we=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Ud(t)?t.trim():zd.claudeCommand,codexCommand:Ud(r)?r.trim():zd.codexCommand,cursorCommand:Mle(o),antigravityCommand:Ud(n)?n.trim():zd.antigravityCommand}},Ky=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:nz(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Nle=["--permission-mode","dontAsk","--allowedTools",tz.join(","),"--max-turns",String($d.maxTurns),"--max-budget-usd",$d.maxBudgetUsd.toFixed(2)],Dle=["-s","workspace-write","-c",'approval_policy="never"'],Hle=["--trust","--sandbox","enabled"],er=(e,t,r,o)=>{let n=t.trim();if(!Ud(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json",...Nle,n]}:e==="codex"?{command:r.codexCommand,args:["exec",...Dle,n]}:e==="cursor"?{command:r.cursorCommand,args:nz(r.cursorCommand,[...s,"-p",...Hle,n])}:{command:r.antigravityCommand,args:[...s,"--sandbox","-p",n]}}});var _n,Fle,Ms,$le,Ha,Bd=l(()=>{"use strict";_n=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,Fle=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:_n(s.inputTokens)+_n(s.outputTokens)+_n(s.cacheReadInputTokens)+_n(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Ms=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=_n(a.input_tokens)+_n(a.cache_creation_input_tokens)+_n(a.cache_read_input_tokens),d=_n(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:Fle(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},$le=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Ha=(e,t)=>{let r=Ms(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??$le(r)}}});var Iw,zle,Ule,Lw,vw=l(()=>{"use strict";Iw=e=>e.toLocaleString("en-US"),zle=e=>e<.01?e.toFixed(4):e.toFixed(3),Ule=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${zle(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Iw(e.inputTokens)} in / ${Iw(e.outputTokens)} out (${Iw(e.totalTokens)} total)`,t].join(`
`)},Lw=(e,t)=>{if(t===void 0)return e;let r=Ule(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Vy,xw=l(()=>{"use strict";Vy={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Ns,Ww,qy,Ow=l(()=>{"use strict";xw();Ns="auto",Ww=e=>({value:Ns,label:`Auto (${Vy[e]})`}),qy={anthropic:[Ww("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Ww("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Ww("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Fa,Gd,Jy,$a=l(()=>{"use strict";xw();Ow();Fa=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Ns))return t},Gd=(e,t)=>{let r=Fa(t);return r===void 0?Vy[e]:r},Jy=e=>{let t=Fa(e);return t===void 0?Ns:t}});var Yy,Ble,Gle,Xy,sz=l(()=>{"use strict";Yy={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},Ble=e=>{let t=Yy[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Yy["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Yy["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Yy["gemini-2.0-flash"]:null},Gle=(e,t,r)=>{let o=Ble(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Xy=e=>{let t=Gle(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var za,Kle,Vle,qle,Zy,iz=l(()=>{"use strict";sz();za=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),Kle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=za(r.input_tokens),n=za(r.output_tokens);return o===0&&n===0?null:Xy({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Vle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=za(r.prompt_tokens),n=za(r.completion_tokens);return o===0&&n===0?null:Xy({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},qle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=za(r.promptTokenCount),n=za(r.candidatesTokenCount);return o===0&&n===0?null:Xy({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Zy=(e,t,r)=>e==="anthropic"?Kle(t,r):e==="openai"?Vle(t,r):qle(t,r)});var Jle,jw,Yle,Xle,Zle,Qle,ece,Mw,Nw=l(()=>{"use strict";$a();iz();Jle=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},jw=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Gd(e,t.model)},Yle=async e=>{let t=jw("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=Jle(o);n.length>0&&e.onChunk?.(n);let s=Zy("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},Xle=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},Zle=async e=>{let t=jw("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=Xle(o);n.length>0&&e.onChunk?.(n);let s=Zy("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},Qle=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},ece=async e=>{let t=jw("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=Qle(n);s.length>0&&e.onChunk?.(s);let i=Zy("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},Mw=async e=>{try{return e.provider==="anthropic"?await Yle(e):e.provider==="openai"?await Zle(e):await ece(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ft,Kd=l(()=>{"use strict";Ft=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var az,tce,Qy,Dw=l(()=>{"use strict";az=p(require("node:path")),tce="writer-api-secrets.json",Qy=e=>az.default.join(e,tce)});var Hw,lz,rce,bn,Et,Rn=l(()=>{"use strict";Hw=p(require("node:fs"));$a();Dw();lz=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rce=e=>{if(!lz(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Fa(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},bn=e=>{let t=Qy(e);if(!Hw.default.existsSync(t))return{};try{let r=JSON.parse(Hw.default.readFileSync(t,"utf8"));if(!lz(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=rce(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Et=(e,t)=>bn(e)[t]??null});var ut,Vd=l(()=>{"use strict";ut=e=>e==="api"?"api":"cli"});var cz,ot,Ds,ko=l(()=>{"use strict";cz=p(require("node:path"));Kd();Rn();Vd();ot=e=>cz.default.dirname(e),Ds=(e,t)=>{if(ut(e.writerExecutionBackend)!=="api")return!1;let r=Ft(t);if(r===null)return!1;let o=ot(e.layout.configPath),n=Et(o,r);return n!==null&&n.apiKey.length>0}});var qd,Fw=l(()=>{"use strict";vw();Nw();Kd();Rn();ko();qd=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ft(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=ot(e.layout.configPath),a=Et(i,s);if(a===null){let d=Object.keys(bn(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in AgentWitch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await Mw({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Lw(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var oce,dz,uz,pz=l(()=>{"use strict";oce={paused:!1,updatedAt:null},dz={paused:!0,updatedAt:null},uz=e=>{if(e===null)return oce;try{let t=JSON.parse(e);if(typeof t!="object"||t===null||typeof t.paused!="boolean")return dz;let r=t;return{paused:r.paused,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:null}}catch{return dz}}});var Jd,eh,nce,sce,$w,ice,Hs,wo,zw,th=l(()=>{"use strict";Jd=p(require("node:fs")),eh=p(require("node:path"));pz();nce="coding-tools-pause.json",sce="unreadable",$w=e=>eh.default.join(eh.default.dirname(e),nce),ice=e=>{try{return Jd.default.readFileSync(e,"utf8")}catch(t){return t.code==="ENOENT"?null:sce}},Hs=e=>uz(ice($w(e))),wo=e=>Hs(e).paused,zw=(e,t,r=new Date)=>{let o=$w(e),n={paused:t,updatedAt:r.toISOString()};Jd.default.mkdirSync(eh.default.dirname(o),{recursive:!0,mode:448});let s=`${o}.${process.pid}.tmp`;return Jd.default.writeFileSync(s,`${JSON.stringify(n)}
`,{mode:384}),Jd.default.renameSync(s,o),n}});var ace,lce,cce,Uw,mz,Bw=l(()=>{"use strict";ace=["read_file","write_file","read_url","execute_url","command","mcp","unsandboxed"],lce=new Set(ace),cce=e=>{let t=e.trim(),r=t.indexOf("("),o=t.lastIndexOf(")");if(r<=0||o!==t.length-1)return!1;let n=t.slice(0,r);return lce.has(n)?t.slice(r+1,o).length>0:!1},Uw=["read_file(*)","write_file(*)","command(*)","mcp(*)"],mz=e=>e.filter(t=>cce(t))});var gz,fz=l(()=>{"use strict";gz=".gemini/antigravity-cli"});var yz,hz,Sz=l(()=>{"use strict";yz=p(require("node:path"));fz();Bw();hz=e=>yz.default.join(e,gz,"settings.json")});var Yd,Pz,Az,_z,dce,uce,bz,Rz=l(()=>{"use strict";Yd=p(require("node:fs")),Pz=p(require("node:os")),Az=p(require("node:path"));Bw();Sz();_z=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dce=e=>{if(!Yd.default.existsSync(e))return{};try{let t=JSON.parse(Yd.default.readFileSync(e,"utf8"));return _z(t)?{...t}:{}}catch{return{}}},uce=(e,t)=>{let o=[...mz(Array.isArray(e)?e.filter(n=>typeof n=="string"):[])];for(let n of t)o.includes(n)||o.push(n);return o},bz=(e=Pz.default.homedir())=>{let t=hz(e),r=dce(t),o=_z(r.permissions)?{...r.permissions}:{},n=uce(o.allow,Uw),s=Array.isArray(o.allow)?o.allow.filter(c=>typeof c=="string"):[];if(!(n.length!==s.length||n.some((c,d)=>c!==s[d])))return{settingsPath:t,wrote:!1};Yd.default.mkdirSync(Az.default.dirname(t),{recursive:!0});let a={...r,permissions:{...o,allow:[...n]}};return Yd.default.writeFileSync(t,`${JSON.stringify(a,null,2)}
`,"utf8"),{settingsPath:t,wrote:!0}}});var rh,Gw=l(()=>{"use strict";Rz();rh=e=>{e==="antigravity"&&bz()}});var kz,Ua,Kw=l(()=>{"use strict";kz=require("node:child_process");St();Pr();Bd();Fw();ko();th();Gw();Ua=(e,t,r)=>new Promise(o=>{if(!De(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(wo(e.layout.configPath)){o({exitCode:-1,output:js(pe.CODING_TOOLS_PAUSED)});return}if(Ds(e,t)){qd(e,t,r).then(o);return}let n=er(t,r,we({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}rh(t);let s=(0,kz.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Ha(i.join("")),u=a.join("").trim(),m=[d.output.trim(),u].filter(g=>g.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var wz=l(()=>{"use strict"});var Ez=l(()=>{"use strict";vw();Kw();Nw();wz();Rn();ko()});var Tz,Cz,Iz,Lz=l(()=>{"use strict";Tz="claude",Cz="codex",Iz="cursor"});var vz,pce,Vw,Xd,oh=l(()=>{"use strict";vz=p(require("node:path"));fr();Ge();pce="ws://localhost:3000/api/agent-witch/ws",Vw=e=>e.replace(/\/$/,""),Xd=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Vw(t);let r=vz.default.basename(e.installDir);if(r===jc.production)return Kg;let o=e.configWsUrl?.trim()??"";return r===jc.localhost?o.length>0?Vw(o):pce:o.length>0?Vw(o):Kg}});var gce,qw,Jw=l(()=>{"use strict";Lz();oh();Vd();gce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qw=e=>{if(!gce(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Xd({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??Tz,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??Cz,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??Iz,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:ut(t.writerExecutionBackend),layout:e.layout}}}});var Yw,Xw,Zw=l(()=>{"use strict";Yw=p(require("node:fs"));Z();Jw();Xw=e=>{let t=z(e);if(!Yw.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Yw.default.readFileSync(t.configPath,"utf8")),o=qw({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Zd,xz=l(()=>{"use strict";Zd=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Qw,fce,eE,Wz=l(()=>{"use strict";Qw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fce=e=>{if(!Qw(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Qw(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(m=>{if(!Qw(m))return[];let g=typeof m.itemKey=="string"?m.itemKey.trim():"",y=typeof m.relativePath=="string"?m.relativePath:"",h=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return g.length===0||h.length===0?[]:[{itemKey:g,relativePath:y,contentSha256:h}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},eE=fce});var Oz,yce,nh,tE=l(()=>{"use strict";Oz=p(require("node:path")),yce=(e,t)=>{let r=t.trim();return Oz.default.join(e,"components","store",r.slice(0,2),r)},nh=yce});var jz,hce,rE,Mz=l(()=>{"use strict";jz=p(require("node:fs"));tE();hce=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=nh(e.installDir,n.contentSha256);jz.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this computer. Open Harness to sync, then retry.`},rE=hce});var Qd,Ba,Sce,oE,Pce,nE,sE=l(()=>{"use strict";Qd=p(require("node:fs")),Ba=p(require("node:path"));tE();Sce=(e,t)=>Ba.default.join(e.installDir,"runs",t,"overlay"),oE=(e,t)=>Ba.default.join(Sce(e,t),".cursor"),Pce=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=oE(e,t);Qd.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=nh(e.installDir,i.contentSha256);if(!Qd.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this computer."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ba.default.join(n,c):Ba.default.join(n,i.itemKey);Qd.default.mkdirSync(Ba.default.dirname(d),{recursive:!0}),Qd.default.copyFileSync(a,d)}return{ok:!0}},nE=Pce});var iE,Nz,Ace,eu,Dz=l(()=>{"use strict";iE=p(require("node:fs")),Nz=p(require("node:path")),Ace=(e,t)=>{let r=Nz.default.join(e.installDir,"runs",t);iE.default.existsSync(r)&&iE.default.rmSync(r,{recursive:!0,force:!0})},eu=Ace});var _ce,aE,Hz=l(()=>{"use strict";sE();_ce=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=oE(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},aE=_ce});var lE,bce,Rce,kce,wce,Ece,B,Fz=l(()=>{"use strict";lE=p(require("node:fs"));oh();Z();Vd();bce="claude",Rce="codex",kce="cursor",wce="agy",Ece=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=()=>{let e=z();if(!lE.default.existsSync(e.configPath))return null;try{let t=JSON.parse(lE.default.readFileSync(e.configPath,"utf8"));if(!Ece(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Xd({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:ut(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:bce,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:Rce,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:kce,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:wce,pairingToken:s,layout:e}}catch{return null}}});var sh,$z,zz=l(()=>{"use strict";sh=p(require("node:fs"));Dw();$z=(e,t)=>{let r=Qy(e);sh.default.mkdirSync(e,{recursive:!0}),sh.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{sh.default.chmodSync(r,384)}catch{}}});var tu,Uz,ih=l(()=>{"use strict";tu=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},Uz=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===tu(t)}});var ru,Tce,cE,dE,Bz=l(()=>{"use strict";ru=p(require("node:fs"));Rn();zz();ih();$a();ko();Tce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cE=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=Uz(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Fa(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},dE=e=>{let t=ot(e.configPath),r={};if(ru.default.existsSync(e.configPath))try{let n=JSON.parse(ru.default.readFileSync(e.configPath,"utf8"));Tce(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,ru.default.mkdirSync(t,{recursive:!0}),ru.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=cE(cE(cE(bn(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);$z(t,o)}});var ah,uE=l(()=>{"use strict";ah={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var pE,Gz=l(()=>{"use strict";Kd();Rn();ko();ko();pE=(e,t)=>{if(Ds(e,t)||t==="antigravity")return!1;let r=Ft(t);if(r===null)return!1;let o=ot(e.layout.configPath),n=Et(o,r);return n===null||n.apiKey.trim().length===0}});var Kz,mE,gE=l(()=>{"use strict";Kz=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},mE=async e=>{let t=Kz(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=Kz(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var Cce,fE,Vz=l(()=>{"use strict";Ae();Zw();gE();Cce=1e4,fE=()=>mE({listProfileEmails:oy,readConfig:Xw,pollIntervalMs:Cce,logWaiting:e=>{console.error(e)}})});var Ice,yE,qz=l(()=>{"use strict";Ice={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This AgentWitch Local cannot handle Connect/restart. Update from /download."},yE=e=>({status:e.status,reason:e.reason,message:Ice[e.status]})});var Lce,hE,qr,Jz=l(()=>{"use strict";St();Lce=new Set(["terminal.stream.chunk","command.claude.result","command.claude.input_required","command.writer.session.chunk","command.writer.session.ready","harness.request.result","shell.data","run.heartbeat","dashboard.agentRun.get.result","dashboard.agentRun.list.result"]),hE=(e,t)=>typeof e=="string"?Fd(e,t):Array.isArray(e)?e.map(r=>hE(r,t)):typeof e=="object"&&e!==null?Object.fromEntries(Object.entries(e).map(([r,o])=>[r,hE(o,t)])):e,qr=e=>typeof e.type!="string"||!Lce.has(e.type)||e.payload===void 0?{...e}:{...e,payload:hE(e.payload,Da("secretHidden"))}});var vce,SE,Yz=l(()=>{"use strict";th();vce=1e3,SE=(e,t,r=vce)=>{let o={paused:Hs(e).paused},s=setInterval(()=>{let i=Hs(e).paused;i!==o.paused&&(o.paused=i,t(i))},r);return s.unref?.(),()=>{clearInterval(s)}}});var lh,ou,Xz=l(()=>{"use strict";lh=(e,t,r=500)=>[...e.filter(o=>o!==t),t].slice(-r),ou=(e=500)=>{let t={ids:[]};return{has:r=>t.ids.includes(r),add:r=>{t.ids=lh(t.ids,r,e)}}}});var nu,Zz=l(()=>{"use strict";St();nu=e=>({type:"command.claude.result",payload:{exitCode:-1,output:js(e.code,e.computer),errorCode:e.code,...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{}},...e.requestId!==void 0?{requestId:e.requestId}:{}})});var oe=l(()=>{"use strict";Kw();Ez();Zw();oh();xz();Wz();Mz();sE();Dz();Hz();Vd();Fz();Bz();Rn();ko();ih();$a();uE();Fw();ko();Gz();Kd();Rn();Vz();Jw();gE();qz();Jz();th();Yz();Xz();Zz()});var Qz,PE,eU=l(()=>{"use strict";Qz=p(require("node:path"));Z();Ge();G$();My();Ny();oe();PE=(e=x())=>{let t=B$(e);if(t!==null)return t;let r=lt(e);if(r!==null){let n=Ma(Qz.default.join(e,yt,r,"config.json"));if(n!==null)return n}let o=B()?.pairingToken.trim()??"";return o.length===0?null:Oa(o)}});var ch,tU,xce,Wce,rU,dh,su,uh,iu=l(()=>{"use strict";ch=p(require("node:fs")),tU=p(require("node:path")),xce="wake-port.json",Wce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rU=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,dh=e=>tU.default.join(e,xce),su=e=>{let t=dh(e);if(!ch.default.existsSync(t))return null;try{let r=JSON.parse(ch.default.readFileSync(t,"utf8"));if(Wce(r)&&rU(r.wakePort))return r.wakePort}catch{return null}return null},uh=(e,t)=>{if(!rU(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=dh(e);ch.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var SWe,PWe,AWe,Ar,oU,au=l(()=>{"use strict";Z();iu();dt();iu();SWe=fn(),PWe=`${Le()}-wake`,AWe=Le(),Ar=()=>{let e=x();return ma({filePort:su(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:fn(e)})},oU=e=>{let t=x();su(t)===null&&uh(t,e)}});var nU=l(()=>{"use strict";My();Ae();Ny();eU();oe();au()});var AE,lu,cu,sU=l(()=>{"use strict";AE=p(require("node:os"));nU();lu=()=>{let e=ke();return{ok:!0,port:Ar(),hostname:AE.default.hostname(),profileCount:e.length}},cu=()=>{let e=ke(),t=PE(),r=fw();return{hostname:AE.default.hostname(),port:Ar(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var _E=l(()=>{"use strict";sU()});var iU,aU,lU,ph,Ga=l(()=>{"use strict";iU="materialization.json",aU="backups",lU=".gitignore",ph=e=>`harness-set:${e.trim()}`});var cU,dU,mh,uU=l(()=>{"use strict";cU=p(require("node:crypto")),dU=p(require("node:fs")),mh=e=>{try{let t=dU.default.readFileSync(e);return cU.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var kn,Fs,Oce,pU,bE,mU=l(()=>{"use strict";kn=p(require("node:fs")),Fs=p(require("node:path"));uU();Oce=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Fs.default.join(t,n,o);return kn.default.mkdirSync(Fs.default.dirname(s),{recursive:!0}),kn.default.copyFileSync(r,s),Fs.default.relative(e,s).replaceAll("\\","/")},pU=e=>{let t=Fs.default.join(e.repoRoot,e.repoRelativeDestination),r=mh(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(kn.default.existsSync(t)){let n=mh(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=Oce(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return kn.default.mkdirSync(Fs.default.dirname(t),{recursive:!0}),kn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return kn.default.mkdirSync(Fs.default.dirname(t),{recursive:!0}),kn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},bE=e=>{let t=mh(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var RE,gU,Ka,gh=l(()=>{"use strict";RE=p(require("node:fs"));Ga();gU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ka=e=>{if(!RE.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(RE.default.readFileSync(e,"utf8"));if(gU(t)&&t.version===1&&gU(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var wn,fh,yh,kE=l(()=>{"use strict";wn=p(require("node:fs")),fh=p(require("node:path"));Ga();yh=e=>{let t=new Set(e.setSlugs.map(s=>ph(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=fh.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=fh.default.join(e.repoRoot,i.backupPath);wn.default.existsSync(c)?(wn.default.mkdirSync(fh.default.dirname(a),{recursive:!0}),wn.default.copyFileSync(c,a),o.push(s)):wn.default.existsSync(a)&&wn.default.rmSync(a,{force:!0})}else wn.default.existsSync(a)&&wn.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var wE,Va,hh=l(()=>{"use strict";wE=p(require("node:path"));Ga();Va=e=>({ledgerFilePath:wE.default.join(e.metaDirPath,iU),backupsDirPath:wE.default.join(e.metaDirPath,aU)})});var EE,fU,yU=l(()=>{"use strict";EE=p(require("node:path")),fU=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return EE.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return EE.default.posix.join(s,e,n)}});var TE,hU,uu,CE=l(()=>{"use strict";TE=p(require("node:fs")),hU=p(require("node:path")),uu=(e,t)=>{TE.default.mkdirSync(hU.default.dirname(e),{recursive:!0}),TE.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var IE,jce,He,Jr=l(()=>{"use strict";IE=p(require("node:os")),jce=e=>{let t=e.trim();return t.startsWith("~/")?`${IE.default.homedir()}${t.slice(1)}`:t==="~"?IE.default.homedir():t},He=jce});var Sh,SU,Mce,PU,AU=l(()=>{"use strict";Sh=p(require("node:fs")),SU=p(require("node:path"));Ga();yn();Mce=`*
!${dy}
`,PU=e=>{let t=SU.default.join(e,lU);Sh.default.existsSync(t)||(Sh.default.mkdirSync(e,{recursive:!0}),Sh.default.writeFileSync(t,Mce))}});var $s,tr,zs=l(()=>{"use strict";$s=p(require("node:path"));yn();Jr();tr=e=>{let t=He(e),r=$s.default.join(t,dd);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:$s.default.join(r,"rag"),memoryDirPath:$s.default.join(r,zF),reportsDirPath:$s.default.join(r,BF),metaFilePath:$s.default.join(r,dy),ragChunksFilePath:$s.default.join(r,"rag",UF)}}});var Yr,bU,Nce,Dce,$t,pu=l(()=>{"use strict";Yr=p(require("node:fs")),bU=p(require("node:path"));yn();AU();zs();Nce=(e,t)=>{if(Yr.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Yr.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},Dce=e=>{Yr.default.existsSync(e.ragChunksFilePath)||Yr.default.writeFileSync(e.ragChunksFilePath,"");let t=bU.default.join(e.memoryDirPath,ha);Yr.default.existsSync(t)||Yr.default.writeFileSync(t,"")},$t=e=>{let t=tr(e.projectFolderPath);return Yr.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Yr.default.mkdirSync(t.ragDirPath,{recursive:!0}),Yr.default.mkdirSync(t.memoryDirPath,{recursive:!0}),PU(t.metaDirPath),Nce(t,e),Dce(t),{ok:!0,layout:t}}});var RU,kU,wU,EU,Ph,Ah=l(()=>{"use strict";RU="components",kU="store",wU="versions",EU="installed.json",Ph=e=>`harness-set:${e.trim()}`});var LE,TU,_h,vE=l(()=>{"use strict";LE=p(require("node:fs")),TU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_h=e=>{if(!LE.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(LE.default.readFileSync(e,"utf8"));if(TU(t)&&t.version===1&&TU(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var mu,qa,bh=l(()=>{"use strict";mu=p(require("node:path"));Ah();qa=e=>{let t=mu.default.join(e,RU);return{componentsRootDir:t,storeDir:mu.default.join(t,kU),versionsDir:mu.default.join(t,wU),installedFilePath:mu.default.join(t,EU)}}});var xE,CU,Rh,kh,wh=l(()=>{"use strict";xE=p(require("node:crypto")),CU=p(require("node:fs")),Rh=e=>xE.default.createHash("sha256").update(e,"utf8").digest("hex"),kh=e=>{try{let t=CU.default.readFileSync(e);return xE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var WE,IU,LU,vU=l(()=>{"use strict";WE=p(require("node:fs")),IU=p(require("node:path")),LU=(e,t)=>{WE.default.mkdirSync(IU.default.dirname(e),{recursive:!0}),WE.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var OE,jE,xU,WU=l(()=>{"use strict";OE=p(require("node:fs")),jE=p(require("node:path")),xU=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=jE.default.join(e,r),n=jE.default.join(o,`${t.versionId}.json`);OE.default.mkdirSync(o,{recursive:!0}),OE.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Eh,OU,jU,MU=l(()=>{"use strict";Eh=p(require("node:fs")),OU=p(require("node:path"));wh();jU=e=>{let t=Rh(e.content),r=OU.default.join(e.storeDir,t);return Eh.default.existsSync(r)||(Eh.default.mkdirSync(e.storeDir,{recursive:!0}),Eh.default.writeFileSync(r,e.content)),t}});var ME,NU,Hce,Th,NE=l(()=>{"use strict";ME=p(require("node:fs")),NU=p(require("node:path"));Ah();vE();bh();wh();vU();WU();MU();Hce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Th=e=>{let t=qa(e.installDir),r=Ph(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!Hce(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=NU.default.join(e.harnessRootDir,a);if(!ME.default.existsSync(c))continue;let d=ME.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:kh(c);if(u!==null){if(Rh(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);jU({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;xU(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=_h(t.installedFilePath);LU(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var HE,DE,DU,HU=l(()=>{"use strict";HE=p(require("node:fs"));NE();vE();bh();DE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DU=e=>{if(!HE.default.existsSync(e.harnessManifestPath))return;let t=qa(e.installDir),r=_h(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(HE.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!DE(o)||o.version!==1||!DE(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!DE(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];Th({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var FE,FU,$U,zU=l(()=>{"use strict";FE=p(require("node:fs")),FU=p(require("node:path")),$U=e=>{let t=e.componentId.replaceAll("/","_"),r=FU.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!FE.default.existsSync(r))return null;try{let o=JSON.parse(FE.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Ch,Ih,UU,BU=l(()=>{"use strict";Ch=p(require("node:fs")),Ih=p(require("node:path"));Ah();HU();zU();bh();wh();UU=e=>{DU({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=qa(e.layout.installDir),r=Ph(e.setSlug),o=$U({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Ih.default.join(t.storeDir,i.contentSha256);if(Ch.default.existsSync(a)&&kh(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Ih.default.join(e.layout.harnessRootDir,n):Ih.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Ch.default.existsSync(s))return null;try{if(!Ch.default.statSync(s).isFile())return null}catch{return null}return s}});var GU,Fce,$E,rr,Ja=l(()=>{"use strict";gh();hh();zs();GU="harness-set:",Fce=e=>{let t=e.trim();if(!t.startsWith(GU))return null;let r=t.slice(GU.length).trim();return r.length>0?r:null},$E=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=Fce(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},rr=e=>{let t=tr(e),{ledgerFilePath:r}=Va(t),o=Ka(r);return $E(o)}});var Lh,zE,gu,$ce,Eo,fu,Ya=l(()=>{"use strict";Lh=p(require("node:fs")),zE=p(require("node:os")),gu=p(require("node:path")),$ce=()=>Lh.default.realpathSync(gu.default.resolve(zE.default.homedir())),Eo=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?gu.default.join(zE.default.homedir(),t.slice(1)):t,o;try{o=Lh.default.realpathSync(gu.default.resolve(r))}catch{return null}let n=$ce();return o===n||o.startsWith(`${n}${gu.default.sep}`)?o:null},fu=e=>{let t=Eo(e);if(t===null)return null;try{if(!Lh.default.statSync(t).isFile())return null}catch{return null}return t}});var UE,BE=l(()=>{"use strict";UE=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var xh,KU,vh,zce,yu,GE=l(()=>{"use strict";xh=p(require("node:fs")),KU=p(require("node:path"));Ga();mU();gh();kE();hh();yU();CE();Jr();pu();BU();Ja();Ya();BE();vh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zce=e=>{if(!xh.default.existsSync(e))return null;try{let t=JSON.parse(xh.default.readFileSync(e,"utf8"));if(vh(t)&&t.version===1)return t}catch{return null}return null},yu=e=>{let t=[...new Set(e.setSlugs.map(I=>I.trim()).filter(I=>I.length>0))],r=He(e.projectFolderPath),o=Eo(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=xh.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=$t({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Va(s.layout),d=rr(o).filter(I=>!t.includes(I)),u=Ka(i),m=0;if(d.length>0){let I=yh({repoRoot:o,setSlugs:d,ledger:u});u=I.ledger,m=I.summary.removedPaths.length}if(t.length===0)return uu(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let g=zce(e.layout.harnessManifestPath);if(g===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=vh(g.sets)?g.sets:{},h=0,S=0,w=0;for(let I of t){let f=y[I];if(!vh(f))return{ok:!1,errorMessage:`Harness set "${I}" is not installed locally.`};let k=typeof f.version=="number"?String(f.version):"1",M=ph(I),_=Array.isArray(f.items)?f.items:[];for(let W of _){if(!vh(W))continue;let O=typeof W.path=="string"?W.path.trim():"";if(O.length===0)continue;let b=UE(O);if(b===null)continue;let P=fU(I,b),C=KU.default.posix.join(".cursor",P).replaceAll("\\","/"),L=typeof W.id=="string"?W.id.trim():"",be=UU({layout:e.layout,setSlug:I,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:O,manifestItemId:L});if(be===null)continue;let te=pU({repoRoot:o,backupsDir:a,repoRelativeDestination:C,sourceAbsolutePath:be,componentId:M,versionId:k,ledger:u});if(te.kind==="skipped_unchanged"){S+=1;continue}if(te.kind==="backed_up_user_file"){w+=1,h+=1,u={version:1,entries:{...u.entries,[C]:bE({componentId:M,versionId:k,sourceAbsolutePath:be,backupPath:te.backupPath})}};continue}h+=1,u={version:1,entries:{...u.entries,[C]:bE({componentId:M,versionId:k,sourceAbsolutePath:be})}}}}return h===0&&S===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(uu(i,u),{ok:!0,writtenFileCount:h,skippedFileCount:S,backedUpFileCount:w,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var VU,Wh,Uce,Bce,Gce,Kce,Vce,qce,Jce,Yce,Xce,hu,Oh=l(()=>{"use strict";VU=p(require("node:crypto")),Wh=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Uce=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Bce=(e,t)=>{let r=Uce(t),o=Wh(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Gce=(e,t,r)=>{let o=Bce(t,r);return`shared/items/${e}/${o}`},Kce=["rules","skills","commands","instructions","agents"],Vce=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),qce=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Jce=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Yce=e=>VU.default.createHash("sha256").update(e,"utf8").digest("hex"),Xce=e=>({id:e.id,kind:e.kind,title:e.title,path:Gce(e.id,e.kind,e.title),contentSha256:Yce(e.content)}),hu=e=>{let t=new Date().toISOString(),r=e.existingManifest??Vce(e.hostname,t),o=Wh(e.bundle.slug),n=Jce(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...Kce.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let m=Xce(u);return{files:[...d.files,{relativePath:m.path,content:u.content}],nextItems:qce(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var En,qU,jh,Zce,Us,KE=l(()=>{"use strict";En=p(require("node:fs")),qU=p(require("node:os")),jh=p(require("node:path"));Oh();Zce=e=>{if(!En.default.existsSync(e))return null;try{let t=JSON.parse(En.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Us=e=>{try{let t=Zce(e.layout.harnessManifestPath),r=hu({bundle:e.bundle,hostname:qU.default.hostname(),existingManifest:t});En.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)En.default.mkdirSync(jh.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=jh.default.join(e.layout.harnessRootDir,o.relativePath);En.default.mkdirSync(jh.default.dirname(n),{recursive:!0}),En.default.writeFileSync(n,o.content)}return En.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var VE,JU=l(()=>{"use strict";KE();GE();VE=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Us({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return yu({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var YU,XU=l(()=>{"use strict";YU=["rule","skill","command","instruction","agent"]});var ZU,Qce,ede,Xr,qE=l(()=>{"use strict";XU();ZU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qce=e=>typeof e=="string"&&YU.includes(e),ede=e=>{if(!ZU(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Qce(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Xr=e=>{if(!ZU(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=ede(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var QU,tde,JE,e1=l(()=>{"use strict";QU=require("node:zlib");qE();tde="x-agent-witch-token",JE=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[tde]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,QU.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Xr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var XE,YE,To,t1=l(()=>{"use strict";XE=p(require("node:fs")),YE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),To=e=>{if(!XE.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(XE.default.readFileSync(e.harnessManifestPath,"utf8"));if(!YE(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=YE(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!YE(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Mh,r1=l(()=>{"use strict";Mh=()=>"~"});var o1,n1,s1=l(()=>{"use strict";o1=require("node:crypto"),n1=e=>`local-${(0,o1.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var ZE,i1=l(()=>{"use strict";ZE=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var Su,Nh,QE=l(()=>{"use strict";Su=p(require("node:path")),Nh=e=>{let t=Su.default.dirname(e),r=Su.default.basename(t);return r==="agents"?Su.default.basename(Su.default.dirname(t)):r}});var Pu,Co,a1,rde,ode,nde,Dh,l1,eT=l(()=>{"use strict";Pu=p(require("node:fs")),Co=p(require("node:path"));s1();i1();QE();a1=new Set(["node_modules",".git","dist","build",".next","coverage"]),rde=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},ode=(e,t)=>{let r=Co.default.basename(t);if(e==="skill"){let o=t.split(Co.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},nde=e=>{let t=[],r=(n,s)=>{let i;try{i=Pu.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&a1.has(a.name))continue;let c=Co.default.join(n,a.name),d=s?Co.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;ZE(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Co.default.join(e,n);Pu.default.existsSync(s)&&r(s,n)}let o=Co.default.join(e,"skills");return Pu.default.existsSync(o)&&r(o,"skills"),t},Dh=e=>{let t=nde(e);if(t.length===0)return null;let r=Co.default.dirname(e),o=Nh(e),n=rde(o),s=t.map(i=>{let a=ZE(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:n1(i.absolutePath),kind:a,title:ode(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},l1=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Pu.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||a1.has(a.name))continue;let c=Co.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var c1,tT,sde,rT,d1=l(()=>{"use strict";c1=p(require("node:fs")),tT=p(require("node:path"));eT();Ya();sde=e=>{let t=Eo(e.trim());if(t===null)return null;if(tT.default.basename(t)===".cursor")return t;let r=tT.default.join(t,".cursor");try{if(c1.default.statSync(r).isDirectory())return Eo(r)}catch{return null}return null},rT=e=>{let t=sde(e.projectPath);if(t===null)return null;let r=Dh(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var u1,ide,Hh,oT,p1=l(()=>{"use strict";u1=p(require("node:path"));eT();Ya();QE();ide=5,Hh=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},oT=e=>{let t=Eo(e.scanRoot.trim());if(t===null)return Hh(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of l1(t,ide,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=Eo(s);if(i===null)continue;let a=Nh(i);Hh(e.response,"folder",{cursorDir:i,groupName:a,repoPath:u1.default.dirname(i)});let c=Dh(i);c!==null&&(r.push(c),Hh(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Hh(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var m1,g1,f1=l(()=>{"use strict";m1=p(require("node:path")),g1=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:m1.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Pt,y1,nT,ade,sT,iT,Fh,aT,Au,h1=l(()=>{"use strict";Pt=p(require("node:fs")),y1=p(require("node:os")),nT=p(require("node:path"));Oh();NE();Ya();f1();ade=e=>{if(!Pt.default.existsSync(e))return null;try{let t=JSON.parse(Pt.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},sT=e=>{let t=e.hostname??y1.default.hostname(),r=ade(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let m=fu(u.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let g=Pt.default.readFileSync(m,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:g,setSlugs:[i.slug]})}let d=hu({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Pt.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Pt.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=nT.default.join(e.layout.harnessRootDir,i.relativePath);Pt.default.mkdirSync(nT.default.dirname(a),{recursive:!0}),Pt.default.writeFileSync(a,i.content)}Pt.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Wh(i.slug),d=r.sets[c];d!==void 0&&Th({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},iT="reveal-cache.json",Fh=(e,t)=>{Pt.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Pt.default.writeFileSync(`${e.harnessRootDir}/${iT}`,`${JSON.stringify(t,null,2)}
`)},aT=e=>{let t=`${e.harnessRootDir}/${iT}`;Pt.default.existsSync(t)&&Pt.default.unlinkSync(t)},Au=e=>{let t=`${e.harnessRootDir}/${iT}`;if(!Pt.default.existsSync(t))return null;try{let r=JSON.parse(Pt.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return g1(r)}catch{return null}return null}});var Tn=l(()=>{"use strict";GE();JU();BE();KE();e1();qE();Oh();t1();r1();d1();Ya();p1();h1()});var lT,S1=l(()=>{"use strict";Tn();dt();lT=e=>{let t=z(e.profileEmail);return Us({bundle:e.bundle,layout:t})}});var P1=l(()=>{"use strict";S1();Tn()});var lde,A1,cde,_1,Bs,$h,b1=l(()=>{"use strict";lde=["agentwitch.com","www.agentwitch.com"],A1=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,cde=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},_1=e=>{let t=cde(e);return!!(lde.includes(t)||A1.test(e.trim().toLowerCase()))},Bs=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return _1(r)?A1.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},$h=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Bs(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var _u=l(()=>{"use strict";b1()});var _r,Xa=l(()=>{"use strict";_r=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var bu,R1=l(()=>{"use strict";P1();_u();Xa();bu=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Xr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Bs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=lT({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var cT=l(()=>{"use strict";R1()});var dde,Za,dT=l(()=>{"use strict";dde=e=>e==="hourly"||e==="daily"||e==="weekdays",Za=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!dde(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Ru,zh,k1,w1,uT,br,Uh,Bh,Gh,Kh,Vh=l(()=>{"use strict";Ru=p(require("node:fs")),zh=p(require("node:path"));dT();k1="automations.json",w1=e=>e.profileEmail!==null?zh.default.join(e.installDir,"profiles",e.profileEmail,k1):zh.default.join(e.installDir,k1),uT=()=>({version:1,automations:[]}),br=e=>{let t=w1(e);if(!Ru.default.existsSync(t))return uT();try{let r=JSON.parse(Ru.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?uT():{version:1,automations:r.automations.flatMap(n=>{let s=Za(n);return s!==null?[s]:[]})}}catch{return uT()}},Uh=(e,t)=>{let r=w1(e);Ru.default.mkdirSync(zh.default.dirname(r),{recursive:!0}),Ru.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Bh=(e,t)=>{Uh(e,{version:1,automations:t})},Gh=(e,t)=>{let o=br(e).automations.filter(n=>n.id!==t.id);Uh(e,{version:1,automations:[...o,t]})},Kh=(e,t)=>br(e).automations.find(r=>r.id===t)??null});var ae,At=l(()=>{"use strict";ae="x-agent-witch-token"});var pT=l(()=>{"use strict";Cy();Wy()});var J,Gs,mT,ku,gT,ude,fT,Ks,Io,yT,Rr=l(()=>{"use strict";At();pT();J=e=>{let t=et(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Gs=e=>({[ae]:e,"Content-Type":"application/json"}),mT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},ku=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},gT=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},ude=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},fT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ks=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Gs(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return ude(r)}catch{return null}},Io=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Gs(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},yT=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Vs,E1,T1,pde,hT,C1,ST=l(()=>{"use strict";Vs=p(require("node:fs")),E1=p(require("node:path")),T1=e=>E1.default.join(e.harnessRootDir,"projects-registry.json"),pde=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),hT=e=>{let t=T1(e);if(!Vs.default.existsSync(t))return[];try{let r=JSON.parse(Vs.default.readFileSync(t,"utf8"));return pde(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},C1=e=>{let t=T1(e);if(!Vs.default.existsSync(t))return;let r=`${t}.migrated`;if(Vs.default.existsSync(r)){Vs.default.unlinkSync(t);return}Vs.default.renameSync(t,r)}});var I1,mde,gde,L1,v1=l(()=>{"use strict";Jr();I1=e=>He(e),mde=e=>new Set(e.map(t=>I1(t.folderPath))),gde=e=>new Set(e.map(t=>t.id)),L1=(e,t)=>{let r=mde(t),o=gde(t),n=[],s=new Set;for(let i of e){let a=I1(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var PT,AT=l(()=>{"use strict";Rr();ST();v1();PT=async(e,t)=>{let r=hT(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=J({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Ks(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=L1(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await fT(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&C1(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var _T,kr,Qa=l(()=>{"use strict";_T=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),kr=(e,t)=>e.find(r=>r.id===t)??null});var Zr,el=l(()=>{"use strict";Rr();AT();Qa();Zr=async(e,t)=>{t!==void 0&&await PT(t,e);let r=J({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Ks(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach AgentWitch Cloud. Check the computer connection and try again."};let n=_T(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in AgentWitch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from AgentWitch Cloud.`}}});var x1=l(()=>{"use strict"});var bT,fde,qh,RT=l(()=>{"use strict";bT=p(require("node:fs"));zs();fde=e=>{let t=tr(e);if(!bT.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(bT.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},qh=fde});var kT,wT,W1=l(()=>{"use strict";kT=p(require("node:path"));Jr();RT();wT=e=>{let t=kT.default.resolve(He(e)),r=o=>{let{projectId:n}=qh(o);if(n!==null)return n;let s=kT.default.dirname(o);return s===o?null:r(s)};return r(t)}});var yde,hde,Jh,ET=l(()=>{"use strict";yde="Default",hde=e=>e.trim().toLowerCase()===yde.toLowerCase(),Jh=hde});var Yh,Xh,Zh=l(()=>{"use strict";Yh={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},Xh=e=>{let t=Object.entries(Yh).find(([,r])=>r===e);return t===void 0?null:t[0]}});var O1,ve,M1,Sde,TT,CT,j1,Pde,Ade,wu,IT,_de,bde,Rde,N1,D1=l(()=>{"use strict";ht();Zh();O1="new",ve=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),M1={block:"Must fix",warn:"Warning",info:"Note"},Sde={seed:"Built-in",project:"This project",retired:"Retired"},TT=6e4,CT=60*TT,j1=24*CT,Pde=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<TT)return"Last hit just now";if(o<CT)return`Last hit ${Math.floor(o/TT)} min ago`;if(o<j1)return`Last hit ${Math.floor(o/CT)}h ago`;let n=Math.floor(o/j1);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},Ade=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},wu=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,IT=e=>e?{retired:"1"}:{},_de=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${M1[a]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${ve(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${ve(t?.id??"")}" />
      <input type="hidden" name="tags" value="${ve((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${Ne.symptom}" value="${ve(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${Ne.avoidance}" rows="3" placeholder="What to do instead">${ve(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${Ne.cause}" rows="2" placeholder="What leads to this trap">${ve(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${ve((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${Ne.checkValue}" value="${ve(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${ve(wu(e.projectId,IT(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},bde=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${ve(r)}" />
            <input type="hidden" name="pitfallId" value="${ve(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${ve(wu(r,{...IT(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>ve(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${ve(t.id)}">
        <p><strong>${ve(t.symptom)}</strong> <span class="muted">\xB7 ${M1[t.severity]} \xB7 ${Sde[t.source]}</span></p>
        <p>Fix: ${ve(t.avoidance)}</p>
        ${a}
        <p class="muted">${ve(Pde(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${ve(Ade(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},Rde=e=>{let t=e.postPaths??Yh;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this computer on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=hn(o),s=n>=64,i=e.showRetired?o:o.filter(y=>y.source!=="retired"),a=e.editId===null?null:e.editId===O1?s?null:{item:null}:(()=>{let y=o.find(h=>h.id===e.editId&&h.source!=="retired");return y===void 0?null:{item:y}})(),c=a===null?"":_de({projectId:e.projectId,item:a.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">Limit reached: ${64} active pitfalls. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${ve(wu(e.projectId,{...IT(e.showRetired),edit:O1}))}">Add pitfall</a>`,u=e.showRetired?`<a class="btn btn-secondary" href="${ve(wu(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${ve(wu(e.projectId,{retired:"1"}))}">Show retired</a>`,m=o.length>0?"No active pitfalls. Turn on Show retired to see retired ones.":"No pitfalls for this project. Add one when you spot a mistake that keeps coming back.",g=i.length===0?`<p class="empty">${m}</p>`:`<ul class="harness-installed-set-list">${i.map(y=>bde({projectId:e.projectId,item:y,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      ${o.length===0?"":`<p class="muted">${n} of ${o.length} active</p>`}
      <div class="actions">${a===null?d:""}${u}</div>
      ${c}
      ${g}
    </section>`},N1=Rde});var Se,H1,kde,wde,Ede,Tde,Cde,Cn,Qh=l(()=>{"use strict";ET();ht();D1();Se=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H1=(e,t)=>e.length===0?`<p class="empty">${Se(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Se(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Se(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in AgentWitch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,kde=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this computer yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,wde=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from AgentWitch Cloud.":"This project\u2019s playbook is linked in AgentWitch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},Ede=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${Se(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
          <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${Se(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the profile harness on this computer \u2014 refresh from AgentWitch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this computer if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},Tde=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?Ede({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?wde({project:e.project,alreadyInRepo:!1}):kde();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
            <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${Se(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${Se(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${Se(c.name)}</strong> <span class="muted mono">(${Se(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${u}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${a}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},Cde=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Se(t)} from recent runs. Review in AgentWitch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Se(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Cn=e=>{let t=e.flashError?`<div class="alert-error">${Se(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Se(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(g,y)=>`<a class="project-tab${e.activeTab===g?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${g}">${Se(y)}</a>`,n=e.composition?.items.filter(g=>g.kind==="workflow")??[],s=e.composition?.items.filter(g=>g.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":{let g=Tde({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}),y=e.harnessExtraHtml?.trim()??"";return y.length===0?g:`${g}${y}`}case"workflows":return H1(n,"No workflows installed for this project yet.");case"agents":return H1(s,"No agents installed for this project yet.");case"knowledge":return Cde({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return N1({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${hn(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,u=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Se(c)}" target="_blank" rel="noopener noreferrer">Open in AgentWitch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Se(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,m=Jh(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from AgentWitch Cloud only. The folder on this computer is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from AgentWitch Cloud? Your repo folder on this computer will stay.');">
          <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${Se(e.project.name)}</h1>
      <p class="muted mono">${Se(e.project.projectFolderPath)}</p>
      ${u}
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(e.project.id)}">Change folder\u2026</a><a class="btn btn-secondary" href="/project/skill-drafts?projectId=${encodeURIComponent(e.project.id)}">Skill drafts</a></div>
      <nav class="project-tabs" aria-label="Project composition">
        ${o("harness",`Playbooks (${r.harness})`)}
        ${o("workflows",`Workflows (${r.workflow})`)}
        ${o("agents",`Agents (${r.agent})`)}
        ${o("knowledge",`Knowledge (${e.knowledgeCandidateCount})`)}
        ${o("pitfalls",a)}
      </nav>
      <div class="project-tab-panel">
        ${i}
      </div>
    </section>${m}`}});var Ide,Lde,F1,$1=l(()=>{"use strict";Tn();At();Ide=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lde=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!Ide(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Xr(n);return s===null?[]:[s]})}catch{return null}},F1=Lde});var z1,LT,U1=l(()=>{"use strict";oe();Tn();Qh();el();$1();Qa();Ja();Rr();fr();z1=e=>({kind:"page",title:e.project.name,body:Cn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:To(e.layout),linkedSetSlugs:rr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),LT=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=B();if(r===null)return{kind:"not_found"};let o=await Zr(r,e.layout),n=kr(o.projects,t);if(n===null)return{kind:"not_found"};let s=J({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??Nt,a=s===null?null:await F1(s,n.id);if(a===null)return z1({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from AgentWitch Cloud."});let c=VE({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return z1({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Io(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var B1,vT,G1=l(()=>{"use strict";oe();Tn();fr();Rr();Qh();pu();Jr();el();Qa();Ja();gh();kE();hh();CE();B1=e=>({kind:"page",title:e.project.name,body:Cn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:To(e.layout),linkedSetSlugs:rr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),vT=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=B();if(n===null)return{kind:"not_found"};let s=await Zr(n,e.layout),i=kr(s.projects,r);if(i===null)return{kind:"not_found"};let a=J({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??Nt;if(o.length===0)return B1({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=He(i.projectFolderPath),u=$t({projectFolderPath:d}),{ledgerFilePath:m}=Va(u.layout),g=Ka(m),y=$E(g);if(!y.includes(o))return B1({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let h=y.filter(f=>f!==o),S=yh({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:g});uu(m,S.ledger);let w=a===null?!1:await Io(a,i.id,h),I=new URLSearchParams({linked:"1",removed:o,files:String(S.summary.removedPaths.length),bindingsSynced:w?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${I.toString()}`}}});var vde,xde,K1,Wde,Ode,Eu,xT=l(()=>{"use strict";ht();At();vde=1e4,xde=15e3,K1=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},Wde=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},Ode=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(K1(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(vde)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=Ok(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(K1(e.appOrigin,r),{method:"PUT",headers:{[ae]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(xde)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:Wde(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Eu=Ode});var WT,V1,jde,Mde,Nde,Dde,q1,J1=l(()=>{"use strict";ht();WT=e=>e.replace(/\s+/g," ").trim(),V1=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=WT(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},jde=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),Mde=(e,t)=>{let r=jde(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,Ne.id).replace(/-+$/g,"")},Nde=e=>e==="block"||e==="info"?e:"warn",Dde=e=>{let{form:t}=e,r=WT(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=WT(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>Ne.symptom||o.length>Ne.avoidance||n.length>Ne.cause||s.length>Ne.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:Mde(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:V1(t.get("keywords")??"",Ne.keywords,Ne.keyword),tags:V1(t.get("tags")??"",Ne.tags,Ne.tag),source:"project",severity:Nde(t.get("severity"))}}},q1=Dde});var X1,Hde,Lo,Y1,eS,Fde,$de,Z1,Q1=l(()=>{"use strict";X1=require("node:crypto");ht();J1();Zh();Hde=()=>(0,X1.randomBytes)(3).toString("hex"),Lo=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},Y1=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),eS=new Map,Fde=async(e,t)=>{let r=eS.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);eS.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),eS.get(e)===s&&eS.delete(e)}},$de=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return Fde(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return Lo(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return Lo(o,"unavailable",s);if(e.action==="save"){let d=q1({form:e.form,randomSuffix:e.randomSuffix??Hde});if(!d.ok)return Lo(o,"invalid",s);let u=i.items.find(y=>y.id===d.pitfall.id);if((u===void 0||u.source==="retired")&&hn(i.items)>=64)return Lo(o,"limit",s);let g=await n.upsertPitfall(o,d.pitfall);return Lo(o,g.ok?"saved":g.reason==="active_limit"?"limit":g.reason,s)}let a=i.items.find(d=>d.id===t);if(a===void 0)return Lo(o,"missing",s);if(e.action==="restore"){if(a.source==="retired"&&hn(i.items)>=64)return Lo(o,"limit",s);let d=await n.upsertPitfall(o,Y1(a,"project"));return Lo(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,Y1(a,"retired"));return Lo(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},Z1=$de});var tS,eB,tB,OT=l(()=>{"use strict";tS=new Map,eB=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=tS.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&tS.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},tB=e=>{if(e===void 0){tS.clear();return}tS.delete(e)}});var jT,rB=l(()=>{"use strict";oe();Rr();el();Qa();xT();Q1();OT();jT=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=B();if(o===null)return{kind:"not_found"};let n=await Zr(o,e.layout),s=kr(n.projects,r);if(s===null)return{kind:"not_found"};let i=J({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),a=e.createStore??Eu,c=i===null?null:a(i),d=await Z1({action:e.action,form:t,projectId:s.id,store:c});return tB(s.id),{kind:"redirect",location:d}}});var zde,MT,oB=l(()=>{"use strict";zde=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,MT=zde});var nB=l(()=>{"use strict"});var sB=l(()=>{"use strict"});var iB=l(()=>{"use strict";nB();sB()});var Ude,In,aB=l(()=>{"use strict";Ude=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],In=(e=process.env)=>{let t={...e};for(let r of Ude)delete t[r];return t}});var lB=l(()=>{"use strict";aB()});var NT,cB=l(()=>{"use strict";NT={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#2150d6",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var DT=l(()=>{"use strict";cB()});var rS,HT=l(()=>{"use strict";rS={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history",PROJECT_HISTORY_PAGE_REQUEST:"project.history.page.request",PROJECT_HISTORY_PAGE_RESULT:"project.history.page.result"}});var oS=l(()=>{"use strict";iB();lB();fr();DT();HT()});var dB,uB,Bde,nS,sS,pB=l(()=>{"use strict";dB=require("node:child_process"),uB=require("node:util");oS();Bde=(0,uB.promisify)(dB.execFile),nS=async(e,t)=>{try{let{stdout:r}=await Bde("git",t,{cwd:e,env:In(),maxBuffer:1048576});return r.trim()}catch{return null}},sS=async e=>{let t=await nS(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await nS(e,["rev-parse","--abbrev-ref","HEAD"]),o=await nS(e,["status","--porcelain"]),n=await nS(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var FT,mB=l(()=>{"use strict";FT=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var Gde,$T,gB=l(()=>{"use strict";Gde=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},$T=Gde});var Kde,Vde,wr,tl=l(()=>{"use strict";St();Kde=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,Vde=e=>An(e).scrubbed.replace(Kde,"[redacted-email]"),wr=Vde});var qde,zT,fB=l(()=>{"use strict";At();tl();qde=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[ae]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:wr(r.lesson)}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},zT=qde});var yB,Ln,hB=l(()=>{"use strict";yB=require("node:child_process"),Ln=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,yB.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var SB=l(()=>{"use strict";el()});var Jde,UT,BT=l(()=>{"use strict";At();Jde=e=>{let t=e?.project;return typeof t?.name=="string"&&t.name.trim().length>0?t.name.trim():null},UT=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[ae]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return{ok:!1,httpStatus:o.status};let n=await o.json().catch(()=>null);return{ok:!0,projectName:Jde(n)}}catch{return{ok:!1,httpStatus:null}}}});var GT,PB=l(()=>{"use strict";At();GT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach AgentWitch Cloud."}}}});var AB,Yde,vo,KT,VT=l(()=>{"use strict";AB=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},Yde=e=>e===""?null:e,vo=e=>e??"",KT=e=>({id:e.id,projectId:Yde(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:AB(e.keywords_json),tags:AB(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var _B,Xde,Zde,qT,rl,iS,Tu=l(()=>{"use strict";VT();_B=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,Xde=e=>e,Zde=e=>e??null,qT=(e,t,r=t)=>Xde(e.prepare(_B).all(vo(r),vo(t))).map(KT),rl=(e,t,r,o=t)=>{let n=Zde(e.prepare(`${_B} AND p.id = ?`).get(vo(o),vo(t),r));return n===null?null:KT(n)},iS=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(vo(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var aS,JT=l(()=>{"use strict";ht();aS=e=>e.map(t=>({id:Rs(t.id),avoidance:Rs(t.avoidance)}))});var lS,bB,cS=l(()=>{"use strict";lS=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},bB=e=>e.filter(t=>t.source!=="retired").length});var qs,RB,Cu=l(()=>{"use strict";ht();JT();Tu();cS();qs=(e,t={})=>{let r=t.projectId??null,o=qT(e,null,r),n=r===null||r===""?[]:qT(e,r);return lS({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},RB=(e,t={})=>{let r=qs(e,t);return t.format==="bot"?{format:"bot",items:aS(r),lines:r.map(o=>Sd(o))}:{format:"full",items:r}}});var dS,YT=l(()=>{"use strict";Tu();Cu();dS=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?rl(e,null,r):qs(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var XT=l(()=>{"use strict"});var vn,ol,kB,wB,EB=l(()=>{"use strict";vn=e=>({type:"string",description:e}),ol={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:vn("Absolute working directory for the current session."),message:vn("User prompt or task text to match."),sessionId:vn("Optional session id for first-message tracking."),projectId:vn("Optional project id when already known.")},additionalProperties:!1}},kB={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:vn("Absolute working directory."),projectId:vn("Optional project id when already known.")},additionalProperties:!1}},wB={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:vn("Project id."),q:vn("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Js,TB,CB,IB=l(()=>{"use strict";Js=e=>({type:"string",description:e}),TB={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Js("Project id."),skillId:Js("Skill id when known."),q:Js("Optional search text.")},required:["projectId"],additionalProperties:!1}},CB={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Js("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Js("Pitfall id when kind is pitfall."),preflightId:Js("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Js("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var LB=l(()=>{"use strict";EB();IB()});var Lu,vB=l(()=>{"use strict";ht();XT();Lu=e=>{let t=yy("AgentWitch tip \xB7 check_context",120);if(hr(t)>=120)return t;let r=[t],o=hr(t);for(let n of e){if(r.length-1>=4)break;let s=Sd(n),i=hr(s);if(o+i>120){if(r.length===1){let a=120-o,c=yy(s,a);c.length>0&&(r.push(c),o+=hr(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var xB=l(()=>{"use strict";ht()});var vu=l(()=>{"use strict";XT();LB();vB();xB()});var Qde,eue,nl,ZT=l(()=>{"use strict";vu();Qde=e=>e.toLowerCase(),eue=(e,t)=>{let r=Qde(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},nl=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:eue(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var WB,OB=l(()=>{"use strict";Cu();ZT();WB=(e,t)=>{let r=qs(e,{projectId:t.projectId,includeRetired:!1});return nl({pitfalls:r,text:t.text})}});var tue,rue,oue,nue,jB,zt,MB,pS,QT=l(()=>{"use strict";tue="22.13",rue=e=>typeof e=="object"&&e!==null&&typeof e.DatabaseSync=="function",oue=e=>{let t={ok:!1,reason:`Node ${e.nodeVersion} has no node:sqlite (needs Node ${tue}+)`};if(e.getBuiltinModule===null)return t;try{let r=e.getBuiltinModule("node:sqlite");return rue(r)?{ok:!0,sqlite:r}:t}catch{return t}},nue=()=>typeof process.getBuiltinModule=="function"?e=>process.getBuiltinModule(e):null,jB=new Map,zt=()=>{let e=jB.get("process");if(e!==void 0)return e;let t=oue({getBuiltinModule:nue(),nodeVersion:process.version});return jB.set("process",t),t},MB=()=>{let e=zt();if(!e.ok)throw new Error(`Pitfall cache unavailable: ${e.reason}`);return e.sqlite},pS=()=>{let e=zt();return e.ok?null:`[agent-witch] Pitfall cache (check_context) is off: ${e.reason}. Everything else runs.`}});var NB,xu=l(()=>{"use strict";Ry();NB=3e3});var DB,HB=l(()=>{"use strict";xu();DB=`
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
`});var FB,$B,sue,iue,zB,UB,BB=l(()=>{"use strict";FB=p(require("node:fs")),$B=p(require("node:path"));QT();xu();HB();sue=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},iue=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},zB=e=>{FB.default.mkdirSync($B.default.dirname(e),{recursive:!0});let{DatabaseSync:t}=MB(),r=new t(e);return r.exec(`PRAGMA busy_timeout = ${NB}`),r.exec(DB),sue(r)<bd&&iue(r,bd),r},UB=e=>{e.close()}});var GB,KB,eC=l(()=>{"use strict";VT();GB=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(vo(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},KB=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(vo(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var VB,qB=l(()=>{"use strict";YT();eC();VB=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:dS(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=GB(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var tC,mS,rC=l(()=>{"use strict";tC=p(require("node:path"));Ge();mS=(e,t)=>e.profileEmail!==null?tC.default.join(e.installDir,yt,e.profileEmail,t):tC.default.join(e.installDir,t)});var sl,oC=l(()=>{"use strict";xu();rC();sl=e=>mS(e,Dk)});var YB,JB=l(()=>{YB=[{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]}]});var lue,cue,gS,nC=l(()=>{"use strict";JB();lue=YB,cue=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),gS=()=>lue.map(cue)});var XB,ZB,QB=l(()=>{"use strict";ht();XB="id, symptom, cause, avoidance, check_kind, check_value, keywords_json, tags_json",ZB=(e,t)=>{let r=t.map(()=>"?").join(", "),o=`project_id = '' AND source = 'seed'${t.length>0?` AND id NOT IN (${r})`:""}`,n=vk;e.prepare(`INSERT INTO pitfalls (project_id, ${XB}, source, severity)
     SELECT ?, ${XB}, 'project', severity
     FROM pitfalls
     WHERE ${o}
       AND (EXISTS (SELECT 1 FROM pitfalls WHERE project_id = ?)
         OR EXISTS (SELECT 1 FROM pitfall_hits WHERE project_id = ?))
     ON CONFLICT(project_id, id) DO NOTHING`).run(n,...t,n,n);let s=e.prepare(`DELETE FROM pitfalls WHERE ${o}`).run(...t);return Number(s.changes)}});var eG,tG=l(()=>{"use strict";nC();Tu();QB();eG=e=>{let t=gS();return ZB(e,t.map(r=>r.id)),t.reduce((r,o)=>rl(e,null,o.id)!==null?r:(iS(e,o),r+1),0)}});var rG,oG,nG=l(()=>{"use strict";xu();rG=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>Ay?{kind:"field_too_long",field:"symptom",max:Ay}:e.cause.length>_y?{kind:"field_too_long",field:"cause",max:_y}:e.avoidance.length>by?{kind:"field_too_long",field:"avoidance",max:by}:null,oG=e=>e.activeCountAfter>Ra?{kind:"active_cap",max:Ra}:null});var sG,iG=l(()=>{"use strict";Tu();eC();Cu();cS();nG();sG=(e,t)=>{let r=rG(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=rl(e,t.projectId,o),s=KB(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=qs(e,{projectId:t.projectId,includeRetired:!0}).filter(g=>g.id!==a.id),u=bB([...d,a]),m=oG({activeCountAfter:u});return m!==null?{ok:!1,error:m}:(iS(e,a),{ok:!0,pitfall:a})}});var Ys,sC=l(()=>{"use strict";YT();Cu();OB();BB();qB();oC();tG();iG();Ys=e=>{let t=e.dbPath??(e.layout!==void 0?sl(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=zB(t);return eG(r),{dbPath:t,listPitfalls:o=>RB(r,o),getPitfall:o=>dS(r,o),upsertPitfall:o=>sG(r,o),recordHit:o=>VB(r,o),matchPitfalls:o=>WB(r,o),close:()=>UB(r)}}});var due,uue,fS,iC=l(()=>{"use strict";vu();JT();due=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},uue=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},fS=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=due(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};uue(e,e.registry,n,s);let i=aS(s);return{status:"hit",projectId:n,pitfalls:i,tip:Lu(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var yS,aG=l(()=>{"use strict";vu();yS={name:ol.name,description:ol.description,inputSchema:ol.inputSchema}});var xo,lG,cG,Wo,pue,il,dG,Wu=l(()=>{"use strict";xo=p(require("node:fs")),lG=p(require("node:os")),cG=p(require("node:path")),Wo=()=>({readUtf8:e=>xo.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{xo.default.writeFileSync(e,t,"utf8")},exists:e=>xo.default.existsSync(e),mkdirp:e=>{xo.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{xo.default.renameSync(e,t)},realpath:e=>xo.default.realpathSync.native(e)}),pue=()=>({homedir:()=>lG.default.homedir()}),il=()=>({...Wo(),...pue()}),dG=e=>({...Wo(),homedir:()=>e,realpath:r=>{let o=cG.default.resolve(r);return xo.default.existsSync(o)?xo.default.realpathSync.native(o):o}})});var hS,uG=l(()=>{"use strict";hS=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var aC,pG=l(()=>{"use strict";rC();Sr();aC=e=>mS(e,A$)});var mG,nt,Oo=l(()=>{"use strict";mG=p(require("node:path")),nt=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(mG.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var SS,mue,Ou,gG,PS,AS,al,_S=l(()=>{"use strict";Wu();uG();pG();Oo();SS=()=>({byRealpath:{}}),mue=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return SS();let r=t.byRealpath;return typeof r!="object"||r===null?SS():{byRealpath:r}}catch{return SS()}},Ou=(e,t=Wo())=>{let r=aC(e);return t.exists(r)?mue(t.readUtf8(r)):SS()},gG=(e,t,r)=>{nt({fs:r,filePath:aC(e),contents:`${JSON.stringify(t,null,2)}
`})},PS=e=>{let t=e.fs??Wo(),r=hS(e.cwd,t),o={declinedAt:e.nowIso??new Date().toISOString(),cwd:e.cwd},n=Ou(e.layout,t);return gG(e.layout,{byRealpath:{...n.byRealpath,[r]:o}},t),o},AS=e=>{let t=e.fs??Wo(),r=hS(e.cwd,t),o=Ou(e.layout,t);if(o.byRealpath[r]===void 0)return!1;let n=Object.fromEntries(Object.entries(o.byRealpath).filter(([s])=>s!==r));return gG(e.layout,{byRealpath:n},t),!0},al=e=>{let t=e.fs??Wo(),r=hS(e.cwd,t);return Ou(e.layout,t).byRealpath[r]!==void 0}});var xn,bS,lC=l(()=>{"use strict";xn=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},bS=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...xn(t,"cwd")!==void 0?{cwd:xn(t,"cwd")}:{},...xn(t,"message")!==void 0?{message:xn(t,"message")}:{},...xn(t,"sessionId")!==void 0?{sessionId:xn(t,"sessionId")}:{},...xn(t,"projectId")!==void 0?{projectId:xn(t,"projectId")}:{}}}});var Wn,RS=l(()=>{"use strict";_t();iC();sC();_S();lC();Wn=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>al({layout:e.layout,cwd:o}));return o=>{let n=bS(o),s=null;try{return s=Ys({layout:e.layout}),fS({registry:s,resolveProjectId:wT,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var fG,yG=l(()=>{"use strict";fG=["AgentWitch \xB7 check_context: this folder is not an AgentWitch project yet.","Ask the user once whether to add it in AgentWitch Local (Projects) so saved pitfalls show up here.","If they decline or ignore it, do not ask again this session."].join(`
`)});var gue,cC,fue,yue,hue,kS,dC=l(()=>{"use strict";yG();gue="UserPromptSubmit",cC=(e,t)=>{let r=e[t];return typeof r=="string"&&r.trim().length>0?r:void 0},fue=e=>{let t;try{t=JSON.parse(e)}catch{return null}if(typeof t!="object"||t===null||Array.isArray(t))return null;let r=t,o=cC(r,"cwd"),n=cC(r,"prompt"),s=cC(r,"session_id");return{...o!==void 0?{cwd:o}:{},...n!==void 0?{message:n}:{},...s!==void 0?{sessionId:s}:{}}},yue=e=>{if(e.status==="hit"){let t=e.tip?.trim()??"";return t.length>0?t:null}return e.status==="none"&&e.promptCreate===!0?fG:null},hue=e=>`${JSON.stringify({hookSpecificOutput:{hookEventName:gue,additionalContext:e}})}
`,kS=async e=>{try{let t=fue(await e.readStdin());if(t===null)return e.writeStderr(`[agent-witch] mcp-hook: stdin is not a JSON object
`),0;let r=yue(await e.runCheckContext(t));r!==null&&e.writeStdout(hue(r))}catch(t){let r=t instanceof Error?t.message:String(t);try{e.writeStderr(`[agent-witch] mcp-hook: ${r}
`)}catch{}}return 0}});var Sue,Pue,hG,SG=l(()=>{"use strict";RS();dC();Sue=1500,Pue=(e,t)=>new Promise(r=>{let o=[],n=!1,s=()=>{n||(n=!0,clearTimeout(i),e.removeAllListeners("data"),e.removeAllListeners("end"),e.removeAllListeners("error"),e.pause(),r(Buffer.concat(o).toString("utf8")))},i=setTimeout(s,t);e.on("data",a=>{o.push(Buffer.isBuffer(a)?a:Buffer.from(a,"utf8"))}),e.on("end",s),e.on("error",s)}),hG=async e=>{let t=r=>{process.stderr.write(r)};return kS({readStdin:()=>Pue(process.stdin,Sue),writeStdout:r=>{process.stdout.write(r)},writeStderr:t,runCheckContext:Wn({layout:e.layout,logError:r=>{let o=r instanceof Error?r.message:String(r);t(`[agent-witch] mcp-hook check_context: ${o}
`)}})})}});var Aue,wS,PG=l(()=>{"use strict";RS();lC();Aue="/api/local/check-context",wS=async e=>{if(e.pathname!==Aue)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=Wn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(bS(t))),!0}});var AG,ES,_ue,bue,_G,bG=l(()=>{"use strict";AG=p(require("node:path"));Sr();Oo();ES=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_ue={hooks:[{type:"command",command:Nk,timeout:3,[ks]:!0}]},bue=e=>Array.isArray(e)&&e.some(t=>ES(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>ES(r)&&(r.command===Nk||r[ks]===!0))),_G=e=>{let t=AG.default.join(e.io.homedir(),P$),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));ES(a)&&(r={...a})}catch{r={}}let o=ES(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(bue(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(_ue),o.UserPromptSubmit=s;let{backupPath:i}=nt({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var ll,TS=l(()=>{"use strict";Sr();ll=e=>{let t=e.begin??Pa,r=e.end??Aa,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let u=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:u,changed:u!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var RG,Rue,kG,wG=l(()=>{"use strict";RG=p(require("node:path"));TS();Sr();Oo();Rue=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),kG=e=>{let t=RG.default.join(e.io.homedir(),S$),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=ll({existing:r,blockBody:Rue,begin:Pa,end:Aa});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=nt({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var EG,TG,CG=l(()=>{"use strict";EG=p(require("node:path"));TS();Sr();Oo();TG=e=>{let t=EG.default.join(e.io.homedir(),h$),r=Sy.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${Ad}]`,`command = "${_d}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=ll({existing:n,blockBody:o,begin:Pa,end:Aa});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=nt({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var IG,uC,LG,vG=l(()=>{"use strict";IG=p(require("node:path"));Sr();Oo();uC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),LG=e=>{let t=IG.default.join(e.io.homedir(),y$),r={command:_d,args:[...Sy]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));uC(d)&&(o={...d})}catch{o={}}let n=uC(o.mcpServers)?{...o.mcpServers}:{},s=n[Ad];if(uC(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[Ad]=r;let a={...o,mcpServers:n},{backupPath:c}=nt({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var cl,pC=l(()=>{"use strict";Wu();bG();wG();CG();vG();cl=e=>{let t=e?.io??il();return{ok:!0,cursorMcp:LG({io:t}),codexConfig:TG({io:t}),codexAgents:kG({io:t}),claudeHook:_G({io:t})}}});var xG,WG=l(()=>{"use strict";Sr();xG=e=>{let t=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with this folder's cwd.",`projectId: ${e}`,"If status is miss or none (already declined), stay silent.","If status is hit, follow the tip. Do not dump large context."].join(`
`);return["---","description: AgentWitch check_context (token-saver)","alwaysApply: true","---","",_a,t,Pd,""].join(`
`)}});var OG,kue,jG,MG=l(()=>{"use strict";OG=p(require("node:path"));WG();Sr();TS();Oo();kue=e=>e.slice(e.indexOf(_a)+_a.length,e.indexOf(Pd)).trim(),jG=e=>{let t=OG.default.join(e.projectRoot,hy),r=xG(e.projectId);if(!e.fs.exists(t))return nt({fs:e.fs,filePath:t,contents:r}),{ok:!0,path:t,wrote:!0};let{next:o,changed:n}=ll({existing:e.fs.readUtf8(t),blockBody:kue(r),begin:_a,end:Pd});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=nt({fs:e.fs,filePath:t,contents:o,backup:!0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var gC,mC,NG,DG=l(()=>{"use strict";gC=p(require("node:path"));Oo();mC="# agent-witch-token-saver (local; never commit)",NG=e=>{let t=gC.default.join(e.repoRoot,".git");if(!e.fs.exists(t))return{ok:!1,reason:"not a git working tree"};let r=gC.default.join(t,"info","exclude"),o=e.fs.exists(r)?e.fs.readUtf8(r):"",n=o.length>0?o.split(/\r?\n/):[],s=new Set(n.map(c=>c.trim())),i=e.relativePaths.filter(c=>!s.has(c));if(i.length===0&&s.has(mC))return{ok:!0,path:r,wrote:!1};let a=[...n];for(;a.length>0&&a[a.length-1]==="";)a.pop();s.has(mC)||a.push("",mC);for(let c of i)a.push(c);return a.push(""),nt({fs:e.fs,filePath:r,contents:a.join(`
`)}),{ok:!0,path:r,wrote:i.length>0}}});var CS,fC=l(()=>{"use strict";Sr();MG();DG();CS=e=>{let t=jG({fs:e.fs,projectRoot:e.projectRoot,projectId:e.projectId}),r=NG({fs:e.fs,repoRoot:e.projectRoot,relativePaths:[hy]});return{ok:!0,cursorRule:t,gitExclude:r}}});var yC,hC,IS,SC,PC=l(()=>{"use strict";yC=["pitfalls","preflight","localMcp","history","ollama","skillGen"],hC=["on","off","degraded","unavailable"],IS={pitfalls:"on",preflight:"on",localMcp:"on",history:"off",ollama:"off",skillGen:"off"},SC=()=>({...IS})});var wue,Eue,AC,HG=l(()=>{"use strict";PC();wue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Eue=e=>hC.find(t=>t===e)??null,AC=e=>{if(!wue(e))return null;let t={...IS};for(let r of yC){let o=Eue(e[r]);o!==null&&(t[r]=o)}return t}});var FG=l(()=>{"use strict";PC();HG()});var $G,Tue,Cue,zG,UG=l(()=>{"use strict";$G=p(require("node:path"));_t();FG();Oo();Tue="token-saver.json",Cue=(e,t)=>{if(!e.exists(t))return null;try{return AC(JSON.parse(e.readUtf8(t)))}catch{return null}},zG=e=>{let t=$G.default.join(e.projectRoot,dd,Tue),r=e.flags??{...SC(),...Cue(e.fs,t)},o=`${JSON.stringify(r,null,2)}
`;return e.fs.exists(t)&&e.fs.readUtf8(t)===o?{ok:!0,path:t,wrote:!1}:(nt({fs:e.fs,filePath:t,contents:o}),{ok:!0,path:t,wrote:!0})}});var jo,Qr,LS,_C=l(()=>{"use strict";jo=(e,t)=>{if(t==="remove")return{ok:!0,state:"Connected"};switch(e){case"Unconnected":return t==="connect"?{ok:!0,state:"SigningIn"}:Qr(e,t);case"SigningIn":return t==="signInComplete"?{ok:!0,state:"Connected"}:Qr(e,t);case"Connected":return t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Qr(e,t);case"GlobalTriggersWritten":return t==="decline"?{ok:!0,state:"Declined"}:t==="accept"?{ok:!0,state:"ProjectResolved"}:t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Qr(e,t);case"Declined":return t==="clearDecline"?{ok:!0,state:"GlobalTriggersWritten"}:Qr(e,t);case"ProjectResolved":return t==="applyDefaults"?{ok:!0,state:"DefaultsApplied"}:Qr(e,t);case"DefaultsApplied":return t==="writeProjectFragments"?{ok:!0,state:"ProjectFragmentsWritten"}:Qr(e,t);case"ProjectFragmentsWritten":return t==="verify"?{ok:!0,state:"Verified"}:Qr(e,t);case"Verified":return t==="accept"||t==="writeProjectFragments"?{ok:!0,state:e}:Qr(e,t);default:return Qr(e,t)}},Qr=(e,t)=>({ok:!1,reason:`Illegal transition ${e} + ${t}`,state:e}),LS=e=>e==="Declined"});var Iue,Lue,BG,GG=l(()=>{"use strict";UG();Wu();_S();_C();pC();fC();Iue="projectId required on accept",Lue=e=>{let t=e.projectId;if(e.resolveProject!==void 0)try{t=e.resolveProject(e.cwd).projectId}catch(o){return{ok:!1,reason:`project resolve failed: ${o instanceof Error?o.message:String(o)}`}}let r=t?.trim()??"";return r.length>0?{ok:!0,projectId:r}:{ok:!1,reason:Iue}},BG=e=>{let t=e.fs??Wo(),r=e.io??il(),o=e.fromState??"GlobalTriggersWritten";if(!e.accept){let d=jo(o,"decline");return d.ok?(PS({layout:e.layout,cwd:e.cwd,fs:t}),{ok:!0,state:"Declined"}):{ok:!1,state:d.state,reason:d.reason}}let n=LS(o)||al({layout:e.layout,cwd:e.cwd,fs:t});n&&(o="Declined");let s=Lue(e);if(!s.ok)return{ok:!1,state:o,reason:s.reason};if(n){let d=jo(o,"clearDecline");if(!d.ok)return{ok:!1,state:d.state,reason:d.reason};AS({layout:e.layout,cwd:e.cwd,fs:t}),o=d.state}cl({io:r}),o=jo(o,"writeGlobalTriggers").ok?"GlobalTriggersWritten":o;let i=jo(o,"accept");if(!i.ok)return{ok:!1,state:i.state,reason:i.reason};o=i.state;let a=jo(o,"applyDefaults");if(!a.ok)return{ok:!1,state:a.state,reason:a.reason};zG({fs:t,projectRoot:e.cwd}),o=a.state;let c=jo(o,"writeProjectFragments");return c.ok?(CS({fs:t,projectRoot:e.cwd,projectId:s.projectId}),{ok:!0,state:c.state,projectId:s.projectId}):{ok:!1,state:c.state,reason:c.reason}}});var KG={};Mt(KG,{AWL_CHECK_CONTEXT_TOOL:()=>yS,checkContext:()=>fS,clearProjectDecline:()=>AS,createCheckContextRunner:()=>Wn,createNodeCliIo:()=>il,createPitfallRegistry:()=>Ys,createTempCliIo:()=>dG,declineProjectForCwd:()=>PS,describePitfallCacheAvailability:()=>pS,isDeclinedCwd:()=>al,isDeclinedTerminal:()=>LS,listBundledSeedPitfalls:()=>gS,loadNodeSqlite:()=>zt,matchPitfallsByKeywords:()=>nl,readDeclinedProjectsStore:()=>Ou,resolveTokenSaverDbPath:()=>sl,runCheckContextHook:()=>kS,runCheckContextHookCli:()=>hG,runSetupProject:()=>BG,shadowPitfalls:()=>lS,transitionSetupProject:()=>jo,tryHandleTokenSaverLocalRequest:()=>wS,writeGlobalTriggers:()=>cl,writeProjectFragments:()=>CS});var eo=l(()=>{"use strict";sC();QT();oC();ZT();cS();nC();iC();aG();RS();dC();SG();PG();pC();fC();GG();_S();_C();Wu()});var bC,VG=l(()=>{"use strict";bC=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var qG,JG,vue,xue,Wue,vS,RC=l(()=>{"use strict";eo();Ry();VG();qG=e=>{try{return e.dbPath!==void 0?Ys({dbPath:e.dbPath}):e.layout!==void 0?(sl(e.layout),Ys({layout:e.layout})):null}catch{return null}},JG=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},vue=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},xue=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},Wue=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=qG(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(vue(n,r,i.items),{ok:!0,items:JG(n,r,o.includeRetired).map(bC),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:JG(n,r,o.includeRetired).map(bC),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=qG(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:xue(s.error)}finally{n.close()}}}},vS=Wue});var dl,Xs,xS=l(()=>{"use strict";dl=p(require("node:path")),Xs=(e,t)=>{if(!dl.default.isAbsolute(e)||!dl.default.isAbsolute(t))return!1;let r=dl.default.relative(t,e);return r.length===0?!0:r!==".."&&!r.startsWith(`..${dl.default.sep}`)&&!dl.default.isAbsolute(r)}});var WS,YG,XG=l(()=>{"use strict";St();xS();WS=e=>({ok:!1,code:e}),YG=e=>{let t=e.requestedLexicalPath;if(t===null)return WS(pe.FOLDER_REQUIRED);if(e.roots===null)return WS(pe.FOLDER_CHECK_UNAVAILABLE);let r=e.requestedRealPath;if(r===null){let n=e.roots.some(s=>Xs(t,s.lexicalPath));return WS(n?pe.FOLDER_NOT_FOUND:pe.FOLDER_NOT_REGISTERED)}return e.roots.some(n=>n.realPath!==null&&Xs(r,n.realPath))?{ok:!0,folderRealPath:r}:WS(pe.FOLDER_NOT_REGISTERED)}});var EC,ZG,kC,wC,Oue,TC,QG=l(()=>{"use strict";EC=p(require("node:fs")),ZG=p(require("node:path"));Jr();XG();xS();kC=e=>ZG.default.resolve(He(e)),wC=e=>{try{return EC.default.realpathSync.native(e)}catch{return null}},Oue=e=>{let t=e.projectId?.trim()??"";if(t.length>0)return e.registeredFolders===null?null:e.registeredFolders.filter(o=>o.projectId===t).map(o=>o.folderPath);let r=(e.registeredFolders??[]).map(o=>o.folderPath);return[e.defaultFolderPath,...r]},TC=e=>{let t=Oue(e)?.map(kC)??null,r=e.requestedFolderPath?.trim()??"",o=r.length>0?kC(r):null;return o!==null&&wC(o)===null&&Xs(o,kC(e.managedProjectsDir))&&(t??[]).includes(o)&&EC.default.mkdirSync(o,{recursive:!0}),YG({requestedLexicalPath:o,requestedRealPath:o===null?null:wC(o),roots:t?.map(n=>({lexicalPath:n,realPath:wC(n)}))??null})}});var e2,CC,t2=l(()=>{"use strict";Rr();e2=new Map,CC=async(e,t=Ks)=>{let r=J(e);if(r===null)return null;let o=await t(r);if(o===null)return e2.get(r.pairingToken)??null;let n=o.map(s=>({projectId:s.id,folderPath:s.folderPath}));return e2.set(r.pairingToken,n),n}});var ju,r2,jue,o2,Mue,IC,n2,LC=l(()=>{"use strict";ju=p(require("node:fs")),r2=p(require("node:path")),jue="linked-project-folders.json",o2=e=>r2.default.join(e,jue),Mue=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.projectId=="string"&&typeof t.folderPath=="string"&&typeof t.linkedAt=="string"&&typeof t.isGitRepo=="boolean"&&(t.projectName===null||typeof t.projectName=="string")},IC=e=>{try{let r=JSON.parse(ju.default.readFileSync(o2(e),"utf8"))?.folders;return Array.isArray(r)?r.filter(Mue):[]}catch{return[]}},n2=(e,t)=>{let r=[...IC(e).filter(s=>s.projectId!==t.projectId),t],o=o2(e),n=`${o}.${process.pid}.tmp`;ju.default.mkdirSync(e,{recursive:!0}),ju.default.writeFileSync(n,`${JSON.stringify({version:1,folders:r},null,2)}
`,{mode:384}),ju.default.renameSync(n,o)}});var vC,s2,xC,Nue,Due,Mo,WC=l(()=>{"use strict";vC=p(require("node:fs")),s2=p(require("node:os")),xC=p(require("node:path"));LC();Nue=(e,t)=>e===t||e.startsWith(`${t}${xC.default.sep}`)?`~${e.slice(t.length)}`:e,Due=e=>{try{return vC.default.statSync(e).isDirectory()}catch{return!1}},Mo=(e,t=s2.default.homedir())=>{let r=IC(e).map(n=>{let s=Due(n.folderPath),i=s&&vC.default.existsSync(xC.default.join(n.folderPath,".git")),a=n.projectName??`Project ${n.projectId.slice(0,8)}`,c=Nue(n.folderPath,t),d=s?`${a} uses ${c}${i?" (git repo)":" (not a git repo)"}.`:`${a}: linked folder ${c} is missing on this computer.`;return{projectId:n.projectId,projectName:n.projectName,folderPath:n.folderPath,linkedAt:n.linkedAt,folderFound:s,isGitRepo:i,summary:d}});return{summary:r.length===0?"No project folder linked on this computer yet.":r.map(n=>n.summary).join(" "),folders:r}}});var Qs,a2,OS,Hue,Zs,i2,l2,c2=l(()=>{"use strict";Qs=p(require("node:fs")),a2=p(require("node:os")),OS=p(require("node:path"));Jr();xS();Hue={folder_required:"Choose a folder to link.",folder_not_absolute:"Use a full folder path, like ~/daily-magic.",folder_not_found:"That folder does not exist on this computer.",not_a_folder:"That path is a file, not a folder.",folder_not_readable:"AgentWitch cannot read that folder.",folder_is_home:"Your whole home folder is too broad. Pick the project folder inside it.",folder_outside_home:"That folder is outside your home folder. Pick one inside your home folder, or confirm it explicitly."},Zs=e=>({ok:!1,code:e,message:Hue[e]}),i2=e=>{try{return Qs.default.realpathSync.native(e)}catch{return null}},l2=e=>{let t=e.folderPath.trim();if(t.length===0||t.includes("\0"))return Zs("folder_required");let r=He(t);if(!OS.default.isAbsolute(r))return Zs("folder_not_absolute");let o=i2(OS.default.resolve(r));if(o===null)return Zs("folder_not_found");if(!Qs.default.statSync(o).isDirectory())return Zs("not_a_folder");try{Qs.default.accessSync(o,Qs.default.constants.R_OK|Qs.default.constants.X_OK)}catch{return Zs("folder_not_readable")}let n=i2(e.homeDir??a2.default.homedir());return n!==null&&o===n?Zs("folder_is_home"):!(n!==null&&Xs(o,n))&&e.allowOutsideHome!==!0?Zs("folder_outside_home"):{ok:!0,folderRealPath:o,isGitRepo:Qs.default.existsSync(OS.default.join(o,".git"))}}});var Fue,No,d2=l(()=>{"use strict";Rr();pu();Ja();BT();WC();LC();c2();Fue=/^[A-Za-z0-9_-]{1,128}$/,No=async e=>{let t=e.projectId.trim();if(!Fue.test(t))return{ok:!1,httpStatus:400,code:"project_id_invalid",message:"Pick an AgentWitch project first."};let r=l2({folderPath:e.folderPath,...e.allowOutsideHome!==void 0?{allowOutsideHome:e.allowOutsideHome}:{},...e.homeDir!==void 0?{homeDir:e.homeDir}:{}});if(!r.ok)return{ok:!1,httpStatus:400,code:r.code,message:r.message};if(e.cloudConfig===null)return{ok:!1,httpStatus:409,code:"not_paired",message:"Connect this computer to AgentWitch first."};let n=await(e.updateCloudFolder??UT)(e.cloudConfig,t,r.folderRealPath);if(!n.ok)return{ok:!1,httpStatus:502,code:"cloud_update_failed",message:n.httpStatus===404?"AgentWitch could not find that project for your account.":"Could not save the folder to AgentWitch. Try again."};$t({projectFolderPath:r.folderRealPath,projectId:t,...n.projectName!==null?{projectName:n.projectName}:{}}),n2(e.profileDir,{projectId:t,projectName:n.projectName,folderPath:r.folderRealPath,isGitRepo:r.isGitRepo,linkedAt:(e.now?.()??new Date).toISOString()});let s=rr(r.folderRealPath),a=await(e.syncHarnessBindings??Io)(e.cloudConfig,t,s),c=Mo(e.profileDir,e.homeDir),d=c.folders.find(u=>u.projectId===t)?.summary??c.summary;return{ok:!0,projectId:t,projectName:n.projectName,folderPath:r.folderRealPath,isGitRepo:r.isGitRepo,linkedSetSlugs:s,bindingsSynced:a,summary:d}}});var _t=l(()=>{"use strict";el();Qa();x1();Jr();pu();W1();yn();U1();G1();rB();Zh();Ja();oB();pB();mB();gB();fB();hB();SB();BT();PB();AT();ST();Rr();RC();QG();t2();d2();WC()});var jS,Mu,u2,OC,ei,jC=l(()=>{"use strict";jS=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Mu=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=jS(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},u2=e=>e>=1&&e<=5,OC=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return jS(t,"UTC")},ei=e=>{let t=e.from??new Date,r=jS(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Mu(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Mu(r,e.timeZone,o,0),s=jS(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Mu(OC(r),e.timeZone,o,0):n;if(!i&&u2(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=OC(a),u2(a.weekday))return Mu(a,e.timeZone,o,0);return Mu(OC(r),e.timeZone,o,0)}});var p2,MC,Do,NC=l(()=>{"use strict";p2=require("node:crypto");oe();_t();jC();Vh();MC=!1,Do=async e=>{if(MC)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=B();if(t===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let r=J({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let o=Kh(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this computer."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};MC=!0;let n=(0,p2.randomUUID)();try{let s=await Ua(t,"claude-cli",o.prompt);await yT(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=ei({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Gh(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{MC=!1}}});var MS,m2=l(()=>{"use strict";oe();NC();Vh();MS=async()=>{let e=B();if(e===null)return;let t=br(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Do(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Nu=l(()=>{"use strict";Vh();m2();NC();jC()});var g2=l(()=>{"use strict";Nu()});var f2=l(()=>{"use strict";dT()});var y2=l(()=>{"use strict";f2()});var DC=l(()=>{"use strict";Nu()});var $ue,zue,Du,HC=l(()=>{"use strict";g2();y2();DC();dt();$ue=e=>e!==void 0&&e.trim().length>0?z(e.trim()):z(),zue=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??ei({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??ei({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Du=e=>{let t=$ue(e.profileEmail),r=br(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Za(s);return i!==null?[zue(i,o.get(i.id))]:[]});return Bh(t,n),{ok:!0,writtenCount:n.length}}});var FC=l(()=>{"use strict";Nu()});var h2=l(()=>{"use strict";oe()});var S2=l(()=>{"use strict";HC();FC();DC();h2()});var P2,Hu,Fu,$u,A2=l(()=>{"use strict";P2=p(require("node:os"));S2();_u();Xa();Hu=e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Bs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Du({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Fu=async e=>{if(!_r(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Bs(t)?Do(r):{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."}},$u=()=>{let e=B(),t=e!==null?br(e.layout):{version:1,automations:[]};return{ok:!0,hostname:P2.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var $C=l(()=>{"use strict";A2()});var NS=l(()=>{"use strict";Ae()});var DS=l(()=>{"use strict";Ae()});var HS,b2,R2,_2,Uue,Bue,ul,zC=l(()=>{"use strict";HS=p(require("node:fs")),b2=p(require("node:os")),R2=p(require("node:path"));NS();DS();iu();dt();_2=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},Uue=e=>R2.default.join(b2.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Bue=async e=>HS.default.existsSync(Uue(e))?(await ct(e)).ok:!1,ul=async(e=x())=>{let t=HS.default.existsSync(dh(e)),r=!HS.default.existsSync(Jt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=su(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await _2(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Le(e)}-wake`;await Bue(i)&&s.push(i);for(let c of ke(e))(await ct(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await _2(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var k2=l(()=>{"use strict";Ae()});var UC=l(()=>{"use strict";xs();Ae()});var BC=l(()=>{"use strict";xs()});var GC=l(()=>{"use strict";Ae()});var w2,E2,zu,ti=l(()=>{"use strict";w2="local-port-range.json",E2="local-app-port.json",zu="Ports for this account are in use."});var T2,C2,KC=l(()=>{"use strict";ti();T2=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return!1;let t=e,r=t.start,o=t.end;return!(typeof r!="number"||typeof o!="number"||!Number.isInteger(r)||!Number.isInteger(o)||r<49152||o>65535||o-r+1!==16||r>o)},C2=e=>typeof e=="number"&&Number.isInteger(e)&&e>=49152&&e<=65535});var ri,VC,v2,Uu,I2,Gue,Kue,L2,qC,$S=l(()=>{"use strict";ri=p(require("node:fs")),VC=p(require("node:path"));ti();KC();v2=e=>VC.default.join(e,w2),Uu=e=>{let t=v2(e);if(!ri.default.existsSync(t))return null;try{let r=JSON.parse(ri.default.readFileSync(t,"utf8"));if(T2(r))return r}catch{return null}return null},I2=(e,t)=>{ri.default.mkdirSync(e,{recursive:!0});let r=v2(e);ri.default.writeFileSync(r,`${JSON.stringify({start:t.start,end:t.end},null,2)}
`,"utf8")},Gue=e=>{let t=new Set;if(!ri.default.existsSync(e))return t;let r=[];try{r=ri.default.readdirSync(e)}catch{return t}for(let o of r){let n=Uu(VC.default.join(e,o));n!==null&&t.add(n.start)}return t},Kue=()=>Math.floor(16384/16),L2=e=>{let t=49152+e*16;return{start:t,end:t+16-1}},qC=e=>{let t=Uu(e.profileDir);if(t!==null)return t;let r=Gue(e.profilesDir),o=Kue(),n=e.random??Math.random,s=Math.floor(n()*o)%o;for(let a=0;a<o;a+=1){let c=(s+a)%o,d=L2(c);if(!r.has(d.start))return I2(e.profileDir,d),d}let i=L2(0);return I2(e.profileDir,i),i}});var oi,W2,O2,Vue,JC,US,zS,BS,x2,YC,GS=l(()=>{"use strict";oi=p(require("node:fs")),W2=p(require("node:net")),O2=p(require("node:path"));ti();KC();Vue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JC=e=>O2.default.join(e,E2),US=e=>{let t=JC(e);if(!oi.default.existsSync(t))return null;try{let r=JSON.parse(oi.default.readFileSync(t,"utf8"));if(Vue(r)&&C2(r.localAppPort))return r.localAppPort}catch{return null}return null},zS=(e,t)=>{oi.default.mkdirSync(e,{recursive:!0}),oi.default.writeFileSync(JC(e),`${JSON.stringify({localAppPort:t},null,2)}
`,"utf8")},BS=e=>{oi.default.mkdirSync(e,{recursive:!0}),oi.default.writeFileSync(JC(e),`${JSON.stringify({portsExhausted:!0},null,2)}
`,"utf8")},x2=(e,t="127.0.0.1")=>new Promise(r=>{let o=W2.default.createServer();o.once("error",()=>{r(!1)}),o.listen(e,t,()=>{o.close(()=>r(!0))})}),YC=async e=>{let t=US(e.profileDir);if(t!==null&&t>=e.range.start&&t<=e.range.end&&await x2(t))return zS(e.profileDir,t),{ok:!0,port:t};for(let r=e.range.start;r<=e.range.end;r+=1)if(await x2(r))return zS(e.profileDir,r),{ok:!0,port:r};return BS(e.profileDir),{ok:!1,reason:zu}}});var M2,N2,que,XC,ZC=l(()=>{"use strict";M2=p(require("node:fs")),N2=p(require("node:path"));$S();ti();GS();que=e=>{try{return M2.default.readdirSync(e,{withFileTypes:!0}).filter(t=>t.isDirectory()).map(t=>N2.default.join(e,t.name)).sort()}catch{return[]}},XC=e=>{let t=[],r=n=>{t.includes(n)||t.push(n)},o=que(e);for(let n of o){let s=US(n);s!==null&&r(s)}for(let n of o){let s=Uu(n);if(s!==null)for(let i=s.start;i<=s.end;i+=1)r(i)}return r(43347),t}});var F2,$2,D2,Jue,H2,Bu,QC=l(()=>{"use strict";F2=p(require("node:fs")),$2=p(require("node:path"));ZC();NS();DS();dt();D2=e=>XC($2.default.join(e,"profiles")),Jue=async e=>{try{let t=await e.json();if(typeof t!="object"||t===null)return!0;let r=t.osUid;return typeof r!="number"||typeof process.getuid!="function"||r===process.getuid()}catch{return!0}},H2=async(e,t=1500)=>{for(let r of e)try{let o=await fetch(`http://127.0.0.1:${r}/health`,{signal:AbortSignal.timeout(t)});if(o.ok&&await Jue(o))return r}catch{}return null},Bu=async(e=x())=>{if(!F2.default.existsSync(Jt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[],reachablePort:null};let r=await H2(D2(e));if(r!==null)return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[],reachablePort:r};let o=[];for(let s of ke(e))(await ct(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await H2(D2(e));return{ok:n!==null||o.length>0,liveReachable:n!==null,hollowInstall:!1,kickstartedLabels:o,reachablePort:n}}});var z2=l(()=>{"use strict";Ae()});var U2,ni,eI,Yue,Xue,Zue,B2,Que,G2,gl,KS=l(()=>{"use strict";U2=require("node:crypto"),ni=p(require("node:fs")),eI=p(require("node:path"));dt();Yue="watchdog-log.ndjson",Xue=200,Zue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B2=(e=x())=>{let t=z(),r=t.installDir===e?t.logsDir:gs({installDir:e,profileEmail:t.profileEmail});return eI.default.join(r,Yue)},Que=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Zue(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},G2=(e,t=x())=>{let r={id:(0,U2.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=B2(t);ni.default.mkdirSync(eI.default.dirname(o),{recursive:!0});let n=ni.default.existsSync(o)?ni.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Xue+1)),JSON.stringify(r)];return ni.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},gl=(e=20,t=x())=>{let r=B2(t);if(!ni.default.existsSync(r))return[];let o=ni.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=Que(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var tI,rI,oI,nI=l(()=>{"use strict";Ge();tI=Mc.watchdogReinstallState,rI=900*1e3,oI=3e3});var K2=l(()=>{"use strict";nI()});var V2={};Mt(V2,{verifyAgentWitchReviveAfterKickstart:()=>tpe});var epe,tpe,q2=l(()=>{"use strict";K2();BC();GC();dt();epe=e=>new Promise(t=>{setTimeout(t,e)}),tpe=async e=>{if(await epe(e.verifyDelayMs??oI),!await hs(e.launchAgentLabel))return!1;let r=e.profileEmail===null?z():z(e.profileEmail),o=Ue(r);return!tt(o,e.staleAfterMs)}});var Gu,sI,rpe,J2,Y2,iI,aI,lI=l(()=>{"use strict";Gu=p(require("node:fs")),sI=p(require("node:path"));Z();nI();rpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J2=e=>sI.default.join(e,tI),Y2=(e=x())=>{let t=J2(e);if(!Gu.default.existsSync(t))return null;try{let r=JSON.parse(Gu.default.readFileSync(t,"utf8"));return!rpe(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},iI=(e=x(),t=Date.now())=>{let r=Y2(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=rI:!0},aI=(e=x(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=J2(e);return Gu.default.mkdirSync(sI.default.dirname(o),{recursive:!0}),Gu.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var cI,X2=l(()=>{"use strict";Ae();lI();cI=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!iI())return{attempted:!1,ok:!1,targets:e};aI();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await ct(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var Z2=l(()=>{"use strict";lI();X2()});var dI=l(()=>{"use strict";Kr()});var Q2=l(()=>{"use strict";Kr()});var eK,fl,tK,rK,oK,ope,npe,nK,spe,ipe,sK,iK=l(()=>{"use strict";eK=require("node:child_process"),fl=p(require("node:fs")),tK=p(require("node:os")),rK=p(require("node:path")),oK=require("node:util");dI();Q2();dt();ope=(0,oK.promisify)(eK.execFile),npe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nK=e=>{let t=lt(e),r=t===null?z():z(t);if(!fl.default.existsSync(r.configPath))return null;try{let o=JSON.parse(fl.default.readFileSync(r.configPath,"utf8"));return!npe(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},spe=e=>nK(e)?.wsUrl??null,ipe=e=>{let t=spe(e);return t!==null?et(t):ze(e)?.appOrigin??null},sK=async e=>{let t=e?.installDir??x(),r=nK(t),o=r!==null?et(r.wsUrl):ipe(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=rK.default.join(tK.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{fl.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??lt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await ope("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"AgentWitch reinstall script failed."}}finally{fl.default.existsSync(i)&&fl.default.unlinkSync(i)}}});var aK={};Mt(aK,{attemptAgentWitchWatchdogReinstall:()=>ape});var ape,lK=l(()=>{"use strict";Z2();iK();ape=async e=>cI(e,()=>sK())});var cK,dK,uK,lpe,cpe,dpe,Ku,uI=l(()=>{"use strict";k2();UC();BC();GC();QC();zC();NS();DS();dt();La();z2();KS();cK=e=>e===null?z():z(e),dK=async(e,t,r)=>{if(!await hs(e))return"not_running";let n=cK(t);if(Qt(n))return"healthy";let s=Ue(n);return tt(s,r)?"stale_connection":"healthy"},uK=async e=>{let t=e?.staleAfterMs??12e4,r=x(),o=ke(r);return Promise.all(o.map(async n=>{let s=await dK(n.launchAgentLabel,n.profileEmail,t),i=cK(n.profileEmail),a=Ue(i),c=await hs(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:tt(a,t),needsRevive:s!=="healthy",reason:s}}))},lpe=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled AgentWitch from install script and retried kickstart.":t.reinstallErrorMessage??"AgentWitch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All AgentWitch WebSocket connections are healthy."},cpe=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",dpe=async e=>{let t=await ct(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(q2(),V2)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Ku=async e=>{if(!yr())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=x();await ul(r),await Bu(r);let o=ke(r),n=[];for(let u of o){let m=await dK(u.launchAgentLabel,u.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:m});continue}n.push(await dpe({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let u=fs();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(lK(),aK)),m=await u(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&G2({event:cpe(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:lpe(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var pK,VS,mK=l(()=>{"use strict";pK=p(require("node:os"));UC();KS();uI();VS=async()=>{let e=await uK(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:pK.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:gl(1)[0]??null}}});var pI=l(()=>{"use strict";zC();uI();mK();KS()});var Vu,qu,Ju,gK=l(()=>{"use strict";Ae();pI();Vu=async()=>{await ul();let e=ke(),t=[];for(let r of e){let o=await ct(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=fs();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},qu=Ku,Ju=Ku});var mI=l(()=>{"use strict";gK()});var JS,qS,fK,gI,yK,upe,ppe,mpe,gpe,fpe,YS,hK=l(()=>{"use strict";JS=require("node:child_process"),qS=p(require("node:fs")),fK=p(require("node:os")),gI=p(require("node:path")),yK=require("node:util");Ae();Z();ys();upe=(0,yK.promisify)(JS.execFile),ppe=()=>gI.default.join(fK.default.homedir(),"Library","LaunchAgents"),mpe=async e=>{if(!Yt())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await upe("launchctl",["bootout",r]).catch(()=>{})},gpe=e=>{let t=gI.default.join(ppe(),`${e}.plist`);qS.default.existsSync(t)&&qS.default.unlinkSync(t)},fpe=e=>{(0,JS.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},YS=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=x();if(!qS.default.existsSync(e))return{ok:!1,message:"No local AgentWitch install directory was found.",removedLaunchAgentLabels:[]};let t=Ao(e);for(let r of t)await mpe(r),gpe(r);return fpe(e),{ok:!0,message:"Local AgentWitch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var SK,XS,PK,yl,AK,ype,hpe,Spe,fI,Ppe,yI,_K=l(()=>{"use strict";SK=require("node:child_process"),XS=p(require("node:fs")),PK=p(require("node:os")),yl=p(require("node:path")),AK=require("node:util");Ae();ys();ype=(0,AK.promisify)(SK.execFile),hpe=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],Spe=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],fI=e=>{XS.default.existsSync(e)&&XS.default.rmSync(e,{force:!0})},Ppe=async e=>{if(!Yt())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await ype("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},yI=async e=>{let r=(e.listLaunchAgentLabels??Ao)(e.layout.installDir),o=e.launchAgentsDir??yl.default.join(PK.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??Ppe;for(let i of r)await n(i),fI(yl.default.join(o,`${i}.plist`));let s=yl.default.dirname(e.layout.configPath);for(let i of hpe)fI(yl.default.join(s,i));for(let i of Spe)fI(yl.default.join(e.layout.installDir,i));return XS.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var hI,bK=l(()=>{"use strict";hI="unknown_identity"});var SI=l(()=>{"use strict";HT();bK()});var Ape,PI,RK=l(()=>{"use strict";SI();Ape=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),PI=e=>e.type!=="system.error"||!Ape(e.payload)?!1:e.payload.errorCode===hI});var AI=l(()=>{"use strict";hK();_K();RK()});var ZS=l(()=>{"use strict";Ae();Kr();AI();pI()});var hl,QS,eP=l(()=>{"use strict";ZS();hl=(e=20)=>gl(e),QS=VS});var tP,Sl,rP,oP=l(()=>{"use strict";ZS();tP=Ls,Sl=(e=20)=>Ts(e),rP=e=>Is(e)});var nP,_I=l(()=>{"use strict";ZS();nP=()=>YS()});var kK=l(()=>{"use strict";_E();cT();$C();mI();eP();oP();_I()});var wK={};Mt(wK,{buildAgentWitchAutomationStatusFromWakeServer:()=>$u,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>tP,buildAgentWitchWakeHealthResponse:()=>lu,buildAgentWitchWakeIdentityResponse:()=>cu,buildAgentWitchWatchdogStatus:()=>QS,installHarnessFromWakeServer:()=>bu,readAgentWitchSelfUpdateLogEntries:()=>Sl,readAgentWitchWatchdogLogEntries:()=>hl,restartAgentWitchFromWakeServer:()=>Ju,reviveAgentWitchWebSocketFromWakeServer:()=>qu,runAgentWitchSelfUpdateFromWakeServer:()=>rP,runAgentWitchUninstallLocalFromWakeServer:()=>nP,runAutomationFromWakeServer:()=>Fu,syncAutomationsFromWakeServer:()=>Hu,wakeAgentWitchLaunchAgents:()=>Vu});var EK=l(()=>{"use strict";kK()});var TK,CK,bI,RI,IK=l(()=>{"use strict";TK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),CK=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?TK(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?TK(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},bI=e=>{let t=e.watchdogLogs.map(CK).join(""),r=e.updateLogs.map(CK).join("");return`<!doctype html>
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
</html>`},RI=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var LK,vK,xK=l(()=>{"use strict";LK=p(require("node:net")),vK=()=>new Promise((e,t)=>{let r=LK.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var WK,_pe,bpe,kI,OK=l(()=>{"use strict";WK=p(require("node:net"));Ae();xK();au();iu();dt();_pe=e=>new Promise(t=>{let r=WK.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),bpe=e=>new Promise(t=>{setTimeout(t,e)}),kI=async(e={})=>{let t=x(),r=Ar(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await _pe(r))return oU(r),r;i<o&&await bpe(n)}let s=await vK();uh(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{cd({launchAgentPrefix:Le(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var Rpe,wI,jK=l(()=>{"use strict";Rpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wI=e=>({force:Rpe(e)&&e.force===!0})});var Yu=l(()=>{"use strict";_u();IK();OK();jK();bk();fy();_s()});var EI,Y,TI,CI,Xu,MK=l(()=>{"use strict";EI=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},Y=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},TI=e=>{e.writeHead(403),e.end()},CI=e=>e.url?.split("?")[0]??"/",Xu=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Er=l(()=>{"use strict";MK()});var kpe,NK,DK=l(()=>{"use strict";$C();Er();kpe=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return Y(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},NK=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return Y(e.response,200,$u(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await kpe(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Hu(t);return Y(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Fu(t);return Y(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var wpe,FK,HK,$K,II,zK,LI=l(()=>{"use strict";wpe=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],FK=e=>/embed|minilm|^bge-/i.test(e),HK=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),$K=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),II=e=>e.filter(t=>t.trim().length>0&&!FK(t)),zK=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!FK(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>HK(s,o));if(n!==void 0)return n}for(let n of wpe){let s=r.find(i=>HK(i,n));if(s!==void 0)return s}return r[0]??null}});var vI,GK,KK,sP,VK,UK,BK,Epe,Tpe,Cpe,Ipe,Lpe,vpe,Tr,Zu=l(()=>{"use strict";vI=require("node:child_process"),GK=p(require("node:fs")),KK=p(require("node:os")),sP=p(require("node:path"));Kr();Pr();LI();VK=3e3,UK=["claude-cli","codex","cursor","antigravity"],BK={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Epe=(e,t)=>new Promise(r=>{let o=(0,vI.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},VK);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),Tpe=()=>{let e=KK.default.homedir();return["ollama",sP.default.join(e,".local","bin","ollama"),sP.default.join(e,".agent-witch","ollama","ollama"),sP.default.join(e,".local-agent-witch","ollama","ollama")]},Cpe=e=>new Promise(t=>{let r=(0,vI.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},VK);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t($K(Buffer.concat(o).toString("utf8")))})}),Ipe=async()=>{for(let e of Tpe()){if(e!=="ollama"&&!GK.default.existsSync(e))continue;let t=await Cpe(e);if(t!==null)return t}return[]},Lpe=e=>{let t=e.installedWriterIds.map(s=>BK[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=De(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${BK[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},vpe=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:va},Tr=async e=>{let t=UK.map(i=>{let a=Ky(i,e.commands);return Epe(a.command,a.args)}),[r,...o]=await Promise.all([Ipe(),...t]),n=UK.flatMap((i,a)=>o[a]===!0?[i]:[]),s=zK(r,vpe());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:Lpe({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var xpe,Wpe,xI,qK=l(()=>{"use strict";xpe="http://127.0.0.1:11434",Wpe=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},xI=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||xpe;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Wpe(await o.json()):null}catch{return null}}});var WI=l(()=>{"use strict";Pr();Zu();qK();LI()});var Ope,JK,YK=l(()=>{"use strict";WI();Ope={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},JK=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Ope[t]})),ollamaModels:II(e.ollamaModels)})});var jpe,XK,ZK=l(()=>{"use strict";WI();Er();YK();jpe=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return Y(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},XK=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Tr({commands:we({})});return Y(e.response,200,{ok:!0,...JK({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await jpe(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await xI({model:r,prompt:o});return n===null?(Y(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(Y(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var Mpe,QK,eV=l(()=>{"use strict";cT();Er();Mpe=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return Y(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},QK=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await Mpe(e);if(t===null)return!0;let r=bu(t);return Y(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var tV=l(()=>{"use strict";_t()});var OI,rV=l(()=>{"use strict";tV();Xa();OI=e=>{if(!_r(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:$t({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var oV,nV,jI,MI=l(()=>{"use strict";oV=p(require("node:path"));oe();_t();Xa();nV=e=>{if(!_r(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},jI=async e=>{let t=nV(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=Ln("Choose a folder for this AgentWitch project");if(r===null)return{ok:!1,cancelled:!0};let o=B();if(o===null)return{ok:!1,errorMessage:"AgentWitch is not configured on this computer."};let n=J({wsUrl:o.wsUrl,pairingToken:o.pairingToken});if(n===null)return{ok:!1,errorMessage:"Could not resolve AgentWitch cloud connection."};let s=await No({projectId:t.projectId,folderPath:r,allowOutsideHome:!0,profileDir:oV.default.dirname(o.layout.configPath),cloudConfig:n});return s.ok?{ok:!0,project:{id:t.projectId,folderPath:s.folderPath},bindingsSynced:s.bindingsSynced,linkedSetSlugs:s.linkedSetSlugs}:{ok:!1,errorMessage:s.message}}});var sV=l(()=>{"use strict";rV();MI()});var NI,iV,aV,lV=l(()=>{"use strict";NI=p(require("node:path"));oe();_t();Xa();iV=async(e,t=No)=>{if(!_r(e)||typeof e.projectId!="string"||typeof e.folderPath!="string")return{ok:!1,httpStatus:400,code:"folder_required",message:"Send projectId and folderPath."};let r=B();return r===null?{ok:!1,httpStatus:409,code:"not_paired",message:"Connect this computer to AgentWitch first."}:t({projectId:e.projectId,folderPath:e.folderPath,allowOutsideHome:e.allowOutsideHome===!0,profileDir:NI.default.dirname(r.layout.configPath),cloudConfig:J({wsUrl:r.wsUrl,pairingToken:r.pairingToken})})},aV=()=>{let e=B();return e===null?{summary:"This computer is not connected to AgentWitch yet.",folders:[]}:Mo(NI.default.dirname(e.layout.configPath))}});var cV,dV=l(()=>{"use strict";sV();lV();MI();Er();cV=async e=>{if(e.request.method==="GET"&&e.pathname==="/projects/folders")return Y(e.response,200,{ok:!0,...aV()},e.cors.headers),!0;if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=OI(t);return Y(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/link-folder"){let t=await e.readJsonBody(),r=await iV(t);return Y(e.response,r.ok?200:r.httpStatus,r.ok?r:{ok:!1,error:r.code,errorMessage:r.message},e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await jI(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return Y(e.response,o,r,e.cors.headers),!0}return!1}});var uV,pV=l(()=>{"use strict";Yu();oP();eP();uV=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=hl(50),r=Sl(50);return e.response.writeHead(200,RI()),e.response.end(bI({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var mV,gV=l(()=>{"use strict";_E();Er();mV=e=>e.request.method==="GET"&&e.pathname==="/health"?(Y(e.response,200,lu(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(Y(e.response,200,cu(),e.cors.headers),!0):!1});var fV,yV=l(()=>{"use strict";_I();Er();fV=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await nP();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}});var hV,SV=l(()=>{"use strict";mI();Er();hV=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await qu();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Ju();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Vu();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var PV,AV=l(()=>{"use strict";Yu();oP();Er();PV=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=tP();return Y(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Xu(e.request,"/update/logs",20,200);return Y(e.response,200,{ok:!0,logs:Sl(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=wI(t),o=await rP({force:r});return Y(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var _V,bV=l(()=>{"use strict";eP();Er();_V=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await QS();return Y(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Xu(e.request,"/watchdog/logs",20,200);return Y(e.response,200,{ok:!0,logs:hl(t)},e.cors.headers),!0}return!1}});var RV,kV=l(()=>{"use strict";DK();ZK();eV();dV();pV();gV();yV();SV();AV();bV();RV=[mV,uV,_V,hV,PV,fV,QK,cV,NK,XK]});var wV,EV=l(()=>{"use strict";kV();wV=async e=>{for(let t of RV)if(await t(e))return!0;return!1}});var Npe,TV,CV=l(()=>{"use strict";_u();Er();EV();Npe=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:CI(e),readJsonBody:()=>EI(e)}),TV=async(e,t,r)=>{let o=e.headers.origin,n=$h(o);try{if(o!==void 0&&o.length>0&&!n.allowed){TI(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=Npe(e,t,r,n);if(await wV(s))return;Y(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{Y(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var IV,si,iP,aP=l(()=>{"use strict";IV=p(require("node:http"));Yu();CV();si=async()=>{let e=await kI(),t=IV.default.createServer((r,o)=>{TV(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`AgentWitch wake server listening on http://127.0.0.1:${e}
`),t},iP=si});var LV={};Mt(LV,{runAgentWitchBridgeCli:()=>Dpe});var Dpe,vV=l(()=>{"use strict";Ae();aP();Dpe=async()=>{Dt("agent-witch-bridge");let e=await si(),t=bo(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var ii,Pl=l(()=>{"use strict";fr();ii="Open AgentWitch Local from the menu bar."});var Al,DI,xV=l(()=>{"use strict";Al=(e,t,r)=>e===1?t:r,DI=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Al(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Al(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Al(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Al(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Al(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${Al(u,"year","years")} ago`}});var Hpe,Fpe,WV,HI,lP,cP,OV,FI,dP=l(()=>{"use strict";Hpe=new Set(["/","/task","/writer-sessions","/errors","/status","/traffic","/projects","/project","/project/skill-drafts","/harness","/writer-api","/history","/estimates","/knowledge","/prompt-optimizer","/prompt-optimizer/guide","/prompt-sdlc","/prompt-sdlc/guide"]),Fpe=new Set(["/prompt-optimizer/agent","/prompt-optimizer/skills/query","/prompt-sdlc/agent","/prompt-sdlc/skills/query"]),WV="AgentWitchLocal-MacWebView",HI=e=>Fpe.has(e),lP=e=>typeof e=="string"&&e.includes(WV),cP=e=>HI(e)?!1:!!(e==="/prompt-optimizer"||e.startsWith("/prompt-optimizer/")||e==="/prompt-sdlc"||e.startsWith("/prompt-sdlc/")),OV=e=>HI(e)?!1:!!(Hpe.has(e)||e==="/prompt-optimizer"||e.startsWith("/prompt-optimizer/")||e==="/prompt-sdlc"||e.startsWith("/prompt-sdlc/")),FI=e=>{let t=e.method.toUpperCase();return t!=="GET"&&t!=="POST"||lP(e.userAgent)&&cP(e.pathname)?!1:OV(e.pathname)}});var $pe,jV,MV=l(()=>{"use strict";Pl();dP();$pe=e=>lP(e.userAgent)&&cP(e.pathname),jV=e=>{let t=$pe(e);return(r,o)=>{if(t){r.writeHead(200,{"Content-Type":"text/html; charset=utf-8",...e.headers}),r.end(o);return}r.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...e.headers}),r.end(ii)}}});var zpe,NV,DV=l(()=>{"use strict";zpe=/^[0-9a-f]{7,40}$/,NV=(e="523a16063400ffd8ac9cff802ff62adfe1116477")=>{let t=(e??"").trim().toLowerCase();return zpe.test(t)?{commitSha:t,shortCommitSha:t.slice(0,7)}:{commitSha:null,shortCommitSha:null}}});var ai,$I,Upe,Bpe,zI,On,uP,UI,HV=l(()=>{"use strict";ai=p(require("node:fs")),$I=p(require("node:path")),Upe="local-ws-traffic.ndjson",Bpe=500,zI=e=>$I.default.join(e.logsDir,Upe),On=(e,t)=>{let r=zI(e);ai.default.mkdirSync($I.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});ai.default.appendFileSync(r,`${o}
`,"utf8")},uP=(e,t=Bpe)=>{let r=zI(e);if(!ai.default.existsSync(r))return[];let n=ai.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},UI=e=>{let t=zI(e);ai.default.existsSync(t)&&ai.default.writeFileSync(t,"","utf8")}});var Gpe,FV,$V,zV=l(()=>{"use strict";SI();Gpe=new Set(Object.values(rS)),FV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$V=e=>{if(!FV(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!Gpe.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!FV(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var UV,BV=l(()=>{"use strict";UV=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Kpe,Vpe,qpe,Qu,GV=l(()=>{"use strict";BV();Kpe=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Vpe=e=>Kpe.test(e),qpe=e=>UV(e),Qu=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Qu(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Vpe(o)){r[o]=qpe(n);continue}r[o]=Qu(n)}return r}});var to,BI,Jpe,Ype,Xpe,GI,KV,VV,qV,Zpe,pP,li,mP,KI,JV=l(()=>{"use strict";to=p(require("node:fs")),BI=p(require("node:path"));zV();GV();Jpe="local-ws-trace.ndjson",Ype=1e4,Xpe=1440*60*1e3,GI=e=>BI.default.join(e.logsDir,Jpe),KV=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},VV=e=>{if(!to.default.existsSync(e))return;let t=to.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Xpe,n=t.filter(s=>{let i=KV(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-Ype);to.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},qV=(e,t)=>{let r=GI(e);to.default.mkdirSync(BI.default.dirname(r),{recursive:!0}),to.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),VV(r)},Zpe=e=>e.parsed===null?{_empty:!0}:Qu(e.parsed),pP=(e,t,r)=>{let o=$V(r);qV(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Zpe(o)})},li=(e,t)=>{qV(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Qu({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},mP=(e,t=80)=>{let r=GI(e);if(VV(r),!to.default.existsSync(r))return[];let o=to.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=KV(s);i!==null&&n.push(i)}return n.reverse()},KI=e=>{let t=GI(e);to.default.existsSync(t)&&to.default.writeFileSync(t,"","utf8")}});var jn,YV,Qpe,VI,qI,XV=l(()=>{"use strict";jn=p(require("node:fs")),YV=p(require("node:path")),Qpe=256e3,VI=e=>{jn.default.mkdirSync(YV.default.dirname(e),{recursive:!0}),jn.default.writeFileSync(e,"","utf8")},qI=(e,t=Qpe)=>{if(!jn.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=jn.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=jn.default.openSync(e,"r");try{jn.default.readSync(a,i,0,s,n)}finally{jn.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var ep=l(()=>{"use strict";HV();JV();XV()});var JI,YI,ZV=l(()=>{"use strict";JI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YI=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${JI(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${JI(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the AgentWitch client stderr log on this computer (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${JI(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var QV=l(()=>{"use strict";ZV()});var XI,ZI=l(()=>{"use strict";XI=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var QI=l(()=>{"use strict";Md()});var eL,tL,e5=l(()=>{"use strict";QI();eL=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},tL=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var t5=l(()=>{"use strict";ZI();e5()});var r5,rL,tp,rp=l(()=>{"use strict";ZI();r5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rL=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=r5(e),r=r5(XI(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},tp=`(function () {
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
})();`});var ci,eme,oL,o5=l(()=>{"use strict";ci=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eme=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},oL=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${ci(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?ci(r.direction):ci(r.kind),i=`trace-body-${o}`,a=ci(eme(r.body));return`<tr>
        <td title="${ci(r.at)}">${ci(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${ci(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var n5,tme,gP,rme,nL,s5=l(()=>{"use strict";Uc();Ge();n5=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},tme=e=>n5(e)===Po?na:oa,gP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rme=(e,t)=>`${t?`<h3>${gP(e.label)}</h3>`:""}
    <p class="muted">${gP(e.instructions)}</p>
    <pre class="sdlc-pre mono">${gP(e.command)}</pre>
    <p class="muted">${gP(e.note)}</p>`,nL=e=>{let t=zc({platform:ds(e.platform),installDirName:n5(e.installDir),launchAgentPrefix:tme(e.installDir)}),r=t.length>1;return`<section class="card">
    <p class="eyebrow">AgentWitch Local</p>
    <h2>Revive local app</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if AgentWitch Cloud cannot open Status, restart the AgentWitch client on this computer.</p>${r?`
    <p class="muted">Use the command for this computer's operating system.</p>`:""}
    ${t.map(n=>rme(n,r)).join(`
    `)}
  </section>`}});var sL,i5=l(()=>{"use strict";Uc();sL=e=>ds(e)==="mac"?"Revive requested. The bridge will reconnect if this Mac can reach launchd.":"Revive requested. The bridge will reconnect when this computer can reach AgentWitch Cloud."});var a5=l(()=>{"use strict";rp();o5();s5();i5();rp()});var l5,c5,d5,u5,p5,m5,g5,_l=l(()=>{"use strict";l5="projects",c5="knowledge",d5="chunks.ndjson",u5="lessons.ndjson",p5="error-chunks.ndjson",m5="usage-stats.json",g5="knowledge-location.json"});var fP,ome,yP,iL=l(()=>{"use strict";fP=p(require("node:path"));_l();ome=(e,t)=>{let r=t.trim(),o=fP.default.join(e.installDir,l5,r,c5);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:fP.default.join(o,d5),memoryRunsFilePath:fP.default.join(o,u5)}},yP=ome});var aL,nme,f5,y5=l(()=>{"use strict";aL=p(require("node:fs"));_l();zs();nme=e=>{let t=tr(e.projectFolderPath),r=`${t.metaDirPath}/${g5}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your AgentWitch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};aL.default.mkdirSync(t.metaDirPath,{recursive:!0}),aL.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},f5=nme});var bl,S5,h5,sme,P5,A5=l(()=>{"use strict";bl=p(require("node:fs")),S5=p(require("node:path"));yn();zs();iL();y5();h5=(e,t)=>{bl.default.existsSync(e)&&(bl.default.existsSync(t)&&bl.default.statSync(t).size>0||(bl.default.mkdirSync(S5.default.dirname(t),{recursive:!0}),bl.default.copyFileSync(e,t)))},sme=e=>{let t=tr(e.projectFolderPath),r=yP(e.layout,e.projectId),o=`${t.memoryDirPath}/${ha}`;h5(t.ragChunksFilePath,r.ragChunksFilePath),h5(o,r.memoryRunsFilePath),f5({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},P5=sme});var _5,ime,Rl,hP=l(()=>{"use strict";_5=p(require("node:path"));yn();zs();A5();RT();iL();ime=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=qh(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){P5({layout:e.layout,projectFolderPath:t,projectId:o});let s=yP(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=tr(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:_5.default.join(n.memoryDirPath,ha),projectId:null}},Rl=ime});var SP,lme,PP,lL=l(()=>{"use strict";SP=p(require("node:fs"));_l();lme=(e,t=500)=>{if(!SP.default.existsSync(e))return;let r=SP.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);SP.default.writeFileSync(e,`${o.join(`
`)}
`)},PP=lme});var AP,cme,di,cL=l(()=>{"use strict";AP=p(require("node:path"));_l();hP();cme=e=>{let t=Rl(e);if(t===null)return null;let r=AP.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:AP.default.join(r,m5),errorChunksFilePath:AP.default.join(r,p5)}},di=cme});var R5,op,k5,b5,dL,w5,pme,uL,E5,pL,mL,gL,fL=l(()=>{"use strict";R5=require("node:crypto"),op=p(require("node:fs")),k5=p(require("node:path"));tl();_l();cL();b5=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),dL=e=>{if(!op.default.existsSync(e))return b5();try{let t=JSON.parse(op.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return b5()},w5=(e,t)=>{op.default.mkdirSync(k5.default.dirname(e),{recursive:!0}),op.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},pme=e=>{let t=wr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,R5.createHash)("sha256").update(o).digest("hex").slice(0,16)},uL=e=>{let t=di(e);return t===null?null:dL(t.usageStatsFilePath)},E5=e=>{if(e.chunkIds.length===0)return;let t=di(e);if(t===null)return;let r=dL(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;w5(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},pL=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=di(e);if(r===null)return null;let o=pme(t),n=dL(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return w5(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},mL=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,gL=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var np,T5,mme,gme,C5,fme,yL,sp,ip,hL,kl,SL,PL=l(()=>{"use strict";np=p(require("node:fs")),T5=p(require("node:path"));tl();hP();lL();fL();mme="http://127.0.0.1:11434",gme="nomic-embed-text",C5=(e,t,r)=>Rl({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,fme=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},yL=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},sp=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||mme,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||gme;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},ip=(e,t,r)=>{let o=C5(e,t,r);if(o===null||!np.default.existsSync(o))return[];let n=np.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},hL=async e=>{let t=wr(e.text),r=yL(t);if(r.length===0)return 0;let o=C5(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;np.default.mkdirSync(T5.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await sp(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};np.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return PP(o),n},kl=async e=>{let t=await sp(e.query);if(t===null)return[];let r=e.minScore??0,s=ip(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:fme(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return E5({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},SL=e=>e.length===0?"":`Local knowledge (from this computer):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var ap,I5,yme,hme,AL,_L,bL,L5=l(()=>{"use strict";ap=p(require("node:fs")),I5=p(require("node:path"));tl();cL();lL();PL();yme=e=>{if(!ap.default.existsSync(e))return[];let t=ap.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},hme=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},AL=async e=>{let t=di(e);if(t===null)return 0;let r=wr(e.text),o=yL(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;ap.default.mkdirSync(I5.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await sp(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};ap.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return PP(n,200),s},_L=async e=>{let t=di(e);if(t===null)return[];let r=await sp(e.query);if(r===null)return[];let o=e.minScore??.3;return yme(t.errorChunksFilePath).map(s=>({chunk:s,score:hme(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},bL=e=>e.length===0?"":`Past failures on this computer (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var RL=l(()=>{"use strict";PL();fL();L5()});var Cr,lp,_P=l(()=>{"use strict";DT();Cr=NT,lp=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: #f4f3f0;
  --aw-zinc-100: #ebe9e4;
  --aw-zinc-200: #ddd9d2;
  --aw-zinc-400: #c9c4bb;
  --aw-zinc-500: ${Cr.gray500};
  --aw-zinc-600: ${Cr.gray600};
  --aw-zinc-700: ${Cr.gray700};
  --aw-zinc-800: ${Cr.gray900};
  --aw-zinc-900: ${Cr.gray900};
  --aw-brand-600: #1f6656;
  --aw-brand-700: #19564a;
  --aw-brand-50: #dde8e3;
  --aw-emerald-50: ${Cr.success50};
  --aw-emerald-700: ${Cr.success700};
  --aw-amber-50: ${Cr.warning50};
  --aw-amber-900: ${Cr.warning900};
  --aw-red-50: ${Cr.error50};
  --aw-red-700: ${Cr.error700};
  --aw-radius-lg: 0.5rem;
  --aw-radius-xl: 0.75rem;
  --aw-radius-2xl: 1rem;
  --aw-shadow-sm: 0 1px 2px rgb(16 24 40 / 0.06);
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, ui-sans-serif, system-ui, sans-serif;
  background: #e8e6e1;
  color: var(--aw-zinc-900);
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid #ddd9d2;
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
    border-right: 1px solid #ddd9d2;
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
  outline: 1px solid #ddd9d2;
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
  outline: 2px solid rgb(31 102 86 / 0.45);
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
  box-shadow: 0 0 0 2px rgb(31 102 86 / 0.2);
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
.sdlc-history-badge-viewing { background: #dde8e3; color: #19564a; }
.sdlc-history-item-viewing {
  background: #f7f6f4;
  border-left: 3px solid #1f6656;
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
  outline: 2px solid rgb(31 102 86 / 0.45);
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
  border-color: #1f6656;
  background: #dde8e3;
  color: #19564a;
  font-weight: 600;
}
.sdlc-compose-stepper-item[aria-current="step"] .sdlc-compose-stepper-index {
  background: #1f6656;
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
  background: #dde8e3;
  color: #13463c;
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
  outline: 1px solid rgb(31 102 86 / 0.25);
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
  border-top-color: #1f6656;
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

.sdlc-history-badge-live { background: #dde8e3; color: #19564a; }
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
`.trim()});var v5,x5=l(()=>{"use strict";v5=`
body.awl-po { padding-left: 0; background: #e8e6e1; }
.awl-po-header {
  position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 2rem;
  background: rgb(247 246 244 / 0.94);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #ddd9d2;
}
.awl-po-glyph {
  display: grid; place-items: center; width: 1.5rem; height: 1.5rem;
  border-radius: 0.4rem; background: #1f6656; color: #fff;
  font-size: 0.625rem; font-weight: 700; letter-spacing: -0.02em;
}
.awl-po-title { font-size: 0.9375rem; font-weight: 600; color: #101828; }
.awl-po-nav { display: flex; gap: 0.25rem; margin-left: 0.75rem; }
.awl-po-link {
  padding: 0.3rem 0.7rem; border-radius: 0.45rem;
  font-size: 0.8125rem; font-weight: 500; color: #4b5567;
}
.awl-po-link:hover { background: #ebe9e4; color: #101828; }
.awl-po-version {
  margin-left: auto; font-size: 0.6875rem; color: #566073;
  font-family: "SF Mono", ui-monospace, Menlo, monospace;
}
.awl-po-main { max-width: 64rem; }
`});var W5,O5,j5=l(()=>{"use strict";_P();x5();rp();W5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O5=e=>{let t=W5(e.installBundleVersionLabel?.trim()??"unknown");return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${W5(e.title)} \xB7 AgentWitch Local</title>
  <style>${lp}${v5}</style>
</head>
<body class="awl-po">
  <header class="awl-po-header">
    <span class="awl-po-glyph" aria-hidden="true">AW</span>
    <span class="awl-po-title">Prompt optimizer</span>
    <nav class="awl-po-nav" aria-label="Prompt optimizer">
      <a class="awl-po-link" href="/prompt-optimizer">Optimizer</a>
      <a class="awl-po-link" href="/prompt-optimizer/guide">Guide</a>
    </nav>
    <span class="awl-po-version" title="Install bundle">Local ${t}</span>
  </header>
  <main class="site-main awl-po-main">${e.body}</main>
  <script>${tp}</script>
</body>
</html>`}});var Sme,Pme,kL,M5,wL,N5=l(()=>{"use strict";_P();j5();rp();Sme=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Pme=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],kL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),M5=(e,t)=>`<a class="${e}" href="/" aria-label="AgentWitch Local home, install bundle ${t}">${Sme}<span class="brand-text">AgentWitch<span class="brand-sub">Local(${t})</span></span></a>`,wL=e=>{if(e.activePath==="/prompt-optimizer")return O5({title:e.title,body:e.body,installBundleVersionLabel:e.installBundleVersionLabel});let t=Pme.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=kL(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=kL(e.installBundleVersionLabel?.trim()??"unknown"),s=M5("brand brand-in-sidebar",n),i=M5("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${kL(e.title)} \xB7 AgentWitch Local</title>
  <style>${lp}</style>
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
  <script>${tp}</script>
</body>
</html>`}});var bP,cp,RP=l(()=>{"use strict";bP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),cp=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${bP(e.syncMessage)}</p>`:"",o=bP(e.manageHref),n=bP(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${bP(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var EL,TL,CL,D5=l(()=>{"use strict";EL=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,TL=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer AgentWitch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,CL=e=>e==="ok"?'<div class="alert-success">Update finished. This computer may restart the AgentWitch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var H5=l(()=>{"use strict";N5();RP();D5()});var N,wl=l(()=>{"use strict";N=e=>e==="passed"||e==="stopped"||e==="failed"});var F5,IL,ui,LL,kP=l(()=>{"use strict";F5="Stopped at the round limit. The best prompt is kept.",IL="Stopped because the score stopped rising. The best prompt is kept.",ui="Finished. The best prompt is the result.",LL="Wizard ended. Progress from finished steps is kept."});var Mn,vL=l(()=>{"use strict";Mn=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var Ame,_me,dp,$5,wP=l(()=>{"use strict";Ame=/\n+|;\s+/,_me=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,dp=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(Ame).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,_me(s)]},[]);return[...t,...o]},[]),$5=e=>{let t=dp(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var xe,El=l(()=>{"use strict";xe=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var up,xL=l(()=>{"use strict";wP();El();up=e=>{let t=[...e.priorRounds,e.current],r=xe(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:$5(o)}}});var WL,bme,Rme,EP,OL=l(()=>{"use strict";WL={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},bme=e=>{try{let t=JSON.parse(e.fragment);return{...WL,objects:[...e.objects,t]}}catch{return{...WL,objects:e.objects}}},Rme=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:bme(r)},EP=e=>[...e].reduce(Rme,WL).objects});var kme,jL,wme,z5,ML=l(()=>{"use strict";OL();kme=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},jL=e=>{let t=EP(e).filter(kme),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},wme=(e,t)=>({...e,passed:e.score>=t}),z5=(e,t)=>{let r=jL(e);return r===null?null:wme(r,t)}});var NL,DL,TP=l(()=>{"use strict";NL="The judge reply needs a score and a reason.",DL="The improver reply was empty."});var Eme,U5,B5=l(()=>{"use strict";Eme=/API Error:? \d{3}|\b429\b|too many requests|rate[_ ]limit|spend limit|usage limit|monthly limit|quota|insufficient credit|overloaded|unauthorized|authentication required|not logged in|please run .+login|invalid api key/i,U5=e=>{let t=e.trim();return t.length===0||t.length>600||!Eme.test(t)?null:`The judge CLI returned an error: ${t}`}});var G5,K5=l(()=>{"use strict";G5=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var V5,q5=l(()=>{"use strict";V5=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var Cme,J5,Y5=l(()=>{"use strict";K5();q5();kP();wP();Cme=e=>{let t=dp(e);return t.length===0?IL:`${IL} Avoid: ${t.join("; ")}.`},J5=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:F5};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(G5(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:Cme(V5(r))}}return null}});var Nn,Ime,pi,X5,CP=l(()=>{"use strict";Nn=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},Ime=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,pi=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",Ime(e.tokens),`Delay: ${Nn(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},X5=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var Lme,Z5,Q5=l(()=>{"use strict";ML();Lme=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,Z5=e=>{let r=(Lme.exec(e)?.[1]??e).trim();return r.length===0||jL(r)!==null?null:r}});var eq,IP,tq=l(()=>{"use strict";CP();Q5();TP();eq=e=>({type:"call",role:"judge",choice:e.choice,prompt:X5({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),IP=e=>{let t=Z5(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:DL}}:{nextPrompt:t,continuation:eq({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var HL,rq=l(()=>{"use strict";vL();xL();ML();TP();B5();kP();Y5();TP();tq();HL=e=>{let t=z5(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:U5(e.raw)??NL}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=J5({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=up({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:Mn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var pp,FL=l(()=>{"use strict";pp=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var oq=l(()=>{"use strict"});var nq=l(()=>{"use strict";oq()});var mi,sq=l(()=>{"use strict";mi=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var vme,$L,iq=l(()=>{"use strict";CP();vme=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,$L=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",vme(e.tokens),`Delay: ${Nn(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var xme,Wme,Ome,zL,aq=l(()=>{"use strict";xme=/[A-Za-z0-9_./~-]{3,180}/g,Wme=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,Ome=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||Wme.test(t)},zL=(e,t=12)=>{let r=[];for(let o of e.matchAll(xme)){let n=o[0].replace(/\.+$/,"");if(!(!Ome(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var mp,lq=l(()=>{"use strict";mp=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var LP,UL,cq,gp,BL=l(()=>{"use strict";LP=e=>Math.floor(e/2),UL=e=>Math.max(LP(e)+1,e-20),cq=(e,t)=>e>=t?"passes":e>=UL(t)?"close":e>=LP(t)?"weak":"bad",gp=e=>[{band:"bad",label:`0\u2013${LP(e)-1} bad`},{band:"weak",label:`${LP(e)}\u2013${UL(e)-1} weak`},{band:"close",label:`${UL(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var vP,GL=l(()=>{"use strict";BL();vP=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${cq(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Ir,KL=l(()=>{"use strict";Ir=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var dq,uq=l(()=>{"use strict";dq=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var jme,Mme,pq,mq=l(()=>{"use strict";wl();GL();KL();uq();jme=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],Mme=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",pq=e=>{let t=e.wizard;if(t===void 0)return[];let r=Ir(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=jme.map((y,h)=>{let S=!s&&!n&&h===r?"active":"done";return{id:`wizard-${h+1}`,label:y,state:S,detail:null}}).filter((y,h)=>s?!0:h<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=vP(e),d=c.filter(y=>y.id==="round-0"),u=dq(t)&&(!n||a)?c.filter(y=>y.id!=="round-0"):[],m=N(e.status)&&!s,g=m?[{id:"end",label:Mme(e),state:"done",detail:e.errorMessage}]:[];if(m&&g.length>0){let y=Math.min(r,i.length),h=i.slice(0,y).map(S=>({...S,state:"done"}));return[...d,...h,...g,...u]}return[...d,...i,...u,...g]}});var Nme,VL,gq=l(()=>{"use strict";wl();GL();mq();Nme=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",VL=e=>{if(e.wizard!==void 0)return pq(e);let t=vP(e),r=N(e.status)?[{id:"end",label:Nme(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var fp,fq=l(()=>{"use strict";fp=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var xP,qL,yp,Cl,WP,JL,yq=l(()=>{"use strict";fr();xP="/prompt-optimizer/agent",qL=`${qg}${xP}`,yp=`${aR}://prompt-optimizer`,Cl="The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",WP=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${Cl}`,JL="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var ro=l(()=>{"use strict"});var Ee,hp=l(()=>{"use strict";ro();Ee=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var YL,hq=l(()=>{"use strict";YL="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var Sq,Pq=l(()=>{"use strict";Sq=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var Sp,_q=l(()=>{"use strict";Pq();ro();Sp=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:Sq(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var XL,bq=l(()=>{"use strict";ro();XL=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var ZL,Rq=l(()=>{"use strict";ro();ZL=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var kq,Pp,wq=l(()=>{"use strict";kq=["generalize","evaluate","separate","optimize_modules"],Pp=(e,t)=>{let r=kq.indexOf(t);if(r===-1)return e;let o=kq.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var OP,QL=l(()=>{"use strict";wP();OP=e=>{let t=dp(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Ap,Eq=l(()=>{"use strict";QL();Ap=e=>{let t=OP(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Hme,Fme,$me,Tq,Cq=l(()=>{"use strict";Hme=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Fme=/^\{\{[a-zA-Z0-9_-]+\}\}$/,$me=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(Hme(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},Tq=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>Fme.test(n)?n:$me(n,r)).join("")}});var ev,Iq=l(()=>{"use strict";Cq();ev=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:Tq(o.prompt,t)}))}))});var zme,_p,Lq=l(()=>{"use strict";ro();QL();zme=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),_p=e=>{let t=OP(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=zme(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var bp,vq=l(()=>{"use strict";FL();bp=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return pp({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Rp,rv=l(()=>{"use strict";El();Rp=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=xe(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var ov,xq=l(()=>{"use strict";rv();ov=e=>{let t=Rp({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var gi,Wq=l(()=>{"use strict";gi=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var Ume,Bme,_e,jP=l(()=>{"use strict";hp();Ume=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},Bme=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,_e=e=>{let t=Ee(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:Ume(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>Bme(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var Oq,jq=l(()=>{"use strict";hp();jP();Oq=e=>{let t=_e(e.wizard),r=Ee(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var nv,Mq=l(()=>{"use strict";jq();nv=e=>{let t=Oq({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var Gme,Nq,Dq=l(()=>{"use strict";Gme=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},Nq=e=>[...e].reduce(Gme,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var Kme,Hq,Fq=l(()=>{"use strict";Kme=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},Hq=e=>[...e].reduce(Kme,{out:"",inString:!1,escaped:!1}).out});var Vme,qme,$q,zq=l(()=>{"use strict";Dq();Fq();Vme=e=>e.charCodeAt(0)===65279?e.slice(1):e,qme=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},$q=e=>Hq(Nq(qme(Vme(e))))});var Jme,Yme,Xme,Uq,Zme,Il,MP=l(()=>{"use strict";OL();zq();Jme=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Yme=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},Xme=e=>[...e].reduce(Yme,{out:"",inString:!1,escaped:!1}).out,Uq=e=>{let t=EP(e);return t.length===0?null:t[t.length-1]},Zme=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Il=e=>{let t=$q(Jme(e)),r=Uq(t);if(r!==null)return r;let o=Xme(t),n=Uq(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Zme(i)}}});var Qme,ege,sv,Bq,Gq=l(()=>{"use strict";Qme=/^[a-z0-9][a-z0-9-]{0,62}$/,ege=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return Qme.test(t)?t:""},sv=e=>e.replace(/\s+/gu," ").trim(),Bq=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=ege(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=sv(n.name),a=sv(n.description),c=sv(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var Kq,Vq,qq=l(()=>{"use strict";Kq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},Vq=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var iv,Jq=l(()=>{"use strict";MP();Gq();qq();iv=(e,t)=>{let r=(()=>{try{return Il(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(Kq(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(Vq).filter(a=>a!==null),i=Bq({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var av,Yq=l(()=>{"use strict";av=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var lv,Xq=l(()=>{"use strict";lv=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var tge,cv,Zq=l(()=>{"use strict";hp();jP();tge=(e,t)=>e==="passed"||e==="stopped"||e==="failed"?e:e==="pending"?"not run":t==="failed"?"failed":"stopped",cv=e=>{let t=_e(e.wizard),r=Ee(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${tge(n.status,e.cycleStatus)} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var kp,Qq=l(()=>{"use strict";kp=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Lr,rge,dv,eJ=l(()=>{"use strict";Lr=p(da());MP();rge=(0,Lr.isType)({name:Lr.isNonEmptyString,description:Lr.isString,sampleValue:Lr.isString}),dv=e=>{let t=Il(e);if(!(0,Lr.isType)({templatedPrompt:Lr.isNonEmptyString,variables:(0,Lr.isArrayWithEachItem)(rge)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var We,oge,nge,uv,tJ=l(()=>{"use strict";We=p(da());ro();MP();oge=(0,We.isType)({id:We.isNonEmptyString,title:We.isNonEmptyString,prompt:We.isNonEmptyString,order:We.isNumber}),nge=(0,We.isType)({id:We.isNonEmptyString,title:We.isNonEmptyString,summary:We.isString,topology:(0,We.isOneOf)("chain","parallel"),modules:(0,We.isArrayWithEachItem)(oge),recommended:We.isBoolean}),uv=e=>{let t=Il(e);if(!(0,We.isType)({options:(0,We.isArrayWithEachItem)(nge)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ll,rJ=l(()=>{"use strict";Ll=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var sge,pv,mv=l(()=>{"use strict";sge=/\{\{([a-zA-Z0-9_-]+)\}\}/g,pv=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(sge,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var vr,xr,oJ=l(()=>{"use strict";El();mv();vr=e=>pv(e.templatedPrompt,e.variables),xr=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return xe(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??vr(e.wizard)}});var ige,fi,nJ=l(()=>{"use strict";ige=/\{\{([a-zA-Z0-9_-]+)\}\}/g,fi=(e,t)=>e.replace(ige,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var age,yi,NP=l(()=>{"use strict";age=/\{\{([a-zA-Z0-9_-]+)\}\}/g,yi=e=>{let t=new Set,r=[];for(let o of e.matchAll(age)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var wp,sJ=l(()=>{"use strict";NP();wp=e=>e.variables.length>0||yi(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var gv,fv=l(()=>{"use strict";ro();gv=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Ep,iJ=l(()=>{"use strict";El();fv();Ep=e=>{let t=e.wizard.evaluateSelectedRound??xe(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:gv(r.judgement,e.passScore)}});var Tp,aJ=l(()=>{"use strict";Tp=e=>e.length===1&&e[0].modules.length===1});var yv,lJ=l(()=>{"use strict";yv=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Ve,DP,Cp=l(()=>{"use strict";Ve=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),DP=(e,t)=>`<p class="muted">The computer runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var cJ,dJ=l(()=>{"use strict";Cp();cJ=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Ve("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Ve("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Ve("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var uJ,pJ=l(()=>{"use strict";wl();Cp();uJ=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!N(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Ve("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>The AgentWitch Local app talks to AWL on this computer, on a port unique to your account. The run is stored on this computer.</p>"),Ve("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Ve("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this computer",DP(e.writerLabel,e.folder)),Ve("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Ve("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var mJ,gJ=l(()=>{"use strict";Cp();mJ=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Ve("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Ve("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Ve("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var fJ,yJ=l(()=>{"use strict";Cp();fJ=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Ve("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Ve("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",DP(e.writerLabel,e.folder)),...r?[Ve("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var HP,hJ=l(()=>{"use strict";wl();dJ();pJ();gJ();yJ();HP=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(N(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return uJ(r);case"evaluate":return cJ({...r,currentRound:e.currentRound});case"separate":return fJ(r);case"optimize_modules":return mJ({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Ip,Ho,SJ=l(()=>{"use strict";Ip=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Ho=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var lge,FP,hv,PJ=l(()=>{"use strict";NP();lge="wizardParam_",FP=e=>`${lge}${e}`,hv=e=>{let t=yi(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=FP(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Bt,AJ=l(()=>{"use strict";Bt=["generalize","evaluate","separate","optimize_modules"]});var Lp,hi,vl,oo=l(()=>{"use strict";Lp="Stopped because the confirmed token or spend budget was exceeded.",hi="Approaching the confirmed budget. Further trials may hard-stop.",vl="Confirm the Step 4 token and spend budget before optimizing modules."});var Tt,xl=l(()=>{"use strict";Tt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var or,vp=l(()=>{"use strict";oo();or=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var cge,RJ,kJ,$P,wJ,Sv=l(()=>{"use strict";oo();cge={codex:9e4,"claude-cli":3e4,cursor:4e4,"cursor-cloud":4e4,antigravity:3e4},RJ=2,kJ=e=>{let t=e?.trim()??"";return t.length===0?null:cge[t]??null},$P=e=>{let t=kJ(e);return t===null?8e3:t*RJ},wJ=e=>{let t=kJ(e);return t===null?4e3:t*RJ}});var dge,nr,xp=l(()=>{"use strict";oo();dge={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},nr=e=>{let t=e?.trim()??"";return t.length===0?.01:dge[t]??.01}});var zP,Pv=l(()=>{"use strict";oo();xp();zP=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=nr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var Av,Wp,UP,_v=l(()=>{"use strict";oo();Sv();xl();vp();Pv();xp();Av=e=>{let t=zP({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??nr(e.writerId)??.01,s=r*o*$P(e.writerId);return{targetTokenBudget:s,estimatedSpendUsd:Tt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Wp=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),UP=e=>{let t=e.existing??or(),r=Av({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Wp(t,r)}});var Si,Wl,TJ=l(()=>{"use strict";oo();Sv();ro();xl();vp();_v();Pv();xp();Si=e=>{let t=zP({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??nr(e.writerId),i=r*wJ(e.writerId),a=n*o*$P(e.writerId),c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:Tt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Wl=e=>{let t=e.existing??or();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Si({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Wp(t,r)}});var no,CJ=l(()=>{"use strict";xl();oo();vp();no=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??or(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=Tt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var Rv,Ol,IJ=l(()=>{"use strict";oo();xl();Rv=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=Tt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:Lp,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Lp,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:hi,costControls:{...t,softWarnFired:!0,softWarnMessage:hi}}:null},Ol=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var kv,LJ=l(()=>{"use strict";kv=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var j=l(()=>{"use strict";wl();kP();rq();vL();CP();FL();nq();sq();iq();aq();xL();lq();El();gq();KL();BL();fq();yq();ro();hp();hq();_q();bq();Rq();wq();Eq();Iq();Lq();vq();rv();xq();Wq();jP();Mq();Jq();Yq();Xq();Zq();Qq();eJ();tJ();rJ();oJ();mv();nJ();NP();sJ();iJ();aJ();fv();lJ();hJ();SJ();PJ();AJ();oo();xl();vp();_v();TJ();xp();CJ();IJ();LJ()});var wv=l(()=>{"use strict";Bd()});var WJ,OJ=l(()=>{"use strict";WJ=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.is_error!==!0)return null;let i=typeof s.result=="string"&&s.result.trim().length>0?s.result.trim():typeof s.subtype=="string"?`Claude CLI error: ${s.subtype}`:"Claude CLI returned an error without a message.",a=i.startsWith("Claude CLI")?i:`Claude CLI: ${i}`;return a.length>400?`${a.slice(0,397)}...`:a}});var uge,jJ,MJ=l(()=>{"use strict";wv();uge=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,jJ=e=>{let t=Ms(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(uge)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var DJ,pge,mge,sr,gge,fge,NJ,GP,HJ,yge,ir,FJ,$J,zJ,Or=l(()=>{"use strict";wv();OJ();MJ();DJ=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),pge=/usage limit|monthly (usage |spend )?limit|spend limit|hit your (org's |usage )?(monthly )?(usage |spend )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit|too many requests|\b429\b/i,mge=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,sr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(pge.test(e.errorMessage))return"usage_limit";if(mge.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},gge="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",fge="The writer waited on terminal input and did not return a prompt.",NJ=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|spend limit|insufficient credit|rate limit|too many requests|billing|subscription required|API Error: \d{3}/i,GP=e=>{let t=e.trim();if(t.length===0||t.length>=500||!NJ.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>NJ.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},HJ=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},yge=e=>GP(e.stdout)??GP(e.stderr)??(HJ(e.replyFile)?GP(e.replyFile):null),ir=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return gge;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?fge:null},FJ=e=>{let t=e.trim();return t.length===0?null:ir(t)!==null?t:GP(t)??(HJ(t)?t:null)},$J=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],zJ=e=>{let t=e.replyFileText?.trim()??"",r=ir([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=yge({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=sr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=jJ([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=WJ(e.stdout);if(i!==null){let c=sr({errorMessage:i});return c===void 0?{ok:!1,errorMessage:i}:{ok:!1,errorMessage:i,errorKind:c}}let a=Ms(e.stdout);if(a!==null&&a.text.trim().length>0)return{ok:!0,text:a.text,tokens:a.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var hge,BJ,UJ,Ai,KP=l(()=>{"use strict";Or();hge=400,BJ=(e,t=hge)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},UJ=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:FJ(e.promptText)},Ai=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:UJ(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=UJ(e.revisions[n]);if(s!==null)return s.trim()}return null}});var F,Sge,VP,Te,_i,KJ,GJ,VJ,qJ,qe=l(()=>{"use strict";F="manual",Sge=["claude-cli","codex","cursor","antigravity"],VP={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Te=e=>e===F?"You":e in VP?VP[e]:e,_i=e=>Sge.filter(t=>e.includes(t)),KJ=e=>{let t=_i(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},GJ=(e,t)=>t===F?F:e.find(r=>r===t)??null,VJ=(e,t,r)=>{let o=_i(e),n=GJ(o,t),s=GJ(o,r);return n===null||s===null?null:{judge:n,improver:s}},qJ=(e,t,r)=>{let o=_i(e);return t===null||t.trim()===""?r!==F?r:o[0]??null:t===F?null:o.find(n=>n===t)??null}});var JJ,qP,Ev,bi,Tv,Gt,Fo,Oe,bt=l(()=>{"use strict";JJ=p(require("node:fs")),qP=p(require("node:os")),Ev=p(require("node:path"));Jr();bi="~",Tv=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Gt=e=>{let t=qP.default.homedir(),r=Tv(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Fo=e=>{let t=e.trim().length===0?"~":e.trim(),r=He(t),o=Ev.default.isAbsolute(r)?Tv(r):Tv(Ev.default.resolve(qP.default.homedir(),r));try{if(!JJ.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}return{ok:!0,path:o,display:Gt(o)}},Oe=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:qP.default.homedir()});var Ct,Dn=l(()=>{"use strict";Ct='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Cv,YJ,Pge,XJ,ZJ,Iv=l(()=>{"use strict";j();qe();bt();Dn();Cv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YJ=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Pge=e=>{let t=YJ(e.state),r=`<h2>${Cv(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Cv(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ct}</button></div><template>${r}</template></li>`},XJ=e=>{let t=e.wizard;if(t===void 0)return"";let r=HP({status:e.status,wizard:t,writerLabel:Te(e.judgeModel),runnerLabel:Te(e.runnerModel??e.judgeModel),folderDisplay:Gt(Oe(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this computer">${r.map(Pge).join("")}</ol>`},ZJ=e=>{let t=e.wizard;if(t===void 0)return"";let r=HP({status:e.status,wizard:t,writerLabel:Te(e.judgeModel),runnerLabel:Te(e.runnerModel??e.judgeModel),folderDisplay:Gt(Oe(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this computer</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${YJ(n.state)}<span class="sdlc-pipeline-label">${Cv(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var jr,QJ,e4,t4,Lv=l(()=>{"use strict";j();jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QJ="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",e4=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jr(QJ)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${jr(i.name)}}}</strong> \u2014 ${jr(i.description)} (sample: ${jr(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${jr(r)}</pre>`,n=vr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${jr(n)}</pre>`;return`${t}${o}${s}`},t4=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${jr(QJ)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${jr(n.name)}}}</strong> \u2014 ${jr(n.description)} (sample: ${jr(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${jr(r)}</pre>`;return`${t}${o}`}});var Op,vv=l(()=>{"use strict";Op=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var r4,o4=l(()=>{"use strict";j();r4=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=mi({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=pi({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var xv,jp,Wv=l(()=>{"use strict";Dn();o4();xv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jp=e=>{let t=r4(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${xv(r)}">${Ct}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${xv(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${xv(t)}</pre></template>`}});var Ov,Mp,jv=l(()=>{"use strict";Dn();Ov=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mp=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${Ov(r)}">${Ct}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${Ov(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Ov(t)}</pre></template>`}});var JP,jl,Mv=l(()=>{"use strict";vv();Wv();jv();JP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jl=e=>{let t=Op(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${JP(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,u=e.cycle.revisions.map(m=>{let g=m.judgement?.score,y=g==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${g}`,h=m.judgement?.reasons?.trim()??"",S=h.length===0?"":`<br><span class="muted">${JP(h)}</span>`,w=Mp({roundLabel:d(m.roundNumber),promptText:m.promptText}),I=jp({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),f=`${w}${I}`;if(e.interactive){let k=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${k}> <span class="sdlc-wizard-revision-title">${JP(y)}</span></label>${f}${S}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${JP(y)}</span>${f}${S}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var Nv,n4,s4,i4,Dv=l(()=>{"use strict";Nv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n4=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Nv(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Nv(t.prompt)}</pre></li>`).join("")}</ol>`,s4=e=>n4([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),i4=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Nv(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${n4(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Np,Age,YP,Hv=l(()=>{"use strict";j();Dv();Np=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Age=e=>{let t=e.wizard;return t===void 0?"":xr({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},YP=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Age(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Np(n.orchestratorSkill.fileName)}</code> \u2014 ${Np(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Np(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=s4(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Np(r)} <span class="muted">${Np(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var it,_ge,bge,Rge,kge,XP,wge,Ege,Tge,Cge,Ige,Lge,Ml,ZP=l(()=>{"use strict";j();Iv();Lv();Mv();Wv();jv();Hv();it=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_ge={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},bge=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${it(o)}</pre>`:`<p class="sdlc-pre-preview mono">${it(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${it(o)}</pre></details>`;return`<h2>${it(e)}</h2>${n}`},Rge=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=vr(t).trim(),n=xr({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!N(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${bge("What is being evaluated",i)}`},kge=(e,t)=>{let r=e.wizard;if(r===void 0||N(e.status))return"";let o=_ge[t];return o===void 0||r.phase!==o?"":ZJ(e)},XP=(e,t,r)=>{let o=kge(e,t),n=t==="wizard-2"?Rge(e):"";return`${o}${n}${r}`},wge=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},Ege=e=>{let t=e.wizard;return t===void 0?"":e4(t)},Tge=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${it(a)}</span>`,d=`Round ${n.roundNumber}`,u=Mp({roundLabel:d,promptText:n.promptText}),m=jp({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${it(s)}${i}</span>${u}${m}${c}</li>`}).join("")}</ul>`,Cge=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return jl({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=wge(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Tge(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=xr({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${it(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,m=Mp({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),g=jp({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${it(u)}</span>${m}${g}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${it(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},Ige=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${it(n.title)}</strong> <span class="muted">(${it(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${it(o.title)}</strong>${n}${it(s)}${YP(e,o)}</li>`}).join("")}</ul>`},Lge=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${it(i)}</span> <strong>${it(n.title)}</strong>${it(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${it(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?jl({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ml=(e,t)=>{switch(t){case"wizard-1":return XP(e,t,Ege(e));case"wizard-2":return XP(e,t,Cge(e));case"wizard-3":return XP(e,t,Ige(e));case"wizard-4":return XP(e,t,Lge(e));default:return""}}});var vge,xge,a4,l4,c4=l(()=>{"use strict";j();KP();Or();ZP();vge=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},xge=e=>{let t=e.goal.trim();return t.length===0?null:t},a4=(e,t,r,o,n)=>{let s=ir(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},l4=(e,t)=>{let r=xge(e);if(t.id.startsWith("wizard-")){let s=Ml(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=fp(e,t);if(s!==null){let a=Ai(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=xe(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:a4(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:vge(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:a4(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Ri,d4,u4=l(()=>{"use strict";Ri=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d4=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Ri(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Ri(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Ri(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Ri(n)}</h2><pre class="mono">${Ri(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Ri(e.goal)}</dd></div></dl>`;return`<h2>${Ri(e.title)}</h2>${i}${t}${r}${o}${s}`}});var Wge,p4,Dp,Fv,QP=l(()=>{"use strict";j();Wge=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),p4=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||N(e.status))return null;let r=Ir(t);return r<0||r>3?null:`wizard-${r+1}`},Dp=(e,t)=>Wge.has(t)?p4(e)===t:!1,Fv="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var Oge,eA,$v=l(()=>{"use strict";Oge='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',eA=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${Oge}</button>`});var ki,tA=l(()=>{"use strict";j();ki=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:up({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:mp(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var jge,m4,Mge,zv,g4,Nge,Dge,Hge,Fge,f4,y4=l(()=>{"use strict";j();tA();jge={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},m4=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},Mge=e=>jge[e]??null,zv=(e,t)=>{let r=e.wizard,o=Mge(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Ir(r);return o<n||o===n},g4=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},Nge=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:vr(t).trim();return o.length===0?null:Ap({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:m4(e,"generalize")})},Dge=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=ki(e);return n===null?null:Mn({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=g4(e)?.promptText.trim()??xr({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:mi({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},Hge=e=>{let t=e.wizard;if(t===void 0)return null;let r=xr({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:_p({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:m4(e,"separate")})},Fge=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Ho(t),s=fi(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=ki(e);return c===null?null:Mn({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=g4(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||N(e.status)&&i?.judgement!==null)?pi({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):bp({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:gi(t,r).output,moduleTitle:o.title})},f4=(e,t)=>{if(!zv(e,t))return null;switch(t){case"wizard-1":return Nge(e);case"wizard-2":return Dge(e);case"wizard-3":return Hge(e);case"wizard-4":return Fge(e);default:return null}}});var $ge,rA,Uv=l(()=>{"use strict";j();$ge=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},rA=(e,t)=>{let r=e.wizard,o=$ge(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Ir(r);return o<n?"done":o===n&&N(e.status)&&e.status==="failed"?"failed":o<=n&&N(e.status)?"done":"pending"}});var zge,Nl,oA=l(()=>{"use strict";Dn();y4();Uv();zge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nl=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(rA(e,t)==="pending")return""}else if(!zv(e,t))return"";let o=f4(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ct}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${zge(o)}</pre></template>`}});var wi,$o,Dl=l(()=>{"use strict";wi=e=>e.toLocaleString("en-US"),$o=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var so,Uge,h4,nA,S4,P4,sA=l(()=>{"use strict";j();c4();u4();QP();$v();Dn();KP();Iv();oA();Dl();so=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Uge=(e,t)=>{let r=fp(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?$o(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${wi(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${so(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${so(r)}</span>`:"",d=d4(l4(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&N(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${so(e.id)}"`:"",m=Dp(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${so(Fv)}"><input type="hidden" name="cycleId" value="${so(t.id)}"><input type="hidden" name="wizardStepId" value="${so(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",g=e.state==="active"&&e.id.startsWith("wizard-")?XJ(t):"",y=o?"failed":e.state,h=o?Ai(t):null,S=h!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ct}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${so(h)}</pre></template>`:"",w=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Nl(t,e.id):"";return`<li class="sdlc-node sdlc-node-${y}" data-sdlc-step-id="${so(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${so(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${w}${S}</div></div>${g}<template>${d}</template></li>`},h4=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>Uge(r,t)).join("")}</ol>`,nA=e=>`<div class="sdlc-score" aria-label="What the score means">${gp(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${so(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,S4=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${eA({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,P4=`<script>
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
</script>`});var iA,aA,lA,A4,Bv=l(()=>{"use strict";iA="support-reply",aA="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",lA=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),A4=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var cA,Gv,Kv=l(()=>{"use strict";j();sA();Bv();cA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gv=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${nA(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this computer</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${cA(aA)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${cA(lA)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${cA(A4)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${cA(iA)}">Run this sample</a>
      </div>
    </section>`});var Vv,dA,Bge,_4,b4=l(()=>{"use strict";Vv=p(require("node:fs")),dA=p(require("node:path")),Bge=e=>dA.default.join(dA.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),_4=(e,t)=>{let r=Bge(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Vv.default.mkdirSync(dA.default.dirname(r),{recursive:!0}),Vv.default.appendFileSync(r,o,"utf8")}});var Hl,R4,Gge,k4,Kge,w4,io,me,E4,X,Kt=l(()=>{"use strict";Hl=p(require("node:fs")),R4=p(require("node:path"));j();b4();Gge=e=>e.wizard===void 0?e:{...e,wizard:XL(e.wizard)},k4=new Set,Kge=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),w4=(e,t)=>{Hl.default.mkdirSync(R4.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Hl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Hl.default.renameSync(r,e)},io=e=>{if(!Hl.default.existsSync(e))return[];try{let t=JSON.parse(Hl.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Kge).map(Gge):[]}catch{return[]}},me=(e,t)=>io(e).find(r=>r.id===t)??null,E4=(e,t)=>{k4.add(t);let r=io(e).filter(o=>o.id!==t);w4(e,r)},X=(e,t)=>{if(k4.has(t.id))return;let r=io(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];w4(e,o),_4(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var Fl,ao,Hp,T4,uA,Vge,C4,I4,L4,qv=l(()=>{"use strict";Fl=p(require("node:fs")),ao=p(require("node:path")),Hp=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},T4=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),uA=(e,t)=>{let r=Hp(e);return r.length>0?r:Hp(t)},Vge=e=>{let t=uA(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${T4(o)}`,...n.length>0?[`description: ${T4(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},C4=e=>`.cursor/skills/${e}/SKILL.md`,I4=(e,t)=>{let r=Hp(t);if(r.length===0)return!1;let o=ao.default.resolve(e),n=ao.default.resolve(o,".cursor","skills"),s=ao.default.resolve(o,C4(r));return s.startsWith(`${n}${ao.default.sep}`)?Fl.default.existsSync(s):!1},L4=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(uA(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=ao.default.resolve(e.workingDirectory);try{if(!Fl.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Vge({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=C4(r.slug),n=ao.default.resolve(t,".cursor","skills"),s=ao.default.resolve(t,o);if(!s.startsWith(`${n}${ao.default.sep}`))return{ok:!1,errorCode:"path"};if(Fl.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Fl.default.mkdirSync(ao.default.dirname(s),{recursive:!0}),Fl.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var qge,v4,x4,W4=l(()=>{"use strict";j();Kt();bt();Or();qv();qge=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,v4=e=>{let t=e.get("savedSkill");return t!==null&&qge.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this computer.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this computer.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},x4=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=me(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!N(r.status))return{kind:"redirect",location:o("skillError=working")};let n=xe(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||ir(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=L4({workingDirectory:Oe(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var pA,mA,Fp=l(()=>{"use strict";j();pA=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=no({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},mA=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var Hn,$p=l(()=>{"use strict";j();Fp();Hn=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=yv(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=UP({moduleCount:o.length,existing:e.costControls,writerId:n}),i=pA(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Ip(r.variables)},updatedAt:new Date().toISOString()}}});var Fn,zp=l(()=>{"use strict";Fn=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var gA=l(()=>{"use strict";Pr();Zu();Bd()});var Jv,O4,fA,j4,M4=l(()=>{"use strict";Jv={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},O4=e=>e.exitCode===null&&e.signalCode===null,fA=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!O4(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!O4(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),j4=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),fA(e).then(s=>{r({...Jv,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var N4,Jge,Yv,Yge,D4,H4=l(()=>{"use strict";N4=/please visit the url to log in|paste the authorization code|waiting for authentication|authentication timed out|accounts\.google\.com\/o\/oauth2/i,Jge=/authentication required|not logged in|login required|please run .{1,40}\blogin\b|authentication failed or timed out/i,Yv=e=>{if(N4.test(e.stderr)||Jge.test(e.stderr))return!0;let t=e.stdout.match(new RegExp(N4.source,"gi"));return new Set((t??[]).map(r=>r.toLowerCase())).size>=2},Yge={antigravity:{label:"Antigravity CLI",command:"agy"},"claude-cli":{label:"Claude CLI",command:"claude"},codex:{label:"Codex CLI",command:"codex login"},cursor:{label:"Cursor CLI",command:"cursor-agent login"}},D4=e=>{let t=Yge[e];return`${t.label} isn't signed in on this computer. Open Terminal, run \`${t.command}\` once and finish sign-in, then retry.`}});var F4,Up,$4,Xv,Xge,Qv,ex,Zge,Qge,efe,z4,tfe,Zv,U4,Bp,B4,rfe,ofe,It,Ei=l(()=>{"use strict";F4=require("node:child_process"),Up=p(require("node:fs")),$4=p(require("node:os")),Xv=p(require("node:path"));gA();M4();H4();Or();Xge=["claude-cli","codex","cursor","antigravity"],Qv=18e4,ex=6e5,Zge=12e4,Qge=9e5,efe="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",z4="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",tfe="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",Zv=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},U4=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=Zv(process.env[z4])??Math.max(r,ex));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:Zv(process.env[tfe])??Qge;return Math.min(o,Math.max(Zge,r))},Bp=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?Zv(process.env[z4])??ex:Qv,B4=e=>`The writer timed out after ${e}ms.`,rfe=e=>Xge.includes(e),ofe=e=>e===!0||process.env[efe]==="1",It=e=>new Promise(t=>{if(e.signal?.aborted){t(Jv);return}if(ofe(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!rfe(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this computer."});return}let r=e.writerAgent,o=er(r,e.prompt,we({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Up.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this computer."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:Qv,s=Xv.default.join(Up.default.mkdtempSync(Xv.default.join($4.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=$J({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,F4.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};j4(u,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason!=="auth"&&(d.stopReason="timeout",fA(u).then(S=>{m({ok:!1,errorMessage:B4(n),errorKind:"writer_timeout",killSignal:S})}))},n);let g={ok:!1,errorMessage:D4(r),errorKind:"action_required"},y=()=>({stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8")}),h=()=>{d.settled||d.stopReason!==null||Yv(y())&&(d.stopReason="auth",fA(u).then(S=>{m({...g,killSignal:S})}))};u.stdout.on("data",S=>{a.push(Buffer.from(S)),h()}),u.stderr.on("data",S=>{c.push(Buffer.from(S)),h()}),u.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",(S,w)=>{if(d.settled)return;if(d.stopReason==="auth"){m({...g,killSignal:w==="SIGKILL"?"SIGKILL":"SIGTERM"});return}let I=Up.default.existsSync(s)?Up.default.readFileSync(s,"utf8"):null,f=y();if(d.stopReason===null&&Yv(f)){m(g);return}let k=zJ({writerAgent:r,...f,replyFileText:I});if(k.ok&&d.stopReason!=="abort"){m(k);return}d.stopReason===null&&m(k)})})});var nfe,Gp,tx=l(()=>{"use strict";j();Dl();nfe=e=>{if(e.wizard!==void 0){let t=kp(e.wizard),r=$o(e);return(t??0)+r}return $o(e)},Gp=e=>{let t=Rv({costControls:e.costControls,spentTokens:nfe(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var G4,sfe,Kp,yA,hA=l(()=>{"use strict";j();qe();tx();G4=e=>e===F?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},sfe=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Kp=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=HL({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:G4(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?kv({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:mp(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=sfe(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Gp({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Gp({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},yA=(e,t,r=null)=>{let o=IP({raw:t,judge:G4(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var SA,rx=l(()=>{"use strict";SA=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var q4,PA,AA,K4,V4,ox,ife,J4,nx,afe,Y4,lfe,cfe,X4,Z4=l(()=>{"use strict";q4=require("node:child_process"),PA=p(require("node:fs")),AA=p(require("node:path"));oS();j();K4=4e3,V4=12e3,ox=(e,t)=>{let r=(0,q4.spawnSync)("git",[...t],{cwd:e,env:In(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},ife=e=>ox(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",J4=e=>{let t=ox(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},nx=(e,t)=>{let r=AA.default.resolve(e,t),o=AA.default.relative(e,r);if(o.startsWith("..")||AA.default.isAbsolute(o)||!PA.default.existsSync(r)||!PA.default.statSync(r).isFile())return null;let n=PA.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>K4?`${n.slice(0,K4)}
\u2026truncated`:n},afe=e=>e.length>V4?`${e.slice(0,V4)}
\u2026truncated`:e,Y4=e=>{let t=zL(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,nx(e.workingDirectory,n)])),o=ife(e.workingDirectory);return{git:o,status:o?J4(e.workingDirectory):{},files:r,paths:t}},lfe=(e,t)=>{let r=ox(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=nx(e,t);return o===null?`${t} is missing.`:o},cfe=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",X4=e=>{let t=e.before.git?J4(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=nx(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>lfe(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:cfe(e.before.git,e.before.paths.length>0),evidence:afe(i.join(`

`))}}});var ax,le,lx,at,Q4,dfe,ufe,eY,$l,tY,zl,pfe,mfe,Vp,sx,ix,gfe,rY,ffe,yfe,hfe,oY,Sfe,nY,sY,Pfe,Afe,iY,aY=l(()=>{"use strict";ax=require("node:child_process"),le=p(require("node:fs")),lx=p(require("node:os")),at=p(require("node:path"));oS();Q4=8e6,dfe=16e6,ufe=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],eY=(e,t)=>{let r=(0,ax.spawnSync)("git",[...t],{cwd:e,env:In(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},$l=(e,t)=>(0,ax.spawnSync)("git",[...t],{cwd:e,env:In(),timeout:8e3}).status===0,tY=e=>{let t=eY(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},zl=(e,t)=>{let r=at.default.resolve(e,t),o=at.default.relative(e,r);return o.startsWith("..")||at.default.isAbsolute(o)?null:r},pfe=(e,t)=>{let r=zl(e,t);if(r===null||!le.default.existsSync(r))return null;let o=le.default.statSync(r);return!o.isFile()||o.size>Q4?null:le.default.readFileSync(r)},mfe=(e,t,r)=>{let o=zl(e,t);o!==null&&(le.default.mkdirSync(at.default.dirname(o),{recursive:!0}),le.default.writeFileSync(o,r))},Vp=(e,t)=>{let r=zl(e,t);r===null||!le.default.existsSync(r)||le.default.rmSync(r,{recursive:!0,force:!0})},sx=(e,t)=>$l(e,["cat-file","-e",`HEAD:${t}`]),ix=e=>{let t=eY(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},gfe=e=>at.default.resolve(e)!==at.default.resolve(lx.default.homedir()),rY=e=>{if(!le.default.existsSync(e))return 0;let t=le.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?le.default.readdirSync(e).reduce((r,o)=>r+rY(at.default.join(e,o)),0):0},ffe=(e,t,r)=>{let o=zl(e,r);if(o===null||!le.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(rY(o)>dfe)return{relativePath:r,existed:!0,copyDir:null};let n=at.default.join(t,"cache",r);return le.default.mkdirSync(at.default.dirname(n),{recursive:!0}),le.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},yfe=400,hfe=32e6,oY=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!le.default.existsSync(s)))for(let i of le.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=at.default.join(s,i),c=le.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>Q4)){if(t.length>=yfe||r+c.size>hfe){o=!1;return}r+=c.size,t.push(at.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},Sfe=(e,t,r)=>{let o=zl(e,r);if(o===null||!le.default.existsSync(o))return null;let n=pfe(e,r);if(n===null)return"skip";let s=at.default.join(t,"files",r);return le.default.mkdirSync(at.default.dirname(s),{recursive:!0}),le.default.writeFileSync(s,n),s},nY=e=>{let t=le.default.mkdtempSync(at.default.join(lx.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?tY(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:oY(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,Sfe(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?ix(e.workingDirectory):null,isolateCaches:gfe(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:ufe.map(i=>ffe(e.workingDirectory,t,i))}},sY=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Vp(e.workingDirectory,t);return}mfe(e.workingDirectory,t,le.default.readFileSync(r))}},Pfe=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?sY(e,t):sx(e.workingDirectory,t)?$l(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Vp(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&sx(e.workingDirectory,t)&&$l(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!sx(e.workingDirectory,t)&&$l(e.workingDirectory,["reset","-q","HEAD","--",t])},Afe=(e,t)=>{let r=zl(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Vp(e.workingDirectory,t.relativePath),le.default.mkdirSync(at.default.dirname(r),{recursive:!0}),le.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Vp(e.workingDirectory,t.relativePath);return}if(le.default.existsSync(r))for(let o of le.default.readdirSync(r)){let n=at.default.join(r,o);le.default.statSync(n).mtimeMs>=e.startedMs-1e3&&le.default.rmSync(n,{recursive:!0,force:!0})}}}},iY=e=>{try{if(e.git){if(ix(e.workingDirectory)!==e.head&&(!(e.head===null?$l(e.workingDirectory,["update-ref","-d","HEAD"]):$l(e.workingDirectory,["reset","--hard",e.head]))||ix(e.workingDirectory)!==e.head))throw new Error("head");let r=tY(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Pfe(e,o)}else{if(e.complete)for(let t of oY(e.workingDirectory).paths)e.files[t]===void 0&&Vp(e.workingDirectory,t);for(let t of Object.keys(e.files))sY(e,t)}for(let t of e.caches)Afe(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{le.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var qp,_A,_fe,bfe,Rfe,kfe,wfe,lY,Efe,cY,dY=l(()=>{"use strict";j();hA();rx();Z4();aY();qe();bt();Or();Ei();qp=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),_A=e=>({...e,status:"stopped",errorMessage:ui,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),_fe=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),bfe=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==F?t:e.improverModel!==F?e.improverModel:null}return e.judgeModel!==F?e.judgeModel:e.improverModel!==F?e.improverModel:null},Rfe=async e=>{let t=Oe(e.cycle),r=Y4({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=nY({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?bp({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:gi(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):pp({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=U4({promptText:e.revision.promptText,isModuleRun:i}),c=Bp({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await It({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=u.ok?X4({workingDirectory:t,before:r,writerReply:u.text}):null,g=iY(o),y={...e.cycle,revisions:e.cycle.revisions.map(h=>h.roundNumber===e.cycle.currentRound?d:h)};return u.ok?!g.ok||m===null?{ok:!1,cycle:qp(y,g.ok?"Could not put the folder back after the run.":g.errorMessage)}:{ok:!0,cycle:y,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:_A(y)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:qp(y,u.errorMessage,sr(u))})},kfe=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:Rfe({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),wfe=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),lY=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await It({writerAgent:e.reviewer,workingDirectory:Oe(e.cycle),prompt:$L({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:_A(e.cycle)}:sr(o)==="action_required"?{kind:"stopped",cycle:qp(e.cycle,o.errorMessage,"action_required")}:{kind:"suggestion",text:"",tokens:null}},Efe=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===F)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await It({writerAgent:t.judgeModel,workingDirectory:Oe(t),prompt:mi({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Kp(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?_A(o):(e.onWriterFailure?.(t.judgeModel),qp(o,n.errorMessage,sr(n)))},cY=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Efe(e);let o=bfe(t),n=await kfe({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?_fe(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===F){let u=await lY({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...wfe(s,u.text),judgePhase:void 0}}let i=await It({writerAgent:t.judgeModel,workingDirectory:Oe(t),prompt:pi({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?_A(s):(e.onWriterFailure?.(t.judgeModel),qp(s,i.errorMessage,sr(i)));let a=await lY({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Kp(s,i.text,c);return SA(d,a.text)}});var bA,Tfe,Cfe,cx,uY=l(()=>{"use strict";j();hA();dY();tA();Or();qe();tx();bt();Ei();bA=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Tfe=e=>({...e,status:"stopped",errorMessage:ui,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),Cfe=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?Tfe(e):(n?.(r),bA(e,t.errorMessage,sr(t))),cx=async(e,t,r,o)=>{let n=Gp(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return bA(e,"This round has no prompt.");if(e.status==="judging")return cY({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return bA(e,"This cycle is waiting on a step this computer cannot run.");if(e.improverModel===F)return e;let i=ki(e);if(i===null)return bA(e,"The improver needs the score and the reason.");let a=await It({writerAgent:e.improverModel,workingDirectory:Oe(e),prompt:Mn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Bp()}),c=Cfe(e,a,e.improverModel,r,t);return c!==null?c:yA(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Jp,dx,Ife,mY,pY,Lfe,vfe,RA,gY,fY,xfe,Wfe,Ti,yY,hY,Yp=l(()=>{"use strict";j();$p();zp();qe();bt();Or();Ei();uY();vv();Jp=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),dx=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Jp(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},Ife=e=>{let t=sr(e);return DJ(e)||t==="usage_limit"||t==="action_required"},mY=(e,t,r)=>Ife(r)?Jp(e,r.errorMessage,sr(r)):dx(e,t,r.errorMessage),pY=e=>{let t=e.wizard;return t===void 0||Op(e).length===0?e:{...e,wizard:Ll({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},Lfe=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",vfe=e=>{let t=e.wizard;if(t===void 0)return e;let r=Rp({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ll({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},RA=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),gY=e=>e.judgeModel!==F?e.judgeModel:e.improverModel!==F?e.improverModel:null,fY=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},xfe=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=gY(e);if(n===null)return Jp(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??vr(o),i=Ap({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:fY(e,"generalize")}),a=await It({writerAgent:n,prompt:i,workingDirectory:Oe(e),signal:t});if(!a.ok)return r?.(n),mY(e,"generalize",a);try{let c=dv(a.text),d=Ll({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Ip(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return wp(d)?Ti({...u,wizard:{...d,gate:null}}):RA(u,"generalize")}catch(c){return dx(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},Wfe=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=gY(e);if(n===null)return Jp(e,"Choose a writer to suggest splits.");let s=xr({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=_p({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:fY(e,"separate")}),a=await It({writerAgent:n,prompt:i,workingDirectory:Oe(e),signal:t});if(!a.ok)return r?.(n),mY(e,"separate",a);try{let c=uv(a.text),d=ev(c,o.variables),u=Ll({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:u};return Tp(d)?Hn(m,d[0]):RA(m,"separate")}catch(c){return dx(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Ti=e=>{let t=e.wizard;if(t===void 0)return e;let r=vr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},yY=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Jp(e,"This module is missing.");let n=Ho(r),s=fi(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==F?e.runnerModel:e.judgeModel!==F?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:Ee(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},hY=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return cx(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return xfe(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return Wfe(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await cx(e,t,r,o);if(N(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Op(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=xe(s.revisions.map(g=>({roundNumber:g.roundNumber,promptText:g.promptText,score:g.judgement?.score??0,reasons:g.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Ep({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=pY(RA(a,i));return Fn(u)}let c=RA(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=ov({wizard:{...c.wizard,modules:c.wizard.modules.map((m,g)=>g===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:Lfe(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?pY(d):vfe(d)}return s}return n.phase==="complete",e}});var Ul,kA=l(()=>{"use strict";j();qe();Ul=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:av(r,e.judgeModel===F),updatedAt:new Date().toISOString()}}});var Bl,wA=l(()=>{"use strict";Bl=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var ar,SY,Ofe,PY=l(()=>{"use strict";j();bt();wA();Or();qv();ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SY=e=>{if(!N(e.status))return"";let t=xe(e.revisions.map(g=>({roundNumber:g.roundNumber,promptText:g.promptText,score:g.judgement?.score??null,reasons:g.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=ir(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${ar(t.reasons.trim())}</p>`,i=e.status==="passed",a=Bl(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${ar(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${ar(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${ar(n)}</div>`:i?Ofe({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Oe(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${ar(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${ar(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${u}</section>`},Ofe=e=>{let t=e.sourceSkill?.fileName??Hp(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=uA(t,r),s=n.length>0&&I4(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${ar(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${ar(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${ar(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${ar(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${ar(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${ar(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var AY,_Y=l(()=>{"use strict";AY=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var bY,jfe,EA,Lt,TA,ux=l(()=>{"use strict";j();qe();_Y();KP();Or();wA();bY=["Generalize","Evaluate","Separate","Optimize modules"],jfe=e=>{let t=Ir(e),r=t>=0&&t<bY.length?bY[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},EA=(e,t)=>{let r=Ai(e),o=r===null?null:AY(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Lt=(e,t)=>({title:e,detail:t,replyPreview:null}),TA=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=Ai(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:BJ(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!N(e.status)){let t=e.judgeModel;return Lt(`${Te(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this computer.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!N(e.status)){let t=e.judgeModel;return Lt(`${Te(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this computer.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===F?Lt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Lt(`${Te(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Lt(`${Te(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===F){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==F?Lt(`${Te(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Lt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this computer can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Lt(`${Te(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=Ee(t);return Lt(`${Te(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Lt(`${Te(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=Ee(t);return Lt(`${Te(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Lt(`${Te(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===F){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Lt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Lt(`${Te(e.improverModel)} is rewriting the prompt.`,"That writer is working on this computer. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>ir(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=_e(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||N(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?EA(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=Bl(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?EA(e,{title:`${jfe(r)}${s}`,detail:t.length>0?t:n}):EA(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(N(e.status)){let t=e.errorMessage?.trim()??"";return EA(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this computer.",detail:"This panel keeps updating.",replyPreview:null}}});var lo,Xp=l(()=>{"use strict";qe();lo=e=>{if(e.status==="improving"&&e.improverModel===F)return!0;if(e.status!=="judging"||e.judgeModel!==F)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===F}});var RY,kY=l(()=>{"use strict";RY=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var $n,Mfe,wY,EY=l(()=>{"use strict";j();$n=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mfe=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${$n(r)}</p>`},wY=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${$n(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${$n(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${$n(a)}.</p>`}<pre class="mono">${$n(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Nn(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${$n(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",m=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${$n(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${Mfe(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${$n(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Zp,Nfe,TY,CY=l(()=>{"use strict";j();Or();Zp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nfe=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=ir(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Zp(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Zp(i)}.</p>`}<pre class="mono">${Zp(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Nn(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${Zp(d)}</pre>`:`<div class="alert-error">${Zp(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},TY=e=>e.revisions.map(t=>Nfe(e,t)).join("")});var IY,LY=l(()=>{"use strict";j();IY=e=>{if(N(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var co,Dfe,px,Hfe,Ffe,$fe,zfe,vY,xY,mx=l(()=>{"use strict";LY();co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dfe="Stop this run? Writers will stop and the best prompt is kept.",px="End the wizard? Writers will stop and progress from finished steps is kept.",Hfe="Skip this module and pause at the step gate?",Ffe=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${co(Dfe)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${co(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,$fe=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${co(px)}"><input type="hidden" name="cycleId" value="${co(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,zfe=e=>{let t=co(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${co(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${co(Hfe)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${co(px)}">End wizard</button>
    </form>
  </div>`},vY=e=>{let t=IY(e);return t==="none"?"":t==="legacy_stop"?Ffe(e.id):t==="wizard_end_only"?$fe(e.id):zfe(e)},xY=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=co(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${co(px)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var WY,OY=l(()=>{"use strict";j();Dl();WY=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=_e(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${wi(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${wi(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${Ee(r)}`}return""}});var Ufe,Bfe,jY,Gfe,MY,NY=l(()=>{"use strict";j();OY();Uv();ZP();oA();Ufe=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',Bfe=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',jY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gfe=(e,t,r)=>{let o=Ml(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=WY(e,t),i=rA(e,t),a=Ufe(i),c=Bfe(i),d=Nl(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${jY(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${jY(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",g=i==="failed"&&t!=="wizard-4"?" open":"",y=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${y}"${m}${g}><summary aria-controls="${y}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${y}-body">${o}</div></details>`},MY=e=>{let t=e.wizard;if(t===void 0||!N(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>Gfe(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var DY,HY,FY=l(()=>{"use strict";DY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HY=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${DY(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${DY(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var gx,$Y,fx=l(()=>{"use strict";gx=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,$Y=(e,t)=>{if(gx(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var zY,UY=l(()=>{"use strict";zY=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var CA,BY,GY=l(()=>{"use strict";j();fx();fx();UY();CA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),BY=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=_e(t),o=Ee(t),n=r.terminalStatusSuggestion==="passed"?"":zY(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,y=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",h=u===void 0?c.status:$Y(u,o),S=u!==void 0&&gx(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':h==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':h==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':CA(h);return`<tr${y}><td>${CA(c.title)}</td><td>${CA(m)}</td><td>${c.tokens??"\u2014"}</td><td>${S}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${CA(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Ci,IA,yx=l(()=>{"use strict";Ci=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IA=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Ci(r.fileName)}</code> \u2014 ${Ci(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Ci(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Ci(i.name)}</strong> <code>.cursor/skills/${Ci(i.fileName)}/SKILL.md</code></p><p class="muted">${Ci(i.description)}</p><p>${Ci(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var Kfe,KY,VY=l(()=>{"use strict";j();FY();GY();yx();Kfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KY=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!N(e.status)||t.modules.length===0)return"";let r=BY(e),o=HY(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=_e(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${Kfe(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${IA(e)}${a}${r}${o}</section>`}});var ce,LA=l(()=>{"use strict";j();ce={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var vA,hx=l(()=>{"use strict";vA=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var qY,JY=l(()=>{"use strict";LA();hx();qY=e=>{let t=vA({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:ce.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var zo,Qp=l(()=>{"use strict";zo=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var uo,xA,Sx=l(()=>{"use strict";j();sA();PY();ux();Xp();kY();tA();EY();CY();mx();NY();VY();Dl();JY();bt();Qp();uo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xA=e=>{let t=!N(e.status)&&e.status!=="wizard_paused"&&!lo(e),r=TA(e),o=h4(VL(RY(e)),e),n=N(e.status)?"":vY(e),s=MY(e),i=KY(e),a=SY(e),c=e.errorMessage===null?"":`<div class="alert-error">${uo(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?_e(e.wizard):null,g=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,y=!t&&e.wizard!==void 0&&N(e.status)&&(e.wizard.phase==="complete"||_e(e.wizard).passedModuleCount>0),h=y?g?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",S=y&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${uo(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:!t&&e.wizard!==void 0&&e.wizard.modules.length>0&&N(e.status)?`<p class="sdlc-run-success-actions"><a class="btn btn-secondary" href="/prompt-optimizer?cycle=${uo(e.id)}&amp;export=wizard-markdown">Download report (.md)</a></p>`:"",w=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${uo(r.replyPreview)}</pre>`,I=r.detail.length===0&&S.length===0&&w.length===0||r.detail.length===0&&w.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${uo(r.detail)}${u}</p>`}${w}</div>`,f=e.revisions.find(Be=>Be.roundNumber===e.currentRound),k=e.status==="improving"?ki(e):null,M=$o(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),W=lo(e)?wY({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:k?.promptText??f?.promptText??"",score:k?.score??f?.judgement?.score??null,reasons:k?.reasons??f?.judgement?.reasons??null,avoid:k?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:_?1:0}):"",O=e.wizard!==void 0&&e.wizard.phase==="complete"&&N(e.status),b=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",P=e.wizard!==void 0&&!O&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?Ee(e.wizard):e.passScore,C=b?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${nA(P)}</div>`:"",L=e.status==="failed"?qY({status:e.status,errorKind:e.errorKind}):null,be=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':N(e.status)?L!==null?`<span class="${L.badgeClass}">${L.badgeLabel}</span>`:O&&m!==null&&!g?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",te=t?d:y?g?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',de=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${uo(Gt(Oe(e)))}</li>`:"",M>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${wi(M)} so far</li>`:""].filter(Be=>Be.length>0),E=de.length===0?"":`<ul class="sdlc-run-meta">${de.join("")}</ul>`,R=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,v=O?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,D=O?"":C.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${v}</div>`:`<div class="sdlc-run-grid">${v}${C}</div>`,H=TY(e),$=e.wizard!==void 0&&N(e.status)&&e.revisions.every(Be=>Be.roundNumber===0&&(Be.judgement===void 0||Be.judgement===null)),q=H.length===0||$?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${H}</div></section>`,ye=`<p class="sdlc-run-goal" title="${uo(e.goal.trim())}">${uo(zo(e.goal))}</p>`,he=O?`${c}${i}${s}${W}${a}`:`${c}${D}${W}${s}${a}`,Ot='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',jt=O?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${uo(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Ot}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${be}</div>${ye}<div class="sdlc-run-activity${h}"${y?' role="status"':""}><div class="sdlc-run-activity-icon">${te}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${uo(r.title)}</h2>${I}${S}${jt}</div></div>${E}${R}</header>${he}</section>${q}`}});var YY,XY=l(()=>{"use strict";j();zp();YY=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Ep({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Fn(e)}});var ZY,QY=l(()=>{"use strict";j();Yp();ZY=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!wp(t)?e:Ti({...e,wizard:{...t,gate:null}})}});var e8,t8=l(()=>{"use strict";j();$p();e8=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Tp(t.splitOptions))return e;let r=t.splitOptions[0];return Hn(e,r)}});var Vfe,Ii,WA=l(()=>{"use strict";XY();QY();t8();Kt();Vfe=e=>{let t=ZY(e),r=YY(t);return e8(r)},Ii=(e,t)=>{let r=Vfe(t);return r!==t?(X(e,r),r):t}});var r8,Uo,em=l(()=>{"use strict";j();r8=e=>Bt.indexOf(e),Uo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||N(e.status)?Bt.length:t.gate!==null?r8(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?r8(t.phase):null}});var o8,n8=l(()=>{"use strict";o8=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Li,s8,i8=l(()=>{"use strict";j();n8();Li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s8=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=gi(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Li(o8(o))}</pre></div>`:"",s=yi(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Ho(t),a=s.map(c=>{let d=t.variables.find(h=>h.name===c),u=FP(c),m=i[c]??"",g=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Li(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Li(u)}">${Li(g)}</label>
        ${y}
        <input class="input" type="text" id="${Li(u)}" name="${Li(u)}" value="${Li(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var a8,l8=l(()=>{"use strict";a8={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var tm,qfe,je,zn=l(()=>{"use strict";l8();Dn();tm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qfe=e=>{let t=a8[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${tm(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ct}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${tm(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${tm(t.example)}</span></span></button>`},je=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${tm(r)}"`}>${tm(e)}</span>${qfe(t)}</span>`});var lr,c8,d8,u8=l(()=>{"use strict";j();Fp();LA();zn();lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c8=e=>{let t=e.costControls;if(t===void 0||Ol(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??Tt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${lr(ce.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${lr(t.softWarnMessage??hi)}</p>`:"",d=mA({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${lr(ce.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,m=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${lr(ce.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${lr(ce.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${lr(vl)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${lr(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${lr(ce.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${lr(ce.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${lr(ce.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${je(ce.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${je(ce.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${lr(ce.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${lr(ce.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},d8=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Ol(r)}});var Jfe,p8,m8=l(()=>{"use strict";Dn();Jfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p8=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Ct}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${Jfe(t)}</pre></template>`}});var rm,g8,f8=l(()=>{"use strict";j();Lv();i8();Mv();mx();yx();Hv();u8();m8();rm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g8=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(d8(e))return c8(e);let n=Ee(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?t4(r):"",a=o==="evaluate"?IA(e):"",c=o==="evaluate"?jl({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(P=>{let C=P.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',L=P.recommended?' <span class="sdlc-badge">Recommended</span>':"",be=r.selectedSplitOptionId===P.id||r.selectedSplitOptionId===null&&P.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${rm(P.id)}" required${be}> <strong>${rm(P.title)}</strong>${C}${L}</label>${YP(e,P)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],y=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",h=m?.title??"Module",S=m?.prompt??"",w=m?.status==="pending",I=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${rm(h)}</p>${w?s8({cycle:e,modulePrompt:S}):""}<p class="muted">Test run prompt preview: ${rm(fi(S,Ho(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${jl({cycle:e,interactive:!1,caption:w?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${h}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":w?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",k=kp(r),M=k===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${k}</p>`,_=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?p8(r.lastWriterParseFailureReply??""):"",W=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",O=t?.active===!0?" sdlc-wizard-gate-active":"",b=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${W}"`:"";return`<section class="card sdlc-wizard-gate${O}"${b}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${_}
    ${M}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${rm(e.id)}">
    ${i}
    ${a}
    ${c}
    ${u}
    ${I}
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
    ${xY(e)}
  </section>`}});var Yfe,y8,h8=l(()=>{"use strict";j();oA();Yfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),y8=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||N(e.status))return"";let r=(o,n)=>{let s=Nl(e,o);return`<h2 class="sdlc-wizard-active-head">${Yfe(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Px,S8,P8,Un,A8,Gl=l(()=>{"use strict";j();Kt();Px=new Map,S8=e=>{let t=new AbortController;return Px.set(e,t),t.signal},P8=e=>{Px.delete(e)},Un=e=>{Px.get(e)?.abort()},A8=(e,t)=>{let r=me(e,t);return r===null||r.wizard!==void 0?!1:(N(r.status)||(X(e,{...r,status:"stopped",errorMessage:ui,updatedAt:new Date().toISOString()}),Un(t)),!0)}});var _8,b8,Ax,R8,_x=l(()=>{"use strict";j();em();Gl();_8="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",b8=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Bt[r]??null},Ax=(e,t)=>{let r=b8(t);if(r===null||e.wizard===void 0)return!1;let o=Bt.indexOf(r);if(o===-1)return!1;let n=Uo(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Bt.length)},R8=(e,t)=>{let r=b8(t);if(r===null||e.wizard===void 0||!Ax(e,t))return e;Un(e.id);let o=Bt.slice(Bt.indexOf(r)),n=Pp(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var bx,k8,w8=l(()=>{"use strict";_x();bx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k8=(e,t)=>Ax(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${bx(_8)}"><input type="hidden" name="cycleId" value="${bx(e.id)}"><input type="hidden" name="wizardStepId" value="${bx(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var Xfe,E8,Zfe,T8,C8=l(()=>{"use strict";j();em();f8();h8();w8();ZP();Xfe={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},E8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zfe=(e,t,r)=>{let o=k8(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${E8(t)}">
  <summary class="sdlc-wizard-accordion-summary">${E8(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ml(e,t)}</div>
</details>`},T8=e=>{let t=e.wizard;if(t===void 0)return"";let r=Uo(e);if(r===null)return"";let o=Bt.slice(0,r).map((i,a)=>Zfe(e,`wizard-${a+1}`,Xfe[i])),n=t.gate!==null?g8(e,{active:!0}):y8(e),s=r>=Bt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var OA,Rx=l(()=>{"use strict";C8();Dv();j();OA=e=>{if(e===null||e.wizard!==void 0&&N(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=T8(e),r=i4(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Qfe,kx,I8=l(()=>{"use strict";j();qe();bt();Ei();Qfe=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},kx=async(e,t,r)=>{if(!Qfe(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===F)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=nv({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await It({writerAgent:e.judgeModel,prompt:n,workingDirectory:Oe(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=iv(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var om,jA,L8,wx,v8,x8,W8,MA,Ex=l(()=>{"use strict";om=p(require("node:fs")),jA=p(require("node:path")),L8=e=>jA.default.join(jA.default.dirname(e),"prompt-optimizer-writer-ready.json"),wx=e=>{let t=L8(e);if(!om.default.existsSync(t))return{};try{let r=JSON.parse(om.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},v8=(e,t)=>{om.default.mkdirSync(jA.default.dirname(e),{recursive:!0}),om.default.writeFileSync(L8(e),`${JSON.stringify(t,null,2)}
`)},x8=(e,t)=>wx(e)[t]?.message??null,W8=(e,t,r)=>{v8(e,{...wx(e),[t]:{message:r}})},MA=(e,t)=>{let r=wx(e);r[t]!==void 0&&v8(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Tx,NA,DA,O8,Je,vi=l(()=>{"use strict";j();gA();Yp();I8();Xp();Gl();Ex();WA();Kt();Tx=new Set,NA={atMs:0,ids:[]},DA=async()=>{if(Date.now()-NA.atMs<3e4)return NA.ids;let e=await Tr({commands:we({})});return NA.atMs=Date.now(),NA.ids=e.installedWriterIds,e.installedWriterIds},O8=async(e,t,r)=>{let o=me(e,t);if(o===null||r.aborted)return;let n=Ii(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(N(n.status)&&!s||n.status==="wizard_paused"||lo(n))return;if(s){let c=await kx(n,r,d=>{MA(e,d)});X(e,c);return}let i=await hY(n,c=>{MA(e,c)},r,c=>{me(e,t)?.status==="stopped"||r.aborted||X(e,c)});if(!(me(e,t)?.status==="stopped"||r.aborted)){if(X(e,i),N(i.status)){let c=await kx(i,r,d=>{MA(e,d)});X(e,c);return}await O8(e,t,r)}},Je=(e,t)=>{if(Tx.has(t))return;let r=me(e,t);if(r===null)return;let o=Ii(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(N(o.status)&&!n||o.status==="wizard_paused"||lo(o))return;Tx.add(t);let s=S8(t);O8(e,t,s).finally(()=>{Tx.delete(t),P8(t)})}});var Bn,nm=l(()=>{"use strict";Sx();WA();Rx();vi();Bn=(e,t)=>{let r=Ii(e,t);return Je(e,r.id),`${xA(r)}${OA(r)}`}});var j8,M8,N8=l(()=>{"use strict";j8=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,M8=e=>e!==null&&e>0});var eye,tye,rye,D8,H8=l(()=>{"use strict";j();Yp();kA();$p();zp();Gl();QP();QP();eye=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),tye=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=xe(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},rye=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=_e(o);return Ul({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},D8=(e,t)=>{if(!Dp(e,t))return e;Un(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Ti({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Fn(tye(r));if(t==="wizard-3"){let n=o.splitOptions[0]??eye(o.templatedPrompt);return Hn(r,n)}return t==="wizard-4"?rye(r):e}});var HA,F8,Cx=l(()=>{"use strict";j();kA();Gl();HA=e=>(Un(e.id),{...Ul(e,"stopped"),errorMessage:LL}),F8=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Un(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var oye,$8,z8,U8=l(()=>{"use strict";j();Yp();kA();$p();zp();nm();Kt();vi();N8();_x();H8();Cx();oye="Pick a revision scored above 0 before continuing to Separate.",$8=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),z8=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=me(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=me(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Bn(e.storePath,d))};if(o==="wizard-stop-all"){let c=HA(s);return X(e.storePath,c),Je(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=F8(s);return X(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=R8(s,c);return X(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=D8(s,c);return X(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Je(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",m=ZL(s.wizard,d,c);m=Pp(m,d),m={...m,pendingStepInstructions:u};let g={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return X(e.storePath,g),Je(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(g=>g.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?$8(s):Ti({...s,wizard:{...s.wizard,gate:null}});return X(e.storePath,m),Je(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=j8(s,u??-1);if(!M8(m)){let y={...s,errorMessage:oye,updatedAt:new Date().toISOString()};return X(e.storePath,y),a(n),!0}let g=Fn({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return X(e.storePath,g),Je(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let y=$8(s);return X(e.storePath,y),Je(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(y=>y.id===u);if(m===void 0){let y={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return X(e.storePath,y),a(n),!0}let g=Hn(s,m);return X(e.storePath,g),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,m=d.modules[u];if(m===void 0)return a(n),!0;if(!Ol(s.costControls)){let w=t.get("confirmedTokenBudget")?.trim()??"",I=t.get("confirmedMaxSpendUsd")?.trim()??"";if(w.length===0){let k={...s,errorMessage:vl,updatedAt:new Date().toISOString()};return X(e.storePath,k),a(n),!0}let f=no({existing:s.costControls,confirmedTokenBudget:Number(w),confirmedMaxSpendUsd:I.length===0?null:Number(I),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!f.ok){let k={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return X(e.storePath,k),a(n),!0}s={...s,costControls:f.costControls,errorMessage:null,updatedAt:new Date().toISOString()},X(e.storePath,s)}let g=hv({wizard:d,modulePrompt:m.prompt,posted:t});if(!g.ok){let w={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return X(e.storePath,w),a(n),!0}let y={...d,parameterValues:g.parameterValues};if(m.status==="pending"){let w=yY({...s,wizard:{...y,gate:null}},u);return X(e.storePath,w),Je(e.storePath,n),a(n),!0}let h=u+1;if(h>=d.modules.length){let w=_e(y),I=Ul({...s,wizard:y},w.terminalStatusSuggestion);return X(e.storePath,I),Je(e.storePath,n),a(n),!0}let S={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...y,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return X(e.storePath,S),a(n),!0}}return a(n),!0}});var nye,B8,sye,Ix,iye,G8,K8=l(()=>{"use strict";qe();Gl();Cx();rx();hA();Xp();Kt();nye="Add a score from 0 to 100 and the reason for it.",B8="Add a score from 1 to 100 and the reason for it.",sye="Write the next prompt.",Ix="This step is not waiting for you.",iye=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},G8=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=me(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(X(e.storePath,HA(a)),{kind:"saved",cycleId:i}):A8(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=me(e.storePath,r);if(o===null||!lo(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Ix};if(t==="manual-judge"){if(o.judgeModel!==F)return{kind:"invalid",cycle:o,errorMessage:Ix};let i=iye(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?B8:nye};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:B8};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",u=SA(Kp(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return X(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==F)return{kind:"invalid",cycle:o,errorMessage:Ix};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:sye};let s=yA(o,n);return X(e.storePath,s),{kind:"saved",cycleId:o.id}}});var V8,q8=l(()=>{"use strict";V8=`<script>
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
</script>`});var J8,Y8=l(()=>{"use strict";J8=`<script>
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
</script>`});var X8,Z8=l(()=>{"use strict";X8=`<script>
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
</script>`});var Q8,e6=l(()=>{"use strict";Q8=`<script>
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
</script>`});var t6,r6=l(()=>{"use strict";j();bt();t6=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Gt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(Ee(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!N(t.status)}}});var o6,n6=l(()=>{"use strict";o6=`<script>
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
</script>`});var s6,i6=l(()=>{"use strict";j();em();wA();s6=e=>{let t=Bl(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:N(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Uo(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=_e(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=_e(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return N(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var a6,l6=l(()=>{"use strict";a6=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Bo,aye,lye,c6,d6=l(()=>{"use strict";i6();l6();Qp();Bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aye=e=>e.wizard===void 0?"legacy":"wizard",lye=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Bo(t)}">`,o=s6(e),n=a6(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Bo(o.badgeClass)}">${Bo(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Bo(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Bo(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${aye(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Bo(e.id)}">${Bo(zo(e.goal))}</a><p class="muted">${Bo(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${m}</div></li>`},c6=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>lye(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Bo(s)}</summary>${i}</details>`:i}});var Lx,FA,u6,cye,dye,sm,p6,$A=l(()=>{"use strict";Lx=p(require("node:fs")),FA=p(require("node:path"));bt();u6=/^[a-z0-9-]+$/,cye=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},dye=(e,t)=>{if(!u6.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let m=cye(u[2]??"");u[1]==="name"&&m.length>0&&(o=m),u[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},sm=e=>{let t=Fo(e);if(!t.ok)return[];let r=FA.default.resolve(t.path,".cursor","skills"),o=[];try{o=Lx.default.readdirSync(r)}catch{return[]}return o.filter(n=>u6.test(n)).flatMap(n=>{let s=FA.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${FA.default.sep}`))return[];try{let i=dye(Lx.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},p6=(e,t)=>sm(e).find(r=>r.fileName===t)??null});var m6,uye,g6,f6,y6=l(()=>{"use strict";zn();m6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uye=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),g6=e=>{if(e.length===0)return`<div class="field">${je("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${m6(r.fileName)}">${m6(r.fileName)}</option>`).join("");return`<div class="field">${je("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${uye(e)}</script>`},f6=`<script>
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
</script>`});var vt,h6,S6=l(()=>{"use strict";j();LA();Fp();zn();vt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h6=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=vt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Si({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??nr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=mA({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",g=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${vt(ce.knobsSectionTitle)}</p>
  <p class="muted">${vt(ce.knobsSectionLede)}</p>
  <div class="field">
    ${je(ce.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${je(ce.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${vt(ce.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${vt(ce.earlyStopLabel)}</span>
    </label>
    <p class="muted">${vt(ce.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${vt(ce.estimateSectionTitle)}</p>
    <p class="muted">${vt(ce.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${vt(ce.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${vt(ce.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${vt(ce.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${vt(g)}">$${c.toFixed(4)} / 1k \xB7 ${vt(g)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${vt(ce.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var gt,P6,A6,pye,_6,b6,R6,k6=l(()=>{"use strict";j();ux();qe();Qp();em();gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P6=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",A6=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,pye=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},_6=e=>e===F?"You":Te(e),b6=e=>{let t=pye(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":Te(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${gt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${gt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${gt(_6(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${gt(_6(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${gt(r)}</dd></div>
    </dl>
  </details>`},R6=e=>{let t=e.wizard;if(t===void 0)return"";let r=zo(e.goal),o=e.status==="wizard_paused",n=!N(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=TA(e),m=A6(t),g=m===null?"":P6(m),y=Uo(e),h=g.length===0?"":y===null||y>=4?` <strong>${gt(g)}</strong>`:` <strong>${gt(g)}</strong> (step ${y+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${gt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${gt(u.title)}${h}</p>
    <p class="muted">${gt(u.detail)}</p>
    <div class="actions">
      ${b6(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${gt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=A6(t),i=s===null?"Wizard":P6(s),a=Uo(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${gt(r)}</h2>
    <p class="lede">Paused at <strong>${gt(i)}</strong>${gt(c)} (last updated ${gt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${b6(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${gt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var im,w6,E6=l(()=>{"use strict";zn();im=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),w6=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${im(n.id)}"${n.id===e.runner?" selected":""}>${im(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${im(e.runner)}">Checking ${im(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${je("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${je("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${im(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var T6,C6=l(()=>{"use strict";T6=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Kl,I6,L6,v6,x6,W6=l(()=>{"use strict";zn();Kl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I6=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Kl(c.id)}"${c.id===r?" selected":""}>${Kl(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Kl(n)}</option>`;return`<div class="field">${je(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},L6=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Kl(t)}">Checking ${Kl(o)}\u2026</p>`},v6=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${je(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Kl(r)}</textarea><span class="muted">${o}</span></div></details>`,x6=e=>{let t=`<div class="sdlc-writer">${I6("judge","Judge",e.judge,e.writers,"I'll score it")}${L6("judge",e.judge,e.writers)}${v6("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${I6("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${L6("improver",e.improver,e.writers)}${v6("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var O6,j6=l(()=>{"use strict";O6=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var am,mye,zA,vx=l(()=>{"use strict";j6();am=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mye=(e,t)=>{let r=am(e.goal),o=am(e.label);return t===void 0?`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${r}" title="${r}">${o}</button>`:`<button type="submit" class="sdlc-goal-preset-chip" name="${am(t)}" value="${r}" title="${r}">${o}</button>`},zA=(e={})=>{let t=e.presets??O6,r=e.groupLabel??"Common goals",o=e.leadLabel??"Quick fill:",n=t.map(s=>mye(s,e.submitName)).join("");return`<div class="sdlc-goal-presets" role="group" aria-label="${am(r)}"><span class="sdlc-goal-presets-label muted">${am(o)}</span>${n}</div>`}});var lm,gye,fye,xx,M6=l(()=>{"use strict";j();zn();lm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gye=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},fye=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,xx=e=>{let t=gye(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=gp(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${je(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${lm(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${lm(e.inputId)}" class="sdlc-pass-range" type="range" name="${lm(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${lm(a)}"><span class="sdlc-pass-mark" style="left:${fye(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${lm(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var hye,Wx,Go,Ox,jx=l(()=>{"use strict";Xp();Sx();q8();Y8();sA();Z8();e6();r6();n6();d6();$A();y6();zn();Rx();S6();k6();Qp();E6();C6();W6();j();vx();M6();hye=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Wx='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Go=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ox=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Go(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Go(e.skillNotice??"")}</div>`,o=`${S4}${P4}`,n=e.resumableWizardCycle??null,s=n===null?"":R6(n),i=OA(e.cycle),a=e.cycle===null?"":xA(e.cycle),c=e.cycle!==null&&lo(e.cycle),d=t6(e),u=hye(d.goal,d.prompt,e.canRun),m=x6({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),g=w6({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y=`${xx({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${xx({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,h=h6({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),S=YL,w=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",I=e.cycle!==null&&N(e.cycle.status),f=d.running&&!I,k=I||f?"":" open",M=f?" sdlc-compose-run-focus":"",W=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${I?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,O=I?(()=>{let E=e.cycle!==null?zo(e.cycle.goal):zo(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Go(E)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${W}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${W}</summary>`,b=I?" sdlc-compose-viewing-finished":"",P=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",C=c?"waiting":d.running?"running":"idle",L=d.running&&!c?' aria-busy="true"':"",be=`<section class="card sdlc-compose${b}${M}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${k}>
        ${O}
        <div class="sdlc-compose-details-body">
      <p class="lede">${S} ${Go(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${w}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${je("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Go(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${g6(sm(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${Wx}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${je("Goal","goal")}
            ${zA()}
            <textarea class="input textarea" name="goal" rows="4" required>${Go(d.goal)}</textarea>
          </div>
          <div class="field">
            ${je("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Go(d.prompt)}</textarea>
          </div>
          ${y}
          ${h}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Wx}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <div class="sdlc-compose-step" data-sdlc-compose-step="3" id="sdlc-compose-step-3" hidden>
          <h3 class="sdlc-compose-step-title">CLI</h3>
          <p class="muted sdlc-compose-step-lede">Pick who scores, who rewrites, and who runs wizard step 4 modules.</p>
          <div class="sdlc-block sdlc-block-flush">
          <p class="sdlc-block-title">Judge and improver</p>
          ${m}
        </div>
        ${g}
        ${T6()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Wx}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Go(d.passScore)}; Step 4 pass \u2265 ${Go(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${C}" data-can-run="${u?"true":"false"}"${L}${d.running?" disabled":""}>${P}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,te=e.history.length>0?o6:"",de=`${""}${Q8}${V8}${J8}${X8}${f6}${te}`;return`${t}${r}${be}${s}${a}${i}${o}${c6(e.history,e.cycle?.id??null)}${de}`}});var cm,Mx=l(()=>{"use strict";jx();cm=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Ox(t)}))}});var N6,D6=l(()=>{"use strict";K8();nm();Mx();Kt();vi();N6=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:G8({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=me(e.storePath,o.cycleId);return Je(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Bn(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await cm(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:io(e.storePath),resumableWizardCycle:null}),!0)}});var H6,UA,Nx=l(()=>{"use strict";j();H6=p(require("node:os")),UA=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??H6.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??or()}}});var F6,Vl,Dx,$6,z6,dm=l(()=>{"use strict";j();qe();Bv();F6=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Vl=e=>{let t=KJ(e),r=_i(e).map(s=>({id:s,label:VP[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Dx=(e,t,r)=>t===F||t!==null&&e.writers.some(o=>o.id===t)?t:r,$6=(e,t,r,o=null)=>({judge:Dx(e,t,e.judge),improver:Dx(e,r,e.improver),runner:Dx(e,o,e.runner)}),z6=e=>e===iA?{goal:aA,prompt:lA}:{goal:"",prompt:""}});var Hx,U6=l(()=>{"use strict";Hx=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var B6,Sye,G6,K6,V6,q6=l(()=>{"use strict";j();B6=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},Sye=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},G6=(e,t)=>e.has("earlyStop")?!0:t!=="run",K6=e=>{let t=B6(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=Sye(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=B6(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},V6=e=>or(e)});var J6,Y6,BA,Fx=l(()=>{"use strict";j();qe();bt();dm();U6();q6();J6=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Hx(o);return n.ok?String(n.passScore):String(r)},Y6=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return Hx(n)},BA=e=>{let t=$6(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=J6(e.posted,"passScore",70),o=J6(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",g=e.posted===null?!0:G6(e.posted,m),y=(O,b)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:O,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:b,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:g});if(e.posted===null)return y(e.defaultFolder??bi,null);let h=e.posted.get("folder")??bi;if(e.posted.get("intent")==="choose-folder"){let O=e.pickFolder();return y(O===null?h:Gt(O),null)}if((e.posted.get("intent")??"")!=="run")return y(h,null);let w=F6(e.goal,e.prompt);if(w!==null)return y(h,w);let I=Y6(e.posted,"passScore",r);if(!I.ok)return y(h,I.errorMessage);let f=Y6(e.posted,"modulePassScore",o);if(!f.ok)return y(h,f.errorMessage);let k=VJ(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(k===null)return y(h,"Choose a judge and an improver.");let M=Fo(h);if(!M.ok)return y(h,M.errorMessage);let _=qJ(e.installedIds,c,k.judge);if(_===null)return y(h,"Choose a runner for wizard step 4.");let W=K6({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return W.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:k.judge,improver:k.improver,workingDirectory:M.path,passScore:I.passScore,modulePassScore:f.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:_,runnerInstructions:a,costControls:V6(W.knobs)}:y(h,W.errorMessage)}});var ql,KA,Pye,$x,X6,GA,Z6,Aye,Q6,zx,_ye,bye,Rye,Ux,e3,t3,r3=l(()=>{"use strict";ql=p(require("node:fs")),KA=p(require("node:path"));qe();bt();Pye=["remember","choose-folder","run"],$x=()=>({folder:bi,judge:"",improver:"",runner:""}),X6=e=>KA.default.join(KA.default.dirname(e),"prompt-optimizer-preferences.json"),GA=e=>typeof e=="string"?e:"",Z6=e=>{let t=X6(e);if(!ql.default.existsSync(t))return $x();try{let r=JSON.parse(ql.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return $x();let o=r,n=GA(o.folder).trim();return{folder:n.length===0?bi:n,judge:GA(o.judge),improver:GA(o.improver),runner:GA(o.runner)}}catch{return $x()}},Aye=(e,t)=>{let r=X6(e);ql.default.mkdirSync(KA.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;ql.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),ql.default.renameSync(o,r)},Q6=(e,t)=>e===F||_i(t).some(r=>r===e),zx=(e,t,r)=>e===null?t:e.length===0?"":Q6(e,r)?e:t,_ye=(e,t)=>{if(e===null)return t;let r=Fo(e);return r.ok?r.display:t},bye=e=>{let t=Z6(e.storePath),r={folder:_ye(e.folder,t.folder),judge:zx(e.judge,t.judge,e.installedIds),improver:zx(e.improver,t.improver,e.installedIds),runner:zx(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Aye(e.storePath,r)},Rye=e=>{let t=Fo(e);return t.ok?t.display:bi},Ux=(e,t)=>Q6(e,t)?e:"",e3=e=>{let t=Z6(e.storePath);return{selection:{...e.selection,judge:Ux(t.judge,e.installedIds)||e.selection.judge,improver:Ux(t.improver,e.installedIds)||e.selection.improver,runner:Ux(t.runner,e.installedIds)||e.selection.runner},defaultFolder:Rye(t.folder)}},t3=e=>{let t=e.posted.get("intent")??"";if(!Pye.includes(t))return;let r=e.posted.get("folder");bye({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var o3,kye,wye,Bx,Eye,VA,qA=l(()=>{"use strict";o3=p(require("node:os"));qe();Ex();Ei();kye="Reply with the single word ok. Do not use tools.",wye=45e3,Bx=async(e,t)=>{if(t===F)return{ok:!0,message:"You will do this step."};let r=x8(e,t);if(r!==null)return{ok:!0,message:r};let o=await It({writerAgent:t,prompt:kye,workingDirectory:o3.default.tmpdir(),timeoutMs:wye});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${Te(t)} is ready.`;return W8(e,t,n),{ok:!0,message:n}},Eye=e=>[...new Set(e.filter(t=>t.length>0))],VA=async(e,t,r,o)=>{for(let n of Eye([t,r,o??""])){let s=await Bx(e,n);if(!s.ok)return s.message}return null}});var Gx,n3=l(()=>{"use strict";j();Gx=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!N(r.status)&&!(t!==null&&r.id===t))return r;return null}});var s3,i3=l(()=>{"use strict";_t();j();Fp();nm();Nx();Fx();Mx();Kt();bt();r3();$A();qA();n3();WA();vi();s3=async e=>{let t=e.posted===null?e3({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=BA({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>Ln("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(t3({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Gt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await VA(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await cm(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Gt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:io(e.route.storePath),resumableWizardCycle:Gx(io(e.route.storePath),null)});return}if(r.kind==="start"){let s=p6(r.workingDirectory,r.sourceSkillFile),i=pA(Wl({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=UA({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:lv({...Sp(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(X(e.route.storePath,a),Je(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(Bn(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:me(e.route.storePath,e.cycleId);n!==null&&(n=Ii(e.route.storePath,n),Je(e.route.storePath,n.id)),await cm(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:io(e.route.storePath),resumableWizardCycle:Gx(io(e.route.storePath),n?.id??null)})}});var a3,l3=l(()=>{"use strict";Kt();a3=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";E4(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var c3,d3=l(()=>{"use strict";c3=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var u3,p3=l(()=>{"use strict";W4();U8();D6();i3();l3();dm();d3();vi();u3=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await DA(),o=Vl(r),n=e.method==="POST"?c3(e.request.headers["content-type"],await e.readBody(e.request)):null;if(z8({posted:n,storePath:e.storePath,response:e.response})||await N6(e,n,o))return;let s=z6(t.searchParams.get("example")),i=a3({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=x4({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await s3({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:v4(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var Tye,m3,g3=l(()=>{"use strict";j();Kt();Tye=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",m3=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=me(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!N(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=cv({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${Tye(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var f3,y3=l(()=>{"use strict";nm();Kt();f3=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:me(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Bn(e.storePath,o)),!0}});var Cye,h3,S3=l(()=>{"use strict";qe();qA();Cye=["claude-cli","codex","cursor","antigravity"],h3=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===F||Cye.includes(t)?await Bx(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var P3,A3=l(()=>{"use strict";j();P3=e=>{let t=e?.socket?.localPort;return typeof t=="number"&&Number.isInteger(t)&&t>0?`http://127.0.0.1:${t}${xP}`:void 0}});var _3,b3=l(()=>{"use strict";j();_3=(e,t=qL)=>{let r=e.length===1?e[0].id:null;return{ok:!0,url:t,page:yp,context:Cl,installedWriters:e,post:{method:"POST",url:t,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this computer",judge:r??"installed writer id",improver:r??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${t}?cycle=<cycleId> until done is true.`,writers:r===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${r} is installed. Omit judge and improver and both roles use it.`}}});var JA,R3=l(()=>{"use strict";j();hx();Dl();JA=e=>{let t=e.revisions[e.revisions.length-1]??null,r=xe(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=N(e.status),n=e.errorKind??null,s=vA({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:$o(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Cl,page:`${yp}?cycle=${encodeURIComponent(e.id)}`}}});var ne,Iye,k3,w3,E3=l(()=>{"use strict";ne=p(da());j();Iye=(0,ne.isType)({goal:ne.isString,prompt:ne.isString,workingDirectory:ne.isString,judge:(0,ne.isUndefinedOr)(ne.isString),improver:(0,ne.isUndefinedOr)(ne.isString),passScore:(0,ne.isUndefinedOr)(ne.isNumber),maxRounds:(0,ne.isUndefinedOr)(ne.isNumber),maxTrials:(0,ne.isUndefinedOr)(ne.isNumber),maxSpendUsd:(0,ne.isUndefinedOr)(ne.isNumber),earlyStop:(0,ne.isUndefinedOr)(ne.isBoolean),earlyStopFlatRounds:(0,ne.isUndefinedOr)(ne.isNumber),confirmedTokenBudget:(0,ne.isUndefinedOr)(ne.isNumber),confirmedMaxSpendUsd:(0,ne.isUndefinedOr)(ne.isNumber),rateUsdPer1kTokens:(0,ne.isUndefinedOr)(ne.isNumber)}),k3=e=>{let t=e?.trim()??"";return t.length===0?null:t},w3=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return Iye(t)?t.workingDirectory.trim().length===0?{ok:!1,error:WP}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:k3(t.judge),improver:k3(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:WP}}});var Ko,Lye,T3,C3,I3=l(()=>{"use strict";j();Ko=p(da()),Lye=(0,Ko.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Ko.isNumber,confirmedMaxSpendUsd:(0,Ko.isUndefinedOr)(Ko.isNumber),rateUsdPer1kTokens:(0,Ko.isUndefinedOr)(Ko.isNumber)}),T3=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:Lye(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},C3=(e,t)=>{let r=no({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var vye,L3,v3=l(()=>{"use strict";j();qe();Fx();dm();vye=e=>e.map(t=>t.id).join(", "),L3=e=>{let t=Vl(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===F||n===F)return{ok:!1,error:JL,installedWriters:t.writers};if(o===null||n===null){let a=vye(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this computer.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=BA({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var xye,x3,W3=l(()=>{"use strict";j();Nx();b3();R3();dm();E3();I3();v3();Kt();xye=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},x3=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=me(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this computer."}}:{status:200,body:JA(u)}}let r=await e.handlers.readInstalledIds(),o=Vl(r);if(e.method==="GET")return{status:200,body:_3(o.writers,e.agentUrl)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=T3(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let m=me(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this computer."}};let g=C3(m,u.body);return g.ok?(X(e.storePath,g.cycle),{status:200,body:JA(g.cycle)}):{status:400,body:{ok:!1,error:g.error}}}let n=xye(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=Si({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=w3(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=L3({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=Wl({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:Tt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=no({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=UA({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:Sp(i.prompt),runnerModel:i.runner,costControls:c});return X(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:JA(d)}}});var O3,j3=l(()=>{"use strict";vi();qA();A3();W3();O3=async e=>{let t=await x3({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,agentUrl:P3(e.request),handlers:{readInstalledIds:DA,readWritersReady:VA,startCycle:Je}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var N3,Wye,Oye,M3,jye,D3,H3=l(()=>{"use strict";N3=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],Wye=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},Oye=e=>{let t={};for(let n of e)for(let s of new Set(N3(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},M3=(e,t)=>{let r=Wye(N3(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},jye=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},D3=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=Oye(e.map(i=>i.text)),s=M3(o,n);return e.map(i=>({id:i.id,score:jye(s,M3(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var Kx,Mye,Nye,F3,Dye,Hye,Fye,$ye,Vx,qx=l(()=>{"use strict";Kx=p(require("node:path"));bt();H3();$A();Mye=5,Nye=20,F3=280,Dye=e=>[e.name,e.description,e.promptText].join(`
`),Hye=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=F3?t:`${t.slice(0,F3-3)}...`},Fye=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),$ye=e=>e===void 0||!Number.isFinite(e)?Mye:Math.min(Nye,Math.max(1,Math.floor(e))),Vx=e=>{let t=e.query.trim(),r=$ye(e.limit),o=Fo(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=sm(o.path),s=D3(n.map(d=>({id:d.fileName,text:Dye(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=Kx.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:Kx.default.join(a,u.fileName,"SKILL.md"),excerpt:Hye(u),source:"filesystem"}]});return{query:t,hits:c,context:Fye(c)}}});var $3,z3=l(()=>{"use strict";qx();$3=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:Vx({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var U3,B3=l(()=>{"use strict";z3();U3=async e=>{let t=$3({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var zye,Jx,G3=l(()=>{"use strict";Kv();p3();g3();y3();S3();j3();B3();zye=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Jx=async e=>{let t=zye(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await O3(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await U3(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:Gv()})),!0):(await h3({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||m3({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||f3({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await u3(e),!0)}});var Yx,Uye,Bye,um,YA=l(()=>{"use strict";Yx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Uye=e=>!Yx(e)||typeof e.ruleId!="string"||typeof e.title!="string"||typeof e.source!="string"||typeof e.active!="boolean"||typeof e.hitCount!="number"||!Number.isFinite(e.hitCount)||e.lastHitAt!==null&&typeof e.lastHitAt!="string"?null:{ruleId:e.ruleId,title:e.title,source:e.source,active:e.active,hitCount:e.hitCount,lastHitAt:e.lastHitAt},Bye=e=>!Yx(e)||typeof e.ruleIdA!="string"||typeof e.ruleIdB!="string"||e.reason!=="duplicate"&&e.reason!=="overlap"||typeof e.score!="number"||!Number.isFinite(e.score)?null:{ruleIdA:e.ruleIdA,ruleIdB:e.ruleIdB,reason:e.reason,score:e.score},um=e=>{if(!Yx(e)||e.ok!==!0||typeof e.projectId!="string"||e.windowDays!==null||!Array.isArray(e.rules)||!Array.isArray(e.overlaps))return null;let t=[];for(let o of e.rules){let n=Uye(o);if(n===null)return null;t.push(n)}let r=[];for(let o of e.overlaps){let n=Bye(o);if(n===null)return null;r.push(n)}return{ok:!0,projectId:e.projectId,windowDays:null,rules:t,overlaps:r}}});var Gye,Kye,Xx,Zx=l(()=>{"use strict";YA();Gye=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Kye=e=>um({ok:!0,projectId:"x",windowDays:null,rules:[e],overlaps:[]})?.rules[0]??null,Xx=e=>{if(!Gye(e)||e.ok!==!0||typeof e.projectId!="string"||typeof e.changed!="boolean")return null;let t=Kye(e.rule);return t===null?null:{ok:!0,projectId:e.projectId,rule:t,changed:e.changed}}});var Vye,K3,Qx,V3=l(()=>{"use strict";YA();Vye=1e4,K3=(e,t,r=30)=>{let o=new URL(`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/usage`);return o.searchParams.set("days",String(r)),o.toString()},Qx=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"not_connected"};let r=e.fetchImpl??fetch;try{let o=await r(K3(e.appOrigin,e.projectId,e.days??30),{method:"GET",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(Vye)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=um(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var qye,q3,eW,J3=l(()=>{"use strict";Zx();qye=15e3,q3=(e,t,r,o)=>`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/${encodeURIComponent(r)}/${o}`,eW=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"unauthorized"};let r=e.fetchImpl??fetch;try{let o=await r(q3(e.appOrigin,e.projectId,e.ruleId,e.action),{method:"POST",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(qye)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(o.status===404)return{ok:!1,reason:"not_found"};if(o.status===409)return{ok:!1,reason:"limit_exceeded"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=Xx(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var G,Vo=l(()=>{"use strict";ht();G={heading:"Compare rules",intro:"See which rules kick in for a prompt and what they add to each request.",groupLabel:"Sample prompts",lead:"Try a sample:",customLabel:"Or write your own prompt",customHint:"Use a prompt that has nothing to do with this project. Any rule that still kicks in is probably in the wrong place.",button:"Compare",emptyPrompt:"Pick a sample prompt or write your own.",noRules:"No rules kick in for this prompt.",oneRule:"1 rule kicks in for this prompt:",nRules:e=>`${e} rules kick in for this prompt:`,tokenLine:(e,t)=>`Prompt alone: ${e} tokens. Rules add ${t} tokens.`,costLine:e=>`About ${e} more per request.`,rulesUnavailable:"Rules for this project aren't available right now.",ruleUseHeading:"Rule use",ruleUseIntro:"Rules marked below may be safe to drop. You decide. Nothing is removed for you.",usedOnce:"Used 1 time",usedN:e=>`Used ${e} times`,neverUsed:"Never used",notUsedInDays:e=>`Not used in ${e} days`,sameAs:e=>`Same as ${e}`,overlapsWith:e=>`Overlaps with ${e}`,emptyRules:"No rules to check yet.",usageError:"Couldn't load rule usage. Try again.",tryAgain:"Try again",connectComputer:"Connect this computer to AgentWitch to see rule use.",ownerOnlyUsage:"Only the project owner can see rule use.",drop:"Drop",restore:"Restore",undo:"Undo",dropped:e=>`Dropped "${e}".`,ownerOnlyDrop:"Only the project owner can drop rules.",dropFailed:"Couldn't drop the rule. Try again.",restoreFailed:"Couldn't restore the rule. Try again.",limitReached:`Limit reached: ${64} active pitfalls. Retire one to add another.`}});var Jye,Yye,tW,rW,oW=l(()=>{"use strict";Vo();Jye=1440*60*1e3,Yye=(e,t)=>{let r=Date.parse(e);return Number.isFinite(r)?Math.max(0,Math.floor((t-r)/Jye)):null},tW=e=>{let t=e.nowMs??Date.now(),r=e.staleAfterDays??30,o=[];if(e.rule.hitCount===0)o.push({kind:"never_used"});else if(e.rule.lastHitAt!==null){let n=Yye(e.rule.lastHitAt,t);n!==null&&n>r&&o.push({kind:"stale",days:n})}for(let n of e.overlaps){let s=n.ruleIdA===e.rule.ruleId?n.ruleIdB:n.ruleIdB===e.rule.ruleId?n.ruleIdA:null;if(s===null)continue;let a=e.rulesById.get(s)?.title??s;n.reason==="duplicate"?o.push({kind:"same_as",ruleTitle:a}):o.push({kind:"overlaps",ruleTitle:a})}return o},rW=e=>{switch(e.kind){case"never_used":return G.neverUsed;case"stale":return G.notUsedInDays(e.days);case"same_as":return G.sameAs(e.ruleTitle);case"overlaps":return G.overlapsWith(e.ruleTitle);default:return e}}});var Y3=l(()=>{"use strict";j();j();j();j();j()});var nW,sW=l(()=>{"use strict";ht();vu();Y3();nW=e=>{let t=hr(e.prompt),r=Lu(e.matched.map(s=>({id:s.id,avoidance:s.avoidance}))),o=e.matched.length===0?0:hr(r),n=nr(null);return{promptTokens:t,rulesTokens:o,addedCostUsd:o/1e3*n}}});var XA=l(()=>{"use strict";G3();qx();Ei();YA();Zx();V3();J3();oW();sW();Vo()});var Xye,Zye,iW,Qye,X3,aW=l(()=>{"use strict";oe();St();Pl();Xye="/api/local/coding-tools/pause",Zye=/^(?:127\.0\.0\.1|localhost):\d{1,5}$/,iW=(e,t)=>e===void 0||e===ia||e===Fc||t!==void 0&&Zye.test(t)&&e===`http://${t}`,Qye=e=>{try{let r=JSON.parse(e)?.paused;return typeof r=="boolean"?r:null}catch{return null}},X3=async e=>{if(e.pathname!==Xye)return!1;let t=(i,a,c)=>e.sendJson(e.response,i,{ok:!0,paused:a,updatedAt:c,label:Os.pauseLabel,hint:Os.pauseHint});if(e.method==="GET"){let i=Hs(e.configPath);return t(200,i.paused,i.updatedAt),!0}if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let r=e.request.headers.origin,o=e.request.headers.host;if(!iW(typeof r=="string"?r:void 0,typeof o=="string"?o:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let n=Qye(await e.readBody(e.request));if(n===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body"}),!0;let s=zw(e.configPath,n);return t(200,s.paused,s.updatedAt),!0}});var ehe,the,Z3,Q3=l(()=>{"use strict";_t();aW();ehe="/api/local/projects/folder",the=e=>{try{let t=JSON.parse(e);return typeof t?.projectId!="string"||typeof t.folderPath!="string"?null:{projectId:t.projectId,folderPath:t.folderPath,allowOutsideHome:t.allowOutsideHome===!0}}catch{return null}},Z3=async e=>{if(e.pathname!==ehe)return!1;if(e.method==="GET")return e.sendJson(e.response,200,{ok:!0,...Mo(e.profileDir)}),!0;if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let t=e.request.headers.origin,r=e.request.headers.host;if(!iW(typeof t=="string"?t:void 0,typeof r=="string"?r:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let o=the(await e.readBody(e.request));if(o===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body",message:"Send projectId and folderPath."}),!0;let s=await(e.link??No)({...o,profileDir:e.profileDir,cloudConfig:e.readCloudConfig()});return s.ok?(e.sendJson(e.response,200,s),!0):(e.sendJson(e.response,s.httpStatus,{ok:!1,error:s.code,message:s.message}),!0)}});var lW,cW,dW=l(()=>{"use strict";lW="2025-03-26",cW={name:"agent-witch",version:"1.0.0"}});var Jl,ZA,e7,rhe,pm,t7=l(()=>{"use strict";dW();Jl=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),ZA=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),e7=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,rhe=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return Jl(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return Jl(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return ZA(e,i)}catch(i){try{r.onToolError?.(n,i)}catch{}return Jl(e,-32603,`Tool ${n} failed`)}},pm=async(e,t,r)=>{let o=e7(e);if(o===null)return Jl(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?Jl(n,-32600,"Invalid Request"):s==="initialize"?ZA(n,{protocolVersion:lW,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?ZA(n,{}):s==="tools/list"?ZA(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?rhe(n,e7(o.params),t,r):Jl(n,-32601,"Method not found")}});var uW,r7=l(()=>{"use strict";uW=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var QA=l(()=>{"use strict";t7();r7();dW()});var ohe,Gn,e_=l(()=>{"use strict";eo();QA();ohe=(e,t)=>{let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] mcp tool ${e} failed: ${r}
`)},Gn=e=>{let t=Wn({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:cW,tools:[{definition:yS,call:r=>uW(JSON.stringify(t(r)))}],onToolError:e.logToolError??ohe}}});var o7,nhe,she,n7,s7=l(()=>{"use strict";QA();e_();o7=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},nhe=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}await t(u)}},she=async(e,t)=>{await nhe(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await pm(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&o7(t.stdout,s);return}o7(t.stdout,s)})},n7=async e=>{await she(Gn({layout:e.layout,isDeclined:e.isDeclined}),e.streams??{stdin:process.stdin,stdout:process.stdout})}});var ihe,t_,i7=l(()=>{"use strict";QA();e_();ihe="/mcp",t_=async e=>{if(e.pathname!==ihe)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??Gn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await pm(t,r,void 0)),!0}});var a7={};Mt(a7,{createAwlMcpServer:()=>Gn,runAwlMcpStdio:()=>n7,tryHandleAwlMcpHttpRequest:()=>t_});var pW=l(()=>{"use strict";e_();s7();i7()});var xi,mm,ahe,lhe,che,dhe,l7,c7=l(()=>{"use strict";xi=p(require("node:fs")),mm=p(require("node:path")),ahe="prompt-optimizer-cycles.json",lhe="prompt-optimizer-preferences.json",che="prompt-sdlc-cycles.json",dhe="prompt-sdlc-preferences.json",l7=e=>{let t=mm.default.join(e,ahe),r=mm.default.join(e,che);if(xi.default.existsSync(t)||!xi.default.existsSync(r))return t;try{xi.default.renameSync(r,t)}catch{return r}let o=mm.default.join(e,dhe),n=mm.default.join(e,lhe);if(xi.default.existsSync(o)&&!xi.default.existsSync(n))try{xi.default.renameSync(o,n)}catch{}return t}});var Yl,uhe,mW,d7=l(()=>{"use strict";Yl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uhe=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],mW=e=>{let t=uhe.map(i=>`<option value="${Yl(i.value)}">${Yl(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this computer on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Yl(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Yl(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Yl(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Yl(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var gm,m7,phe,g7,mhe,ghe,f7,o_,u7,p7,fhe,yhe,qo,fm,r_,hhe,n_,gW,She,fW,y7,yW,h7,Phe,Ahe,_he,S7,P7,A7,ym=l(()=>{"use strict";gm=p(require("node:fs")),m7=p(require("node:path")),phe="estimate-history.ndjson",g7=100,mhe=500,ghe=2e4,f7=e=>m7.default.join(e,phe),o_=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,mhe),u7=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,ghe),p7=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,fhe=e=>({...e,estimateTokens:p7(e.estimateTokens),actualTokens:p7(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),yhe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},qo=e=>{let t=f7(e);return gm.default.existsSync(t)?gm.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return yhe(n)?[fhe(n)]:[]}catch{return[]}}):[]},fm=(e,t)=>{gm.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;gm.default.writeFileSync(f7(e),r,"utf8")},r_=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),hhe=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this computer. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${r_(o.task)} | ${r_(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},n_=e=>{let t=qo(e.reportsDir),r=o_(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);fm(e.reportsDir,[...s,n])},gW=e=>{let t=qo(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?o_(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);fm(e.reportsDir,[...i,s])},She=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-g7),fW=e=>[...qo(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),y7=e=>{let t=qo(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=u7(e.input),n=u7(e.output),s=o_(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);fm(e.reportsDir,[...c,a])},yW=(e,t)=>{let r=qo(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},h7=e=>({table:hhe(She(qo(e))),embedding:null}),Phe=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},Ahe=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-g7),_he=e=>{let t=Phe(Ahe(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${r_(s.task)} | ${r_(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},S7=e=>{let t=qo(e.reportsDir),r=o_(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);fm(e.reportsDir,[...s,n])},P7=e=>{let t=qo(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);fm(e.reportsDir,[...s,n])},A7=e=>_he(qo(e))});var _7=l(()=>{"use strict";ym()});var Jo,hW,bhe,SW,Rhe,khe,s_,i_,whe,PW,b7=l(()=>{"use strict";_7();$v();Jo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hW=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},bhe=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${hW(-r)} under`:`${hW(r)} over`},SW=e=>e.toLocaleString("en-US"),Rhe=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${SW(-r)} under`:`${SW(r)} over`},khe=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},s_=e=>e===null?"\u2014":hW(e),i_=e=>e===null?"\u2014":SW(e),whe=`(function () {
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
})();`,PW=e=>{let r=fW(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":bhe(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":Rhe(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Jo(khe(i))}</button></td>
        <td>${Jo(c)}</td>
        <td>${s_(n.estimateSeconds)}</td>
        <td>${s_(n.actualSeconds)}</td>
        <td>${Jo(d)}</td>
        <td>${i_(n.estimateTokens)}</td>
        <td>${i_(n.actualTokens)}</td>
        <td>${Jo(u)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Jo(c)}</p>
        <h2>Input</h2>
        <pre>${Jo(i)}</pre>
        <h2>Output</h2>
        <pre>${Jo(a)}</pre>
        <p>Time: estimated ${s_(n.estimateSeconds)} \xB7 actual ${s_(n.actualSeconds)} \xB7 ${Jo(d)}</p>
        <p>Tokens: estimated ${i_(n.estimateTokens)} \xB7 actual ${i_(n.actualTokens)} \xB7 ${Jo(u)}</p>
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
            ${eA({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${whe}</script>`}
    </section>`}});var R7=l(()=>{"use strict";d7();b7()});var Xl,Ehe,The,AW,k7=l(()=>{"use strict";Xl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ehe=(e,t,r)=>{let o=Xl(t),n=Xl(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},The=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Xl(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>Ehe(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Xl(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Xl(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Xl(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},AW=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(The).join(""):'<section class="card"><p class="muted">No writer sessions stored on this computer yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var w7=l(()=>{"use strict";k7()});var hm,E7,T7,_W,bW,RW,C7=l(()=>{"use strict";hm=p(require("node:fs")),E7=p(require("node:path"));tl();hP();T7=(e,t,r)=>Rl({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,_W=(e,t,r)=>{let o=T7(e,t,r);if(o===null)return[];if(!hm.default.existsSync(o))return[];let n=hm.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},bW=e=>{let t=T7(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:wr(e.entry.prompt),output:wr(e.entry.output)};hm.default.mkdirSync(E7.default.dirname(t),{recursive:!0}),hm.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},RW=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Che,Ihe,Sm,a_,kW=l(()=>{"use strict";Che=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Ihe=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Sm=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=Che(i.assistantOutput),d=c.length>0?`Assistant: ${Ihe(c,t)}`:null,u=[a,d].filter(m=>m!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},a_=e=>{let t=e.userMessage.trim(),r=Sm({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var po,Pm,TW,Lhe,vhe,wW,xhe,CW,l_,I7,L7,Whe,Zl,IW,EW,v7,Ohe,x7,Ql,c_,Am,jhe,_m,LW,d_,u_,W7=l(()=>{"use strict";po=p(require("node:fs")),Pm=p(require("node:path")),TW=require("node:crypto");kW();Lhe="writer-sessions",vhe="active-index.json",wW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),xhe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",CW=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},l_=e=>{let t=Pm.default.join(e.installDir,Lhe);return po.default.mkdirSync(t,{recursive:!0}),t},I7=e=>Pm.default.join(l_(e),vhe),L7=(e,t)=>Pm.default.join(l_(e),`${t}.canonical.json`),Whe=(e,t)=>Pm.default.join(l_(e),`${t}.continuation.json`),Zl=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,IW=e=>{let t=I7(e);if(!po.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(po.default.readFileSync(t,"utf8"));if(!wW(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!wW(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!xhe(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},EW=(e,t)=>{po.default.writeFileSync(I7(e),JSON.stringify(t,null,2))},v7=(e,t)=>{po.default.writeFileSync(L7(e,t.sessionId),JSON.stringify(t,null,2))},Ohe=(e,t)=>{po.default.writeFileSync(Whe(e,t.sessionId),JSON.stringify(t,null,2))},x7=(e,t)=>{let r=Sm({turns:t.turns});Ohe(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ql=(e,t)=>{let r=L7(e,t);if(!po.default.existsSync(r))return null;try{let o=JSON.parse(po.default.readFileSync(r,"utf8"));return!wW(o)||typeof o.sessionId!="string"?null:o}catch{return null}},c_=(e,t=20)=>{let r=l_(e),o=po.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ql(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Am=(e,t,r)=>{let o=CW(r);return IW(e).entries.find(i=>Zl(i)===Zl({writerAgent:t,projectFolderPath:o}))?.sessionId??null},jhe=(e,t,r,o)=>{let n=IW(e),s=Zl({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Zl(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];EW(e,{entries:i})},_m=(e,t,r)=>{let o=(0,TW.randomUUID)(),n=new Date().toISOString(),s=CW(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return v7(e,i),x7(e,i),jhe(e,t,s,o),o},LW=(e,t,r)=>{let o=Am(e,t,r);return o!==null?o:_m(e,t,r)},d_=(e,t,r)=>{let o=CW(r),n=IW(e);if(o===null&&r===void 0){EW(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Zl({writerAgent:t,projectFolderPath:o});EW(e,{entries:n.entries.filter(i=>Zl(i)!==s)})},u_=e=>{let t=LW(e.layout,e.writerAgent,e.projectFolderPath),r=Ql(e.layout,t);if(r===null)return;let o={id:(0,TW.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};v7(e.layout,n),x7(e.layout,n)}});var Mhe,Nhe,p_,vW,O7=l(()=>{"use strict";Mhe=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",Nhe=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},p_=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted&&!e.hasSourceRunId?"continue":"first",vW=e=>{let t=p_(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=Mhe(r,e.userPromptCharacterCount),n=Nhe({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var m_=l(()=>{"use strict";C7();W7();kW();O7()});var j7=l(()=>{"use strict";ih();$a();uE()});var M7=l(()=>{"use strict";Ow()});var xt,Hhe,Fhe,xW,WW,OW,N7=l(()=>{"use strict";j7();M7();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hhe=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Fhe=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=tu(o);return`value="${xt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${xt(r)}"`},xW=(e,t,r,o,n)=>{let s=ah[t];return`<label class="field">
          <span class="field-label">${xt(o)} API key \u2014 ${xt(Hhe(e,t))} \xB7 <a class="field-link" href="${xt(s.href)}" target="_blank" rel="noopener noreferrer">${xt(s.label)}</a></span>
          <input class="input mono" type="password" name="${xt(r)}" autocomplete="off" ${Fhe(e,t,n)} />
        </label>`},WW=(e,t,r,o)=>{let n=Jy(e[t]?.model),s=new Set(qy[t].map(c=>c.value)),i=qy[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${xt(c.value)}"${d}>${xt(c.label)}</option>`}).join(""),a=n!==Ns&&!s.has(n)?`<option value="${xt(n)}" selected>${xt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${xt(o)}</span>
          <select class="input mono" name="${xt(r)}">${i}${a}</select>
        </label>`},OW=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${xt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${xW(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${WW(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${xW(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${WW(e.secrets,"openai","openaiModel","OpenAI model")}
        ${xW(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${WW(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var D7=l(()=>{"use strict";N7()});var g_,H7,F7=l(()=>{"use strict";g_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),H7=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${g_(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in AgentWitch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">Nothing installed yet. Install playbooks in AgentWitch Cloud \u2014 files land in your profile harness on this computer. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${g_(s.name)}</strong> <span class="muted mono">(${g_(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${g_(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from AgentWitch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var $he,$7,z7,U7=l(()=>{"use strict";$he=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,$7=e=>e.kind==="folder",z7=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&$7(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if($7(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted($he)};return r(t)}});var B7,jW,G7=l(()=>{"use strict";B7=p(require("node:path")),jW=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${jW(r.children,t)}</ul>
            </details>
          </li>`;let o=B7.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var K7,Kn,zhe,Uhe,bm,Bhe,MW,V7=l(()=>{"use strict";RP();K7=p(require("node:path"));F7();U7();G7();Kn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zhe=()=>`(() => {
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

})();`,Uhe=()=>`(() => {
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
})();`,bm=e=>{let t=cp({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in AgentWitch Cloud",body:"Install and update playbooks in the browser; this computer keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=H7({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Kn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Kn(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Bhe(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
        <p class="muted">Advanced: pull rules from an existing folder on disk (does not replace installing from AgentWitch Cloud).</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",d=a?"":`<section class="card">
      <p class="eyebrow">Advanced</p>
      <h1>Import from disk</h1>
      <p class="lede">Scan a folder for existing <code>.cursor</code> rules and copy them into the profile harness on this computer. Prefer installing playbooks from AgentWitch Cloud when possible.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Kn(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Kn(s)}" />
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
    <script>${zhe()}</script>
    <script>${Uhe()}</script>`;return`${t}${r}${o}${c}${d}`},Bhe=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=z7(a.items.map(g=>({...g,relativePath:typeof g.relativePath=="string"&&g.relativePath.length>0?g.relativePath:K7.default.relative(a.sourceRoot,g.sourcePath).replaceAll("\\","/")}))),u=jW(d,Kn),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Kn(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Kn(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Kn(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},MW=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??u??a,g=t.sets[i];if(g===void 0)continue;let y=a.length>0?a:g.proposedSlug,h=m.length>0?m:g.proposedName,S=r.has(i),w=g.items.map(I=>({id:I.id,kind:I.kind,title:I.title,sourcePath:I.sourcePath,include:S}));s.push({slug:y,name:h,items:w})}return s}});var q7=l(()=>{"use strict";V7()});var Ghe,NW,J7=l(()=>{"use strict";At();Ghe=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},NW=Ghe});var Khe,Y7,X7=l(()=>{"use strict";At();Khe=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[ae]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},Y7=Khe});var Z7,Vhe,Q7,eX=l(()=>{"use strict";ht();Z7={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:`This project already has ${64} active pitfalls, the most allowed. Retire one, then try again.`},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"AgentWitch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach AgentWitch Cloud. Check this computer on Status, then try again."}},Vhe=e=>e!==null&&Object.prototype.hasOwnProperty.call(Z7,e)?Z7[e]:null,Q7=Vhe});var tX,rX=l(()=>{"use strict";tX=[{label:"Haiku",goal:"Write a short haiku about morning rain."},{label:"Trip plan",goal:"Plan a quiet weekend trip to a nearby lake."},{label:"Rainbows",goal:"Explain how rainbows form in simple words."},{label:"Dinner idea",goal:"Suggest a quick vegetarian dinner for two."}]});var Mr,Rm,DW=l(()=>{"use strict";Vo();rX();vx();Mr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rm=e=>{let t=e.promptValue??"",r=zA({presets:tX,groupLabel:G.groupLabel,leadLabel:G.lead,submitName:"rulePrompt"}),o=e.promptError!==void 0&&e.promptError!==null?`<p class="alert-error">${Mr(e.promptError)}</p>`:"",n=e.resultHtml!==void 0&&e.resultHtml.length>0?`<div class="stack">${e.resultHtml}</div>`:"",s=e.usageHtml!==void 0&&e.usageHtml.length>0?`<section class="stack">
          <h3>${Mr(G.ruleUseHeading)}</h3>
          <p class="lede">${Mr(G.ruleUseIntro)}</p>
          ${e.usageHtml}
        </section>`:"";return`<section class="stack" aria-label="${Mr(G.heading)}">
      <h2>${Mr(G.heading)}</h2>
      <p class="lede">${Mr(G.intro)}</p>
      <form method="GET" action="/project" class="stack">
        <input type="hidden" name="id" value="${Mr(e.projectId)}" />
        <input type="hidden" name="tab" value="harness" />
        ${r}
        <label class="field-label" for="rule-compare-prompt">${Mr(G.customLabel)}</label>
        <p class="muted">${Mr(G.customHint)}</p>
        <textarea class="input" id="rule-compare-prompt" name="rulePrompt" rows="3">${Mr(t)}</textarea>
        ${o}
        <div class="actions">
          <button class="btn btn-primary" type="submit">${Mr(G.button)}</button>
        </div>
      </form>
      ${n}
      ${s}
    </section>`}});var ec,HW,FW=l(()=>{"use strict";Vo();ec=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HW=e=>{if(e.matched.length===0)return`<p class="empty">${ec(G.noRules)}</p>`;let t=e.matched.length===1?G.oneRule:G.nRules(e.matched.length),r=`<ul class="stack">${e.matched.map(n=>`<li><strong>${ec(n.title)}</strong> <span class="muted mono">${ec(n.id)}</span></li>`).join("")}</ul>`,o=`$${e.tokens.addedCostUsd.toFixed(4)}`;return`<div class="stack">
      <p>${ec(t)}</p>
      ${r}
      <p class="muted">${ec(G.tokenLine(e.tokens.promptTokens,e.tokens.rulesTokens))}</p>
      <p class="muted">${ec(G.costLine(o))}</p>
    </div>`}});var cr,qhe,$W,zW=l(()=>{"use strict";oW();Vo();cr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qhe=e=>e===1?G.usedOnce:G.usedN(e),$W=e=>{let t=e.flashHtml??"";if(e.rules.length===0)return`${t}<p class="empty">${cr(G.emptyRules)}</p>`;let r=new Map(e.rules.map(n=>[n.ruleId,n])),o=e.rules.map(n=>{let i=tW({rule:n,rulesById:r,overlaps:e.overlaps,nowMs:e.nowMs}).map(c=>`<span class="muted">${cr(rW(c))}</span>`).join(" \xB7 "),a=n.active?`<form method="POST" action="/project/rules/drop" class="inline-form">
            <input type="hidden" name="projectId" value="${cr(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${cr(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${cr(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${cr(G.drop)}</button>
          </form>`:`<form method="POST" action="/project/rules/restore" class="inline-form">
            <input type="hidden" name="projectId" value="${cr(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${cr(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${cr(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${cr(G.restore)}</button>
          </form>`;return`<li class="stack">
          <p><strong>${cr(n.title)}</strong> <span class="muted">${cr(qhe(n.hitCount))}</span></p>
          ${i?`<p>${i}</p>`:""}
          ${a}
        </li>`}).join("");return`${t}<ul class="stack">${o}</ul>`}});var Yo,oX,Xo,nX,UW=l(()=>{"use strict";Vo();Yo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oX=e=>{let t=G.dropped(e.title),r=e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Yo(e.prompt)}" />`:"";return`<div class="alert-success actions">
      <span>${Yo(t)}</span>
      <form method="POST" action="/project/rules/restore" class="inline-form">
        <input type="hidden" name="projectId" value="${Yo(e.projectId)}" />
        <input type="hidden" name="ruleId" value="${Yo(e.ruleId)}" />
        ${r}
        <button class="btn btn-secondary btn-compact" type="submit">${Yo(G.undo)}</button>
      </form>
    </div>`},Xo=(e,t="error")=>`<p class="${t==="error"?"alert-error":"muted"}">${Yo(e)}</p>`,nX=e=>{let t=`/project?id=${encodeURIComponent(e.projectId)}&tab=harness&rulePrompt=${encodeURIComponent(e.prompt)}`;return`<p class="alert-error">${Yo(G.usageError)} <a href="${Yo(t)}">${Yo(G.tryAgain)}</a></p>`}});var Jhe,sX,iX=l(()=>{"use strict";Vo();UW();zW();Jhe=(e,t)=>e.ok?"":e.reason==="forbidden"?Xo(G.ownerOnlyDrop):e.reason==="limit_exceeded"?Xo(G.limitReached):Xo(t==="restore"?G.restoreFailed:G.dropFailed),sX=e=>{if(e.usage===null)return Xo(G.connectComputer,"muted");if(!e.usage.ok)return e.usage.reason==="not_connected"?Xo(G.connectComputer,"muted"):e.usage.reason==="forbidden"?Xo(G.ownerOnlyUsage,"muted"):nX({projectId:e.projectId,prompt:e.prompt});let t="";return e.changeError!==void 0&&e.changeError!==null?t=Jhe(e.changeError,e.changeAction??"drop"):e.dropFlash&&(t=oX({projectId:e.projectId,ruleId:e.dropFlash.ruleId,title:e.dropFlash.title,prompt:e.prompt})),$W({projectId:e.projectId,rules:e.usage.data.rules,overlaps:e.usage.data.overlaps,flashHtml:t,prompt:e.prompt})}});var Yhe,f_,aX=l(()=>{"use strict";eo();sW();Vo();DW();FW();iX();UW();Yhe=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,source:e.source,hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,severity:e.severity}),f_=e=>{let t=e.prompt?.trim()??"";if(t.length===0)return Rm({projectId:e.projectId,promptError:e.prompt!==null&&e.prompt!==void 0?G.emptyPrompt:null});if(e.rulesUnavailable||e.activeRules===null)return Rm({projectId:e.projectId,promptValue:t,resultHtml:Xo(G.rulesUnavailable,"muted")});let o=nl({pitfalls:e.activeRules.map(Yhe),text:t}).map(s=>({id:s.id,title:s.symptom,avoidance:s.avoidance})),n=nW({prompt:t,matched:o});return Rm({projectId:e.projectId,promptValue:t,resultHtml:HW({matched:o,tokens:n}),usageHtml:sX({projectId:e.projectId,prompt:t,usage:e.usage,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})})}});var lX=l(()=>{"use strict";Kv();jx();DW();FW();zW();aX()});var cX,dX=l(()=>{"use strict";At();XA();lX();cX=async e=>{if(e.prompt===null)return f_({projectId:e.projectId,prompt:null,activeRules:[],usage:null});let t=e.cloudConfig===null?{ok:!1,reason:"not_connected"}:await Qx({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:e.projectId,pairingHeaderName:ae}),r=e.pitfalls,o=r==null||!r.ok,n=o?null:r.items.filter(s=>s.source!=="retired");return f_({projectId:e.projectId,prompt:e.prompt,activeRules:n,rulesUnavailable:o,usage:t,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})}});var BW,uX,pX=l(()=>{"use strict";At();XA();BW=(e,t)=>e.get(t)?.trim()??"",uX=async e=>{let t=new URLSearchParams(e.rawBody),r=BW(t,"projectId"),o=BW(t,"ruleId"),n=BW(t,"rulePrompt");if(r.length===0||o.length===0)return{kind:"not_found"};let s=n.length>0?`&rulePrompt=${encodeURIComponent(n)}`:"",i=`/project?id=${encodeURIComponent(r)}&tab=harness${s}`;if(e.cloudConfig===null)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent("unavailable")}`};let a=await eW({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:r,ruleId:o,action:e.action,pairingHeaderName:ae});if(!a.ok)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent(a.reason)}&ruleChangeAction=${e.action}`};if(e.action==="drop"&&a.data.changed){let c=new URLSearchParams({id:r,tab:"harness",ruleDropped:a.data.rule.ruleId,ruleDroppedTitle:a.data.rule.title});return n.length>0&&c.set("rulePrompt",n),{kind:"redirect",location:`/project?${c.toString()}`}}return{kind:"redirect",location:i}}});var mX=l(()=>{"use strict"});var Wi,Xhe,GW,gX=l(()=>{"use strict";RP();ET();Wi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xhe=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,GW=e=>{let t=e.flashError?`<div class="alert-error">${Wi(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Wi(e.flashMessage)}</div>`:"",r=cp({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in AgentWitch Cloud",body:"Projects are created in the browser. This page chooses their folders on this computer and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in AgentWitch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Wi(Xhe(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Wi(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Jh(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from AgentWitch Cloud? The folder on this computer stays.');">
                  <input type="hidden" name="projectId" value="${Wi(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Wi(n.name)}</strong>
                  <span class="muted mono">${Wi(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this computer</h1>
      <p class="lede">Synced from AgentWitch Cloud for this paired computer only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var fX=l(()=>{"use strict";mX();Qh();gX()});var y_,yX=l(()=>{"use strict";y_=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var hX,Nr,KW=l(()=>{"use strict";hX=p(require("node:path"));fr();Ge();Z();oe();pT();Nr=e=>{let t=B()?.layout.installDir??x();if(hX.default.basename(t)===Fr)return Nt;let r=B(),o=r!==null?et(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Nt}});var VW,SX=l(()=>{"use strict";Kr();KW();VW=async e=>{let t=ze(e.installDir),r=t?.bundleVersion??null,o=Nr(t);try{let n=await Wa(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:ws(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var qW,PX=l(()=>{"use strict";qW=e=>!e});var JW,tc,YW=l(()=>{"use strict";Z();JW=()=>`http://127.0.0.1:${ga()}/update/run`,tc=async e=>{try{let t=await fetch(JW(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Zhe,AX,XW,_X=l(()=>{"use strict";Z();Ae();YW();Zhe=()=>{_o({launchAgentLabel:Le(),installDir:x()})},AX=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},XW=async()=>{Zhe();let e=await tc({force:!0});if(e.ok)return{ok:!0,message:AX(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:AX(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Kr(),F$)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var ZW=l(()=>{"use strict";_P();yX();KW();SX();PX();_X();YW()});var bX,RX=l(()=>{"use strict";bX=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var kX,wX,QW,e0,EX=l(()=>{"use strict";kX=require("node:crypto"),wX=p(require("node:fs"));_t();oe();oe();RX();QW=!1,e0=async e=>{if(QW)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!bX(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=B();if(r===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let o=J({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&wX.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,kX.randomUUID)();QW=!0;try{if(await mT(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Ua({...r,workspace:n},e.writerAgent,t);return await ku(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{QW=!1}}});var TX=l(()=>{"use strict";EX()});var Rt,rc=l(()=>{"use strict";Rt=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var Vt,se,kt,Oi,CX,Dr,Ce,h_,S_,IX,Vn,qn,P_,A_,t0,r0,o0,ji,LX,Q=l(()=>{"use strict";Vt="history",se="skills",kt="_drafts",Oi="_tombstones",CX="state.json",Dr="meta.json",Ce="skillgen",h_="episodes.json",S_="budget.json",IX="metrics.jsonl",Vn="SKILL.md",qn="meta.json",P_="learned-pitfalls.json",A_="flags.json",t0="index",r0="store.db",o0="acks",ji="tasks",LX="outcomes"});var Mi,xX,wt,ie,ft=l(()=>{"use strict";Mi=p(require("node:fs")),xX=p(require("node:path"));Q();wt=e=>{Mi.default.mkdirSync(e,{recursive:!0,mode:448});try{Mi.default.chmodSync(e,448)}catch{}},ie=(e,t)=>{wt(xX.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;Mi.default.writeFileSync(r,t,{mode:384});try{Mi.default.chmodSync(r,384)}catch{}Mi.default.renameSync(r,e);try{Mi.default.chmodSync(e,384)}catch{}}});var Jn,U,ge,ee=l(()=>{"use strict";Jn=p(require("node:path"));Z();rc();ft();Q();U=e=>{if(!Rt(e))throw new Error("invalid_project_id");let t=z();return Jn.default.join(t.projectDataDir,e)},ge=e=>{let t=U(e);wt(t),wt(Jn.default.join(t,Vt));let r=Jn.default.join(t,se);return wt(r),wt(Jn.default.join(r,kt)),wt(Jn.default.join(r,Oi)),wt(Jn.default.join(t,Ce)),wt(Jn.default.join(t,ji)),t}});var n0,s0,__=l(()=>{"use strict";n0=/^[a-z0-9][a-z0-9_-]{0,63}$/,s0="sha256:"});var WX,Ye,km=l(()=>{"use strict";WX=require("node:crypto");__();Ye=e=>`${s0}${(0,WX.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var Ni,wm=l(()=>{"use strict";__();Ni=e=>n0.test(e)});var Em,b_=l(()=>{"use strict";Em=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var i0,a0=l(()=>{"use strict";i0=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var l0,c0=l(()=>{"use strict";wm();l0=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>Ni(r.skillId))}catch{return[]}}});var d0,u0=l(()=>{"use strict";d0=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var p0,m0=l(()=>{"use strict";km();p0=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:Ye(t.body)===t.contentHash?t:null}catch{return null}}});var g0,f0=l(()=>{"use strict";km();wm();g0=async e=>{if(!Ni(e.skillId))return{ok:!1,code:"unavailable"};let t=Ye(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var y0,h0=l(()=>{"use strict";wm();y0=async e=>{if(!Ni(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var S0,P0=l(()=>{"use strict";km();b_();m0();f0();S0=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await p0({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(Em({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||Ye(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await g0({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var A0,_0=l(()=>{"use strict";b_();h0();A0=async e=>Em({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await y0({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var Tm,R_,OX=l(()=>{"use strict";a0();c0();u0();P0();_0();Tm="[project-skill-pull-mirror]",R_=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await i0({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await d0({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(Tm,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await S0({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(u){console.warn(Tm,"skill_failed",d.skillId,u),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await l0({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await A0({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(u){console.warn(Tm,"orphan_tombstone_failed",d.skillId,u),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(Tm,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(Tm,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var Yn=l(()=>{"use strict";__();km();wm();b_();a0();c0();u0();m0();f0();h0();P0();_0();OX()});var Di,Cm,Qhe,eSe,Im,k_=l(()=>{"use strict";Di=p(require("node:fs")),Cm=p(require("node:path"));ft();Yn();Q();ee();Qhe=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),eSe=e=>`v${String(e).padStart(4,"0")}.md`,Im=e=>{if(!Qhe(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=ge(e.projectId),r=Cm.default.join(t,se,e.skillId),o=Cm.default.join(r,eSe(e.version)),n=Cm.default.join(r,Dr),s=Ye(e.body);if(Di.default.existsSync(o)&&Di.default.existsSync(n))try{let a=JSON.parse(Di.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&Di.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}ie(o,e.body),ie(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=Cm.default.join(t,se,Oi,`${e.skillId}.json`);return Di.default.existsSync(i)&&Di.default.unlinkSync(i),{path:o,contentHash:s}}});var Lm,w_,R0,k0=l(()=>{"use strict";Lm=p(require("node:fs")),w_=p(require("node:path"));Yn();Q();ee();R0=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=U(e.projectId)}catch{return null}let r=w_.default.join(t,se,e.skillId),o=w_.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=w_.default.join(r,Dr);if(!Lm.default.existsSync(o)||!Lm.default.existsSync(n))return null;try{let s=Lm.default.readFileSync(o,"utf8"),i=JSON.parse(Lm.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||Ye(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var Zo,Xn,jX,tSe,w0,E0,T0=l(()=>{"use strict";Zo=p(require("node:fs")),Xn=p(require("node:path"));ft();Q();ee();jX=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),tSe=(e,t)=>{if(!Zo.default.existsSync(e))return;let r=`.${t}.`;for(let o of Zo.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=Xn.default.join(e,o);try{Zo.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},w0=e=>{if(!jX(e.skillId))throw new Error("invalid_project_skill_id");let t=ge(e.projectId),r=Xn.default.join(t,se),o=Xn.default.join(r,e.skillId),n=!1;if(Zo.default.existsSync(o)){let c=Xn.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{Zo.default.renameSync(o,c),Zo.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}tSe(r,e.skillId);let s=Xn.default.join(r,Oi);wt(s);let i=Xn.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return ie(i,`${JSON.stringify(a)}
`),{removed:n}},E0=e=>{if(!jX(e.skillId))return null;let t;try{t=U(e.projectId)}catch{return null}let r=Xn.default.join(t,se,Oi,`${e.skillId}.json`);if(!Zo.default.existsSync(r))return null;try{let o=JSON.parse(Zo.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var vm,C0,I0,L0=l(()=>{"use strict";vm=p(require("node:fs")),C0=p(require("node:path"));Q();ee();I0=e=>{let t;try{t=U(e.projectId)}catch{return[]}let r=C0.default.join(t,se);if(!vm.default.existsSync(r))return[];let o=[];for(let n of vm.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=C0.default.join(r,n,Dr);if(vm.default.existsSync(s))try{let i=JSON.parse(vm.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var v0,x0=l(()=>{"use strict";v0=e=>e.toMembershipId===null&&e.toUserId===null&&e.toTeamLabel===null});var MX,rSe,oSe,nSe,sSe,W0,NX,DX,rit,oit,iSe,nit,aSe,lSe,sit,O0=l(()=>{"use strict";MX=(e,t)=>{let r=process.env[e]?.trim();if(!r)return t;let o=Number.parseInt(r,10);return Number.isFinite(o)&&o>0?o:t},rSe="peer.silent",oSe="peer.silent_blocked",nSe="composer.recipient_sticky_cleared",sSe="project.updated",W0=[rSe,oSe,nSe],NX="System",DX="Owner",rit=5*6e4,oit=10*6e4,iSe=300,nit=MX("AWC_PROJECT_MESSAGE_HOURLY_CAP",iSe),aSe=300,lSe=MX("AWC_PROJECT_MESSAGE_UNREAD_CAP",aSe),sit=["peer.joined","peer.left","peer.renamed",sSe,...W0]});var nc,j0,cSe,mit,M0=l(()=>{"use strict";O0();nc="whole",j0="task.assign",cSe=["peer.joined","peer.left","peer.renamed"],mit=[...cSe,"composer.recipient_sticky_cleared"]});var dSe,N0,HX=l(()=>{"use strict";x0();M0();dSe=e=>e==="owner"||e==="member",N0=e=>{let{row:t}=e;return t.senderKind==="owner"||t.senderKind==="member"?v0(t)?nc:t.toMembershipId!==null&&e.botIds.has(t.toMembershipId)?t.toMembershipId:null:t.senderKind!=="bot"||t.senderMembershipId===null||!e.botIds.has(t.senderMembershipId)||!dSe(t.recipientKind)?null:e.inReplyTo!==null&&e.wholeMessageIds.has(e.inReplyTo)?nc:t.senderMembershipId}});var uSe,xm,FX=l(()=>{"use strict";uSe=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,xm=e=>{let t=uSe.exec(e);if(t===null)return{inReplyTo:null,text:e};let r=e.replace(new RegExp(`${t[0]}\\s*:?`)," ").replace(/\s+/g," ").trim();return{inReplyTo:t[0].toLowerCase(),text:r.length>0?r:e}}});var pSe,D0,$X=l(()=>{"use strict";O0();pSe=new Set(W0),D0=e=>e.sender_membership_id===null||e.sender_membership_id===void 0?pSe.has(String(e.kind))?NX:DX:e.sender_display_name?String(e.sender_display_name):null});var Wm=l(()=>{"use strict";HX();x0();M0();FX();$X()});var Hi,Me,sc=l(()=>{"use strict";Hi=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},Me=(e,t)=>{for(let r of t){let o=Hi(e[r]);if(o!==null)return o}return null}});var Om,E_=l(()=>{"use strict";Wm();sc();Om=e=>{let t=Me(e,["fromProjectDisplayName","senderLabel","sender_label"]);return t!==null?t:D0({sender_membership_id:e.sender_membership_id??e.fromMembershipId??e.senderMembershipId??null,sender_display_name:e.sender_display_name??e.senderDisplayName??null,kind:e.kind})}});var T_,H0=l(()=>{"use strict";sc();T_=e=>{let t=Me(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),r=Me(e,["toMembershipId","to_membership_id"]);return t===null&&r!==null?new Set([r]):t!==null&&r===null?new Set([t]):t!==null&&r!==null?new Set([r]):new Set}});var zX,mSe,F0,$0=l(()=>{"use strict";Wm();H0();sc();zX=(e,t,r)=>e===null?r:t.has(e)?"bot":r,mSe=(e,t)=>{let r=Me(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),o=Me(e,["toMembershipId","to_membership_id"]),n=Me(e,["toUserId","to_user_id"]),s=Me(e,["toTeamLabel","to_team_label"]),i=zX(r,t,"owner"),a=o!==null?zX(o,t,"member"):n!==null?"owner":"none";return{messageId:Me(e,["messageId","id"])??"unknown",kind:Hi(e.kind)??"chat.note",summary:Hi(e.summary)??"",createdAt:Me(e,["createdAt","created_at"])??new Date(0).toISOString(),senderKind:i,senderMembershipId:r,senderUserId:"history-local",senderDisplayName:null,recipientKind:a,toMembershipId:o,toUserId:n,toTeamLabel:s}},F0=e=>{let t=Me(e.message,["threadKey","thread_key"]);if(t!==null)return t;let r=e.botIds??T_(e.message),o=mSe(e.message,r),n=Me(e.message,["inReplyTo","in_reply_to"])??(o.senderKind==="bot"?xm(o.summary).inReplyTo:null);return N0({row:o,botIds:r,wholeMessageIds:e.wholeMessageIds??new Set,inReplyTo:n})}});var z0,U0,Fe=l(()=>{"use strict";z0="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM",U0="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM_DRY_RUN"});var B0,G0=l(()=>{"use strict";E_();$0();Fe();sc();B0=e=>{let t=Me(e.message,["createdAt","created_at"])??e.savedAt;return{messageId:e.messageId,projectId:e.projectId,message:e.message,savedAt:e.savedAt,version:2,threadKey:F0({message:e.message,botIds:e.botIds,wholeMessageIds:e.wholeMessageIds}),createdAt:t,senderLabel:Om(e.message)}}});var Qo,Fi=l(()=>{"use strict";Qo="message"});var K0,UX,$i,jm=l(()=>{"use strict";K0=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},UX=(e,t)=>{for(let r of t){let o=K0(e[r]);if(o!==null)return o}return null},$i=e=>{let t=e,r=K0(t.threadKey)??UX(e.message,["threadKey","thread_key"]),o=K0(t.createdAt)??UX(e.message,["createdAt","created_at"])??e.savedAt;return{threadKey:r,createdAt:o}}});var BX,GX=l(()=>{"use strict";Fi();BX=`
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
`});var KX,VX,qX=l(()=>{"use strict";KX=p(require("node:path"));Q();ee();VX=e=>KX.default.join(U(e),t0,r0)});var JX,YX,ySe,hSe,Zn,Qn,ic=l(()=>{"use strict";JX=p(require("node:fs")),YX=p(require("node:path"));eo();Fi();GX();qX();ySe=e=>{let t=e.prepare("SELECT value FROM history_store_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},hSe=(e,t)=>{e.prepare(`INSERT INTO history_store_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},Zn=e=>{let t=zt();if(!t.ok)return{ok:!1,reason:t.reason};let r=VX(e);JX.default.mkdirSync(YX.default.dirname(r),{recursive:!0,mode:448});let o=new t.sqlite.DatabaseSync(r);return o.exec(`PRAGMA busy_timeout = ${3e3}`),o.exec(BX),ySe(o)<1&&hSe(o,1),{ok:!0,db:o}},Qn=e=>{e.close()}});var SSe,C_,I_=l(()=>{"use strict";Fi();jm();ic();SSe="[project-history-index]",C_=e=>{let t=Zn(e.record.projectId);if(!t.ok)return{ok:!1,reason:t.reason};let{threadKey:r,createdAt:o}=$i(e.record),n=e.kind??Qo;try{return t.db.prepare(`INSERT INTO records (message_id, project_id, kind, thread_key, created_at, saved_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(message_id) DO UPDATE SET
           project_id = excluded.project_id,
           kind = excluded.kind,
           thread_key = excluded.thread_key,
           created_at = excluded.created_at,
           saved_at = excluded.saved_at`).run(e.record.messageId,e.record.projectId,n,r,o,e.record.savedAt),{ok:!0,threadKey:r,createdAt:o}}catch(s){return console.error(SSe,"ingest_failed",e.record.projectId,e.record.messageId,s),{ok:!1,reason:"ingest_failed"}}finally{Qn(t.db)}}});var q0,ZX,PSe,ASe,XX,J0,Y0=l(()=>{"use strict";q0=p(require("node:fs")),ZX=p(require("node:path"));ft();G0();I_();Q();ee();PSe="[project-history-write]",ASe=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),XX=e=>{try{C_({record:e})}catch(t){console.error(PSe,"index_ingest_failed",e.projectId,e.messageId,t)}},J0=e=>{let t=e.messageId.trim();if(!ASe(t))throw new Error("invalid_message_id");let r=ge(e.projectId),o=ZX.default.join(r,Vt,`${t}.json`);if(q0.default.existsSync(o))try{let s=JSON.parse(q0.default.readFileSync(o,"utf8"));if(s.messageId===t)return XX(s),s}catch{}let n=B0({messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString(),botIds:e.botIds,wholeMessageIds:e.wholeMessageIds});return ie(o,`${JSON.stringify(n)}
`),XX(n),n}});var Mm,QX,e9,mo,ac,X0,es=l(()=>{"use strict";Mm=p(require("node:fs")),QX=p(require("node:path"));ft();Q();ee();Z();e9=e=>QX.default.join(U(e),Vt,CX),mo=e=>{try{let t=e9(e);if(!Mm.default.existsSync(t))return null;let r=JSON.parse(Mm.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},ac=e=>{ge(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return ie(e9(e.projectId),`${JSON.stringify(t)}
`),t},X0=()=>{let t=z().projectDataDir;if(!Mm.default.existsSync(t))return[];let r=[];for(let o of Mm.default.readdirSync(t)){if(!Rt(o))continue;let n=mo(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var t9,r9=l(()=>{"use strict";At();t9=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[ae]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var Z0,Q0=l(()=>{"use strict";Z0=e=>{let t=e.deviceId.trim(),r=e.messageId.trim();if(t.length===0)throw new Error("invalid_device_id");if(r.length===0)throw new Error("invalid_message_id");let o=e.ackedAt??new Date().toISOString();return{deviceId:t,messageId:r,ackedAt:o,lastSeenAt:e.lastSeenAt??o}}});var eO,n9,o9,tO,rO=l(()=>{"use strict";eO=p(require("node:fs")),n9=p(require("node:path"));ft();Q0();Q();ee();o9=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),tO=e=>{let t=e.messageId.trim(),r=e.deviceId.trim();if(!o9(t)||!o9(r))throw new Error("invalid_ack_ids");let o=ge(e.projectId),n=n9.default.join(o,Vt,o0,`${t}.json`),s=e.nowIso??new Date().toISOString();if(eO.default.existsSync(n))try{let a=JSON.parse(eO.default.readFileSync(n,"utf8"));if(a.messageId===t&&a.deviceId===r&&typeof a.ackedAt=="string"){let c={...a,lastSeenAt:s};return ie(n,`${JSON.stringify(c)}
`),c}}catch{}let i=Z0({deviceId:r,messageId:t,ackedAt:s,lastSeenAt:s});return ie(n,`${JSON.stringify(i)}
`),i}});var lc,s9,_Se,oO,i9=l(()=>{"use strict";Rr();oe();es();r9();rO();Y0();lc="[project-history-dispatch]",s9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_Se=()=>{let e=B();return e===null?null:J({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},oO=async e=>{if(!s9(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!s9(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{J0({projectId:t,messageId:o,message:r}),ac({projectId:t,state:"on_ready"});let s=typeof e.deviceId=="string"?e.deviceId.trim():"";if(s.length>0)try{tO({projectId:t,deviceId:s,messageId:o})}catch(i){console.error(lc,"local_ack_failed",t,o,i)}}catch(s){console.error(lc,"write_failed",t,o,s);try{ac({projectId:t,state:"degraded"})}catch(i){console.error(lc,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?_Se():e.cloudApi;if(n===null)return console.error(lc,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await t9({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(lc,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(lc,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var nO,a9,bSe,cc,Nm=l(()=>{"use strict";nO=p(require("node:fs")),a9=p(require("node:path"));Q();ee();bSe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},cc=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=a9.default.join(U(e.projectId),Vt,`${t}.json`);if(!nO.default.existsSync(r))return null;try{let o=JSON.parse(nO.default.readFileSync(r,"utf8"));return bSe(o)?o:null}catch{return null}}});var Dm,L_=l(()=>{"use strict";Nm();Dm=e=>cc(e)});var sO,l9,zi,Hm=l(()=>{"use strict";sO=p(require("node:fs")),l9=p(require("node:path"));Q();Nm();ee();zi=e=>{let t=l9.default.join(U(e),Vt);if(!sO.default.existsSync(t))return[];let r=sO.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=cc({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),a=Date.parse(s.savedAt);return i!==a?i-a:n.messageId.localeCompare(s.messageId)})}});var Fm,RSe,kSe,wSe,ESe,TSe,CSe,iO,Ui,$m=l(()=>{"use strict";Fi();jm();Hm();ic();eo();Fm=(e,t)=>{let r=e[t];return typeof r=="string"?r:null},RSe=e=>{let t=Fm(e,"messageId"),r=Fm(e,"projectId"),o=Fm(e,"kind"),n=Fm(e,"createdAt"),s=Fm(e,"savedAt");if(t===null||r===null||o===null||n===null||s===null)return null;let i=e.threadKey,a=i==null?null:typeof i=="string"?i:null;return{messageId:t,projectId:r,kind:o==="summary"?"summary":Qo,threadKey:a,createdAt:n,savedAt:s}},kSe=50,wSe=200,ESe=e=>typeof e!="number"||!Number.isFinite(e)||e<=0?kSe:Math.min(Math.floor(e),wSe),TSe=(e,t)=>{let r=Date.parse(e.createdAt),o=Date.parse(t.createdAt);return r!==o?o-r:t.messageId.localeCompare(e.messageId)},CSe=(e,t,r)=>{if(t==null||t==="")return!0;let o=Date.parse(e.createdAt),n=Date.parse(t);return o<n?!0:o>n?!1:r==null||r===""?!0:e.messageId.localeCompare(r)<0},iO=(e,t)=>{let r=e.threadKey===void 0||e.threadKey===null?null:e.threadKey;return{available:!0,rows:zi(e.projectId).map(n=>{let s=$i(n);return{messageId:n.messageId,projectId:n.projectId,kind:Qo,threadKey:s.threadKey,createdAt:s.createdAt,savedAt:n.savedAt}}).filter(n=>r===null?!0:n.threadKey===r).filter(n=>CSe(n,e.beforeCreatedAt,e.beforeMessageId)).sort(TSe).slice(0,t)}},Ui=e=>{let t=ESe(e.limit);if(!zt().ok)return iO(e,t);let o=Zn(e.projectId);if(!o.ok)return{...iO(e,t),reason:o.reason};try{let n=[e.projectId,Qo],s=`SELECT message_id AS messageId, project_id AS projectId, kind,
              thread_key AS threadKey, created_at AS createdAt, saved_at AS savedAt
       FROM records
       WHERE project_id = ? AND kind = ?`;e.threadKey!==void 0&&e.threadKey!==null&&(s+=" AND thread_key = ?",n.push(e.threadKey)),e.beforeCreatedAt!==void 0&&e.beforeCreatedAt!==null&&e.beforeCreatedAt!==""&&(e.beforeMessageId!==void 0&&e.beforeMessageId!==null&&e.beforeMessageId!==""?(s+=" AND (created_at < ? OR (created_at = ? AND message_id < ?))",n.push(e.beforeCreatedAt,e.beforeCreatedAt,e.beforeMessageId)):(s+=" AND created_at < ?",n.push(e.beforeCreatedAt))),s+=" ORDER BY created_at DESC, message_id DESC LIMIT ?",n.push(t);let i=o.db.prepare(s).all(...n),a=[];for(let c of i){let d=RSe(c);d!==null&&a.push(d)}return{available:!0,rows:a}}catch{return iO(e,t)}finally{Qn(o.db)}}});var v_,aO,ISe,en,LSe,lO,cO=l(()=>{"use strict";v_=p(require("node:fs")),aO=p(require("node:path"));Q();ee();ISe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),en=e=>typeof e=="string"&&e.trim().length>0?e:null,LSe=e=>{try{let t=JSON.parse(v_.default.readFileSync(e,"utf8"));if(!ISe(t))return null;let r=en(t.taskId),o=en(t.projectId),n=en(t.status),s=en(t.createdAt),i=en(t.savedAt);if(r===null||o===null||n===null||s===null||i===null)return null;let a=t.threadKey,c=a==null?null:en(a);return{taskId:r,projectId:o,threadKey:c,writerAgent:en(t.writerAgent),status:n,promptSummary:typeof t.promptSummary=="string"?t.promptSummary:"",resultSummary:typeof t.resultSummary=="string"?t.resultSummary:"",promptBody:typeof t.promptBody=="string"?t.promptBody:null,resultBody:typeof t.resultBody=="string"?t.resultBody:null,createdAt:s,completedAt:t.completedAt===null||t.completedAt===void 0?null:en(t.completedAt),agentRunId:en(t.agentRunId),savedAt:i}}catch{return null}},lO=e=>{let t;try{t=aO.default.join(U(e),ji)}catch{return[]}if(!v_.default.existsSync(t))return[];let r=v_.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=LSe(aO.default.join(t,n.name));s!==null&&o.push(s)}return o}});var c9,d9,dO,uO,pO=l(()=>{"use strict";Wm();c9="ai.session",d9=e=>e.agentRunId!==null&&e.agentRunId.trim().length>0?e.agentRunId.trim():e.taskId,dO=e=>{let t=d9(e),r=e.resultSummary.trim().length>0?e.resultSummary:e.promptSummary;return{messageId:t,createdAt:e.createdAt,author:{kind:"bot",membershipId:null,displayName:e.writerAgent},kind:c9,entryKind:"session",session:{status:e.status,writerAgent:e.writerAgent,agentRunId:t},text:r,needsReply:!1,inReplyTo:null,states:[]}},uO=(e,t)=>t===nc});var Bi,zm=l(()=>{"use strict";Bi=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var vSe,mO,gO=l(()=>{"use strict";Wm();E_();jm();zm();H0();sc();vSe=(e,t)=>e===null?"owner":t.has(e)?"bot":"member",mO=e=>{let t=e.message,r=$i(e),o=T_(t),n=Me(t,["fromMembershipId","senderMembershipId","sender_membership_id"]),s=Hi(t.kind)??Me(t,["messageKind"])??"chat.note",i=Hi(t.summary)??Bi(e),a=vSe(n,o),c=Me(t,["inReplyTo","in_reply_to"]),d=c!==null?{inReplyTo:c,text:i}:a==="bot"?xm(i):{inReplyTo:null,text:i},u=Om(t)??Me(t,["senderDisplayName","sender_display_name"]);return{messageId:e.messageId,createdAt:r.createdAt,author:{kind:a,membershipId:n,displayName:u},kind:s,text:d.text,needsReply:s===j0,inReplyTo:d.inReplyTo,states:[]}}});var xSe,WSe,fO,yO,hO=l(()=>{"use strict";xSe=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?(Z|[+-]\d{2}(:?\d{2})?)$/,WSe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fO=e=>Buffer.from(JSON.stringify({t:e.t,id:e.id}),"utf8").toString("base64url"),yO=e=>{if(e==null||e.trim().length===0)return null;let t;try{let n=Buffer.from(e.trim(),"base64url").toString("utf8");t=JSON.parse(n)}catch{return"invalid"}if(!WSe(t))return"invalid";let r=t.t,o=t.id;return typeof r!="string"||typeof o!="string"||!xSe.test(r)||o.length===0||o.length>200?"invalid":{t:r,id:o}}});var u9,OSe,SO,PO=l(()=>{"use strict";L_();$m();cO();pO();gO();hO();u9=(e,t)=>e.createdAt!==t.createdAt?e.createdAt<t.createdAt?1:-1:e.messageId<t.messageId?1:-1,OSe=(e,t,r)=>t==null||t===""||e.createdAt<t?!0:e.createdAt>t?!1:r==null||r===""?!0:e.messageId<r,SO=e=>{let t=yO(e.beforeCursor);if(t==="invalid")return{entries:[],nextBeforeCursor:null,hasMore:!1};let r=typeof e.limit=="number"&&Number.isFinite(e.limit)?Math.max(1,Math.floor(e.limit)):50,o=t?.t??null,n=t?.id??null,s=Ui({projectId:e.projectId,threadKey:e.threadKey,beforeCreatedAt:o,beforeMessageId:n,limit:r+1}),i=[];for(let S of s.rows){let w=Dm({projectId:e.projectId,messageId:S.messageId});if(w===null){i.push({messageId:S.messageId,createdAt:S.createdAt,author:{kind:"owner",membershipId:null,displayName:null},kind:"chat.note",text:"",needsReply:!1,inReplyTo:null,states:[]});continue}i.push(mO(w))}let a=[];for(let S of lO(e.projectId)){if(!uO(S,e.threadKey))continue;let w=dO(S);OSe(w,o,n)&&a.push(w)}let c=[...i,...a].sort(u9),d=new Map;for(let S of c)d.has(S.messageId)||d.set(S.messageId,S);let u=[...d.values()].sort(u9),m=u.length>r,g=m?u.slice(0,r):u,y=g.length>0?g[g.length-1]:void 0,h=m&&y!==void 0?fO({t:y.createdAt,id:y.messageId}):null;return{entries:g,nextBeforeCursor:h,hasMore:m}}});var jSe,AO,p9=l(()=>{"use strict";PO();jSe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),AO=e=>{if(!jSe(e.payload))return{ok:!1,errorCode:"invalid_payload",errorMessage:"project.history.page.request requires an object payload."};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=typeof e.payload.threadKey=="string"?e.payload.threadKey.trim():"";if(t.length===0||r.length===0)return{ok:!1,errorCode:"invalid_payload",errorMessage:"projectId and threadKey are required."};let o=typeof e.payload.beforeCursor=="string"?e.payload.beforeCursor:void 0,n=e.payload.limit,s=typeof n=="number"&&Number.isFinite(n)?Math.max(1,Math.min(100,Math.floor(n))):50;try{let i=SO({projectId:t,threadKey:r,beforeCursor:o,limit:s});return{ok:!0,projectId:t,threadKey:r,entries:i.entries,nextBeforeCursor:i.nextBeforeCursor,hasMore:i.hasMore}}catch(i){return{ok:!1,errorCode:"read_failed",errorMessage:i instanceof Error?i.message:"History page read failed."}}}});var _O,bO=l(()=>{"use strict";L0();es();k0();ee();T0();k_();_O=()=>({isHistoryEnabled:e=>{let t=mo(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>U(e),writeProjectSkillVersion:e=>Im(e),readProjectSkillVersion:e=>R0(e),tombstoneProjectSkill:e=>w0(e),readProjectSkillTombstone:e=>E0(e),listProjectSkillIds:e=>I0(e)})});var m9,RO,kO=l(()=>{"use strict";At();m9=e=>({[ae]:e,Accept:"application/json"}),RO=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:m9(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:m9(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var wO,EO=l(()=>{"use strict";Fe();wO=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var TO,CO=l(()=>{"use strict";Fe();TO=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(u=>u.createdAtMs)),i=n.length>=t,a=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!a&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":a?"idle":"max_interval",messageIds:n.map(u=>u.messageId)}}});var uc,x_=l(()=>{"use strict";Fe();uc=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var P9,A9,NSe,W_,IO=l(()=>{"use strict";Fe();P9=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),A9=e=>e.trim().toLowerCase().replace(/\s+/g," "),NSe=(e,t)=>{let r=new Set(e.map(A9).filter(i=>i.length>0)),o=new Set(t.map(A9).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},W_=e=>{let t=e.nearDupJaccard??.6,r=P9(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(P9(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(NSe(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var LO,vO=l(()=>{"use strict";LO=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var xO,HSe,WO,FSe,OO,jO=l(()=>{"use strict";Fe();xO=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},HSe=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,WO=e=>HSe.test(e),FSe=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,OO=e=>FSe.test(e)});var Um,O_=l(()=>{"use strict";Um=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var _9,tn,b9,pc=l(()=>{"use strict";St();_9=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,tn=e=>{let t=An(e),r=t.scrubbed.match(_9)?.length??0,o=t.scrubbed.replace(_9,"[redacted-email]");return{scrubbed:o,residualSecret:Hd(o),replacementCount:t.replacementCount+r}},b9=e=>Hd(e)});var R9,$Se,zSe,USe,BSe,k9,w9=l(()=>{"use strict";R9="source_message_ids",$Se=e=>Array.from(new Set(e.map(t=>t.trim()).filter(t=>t.length>0))),zSe=e=>e.trimStart().startsWith(`${R9}:`),USe=e=>/^\s+-\s*/.test(e),BSe=e=>e.reduce((t,r)=>zSe(r)?{kept:t.kept,skipping:!0}:t.skipping&&USe(r)?t:{kept:[...t.kept,r],skipping:!1},{kept:[],skipping:!1}).kept,k9=e=>{let t=e.skillMarkdown.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return e.skillMarkdown;let r=t.indexOf(`
---`,3);if(r<0)return e.skillMarkdown;let o=t.slice(0,3),n=t.slice(3,r).replace(/^\r?\n/,"").split(/\r?\n/).filter((a,c,d)=>!(c===d.length-1&&a==="")),s=$Se(e.sourceMessageIds),i=[...BSe(n),`${R9}: ${JSON.stringify(s)}`];return`${o}
${i.join(`
`)}${t.slice(r)}`}});var MO,NO,DO,Bm=l(()=>{"use strict";MO=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],NO={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},DO=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var HO,FO=l(()=>{"use strict";Bm();HO=(e,t)=>{let r=NO[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var GSe,go,zO=l(()=>{"use strict";FO();Fe();GSe=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},go=e=>{let t=GSe(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=HO(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var qSe,E9,JSe,YSe,UO,Gm,j_=l(()=>{"use strict";Fe();pc();qSe=/^[a-z0-9][a-z0-9-]{0,63}$/,E9=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let a=i.indexOf(":");if(a<=0)continue;let c=i.slice(0,a).trim(),d=i.slice(a+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},JSe=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,YSe=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},UO=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(b9(o))return{ok:!1,reason:"residual_secret"};let s=E9(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:a}=s,c=i.name??"";if(!qSe.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let u=i.version??"";if(u.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let m=YSe(i.source_message_ids??i.source_message_ids);if(m===null||m.length===0)return{ok:!1,reason:"missing_source_message_ids"};let g=JSe(a);return g<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:u,sourceMessageIds:m,stepCount:g,bodyBytes:n}},Gm=e=>(((E9(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var C9,XSe,fo,M_,N_=l(()=>{"use strict";C9=require("node:crypto");Yn();Fe();EO();CO();x_();IO();vO();jO();O_();pc();w9();zO();j_();XSe=e=>Math.ceil(e.length/4),fo=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),M_=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??XSe,a=e.messages.map(u=>u.text).join(`
`),c=(u,m,g)=>{r.push(Um({projectId:t.projectId,episodeId:t.episodeId,fromState:u,toState:m,reason:g,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let u=0;u<16;u+=1){let m=uc({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let g=TO({messages:e.messages.map(S=>({messageId:S.messageId,createdAtMs:S.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),y=go({state:t.state,verdict:{kind:"close",ready:g.ready}});if(!y.ok)break;let h=t.state;t=fo(t,y.nextState,g.ready?g.reason:null,{messageIds:g.ready?g.messageIds:t.messageIds,closedAtMs:g.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(S=>OO(S.text)),hasSuccessSignal:e.messages.some(S=>WO(S.text))}),c(h,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(m.capReached){let S=go({state:t.state,verdict:{kind:"draft_cap",reached:!0}});S.ok&&(c(t.state,S.nextState,"draft_cap_reached"),t=fo(t,S.nextState,"draft_cap_reached"));break}let g=wO({tokensUsedToday:e.tokensUsedToday+n}),y=go({state:t.state,verdict:{kind:"budget",ok:g.ok}});if(!y.ok)break;let h=t.state;t=fo(t,y.nextState,g.ok?"budget_ok":g.reason),c(h,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let g=tn(a),y=go({state:t.state,verdict:{kind:"scrub",residualSecret:g.residualSecret}});if(!y.ok)break;let h=t.state;t=fo(t,y.nextState,g.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:g.scrubbed}),c(h,t.state,t.reason);continue}if(t.state==="TRIAGE"){let g=xO({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),y=go({state:t.state,verdict:{kind:"qualify",ok:g.ok}});if(!y.ok)break;let h=t.state;t=fo(t,y.nextState,g.reason),c(h,t.state,t.reason);continue}if(t.state==="DEDUP"){let g=Ye(t.scrubbedTranscript??a),y=W_({contentHash:g,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((y.action==="create_new"||y.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let h=go({state:t.state,verdict:{kind:"dedup",action:y.action}});if(!h.ok)break;let S=t.state;t=fo(t,h.nextState,y.action,{contentHash:g,mergeDraftId:y.action==="update_draft"?y.draftId:t.mergeDraftId}),c(S,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let g=t.scrubbedTranscript??"",y=LO({estimatedInputTokens:i(g),inputTokenCap:12e3}),h=await e.deps.ownerLlm({scrubbedTranscript:g,similarDraftHints:[],mode:y});n+=h.tokensUsed;let S=go({state:t.state,verdict:{kind:"extract",ok:h.ok}});if(!S.ok)break;let w=t.state;h.ok&&(s=k9({skillMarkdown:h.skillMarkdown,sourceMessageIds:t.messageIds})),t=fo(t,S.nextState,h.ok?"extract_ok":h.reason,{tokensUsed:t.tokensUsed+h.tokensUsed}),c(w,t.state,t.reason);continue}if(t.state==="VALIDATE"){let g=s??"",y=UO({skillMarkdown:g}),h=t.validateAttempts+(y.ok?0:1),S=go({state:t.state,verdict:{kind:"validate",ok:y.ok,attempts:y.ok?t.validateAttempts:Math.max(1,h)}});if(!S.ok)break;let w=t.state;if(y.ok){let I=Ye(g),f=Gm(g),k=W_({contentHash:I,name:y.name,stepLines:f,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(k.action==="skip_exact"){t=fo(t,"SKIPPED_DEDUP","skip_exact",{contentHash:I,validateAttempts:h}),c(w,t.state,"skip_exact");break}let M=k.action==="update_draft"?k.draftId:t.mergeDraftId??(0,C9.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:M,skillMarkdown:g,episodeId:t.episodeId,sourceMessageIds:y.sourceMessageIds,name:y.name,description:y.description}),t=fo(t,S.nextState,"validate_ok",{draftId:M,contentHash:o.contentHash,validateAttempts:h}),c(w,t.state,t.reason);break}if(S.nextState==="EXTRACT"&&(s=null),t=fo(t,S.nextState,y.reason,{validateAttempts:h}),c(w,t.state,t.reason),S.nextState==="EXTRACT"&&h>1)break;continue}break}let d=uc({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var BO,GO,Km,D_=l(()=>{"use strict";BO=p(require("node:fs")),GO=p(require("node:path"));ft();Q();ee();Km=e=>{if(e.events.length===0)return;let t=ge(e.projectId),r=GO.default.join(t,Ce);wt(r);let o=GO.default.join(r,IX),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;BO.default.appendFileSync(o,n,{mode:384});try{BO.default.chmodSync(o,384)}catch{}}});var mc,H_=l(()=>{"use strict";mc=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var x9,I9,L9,QSe,ePe,KO,VO=l(()=>{"use strict";x9=require("node:crypto");Fe();H_();pc();I9=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,L9=e=>e.toLowerCase().replace(/_/g," "),QSe=(e,t)=>`sha256:${(0,x9.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,ePe=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},KO=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],a=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():L9(c.state),u=tn(d);if(u.residualSecret){a+=1;continue}let m=`Avoid repeating this history failure (${L9(c.state)}).`,g=tn(m);if(g.residualSecret){a+=1;continue}let y=I9(u.scrubbed.replace(/\s+/g," ").trim(),120),h=I9(g.scrubbed.replace(/\s+/g," ").trim(),280);if(y.length===0||h.length===0)continue;let S=mc(`${y}|${h}`);if(n.has(S))continue;n.add(S);let w=QSe(y,h),I=`- **${y}:** ${h}`;s.length<t&&s.push(I),i.length<r&&i.push({id:ePe(c.episodeId,w),symptom:y,avoidance:h,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:w,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:a}}});var tPe,qO,JO=l(()=>{"use strict";H_();Fe();tPe=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},qO=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?tPe(n[3]??""):[],i=new Set(s.map(m=>mc(m))),a=[...s],c=0;for(let m of e.newPitfallLines){let g=m.trim();if(g.length===0)continue;let y=g.startsWith("- ")?g:`- ${g}`,h=mc(y);if(!i.has(h)){if(a.length>=t)break;i.add(h),a.push(y),c+=1}}let d=a.length>0?`${a.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(g,y,h)=>`${y}${h}${d}`),appendedCount:c,totalPitfallBullets:a.length};let u=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${u}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:a.length}}});var YO,O9,W9,z_,XO,ZO=l(()=>{"use strict";YO=p(require("node:fs")),O9=p(require("node:path"));Q();ee();W9="[project-history-skillgen]",z_=()=>({items:[],updatedAt:new Date(0).toISOString()}),XO=e=>{let t=O9.default.join(U(e),Ce,P_);if(!YO.default.existsSync(t))return z_();try{let r=JSON.parse(YO.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(W9,"learned_pitfalls_corrupt",e),z_()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:z_().updatedAt}}catch(r){return console.error(W9,"learned_pitfalls_read_failed",e,r),z_()}}});var rPe,j9,M9=l(()=>{"use strict";rPe=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],j9=e=>rPe.includes(e)});var QO,ej=l(()=>{"use strict";M9();QO=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||j9(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var tj,Vm,oPe,qm,U_,B_=l(()=>{"use strict";tj=p(require("node:fs")),Vm=p(require("node:path"));Yn();ft();Q();ee();oPe=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),qm=e=>{if(!oPe(e.draftId))throw new Error("invalid_draft_id");let t=ge(e.projectId),r=Vm.default.join(t,se,kt,e.draftId);wt(r);let o=Vm.default.join(r,Vn),n=Vm.default.join(r,qn),s=Ye(e.skillMarkdown);return ie(o,e.skillMarkdown),ie(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},U_=e=>{let t=ge(e),r=Vm.default.join(t,se,kt);return tj.default.existsSync(r)?tj.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var N9,rj,oj=l(()=>{"use strict";N9=p(require("node:path"));ft();Q();ee();rj=e=>{let t=ge(e.projectId),r=N9.default.join(t,Ce,P_),o={...e.file,updatedAt:new Date().toISOString()};return ie(r,`${JSON.stringify(o)}
`),o}});var nj,H9,D9,G_,nPe,Jm,K_=l(()=>{"use strict";nj=p(require("node:fs")),H9=p(require("node:path"));Q();ee();D9="[project-history-skillgen]",G_=()=>({historyLearnedPitfalls:null,skillgenDraftsReview:null,updatedAt:new Date(0).toISOString()}),nPe=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.active!="boolean"||typeof t.openDraftCount!="number"||typeof t.maxOpenDrafts!="number"||typeof t.miningPaused!="boolean"||typeof t.notifiedAt!="string"||typeof t.summary!="string"?null:{active:t.active,openDraftCount:Math.max(0,t.openDraftCount),maxOpenDrafts:Math.max(0,t.maxOpenDrafts),miningPaused:t.miningPaused,notifiedAt:t.notifiedAt,summary:t.summary}},Jm=e=>{let t=H9.default.join(U(e),Ce,A_);if(!nj.default.existsSync(t))return G_();try{let r=JSON.parse(nj.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return console.error(D9,"flags_corrupt",e),G_();let o=r;return{historyLearnedPitfalls:o.historyLearnedPitfalls??null,skillgenDraftsReview:nPe(o.skillgenDraftsReview),updatedAt:typeof o.updatedAt=="string"?o.updatedAt:G_().updatedAt}}catch(r){return console.error(D9,"flags_read_failed",e,r),G_()}}});var F9,Ym,V_=l(()=>{"use strict";F9=p(require("node:path"));ft();Q();ee();Ym=e=>{let t=ge(e.projectId),r=F9.default.join(t,Ce,A_),o={historyLearnedPitfalls:e.file.historyLearnedPitfalls,skillgenDraftsReview:e.file.skillgenDraftsReview??null,updatedAt:new Date().toISOString()};return ie(r,`${JSON.stringify(o)}
`),o}});var ij,$9,sj,sPe,iPe,q_,aj,lj=l(()=>{"use strict";ij=p(require("node:fs")),$9=p(require("node:path"));D_();VO();JO();Fe();ZO();O_();ej();B_();oj();K_();V_();sj="[project-history-skillgen]",sPe=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},iPe=e=>{try{let t=JSON.parse(ij.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},q_=e=>{try{Km({projectId:e.projectId,events:[Um({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},aj=e=>{let t=new Date(e.nowMs).toISOString();try{let r=QO({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=KO({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=iPe(e.draftWritten.metaPath),i=ij.default.readFileSync(e.draftWritten.skillPath,"utf8"),a=qO({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=a.appendedCount,a.skillMarkdown!==i&&qm({projectId:e.projectId,draftId:$9.default.basename(e.draftWritten.draftDir),skillMarkdown:a.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(sj,"pitfalls_draft_merge_failed",e.projectId,s),q_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=XO(e.projectId),i=sPe(s.items,o.localEntries);rj({projectId:e.projectId,file:{items:i,updatedAt:t}});let a=Jm(e.projectId);return Ym({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},skillgenDraftsReview:a.skillgenDraftsReview,updatedAt:t}}),q_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(sj,"pitfalls_store_failed",e.projectId,s),q_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(sj,"pitfalls_attach_failed",e.projectId,r),q_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var z9,cj,dj,uj=l(()=>{"use strict";z9=e=>e.length===0?"(none)":e.map(t=>`- ${t.name}: ${t.description}`).join(`
`),cj=e=>["You are preparing a reusable project skill from a scrubbed chat transcript.","Do NOT invent secrets. Summarize the procedure only.","Return a short reflection covering: goal, inputs, 3\u20138 concrete steps,","pitfalls, and how to verify success. Plain text, no SKILL.md yet.","","Similar existing drafts/skills to avoid overlap:",z9(e.similarDraftHints),"","Transcript:",e.scrubbedTranscript].join(`
`),dj=e=>{let t=e.reflection!==void 0&&e.reflection.trim().length>0?["","Prior reflection (use as outline):",e.reflection.trim(),""]:[""];return["Write ONE SKILL.md draft from the scrubbed transcript.","Output ONLY the markdown file: YAML frontmatter then body.","Frontmatter keys: name (kebab-case), description, version: 0.1.0, status: draft.","Do NOT write source_message_ids; the system adds the transcript message ids.","Body sections: When to use, Inputs, Steps (3\u20138, use placeholders for specifics),","Pitfalls, Verification.","Avoid overlapping similar drafts/skills listed below.","","Similar existing drafts/skills:",z9(e.similarDraftHints),...t,"Transcript:",e.scrubbedTranscript].join(`
`)}});var pj,mj=l(()=>{"use strict";pj=e=>{let t=e.trim();if(t.length===0)return null;let r=t.match(/```(?:markdown|md|skill)?\s*\n([\s\S]*?)```/i);if(r?.[1]!==void 0&&r[1].trim().length>0)return r[1].trim();let o=t.indexOf("---");if(o>=0){let n=t.slice(o).trim();if(/^---[\s\S]*?\n---/.test(n))return n}return t.includes("## Steps")||t.includes("## When to use")?t:null}});var G9,K9,aPe,lPe,cPe,U9,V9,dPe,B9,gj,fj=l(()=>{"use strict";G9=require("node:child_process"),K9=p(require("node:os"));gA();Fe();uj();mj();aPe="cursor",lPe="codex",cPe=18e4,U9=e=>Math.ceil(e.length/4),V9=e=>new Promise(t=>{let r=er(e.writerAgent,e.prompt,we({}));if(r===null){t({ok:!1,reason:"writer_cli_unavailable",tokensUsed:0});return}let o=[],n=[],s=(0,G9.spawn)(r.command,[...r.args],{cwd:K9.default.homedir(),stdio:["ignore","pipe","pipe"]}),i=!1,a=d=>{i||(i=!0,clearTimeout(c),t(d))},c=setTimeout(()=>{s.kill("SIGTERM"),a({ok:!1,reason:"writer_timeout",tokensUsed:0})},e.timeoutMs);s.stdout.on("data",d=>{o.push(Buffer.from(d))}),s.stderr.on("data",d=>{n.push(Buffer.from(d))}),s.on("error",()=>a({ok:!1,reason:"writer_start_failed",tokensUsed:0})),s.on("close",()=>{let d=`${Buffer.concat(o).toString("utf8")}
${Buffer.concat(n).toString("utf8")}`;a({ok:!0,text:d,tokensUsed:U9(e.prompt)+U9(d)})})}),dPe=`---
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
`,B9=async(e,t,r)=>{let o=await e({writerAgent:aPe,prompt:t,timeoutMs:r});if(o.ok)return o;let n=await e({writerAgent:lPe,prompt:t,timeoutMs:r});return n.ok?n:{ok:!1,reason:`cursor:${o.reason};codex:${n.reason}`,tokensUsed:o.tokensUsed+n.tokensUsed}},gj=(e={})=>{let t=e.runCli??V9,r=e.timeoutMs??cPe,o=e.dryRun===!0||process.env[U0]==="1";return async n=>{if(o)return{ok:!0,skillMarkdown:dPe,tokensUsed:1};let s,i=0;if(n.mode==="reflect_then_write"){let d=await B9(t,cj({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints}),r);if(i+=d.tokensUsed,!d.ok)return{ok:!1,reason:d.reason,tokensUsed:i};s=d.text}let a=await B9(t,dj({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints,mode:n.mode,reflection:s}),r);if(i+=a.tokensUsed,!a.ok)return{ok:!1,reason:a.reason,tokensUsed:i};let c=pj(a.text);return c===null?{ok:!1,reason:"empty_or_unparseable_skill_markdown",tokensUsed:i}:{ok:!0,skillMarkdown:c,tokensUsed:i}}}});var q9,J9=l(()=>{"use strict";Bm();q9=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&DO.includes(o.state))return o}return null}});var Gi,Xm=l(()=>{"use strict";Gi=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var Ki,J_,Y9,X9=l(()=>{"use strict";Ki=p(require("node:fs")),J_=p(require("node:path"));Q();ee();j_();Y9=e=>{let t=J_.default.join(U(e),se,kt);if(!Ki.default.existsSync(t))return[];let r=[];for(let o of Ki.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=J_.default.join(t,o.name,Vn),s=J_.default.join(t,o.name,qn);if(Ki.default.existsSync(n))try{let i=Ki.default.readFileSync(n,"utf8"),a="",c=o.name;if(Ki.default.existsSync(s)){let d=JSON.parse(Ki.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(a=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(a.length===0)continue;r.push({id:o.name,contentHash:a,name:c,stepLines:Gm(i)})}catch{}}return r}});var Zm,yj,Z9,Q9=l(()=>{"use strict";Zm=p(require("node:fs")),yj=p(require("node:path"));Q();ee();Z9=e=>{let t=yj.default.join(U(e),se);if(!Zm.default.existsSync(t))return[];let r=[];for(let o of Zm.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=yj.default.join(t,o.name,Dr);if(Zm.default.existsSync(n))try{let s=JSON.parse(Zm.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var uPe,hj,Sj=l(()=>{"use strict";zm();Hm();uPe=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,hj=e=>{let t=zi(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||uPe(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:Bi(o)})}return r}});var eZ,tZ=l(()=>{"use strict";eZ=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var rZ,Pj,Aj=l(()=>{"use strict";rZ=p(require("node:path"));ft();Q();ee();Pj=e=>{let t=ge(e.projectId),r=rZ.default.join(t,Ce,S_),o={...e.budget,updatedAt:new Date().toISOString()};return ie(r,`${JSON.stringify(o)}
`),o}});var oZ,_j,bj=l(()=>{"use strict";oZ=p(require("node:path"));ft();Q();ee();_j=e=>{let t=ge(e.projectId),r=oZ.default.join(t,Ce,h_),o={...e.file,updatedAt:new Date().toISOString()};return ie(r,`${JSON.stringify(o)}
`),o}});var nZ,sZ=l(()=>{"use strict";D_();tZ();Aj();bj();nZ=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,a=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],a=t.episode.lastMessageAtMs??a),_j({projectId:n,file:{episodes:eZ(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:a,updatedAt:new Date(s).toISOString()}}),Pj({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),Km({projectId:n,events:t.metrics})}});var Y_,Rj=l(()=>{"use strict";Fe();K_();V_();Y_=e=>{try{let t=new Date(e.nowMs).toISOString(),r=e.maxOpenDrafts??20,o=Jm(e.projectId),{reviewFlag:n}=e;Ym({projectId:e.projectId,file:{historyLearnedPitfalls:o.historyLearnedPitfalls,skillgenDraftsReview:n.miningPaused?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!0,notifiedAt:t,summary:`Mining paused: ${n.draftWaitingCount}/${r} open skill drafts await review`}:n.draftWaitingCount>0?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!1,notifiedAt:t,summary:`${n.draftWaitingCount} skill draft(s) await owner review`}:null,updatedAt:t}})}catch{}}});var X_,kj=l(()=>{"use strict";X_=e=>new Date(e).toISOString().slice(0,10)});var Z_,iZ=l(()=>{"use strict";kj();Z_=e=>({dayKey:X_(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var wj,lZ,aZ,pPe,Ej,Tj=l(()=>{"use strict";wj=p(require("node:fs")),lZ=p(require("node:path"));iZ();Q();ee();kj();aZ="[project-history-skillgen]",pPe=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=X_(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},Ej=e=>{let t=lZ.default.join(U(e.projectId),Ce,S_);if(!wj.default.existsSync(t))return Z_(e.nowMs);try{let r=JSON.parse(wj.default.readFileSync(t,"utf8")),o=pPe(r,e.nowMs);return o===null?(console.error(aZ,"budget_corrupt",e.projectId),Z_(e.nowMs)):o}catch(r){return console.error(aZ,"budget_read_failed",e.projectId,r),Z_(e.nowMs)}}});var Q_,cZ=l(()=>{"use strict";Q_=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var Cj,uZ,dZ,mPe,gPe,fPe,Ij,Lj=l(()=>{"use strict";Cj=p(require("node:fs")),uZ=p(require("node:path"));cZ();Bm();Q();ee();dZ="[project-history-skillgen]",mPe=e=>typeof e=="string"&&MO.includes(e),gPe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&mPe(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},fPe=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(gPe);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},Ij=e=>{let t=uZ.default.join(U(e),Ce,h_);if(!Cj.default.existsSync(t))return Q_();try{let r=JSON.parse(Cj.default.readFileSync(t,"utf8")),o=fPe(r);return o===null?(console.error(dZ,"episodes_corrupt",e),Q_()):o}catch(r){return console.error(dZ,"episodes_read_failed",e,r),Q_()}}});var mZ,yPe,hPe,SPe,pZ,vj,xj=l(()=>{"use strict";mZ=require("node:crypto");N_();lj();fj();zm();J9();Xm();Hm();X9();Q9();Sj();es();sZ();Rj();Fe();x_();Tj();Lj();B_();yPe="[project-history-skillgen]",hPe=e=>e!==void 0?e:process.env[z0]==="0"?null:gj(),SPe=(e,t)=>{let r=new Map;for(let o of zi(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:Bi(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},pZ=e=>{let t=e.messages[0],r=e.messages[e.messages.length-1];return{episodeId:(0,mZ.randomUUID)(),projectId:e.projectId,state:"CAPTURING",messageIds:e.messages.map(o=>o.messageId),startedAtMs:t.createdAtMs,lastMessageAtMs:r.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}},vj=(e={})=>{let t=hPe(e.ownerLlm),r=e.nowMs??Date.now;return async o=>{try{let n=mo(o.projectId);if(!Gi(n?.state))return;let s=r(),i=Ij(o.projectId),a=Ej({projectId:o.projectId,nowMs:s}),c=hj({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=U_(o.projectId),u=uc({openDraftCount:d,maxOpenDrafts:20});Y_({projectId:o.projectId,reviewFlag:u,nowMs:s});let m=q9(i.episodes,o.projectId);if(u.miningPaused&&m!==null&&m.state==="EPISODE_READY"){let h=new Set(m.messageIds),S=c.filter(w=>!h.has(w.messageId));S.length>0&&(m=pZ({projectId:o.projectId,messages:S}))}else if(m===null){if(c.length===0)return;m=pZ({projectId:o.projectId,messages:c})}else if(m.state==="CAPTURING"&&c.length>0){let h=new Set(m.messageIds),S=[...m.messageIds],w=m.lastMessageAtMs;for(let I of c)h.has(I.messageId)||(S.push(I.messageId),h.add(I.messageId),w=Math.max(w,I.createdAtMs));m={...m,messageIds:S,lastMessageAtMs:w}}let g=SPe(o.projectId,m.messageIds);if(g.length===0)return;let y=await M_({episode:m,messages:g,tokensUsedToday:a.tokensUsedToday,lastClosedAtMs:a.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:qm,listDraftFingerprints:()=>Y9(o.projectId),listPublishedFingerprints:()=>Z9(o.projectId),openDraftCount:()=>U_(o.projectId)}});if(nZ({projectId:o.projectId,episodesFile:i,budget:a,result:y,nowMs:s}),Y_({projectId:o.projectId,reviewFlag:y.reviewFlag,nowMs:s}),y.draftWritten!==null&&y.episode.state==="AWAITING_REVIEW"){let h=[...i.episodes.filter(S=>S.episodeId!==y.episode.episodeId),y.episode];aj({projectId:o.projectId,successEpisode:y.episode,episodes:h,draftWritten:y.draftWritten,nowMs:s})}}catch(n){console.error(yPe,"run_failed",o.projectId,n)}}}});var eb,Wj,Oj,gZ,jj=l(()=>{"use strict";eb=p(require("node:path"));Q();Wj=(e,...t)=>{if(typeof e!="string"||e.trim().length===0)throw new Error("invalid_project_data_dir");for(let s of t)if(typeof s!="string"||s.trim().length===0)throw new Error("empty_purge_path_segment");let r=eb.default.join(e,...t),o=eb.default.resolve(e);if(eb.default.resolve(r)===o)throw new Error("purge_target_is_project_data_dir");return r},Oj=e=>({drafts:Wj(e,se,kt),skillgen:Wj(e,Ce),outcomes:Wj(e,LX)}),gZ=e=>{let t=Oj(e);return[t.drafts,t.skillgen,t.outcomes]}});var fZ,tb,Mj=l(()=>{"use strict";fZ=p(require("node:fs"));jj();ee();tb=e=>{let t=U(e);return gZ(t).some(r=>fZ.default.existsSync(r))}});var Nj,yZ,hZ=l(()=>{"use strict";Nj=p(require("node:fs"));Z();Mj();rc();yZ=()=>{let e=z().projectDataDir;if(!Nj.default.existsSync(e))return[];let t=[];for(let r of Nj.default.readdirSync(e))Rt(r)&&tb(r)&&t.push(r);return t}});var SZ,PZ=l(()=>{"use strict";SZ=e=>e==="purged"||e==="nothing_to_purge"||e==="purge_failed"});var AZ,_Z=l(()=>{"use strict";AZ=e=>e.cloudState.kind!=="known"?"skipped_unknown":e.cloudState.state!=="off"?"history_on":e.hasPurgeTargets?"purge":"nothing_to_purge"});var PPe,bZ,RZ=l(()=>{"use strict";At();PPe=["off","on_configuring","on_ready","degraded"],bZ=async e=>{try{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history`,{method:"GET",headers:{[ae]:e.cloudApi.pairingToken,Accept:"application/json"},signal:AbortSignal.timeout(3e4)});if(!t.ok)return{kind:"unknown",reason:`http_${t.status}`};let r=await t.json();if(typeof r!="object"||r===null||r.ok!==!0)return{kind:"unknown",reason:"malformed_body"};let o=r.state;return typeof o!="string"||!PPe.includes(o)?{kind:"unknown",reason:"unknown_state"}:{kind:"known",state:o}}catch{return{kind:"unknown",reason:"fetch_failed"}}}});var Hj,Dj,Fj,$j=l(()=>{"use strict";Hj=p(require("node:fs"));jj();ee();Dj=e=>Hj.default.existsSync(e)?(Hj.default.rmSync(e,{recursive:!0,force:!0}),!0):!1,Fj=e=>{let t=Oj(U(e.projectId));return{removedDrafts:Dj(t.drafts),removedSkillgen:Dj(t.skillgen),removedOutcomes:Dj(t.outcomes)}}});var rb,kZ,wZ=l(()=>{"use strict";_Z();RZ();Mj();Xm();es();$j();rb="[project-history-off-purge]",kZ=async e=>{let t=e.deps?.fetchCloudState??bZ,r=e.deps?.hasPurgeTargets??tb,o=e.deps?.purge??Fj,n=e.deps?.isLocalOn??(a=>Gi(mo(a)?.state)),s=e.deps?.markLocalOff??(a=>{ac({projectId:a,state:"off"})}),i;try{let a=e.cloudApi===null?{kind:"unknown",reason:"no_cloud_api"}:await t({cloudApi:e.cloudApi,projectId:e.projectId}),c=a.kind==="known"&&a.state==="off",d=c?r(e.projectId):!1,u=AZ({cloudState:a,hasPurgeTargets:d}),m=!1;if(c&&n(e.projectId))try{s(e.projectId),m=!0}catch(g){console.error(rb,"mark_off_failed",e.projectId,g)}if(u==="purge"||u==="nothing_to_purge"&&m)try{o({projectId:e.projectId}),i=u==="purge"?"purged":"nothing_to_purge"}catch(g){console.error(rb,"purge_failed",e.projectId,g),i="purge_failed"}else i=u}catch(a){console.error(rb,"reconcile_failed",e.projectId,a),i="skipped_unknown"}return i!=="history_on"&&console.info(rb,`outcome=${i}`,`projectId=${e.projectId}`),i}});var ob,zj,Uj=l(()=>{"use strict";Yn();oe();Rr();kO();bO();xj();es();hZ();PZ();wZ();ob="[project-history-tick]",zj=async(e={})=>{let t=e.listProjectIds?.()??X0(),r=e.listPurgeCandidateIds?.()??yZ(),o=new Set(t),n=[...t,...r.filter(m=>!o.has(m))];if(n.length===0)return;let s=B(),i=e.cloudApi!==void 0?e.cloudApi:s===null?null:J({wsUrl:s.wsUrl,pairingToken:s.pairingToken}),a=_O(),c=e.pullSkills??R_,d=e.runSkillgen??vj({...e.ownerLlm!==void 0?{ownerLlm:e.ownerLlm}:{}}),u=e.reconcileOffPurge??kZ;for(let m of n){let g="skipped_unknown";try{g=await u({projectId:m,cloudApi:i})}catch(y){console.error(ob,"off_purge_failed",m,y)}if(!SZ(g)&&o.has(m)){try{await d({projectId:m})}catch(y){console.error(ob,"skillgen_failed",m,y)}if(i===null){console.error(ob,"pull_skipped_no_cloud_api",m);continue}try{await c({projectId:m,deps:{history:a,awcPublished:RO(i)}})}catch(y){console.error(ob,"pull_failed",m,y)}}}}});var Bj,TZ=l(()=>{"use strict";Fe();Uj();Bj=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>zj());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var CZ=l(()=>{"use strict";N_()});var IZ=l(()=>{"use strict";Fi();I_();ic();Q();Nm();ee()});var Gj,Kj=l(()=>{"use strict";$m();eo();ic();Fi();Gj=e=>{let t=zt();if(t.ok){let n=Zn(e.projectId);if(n.ok)try{let s=n.db.prepare(`SELECT DISTINCT thread_key AS threadKey
             FROM records
             WHERE project_id = ? AND kind = ? AND thread_key IS NOT NULL
             ORDER BY thread_key ASC`).all(e.projectId,Qo),i=[];for(let a of s){let c=a.threadKey;typeof c=="string"&&c.length>0&&i.push(c)}return{available:!0,threadKeys:i}}catch{}finally{Qn(n.db)}else return{available:!1,threadKeys:[],reason:n.reason}}let r=Ui({projectId:e.projectId,limit:200}),o=[...new Set(r.rows.map(n=>n.threadKey).filter(n=>typeof n=="string"&&n.length>0))].sort();return{available:r.available,threadKeys:o,reason:t.ok?void 0:t.reason}}});var APe,_Pe,bPe,Vj,LZ=l(()=>{"use strict";eo();L_();rc();$m();Kj();APe=/^\/api\/local\/projects\/([^/]+)\/chats$/,_Pe=/^\/api\/local\/projects\/([^/]+)\/chats\/([^/]+)\/messages$/,bPe=e=>{if(e===null||e==="")return;let t=Number.parseInt(e,10);return Number.isFinite(t)?t:void 0},Vj=e=>{let t=APe.exec(e.pathname);if(t!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(t[1]??"");if(!Rt(o))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;let n=zt(),s=Gj({projectId:o});return n.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKeys:s.threadKeys}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:n.reason,threadKeys:s.threadKeys}),!0)}let r=_Pe.exec(e.pathname);if(r!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(r[1]??""),n=decodeURIComponent(r[2]??"");if(!Rt(o)||n.length===0)return e.sendJson(e.response,400,{ok:!1,error:"invalid_path"}),!0;let s=new URL(e.requestUrl,"http://127.0.0.1").searchParams,i=s.get("before"),a=s.get("beforeMessageId"),c=bPe(s.get("limit")),d=zt(),m=Ui({projectId:o,threadKey:n,beforeCreatedAt:i,beforeMessageId:a,limit:c}).rows.map(g=>{let y=Dm({projectId:o,messageId:g.messageId});return{messageId:g.messageId,threadKey:g.threadKey,createdAt:g.createdAt,savedAt:g.savedAt,message:y?.message??null}});return d.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKey:n,messages:m}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:d.reason,projectId:o,threadKey:n,messages:m}),!0)}return!1}});var ts,nb,vZ,RPe,kPe,Qm,Vi,eg=l(()=>{"use strict";ts=p(require("node:fs")),nb=p(require("node:path"));Q();ee();vZ=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),RPe=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.trim().length>0).map(t=>t.trim().toLowerCase()):[],kPe=e=>e==="Computer"?"Computer":"History",Qm=e=>{let t=nb.default.join(U(e),se,kt);if(!ts.default.existsSync(t))return[];let r=[];for(let o of ts.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||!vZ(o.name))continue;let n=nb.default.join(t,o.name,Vn);if(ts.default.existsSync(n))try{let s=ts.default.readFileSync(n,"utf8"),i=nb.default.join(t,o.name,qn),a=o.name,c="",d=[],u="History",m=ts.default.statSync(n).mtime.toISOString();if(ts.default.existsSync(i)){let g=JSON.parse(ts.default.readFileSync(i,"utf8"));typeof g.name=="string"&&g.name.trim()&&(a=g.name.trim()),typeof g.description=="string"&&(c=g.description),d=RPe(g.tags),u=kPe(g.source),typeof g.updatedAt=="string"&&g.updatedAt.length>0&&(m=g.updatedAt)}r.push({id:o.name,title:a,body:s,description:c,tags:d,source:u,updatedAt:m,pathLabel:`skills/_drafts/${o.name}`})}catch{}}return r.sort((o,n)=>n.updatedAt.localeCompare(o.updatedAt))},Vi=(e,t)=>vZ(t)?Qm(e).find(r=>r.id===t)??null:null});var qj,sb,wPe,Jj,Yj=l(()=>{"use strict";qj=p(require("node:fs")),sb=p(require("node:path"));Yn();ft();Q();ee();eg();wPe=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Jj=e=>{if(!wPe(e.draftId))throw new Error("invalid_draft_id");let t=Vi(e.projectId,e.draftId);if(t===null)throw new Error("draft_not_found");let r=sb.default.join(U(e.projectId),se,kt,e.draftId),o=sb.default.join(r,Vn),n=sb.default.join(r,qn),s=e.title.trim()||t.title,i=e.body,a=(e.tags??t.tags).map(y=>y.trim().toLowerCase()).filter(y=>y.length>0),c=Ye(i),d=new Date().toISOString(),u="",m=[],g=t.description;if(qj.default.existsSync(n))try{let y=JSON.parse(qj.default.readFileSync(n,"utf8"));typeof y.episodeId=="string"&&(u=y.episodeId),Array.isArray(y.sourceMessageIds)&&(m=y.sourceMessageIds.filter(h=>typeof h=="string")),typeof y.description=="string"&&(g=y.description)}catch{}return ie(o,i),ie(n,`${JSON.stringify({draftId:e.draftId,episodeId:u,name:s,description:g,sourceMessageIds:m,contentHash:c,status:"draft",tags:a,source:t.source,updatedAt:d})}
`),{id:e.draftId,title:s,body:i,description:g,tags:a,source:t.source,updatedAt:d,pathLabel:`skills/_drafts/${e.draftId}`}}});var Xj,xZ,EPe,tg,ib=l(()=>{"use strict";Xj=p(require("node:fs")),xZ=p(require("node:path"));Q();ee();EPe=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),tg=e=>{if(!EPe(e.draftId))throw new Error("invalid_draft_id");let t=xZ.default.join(U(e.projectId),se,kt,e.draftId);if(!Xj.default.existsSync(t))throw new Error("draft_not_found");Xj.default.rmSync(t,{recursive:!0,force:!1})}});var gc,ab,WZ,TPe,Zj,Qj=l(()=>{"use strict";gc=p(require("node:fs")),ab=p(require("node:path"));ft();ib();eg();Q();ee();k_();WZ=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),TPe=(e,t)=>{let r=ab.default.join(U(e),se,t),o=ab.default.join(r,Dr);if(gc.default.existsSync(o))try{let s=JSON.parse(gc.default.readFileSync(o,"utf8"));if(typeof s.version=="number"&&Number.isInteger(s.version))return s.version+1}catch{}if(!gc.default.existsSync(r))return 1;let n=0;for(let s of gc.default.readdirSync(r)){let i=/^v(\d+)\.md$/.exec(s);i&&(n=Math.max(n,Number.parseInt(i[1]??"0",10)))}return n+1},Zj=e=>{let t=Vi(e.projectId,e.draftId);if(t===null)throw new Error("draft_not_found");let r=e.body??t.body,o=(e.title??t.title).trim()||t.title;if(!r.trim()||!o.trim())throw new Error("draft_incomplete");let n=WZ(e.draftId)?e.draftId:`skill-${e.draftId}`.replace(/[^a-zA-Z0-9_-]/g,"-").slice(0,64);if(!WZ(n))throw new Error("invalid_project_skill_id");let s=TPe(e.projectId,n),i=Im({projectId:e.projectId,skillId:n,version:s,body:r});try{let a=ab.default.join(U(e.projectId),se,n,Dr),c=JSON.parse(gc.default.readFileSync(a,"utf8"));ie(a,`${JSON.stringify({...c,name:o,version:c.version??s,contentHash:c.contentHash??i.contentHash,updatedAt:new Date().toISOString()})}
`)}catch{}return tg({projectId:e.projectId,draftId:e.draftId}),{skillId:n,version:s,path:i.path}}});var CPe,IPe,LPe,OZ,jZ=l(()=>{"use strict";CPe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IPe=`:root{
  --awc-bg:#e8e6e1; --awc-surface:#ffffff; --awc-surface-2:#f7f6f4;
  --awc-tile:#f4f3f0; --awc-tile-2:#ebe9e4; --awc-fill:#e9e7e2;
  --awc-accent-soft:#e4ecff; --awc-accent-soft-2:#d6e2ff;
  --awc-border:#e0e5ed; --awc-line:#e0e5ed; --awc-border-strong:#cbd2de; --awc-control-border:#748094;
  --awc-fg:#101828; --awc-fg-muted:#475467; --awc-fg-subtle:#566073;
  --awc-blue-600:#2150d6; --awc-primary:var(--awc-blue-600);
  --font-ui:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  --font-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  --r-s:6px; --r-m:10px; color-scheme:light;
}
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;background:var(--awc-bg);color:var(--awc-fg);font:14px/1.5 var(--font-ui);padding:16px}
button,input,textarea{font:inherit;color:inherit}
:focus-visible{outline:2px solid var(--awc-control-border);outline-offset:2px;border-radius:var(--r-s)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.win{max-width:1280px;margin:0 auto;min-height:560px;height:100%;display:flex;flex-direction:column;background:var(--awc-surface);border:1px solid var(--awc-border);border-radius:12px;overflow:hidden}
.top{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--awc-line);background:var(--awc-surface-2);flex-wrap:wrap}
.brand{font-weight:600}.crumb{color:var(--awc-fg-subtle);display:flex;align-items:center;gap:6px;min-width:0}
.crumb a{color:inherit;text-decoration:none}.crumb b{color:var(--awc-fg);font-weight:500}.top .sp{flex:1}
.pc{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--awc-fg-muted);background:var(--awc-tile);border:1px solid var(--awc-border);padding:2px 10px;border-radius:99px}
.dot{width:7px;height:7px;border-radius:50%;background:#12804a}.pc.off .dot{background:transparent;border:1.5px solid var(--awc-control-border)}
.banner{padding:8px 16px;background:var(--awc-tile-2);border-bottom:1px solid var(--awc-line);font-size:13px}
.body{flex:1;display:grid;grid-template-columns:minmax(260px,320px) 1fr;min-height:0}
.rail{border-right:1px solid var(--awc-line);display:flex;flex-direction:column;min-height:0;background:var(--awc-surface-2)}
.rail-h{display:flex;align-items:center;gap:6px;padding:14px 16px 8px}.rail-h h1{font-size:15px;margin:0;font-weight:600}
.count{font-size:12px;color:var(--awc-fg-subtle)}
.search{margin:0 16px 10px}.search input{width:100%;padding:7px 10px;border:1px solid var(--awc-control-border);border-radius:var(--r-s);background:var(--awc-surface)}
.list{list-style:none;margin:0;padding:0 8px 12px;overflow:auto;flex:1}
.item{display:grid;gap:2px;width:100%;text-align:left;border:1px solid transparent;background:none;padding:10px;border-radius:var(--r-m);cursor:pointer}
.item:hover{background:var(--awc-tile)}.item[aria-current="true"]{background:var(--awc-accent-soft);border-color:var(--awc-accent-soft-2)}
.item .n{font-weight:500;display:flex;gap:6px;align-items:center;min-width:0}
.item .n>span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.item .p{color:var(--awc-fg-muted);font-size:13px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.item .m{color:var(--awc-fg-subtle);font-size:12px}.unsaved{width:6px;height:6px;border-radius:50%;background:var(--awc-fg);flex:none}
.main{display:flex;flex-direction:column;min-width:0;min-height:0}
.ed-h{display:flex;align-items:center;gap:8px;padding:12px 20px;border-bottom:1px solid var(--awc-line);flex-wrap:wrap}
.back{display:none}.path{font:12px var(--font-mono);color:var(--awc-fg-subtle);overflow-wrap:anywhere;min-width:0;flex:1}
.ed{flex:1;overflow:auto;padding:20px;display:grid;gap:16px;align-content:start;max-width:860px;width:100%}
label.l{font-size:12px;font-weight:500;color:var(--awc-fg-muted);display:block;margin-bottom:4px}
.title-in{width:100%;font-size:20px;font-weight:600;padding:6px 10px;border:1px solid var(--awc-border);border-radius:var(--r-s);background:var(--awc-surface)}
.meta{font-size:12px;color:var(--awc-fg-subtle);display:flex;gap:12px;flex-wrap:wrap}
.tags{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:5px;border:1px solid var(--awc-control-border);border-radius:var(--r-s);background:var(--awc-surface)}
.tag{display:inline-flex;align-items:center;gap:4px;background:var(--awc-tile-2);border-radius:99px;padding:1px 4px 1px 10px;font-size:12px}
.tag button{border:0;background:none;cursor:pointer;width:20px;height:20px;border-radius:50%;color:var(--awc-fg-muted)}
.tags input{border:0;outline:0;flex:1;min-width:100px;padding:3px 4px;background:transparent}
.seg{display:inline-flex;border:1px solid var(--awc-border);border-radius:var(--r-s);padding:2px;background:var(--awc-tile)}
.seg button{border:0;background:none;padding:3px 10px;border-radius:4px;cursor:pointer;font-size:12px;color:var(--awc-fg-muted)}
.seg button[aria-pressed="true"]{background:var(--awc-surface);color:var(--awc-fg);box-shadow:0 0 0 1px var(--awc-border)}
.body-row{display:flex;justify-content:space-between;align-items:end;gap:8px;margin-bottom:4px}
textarea{width:100%;min-height:320px;resize:vertical;padding:12px;border:1px solid var(--awc-control-border);border-radius:var(--r-s);background:var(--awc-surface);font:13px/1.6 var(--font-mono)}
.preview{min-height:320px;padding:4px 14px;border:1px solid var(--awc-border);border-radius:var(--r-s);background:var(--awc-surface-2);overflow-wrap:anywhere}
.preview code{font:12.5px var(--font-mono);background:var(--awc-tile-2);padding:1px 4px;border-radius:4px}
.preview pre{background:var(--awc-tile-2);padding:10px;border-radius:var(--r-s);overflow-x:auto}.preview pre code{background:none;padding:0}
.bar{display:flex;align-items:center;gap:8px;padding:12px 20px;border-top:1px solid var(--awc-line);background:var(--awc-surface-2);flex-wrap:wrap}
.bar .sp{flex:1}.status{font-size:12px;color:var(--awc-fg-subtle)}
.btn{border:1px solid var(--awc-control-border);background:var(--awc-surface);padding:6px 14px;border-radius:var(--r-s);cursor:pointer;font-weight:500;white-space:nowrap}
.btn:hover{background:var(--awc-tile)}.btn:disabled{opacity:.45;cursor:not-allowed}
.btn.pri{background:var(--awc-primary);border-color:var(--awc-primary);color:#fff}.btn.pri:hover{opacity:.92}
.btn.ghost{border-color:transparent;background:none}.btn.ghost:hover{background:var(--awc-tile)}
.confirm{display:flex;align-items:center;gap:8px;background:var(--awc-tile-2);border:1px solid var(--awc-border-strong);border-radius:var(--r-s);padding:4px 4px 4px 10px;font-size:13px}
.state{flex:1;display:grid;place-items:center;padding:40px 20px;text-align:center}
.state .box{display:grid;gap:10px;justify-items:center;max-width:320px}.state h2{margin:0;font-size:16px}.state p{margin:0;color:var(--awc-fg-muted)}
.glyph{width:44px;height:44px;border-radius:12px;background:var(--awc-tile-2);display:grid;place-items:center;color:var(--awc-fg-muted);font:600 18px var(--font-mono)}
.sk{background:var(--awc-fill);border-radius:6px;height:12px;animation:pulse 1.4s ease-in-out infinite}@keyframes pulse{50%{opacity:.5}}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--awc-fg);color:var(--awc-surface);padding:8px 14px;border-radius:var(--r-s);font-weight:500;z-index:20}
@media (max-width:767px){
  body{padding:0}.win{border-radius:0;border-inline:0;min-height:100%}.body{grid-template-columns:1fr}
  .rail{border-right:0}.body.detail .rail{display:none}.body:not(.detail) .main{display:none}
  .back{display:inline-flex}.ed{padding:16px}.ed-h,.bar{padding-inline:16px}
  .bar .btn{flex:1}.bar .sp{display:none}.status{width:100%}
}
`,LPe=`(()=>{
const BOOT=window.__AW_SKILL_DRAFT_BOOT__;
const API='/api/local/projects/'+encodeURIComponent(BOOT.projectId)+'/skill-drafts';
const pad=n=>String(n).padStart(2,'0');
const fmt=iso=>{const d=new Date(iso),t=new Date(),y=new Date(t);y.setDate(t.getDate()-1);
  const hm=pad(d.getHours())+':'+pad(d.getMinutes());
  if(d.toDateString()===t.toDateString())return 'Today '+hm;
  if(d.toDateString()===y.toDateString())return 'Yesterday '+hm;
  return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+hm};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let S={mode:'ready',drafts:BOOT.drafts.slice(),sel:BOOT.drafts[0]?BOOT.drafts[0].id:null,edits:{},tab:'edit',confirm:false,detail:false,q:'',online:BOOT.online};
const view=document.getElementById('view');
const cur=()=>S.drafts.find(d=>d.id===S.sel);
const working=d=>S.edits[d.id]||d;
const dirty=d=>!!S.edits[d.id];
const preview=t=>t.replace(/^#+\\s+.*$/m,'').replace(/[#*\`>\\-\\d.]/g,' ').replace(/\\s+/g,' ').trim();
function md(src){
  const L=src.split('\\n');let o='',i=0,list=null;
  const inl=s=>esc(s).replace(/\`([^\`]+)\`/g,'<code>$1</code>').replace(/\\*\\*([^*]+)\\*\\*/g,'<strong>$1</strong>');
  const close=()=>{if(list){o+='</'+list+'>';list=null}};
  while(i<L.length){const l=L[i];
    if(l.startsWith('\`\`\`')){close();let c='';i++;while(i<L.length&&!L[i].startsWith('\`\`\`'))c+=L[i++]+'\\n';o+='<pre><code>'+esc(c)+'</code></pre>';i++;continue}
    let m;
    if(m=l.match(/^(#{1,3})\\s+(.*)/)){close();o+='<h'+m[1].length+'>'+inl(m[2])+'</h'+m[1].length+'>'}
    else if(m=l.match(/^\\d+\\.\\s+(.*)/)){if(list!=='ol'){close();o+='<ol>';list='ol'}o+='<li>'+inl(m[1])+'</li>'}
    else if(m=l.match(/^[-*]\\s+(.*)/)){if(list!=='ul'){close();o+='<ul>';list='ul'}o+='<li>'+inl(m[1])+'</li>'}
    else if(l.trim()===''){close()}
    else{close();o+='<p>'+inl(l)+'</p>'}
    i++}
  close();return o||'<p style="color:var(--awc-fg-subtle)">Nothing to preview.</p>';
}
function stateBox(g,h,p,btn){return '<div class="state"><div class="box"><div class="glyph" aria-hidden="true">'+g+'</div><h2>'+h+'</h2>'+(p?'<p>'+p+'</p>':'')+(btn||'')+'</div></div>'}
async function api(method, path, body){
  const res=await fetch(path,{method,headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined});
  const data=await res.json().catch(()=>({ok:false}));
  if(!res.ok||data.ok===false) throw new Error(data.error||('http_'+res.status));
  return data;
}
async function reload(){
  S.mode='loading';render();
  try{
    const data=await api('GET', API);
    S.drafts=(data.drafts||[]).map(d=>({id:d.id,title:d.title,body:d.body,tags:d.tags||[],source:d.source||'History',updated:d.updatedAt||d.updated,pathLabel:d.pathLabel||('skills/_drafts/'+d.id)}));
    if(!S.drafts.find(d=>d.id===S.sel)) S.sel=S.drafts[0]?S.drafts[0].id:null;
    S.edits={};S.mode=S.drafts.length?'ready':'empty';
  }catch(e){S.mode='error'}
  render();
}
function render(){
  const off=!S.online;
  document.getElementById('offline').hidden=!off;
  document.getElementById('pc').classList.toggle('off',off);
  document.getElementById('pcText').textContent=off?'This computer \xB7 offline':'This computer \xB7 online';
  view.classList.toggle('detail',S.detail);
  if(S.mode==='loading'){
    view.innerHTML='<aside class="rail" aria-busy="true"><div class="rail-h"><h1>Drafts</h1></div><div style="padding:8px 16px;display:grid;gap:18px">'+[1,2,3,4].map(()=>'<div style="display:grid;gap:6px"><div class="sk" style="width:70%"></div><div class="sk" style="width:95%"></div><div class="sk" style="width:35%;height:10px"></div></div>').join('')+'</div></aside><section class="main">'+stateBox('\u2026','Loading drafts','')+'</section>';
    return;
  }
  if(S.mode==='error'){
    view.innerHTML='<section class="main" style="grid-column:1/-1;display:flex">'+stateBox('!','Couldn\u2019t read drafts','The drafts folder on this computer isn\u2019t readable.','<button class="btn pri" id="retry">Try again</button>')+'</section>';
    document.getElementById('retry').onclick=()=>void reload();
    return;
  }
  const items=S.drafts.filter(d=>{const w=working(d);return !S.q||(w.title+' '+w.body+' '+(w.tags||[]).join(' ')).toLowerCase().includes(S.q.toLowerCase())});
  if(S.mode==='empty'||S.drafts.length===0){
    view.innerHTML='<section class="main" style="grid-column:1/-1;display:flex">'+stateBox('0','No drafts.','New drafts show up here.')+'</section>';
    return;
  }
  const rail='<aside class="rail" aria-label="Drafts"><div class="rail-h"><h1>Drafts</h1><span class="count">'+S.drafts.length+'</span></div><div class="search"><label for="q" class="sr">Search drafts</label><input id="q" type="search" placeholder="Search" value="'+esc(S.q)+'" autocomplete="off"></div><ul class="list" role="list">'+(items.length?items.map(d=>{const w=working(d);return '<li><button class="item" data-id="'+esc(d.id)+'" aria-current="'+(d.id===S.sel)+'"><span class="n">'+(dirty(d)?'<span class="unsaved" title="Unsaved changes"></span><span class="sr">Unsaved. </span>':'')+'<span>'+esc(w.title||'Untitled')+'</span></span><span class="p">'+esc(preview(w.body))+'</span><span class="m">'+esc(d.source)+' \xB7 '+fmt(d.updated)+'</span></button></li>'}).join(''):'<li class="status" style="padding:10px">No matches.</li>')+'</ul></aside>';
  const d=cur(); if(!d){view.innerHTML=rail;return}
  const w=working(d), isD=dirty(d);
  const main='<section class="main" aria-label="Draft"><div class="ed-h"><button class="btn ghost back" id="back" aria-label="Back to drafts">\u2039 Drafts</button><span class="path" title="Draft file">'+esc(d.pathLabel||('skills/_drafts/'+d.id))+'</span><div class="seg" role="group" aria-label="Body view"><button aria-pressed="'+(S.tab==='edit')+'" data-tab="edit">Edit</button><button aria-pressed="'+(S.tab==='preview')+'" data-tab="preview">Preview</button></div></div><div class="ed"><div><label class="l" for="title">Title</label><input id="title" class="title-in" value="'+esc(w.title)+'" autocomplete="off"></div><div class="meta"><span>From '+(d.source==='History'?'project history':'this computer')+'</span><span>Updated '+fmt(d.updated)+'</span></div><div><label class="l" for="tagIn">Tags <span style="font-weight:400;color:var(--awc-fg-subtle)">optional</span></label><div class="tags">'+(w.tags||[]).map((t,i)=>'<span class="tag">'+esc(t)+'<button type="button" data-rm="'+i+'" aria-label="Remove tag '+esc(t)+'">\xD7</button></span>').join('')+'<input id="tagIn" placeholder="Add tag" autocomplete="off"></div></div><div><div class="body-row"><label class="l" for="bodyIn" style="margin:0">Skill</label><span class="status">Markdown</span></div>'+(S.tab==='edit'?'<textarea id="bodyIn" spellcheck="false">'+esc(w.body)+'</textarea>':'<div class="preview" tabindex="0" aria-label="Preview">'+md(w.body)+'</div>')+'</div></div><div class="bar"><span class="status" role="status">'+(isD?'Unsaved changes':'Saved')+'</span><span class="sp"></span>'+(S.confirm?'<span class="confirm" role="alertdialog" aria-label="Confirm discard">Discard this draft?<button class="btn" id="cfYes">Discard</button><button class="btn ghost" id="cfNo">Keep</button></span>':'<button class="btn ghost" id="discard">Discard</button><button class="btn" id="save" '+(isD?'':'disabled')+'>Save</button><button class="btn pri" id="publish" '+(off?'disabled title="Publish when online"':'')+' '+(w.title.trim()&&w.body.trim()?'':'disabled')+'>Publish</button>')+'</div></section>';
  view.innerHTML=rail+main;wire();
}
function edit(patch){const d=cur();const w={...working(d),...patch};
  if(w.title===d.title&&w.body===d.body&&(w.tags||[]).join('|')===(d.tags||[]).join('|'))delete S.edits[d.id];else S.edits[d.id]=w;
  renderSoft()}
function renderSoft(){const st=view.querySelector('.bar .status');const d=cur();if(st)st.textContent=dirty(d)?'Unsaved changes':'Saved';
  const sv=document.getElementById('save');if(sv)sv.disabled=!dirty(d);
  const pb=document.getElementById('publish');const w=working(d);if(pb)pb.disabled=!S.online||!(w.title.trim()&&w.body.trim());
  const it=view.querySelector('.item[data-id="'+d.id+'"]');if(it){it.querySelector('.n').innerHTML=(dirty(d)?'<span class="unsaved" title="Unsaved changes"></span><span class="sr">Unsaved. </span>':'')+'<span>'+esc(w.title||'Untitled')+'</span>';it.querySelector('.p').textContent=preview(w.body)}}
async function save(){const d=cur();if(!dirty(d))return;const w=working(d);
  try{const data=await api('PUT', API+'/'+encodeURIComponent(d.id),{title:w.title,body:w.body,tags:w.tags||[]});
    Object.assign(d,{title:data.draft.title,body:data.draft.body,tags:data.draft.tags||[],updated:data.draft.updatedAt});delete S.edits[d.id];render();toast('Saved.')}
  catch(e){toast('Could not save.')}}
async function discard(){const d=cur();
  try{await api('DELETE', API+'/'+encodeURIComponent(d.id));const i=S.drafts.findIndex(x=>x.id===d.id);S.drafts.splice(i,1);delete S.edits[d.id];
    S.sel=S.drafts.length?S.drafts[Math.min(i,S.drafts.length-1)].id:null;S.confirm=false;S.detail=false;S.mode=S.drafts.length?'ready':'empty';render();toast('Discarded.')}
  catch(e){S.confirm=false;render();toast('Could not discard.')}}
async function publish(){const d=cur();const w=working(d);
  try{await api('POST', API+'/'+encodeURIComponent(d.id)+'/publish',{title:w.title,body:w.body});
    const i=S.drafts.findIndex(x=>x.id===d.id);S.drafts.splice(i,1);delete S.edits[d.id];
    S.sel=S.drafts.length?S.drafts[Math.min(i,S.drafts.length-1)].id:null;S.detail=false;S.mode=S.drafts.length?'ready':'empty';render();toast('Published.')}
  catch(e){toast('Could not publish.')}}
function wire(){
  view.querySelectorAll('.item').forEach(b=>b.onclick=()=>{S.sel=b.dataset.id;S.confirm=false;S.detail=true;render()});
  const q=document.getElementById('q');if(q)q.oninput=()=>{S.q=q.value;const p=q.selectionStart;render();const n=document.getElementById('q');n.focus();n.setSelectionRange(p,p)};
  view.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{S.tab=b.dataset.tab;render()});
  const t=document.getElementById('title');if(t)t.oninput=()=>edit({title:t.value});
  const b=document.getElementById('bodyIn');if(b)b.oninput=()=>edit({body:b.value});
  const ti=document.getElementById('tagIn');
  if(ti){ti.onkeydown=e=>{const v=ti.value.trim().toLowerCase().replace(/,/g,'');const w=working(cur());
    if((e.key==='Enter'||e.key===',')&&v){e.preventDefault();if(!(w.tags||[]).includes(v)){edit({tags:[...(w.tags||[]),v]});render()}document.getElementById('tagIn').focus()}
    else if(e.key==='Backspace'&&!ti.value&&(w.tags||[]).length){edit({tags:w.tags.slice(0,-1)});render();document.getElementById('tagIn').focus()}};
  view.querySelectorAll('[data-rm]').forEach(x=>x.onclick=()=>{const w=working(cur());edit({tags:w.tags.filter((_,i)=>i!=+x.dataset.rm)});render();document.getElementById('tagIn').focus()})}
  const bk=document.getElementById('back');if(bk)bk.onclick=()=>{S.detail=false;S.confirm=false;render()};
  const on=(id,f)=>{const e=document.getElementById(id);if(e)e.onclick=f};
  on('save',()=>void save());
  on('discard',()=>{S.confirm=true;render();document.getElementById('cfNo').focus()});
  on('cfNo',()=>{S.confirm=false;render()});
  on('cfYes',()=>void discard());
  on('publish',()=>void publish());
}
let tt;function toast(msg){const h=document.getElementById('toastHost');clearTimeout(tt);h.innerHTML='<div class="toast">'+esc(msg)+'</div>';tt=setTimeout(()=>h.innerHTML='',4000)}
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='s'){e.preventDefault();if(S.mode==='ready')void save()}
  if(e.key==='Escape'&&S.confirm){S.confirm=false;render()}});
if(!S.drafts.length) S.mode='empty';
render();
})();
`,OZ=e=>{let t=JSON.stringify({projectId:e.projectId,projectName:e.projectName,online:e.online,drafts:e.drafts.map(r=>({id:r.id,title:r.title,body:r.body,tags:r.tags,source:r.source,updated:r.updatedAt,pathLabel:r.pathLabel}))}).replaceAll("<","\\u003c");return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>AgentWitch \u2013 AWL skill draft review</title>
<style>${IPe}</style>
</head>
<body>
<div class="win" role="application" aria-label="AgentWitch Local">
  <header class="top">
    <span class="brand">AgentWitch</span>
    <nav class="crumb" aria-label="Location">
      <a href="/project?id=${encodeURIComponent(e.projectId)}">${CPe(e.projectName||"Project")}</a>
      <span aria-hidden="true">/</span><b>Skill drafts</b>
    </nav>
    <span class="sp"></span>
    <span class="pc${e.online?"":" off"}" id="pc"><span class="dot" aria-hidden="true"></span><span id="pcText">This computer \xB7 ${e.online?"online":"offline"}</span></span>
  </header>
  <div class="banner" id="offline" ${e.online?"hidden":""} role="status">Offline. Saves stay on this computer. Publish when back online.</div>
  <div id="view" class="body"></div>
</div>
<div id="toastHost" aria-live="polite"></div>
<script>window.__AW_SKILL_DRAFT_BOOT__=${t};</script>
<script>${LPe}</script>
</body>
</html>`}});var vPe,xPe,WPe,OPe,MZ,NZ,eM,DZ=l(()=>{"use strict";jZ();ib();rc();eg();Qj();Yj();vPe=/^\/project\/skill-drafts$/,xPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts$/,WPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)$/,OPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)\/publish$/,MZ=async e=>{let t=await e.readBody(e.request);if(!t.trim())return{};let r=JSON.parse(t);if(r===null||typeof r!="object"||Array.isArray(r))throw new Error("invalid_json");return r},NZ=e=>{let t=e instanceof Error?e.message:"error";return t==="draft_not_found"?{status:404,code:t}:t==="invalid_draft_id"||t==="invalid_project_id"||t==="draft_incomplete"||t==="invalid_project_skill_id"||t==="invalid_json"?{status:400,code:t}:{status:500,code:"error"}},eM=async e=>{if(vPe.test(e.pathname)){if(e.method!=="GET")return e.response.writeHead(405),e.response.end(),!0;let s=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("projectId")??"";if(!Rt(s))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;let i=[];try{i=Qm(s)}catch{i=[]}let a=e.resolveProjectName(s)??s.slice(0,8);return e.sendHtml(e.response,OZ({projectId:s,projectName:a,online:e.online,drafts:i})),!0}let t=OPe.exec(e.pathname);if(t!==null){if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let n=decodeURIComponent(t[1]??""),s=decodeURIComponent(t[2]??"");if(!Rt(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{let i=await MZ(e),a=Zj({projectId:n,draftId:s,title:typeof i.title=="string"?i.title:void 0,body:typeof i.body=="string"?i.body:void 0});e.sendJson(e.response,200,{ok:!0,...a})}catch(i){let a=NZ(i);e.sendJson(e.response,a.status,{ok:!1,error:a.code})}return!0}let r=WPe.exec(e.pathname);if(r!==null){let n=decodeURIComponent(r[1]??""),s=decodeURIComponent(r[2]??"");if(!Rt(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{if(e.method==="GET"){let i=Vi(n,s);return i===null?(e.sendJson(e.response,404,{ok:!1,error:"draft_not_found"}),!0):(e.sendJson(e.response,200,{ok:!0,draft:i}),!0)}if(e.method==="PUT"){let i=await MZ(e),a=Jj({projectId:n,draftId:s,title:typeof i.title=="string"?i.title:"",body:typeof i.body=="string"?i.body:"",tags:Array.isArray(i.tags)?i.tags.filter(c=>typeof c=="string"):void 0});return e.sendJson(e.response,200,{ok:!0,draft:a}),!0}if(e.method==="DELETE")return tg({projectId:n,draftId:s}),e.sendJson(e.response,200,{ok:!0}),!0;e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"})}catch(i){let a=NZ(i);e.sendJson(e.response,a.status,{ok:!1,error:a.code})}return!0}let o=xPe.exec(e.pathname);if(o!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let n=decodeURIComponent(o[1]??"");if(!Rt(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{let s=Qm(n);e.sendJson(e.response,200,{ok:!0,projectId:n,drafts:s})}catch{e.sendJson(e.response,500,{ok:!1,error:"could_not_read_drafts"})}return!0}return!1}});var rM,UZ,HZ,jPe,tM,FZ,MPe,$Z,NPe,zZ,DPe,rg,BZ=l(()=>{"use strict";rM=p(require("node:fs")),UZ=p(require("node:path"));ft();Xm();es();Q();ee();pc();HZ="[project-history-ai-session]",jPe=280,tM=e=>e.length>0&&e.length<=200&&!e.includes("/")&&!e.includes("\\")&&!e.includes("..")&&!e.startsWith("."),FZ=e=>{let t=e.trim().replace(/\s+/g," ").slice(0,jPe);if(t.length===0)return"";let r=tn(t);return r.residualSecret?"[redacted]":r.scrubbed},MPe=e=>{if(e.length===0)return"";let t=tn(e);return t.residualSecret?"[redacted]":t.scrubbed},$Z=e=>e===null?null:MPe(e),NPe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zZ=e=>typeof e!="string"?null:e,DPe=e=>{try{if(!rM.default.existsSync(e))return null;let t=JSON.parse(rM.default.readFileSync(e,"utf8"));if(!NPe(t))return null;let r=typeof t.taskId=="string"&&t.taskId.trim().length>0?t.taskId.trim():null,o=typeof t.projectId=="string"&&t.projectId.trim().length>0?t.projectId.trim():null,n=typeof t.status=="string"&&t.status.trim().length>0?t.status.trim():null,s=typeof t.createdAt=="string"&&t.createdAt.trim().length>0?t.createdAt.trim():null,i=typeof t.savedAt=="string"&&t.savedAt.trim().length>0?t.savedAt.trim():null;if(r===null||o===null||n===null||s===null||i===null)return null;let a=t.threadKey,c=a==null?null:typeof a=="string"&&a.trim().length>0?a.trim():null;return{taskId:r,projectId:o,threadKey:c,writerAgent:typeof t.writerAgent=="string"&&t.writerAgent.trim().length>0?t.writerAgent.trim():null,status:n,promptSummary:typeof t.promptSummary=="string"?t.promptSummary:"",resultSummary:typeof t.resultSummary=="string"?t.resultSummary:"",promptBody:zZ(t.promptBody),resultBody:zZ(t.resultBody),createdAt:s,completedAt:t.completedAt===null||t.completedAt===void 0?null:typeof t.completedAt=="string"&&t.completedAt.trim().length>0?t.completedAt.trim():null,agentRunId:typeof t.agentRunId=="string"&&t.agentRunId.trim().length>0?t.agentRunId.trim():null,savedAt:i}}catch{return null}},rg=e=>{let t=e.projectId.trim(),r=e.taskId.trim();if(!tM(r))return{ok:!1,reason:"invalid_task_id"};let o=mo(t);if(o===null)return{ok:!1,reason:"history_unknown"};if(!Gi(o.state))return{ok:!1,reason:"history_off"};let n=new Date().toISOString(),s=typeof e.agentRunId=="string"&&e.agentRunId.trim().length>0?e.agentRunId.trim():r,i=s.length>0&&tM(s)?s:r;if(!tM(i))return{ok:!1,reason:"invalid_task_id"};let a;try{a=ge(t)}catch(S){return console.error(HZ,"write_failed",t,r,S),{ok:!1,reason:"write_failed"}}let c=UZ.default.join(a,ji,`${i}.json`),d=DPe(c),u=e.promptBody!==void 0?$Z(e.promptBody):d?.promptBody??null,m=e.resultBody!==void 0?$Z(e.resultBody):d?.resultBody??null,g=typeof e.promptSummary=="string"&&e.promptSummary.trim().length>0?e.promptSummary:u??d?.promptSummary??"",y=typeof e.resultSummary=="string"&&e.resultSummary.trim().length>0?e.resultSummary:m??d?.resultSummary??"",h={taskId:r,projectId:t,threadKey:typeof e.threadKey=="string"&&e.threadKey.trim().length>0?e.threadKey.trim():d?.threadKey??null,writerAgent:typeof e.writerAgent=="string"&&e.writerAgent.trim().length>0?e.writerAgent.trim():d?.writerAgent??null,status:e.status.trim()||d?.status||"completed",promptSummary:FZ(g),resultSummary:FZ(y),promptBody:u,resultBody:m,createdAt:typeof e.createdAt=="string"&&e.createdAt.trim().length>0?e.createdAt.trim():d?.createdAt??n,completedAt:e.completedAt===void 0?d?.completedAt??n:e.completedAt===null?null:e.completedAt.trim()||null,agentRunId:s,savedAt:n};try{return ie(c,`${JSON.stringify(h,null,2)}
`),{ok:!0,record:h}}catch(S){return console.error(HZ,"write_failed",t,r,S),{ok:!1,reason:"write_failed"}}}});var GZ=l(()=>{"use strict"});var KZ=l(()=>{"use strict";GZ()});var lb=l(()=>{"use strict";rc();ee();k_();k0();T0();L0();Y0();i9();p9();Fe();bO();kO();Uj();Yn();TZ();es();Fe();CO();EO();jO();pc();IO();vO();fj();uj();mj();Rj();j_();B_();x_();O_();$j();FO();zO();N_();CZ();Bm();Nm();Hm();zm();Sj();Lj();bj();Tj();Aj();D_();xj();Xm();H_();ej();VO();JO();lj();ZO();oj();K_();V_();Fe();I_();IZ();$m();L_();Kj();LZ();ic();jm();Q();G0();$0();E_();Q0();rO();hO();PO();gO();eg();Yj();ib();Qj();DZ();BZ();cO();pO();Q();KZ()});var dr,HPe,VZ,qZ,oM,nM,sM,iM,aM,lM,cM=l(()=>{"use strict";dr=require("node:crypto"),HPe=Buffer.from("302a300506032b6570032100","hex"),VZ=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},qZ=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,dr.createPublicKey)({key:Buffer.concat([HPe,t]),format:"der",type:"spki"})},oM=()=>{let{publicKey:e,privateKey:t}=(0,dr.generateKeyPairSync)("ed25519");return{publicKeyRaw:VZ(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},nM=e=>(0,dr.createPrivateKey)(e),sM=(e,t)=>(0,dr.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),iM=(e,t,r)=>{try{let o=qZ(e);return(0,dr.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},aM=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,lM=()=>(0,dr.randomBytes)(32).toString("base64url")});var rn,cb,JZ,FPe,$Pe,db,dM,uM,YZ=l(()=>{"use strict";rn=p(require("node:fs")),cb=p(require("node:path"));cM();Z();Ge();JZ=e=>cb.default.join(e.installDir,pn),FPe=(e,t)=>{if(e.profileEmail===null||t===JZ(e)||rn.default.existsSync(t))return;let r=JZ(e);rn.default.existsSync(r)&&(rn.default.mkdirSync(cb.default.dirname(t),{recursive:!0}),rn.default.renameSync(r,t))},$Pe=e=>{if(!rn.default.existsSync(e))return null;try{let t=rn.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},db=e=>{let t=ed(e);FPe(e,t);let r=$Pe(t);if(r!==null)return r;let o=oM();return rn.default.mkdirSync(cb.default.dirname(t),{recursive:!0}),rn.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},dM=e=>{let t=db(e.layout),r=lM(),o=aM({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=nM(t.privateKeyPem),s=sM(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},uM=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return iM(e.serverPublicKey,t,e.serverAttestation)}});var pM=l(()=>{"use strict";YZ();cM()});var XZ,ZZ,QZ=l(()=>{"use strict";XZ=p(require("node:path")),ZZ=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:XZ.default.basename(e.installDir)})});var eQ=l(()=>{"use strict";ys()});var oQ,og,rs,fM,tQ,UPe,mM,ub,$e,nQ,BPe,gM,GPe,KPe,qi,VPe,ue,Ze,rQ,Xe,qPe,JPe,YPe,ng,sg,sQ=l(()=>{"use strict";oQ=p(require("node:http")),og=p(require("node:fs")),rs=p(require("node:path"));Pl();MV();DV();dP();ti();$S();GS();pb();ep();QV();t5();a5();xs();QI();RL();H5();XA();aW();Q3();eo();pW();c7();R7();w7();m_();D7();q7();Tn();_t();At();J7();X7();xT();RC();OT();eX();dX();pX();fX();ZW();Kr();TX();lb();oe();pM();QZ();eQ();fM=e=>DI(e)??"never",tQ=48e3,UPe=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,mM=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Mh(),reveal:t.reveal,installed:To(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),ub=async e=>{let t=B();return t===null?{ok:!1,projects:[],message:"Client config missing \u2014 pair this computer in AgentWitch Cloud to load projects."}:Zr(t,e)},$e=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nQ=200,BPe=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',gM=e=>{let t=e.trim().slice(0,nQ),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},GPe=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${$e(t)}</div>`,KPe=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${$e(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',qi={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},VPe=()=>{let e=B();return e===null?null:J({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},ue=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...qi}),e.end(JSON.stringify(r))},Ze=(e,t)=>{e.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...qi}),e.end(ii)},rQ=e=>{Ze(e,"")},Xe=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},qPe=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Not linked</span>',r=e.status.wsConnected?"":'<p class="status-hint">This computer is not linked to AgentWitch cloud (token missing or revoked). Open Home \u2192 Connect this computer for a fresh install command \u2014 do not reuse an old one.</p>',o=BPe(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${$e(e.status.wakeError)}</div>`:"",s=e.revived?`<div class="alert-success">${$e(sL(process.platform))}</div>`:"",i=qW(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${rL(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${o}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${$e(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${$e(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${$e(fM(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${$e(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${i}
    </section>`},JPe=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},YPe=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,nQ)},ng=e=>{let t=rs.default.join(e.layout.installDir,"link-code.txt"),r=rs.default.join(e.layout.installDir,"profiles"),o=rs.default.dirname(e.layout.configPath),n=qC({profileDir:o,profilesDir:r}),s=n.start,i=!1,a=n.end-n.start+1,c=0,d=()=>ze(e.layout.installDir),u=()=>{let b=d();return{installBundleVersion:y_(b),installBundleUpdatedAt:b?.updatedAt??null,installVersion:b}},m=async b=>{let P=b.installVersion??d(),C=await y(),L=TL(C),be=b.updateFlash??null,te=CL(be),de=GPe(be,b.updateError??null);return wL({title:b.title,activePath:b.activePath,body:b.body,cloudAppOrigin:Nr(P),installBundleVersionLabel:y_(P),prependBody:`${te}${de}${L}`,headerUpdateButtonHtml:EL(C)})},g=null,y=async()=>{let b=Date.now();if(g!==null&&b-g.cachedAtMs<6e4)return g.offer;let P=await VW(e.layout);return g={cachedAtMs:b,offer:P},P},h=()=>{g=null},S=!1,w=async b=>{if(h(),!(await y()).updateAvailable){b.writeHead(303,{Location:"/?update=ok"}),b.end();return}if(S){b.writeHead(303,{Location:gM("An update is already running.")}),b.end();return}S=!0;try{let C=await XW(),L=C.ok?"/?update=ok":gM(C.message);b.writeHead(303,{Location:L}),b.end()}catch(C){let L=C instanceof Error&&C.message.trim().length>0?C.message:"Install bundle update failed.";b.writeHead(303,{Location:gM(L)}),b.end()}finally{S=!1,h()}},I=async(b,P)=>{b.writeHead(404,{"Content-Type":"text/plain; charset=utf-8",...qi}),b.end(ii)},f=()=>{if(og.default.existsSync(t))return og.default.readFileSync(t,"utf8").trim();let b=Math.random().toString(36).slice(2,8).toUpperCase();return og.default.writeFileSync(t,b,"utf8"),b},k=Gn({layout:e.layout}),M=oQ.default.createServer((b,P)=>{(async()=>{let C=b.url?.split("?")[0]??"/",L=b.method??"GET";if(L==="OPTIONS"){P.writeHead(204,qi),P.end();return}let be=b.headers["user-agent"],te=Array.isArray(be)?be[0]:be;if(FI({method:L,pathname:C,userAgent:te})){rQ(P);return}if(await Jx({method:L,pathname:C,request:b,response:P,requestUrl:b.url??"/",storePath:l7(rs.default.dirname(e.layout.configPath)),readBody:Xe,sendHtml:jV({pathname:C,userAgent:te,headers:qi}),renderShell:m})||await X3({method:L,pathname:C,request:b,response:P,configPath:e.layout.configPath,readBody:Xe,sendJson:ue})||await Z3({method:L,pathname:C,request:b,response:P,profileDir:rs.default.dirname(e.layout.configPath),readCloudConfig:VPe,readBody:Xe,sendJson:ue})||await wS({method:L,pathname:C,request:b,response:P,layout:e.layout,readBody:Xe,sendJson:ue})||Vj({method:L,pathname:C,requestUrl:b.url??"/",response:P,sendJson:ue})||await eM({method:L,pathname:C,requestUrl:b.url??"/",request:b,response:P,online:e.controllers.getStatus().wsConnected,resolveProjectName:E=>E.slice(0,8),readBody:Xe,sendHtml:Ze,sendJson:ue})||await t_({method:L,pathname:C,request:b,response:P,layout:e.layout,readBody:Xe,sendJson:ue,server:k}))return;if(L==="GET"&&C==="/health"){let E=e.controllers.getStatus(),R=u();ue(P,200,{ok:!0,...E,installBundleVersion:R.installBundleVersion,installBundleUpdatedAt:R.installBundleUpdatedAt,localAppPort:s,localPortRange:{start:n.start,end:n.end},portsExhausted:i,...NV(),...ZZ({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(L==="GET"&&C==="/api/status"){let E=u();ue(P,200,{...e.controllers.getStatus(),linkCode:f(),projectFolders:Mo(rs.default.dirname(e.layout.configPath)),installBundleVersion:E.installBundleVersion,installBundleUpdatedAt:E.installBundleUpdatedAt});return}if(L==="GET"&&C==="/api/traffic"){ue(P,200,{entries:uP(e.layout)});return}if(L==="DELETE"&&C==="/api/traffic"||L==="POST"&&C==="/api/traffic/clear"){if(UI(e.layout),L==="POST"){P.writeHead(303,{Location:"/traffic?cleared=1"}),P.end();return}ue(P,200,{ok:!0});return}if(L==="GET"&&C==="/api/trace"){ue(P,200,{entries:mP(e.layout)});return}if(L==="DELETE"&&C==="/api/trace"||L==="POST"&&C==="/api/trace/clear"){if(KI(e.layout),L==="POST"){P.writeHead(303,{Location:"/status"}),P.end();return}ue(P,200,{ok:!0});return}if(L==="POST"&&C==="/api/errors/clear"){VI(e.layout.errorLogPath),P.writeHead(303,{Location:"/errors?cleared=1"}),P.end();return}if(L==="GET"&&C==="/api/knowledge"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("q")?.trim()??"";if(R.length>0){let v=await kl({layout:e.layout,query:R,limit:20});ue(P,200,{chunks:v,query:R});return}ue(P,200,{chunks:ip(e.layout).slice(-50).reverse()});return}if(L==="POST"&&C==="/api/revive"){e.controllers.reviveWebSocket(),P.writeHead(303,{Location:"/status?revived=1"}),P.end();return}if(L==="GET"&&C==="/api/update-status"){let E=await y();ue(P,200,{ok:!0,...E});return}if((L==="GET"||L==="POST")&&C==="/api/update"){await w(P);return}if(L==="GET"&&C==="/"){rQ(P);return}if(L==="GET"&&C==="/task"){let E=e.controllers.getStatus(),R=u(),v=B(),D=new URL(b.url??"/",`http://127.0.0.1:${s}`),H=D.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,$=D.searchParams.get("failed")==="1"?D.searchParams.get("error")?.trim()??"Task failed.":null,q=D.searchParams.get("runId");Ze(P,await m({title:"Task",activePath:"/task",installVersion:R.installVersion,body:mW({defaultWorkspace:v?.workspace??"",wsConnected:E.wsConnected,flashMessage:H,flashError:$,lastRunId:q})}));return}if(L==="POST"&&C==="/task/dispatch"){let E=await Xe(b),R=new URLSearchParams(E),v=R.get("prompt")?.trim()??"",D=R.get("writerAgent")?.trim()??"claude-cli",H=R.get("projectFolder")?.trim()??"",$=await e0({prompt:v,writerAgent:D,...H.length>0?{projectFolderPath:H}:{}}),q=new URLSearchParams;$.ok?q.set("ok","1"):(q.set("failed","1"),$.errorMessage!==void 0&&q.set("error",$.errorMessage.slice(0,240))),$.agentRunId!==void 0&&q.set("runId",$.agentRunId),P.writeHead(303,{Location:`/task?${q.toString()}`}),P.end();return}if(L==="GET"&&C==="/writer-sessions"){let E=u(),R=c_(e.layout,12);Ze(P,await m({title:"Writer sessions",activePath:"/writer-sessions",installVersion:E.installVersion,updateFlash:JPe(b.url??void 0),updateError:YPe(b.url??void 0),body:AW({sessions:R})}));return}if(L==="GET"&&C==="/errors"){let E=u(),R=qI(e.layout.errorLogPath);Ze(P,await m({title:"Errors",activePath:"/errors",installVersion:E.installVersion,body:YI({errorLogPath:e.layout.errorLogPath,content:R.content,exists:R.exists,truncated:R.truncated,byteSize:R.byteSize,cleared:new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("cleared")==="1"})}));return}if(L==="GET"&&C==="/status"){let E=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=e.controllers.getStatus(),v=Ue(e.layout),D=v!==null?tt(v,12e4):eL(R.lastHeartbeatAt,12e4),H=tL({lastHeartbeatAt:R.lastHeartbeatAt,heartbeatIsStale:D}),$=u();Ze(P,await m({title:"Status",activePath:"/status",installVersion:$.installVersion,body:`${qPe({status:R,healthBadge:H,revived:E.searchParams.get("revived")==="1",linkCode:f(),installBundleVersion:$.installBundleVersion,installBundleUpdatedAt:$.installBundleUpdatedAt})}${nL({installDir:e.layout.installDir,platform:process.platform})}${oL({entries:mP(e.layout)})}`}));return}if(L==="GET"&&C==="/traffic"){let E=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=uP(e.layout),v=u(),D=R.map(q=>`<tr><td title="${$e(q.at)}">${$e(fM(q.at))}</td><td>${$e(q.direction)}</td><td><code>${$e(q.type)}</code></td><td>${$e(q.summary)}</td><td>${$e(q.action??"")}</td></tr>`).join(""),H=R.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${D}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',$=E.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ze(P,await m({title:"Traffic",activePath:"/traffic",installVersion:v.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${$}
              ${H}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(L==="GET"&&C==="/projects"){let E=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=u(),v=Nr(R.installVersion),D=await ub(e.layout),H=E.searchParams.get("folderError")==="1"?"Could not save the selected folder to AgentWitch. Check the Mac connection and try again.":E.searchParams.get("deleteError")==="1"?"Could not delete the project in AgentWitch Cloud. Check pairing on Status.":null,$=E.searchParams.get("deleted")==="1"?"Project removed from AgentWitch Cloud. Folders on your computer were not deleted.":null,q=B(),ye=q===null?null:J({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),he=ye===null?{}:Object.fromEntries((await Promise.all(D.projects.map(async Ot=>{let jt=await NW(ye,Ot.id);return[Ot.id,jt?.counts??null]}))).filter(Ot=>Ot[1]!==null));Ze(P,await m({title:"Projects",activePath:"/projects",installVersion:R.installVersion,body:GW({projects:D.projects,compositionCountsByProjectId:he,cloudAppOrigin:v,syncMessage:D.message,syncOk:D.ok,flashMessage:$,flashError:H})}));return}if(L==="GET"&&C==="/projects/select-folder"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("projectId")?.trim()??"",v=B(),D=v===null?null:J({wsUrl:v.wsUrl,pairingToken:v.pairingToken}),H=R.length>0&&D!==null?Ln():null;if(H===null||D===null){P.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...qi}),P.end(ii);return}let $=await No({projectId:R,folderPath:H,allowOutsideHome:!0,profileDir:rs.default.dirname(e.layout.configPath),cloudConfig:D});if(!$.ok){ue(P,$.httpStatus,{ok:!1,error:$.message});return}ue(P,200,{ok:!0,projectId:R,folderPath:$.folderPath,bindingsSynced:$.bindingsSynced,summary:$.summary});return}if(L==="POST"&&C==="/projects/delete"){let E=await Xe(b),R=new URLSearchParams(E).get("projectId")?.trim()??"",v=B(),D=v===null?null:J({wsUrl:v.wsUrl,pairingToken:v.pairingToken});if(D===null||R.length===0){P.writeHead(303,{Location:"/projects?deleteError=1"}),P.end();return}let H=await GT(D,R);P.writeHead(303,{Location:H.ok?"/projects?deleted=1":"/projects?deleteError=1"}),P.end();return}if(L==="GET"&&C==="/project"){let E=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=E.searchParams.get("id")?.trim()??"",v=u(),D=Nr(v.installVersion),H=await ub(e.layout),$=kr(H.projects,R);if($===null){await I(P,"Project not found");return}let q=E.searchParams.get("linked")==="1"?E.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${E.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${E.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:E.searchParams.get("folderUpdated")==="1"?E.searchParams.get("bindingsSynced")==="0"?"Project folder updated. Harness composition sync to cloud failed \u2014 check WS connection on Status.":"Project folder updated and harness bindings synced with AgentWitch.":null,ye=E.searchParams.get("knowledgePromoted"),he=ye!==null?`Marked ${ye} lesson(s) as promoted in AgentWitch.`:null,Ot=E.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,jt=E.searchParams.get("tab")?.trim()??"harness",Be=jt==="workflows"||jt==="agents"||jt==="knowledge"||jt==="pitfalls"?jt:"harness",Dg=E.searchParams.get("retired")==="1",Xre=E.searchParams.get("edit")?.trim()||null,sD=Q7(E.searchParams.get("pitfall")),eR=B(),un=eR===null?null:J({wsUrl:eR.wsUrl,pairingToken:eR.pairingToken}),Zre=un===null?null:await NW(un,$.id),tR=0;if(un!==null)try{let pD=await fetch(`${un.appOrigin}/api/agent-witch/projects/${encodeURIComponent($.id)}/knowledge`,{method:"GET",headers:{[ae]:un.pairingToken},signal:AbortSignal.timeout(1e4)});if(pD.ok){let Hg=await pD.json();typeof Hg=="object"&&Hg!==null&&typeof Hg.candidateCount=="number"&&(tR=Hg.candidateCount)}}catch{tR=0}let iD=E.searchParams.get("rulePrompt"),aD=iD!==null,Qre=iD?.trim()??"",lD=E.searchParams.get("ruleDropped")?.trim()||null,cD=E.searchParams.get("ruleDroppedTitle")?.trim()||null,dD=E.searchParams.get("ruleChangeError")?.trim()||null,eoe=(E.searchParams.get("ruleChangeAction")?.trim()||null)==="restore"?"restore":"drop",toe=dD===null?null:{ok:!1,reason:dD},uD=Be==="pitfalls"||Be==="harness"&&aD?await eB({store:vS({layout:e.layout,cloud:un===null?null:Eu(un)}),projectId:$.id,includeRetired:Be==="pitfalls"?Dg:!1}):void 0,roe=Be!=="harness"?void 0:await cX({projectId:$.id,prompt:aD?Qre:null,cloudConfig:un,pitfalls:uD,dropFlash:lD!==null&&cD!==null?{ruleId:lD,title:cD}:null,changeError:toe,changeAction:eoe});Ze(P,await m({title:$.name,activePath:"/projects",installVersion:v.installVersion,body:Cn({project:$,cloudAppOrigin:D,installed:To(e.layout),linkedSetSlugs:rr($.projectFolderPath),composition:Zre,knowledgeCandidateCount:tR,pitfalls:uD,pitfallsShowRetired:Dg,pitfallsEditId:Xre,activeTab:Be,harnessExtraHtml:roe,flashMessage:q??he??sD?.message??null,flashError:Ot??sD?.error??null})}));return}if(L==="POST"&&(C==="/project/rules/drop"||C==="/project/rules/restore")){let E=await Xe(b),R=B(),v=R===null?null:J({wsUrl:R.wsUrl,pairingToken:R.pairingToken}),D=await uX({action:C.endsWith("/drop")?"drop":"restore",rawBody:E,cloudConfig:v});if(D.kind==="not_found"){await I(P,"Project not found");return}P.writeHead(303,{Location:D.location}),P.end();return}if(L==="POST"&&C==="/projects/pull-bound-harness"){let E=await Xe(b),R=await LT({rawBody:E,layout:e.layout});if(R.kind==="not_found"){await I(P,"Project not found");return}if(R.kind==="redirect"){P.writeHead(303,{Location:R.location}),P.end();return}let v=u();Ze(P,await m({title:R.title,activePath:"/projects",installVersion:v.installVersion,body:R.body}));return}if(L==="POST"&&C==="/projects/link-harness"){let E=await Xe(b),R=new URLSearchParams(E),v=R.get("projectId")?.trim()??"",D=await ub(e.layout),H=kr(D.projects,v);if(H===null){await I(P,"Project not found");return}let $=R.getAll("applySet").map(Be=>String(Be)),q=yu({layout:e.layout,projectFolderPath:H.projectFolderPath,setSlugs:$});if(!q.ok){let Be=u(),Dg=Nr(Be.installVersion);Ze(P,await m({title:H.name,activePath:"/projects",installVersion:Be.installVersion,body:Cn({project:H,cloudAppOrigin:Dg,installed:To(e.layout),linkedSetSlugs:rr(H.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:q.errorMessage})}));return}let ye=B(),he=ye===null?null:J({wsUrl:ye.wsUrl,pairingToken:ye.pairingToken}),Ot=he===null?!1:await Io(he,H.id,q.appliedSetSlugs),jt=new URLSearchParams({linked:"1",files:String(q.writtenFileCount),bindingsSynced:Ot?"1":"0"});P.writeHead(303,{Location:`/project?id=${encodeURIComponent(H.id)}&${jt.toString()}`}),P.end();return}if(L==="POST"&&C==="/projects/remove-harness-set"){let E=await Xe(b),R=await vT({rawBody:E,layout:e.layout});if(R.kind==="not_found"){await I(P,"Project not found");return}if(R.kind==="redirect"){P.writeHead(303,{Location:R.location}),P.end();return}let v=u();Ze(P,await m({title:R.title,activePath:"/projects",installVersion:v.installVersion,body:R.body}));return}if(L==="POST"&&C==="/project/knowledge/promote-all"){let E=await Xe(b),v=new URLSearchParams(E).get("projectId")?.trim()??"",D=await ub(e.layout),H=kr(D.projects,v);if(H===null){await I(P,"Project not found");return}let $=B(),q=$===null?null:J({wsUrl:$.wsUrl,pairingToken:$.pairingToken}),ye=q===null?{ok:!1,promotedCount:0}:await Y7(q,H.id),he=new URLSearchParams({tab:"knowledge",...ye.ok?{knowledgePromoted:String(ye.promotedCount)}:{knowledgePromoteFailed:"1"}});P.writeHead(303,{Location:`/project?id=${encodeURIComponent(H.id)}&${he.toString()}`}),P.end();return}let de=Xh(C);if(L==="POST"&&de!==null){let E=await Xe(b),R=await jT({rawBody:E,action:de,layout:e.layout,createStore:v=>vS({layout:e.layout,cloud:Eu(v)})});if(R.kind==="not_found"){await I(P,"Project not found");return}P.writeHead(303,{Location:R.location}),P.end();return}if(L==="GET"&&C==="/harness"){let E=new URL(b.url??"/",`http://127.0.0.1:${s}`),R=u(),v=Au(e.layout),D=E.searchParams.get("submitted")==="1",H=D?E.searchParams.get("syncFailed")==="1"?`Local harness updated (${E.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:E.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${E.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":E.searchParams.get("stopped")==="1"?`Reveal stopped. ${v?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:E.searchParams.get("revealed")==="1"?`Reveal found ${v?.sets.length??0} set(s).`:null,$=v?.scanRoots[0]??Mh(),q=UPe(e.layout,{reveal:v,importQuery:E.searchParams.get("import")==="1",justSubmitted:D}),ye=Nr(R.installVersion);Ze(P,await m({title:"Harness",activePath:"/harness",installVersion:R.installVersion,body:bm(mM(e.layout,{cloudAppOrigin:ye,reveal:v,scanFolder:$,flashMessage:H,importSectionExpanded:q}))}));return}if(L==="POST"&&C==="/api/harness/pick-folder"){let E=Ln();if(E===null){ue(P,200,{cancelled:!0});return}ue(P,200,{path:E});return}if(L==="GET"&&C==="/api/harness/file-content"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("path")?.trim()??"",v=fu(R);if(v===null){ue(P,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let D=og.default.readFileSync(v,"utf8"),H=D.length>tQ?`${D.slice(0,tQ)}
\u2026 (truncated)`:D;ue(P,200,{content:H})}catch{ue(P,500,{errorMessage:"Could not read file."})}return}if(L==="POST"&&C==="/api/harness/reveal/add-project"){let E=await Xe(b),R="";try{let H=JSON.parse(E);typeof H=="object"&&H!==null&&typeof H.projectPath=="string"&&(R=H.projectPath.trim())}catch{ue(P,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(R.length===0){ue(P,400,{ok:!1,errorMessage:"projectPath is required."});return}let v=Au(e.layout),D=rT({reveal:v,projectPath:R});if(D===null||D.sets.length===0){ue(P,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Fh(e.layout,D),ue(P,200,{ok:!0,setCount:D.sets.length});return}if(L==="GET"&&C==="/api/harness/reveal/stream"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("scanRoot")?.trim()??"";if(R.length===0){ue(P,400,{errorMessage:"Choose a folder to scan first."});return}let v=!1;b.on("close",()=>{v=!0}),P.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...qi});let D=oT({scanRoot:R,response:P,shouldAbort:()=>v});Fh(e.layout,D),P.end();return}if(L==="POST"&&C==="/harness/reveal"){P.writeHead(410,{"Content-Type":"text/plain"}),P.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(L==="POST"&&C==="/harness/submit"){let E=Au(e.layout);if(E===null){let ye=u(),he=Nr(ye.installVersion);Ze(P,await m({title:"Harness",activePath:"/harness",installVersion:ye.installVersion,body:bm(mM(e.layout,{cloudAppOrigin:he,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let R=await Xe(b),v=new URLSearchParams(R),D=MW(v,E),H=sT({layout:e.layout,sets:D});if(!H.ok){let ye=u(),he=Nr(ye.installVersion);Ze(P,await m({title:"Harness",activePath:"/harness",installVersion:ye.installVersion,body:bm(mM(e.layout,{cloudAppOrigin:he,reveal:E,flashError:H.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}aT(e.layout);let q=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";P.writeHead(303,{Location:`/harness?submitted=1&count=${H.writtenItemCount??0}${q}`}),P.end();return}if(L==="GET"&&C==="/writer-api"){let E=new URL(b.url??"/",`http://127.0.0.1:${s}`),v=B()?.writerExecutionBackend??ut(void 0),D=ot(e.layout.configPath),H=bn(D),$=E.searchParams.get("saved")==="1"?"Writer API settings saved on this computer.":null,q=u();Ze(P,await m({title:"Writer API",activePath:"/writer-api",installVersion:q.installVersion,body:OW({writerExecutionBackend:v,secrets:H,flashMessage:$})}));return}if(L==="POST"&&C==="/writer-api"){let E=await Xe(b),R=new URLSearchParams(E),v=R.get("writerExecutionBackend")?.trim()??"cli";dE({configPath:e.layout.configPath,writerExecutionBackend:ut(v),anthropicApiKey:R.get("anthropicApiKey")??void 0,anthropicModel:R.get("anthropicModel")??void 0,openaiApiKey:R.get("openaiApiKey")??void 0,openaiModel:R.get("openaiModel")??void 0,googleApiKey:R.get("googleApiKey")??void 0,googleModel:R.get("googleModel")??void 0}),P.writeHead(303,{Location:"/writer-api?saved=1"}),P.end();return}if(L==="GET"&&C==="/estimates"){P.writeHead(302,{Location:"/history"}),P.end();return}if(L==="GET"&&C==="/history"){let E=u();Ze(P,await m({title:"History",activePath:"/history",installVersion:E.installVersion,body:PW({reportsDir:e.layout.reportsDir})}));return}if(L==="GET"&&C==="/knowledge"){let R=new URL(b.url??"/",`http://127.0.0.1:${s}`).searchParams.get("q")?.trim()??"",v=u(),D=uL({layout:e.layout}),H=gL(D),$=R.length>0?await kl({layout:e.layout,query:R,limit:20}):ip(e.layout).slice(-50).reverse(),q=$.map(he=>{let Ot=mL(D,he.id),jt=Ot>0?` \xB7 used in ${Ot} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${$e(he.createdAt)}">${$e(fM(he.createdAt))}${he.source?` \xB7 ${$e(he.source)}`:""}${jt}</div><pre>${$e(he.text)}</pre></article>`}).join(""),ye=H.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${H.map(he=>`<li><strong>P${he.priority}</strong> \u2014 ${$e(he.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your computer.</p></section>`:"";Ze(P,await m({title:"Knowledge",activePath:"/knowledge",installVersion:v.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this computer. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${$e(R)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${KPe(R,$.length)}
            </section>${ye}${q}`}));return}L==="POST"&&await Xe(b),await I(P,"Not found")})().catch(C=>{console.error("[agent-witch-local-app]",C),P.writeHead(500),P.end("Internal error")})}),_=()=>{zS(o,s);try{cl()}catch(P){let C=P instanceof Error?P.message:String(P);console.error(`[agent-witch] writeGlobalTriggers failed: ${C}`)}console.log(`[agent-witch] Local app http://127.0.0.1:${s} (range ${n.start}\u2013${n.end})`);let b=pS();b!==null&&console.warn(b)},W=async()=>{if(c+=1,c>a){i=!0,BS(o),console.error(`[agent-witch] ${zu}`);return}let b=await YC({profileDir:o,range:n});if(!b.ok){i=!0,console.error(`[agent-witch] ${b.reason}`);return}i=!1,s=b.port,M.listen(s,"127.0.0.1",_)};M.on("error",b=>{if(b.code==="EADDRINUSE"){W();return}console.error("[agent-witch] Local app server error:",b)});let O=Bj();return M.on("close",()=>{O.stop()}),W(),M},sg=e=>db(e).publicKeyRaw});var iQ=l(()=>{"use strict"});var pb=l(()=>{"use strict";Pl();xV();sQ();ti();Pl();dP();$S();iQ();ZC();GS()});var lQ={};Mt(lQ,{runAgentWitchExternalLiveCli:()=>ZPe});var yM,aQ,XPe,ZPe,cQ=l(()=>{"use strict";yM=p(require("node:fs")),aQ=p(require("node:path"));xs();Z();Uc();nw();Ae();pb();Ae();XPe=e=>{let t=aQ.default.join(e,"link-code.txt");if(!yM.default.existsSync(t))return null;let r=yM.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},ZPe=()=>{Dt("agent-witch-live");let e=x(),t=z(),r=XPe(e),o=sg(t);ng({layout:t,controllers:{getStatus:()=>{let n=Ue(t);return{wsConnected:Dd(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{dR({platform:process.platform,installDir:e,runners:{kickstartLaunchAgents:()=>Ps(e,process.platform),restartSystemdUserService:vd}}).then(n=>{n.ok||console.warn(`[agent-witch-live] Revive: ${n.message}`)})}}})}});var on=T((byt,pQ)=>{"use strict";var dQ=["nodebuffer","arraybuffer","fragments"],uQ=typeof Blob<"u";uQ&&dQ.push("blob");pQ.exports={BINARY_TYPES:dQ,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:uQ,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var ig=T((Ryt,mb)=>{"use strict";var{EMPTY_BUFFER:QPe}=on(),hM=Buffer[Symbol.species];function eAe(e,t){if(e.length===0)return QPe;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new hM(r.buffer,r.byteOffset,o):r}function mQ(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function gQ(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function tAe(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function SM(e){if(SM.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new hM(e):ArrayBuffer.isView(e)?t=new hM(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),SM.readOnly=!1),t}mb.exports={concat:eAe,mask:mQ,toArrayBuffer:tAe,toBuffer:SM,unmask:gQ};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");mb.exports.mask=function(t,r,o,n,s){s<48?mQ(t,r,o,n,s):e.mask(t,r,o,n,s)},mb.exports.unmask=function(t,r){t.length<32?gQ(t,r):e.unmask(t,r)}}catch{}});var hQ=T((kyt,yQ)=>{"use strict";var fQ=Symbol("kDone"),PM=Symbol("kRun"),AM=class{constructor(t){this[fQ]=()=>{this.pending--,this[PM]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[PM]()}[PM](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[fQ])}}};yQ.exports=AM});var hc=T((wyt,_Q)=>{"use strict";var ag=require("zlib"),SQ=ig(),rAe=hQ(),{kStatusCode:PQ}=on(),oAe=Buffer[Symbol.species],nAe=Buffer.from([0,0,255,255]),fb=Symbol("permessage-deflate"),nn=Symbol("total-length"),fc=Symbol("callback"),os=Symbol("buffers"),yc=Symbol("error"),gb,_M=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!gb){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;gb=new rAe(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[fc];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){gb.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){gb.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?ag.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=ag.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[fb]=this,this._inflate[nn]=0,this._inflate[os]=[],this._inflate.on("error",iAe),this._inflate.on("data",AQ)}this._inflate[fc]=o,this._inflate.write(t),r&&this._inflate.write(nAe),this._inflate.flush(()=>{let s=this._inflate[yc];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=SQ.concat(this._inflate[os],this._inflate[nn]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[nn]=0,this._inflate[os]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?ag.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=ag.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[nn]=0,this._deflate[os]=[],this._deflate.on("data",sAe)}this._deflate[fc]=o,this._deflate.write(t),this._deflate.flush(ag.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=SQ.concat(this._deflate[os],this._deflate[nn]);r&&(s=new oAe(s.buffer,s.byteOffset,s.length-4)),this._deflate[fc]=null,this._deflate[nn]=0,this._deflate[os]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};_Q.exports=_M;function sAe(e){this[os].push(e),this[nn]+=e.length}function AQ(e){if(this[nn]+=e.length,this[fb]._maxPayload<1||this[nn]<=this[fb]._maxPayload){this[os].push(e);return}this[yc]=new RangeError("Max payload size exceeded"),this[yc].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[yc][PQ]=1009,this.removeListener("data",AQ),this.reset()}function iAe(e){if(this[fb]._inflate=null,this[yc]){this[fc](this[yc]);return}e[PQ]=1007,this[fc](e)}});var Sc=T((Eyt,yb)=>{"use strict";var{isUtf8:bQ}=require("buffer"),{hasBlob:aAe}=on(),lAe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function cAe(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function bM(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function dAe(e){return aAe&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}yb.exports={isBlob:dAe,isValidStatusCode:cAe,isValidUTF8:bM,tokenChars:lAe};if(bQ)yb.exports.isValidUTF8=function(e){return e.length<24?bM(e):bQ(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");yb.exports.isValidUTF8=function(t){return t.length<32?bM(t):e(t)}}catch{}});var TM=T((Tyt,IQ)=>{"use strict";var{Writable:uAe}=require("stream"),RQ=hc(),{BINARY_TYPES:pAe,EMPTY_BUFFER:kQ,kStatusCode:mAe,kWebSocket:gAe}=on(),{concat:RM,toArrayBuffer:fAe,unmask:yAe}=ig(),{isValidStatusCode:hAe,isValidUTF8:wQ}=Sc(),hb=Buffer[Symbol.species],ur=0,EQ=1,TQ=2,CQ=3,kM=4,wM=5,Sb=6,EM=class extends uAe{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||pAe[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[gAe]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=ur}_write(t,r,o){if(this._opcode===8&&this._state==ur)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new hb(o.buffer,o.byteOffset+t,o.length-t),new hb(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new hb(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case ur:this.getInfo(t);break;case EQ:this.getPayloadLength16(t);break;case TQ:this.getPayloadLength64(t);break;case CQ:this.getMask();break;case kM:this.getData(t);break;case wM:case Sb:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[RQ.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=EQ:this._payloadLength===127?this._state=TQ:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=CQ:this._state=kM}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=kM}getData(t){let r=kQ;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&yAe(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=wM,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[RQ.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===ur&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=ur;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=RM(o,r):this._binaryType==="arraybuffer"?n=fAe(RM(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=ur):(this._state=Sb,setImmediate(()=>{this.emit("message",n,!0),this._state=ur,this.startLoop(t)}))}else{let n=RM(o,r);if(!this._skipUTF8Validation&&!wQ(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===wM||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=ur):(this._state=Sb,setImmediate(()=>{this.emit("message",n,!1),this._state=ur,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,kQ),this.end();else{let o=t.readUInt16BE(0);if(!hAe(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new hb(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!wQ(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=ur;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=ur):(this._state=Sb,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=ur,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[mAe]=n,i}};IQ.exports=EM});var LM=T((Iyt,xQ)=>{"use strict";var{Duplex:Cyt}=require("stream"),{randomFillSync:SAe}=require("crypto"),{types:{isUint8Array:PAe}}=require("util"),LQ=hc(),{EMPTY_BUFFER:AAe,kWebSocket:_Ae,NOOP:bAe}=on(),{isBlob:Pc,isValidStatusCode:RAe}=Sc(),{mask:vQ,toBuffer:Ji}=ig(),pr=Symbol("kByteLength"),kAe=Buffer.alloc(4),Pb=8*1024,Yi,Ac=Pb,Hr=0,wAe=1,EAe=2,CM=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Hr,this.onerror=bAe,this[_Ae]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||kAe,r.generateMask?r.generateMask(o):(Ac===Pb&&(Yi===void 0&&(Yi=Buffer.alloc(Pb)),SAe(Yi,0,Pb),Ac=0),o[0]=Yi[Ac++],o[1]=Yi[Ac++],o[2]=Yi[Ac++],o[3]=Yi[Ac++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[pr]!==void 0?a=r[pr]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(vQ(t,o,d,s,a),[d]):(vQ(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=AAe;else{if(typeof t!="number"||!RAe(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(PAe(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[pr]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Hr?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Pc(t)?(n=t.size,s=!1):(t=Ji(t),n=t.length,s=Ji.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[pr]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Pc(t)?this._state!==Hr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Hr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Pc(t)?(n=t.size,s=!1):(t=Ji(t),n=t.length,s=Ji.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[pr]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Pc(t)?this._state!==Hr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Hr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[LQ.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Pc(t)?(a=t.size,c=!1):(t=Ji(t),a=t.length,c=Ji.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[pr]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Pc(t)?this._state!==Hr?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Hr?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[pr],this._state=EAe,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(IM,this,a,n);return}this._bufferedBytes-=o[pr];let i=Ji(s);r?this.dispatch(i,r,o,n):(this._state=Hr,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(TAe,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[LQ.extensionName];this._bufferedBytes+=o[pr],this._state=wAe,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");IM(this,c,n);return}this._bufferedBytes-=o[pr],this._state=Hr,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Hr&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][pr],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][pr],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};xQ.exports=CM;function IM(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function TAe(e,t,r){IM(e,t,r),e.onerror(t)}});var $Q=T((Lyt,FQ)=>{"use strict";var{kForOnEventAttribute:lg,kListener:vM}=on(),WQ=Symbol("kCode"),OQ=Symbol("kData"),jQ=Symbol("kError"),MQ=Symbol("kMessage"),NQ=Symbol("kReason"),_c=Symbol("kTarget"),DQ=Symbol("kType"),HQ=Symbol("kWasClean"),sn=class{constructor(t){this[_c]=null,this[DQ]=t}get target(){return this[_c]}get type(){return this[DQ]}};Object.defineProperty(sn.prototype,"target",{enumerable:!0});Object.defineProperty(sn.prototype,"type",{enumerable:!0});var Xi=class extends sn{constructor(t,r={}){super(t),this[WQ]=r.code===void 0?0:r.code,this[NQ]=r.reason===void 0?"":r.reason,this[HQ]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[WQ]}get reason(){return this[NQ]}get wasClean(){return this[HQ]}};Object.defineProperty(Xi.prototype,"code",{enumerable:!0});Object.defineProperty(Xi.prototype,"reason",{enumerable:!0});Object.defineProperty(Xi.prototype,"wasClean",{enumerable:!0});var bc=class extends sn{constructor(t,r={}){super(t),this[jQ]=r.error===void 0?null:r.error,this[MQ]=r.message===void 0?"":r.message}get error(){return this[jQ]}get message(){return this[MQ]}};Object.defineProperty(bc.prototype,"error",{enumerable:!0});Object.defineProperty(bc.prototype,"message",{enumerable:!0});var cg=class extends sn{constructor(t,r={}){super(t),this[OQ]=r.data===void 0?null:r.data}get data(){return this[OQ]}};Object.defineProperty(cg.prototype,"data",{enumerable:!0});var CAe={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[lg]&&n[vM]===t&&!n[lg])return;let o;if(e==="message")o=function(s,i){let a=new cg("message",{data:i?s:s.toString()});a[_c]=this,Ab(t,this,a)};else if(e==="close")o=function(s,i){let a=new Xi("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[_c]=this,Ab(t,this,a)};else if(e==="error")o=function(s){let i=new bc("error",{error:s,message:s.message});i[_c]=this,Ab(t,this,i)};else if(e==="open")o=function(){let s=new sn("open");s[_c]=this,Ab(t,this,s)};else return;o[lg]=!!r[lg],o[vM]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[vM]===t&&!r[lg]){this.removeListener(e,r);break}}};FQ.exports={CloseEvent:Xi,ErrorEvent:bc,Event:sn,EventTarget:CAe,MessageEvent:cg};function Ab(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var _b=T((vyt,zQ)=>{"use strict";var{tokenChars:dg}=Sc();function yo(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function IAe(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(u===-1&&dg[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let y=e.slice(c,u);d===44?(yo(t,y,r),r=Object.create(null)):i=y,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(u===-1&&dg[d]===1)c===-1&&(c=m);else if(d===32||d===9)u===-1&&c!==-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m),yo(r,e.slice(c,u),!0),d===44&&(yo(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,m),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(dg[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(dg[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,u=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(u===-1&&dg[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))u===-1&&(u=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);u===-1&&(u=m);let y=e.slice(c,u);o&&(y=y.replace(/\\/g,""),o=!1),yo(r,a,y),d===44&&(yo(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=m);let g=e.slice(c,u);return i===void 0?yo(t,g,r):(a===void 0?yo(r,g,!0):o?yo(r,a,g.replace(/\\/g,"")):yo(r,a,g),yo(t,i,r)),t}function LAe(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}zQ.exports={format:LAe,parse:IAe}});var wb=T((Oyt,eee)=>{"use strict";var vAe=require("events"),xAe=require("https"),WAe=require("http"),GQ=require("net"),OAe=require("tls"),{randomBytes:jAe,createHash:MAe}=require("crypto"),{Duplex:xyt,Readable:Wyt}=require("stream"),{URL:xM}=require("url"),ns=hc(),NAe=TM(),DAe=LM(),{isBlob:HAe}=Sc(),{BINARY_TYPES:UQ,CLOSE_TIMEOUT:FAe,EMPTY_BUFFER:bb,GUID:$Ae,kForOnEventAttribute:WM,kListener:zAe,kStatusCode:UAe,kWebSocket:Qe,NOOP:KQ}=on(),{EventTarget:{addEventListener:BAe,removeEventListener:GAe}}=$Q(),{format:KAe,parse:VAe}=_b(),{toBuffer:qAe}=ig(),VQ=Symbol("kAborted"),OM=[8,13],an=["CONNECTING","OPEN","CLOSING","CLOSED"],JAe=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Pe=class e extends vAe{constructor(t,r,o){super(),this._binaryType=UQ[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=bb,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),qQ(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){UQ.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new NAe({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new DAe(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Qe]=this,s[Qe]=this,t[Qe]=this,n.on("conclude",ZAe),n.on("drain",QAe),n.on("error",e_e),n.on("message",t_e),n.on("ping",r_e),n.on("pong",o_e),s.onerror=n_e,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",XQ),t.on("data",kb),t.on("end",ZQ),t.on("error",QQ),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[ns.extensionName]&&this._extensions[ns.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){qt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,YQ(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){jM(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||bb,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){jM(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||bb,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){jM(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[ns.extensionName]||(n.compress=!1),this._sender.send(t||bb,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){qt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Pe,"CONNECTING",{enumerable:!0,value:an.indexOf("CONNECTING")});Object.defineProperty(Pe.prototype,"CONNECTING",{enumerable:!0,value:an.indexOf("CONNECTING")});Object.defineProperty(Pe,"OPEN",{enumerable:!0,value:an.indexOf("OPEN")});Object.defineProperty(Pe.prototype,"OPEN",{enumerable:!0,value:an.indexOf("OPEN")});Object.defineProperty(Pe,"CLOSING",{enumerable:!0,value:an.indexOf("CLOSING")});Object.defineProperty(Pe.prototype,"CLOSING",{enumerable:!0,value:an.indexOf("CLOSING")});Object.defineProperty(Pe,"CLOSED",{enumerable:!0,value:an.indexOf("CLOSED")});Object.defineProperty(Pe.prototype,"CLOSED",{enumerable:!0,value:an.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Pe.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Pe.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[WM])return t[zAe];return null},set(t){for(let r of this.listeners(e))if(r[WM]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[WM]:!0})}})});Pe.prototype.addEventListener=BAe;Pe.prototype.removeEventListener=GAe;eee.exports=Pe;function qQ(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:FAe,protocolVersion:OM[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!OM.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${OM.join(", ")})`);let s;if(t instanceof xM)s=t;else try{s=new xM(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let S=new SyntaxError(c);if(e._redirects===0)throw S;Rb(e,S);return}let d=i?443:80,u=jAe(16).toString("base64"),m=i?xAe.request:WAe.request,g=new Set,y;if(n.createConnection=n.createConnection||(i?XAe:YAe),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(y=new ns({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=KAe({[ns.extensionName]:y.offer()})),r.length){for(let S of r){if(typeof S!="string"||!JAe.test(S)||g.has(S))throw new SyntaxError("An invalid or duplicated subprotocol was specified");g.add(S)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let S=n.path.split(":");n.socketPath=S[0],n.path=S[1]}let h;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let S=o&&o.headers;if(o={...o,headers:{}},S)for(let[w,I]of Object.entries(S))o.headers[w.toLowerCase()]=I}else if(e.listenerCount("redirect")===0){let S=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!S||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,S||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),h=e._req=m(n),e._redirects&&e.emit("redirect",e.url,h)}else h=e._req=m(n);n.timeout&&h.on("timeout",()=>{qt(e,h,"Opening handshake has timed out")}),h.on("error",S=>{h===null||h[VQ]||(h=e._req=null,Rb(e,S))}),h.on("response",S=>{let w=S.headers.location,I=S.statusCode;if(w&&n.followRedirects&&I>=300&&I<400){if(++e._redirects>n.maxRedirects){qt(e,h,"Maximum redirects exceeded");return}h.abort();let f;try{f=new xM(w,t)}catch{let M=new SyntaxError(`Invalid URL: ${w}`);Rb(e,M);return}qQ(e,f,r,o)}else e.emit("unexpected-response",h,S)||qt(e,h,`Unexpected server response: ${S.statusCode}`)}),h.on("upgrade",(S,w,I)=>{if(e.emit("upgrade",S),e.readyState!==Pe.CONNECTING)return;h=e._req=null;let f=S.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){qt(e,w,"Invalid Upgrade header");return}let k=MAe("sha1").update(u+$Ae).digest("base64");if(S.headers["sec-websocket-accept"]!==k){qt(e,w,"Invalid Sec-WebSocket-Accept header");return}let M=S.headers["sec-websocket-protocol"],_;if(M!==void 0?g.size?g.has(M)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":g.size&&(_="Server sent no subprotocol"),_){qt(e,w,_);return}M&&(e._protocol=M);let W=S.headers["sec-websocket-extensions"];if(W!==void 0){if(!y){qt(e,w,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let O;try{O=VAe(W)}catch{qt(e,w,"Invalid Sec-WebSocket-Extensions header");return}let b=Object.keys(O);if(b.length!==1||b[0]!==ns.extensionName){qt(e,w,"Server indicated an extension that was not requested");return}try{y.accept(O[ns.extensionName])}catch{qt(e,w,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[ns.extensionName]=y}e.setSocket(w,I,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(h,e):h.end()}function Rb(e,t){e._readyState=Pe.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function YAe(e){return e.path=e.socketPath,GQ.connect(e)}function XAe(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=GQ.isIP(e.host)?"":e.host),OAe.connect(e)}function qt(e,t,r){e._readyState=Pe.CLOSING;let o=new Error(r);Error.captureStackTrace(o,qt),t.setHeader?(t[VQ]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Rb,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function jM(e,t,r){if(t){let o=HAe(t)?t.size:qAe(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${an[e.readyState]})`);process.nextTick(r,o)}}function ZAe(e,t){let r=this[Qe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Qe]!==void 0&&(r._socket.removeListener("data",kb),process.nextTick(JQ,r._socket),e===1005?r.close():r.close(e,t))}function QAe(){let e=this[Qe];e.isPaused||e._socket.resume()}function e_e(e){let t=this[Qe];t._socket[Qe]!==void 0&&(t._socket.removeListener("data",kb),process.nextTick(JQ,t._socket),t.close(e[UAe])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function BQ(){this[Qe].emitClose()}function t_e(e,t){this[Qe].emit("message",e,t)}function r_e(e){let t=this[Qe];t._autoPong&&t.pong(e,!this._isServer,KQ),t.emit("ping",e)}function o_e(e){this[Qe].emit("pong",e)}function JQ(e){e.resume()}function n_e(e){let t=this[Qe];t.readyState!==Pe.CLOSED&&(t.readyState===Pe.OPEN&&(t._readyState=Pe.CLOSING,YQ(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function YQ(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function XQ(){let e=this[Qe];if(this.removeListener("close",XQ),this.removeListener("data",kb),this.removeListener("end",ZQ),e._readyState=Pe.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Qe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",BQ),e._receiver.on("finish",BQ))}function kb(e){this[Qe]._receiver.write(e)||this.pause()}function ZQ(){let e=this[Qe];e._readyState=Pe.CLOSING,e._receiver.end(),this.end()}function QQ(){let e=this[Qe];this.removeListener("error",QQ),this.on("error",KQ),e&&(e._readyState=Pe.CLOSING,this.destroy())}});var nee=T((Myt,oee)=>{"use strict";var jyt=wb(),{Duplex:s_e}=require("stream");function tee(e){e.emit("close")}function i_e(){!this.destroyed&&this._writableState.finished&&this.destroy()}function ree(e){this.removeListener("error",ree),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function a_e(e,t){let r=!0,o=new s_e({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(tee,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(tee,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",i_e),o.on("error",ree),o}oee.exports=a_e});var MM=T((Nyt,see)=>{"use strict";var{tokenChars:l_e}=Sc();function c_e(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&l_e[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}see.exports={parse:c_e}});var pee=T((Hyt,uee)=>{"use strict";var d_e=require("events"),Eb=require("http"),{Duplex:Dyt}=require("stream"),{createHash:u_e}=require("crypto"),iee=_b(),Zi=hc(),p_e=MM(),m_e=wb(),{CLOSE_TIMEOUT:g_e,GUID:f_e,kWebSocket:y_e}=on(),h_e=/^[+/0-9A-Za-z]{22}==$/,aee=0,lee=1,dee=2,NM=class extends d_e{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:g_e,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:m_e,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=Eb.createServer((o,n)=>{let s=Eb.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=S_e(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=aee}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===dee){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(ug,this);return}if(t&&this.once("close",t),this._state!==lee)if(this._state=lee,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ug,this):process.nextTick(ug,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{ug(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",cee);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Qi(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Qi(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!h_e.test(s)){Qi(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Qi(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){pg(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=p_e.parse(c)}catch{Qi(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&u!==void 0){let g=new Zi({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=iee.parse(u);y[Zi.extensionName]&&(g.accept(y[Zi.extensionName]),m[Zi.extensionName]=g)}catch{Qi(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let g={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(g,(y,h,S,w)=>{if(!y)return pg(r,h||401,S,w);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(g))return pg(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[y_e])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>aee)return pg(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${u_e("sha1").update(r+f_e).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),u._protocol=m)}if(t[Zi.extensionName]){let m=t[Zi.extensionName].params,g=iee.format({[Zi.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${g}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",cee),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ug,this)})),a(u,n)}};uee.exports=NM;function S_e(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function ug(e){e._state=dee,e.emit("close")}function cee(){this.destroy()}function pg(e,t,r,o){r=r||Eb.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${Eb.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Qi(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Qi),e.emit("wsClientError",i,r,t)}else pg(r,o,n,s)}});var P_e,A_e,__e,b_e,R_e,k_e,mee,w_e,Rc,gee=l(()=>{P_e=p(nee(),1),A_e=p(_b(),1),__e=p(hc(),1),b_e=p(TM(),1),R_e=p(LM(),1),k_e=p(MM(),1),mee=p(wb(),1),w_e=p(pee(),1),Rc=mee.default});var DM,fee=l(()=>{"use strict";DM=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var E_e,HM,yee=l(()=>{"use strict";vy();fee();E_e=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",HM=(e={})=>{let t=e.env??process.env,r=DM(t[Iy]),o=DM(t[Ly]);return{mode:E_e(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var hee=l(()=>{"use strict";vy()});var See=l(()=>{"use strict";yee();hee()});var T_e,Pee,Aee=l(()=>{"use strict";oe();_t();St();T_e={isPaused:wo,loadFolders:CC,resolveFolder:TC},Pee=async(e,t=T_e)=>{if(t.isPaused(e.config.layout.configPath))return{ok:!1,code:pe.CODING_TOOLS_PAUSED};if(e.requestedFolderPath===null)return{ok:!1,code:pe.FOLDER_REQUIRED};let r=await t.loadFolders({wsUrl:e.config.wsUrl,pairingToken:e.config.pairingToken});return t.resolveFolder({...e.projectId!==void 0?{projectId:e.projectId}:{},requestedFolderPath:e.requestedFolderPath,registeredFolders:r,managedProjectsDir:e.config.layout.projectsDir,defaultFolderPath:e.defaultFolderPath})}});var FM=l(()=>{"use strict"});var kc,ea,_ee,I_e,$M,zM,bee,Ree,UM,kee,mg,BM=l(()=>{"use strict";kc=p(require("node:fs")),ea=p(require("node:os")),_ee=p(require("node:path"));FM();Ca();I_e=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$M=(e=ea.default.hostname())=>_ee.default.join(ea.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),zM=e=>{if(!kc.default.existsSync(e))return null;try{let t=JSON.parse(kc.default.readFileSync(e,"utf8"));return!I_e(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},bee=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},Ree=(e,t)=>{kc.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},UM=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??$M(),o=zM(r);if(o!==null&&o.pid!==process.pid&&Zt(o.pid)&&bee(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:ea.default.hostname(),macOsUsername:ea.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return Ree(r,n),{ok:!0}},kee=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??$M(),o=zM(r);return o!==null&&o.pid!==process.pid&&Zt(o.pid)&&bee(o)?{ok:!1}:(Ree(r,{hostname:ea.default.hostname(),macOsUsername:ea.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},mg=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??$M();zM(r)?.pid===process.pid&&kc.default.existsSync(r)&&kc.default.unlinkSync(r)}});var GM,gg,L_e,v_e,x_e,W_e,KM,wee=l(()=>{"use strict";GM=require("node:child_process"),gg=p(require("node:path"));Ca();py();L_e=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),v_e=(e,t)=>{if(L_e(e)||!/\bnode\b/.test(e))return!1;let r=gg.default.resolve(t),o=gg.default.join(r,"app",ud),n=gg.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===ud||i==="agent-witch.ts")return e.includes(r);try{let a=gg.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},x_e=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,GM.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},W_e=(e,t,r)=>{let o=x_e(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||v_e(d,t)&&n.push(c)}return n},KM=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,GM.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=W_e(r,e.installDir,t),n=[];for(let s of o)if(Zt(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var fg,yg,Eee,O_e,VM,Tee=l(()=>{"use strict";fg=p(require("node:fs")),yg=p(require("node:path"));dt();Eee=(e,t)=>{!fg.default.existsSync(e)||fg.default.existsSync(t)||(fg.default.mkdirSync(yg.default.dirname(t),{recursive:!0}),fg.default.renameSync(e,t))},O_e=e=>{if(e.profileEmail===null)return;let t=yg.default.join(e.installDir,gr);Eee(yg.default.join(t,as),e.mainLogPath),Eee(yg.default.join(t,ls),e.errorLogPath)},VM=e=>{let t=z();e!==void 0&&t.installDir!==e||O_e(t)}});var Cee=l(()=>{"use strict";Yu();aP();aP();!Ht()&&bs(__agentWitchImportMetaUrl)&&(async()=>{Dt("agent-witch-wake-server");let e=await si(),t=bo(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var Iee=l(()=>{"use strict";Cee()});var Lee=l(()=>{"use strict";Nu()});var qM,vee=l(()=>{"use strict";FM();Iee();BM();Lee();qM=async(e={})=>{let t=e.skipInProcessBridge?null:await iP();MS();let r=setInterval(()=>{MS()},6e4),o=setInterval(()=>{if(!kee().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var hg,Tb,N_e,xee,Wee,Cb,Oee,jee,JM,Mee,Ib,Nee=l(()=>{"use strict";hg=p(require("node:fs")),Tb=p(require("node:path")),N_e="pending-run-inputs.json",xee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wee=e=>{let t=e.profileEmail?Tb.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Tb.default.join(t,N_e)},Cb=e=>{let t=Wee(e);if(!hg.default.existsSync(t))return{};try{let r=JSON.parse(hg.default.readFileSync(t,"utf8"));return xee(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!xee(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},Oee=(e,t)=>{let r=Wee(e);hg.default.mkdirSync(Tb.default.dirname(r),{recursive:!0}),hg.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},jee=e=>Object.values(Cb(e)),JM=(e,t)=>Cb(e)[t]!==void 0,Mee=(e,t)=>{let r=Cb(e);r[t.agentRunId]=t,Oee(e,r)},Ib=(e,t)=>{let r=Cb(e);delete r[t],Oee(e,r)}});var Lb=l(()=>{"use strict";oe()});var Dee=l(()=>{"use strict";oe()});var vb=l(()=>{"use strict";oe()});var xb=l(()=>{"use strict";oe()});var Sg=l(()=>{"use strict";oe()});var D_e,H_e,Pg,YM=l(()=>{"use strict";Pr();Lb();Dee();vb();xb();Sg();D_e={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},H_e={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Pg=e=>{if(!De(e.writerAgent))return"the selected writer";let t=Ft(e.writerAgent);if(ut(e.writerExecutionBackend)==="api"&&t!==null){let r=Et(ot(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Gd(t,r.model);return`${H_e[t]} model ${o}`}}return D_e[e.writerAgent]}});var F_e,$_e,Hee,Fee,$ee=l(()=>{"use strict";F_e=/"input_tokens"\s*:\s*(\d+)/,$_e=/"output_tokens"\s*:\s*(\d+)/,Hee=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},Fee=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=Hee(F_e.exec(t)),o=Hee($_e.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Ag,Wb,z_e,zee,XM,Uee,Bee,ZM,QM,Ob=l(()=>{"use strict";Ag=p(require("node:fs")),Wb=p(require("node:path"));oe();eN();z_e="pending-run-result-deliveries.json",zee=e=>{let t=e.profileEmail?Wb.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Wb.default.join(t,z_e)},XM=e=>{let t=zee(e);if(!Ag.default.existsSync(t))return[];try{let r=JSON.parse(Ag.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.createdAt=="string"&&typeof o.resultMessage=="object"):[]}catch{return[]}},Uee=(e,t)=>{let r=zee(e);Ag.default.mkdirSync(Wb.default.dirname(r),{recursive:!0}),Ag.default.writeFileSync(r,JSON.stringify(t,null,2),"utf8")},Bee=(e,t)=>{if(_g(e,t.runId))return;let r=[...XM(e).filter(o=>o.runId!==t.runId),t];Uee(e,r)},ZM=(e,t)=>{Uee(e,XM(e).filter(r=>r.runId!==t))},QM=e=>{for(let t of XM(e.layout)){if(_g(e.layout,t.runId)){ZM(e.layout,t.runId);continue}e.send(qr(t.resultMessage)),t.terminalEndMessage!==void 0&&e.send(qr(t.terminalEndMessage))}}});var jb=l(()=>{"use strict";_t()});var ss,bg,U_e,Vee,rN,tN,qee,B_e,_g,oN,Jee,Gee,Yee,G_e,Kee,nN,eN=l(()=>{"use strict";ss=p(require("node:fs")),bg=p(require("node:path"));St();oe();Ob();jb();U_e="run-completion-outbox.json",Vee="run-completion-posted.json",rN=(e,t)=>{let r=e.profileEmail?bg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return bg.default.join(r,t)},tN=e=>rN(e,U_e),qee=e=>{try{let t=JSON.parse(ss.default.readFileSync(rN(e,Vee),"utf8"));return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]}catch{return[]}},B_e=(e,t)=>{let r=rN(e,Vee);ss.default.mkdirSync(bg.default.dirname(r),{recursive:!0}),ss.default.writeFileSync(r,JSON.stringify(lh(qee(e),t)),"utf8")},_g=(e,t)=>qee(e).includes(t),oN=e=>{let t=tN(e);if(!ss.default.existsSync(t))return[];try{let r=JSON.parse(ss.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},Jee=(e,t)=>{ss.default.mkdirSync(bg.default.dirname(tN(e)),{recursive:!0}),ss.default.writeFileSync(tN(e),JSON.stringify(t,null,2),"utf8")},Gee=(e,t)=>{Jee(e,oN(e).filter(r=>r.runId!==t))},Yee=(e,t)=>{if(_g(e,t.runId))return;let r={...t,output:Fd(t.output,Da("secretHidden"))},o=[...oN(e).filter(n=>n.runId!==t.runId),r];Jee(e,o)},G_e=async e=>{for(let t of oN(e.layout)){if(_g(e.layout,t.runId)){Gee(e.layout,t.runId);continue}await ku(e.cloudApi,t.runId,t.exitCode,t.output,{estimateSeconds:t.estimateSeconds,actualSeconds:t.actualSeconds})&&(B_e(e.layout,t.runId),ZM(e.layout,t.runId),Gee(e.layout,t.runId))}},Kee={chain:Promise.resolve()},nN=e=>{let t=e.cloudApi;if(t===null)return Promise.resolve();let r=Kee.chain.then(()=>G_e({layout:e.layout,cloudApi:t}));return Kee.chain=r.catch(()=>{}),r}});var Xee=l(()=>{"use strict"});var sN,Rg,V_e,ta,Zee=l(()=>{"use strict";oe();Xee();sN=new Map,Rg=e=>{let t=sN.get(e);t!==void 0&&(clearInterval(t),sN.delete(e))},V_e=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify(qr({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}})))},ta=(e,t,r,o={})=>{Rg(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Rg(t);return}let i=o.onTick?.()??{};V_e(e,t,n,i)};s(),sN.set(t,setInterval(s,15e3))}});var Qee=l(()=>{"use strict";_t()});var ete,tte=l(()=>{"use strict";Qee();ete=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:He(t)}});var iN,kg,ln,aN,ho,rte,Mb=l(()=>{"use strict";iN=new Set,kg=new Map,ln=(e,t)=>{if(t.length===0)return;let r=kg.get(e)??[];r.push(t),kg.set(e,r)},aN=e=>{iN.add(e);let t=kg.get(e)??[];return kg.delete(e),t},ho=e=>iN.has(e),rte=e=>{iN.delete(e),kg.delete(e)}});var ote,nte=l(()=>{"use strict";ote=e=>e==null||!Number.isFinite(e)||e<=0?null:{limitSeconds:Math.floor(e)}});var ste,lN,Nb,ite,wg,q_e,ate,J_e,lte,cN=l(()=>{"use strict";nte();By();ste=ote($d.maxMinutes*60)??{limitSeconds:1800},lN=5e3,Nb=new Map,ite=(e,t,r=ste)=>{wg(e);let o=setTimeout(()=>{Nb.delete(e),t()},r.limitSeconds*1e3);o.unref?.(),Nb.set(e,o)},wg=e=>{let t=Nb.get(e);t!==void 0&&(clearTimeout(t),Nb.delete(e))},q_e=(e=ste)=>`You've hit your session limit on this computer: the run was stopped after ${Math.round(e.limitSeconds/60)} minutes.`,ate=e=>{let t=q_e(),r=e.trim();return r.length>0?`${r}

${t}`:t},J_e=e=>e.exitCode===null&&e.signalCode===null,lte=(e,t=lN)=>{let r=n=>{let s=e.pid;if(typeof s=="number"&&process.platform!=="win32")try{process.kill(-s,n);return}catch{}try{e.kill(n)}catch{}};r("SIGTERM"),setTimeout(()=>{J_e(e)&&r("SIGKILL")},t).unref?.()}});var wc,cte,dte,ute=l(()=>{"use strict";wc=p(require("node:path")),cte=require("node:url");_s();dte=()=>{if(Ht()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?wc.default.dirname(wc.default.resolve(e)):wc.default.dirname(wc.default.resolve(__filename))}return wc.default.dirname((0,cte.fileURLToPath)(__agentWitchImportMetaUrl))}});var pte,mte,gte,fte,Wt,Ec,yte,hte,Tc,dN,uN,pN,Ste,mN,Pte,Db=l(()=>{"use strict";pte=require("node:crypto"),mte=p(require("node:fs")),gte=p(require("node:path")),fte=require("node:url");Ca();cN();_s();ute();Wt=new Map,yte=async()=>{if(Ec!==void 0)return Ec;try{if(Ht()){let e=dte(),t=gte.default.join(e,"deps","node-pty","lib","index.js");if(mte.default.existsSync(t)){let r=await import((0,fte.pathToFileURL)(t).href);return Ec=r,r}}return Ec=await import("node-pty"),Ec}catch{return Ec=null,null}},hte=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Tc=(e,t,r)=>{let o=Wt.get(e);if(o!==void 0){Wt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},dN=(e,t)=>{let r=Wt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},uN=(e,t,r)=>{let o=Wt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},pN=e=>{for(let t of Wt.values())if(!(t.mode!=="agent"||t.runId!==e))return Zt(t.pty.pid);return!1},Ste=e=>{for(let[t,r]of Wt.entries()){if(r.mode!=="agent"||r.runId!==e)continue;Wt.delete(t);let o=r.pty.pid;try{r.pty.kill()}catch{}return setTimeout(()=>{if(Zt(o))try{process.kill(o,"SIGKILL")}catch{}},lN).unref(),!0}return!1},mN=async e=>{let t=await yte();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this computer. Install AgentWitch deps again.\r
`},requestId:e.requestId}),!1;Wt.get(e.shellSessionId)!==void 0&&Tc(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Wt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{hte(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Wt.get(e.shellSessionId)?.pty===n&&(Wt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Pte=async e=>{let t=e.shellSessionId??(0,pte.randomUUID)(),r=await yte();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Wt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{hte(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Wt.get(t)?.pty===o&&(Wt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Hb,Ate,_te=l(()=>{"use strict";Hb="[[AWAITING_INPUT]]",Ate=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Hb,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Eg,bte,Fb=l(()=>{"use strict";_te();Eg=e=>{let t=e.indexOf(Hb);if(t<0)return null;let o=e.slice(t+Hb.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},bte=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Ate].join(`
`)});var Rte,kte=l(()=>{"use strict";Mb();Db();Fb();Rte=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(ho(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}ln(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Pte({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Eg(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var Ete,Tte,Cte,wte,cn,$b=l(()=>{"use strict";Ete=require("node:child_process"),Tte=p(require("node:fs")),Cte=p(require("node:path"));py();wte=12e4,cn=(e,t)=>{let r=Cte.default.join(e,"app",qF,"ensure-writer.sh");return Tte.default.existsSync(r)?new Promise((o,n)=>{let s=(0,Ete.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(wte/1e3)}s`))},wte);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var Ite,ra,Cg,zb,gN,Tg,Ub,Bb,fN,yN,Y_e,Cc,X_e,Z_e,hN,SN=l(()=>{"use strict";Ite=require("node:child_process");Pr();$b();vb();Lb();Sg();xb();ra=new Map,Cg=e=>e==="cursor"||e==="antigravity",zb=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",gN=e=>ra.get(e)?.warmed===!0,Tg=e=>{let t=ra.get(e);ra.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Ub=e=>ra.get(e)?.conversationStarted===!0,Bb=e=>{let t=ra.get(e);ra.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},fN=e=>{ra.delete(e)},yN=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Y_e={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Cc=e=>`${Y_e[e]} is ready on your computer.
Send a task from the box below when you are ready.
`,X_e=(e,t,r,o)=>new Promise(n=>{let s=Ky(t,r),i=[],a=(0,Ite.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Z_e=(e,t)=>{let r=Cc(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},hN=async e=>{if(!De(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&ut(e.runConfig.writerExecutionBackend)==="api"){let r=Ft(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=ot(e.runConfig.layout.configPath);return Et(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this computer (no local CLI).
`),Tg(e.writerAgent),{exitCode:0,output:Cc(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your computer\u2026
`),await cn(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Cg(e.writerAgent)&&Tg(e.writerAgent);let t=await X_e(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Z_e(e.writerAgent,t.output):Cc(e.writerAgent)}}});var Ic,Lte=l(()=>{"use strict";Ic={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var vte,xte=l(()=>{"use strict";vte="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var Wte,Ote=l(()=>{"use strict";St();xte();Wte=e=>e.code===Ws.SESSION_LIMIT?vte:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var Q_e,jte,ebe,tbe,Mte,rbe,Nte,Dte=l(()=>{"use strict";Q_e=/\bauto-?denied\b/i,jte=/\bno output produced\b/i,ebe=/headless mode cannot prompt for.*\bcommand\b.*permission/i,tbe=/\bpermissions\.allow\b/i,Mte=/\bjetski:\s*no output produced\b/i,rbe=e=>{let t=e.trim();return t.length===0?!1:Mte.test(t)||jte.test(t)&&(Q_e.test(t)||ebe.test(t)||tbe.test(t))},Nte=e=>{if(rbe(e)){let t=e.split(/\r?\n/).map(r=>r.trim()).find(r=>r.length>0&&(Mte.test(r)||jte.test(r)))??e.trim();return t.length>0?t:"Antigravity headless run auto-denied a tool that needs command permission."}return null}});var Hte,Fte=l(()=>{"use strict";St();Lte();Ote();Dte();Hte=e=>{let t=Aw(e.output);if(t!==null)return{status:Ic.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:Wte(t)};let r=Nte(e.output);return r!==null?{status:Ic.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:null,denialReason:r}:e.exitCode===0&&e.output.trim().length===0?{status:Ic.FAILED,resultExitCode:1,resultOutcomeCode:null,denialReason:"No agent output was captured."}:{status:e.exitCode===0?Ic.COMPLETED:Ic.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var PN,VSt,$te=l(()=>{"use strict";PN={OPEN:"open",APPROVAL:"approval"},VSt=PN.APPROVAL});var So,Ig=l(()=>{"use strict";So=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Lc,Gb,zte,obe,Ute,Bte,Gte,vc,AN,_N=l(()=>{"use strict";Lc=p(require("node:fs")),Gb=p(require("node:path")),zte="runs",obe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ute=e=>{let t=e.profileEmail!==null?Gb.default.join(e.installDir,"profiles",e.profileEmail,zte):Gb.default.join(e.installDir,zte);return Lc.default.mkdirSync(t,{recursive:!0}),t},Bte=(e,t)=>Gb.default.join(Ute(e),`${t}.json`),Gte=(e,t)=>{Lc.default.writeFileSync(Bte(e,t.id),JSON.stringify(t,null,2))},vc=(e,t)=>{let r=Bte(e,t);if(!Lc.default.existsSync(r))return null;try{let o=JSON.parse(Lc.default.readFileSync(r,"utf8"));return!obe(o)||typeof o.id!="string"?null:o}catch{return null}},AN=e=>{let t=Ute(e),r=Lc.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=vc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var nbe,Kte,Vte=l(()=>{"use strict";lb();Fte();$te();Ig();_N();nbe=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=Hte({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:PN.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},Kte=(e,t)=>{let r=nbe(t);Gte(e,r);let o=t.projectId?.trim()??"";if(o.length>0){let n=So(t.originalPrompt);rg({projectId:o,taskId:t.agentRunId,agentRunId:t.agentRunId,status:r.status,promptSummary:n,resultSummary:t.output,createdAt:r.createdAt,completedAt:r.completedAt,writerAgent:t.writerAgent??null,threadKey:null})}return r}});var qte=l(()=>{"use strict";m_()});var Jte,Yte=l(()=>{"use strict";St();Jte=()=>[zy,`agentRunWriterExecutionBackend=${Uy}`,`agentRunWriterExecutionReasonCode=${_w}`].join(`
`)});var bN,sbe,ibe,Xte,Zte=l(()=>{"use strict";bN=e=>e.toLocaleString("en-US"),sbe=e=>e<.01?e.toFixed(4):e.toFixed(3),ibe=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${sbe(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${bN(e.inputTokens)} in / ${bN(e.outputTokens)} out (${bN(e.totalTokens)} total)`,t].join(`
`)},Xte=(e,t)=>{if(t===void 0)return e;let r=ibe(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Qte=l(()=>{"use strict";oe()});var rre,Lg,Ie,Kb,RN,Vb,ere,tre,abe,lbe,ore,nre,sre,vg,kN,wN,EN,ire,cbe,mr,xg,dn,are,dbe,ube,qb,TN,CN,Wg,pbe,IN,lre=l(()=>{"use strict";rre=require("node:child_process");oe();St();Pr();Gw();Nee();ym();YM();$ee();Bd();eN();Ob();jb();Zee();Ca();tte();Mb();Db();Fb();kte();cN();By();SN();Vte();qte();Yte();Ig();Zte();La();Qte();Sg();yd();Fb();Lg=new Map,Ie=new Map,Kb=new Set,RN=new Set,Vb=new Map,ere=ou(),tre=e=>{e!==void 0&&!Vb.has(e)&&Vb.set(e,Date.now())},abe=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(ho(t)){mr(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}ln(t,n)},lbe=(e,t,r,o,n)=>{if(!pE(e,n))return;let s=`${Jte()}
`;abe(t,r,o,s);let i=Ie.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},ore=130,nre=`

Stopped by user.`,sre=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:So(e)},vg=null,kN=e=>{vg=e},wN=(e,t)=>{if(vg===null)return;let r=yW(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||gT(vg,t,r)},EN=async e=>{await nN({layout:e,cloudApi:vg})},ire=e=>{let t=Lg.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Zt(t.pid)},cbe=e=>we({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),mr=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(qr(t)))},xg=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Sa(s),c=Ie.get(r);if(a!==null&&c!==void 0){let d=n$(a),u=ire(r)||pN(r);d!==null&&!u&&dn(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return o$(a)}}),dn=(e,t,r,o,n,s,i,a,c)=>{if(r!==void 0){if(ere.has(r))return;ere.add(r)}let d=Ha(s,a),u=n,m=Xte(d.output,d.llmUsage);if(r!==void 0){let y=Vb.get(r);Vb.delete(r),y!==void 0&&gW({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-y)/1e3))});let h=Fee(d.llmUsage,m);h!==null&&P7({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&wg(r),r!==void 0&&RN.has(r)?(RN.delete(r),Kb.delete(r),u=rz,m=ate(m.replace(/\n*Stopped by user\.$/,""))):r!==void 0&&Kb.has(r)&&(Kb.delete(r),u=ore,m=m.trim().length>0&&!m.includes("Stopped by user.")?`${m.trim()}${nre}`:"Stopped by user."),m=An(m).scrubbed;let g=r!==void 0?yW(e.layout.reportsDir,r):null;if(r!==void 0){Rg(r),eu(e.layout,r);let y=ho(r);y&&(mr(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),rte(r));let h=Ie.get(r);y7({reportsDir:e.layout.reportsDir,agentRunId:r,input:So(i),output:m,...h!==void 0?{writerLabel:Pg({writerAgent:h.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),h!==void 0&&u_({layout:e.layout,writerAgent:h.writerAgent,projectFolderPath:h.projectFolderPath,userPrompt:h.userTranscriptPrompt,assistantOutput:m,agentRunId:r}),Kte(e.layout,{agentRunId:r,originalPrompt:i,exitCode:u,output:m,layout:e.layout,...h!==void 0&&h.projectId!==void 0&&h.projectId.trim().length>0?{projectId:h.projectId.trim()}:{},...h!==void 0?{writerAgent:h.writerAgent}:{}}),Yee(e.layout,{runId:r,exitCode:u,output:m,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),nN({layout:e.layout,cloudApi:vg});let S={type:"command.claude.result",payload:{exitCode:u,output:m,agentRunId:r,...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{},...c!==void 0?{errorCode:c}:{}},...o!==void 0?{requestId:o}:{}};Bee(e.layout,{runId:r,resultMessage:S,...y?{terminalEndMessage:{type:"terminal.stream.end",payload:{runId:r},...o!==void 0?{requestId:o}:{}}}:{},createdAt:new Date().toISOString()}),Ie.delete(r),Lg.delete(r),Ib(e.layout,r)}mr(t,{type:"command.claude.result",payload:{exitCode:u,output:m,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{},...c!==void 0?{errorCode:c}:{}},requestId:o}),Id(e.layout)},are=(e,t,r,o,n,s,i)=>{let a=Ie.get(r),c=a?.accumulatedOutput??s;wg(r),Mee(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),ta(t,r,()=>JM(e.layout,r),xg(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),mr(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},dbe=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=y=>{if(!(n===void 0||y.length===0)){if(ho(n)){mr(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:y},requestId:o});return}ln(n,y)}};if(n!==void 0){let y=Ie.get(n);Lg.set(n,t),Ie.set(n,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,projectId:y?.projectId,accumulatedOutput:y?.accumulatedOutput??""}),mr(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),ta(r,n,()=>ire(n),xg(e,r,n,o,y?.projectFolderPath,y?.reportKey))}let m=a==="claude-cli",g=[];t.stdout?.on("data",y=>{let h=y.toString("utf8");if(m?g.push(h):(c.push(h),u(h)),d||n===void 0)return;let S=Eg(c.join(""));if(S!==null){d=!0,t.kill("SIGTERM");let w=Ie.get(n),I=[w?.accumulatedOutput??"",S.partialOutput].filter(f=>f.length>0).join(`

`);w!==void 0&&(w.accumulatedOutput=I),Lg.delete(n),are(e,r,n,o,S.question,I,s)}}),t.stderr?.on("data",y=>{let h=y.toString("utf8");c.push(h),u(h)}),t.on("close",y=>{if(d)return;Bb(a);let h=n!==void 0?Ie.get(n):void 0,S=m?Ha(g.join("")):{output:c.join("").trim(),llmUsage:void 0},w=m?c.join("").trim():"",I=[S.output.trim(),w].filter(k=>k.length>0).join(`
`);m&&S.output.trim().length>0&&u(S.output);let f=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${I}`.trim():I;dn(e,r,n,o,y??-1,f,s,S.llmUsage)}),t.on("error",y=>{d||dn(e,r,n,o,-1,y.message,s)})},ube=(e,t,r,o,n,s,i,a,c,d)=>{let u=sre(r,c);s!==void 0&&(Ie.set(s,{originalPrompt:r,userTranscriptPrompt:u,writerAgent:t,projectFolderPath:i,reportKey:a,projectId:d,accumulatedOutput:""}),mr(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),ta(n,s,()=>Ie.has(s),xg(e,n,s,o,i,a))),qd(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(ho(s)){mr(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}ln(s,g)}}).then(g=>{Bb(t),dn(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let y=g instanceof Error?g.message:String(g);dn(e,n,s,o,-1,y,r)})},qb=(e,t,r,o,n,s,i,a,c,d,u,m,g)=>{let y=sre(r,u);Cd(e.layout);let h=f=>{dn(e,n,s,o,-1,js(f),r,void 0,f)};if(wo(e.layout.configPath)){h(pe.CODING_TOOLS_PAUSED);return}if(Ds(e,t)){tre(s),ube(e,t,r,o,n,s,c,d,y,g);return}let S=er(t,r,cbe(e),i);if(S===null){dn(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}if(c===void 0||c.trim().length===0){h(pe.FOLDER_REQUIRED);return}tre(s);let w=ete({workspace:e.workspace,projectFolderPath:c}),I=()=>{rh(t);let f=(0,rre.spawn)(S.command,[...S.args],{cwd:w,stdio:["ignore","pipe","pipe"],env:m??process.env,detached:process.platform!=="win32"});dbe(e,f,n,o,s,r,y,t)};if(s===void 0){I();return}ite(s,()=>{pbe(e,n,s,o)}),Ie.set(s,{originalPrompt:r,userTranscriptPrompt:y,writerAgent:t,projectFolderPath:c,reportKey:d,projectId:g??Ie.get(s)?.projectId,accumulatedOutput:Ie.get(s)?.accumulatedOutput??""}),lbe(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&fd({reportKey:d,agentRunId:s,userSummary:"Task started on your computer."}),ta(n,s,()=>Ie.has(s),xg(e,n,s,o,c,d)),Rte({socket:n,sendMessage:mr,requestId:o,agentRunId:s,shellSessionId:a,command:S.command,args:S.args,cwd:w,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:f=>{a!==void 0&&Tc(a,_=>{mr(n,_)},o);let k=Ie.get(s),M=[k?.accumulatedOutput??"",f.partialOutput].filter(_=>_.length>0).join(`

`);k!==void 0&&(k.accumulatedOutput=M),are(e,n,s,o,f.question,M,r)},onFinished:(f,k)=>{Bb(t);let M=Ha(k),_=Ie.get(s),W=_!==void 0&&_.accumulatedOutput.length>0?`${_.accumulatedOutput}

${M.output}`.trim():M.output;dn(e,n,s,o,f,W,r,M.llmUsage)}}).then(f=>{if(!f){I();return}ta(n,s,()=>pN(s),xg(e,n,s,o,c,d))}).catch(f=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",f instanceof Error?f.message:f),I()})},TN=(e,t,r,o)=>{Ib(e.layout,t.agentRunId),t.shellSessionId!==void 0&&mr(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=bte(t),s=Ie.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;qb(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt,void 0,s?.projectId)},CN=(e,t)=>{for(let r of jee(e.layout))Ie.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:So(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),ta(t,r.agentRunId,()=>JM(e.layout,r.agentRunId),{awaitingInput:!0}),mr(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Wg=(e,t,r,o)=>{let n=Ie.get(r);if(n===void 0)return!1;Kb.add(r),Rg(r),wg(r);let s=Lg.get(r);if(s!==void 0)return lte(s),!0;if(Ste(r))return!0;Ib(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${nre}`:"Stopped by user.";return dn(e,t,r,o,ore,i,n.originalPrompt),!0},pbe=(e,t,r,o)=>Ie.has(r)?(RN.add(r),Wg(e,t,r,o)):!1,IN=(e,t)=>[...Ie.keys()].filter(r=>Wg(e,t,r)).length});var mbe,LN,cre=l(()=>{"use strict";au();mbe=()=>`http://127.0.0.1:${Ar()}/restart`,LN=async()=>{try{let e=await fetch(mbe(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var dre=l(()=>{"use strict";ep()});var ure=l(()=>{"use strict";ZW()});var vN,pre=l(()=>{"use strict";vN=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Og,gbe,xN,WN,mre=l(()=>{"use strict";Z();Ae();dre();dI();ure();pre();La();Og=(e,t)=>{On(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},gbe=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(gw(),mw)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},xN=e=>vN({localBundleVersion:ze(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),WN=async e=>{let t=ze(e.layout.installDir)?.bundleVersion??null;if(!vN({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Qt(e.layout)){Ld({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Og(e.layout,{summary:r,action:"install-bundle-update-start"}),_o({launchAgentLabel:Le(e.layout.installDir),installDir:e.layout.installDir});let o=await tc({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Og(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await gbe();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Og(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Og(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Og(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var fbe,ON,gre=l(()=>{"use strict";fbe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ON=e=>{if(!fbe(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var jN,MN,fre=l(()=>{"use strict";HC();FC();jN=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Du({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},MN=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Do(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var yre,ybe,hbe,Sbe,xc,hre=l(()=>{"use strict";yre=p(require("node:os"));dt();ybe="Default",hbe=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),Sbe=e=>{let t=yre.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},xc=()=>{let e=z(),t=Qc(e),r=hbe(ybe);return`${Sbe(t)}/${r.length>0?r:"project"}`}});var Sre=l(()=>{"use strict";ep()});var Pre,NN,Are=l(()=>{"use strict";Sre();Pre=!1,NN=e=>{Pre||(Pre=!0,process.on("uncaughtException",t=>{li(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;li(e,{kind:"crash",message:r,stack:o})}))}});var _re,Pbe,DN,bre=l(()=>{"use strict";_re=require("node:child_process");$b();Pr();vb();Lb();Sg();xb();Pbe=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,_re.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},DN=async e=>{if(!De(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&ut(e.runConfig.writerExecutionBackend)==="api"){let r=Ft(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=ot(e.layout.configPath),n=Et(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.`}}}try{await cn(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await Pbe(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var HN,Rre=l(()=>{"use strict";HN=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var kre,FN,wre=l(()=>{"use strict";kre=require("node:crypto"),FN=()=>(0,kre.randomUUID)()});var Wc,Ere,Jb=l(()=>{"use strict";Wc="[[WORKING_ESTIMATE]]",Ere=(e,t,r,o="")=>["Estimate how long the following task will take on this computer, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Wc,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Tre,Cre=l(()=>{"use strict";Tre=e=>e===null||e<=0?"Estimate saved locally. Starting work on your computer\u2026":e<60?`Estimated ~${e}s. Starting work on your computer\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your computer\u2026`});var Abe,Ire,Lre=l(()=>{"use strict";Jb();Abe=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,Ire=e=>{if(!e.includes(Wc))return null;let t=null;for(let r of e.matchAll(Abe)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var _be,$N,vre=l(()=>{"use strict";Lre();_be=/^(\d{1,6})\b/,$N=e=>{let t=Ire(e);if(t!==null)return t;let r=_be.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var bbe,Rbe,kbe,Yb,zN=l(()=>{"use strict";Pr();Zu();bbe="http://127.0.0.1:11434",Rbe=45e3,kbe=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Yb=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||bbe,o=t===void 0?(await Tr({commands:we({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(Rbe)});return n.ok?kbe(await n.json()):null}catch{return null}}});var UN,BN,GN,xre=l(()=>{"use strict";yd();Jb();Ig();Cre();vre();ym();zN();UN=async e=>{let t=So(e.wrappedPrompt),r=h7(e.reportsDir);return{estimateOutput:await Yb(Ere(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},BN=e=>{let t=$N(e.estimateOutput);t!==null&&n_({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},GN=e=>{let t=$N(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=Tre(t);return gd({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Br.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),n_({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Xb,Wre,KN=l(()=>{"use strict";Xb="[[WORKING_TOKEN_ESTIMATE]]",Wre=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this computer.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Xb,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Ore,wbe,jre,Mre=l(()=>{"use strict";KN();Ore=/^(\d{1,8})\b/,wbe=e=>{let t=e.indexOf(Xb);if(t<0)return null;let r=e.slice(t+Xb.length).trim(),o=Ore.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},jre=e=>{let t=wbe(e);if(t!==null)return t;let r=Ore.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var VN,qN,Nre=l(()=>{"use strict";KN();Ig();Mre();ym();zN();VN=async e=>{let t=So(e.wrappedPrompt),r=A7(e.reportsDir);return{estimateOutput:await Yb(Wre(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},qN=e=>{let t=jre(e.estimateOutput);return t===null?null:(S7({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var Dre=l(()=>{"use strict";BM();wee();Tee();vee();au();lre();$b();Pr();_N();Mb();cre();QC();mre();La();gre();fre();jb();hre();Are();bre();my();Rre();wre();Jb();yd();xre();Nre();YM();Zu();Db();SN();cw();Ob()});var Hre={};Mt(Hre,{buildContinuationPromptWithContext:()=>Cbe});var Ebe,Tbe,Cbe,Fre=l(()=>{"use strict";Ebe=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Tbe=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Cbe=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=Tbe(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${Ebe(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var $re={};Mt($re,{readHarnessExportSets:()=>Lbe});var jg,JN,Zb,Ibe,Lbe,zre=l(()=>{"use strict";jg=p(require("node:fs")),JN=p(require("node:path"));dt();Zb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ibe=e=>{if(!jg.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(jg.default.readFileSync(e.harnessManifestPath,"utf8"));if(Zb(t))return t}catch{return null}return null},Lbe=(e,t)=>{let r=z(t),o=Ibe(r);if(o===null)return[];let n=Zb(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Zb(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!Zb(u))continue;let m=typeof u.path=="string"?u.path:void 0,g=typeof u.id=="string"?u.id:"",y=typeof u.kind=="string"?u.kind:"",h=typeof u.title=="string"?u.title:"";if(m===void 0||g.length===0||y.length===0||h.length===0)continue;let S=m.startsWith("shared/")?JN.default.join(r.harnessRootDir,m):JN.default.join(r.harnessSetsDir,i,m);jg.default.existsSync(S)&&d.push({id:g,kind:y,title:h,content:jg.default.readFileSync(S,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var oD,QN,Oc,Ure,vbe,Bre,Gre,YN,XN,Kre,eD,tD,rD,Vre,ZN,fe,re,Qb,xbe,Mg,Wbe,Obe,jbe,Mbe,Nbe,Dbe,Hbe,Fbe,Ng,qre=l(()=>{"use strict";oD=require("node:child_process"),QN=p(require("node:fs")),Oc=p(require("node:os"));gee();Z();Ae();xs();pM();See();oe();lb();oe();Kr();ep();RL();pb();m_();_t();Tn();AI();fr();St();Aee();Dre();Ure=3e4,vbe=3e4,Bre=new Map,Gre=new Map,YN=new Map,XN=new Map,Kre=e=>{try{rg({projectId:e.projectId,taskId:e.agentRunId,agentRunId:e.agentRunId,status:e.status,...e.promptBody!==void 0?{promptBody:e.promptBody}:{},...e.resultBody!==void 0?{resultBody:e.resultBody}:{},...typeof e.writerAgent=="string"?{writerAgent:e.writerAgent}:{},...e.completedAt!==void 0?{completedAt:e.completedAt}:{completedAt:null}})}catch{}},eD=new Map,tD=new Map,rD=new Map,Vre=ou(),ZN=new Set,fe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),re=(e,t,r)=>{if(e.readyState===Rc.OPEN){let o=qr(t);e.send(JSON.stringify(o)),r!==void 0&&(On(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),pP(r,"out",o))}},Qb=e=>e,xbe=e=>{if(!QN.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(QN.default.readFileSync(e.harnessManifestPath,"utf8"));if(fe(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Mg=(e,t)=>{let r=xbe(t);r!==null&&re(e,{type:"harness.manifest.report",payload:{hostname:Oc.default.hostname(),manifest:r}})},Wbe=async(e,t,r,o,n,s,i=!1,a,c,d,u,m)=>{let g=m?.trim()??"";if(!De(t)){re(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let y=Pg({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),h=await Tr({commands:we({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),S=s!==void 0?UN({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:h?.estimateModel,capabilityNote:h?.capabilityNote}).catch(()=>null):null,w=s!==void 0?VN({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:h?.estimateModel,capabilityNote:h?.capabilityNote}).catch(()=>null):null,I=Cg(t)&&!gN(t);if(I){try{await cn(e.layout.installDir,t)}catch(R){let v=R instanceof Error?R.message:String(R);re(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${v}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Tg(t)}else if(!Cg(t))try{await cn(e.layout.installDir,t)}catch(R){let v=R instanceof Error?R.message:String(R);re(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${v}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Zd(d,xc,m);if(f===null){re(n,nu({code:pe.FOLDER_REQUIRED,...s!==void 0?{agentRunId:s}:{},...o!==void 0?{requestId:o}:{}}));return}$t({projectFolderPath:f,...g.length>0?{projectId:g}:{}}),i||_m(e.layout,t,f);let k=typeof c=="string"&&c.trim().length>0,M=p_({sessionContinuation:i,supportsWriterSessionContinuation:zb(t),isWriterConversationStarted:Ub(t),hasSourceRunId:k}),_=i&&M==="first"?Am(e.layout,t,f):null,W=_!==null?Ql(e.layout,_):null,O=W!==null&&W.turns.length>0,b=vW({sessionContinuation:i,supportsWriterSessionContinuation:zb(t),isWriterConversationStarted:Ub(t),hasSourceRunId:k,hasCanonicalTurns:O,userPromptCharacterCount:r.length}),P=r;if(b.continuationStrategy==="source_run_seed"){let R=typeof c=="string"&&c.length>0?vc(e.layout,c):null;if(R!==null){let{buildContinuationPromptWithContext:v}=await Promise.resolve().then(()=>(Fre(),Hre));P=v({priorPrompt:R.prompt,priorOutput:R.resultOutput??"",userMessage:r})}}else b.continuationStrategy==="transcript_seed"&&W!==null&&W.turns.length>0&&(P=a_({priorTurns:W.turns,userMessage:r}));let C=b.ragLimit>0?await kl({layout:e.layout,query:P,limit:b.ragLimit,minScore:b.ragMinScore,projectFolderPath:f,...g.length>0?{projectId:g}:{}}):[],L=b.ragLimit>0&&f.trim().length>0?await _L({layout:e.layout,query:P,limit:2,minScore:.32,projectFolderPath:f,...g.length>0?{projectId:g}:{}}):[],be=b.injectMemory?_W(e.layout,f,g.length>0?g:void 0):[],te=`${RW(be,b.memoryEntryLimit)}${SL(C)}${bL(L)}${P}`,de=u?.trim()??(s!==void 0&&f.trim().length>0?FN():void 0);if(s!==void 0&&de!==void 0&&de.length>0&&f.trim().length>0){fd({reportKey:de,agentRunId:s,userSummary:"Working on your computer\u2026"});let R=te;S!==null&&S.then(v=>{if(v===null)return;let D=GN({estimateOutput:v.estimateOutput??"",reportKey:de,agentRunId:s,reportsDir:e.layout.reportsDir,task:v.task,writerLabel:v.writerLabel,embedding:v.embedding});if(D.estimateSeconds===null)return;wN(e.layout.reportsDir,s);let H=`${Wc}
${D.estimateSeconds}
`;if(ho(s)){re(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:H},requestId:o});return}ln(s,H)}).catch(()=>{}),te=HN(R),te=kk(te,{agentRunId:s,reportKey:de,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&S!==null&&S.then(R=>{R!==null&&BN({estimateOutput:R.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:R.task,writerLabel:R.writerLabel,embedding:R.embedding})}).catch(()=>{}),s!==void 0&&w!==null&&w.then(R=>{R!==null&&qN({estimateOutput:R.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:R.task,writerLabel:R.writerLabel})}).catch(()=>{});let E=s!==void 0&&rD.get(s)===!0;if(s!==void 0&&f.trim().length>0){let R=await sS(f);tD.set(s,R),de!==void 0&&de.length>0&&eD.set(s,de)}qb(e,t,te,o,Qb(n),s,{sessionTurn:b.sessionTurn},a,f,de,r,aE(e.layout,s,E),g.length>0?g:void 0),I&&s!==void 0&&re(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:yN(t)},requestId:o})},Obe=async(e,t,r,o,n)=>{let s=(i,a)=>{re(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await hN({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:we({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,re(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=De(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Cc(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},jbe=(e,t,r)=>new Promise(o=>{if(!De(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=er(t,r,we({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,oD.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),Mbe=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;re(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Xr(t.bundle),s=fe(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=et(e.wsUrl)??Nt,m=await JE({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return re(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Us({bundle:i,layout:e.layout});return re(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Mg(o,e.layout),!0},Nbe=async(e,t,r,o)=>{if(await Mbe(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(re(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){re(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!De(n)){re(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}if(wo(e.layout.configPath)){re(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorCode:pe.CODING_TOOLS_PAUSED,errorMessage:nu({code:pe.CODING_TOOLS_PAUSED}).payload.output},requestId:r});return}Cd(e.layout);let i=await(async()=>{try{await cn(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return jbe(e,n,s)})().finally(()=>{Id(e.layout)});re(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Mg(o,e.layout)},Dbe=e=>{let t=1e3*2**e;return Math.min(vbe,t)},Hbe=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=f=>t.restartInFlight?"already_in_progress":Qt(e.layout)?(Ia(f),console.log(`[agent-witch] Deferring local restart (${f}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${f})\u2026`),t.wakeError=`restart:${f}`,LN().then(k=>{if(k.ok){console.log("[agent-witch] Local restart completed.");return}if(!k.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",k.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=f=>{if(t.restartInFlight)return"already_in_progress";if(Qt(e.layout))return Ia(f),console.log(`[agent-witch] Deferring host restart (${f}) until the active writer task finishes.`),"deferred_writer_busy";let k=ze(e.layout.installDir)?.bundleVersion??"unknown";return t.restartInFlight=!0,console.log(`[agent-witch] Host restart into updated bundle requested (${f})\u2026`),xd({installDir:e.layout.installDir,bundleVersion:k}).then(M=>{M.ok||(t.wakeError=M.message,console.error(`[agent-witch] Host restart after bundle update failed: ${M.message}`))}).finally(()=>{t.restartInFlight=!1}),"accepted"},n=(f,k,M,_)=>{re(f,{type:"device.restart.ack",payload:yE({status:M,reason:k}),..._!==void 0?{requestId:_}:{}},e.layout)},s=(f,k="system.ack")=>{if(!t.selfUpdateInFlight&&xN({installDir:e.layout.installDir,remoteBundleVersion:f})){if(Qt(e.layout)){Ld({layout:e.layout,remoteBundleVersion:f,trigger:k}),console.log(`[agent-witch] Deferring install bundle update (${f} via ${k}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,WN({layout:e.layout,remoteBundleVersion:f,trigger:k}).finally(()=>{t.selfUpdateInFlight=!1})}},i=()=>{let f=Ue(e.layout);f!==null&&tt(f,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,d(),u(),S())},a=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},c=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},d=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},u=()=>{if(t.socket===void 0)return;let f=t.socket;t.socket=void 0,t.wsConnected=!1,f.removeAllListeners("open"),f.removeAllListeners("message"),f.removeAllListeners("close"),f.on("error",()=>{}),(f.readyState===Rc.OPEN||f.readyState===Rc.CONNECTING)&&f.close()},m=()=>{c(),t.localHealthTimer=setInterval(i,Ure)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let f=Dbe(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${f}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,S()},f)},y=f=>{a();let k=()=>{let M=wd(e.layout.installDir),_=Ar();re(f,{type:"agent.heartbeat",payload:{hostname:Oc.default.hostname(),macOsUsername:Oc.default.userInfo().username,wakeError:t.wakeError,wakePort:_,...e.email!==null?{email:e.email}:{},installBundleVersion:M}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};k(),t.heartbeatTimer=setInterval(k,Ure)},h=(f,k)=>{if(typeof f.type!="string")return;if(PI(f)){t.stopped=!0,a(),d(),u(),yI({layout:e.layout}).finally(()=>{mg(),process.exit(0)});return}On(e.layout,{direction:"in",type:f.type,summary:"inbound WS frame"}),pP(e.layout,"in",f);let M=typeof f.requestId=="string"?f.requestId:void 0;if(f.type==="device.auth.attestation"&&fe(f.payload)){let _=typeof f.payload.serverPublicKey=="string"?f.payload.serverPublicKey:"",W=typeof f.payload.origin=="string"?f.payload.origin:"",O=typeof f.payload.devicePublicKey=="string"?f.payload.devicePublicKey:"",b=typeof f.payload.challenge=="string"?f.payload.challenge:"",P=typeof f.payload.serverAttestation=="string"?f.payload.serverAttestation:"";if(!uM({serverPublicKey:_,origin:W,devicePublicKey:O,challenge:b,serverAttestation:P})){t.wakeError="Server attestation verification failed",On(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(f.type==="writer.ensure"&&fe(f.payload)){let _=typeof f.payload.writerAgent=="string"?f.payload.writerAgent:"";On(e.layout,{direction:"local",type:"writer.ensure",summary:_,action:"ensure-writer"}),DN({layout:e.layout,writerAgent:_,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(W=>{re(k,{type:"writer.status",payload:W},e.layout)})}if(f.type==="install.bundle.update"&&fe(f.payload)){let _=typeof f.payload.bundleVersion=="string"?f.payload.bundleVersion.trim():"";_.length>0&&s(_,"install.bundle.update")}if(f.type==="system.ack"){Hy(e.layout,{wsUrl:e.wsUrl});let _=fe(f.payload)?f.payload:null,W=ON(_);W!==null&&s(W)}if(f.type==="device.restart"){let _=r("cloud-device-restart");n(k,"cloud-device-restart",_,M)}if(f.type==="automations.sync"&&fe(f.payload)&&jN(f.payload),f.type==="project.message.history"&&fe(f.payload)){oO({payload:f.payload});return}if(f.type==="project.history.page.request"&&fe(f.payload)){let _=AO({payload:f.payload});re(k,{type:"project.history.page.result",payload:_,requestId:M});return}if(f.type==="automations.run"&&fe(f.payload)&&MN(f.payload),f.type==="terminal.stream.accepted"&&fe(f.payload)){let _=typeof f.payload.runId=="string"?f.payload.runId:"";if(_.length>0){let W=aN(_);for(let O of W)re(k,{type:"terminal.stream.chunk",payload:{runId:_,chunk:O},requestId:M})}}if(f.type==="agent.agentRun.list"&&re(k,{type:"dashboard.agentRun.list.result",payload:{runs:AN(e.layout)},requestId:M}),f.type==="agent.agentRun.get"&&fe(f.payload)){let _=typeof f.payload.runId=="string"?f.payload.runId:"",W=_.length>0?vc(e.layout,_):null;re(k,{type:"dashboard.agentRun.get.result",payload:{run:W},requestId:M})}if(f.type==="command.claude.run"&&fe(f.payload)){let _=f.payload.prompt,W=typeof f.payload.writerAgent=="string"&&De(f.payload.writerAgent)?f.payload.writerAgent:"claude-cli",O=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:void 0,b=f.payload.sessionContinuation===!0,P=typeof f.payload.sourceRunId=="string"?f.payload.sourceRunId:void 0,C=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:void 0,L=typeof f.payload.projectId=="string"?f.payload.projectId:void 0,be=Zd(typeof f.payload.projectFolderPath=="string"?f.payload.projectFolderPath:void 0,xc,L),te=eE(f.payload.compositionSnapshot),de=typeof f.payload.reportKey=="string"?f.payload.reportKey:void 0;if(typeof _=="string"&&_.trim().length>0){if(console.log(`[agent-witch] Running ${W} task (${b?"continue":"first"})\u2026`),O!==void 0&&(Vre.has(O)||ZN.has(O)||vc(e.layout,O)!==null)){console.log(`[agent-witch] Ignoring duplicate run ${O}.`);return}let E=v=>{re(k,nu({code:v,...O!==void 0?{agentRunId:O}:{},...M!==void 0?{requestId:M}:{}}))},R=v=>{if(te!==null){let D=rE(e.layout,te);if(D!==null){re(k,{type:"command.claude.result",payload:{exitCode:-1,output:D,...O!==void 0?{agentRunId:O}:{}},requestId:M});return}if(O!==void 0){let H=nE(e.layout,O,te);if(!H.ok){re(k,{type:"command.claude.result",payload:{exitCode:-1,output:H.errorMessage,...O!==void 0?{agentRunId:O}:{}},requestId:M});return}rD.set(O,te.entries.some($=>$.scope==="run"))}}O!==void 0&&C!==void 0&&Bre.set(O,C),O!==void 0&&(Gre.set(O,v),L!==void 0&&L.trim().length>0&&YN.set(O,L.trim()),XN.set(O,_.trim()),L!==void 0&&L.trim().length>0&&Kre({projectId:L.trim(),agentRunId:O,status:"running",promptBody:_.trim(),resultBody:null,writerAgent:W,completedAt:null}),$t({projectFolderPath:v,...L!==void 0&&L.trim().length>0?{projectId:L.trim()}:{}})),Wbe(e,W,_.trim(),M,k,O,b,C,P,v,de,L)};O!==void 0&&ZN.add(O),Pee({config:e,...L!==void 0?{projectId:L}:{},requestedFolderPath:be,defaultFolderPath:xc()}).catch(()=>({ok:!1,code:pe.FOLDER_CHECK_UNAVAILABLE})).then(v=>{if(O!==void 0&&ZN.delete(O),!v.ok){E(v.code);return}O!==void 0&&Vre.add(O),R(v.folderRealPath)}).catch(v=>{console.error("[agent-witch] Run start failed:",v instanceof Error?v.message:v)})}}if(f.type==="shell.session.open"&&fe(f.payload)){let _=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",W=typeof f.payload.cols=="number"?f.payload.cols:120,O=typeof f.payload.rows=="number"?f.payload.rows:32;_.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),mN({shellSessionId:_,cwd:e.workspace,cols:W,rows:O,send:b=>{re(k,b)},requestId:M}))}if(f.type==="shell.session.close"&&fe(f.payload)){let _=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"";_.length>0&&Tc(_,W=>{re(k,W)},M)}if(f.type==="shell.input"&&fe(f.payload)){let _=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",W=typeof f.payload.data=="string"?f.payload.data:"";_.length>0&&W.length>0&&dN(_,W)}if(f.type==="shell.resize"&&fe(f.payload)){let _=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",W=typeof f.payload.cols=="number"?f.payload.cols:0,O=typeof f.payload.rows=="number"?f.payload.rows:0;_.length>0&&W>0&&O>0&&uN(_,W,O)}if(f.type==="command.writer.session.end"&&fe(f.payload)){let _=f.payload.writerAgent;typeof _=="string"&&De(_)&&(fN(_),d_(e.layout,_))}if(f.type==="command.writer.session.start"&&fe(f.payload)){let _=f.payload.writerAgent,W=typeof f.payload.writerSessionId=="string"?f.payload.writerSessionId:"";typeof _=="string"&&De(_)&&W.length>0&&(console.log(`[agent-witch] Starting ${_} session\u2026`),Obe(e,_,W,M,k))}if(f.type==="command.claude.stop"&&fe(f.payload)){let _=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:"";_.length>0&&(console.log(`[agent-witch] Stopping run ${_}\u2026`),Wg(e,Qb(k),_,M))}if(f.type==="command.claude.input_respond"&&fe(f.payload)){let _=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:"",W=typeof f.payload.response=="string"?f.payload.response.trim():"",O=typeof f.payload.originalPrompt=="string"?f.payload.originalPrompt:"",b=typeof f.payload.partialOutput=="string"?f.payload.partialOutput:"",P=typeof f.payload.question=="string"?f.payload.question:"";_.length>0&&W.length>0&&O.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),TN(e,{agentRunId:_,originalPrompt:O,partialOutput:b,question:P,response:W,shellSessionId:Bre.get(_)},M,Qb(k)))}if(f.type==="dispatch.approval.required"&&fe(f.payload)){let _=typeof f.payload.requesterEmail=="string"?f.payload.requesterEmail:"A teammate",W=typeof f.payload.prompt=="string"?f.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${_}: ${W}`),process.platform==="darwin"&&(0,oD.spawn)("osascript",["-e",`display notification "${W.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${_.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(f.type==="harness.request"&&fe(f.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),Nbe(e,f.payload,M,k)),f.type==="harness.export.request"&&fe(f.payload)){let _=typeof f.payload.borrowerUserId=="string"?f.payload.borrowerUserId:"",W=typeof f.payload.targetDeviceId=="string"?f.payload.targetDeviceId:void 0,O=Array.isArray(f.payload.setSlugs)?f.payload.setSlugs.filter(b=>typeof b=="string"):[];_.length>0&&O.length>0&&(async()=>{let{readHarnessExportSets:b}=await Promise.resolve().then(()=>(zre(),$re)),P=b(O,e.email);re(k,{type:"harness.export.result",payload:{success:P.length>0,borrowerUserId:_,...W!==void 0?{targetDeviceId:W}:{},sets:P,errorMessage:P.length>0?void 0:"No readable harness sets were found on this machine."},requestId:M})})()}if(f.type==="harness.manifest.request"&&Mg(k,e.layout),f.type==="command.claude.result"&&fe(f.payload)){let _=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:void 0,W=typeof f.payload.output=="string"?f.payload.output:"",O=typeof f.payload.exitCode=="number"?f.payload.exitCode:null,b=Zd(_!==void 0?Gre.get(_):void 0,xc),P=_!==void 0?YN.get(_):void 0,C=_!==void 0?XN.get(_)??"":"",L=MT({exitCode:O,output:W});if(L&&b!==null&&hL({layout:e.layout,text:W,source:_??"command.claude.result",projectFolderPath:b,...P!==void 0?{projectId:P}:{}}),O!=null&&O!==0&&W.trim().length>0&&b!==null&&(pL({layout:e.layout,errorText:W,projectFolderPath:b,...P!==void 0?{projectId:P}:{}}),AL({layout:e.layout,text:W,source:_??"command.claude.result.failure",projectFolderPath:b,...P!==void 0?{projectId:P}:{}})),L&&C.trim().length>0&&b!==null&&bW({layout:e.layout,projectFolderPath:b,...P!==void 0?{projectId:P}:{},entry:{id:`${Date.now()}-${_??"run"}`,..._!==void 0?{agentRunId:_}:{},prompt:C,output:W,createdAt:new Date().toISOString()}}),_!==void 0&&b!==null){let te=eD.get(_),de=tD.get(_);te!==void 0&&de!==void 0&&sS(b).then(E=>{let R=FT({before:de,after:E});wk(te,R),tD.delete(_),eD.delete(_)})}if(L&&P!==void 0&&P.trim().length>0){let te=B(),de=te===null?null:J({wsUrl:te.wsUrl,pairingToken:te.pairingToken});de!==null&&zT(de,P,{..._!==void 0?{sourceRunId:_}:{},lesson:$T({prompt:C,output:W})})}if(_!==void 0&&P!==void 0&&P.trim().length>0){let te=O==null||O===0?"completed":"failed";Kre({projectId:P.trim(),agentRunId:_,status:te,promptBody:C.length>0?C:void 0,resultBody:W,completedAt:new Date().toISOString()})}_!==void 0&&(eu(e.layout,_),rD.delete(_),YN.delete(_),XN.delete(_))}},S=()=>{if(t.stopped)return;d(),u();let f=new Rc(e.wsUrl);t.socket=f,f.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),kN(J({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),EN(e.layout),QM({layout:e.layout,send:W=>{re(f,W)}});let k=et(e.wsUrl)??"http://localhost:3000",M=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),_=dM({layout:e.layout,origin:k,...M!==void 0&&M.length>0?{claimToken:M}:{}});re(f,{type:"agent.register",payload:{role:"agent",hostname:Oc.default.hostname(),macOsUsername:Oc.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},..._}},e.layout),Mg(f,e.layout),CN(e,f),y(f)}),f.on("message",k=>{let M=typeof k=="string"?k:k.toString("utf8");try{let _=JSON.parse(M);if(!fe(_))return;h(_,f)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),f.on("close",(k,M)=>{a(),t.socket=void 0,t.wsConnected=!1,yw(e.layout),t.reconnectAttempt+=1;let _=typeof M=="string"?M:M.toString("utf8");li(e.layout,{kind:"ws_close",message:"WebSocket closed",code:k,reason:_}),console.log("[agent-witch] Disconnected from server."),g()}),f.on("error",k=>{t.wakeError=k.message,li(e.layout,{kind:"ws_error",message:k.message,stack:k.stack}),console.error(`[agent-witch] Socket error: ${k.message}`)})},w=SE(e.layout.configPath,f=>{if(!f)return;let k=IN(e,Qb(t.socket??{readyState:Rc.CLOSED,send:()=>{}}));console.log(`[agent-witch] Coding tools paused; stopped ${k} run(s).`)}),I=()=>{t.stopped=!0,w(),a(),c(),d(),u()};return tw(()=>{let f=rw();f!==null&&f.layout.installDir===e.layout.installDir&&f.layout.profileEmail===e.layout.profileEmail&&s(f.remoteBundleVersion,f.trigger);let k=ow();if(k==="install-bundle-update"){o(k);return}k!==null&&r(k)}),{connect:S,startLocalHealthCheck:m,stop:I,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Dd(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:sg(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,S()},reportHarnessManifestIfConnected:()=>{let f=t.socket;return!t.wsConnected||f===void 0?{ok:!1,errorMessage:"Not connected to AgentWitch \u2014 manifest saved locally only."}:(Mg(f,e.layout),{ok:!0})}}},Fbe=async()=>{Dt("agent-witch");let e=HM(),t=x();UM().ok||(process.platform==="darwin"?(await Ps(t),process.stdout.write(`[agent-witch] Another AgentWitch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another AgentWitch process may already be running \u2014 exiting.
`),process.exit(0)),VM(t);let o=KM({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){_o({launchAgentLabel:Le(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let S=cd({launchAgentPrefix:Le(t),wakePort:td(t)});S.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(S.length)} LaunchAgent plist(s).`)}catch(S){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${S instanceof Error?S.message:String(S)}`)}sd()}let n=await fE(),s=n[0];s!==void 0&&NN(s.layout);for(let h of n){let S=et(h.wsUrl)??Nt;Ed(h.layout.installDir,S)}let i=n.map(h=>Hbe(h)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),mg(),process.exit(0));let c=()=>{n.forEach((h,S)=>{let w=i[S];if(w===void 0)return;let I=Ue(h.layout);hw(I,{socketOpen:w.hasMacSocketOpen(),staleAfterMs:12e4})&&w.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let h=n[0]?.layout;h!==void 0&&(Qt(h)||Bu(h.installDir))},m=await qM({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):ng({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let h of i)h.startLocalHealthCheck(),h.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let g=bo(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),id(),d()}),y=()=>{g(),m.stop();for(let h of i)h.stop();mg()};lw(y),d=()=>{y(),console.log("[agent-witch] Shutting down."),process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Ng=Fbe});var nD=l(()=>{"use strict";qre()});var Jre={};Mt(Jre,{startAgentWitchClient:()=>Ng});var Yre=l(()=>{"use strict";nD();nD();_s();Ek();fy();if(!Ht()&&bs(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(gy(process.argv.slice(e))),Ng()}});bk();Ek();_s();fy();var a$="20.x",l$="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var sle=e=>[`Node.js ${a$} or newer is required (found ${e}).`,l$].join(" "),c$=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${sle(process.version)}
`),process.exit(1))};Ry();var $be=async()=>{Dt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(gw(),mw)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},zbe=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(EK(),wK)),t=await e();if(t.ok){process.stdout.write(`AgentWitch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake AgentWitch. ${r}
`),process.exit(1)},Ube=async e=>{try{if(e===Py){let{resolveAgentWitchLocalLayout:t}=await Promise.resolve().then(()=>(Z(),lk)),{runCheckContextHookCli:r}=await Promise.resolve().then(()=>(eo(),KG));await r({layout:t()})}else process.stderr.write(`[agent-witch] ${ba}: unknown hook ${e??"(none)"}
`)}catch(t){let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] ${ba}: ${r}
`)}await new Promise(t=>{process.stdout.write("",()=>t())}),process.exit(0)},Bbe=async()=>{if(!bs(Ht()?void 0:__agentWitchImportMetaUrl))return;process.argv[2]===ba&&await Ube(process.argv[3]),c$();let e=process.argv.indexOf("report");e>=0&&process.exit(gy(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await $be();return}if(t==="wake"){await zbe();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(vV(),LV));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(cQ(),lQ));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(Z(),lk)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(pW(),a7));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(Yre(),Jre));await r()};Bbe();
