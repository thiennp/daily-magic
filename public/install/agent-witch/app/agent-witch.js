#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var Hre=Object.create;var Yb=Object.defineProperty;var Fre=Object.getOwnPropertyDescriptor;var $re=Object.getOwnPropertyNames;var zre=Object.getPrototypeOf,Ure=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var C=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},Mt=(e,t)=>{for(var r in t)Yb(e,r,{get:t[r],enumerable:!0})},Bre=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of $re(t))!Ure.call(e,n)&&n!==r&&Yb(e,n,{get:()=>t[n],enumerable:!(o=Fre(t,n))||o.enumerable});return e};var u=(e,t,r)=>(r=e!=null?Hre(zre(e)):{},Bre(t||!e||!e.__esModule?Yb(r,"default",{value:e,enumerable:!0}):r,e));var Oc,YN,XN,jc,Xb,bbe,ZN,ss,Hr,So,Ng,Dg,oa,na,yt,Zb,Hg,Fg,$g,Mc,ur,is,as,Nc,pn,Qb,QN,Xe=l(()=>{"use strict";Oc={production:".agent-witch",localhost:".local-agent-witch"},YN={production:47892,localhost:47893},XN={production:"com.agent-witch",localhost:"com.local-agent-witch"},jc={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Xb="app",bbe=`${Xb}/agent-witch.js`,ZN=`${Xb}/command`,ss={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},Hr=Oc.production,So=Oc.localhost,Ng=YN.production,Dg=YN.localhost,oa=XN.production,na=XN.localhost,yt="profiles",Zb=jc.activeProfile,Hg="harness",Fg="sets",$g="manifest.json",Mc=ss.projectsDir,ur=ss.logsDir,is="agent-witch.log",as="agent-witch.error.log",Nc=ss.reportsDir,pn=ss.deviceKeypairJson,Qb=Xb,QN="agent-witch.js"});var eD=l(()=>{"use strict";Xe()});var tD,un,ls,Dc=l(()=>{"use strict";tD=u(require("node:path"));Xe();un=e=>tD.default.basename(e)===So,ls=e=>un(e)?na:oa});var Fr,sa=l(()=>{"use strict";Fr="agent-witch.service"});var Nt,zg,rD=l(()=>{"use strict";Nt="https://www.agentwitch.com",zg="wss://www.agentwitch.com/api/agent-witch/ws"});var Ug,ia,Hc,oD=l(()=>{"use strict";Ug="127.0.0.1",ia=`http://${Ug}:43347`,Hc=ia});var ek,Bg,nD,sD,tk,rk,iD=l(()=>{"use strict";ek="local-app-port.json",Bg="http://127.0.0.1:<localAppPort>",nD=`~/.agent-witch/profiles/<account email>/${ek}`,sD=`AgentWitch Local listens on a port unique to your account on this computer: read localAppPort from ${nD} and use ${Bg}.`,tk="agentwitch-local",rk=(e=".agent-witch")=>`port="$(sed -n 's/.*"localAppPort"[^0-9]*\\([0-9][0-9]*\\).*/\\1/p' "$HOME/${e}"/profiles/*/${ek} | head -n 1)"; curl -sS -m 5 "http://127.0.0.1:\${port}/health"`});var mr=l(()=>{"use strict";rD();oD();iD()});var Gre,cs,Gg,aD,Kre,Vre,qre,Jre,Yre,$c,ok=l(()=>{"use strict";sa();mr();Gre={darwin:"mac",mac:"mac",macos:"mac",linux:"linux",wsl:"linux",win32:"windows",windows:"windows"},cs=e=>Gre[(e??"").trim().toLowerCase()]??"unknown",Gg=e=>`nohup "$HOME/${e}/app/command/run.sh" >/dev/null 2>&1 &`,aD=e=>`${rk(e)} || echo "AWL still not responding \u2014 see logs:"`,Kre=e=>({platform:"mac",label:"macOS",instructions:"On this computer, open Terminal, paste this command, and press Return.",command:`AW_HOME="$HOME/${e.installDirName}"
launchctl kickstart -k "gui/$(id -u)/${e.launchAgentPrefix}"
sleep 2
${aD(e.installDirName)}
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`,note:"Paste and run the whole block so AW_HOME is set before tail. Ignore com.agent-witch-live unless you installed Live as a separate LaunchAgent."}),Vre=e=>({platform:"linux",label:"Linux or WSL",instructions:"On this computer, open a terminal (on Windows, your WSL distro's terminal), paste this command, and press Enter.",command:`systemctl --user restart ${Fr}
sleep 2
${aD(e.installDirName)}
journalctl --user -u ${Fr} -n 50 --no-pager`,note:`If systemctl is not available, the installer did not set up auto-start on this computer. Start the client by hand: ${Gg(e.installDirName)}`}),qre=()=>({platform:"windows",label:"Windows (WSL)",instructions:"On this computer, open PowerShell, paste these commands, and press Enter.",command:`wsl.exe -e bash -lc 'systemctl --user restart ${Fr}'
wsl.exe -e bash -lc 'systemctl --user status ${Fr}'`,note:"AgentWitch runs inside WSL on Windows. These commands use your default WSL distro; if you installed into another distro, add -d <distro name> after wsl.exe."}),Jre={mac:Kre,linux:Vre,windows:qre},Yre=["mac","linux","windows"],$c=e=>(e.platform==="unknown"?Yre:[e.platform]).map(r=>Jre[r](e))});var lD,cD,Xre,Zre,Qre,nk,dD=l(()=>{"use strict";lD=u(require("node:path"));ok();Dc();cD=e=>e instanceof Error?e.message:String(e),Xre=e=>typeof e=="object"&&e!==null&&"code"in e&&e.code==="ENOENT",Zre=async(e,t)=>{try{let r=await e.kickstartLaunchAgents();return r.length>0?{ok:!0,platform:"mac",outcome:"restarted",message:`Kickstarted ${r.join(", ")}.`,manualCommand:null}:{ok:!1,platform:"mac",outcome:"failed",message:"No AgentWitch LaunchAgent was kickstarted on this computer.",manualCommand:t}}catch(r){return{ok:!1,platform:"mac",outcome:"failed",message:`LaunchAgent kickstart failed: ${cD(r)}`,manualCommand:t}}},Qre=async(e,t)=>{try{return await e.restartSystemdUserService(),{ok:!0,platform:"linux",outcome:"restarted",message:"Restarted the agent-witch.service systemd user unit.",manualCommand:null}}catch(r){return Xre(r)?{ok:!1,platform:"linux",outcome:"manual-step-required",message:"systemctl is not available on this computer, so the installer set up no auto-start. Start the client by hand.",manualCommand:t}:{ok:!1,platform:"linux",outcome:"failed",message:`systemd user restart failed: ${cD(r)}`,manualCommand:t}}},nk=async e=>{let t=cs(e.platform),r=lD.default.basename(e.installDir),o=n=>$c({platform:n,installDirName:r,launchAgentPrefix:ls(e.installDir)})[0]?.command??null;return t==="mac"?Zre(e.runners,o("mac")):t==="linux"?Qre(e.runners,Gg(r)):t==="windows"?{ok:!1,platform:t,outcome:"unsupported-platform",message:"AgentWitch runs inside WSL on Windows. Restart it from PowerShell with the command below.",manualCommand:o("windows")}:{ok:!1,platform:t,outcome:"unsupported-platform",message:`Restarting the AgentWitch client is not supported on ${e.platform||"this platform"}.`,manualCommand:null}}});var zc=l(()=>{"use strict";eD();Dc();ok();dD()});var pD,sk,eoe,Uc,toe,roe,uD,ooe,noe,mD=l(()=>{"use strict";zc();Xe();pD=u(require("node:os")),sk=u(require("node:path")),eoe=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?sk.default.resolve(e):sk.default.join(pD.default.homedir(),Hr)},Uc=ls(eoe()),toe=`${Uc}-wake`,roe=`${Uc}-live`,uD=`${Uc}-watchdog`,ooe=`${Uc}-automation-scheduler`,noe=`${Uc}-updater`});var aa=C(ik=>{"use strict";Object.defineProperty(ik,"__esModule",{value:!0});ik.stringify=soe;function soe(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var K=C(ak=>{"use strict";Object.defineProperty(ak,"__esModule",{value:!0});ak.generateTypeGuardError=ioe;var gD=aa();function ioe(e,t,r){return(0,gD.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,gD.stringify)(e)}) to be "${r}"`}});var mn=C(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.isNonNullObject=void 0;var aoe=K(),loe=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,aoe.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Kg.isNonNullObject=loe});var $r=C(Ue=>{"use strict";Object.defineProperty(Ue,"__esModule",{value:!0});Ue.attachTypeGuardMeta=Ue.isArrayTypeGuard=Ue.isNestedObjectTypeGuard=Ue.getTypeGuardWrapperKind=Ue.getTypeGuardInnerGuard=Ue.getTypeGuardItemGuard=Ue.getTypeGuardSchema=void 0;var coe=e=>e.schema;Ue.getTypeGuardSchema=coe;var doe=e=>e.itemGuard;Ue.getTypeGuardItemGuard=doe;var poe=e=>e.innerGuard;Ue.getTypeGuardInnerGuard=poe;var uoe=e=>e.wrapperKind;Ue.getTypeGuardWrapperKind=uoe;var moe=e=>{if((0,Ue.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ue.isNestedObjectTypeGuard=moe;var goe=e=>{if((0,Ue.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ue.isArrayTypeGuard=goe;var foe=(e,t)=>Object.assign(e,t);Ue.attachTypeGuardMeta=foe});var Bc=C(ds=>{"use strict";Object.defineProperty(ds,"__esModule",{value:!0});ds.getExpectedTypeName=ds.getTypeGuardDisplayName=void 0;var fD=$r(),yoe=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};ds.getTypeGuardDisplayName=yoe;var hoe=e=>{let t=(0,fD.getTypeGuardWrapperKind)(e),r=(0,fD.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,ds.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};ds.getExpectedTypeName=hoe});var ps=C(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.createValidationResult=void 0;var Soe=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Vg.createValidationResult=Soe});var la=C(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.createValidationError=void 0;var Poe=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});qg.createValidationError=Poe});var ca=C(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.createTreeNode=void 0;var Aoe=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Jg.createTreeNode=Aoe});var Gc=C(Yg=>{"use strict";Object.defineProperty(Yg,"__esModule",{value:!0});Yg.combineResults=void 0;var _oe=ps(),boe=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,_oe.createValidationResult)(r,o,n)};Yg.combineResults=boe});var Zg=C(Xg=>{"use strict";Object.defineProperty(Xg,"__esModule",{value:!0});Xg.createSimplifiedTree=void 0;var yD=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=yD(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},koe=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=yD(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Xg.createSimplifiedTree=koe});var Vc=C(ef=>{"use strict";Object.defineProperty(ef,"__esModule",{value:!0});ef.validateObject=void 0;var Roe=mn(),Kc=ps(),woe=la(),Qg=ca(),Eoe=Gc(),hD=tf(),Toe=(e,t,r)=>{let o=()=>{let i=(0,woe.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Qg.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Kc.createValidationResult)(!1,[],a):(0,Kc.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Kc.createValidationResult)(!0,[],(0,Qg.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,m=d,g=t[m],y=e[m],h=(0,hD.validateProperty)(m,y,g,r);return h.valid?p.length===0?(0,Kc.createValidationResult)(!0,[],(0,Qg.createTreeNode)(r.path,!0,"object",e)):a(p):h};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,hD.validateProperty)(d,e[d],p,r)}),a=(0,Eoe.combineResults)(i,r.path),c=(0,Qg.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,Kc.createValidationResult)(a.valid,a.errors,c)};return(0,Roe.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};ef.validateObject=Toe});var PD=C(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.validateArray=void 0;var Coe=aa(),rf=ps(),SD=la(),of=ca(),Ioe=Gc(),Loe=Vc(),voe=Bc(),xoe=$r(),Woe=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,SD.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,of.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,rf.createValidationResult)(!1,[c],d)}let n=(0,xoe.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,m={path:p,config:r.config||null};if(n)return(0,Loe.validateObject)(c,n,m);let g=t(c,null),y=(0,voe.getExpectedTypeName)(t),h=(0,Coe.stringify)(c);if(g)return(0,rf.createValidationResult)(!0,[],(0,of.createTreeNode)(p,!0,y,c));let S=h.length>200?`Expected ${p} to be "${y}"`:`Expected ${p} (${h}) to be "${y}"`,T=(0,SD.createValidationError)(p,y,c,S),f=(0,of.createTreeNode)(p,!1,y,c);return f.errors=[T],(0,rf.createValidationResult)(!1,[T],f)}),i=(0,Ioe.combineResults)(s,o),a=(0,of.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,rf.createValidationResult)(i.valid,i.errors,a)};nf.validateArray=Woe});var tf=C(af=>{"use strict";Object.defineProperty(af,"__esModule",{value:!0});af.validateProperty=void 0;var AD=ps(),Ooe=la(),_D=ca(),joe=Bc(),sf=$r(),Moe=Vc(),Noe=PD(),Doe=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,sf.getTypeGuardSchema)(r),c=(0,sf.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,Moe.validateObject)(t,a,s);if(c&&(0,sf.isArrayTypeGuard)(r))return(0,Noe.validateArray)(t,c,s)}let d=p=>{let m=r(t,p),g=(0,joe.getExpectedTypeName)(r);return m?(0,AD.createValidationResult)(!0,[],(0,_D.createTreeNode)(n,!0,g,t)):(()=>{let y=(0,Ooe.createValidationError)(n,g,t,`Expected ${n} (${JSON.stringify(t)}) to be "${g}"`),h=(0,_D.createTreeNode)(n,!1,g,t);return h.errors=[y],(0,AD.createValidationResult)(!1,[y],h)})()};if((0,sf.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};af.validateProperty=Doe});var cf=C(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});lf.isNil=void 0;var Hoe=K(),Foe=function(e,t){return e!=null?(t&&t.callbackOnError((0,Hoe.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};lf.isNil=Foe});var lk=C(df=>{"use strict";Object.defineProperty(df,"__esModule",{value:!0});df.isDefined=void 0;var $oe=K(),zoe=cf(),Uoe=function(e,t){return(0,zoe.isNil)(e,null)?(t&&t.callbackOnError((0,$oe.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};df.isDefined=Uoe});var ck=C(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.reportValidationResults=void 0;var Boe=Zg(),bD=lk(),Goe=cf(),Koe=(e,t)=>{if(e.valid===!0||(0,Goe.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,bD.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,Boe.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,bD.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};pf.reportValidationResults=Koe});var dk=C(be=>{"use strict";Object.defineProperty(be,"__esModule",{value:!0});be.Validation=be.reportValidationResults=be.validateObject=be.validateProperty=be.createSimplifiedTree=be.combineResults=be.createTreeNode=be.createValidationError=be.createValidationResult=be.getExpectedTypeName=void 0;var Voe=Bc();Object.defineProperty(be,"getExpectedTypeName",{enumerable:!0,get:function(){return Voe.getExpectedTypeName}});var qoe=ps();Object.defineProperty(be,"createValidationResult",{enumerable:!0,get:function(){return qoe.createValidationResult}});var Joe=la();Object.defineProperty(be,"createValidationError",{enumerable:!0,get:function(){return Joe.createValidationError}});var Yoe=ca();Object.defineProperty(be,"createTreeNode",{enumerable:!0,get:function(){return Yoe.createTreeNode}});var Xoe=Gc();Object.defineProperty(be,"combineResults",{enumerable:!0,get:function(){return Xoe.combineResults}});var Zoe=Zg();Object.defineProperty(be,"createSimplifiedTree",{enumerable:!0,get:function(){return Zoe.createSimplifiedTree}});var Qoe=tf();Object.defineProperty(be,"validateProperty",{enumerable:!0,get:function(){return Qoe.validateProperty}});var ene=Vc();Object.defineProperty(be,"validateObject",{enumerable:!0,get:function(){return ene.validateObject}});var tne=ck();Object.defineProperty(be,"reportValidationResults",{enumerable:!0,get:function(){return tne.reportValidationResults}});var rne=ps(),one=Gc(),nne=la(),sne=ca(),ine=tf(),ane=Vc(),lne=ck(),cne=Zg();be.Validation={result:rne.createValidationResult,combine:one.combineResults,error:nne.createValidationError,treeNode:sne.createTreeNode,property:ine.validateProperty,object:ane.validateObject,report:lne.reportValidationResults,createSimplifiedTree:cne.createSimplifiedTree}});var uf=C(pk=>{"use strict";Object.defineProperty(pk,"__esModule",{value:!0});pk.isType=pne;var kD=mn(),RD=dk(),dne=$r();function pne(e){if(!(0,kD.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,RD.validateObject)(r,e,s);return(0,RD.reportValidationResults)(i,o||null),i.valid}return(0,kD.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,dne.attachTypeGuardMeta)(t,{schema:e})}});var CD=C(us=>{"use strict";Object.defineProperty(us,"__esModule",{value:!0});us.isNestedType=us.isShape=void 0;us.isSchema=qc;var wD=mn(),ED=dk(),TD=$r();function qc(e){if(!(0,wD.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=mne(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,ED.validateObject)(o,t,i);return(0,ED.reportValidationResults)(a,n||null),a.valid}return(0,wD.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,TD.attachTypeGuardMeta)(r,{schema:t})}function une(e){return typeof e=="function"?e:Array.isArray(e)?gne(e):typeof e=="object"&&e!==null?qc(e):e}function mne(e){let t={};for(let[r,o]of Object.entries(e))t[r]=une(o);return t}function gne(e){let t=e[0],r=qc(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,TD.attachTypeGuardMeta)(o,{itemGuard:r})}us.isShape=qc;us.isNestedType=qc});var ID=C(uk=>{"use strict";Object.defineProperty(uk,"__esModule",{value:!0});uk.isObjectWith=yne;var fne=uf();function yne(e){return(0,fne.isType)(e)}});var LD=C(mk=>{"use strict";Object.defineProperty(mk,"__esModule",{value:!0});mk.isObject=Sne;var hne=uf();function Sne(e){return(0,hne.isType)(e)}});var vD=C(gk=>{"use strict";Object.defineProperty(gk,"__esModule",{value:!0});gk.guardWithTolerance=Pne;function Pne(e,t,r){return t(e,r),e}});var xD=C(fk=>{"use strict";Object.defineProperty(fk,"__esModule",{value:!0});fk.isBranded=_ne;var Ane=K();function _ne(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,Ane.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var WD=C(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.BrandSymbols=void 0;mf.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var OD=C(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.isAny=void 0;var bne=function(e){return!0};gf.isAny=bne});var Jc=C(yk=>{"use strict";Object.defineProperty(yk,"__esModule",{value:!0});yk.reportTypeGuardError=Rne;var kne=K();function Rne(e,t,r){e&&e.callbackOnError((0,kne.generateTypeGuardError)(t,e.identifier,r))}});var jD=C(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.isBoolean=void 0;var wne=Jc(),Ene=function(t,r){return typeof t!="boolean"?((0,wne.reportTypeGuardError)(r,t,"boolean"),!1):!0};ff.isBoolean=Ene});var MD=C(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.isDate=void 0;var Tne=K(),Cne=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,Tne.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};yf.isDate=Cne});var hk=C(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.isNumber=void 0;var Ine=Jc(),Lne=function(t,r){return typeof t!="number"||isNaN(t)?((0,Ine.reportTypeGuardError)(r,t,"number"),!1):!0};hf.isNumber=Lne});var ND=C(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.isString=void 0;var vne=Jc(),xne=function(t,r){return typeof t!="string"?((0,vne.reportTypeGuardError)(r,t,"string"),!1):!0};Sf.isString=xne});var DD=C(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.isUnknown=void 0;var Wne=function(e){return!0};Pf.isUnknown=Wne});var HD=C(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.isFunction=void 0;var One=K(),jne=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,One.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Af.isFunction=jne});var $D=C(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.isFile=void 0;var FD=K(),Mne=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,FD.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,FD.generateTypeGuardError)(e,t.identifier,"File")),!1)};_f.isFile=Mne});var UD=C(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.isFileList=void 0;var zD=K(),Nne=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,zD.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,zD.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};bf.isFileList=Nne});var GD=C(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});kf.isBlob=void 0;var BD=K(),Dne=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,BD.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,BD.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};kf.isBlob=Dne});var VD=C(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.isFormData=void 0;var KD=K(),Hne=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,KD.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,KD.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};Rf.isFormData=Hne});var JD=C(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.isURL=void 0;var qD=K(),Fne=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,qD.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,qD.generateTypeGuardError)(e,t.identifier,"URL")),!1)};wf.isURL=Fne});var XD=C(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.isURLSearchParams=void 0;var YD=K(),$ne=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,YD.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,YD.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Ef.isURLSearchParams=$ne});var ZD=C(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.isMap=void 0;var zne=K(),Une=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,zne.generateTypeGuardError)(e,t.identifier,"Map")),!1)};Tf.isMap=Une});var QD=C(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.isSet=void 0;var Bne=K(),Gne=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,Bne.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Cf.isSet=Gne});var eH=C(Sk=>{"use strict";Object.defineProperty(Sk,"__esModule",{value:!0});Sk.isIndexSignature=Vne;var Kne=K();function Vne(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,Kne.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let m=s[d],g=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),y=t(m,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return g&&y})}}});var tH=C(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.isError=void 0;var qne=Jc(),Jne=function(t,r){return t instanceof Error?!0:((0,qne.reportTypeGuardError)(r,t,"Error"),!1)};If.isError=Jne});var Ak=C(Pk=>{"use strict";Object.defineProperty(Pk,"__esModule",{value:!0});Pk.isArrayWithEachItem=Zne;var Yne=K(),Xne=$r();function Zne(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,Yne.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,Xne.attachTypeGuardMeta)(t,{itemGuard:e})}});var _k=C(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});Lf.isNonEmptyArray=void 0;var Qne=K(),ese=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,Qne.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Lf.isNonEmptyArray=ese});var rH=C(bk=>{"use strict";Object.defineProperty(bk,"__esModule",{value:!0});bk.isNonEmptyArrayWithEachItem=ose;var tse=Ak(),rse=_k();function ose(e){return function(t,r){return(0,tse.isArrayWithEachItem)(e)(t,r)&&(0,rse.isNonEmptyArray)(t,r)}}});var nH=C(kk=>{"use strict";Object.defineProperty(kk,"__esModule",{value:!0});kk.isTuple=nse;var oH=K();function nse(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,oH.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,oH.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var sH=C(Rk=>{"use strict";Object.defineProperty(Rk,"__esModule",{value:!0});Rk.isObjectWithEachItem=ise;var sse=K();function ise(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,sse.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var iH=C(wk=>{"use strict";Object.defineProperty(wk,"__esModule",{value:!0});wk.isPartialOf=lse;var ase=mn();function lse(e){return function(t,r){if(!(0,ase.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var aH=C(Ek=>{"use strict";Object.defineProperty(Ek,"__esModule",{value:!0});Ek.isPick=dse;var cse=mn();function dse(e,...t){return function(r,o){if(!(0,cse.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var lH=C(Tk=>{"use strict";Object.defineProperty(Tk,"__esModule",{value:!0});Tk.isOmit=use;var pse=mn();function use(e,...t){return function(r,o){if(!(0,pse.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),m=p.indexOf(" ("),g=m>=0?p.slice(0,m):p;if(a.has(g))return!1;let y=g.startsWith(s+".")&&g.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var cH=C(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.isNonEmptyString=void 0;var mse=K(),gse=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,mse.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};vf.isNonEmptyString=gse});var dH=C(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.isNonNegativeNumber=void 0;var fse=K(),yse=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,fse.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};xf.isNonNegativeNumber=yse});var pH=C(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.isPositiveNumber=void 0;var hse=K(),Sse=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,hse.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Wf.isPositiveNumber=Sse});var uH=C(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.isNonPositiveNumber=void 0;var Pse=K(),Ase=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,Pse.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Of.isNonPositiveNumber=Ase});var mH=C(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isNegativeNumber=void 0;var _se=K(),bse=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,_se.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};jf.isNegativeNumber=bse});var gH=C(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});Mf.isInteger=void 0;var kse=K(),Rse=hk(),wse=function(e,t){return!(0,Rse.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,kse.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Mf.isInteger=wse});var fH=C(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.isPositiveInteger=void 0;var Ese=K(),Tse=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Ese.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Nf.isPositiveInteger=Tse});var yH=C(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.isNegativeInteger=void 0;var Cse=K(),Ise=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Cse.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Df.isNegativeInteger=Ise});var hH=C(Hf=>{"use strict";Object.defineProperty(Hf,"__esModule",{value:!0});Hf.isNonNegativeInteger=void 0;var Lse=K(),vse=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Lse.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Hf.isNonNegativeInteger=vse});var SH=C(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.isNonPositiveInteger=void 0;var xse=K(),Wse=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,xse.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Ff.isNonPositiveInteger=Wse});var PH=C(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.isNumeric=void 0;var $f=K(),Ose=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,$f.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,$f.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,$f.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,$f.generateTypeGuardError)(e,t.identifier,"number key")),!1};zf.isNumeric=Ose});var AH=C(Uf=>{"use strict";Object.defineProperty(Uf,"__esModule",{value:!0});Uf.isBooleanLike=void 0;var Ck=K(),jse=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Ck.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Ck.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Uf.isBooleanLike=jse});var _H=C(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.isDateLike=void 0;var Yc=K(),Mse=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Yc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Yc.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Yc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Yc.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Yc.generateTypeGuardError)(e,t.identifier,"date-like")),!1};Bf.isDateLike=Mse});var bH=C(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.isBigInt=void 0;var Nse=K(),Dse=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,Nse.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Gf.isBigInt=Dse});var Lk=C(Ik=>{"use strict";Object.defineProperty(Ik,"__esModule",{value:!0});Ik.isOneOf=Hse;var kH=aa();function Hse(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,kH.stringify)(t)}) must be one of following values ${e.map(kH.stringify).join(" | ")}`),o}}});var RH=C(vk=>{"use strict";Object.defineProperty(vk,"__esModule",{value:!0});vk.isOneOfTypes=zse;var Fse=aa(),$se=Bc();function zse(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,Fse.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,$se.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var wH=C(xk=>{"use strict";Object.defineProperty(xk,"__esModule",{value:!0});xk.isIntersectionOf=Use;function Use(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var EH=C(Wk=>{"use strict";Object.defineProperty(Wk,"__esModule",{value:!0});Wk.isExtensionOf=Bse;function Bse(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var TH=C(Ok=>{"use strict";Object.defineProperty(Ok,"__esModule",{value:!0});Ok.isNullOr=Kse;var Gse=$r();function Kse(e){function t(r,o){return r===null?!0:e(r,o)}return(0,Gse.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var CH=C(jk=>{"use strict";Object.defineProperty(jk,"__esModule",{value:!0});jk.isUndefinedOr=qse;var Vse=$r();function qse(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,Vse.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var IH=C(Mk=>{"use strict";Object.defineProperty(Mk,"__esModule",{value:!0});Mk.isNilOr=Yse;var Jse=$r();function Yse(e){function t(r,o){return r==null?!0:e(r,o)}return(0,Jse.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var LH=C(Nk=>{"use strict";Object.defineProperty(Nk,"__esModule",{value:!0});Nk.isAsserted=Xse;function Xse(e){return!0}});var vH=C(Dk=>{"use strict";Object.defineProperty(Dk,"__esModule",{value:!0});Dk.isEnum=Qse;var Zse=Lk();function Qse(e){return function(t,r){return(0,Zse.isOneOf)(...Object.values(e))(t,r)}}});var xH=C(Hk=>{"use strict";Object.defineProperty(Hk,"__esModule",{value:!0});Hk.isEqualTo=rie;var eie=K(),tie=aa();function rie(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,eie.generateTypeGuardError)(t,r.identifier,`equal to ${(0,tie.stringify)(e)}`)),!1):!0}}});var WH=C(Kf=>{"use strict";Object.defineProperty(Kf,"__esModule",{value:!0});Kf.isRegex=void 0;var oie=K(),nie=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,oie.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Kf.isRegex=nie});var jH=C(Fk=>{"use strict";Object.defineProperty(Fk,"__esModule",{value:!0});Fk.isPattern=sie;var OH=K();function sie(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,OH.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,OH.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var MH=C($k=>{"use strict";Object.defineProperty($k,"__esModule",{value:!0});$k.by=iie;function iie(e){return function(t){return e(t,null)}}});var NH=C(zk=>{"use strict";Object.defineProperty(zk,"__esModule",{value:!0});zk.toNumber=aie;function aie(e){return typeof e=="number"?e:Number(e)}});var DH=C(Uk=>{"use strict";Object.defineProperty(Uk,"__esModule",{value:!0});Uk.toDate=lie;function lie(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var HH=C(Bk=>{"use strict";Object.defineProperty(Bk,"__esModule",{value:!0});Bk.toBoolean=cie;function cie(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var FH=C(Vf=>{"use strict";Object.defineProperty(Vf,"__esModule",{value:!0});Vf.isSymbol=void 0;var die=K(),pie=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,die.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Vf.isSymbol=pie});var da=C(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.isDateLike=_.isBooleanLike=_.isNumeric=_.isNonPositiveInteger=_.isNonNegativeInteger=_.isNegativeInteger=_.isPositiveInteger=_.isInteger=_.isNegativeNumber=_.isNonPositiveNumber=_.isPositiveNumber=_.isNonNegativeNumber=_.isNonEmptyString=_.isOmit=_.isPick=_.isPartialOf=_.isObjectWithEachItem=_.isNonNullObject=_.isTuple=_.isNonEmptyArrayWithEachItem=_.isNonEmptyArray=_.isArrayWithEachItem=_.isError=_.isIndexSignature=_.isSet=_.isMap=_.isURLSearchParams=_.isURL=_.isFormData=_.isBlob=_.isFileList=_.isFile=_.isFunction=_.isUnknown=_.isString=_.isNumber=_.isNil=_.isDefined=_.isDate=_.isBoolean=_.isAny=_.BrandSymbols=_.isBranded=_.guardWithTolerance=_.isObject=_.isObjectWith=_.isNestedType=_.isShape=_.isSchema=_.isType=void 0;_.isSymbol=_.toBoolean=_.toDate=_.toNumber=_.by=_.generateTypeGuardError=_.isPattern=_.isRegex=_.isEqualTo=_.isEnum=_.isAsserted=_.isNilOr=_.isUndefinedOr=_.isNullOr=_.isExtensionOf=_.isIntersectionOf=_.isOneOfTypes=_.isOneOf=_.isBigInt=void 0;var uie=uf();Object.defineProperty(_,"isType",{enumerable:!0,get:function(){return uie.isType}});var Gk=CD();Object.defineProperty(_,"isSchema",{enumerable:!0,get:function(){return Gk.isSchema}});Object.defineProperty(_,"isShape",{enumerable:!0,get:function(){return Gk.isShape}});Object.defineProperty(_,"isNestedType",{enumerable:!0,get:function(){return Gk.isNestedType}});var mie=ID();Object.defineProperty(_,"isObjectWith",{enumerable:!0,get:function(){return mie.isObjectWith}});var gie=LD();Object.defineProperty(_,"isObject",{enumerable:!0,get:function(){return gie.isObject}});var fie=vD();Object.defineProperty(_,"guardWithTolerance",{enumerable:!0,get:function(){return fie.guardWithTolerance}});var yie=xD();Object.defineProperty(_,"isBranded",{enumerable:!0,get:function(){return yie.isBranded}});var hie=WD();Object.defineProperty(_,"BrandSymbols",{enumerable:!0,get:function(){return hie.BrandSymbols}});var Sie=OD();Object.defineProperty(_,"isAny",{enumerable:!0,get:function(){return Sie.isAny}});var Pie=jD();Object.defineProperty(_,"isBoolean",{enumerable:!0,get:function(){return Pie.isBoolean}});var Aie=MD();Object.defineProperty(_,"isDate",{enumerable:!0,get:function(){return Aie.isDate}});var _ie=lk();Object.defineProperty(_,"isDefined",{enumerable:!0,get:function(){return _ie.isDefined}});var bie=cf();Object.defineProperty(_,"isNil",{enumerable:!0,get:function(){return bie.isNil}});var kie=hk();Object.defineProperty(_,"isNumber",{enumerable:!0,get:function(){return kie.isNumber}});var Rie=ND();Object.defineProperty(_,"isString",{enumerable:!0,get:function(){return Rie.isString}});var wie=DD();Object.defineProperty(_,"isUnknown",{enumerable:!0,get:function(){return wie.isUnknown}});var Eie=HD();Object.defineProperty(_,"isFunction",{enumerable:!0,get:function(){return Eie.isFunction}});var Tie=$D();Object.defineProperty(_,"isFile",{enumerable:!0,get:function(){return Tie.isFile}});var Cie=UD();Object.defineProperty(_,"isFileList",{enumerable:!0,get:function(){return Cie.isFileList}});var Iie=GD();Object.defineProperty(_,"isBlob",{enumerable:!0,get:function(){return Iie.isBlob}});var Lie=VD();Object.defineProperty(_,"isFormData",{enumerable:!0,get:function(){return Lie.isFormData}});var vie=JD();Object.defineProperty(_,"isURL",{enumerable:!0,get:function(){return vie.isURL}});var xie=XD();Object.defineProperty(_,"isURLSearchParams",{enumerable:!0,get:function(){return xie.isURLSearchParams}});var Wie=ZD();Object.defineProperty(_,"isMap",{enumerable:!0,get:function(){return Wie.isMap}});var Oie=QD();Object.defineProperty(_,"isSet",{enumerable:!0,get:function(){return Oie.isSet}});var jie=eH();Object.defineProperty(_,"isIndexSignature",{enumerable:!0,get:function(){return jie.isIndexSignature}});var Mie=tH();Object.defineProperty(_,"isError",{enumerable:!0,get:function(){return Mie.isError}});var Nie=Ak();Object.defineProperty(_,"isArrayWithEachItem",{enumerable:!0,get:function(){return Nie.isArrayWithEachItem}});var Die=_k();Object.defineProperty(_,"isNonEmptyArray",{enumerable:!0,get:function(){return Die.isNonEmptyArray}});var Hie=rH();Object.defineProperty(_,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return Hie.isNonEmptyArrayWithEachItem}});var Fie=nH();Object.defineProperty(_,"isTuple",{enumerable:!0,get:function(){return Fie.isTuple}});var $ie=mn();Object.defineProperty(_,"isNonNullObject",{enumerable:!0,get:function(){return $ie.isNonNullObject}});var zie=sH();Object.defineProperty(_,"isObjectWithEachItem",{enumerable:!0,get:function(){return zie.isObjectWithEachItem}});var Uie=iH();Object.defineProperty(_,"isPartialOf",{enumerable:!0,get:function(){return Uie.isPartialOf}});var Bie=aH();Object.defineProperty(_,"isPick",{enumerable:!0,get:function(){return Bie.isPick}});var Gie=lH();Object.defineProperty(_,"isOmit",{enumerable:!0,get:function(){return Gie.isOmit}});var Kie=cH();Object.defineProperty(_,"isNonEmptyString",{enumerable:!0,get:function(){return Kie.isNonEmptyString}});var Vie=dH();Object.defineProperty(_,"isNonNegativeNumber",{enumerable:!0,get:function(){return Vie.isNonNegativeNumber}});var qie=pH();Object.defineProperty(_,"isPositiveNumber",{enumerable:!0,get:function(){return qie.isPositiveNumber}});var Jie=uH();Object.defineProperty(_,"isNonPositiveNumber",{enumerable:!0,get:function(){return Jie.isNonPositiveNumber}});var Yie=mH();Object.defineProperty(_,"isNegativeNumber",{enumerable:!0,get:function(){return Yie.isNegativeNumber}});var Xie=gH();Object.defineProperty(_,"isInteger",{enumerable:!0,get:function(){return Xie.isInteger}});var Zie=fH();Object.defineProperty(_,"isPositiveInteger",{enumerable:!0,get:function(){return Zie.isPositiveInteger}});var Qie=yH();Object.defineProperty(_,"isNegativeInteger",{enumerable:!0,get:function(){return Qie.isNegativeInteger}});var eae=hH();Object.defineProperty(_,"isNonNegativeInteger",{enumerable:!0,get:function(){return eae.isNonNegativeInteger}});var tae=SH();Object.defineProperty(_,"isNonPositiveInteger",{enumerable:!0,get:function(){return tae.isNonPositiveInteger}});var rae=PH();Object.defineProperty(_,"isNumeric",{enumerable:!0,get:function(){return rae.isNumeric}});var oae=AH();Object.defineProperty(_,"isBooleanLike",{enumerable:!0,get:function(){return oae.isBooleanLike}});var nae=_H();Object.defineProperty(_,"isDateLike",{enumerable:!0,get:function(){return nae.isDateLike}});var sae=bH();Object.defineProperty(_,"isBigInt",{enumerable:!0,get:function(){return sae.isBigInt}});var iae=Lk();Object.defineProperty(_,"isOneOf",{enumerable:!0,get:function(){return iae.isOneOf}});var aae=RH();Object.defineProperty(_,"isOneOfTypes",{enumerable:!0,get:function(){return aae.isOneOfTypes}});var lae=wH();Object.defineProperty(_,"isIntersectionOf",{enumerable:!0,get:function(){return lae.isIntersectionOf}});var cae=EH();Object.defineProperty(_,"isExtensionOf",{enumerable:!0,get:function(){return cae.isExtensionOf}});var dae=TH();Object.defineProperty(_,"isNullOr",{enumerable:!0,get:function(){return dae.isNullOr}});var pae=CH();Object.defineProperty(_,"isUndefinedOr",{enumerable:!0,get:function(){return pae.isUndefinedOr}});var uae=IH();Object.defineProperty(_,"isNilOr",{enumerable:!0,get:function(){return uae.isNilOr}});var mae=LH();Object.defineProperty(_,"isAsserted",{enumerable:!0,get:function(){return mae.isAsserted}});var gae=vH();Object.defineProperty(_,"isEnum",{enumerable:!0,get:function(){return gae.isEnum}});var fae=xH();Object.defineProperty(_,"isEqualTo",{enumerable:!0,get:function(){return fae.isEqualTo}});var yae=WH();Object.defineProperty(_,"isRegex",{enumerable:!0,get:function(){return yae.isRegex}});var hae=jH();Object.defineProperty(_,"isPattern",{enumerable:!0,get:function(){return hae.isPattern}});var Sae=K();Object.defineProperty(_,"generateTypeGuardError",{enumerable:!0,get:function(){return Sae.generateTypeGuardError}});var Pae=MH();Object.defineProperty(_,"by",{enumerable:!0,get:function(){return Pae.by}});var Aae=NH();Object.defineProperty(_,"toNumber",{enumerable:!0,get:function(){return Aae.toNumber}});var _ae=DH();Object.defineProperty(_,"toDate",{enumerable:!0,get:function(){return _ae.toDate}});var bae=HH();Object.defineProperty(_,"toBoolean",{enumerable:!0,get:function(){return bae.toBoolean}});var kae=FH();Object.defineProperty(_,"isSymbol",{enumerable:!0,get:function(){return kae.isSymbol}})});var pa,$H,Rae,zH,UH=l(()=>{"use strict";pa=u(require("node:path")),$H=require("node:url"),Rae=()=>!0,zH=()=>{if(Rae()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?pa.default.dirname(pa.default.resolve(e)):pa.default.dirname(pa.default.resolve(__filename))}return pa.default.dirname((0,$H.fileURLToPath)(__agentWitchImportMetaUrl))}});var Kk,BH,V,GH,wae,zr,Vk,L,Xc,Ur,qk,Zc,ms,Jk,Yk,Xk,Qc,Ie,gn,qf,at,Jf,z,Zk=l(()=>{"use strict";Kk=u(require("node:fs")),BH=u(require("node:os")),V=u(require("node:path")),GH=u(da());Xe();UH();Dc();Dc();wae=zH(),zr=e=>e.trim().toLowerCase(),Vk=e=>zr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return V.default.resolve(e);let t=V.default.resolve(wae),r=V.default.basename(t),o=V.default.basename(V.default.dirname(t));return r===Qb&&(o===Hr||o===So)?V.default.dirname(t):r===Hr||r===So?t:V.default.join(BH.default.homedir(),Hr)},Xc=(e=L())=>V.default.join(e,Qb),Ur=(e=L())=>V.default.join(Xc(e),QN),qk=(e,t,r)=>t!==null?V.default.join(e,yt,t,r):V.default.join(e,r),Zc=e=>qk(e.installDir,e.profileEmail,Mc),ms=e=>qk(e.installDir,e.profileEmail,ur),Jk=e=>V.default.join(e.logsDir,is),Yk=e=>V.default.join(e.logsDir,as),Xk=e=>qk(e.installDir,e.profileEmail,Nc),Qc=e=>e.profileEmail!==null?V.default.join(e.installDir,yt,e.profileEmail,pn):V.default.join(e.installDir,pn),Ie=(e=L())=>ls(e),gn=(e=L())=>un(e)?Dg:Ng,qf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return zr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?zr(t):null},at=(e=L())=>{let t=V.default.join(e,Zb);if(!Kk.default.existsSync(t))return null;try{let r=JSON.parse(Kk.default.readFileSync(t,"utf8"));if((0,GH.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return zr(r.email)}catch{return null}return null},Jf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?zr(r):null}let t=qf();return t!==null?t:at()},z=e=>{let t=L(),r=Xc(t),o=Ur(t),n=Jf(e);if(n!==null){let y=V.default.join(t,yt,n),h=V.default.join(y,Hg),S=V.default.join(y,Mc),T=V.default.join(y,ss.projectDataDir),f=V.default.join(y,ur),b=V.default.join(y,Nc),I=V.default.join(y,pn),P=V.default.join(y,ur,is),v=V.default.join(y,ur,as);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:S,projectDataDir:T,logsDir:f,mainLogPath:P,errorLogPath:v,reportsDir:b,deviceKeypairPath:I,configPath:V.default.join(y,"config.json"),harnessRootDir:h,harnessManifestPath:V.default.join(h,$g),harnessSetsDir:V.default.join(h,Fg)}}let s=V.default.join(t,Hg),i=V.default.join(t,Mc),a=V.default.join(t,ss.projectDataDir),c=V.default.join(t,ur),d=V.default.join(t,Nc),p=V.default.join(t,pn),m=V.default.join(t,ur,is),g=V.default.join(t,ur,as);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:m,errorLogPath:g,reportsDir:d,deviceKeypairPath:p,configPath:V.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:V.default.join(s,$g),harnessSetsDir:V.default.join(s,Fg)}}});var ua,Qk=l(()=>{"use strict";ua=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var Eae,ma,eR=l(()=>{"use strict";Eae=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},ma=e=>e.filePort??Eae(e.envValue)??e.defaultPort});var tR,KH,Tae,ed,ga,VH=l(()=>{"use strict";tR=u(require("node:fs")),KH=u(require("node:path"));Xe();Zk();Qk();eR();Tae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ed=e=>{let t=KH.default.join(e,jc.wakePort);if(!tR.default.existsSync(t))return null;try{let r=JSON.parse(tR.default.readFileSync(t,"utf8"));if(Tae(r)&&ua(r.wakePort))return r.wakePort}catch{return null}return null},ga=(e=L())=>ma({filePort:ed(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:gn(e)})});var rR={};Mt(rR,{isAgentWitchLocalInstallDir:()=>un,isValidAgentWitchWakePort:()=>ua,readActiveProfileEmailFromFile:()=>at,readAgentWitchWakePortFromFile:()=>ed,resolveActiveProfileEmail:()=>Jf,resolveActiveProfileEmailFromEnv:()=>qf,resolveAgentWitchAppBundlePath:()=>Ur,resolveAgentWitchAppDir:()=>Xc,resolveAgentWitchDefaultWakePort:()=>gn,resolveAgentWitchDeviceKeypairPath:()=>Qc,resolveAgentWitchErrorLogPath:()=>Yk,resolveAgentWitchInstallDir:()=>L,resolveAgentWitchLaunchAgentPrefix:()=>Ie,resolveAgentWitchLocalLayout:()=>z,resolveAgentWitchLogsDir:()=>ms,resolveAgentWitchMainLogPath:()=>Jk,resolveAgentWitchProjectsDir:()=>Zc,resolveAgentWitchReportsDir:()=>Xk,resolveAgentWitchRuntimeWakePort:()=>ga,resolveAgentWitchWakePortFromSources:()=>ma,sanitizeProfileEmailForDir:()=>zr,sanitizeProfileEmailForLaunchAgentLabel:()=>Vk});var ee=l(()=>{"use strict";Zk();Qk();VH();eR()});var oR,nR,Yf=l(()=>{"use strict";oR=new Set(["","loginwindow","_mbsetupuser","root"]),nR=5e3});var qH,Cae,JH,sR,iR=l(()=>{"use strict";qH=require("node:child_process");Yf();Cae=e=>e.trim().toLowerCase(),JH=e=>e==null?!1:!oR.has(Cae(e)),sR=()=>{if(process.platform!=="darwin")return null;try{let t=(0,qH.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return JH(t)?t:null}catch{return null}}});var XH,YH,gr,td=l(()=>{"use strict";XH=u(require("node:os"));iR();YH=e=>e.trim().toLowerCase(),gr=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?sR():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??XH.default.userInfo().username;return YH(r)===YH(o)}});var ZH,QH,gs,eF=l(()=>{"use strict";ZH=require("node:child_process"),QH=u(require("node:fs"));ee();td();gs=(e=L())=>{let t=Ur(e);if(!QH.default.existsSync(t))return{ok:!1,errorMessage:"AgentWitch install not found."};if(!gr())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=at(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,ZH.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var aR,Jt,fa,tF=l(()=>{"use strict";aR="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",Jt=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[aR]==="1"},fa=e=>`Refusing ${e} host side effects under VITEST (set ${aR}=1 to override).`});var fs=l(()=>{"use strict";tF()});var rF,rd,Xf=l(()=>{"use strict";rF=require("node:child_process");fs();rd=e=>{if(process.platform!=="darwin"||!Jt())return;let t=process.getuid?.();if(t!==void 0)try{(0,rF.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Zf,lR,oF,ke,Qf,od=l(()=>{"use strict";Zf=u(require("node:fs")),lR=u(require("node:path"));ee();Xe();oF=e=>{let t=lR.default.join(e,yt);return Zf.default.existsSync(t)?Zf.default.readdirSync(t).filter(r=>Zf.default.statSync(lR.default.join(t,r)).isDirectory()).map(r=>zr(r)).toSorted():[]},ke=(e=L())=>{let t=Ie(e),r=oF(e);return[{profileEmail:at(e)??r[0]??null,launchAgentLabel:t}]},Qf=(e=L())=>oF(e)});var cR,nF,sF,Iae,Po,ey=l(()=>{"use strict";cR=u(require("node:fs")),nF=u(require("node:os")),sF=u(require("node:path"));ee();od();Iae=()=>sF.default.join(nF.default.homedir(),"Library","LaunchAgents"),Po=(e=L())=>{let t=Ie(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ke(e))r.add(n.launchAgentLabel);let o=Iae();if(cR.default.existsSync(o))for(let n of cR.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var iF,nd,aF=l(()=>{"use strict";ee();Xf();ey();od();iF=(e=L())=>{let t=new Set(ke(e).map(r=>r.launchAgentLabel));return Po(e).filter(r=>!t.has(r))},nd=(e=L())=>{for(let t of iF(e))rd(t)}});var sd,dR=l(()=>{"use strict";ee();Xf();ey();sd=(e=L())=>{for(let t of Po(e))rd(t)}});var lF,cF,Lae,ys,dF=l(()=>{"use strict";lF=require("node:child_process"),cF=require("node:util"),Lae=(0,cF.promisify)(lF.execFile),ys=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Lae("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var hs,vae,pR,uR=l(()=>{"use strict";hs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vae=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,pR=e=>{let t=e.pathValue??vae(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${hs(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${hs(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${hs(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${hs(e.homeDir)}</string>
    <key>PATH</key>
    <string>${hs(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${hs(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${hs(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var ty,mR=l(()=>{"use strict";ty=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var id,gR,ry,oy,Ao,ny=l(()=>{"use strict";id=u(require("node:fs")),gR=u(require("node:os")),ry=u(require("node:path"));Xe();ee();uR();mR();oy=(e,t=gR.default.homedir())=>ry.default.join(t,"Library","LaunchAgents",`${e}.plist`),Ao=e=>{let t=e.installDir??L(),r=e.homeDir??gR.default.homedir(),o=oy(e.launchAgentLabel,r),n=id.default.existsSync(o)?id.default.readFileSync(o,"utf8"):null;if(n!==null&&ty(n))return{ok:!0,rewritten:!1,plistPath:o};let s=pR({launchAgentLabel:e.launchAgentLabel,runPath:ry.default.join(t,ZN,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??ga(t)});if(!ty(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{id.default.mkdirSync(ry.default.dirname(o),{recursive:!0}),id.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var uF,mF,gF,ad,xae,Wae,pF,lt,fR=l(()=>{"use strict";uF=require("node:child_process"),mF=u(require("node:fs")),gF=require("node:util");ee();fs();ny();td();ad=(0,gF.promisify)(uF.execFile),xae=async e=>{try{return await ad("launchctl",["print",e]),!0}catch{return!1}},Wae=async(e,t,r)=>{await xae(t)&&await ad("launchctl",["bootout",t]).catch(()=>{}),await ad("launchctl",["bootstrap",e,r]),await ad("launchctl",["enable",t])},pF=async e=>{try{return await ad("launchctl",["kickstart","-k",e]),!0}catch{return!1}},lt=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Jt())return{ok:!1,errorMessage:fa("launchctl")};if(!gr())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Ao({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await pF(n))return{ok:!0};let i=s.plistPath;if(!mF.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Wae(o,n,i),await pF(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Ss,fF=l(()=>{"use strict";ee();fR();od();Ss=async(e=L(),t=process.platform)=>{if(t!=="darwin")return[];let r=[];for(let o of ke(e))(await lt(o.launchAgentLabel,e)).ok&&r.push(o.launchAgentLabel);return r}});var sy,ya,yF,hF,SF,PF=l(()=>{"use strict";sy=require("node:child_process"),ya=u(require("node:fs")),yF="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",hF=e=>{try{return(0,sy.execFileSync)("plutil",["-extract",yF,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},SF=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=ya.default.statSync(e);try{ya.default.copyFileSync(e,r),(0,sy.execFileSync)("plutil",["-replace",yF,"-string",String(t),r],{stdio:"ignore"}),(0,sy.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),ya.default.chmodSync(r,o&4095),ya.default.renameSync(r,e)}finally{ya.default.rmSync(r,{force:!0})}}});var AF,_F=l(()=>{"use strict";ee();AF=e=>ua(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var bF,kF,Oae,ld,RF=l(()=>{"use strict";bF=u(require("node:fs")),kF=u(require("node:os"));PF();_F();ny();Oae=(e,t)=>{let r=AF({filePort:t,plistValue:hF(e)});return r.kind!=="sync"?!1:(SF(e,r.wakePort),!0)},ld=e=>{let t=e.homeDir??kF.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>oy(o,t)).filter(o=>bF.default.existsSync(o)).filter(o=>Oae(o,e.wakePort))}});var Dt,_o,wF=l(()=>{"use strict";dR();td();Yf();Dt=e=>{gr()||(sd(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},_o=(e,t=nR)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{gr()||e()},t);return()=>{clearInterval(r)}}});var Ae=l(()=>{"use strict";mD();eF();Xf();aF();dR();ey();td();dF();fF();fR();ny();mR();RF();uR();od();iR();Yf();wF()});var yR=l(()=>{"use strict";Ae()});var cd,EF,iy,TF,ha,CF,IF,fn=l(()=>{"use strict";cd=".agent-witch",EF="memory",iy="project.json",TF="chunks.ndjson",ha="runs.ndjson",CF="reports",IF=".json"});var LF=l(()=>{"use strict";fn()});var vF,ay,hR=l(()=>{"use strict";vF=u(require("node:path"));LF();ay=(e,t)=>vF.default.join(e.trim(),`${t.trim()}${IF}`)});var dd,xF,WF=l(()=>{"use strict";dd="agent-witch.js",xF="command"});var ly=l(()=>{"use strict";WF()});var Ps,OF,jF=l(()=>{"use strict";ly();Ps=e=>`'${e.replace(/'/g,"'\\''")}'`,OF=e=>{let t=`${e.installDir.trim()}/${"app"}/${dd}`,r=[Ps("node"),Ps(t),"report","write","--key",Ps(e.reportKey.trim()),"--agent-run-id",Ps(e.agentRunId.trim()),"--status",Ps(e.status),"--summary",Ps(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Ps(e.details.trim())),r.join(" ")}});var Br,MF,jae,SR,cy=l(()=>{"use strict";hR();jF();Br={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},MF=e=>e===Br.COMPLETED||e===Br.FAILED,jae=e=>["Maintain a machine-readable job report so the user can check status later.","AgentWitch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),SR=(e,t)=>{let r=ay(t.reportsDir,t.reportKey),o=OF({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Br.IN_PROGRESS,summary:"Task started on your computer."});return`${e.trim()}

---
${jae({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var ct=l(()=>{"use strict";Xe();ee()});var ud,DF,NF,HF,Mae,Sa,Nae,FF,md,gd,PR,$F,zF,fd=l(()=>{"use strict";ud=u(require("node:fs")),DF=u(require("node:path"));cy();hR();ct();NF=50,HF=e=>{let t=z(),r=ay(t.reportsDir,e);return ud.default.mkdirSync(DF.default.dirname(r),{recursive:!0}),r},Mae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Sa=e=>{let t=HF(e);if(!ud.default.existsSync(t))return null;try{let r=JSON.parse(ud.default.readFileSync(t,"utf8"));return Mae(r)?r:null}catch{return null}},Nae=(e,t)=>{let r=[...e,t];return r.length>NF?r.slice(r.length-NF):r},FF=e=>{let t=HF(e.reportKey);ud.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},md=e=>{let t=Sa(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Nae(t?.history??[],o)};return FF(n),n},gd=e=>{let t=Sa(e.reportKey);return t!==null?t:md({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Br.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},PR=(e,t)=>{let r=t.trim();if(r.length===0)return Sa(e);let o=Sa(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return FF(s),s},$F=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},zF=e=>{if(e===null||!MF(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Br.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Dae,Hae,yd,UF,dy,AR=l(()=>{"use strict";cy();fd();Dae=new Set(Object.values(Br)),Hae=e=>Dae.has(e),yd=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},UF=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},dy=e=>{if(e[0]!=="write")return UF(),1;let r=yd(e,"--key"),o=yd(e,"--agent-run-id"),n=yd(e,"--status"),s=yd(e,"--summary"),i=yd(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!Hae(n)?(UF(),1):(md({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ht,As=l(()=>{"use strict";Ht=()=>!0});var _R,BF,_s,py=l(()=>{"use strict";_R=u(require("node:path")),BF=require("node:url");As();_s=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=_R.default.resolve(t);return Ht()?r===_R.default.resolve(__filename):e===void 0?!1:r===(0,BF.fileURLToPath)(e)}});var bR,kR,RR,wR,Me,ER=l(()=>{"use strict";bR=["block","warn","info"],kR=["seed","project","retired"],RR="warn",wR="29b404a2-d2be-45bf-8f88-143b675a94f2",Me={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var TR,bo,qF,JF,CR,yn,YF=l(()=>{"use strict";ER();TR=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bo=e=>typeof e=="string"?e:null,qF=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],JF=e=>{if(!TR(e))return null;let t=bo(e.id)?.trim()??"",r=bo(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=kR.find(d=>d===e.source)??"project",n=bR.find(d=>d===e.severity)??RR,s=TR(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=bo(s?.value)?.trim()??"",c=bo(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:bo(e.cause)?.trim()??"",avoidance:bo(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:qF(e.keywords),tags:qF(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:bo(e.lastSeenAt),updatedAt:bo(e.updatedAt),severity:n}},CR=e=>!TR(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>JF(t)).filter(t=>t!==null),syncedAt:bo(e.syncedAt)},yn=e=>e.filter(t=>t.source!=="retired").length});var bs,IR=l(()=>{"use strict";bs=e=>e.replace(/\s+/g," ").trim()});var fr,LR=l(()=>{"use strict";fr=e=>Math.ceil(e.length/4)});var uy,XF=l(()=>{"use strict";LR();uy=(e,t)=>{if(t<=0)return"";if(fr(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var hd,ZF=l(()=>{"use strict";IR();hd=e=>`${bs(e.id)}|${bs(e.avoidance)}`});var QF=l(()=>{"use strict"});var ht=l(()=>{"use strict";ER();YF();IR();LR();XF();ZF();QF()});var ks,Pa,Aa,_a,Sd,my,e$,t$,r$,o$,n$,Pd,Ad,gy,ba,fy,vR,yr=l(()=>{"use strict";ks="agent-witch-token-saver",Pa=`# BEGIN ${ks}`,Aa=`# END ${ks}`,_a=`<!-- BEGIN ${ks} -->`,Sd=`<!-- END ${ks} -->`,my=".cursor/rules/agent-witch-check-context.mdc",e$=".cursor/mcp.json",t$=".codex/config.toml",r$=".codex/AGENTS.md",o$=".claude/settings.json",n$="declined-projects.json",Pd="agent-witch",Ad="agent-witch",gy=["mcp"],ba="mcp-hook",fy="check_context",vR=`${Ad} ${ba} ${fy}`});var yy,hy,Sy,ka,xR,_d,Py=l(()=>{"use strict";ht();yr();yy=Me.symptom,hy=Me.cause,Sy=Me.avoidance,ka=64,xR="token-saver.db",_d=1});var Ay,Ra,Uae,ATe,wa=l(()=>{"use strict";Ay="agent-witch.js",Ra="deps.tar.gz",Uae="install.sh",ATe={mainScript:`app/${Ay}`,depsArchive:`app/${Ra}`,installShell:Uae}});var s$=l(()=>{"use strict";wa()});var i$=l(()=>{"use strict";wa();s$()});var bd,OR,_y,Bae,kd,Ze,Ta,Rd,wd,Rs,jR=l(()=>{"use strict";bd=u(require("node:fs")),OR=u(require("node:path"));i$();ee();_y="install-version.json",Bae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kd=(e=L())=>OR.default.join(e,_y),Ze=(e=L())=>{let t=kd(e);if(!bd.default.existsSync(t))return null;try{let r=JSON.parse(bd.default.readFileSync(t,"utf8"));return!Bae(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ta=(e,t=L())=>{let r=kd(t);bd.default.mkdirSync(OR.default.dirname(r),{recursive:!0}),bd.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Rd=(e=L())=>Ze(e)?.bundleVersion??"274",wd=(e,t)=>{let r=Ze(e);if(r!==null)return r;let o={bundleVersion:"274",appOrigin:t,updatedAt:new Date().toISOString()};return Ta(o,e),o},Rs=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var a$,ws,MR,NR,DR,by,Gr,Es,HR=l(()=>{"use strict";a$=require("node:crypto"),ws=u(require("node:fs")),MR=u(require("node:path"));ee();NR="self-update-log.ndjson",DR=100,by=(e=L())=>{let t=z(),r=t.installDir===e?t.logsDir:ms({installDir:e,profileEmail:t.profileEmail});return MR.default.join(r,NR)},Gr=(e,t=L())=>{let r={id:(0,a$.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=by(t);ws.default.mkdirSync(MR.default.dirname(o),{recursive:!0});let n=ws.default.existsSync(o)?ws.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-DR+1)),JSON.stringify(r)];return ws.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Es=(e=20,t=L())=>{let r=by(t);if(!ws.default.existsSync(r))return[];let o=ws.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var FR,NTe,$R=l(()=>{"use strict";wa();FR="deps",NTe=`${"app"}/${Ra}`});var l$=l(()=>{"use strict";$R()});var c$,hn,Ts,d$,zR,UR,p$=l(()=>{"use strict";c$=require("node:child_process"),hn=u(require("node:fs")),Ts=u(require("node:path"));wa();$R();d$=e=>Ts.default.join(e,"app",FR),zR=e=>{let t=Ts.default.join(e,"app"),r=Ts.default.join(t,Ra);hn.default.existsSync(r)&&(hn.default.rmSync(d$(e),{recursive:!0,force:!0}),hn.default.mkdirSync(t,{recursive:!0}),(0,c$.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),hn.default.rmSync(r,{force:!0}))},UR=e=>{hn.default.rmSync(Ts.default.join(e,"node_modules"),{recursive:!0,force:!0}),hn.default.rmSync(Ts.default.join(e,"package.json"),{force:!0}),hn.default.rmSync(Ts.default.join(e,"package-lock.json"),{force:!0})}});var u$=l(()=>{"use strict";l$();p$()});var m$=l(()=>{"use strict";sa()});var ky,Ry,wy=l(()=>{"use strict";ky="AGENT_WITCH_EXTERNAL_BRIDGE",Ry="AGENT_WITCH_EXTERNAL_LIVE"});var g$=l(()=>{"use strict";wy();sa()});var f$,Ed,y$=l(()=>{"use strict";f$=require("node:child_process");sa();Ed=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,f$.spawn)("systemctl",["--user","restart",Fr],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${Fr} exited ${o??"unknown"}`))})})});var BR=l(()=>{"use strict";sa();m$();g$();y$()});var Xt,Ca=l(()=>{"use strict";Xt=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Td,Ey,h$,Kae,GR,Vae,S$,qae,qR,Jae,JR,hr,Cd,Id,YR,KR,VR,Ld,vd,XR,ZR,Ia=l(()=>{"use strict";Td=u(require("node:fs")),Ey=u(require("node:path"));Ca();h$="active-writer-work.json",Kae=1440*60*1e3,GR=new Set,Vae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),S$=e=>e.profileEmail===null?Ey.default.join(e.installDir,h$):Ey.default.join(e.installDir,"profiles",e.profileEmail,h$),qae=e=>{let t=S$(e);if(!Td.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Td.default.readFileSync(t,"utf8"));if(!Vae(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},qR=(e,t)=>{let r=S$(e);Td.default.mkdirSync(Ey.default.dirname(r),{recursive:!0}),Td.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Jae=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??Xt;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>Kae},JR=e=>{let t=qae(e);if(!Jae(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{qR(e,r)}catch{}return r},hr=e=>JR(e).activeCount>0,Cd=e=>{let t=JR(e);qR(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},Id=e=>{let t=JR(e),r=Math.max(0,t.activeCount-1);if(qR(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of GR)o()},YR=e=>(GR.add(e),()=>{GR.delete(e)}),KR=null,VR=null,Ld=e=>{KR=e},vd=e=>{VR=e},XR=()=>{let e=KR;return KR=null,e},ZR=()=>{let e=VR;return VR=null,e}});var Qe,Ty=l(()=>{"use strict";Qe=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var La,Cy,xd,QR=l(()=>{"use strict";La="qwen2.5:7b",Cy="nomic-embed-text",xd="Install Ollama from https://ollama.com/download"});var Wd,ew,Iy=l(()=>{"use strict";QR();Wd=()=>`
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
    echo "Ollama is missing. ${xd}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${xd}" >&2
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
  agent_witch_ensure_ollama_model "${La}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Cy}" "\${pull_log}"
}
`,ew=()=>`
${Wd()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. AgentWitch will continue without it." >&2
`});var P$,Yae,Ly,tw=l(()=>{"use strict";P$=require("node:child_process");ee();fs();Iy();Yae=e=>new Promise(t=>{if(!Jt()){t({exitCode:1,output:fa("Ollama")});return}let r=(0,P$.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Ly=async(e=Yae)=>{let t=`${Wd()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Sn,vy,A$,Xae,_$,xa,Zae,Qae,ele,va,Cs,Is,b$=l(()=>{"use strict";Sn=u(require("node:fs")),vy=u(require("node:path"));u$();BR();Ae();ee();wa();mr();jR();Ia();Ty();HR();tw();A$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xae=e=>{let t=at(e),r=t===null?z():z(t);if(!Sn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Sn.default.readFileSync(r.configPath,"utf8"));return!A$(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},_$=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!A$(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},xa=async e=>(await _$(e))?.bundleVersion??null,Zae=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=vy.default.join(t,r);Sn.default.mkdirSync(vy.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Sn.default.writeFileSync(n,s),r.endsWith(".js")&&Sn.default.chmodSync(n,493)},Qae=async()=>{if(process.platform==="linux"){try{await Ed()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}nd(),await Ss()},ele=(e,t)=>e!==null?Qe(e):t??Nt,va=(e,t)=>({localBundleVersion:t,...e}),Cs=async e=>{let t=L(),r=Ze(t),o=r?.bundleVersion??null,n=await Ly();Gr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=Xae(t),i=ele(s,r?.appOrigin);if(i===null){let d=va({ok:!1,updated:!1,message:"Could not resolve the AgentWitch app origin for updates.",remoteBundleVersion:null},o);return Gr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await _$(i);if(a===null){let d=va({ok:!1,updated:!1,message:"Could not fetch the remote AgentWitch install bundle.",remoteBundleVersion:null},o);return Gr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||Rs(o,a.bundleVersion))){let d=va({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Gr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let g of a.scripts)await Zae(i,t,g);let d=vy.default.join(t,Ay);Sn.default.existsSync(d)&&Sn.default.rmSync(d,{force:!0}),zR(t),UR(t),Ta({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=z(at(t));if(hr(p)){vd("install-bundle-update");let g=va({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Gr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}await Qae();let m=va({ok:!0,updated:!0,message:`Updated AgentWitch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Gr({event:"update_applied",ok:!0,message:m.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}catch(d){let p=d instanceof Error?d.message:"AgentWitch self-update failed.",m=va({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return Gr({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},Is=()=>{let e=L();return{local:Ze(e),logs:Es(20,e)}}});var k$={};Mt(k$,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>_y,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>xd,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Cy,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>La,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>NR,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>DR,appendAgentWitchSelfUpdateLog:()=>Gr,buildAgentWitchEnsureOllamaShell:()=>Wd,buildAgentWitchInstallScriptOllama:()=>ew,buildAgentWitchSelfUpdateStatus:()=>Is,ensureAgentWitchInstallVersionRecorded:()=>wd,ensureAgentWitchOllamaInstalled:()=>Ly,fetchAgentWitchRemoteInstallBundleVersion:()=>xa,isRemoteAgentWitchBundleVersionNewer:()=>Rs,readAgentWitchInstallVersion:()=>Ze,readAgentWitchSelfUpdateLogs:()=>Es,resolveAgentWitchAppOriginFromWsUrl:()=>Qe,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Rd,resolveAgentWitchInstallVersionPath:()=>kd,resolveAgentWitchSelfUpdateLogPath:()=>by,runAgentWitchSelfUpdate:()=>Cs,writeAgentWitchInstallVersion:()=>Ta});var Kr=l(()=>{"use strict";jR();HR();b$();Ty();QR();Iy();tw()});var rw={};Mt(rw,{buildAgentWitchSelfUpdateStatus:()=>Is,fetchAgentWitchRemoteInstallBundleVersion:()=>xa,runAgentWitchSelfUpdate:()=>Cs});var ow=l(()=>{"use strict";Kr()});function Wa(e){return(0,R$.createHash)("sha256").update(e.trim()).digest("hex")}var R$,xy=l(()=>{"use strict";R$=require("node:crypto")});var Oa,Od,tle,ja,nw,Wy=l(()=>{"use strict";Oa=u(require("node:fs")),Od=u(require("node:path"));xy();ct();tle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ja=e=>{if(!Oa.default.existsSync(e))return null;try{let t=JSON.parse(Oa.default.readFileSync(e,"utf8"));return!tle(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Wa(t.pairingToken.trim())}catch{return null}},nw=(e=L())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(ja(Od.default.join(e,"config.json")));let n=Od.default.join(e,yt);if(!Oa.default.existsSync(n))return t;for(let s of Oa.default.readdirSync(n)){let i=Od.default.join(n,s);Oa.default.statSync(i).isDirectory()&&o(ja(Od.default.join(i,"config.json")))}return t}});var Ma,jd=l(()=>{"use strict";Ma="connection-health.json"});var Ls,Oy,rle,Md,$e,sw,jy,et,My=l(()=>{"use strict";Ls=u(require("node:fs")),Oy=u(require("node:path"));jd();rle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Md=e=>e.profileEmail===null?Oy.default.join(e.installDir,Ma):Oy.default.join(e.installDir,"profiles",e.profileEmail,Ma),$e=e=>{let t=Md(e);if(!Ls.default.existsSync(t))return null;try{let r=JSON.parse(Ls.default.readFileSync(t,"utf8"));return!rle(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},sw=e=>{let t=Md(e);Ls.default.existsSync(t)&&Ls.default.rmSync(t,{force:!0})},jy=(e,t)=>{let r=Md(e),o=$e(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Ls.default.mkdirSync(Oy.default.dirname(r),{recursive:!0}),Ls.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},et=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var Nd,w$=l(()=>{"use strict";jd();My();Nd=(e,t)=>{if(!t.socketOpen)return!1;let r=$e(e);return r===null?!1:!et(r,t.staleAfterMs??12e4,t.nowMs)}});var iw,E$=l(()=>{"use strict";My();iw=(e,t)=>!(e!==null&&!et(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var vs=l(()=>{"use strict";My();w$();E$();jd()});var Ny,aw,ole,nle,T$,C$=l(()=>{"use strict";Ny=u(require("node:fs")),aw=u(require("node:path"));ee();Xe();vs();Wy();ole=12e4,nle=e=>{let t=aw.default.join(e,yt);return Ny.default.existsSync(t)?Ny.default.readdirSync(t).filter(r=>Ny.default.statSync(aw.default.join(t,r)).isDirectory()):[]},T$=(e=L())=>{let t=null,r=-1;for(let o of nle(e)){let n=z(o),s=$e(n);if(s===null||et(s,ole))continue;let i=ja(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var xs,lw=l(()=>{"use strict";xs={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var I$,sle,ile,L$,ale,cw,v$=l(()=>{"use strict";lw();I$=/you(?:'|')ve hit your session limit/i,sle=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],ile=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,L$=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},ale=e=>{let t=ile.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},cw=e=>{let t=e.trim();if(t.length===0)return null;if(I$.test(t))return{code:xs.SESSION_LIMIT,resetHint:ale(t),matchedLine:L$(t,I$)};for(let r of sle)if(r.test(t))return{code:xs.PROVIDER_QUOTA,resetHint:null,matchedLine:L$(t,r)};return null}});var Dy,Hy,dw,pw=l(()=>{"use strict";Dy="[[AGENT_RUN_WRITER_EXECUTION]]",Hy="cli-writer-api-key-missing",dw="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var uw=l(()=>{"use strict";pw()});var x$=l(()=>{"use strict";uw()});var ue,mw=l(()=>{"use strict";ue={FOLDER_REQUIRED:"folder_required",FOLDER_NOT_REGISTERED:"folder_not_registered",FOLDER_NOT_FOUND:"folder_not_found",FOLDER_CHECK_UNAVAILABLE:"folder_check_unavailable",CODING_TOOLS_PAUSED:"coding_tools_paused"}});var Ws,gw=l(()=>{"use strict";Ws={computerFallback:"This computer",folderNotAllowed:"Blocked: that folder isn't this project's folder on {computer}. Nothing ran.",folderMissing:"This project has no folder on {computer} yet. Set it in AgentWitch Local, then send the task again.",folderMissingReason:"Set this project's folder on {computer} first.",pauseLabel:"Pause all coding tools",pauseHint:"Running tasks stop. New tasks wait until you turn this off.",pauseStatus:"Paused",pauseReason:"Paused on {computer}. Turn it back on in AgentWitch Local.",secretHidden:"Output hidden: it looked like it had a secret. Open the report on {computer}.",folderCheckUnavailablePlaceholder:"Couldn't check this project's folder on {computer}. Nothing ran."}});var dle,Na,Os,W$=l(()=>{"use strict";mw();gw();dle={[ue.FOLDER_REQUIRED]:"folderMissing",[ue.FOLDER_NOT_FOUND]:"folderMissing",[ue.FOLDER_NOT_REGISTERED]:"folderNotAllowed",[ue.FOLDER_CHECK_UNAVAILABLE]:"folderCheckUnavailablePlaceholder",[ue.CODING_TOOLS_PAUSED]:"pauseReason"},Na=(e,t=Ws.computerFallback)=>Ws[e].replace("{computer}",t),Os=(e,t)=>Na(dle[e],t)});var Vr,j$,O$,ple,fw,M$,yw=l(()=>{"use strict";Vr="[redacted-secret]",j$="[redacted-private-key]",O$="(?!\\[redacted)",ple="(?:[A-Z0-9]+_)*(?:KEY|APIKEY|SECRET|TOKEN|PASSWORD|PASSWD|PAT|CREDENTIALS?)(?:_[A-Z0-9]+)*",fw=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----(?:[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----|[\s\S]*$)/g,replacement:j$},{pattern:new RegExp(`^(\\s*(?:export\\s+)?${ple}\\s*=\\s*)${O$}(["']?)[^\\s"'#]{4,}\\2`,"gm"),replacement:`$1${Vr}`},{pattern:/("?pairing_?token"?\s*[:=]\s*"?)(?!\[redacted)[^\s",}]{6,}/gi,replacement:`$1${Vr}`},{pattern:/\bsk-[A-Za-z0-9_-]{20,}/g,replacement:Vr},{pattern:/\bgithub_pat_[A-Za-z0-9_]{20,}/g,replacement:Vr},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:Vr},{pattern:/\bxox[a-z]-[A-Za-z0-9-]{10,}/g,replacement:Vr},{pattern:/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,replacement:Vr},{pattern:/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{8,}=*/gi,replacement:`Bearer ${Vr}`},{pattern:new RegExp(`\\b(api[_-]?key|secret|token|password|passwd|credential)(["']?\\s*[:=]\\s*)${O$}(["']?)[^\\s"'\\\\(),;]{8,}\\3`,"gi"),replacement:`$1$2${Vr}`}],M$=[/-----(?:BEGIN|END) [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[A-Za-z0-9_-]{20,}/,/\bgithub_pat_[A-Za-z0-9_]{20,}/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[a-z]-[A-Za-z0-9-]{10,}/,/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{12,}/i]});var Dd,Pn,Hd,N$=l(()=>{"use strict";yw();Dd=e=>M$.some(t=>t.test(e)),Pn=e=>{let t={replacements:0},r=fw.reduce((o,n)=>o.replace(n.pattern,(...s)=>{t.replacements+=1;let i=s.slice(1,-2).map(a=>typeof a=="string"?a:"");return n.replacement.replace(/\$(\d)/g,(a,c)=>i[Number(c)-1]??"")}),e);return{scrubbed:r,residualSecret:Dd(r),replacementCount:t.replacements}},Hd=(e,t)=>{let r=Pn(e);return r.residualSecret?t:r.scrubbed}});var St=l(()=>{"use strict";lw();v$();pw();uw();x$();mw();gw();W$();yw();N$()});var Fd,D$,H$,Fy=l(()=>{"use strict";Fd={maxTurns:30,maxMinutes:30,maxBudgetUsd:2},D$=["Read","Glob","Grep","Edit","Write","TodoWrite","Bash(git status *)","Bash(git diff *)","Bash(git log *)","Bash(git show *)"],H$=124});var hw,F$,$y,$d,zd,ule,mle,gle,$$,Ne,Re,zy,fle,yle,hle,Zt,Sr=l(()=>{"use strict";hw=u(require("node:fs")),F$=u(require("node:os")),$y=u(require("node:path"));Fy();$d={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},zd=e=>e.trim().length>0,ule=e=>{let t=$y.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},mle=()=>{let e=F$.default.homedir(),t=$y.default.join(e,".local","bin","agent");if(hw.default.existsSync(t))return t;let r=$y.default.join(e,".local","bin","cursor-agent");return hw.default.existsSync(r)?r:$d.cursorCommand},gle=e=>{let t=e.trim();return!zd(t)||t===$d.cursorCommand?mle():t},$$=(e,t)=>ule(e)?t:["agent",...t],Ne=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Re=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:zd(t)?t.trim():$d.claudeCommand,codexCommand:zd(r)?r.trim():$d.codexCommand,cursorCommand:gle(o),antigravityCommand:zd(n)?n.trim():$d.antigravityCommand}},zy=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:$$(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},fle=["--permission-mode","dontAsk","--allowedTools",D$.join(","),"--max-turns",String(Fd.maxTurns),"--max-budget-usd",Fd.maxBudgetUsd.toFixed(2)],yle=["-s","workspace-write","-c",'approval_policy="never"'],hle=["--trust","--sandbox","enabled"],Zt=(e,t,r,o)=>{let n=t.trim();if(!zd(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json",...fle,n]}:e==="codex"?{command:r.codexCommand,args:["exec",...yle,n]}:e==="cursor"?{command:r.cursorCommand,args:$$(r.cursorCommand,[...s,"-p",...hle,n])}:{command:r.antigravityCommand,args:[...s,"--sandbox","-p",n]}}});var An,Sle,js,Ple,Da,Ud=l(()=>{"use strict";An=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,Sle=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:An(s.inputTokens)+An(s.outputTokens)+An(s.cacheReadInputTokens)+An(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},js=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=An(a.input_tokens)+An(a.cache_creation_input_tokens)+An(a.cache_read_input_tokens),d=An(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:Sle(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},Ple=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Da=(e,t)=>{let r=js(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??Ple(r)}}});var Sw,Ale,_le,Pw,Aw=l(()=>{"use strict";Sw=e=>e.toLocaleString("en-US"),Ale=e=>e<.01?e.toFixed(4):e.toFixed(3),_le=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Ale(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Sw(e.inputTokens)} in / ${Sw(e.outputTokens)} out (${Sw(e.totalTokens)} total)`,t].join(`
`)},Pw=(e,t)=>{if(t===void 0)return e;let r=_le(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Uy,_w=l(()=>{"use strict";Uy={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Ms,bw,By,kw=l(()=>{"use strict";_w();Ms="auto",bw=e=>({value:Ms,label:`Auto (${Uy[e]})`}),By={anthropic:[bw("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[bw("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[bw("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Ha,Bd,Gy,Fa=l(()=>{"use strict";_w();kw();Ha=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Ms))return t},Bd=(e,t)=>{let r=Ha(t);return r===void 0?Uy[e]:r},Gy=e=>{let t=Ha(e);return t===void 0?Ms:t}});var Ky,ble,kle,Vy,z$=l(()=>{"use strict";Ky={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},ble=e=>{let t=Ky[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Ky["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Ky["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Ky["gemini-2.0-flash"]:null},kle=(e,t,r)=>{let o=ble(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Vy=e=>{let t=kle(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var $a,Rle,wle,Ele,qy,U$=l(()=>{"use strict";z$();$a=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),Rle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=$a(r.input_tokens),n=$a(r.output_tokens);return o===0&&n===0?null:Vy({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},wle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=$a(r.prompt_tokens),n=$a(r.completion_tokens);return o===0&&n===0?null:Vy({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Ele=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=$a(r.promptTokenCount),n=$a(r.candidatesTokenCount);return o===0&&n===0?null:Vy({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},qy=(e,t,r)=>e==="anthropic"?Rle(t,r):e==="openai"?wle(t,r):Ele(t,r)});var Tle,Rw,Cle,Ile,Lle,vle,xle,ww,Ew=l(()=>{"use strict";Fa();U$();Tle=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Rw=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Bd(e,t.model)},Cle=async e=>{let t=Rw("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=Tle(o);n.length>0&&e.onChunk?.(n);let s=qy("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},Ile=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},Lle=async e=>{let t=Rw("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=Ile(o);n.length>0&&e.onChunk?.(n);let s=qy("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},vle=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},xle=async e=>{let t=Rw("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=vle(n);s.length>0&&e.onChunk?.(s);let i=qy("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},ww=async e=>{try{return e.provider==="anthropic"?await Cle(e):e.provider==="openai"?await Lle(e):await xle(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Ft,Gd=l(()=>{"use strict";Ft=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var B$,Wle,Jy,Tw=l(()=>{"use strict";B$=u(require("node:path")),Wle="writer-api-secrets.json",Jy=e=>B$.default.join(e,Wle)});var Cw,G$,Ole,_n,Et,bn=l(()=>{"use strict";Cw=u(require("node:fs"));Fa();Tw();G$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ole=e=>{if(!G$(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Ha(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},_n=e=>{let t=Jy(e);if(!Cw.default.existsSync(t))return{};try{let r=JSON.parse(Cw.default.readFileSync(t,"utf8"));if(!G$(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=Ole(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Et=(e,t)=>_n(e)[t]??null});var dt,Kd=l(()=>{"use strict";dt=e=>e==="api"?"api":"cli"});var K$,rt,Ns,ko=l(()=>{"use strict";K$=u(require("node:path"));Gd();bn();Kd();rt=e=>K$.default.dirname(e),Ns=(e,t)=>{if(dt(e.writerExecutionBackend)!=="api")return!1;let r=Ft(t);if(r===null)return!1;let o=rt(e.layout.configPath),n=Et(o,r);return n!==null&&n.apiKey.length>0}});var Vd,Iw=l(()=>{"use strict";Aw();Ew();Gd();bn();ko();Vd=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Ft(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=rt(e.layout.configPath),a=Et(i,s);if(a===null){let d=Object.keys(_n(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in AgentWitch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await ww({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Pw(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var jle,V$,q$,J$=l(()=>{"use strict";jle={paused:!1,updatedAt:null},V$={paused:!0,updatedAt:null},q$=e=>{if(e===null)return jle;try{let t=JSON.parse(e);if(typeof t!="object"||t===null||typeof t.paused!="boolean")return V$;let r=t;return{paused:r.paused,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:null}}catch{return V$}}});var qd,Yy,Mle,Nle,Lw,Dle,Ds,Ro,vw,Xy=l(()=>{"use strict";qd=u(require("node:fs")),Yy=u(require("node:path"));J$();Mle="coding-tools-pause.json",Nle="unreadable",Lw=e=>Yy.default.join(Yy.default.dirname(e),Mle),Dle=e=>{try{return qd.default.readFileSync(e,"utf8")}catch(t){return t.code==="ENOENT"?null:Nle}},Ds=e=>q$(Dle(Lw(e))),Ro=e=>Ds(e).paused,vw=(e,t,r=new Date)=>{let o=Lw(e),n={paused:t,updatedAt:r.toISOString()};qd.default.mkdirSync(Yy.default.dirname(o),{recursive:!0,mode:448});let s=`${o}.${process.pid}.tmp`;return qd.default.writeFileSync(s,`${JSON.stringify(n)}
`,{mode:384}),qd.default.renameSync(s,o),n}});var Y$,X$=l(()=>{"use strict";Y$=".gemini/antigravity-cli"});var Z$,Hle,Q$,ez,tz=l(()=>{"use strict";Z$=u(require("node:path"));X$();Hle="command(*)",Q$=[Hle],ez=e=>Z$.default.join(e,Y$,"settings.json")});var Jd,rz,oz,nz,Fle,$le,sz,iz=l(()=>{"use strict";Jd=u(require("node:fs")),rz=u(require("node:os")),oz=u(require("node:path"));tz();nz=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fle=e=>{if(!Jd.default.existsSync(e))return{};try{let t=JSON.parse(Jd.default.readFileSync(e,"utf8"));return nz(t)?{...t}:{}}catch{return{}}},$le=(e,t)=>{let o=[...Array.isArray(e)?e.filter(n=>typeof n=="string"):[]];for(let n of t)o.includes(n)||o.push(n);return o},sz=(e=rz.default.homedir())=>{let t=ez(e),r=Fle(t),o=nz(r.permissions)?{...r.permissions}:{},n=$le(o.allow,Q$),s=Array.isArray(o.allow)?o.allow.filter(c=>typeof c=="string"):[];if(!(n.length!==s.length||n.some((c,d)=>c!==s[d])))return{settingsPath:t,wrote:!1};Jd.default.mkdirSync(oz.default.dirname(t),{recursive:!0});let a={...r,permissions:{...o,allow:[...n]}};return Jd.default.writeFileSync(t,`${JSON.stringify(a,null,2)}
`,"utf8"),{settingsPath:t,wrote:!0}}});var Zy,xw=l(()=>{"use strict";iz();Zy=e=>{e==="antigravity"&&sz()}});var az,za,Ww=l(()=>{"use strict";az=require("node:child_process");St();Sr();Ud();Iw();ko();Xy();xw();za=(e,t,r)=>new Promise(o=>{if(!Ne(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Ro(e.layout.configPath)){o({exitCode:-1,output:Os(ue.CODING_TOOLS_PAUSED)});return}if(Ns(e,t)){Vd(e,t,r).then(o);return}let n=Zt(t,r,Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}Zy(t);let s=(0,az.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Da(i.join("")),p=a.join("").trim(),m=[d.output.trim(),p].filter(g=>g.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var lz=l(()=>{"use strict"});var cz=l(()=>{"use strict";Aw();Ww();Ew();lz();bn();ko()});var dz,pz,uz,mz=l(()=>{"use strict";dz="claude",pz="codex",uz="cursor"});var gz,zle,Ow,Yd,Qy=l(()=>{"use strict";gz=u(require("node:path"));mr();Xe();zle="ws://localhost:3000/api/agent-witch/ws",Ow=e=>e.replace(/\/$/,""),Yd=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Ow(t);let r=gz.default.basename(e.installDir);if(r===Oc.production)return zg;let o=e.configWsUrl?.trim()??"";return r===Oc.localhost?o.length>0?Ow(o):zle:o.length>0?Ow(o):zg}});var Ble,jw,Mw=l(()=>{"use strict";mz();Qy();Kd();Ble=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jw=e=>{if(!Ble(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Yd({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??dz,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??pz,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??uz,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:dt(t.writerExecutionBackend),layout:e.layout}}}});var Nw,Dw,Hw=l(()=>{"use strict";Nw=u(require("node:fs"));ee();Mw();Dw=e=>{let t=z(e);if(!Nw.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Nw.default.readFileSync(t.configPath,"utf8")),o=jw({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Xd,fz=l(()=>{"use strict";Xd=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Fw,Gle,$w,yz=l(()=>{"use strict";Fw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gle=e=>{if(!Fw(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Fw(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(m=>{if(!Fw(m))return[];let g=typeof m.itemKey=="string"?m.itemKey.trim():"",y=typeof m.relativePath=="string"?m.relativePath:"",h=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return g.length===0||h.length===0?[]:[{itemKey:g,relativePath:y,contentSha256:h}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},$w=Gle});var hz,Kle,eh,zw=l(()=>{"use strict";hz=u(require("node:path")),Kle=(e,t)=>{let r=t.trim();return hz.default.join(e,"components","store",r.slice(0,2),r)},eh=Kle});var Sz,Vle,Uw,Pz=l(()=>{"use strict";Sz=u(require("node:fs"));zw();Vle=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=eh(e.installDir,n.contentSha256);Sz.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this computer. Open Harness to sync, then retry.`},Uw=Vle});var Zd,Ua,qle,Bw,Jle,Gw,Kw=l(()=>{"use strict";Zd=u(require("node:fs")),Ua=u(require("node:path"));zw();qle=(e,t)=>Ua.default.join(e.installDir,"runs",t,"overlay"),Bw=(e,t)=>Ua.default.join(qle(e,t),".cursor"),Jle=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Bw(e,t);Zd.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=eh(e.installDir,i.contentSha256);if(!Zd.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this computer."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Ua.default.join(n,c):Ua.default.join(n,i.itemKey);Zd.default.mkdirSync(Ua.default.dirname(d),{recursive:!0}),Zd.default.copyFileSync(a,d)}return{ok:!0}},Gw=Jle});var Vw,Az,Yle,Qd,_z=l(()=>{"use strict";Vw=u(require("node:fs")),Az=u(require("node:path")),Yle=(e,t)=>{let r=Az.default.join(e.installDir,"runs",t);Vw.default.existsSync(r)&&Vw.default.rmSync(r,{recursive:!0,force:!0})},Qd=Yle});var Xle,qw,bz=l(()=>{"use strict";Kw();Xle=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Bw(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},qw=Xle});var Jw,Zle,Qle,ece,tce,rce,B,kz=l(()=>{"use strict";Jw=u(require("node:fs"));Qy();ee();Kd();Zle="claude",Qle="codex",ece="cursor",tce="agy",rce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=()=>{let e=z();if(!Jw.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Jw.default.readFileSync(e.configPath,"utf8"));if(!rce(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Yd({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:dt(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:Zle,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:Qle,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:ece,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:tce,pairingToken:s,layout:e}}catch{return null}}});var th,Rz,wz=l(()=>{"use strict";th=u(require("node:fs"));Tw();Rz=(e,t)=>{let r=Jy(e);th.default.mkdirSync(e,{recursive:!0}),th.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{th.default.chmodSync(r,384)}catch{}}});var ep,Ez,rh=l(()=>{"use strict";ep=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},Ez=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===ep(t)}});var tp,oce,Yw,Xw,Tz=l(()=>{"use strict";tp=u(require("node:fs"));bn();wz();rh();Fa();ko();oce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yw=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=Ez(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Ha(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Xw=e=>{let t=rt(e.configPath),r={};if(tp.default.existsSync(e.configPath))try{let n=JSON.parse(tp.default.readFileSync(e.configPath,"utf8"));oce(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,tp.default.mkdirSync(t,{recursive:!0}),tp.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=Yw(Yw(Yw(_n(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);Rz(t,o)}});var oh,Zw=l(()=>{"use strict";oh={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var Qw,Cz=l(()=>{"use strict";Gd();bn();ko();ko();Qw=(e,t)=>{if(Ns(e,t)||t==="antigravity")return!1;let r=Ft(t);if(r===null)return!1;let o=rt(e.layout.configPath),n=Et(o,r);return n===null||n.apiKey.trim().length===0}});var Iz,eE,tE=l(()=>{"use strict";Iz=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},eE=async e=>{let t=Iz(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=Iz(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var nce,rE,Lz=l(()=>{"use strict";Ae();Hw();tE();nce=1e4,rE=()=>eE({listProfileEmails:Qf,readConfig:Dw,pollIntervalMs:nce,logWaiting:e=>{console.error(e)}})});var sce,oE,vz=l(()=>{"use strict";sce={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This AgentWitch Local cannot handle Connect/restart. Update from /download."},oE=e=>({status:e.status,reason:e.reason,message:sce[e.status]})});var ice,nE,Hs,xz=l(()=>{"use strict";St();ice=new Set(["terminal.stream.chunk","command.claude.result","command.claude.input_required","command.writer.session.chunk","command.writer.session.ready","harness.request.result","shell.data","run.heartbeat","dashboard.agentRun.get.result","dashboard.agentRun.list.result"]),nE=(e,t)=>typeof e=="string"?Hd(e,t):Array.isArray(e)?e.map(r=>nE(r,t)):typeof e=="object"&&e!==null?Object.fromEntries(Object.entries(e).map(([r,o])=>[r,nE(o,t)])):e,Hs=e=>typeof e.type!="string"||!ice.has(e.type)||e.payload===void 0?{...e}:{...e,payload:nE(e.payload,Na("secretHidden"))}});var ace,sE,Wz=l(()=>{"use strict";Xy();ace=1e3,sE=(e,t,r=ace)=>{let o={paused:Ds(e).paused},s=setInterval(()=>{let i=Ds(e).paused;i!==o.paused&&(o.paused=i,t(i))},r);return s.unref?.(),()=>{clearInterval(s)}}});var nh,rp,Oz=l(()=>{"use strict";nh=(e,t,r=500)=>[...e.filter(o=>o!==t),t].slice(-r),rp=(e=500)=>{let t={ids:[]};return{has:r=>t.ids.includes(r),add:r=>{t.ids=nh(t.ids,r,e)}}}});var op,jz=l(()=>{"use strict";St();op=e=>({type:"command.claude.result",payload:{exitCode:-1,output:Os(e.code,e.computer),errorCode:e.code,...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{}},...e.requestId!==void 0?{requestId:e.requestId}:{}})});var se=l(()=>{"use strict";Ww();cz();Hw();Qy();fz();yz();Pz();Kw();_z();bz();Kd();kz();Tz();bn();ko();rh();Fa();Zw();Iw();ko();Cz();Gd();bn();Lz();Mw();tE();vz();xz();Xy();Wz();Oz();jz()});var Mz,iE,Nz=l(()=>{"use strict";Mz=u(require("node:path"));ee();Xe();C$();xy();Wy();se();iE=(e=L())=>{let t=T$(e);if(t!==null)return t;let r=at(e);if(r!==null){let n=ja(Mz.default.join(e,yt,r,"config.json"));if(n!==null)return n}let o=B()?.pairingToken.trim()??"";return o.length===0?null:Wa(o)}});var sh,Dz,lce,cce,Hz,ih,np,ah,sp=l(()=>{"use strict";sh=u(require("node:fs")),Dz=u(require("node:path")),lce="wake-port.json",cce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hz=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,ih=e=>Dz.default.join(e,lce),np=e=>{let t=ih(e);if(!sh.default.existsSync(t))return null;try{let r=JSON.parse(sh.default.readFileSync(t,"utf8"));if(cce(r)&&Hz(r.wakePort))return r.wakePort}catch{return null}return null},ah=(e,t)=>{if(!Hz(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=ih(e);sh.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var Hxe,Fxe,$xe,Pr,Fz,ip=l(()=>{"use strict";ee();sp();ct();sp();Hxe=gn(),Fxe=`${Ie()}-wake`,$xe=Ie(),Pr=()=>{let e=L();return ma({filePort:np(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:gn(e)})},Fz=e=>{let t=L();np(t)===null&&ah(t,e)}});var $z=l(()=>{"use strict";xy();Ae();Wy();Nz();se();ip()});var aE,ap,lp,zz=l(()=>{"use strict";aE=u(require("node:os"));$z();ap=()=>{let e=ke();return{ok:!0,port:Pr(),hostname:aE.default.hostname(),profileCount:e.length}},lp=()=>{let e=ke(),t=iE(),r=nw();return{hostname:aE.default.hostname(),port:Pr(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var lE=l(()=>{"use strict";zz()});var Uz,Bz,Gz,lh,Ba=l(()=>{"use strict";Uz="materialization.json",Bz="backups",Gz=".gitignore",lh=e=>`harness-set:${e.trim()}`});var Kz,Vz,ch,qz=l(()=>{"use strict";Kz=u(require("node:crypto")),Vz=u(require("node:fs")),ch=e=>{try{let t=Vz.default.readFileSync(e);return Kz.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var kn,Fs,dce,Jz,cE,Yz=l(()=>{"use strict";kn=u(require("node:fs")),Fs=u(require("node:path"));qz();dce=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Fs.default.join(t,n,o);return kn.default.mkdirSync(Fs.default.dirname(s),{recursive:!0}),kn.default.copyFileSync(r,s),Fs.default.relative(e,s).replaceAll("\\","/")},Jz=e=>{let t=Fs.default.join(e.repoRoot,e.repoRelativeDestination),r=ch(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(kn.default.existsSync(t)){let n=ch(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=dce(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return kn.default.mkdirSync(Fs.default.dirname(t),{recursive:!0}),kn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return kn.default.mkdirSync(Fs.default.dirname(t),{recursive:!0}),kn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},cE=e=>{let t=ch(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var dE,Xz,Ga,dh=l(()=>{"use strict";dE=u(require("node:fs"));Ba();Xz=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ga=e=>{if(!dE.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(dE.default.readFileSync(e,"utf8"));if(Xz(t)&&t.version===1&&Xz(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var Rn,ph,uh,pE=l(()=>{"use strict";Rn=u(require("node:fs")),ph=u(require("node:path"));Ba();uh=e=>{let t=new Set(e.setSlugs.map(s=>lh(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=ph.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=ph.default.join(e.repoRoot,i.backupPath);Rn.default.existsSync(c)?(Rn.default.mkdirSync(ph.default.dirname(a),{recursive:!0}),Rn.default.copyFileSync(c,a),o.push(s)):Rn.default.existsSync(a)&&Rn.default.rmSync(a,{force:!0})}else Rn.default.existsSync(a)&&Rn.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var uE,Ka,mh=l(()=>{"use strict";uE=u(require("node:path"));Ba();Ka=e=>({ledgerFilePath:uE.default.join(e.metaDirPath,Uz),backupsDirPath:uE.default.join(e.metaDirPath,Bz)})});var mE,Zz,Qz=l(()=>{"use strict";mE=u(require("node:path")),Zz=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return mE.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return mE.default.posix.join(s,e,n)}});var gE,eU,dp,fE=l(()=>{"use strict";gE=u(require("node:fs")),eU=u(require("node:path")),dp=(e,t)=>{gE.default.mkdirSync(eU.default.dirname(e),{recursive:!0}),gE.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var yE,pce,De,qr=l(()=>{"use strict";yE=u(require("node:os")),pce=e=>{let t=e.trim();return t.startsWith("~/")?`${yE.default.homedir()}${t.slice(1)}`:t==="~"?yE.default.homedir():t},De=pce});var gh,tU,uce,rU,oU=l(()=>{"use strict";gh=u(require("node:fs")),tU=u(require("node:path"));Ba();fn();uce=`*
!${iy}
`,rU=e=>{let t=tU.default.join(e,Gz);gh.default.existsSync(t)||(gh.default.mkdirSync(e,{recursive:!0}),gh.default.writeFileSync(t,uce))}});var $s,Qt,zs=l(()=>{"use strict";$s=u(require("node:path"));fn();qr();Qt=e=>{let t=De(e),r=$s.default.join(t,cd);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:$s.default.join(r,"rag"),memoryDirPath:$s.default.join(r,EF),reportsDirPath:$s.default.join(r,CF),metaFilePath:$s.default.join(r,iy),ragChunksFilePath:$s.default.join(r,"rag",TF)}}});var Jr,sU,mce,gce,$t,pp=l(()=>{"use strict";Jr=u(require("node:fs")),sU=u(require("node:path"));fn();oU();zs();mce=(e,t)=>{if(Jr.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Jr.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},gce=e=>{Jr.default.existsSync(e.ragChunksFilePath)||Jr.default.writeFileSync(e.ragChunksFilePath,"");let t=sU.default.join(e.memoryDirPath,ha);Jr.default.existsSync(t)||Jr.default.writeFileSync(t,"")},$t=e=>{let t=Qt(e.projectFolderPath);return Jr.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Jr.default.mkdirSync(t.ragDirPath,{recursive:!0}),Jr.default.mkdirSync(t.memoryDirPath,{recursive:!0}),rU(t.metaDirPath),mce(t,e),gce(t),{ok:!0,layout:t}}});var iU,aU,lU,cU,fh,yh=l(()=>{"use strict";iU="components",aU="store",lU="versions",cU="installed.json",fh=e=>`harness-set:${e.trim()}`});var hE,dU,hh,SE=l(()=>{"use strict";hE=u(require("node:fs")),dU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hh=e=>{if(!hE.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(hE.default.readFileSync(e,"utf8"));if(dU(t)&&t.version===1&&dU(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var up,Va,Sh=l(()=>{"use strict";up=u(require("node:path"));yh();Va=e=>{let t=up.default.join(e,iU);return{componentsRootDir:t,storeDir:up.default.join(t,aU),versionsDir:up.default.join(t,lU),installedFilePath:up.default.join(t,cU)}}});var PE,pU,Ph,Ah,_h=l(()=>{"use strict";PE=u(require("node:crypto")),pU=u(require("node:fs")),Ph=e=>PE.default.createHash("sha256").update(e,"utf8").digest("hex"),Ah=e=>{try{let t=pU.default.readFileSync(e);return PE.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var AE,uU,mU,gU=l(()=>{"use strict";AE=u(require("node:fs")),uU=u(require("node:path")),mU=(e,t)=>{AE.default.mkdirSync(uU.default.dirname(e),{recursive:!0}),AE.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var _E,bE,fU,yU=l(()=>{"use strict";_E=u(require("node:fs")),bE=u(require("node:path")),fU=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=bE.default.join(e,r),n=bE.default.join(o,`${t.versionId}.json`);_E.default.mkdirSync(o,{recursive:!0}),_E.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var bh,hU,SU,PU=l(()=>{"use strict";bh=u(require("node:fs")),hU=u(require("node:path"));_h();SU=e=>{let t=Ph(e.content),r=hU.default.join(e.storeDir,t);return bh.default.existsSync(r)||(bh.default.mkdirSync(e.storeDir,{recursive:!0}),bh.default.writeFileSync(r,e.content)),t}});var kE,AU,fce,kh,RE=l(()=>{"use strict";kE=u(require("node:fs")),AU=u(require("node:path"));yh();SE();Sh();_h();gU();yU();PU();fce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kh=e=>{let t=Va(e.installDir),r=fh(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!fce(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=AU.default.join(e.harnessRootDir,a);if(!kE.default.existsSync(c))continue;let d=kE.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Ah(c);if(p!==null){if(Ph(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);SU({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;fU(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=hh(t.installedFilePath);mU(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var EE,wE,_U,bU=l(()=>{"use strict";EE=u(require("node:fs"));RE();SE();Sh();wE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_U=e=>{if(!EE.default.existsSync(e.harnessManifestPath))return;let t=Va(e.installDir),r=hh(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(EE.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!wE(o)||o.version!==1||!wE(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!wE(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];kh({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var TE,kU,RU,wU=l(()=>{"use strict";TE=u(require("node:fs")),kU=u(require("node:path")),RU=e=>{let t=e.componentId.replaceAll("/","_"),r=kU.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!TE.default.existsSync(r))return null;try{let o=JSON.parse(TE.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var Rh,wh,EU,TU=l(()=>{"use strict";Rh=u(require("node:fs")),wh=u(require("node:path"));yh();bU();wU();Sh();_h();EU=e=>{_U({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Va(e.layout.installDir),r=fh(e.setSlug),o=RU({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=wh.default.join(t.storeDir,i.contentSha256);if(Rh.default.existsSync(a)&&Ah(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?wh.default.join(e.layout.harnessRootDir,n):wh.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!Rh.default.existsSync(s))return null;try{if(!Rh.default.statSync(s).isFile())return null}catch{return null}return s}});var CU,yce,CE,er,qa=l(()=>{"use strict";dh();mh();zs();CU="harness-set:",yce=e=>{let t=e.trim();if(!t.startsWith(CU))return null;let r=t.slice(CU.length).trim();return r.length>0?r:null},CE=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=yce(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},er=e=>{let t=Qt(e),{ledgerFilePath:r}=Ka(t),o=Ga(r);return CE(o)}});var Eh,IE,mp,hce,wo,gp,Ja=l(()=>{"use strict";Eh=u(require("node:fs")),IE=u(require("node:os")),mp=u(require("node:path")),hce=()=>Eh.default.realpathSync(mp.default.resolve(IE.default.homedir())),wo=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?mp.default.join(IE.default.homedir(),t.slice(1)):t,o;try{o=Eh.default.realpathSync(mp.default.resolve(r))}catch{return null}let n=hce();return o===n||o.startsWith(`${n}${mp.default.sep}`)?o:null},gp=e=>{let t=wo(e);if(t===null)return null;try{if(!Eh.default.statSync(t).isFile())return null}catch{return null}return t}});var LE,vE=l(()=>{"use strict";LE=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Ch,IU,Th,Sce,fp,xE=l(()=>{"use strict";Ch=u(require("node:fs")),IU=u(require("node:path"));Ba();Yz();dh();pE();mh();Qz();fE();qr();pp();TU();qa();Ja();vE();Th=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sce=e=>{if(!Ch.default.existsSync(e))return null;try{let t=JSON.parse(Ch.default.readFileSync(e,"utf8"));if(Th(t)&&t.version===1)return t}catch{return null}return null},fp=e=>{let t=[...new Set(e.setSlugs.map(f=>f.trim()).filter(f=>f.length>0))],r=De(e.projectFolderPath),o=wo(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Ch.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=$t({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Ka(s.layout),d=er(o).filter(f=>!t.includes(f)),p=Ga(i),m=0;if(d.length>0){let f=uh({repoRoot:o,setSlugs:d,ledger:p});p=f.ledger,m=f.summary.removedPaths.length}if(t.length===0)return dp(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let g=Sce(e.layout.harnessManifestPath);if(g===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=Th(g.sets)?g.sets:{},h=0,S=0,T=0;for(let f of t){let b=y[f];if(!Th(b))return{ok:!1,errorMessage:`Harness set "${f}" is not installed locally.`};let I=typeof b.version=="number"?String(b.version):"1",P=lh(f),v=Array.isArray(b.items)?b.items:[];for(let x of v){if(!Th(x))continue;let D=typeof x.path=="string"?x.path.trim():"";if(D.length===0)continue;let k=LE(D);if(k===null)continue;let A=Zz(f,k),E=IU.default.posix.join(".cursor",A).replaceAll("\\","/"),O=typeof x.id=="string"?x.id.trim():"",X=EU({layout:e.layout,setSlug:f,setVersion:typeof b.version=="number"?b.version:1,manifestItemPath:D,manifestItemId:O});if(X===null)continue;let ne=Jz({repoRoot:o,backupsDir:a,repoRelativeDestination:E,sourceAbsolutePath:X,componentId:P,versionId:I,ledger:p});if(ne.kind==="skipped_unchanged"){S+=1;continue}if(ne.kind==="backed_up_user_file"){T+=1,h+=1,p={version:1,entries:{...p.entries,[E]:cE({componentId:P,versionId:I,sourceAbsolutePath:X,backupPath:ne.backupPath})}};continue}h+=1,p={version:1,entries:{...p.entries,[E]:cE({componentId:P,versionId:I,sourceAbsolutePath:X})}}}}return h===0&&S===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(dp(i,p),{ok:!0,writtenFileCount:h,skippedFileCount:S,backedUpFileCount:T,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var LU,Ih,Pce,Ace,_ce,bce,kce,Rce,wce,Ece,Tce,yp,Lh=l(()=>{"use strict";LU=u(require("node:crypto")),Ih=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Pce=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Ace=(e,t)=>{let r=Pce(t),o=Ih(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},_ce=(e,t,r)=>{let o=Ace(t,r);return`shared/items/${e}/${o}`},bce=["rules","skills","commands","instructions","agents"],kce=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Rce=(e,t)=>[...e.filter(o=>o.id!==t.id),t],wce=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Ece=e=>LU.default.createHash("sha256").update(e,"utf8").digest("hex"),Tce=e=>({id:e.id,kind:e.kind,title:e.title,path:_ce(e.id,e.kind,e.title),contentSha256:Ece(e.content)}),yp=e=>{let t=new Date().toISOString(),r=e.existingManifest??kce(e.hostname,t),o=Ih(e.bundle.slug),n=wce(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...bce.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let m=Tce(p);return{files:[...d.files,{relativePath:m.path,content:p.content}],nextItems:Rce(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var wn,vU,vh,Cce,Us,WE=l(()=>{"use strict";wn=u(require("node:fs")),vU=u(require("node:os")),vh=u(require("node:path"));Lh();Cce=e=>{if(!wn.default.existsSync(e))return null;try{let t=JSON.parse(wn.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Us=e=>{try{let t=Cce(e.layout.harnessManifestPath),r=yp({bundle:e.bundle,hostname:vU.default.hostname(),existingManifest:t});wn.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)wn.default.mkdirSync(vh.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=vh.default.join(e.layout.harnessRootDir,o.relativePath);wn.default.mkdirSync(vh.default.dirname(n),{recursive:!0}),wn.default.writeFileSync(n,o.content)}return wn.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var OE,xU=l(()=>{"use strict";WE();xE();OE=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Us({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return fp({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var WU,OU=l(()=>{"use strict";WU=["rule","skill","command","instruction","agent"]});var jU,Ice,Lce,Yr,jE=l(()=>{"use strict";OU();jU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ice=e=>typeof e=="string"&&WU.includes(e),Lce=e=>{if(!jU(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Ice(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Yr=e=>{if(!jU(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=Lce(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var MU,vce,ME,NU=l(()=>{"use strict";MU=require("node:zlib");jE();vce="x-agent-witch-token",ME=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[vce]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,MU.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Yr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var DE,NE,Eo,DU=l(()=>{"use strict";DE=u(require("node:fs")),NE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Eo=e=>{if(!DE.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(DE.default.readFileSync(e.harnessManifestPath,"utf8"));if(!NE(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=NE(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!NE(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var xh,HU=l(()=>{"use strict";xh=()=>"~"});var FU,$U,zU=l(()=>{"use strict";FU=require("node:crypto"),$U=e=>`local-${(0,FU.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var HE,UU=l(()=>{"use strict";HE=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var hp,Wh,FE=l(()=>{"use strict";hp=u(require("node:path")),Wh=e=>{let t=hp.default.dirname(e),r=hp.default.basename(t);return r==="agents"?hp.default.basename(hp.default.dirname(t)):r}});var Sp,To,BU,xce,Wce,Oce,Oh,GU,$E=l(()=>{"use strict";Sp=u(require("node:fs")),To=u(require("node:path"));zU();UU();FE();BU=new Set(["node_modules",".git","dist","build",".next","coverage"]),xce=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Wce=(e,t)=>{let r=To.default.basename(t);if(e==="skill"){let o=t.split(To.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Oce=e=>{let t=[],r=(n,s)=>{let i;try{i=Sp.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&BU.has(a.name))continue;let c=To.default.join(n,a.name),d=s?To.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;HE(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=To.default.join(e,n);Sp.default.existsSync(s)&&r(s,n)}let o=To.default.join(e,"skills");return Sp.default.existsSync(o)&&r(o,"skills"),t},Oh=e=>{let t=Oce(e);if(t.length===0)return null;let r=To.default.dirname(e),o=Wh(e),n=xce(o),s=t.map(i=>{let a=HE(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:$U(i.absolutePath),kind:a,title:Wce(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},GU=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Sp.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||BU.has(a.name))continue;let c=To.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var KU,zE,jce,UE,VU=l(()=>{"use strict";KU=u(require("node:fs")),zE=u(require("node:path"));$E();Ja();jce=e=>{let t=wo(e.trim());if(t===null)return null;if(zE.default.basename(t)===".cursor")return t;let r=zE.default.join(t,".cursor");try{if(KU.default.statSync(r).isDirectory())return wo(r)}catch{return null}return null},UE=e=>{let t=jce(e.projectPath);if(t===null)return null;let r=Oh(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var qU,Mce,jh,BE,JU=l(()=>{"use strict";qU=u(require("node:path"));$E();Ja();FE();Mce=5,jh=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},BE=e=>{let t=wo(e.scanRoot.trim());if(t===null)return jh(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of GU(t,Mce,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=wo(s);if(i===null)continue;let a=Wh(i);jh(e.response,"folder",{cursorDir:i,groupName:a,repoPath:qU.default.dirname(i)});let c=Oh(i);c!==null&&(r.push(c),jh(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return jh(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var YU,XU,ZU=l(()=>{"use strict";YU=u(require("node:path")),XU=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:YU.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var Pt,QU,GE,Nce,KE,VE,Mh,qE,Pp,e1=l(()=>{"use strict";Pt=u(require("node:fs")),QU=u(require("node:os")),GE=u(require("node:path"));Lh();RE();Ja();ZU();Nce=e=>{if(!Pt.default.existsSync(e))return null;try{let t=JSON.parse(Pt.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},KE=e=>{let t=e.hostname??QU.default.hostname(),r=Nce(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let m=gp(p.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let g=Pt.default.readFileSync(m,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:g,setSlugs:[i.slug]})}let d=yp({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{Pt.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)Pt.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=GE.default.join(e.layout.harnessRootDir,i.relativePath);Pt.default.mkdirSync(GE.default.dirname(a),{recursive:!0}),Pt.default.writeFileSync(a,i.content)}Pt.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Ih(i.slug),d=r.sets[c];d!==void 0&&kh({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},VE="reveal-cache.json",Mh=(e,t)=>{Pt.default.mkdirSync(e.harnessRootDir,{recursive:!0}),Pt.default.writeFileSync(`${e.harnessRootDir}/${VE}`,`${JSON.stringify(t,null,2)}
`)},qE=e=>{let t=`${e.harnessRootDir}/${VE}`;Pt.default.existsSync(t)&&Pt.default.unlinkSync(t)},Pp=e=>{let t=`${e.harnessRootDir}/${VE}`;if(!Pt.default.existsSync(t))return null;try{let r=JSON.parse(Pt.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return XU(r)}catch{return null}return null}});var En=l(()=>{"use strict";xE();xU();vE();WE();NU();jE();Lh();DU();HU();VU();Ja();JU();e1()});var JE,t1=l(()=>{"use strict";En();ct();JE=e=>{let t=z(e.profileEmail);return Us({bundle:e.bundle,layout:t})}});var r1=l(()=>{"use strict";t1();En()});var Dce,o1,Hce,n1,Bs,Nh,s1=l(()=>{"use strict";Dce=["agentwitch.com","www.agentwitch.com"],o1=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Hce=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},n1=e=>{let t=Hce(e);return!!(Dce.includes(t)||o1.test(e.trim().toLowerCase()))},Bs=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return n1(r)?o1.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Nh=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Bs(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Ap=l(()=>{"use strict";s1()});var Ar,Ya=l(()=>{"use strict";Ar=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var _p,i1=l(()=>{"use strict";r1();Ap();Ya();_p=e=>{if(!Ar(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Yr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Bs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=JE({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var YE=l(()=>{"use strict";i1()});var Fce,Xa,XE=l(()=>{"use strict";Fce=e=>e==="hourly"||e==="daily"||e==="weekdays",Xa=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!Fce(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var bp,Dh,a1,l1,ZE,_r,Hh,Fh,$h,zh,Uh=l(()=>{"use strict";bp=u(require("node:fs")),Dh=u(require("node:path"));XE();a1="automations.json",l1=e=>e.profileEmail!==null?Dh.default.join(e.installDir,"profiles",e.profileEmail,a1):Dh.default.join(e.installDir,a1),ZE=()=>({version:1,automations:[]}),_r=e=>{let t=l1(e);if(!bp.default.existsSync(t))return ZE();try{let r=JSON.parse(bp.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?ZE():{version:1,automations:r.automations.flatMap(n=>{let s=Xa(n);return s!==null?[s]:[]})}}catch{return ZE()}},Hh=(e,t)=>{let r=l1(e);bp.default.mkdirSync(Dh.default.dirname(r),{recursive:!0}),bp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Fh=(e,t)=>{Hh(e,{version:1,automations:t})},$h=(e,t)=>{let o=_r(e).automations.filter(n=>n.id!==t.id);Hh(e,{version:1,automations:[...o,t]})},zh=(e,t)=>_r(e).automations.find(r=>r.id===t)??null});var le,At=l(()=>{"use strict";le="x-agent-witch-token"});var QE=l(()=>{"use strict";Ty();Iy()});var J,Gs,eT,kp,tT,$ce,rT,Ks,Co,oT,br=l(()=>{"use strict";At();QE();J=e=>{let t=Qe(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Gs=e=>({[le]:e,"Content-Type":"application/json"}),eT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},kp=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},tT=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},$ce=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},rT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Ks=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Gs(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return $ce(r)}catch{return null}},Co=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Gs(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},oT=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Gs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var Vs,c1,d1,zce,nT,p1,sT=l(()=>{"use strict";Vs=u(require("node:fs")),c1=u(require("node:path")),d1=e=>c1.default.join(e.harnessRootDir,"projects-registry.json"),zce=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),nT=e=>{let t=d1(e);if(!Vs.default.existsSync(t))return[];try{let r=JSON.parse(Vs.default.readFileSync(t,"utf8"));return zce(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},p1=e=>{let t=d1(e);if(!Vs.default.existsSync(t))return;let r=`${t}.migrated`;if(Vs.default.existsSync(r)){Vs.default.unlinkSync(t);return}Vs.default.renameSync(t,r)}});var u1,Uce,Bce,m1,g1=l(()=>{"use strict";qr();u1=e=>De(e),Uce=e=>new Set(e.map(t=>u1(t.folderPath))),Bce=e=>new Set(e.map(t=>t.id)),m1=(e,t)=>{let r=Uce(t),o=Bce(t),n=[],s=new Set;for(let i of e){let a=u1(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var iT,aT=l(()=>{"use strict";br();sT();g1();iT=async(e,t)=>{let r=nT(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=J({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Ks(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=m1(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await rT(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&p1(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var lT,kr,Za=l(()=>{"use strict";lT=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),kr=(e,t)=>e.find(r=>r.id===t)??null});var Xr,Qa=l(()=>{"use strict";br();aT();Za();Xr=async(e,t)=>{t!==void 0&&await iT(t,e);let r=J({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Ks(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach AgentWitch Cloud. Check the computer connection and try again."};let n=lT(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in AgentWitch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from AgentWitch Cloud.`}}});var f1=l(()=>{"use strict"});var cT,Gce,Bh,dT=l(()=>{"use strict";cT=u(require("node:fs"));zs();Gce=e=>{let t=Qt(e);if(!cT.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(cT.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Bh=Gce});var pT,uT,y1=l(()=>{"use strict";pT=u(require("node:path"));qr();dT();uT=e=>{let t=pT.default.resolve(De(e)),r=o=>{let{projectId:n}=Bh(o);if(n!==null)return n;let s=pT.default.dirname(o);return s===o?null:r(s)};return r(t)}});var Kce,Vce,Gh,mT=l(()=>{"use strict";Kce="Default",Vce=e=>e.trim().toLowerCase()===Kce.toLowerCase(),Gh=Vce});var Kh,Vh,qh=l(()=>{"use strict";Kh={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},Vh=e=>{let t=Object.entries(Kh).find(([,r])=>r===e);return t===void 0?null:t[0]}});var h1,Le,P1,qce,gT,fT,S1,Jce,Yce,Rp,yT,Xce,Zce,Qce,A1,_1=l(()=>{"use strict";ht();qh();h1="new",Le=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),P1={block:"Must fix",warn:"Warning",info:"Note"},qce={seed:"Built-in",project:"This project",retired:"Retired"},gT=6e4,fT=60*gT,S1=24*fT,Jce=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<gT)return"Last hit just now";if(o<fT)return`Last hit ${Math.floor(o/gT)} min ago`;if(o<S1)return`Last hit ${Math.floor(o/fT)}h ago`;let n=Math.floor(o/S1);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},Yce=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},Rp=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,yT=e=>e?{retired:"1"}:{},Xce=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${P1[a]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${Le(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${Le(t?.id??"")}" />
      <input type="hidden" name="tags" value="${Le((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${Me.symptom}" value="${Le(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${Me.avoidance}" rows="3" placeholder="What to do instead">${Le(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${Me.cause}" rows="2" placeholder="What leads to this trap">${Le(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${Le((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${Me.checkValue}" value="${Le(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${Le(Rp(e.projectId,yT(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},Zce=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${Le(r)}" />
            <input type="hidden" name="pitfallId" value="${Le(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${Le(Rp(r,{...yT(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>Le(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${Le(t.id)}">
        <p><strong>${Le(t.symptom)}</strong> <span class="muted">\xB7 ${P1[t.severity]} \xB7 ${qce[t.source]}</span></p>
        <p>Fix: ${Le(t.avoidance)}</p>
        ${a}
        <p class="muted">${Le(Jce(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${Le(Yce(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},Qce=e=>{let t=e.postPaths??Kh;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this computer on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=yn(o),s=n>=64,i=e.showRetired?o:o.filter(y=>y.source!=="retired"),a=e.editId===null?null:e.editId===h1?s?null:{item:null}:(()=>{let y=o.find(h=>h.id===e.editId&&h.source!=="retired");return y===void 0?null:{item:y}})(),c=a===null?"":Xce({projectId:e.projectId,item:a.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">Limit reached: ${64} active pitfalls. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${Le(Rp(e.projectId,{...yT(e.showRetired),edit:h1}))}">Add pitfall</a>`,p=e.showRetired?`<a class="btn btn-secondary" href="${Le(Rp(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${Le(Rp(e.projectId,{retired:"1"}))}">Show retired</a>`,m=o.length>0?"No active pitfalls. Turn on Show retired to see retired ones.":"No pitfalls for this project. Add one when you spot a mistake that keeps coming back.",g=i.length===0?`<p class="empty">${m}</p>`:`<ul class="harness-installed-set-list">${i.map(y=>Zce({projectId:e.projectId,item:y,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      ${o.length===0?"":`<p class="muted">${n} of ${o.length} active</p>`}
      <div class="actions">${a===null?d:""}${p}</div>
      ${c}
      ${g}
    </section>`},A1=Qce});var Se,b1,ede,tde,rde,ode,nde,Tn,Jh=l(()=>{"use strict";mT();ht();_1();Se=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b1=(e,t)=>e.length===0?`<p class="empty">${Se(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${Se(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${Se(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in AgentWitch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,ede=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this computer yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,tde=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from AgentWitch Cloud.":"This project\u2019s playbook is linked in AgentWitch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},rde=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
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
      </div>`},ode=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?rde({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?tde({project:e.project,alreadyInRepo:!1}):ede();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),p=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
            <input type="hidden" name="projectId" value="${Se(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${Se(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${Se(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${Se(c.name)}</strong> <span class="muted mono">(${Se(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${p}
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
      </div>`},nde=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${Se(t)} from recent runs. Review in AgentWitch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${Se(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Tn=e=>{let t=e.flashError?`<div class="alert-error">${Se(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Se(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(g,y)=>`<a class="project-tab${e.activeTab===g?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${g}">${Se(y)}</a>`,n=e.composition?.items.filter(g=>g.kind==="workflow")??[],s=e.composition?.items.filter(g=>g.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":{let g=ode({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}),y=e.harnessExtraHtml?.trim()??"";return y.length===0?g:`${g}${y}`}case"workflows":return b1(n,"No workflows installed for this project yet.");case"agents":return b1(s,"No agents installed for this project yet.");case"knowledge":return nde({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return A1({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${yn(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,p=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${Se(c)}" target="_blank" rel="noopener noreferrer">Open in AgentWitch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${Se(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,m=Gh(e.project.name)?"":`<section class="danger-zone stack">
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
      ${p}
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
    </section>${m}`}});var sde,ide,k1,R1=l(()=>{"use strict";En();At();sde=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ide=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!sde(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Yr(n);return s===null?[]:[s]})}catch{return null}},k1=ide});var w1,hT,E1=l(()=>{"use strict";se();En();Jh();Qa();R1();Za();qa();br();mr();w1=e=>({kind:"page",title:e.project.name,body:Tn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Eo(e.layout),linkedSetSlugs:er(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),hT=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=B();if(r===null)return{kind:"not_found"};let o=await Xr(r,e.layout),n=kr(o.projects,t);if(n===null)return{kind:"not_found"};let s=J({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??Nt,a=s===null?null:await k1(s,n.id);if(a===null)return w1({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from AgentWitch Cloud."});let c=OE({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return w1({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await Co(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var T1,ST,C1=l(()=>{"use strict";se();En();mr();br();Jh();pp();qr();Qa();Za();qa();dh();pE();mh();fE();T1=e=>({kind:"page",title:e.project.name,body:Tn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Eo(e.layout),linkedSetSlugs:er(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ST=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=B();if(n===null)return{kind:"not_found"};let s=await Xr(n,e.layout),i=kr(s.projects,r);if(i===null)return{kind:"not_found"};let a=J({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??Nt;if(o.length===0)return T1({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=De(i.projectFolderPath),p=$t({projectFolderPath:d}),{ledgerFilePath:m}=Ka(p.layout),g=Ga(m),y=CE(g);if(!y.includes(o))return T1({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let h=y.filter(b=>b!==o),S=uh({repoRoot:p.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:g});dp(m,S.ledger);let T=a===null?!1:await Co(a,i.id,h),f=new URLSearchParams({linked:"1",removed:o,files:String(S.summary.removedPaths.length),bindingsSynced:T?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${f.toString()}`}}});var ade,lde,I1,cde,dde,wp,PT=l(()=>{"use strict";ht();At();ade=1e4,lde=15e3,I1=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},cde=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},dde=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(I1(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(ade)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=CR(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(I1(e.appOrigin,r),{method:"PUT",headers:{[le]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(lde)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:cde(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),wp=dde});var AT,L1,pde,ude,mde,gde,v1,x1=l(()=>{"use strict";ht();AT=e=>e.replace(/\s+/g," ").trim(),L1=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=AT(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},pde=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),ude=(e,t)=>{let r=pde(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,Me.id).replace(/-+$/g,"")},mde=e=>e==="block"||e==="info"?e:"warn",gde=e=>{let{form:t}=e,r=AT(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=AT(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>Me.symptom||o.length>Me.avoidance||n.length>Me.cause||s.length>Me.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:ude(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:L1(t.get("keywords")??"",Me.keywords,Me.keyword),tags:L1(t.get("tags")??"",Me.tags,Me.tag),source:"project",severity:mde(t.get("severity"))}}},v1=gde});var O1,fde,Io,W1,Yh,yde,hde,j1,M1=l(()=>{"use strict";O1=require("node:crypto");ht();x1();qh();fde=()=>(0,O1.randomBytes)(3).toString("hex"),Io=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},W1=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),Yh=new Map,yde=async(e,t)=>{let r=Yh.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);Yh.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),Yh.get(e)===s&&Yh.delete(e)}},hde=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return yde(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return Io(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return Io(o,"unavailable",s);if(e.action==="save"){let d=v1({form:e.form,randomSuffix:e.randomSuffix??fde});if(!d.ok)return Io(o,"invalid",s);let p=i.items.find(y=>y.id===d.pitfall.id);if((p===void 0||p.source==="retired")&&yn(i.items)>=64)return Io(o,"limit",s);let g=await n.upsertPitfall(o,d.pitfall);return Io(o,g.ok?"saved":g.reason==="active_limit"?"limit":g.reason,s)}let a=i.items.find(d=>d.id===t);if(a===void 0)return Io(o,"missing",s);if(e.action==="restore"){if(a.source==="retired"&&yn(i.items)>=64)return Io(o,"limit",s);let d=await n.upsertPitfall(o,W1(a,"project"));return Io(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,W1(a,"retired"));return Io(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},j1=hde});var Xh,N1,D1,_T=l(()=>{"use strict";Xh=new Map,N1=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=Xh.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&Xh.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},D1=e=>{if(e===void 0){Xh.clear();return}Xh.delete(e)}});var bT,H1=l(()=>{"use strict";se();br();Qa();Za();PT();M1();_T();bT=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=B();if(o===null)return{kind:"not_found"};let n=await Xr(o,e.layout),s=kr(n.projects,r);if(s===null)return{kind:"not_found"};let i=J({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),a=e.createStore??wp,c=i===null?null:a(i),d=await j1({action:e.action,form:t,projectId:s.id,store:c});return D1(s.id),{kind:"redirect",location:d}}});var Sde,kT,F1=l(()=>{"use strict";Sde=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,kT=Sde});var $1=l(()=>{"use strict"});var z1=l(()=>{"use strict"});var U1=l(()=>{"use strict";$1();z1()});var Pde,Cn,B1=l(()=>{"use strict";Pde=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],Cn=(e=process.env)=>{let t={...e};for(let r of Pde)delete t[r];return t}});var G1=l(()=>{"use strict";B1()});var RT,K1=l(()=>{"use strict";RT={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#2150d6",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var wT=l(()=>{"use strict";K1()});var Zh,ET=l(()=>{"use strict";Zh={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history",PROJECT_HISTORY_PAGE_REQUEST:"project.history.page.request",PROJECT_HISTORY_PAGE_RESULT:"project.history.page.result"}});var Qh=l(()=>{"use strict";U1();G1();mr();wT();ET()});var V1,q1,Ade,eS,tS,J1=l(()=>{"use strict";V1=require("node:child_process"),q1=require("node:util");Qh();Ade=(0,q1.promisify)(V1.execFile),eS=async(e,t)=>{try{let{stdout:r}=await Ade("git",t,{cwd:e,env:Cn(),maxBuffer:1048576});return r.trim()}catch{return null}},tS=async e=>{let t=await eS(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await eS(e,["rev-parse","--abbrev-ref","HEAD"]),o=await eS(e,["status","--porcelain"]),n=await eS(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var TT,Y1=l(()=>{"use strict";TT=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var _de,CT,X1=l(()=>{"use strict";_de=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},CT=_de});var bde,kde,Rr,el=l(()=>{"use strict";St();bde=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,kde=e=>Pn(e).scrubbed.replace(bde,"[redacted-email]"),Rr=kde});var Rde,IT,Z1=l(()=>{"use strict";At();el();Rde=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[le]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:Rr(r.lesson)}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},IT=Rde});var Q1,In,eB=l(()=>{"use strict";Q1=require("node:child_process"),In=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,Q1.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var tB=l(()=>{"use strict";Qa()});var wde,LT,vT=l(()=>{"use strict";At();wde=e=>{let t=e?.project;return typeof t?.name=="string"&&t.name.trim().length>0?t.name.trim():null},LT=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[le]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return{ok:!1,httpStatus:o.status};let n=await o.json().catch(()=>null);return{ok:!0,projectName:wde(n)}}catch{return{ok:!1,httpStatus:null}}}});var xT,rB=l(()=>{"use strict";At();xT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach AgentWitch Cloud."}}}});var oB,Ede,Lo,WT,OT=l(()=>{"use strict";oB=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},Ede=e=>e===""?null:e,Lo=e=>e??"",WT=e=>({id:e.id,projectId:Ede(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:oB(e.keywords_json),tags:oB(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var nB,Tde,Cde,jT,tl,rS,Ep=l(()=>{"use strict";OT();nB=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,Tde=e=>e,Cde=e=>e??null,jT=(e,t,r=t)=>Tde(e.prepare(nB).all(Lo(r),Lo(t))).map(WT),tl=(e,t,r,o=t)=>{let n=Cde(e.prepare(`${nB} AND p.id = ?`).get(Lo(o),Lo(t),r));return n===null?null:WT(n)},rS=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Lo(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var oS,MT=l(()=>{"use strict";ht();oS=e=>e.map(t=>({id:bs(t.id),avoidance:bs(t.avoidance)}))});var nS,sB,sS=l(()=>{"use strict";nS=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},sB=e=>e.filter(t=>t.source!=="retired").length});var qs,iB,Tp=l(()=>{"use strict";ht();MT();Ep();sS();qs=(e,t={})=>{let r=t.projectId??null,o=jT(e,null,r),n=r===null||r===""?[]:jT(e,r);return nS({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},iB=(e,t={})=>{let r=qs(e,t);return t.format==="bot"?{format:"bot",items:oS(r),lines:r.map(o=>hd(o))}:{format:"full",items:r}}});var iS,NT=l(()=>{"use strict";Ep();Tp();iS=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?tl(e,null,r):qs(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var DT=l(()=>{"use strict"});var Ln,rl,aB,lB,cB=l(()=>{"use strict";Ln=e=>({type:"string",description:e}),rl={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Ln("Absolute working directory for the current session."),message:Ln("User prompt or task text to match."),sessionId:Ln("Optional session id for first-message tracking."),projectId:Ln("Optional project id when already known.")},additionalProperties:!1}},aB={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Ln("Absolute working directory."),projectId:Ln("Optional project id when already known.")},additionalProperties:!1}},lB={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Ln("Project id."),q:Ln("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Js,dB,pB,uB=l(()=>{"use strict";Js=e=>({type:"string",description:e}),dB={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Js("Project id."),skillId:Js("Skill id when known."),q:Js("Optional search text.")},required:["projectId"],additionalProperties:!1}},pB={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Js("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Js("Pitfall id when kind is pitfall."),preflightId:Js("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Js("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var mB=l(()=>{"use strict";cB();uB()});var Ip,gB=l(()=>{"use strict";ht();DT();Ip=e=>{let t=uy("AgentWitch tip \xB7 check_context",120);if(fr(t)>=120)return t;let r=[t],o=fr(t);for(let n of e){if(r.length-1>=4)break;let s=hd(n),i=fr(s);if(o+i>120){if(r.length===1){let a=120-o,c=uy(s,a);c.length>0&&(r.push(c),o+=fr(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var fB=l(()=>{"use strict";ht()});var Lp=l(()=>{"use strict";DT();mB();gB();fB()});var Ide,Lde,ol,HT=l(()=>{"use strict";Lp();Ide=e=>e.toLowerCase(),Lde=(e,t)=>{let r=Ide(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},ol=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:Lde(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var yB,hB=l(()=>{"use strict";Tp();HT();yB=(e,t)=>{let r=qs(e,{projectId:t.projectId,includeRetired:!1});return ol({pitfalls:r,text:t.text})}});var vde,xde,Wde,Ode,SB,zt,PB,lS,FT=l(()=>{"use strict";vde="22.13",xde=e=>typeof e=="object"&&e!==null&&typeof e.DatabaseSync=="function",Wde=e=>{let t={ok:!1,reason:`Node ${e.nodeVersion} has no node:sqlite (needs Node ${vde}+)`};if(e.getBuiltinModule===null)return t;try{let r=e.getBuiltinModule("node:sqlite");return xde(r)?{ok:!0,sqlite:r}:t}catch{return t}},Ode=()=>typeof process.getBuiltinModule=="function"?e=>process.getBuiltinModule(e):null,SB=new Map,zt=()=>{let e=SB.get("process");if(e!==void 0)return e;let t=Wde({getBuiltinModule:Ode(),nodeVersion:process.version});return SB.set("process",t),t},PB=()=>{let e=zt();if(!e.ok)throw new Error(`Pitfall cache unavailable: ${e.reason}`);return e.sqlite},lS=()=>{let e=zt();return e.ok?null:`[agent-witch] Pitfall cache (check_context) is off: ${e.reason}. Everything else runs.`}});var AB,vp=l(()=>{"use strict";Py();AB=3e3});var _B,bB=l(()=>{"use strict";vp();_B=`
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
`});var kB,RB,jde,Mde,wB,EB,TB=l(()=>{"use strict";kB=u(require("node:fs")),RB=u(require("node:path"));FT();vp();bB();jde=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},Mde=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},wB=e=>{kB.default.mkdirSync(RB.default.dirname(e),{recursive:!0});let{DatabaseSync:t}=PB(),r=new t(e);return r.exec(`PRAGMA busy_timeout = ${AB}`),r.exec(_B),jde(r)<_d&&Mde(r,_d),r},EB=e=>{e.close()}});var CB,IB,$T=l(()=>{"use strict";OT();CB=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Lo(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},IB=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Lo(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var LB,vB=l(()=>{"use strict";NT();$T();LB=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:iS(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=CB(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var zT,cS,UT=l(()=>{"use strict";zT=u(require("node:path"));Xe();cS=(e,t)=>e.profileEmail!==null?zT.default.join(e.installDir,yt,e.profileEmail,t):zT.default.join(e.installDir,t)});var nl,BT=l(()=>{"use strict";vp();UT();nl=e=>cS(e,xR)});var WB,xB=l(()=>{WB=[{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]}]});var Dde,Hde,dS,GT=l(()=>{"use strict";xB();Dde=WB,Hde=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),dS=()=>Dde.map(Hde)});var OB,jB,MB=l(()=>{"use strict";ht();OB="id, symptom, cause, avoidance, check_kind, check_value, keywords_json, tags_json",jB=(e,t)=>{let r=t.map(()=>"?").join(", "),o=`project_id = '' AND source = 'seed'${t.length>0?` AND id NOT IN (${r})`:""}`,n=wR;e.prepare(`INSERT INTO pitfalls (project_id, ${OB}, source, severity)
     SELECT ?, ${OB}, 'project', severity
     FROM pitfalls
     WHERE ${o}
       AND (EXISTS (SELECT 1 FROM pitfalls WHERE project_id = ?)
         OR EXISTS (SELECT 1 FROM pitfall_hits WHERE project_id = ?))
     ON CONFLICT(project_id, id) DO NOTHING`).run(n,...t,n,n);let s=e.prepare(`DELETE FROM pitfalls WHERE ${o}`).run(...t);return Number(s.changes)}});var NB,DB=l(()=>{"use strict";GT();Ep();MB();NB=e=>{let t=dS();return jB(e,t.map(r=>r.id)),t.reduce((r,o)=>tl(e,null,o.id)!==null?r:(rS(e,o),r+1),0)}});var HB,FB,$B=l(()=>{"use strict";vp();HB=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>yy?{kind:"field_too_long",field:"symptom",max:yy}:e.cause.length>hy?{kind:"field_too_long",field:"cause",max:hy}:e.avoidance.length>Sy?{kind:"field_too_long",field:"avoidance",max:Sy}:null,FB=e=>e.activeCountAfter>ka?{kind:"active_cap",max:ka}:null});var zB,UB=l(()=>{"use strict";Ep();$T();Tp();sS();$B();zB=(e,t)=>{let r=HB(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=tl(e,t.projectId,o),s=IB(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=qs(e,{projectId:t.projectId,includeRetired:!0}).filter(g=>g.id!==a.id),p=sB([...d,a]),m=FB({activeCountAfter:p});return m!==null?{ok:!1,error:m}:(rS(e,a),{ok:!0,pitfall:a})}});var Ys,KT=l(()=>{"use strict";NT();Tp();hB();TB();vB();BT();DB();UB();Ys=e=>{let t=e.dbPath??(e.layout!==void 0?nl(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=wB(t);return NB(r),{dbPath:t,listPitfalls:o=>iB(r,o),getPitfall:o=>iS(r,o),upsertPitfall:o=>zB(r,o),recordHit:o=>LB(r,o),matchPitfalls:o=>yB(r,o),close:()=>EB(r)}}});var Fde,$de,pS,VT=l(()=>{"use strict";Lp();MT();Fde=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},$de=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},pS=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=Fde(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};$de(e,e.registry,n,s);let i=oS(s);return{status:"hit",projectId:n,pitfalls:i,tip:Ip(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var uS,BB=l(()=>{"use strict";Lp();uS={name:rl.name,description:rl.description,inputSchema:rl.inputSchema}});var vo,GB,KB,xo,zde,sl,VB,xp=l(()=>{"use strict";vo=u(require("node:fs")),GB=u(require("node:os")),KB=u(require("node:path")),xo=()=>({readUtf8:e=>vo.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{vo.default.writeFileSync(e,t,"utf8")},exists:e=>vo.default.existsSync(e),mkdirp:e=>{vo.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{vo.default.renameSync(e,t)},realpath:e=>vo.default.realpathSync.native(e)}),zde=()=>({homedir:()=>GB.default.homedir()}),sl=()=>({...xo(),...zde()}),VB=e=>({...xo(),homedir:()=>e,realpath:r=>{let o=KB.default.resolve(r);return vo.default.existsSync(o)?vo.default.realpathSync.native(o):o}})});var mS,qB=l(()=>{"use strict";mS=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var qT,JB=l(()=>{"use strict";UT();yr();qT=e=>cS(e,n$)});var YB,ot,Wo=l(()=>{"use strict";YB=u(require("node:path")),ot=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(YB.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var gS,Ude,Wp,XB,fS,yS,il,hS=l(()=>{"use strict";xp();qB();JB();Wo();gS=()=>({byRealpath:{}}),Ude=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return gS();let r=t.byRealpath;return typeof r!="object"||r===null?gS():{byRealpath:r}}catch{return gS()}},Wp=(e,t=xo())=>{let r=qT(e);return t.exists(r)?Ude(t.readUtf8(r)):gS()},XB=(e,t,r)=>{ot({fs:r,filePath:qT(e),contents:`${JSON.stringify(t,null,2)}
`})},fS=e=>{let t=e.fs??xo(),r=mS(e.cwd,t),o={declinedAt:e.nowIso??new Date().toISOString(),cwd:e.cwd},n=Wp(e.layout,t);return XB(e.layout,{byRealpath:{...n.byRealpath,[r]:o}},t),o},yS=e=>{let t=e.fs??xo(),r=mS(e.cwd,t),o=Wp(e.layout,t);if(o.byRealpath[r]===void 0)return!1;let n=Object.fromEntries(Object.entries(o.byRealpath).filter(([s])=>s!==r));return XB(e.layout,{byRealpath:n},t),!0},il=e=>{let t=e.fs??xo(),r=mS(e.cwd,t);return Wp(e.layout,t).byRealpath[r]!==void 0}});var vn,SS,JT=l(()=>{"use strict";vn=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},SS=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...vn(t,"cwd")!==void 0?{cwd:vn(t,"cwd")}:{},...vn(t,"message")!==void 0?{message:vn(t,"message")}:{},...vn(t,"sessionId")!==void 0?{sessionId:vn(t,"sessionId")}:{},...vn(t,"projectId")!==void 0?{projectId:vn(t,"projectId")}:{}}}});var xn,PS=l(()=>{"use strict";_t();VT();KT();hS();JT();xn=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>il({layout:e.layout,cwd:o}));return o=>{let n=SS(o),s=null;try{return s=Ys({layout:e.layout}),pS({registry:s,resolveProjectId:uT,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var ZB,QB=l(()=>{"use strict";ZB=["AgentWitch \xB7 check_context: this folder is not an AgentWitch project yet.","Ask the user once whether to add it in AgentWitch Local (Projects) so saved pitfalls show up here.","If they decline or ignore it, do not ask again this session."].join(`
`)});var Bde,YT,Gde,Kde,Vde,AS,XT=l(()=>{"use strict";QB();Bde="UserPromptSubmit",YT=(e,t)=>{let r=e[t];return typeof r=="string"&&r.trim().length>0?r:void 0},Gde=e=>{let t;try{t=JSON.parse(e)}catch{return null}if(typeof t!="object"||t===null||Array.isArray(t))return null;let r=t,o=YT(r,"cwd"),n=YT(r,"prompt"),s=YT(r,"session_id");return{...o!==void 0?{cwd:o}:{},...n!==void 0?{message:n}:{},...s!==void 0?{sessionId:s}:{}}},Kde=e=>{if(e.status==="hit"){let t=e.tip?.trim()??"";return t.length>0?t:null}return e.status==="none"&&e.promptCreate===!0?ZB:null},Vde=e=>`${JSON.stringify({hookSpecificOutput:{hookEventName:Bde,additionalContext:e}})}
`,AS=async e=>{try{let t=Gde(await e.readStdin());if(t===null)return e.writeStderr(`[agent-witch] mcp-hook: stdin is not a JSON object
`),0;let r=Kde(await e.runCheckContext(t));r!==null&&e.writeStdout(Vde(r))}catch(t){let r=t instanceof Error?t.message:String(t);try{e.writeStderr(`[agent-witch] mcp-hook: ${r}
`)}catch{}}return 0}});var qde,Jde,eG,tG=l(()=>{"use strict";PS();XT();qde=1500,Jde=(e,t)=>new Promise(r=>{let o=[],n=!1,s=()=>{n||(n=!0,clearTimeout(i),e.removeAllListeners("data"),e.removeAllListeners("end"),e.removeAllListeners("error"),e.pause(),r(Buffer.concat(o).toString("utf8")))},i=setTimeout(s,t);e.on("data",a=>{o.push(Buffer.isBuffer(a)?a:Buffer.from(a,"utf8"))}),e.on("end",s),e.on("error",s)}),eG=async e=>{let t=r=>{process.stderr.write(r)};return AS({readStdin:()=>Jde(process.stdin,qde),writeStdout:r=>{process.stdout.write(r)},writeStderr:t,runCheckContext:xn({layout:e.layout,logError:r=>{let o=r instanceof Error?r.message:String(r);t(`[agent-witch] mcp-hook check_context: ${o}
`)}})})}});var Yde,_S,rG=l(()=>{"use strict";PS();JT();Yde="/api/local/check-context",_S=async e=>{if(e.pathname!==Yde)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=xn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(SS(t))),!0}});var oG,bS,Xde,Zde,nG,sG=l(()=>{"use strict";oG=u(require("node:path"));yr();Wo();bS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xde={hooks:[{type:"command",command:vR,timeout:3,[ks]:!0}]},Zde=e=>Array.isArray(e)&&e.some(t=>bS(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>bS(r)&&(r.command===vR||r[ks]===!0))),nG=e=>{let t=oG.default.join(e.io.homedir(),o$),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));bS(a)&&(r={...a})}catch{r={}}let o=bS(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(Zde(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(Xde),o.UserPromptSubmit=s;let{backupPath:i}=ot({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var al,kS=l(()=>{"use strict";yr();al=e=>{let t=e.begin??Pa,r=e.end??Aa,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let p=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:p,changed:p!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var iG,Qde,aG,lG=l(()=>{"use strict";iG=u(require("node:path"));kS();yr();Wo();Qde=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),aG=e=>{let t=iG.default.join(e.io.homedir(),r$),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=al({existing:r,blockBody:Qde,begin:Pa,end:Aa});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=ot({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var cG,dG,pG=l(()=>{"use strict";cG=u(require("node:path"));kS();yr();Wo();dG=e=>{let t=cG.default.join(e.io.homedir(),t$),r=gy.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${Pd}]`,`command = "${Ad}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=al({existing:n,blockBody:o,begin:Pa,end:Aa});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=ot({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var uG,ZT,mG,gG=l(()=>{"use strict";uG=u(require("node:path"));yr();Wo();ZT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mG=e=>{let t=uG.default.join(e.io.homedir(),e$),r={command:Ad,args:[...gy]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));ZT(d)&&(o={...d})}catch{o={}}let n=ZT(o.mcpServers)?{...o.mcpServers}:{},s=n[Pd];if(ZT(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[Pd]=r;let a={...o,mcpServers:n},{backupPath:c}=ot({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var ll,QT=l(()=>{"use strict";xp();sG();lG();pG();gG();ll=e=>{let t=e?.io??sl();return{ok:!0,cursorMcp:mG({io:t}),codexConfig:dG({io:t}),codexAgents:aG({io:t}),claudeHook:nG({io:t})}}});var fG,yG=l(()=>{"use strict";yr();fG=e=>{let t=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with this folder's cwd.",`projectId: ${e}`,"If status is miss or none (already declined), stay silent.","If status is hit, follow the tip. Do not dump large context."].join(`
`);return["---","description: AgentWitch check_context (token-saver)","alwaysApply: true","---","",_a,t,Sd,""].join(`
`)}});var hG,epe,SG,PG=l(()=>{"use strict";hG=u(require("node:path"));yG();yr();kS();Wo();epe=e=>e.slice(e.indexOf(_a)+_a.length,e.indexOf(Sd)).trim(),SG=e=>{let t=hG.default.join(e.projectRoot,my),r=fG(e.projectId);if(!e.fs.exists(t))return ot({fs:e.fs,filePath:t,contents:r}),{ok:!0,path:t,wrote:!0};let{next:o,changed:n}=al({existing:e.fs.readUtf8(t),blockBody:epe(r),begin:_a,end:Sd});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=ot({fs:e.fs,filePath:t,contents:o,backup:!0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var tC,eC,AG,_G=l(()=>{"use strict";tC=u(require("node:path"));Wo();eC="# agent-witch-token-saver (local; never commit)",AG=e=>{let t=tC.default.join(e.repoRoot,".git");if(!e.fs.exists(t))return{ok:!1,reason:"not a git working tree"};let r=tC.default.join(t,"info","exclude"),o=e.fs.exists(r)?e.fs.readUtf8(r):"",n=o.length>0?o.split(/\r?\n/):[],s=new Set(n.map(c=>c.trim())),i=e.relativePaths.filter(c=>!s.has(c));if(i.length===0&&s.has(eC))return{ok:!0,path:r,wrote:!1};let a=[...n];for(;a.length>0&&a[a.length-1]==="";)a.pop();s.has(eC)||a.push("",eC);for(let c of i)a.push(c);return a.push(""),ot({fs:e.fs,filePath:r,contents:a.join(`
`)}),{ok:!0,path:r,wrote:i.length>0}}});var RS,rC=l(()=>{"use strict";yr();PG();_G();RS=e=>{let t=SG({fs:e.fs,projectRoot:e.projectRoot,projectId:e.projectId}),r=AG({fs:e.fs,repoRoot:e.projectRoot,relativePaths:[my]});return{ok:!0,cursorRule:t,gitExclude:r}}});var oC,nC,wS,sC,iC=l(()=>{"use strict";oC=["pitfalls","preflight","localMcp","history","ollama","skillGen"],nC=["on","off","degraded","unavailable"],wS={pitfalls:"on",preflight:"on",localMcp:"on",history:"off",ollama:"off",skillGen:"off"},sC=()=>({...wS})});var tpe,rpe,aC,bG=l(()=>{"use strict";iC();tpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rpe=e=>nC.find(t=>t===e)??null,aC=e=>{if(!tpe(e))return null;let t={...wS};for(let r of oC){let o=rpe(e[r]);o!==null&&(t[r]=o)}return t}});var kG=l(()=>{"use strict";iC();bG()});var RG,ope,npe,wG,EG=l(()=>{"use strict";RG=u(require("node:path"));_t();kG();Wo();ope="token-saver.json",npe=(e,t)=>{if(!e.exists(t))return null;try{return aC(JSON.parse(e.readUtf8(t)))}catch{return null}},wG=e=>{let t=RG.default.join(e.projectRoot,cd,ope),r=e.flags??{...sC(),...npe(e.fs,t)},o=`${JSON.stringify(r,null,2)}
`;return e.fs.exists(t)&&e.fs.readUtf8(t)===o?{ok:!0,path:t,wrote:!1}:(ot({fs:e.fs,filePath:t,contents:o}),{ok:!0,path:t,wrote:!0})}});var Oo,Zr,ES,lC=l(()=>{"use strict";Oo=(e,t)=>{if(t==="remove")return{ok:!0,state:"Connected"};switch(e){case"Unconnected":return t==="connect"?{ok:!0,state:"SigningIn"}:Zr(e,t);case"SigningIn":return t==="signInComplete"?{ok:!0,state:"Connected"}:Zr(e,t);case"Connected":return t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Zr(e,t);case"GlobalTriggersWritten":return t==="decline"?{ok:!0,state:"Declined"}:t==="accept"?{ok:!0,state:"ProjectResolved"}:t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Zr(e,t);case"Declined":return t==="clearDecline"?{ok:!0,state:"GlobalTriggersWritten"}:Zr(e,t);case"ProjectResolved":return t==="applyDefaults"?{ok:!0,state:"DefaultsApplied"}:Zr(e,t);case"DefaultsApplied":return t==="writeProjectFragments"?{ok:!0,state:"ProjectFragmentsWritten"}:Zr(e,t);case"ProjectFragmentsWritten":return t==="verify"?{ok:!0,state:"Verified"}:Zr(e,t);case"Verified":return t==="accept"||t==="writeProjectFragments"?{ok:!0,state:e}:Zr(e,t);default:return Zr(e,t)}},Zr=(e,t)=>({ok:!1,reason:`Illegal transition ${e} + ${t}`,state:e}),ES=e=>e==="Declined"});var spe,ipe,TG,CG=l(()=>{"use strict";EG();xp();hS();lC();QT();rC();spe="projectId required on accept",ipe=e=>{let t=e.projectId;if(e.resolveProject!==void 0)try{t=e.resolveProject(e.cwd).projectId}catch(o){return{ok:!1,reason:`project resolve failed: ${o instanceof Error?o.message:String(o)}`}}let r=t?.trim()??"";return r.length>0?{ok:!0,projectId:r}:{ok:!1,reason:spe}},TG=e=>{let t=e.fs??xo(),r=e.io??sl(),o=e.fromState??"GlobalTriggersWritten";if(!e.accept){let d=Oo(o,"decline");return d.ok?(fS({layout:e.layout,cwd:e.cwd,fs:t}),{ok:!0,state:"Declined"}):{ok:!1,state:d.state,reason:d.reason}}let n=ES(o)||il({layout:e.layout,cwd:e.cwd,fs:t});n&&(o="Declined");let s=ipe(e);if(!s.ok)return{ok:!1,state:o,reason:s.reason};if(n){let d=Oo(o,"clearDecline");if(!d.ok)return{ok:!1,state:d.state,reason:d.reason};yS({layout:e.layout,cwd:e.cwd,fs:t}),o=d.state}ll({io:r}),o=Oo(o,"writeGlobalTriggers").ok?"GlobalTriggersWritten":o;let i=Oo(o,"accept");if(!i.ok)return{ok:!1,state:i.state,reason:i.reason};o=i.state;let a=Oo(o,"applyDefaults");if(!a.ok)return{ok:!1,state:a.state,reason:a.reason};wG({fs:t,projectRoot:e.cwd}),o=a.state;let c=Oo(o,"writeProjectFragments");return c.ok?(RS({fs:t,projectRoot:e.cwd,projectId:s.projectId}),{ok:!0,state:c.state,projectId:s.projectId}):{ok:!1,state:c.state,reason:c.reason}}});var IG={};Mt(IG,{AWL_CHECK_CONTEXT_TOOL:()=>uS,checkContext:()=>pS,clearProjectDecline:()=>yS,createCheckContextRunner:()=>xn,createNodeCliIo:()=>sl,createPitfallRegistry:()=>Ys,createTempCliIo:()=>VB,declineProjectForCwd:()=>fS,describePitfallCacheAvailability:()=>lS,isDeclinedCwd:()=>il,isDeclinedTerminal:()=>ES,listBundledSeedPitfalls:()=>dS,loadNodeSqlite:()=>zt,matchPitfallsByKeywords:()=>ol,readDeclinedProjectsStore:()=>Wp,resolveTokenSaverDbPath:()=>nl,runCheckContextHook:()=>AS,runCheckContextHookCli:()=>eG,runSetupProject:()=>TG,shadowPitfalls:()=>nS,transitionSetupProject:()=>Oo,tryHandleTokenSaverLocalRequest:()=>_S,writeGlobalTriggers:()=>ll,writeProjectFragments:()=>RS});var Qr=l(()=>{"use strict";KT();FT();BT();HT();sS();GT();VT();BB();PS();XT();tG();rG();QT();rC();CG();hS();lC();xp()});var cC,LG=l(()=>{"use strict";cC=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var vG,xG,ape,lpe,cpe,TS,dC=l(()=>{"use strict";Qr();Py();LG();vG=e=>{try{return e.dbPath!==void 0?Ys({dbPath:e.dbPath}):e.layout!==void 0?(nl(e.layout),Ys({layout:e.layout})):null}catch{return null}},xG=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},ape=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},lpe=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},cpe=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=vG(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(ape(n,r,i.items),{ok:!0,items:xG(n,r,o.includeRetired).map(cC),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:xG(n,r,o.includeRetired).map(cC),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=vG(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:lpe(s.error)}finally{n.close()}}}},TS=cpe});var cl,Xs,CS=l(()=>{"use strict";cl=u(require("node:path")),Xs=(e,t)=>{if(!cl.default.isAbsolute(e)||!cl.default.isAbsolute(t))return!1;let r=cl.default.relative(t,e);return r.length===0?!0:r!==".."&&!r.startsWith(`..${cl.default.sep}`)&&!cl.default.isAbsolute(r)}});var IS,WG,OG=l(()=>{"use strict";St();CS();IS=e=>({ok:!1,code:e}),WG=e=>{let t=e.requestedLexicalPath;if(t===null)return IS(ue.FOLDER_REQUIRED);if(e.roots===null)return IS(ue.FOLDER_CHECK_UNAVAILABLE);let r=e.requestedRealPath;if(r===null){let n=e.roots.some(s=>Xs(t,s.lexicalPath));return IS(n?ue.FOLDER_NOT_FOUND:ue.FOLDER_NOT_REGISTERED)}return e.roots.some(n=>n.realPath!==null&&Xs(r,n.realPath))?{ok:!0,folderRealPath:r}:IS(ue.FOLDER_NOT_REGISTERED)}});var mC,jG,pC,uC,dpe,gC,MG=l(()=>{"use strict";mC=u(require("node:fs")),jG=u(require("node:path"));qr();OG();CS();pC=e=>jG.default.resolve(De(e)),uC=e=>{try{return mC.default.realpathSync.native(e)}catch{return null}},dpe=e=>{let t=e.projectId?.trim()??"";if(t.length>0)return e.registeredFolders===null?null:e.registeredFolders.filter(o=>o.projectId===t).map(o=>o.folderPath);let r=(e.registeredFolders??[]).map(o=>o.folderPath);return[e.defaultFolderPath,...r]},gC=e=>{let t=dpe(e)?.map(pC)??null,r=e.requestedFolderPath?.trim()??"",o=r.length>0?pC(r):null;return o!==null&&uC(o)===null&&Xs(o,pC(e.managedProjectsDir))&&(t??[]).includes(o)&&mC.default.mkdirSync(o,{recursive:!0}),WG({requestedLexicalPath:o,requestedRealPath:o===null?null:uC(o),roots:t?.map(n=>({lexicalPath:n,realPath:uC(n)}))??null})}});var NG,fC,DG=l(()=>{"use strict";br();NG=new Map,fC=async(e,t=Ks)=>{let r=J(e);if(r===null)return null;let o=await t(r);if(o===null)return NG.get(r.pairingToken)??null;let n=o.map(s=>({projectId:s.id,folderPath:s.folderPath}));return NG.set(r.pairingToken,n),n}});var Op,HG,ppe,FG,upe,yC,$G,hC=l(()=>{"use strict";Op=u(require("node:fs")),HG=u(require("node:path")),ppe="linked-project-folders.json",FG=e=>HG.default.join(e,ppe),upe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.projectId=="string"&&typeof t.folderPath=="string"&&typeof t.linkedAt=="string"&&typeof t.isGitRepo=="boolean"&&(t.projectName===null||typeof t.projectName=="string")},yC=e=>{try{let r=JSON.parse(Op.default.readFileSync(FG(e),"utf8"))?.folders;return Array.isArray(r)?r.filter(upe):[]}catch{return[]}},$G=(e,t)=>{let r=[...yC(e).filter(s=>s.projectId!==t.projectId),t],o=FG(e),n=`${o}.${process.pid}.tmp`;Op.default.mkdirSync(e,{recursive:!0}),Op.default.writeFileSync(n,`${JSON.stringify({version:1,folders:r},null,2)}
`,{mode:384}),Op.default.renameSync(n,o)}});var SC,zG,PC,mpe,gpe,jo,AC=l(()=>{"use strict";SC=u(require("node:fs")),zG=u(require("node:os")),PC=u(require("node:path"));hC();mpe=(e,t)=>e===t||e.startsWith(`${t}${PC.default.sep}`)?`~${e.slice(t.length)}`:e,gpe=e=>{try{return SC.default.statSync(e).isDirectory()}catch{return!1}},jo=(e,t=zG.default.homedir())=>{let r=yC(e).map(n=>{let s=gpe(n.folderPath),i=s&&SC.default.existsSync(PC.default.join(n.folderPath,".git")),a=n.projectName??`Project ${n.projectId.slice(0,8)}`,c=mpe(n.folderPath,t),d=s?`${a} uses ${c}${i?" (git repo)":" (not a git repo)"}.`:`${a}: linked folder ${c} is missing on this computer.`;return{projectId:n.projectId,projectName:n.projectName,folderPath:n.folderPath,linkedAt:n.linkedAt,folderFound:s,isGitRepo:i,summary:d}});return{summary:r.length===0?"No project folder linked on this computer yet.":r.map(n=>n.summary).join(" "),folders:r}}});var Qs,BG,LS,fpe,Zs,UG,GG,KG=l(()=>{"use strict";Qs=u(require("node:fs")),BG=u(require("node:os")),LS=u(require("node:path"));qr();CS();fpe={folder_required:"Choose a folder to link.",folder_not_absolute:"Use a full folder path, like ~/daily-magic.",folder_not_found:"That folder does not exist on this computer.",not_a_folder:"That path is a file, not a folder.",folder_not_readable:"AgentWitch cannot read that folder.",folder_is_home:"Your whole home folder is too broad. Pick the project folder inside it.",folder_outside_home:"That folder is outside your home folder. Pick one inside your home folder, or confirm it explicitly."},Zs=e=>({ok:!1,code:e,message:fpe[e]}),UG=e=>{try{return Qs.default.realpathSync.native(e)}catch{return null}},GG=e=>{let t=e.folderPath.trim();if(t.length===0||t.includes("\0"))return Zs("folder_required");let r=De(t);if(!LS.default.isAbsolute(r))return Zs("folder_not_absolute");let o=UG(LS.default.resolve(r));if(o===null)return Zs("folder_not_found");if(!Qs.default.statSync(o).isDirectory())return Zs("not_a_folder");try{Qs.default.accessSync(o,Qs.default.constants.R_OK|Qs.default.constants.X_OK)}catch{return Zs("folder_not_readable")}let n=UG(e.homeDir??BG.default.homedir());return n!==null&&o===n?Zs("folder_is_home"):!(n!==null&&Xs(o,n))&&e.allowOutsideHome!==!0?Zs("folder_outside_home"):{ok:!0,folderRealPath:o,isGitRepo:Qs.default.existsSync(LS.default.join(o,".git"))}}});var ype,Mo,VG=l(()=>{"use strict";br();pp();qa();vT();AC();hC();KG();ype=/^[A-Za-z0-9_-]{1,128}$/,Mo=async e=>{let t=e.projectId.trim();if(!ype.test(t))return{ok:!1,httpStatus:400,code:"project_id_invalid",message:"Pick an AgentWitch project first."};let r=GG({folderPath:e.folderPath,...e.allowOutsideHome!==void 0?{allowOutsideHome:e.allowOutsideHome}:{},...e.homeDir!==void 0?{homeDir:e.homeDir}:{}});if(!r.ok)return{ok:!1,httpStatus:400,code:r.code,message:r.message};if(e.cloudConfig===null)return{ok:!1,httpStatus:409,code:"not_paired",message:"Connect this computer to AgentWitch first."};let n=await(e.updateCloudFolder??LT)(e.cloudConfig,t,r.folderRealPath);if(!n.ok)return{ok:!1,httpStatus:502,code:"cloud_update_failed",message:n.httpStatus===404?"AgentWitch could not find that project for your account.":"Could not save the folder to AgentWitch. Try again."};$t({projectFolderPath:r.folderRealPath,projectId:t,...n.projectName!==null?{projectName:n.projectName}:{}}),$G(e.profileDir,{projectId:t,projectName:n.projectName,folderPath:r.folderRealPath,isGitRepo:r.isGitRepo,linkedAt:(e.now?.()??new Date).toISOString()});let s=er(r.folderRealPath),a=await(e.syncHarnessBindings??Co)(e.cloudConfig,t,s),c=jo(e.profileDir,e.homeDir),d=c.folders.find(p=>p.projectId===t)?.summary??c.summary;return{ok:!0,projectId:t,projectName:n.projectName,folderPath:r.folderRealPath,isGitRepo:r.isGitRepo,linkedSetSlugs:s,bindingsSynced:a,summary:d}}});var _t=l(()=>{"use strict";Qa();Za();f1();qr();pp();y1();fn();E1();C1();H1();qh();qa();F1();J1();Y1();X1();Z1();eB();tB();vT();rB();aT();sT();br();dC();MG();DG();VG();AC()});var vS,jp,qG,_C,ei,bC=l(()=>{"use strict";vS=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},jp=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=vS(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},qG=e=>e>=1&&e<=5,_C=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return vS(t,"UTC")},ei=e=>{let t=e.from??new Date,r=vS(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return jp(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=jp(r,e.timeZone,o,0),s=vS(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?jp(_C(r),e.timeZone,o,0):n;if(!i&&qG(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=_C(a),qG(a.weekday))return jp(a,e.timeZone,o,0);return jp(_C(r),e.timeZone,o,0)}});var JG,kC,No,RC=l(()=>{"use strict";JG=require("node:crypto");se();_t();bC();Uh();kC=!1,No=async e=>{if(kC)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=B();if(t===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let r=J({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let o=zh(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this computer."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};kC=!0;let n=(0,JG.randomUUID)();try{let s=await za(t,"claude-cli",o.prompt);await oT(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=ei({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return $h(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{kC=!1}}});var xS,YG=l(()=>{"use strict";se();RC();Uh();xS=async()=>{let e=B();if(e===null)return;let t=_r(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await No(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Mp=l(()=>{"use strict";Uh();YG();RC();bC()});var XG=l(()=>{"use strict";Mp()});var ZG=l(()=>{"use strict";XE()});var QG=l(()=>{"use strict";ZG()});var wC=l(()=>{"use strict";Mp()});var hpe,Spe,Np,EC=l(()=>{"use strict";XG();QG();wC();ct();hpe=e=>e!==void 0&&e.trim().length>0?z(e.trim()):z(),Spe=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??ei({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??ei({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Np=e=>{let t=hpe(e.profileEmail),r=_r(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Xa(s);return i!==null?[Spe(i,o.get(i.id))]:[]});return Fh(t,n),{ok:!0,writtenCount:n.length}}});var TC=l(()=>{"use strict";Mp()});var e2=l(()=>{"use strict";se()});var t2=l(()=>{"use strict";EC();TC();wC();e2()});var r2,Dp,Hp,Fp,o2=l(()=>{"use strict";r2=u(require("node:os"));t2();Ap();Ya();Dp=e=>{if(!Ar(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Bs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Np({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Hp=async e=>{if(!Ar(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Bs(t)?No(r):{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."}},Fp=()=>{let e=B(),t=e!==null?_r(e.layout):{version:1,automations:[]};return{ok:!0,hostname:r2.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var CC=l(()=>{"use strict";o2()});var WS=l(()=>{"use strict";Ae()});var OS=l(()=>{"use strict";Ae()});var jS,s2,i2,n2,Ppe,Ape,dl,IC=l(()=>{"use strict";jS=u(require("node:fs")),s2=u(require("node:os")),i2=u(require("node:path"));WS();OS();sp();ct();n2=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},Ppe=e=>i2.default.join(s2.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Ape=async e=>jS.default.existsSync(Ppe(e))?(await lt(e)).ok:!1,dl=async(e=L())=>{let t=jS.default.existsSync(ih(e)),r=!jS.default.existsSync(Ur(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=np(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await n2(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Ie(e)}-wake`;await Ape(i)&&s.push(i);for(let c of ke(e))(await lt(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await n2(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var a2=l(()=>{"use strict";Ae()});var LC=l(()=>{"use strict";vs();Ae()});var vC=l(()=>{"use strict";vs()});var xC=l(()=>{"use strict";Ae()});var l2,c2,$p,ti=l(()=>{"use strict";l2="local-port-range.json",c2="local-app-port.json",$p="Ports for this account are in use."});var d2,p2,WC=l(()=>{"use strict";ti();d2=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return!1;let t=e,r=t.start,o=t.end;return!(typeof r!="number"||typeof o!="number"||!Number.isInteger(r)||!Number.isInteger(o)||r<49152||o>65535||o-r+1!==16||r>o)},p2=e=>typeof e=="number"&&Number.isInteger(e)&&e>=49152&&e<=65535});var ri,OC,g2,zp,u2,_pe,bpe,m2,jC,NS=l(()=>{"use strict";ri=u(require("node:fs")),OC=u(require("node:path"));ti();WC();g2=e=>OC.default.join(e,l2),zp=e=>{let t=g2(e);if(!ri.default.existsSync(t))return null;try{let r=JSON.parse(ri.default.readFileSync(t,"utf8"));if(d2(r))return r}catch{return null}return null},u2=(e,t)=>{ri.default.mkdirSync(e,{recursive:!0});let r=g2(e);ri.default.writeFileSync(r,`${JSON.stringify({start:t.start,end:t.end},null,2)}
`,"utf8")},_pe=e=>{let t=new Set;if(!ri.default.existsSync(e))return t;let r=[];try{r=ri.default.readdirSync(e)}catch{return t}for(let o of r){let n=zp(OC.default.join(e,o));n!==null&&t.add(n.start)}return t},bpe=()=>Math.floor(16384/16),m2=e=>{let t=49152+e*16;return{start:t,end:t+16-1}},jC=e=>{let t=zp(e.profileDir);if(t!==null)return t;let r=_pe(e.profilesDir),o=bpe(),n=e.random??Math.random,s=Math.floor(n()*o)%o;for(let a=0;a<o;a+=1){let c=(s+a)%o,d=m2(c);if(!r.has(d.start))return u2(e.profileDir,d),d}let i=m2(0);return u2(e.profileDir,i),i}});var oi,y2,h2,kpe,MC,HS,DS,FS,f2,NC,$S=l(()=>{"use strict";oi=u(require("node:fs")),y2=u(require("node:net")),h2=u(require("node:path"));ti();WC();kpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MC=e=>h2.default.join(e,c2),HS=e=>{let t=MC(e);if(!oi.default.existsSync(t))return null;try{let r=JSON.parse(oi.default.readFileSync(t,"utf8"));if(kpe(r)&&p2(r.localAppPort))return r.localAppPort}catch{return null}return null},DS=(e,t)=>{oi.default.mkdirSync(e,{recursive:!0}),oi.default.writeFileSync(MC(e),`${JSON.stringify({localAppPort:t},null,2)}
`,"utf8")},FS=e=>{oi.default.mkdirSync(e,{recursive:!0}),oi.default.writeFileSync(MC(e),`${JSON.stringify({portsExhausted:!0},null,2)}
`,"utf8")},f2=(e,t="127.0.0.1")=>new Promise(r=>{let o=y2.default.createServer();o.once("error",()=>{r(!1)}),o.listen(e,t,()=>{o.close(()=>r(!0))})}),NC=async e=>{let t=HS(e.profileDir);if(t!==null&&t>=e.range.start&&t<=e.range.end&&await f2(t))return DS(e.profileDir,t),{ok:!0,port:t};for(let r=e.range.start;r<=e.range.end;r+=1)if(await f2(r))return DS(e.profileDir,r),{ok:!0,port:r};return FS(e.profileDir),{ok:!1,reason:$p}}});var P2,A2,Rpe,DC,HC=l(()=>{"use strict";P2=u(require("node:fs")),A2=u(require("node:path"));NS();ti();$S();Rpe=e=>{try{return P2.default.readdirSync(e,{withFileTypes:!0}).filter(t=>t.isDirectory()).map(t=>A2.default.join(e,t.name)).sort()}catch{return[]}},DC=e=>{let t=[],r=n=>{t.includes(n)||t.push(n)},o=Rpe(e);for(let n of o){let s=HS(n);s!==null&&r(s)}for(let n of o){let s=zp(n);if(s!==null)for(let i=s.start;i<=s.end;i+=1)r(i)}return r(43347),t}});var k2,R2,_2,wpe,b2,Up,FC=l(()=>{"use strict";k2=u(require("node:fs")),R2=u(require("node:path"));HC();WS();OS();ct();_2=e=>DC(R2.default.join(e,"profiles")),wpe=async e=>{try{let t=await e.json();if(typeof t!="object"||t===null)return!0;let r=t.osUid;return typeof r!="number"||typeof process.getuid!="function"||r===process.getuid()}catch{return!0}},b2=async(e,t=1500)=>{for(let r of e)try{let o=await fetch(`http://127.0.0.1:${r}/health`,{signal:AbortSignal.timeout(t)});if(o.ok&&await wpe(o))return r}catch{}return null},Up=async(e=L())=>{if(!k2.default.existsSync(Ur(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[],reachablePort:null};let r=await b2(_2(e));if(r!==null)return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[],reachablePort:r};let o=[];for(let s of ke(e))(await lt(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await b2(_2(e));return{ok:n!==null||o.length>0,liveReachable:n!==null,hollowInstall:!1,kickstartedLabels:o,reachablePort:n}}});var w2=l(()=>{"use strict";Ae()});var E2,ni,$C,Epe,Tpe,Cpe,T2,Ipe,C2,ml,zS=l(()=>{"use strict";E2=require("node:crypto"),ni=u(require("node:fs")),$C=u(require("node:path"));ct();Epe="watchdog-log.ndjson",Tpe=200,Cpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),T2=(e=L())=>{let t=z(),r=t.installDir===e?t.logsDir:ms({installDir:e,profileEmail:t.profileEmail});return $C.default.join(r,Epe)},Ipe=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Cpe(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},C2=(e,t=L())=>{let r={id:(0,E2.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=T2(t);ni.default.mkdirSync($C.default.dirname(o),{recursive:!0});let n=ni.default.existsSync(o)?ni.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Tpe+1)),JSON.stringify(r)];return ni.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},ml=(e=20,t=L())=>{let r=T2(t);if(!ni.default.existsSync(r))return[];let o=ni.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=Ipe(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var zC,UC,BC,GC=l(()=>{"use strict";Xe();zC=jc.watchdogReinstallState,UC=900*1e3,BC=3e3});var I2=l(()=>{"use strict";GC()});var L2={};Mt(L2,{verifyAgentWitchReviveAfterKickstart:()=>vpe});var Lpe,vpe,v2=l(()=>{"use strict";I2();vC();xC();ct();Lpe=e=>new Promise(t=>{setTimeout(t,e)}),vpe=async e=>{if(await Lpe(e.verifyDelayMs??BC),!await ys(e.launchAgentLabel))return!1;let r=e.profileEmail===null?z():z(e.profileEmail),o=$e(r);return!et(o,e.staleAfterMs)}});var Bp,KC,xpe,x2,W2,VC,qC,JC=l(()=>{"use strict";Bp=u(require("node:fs")),KC=u(require("node:path"));ee();GC();xpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),x2=e=>KC.default.join(e,zC),W2=(e=L())=>{let t=x2(e);if(!Bp.default.existsSync(t))return null;try{let r=JSON.parse(Bp.default.readFileSync(t,"utf8"));return!xpe(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},VC=(e=L(),t=Date.now())=>{let r=W2(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=UC:!0},qC=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=x2(e);return Bp.default.mkdirSync(KC.default.dirname(o),{recursive:!0}),Bp.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var YC,O2=l(()=>{"use strict";Ae();JC();YC=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!VC())return{attempted:!1,ok:!1,targets:e};qC();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await lt(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var j2=l(()=>{"use strict";JC();O2()});var XC=l(()=>{"use strict";Kr()});var M2=l(()=>{"use strict";Kr()});var N2,gl,D2,H2,F2,Wpe,Ope,$2,jpe,Mpe,z2,U2=l(()=>{"use strict";N2=require("node:child_process"),gl=u(require("node:fs")),D2=u(require("node:os")),H2=u(require("node:path")),F2=require("node:util");XC();M2();ct();Wpe=(0,F2.promisify)(N2.execFile),Ope=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$2=e=>{let t=at(e),r=t===null?z():z(t);if(!gl.default.existsSync(r.configPath))return null;try{let o=JSON.parse(gl.default.readFileSync(r.configPath,"utf8"));return!Ope(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},jpe=e=>$2(e)?.wsUrl??null,Mpe=e=>{let t=jpe(e);return t!==null?Qe(t):Ze(e)?.appOrigin??null},z2=async e=>{let t=e?.installDir??L(),r=$2(t),o=r!==null?Qe(r.wsUrl):Mpe(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=H2.default.join(D2.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{gl.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??at(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await Wpe("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"AgentWitch reinstall script failed."}}finally{gl.default.existsSync(i)&&gl.default.unlinkSync(i)}}});var B2={};Mt(B2,{attemptAgentWitchWatchdogReinstall:()=>Npe});var Npe,G2=l(()=>{"use strict";j2();U2();Npe=async e=>YC(e,()=>z2())});var K2,V2,q2,Dpe,Hpe,Fpe,Gp,ZC=l(()=>{"use strict";a2();LC();vC();xC();FC();IC();WS();OS();ct();Ia();w2();zS();K2=e=>e===null?z():z(e),V2=async(e,t,r)=>{if(!await ys(e))return"not_running";let n=K2(t);if(hr(n))return"healthy";let s=$e(n);return et(s,r)?"stale_connection":"healthy"},q2=async e=>{let t=e?.staleAfterMs??12e4,r=L(),o=ke(r);return Promise.all(o.map(async n=>{let s=await V2(n.launchAgentLabel,n.profileEmail,t),i=K2(n.profileEmail),a=$e(i),c=await ys(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:et(a,t),needsRevive:s!=="healthy",reason:s}}))},Dpe=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled AgentWitch from install script and retried kickstart.":t.reinstallErrorMessage??"AgentWitch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All AgentWitch WebSocket connections are healthy."},Hpe=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",Fpe=async e=>{let t=await lt(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(v2(),L2)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Gp=async e=>{if(!gr())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await dl(r),await Up(r);let o=ke(r),n=[];for(let p of o){let m=await V2(p.launchAgentLabel,p.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:m});continue}n.push(await Fpe({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let p=gs();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(G2(),B2)),m=await p(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&C2({event:Hpe(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Dpe(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var J2,US,Y2=l(()=>{"use strict";J2=u(require("node:os"));LC();zS();ZC();US=async()=>{let e=await q2(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:J2.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:ml(1)[0]??null}}});var QC=l(()=>{"use strict";IC();ZC();Y2();zS()});var Kp,Vp,qp,X2=l(()=>{"use strict";Ae();QC();Kp=async()=>{await dl();let e=ke(),t=[];for(let r of e){let o=await lt(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=gs();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Vp=Gp,qp=Gp});var eI=l(()=>{"use strict";X2()});var GS,BS,Z2,tI,Q2,$pe,zpe,Upe,Bpe,Gpe,KS,eK=l(()=>{"use strict";GS=require("node:child_process"),BS=u(require("node:fs")),Z2=u(require("node:os")),tI=u(require("node:path")),Q2=require("node:util");Ae();ee();fs();$pe=(0,Q2.promisify)(GS.execFile),zpe=()=>tI.default.join(Z2.default.homedir(),"Library","LaunchAgents"),Upe=async e=>{if(!Jt())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await $pe("launchctl",["bootout",r]).catch(()=>{})},Bpe=e=>{let t=tI.default.join(zpe(),`${e}.plist`);BS.default.existsSync(t)&&BS.default.unlinkSync(t)},Gpe=e=>{(0,GS.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},KS=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!BS.default.existsSync(e))return{ok:!1,message:"No local AgentWitch install directory was found.",removedLaunchAgentLabels:[]};let t=Po(e);for(let r of t)await Upe(r),Bpe(r);return Gpe(e),{ok:!0,message:"Local AgentWitch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var tK,VS,rK,fl,oK,Kpe,Vpe,qpe,rI,Jpe,oI,nK=l(()=>{"use strict";tK=require("node:child_process"),VS=u(require("node:fs")),rK=u(require("node:os")),fl=u(require("node:path")),oK=require("node:util");Ae();fs();Kpe=(0,oK.promisify)(tK.execFile),Vpe=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],qpe=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],rI=e=>{VS.default.existsSync(e)&&VS.default.rmSync(e,{force:!0})},Jpe=async e=>{if(!Jt())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Kpe("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},oI=async e=>{let r=(e.listLaunchAgentLabels??Po)(e.layout.installDir),o=e.launchAgentsDir??fl.default.join(rK.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??Jpe;for(let i of r)await n(i),rI(fl.default.join(o,`${i}.plist`));let s=fl.default.dirname(e.layout.configPath);for(let i of Vpe)rI(fl.default.join(s,i));for(let i of qpe)rI(fl.default.join(e.layout.installDir,i));return VS.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var nI,sK=l(()=>{"use strict";nI="unknown_identity"});var sI=l(()=>{"use strict";ET();sK()});var Ype,iI,iK=l(()=>{"use strict";sI();Ype=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iI=e=>e.type!=="system.error"||!Ype(e.payload)?!1:e.payload.errorCode===nI});var aI=l(()=>{"use strict";eK();nK();iK()});var qS=l(()=>{"use strict";Ae();Kr();aI();QC()});var yl,JS,YS=l(()=>{"use strict";qS();yl=(e=20)=>ml(e),JS=US});var XS,hl,ZS,QS=l(()=>{"use strict";qS();XS=Is,hl=(e=20)=>Es(e),ZS=e=>Cs(e)});var eP,lI=l(()=>{"use strict";qS();eP=()=>KS()});var aK=l(()=>{"use strict";lE();YE();CC();eI();YS();QS();lI()});var lK={};Mt(lK,{buildAgentWitchAutomationStatusFromWakeServer:()=>Fp,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>XS,buildAgentWitchWakeHealthResponse:()=>ap,buildAgentWitchWakeIdentityResponse:()=>lp,buildAgentWitchWatchdogStatus:()=>JS,installHarnessFromWakeServer:()=>_p,readAgentWitchSelfUpdateLogEntries:()=>hl,readAgentWitchWatchdogLogEntries:()=>yl,restartAgentWitchFromWakeServer:()=>qp,reviveAgentWitchWebSocketFromWakeServer:()=>Vp,runAgentWitchSelfUpdateFromWakeServer:()=>ZS,runAgentWitchUninstallLocalFromWakeServer:()=>eP,runAutomationFromWakeServer:()=>Hp,syncAutomationsFromWakeServer:()=>Dp,wakeAgentWitchLaunchAgents:()=>Kp});var cK=l(()=>{"use strict";aK()});var dK,pK,cI,dI,uK=l(()=>{"use strict";dK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),pK=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?dK(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?dK(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},cI=e=>{let t=e.watchdogLogs.map(pK).join(""),r=e.updateLogs.map(pK).join("");return`<!doctype html>
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
</html>`},dI=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var mK,gK,fK=l(()=>{"use strict";mK=u(require("node:net")),gK=()=>new Promise((e,t)=>{let r=mK.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var yK,Xpe,Zpe,pI,hK=l(()=>{"use strict";yK=u(require("node:net"));Ae();fK();ip();sp();ct();Xpe=e=>new Promise(t=>{let r=yK.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Zpe=e=>new Promise(t=>{setTimeout(t,e)}),pI=async(e={})=>{let t=L(),r=Pr(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await Xpe(r))return Fz(r),r;i<o&&await Zpe(n)}let s=await gK();ah(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{ld({launchAgentPrefix:Ie(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var Qpe,uI,SK=l(()=>{"use strict";Qpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uI=e=>({force:Qpe(e)&&e.force===!0})});var Jp=l(()=>{"use strict";Ap();uK();hK();SK();yR();py();As()});var mI,Y,gI,fI,Yp,PK=l(()=>{"use strict";mI=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},Y=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},gI=e=>{e.writeHead(403),e.end()},fI=e=>e.url?.split("?")[0]??"/",Yp=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var wr=l(()=>{"use strict";PK()});var eue,AK,_K=l(()=>{"use strict";CC();wr();eue=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return Y(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},AK=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return Y(e.response,200,Fp(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await eue(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Dp(t);return Y(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Hp(t);return Y(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var tue,kK,bK,RK,yI,wK,hI=l(()=>{"use strict";tue=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],kK=e=>/embed|minilm|^bge-/i.test(e),bK=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),RK=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),yI=e=>e.filter(t=>t.trim().length>0&&!kK(t)),wK=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!kK(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>bK(s,o));if(n!==void 0)return n}for(let n of tue){let s=r.find(i=>bK(i,n));if(s!==void 0)return s}return r[0]??null}});var SI,CK,IK,tP,LK,EK,TK,rue,oue,nue,sue,iue,aue,Er,Xp=l(()=>{"use strict";SI=require("node:child_process"),CK=u(require("node:fs")),IK=u(require("node:os")),tP=u(require("node:path"));Kr();Sr();hI();LK=3e3,EK=["claude-cli","codex","cursor","antigravity"],TK={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},rue=(e,t)=>new Promise(r=>{let o=(0,SI.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},LK);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),oue=()=>{let e=IK.default.homedir();return["ollama",tP.default.join(e,".local","bin","ollama"),tP.default.join(e,".agent-witch","ollama","ollama"),tP.default.join(e,".local-agent-witch","ollama","ollama")]},nue=e=>new Promise(t=>{let r=(0,SI.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},LK);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(RK(Buffer.concat(o).toString("utf8")))})}),sue=async()=>{for(let e of oue()){if(e!=="ollama"&&!CK.default.existsSync(e))continue;let t=await nue(e);if(t!==null)return t}return[]},iue=e=>{let t=e.installedWriterIds.map(s=>TK[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=Ne(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${TK[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},aue=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:La},Er=async e=>{let t=EK.map(i=>{let a=zy(i,e.commands);return rue(a.command,a.args)}),[r,...o]=await Promise.all([sue(),...t]),n=EK.flatMap((i,a)=>o[a]===!0?[i]:[]),s=wK(r,aue());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:iue({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var lue,cue,PI,vK=l(()=>{"use strict";lue="http://127.0.0.1:11434",cue=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},PI=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||lue;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?cue(await o.json()):null}catch{return null}}});var AI=l(()=>{"use strict";Sr();Xp();vK();hI()});var due,xK,WK=l(()=>{"use strict";AI();due={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},xK=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:due[t]})),ollamaModels:yI(e.ollamaModels)})});var pue,OK,jK=l(()=>{"use strict";AI();wr();WK();pue=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return Y(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},OK=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Er({commands:Re({})});return Y(e.response,200,{ok:!0,...xK({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await pue(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await PI({model:r,prompt:o});return n===null?(Y(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(Y(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var uue,MK,NK=l(()=>{"use strict";YE();wr();uue=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return Y(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},MK=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await uue(e);if(t===null)return!0;let r=_p(t);return Y(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var DK=l(()=>{"use strict";_t()});var _I,HK=l(()=>{"use strict";DK();Ya();_I=e=>{if(!Ar(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:$t({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var FK,$K,bI,kI=l(()=>{"use strict";FK=u(require("node:path"));se();_t();Ya();$K=e=>{if(!Ar(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},bI=async e=>{let t=$K(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=In("Choose a folder for this AgentWitch project");if(r===null)return{ok:!1,cancelled:!0};let o=B();if(o===null)return{ok:!1,errorMessage:"AgentWitch is not configured on this computer."};let n=J({wsUrl:o.wsUrl,pairingToken:o.pairingToken});if(n===null)return{ok:!1,errorMessage:"Could not resolve AgentWitch cloud connection."};let s=await Mo({projectId:t.projectId,folderPath:r,allowOutsideHome:!0,profileDir:FK.default.dirname(o.layout.configPath),cloudConfig:n});return s.ok?{ok:!0,project:{id:t.projectId,folderPath:s.folderPath},bindingsSynced:s.bindingsSynced,linkedSetSlugs:s.linkedSetSlugs}:{ok:!1,errorMessage:s.message}}});var zK=l(()=>{"use strict";HK();kI()});var RI,UK,BK,GK=l(()=>{"use strict";RI=u(require("node:path"));se();_t();Ya();UK=async(e,t=Mo)=>{if(!Ar(e)||typeof e.projectId!="string"||typeof e.folderPath!="string")return{ok:!1,httpStatus:400,code:"folder_required",message:"Send projectId and folderPath."};let r=B();return r===null?{ok:!1,httpStatus:409,code:"not_paired",message:"Connect this computer to AgentWitch first."}:t({projectId:e.projectId,folderPath:e.folderPath,allowOutsideHome:e.allowOutsideHome===!0,profileDir:RI.default.dirname(r.layout.configPath),cloudConfig:J({wsUrl:r.wsUrl,pairingToken:r.pairingToken})})},BK=()=>{let e=B();return e===null?{summary:"This computer is not connected to AgentWitch yet.",folders:[]}:jo(RI.default.dirname(e.layout.configPath))}});var KK,VK=l(()=>{"use strict";zK();GK();kI();wr();KK=async e=>{if(e.request.method==="GET"&&e.pathname==="/projects/folders")return Y(e.response,200,{ok:!0,...BK()},e.cors.headers),!0;if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=_I(t);return Y(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/link-folder"){let t=await e.readJsonBody(),r=await UK(t);return Y(e.response,r.ok?200:r.httpStatus,r.ok?r:{ok:!1,error:r.code,errorMessage:r.message},e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await bI(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return Y(e.response,o,r,e.cors.headers),!0}return!1}});var qK,JK=l(()=>{"use strict";Jp();QS();YS();qK=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=yl(50),r=hl(50);return e.response.writeHead(200,dI()),e.response.end(cI({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var YK,XK=l(()=>{"use strict";lE();wr();YK=e=>e.request.method==="GET"&&e.pathname==="/health"?(Y(e.response,200,ap(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(Y(e.response,200,lp(),e.cors.headers),!0):!1});var ZK,QK=l(()=>{"use strict";lI();wr();ZK=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await eP();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}});var eV,tV=l(()=>{"use strict";eI();wr();eV=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Vp();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await qp();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Kp();return Y(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var rV,oV=l(()=>{"use strict";Jp();QS();wr();rV=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=XS();return Y(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Yp(e.request,"/update/logs",20,200);return Y(e.response,200,{ok:!0,logs:hl(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=uI(t),o=await ZS({force:r});return Y(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var nV,sV=l(()=>{"use strict";YS();wr();nV=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await JS();return Y(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Yp(e.request,"/watchdog/logs",20,200);return Y(e.response,200,{ok:!0,logs:yl(t)},e.cors.headers),!0}return!1}});var iV,aV=l(()=>{"use strict";_K();jK();NK();VK();JK();XK();QK();tV();oV();sV();iV=[YK,qK,nV,eV,rV,ZK,MK,KK,AK,OK]});var lV,cV=l(()=>{"use strict";aV();lV=async e=>{for(let t of iV)if(await t(e))return!0;return!1}});var mue,dV,pV=l(()=>{"use strict";Ap();wr();cV();mue=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:fI(e),readJsonBody:()=>mI(e)}),dV=async(e,t,r)=>{let o=e.headers.origin,n=Nh(o);try{if(o!==void 0&&o.length>0&&!n.allowed){gI(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=mue(e,t,r,n);if(await lV(s))return;Y(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{Y(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var uV,si,rP,oP=l(()=>{"use strict";uV=u(require("node:http"));Jp();pV();si=async()=>{let e=await pI(),t=uV.default.createServer((r,o)=>{dV(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`AgentWitch wake server listening on http://127.0.0.1:${e}
`),t},rP=si});var mV={};Mt(mV,{runAgentWitchBridgeCli:()=>gue});var gue,gV=l(()=>{"use strict";Ae();oP();gue=async()=>{Dt("agent-witch-bridge");let e=await si(),t=_o(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var ii,Sl=l(()=>{"use strict";mr();ii="Open AgentWitch Local from the menu bar."});var Pl,wI,fV=l(()=>{"use strict";Pl=(e,t,r)=>e===1?t:r,wI=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Pl(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Pl(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${Pl(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${Pl(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${Pl(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${Pl(p,"year","years")} ago`}});var fue,yue,yV,EI,nP,sP,hV,TI,iP=l(()=>{"use strict";fue=new Set(["/","/task","/writer-sessions","/errors","/status","/traffic","/projects","/project","/project/skill-drafts","/harness","/writer-api","/history","/estimates","/knowledge","/prompt-optimizer","/prompt-optimizer/guide","/prompt-sdlc","/prompt-sdlc/guide"]),yue=new Set(["/prompt-optimizer/agent","/prompt-optimizer/skills/query","/prompt-sdlc/agent","/prompt-sdlc/skills/query"]),yV="AgentWitchLocal-MacWebView",EI=e=>yue.has(e),nP=e=>typeof e=="string"&&e.includes(yV),sP=e=>EI(e)?!1:!!(e==="/prompt-optimizer"||e.startsWith("/prompt-optimizer/")||e==="/prompt-sdlc"||e.startsWith("/prompt-sdlc/")),hV=e=>EI(e)?!1:!!(fue.has(e)||e==="/prompt-optimizer"||e.startsWith("/prompt-optimizer/")||e==="/prompt-sdlc"||e.startsWith("/prompt-sdlc/")),TI=e=>{let t=e.method.toUpperCase();return t!=="GET"&&t!=="POST"||nP(e.userAgent)&&sP(e.pathname)?!1:hV(e.pathname)}});var hue,SV,PV=l(()=>{"use strict";Sl();iP();hue=e=>nP(e.userAgent)&&sP(e.pathname),SV=e=>{let t=hue(e);return(r,o)=>{if(t){r.writeHead(200,{"Content-Type":"text/html; charset=utf-8",...e.headers}),r.end(o);return}r.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...e.headers}),r.end(ii)}}});var Sue,AV,_V=l(()=>{"use strict";Sue=/^[0-9a-f]{7,40}$/,AV=(e="c05f6f04925cea6765bbab63144b3a0c64553fb9")=>{let t=(e??"").trim().toLowerCase();return Sue.test(t)?{commitSha:t,shortCommitSha:t.slice(0,7)}:{commitSha:null,shortCommitSha:null}}});var ai,CI,Pue,Aue,II,Wn,aP,LI,bV=l(()=>{"use strict";ai=u(require("node:fs")),CI=u(require("node:path")),Pue="local-ws-traffic.ndjson",Aue=500,II=e=>CI.default.join(e.logsDir,Pue),Wn=(e,t)=>{let r=II(e);ai.default.mkdirSync(CI.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});ai.default.appendFileSync(r,`${o}
`,"utf8")},aP=(e,t=Aue)=>{let r=II(e);if(!ai.default.existsSync(r))return[];let n=ai.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},LI=e=>{let t=II(e);ai.default.existsSync(t)&&ai.default.writeFileSync(t,"","utf8")}});var _ue,kV,RV,wV=l(()=>{"use strict";sI();_ue=new Set(Object.values(Zh)),kV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),RV=e=>{if(!kV(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!_ue.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!kV(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var EV,TV=l(()=>{"use strict";EV=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var bue,kue,Rue,Zp,CV=l(()=>{"use strict";TV();bue=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,kue=e=>bue.test(e),Rue=e=>EV(e),Zp=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Zp(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&kue(o)){r[o]=Rue(n);continue}r[o]=Zp(n)}return r}});var eo,vI,wue,Eue,Tue,xI,IV,LV,vV,Cue,lP,li,cP,WI,xV=l(()=>{"use strict";eo=u(require("node:fs")),vI=u(require("node:path"));wV();CV();wue="local-ws-trace.ndjson",Eue=1e4,Tue=1440*60*1e3,xI=e=>vI.default.join(e.logsDir,wue),IV=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},LV=e=>{if(!eo.default.existsSync(e))return;let t=eo.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Tue,n=t.filter(s=>{let i=IV(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-Eue);eo.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},vV=(e,t)=>{let r=xI(e);eo.default.mkdirSync(vI.default.dirname(r),{recursive:!0}),eo.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),LV(r)},Cue=e=>e.parsed===null?{_empty:!0}:Zp(e.parsed),lP=(e,t,r)=>{let o=RV(r);vV(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Cue(o)})},li=(e,t)=>{vV(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Zp({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},cP=(e,t=80)=>{let r=xI(e);if(LV(r),!eo.default.existsSync(r))return[];let o=eo.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=IV(s);i!==null&&n.push(i)}return n.reverse()},WI=e=>{let t=xI(e);eo.default.existsSync(t)&&eo.default.writeFileSync(t,"","utf8")}});var On,WV,Iue,OI,jI,OV=l(()=>{"use strict";On=u(require("node:fs")),WV=u(require("node:path")),Iue=256e3,OI=e=>{On.default.mkdirSync(WV.default.dirname(e),{recursive:!0}),On.default.writeFileSync(e,"","utf8")},jI=(e,t=Iue)=>{if(!On.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=On.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=On.default.openSync(e,"r");try{On.default.readSync(a,i,0,s,n)}finally{On.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var Qp=l(()=>{"use strict";bV();xV();OV()});var MI,NI,jV=l(()=>{"use strict";MI=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NI=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${MI(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${MI(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the AgentWitch client stderr log on this computer (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${MI(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var MV=l(()=>{"use strict";jV()});var DI,HI=l(()=>{"use strict";DI=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var FI=l(()=>{"use strict";jd()});var $I,zI,NV=l(()=>{"use strict";FI();$I=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},zI=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var DV=l(()=>{"use strict";HI();NV()});var HV,UI,eu,tu=l(()=>{"use strict";HI();HV=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UI=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=HV(e),r=HV(DI(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},eu=`(function () {
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
})();`});var ci,Lue,BI,FV=l(()=>{"use strict";ci=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lue=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},BI=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${ci(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?ci(r.direction):ci(r.kind),i=`trace-body-${o}`,a=ci(Lue(r.body));return`<tr>
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
    </section>`});var $V,vue,dP,xue,GI,zV=l(()=>{"use strict";zc();Xe();$V=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},vue=e=>$V(e)===So?na:oa,dP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xue=(e,t)=>`${t?`<h3>${dP(e.label)}</h3>`:""}
    <p class="muted">${dP(e.instructions)}</p>
    <pre class="sdlc-pre mono">${dP(e.command)}</pre>
    <p class="muted">${dP(e.note)}</p>`,GI=e=>{let t=$c({platform:cs(e.platform),installDirName:$V(e.installDir),launchAgentPrefix:vue(e.installDir)}),r=t.length>1;return`<section class="card">
    <p class="eyebrow">AgentWitch Local</p>
    <h2>Revive local app</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if AgentWitch Cloud cannot open Status, restart the AgentWitch client on this computer.</p>${r?`
    <p class="muted">Use the command for this computer's operating system.</p>`:""}
    ${t.map(n=>xue(n,r)).join(`
    `)}
  </section>`}});var KI,UV=l(()=>{"use strict";zc();KI=e=>cs(e)==="mac"?"Revive requested. The bridge will reconnect if this Mac can reach launchd.":"Revive requested. The bridge will reconnect when this computer can reach AgentWitch Cloud."});var BV=l(()=>{"use strict";tu();FV();zV();UV();tu()});var GV,KV,VV,qV,JV,YV,XV,Al=l(()=>{"use strict";GV="projects",KV="knowledge",VV="chunks.ndjson",qV="lessons.ndjson",JV="error-chunks.ndjson",YV="usage-stats.json",XV="knowledge-location.json"});var pP,Wue,uP,VI=l(()=>{"use strict";pP=u(require("node:path"));Al();Wue=(e,t)=>{let r=t.trim(),o=pP.default.join(e.installDir,GV,r,KV);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:pP.default.join(o,VV),memoryRunsFilePath:pP.default.join(o,qV)}},uP=Wue});var qI,Oue,ZV,QV=l(()=>{"use strict";qI=u(require("node:fs"));Al();zs();Oue=e=>{let t=Qt(e.projectFolderPath),r=`${t.metaDirPath}/${XV}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your AgentWitch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};qI.default.mkdirSync(t.metaDirPath,{recursive:!0}),qI.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},ZV=Oue});var _l,t5,e5,jue,r5,o5=l(()=>{"use strict";_l=u(require("node:fs")),t5=u(require("node:path"));fn();zs();VI();QV();e5=(e,t)=>{_l.default.existsSync(e)&&(_l.default.existsSync(t)&&_l.default.statSync(t).size>0||(_l.default.mkdirSync(t5.default.dirname(t),{recursive:!0}),_l.default.copyFileSync(e,t)))},jue=e=>{let t=Qt(e.projectFolderPath),r=uP(e.layout,e.projectId),o=`${t.memoryDirPath}/${ha}`;e5(t.ragChunksFilePath,r.ragChunksFilePath),e5(o,r.memoryRunsFilePath),ZV({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},r5=jue});var n5,Mue,bl,mP=l(()=>{"use strict";n5=u(require("node:path"));fn();zs();o5();dT();VI();Mue=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Bh(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){r5({layout:e.layout,projectFolderPath:t,projectId:o});let s=uP(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=Qt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:n5.default.join(n.memoryDirPath,ha),projectId:null}},bl=Mue});var gP,Due,fP,JI=l(()=>{"use strict";gP=u(require("node:fs"));Al();Due=(e,t=500)=>{if(!gP.default.existsSync(e))return;let r=gP.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);gP.default.writeFileSync(e,`${o.join(`
`)}
`)},fP=Due});var yP,Hue,di,YI=l(()=>{"use strict";yP=u(require("node:path"));Al();mP();Hue=e=>{let t=bl(e);if(t===null)return null;let r=yP.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:yP.default.join(r,YV),errorChunksFilePath:yP.default.join(r,JV)}},di=Hue});var i5,ru,a5,s5,XI,l5,zue,ZI,c5,QI,eL,tL,rL=l(()=>{"use strict";i5=require("node:crypto"),ru=u(require("node:fs")),a5=u(require("node:path"));el();Al();YI();s5=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),XI=e=>{if(!ru.default.existsSync(e))return s5();try{let t=JSON.parse(ru.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return s5()},l5=(e,t)=>{ru.default.mkdirSync(a5.default.dirname(e),{recursive:!0}),ru.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},zue=e=>{let t=Rr(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,i5.createHash)("sha256").update(o).digest("hex").slice(0,16)},ZI=e=>{let t=di(e);return t===null?null:XI(t.usageStatsFilePath)},c5=e=>{if(e.chunkIds.length===0)return;let t=di(e);if(t===null)return;let r=XI(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;l5(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},QI=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=di(e);if(r===null)return null;let o=zue(t),n=XI(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return l5(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},eL=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,tL=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var ou,d5,Uue,Bue,p5,Gue,oL,nu,su,nL,kl,sL,iL=l(()=>{"use strict";ou=u(require("node:fs")),d5=u(require("node:path"));el();mP();JI();rL();Uue="http://127.0.0.1:11434",Bue="nomic-embed-text",p5=(e,t,r)=>bl({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,Gue=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},oL=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},nu=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Uue,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Bue;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},su=(e,t,r)=>{let o=p5(e,t,r);if(o===null||!ou.default.existsSync(o))return[];let n=ou.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},nL=async e=>{let t=Rr(e.text),r=oL(t);if(r.length===0)return 0;let o=p5(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;ou.default.mkdirSync(d5.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await nu(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};ou.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return fP(o),n},kl=async e=>{let t=await nu(e.query);if(t===null)return[];let r=e.minScore??0,s=su(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:Gue(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return c5({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},sL=e=>e.length===0?"":`Local knowledge (from this computer):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var iu,u5,Kue,Vue,aL,lL,cL,m5=l(()=>{"use strict";iu=u(require("node:fs")),u5=u(require("node:path"));el();YI();JI();iL();Kue=e=>{if(!iu.default.existsSync(e))return[];let t=iu.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Vue=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},aL=async e=>{let t=di(e);if(t===null)return 0;let r=Rr(e.text),o=oL(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;iu.default.mkdirSync(u5.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await nu(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};iu.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return fP(n,200),s},lL=async e=>{let t=di(e);if(t===null)return[];let r=await nu(e.query);if(r===null)return[];let o=e.minScore??.3;return Kue(t.errorChunksFilePath).map(s=>({chunk:s,score:Vue(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},cL=e=>e.length===0?"":`Past failures on this computer (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var dL=l(()=>{"use strict";iL();rL();m5()});var Tr,au,hP=l(()=>{"use strict";wT();Tr=RT,au=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: #f4f3f0;
  --aw-zinc-100: #ebe9e4;
  --aw-zinc-200: #ddd9d2;
  --aw-zinc-400: #c9c4bb;
  --aw-zinc-500: ${Tr.gray500};
  --aw-zinc-600: ${Tr.gray600};
  --aw-zinc-700: ${Tr.gray700};
  --aw-zinc-800: ${Tr.gray900};
  --aw-zinc-900: ${Tr.gray900};
  --aw-brand-600: #1f6656;
  --aw-brand-700: #19564a;
  --aw-brand-50: #dde8e3;
  --aw-emerald-50: ${Tr.success50};
  --aw-emerald-700: ${Tr.success700};
  --aw-amber-50: ${Tr.warning50};
  --aw-amber-900: ${Tr.warning900};
  --aw-red-50: ${Tr.error50};
  --aw-red-700: ${Tr.error700};
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
`.trim()});var g5,f5=l(()=>{"use strict";g5=`
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
`});var y5,h5,S5=l(()=>{"use strict";hP();f5();tu();y5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),h5=e=>{let t=y5(e.installBundleVersionLabel?.trim()??"unknown");return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${y5(e.title)} \xB7 AgentWitch Local</title>
  <style>${au}${g5}</style>
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
  <script>${eu}</script>
</body>
</html>`}});var que,Jue,pL,P5,uL,A5=l(()=>{"use strict";hP();S5();tu();que=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Jue=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],pL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P5=(e,t)=>`<a class="${e}" href="/" aria-label="AgentWitch Local home, install bundle ${t}">${que}<span class="brand-text">AgentWitch<span class="brand-sub">Local(${t})</span></span></a>`,uL=e=>{if(e.activePath==="/prompt-optimizer")return h5({title:e.title,body:e.body,installBundleVersionLabel:e.installBundleVersionLabel});let t=Jue.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=pL(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=pL(e.installBundleVersionLabel?.trim()??"unknown"),s=P5("brand brand-in-sidebar",n),i=P5("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${pL(e.title)} \xB7 AgentWitch Local</title>
  <style>${au}</style>
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
  <script>${eu}</script>
</body>
</html>`}});var SP,lu,PP=l(()=>{"use strict";SP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lu=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${SP(e.syncMessage)}</p>`:"",o=SP(e.manageHref),n=SP(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${SP(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var mL,gL,fL,_5=l(()=>{"use strict";mL=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,gL=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer AgentWitch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,fL=e=>e==="ok"?'<div class="alert-success">Update finished. This computer may restart the AgentWitch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var b5=l(()=>{"use strict";A5();PP();_5()});var j,Rl=l(()=>{"use strict";j=e=>e==="passed"||e==="stopped"||e==="failed"});var k5,yL,pi,hL,AP=l(()=>{"use strict";k5="Stopped at the round limit. The best prompt is kept.",yL="Stopped because the score stopped rising. The best prompt is kept.",pi="Finished. The best prompt is the result.",hL="Wizard ended. Progress from finished steps is kept."});var jn,SL=l(()=>{"use strict";jn=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var Yue,Xue,cu,R5,_P=l(()=>{"use strict";Yue=/\n+|;\s+/,Xue=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,cu=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(Yue).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,Xue(s)]},[]);return[...t,...o]},[]),R5=e=>{let t=cu(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var ve,wl=l(()=>{"use strict";ve=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var du,PL=l(()=>{"use strict";_P();wl();du=e=>{let t=[...e.priorRounds,e.current],r=ve(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:R5(o)}}});var AL,Zue,Que,bP,_L=l(()=>{"use strict";AL={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},Zue=e=>{try{let t=JSON.parse(e.fragment);return{...AL,objects:[...e.objects,t]}}catch{return{...AL,objects:e.objects}}},Que=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:Zue(r)},bP=e=>[...e].reduce(Que,AL).objects});var eme,bL,tme,w5,kL=l(()=>{"use strict";_L();eme=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},bL=e=>{let t=bP(e).filter(eme),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},tme=(e,t)=>({...e,passed:e.score>=t}),w5=(e,t)=>{let r=bL(e);return r===null?null:tme(r,t)}});var RL,wL,kP=l(()=>{"use strict";RL="The judge reply needs a score and a reason.",wL="The improver reply was empty."});var rme,E5,T5=l(()=>{"use strict";rme=/API Error:? \d{3}|\b429\b|too many requests|rate[_ ]limit|spend limit|usage limit|monthly limit|quota|insufficient credit|overloaded|unauthorized|authentication required|not logged in|please run .+login|invalid api key/i,E5=e=>{let t=e.trim();return t.length===0||t.length>600||!rme.test(t)?null:`The judge CLI returned an error: ${t}`}});var C5,I5=l(()=>{"use strict";C5=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var L5,v5=l(()=>{"use strict";L5=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var nme,x5,W5=l(()=>{"use strict";I5();v5();AP();_P();nme=e=>{let t=cu(e);return t.length===0?yL:`${yL} Avoid: ${t.join("; ")}.`},x5=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:k5};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(C5(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:nme(L5(r))}}return null}});var Mn,sme,ui,O5,RP=l(()=>{"use strict";Mn=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},sme=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,ui=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",sme(e.tokens),`Delay: ${Mn(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},O5=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var ime,j5,M5=l(()=>{"use strict";kL();ime=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,j5=e=>{let r=(ime.exec(e)?.[1]??e).trim();return r.length===0||bL(r)!==null?null:r}});var N5,wP,D5=l(()=>{"use strict";RP();M5();kP();N5=e=>({type:"call",role:"judge",choice:e.choice,prompt:O5({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),wP=e=>{let t=j5(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:wL}}:{nextPrompt:t,continuation:N5({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var EL,H5=l(()=>{"use strict";SL();PL();kL();kP();T5();AP();W5();kP();D5();EL=e=>{let t=w5(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:E5(e.raw)??RL}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=x5({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=du({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:jn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var pu,TL=l(()=>{"use strict";pu=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var F5=l(()=>{"use strict"});var $5=l(()=>{"use strict";F5()});var mi,z5=l(()=>{"use strict";mi=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var ame,CL,U5=l(()=>{"use strict";RP();ame=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,CL=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",ame(e.tokens),`Delay: ${Mn(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var lme,cme,dme,IL,B5=l(()=>{"use strict";lme=/[A-Za-z0-9_./~-]{3,180}/g,cme=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,dme=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||cme.test(t)},IL=(e,t=12)=>{let r=[];for(let o of e.matchAll(lme)){let n=o[0].replace(/\.+$/,"");if(!(!dme(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var uu,G5=l(()=>{"use strict";uu=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var EP,LL,K5,mu,vL=l(()=>{"use strict";EP=e=>Math.floor(e/2),LL=e=>Math.max(EP(e)+1,e-20),K5=(e,t)=>e>=t?"passes":e>=LL(t)?"close":e>=EP(t)?"weak":"bad",mu=e=>[{band:"bad",label:`0\u2013${EP(e)-1} bad`},{band:"weak",label:`${EP(e)}\u2013${LL(e)-1} weak`},{band:"close",label:`${LL(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var TP,xL=l(()=>{"use strict";vL();TP=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${K5(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var Cr,WL=l(()=>{"use strict";Cr=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var V5,q5=l(()=>{"use strict";V5=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var pme,ume,J5,Y5=l(()=>{"use strict";Rl();xL();WL();q5();pme=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],ume=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",J5=e=>{let t=e.wizard;if(t===void 0)return[];let r=Cr(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=pme.map((y,h)=>{let S=!s&&!n&&h===r?"active":"done";return{id:`wizard-${h+1}`,label:y,state:S,detail:null}}).filter((y,h)=>s?!0:h<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=TP(e),d=c.filter(y=>y.id==="round-0"),p=V5(t)&&(!n||a)?c.filter(y=>y.id!=="round-0"):[],m=j(e.status)&&!s,g=m?[{id:"end",label:ume(e),state:"done",detail:e.errorMessage}]:[];if(m&&g.length>0){let y=Math.min(r,i.length),h=i.slice(0,y).map(S=>({...S,state:"done"}));return[...d,...h,...g,...p]}return[...d,...i,...p,...g]}});var mme,OL,X5=l(()=>{"use strict";Rl();xL();Y5();mme=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",OL=e=>{if(e.wizard!==void 0)return J5(e);let t=TP(e),r=j(e.status)?[{id:"end",label:mme(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var gu,Z5=l(()=>{"use strict";gu=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var CP,jL,fu,Tl,IP,ML,Q5=l(()=>{"use strict";mr();CP="/prompt-optimizer/agent",jL=`${Bg}${CP}`,fu=`${tk}://prompt-optimizer`,Tl="The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",IP=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${Tl}`,ML="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var to=l(()=>{"use strict"});var we,yu=l(()=>{"use strict";to();we=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var NL,eq=l(()=>{"use strict";NL="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var tq,rq=l(()=>{"use strict";tq=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var hu,nq=l(()=>{"use strict";rq();to();hu=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:tq(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var DL,sq=l(()=>{"use strict";to();DL=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var HL,iq=l(()=>{"use strict";to();HL=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var aq,Su,lq=l(()=>{"use strict";aq=["generalize","evaluate","separate","optimize_modules"],Su=(e,t)=>{let r=aq.indexOf(t);if(r===-1)return e;let o=aq.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var LP,FL=l(()=>{"use strict";_P();LP=e=>{let t=cu(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Pu,cq=l(()=>{"use strict";FL();Pu=e=>{let t=LP(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var fme,yme,hme,dq,pq=l(()=>{"use strict";fme=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),yme=/^\{\{[a-zA-Z0-9_-]+\}\}$/,hme=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(fme(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},dq=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>yme.test(n)?n:hme(n,r)).join("")}});var $L,uq=l(()=>{"use strict";pq();$L=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:dq(o.prompt,t)}))}))});var Sme,Au,mq=l(()=>{"use strict";to();FL();Sme=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Au=e=>{let t=LP(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=Sme(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var _u,gq=l(()=>{"use strict";TL();_u=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return pu({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var bu,UL=l(()=>{"use strict";wl();bu=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=ve(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var BL,fq=l(()=>{"use strict";UL();BL=e=>{let t=bu({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var gi,yq=l(()=>{"use strict";gi=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var Pme,Ame,_e,vP=l(()=>{"use strict";yu();Pme=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},Ame=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,_e=e=>{let t=we(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:Pme(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>Ame(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var hq,Sq=l(()=>{"use strict";yu();vP();hq=e=>{let t=_e(e.wizard),r=we(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var GL,Pq=l(()=>{"use strict";Sq();GL=e=>{let t=hq({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var _me,Aq,_q=l(()=>{"use strict";_me=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},Aq=e=>[...e].reduce(_me,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var bme,bq,kq=l(()=>{"use strict";bme=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},bq=e=>[...e].reduce(bme,{out:"",inString:!1,escaped:!1}).out});var kme,Rme,Rq,wq=l(()=>{"use strict";_q();kq();kme=e=>e.charCodeAt(0)===65279?e.slice(1):e,Rme=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},Rq=e=>bq(Aq(Rme(kme(e))))});var wme,Eme,Tme,Eq,Cme,Cl,xP=l(()=>{"use strict";_L();wq();wme=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Eme=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},Tme=e=>[...e].reduce(Eme,{out:"",inString:!1,escaped:!1}).out,Eq=e=>{let t=bP(e);return t.length===0?null:t[t.length-1]},Cme=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Cl=e=>{let t=Rq(wme(e)),r=Eq(t);if(r!==null)return r;let o=Tme(t),n=Eq(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Cme(i)}}});var Ime,Lme,KL,Tq,Cq=l(()=>{"use strict";Ime=/^[a-z0-9][a-z0-9-]{0,62}$/,Lme=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return Ime.test(t)?t:""},KL=e=>e.replace(/\s+/gu," ").trim(),Tq=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=Lme(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=KL(n.name),a=KL(n.description),c=KL(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var Iq,Lq,vq=l(()=>{"use strict";Iq=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},Lq=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var VL,xq=l(()=>{"use strict";xP();Cq();vq();VL=(e,t)=>{let r=(()=>{try{return Cl(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(Iq(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(Lq).filter(a=>a!==null),i=Tq({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var qL,Wq=l(()=>{"use strict";qL=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var JL,Oq=l(()=>{"use strict";JL=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var vme,YL,jq=l(()=>{"use strict";yu();vP();vme=(e,t)=>e==="passed"||e==="stopped"||e==="failed"?e:e==="pending"?"not run":t==="failed"?"failed":"stopped",YL=e=>{let t=_e(e.wizard),r=we(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${vme(n.status,e.cycleStatus)} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var ku,Mq=l(()=>{"use strict";ku=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Ir,xme,XL,Nq=l(()=>{"use strict";Ir=u(da());xP();xme=(0,Ir.isType)({name:Ir.isNonEmptyString,description:Ir.isString,sampleValue:Ir.isString}),XL=e=>{let t=Cl(e);if(!(0,Ir.isType)({templatedPrompt:Ir.isNonEmptyString,variables:(0,Ir.isArrayWithEachItem)(xme)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var xe,Wme,Ome,ZL,Dq=l(()=>{"use strict";xe=u(da());to();xP();Wme=(0,xe.isType)({id:xe.isNonEmptyString,title:xe.isNonEmptyString,prompt:xe.isNonEmptyString,order:xe.isNumber}),Ome=(0,xe.isType)({id:xe.isNonEmptyString,title:xe.isNonEmptyString,summary:xe.isString,topology:(0,xe.isOneOf)("chain","parallel"),modules:(0,xe.isArrayWithEachItem)(Wme),recommended:xe.isBoolean}),ZL=e=>{let t=Cl(e);if(!(0,xe.isType)({options:(0,xe.isArrayWithEachItem)(Ome)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Il,Hq=l(()=>{"use strict";Il=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var jme,QL,ev=l(()=>{"use strict";jme=/\{\{([a-zA-Z0-9_-]+)\}\}/g,QL=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(jme,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Lr,vr,Fq=l(()=>{"use strict";wl();ev();Lr=e=>QL(e.templatedPrompt,e.variables),vr=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return ve(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Lr(e.wizard)}});var Mme,fi,$q=l(()=>{"use strict";Mme=/\{\{([a-zA-Z0-9_-]+)\}\}/g,fi=(e,t)=>e.replace(Mme,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var Nme,yi,WP=l(()=>{"use strict";Nme=/\{\{([a-zA-Z0-9_-]+)\}\}/g,yi=e=>{let t=new Set,r=[];for(let o of e.matchAll(Nme)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Ru,zq=l(()=>{"use strict";WP();Ru=e=>e.variables.length>0||yi(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var tv,rv=l(()=>{"use strict";to();tv=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var wu,Uq=l(()=>{"use strict";wl();rv();wu=e=>{let t=e.wizard.evaluateSelectedRound??ve(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:tv(r.judgement,e.passScore)}});var Eu,Bq=l(()=>{"use strict";Eu=e=>e.length===1&&e[0].modules.length===1});var ov,Gq=l(()=>{"use strict";ov=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Be,OP,Tu=l(()=>{"use strict";Be=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),OP=(e,t)=>`<p class="muted">The computer runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var Kq,Vq=l(()=>{"use strict";Tu();Kq=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Be("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Be("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Be("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var qq,Jq=l(()=>{"use strict";Rl();Tu();qq=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!j(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Be("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>The AgentWitch Local app talks to AWL on this computer, on a port unique to your account. The run is stored on this computer.</p>"),Be("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Be("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this computer",OP(e.writerLabel,e.folder)),Be("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Be("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var Yq,Xq=l(()=>{"use strict";Tu();Yq=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Be("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Be("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Be("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var Zq,Qq=l(()=>{"use strict";Tu();Zq=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Be("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Be("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",OP(e.writerLabel,e.folder)),...r?[Be("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var jP,eJ=l(()=>{"use strict";Rl();Vq();Jq();Xq();Qq();jP=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(j(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return qq(r);case"evaluate":return Kq({...r,currentRound:e.currentRound});case"separate":return Zq(r);case"optimize_modules":return Yq({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Cu,Do,tJ=l(()=>{"use strict";Cu=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),Do=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var Dme,MP,nv,rJ=l(()=>{"use strict";WP();Dme="wizardParam_",MP=e=>`${Dme}${e}`,nv=e=>{let t=yi(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=MP(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Bt,oJ=l(()=>{"use strict";Bt=["generalize","evaluate","separate","optimize_modules"]});var Iu,hi,Ll,ro=l(()=>{"use strict";Iu="Stopped because the confirmed token or spend budget was exceeded.",hi="Approaching the confirmed budget. Further trials may hard-stop.",Ll="Confirm the Step 4 token and spend budget before optimizing modules."});var Tt,vl=l(()=>{"use strict";Tt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var tr,Lu=l(()=>{"use strict";ro();tr=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var Hme,iJ,aJ,NP,lJ,sv=l(()=>{"use strict";ro();Hme={codex:9e4,"claude-cli":3e4,cursor:4e4,"cursor-cloud":4e4,antigravity:3e4},iJ=2,aJ=e=>{let t=e?.trim()??"";return t.length===0?null:Hme[t]??null},NP=e=>{let t=aJ(e);return t===null?8e3:t*iJ},lJ=e=>{let t=aJ(e);return t===null?4e3:t*iJ}});var Fme,rr,vu=l(()=>{"use strict";ro();Fme={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},rr=e=>{let t=e?.trim()??"";return t.length===0?.01:Fme[t]??.01}});var DP,iv=l(()=>{"use strict";ro();vu();DP=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=rr(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var av,xu,HP,lv=l(()=>{"use strict";ro();sv();vl();Lu();iv();vu();av=e=>{let t=DP({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??rr(e.writerId)??.01,s=r*o*NP(e.writerId);return{targetTokenBudget:s,estimatedSpendUsd:Tt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},xu=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),HP=e=>{let t=e.existing??tr(),r=av({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return xu(t,r)}});var Si,xl,dJ=l(()=>{"use strict";ro();sv();to();vl();Lu();lv();iv();vu();Si=e=>{let t=DP({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??rr(e.writerId),i=r*lJ(e.writerId),a=n*o*NP(e.writerId),c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:Tt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},xl=e=>{let t=e.existing??tr();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=Si({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return xu(t,r)}});var oo,pJ=l(()=>{"use strict";vl();ro();Lu();oo=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??tr(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=Tt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var dv,Wl,uJ=l(()=>{"use strict";ro();vl();dv=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=Tt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:Iu,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Iu,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,p=s!==null&&s>0&&o>=s*c;return(d||p)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:hi,costControls:{...t,softWarnFired:!0,softWarnMessage:hi}}:null},Wl=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var pv,mJ=l(()=>{"use strict";pv=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var W=l(()=>{"use strict";Rl();AP();H5();SL();RP();TL();$5();z5();U5();B5();PL();G5();wl();X5();WL();vL();Z5();Q5();to();yu();eq();nq();sq();iq();lq();cq();uq();mq();gq();UL();fq();yq();vP();Pq();xq();Wq();Oq();jq();Mq();Nq();Dq();Hq();Fq();ev();$q();WP();zq();Uq();Bq();rv();Gq();eJ();tJ();rJ();oJ();ro();vl();Lu();lv();dJ();vu();pJ();uJ();mJ()});var uv=l(()=>{"use strict";Ud()});var yJ,hJ=l(()=>{"use strict";yJ=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.is_error!==!0)return null;let i=typeof s.result=="string"&&s.result.trim().length>0?s.result.trim():typeof s.subtype=="string"?`Claude CLI error: ${s.subtype}`:"Claude CLI returned an error without a message.",a=i.startsWith("Claude CLI")?i:`Claude CLI: ${i}`;return a.length>400?`${a.slice(0,397)}...`:a}});var $me,SJ,PJ=l(()=>{"use strict";uv();$me=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,SJ=e=>{let t=js(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll($me)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var _J,zme,Ume,or,Bme,Gme,AJ,$P,bJ,Kme,nr,kJ,RJ,wJ,Wr=l(()=>{"use strict";uv();hJ();PJ();_J=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),zme=/usage limit|monthly (usage |spend )?limit|spend limit|hit your (org's |usage )?(monthly )?(usage |spend )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit|too many requests|\b429\b/i,Ume=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,or=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(zme.test(e.errorMessage))return"usage_limit";if(Ume.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},Bme="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Gme="The writer waited on terminal input and did not return a prompt.",AJ=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|spend limit|insufficient credit|rate limit|too many requests|billing|subscription required|API Error: \d{3}/i,$P=e=>{let t=e.trim();if(t.length===0||t.length>=500||!AJ.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>AJ.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},bJ=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},Kme=e=>$P(e.stdout)??$P(e.stderr)??(bJ(e.replyFile)?$P(e.replyFile):null),nr=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Bme;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Gme:null},kJ=e=>{let t=e.trim();return t.length===0?null:nr(t)!==null?t:$P(t)??(bJ(t)?t:null)},RJ=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],wJ=e=>{let t=e.replyFileText?.trim()??"",r=nr([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=Kme({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=or({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=SJ([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=yJ(e.stdout);if(i!==null){let c=or({errorMessage:i});return c===void 0?{ok:!1,errorMessage:i}:{ok:!1,errorMessage:i,errorKind:c}}let a=js(e.stdout);if(a!==null&&a.text.trim().length>0)return{ok:!0,text:a.text,tokens:a.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var Vme,TJ,EJ,Ai,zP=l(()=>{"use strict";Wr();Vme=400,TJ=(e,t=Vme)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},EJ=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:kJ(e.promptText)},Ai=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:EJ(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=EJ(e.revisions[n]);if(s!==null)return s.trim()}return null}});var F,qme,UP,Ee,_i,IJ,CJ,LJ,vJ,Ge=l(()=>{"use strict";F="manual",qme=["claude-cli","codex","cursor","antigravity"],UP={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ee=e=>e===F?"You":e in UP?UP[e]:e,_i=e=>qme.filter(t=>e.includes(t)),IJ=e=>{let t=_i(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},CJ=(e,t)=>t===F?F:e.find(r=>r===t)??null,LJ=(e,t,r)=>{let o=_i(e),n=CJ(o,t),s=CJ(o,r);return n===null||s===null?null:{judge:n,improver:s}},vJ=(e,t,r)=>{let o=_i(e);return t===null||t.trim()===""?r!==F?r:o[0]??null:t===F?null:o.find(n=>n===t)??null}});var xJ,BP,mv,bi,gv,Gt,Ho,We,bt=l(()=>{"use strict";xJ=u(require("node:fs")),BP=u(require("node:os")),mv=u(require("node:path"));qr();bi="~",gv=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Gt=e=>{let t=BP.default.homedir(),r=gv(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Ho=e=>{let t=e.trim().length===0?"~":e.trim(),r=De(t),o=mv.default.isAbsolute(r)?gv(r):gv(mv.default.resolve(BP.default.homedir(),r));try{if(!xJ.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}return{ok:!0,path:o,display:Gt(o)}},We=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:BP.default.homedir()});var Ct,Nn=l(()=>{"use strict";Ct='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var fv,WJ,Jme,OJ,jJ,yv=l(()=>{"use strict";W();Ge();bt();Nn();fv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WJ=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Jme=e=>{let t=WJ(e.state),r=`<h2>${fv(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${fv(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${Ct}</button></div><template>${r}</template></li>`},OJ=e=>{let t=e.wizard;if(t===void 0)return"";let r=jP({status:e.status,wizard:t,writerLabel:Ee(e.judgeModel),runnerLabel:Ee(e.runnerModel??e.judgeModel),folderDisplay:Gt(We(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this computer">${r.map(Jme).join("")}</ol>`},jJ=e=>{let t=e.wizard;if(t===void 0)return"";let r=jP({status:e.status,wizard:t,writerLabel:Ee(e.judgeModel),runnerLabel:Ee(e.runnerModel??e.judgeModel),folderDisplay:Gt(We(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this computer</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${WJ(n.state)}<span class="sdlc-pipeline-label">${fv(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var Or,MJ,NJ,DJ,hv=l(()=>{"use strict";W();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MJ="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",NJ=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Or(MJ)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${Or(i.name)}}}</strong> \u2014 ${Or(i.description)} (sample: ${Or(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${Or(r)}</pre>`,n=Lr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${Or(n)}</pre>`;return`${t}${o}${s}`},DJ=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${Or(MJ)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${Or(n.name)}}}</strong> \u2014 ${Or(n.description)} (sample: ${Or(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${Or(r)}</pre>`;return`${t}${o}`}});var Wu,Sv=l(()=>{"use strict";Wu=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var HJ,FJ=l(()=>{"use strict";W();HJ=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=mi({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=ui({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var Pv,Ou,Av=l(()=>{"use strict";Nn();FJ();Pv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ou=e=>{let t=HJ(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${Pv(r)}">${Ct}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${Pv(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${Pv(t)}</pre></template>`}});var _v,ju,bv=l(()=>{"use strict";Nn();_v=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ju=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${_v(r)}">${Ct}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${_v(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${_v(t)}</pre></template>`}});var GP,Ol,kv=l(()=>{"use strict";Sv();Av();bv();GP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ol=e=>{let t=Wu(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${GP(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,p=e.cycle.revisions.map(m=>{let g=m.judgement?.score,y=g==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${g}`,h=m.judgement?.reasons?.trim()??"",S=h.length===0?"":`<br><span class="muted">${GP(h)}</span>`,T=ju({roundLabel:d(m.roundNumber),promptText:m.promptText}),f=Ou({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),b=`${T}${f}`;if(e.interactive){let I=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${I}> <span class="sdlc-wizard-revision-title">${GP(y)}</span></label>${b}${S}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${GP(y)}</span>${b}${S}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var Rv,$J,zJ,UJ,wv=l(()=>{"use strict";Rv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$J=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Rv(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Rv(t.prompt)}</pre></li>`).join("")}</ol>`,zJ=e=>$J([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),UJ=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Rv(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${$J(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var Mu,Yme,KP,Ev=l(()=>{"use strict";W();wv();Mu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yme=e=>{let t=e.wizard;return t===void 0?"":vr({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},KP=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Yme(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Mu(n.orchestratorSkill.fileName)}</code> \u2014 ${Mu(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${Mu(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=zJ(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${Mu(r)} <span class="muted">${Mu(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var st,Xme,Zme,Qme,ege,VP,tge,rge,oge,nge,sge,ige,jl,qP=l(()=>{"use strict";W();yv();hv();kv();Av();bv();Ev();st=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xme={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},Zme=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${st(o)}</pre>`:`<p class="sdlc-pre-preview mono">${st(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${st(o)}</pre></details>`;return`<h2>${st(e)}</h2>${n}`},Qme=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Lr(t).trim(),n=vr({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!j(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${Zme("What is being evaluated",i)}`},ege=(e,t)=>{let r=e.wizard;if(r===void 0||j(e.status))return"";let o=Xme[t];return o===void 0||r.phase!==o?"":jJ(e)},VP=(e,t,r)=>{let o=ege(e,t),n=t==="wizard-2"?Qme(e):"";return`${o}${n}${r}`},tge=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},rge=e=>{let t=e.wizard;return t===void 0?"":NJ(t)},oge=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${st(a)}</span>`,d=`Round ${n.roundNumber}`,p=ju({roundLabel:d,promptText:n.promptText}),m=Ou({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${st(s)}${i}</span>${p}${m}${c}</li>`}).join("")}</ul>`,nge=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Ol({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=tge(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${oge(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=vr({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${st(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",p=`Round ${c.roundNumber} \u2014 score ${d}`,m=ju({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),g=Ou({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${st(p)}</span>${m}${g}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${st(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},sge=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${st(n.title)}</strong> <span class="muted">(${st(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${st(o.title)}</strong>${n}${st(s)}${KP(e,o)}</li>`}).join("")}</ul>`},ige=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${st(i)}</span> <strong>${st(n.title)}</strong>${st(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${st(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Ol({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},jl=(e,t)=>{switch(t){case"wizard-1":return VP(e,t,rge(e));case"wizard-2":return VP(e,t,nge(e));case"wizard-3":return VP(e,t,sge(e));case"wizard-4":return VP(e,t,ige(e));default:return""}}});var age,lge,BJ,GJ,KJ=l(()=>{"use strict";W();zP();Wr();qP();age=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},lge=e=>{let t=e.goal.trim();return t.length===0?null:t},BJ=(e,t,r,o,n)=>{let s=nr(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},GJ=(e,t)=>{let r=lge(e);if(t.id.startsWith("wizard-")){let s=jl(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=gu(e,t);if(s!==null){let a=Ai(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=ve(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:BJ(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:age(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:BJ(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var ki,VJ,qJ=l(()=>{"use strict";ki=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),VJ=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${ki(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${ki(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${ki(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${ki(n)}</h2><pre class="mono">${ki(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${ki(e.goal)}</dd></div></dl>`;return`<h2>${ki(e.title)}</h2>${i}${t}${r}${o}${s}`}});var cge,JJ,Nu,Tv,JP=l(()=>{"use strict";W();cge=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),JJ=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||j(e.status))return null;let r=Cr(t);return r<0||r>3?null:`wizard-${r+1}`},Nu=(e,t)=>cge.has(t)?JJ(e)===t:!1,Tv="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var dge,YP,Cv=l(()=>{"use strict";dge='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',YP=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${dge}</button>`});var Ri,XP=l(()=>{"use strict";W();Ri=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:du({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:uu(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var pge,YJ,uge,Iv,XJ,mge,gge,fge,yge,ZJ,QJ=l(()=>{"use strict";W();XP();pge={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},YJ=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},uge=e=>pge[e]??null,Iv=(e,t)=>{let r=e.wizard,o=uge(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=Cr(r);return o<n||o===n},XJ=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},mge=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Lr(t).trim();return o.length===0?null:Pu({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:YJ(e,"generalize")})},gge=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=Ri(e);return n===null?null:jn({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=XJ(e)?.promptText.trim()??vr({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:mi({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},fge=e=>{let t=e.wizard;if(t===void 0)return null;let r=vr({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Au({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:YJ(e,"separate")})},yge=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=Do(t),s=fi(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=Ri(e);return c===null?null:jn({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=XJ(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||j(e.status)&&i?.judgement!==null)?ui({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):_u({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:gi(t,r).output,moduleTitle:o.title})},ZJ=(e,t)=>{if(!Iv(e,t))return null;switch(t){case"wizard-1":return mge(e);case"wizard-2":return gge(e);case"wizard-3":return fge(e);case"wizard-4":return yge(e);default:return null}}});var hge,ZP,Lv=l(()=>{"use strict";W();hge=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},ZP=(e,t)=>{let r=e.wizard,o=hge(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=Cr(r);return o<n?"done":o===n&&j(e.status)&&e.status==="failed"?"failed":o<=n&&j(e.status)?"done":"pending"}});var Sge,Ml,QP=l(()=>{"use strict";Nn();QJ();Lv();Sge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ml=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(ZP(e,t)==="pending")return""}else if(!Iv(e,t))return"";let o=ZJ(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${Ct}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${Sge(o)}</pre></template>`}});var wi,Fo,Nl=l(()=>{"use strict";wi=e=>e.toLocaleString("en-US"),Fo=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var no,Pge,e4,eA,t4,r4,tA=l(()=>{"use strict";W();KJ();qJ();JP();Cv();Nn();zP();yv();QP();Nl();no=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pge=(e,t)=>{let r=gu(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?Fo(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${wi(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${no(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${no(r)}</span>`:"",d=VJ(GJ(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&j(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${no(e.id)}"`:"",m=Nu(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${no(Tv)}"><input type="hidden" name="cycleId" value="${no(t.id)}"><input type="hidden" name="wizardStepId" value="${no(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",g=e.state==="active"&&e.id.startsWith("wizard-")?OJ(t):"",y=o?"failed":e.state,h=o?Ai(t):null,S=h!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${Ct}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${no(h)}</pre></template>`:"",T=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Ml(t,e.id):"";return`<li class="sdlc-node sdlc-node-${y}" data-sdlc-step-id="${no(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${no(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${T}${S}</div></div>${g}<template>${d}</template></li>`},e4=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>Pge(r,t)).join("")}</ol>`,eA=e=>`<div class="sdlc-score" aria-label="What the score means">${mu(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${no(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,t4=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${YP({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,r4=`<script>
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
</script>`});var rA,oA,nA,o4,vv=l(()=>{"use strict";rA="support-reply",oA="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",nA=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),o4=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var sA,xv,Wv=l(()=>{"use strict";W();tA();vv();sA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xv=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${eA(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this computer</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${sA(oA)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${sA(nA)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${sA(o4)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${sA(rA)}">Run this sample</a>
      </div>
    </section>`});var Ov,iA,Age,n4,s4=l(()=>{"use strict";Ov=u(require("node:fs")),iA=u(require("node:path")),Age=e=>iA.default.join(iA.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),n4=(e,t)=>{let r=Age(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Ov.default.mkdirSync(iA.default.dirname(r),{recursive:!0}),Ov.default.appendFileSync(r,o,"utf8")}});var Dl,i4,_ge,a4,bge,l4,so,me,c4,Z,Kt=l(()=>{"use strict";Dl=u(require("node:fs")),i4=u(require("node:path"));W();s4();_ge=e=>e.wizard===void 0?e:{...e,wizard:DL(e.wizard)},a4=new Set,bge=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),l4=(e,t)=>{Dl.default.mkdirSync(i4.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Dl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Dl.default.renameSync(r,e)},so=e=>{if(!Dl.default.existsSync(e))return[];try{let t=JSON.parse(Dl.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(bge).map(_ge):[]}catch{return[]}},me=(e,t)=>so(e).find(r=>r.id===t)??null,c4=(e,t)=>{a4.add(t);let r=so(e).filter(o=>o.id!==t);l4(e,r)},Z=(e,t)=>{if(a4.has(t.id))return;let r=so(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];l4(e,o),n4(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var Hl,io,Du,d4,aA,kge,p4,u4,m4,jv=l(()=>{"use strict";Hl=u(require("node:fs")),io=u(require("node:path")),Du=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},d4=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),aA=(e,t)=>{let r=Du(e);return r.length>0?r:Du(t)},kge=e=>{let t=aA(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${d4(o)}`,...n.length>0?[`description: ${d4(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},p4=e=>`.cursor/skills/${e}/SKILL.md`,u4=(e,t)=>{let r=Du(t);if(r.length===0)return!1;let o=io.default.resolve(e),n=io.default.resolve(o,".cursor","skills"),s=io.default.resolve(o,p4(r));return s.startsWith(`${n}${io.default.sep}`)?Hl.default.existsSync(s):!1},m4=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(aA(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=io.default.resolve(e.workingDirectory);try{if(!Hl.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=kge({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=p4(r.slug),n=io.default.resolve(t,".cursor","skills"),s=io.default.resolve(t,o);if(!s.startsWith(`${n}${io.default.sep}`))return{ok:!1,errorCode:"path"};if(Hl.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Hl.default.mkdirSync(io.default.dirname(s),{recursive:!0}),Hl.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var Rge,g4,f4,y4=l(()=>{"use strict";W();Kt();bt();Wr();jv();Rge=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,g4=e=>{let t=e.get("savedSkill");return t!==null&&Rge.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this computer.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this computer.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},f4=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=me(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!j(r.status))return{kind:"redirect",location:o("skillError=working")};let n=ve(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||nr(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=m4({workingDirectory:We(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var lA,cA,Hu=l(()=>{"use strict";W();lA=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=oo({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},cA=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var Dn,Fu=l(()=>{"use strict";W();Hu();Dn=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=ov(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=HP({moduleCount:o.length,existing:e.costControls,writerId:n}),i=lA(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Cu(r.variables)},updatedAt:new Date().toISOString()}}});var Hn,$u=l(()=>{"use strict";Hn=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var dA=l(()=>{"use strict";Sr();Xp();Ud()});var Mv,h4,pA,S4,P4=l(()=>{"use strict";Mv={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},h4=e=>e.exitCode===null&&e.signalCode===null,pA=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!h4(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!h4(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),S4=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),pA(e).then(s=>{r({...Mv,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var A4,wge,Nv,Ege,_4,b4=l(()=>{"use strict";A4=/please visit the url to log in|paste the authorization code|waiting for authentication|authentication timed out|accounts\.google\.com\/o\/oauth2/i,wge=/authentication required|not logged in|login required|please run .{1,40}\blogin\b|authentication failed or timed out/i,Nv=e=>{if(A4.test(e.stderr)||wge.test(e.stderr))return!0;let t=e.stdout.match(new RegExp(A4.source,"gi"));return new Set((t??[]).map(r=>r.toLowerCase())).size>=2},Ege={antigravity:{label:"Antigravity CLI",command:"agy"},"claude-cli":{label:"Claude CLI",command:"claude"},codex:{label:"Codex CLI",command:"codex login"},cursor:{label:"Cursor CLI",command:"cursor-agent login"}},_4=e=>{let t=Ege[e];return`${t.label} isn't signed in on this computer. Open Terminal, run \`${t.command}\` once and finish sign-in, then retry.`}});var k4,zu,R4,Dv,Tge,Fv,$v,Cge,Ige,Lge,w4,vge,Hv,E4,Uu,T4,xge,Wge,It,Ei=l(()=>{"use strict";k4=require("node:child_process"),zu=u(require("node:fs")),R4=u(require("node:os")),Dv=u(require("node:path"));dA();P4();b4();Wr();Tge=["claude-cli","codex","cursor","antigravity"],Fv=18e4,$v=6e5,Cge=12e4,Ige=9e5,Lge="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",w4="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",vge="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",Hv=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},E4=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=Hv(process.env[w4])??Math.max(r,$v));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:Hv(process.env[vge])??Ige;return Math.min(o,Math.max(Cge,r))},Uu=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?Hv(process.env[w4])??$v:Fv,T4=e=>`The writer timed out after ${e}ms.`,xge=e=>Tge.includes(e),Wge=e=>e===!0||process.env[Lge]==="1",It=e=>new Promise(t=>{if(e.signal?.aborted){t(Mv);return}if(Wge(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!xge(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this computer."});return}let r=e.writerAgent,o=Zt(r,e.prompt,Re({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!zu.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this computer."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:Fv,s=Dv.default.join(zu.default.mkdtempSync(Dv.default.join(R4.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=RJ({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},p=(0,k4.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=S=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(S))};S4(p,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason!=="auth"&&(d.stopReason="timeout",pA(p).then(S=>{m({ok:!1,errorMessage:T4(n),errorKind:"writer_timeout",killSignal:S})}))},n);let g={ok:!1,errorMessage:_4(r),errorKind:"action_required"},y=()=>({stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8")}),h=()=>{d.settled||d.stopReason!==null||Nv(y())&&(d.stopReason="auth",pA(p).then(S=>{m({...g,killSignal:S})}))};p.stdout.on("data",S=>{a.push(Buffer.from(S)),h()}),p.stderr.on("data",S=>{c.push(Buffer.from(S)),h()}),p.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),p.on("close",(S,T)=>{if(d.settled)return;if(d.stopReason==="auth"){m({...g,killSignal:T==="SIGKILL"?"SIGKILL":"SIGTERM"});return}let f=zu.default.existsSync(s)?zu.default.readFileSync(s,"utf8"):null,b=y();if(d.stopReason===null&&Nv(b)){m(g);return}let I=wJ({writerAgent:r,...b,replyFileText:f});if(I.ok&&d.stopReason!=="abort"){m(I);return}d.stopReason===null&&m(I)})})});var Oge,Bu,zv=l(()=>{"use strict";W();Nl();Oge=e=>{if(e.wizard!==void 0){let t=ku(e.wizard),r=Fo(e);return(t??0)+r}return Fo(e)},Bu=e=>{let t=dv({costControls:e.costControls,spentTokens:Oge(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var C4,jge,Gu,uA,mA=l(()=>{"use strict";W();Ge();zv();C4=e=>e===F?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},jge=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Gu=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=EL({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:C4(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?pv({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:uu(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=jge(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Bu({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Bu({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},uA=(e,t,r=null)=>{let o=wP({raw:t,judge:C4(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var gA,Uv=l(()=>{"use strict";gA=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var v4,fA,yA,I4,L4,Bv,Mge,x4,Gv,Nge,W4,Dge,Hge,O4,j4=l(()=>{"use strict";v4=require("node:child_process"),fA=u(require("node:fs")),yA=u(require("node:path"));Qh();W();I4=4e3,L4=12e3,Bv=(e,t)=>{let r=(0,v4.spawnSync)("git",[...t],{cwd:e,env:Cn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Mge=e=>Bv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",x4=e=>{let t=Bv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Gv=(e,t)=>{let r=yA.default.resolve(e,t),o=yA.default.relative(e,r);if(o.startsWith("..")||yA.default.isAbsolute(o)||!fA.default.existsSync(r)||!fA.default.statSync(r).isFile())return null;let n=fA.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>I4?`${n.slice(0,I4)}
\u2026truncated`:n},Nge=e=>e.length>L4?`${e.slice(0,L4)}
\u2026truncated`:e,W4=e=>{let t=IL(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Gv(e.workingDirectory,n)])),o=Mge(e.workingDirectory);return{git:o,status:o?x4(e.workingDirectory):{},files:r,paths:t}},Dge=(e,t)=>{let r=Bv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Gv(e,t);return o===null?`${t} is missing.`:o},Hge=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",O4=e=>{let t=e.before.git?x4(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Gv(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>Dge(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Hge(e.before.git,e.before.paths.length>0),evidence:Nge(i.join(`

`))}}});var qv,ce,Jv,it,M4,Fge,$ge,N4,Fl,D4,$l,zge,Uge,Ku,Kv,Vv,Bge,H4,Gge,Kge,Vge,F4,qge,$4,z4,Jge,Yge,U4,B4=l(()=>{"use strict";qv=require("node:child_process"),ce=u(require("node:fs")),Jv=u(require("node:os")),it=u(require("node:path"));Qh();M4=8e6,Fge=16e6,$ge=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],N4=(e,t)=>{let r=(0,qv.spawnSync)("git",[...t],{cwd:e,env:Cn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Fl=(e,t)=>(0,qv.spawnSync)("git",[...t],{cwd:e,env:Cn(),timeout:8e3}).status===0,D4=e=>{let t=N4(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},$l=(e,t)=>{let r=it.default.resolve(e,t),o=it.default.relative(e,r);return o.startsWith("..")||it.default.isAbsolute(o)?null:r},zge=(e,t)=>{let r=$l(e,t);if(r===null||!ce.default.existsSync(r))return null;let o=ce.default.statSync(r);return!o.isFile()||o.size>M4?null:ce.default.readFileSync(r)},Uge=(e,t,r)=>{let o=$l(e,t);o!==null&&(ce.default.mkdirSync(it.default.dirname(o),{recursive:!0}),ce.default.writeFileSync(o,r))},Ku=(e,t)=>{let r=$l(e,t);r===null||!ce.default.existsSync(r)||ce.default.rmSync(r,{recursive:!0,force:!0})},Kv=(e,t)=>Fl(e,["cat-file","-e",`HEAD:${t}`]),Vv=e=>{let t=N4(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},Bge=e=>it.default.resolve(e)!==it.default.resolve(Jv.default.homedir()),H4=e=>{if(!ce.default.existsSync(e))return 0;let t=ce.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?ce.default.readdirSync(e).reduce((r,o)=>r+H4(it.default.join(e,o)),0):0},Gge=(e,t,r)=>{let o=$l(e,r);if(o===null||!ce.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(H4(o)>Fge)return{relativePath:r,existed:!0,copyDir:null};let n=it.default.join(t,"cache",r);return ce.default.mkdirSync(it.default.dirname(n),{recursive:!0}),ce.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},Kge=400,Vge=32e6,F4=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!ce.default.existsSync(s)))for(let i of ce.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=it.default.join(s,i),c=ce.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>M4)){if(t.length>=Kge||r+c.size>Vge){o=!1;return}r+=c.size,t.push(it.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},qge=(e,t,r)=>{let o=$l(e,r);if(o===null||!ce.default.existsSync(o))return null;let n=zge(e,r);if(n===null)return"skip";let s=it.default.join(t,"files",r);return ce.default.mkdirSync(it.default.dirname(s),{recursive:!0}),ce.default.writeFileSync(s,n),s},$4=e=>{let t=ce.default.mkdtempSync(it.default.join(Jv.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?D4(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:F4(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,qge(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Vv(e.workingDirectory):null,isolateCaches:Bge(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:$ge.map(i=>Gge(e.workingDirectory,t,i))}},z4=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Ku(e.workingDirectory,t);return}Uge(e.workingDirectory,t,ce.default.readFileSync(r))}},Jge=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?z4(e,t):Kv(e.workingDirectory,t)?Fl(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Ku(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Kv(e.workingDirectory,t)&&Fl(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Kv(e.workingDirectory,t)&&Fl(e.workingDirectory,["reset","-q","HEAD","--",t])},Yge=(e,t)=>{let r=$l(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Ku(e.workingDirectory,t.relativePath),ce.default.mkdirSync(it.default.dirname(r),{recursive:!0}),ce.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Ku(e.workingDirectory,t.relativePath);return}if(ce.default.existsSync(r))for(let o of ce.default.readdirSync(r)){let n=it.default.join(r,o);ce.default.statSync(n).mtimeMs>=e.startedMs-1e3&&ce.default.rmSync(n,{recursive:!0,force:!0})}}}},U4=e=>{try{if(e.git){if(Vv(e.workingDirectory)!==e.head&&(!(e.head===null?Fl(e.workingDirectory,["update-ref","-d","HEAD"]):Fl(e.workingDirectory,["reset","--hard",e.head]))||Vv(e.workingDirectory)!==e.head))throw new Error("head");let r=D4(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Jge(e,o)}else{if(e.complete)for(let t of F4(e.workingDirectory).paths)e.files[t]===void 0&&Ku(e.workingDirectory,t);for(let t of Object.keys(e.files))z4(e,t)}for(let t of e.caches)Yge(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{ce.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var Vu,hA,Xge,Zge,Qge,efe,tfe,G4,rfe,K4,V4=l(()=>{"use strict";W();mA();Uv();j4();B4();Ge();bt();Wr();Ei();Vu=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),hA=e=>({...e,status:"stopped",errorMessage:pi,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),Xge=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Zge=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==F?t:e.improverModel!==F?e.improverModel:null}return e.judgeModel!==F?e.judgeModel:e.improverModel!==F?e.improverModel:null},Qge=async e=>{let t=We(e.cycle),r=W4({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=$4({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?_u({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:gi(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):pu({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=E4({promptText:e.revision.promptText,isModuleRun:i}),c=Uu({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},p=await It({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=p.ok?O4({workingDirectory:t,before:r,writerReply:p.text}):null,g=U4(o),y={...e.cycle,revisions:e.cycle.revisions.map(h=>h.roundNumber===e.cycle.currentRound?d:h)};return p.ok?!g.ok||m===null?{ok:!1,cycle:Vu(y,g.ok?"Could not put the folder back after the run.":g.errorMessage)}:{ok:!0,cycle:y,run:{output:p.text.trim(),tokens:p.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:p.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:hA(y)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:Vu(y,p.errorMessage,or(p))})},efe=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:Qge({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),tfe=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),G4=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await It({writerAgent:e.reviewer,workingDirectory:We(e.cycle),prompt:CL({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:hA(e.cycle)}:or(o)==="action_required"?{kind:"stopped",cycle:Vu(e.cycle,o.errorMessage,"action_required")}:{kind:"suggestion",text:"",tokens:null}},rfe=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===F)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await It({writerAgent:t.judgeModel,workingDirectory:We(t),prompt:mi({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Gu(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?hA(o):(e.onWriterFailure?.(t.judgeModel),Vu(o,n.errorMessage,or(n)))},K4=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return rfe(e);let o=Zge(t),n=await efe({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?Xge(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===F){let p=await G4({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...tfe(s,p.text),judgePhase:void 0}}let i=await It({writerAgent:t.judgeModel,workingDirectory:We(t),prompt:ui({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?hA(s):(e.onWriterFailure?.(t.judgeModel),Vu(s,i.errorMessage,or(i)));let a=await G4({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Gu(s,i.text,c);return gA(d,a.text)}});var SA,ofe,nfe,Yv,q4=l(()=>{"use strict";W();mA();V4();XP();Wr();Ge();zv();bt();Ei();SA=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),ofe=e=>({...e,status:"stopped",errorMessage:pi,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),nfe=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?ofe(e):(n?.(r),SA(e,t.errorMessage,or(t))),Yv=async(e,t,r,o)=>{let n=Bu(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return SA(e,"This round has no prompt.");if(e.status==="judging")return K4({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return SA(e,"This cycle is waiting on a step this computer cannot run.");if(e.improverModel===F)return e;let i=Ri(e);if(i===null)return SA(e,"The improver needs the score and the reason.");let a=await It({writerAgent:e.improverModel,workingDirectory:We(e),prompt:jn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Uu()}),c=nfe(e,a,e.improverModel,r,t);return c!==null?c:uA(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var qu,Xv,sfe,Y4,J4,ife,afe,PA,X4,Z4,lfe,cfe,Ti,Q4,eY,Ju=l(()=>{"use strict";W();Fu();$u();Ge();bt();Wr();Ei();q4();Sv();qu=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Xv=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return qu(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},sfe=e=>{let t=or(e);return _J(e)||t==="usage_limit"||t==="action_required"},Y4=(e,t,r)=>sfe(r)?qu(e,r.errorMessage,or(r)):Xv(e,t,r.errorMessage),J4=e=>{let t=e.wizard;return t===void 0||Wu(e).length===0?e:{...e,wizard:Il({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},ife=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",afe=e=>{let t=e.wizard;if(t===void 0)return e;let r=bu({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Il({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},PA=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),X4=e=>e.judgeModel!==F?e.judgeModel:e.improverModel!==F?e.improverModel:null,Z4=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},lfe=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=X4(e);if(n===null)return qu(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Lr(o),i=Pu({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Z4(e,"generalize")}),a=await It({writerAgent:n,prompt:i,workingDirectory:We(e),signal:t});if(!a.ok)return r?.(n),Y4(e,"generalize",a);try{let c=XL(a.text),d=Il({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Cu(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Ru(d)?Ti({...p,wizard:{...d,gate:null}}):PA(p,"generalize")}catch(c){return Xv(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},cfe=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=X4(e);if(n===null)return qu(e,"Choose a writer to suggest splits.");let s=vr({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Au({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:Z4(e,"separate")}),a=await It({writerAgent:n,prompt:i,workingDirectory:We(e),signal:t});if(!a.ok)return r?.(n),Y4(e,"separate",a);try{let c=ZL(a.text),d=$L(c,o.variables),p=Il({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:p};return Eu(d)?Dn(m,d[0]):PA(m,"separate")}catch(c){return Xv(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Ti=e=>{let t=e.wizard;if(t===void 0)return e;let r=Lr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},Q4=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return qu(e,"This module is missing.");let n=Do(r),s=fi(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==F?e.runnerModel:e.judgeModel!==F?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:we(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},eY=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return Yv(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return lfe(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return cfe(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await Yv(e,t,r,o);if(j(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Wu(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=ve(s.revisions.map(g=>({roundNumber:g.roundNumber,promptText:g.promptText,score:g.judgement?.score??0,reasons:g.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&wu({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=J4(PA(a,i));return Hn(p)}let c=PA(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=BL({wizard:{...c.wizard,modules:c.wizard.modules.map((m,g)=>g===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:ife(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?J4(d):afe(d)}return s}return n.phase==="complete",e}});var zl,AA=l(()=>{"use strict";W();Ge();zl=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:qL(r,e.judgeModel===F),updatedAt:new Date().toISOString()}}});var Ul,_A=l(()=>{"use strict";Ul=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var sr,tY,dfe,rY=l(()=>{"use strict";W();bt();_A();Wr();jv();sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tY=e=>{if(!j(e.status))return"";let t=ve(e.revisions.map(g=>({roundNumber:g.roundNumber,promptText:g.promptText,score:g.judgement?.score??null,reasons:g.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=nr(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${sr(t.reasons.trim())}</p>`,i=e.status==="passed",a=Ul(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${sr(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${sr(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',p=n!==null?`<div class="alert-error">${sr(n)}</div>`:i?dfe({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:We(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${sr(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${sr(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${p}</section>`},dfe=e=>{let t=e.sourceSkill?.fileName??Du(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=aA(t,r),s=n.length>0&&u4(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${sr(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${sr(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${sr(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${sr(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${sr(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${sr(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var oY,nY=l(()=>{"use strict";oY=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var sY,pfe,bA,Lt,kA,Zv=l(()=>{"use strict";W();Ge();nY();zP();Wr();_A();sY=["Generalize","Evaluate","Separate","Optimize modules"],pfe=e=>{let t=Cr(e),r=t>=0&&t<sY.length?sY[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},bA=(e,t)=>{let r=Ai(e),o=r===null?null:oY(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Lt=(e,t)=>({title:e,detail:t,replyPreview:null}),kA=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=Ai(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:TJ(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!j(e.status)){let t=e.judgeModel;return Lt(`${Ee(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this computer.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!j(e.status)){let t=e.judgeModel;return Lt(`${Ee(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this computer.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===F?Lt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Lt(`${Ee(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Lt(`${Ee(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===F){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==F?Lt(`${Ee(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Lt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this computer can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Lt(`${Ee(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=we(t);return Lt(`${Ee(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Lt(`${Ee(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=we(t);return Lt(`${Ee(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Lt(`${Ee(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===F){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Lt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Lt(`${Ee(e.improverModel)} is rewriting the prompt.`,"That writer is working on this computer. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>nr(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=_e(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||j(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?bA(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=Ul(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?bA(e,{title:`${pfe(r)}${s}`,detail:t.length>0?t:n}):bA(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(j(e.status)){let t=e.errorMessage?.trim()??"";return bA(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this computer.",detail:"This panel keeps updating.",replyPreview:null}}});var ao,Yu=l(()=>{"use strict";Ge();ao=e=>{if(e.status==="improving"&&e.improverModel===F)return!0;if(e.status!=="judging"||e.judgeModel!==F)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===F}});var iY,aY=l(()=>{"use strict";iY=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Fn,ufe,lY,cY=l(()=>{"use strict";W();Fn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ufe=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Fn(r)}</p>`},lY=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Fn(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Fn(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Fn(a)}.</p>`}<pre class="mono">${Fn(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Mn(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Fn(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",m=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Fn(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${ufe(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Fn(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Xu,mfe,dY,pY=l(()=>{"use strict";W();Wr();Xu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mfe=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=nr(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Xu(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Xu(i)}.</p>`}<pre class="mono">${Xu(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Mn(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Xu(d)}</pre>`:`<div class="alert-error">${Xu(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},dY=e=>e.revisions.map(t=>mfe(e,t)).join("")});var uY,mY=l(()=>{"use strict";W();uY=e=>{if(j(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var lo,gfe,Qv,ffe,yfe,hfe,Sfe,gY,fY,ex=l(()=>{"use strict";mY();lo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gfe="Stop this run? Writers will stop and the best prompt is kept.",Qv="End the wizard? Writers will stop and progress from finished steps is kept.",ffe="Skip this module and pause at the step gate?",yfe=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${lo(gfe)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${lo(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,hfe=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${lo(Qv)}"><input type="hidden" name="cycleId" value="${lo(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,Sfe=e=>{let t=lo(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${lo(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${lo(ffe)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${lo(Qv)}">End wizard</button>
    </form>
  </div>`},gY=e=>{let t=uY(e);return t==="none"?"":t==="legacy_stop"?yfe(e.id):t==="wizard_end_only"?hfe(e.id):Sfe(e)},fY=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=lo(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${lo(Qv)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var yY,hY=l(()=>{"use strict";W();Nl();yY=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=_e(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${wi(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${wi(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${we(r)}`}return""}});var Pfe,Afe,SY,_fe,PY,AY=l(()=>{"use strict";W();hY();Lv();qP();QP();Pfe=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',Afe=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',SY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_fe=(e,t,r)=>{let o=jl(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=yY(e,t),i=ZP(e,t),a=Pfe(i),c=Afe(i),d=Ml(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${SY(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${SY(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",g=i==="failed"&&t!=="wizard-4"?" open":"",y=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${y}"${m}${g}><summary aria-controls="${y}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${y}-body">${o}</div></details>`},PY=e=>{let t=e.wizard;if(t===void 0||!j(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>_fe(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var _Y,bY,kY=l(()=>{"use strict";_Y=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bY=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${_Y(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${_Y(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var tx,RY,rx=l(()=>{"use strict";tx=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,RY=(e,t)=>{if(tx(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var wY,EY=l(()=>{"use strict";wY=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var RA,TY,CY=l(()=>{"use strict";W();rx();rx();EY();RA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TY=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=_e(t),o=we(t),n=r.terminalStatusSuggestion==="passed"?"":wY(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,y=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",h=p===void 0?c.status:RY(p,o),S=p!==void 0&&tx(p,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':h==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':h==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':RA(h);return`<tr${y}><td>${RA(c.title)}</td><td>${RA(m)}</td><td>${c.tokens??"\u2014"}</td><td>${S}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${RA(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Ci,wA,ox=l(()=>{"use strict";Ci=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),wA=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Ci(r.fileName)}</code> \u2014 ${Ci(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Ci(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Ci(i.name)}</strong> <code>.cursor/skills/${Ci(i.fileName)}/SKILL.md</code></p><p class="muted">${Ci(i.description)}</p><p>${Ci(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var bfe,IY,LY=l(()=>{"use strict";W();kY();CY();ox();bfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IY=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!j(e.status)||t.modules.length===0)return"";let r=TY(e),o=bY(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=_e(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${bfe(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${wA(e)}${a}${r}${o}</section>`}});var de,EA=l(()=>{"use strict";W();de={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var TA,nx=l(()=>{"use strict";TA=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var vY,xY=l(()=>{"use strict";EA();nx();vY=e=>{let t=TA({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:de.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var $o,Zu=l(()=>{"use strict";$o=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var co,CA,sx=l(()=>{"use strict";W();tA();rY();Zv();Yu();aY();XP();cY();pY();ex();AY();LY();Nl();xY();bt();Zu();co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CA=e=>{let t=!j(e.status)&&e.status!=="wizard_paused"&&!ao(e),r=kA(e),o=e4(OL(iY(e)),e),n=j(e.status)?"":gY(e),s=PY(e),i=IY(e),a=tY(e),c=e.errorMessage===null?"":`<div class="alert-error">${co(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?_e(e.wizard):null,g=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,y=!t&&e.wizard!==void 0&&j(e.status)&&(e.wizard.phase==="complete"||_e(e.wizard).passedModuleCount>0),h=y?g?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",S=y&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${co(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:!t&&e.wizard!==void 0&&e.wizard.modules.length>0&&j(e.status)?`<p class="sdlc-run-success-actions"><a class="btn btn-secondary" href="/prompt-optimizer?cycle=${co(e.id)}&amp;export=wizard-markdown">Download report (.md)</a></p>`:"",T=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${co(r.replyPreview)}</pre>`,f=r.detail.length===0&&S.length===0&&T.length===0||r.detail.length===0&&T.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${co(r.detail)}${p}</p>`}${T}</div>`,b=e.revisions.find(ze=>ze.roundNumber===e.currentRound),I=e.status==="improving"?Ri(e):null,P=Fo(e),v=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),x=ao(e)?lY({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:I?.promptText??b?.promptText??"",score:I?.score??b?.judgement?.score??null,reasons:I?.reasons??b?.judgement?.reasons??null,avoid:I?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:b?.run??null,minJudgeScore:v?1:0}):"",D=e.wizard!==void 0&&e.wizard.phase==="complete"&&j(e.status),k=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",A=e.wizard!==void 0&&!D&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?we(e.wizard):e.passScore,E=k?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${eA(A)}</div>`:"",O=e.status==="failed"?vY({status:e.status,errorKind:e.errorKind}):null,X=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':j(e.status)?O!==null?`<span class="${O.badgeClass}">${O.badgeLabel}</span>`:D&&m!==null&&!g?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",ne=t?d:y?g?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',ft=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${co(Gt(We(e)))}</li>`:"",P>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${wi(P)} so far</li>`:""].filter(ze=>ze.length>0),R=ft.length===0?"":`<ul class="sdlc-run-meta">${ft.join("")}</ul>`,w=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,M=D?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,N=D?"":E.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${M}</div>`:`<div class="sdlc-run-grid">${M}${E}</div>`,H=dY(e),$=e.wizard!==void 0&&j(e.status)&&e.revisions.every(ze=>ze.roundNumber===0&&(ze.judgement===void 0||ze.judgement===null)),q=H.length===0||$?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${H}</div></section>`,ye=`<p class="sdlc-run-goal" title="${co(e.goal.trim())}">${co($o(e.goal))}</p>`,he=D?`${c}${i}${s}${x}${a}`:`${c}${N}${x}${s}${a}`,Ot='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',jt=D?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${co(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Ot}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${X}</div>${ye}<div class="sdlc-run-activity${h}"${y?' role="status"':""}><div class="sdlc-run-activity-icon">${ne}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${co(r.title)}</h2>${f}${S}${jt}</div></div>${R}${w}</header>${he}</section>${q}`}});var WY,OY=l(()=>{"use strict";W();$u();WY=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!wu({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:Hn(e)}});var jY,MY=l(()=>{"use strict";W();Ju();jY=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Ru(t)?e:Ti({...e,wizard:{...t,gate:null}})}});var NY,DY=l(()=>{"use strict";W();Fu();NY=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Eu(t.splitOptions))return e;let r=t.splitOptions[0];return Dn(e,r)}});var kfe,Ii,IA=l(()=>{"use strict";OY();MY();DY();Kt();kfe=e=>{let t=jY(e),r=WY(t);return NY(r)},Ii=(e,t)=>{let r=kfe(t);return r!==t?(Z(e,r),r):t}});var HY,zo,Qu=l(()=>{"use strict";W();HY=e=>Bt.indexOf(e),zo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||j(e.status)?Bt.length:t.gate!==null?HY(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?HY(t.phase):null}});var FY,$Y=l(()=>{"use strict";FY=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Li,zY,UY=l(()=>{"use strict";W();$Y();Li=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zY=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=gi(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Li(FY(o))}</pre></div>`:"",s=yi(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=Do(t),a=s.map(c=>{let d=t.variables.find(h=>h.name===c),p=MP(c),m=i[c]??"",g=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Li(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Li(p)}">${Li(g)}</label>
        ${y}
        <input class="input" type="text" id="${Li(p)}" name="${Li(p)}" value="${Li(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var BY,GY=l(()=>{"use strict";BY={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var em,Rfe,Oe,$n=l(()=>{"use strict";GY();Nn();em=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rfe=e=>{let t=BY[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${em(t.title)}" aria-describedby="${r}" aria-expanded="false">${Ct}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${em(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${em(t.example)}</span></span></button>`},Oe=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${em(r)}"`}>${em(e)}</span>${Rfe(t)}</span>`});var ir,KY,VY,qY=l(()=>{"use strict";W();Hu();EA();$n();ir=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KY=e=>{let t=e.costControls;if(t===void 0||Wl(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??Tt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${ir(de.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${ir(t.softWarnMessage??hi)}</p>`:"",d=cA({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${ir(de.estimateOverCeilingWarn)}</p>`:"",p=e.wizard?.modules.length??0,m=p>0?`<p class="muted">Step 4 will optimize ${p} module${p===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${ir(de.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${ir(de.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${ir(Ll)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${ir(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${ir(de.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${ir(de.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${ir(de.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${Oe(de.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${Oe(de.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${ir(de.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${ir(de.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},VY=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Wl(r)}});var wfe,JY,YY=l(()=>{"use strict";Nn();wfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),JY=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${Ct}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${wfe(t)}</pre></template>`}});var tm,XY,ZY=l(()=>{"use strict";W();hv();UY();kv();ex();ox();Ev();qY();YY();tm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XY=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(VY(e))return KY(e);let n=we(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?DJ(r):"",a=o==="evaluate"?wA(e):"",c=o==="evaluate"?Ol({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(A=>{let E=A.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',O=A.recommended?' <span class="sdlc-badge">Recommended</span>':"",X=r.selectedSplitOptionId===A.id||r.selectedSplitOptionId===null&&A.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${tm(A.id)}" required${X}> <strong>${tm(A.title)}</strong>${E}${O}</label>${KP(e,A)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],y=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",h=m?.title??"Module",S=m?.prompt??"",T=m?.status==="pending",f=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${tm(h)}</p>${T?zY({cycle:e,modulePrompt:S}):""}<p class="muted">Test run prompt preview: ${tm(fi(S,Do(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${Ol({cycle:e,interactive:!1,caption:T?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${h}\u201D (runner + judge).`})}`:"",b=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":T?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",I=ku(r),P=I===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${I}</p>`,v=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?JY(r.lastWriterParseFailureReply??""):"",x=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",D=t?.active===!0?" sdlc-wizard-gate-active":"",k=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${x}"`:"";return`<section class="card sdlc-wizard-gate${D}"${k}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${b}</p>
    ${v}
    ${P}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${tm(e.id)}">
    ${i}
    ${a}
    ${c}
    ${p}
    ${f}
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
    ${fY(e)}
  </section>`}});var Efe,QY,e8=l(()=>{"use strict";W();QP();Efe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QY=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||j(e.status))return"";let r=(o,n)=>{let s=Ml(e,o);return`<h2 class="sdlc-wizard-active-head">${Efe(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var ix,t8,r8,zn,o8,Bl=l(()=>{"use strict";W();Kt();ix=new Map,t8=e=>{let t=new AbortController;return ix.set(e,t),t.signal},r8=e=>{ix.delete(e)},zn=e=>{ix.get(e)?.abort()},o8=(e,t)=>{let r=me(e,t);return r===null||r.wizard!==void 0?!1:(j(r.status)||(Z(e,{...r,status:"stopped",errorMessage:pi,updatedAt:new Date().toISOString()}),zn(t)),!0)}});var n8,s8,ax,i8,lx=l(()=>{"use strict";W();Qu();Bl();n8="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",s8=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Bt[r]??null},ax=(e,t)=>{let r=s8(t);if(r===null||e.wizard===void 0)return!1;let o=Bt.indexOf(r);if(o===-1)return!1;let n=zo(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Bt.length)},i8=(e,t)=>{let r=s8(t);if(r===null||e.wizard===void 0||!ax(e,t))return e;zn(e.id);let o=Bt.slice(Bt.indexOf(r)),n=Su(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var cx,a8,l8=l(()=>{"use strict";lx();cx=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a8=(e,t)=>ax(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${cx(n8)}"><input type="hidden" name="cycleId" value="${cx(e.id)}"><input type="hidden" name="wizardStepId" value="${cx(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var Tfe,c8,Cfe,d8,p8=l(()=>{"use strict";W();Qu();ZY();e8();l8();qP();Tfe={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},c8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cfe=(e,t,r)=>{let o=a8(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${c8(t)}">
  <summary class="sdlc-wizard-accordion-summary">${c8(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${jl(e,t)}</div>
</details>`},d8=e=>{let t=e.wizard;if(t===void 0)return"";let r=zo(e);if(r===null)return"";let o=Bt.slice(0,r).map((i,a)=>Cfe(e,`wizard-${a+1}`,Tfe[i])),n=t.gate!==null?XY(e,{active:!0}):QY(e),s=r>=Bt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var LA,dx=l(()=>{"use strict";p8();wv();W();LA=e=>{if(e===null||e.wizard!==void 0&&j(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=d8(e),r=UJ(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Ife,px,u8=l(()=>{"use strict";W();Ge();bt();Ei();Ife=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},px=async(e,t,r)=>{if(!Ife(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===F)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=GL({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await It({writerAgent:e.judgeModel,prompt:n,workingDirectory:We(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=VL(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var rm,vA,m8,ux,g8,f8,y8,xA,mx=l(()=>{"use strict";rm=u(require("node:fs")),vA=u(require("node:path")),m8=e=>vA.default.join(vA.default.dirname(e),"prompt-optimizer-writer-ready.json"),ux=e=>{let t=m8(e);if(!rm.default.existsSync(t))return{};try{let r=JSON.parse(rm.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},g8=(e,t)=>{rm.default.mkdirSync(vA.default.dirname(e),{recursive:!0}),rm.default.writeFileSync(m8(e),`${JSON.stringify(t,null,2)}
`)},f8=(e,t)=>ux(e)[t]?.message??null,y8=(e,t,r)=>{g8(e,{...ux(e),[t]:{message:r}})},xA=(e,t)=>{let r=ux(e);r[t]!==void 0&&g8(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var gx,WA,OA,h8,Ke,vi=l(()=>{"use strict";W();dA();Ju();u8();Yu();Bl();mx();IA();Kt();gx=new Set,WA={atMs:0,ids:[]},OA=async()=>{if(Date.now()-WA.atMs<3e4)return WA.ids;let e=await Er({commands:Re({})});return WA.atMs=Date.now(),WA.ids=e.installedWriterIds,e.installedWriterIds},h8=async(e,t,r)=>{let o=me(e,t);if(o===null||r.aborted)return;let n=Ii(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(j(n.status)&&!s||n.status==="wizard_paused"||ao(n))return;if(s){let c=await px(n,r,d=>{xA(e,d)});Z(e,c);return}let i=await eY(n,c=>{xA(e,c)},r,c=>{me(e,t)?.status==="stopped"||r.aborted||Z(e,c)});if(!(me(e,t)?.status==="stopped"||r.aborted)){if(Z(e,i),j(i.status)){let c=await px(i,r,d=>{xA(e,d)});Z(e,c);return}await h8(e,t,r)}},Ke=(e,t)=>{if(gx.has(t))return;let r=me(e,t);if(r===null)return;let o=Ii(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(j(o.status)&&!n||o.status==="wizard_paused"||ao(o))return;gx.add(t);let s=t8(t);h8(e,t,s).finally(()=>{gx.delete(t),r8(t)})}});var Un,om=l(()=>{"use strict";sx();IA();dx();vi();Un=(e,t)=>{let r=Ii(e,t);return Ke(e,r.id),`${CA(r)}${LA(r)}`}});var S8,P8,A8=l(()=>{"use strict";S8=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,P8=e=>e!==null&&e>0});var Lfe,vfe,xfe,_8,b8=l(()=>{"use strict";W();Ju();AA();Fu();$u();Bl();JP();JP();Lfe=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),vfe=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=ve(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},xfe=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=_e(o);return zl({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},_8=(e,t)=>{if(!Nu(e,t))return e;zn(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Ti({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return Hn(vfe(r));if(t==="wizard-3"){let n=o.splitOptions[0]??Lfe(o.templatedPrompt);return Dn(r,n)}return t==="wizard-4"?xfe(r):e}});var jA,k8,fx=l(()=>{"use strict";W();AA();Bl();jA=e=>(zn(e.id),{...zl(e,"stopped"),errorMessage:hL}),k8=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;zn(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var Wfe,R8,w8,E8=l(()=>{"use strict";W();Ju();AA();Fu();$u();om();Kt();vi();A8();lx();b8();fx();Wfe="Pick a revision scored above 0 before continuing to Separate.",R8=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),w8=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=me(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=me(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Un(e.storePath,d))};if(o==="wizard-stop-all"){let c=jA(s);return Z(e.storePath,c),Ke(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=k8(s);return Z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=i8(s,c);return Z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=_8(s,c);return Z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Ke(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",m=HL(s.wizard,d,c);m=Su(m,d),m={...m,pendingStepInstructions:p};let g={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return Z(e.storePath,g),Ke(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(g=>g.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?R8(s):Ti({...s,wizard:{...s.wizard,gate:null}});return Z(e.storePath,m),Ke(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=S8(s,p??-1);if(!P8(m)){let y={...s,errorMessage:Wfe,updatedAt:new Date().toISOString()};return Z(e.storePath,y),a(n),!0}let g=Hn({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return Z(e.storePath,g),Ke(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let y=R8(s);return Z(e.storePath,y),Ke(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(y=>y.id===p);if(m===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return Z(e.storePath,y),a(n),!0}let g=Dn(s,m);return Z(e.storePath,g),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,p=d.currentModuleIndex,m=d.modules[p];if(m===void 0)return a(n),!0;if(!Wl(s.costControls)){let T=t.get("confirmedTokenBudget")?.trim()??"",f=t.get("confirmedMaxSpendUsd")?.trim()??"";if(T.length===0){let I={...s,errorMessage:Ll,updatedAt:new Date().toISOString()};return Z(e.storePath,I),a(n),!0}let b=oo({existing:s.costControls,confirmedTokenBudget:Number(T),confirmedMaxSpendUsd:f.length===0?null:Number(f),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!b.ok){let I={...s,errorMessage:b.errorMessage,updatedAt:new Date().toISOString()};return Z(e.storePath,I),a(n),!0}s={...s,costControls:b.costControls,errorMessage:null,updatedAt:new Date().toISOString()},Z(e.storePath,s)}let g=nv({wizard:d,modulePrompt:m.prompt,posted:t});if(!g.ok){let T={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return Z(e.storePath,T),a(n),!0}let y={...d,parameterValues:g.parameterValues};if(m.status==="pending"){let T=Q4({...s,wizard:{...y,gate:null}},p);return Z(e.storePath,T),Ke(e.storePath,n),a(n),!0}let h=p+1;if(h>=d.modules.length){let T=_e(y),f=zl({...s,wizard:y},T.terminalStatusSuggestion);return Z(e.storePath,f),Ke(e.storePath,n),a(n),!0}let S={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...y,gate:"optimize_modules",currentModuleIndex:h},updatedAt:new Date().toISOString()};return Z(e.storePath,S),a(n),!0}}return a(n),!0}});var Ofe,T8,jfe,yx,Mfe,C8,I8=l(()=>{"use strict";Ge();Bl();fx();Uv();mA();Yu();Kt();Ofe="Add a score from 0 to 100 and the reason for it.",T8="Add a score from 1 to 100 and the reason for it.",jfe="Write the next prompt.",yx="This step is not waiting for you.",Mfe=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},C8=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=me(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(Z(e.storePath,jA(a)),{kind:"saved",cycleId:i}):o8(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=me(e.storePath,r);if(o===null||!ao(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:yx};if(t==="manual-judge"){if(o.judgeModel!==F)return{kind:"invalid",cycle:o,errorMessage:yx};let i=Mfe(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?T8:Ofe};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:T8};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",p=gA(Gu(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return Z(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==F)return{kind:"invalid",cycle:o,errorMessage:yx};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:jfe};let s=uA(o,n);return Z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var L8,v8=l(()=>{"use strict";L8=`<script>
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
</script>`});var x8,W8=l(()=>{"use strict";x8=`<script>
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
</script>`});var O8,j8=l(()=>{"use strict";O8=`<script>
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
</script>`});var M8,N8=l(()=>{"use strict";M8=`<script>
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
</script>`});var D8,H8=l(()=>{"use strict";W();bt();D8=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Gt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(we(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!j(t.status)}}});var F8,$8=l(()=>{"use strict";F8=`<script>
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
</script>`});var z8,U8=l(()=>{"use strict";W();Qu();_A();z8=e=>{let t=Ul(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:j(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=zo(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=_e(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=_e(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return j(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var B8,G8=l(()=>{"use strict";B8=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Uo,Nfe,Dfe,K8,V8=l(()=>{"use strict";U8();G8();Zu();Uo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nfe=e=>e.wizard===void 0?"legacy":"wizard",Dfe=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Uo(t)}">`,o=z8(e),n=B8(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Uo(o.badgeClass)}">${Uo(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Uo(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Uo(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${Nfe(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Uo(e.id)}">${Uo($o(e.goal))}</a><p class="muted">${Uo(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${m}</div></li>`},K8=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>Dfe(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Uo(s)}</summary>${i}</details>`:i}});var hx,MA,q8,Hfe,Ffe,nm,J8,NA=l(()=>{"use strict";hx=u(require("node:fs")),MA=u(require("node:path"));bt();q8=/^[a-z0-9-]+$/,Hfe=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},Ffe=(e,t)=>{if(!q8.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let m=Hfe(p[2]??"");p[1]==="name"&&m.length>0&&(o=m),p[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},nm=e=>{let t=Ho(e);if(!t.ok)return[];let r=MA.default.resolve(t.path,".cursor","skills"),o=[];try{o=hx.default.readdirSync(r)}catch{return[]}return o.filter(n=>q8.test(n)).flatMap(n=>{let s=MA.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${MA.default.sep}`))return[];try{let i=Ffe(hx.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},J8=(e,t)=>nm(e).find(r=>r.fileName===t)??null});var Y8,$fe,X8,Z8,Q8=l(()=>{"use strict";$n();Y8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$fe=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),X8=e=>{if(e.length===0)return`<div class="field">${Oe("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${Y8(r.fileName)}">${Y8(r.fileName)}</option>`).join("");return`<div class="field">${Oe("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${$fe(e)}</script>`},Z8=`<script>
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
</script>`});var vt,e6,t6=l(()=>{"use strict";W();EA();Hu();$n();vt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e6=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=vt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=Si({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??rr(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=cA({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",g=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${vt(de.knobsSectionTitle)}</p>
  <p class="muted">${vt(de.knobsSectionLede)}</p>
  <div class="field">
    ${Oe(de.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${Oe(de.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${vt(de.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${vt(de.earlyStopLabel)}</span>
    </label>
    <p class="muted">${vt(de.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${vt(de.estimateSectionTitle)}</p>
    <p class="muted">${vt(de.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${vt(de.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${vt(de.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${vt(de.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${vt(g)}">$${c.toFixed(4)} / 1k \xB7 ${vt(g)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${vt(de.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var mt,r6,o6,zfe,n6,s6,i6,a6=l(()=>{"use strict";W();Zv();Ge();Zu();Qu();mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),r6=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",o6=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,zfe=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},n6=e=>e===F?"You":Ee(e),s6=e=>{let t=zfe(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":Ee(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${mt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${mt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${mt(n6(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${mt(n6(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${mt(r)}</dd></div>
    </dl>
  </details>`},i6=e=>{let t=e.wizard;if(t===void 0)return"";let r=$o(e.goal),o=e.status==="wizard_paused",n=!j(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=kA(e),m=o6(t),g=m===null?"":r6(m),y=zo(e),h=g.length===0?"":y===null||y>=4?` <strong>${mt(g)}</strong>`:` <strong>${mt(g)}</strong> (step ${y+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${mt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${mt(p.title)}${h}</p>
    <p class="muted">${mt(p.detail)}</p>
    <div class="actions">
      ${s6(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${mt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=o6(t),i=s===null?"Wizard":r6(s),a=zo(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${mt(r)}</h2>
    <p class="lede">Paused at <strong>${mt(i)}</strong>${mt(c)} (last updated ${mt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${s6(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${mt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var sm,l6,c6=l(()=>{"use strict";$n();sm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l6=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${sm(n.id)}"${n.id===e.runner?" selected":""}>${sm(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${sm(e.runner)}">Checking ${sm(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Oe("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Oe("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${sm(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var d6,p6=l(()=>{"use strict";d6=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Gl,u6,m6,g6,f6,y6=l(()=>{"use strict";$n();Gl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u6=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Gl(c.id)}"${c.id===r?" selected":""}>${Gl(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Gl(n)}</option>`;return`<div class="field">${Oe(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},m6=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Gl(t)}">Checking ${Gl(o)}\u2026</p>`},g6=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Oe(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Gl(r)}</textarea><span class="muted">${o}</span></div></details>`,f6=e=>{let t=`<div class="sdlc-writer">${u6("judge","Judge",e.judge,e.writers,"I'll score it")}${m6("judge",e.judge,e.writers)}${g6("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${u6("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${m6("improver",e.improver,e.writers)}${g6("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var h6,S6=l(()=>{"use strict";h6=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var im,Ufe,DA,Sx=l(()=>{"use strict";S6();im=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ufe=(e,t)=>{let r=im(e.goal),o=im(e.label);return t===void 0?`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${r}" title="${r}">${o}</button>`:`<button type="submit" class="sdlc-goal-preset-chip" name="${im(t)}" value="${r}" title="${r}">${o}</button>`},DA=(e={})=>{let t=e.presets??h6,r=e.groupLabel??"Common goals",o=e.leadLabel??"Quick fill:",n=t.map(s=>Ufe(s,e.submitName)).join("");return`<div class="sdlc-goal-presets" role="group" aria-label="${im(r)}"><span class="sdlc-goal-presets-label muted">${im(o)}</span>${n}</div>`}});var am,Bfe,Gfe,Px,P6=l(()=>{"use strict";W();$n();am=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bfe=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},Gfe=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,Px=e=>{let t=Bfe(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=mu(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${Oe(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${am(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${am(e.inputId)}" class="sdlc-pass-range" type="range" name="${am(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${am(a)}"><span class="sdlc-pass-mark" style="left:${Gfe(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${am(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var Vfe,Ax,Bo,_x,bx=l(()=>{"use strict";Yu();sx();v8();W8();tA();j8();N8();H8();$8();V8();NA();Q8();$n();dx();t6();a6();Zu();c6();p6();y6();W();Sx();P6();Vfe=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Ax='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Bo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_x=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Bo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Bo(e.skillNotice??"")}</div>`,o=`${t4}${r4}`,n=e.resumableWizardCycle??null,s=n===null?"":i6(n),i=LA(e.cycle),a=e.cycle===null?"":CA(e.cycle),c=e.cycle!==null&&ao(e.cycle),d=D8(e),p=Vfe(d.goal,d.prompt,e.canRun),m=f6({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),g=l6({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y=`${Px({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${Px({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,h=e6({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),S=NL,T=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",f=e.cycle!==null&&j(e.cycle.status),b=d.running&&!f,I=f||b?"":" open",P=b?" sdlc-compose-run-focus":"",x=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${f?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,D=f?(()=>{let R=e.cycle!==null?$o(e.cycle.goal):$o(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Bo(R)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${x}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${x}</summary>`,k=f?" sdlc-compose-viewing-finished":"",A=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",E=c?"waiting":d.running?"running":"idle",O=d.running&&!c?' aria-busy="true"':"",X=`<section class="card sdlc-compose${k}${P}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${I}>
        ${D}
        <div class="sdlc-compose-details-body">
      <p class="lede">${S} ${Bo(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${T}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${Oe("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Bo(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${X8(nm(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${Ax}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Oe("Goal","goal")}
            ${DA()}
            <textarea class="input textarea" name="goal" rows="4" required>${Bo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Oe("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Bo(d.prompt)}</textarea>
          </div>
          ${y}
          ${h}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Ax}
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
        ${d6()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Ax}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Bo(d.passScore)}; Step 4 pass \u2265 ${Bo(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${E}" data-can-run="${p?"true":"false"}"${O}${d.running?" disabled":""}>${A}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,ne=e.history.length>0?F8:"",ft=`${""}${M8}${L8}${x8}${O8}${Z8}${ne}`;return`${t}${r}${X}${s}${a}${i}${o}${K8(e.history,e.cycle?.id??null)}${ft}`}});var lm,kx=l(()=>{"use strict";bx();lm=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:_x(t)}))}});var A6,_6=l(()=>{"use strict";I8();om();kx();Kt();vi();A6=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:C8({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=me(e.storePath,o.cycleId);return Ke(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Un(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await lm(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:so(e.storePath),resumableWizardCycle:null}),!0)}});var b6,HA,Rx=l(()=>{"use strict";W();b6=u(require("node:os")),HA=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??b6.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??tr()}}});var k6,Kl,wx,R6,w6,cm=l(()=>{"use strict";W();Ge();vv();k6=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Kl=e=>{let t=IJ(e),r=_i(e).map(s=>({id:s,label:UP[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},wx=(e,t,r)=>t===F||t!==null&&e.writers.some(o=>o.id===t)?t:r,R6=(e,t,r,o=null)=>({judge:wx(e,t,e.judge),improver:wx(e,r,e.improver),runner:wx(e,o,e.runner)}),w6=e=>e===rA?{goal:oA,prompt:nA}:{goal:"",prompt:""}});var Ex,E6=l(()=>{"use strict";Ex=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var T6,qfe,C6,I6,L6,v6=l(()=>{"use strict";W();T6=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},qfe=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},C6=(e,t)=>e.has("earlyStop")?!0:t!=="run",I6=e=>{let t=T6(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=qfe(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=T6(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},L6=e=>tr(e)});var x6,W6,FA,Tx=l(()=>{"use strict";W();Ge();bt();cm();E6();v6();x6=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Ex(o);return n.ok?String(n.passScore):String(r)},W6=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return Ex(n)},FA=e=>{let t=R6(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=x6(e.posted,"passScore",70),o=x6(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),p=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",g=e.posted===null?!0:C6(e.posted,m),y=(D,k)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:D,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:k,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:p,earlyStop:g});if(e.posted===null)return y(e.defaultFolder??bi,null);let h=e.posted.get("folder")??bi;if(e.posted.get("intent")==="choose-folder"){let D=e.pickFolder();return y(D===null?h:Gt(D),null)}if((e.posted.get("intent")??"")!=="run")return y(h,null);let T=k6(e.goal,e.prompt);if(T!==null)return y(h,T);let f=W6(e.posted,"passScore",r);if(!f.ok)return y(h,f.errorMessage);let b=W6(e.posted,"modulePassScore",o);if(!b.ok)return y(h,b.errorMessage);let I=LJ(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(I===null)return y(h,"Choose a judge and an improver.");let P=Ho(h);if(!P.ok)return y(h,P.errorMessage);let v=vJ(e.installedIds,c,I.judge);if(v===null)return y(h,"Choose a runner for wizard step 4.");let x=I6({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return x.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:I.judge,improver:I.improver,workingDirectory:P.path,passScore:f.passScore,modulePassScore:b.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:v,runnerInstructions:a,costControls:L6(x.knobs)}:y(h,x.errorMessage)}});var Vl,zA,Jfe,Cx,O6,$A,j6,Yfe,M6,Ix,Xfe,Zfe,Qfe,Lx,N6,D6,H6=l(()=>{"use strict";Vl=u(require("node:fs")),zA=u(require("node:path"));Ge();bt();Jfe=["remember","choose-folder","run"],Cx=()=>({folder:bi,judge:"",improver:"",runner:""}),O6=e=>zA.default.join(zA.default.dirname(e),"prompt-optimizer-preferences.json"),$A=e=>typeof e=="string"?e:"",j6=e=>{let t=O6(e);if(!Vl.default.existsSync(t))return Cx();try{let r=JSON.parse(Vl.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return Cx();let o=r,n=$A(o.folder).trim();return{folder:n.length===0?bi:n,judge:$A(o.judge),improver:$A(o.improver),runner:$A(o.runner)}}catch{return Cx()}},Yfe=(e,t)=>{let r=O6(e);Vl.default.mkdirSync(zA.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Vl.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Vl.default.renameSync(o,r)},M6=(e,t)=>e===F||_i(t).some(r=>r===e),Ix=(e,t,r)=>e===null?t:e.length===0?"":M6(e,r)?e:t,Xfe=(e,t)=>{if(e===null)return t;let r=Ho(e);return r.ok?r.display:t},Zfe=e=>{let t=j6(e.storePath),r={folder:Xfe(e.folder,t.folder),judge:Ix(e.judge,t.judge,e.installedIds),improver:Ix(e.improver,t.improver,e.installedIds),runner:Ix(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Yfe(e.storePath,r)},Qfe=e=>{let t=Ho(e);return t.ok?t.display:bi},Lx=(e,t)=>M6(e,t)?e:"",N6=e=>{let t=j6(e.storePath);return{selection:{...e.selection,judge:Lx(t.judge,e.installedIds)||e.selection.judge,improver:Lx(t.improver,e.installedIds)||e.selection.improver,runner:Lx(t.runner,e.installedIds)||e.selection.runner},defaultFolder:Qfe(t.folder)}},D6=e=>{let t=e.posted.get("intent")??"";if(!Jfe.includes(t))return;let r=e.posted.get("folder");Zfe({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var F6,eye,tye,vx,rye,UA,BA=l(()=>{"use strict";F6=u(require("node:os"));Ge();mx();Ei();eye="Reply with the single word ok. Do not use tools.",tye=45e3,vx=async(e,t)=>{if(t===F)return{ok:!0,message:"You will do this step."};let r=f8(e,t);if(r!==null)return{ok:!0,message:r};let o=await It({writerAgent:t,prompt:eye,workingDirectory:F6.default.tmpdir(),timeoutMs:tye});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${Ee(t)} is ready.`;return y8(e,t,n),{ok:!0,message:n}},rye=e=>[...new Set(e.filter(t=>t.length>0))],UA=async(e,t,r,o)=>{for(let n of rye([t,r,o??""])){let s=await vx(e,n);if(!s.ok)return s.message}return null}});var xx,$6=l(()=>{"use strict";W();xx=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!j(r.status)&&!(t!==null&&r.id===t))return r;return null}});var z6,U6=l(()=>{"use strict";_t();W();Hu();om();Rx();Tx();kx();Kt();bt();H6();NA();BA();$6();IA();vi();z6=async e=>{let t=e.posted===null?N6({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=FA({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>In("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(D6({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Gt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await UA(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await lm(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Gt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:so(e.route.storePath),resumableWizardCycle:xx(so(e.route.storePath),null)});return}if(r.kind==="start"){let s=J8(r.workingDirectory,r.sourceSkillFile),i=lA(xl({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=HA({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:JL({...hu(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(Z(e.route.storePath,a),Ke(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(Un(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:me(e.route.storePath,e.cycleId);n!==null&&(n=Ii(e.route.storePath,n),Ke(e.route.storePath,n.id)),await lm(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:so(e.route.storePath),resumableWizardCycle:xx(so(e.route.storePath),n?.id??null)})}});var B6,G6=l(()=>{"use strict";Kt();B6=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";c4(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var K6,V6=l(()=>{"use strict";K6=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var q6,J6=l(()=>{"use strict";y4();E8();_6();U6();G6();cm();V6();vi();q6=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await OA(),o=Kl(r),n=e.method==="POST"?K6(e.request.headers["content-type"],await e.readBody(e.request)):null;if(w8({posted:n,storePath:e.storePath,response:e.response})||await A6(e,n,o))return;let s=w6(t.searchParams.get("example")),i=B6({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=f4({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await z6({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:g4(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var oye,Y6,X6=l(()=>{"use strict";W();Kt();oye=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",Y6=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=me(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!j(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=YL({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${oye(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var Z6,Q6=l(()=>{"use strict";om();Kt();Z6=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:me(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Un(e.storePath,o)),!0}});var nye,e3,t3=l(()=>{"use strict";Ge();BA();nye=["claude-cli","codex","cursor","antigravity"],e3=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===F||nye.includes(t)?await vx(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var r3,o3=l(()=>{"use strict";W();r3=e=>{let t=e?.socket?.localPort;return typeof t=="number"&&Number.isInteger(t)&&t>0?`http://127.0.0.1:${t}${CP}`:void 0}});var n3,s3=l(()=>{"use strict";W();n3=(e,t=jL)=>{let r=e.length===1?e[0].id:null;return{ok:!0,url:t,page:fu,context:Tl,installedWriters:e,post:{method:"POST",url:t,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this computer",judge:r??"installed writer id",improver:r??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${t}?cycle=<cycleId> until done is true.`,writers:r===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${r} is installed. Omit judge and improver and both roles use it.`}}});var GA,i3=l(()=>{"use strict";W();nx();Nl();GA=e=>{let t=e.revisions[e.revisions.length-1]??null,r=ve(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=j(e.status),n=e.errorKind??null,s=TA({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:Fo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Tl,page:`${fu}?cycle=${encodeURIComponent(e.id)}`}}});var re,sye,a3,l3,c3=l(()=>{"use strict";re=u(da());W();sye=(0,re.isType)({goal:re.isString,prompt:re.isString,workingDirectory:re.isString,judge:(0,re.isUndefinedOr)(re.isString),improver:(0,re.isUndefinedOr)(re.isString),passScore:(0,re.isUndefinedOr)(re.isNumber),maxRounds:(0,re.isUndefinedOr)(re.isNumber),maxTrials:(0,re.isUndefinedOr)(re.isNumber),maxSpendUsd:(0,re.isUndefinedOr)(re.isNumber),earlyStop:(0,re.isUndefinedOr)(re.isBoolean),earlyStopFlatRounds:(0,re.isUndefinedOr)(re.isNumber),confirmedTokenBudget:(0,re.isUndefinedOr)(re.isNumber),confirmedMaxSpendUsd:(0,re.isUndefinedOr)(re.isNumber),rateUsdPer1kTokens:(0,re.isUndefinedOr)(re.isNumber)}),a3=e=>{let t=e?.trim()??"";return t.length===0?null:t},l3=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return sye(t)?t.workingDirectory.trim().length===0?{ok:!1,error:IP}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:a3(t.judge),improver:a3(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:IP}}});var Go,iye,d3,p3,u3=l(()=>{"use strict";W();Go=u(da()),iye=(0,Go.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:Go.isNumber,confirmedMaxSpendUsd:(0,Go.isUndefinedOr)(Go.isNumber),rateUsdPer1kTokens:(0,Go.isUndefinedOr)(Go.isNumber)}),d3=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:iye(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},p3=(e,t)=>{let r=oo({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var aye,m3,g3=l(()=>{"use strict";W();Ge();Tx();cm();aye=e=>e.map(t=>t.id).join(", "),m3=e=>{let t=Kl(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===F||n===F)return{ok:!1,error:ML,installedWriters:t.writers};if(o===null||n===null){let a=aye(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this computer.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=FA({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var lye,f3,y3=l(()=>{"use strict";W();Rx();s3();i3();cm();c3();u3();g3();Kt();lye=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},f3=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let p=me(e.storePath,t);return p===null?{status:404,body:{ok:!1,error:"That run is not on this computer."}}:{status:200,body:GA(p)}}let r=await e.handlers.readInstalledIds(),o=Kl(r);if(e.method==="GET")return{status:200,body:n3(o.writers,e.agentUrl)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let p=d3(e.rawBody);if(p.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(p.kind==="invalid")return{status:400,body:{ok:!1,error:p.error}};let m=me(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this computer."}};let g=p3(m,p.body);return g.ok?(Z(e.storePath,g.cycle),{status:200,body:GA(g.cycle)}):{status:400,body:{ok:!1,error:g.error}}}let n=lye(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let p=Si({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:p.targetTokenBudget,proposedTokenBudget:p.targetTokenBudget,estimatedSpendUsd:p.estimatedSpendUsd,rateUsdPer1kTokens:p.rateUsdPer1kTokens??null,proposalStub:p.stub===!0,confirmationRequired:!0}}}let s=l3(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=m3({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=xl({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:Tt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let p=oo({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!p.ok)return{status:400,body:{ok:!1,error:p.errorMessage}};c=p.costControls}let d=HA({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:hu(i.prompt),runnerModel:i.runner,costControls:c});return Z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:GA(d)}}});var h3,S3=l(()=>{"use strict";vi();BA();o3();y3();h3=async e=>{let t=await f3({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,agentUrl:r3(e.request),handlers:{readInstalledIds:OA,readWritersReady:UA,startCycle:Ke}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var A3,cye,dye,P3,pye,_3,b3=l(()=>{"use strict";A3=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],cye=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},dye=e=>{let t={};for(let n of e)for(let s of new Set(A3(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},P3=(e,t)=>{let r=cye(A3(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},pye=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},_3=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=dye(e.map(i=>i.text)),s=P3(o,n);return e.map(i=>({id:i.id,score:pye(s,P3(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var Wx,uye,mye,k3,gye,fye,yye,hye,Ox,jx=l(()=>{"use strict";Wx=u(require("node:path"));bt();b3();NA();uye=5,mye=20,k3=280,gye=e=>[e.name,e.description,e.promptText].join(`
`),fye=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=k3?t:`${t.slice(0,k3-3)}...`},yye=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),hye=e=>e===void 0||!Number.isFinite(e)?uye:Math.min(mye,Math.max(1,Math.floor(e))),Ox=e=>{let t=e.query.trim(),r=hye(e.limit),o=Ho(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=nm(o.path),s=_3(n.map(d=>({id:d.fileName,text:gye(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=Wx.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let p=i.get(d.id);return p===void 0?[]:[{skillId:p.fileName,name:p.name,description:p.description,score:d.score,sourcePath:Wx.default.join(a,p.fileName,"SKILL.md"),excerpt:fye(p),source:"filesystem"}]});return{query:t,hits:c,context:yye(c)}}});var R3,w3=l(()=>{"use strict";jx();R3=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:Ox({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var E3,T3=l(()=>{"use strict";w3();E3=async e=>{let t=R3({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var Sye,Mx,C3=l(()=>{"use strict";Wv();J6();X6();Q6();t3();S3();T3();Sye=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Mx=async e=>{let t=Sye(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await h3(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await E3(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:xv()})),!0):(await e3({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||Y6({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||Z6({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await q6(e),!0)}});var Nx,Pye,Aye,dm,KA=l(()=>{"use strict";Nx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pye=e=>!Nx(e)||typeof e.ruleId!="string"||typeof e.title!="string"||typeof e.source!="string"||typeof e.active!="boolean"||typeof e.hitCount!="number"||!Number.isFinite(e.hitCount)||e.lastHitAt!==null&&typeof e.lastHitAt!="string"?null:{ruleId:e.ruleId,title:e.title,source:e.source,active:e.active,hitCount:e.hitCount,lastHitAt:e.lastHitAt},Aye=e=>!Nx(e)||typeof e.ruleIdA!="string"||typeof e.ruleIdB!="string"||e.reason!=="duplicate"&&e.reason!=="overlap"||typeof e.score!="number"||!Number.isFinite(e.score)?null:{ruleIdA:e.ruleIdA,ruleIdB:e.ruleIdB,reason:e.reason,score:e.score},dm=e=>{if(!Nx(e)||e.ok!==!0||typeof e.projectId!="string"||e.windowDays!==null||!Array.isArray(e.rules)||!Array.isArray(e.overlaps))return null;let t=[];for(let o of e.rules){let n=Pye(o);if(n===null)return null;t.push(n)}let r=[];for(let o of e.overlaps){let n=Aye(o);if(n===null)return null;r.push(n)}return{ok:!0,projectId:e.projectId,windowDays:null,rules:t,overlaps:r}}});var _ye,bye,Dx,Hx=l(()=>{"use strict";KA();_ye=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bye=e=>dm({ok:!0,projectId:"x",windowDays:null,rules:[e],overlaps:[]})?.rules[0]??null,Dx=e=>{if(!_ye(e)||e.ok!==!0||typeof e.projectId!="string"||typeof e.changed!="boolean")return null;let t=bye(e.rule);return t===null?null:{ok:!0,projectId:e.projectId,rule:t,changed:e.changed}}});var kye,I3,Fx,L3=l(()=>{"use strict";KA();kye=1e4,I3=(e,t,r=30)=>{let o=new URL(`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/usage`);return o.searchParams.set("days",String(r)),o.toString()},Fx=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"not_connected"};let r=e.fetchImpl??fetch;try{let o=await r(I3(e.appOrigin,e.projectId,e.days??30),{method:"GET",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(kye)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=dm(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var Rye,v3,$x,x3=l(()=>{"use strict";Hx();Rye=15e3,v3=(e,t,r,o)=>`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/${encodeURIComponent(r)}/${o}`,$x=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"unauthorized"};let r=e.fetchImpl??fetch;try{let o=await r(v3(e.appOrigin,e.projectId,e.ruleId,e.action),{method:"POST",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(Rye)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(o.status===404)return{ok:!1,reason:"not_found"};if(o.status===409)return{ok:!1,reason:"limit_exceeded"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=Dx(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var G,Ko=l(()=>{"use strict";ht();G={heading:"Compare rules",intro:"See which rules kick in for a prompt and what they add to each request.",groupLabel:"Sample prompts",lead:"Try a sample:",customLabel:"Or write your own prompt",customHint:"Use a prompt that has nothing to do with this project. Any rule that still kicks in is probably in the wrong place.",button:"Compare",emptyPrompt:"Pick a sample prompt or write your own.",noRules:"No rules kick in for this prompt.",oneRule:"1 rule kicks in for this prompt:",nRules:e=>`${e} rules kick in for this prompt:`,tokenLine:(e,t)=>`Prompt alone: ${e} tokens. Rules add ${t} tokens.`,costLine:e=>`About ${e} more per request.`,rulesUnavailable:"Rules for this project aren't available right now.",ruleUseHeading:"Rule use",ruleUseIntro:"Rules marked below may be safe to drop. You decide. Nothing is removed for you.",usedOnce:"Used 1 time",usedN:e=>`Used ${e} times`,neverUsed:"Never used",notUsedInDays:e=>`Not used in ${e} days`,sameAs:e=>`Same as ${e}`,overlapsWith:e=>`Overlaps with ${e}`,emptyRules:"No rules to check yet.",usageError:"Couldn't load rule usage. Try again.",tryAgain:"Try again",connectComputer:"Connect this computer to AgentWitch to see rule use.",ownerOnlyUsage:"Only the project owner can see rule use.",drop:"Drop",restore:"Restore",undo:"Undo",dropped:e=>`Dropped "${e}".`,ownerOnlyDrop:"Only the project owner can drop rules.",dropFailed:"Couldn't drop the rule. Try again.",restoreFailed:"Couldn't restore the rule. Try again.",limitReached:`Limit reached: ${64} active pitfalls. Retire one to add another.`}});var wye,Eye,zx,Ux,Bx=l(()=>{"use strict";Ko();wye=1440*60*1e3,Eye=(e,t)=>{let r=Date.parse(e);return Number.isFinite(r)?Math.max(0,Math.floor((t-r)/wye)):null},zx=e=>{let t=e.nowMs??Date.now(),r=e.staleAfterDays??30,o=[];if(e.rule.hitCount===0)o.push({kind:"never_used"});else if(e.rule.lastHitAt!==null){let n=Eye(e.rule.lastHitAt,t);n!==null&&n>r&&o.push({kind:"stale",days:n})}for(let n of e.overlaps){let s=n.ruleIdA===e.rule.ruleId?n.ruleIdB:n.ruleIdB===e.rule.ruleId?n.ruleIdA:null;if(s===null)continue;let a=e.rulesById.get(s)?.title??s;n.reason==="duplicate"?o.push({kind:"same_as",ruleTitle:a}):o.push({kind:"overlaps",ruleTitle:a})}return o},Ux=e=>{switch(e.kind){case"never_used":return G.neverUsed;case"stale":return G.notUsedInDays(e.days);case"same_as":return G.sameAs(e.ruleTitle);case"overlaps":return G.overlapsWith(e.ruleTitle);default:return e}}});var W3=l(()=>{"use strict";W();W();W();W();W()});var Gx,Kx=l(()=>{"use strict";ht();Lp();W3();Gx=e=>{let t=fr(e.prompt),r=Ip(e.matched.map(s=>({id:s.id,avoidance:s.avoidance}))),o=e.matched.length===0?0:fr(r),n=rr(null);return{promptTokens:t,rulesTokens:o,addedCostUsd:o/1e3*n}}});var VA=l(()=>{"use strict";C3();jx();Ei();KA();Hx();L3();x3();Bx();Kx();Ko()});var Tye,Cye,Vx,Iye,O3,qx=l(()=>{"use strict";se();St();Sl();Tye="/api/local/coding-tools/pause",Cye=/^(?:127\.0\.0\.1|localhost):\d{1,5}$/,Vx=(e,t)=>e===void 0||e===ia||e===Hc||t!==void 0&&Cye.test(t)&&e===`http://${t}`,Iye=e=>{try{let r=JSON.parse(e)?.paused;return typeof r=="boolean"?r:null}catch{return null}},O3=async e=>{if(e.pathname!==Tye)return!1;let t=(i,a,c)=>e.sendJson(e.response,i,{ok:!0,paused:a,updatedAt:c,label:Ws.pauseLabel,hint:Ws.pauseHint});if(e.method==="GET"){let i=Ds(e.configPath);return t(200,i.paused,i.updatedAt),!0}if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let r=e.request.headers.origin,o=e.request.headers.host;if(!Vx(typeof r=="string"?r:void 0,typeof o=="string"?o:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let n=Iye(await e.readBody(e.request));if(n===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body"}),!0;let s=vw(e.configPath,n);return t(200,s.paused,s.updatedAt),!0}});var Lye,vye,j3,M3=l(()=>{"use strict";_t();qx();Lye="/api/local/projects/folder",vye=e=>{try{let t=JSON.parse(e);return typeof t?.projectId!="string"||typeof t.folderPath!="string"?null:{projectId:t.projectId,folderPath:t.folderPath,allowOutsideHome:t.allowOutsideHome===!0}}catch{return null}},j3=async e=>{if(e.pathname!==Lye)return!1;if(e.method==="GET")return e.sendJson(e.response,200,{ok:!0,...jo(e.profileDir)}),!0;if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let t=e.request.headers.origin,r=e.request.headers.host;if(!Vx(typeof t=="string"?t:void 0,typeof r=="string"?r:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let o=vye(await e.readBody(e.request));if(o===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body",message:"Send projectId and folderPath."}),!0;let s=await(e.link??Mo)({...o,profileDir:e.profileDir,cloudConfig:e.readCloudConfig()});return s.ok?(e.sendJson(e.response,200,s),!0):(e.sendJson(e.response,s.httpStatus,{ok:!1,error:s.code,message:s.message}),!0)}});var Jx,Yx,Xx=l(()=>{"use strict";Jx="2025-03-26",Yx={name:"agent-witch",version:"1.0.0"}});var ql,qA,N3,xye,pm,D3=l(()=>{"use strict";Xx();ql=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),qA=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),N3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,xye=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return ql(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return ql(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return qA(e,i)}catch(i){try{r.onToolError?.(n,i)}catch{}return ql(e,-32603,`Tool ${n} failed`)}},pm=async(e,t,r)=>{let o=N3(e);if(o===null)return ql(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?ql(n,-32600,"Invalid Request"):s==="initialize"?qA(n,{protocolVersion:Jx,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?qA(n,{}):s==="tools/list"?qA(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?xye(n,N3(o.params),t,r):ql(n,-32601,"Method not found")}});var Zx,H3=l(()=>{"use strict";Zx=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var JA=l(()=>{"use strict";D3();H3();Xx()});var Wye,Bn,YA=l(()=>{"use strict";Qr();JA();Wye=(e,t)=>{let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] mcp tool ${e} failed: ${r}
`)},Bn=e=>{let t=xn({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:Yx,tools:[{definition:uS,call:r=>Zx(JSON.stringify(t(r)))}],onToolError:e.logToolError??Wye}}});var F3,Oye,jye,$3,z3=l(()=>{"use strict";JA();YA();F3=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},Oye=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let p;try{p=JSON.parse(d)}catch{p=null}await t(p)}},jye=async(e,t)=>{await Oye(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await pm(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&F3(t.stdout,s);return}F3(t.stdout,s)})},$3=async e=>{await jye(Bn({layout:e.layout,isDeclined:e.isDeclined}),e.streams??{stdin:process.stdin,stdout:process.stdout})}});var Mye,XA,U3=l(()=>{"use strict";JA();YA();Mye="/mcp",XA=async e=>{if(e.pathname!==Mye)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??Bn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await pm(t,r,void 0)),!0}});var B3={};Mt(B3,{createAwlMcpServer:()=>Bn,runAwlMcpStdio:()=>$3,tryHandleAwlMcpHttpRequest:()=>XA});var Qx=l(()=>{"use strict";YA();z3();U3()});var xi,um,Nye,Dye,Hye,Fye,G3,K3=l(()=>{"use strict";xi=u(require("node:fs")),um=u(require("node:path")),Nye="prompt-optimizer-cycles.json",Dye="prompt-optimizer-preferences.json",Hye="prompt-sdlc-cycles.json",Fye="prompt-sdlc-preferences.json",G3=e=>{let t=um.default.join(e,Nye),r=um.default.join(e,Hye);if(xi.default.existsSync(t)||!xi.default.existsSync(r))return t;try{xi.default.renameSync(r,t)}catch{return r}let o=um.default.join(e,Fye),n=um.default.join(e,Dye);if(xi.default.existsSync(o)&&!xi.default.existsSync(n))try{xi.default.renameSync(o,n)}catch{}return t}});var Jl,$ye,eW,V3=l(()=>{"use strict";Jl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$ye=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],eW=e=>{let t=$ye.map(i=>`<option value="${Jl(i.value)}">${Jl(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this computer on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Jl(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Jl(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Jl(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Jl(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var mm,Y3,zye,X3,Uye,Bye,Z3,QA,q3,J3,Gye,Kye,Vo,gm,ZA,Vye,e_,tW,qye,rW,Q3,oW,e7,Jye,Yye,Xye,t7,r7,o7,fm=l(()=>{"use strict";mm=u(require("node:fs")),Y3=u(require("node:path")),zye="estimate-history.ndjson",X3=100,Uye=500,Bye=2e4,Z3=e=>Y3.default.join(e,zye),QA=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,Uye),q3=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,Bye),J3=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,Gye=e=>({...e,estimateTokens:J3(e.estimateTokens),actualTokens:J3(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),Kye=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Vo=e=>{let t=Z3(e);return mm.default.existsSync(t)?mm.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return Kye(n)?[Gye(n)]:[]}catch{return[]}}):[]},gm=(e,t)=>{mm.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;mm.default.writeFileSync(Z3(e),r,"utf8")},ZA=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),Vye=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this computer. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${ZA(o.task)} | ${ZA(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},e_=e=>{let t=Vo(e.reportsDir),r=QA(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);gm(e.reportsDir,[...s,n])},tW=e=>{let t=Vo(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?QA(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);gm(e.reportsDir,[...i,s])},qye=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-X3),rW=e=>[...Vo(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),Q3=e=>{let t=Vo(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=q3(e.input),n=q3(e.output),s=QA(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);gm(e.reportsDir,[...c,a])},oW=(e,t)=>{let r=Vo(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},e7=e=>({table:Vye(qye(Vo(e))),embedding:null}),Jye=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},Yye=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-X3),Xye=e=>{let t=Jye(Yye(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${ZA(s.task)} | ${ZA(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},t7=e=>{let t=Vo(e.reportsDir),r=QA(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);gm(e.reportsDir,[...s,n])},r7=e=>{let t=Vo(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);gm(e.reportsDir,[...s,n])},o7=e=>Xye(Vo(e))});var n7=l(()=>{"use strict";fm()});var qo,nW,Zye,sW,Qye,ehe,t_,r_,the,iW,s7=l(()=>{"use strict";n7();Cv();qo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nW=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},Zye=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${nW(-r)} under`:`${nW(r)} over`},sW=e=>e.toLocaleString("en-US"),Qye=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${sW(-r)} under`:`${sW(r)} over`},ehe=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},t_=e=>e===null?"\u2014":nW(e),r_=e=>e===null?"\u2014":sW(e),the=`(function () {
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
})();`,iW=e=>{let r=rW(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":Zye(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":Qye(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${qo(ehe(i))}</button></td>
        <td>${qo(c)}</td>
        <td>${t_(n.estimateSeconds)}</td>
        <td>${t_(n.actualSeconds)}</td>
        <td>${qo(d)}</td>
        <td>${r_(n.estimateTokens)}</td>
        <td>${r_(n.actualTokens)}</td>
        <td>${qo(p)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${qo(c)}</p>
        <h2>Input</h2>
        <pre>${qo(i)}</pre>
        <h2>Output</h2>
        <pre>${qo(a)}</pre>
        <p>Time: estimated ${t_(n.estimateSeconds)} \xB7 actual ${t_(n.actualSeconds)} \xB7 ${qo(d)}</p>
        <p>Tokens: estimated ${r_(n.estimateTokens)} \xB7 actual ${r_(n.actualTokens)} \xB7 ${qo(p)}</p>
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
            ${YP({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${the}</script>`}
    </section>`}});var i7=l(()=>{"use strict";V3();s7()});var Yl,rhe,ohe,aW,a7=l(()=>{"use strict";Yl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rhe=(e,t,r)=>{let o=Yl(t),n=Yl(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},ohe=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Yl(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>rhe(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Yl(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Yl(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Yl(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},aW=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(ohe).join(""):'<section class="card"><p class="muted">No writer sessions stored on this computer yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var l7=l(()=>{"use strict";a7()});var ym,c7,d7,lW,cW,dW,p7=l(()=>{"use strict";ym=u(require("node:fs")),c7=u(require("node:path"));el();mP();d7=(e,t,r)=>bl({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,lW=(e,t,r)=>{let o=d7(e,t,r);if(o===null)return[];if(!ym.default.existsSync(o))return[];let n=ym.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},cW=e=>{let t=d7(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:Rr(e.entry.prompt),output:Rr(e.entry.output)};ym.default.mkdirSync(c7.default.dirname(t),{recursive:!0}),ym.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},dW=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var nhe,she,hm,o_,pW=l(()=>{"use strict";nhe=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),she=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,hm=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=nhe(i.assistantOutput),d=c.length>0?`Assistant: ${she(c,t)}`:null,p=[a,d].filter(m=>m!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},o_=e=>{let t=e.userMessage.trim(),r=hm({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var po,Sm,gW,ihe,ahe,uW,lhe,fW,n_,u7,m7,che,Xl,yW,mW,g7,dhe,f7,Zl,s_,Pm,phe,Am,hW,i_,a_,y7=l(()=>{"use strict";po=u(require("node:fs")),Sm=u(require("node:path")),gW=require("node:crypto");pW();ihe="writer-sessions",ahe="active-index.json",uW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lhe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",fW=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},n_=e=>{let t=Sm.default.join(e.installDir,ihe);return po.default.mkdirSync(t,{recursive:!0}),t},u7=e=>Sm.default.join(n_(e),ahe),m7=(e,t)=>Sm.default.join(n_(e),`${t}.canonical.json`),che=(e,t)=>Sm.default.join(n_(e),`${t}.continuation.json`),Xl=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,yW=e=>{let t=u7(e);if(!po.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(po.default.readFileSync(t,"utf8"));if(!uW(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!uW(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!lhe(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},mW=(e,t)=>{po.default.writeFileSync(u7(e),JSON.stringify(t,null,2))},g7=(e,t)=>{po.default.writeFileSync(m7(e,t.sessionId),JSON.stringify(t,null,2))},dhe=(e,t)=>{po.default.writeFileSync(che(e,t.sessionId),JSON.stringify(t,null,2))},f7=(e,t)=>{let r=hm({turns:t.turns});dhe(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Zl=(e,t)=>{let r=m7(e,t);if(!po.default.existsSync(r))return null;try{let o=JSON.parse(po.default.readFileSync(r,"utf8"));return!uW(o)||typeof o.sessionId!="string"?null:o}catch{return null}},s_=(e,t=20)=>{let r=n_(e),o=po.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Zl(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},Pm=(e,t,r)=>{let o=fW(r);return yW(e).entries.find(i=>Xl(i)===Xl({writerAgent:t,projectFolderPath:o}))?.sessionId??null},phe=(e,t,r,o)=>{let n=yW(e),s=Xl({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Xl(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];mW(e,{entries:i})},Am=(e,t,r)=>{let o=(0,gW.randomUUID)(),n=new Date().toISOString(),s=fW(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return g7(e,i),f7(e,i),phe(e,t,s,o),o},hW=(e,t,r)=>{let o=Pm(e,t,r);return o!==null?o:Am(e,t,r)},i_=(e,t,r)=>{let o=fW(r),n=yW(e);if(o===null&&r===void 0){mW(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Xl({writerAgent:t,projectFolderPath:o});mW(e,{entries:n.entries.filter(i=>Xl(i)!==s)})},a_=e=>{let t=hW(e.layout,e.writerAgent,e.projectFolderPath),r=Zl(e.layout,t);if(r===null)return;let o={id:(0,gW.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};g7(e.layout,n),f7(e.layout,n)}});var uhe,mhe,l_,SW,h7=l(()=>{"use strict";uhe=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",mhe=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},l_=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",SW=e=>{let t=l_(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=uhe(r,e.userPromptCharacterCount),n=mhe({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var c_=l(()=>{"use strict";p7();y7();pW();h7()});var S7=l(()=>{"use strict";rh();Fa();Zw()});var P7=l(()=>{"use strict";kw()});var xt,fhe,yhe,PW,AW,_W,A7=l(()=>{"use strict";S7();P7();xt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fhe=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},yhe=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=ep(o);return`value="${xt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${xt(r)}"`},PW=(e,t,r,o,n)=>{let s=oh[t];return`<label class="field">
          <span class="field-label">${xt(o)} API key \u2014 ${xt(fhe(e,t))} \xB7 <a class="field-link" href="${xt(s.href)}" target="_blank" rel="noopener noreferrer">${xt(s.label)}</a></span>
          <input class="input mono" type="password" name="${xt(r)}" autocomplete="off" ${yhe(e,t,n)} />
        </label>`},AW=(e,t,r,o)=>{let n=Gy(e[t]?.model),s=new Set(By[t].map(c=>c.value)),i=By[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${xt(c.value)}"${d}>${xt(c.label)}</option>`}).join(""),a=n!==Ms&&!s.has(n)?`<option value="${xt(n)}" selected>${xt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${xt(o)}</span>
          <select class="input mono" name="${xt(r)}">${i}${a}</select>
        </label>`},_W=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${xt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${PW(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${AW(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${PW(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${AW(e.secrets,"openai","openaiModel","OpenAI model")}
        ${PW(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${AW(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var _7=l(()=>{"use strict";A7()});var d_,b7,k7=l(()=>{"use strict";d_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),b7=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${d_(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in AgentWitch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">Nothing installed yet. Install playbooks in AgentWitch Cloud \u2014 files land in your profile harness on this computer. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${d_(s.name)}</strong> <span class="muted mono">(${d_(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${d_(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from AgentWitch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var hhe,R7,w7,E7=l(()=>{"use strict";hhe=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,R7=e=>e.kind==="folder",w7=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&R7(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(R7(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(hhe)};return r(t)}});var T7,bW,C7=l(()=>{"use strict";T7=u(require("node:path")),bW=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${bW(r.children,t)}</ul>
            </details>
          </li>`;let o=T7.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var I7,Gn,She,Phe,_m,Ahe,kW,L7=l(()=>{"use strict";PP();I7=u(require("node:path"));k7();E7();C7();Gn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),She=()=>`(() => {
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

})();`,Phe=()=>`(() => {
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
})();`,_m=e=>{let t=lu({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in AgentWitch Cloud",body:"Install and update playbooks in the browser; this computer keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=b7({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${Gn(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Gn(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Ahe(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${Gn(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${Gn(s)}" />
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
    <script>${She()}</script>
    <script>${Phe()}</script>`;return`${t}${r}${o}${c}${d}`},Ahe=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=w7(a.items.map(g=>({...g,relativePath:typeof g.relativePath=="string"&&g.relativePath.length>0?g.relativePath:I7.default.relative(a.sourceRoot,g.sourcePath).replaceAll("\\","/")}))),p=bW(d,Gn),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${Gn(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${Gn(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${Gn(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},kW=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??p??a,g=t.sets[i];if(g===void 0)continue;let y=a.length>0?a:g.proposedSlug,h=m.length>0?m:g.proposedName,S=r.has(i),T=g.items.map(f=>({id:f.id,kind:f.kind,title:f.title,sourcePath:f.sourcePath,include:S}));s.push({slug:y,name:h,items:T})}return s}});var v7=l(()=>{"use strict";L7()});var _he,RW,x7=l(()=>{"use strict";At();_he=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},RW=_he});var bhe,W7,O7=l(()=>{"use strict";At();bhe=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},W7=bhe});var j7,khe,M7,N7=l(()=>{"use strict";ht();j7={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:`This project already has ${64} active pitfalls, the most allowed. Retire one, then try again.`},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"AgentWitch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach AgentWitch Cloud. Check this computer on Status, then try again."}},khe=e=>e!==null&&Object.prototype.hasOwnProperty.call(j7,e)?j7[e]:null,M7=khe});var D7,H7=l(()=>{"use strict";D7=[{label:"Haiku",goal:"Write a short haiku about morning rain."},{label:"Trip plan",goal:"Plan a quiet weekend trip to a nearby lake."},{label:"Rainbows",goal:"Explain how rainbows form in simple words."},{label:"Dinner idea",goal:"Suggest a quick vegetarian dinner for two."}]});var jr,bm,wW=l(()=>{"use strict";Ko();H7();Sx();jr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bm=e=>{let t=e.promptValue??"",r=DA({presets:D7,groupLabel:G.groupLabel,leadLabel:G.lead,submitName:"rulePrompt"}),o=e.promptError!==void 0&&e.promptError!==null?`<p class="alert-error">${jr(e.promptError)}</p>`:"",n=e.resultHtml!==void 0&&e.resultHtml.length>0?`<div class="stack">${e.resultHtml}</div>`:"",s=e.usageHtml!==void 0&&e.usageHtml.length>0?`<section class="stack">
          <h3>${jr(G.ruleUseHeading)}</h3>
          <p class="lede">${jr(G.ruleUseIntro)}</p>
          ${e.usageHtml}
        </section>`:"";return`<section class="stack" aria-label="${jr(G.heading)}">
      <h2>${jr(G.heading)}</h2>
      <p class="lede">${jr(G.intro)}</p>
      <form method="GET" action="/project" class="stack">
        <input type="hidden" name="id" value="${jr(e.projectId)}" />
        <input type="hidden" name="tab" value="harness" />
        ${r}
        <label class="field-label" for="rule-compare-prompt">${jr(G.customLabel)}</label>
        <p class="muted">${jr(G.customHint)}</p>
        <textarea class="input" id="rule-compare-prompt" name="rulePrompt" rows="3">${jr(t)}</textarea>
        ${o}
        <div class="actions">
          <button class="btn btn-primary" type="submit">${jr(G.button)}</button>
        </div>
      </form>
      ${n}
      ${s}
    </section>`}});var Ql,EW,TW=l(()=>{"use strict";Ko();Ql=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),EW=e=>{if(e.matched.length===0)return`<p class="empty">${Ql(G.noRules)}</p>`;let t=e.matched.length===1?G.oneRule:G.nRules(e.matched.length),r=`<ul class="stack">${e.matched.map(n=>`<li><strong>${Ql(n.title)}</strong> <span class="muted mono">${Ql(n.id)}</span></li>`).join("")}</ul>`,o=`$${e.tokens.addedCostUsd.toFixed(4)}`;return`<div class="stack">
      <p>${Ql(t)}</p>
      ${r}
      <p class="muted">${Ql(G.tokenLine(e.tokens.promptTokens,e.tokens.rulesTokens))}</p>
      <p class="muted">${Ql(G.costLine(o))}</p>
    </div>`}});var ar,Rhe,CW,IW=l(()=>{"use strict";Bx();Ko();ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Rhe=e=>e===1?G.usedOnce:G.usedN(e),CW=e=>{let t=e.flashHtml??"";if(e.rules.length===0)return`${t}<p class="empty">${ar(G.emptyRules)}</p>`;let r=new Map(e.rules.map(n=>[n.ruleId,n])),o=e.rules.map(n=>{let i=zx({rule:n,rulesById:r,overlaps:e.overlaps,nowMs:e.nowMs}).map(c=>`<span class="muted">${ar(Ux(c))}</span>`).join(" \xB7 "),a=n.active?`<form method="POST" action="/project/rules/drop" class="inline-form">
            <input type="hidden" name="projectId" value="${ar(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${ar(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${ar(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${ar(G.drop)}</button>
          </form>`:`<form method="POST" action="/project/rules/restore" class="inline-form">
            <input type="hidden" name="projectId" value="${ar(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${ar(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${ar(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${ar(G.restore)}</button>
          </form>`;return`<li class="stack">
          <p><strong>${ar(n.title)}</strong> <span class="muted">${ar(Rhe(n.hitCount))}</span></p>
          ${i?`<p>${i}</p>`:""}
          ${a}
        </li>`}).join("");return`${t}<ul class="stack">${o}</ul>`}});var Jo,F7,Yo,$7,LW=l(()=>{"use strict";Ko();Jo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),F7=e=>{let t=G.dropped(e.title),r=e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Jo(e.prompt)}" />`:"";return`<div class="alert-success actions">
      <span>${Jo(t)}</span>
      <form method="POST" action="/project/rules/restore" class="inline-form">
        <input type="hidden" name="projectId" value="${Jo(e.projectId)}" />
        <input type="hidden" name="ruleId" value="${Jo(e.ruleId)}" />
        ${r}
        <button class="btn btn-secondary btn-compact" type="submit">${Jo(G.undo)}</button>
      </form>
    </div>`},Yo=(e,t="error")=>`<p class="${t==="error"?"alert-error":"muted"}">${Jo(e)}</p>`,$7=e=>{let t=`/project?id=${encodeURIComponent(e.projectId)}&tab=harness&rulePrompt=${encodeURIComponent(e.prompt)}`;return`<p class="alert-error">${Jo(G.usageError)} <a href="${Jo(t)}">${Jo(G.tryAgain)}</a></p>`}});var whe,z7,U7=l(()=>{"use strict";Ko();LW();IW();whe=(e,t)=>e.ok?"":e.reason==="forbidden"?Yo(G.ownerOnlyDrop):e.reason==="limit_exceeded"?Yo(G.limitReached):Yo(t==="restore"?G.restoreFailed:G.dropFailed),z7=e=>{if(e.usage===null)return Yo(G.connectComputer,"muted");if(!e.usage.ok)return e.usage.reason==="not_connected"?Yo(G.connectComputer,"muted"):e.usage.reason==="forbidden"?Yo(G.ownerOnlyUsage,"muted"):$7({projectId:e.projectId,prompt:e.prompt});let t="";return e.changeError!==void 0&&e.changeError!==null?t=whe(e.changeError,e.changeAction??"drop"):e.dropFlash&&(t=F7({projectId:e.projectId,ruleId:e.dropFlash.ruleId,title:e.dropFlash.title,prompt:e.prompt})),CW({projectId:e.projectId,rules:e.usage.data.rules,overlaps:e.usage.data.overlaps,flashHtml:t,prompt:e.prompt})}});var Ehe,p_,B7=l(()=>{"use strict";Qr();Kx();Ko();wW();TW();U7();LW();Ehe=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,source:e.source,hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,severity:e.severity}),p_=e=>{let t=e.prompt?.trim()??"";if(t.length===0)return bm({projectId:e.projectId,promptError:e.prompt!==null&&e.prompt!==void 0?G.emptyPrompt:null});if(e.rulesUnavailable||e.activeRules===null)return bm({projectId:e.projectId,promptValue:t,resultHtml:Yo(G.rulesUnavailable,"muted")});let o=ol({pitfalls:e.activeRules.map(Ehe),text:t}).map(s=>({id:s.id,title:s.symptom,avoidance:s.avoidance})),n=Gx({prompt:t,matched:o});return bm({projectId:e.projectId,promptValue:t,resultHtml:EW({matched:o,tokens:n}),usageHtml:z7({projectId:e.projectId,prompt:t,usage:e.usage,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})})}});var G7=l(()=>{"use strict";Wv();bx();wW();TW();IW();B7()});var K7,V7=l(()=>{"use strict";At();VA();G7();K7=async e=>{if(e.prompt===null)return p_({projectId:e.projectId,prompt:null,activeRules:[],usage:null});let t=e.cloudConfig===null?{ok:!1,reason:"not_connected"}:await Fx({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:e.projectId,pairingHeaderName:le}),r=e.pitfalls,o=r==null||!r.ok,n=o?null:r.items.filter(s=>s.source!=="retired");return p_({projectId:e.projectId,prompt:e.prompt,activeRules:n,rulesUnavailable:o,usage:t,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})}});var vW,q7,J7=l(()=>{"use strict";At();VA();vW=(e,t)=>e.get(t)?.trim()??"",q7=async e=>{let t=new URLSearchParams(e.rawBody),r=vW(t,"projectId"),o=vW(t,"ruleId"),n=vW(t,"rulePrompt");if(r.length===0||o.length===0)return{kind:"not_found"};let s=n.length>0?`&rulePrompt=${encodeURIComponent(n)}`:"",i=`/project?id=${encodeURIComponent(r)}&tab=harness${s}`;if(e.cloudConfig===null)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent("unavailable")}`};let a=await $x({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:r,ruleId:o,action:e.action,pairingHeaderName:le});if(!a.ok)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent(a.reason)}&ruleChangeAction=${e.action}`};if(e.action==="drop"&&a.data.changed){let c=new URLSearchParams({id:r,tab:"harness",ruleDropped:a.data.rule.ruleId,ruleDroppedTitle:a.data.rule.title});return n.length>0&&c.set("rulePrompt",n),{kind:"redirect",location:`/project?${c.toString()}`}}return{kind:"redirect",location:i}}});var Y7=l(()=>{"use strict"});var Wi,The,xW,X7=l(()=>{"use strict";PP();mT();Wi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),The=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,xW=e=>{let t=e.flashError?`<div class="alert-error">${Wi(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Wi(e.flashMessage)}</div>`:"",r=lu({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in AgentWitch Cloud",body:"Projects are created in the browser. This page chooses their folders on this computer and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in AgentWitch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Wi(The(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${Wi(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Gh(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from AgentWitch Cloud? The folder on this computer stays.');">
                  <input type="hidden" name="projectId" value="${Wi(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Wi(n.name)}</strong>
                  <span class="muted mono">${Wi(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this computer</h1>
      <p class="lede">Synced from AgentWitch Cloud for this paired computer only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var Z7=l(()=>{"use strict";Y7();Jh();X7()});var u_,Q7=l(()=>{"use strict";u_=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var eX,Mr,WW=l(()=>{"use strict";eX=u(require("node:path"));mr();Xe();ee();se();QE();Mr=e=>{let t=B()?.layout.installDir??L();if(eX.default.basename(t)===Hr)return Nt;let r=B(),o=r!==null?Qe(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Nt}});var OW,tX=l(()=>{"use strict";Kr();WW();OW=async e=>{let t=Ze(e.installDir),r=t?.bundleVersion??null,o=Mr(t);try{let n=await xa(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:Rs(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var jW,rX=l(()=>{"use strict";jW=e=>!e});var MW,ec,NW=l(()=>{"use strict";ee();MW=()=>`http://127.0.0.1:${ga()}/update/run`,ec=async e=>{try{let t=await fetch(MW(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Che,oX,DW,nX=l(()=>{"use strict";ee();Ae();NW();Che=()=>{Ao({launchAgentLabel:Ie(),installDir:L()})},oX=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},DW=async()=>{Che();let e=await ec({force:!0});if(e.ok)return{ok:!0,message:oX(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:oX(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Kr(),k$)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var HW=l(()=>{"use strict";hP();Q7();WW();tX();rX();nX();NW()});var sX,iX=l(()=>{"use strict";sX=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var aX,lX,FW,$W,cX=l(()=>{"use strict";aX=require("node:crypto"),lX=u(require("node:fs"));_t();se();se();iX();FW=!1,$W=async e=>{if(FW)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!sX(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=B();if(r===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let o=J({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&lX.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,aX.randomUUID)();FW=!0;try{if(await eT(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await za({...r,workspace:n},e.writerAgent,t);return await kp(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{FW=!1}}});var dX=l(()=>{"use strict";cX()});var kt,tc=l(()=>{"use strict";kt=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var Vt,ie,Rt,Oi,pX,Nr,Te,m_,g_,uX,Kn,Vn,f_,y_,zW,UW,BW,ji,mX,Q=l(()=>{"use strict";Vt="history",ie="skills",Rt="_drafts",Oi="_tombstones",pX="state.json",Nr="meta.json",Te="skillgen",m_="episodes.json",g_="budget.json",uX="metrics.jsonl",Kn="SKILL.md",Vn="meta.json",f_="learned-pitfalls.json",y_="flags.json",zW="index",UW="store.db",BW="acks",ji="tasks",mX="outcomes"});var Mi,fX,wt,ae,gt=l(()=>{"use strict";Mi=u(require("node:fs")),fX=u(require("node:path"));Q();wt=e=>{Mi.default.mkdirSync(e,{recursive:!0,mode:448});try{Mi.default.chmodSync(e,448)}catch{}},ae=(e,t)=>{wt(fX.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;Mi.default.writeFileSync(r,t,{mode:384});try{Mi.default.chmodSync(r,384)}catch{}Mi.default.renameSync(r,e);try{Mi.default.chmodSync(e,384)}catch{}}});var qn,U,ge,te=l(()=>{"use strict";qn=u(require("node:path"));ee();tc();gt();Q();U=e=>{if(!kt(e))throw new Error("invalid_project_id");let t=z();return qn.default.join(t.projectDataDir,e)},ge=e=>{let t=U(e);wt(t),wt(qn.default.join(t,Vt));let r=qn.default.join(t,ie);return wt(r),wt(qn.default.join(r,Rt)),wt(qn.default.join(r,Oi)),wt(qn.default.join(t,Te)),wt(qn.default.join(t,ji)),t}});var GW,KW,h_=l(()=>{"use strict";GW=/^[a-z0-9][a-z0-9_-]{0,63}$/,KW="sha256:"});var yX,Ve,km=l(()=>{"use strict";yX=require("node:crypto");h_();Ve=e=>`${KW}${(0,yX.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var Ni,Rm=l(()=>{"use strict";h_();Ni=e=>GW.test(e)});var wm,S_=l(()=>{"use strict";wm=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var VW,qW=l(()=>{"use strict";VW=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var JW,YW=l(()=>{"use strict";Rm();JW=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>Ni(r.skillId))}catch{return[]}}});var XW,ZW=l(()=>{"use strict";XW=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var QW,e0=l(()=>{"use strict";km();QW=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:Ve(t.body)===t.contentHash?t:null}catch{return null}}});var t0,r0=l(()=>{"use strict";km();Rm();t0=async e=>{if(!Ni(e.skillId))return{ok:!1,code:"unavailable"};let t=Ve(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var o0,n0=l(()=>{"use strict";Rm();o0=async e=>{if(!Ni(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var s0,i0=l(()=>{"use strict";km();S_();e0();r0();s0=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await QW({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(wm({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||Ve(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await t0({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var a0,l0=l(()=>{"use strict";S_();n0();a0=async e=>wm({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await o0({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var Em,P_,hX=l(()=>{"use strict";qW();YW();ZW();i0();l0();Em="[project-skill-pull-mirror]",P_=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await VW({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await XW({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(Em,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await s0({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(p){console.warn(Em,"skill_failed",d.skillId,p),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await JW({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await a0({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(p){console.warn(Em,"orphan_tombstone_failed",d.skillId,p),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(Em,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(Em,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var Jn=l(()=>{"use strict";h_();km();Rm();S_();qW();YW();ZW();e0();r0();n0();i0();l0();hX()});var Di,Tm,Ihe,Lhe,Cm,A_=l(()=>{"use strict";Di=u(require("node:fs")),Tm=u(require("node:path"));gt();Jn();Q();te();Ihe=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Lhe=e=>`v${String(e).padStart(4,"0")}.md`,Cm=e=>{if(!Ihe(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=ge(e.projectId),r=Tm.default.join(t,ie,e.skillId),o=Tm.default.join(r,Lhe(e.version)),n=Tm.default.join(r,Nr),s=Ve(e.body);if(Di.default.existsSync(o)&&Di.default.existsSync(n))try{let a=JSON.parse(Di.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&Di.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}ae(o,e.body),ae(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=Tm.default.join(t,ie,Oi,`${e.skillId}.json`);return Di.default.existsSync(i)&&Di.default.unlinkSync(i),{path:o,contentHash:s}}});var Im,__,d0,p0=l(()=>{"use strict";Im=u(require("node:fs")),__=u(require("node:path"));Jn();Q();te();d0=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=U(e.projectId)}catch{return null}let r=__.default.join(t,ie,e.skillId),o=__.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=__.default.join(r,Nr);if(!Im.default.existsSync(o)||!Im.default.existsSync(n))return null;try{let s=Im.default.readFileSync(o,"utf8"),i=JSON.parse(Im.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||Ve(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var Xo,Yn,SX,vhe,u0,m0,g0=l(()=>{"use strict";Xo=u(require("node:fs")),Yn=u(require("node:path"));gt();Q();te();SX=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),vhe=(e,t)=>{if(!Xo.default.existsSync(e))return;let r=`.${t}.`;for(let o of Xo.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=Yn.default.join(e,o);try{Xo.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},u0=e=>{if(!SX(e.skillId))throw new Error("invalid_project_skill_id");let t=ge(e.projectId),r=Yn.default.join(t,ie),o=Yn.default.join(r,e.skillId),n=!1;if(Xo.default.existsSync(o)){let c=Yn.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{Xo.default.renameSync(o,c),Xo.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}vhe(r,e.skillId);let s=Yn.default.join(r,Oi);wt(s);let i=Yn.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return ae(i,`${JSON.stringify(a)}
`),{removed:n}},m0=e=>{if(!SX(e.skillId))return null;let t;try{t=U(e.projectId)}catch{return null}let r=Yn.default.join(t,ie,Oi,`${e.skillId}.json`);if(!Xo.default.existsSync(r))return null;try{let o=JSON.parse(Xo.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var Lm,f0,y0,h0=l(()=>{"use strict";Lm=u(require("node:fs")),f0=u(require("node:path"));Q();te();y0=e=>{let t;try{t=U(e.projectId)}catch{return[]}let r=f0.default.join(t,ie);if(!Lm.default.existsSync(r))return[];let o=[];for(let n of Lm.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=f0.default.join(r,n,Nr);if(Lm.default.existsSync(s))try{let i=JSON.parse(Lm.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var S0,P0=l(()=>{"use strict";S0=e=>e.toMembershipId===null&&e.toUserId===null&&e.toTeamLabel===null});var PX,xhe,Whe,Ohe,jhe,A0,AX,_X,kst,Rst,Mhe,wst,Nhe,Dhe,Est,_0=l(()=>{"use strict";PX=(e,t)=>{let r=process.env[e]?.trim();if(!r)return t;let o=Number.parseInt(r,10);return Number.isFinite(o)&&o>0?o:t},xhe="peer.silent",Whe="peer.silent_blocked",Ohe="composer.recipient_sticky_cleared",jhe="project.updated",A0=[xhe,Whe,Ohe],AX="System",_X="Owner",kst=5*6e4,Rst=10*6e4,Mhe=300,wst=PX("AWC_PROJECT_MESSAGE_HOURLY_CAP",Mhe),Nhe=300,Dhe=PX("AWC_PROJECT_MESSAGE_UNREAD_CAP",Nhe),Est=["peer.joined","peer.left","peer.renamed",jhe,...A0]});var oc,b0,k0=l(()=>{"use strict";_0();oc="whole",b0="task.assign"});var Hhe,R0,bX=l(()=>{"use strict";P0();k0();Hhe=e=>e==="owner"||e==="member",R0=e=>{let{row:t}=e;return t.senderKind==="owner"||t.senderKind==="member"?S0(t)?oc:t.toMembershipId!==null&&e.botIds.has(t.toMembershipId)?t.toMembershipId:null:t.senderKind!=="bot"||t.senderMembershipId===null||!e.botIds.has(t.senderMembershipId)||!Hhe(t.recipientKind)?null:e.inReplyTo!==null&&e.wholeMessageIds.has(e.inReplyTo)?oc:t.senderMembershipId}});var Fhe,vm,kX=l(()=>{"use strict";Fhe=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,vm=e=>{let t=Fhe.exec(e);if(t===null)return{inReplyTo:null,text:e};let r=e.replace(new RegExp(`${t[0]}\\s*:?`)," ").replace(/\s+/g," ").trim();return{inReplyTo:t[0].toLowerCase(),text:r.length>0?r:e}}});var $he,w0,RX=l(()=>{"use strict";_0();$he=new Set(A0),w0=e=>e.sender_membership_id===null||e.sender_membership_id===void 0?$he.has(String(e.kind))?AX:_X:e.sender_display_name?String(e.sender_display_name):null});var xm=l(()=>{"use strict";bX();P0();k0();kX();RX()});var Hi,je,nc=l(()=>{"use strict";Hi=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},je=(e,t)=>{for(let r of t){let o=Hi(e[r]);if(o!==null)return o}return null}});var Wm,b_=l(()=>{"use strict";xm();nc();Wm=e=>{let t=je(e,["fromProjectDisplayName","senderLabel","sender_label"]);return t!==null?t:w0({sender_membership_id:e.sender_membership_id??e.fromMembershipId??e.senderMembershipId??null,sender_display_name:e.sender_display_name??e.senderDisplayName??null,kind:e.kind})}});var k_,E0=l(()=>{"use strict";nc();k_=e=>{let t=je(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),r=je(e,["toMembershipId","to_membership_id"]);return t===null&&r!==null?new Set([r]):t!==null&&r===null?new Set([t]):t!==null&&r!==null?new Set([r]):new Set}});var wX,zhe,T0,C0=l(()=>{"use strict";xm();E0();nc();wX=(e,t,r)=>e===null?r:t.has(e)?"bot":r,zhe=(e,t)=>{let r=je(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),o=je(e,["toMembershipId","to_membership_id"]),n=je(e,["toUserId","to_user_id"]),s=je(e,["toTeamLabel","to_team_label"]),i=wX(r,t,"owner"),a=o!==null?wX(o,t,"member"):n!==null?"owner":"none";return{messageId:je(e,["messageId","id"])??"unknown",kind:Hi(e.kind)??"chat.note",summary:Hi(e.summary)??"",createdAt:je(e,["createdAt","created_at"])??new Date(0).toISOString(),senderKind:i,senderMembershipId:r,senderUserId:"history-local",senderDisplayName:null,recipientKind:a,toMembershipId:o,toUserId:n,toTeamLabel:s}},T0=e=>{let t=je(e.message,["threadKey","thread_key"]);if(t!==null)return t;let r=e.botIds??k_(e.message),o=zhe(e.message,r),n=je(e.message,["inReplyTo","in_reply_to"])??(o.senderKind==="bot"?vm(o.summary).inReplyTo:null);return R0({row:o,botIds:r,wholeMessageIds:e.wholeMessageIds??new Set,inReplyTo:n})}});var I0,L0,He=l(()=>{"use strict";I0="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM",L0="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM_DRY_RUN"});var v0,x0=l(()=>{"use strict";b_();C0();He();nc();v0=e=>{let t=je(e.message,["createdAt","created_at"])??e.savedAt;return{messageId:e.messageId,projectId:e.projectId,message:e.message,savedAt:e.savedAt,version:2,threadKey:T0({message:e.message,botIds:e.botIds,wholeMessageIds:e.wholeMessageIds}),createdAt:t,senderLabel:Wm(e.message)}}});var Zo,Fi=l(()=>{"use strict";Zo="message"});var W0,EX,$i,Om=l(()=>{"use strict";W0=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},EX=(e,t)=>{for(let r of t){let o=W0(e[r]);if(o!==null)return o}return null},$i=e=>{let t=e,r=W0(t.threadKey)??EX(e.message,["threadKey","thread_key"]),o=W0(t.createdAt)??EX(e.message,["createdAt","created_at"])??e.savedAt;return{threadKey:r,createdAt:o}}});var TX,CX=l(()=>{"use strict";Fi();TX=`
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
`});var IX,LX,vX=l(()=>{"use strict";IX=u(require("node:path"));Q();te();LX=e=>IX.default.join(U(e),zW,UW)});var xX,WX,Ghe,Khe,Xn,Zn,sc=l(()=>{"use strict";xX=u(require("node:fs")),WX=u(require("node:path"));Qr();Fi();CX();vX();Ghe=e=>{let t=e.prepare("SELECT value FROM history_store_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},Khe=(e,t)=>{e.prepare(`INSERT INTO history_store_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},Xn=e=>{let t=zt();if(!t.ok)return{ok:!1,reason:t.reason};let r=LX(e);xX.default.mkdirSync(WX.default.dirname(r),{recursive:!0,mode:448});let o=new t.sqlite.DatabaseSync(r);return o.exec(`PRAGMA busy_timeout = ${3e3}`),o.exec(TX),Ghe(o)<1&&Khe(o,1),{ok:!0,db:o}},Zn=e=>{e.close()}});var Vhe,R_,w_=l(()=>{"use strict";Fi();Om();sc();Vhe="[project-history-index]",R_=e=>{let t=Xn(e.record.projectId);if(!t.ok)return{ok:!1,reason:t.reason};let{threadKey:r,createdAt:o}=$i(e.record),n=e.kind??Zo;try{return t.db.prepare(`INSERT INTO records (message_id, project_id, kind, thread_key, created_at, saved_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(message_id) DO UPDATE SET
           project_id = excluded.project_id,
           kind = excluded.kind,
           thread_key = excluded.thread_key,
           created_at = excluded.created_at,
           saved_at = excluded.saved_at`).run(e.record.messageId,e.record.projectId,n,r,o,e.record.savedAt),{ok:!0,threadKey:r,createdAt:o}}catch(s){return console.error(Vhe,"ingest_failed",e.record.projectId,e.record.messageId,s),{ok:!1,reason:"ingest_failed"}}finally{Zn(t.db)}}});var j0,jX,qhe,Jhe,OX,M0,N0=l(()=>{"use strict";j0=u(require("node:fs")),jX=u(require("node:path"));gt();x0();w_();Q();te();qhe="[project-history-write]",Jhe=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),OX=e=>{try{R_({record:e})}catch(t){console.error(qhe,"index_ingest_failed",e.projectId,e.messageId,t)}},M0=e=>{let t=e.messageId.trim();if(!Jhe(t))throw new Error("invalid_message_id");let r=ge(e.projectId),o=jX.default.join(r,Vt,`${t}.json`);if(j0.default.existsSync(o))try{let s=JSON.parse(j0.default.readFileSync(o,"utf8"));if(s.messageId===t)return OX(s),s}catch{}let n=v0({messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString(),botIds:e.botIds,wholeMessageIds:e.wholeMessageIds});return ae(o,`${JSON.stringify(n)}
`),OX(n),n}});var jm,MX,NX,uo,ic,D0,Qn=l(()=>{"use strict";jm=u(require("node:fs")),MX=u(require("node:path"));gt();Q();te();ee();NX=e=>MX.default.join(U(e),Vt,pX),uo=e=>{try{let t=NX(e);if(!jm.default.existsSync(t))return null;let r=JSON.parse(jm.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},ic=e=>{ge(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return ae(NX(e.projectId),`${JSON.stringify(t)}
`),t},D0=()=>{let t=z().projectDataDir;if(!jm.default.existsSync(t))return[];let r=[];for(let o of jm.default.readdirSync(t)){if(!kt(o))continue;let n=uo(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var DX,HX=l(()=>{"use strict";At();DX=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[le]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var H0,F0=l(()=>{"use strict";H0=e=>{let t=e.deviceId.trim(),r=e.messageId.trim();if(t.length===0)throw new Error("invalid_device_id");if(r.length===0)throw new Error("invalid_message_id");let o=e.ackedAt??new Date().toISOString();return{deviceId:t,messageId:r,ackedAt:o,lastSeenAt:e.lastSeenAt??o}}});var $0,$X,FX,z0,U0=l(()=>{"use strict";$0=u(require("node:fs")),$X=u(require("node:path"));gt();F0();Q();te();FX=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),z0=e=>{let t=e.messageId.trim(),r=e.deviceId.trim();if(!FX(t)||!FX(r))throw new Error("invalid_ack_ids");let o=ge(e.projectId),n=$X.default.join(o,Vt,BW,`${t}.json`),s=e.nowIso??new Date().toISOString();if($0.default.existsSync(n))try{let a=JSON.parse($0.default.readFileSync(n,"utf8"));if(a.messageId===t&&a.deviceId===r&&typeof a.ackedAt=="string"){let c={...a,lastSeenAt:s};return ae(n,`${JSON.stringify(c)}
`),c}}catch{}let i=H0({deviceId:r,messageId:t,ackedAt:s,lastSeenAt:s});return ae(n,`${JSON.stringify(i)}
`),i}});var ac,zX,Yhe,B0,UX=l(()=>{"use strict";br();se();Qn();HX();U0();N0();ac="[project-history-dispatch]",zX=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yhe=()=>{let e=B();return e===null?null:J({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},B0=async e=>{if(!zX(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!zX(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{M0({projectId:t,messageId:o,message:r}),ic({projectId:t,state:"on_ready"});let s=typeof e.deviceId=="string"?e.deviceId.trim():"";if(s.length>0)try{z0({projectId:t,deviceId:s,messageId:o})}catch(i){console.error(ac,"local_ack_failed",t,o,i)}}catch(s){console.error(ac,"write_failed",t,o,s);try{ic({projectId:t,state:"degraded"})}catch(i){console.error(ac,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?Yhe():e.cloudApi;if(n===null)return console.error(ac,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await DX({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(ac,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(ac,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var G0,BX,Xhe,lc,Mm=l(()=>{"use strict";G0=u(require("node:fs")),BX=u(require("node:path"));Q();te();Xhe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},lc=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=BX.default.join(U(e.projectId),Vt,`${t}.json`);if(!G0.default.existsSync(r))return null;try{let o=JSON.parse(G0.default.readFileSync(r,"utf8"));return Xhe(o)?o:null}catch{return null}}});var Nm,E_=l(()=>{"use strict";Mm();Nm=e=>lc(e)});var K0,GX,zi,Dm=l(()=>{"use strict";K0=u(require("node:fs")),GX=u(require("node:path"));Q();Mm();te();zi=e=>{let t=GX.default.join(U(e),Vt);if(!K0.default.existsSync(t))return[];let r=K0.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=lc({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),a=Date.parse(s.savedAt);return i!==a?i-a:n.messageId.localeCompare(s.messageId)})}});var Hm,Zhe,Qhe,eSe,tSe,rSe,oSe,V0,Ui,Fm=l(()=>{"use strict";Fi();Om();Dm();sc();Qr();Hm=(e,t)=>{let r=e[t];return typeof r=="string"?r:null},Zhe=e=>{let t=Hm(e,"messageId"),r=Hm(e,"projectId"),o=Hm(e,"kind"),n=Hm(e,"createdAt"),s=Hm(e,"savedAt");if(t===null||r===null||o===null||n===null||s===null)return null;let i=e.threadKey,a=i==null?null:typeof i=="string"?i:null;return{messageId:t,projectId:r,kind:o==="summary"?"summary":Zo,threadKey:a,createdAt:n,savedAt:s}},Qhe=50,eSe=200,tSe=e=>typeof e!="number"||!Number.isFinite(e)||e<=0?Qhe:Math.min(Math.floor(e),eSe),rSe=(e,t)=>{let r=Date.parse(e.createdAt),o=Date.parse(t.createdAt);return r!==o?o-r:t.messageId.localeCompare(e.messageId)},oSe=(e,t,r)=>{if(t==null||t==="")return!0;let o=Date.parse(e.createdAt),n=Date.parse(t);return o<n?!0:o>n?!1:r==null||r===""?!0:e.messageId.localeCompare(r)<0},V0=(e,t)=>{let r=e.threadKey===void 0||e.threadKey===null?null:e.threadKey;return{available:!0,rows:zi(e.projectId).map(n=>{let s=$i(n);return{messageId:n.messageId,projectId:n.projectId,kind:Zo,threadKey:s.threadKey,createdAt:s.createdAt,savedAt:n.savedAt}}).filter(n=>r===null?!0:n.threadKey===r).filter(n=>oSe(n,e.beforeCreatedAt,e.beforeMessageId)).sort(rSe).slice(0,t)}},Ui=e=>{let t=tSe(e.limit);if(!zt().ok)return V0(e,t);let o=Xn(e.projectId);if(!o.ok)return{...V0(e,t),reason:o.reason};try{let n=[e.projectId,Zo],s=`SELECT message_id AS messageId, project_id AS projectId, kind,
              thread_key AS threadKey, created_at AS createdAt, saved_at AS savedAt
       FROM records
       WHERE project_id = ? AND kind = ?`;e.threadKey!==void 0&&e.threadKey!==null&&(s+=" AND thread_key = ?",n.push(e.threadKey)),e.beforeCreatedAt!==void 0&&e.beforeCreatedAt!==null&&e.beforeCreatedAt!==""&&(e.beforeMessageId!==void 0&&e.beforeMessageId!==null&&e.beforeMessageId!==""?(s+=" AND (created_at < ? OR (created_at = ? AND message_id < ?))",n.push(e.beforeCreatedAt,e.beforeCreatedAt,e.beforeMessageId)):(s+=" AND created_at < ?",n.push(e.beforeCreatedAt))),s+=" ORDER BY created_at DESC, message_id DESC LIMIT ?",n.push(t);let i=o.db.prepare(s).all(...n),a=[];for(let c of i){let d=Zhe(c);d!==null&&a.push(d)}return{available:!0,rows:a}}catch{return V0(e,t)}finally{Zn(o.db)}}});var T_,q0,nSe,Qo,sSe,J0,Y0=l(()=>{"use strict";T_=u(require("node:fs")),q0=u(require("node:path"));Q();te();nSe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qo=e=>typeof e=="string"&&e.trim().length>0?e:null,sSe=e=>{try{let t=JSON.parse(T_.default.readFileSync(e,"utf8"));if(!nSe(t))return null;let r=Qo(t.taskId),o=Qo(t.projectId),n=Qo(t.status),s=Qo(t.createdAt),i=Qo(t.savedAt);if(r===null||o===null||n===null||s===null||i===null)return null;let a=t.threadKey,c=a==null?null:Qo(a);return{taskId:r,projectId:o,threadKey:c,writerAgent:Qo(t.writerAgent),status:n,promptSummary:typeof t.promptSummary=="string"?t.promptSummary:"",resultSummary:typeof t.resultSummary=="string"?t.resultSummary:"",promptBody:typeof t.promptBody=="string"?t.promptBody:null,resultBody:typeof t.resultBody=="string"?t.resultBody:null,createdAt:s,completedAt:t.completedAt===null||t.completedAt===void 0?null:Qo(t.completedAt),agentRunId:Qo(t.agentRunId),savedAt:i}}catch{return null}},J0=e=>{let t;try{t=q0.default.join(U(e),ji)}catch{return[]}if(!T_.default.existsSync(t))return[];let r=T_.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=sSe(q0.default.join(t,n.name));s!==null&&o.push(s)}return o}});var KX,VX,X0,Z0,Q0=l(()=>{"use strict";xm();KX="ai.session",VX=e=>e.agentRunId!==null&&e.agentRunId.trim().length>0?e.agentRunId.trim():e.taskId,X0=e=>{let t=VX(e),r=e.resultSummary.trim().length>0?e.resultSummary:e.promptSummary;return{messageId:t,createdAt:e.createdAt,author:{kind:"bot",membershipId:null,displayName:e.writerAgent},kind:KX,entryKind:"session",session:{status:e.status,writerAgent:e.writerAgent,agentRunId:t},text:r,needsReply:!1,inReplyTo:null,states:[]}},Z0=(e,t)=>t===oc});var Bi,$m=l(()=>{"use strict";Bi=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var iSe,eO,tO=l(()=>{"use strict";xm();b_();Om();$m();E0();nc();iSe=(e,t)=>e===null?"owner":t.has(e)?"bot":"member",eO=e=>{let t=e.message,r=$i(e),o=k_(t),n=je(t,["fromMembershipId","senderMembershipId","sender_membership_id"]),s=Hi(t.kind)??je(t,["messageKind"])??"chat.note",i=Hi(t.summary)??Bi(e),a=iSe(n,o),c=je(t,["inReplyTo","in_reply_to"]),d=c!==null?{inReplyTo:c,text:i}:a==="bot"?vm(i):{inReplyTo:null,text:i},p=Wm(t)??je(t,["senderDisplayName","sender_display_name"]);return{messageId:e.messageId,createdAt:r.createdAt,author:{kind:a,membershipId:n,displayName:p},kind:s,text:d.text,needsReply:s===b0,inReplyTo:d.inReplyTo,states:[]}}});var aSe,lSe,rO,oO,nO=l(()=>{"use strict";aSe=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?(Z|[+-]\d{2}(:?\d{2})?)$/,lSe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rO=e=>Buffer.from(JSON.stringify({t:e.t,id:e.id}),"utf8").toString("base64url"),oO=e=>{if(e==null||e.trim().length===0)return null;let t;try{let n=Buffer.from(e.trim(),"base64url").toString("utf8");t=JSON.parse(n)}catch{return"invalid"}if(!lSe(t))return"invalid";let r=t.t,o=t.id;return typeof r!="string"||typeof o!="string"||!aSe.test(r)||o.length===0||o.length>200?"invalid":{t:r,id:o}}});var qX,cSe,sO,iO=l(()=>{"use strict";E_();Fm();Y0();Q0();tO();nO();qX=(e,t)=>e.createdAt!==t.createdAt?e.createdAt<t.createdAt?1:-1:e.messageId<t.messageId?1:-1,cSe=(e,t,r)=>t==null||t===""||e.createdAt<t?!0:e.createdAt>t?!1:r==null||r===""?!0:e.messageId<r,sO=e=>{let t=oO(e.beforeCursor);if(t==="invalid")return{entries:[],nextBeforeCursor:null,hasMore:!1};let r=typeof e.limit=="number"&&Number.isFinite(e.limit)?Math.max(1,Math.floor(e.limit)):50,o=t?.t??null,n=t?.id??null,s=Ui({projectId:e.projectId,threadKey:e.threadKey,beforeCreatedAt:o,beforeMessageId:n,limit:r+1}),i=[];for(let S of s.rows){let T=Nm({projectId:e.projectId,messageId:S.messageId});if(T===null){i.push({messageId:S.messageId,createdAt:S.createdAt,author:{kind:"owner",membershipId:null,displayName:null},kind:"chat.note",text:"",needsReply:!1,inReplyTo:null,states:[]});continue}i.push(eO(T))}let a=[];for(let S of J0(e.projectId)){if(!Z0(S,e.threadKey))continue;let T=X0(S);cSe(T,o,n)&&a.push(T)}let c=[...i,...a].sort(qX),d=new Map;for(let S of c)d.has(S.messageId)||d.set(S.messageId,S);let p=[...d.values()].sort(qX),m=p.length>r,g=m?p.slice(0,r):p,y=g.length>0?g[g.length-1]:void 0,h=m&&y!==void 0?rO({t:y.createdAt,id:y.messageId}):null;return{entries:g,nextBeforeCursor:h,hasMore:m}}});var dSe,aO,JX=l(()=>{"use strict";iO();dSe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aO=e=>{if(!dSe(e.payload))return{ok:!1,errorCode:"invalid_payload",errorMessage:"project.history.page.request requires an object payload."};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=typeof e.payload.threadKey=="string"?e.payload.threadKey.trim():"";if(t.length===0||r.length===0)return{ok:!1,errorCode:"invalid_payload",errorMessage:"projectId and threadKey are required."};let o=typeof e.payload.beforeCursor=="string"?e.payload.beforeCursor:void 0,n=e.payload.limit,s=typeof n=="number"&&Number.isFinite(n)?Math.max(1,Math.min(100,Math.floor(n))):50;try{let i=sO({projectId:t,threadKey:r,beforeCursor:o,limit:s});return{ok:!0,projectId:t,threadKey:r,entries:i.entries,nextBeforeCursor:i.nextBeforeCursor,hasMore:i.hasMore}}catch(i){return{ok:!1,errorCode:"read_failed",errorMessage:i instanceof Error?i.message:"History page read failed."}}}});var lO,cO=l(()=>{"use strict";h0();Qn();p0();te();g0();A_();lO=()=>({isHistoryEnabled:e=>{let t=uo(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>U(e),writeProjectSkillVersion:e=>Cm(e),readProjectSkillVersion:e=>d0(e),tombstoneProjectSkill:e=>u0(e),readProjectSkillTombstone:e=>m0(e),listProjectSkillIds:e=>y0(e)})});var YX,dO,pO=l(()=>{"use strict";At();YX=e=>({[le]:e,Accept:"application/json"}),dO=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:YX(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:YX(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var uO,mO=l(()=>{"use strict";He();uO=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var gO,fO=l(()=>{"use strict";He();gO=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(p=>p.createdAtMs)),i=n.length>=t,a=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!a&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":a?"idle":"max_interval",messageIds:n.map(p=>p.messageId)}}});var dc,C_=l(()=>{"use strict";He();dc=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var r9,o9,uSe,I_,yO=l(()=>{"use strict";He();r9=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),o9=e=>e.trim().toLowerCase().replace(/\s+/g," "),uSe=(e,t)=>{let r=new Set(e.map(o9).filter(i=>i.length>0)),o=new Set(t.map(o9).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},I_=e=>{let t=e.nearDupJaccard??.6,r=r9(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(r9(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(uSe(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var hO,SO=l(()=>{"use strict";hO=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var PO,gSe,AO,fSe,_O,bO=l(()=>{"use strict";He();PO=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},gSe=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,AO=e=>gSe.test(e),fSe=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,_O=e=>fSe.test(e)});var zm,L_=l(()=>{"use strict";zm=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var n9,en,s9,pc=l(()=>{"use strict";St();n9=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,en=e=>{let t=Pn(e),r=t.scrubbed.match(n9)?.length??0,o=t.scrubbed.replace(n9,"[redacted-email]");return{scrubbed:o,residualSecret:Dd(o),replacementCount:t.replacementCount+r}},s9=e=>Dd(e)});var i9,ySe,hSe,SSe,PSe,a9,l9=l(()=>{"use strict";i9="source_message_ids",ySe=e=>Array.from(new Set(e.map(t=>t.trim()).filter(t=>t.length>0))),hSe=e=>e.trimStart().startsWith(`${i9}:`),SSe=e=>/^\s+-\s*/.test(e),PSe=e=>e.reduce((t,r)=>hSe(r)?{kept:t.kept,skipping:!0}:t.skipping&&SSe(r)?t:{kept:[...t.kept,r],skipping:!1},{kept:[],skipping:!1}).kept,a9=e=>{let t=e.skillMarkdown.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return e.skillMarkdown;let r=t.indexOf(`
---`,3);if(r<0)return e.skillMarkdown;let o=t.slice(0,3),n=t.slice(3,r).replace(/^\r?\n/,"").split(/\r?\n/).filter((a,c,d)=>!(c===d.length-1&&a==="")),s=ySe(e.sourceMessageIds),i=[...PSe(n),`${i9}: ${JSON.stringify(s)}`];return`${o}
${i.join(`
`)}${t.slice(r)}`}});var kO,RO,wO,Um=l(()=>{"use strict";kO=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],RO={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},wO=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var EO,TO=l(()=>{"use strict";Um();EO=(e,t)=>{let r=RO[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var ASe,mo,IO=l(()=>{"use strict";TO();He();ASe=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},mo=e=>{let t=ASe(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=EO(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var kSe,c9,RSe,wSe,LO,Bm,v_=l(()=>{"use strict";He();pc();kSe=/^[a-z0-9][a-z0-9-]{0,63}$/,c9=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let a=i.indexOf(":");if(a<=0)continue;let c=i.slice(0,a).trim(),d=i.slice(a+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},RSe=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,wSe=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},LO=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(s9(o))return{ok:!1,reason:"residual_secret"};let s=c9(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:a}=s,c=i.name??"";if(!kSe.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let p=i.version??"";if(p.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let m=wSe(i.source_message_ids??i.source_message_ids);if(m===null||m.length===0)return{ok:!1,reason:"missing_source_message_ids"};let g=RSe(a);return g<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:p,sourceMessageIds:m,stepCount:g,bodyBytes:n}},Bm=e=>(((c9(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var p9,ESe,go,x_,W_=l(()=>{"use strict";p9=require("node:crypto");Jn();He();mO();fO();C_();yO();SO();bO();L_();pc();l9();IO();v_();ESe=e=>Math.ceil(e.length/4),go=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),x_=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??ESe,a=e.messages.map(p=>p.text).join(`
`),c=(p,m,g)=>{r.push(zm({projectId:t.projectId,episodeId:t.episodeId,fromState:p,toState:m,reason:g,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let p=0;p<16;p+=1){let m=dc({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let g=gO({messages:e.messages.map(S=>({messageId:S.messageId,createdAtMs:S.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),y=mo({state:t.state,verdict:{kind:"close",ready:g.ready}});if(!y.ok)break;let h=t.state;t=go(t,y.nextState,g.ready?g.reason:null,{messageIds:g.ready?g.messageIds:t.messageIds,closedAtMs:g.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(S=>_O(S.text)),hasSuccessSignal:e.messages.some(S=>AO(S.text))}),c(h,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(m.capReached){let S=mo({state:t.state,verdict:{kind:"draft_cap",reached:!0}});S.ok&&(c(t.state,S.nextState,"draft_cap_reached"),t=go(t,S.nextState,"draft_cap_reached"));break}let g=uO({tokensUsedToday:e.tokensUsedToday+n}),y=mo({state:t.state,verdict:{kind:"budget",ok:g.ok}});if(!y.ok)break;let h=t.state;t=go(t,y.nextState,g.ok?"budget_ok":g.reason),c(h,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let g=en(a),y=mo({state:t.state,verdict:{kind:"scrub",residualSecret:g.residualSecret}});if(!y.ok)break;let h=t.state;t=go(t,y.nextState,g.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:g.scrubbed}),c(h,t.state,t.reason);continue}if(t.state==="TRIAGE"){let g=PO({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),y=mo({state:t.state,verdict:{kind:"qualify",ok:g.ok}});if(!y.ok)break;let h=t.state;t=go(t,y.nextState,g.reason),c(h,t.state,t.reason);continue}if(t.state==="DEDUP"){let g=Ve(t.scrubbedTranscript??a),y=I_({contentHash:g,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((y.action==="create_new"||y.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let h=mo({state:t.state,verdict:{kind:"dedup",action:y.action}});if(!h.ok)break;let S=t.state;t=go(t,h.nextState,y.action,{contentHash:g,mergeDraftId:y.action==="update_draft"?y.draftId:t.mergeDraftId}),c(S,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let g=t.scrubbedTranscript??"",y=hO({estimatedInputTokens:i(g),inputTokenCap:12e3}),h=await e.deps.ownerLlm({scrubbedTranscript:g,similarDraftHints:[],mode:y});n+=h.tokensUsed;let S=mo({state:t.state,verdict:{kind:"extract",ok:h.ok}});if(!S.ok)break;let T=t.state;h.ok&&(s=a9({skillMarkdown:h.skillMarkdown,sourceMessageIds:t.messageIds})),t=go(t,S.nextState,h.ok?"extract_ok":h.reason,{tokensUsed:t.tokensUsed+h.tokensUsed}),c(T,t.state,t.reason);continue}if(t.state==="VALIDATE"){let g=s??"",y=LO({skillMarkdown:g}),h=t.validateAttempts+(y.ok?0:1),S=mo({state:t.state,verdict:{kind:"validate",ok:y.ok,attempts:y.ok?t.validateAttempts:Math.max(1,h)}});if(!S.ok)break;let T=t.state;if(y.ok){let f=Ve(g),b=Bm(g),I=I_({contentHash:f,name:y.name,stepLines:b,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(I.action==="skip_exact"){t=go(t,"SKIPPED_DEDUP","skip_exact",{contentHash:f,validateAttempts:h}),c(T,t.state,"skip_exact");break}let P=I.action==="update_draft"?I.draftId:t.mergeDraftId??(0,p9.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:P,skillMarkdown:g,episodeId:t.episodeId,sourceMessageIds:y.sourceMessageIds,name:y.name,description:y.description}),t=go(t,S.nextState,"validate_ok",{draftId:P,contentHash:o.contentHash,validateAttempts:h}),c(T,t.state,t.reason);break}if(S.nextState==="EXTRACT"&&(s=null),t=go(t,S.nextState,y.reason,{validateAttempts:h}),c(T,t.state,t.reason),S.nextState==="EXTRACT"&&h>1)break;continue}break}let d=dc({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var vO,xO,Gm,O_=l(()=>{"use strict";vO=u(require("node:fs")),xO=u(require("node:path"));gt();Q();te();Gm=e=>{if(e.events.length===0)return;let t=ge(e.projectId),r=xO.default.join(t,Te);wt(r);let o=xO.default.join(r,uX),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;vO.default.appendFileSync(o,n,{mode:384});try{vO.default.chmodSync(o,384)}catch{}}});var uc,j_=l(()=>{"use strict";uc=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var f9,u9,m9,CSe,ISe,WO,OO=l(()=>{"use strict";f9=require("node:crypto");He();j_();pc();u9=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,m9=e=>e.toLowerCase().replace(/_/g," "),CSe=(e,t)=>`sha256:${(0,f9.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,ISe=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},WO=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],a=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():m9(c.state),p=en(d);if(p.residualSecret){a+=1;continue}let m=`Avoid repeating this history failure (${m9(c.state)}).`,g=en(m);if(g.residualSecret){a+=1;continue}let y=u9(p.scrubbed.replace(/\s+/g," ").trim(),120),h=u9(g.scrubbed.replace(/\s+/g," ").trim(),280);if(y.length===0||h.length===0)continue;let S=uc(`${y}|${h}`);if(n.has(S))continue;n.add(S);let T=CSe(y,h),f=`- **${y}:** ${h}`;s.length<t&&s.push(f),i.length<r&&i.push({id:ISe(c.episodeId,T),symptom:y,avoidance:h,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:T,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:a}}});var LSe,jO,MO=l(()=>{"use strict";j_();He();LSe=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},jO=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?LSe(n[3]??""):[],i=new Set(s.map(m=>uc(m))),a=[...s],c=0;for(let m of e.newPitfallLines){let g=m.trim();if(g.length===0)continue;let y=g.startsWith("- ")?g:`- ${g}`,h=uc(y);if(!i.has(h)){if(a.length>=t)break;i.add(h),a.push(y),c+=1}}let d=a.length>0?`${a.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(g,y,h)=>`${y}${h}${d}`),appendedCount:c,totalPitfallBullets:a.length};let p=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${p}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:a.length}}});var NO,h9,y9,D_,DO,HO=l(()=>{"use strict";NO=u(require("node:fs")),h9=u(require("node:path"));Q();te();y9="[project-history-skillgen]",D_=()=>({items:[],updatedAt:new Date(0).toISOString()}),DO=e=>{let t=h9.default.join(U(e),Te,f_);if(!NO.default.existsSync(t))return D_();try{let r=JSON.parse(NO.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(y9,"learned_pitfalls_corrupt",e),D_()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:D_().updatedAt}}catch(r){return console.error(y9,"learned_pitfalls_read_failed",e,r),D_()}}});var vSe,S9,P9=l(()=>{"use strict";vSe=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],S9=e=>vSe.includes(e)});var FO,$O=l(()=>{"use strict";P9();FO=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||S9(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var zO,Km,xSe,Vm,H_,F_=l(()=>{"use strict";zO=u(require("node:fs")),Km=u(require("node:path"));Jn();gt();Q();te();xSe=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Vm=e=>{if(!xSe(e.draftId))throw new Error("invalid_draft_id");let t=ge(e.projectId),r=Km.default.join(t,ie,Rt,e.draftId);wt(r);let o=Km.default.join(r,Kn),n=Km.default.join(r,Vn),s=Ve(e.skillMarkdown);return ae(o,e.skillMarkdown),ae(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},H_=e=>{let t=ge(e),r=Km.default.join(t,ie,Rt);return zO.default.existsSync(r)?zO.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var A9,UO,BO=l(()=>{"use strict";A9=u(require("node:path"));gt();Q();te();UO=e=>{let t=ge(e.projectId),r=A9.default.join(t,Te,f_),o={...e.file,updatedAt:new Date().toISOString()};return ae(r,`${JSON.stringify(o)}
`),o}});var GO,b9,_9,$_,WSe,qm,z_=l(()=>{"use strict";GO=u(require("node:fs")),b9=u(require("node:path"));Q();te();_9="[project-history-skillgen]",$_=()=>({historyLearnedPitfalls:null,skillgenDraftsReview:null,updatedAt:new Date(0).toISOString()}),WSe=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.active!="boolean"||typeof t.openDraftCount!="number"||typeof t.maxOpenDrafts!="number"||typeof t.miningPaused!="boolean"||typeof t.notifiedAt!="string"||typeof t.summary!="string"?null:{active:t.active,openDraftCount:Math.max(0,t.openDraftCount),maxOpenDrafts:Math.max(0,t.maxOpenDrafts),miningPaused:t.miningPaused,notifiedAt:t.notifiedAt,summary:t.summary}},qm=e=>{let t=b9.default.join(U(e),Te,y_);if(!GO.default.existsSync(t))return $_();try{let r=JSON.parse(GO.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return console.error(_9,"flags_corrupt",e),$_();let o=r;return{historyLearnedPitfalls:o.historyLearnedPitfalls??null,skillgenDraftsReview:WSe(o.skillgenDraftsReview),updatedAt:typeof o.updatedAt=="string"?o.updatedAt:$_().updatedAt}}catch(r){return console.error(_9,"flags_read_failed",e,r),$_()}}});var k9,Jm,U_=l(()=>{"use strict";k9=u(require("node:path"));gt();Q();te();Jm=e=>{let t=ge(e.projectId),r=k9.default.join(t,Te,y_),o={historyLearnedPitfalls:e.file.historyLearnedPitfalls,skillgenDraftsReview:e.file.skillgenDraftsReview??null,updatedAt:new Date().toISOString()};return ae(r,`${JSON.stringify(o)}
`),o}});var VO,R9,KO,OSe,jSe,B_,qO,JO=l(()=>{"use strict";VO=u(require("node:fs")),R9=u(require("node:path"));O_();OO();MO();He();HO();L_();$O();F_();BO();z_();U_();KO="[project-history-skillgen]",OSe=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},jSe=e=>{try{let t=JSON.parse(VO.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},B_=e=>{try{Gm({projectId:e.projectId,events:[zm({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},qO=e=>{let t=new Date(e.nowMs).toISOString();try{let r=FO({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=WO({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=jSe(e.draftWritten.metaPath),i=VO.default.readFileSync(e.draftWritten.skillPath,"utf8"),a=jO({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=a.appendedCount,a.skillMarkdown!==i&&Vm({projectId:e.projectId,draftId:R9.default.basename(e.draftWritten.draftDir),skillMarkdown:a.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(KO,"pitfalls_draft_merge_failed",e.projectId,s),B_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=DO(e.projectId),i=OSe(s.items,o.localEntries);UO({projectId:e.projectId,file:{items:i,updatedAt:t}});let a=qm(e.projectId);return Jm({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},skillgenDraftsReview:a.skillgenDraftsReview,updatedAt:t}}),B_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(KO,"pitfalls_store_failed",e.projectId,s),B_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(KO,"pitfalls_attach_failed",e.projectId,r),B_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var w9,YO,XO,ZO=l(()=>{"use strict";w9=e=>e.length===0?"(none)":e.map(t=>`- ${t.name}: ${t.description}`).join(`
`),YO=e=>["You are preparing a reusable project skill from a scrubbed chat transcript.","Do NOT invent secrets. Summarize the procedure only.","Return a short reflection covering: goal, inputs, 3\u20138 concrete steps,","pitfalls, and how to verify success. Plain text, no SKILL.md yet.","","Similar existing drafts/skills to avoid overlap:",w9(e.similarDraftHints),"","Transcript:",e.scrubbedTranscript].join(`
`),XO=e=>{let t=e.reflection!==void 0&&e.reflection.trim().length>0?["","Prior reflection (use as outline):",e.reflection.trim(),""]:[""];return["Write ONE SKILL.md draft from the scrubbed transcript.","Output ONLY the markdown file: YAML frontmatter then body.","Frontmatter keys: name (kebab-case), description, version: 0.1.0, status: draft.","Do NOT write source_message_ids; the system adds the transcript message ids.","Body sections: When to use, Inputs, Steps (3\u20138, use placeholders for specifics),","Pitfalls, Verification.","Avoid overlapping similar drafts/skills listed below.","","Similar existing drafts/skills:",w9(e.similarDraftHints),...t,"Transcript:",e.scrubbedTranscript].join(`
`)}});var QO,ej=l(()=>{"use strict";QO=e=>{let t=e.trim();if(t.length===0)return null;let r=t.match(/```(?:markdown|md|skill)?\s*\n([\s\S]*?)```/i);if(r?.[1]!==void 0&&r[1].trim().length>0)return r[1].trim();let o=t.indexOf("---");if(o>=0){let n=t.slice(o).trim();if(/^---[\s\S]*?\n---/.test(n))return n}return t.includes("## Steps")||t.includes("## When to use")?t:null}});var C9,I9,MSe,NSe,DSe,E9,L9,HSe,T9,tj,rj=l(()=>{"use strict";C9=require("node:child_process"),I9=u(require("node:os"));dA();He();ZO();ej();MSe="cursor",NSe="codex",DSe=18e4,E9=e=>Math.ceil(e.length/4),L9=e=>new Promise(t=>{let r=Zt(e.writerAgent,e.prompt,Re({}));if(r===null){t({ok:!1,reason:"writer_cli_unavailable",tokensUsed:0});return}let o=[],n=[],s=(0,C9.spawn)(r.command,[...r.args],{cwd:I9.default.homedir(),stdio:["ignore","pipe","pipe"]}),i=!1,a=d=>{i||(i=!0,clearTimeout(c),t(d))},c=setTimeout(()=>{s.kill("SIGTERM"),a({ok:!1,reason:"writer_timeout",tokensUsed:0})},e.timeoutMs);s.stdout.on("data",d=>{o.push(Buffer.from(d))}),s.stderr.on("data",d=>{n.push(Buffer.from(d))}),s.on("error",()=>a({ok:!1,reason:"writer_start_failed",tokensUsed:0})),s.on("close",()=>{let d=`${Buffer.concat(o).toString("utf8")}
${Buffer.concat(n).toString("utf8")}`;a({ok:!0,text:d,tokensUsed:E9(e.prompt)+E9(d)})})}),HSe=`---
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
`,T9=async(e,t,r)=>{let o=await e({writerAgent:MSe,prompt:t,timeoutMs:r});if(o.ok)return o;let n=await e({writerAgent:NSe,prompt:t,timeoutMs:r});return n.ok?n:{ok:!1,reason:`cursor:${o.reason};codex:${n.reason}`,tokensUsed:o.tokensUsed+n.tokensUsed}},tj=(e={})=>{let t=e.runCli??L9,r=e.timeoutMs??DSe,o=e.dryRun===!0||process.env[L0]==="1";return async n=>{if(o)return{ok:!0,skillMarkdown:HSe,tokensUsed:1};let s,i=0;if(n.mode==="reflect_then_write"){let d=await T9(t,YO({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints}),r);if(i+=d.tokensUsed,!d.ok)return{ok:!1,reason:d.reason,tokensUsed:i};s=d.text}let a=await T9(t,XO({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints,mode:n.mode,reflection:s}),r);if(i+=a.tokensUsed,!a.ok)return{ok:!1,reason:a.reason,tokensUsed:i};let c=QO(a.text);return c===null?{ok:!1,reason:"empty_or_unparseable_skill_markdown",tokensUsed:i}:{ok:!0,skillMarkdown:c,tokensUsed:i}}}});var v9,x9=l(()=>{"use strict";Um();v9=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&wO.includes(o.state))return o}return null}});var Gi,Ym=l(()=>{"use strict";Gi=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var Ki,G_,W9,O9=l(()=>{"use strict";Ki=u(require("node:fs")),G_=u(require("node:path"));Q();te();v_();W9=e=>{let t=G_.default.join(U(e),ie,Rt);if(!Ki.default.existsSync(t))return[];let r=[];for(let o of Ki.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=G_.default.join(t,o.name,Kn),s=G_.default.join(t,o.name,Vn);if(Ki.default.existsSync(n))try{let i=Ki.default.readFileSync(n,"utf8"),a="",c=o.name;if(Ki.default.existsSync(s)){let d=JSON.parse(Ki.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(a=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(a.length===0)continue;r.push({id:o.name,contentHash:a,name:c,stepLines:Bm(i)})}catch{}}return r}});var Xm,oj,j9,M9=l(()=>{"use strict";Xm=u(require("node:fs")),oj=u(require("node:path"));Q();te();j9=e=>{let t=oj.default.join(U(e),ie);if(!Xm.default.existsSync(t))return[];let r=[];for(let o of Xm.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=oj.default.join(t,o.name,Nr);if(Xm.default.existsSync(n))try{let s=JSON.parse(Xm.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var FSe,nj,sj=l(()=>{"use strict";$m();Dm();FSe=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,nj=e=>{let t=zi(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||FSe(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:Bi(o)})}return r}});var N9,D9=l(()=>{"use strict";N9=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var H9,ij,aj=l(()=>{"use strict";H9=u(require("node:path"));gt();Q();te();ij=e=>{let t=ge(e.projectId),r=H9.default.join(t,Te,g_),o={...e.budget,updatedAt:new Date().toISOString()};return ae(r,`${JSON.stringify(o)}
`),o}});var F9,lj,cj=l(()=>{"use strict";F9=u(require("node:path"));gt();Q();te();lj=e=>{let t=ge(e.projectId),r=F9.default.join(t,Te,m_),o={...e.file,updatedAt:new Date().toISOString()};return ae(r,`${JSON.stringify(o)}
`),o}});var $9,z9=l(()=>{"use strict";O_();D9();aj();cj();$9=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,a=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],a=t.episode.lastMessageAtMs??a),lj({projectId:n,file:{episodes:N9(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:a,updatedAt:new Date(s).toISOString()}}),ij({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),Gm({projectId:n,events:t.metrics})}});var K_,dj=l(()=>{"use strict";He();z_();U_();K_=e=>{try{let t=new Date(e.nowMs).toISOString(),r=e.maxOpenDrafts??20,o=qm(e.projectId),{reviewFlag:n}=e;Jm({projectId:e.projectId,file:{historyLearnedPitfalls:o.historyLearnedPitfalls,skillgenDraftsReview:n.miningPaused?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!0,notifiedAt:t,summary:`Mining paused: ${n.draftWaitingCount}/${r} open skill drafts await review`}:n.draftWaitingCount>0?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!1,notifiedAt:t,summary:`${n.draftWaitingCount} skill draft(s) await owner review`}:null,updatedAt:t}})}catch{}}});var V_,pj=l(()=>{"use strict";V_=e=>new Date(e).toISOString().slice(0,10)});var q_,U9=l(()=>{"use strict";pj();q_=e=>({dayKey:V_(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var uj,G9,B9,$Se,mj,gj=l(()=>{"use strict";uj=u(require("node:fs")),G9=u(require("node:path"));U9();Q();te();pj();B9="[project-history-skillgen]",$Se=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=V_(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},mj=e=>{let t=G9.default.join(U(e.projectId),Te,g_);if(!uj.default.existsSync(t))return q_(e.nowMs);try{let r=JSON.parse(uj.default.readFileSync(t,"utf8")),o=$Se(r,e.nowMs);return o===null?(console.error(B9,"budget_corrupt",e.projectId),q_(e.nowMs)):o}catch(r){return console.error(B9,"budget_read_failed",e.projectId,r),q_(e.nowMs)}}});var J_,K9=l(()=>{"use strict";J_=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var fj,q9,V9,zSe,USe,BSe,yj,hj=l(()=>{"use strict";fj=u(require("node:fs")),q9=u(require("node:path"));K9();Um();Q();te();V9="[project-history-skillgen]",zSe=e=>typeof e=="string"&&kO.includes(e),USe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&zSe(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},BSe=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(USe);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},yj=e=>{let t=q9.default.join(U(e),Te,m_);if(!fj.default.existsSync(t))return J_();try{let r=JSON.parse(fj.default.readFileSync(t,"utf8")),o=BSe(r);return o===null?(console.error(V9,"episodes_corrupt",e),J_()):o}catch(r){return console.error(V9,"episodes_read_failed",e,r),J_()}}});var Y9,GSe,KSe,VSe,J9,Sj,Pj=l(()=>{"use strict";Y9=require("node:crypto");W_();JO();rj();$m();x9();Ym();Dm();O9();M9();sj();Qn();z9();dj();He();C_();gj();hj();F_();GSe="[project-history-skillgen]",KSe=e=>e!==void 0?e:process.env[I0]==="0"?null:tj(),VSe=(e,t)=>{let r=new Map;for(let o of zi(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:Bi(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},J9=e=>{let t=e.messages[0],r=e.messages[e.messages.length-1];return{episodeId:(0,Y9.randomUUID)(),projectId:e.projectId,state:"CAPTURING",messageIds:e.messages.map(o=>o.messageId),startedAtMs:t.createdAtMs,lastMessageAtMs:r.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}},Sj=(e={})=>{let t=KSe(e.ownerLlm),r=e.nowMs??Date.now;return async o=>{try{let n=uo(o.projectId);if(!Gi(n?.state))return;let s=r(),i=yj(o.projectId),a=mj({projectId:o.projectId,nowMs:s}),c=nj({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=H_(o.projectId),p=dc({openDraftCount:d,maxOpenDrafts:20});K_({projectId:o.projectId,reviewFlag:p,nowMs:s});let m=v9(i.episodes,o.projectId);if(p.miningPaused&&m!==null&&m.state==="EPISODE_READY"){let h=new Set(m.messageIds),S=c.filter(T=>!h.has(T.messageId));S.length>0&&(m=J9({projectId:o.projectId,messages:S}))}else if(m===null){if(c.length===0)return;m=J9({projectId:o.projectId,messages:c})}else if(m.state==="CAPTURING"&&c.length>0){let h=new Set(m.messageIds),S=[...m.messageIds],T=m.lastMessageAtMs;for(let f of c)h.has(f.messageId)||(S.push(f.messageId),h.add(f.messageId),T=Math.max(T,f.createdAtMs));m={...m,messageIds:S,lastMessageAtMs:T}}let g=VSe(o.projectId,m.messageIds);if(g.length===0)return;let y=await x_({episode:m,messages:g,tokensUsedToday:a.tokensUsedToday,lastClosedAtMs:a.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:Vm,listDraftFingerprints:()=>W9(o.projectId),listPublishedFingerprints:()=>j9(o.projectId),openDraftCount:()=>H_(o.projectId)}});if($9({projectId:o.projectId,episodesFile:i,budget:a,result:y,nowMs:s}),K_({projectId:o.projectId,reviewFlag:y.reviewFlag,nowMs:s}),y.draftWritten!==null&&y.episode.state==="AWAITING_REVIEW"){let h=[...i.episodes.filter(S=>S.episodeId!==y.episode.episodeId),y.episode];qO({projectId:o.projectId,successEpisode:y.episode,episodes:h,draftWritten:y.draftWritten,nowMs:s})}}catch(n){console.error(GSe,"run_failed",o.projectId,n)}}}});var Y_,Aj,_j,X9,bj=l(()=>{"use strict";Y_=u(require("node:path"));Q();Aj=(e,...t)=>{if(typeof e!="string"||e.trim().length===0)throw new Error("invalid_project_data_dir");for(let s of t)if(typeof s!="string"||s.trim().length===0)throw new Error("empty_purge_path_segment");let r=Y_.default.join(e,...t),o=Y_.default.resolve(e);if(Y_.default.resolve(r)===o)throw new Error("purge_target_is_project_data_dir");return r},_j=e=>({drafts:Aj(e,ie,Rt),skillgen:Aj(e,Te),outcomes:Aj(e,mX)}),X9=e=>{let t=_j(e);return[t.drafts,t.skillgen,t.outcomes]}});var Z9,X_,kj=l(()=>{"use strict";Z9=u(require("node:fs"));bj();te();X_=e=>{let t=U(e);return X9(t).some(r=>Z9.default.existsSync(r))}});var Rj,Q9,eZ=l(()=>{"use strict";Rj=u(require("node:fs"));ee();kj();tc();Q9=()=>{let e=z().projectDataDir;if(!Rj.default.existsSync(e))return[];let t=[];for(let r of Rj.default.readdirSync(e))kt(r)&&X_(r)&&t.push(r);return t}});var tZ,rZ=l(()=>{"use strict";tZ=e=>e==="purged"||e==="nothing_to_purge"||e==="purge_failed"});var oZ,nZ=l(()=>{"use strict";oZ=e=>e.cloudState.kind!=="known"?"skipped_unknown":e.cloudState.state!=="off"?"history_on":e.hasPurgeTargets?"purge":"nothing_to_purge"});var qSe,sZ,iZ=l(()=>{"use strict";At();qSe=["off","on_configuring","on_ready","degraded"],sZ=async e=>{try{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history`,{method:"GET",headers:{[le]:e.cloudApi.pairingToken,Accept:"application/json"},signal:AbortSignal.timeout(3e4)});if(!t.ok)return{kind:"unknown",reason:`http_${t.status}`};let r=await t.json();if(typeof r!="object"||r===null||r.ok!==!0)return{kind:"unknown",reason:"malformed_body"};let o=r.state;return typeof o!="string"||!qSe.includes(o)?{kind:"unknown",reason:"unknown_state"}:{kind:"known",state:o}}catch{return{kind:"unknown",reason:"fetch_failed"}}}});var Ej,wj,Tj,Cj=l(()=>{"use strict";Ej=u(require("node:fs"));bj();te();wj=e=>Ej.default.existsSync(e)?(Ej.default.rmSync(e,{recursive:!0,force:!0}),!0):!1,Tj=e=>{let t=_j(U(e.projectId));return{removedDrafts:wj(t.drafts),removedSkillgen:wj(t.skillgen),removedOutcomes:wj(t.outcomes)}}});var Z_,aZ,lZ=l(()=>{"use strict";nZ();iZ();kj();Ym();Qn();Cj();Z_="[project-history-off-purge]",aZ=async e=>{let t=e.deps?.fetchCloudState??sZ,r=e.deps?.hasPurgeTargets??X_,o=e.deps?.purge??Tj,n=e.deps?.isLocalOn??(a=>Gi(uo(a)?.state)),s=e.deps?.markLocalOff??(a=>{ic({projectId:a,state:"off"})}),i;try{let a=e.cloudApi===null?{kind:"unknown",reason:"no_cloud_api"}:await t({cloudApi:e.cloudApi,projectId:e.projectId}),c=a.kind==="known"&&a.state==="off",d=c?r(e.projectId):!1,p=oZ({cloudState:a,hasPurgeTargets:d}),m=!1;if(c&&n(e.projectId))try{s(e.projectId),m=!0}catch(g){console.error(Z_,"mark_off_failed",e.projectId,g)}if(p==="purge"||p==="nothing_to_purge"&&m)try{o({projectId:e.projectId}),i=p==="purge"?"purged":"nothing_to_purge"}catch(g){console.error(Z_,"purge_failed",e.projectId,g),i="purge_failed"}else i=p}catch(a){console.error(Z_,"reconcile_failed",e.projectId,a),i="skipped_unknown"}return i!=="history_on"&&console.info(Z_,`outcome=${i}`,`projectId=${e.projectId}`),i}});var Q_,Ij,Lj=l(()=>{"use strict";Jn();se();br();pO();cO();Pj();Qn();eZ();rZ();lZ();Q_="[project-history-tick]",Ij=async(e={})=>{let t=e.listProjectIds?.()??D0(),r=e.listPurgeCandidateIds?.()??Q9(),o=new Set(t),n=[...t,...r.filter(m=>!o.has(m))];if(n.length===0)return;let s=B(),i=e.cloudApi!==void 0?e.cloudApi:s===null?null:J({wsUrl:s.wsUrl,pairingToken:s.pairingToken}),a=lO(),c=e.pullSkills??P_,d=e.runSkillgen??Sj({...e.ownerLlm!==void 0?{ownerLlm:e.ownerLlm}:{}}),p=e.reconcileOffPurge??aZ;for(let m of n){let g="skipped_unknown";try{g=await p({projectId:m,cloudApi:i})}catch(y){console.error(Q_,"off_purge_failed",m,y)}if(!tZ(g)&&o.has(m)){try{await d({projectId:m})}catch(y){console.error(Q_,"skillgen_failed",m,y)}if(i===null){console.error(Q_,"pull_skipped_no_cloud_api",m);continue}try{await c({projectId:m,deps:{history:a,awcPublished:dO(i)}})}catch(y){console.error(Q_,"pull_failed",m,y)}}}}});var vj,dZ=l(()=>{"use strict";He();Lj();vj=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>Ij());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var pZ=l(()=>{"use strict";W_()});var uZ=l(()=>{"use strict";Fi();w_();sc();Q();Mm();te()});var xj,Wj=l(()=>{"use strict";Fm();Qr();sc();Fi();xj=e=>{let t=zt();if(t.ok){let n=Xn(e.projectId);if(n.ok)try{let s=n.db.prepare(`SELECT DISTINCT thread_key AS threadKey
             FROM records
             WHERE project_id = ? AND kind = ? AND thread_key IS NOT NULL
             ORDER BY thread_key ASC`).all(e.projectId,Zo),i=[];for(let a of s){let c=a.threadKey;typeof c=="string"&&c.length>0&&i.push(c)}return{available:!0,threadKeys:i}}catch{}finally{Zn(n.db)}else return{available:!1,threadKeys:[],reason:n.reason}}let r=Ui({projectId:e.projectId,limit:200}),o=[...new Set(r.rows.map(n=>n.threadKey).filter(n=>typeof n=="string"&&n.length>0))].sort();return{available:r.available,threadKeys:o,reason:t.ok?void 0:t.reason}}});var JSe,YSe,XSe,Oj,mZ=l(()=>{"use strict";Qr();E_();tc();Fm();Wj();JSe=/^\/api\/local\/projects\/([^/]+)\/chats$/,YSe=/^\/api\/local\/projects\/([^/]+)\/chats\/([^/]+)\/messages$/,XSe=e=>{if(e===null||e==="")return;let t=Number.parseInt(e,10);return Number.isFinite(t)?t:void 0},Oj=e=>{let t=JSe.exec(e.pathname);if(t!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(t[1]??"");if(!kt(o))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;let n=zt(),s=xj({projectId:o});return n.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKeys:s.threadKeys}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:n.reason,threadKeys:s.threadKeys}),!0)}let r=YSe.exec(e.pathname);if(r!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(r[1]??""),n=decodeURIComponent(r[2]??"");if(!kt(o)||n.length===0)return e.sendJson(e.response,400,{ok:!1,error:"invalid_path"}),!0;let s=new URL(e.requestUrl,"http://127.0.0.1").searchParams,i=s.get("before"),a=s.get("beforeMessageId"),c=XSe(s.get("limit")),d=zt(),m=Ui({projectId:o,threadKey:n,beforeCreatedAt:i,beforeMessageId:a,limit:c}).rows.map(g=>{let y=Nm({projectId:o,messageId:g.messageId});return{messageId:g.messageId,threadKey:g.threadKey,createdAt:g.createdAt,savedAt:g.savedAt,message:y?.message??null}});return d.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKey:n,messages:m}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:d.reason,projectId:o,threadKey:n,messages:m}),!0)}return!1}});var es,eb,gZ,ZSe,QSe,Zm,Vi,Qm=l(()=>{"use strict";es=u(require("node:fs")),eb=u(require("node:path"));Q();te();gZ=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),ZSe=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.trim().length>0).map(t=>t.trim().toLowerCase()):[],QSe=e=>e==="Computer"?"Computer":"History",Zm=e=>{let t=eb.default.join(U(e),ie,Rt);if(!es.default.existsSync(t))return[];let r=[];for(let o of es.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||!gZ(o.name))continue;let n=eb.default.join(t,o.name,Kn);if(es.default.existsSync(n))try{let s=es.default.readFileSync(n,"utf8"),i=eb.default.join(t,o.name,Vn),a=o.name,c="",d=[],p="History",m=es.default.statSync(n).mtime.toISOString();if(es.default.existsSync(i)){let g=JSON.parse(es.default.readFileSync(i,"utf8"));typeof g.name=="string"&&g.name.trim()&&(a=g.name.trim()),typeof g.description=="string"&&(c=g.description),d=ZSe(g.tags),p=QSe(g.source),typeof g.updatedAt=="string"&&g.updatedAt.length>0&&(m=g.updatedAt)}r.push({id:o.name,title:a,body:s,description:c,tags:d,source:p,updatedAt:m,pathLabel:`skills/_drafts/${o.name}`})}catch{}}return r.sort((o,n)=>n.updatedAt.localeCompare(o.updatedAt))},Vi=(e,t)=>gZ(t)?Zm(e).find(r=>r.id===t)??null:null});var jj,tb,ePe,Mj,Nj=l(()=>{"use strict";jj=u(require("node:fs")),tb=u(require("node:path"));Jn();gt();Q();te();Qm();ePe=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Mj=e=>{if(!ePe(e.draftId))throw new Error("invalid_draft_id");let t=Vi(e.projectId,e.draftId);if(t===null)throw new Error("draft_not_found");let r=tb.default.join(U(e.projectId),ie,Rt,e.draftId),o=tb.default.join(r,Kn),n=tb.default.join(r,Vn),s=e.title.trim()||t.title,i=e.body,a=(e.tags??t.tags).map(y=>y.trim().toLowerCase()).filter(y=>y.length>0),c=Ve(i),d=new Date().toISOString(),p="",m=[],g=t.description;if(jj.default.existsSync(n))try{let y=JSON.parse(jj.default.readFileSync(n,"utf8"));typeof y.episodeId=="string"&&(p=y.episodeId),Array.isArray(y.sourceMessageIds)&&(m=y.sourceMessageIds.filter(h=>typeof h=="string")),typeof y.description=="string"&&(g=y.description)}catch{}return ae(o,i),ae(n,`${JSON.stringify({draftId:e.draftId,episodeId:p,name:s,description:g,sourceMessageIds:m,contentHash:c,status:"draft",tags:a,source:t.source,updatedAt:d})}
`),{id:e.draftId,title:s,body:i,description:g,tags:a,source:t.source,updatedAt:d,pathLabel:`skills/_drafts/${e.draftId}`}}});var Dj,fZ,tPe,eg,rb=l(()=>{"use strict";Dj=u(require("node:fs")),fZ=u(require("node:path"));Q();te();tPe=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),eg=e=>{if(!tPe(e.draftId))throw new Error("invalid_draft_id");let t=fZ.default.join(U(e.projectId),ie,Rt,e.draftId);if(!Dj.default.existsSync(t))throw new Error("draft_not_found");Dj.default.rmSync(t,{recursive:!0,force:!1})}});var mc,ob,yZ,rPe,Hj,Fj=l(()=>{"use strict";mc=u(require("node:fs")),ob=u(require("node:path"));gt();rb();Qm();Q();te();A_();yZ=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),rPe=(e,t)=>{let r=ob.default.join(U(e),ie,t),o=ob.default.join(r,Nr);if(mc.default.existsSync(o))try{let s=JSON.parse(mc.default.readFileSync(o,"utf8"));if(typeof s.version=="number"&&Number.isInteger(s.version))return s.version+1}catch{}if(!mc.default.existsSync(r))return 1;let n=0;for(let s of mc.default.readdirSync(r)){let i=/^v(\d+)\.md$/.exec(s);i&&(n=Math.max(n,Number.parseInt(i[1]??"0",10)))}return n+1},Hj=e=>{let t=Vi(e.projectId,e.draftId);if(t===null)throw new Error("draft_not_found");let r=e.body??t.body,o=(e.title??t.title).trim()||t.title;if(!r.trim()||!o.trim())throw new Error("draft_incomplete");let n=yZ(e.draftId)?e.draftId:`skill-${e.draftId}`.replace(/[^a-zA-Z0-9_-]/g,"-").slice(0,64);if(!yZ(n))throw new Error("invalid_project_skill_id");let s=rPe(e.projectId,n),i=Cm({projectId:e.projectId,skillId:n,version:s,body:r});try{let a=ob.default.join(U(e.projectId),ie,n,Nr),c=JSON.parse(mc.default.readFileSync(a,"utf8"));ae(a,`${JSON.stringify({...c,name:o,version:c.version??s,contentHash:c.contentHash??i.contentHash,updatedAt:new Date().toISOString()})}
`)}catch{}return eg({projectId:e.projectId,draftId:e.draftId}),{skillId:n,version:s,path:i.path}}});var oPe,nPe,sPe,hZ,SZ=l(()=>{"use strict";oPe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nPe=`:root{
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
`,sPe=`(()=>{
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
`,hZ=e=>{let t=JSON.stringify({projectId:e.projectId,projectName:e.projectName,online:e.online,drafts:e.drafts.map(r=>({id:r.id,title:r.title,body:r.body,tags:r.tags,source:r.source,updated:r.updatedAt,pathLabel:r.pathLabel}))}).replaceAll("<","\\u003c");return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>AgentWitch \u2013 AWL skill draft review</title>
<style>${nPe}</style>
</head>
<body>
<div class="win" role="application" aria-label="AgentWitch Local">
  <header class="top">
    <span class="brand">AgentWitch</span>
    <nav class="crumb" aria-label="Location">
      <a href="/project?id=${encodeURIComponent(e.projectId)}">${oPe(e.projectName||"Project")}</a>
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
<script>${sPe}</script>
</body>
</html>`}});var iPe,aPe,lPe,cPe,PZ,AZ,$j,_Z=l(()=>{"use strict";SZ();rb();tc();Qm();Fj();Nj();iPe=/^\/project\/skill-drafts$/,aPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts$/,lPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)$/,cPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)\/publish$/,PZ=async e=>{let t=await e.readBody(e.request);if(!t.trim())return{};let r=JSON.parse(t);if(r===null||typeof r!="object"||Array.isArray(r))throw new Error("invalid_json");return r},AZ=e=>{let t=e instanceof Error?e.message:"error";return t==="draft_not_found"?{status:404,code:t}:t==="invalid_draft_id"||t==="invalid_project_id"||t==="draft_incomplete"||t==="invalid_project_skill_id"||t==="invalid_json"?{status:400,code:t}:{status:500,code:"error"}},$j=async e=>{if(iPe.test(e.pathname)){if(e.method!=="GET")return e.response.writeHead(405),e.response.end(),!0;let s=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("projectId")??"";if(!kt(s))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;let i=[];try{i=Zm(s)}catch{i=[]}let a=e.resolveProjectName(s)??s.slice(0,8);return e.sendHtml(e.response,hZ({projectId:s,projectName:a,online:e.online,drafts:i})),!0}let t=cPe.exec(e.pathname);if(t!==null){if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let n=decodeURIComponent(t[1]??""),s=decodeURIComponent(t[2]??"");if(!kt(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{let i=await PZ(e),a=Hj({projectId:n,draftId:s,title:typeof i.title=="string"?i.title:void 0,body:typeof i.body=="string"?i.body:void 0});e.sendJson(e.response,200,{ok:!0,...a})}catch(i){let a=AZ(i);e.sendJson(e.response,a.status,{ok:!1,error:a.code})}return!0}let r=lPe.exec(e.pathname);if(r!==null){let n=decodeURIComponent(r[1]??""),s=decodeURIComponent(r[2]??"");if(!kt(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{if(e.method==="GET"){let i=Vi(n,s);return i===null?(e.sendJson(e.response,404,{ok:!1,error:"draft_not_found"}),!0):(e.sendJson(e.response,200,{ok:!0,draft:i}),!0)}if(e.method==="PUT"){let i=await PZ(e),a=Mj({projectId:n,draftId:s,title:typeof i.title=="string"?i.title:"",body:typeof i.body=="string"?i.body:"",tags:Array.isArray(i.tags)?i.tags.filter(c=>typeof c=="string"):void 0});return e.sendJson(e.response,200,{ok:!0,draft:a}),!0}if(e.method==="DELETE")return eg({projectId:n,draftId:s}),e.sendJson(e.response,200,{ok:!0}),!0;e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"})}catch(i){let a=AZ(i);e.sendJson(e.response,a.status,{ok:!1,error:a.code})}return!0}let o=aPe.exec(e.pathname);if(o!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let n=decodeURIComponent(o[1]??"");if(!kt(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{let s=Zm(n);e.sendJson(e.response,200,{ok:!0,projectId:n,drafts:s})}catch{e.sendJson(e.response,500,{ok:!1,error:"could_not_read_drafts"})}return!0}return!1}});var Uj,EZ,bZ,dPe,zj,kZ,pPe,RZ,uPe,wZ,mPe,tg,TZ=l(()=>{"use strict";Uj=u(require("node:fs")),EZ=u(require("node:path"));gt();Ym();Qn();Q();te();pc();bZ="[project-history-ai-session]",dPe=280,zj=e=>e.length>0&&e.length<=200&&!e.includes("/")&&!e.includes("\\")&&!e.includes("..")&&!e.startsWith("."),kZ=e=>{let t=e.trim().replace(/\s+/g," ").slice(0,dPe);if(t.length===0)return"";let r=en(t);return r.residualSecret?"[redacted]":r.scrubbed},pPe=e=>{if(e.length===0)return"";let t=en(e);return t.residualSecret?"[redacted]":t.scrubbed},RZ=e=>e===null?null:pPe(e),uPe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wZ=e=>typeof e!="string"?null:e,mPe=e=>{try{if(!Uj.default.existsSync(e))return null;let t=JSON.parse(Uj.default.readFileSync(e,"utf8"));if(!uPe(t))return null;let r=typeof t.taskId=="string"&&t.taskId.trim().length>0?t.taskId.trim():null,o=typeof t.projectId=="string"&&t.projectId.trim().length>0?t.projectId.trim():null,n=typeof t.status=="string"&&t.status.trim().length>0?t.status.trim():null,s=typeof t.createdAt=="string"&&t.createdAt.trim().length>0?t.createdAt.trim():null,i=typeof t.savedAt=="string"&&t.savedAt.trim().length>0?t.savedAt.trim():null;if(r===null||o===null||n===null||s===null||i===null)return null;let a=t.threadKey,c=a==null?null:typeof a=="string"&&a.trim().length>0?a.trim():null;return{taskId:r,projectId:o,threadKey:c,writerAgent:typeof t.writerAgent=="string"&&t.writerAgent.trim().length>0?t.writerAgent.trim():null,status:n,promptSummary:typeof t.promptSummary=="string"?t.promptSummary:"",resultSummary:typeof t.resultSummary=="string"?t.resultSummary:"",promptBody:wZ(t.promptBody),resultBody:wZ(t.resultBody),createdAt:s,completedAt:t.completedAt===null||t.completedAt===void 0?null:typeof t.completedAt=="string"&&t.completedAt.trim().length>0?t.completedAt.trim():null,agentRunId:typeof t.agentRunId=="string"&&t.agentRunId.trim().length>0?t.agentRunId.trim():null,savedAt:i}}catch{return null}},tg=e=>{let t=e.projectId.trim(),r=e.taskId.trim();if(!zj(r))return{ok:!1,reason:"invalid_task_id"};let o=uo(t);if(o===null)return{ok:!1,reason:"history_unknown"};if(!Gi(o.state))return{ok:!1,reason:"history_off"};let n=new Date().toISOString(),s=typeof e.agentRunId=="string"&&e.agentRunId.trim().length>0?e.agentRunId.trim():r,i=s.length>0&&zj(s)?s:r;if(!zj(i))return{ok:!1,reason:"invalid_task_id"};let a;try{a=ge(t)}catch(S){return console.error(bZ,"write_failed",t,r,S),{ok:!1,reason:"write_failed"}}let c=EZ.default.join(a,ji,`${i}.json`),d=mPe(c),p=e.promptBody!==void 0?RZ(e.promptBody):d?.promptBody??null,m=e.resultBody!==void 0?RZ(e.resultBody):d?.resultBody??null,g=typeof e.promptSummary=="string"&&e.promptSummary.trim().length>0?e.promptSummary:p??d?.promptSummary??"",y=typeof e.resultSummary=="string"&&e.resultSummary.trim().length>0?e.resultSummary:m??d?.resultSummary??"",h={taskId:r,projectId:t,threadKey:typeof e.threadKey=="string"&&e.threadKey.trim().length>0?e.threadKey.trim():d?.threadKey??null,writerAgent:typeof e.writerAgent=="string"&&e.writerAgent.trim().length>0?e.writerAgent.trim():d?.writerAgent??null,status:e.status.trim()||d?.status||"completed",promptSummary:kZ(g),resultSummary:kZ(y),promptBody:p,resultBody:m,createdAt:typeof e.createdAt=="string"&&e.createdAt.trim().length>0?e.createdAt.trim():d?.createdAt??n,completedAt:e.completedAt===void 0?d?.completedAt??n:e.completedAt===null?null:e.completedAt.trim()||null,agentRunId:s,savedAt:n};try{return ae(c,`${JSON.stringify(h,null,2)}
`),{ok:!0,record:h}}catch(S){return console.error(bZ,"write_failed",t,r,S),{ok:!1,reason:"write_failed"}}}});var CZ=l(()=>{"use strict"});var IZ=l(()=>{"use strict";CZ()});var nb=l(()=>{"use strict";tc();te();A_();p0();g0();h0();N0();UX();JX();He();cO();pO();Lj();Jn();dZ();Qn();He();fO();mO();bO();pc();yO();SO();rj();ZO();ej();dj();v_();F_();C_();L_();Cj();TO();IO();W_();pZ();Um();Mm();Dm();$m();sj();hj();cj();gj();aj();O_();Pj();Ym();j_();$O();OO();MO();JO();HO();BO();z_();U_();He();w_();uZ();Fm();E_();Wj();mZ();sc();Om();Q();x0();C0();b_();F0();U0();nO();iO();tO();Qm();Nj();rb();Fj();_Z();TZ();Y0();Q0();Q();IZ()});var lr,gPe,LZ,vZ,Bj,Gj,Kj,Vj,qj,Jj,Yj=l(()=>{"use strict";lr=require("node:crypto"),gPe=Buffer.from("302a300506032b6570032100","hex"),LZ=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},vZ=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,lr.createPublicKey)({key:Buffer.concat([gPe,t]),format:"der",type:"spki"})},Bj=()=>{let{publicKey:e,privateKey:t}=(0,lr.generateKeyPairSync)("ed25519");return{publicKeyRaw:LZ(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},Gj=e=>(0,lr.createPrivateKey)(e),Kj=(e,t)=>(0,lr.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Vj=(e,t,r)=>{try{let o=vZ(e);return(0,lr.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},qj=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Jj=()=>(0,lr.randomBytes)(32).toString("base64url")});var tn,sb,xZ,fPe,yPe,ib,Xj,Zj,WZ=l(()=>{"use strict";tn=u(require("node:fs")),sb=u(require("node:path"));Yj();ee();Xe();xZ=e=>sb.default.join(e.installDir,pn),fPe=(e,t)=>{if(e.profileEmail===null||t===xZ(e)||tn.default.existsSync(t))return;let r=xZ(e);tn.default.existsSync(r)&&(tn.default.mkdirSync(sb.default.dirname(t),{recursive:!0}),tn.default.renameSync(r,t))},yPe=e=>{if(!tn.default.existsSync(e))return null;try{let t=tn.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},ib=e=>{let t=Qc(e);fPe(e,t);let r=yPe(t);if(r!==null)return r;let o=Bj();return tn.default.mkdirSync(sb.default.dirname(t),{recursive:!0}),tn.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},Xj=e=>{let t=ib(e.layout),r=Jj(),o=qj({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=Gj(t.privateKeyPem),s=Kj(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},Zj=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Vj(e.serverPublicKey,t,e.serverAttestation)}});var Qj=l(()=>{"use strict";WZ();Yj()});var OZ,jZ,MZ=l(()=>{"use strict";OZ=u(require("node:path")),jZ=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:OZ.default.basename(e.installDir)})});var NZ=l(()=>{"use strict";fs()});var FZ,rg,ts,rM,DZ,SPe,eM,ab,Fe,$Z,PPe,tM,APe,_Pe,qi,bPe,pe,Je,HZ,qe,kPe,RPe,wPe,og,ng,zZ=l(()=>{"use strict";FZ=u(require("node:http")),rg=u(require("node:fs")),ts=u(require("node:path"));Sl();PV();_V();iP();ti();NS();$S();lb();Qp();MV();DV();BV();vs();FI();dL();b5();VA();qx();M3();Qr();Qx();K3();i7();l7();c_();_7();v7();En();_t();At();x7();O7();PT();dC();_T();N7();V7();J7();Z7();HW();Kr();dX();nb();se();Qj();MZ();NZ();rM=e=>wI(e)??"never",DZ=48e3,SPe=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,eM=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??xh(),reveal:t.reveal,installed:Eo(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),ab=async e=>{let t=B();return t===null?{ok:!1,projects:[],message:"Client config missing \u2014 pair this computer in AgentWitch Cloud to load projects."}:Xr(t,e)},Fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$Z=200,PPe=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',tM=e=>{let t=e.trim().slice(0,$Z),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},APe=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${Fe(t)}</div>`,_Pe=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${Fe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',qi={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},bPe=()=>{let e=B();return e===null?null:J({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},pe=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...qi}),e.end(JSON.stringify(r))},Je=(e,t)=>{e.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...qi}),e.end(ii)},HZ=e=>{Je(e,"")},qe=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},kPe=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Not linked</span>',r=e.status.wsConnected?"":'<p class="status-hint">This computer is not linked to AgentWitch cloud (token missing or revoked). Open Home \u2192 Connect this computer for a fresh install command \u2014 do not reuse an old one.</p>',o=PPe(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${Fe(e.status.wakeError)}</div>`:"",s=e.revived?`<div class="alert-success">${Fe(KI(process.platform))}</div>`:"",i=jW(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${UI(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${o}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${Fe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${Fe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${Fe(rM(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${Fe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${i}
    </section>`},RPe=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},wPe=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,$Z)},og=e=>{let t=ts.default.join(e.layout.installDir,"link-code.txt"),r=ts.default.join(e.layout.installDir,"profiles"),o=ts.default.dirname(e.layout.configPath),n=jC({profileDir:o,profilesDir:r}),s=n.start,i=!1,a=n.end-n.start+1,c=0,d=()=>Ze(e.layout.installDir),p=()=>{let k=d();return{installBundleVersion:u_(k),installBundleUpdatedAt:k?.updatedAt??null,installVersion:k}},m=async k=>{let A=k.installVersion??d(),E=await y(),O=gL(E),X=k.updateFlash??null,ne=fL(X),ft=APe(X,k.updateError??null);return uL({title:k.title,activePath:k.activePath,body:k.body,cloudAppOrigin:Mr(A),installBundleVersionLabel:u_(A),prependBody:`${ne}${ft}${O}`,headerUpdateButtonHtml:mL(E)})},g=null,y=async()=>{let k=Date.now();if(g!==null&&k-g.cachedAtMs<6e4)return g.offer;let A=await OW(e.layout);return g={cachedAtMs:k,offer:A},A},h=()=>{g=null},S=!1,T=async k=>{if(h(),!(await y()).updateAvailable){k.writeHead(303,{Location:"/?update=ok"}),k.end();return}if(S){k.writeHead(303,{Location:tM("An update is already running.")}),k.end();return}S=!0;try{let E=await DW(),O=E.ok?"/?update=ok":tM(E.message);k.writeHead(303,{Location:O}),k.end()}catch(E){let O=E instanceof Error&&E.message.trim().length>0?E.message:"Install bundle update failed.";k.writeHead(303,{Location:tM(O)}),k.end()}finally{S=!1,h()}},f=async(k,A)=>{k.writeHead(404,{"Content-Type":"text/plain; charset=utf-8",...qi}),k.end(ii)},b=()=>{if(rg.default.existsSync(t))return rg.default.readFileSync(t,"utf8").trim();let k=Math.random().toString(36).slice(2,8).toUpperCase();return rg.default.writeFileSync(t,k,"utf8"),k},I=Bn({layout:e.layout}),P=FZ.default.createServer((k,A)=>{(async()=>{let E=k.url?.split("?")[0]??"/",O=k.method??"GET";if(O==="OPTIONS"){A.writeHead(204,qi),A.end();return}let X=k.headers["user-agent"],ne=Array.isArray(X)?X[0]:X;if(TI({method:O,pathname:E,userAgent:ne})){HZ(A);return}if(await Mx({method:O,pathname:E,request:k,response:A,requestUrl:k.url??"/",storePath:G3(ts.default.dirname(e.layout.configPath)),readBody:qe,sendHtml:SV({pathname:E,userAgent:ne,headers:qi}),renderShell:m})||await O3({method:O,pathname:E,request:k,response:A,configPath:e.layout.configPath,readBody:qe,sendJson:pe})||await j3({method:O,pathname:E,request:k,response:A,profileDir:ts.default.dirname(e.layout.configPath),readCloudConfig:bPe,readBody:qe,sendJson:pe})||await _S({method:O,pathname:E,request:k,response:A,layout:e.layout,readBody:qe,sendJson:pe})||Oj({method:O,pathname:E,requestUrl:k.url??"/",response:A,sendJson:pe})||await $j({method:O,pathname:E,requestUrl:k.url??"/",request:k,response:A,online:e.controllers.getStatus().wsConnected,resolveProjectName:R=>R.slice(0,8),readBody:qe,sendHtml:Je,sendJson:pe})||await XA({method:O,pathname:E,request:k,response:A,layout:e.layout,readBody:qe,sendJson:pe,server:I}))return;if(O==="GET"&&E==="/health"){let R=e.controllers.getStatus(),w=p();pe(A,200,{ok:!0,...R,installBundleVersion:w.installBundleVersion,installBundleUpdatedAt:w.installBundleUpdatedAt,localAppPort:s,localPortRange:{start:n.start,end:n.end},portsExhausted:i,...AV(),...jZ({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(O==="GET"&&E==="/api/status"){let R=p();pe(A,200,{...e.controllers.getStatus(),linkCode:b(),projectFolders:jo(ts.default.dirname(e.layout.configPath)),installBundleVersion:R.installBundleVersion,installBundleUpdatedAt:R.installBundleUpdatedAt});return}if(O==="GET"&&E==="/api/traffic"){pe(A,200,{entries:aP(e.layout)});return}if(O==="DELETE"&&E==="/api/traffic"||O==="POST"&&E==="/api/traffic/clear"){if(LI(e.layout),O==="POST"){A.writeHead(303,{Location:"/traffic?cleared=1"}),A.end();return}pe(A,200,{ok:!0});return}if(O==="GET"&&E==="/api/trace"){pe(A,200,{entries:cP(e.layout)});return}if(O==="DELETE"&&E==="/api/trace"||O==="POST"&&E==="/api/trace/clear"){if(WI(e.layout),O==="POST"){A.writeHead(303,{Location:"/status"}),A.end();return}pe(A,200,{ok:!0});return}if(O==="POST"&&E==="/api/errors/clear"){OI(e.layout.errorLogPath),A.writeHead(303,{Location:"/errors?cleared=1"}),A.end();return}if(O==="GET"&&E==="/api/knowledge"){let w=new URL(k.url??"/",`http://127.0.0.1:${s}`).searchParams.get("q")?.trim()??"";if(w.length>0){let M=await kl({layout:e.layout,query:w,limit:20});pe(A,200,{chunks:M,query:w});return}pe(A,200,{chunks:su(e.layout).slice(-50).reverse()});return}if(O==="POST"&&E==="/api/revive"){e.controllers.reviveWebSocket(),A.writeHead(303,{Location:"/status?revived=1"}),A.end();return}if(O==="GET"&&E==="/api/update-status"){let R=await y();pe(A,200,{ok:!0,...R});return}if((O==="GET"||O==="POST")&&E==="/api/update"){await T(A);return}if(O==="GET"&&E==="/"){HZ(A);return}if(O==="GET"&&E==="/task"){let R=e.controllers.getStatus(),w=p(),M=B(),N=new URL(k.url??"/",`http://127.0.0.1:${s}`),H=N.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,$=N.searchParams.get("failed")==="1"?N.searchParams.get("error")?.trim()??"Task failed.":null,q=N.searchParams.get("runId");Je(A,await m({title:"Task",activePath:"/task",installVersion:w.installVersion,body:eW({defaultWorkspace:M?.workspace??"",wsConnected:R.wsConnected,flashMessage:H,flashError:$,lastRunId:q})}));return}if(O==="POST"&&E==="/task/dispatch"){let R=await qe(k),w=new URLSearchParams(R),M=w.get("prompt")?.trim()??"",N=w.get("writerAgent")?.trim()??"claude-cli",H=w.get("projectFolder")?.trim()??"",$=await $W({prompt:M,writerAgent:N,...H.length>0?{projectFolderPath:H}:{}}),q=new URLSearchParams;$.ok?q.set("ok","1"):(q.set("failed","1"),$.errorMessage!==void 0&&q.set("error",$.errorMessage.slice(0,240))),$.agentRunId!==void 0&&q.set("runId",$.agentRunId),A.writeHead(303,{Location:`/task?${q.toString()}`}),A.end();return}if(O==="GET"&&E==="/writer-sessions"){let R=p(),w=s_(e.layout,12);Je(A,await m({title:"Writer sessions",activePath:"/writer-sessions",installVersion:R.installVersion,updateFlash:RPe(k.url??void 0),updateError:wPe(k.url??void 0),body:aW({sessions:w})}));return}if(O==="GET"&&E==="/errors"){let R=p(),w=jI(e.layout.errorLogPath);Je(A,await m({title:"Errors",activePath:"/errors",installVersion:R.installVersion,body:NI({errorLogPath:e.layout.errorLogPath,content:w.content,exists:w.exists,truncated:w.truncated,byteSize:w.byteSize,cleared:new URL(k.url??"/",`http://127.0.0.1:${s}`).searchParams.get("cleared")==="1"})}));return}if(O==="GET"&&E==="/status"){let R=new URL(k.url??"/",`http://127.0.0.1:${s}`),w=e.controllers.getStatus(),M=$e(e.layout),N=M!==null?et(M,12e4):$I(w.lastHeartbeatAt,12e4),H=zI({lastHeartbeatAt:w.lastHeartbeatAt,heartbeatIsStale:N}),$=p();Je(A,await m({title:"Status",activePath:"/status",installVersion:$.installVersion,body:`${kPe({status:w,healthBadge:H,revived:R.searchParams.get("revived")==="1",linkCode:b(),installBundleVersion:$.installBundleVersion,installBundleUpdatedAt:$.installBundleUpdatedAt})}${GI({installDir:e.layout.installDir,platform:process.platform})}${BI({entries:cP(e.layout)})}`}));return}if(O==="GET"&&E==="/traffic"){let R=new URL(k.url??"/",`http://127.0.0.1:${s}`),w=aP(e.layout),M=p(),N=w.map(q=>`<tr><td title="${Fe(q.at)}">${Fe(rM(q.at))}</td><td>${Fe(q.direction)}</td><td><code>${Fe(q.type)}</code></td><td>${Fe(q.summary)}</td><td>${Fe(q.action??"")}</td></tr>`).join(""),H=w.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${N}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',$=R.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Je(A,await m({title:"Traffic",activePath:"/traffic",installVersion:M.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${$}
              ${H}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(O==="GET"&&E==="/projects"){let R=new URL(k.url??"/",`http://127.0.0.1:${s}`),w=p(),M=Mr(w.installVersion),N=await ab(e.layout),H=R.searchParams.get("folderError")==="1"?"Could not save the selected folder to AgentWitch. Check the Mac connection and try again.":R.searchParams.get("deleteError")==="1"?"Could not delete the project in AgentWitch Cloud. Check pairing on Status.":null,$=R.searchParams.get("deleted")==="1"?"Project removed from AgentWitch Cloud. Folders on your computer were not deleted.":null,q=B(),ye=q===null?null:J({wsUrl:q.wsUrl,pairingToken:q.pairingToken}),he=ye===null?{}:Object.fromEntries((await Promise.all(N.projects.map(async Ot=>{let jt=await RW(ye,Ot.id);return[Ot.id,jt?.counts??null]}))).filter(Ot=>Ot[1]!==null));Je(A,await m({title:"Projects",activePath:"/projects",installVersion:w.installVersion,body:xW({projects:N.projects,compositionCountsByProjectId:he,cloudAppOrigin:M,syncMessage:N.message,syncOk:N.ok,flashMessage:$,flashError:H})}));return}if(O==="GET"&&E==="/projects/select-folder"){let w=new URL(k.url??"/",`http://127.0.0.1:${s}`).searchParams.get("projectId")?.trim()??"",M=B(),N=M===null?null:J({wsUrl:M.wsUrl,pairingToken:M.pairingToken}),H=w.length>0&&N!==null?In():null;if(H===null||N===null){A.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...qi}),A.end(ii);return}let $=await Mo({projectId:w,folderPath:H,allowOutsideHome:!0,profileDir:ts.default.dirname(e.layout.configPath),cloudConfig:N});if(!$.ok){pe(A,$.httpStatus,{ok:!1,error:$.message});return}pe(A,200,{ok:!0,projectId:w,folderPath:$.folderPath,bindingsSynced:$.bindingsSynced,summary:$.summary});return}if(O==="POST"&&E==="/projects/delete"){let R=await qe(k),w=new URLSearchParams(R).get("projectId")?.trim()??"",M=B(),N=M===null?null:J({wsUrl:M.wsUrl,pairingToken:M.pairingToken});if(N===null||w.length===0){A.writeHead(303,{Location:"/projects?deleteError=1"}),A.end();return}let H=await xT(N,w);A.writeHead(303,{Location:H.ok?"/projects?deleted=1":"/projects?deleteError=1"}),A.end();return}if(O==="GET"&&E==="/project"){let R=new URL(k.url??"/",`http://127.0.0.1:${s}`),w=R.searchParams.get("id")?.trim()??"",M=p(),N=Mr(M.installVersion),H=await ab(e.layout),$=kr(H.projects,w);if($===null){await f(A,"Project not found");return}let q=R.searchParams.get("linked")==="1"?R.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${R.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${R.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:R.searchParams.get("folderUpdated")==="1"?R.searchParams.get("bindingsSynced")==="0"?"Project folder updated. Harness composition sync to cloud failed \u2014 check WS connection on Status.":"Project folder updated and harness bindings synced with AgentWitch.":null,ye=R.searchParams.get("knowledgePromoted"),he=ye!==null?`Marked ${ye} lesson(s) as promoted in AgentWitch.`:null,Ot=R.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,jt=R.searchParams.get("tab")?.trim()??"harness",ze=jt==="workflows"||jt==="agents"||jt==="knowledge"||jt==="pitfalls"?jt:"harness",jg=R.searchParams.get("retired")==="1",Wre=R.searchParams.get("edit")?.trim()||null,zN=M7(R.searchParams.get("pitfall")),qb=B(),dn=qb===null?null:J({wsUrl:qb.wsUrl,pairingToken:qb.pairingToken}),Ore=dn===null?null:await RW(dn,$.id),Jb=0;if(dn!==null)try{let JN=await fetch(`${dn.appOrigin}/api/agent-witch/projects/${encodeURIComponent($.id)}/knowledge`,{method:"GET",headers:{[le]:dn.pairingToken},signal:AbortSignal.timeout(1e4)});if(JN.ok){let Mg=await JN.json();typeof Mg=="object"&&Mg!==null&&typeof Mg.candidateCount=="number"&&(Jb=Mg.candidateCount)}}catch{Jb=0}let UN=R.searchParams.get("rulePrompt"),BN=UN!==null,jre=UN?.trim()??"",GN=R.searchParams.get("ruleDropped")?.trim()||null,KN=R.searchParams.get("ruleDroppedTitle")?.trim()||null,VN=R.searchParams.get("ruleChangeError")?.trim()||null,Mre=(R.searchParams.get("ruleChangeAction")?.trim()||null)==="restore"?"restore":"drop",Nre=VN===null?null:{ok:!1,reason:VN},qN=ze==="pitfalls"||ze==="harness"&&BN?await N1({store:TS({layout:e.layout,cloud:dn===null?null:wp(dn)}),projectId:$.id,includeRetired:ze==="pitfalls"?jg:!1}):void 0,Dre=ze!=="harness"?void 0:await K7({projectId:$.id,prompt:BN?jre:null,cloudConfig:dn,pitfalls:qN,dropFlash:GN!==null&&KN!==null?{ruleId:GN,title:KN}:null,changeError:Nre,changeAction:Mre});Je(A,await m({title:$.name,activePath:"/projects",installVersion:M.installVersion,body:Tn({project:$,cloudAppOrigin:N,installed:Eo(e.layout),linkedSetSlugs:er($.projectFolderPath),composition:Ore,knowledgeCandidateCount:Jb,pitfalls:qN,pitfallsShowRetired:jg,pitfallsEditId:Wre,activeTab:ze,harnessExtraHtml:Dre,flashMessage:q??he??zN?.message??null,flashError:Ot??zN?.error??null})}));return}if(O==="POST"&&(E==="/project/rules/drop"||E==="/project/rules/restore")){let R=await qe(k),w=B(),M=w===null?null:J({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),N=await q7({action:E.endsWith("/drop")?"drop":"restore",rawBody:R,cloudConfig:M});if(N.kind==="not_found"){await f(A,"Project not found");return}A.writeHead(303,{Location:N.location}),A.end();return}if(O==="POST"&&E==="/projects/pull-bound-harness"){let R=await qe(k),w=await hT({rawBody:R,layout:e.layout});if(w.kind==="not_found"){await f(A,"Project not found");return}if(w.kind==="redirect"){A.writeHead(303,{Location:w.location}),A.end();return}let M=p();Je(A,await m({title:w.title,activePath:"/projects",installVersion:M.installVersion,body:w.body}));return}if(O==="POST"&&E==="/projects/link-harness"){let R=await qe(k),w=new URLSearchParams(R),M=w.get("projectId")?.trim()??"",N=await ab(e.layout),H=kr(N.projects,M);if(H===null){await f(A,"Project not found");return}let $=w.getAll("applySet").map(ze=>String(ze)),q=fp({layout:e.layout,projectFolderPath:H.projectFolderPath,setSlugs:$});if(!q.ok){let ze=p(),jg=Mr(ze.installVersion);Je(A,await m({title:H.name,activePath:"/projects",installVersion:ze.installVersion,body:Tn({project:H,cloudAppOrigin:jg,installed:Eo(e.layout),linkedSetSlugs:er(H.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:q.errorMessage})}));return}let ye=B(),he=ye===null?null:J({wsUrl:ye.wsUrl,pairingToken:ye.pairingToken}),Ot=he===null?!1:await Co(he,H.id,q.appliedSetSlugs),jt=new URLSearchParams({linked:"1",files:String(q.writtenFileCount),bindingsSynced:Ot?"1":"0"});A.writeHead(303,{Location:`/project?id=${encodeURIComponent(H.id)}&${jt.toString()}`}),A.end();return}if(O==="POST"&&E==="/projects/remove-harness-set"){let R=await qe(k),w=await ST({rawBody:R,layout:e.layout});if(w.kind==="not_found"){await f(A,"Project not found");return}if(w.kind==="redirect"){A.writeHead(303,{Location:w.location}),A.end();return}let M=p();Je(A,await m({title:w.title,activePath:"/projects",installVersion:M.installVersion,body:w.body}));return}if(O==="POST"&&E==="/project/knowledge/promote-all"){let R=await qe(k),M=new URLSearchParams(R).get("projectId")?.trim()??"",N=await ab(e.layout),H=kr(N.projects,M);if(H===null){await f(A,"Project not found");return}let $=B(),q=$===null?null:J({wsUrl:$.wsUrl,pairingToken:$.pairingToken}),ye=q===null?{ok:!1,promotedCount:0}:await W7(q,H.id),he=new URLSearchParams({tab:"knowledge",...ye.ok?{knowledgePromoted:String(ye.promotedCount)}:{knowledgePromoteFailed:"1"}});A.writeHead(303,{Location:`/project?id=${encodeURIComponent(H.id)}&${he.toString()}`}),A.end();return}let ft=Vh(E);if(O==="POST"&&ft!==null){let R=await qe(k),w=await bT({rawBody:R,action:ft,layout:e.layout,createStore:M=>TS({layout:e.layout,cloud:wp(M)})});if(w.kind==="not_found"){await f(A,"Project not found");return}A.writeHead(303,{Location:w.location}),A.end();return}if(O==="GET"&&E==="/harness"){let R=new URL(k.url??"/",`http://127.0.0.1:${s}`),w=p(),M=Pp(e.layout),N=R.searchParams.get("submitted")==="1",H=N?R.searchParams.get("syncFailed")==="1"?`Local harness updated (${R.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:R.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${R.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":R.searchParams.get("stopped")==="1"?`Reveal stopped. ${M?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:R.searchParams.get("revealed")==="1"?`Reveal found ${M?.sets.length??0} set(s).`:null,$=M?.scanRoots[0]??xh(),q=SPe(e.layout,{reveal:M,importQuery:R.searchParams.get("import")==="1",justSubmitted:N}),ye=Mr(w.installVersion);Je(A,await m({title:"Harness",activePath:"/harness",installVersion:w.installVersion,body:_m(eM(e.layout,{cloudAppOrigin:ye,reveal:M,scanFolder:$,flashMessage:H,importSectionExpanded:q}))}));return}if(O==="POST"&&E==="/api/harness/pick-folder"){let R=In();if(R===null){pe(A,200,{cancelled:!0});return}pe(A,200,{path:R});return}if(O==="GET"&&E==="/api/harness/file-content"){let w=new URL(k.url??"/",`http://127.0.0.1:${s}`).searchParams.get("path")?.trim()??"",M=gp(w);if(M===null){pe(A,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let N=rg.default.readFileSync(M,"utf8"),H=N.length>DZ?`${N.slice(0,DZ)}
\u2026 (truncated)`:N;pe(A,200,{content:H})}catch{pe(A,500,{errorMessage:"Could not read file."})}return}if(O==="POST"&&E==="/api/harness/reveal/add-project"){let R=await qe(k),w="";try{let H=JSON.parse(R);typeof H=="object"&&H!==null&&typeof H.projectPath=="string"&&(w=H.projectPath.trim())}catch{pe(A,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(w.length===0){pe(A,400,{ok:!1,errorMessage:"projectPath is required."});return}let M=Pp(e.layout),N=UE({reveal:M,projectPath:w});if(N===null||N.sets.length===0){pe(A,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Mh(e.layout,N),pe(A,200,{ok:!0,setCount:N.sets.length});return}if(O==="GET"&&E==="/api/harness/reveal/stream"){let w=new URL(k.url??"/",`http://127.0.0.1:${s}`).searchParams.get("scanRoot")?.trim()??"";if(w.length===0){pe(A,400,{errorMessage:"Choose a folder to scan first."});return}let M=!1;k.on("close",()=>{M=!0}),A.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...qi});let N=BE({scanRoot:w,response:A,shouldAbort:()=>M});Mh(e.layout,N),A.end();return}if(O==="POST"&&E==="/harness/reveal"){A.writeHead(410,{"Content-Type":"text/plain"}),A.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(O==="POST"&&E==="/harness/submit"){let R=Pp(e.layout);if(R===null){let ye=p(),he=Mr(ye.installVersion);Je(A,await m({title:"Harness",activePath:"/harness",installVersion:ye.installVersion,body:_m(eM(e.layout,{cloudAppOrigin:he,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let w=await qe(k),M=new URLSearchParams(w),N=kW(M,R),H=KE({layout:e.layout,sets:N});if(!H.ok){let ye=p(),he=Mr(ye.installVersion);Je(A,await m({title:"Harness",activePath:"/harness",installVersion:ye.installVersion,body:_m(eM(e.layout,{cloudAppOrigin:he,reveal:R,flashError:H.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}qE(e.layout);let q=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";A.writeHead(303,{Location:`/harness?submitted=1&count=${H.writtenItemCount??0}${q}`}),A.end();return}if(O==="GET"&&E==="/writer-api"){let R=new URL(k.url??"/",`http://127.0.0.1:${s}`),M=B()?.writerExecutionBackend??dt(void 0),N=rt(e.layout.configPath),H=_n(N),$=R.searchParams.get("saved")==="1"?"Writer API settings saved on this computer.":null,q=p();Je(A,await m({title:"Writer API",activePath:"/writer-api",installVersion:q.installVersion,body:_W({writerExecutionBackend:M,secrets:H,flashMessage:$})}));return}if(O==="POST"&&E==="/writer-api"){let R=await qe(k),w=new URLSearchParams(R),M=w.get("writerExecutionBackend")?.trim()??"cli";Xw({configPath:e.layout.configPath,writerExecutionBackend:dt(M),anthropicApiKey:w.get("anthropicApiKey")??void 0,anthropicModel:w.get("anthropicModel")??void 0,openaiApiKey:w.get("openaiApiKey")??void 0,openaiModel:w.get("openaiModel")??void 0,googleApiKey:w.get("googleApiKey")??void 0,googleModel:w.get("googleModel")??void 0}),A.writeHead(303,{Location:"/writer-api?saved=1"}),A.end();return}if(O==="GET"&&E==="/estimates"){A.writeHead(302,{Location:"/history"}),A.end();return}if(O==="GET"&&E==="/history"){let R=p();Je(A,await m({title:"History",activePath:"/history",installVersion:R.installVersion,body:iW({reportsDir:e.layout.reportsDir})}));return}if(O==="GET"&&E==="/knowledge"){let w=new URL(k.url??"/",`http://127.0.0.1:${s}`).searchParams.get("q")?.trim()??"",M=p(),N=ZI({layout:e.layout}),H=tL(N),$=w.length>0?await kl({layout:e.layout,query:w,limit:20}):su(e.layout).slice(-50).reverse(),q=$.map(he=>{let Ot=eL(N,he.id),jt=Ot>0?` \xB7 used in ${Ot} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${Fe(he.createdAt)}">${Fe(rM(he.createdAt))}${he.source?` \xB7 ${Fe(he.source)}`:""}${jt}</div><pre>${Fe(he.text)}</pre></article>`}).join(""),ye=H.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${H.map(he=>`<li><strong>P${he.priority}</strong> \u2014 ${Fe(he.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your computer.</p></section>`:"";Je(A,await m({title:"Knowledge",activePath:"/knowledge",installVersion:M.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this computer. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${Fe(w)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${_Pe(w,$.length)}
            </section>${ye}${q}`}));return}O==="POST"&&await qe(k),await f(A,"Not found")})().catch(E=>{console.error("[agent-witch-local-app]",E),A.writeHead(500),A.end("Internal error")})}),v=()=>{DS(o,s);try{ll()}catch(A){let E=A instanceof Error?A.message:String(A);console.error(`[agent-witch] writeGlobalTriggers failed: ${E}`)}console.log(`[agent-witch] Local app http://127.0.0.1:${s} (range ${n.start}\u2013${n.end})`);let k=lS();k!==null&&console.warn(k)},x=async()=>{if(c+=1,c>a){i=!0,FS(o),console.error(`[agent-witch] ${$p}`);return}let k=await NC({profileDir:o,range:n});if(!k.ok){i=!0,console.error(`[agent-witch] ${k.reason}`);return}i=!1,s=k.port,P.listen(s,"127.0.0.1",v)};P.on("error",k=>{if(k.code==="EADDRINUSE"){x();return}console.error("[agent-witch] Local app server error:",k)});let D=vj();return P.on("close",()=>{D.stop()}),x(),P},ng=e=>ib(e).publicKeyRaw});var UZ=l(()=>{"use strict"});var lb=l(()=>{"use strict";Sl();fV();zZ();ti();Sl();iP();NS();UZ();HC();$S()});var GZ={};Mt(GZ,{runAgentWitchExternalLiveCli:()=>TPe});var oM,BZ,EPe,TPe,KZ=l(()=>{"use strict";oM=u(require("node:fs")),BZ=u(require("node:path"));vs();ee();zc();BR();Ae();lb();Ae();EPe=e=>{let t=BZ.default.join(e,"link-code.txt");if(!oM.default.existsSync(t))return null;let r=oM.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},TPe=()=>{Dt("agent-witch-live");let e=L(),t=z(),r=EPe(e),o=ng(t);og({layout:t,controllers:{getStatus:()=>{let n=$e(t);return{wsConnected:Nd(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{nk({platform:process.platform,installDir:e,runners:{kickstartLaunchAgents:()=>Ss(e,process.platform),restartSystemdUserService:Ed}}).then(n=>{n.ok||console.warn(`[agent-witch-live] Revive: ${n.message}`)})}}})}});var rn=C((zft,JZ)=>{"use strict";var VZ=["nodebuffer","arraybuffer","fragments"],qZ=typeof Blob<"u";qZ&&VZ.push("blob");JZ.exports={BINARY_TYPES:VZ,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:qZ,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var sg=C((Uft,cb)=>{"use strict";var{EMPTY_BUFFER:CPe}=rn(),nM=Buffer[Symbol.species];function IPe(e,t){if(e.length===0)return CPe;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new nM(r.buffer,r.byteOffset,o):r}function YZ(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function XZ(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function LPe(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function sM(e){if(sM.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new nM(e):ArrayBuffer.isView(e)?t=new nM(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),sM.readOnly=!1),t}cb.exports={concat:IPe,mask:YZ,toArrayBuffer:LPe,toBuffer:sM,unmask:XZ};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");cb.exports.mask=function(t,r,o,n,s){s<48?YZ(t,r,o,n,s):e.mask(t,r,o,n,s)},cb.exports.unmask=function(t,r){t.length<32?XZ(t,r):e.unmask(t,r)}}catch{}});var eQ=C((Bft,QZ)=>{"use strict";var ZZ=Symbol("kDone"),iM=Symbol("kRun"),aM=class{constructor(t){this[ZZ]=()=>{this.pending--,this[iM]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[iM]()}[iM](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[ZZ])}}};QZ.exports=aM});var yc=C((Gft,nQ)=>{"use strict";var ig=require("zlib"),tQ=sg(),vPe=eQ(),{kStatusCode:rQ}=rn(),xPe=Buffer[Symbol.species],WPe=Buffer.from([0,0,255,255]),pb=Symbol("permessage-deflate"),on=Symbol("total-length"),gc=Symbol("callback"),rs=Symbol("buffers"),fc=Symbol("error"),db,lM=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!db){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;db=new vPe(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[gc];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){db.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){db.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?ig.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=ig.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[pb]=this,this._inflate[on]=0,this._inflate[rs]=[],this._inflate.on("error",jPe),this._inflate.on("data",oQ)}this._inflate[gc]=o,this._inflate.write(t),r&&this._inflate.write(WPe),this._inflate.flush(()=>{let s=this._inflate[fc];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=tQ.concat(this._inflate[rs],this._inflate[on]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[on]=0,this._inflate[rs]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?ig.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=ig.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[on]=0,this._deflate[rs]=[],this._deflate.on("data",OPe)}this._deflate[gc]=o,this._deflate.write(t),this._deflate.flush(ig.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=tQ.concat(this._deflate[rs],this._deflate[on]);r&&(s=new xPe(s.buffer,s.byteOffset,s.length-4)),this._deflate[gc]=null,this._deflate[on]=0,this._deflate[rs]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};nQ.exports=lM;function OPe(e){this[rs].push(e),this[on]+=e.length}function oQ(e){if(this[on]+=e.length,this[pb]._maxPayload<1||this[on]<=this[pb]._maxPayload){this[rs].push(e);return}this[fc]=new RangeError("Max payload size exceeded"),this[fc].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[fc][rQ]=1009,this.removeListener("data",oQ),this.reset()}function jPe(e){if(this[pb]._inflate=null,this[fc]){this[gc](this[fc]);return}e[rQ]=1007,this[gc](e)}});var hc=C((Kft,ub)=>{"use strict";var{isUtf8:sQ}=require("buffer"),{hasBlob:MPe}=rn(),NPe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function DPe(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function cM(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function HPe(e){return MPe&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}ub.exports={isBlob:HPe,isValidStatusCode:DPe,isValidUTF8:cM,tokenChars:NPe};if(sQ)ub.exports.isValidUTF8=function(e){return e.length<24?cM(e):sQ(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");ub.exports.isValidUTF8=function(t){return t.length<32?cM(t):e(t)}}catch{}});var gM=C((Vft,uQ)=>{"use strict";var{Writable:FPe}=require("stream"),iQ=yc(),{BINARY_TYPES:$Pe,EMPTY_BUFFER:aQ,kStatusCode:zPe,kWebSocket:UPe}=rn(),{concat:dM,toArrayBuffer:BPe,unmask:GPe}=sg(),{isValidStatusCode:KPe,isValidUTF8:lQ}=hc(),mb=Buffer[Symbol.species],cr=0,cQ=1,dQ=2,pQ=3,pM=4,uM=5,gb=6,mM=class extends FPe{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||$Pe[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[UPe]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=cr}_write(t,r,o){if(this._opcode===8&&this._state==cr)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new mb(o.buffer,o.byteOffset+t,o.length-t),new mb(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new mb(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case cr:this.getInfo(t);break;case cQ:this.getPayloadLength16(t);break;case dQ:this.getPayloadLength64(t);break;case pQ:this.getMask();break;case pM:this.getData(t);break;case uM:case gb:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[iQ.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=cQ:this._payloadLength===127?this._state=dQ:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=pQ:this._state=pM}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=pM}getData(t){let r=aQ;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&GPe(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=uM,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[iQ.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===cr&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=cr;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=dM(o,r):this._binaryType==="arraybuffer"?n=BPe(dM(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=cr):(this._state=gb,setImmediate(()=>{this.emit("message",n,!0),this._state=cr,this.startLoop(t)}))}else{let n=dM(o,r);if(!this._skipUTF8Validation&&!lQ(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===uM||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=cr):(this._state=gb,setImmediate(()=>{this.emit("message",n,!1),this._state=cr,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,aQ),this.end();else{let o=t.readUInt16BE(0);if(!KPe(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new mb(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!lQ(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=cr;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=cr):(this._state=gb,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=cr,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[zPe]=n,i}};uQ.exports=mM});var hM=C((Jft,fQ)=>{"use strict";var{Duplex:qft}=require("stream"),{randomFillSync:VPe}=require("crypto"),{types:{isUint8Array:qPe}}=require("util"),mQ=yc(),{EMPTY_BUFFER:JPe,kWebSocket:YPe,NOOP:XPe}=rn(),{isBlob:Sc,isValidStatusCode:ZPe}=hc(),{mask:gQ,toBuffer:Ji}=sg(),dr=Symbol("kByteLength"),QPe=Buffer.alloc(4),fb=8*1024,Yi,Pc=fb,Dr=0,eAe=1,tAe=2,fM=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Dr,this.onerror=XPe,this[YPe]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||QPe,r.generateMask?r.generateMask(o):(Pc===fb&&(Yi===void 0&&(Yi=Buffer.alloc(fb)),VPe(Yi,0,fb),Pc=0),o[0]=Yi[Pc++],o[1]=Yi[Pc++],o[2]=Yi[Pc++],o[3]=Yi[Pc++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[dr]!==void 0?a=r[dr]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(gQ(t,o,d,s,a),[d]):(gQ(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=JPe;else{if(typeof t!="number"||!ZPe(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(qPe(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[dr]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Dr?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Sc(t)?(n=t.size,s=!1):(t=Ji(t),n=t.length,s=Ji.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[dr]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Sc(t)?this._state!==Dr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Dr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):Sc(t)?(n=t.size,s=!1):(t=Ji(t),n=t.length,s=Ji.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[dr]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Sc(t)?this._state!==Dr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Dr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[mQ.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):Sc(t)?(a=t.size,c=!1):(t=Ji(t),a=t.length,c=Ji.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[dr]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};Sc(t)?this._state!==Dr?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Dr?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[dr],this._state=tAe,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(yM,this,a,n);return}this._bufferedBytes-=o[dr];let i=Ji(s);r?this.dispatch(i,r,o,n):(this._state=Dr,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(rAe,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[mQ.extensionName];this._bufferedBytes+=o[dr],this._state=eAe,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");yM(this,c,n);return}this._bufferedBytes-=o[dr],this._state=Dr,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===Dr&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][dr],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][dr],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};fQ.exports=fM;function yM(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function rAe(e,t,r){yM(e,t,r),e.onerror(t)}});var RQ=C((Yft,kQ)=>{"use strict";var{kForOnEventAttribute:ag,kListener:SM}=rn(),yQ=Symbol("kCode"),hQ=Symbol("kData"),SQ=Symbol("kError"),PQ=Symbol("kMessage"),AQ=Symbol("kReason"),Ac=Symbol("kTarget"),_Q=Symbol("kType"),bQ=Symbol("kWasClean"),nn=class{constructor(t){this[Ac]=null,this[_Q]=t}get target(){return this[Ac]}get type(){return this[_Q]}};Object.defineProperty(nn.prototype,"target",{enumerable:!0});Object.defineProperty(nn.prototype,"type",{enumerable:!0});var Xi=class extends nn{constructor(t,r={}){super(t),this[yQ]=r.code===void 0?0:r.code,this[AQ]=r.reason===void 0?"":r.reason,this[bQ]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[yQ]}get reason(){return this[AQ]}get wasClean(){return this[bQ]}};Object.defineProperty(Xi.prototype,"code",{enumerable:!0});Object.defineProperty(Xi.prototype,"reason",{enumerable:!0});Object.defineProperty(Xi.prototype,"wasClean",{enumerable:!0});var _c=class extends nn{constructor(t,r={}){super(t),this[SQ]=r.error===void 0?null:r.error,this[PQ]=r.message===void 0?"":r.message}get error(){return this[SQ]}get message(){return this[PQ]}};Object.defineProperty(_c.prototype,"error",{enumerable:!0});Object.defineProperty(_c.prototype,"message",{enumerable:!0});var lg=class extends nn{constructor(t,r={}){super(t),this[hQ]=r.data===void 0?null:r.data}get data(){return this[hQ]}};Object.defineProperty(lg.prototype,"data",{enumerable:!0});var oAe={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[ag]&&n[SM]===t&&!n[ag])return;let o;if(e==="message")o=function(s,i){let a=new lg("message",{data:i?s:s.toString()});a[Ac]=this,yb(t,this,a)};else if(e==="close")o=function(s,i){let a=new Xi("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Ac]=this,yb(t,this,a)};else if(e==="error")o=function(s){let i=new _c("error",{error:s,message:s.message});i[Ac]=this,yb(t,this,i)};else if(e==="open")o=function(){let s=new nn("open");s[Ac]=this,yb(t,this,s)};else return;o[ag]=!!r[ag],o[SM]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[SM]===t&&!r[ag]){this.removeListener(e,r);break}}};kQ.exports={CloseEvent:Xi,ErrorEvent:_c,Event:nn,EventTarget:oAe,MessageEvent:lg};function yb(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var hb=C((Xft,wQ)=>{"use strict";var{tokenChars:cg}=hc();function fo(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function nAe(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(p===-1&&cg[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let y=e.slice(c,p);d===44?(fo(t,y,r),r=Object.create(null)):i=y,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(p===-1&&cg[d]===1)c===-1&&(c=m);else if(d===32||d===9)p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m),fo(r,e.slice(c,p),!0),d===44&&(fo(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,m),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(cg[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(cg[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,p=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(p===-1&&cg[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))p===-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let y=e.slice(c,p);o&&(y=y.replace(/\\/g,""),o=!1),fo(r,a,y),d===44&&(fo(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=m);let g=e.slice(c,p);return i===void 0?fo(t,g,r):(a===void 0?fo(r,g,!0):o?fo(r,a,g.replace(/\\/g,"")):fo(r,a,g),fo(t,i,r)),t}function sAe(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}wQ.exports={format:sAe,parse:nAe}});var _b=C((eyt,NQ)=>{"use strict";var iAe=require("events"),aAe=require("https"),lAe=require("http"),CQ=require("net"),cAe=require("tls"),{randomBytes:dAe,createHash:pAe}=require("crypto"),{Duplex:Zft,Readable:Qft}=require("stream"),{URL:PM}=require("url"),os=yc(),uAe=gM(),mAe=hM(),{isBlob:gAe}=hc(),{BINARY_TYPES:EQ,CLOSE_TIMEOUT:fAe,EMPTY_BUFFER:Sb,GUID:yAe,kForOnEventAttribute:AM,kListener:hAe,kStatusCode:SAe,kWebSocket:Ye,NOOP:IQ}=rn(),{EventTarget:{addEventListener:PAe,removeEventListener:AAe}}=RQ(),{format:_Ae,parse:bAe}=hb(),{toBuffer:kAe}=sg(),LQ=Symbol("kAborted"),_M=[8,13],sn=["CONNECTING","OPEN","CLOSING","CLOSED"],RAe=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,Pe=class e extends iAe{constructor(t,r,o){super(),this._binaryType=EQ[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Sb,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),vQ(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){EQ.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new uAe({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new mAe(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[Ye]=this,s[Ye]=this,t[Ye]=this,n.on("conclude",TAe),n.on("drain",CAe),n.on("error",IAe),n.on("message",LAe),n.on("ping",vAe),n.on("pong",xAe),s.onerror=WAe,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",OQ),t.on("data",Ab),t.on("end",jQ),t.on("error",MQ),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[os.extensionName]&&this._extensions[os.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){qt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,WQ(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){bM(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||Sb,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){bM(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||Sb,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){bM(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[os.extensionName]||(n.compress=!1),this._sender.send(t||Sb,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){qt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(Pe,"CONNECTING",{enumerable:!0,value:sn.indexOf("CONNECTING")});Object.defineProperty(Pe.prototype,"CONNECTING",{enumerable:!0,value:sn.indexOf("CONNECTING")});Object.defineProperty(Pe,"OPEN",{enumerable:!0,value:sn.indexOf("OPEN")});Object.defineProperty(Pe.prototype,"OPEN",{enumerable:!0,value:sn.indexOf("OPEN")});Object.defineProperty(Pe,"CLOSING",{enumerable:!0,value:sn.indexOf("CLOSING")});Object.defineProperty(Pe.prototype,"CLOSING",{enumerable:!0,value:sn.indexOf("CLOSING")});Object.defineProperty(Pe,"CLOSED",{enumerable:!0,value:sn.indexOf("CLOSED")});Object.defineProperty(Pe.prototype,"CLOSED",{enumerable:!0,value:sn.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(Pe.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(Pe.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[AM])return t[hAe];return null},set(t){for(let r of this.listeners(e))if(r[AM]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[AM]:!0})}})});Pe.prototype.addEventListener=PAe;Pe.prototype.removeEventListener=AAe;NQ.exports=Pe;function vQ(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:fAe,protocolVersion:_M[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!_M.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${_M.join(", ")})`);let s;if(t instanceof PM)s=t;else try{s=new PM(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let S=new SyntaxError(c);if(e._redirects===0)throw S;Pb(e,S);return}let d=i?443:80,p=dAe(16).toString("base64"),m=i?aAe.request:lAe.request,g=new Set,y;if(n.createConnection=n.createConnection||(i?EAe:wAe),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(y=new os({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=_Ae({[os.extensionName]:y.offer()})),r.length){for(let S of r){if(typeof S!="string"||!RAe.test(S)||g.has(S))throw new SyntaxError("An invalid or duplicated subprotocol was specified");g.add(S)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let S=n.path.split(":");n.socketPath=S[0],n.path=S[1]}let h;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let S=o&&o.headers;if(o={...o,headers:{}},S)for(let[T,f]of Object.entries(S))o.headers[T.toLowerCase()]=f}else if(e.listenerCount("redirect")===0){let S=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!S||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,S||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),h=e._req=m(n),e._redirects&&e.emit("redirect",e.url,h)}else h=e._req=m(n);n.timeout&&h.on("timeout",()=>{qt(e,h,"Opening handshake has timed out")}),h.on("error",S=>{h===null||h[LQ]||(h=e._req=null,Pb(e,S))}),h.on("response",S=>{let T=S.headers.location,f=S.statusCode;if(T&&n.followRedirects&&f>=300&&f<400){if(++e._redirects>n.maxRedirects){qt(e,h,"Maximum redirects exceeded");return}h.abort();let b;try{b=new PM(T,t)}catch{let P=new SyntaxError(`Invalid URL: ${T}`);Pb(e,P);return}vQ(e,b,r,o)}else e.emit("unexpected-response",h,S)||qt(e,h,`Unexpected server response: ${S.statusCode}`)}),h.on("upgrade",(S,T,f)=>{if(e.emit("upgrade",S),e.readyState!==Pe.CONNECTING)return;h=e._req=null;let b=S.headers.upgrade;if(b===void 0||b.toLowerCase()!=="websocket"){qt(e,T,"Invalid Upgrade header");return}let I=pAe("sha1").update(p+yAe).digest("base64");if(S.headers["sec-websocket-accept"]!==I){qt(e,T,"Invalid Sec-WebSocket-Accept header");return}let P=S.headers["sec-websocket-protocol"],v;if(P!==void 0?g.size?g.has(P)||(v="Server sent an invalid subprotocol"):v="Server sent a subprotocol but none was requested":g.size&&(v="Server sent no subprotocol"),v){qt(e,T,v);return}P&&(e._protocol=P);let x=S.headers["sec-websocket-extensions"];if(x!==void 0){if(!y){qt(e,T,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let D;try{D=bAe(x)}catch{qt(e,T,"Invalid Sec-WebSocket-Extensions header");return}let k=Object.keys(D);if(k.length!==1||k[0]!==os.extensionName){qt(e,T,"Server indicated an extension that was not requested");return}try{y.accept(D[os.extensionName])}catch{qt(e,T,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[os.extensionName]=y}e.setSocket(T,f,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(h,e):h.end()}function Pb(e,t){e._readyState=Pe.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function wAe(e){return e.path=e.socketPath,CQ.connect(e)}function EAe(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=CQ.isIP(e.host)?"":e.host),cAe.connect(e)}function qt(e,t,r){e._readyState=Pe.CLOSING;let o=new Error(r);Error.captureStackTrace(o,qt),t.setHeader?(t[LQ]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(Pb,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function bM(e,t,r){if(t){let o=gAe(t)?t.size:kAe(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${sn[e.readyState]})`);process.nextTick(r,o)}}function TAe(e,t){let r=this[Ye];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[Ye]!==void 0&&(r._socket.removeListener("data",Ab),process.nextTick(xQ,r._socket),e===1005?r.close():r.close(e,t))}function CAe(){let e=this[Ye];e.isPaused||e._socket.resume()}function IAe(e){let t=this[Ye];t._socket[Ye]!==void 0&&(t._socket.removeListener("data",Ab),process.nextTick(xQ,t._socket),t.close(e[SAe])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function TQ(){this[Ye].emitClose()}function LAe(e,t){this[Ye].emit("message",e,t)}function vAe(e){let t=this[Ye];t._autoPong&&t.pong(e,!this._isServer,IQ),t.emit("ping",e)}function xAe(e){this[Ye].emit("pong",e)}function xQ(e){e.resume()}function WAe(e){let t=this[Ye];t.readyState!==Pe.CLOSED&&(t.readyState===Pe.OPEN&&(t._readyState=Pe.CLOSING,WQ(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function WQ(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function OQ(){let e=this[Ye];if(this.removeListener("close",OQ),this.removeListener("data",Ab),this.removeListener("end",jQ),e._readyState=Pe.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[Ye]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",TQ),e._receiver.on("finish",TQ))}function Ab(e){this[Ye]._receiver.write(e)||this.pause()}function jQ(){let e=this[Ye];e._readyState=Pe.CLOSING,e._receiver.end(),this.end()}function MQ(){let e=this[Ye];this.removeListener("error",MQ),this.on("error",IQ),e&&(e._readyState=Pe.CLOSING,this.destroy())}});var $Q=C((ryt,FQ)=>{"use strict";var tyt=_b(),{Duplex:OAe}=require("stream");function DQ(e){e.emit("close")}function jAe(){!this.destroyed&&this._writableState.finished&&this.destroy()}function HQ(e){this.removeListener("error",HQ),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function MAe(e,t){let r=!0,o=new OAe({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(DQ,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(DQ,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",jAe),o.on("error",HQ),o}FQ.exports=MAe});var kM=C((oyt,zQ)=>{"use strict";var{tokenChars:NAe}=hc();function DAe(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&NAe[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}zQ.exports={parse:DAe}});var JQ=C((syt,qQ)=>{"use strict";var HAe=require("events"),bb=require("http"),{Duplex:nyt}=require("stream"),{createHash:FAe}=require("crypto"),UQ=hb(),Zi=yc(),$Ae=kM(),zAe=_b(),{CLOSE_TIMEOUT:UAe,GUID:BAe,kWebSocket:GAe}=rn(),KAe=/^[+/0-9A-Za-z]{22}==$/,BQ=0,GQ=1,VQ=2,RM=class extends HAe{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:UAe,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:zAe,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=bb.createServer((o,n)=>{let s=bb.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=VAe(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=BQ}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===VQ){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(dg,this);return}if(t&&this.once("close",t),this._state!==GQ)if(this._state=GQ,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(dg,this):process.nextTick(dg,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{dg(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",KQ);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Qi(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Qi(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!KAe.test(s)){Qi(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Qi(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){pg(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=$Ae.parse(c)}catch{Qi(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&p!==void 0){let g=new Zi({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=UQ.parse(p);y[Zi.extensionName]&&(g.accept(y[Zi.extensionName]),m[Zi.extensionName]=g)}catch{Qi(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let g={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(g,(y,h,S,T)=>{if(!y)return pg(r,h||401,S,T);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(g))return pg(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[GAe])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>BQ)return pg(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${FAe("sha1").update(r+BAe).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),p._protocol=m)}if(t[Zi.extensionName]){let m=t[Zi.extensionName].params,g=UQ.format({[Zi.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${g}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",KQ),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(dg,this)})),a(p,n)}};qQ.exports=RM;function VAe(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function dg(e){e._state=VQ,e.emit("close")}function KQ(){this.destroy()}function pg(e,t,r,o){r=r||bb.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${bb.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Qi(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Qi),e.emit("wsClientError",i,r,t)}else pg(r,o,n,s)}});var qAe,JAe,YAe,XAe,ZAe,QAe,YQ,e_e,bc,XQ=l(()=>{qAe=u($Q(),1),JAe=u(hb(),1),YAe=u(yc(),1),XAe=u(gM(),1),ZAe=u(hM(),1),QAe=u(kM(),1),YQ=u(_b(),1),e_e=u(JQ(),1),bc=YQ.default});var wM,ZQ=l(()=>{"use strict";wM=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var t_e,EM,QQ=l(()=>{"use strict";wy();ZQ();t_e=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",EM=(e={})=>{let t=e.env??process.env,r=wM(t[ky]),o=wM(t[Ry]);return{mode:t_e(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var eee=l(()=>{"use strict";wy()});var tee=l(()=>{"use strict";QQ();eee()});var r_e,ree,oee=l(()=>{"use strict";se();_t();St();r_e={isPaused:Ro,loadFolders:fC,resolveFolder:gC},ree=async(e,t=r_e)=>{if(t.isPaused(e.config.layout.configPath))return{ok:!1,code:ue.CODING_TOOLS_PAUSED};if(e.requestedFolderPath===null)return{ok:!1,code:ue.FOLDER_REQUIRED};let r=await t.loadFolders({wsUrl:e.config.wsUrl,pairingToken:e.config.pairingToken});return t.resolveFolder({...e.projectId!==void 0?{projectId:e.projectId}:{},requestedFolderPath:e.requestedFolderPath,registeredFolders:r,managedProjectsDir:e.config.layout.projectsDir,defaultFolderPath:e.defaultFolderPath})}});var TM=l(()=>{"use strict"});var kc,ea,nee,n_e,CM,IM,see,iee,LM,aee,ug,vM=l(()=>{"use strict";kc=u(require("node:fs")),ea=u(require("node:os")),nee=u(require("node:path"));TM();Ca();n_e=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),CM=(e=ea.default.hostname())=>nee.default.join(ea.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),IM=e=>{if(!kc.default.existsSync(e))return null;try{let t=JSON.parse(kc.default.readFileSync(e,"utf8"));return!n_e(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},see=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},iee=(e,t)=>{kc.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},LM=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??CM(),o=IM(r);if(o!==null&&o.pid!==process.pid&&Xt(o.pid)&&see(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:ea.default.hostname(),macOsUsername:ea.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return iee(r,n),{ok:!0}},aee=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??CM(),o=IM(r);return o!==null&&o.pid!==process.pid&&Xt(o.pid)&&see(o)?{ok:!1}:(iee(r,{hostname:ea.default.hostname(),macOsUsername:ea.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ug=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??CM();IM(r)?.pid===process.pid&&kc.default.existsSync(r)&&kc.default.unlinkSync(r)}});var xM,mg,s_e,i_e,a_e,l_e,WM,lee=l(()=>{"use strict";xM=require("node:child_process"),mg=u(require("node:path"));Ca();ly();s_e=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),i_e=(e,t)=>{if(s_e(e)||!/\bnode\b/.test(e))return!1;let r=mg.default.resolve(t),o=mg.default.join(r,"app",dd),n=mg.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===dd||i==="agent-witch.ts")return e.includes(r);try{let a=mg.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},a_e=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,xM.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},l_e=(e,t,r)=>{let o=a_e(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||i_e(d,t)&&n.push(c)}return n},WM=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,xM.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=l_e(r,e.installDir,t),n=[];for(let s of o)if(Xt(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var gg,fg,cee,c_e,OM,dee=l(()=>{"use strict";gg=u(require("node:fs")),fg=u(require("node:path"));ct();cee=(e,t)=>{!gg.default.existsSync(e)||gg.default.existsSync(t)||(gg.default.mkdirSync(fg.default.dirname(t),{recursive:!0}),gg.default.renameSync(e,t))},c_e=e=>{if(e.profileEmail===null)return;let t=fg.default.join(e.installDir,ur);cee(fg.default.join(t,is),e.mainLogPath),cee(fg.default.join(t,as),e.errorLogPath)},OM=e=>{let t=z();e!==void 0&&t.installDir!==e||c_e(t)}});var pee=l(()=>{"use strict";Jp();oP();oP();!Ht()&&_s(__agentWitchImportMetaUrl)&&(async()=>{Dt("agent-witch-wake-server");let e=await si(),t=_o(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var uee=l(()=>{"use strict";pee()});var mee=l(()=>{"use strict";Mp()});var jM,gee=l(()=>{"use strict";TM();uee();vM();mee();jM=async(e={})=>{let t=e.skipInProcessBridge?null:await rP();xS();let r=setInterval(()=>{xS()},6e4),o=setInterval(()=>{if(!aee().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var yg,kb,u_e,fee,yee,Rb,hee,See,MM,Pee,wb,Aee=l(()=>{"use strict";yg=u(require("node:fs")),kb=u(require("node:path")),u_e="pending-run-inputs.json",fee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yee=e=>{let t=e.profileEmail?kb.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return kb.default.join(t,u_e)},Rb=e=>{let t=yee(e);if(!yg.default.existsSync(t))return{};try{let r=JSON.parse(yg.default.readFileSync(t,"utf8"));return fee(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!fee(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},hee=(e,t)=>{let r=yee(e);yg.default.mkdirSync(kb.default.dirname(r),{recursive:!0}),yg.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},See=e=>Object.values(Rb(e)),MM=(e,t)=>Rb(e)[t]!==void 0,Pee=(e,t)=>{let r=Rb(e);r[t.agentRunId]=t,hee(e,r)},wb=(e,t)=>{let r=Rb(e);delete r[t],hee(e,r)}});var Eb=l(()=>{"use strict";se()});var _ee=l(()=>{"use strict";se()});var Tb=l(()=>{"use strict";se()});var Cb=l(()=>{"use strict";se()});var hg=l(()=>{"use strict";se()});var m_e,g_e,Sg,NM=l(()=>{"use strict";Sr();Eb();_ee();Tb();Cb();hg();m_e={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},g_e={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Sg=e=>{if(!Ne(e.writerAgent))return"the selected writer";let t=Ft(e.writerAgent);if(dt(e.writerExecutionBackend)==="api"&&t!==null){let r=Et(rt(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Bd(t,r.model);return`${g_e[t]} model ${o}`}}return m_e[e.writerAgent]}});var f_e,y_e,bee,kee,Ree=l(()=>{"use strict";f_e=/"input_tokens"\s*:\s*(\d+)/,y_e=/"output_tokens"\s*:\s*(\d+)/,bee=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},kee=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=bee(f_e.exec(t)),o=bee(y_e.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var Ib=l(()=>{"use strict";_t()});var ns,Pg,h_e,Tee,HM,DM,Cee,S_e,Iee,FM,Lee,wee,vee,P_e,Eee,$M,xee=l(()=>{"use strict";ns=u(require("node:fs")),Pg=u(require("node:path"));St();se();Ib();h_e="run-completion-outbox.json",Tee="run-completion-posted.json",HM=(e,t)=>{let r=e.profileEmail?Pg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return Pg.default.join(r,t)},DM=e=>HM(e,h_e),Cee=e=>{try{let t=JSON.parse(ns.default.readFileSync(HM(e,Tee),"utf8"));return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]}catch{return[]}},S_e=(e,t)=>{let r=HM(e,Tee);ns.default.mkdirSync(Pg.default.dirname(r),{recursive:!0}),ns.default.writeFileSync(r,JSON.stringify(nh(Cee(e),t)),"utf8")},Iee=(e,t)=>Cee(e).includes(t),FM=e=>{let t=DM(e);if(!ns.default.existsSync(t))return[];try{let r=JSON.parse(ns.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},Lee=(e,t)=>{ns.default.mkdirSync(Pg.default.dirname(DM(e)),{recursive:!0}),ns.default.writeFileSync(DM(e),JSON.stringify(t,null,2),"utf8")},wee=(e,t)=>{Lee(e,FM(e).filter(r=>r.runId!==t))},vee=(e,t)=>{if(Iee(e,t.runId))return;let r={...t,output:Hd(t.output,Na("secretHidden"))},o=[...FM(e).filter(n=>n.runId!==t.runId),r];Lee(e,o)},P_e=async e=>{for(let t of FM(e.layout)){if(Iee(e.layout,t.runId)){wee(e.layout,t.runId);continue}await kp(e.cloudApi,t.runId,t.exitCode,t.output,{estimateSeconds:t.estimateSeconds,actualSeconds:t.actualSeconds})&&(S_e(e.layout,t.runId),wee(e.layout,t.runId))}},Eee={chain:Promise.resolve()},$M=e=>{let t=e.cloudApi;if(t===null)return Promise.resolve();let r=Eee.chain.then(()=>P_e({layout:e.layout,cloudApi:t}));return Eee.chain=r.catch(()=>{}),r}});var Wee=l(()=>{"use strict"});var zM,Ag,__e,ta,Oee=l(()=>{"use strict";se();Wee();zM=new Map,Ag=e=>{let t=zM.get(e);t!==void 0&&(clearInterval(t),zM.delete(e))},__e=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify(Hs({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}})))},ta=(e,t,r,o={})=>{Ag(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Ag(t);return}let i=o.onTick?.()??{};__e(e,t,n,i)};s(),zM.set(t,setInterval(s,15e3))}});var jee=l(()=>{"use strict";_t()});var Mee,Nee=l(()=>{"use strict";jee();Mee=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:De(t)}});var UM,_g,an,BM,yo,Dee,Lb=l(()=>{"use strict";UM=new Set,_g=new Map,an=(e,t)=>{if(t.length===0)return;let r=_g.get(e)??[];r.push(t),_g.set(e,r)},BM=e=>{UM.add(e);let t=_g.get(e)??[];return _g.delete(e),t},yo=e=>UM.has(e),Dee=e=>{UM.delete(e),_g.delete(e)}});var Hee,Fee=l(()=>{"use strict";Hee=e=>e==null||!Number.isFinite(e)||e<=0?null:{limitSeconds:Math.floor(e)}});var $ee,GM,vb,zee,bg,b_e,Uee,k_e,Bee,KM=l(()=>{"use strict";Fee();Fy();$ee=Hee(Fd.maxMinutes*60)??{limitSeconds:1800},GM=5e3,vb=new Map,zee=(e,t,r=$ee)=>{bg(e);let o=setTimeout(()=>{vb.delete(e),t()},r.limitSeconds*1e3);o.unref?.(),vb.set(e,o)},bg=e=>{let t=vb.get(e);t!==void 0&&(clearTimeout(t),vb.delete(e))},b_e=(e=$ee)=>`You've hit your session limit on this computer: the run was stopped after ${Math.round(e.limitSeconds/60)} minutes.`,Uee=e=>{let t=b_e(),r=e.trim();return r.length>0?`${r}

${t}`:t},k_e=e=>e.exitCode===null&&e.signalCode===null,Bee=(e,t=GM)=>{let r=n=>{let s=e.pid;if(typeof s=="number"&&process.platform!=="win32")try{process.kill(-s,n);return}catch{}try{e.kill(n)}catch{}};r("SIGTERM"),setTimeout(()=>{k_e(e)&&r("SIGKILL")},t).unref?.()}});var Rc,Gee,Kee,Vee=l(()=>{"use strict";Rc=u(require("node:path")),Gee=require("node:url");As();Kee=()=>{if(Ht()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Rc.default.dirname(Rc.default.resolve(e)):Rc.default.dirname(Rc.default.resolve(__filename))}return Rc.default.dirname((0,Gee.fileURLToPath)(__agentWitchImportMetaUrl))}});var qee,Jee,Yee,Xee,Wt,wc,Zee,Qee,Ec,VM,qM,JM,ete,YM,tte,xb=l(()=>{"use strict";qee=require("node:crypto"),Jee=u(require("node:fs")),Yee=u(require("node:path")),Xee=require("node:url");Ca();KM();As();Vee();Wt=new Map,Zee=async()=>{if(wc!==void 0)return wc;try{if(Ht()){let e=Kee(),t=Yee.default.join(e,"deps","node-pty","lib","index.js");if(Jee.default.existsSync(t)){let r=await import((0,Xee.pathToFileURL)(t).href);return wc=r,r}}return wc=await import("node-pty"),wc}catch{return wc=null,null}},Qee=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Ec=(e,t,r)=>{let o=Wt.get(e);if(o!==void 0){Wt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},VM=(e,t)=>{let r=Wt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},qM=(e,t,r)=>{let o=Wt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},JM=e=>{for(let t of Wt.values())if(!(t.mode!=="agent"||t.runId!==e))return Xt(t.pty.pid);return!1},ete=e=>{for(let[t,r]of Wt.entries()){if(r.mode!=="agent"||r.runId!==e)continue;Wt.delete(t);let o=r.pty.pid;try{r.pty.kill()}catch{}return setTimeout(()=>{if(Xt(o))try{process.kill(o,"SIGKILL")}catch{}},GM).unref(),!0}return!1},YM=async e=>{let t=await Zee();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this computer. Install AgentWitch deps again.\r
`},requestId:e.requestId}),!1;Wt.get(e.shellSessionId)!==void 0&&Ec(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Wt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{Qee(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Wt.get(e.shellSessionId)?.pty===n&&(Wt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},tte=async e=>{let t=e.shellSessionId??(0,qee.randomUUID)(),r=await Zee();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Wt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{Qee(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Wt.get(t)?.pty===o&&(Wt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Wb,rte,ote=l(()=>{"use strict";Wb="[[AWAITING_INPUT]]",rte=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Wb,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var kg,nte,Ob=l(()=>{"use strict";ote();kg=e=>{let t=e.indexOf(Wb);if(t<0)return null;let o=e.slice(t+Wb.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},nte=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",rte].join(`
`)});var ste,ite=l(()=>{"use strict";Lb();xb();Ob();ste=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(yo(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}an(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await tte({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=kg(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var lte,cte,dte,ate,ln,jb=l(()=>{"use strict";lte=require("node:child_process"),cte=u(require("node:fs")),dte=u(require("node:path"));ly();ate=12e4,ln=(e,t)=>{let r=dte.default.join(e,"app",xF,"ensure-writer.sh");return cte.default.existsSync(r)?new Promise((o,n)=>{let s=(0,lte.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(ate/1e3)}s`))},ate);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var pte,ra,wg,Mb,XM,Rg,Nb,Db,ZM,QM,R_e,Tc,w_e,E_e,eN,tN=l(()=>{"use strict";pte=require("node:child_process");Sr();jb();Tb();Eb();hg();Cb();ra=new Map,wg=e=>e==="cursor"||e==="antigravity",Mb=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",XM=e=>ra.get(e)?.warmed===!0,Rg=e=>{let t=ra.get(e);ra.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},Nb=e=>ra.get(e)?.conversationStarted===!0,Db=e=>{let t=ra.get(e);ra.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},ZM=e=>{ra.delete(e)},QM=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",R_e={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Tc=e=>`${R_e[e]} is ready on your computer.
Send a task from the box below when you are ready.
`,w_e=(e,t,r,o)=>new Promise(n=>{let s=zy(t,r),i=[],a=(0,pte.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),E_e=(e,t)=>{let r=Tc(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},eN=async e=>{if(!Ne(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&dt(e.runConfig.writerExecutionBackend)==="api"){let r=Ft(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=rt(e.runConfig.layout.configPath);return Et(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this computer (no local CLI).
`),Rg(e.writerAgent),{exitCode:0,output:Tc(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your computer\u2026
`),await ln(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}wg(e.writerAgent)&&Rg(e.writerAgent);let t=await w_e(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?E_e(e.writerAgent,t.output):Tc(e.writerAgent)}}});var Cc,ute=l(()=>{"use strict";Cc={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var mte,gte=l(()=>{"use strict";mte="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var fte,yte=l(()=>{"use strict";St();gte();fte=e=>e.code===xs.SESSION_LIMIT?mte:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var T_e,hte,C_e,I_e,Ste,L_e,Pte,Ate=l(()=>{"use strict";T_e=/\bauto-?denied\b/i,hte=/\bno output produced\b/i,C_e=/headless mode cannot prompt for.*\bcommand\b.*permission/i,I_e=/\bpermissions\.allow\b/i,Ste=/\bjetski:\s*no output produced\b/i,L_e=e=>{let t=e.trim();return t.length===0?!1:Ste.test(t)||hte.test(t)&&(T_e.test(t)||C_e.test(t)||I_e.test(t))},Pte=e=>{if(L_e(e)){let t=e.split(/\r?\n/).map(r=>r.trim()).find(r=>r.length>0&&(Ste.test(r)||hte.test(r)))??e.trim();return t.length>0?t:"Antigravity headless run auto-denied a tool that needs command permission."}return null}});var _te,bte=l(()=>{"use strict";St();ute();yte();Ate();_te=e=>{let t=cw(e.output);if(t!==null)return{status:Cc.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:fte(t)};let r=Pte(e.output);return r!==null?{status:Cc.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:null,denialReason:r}:e.exitCode===0&&e.output.trim().length===0?{status:Cc.FAILED,resultExitCode:1,resultOutcomeCode:null,denialReason:"No agent output was captured."}:{status:e.exitCode===0?Cc.COMPLETED:Cc.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var rN,cSt,kte=l(()=>{"use strict";rN={OPEN:"open",APPROVAL:"approval"},cSt=rN.APPROVAL});var ho,Eg=l(()=>{"use strict";ho=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Ic,Hb,Rte,v_e,wte,Ete,Tte,Lc,oN,nN=l(()=>{"use strict";Ic=u(require("node:fs")),Hb=u(require("node:path")),Rte="runs",v_e=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wte=e=>{let t=e.profileEmail!==null?Hb.default.join(e.installDir,"profiles",e.profileEmail,Rte):Hb.default.join(e.installDir,Rte);return Ic.default.mkdirSync(t,{recursive:!0}),t},Ete=(e,t)=>Hb.default.join(wte(e),`${t}.json`),Tte=(e,t)=>{Ic.default.writeFileSync(Ete(e,t.id),JSON.stringify(t,null,2))},Lc=(e,t)=>{let r=Ete(e,t);if(!Ic.default.existsSync(r))return null;try{let o=JSON.parse(Ic.default.readFileSync(r,"utf8"));return!v_e(o)||typeof o.id!="string"?null:o}catch{return null}},oN=e=>{let t=wte(e),r=Ic.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Lc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var x_e,Cte,Ite=l(()=>{"use strict";nb();bte();kte();Eg();nN();x_e=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=_te({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:rN.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},Cte=(e,t)=>{let r=x_e(t);Tte(e,r);let o=t.projectId?.trim()??"";if(o.length>0){let n=ho(t.originalPrompt);tg({projectId:o,taskId:t.agentRunId,agentRunId:t.agentRunId,status:r.status,promptSummary:n,resultSummary:t.output,createdAt:r.createdAt,completedAt:r.completedAt,writerAgent:t.writerAgent??null,threadKey:null})}return r}});var Lte=l(()=>{"use strict";c_()});var vte,xte=l(()=>{"use strict";St();vte=()=>[Dy,`agentRunWriterExecutionBackend=${Hy}`,`agentRunWriterExecutionReasonCode=${dw}`].join(`
`)});var sN,W_e,O_e,Wte,Ote=l(()=>{"use strict";sN=e=>e.toLocaleString("en-US"),W_e=e=>e<.01?e.toFixed(4):e.toFixed(3),O_e=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${W_e(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${sN(e.inputTokens)} in / ${sN(e.outputTokens)} out (${sN(e.totalTokens)} total)`,t].join(`
`)},Wte=(e,t)=>{if(t===void 0)return e;let r=O_e(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var jte=l(()=>{"use strict";se()});var Dte,Tg,Ce,Fb,iN,$b,Mte,Nte,j_e,M_e,Hte,Fte,$te,Cg,aN,lN,cN,zte,N_e,pr,Ig,cn,Ute,D_e,H_e,zb,dN,pN,Lg,F_e,uN,Bte=l(()=>{"use strict";Dte=require("node:child_process");se();St();Sr();xw();Aee();fm();NM();Ree();Ud();xee();Ib();Oee();Ca();Nee();Lb();xb();Ob();ite();KM();Fy();tN();Ite();Lte();xte();Eg();Ote();Ia();jte();hg();fd();Ob();Tg=new Map,Ce=new Map,Fb=new Set,iN=new Set,$b=new Map,Mte=rp(),Nte=e=>{e!==void 0&&!$b.has(e)&&$b.set(e,Date.now())},j_e=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(yo(t)){pr(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}an(t,n)},M_e=(e,t,r,o,n)=>{if(!Qw(e,n))return;let s=`${vte()}
`;j_e(t,r,o,s);let i=Ce.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},Hte=130,Fte=`

Stopped by user.`,$te=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:ho(e)},Cg=null,aN=e=>{Cg=e},lN=(e,t)=>{if(Cg===null)return;let r=oW(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||tT(Cg,t,r)},cN=async e=>{await $M({layout:e,cloudApi:Cg})},zte=e=>{let t=Tg.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Xt(t.pid)},N_e=e=>Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),pr=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(Hs(t)))},Ig=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=Sa(s),c=Ce.get(r);if(a!==null&&c!==void 0){let d=zF(a),p=zte(r)||JM(r);d!==null&&!p&&cn(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return $F(a)}}),cn=(e,t,r,o,n,s,i,a,c)=>{if(r!==void 0){if(Mte.has(r))return;Mte.add(r)}let d=Da(s,a),p=n,m=Wte(d.output,d.llmUsage);if(r!==void 0){let y=$b.get(r);$b.delete(r),y!==void 0&&tW({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-y)/1e3))});let h=kee(d.llmUsage,m);h!==null&&r7({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:h})}r!==void 0&&bg(r),r!==void 0&&iN.has(r)?(iN.delete(r),Fb.delete(r),p=H$,m=Uee(m.replace(/\n*Stopped by user\.$/,""))):r!==void 0&&Fb.has(r)&&(Fb.delete(r),p=Hte,m=m.trim().length>0&&!m.includes("Stopped by user.")?`${m.trim()}${Fte}`:"Stopped by user."),m=Pn(m).scrubbed;let g=r!==void 0?oW(e.layout.reportsDir,r):null;if(r!==void 0){Ag(r),Qd(e.layout,r),yo(r)&&(pr(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),Dee(r));let y=Ce.get(r);Q3({reportsDir:e.layout.reportsDir,agentRunId:r,input:ho(i),output:m,...y!==void 0?{writerLabel:Sg({writerAgent:y.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),y!==void 0&&a_({layout:e.layout,writerAgent:y.writerAgent,projectFolderPath:y.projectFolderPath,userPrompt:y.userTranscriptPrompt,assistantOutput:m,agentRunId:r}),Cte(e.layout,{agentRunId:r,originalPrompt:i,exitCode:p,output:m,layout:e.layout,...y!==void 0&&y.projectId!==void 0&&y.projectId.trim().length>0?{projectId:y.projectId.trim()}:{},...y!==void 0?{writerAgent:y.writerAgent}:{}}),vee(e.layout,{runId:r,exitCode:p,output:m,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),$M({layout:e.layout,cloudApi:Cg}),Ce.delete(r),Tg.delete(r),wb(e.layout,r)}pr(t,{type:"command.claude.result",payload:{exitCode:p,output:m,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{},...c!==void 0?{errorCode:c}:{}},requestId:o}),Id(e.layout)},Ute=(e,t,r,o,n,s,i)=>{let a=Ce.get(r),c=a?.accumulatedOutput??s;bg(r),Pee(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),ta(t,r,()=>MM(e.layout,r),Ig(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),pr(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},D_e=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=y=>{if(!(n===void 0||y.length===0)){if(yo(n)){pr(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:y},requestId:o});return}an(n,y)}};if(n!==void 0){let y=Ce.get(n);Tg.set(n,t),Ce.set(n,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,projectId:y?.projectId,accumulatedOutput:y?.accumulatedOutput??""}),pr(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),ta(r,n,()=>zte(n),Ig(e,r,n,o,y?.projectFolderPath,y?.reportKey))}let m=a==="claude-cli",g=[];t.stdout?.on("data",y=>{let h=y.toString("utf8");if(m?g.push(h):(c.push(h),p(h)),d||n===void 0)return;let S=kg(c.join(""));if(S!==null){d=!0,t.kill("SIGTERM");let T=Ce.get(n),f=[T?.accumulatedOutput??"",S.partialOutput].filter(b=>b.length>0).join(`

`);T!==void 0&&(T.accumulatedOutput=f),Tg.delete(n),Ute(e,r,n,o,S.question,f,s)}}),t.stderr?.on("data",y=>{let h=y.toString("utf8");c.push(h),p(h)}),t.on("close",y=>{if(d)return;Db(a);let h=n!==void 0?Ce.get(n):void 0,S=m?Da(g.join("")):{output:c.join("").trim(),llmUsage:void 0},T=m?c.join("").trim():"",f=[S.output.trim(),T].filter(I=>I.length>0).join(`
`);m&&S.output.trim().length>0&&p(S.output);let b=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${f}`.trim():f;cn(e,r,n,o,y??-1,b,s,S.llmUsage)}),t.on("error",y=>{d||cn(e,r,n,o,-1,y.message,s)})},H_e=(e,t,r,o,n,s,i,a,c,d)=>{let p=$te(r,c);s!==void 0&&(Ce.set(s,{originalPrompt:r,userTranscriptPrompt:p,writerAgent:t,projectFolderPath:i,reportKey:a,projectId:d,accumulatedOutput:""}),pr(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),ta(n,s,()=>Ce.has(s),Ig(e,n,s,o,i,a))),Vd(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(yo(s)){pr(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}an(s,g)}}).then(g=>{Db(t),cn(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let y=g instanceof Error?g.message:String(g);cn(e,n,s,o,-1,y,r)})},zb=(e,t,r,o,n,s,i,a,c,d,p,m,g)=>{let y=$te(r,p);Cd(e.layout);let h=b=>{cn(e,n,s,o,-1,Os(b),r,void 0,b)};if(Ro(e.layout.configPath)){h(ue.CODING_TOOLS_PAUSED);return}if(Ns(e,t)){Nte(s),H_e(e,t,r,o,n,s,c,d,y,g);return}let S=Zt(t,r,N_e(e),i);if(S===null){cn(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}if(c===void 0||c.trim().length===0){h(ue.FOLDER_REQUIRED);return}Nte(s);let T=Mee({workspace:e.workspace,projectFolderPath:c}),f=()=>{Zy(t);let b=(0,Dte.spawn)(S.command,[...S.args],{cwd:T,stdio:["ignore","pipe","pipe"],env:m??process.env,detached:process.platform!=="win32"});D_e(e,b,n,o,s,r,y,t)};if(s===void 0){f();return}zee(s,()=>{F_e(e,n,s,o)}),Ce.set(s,{originalPrompt:r,userTranscriptPrompt:y,writerAgent:t,projectFolderPath:c,reportKey:d,projectId:g??Ce.get(s)?.projectId,accumulatedOutput:Ce.get(s)?.accumulatedOutput??""}),M_e(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&gd({reportKey:d,agentRunId:s,userSummary:"Task started on your computer."}),ta(n,s,()=>Ce.has(s),Ig(e,n,s,o,c,d)),ste({socket:n,sendMessage:pr,requestId:o,agentRunId:s,shellSessionId:a,command:S.command,args:S.args,cwd:T,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:b=>{a!==void 0&&Ec(a,v=>{pr(n,v)},o);let I=Ce.get(s),P=[I?.accumulatedOutput??"",b.partialOutput].filter(v=>v.length>0).join(`

`);I!==void 0&&(I.accumulatedOutput=P),Ute(e,n,s,o,b.question,P,r)},onFinished:(b,I)=>{Db(t);let P=Da(I),v=Ce.get(s),x=v!==void 0&&v.accumulatedOutput.length>0?`${v.accumulatedOutput}

${P.output}`.trim():P.output;cn(e,n,s,o,b,x,r,P.llmUsage)}}).then(b=>{if(!b){f();return}ta(n,s,()=>JM(s),Ig(e,n,s,o,c,d))}).catch(b=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",b instanceof Error?b.message:b),f()})},dN=(e,t,r,o)=>{wb(e.layout,t.agentRunId),t.shellSessionId!==void 0&&pr(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=nte(t),s=Ce.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;zb(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt,void 0,s?.projectId)},pN=(e,t)=>{for(let r of See(e.layout))Ce.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:ho(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),ta(t,r.agentRunId,()=>MM(e.layout,r.agentRunId),{awaitingInput:!0}),pr(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Lg=(e,t,r,o)=>{let n=Ce.get(r);if(n===void 0)return!1;Fb.add(r),Ag(r),bg(r);let s=Tg.get(r);if(s!==void 0)return Bee(s),!0;if(ete(r))return!0;wb(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${Fte}`:"Stopped by user.";return cn(e,t,r,o,Hte,i,n.originalPrompt),!0},F_e=(e,t,r,o)=>Ce.has(r)?(iN.add(r),Lg(e,t,r,o)):!1,uN=(e,t)=>[...Ce.keys()].filter(r=>Lg(e,t,r)).length});var $_e,mN,Gte=l(()=>{"use strict";ip();$_e=()=>`http://127.0.0.1:${Pr()}/restart`,mN=async()=>{try{let e=await fetch($_e(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Kte=l(()=>{"use strict";Qp()});var Vte=l(()=>{"use strict";HW()});var gN,qte=l(()=>{"use strict";gN=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var vg,z_e,fN,yN,Jte=l(()=>{"use strict";ee();Ae();Kte();XC();Vte();qte();Ia();vg=(e,t)=>{Wn(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},z_e=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ow(),rw)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},fN=e=>gN({localBundleVersion:Ze(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),yN=async e=>{let t=Ze(e.layout.installDir)?.bundleVersion??null;if(!gN({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(hr(e.layout)){Ld({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),vg(e.layout,{summary:r,action:"install-bundle-update-start"}),Ao({launchAgentLabel:Ie(e.layout.installDir),installDir:e.layout.installDir});let o=await ec({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),vg(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await z_e();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),vg(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),vg(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),vg(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var U_e,hN,Yte=l(()=>{"use strict";U_e=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hN=e=>{if(!U_e(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var SN,PN,Xte=l(()=>{"use strict";EC();TC();SN=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Np({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},PN=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await No(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var Zte,B_e,G_e,K_e,vc,Qte=l(()=>{"use strict";Zte=u(require("node:os"));ct();B_e="Default",G_e=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),K_e=e=>{let t=Zte.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},vc=()=>{let e=z(),t=Zc(e),r=G_e(B_e);return`${K_e(t)}/${r.length>0?r:"project"}`}});var ere=l(()=>{"use strict";Qp()});var tre,AN,rre=l(()=>{"use strict";ere();tre=!1,AN=e=>{tre||(tre=!0,process.on("uncaughtException",t=>{li(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;li(e,{kind:"crash",message:r,stack:o})}))}});var ore,V_e,_N,nre=l(()=>{"use strict";ore=require("node:child_process");jb();Sr();Tb();Eb();hg();Cb();V_e=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,ore.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},_N=async e=>{if(!Ne(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&dt(e.runConfig.writerExecutionBackend)==="api"){let r=Ft(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=rt(e.layout.configPath),n=Et(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.`}}}try{await ln(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await V_e(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var bN,sre=l(()=>{"use strict";bN=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var ire,kN,are=l(()=>{"use strict";ire=require("node:crypto"),kN=()=>(0,ire.randomUUID)()});var xc,lre,Ub=l(()=>{"use strict";xc="[[WORKING_ESTIMATE]]",lre=(e,t,r,o="")=>["Estimate how long the following task will take on this computer, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",xc,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var cre,dre=l(()=>{"use strict";cre=e=>e===null||e<=0?"Estimate saved locally. Starting work on your computer\u2026":e<60?`Estimated ~${e}s. Starting work on your computer\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your computer\u2026`});var q_e,pre,ure=l(()=>{"use strict";Ub();q_e=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,pre=e=>{if(!e.includes(xc))return null;let t=null;for(let r of e.matchAll(q_e)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var J_e,RN,mre=l(()=>{"use strict";ure();J_e=/^(\d{1,6})\b/,RN=e=>{let t=pre(e);if(t!==null)return t;let r=J_e.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var Y_e,X_e,Z_e,Bb,wN=l(()=>{"use strict";Sr();Xp();Y_e="http://127.0.0.1:11434",X_e=45e3,Z_e=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Bb=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Y_e,o=t===void 0?(await Er({commands:Re({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(X_e)});return n.ok?Z_e(await n.json()):null}catch{return null}}});var EN,TN,CN,gre=l(()=>{"use strict";fd();Ub();Eg();dre();mre();fm();wN();EN=async e=>{let t=ho(e.wrappedPrompt),r=e7(e.reportsDir);return{estimateOutput:await Bb(lre(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},TN=e=>{let t=RN(e.estimateOutput);t!==null&&e_({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},CN=e=>{let t=RN(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=cre(t);return md({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Br.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),e_({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Gb,fre,IN=l(()=>{"use strict";Gb="[[WORKING_TOKEN_ESTIMATE]]",fre=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this computer.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Gb,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var yre,Q_e,hre,Sre=l(()=>{"use strict";IN();yre=/^(\d{1,8})\b/,Q_e=e=>{let t=e.indexOf(Gb);if(t<0)return null;let r=e.slice(t+Gb.length).trim(),o=yre.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},hre=e=>{let t=Q_e(e);if(t!==null)return t;let r=yre.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var LN,vN,Pre=l(()=>{"use strict";IN();Eg();Sre();fm();wN();LN=async e=>{let t=ho(e.wrappedPrompt),r=o7(e.reportsDir);return{estimateOutput:await Bb(fre(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},vN=e=>{let t=hre(e.estimateOutput);return t===null?null:(t7({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var Are=l(()=>{"use strict";vM();lee();dee();gee();ip();Bte();jb();Sr();nN();Lb();Gte();FC();Jte();Ia();Yte();Xte();Ib();Qte();rre();nre();cy();sre();are();Ub();fd();gre();Pre();NM();Xp();xb();tN()});var _re={};Mt(_re,{buildContinuationPromptWithContext:()=>rbe});var ebe,tbe,rbe,bre=l(()=>{"use strict";ebe=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,tbe=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),rbe=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=tbe(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${ebe(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var kre={};Mt(kre,{readHarnessExportSets:()=>nbe});var xg,xN,Kb,obe,nbe,Rre=l(()=>{"use strict";xg=u(require("node:fs")),xN=u(require("node:path"));ct();Kb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),obe=e=>{if(!xg.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(xg.default.readFileSync(e.harnessManifestPath,"utf8"));if(Kb(t))return t}catch{return null}return null},nbe=(e,t)=>{let r=z(t),o=obe(r);if(o===null)return[];let n=Kb(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!Kb(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!Kb(p))continue;let m=typeof p.path=="string"?p.path:void 0,g=typeof p.id=="string"?p.id:"",y=typeof p.kind=="string"?p.kind:"",h=typeof p.title=="string"?p.title:"";if(m===void 0||g.length===0||y.length===0||h.length===0)continue;let S=m.startsWith("shared/")?xN.default.join(r.harnessRootDir,m):xN.default.join(r.harnessSetsDir,i,m);xg.default.existsSync(S)&&d.push({id:g,kind:y,title:h,content:xg.default.readFileSync(S,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var FN,MN,Wc,wre,sbe,Ere,Tre,WN,ON,Cre,NN,DN,HN,Ire,jN,fe,oe,Vb,ibe,Wg,abe,lbe,cbe,dbe,pbe,ube,mbe,gbe,Og,Lre=l(()=>{"use strict";FN=require("node:child_process"),MN=u(require("node:fs")),Wc=u(require("node:os"));XQ();ee();Ae();vs();Qj();tee();se();nb();se();Kr();Qp();dL();lb();c_();_t();En();aI();mr();St();oee();Are();wre=3e4,sbe=3e4,Ere=new Map,Tre=new Map,WN=new Map,ON=new Map,Cre=e=>{try{tg({projectId:e.projectId,taskId:e.agentRunId,agentRunId:e.agentRunId,status:e.status,...e.promptBody!==void 0?{promptBody:e.promptBody}:{},...e.resultBody!==void 0?{resultBody:e.resultBody}:{},...typeof e.writerAgent=="string"?{writerAgent:e.writerAgent}:{},...e.completedAt!==void 0?{completedAt:e.completedAt}:{completedAt:null}})}catch{}},NN=new Map,DN=new Map,HN=new Map,Ire=rp(),jN=new Set,fe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oe=(e,t,r)=>{if(e.readyState===bc.OPEN){let o=Hs(t);e.send(JSON.stringify(o)),r!==void 0&&(Wn(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),lP(r,"out",o))}},Vb=e=>e,ibe=e=>{if(!MN.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(MN.default.readFileSync(e.harnessManifestPath,"utf8"));if(fe(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Wg=(e,t)=>{let r=ibe(t);r!==null&&oe(e,{type:"harness.manifest.report",payload:{hostname:Wc.default.hostname(),manifest:r}})},abe=async(e,t,r,o,n,s,i=!1,a,c,d,p,m)=>{let g=m?.trim()??"";if(!Ne(t)){oe(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let y=Sg({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),h=await Er({commands:Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),S=s!==void 0?EN({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:h?.estimateModel,capabilityNote:h?.capabilityNote}).catch(()=>null):null,T=s!==void 0?LN({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:h?.estimateModel,capabilityNote:h?.capabilityNote}).catch(()=>null):null,f=wg(t)&&!XM(t);if(f){try{await ln(e.layout.installDir,t)}catch(R){let w=R instanceof Error?R.message:String(R);oe(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Rg(t)}else if(!wg(t))try{await ln(e.layout.installDir,t)}catch(R){let w=R instanceof Error?R.message:String(R);oe(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${w}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let b=Xd(d,vc,m);if(b===null){oe(n,op({code:ue.FOLDER_REQUIRED,...s!==void 0?{agentRunId:s}:{},...o!==void 0?{requestId:o}:{}}));return}$t({projectFolderPath:b,...g.length>0?{projectId:g}:{}}),i||Am(e.layout,t,b);let I=l_({sessionContinuation:i,supportsWriterSessionContinuation:Mb(t),isWriterConversationStarted:Nb(t)}),P=i&&I==="first"?Pm(e.layout,t,b):null,v=P!==null?Zl(e.layout,P):null,x=v!==null&&v.turns.length>0,D=SW({sessionContinuation:i,supportsWriterSessionContinuation:Mb(t),isWriterConversationStarted:Nb(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:x,userPromptCharacterCount:r.length}),k=r;if(D.continuationStrategy==="source_run_seed"){let R=typeof c=="string"&&c.length>0?Lc(e.layout,c):null;if(R!==null){let{buildContinuationPromptWithContext:w}=await Promise.resolve().then(()=>(bre(),_re));k=w({priorPrompt:R.prompt,priorOutput:R.resultOutput??"",userMessage:r})}}else D.continuationStrategy==="transcript_seed"&&v!==null&&v.turns.length>0&&(k=o_({priorTurns:v.turns,userMessage:r}));let A=D.ragLimit>0?await kl({layout:e.layout,query:k,limit:D.ragLimit,minScore:D.ragMinScore,projectFolderPath:b,...g.length>0?{projectId:g}:{}}):[],E=D.ragLimit>0&&b.trim().length>0?await lL({layout:e.layout,query:k,limit:2,minScore:.32,projectFolderPath:b,...g.length>0?{projectId:g}:{}}):[],O=D.injectMemory?lW(e.layout,b,g.length>0?g:void 0):[],X=`${dW(O,D.memoryEntryLimit)}${sL(A)}${cL(E)}${k}`,ne=p?.trim()??(s!==void 0&&b.trim().length>0?kN():void 0);if(s!==void 0&&ne!==void 0&&ne.length>0&&b.trim().length>0){gd({reportKey:ne,agentRunId:s,userSummary:"Working on your computer\u2026"});let R=X;S!==null&&S.then(w=>{if(w===null)return;let M=CN({estimateOutput:w.estimateOutput??"",reportKey:ne,agentRunId:s,reportsDir:e.layout.reportsDir,task:w.task,writerLabel:w.writerLabel,embedding:w.embedding});if(M.estimateSeconds===null)return;lN(e.layout.reportsDir,s);let N=`${xc}
${M.estimateSeconds}
`;if(yo(s)){oe(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:N},requestId:o});return}an(s,N)}).catch(()=>{}),X=bN(R),X=SR(X,{agentRunId:s,reportKey:ne,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&S!==null&&S.then(R=>{R!==null&&TN({estimateOutput:R.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:R.task,writerLabel:R.writerLabel,embedding:R.embedding})}).catch(()=>{}),s!==void 0&&T!==null&&T.then(R=>{R!==null&&vN({estimateOutput:R.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:R.task,writerLabel:R.writerLabel})}).catch(()=>{});let ft=s!==void 0&&HN.get(s)===!0;if(s!==void 0&&b.trim().length>0){let R=await tS(b);DN.set(s,R),ne!==void 0&&ne.length>0&&NN.set(s,ne)}zb(e,t,X,o,Vb(n),s,{sessionTurn:D.sessionTurn},a,b,ne,r,qw(e.layout,s,ft),g.length>0?g:void 0),f&&s!==void 0&&oe(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:QM(t)},requestId:o})},lbe=async(e,t,r,o,n)=>{let s=(i,a)=>{oe(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await eN({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,oe(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=Ne(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Tc(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},cbe=(e,t,r)=>new Promise(o=>{if(!Ne(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Zt(t,r,Re({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,FN.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),dbe=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;oe(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Yr(t.bundle),s=fe(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Qe(e.wsUrl)??Nt,m=await ME({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return oe(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Us({bundle:i,layout:e.layout});return oe(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Wg(o,e.layout),!0},pbe=async(e,t,r,o)=>{if(await dbe(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(oe(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){oe(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!Ne(n)){oe(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}if(Ro(e.layout.configPath)){oe(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorCode:ue.CODING_TOOLS_PAUSED,errorMessage:op({code:ue.CODING_TOOLS_PAUSED}).payload.output},requestId:r});return}Cd(e.layout);let i=await(async()=>{try{await ln(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return cbe(e,n,s)})().finally(()=>{Id(e.layout)});oe(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Wg(o,e.layout)},ube=e=>{let t=1e3*2**e;return Math.min(sbe,t)},mbe=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=f=>t.restartInFlight?"already_in_progress":hr(e.layout)?(vd(f),console.log(`[agent-witch] Deferring local restart (${f}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${f})\u2026`),t.wakeError=`restart:${f}`,mN().then(b=>{if(b.ok){console.log("[agent-witch] Local restart completed.");return}if(!b.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",b.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=(f,b,I,P)=>{oe(f,{type:"device.restart.ack",payload:oE({status:I,reason:b}),...P!==void 0?{requestId:P}:{}},e.layout)},n=(f,b="system.ack")=>{if(!t.selfUpdateInFlight&&fN({installDir:e.layout.installDir,remoteBundleVersion:f})){if(hr(e.layout)){Ld({layout:e.layout,remoteBundleVersion:f,trigger:b}),console.log(`[agent-witch] Deferring install bundle update (${f} via ${b}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,yN({layout:e.layout,remoteBundleVersion:f,trigger:b}).finally(()=>{t.selfUpdateInFlight=!1})}},s=()=>{let f=$e(e.layout);f!==null&&et(f,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,c(),d(),h())},i=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},c=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},d=()=>{if(t.socket===void 0)return;let f=t.socket;t.socket=void 0,t.wsConnected=!1,f.removeAllListeners("open"),f.removeAllListeners("message"),f.removeAllListeners("close"),f.on("error",()=>{}),(f.readyState===bc.OPEN||f.readyState===bc.CONNECTING)&&f.close()},p=()=>{a(),t.localHealthTimer=setInterval(s,wre)},m=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let f=ube(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${f}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,h()},f)},g=f=>{i();let b=()=>{let I=Rd(e.layout.installDir),P=Pr();oe(f,{type:"agent.heartbeat",payload:{hostname:Wc.default.hostname(),macOsUsername:Wc.default.userInfo().username,wakeError:t.wakeError,wakePort:P,...e.email!==null?{email:e.email}:{},installBundleVersion:I}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};b(),t.heartbeatTimer=setInterval(b,wre)},y=(f,b)=>{if(typeof f.type!="string")return;if(iI(f)){t.stopped=!0,i(),c(),d(),oI({layout:e.layout}).finally(()=>{ug(),process.exit(0)});return}Wn(e.layout,{direction:"in",type:f.type,summary:"inbound WS frame"}),lP(e.layout,"in",f);let I=typeof f.requestId=="string"?f.requestId:void 0;if(f.type==="device.auth.attestation"&&fe(f.payload)){let P=typeof f.payload.serverPublicKey=="string"?f.payload.serverPublicKey:"",v=typeof f.payload.origin=="string"?f.payload.origin:"",x=typeof f.payload.devicePublicKey=="string"?f.payload.devicePublicKey:"",D=typeof f.payload.challenge=="string"?f.payload.challenge:"",k=typeof f.payload.serverAttestation=="string"?f.payload.serverAttestation:"";if(!Zj({serverPublicKey:P,origin:v,devicePublicKey:x,challenge:D,serverAttestation:k})){t.wakeError="Server attestation verification failed",Wn(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(f.type==="writer.ensure"&&fe(f.payload)){let P=typeof f.payload.writerAgent=="string"?f.payload.writerAgent:"";Wn(e.layout,{direction:"local",type:"writer.ensure",summary:P,action:"ensure-writer"}),_N({layout:e.layout,writerAgent:P,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(v=>{oe(b,{type:"writer.status",payload:v},e.layout)})}if(f.type==="install.bundle.update"&&fe(f.payload)){let P=typeof f.payload.bundleVersion=="string"?f.payload.bundleVersion.trim():"";P.length>0&&n(P,"install.bundle.update")}if(f.type==="system.ack"){jy(e.layout,{wsUrl:e.wsUrl});let P=fe(f.payload)?f.payload:null,v=hN(P);v!==null&&n(v)}if(f.type==="device.restart"){let P=r("cloud-device-restart");o(b,"cloud-device-restart",P,I)}if(f.type==="automations.sync"&&fe(f.payload)&&SN(f.payload),f.type==="project.message.history"&&fe(f.payload)){B0({payload:f.payload});return}if(f.type==="project.history.page.request"&&fe(f.payload)){let P=aO({payload:f.payload});oe(b,{type:"project.history.page.result",payload:P,requestId:I});return}if(f.type==="automations.run"&&fe(f.payload)&&PN(f.payload),f.type==="terminal.stream.accepted"&&fe(f.payload)){let P=typeof f.payload.runId=="string"?f.payload.runId:"";if(P.length>0){let v=BM(P);for(let x of v)oe(b,{type:"terminal.stream.chunk",payload:{runId:P,chunk:x},requestId:I})}}if(f.type==="agent.agentRun.list"&&oe(b,{type:"dashboard.agentRun.list.result",payload:{runs:oN(e.layout)},requestId:I}),f.type==="agent.agentRun.get"&&fe(f.payload)){let P=typeof f.payload.runId=="string"?f.payload.runId:"",v=P.length>0?Lc(e.layout,P):null;oe(b,{type:"dashboard.agentRun.get.result",payload:{run:v},requestId:I})}if(f.type==="command.claude.run"&&fe(f.payload)){let P=f.payload.prompt,v=typeof f.payload.writerAgent=="string"&&Ne(f.payload.writerAgent)?f.payload.writerAgent:"claude-cli",x=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:void 0,D=f.payload.sessionContinuation===!0,k=typeof f.payload.sourceRunId=="string"?f.payload.sourceRunId:void 0,A=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:void 0,E=typeof f.payload.projectId=="string"?f.payload.projectId:void 0,O=Xd(typeof f.payload.projectFolderPath=="string"?f.payload.projectFolderPath:void 0,vc,E),X=$w(f.payload.compositionSnapshot),ne=typeof f.payload.reportKey=="string"?f.payload.reportKey:void 0;if(typeof P=="string"&&P.trim().length>0){if(console.log(`[agent-witch] Running ${v} task (${D?"continue":"first"})\u2026`),x!==void 0&&(Ire.has(x)||jN.has(x)||Lc(e.layout,x)!==null)){console.log(`[agent-witch] Ignoring duplicate run ${x}.`);return}let ft=w=>{oe(b,op({code:w,...x!==void 0?{agentRunId:x}:{},...I!==void 0?{requestId:I}:{}}))},R=w=>{if(X!==null){let M=Uw(e.layout,X);if(M!==null){oe(b,{type:"command.claude.result",payload:{exitCode:-1,output:M,...x!==void 0?{agentRunId:x}:{}},requestId:I});return}if(x!==void 0){let N=Gw(e.layout,x,X);if(!N.ok){oe(b,{type:"command.claude.result",payload:{exitCode:-1,output:N.errorMessage,...x!==void 0?{agentRunId:x}:{}},requestId:I});return}HN.set(x,X.entries.some(H=>H.scope==="run"))}}x!==void 0&&A!==void 0&&Ere.set(x,A),x!==void 0&&(Tre.set(x,w),E!==void 0&&E.trim().length>0&&WN.set(x,E.trim()),ON.set(x,P.trim()),E!==void 0&&E.trim().length>0&&Cre({projectId:E.trim(),agentRunId:x,status:"running",promptBody:P.trim(),resultBody:null,writerAgent:v,completedAt:null}),$t({projectFolderPath:w,...E!==void 0&&E.trim().length>0?{projectId:E.trim()}:{}})),abe(e,v,P.trim(),I,b,x,D,A,k,w,ne,E)};x!==void 0&&jN.add(x),ree({config:e,...E!==void 0?{projectId:E}:{},requestedFolderPath:O,defaultFolderPath:vc()}).catch(()=>({ok:!1,code:ue.FOLDER_CHECK_UNAVAILABLE})).then(w=>{if(x!==void 0&&jN.delete(x),!w.ok){ft(w.code);return}x!==void 0&&Ire.add(x),R(w.folderRealPath)}).catch(w=>{console.error("[agent-witch] Run start failed:",w instanceof Error?w.message:w)})}}if(f.type==="shell.session.open"&&fe(f.payload)){let P=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",v=typeof f.payload.cols=="number"?f.payload.cols:120,x=typeof f.payload.rows=="number"?f.payload.rows:32;P.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),YM({shellSessionId:P,cwd:e.workspace,cols:v,rows:x,send:D=>{oe(b,D)},requestId:I}))}if(f.type==="shell.session.close"&&fe(f.payload)){let P=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"";P.length>0&&Ec(P,v=>{oe(b,v)},I)}if(f.type==="shell.input"&&fe(f.payload)){let P=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",v=typeof f.payload.data=="string"?f.payload.data:"";P.length>0&&v.length>0&&VM(P,v)}if(f.type==="shell.resize"&&fe(f.payload)){let P=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",v=typeof f.payload.cols=="number"?f.payload.cols:0,x=typeof f.payload.rows=="number"?f.payload.rows:0;P.length>0&&v>0&&x>0&&qM(P,v,x)}if(f.type==="command.writer.session.end"&&fe(f.payload)){let P=f.payload.writerAgent;typeof P=="string"&&Ne(P)&&(ZM(P),i_(e.layout,P))}if(f.type==="command.writer.session.start"&&fe(f.payload)){let P=f.payload.writerAgent,v=typeof f.payload.writerSessionId=="string"?f.payload.writerSessionId:"";typeof P=="string"&&Ne(P)&&v.length>0&&(console.log(`[agent-witch] Starting ${P} session\u2026`),lbe(e,P,v,I,b))}if(f.type==="command.claude.stop"&&fe(f.payload)){let P=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:"";P.length>0&&(console.log(`[agent-witch] Stopping run ${P}\u2026`),Lg(e,Vb(b),P,I))}if(f.type==="command.claude.input_respond"&&fe(f.payload)){let P=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:"",v=typeof f.payload.response=="string"?f.payload.response.trim():"",x=typeof f.payload.originalPrompt=="string"?f.payload.originalPrompt:"",D=typeof f.payload.partialOutput=="string"?f.payload.partialOutput:"",k=typeof f.payload.question=="string"?f.payload.question:"";P.length>0&&v.length>0&&x.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),dN(e,{agentRunId:P,originalPrompt:x,partialOutput:D,question:k,response:v,shellSessionId:Ere.get(P)},I,Vb(b)))}if(f.type==="dispatch.approval.required"&&fe(f.payload)){let P=typeof f.payload.requesterEmail=="string"?f.payload.requesterEmail:"A teammate",v=typeof f.payload.prompt=="string"?f.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${P}: ${v}`),process.platform==="darwin"&&(0,FN.spawn)("osascript",["-e",`display notification "${v.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${P.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(f.type==="harness.request"&&fe(f.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),pbe(e,f.payload,I,b)),f.type==="harness.export.request"&&fe(f.payload)){let P=typeof f.payload.borrowerUserId=="string"?f.payload.borrowerUserId:"",v=typeof f.payload.targetDeviceId=="string"?f.payload.targetDeviceId:void 0,x=Array.isArray(f.payload.setSlugs)?f.payload.setSlugs.filter(D=>typeof D=="string"):[];P.length>0&&x.length>0&&(async()=>{let{readHarnessExportSets:D}=await Promise.resolve().then(()=>(Rre(),kre)),k=D(x,e.email);oe(b,{type:"harness.export.result",payload:{success:k.length>0,borrowerUserId:P,...v!==void 0?{targetDeviceId:v}:{},sets:k,errorMessage:k.length>0?void 0:"No readable harness sets were found on this machine."},requestId:I})})()}if(f.type==="harness.manifest.request"&&Wg(b,e.layout),f.type==="command.claude.result"&&fe(f.payload)){let P=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:void 0,v=typeof f.payload.output=="string"?f.payload.output:"",x=typeof f.payload.exitCode=="number"?f.payload.exitCode:null,D=Xd(P!==void 0?Tre.get(P):void 0,vc),k=P!==void 0?WN.get(P):void 0,A=P!==void 0?ON.get(P)??"":"",E=kT({exitCode:x,output:v});if(E&&D!==null&&nL({layout:e.layout,text:v,source:P??"command.claude.result",projectFolderPath:D,...k!==void 0?{projectId:k}:{}}),x!=null&&x!==0&&v.trim().length>0&&D!==null&&(QI({layout:e.layout,errorText:v,projectFolderPath:D,...k!==void 0?{projectId:k}:{}}),aL({layout:e.layout,text:v,source:P??"command.claude.result.failure",projectFolderPath:D,...k!==void 0?{projectId:k}:{}})),E&&A.trim().length>0&&D!==null&&cW({layout:e.layout,projectFolderPath:D,...k!==void 0?{projectId:k}:{},entry:{id:`${Date.now()}-${P??"run"}`,...P!==void 0?{agentRunId:P}:{},prompt:A,output:v,createdAt:new Date().toISOString()}}),P!==void 0&&D!==null){let X=NN.get(P),ne=DN.get(P);X!==void 0&&ne!==void 0&&tS(D).then(ft=>{let R=TT({before:ne,after:ft});PR(X,R),DN.delete(P),NN.delete(P)})}if(E&&k!==void 0&&k.trim().length>0){let X=B(),ne=X===null?null:J({wsUrl:X.wsUrl,pairingToken:X.pairingToken});ne!==null&&IT(ne,k,{...P!==void 0?{sourceRunId:P}:{},lesson:CT({prompt:A,output:v})})}if(P!==void 0&&k!==void 0&&k.trim().length>0){let X=x==null||x===0?"completed":"failed";Cre({projectId:k.trim(),agentRunId:P,status:X,promptBody:A.length>0?A:void 0,resultBody:v,completedAt:new Date().toISOString()})}P!==void 0&&(Qd(e.layout,P),HN.delete(P),WN.delete(P),ON.delete(P))}},h=()=>{if(t.stopped)return;c(),d();let f=new bc(e.wsUrl);t.socket=f,f.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),aN(J({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),cN(e.layout);let b=Qe(e.wsUrl)??"http://localhost:3000",I=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),P=Xj({layout:e.layout,origin:b,...I!==void 0&&I.length>0?{claimToken:I}:{}});oe(f,{type:"agent.register",payload:{role:"agent",hostname:Wc.default.hostname(),macOsUsername:Wc.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...P}},e.layout),Wg(f,e.layout),pN(e,f),g(f)}),f.on("message",b=>{let I=typeof b=="string"?b:b.toString("utf8");try{let P=JSON.parse(I);if(!fe(P))return;y(P,f)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),f.on("close",(b,I)=>{i(),t.socket=void 0,t.wsConnected=!1,sw(e.layout),t.reconnectAttempt+=1;let P=typeof I=="string"?I:I.toString("utf8");li(e.layout,{kind:"ws_close",message:"WebSocket closed",code:b,reason:P}),console.log("[agent-witch] Disconnected from server."),m()}),f.on("error",b=>{t.wakeError=b.message,li(e.layout,{kind:"ws_error",message:b.message,stack:b.stack}),console.error(`[agent-witch] Socket error: ${b.message}`)})},S=sE(e.layout.configPath,f=>{if(!f)return;let b=uN(e,Vb(t.socket??{readyState:bc.CLOSED,send:()=>{}}));console.log(`[agent-witch] Coding tools paused; stopped ${b} run(s).`)}),T=()=>{t.stopped=!0,S(),i(),a(),c(),d()};return YR(()=>{let f=XR();f!==null&&f.layout.installDir===e.layout.installDir&&f.layout.profileEmail===e.layout.profileEmail&&n(f.remoteBundleVersion,f.trigger);let b=ZR();b!==null&&r(b)}),{connect:h,startLocalHealthCheck:p,stop:T,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:Nd(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:ng(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,h()},reportHarnessManifestIfConnected:()=>{let f=t.socket;return!t.wsConnected||f===void 0?{ok:!1,errorMessage:"Not connected to AgentWitch \u2014 manifest saved locally only."}:(Wg(f,e.layout),{ok:!0})}}},gbe=async()=>{Dt("agent-witch");let e=EM(),t=L();LM().ok||(process.platform==="darwin"?(await Ss(t),process.stdout.write(`[agent-witch] Another AgentWitch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another AgentWitch process may already be running \u2014 exiting.
`),process.exit(0)),OM(t);let o=WM({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){Ao({launchAgentLabel:Ie(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let h=ld({launchAgentPrefix:Ie(t),wakePort:ed(t)});h.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(h.length)} LaunchAgent plist(s).`)}catch(h){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${h instanceof Error?h.message:String(h)}`)}nd()}let n=await rE(),s=n[0];s!==void 0&&AN(s.layout);for(let y of n){let h=Qe(y.wsUrl)??Nt;wd(y.layout.installDir,h)}let i=n.map(y=>mbe(y)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ug(),process.exit(0));let c=()=>{n.forEach((y,h)=>{let S=i[h];if(S===void 0)return;let T=$e(y.layout);iw(T,{socketOpen:S.hasMacSocketOpen(),staleAfterMs:12e4})&&S.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let y=n[0]?.layout;y!==void 0&&(hr(y)||Up(y.installDir))},m=await jM({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):og({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let y of i)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let g=_o(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),sd(),d()});d=()=>{g(),m.stop(),ug(),console.log("[agent-witch] Shutting down.");for(let y of i)y.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},Og=gbe});var $N=l(()=>{"use strict";Lre()});var vre={};Mt(vre,{startAgentWitchClient:()=>Og});var xre=l(()=>{"use strict";$N();$N();As();AR();py();if(!Ht()&&_s(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(dy(process.argv.slice(e))),Og()}});yR();AR();As();py();var GF="20.x",KF="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var $ae=e=>[`Node.js ${GF} or newer is required (found ${e}).`,KF].join(" "),VF=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${$ae(process.version)}
`),process.exit(1))};Py();var fbe=async()=>{Dt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ow(),rw)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},ybe=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(cK(),lK)),t=await e();if(t.ok){process.stdout.write(`AgentWitch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake AgentWitch. ${r}
`),process.exit(1)},hbe=async e=>{try{if(e===fy){let{resolveAgentWitchLocalLayout:t}=await Promise.resolve().then(()=>(ee(),rR)),{runCheckContextHookCli:r}=await Promise.resolve().then(()=>(Qr(),IG));await r({layout:t()})}else process.stderr.write(`[agent-witch] ${ba}: unknown hook ${e??"(none)"}
`)}catch(t){let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] ${ba}: ${r}
`)}await new Promise(t=>{process.stdout.write("",()=>t())}),process.exit(0)},Sbe=async()=>{if(!_s(Ht()?void 0:__agentWitchImportMetaUrl))return;process.argv[2]===ba&&await hbe(process.argv[3]),VF();let e=process.argv.indexOf("report");e>=0&&process.exit(dy(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await fbe();return}if(t==="wake"){await ybe();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(gV(),mV));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(KZ(),GZ));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(ee(),rR)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(Qx(),B3));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(xre(),vre));await r()};Sbe();
