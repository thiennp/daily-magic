#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var Zre=Object.create;var Gb=Object.defineProperty;var Qre=Object.getOwnPropertyDescriptor;var eoe=Object.getOwnPropertyNames;var toe=Object.getPrototypeOf,roe=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var T=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},vt=(e,t)=>{for(var r in t)Gb(e,r,{get:t[r],enumerable:!0})},ooe=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of eoe(t))!roe.call(e,n)&&n!==r&&Gb(e,n,{get:()=>t[n],enumerable:!(o=Qre(t,n))||o.enumerable});return e};var u=(e,t,r)=>(r=e!=null?Zre(toe(e)):{},ooe(t||!e||!e.__esModule?Gb(r,"default",{value:e,enumerable:!0}):r,e));var Ic,rD,oD,Cc,Kb,Vbe,Og,es,Mr,fo,jg,Mg,Xi,Zi,mt,Vb,Ng,Dg,Hg,Lc,dr,ts,rs,vc,an,qb,nD,Fe=l(()=>{"use strict";Ic={production:".agent-witch",localhost:".local-agent-witch"},rD={production:47892,localhost:47893},oD={production:"com.agent-witch",localhost:"com.local-agent-witch"},Cc={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",localAppAccounts:"local-app-accounts.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},Kb="app",Vbe=`${Kb}/agent-witch.js`,Og=`${Kb}/command`,es={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},Mr=Ic.production,fo=Ic.localhost,jg=rD.production,Mg=rD.localhost,Xi=oD.production,Zi=oD.localhost,mt="profiles",Vb=Cc.activeProfile,Ng="harness",Dg="sets",Hg="manifest.json",Lc=es.projectsDir,dr=es.logsDir,ts="agent-witch.log",rs="agent-witch.error.log",vc=es.reportsDir,an=es.deviceKeypairJson,qb=Kb,nD="agent-witch.js"});var sD=l(()=>{"use strict";Fe()});var iD,ln,os,xc=l(()=>{"use strict";iD=u(require("node:path"));Fe();ln=e=>iD.default.basename(e)===fo,os=e=>ln(e)?Zi:Xi});var Nr,Qi=l(()=>{"use strict";Nr="agent-witch.service"});var xt,Fg,aD=l(()=>{"use strict";xt="https://www.agentwitch.com",Fg="wss://www.agentwitch.com/api/agent-witch/ws"});var $g,ea,Wc,lD=l(()=>{"use strict";$g="127.0.0.1",ea=`http://${$g}:43347`,Wc=ea});var Jb,zg,cD,dD,Yb,Xb,pD=l(()=>{"use strict";Jb="local-app-port.json",zg="http://127.0.0.1:<localAppPort>",cD=`~/.agent-witch/profiles/<account email>/${Jb}`,dD=`AgentWitch Local listens on a port unique to your account on this computer: read localAppPort from ${cD} and use ${zg}.`,Yb="agentwitch-local",Xb=(e=".agent-witch")=>`port="$(sed -n 's/.*"localAppPort"[^0-9]*\\([0-9][0-9]*\\).*/\\1/p' "$HOME/${e}"/profiles/*/${Jb} | head -n 1)"; curl -sS -m 5 "http://127.0.0.1:\${port}/health"`});var pr=l(()=>{"use strict";aD();lD();pD()});var noe,ns,Ug,uD,soe,ioe,aoe,loe,coe,jc,Zb=l(()=>{"use strict";Qi();pr();noe={darwin:"mac",mac:"mac",macos:"mac",linux:"linux",wsl:"linux",win32:"windows",windows:"windows"},ns=e=>noe[(e??"").trim().toLowerCase()]??"unknown",Ug=e=>`nohup "$HOME/${e}/app/command/run.sh" >/dev/null 2>&1 &`,uD=e=>`${Xb(e)} || echo "AWL still not responding \u2014 see logs:"`,soe=e=>({platform:"mac",label:"macOS",instructions:"On this computer, open Terminal, paste this command, and press Return.",command:`AW_HOME="$HOME/${e.installDirName}"
launchctl kickstart -k "gui/$(id -u)/${e.launchAgentPrefix}"
sleep 2
${uD(e.installDirName)}
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`,note:"Paste and run the whole block so AW_HOME is set before tail. Ignore com.agent-witch-live unless you installed Live as a separate LaunchAgent."}),ioe=e=>({platform:"linux",label:"Linux or WSL",instructions:"On this computer, open a terminal (on Windows, your WSL distro's terminal), paste this command, and press Enter.",command:`systemctl --user restart ${Nr}
sleep 2
${uD(e.installDirName)}
journalctl --user -u ${Nr} -n 50 --no-pager`,note:`If systemctl is not available, the installer did not set up auto-start on this computer. Start the client by hand: ${Ug(e.installDirName)}`}),aoe=()=>({platform:"windows",label:"Windows (WSL)",instructions:"On this computer, open PowerShell, paste these commands, and press Enter.",command:`wsl.exe -e bash -lc 'systemctl --user restart ${Nr}'
wsl.exe -e bash -lc 'systemctl --user status ${Nr}'`,note:"AgentWitch runs inside WSL on Windows. These commands use your default WSL distro; if you installed into another distro, add -d <distro name> after wsl.exe."}),loe={mac:soe,linux:ioe,windows:aoe},coe=["mac","linux","windows"],jc=e=>(e.platform==="unknown"?coe:[e.platform]).map(r=>loe[r](e))});var mD,gD,doe,poe,uoe,Qb,fD=l(()=>{"use strict";mD=u(require("node:path"));Zb();xc();gD=e=>e instanceof Error?e.message:String(e),doe=e=>typeof e=="object"&&e!==null&&"code"in e&&e.code==="ENOENT",poe=async(e,t)=>{try{let r=await e.kickstartLaunchAgents();return r.length>0?{ok:!0,platform:"mac",outcome:"restarted",message:`Kickstarted ${r.join(", ")}.`,manualCommand:null}:{ok:!1,platform:"mac",outcome:"failed",message:"No AgentWitch LaunchAgent was kickstarted on this computer.",manualCommand:t}}catch(r){return{ok:!1,platform:"mac",outcome:"failed",message:`LaunchAgent kickstart failed: ${gD(r)}`,manualCommand:t}}},uoe=async(e,t)=>{try{return await e.restartSystemdUserService(),{ok:!0,platform:"linux",outcome:"restarted",message:"Restarted the agent-witch.service systemd user unit.",manualCommand:null}}catch(r){return doe(r)?{ok:!1,platform:"linux",outcome:"manual-step-required",message:"systemctl is not available on this computer, so the installer set up no auto-start. Start the client by hand.",manualCommand:t}:{ok:!1,platform:"linux",outcome:"failed",message:`systemd user restart failed: ${gD(r)}`,manualCommand:t}}},Qb=async e=>{let t=ns(e.platform),r=mD.default.basename(e.installDir),o=n=>jc({platform:n,installDirName:r,launchAgentPrefix:os(e.installDir)})[0]?.command??null;return t==="mac"?poe(e.runners,o("mac")):t==="linux"?uoe(e.runners,Ug(r)):t==="windows"?{ok:!1,platform:t,outcome:"unsupported-platform",message:"AgentWitch runs inside WSL on Windows. Restart it from PowerShell with the command below.",manualCommand:o("windows")}:{ok:!1,platform:t,outcome:"unsupported-platform",message:`Restarting the AgentWitch client is not supported on ${e.platform||"this platform"}.`,manualCommand:null}}});var Mc=l(()=>{"use strict";sD();xc();Zb();fD()});var yD,eR,moe,Nc,goe,foe,hD,yoe,hoe,SD=l(()=>{"use strict";Mc();Fe();yD=u(require("node:os")),eR=u(require("node:path")),moe=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?eR.default.resolve(e):eR.default.join(yD.default.homedir(),Mr)},Nc=os(moe()),goe=`${Nc}-wake`,foe=`${Nc}-live`,hD=`${Nc}-watchdog`,yoe=`${Nc}-automation-scheduler`,hoe=`${Nc}-updater`});var ta=T(tR=>{"use strict";Object.defineProperty(tR,"__esModule",{value:!0});tR.stringify=Soe;function Soe(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var K=T(rR=>{"use strict";Object.defineProperty(rR,"__esModule",{value:!0});rR.generateTypeGuardError=Poe;var PD=ta();function Poe(e,t,r){return(0,PD.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,PD.stringify)(e)}) to be "${r}"`}});var cn=T(Bg=>{"use strict";Object.defineProperty(Bg,"__esModule",{value:!0});Bg.isNonNullObject=void 0;var Aoe=K(),_oe=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,Aoe.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Bg.isNonNullObject=_oe});var Dr=T($e=>{"use strict";Object.defineProperty($e,"__esModule",{value:!0});$e.attachTypeGuardMeta=$e.isArrayTypeGuard=$e.isNestedObjectTypeGuard=$e.getTypeGuardWrapperKind=$e.getTypeGuardInnerGuard=$e.getTypeGuardItemGuard=$e.getTypeGuardSchema=void 0;var boe=e=>e.schema;$e.getTypeGuardSchema=boe;var Roe=e=>e.itemGuard;$e.getTypeGuardItemGuard=Roe;var koe=e=>e.innerGuard;$e.getTypeGuardInnerGuard=koe;var woe=e=>e.wrapperKind;$e.getTypeGuardWrapperKind=woe;var Eoe=e=>{if((0,$e.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};$e.isNestedObjectTypeGuard=Eoe;var Toe=e=>{if((0,$e.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};$e.isArrayTypeGuard=Toe;var Ioe=(e,t)=>Object.assign(e,t);$e.attachTypeGuardMeta=Ioe});var Dc=T(ss=>{"use strict";Object.defineProperty(ss,"__esModule",{value:!0});ss.getExpectedTypeName=ss.getTypeGuardDisplayName=void 0;var AD=Dr(),Coe=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};ss.getTypeGuardDisplayName=Coe;var Loe=e=>{let t=(0,AD.getTypeGuardWrapperKind)(e),r=(0,AD.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,ss.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};ss.getExpectedTypeName=Loe});var is=T(Gg=>{"use strict";Object.defineProperty(Gg,"__esModule",{value:!0});Gg.createValidationResult=void 0;var voe=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Gg.createValidationResult=voe});var ra=T(Kg=>{"use strict";Object.defineProperty(Kg,"__esModule",{value:!0});Kg.createValidationError=void 0;var xoe=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Kg.createValidationError=xoe});var oa=T(Vg=>{"use strict";Object.defineProperty(Vg,"__esModule",{value:!0});Vg.createTreeNode=void 0;var Woe=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Vg.createTreeNode=Woe});var Hc=T(qg=>{"use strict";Object.defineProperty(qg,"__esModule",{value:!0});qg.combineResults=void 0;var Ooe=is(),joe=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,Ooe.createValidationResult)(r,o,n)};qg.combineResults=joe});var Yg=T(Jg=>{"use strict";Object.defineProperty(Jg,"__esModule",{value:!0});Jg.createSimplifiedTree=void 0;var _D=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=_D(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},Moe=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=_D(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Jg.createSimplifiedTree=Moe});var $c=T(Zg=>{"use strict";Object.defineProperty(Zg,"__esModule",{value:!0});Zg.validateObject=void 0;var Noe=cn(),Fc=is(),Doe=ra(),Xg=oa(),Hoe=Hc(),bD=Qg(),Foe=(e,t,r)=>{let o=()=>{let i=(0,Doe.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,Xg.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Fc.createValidationResult)(!1,[],a):(0,Fc.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Fc.createValidationResult)(!0,[],(0,Xg.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...p]=c,m=d,g=t[m],y=e[m],S=(0,bD.validateProperty)(m,y,g,r);return S.valid?p.length===0?(0,Fc.createValidationResult)(!0,[],(0,Xg.createTreeNode)(r.path,!0,"object",e)):a(p):S};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let p=t[d];return(0,bD.validateProperty)(d,e[d],p,r)}),a=(0,Hoe.combineResults)(i,r.path),c=(0,Xg.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let p=d.tree.path.split(".").pop()||"unknown";c.children[p]=d.tree}}),(0,Fc.createValidationResult)(a.valid,a.errors,c)};return(0,Noe.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Zg.validateObject=Foe});var kD=T(rf=>{"use strict";Object.defineProperty(rf,"__esModule",{value:!0});rf.validateArray=void 0;var $oe=ta(),ef=is(),RD=ra(),tf=oa(),zoe=Hc(),Uoe=$c(),Boe=Dc(),Goe=Dr(),Koe=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,RD.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,tf.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,ef.createValidationResult)(!1,[c],d)}let n=(0,Goe.getTypeGuardSchema)(t),s=e.map((c,d)=>{let p=`${o}[${d}]`,m={path:p,config:r.config||null};if(n)return(0,Uoe.validateObject)(c,n,m);let g=t(c,null),y=(0,Boe.getExpectedTypeName)(t),S=(0,$oe.stringify)(c);if(g)return(0,ef.createValidationResult)(!0,[],(0,tf.createTreeNode)(p,!0,y,c));let A=S.length>200?`Expected ${p} to be "${y}"`:`Expected ${p} (${S}) to be "${y}"`,E=(0,RD.createValidationError)(p,y,c,A),I=(0,tf.createTreeNode)(p,!1,y,c);return I.errors=[E],(0,ef.createValidationResult)(!1,[E],I)}),i=(0,zoe.combineResults)(s,o),a=(0,tf.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,ef.createValidationResult)(i.valid,i.errors,a)};rf.validateArray=Koe});var Qg=T(nf=>{"use strict";Object.defineProperty(nf,"__esModule",{value:!0});nf.validateProperty=void 0;var wD=is(),Voe=ra(),ED=oa(),qoe=Dc(),of=Dr(),Joe=$c(),Yoe=kD(),Xoe=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,of.getTypeGuardSchema)(r),c=(0,of.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,Joe.validateObject)(t,a,s);if(c&&(0,of.isArrayTypeGuard)(r))return(0,Yoe.validateArray)(t,c,s)}let d=p=>{let m=r(t,p),g=(0,qoe.getExpectedTypeName)(r);return m?(0,wD.createValidationResult)(!0,[],(0,ED.createTreeNode)(n,!0,g,t)):(()=>{let y=(0,Voe.createValidationError)(n,g,t,`Expected ${n} (${JSON.stringify(t)}) to be "${g}"`),S=(0,ED.createTreeNode)(n,!1,g,t);return S.errors=[y],(0,wD.createValidationResult)(!1,[y],S)})()};if((0,of.isNestedObjectTypeGuard)(r)){let p=o.config?{...o.config,identifier:n}:null;return d(p)}return d(null)};nf.validateProperty=Xoe});var af=T(sf=>{"use strict";Object.defineProperty(sf,"__esModule",{value:!0});sf.isNil=void 0;var Zoe=K(),Qoe=function(e,t){return e!=null?(t&&t.callbackOnError((0,Zoe.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};sf.isNil=Qoe});var oR=T(lf=>{"use strict";Object.defineProperty(lf,"__esModule",{value:!0});lf.isDefined=void 0;var ene=K(),tne=af(),rne=function(e,t){return(0,tne.isNil)(e,null)?(t&&t.callbackOnError((0,ene.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};lf.isDefined=rne});var nR=T(cf=>{"use strict";Object.defineProperty(cf,"__esModule",{value:!0});cf.reportValidationResults=void 0;var one=Yg(),TD=oR(),nne=af(),sne=(e,t)=>{if(e.valid===!0||(0,nne.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,TD.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,one.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,TD.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};cf.reportValidationResults=sne});var sR=T(Se=>{"use strict";Object.defineProperty(Se,"__esModule",{value:!0});Se.Validation=Se.reportValidationResults=Se.validateObject=Se.validateProperty=Se.createSimplifiedTree=Se.combineResults=Se.createTreeNode=Se.createValidationError=Se.createValidationResult=Se.getExpectedTypeName=void 0;var ine=Dc();Object.defineProperty(Se,"getExpectedTypeName",{enumerable:!0,get:function(){return ine.getExpectedTypeName}});var ane=is();Object.defineProperty(Se,"createValidationResult",{enumerable:!0,get:function(){return ane.createValidationResult}});var lne=ra();Object.defineProperty(Se,"createValidationError",{enumerable:!0,get:function(){return lne.createValidationError}});var cne=oa();Object.defineProperty(Se,"createTreeNode",{enumerable:!0,get:function(){return cne.createTreeNode}});var dne=Hc();Object.defineProperty(Se,"combineResults",{enumerable:!0,get:function(){return dne.combineResults}});var pne=Yg();Object.defineProperty(Se,"createSimplifiedTree",{enumerable:!0,get:function(){return pne.createSimplifiedTree}});var une=Qg();Object.defineProperty(Se,"validateProperty",{enumerable:!0,get:function(){return une.validateProperty}});var mne=$c();Object.defineProperty(Se,"validateObject",{enumerable:!0,get:function(){return mne.validateObject}});var gne=nR();Object.defineProperty(Se,"reportValidationResults",{enumerable:!0,get:function(){return gne.reportValidationResults}});var fne=is(),yne=Hc(),hne=ra(),Sne=oa(),Pne=Qg(),Ane=$c(),_ne=nR(),bne=Yg();Se.Validation={result:fne.createValidationResult,combine:yne.combineResults,error:hne.createValidationError,treeNode:Sne.createTreeNode,property:Pne.validateProperty,object:Ane.validateObject,report:_ne.reportValidationResults,createSimplifiedTree:bne.createSimplifiedTree}});var df=T(iR=>{"use strict";Object.defineProperty(iR,"__esModule",{value:!0});iR.isType=kne;var ID=cn(),CD=sR(),Rne=Dr();function kne(e){if(!(0,ID.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,CD.validateObject)(r,e,s);return(0,CD.reportValidationResults)(i,o||null),i.valid}return(0,ID.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,Rne.attachTypeGuardMeta)(t,{schema:e})}});var WD=T(as=>{"use strict";Object.defineProperty(as,"__esModule",{value:!0});as.isNestedType=as.isShape=void 0;as.isSchema=zc;var LD=cn(),vD=sR(),xD=Dr();function zc(e){if(!(0,LD.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=Ene(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,vD.validateObject)(o,t,i);return(0,vD.reportValidationResults)(a,n||null),a.valid}return(0,LD.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,xD.attachTypeGuardMeta)(r,{schema:t})}function wne(e){return typeof e=="function"?e:Array.isArray(e)?Tne(e):typeof e=="object"&&e!==null?zc(e):e}function Ene(e){let t={};for(let[r,o]of Object.entries(e))t[r]=wne(o);return t}function Tne(e){let t=e[0],r=zc(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,xD.attachTypeGuardMeta)(o,{itemGuard:r})}as.isShape=zc;as.isNestedType=zc});var OD=T(aR=>{"use strict";Object.defineProperty(aR,"__esModule",{value:!0});aR.isObjectWith=Cne;var Ine=df();function Cne(e){return(0,Ine.isType)(e)}});var jD=T(lR=>{"use strict";Object.defineProperty(lR,"__esModule",{value:!0});lR.isObject=vne;var Lne=df();function vne(e){return(0,Lne.isType)(e)}});var MD=T(cR=>{"use strict";Object.defineProperty(cR,"__esModule",{value:!0});cR.guardWithTolerance=xne;function xne(e,t,r){return t(e,r),e}});var ND=T(dR=>{"use strict";Object.defineProperty(dR,"__esModule",{value:!0});dR.isBranded=One;var Wne=K();function One(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,Wne.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var DD=T(pf=>{"use strict";Object.defineProperty(pf,"__esModule",{value:!0});pf.BrandSymbols=void 0;pf.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var HD=T(uf=>{"use strict";Object.defineProperty(uf,"__esModule",{value:!0});uf.isAny=void 0;var jne=function(e){return!0};uf.isAny=jne});var Uc=T(pR=>{"use strict";Object.defineProperty(pR,"__esModule",{value:!0});pR.reportTypeGuardError=Nne;var Mne=K();function Nne(e,t,r){e&&e.callbackOnError((0,Mne.generateTypeGuardError)(t,e.identifier,r))}});var FD=T(mf=>{"use strict";Object.defineProperty(mf,"__esModule",{value:!0});mf.isBoolean=void 0;var Dne=Uc(),Hne=function(t,r){return typeof t!="boolean"?((0,Dne.reportTypeGuardError)(r,t,"boolean"),!1):!0};mf.isBoolean=Hne});var $D=T(gf=>{"use strict";Object.defineProperty(gf,"__esModule",{value:!0});gf.isDate=void 0;var Fne=K(),$ne=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,Fne.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};gf.isDate=$ne});var uR=T(ff=>{"use strict";Object.defineProperty(ff,"__esModule",{value:!0});ff.isNumber=void 0;var zne=Uc(),Une=function(t,r){return typeof t!="number"||isNaN(t)?((0,zne.reportTypeGuardError)(r,t,"number"),!1):!0};ff.isNumber=Une});var zD=T(yf=>{"use strict";Object.defineProperty(yf,"__esModule",{value:!0});yf.isString=void 0;var Bne=Uc(),Gne=function(t,r){return typeof t!="string"?((0,Bne.reportTypeGuardError)(r,t,"string"),!1):!0};yf.isString=Gne});var UD=T(hf=>{"use strict";Object.defineProperty(hf,"__esModule",{value:!0});hf.isUnknown=void 0;var Kne=function(e){return!0};hf.isUnknown=Kne});var BD=T(Sf=>{"use strict";Object.defineProperty(Sf,"__esModule",{value:!0});Sf.isFunction=void 0;var Vne=K(),qne=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,Vne.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};Sf.isFunction=qne});var KD=T(Pf=>{"use strict";Object.defineProperty(Pf,"__esModule",{value:!0});Pf.isFile=void 0;var GD=K(),Jne=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,GD.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,GD.generateTypeGuardError)(e,t.identifier,"File")),!1)};Pf.isFile=Jne});var qD=T(Af=>{"use strict";Object.defineProperty(Af,"__esModule",{value:!0});Af.isFileList=void 0;var VD=K(),Yne=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,VD.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,VD.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Af.isFileList=Yne});var YD=T(_f=>{"use strict";Object.defineProperty(_f,"__esModule",{value:!0});_f.isBlob=void 0;var JD=K(),Xne=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,JD.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,JD.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};_f.isBlob=Xne});var ZD=T(bf=>{"use strict";Object.defineProperty(bf,"__esModule",{value:!0});bf.isFormData=void 0;var XD=K(),Zne=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,XD.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,XD.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};bf.isFormData=Zne});var eH=T(Rf=>{"use strict";Object.defineProperty(Rf,"__esModule",{value:!0});Rf.isURL=void 0;var QD=K(),Qne=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,QD.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,QD.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Rf.isURL=Qne});var rH=T(kf=>{"use strict";Object.defineProperty(kf,"__esModule",{value:!0});kf.isURLSearchParams=void 0;var tH=K(),ese=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,tH.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,tH.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};kf.isURLSearchParams=ese});var oH=T(wf=>{"use strict";Object.defineProperty(wf,"__esModule",{value:!0});wf.isMap=void 0;var tse=K(),rse=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,tse.generateTypeGuardError)(e,t.identifier,"Map")),!1)};wf.isMap=rse});var nH=T(Ef=>{"use strict";Object.defineProperty(Ef,"__esModule",{value:!0});Ef.isSet=void 0;var ose=K(),nse=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,ose.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Ef.isSet=nse});var sH=T(mR=>{"use strict";Object.defineProperty(mR,"__esModule",{value:!0});mR.isIndexSignature=ise;var sse=K();function ise(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,sse.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,p)=>{let m=s[d],g=e(d,o?{...o,identifier:`${o.identifier}[key:${p}]`}:null),y=t(m,o?{...o,identifier:`${o.identifier}[value:${p}]`}:null);return g&&y})}}});var iH=T(Tf=>{"use strict";Object.defineProperty(Tf,"__esModule",{value:!0});Tf.isError=void 0;var ase=Uc(),lse=function(t,r){return t instanceof Error?!0:((0,ase.reportTypeGuardError)(r,t,"Error"),!1)};Tf.isError=lse});var fR=T(gR=>{"use strict";Object.defineProperty(gR,"__esModule",{value:!0});gR.isArrayWithEachItem=pse;var cse=K(),dse=Dr();function pse(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,cse.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,dse.attachTypeGuardMeta)(t,{itemGuard:e})}});var yR=T(If=>{"use strict";Object.defineProperty(If,"__esModule",{value:!0});If.isNonEmptyArray=void 0;var use=K(),mse=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,use.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};If.isNonEmptyArray=mse});var aH=T(hR=>{"use strict";Object.defineProperty(hR,"__esModule",{value:!0});hR.isNonEmptyArrayWithEachItem=yse;var gse=fR(),fse=yR();function yse(e){return function(t,r){return(0,gse.isArrayWithEachItem)(e)(t,r)&&(0,fse.isNonEmptyArray)(t,r)}}});var cH=T(SR=>{"use strict";Object.defineProperty(SR,"__esModule",{value:!0});SR.isTuple=hse;var lH=K();function hse(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,lH.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,lH.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var dH=T(PR=>{"use strict";Object.defineProperty(PR,"__esModule",{value:!0});PR.isObjectWithEachItem=Pse;var Sse=K();function Pse(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,Sse.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var pH=T(AR=>{"use strict";Object.defineProperty(AR,"__esModule",{value:!0});AR.isPartialOf=_se;var Ase=cn();function _se(e){return function(t,r){if(!(0,Ase.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var uH=T(_R=>{"use strict";Object.defineProperty(_R,"__esModule",{value:!0});_R.isPick=Rse;var bse=cn();function Rse(e,...t){return function(r,o){if(!(0,bse.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var mH=T(bR=>{"use strict";Object.defineProperty(bR,"__esModule",{value:!0});bR.isOmit=wse;var kse=cn();function wse(e,...t){return function(r,o){if(!(0,kse.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let p=d.slice(9),m=p.indexOf(" ("),g=m>=0?p.slice(0,m):p;if(a.has(g))return!1;let y=g.startsWith(s+".")&&g.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var gH=T(Cf=>{"use strict";Object.defineProperty(Cf,"__esModule",{value:!0});Cf.isNonEmptyString=void 0;var Ese=K(),Tse=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,Ese.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Cf.isNonEmptyString=Tse});var fH=T(Lf=>{"use strict";Object.defineProperty(Lf,"__esModule",{value:!0});Lf.isNonNegativeNumber=void 0;var Ise=K(),Cse=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,Ise.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Lf.isNonNegativeNumber=Cse});var yH=T(vf=>{"use strict";Object.defineProperty(vf,"__esModule",{value:!0});vf.isPositiveNumber=void 0;var Lse=K(),vse=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,Lse.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};vf.isPositiveNumber=vse});var hH=T(xf=>{"use strict";Object.defineProperty(xf,"__esModule",{value:!0});xf.isNonPositiveNumber=void 0;var xse=K(),Wse=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,xse.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};xf.isNonPositiveNumber=Wse});var SH=T(Wf=>{"use strict";Object.defineProperty(Wf,"__esModule",{value:!0});Wf.isNegativeNumber=void 0;var Ose=K(),jse=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,Ose.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Wf.isNegativeNumber=jse});var PH=T(Of=>{"use strict";Object.defineProperty(Of,"__esModule",{value:!0});Of.isInteger=void 0;var Mse=K(),Nse=uR(),Dse=function(e,t){return!(0,Nse.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Mse.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Of.isInteger=Dse});var AH=T(jf=>{"use strict";Object.defineProperty(jf,"__esModule",{value:!0});jf.isPositiveInteger=void 0;var Hse=K(),Fse=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Hse.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};jf.isPositiveInteger=Fse});var _H=T(Mf=>{"use strict";Object.defineProperty(Mf,"__esModule",{value:!0});Mf.isNegativeInteger=void 0;var $se=K(),zse=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,$se.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Mf.isNegativeInteger=zse});var bH=T(Nf=>{"use strict";Object.defineProperty(Nf,"__esModule",{value:!0});Nf.isNonNegativeInteger=void 0;var Use=K(),Bse=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Use.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Nf.isNonNegativeInteger=Bse});var RH=T(Df=>{"use strict";Object.defineProperty(Df,"__esModule",{value:!0});Df.isNonPositiveInteger=void 0;var Gse=K(),Kse=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,Gse.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Df.isNonPositiveInteger=Kse});var kH=T(Ff=>{"use strict";Object.defineProperty(Ff,"__esModule",{value:!0});Ff.isNumeric=void 0;var Hf=K(),Vse=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Hf.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Hf.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Hf.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Hf.generateTypeGuardError)(e,t.identifier,"number key")),!1};Ff.isNumeric=Vse});var wH=T($f=>{"use strict";Object.defineProperty($f,"__esModule",{value:!0});$f.isBooleanLike=void 0;var RR=K(),qse=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,RR.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,RR.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};$f.isBooleanLike=qse});var EH=T(zf=>{"use strict";Object.defineProperty(zf,"__esModule",{value:!0});zf.isDateLike=void 0;var Bc=K(),Jse=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,Bc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,Bc.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,Bc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,Bc.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,Bc.generateTypeGuardError)(e,t.identifier,"date-like")),!1};zf.isDateLike=Jse});var TH=T(Uf=>{"use strict";Object.defineProperty(Uf,"__esModule",{value:!0});Uf.isBigInt=void 0;var Yse=K(),Xse=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,Yse.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Uf.isBigInt=Xse});var wR=T(kR=>{"use strict";Object.defineProperty(kR,"__esModule",{value:!0});kR.isOneOf=Zse;var IH=ta();function Zse(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,IH.stringify)(t)}) must be one of following values ${e.map(IH.stringify).join(" | ")}`),o}}});var CH=T(ER=>{"use strict";Object.defineProperty(ER,"__esModule",{value:!0});ER.isOneOfTypes=tie;var Qse=ta(),eie=Dc();function tie(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,Qse.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,eie.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let p=`- ${d}`;a.includes(p)||a.push(p)}})),r.callbackOnError(a.join(`
`))}return n}}});var LH=T(TR=>{"use strict";Object.defineProperty(TR,"__esModule",{value:!0});TR.isIntersectionOf=rie;function rie(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var vH=T(IR=>{"use strict";Object.defineProperty(IR,"__esModule",{value:!0});IR.isExtensionOf=oie;function oie(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var xH=T(CR=>{"use strict";Object.defineProperty(CR,"__esModule",{value:!0});CR.isNullOr=sie;var nie=Dr();function sie(e){function t(r,o){return r===null?!0:e(r,o)}return(0,nie.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var WH=T(LR=>{"use strict";Object.defineProperty(LR,"__esModule",{value:!0});LR.isUndefinedOr=aie;var iie=Dr();function aie(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,iie.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var OH=T(vR=>{"use strict";Object.defineProperty(vR,"__esModule",{value:!0});vR.isNilOr=cie;var lie=Dr();function cie(e){function t(r,o){return r==null?!0:e(r,o)}return(0,lie.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var jH=T(xR=>{"use strict";Object.defineProperty(xR,"__esModule",{value:!0});xR.isAsserted=die;function die(e){return!0}});var MH=T(WR=>{"use strict";Object.defineProperty(WR,"__esModule",{value:!0});WR.isEnum=uie;var pie=wR();function uie(e){return function(t,r){return(0,pie.isOneOf)(...Object.values(e))(t,r)}}});var NH=T(OR=>{"use strict";Object.defineProperty(OR,"__esModule",{value:!0});OR.isEqualTo=fie;var mie=K(),gie=ta();function fie(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,mie.generateTypeGuardError)(t,r.identifier,`equal to ${(0,gie.stringify)(e)}`)),!1):!0}}});var DH=T(Bf=>{"use strict";Object.defineProperty(Bf,"__esModule",{value:!0});Bf.isRegex=void 0;var yie=K(),hie=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,yie.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Bf.isRegex=hie});var FH=T(jR=>{"use strict";Object.defineProperty(jR,"__esModule",{value:!0});jR.isPattern=Sie;var HH=K();function Sie(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,HH.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,HH.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var $H=T(MR=>{"use strict";Object.defineProperty(MR,"__esModule",{value:!0});MR.by=Pie;function Pie(e){return function(t){return e(t,null)}}});var zH=T(NR=>{"use strict";Object.defineProperty(NR,"__esModule",{value:!0});NR.toNumber=Aie;function Aie(e){return typeof e=="number"?e:Number(e)}});var UH=T(DR=>{"use strict";Object.defineProperty(DR,"__esModule",{value:!0});DR.toDate=_ie;function _ie(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var BH=T(HR=>{"use strict";Object.defineProperty(HR,"__esModule",{value:!0});HR.toBoolean=bie;function bie(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var GH=T(Gf=>{"use strict";Object.defineProperty(Gf,"__esModule",{value:!0});Gf.isSymbol=void 0;var Rie=K(),kie=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,Rie.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Gf.isSymbol=kie});var na=T(R=>{"use strict";Object.defineProperty(R,"__esModule",{value:!0});R.isDateLike=R.isBooleanLike=R.isNumeric=R.isNonPositiveInteger=R.isNonNegativeInteger=R.isNegativeInteger=R.isPositiveInteger=R.isInteger=R.isNegativeNumber=R.isNonPositiveNumber=R.isPositiveNumber=R.isNonNegativeNumber=R.isNonEmptyString=R.isOmit=R.isPick=R.isPartialOf=R.isObjectWithEachItem=R.isNonNullObject=R.isTuple=R.isNonEmptyArrayWithEachItem=R.isNonEmptyArray=R.isArrayWithEachItem=R.isError=R.isIndexSignature=R.isSet=R.isMap=R.isURLSearchParams=R.isURL=R.isFormData=R.isBlob=R.isFileList=R.isFile=R.isFunction=R.isUnknown=R.isString=R.isNumber=R.isNil=R.isDefined=R.isDate=R.isBoolean=R.isAny=R.BrandSymbols=R.isBranded=R.guardWithTolerance=R.isObject=R.isObjectWith=R.isNestedType=R.isShape=R.isSchema=R.isType=void 0;R.isSymbol=R.toBoolean=R.toDate=R.toNumber=R.by=R.generateTypeGuardError=R.isPattern=R.isRegex=R.isEqualTo=R.isEnum=R.isAsserted=R.isNilOr=R.isUndefinedOr=R.isNullOr=R.isExtensionOf=R.isIntersectionOf=R.isOneOfTypes=R.isOneOf=R.isBigInt=void 0;var wie=df();Object.defineProperty(R,"isType",{enumerable:!0,get:function(){return wie.isType}});var FR=WD();Object.defineProperty(R,"isSchema",{enumerable:!0,get:function(){return FR.isSchema}});Object.defineProperty(R,"isShape",{enumerable:!0,get:function(){return FR.isShape}});Object.defineProperty(R,"isNestedType",{enumerable:!0,get:function(){return FR.isNestedType}});var Eie=OD();Object.defineProperty(R,"isObjectWith",{enumerable:!0,get:function(){return Eie.isObjectWith}});var Tie=jD();Object.defineProperty(R,"isObject",{enumerable:!0,get:function(){return Tie.isObject}});var Iie=MD();Object.defineProperty(R,"guardWithTolerance",{enumerable:!0,get:function(){return Iie.guardWithTolerance}});var Cie=ND();Object.defineProperty(R,"isBranded",{enumerable:!0,get:function(){return Cie.isBranded}});var Lie=DD();Object.defineProperty(R,"BrandSymbols",{enumerable:!0,get:function(){return Lie.BrandSymbols}});var vie=HD();Object.defineProperty(R,"isAny",{enumerable:!0,get:function(){return vie.isAny}});var xie=FD();Object.defineProperty(R,"isBoolean",{enumerable:!0,get:function(){return xie.isBoolean}});var Wie=$D();Object.defineProperty(R,"isDate",{enumerable:!0,get:function(){return Wie.isDate}});var Oie=oR();Object.defineProperty(R,"isDefined",{enumerable:!0,get:function(){return Oie.isDefined}});var jie=af();Object.defineProperty(R,"isNil",{enumerable:!0,get:function(){return jie.isNil}});var Mie=uR();Object.defineProperty(R,"isNumber",{enumerable:!0,get:function(){return Mie.isNumber}});var Nie=zD();Object.defineProperty(R,"isString",{enumerable:!0,get:function(){return Nie.isString}});var Die=UD();Object.defineProperty(R,"isUnknown",{enumerable:!0,get:function(){return Die.isUnknown}});var Hie=BD();Object.defineProperty(R,"isFunction",{enumerable:!0,get:function(){return Hie.isFunction}});var Fie=KD();Object.defineProperty(R,"isFile",{enumerable:!0,get:function(){return Fie.isFile}});var $ie=qD();Object.defineProperty(R,"isFileList",{enumerable:!0,get:function(){return $ie.isFileList}});var zie=YD();Object.defineProperty(R,"isBlob",{enumerable:!0,get:function(){return zie.isBlob}});var Uie=ZD();Object.defineProperty(R,"isFormData",{enumerable:!0,get:function(){return Uie.isFormData}});var Bie=eH();Object.defineProperty(R,"isURL",{enumerable:!0,get:function(){return Bie.isURL}});var Gie=rH();Object.defineProperty(R,"isURLSearchParams",{enumerable:!0,get:function(){return Gie.isURLSearchParams}});var Kie=oH();Object.defineProperty(R,"isMap",{enumerable:!0,get:function(){return Kie.isMap}});var Vie=nH();Object.defineProperty(R,"isSet",{enumerable:!0,get:function(){return Vie.isSet}});var qie=sH();Object.defineProperty(R,"isIndexSignature",{enumerable:!0,get:function(){return qie.isIndexSignature}});var Jie=iH();Object.defineProperty(R,"isError",{enumerable:!0,get:function(){return Jie.isError}});var Yie=fR();Object.defineProperty(R,"isArrayWithEachItem",{enumerable:!0,get:function(){return Yie.isArrayWithEachItem}});var Xie=yR();Object.defineProperty(R,"isNonEmptyArray",{enumerable:!0,get:function(){return Xie.isNonEmptyArray}});var Zie=aH();Object.defineProperty(R,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return Zie.isNonEmptyArrayWithEachItem}});var Qie=cH();Object.defineProperty(R,"isTuple",{enumerable:!0,get:function(){return Qie.isTuple}});var eae=cn();Object.defineProperty(R,"isNonNullObject",{enumerable:!0,get:function(){return eae.isNonNullObject}});var tae=dH();Object.defineProperty(R,"isObjectWithEachItem",{enumerable:!0,get:function(){return tae.isObjectWithEachItem}});var rae=pH();Object.defineProperty(R,"isPartialOf",{enumerable:!0,get:function(){return rae.isPartialOf}});var oae=uH();Object.defineProperty(R,"isPick",{enumerable:!0,get:function(){return oae.isPick}});var nae=mH();Object.defineProperty(R,"isOmit",{enumerable:!0,get:function(){return nae.isOmit}});var sae=gH();Object.defineProperty(R,"isNonEmptyString",{enumerable:!0,get:function(){return sae.isNonEmptyString}});var iae=fH();Object.defineProperty(R,"isNonNegativeNumber",{enumerable:!0,get:function(){return iae.isNonNegativeNumber}});var aae=yH();Object.defineProperty(R,"isPositiveNumber",{enumerable:!0,get:function(){return aae.isPositiveNumber}});var lae=hH();Object.defineProperty(R,"isNonPositiveNumber",{enumerable:!0,get:function(){return lae.isNonPositiveNumber}});var cae=SH();Object.defineProperty(R,"isNegativeNumber",{enumerable:!0,get:function(){return cae.isNegativeNumber}});var dae=PH();Object.defineProperty(R,"isInteger",{enumerable:!0,get:function(){return dae.isInteger}});var pae=AH();Object.defineProperty(R,"isPositiveInteger",{enumerable:!0,get:function(){return pae.isPositiveInteger}});var uae=_H();Object.defineProperty(R,"isNegativeInteger",{enumerable:!0,get:function(){return uae.isNegativeInteger}});var mae=bH();Object.defineProperty(R,"isNonNegativeInteger",{enumerable:!0,get:function(){return mae.isNonNegativeInteger}});var gae=RH();Object.defineProperty(R,"isNonPositiveInteger",{enumerable:!0,get:function(){return gae.isNonPositiveInteger}});var fae=kH();Object.defineProperty(R,"isNumeric",{enumerable:!0,get:function(){return fae.isNumeric}});var yae=wH();Object.defineProperty(R,"isBooleanLike",{enumerable:!0,get:function(){return yae.isBooleanLike}});var hae=EH();Object.defineProperty(R,"isDateLike",{enumerable:!0,get:function(){return hae.isDateLike}});var Sae=TH();Object.defineProperty(R,"isBigInt",{enumerable:!0,get:function(){return Sae.isBigInt}});var Pae=wR();Object.defineProperty(R,"isOneOf",{enumerable:!0,get:function(){return Pae.isOneOf}});var Aae=CH();Object.defineProperty(R,"isOneOfTypes",{enumerable:!0,get:function(){return Aae.isOneOfTypes}});var _ae=LH();Object.defineProperty(R,"isIntersectionOf",{enumerable:!0,get:function(){return _ae.isIntersectionOf}});var bae=vH();Object.defineProperty(R,"isExtensionOf",{enumerable:!0,get:function(){return bae.isExtensionOf}});var Rae=xH();Object.defineProperty(R,"isNullOr",{enumerable:!0,get:function(){return Rae.isNullOr}});var kae=WH();Object.defineProperty(R,"isUndefinedOr",{enumerable:!0,get:function(){return kae.isUndefinedOr}});var wae=OH();Object.defineProperty(R,"isNilOr",{enumerable:!0,get:function(){return wae.isNilOr}});var Eae=jH();Object.defineProperty(R,"isAsserted",{enumerable:!0,get:function(){return Eae.isAsserted}});var Tae=MH();Object.defineProperty(R,"isEnum",{enumerable:!0,get:function(){return Tae.isEnum}});var Iae=NH();Object.defineProperty(R,"isEqualTo",{enumerable:!0,get:function(){return Iae.isEqualTo}});var Cae=DH();Object.defineProperty(R,"isRegex",{enumerable:!0,get:function(){return Cae.isRegex}});var Lae=FH();Object.defineProperty(R,"isPattern",{enumerable:!0,get:function(){return Lae.isPattern}});var vae=K();Object.defineProperty(R,"generateTypeGuardError",{enumerable:!0,get:function(){return vae.generateTypeGuardError}});var xae=$H();Object.defineProperty(R,"by",{enumerable:!0,get:function(){return xae.by}});var Wae=zH();Object.defineProperty(R,"toNumber",{enumerable:!0,get:function(){return Wae.toNumber}});var Oae=UH();Object.defineProperty(R,"toDate",{enumerable:!0,get:function(){return Oae.toDate}});var jae=BH();Object.defineProperty(R,"toBoolean",{enumerable:!0,get:function(){return jae.toBoolean}});var Mae=GH();Object.defineProperty(R,"isSymbol",{enumerable:!0,get:function(){return Mae.isSymbol}})});var sa,KH,Nae,VH,qH=l(()=>{"use strict";sa=u(require("node:path")),KH=require("node:url"),Nae=()=>!0,VH=()=>{if(Nae()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?sa.default.dirname(sa.default.resolve(e)):sa.default.dirname(sa.default.resolve(__filename))}return sa.default.dirname((0,KH.fileURLToPath)(__agentWitchImportMetaUrl))}});var $R,JH,V,YH,Dae,Hr,zR,L,Gc,Gt,UR,Kc,ls,BR,GR,KR,Vc,we,dn,Kf,nt,Vf,z,VR=l(()=>{"use strict";$R=u(require("node:fs")),JH=u(require("node:os")),V=u(require("node:path")),YH=u(na());Fe();qH();xc();xc();Dae=VH(),Hr=e=>e.trim().toLowerCase(),zR=e=>Hr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return V.default.resolve(e);let t=V.default.resolve(Dae),r=V.default.basename(t),o=V.default.basename(V.default.dirname(t));return r===qb&&(o===Mr||o===fo)?V.default.dirname(t):r===Mr||r===fo?t:V.default.join(JH.default.homedir(),Mr)},Gc=(e=L())=>V.default.join(e,qb),Gt=(e=L())=>V.default.join(Gc(e),nD),UR=(e,t,r)=>t!==null?V.default.join(e,mt,t,r):V.default.join(e,r),Kc=e=>UR(e.installDir,e.profileEmail,Lc),ls=e=>UR(e.installDir,e.profileEmail,dr),BR=e=>V.default.join(e.logsDir,ts),GR=e=>V.default.join(e.logsDir,rs),KR=e=>UR(e.installDir,e.profileEmail,vc),Vc=e=>e.profileEmail!==null?V.default.join(e.installDir,mt,e.profileEmail,an):V.default.join(e.installDir,an),we=(e=L())=>os(e),dn=(e=L())=>ln(e)?Mg:jg,Kf=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Hr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Hr(t):null},nt=(e=L())=>{let t=V.default.join(e,Vb);if(!$R.default.existsSync(t))return null;try{let r=JSON.parse($R.default.readFileSync(t,"utf8"));if((0,YH.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Hr(r.email)}catch{return null}return null},Vf=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Hr(r):null}let t=Kf();return t!==null?t:nt()},z=e=>{let t=L(),r=Gc(t),o=Gt(t),n=Vf(e);if(n!==null){let y=V.default.join(t,mt,n),S=V.default.join(y,Ng),A=V.default.join(y,Lc),E=V.default.join(y,es.projectDataDir),I=V.default.join(y,dr),f=V.default.join(y,vc),P=V.default.join(y,an),_=V.default.join(y,dr,ts),h=V.default.join(y,dr,rs);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:A,projectDataDir:E,logsDir:I,mainLogPath:_,errorLogPath:h,reportsDir:f,deviceKeypairPath:P,configPath:V.default.join(y,"config.json"),harnessRootDir:S,harnessManifestPath:V.default.join(S,Hg),harnessSetsDir:V.default.join(S,Dg)}}let s=V.default.join(t,Ng),i=V.default.join(t,Lc),a=V.default.join(t,es.projectDataDir),c=V.default.join(t,dr),d=V.default.join(t,vc),p=V.default.join(t,an),m=V.default.join(t,dr,ts),g=V.default.join(t,dr,rs);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:m,errorLogPath:g,reportsDir:d,deviceKeypairPath:p,configPath:V.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:V.default.join(s,Hg),harnessSetsDir:V.default.join(s,Dg)}}});var ia,qR=l(()=>{"use strict";ia=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var Hae,aa,JR=l(()=>{"use strict";Hae=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},aa=e=>e.filePort??Hae(e.envValue)??e.defaultPort});var YR,XH,Fae,qc,la,ZH=l(()=>{"use strict";YR=u(require("node:fs")),XH=u(require("node:path"));Fe();VR();qR();JR();Fae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qc=e=>{let t=XH.default.join(e,Cc.wakePort);if(!YR.default.existsSync(t))return null;try{let r=JSON.parse(YR.default.readFileSync(t,"utf8"));if(Fae(r)&&ia(r.wakePort))return r.wakePort}catch{return null}return null},la=(e=L())=>aa({filePort:qc(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:dn(e)})});var XR={};vt(XR,{isAgentWitchLocalInstallDir:()=>ln,isValidAgentWitchWakePort:()=>ia,readActiveProfileEmailFromFile:()=>nt,readAgentWitchWakePortFromFile:()=>qc,resolveActiveProfileEmail:()=>Vf,resolveActiveProfileEmailFromEnv:()=>Kf,resolveAgentWitchAppBundlePath:()=>Gt,resolveAgentWitchAppDir:()=>Gc,resolveAgentWitchDefaultWakePort:()=>dn,resolveAgentWitchDeviceKeypairPath:()=>Vc,resolveAgentWitchErrorLogPath:()=>GR,resolveAgentWitchInstallDir:()=>L,resolveAgentWitchLaunchAgentPrefix:()=>we,resolveAgentWitchLocalLayout:()=>z,resolveAgentWitchLogsDir:()=>ls,resolveAgentWitchMainLogPath:()=>BR,resolveAgentWitchProjectsDir:()=>Kc,resolveAgentWitchReportsDir:()=>KR,resolveAgentWitchRuntimeWakePort:()=>la,resolveAgentWitchWakePortFromSources:()=>aa,sanitizeProfileEmailForDir:()=>Hr,sanitizeProfileEmailForLaunchAgentLabel:()=>zR});var X=l(()=>{"use strict";VR();qR();ZH();JR()});var ZR,QR,qf=l(()=>{"use strict";ZR=new Set(["","loginwindow","_mbsetupuser","root"]),QR=5e3});var QH,$ae,eF,ek,tk=l(()=>{"use strict";QH=require("node:child_process");qf();$ae=e=>e.trim().toLowerCase(),eF=e=>e==null?!1:!ZR.has($ae(e)),ek=()=>{if(process.platform!=="darwin")return null;try{let t=(0,QH.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return eF(t)?t:null}catch{return null}}});var rF,tF,ur,Jc=l(()=>{"use strict";rF=u(require("node:os"));tk();tF=e=>e.trim().toLowerCase(),ur=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?ek():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??rF.default.userInfo().username;return tF(r)===tF(o)}});var oF,nF,cs,sF=l(()=>{"use strict";oF=require("node:child_process"),nF=u(require("node:fs"));X();Jc();cs=(e=L())=>{let t=Gt(e);if(!nF.default.existsSync(t))return{ok:!1,errorMessage:"AgentWitch install not found."};if(!ur())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=nt(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,oF.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var rk,Kt,ca,iF=l(()=>{"use strict";rk="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",Kt=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[rk]==="1"},ca=e=>`Refusing ${e} host side effects under VITEST (set ${rk}=1 to override).`});var ds=l(()=>{"use strict";iF()});var aF,Yc,Jf=l(()=>{"use strict";aF=require("node:child_process");ds();Yc=e=>{if(process.platform!=="darwin"||!Kt())return;let t=process.getuid?.();if(t!==void 0)try{(0,aF.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Yf,ok,lF,Pe,Xf,Xc=l(()=>{"use strict";Yf=u(require("node:fs")),ok=u(require("node:path"));X();Fe();lF=e=>{let t=ok.default.join(e,mt);return Yf.default.existsSync(t)?Yf.default.readdirSync(t).filter(r=>Yf.default.statSync(ok.default.join(t,r)).isDirectory()).map(r=>Hr(r)).toSorted():[]},Pe=(e=L())=>{let t=we(e),r=lF(e);return[{profileEmail:nt(e)??r[0]??null,launchAgentLabel:t}]},Xf=(e=L())=>lF(e)});var nk,cF,dF,zae,yo,Zf=l(()=>{"use strict";nk=u(require("node:fs")),cF=u(require("node:os")),dF=u(require("node:path"));X();Xc();zae=()=>dF.default.join(cF.default.homedir(),"Library","LaunchAgents"),yo=(e=L())=>{let t=we(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of Pe(e))r.add(n.launchAgentLabel);let o=zae();if(nk.default.existsSync(o))for(let n of nk.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var pF,Zc,uF=l(()=>{"use strict";X();Jf();Zf();Xc();pF=(e=L())=>{let t=new Set(Pe(e).map(r=>r.launchAgentLabel));return yo(e).filter(r=>!t.has(r))},Zc=(e=L())=>{for(let t of pF(e))Yc(t)}});var Qc,sk=l(()=>{"use strict";X();Jf();Zf();Qc=(e=L())=>{for(let t of yo(e))Yc(t)}});var mF,gF,Uae,ps,fF=l(()=>{"use strict";mF=require("node:child_process"),gF=require("node:util"),Uae=(0,gF.promisify)(mF.execFile),ps=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Uae("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var us,Bae,ik,ak=l(()=>{"use strict";us=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bae=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,ik=e=>{let t=e.pathValue??Bae(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${us(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${us(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${us(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${us(e.homeDir)}</string>
    <key>PATH</key>
    <string>${us(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${us(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${us(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Qf,lk=l(()=>{"use strict";Qf=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var ed,ck,ey,ty,ho,ry=l(()=>{"use strict";ed=u(require("node:fs")),ck=u(require("node:os")),ey=u(require("node:path"));Fe();X();ak();lk();ty=(e,t=ck.default.homedir())=>ey.default.join(t,"Library","LaunchAgents",`${e}.plist`),ho=e=>{let t=e.installDir??L(),r=e.homeDir??ck.default.homedir(),o=ty(e.launchAgentLabel,r),n=ed.default.existsSync(o)?ed.default.readFileSync(o,"utf8"):null;if(n!==null&&Qf(n))return{ok:!0,rewritten:!1,plistPath:o};let s=ik({launchAgentLabel:e.launchAgentLabel,runPath:ey.default.join(t,Og,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??la(t)});if(!Qf(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{ed.default.mkdirSync(ey.default.dirname(o),{recursive:!0}),ed.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var hF,SF,PF,td,Gae,Kae,yF,st,dk=l(()=>{"use strict";hF=require("node:child_process"),SF=u(require("node:fs")),PF=require("node:util");X();ds();ry();Jc();td=(0,PF.promisify)(hF.execFile),Gae=async e=>{try{return await td("launchctl",["print",e]),!0}catch{return!1}},Kae=async(e,t,r)=>{await Gae(t)&&await td("launchctl",["bootout",t]).catch(()=>{}),await td("launchctl",["bootstrap",e,r]),await td("launchctl",["enable",t])},yF=async e=>{try{return await td("launchctl",["kickstart","-k",e]),!0}catch{return!1}},st=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Kt())return{ok:!1,errorMessage:ca("launchctl")};if(!ur())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=ho({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await yF(n))return{ok:!0};let i=s.plistPath;if(!SF.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Kae(o,n,i),await yF(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var ms,AF=l(()=>{"use strict";X();dk();Xc();ms=async(e=L(),t=process.platform)=>{if(t!=="darwin")return[];let r=[];for(let o of Pe(e))(await st(o.launchAgentLabel,e)).ok&&r.push(o.launchAgentLabel);return r}});var oy,da,_F,bF,RF,kF=l(()=>{"use strict";oy=require("node:child_process"),da=u(require("node:fs")),_F="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",bF=e=>{try{return(0,oy.execFileSync)("plutil",["-extract",_F,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},RF=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=da.default.statSync(e);try{da.default.copyFileSync(e,r),(0,oy.execFileSync)("plutil",["-replace",_F,"-string",String(t),r],{stdio:"ignore"}),(0,oy.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),da.default.chmodSync(r,o&4095),da.default.renameSync(r,e)}finally{da.default.rmSync(r,{force:!0})}}});var wF,EF=l(()=>{"use strict";X();wF=e=>ia(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var TF,IF,Vae,rd,CF=l(()=>{"use strict";TF=u(require("node:fs")),IF=u(require("node:os"));kF();EF();ry();Vae=(e,t)=>{let r=wF({filePort:t,plistValue:bF(e)});return r.kind!=="sync"?!1:(RF(e,r.wakePort),!0)},rd=e=>{let t=e.homeDir??IF.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>ty(o,t)).filter(o=>TF.default.existsSync(o)).filter(o=>Vae(o,e.wakePort))}});var Wt,So,LF=l(()=>{"use strict";sk();Jc();qf();Wt=e=>{ur()||(Qc(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},So=(e,t=QR)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{ur()||e()},t);return()=>{clearInterval(r)}}});var ye=l(()=>{"use strict";SD();sF();Jf();uF();sk();Zf();Jc();fF();AF();dk();ry();lk();CF();ak();Xc();tk();qf();LF()});var pk=l(()=>{"use strict";ye()});var od,vF,ny,xF,pa,WF,OF,pn=l(()=>{"use strict";od=".agent-witch",vF="memory",ny="project.json",xF="chunks.ndjson",pa="runs.ndjson",WF="reports",OF=".json"});var jF=l(()=>{"use strict";pn()});var MF,sy,uk=l(()=>{"use strict";MF=u(require("node:path"));jF();sy=(e,t)=>MF.default.join(e.trim(),`${t.trim()}${OF}`)});var nd,NF,DF=l(()=>{"use strict";nd="agent-witch.js",NF="command"});var iy=l(()=>{"use strict";DF()});var gs,HF,FF=l(()=>{"use strict";iy();gs=e=>`'${e.replace(/'/g,"'\\''")}'`,HF=e=>{let t=`${e.installDir.trim()}/${"app"}/${nd}`,r=[gs("node"),gs(t),"report","write","--key",gs(e.reportKey.trim()),"--agent-run-id",gs(e.agentRunId.trim()),"--status",gs(e.status),"--summary",gs(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",gs(e.details.trim())),r.join(" ")}});var Fr,$F,qae,mk,ay=l(()=>{"use strict";uk();FF();Fr={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},$F=e=>e===Fr.COMPLETED||e===Fr.FAILED,qae=e=>["Maintain a machine-readable job report so the user can check status later.","AgentWitch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),mk=(e,t)=>{let r=sy(t.reportsDir,t.reportKey),o=HF({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:Fr.IN_PROGRESS,summary:"Task started on your computer."});return`${e.trim()}

---
${qae({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var it=l(()=>{"use strict";Fe();X()});var id,UF,zF,BF,Jae,ua,Yae,GF,ad,ld,gk,KF,VF,cd=l(()=>{"use strict";id=u(require("node:fs")),UF=u(require("node:path"));ay();uk();it();zF=50,BF=e=>{let t=z(),r=sy(t.reportsDir,e);return id.default.mkdirSync(UF.default.dirname(r),{recursive:!0}),r},Jae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},ua=e=>{let t=BF(e);if(!id.default.existsSync(t))return null;try{let r=JSON.parse(id.default.readFileSync(t,"utf8"));return Jae(r)?r:null}catch{return null}},Yae=(e,t)=>{let r=[...e,t];return r.length>zF?r.slice(r.length-zF):r},GF=e=>{let t=BF(e.reportKey);id.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},ad=e=>{let t=ua(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Yae(t?.history??[],o)};return GF(n),n},ld=e=>{let t=ua(e.reportKey);return t!==null?t:ad({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Fr.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},gk=(e,t)=>{let r=t.trim();if(r.length===0)return ua(e);let o=ua(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return GF(s),s},KF=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},VF=e=>{if(e===null||!$F(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===Fr.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var Xae,Zae,dd,qF,ly,fk=l(()=>{"use strict";ay();cd();Xae=new Set(Object.values(Fr)),Zae=e=>Xae.has(e),dd=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},qF=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},ly=e=>{if(e[0]!=="write")return qF(),1;let r=dd(e,"--key"),o=dd(e,"--agent-run-id"),n=dd(e,"--status"),s=dd(e,"--summary"),i=dd(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!Zae(n)?(qF(),1):(ad({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Ot,fs=l(()=>{"use strict";Ot=()=>!0});var yk,JF,ys,cy=l(()=>{"use strict";yk=u(require("node:path")),JF=require("node:url");fs();ys=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=yk.default.resolve(t);return Ot()?r===yk.default.resolve(__filename):e===void 0?!1:r===(0,JF.fileURLToPath)(e)}});var hk,Sk,Pk,Ak,We,_k=l(()=>{"use strict";hk=["block","warn","info"],Sk=["seed","project","retired"],Pk="warn",Ak="29b404a2-d2be-45bf-8f88-143b675a94f2",We={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var bk,Po,QF,e$,Rk,un,t$=l(()=>{"use strict";_k();bk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Po=e=>typeof e=="string"?e:null,QF=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],e$=e=>{if(!bk(e))return null;let t=Po(e.id)?.trim()??"",r=Po(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=Sk.find(d=>d===e.source)??"project",n=hk.find(d=>d===e.severity)??Pk,s=bk(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=Po(s?.value)?.trim()??"",c=Po(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:Po(e.cause)?.trim()??"",avoidance:Po(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:QF(e.keywords),tags:QF(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:Po(e.lastSeenAt),updatedAt:Po(e.updatedAt),severity:n}},Rk=e=>!bk(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>e$(t)).filter(t=>t!==null),syncedAt:Po(e.syncedAt)},un=e=>e.filter(t=>t.source!=="retired").length});var hs,kk=l(()=>{"use strict";hs=e=>e.replace(/\s+/g," ").trim()});var mr,wk=l(()=>{"use strict";mr=e=>Math.ceil(e.length/4)});var dy,r$=l(()=>{"use strict";wk();dy=(e,t)=>{if(t<=0)return"";if(mr(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var pd,o$=l(()=>{"use strict";kk();pd=e=>`${hs(e.id)}|${hs(e.avoidance)}`});var n$=l(()=>{"use strict"});var gt=l(()=>{"use strict";_k();t$();kk();wk();r$();o$();n$()});var Ss,ma,ga,fa,ud,py,s$,i$,a$,l$,c$,md,gd,uy,ya,my,Ek,gr=l(()=>{"use strict";Ss="agent-witch-token-saver",ma=`# BEGIN ${Ss}`,ga=`# END ${Ss}`,fa=`<!-- BEGIN ${Ss} -->`,ud=`<!-- END ${Ss} -->`,py=".cursor/rules/agent-witch-check-context.mdc",s$=".cursor/mcp.json",i$=".codex/config.toml",a$=".codex/AGENTS.md",l$=".claude/settings.json",c$="declined-projects.json",md="agent-witch",gd="agent-witch",uy=["mcp"],ya="mcp-hook",my="check_context",Ek=`${gd} ${ya} ${my}`});var gy,fy,yy,ha,Tk,fd,hy=l(()=>{"use strict";gt();gr();gy=We.symptom,fy=We.cause,yy=We.avoidance,ha=64,Tk="token-saver.db",fd=1});var Sy,Sa,rle,GTe,Ps=l(()=>{"use strict";Sy="agent-witch.js",Sa="deps.tar.gz",rle="install.sh",GTe={mainScript:`app/${Sy}`,depsArchive:`app/${Sa}`,installShell:rle}});var d$=l(()=>{"use strict";Ps()});var p$=l(()=>{"use strict";Ps();Ps();d$()});var yd,Ck,Py,sle,hd,De,Aa,Sd,Pd,As,Lk=l(()=>{"use strict";yd=u(require("node:fs")),Ck=u(require("node:path"));p$();X();Py="install-version.json",sle=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hd=(e=L())=>Ck.default.join(e,Py),De=(e=L())=>{let t=hd(e);if(!yd.default.existsSync(t))return null;try{let r=JSON.parse(yd.default.readFileSync(t,"utf8"));return!sle(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Aa=(e,t=L())=>{let r=hd(t);yd.default.mkdirSync(Ck.default.dirname(r),{recursive:!0}),yd.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Sd=(e=L())=>De(e)?.bundleVersion??"277",Pd=(e,t)=>{let r=De(e);if(r!==null)return r;let o={bundleVersion:"277",appOrigin:t,updatedAt:new Date().toISOString()};return Aa(o,e),o},As=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var u$,_s,vk,xk,Wk,Ay,$r,bs,Ok=l(()=>{"use strict";u$=require("node:crypto"),_s=u(require("node:fs")),vk=u(require("node:path"));X();xk="self-update-log.ndjson",Wk=100,Ay=(e=L())=>{let t=z(),r=t.installDir===e?t.logsDir:ls({installDir:e,profileEmail:t.profileEmail});return vk.default.join(r,xk)},$r=(e,t=L())=>{let r={id:(0,u$.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Ay(t);_s.default.mkdirSync(vk.default.dirname(o),{recursive:!0});let n=_s.default.existsSync(o)?_s.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Wk+1)),JSON.stringify(r)];return _s.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},bs=(e=20,t=L())=>{let r=Ay(t);if(!_s.default.existsSync(r))return[];let o=_s.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var jk,uIe,Mk=l(()=>{"use strict";Ps();jk="deps",uIe=`${"app"}/${Sa}`});var m$=l(()=>{"use strict";Mk()});var g$,mn,Rs,f$,Nk,Dk,y$=l(()=>{"use strict";g$=require("node:child_process"),mn=u(require("node:fs")),Rs=u(require("node:path"));Ps();Mk();f$=e=>Rs.default.join(e,"app",jk),Nk=e=>{let t=Rs.default.join(e,"app"),r=Rs.default.join(t,Sa);mn.default.existsSync(r)&&(mn.default.rmSync(f$(e),{recursive:!0,force:!0}),mn.default.mkdirSync(t,{recursive:!0}),(0,g$.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),mn.default.rmSync(r,{force:!0}))},Dk=e=>{mn.default.rmSync(Rs.default.join(e,"node_modules"),{recursive:!0,force:!0}),mn.default.rmSync(Rs.default.join(e,"package.json"),{force:!0}),mn.default.rmSync(Rs.default.join(e,"package-lock.json"),{force:!0})}});var h$=l(()=>{"use strict";m$();y$()});var qt,_a=l(()=>{"use strict";qt=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var Ad,_y,S$,ile,Hk,ale,P$,lle,zk,cle,Uk,Jt,_d,bd,Bk,Fk,$k,Rd,ba,Gk,Kk,Ra=l(()=>{"use strict";Ad=u(require("node:fs")),_y=u(require("node:path"));_a();S$="active-writer-work.json",ile=1440*60*1e3,Hk=new Set,ale=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),P$=e=>e.profileEmail===null?_y.default.join(e.installDir,S$):_y.default.join(e.installDir,"profiles",e.profileEmail,S$),lle=e=>{let t=P$(e);if(!Ad.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(Ad.default.readFileSync(t,"utf8"));if(!ale(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},zk=(e,t)=>{let r=P$(e);Ad.default.mkdirSync(_y.default.dirname(r),{recursive:!0}),Ad.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},cle=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??qt;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>ile},Uk=e=>{let t=lle(e);if(!cle(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{zk(e,r)}catch{}return r},Jt=e=>Uk(e).activeCount>0,_d=e=>{let t=Uk(e);zk(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},bd=e=>{let t=Uk(e),r=Math.max(0,t.activeCount-1);if(zk(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of Hk)o()},Bk=e=>(Hk.add(e),()=>{Hk.delete(e)}),Fk=null,$k=null,Rd=e=>{Fk=e},ba=e=>{$k=e},Gk=()=>{let e=Fk;return Fk=null,e},Kk=()=>{let e=$k;return $k=null,e}});var Je,by=l(()=>{"use strict";Je=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var A$=l(()=>{"use strict";Qi()});var Ry,ky,wy=l(()=>{"use strict";Ry="AGENT_WITCH_EXTERNAL_BRIDGE",ky="AGENT_WITCH_EXTERNAL_LIVE"});var _$=l(()=>{"use strict";wy();Qi()});var b$,kd,R$=l(()=>{"use strict";b$=require("node:child_process");Qi();kd=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,b$.spawn)("systemctl",["--user","restart",Nr],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${Nr} exited ${o??"unknown"}`))})})});var Vk=l(()=>{"use strict";Qi();A$();_$();R$()});var qk,Jk,k$,ple,Yk,Xk,ule,mle,gle,fle,wd,Zk=l(()=>{"use strict";qk=require("node:child_process"),Jk=u(require("node:fs")),k$=u(require("node:path"));Vk();ye();X();Fe();ple="[agent-witch] Restarting into bundle",Yk=null,Xk=e=>{Yk=e},ule=()=>process.platform==="linux"&&typeof process.env.INVOCATION_ID=="string"&&process.env.INVOCATION_ID.length>0,mle=e=>k$.default.join(e,Og,"run.sh"),gle=e=>{let t=mle(e);if(Jk.default.existsSync(t)){let n=process.platform==="linux"?"setsid":t,s=process.platform==="linux"?[t]:[];return(0,qk.spawn)(n,s,{cwd:e,detached:!0,stdio:"ignore",env:process.env}).unref(),{ok:!0}}let r=Gt(e);return Jk.default.existsSync(r)?((0,qk.spawn)(process.execPath,[r],{cwd:e,detached:!0,stdio:"ignore",env:process.env}).unref(),{ok:!0}):{ok:!1,errorMessage:"AgentWitch install bundle entrypoint is missing."}},fle=async()=>{Yk!==null&&await Yk()},wd=async e=>{let t=e.exitProcess??(o=>process.exit(o));if(console.log(`${ple} ${e.bundleVersion}`),await fle(),process.platform==="darwin"){Zc();let o=await ms(e.installDir);if(o.length>0)return t(0),{ok:!0,mode:"launchd",message:`Restarted LaunchAgent(s): ${o.join(", ")}.`}}if(process.platform==="linux"&&ule())try{return await kd(),t(0),{ok:!0,mode:"systemd",message:"Restarted agent-witch.service systemd user unit."}}catch(o){let n=o instanceof Error?o.message:String(o);console.warn(`[agent-witch] systemd restart after bundle update failed: ${n}`)}let r=gle(e.installDir);return r.ok?(t(0),{ok:!0,mode:"detached-relaunch",message:"Relaunched AgentWitch host process."}):{ok:!1,mode:"skipped",message:r.errorMessage??"Could not relaunch AgentWitch after bundle update."}}});var ka,Ey,Ed,Qk=l(()=>{"use strict";ka="qwen2.5:7b",Ey="nomic-embed-text",Ed="Install Ollama from https://ollama.com/download"});var Td,ew,Ty=l(()=>{"use strict";Qk();Td=()=>`
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
    echo "Ollama is missing. ${Ed}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Ed}" >&2
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
  agent_witch_ensure_ollama_model "${ka}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Ey}" "\${pull_log}"
}
`,ew=()=>`
${Td()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. AgentWitch will continue without it." >&2
`});var w$,yle,Iy,tw=l(()=>{"use strict";w$=require("node:child_process");X();ds();Ty();yle=e=>new Promise(t=>{if(!Kt()){t({exitCode:1,output:ca("Ollama")});return}let r=(0,w$.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Iy=async(e=yle)=>{let t=`${Td()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var gn,Cy,E$,hle,T$,Ea,Sle,Ple,wa,ks,ws,I$=l(()=>{"use strict";gn=u(require("node:fs")),Cy=u(require("node:path"));h$();X();Ps();pr();Lk();Ra();by();Ok();Zk();tw();E$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hle=e=>{let t=nt(e),r=t===null?z():z(t);if(!gn.default.existsSync(r.configPath))return null;try{let o=JSON.parse(gn.default.readFileSync(r.configPath,"utf8"));return!E$(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},T$=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!E$(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Ea=async e=>(await T$(e))?.bundleVersion??null,Sle=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Cy.default.join(t,r);gn.default.mkdirSync(Cy.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());gn.default.writeFileSync(n,s),r.endsWith(".js")&&gn.default.chmodSync(n,493)},Ple=(e,t)=>e!==null?Je(e):t??xt,wa=(e,t)=>({localBundleVersion:t,...e}),ks=async e=>{let t=L(),r=De(t),o=r?.bundleVersion??null,n=await Iy();$r({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=hle(t),i=Ple(s,r?.appOrigin);if(i===null){let d=wa({ok:!1,updated:!1,message:"Could not resolve the AgentWitch app origin for updates.",remoteBundleVersion:null},o);return $r({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await T$(i);if(a===null){let d=wa({ok:!1,updated:!1,message:"Could not fetch the remote AgentWitch install bundle.",remoteBundleVersion:null},o);return $r({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||As(o,a.bundleVersion))){let d=wa({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return $r({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let y of a.scripts)await Sle(i,t,y);let d=Cy.default.join(t,Sy);gn.default.existsSync(d)&&gn.default.rmSync(d,{force:!0}),Nk(t),Dk(t),Aa({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let p=z(nt(t));if(Jt(p)){ba("install-bundle-update");let y=wa({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return $r({event:"update_applied",ok:!0,message:y.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),y}let m=await wd({installDir:t,bundleVersion:a.bundleVersion});m.ok||console.warn(`[agent-witch-self-update] Host restart after bundle update failed: ${m.message}`);let g=wa({ok:!0,updated:!0,message:`Updated AgentWitch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return $r({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let p=d instanceof Error?d.message:"AgentWitch self-update failed.",m=wa({ok:!1,updated:!1,message:p,remoteBundleVersion:a.bundleVersion},o);return $r({event:"update_failed",ok:!1,message:p,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),m}},ws=()=>{let e=L();return{local:De(e),logs:bs(20,e)}}});var C$={};vt(C$,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Py,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Ed,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Ey,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>ka,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>xk,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>Wk,appendAgentWitchSelfUpdateLog:()=>$r,buildAgentWitchEnsureOllamaShell:()=>Td,buildAgentWitchInstallScriptOllama:()=>ew,buildAgentWitchSelfUpdateStatus:()=>ws,ensureAgentWitchInstallVersionRecorded:()=>Pd,ensureAgentWitchOllamaInstalled:()=>Iy,fetchAgentWitchRemoteInstallBundleVersion:()=>Ea,isRemoteAgentWitchBundleVersionNewer:()=>As,readAgentWitchInstallVersion:()=>De,readAgentWitchSelfUpdateLogs:()=>bs,resolveAgentWitchAppOriginFromWsUrl:()=>Je,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Sd,resolveAgentWitchInstallVersionPath:()=>hd,resolveAgentWitchSelfUpdateLogPath:()=>Ay,runAgentWitchSelfUpdate:()=>ks,writeAgentWitchInstallVersion:()=>Aa});var zr=l(()=>{"use strict";Lk();Ok();I$();by();Qk();Ty();tw()});var rw={};vt(rw,{buildAgentWitchSelfUpdateStatus:()=>ws,fetchAgentWitchRemoteInstallBundleVersion:()=>Ea,runAgentWitchSelfUpdate:()=>ks});var ow=l(()=>{"use strict";zr()});function Ta(e){return(0,L$.createHash)("sha256").update(e.trim()).digest("hex")}var L$,Ly=l(()=>{"use strict";L$=require("node:crypto")});var Ia,Id,Ale,Ca,nw,vy=l(()=>{"use strict";Ia=u(require("node:fs")),Id=u(require("node:path"));Ly();it();Ale=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ca=e=>{if(!Ia.default.existsSync(e))return null;try{let t=JSON.parse(Ia.default.readFileSync(e,"utf8"));return!Ale(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Ta(t.pairingToken.trim())}catch{return null}},nw=(e=L())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(Ca(Id.default.join(e,"config.json")));let n=Id.default.join(e,mt);if(!Ia.default.existsSync(n))return t;for(let s of Ia.default.readdirSync(n)){let i=Id.default.join(n,s);Ia.default.statSync(i).isDirectory()&&o(Ca(Id.default.join(i,"config.json")))}return t}});var La,Cd=l(()=>{"use strict";La="connection-health.json"});var Es,xy,_le,Ld,He,sw,Wy,Ye,Oy=l(()=>{"use strict";Es=u(require("node:fs")),xy=u(require("node:path"));Cd();_le=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ld=e=>e.profileEmail===null?xy.default.join(e.installDir,La):xy.default.join(e.installDir,"profiles",e.profileEmail,La),He=e=>{let t=Ld(e);if(!Es.default.existsSync(t))return null;try{let r=JSON.parse(Es.default.readFileSync(t,"utf8"));return!_le(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},sw=e=>{let t=Ld(e);Es.default.existsSync(t)&&Es.default.rmSync(t,{force:!0})},Wy=(e,t)=>{let r=Ld(e),o=He(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Es.default.mkdirSync(xy.default.dirname(r),{recursive:!0}),Es.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ye=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var vd,v$=l(()=>{"use strict";Cd();Oy();vd=(e,t)=>{if(!t.socketOpen)return!1;let r=He(e);return r===null?!1:!Ye(r,t.staleAfterMs??12e4,t.nowMs)}});var iw,x$=l(()=>{"use strict";Oy();iw=(e,t)=>!(e!==null&&!Ye(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var Ts=l(()=>{"use strict";Oy();v$();x$();Cd()});var jy,aw,ble,Rle,W$,O$=l(()=>{"use strict";jy=u(require("node:fs")),aw=u(require("node:path"));X();Fe();Ts();vy();ble=12e4,Rle=e=>{let t=aw.default.join(e,mt);return jy.default.existsSync(t)?jy.default.readdirSync(t).filter(r=>jy.default.statSync(aw.default.join(t,r)).isDirectory()):[]},W$=(e=L())=>{let t=null,r=-1;for(let o of Rle(e)){let n=z(o),s=He(n);if(s===null||Ye(s,ble))continue;let i=Ca(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var Is,lw=l(()=>{"use strict";Is={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var j$,kle,wle,M$,Ele,cw,N$=l(()=>{"use strict";lw();j$=/you(?:'|')ve hit your session limit/i,kle=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],wle=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,M$=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Ele=e=>{let t=wle.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},cw=e=>{let t=e.trim();if(t.length===0)return null;if(j$.test(t))return{code:Is.SESSION_LIMIT,resetHint:Ele(t),matchedLine:M$(t,j$)};for(let r of kle)if(r.test(t))return{code:Is.PROVIDER_QUOTA,resetHint:null,matchedLine:M$(t,r)};return null}});var My,Ny,dw,pw=l(()=>{"use strict";My="[[AGENT_RUN_WRITER_EXECUTION]]",Ny="cli-writer-api-key-missing",dw="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var uw=l(()=>{"use strict";pw()});var D$=l(()=>{"use strict";uw()});var de,mw=l(()=>{"use strict";de={FOLDER_REQUIRED:"folder_required",FOLDER_NOT_REGISTERED:"folder_not_registered",FOLDER_NOT_FOUND:"folder_not_found",FOLDER_CHECK_UNAVAILABLE:"folder_check_unavailable",CODING_TOOLS_PAUSED:"coding_tools_paused"}});var Cs,gw=l(()=>{"use strict";Cs={computerFallback:"This computer",folderNotAllowed:"Blocked: that folder isn't this project's folder on {computer}. Nothing ran.",folderMissing:"This project has no folder on {computer} yet. Set it in AgentWitch Local, then send the task again.",folderMissingReason:"Set this project's folder on {computer} first.",pauseLabel:"Pause all coding tools",pauseHint:"Running tasks stop. New tasks wait until you turn this off.",pauseStatus:"Paused",pauseReason:"Paused on {computer}. Turn it back on in AgentWitch Local.",secretHidden:"Output hidden: it looked like it had a secret. Open the report on {computer}.",folderCheckUnavailablePlaceholder:"Couldn't check this project's folder on {computer}. Nothing ran."}});var Cle,va,Ls,H$=l(()=>{"use strict";mw();gw();Cle={[de.FOLDER_REQUIRED]:"folderMissing",[de.FOLDER_NOT_FOUND]:"folderMissing",[de.FOLDER_NOT_REGISTERED]:"folderNotAllowed",[de.FOLDER_CHECK_UNAVAILABLE]:"folderCheckUnavailablePlaceholder",[de.CODING_TOOLS_PAUSED]:"pauseReason"},va=(e,t=Cs.computerFallback)=>Cs[e].replace("{computer}",t),Ls=(e,t)=>va(Cle[e],t)});var Ur,$$,F$,Lle,fw,z$,yw=l(()=>{"use strict";Ur="[redacted-secret]",$$="[redacted-private-key]",F$="(?!\\[redacted)",Lle="(?:[A-Z0-9]+_)*(?:KEY|APIKEY|SECRET|TOKEN|PASSWORD|PASSWD|PAT|CREDENTIALS?)(?:_[A-Z0-9]+)*",fw=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----(?:[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----|[\s\S]*$)/g,replacement:$$},{pattern:new RegExp(`^(\\s*(?:export\\s+)?${Lle}\\s*=\\s*)${F$}(["']?)[^\\s"'#]{4,}\\2`,"gm"),replacement:`$1${Ur}`},{pattern:/("?pairing_?token"?\s*[:=]\s*"?)(?!\[redacted)[^\s",}]{6,}/gi,replacement:`$1${Ur}`},{pattern:/\bsk-[A-Za-z0-9_-]{20,}/g,replacement:Ur},{pattern:/\bgithub_pat_[A-Za-z0-9_]{20,}/g,replacement:Ur},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:Ur},{pattern:/\bxox[a-z]-[A-Za-z0-9-]{10,}/g,replacement:Ur},{pattern:/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,replacement:Ur},{pattern:/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{8,}=*/gi,replacement:`Bearer ${Ur}`},{pattern:new RegExp(`\\b(api[_-]?key|secret|token|password|passwd|credential)(["']?\\s*[:=]\\s*)${F$}(["']?)[^\\s"'\\\\(),;]{8,}\\3`,"gi"),replacement:`$1$2${Ur}`}],z$=[/-----(?:BEGIN|END) [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[A-Za-z0-9_-]{20,}/,/\bgithub_pat_[A-Za-z0-9_]{20,}/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[a-z]-[A-Za-z0-9-]{10,}/,/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{12,}/i]});var xd,fn,Wd,U$=l(()=>{"use strict";yw();xd=e=>z$.some(t=>t.test(e)),fn=e=>{let t={replacements:0},r=fw.reduce((o,n)=>o.replace(n.pattern,(...s)=>{t.replacements+=1;let i=s.slice(1,-2).map(a=>typeof a=="string"?a:"");return n.replacement.replace(/\$(\d)/g,(a,c)=>i[Number(c)-1]??"")}),e);return{scrubbed:r,residualSecret:xd(r),replacementCount:t.replacements}},Wd=(e,t)=>{let r=fn(e);return r.residualSecret?t:r.scrubbed}});var ft=l(()=>{"use strict";lw();N$();pw();uw();D$();mw();gw();H$();yw();U$()});var Od,B$,G$,Dy=l(()=>{"use strict";Od={maxTurns:30,maxMinutes:30,maxBudgetUsd:2},B$=["Read","Glob","Grep","Edit","Write","TodoWrite","Bash(git status *)","Bash(git diff *)","Bash(git log *)","Bash(git show *)"],G$=124});var hw,K$,Hy,jd,Md,vle,xle,Wle,V$,Oe,Ae,Fy,Ole,jle,Mle,Yt,fr=l(()=>{"use strict";hw=u(require("node:fs")),K$=u(require("node:os")),Hy=u(require("node:path"));Dy();jd={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Md=e=>e.trim().length>0,vle=e=>{let t=Hy.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},xle=()=>{let e=K$.default.homedir(),t=Hy.default.join(e,".local","bin","agent");if(hw.default.existsSync(t))return t;let r=Hy.default.join(e,".local","bin","cursor-agent");return hw.default.existsSync(r)?r:jd.cursorCommand},Wle=e=>{let t=e.trim();return!Md(t)||t===jd.cursorCommand?xle():t},V$=(e,t)=>vle(e)?t:["agent",...t],Oe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Ae=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Md(t)?t.trim():jd.claudeCommand,codexCommand:Md(r)?r.trim():jd.codexCommand,cursorCommand:Wle(o),antigravityCommand:Md(n)?n.trim():jd.antigravityCommand}},Fy=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:V$(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Ole=["--permission-mode","dontAsk","--allowedTools",B$.join(","),"--max-turns",String(Od.maxTurns),"--max-budget-usd",Od.maxBudgetUsd.toFixed(2)],jle=["-s","workspace-write","-c",'approval_policy="never"'],Mle=["--trust","--sandbox","enabled"],Yt=(e,t,r,o)=>{let n=t.trim();if(!Md(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json",...Ole,n]}:e==="codex"?{command:r.codexCommand,args:["exec",...jle,n]}:e==="cursor"?{command:r.cursorCommand,args:V$(r.cursorCommand,[...s,"-p",...Mle,n])}:{command:r.antigravityCommand,args:[...s,"--sandbox","-p",n]}}});var yn,Nle,vs,Dle,xa,Nd=l(()=>{"use strict";yn=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,Nle=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:yn(s.inputTokens)+yn(s.outputTokens)+yn(s.cacheReadInputTokens)+yn(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},vs=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=yn(a.input_tokens)+yn(a.cache_creation_input_tokens)+yn(a.cache_read_input_tokens),d=yn(a.output_tokens),p=c+d;return p<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:p,model:Nle(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},Dle=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),xa=(e,t)=>{let r=vs(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??Dle(r)}}});var Sw,Hle,Fle,Pw,Aw=l(()=>{"use strict";Sw=e=>e.toLocaleString("en-US"),Hle=e=>e<.01?e.toFixed(4):e.toFixed(3),Fle=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Hle(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Sw(e.inputTokens)} in / ${Sw(e.outputTokens)} out (${Sw(e.totalTokens)} total)`,t].join(`
`)},Pw=(e,t)=>{if(t===void 0)return e;let r=Fle(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var $y,_w=l(()=>{"use strict";$y={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var xs,bw,zy,Rw=l(()=>{"use strict";_w();xs="auto",bw=e=>({value:xs,label:`Auto (${$y[e]})`}),zy={anthropic:[bw("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[bw("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[bw("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var Wa,Dd,Uy,Oa=l(()=>{"use strict";_w();Rw();Wa=e=>{let t=e?.trim()??"";if(!(t.length===0||t===xs))return t},Dd=(e,t)=>{let r=Wa(t);return r===void 0?$y[e]:r},Uy=e=>{let t=Wa(e);return t===void 0?xs:t}});var By,$le,zle,Gy,q$=l(()=>{"use strict";By={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},$le=e=>{let t=By[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?By["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?By["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?By["gemini-2.0-flash"]:null},zle=(e,t,r)=>{let o=$le(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},Gy=e=>{let t=zle(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var ja,Ule,Ble,Gle,Ky,J$=l(()=>{"use strict";q$();ja=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),Ule=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ja(r.input_tokens),n=ja(r.output_tokens);return o===0&&n===0?null:Gy({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Ble=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=ja(r.prompt_tokens),n=ja(r.completion_tokens);return o===0&&n===0?null:Gy({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Gle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=ja(r.promptTokenCount),n=ja(r.candidatesTokenCount);return o===0&&n===0?null:Gy({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Ky=(e,t,r)=>e==="anthropic"?Ule(t,r):e==="openai"?Ble(t,r):Gle(t,r)});var Kle,kw,Vle,qle,Jle,Yle,Xle,ww,Ew=l(()=>{"use strict";Oa();J$();Kle=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},kw=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Dd(e,t.model)},Vle=async e=>{let t=kw("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=Kle(o);n.length>0&&e.onChunk?.(n);let s=Ky("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},qle=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},Jle=async e=>{let t=kw("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=qle(o);n.length>0&&e.onChunk?.(n);let s=Ky("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},Yle=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},Xle=async e=>{let t=kw("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=Yle(n);s.length>0&&e.onChunk?.(s);let i=Ky("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},ww=async e=>{try{return e.provider==="anthropic"?await Vle(e):e.provider==="openai"?await Jle(e):await Xle(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var jt,Hd=l(()=>{"use strict";jt=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var Y$,Zle,Vy,Tw=l(()=>{"use strict";Y$=u(require("node:path")),Zle="writer-api-secrets.json",Vy=e=>Y$.default.join(e,Zle)});var Iw,X$,Qle,hn,Rt,Sn=l(()=>{"use strict";Iw=u(require("node:fs"));Oa();Tw();X$=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qle=e=>{if(!X$(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=Wa(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},hn=e=>{let t=Vy(e);if(!Iw.default.existsSync(t))return{};try{let r=JSON.parse(Iw.default.readFileSync(t,"utf8"));if(!X$(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=Qle(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},Rt=(e,t)=>hn(e)[t]??null});var at,Fd=l(()=>{"use strict";at=e=>e==="api"?"api":"cli"});var Z$,Ze,Ws,Ao=l(()=>{"use strict";Z$=u(require("node:path"));Hd();Sn();Fd();Ze=e=>Z$.default.dirname(e),Ws=(e,t)=>{if(at(e.writerExecutionBackend)!=="api")return!1;let r=jt(t);if(r===null)return!1;let o=Ze(e.layout.configPath),n=Rt(o,r);return n!==null&&n.apiKey.length>0}});var $d,Cw=l(()=>{"use strict";Aw();Ew();Hd();Sn();Ao();$d=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=jt(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Ze(e.layout.configPath),a=Rt(i,s);if(a===null){let d=Object.keys(hn(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in AgentWitch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await ww({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:Pw(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var ece,Q$,ez,tz=l(()=>{"use strict";ece={paused:!1,updatedAt:null},Q$={paused:!0,updatedAt:null},ez=e=>{if(e===null)return ece;try{let t=JSON.parse(e);if(typeof t!="object"||t===null||typeof t.paused!="boolean")return Q$;let r=t;return{paused:r.paused,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:null}}catch{return Q$}}});var zd,qy,tce,rce,Lw,oce,Os,_o,vw,Jy=l(()=>{"use strict";zd=u(require("node:fs")),qy=u(require("node:path"));tz();tce="coding-tools-pause.json",rce="unreadable",Lw=e=>qy.default.join(qy.default.dirname(e),tce),oce=e=>{try{return zd.default.readFileSync(e,"utf8")}catch(t){return t.code==="ENOENT"?null:rce}},Os=e=>ez(oce(Lw(e))),_o=e=>Os(e).paused,vw=(e,t,r=new Date)=>{let o=Lw(e),n={paused:t,updatedAt:r.toISOString()};zd.default.mkdirSync(qy.default.dirname(o),{recursive:!0,mode:448});let s=`${o}.${process.pid}.tmp`;return zd.default.writeFileSync(s,`${JSON.stringify(n)}
`,{mode:384}),zd.default.renameSync(s,o),n}});var nce,sce,ice,xw,rz,Ww=l(()=>{"use strict";nce=["read_file","write_file","read_url","execute_url","command","mcp","unsandboxed"],sce=new Set(nce),ice=e=>{let t=e.trim(),r=t.indexOf("("),o=t.lastIndexOf(")");if(r<=0||o!==t.length-1)return!1;let n=t.slice(0,r);return sce.has(n)?t.slice(r+1,o).length>0:!1},xw=["read_file(*)","write_file(*)","command(*)","mcp(*)"],rz=e=>e.filter(t=>ice(t))});var oz,nz=l(()=>{"use strict";oz=".gemini/antigravity-cli"});var sz,iz,az=l(()=>{"use strict";sz=u(require("node:path"));nz();Ww();iz=e=>sz.default.join(e,oz,"settings.json")});var Ud,lz,cz,dz,ace,lce,pz,uz=l(()=>{"use strict";Ud=u(require("node:fs")),lz=u(require("node:os")),cz=u(require("node:path"));Ww();az();dz=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ace=e=>{if(!Ud.default.existsSync(e))return{};try{let t=JSON.parse(Ud.default.readFileSync(e,"utf8"));return dz(t)?{...t}:{}}catch{return{}}},lce=(e,t)=>{let o=[...rz(Array.isArray(e)?e.filter(n=>typeof n=="string"):[])];for(let n of t)o.includes(n)||o.push(n);return o},pz=(e=lz.default.homedir())=>{let t=iz(e),r=ace(t),o=dz(r.permissions)?{...r.permissions}:{},n=lce(o.allow,xw),s=Array.isArray(o.allow)?o.allow.filter(c=>typeof c=="string"):[];if(!(n.length!==s.length||n.some((c,d)=>c!==s[d])))return{settingsPath:t,wrote:!1};Ud.default.mkdirSync(cz.default.dirname(t),{recursive:!0});let a={...r,permissions:{...o,allow:[...n]}};return Ud.default.writeFileSync(t,`${JSON.stringify(a,null,2)}
`,"utf8"),{settingsPath:t,wrote:!0}}});var Yy,Ow=l(()=>{"use strict";uz();Yy=e=>{e==="antigravity"&&pz()}});var mz,Ma,jw=l(()=>{"use strict";mz=require("node:child_process");ft();fr();Nd();Cw();Ao();Jy();Ow();Ma=(e,t,r)=>new Promise(o=>{if(!Oe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(_o(e.layout.configPath)){o({exitCode:-1,output:Ls(de.CODING_TOOLS_PAUSED)});return}if(Ws(e,t)){$d(e,t,r).then(o);return}let n=Yt(t,r,Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}Yy(t);let s=(0,mz.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=xa(i.join("")),p=a.join("").trim(),m=[d.output.trim(),p].filter(g=>g.length>0).join(`
`);o({exitCode:c??-1,output:m})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var gz=l(()=>{"use strict"});var fz=l(()=>{"use strict";Aw();jw();Ew();gz();Sn();Ao()});var yz,hz,Sz,Pz=l(()=>{"use strict";yz="claude",hz="codex",Sz="cursor"});var Az,cce,Mw,Bd,Xy=l(()=>{"use strict";Az=u(require("node:path"));pr();Fe();cce="ws://localhost:3000/api/agent-witch/ws",Mw=e=>e.replace(/\/$/,""),Bd=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Mw(t);let r=Az.default.basename(e.installDir);if(r===Ic.production)return Fg;let o=e.configWsUrl?.trim()??"";return r===Ic.localhost?o.length>0?Mw(o):cce:o.length>0?Mw(o):Fg}});var pce,Nw,Dw=l(()=>{"use strict";Pz();Xy();Fd();pce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Nw=e=>{if(!pce(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Bd({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??yz,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??hz,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??Sz,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",p=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:p,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:at(t.writerExecutionBackend),layout:e.layout}}}});var Hw,Fw,$w=l(()=>{"use strict";Hw=u(require("node:fs"));X();Dw();Fw=e=>{let t=z(e);if(!Hw.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Hw.default.readFileSync(t.configPath,"utf8")),o=Nw({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var Gd,_z=l(()=>{"use strict";Gd=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var zw,uce,Uw,bz=l(()=>{"use strict";zw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uce=e=>{if(!zw(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!zw(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let p=s.items.flatMap(m=>{if(!zw(m))return[];let g=typeof m.itemKey=="string"?m.itemKey.trim():"",y=typeof m.relativePath=="string"?m.relativePath:"",S=typeof m.contentSha256=="string"?m.contentSha256.trim():"";return g.length===0||S.length===0?[]:[{itemKey:g,relativePath:y,contentSha256:S}]});return p.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:p}]});return{id:t,projectId:r,digest:o,entries:n}},Uw=uce});var Rz,mce,Zy,Bw=l(()=>{"use strict";Rz=u(require("node:path")),mce=(e,t)=>{let r=t.trim();return Rz.default.join(e,"components","store",r.slice(0,2),r)},Zy=mce});var kz,gce,Gw,wz=l(()=>{"use strict";kz=u(require("node:fs"));Bw();gce=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Zy(e.installDir,n.contentSha256);kz.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this computer. Open Harness to sync, then retry.`},Gw=gce});var Kd,Na,fce,Kw,yce,Vw,qw=l(()=>{"use strict";Kd=u(require("node:fs")),Na=u(require("node:path"));Bw();fce=(e,t)=>Na.default.join(e.installDir,"runs",t,"overlay"),Kw=(e,t)=>Na.default.join(fce(e,t),".cursor"),yce=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Kw(e,t);Kd.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Zy(e.installDir,i.contentSha256);if(!Kd.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this computer."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Na.default.join(n,c):Na.default.join(n,i.itemKey);Kd.default.mkdirSync(Na.default.dirname(d),{recursive:!0}),Kd.default.copyFileSync(a,d)}return{ok:!0}},Vw=yce});var Jw,Ez,hce,Vd,Tz=l(()=>{"use strict";Jw=u(require("node:fs")),Ez=u(require("node:path")),hce=(e,t)=>{let r=Ez.default.join(e.installDir,"runs",t);Jw.default.existsSync(r)&&Jw.default.rmSync(r,{recursive:!0,force:!0})},Vd=hce});var Sce,Yw,Iz=l(()=>{"use strict";qw();Sce=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Kw(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},Yw=Sce});var Xw,Pce,Ace,_ce,bce,Rce,B,Cz=l(()=>{"use strict";Xw=u(require("node:fs"));Xy();X();Fd();Pce="claude",Ace="codex",_ce="cursor",bce="agy",Rce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B=()=>{let e=z();if(!Xw.default.existsSync(e.configPath))return null;try{let t=JSON.parse(Xw.default.readFileSync(e.configPath,"utf8"));if(!Rce(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=Bd({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:at(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:Pce,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:Ace,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:_ce,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:bce,pairingToken:s,layout:e}}catch{return null}}});var Qy,Lz,vz=l(()=>{"use strict";Qy=u(require("node:fs"));Tw();Lz=(e,t)=>{let r=Vy(e);Qy.default.mkdirSync(e,{recursive:!0}),Qy.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Qy.default.chmodSync(r,384)}catch{}}});var qd,xz,eh=l(()=>{"use strict";qd=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},xz=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===qd(t)}});var Jd,kce,Zw,Qw,Wz=l(()=>{"use strict";Jd=u(require("node:fs"));Sn();vz();eh();Oa();Ao();kce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zw=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=xz(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?Wa(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},Qw=e=>{let t=Ze(e.configPath),r={};if(Jd.default.existsSync(e.configPath))try{let n=JSON.parse(Jd.default.readFileSync(e.configPath,"utf8"));kce(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,Jd.default.mkdirSync(t,{recursive:!0}),Jd.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=Zw(Zw(Zw(hn(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);Lz(t,o)}});var th,eE=l(()=>{"use strict";th={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var tE,Oz=l(()=>{"use strict";Hd();Sn();Ao();Ao();tE=(e,t)=>{if(Ws(e,t)||t==="antigravity")return!1;let r=jt(t);if(r===null)return!1;let o=Ze(e.layout.configPath),n=Rt(o,r);return n===null||n.apiKey.trim().length===0}});var jz,rE,oE=l(()=>{"use strict";jz=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},rE=async e=>{let t=jz(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=jz(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var wce,nE,Mz=l(()=>{"use strict";ye();$w();oE();wce=1e4,nE=()=>rE({listProfileEmails:Xf,readConfig:Fw,pollIntervalMs:wce,logWaiting:e=>{console.error(e)}})});var Ece,sE,Nz=l(()=>{"use strict";Ece={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This AgentWitch Local cannot handle Connect/restart. Update from /download."},sE=e=>({status:e.status,reason:e.reason,message:Ece[e.status]})});var Tce,iE,Br,Dz=l(()=>{"use strict";ft();Tce=new Set(["terminal.stream.chunk","command.claude.result","command.claude.input_required","command.writer.session.chunk","command.writer.session.ready","harness.request.result","shell.data","run.heartbeat","dashboard.agentRun.get.result","dashboard.agentRun.list.result"]),iE=(e,t)=>typeof e=="string"?Wd(e,t):Array.isArray(e)?e.map(r=>iE(r,t)):typeof e=="object"&&e!==null?Object.fromEntries(Object.entries(e).map(([r,o])=>[r,iE(o,t)])):e,Br=e=>typeof e.type!="string"||!Tce.has(e.type)||e.payload===void 0?{...e}:{...e,payload:iE(e.payload,va("secretHidden"))}});var Ice,aE,Hz=l(()=>{"use strict";Jy();Ice=1e3,aE=(e,t,r=Ice)=>{let o={paused:Os(e).paused},s=setInterval(()=>{let i=Os(e).paused;i!==o.paused&&(o.paused=i,t(i))},r);return s.unref?.(),()=>{clearInterval(s)}}});var rh,Yd,Fz=l(()=>{"use strict";rh=(e,t,r=500)=>[...e.filter(o=>o!==t),t].slice(-r),Yd=(e=500)=>{let t={ids:[]};return{has:r=>t.ids.includes(r),add:r=>{t.ids=rh(t.ids,r,e)}}}});var Xd,$z=l(()=>{"use strict";ft();Xd=e=>({type:"command.claude.result",payload:{exitCode:-1,output:Ls(e.code,e.computer),errorCode:e.code,...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{}},...e.requestId!==void 0?{requestId:e.requestId}:{}})});var te=l(()=>{"use strict";jw();fz();$w();Xy();_z();bz();wz();qw();Tz();Iz();Fd();Cz();Wz();Sn();Ao();eh();Oa();eE();Cw();Ao();Oz();Hd();Sn();Mz();Dw();oE();Nz();Dz();Jy();Hz();Fz();$z()});var zz,lE,Uz=l(()=>{"use strict";zz=u(require("node:path"));X();Fe();O$();Ly();vy();te();lE=(e=L())=>{let t=W$(e);if(t!==null)return t;let r=nt(e);if(r!==null){let n=Ca(zz.default.join(e,mt,r,"config.json"));if(n!==null)return n}let o=B()?.pairingToken.trim()??"";return o.length===0?null:Ta(o)}});var oh,Bz,Cce,Lce,Gz,nh,Zd,sh,Qd=l(()=>{"use strict";oh=u(require("node:fs")),Bz=u(require("node:path")),Cce="wake-port.json",Lce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gz=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,nh=e=>Bz.default.join(e,Cce),Zd=e=>{let t=nh(e);if(!oh.default.existsSync(t))return null;try{let r=JSON.parse(oh.default.readFileSync(t,"utf8"));if(Lce(r)&&Gz(r.wakePort))return r.wakePort}catch{return null}return null},sh=(e,t)=>{if(!Gz(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=nh(e);oh.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var _We,bWe,RWe,yr,Kz,ep=l(()=>{"use strict";X();Qd();it();Qd();_We=dn(),bWe=`${we()}-wake`,RWe=we(),yr=()=>{let e=L();return aa({filePort:Zd(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:dn(e)})},Kz=e=>{let t=L();Zd(t)===null&&sh(t,e)}});var Vz=l(()=>{"use strict";Ly();ye();vy();Uz();te();ep()});var cE,tp,rp,qz=l(()=>{"use strict";cE=u(require("node:os"));Vz();tp=()=>{let e=Pe();return{ok:!0,port:yr(),hostname:cE.default.hostname(),profileCount:e.length}},rp=()=>{let e=Pe(),t=lE(),r=nw();return{hostname:cE.default.hostname(),port:yr(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var dE=l(()=>{"use strict";qz()});var Jz,Yz,Xz,ih,Da=l(()=>{"use strict";Jz="materialization.json",Yz="backups",Xz=".gitignore",ih=e=>`harness-set:${e.trim()}`});var Zz,Qz,ah,eU=l(()=>{"use strict";Zz=u(require("node:crypto")),Qz=u(require("node:fs")),ah=e=>{try{let t=Qz.default.readFileSync(e);return Zz.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Pn,js,vce,tU,pE,rU=l(()=>{"use strict";Pn=u(require("node:fs")),js=u(require("node:path"));eU();vce=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=js.default.join(t,n,o);return Pn.default.mkdirSync(js.default.dirname(s),{recursive:!0}),Pn.default.copyFileSync(r,s),js.default.relative(e,s).replaceAll("\\","/")},tU=e=>{let t=js.default.join(e.repoRoot,e.repoRelativeDestination),r=ah(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(Pn.default.existsSync(t)){let n=ah(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=vce(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return Pn.default.mkdirSync(js.default.dirname(t),{recursive:!0}),Pn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return Pn.default.mkdirSync(js.default.dirname(t),{recursive:!0}),Pn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},pE=e=>{let t=ah(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var uE,oU,Ha,lh=l(()=>{"use strict";uE=u(require("node:fs"));Da();oU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ha=e=>{if(!uE.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(uE.default.readFileSync(e,"utf8"));if(oU(t)&&t.version===1&&oU(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var An,ch,dh,mE=l(()=>{"use strict";An=u(require("node:fs")),ch=u(require("node:path"));Da();dh=e=>{let t=new Set(e.setSlugs.map(s=>ih(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=ch.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=ch.default.join(e.repoRoot,i.backupPath);An.default.existsSync(c)?(An.default.mkdirSync(ch.default.dirname(a),{recursive:!0}),An.default.copyFileSync(c,a),o.push(s)):An.default.existsSync(a)&&An.default.rmSync(a,{force:!0})}else An.default.existsSync(a)&&An.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var gE,Fa,ph=l(()=>{"use strict";gE=u(require("node:path"));Da();Fa=e=>({ledgerFilePath:gE.default.join(e.metaDirPath,Jz),backupsDirPath:gE.default.join(e.metaDirPath,Yz)})});var fE,nU,sU=l(()=>{"use strict";fE=u(require("node:path")),nU=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return fE.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return fE.default.posix.join(s,e,n)}});var yE,iU,np,hE=l(()=>{"use strict";yE=u(require("node:fs")),iU=u(require("node:path")),np=(e,t)=>{yE.default.mkdirSync(iU.default.dirname(e),{recursive:!0}),yE.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var SE,xce,je,Gr=l(()=>{"use strict";SE=u(require("node:os")),xce=e=>{let t=e.trim();return t.startsWith("~/")?`${SE.default.homedir()}${t.slice(1)}`:t==="~"?SE.default.homedir():t},je=xce});var uh,aU,Wce,lU,cU=l(()=>{"use strict";uh=u(require("node:fs")),aU=u(require("node:path"));Da();pn();Wce=`*
!${ny}
`,lU=e=>{let t=aU.default.join(e,Xz);uh.default.existsSync(t)||(uh.default.mkdirSync(e,{recursive:!0}),uh.default.writeFileSync(t,Wce))}});var Ms,Xt,Ns=l(()=>{"use strict";Ms=u(require("node:path"));pn();Gr();Xt=e=>{let t=je(e),r=Ms.default.join(t,od);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Ms.default.join(r,"rag"),memoryDirPath:Ms.default.join(r,vF),reportsDirPath:Ms.default.join(r,WF),metaFilePath:Ms.default.join(r,ny),ragChunksFilePath:Ms.default.join(r,"rag",xF)}}});var Kr,pU,Oce,jce,Mt,sp=l(()=>{"use strict";Kr=u(require("node:fs")),pU=u(require("node:path"));pn();cU();Ns();Oce=(e,t)=>{if(Kr.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Kr.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},jce=e=>{Kr.default.existsSync(e.ragChunksFilePath)||Kr.default.writeFileSync(e.ragChunksFilePath,"");let t=pU.default.join(e.memoryDirPath,pa);Kr.default.existsSync(t)||Kr.default.writeFileSync(t,"")},Mt=e=>{let t=Xt(e.projectFolderPath);return Kr.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Kr.default.mkdirSync(t.ragDirPath,{recursive:!0}),Kr.default.mkdirSync(t.memoryDirPath,{recursive:!0}),lU(t.metaDirPath),Oce(t,e),jce(t),{ok:!0,layout:t}}});var uU,mU,gU,fU,mh,gh=l(()=>{"use strict";uU="components",mU="store",gU="versions",fU="installed.json",mh=e=>`harness-set:${e.trim()}`});var PE,yU,fh,AE=l(()=>{"use strict";PE=u(require("node:fs")),yU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fh=e=>{if(!PE.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(PE.default.readFileSync(e,"utf8"));if(yU(t)&&t.version===1&&yU(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var ip,$a,yh=l(()=>{"use strict";ip=u(require("node:path"));gh();$a=e=>{let t=ip.default.join(e,uU);return{componentsRootDir:t,storeDir:ip.default.join(t,mU),versionsDir:ip.default.join(t,gU),installedFilePath:ip.default.join(t,fU)}}});var _E,hU,hh,Sh,Ph=l(()=>{"use strict";_E=u(require("node:crypto")),hU=u(require("node:fs")),hh=e=>_E.default.createHash("sha256").update(e,"utf8").digest("hex"),Sh=e=>{try{let t=hU.default.readFileSync(e);return _E.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var bE,SU,PU,AU=l(()=>{"use strict";bE=u(require("node:fs")),SU=u(require("node:path")),PU=(e,t)=>{bE.default.mkdirSync(SU.default.dirname(e),{recursive:!0}),bE.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var RE,kE,_U,bU=l(()=>{"use strict";RE=u(require("node:fs")),kE=u(require("node:path")),_U=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=kE.default.join(e,r),n=kE.default.join(o,`${t.versionId}.json`);RE.default.mkdirSync(o,{recursive:!0}),RE.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var Ah,RU,kU,wU=l(()=>{"use strict";Ah=u(require("node:fs")),RU=u(require("node:path"));Ph();kU=e=>{let t=hh(e.content),r=RU.default.join(e.storeDir,t);return Ah.default.existsSync(r)||(Ah.default.mkdirSync(e.storeDir,{recursive:!0}),Ah.default.writeFileSync(r,e.content)),t}});var wE,EU,Mce,_h,EE=l(()=>{"use strict";wE=u(require("node:fs")),EU=u(require("node:path"));gh();AE();yh();Ph();AU();bU();wU();Mce=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_h=e=>{let t=$a(e.installDir),r=mh(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!Mce(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=EU.default.join(e.harnessRootDir,a);if(!wE.default.existsSync(c))continue;let d=wE.default.readFileSync(c,"utf8"),p=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Sh(c);if(p!==null){if(hh(d)!==p)throw new Error(`Harness item "${i.id}" failed content hash verification.`);kU({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:p})}}if(n.length===0)return;_U(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=fh(t.installedFilePath);PU(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var IE,TE,TU,IU=l(()=>{"use strict";IE=u(require("node:fs"));EE();AE();yh();TE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),TU=e=>{if(!IE.default.existsSync(e.harnessManifestPath))return;let t=$a(e.installDir),r=fh(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(IE.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!TE(o)||o.version!==1||!TE(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!TE(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];_h({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var CE,CU,LU,vU=l(()=>{"use strict";CE=u(require("node:fs")),CU=u(require("node:path")),LU=e=>{let t=e.componentId.replaceAll("/","_"),r=CU.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!CE.default.existsSync(r))return null;try{let o=JSON.parse(CE.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var bh,Rh,xU,WU=l(()=>{"use strict";bh=u(require("node:fs")),Rh=u(require("node:path"));gh();IU();vU();yh();Ph();xU=e=>{TU({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=$a(e.layout.installDir),r=mh(e.setSlug),o=LU({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=Rh.default.join(t.storeDir,i.contentSha256);if(bh.default.existsSync(a)&&Sh(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?Rh.default.join(e.layout.harnessRootDir,n):Rh.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!bh.default.existsSync(s))return null;try{if(!bh.default.statSync(s).isFile())return null}catch{return null}return s}});var OU,Nce,LE,Zt,za=l(()=>{"use strict";lh();ph();Ns();OU="harness-set:",Nce=e=>{let t=e.trim();if(!t.startsWith(OU))return null;let r=t.slice(OU.length).trim();return r.length>0?r:null},LE=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=Nce(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},Zt=e=>{let t=Xt(e),{ledgerFilePath:r}=Fa(t),o=Ha(r);return LE(o)}});var kh,vE,ap,Dce,bo,lp,Ua=l(()=>{"use strict";kh=u(require("node:fs")),vE=u(require("node:os")),ap=u(require("node:path")),Dce=()=>kh.default.realpathSync(ap.default.resolve(vE.default.homedir())),bo=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?ap.default.join(vE.default.homedir(),t.slice(1)):t,o;try{o=kh.default.realpathSync(ap.default.resolve(r))}catch{return null}let n=Dce();return o===n||o.startsWith(`${n}${ap.default.sep}`)?o:null},lp=e=>{let t=bo(e);if(t===null)return null;try{if(!kh.default.statSync(t).isFile())return null}catch{return null}return t}});var xE,WE=l(()=>{"use strict";xE=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Eh,jU,wh,Hce,cp,OE=l(()=>{"use strict";Eh=u(require("node:fs")),jU=u(require("node:path"));Da();rU();lh();mE();ph();sU();hE();Gr();sp();WU();za();Ua();WE();wh=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hce=e=>{if(!Eh.default.existsSync(e))return null;try{let t=JSON.parse(Eh.default.readFileSync(e,"utf8"));if(wh(t)&&t.version===1)return t}catch{return null}return null},cp=e=>{let t=[...new Set(e.setSlugs.map(I=>I.trim()).filter(I=>I.length>0))],r=je(e.projectFolderPath),o=bo(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Eh.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=Mt({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Fa(s.layout),d=Zt(o).filter(I=>!t.includes(I)),p=Ha(i),m=0;if(d.length>0){let I=dh({repoRoot:o,setSlugs:d,ledger:p});p=I.ledger,m=I.summary.removedPaths.length}if(t.length===0)return np(i,p),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:[]};let g=Hce(e.layout.harnessManifestPath);if(g===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=wh(g.sets)?g.sets:{},S=0,A=0,E=0;for(let I of t){let f=y[I];if(!wh(f))return{ok:!1,errorMessage:`Harness set "${I}" is not installed locally.`};let P=typeof f.version=="number"?String(f.version):"1",_=ih(I),h=Array.isArray(f.items)?f.items:[];for(let b of h){if(!wh(b))continue;let C=typeof b.path=="string"?b.path.trim():"";if(C.length===0)continue;let H=xE(C);if(H===null)continue;let D=nU(I,H),w=jU.default.posix.join(".cursor",D).replaceAll("\\","/"),k=typeof b.id=="string"?b.id.trim():"",W=xU({layout:e.layout,setSlug:I,setVersion:typeof f.version=="number"?f.version:1,manifestItemPath:C,manifestItemId:k});if(W===null)continue;let v=tU({repoRoot:o,backupsDir:a,repoRelativeDestination:w,sourceAbsolutePath:W,componentId:_,versionId:P,ledger:p});if(v.kind==="skipped_unchanged"){A+=1;continue}if(v.kind==="backed_up_user_file"){E+=1,S+=1,p={version:1,entries:{...p.entries,[w]:pE({componentId:_,versionId:P,sourceAbsolutePath:W,backupPath:v.backupPath})}};continue}S+=1,p={version:1,entries:{...p.entries,[w]:pE({componentId:_,versionId:P,sourceAbsolutePath:W})}}}}return S===0&&A===0&&m===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(np(i,p),{ok:!0,writtenFileCount:S,skippedFileCount:A,backedUpFileCount:E,removedLedgerPathCount:m,projectFolderPath:o,appliedSetSlugs:t})}});var MU,Th,Fce,$ce,zce,Uce,Bce,Gce,Kce,Vce,qce,dp,Ih=l(()=>{"use strict";MU=u(require("node:crypto")),Th=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Fce=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},$ce=(e,t)=>{let r=Fce(t),o=Th(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},zce=(e,t,r)=>{let o=$ce(t,r);return`shared/items/${e}/${o}`},Uce=["rules","skills","commands","instructions","agents"],Bce=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Gce=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Kce=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Vce=e=>MU.default.createHash("sha256").update(e,"utf8").digest("hex"),qce=e=>({id:e.id,kind:e.kind,title:e.title,path:zce(e.id,e.kind,e.title),contentSha256:Vce(e.content)}),dp=e=>{let t=new Date().toISOString(),r=e.existingManifest??Bce(e.hostname,t),o=Th(e.bundle.slug),n=Kce(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...Uce.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,p)=>{let m=qce(p);return{files:[...d.files,{relativePath:m.path,content:p.content}],nextItems:Gce(d.nextItems,m)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var _n,NU,Ch,Jce,Ds,jE=l(()=>{"use strict";_n=u(require("node:fs")),NU=u(require("node:os")),Ch=u(require("node:path"));Ih();Jce=e=>{if(!_n.default.existsSync(e))return null;try{let t=JSON.parse(_n.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Ds=e=>{try{let t=Jce(e.layout.harnessManifestPath),r=dp({bundle:e.bundle,hostname:NU.default.hostname(),existingManifest:t});_n.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)_n.default.mkdirSync(Ch.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Ch.default.join(e.layout.harnessRootDir,o.relativePath);_n.default.mkdirSync(Ch.default.dirname(n),{recursive:!0}),_n.default.writeFileSync(n,o.content)}return _n.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var ME,DU=l(()=>{"use strict";jE();OE();ME=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Ds({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return cp({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var HU,FU=l(()=>{"use strict";HU=["rule","skill","command","instruction","agent"]});var $U,Yce,Xce,Vr,NE=l(()=>{"use strict";FU();$U=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yce=e=>typeof e=="string"&&HU.includes(e),Xce=e=>{if(!$U(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Yce(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Vr=e=>{if(!$U(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=Xce(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var zU,Zce,DE,UU=l(()=>{"use strict";zU=require("node:zlib");NE();Zce="x-agent-witch-token",DE=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[Zce]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,zU.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=Vr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var FE,HE,Ro,BU=l(()=>{"use strict";FE=u(require("node:fs")),HE=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ro=e=>{if(!FE.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(FE.default.readFileSync(e.harnessManifestPath,"utf8"));if(!HE(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=HE(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!HE(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",p=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:p.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var Lh,GU=l(()=>{"use strict";Lh=()=>"~"});var KU,VU,qU=l(()=>{"use strict";KU=require("node:crypto"),VU=e=>`local-${(0,KU.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var $E,JU=l(()=>{"use strict";$E=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var pp,vh,zE=l(()=>{"use strict";pp=u(require("node:path")),vh=e=>{let t=pp.default.dirname(e),r=pp.default.basename(t);return r==="agents"?pp.default.basename(pp.default.dirname(t)):r}});var up,ko,YU,Qce,ede,tde,xh,XU,UE=l(()=>{"use strict";up=u(require("node:fs")),ko=u(require("node:path"));qU();JU();zE();YU=new Set(["node_modules",".git","dist","build",".next","coverage"]),Qce=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},ede=(e,t)=>{let r=ko.default.basename(t);if(e==="skill"){let o=t.split(ko.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},tde=e=>{let t=[],r=(n,s)=>{let i;try{i=up.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&YU.has(a.name))continue;let c=ko.default.join(n,a.name),d=s?ko.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;$E(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=ko.default.join(e,n);up.default.existsSync(s)&&r(s,n)}let o=ko.default.join(e,"skills");return up.default.existsSync(o)&&r(o,"skills"),t},xh=e=>{let t=tde(e);if(t.length===0)return null;let r=ko.default.dirname(e),o=vh(e),n=Qce(o),s=t.map(i=>{let a=$E(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:VU(i.absolutePath),kind:a,title:ede(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},XU=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=up.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||YU.has(a.name))continue;let c=ko.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var ZU,BE,rde,GE,QU=l(()=>{"use strict";ZU=u(require("node:fs")),BE=u(require("node:path"));UE();Ua();rde=e=>{let t=bo(e.trim());if(t===null)return null;if(BE.default.basename(t)===".cursor")return t;let r=BE.default.join(t,".cursor");try{if(ZU.default.statSync(r).isDirectory())return bo(r)}catch{return null}return null},GE=e=>{let t=rde(e.projectPath);if(t===null)return null;let r=xh(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var e1,ode,Wh,KE,t1=l(()=>{"use strict";e1=u(require("node:path"));UE();Ua();zE();ode=5,Wh=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},KE=e=>{let t=bo(e.scanRoot.trim());if(t===null)return Wh(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of XU(t,ode,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=bo(s);if(i===null)continue;let a=vh(i);Wh(e.response,"folder",{cursorDir:i,groupName:a,repoPath:e1.default.dirname(i)});let c=xh(i);c!==null&&(r.push(c),Wh(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Wh(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var r1,o1,n1=l(()=>{"use strict";r1=u(require("node:path")),o1=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:r1.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var yt,s1,VE,nde,qE,JE,Oh,YE,mp,i1=l(()=>{"use strict";yt=u(require("node:fs")),s1=u(require("node:os")),VE=u(require("node:path"));Ih();EE();Ua();n1();nde=e=>{if(!yt.default.existsSync(e))return null;try{let t=JSON.parse(yt.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},qE=e=>{let t=e.hostname??s1.default.hostname(),r=nde(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(p=>p.include);if(a.length===0)continue;let c=[];for(let p of a){let m=lp(p.sourcePath);if(m===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${p.sourcePath}`};let g=yt.default.readFileSync(m,"utf8");c.push({id:p.id,kind:p.kind,title:p.title,content:g,setSlugs:[i.slug]})}let d=dp({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let p of d.directories)n.add(p);for(let p of d.files)s.push(p),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{yt.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)yt.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=VE.default.join(e.layout.harnessRootDir,i.relativePath);yt.default.mkdirSync(VE.default.dirname(a),{recursive:!0}),yt.default.writeFileSync(a,i.content)}yt.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(p=>p.include))continue;let c=Th(i.slug),d=r.sets[c];d!==void 0&&_h({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},JE="reveal-cache.json",Oh=(e,t)=>{yt.default.mkdirSync(e.harnessRootDir,{recursive:!0}),yt.default.writeFileSync(`${e.harnessRootDir}/${JE}`,`${JSON.stringify(t,null,2)}
`)},YE=e=>{let t=`${e.harnessRootDir}/${JE}`;yt.default.existsSync(t)&&yt.default.unlinkSync(t)},mp=e=>{let t=`${e.harnessRootDir}/${JE}`;if(!yt.default.existsSync(t))return null;try{let r=JSON.parse(yt.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return o1(r)}catch{return null}return null}});var bn=l(()=>{"use strict";OE();DU();WE();jE();UU();NE();Ih();BU();GU();QU();Ua();t1();i1()});var XE,a1=l(()=>{"use strict";bn();it();XE=e=>{let t=z(e.profileEmail);return Ds({bundle:e.bundle,layout:t})}});var l1=l(()=>{"use strict";a1();bn()});var sde,c1,ide,d1,Hs,jh,p1=l(()=>{"use strict";sde=["agentwitch.com","www.agentwitch.com"],c1=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,ide=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},d1=e=>{let t=ide(e);return!!(sde.includes(t)||c1.test(e.trim().toLowerCase()))},Hs=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return d1(r)?c1.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},jh=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:Hs(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var gp=l(()=>{"use strict";p1()});var hr,Ba=l(()=>{"use strict";hr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var fp,u1=l(()=>{"use strict";l1();gp();Ba();fp=e=>{if(!hr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Vr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Hs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=XE({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var ZE=l(()=>{"use strict";u1()});var ade,Ga,QE=l(()=>{"use strict";ade=e=>e==="hourly"||e==="daily"||e==="weekdays",Ga=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!ade(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var yp,Mh,m1,g1,eT,Sr,Nh,Dh,Hh,Fh,$h=l(()=>{"use strict";yp=u(require("node:fs")),Mh=u(require("node:path"));QE();m1="automations.json",g1=e=>e.profileEmail!==null?Mh.default.join(e.installDir,"profiles",e.profileEmail,m1):Mh.default.join(e.installDir,m1),eT=()=>({version:1,automations:[]}),Sr=e=>{let t=g1(e);if(!yp.default.existsSync(t))return eT();try{let r=JSON.parse(yp.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?eT():{version:1,automations:r.automations.flatMap(n=>{let s=Ga(n);return s!==null?[s]:[]})}}catch{return eT()}},Nh=(e,t)=>{let r=g1(e);yp.default.mkdirSync(Mh.default.dirname(r),{recursive:!0}),yp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Dh=(e,t)=>{Nh(e,{version:1,automations:t})},Hh=(e,t)=>{let o=Sr(e).automations.filter(n=>n.id!==t.id);Nh(e,{version:1,automations:[...o,t]})},Fh=(e,t)=>Sr(e).automations.find(r=>r.id===t)??null});var ie,ht=l(()=>{"use strict";ie="x-agent-witch-token"});var tT=l(()=>{"use strict";by();Ty()});var q,Fs,rT,hp,oT,lde,nT,$s,wo,sT,Pr=l(()=>{"use strict";ht();tT();q=e=>{let t=Je(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},Fs=e=>({[ie]:e,"Content-Type":"application/json"}),rT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:Fs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},hp=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Fs(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},oT=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:Fs(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},lde=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},nT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:Fs(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},$s=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:Fs(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return lde(r)}catch{return null}},wo=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:Fs(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},sT=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:Fs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var zs,f1,y1,cde,iT,h1,aT=l(()=>{"use strict";zs=u(require("node:fs")),f1=u(require("node:path")),y1=e=>f1.default.join(e.harnessRootDir,"projects-registry.json"),cde=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),iT=e=>{let t=y1(e);if(!zs.default.existsSync(t))return[];try{let r=JSON.parse(zs.default.readFileSync(t,"utf8"));return cde(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},h1=e=>{let t=y1(e);if(!zs.default.existsSync(t))return;let r=`${t}.migrated`;if(zs.default.existsSync(r)){zs.default.unlinkSync(t);return}zs.default.renameSync(t,r)}});var S1,dde,pde,P1,A1=l(()=>{"use strict";Gr();S1=e=>je(e),dde=e=>new Set(e.map(t=>S1(t.folderPath))),pde=e=>new Set(e.map(t=>t.id)),P1=(e,t)=>{let r=dde(t),o=pde(t),n=[],s=new Set;for(let i of e){let a=S1(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var lT,cT=l(()=>{"use strict";Pr();aT();A1();lT=async(e,t)=>{let r=iT(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=q({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await $s(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=P1(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await nT(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&h1(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var dT,Ar,Ka=l(()=>{"use strict";dT=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Ar=(e,t)=>e.find(r=>r.id===t)??null});var qr,Va=l(()=>{"use strict";Pr();cT();Ka();qr=async(e,t)=>{t!==void 0&&await lT(t,e);let r=q({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await $s(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach AgentWitch Cloud. Check the computer connection and try again."};let n=dT(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in AgentWitch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from AgentWitch Cloud.`}}});var _1=l(()=>{"use strict"});var pT,ude,zh,uT=l(()=>{"use strict";pT=u(require("node:fs"));Ns();ude=e=>{let t=Xt(e);if(!pT.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(pT.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},zh=ude});var mT,gT,b1=l(()=>{"use strict";mT=u(require("node:path"));Gr();uT();gT=e=>{let t=mT.default.resolve(je(e)),r=o=>{let{projectId:n}=zh(o);if(n!==null)return n;let s=mT.default.dirname(o);return s===o?null:r(s)};return r(t)}});var mde,gde,Uh,fT=l(()=>{"use strict";mde="Default",gde=e=>e.trim().toLowerCase()===mde.toLowerCase(),Uh=gde});var Bh,Gh,Kh=l(()=>{"use strict";Bh={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},Gh=e=>{let t=Object.entries(Bh).find(([,r])=>r===e);return t===void 0?null:t[0]}});var R1,Ee,w1,fde,yT,hT,k1,yde,hde,Sp,ST,Sde,Pde,Ade,E1,T1=l(()=>{"use strict";gt();Kh();R1="new",Ee=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),w1={block:"Must fix",warn:"Warning",info:"Note"},fde={seed:"Built-in",project:"This project",retired:"Retired"},yT=6e4,hT=60*yT,k1=24*hT,yde=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<yT)return"Last hit just now";if(o<hT)return`Last hit ${Math.floor(o/yT)} min ago`;if(o<k1)return`Last hit ${Math.floor(o/hT)}h ago`;let n=Math.floor(o/k1);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},hde=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},Sp=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,ST=e=>e?{retired:"1"}:{},Sde=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${w1[a]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${Ee(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${Ee(t?.id??"")}" />
      <input type="hidden" name="tags" value="${Ee((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${We.symptom}" value="${Ee(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${We.avoidance}" rows="3" placeholder="What to do instead">${Ee(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${We.cause}" rows="2" placeholder="What leads to this trap">${Ee(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${Ee((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${We.checkValue}" value="${Ee(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${Ee(Sp(e.projectId,ST(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},Pde=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${Ee(r)}" />
            <input type="hidden" name="pitfallId" value="${Ee(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${Ee(Sp(r,{...ST(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>Ee(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${Ee(t.id)}">
        <p><strong>${Ee(t.symptom)}</strong> <span class="muted">\xB7 ${w1[t.severity]} \xB7 ${fde[t.source]}</span></p>
        <p>Fix: ${Ee(t.avoidance)}</p>
        ${a}
        <p class="muted">${Ee(yde(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${Ee(hde(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},Ade=e=>{let t=e.postPaths??Bh;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this computer on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=un(o),s=n>=64,i=e.showRetired?o:o.filter(y=>y.source!=="retired"),a=e.editId===null?null:e.editId===R1?s?null:{item:null}:(()=>{let y=o.find(S=>S.id===e.editId&&S.source!=="retired");return y===void 0?null:{item:y}})(),c=a===null?"":Sde({projectId:e.projectId,item:a.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">Limit reached: ${64} active pitfalls. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${Ee(Sp(e.projectId,{...ST(e.showRetired),edit:R1}))}">Add pitfall</a>`,p=e.showRetired?`<a class="btn btn-secondary" href="${Ee(Sp(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${Ee(Sp(e.projectId,{retired:"1"}))}">Show retired</a>`,m=o.length>0?"No active pitfalls. Turn on Show retired to see retired ones.":"No pitfalls for this project. Add one when you spot a mistake that keeps coming back.",g=i.length===0?`<p class="empty">${m}</p>`:`<ul class="harness-installed-set-list">${i.map(y=>Pde({projectId:e.projectId,item:y,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      ${o.length===0?"":`<p class="muted">${n} of ${o.length} active</p>`}
      <div class="actions">${a===null?d:""}${p}</div>
      ${c}
      ${g}
    </section>`},E1=Ade});var ge,I1,_de,bde,Rde,kde,wde,Rn,Vh=l(()=>{"use strict";fT();gt();T1();ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I1=(e,t)=>e.length===0?`<p class="empty">${ge(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${ge(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${ge(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in AgentWitch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,_de=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this computer yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,bde=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from AgentWitch Cloud.":"This project\u2019s playbook is linked in AgentWitch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${ge(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},Rde=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${ge(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
          <input type="hidden" name="projectId" value="${ge(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${ge(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the profile harness on this computer \u2014 refresh from AgentWitch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${ge(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this computer if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},kde=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?Rde({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?bde({project:e.project,alreadyInRepo:!1}):_de();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),p=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
            <input type="hidden" name="projectId" value="${ge(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${ge(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${ge(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${ge(c.name)}</strong> <span class="muted mono">(${ge(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${p}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${ge(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${a}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},wde=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${ge(t)} from recent runs. Review in AgentWitch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${ge(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Rn=e=>{let t=e.flashError?`<div class="alert-error">${ge(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ge(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(g,y)=>`<a class="project-tab${e.activeTab===g?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${g}">${ge(y)}</a>`,n=e.composition?.items.filter(g=>g.kind==="workflow")??[],s=e.composition?.items.filter(g=>g.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":{let g=kde({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}),y=e.harnessExtraHtml?.trim()??"";return y.length===0?g:`${g}${y}`}case"workflows":return I1(n,"No workflows installed for this project yet.");case"agents":return I1(s,"No agents installed for this project yet.");case"knowledge":return wde({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return E1({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${un(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,p=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${ge(c)}" target="_blank" rel="noopener noreferrer">Open in AgentWitch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${ge(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,m=Uh(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from AgentWitch Cloud only. The folder on this computer is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from AgentWitch Cloud? Your repo folder on this computer will stay.');">
          <input type="hidden" name="projectId" value="${ge(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${ge(e.project.name)}</h1>
      <p class="muted mono">${ge(e.project.projectFolderPath)}</p>
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
    </section>${m}`}});var Ede,Tde,C1,L1=l(()=>{"use strict";bn();ht();Ede=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Tde=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!Ede(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Vr(n);return s===null?[]:[s]})}catch{return null}},C1=Tde});var v1,PT,x1=l(()=>{"use strict";te();bn();Vh();Va();L1();Ka();za();Pr();pr();v1=e=>({kind:"page",title:e.project.name,body:Rn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Ro(e.layout),linkedSetSlugs:Zt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),PT=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=B();if(r===null)return{kind:"not_found"};let o=await qr(r,e.layout),n=Ar(o.projects,t);if(n===null)return{kind:"not_found"};let s=q({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??xt,a=s===null?null:await C1(s,n.id);if(a===null)return v1({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from AgentWitch Cloud."});let c=ME({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return v1({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await wo(s,n.id,c.appliedSetSlugs),p=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${p.toString()}`}}});var W1,AT,O1=l(()=>{"use strict";te();bn();pr();Pr();Vh();sp();Gr();Va();Ka();za();lh();mE();ph();hE();W1=e=>({kind:"page",title:e.project.name,body:Rn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Ro(e.layout),linkedSetSlugs:Zt(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),AT=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=B();if(n===null)return{kind:"not_found"};let s=await qr(n,e.layout),i=Ar(s.projects,r);if(i===null)return{kind:"not_found"};let a=q({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??xt;if(o.length===0)return W1({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=je(i.projectFolderPath),p=Mt({projectFolderPath:d}),{ledgerFilePath:m}=Fa(p.layout),g=Ha(m),y=LE(g);if(!y.includes(o))return W1({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let S=y.filter(f=>f!==o),A=dh({repoRoot:p.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:g});np(m,A.ledger);let E=a===null?!1:await wo(a,i.id,S),I=new URLSearchParams({linked:"1",removed:o,files:String(A.summary.removedPaths.length),bindingsSynced:E?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${I.toString()}`}}});var Ide,Cde,j1,Lde,vde,Pp,_T=l(()=>{"use strict";gt();ht();Ide=1e4,Cde=15e3,j1=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},Lde=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},vde=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(j1(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[ie]:e.pairingToken},signal:AbortSignal.timeout(Ide)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=Rk(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(j1(e.appOrigin,r),{method:"PUT",headers:{[ie]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(Cde)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:Lde(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Pp=vde});var bT,M1,xde,Wde,Ode,jde,N1,D1=l(()=>{"use strict";gt();bT=e=>e.replace(/\s+/g," ").trim(),M1=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=bT(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},xde=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),Wde=(e,t)=>{let r=xde(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,We.id).replace(/-+$/g,"")},Ode=e=>e==="block"||e==="info"?e:"warn",jde=e=>{let{form:t}=e,r=bT(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=bT(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>We.symptom||o.length>We.avoidance||n.length>We.cause||s.length>We.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:Wde(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:M1(t.get("keywords")??"",We.keywords,We.keyword),tags:M1(t.get("tags")??"",We.tags,We.tag),source:"project",severity:Ode(t.get("severity"))}}},N1=jde});var F1,Mde,Eo,H1,qh,Nde,Dde,$1,z1=l(()=>{"use strict";F1=require("node:crypto");gt();D1();Kh();Mde=()=>(0,F1.randomBytes)(3).toString("hex"),Eo=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},H1=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),qh=new Map,Nde=async(e,t)=>{let r=qh.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);qh.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),qh.get(e)===s&&qh.delete(e)}},Dde=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return Nde(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return Eo(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return Eo(o,"unavailable",s);if(e.action==="save"){let d=N1({form:e.form,randomSuffix:e.randomSuffix??Mde});if(!d.ok)return Eo(o,"invalid",s);let p=i.items.find(y=>y.id===d.pitfall.id);if((p===void 0||p.source==="retired")&&un(i.items)>=64)return Eo(o,"limit",s);let g=await n.upsertPitfall(o,d.pitfall);return Eo(o,g.ok?"saved":g.reason==="active_limit"?"limit":g.reason,s)}let a=i.items.find(d=>d.id===t);if(a===void 0)return Eo(o,"missing",s);if(e.action==="restore"){if(a.source==="retired"&&un(i.items)>=64)return Eo(o,"limit",s);let d=await n.upsertPitfall(o,H1(a,"project"));return Eo(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,H1(a,"retired"));return Eo(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},$1=Dde});var Jh,U1,B1,RT=l(()=>{"use strict";Jh=new Map,U1=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=Jh.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&Jh.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},B1=e=>{if(e===void 0){Jh.clear();return}Jh.delete(e)}});var kT,G1=l(()=>{"use strict";te();Pr();Va();Ka();_T();z1();RT();kT=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=B();if(o===null)return{kind:"not_found"};let n=await qr(o,e.layout),s=Ar(n.projects,r);if(s===null)return{kind:"not_found"};let i=q({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),a=e.createStore??Pp,c=i===null?null:a(i),d=await $1({action:e.action,form:t,projectId:s.id,store:c});return B1(s.id),{kind:"redirect",location:d}}});var Hde,wT,K1=l(()=>{"use strict";Hde=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,wT=Hde});var V1=l(()=>{"use strict"});var q1=l(()=>{"use strict"});var J1=l(()=>{"use strict";V1();q1()});var Fde,kn,Y1=l(()=>{"use strict";Fde=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],kn=(e=process.env)=>{let t={...e};for(let r of Fde)delete t[r];return t}});var X1=l(()=>{"use strict";Y1()});var ET,Z1=l(()=>{"use strict";ET={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#2150d6",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var TT=l(()=>{"use strict";Z1()});var Yh,IT=l(()=>{"use strict";Yh={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history",PROJECT_HISTORY_PAGE_REQUEST:"project.history.page.request",PROJECT_HISTORY_PAGE_RESULT:"project.history.page.result"}});var Xh=l(()=>{"use strict";J1();X1();pr();TT();IT()});var Q1,eB,$de,Zh,Qh,tB=l(()=>{"use strict";Q1=require("node:child_process"),eB=require("node:util");Xh();$de=(0,eB.promisify)(Q1.execFile),Zh=async(e,t)=>{try{let{stdout:r}=await $de("git",t,{cwd:e,env:kn(),maxBuffer:1048576});return r.trim()}catch{return null}},Qh=async e=>{let t=await Zh(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Zh(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Zh(e,["status","--porcelain"]),n=await Zh(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var CT,rB=l(()=>{"use strict";CT=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var zde,LT,oB=l(()=>{"use strict";zde=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},LT=zde});var Ude,Bde,_r,qa=l(()=>{"use strict";ft();Ude=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,Bde=e=>fn(e).scrubbed.replace(Ude,"[redacted-email]"),_r=Bde});var Gde,vT,nB=l(()=>{"use strict";ht();qa();Gde=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[ie]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:_r(r.lesson)}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},vT=Gde});var sB,wn,iB=l(()=>{"use strict";sB=require("node:child_process"),wn=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,sB.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var aB=l(()=>{"use strict";Va()});var Kde,xT,WT=l(()=>{"use strict";ht();Kde=e=>{let t=e?.project;return typeof t?.name=="string"&&t.name.trim().length>0?t.name.trim():null},xT=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[ie]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return{ok:!1,httpStatus:o.status};let n=await o.json().catch(()=>null);return{ok:!0,projectName:Kde(n)}}catch{return{ok:!1,httpStatus:null}}}});var OT,lB=l(()=>{"use strict";ht();OT=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach AgentWitch Cloud."}}}});var cB,Vde,To,jT,MT=l(()=>{"use strict";cB=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},Vde=e=>e===""?null:e,To=e=>e??"",jT=e=>({id:e.id,projectId:Vde(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:cB(e.keywords_json),tags:cB(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var dB,qde,Jde,NT,Ja,eS,Ap=l(()=>{"use strict";MT();dB=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,qde=e=>e,Jde=e=>e??null,NT=(e,t,r=t)=>qde(e.prepare(dB).all(To(r),To(t))).map(jT),Ja=(e,t,r,o=t)=>{let n=Jde(e.prepare(`${dB} AND p.id = ?`).get(To(o),To(t),r));return n===null?null:jT(n)},eS=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(To(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var tS,DT=l(()=>{"use strict";gt();tS=e=>e.map(t=>({id:hs(t.id),avoidance:hs(t.avoidance)}))});var rS,pB,oS=l(()=>{"use strict";rS=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},pB=e=>e.filter(t=>t.source!=="retired").length});var Us,uB,_p=l(()=>{"use strict";gt();DT();Ap();oS();Us=(e,t={})=>{let r=t.projectId??null,o=NT(e,null,r),n=r===null||r===""?[]:NT(e,r);return rS({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},uB=(e,t={})=>{let r=Us(e,t);return t.format==="bot"?{format:"bot",items:tS(r),lines:r.map(o=>pd(o))}:{format:"full",items:r}}});var nS,HT=l(()=>{"use strict";Ap();_p();nS=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?Ja(e,null,r):Us(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var FT=l(()=>{"use strict"});var En,Ya,mB,gB,fB=l(()=>{"use strict";En=e=>({type:"string",description:e}),Ya={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:En("Absolute working directory for the current session."),message:En("User prompt or task text to match."),sessionId:En("Optional session id for first-message tracking."),projectId:En("Optional project id when already known.")},additionalProperties:!1}},mB={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:En("Absolute working directory."),projectId:En("Optional project id when already known.")},additionalProperties:!1}},gB={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:En("Project id."),q:En("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Bs,yB,hB,SB=l(()=>{"use strict";Bs=e=>({type:"string",description:e}),yB={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Bs("Project id."),skillId:Bs("Skill id when known."),q:Bs("Optional search text.")},required:["projectId"],additionalProperties:!1}},hB={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Bs("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Bs("Pitfall id when kind is pitfall."),preflightId:Bs("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Bs("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var PB=l(()=>{"use strict";fB();SB()});var Rp,AB=l(()=>{"use strict";gt();FT();Rp=e=>{let t=dy("AgentWitch tip \xB7 check_context",120);if(mr(t)>=120)return t;let r=[t],o=mr(t);for(let n of e){if(r.length-1>=4)break;let s=pd(n),i=mr(s);if(o+i>120){if(r.length===1){let a=120-o,c=dy(s,a);c.length>0&&(r.push(c),o+=mr(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var _B=l(()=>{"use strict";gt()});var kp=l(()=>{"use strict";FT();PB();AB();_B()});var Yde,Xde,Xa,$T=l(()=>{"use strict";kp();Yde=e=>e.toLowerCase(),Xde=(e,t)=>{let r=Yde(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},Xa=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:Xde(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var bB,RB=l(()=>{"use strict";_p();$T();bB=(e,t)=>{let r=Us(e,{projectId:t.projectId,includeRetired:!1});return Xa({pitfalls:r,text:t.text})}});var Zde,Qde,epe,tpe,kB,Nt,wB,iS,zT=l(()=>{"use strict";Zde="22.13",Qde=e=>typeof e=="object"&&e!==null&&typeof e.DatabaseSync=="function",epe=e=>{let t={ok:!1,reason:`Node ${e.nodeVersion} has no node:sqlite (needs Node ${Zde}+)`};if(e.getBuiltinModule===null)return t;try{let r=e.getBuiltinModule("node:sqlite");return Qde(r)?{ok:!0,sqlite:r}:t}catch{return t}},tpe=()=>typeof process.getBuiltinModule=="function"?e=>process.getBuiltinModule(e):null,kB=new Map,Nt=()=>{let e=kB.get("process");if(e!==void 0)return e;let t=epe({getBuiltinModule:tpe(),nodeVersion:process.version});return kB.set("process",t),t},wB=()=>{let e=Nt();if(!e.ok)throw new Error(`Pitfall cache unavailable: ${e.reason}`);return e.sqlite},iS=()=>{let e=Nt();return e.ok?null:`[agent-witch] Pitfall cache (check_context) is off: ${e.reason}. Everything else runs.`}});var EB,wp=l(()=>{"use strict";hy();EB=3e3});var TB,IB=l(()=>{"use strict";wp();TB=`
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
`});var CB,LB,rpe,ope,vB,xB,WB=l(()=>{"use strict";CB=u(require("node:fs")),LB=u(require("node:path"));zT();wp();IB();rpe=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},ope=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},vB=e=>{CB.default.mkdirSync(LB.default.dirname(e),{recursive:!0});let{DatabaseSync:t}=wB(),r=new t(e);return r.exec(`PRAGMA busy_timeout = ${EB}`),r.exec(TB),rpe(r)<fd&&ope(r,fd),r},xB=e=>{e.close()}});var OB,jB,UT=l(()=>{"use strict";MT();OB=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(To(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},jB=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(To(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var MB,NB=l(()=>{"use strict";HT();UT();MB=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:nS(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=OB(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var BT,aS,GT=l(()=>{"use strict";BT=u(require("node:path"));Fe();aS=(e,t)=>e.profileEmail!==null?BT.default.join(e.installDir,mt,e.profileEmail,t):BT.default.join(e.installDir,t)});var Za,KT=l(()=>{"use strict";wp();GT();Za=e=>aS(e,Tk)});var HB,DB=l(()=>{HB=[{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]}]});var spe,ipe,lS,VT=l(()=>{"use strict";DB();spe=HB,ipe=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),lS=()=>spe.map(ipe)});var FB,$B,zB=l(()=>{"use strict";gt();FB="id, symptom, cause, avoidance, check_kind, check_value, keywords_json, tags_json",$B=(e,t)=>{let r=t.map(()=>"?").join(", "),o=`project_id = '' AND source = 'seed'${t.length>0?` AND id NOT IN (${r})`:""}`,n=Ak;e.prepare(`INSERT INTO pitfalls (project_id, ${FB}, source, severity)
     SELECT ?, ${FB}, 'project', severity
     FROM pitfalls
     WHERE ${o}
       AND (EXISTS (SELECT 1 FROM pitfalls WHERE project_id = ?)
         OR EXISTS (SELECT 1 FROM pitfall_hits WHERE project_id = ?))
     ON CONFLICT(project_id, id) DO NOTHING`).run(n,...t,n,n);let s=e.prepare(`DELETE FROM pitfalls WHERE ${o}`).run(...t);return Number(s.changes)}});var UB,BB=l(()=>{"use strict";VT();Ap();zB();UB=e=>{let t=lS();return $B(e,t.map(r=>r.id)),t.reduce((r,o)=>Ja(e,null,o.id)!==null?r:(eS(e,o),r+1),0)}});var GB,KB,VB=l(()=>{"use strict";wp();GB=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>gy?{kind:"field_too_long",field:"symptom",max:gy}:e.cause.length>fy?{kind:"field_too_long",field:"cause",max:fy}:e.avoidance.length>yy?{kind:"field_too_long",field:"avoidance",max:yy}:null,KB=e=>e.activeCountAfter>ha?{kind:"active_cap",max:ha}:null});var qB,JB=l(()=>{"use strict";Ap();UT();_p();oS();VB();qB=(e,t)=>{let r=GB(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=Ja(e,t.projectId,o),s=jB(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=Us(e,{projectId:t.projectId,includeRetired:!0}).filter(g=>g.id!==a.id),p=pB([...d,a]),m=KB({activeCountAfter:p});return m!==null?{ok:!1,error:m}:(eS(e,a),{ok:!0,pitfall:a})}});var Gs,qT=l(()=>{"use strict";HT();_p();RB();WB();NB();KT();BB();JB();Gs=e=>{let t=e.dbPath??(e.layout!==void 0?Za(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=vB(t);return UB(r),{dbPath:t,listPitfalls:o=>uB(r,o),getPitfall:o=>nS(r,o),upsertPitfall:o=>qB(r,o),recordHit:o=>MB(r,o),matchPitfalls:o=>bB(r,o),close:()=>xB(r)}}});var ape,lpe,cS,JT=l(()=>{"use strict";kp();DT();ape=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},lpe=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},cS=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=ape(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};lpe(e,e.registry,n,s);let i=tS(s);return{status:"hit",projectId:n,pitfalls:i,tip:Rp(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var dS,YB=l(()=>{"use strict";kp();dS={name:Ya.name,description:Ya.description,inputSchema:Ya.inputSchema}});var Io,XB,ZB,Co,cpe,Qa,QB,Ep=l(()=>{"use strict";Io=u(require("node:fs")),XB=u(require("node:os")),ZB=u(require("node:path")),Co=()=>({readUtf8:e=>Io.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{Io.default.writeFileSync(e,t,"utf8")},exists:e=>Io.default.existsSync(e),mkdirp:e=>{Io.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{Io.default.renameSync(e,t)},realpath:e=>Io.default.realpathSync.native(e)}),cpe=()=>({homedir:()=>XB.default.homedir()}),Qa=()=>({...Co(),...cpe()}),QB=e=>({...Co(),homedir:()=>e,realpath:r=>{let o=ZB.default.resolve(r);return Io.default.existsSync(o)?Io.default.realpathSync.native(o):o}})});var pS,eG=l(()=>{"use strict";pS=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var YT,tG=l(()=>{"use strict";GT();gr();YT=e=>aS(e,c$)});var rG,Qe,Lo=l(()=>{"use strict";rG=u(require("node:path")),Qe=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(rG.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var uS,dpe,Tp,oG,mS,gS,el,fS=l(()=>{"use strict";Ep();eG();tG();Lo();uS=()=>({byRealpath:{}}),dpe=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return uS();let r=t.byRealpath;return typeof r!="object"||r===null?uS():{byRealpath:r}}catch{return uS()}},Tp=(e,t=Co())=>{let r=YT(e);return t.exists(r)?dpe(t.readUtf8(r)):uS()},oG=(e,t,r)=>{Qe({fs:r,filePath:YT(e),contents:`${JSON.stringify(t,null,2)}
`})},mS=e=>{let t=e.fs??Co(),r=pS(e.cwd,t),o={declinedAt:e.nowIso??new Date().toISOString(),cwd:e.cwd},n=Tp(e.layout,t);return oG(e.layout,{byRealpath:{...n.byRealpath,[r]:o}},t),o},gS=e=>{let t=e.fs??Co(),r=pS(e.cwd,t),o=Tp(e.layout,t);if(o.byRealpath[r]===void 0)return!1;let n=Object.fromEntries(Object.entries(o.byRealpath).filter(([s])=>s!==r));return oG(e.layout,{byRealpath:n},t),!0},el=e=>{let t=e.fs??Co(),r=pS(e.cwd,t);return Tp(e.layout,t).byRealpath[r]!==void 0}});var Tn,yS,XT=l(()=>{"use strict";Tn=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},yS=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Tn(t,"cwd")!==void 0?{cwd:Tn(t,"cwd")}:{},...Tn(t,"message")!==void 0?{message:Tn(t,"message")}:{},...Tn(t,"sessionId")!==void 0?{sessionId:Tn(t,"sessionId")}:{},...Tn(t,"projectId")!==void 0?{projectId:Tn(t,"projectId")}:{}}}});var In,hS=l(()=>{"use strict";St();JT();qT();fS();XT();In=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>el({layout:e.layout,cwd:o}));return o=>{let n=yS(o),s=null;try{return s=Gs({layout:e.layout}),cS({registry:s,resolveProjectId:gT,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var nG,sG=l(()=>{"use strict";nG=["AgentWitch \xB7 check_context: this folder is not an AgentWitch project yet.","Ask the user once whether to add it in AgentWitch Local (Projects) so saved pitfalls show up here.","If they decline or ignore it, do not ask again this session."].join(`
`)});var ppe,ZT,upe,mpe,gpe,SS,QT=l(()=>{"use strict";sG();ppe="UserPromptSubmit",ZT=(e,t)=>{let r=e[t];return typeof r=="string"&&r.trim().length>0?r:void 0},upe=e=>{let t;try{t=JSON.parse(e)}catch{return null}if(typeof t!="object"||t===null||Array.isArray(t))return null;let r=t,o=ZT(r,"cwd"),n=ZT(r,"prompt"),s=ZT(r,"session_id");return{...o!==void 0?{cwd:o}:{},...n!==void 0?{message:n}:{},...s!==void 0?{sessionId:s}:{}}},mpe=e=>{if(e.status==="hit"){let t=e.tip?.trim()??"";return t.length>0?t:null}return e.status==="none"&&e.promptCreate===!0?nG:null},gpe=e=>`${JSON.stringify({hookSpecificOutput:{hookEventName:ppe,additionalContext:e}})}
`,SS=async e=>{try{let t=upe(await e.readStdin());if(t===null)return e.writeStderr(`[agent-witch] mcp-hook: stdin is not a JSON object
`),0;let r=mpe(await e.runCheckContext(t));r!==null&&e.writeStdout(gpe(r))}catch(t){let r=t instanceof Error?t.message:String(t);try{e.writeStderr(`[agent-witch] mcp-hook: ${r}
`)}catch{}}return 0}});var fpe,ype,iG,aG=l(()=>{"use strict";hS();QT();fpe=1500,ype=(e,t)=>new Promise(r=>{let o=[],n=!1,s=()=>{n||(n=!0,clearTimeout(i),e.removeAllListeners("data"),e.removeAllListeners("end"),e.removeAllListeners("error"),e.pause(),r(Buffer.concat(o).toString("utf8")))},i=setTimeout(s,t);e.on("data",a=>{o.push(Buffer.isBuffer(a)?a:Buffer.from(a,"utf8"))}),e.on("end",s),e.on("error",s)}),iG=async e=>{let t=r=>{process.stderr.write(r)};return SS({readStdin:()=>ype(process.stdin,fpe),writeStdout:r=>{process.stdout.write(r)},writeStderr:t,runCheckContext:In({layout:e.layout,logError:r=>{let o=r instanceof Error?r.message:String(r);t(`[agent-witch] mcp-hook check_context: ${o}
`)}})})}});var hpe,PS,lG=l(()=>{"use strict";hS();XT();hpe="/api/local/check-context",PS=async e=>{if(e.pathname!==hpe)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=In({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(yS(t))),!0}});var cG,AS,Spe,Ppe,dG,pG=l(()=>{"use strict";cG=u(require("node:path"));gr();Lo();AS=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Spe={hooks:[{type:"command",command:Ek,timeout:3,[Ss]:!0}]},Ppe=e=>Array.isArray(e)&&e.some(t=>AS(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>AS(r)&&(r.command===Ek||r[Ss]===!0))),dG=e=>{let t=cG.default.join(e.io.homedir(),l$),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));AS(a)&&(r={...a})}catch{r={}}let o=AS(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(Ppe(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(Spe),o.UserPromptSubmit=s;let{backupPath:i}=Qe({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var tl,_S=l(()=>{"use strict";gr();tl=e=>{let t=e.begin??ma,r=e.end??ga,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let p=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:p,changed:p!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var uG,Ape,mG,gG=l(()=>{"use strict";uG=u(require("node:path"));_S();gr();Lo();Ape=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),mG=e=>{let t=uG.default.join(e.io.homedir(),a$),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=tl({existing:r,blockBody:Ape,begin:ma,end:ga});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Qe({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var fG,yG,hG=l(()=>{"use strict";fG=u(require("node:path"));_S();gr();Lo();yG=e=>{let t=fG.default.join(e.io.homedir(),i$),r=uy.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${md}]`,`command = "${gd}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=tl({existing:n,blockBody:o,begin:ma,end:ga});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=Qe({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var SG,eI,PG,AG=l(()=>{"use strict";SG=u(require("node:path"));gr();Lo();eI=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),PG=e=>{let t=SG.default.join(e.io.homedir(),s$),r={command:gd,args:[...uy]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));eI(d)&&(o={...d})}catch{o={}}let n=eI(o.mcpServers)?{...o.mcpServers}:{},s=n[md];if(eI(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[md]=r;let a={...o,mcpServers:n},{backupPath:c}=Qe({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var rl,tI=l(()=>{"use strict";Ep();pG();gG();hG();AG();rl=e=>{let t=e?.io??Qa();return{ok:!0,cursorMcp:PG({io:t}),codexConfig:yG({io:t}),codexAgents:mG({io:t}),claudeHook:dG({io:t})}}});var _G,bG=l(()=>{"use strict";gr();_G=e=>{let t=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with this folder's cwd.",`projectId: ${e}`,"If status is miss or none (already declined), stay silent.","If status is hit, follow the tip. Do not dump large context."].join(`
`);return["---","description: AgentWitch check_context (token-saver)","alwaysApply: true","---","",fa,t,ud,""].join(`
`)}});var RG,_pe,kG,wG=l(()=>{"use strict";RG=u(require("node:path"));bG();gr();_S();Lo();_pe=e=>e.slice(e.indexOf(fa)+fa.length,e.indexOf(ud)).trim(),kG=e=>{let t=RG.default.join(e.projectRoot,py),r=_G(e.projectId);if(!e.fs.exists(t))return Qe({fs:e.fs,filePath:t,contents:r}),{ok:!0,path:t,wrote:!0};let{next:o,changed:n}=tl({existing:e.fs.readUtf8(t),blockBody:_pe(r),begin:fa,end:ud});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Qe({fs:e.fs,filePath:t,contents:o,backup:!0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var oI,rI,EG,TG=l(()=>{"use strict";oI=u(require("node:path"));Lo();rI="# agent-witch-token-saver (local; never commit)",EG=e=>{let t=oI.default.join(e.repoRoot,".git");if(!e.fs.exists(t))return{ok:!1,reason:"not a git working tree"};let r=oI.default.join(t,"info","exclude"),o=e.fs.exists(r)?e.fs.readUtf8(r):"",n=o.length>0?o.split(/\r?\n/):[],s=new Set(n.map(c=>c.trim())),i=e.relativePaths.filter(c=>!s.has(c));if(i.length===0&&s.has(rI))return{ok:!0,path:r,wrote:!1};let a=[...n];for(;a.length>0&&a[a.length-1]==="";)a.pop();s.has(rI)||a.push("",rI);for(let c of i)a.push(c);return a.push(""),Qe({fs:e.fs,filePath:r,contents:a.join(`
`)}),{ok:!0,path:r,wrote:i.length>0}}});var bS,nI=l(()=>{"use strict";gr();wG();TG();bS=e=>{let t=kG({fs:e.fs,projectRoot:e.projectRoot,projectId:e.projectId}),r=EG({fs:e.fs,repoRoot:e.projectRoot,relativePaths:[py]});return{ok:!0,cursorRule:t,gitExclude:r}}});var sI,iI,RS,aI,lI=l(()=>{"use strict";sI=["pitfalls","preflight","localMcp","history","ollama","skillGen"],iI=["on","off","degraded","unavailable"],RS={pitfalls:"on",preflight:"on",localMcp:"on",history:"off",ollama:"off",skillGen:"off"},aI=()=>({...RS})});var bpe,Rpe,cI,IG=l(()=>{"use strict";lI();bpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Rpe=e=>iI.find(t=>t===e)??null,cI=e=>{if(!bpe(e))return null;let t={...RS};for(let r of sI){let o=Rpe(e[r]);o!==null&&(t[r]=o)}return t}});var CG=l(()=>{"use strict";lI();IG()});var LG,kpe,wpe,vG,xG=l(()=>{"use strict";LG=u(require("node:path"));St();CG();Lo();kpe="token-saver.json",wpe=(e,t)=>{if(!e.exists(t))return null;try{return cI(JSON.parse(e.readUtf8(t)))}catch{return null}},vG=e=>{let t=LG.default.join(e.projectRoot,od,kpe),r=e.flags??{...aI(),...wpe(e.fs,t)},o=`${JSON.stringify(r,null,2)}
`;return e.fs.exists(t)&&e.fs.readUtf8(t)===o?{ok:!0,path:t,wrote:!1}:(Qe({fs:e.fs,filePath:t,contents:o}),{ok:!0,path:t,wrote:!0})}});var vo,Jr,kS,dI=l(()=>{"use strict";vo=(e,t)=>{if(t==="remove")return{ok:!0,state:"Connected"};switch(e){case"Unconnected":return t==="connect"?{ok:!0,state:"SigningIn"}:Jr(e,t);case"SigningIn":return t==="signInComplete"?{ok:!0,state:"Connected"}:Jr(e,t);case"Connected":return t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Jr(e,t);case"GlobalTriggersWritten":return t==="decline"?{ok:!0,state:"Declined"}:t==="accept"?{ok:!0,state:"ProjectResolved"}:t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Jr(e,t);case"Declined":return t==="clearDecline"?{ok:!0,state:"GlobalTriggersWritten"}:Jr(e,t);case"ProjectResolved":return t==="applyDefaults"?{ok:!0,state:"DefaultsApplied"}:Jr(e,t);case"DefaultsApplied":return t==="writeProjectFragments"?{ok:!0,state:"ProjectFragmentsWritten"}:Jr(e,t);case"ProjectFragmentsWritten":return t==="verify"?{ok:!0,state:"Verified"}:Jr(e,t);case"Verified":return t==="accept"||t==="writeProjectFragments"?{ok:!0,state:e}:Jr(e,t);default:return Jr(e,t)}},Jr=(e,t)=>({ok:!1,reason:`Illegal transition ${e} + ${t}`,state:e}),kS=e=>e==="Declined"});var Epe,Tpe,WG,OG=l(()=>{"use strict";xG();Ep();fS();dI();tI();nI();Epe="projectId required on accept",Tpe=e=>{let t=e.projectId;if(e.resolveProject!==void 0)try{t=e.resolveProject(e.cwd).projectId}catch(o){return{ok:!1,reason:`project resolve failed: ${o instanceof Error?o.message:String(o)}`}}let r=t?.trim()??"";return r.length>0?{ok:!0,projectId:r}:{ok:!1,reason:Epe}},WG=e=>{let t=e.fs??Co(),r=e.io??Qa(),o=e.fromState??"GlobalTriggersWritten";if(!e.accept){let d=vo(o,"decline");return d.ok?(mS({layout:e.layout,cwd:e.cwd,fs:t}),{ok:!0,state:"Declined"}):{ok:!1,state:d.state,reason:d.reason}}let n=kS(o)||el({layout:e.layout,cwd:e.cwd,fs:t});n&&(o="Declined");let s=Tpe(e);if(!s.ok)return{ok:!1,state:o,reason:s.reason};if(n){let d=vo(o,"clearDecline");if(!d.ok)return{ok:!1,state:d.state,reason:d.reason};gS({layout:e.layout,cwd:e.cwd,fs:t}),o=d.state}rl({io:r}),o=vo(o,"writeGlobalTriggers").ok?"GlobalTriggersWritten":o;let i=vo(o,"accept");if(!i.ok)return{ok:!1,state:i.state,reason:i.reason};o=i.state;let a=vo(o,"applyDefaults");if(!a.ok)return{ok:!1,state:a.state,reason:a.reason};vG({fs:t,projectRoot:e.cwd}),o=a.state;let c=vo(o,"writeProjectFragments");return c.ok?(bS({fs:t,projectRoot:e.cwd,projectId:s.projectId}),{ok:!0,state:c.state,projectId:s.projectId}):{ok:!1,state:c.state,reason:c.reason}}});var jG={};vt(jG,{AWL_CHECK_CONTEXT_TOOL:()=>dS,checkContext:()=>cS,clearProjectDecline:()=>gS,createCheckContextRunner:()=>In,createNodeCliIo:()=>Qa,createPitfallRegistry:()=>Gs,createTempCliIo:()=>QB,declineProjectForCwd:()=>mS,describePitfallCacheAvailability:()=>iS,isDeclinedCwd:()=>el,isDeclinedTerminal:()=>kS,listBundledSeedPitfalls:()=>lS,loadNodeSqlite:()=>Nt,matchPitfallsByKeywords:()=>Xa,readDeclinedProjectsStore:()=>Tp,resolveTokenSaverDbPath:()=>Za,runCheckContextHook:()=>SS,runCheckContextHookCli:()=>iG,runSetupProject:()=>WG,shadowPitfalls:()=>rS,transitionSetupProject:()=>vo,tryHandleTokenSaverLocalRequest:()=>PS,writeGlobalTriggers:()=>rl,writeProjectFragments:()=>bS});var Yr=l(()=>{"use strict";qT();zT();KT();$T();oS();VT();JT();YB();hS();QT();aG();lG();tI();nI();OG();fS();dI();Ep()});var pI,MG=l(()=>{"use strict";pI=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var NG,DG,Ipe,Cpe,Lpe,wS,uI=l(()=>{"use strict";Yr();hy();MG();NG=e=>{try{return e.dbPath!==void 0?Gs({dbPath:e.dbPath}):e.layout!==void 0?(Za(e.layout),Gs({layout:e.layout})):null}catch{return null}},DG=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},Ipe=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},Cpe=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},Lpe=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=NG(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(Ipe(n,r,i.items),{ok:!0,items:DG(n,r,o.includeRetired).map(pI),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:DG(n,r,o.includeRetired).map(pI),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=NG(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:Cpe(s.error)}finally{n.close()}}}},wS=Lpe});var ol,Ks,ES=l(()=>{"use strict";ol=u(require("node:path")),Ks=(e,t)=>{if(!ol.default.isAbsolute(e)||!ol.default.isAbsolute(t))return!1;let r=ol.default.relative(t,e);return r.length===0?!0:r!==".."&&!r.startsWith(`..${ol.default.sep}`)&&!ol.default.isAbsolute(r)}});var TS,HG,FG=l(()=>{"use strict";ft();ES();TS=e=>({ok:!1,code:e}),HG=e=>{let t=e.requestedLexicalPath;if(t===null)return TS(de.FOLDER_REQUIRED);if(e.roots===null)return TS(de.FOLDER_CHECK_UNAVAILABLE);let r=e.requestedRealPath;if(r===null){let n=e.roots.some(s=>Ks(t,s.lexicalPath));return TS(n?de.FOLDER_NOT_FOUND:de.FOLDER_NOT_REGISTERED)}return e.roots.some(n=>n.realPath!==null&&Ks(r,n.realPath))?{ok:!0,folderRealPath:r}:TS(de.FOLDER_NOT_REGISTERED)}});var fI,$G,mI,gI,vpe,yI,zG=l(()=>{"use strict";fI=u(require("node:fs")),$G=u(require("node:path"));Gr();FG();ES();mI=e=>$G.default.resolve(je(e)),gI=e=>{try{return fI.default.realpathSync.native(e)}catch{return null}},vpe=e=>{let t=e.projectId?.trim()??"";if(t.length>0)return e.registeredFolders===null?null:e.registeredFolders.filter(o=>o.projectId===t).map(o=>o.folderPath);let r=(e.registeredFolders??[]).map(o=>o.folderPath);return[e.defaultFolderPath,...r]},yI=e=>{let t=vpe(e)?.map(mI)??null,r=e.requestedFolderPath?.trim()??"",o=r.length>0?mI(r):null;return o!==null&&gI(o)===null&&Ks(o,mI(e.managedProjectsDir))&&(t??[]).includes(o)&&fI.default.mkdirSync(o,{recursive:!0}),HG({requestedLexicalPath:o,requestedRealPath:o===null?null:gI(o),roots:t?.map(n=>({lexicalPath:n,realPath:gI(n)}))??null})}});var UG,hI,BG=l(()=>{"use strict";Pr();UG=new Map,hI=async(e,t=$s)=>{let r=q(e);if(r===null)return null;let o=await t(r);if(o===null)return UG.get(r.pairingToken)??null;let n=o.map(s=>({projectId:s.id,folderPath:s.folderPath}));return UG.set(r.pairingToken,n),n}});var Ip,GG,xpe,KG,Wpe,SI,VG,PI=l(()=>{"use strict";Ip=u(require("node:fs")),GG=u(require("node:path")),xpe="linked-project-folders.json",KG=e=>GG.default.join(e,xpe),Wpe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.projectId=="string"&&typeof t.folderPath=="string"&&typeof t.linkedAt=="string"&&typeof t.isGitRepo=="boolean"&&(t.projectName===null||typeof t.projectName=="string")},SI=e=>{try{let r=JSON.parse(Ip.default.readFileSync(KG(e),"utf8"))?.folders;return Array.isArray(r)?r.filter(Wpe):[]}catch{return[]}},VG=(e,t)=>{let r=[...SI(e).filter(s=>s.projectId!==t.projectId),t],o=KG(e),n=`${o}.${process.pid}.tmp`;Ip.default.mkdirSync(e,{recursive:!0}),Ip.default.writeFileSync(n,`${JSON.stringify({version:1,folders:r},null,2)}
`,{mode:384}),Ip.default.renameSync(n,o)}});var AI,qG,_I,Ope,jpe,xo,bI=l(()=>{"use strict";AI=u(require("node:fs")),qG=u(require("node:os")),_I=u(require("node:path"));PI();Ope=(e,t)=>e===t||e.startsWith(`${t}${_I.default.sep}`)?`~${e.slice(t.length)}`:e,jpe=e=>{try{return AI.default.statSync(e).isDirectory()}catch{return!1}},xo=(e,t=qG.default.homedir())=>{let r=SI(e).map(n=>{let s=jpe(n.folderPath),i=s&&AI.default.existsSync(_I.default.join(n.folderPath,".git")),a=n.projectName??`Project ${n.projectId.slice(0,8)}`,c=Ope(n.folderPath,t),d=s?`${a} uses ${c}${i?" (git repo)":" (not a git repo)"}.`:`${a}: linked folder ${c} is missing on this computer.`;return{projectId:n.projectId,projectName:n.projectName,folderPath:n.folderPath,linkedAt:n.linkedAt,folderFound:s,isGitRepo:i,summary:d}});return{summary:r.length===0?"No project folder linked on this computer yet.":r.map(n=>n.summary).join(" "),folders:r}}});var qs,YG,IS,Mpe,Vs,JG,XG,ZG=l(()=>{"use strict";qs=u(require("node:fs")),YG=u(require("node:os")),IS=u(require("node:path"));Gr();ES();Mpe={folder_required:"Choose a folder to link.",folder_not_absolute:"Use a full folder path, like ~/daily-magic.",folder_not_found:"That folder does not exist on this computer.",not_a_folder:"That path is a file, not a folder.",folder_not_readable:"AgentWitch cannot read that folder.",folder_is_home:"Your whole home folder is too broad. Pick the project folder inside it.",folder_outside_home:"That folder is outside your home folder. Pick one inside your home folder, or confirm it explicitly."},Vs=e=>({ok:!1,code:e,message:Mpe[e]}),JG=e=>{try{return qs.default.realpathSync.native(e)}catch{return null}},XG=e=>{let t=e.folderPath.trim();if(t.length===0||t.includes("\0"))return Vs("folder_required");let r=je(t);if(!IS.default.isAbsolute(r))return Vs("folder_not_absolute");let o=JG(IS.default.resolve(r));if(o===null)return Vs("folder_not_found");if(!qs.default.statSync(o).isDirectory())return Vs("not_a_folder");try{qs.default.accessSync(o,qs.default.constants.R_OK|qs.default.constants.X_OK)}catch{return Vs("folder_not_readable")}let n=JG(e.homeDir??YG.default.homedir());return n!==null&&o===n?Vs("folder_is_home"):!(n!==null&&Ks(o,n))&&e.allowOutsideHome!==!0?Vs("folder_outside_home"):{ok:!0,folderRealPath:o,isGitRepo:qs.default.existsSync(IS.default.join(o,".git"))}}});var Npe,Wo,QG=l(()=>{"use strict";Pr();sp();za();WT();bI();PI();ZG();Npe=/^[A-Za-z0-9_-]{1,128}$/,Wo=async e=>{let t=e.projectId.trim();if(!Npe.test(t))return{ok:!1,httpStatus:400,code:"project_id_invalid",message:"Pick an AgentWitch project first."};let r=XG({folderPath:e.folderPath,...e.allowOutsideHome!==void 0?{allowOutsideHome:e.allowOutsideHome}:{},...e.homeDir!==void 0?{homeDir:e.homeDir}:{}});if(!r.ok)return{ok:!1,httpStatus:400,code:r.code,message:r.message};if(e.cloudConfig===null)return{ok:!1,httpStatus:409,code:"not_paired",message:"Connect this computer to AgentWitch first."};let n=await(e.updateCloudFolder??xT)(e.cloudConfig,t,r.folderRealPath);if(!n.ok)return{ok:!1,httpStatus:502,code:"cloud_update_failed",message:n.httpStatus===404?"AgentWitch could not find that project for your account.":"Could not save the folder to AgentWitch. Try again."};Mt({projectFolderPath:r.folderRealPath,projectId:t,...n.projectName!==null?{projectName:n.projectName}:{}}),VG(e.profileDir,{projectId:t,projectName:n.projectName,folderPath:r.folderRealPath,isGitRepo:r.isGitRepo,linkedAt:(e.now?.()??new Date).toISOString()});let s=Zt(r.folderRealPath),a=await(e.syncHarnessBindings??wo)(e.cloudConfig,t,s),c=xo(e.profileDir,e.homeDir),d=c.folders.find(p=>p.projectId===t)?.summary??c.summary;return{ok:!0,projectId:t,projectName:n.projectName,folderPath:r.folderRealPath,isGitRepo:r.isGitRepo,linkedSetSlugs:s,bindingsSynced:a,summary:d}}});var St=l(()=>{"use strict";Va();Ka();_1();Gr();sp();b1();pn();x1();O1();G1();Kh();za();K1();tB();rB();oB();nB();iB();aB();WT();lB();cT();aT();Pr();uI();zG();BG();QG();bI()});var CS,Cp,e2,RI,Js,kI=l(()=>{"use strict";CS=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},Cp=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=CS(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},e2=e=>e>=1&&e<=5,RI=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return CS(t,"UTC")},Js=e=>{let t=e.from??new Date,r=CS(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return Cp(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=Cp(r,e.timeZone,o,0),s=CS(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?Cp(RI(r),e.timeZone,o,0):n;if(!i&&e2(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=RI(a),e2(a.weekday))return Cp(a,e.timeZone,o,0);return Cp(RI(r),e.timeZone,o,0)}});var t2,wI,Oo,EI=l(()=>{"use strict";t2=require("node:crypto");te();St();kI();$h();wI=!1,Oo=async e=>{if(wI)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=B();if(t===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let r=q({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let o=Fh(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this computer."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};wI=!0;let n=(0,t2.randomUUID)();try{let s=await Ma(t,"claude-cli",o.prompt);await sT(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=Js({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Hh(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{wI=!1}}});var LS,r2=l(()=>{"use strict";te();EI();$h();LS=async()=>{let e=B();if(e===null)return;let t=Sr(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Oo(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Lp=l(()=>{"use strict";$h();r2();EI();kI()});var o2=l(()=>{"use strict";Lp()});var n2=l(()=>{"use strict";QE()});var s2=l(()=>{"use strict";n2()});var TI=l(()=>{"use strict";Lp()});var Dpe,Hpe,vp,II=l(()=>{"use strict";o2();s2();TI();it();Dpe=e=>e!==void 0&&e.trim().length>0?z(e.trim()):z(),Hpe=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Js({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Js({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},vp=e=>{let t=Dpe(e.profileEmail),r=Sr(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Ga(s);return i!==null?[Hpe(i,o.get(i.id))]:[]});return Dh(t,n),{ok:!0,writtenCount:n.length}}});var CI=l(()=>{"use strict";Lp()});var i2=l(()=>{"use strict";te()});var a2=l(()=>{"use strict";II();CI();TI();i2()});var l2,xp,Wp,Op,c2=l(()=>{"use strict";l2=u(require("node:os"));a2();gp();Ba();xp=e=>{if(!hr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!Hs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=vp({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Wp=async e=>{if(!hr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:Hs(t)?Oo(r):{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."}},Op=()=>{let e=B(),t=e!==null?Sr(e.layout):{version:1,automations:[]};return{ok:!0,hostname:l2.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var LI=l(()=>{"use strict";c2()});var vS=l(()=>{"use strict";ye()});var xS=l(()=>{"use strict";ye()});var WS,p2,u2,d2,Fpe,$pe,nl,vI=l(()=>{"use strict";WS=u(require("node:fs")),p2=u(require("node:os")),u2=u(require("node:path"));vS();xS();Qd();it();d2=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},Fpe=e=>u2.default.join(p2.default.homedir(),"Library","LaunchAgents",`${e}.plist`),$pe=async e=>WS.default.existsSync(Fpe(e))?(await st(e)).ok:!1,nl=async(e=L())=>{let t=WS.default.existsSync(nh(e)),r=!WS.default.existsSync(Gt(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Zd(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await d2(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${we(e)}-wake`;await $pe(i)&&s.push(i);for(let c of Pe(e))(await st(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await d2(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var m2=l(()=>{"use strict";ye()});var xI=l(()=>{"use strict";Ts();ye()});var WI=l(()=>{"use strict";Ts()});var OI=l(()=>{"use strict";ye()});var g2,f2=l(()=>{"use strict";g2="local-app-accounts.json"});var y2,jp=l(()=>{"use strict";y2="local-app-port.json"});var P2,MI=l(()=>{"use strict";jp();P2=e=>typeof e=="number"&&Number.isInteger(e)&&e>=49152&&e<=65535});var Mp,A2,Upe,_2,Np,b2,OS=l(()=>{"use strict";Mp=u(require("node:fs")),A2=u(require("node:path"));jp();MI();Upe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_2=e=>A2.default.join(e,y2),Np=e=>{let t=_2(e);if(!Mp.default.existsSync(t))return null;try{let r=JSON.parse(Mp.default.readFileSync(t,"utf8"));if(Upe(r)&&P2(r.localAppPort))return r.localAppPort}catch{return null}return null},b2=(e,t)=>{Mp.default.mkdirSync(e,{recursive:!0}),Mp.default.writeFileSync(_2(e),`${JSON.stringify({localAppPort:t},null,2)}
`,"utf8")}});var sl,NI,k2,w2,E2,Bpe,T2,Gpe,R2,DI,Kpe,I2,C2,HI=l(()=>{"use strict";sl=u(require("node:fs")),NI=u(require("node:path"));f2();OS();k2=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),w2=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,E2=e=>typeof e=="string"&&e.trim().length>0,Bpe=e=>!k2(e)||!E2(e.email)||!w2(e.port)||typeof e.pid!="number"||!Number.isInteger(e.pid)||e.pid<=0||typeof e.startedAt!="string"||e.startedAt.length===0?null:{email:e.email.trim(),port:e.port,pid:e.pid,startedAt:e.startedAt},T2=e=>NI.default.join(e,g2),Gpe=(e,t)=>{sl.default.mkdirSync(NI.default.dirname(e),{recursive:!0});let r=`${e}.${process.pid}.${Date.now()}.tmp`;sl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8"),sl.default.renameSync(r,e)},R2=new Map,DI=e=>{let t=T2(e);if(!sl.default.existsSync(t))return[];try{let r=JSON.parse(sl.default.readFileSync(t,"utf8"));return!k2(r)||!Array.isArray(r.accounts)?[]:r.accounts.flatMap(o=>{let n=Bpe(o);return n===null?[]:[n]})}catch{return[]}},Kpe=(e,t)=>{let o={accounts:[...t].sort((n,s)=>n.email.localeCompare(s.email))};Gpe(T2(e),o)},I2=e=>{let t=DI(e.installDir).find(r=>r.email===e.profileEmail);return t!==void 0?t.port:Np(e.profileDir)},C2=e=>{if(!w2(e.port)||!E2(e.profileEmail))throw new Error("Invalid local app account discovery row");let t={email:e.profileEmail.trim(),port:e.port,pid:process.pid,startedAt:new Date().toISOString()};R2.set(t.email,t),Kpe(e.installDir,[...R2.values()]),b2(e.profileDir,e.port)}});var L2,FI,Vpe,$I,zI=l(()=>{"use strict";L2=u(require("node:fs")),FI=u(require("node:path"));HI();OS();Vpe=e=>{try{return L2.default.readdirSync(e,{withFileTypes:!0}).filter(t=>t.isDirectory()).map(t=>FI.default.join(e,t.name)).sort()}catch{return[]}},$I=e=>{let t=[],r=n=>{t.includes(n)||t.push(n)},o=FI.default.dirname(e);for(let n of DI(o))r(n.port);for(let n of Vpe(e)){let s=Np(n);s!==null&&r(s)}return t}});var W2,O2,v2,qpe,x2,Dp,UI=l(()=>{"use strict";W2=u(require("node:fs")),O2=u(require("node:path"));zI();vS();xS();it();v2=e=>$I(O2.default.join(e,"profiles")),qpe=async e=>{try{let t=await e.json();if(typeof t!="object"||t===null)return!0;let r=t.osUid;return typeof r!="number"||typeof process.getuid!="function"||r===process.getuid()}catch{return!0}},x2=async(e,t=1500)=>{for(let r of e)try{let o=await fetch(`http://127.0.0.1:${r}/health`,{signal:AbortSignal.timeout(t)});if(o.ok&&await qpe(o))return r}catch{}return null},Dp=async(e=L())=>{if(!W2.default.existsSync(Gt(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[],reachablePort:null};let r=await x2(v2(e));if(r!==null)return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[],reachablePort:r};let o=[];for(let s of Pe(e))(await st(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await x2(v2(e));return{ok:n!==null||o.length>0,liveReachable:n!==null,hollowInstall:!1,kickstartedLabels:o,reachablePort:n}}});var j2=l(()=>{"use strict";ye()});var M2,Ys,BI,Jpe,Ype,Xpe,N2,Zpe,D2,il,jS=l(()=>{"use strict";M2=require("node:crypto"),Ys=u(require("node:fs")),BI=u(require("node:path"));it();Jpe="watchdog-log.ndjson",Ype=200,Xpe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),N2=(e=L())=>{let t=z(),r=t.installDir===e?t.logsDir:ls({installDir:e,profileEmail:t.profileEmail});return BI.default.join(r,Jpe)},Zpe=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Xpe(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},D2=(e,t=L())=>{let r={id:(0,M2.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=N2(t);Ys.default.mkdirSync(BI.default.dirname(o),{recursive:!0});let n=Ys.default.existsSync(o)?Ys.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Ype+1)),JSON.stringify(r)];return Ys.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},il=(e=20,t=L())=>{let r=N2(t);if(!Ys.default.existsSync(r))return[];let o=Ys.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=Zpe(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var GI,KI,VI,qI=l(()=>{"use strict";Fe();GI=Cc.watchdogReinstallState,KI=900*1e3,VI=3e3});var H2=l(()=>{"use strict";qI()});var F2={};vt(F2,{verifyAgentWitchReviveAfterKickstart:()=>eue});var Qpe,eue,$2=l(()=>{"use strict";H2();WI();OI();it();Qpe=e=>new Promise(t=>{setTimeout(t,e)}),eue=async e=>{if(await Qpe(e.verifyDelayMs??VI),!await ps(e.launchAgentLabel))return!1;let r=e.profileEmail===null?z():z(e.profileEmail),o=He(r);return!Ye(o,e.staleAfterMs)}});var Hp,JI,tue,z2,U2,YI,XI,ZI=l(()=>{"use strict";Hp=u(require("node:fs")),JI=u(require("node:path"));X();qI();tue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),z2=e=>JI.default.join(e,GI),U2=(e=L())=>{let t=z2(e);if(!Hp.default.existsSync(t))return null;try{let r=JSON.parse(Hp.default.readFileSync(t,"utf8"));return!tue(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},YI=(e=L(),t=Date.now())=>{let r=U2(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=KI:!0},XI=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=z2(e);return Hp.default.mkdirSync(JI.default.dirname(o),{recursive:!0}),Hp.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var QI,B2=l(()=>{"use strict";ye();ZI();QI=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!YI())return{attempted:!1,ok:!1,targets:e};XI();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await st(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var G2=l(()=>{"use strict";ZI();B2()});var eC=l(()=>{"use strict";zr()});var K2=l(()=>{"use strict";zr()});var V2,al,q2,J2,Y2,rue,oue,X2,nue,sue,Z2,Q2=l(()=>{"use strict";V2=require("node:child_process"),al=u(require("node:fs")),q2=u(require("node:os")),J2=u(require("node:path")),Y2=require("node:util");eC();K2();it();rue=(0,Y2.promisify)(V2.execFile),oue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),X2=e=>{let t=nt(e),r=t===null?z():z(t);if(!al.default.existsSync(r.configPath))return null;try{let o=JSON.parse(al.default.readFileSync(r.configPath,"utf8"));return!oue(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},nue=e=>X2(e)?.wsUrl??null,sue=e=>{let t=nue(e);return t!==null?Je(t):De(e)?.appOrigin??null},Z2=async e=>{let t=e?.installDir??L(),r=X2(t),o=r!==null?Je(r.wsUrl):sue(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=J2.default.join(q2.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{al.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??nt(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await rue("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"AgentWitch reinstall script failed."}}finally{al.default.existsSync(i)&&al.default.unlinkSync(i)}}});var eK={};vt(eK,{attemptAgentWitchWatchdogReinstall:()=>iue});var iue,tK=l(()=>{"use strict";G2();Q2();iue=async e=>QI(e,()=>Z2())});var rK,oK,nK,aue,lue,cue,Fp,tC=l(()=>{"use strict";m2();xI();WI();OI();UI();vI();vS();xS();it();Ra();j2();jS();rK=e=>e===null?z():z(e),oK=async(e,t,r)=>{if(!await ps(e))return"not_running";let n=rK(t);if(Jt(n))return"healthy";let s=He(n);return Ye(s,r)?"stale_connection":"healthy"},nK=async e=>{let t=e?.staleAfterMs??12e4,r=L(),o=Pe(r);return Promise.all(o.map(async n=>{let s=await oK(n.launchAgentLabel,n.profileEmail,t),i=rK(n.profileEmail),a=He(i),c=await ps(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:Ye(a,t),needsRevive:s!=="healthy",reason:s}}))},aue=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled AgentWitch from install script and retried kickstart.":t.reinstallErrorMessage??"AgentWitch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All AgentWitch WebSocket connections are healthy."},lue=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",cue=async e=>{let t=await st(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>($2(),F2)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Fp=async e=>{if(!ur())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await nl(r),await Dp(r);let o=Pe(r),n=[];for(let p of o){let m=await oK(p.launchAgentLabel,p.profileEmail,t);if(m==="healthy"){n.push({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,revived:!1,reason:m});continue}n.push(await cue({launchAgentLabel:p.launchAgentLabel,profileEmail:p.profileEmail,reason:m,staleAfterMs:t}))}if(n.length===0){let p=cs();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:p.ok,reason:"not_running",...p.errorMessage!==void 0?{errorMessage:p.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(p=>p.reason!=="healthy"&&!p.revived))try{let{attemptAgentWitchWatchdogReinstall:p}=await Promise.resolve().then(()=>(tK(),eK)),m=await p(n);s=m.attempted,i=m.ok,a=m.errorMessage,c=[...m.targets]}catch(p){s=!0,i=!1,a=p instanceof Error?p.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(p=>p.revived||p.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&D2({event:lue(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:aue(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var sK,MS,iK=l(()=>{"use strict";sK=u(require("node:os"));xI();jS();tC();MS=async()=>{let e=await nK(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:sK.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:il(1)[0]??null}}});var rC=l(()=>{"use strict";vI();tC();iK();jS()});var $p,zp,Up,aK=l(()=>{"use strict";ye();rC();$p=async()=>{await nl();let e=Pe(),t=[];for(let r of e){let o=await st(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=cs();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},zp=Fp,Up=Fp});var oC=l(()=>{"use strict";aK()});var DS,NS,lK,nC,cK,due,pue,uue,mue,gue,HS,dK=l(()=>{"use strict";DS=require("node:child_process"),NS=u(require("node:fs")),lK=u(require("node:os")),nC=u(require("node:path")),cK=require("node:util");ye();X();ds();due=(0,cK.promisify)(DS.execFile),pue=()=>nC.default.join(lK.default.homedir(),"Library","LaunchAgents"),uue=async e=>{if(!Kt())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await due("launchctl",["bootout",r]).catch(()=>{})},mue=e=>{let t=nC.default.join(pue(),`${e}.plist`);NS.default.existsSync(t)&&NS.default.unlinkSync(t)},gue=e=>{(0,DS.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},HS=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!NS.default.existsSync(e))return{ok:!1,message:"No local AgentWitch install directory was found.",removedLaunchAgentLabels:[]};let t=yo(e);for(let r of t)await uue(r),mue(r);return gue(e),{ok:!0,message:"Local AgentWitch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var pK,FS,uK,ll,mK,fue,yue,hue,sC,Sue,iC,gK=l(()=>{"use strict";pK=require("node:child_process"),FS=u(require("node:fs")),uK=u(require("node:os")),ll=u(require("node:path")),mK=require("node:util");ye();ds();fue=(0,mK.promisify)(pK.execFile),yue=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],hue=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],sC=e=>{FS.default.existsSync(e)&&FS.default.rmSync(e,{force:!0})},Sue=async e=>{if(!Kt())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await fue("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},iC=async e=>{let r=(e.listLaunchAgentLabels??yo)(e.layout.installDir),o=e.launchAgentsDir??ll.default.join(uK.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??Sue;for(let i of r)await n(i),sC(ll.default.join(o,`${i}.plist`));let s=ll.default.dirname(e.layout.configPath);for(let i of yue)sC(ll.default.join(s,i));for(let i of hue)sC(ll.default.join(e.layout.installDir,i));return FS.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var aC,fK=l(()=>{"use strict";aC="unknown_identity"});var lC=l(()=>{"use strict";IT();fK()});var Pue,cC,yK=l(()=>{"use strict";lC();Pue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cC=e=>e.type!=="system.error"||!Pue(e.payload)?!1:e.payload.errorCode===aC});var dC=l(()=>{"use strict";dK();gK();yK()});var $S=l(()=>{"use strict";ye();zr();dC();rC()});var cl,zS,US=l(()=>{"use strict";$S();cl=(e=20)=>il(e),zS=MS});var BS,dl,GS,KS=l(()=>{"use strict";$S();BS=ws,dl=(e=20)=>bs(e),GS=e=>ks(e)});var VS,pC=l(()=>{"use strict";$S();VS=()=>HS()});var hK=l(()=>{"use strict";dE();ZE();LI();oC();US();KS();pC()});var SK={};vt(SK,{buildAgentWitchAutomationStatusFromWakeServer:()=>Op,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>BS,buildAgentWitchWakeHealthResponse:()=>tp,buildAgentWitchWakeIdentityResponse:()=>rp,buildAgentWitchWatchdogStatus:()=>zS,installHarnessFromWakeServer:()=>fp,readAgentWitchSelfUpdateLogEntries:()=>dl,readAgentWitchWatchdogLogEntries:()=>cl,restartAgentWitchFromWakeServer:()=>Up,reviveAgentWitchWebSocketFromWakeServer:()=>zp,runAgentWitchSelfUpdateFromWakeServer:()=>GS,runAgentWitchUninstallLocalFromWakeServer:()=>VS,runAutomationFromWakeServer:()=>Wp,syncAutomationsFromWakeServer:()=>xp,wakeAgentWitchLaunchAgents:()=>$p});var PK=l(()=>{"use strict";hK()});var AK,_K,uC,mC,bK=l(()=>{"use strict";AK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),_K=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?AK(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?AK(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},uC=e=>{let t=e.watchdogLogs.map(_K).join(""),r=e.updateLogs.map(_K).join("");return`<!doctype html>
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
</html>`},mC=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var RK,kK,wK=l(()=>{"use strict";RK=u(require("node:net")),kK=()=>new Promise((e,t)=>{let r=RK.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var EK,Aue,_ue,gC,TK=l(()=>{"use strict";EK=u(require("node:net"));ye();wK();ep();Qd();it();Aue=e=>new Promise(t=>{let r=EK.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),_ue=e=>new Promise(t=>{setTimeout(t,e)}),gC=async(e={})=>{let t=L(),r=yr(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await Aue(r))return Kz(r),r;i<o&&await _ue(n)}let s=await kK();sh(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{rd({launchAgentPrefix:we(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var bue,fC,IK=l(()=>{"use strict";bue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fC=e=>({force:bue(e)&&e.force===!0})});var Bp=l(()=>{"use strict";gp();bK();TK();IK();pk();cy();fs()});var yC,J,hC,SC,Gp,CK=l(()=>{"use strict";yC=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},J=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},hC=e=>{e.writeHead(403),e.end()},SC=e=>e.url?.split("?")[0]??"/",Gp=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var br=l(()=>{"use strict";CK()});var Rue,LK,vK=l(()=>{"use strict";LI();br();Rue=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return J(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},LK=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return J(e.response,200,Op(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await Rue(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=xp(t);return J(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Wp(t);return J(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var kue,WK,xK,OK,PC,jK,AC=l(()=>{"use strict";kue=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],WK=e=>/embed|minilm|^bge-/i.test(e),xK=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),OK=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),PC=e=>e.filter(t=>t.trim().length>0&&!WK(t)),jK=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!WK(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>xK(s,o));if(n!==void 0)return n}for(let n of kue){let s=r.find(i=>xK(i,n));if(s!==void 0)return s}return r[0]??null}});var _C,DK,HK,qS,FK,MK,NK,wue,Eue,Tue,Iue,Cue,Lue,Rr,Kp=l(()=>{"use strict";_C=require("node:child_process"),DK=u(require("node:fs")),HK=u(require("node:os")),qS=u(require("node:path"));zr();fr();AC();FK=3e3,MK=["claude-cli","codex","cursor","antigravity"],NK={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},wue=(e,t)=>new Promise(r=>{let o=(0,_C.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},FK);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),Eue=()=>{let e=HK.default.homedir();return["ollama",qS.default.join(e,".local","bin","ollama"),qS.default.join(e,".agent-witch","ollama","ollama"),qS.default.join(e,".local-agent-witch","ollama","ollama")]},Tue=e=>new Promise(t=>{let r=(0,_C.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},FK);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(OK(Buffer.concat(o).toString("utf8")))})}),Iue=async()=>{for(let e of Eue()){if(e!=="ollama"&&!DK.default.existsSync(e))continue;let t=await Tue(e);if(t!==null)return t}return[]},Cue=e=>{let t=e.installedWriterIds.map(s=>NK[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=Oe(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${NK[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},Lue=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:ka},Rr=async e=>{let t=MK.map(i=>{let a=Fy(i,e.commands);return wue(a.command,a.args)}),[r,...o]=await Promise.all([Iue(),...t]),n=MK.flatMap((i,a)=>o[a]===!0?[i]:[]),s=jK(r,Lue());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:Cue({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var vue,xue,bC,$K=l(()=>{"use strict";vue="http://127.0.0.1:11434",xue=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},bC=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||vue;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?xue(await o.json()):null}catch{return null}}});var RC=l(()=>{"use strict";fr();Kp();$K();AC()});var Wue,zK,UK=l(()=>{"use strict";RC();Wue={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},zK=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Wue[t]})),ollamaModels:PC(e.ollamaModels)})});var Oue,BK,GK=l(()=>{"use strict";RC();br();UK();Oue=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return J(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},BK=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Rr({commands:Ae({})});return J(e.response,200,{ok:!0,...zK({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await Oue(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await bC({model:r,prompt:o});return n===null?(J(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(J(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var jue,KK,VK=l(()=>{"use strict";ZE();br();jue=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return J(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},KK=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await jue(e);if(t===null)return!0;let r=fp(t);return J(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var qK=l(()=>{"use strict";St()});var kC,JK=l(()=>{"use strict";qK();Ba();kC=e=>{if(!hr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:Mt({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var YK,XK,wC,EC=l(()=>{"use strict";YK=u(require("node:path"));te();St();Ba();XK=e=>{if(!hr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},wC=async e=>{let t=XK(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=wn("Choose a folder for this AgentWitch project");if(r===null)return{ok:!1,cancelled:!0};let o=B();if(o===null)return{ok:!1,errorMessage:"AgentWitch is not configured on this computer."};let n=q({wsUrl:o.wsUrl,pairingToken:o.pairingToken});if(n===null)return{ok:!1,errorMessage:"Could not resolve AgentWitch cloud connection."};let s=await Wo({projectId:t.projectId,folderPath:r,allowOutsideHome:!0,profileDir:YK.default.dirname(o.layout.configPath),cloudConfig:n});return s.ok?{ok:!0,project:{id:t.projectId,folderPath:s.folderPath},bindingsSynced:s.bindingsSynced,linkedSetSlugs:s.linkedSetSlugs}:{ok:!1,errorMessage:s.message}}});var ZK=l(()=>{"use strict";JK();EC()});var TC,QK,eV,tV=l(()=>{"use strict";TC=u(require("node:path"));te();St();Ba();QK=async(e,t=Wo)=>{if(!hr(e)||typeof e.projectId!="string"||typeof e.folderPath!="string")return{ok:!1,httpStatus:400,code:"folder_required",message:"Send projectId and folderPath."};let r=B();return r===null?{ok:!1,httpStatus:409,code:"not_paired",message:"Connect this computer to AgentWitch first."}:t({projectId:e.projectId,folderPath:e.folderPath,allowOutsideHome:e.allowOutsideHome===!0,profileDir:TC.default.dirname(r.layout.configPath),cloudConfig:q({wsUrl:r.wsUrl,pairingToken:r.pairingToken})})},eV=()=>{let e=B();return e===null?{summary:"This computer is not connected to AgentWitch yet.",folders:[]}:xo(TC.default.dirname(e.layout.configPath))}});var rV,oV=l(()=>{"use strict";ZK();tV();EC();br();rV=async e=>{if(e.request.method==="GET"&&e.pathname==="/projects/folders")return J(e.response,200,{ok:!0,...eV()},e.cors.headers),!0;if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=kC(t);return J(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/link-folder"){let t=await e.readJsonBody(),r=await QK(t);return J(e.response,r.ok?200:r.httpStatus,r.ok?r:{ok:!1,error:r.code,errorMessage:r.message},e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await wC(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return J(e.response,o,r,e.cors.headers),!0}return!1}});var nV,sV=l(()=>{"use strict";Bp();KS();US();nV=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=cl(50),r=dl(50);return e.response.writeHead(200,mC()),e.response.end(uC({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var iV,aV=l(()=>{"use strict";dE();br();iV=e=>e.request.method==="GET"&&e.pathname==="/health"?(J(e.response,200,tp(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(J(e.response,200,rp(),e.cors.headers),!0):!1});var lV,cV=l(()=>{"use strict";pC();br();lV=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await VS();return J(e.response,t.ok?200:503,t,e.cors.headers),!0}});var dV,pV=l(()=>{"use strict";oC();br();dV=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await zp();return J(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Up();return J(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await $p();return J(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var uV,mV=l(()=>{"use strict";Bp();KS();br();uV=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=BS();return J(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Gp(e.request,"/update/logs",20,200);return J(e.response,200,{ok:!0,logs:dl(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=fC(t),o=await GS({force:r});return J(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var gV,fV=l(()=>{"use strict";US();br();gV=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await zS();return J(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Gp(e.request,"/watchdog/logs",20,200);return J(e.response,200,{ok:!0,logs:cl(t)},e.cors.headers),!0}return!1}});var yV,hV=l(()=>{"use strict";vK();GK();VK();oV();sV();aV();cV();pV();mV();fV();yV=[iV,nV,gV,dV,uV,lV,KK,rV,LK,BK]});var SV,PV=l(()=>{"use strict";hV();SV=async e=>{for(let t of yV)if(await t(e))return!0;return!1}});var Mue,AV,_V=l(()=>{"use strict";gp();br();PV();Mue=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:SC(e),readJsonBody:()=>yC(e)}),AV=async(e,t,r)=>{let o=e.headers.origin,n=jh(o);try{if(o!==void 0&&o.length>0&&!n.allowed){hC(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=Mue(e,t,r,n);if(await SV(s))return;J(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{J(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var bV,Xs,JS,YS=l(()=>{"use strict";bV=u(require("node:http"));Bp();_V();Xs=async()=>{let e=await gC(),t=bV.default.createServer((r,o)=>{AV(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`AgentWitch wake server listening on http://127.0.0.1:${e}
`),t},JS=Xs});var RV={};vt(RV,{runAgentWitchBridgeCli:()=>Nue});var Nue,kV=l(()=>{"use strict";ye();YS();Nue=async()=>{Wt("agent-witch-bridge");let e=await Xs(),t=So(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var Zs,pl=l(()=>{"use strict";pr();Zs="Open AgentWitch Local from the menu bar."});var ul,IC,wV=l(()=>{"use strict";ul=(e,t,r)=>e===1?t:r,IC=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${ul(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${ul(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${ul(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${ul(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${ul(d,"month","months")} ago`;let p=Math.floor(a/365);return`${p} ${ul(p,"year","years")} ago`}});var Due,Hue,EV,CC,XS,ZS,TV,LC,QS=l(()=>{"use strict";Due=new Set(["/","/task","/writer-sessions","/errors","/status","/traffic","/projects","/project","/project/skill-drafts","/harness","/writer-api","/history","/estimates","/knowledge","/prompt-optimizer","/prompt-optimizer/guide","/prompt-sdlc","/prompt-sdlc/guide"]),Hue=new Set(["/prompt-optimizer/agent","/prompt-optimizer/skills/query","/prompt-sdlc/agent","/prompt-sdlc/skills/query"]),EV="AgentWitchLocal-MacWebView",CC=e=>Hue.has(e),XS=e=>typeof e=="string"&&e.includes(EV),ZS=e=>CC(e)?!1:!!(e==="/prompt-optimizer"||e.startsWith("/prompt-optimizer/")||e==="/prompt-sdlc"||e.startsWith("/prompt-sdlc/")),TV=e=>CC(e)?!1:!!(Due.has(e)||e==="/prompt-optimizer"||e.startsWith("/prompt-optimizer/")||e==="/prompt-sdlc"||e.startsWith("/prompt-sdlc/")),LC=e=>{let t=e.method.toUpperCase();return t!=="GET"&&t!=="POST"||XS(e.userAgent)&&ZS(e.pathname)?!1:TV(e.pathname)}});var Fue,IV,CV=l(()=>{"use strict";pl();QS();Fue=e=>XS(e.userAgent)&&ZS(e.pathname),IV=e=>{let t=Fue(e);return(r,o)=>{if(t){r.writeHead(200,{"Content-Type":"text/html; charset=utf-8",...e.headers}),r.end(o);return}r.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...e.headers}),r.end(Zs)}}});var $ue,LV,vV=l(()=>{"use strict";$ue=/^[0-9a-f]{7,40}$/,LV=(e="64c281b8e02245a0a2124ebb1e68a9d369119e43")=>{let t=(e??"").trim().toLowerCase();return $ue.test(t)?{commitSha:t,shortCommitSha:t.slice(0,7)}:{commitSha:null,shortCommitSha:null}}});var xV,WV=l(()=>{"use strict";xV=(e,t)=>new Promise((r,o)=>{let n=i=>{let a=d=>{if(e.off("listening",c),d.code==="EADDRINUSE"&&i!==0){e.removeListener("error",a),n(0);return}o(d)},c=()=>{e.removeListener("error",a);let d=e.address(),p=typeof d=="object"&&d!==null?d.port:i;r(p)};e.once("error",a),e.once("listening",c),e.listen(i,t.host)},s=t.preferredPort!==null&&t.preferredPort!==void 0&&t.preferredPort>0?t.preferredPort:0;n(s)})});var Qs,vC,zue,Uue,xC,Cn,eP,WC,OV=l(()=>{"use strict";Qs=u(require("node:fs")),vC=u(require("node:path")),zue="local-ws-traffic.ndjson",Uue=500,xC=e=>vC.default.join(e.logsDir,zue),Cn=(e,t)=>{let r=xC(e);Qs.default.mkdirSync(vC.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Qs.default.appendFileSync(r,`${o}
`,"utf8")},eP=(e,t=Uue)=>{let r=xC(e);if(!Qs.default.existsSync(r))return[];let n=Qs.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},WC=e=>{let t=xC(e);Qs.default.existsSync(t)&&Qs.default.writeFileSync(t,"","utf8")}});var Bue,jV,MV,NV=l(()=>{"use strict";lC();Bue=new Set(Object.values(Yh)),jV=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MV=e=>{if(!jV(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!Bue.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!jV(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var DV,HV=l(()=>{"use strict";DV=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Gue,Kue,Vue,Vp,FV=l(()=>{"use strict";HV();Gue=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Kue=e=>Gue.test(e),Vue=e=>DV(e),Vp=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>Vp(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Kue(o)){r[o]=Vue(n);continue}r[o]=Vp(n)}return r}});var Xr,OC,que,Jue,Yue,jC,$V,zV,UV,Xue,tP,ei,rP,MC,BV=l(()=>{"use strict";Xr=u(require("node:fs")),OC=u(require("node:path"));NV();FV();que="local-ws-trace.ndjson",Jue=1e4,Yue=1440*60*1e3,jC=e=>OC.default.join(e.logsDir,que),$V=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},zV=e=>{if(!Xr.default.existsSync(e))return;let t=Xr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Yue,n=t.filter(s=>{let i=$V(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-Jue);Xr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},UV=(e,t)=>{let r=jC(e);Xr.default.mkdirSync(OC.default.dirname(r),{recursive:!0}),Xr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),zV(r)},Xue=e=>e.parsed===null?{_empty:!0}:Vp(e.parsed),tP=(e,t,r)=>{let o=MV(r);UV(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Xue(o)})},ei=(e,t)=>{UV(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:Vp({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},rP=(e,t=80)=>{let r=jC(e);if(zV(r),!Xr.default.existsSync(r))return[];let o=Xr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=$V(s);i!==null&&n.push(i)}return n.reverse()},MC=e=>{let t=jC(e);Xr.default.existsSync(t)&&Xr.default.writeFileSync(t,"","utf8")}});var Ln,GV,Zue,NC,DC,KV=l(()=>{"use strict";Ln=u(require("node:fs")),GV=u(require("node:path")),Zue=256e3,NC=e=>{Ln.default.mkdirSync(GV.default.dirname(e),{recursive:!0}),Ln.default.writeFileSync(e,"","utf8")},DC=(e,t=Zue)=>{if(!Ln.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Ln.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Ln.default.openSync(e,"r");try{Ln.default.readSync(a,i,0,s,n)}finally{Ln.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var qp=l(()=>{"use strict";OV();BV();KV()});var HC,FC,VV=l(()=>{"use strict";HC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FC=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${HC(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${HC(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the AgentWitch client stderr log on this computer (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${HC(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var qV=l(()=>{"use strict";VV()});var $C,zC=l(()=>{"use strict";$C=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var UC=l(()=>{"use strict";Cd()});var BC,GC,JV=l(()=>{"use strict";UC();BC=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},GC=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var YV=l(()=>{"use strict";zC();JV()});var XV,KC,Jp,Yp=l(()=>{"use strict";zC();XV=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KC=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=XV(e),r=XV($C(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},Jp=`(function () {
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
})();`});var ti,Que,VC,ZV=l(()=>{"use strict";ti=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Que=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},VC=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${ti(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?ti(r.direction):ti(r.kind),i=`trace-body-${o}`,a=ti(Que(r.body));return`<tr>
        <td title="${ti(r.at)}">${ti(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${ti(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var QV,eme,oP,tme,qC,e5=l(()=>{"use strict";Mc();Fe();QV=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},eme=e=>QV(e)===fo?Zi:Xi,oP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tme=(e,t)=>`${t?`<h3>${oP(e.label)}</h3>`:""}
    <p class="muted">${oP(e.instructions)}</p>
    <pre class="sdlc-pre mono">${oP(e.command)}</pre>
    <p class="muted">${oP(e.note)}</p>`,qC=e=>{let t=jc({platform:ns(e.platform),installDirName:QV(e.installDir),launchAgentPrefix:eme(e.installDir)}),r=t.length>1;return`<section class="card">
    <p class="eyebrow">AgentWitch Local</p>
    <h2>Revive local app</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if AgentWitch Cloud cannot open Status, restart the AgentWitch client on this computer.</p>${r?`
    <p class="muted">Use the command for this computer's operating system.</p>`:""}
    ${t.map(n=>tme(n,r)).join(`
    `)}
  </section>`}});var JC,t5=l(()=>{"use strict";Mc();JC=e=>ns(e)==="mac"?"Revive requested. The bridge will reconnect if this Mac can reach launchd.":"Revive requested. The bridge will reconnect when this computer can reach AgentWitch Cloud."});var r5=l(()=>{"use strict";Yp();ZV();e5();t5();Yp()});var o5,n5,s5,i5,a5,l5,c5,ml=l(()=>{"use strict";o5="projects",n5="knowledge",s5="chunks.ndjson",i5="lessons.ndjson",a5="error-chunks.ndjson",l5="usage-stats.json",c5="knowledge-location.json"});var nP,rme,sP,YC=l(()=>{"use strict";nP=u(require("node:path"));ml();rme=(e,t)=>{let r=t.trim(),o=nP.default.join(e.installDir,o5,r,n5);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:nP.default.join(o,s5),memoryRunsFilePath:nP.default.join(o,i5)}},sP=rme});var XC,ome,d5,p5=l(()=>{"use strict";XC=u(require("node:fs"));ml();Ns();ome=e=>{let t=Xt(e.projectFolderPath),r=`${t.metaDirPath}/${c5}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your AgentWitch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};XC.default.mkdirSync(t.metaDirPath,{recursive:!0}),XC.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},d5=ome});var gl,m5,u5,nme,g5,f5=l(()=>{"use strict";gl=u(require("node:fs")),m5=u(require("node:path"));pn();Ns();YC();p5();u5=(e,t)=>{gl.default.existsSync(e)&&(gl.default.existsSync(t)&&gl.default.statSync(t).size>0||(gl.default.mkdirSync(m5.default.dirname(t),{recursive:!0}),gl.default.copyFileSync(e,t)))},nme=e=>{let t=Xt(e.projectFolderPath),r=sP(e.layout,e.projectId),o=`${t.memoryDirPath}/${pa}`;u5(t.ragChunksFilePath,r.ragChunksFilePath),u5(o,r.memoryRunsFilePath),d5({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},g5=nme});var y5,sme,fl,iP=l(()=>{"use strict";y5=u(require("node:path"));pn();Ns();f5();uT();YC();sme=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=zh(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){g5({layout:e.layout,projectFolderPath:t,projectId:o});let s=sP(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=Xt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:y5.default.join(n.memoryDirPath,pa),projectId:null}},fl=sme});var aP,ame,lP,ZC=l(()=>{"use strict";aP=u(require("node:fs"));ml();ame=(e,t=500)=>{if(!aP.default.existsSync(e))return;let r=aP.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);aP.default.writeFileSync(e,`${o.join(`
`)}
`)},lP=ame});var cP,lme,ri,QC=l(()=>{"use strict";cP=u(require("node:path"));ml();iP();lme=e=>{let t=fl(e);if(t===null)return null;let r=cP.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:cP.default.join(r,l5),errorChunksFilePath:cP.default.join(r,a5)}},ri=lme});var S5,Xp,P5,h5,eL,A5,pme,tL,_5,rL,oL,nL,sL=l(()=>{"use strict";S5=require("node:crypto"),Xp=u(require("node:fs")),P5=u(require("node:path"));qa();ml();QC();h5=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),eL=e=>{if(!Xp.default.existsSync(e))return h5();try{let t=JSON.parse(Xp.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return h5()},A5=(e,t)=>{Xp.default.mkdirSync(P5.default.dirname(e),{recursive:!0}),Xp.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},pme=e=>{let t=_r(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,S5.createHash)("sha256").update(o).digest("hex").slice(0,16)},tL=e=>{let t=ri(e);return t===null?null:eL(t.usageStatsFilePath)},_5=e=>{if(e.chunkIds.length===0)return;let t=ri(e);if(t===null)return;let r=eL(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;A5(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},rL=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=ri(e);if(r===null)return null;let o=pme(t),n=eL(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return A5(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},oL=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,nL=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Zp,b5,ume,mme,R5,gme,iL,Qp,eu,aL,yl,lL,cL=l(()=>{"use strict";Zp=u(require("node:fs")),b5=u(require("node:path"));qa();iP();ZC();sL();ume="http://127.0.0.1:11434",mme="nomic-embed-text",R5=(e,t,r)=>fl({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,gme=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},iL=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Qp=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||ume,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||mme;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},eu=(e,t,r)=>{let o=R5(e,t,r);if(o===null||!Zp.default.existsSync(o))return[];let n=Zp.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},aL=async e=>{let t=_r(e.text),r=iL(t);if(r.length===0)return 0;let o=R5(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Zp.default.mkdirSync(b5.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Qp(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Zp.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return lP(o),n},yl=async e=>{let t=await Qp(e.query);if(t===null)return[];let r=e.minScore??0,s=eu(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:gme(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return _5({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},lL=e=>e.length===0?"":`Local knowledge (from this computer):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var tu,k5,fme,yme,dL,pL,uL,w5=l(()=>{"use strict";tu=u(require("node:fs")),k5=u(require("node:path"));qa();QC();ZC();cL();fme=e=>{if(!tu.default.existsSync(e))return[];let t=tu.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},yme=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},dL=async e=>{let t=ri(e);if(t===null)return 0;let r=_r(e.text),o=iL(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;tu.default.mkdirSync(k5.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Qp(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};tu.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return lP(n,200),s},pL=async e=>{let t=ri(e);if(t===null)return[];let r=await Qp(e.query);if(r===null)return[];let o=e.minScore??.3;return fme(t.errorChunksFilePath).map(s=>({chunk:s,score:yme(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},uL=e=>e.length===0?"":`Past failures on this computer (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var mL=l(()=>{"use strict";cL();sL();w5()});var kr,ru,dP=l(()=>{"use strict";TT();kr=ET,ru=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: #f4f3f0;
  --aw-zinc-100: #ebe9e4;
  --aw-zinc-200: #ddd9d2;
  --aw-zinc-400: #c9c4bb;
  --aw-zinc-500: ${kr.gray500};
  --aw-zinc-600: ${kr.gray600};
  --aw-zinc-700: ${kr.gray700};
  --aw-zinc-800: ${kr.gray900};
  --aw-zinc-900: ${kr.gray900};
  --aw-brand-600: #1f6656;
  --aw-brand-700: #19564a;
  --aw-brand-50: #dde8e3;
  --aw-emerald-50: ${kr.success50};
  --aw-emerald-700: ${kr.success700};
  --aw-amber-50: ${kr.warning50};
  --aw-amber-900: ${kr.warning900};
  --aw-red-50: ${kr.error50};
  --aw-red-700: ${kr.error700};
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
`.trim()});var E5,T5=l(()=>{"use strict";E5=`
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
`});var I5,C5,L5=l(()=>{"use strict";dP();T5();Yp();I5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),C5=e=>{let t=I5(e.installBundleVersionLabel?.trim()??"unknown");return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${I5(e.title)} \xB7 AgentWitch Local</title>
  <style>${ru}${E5}</style>
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
  <script>${Jp}</script>
</body>
</html>`}});var hme,Sme,gL,v5,fL,x5=l(()=>{"use strict";dP();L5();Yp();hme=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Sme=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],gL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v5=(e,t)=>`<a class="${e}" href="/" aria-label="AgentWitch Local home, install bundle ${t}">${hme}<span class="brand-text">AgentWitch<span class="brand-sub">Local(${t})</span></span></a>`,fL=e=>{if(e.activePath==="/prompt-optimizer")return C5({title:e.title,body:e.body,installBundleVersionLabel:e.installBundleVersionLabel});let t=Sme.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=gL(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=gL(e.installBundleVersionLabel?.trim()??"unknown"),s=v5("brand brand-in-sidebar",n),i=v5("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${gL(e.title)} \xB7 AgentWitch Local</title>
  <style>${ru}</style>
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
  <script>${Jp}</script>
</body>
</html>`}});var pP,ou,uP=l(()=>{"use strict";pP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ou=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${pP(e.syncMessage)}</p>`:"",o=pP(e.manageHref),n=pP(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${pP(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var yL,hL,SL,W5=l(()=>{"use strict";yL=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,hL=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer AgentWitch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,SL=e=>e==="ok"?'<div class="alert-success">Update finished. This computer may restart the AgentWitch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var O5=l(()=>{"use strict";x5();uP();W5()});var O,hl=l(()=>{"use strict";O=e=>e==="passed"||e==="stopped"||e==="failed"});var j5,PL,oi,AL,mP=l(()=>{"use strict";j5="Stopped at the round limit. The best prompt is kept.",PL="Stopped because the score stopped rising. The best prompt is kept.",oi="Finished. The best prompt is the result.",AL="Wizard ended. Progress from finished steps is kept."});var vn,_L=l(()=>{"use strict";vn=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var Pme,Ame,nu,M5,gP=l(()=>{"use strict";Pme=/\n+|;\s+/,Ame=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,nu=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(Pme).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,Ame(s)]},[]);return[...t,...o]},[]),M5=e=>{let t=nu(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var Te,Sl=l(()=>{"use strict";Te=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var su,bL=l(()=>{"use strict";gP();Sl();su=e=>{let t=[...e.priorRounds,e.current],r=Te(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:M5(o)}}});var RL,_me,bme,fP,kL=l(()=>{"use strict";RL={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},_me=e=>{try{let t=JSON.parse(e.fragment);return{...RL,objects:[...e.objects,t]}}catch{return{...RL,objects:e.objects}}},bme=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:_me(r)},fP=e=>[...e].reduce(bme,RL).objects});var Rme,wL,kme,N5,EL=l(()=>{"use strict";kL();Rme=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},wL=e=>{let t=fP(e).filter(Rme),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},kme=(e,t)=>({...e,passed:e.score>=t}),N5=(e,t)=>{let r=wL(e);return r===null?null:kme(r,t)}});var TL,IL,yP=l(()=>{"use strict";TL="The judge reply needs a score and a reason.",IL="The improver reply was empty."});var wme,D5,H5=l(()=>{"use strict";wme=/API Error:? \d{3}|\b429\b|too many requests|rate[_ ]limit|spend limit|usage limit|monthly limit|quota|insufficient credit|overloaded|unauthorized|authentication required|not logged in|please run .+login|invalid api key/i,D5=e=>{let t=e.trim();return t.length===0||t.length>600||!wme.test(t)?null:`The judge CLI returned an error: ${t}`}});var F5,$5=l(()=>{"use strict";F5=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var z5,U5=l(()=>{"use strict";z5=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var Tme,B5,G5=l(()=>{"use strict";$5();U5();mP();gP();Tme=e=>{let t=nu(e);return t.length===0?PL:`${PL} Avoid: ${t.join("; ")}.`},B5=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:j5};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(F5(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:Tme(z5(r))}}return null}});var xn,Ime,ni,K5,hP=l(()=>{"use strict";xn=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},Ime=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,ni=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",Ime(e.tokens),`Delay: ${xn(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},K5=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var Cme,V5,q5=l(()=>{"use strict";EL();Cme=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,V5=e=>{let r=(Cme.exec(e)?.[1]??e).trim();return r.length===0||wL(r)!==null?null:r}});var J5,SP,Y5=l(()=>{"use strict";hP();q5();yP();J5=e=>({type:"call",role:"judge",choice:e.choice,prompt:K5({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),SP=e=>{let t=V5(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:IL}}:{nextPrompt:t,continuation:J5({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var CL,X5=l(()=>{"use strict";_L();bL();EL();yP();H5();mP();G5();yP();Y5();CL=e=>{let t=N5(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:D5(e.raw)??TL}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=B5({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=su({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:vn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var iu,LL=l(()=>{"use strict";iu=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var Z5=l(()=>{"use strict"});var Q5=l(()=>{"use strict";Z5()});var si,eq=l(()=>{"use strict";si=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var Lme,vL,tq=l(()=>{"use strict";hP();Lme=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,vL=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",Lme(e.tokens),`Delay: ${xn(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var vme,xme,Wme,xL,rq=l(()=>{"use strict";vme=/[A-Za-z0-9_./~-]{3,180}/g,xme=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,Wme=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||xme.test(t)},xL=(e,t=12)=>{let r=[];for(let o of e.matchAll(vme)){let n=o[0].replace(/\.+$/,"");if(!(!Wme(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var au,oq=l(()=>{"use strict";au=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var PP,WL,nq,lu,OL=l(()=>{"use strict";PP=e=>Math.floor(e/2),WL=e=>Math.max(PP(e)+1,e-20),nq=(e,t)=>e>=t?"passes":e>=WL(t)?"close":e>=PP(t)?"weak":"bad",lu=e=>[{band:"bad",label:`0\u2013${PP(e)-1} bad`},{band:"weak",label:`${PP(e)}\u2013${WL(e)-1} weak`},{band:"close",label:`${WL(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var AP,jL=l(()=>{"use strict";OL();AP=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${nq(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var wr,ML=l(()=>{"use strict";wr=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var sq,iq=l(()=>{"use strict";sq=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var Ome,jme,aq,lq=l(()=>{"use strict";hl();jL();ML();iq();Ome=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],jme=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",aq=e=>{let t=e.wizard;if(t===void 0)return[];let r=wr(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=Ome.map((y,S)=>{let A=!s&&!n&&S===r?"active":"done";return{id:`wizard-${S+1}`,label:y,state:A,detail:null}}).filter((y,S)=>s?!0:S<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=AP(e),d=c.filter(y=>y.id==="round-0"),p=sq(t)&&(!n||a)?c.filter(y=>y.id!=="round-0"):[],m=O(e.status)&&!s,g=m?[{id:"end",label:jme(e),state:"done",detail:e.errorMessage}]:[];if(m&&g.length>0){let y=Math.min(r,i.length),S=i.slice(0,y).map(A=>({...A,state:"done"}));return[...d,...S,...g,...p]}return[...d,...i,...p,...g]}});var Mme,NL,cq=l(()=>{"use strict";hl();jL();lq();Mme=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",NL=e=>{if(e.wizard!==void 0)return aq(e);let t=AP(e),r=O(e.status)?[{id:"end",label:Mme(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var cu,dq=l(()=>{"use strict";cu=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var _P,DL,du,Al,bP,HL,pq=l(()=>{"use strict";pr();_P="/prompt-optimizer/agent",DL=`${zg}${_P}`,du=`${Yb}://prompt-optimizer`,Al="The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",bP=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${Al}`,HL="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Zr=l(()=>{"use strict"});var _e,pu=l(()=>{"use strict";Zr();_e=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var FL,uq=l(()=>{"use strict";FL="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var mq,gq=l(()=>{"use strict";mq=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var uu,yq=l(()=>{"use strict";gq();Zr();uu=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:mq(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var $L,hq=l(()=>{"use strict";Zr();$L=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var zL,Sq=l(()=>{"use strict";Zr();zL=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var Pq,mu,Aq=l(()=>{"use strict";Pq=["generalize","evaluate","separate","optimize_modules"],mu=(e,t)=>{let r=Pq.indexOf(t);if(r===-1)return e;let o=Pq.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var RP,UL=l(()=>{"use strict";gP();RP=e=>{let t=nu(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var gu,_q=l(()=>{"use strict";UL();gu=e=>{let t=RP(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Dme,Hme,Fme,bq,Rq=l(()=>{"use strict";Dme=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),Hme=/^\{\{[a-zA-Z0-9_-]+\}\}$/,Fme=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(Dme(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let p=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),p}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},bq=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>Hme.test(n)?n:Fme(n,r)).join("")}});var BL,kq=l(()=>{"use strict";Rq();BL=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:bq(o.prompt,t)}))}))});var $me,fu,wq=l(()=>{"use strict";Zr();UL();$me=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),fu=e=>{let t=RP(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=$me(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var yu,Eq=l(()=>{"use strict";LL();yu=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return iu({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var hu,KL=l(()=>{"use strict";Sl();hu=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=Te(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var VL,Tq=l(()=>{"use strict";KL();VL=e=>{let t=hu({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var ii,Iq=l(()=>{"use strict";ii=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var zme,Ume,he,kP=l(()=>{"use strict";pu();zme=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},Ume=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,he=e=>{let t=_e(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:zme(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>Ume(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var Cq,Lq=l(()=>{"use strict";pu();kP();Cq=e=>{let t=he(e.wizard),r=_e(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var qL,vq=l(()=>{"use strict";Lq();qL=e=>{let t=Cq({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var Bme,xq,Wq=l(()=>{"use strict";Bme=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},xq=e=>[...e].reduce(Bme,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var Gme,Oq,jq=l(()=>{"use strict";Gme=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},Oq=e=>[...e].reduce(Gme,{out:"",inString:!1,escaped:!1}).out});var Kme,Vme,Mq,Nq=l(()=>{"use strict";Wq();jq();Kme=e=>e.charCodeAt(0)===65279?e.slice(1):e,Vme=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},Mq=e=>Oq(xq(Vme(Kme(e))))});var qme,Jme,Yme,Dq,Xme,_l,wP=l(()=>{"use strict";kL();Nq();qme=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},Jme=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},Yme=e=>[...e].reduce(Jme,{out:"",inString:!1,escaped:!1}).out,Dq=e=>{let t=fP(e);return t.length===0?null:t[t.length-1]},Xme=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},_l=e=>{let t=Mq(qme(e)),r=Dq(t);if(r!==null)return r;let o=Yme(t),n=Dq(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Xme(i)}}});var Zme,Qme,JL,Hq,Fq=l(()=>{"use strict";Zme=/^[a-z0-9][a-z0-9-]{0,62}$/,Qme=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return Zme.test(t)?t:""},JL=e=>e.replace(/\s+/gu," ").trim(),Hq=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=Qme(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=JL(n.name),a=JL(n.description),c=JL(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var $q,zq,Uq=l(()=>{"use strict";$q=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},zq=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var YL,Bq=l(()=>{"use strict";wP();Fq();Uq();YL=(e,t)=>{let r=(()=>{try{return _l(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if($q(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(zq).filter(a=>a!==null),i=Hq({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var XL,Gq=l(()=>{"use strict";XL=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var ZL,Kq=l(()=>{"use strict";ZL=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var ege,QL,Vq=l(()=>{"use strict";pu();kP();ege=(e,t)=>e==="passed"||e==="stopped"||e==="failed"?e:e==="pending"?"not run":t==="failed"?"failed":"stopped",QL=e=>{let t=he(e.wizard),r=_e(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${ege(n.status,e.cycleStatus)} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Su,qq=l(()=>{"use strict";Su=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var Er,tge,ev,Jq=l(()=>{"use strict";Er=u(na());wP();tge=(0,Er.isType)({name:Er.isNonEmptyString,description:Er.isString,sampleValue:Er.isString}),ev=e=>{let t=_l(e);if(!(0,Er.isType)({templatedPrompt:Er.isNonEmptyString,variables:(0,Er.isArrayWithEachItem)(tge)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var Ie,rge,oge,tv,Yq=l(()=>{"use strict";Ie=u(na());Zr();wP();rge=(0,Ie.isType)({id:Ie.isNonEmptyString,title:Ie.isNonEmptyString,prompt:Ie.isNonEmptyString,order:Ie.isNumber}),oge=(0,Ie.isType)({id:Ie.isNonEmptyString,title:Ie.isNonEmptyString,summary:Ie.isString,topology:(0,Ie.isOneOf)("chain","parallel"),modules:(0,Ie.isArrayWithEachItem)(rge),recommended:Ie.isBoolean}),tv=e=>{let t=_l(e);if(!(0,Ie.isType)({options:(0,Ie.isArrayWithEachItem)(oge)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var bl,Xq=l(()=>{"use strict";bl=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var nge,rv,ov=l(()=>{"use strict";nge=/\{\{([a-zA-Z0-9_-]+)\}\}/g,rv=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(nge,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var Tr,Ir,Zq=l(()=>{"use strict";Sl();ov();Tr=e=>rv(e.templatedPrompt,e.variables),Ir=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return Te(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??Tr(e.wizard)}});var sge,ai,Qq=l(()=>{"use strict";sge=/\{\{([a-zA-Z0-9_-]+)\}\}/g,ai=(e,t)=>e.replace(sge,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var ige,li,EP=l(()=>{"use strict";ige=/\{\{([a-zA-Z0-9_-]+)\}\}/g,li=e=>{let t=new Set,r=[];for(let o of e.matchAll(ige)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Pu,eJ=l(()=>{"use strict";EP();Pu=e=>e.variables.length>0||li(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var nv,sv=l(()=>{"use strict";Zr();nv=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Au,tJ=l(()=>{"use strict";Sl();sv();Au=e=>{let t=e.wizard.evaluateSelectedRound??Te(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:nv(r.judgement,e.passScore)}});var _u,rJ=l(()=>{"use strict";_u=e=>e.length===1&&e[0].modules.length===1});var iv,oJ=l(()=>{"use strict";iv=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var ze,TP,bu=l(()=>{"use strict";ze=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),TP=(e,t)=>`<p class="muted">The computer runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var nJ,sJ=l(()=>{"use strict";bu();nJ=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[ze("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),ze("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[ze("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var iJ,aJ=l(()=>{"use strict";hl();bu();iJ=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!O(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[ze("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>The AgentWitch Local app talks to AWL on this computer, on a port unique to your account. The run is stored on this computer.</p>"),ze("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),ze("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this computer",TP(e.writerLabel,e.folder)),ze("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[ze("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var lJ,cJ=l(()=>{"use strict";bu();lJ=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[ze("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),ze("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[ze("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var dJ,pJ=l(()=>{"use strict";bu();dJ=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[ze("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),ze("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",TP(e.writerLabel,e.folder)),...r?[ze("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var IP,uJ=l(()=>{"use strict";hl();sJ();aJ();cJ();pJ();IP=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(O(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return iJ(r);case"evaluate":return nJ({...r,currentRound:e.currentRound});case"separate":return dJ(r);case"optimize_modules":return lJ({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Ru,jo,mJ=l(()=>{"use strict";Ru=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),jo=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var age,CP,av,gJ=l(()=>{"use strict";EP();age="wizardParam_",CP=e=>`${age}${e}`,av=e=>{let t=li(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=CP(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Ht,fJ=l(()=>{"use strict";Ht=["generalize","evaluate","separate","optimize_modules"]});var ku,ci,Rl,Qr=l(()=>{"use strict";ku="Stopped because the confirmed token or spend budget was exceeded.",ci="Approaching the confirmed budget. Further trials may hard-stop.",Rl="Confirm the Step 4 token and spend budget before optimizing modules."});var kt,kl=l(()=>{"use strict";kt=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var Qt,wu=l(()=>{"use strict";Qr();Qt=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var lge,SJ,PJ,LP,AJ,lv=l(()=>{"use strict";Qr();lge={codex:9e4,"claude-cli":3e4,cursor:4e4,"cursor-cloud":4e4,antigravity:3e4},SJ=2,PJ=e=>{let t=e?.trim()??"";return t.length===0?null:lge[t]??null},LP=e=>{let t=PJ(e);return t===null?8e3:t*SJ},AJ=e=>{let t=PJ(e);return t===null?4e3:t*SJ}});var cge,er,Eu=l(()=>{"use strict";Qr();cge={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},er=e=>{let t=e?.trim()??"";return t.length===0?.01:cge[t]??.01}});var vP,cv=l(()=>{"use strict";Qr();Eu();vP=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=er(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var dv,Tu,xP,pv=l(()=>{"use strict";Qr();lv();kl();wu();cv();Eu();dv=e=>{let t=vP({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??er(e.writerId)??.01,s=r*o*LP(e.writerId);return{targetTokenBudget:s,estimatedSpendUsd:kt({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Tu=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),xP=e=>{let t=e.existing??Qt(),r=dv({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Tu(t,r)}});var di,wl,bJ=l(()=>{"use strict";Qr();lv();Zr();kl();wu();pv();cv();Eu();di=e=>{let t=vP({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??er(e.writerId),i=r*AJ(e.writerId),a=n*o*LP(e.writerId),c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:kt({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},wl=e=>{let t=e.existing??Qt();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=di({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Tu(t,r)}});var eo,RJ=l(()=>{"use strict";kl();Qr();wu();eo=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??Qt(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=kt({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var mv,El,kJ=l(()=>{"use strict";Qr();kl();mv=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=kt({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:ku,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:ku,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,p=s!==null&&s>0&&o>=s*c;return(d||p)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:ci,costControls:{...t,softWarnFired:!0,softWarnMessage:ci}}:null},El=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var gv,wJ=l(()=>{"use strict";gv=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var x=l(()=>{"use strict";hl();mP();X5();_L();hP();LL();Q5();eq();tq();rq();bL();oq();Sl();cq();ML();OL();dq();pq();Zr();pu();uq();yq();hq();Sq();Aq();_q();kq();wq();Eq();KL();Tq();Iq();kP();vq();Bq();Gq();Kq();Vq();qq();Jq();Yq();Xq();Zq();ov();Qq();EP();eJ();tJ();rJ();sv();oJ();uJ();mJ();gJ();fJ();Qr();kl();wu();pv();bJ();Eu();RJ();kJ();wJ()});var fv=l(()=>{"use strict";Nd()});var IJ,CJ=l(()=>{"use strict";IJ=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.is_error!==!0)return null;let i=typeof s.result=="string"&&s.result.trim().length>0?s.result.trim():typeof s.subtype=="string"?`Claude CLI error: ${s.subtype}`:"Claude CLI returned an error without a message.",a=i.startsWith("Claude CLI")?i:`Claude CLI: ${i}`;return a.length>400?`${a.slice(0,397)}...`:a}});var dge,LJ,vJ=l(()=>{"use strict";fv();dge=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,LJ=e=>{let t=vs(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(dge)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var WJ,pge,uge,tr,mge,gge,xJ,OP,OJ,fge,rr,jJ,MJ,NJ,Lr=l(()=>{"use strict";fv();CJ();vJ();WJ=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),pge=/usage limit|monthly (usage |spend )?limit|spend limit|hit your (org's |usage )?(monthly )?(usage |spend )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit|too many requests|\b429\b/i,uge=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,tr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(pge.test(e.errorMessage))return"usage_limit";if(uge.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},mge="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",gge="The writer waited on terminal input and did not return a prompt.",xJ=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|spend limit|insufficient credit|rate limit|too many requests|billing|subscription required|API Error: \d{3}/i,OP=e=>{let t=e.trim();if(t.length===0||t.length>=500||!xJ.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>xJ.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},OJ=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},fge=e=>OP(e.stdout)??OP(e.stderr)??(OJ(e.replyFile)?OP(e.replyFile):null),rr=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return mge;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?gge:null},jJ=e=>{let t=e.trim();return t.length===0?null:rr(t)!==null?t:OP(t)??(OJ(t)?t:null)},MJ=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],NJ=e=>{let t=e.replyFileText?.trim()??"",r=rr([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=fge({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=tr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=LJ([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=IJ(e.stdout);if(i!==null){let c=tr({errorMessage:i});return c===void 0?{ok:!1,errorMessage:i}:{ok:!1,errorMessage:i,errorKind:c}}let a=vs(e.stdout);if(a!==null&&a.text.trim().length>0)return{ok:!0,text:a.text,tokens:a.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var yge,HJ,DJ,ui,jP=l(()=>{"use strict";Lr();yge=400,HJ=(e,t=yge)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},DJ=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:jJ(e.promptText)},ui=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:DJ(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=DJ(e.revisions[n]);if(s!==null)return s.trim()}return null}});var $,hge,MP,be,mi,$J,FJ,zJ,UJ,Ue=l(()=>{"use strict";$="manual",hge=["claude-cli","codex","cursor","antigravity"],MP={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},be=e=>e===$?"You":e in MP?MP[e]:e,mi=e=>hge.filter(t=>e.includes(t)),$J=e=>{let t=mi(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},FJ=(e,t)=>t===$?$:e.find(r=>r===t)??null,zJ=(e,t,r)=>{let o=mi(e),n=FJ(o,t),s=FJ(o,r);return n===null||s===null?null:{judge:n,improver:s}},UJ=(e,t,r)=>{let o=mi(e);return t===null||t.trim()===""?r!==$?r:o[0]??null:t===$?null:o.find(n=>n===t)??null}});var BJ,NP,yv,gi,hv,Ft,Mo,Ce,Pt=l(()=>{"use strict";BJ=u(require("node:fs")),NP=u(require("node:os")),yv=u(require("node:path"));Gr();gi="~",hv=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Ft=e=>{let t=NP.default.homedir(),r=hv(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},Mo=e=>{let t=e.trim().length===0?"~":e.trim(),r=je(t),o=yv.default.isAbsolute(r)?hv(r):hv(yv.default.resolve(NP.default.homedir(),r));try{if(!BJ.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}return{ok:!0,path:o,display:Ft(o)}},Ce=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:NP.default.homedir()});var wt,Wn=l(()=>{"use strict";wt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var Sv,GJ,Sge,KJ,VJ,Pv=l(()=>{"use strict";x();Ue();Pt();Wn();Sv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),GJ=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Sge=e=>{let t=GJ(e.state),r=`<h2>${Sv(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${Sv(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${wt}</button></div><template>${r}</template></li>`},KJ=e=>{let t=e.wizard;if(t===void 0)return"";let r=IP({status:e.status,wizard:t,writerLabel:be(e.judgeModel),runnerLabel:be(e.runnerModel??e.judgeModel),folderDisplay:Ft(Ce(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this computer">${r.map(Sge).join("")}</ol>`},VJ=e=>{let t=e.wizard;if(t===void 0)return"";let r=IP({status:e.status,wizard:t,writerLabel:be(e.judgeModel),runnerLabel:be(e.runnerModel??e.judgeModel),folderDisplay:Ft(Ce(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this computer</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${GJ(n.state)}<span class="sdlc-pipeline-label">${Sv(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var vr,qJ,JJ,YJ,Av=l(()=>{"use strict";x();vr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qJ="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",JJ=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${vr(qJ)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${vr(i.name)}}}</strong> \u2014 ${vr(i.description)} (sample: ${vr(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${vr(r)}</pre>`,n=Tr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${vr(n)}</pre>`;return`${t}${o}${s}`},YJ=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${vr(qJ)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${vr(n.name)}}}</strong> \u2014 ${vr(n.description)} (sample: ${vr(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${vr(r)}</pre>`;return`${t}${o}`}});var Iu,_v=l(()=>{"use strict";Iu=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var XJ,ZJ=l(()=>{"use strict";x();XJ=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=si({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=ni({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var bv,Cu,Rv=l(()=>{"use strict";Wn();ZJ();bv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cu=e=>{let t=XJ(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${bv(r)}">${wt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${bv(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${bv(t)}</pre></template>`}});var kv,Lu,wv=l(()=>{"use strict";Wn();kv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lu=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${kv(r)}">${wt}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${kv(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${kv(t)}</pre></template>`}});var DP,Tl,Ev=l(()=>{"use strict";_v();Rv();wv();DP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tl=e=>{let t=Iu(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${DP(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=m=>c&&m===0?"Trial run":`Round ${m}`,p=e.cycle.revisions.map(m=>{let g=m.judgement?.score,y=g==null?`${d(m.roundNumber)} \u2014 not scored`:`${d(m.roundNumber)} \u2014 ${g}`,S=m.judgement?.reasons?.trim()??"",A=S.length===0?"":`<br><span class="muted">${DP(S)}</span>`,E=Lu({roundLabel:d(m.roundNumber),promptText:m.promptText}),I=Cu({cycle:e.cycle,roundNumber:m.roundNumber,promptText:m.promptText,run:m.run}),f=`${E}${I}`;if(e.interactive){let P=e.selectedRound===m.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${m.roundNumber}"${P}> <span class="sdlc-wizard-revision-title">${DP(y)}</span></label>${f}${A}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${DP(y)}</span>${f}${A}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${p}</ul>`}});var Tv,QJ,e4,t4,Iv=l(()=>{"use strict";Tv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QJ=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${Tv(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Tv(t.prompt)}</pre></li>`).join("")}</ol>`,e4=e=>QJ([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),t4=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${Tv(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${QJ(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var vu,Pge,HP,Cv=l(()=>{"use strict";x();Iv();vu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Pge=e=>{let t=e.wizard;return t===void 0?"":Ir({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},HP=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Pge(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${vu(n.orchestratorSkill.fileName)}</code> \u2014 ${vu(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${vu(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=e4(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${vu(r)} <span class="muted">${vu(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var tt,Age,_ge,bge,Rge,FP,kge,wge,Ege,Tge,Ige,Cge,Il,$P=l(()=>{"use strict";x();Pv();Av();Ev();Rv();wv();Cv();tt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Age={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},_ge=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${tt(o)}</pre>`:`<p class="sdlc-pre-preview mono">${tt(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${tt(o)}</pre></details>`;return`<h2>${tt(e)}</h2>${n}`},bge=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=Tr(t).trim(),n=Ir({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!O(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${_ge("What is being evaluated",i)}`},Rge=(e,t)=>{let r=e.wizard;if(r===void 0||O(e.status))return"";let o=Age[t];return o===void 0||r.phase!==o?"":VJ(e)},FP=(e,t,r)=>{let o=Rge(e,t),n=t==="wizard-2"?bge(e):"";return`${o}${n}${r}`},kge=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},wge=e=>{let t=e.wizard;return t===void 0?"":JJ(t)},Ege=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${tt(a)}</span>`,d=`Round ${n.roundNumber}`,p=Lu({roundLabel:d,promptText:n.promptText}),m=Cu({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${tt(s)}${i}</span>${p}${m}${c}</li>`}).join("")}</ul>`,Tge=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Tl({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=kge(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Ege(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=Ir({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${tt(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",p=`Round ${c.roundNumber} \u2014 score ${d}`,m=Lu({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),g=Cu({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${tt(p)}</span>${m}${g}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${tt(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},Ige=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${tt(n.title)}</strong> <span class="muted">(${tt(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${tt(o.title)}</strong>${n}${tt(s)}${HP(e,o)}</li>`}).join("")}</ul>`},Cge=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${tt(i)}</span> <strong>${tt(n.title)}</strong>${tt(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${tt(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Tl({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Il=(e,t)=>{switch(t){case"wizard-1":return FP(e,t,wge(e));case"wizard-2":return FP(e,t,Tge(e));case"wizard-3":return FP(e,t,Ige(e));case"wizard-4":return FP(e,t,Cge(e));default:return""}}});var Lge,vge,r4,o4,n4=l(()=>{"use strict";x();jP();Lr();$P();Lge=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},vge=e=>{let t=e.goal.trim();return t.length===0?null:t},r4=(e,t,r,o,n)=>{let s=rr(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},o4=(e,t)=>{let r=vge(e);if(t.id.startsWith("wizard-")){let s=Il(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=cu(e,t);if(s!==null){let a=ui(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=Te(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:r4(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:Lge(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:r4(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var fi,s4,i4=l(()=>{"use strict";fi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),s4=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${fi(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${fi(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${fi(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${fi(n)}</h2><pre class="mono">${fi(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${fi(e.goal)}</dd></div></dl>`;return`<h2>${fi(e.title)}</h2>${i}${t}${r}${o}${s}`}});var xge,a4,xu,Lv,zP=l(()=>{"use strict";x();xge=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),a4=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||O(e.status))return null;let r=wr(t);return r<0||r>3?null:`wizard-${r+1}`},xu=(e,t)=>xge.has(t)?a4(e)===t:!1,Lv="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var Wge,UP,vv=l(()=>{"use strict";Wge='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',UP=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${Wge}</button>`});var yi,BP=l(()=>{"use strict";x();yi=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:su({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:au(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var Oge,l4,jge,xv,c4,Mge,Nge,Dge,Hge,d4,p4=l(()=>{"use strict";x();BP();Oge={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},l4=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},jge=e=>Oge[e]??null,xv=(e,t)=>{let r=e.wizard,o=jge(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=wr(r);return o<n||o===n},c4=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},Mge=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:Tr(t).trim();return o.length===0?null:gu({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:l4(e,"generalize")})},Nge=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=yi(e);return n===null?null:vn({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=c4(e)?.promptText.trim()??Ir({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:si({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},Dge=e=>{let t=e.wizard;if(t===void 0)return null;let r=Ir({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:fu({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:l4(e,"separate")})},Hge=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=jo(t),s=ai(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=yi(e);return c===null?null:vn({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=c4(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||O(e.status)&&i?.judgement!==null)?ni({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):yu({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:ii(t,r).output,moduleTitle:o.title})},d4=(e,t)=>{if(!xv(e,t))return null;switch(t){case"wizard-1":return Mge(e);case"wizard-2":return Nge(e);case"wizard-3":return Dge(e);case"wizard-4":return Hge(e);default:return null}}});var Fge,GP,Wv=l(()=>{"use strict";x();Fge=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},GP=(e,t)=>{let r=e.wizard,o=Fge(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=wr(r);return o<n?"done":o===n&&O(e.status)&&e.status==="failed"?"failed":o<=n&&O(e.status)?"done":"pending"}});var $ge,Cl,KP=l(()=>{"use strict";Wn();p4();Wv();$ge=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cl=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(GP(e,t)==="pending")return""}else if(!xv(e,t))return"";let o=d4(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${wt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${$ge(o)}</pre></template>`}});var hi,No,Ll=l(()=>{"use strict";hi=e=>e.toLocaleString("en-US"),No=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var to,zge,u4,VP,m4,g4,qP=l(()=>{"use strict";x();n4();i4();zP();vv();Wn();jP();Pv();KP();Ll();to=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zge=(e,t)=>{let r=cu(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?No(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${hi(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${to(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${to(r)}</span>`:"",d=s4(o4(t,e)),p=t.wizard!==void 0&&t.wizard.phase==="complete"&&O(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${to(e.id)}"`:"",m=xu(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${to(Lv)}"><input type="hidden" name="cycleId" value="${to(t.id)}"><input type="hidden" name="wizardStepId" value="${to(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",g=e.state==="active"&&e.id.startsWith("wizard-")?KJ(t):"",y=o?"failed":e.state,S=o?ui(t):null,A=S!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${wt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${to(S)}</pre></template>`:"",E=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Cl(t,e.id):"";return`<li class="sdlc-node sdlc-node-${y}" data-sdlc-step-id="${to(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${p} data-sdlc-node>${n}<span class="sdlc-node-label">${to(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${m}${E}${A}</div></div>${g}<template>${d}</template></li>`},u4=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>zge(r,t)).join("")}</ol>`,VP=e=>`<div class="sdlc-score" aria-label="What the score means">${lu(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${to(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,m4=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${UP({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,g4=`<script>
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
</script>`});var JP,YP,XP,f4,Ov=l(()=>{"use strict";JP="support-reply",YP="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",XP=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),f4=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var ZP,jv,Mv=l(()=>{"use strict";x();qP();Ov();ZP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jv=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${VP(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this computer</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${ZP(YP)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${ZP(XP)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${ZP(f4)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${ZP(JP)}">Run this sample</a>
      </div>
    </section>`});var Nv,QP,Uge,y4,h4=l(()=>{"use strict";Nv=u(require("node:fs")),QP=u(require("node:path")),Uge=e=>QP.default.join(QP.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),y4=(e,t)=>{let r=Uge(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;Nv.default.mkdirSync(QP.default.dirname(r),{recursive:!0}),Nv.default.appendFileSync(r,o,"utf8")}});var vl,S4,Bge,P4,Gge,A4,ro,pe,_4,Y,$t=l(()=>{"use strict";vl=u(require("node:fs")),S4=u(require("node:path"));x();h4();Bge=e=>e.wizard===void 0?e:{...e,wizard:$L(e.wizard)},P4=new Set,Gge=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),A4=(e,t)=>{vl.default.mkdirSync(S4.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;vl.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),vl.default.renameSync(r,e)},ro=e=>{if(!vl.default.existsSync(e))return[];try{let t=JSON.parse(vl.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Gge).map(Bge):[]}catch{return[]}},pe=(e,t)=>ro(e).find(r=>r.id===t)??null,_4=(e,t)=>{P4.add(t);let r=ro(e).filter(o=>o.id!==t);A4(e,r)},Y=(e,t)=>{if(P4.has(t.id))return;let r=ro(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];A4(e,o),y4(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var xl,oo,Wu,b4,eA,Kge,R4,k4,w4,Dv=l(()=>{"use strict";xl=u(require("node:fs")),oo=u(require("node:path")),Wu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},b4=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),eA=(e,t)=>{let r=Wu(e);return r.length>0?r:Wu(t)},Kge=e=>{let t=eA(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${b4(o)}`,...n.length>0?[`description: ${b4(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},R4=e=>`.cursor/skills/${e}/SKILL.md`,k4=(e,t)=>{let r=Wu(t);if(r.length===0)return!1;let o=oo.default.resolve(e),n=oo.default.resolve(o,".cursor","skills"),s=oo.default.resolve(o,R4(r));return s.startsWith(`${n}${oo.default.sep}`)?xl.default.existsSync(s):!1},w4=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(eA(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=oo.default.resolve(e.workingDirectory);try{if(!xl.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Kge({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=R4(r.slug),n=oo.default.resolve(t,".cursor","skills"),s=oo.default.resolve(t,o);if(!s.startsWith(`${n}${oo.default.sep}`))return{ok:!1,errorCode:"path"};if(xl.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{xl.default.mkdirSync(oo.default.dirname(s),{recursive:!0}),xl.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var Vge,E4,T4,I4=l(()=>{"use strict";x();$t();Pt();Lr();Dv();Vge=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,E4=e=>{let t=e.get("savedSkill");return t!==null&&Vge.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this computer.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this computer.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},T4=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=pe(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!O(r.status))return{kind:"redirect",location:o("skillError=working")};let n=Te(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||rr(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=w4({workingDirectory:Ce(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var tA,rA,Ou=l(()=>{"use strict";x();tA=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=eo({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},rA=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var On,ju=l(()=>{"use strict";x();Ou();On=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=iv(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=xP({moduleCount:o.length,existing:e.costControls,writerId:n}),i=tA(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Ru(r.variables)},updatedAt:new Date().toISOString()}}});var jn,Mu=l(()=>{"use strict";jn=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var oA=l(()=>{"use strict";fr();Kp();Nd()});var Hv,C4,nA,L4,v4=l(()=>{"use strict";Hv={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},C4=e=>e.exitCode===null&&e.signalCode===null,nA=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!C4(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!C4(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),L4=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),nA(e).then(s=>{r({...Hv,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var x4,qge,Fv,Jge,W4,O4=l(()=>{"use strict";x4=/please visit the url to log in|paste the authorization code|waiting for authentication|authentication timed out|accounts\.google\.com\/o\/oauth2/i,qge=/authentication required|not logged in|login required|please run .{1,40}\blogin\b|authentication failed or timed out/i,Fv=e=>{if(x4.test(e.stderr)||qge.test(e.stderr))return!0;let t=e.stdout.match(new RegExp(x4.source,"gi"));return new Set((t??[]).map(r=>r.toLowerCase())).size>=2},Jge={antigravity:{label:"Antigravity CLI",command:"agy"},"claude-cli":{label:"Claude CLI",command:"claude"},codex:{label:"Codex CLI",command:"codex login"},cursor:{label:"Cursor CLI",command:"cursor-agent login"}},W4=e=>{let t=Jge[e];return`${t.label} isn't signed in on this computer. Open Terminal, run \`${t.command}\` once and finish sign-in, then retry.`}});var j4,Nu,M4,$v,Yge,Uv,Bv,Xge,Zge,Qge,N4,efe,zv,D4,Du,H4,tfe,rfe,Et,Si=l(()=>{"use strict";j4=require("node:child_process"),Nu=u(require("node:fs")),M4=u(require("node:os")),$v=u(require("node:path"));oA();v4();O4();Lr();Yge=["claude-cli","codex","cursor","antigravity"],Uv=18e4,Bv=6e5,Xge=12e4,Zge=9e5,Qge="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",N4="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",efe="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",zv=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},D4=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=zv(process.env[N4])??Math.max(r,Bv));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:zv(process.env[efe])??Zge;return Math.min(o,Math.max(Xge,r))},Du=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?zv(process.env[N4])??Bv:Uv,H4=e=>`The writer timed out after ${e}ms.`,tfe=e=>Yge.includes(e),rfe=e=>e===!0||process.env[Qge]==="1",Et=e=>new Promise(t=>{if(e.signal?.aborted){t(Hv);return}if(rfe(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!tfe(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this computer."});return}let r=e.writerAgent,o=Yt(r,e.prompt,Ae({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Nu.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this computer."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:Uv,s=$v.default.join(Nu.default.mkdtempSync($v.default.join(M4.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=MJ({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},p=(0,j4.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),m=A=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(A))};L4(p,e.signal,m,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason!=="auth"&&(d.stopReason="timeout",nA(p).then(A=>{m({ok:!1,errorMessage:H4(n),errorKind:"writer_timeout",killSignal:A})}))},n);let g={ok:!1,errorMessage:W4(r),errorKind:"action_required"},y=()=>({stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8")}),S=()=>{d.settled||d.stopReason!==null||Fv(y())&&(d.stopReason="auth",nA(p).then(A=>{m({...g,killSignal:A})}))};p.stdout.on("data",A=>{a.push(Buffer.from(A)),S()}),p.stderr.on("data",A=>{c.push(Buffer.from(A)),S()}),p.on("error",()=>m({ok:!1,errorMessage:"The writer failed to start."})),p.on("close",(A,E)=>{if(d.settled)return;if(d.stopReason==="auth"){m({...g,killSignal:E==="SIGKILL"?"SIGKILL":"SIGTERM"});return}let I=Nu.default.existsSync(s)?Nu.default.readFileSync(s,"utf8"):null,f=y();if(d.stopReason===null&&Fv(f)){m(g);return}let P=NJ({writerAgent:r,...f,replyFileText:I});if(P.ok&&d.stopReason!=="abort"){m(P);return}d.stopReason===null&&m(P)})})});var ofe,Hu,Gv=l(()=>{"use strict";x();Ll();ofe=e=>{if(e.wizard!==void 0){let t=Su(e.wizard),r=No(e);return(t??0)+r}return No(e)},Hu=e=>{let t=mv({costControls:e.costControls,spentTokens:ofe(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var F4,nfe,Fu,sA,iA=l(()=>{"use strict";x();Ue();Gv();F4=e=>e===$?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},nfe=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Fu=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=CL({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:F4(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?gv({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:au(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=nfe(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Hu({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Hu({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},sA=(e,t,r=null)=>{let o=SP({raw:t,judge:F4(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var aA,Kv=l(()=>{"use strict";aA=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var U4,lA,cA,$4,z4,Vv,sfe,B4,qv,ife,G4,afe,lfe,K4,V4=l(()=>{"use strict";U4=require("node:child_process"),lA=u(require("node:fs")),cA=u(require("node:path"));Xh();x();$4=4e3,z4=12e3,Vv=(e,t)=>{let r=(0,U4.spawnSync)("git",[...t],{cwd:e,env:kn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},sfe=e=>Vv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",B4=e=>{let t=Vv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},qv=(e,t)=>{let r=cA.default.resolve(e,t),o=cA.default.relative(e,r);if(o.startsWith("..")||cA.default.isAbsolute(o)||!lA.default.existsSync(r)||!lA.default.statSync(r).isFile())return null;let n=lA.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>$4?`${n.slice(0,$4)}
\u2026truncated`:n},ife=e=>e.length>z4?`${e.slice(0,z4)}
\u2026truncated`:e,G4=e=>{let t=xL(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,qv(e.workingDirectory,n)])),o=sfe(e.workingDirectory);return{git:o,status:o?B4(e.workingDirectory):{},files:r,paths:t}},afe=(e,t)=>{let r=Vv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=qv(e,t);return o===null?`${t} is missing.`:o},lfe=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",K4=e=>{let t=e.before.git?B4(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=qv(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>afe(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:lfe(e.before.git,e.before.paths.length>0),evidence:ife(i.join(`

`))}}});var Xv,ae,Zv,rt,q4,cfe,dfe,J4,Wl,Y4,Ol,pfe,ufe,$u,Jv,Yv,mfe,X4,gfe,ffe,yfe,Z4,hfe,Q4,eY,Sfe,Pfe,tY,rY=l(()=>{"use strict";Xv=require("node:child_process"),ae=u(require("node:fs")),Zv=u(require("node:os")),rt=u(require("node:path"));Xh();q4=8e6,cfe=16e6,dfe=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],J4=(e,t)=>{let r=(0,Xv.spawnSync)("git",[...t],{cwd:e,env:kn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Wl=(e,t)=>(0,Xv.spawnSync)("git",[...t],{cwd:e,env:kn(),timeout:8e3}).status===0,Y4=e=>{let t=J4(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Ol=(e,t)=>{let r=rt.default.resolve(e,t),o=rt.default.relative(e,r);return o.startsWith("..")||rt.default.isAbsolute(o)?null:r},pfe=(e,t)=>{let r=Ol(e,t);if(r===null||!ae.default.existsSync(r))return null;let o=ae.default.statSync(r);return!o.isFile()||o.size>q4?null:ae.default.readFileSync(r)},ufe=(e,t,r)=>{let o=Ol(e,t);o!==null&&(ae.default.mkdirSync(rt.default.dirname(o),{recursive:!0}),ae.default.writeFileSync(o,r))},$u=(e,t)=>{let r=Ol(e,t);r===null||!ae.default.existsSync(r)||ae.default.rmSync(r,{recursive:!0,force:!0})},Jv=(e,t)=>Wl(e,["cat-file","-e",`HEAD:${t}`]),Yv=e=>{let t=J4(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},mfe=e=>rt.default.resolve(e)!==rt.default.resolve(Zv.default.homedir()),X4=e=>{if(!ae.default.existsSync(e))return 0;let t=ae.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?ae.default.readdirSync(e).reduce((r,o)=>r+X4(rt.default.join(e,o)),0):0},gfe=(e,t,r)=>{let o=Ol(e,r);if(o===null||!ae.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(X4(o)>cfe)return{relativePath:r,existed:!0,copyDir:null};let n=rt.default.join(t,"cache",r);return ae.default.mkdirSync(rt.default.dirname(n),{recursive:!0}),ae.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},ffe=400,yfe=32e6,Z4=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!ae.default.existsSync(s)))for(let i of ae.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=rt.default.join(s,i),c=ae.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>q4)){if(t.length>=ffe||r+c.size>yfe){o=!1;return}r+=c.size,t.push(rt.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},hfe=(e,t,r)=>{let o=Ol(e,r);if(o===null||!ae.default.existsSync(o))return null;let n=pfe(e,r);if(n===null)return"skip";let s=rt.default.join(t,"files",r);return ae.default.mkdirSync(rt.default.dirname(s),{recursive:!0}),ae.default.writeFileSync(s,n),s},Q4=e=>{let t=ae.default.mkdtempSync(rt.default.join(Zv.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?Y4(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:Z4(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,hfe(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?Yv(e.workingDirectory):null,isolateCaches:mfe(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:dfe.map(i=>gfe(e.workingDirectory,t,i))}},eY=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){$u(e.workingDirectory,t);return}ufe(e.workingDirectory,t,ae.default.readFileSync(r))}},Sfe=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?eY(e,t):Jv(e.workingDirectory,t)?Wl(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):$u(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Jv(e.workingDirectory,t)&&Wl(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Jv(e.workingDirectory,t)&&Wl(e.workingDirectory,["reset","-q","HEAD","--",t])},Pfe=(e,t)=>{let r=Ol(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){$u(e.workingDirectory,t.relativePath),ae.default.mkdirSync(rt.default.dirname(r),{recursive:!0}),ae.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){$u(e.workingDirectory,t.relativePath);return}if(ae.default.existsSync(r))for(let o of ae.default.readdirSync(r)){let n=rt.default.join(r,o);ae.default.statSync(n).mtimeMs>=e.startedMs-1e3&&ae.default.rmSync(n,{recursive:!0,force:!0})}}}},tY=e=>{try{if(e.git){if(Yv(e.workingDirectory)!==e.head&&(!(e.head===null?Wl(e.workingDirectory,["update-ref","-d","HEAD"]):Wl(e.workingDirectory,["reset","--hard",e.head]))||Yv(e.workingDirectory)!==e.head))throw new Error("head");let r=Y4(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Sfe(e,o)}else{if(e.complete)for(let t of Z4(e.workingDirectory).paths)e.files[t]===void 0&&$u(e.workingDirectory,t);for(let t of Object.keys(e.files))eY(e,t)}for(let t of e.caches)Pfe(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{ae.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var zu,dA,Afe,_fe,bfe,Rfe,kfe,oY,wfe,nY,sY=l(()=>{"use strict";x();iA();Kv();V4();rY();Ue();Pt();Lr();Si();zu=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),dA=e=>({...e,status:"stopped",errorMessage:oi,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),Afe=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),_fe=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==$?t:e.improverModel!==$?e.improverModel:null}return e.judgeModel!==$?e.judgeModel:e.improverModel!==$?e.improverModel:null},bfe=async e=>{let t=Ce(e.cycle),r=G4({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=Q4({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?yu({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:ii(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):iu({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=D4({promptText:e.revision.promptText,isModuleRun:i}),c=Du({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},p=await Et({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),m=p.ok?K4({workingDirectory:t,before:r,writerReply:p.text}):null,g=tY(o),y={...e.cycle,revisions:e.cycle.revisions.map(S=>S.roundNumber===e.cycle.currentRound?d:S)};return p.ok?!g.ok||m===null?{ok:!1,cycle:zu(y,g.ok?"Could not put the folder back after the run.":g.errorMessage)}:{ok:!0,cycle:y,run:{output:p.text.trim(),tokens:p.tokens,delayMs:Date.now()-n,lookedAt:m.lookedAt,evidence:m.evidence}}:p.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:dA(y)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:zu(y,p.errorMessage,tr(p))})},Rfe=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:bfe({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),kfe=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),oY=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await Et({writerAgent:e.reviewer,workingDirectory:Ce(e.cycle),prompt:vL({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:dA(e.cycle)}:tr(o)==="action_required"?{kind:"stopped",cycle:zu(e.cycle,o.errorMessage,"action_required")}:{kind:"suggestion",text:"",tokens:null}},wfe=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===$)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await Et({writerAgent:t.judgeModel,workingDirectory:Ce(t),prompt:si({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Fu(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?dA(o):(e.onWriterFailure?.(t.judgeModel),zu(o,n.errorMessage,tr(n)))},nY=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return wfe(e);let o=_fe(t),n=await Rfe({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?Afe(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===$){let p=await oY({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return p.kind==="stopped"?p.cycle:{...kfe(s,p.text),judgePhase:void 0}}let i=await Et({writerAgent:t.judgeModel,workingDirectory:Ce(t),prompt:ni({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?dA(s):(e.onWriterFailure?.(t.judgeModel),zu(s,i.errorMessage,tr(i)));let a=await oY({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=Fu(s,i.text,c);return aA(d,a.text)}});var pA,Efe,Tfe,Qv,iY=l(()=>{"use strict";x();iA();sY();BP();Lr();Ue();Gv();Pt();Si();pA=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Efe=e=>({...e,status:"stopped",errorMessage:oi,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),Tfe=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?Efe(e):(n?.(r),pA(e,t.errorMessage,tr(t))),Qv=async(e,t,r,o)=>{let n=Hu(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return pA(e,"This round has no prompt.");if(e.status==="judging")return nY({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return pA(e,"This cycle is waiting on a step this computer cannot run.");if(e.improverModel===$)return e;let i=yi(e);if(i===null)return pA(e,"The improver needs the score and the reason.");let a=await Et({writerAgent:e.improverModel,workingDirectory:Ce(e),prompt:vn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:Du()}),c=Tfe(e,a,e.improverModel,r,t);return c!==null?c:sA(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Uu,ex,Ife,lY,aY,Cfe,Lfe,uA,cY,dY,vfe,xfe,Pi,pY,uY,Bu=l(()=>{"use strict";x();ju();Mu();Ue();Pt();Lr();Si();iY();_v();Uu=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),ex=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Uu(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},Ife=e=>{let t=tr(e);return WJ(e)||t==="usage_limit"||t==="action_required"},lY=(e,t,r)=>Ife(r)?Uu(e,r.errorMessage,tr(r)):ex(e,t,r.errorMessage),aY=e=>{let t=e.wizard;return t===void 0||Iu(e).length===0?e:{...e,wizard:bl({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},Cfe=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",Lfe=e=>{let t=e.wizard;if(t===void 0)return e;let r=hu({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:bl({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},uA=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),cY=e=>e.judgeModel!==$?e.judgeModel:e.improverModel!==$?e.improverModel:null,dY=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},vfe=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=cY(e);if(n===null)return Uu(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??Tr(o),i=gu({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:dY(e,"generalize")}),a=await Et({writerAgent:n,prompt:i,workingDirectory:Ce(e),signal:t});if(!a.ok)return r?.(n),lY(e,"generalize",a);try{let c=ev(a.text),d=bl({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Ru(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),p={...e,wizard:d};return Pu(d)?Pi({...p,wizard:{...d,gate:null}}):uA(p,"generalize")}catch(c){return ex(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},xfe=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=cY(e);if(n===null)return Uu(e,"Choose a writer to suggest splits.");let s=Ir({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=fu({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:dY(e,"separate")}),a=await Et({writerAgent:n,prompt:i,workingDirectory:Ce(e),signal:t});if(!a.ok)return r?.(n),lY(e,"separate",a);try{let c=tv(a.text),d=BL(c,o.variables),p=bl({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),m={...e,wizard:p};return _u(d)?On(m,d[0]):uA(m,"separate")}catch(c){return ex(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},Pi=e=>{let t=e.wizard;if(t===void 0)return e;let r=Tr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},pY=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Uu(e,"This module is missing.");let n=jo(r),s=ai(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==$?e.runnerModel:e.judgeModel!==$?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:_e(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},uY=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return Qv(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return vfe(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return xfe(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await Qv(e,t,r,o);if(O(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Iu(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let m=Te(s.revisions.map(g=>({roundNumber:g.roundNumber,promptText:g.promptText,score:g.judgement?.score??0,reasons:g.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:m}}}if(i==="evaluate"&&Au({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let p=aY(uA(a,i));return jn(p)}let c=uA(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let p=VL({wizard:{...c.wizard,modules:c.wizard.modules.map((m,g)=>g===c.wizard.currentModuleIndex&&m.status==="running"?{...m,status:"paused"}:m)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:Cfe(s.status)});return{...c,wizard:p}})():c;return i==="evaluate"?aY(d):Lfe(d)}return s}return n.phase==="complete",e}});var jl,mA=l(()=>{"use strict";x();Ue();jl=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:XL(r,e.judgeModel===$),updatedAt:new Date().toISOString()}}});var Ml,gA=l(()=>{"use strict";Ml=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var or,mY,Wfe,gY=l(()=>{"use strict";x();Pt();gA();Lr();Dv();or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mY=e=>{if(!O(e.status))return"";let t=Te(e.revisions.map(g=>({roundNumber:g.roundNumber,promptText:g.promptText,score:g.judgement?.score??null,reasons:g.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=rr(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${or(t.reasons.trim())}</p>`,i=e.status==="passed",a=Ml(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${or(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${or(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',p=n!==null?`<div class="alert-error">${or(n)}</div>`:i?Wfe({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Ce(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${or(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${or(t.promptText)}</pre></details>`,m=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${m}</h2>${d}${o}${s}${p}</section>`},Wfe=e=>{let t=e.sourceSkill?.fileName??Wu(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=eA(t,r),s=n.length>0&&k4(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${or(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${or(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${or(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${or(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${or(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${or(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var fY,yY=l(()=>{"use strict";fY=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var hY,Ofe,fA,Tt,yA,tx=l(()=>{"use strict";x();Ue();yY();jP();Lr();gA();hY=["Generalize","Evaluate","Separate","Optimize modules"],Ofe=e=>{let t=wr(e),r=t>=0&&t<hY.length?hY[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},fA=(e,t)=>{let r=ui(e),o=r===null?null:fY(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},Tt=(e,t)=>({title:e,detail:t,replyPreview:null}),yA=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=ui(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:HJ(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!O(e.status)){let t=e.judgeModel;return Tt(`${be(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this computer.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!O(e.status)){let t=e.judgeModel;return Tt(`${be(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this computer.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===$?Tt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?Tt(`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):Tt(`${be(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===$){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==$?Tt(`${be(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):Tt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this computer can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return Tt(`${be(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=_e(t);return Tt(`${be(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return Tt(`${be(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=_e(t);return Tt(`${be(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return Tt(`${be(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===$){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return Tt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return Tt(`${be(e.improverModel)} is rewriting the prompt.`,"That writer is working on this computer. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>rr(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=he(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||O(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?fA(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=Ml(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?fA(e,{title:`${Ofe(r)}${s}`,detail:t.length>0?t:n}):fA(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(O(e.status)){let t=e.errorMessage?.trim()??"";return fA(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this computer.",detail:"This panel keeps updating.",replyPreview:null}}});var no,Gu=l(()=>{"use strict";Ue();no=e=>{if(e.status==="improving"&&e.improverModel===$)return!0;if(e.status!=="judging"||e.judgeModel!==$)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===$}});var SY,PY=l(()=>{"use strict";SY=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var Mn,jfe,AY,_Y=l(()=>{"use strict";x();Mn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jfe=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${Mn(r)}</p>`},AY=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${Mn(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${Mn(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${Mn(a)}.</p>`}<pre class="mono">${Mn(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${xn(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${Mn(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let p=e.avoid?.trim()??"",m=p.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${Mn(p)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${jfe(e.score,e.reasons)}${m}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${Mn(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var Ku,Mfe,bY,RY=l(()=>{"use strict";x();Lr();Ku=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mfe=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=rr(t.promptText),n=t.judgement?.reasons?`<p class="muted">${Ku(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${Ku(i)}.</p>`}<pre class="mono">${Ku(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${xn(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,p=o===null?`<pre class="mono">${Ku(d)}</pre>`:`<div class="alert-error">${Ku(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${p}</article>`},bY=e=>e.revisions.map(t=>Mfe(e,t)).join("")});var kY,wY=l(()=>{"use strict";x();kY=e=>{if(O(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var so,Nfe,rx,Dfe,Hfe,Ffe,$fe,EY,TY,ox=l(()=>{"use strict";wY();so=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nfe="Stop this run? Writers will stop and the best prompt is kept.",rx="End the wizard? Writers will stop and progress from finished steps is kept.",Dfe="Skip this module and pause at the step gate?",Hfe=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${so(Nfe)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${so(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,Ffe=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${so(rx)}"><input type="hidden" name="cycleId" value="${so(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,$fe=e=>{let t=so(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${so(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${so(Dfe)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${so(rx)}">End wizard</button>
    </form>
  </div>`},EY=e=>{let t=kY(e);return t==="none"?"":t==="legacy_stop"?Hfe(e.id):t==="wizard_end_only"?Ffe(e.id):$fe(e)},TY=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=so(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${so(rx)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var IY,CY=l(()=>{"use strict";x();Ll();IY=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=he(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${hi(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${hi(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${_e(r)}`}return""}});var zfe,Ufe,LY,Bfe,vY,xY=l(()=>{"use strict";x();CY();Wv();$P();KP();zfe=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',Ufe=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',LY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bfe=(e,t,r)=>{let o=Il(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=IY(e,t),i=GP(e,t),a=zfe(i),c=Ufe(i),d=Cl(e,t,{forOutcomeSummary:!0}),p=`${a}<span class="sdlc-wizard-outcome-step-title">${LY(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${LY(s)}</span>`,m=t==="wizard-4"&&r.phase==="complete"?" open":"",g=i==="failed"&&t!=="wizard-4"?" open":"",y=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${y}"${m}${g}><summary aria-controls="${y}-body">${p}</summary><div class="sdlc-wizard-outcome-step-body" id="${y}-body">${o}</div></details>`},vY=e=>{let t=e.wizard;if(t===void 0||!O(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>Bfe(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var WY,OY,jY=l(()=>{"use strict";WY=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OY=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${WY(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${WY(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var nx,MY,sx=l(()=>{"use strict";nx=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,MY=(e,t)=>{if(nx(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var NY,DY=l(()=>{"use strict";NY=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var hA,HY,FY=l(()=>{"use strict";x();sx();sx();DY();hA=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HY=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=he(t),o=_e(t),n=r.terminalStatusSuggestion==="passed"?"":NY(r,o),s=o-10,i=r.rows.map((c,d)=>{let p=t.modules[d],m=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,y=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",S=p===void 0?c.status:MY(p,o),A=p!==void 0&&nx(p,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':S==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':S==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':hA(S);return`<tr${y}><td>${hA(c.title)}</td><td>${hA(m)}</td><td>${c.tokens??"\u2014"}</td><td>${A}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${hA(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Ai,SA,ix=l(()=>{"use strict";Ai=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SA=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Ai(r.fileName)}</code> \u2014 ${Ai(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Ai(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Ai(i.name)}</strong> <code>.cursor/skills/${Ai(i.fileName)}/SKILL.md</code></p><p class="muted">${Ai(i.description)}</p><p>${Ai(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var Gfe,$Y,zY=l(()=>{"use strict";x();jY();FY();ix();Gfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$Y=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!O(e.status)||t.modules.length===0)return"";let r=HY(e),o=OY(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=he(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${Gfe(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${SA(e)}${a}${r}${o}</section>`}});var le,PA=l(()=>{"use strict";x();le={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var AA,ax=l(()=>{"use strict";AA=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var UY,BY=l(()=>{"use strict";PA();ax();UY=e=>{let t=AA({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:le.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Do,Vu=l(()=>{"use strict";Do=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var io,_A,lx=l(()=>{"use strict";x();qP();gY();tx();Gu();PY();BP();_Y();RY();ox();xY();zY();Ll();BY();Pt();Vu();io=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_A=e=>{let t=!O(e.status)&&e.status!=="wizard_paused"&&!no(e),r=yA(e),o=u4(NL(SY(e)),e),n=O(e.status)?"":EY(e),s=vY(e),i=$Y(e),a=mY(e),c=e.errorMessage===null?"":`<div class="alert-error">${io(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",p=t?" Working for <span data-elapsed>0s</span>.":"",m=e.wizard!==void 0&&e.wizard.phase==="complete"?he(e.wizard):null,g=m!==null&&m.totalModules>0&&m.passedModuleCount===m.totalModules,y=!t&&e.wizard!==void 0&&O(e.status)&&(e.wizard.phase==="complete"||he(e.wizard).passedModuleCount>0),S=y?g?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",A=y&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${io(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:!t&&e.wizard!==void 0&&e.wizard.modules.length>0&&O(e.status)?`<p class="sdlc-run-success-actions"><a class="btn btn-secondary" href="/prompt-optimizer?cycle=${io(e.id)}&amp;export=wizard-markdown">Download report (.md)</a></p>`:"",E=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${io(r.replyPreview)}</pre>`,I=r.detail.length===0&&A.length===0&&E.length===0||r.detail.length===0&&E.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${io(r.detail)}${p}</p>`}${E}</div>`,f=e.revisions.find(ot=>ot.roundNumber===e.currentRound),P=e.status==="improving"?yi(e):null,_=No(e),h=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),b=no(e)?AY({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:P?.promptText??f?.promptText??"",score:P?.score??f?.judgement?.score??null,reasons:P?.reasons??f?.judgement?.reasons??null,avoid:P?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:f?.run??null,minJudgeScore:h?1:0}):"",C=e.wizard!==void 0&&e.wizard.phase==="complete"&&O(e.status),H=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",D=e.wizard!==void 0&&!C&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?_e(e.wizard):e.passScore,w=H?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${VP(D)}</div>`:"",k=e.status==="failed"?UY({status:e.status,errorKind:e.errorKind}):null,W=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':O(e.status)?k!==null?`<span class="${k.badgeClass}">${k.badgeLabel}</span>`:C&&m!==null&&!g?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",v=t?d:y?g?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',j=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${io(Ft(Ce(e)))}</li>`:"",_>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${hi(_)} so far</li>`:""].filter(ot=>ot.length>0),N=j.length===0?"":`<ul class="sdlc-run-meta">${j.join("")}</ul>`,M=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,F=C?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,oe=C?"":w.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${F}</div>`:`<div class="sdlc-run-grid">${F}${w}</div>`,xe=bY(e),ut=e.wizard!==void 0&&O(e.status)&&e.revisions.every(ot=>ot.roundNumber===0&&(ot.judgement===void 0||ot.judgement===null)),Bt=xe.length===0||ut?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${xe}</div></section>`,Yi=`<p class="sdlc-run-goal" title="${io(e.goal.trim())}">${io(Do(e.goal))}</p>`,Ub=C?`${c}${i}${s}${b}${a}`:`${c}${oe}${b}${s}${a}`,xg='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',Tc=C?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${io(e.updatedAt)}" aria-busy="${t?"true":"false"}">${xg}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${W}</div>${Yi}<div class="sdlc-run-activity${S}"${y?' role="status"':""}><div class="sdlc-run-activity-icon">${v}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${io(r.title)}</h2>${I}${A}${Tc}</div></div>${N}${M}</header>${Ub}</section>${Bt}`}});var GY,KY=l(()=>{"use strict";x();Mu();GY=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Au({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:jn(e)}});var VY,qY=l(()=>{"use strict";x();Bu();VY=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Pu(t)?e:Pi({...e,wizard:{...t,gate:null}})}});var JY,YY=l(()=>{"use strict";x();ju();JY=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!_u(t.splitOptions))return e;let r=t.splitOptions[0];return On(e,r)}});var Kfe,_i,bA=l(()=>{"use strict";KY();qY();YY();$t();Kfe=e=>{let t=VY(e),r=GY(t);return JY(r)},_i=(e,t)=>{let r=Kfe(t);return r!==t?(Y(e,r),r):t}});var XY,Ho,qu=l(()=>{"use strict";x();XY=e=>Ht.indexOf(e),Ho=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||O(e.status)?Ht.length:t.gate!==null?XY(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?XY(t.phase):null}});var ZY,QY=l(()=>{"use strict";ZY=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var bi,e8,t8=l(()=>{"use strict";x();QY();bi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e8=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=ii(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${bi(ZY(o))}</pre></div>`:"",s=li(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=jo(t),a=s.map(c=>{let d=t.variables.find(S=>S.name===c),p=CP(c),m=i[c]??"",g=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${bi(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${bi(p)}">${bi(g)}</label>
        ${y}
        <input class="input" type="text" id="${bi(p)}" name="${bi(p)}" value="${bi(m)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var r8,o8=l(()=>{"use strict";r8={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var Ju,Vfe,Le,Nn=l(()=>{"use strict";o8();Wn();Ju=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vfe=e=>{let t=r8[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${Ju(t.title)}" aria-describedby="${r}" aria-expanded="false">${wt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${Ju(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${Ju(t.example)}</span></span></button>`},Le=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${Ju(r)}"`}>${Ju(e)}</span>${Vfe(t)}</span>`});var nr,n8,s8,i8=l(()=>{"use strict";x();Ou();PA();Nn();nr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n8=e=>{let t=e.costControls;if(t===void 0||El(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??kt({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${nr(le.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${nr(t.softWarnMessage??ci)}</p>`:"",d=rA({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${nr(le.estimateOverCeilingWarn)}</p>`:"",p=e.wizard?.modules.length??0,m=p>0?`<p class="muted">Step 4 will optimize ${p} module${p===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${nr(le.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${nr(le.confirmLede)}</p>
  ${m}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${nr(Rl)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${nr(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${nr(le.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${nr(le.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${nr(le.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${Le(le.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${Le(le.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${nr(le.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${nr(le.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},s8=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!El(r)}});var qfe,a8,l8=l(()=>{"use strict";Wn();qfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),a8=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${wt}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${qfe(t)}</pre></template>`}});var Yu,c8,d8=l(()=>{"use strict";x();Av();t8();Ev();ox();ix();Cv();i8();l8();Yu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),c8=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(s8(e))return n8(e);let n=_e(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?YJ(r):"",a=o==="evaluate"?SA(e):"",c=o==="evaluate"?Tl({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",p=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(D=>{let w=D.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',k=D.recommended?' <span class="sdlc-badge">Recommended</span>':"",W=r.selectedSplitOptionId===D.id||r.selectedSplitOptionId===null&&D.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Yu(D.id)}" required${W}> <strong>${Yu(D.title)}</strong>${w}${k}</label>${HP(e,D)}</li>`}).join("")}</ul>`:"",m=r.modules[r.currentModuleIndex],y=o==="optimize_modules"&&m?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",S=m?.title??"Module",A=m?.prompt??"",E=m?.status==="pending",I=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Yu(S)}</p>${E?e8({cycle:e,modulePrompt:A}):""}<p class="muted">Test run prompt preview: ${Yu(ai(A,jo(r)))}</p>${m?.statistics===null||m?.statistics===void 0?"":`<p class="muted">Module stats: best ${m.statistics.bestScore??"\u2014"} / \u2265${n} (round ${m.statistics.bestRound??"\u2014"}).</p>`}${Tl({cycle:e,interactive:!1,caption:E?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${S}\u201D (runner + judge).`})}`:"",f=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":E?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",P=Su(r),_=P===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${P}</p>`,h=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?a8(r.lastWriterParseFailureReply??""):"",b=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",C=t?.active===!0?" sdlc-wizard-gate-active":"",H=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${b}"`:"";return`<section class="card sdlc-wizard-gate${C}"${H}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${f}</p>
    ${h}
    ${_}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Yu(e.id)}">
    ${i}
    ${a}
    ${c}
    ${p}
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
    ${TY(e)}
  </section>`}});var Jfe,p8,u8=l(()=>{"use strict";x();KP();Jfe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),p8=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||O(e.status))return"";let r=(o,n)=>{let s=Cl(e,o);return`<h2 class="sdlc-wizard-active-head">${Jfe(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var cx,m8,g8,Dn,f8,Nl=l(()=>{"use strict";x();$t();cx=new Map,m8=e=>{let t=new AbortController;return cx.set(e,t),t.signal},g8=e=>{cx.delete(e)},Dn=e=>{cx.get(e)?.abort()},f8=(e,t)=>{let r=pe(e,t);return r===null||r.wizard!==void 0?!1:(O(r.status)||(Y(e,{...r,status:"stopped",errorMessage:oi,updatedAt:new Date().toISOString()}),Dn(t)),!0)}});var y8,h8,dx,S8,px=l(()=>{"use strict";x();qu();Nl();y8="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",h8=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Ht[r]??null},dx=(e,t)=>{let r=h8(t);if(r===null||e.wizard===void 0)return!1;let o=Ht.indexOf(r);if(o===-1)return!1;let n=Ho(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Ht.length)},S8=(e,t)=>{let r=h8(t);if(r===null||e.wizard===void 0||!dx(e,t))return e;Dn(e.id);let o=Ht.slice(Ht.indexOf(r)),n=mu(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var ux,P8,A8=l(()=>{"use strict";px();ux=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P8=(e,t)=>dx(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${ux(y8)}"><input type="hidden" name="cycleId" value="${ux(e.id)}"><input type="hidden" name="wizardStepId" value="${ux(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var Yfe,_8,Xfe,b8,R8=l(()=>{"use strict";x();qu();d8();u8();A8();$P();Yfe={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},_8=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xfe=(e,t,r)=>{let o=P8(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${_8(t)}">
  <summary class="sdlc-wizard-accordion-summary">${_8(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Il(e,t)}</div>
</details>`},b8=e=>{let t=e.wizard;if(t===void 0)return"";let r=Ho(e);if(r===null)return"";let o=Ht.slice(0,r).map((i,a)=>Xfe(e,`wizard-${a+1}`,Yfe[i])),n=t.gate!==null?c8(e,{active:!0}):p8(e),s=r>=Ht.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var RA,mx=l(()=>{"use strict";R8();Iv();x();RA=e=>{if(e===null||e.wizard!==void 0&&O(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=b8(e),r=t4(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Zfe,gx,k8=l(()=>{"use strict";x();Ue();Pt();Si();Zfe=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},gx=async(e,t,r)=>{if(!Zfe(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===$)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=qL({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await Et({writerAgent:e.judgeModel,prompt:n,workingDirectory:Ce(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=YL(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Xu,kA,w8,fx,E8,T8,I8,wA,yx=l(()=>{"use strict";Xu=u(require("node:fs")),kA=u(require("node:path")),w8=e=>kA.default.join(kA.default.dirname(e),"prompt-optimizer-writer-ready.json"),fx=e=>{let t=w8(e);if(!Xu.default.existsSync(t))return{};try{let r=JSON.parse(Xu.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},E8=(e,t)=>{Xu.default.mkdirSync(kA.default.dirname(e),{recursive:!0}),Xu.default.writeFileSync(w8(e),`${JSON.stringify(t,null,2)}
`)},T8=(e,t)=>fx(e)[t]?.message??null,I8=(e,t,r)=>{E8(e,{...fx(e),[t]:{message:r}})},wA=(e,t)=>{let r=fx(e);r[t]!==void 0&&E8(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var hx,EA,TA,C8,Be,Ri=l(()=>{"use strict";x();oA();Bu();k8();Gu();Nl();yx();bA();$t();hx=new Set,EA={atMs:0,ids:[]},TA=async()=>{if(Date.now()-EA.atMs<3e4)return EA.ids;let e=await Rr({commands:Ae({})});return EA.atMs=Date.now(),EA.ids=e.installedWriterIds,e.installedWriterIds},C8=async(e,t,r)=>{let o=pe(e,t);if(o===null||r.aborted)return;let n=_i(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(O(n.status)&&!s||n.status==="wizard_paused"||no(n))return;if(s){let c=await gx(n,r,d=>{wA(e,d)});Y(e,c);return}let i=await uY(n,c=>{wA(e,c)},r,c=>{pe(e,t)?.status==="stopped"||r.aborted||Y(e,c)});if(!(pe(e,t)?.status==="stopped"||r.aborted)){if(Y(e,i),O(i.status)){let c=await gx(i,r,d=>{wA(e,d)});Y(e,c);return}await C8(e,t,r)}},Be=(e,t)=>{if(hx.has(t))return;let r=pe(e,t);if(r===null)return;let o=_i(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(O(o.status)&&!n||o.status==="wizard_paused"||no(o))return;hx.add(t);let s=m8(t);C8(e,t,s).finally(()=>{hx.delete(t),g8(t)})}});var Hn,Zu=l(()=>{"use strict";lx();bA();mx();Ri();Hn=(e,t)=>{let r=_i(e,t);return Be(e,r.id),`${_A(r)}${RA(r)}`}});var L8,v8,x8=l(()=>{"use strict";L8=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,v8=e=>e!==null&&e>0});var Qfe,eye,tye,W8,O8=l(()=>{"use strict";x();Bu();mA();ju();Mu();Nl();zP();zP();Qfe=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),eye=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=Te(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},tye=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=he(o);return jl({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},W8=(e,t)=>{if(!xu(e,t))return e;Dn(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Pi({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return jn(eye(r));if(t==="wizard-3"){let n=o.splitOptions[0]??Qfe(o.templatedPrompt);return On(r,n)}return t==="wizard-4"?tye(r):e}});var IA,j8,Sx=l(()=>{"use strict";x();mA();Nl();IA=e=>(Dn(e.id),{...jl(e,"stopped"),errorMessage:AL}),j8=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;Dn(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var rye,M8,N8,D8=l(()=>{"use strict";x();Bu();mA();ju();Mu();Zu();$t();Ri();x8();px();O8();Sx();rye="Pick a revision scored above 0 before continuing to Separate.",M8=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),N8=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=pe(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=pe(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Hn(e.storePath,d))};if(o==="wizard-stop-all"){let c=IA(s);return Y(e.storePath,c),Be(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=j8(s);return Y(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=S8(s,c);return Y(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=W8(s,c);return Y(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&Be(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let p=t.get("wizardStepInstructions")?.trim()??"",m=zL(s.wizard,d,c);m=mu(m,d),m={...m,pendingStepInstructions:p};let g={...s,status:"judging",errorMessage:null,wizard:{...m,gate:null},updatedAt:new Date().toISOString()};return Y(e.storePath,g),Be(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(g=>g.step==="generalize"),m=(s.errorMessage?.trim().length??0)>0&&!d?M8(s):Pi({...s,wizard:{...s.wizard,gate:null}});return Y(e.storePath,m),Be(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),p=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),m=L8(s,p??-1);if(!v8(m)){let y={...s,errorMessage:rye,updatedAt:new Date().toISOString()};return Y(e.storePath,y),a(n),!0}let g=jn({...s,wizard:{...s.wizard,evaluateSelectedRound:p}});return Y(e.storePath,g),Be(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let y=M8(s);return Y(e.storePath,y),Be(e.storePath,n),a(n),!0}let p=t.get("wizardSplitOptionId")?.trim()??"",m=s.wizard.splitOptions.find(y=>y.id===p);if(m===void 0){let y={...s,errorMessage:p.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return Y(e.storePath,y),a(n),!0}let g=On(s,m);return Y(e.storePath,g),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,p=d.currentModuleIndex,m=d.modules[p];if(m===void 0)return a(n),!0;if(!El(s.costControls)){let E=t.get("confirmedTokenBudget")?.trim()??"",I=t.get("confirmedMaxSpendUsd")?.trim()??"";if(E.length===0){let P={...s,errorMessage:Rl,updatedAt:new Date().toISOString()};return Y(e.storePath,P),a(n),!0}let f=eo({existing:s.costControls,confirmedTokenBudget:Number(E),confirmedMaxSpendUsd:I.length===0?null:Number(I),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!f.ok){let P={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return Y(e.storePath,P),a(n),!0}s={...s,costControls:f.costControls,errorMessage:null,updatedAt:new Date().toISOString()},Y(e.storePath,s)}let g=av({wizard:d,modulePrompt:m.prompt,posted:t});if(!g.ok){let E={...s,errorMessage:g.errorMessage,updatedAt:new Date().toISOString()};return Y(e.storePath,E),a(n),!0}let y={...d,parameterValues:g.parameterValues};if(m.status==="pending"){let E=pY({...s,wizard:{...y,gate:null}},p);return Y(e.storePath,E),Be(e.storePath,n),a(n),!0}let S=p+1;if(S>=d.modules.length){let E=he(y),I=jl({...s,wizard:y},E.terminalStatusSuggestion);return Y(e.storePath,I),Be(e.storePath,n),a(n),!0}let A={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...y,gate:"optimize_modules",currentModuleIndex:S},updatedAt:new Date().toISOString()};return Y(e.storePath,A),a(n),!0}}return a(n),!0}});var oye,H8,nye,Px,sye,F8,$8=l(()=>{"use strict";Ue();Nl();Sx();Kv();iA();Gu();$t();oye="Add a score from 0 to 100 and the reason for it.",H8="Add a score from 1 to 100 and the reason for it.",nye="Write the next prompt.",Px="This step is not waiting for you.",sye=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},F8=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=pe(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(Y(e.storePath,IA(a)),{kind:"saved",cycleId:i}):f8(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=pe(e.storePath,r);if(o===null||!no(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Px};if(t==="manual-judge"){if(o.judgeModel!==$)return{kind:"invalid",cycle:o,errorMessage:Px};let i=sye(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?H8:oye};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:H8};let d=o.revisions.find(m=>m.roundNumber===o.currentRound)?.run?.tokenReview??"",p=aA(Fu(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return Y(e.storePath,p),{kind:"saved",cycleId:o.id}}if(o.improverModel!==$)return{kind:"invalid",cycle:o,errorMessage:Px};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:nye};let s=sA(o,n);return Y(e.storePath,s),{kind:"saved",cycleId:o.id}}});var z8,U8=l(()=>{"use strict";z8=`<script>
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
</script>`});var B8,G8=l(()=>{"use strict";B8=`<script>
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
</script>`});var K8,V8=l(()=>{"use strict";K8=`<script>
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
</script>`});var q8,J8=l(()=>{"use strict";q8=`<script>
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
</script>`});var Y8,X8=l(()=>{"use strict";x();Pt();Y8=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Ft(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(_e(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!O(t.status)}}});var Z8,Q8=l(()=>{"use strict";Z8=`<script>
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
</script>`});var e6,t6=l(()=>{"use strict";x();qu();gA();e6=e=>{let t=Ml(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:O(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Ho(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=he(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=he(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return O(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var r6,o6=l(()=>{"use strict";r6=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Fo,iye,aye,n6,s6=l(()=>{"use strict";t6();o6();Vu();Fo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iye=e=>e.wizard===void 0?"legacy":"wizard",aye=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Fo(t)}">`,o=e6(e),n=r6(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Fo(o.badgeClass)}">${Fo(o.badgeLabel)}</span>`,p=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Fo(e.id)}">Resume</a>`:"",m=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Fo(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${iye(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Fo(e.id)}">${Fo(Do(e.goal))}</a><p class="muted">${Fo(a)}</p></div></div><div class="sdlc-history-row-actions">${p}${m}</div></li>`},n6=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>aye(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Fo(s)}</summary>${i}</details>`:i}});var Ax,CA,i6,lye,cye,Qu,a6,LA=l(()=>{"use strict";Ax=u(require("node:fs")),CA=u(require("node:path"));Pt();i6=/^[a-z0-9-]+$/,lye=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},cye=(e,t)=>{if(!i6.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let p=/^(name|description):\s*(.*)$/.exec(d.trim());if(p===null)continue;let m=lye(p[2]??"");p[1]==="name"&&m.length>0&&(o=m),p[1]==="description"&&(n=m)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},Qu=e=>{let t=Mo(e);if(!t.ok)return[];let r=CA.default.resolve(t.path,".cursor","skills"),o=[];try{o=Ax.default.readdirSync(r)}catch{return[]}return o.filter(n=>i6.test(n)).flatMap(n=>{let s=CA.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${CA.default.sep}`))return[];try{let i=cye(Ax.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},a6=(e,t)=>Qu(e).find(r=>r.fileName===t)??null});var l6,dye,c6,d6,p6=l(()=>{"use strict";Nn();l6=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dye=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),c6=e=>{if(e.length===0)return`<div class="field">${Le("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${l6(r.fileName)}">${l6(r.fileName)}</option>`).join("");return`<div class="field">${Le("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${dye(e)}</script>`},d6=`<script>
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
</script>`});var It,u6,m6=l(()=>{"use strict";x();PA();Ou();Nn();It=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u6=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=It(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=di({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??er(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),m=rA({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",g=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${It(le.knobsSectionTitle)}</p>
  <p class="muted">${It(le.knobsSectionLede)}</p>
  <div class="field">
    ${Le(le.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${Le(le.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${It(le.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${It(le.earlyStopLabel)}</span>
    </label>
    <p class="muted">${It(le.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${It(le.estimateSectionTitle)}</p>
    <p class="muted">${It(le.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${It(le.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${It(le.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${It(le.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${It(g)}">$${c.toFixed(4)} / 1k \xB7 ${It(g)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${m}>${It(le.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var dt,g6,f6,pye,y6,h6,S6,P6=l(()=>{"use strict";x();tx();Ue();Vu();qu();dt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),g6=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",f6=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,pye=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},y6=e=>e===$?"You":be(e),h6=e=>{let t=pye(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":be(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${dt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${dt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${dt(y6(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${dt(y6(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${dt(r)}</dd></div>
    </dl>
  </details>`},S6=e=>{let t=e.wizard;if(t===void 0)return"";let r=Do(e.goal),o=e.status==="wizard_paused",n=!O(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let p=yA(e),m=f6(t),g=m===null?"":g6(m),y=Ho(e),S=g.length===0?"":y===null||y>=4?` <strong>${dt(g)}</strong>`:` <strong>${dt(g)}</strong> (step ${y+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${dt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${dt(p.title)}${S}</p>
    <p class="muted">${dt(p.detail)}</p>
    <div class="actions">
      ${h6(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${dt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=f6(t),i=s===null?"Wizard":g6(s),a=Ho(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${dt(r)}</h2>
    <p class="lede">Paused at <strong>${dt(i)}</strong>${dt(c)} (last updated ${dt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${h6(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${dt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var em,A6,_6=l(()=>{"use strict";Nn();em=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),A6=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${em(n.id)}"${n.id===e.runner?" selected":""}>${em(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${em(e.runner)}">Checking ${em(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Le("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Le("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${em(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var b6,R6=l(()=>{"use strict";b6=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var Dl,k6,w6,E6,T6,I6=l(()=>{"use strict";Nn();Dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k6=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${Dl(c.id)}"${c.id===r?" selected":""}>${Dl(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${Dl(n)}</option>`;return`<div class="field">${Le(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},w6=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${Dl(t)}">Checking ${Dl(o)}\u2026</p>`},E6=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Le(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${Dl(r)}</textarea><span class="muted">${o}</span></div></details>`,T6=e=>{let t=`<div class="sdlc-writer">${k6("judge","Judge",e.judge,e.writers,"I'll score it")}${w6("judge",e.judge,e.writers)}${E6("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${k6("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${w6("improver",e.improver,e.writers)}${E6("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var C6,L6=l(()=>{"use strict";C6=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var tm,uye,vA,_x=l(()=>{"use strict";L6();tm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uye=(e,t)=>{let r=tm(e.goal),o=tm(e.label);return t===void 0?`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${r}" title="${r}">${o}</button>`:`<button type="submit" class="sdlc-goal-preset-chip" name="${tm(t)}" value="${r}" title="${r}">${o}</button>`},vA=(e={})=>{let t=e.presets??C6,r=e.groupLabel??"Common goals",o=e.leadLabel??"Quick fill:",n=t.map(s=>uye(s,e.submitName)).join("");return`<div class="sdlc-goal-presets" role="group" aria-label="${tm(r)}"><span class="sdlc-goal-presets-label muted">${tm(o)}</span>${n}</div>`}});var rm,mye,gye,bx,v6=l(()=>{"use strict";x();Nn();rm=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mye=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},gye=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,bx=e=>{let t=mye(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=lu(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${Le(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${rm(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${rm(e.inputId)}" class="sdlc-pass-range" type="range" name="${rm(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${rm(a)}"><span class="sdlc-pass-mark" style="left:${gye(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${rm(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var yye,Rx,$o,kx,wx=l(()=>{"use strict";Gu();lx();U8();G8();qP();V8();J8();X8();Q8();s6();LA();p6();Nn();mx();m6();P6();Vu();_6();R6();I6();x();_x();v6();yye=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,Rx='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',$o=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kx=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${$o(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${$o(e.skillNotice??"")}</div>`,o=`${m4}${g4}`,n=e.resumableWizardCycle??null,s=n===null?"":S6(n),i=RA(e.cycle),a=e.cycle===null?"":_A(e.cycle),c=e.cycle!==null&&no(e.cycle),d=Y8(e),p=yye(d.goal,d.prompt,e.canRun),m=T6({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),g=A6({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y=`${bx({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${bx({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,S=u6({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),A=FL,E=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",I=e.cycle!==null&&O(e.cycle.status),f=d.running&&!I,P=I||f?"":" open",_=f?" sdlc-compose-run-focus":"",b=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${I?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,C=I?(()=>{let N=e.cycle!==null?Do(e.cycle.goal):Do(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${$o(N)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${b}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${b}</summary>`,H=I?" sdlc-compose-viewing-finished":"",D=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",w=c?"waiting":d.running?"running":"idle",k=d.running&&!c?' aria-busy="true"':"",W=`<section class="card sdlc-compose${H}${_}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${P}>
        ${C}
        <div class="sdlc-compose-details-body">
      <p class="lede">${A} ${$o(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${E}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${Le("Folder","folder")}
            <input class="input" type="text" name="folder" value="${$o(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${c6(Qu(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${Rx}
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
            ${vA()}
            <textarea class="input textarea" name="goal" rows="4" required>${$o(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Le("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${$o(d.prompt)}</textarea>
          </div>
          ${y}
          ${S}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Rx}
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
        ${b6()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${Rx}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${$o(d.passScore)}; Step 4 pass \u2265 ${$o(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${w}" data-can-run="${p?"true":"false"}"${k}${d.running?" disabled":""}>${D}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,v=e.history.length>0?Z8:"",j=`${""}${q8}${z8}${B8}${K8}${d6}${v}`;return`${t}${r}${W}${s}${a}${i}${o}${n6(e.history,e.cycle?.id??null)}${j}`}});var om,Ex=l(()=>{"use strict";wx();om=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:kx(t)}))}});var x6,W6=l(()=>{"use strict";$8();Zu();Ex();$t();Ri();x6=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:F8({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=pe(e.storePath,o.cycleId);return Be(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Hn(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await om(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:ro(e.storePath),resumableWizardCycle:null}),!0)}});var O6,xA,Tx=l(()=>{"use strict";x();O6=u(require("node:os")),xA=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??O6.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??Qt()}}});var j6,Hl,Ix,M6,N6,nm=l(()=>{"use strict";x();Ue();Ov();j6=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Hl=e=>{let t=$J(e),r=mi(e).map(s=>({id:s,label:MP[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},Ix=(e,t,r)=>t===$||t!==null&&e.writers.some(o=>o.id===t)?t:r,M6=(e,t,r,o=null)=>({judge:Ix(e,t,e.judge),improver:Ix(e,r,e.improver),runner:Ix(e,o,e.runner)}),N6=e=>e===JP?{goal:YP,prompt:XP}:{goal:"",prompt:""}});var Cx,D6=l(()=>{"use strict";Cx=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var H6,hye,F6,$6,z6,U6=l(()=>{"use strict";x();H6=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},hye=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},F6=(e,t)=>e.has("earlyStop")?!0:t!=="run",$6=e=>{let t=H6(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=hye(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=H6(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},z6=e=>Qt(e)});var B6,G6,WA,Lx=l(()=>{"use strict";x();Ue();Pt();nm();D6();U6();B6=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=Cx(o);return n.ok?String(n.passScore):String(r)},G6=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return Cx(n)},WA=e=>{let t=M6(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=B6(e.posted,"passScore",70),o=B6(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),p=e.posted?.get("maxSpendUsd")?.trim()??"",m=e.posted?.get("intent")??"",g=e.posted===null?!0:F6(e.posted,m),y=(C,H)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:C,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:H,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:p,earlyStop:g});if(e.posted===null)return y(e.defaultFolder??gi,null);let S=e.posted.get("folder")??gi;if(e.posted.get("intent")==="choose-folder"){let C=e.pickFolder();return y(C===null?S:Ft(C),null)}if((e.posted.get("intent")??"")!=="run")return y(S,null);let E=j6(e.goal,e.prompt);if(E!==null)return y(S,E);let I=G6(e.posted,"passScore",r);if(!I.ok)return y(S,I.errorMessage);let f=G6(e.posted,"modulePassScore",o);if(!f.ok)return y(S,f.errorMessage);let P=zJ(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(P===null)return y(S,"Choose a judge and an improver.");let _=Mo(S);if(!_.ok)return y(S,_.errorMessage);let h=UJ(e.installedIds,c,P.judge);if(h===null)return y(S,"Choose a runner for wizard step 4.");let b=$6({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return b.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:P.judge,improver:P.improver,workingDirectory:_.path,passScore:I.passScore,modulePassScore:f.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:h,runnerInstructions:a,costControls:z6(b.knobs)}:y(S,b.errorMessage)}});var Fl,jA,Sye,vx,K6,OA,V6,Pye,q6,xx,Aye,_ye,bye,Wx,J6,Y6,X6=l(()=>{"use strict";Fl=u(require("node:fs")),jA=u(require("node:path"));Ue();Pt();Sye=["remember","choose-folder","run"],vx=()=>({folder:gi,judge:"",improver:"",runner:""}),K6=e=>jA.default.join(jA.default.dirname(e),"prompt-optimizer-preferences.json"),OA=e=>typeof e=="string"?e:"",V6=e=>{let t=K6(e);if(!Fl.default.existsSync(t))return vx();try{let r=JSON.parse(Fl.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return vx();let o=r,n=OA(o.folder).trim();return{folder:n.length===0?gi:n,judge:OA(o.judge),improver:OA(o.improver),runner:OA(o.runner)}}catch{return vx()}},Pye=(e,t)=>{let r=K6(e);Fl.default.mkdirSync(jA.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Fl.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Fl.default.renameSync(o,r)},q6=(e,t)=>e===$||mi(t).some(r=>r===e),xx=(e,t,r)=>e===null?t:e.length===0?"":q6(e,r)?e:t,Aye=(e,t)=>{if(e===null)return t;let r=Mo(e);return r.ok?r.display:t},_ye=e=>{let t=V6(e.storePath),r={folder:Aye(e.folder,t.folder),judge:xx(e.judge,t.judge,e.installedIds),improver:xx(e.improver,t.improver,e.installedIds),runner:xx(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Pye(e.storePath,r)},bye=e=>{let t=Mo(e);return t.ok?t.display:gi},Wx=(e,t)=>q6(e,t)?e:"",J6=e=>{let t=V6(e.storePath);return{selection:{...e.selection,judge:Wx(t.judge,e.installedIds)||e.selection.judge,improver:Wx(t.improver,e.installedIds)||e.selection.improver,runner:Wx(t.runner,e.installedIds)||e.selection.runner},defaultFolder:bye(t.folder)}},Y6=e=>{let t=e.posted.get("intent")??"";if(!Sye.includes(t))return;let r=e.posted.get("folder");_ye({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var Z6,Rye,kye,Ox,wye,MA,NA=l(()=>{"use strict";Z6=u(require("node:os"));Ue();yx();Si();Rye="Reply with the single word ok. Do not use tools.",kye=45e3,Ox=async(e,t)=>{if(t===$)return{ok:!0,message:"You will do this step."};let r=T8(e,t);if(r!==null)return{ok:!0,message:r};let o=await Et({writerAgent:t,prompt:Rye,workingDirectory:Z6.default.tmpdir(),timeoutMs:kye});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${be(t)} is ready.`;return I8(e,t,n),{ok:!0,message:n}},wye=e=>[...new Set(e.filter(t=>t.length>0))],MA=async(e,t,r,o)=>{for(let n of wye([t,r,o??""])){let s=await Ox(e,n);if(!s.ok)return s.message}return null}});var jx,Q6=l(()=>{"use strict";x();jx=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!O(r.status)&&!(t!==null&&r.id===t))return r;return null}});var e3,t3=l(()=>{"use strict";St();x();Ou();Zu();Tx();Lx();Ex();$t();Pt();X6();LA();NA();Q6();bA();Ri();e3=async e=>{let t=e.posted===null?J6({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=WA({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>wn("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(Y6({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Ft(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await MA(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await om(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Ft(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:ro(e.route.storePath),resumableWizardCycle:jx(ro(e.route.storePath),null)});return}if(r.kind==="start"){let s=a6(r.workingDirectory,r.sourceSkillFile),i=tA(wl({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=xA({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:ZL({...uu(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(Y(e.route.storePath,a),Be(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(Hn(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:pe(e.route.storePath,e.cycleId);n!==null&&(n=_i(e.route.storePath,n),Be(e.route.storePath,n.id)),await om(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:ro(e.route.storePath),resumableWizardCycle:jx(ro(e.route.storePath),n?.id??null)})}});var r3,o3=l(()=>{"use strict";$t();r3=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";_4(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var n3,s3=l(()=>{"use strict";n3=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var i3,a3=l(()=>{"use strict";I4();D8();W6();t3();o3();nm();s3();Ri();i3=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await TA(),o=Hl(r),n=e.method==="POST"?n3(e.request.headers["content-type"],await e.readBody(e.request)):null;if(N8({posted:n,storePath:e.storePath,response:e.response})||await x6(e,n,o))return;let s=N6(t.searchParams.get("example")),i=r3({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=T4({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await e3({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:E4(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var Eye,l3,c3=l(()=>{"use strict";x();$t();Eye=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",l3=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=pe(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!O(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=QL({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${Eye(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var d3,p3=l(()=>{"use strict";Zu();$t();d3=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:pe(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Hn(e.storePath,o)),!0}});var Tye,u3,m3=l(()=>{"use strict";Ue();NA();Tye=["claude-cli","codex","cursor","antigravity"],u3=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===$||Tye.includes(t)?await Ox(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var g3,f3=l(()=>{"use strict";x();g3=e=>{let t=e?.socket?.localPort;return typeof t=="number"&&Number.isInteger(t)&&t>0?`http://127.0.0.1:${t}${_P}`:void 0}});var y3,h3=l(()=>{"use strict";x();y3=(e,t=DL)=>{let r=e.length===1?e[0].id:null;return{ok:!0,url:t,page:du,context:Al,installedWriters:e,post:{method:"POST",url:t,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this computer",judge:r??"installed writer id",improver:r??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${t}?cycle=<cycleId> until done is true.`,writers:r===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${r} is installed. Omit judge and improver and both roles use it.`}}});var DA,S3=l(()=>{"use strict";x();ax();Ll();DA=e=>{let t=e.revisions[e.revisions.length-1]??null,r=Te(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=O(e.status),n=e.errorKind??null,s=AA({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:No(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Al,page:`${du}?cycle=${encodeURIComponent(e.id)}`}}});var re,Iye,P3,A3,_3=l(()=>{"use strict";re=u(na());x();Iye=(0,re.isType)({goal:re.isString,prompt:re.isString,workingDirectory:re.isString,judge:(0,re.isUndefinedOr)(re.isString),improver:(0,re.isUndefinedOr)(re.isString),passScore:(0,re.isUndefinedOr)(re.isNumber),maxRounds:(0,re.isUndefinedOr)(re.isNumber),maxTrials:(0,re.isUndefinedOr)(re.isNumber),maxSpendUsd:(0,re.isUndefinedOr)(re.isNumber),earlyStop:(0,re.isUndefinedOr)(re.isBoolean),earlyStopFlatRounds:(0,re.isUndefinedOr)(re.isNumber),confirmedTokenBudget:(0,re.isUndefinedOr)(re.isNumber),confirmedMaxSpendUsd:(0,re.isUndefinedOr)(re.isNumber),rateUsdPer1kTokens:(0,re.isUndefinedOr)(re.isNumber)}),P3=e=>{let t=e?.trim()??"";return t.length===0?null:t},A3=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return Iye(t)?t.workingDirectory.trim().length===0?{ok:!1,error:bP}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:P3(t.judge),improver:P3(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:bP}}});var zo,Cye,b3,R3,k3=l(()=>{"use strict";x();zo=u(na()),Cye=(0,zo.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:zo.isNumber,confirmedMaxSpendUsd:(0,zo.isUndefinedOr)(zo.isNumber),rateUsdPer1kTokens:(0,zo.isUndefinedOr)(zo.isNumber)}),b3=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:Cye(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},R3=(e,t)=>{let r=eo({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var Lye,w3,E3=l(()=>{"use strict";x();Ue();Lx();nm();Lye=e=>e.map(t=>t.id).join(", "),w3=e=>{let t=Hl(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===$||n===$)return{ok:!1,error:HL,installedWriters:t.writers};if(o===null||n===null){let a=Lye(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this computer.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=WA({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var vye,T3,I3=l(()=>{"use strict";x();Tx();h3();S3();nm();_3();k3();E3();$t();vye=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},T3=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let p=pe(e.storePath,t);return p===null?{status:404,body:{ok:!1,error:"That run is not on this computer."}}:{status:200,body:DA(p)}}let r=await e.handlers.readInstalledIds(),o=Hl(r);if(e.method==="GET")return{status:200,body:y3(o.writers,e.agentUrl)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let p=b3(e.rawBody);if(p.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(p.kind==="invalid")return{status:400,body:{ok:!1,error:p.error}};let m=pe(e.storePath,t);if(m===null)return{status:404,body:{ok:!1,error:"That run is not on this computer."}};let g=R3(m,p.body);return g.ok?(Y(e.storePath,g.cycle),{status:200,body:DA(g.cycle)}):{status:400,body:{ok:!1,error:g.error}}}let n=vye(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let p=di({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:p.targetTokenBudget,proposedTokenBudget:p.targetTokenBudget,estimatedSpendUsd:p.estimatedSpendUsd,rateUsdPer1kTokens:p.rateUsdPer1kTokens??null,proposalStub:p.stub===!0,confirmationRequired:!0}}}let s=A3(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=w3({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=wl({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:kt({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let p=eo({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!p.ok)return{status:400,body:{ok:!1,error:p.errorMessage}};c=p.costControls}let d=xA({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:uu(i.prompt),runnerModel:i.runner,costControls:c});return Y(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:DA(d)}}});var C3,L3=l(()=>{"use strict";Ri();NA();f3();I3();C3=async e=>{let t=await T3({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,agentUrl:g3(e.request),handlers:{readInstalledIds:TA,readWritersReady:MA,startCycle:Be}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var x3,xye,Wye,v3,Oye,W3,O3=l(()=>{"use strict";x3=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],xye=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},Wye=e=>{let t={};for(let n of e)for(let s of new Set(x3(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},v3=(e,t)=>{let r=xye(x3(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},Oye=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},W3=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=Wye(e.map(i=>i.text)),s=v3(o,n);return e.map(i=>({id:i.id,score:Oye(s,v3(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var Mx,jye,Mye,j3,Nye,Dye,Hye,Fye,Nx,Dx=l(()=>{"use strict";Mx=u(require("node:path"));Pt();O3();LA();jye=5,Mye=20,j3=280,Nye=e=>[e.name,e.description,e.promptText].join(`
`),Dye=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=j3?t:`${t.slice(0,j3-3)}...`},Hye=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),Fye=e=>e===void 0||!Number.isFinite(e)?jye:Math.min(Mye,Math.max(1,Math.floor(e))),Nx=e=>{let t=e.query.trim(),r=Fye(e.limit),o=Mo(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=Qu(o.path),s=W3(n.map(d=>({id:d.fileName,text:Nye(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=Mx.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let p=i.get(d.id);return p===void 0?[]:[{skillId:p.fileName,name:p.name,description:p.description,score:d.score,sourcePath:Mx.default.join(a,p.fileName,"SKILL.md"),excerpt:Dye(p),source:"filesystem"}]});return{query:t,hits:c,context:Hye(c)}}});var M3,N3=l(()=>{"use strict";Dx();M3=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:Nx({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var D3,H3=l(()=>{"use strict";N3();D3=async e=>{let t=M3({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var $ye,Hx,F3=l(()=>{"use strict";Mv();a3();c3();p3();m3();L3();H3();$ye=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},Hx=async e=>{let t=$ye(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await C3(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await D3(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:jv()})),!0):(await u3({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||l3({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||d3({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await i3(e),!0)}});var Fx,zye,Uye,sm,HA=l(()=>{"use strict";Fx=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zye=e=>!Fx(e)||typeof e.ruleId!="string"||typeof e.title!="string"||typeof e.source!="string"||typeof e.active!="boolean"||typeof e.hitCount!="number"||!Number.isFinite(e.hitCount)||e.lastHitAt!==null&&typeof e.lastHitAt!="string"?null:{ruleId:e.ruleId,title:e.title,source:e.source,active:e.active,hitCount:e.hitCount,lastHitAt:e.lastHitAt},Uye=e=>!Fx(e)||typeof e.ruleIdA!="string"||typeof e.ruleIdB!="string"||e.reason!=="duplicate"&&e.reason!=="overlap"||typeof e.score!="number"||!Number.isFinite(e.score)?null:{ruleIdA:e.ruleIdA,ruleIdB:e.ruleIdB,reason:e.reason,score:e.score},sm=e=>{if(!Fx(e)||e.ok!==!0||typeof e.projectId!="string"||e.windowDays!==null||!Array.isArray(e.rules)||!Array.isArray(e.overlaps))return null;let t=[];for(let o of e.rules){let n=zye(o);if(n===null)return null;t.push(n)}let r=[];for(let o of e.overlaps){let n=Uye(o);if(n===null)return null;r.push(n)}return{ok:!0,projectId:e.projectId,windowDays:null,rules:t,overlaps:r}}});var Bye,Gye,$x,zx=l(()=>{"use strict";HA();Bye=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Gye=e=>sm({ok:!0,projectId:"x",windowDays:null,rules:[e],overlaps:[]})?.rules[0]??null,$x=e=>{if(!Bye(e)||e.ok!==!0||typeof e.projectId!="string"||typeof e.changed!="boolean")return null;let t=Gye(e.rule);return t===null?null:{ok:!0,projectId:e.projectId,rule:t,changed:e.changed}}});var Kye,$3,Ux,z3=l(()=>{"use strict";HA();Kye=1e4,$3=(e,t,r=30)=>{let o=new URL(`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/usage`);return o.searchParams.set("days",String(r)),o.toString()},Ux=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"not_connected"};let r=e.fetchImpl??fetch;try{let o=await r($3(e.appOrigin,e.projectId,e.days??30),{method:"GET",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(Kye)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=sm(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var Vye,U3,Bx,B3=l(()=>{"use strict";zx();Vye=15e3,U3=(e,t,r,o)=>`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/${encodeURIComponent(r)}/${o}`,Bx=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"unauthorized"};let r=e.fetchImpl??fetch;try{let o=await r(U3(e.appOrigin,e.projectId,e.ruleId,e.action),{method:"POST",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(Vye)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(o.status===404)return{ok:!1,reason:"not_found"};if(o.status===409)return{ok:!1,reason:"limit_exceeded"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=$x(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var G,Uo=l(()=>{"use strict";gt();G={heading:"Compare rules",intro:"See which rules kick in for a prompt and what they add to each request.",groupLabel:"Sample prompts",lead:"Try a sample:",customLabel:"Or write your own prompt",customHint:"Use a prompt that has nothing to do with this project. Any rule that still kicks in is probably in the wrong place.",button:"Compare",emptyPrompt:"Pick a sample prompt or write your own.",noRules:"No rules kick in for this prompt.",oneRule:"1 rule kicks in for this prompt:",nRules:e=>`${e} rules kick in for this prompt:`,tokenLine:(e,t)=>`Prompt alone: ${e} tokens. Rules add ${t} tokens.`,costLine:e=>`About ${e} more per request.`,rulesUnavailable:"Rules for this project aren't available right now.",ruleUseHeading:"Rule use",ruleUseIntro:"Rules marked below may be safe to drop. You decide. Nothing is removed for you.",usedOnce:"Used 1 time",usedN:e=>`Used ${e} times`,neverUsed:"Never used",notUsedInDays:e=>`Not used in ${e} days`,sameAs:e=>`Same as ${e}`,overlapsWith:e=>`Overlaps with ${e}`,emptyRules:"No rules to check yet.",usageError:"Couldn't load rule usage. Try again.",tryAgain:"Try again",connectComputer:"Connect this computer to AgentWitch to see rule use.",ownerOnlyUsage:"Only the project owner can see rule use.",drop:"Drop",restore:"Restore",undo:"Undo",dropped:e=>`Dropped "${e}".`,ownerOnlyDrop:"Only the project owner can drop rules.",dropFailed:"Couldn't drop the rule. Try again.",restoreFailed:"Couldn't restore the rule. Try again.",limitReached:`Limit reached: ${64} active pitfalls. Retire one to add another.`}});var qye,Jye,Gx,Kx,Vx=l(()=>{"use strict";Uo();qye=1440*60*1e3,Jye=(e,t)=>{let r=Date.parse(e);return Number.isFinite(r)?Math.max(0,Math.floor((t-r)/qye)):null},Gx=e=>{let t=e.nowMs??Date.now(),r=e.staleAfterDays??30,o=[];if(e.rule.hitCount===0)o.push({kind:"never_used"});else if(e.rule.lastHitAt!==null){let n=Jye(e.rule.lastHitAt,t);n!==null&&n>r&&o.push({kind:"stale",days:n})}for(let n of e.overlaps){let s=n.ruleIdA===e.rule.ruleId?n.ruleIdB:n.ruleIdB===e.rule.ruleId?n.ruleIdA:null;if(s===null)continue;let a=e.rulesById.get(s)?.title??s;n.reason==="duplicate"?o.push({kind:"same_as",ruleTitle:a}):o.push({kind:"overlaps",ruleTitle:a})}return o},Kx=e=>{switch(e.kind){case"never_used":return G.neverUsed;case"stale":return G.notUsedInDays(e.days);case"same_as":return G.sameAs(e.ruleTitle);case"overlaps":return G.overlapsWith(e.ruleTitle);default:return e}}});var G3=l(()=>{"use strict";x();x();x();x();x()});var qx,Jx=l(()=>{"use strict";gt();kp();G3();qx=e=>{let t=mr(e.prompt),r=Rp(e.matched.map(s=>({id:s.id,avoidance:s.avoidance}))),o=e.matched.length===0?0:mr(r),n=er(null);return{promptTokens:t,rulesTokens:o,addedCostUsd:o/1e3*n}}});var FA=l(()=>{"use strict";F3();Dx();Si();HA();zx();z3();B3();Vx();Jx();Uo()});var Yye,Xye,Yx,Zye,K3,Xx=l(()=>{"use strict";te();ft();pl();Yye="/api/local/coding-tools/pause",Xye=/^(?:127\.0\.0\.1|localhost):\d{1,5}$/,Yx=(e,t)=>e===void 0||e===ea||e===Wc||t!==void 0&&Xye.test(t)&&e===`http://${t}`,Zye=e=>{try{let r=JSON.parse(e)?.paused;return typeof r=="boolean"?r:null}catch{return null}},K3=async e=>{if(e.pathname!==Yye)return!1;let t=(i,a,c)=>e.sendJson(e.response,i,{ok:!0,paused:a,updatedAt:c,label:Cs.pauseLabel,hint:Cs.pauseHint});if(e.method==="GET"){let i=Os(e.configPath);return t(200,i.paused,i.updatedAt),!0}if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let r=e.request.headers.origin,o=e.request.headers.host;if(!Yx(typeof r=="string"?r:void 0,typeof o=="string"?o:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let n=Zye(await e.readBody(e.request));if(n===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body"}),!0;let s=vw(e.configPath,n);return t(200,s.paused,s.updatedAt),!0}});var Qye,ehe,V3,q3=l(()=>{"use strict";St();Xx();Qye="/api/local/projects/folder",ehe=e=>{try{let t=JSON.parse(e);return typeof t?.projectId!="string"||typeof t.folderPath!="string"?null:{projectId:t.projectId,folderPath:t.folderPath,allowOutsideHome:t.allowOutsideHome===!0}}catch{return null}},V3=async e=>{if(e.pathname!==Qye)return!1;if(e.method==="GET")return e.sendJson(e.response,200,{ok:!0,...xo(e.profileDir)}),!0;if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let t=e.request.headers.origin,r=e.request.headers.host;if(!Yx(typeof t=="string"?t:void 0,typeof r=="string"?r:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let o=ehe(await e.readBody(e.request));if(o===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body",message:"Send projectId and folderPath."}),!0;let s=await(e.link??Wo)({...o,profileDir:e.profileDir,cloudConfig:e.readCloudConfig()});return s.ok?(e.sendJson(e.response,200,s),!0):(e.sendJson(e.response,s.httpStatus,{ok:!1,error:s.code,message:s.message}),!0)}});var Zx,Qx,eW=l(()=>{"use strict";Zx="2025-03-26",Qx={name:"agent-witch",version:"1.0.0"}});var $l,$A,J3,the,im,Y3=l(()=>{"use strict";eW();$l=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),$A=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),J3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,the=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return $l(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return $l(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return $A(e,i)}catch(i){try{r.onToolError?.(n,i)}catch{}return $l(e,-32603,`Tool ${n} failed`)}},im=async(e,t,r)=>{let o=J3(e);if(o===null)return $l(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?$l(n,-32600,"Invalid Request"):s==="initialize"?$A(n,{protocolVersion:Zx,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?$A(n,{}):s==="tools/list"?$A(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?the(n,J3(o.params),t,r):$l(n,-32601,"Method not found")}});var tW,X3=l(()=>{"use strict";tW=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var zA=l(()=>{"use strict";Y3();X3();eW()});var rhe,Fn,UA=l(()=>{"use strict";Yr();zA();rhe=(e,t)=>{let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] mcp tool ${e} failed: ${r}
`)},Fn=e=>{let t=In({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:Qx,tools:[{definition:dS,call:r=>tW(JSON.stringify(t(r)))}],onToolError:e.logToolError??rhe}}});var Z3,ohe,nhe,Q3,e7=l(()=>{"use strict";zA();UA();Z3=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},ohe=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let p;try{p=JSON.parse(d)}catch{p=null}await t(p)}},nhe=async(e,t)=>{await ohe(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await im(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&Z3(t.stdout,s);return}Z3(t.stdout,s)})},Q3=async e=>{await nhe(Fn({layout:e.layout,isDeclined:e.isDeclined}),e.streams??{stdin:process.stdin,stdout:process.stdout})}});var she,BA,t7=l(()=>{"use strict";zA();UA();she="/mcp",BA=async e=>{if(e.pathname!==she)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??Fn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await im(t,r,void 0)),!0}});var r7={};vt(r7,{createAwlMcpServer:()=>Fn,runAwlMcpStdio:()=>Q3,tryHandleAwlMcpHttpRequest:()=>BA});var rW=l(()=>{"use strict";UA();e7();t7()});var ki,am,ihe,ahe,lhe,che,o7,n7=l(()=>{"use strict";ki=u(require("node:fs")),am=u(require("node:path")),ihe="prompt-optimizer-cycles.json",ahe="prompt-optimizer-preferences.json",lhe="prompt-sdlc-cycles.json",che="prompt-sdlc-preferences.json",o7=e=>{let t=am.default.join(e,ihe),r=am.default.join(e,lhe);if(ki.default.existsSync(t)||!ki.default.existsSync(r))return t;try{ki.default.renameSync(r,t)}catch{return r}let o=am.default.join(e,che),n=am.default.join(e,ahe);if(ki.default.existsSync(o)&&!ki.default.existsSync(n))try{ki.default.renameSync(o,n)}catch{}return t}});var zl,dhe,oW,s7=l(()=>{"use strict";zl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dhe=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],oW=e=>{let t=dhe.map(i=>`<option value="${zl(i.value)}">${zl(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this computer on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${zl(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${zl(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${zl(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${zl(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var lm,l7,phe,c7,uhe,mhe,d7,KA,i7,a7,ghe,fhe,Bo,cm,GA,yhe,VA,nW,hhe,sW,p7,iW,u7,She,Phe,Ahe,m7,g7,f7,dm=l(()=>{"use strict";lm=u(require("node:fs")),l7=u(require("node:path")),phe="estimate-history.ndjson",c7=100,uhe=500,mhe=2e4,d7=e=>l7.default.join(e,phe),KA=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,uhe),i7=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,mhe),a7=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,ghe=e=>({...e,estimateTokens:a7(e.estimateTokens),actualTokens:a7(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),fhe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Bo=e=>{let t=d7(e);return lm.default.existsSync(t)?lm.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return fhe(n)?[ghe(n)]:[]}catch{return[]}}):[]},cm=(e,t)=>{lm.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;lm.default.writeFileSync(d7(e),r,"utf8")},GA=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),yhe=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this computer. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${GA(o.task)} | ${GA(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},VA=e=>{let t=Bo(e.reportsDir),r=KA(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);cm(e.reportsDir,[...s,n])},nW=e=>{let t=Bo(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?KA(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);cm(e.reportsDir,[...i,s])},hhe=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-c7),sW=e=>[...Bo(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),p7=e=>{let t=Bo(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=i7(e.input),n=i7(e.output),s=KA(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);cm(e.reportsDir,[...c,a])},iW=(e,t)=>{let r=Bo(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},u7=e=>({table:yhe(hhe(Bo(e))),embedding:null}),She=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},Phe=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-c7),Ahe=e=>{let t=She(Phe(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${GA(s.task)} | ${GA(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},m7=e=>{let t=Bo(e.reportsDir),r=KA(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);cm(e.reportsDir,[...s,n])},g7=e=>{let t=Bo(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);cm(e.reportsDir,[...s,n])},f7=e=>Ahe(Bo(e))});var y7=l(()=>{"use strict";dm()});var Go,aW,_he,lW,bhe,Rhe,qA,JA,khe,cW,h7=l(()=>{"use strict";y7();vv();Go=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aW=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},_he=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${aW(-r)} under`:`${aW(r)} over`},lW=e=>e.toLocaleString("en-US"),bhe=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${lW(-r)} under`:`${lW(r)} over`},Rhe=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},qA=e=>e===null?"\u2014":aW(e),JA=e=>e===null?"\u2014":lW(e),khe=`(function () {
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
})();`,cW=e=>{let r=sW(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":_he(n.estimateSeconds,n.actualSeconds),p=n.estimateTokens===null||n.actualTokens===null?"no estimate":bhe(n.estimateTokens,n.actualTokens),m=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${m}">
        <td><button type="button" class="history-open">${Go(Rhe(i))}</button></td>
        <td>${Go(c)}</td>
        <td>${qA(n.estimateSeconds)}</td>
        <td>${qA(n.actualSeconds)}</td>
        <td>${Go(d)}</td>
        <td>${JA(n.estimateTokens)}</td>
        <td>${JA(n.actualTokens)}</td>
        <td>${Go(p)}</td>
      </tr>`,template:`<template id="${m}">
        <p class="eyebrow">${Go(c)}</p>
        <h2>Input</h2>
        <pre>${Go(i)}</pre>
        <h2>Output</h2>
        <pre>${Go(a)}</pre>
        <p>Time: estimated ${qA(n.estimateSeconds)} \xB7 actual ${qA(n.actualSeconds)} \xB7 ${Go(d)}</p>
        <p>Tokens: estimated ${JA(n.estimateTokens)} \xB7 actual ${JA(n.actualTokens)} \xB7 ${Go(p)}</p>
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
            ${UP({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${khe}</script>`}
    </section>`}});var S7=l(()=>{"use strict";s7();h7()});var Ul,whe,Ehe,dW,P7=l(()=>{"use strict";Ul=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),whe=(e,t,r)=>{let o=Ul(t),n=Ul(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},Ehe=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${Ul(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>whe(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${Ul(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${Ul(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${Ul(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},dW=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(Ehe).join(""):'<section class="card"><p class="muted">No writer sessions stored on this computer yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var A7=l(()=>{"use strict";P7()});var pm,_7,b7,pW,uW,mW,R7=l(()=>{"use strict";pm=u(require("node:fs")),_7=u(require("node:path"));qa();iP();b7=(e,t,r)=>fl({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,pW=(e,t,r)=>{let o=b7(e,t,r);if(o===null)return[];if(!pm.default.existsSync(o))return[];let n=pm.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},uW=e=>{let t=b7(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:_r(e.entry.prompt),output:_r(e.entry.output)};pm.default.mkdirSync(_7.default.dirname(t),{recursive:!0}),pm.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},mW=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var The,Ihe,um,YA,gW=l(()=>{"use strict";The=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Ihe=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,um=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=The(i.assistantOutput),d=c.length>0?`Assistant: ${Ihe(c,t)}`:null,p=[a,d].filter(m=>m!==null).join(`

`);if(p.length!==0){if(n+p.length>r&&o.length>0)break;o.unshift(p),n+=p.length}}return o.join(`

`)},YA=e=>{let t=e.userMessage.trim(),r=um({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var ao,mm,hW,Che,Lhe,fW,vhe,SW,XA,k7,w7,xhe,Bl,PW,yW,E7,Whe,T7,Gl,ZA,gm,Ohe,fm,AW,QA,e_,I7=l(()=>{"use strict";ao=u(require("node:fs")),mm=u(require("node:path")),hW=require("node:crypto");gW();Che="writer-sessions",Lhe="active-index.json",fW=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vhe=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",SW=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},XA=e=>{let t=mm.default.join(e.installDir,Che);return ao.default.mkdirSync(t,{recursive:!0}),t},k7=e=>mm.default.join(XA(e),Lhe),w7=(e,t)=>mm.default.join(XA(e),`${t}.canonical.json`),xhe=(e,t)=>mm.default.join(XA(e),`${t}.continuation.json`),Bl=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,PW=e=>{let t=k7(e);if(!ao.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(ao.default.readFileSync(t,"utf8"));if(!fW(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!fW(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!vhe(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},yW=(e,t)=>{ao.default.writeFileSync(k7(e),JSON.stringify(t,null,2))},E7=(e,t)=>{ao.default.writeFileSync(w7(e,t.sessionId),JSON.stringify(t,null,2))},Whe=(e,t)=>{ao.default.writeFileSync(xhe(e,t.sessionId),JSON.stringify(t,null,2))},T7=(e,t)=>{let r=um({turns:t.turns});Whe(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Gl=(e,t)=>{let r=w7(e,t);if(!ao.default.existsSync(r))return null;try{let o=JSON.parse(ao.default.readFileSync(r,"utf8"));return!fW(o)||typeof o.sessionId!="string"?null:o}catch{return null}},ZA=(e,t=20)=>{let r=XA(e),o=ao.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Gl(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},gm=(e,t,r)=>{let o=SW(r);return PW(e).entries.find(i=>Bl(i)===Bl({writerAgent:t,projectFolderPath:o}))?.sessionId??null},Ohe=(e,t,r,o)=>{let n=PW(e),s=Bl({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>Bl(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];yW(e,{entries:i})},fm=(e,t,r)=>{let o=(0,hW.randomUUID)(),n=new Date().toISOString(),s=SW(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return E7(e,i),T7(e,i),Ohe(e,t,s,o),o},AW=(e,t,r)=>{let o=gm(e,t,r);return o!==null?o:fm(e,t,r)},QA=(e,t,r)=>{let o=SW(r),n=PW(e);if(o===null&&r===void 0){yW(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=Bl({writerAgent:t,projectFolderPath:o});yW(e,{entries:n.entries.filter(i=>Bl(i)!==s)})},e_=e=>{let t=AW(e.layout,e.writerAgent,e.projectFolderPath),r=Gl(e.layout,t);if(r===null)return;let o={id:(0,hW.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};E7(e.layout,n),T7(e.layout,n)}});var jhe,Mhe,t_,_W,C7=l(()=>{"use strict";jhe=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",Mhe=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},t_=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted&&!e.hasSourceRunId?"continue":"first",_W=e=>{let t=t_(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=jhe(r,e.userPromptCharacterCount),n=Mhe({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var r_=l(()=>{"use strict";R7();I7();gW();C7()});var L7=l(()=>{"use strict";eh();Oa();eE()});var v7=l(()=>{"use strict";Rw()});var Ct,Dhe,Hhe,bW,RW,kW,x7=l(()=>{"use strict";L7();v7();Ct=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Dhe=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Hhe=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=qd(o);return`value="${Ct(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${Ct(r)}"`},bW=(e,t,r,o,n)=>{let s=th[t];return`<label class="field">
          <span class="field-label">${Ct(o)} API key \u2014 ${Ct(Dhe(e,t))} \xB7 <a class="field-link" href="${Ct(s.href)}" target="_blank" rel="noopener noreferrer">${Ct(s.label)}</a></span>
          <input class="input mono" type="password" name="${Ct(r)}" autocomplete="off" ${Hhe(e,t,n)} />
        </label>`},RW=(e,t,r,o)=>{let n=Uy(e[t]?.model),s=new Set(zy[t].map(c=>c.value)),i=zy[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${Ct(c.value)}"${d}>${Ct(c.label)}</option>`}).join(""),a=n!==xs&&!s.has(n)?`<option value="${Ct(n)}" selected>${Ct(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${Ct(o)}</span>
          <select class="input mono" name="${Ct(r)}">${i}${a}</select>
        </label>`},kW=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Ct(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${bW(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${RW(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${bW(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${RW(e.secrets,"openai","openaiModel","OpenAI model")}
        ${bW(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${RW(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var W7=l(()=>{"use strict";x7()});var o_,O7,j7=l(()=>{"use strict";o_=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O7=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${o_(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in AgentWitch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">Nothing installed yet. Install playbooks in AgentWitch Cloud \u2014 files land in your profile harness on this computer. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${o_(s.name)}</strong> <span class="muted mono">(${o_(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${o_(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from AgentWitch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var Fhe,M7,N7,D7=l(()=>{"use strict";Fhe=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,M7=e=>e.kind==="folder",N7=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&M7(d)){s=d;continue}let p={kind:"folder",name:a,children:new Map};s.children.set(a,p),s=p}}let r=o=>{let n=[];for(let s of o.children.values()){if(M7(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(Fhe)};return r(t)}});var H7,wW,F7=l(()=>{"use strict";H7=u(require("node:path")),wW=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${wW(r.children,t)}</ul>
            </details>
          </li>`;let o=H7.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var $7,$n,$he,zhe,ym,Uhe,EW,z7=l(()=>{"use strict";uP();$7=u(require("node:path"));j7();D7();F7();$n=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),$he=()=>`(() => {
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

})();`,zhe=()=>`(() => {
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
})();`,ym=e=>{let t=ou({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in AgentWitch Cloud",body:"Install and update playbooks in the browser; this computer keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=O7({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${$n(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${$n(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Uhe(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${$n(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${$n(s)}" />
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
    <script>${$he()}</script>
    <script>${zhe()}</script>`;return`${t}${r}${o}${c}${d}`},Uhe=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=N7(a.items.map(g=>({...g,relativePath:typeof g.relativePath=="string"&&g.relativePath.length>0?g.relativePath:$7.default.relative(a.sourceRoot,g.sourcePath).replaceAll("\\","/")}))),p=wW(d,$n),m=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${$n(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${$n(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${m} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${p}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${$n(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},EW=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),p=a.trim();Number.isFinite(d)&&p.length>0&&n.set(d,p)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),p=d!==null&&Number.isFinite(d)?n.get(d):void 0,m=e.get(`setName-${i}`)?.trim()??p??a,g=t.sets[i];if(g===void 0)continue;let y=a.length>0?a:g.proposedSlug,S=m.length>0?m:g.proposedName,A=r.has(i),E=g.items.map(I=>({id:I.id,kind:I.kind,title:I.title,sourcePath:I.sourcePath,include:A}));s.push({slug:y,name:S,items:E})}return s}});var U7=l(()=>{"use strict";z7()});var Bhe,TW,B7=l(()=>{"use strict";ht();Bhe=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},TW=Bhe});var Ghe,G7,K7=l(()=>{"use strict";ht();Ghe=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[ie]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},G7=Ghe});var V7,Khe,q7,J7=l(()=>{"use strict";gt();V7={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:`This project already has ${64} active pitfalls, the most allowed. Retire one, then try again.`},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"AgentWitch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach AgentWitch Cloud. Check this computer on Status, then try again."}},Khe=e=>e!==null&&Object.prototype.hasOwnProperty.call(V7,e)?V7[e]:null,q7=Khe});var Y7,X7=l(()=>{"use strict";Y7=[{label:"Haiku",goal:"Write a short haiku about morning rain."},{label:"Trip plan",goal:"Plan a quiet weekend trip to a nearby lake."},{label:"Rainbows",goal:"Explain how rainbows form in simple words."},{label:"Dinner idea",goal:"Suggest a quick vegetarian dinner for two."}]});var xr,hm,IW=l(()=>{"use strict";Uo();X7();_x();xr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hm=e=>{let t=e.promptValue??"",r=vA({presets:Y7,groupLabel:G.groupLabel,leadLabel:G.lead,submitName:"rulePrompt"}),o=e.promptError!==void 0&&e.promptError!==null?`<p class="alert-error">${xr(e.promptError)}</p>`:"",n=e.resultHtml!==void 0&&e.resultHtml.length>0?`<div class="stack">${e.resultHtml}</div>`:"",s=e.usageHtml!==void 0&&e.usageHtml.length>0?`<section class="stack">
          <h3>${xr(G.ruleUseHeading)}</h3>
          <p class="lede">${xr(G.ruleUseIntro)}</p>
          ${e.usageHtml}
        </section>`:"";return`<section class="stack" aria-label="${xr(G.heading)}">
      <h2>${xr(G.heading)}</h2>
      <p class="lede">${xr(G.intro)}</p>
      <form method="GET" action="/project" class="stack">
        <input type="hidden" name="id" value="${xr(e.projectId)}" />
        <input type="hidden" name="tab" value="harness" />
        ${r}
        <label class="field-label" for="rule-compare-prompt">${xr(G.customLabel)}</label>
        <p class="muted">${xr(G.customHint)}</p>
        <textarea class="input" id="rule-compare-prompt" name="rulePrompt" rows="3">${xr(t)}</textarea>
        ${o}
        <div class="actions">
          <button class="btn btn-primary" type="submit">${xr(G.button)}</button>
        </div>
      </form>
      ${n}
      ${s}
    </section>`}});var Kl,CW,LW=l(()=>{"use strict";Uo();Kl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CW=e=>{if(e.matched.length===0)return`<p class="empty">${Kl(G.noRules)}</p>`;let t=e.matched.length===1?G.oneRule:G.nRules(e.matched.length),r=`<ul class="stack">${e.matched.map(n=>`<li><strong>${Kl(n.title)}</strong> <span class="muted mono">${Kl(n.id)}</span></li>`).join("")}</ul>`,o=`$${e.tokens.addedCostUsd.toFixed(4)}`;return`<div class="stack">
      <p>${Kl(t)}</p>
      ${r}
      <p class="muted">${Kl(G.tokenLine(e.tokens.promptTokens,e.tokens.rulesTokens))}</p>
      <p class="muted">${Kl(G.costLine(o))}</p>
    </div>`}});var sr,Vhe,vW,xW=l(()=>{"use strict";Vx();Uo();sr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vhe=e=>e===1?G.usedOnce:G.usedN(e),vW=e=>{let t=e.flashHtml??"";if(e.rules.length===0)return`${t}<p class="empty">${sr(G.emptyRules)}</p>`;let r=new Map(e.rules.map(n=>[n.ruleId,n])),o=e.rules.map(n=>{let i=Gx({rule:n,rulesById:r,overlaps:e.overlaps,nowMs:e.nowMs}).map(c=>`<span class="muted">${sr(Kx(c))}</span>`).join(" \xB7 "),a=n.active?`<form method="POST" action="/project/rules/drop" class="inline-form">
            <input type="hidden" name="projectId" value="${sr(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${sr(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${sr(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${sr(G.drop)}</button>
          </form>`:`<form method="POST" action="/project/rules/restore" class="inline-form">
            <input type="hidden" name="projectId" value="${sr(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${sr(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${sr(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${sr(G.restore)}</button>
          </form>`;return`<li class="stack">
          <p><strong>${sr(n.title)}</strong> <span class="muted">${sr(Vhe(n.hitCount))}</span></p>
          ${i?`<p>${i}</p>`:""}
          ${a}
        </li>`}).join("");return`${t}<ul class="stack">${o}</ul>`}});var Ko,Z7,Vo,Q7,WW=l(()=>{"use strict";Uo();Ko=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Z7=e=>{let t=G.dropped(e.title),r=e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Ko(e.prompt)}" />`:"";return`<div class="alert-success actions">
      <span>${Ko(t)}</span>
      <form method="POST" action="/project/rules/restore" class="inline-form">
        <input type="hidden" name="projectId" value="${Ko(e.projectId)}" />
        <input type="hidden" name="ruleId" value="${Ko(e.ruleId)}" />
        ${r}
        <button class="btn btn-secondary btn-compact" type="submit">${Ko(G.undo)}</button>
      </form>
    </div>`},Vo=(e,t="error")=>`<p class="${t==="error"?"alert-error":"muted"}">${Ko(e)}</p>`,Q7=e=>{let t=`/project?id=${encodeURIComponent(e.projectId)}&tab=harness&rulePrompt=${encodeURIComponent(e.prompt)}`;return`<p class="alert-error">${Ko(G.usageError)} <a href="${Ko(t)}">${Ko(G.tryAgain)}</a></p>`}});var qhe,eX,tX=l(()=>{"use strict";Uo();WW();xW();qhe=(e,t)=>e.ok?"":e.reason==="forbidden"?Vo(G.ownerOnlyDrop):e.reason==="limit_exceeded"?Vo(G.limitReached):Vo(t==="restore"?G.restoreFailed:G.dropFailed),eX=e=>{if(e.usage===null)return Vo(G.connectComputer,"muted");if(!e.usage.ok)return e.usage.reason==="not_connected"?Vo(G.connectComputer,"muted"):e.usage.reason==="forbidden"?Vo(G.ownerOnlyUsage,"muted"):Q7({projectId:e.projectId,prompt:e.prompt});let t="";return e.changeError!==void 0&&e.changeError!==null?t=qhe(e.changeError,e.changeAction??"drop"):e.dropFlash&&(t=Z7({projectId:e.projectId,ruleId:e.dropFlash.ruleId,title:e.dropFlash.title,prompt:e.prompt})),vW({projectId:e.projectId,rules:e.usage.data.rules,overlaps:e.usage.data.overlaps,flashHtml:t,prompt:e.prompt})}});var Jhe,n_,rX=l(()=>{"use strict";Yr();Jx();Uo();IW();LW();tX();WW();Jhe=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,source:e.source,hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,severity:e.severity}),n_=e=>{let t=e.prompt?.trim()??"";if(t.length===0)return hm({projectId:e.projectId,promptError:e.prompt!==null&&e.prompt!==void 0?G.emptyPrompt:null});if(e.rulesUnavailable||e.activeRules===null)return hm({projectId:e.projectId,promptValue:t,resultHtml:Vo(G.rulesUnavailable,"muted")});let o=Xa({pitfalls:e.activeRules.map(Jhe),text:t}).map(s=>({id:s.id,title:s.symptom,avoidance:s.avoidance})),n=qx({prompt:t,matched:o});return hm({projectId:e.projectId,promptValue:t,resultHtml:CW({matched:o,tokens:n}),usageHtml:eX({projectId:e.projectId,prompt:t,usage:e.usage,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})})}});var oX=l(()=>{"use strict";Mv();wx();IW();LW();xW();rX()});var nX,sX=l(()=>{"use strict";ht();FA();oX();nX=async e=>{if(e.prompt===null)return n_({projectId:e.projectId,prompt:null,activeRules:[],usage:null});let t=e.cloudConfig===null?{ok:!1,reason:"not_connected"}:await Ux({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:e.projectId,pairingHeaderName:ie}),r=e.pitfalls,o=r==null||!r.ok,n=o?null:r.items.filter(s=>s.source!=="retired");return n_({projectId:e.projectId,prompt:e.prompt,activeRules:n,rulesUnavailable:o,usage:t,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})}});var OW,iX,aX=l(()=>{"use strict";ht();FA();OW=(e,t)=>e.get(t)?.trim()??"",iX=async e=>{let t=new URLSearchParams(e.rawBody),r=OW(t,"projectId"),o=OW(t,"ruleId"),n=OW(t,"rulePrompt");if(r.length===0||o.length===0)return{kind:"not_found"};let s=n.length>0?`&rulePrompt=${encodeURIComponent(n)}`:"",i=`/project?id=${encodeURIComponent(r)}&tab=harness${s}`;if(e.cloudConfig===null)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent("unavailable")}`};let a=await Bx({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:r,ruleId:o,action:e.action,pairingHeaderName:ie});if(!a.ok)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent(a.reason)}&ruleChangeAction=${e.action}`};if(e.action==="drop"&&a.data.changed){let c=new URLSearchParams({id:r,tab:"harness",ruleDropped:a.data.rule.ruleId,ruleDroppedTitle:a.data.rule.title});return n.length>0&&c.set("rulePrompt",n),{kind:"redirect",location:`/project?${c.toString()}`}}return{kind:"redirect",location:i}}});var lX=l(()=>{"use strict"});var wi,Yhe,jW,cX=l(()=>{"use strict";uP();fT();wi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Yhe=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,jW=e=>{let t=e.flashError?`<div class="alert-error">${wi(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${wi(e.flashMessage)}</div>`:"",r=ou({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in AgentWitch Cloud",body:"Projects are created in the browser. This page chooses their folders on this computer and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in AgentWitch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${wi(Yhe(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,p=`<a class="btn btn-secondary btn-compact" href="${wi(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,m=Uh(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from AgentWitch Cloud? The folder on this computer stays.');">
                  <input type="hidden" name="projectId" value="${wi(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${wi(n.name)}</strong>
                  <span class="muted mono">${wi(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${p}${m}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this computer</h1>
      <p class="lede">Synced from AgentWitch Cloud for this paired computer only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var dX=l(()=>{"use strict";lX();Vh();cX()});var s_,pX=l(()=>{"use strict";s_=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var uX,Wr,MW=l(()=>{"use strict";uX=u(require("node:path"));pr();Fe();X();te();tT();Wr=e=>{let t=B()?.layout.installDir??L();if(uX.default.basename(t)===Mr)return xt;let r=B(),o=r!==null?Je(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):xt}});var NW,mX=l(()=>{"use strict";zr();MW();NW=async e=>{let t=De(e.installDir),r=t?.bundleVersion??null,o=Wr(t);try{let n=await Ea(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:As(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var DW,gX=l(()=>{"use strict";DW=e=>!e});var HW,Vl,FW=l(()=>{"use strict";X();HW=()=>`http://127.0.0.1:${la()}/update/run`,Vl=async e=>{try{let t=await fetch(HW(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Xhe,fX,$W,yX=l(()=>{"use strict";X();ye();FW();Xhe=()=>{ho({launchAgentLabel:we(),installDir:L()})},fX=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},$W=async()=>{Xhe();let e=await Vl({force:!0});if(e.ok)return{ok:!0,message:fX(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:fX(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(zr(),C$)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var zW=l(()=>{"use strict";dP();pX();MW();mX();gX();yX();FW()});var hX,SX=l(()=>{"use strict";hX=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var PX,AX,UW,BW,_X=l(()=>{"use strict";PX=require("node:crypto"),AX=u(require("node:fs"));St();te();te();SX();UW=!1,BW=async e=>{if(UW)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!hX(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=B();if(r===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let o=q({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&AX.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,PX.randomUUID)();UW=!0;try{if(await rT(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Ma({...r,workspace:n},e.writerAgent,t);return await hp(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{UW=!1}}});var bX=l(()=>{"use strict";_X()});var At,ql=l(()=>{"use strict";At=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var zt,ne,_t,Ei,RX,Or,Re,i_,a_,kX,zn,Un,l_,c_,GW,KW,VW,Ti,wX,Z=l(()=>{"use strict";zt="history",ne="skills",_t="_drafts",Ei="_tombstones",RX="state.json",Or="meta.json",Re="skillgen",i_="episodes.json",a_="budget.json",kX="metrics.jsonl",zn="SKILL.md",Un="meta.json",l_="learned-pitfalls.json",c_="flags.json",GW="index",KW="store.db",VW="acks",Ti="tasks",wX="outcomes"});var Ii,TX,bt,se,pt=l(()=>{"use strict";Ii=u(require("node:fs")),TX=u(require("node:path"));Z();bt=e=>{Ii.default.mkdirSync(e,{recursive:!0,mode:448});try{Ii.default.chmodSync(e,448)}catch{}},se=(e,t)=>{bt(TX.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;Ii.default.writeFileSync(r,t,{mode:384});try{Ii.default.chmodSync(r,384)}catch{}Ii.default.renameSync(r,e);try{Ii.default.chmodSync(e,384)}catch{}}});var Bn,U,ue,Q=l(()=>{"use strict";Bn=u(require("node:path"));X();ql();pt();Z();U=e=>{if(!At(e))throw new Error("invalid_project_id");let t=z();return Bn.default.join(t.projectDataDir,e)},ue=e=>{let t=U(e);bt(t),bt(Bn.default.join(t,zt));let r=Bn.default.join(t,ne);return bt(r),bt(Bn.default.join(r,_t)),bt(Bn.default.join(r,Ei)),bt(Bn.default.join(t,Re)),bt(Bn.default.join(t,Ti)),t}});var qW,JW,d_=l(()=>{"use strict";qW=/^[a-z0-9][a-z0-9_-]{0,63}$/,JW="sha256:"});var IX,Ge,Sm=l(()=>{"use strict";IX=require("node:crypto");d_();Ge=e=>`${JW}${(0,IX.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var Ci,Pm=l(()=>{"use strict";d_();Ci=e=>qW.test(e)});var Am,p_=l(()=>{"use strict";Am=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var YW,XW=l(()=>{"use strict";YW=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var ZW,QW=l(()=>{"use strict";Pm();ZW=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>Ci(r.skillId))}catch{return[]}}});var e0,t0=l(()=>{"use strict";e0=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var r0,o0=l(()=>{"use strict";Sm();r0=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:Ge(t.body)===t.contentHash?t:null}catch{return null}}});var n0,s0=l(()=>{"use strict";Sm();Pm();n0=async e=>{if(!Ci(e.skillId))return{ok:!1,code:"unavailable"};let t=Ge(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var i0,a0=l(()=>{"use strict";Pm();i0=async e=>{if(!Ci(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var l0,c0=l(()=>{"use strict";Sm();p_();o0();s0();l0=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await r0({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(Am({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||Ge(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await n0({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var d0,p0=l(()=>{"use strict";p_();a0();d0=async e=>Am({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await i0({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var _m,u_,CX=l(()=>{"use strict";XW();QW();t0();c0();p0();_m="[project-skill-pull-mirror]",u_=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await YW({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await e0({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(_m,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await l0({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(p){console.warn(_m,"skill_failed",d.skillId,p),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await ZW({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await d0({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(p){console.warn(_m,"orphan_tombstone_failed",d.skillId,p),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(_m,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(_m,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var Gn=l(()=>{"use strict";d_();Sm();Pm();p_();XW();QW();t0();o0();s0();a0();c0();p0();CX()});var Li,bm,Zhe,Qhe,Rm,m_=l(()=>{"use strict";Li=u(require("node:fs")),bm=u(require("node:path"));pt();Gn();Z();Q();Zhe=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Qhe=e=>`v${String(e).padStart(4,"0")}.md`,Rm=e=>{if(!Zhe(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=ue(e.projectId),r=bm.default.join(t,ne,e.skillId),o=bm.default.join(r,Qhe(e.version)),n=bm.default.join(r,Or),s=Ge(e.body);if(Li.default.existsSync(o)&&Li.default.existsSync(n))try{let a=JSON.parse(Li.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&Li.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}se(o,e.body),se(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=bm.default.join(t,ne,Ei,`${e.skillId}.json`);return Li.default.existsSync(i)&&Li.default.unlinkSync(i),{path:o,contentHash:s}}});var km,g_,m0,g0=l(()=>{"use strict";km=u(require("node:fs")),g_=u(require("node:path"));Gn();Z();Q();m0=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=U(e.projectId)}catch{return null}let r=g_.default.join(t,ne,e.skillId),o=g_.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=g_.default.join(r,Or);if(!km.default.existsSync(o)||!km.default.existsSync(n))return null;try{let s=km.default.readFileSync(o,"utf8"),i=JSON.parse(km.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||Ge(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var qo,Kn,LX,eSe,f0,y0,h0=l(()=>{"use strict";qo=u(require("node:fs")),Kn=u(require("node:path"));pt();Z();Q();LX=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),eSe=(e,t)=>{if(!qo.default.existsSync(e))return;let r=`.${t}.`;for(let o of qo.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=Kn.default.join(e,o);try{qo.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},f0=e=>{if(!LX(e.skillId))throw new Error("invalid_project_skill_id");let t=ue(e.projectId),r=Kn.default.join(t,ne),o=Kn.default.join(r,e.skillId),n=!1;if(qo.default.existsSync(o)){let c=Kn.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{qo.default.renameSync(o,c),qo.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}eSe(r,e.skillId);let s=Kn.default.join(r,Ei);bt(s);let i=Kn.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return se(i,`${JSON.stringify(a)}
`),{removed:n}},y0=e=>{if(!LX(e.skillId))return null;let t;try{t=U(e.projectId)}catch{return null}let r=Kn.default.join(t,ne,Ei,`${e.skillId}.json`);if(!qo.default.existsSync(r))return null;try{let o=JSON.parse(qo.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var wm,S0,P0,A0=l(()=>{"use strict";wm=u(require("node:fs")),S0=u(require("node:path"));Z();Q();P0=e=>{let t;try{t=U(e.projectId)}catch{return[]}let r=S0.default.join(t,ne);if(!wm.default.existsSync(r))return[];let o=[];for(let n of wm.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=S0.default.join(r,n,Or);if(wm.default.existsSync(s))try{let i=JSON.parse(wm.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var _0,b0=l(()=>{"use strict";_0=e=>e.toMembershipId===null&&e.toUserId===null&&e.toTeamLabel===null});var vX,tSe,rSe,oSe,nSe,R0,xX,WX,iit,ait,sSe,lit,iSe,aSe,cit,k0=l(()=>{"use strict";vX=(e,t)=>{let r=process.env[e]?.trim();if(!r)return t;let o=Number.parseInt(r,10);return Number.isFinite(o)&&o>0?o:t},tSe="peer.silent",rSe="peer.silent_blocked",oSe="composer.recipient_sticky_cleared",nSe="project.updated",R0=[tSe,rSe,oSe],xX="System",WX="Owner",iit=5*6e4,ait=10*6e4,sSe=300,lit=vX("AWC_PROJECT_MESSAGE_HOURLY_CAP",sSe),iSe=300,aSe=vX("AWC_PROJECT_MESSAGE_UNREAD_CAP",iSe),cit=["peer.joined","peer.left","peer.renamed",nSe,...R0]});var Yl,w0,lSe,hit,E0=l(()=>{"use strict";k0();Yl="whole",w0="task.assign",lSe=["peer.joined","peer.left","peer.renamed"],hit=[...lSe,"composer.recipient_sticky_cleared"]});var cSe,T0,OX=l(()=>{"use strict";b0();E0();cSe=e=>e==="owner"||e==="member",T0=e=>{let{row:t}=e;return t.senderKind==="owner"||t.senderKind==="member"?_0(t)?Yl:t.toMembershipId!==null&&e.botIds.has(t.toMembershipId)?t.toMembershipId:null:t.senderKind!=="bot"||t.senderMembershipId===null||!e.botIds.has(t.senderMembershipId)||!cSe(t.recipientKind)?null:e.inReplyTo!==null&&e.wholeMessageIds.has(e.inReplyTo)?Yl:t.senderMembershipId}});var dSe,Em,jX=l(()=>{"use strict";dSe=/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,Em=e=>{let t=dSe.exec(e);if(t===null)return{inReplyTo:null,text:e};let r=e.replace(new RegExp(`${t[0]}\\s*:?`)," ").replace(/\s+/g," ").trim();return{inReplyTo:t[0].toLowerCase(),text:r.length>0?r:e}}});var pSe,I0,MX=l(()=>{"use strict";k0();pSe=new Set(R0),I0=e=>e.sender_membership_id===null||e.sender_membership_id===void 0?pSe.has(String(e.kind))?xX:WX:e.sender_display_name?String(e.sender_display_name):null});var Tm=l(()=>{"use strict";OX();b0();E0();jX();MX()});var vi,ve,Xl=l(()=>{"use strict";vi=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},ve=(e,t)=>{for(let r of t){let o=vi(e[r]);if(o!==null)return o}return null}});var Im,f_=l(()=>{"use strict";Tm();Xl();Im=e=>{let t=ve(e,["fromProjectDisplayName","senderLabel","sender_label"]);return t!==null?t:I0({sender_membership_id:e.sender_membership_id??e.fromMembershipId??e.senderMembershipId??null,sender_display_name:e.sender_display_name??e.senderDisplayName??null,kind:e.kind})}});var y_,C0=l(()=>{"use strict";Xl();y_=e=>{let t=ve(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),r=ve(e,["toMembershipId","to_membership_id"]);return t===null&&r!==null?new Set([r]):t!==null&&r===null?new Set([t]):t!==null&&r!==null?new Set([r]):new Set}});var NX,uSe,L0,v0=l(()=>{"use strict";Tm();C0();Xl();NX=(e,t,r)=>e===null?r:t.has(e)?"bot":r,uSe=(e,t)=>{let r=ve(e,["fromMembershipId","senderMembershipId","sender_membership_id"]),o=ve(e,["toMembershipId","to_membership_id"]),n=ve(e,["toUserId","to_user_id"]),s=ve(e,["toTeamLabel","to_team_label"]),i=NX(r,t,"owner"),a=o!==null?NX(o,t,"member"):n!==null?"owner":"none";return{messageId:ve(e,["messageId","id"])??"unknown",kind:vi(e.kind)??"chat.note",summary:vi(e.summary)??"",createdAt:ve(e,["createdAt","created_at"])??new Date(0).toISOString(),senderKind:i,senderMembershipId:r,senderUserId:"history-local",senderDisplayName:null,recipientKind:a,toMembershipId:o,toUserId:n,toTeamLabel:s}},L0=e=>{let t=ve(e.message,["threadKey","thread_key"]);if(t!==null)return t;let r=e.botIds??y_(e.message),o=uSe(e.message,r),n=ve(e.message,["inReplyTo","in_reply_to"])??(o.senderKind==="bot"?Em(o.summary).inReplyTo:null);return T0({row:o,botIds:r,wholeMessageIds:e.wholeMessageIds??new Set,inReplyTo:n})}});var x0,W0,Me=l(()=>{"use strict";x0="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM",W0="AGENT_WITCH_HISTORY_SKILLGEN_OWNER_LLM_DRY_RUN"});var O0,j0=l(()=>{"use strict";f_();v0();Me();Xl();O0=e=>{let t=ve(e.message,["createdAt","created_at"])??e.savedAt;return{messageId:e.messageId,projectId:e.projectId,message:e.message,savedAt:e.savedAt,version:2,threadKey:L0({message:e.message,botIds:e.botIds,wholeMessageIds:e.wholeMessageIds}),createdAt:t,senderLabel:Im(e.message)}}});var Jo,xi=l(()=>{"use strict";Jo="message"});var M0,DX,Wi,Cm=l(()=>{"use strict";M0=e=>{if(typeof e!="string")return null;let t=e.trim();return t.length>0?t:null},DX=(e,t)=>{for(let r of t){let o=M0(e[r]);if(o!==null)return o}return null},Wi=e=>{let t=e,r=M0(t.threadKey)??DX(e.message,["threadKey","thread_key"]),o=M0(t.createdAt)??DX(e.message,["createdAt","created_at"])??e.savedAt;return{threadKey:r,createdAt:o}}});var HX,FX=l(()=>{"use strict";xi();HX=`
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
`});var $X,zX,UX=l(()=>{"use strict";$X=u(require("node:path"));Z();Q();zX=e=>$X.default.join(U(e),GW,KW)});var BX,GX,fSe,ySe,Vn,qn,Zl=l(()=>{"use strict";BX=u(require("node:fs")),GX=u(require("node:path"));Yr();xi();FX();UX();fSe=e=>{let t=e.prepare("SELECT value FROM history_store_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},ySe=(e,t)=>{e.prepare(`INSERT INTO history_store_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},Vn=e=>{let t=Nt();if(!t.ok)return{ok:!1,reason:t.reason};let r=zX(e);BX.default.mkdirSync(GX.default.dirname(r),{recursive:!0,mode:448});let o=new t.sqlite.DatabaseSync(r);return o.exec(`PRAGMA busy_timeout = ${3e3}`),o.exec(HX),fSe(o)<1&&ySe(o,1),{ok:!0,db:o}},qn=e=>{e.close()}});var hSe,h_,S_=l(()=>{"use strict";xi();Cm();Zl();hSe="[project-history-index]",h_=e=>{let t=Vn(e.record.projectId);if(!t.ok)return{ok:!1,reason:t.reason};let{threadKey:r,createdAt:o}=Wi(e.record),n=e.kind??Jo;try{return t.db.prepare(`INSERT INTO records (message_id, project_id, kind, thread_key, created_at, saved_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(message_id) DO UPDATE SET
           project_id = excluded.project_id,
           kind = excluded.kind,
           thread_key = excluded.thread_key,
           created_at = excluded.created_at,
           saved_at = excluded.saved_at`).run(e.record.messageId,e.record.projectId,n,r,o,e.record.savedAt),{ok:!0,threadKey:r,createdAt:o}}catch(s){return console.error(hSe,"ingest_failed",e.record.projectId,e.record.messageId,s),{ok:!1,reason:"ingest_failed"}}finally{qn(t.db)}}});var D0,VX,SSe,PSe,KX,H0,F0=l(()=>{"use strict";D0=u(require("node:fs")),VX=u(require("node:path"));pt();j0();S_();Z();Q();SSe="[project-history-write]",PSe=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),KX=e=>{try{h_({record:e})}catch(t){console.error(SSe,"index_ingest_failed",e.projectId,e.messageId,t)}},H0=e=>{let t=e.messageId.trim();if(!PSe(t))throw new Error("invalid_message_id");let r=ue(e.projectId),o=VX.default.join(r,zt,`${t}.json`);if(D0.default.existsSync(o))try{let s=JSON.parse(D0.default.readFileSync(o,"utf8"));if(s.messageId===t)return KX(s),s}catch{}let n=O0({messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString(),botIds:e.botIds,wholeMessageIds:e.wholeMessageIds});return se(o,`${JSON.stringify(n)}
`),KX(n),n}});var Lm,qX,JX,lo,Ql,$0,Jn=l(()=>{"use strict";Lm=u(require("node:fs")),qX=u(require("node:path"));pt();Z();Q();X();JX=e=>qX.default.join(U(e),zt,RX),lo=e=>{try{let t=JX(e);if(!Lm.default.existsSync(t))return null;let r=JSON.parse(Lm.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},Ql=e=>{ue(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return se(JX(e.projectId),`${JSON.stringify(t)}
`),t},$0=()=>{let t=z().projectDataDir;if(!Lm.default.existsSync(t))return[];let r=[];for(let o of Lm.default.readdirSync(t)){if(!At(o))continue;let n=lo(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var YX,XX=l(()=>{"use strict";ht();YX=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[ie]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var z0,U0=l(()=>{"use strict";z0=e=>{let t=e.deviceId.trim(),r=e.messageId.trim();if(t.length===0)throw new Error("invalid_device_id");if(r.length===0)throw new Error("invalid_message_id");let o=e.ackedAt??new Date().toISOString();return{deviceId:t,messageId:r,ackedAt:o,lastSeenAt:e.lastSeenAt??o}}});var B0,QX,ZX,G0,K0=l(()=>{"use strict";B0=u(require("node:fs")),QX=u(require("node:path"));pt();U0();Z();Q();ZX=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),G0=e=>{let t=e.messageId.trim(),r=e.deviceId.trim();if(!ZX(t)||!ZX(r))throw new Error("invalid_ack_ids");let o=ue(e.projectId),n=QX.default.join(o,zt,VW,`${t}.json`),s=e.nowIso??new Date().toISOString();if(B0.default.existsSync(n))try{let a=JSON.parse(B0.default.readFileSync(n,"utf8"));if(a.messageId===t&&a.deviceId===r&&typeof a.ackedAt=="string"){let c={...a,lastSeenAt:s};return se(n,`${JSON.stringify(c)}
`),c}}catch{}let i=z0({deviceId:r,messageId:t,ackedAt:s,lastSeenAt:s});return se(n,`${JSON.stringify(i)}
`),i}});var ec,e9,ASe,V0,t9=l(()=>{"use strict";Pr();te();Jn();XX();K0();F0();ec="[project-history-dispatch]",e9=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ASe=()=>{let e=B();return e===null?null:q({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},V0=async e=>{if(!e9(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!e9(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{H0({projectId:t,messageId:o,message:r}),Ql({projectId:t,state:"on_ready"});let s=typeof e.deviceId=="string"?e.deviceId.trim():"";if(s.length>0)try{G0({projectId:t,deviceId:s,messageId:o})}catch(i){console.error(ec,"local_ack_failed",t,o,i)}}catch(s){console.error(ec,"write_failed",t,o,s);try{Ql({projectId:t,state:"degraded"})}catch(i){console.error(ec,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?ASe():e.cloudApi;if(n===null)return console.error(ec,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await YX({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(ec,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(ec,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var q0,r9,_Se,tc,vm=l(()=>{"use strict";q0=u(require("node:fs")),r9=u(require("node:path"));Z();Q();_Se=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},tc=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=r9.default.join(U(e.projectId),zt,`${t}.json`);if(!q0.default.existsSync(r))return null;try{let o=JSON.parse(q0.default.readFileSync(r,"utf8"));return _Se(o)?o:null}catch{return null}}});var xm,P_=l(()=>{"use strict";vm();xm=e=>tc(e)});var J0,o9,Oi,Wm=l(()=>{"use strict";J0=u(require("node:fs")),o9=u(require("node:path"));Z();vm();Q();Oi=e=>{let t=o9.default.join(U(e),zt);if(!J0.default.existsSync(t))return[];let r=J0.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=tc({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),a=Date.parse(s.savedAt);return i!==a?i-a:n.messageId.localeCompare(s.messageId)})}});var Om,bSe,RSe,kSe,wSe,ESe,TSe,Y0,ji,jm=l(()=>{"use strict";xi();Cm();Wm();Zl();Yr();Om=(e,t)=>{let r=e[t];return typeof r=="string"?r:null},bSe=e=>{let t=Om(e,"messageId"),r=Om(e,"projectId"),o=Om(e,"kind"),n=Om(e,"createdAt"),s=Om(e,"savedAt");if(t===null||r===null||o===null||n===null||s===null)return null;let i=e.threadKey,a=i==null?null:typeof i=="string"?i:null;return{messageId:t,projectId:r,kind:o==="summary"?"summary":Jo,threadKey:a,createdAt:n,savedAt:s}},RSe=50,kSe=200,wSe=e=>typeof e!="number"||!Number.isFinite(e)||e<=0?RSe:Math.min(Math.floor(e),kSe),ESe=(e,t)=>{let r=Date.parse(e.createdAt),o=Date.parse(t.createdAt);return r!==o?o-r:t.messageId.localeCompare(e.messageId)},TSe=(e,t,r)=>{if(t==null||t==="")return!0;let o=Date.parse(e.createdAt),n=Date.parse(t);return o<n?!0:o>n?!1:r==null||r===""?!0:e.messageId.localeCompare(r)<0},Y0=(e,t)=>{let r=e.threadKey===void 0||e.threadKey===null?null:e.threadKey;return{available:!0,rows:Oi(e.projectId).map(n=>{let s=Wi(n);return{messageId:n.messageId,projectId:n.projectId,kind:Jo,threadKey:s.threadKey,createdAt:s.createdAt,savedAt:n.savedAt}}).filter(n=>r===null?!0:n.threadKey===r).filter(n=>TSe(n,e.beforeCreatedAt,e.beforeMessageId)).sort(ESe).slice(0,t)}},ji=e=>{let t=wSe(e.limit);if(!Nt().ok)return Y0(e,t);let o=Vn(e.projectId);if(!o.ok)return{...Y0(e,t),reason:o.reason};try{let n=[e.projectId,Jo],s=`SELECT message_id AS messageId, project_id AS projectId, kind,
              thread_key AS threadKey, created_at AS createdAt, saved_at AS savedAt
       FROM records
       WHERE project_id = ? AND kind = ?`;e.threadKey!==void 0&&e.threadKey!==null&&(s+=" AND thread_key = ?",n.push(e.threadKey)),e.beforeCreatedAt!==void 0&&e.beforeCreatedAt!==null&&e.beforeCreatedAt!==""&&(e.beforeMessageId!==void 0&&e.beforeMessageId!==null&&e.beforeMessageId!==""?(s+=" AND (created_at < ? OR (created_at = ? AND message_id < ?))",n.push(e.beforeCreatedAt,e.beforeCreatedAt,e.beforeMessageId)):(s+=" AND created_at < ?",n.push(e.beforeCreatedAt))),s+=" ORDER BY created_at DESC, message_id DESC LIMIT ?",n.push(t);let i=o.db.prepare(s).all(...n),a=[];for(let c of i){let d=bSe(c);d!==null&&a.push(d)}return{available:!0,rows:a}}catch{return Y0(e,t)}finally{qn(o.db)}}});var A_,X0,ISe,Yo,CSe,Z0,Q0=l(()=>{"use strict";A_=u(require("node:fs")),X0=u(require("node:path"));Z();Q();ISe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yo=e=>typeof e=="string"&&e.trim().length>0?e:null,CSe=e=>{try{let t=JSON.parse(A_.default.readFileSync(e,"utf8"));if(!ISe(t))return null;let r=Yo(t.taskId),o=Yo(t.projectId),n=Yo(t.status),s=Yo(t.createdAt),i=Yo(t.savedAt);if(r===null||o===null||n===null||s===null||i===null)return null;let a=t.threadKey,c=a==null?null:Yo(a);return{taskId:r,projectId:o,threadKey:c,writerAgent:Yo(t.writerAgent),status:n,promptSummary:typeof t.promptSummary=="string"?t.promptSummary:"",resultSummary:typeof t.resultSummary=="string"?t.resultSummary:"",promptBody:typeof t.promptBody=="string"?t.promptBody:null,resultBody:typeof t.resultBody=="string"?t.resultBody:null,createdAt:s,completedAt:t.completedAt===null||t.completedAt===void 0?null:Yo(t.completedAt),agentRunId:Yo(t.agentRunId),savedAt:i}}catch{return null}},Z0=e=>{let t;try{t=X0.default.join(U(e),Ti)}catch{return[]}if(!A_.default.existsSync(t))return[];let r=A_.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=CSe(X0.default.join(t,n.name));s!==null&&o.push(s)}return o}});var n9,s9,eO,tO,rO=l(()=>{"use strict";Tm();n9="ai.session",s9=e=>e.agentRunId!==null&&e.agentRunId.trim().length>0?e.agentRunId.trim():e.taskId,eO=e=>{let t=s9(e),r=e.resultSummary.trim().length>0?e.resultSummary:e.promptSummary;return{messageId:t,createdAt:e.createdAt,author:{kind:"bot",membershipId:null,displayName:e.writerAgent},kind:n9,entryKind:"session",session:{status:e.status,writerAgent:e.writerAgent,agentRunId:t},text:r,needsReply:!1,inReplyTo:null,states:[]}},tO=(e,t)=>t===Yl});var Mi,Mm=l(()=>{"use strict";Mi=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var LSe,oO,nO=l(()=>{"use strict";Tm();f_();Cm();Mm();C0();Xl();LSe=(e,t)=>e===null?"owner":t.has(e)?"bot":"member",oO=e=>{let t=e.message,r=Wi(e),o=y_(t),n=ve(t,["fromMembershipId","senderMembershipId","sender_membership_id"]),s=vi(t.kind)??ve(t,["messageKind"])??"chat.note",i=vi(t.summary)??Mi(e),a=LSe(n,o),c=ve(t,["inReplyTo","in_reply_to"]),d=c!==null?{inReplyTo:c,text:i}:a==="bot"?Em(i):{inReplyTo:null,text:i},p=Im(t)??ve(t,["senderDisplayName","sender_display_name"]);return{messageId:e.messageId,createdAt:r.createdAt,author:{kind:a,membershipId:n,displayName:p},kind:s,text:d.text,needsReply:s===w0,inReplyTo:d.inReplyTo,states:[]}}});var vSe,xSe,sO,iO,aO=l(()=>{"use strict";vSe=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?(Z|[+-]\d{2}(:?\d{2})?)$/,xSe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sO=e=>Buffer.from(JSON.stringify({t:e.t,id:e.id}),"utf8").toString("base64url"),iO=e=>{if(e==null||e.trim().length===0)return null;let t;try{let n=Buffer.from(e.trim(),"base64url").toString("utf8");t=JSON.parse(n)}catch{return"invalid"}if(!xSe(t))return"invalid";let r=t.t,o=t.id;return typeof r!="string"||typeof o!="string"||!vSe.test(r)||o.length===0||o.length>200?"invalid":{t:r,id:o}}});var i9,WSe,lO,cO=l(()=>{"use strict";P_();jm();Q0();rO();nO();aO();i9=(e,t)=>e.createdAt!==t.createdAt?e.createdAt<t.createdAt?1:-1:e.messageId<t.messageId?1:-1,WSe=(e,t,r)=>t==null||t===""||e.createdAt<t?!0:e.createdAt>t?!1:r==null||r===""?!0:e.messageId<r,lO=e=>{let t=iO(e.beforeCursor);if(t==="invalid")return{entries:[],nextBeforeCursor:null,hasMore:!1};let r=typeof e.limit=="number"&&Number.isFinite(e.limit)?Math.max(1,Math.floor(e.limit)):50,o=t?.t??null,n=t?.id??null,s=ji({projectId:e.projectId,threadKey:e.threadKey,beforeCreatedAt:o,beforeMessageId:n,limit:r+1}),i=[];for(let A of s.rows){let E=xm({projectId:e.projectId,messageId:A.messageId});if(E===null){i.push({messageId:A.messageId,createdAt:A.createdAt,author:{kind:"owner",membershipId:null,displayName:null},kind:"chat.note",text:"",needsReply:!1,inReplyTo:null,states:[]});continue}i.push(oO(E))}let a=[];for(let A of Z0(e.projectId)){if(!tO(A,e.threadKey))continue;let E=eO(A);WSe(E,o,n)&&a.push(E)}let c=[...i,...a].sort(i9),d=new Map;for(let A of c)d.has(A.messageId)||d.set(A.messageId,A);let p=[...d.values()].sort(i9),m=p.length>r,g=m?p.slice(0,r):p,y=g.length>0?g[g.length-1]:void 0,S=m&&y!==void 0?sO({t:y.createdAt,id:y.messageId}):null;return{entries:g,nextBeforeCursor:S,hasMore:m}}});var OSe,dO,a9=l(()=>{"use strict";cO();OSe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dO=e=>{if(!OSe(e.payload))return{ok:!1,errorCode:"invalid_payload",errorMessage:"project.history.page.request requires an object payload."};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=typeof e.payload.threadKey=="string"?e.payload.threadKey.trim():"";if(t.length===0||r.length===0)return{ok:!1,errorCode:"invalid_payload",errorMessage:"projectId and threadKey are required."};let o=typeof e.payload.beforeCursor=="string"?e.payload.beforeCursor:void 0,n=e.payload.limit,s=typeof n=="number"&&Number.isFinite(n)?Math.max(1,Math.min(100,Math.floor(n))):50;try{let i=lO({projectId:t,threadKey:r,beforeCursor:o,limit:s});return{ok:!0,projectId:t,threadKey:r,entries:i.entries,nextBeforeCursor:i.nextBeforeCursor,hasMore:i.hasMore}}catch(i){return{ok:!1,errorCode:"read_failed",errorMessage:i instanceof Error?i.message:"History page read failed."}}}});var pO,uO=l(()=>{"use strict";A0();Jn();g0();Q();h0();m_();pO=()=>({isHistoryEnabled:e=>{let t=lo(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>U(e),writeProjectSkillVersion:e=>Rm(e),readProjectSkillVersion:e=>m0(e),tombstoneProjectSkill:e=>f0(e),readProjectSkillTombstone:e=>y0(e),listProjectSkillIds:e=>P0(e)})});var l9,mO,gO=l(()=>{"use strict";ht();l9=e=>({[ie]:e,Accept:"application/json"}),mO=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:l9(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:l9(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var fO,yO=l(()=>{"use strict";Me();fO=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var hO,SO=l(()=>{"use strict";Me();hO=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(p=>p.createdAtMs)),i=n.length>=t,a=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!a&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":a?"idle":"max_interval",messageIds:n.map(p=>p.messageId)}}});var oc,__=l(()=>{"use strict";Me();oc=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var g9,f9,MSe,b_,PO=l(()=>{"use strict";Me();g9=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),f9=e=>e.trim().toLowerCase().replace(/\s+/g," "),MSe=(e,t)=>{let r=new Set(e.map(f9).filter(i=>i.length>0)),o=new Set(t.map(f9).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},b_=e=>{let t=e.nearDupJaccard??.6,r=g9(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(g9(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(MSe(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var AO,_O=l(()=>{"use strict";AO=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var bO,DSe,RO,HSe,kO,wO=l(()=>{"use strict";Me();bO=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},DSe=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,RO=e=>DSe.test(e),HSe=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,kO=e=>HSe.test(e)});var Nm,R_=l(()=>{"use strict";Nm=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var y9,Xo,h9,nc=l(()=>{"use strict";ft();y9=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,Xo=e=>{let t=fn(e),r=t.scrubbed.match(y9)?.length??0,o=t.scrubbed.replace(y9,"[redacted-email]");return{scrubbed:o,residualSecret:xd(o),replacementCount:t.replacementCount+r}},h9=e=>xd(e)});var S9,FSe,$Se,zSe,USe,P9,A9=l(()=>{"use strict";S9="source_message_ids",FSe=e=>Array.from(new Set(e.map(t=>t.trim()).filter(t=>t.length>0))),$Se=e=>e.trimStart().startsWith(`${S9}:`),zSe=e=>/^\s+-\s*/.test(e),USe=e=>e.reduce((t,r)=>$Se(r)?{kept:t.kept,skipping:!0}:t.skipping&&zSe(r)?t:{kept:[...t.kept,r],skipping:!1},{kept:[],skipping:!1}).kept,P9=e=>{let t=e.skillMarkdown.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return e.skillMarkdown;let r=t.indexOf(`
---`,3);if(r<0)return e.skillMarkdown;let o=t.slice(0,3),n=t.slice(3,r).replace(/^\r?\n/,"").split(/\r?\n/).filter((a,c,d)=>!(c===d.length-1&&a==="")),s=FSe(e.sourceMessageIds),i=[...USe(n),`${S9}: ${JSON.stringify(s)}`];return`${o}
${i.join(`
`)}${t.slice(r)}`}});var EO,TO,IO,Dm=l(()=>{"use strict";EO=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],TO={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},IO=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var CO,LO=l(()=>{"use strict";Dm();CO=(e,t)=>{let r=TO[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var BSe,co,xO=l(()=>{"use strict";LO();Me();BSe=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},co=e=>{let t=BSe(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=CO(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var VSe,_9,qSe,JSe,WO,Hm,k_=l(()=>{"use strict";Me();nc();VSe=/^[a-z0-9][a-z0-9-]{0,63}$/,_9=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let a=i.indexOf(":");if(a<=0)continue;let c=i.slice(0,a).trim(),d=i.slice(a+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},qSe=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,JSe=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},WO=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(h9(o))return{ok:!1,reason:"residual_secret"};let s=_9(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:a}=s,c=i.name??"";if(!VSe.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let p=i.version??"";if(p.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let m=JSe(i.source_message_ids??i.source_message_ids);if(m===null||m.length===0)return{ok:!1,reason:"missing_source_message_ids"};let g=qSe(a);return g<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:p,sourceMessageIds:m,stepCount:g,bodyBytes:n}},Hm=e=>(((_9(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var R9,YSe,po,w_,E_=l(()=>{"use strict";R9=require("node:crypto");Gn();Me();yO();SO();__();PO();_O();wO();R_();nc();A9();xO();k_();YSe=e=>Math.ceil(e.length/4),po=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),w_=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??YSe,a=e.messages.map(p=>p.text).join(`
`),c=(p,m,g)=>{r.push(Nm({projectId:t.projectId,episodeId:t.episodeId,fromState:p,toState:m,reason:g,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let p=0;p<16;p+=1){let m=oc({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let g=hO({messages:e.messages.map(A=>({messageId:A.messageId,createdAtMs:A.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),y=co({state:t.state,verdict:{kind:"close",ready:g.ready}});if(!y.ok)break;let S=t.state;t=po(t,y.nextState,g.ready?g.reason:null,{messageIds:g.ready?g.messageIds:t.messageIds,closedAtMs:g.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(A=>kO(A.text)),hasSuccessSignal:e.messages.some(A=>RO(A.text))}),c(S,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(m.capReached){let A=co({state:t.state,verdict:{kind:"draft_cap",reached:!0}});A.ok&&(c(t.state,A.nextState,"draft_cap_reached"),t=po(t,A.nextState,"draft_cap_reached"));break}let g=fO({tokensUsedToday:e.tokensUsedToday+n}),y=co({state:t.state,verdict:{kind:"budget",ok:g.ok}});if(!y.ok)break;let S=t.state;t=po(t,y.nextState,g.ok?"budget_ok":g.reason),c(S,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let g=Xo(a),y=co({state:t.state,verdict:{kind:"scrub",residualSecret:g.residualSecret}});if(!y.ok)break;let S=t.state;t=po(t,y.nextState,g.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:g.scrubbed}),c(S,t.state,t.reason);continue}if(t.state==="TRIAGE"){let g=bO({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),y=co({state:t.state,verdict:{kind:"qualify",ok:g.ok}});if(!y.ok)break;let S=t.state;t=po(t,y.nextState,g.reason),c(S,t.state,t.reason);continue}if(t.state==="DEDUP"){let g=Ge(t.scrubbedTranscript??a),y=b_({contentHash:g,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((y.action==="create_new"||y.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let S=co({state:t.state,verdict:{kind:"dedup",action:y.action}});if(!S.ok)break;let A=t.state;t=po(t,S.nextState,y.action,{contentHash:g,mergeDraftId:y.action==="update_draft"?y.draftId:t.mergeDraftId}),c(A,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let g=t.scrubbedTranscript??"",y=AO({estimatedInputTokens:i(g),inputTokenCap:12e3}),S=await e.deps.ownerLlm({scrubbedTranscript:g,similarDraftHints:[],mode:y});n+=S.tokensUsed;let A=co({state:t.state,verdict:{kind:"extract",ok:S.ok}});if(!A.ok)break;let E=t.state;S.ok&&(s=P9({skillMarkdown:S.skillMarkdown,sourceMessageIds:t.messageIds})),t=po(t,A.nextState,S.ok?"extract_ok":S.reason,{tokensUsed:t.tokensUsed+S.tokensUsed}),c(E,t.state,t.reason);continue}if(t.state==="VALIDATE"){let g=s??"",y=WO({skillMarkdown:g}),S=t.validateAttempts+(y.ok?0:1),A=co({state:t.state,verdict:{kind:"validate",ok:y.ok,attempts:y.ok?t.validateAttempts:Math.max(1,S)}});if(!A.ok)break;let E=t.state;if(y.ok){let I=Ge(g),f=Hm(g),P=b_({contentHash:I,name:y.name,stepLines:f,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(P.action==="skip_exact"){t=po(t,"SKIPPED_DEDUP","skip_exact",{contentHash:I,validateAttempts:S}),c(E,t.state,"skip_exact");break}let _=P.action==="update_draft"?P.draftId:t.mergeDraftId??(0,R9.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:_,skillMarkdown:g,episodeId:t.episodeId,sourceMessageIds:y.sourceMessageIds,name:y.name,description:y.description}),t=po(t,A.nextState,"validate_ok",{draftId:_,contentHash:o.contentHash,validateAttempts:S}),c(E,t.state,t.reason);break}if(A.nextState==="EXTRACT"&&(s=null),t=po(t,A.nextState,y.reason,{validateAttempts:S}),c(E,t.state,t.reason),A.nextState==="EXTRACT"&&S>1)break;continue}break}let d=oc({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var OO,jO,Fm,T_=l(()=>{"use strict";OO=u(require("node:fs")),jO=u(require("node:path"));pt();Z();Q();Fm=e=>{if(e.events.length===0)return;let t=ue(e.projectId),r=jO.default.join(t,Re);bt(r);let o=jO.default.join(r,kX),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;OO.default.appendFileSync(o,n,{mode:384});try{OO.default.chmodSync(o,384)}catch{}}});var sc,I_=l(()=>{"use strict";sc=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var T9,k9,w9,ZSe,QSe,MO,NO=l(()=>{"use strict";T9=require("node:crypto");Me();I_();nc();k9=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,w9=e=>e.toLowerCase().replace(/_/g," "),ZSe=(e,t)=>`sha256:${(0,T9.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,QSe=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},MO=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],a=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():w9(c.state),p=Xo(d);if(p.residualSecret){a+=1;continue}let m=`Avoid repeating this history failure (${w9(c.state)}).`,g=Xo(m);if(g.residualSecret){a+=1;continue}let y=k9(p.scrubbed.replace(/\s+/g," ").trim(),120),S=k9(g.scrubbed.replace(/\s+/g," ").trim(),280);if(y.length===0||S.length===0)continue;let A=sc(`${y}|${S}`);if(n.has(A))continue;n.add(A);let E=ZSe(y,S),I=`- **${y}:** ${S}`;s.length<t&&s.push(I),i.length<r&&i.push({id:QSe(c.episodeId,E),symptom:y,avoidance:S,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:E,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:a}}});var ePe,DO,HO=l(()=>{"use strict";I_();Me();ePe=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},DO=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?ePe(n[3]??""):[],i=new Set(s.map(m=>sc(m))),a=[...s],c=0;for(let m of e.newPitfallLines){let g=m.trim();if(g.length===0)continue;let y=g.startsWith("- ")?g:`- ${g}`,S=sc(y);if(!i.has(S)){if(a.length>=t)break;i.add(S),a.push(y),c+=1}}let d=a.length>0?`${a.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(g,y,S)=>`${y}${S}${d}`),appendedCount:c,totalPitfallBullets:a.length};let p=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${p}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:a.length}}});var FO,C9,I9,v_,$O,zO=l(()=>{"use strict";FO=u(require("node:fs")),C9=u(require("node:path"));Z();Q();I9="[project-history-skillgen]",v_=()=>({items:[],updatedAt:new Date(0).toISOString()}),$O=e=>{let t=C9.default.join(U(e),Re,l_);if(!FO.default.existsSync(t))return v_();try{let r=JSON.parse(FO.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(I9,"learned_pitfalls_corrupt",e),v_()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:v_().updatedAt}}catch(r){return console.error(I9,"learned_pitfalls_read_failed",e,r),v_()}}});var tPe,L9,v9=l(()=>{"use strict";tPe=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],L9=e=>tPe.includes(e)});var UO,BO=l(()=>{"use strict";v9();UO=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||L9(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var GO,$m,rPe,zm,x_,W_=l(()=>{"use strict";GO=u(require("node:fs")),$m=u(require("node:path"));Gn();pt();Z();Q();rPe=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),zm=e=>{if(!rPe(e.draftId))throw new Error("invalid_draft_id");let t=ue(e.projectId),r=$m.default.join(t,ne,_t,e.draftId);bt(r);let o=$m.default.join(r,zn),n=$m.default.join(r,Un),s=Ge(e.skillMarkdown);return se(o,e.skillMarkdown),se(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},x_=e=>{let t=ue(e),r=$m.default.join(t,ne,_t);return GO.default.existsSync(r)?GO.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var x9,KO,VO=l(()=>{"use strict";x9=u(require("node:path"));pt();Z();Q();KO=e=>{let t=ue(e.projectId),r=x9.default.join(t,Re,l_),o={...e.file,updatedAt:new Date().toISOString()};return se(r,`${JSON.stringify(o)}
`),o}});var qO,O9,W9,O_,oPe,Um,j_=l(()=>{"use strict";qO=u(require("node:fs")),O9=u(require("node:path"));Z();Q();W9="[project-history-skillgen]",O_=()=>({historyLearnedPitfalls:null,skillgenDraftsReview:null,updatedAt:new Date(0).toISOString()}),oPe=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.active!="boolean"||typeof t.openDraftCount!="number"||typeof t.maxOpenDrafts!="number"||typeof t.miningPaused!="boolean"||typeof t.notifiedAt!="string"||typeof t.summary!="string"?null:{active:t.active,openDraftCount:Math.max(0,t.openDraftCount),maxOpenDrafts:Math.max(0,t.maxOpenDrafts),miningPaused:t.miningPaused,notifiedAt:t.notifiedAt,summary:t.summary}},Um=e=>{let t=O9.default.join(U(e),Re,c_);if(!qO.default.existsSync(t))return O_();try{let r=JSON.parse(qO.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return console.error(W9,"flags_corrupt",e),O_();let o=r;return{historyLearnedPitfalls:o.historyLearnedPitfalls??null,skillgenDraftsReview:oPe(o.skillgenDraftsReview),updatedAt:typeof o.updatedAt=="string"?o.updatedAt:O_().updatedAt}}catch(r){return console.error(W9,"flags_read_failed",e,r),O_()}}});var j9,Bm,M_=l(()=>{"use strict";j9=u(require("node:path"));pt();Z();Q();Bm=e=>{let t=ue(e.projectId),r=j9.default.join(t,Re,c_),o={historyLearnedPitfalls:e.file.historyLearnedPitfalls,skillgenDraftsReview:e.file.skillgenDraftsReview??null,updatedAt:new Date().toISOString()};return se(r,`${JSON.stringify(o)}
`),o}});var YO,M9,JO,nPe,sPe,N_,XO,ZO=l(()=>{"use strict";YO=u(require("node:fs")),M9=u(require("node:path"));T_();NO();HO();Me();zO();R_();BO();W_();VO();j_();M_();JO="[project-history-skillgen]",nPe=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},sPe=e=>{try{let t=JSON.parse(YO.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},N_=e=>{try{Fm({projectId:e.projectId,events:[Nm({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},XO=e=>{let t=new Date(e.nowMs).toISOString();try{let r=UO({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=MO({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=sPe(e.draftWritten.metaPath),i=YO.default.readFileSync(e.draftWritten.skillPath,"utf8"),a=DO({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=a.appendedCount,a.skillMarkdown!==i&&zm({projectId:e.projectId,draftId:M9.default.basename(e.draftWritten.draftDir),skillMarkdown:a.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(JO,"pitfalls_draft_merge_failed",e.projectId,s),N_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=$O(e.projectId),i=nPe(s.items,o.localEntries);KO({projectId:e.projectId,file:{items:i,updatedAt:t}});let a=Um(e.projectId);return Bm({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},skillgenDraftsReview:a.skillgenDraftsReview,updatedAt:t}}),N_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(JO,"pitfalls_store_failed",e.projectId,s),N_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(JO,"pitfalls_attach_failed",e.projectId,r),N_({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var N9,QO,ej,tj=l(()=>{"use strict";N9=e=>e.length===0?"(none)":e.map(t=>`- ${t.name}: ${t.description}`).join(`
`),QO=e=>["You are preparing a reusable project skill from a scrubbed chat transcript.","Do NOT invent secrets. Summarize the procedure only.","Return a short reflection covering: goal, inputs, 3\u20138 concrete steps,","pitfalls, and how to verify success. Plain text, no SKILL.md yet.","","Similar existing drafts/skills to avoid overlap:",N9(e.similarDraftHints),"","Transcript:",e.scrubbedTranscript].join(`
`),ej=e=>{let t=e.reflection!==void 0&&e.reflection.trim().length>0?["","Prior reflection (use as outline):",e.reflection.trim(),""]:[""];return["Write ONE SKILL.md draft from the scrubbed transcript.","Output ONLY the markdown file: YAML frontmatter then body.","Frontmatter keys: name (kebab-case), description, version: 0.1.0, status: draft.","Do NOT write source_message_ids; the system adds the transcript message ids.","Body sections: When to use, Inputs, Steps (3\u20138, use placeholders for specifics),","Pitfalls, Verification.","Avoid overlapping similar drafts/skills listed below.","","Similar existing drafts/skills:",N9(e.similarDraftHints),...t,"Transcript:",e.scrubbedTranscript].join(`
`)}});var rj,oj=l(()=>{"use strict";rj=e=>{let t=e.trim();if(t.length===0)return null;let r=t.match(/```(?:markdown|md|skill)?\s*\n([\s\S]*?)```/i);if(r?.[1]!==void 0&&r[1].trim().length>0)return r[1].trim();let o=t.indexOf("---");if(o>=0){let n=t.slice(o).trim();if(/^---[\s\S]*?\n---/.test(n))return n}return t.includes("## Steps")||t.includes("## When to use")?t:null}});var F9,$9,iPe,aPe,lPe,D9,z9,cPe,H9,nj,sj=l(()=>{"use strict";F9=require("node:child_process"),$9=u(require("node:os"));oA();Me();tj();oj();iPe="cursor",aPe="codex",lPe=18e4,D9=e=>Math.ceil(e.length/4),z9=e=>new Promise(t=>{let r=Yt(e.writerAgent,e.prompt,Ae({}));if(r===null){t({ok:!1,reason:"writer_cli_unavailable",tokensUsed:0});return}let o=[],n=[],s=(0,F9.spawn)(r.command,[...r.args],{cwd:$9.default.homedir(),stdio:["ignore","pipe","pipe"]}),i=!1,a=d=>{i||(i=!0,clearTimeout(c),t(d))},c=setTimeout(()=>{s.kill("SIGTERM"),a({ok:!1,reason:"writer_timeout",tokensUsed:0})},e.timeoutMs);s.stdout.on("data",d=>{o.push(Buffer.from(d))}),s.stderr.on("data",d=>{n.push(Buffer.from(d))}),s.on("error",()=>a({ok:!1,reason:"writer_start_failed",tokensUsed:0})),s.on("close",()=>{let d=`${Buffer.concat(o).toString("utf8")}
${Buffer.concat(n).toString("utf8")}`;a({ok:!0,text:d,tokensUsed:D9(e.prompt)+D9(d)})})}),cPe=`---
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
`,H9=async(e,t,r)=>{let o=await e({writerAgent:iPe,prompt:t,timeoutMs:r});if(o.ok)return o;let n=await e({writerAgent:aPe,prompt:t,timeoutMs:r});return n.ok?n:{ok:!1,reason:`cursor:${o.reason};codex:${n.reason}`,tokensUsed:o.tokensUsed+n.tokensUsed}},nj=(e={})=>{let t=e.runCli??z9,r=e.timeoutMs??lPe,o=e.dryRun===!0||process.env[W0]==="1";return async n=>{if(o)return{ok:!0,skillMarkdown:cPe,tokensUsed:1};let s,i=0;if(n.mode==="reflect_then_write"){let d=await H9(t,QO({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints}),r);if(i+=d.tokensUsed,!d.ok)return{ok:!1,reason:d.reason,tokensUsed:i};s=d.text}let a=await H9(t,ej({scrubbedTranscript:n.scrubbedTranscript,similarDraftHints:n.similarDraftHints,mode:n.mode,reflection:s}),r);if(i+=a.tokensUsed,!a.ok)return{ok:!1,reason:a.reason,tokensUsed:i};let c=rj(a.text);return c===null?{ok:!1,reason:"empty_or_unparseable_skill_markdown",tokensUsed:i}:{ok:!0,skillMarkdown:c,tokensUsed:i}}}});var U9,B9=l(()=>{"use strict";Dm();U9=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&IO.includes(o.state))return o}return null}});var Ni,Gm=l(()=>{"use strict";Ni=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var Di,D_,G9,K9=l(()=>{"use strict";Di=u(require("node:fs")),D_=u(require("node:path"));Z();Q();k_();G9=e=>{let t=D_.default.join(U(e),ne,_t);if(!Di.default.existsSync(t))return[];let r=[];for(let o of Di.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=D_.default.join(t,o.name,zn),s=D_.default.join(t,o.name,Un);if(Di.default.existsSync(n))try{let i=Di.default.readFileSync(n,"utf8"),a="",c=o.name;if(Di.default.existsSync(s)){let d=JSON.parse(Di.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(a=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(a.length===0)continue;r.push({id:o.name,contentHash:a,name:c,stepLines:Hm(i)})}catch{}}return r}});var Km,ij,V9,q9=l(()=>{"use strict";Km=u(require("node:fs")),ij=u(require("node:path"));Z();Q();V9=e=>{let t=ij.default.join(U(e),ne);if(!Km.default.existsSync(t))return[];let r=[];for(let o of Km.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=ij.default.join(t,o.name,Or);if(Km.default.existsSync(n))try{let s=JSON.parse(Km.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var dPe,aj,lj=l(()=>{"use strict";Mm();Wm();dPe=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,aj=e=>{let t=Oi(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||dPe(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:Mi(o)})}return r}});var J9,Y9=l(()=>{"use strict";J9=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var X9,cj,dj=l(()=>{"use strict";X9=u(require("node:path"));pt();Z();Q();cj=e=>{let t=ue(e.projectId),r=X9.default.join(t,Re,a_),o={...e.budget,updatedAt:new Date().toISOString()};return se(r,`${JSON.stringify(o)}
`),o}});var Z9,pj,uj=l(()=>{"use strict";Z9=u(require("node:path"));pt();Z();Q();pj=e=>{let t=ue(e.projectId),r=Z9.default.join(t,Re,i_),o={...e.file,updatedAt:new Date().toISOString()};return se(r,`${JSON.stringify(o)}
`),o}});var Q9,eZ=l(()=>{"use strict";T_();Y9();dj();uj();Q9=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,a=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],a=t.episode.lastMessageAtMs??a),pj({projectId:n,file:{episodes:J9(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:a,updatedAt:new Date(s).toISOString()}}),cj({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),Fm({projectId:n,events:t.metrics})}});var H_,mj=l(()=>{"use strict";Me();j_();M_();H_=e=>{try{let t=new Date(e.nowMs).toISOString(),r=e.maxOpenDrafts??20,o=Um(e.projectId),{reviewFlag:n}=e;Bm({projectId:e.projectId,file:{historyLearnedPitfalls:o.historyLearnedPitfalls,skillgenDraftsReview:n.miningPaused?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!0,notifiedAt:t,summary:`Mining paused: ${n.draftWaitingCount}/${r} open skill drafts await review`}:n.draftWaitingCount>0?{active:!0,openDraftCount:n.draftWaitingCount,maxOpenDrafts:r,miningPaused:!1,notifiedAt:t,summary:`${n.draftWaitingCount} skill draft(s) await owner review`}:null,updatedAt:t}})}catch{}}});var F_,gj=l(()=>{"use strict";F_=e=>new Date(e).toISOString().slice(0,10)});var $_,tZ=l(()=>{"use strict";gj();$_=e=>({dayKey:F_(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var fj,oZ,rZ,pPe,yj,hj=l(()=>{"use strict";fj=u(require("node:fs")),oZ=u(require("node:path"));tZ();Z();Q();gj();rZ="[project-history-skillgen]",pPe=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=F_(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},yj=e=>{let t=oZ.default.join(U(e.projectId),Re,a_);if(!fj.default.existsSync(t))return $_(e.nowMs);try{let r=JSON.parse(fj.default.readFileSync(t,"utf8")),o=pPe(r,e.nowMs);return o===null?(console.error(rZ,"budget_corrupt",e.projectId),$_(e.nowMs)):o}catch(r){return console.error(rZ,"budget_read_failed",e.projectId,r),$_(e.nowMs)}}});var z_,nZ=l(()=>{"use strict";z_=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var Sj,iZ,sZ,uPe,mPe,gPe,Pj,Aj=l(()=>{"use strict";Sj=u(require("node:fs")),iZ=u(require("node:path"));nZ();Dm();Z();Q();sZ="[project-history-skillgen]",uPe=e=>typeof e=="string"&&EO.includes(e),mPe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&uPe(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},gPe=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(mPe);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},Pj=e=>{let t=iZ.default.join(U(e),Re,i_);if(!Sj.default.existsSync(t))return z_();try{let r=JSON.parse(Sj.default.readFileSync(t,"utf8")),o=gPe(r);return o===null?(console.error(sZ,"episodes_corrupt",e),z_()):o}catch(r){return console.error(sZ,"episodes_read_failed",e,r),z_()}}});var lZ,fPe,yPe,hPe,aZ,_j,bj=l(()=>{"use strict";lZ=require("node:crypto");E_();ZO();sj();Mm();B9();Gm();Wm();K9();q9();lj();Jn();eZ();mj();Me();__();hj();Aj();W_();fPe="[project-history-skillgen]",yPe=e=>e!==void 0?e:process.env[x0]==="0"?null:nj(),hPe=(e,t)=>{let r=new Map;for(let o of Oi(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:Mi(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},aZ=e=>{let t=e.messages[0],r=e.messages[e.messages.length-1];return{episodeId:(0,lZ.randomUUID)(),projectId:e.projectId,state:"CAPTURING",messageIds:e.messages.map(o=>o.messageId),startedAtMs:t.createdAtMs,lastMessageAtMs:r.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}},_j=(e={})=>{let t=yPe(e.ownerLlm),r=e.nowMs??Date.now;return async o=>{try{let n=lo(o.projectId);if(!Ni(n?.state))return;let s=r(),i=Pj(o.projectId),a=yj({projectId:o.projectId,nowMs:s}),c=aj({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=x_(o.projectId),p=oc({openDraftCount:d,maxOpenDrafts:20});H_({projectId:o.projectId,reviewFlag:p,nowMs:s});let m=U9(i.episodes,o.projectId);if(p.miningPaused&&m!==null&&m.state==="EPISODE_READY"){let S=new Set(m.messageIds),A=c.filter(E=>!S.has(E.messageId));A.length>0&&(m=aZ({projectId:o.projectId,messages:A}))}else if(m===null){if(c.length===0)return;m=aZ({projectId:o.projectId,messages:c})}else if(m.state==="CAPTURING"&&c.length>0){let S=new Set(m.messageIds),A=[...m.messageIds],E=m.lastMessageAtMs;for(let I of c)S.has(I.messageId)||(A.push(I.messageId),S.add(I.messageId),E=Math.max(E,I.createdAtMs));m={...m,messageIds:A,lastMessageAtMs:E}}let g=hPe(o.projectId,m.messageIds);if(g.length===0)return;let y=await w_({episode:m,messages:g,tokensUsedToday:a.tokensUsedToday,lastClosedAtMs:a.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:zm,listDraftFingerprints:()=>G9(o.projectId),listPublishedFingerprints:()=>V9(o.projectId),openDraftCount:()=>x_(o.projectId)}});if(Q9({projectId:o.projectId,episodesFile:i,budget:a,result:y,nowMs:s}),H_({projectId:o.projectId,reviewFlag:y.reviewFlag,nowMs:s}),y.draftWritten!==null&&y.episode.state==="AWAITING_REVIEW"){let S=[...i.episodes.filter(A=>A.episodeId!==y.episode.episodeId),y.episode];XO({projectId:o.projectId,successEpisode:y.episode,episodes:S,draftWritten:y.draftWritten,nowMs:s})}}catch(n){console.error(fPe,"run_failed",o.projectId,n)}}}});var U_,Rj,kj,cZ,wj=l(()=>{"use strict";U_=u(require("node:path"));Z();Rj=(e,...t)=>{if(typeof e!="string"||e.trim().length===0)throw new Error("invalid_project_data_dir");for(let s of t)if(typeof s!="string"||s.trim().length===0)throw new Error("empty_purge_path_segment");let r=U_.default.join(e,...t),o=U_.default.resolve(e);if(U_.default.resolve(r)===o)throw new Error("purge_target_is_project_data_dir");return r},kj=e=>({drafts:Rj(e,ne,_t),skillgen:Rj(e,Re),outcomes:Rj(e,wX)}),cZ=e=>{let t=kj(e);return[t.drafts,t.skillgen,t.outcomes]}});var dZ,B_,Ej=l(()=>{"use strict";dZ=u(require("node:fs"));wj();Q();B_=e=>{let t=U(e);return cZ(t).some(r=>dZ.default.existsSync(r))}});var Tj,pZ,uZ=l(()=>{"use strict";Tj=u(require("node:fs"));X();Ej();ql();pZ=()=>{let e=z().projectDataDir;if(!Tj.default.existsSync(e))return[];let t=[];for(let r of Tj.default.readdirSync(e))At(r)&&B_(r)&&t.push(r);return t}});var mZ,gZ=l(()=>{"use strict";mZ=e=>e==="purged"||e==="nothing_to_purge"||e==="purge_failed"});var fZ,yZ=l(()=>{"use strict";fZ=e=>e.cloudState.kind!=="known"?"skipped_unknown":e.cloudState.state!=="off"?"history_on":e.hasPurgeTargets?"purge":"nothing_to_purge"});var SPe,hZ,SZ=l(()=>{"use strict";ht();SPe=["off","on_configuring","on_ready","degraded"],hZ=async e=>{try{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history`,{method:"GET",headers:{[ie]:e.cloudApi.pairingToken,Accept:"application/json"},signal:AbortSignal.timeout(3e4)});if(!t.ok)return{kind:"unknown",reason:`http_${t.status}`};let r=await t.json();if(typeof r!="object"||r===null||r.ok!==!0)return{kind:"unknown",reason:"malformed_body"};let o=r.state;return typeof o!="string"||!SPe.includes(o)?{kind:"unknown",reason:"unknown_state"}:{kind:"known",state:o}}catch{return{kind:"unknown",reason:"fetch_failed"}}}});var Cj,Ij,Lj,vj=l(()=>{"use strict";Cj=u(require("node:fs"));wj();Q();Ij=e=>Cj.default.existsSync(e)?(Cj.default.rmSync(e,{recursive:!0,force:!0}),!0):!1,Lj=e=>{let t=kj(U(e.projectId));return{removedDrafts:Ij(t.drafts),removedSkillgen:Ij(t.skillgen),removedOutcomes:Ij(t.outcomes)}}});var G_,PZ,AZ=l(()=>{"use strict";yZ();SZ();Ej();Gm();Jn();vj();G_="[project-history-off-purge]",PZ=async e=>{let t=e.deps?.fetchCloudState??hZ,r=e.deps?.hasPurgeTargets??B_,o=e.deps?.purge??Lj,n=e.deps?.isLocalOn??(a=>Ni(lo(a)?.state)),s=e.deps?.markLocalOff??(a=>{Ql({projectId:a,state:"off"})}),i;try{let a=e.cloudApi===null?{kind:"unknown",reason:"no_cloud_api"}:await t({cloudApi:e.cloudApi,projectId:e.projectId}),c=a.kind==="known"&&a.state==="off",d=c?r(e.projectId):!1,p=fZ({cloudState:a,hasPurgeTargets:d}),m=!1;if(c&&n(e.projectId))try{s(e.projectId),m=!0}catch(g){console.error(G_,"mark_off_failed",e.projectId,g)}if(p==="purge"||p==="nothing_to_purge"&&m)try{o({projectId:e.projectId}),i=p==="purge"?"purged":"nothing_to_purge"}catch(g){console.error(G_,"purge_failed",e.projectId,g),i="purge_failed"}else i=p}catch(a){console.error(G_,"reconcile_failed",e.projectId,a),i="skipped_unknown"}return i!=="history_on"&&console.info(G_,`outcome=${i}`,`projectId=${e.projectId}`),i}});var K_,xj,Wj=l(()=>{"use strict";Gn();te();Pr();gO();uO();bj();Jn();uZ();gZ();AZ();K_="[project-history-tick]",xj=async(e={})=>{let t=e.listProjectIds?.()??$0(),r=e.listPurgeCandidateIds?.()??pZ(),o=new Set(t),n=[...t,...r.filter(m=>!o.has(m))];if(n.length===0)return;let s=B(),i=e.cloudApi!==void 0?e.cloudApi:s===null?null:q({wsUrl:s.wsUrl,pairingToken:s.pairingToken}),a=pO(),c=e.pullSkills??u_,d=e.runSkillgen??_j({...e.ownerLlm!==void 0?{ownerLlm:e.ownerLlm}:{}}),p=e.reconcileOffPurge??PZ;for(let m of n){let g="skipped_unknown";try{g=await p({projectId:m,cloudApi:i})}catch(y){console.error(K_,"off_purge_failed",m,y)}if(!mZ(g)&&o.has(m)){try{await d({projectId:m})}catch(y){console.error(K_,"skillgen_failed",m,y)}if(i===null){console.error(K_,"pull_skipped_no_cloud_api",m);continue}try{await c({projectId:m,deps:{history:a,awcPublished:mO(i)}})}catch(y){console.error(K_,"pull_failed",m,y)}}}}});var Oj,bZ=l(()=>{"use strict";Me();Wj();Oj=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>xj());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var RZ=l(()=>{"use strict";E_()});var kZ=l(()=>{"use strict";xi();S_();Zl();Z();vm();Q()});var jj,Mj=l(()=>{"use strict";jm();Yr();Zl();xi();jj=e=>{let t=Nt();if(t.ok){let n=Vn(e.projectId);if(n.ok)try{let s=n.db.prepare(`SELECT DISTINCT thread_key AS threadKey
             FROM records
             WHERE project_id = ? AND kind = ? AND thread_key IS NOT NULL
             ORDER BY thread_key ASC`).all(e.projectId,Jo),i=[];for(let a of s){let c=a.threadKey;typeof c=="string"&&c.length>0&&i.push(c)}return{available:!0,threadKeys:i}}catch{}finally{qn(n.db)}else return{available:!1,threadKeys:[],reason:n.reason}}let r=ji({projectId:e.projectId,limit:200}),o=[...new Set(r.rows.map(n=>n.threadKey).filter(n=>typeof n=="string"&&n.length>0))].sort();return{available:r.available,threadKeys:o,reason:t.ok?void 0:t.reason}}});var PPe,APe,_Pe,Nj,wZ=l(()=>{"use strict";Yr();P_();ql();jm();Mj();PPe=/^\/api\/local\/projects\/([^/]+)\/chats$/,APe=/^\/api\/local\/projects\/([^/]+)\/chats\/([^/]+)\/messages$/,_Pe=e=>{if(e===null||e==="")return;let t=Number.parseInt(e,10);return Number.isFinite(t)?t:void 0},Nj=e=>{let t=PPe.exec(e.pathname);if(t!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(t[1]??"");if(!At(o))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;let n=Nt(),s=jj({projectId:o});return n.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKeys:s.threadKeys}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:n.reason,threadKeys:s.threadKeys}),!0)}let r=APe.exec(e.pathname);if(r!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let o=decodeURIComponent(r[1]??""),n=decodeURIComponent(r[2]??"");if(!At(o)||n.length===0)return e.sendJson(e.response,400,{ok:!1,error:"invalid_path"}),!0;let s=new URL(e.requestUrl,"http://127.0.0.1").searchParams,i=s.get("before"),a=s.get("beforeMessageId"),c=_Pe(s.get("limit")),d=Nt(),m=ji({projectId:o,threadKey:n,beforeCreatedAt:i,beforeMessageId:a,limit:c}).rows.map(g=>{let y=xm({projectId:o,messageId:g.messageId});return{messageId:g.messageId,threadKey:g.threadKey,createdAt:g.createdAt,savedAt:g.savedAt,message:y?.message??null}});return d.ok?(e.sendJson(e.response,200,{ok:!0,projectId:o,threadKey:n,messages:m}),!0):(e.sendJson(e.response,503,{ok:!1,error:"index_unavailable",reason:d.reason,projectId:o,threadKey:n,messages:m}),!0)}return!1}});var Yn,V_,EZ,bPe,RPe,Vm,Hi,qm=l(()=>{"use strict";Yn=u(require("node:fs")),V_=u(require("node:path"));Z();Q();EZ=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),bPe=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.trim().length>0).map(t=>t.trim().toLowerCase()):[],RPe=e=>e==="Computer"?"Computer":"History",Vm=e=>{let t=V_.default.join(U(e),ne,_t);if(!Yn.default.existsSync(t))return[];let r=[];for(let o of Yn.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||!EZ(o.name))continue;let n=V_.default.join(t,o.name,zn);if(Yn.default.existsSync(n))try{let s=Yn.default.readFileSync(n,"utf8"),i=V_.default.join(t,o.name,Un),a=o.name,c="",d=[],p="History",m=Yn.default.statSync(n).mtime.toISOString();if(Yn.default.existsSync(i)){let g=JSON.parse(Yn.default.readFileSync(i,"utf8"));typeof g.name=="string"&&g.name.trim()&&(a=g.name.trim()),typeof g.description=="string"&&(c=g.description),d=bPe(g.tags),p=RPe(g.source),typeof g.updatedAt=="string"&&g.updatedAt.length>0&&(m=g.updatedAt)}r.push({id:o.name,title:a,body:s,description:c,tags:d,source:p,updatedAt:m,pathLabel:`skills/_drafts/${o.name}`})}catch{}}return r.sort((o,n)=>n.updatedAt.localeCompare(o.updatedAt))},Hi=(e,t)=>EZ(t)?Vm(e).find(r=>r.id===t)??null:null});var Dj,q_,kPe,Hj,Fj=l(()=>{"use strict";Dj=u(require("node:fs")),q_=u(require("node:path"));Gn();pt();Z();Q();qm();kPe=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Hj=e=>{if(!kPe(e.draftId))throw new Error("invalid_draft_id");let t=Hi(e.projectId,e.draftId);if(t===null)throw new Error("draft_not_found");let r=q_.default.join(U(e.projectId),ne,_t,e.draftId),o=q_.default.join(r,zn),n=q_.default.join(r,Un),s=e.title.trim()||t.title,i=e.body,a=(e.tags??t.tags).map(y=>y.trim().toLowerCase()).filter(y=>y.length>0),c=Ge(i),d=new Date().toISOString(),p="",m=[],g=t.description;if(Dj.default.existsSync(n))try{let y=JSON.parse(Dj.default.readFileSync(n,"utf8"));typeof y.episodeId=="string"&&(p=y.episodeId),Array.isArray(y.sourceMessageIds)&&(m=y.sourceMessageIds.filter(S=>typeof S=="string")),typeof y.description=="string"&&(g=y.description)}catch{}return se(o,i),se(n,`${JSON.stringify({draftId:e.draftId,episodeId:p,name:s,description:g,sourceMessageIds:m,contentHash:c,status:"draft",tags:a,source:t.source,updatedAt:d})}
`),{id:e.draftId,title:s,body:i,description:g,tags:a,source:t.source,updatedAt:d,pathLabel:`skills/_drafts/${e.draftId}`}}});var $j,TZ,wPe,Jm,J_=l(()=>{"use strict";$j=u(require("node:fs")),TZ=u(require("node:path"));Z();Q();wPe=e=>e.length>0&&!e.startsWith(".")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Jm=e=>{if(!wPe(e.draftId))throw new Error("invalid_draft_id");let t=TZ.default.join(U(e.projectId),ne,_t,e.draftId);if(!$j.default.existsSync(t))throw new Error("draft_not_found");$j.default.rmSync(t,{recursive:!0,force:!1})}});var ic,Y_,IZ,EPe,zj,Uj=l(()=>{"use strict";ic=u(require("node:fs")),Y_=u(require("node:path"));pt();J_();qm();Z();Q();m_();IZ=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),EPe=(e,t)=>{let r=Y_.default.join(U(e),ne,t),o=Y_.default.join(r,Or);if(ic.default.existsSync(o))try{let s=JSON.parse(ic.default.readFileSync(o,"utf8"));if(typeof s.version=="number"&&Number.isInteger(s.version))return s.version+1}catch{}if(!ic.default.existsSync(r))return 1;let n=0;for(let s of ic.default.readdirSync(r)){let i=/^v(\d+)\.md$/.exec(s);i&&(n=Math.max(n,Number.parseInt(i[1]??"0",10)))}return n+1},zj=e=>{let t=Hi(e.projectId,e.draftId);if(t===null)throw new Error("draft_not_found");let r=e.body??t.body,o=(e.title??t.title).trim()||t.title;if(!r.trim()||!o.trim())throw new Error("draft_incomplete");let n=IZ(e.draftId)?e.draftId:`skill-${e.draftId}`.replace(/[^a-zA-Z0-9_-]/g,"-").slice(0,64);if(!IZ(n))throw new Error("invalid_project_skill_id");let s=EPe(e.projectId,n),i=Rm({projectId:e.projectId,skillId:n,version:s,body:r});try{let a=Y_.default.join(U(e.projectId),ne,n,Or),c=JSON.parse(ic.default.readFileSync(a,"utf8"));se(a,`${JSON.stringify({...c,name:o,version:c.version??s,contentHash:c.contentHash??i.contentHash,updatedAt:new Date().toISOString()})}
`)}catch{}return Jm({projectId:e.projectId,draftId:e.draftId}),{skillId:n,version:s,path:i.path}}});var TPe,IPe,CPe,CZ,LZ=l(()=>{"use strict";TPe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IPe=`:root{
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
`,CPe=`(()=>{
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
`,CZ=e=>{let t=JSON.stringify({projectId:e.projectId,projectName:e.projectName,online:e.online,drafts:e.drafts.map(r=>({id:r.id,title:r.title,body:r.body,tags:r.tags,source:r.source,updated:r.updatedAt,pathLabel:r.pathLabel}))}).replaceAll("<","\\u003c");return`<!doctype html>
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
      <a href="/project?id=${encodeURIComponent(e.projectId)}">${TPe(e.projectName||"Project")}</a>
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
<script>${CPe}</script>
</body>
</html>`}});var LPe,vPe,xPe,WPe,vZ,xZ,Bj,WZ=l(()=>{"use strict";LZ();J_();ql();qm();Uj();Fj();LPe=/^\/project\/skill-drafts$/,vPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts$/,xPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)$/,WPe=/^\/api\/local\/projects\/([^/]+)\/skill-drafts\/([^/]+)\/publish$/,vZ=async e=>{let t=await e.readBody(e.request);if(!t.trim())return{};let r=JSON.parse(t);if(r===null||typeof r!="object"||Array.isArray(r))throw new Error("invalid_json");return r},xZ=e=>{let t=e instanceof Error?e.message:"error";return t==="draft_not_found"?{status:404,code:t}:t==="invalid_draft_id"||t==="invalid_project_id"||t==="draft_incomplete"||t==="invalid_project_skill_id"||t==="invalid_json"?{status:400,code:t}:{status:500,code:"error"}},Bj=async e=>{if(LPe.test(e.pathname)){if(e.method!=="GET")return e.response.writeHead(405),e.response.end(),!0;let s=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("projectId")??"";if(!At(s))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;let i=[];try{i=Vm(s)}catch{i=[]}let a=e.resolveProjectName(s)??s.slice(0,8);return e.sendHtml(e.response,CZ({projectId:s,projectName:a,online:e.online,drafts:i})),!0}let t=WPe.exec(e.pathname);if(t!==null){if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let n=decodeURIComponent(t[1]??""),s=decodeURIComponent(t[2]??"");if(!At(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{let i=await vZ(e),a=zj({projectId:n,draftId:s,title:typeof i.title=="string"?i.title:void 0,body:typeof i.body=="string"?i.body:void 0});e.sendJson(e.response,200,{ok:!0,...a})}catch(i){let a=xZ(i);e.sendJson(e.response,a.status,{ok:!1,error:a.code})}return!0}let r=xPe.exec(e.pathname);if(r!==null){let n=decodeURIComponent(r[1]??""),s=decodeURIComponent(r[2]??"");if(!At(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{if(e.method==="GET"){let i=Hi(n,s);return i===null?(e.sendJson(e.response,404,{ok:!1,error:"draft_not_found"}),!0):(e.sendJson(e.response,200,{ok:!0,draft:i}),!0)}if(e.method==="PUT"){let i=await vZ(e),a=Hj({projectId:n,draftId:s,title:typeof i.title=="string"?i.title:"",body:typeof i.body=="string"?i.body:"",tags:Array.isArray(i.tags)?i.tags.filter(c=>typeof c=="string"):void 0});return e.sendJson(e.response,200,{ok:!0,draft:a}),!0}if(e.method==="DELETE")return Jm({projectId:n,draftId:s}),e.sendJson(e.response,200,{ok:!0}),!0;e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"})}catch(i){let a=xZ(i);e.sendJson(e.response,a.status,{ok:!1,error:a.code})}return!0}let o=vPe.exec(e.pathname);if(o!==null){if(e.method!=="GET")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let n=decodeURIComponent(o[1]??"");if(!At(n))return e.sendJson(e.response,400,{ok:!1,error:"invalid_project_id"}),!0;try{let s=Vm(n);e.sendJson(e.response,200,{ok:!0,projectId:n,drafts:s})}catch{e.sendJson(e.response,500,{ok:!1,error:"could_not_read_drafts"})}return!0}return!1}});var Kj,DZ,OZ,OPe,Gj,jZ,jPe,MZ,MPe,NZ,NPe,Ym,HZ=l(()=>{"use strict";Kj=u(require("node:fs")),DZ=u(require("node:path"));pt();Gm();Jn();Z();Q();nc();OZ="[project-history-ai-session]",OPe=280,Gj=e=>e.length>0&&e.length<=200&&!e.includes("/")&&!e.includes("\\")&&!e.includes("..")&&!e.startsWith("."),jZ=e=>{let t=e.trim().replace(/\s+/g," ").slice(0,OPe);if(t.length===0)return"";let r=Xo(t);return r.residualSecret?"[redacted]":r.scrubbed},jPe=e=>{if(e.length===0)return"";let t=Xo(e);return t.residualSecret?"[redacted]":t.scrubbed},MZ=e=>e===null?null:jPe(e),MPe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),NZ=e=>typeof e!="string"?null:e,NPe=e=>{try{if(!Kj.default.existsSync(e))return null;let t=JSON.parse(Kj.default.readFileSync(e,"utf8"));if(!MPe(t))return null;let r=typeof t.taskId=="string"&&t.taskId.trim().length>0?t.taskId.trim():null,o=typeof t.projectId=="string"&&t.projectId.trim().length>0?t.projectId.trim():null,n=typeof t.status=="string"&&t.status.trim().length>0?t.status.trim():null,s=typeof t.createdAt=="string"&&t.createdAt.trim().length>0?t.createdAt.trim():null,i=typeof t.savedAt=="string"&&t.savedAt.trim().length>0?t.savedAt.trim():null;if(r===null||o===null||n===null||s===null||i===null)return null;let a=t.threadKey,c=a==null?null:typeof a=="string"&&a.trim().length>0?a.trim():null;return{taskId:r,projectId:o,threadKey:c,writerAgent:typeof t.writerAgent=="string"&&t.writerAgent.trim().length>0?t.writerAgent.trim():null,status:n,promptSummary:typeof t.promptSummary=="string"?t.promptSummary:"",resultSummary:typeof t.resultSummary=="string"?t.resultSummary:"",promptBody:NZ(t.promptBody),resultBody:NZ(t.resultBody),createdAt:s,completedAt:t.completedAt===null||t.completedAt===void 0?null:typeof t.completedAt=="string"&&t.completedAt.trim().length>0?t.completedAt.trim():null,agentRunId:typeof t.agentRunId=="string"&&t.agentRunId.trim().length>0?t.agentRunId.trim():null,savedAt:i}}catch{return null}},Ym=e=>{let t=e.projectId.trim(),r=e.taskId.trim();if(!Gj(r))return{ok:!1,reason:"invalid_task_id"};let o=lo(t);if(o===null)return{ok:!1,reason:"history_unknown"};if(!Ni(o.state))return{ok:!1,reason:"history_off"};let n=new Date().toISOString(),s=typeof e.agentRunId=="string"&&e.agentRunId.trim().length>0?e.agentRunId.trim():r,i=s.length>0&&Gj(s)?s:r;if(!Gj(i))return{ok:!1,reason:"invalid_task_id"};let a;try{a=ue(t)}catch(A){return console.error(OZ,"write_failed",t,r,A),{ok:!1,reason:"write_failed"}}let c=DZ.default.join(a,Ti,`${i}.json`),d=NPe(c),p=e.promptBody!==void 0?MZ(e.promptBody):d?.promptBody??null,m=e.resultBody!==void 0?MZ(e.resultBody):d?.resultBody??null,g=typeof e.promptSummary=="string"&&e.promptSummary.trim().length>0?e.promptSummary:p??d?.promptSummary??"",y=typeof e.resultSummary=="string"&&e.resultSummary.trim().length>0?e.resultSummary:m??d?.resultSummary??"",S={taskId:r,projectId:t,threadKey:typeof e.threadKey=="string"&&e.threadKey.trim().length>0?e.threadKey.trim():d?.threadKey??null,writerAgent:typeof e.writerAgent=="string"&&e.writerAgent.trim().length>0?e.writerAgent.trim():d?.writerAgent??null,status:e.status.trim()||d?.status||"completed",promptSummary:jZ(g),resultSummary:jZ(y),promptBody:p,resultBody:m,createdAt:typeof e.createdAt=="string"&&e.createdAt.trim().length>0?e.createdAt.trim():d?.createdAt??n,completedAt:e.completedAt===void 0?d?.completedAt??n:e.completedAt===null?null:e.completedAt.trim()||null,agentRunId:s,savedAt:n};try{return se(c,`${JSON.stringify(S,null,2)}
`),{ok:!0,record:S}}catch(A){return console.error(OZ,"write_failed",t,r,A),{ok:!1,reason:"write_failed"}}}});var FZ=l(()=>{"use strict"});var $Z=l(()=>{"use strict";FZ()});var X_=l(()=>{"use strict";ql();Q();m_();g0();h0();A0();F0();t9();a9();Me();uO();gO();Wj();Gn();bZ();Jn();Me();SO();yO();wO();nc();PO();_O();sj();tj();oj();mj();k_();W_();__();R_();vj();LO();xO();E_();RZ();Dm();vm();Wm();Mm();lj();Aj();uj();hj();dj();T_();bj();Gm();I_();BO();NO();HO();ZO();zO();VO();j_();M_();Me();S_();kZ();jm();P_();Mj();wZ();Zl();Cm();Z();j0();v0();f_();U0();K0();aO();cO();nO();qm();Fj();J_();Uj();WZ();HZ();Q0();rO();Z();$Z()});var ir,DPe,zZ,UZ,Vj,qj,Jj,Yj,Xj,Zj,Qj=l(()=>{"use strict";ir=require("node:crypto"),DPe=Buffer.from("302a300506032b6570032100","hex"),zZ=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},UZ=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,ir.createPublicKey)({key:Buffer.concat([DPe,t]),format:"der",type:"spki"})},Vj=()=>{let{publicKey:e,privateKey:t}=(0,ir.generateKeyPairSync)("ed25519");return{publicKeyRaw:zZ(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},qj=e=>(0,ir.createPrivateKey)(e),Jj=(e,t)=>(0,ir.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),Yj=(e,t,r)=>{try{let o=UZ(e);return(0,ir.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},Xj=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,Zj=()=>(0,ir.randomBytes)(32).toString("base64url")});var Zo,Z_,BZ,HPe,FPe,Q_,eM,tM,GZ=l(()=>{"use strict";Zo=u(require("node:fs")),Z_=u(require("node:path"));Qj();X();Fe();BZ=e=>Z_.default.join(e.installDir,an),HPe=(e,t)=>{if(e.profileEmail===null||t===BZ(e)||Zo.default.existsSync(t))return;let r=BZ(e);Zo.default.existsSync(r)&&(Zo.default.mkdirSync(Z_.default.dirname(t),{recursive:!0}),Zo.default.renameSync(r,t))},FPe=e=>{if(!Zo.default.existsSync(e))return null;try{let t=Zo.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},Q_=e=>{let t=Vc(e);HPe(e,t);let r=FPe(t);if(r!==null)return r;let o=Vj();return Zo.default.mkdirSync(Z_.default.dirname(t),{recursive:!0}),Zo.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},eM=e=>{let t=Q_(e.layout),r=Zj(),o=Xj({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=qj(t.privateKeyPem),s=Jj(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},tM=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return Yj(e.serverPublicKey,t,e.serverAttestation)}});var rM=l(()=>{"use strict";GZ();Qj()});var KZ,VZ,qZ=l(()=>{"use strict";KZ=u(require("node:path")),VZ=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:KZ.default.basename(e.installDir)})});var JZ=l(()=>{"use strict";ds()});var ZZ,Xm,Fi,sM,YZ,zPe,oM,eb,Ne,QZ,UPe,nM,BPe,GPe,$i,KPe,ce,Ve,XZ,Ke,VPe,qPe,JPe,Zm,Qm,eQ=l(()=>{"use strict";ZZ=u(require("node:http")),Xm=u(require("node:fs")),Fi=u(require("node:path"));pl();CV();vV();QS();HI();WV();tb();qp();qV();YV();r5();Ts();UC();mL();O5();FA();Xx();q3();Yr();rW();n7();S7();A7();r_();W7();U7();bn();St();ht();B7();K7();_T();uI();RT();J7();sX();aX();dX();zW();zr();bX();X_();te();rM();qZ();JZ();sM=e=>IC(e)??"never",YZ=48e3,zPe=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,oM=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??Lh(),reveal:t.reveal,installed:Ro(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),eb=async e=>{let t=B();return t===null?{ok:!1,projects:[],message:"Client config missing \u2014 pair this computer in AgentWitch Cloud to load projects."}:qr(t,e)},Ne=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QZ=200,UPe=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',nM=e=>{let t=e.trim().slice(0,QZ),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},BPe=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${Ne(t)}</div>`,GPe=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${Ne(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',$i={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},KPe=()=>{let e=B();return e===null?null:q({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},ce=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...$i}),e.end(JSON.stringify(r))},Ve=(e,t)=>{e.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...$i}),e.end(Zs)},XZ=e=>{Ve(e,"")},Ke=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},VPe=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Not linked</span>',r=e.status.wsConnected?"":'<p class="status-hint">This computer is not linked to AgentWitch cloud (token missing or revoked). Open Home \u2192 Connect this computer for a fresh install command \u2014 do not reuse an old one.</p>',o=UPe(e.healthBadge),n=e.status.wakeError?`<div class="alert-error">${Ne(e.status.wakeError)}</div>`:"",s=e.revived?`<div class="alert-success">${Ne(JC(process.platform))}</div>`:"",i=DW(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${KC(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${o}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${Ne(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${Ne(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${Ne(sM(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${Ne(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${n}
      ${i}
    </section>`},qPe=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},JPe=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,QZ)},Zm=e=>{let t=Fi.default.join(e.layout.installDir,"link-code.txt"),r=Fi.default.dirname(e.layout.configPath),o=e.layout.profileEmail?.trim()??"",n=0,s=()=>De(e.layout.installDir),i=()=>{let P=s();return{installBundleVersion:s_(P),installBundleUpdatedAt:P?.updatedAt??null,installVersion:P}},a=async P=>{let _=P.installVersion??s(),h=await d(),b=hL(h),C=P.updateFlash??null,H=SL(C),D=BPe(C,P.updateError??null);return fL({title:P.title,activePath:P.activePath,body:P.body,cloudAppOrigin:Wr(_),installBundleVersionLabel:s_(_),prependBody:`${H}${D}${b}`,headerUpdateButtonHtml:yL(h)})},c=null,d=async()=>{let P=Date.now();if(c!==null&&P-c.cachedAtMs<6e4)return c.offer;let _=await NW(e.layout);return c={cachedAtMs:P,offer:_},_},p=()=>{c=null},m=!1,g=async P=>{if(p(),!(await d()).updateAvailable){P.writeHead(303,{Location:"/?update=ok"}),P.end();return}if(m){P.writeHead(303,{Location:nM("An update is already running.")}),P.end();return}m=!0;try{let h=await $W(),b=h.ok?"/?update=ok":nM(h.message);P.writeHead(303,{Location:b}),P.end()}catch(h){let b=h instanceof Error&&h.message.trim().length>0?h.message:"Install bundle update failed.";P.writeHead(303,{Location:nM(b)}),P.end()}finally{m=!1,p()}},y=async(P,_)=>{P.writeHead(404,{"Content-Type":"text/plain; charset=utf-8",...$i}),P.end(Zs)},S=()=>{if(Xm.default.existsSync(t))return Xm.default.readFileSync(t,"utf8").trim();let P=Math.random().toString(36).slice(2,8).toUpperCase();return Xm.default.writeFileSync(t,P,"utf8"),P},A=Fn({layout:e.layout}),E=ZZ.default.createServer((P,_)=>{(async()=>{let h=P.url?.split("?")[0]??"/",b=P.method??"GET";if(b==="OPTIONS"){_.writeHead(204,$i),_.end();return}let C=P.headers["user-agent"],H=Array.isArray(C)?C[0]:C;if(LC({method:b,pathname:h,userAgent:H})){XZ(_);return}if(await Hx({method:b,pathname:h,request:P,response:_,requestUrl:P.url??"/",storePath:o7(Fi.default.dirname(e.layout.configPath)),readBody:Ke,sendHtml:IV({pathname:h,userAgent:H,headers:$i}),renderShell:a})||await K3({method:b,pathname:h,request:P,response:_,configPath:e.layout.configPath,readBody:Ke,sendJson:ce})||await V3({method:b,pathname:h,request:P,response:_,profileDir:Fi.default.dirname(e.layout.configPath),readCloudConfig:KPe,readBody:Ke,sendJson:ce})||await PS({method:b,pathname:h,request:P,response:_,layout:e.layout,readBody:Ke,sendJson:ce})||Nj({method:b,pathname:h,requestUrl:P.url??"/",response:_,sendJson:ce})||await Bj({method:b,pathname:h,requestUrl:P.url??"/",request:P,response:_,online:e.controllers.getStatus().wsConnected,resolveProjectName:w=>w.slice(0,8),readBody:Ke,sendHtml:Ve,sendJson:ce})||await BA({method:b,pathname:h,request:P,response:_,layout:e.layout,readBody:Ke,sendJson:ce,server:A}))return;if(b==="GET"&&h==="/health"){let w=e.controllers.getStatus(),k=i();ce(_,200,{ok:!0,...w,installBundleVersion:k.installBundleVersion,installBundleUpdatedAt:k.installBundleUpdatedAt,localAppPort:n,profileEmail:o,pid:process.pid,...LV(),...VZ({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(b==="GET"&&h==="/api/status"){let w=i();ce(_,200,{...e.controllers.getStatus(),linkCode:S(),projectFolders:xo(Fi.default.dirname(e.layout.configPath)),installBundleVersion:w.installBundleVersion,installBundleUpdatedAt:w.installBundleUpdatedAt});return}if(b==="GET"&&h==="/api/traffic"){ce(_,200,{entries:eP(e.layout)});return}if(b==="DELETE"&&h==="/api/traffic"||b==="POST"&&h==="/api/traffic/clear"){if(WC(e.layout),b==="POST"){_.writeHead(303,{Location:"/traffic?cleared=1"}),_.end();return}ce(_,200,{ok:!0});return}if(b==="GET"&&h==="/api/trace"){ce(_,200,{entries:rP(e.layout)});return}if(b==="DELETE"&&h==="/api/trace"||b==="POST"&&h==="/api/trace/clear"){if(MC(e.layout),b==="POST"){_.writeHead(303,{Location:"/status"}),_.end();return}ce(_,200,{ok:!0});return}if(b==="POST"&&h==="/api/errors/clear"){NC(e.layout.errorLogPath),_.writeHead(303,{Location:"/errors?cleared=1"}),_.end();return}if(b==="GET"&&h==="/api/knowledge"){let k=new URL(P.url??"/",`http://127.0.0.1:${n}`).searchParams.get("q")?.trim()??"";if(k.length>0){let W=await yl({layout:e.layout,query:k,limit:20});ce(_,200,{chunks:W,query:k});return}ce(_,200,{chunks:eu(e.layout).slice(-50).reverse()});return}if(b==="POST"&&h==="/api/revive"){e.controllers.reviveWebSocket(),_.writeHead(303,{Location:"/status?revived=1"}),_.end();return}if(b==="GET"&&h==="/api/update-status"){let w=await d();ce(_,200,{ok:!0,...w});return}if((b==="GET"||b==="POST")&&h==="/api/update"){await g(_);return}if(b==="GET"&&h==="/"){XZ(_);return}if(b==="GET"&&h==="/task"){let w=e.controllers.getStatus(),k=i(),W=B(),v=new URL(P.url??"/",`http://127.0.0.1:${n}`),j=v.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,N=v.searchParams.get("failed")==="1"?v.searchParams.get("error")?.trim()??"Task failed.":null,M=v.searchParams.get("runId");Ve(_,await a({title:"Task",activePath:"/task",installVersion:k.installVersion,body:oW({defaultWorkspace:W?.workspace??"",wsConnected:w.wsConnected,flashMessage:j,flashError:N,lastRunId:M})}));return}if(b==="POST"&&h==="/task/dispatch"){let w=await Ke(P),k=new URLSearchParams(w),W=k.get("prompt")?.trim()??"",v=k.get("writerAgent")?.trim()??"claude-cli",j=k.get("projectFolder")?.trim()??"",N=await BW({prompt:W,writerAgent:v,...j.length>0?{projectFolderPath:j}:{}}),M=new URLSearchParams;N.ok?M.set("ok","1"):(M.set("failed","1"),N.errorMessage!==void 0&&M.set("error",N.errorMessage.slice(0,240))),N.agentRunId!==void 0&&M.set("runId",N.agentRunId),_.writeHead(303,{Location:`/task?${M.toString()}`}),_.end();return}if(b==="GET"&&h==="/writer-sessions"){let w=i(),k=ZA(e.layout,12);Ve(_,await a({title:"Writer sessions",activePath:"/writer-sessions",installVersion:w.installVersion,updateFlash:qPe(P.url??void 0),updateError:JPe(P.url??void 0),body:dW({sessions:k})}));return}if(b==="GET"&&h==="/errors"){let w=i(),k=DC(e.layout.errorLogPath);Ve(_,await a({title:"Errors",activePath:"/errors",installVersion:w.installVersion,body:FC({errorLogPath:e.layout.errorLogPath,content:k.content,exists:k.exists,truncated:k.truncated,byteSize:k.byteSize,cleared:new URL(P.url??"/",`http://127.0.0.1:${n}`).searchParams.get("cleared")==="1"})}));return}if(b==="GET"&&h==="/status"){let w=new URL(P.url??"/",`http://127.0.0.1:${n}`),k=e.controllers.getStatus(),W=He(e.layout),v=W!==null?Ye(W,12e4):BC(k.lastHeartbeatAt,12e4),j=GC({lastHeartbeatAt:k.lastHeartbeatAt,heartbeatIsStale:v}),N=i();Ve(_,await a({title:"Status",activePath:"/status",installVersion:N.installVersion,body:`${VPe({status:k,healthBadge:j,revived:w.searchParams.get("revived")==="1",linkCode:S(),installBundleVersion:N.installBundleVersion,installBundleUpdatedAt:N.installBundleUpdatedAt})}${qC({installDir:e.layout.installDir,platform:process.platform})}${VC({entries:rP(e.layout)})}`}));return}if(b==="GET"&&h==="/traffic"){let w=new URL(P.url??"/",`http://127.0.0.1:${n}`),k=eP(e.layout),W=i(),v=k.map(M=>`<tr><td title="${Ne(M.at)}">${Ne(sM(M.at))}</td><td>${Ne(M.direction)}</td><td><code>${Ne(M.type)}</code></td><td>${Ne(M.summary)}</td><td>${Ne(M.action??"")}</td></tr>`).join(""),j=k.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${v}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',N=w.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ve(_,await a({title:"Traffic",activePath:"/traffic",installVersion:W.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${N}
              ${j}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(b==="GET"&&h==="/projects"){let w=new URL(P.url??"/",`http://127.0.0.1:${n}`),k=i(),W=Wr(k.installVersion),v=await eb(e.layout),j=w.searchParams.get("folderError")==="1"?"Could not save the selected folder to AgentWitch. Check the Mac connection and try again.":w.searchParams.get("deleteError")==="1"?"Could not delete the project in AgentWitch Cloud. Check pairing on Status.":null,N=w.searchParams.get("deleted")==="1"?"Project removed from AgentWitch Cloud. Folders on your computer were not deleted.":null,M=B(),F=M===null?null:q({wsUrl:M.wsUrl,pairingToken:M.pairingToken}),oe=F===null?{}:Object.fromEntries((await Promise.all(v.projects.map(async xe=>{let ut=await TW(F,xe.id);return[xe.id,ut?.counts??null]}))).filter(xe=>xe[1]!==null));Ve(_,await a({title:"Projects",activePath:"/projects",installVersion:k.installVersion,body:jW({projects:v.projects,compositionCountsByProjectId:oe,cloudAppOrigin:W,syncMessage:v.message,syncOk:v.ok,flashMessage:N,flashError:j})}));return}if(b==="GET"&&h==="/projects/select-folder"){let k=new URL(P.url??"/",`http://127.0.0.1:${n}`).searchParams.get("projectId")?.trim()??"",W=B(),v=W===null?null:q({wsUrl:W.wsUrl,pairingToken:W.pairingToken}),j=k.length>0&&v!==null?wn():null;if(j===null||v===null){_.writeHead(200,{"Content-Type":"text/plain; charset=utf-8",...$i}),_.end(Zs);return}let N=await Wo({projectId:k,folderPath:j,allowOutsideHome:!0,profileDir:Fi.default.dirname(e.layout.configPath),cloudConfig:v});if(!N.ok){ce(_,N.httpStatus,{ok:!1,error:N.message});return}ce(_,200,{ok:!0,projectId:k,folderPath:N.folderPath,bindingsSynced:N.bindingsSynced,summary:N.summary});return}if(b==="POST"&&h==="/projects/delete"){let w=await Ke(P),k=new URLSearchParams(w).get("projectId")?.trim()??"",W=B(),v=W===null?null:q({wsUrl:W.wsUrl,pairingToken:W.pairingToken});if(v===null||k.length===0){_.writeHead(303,{Location:"/projects?deleteError=1"}),_.end();return}let j=await OT(v,k);_.writeHead(303,{Location:j.ok?"/projects?deleted=1":"/projects?deleteError=1"}),_.end();return}if(b==="GET"&&h==="/project"){let w=new URL(P.url??"/",`http://127.0.0.1:${n}`),k=w.searchParams.get("id")?.trim()??"",W=i(),v=Wr(W.installVersion),j=await eb(e.layout),N=Ar(j.projects,k);if(N===null){await y(_,"Project not found");return}let M=w.searchParams.get("linked")==="1"?w.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${w.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${w.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:w.searchParams.get("folderUpdated")==="1"?w.searchParams.get("bindingsSynced")==="0"?"Project folder updated. Harness composition sync to cloud failed \u2014 check WS connection on Status.":"Project folder updated and harness bindings synced with AgentWitch.":null,F=w.searchParams.get("knowledgePromoted"),oe=F!==null?`Marked ${F} lesson(s) as promoted in AgentWitch.`:null,xe=w.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,ut=w.searchParams.get("tab")?.trim()??"harness",Bt=ut==="workflows"||ut==="agents"||ut==="knowledge"||ut==="pitfalls"?ut:"harness",Yi=w.searchParams.get("retired")==="1",Ub=w.searchParams.get("edit")?.trim()||null,xg=q7(w.searchParams.get("pitfall")),Tc=B(),ot=Tc===null?null:q({wsUrl:Tc.wsUrl,pairingToken:Tc.pairingToken}),Vre=ot===null?null:await TW(ot,N.id),Bb=0;if(ot!==null)try{let tD=await fetch(`${ot.appOrigin}/api/agent-witch/projects/${encodeURIComponent(N.id)}/knowledge`,{method:"GET",headers:{[ie]:ot.pairingToken},signal:AbortSignal.timeout(1e4)});if(tD.ok){let Wg=await tD.json();typeof Wg=="object"&&Wg!==null&&typeof Wg.candidateCount=="number"&&(Bb=Wg.candidateCount)}}catch{Bb=0}let JN=w.searchParams.get("rulePrompt"),YN=JN!==null,qre=JN?.trim()??"",XN=w.searchParams.get("ruleDropped")?.trim()||null,ZN=w.searchParams.get("ruleDroppedTitle")?.trim()||null,QN=w.searchParams.get("ruleChangeError")?.trim()||null,Jre=(w.searchParams.get("ruleChangeAction")?.trim()||null)==="restore"?"restore":"drop",Yre=QN===null?null:{ok:!1,reason:QN},eD=Bt==="pitfalls"||Bt==="harness"&&YN?await U1({store:wS({layout:e.layout,cloud:ot===null?null:Pp(ot)}),projectId:N.id,includeRetired:Bt==="pitfalls"?Yi:!1}):void 0,Xre=Bt!=="harness"?void 0:await nX({projectId:N.id,prompt:YN?qre:null,cloudConfig:ot,pitfalls:eD,dropFlash:XN!==null&&ZN!==null?{ruleId:XN,title:ZN}:null,changeError:Yre,changeAction:Jre});Ve(_,await a({title:N.name,activePath:"/projects",installVersion:W.installVersion,body:Rn({project:N,cloudAppOrigin:v,installed:Ro(e.layout),linkedSetSlugs:Zt(N.projectFolderPath),composition:Vre,knowledgeCandidateCount:Bb,pitfalls:eD,pitfallsShowRetired:Yi,pitfallsEditId:Ub,activeTab:Bt,harnessExtraHtml:Xre,flashMessage:M??oe??xg?.message??null,flashError:xe??xg?.error??null})}));return}if(b==="POST"&&(h==="/project/rules/drop"||h==="/project/rules/restore")){let w=await Ke(P),k=B(),W=k===null?null:q({wsUrl:k.wsUrl,pairingToken:k.pairingToken}),v=await iX({action:h.endsWith("/drop")?"drop":"restore",rawBody:w,cloudConfig:W});if(v.kind==="not_found"){await y(_,"Project not found");return}_.writeHead(303,{Location:v.location}),_.end();return}if(b==="POST"&&h==="/projects/pull-bound-harness"){let w=await Ke(P),k=await PT({rawBody:w,layout:e.layout});if(k.kind==="not_found"){await y(_,"Project not found");return}if(k.kind==="redirect"){_.writeHead(303,{Location:k.location}),_.end();return}let W=i();Ve(_,await a({title:k.title,activePath:"/projects",installVersion:W.installVersion,body:k.body}));return}if(b==="POST"&&h==="/projects/link-harness"){let w=await Ke(P),k=new URLSearchParams(w),W=k.get("projectId")?.trim()??"",v=await eb(e.layout),j=Ar(v.projects,W);if(j===null){await y(_,"Project not found");return}let N=k.getAll("applySet").map(Bt=>String(Bt)),M=cp({layout:e.layout,projectFolderPath:j.projectFolderPath,setSlugs:N});if(!M.ok){let Bt=i(),Yi=Wr(Bt.installVersion);Ve(_,await a({title:j.name,activePath:"/projects",installVersion:Bt.installVersion,body:Rn({project:j,cloudAppOrigin:Yi,installed:Ro(e.layout),linkedSetSlugs:Zt(j.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:M.errorMessage})}));return}let F=B(),oe=F===null?null:q({wsUrl:F.wsUrl,pairingToken:F.pairingToken}),xe=oe===null?!1:await wo(oe,j.id,M.appliedSetSlugs),ut=new URLSearchParams({linked:"1",files:String(M.writtenFileCount),bindingsSynced:xe?"1":"0"});_.writeHead(303,{Location:`/project?id=${encodeURIComponent(j.id)}&${ut.toString()}`}),_.end();return}if(b==="POST"&&h==="/projects/remove-harness-set"){let w=await Ke(P),k=await AT({rawBody:w,layout:e.layout});if(k.kind==="not_found"){await y(_,"Project not found");return}if(k.kind==="redirect"){_.writeHead(303,{Location:k.location}),_.end();return}let W=i();Ve(_,await a({title:k.title,activePath:"/projects",installVersion:W.installVersion,body:k.body}));return}if(b==="POST"&&h==="/project/knowledge/promote-all"){let w=await Ke(P),W=new URLSearchParams(w).get("projectId")?.trim()??"",v=await eb(e.layout),j=Ar(v.projects,W);if(j===null){await y(_,"Project not found");return}let N=B(),M=N===null?null:q({wsUrl:N.wsUrl,pairingToken:N.pairingToken}),F=M===null?{ok:!1,promotedCount:0}:await G7(M,j.id),oe=new URLSearchParams({tab:"knowledge",...F.ok?{knowledgePromoted:String(F.promotedCount)}:{knowledgePromoteFailed:"1"}});_.writeHead(303,{Location:`/project?id=${encodeURIComponent(j.id)}&${oe.toString()}`}),_.end();return}let D=Gh(h);if(b==="POST"&&D!==null){let w=await Ke(P),k=await kT({rawBody:w,action:D,layout:e.layout,createStore:W=>wS({layout:e.layout,cloud:Pp(W)})});if(k.kind==="not_found"){await y(_,"Project not found");return}_.writeHead(303,{Location:k.location}),_.end();return}if(b==="GET"&&h==="/harness"){let w=new URL(P.url??"/",`http://127.0.0.1:${n}`),k=i(),W=mp(e.layout),v=w.searchParams.get("submitted")==="1",j=v?w.searchParams.get("syncFailed")==="1"?`Local harness updated (${w.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:w.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${w.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":w.searchParams.get("stopped")==="1"?`Reveal stopped. ${W?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:w.searchParams.get("revealed")==="1"?`Reveal found ${W?.sets.length??0} set(s).`:null,N=W?.scanRoots[0]??Lh(),M=zPe(e.layout,{reveal:W,importQuery:w.searchParams.get("import")==="1",justSubmitted:v}),F=Wr(k.installVersion);Ve(_,await a({title:"Harness",activePath:"/harness",installVersion:k.installVersion,body:ym(oM(e.layout,{cloudAppOrigin:F,reveal:W,scanFolder:N,flashMessage:j,importSectionExpanded:M}))}));return}if(b==="POST"&&h==="/api/harness/pick-folder"){let w=wn();if(w===null){ce(_,200,{cancelled:!0});return}ce(_,200,{path:w});return}if(b==="GET"&&h==="/api/harness/file-content"){let k=new URL(P.url??"/",`http://127.0.0.1:${n}`).searchParams.get("path")?.trim()??"",W=lp(k);if(W===null){ce(_,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let v=Xm.default.readFileSync(W,"utf8"),j=v.length>YZ?`${v.slice(0,YZ)}
\u2026 (truncated)`:v;ce(_,200,{content:j})}catch{ce(_,500,{errorMessage:"Could not read file."})}return}if(b==="POST"&&h==="/api/harness/reveal/add-project"){let w=await Ke(P),k="";try{let j=JSON.parse(w);typeof j=="object"&&j!==null&&typeof j.projectPath=="string"&&(k=j.projectPath.trim())}catch{ce(_,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(k.length===0){ce(_,400,{ok:!1,errorMessage:"projectPath is required."});return}let W=mp(e.layout),v=GE({reveal:W,projectPath:k});if(v===null||v.sets.length===0){ce(_,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Oh(e.layout,v),ce(_,200,{ok:!0,setCount:v.sets.length});return}if(b==="GET"&&h==="/api/harness/reveal/stream"){let k=new URL(P.url??"/",`http://127.0.0.1:${n}`).searchParams.get("scanRoot")?.trim()??"";if(k.length===0){ce(_,400,{errorMessage:"Choose a folder to scan first."});return}let W=!1;P.on("close",()=>{W=!0}),_.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...$i});let v=KE({scanRoot:k,response:_,shouldAbort:()=>W});Oh(e.layout,v),_.end();return}if(b==="POST"&&h==="/harness/reveal"){_.writeHead(410,{"Content-Type":"text/plain"}),_.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(b==="POST"&&h==="/harness/submit"){let w=mp(e.layout);if(w===null){let F=i(),oe=Wr(F.installVersion);Ve(_,await a({title:"Harness",activePath:"/harness",installVersion:F.installVersion,body:ym(oM(e.layout,{cloudAppOrigin:oe,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let k=await Ke(P),W=new URLSearchParams(k),v=EW(W,w),j=qE({layout:e.layout,sets:v});if(!j.ok){let F=i(),oe=Wr(F.installVersion);Ve(_,await a({title:"Harness",activePath:"/harness",installVersion:F.installVersion,body:ym(oM(e.layout,{cloudAppOrigin:oe,reveal:w,flashError:j.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}YE(e.layout);let M=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";_.writeHead(303,{Location:`/harness?submitted=1&count=${j.writtenItemCount??0}${M}`}),_.end();return}if(b==="GET"&&h==="/writer-api"){let w=new URL(P.url??"/",`http://127.0.0.1:${n}`),W=B()?.writerExecutionBackend??at(void 0),v=Ze(e.layout.configPath),j=hn(v),N=w.searchParams.get("saved")==="1"?"Writer API settings saved on this computer.":null,M=i();Ve(_,await a({title:"Writer API",activePath:"/writer-api",installVersion:M.installVersion,body:kW({writerExecutionBackend:W,secrets:j,flashMessage:N})}));return}if(b==="POST"&&h==="/writer-api"){let w=await Ke(P),k=new URLSearchParams(w),W=k.get("writerExecutionBackend")?.trim()??"cli";Qw({configPath:e.layout.configPath,writerExecutionBackend:at(W),anthropicApiKey:k.get("anthropicApiKey")??void 0,anthropicModel:k.get("anthropicModel")??void 0,openaiApiKey:k.get("openaiApiKey")??void 0,openaiModel:k.get("openaiModel")??void 0,googleApiKey:k.get("googleApiKey")??void 0,googleModel:k.get("googleModel")??void 0}),_.writeHead(303,{Location:"/writer-api?saved=1"}),_.end();return}if(b==="GET"&&h==="/estimates"){_.writeHead(302,{Location:"/history"}),_.end();return}if(b==="GET"&&h==="/history"){let w=i();Ve(_,await a({title:"History",activePath:"/history",installVersion:w.installVersion,body:cW({reportsDir:e.layout.reportsDir})}));return}if(b==="GET"&&h==="/knowledge"){let k=new URL(P.url??"/",`http://127.0.0.1:${n}`).searchParams.get("q")?.trim()??"",W=i(),v=tL({layout:e.layout}),j=nL(v),N=k.length>0?await yl({layout:e.layout,query:k,limit:20}):eu(e.layout).slice(-50).reverse(),M=N.map(oe=>{let xe=oL(v,oe.id),ut=xe>0?` \xB7 used in ${xe} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${Ne(oe.createdAt)}">${Ne(sM(oe.createdAt))}${oe.source?` \xB7 ${Ne(oe.source)}`:""}${ut}</div><pre>${Ne(oe.text)}</pre></article>`}).join(""),F=j.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${j.map(oe=>`<li><strong>P${oe.priority}</strong> \u2014 ${Ne(oe.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your computer.</p></section>`:"";Ve(_,await a({title:"Knowledge",activePath:"/knowledge",installVersion:W.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this computer. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${Ne(k)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${GPe(k,N.length)}
            </section>${F}${M}`}));return}b==="POST"&&await Ke(P),await y(_,"Not found")})().catch(h=>{console.error("[agent-witch-local-app]",h),_.writeHead(500),_.end("Internal error")})}),I=P=>{n=P,C2({installDir:e.layout.installDir,profileEmail:o,profileDir:r,port:P});try{rl()}catch(h){let b=h instanceof Error?h.message:String(h);console.error(`[agent-witch] writeGlobalTriggers failed: ${b}`)}console.log(`[agent-witch] Local app http://127.0.0.1:${P} (${o})`);let _=iS();_!==null&&console.warn(_)};E.on("error",P=>{console.error("[agent-witch] Local app server error:",P)});let f=Oj();return E.on("close",()=>{f.stop()}),o.length===0?console.error("[agent-witch] Cannot start local app without layout.profileEmail"):xV(E,{host:"127.0.0.1",preferredPort:I2({installDir:e.layout.installDir,profileEmail:o,profileDir:r})}).then(P=>{I(P)}).catch(P=>{console.error("[agent-witch] Local app server failed to listen:",P)}),E},Qm=e=>Q_(e).publicKeyRaw});var tQ=l(()=>{"use strict";jp();MI()});var rQ=l(()=>{"use strict"});var tb=l(()=>{"use strict";pl();wV();eQ();jp();pl();QS();tQ();rQ();zI();OS()});var nQ={};vt(nQ,{runAgentWitchExternalLiveCli:()=>XPe});var iM,oQ,YPe,XPe,sQ=l(()=>{"use strict";iM=u(require("node:fs")),oQ=u(require("node:path"));Ts();X();Mc();Vk();ye();tb();ye();YPe=e=>{let t=oQ.default.join(e,"link-code.txt");if(!iM.default.existsSync(t))return null;let r=iM.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},XPe=()=>{Wt("agent-witch-live");let e=L(),t=z(),r=YPe(e),o=Qm(t);Zm({layout:t,controllers:{getStatus:()=>{let n=He(t);return{wsConnected:vd(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{Qb({platform:process.platform,installDir:e,runners:{kickstartLaunchAgents:()=>ms(e,process.platform),restartSystemdUserService:kd}}).then(n=>{n.ok||console.warn(`[agent-witch-live] Revive: ${n.message}`)})}}})}});var Qo=T((jyt,lQ)=>{"use strict";var iQ=["nodebuffer","arraybuffer","fragments"],aQ=typeof Blob<"u";aQ&&iQ.push("blob");lQ.exports={BINARY_TYPES:iQ,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:aQ,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var eg=T((Myt,rb)=>{"use strict";var{EMPTY_BUFFER:ZPe}=Qo(),aM=Buffer[Symbol.species];function QPe(e,t){if(e.length===0)return ZPe;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new aM(r.buffer,r.byteOffset,o):r}function cQ(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function dQ(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function eAe(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function lM(e){if(lM.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new aM(e):ArrayBuffer.isView(e)?t=new aM(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),lM.readOnly=!1),t}rb.exports={concat:QPe,mask:cQ,toArrayBuffer:eAe,toBuffer:lM,unmask:dQ};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");rb.exports.mask=function(t,r,o,n,s){s<48?cQ(t,r,o,n,s):e.mask(t,r,o,n,s)},rb.exports.unmask=function(t,r){t.length<32?dQ(t,r):e.unmask(t,r)}}catch{}});var mQ=T((Nyt,uQ)=>{"use strict";var pQ=Symbol("kDone"),cM=Symbol("kRun"),dM=class{constructor(t){this[pQ]=()=>{this.pending--,this[cM]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[cM]()}[cM](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[pQ])}}};uQ.exports=dM});var cc=T((Dyt,hQ)=>{"use strict";var tg=require("zlib"),gQ=eg(),tAe=mQ(),{kStatusCode:fQ}=Qo(),rAe=Buffer[Symbol.species],oAe=Buffer.from([0,0,255,255]),nb=Symbol("permessage-deflate"),en=Symbol("total-length"),ac=Symbol("callback"),Xn=Symbol("buffers"),lc=Symbol("error"),ob,pM=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!ob){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;ob=new tAe(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[ac];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){ob.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){ob.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?tg.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=tg.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[nb]=this,this._inflate[en]=0,this._inflate[Xn]=[],this._inflate.on("error",sAe),this._inflate.on("data",yQ)}this._inflate[ac]=o,this._inflate.write(t),r&&this._inflate.write(oAe),this._inflate.flush(()=>{let s=this._inflate[lc];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=gQ.concat(this._inflate[Xn],this._inflate[en]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[en]=0,this._inflate[Xn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?tg.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=tg.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[en]=0,this._deflate[Xn]=[],this._deflate.on("data",nAe)}this._deflate[ac]=o,this._deflate.write(t),this._deflate.flush(tg.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=gQ.concat(this._deflate[Xn],this._deflate[en]);r&&(s=new rAe(s.buffer,s.byteOffset,s.length-4)),this._deflate[ac]=null,this._deflate[en]=0,this._deflate[Xn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};hQ.exports=pM;function nAe(e){this[Xn].push(e),this[en]+=e.length}function yQ(e){if(this[en]+=e.length,this[nb]._maxPayload<1||this[en]<=this[nb]._maxPayload){this[Xn].push(e);return}this[lc]=new RangeError("Max payload size exceeded"),this[lc].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[lc][fQ]=1009,this.removeListener("data",yQ),this.reset()}function sAe(e){if(this[nb]._inflate=null,this[lc]){this[ac](this[lc]);return}e[fQ]=1007,this[ac](e)}});var dc=T((Hyt,sb)=>{"use strict";var{isUtf8:SQ}=require("buffer"),{hasBlob:iAe}=Qo(),aAe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function lAe(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function uM(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function cAe(e){return iAe&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}sb.exports={isBlob:cAe,isValidStatusCode:lAe,isValidUTF8:uM,tokenChars:aAe};if(SQ)sb.exports.isValidUTF8=function(e){return e.length<24?uM(e):SQ(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");sb.exports.isValidUTF8=function(t){return t.length<32?uM(t):e(t)}}catch{}});var hM=T((Fyt,wQ)=>{"use strict";var{Writable:dAe}=require("stream"),PQ=cc(),{BINARY_TYPES:pAe,EMPTY_BUFFER:AQ,kStatusCode:uAe,kWebSocket:mAe}=Qo(),{concat:mM,toArrayBuffer:gAe,unmask:fAe}=eg(),{isValidStatusCode:yAe,isValidUTF8:_Q}=dc(),ib=Buffer[Symbol.species],ar=0,bQ=1,RQ=2,kQ=3,gM=4,fM=5,ab=6,yM=class extends dAe{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||pAe[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[mAe]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=ar}_write(t,r,o){if(this._opcode===8&&this._state==ar)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new ib(o.buffer,o.byteOffset+t,o.length-t),new ib(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new ib(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case ar:this.getInfo(t);break;case bQ:this.getPayloadLength16(t);break;case RQ:this.getPayloadLength64(t);break;case kQ:this.getMask();break;case gM:this.getData(t);break;case fM:case ab:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[PQ.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=bQ:this._payloadLength===127?this._state=RQ:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=kQ:this._state=gM}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=gM}getData(t){let r=AQ;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&fAe(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=fM,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[PQ.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===ar&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=ar;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=mM(o,r):this._binaryType==="arraybuffer"?n=gAe(mM(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=ar):(this._state=ab,setImmediate(()=>{this.emit("message",n,!0),this._state=ar,this.startLoop(t)}))}else{let n=mM(o,r);if(!this._skipUTF8Validation&&!_Q(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===fM||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=ar):(this._state=ab,setImmediate(()=>{this.emit("message",n,!1),this._state=ar,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,AQ),this.end();else{let o=t.readUInt16BE(0);if(!yAe(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new ib(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!_Q(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=ar;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=ar):(this._state=ab,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=ar,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[uAe]=n,i}};wQ.exports=yM});var AM=T((zyt,IQ)=>{"use strict";var{Duplex:$yt}=require("stream"),{randomFillSync:hAe}=require("crypto"),{types:{isUint8Array:SAe}}=require("util"),EQ=cc(),{EMPTY_BUFFER:PAe,kWebSocket:AAe,NOOP:_Ae}=Qo(),{isBlob:pc,isValidStatusCode:bAe}=dc(),{mask:TQ,toBuffer:zi}=eg(),lr=Symbol("kByteLength"),RAe=Buffer.alloc(4),lb=8*1024,Ui,uc=lb,jr=0,kAe=1,wAe=2,SM=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=jr,this.onerror=_Ae,this[AAe]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||RAe,r.generateMask?r.generateMask(o):(uc===lb&&(Ui===void 0&&(Ui=Buffer.alloc(lb)),hAe(Ui,0,lb),uc=0),o[0]=Ui[uc++],o[1]=Ui[uc++],o[2]=Ui[uc++],o[3]=Ui[uc++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[lr]!==void 0?a=r[lr]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(TQ(t,o,d,s,a),[d]):(TQ(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=PAe;else{if(typeof t!="number"||!bAe(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(SAe(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[lr]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==jr?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):pc(t)?(n=t.size,s=!1):(t=zi(t),n=t.length,s=zi.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[lr]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};pc(t)?this._state!==jr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==jr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):pc(t)?(n=t.size,s=!1):(t=zi(t),n=t.length,s=zi.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[lr]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};pc(t)?this._state!==jr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==jr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[EQ.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):pc(t)?(a=t.size,c=!1):(t=zi(t),a=t.length,c=zi.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[lr]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};pc(t)?this._state!==jr?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==jr?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[lr],this._state=wAe,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(PM,this,a,n);return}this._bufferedBytes-=o[lr];let i=zi(s);r?this.dispatch(i,r,o,n):(this._state=jr,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(EAe,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[EQ.extensionName];this._bufferedBytes+=o[lr],this._state=kAe,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");PM(this,c,n);return}this._bufferedBytes-=o[lr],this._state=jr,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===jr&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][lr],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][lr],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};IQ.exports=SM;function PM(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function EAe(e,t,r){PM(e,t,r),e.onerror(t)}});var NQ=T((Uyt,MQ)=>{"use strict";var{kForOnEventAttribute:rg,kListener:_M}=Qo(),CQ=Symbol("kCode"),LQ=Symbol("kData"),vQ=Symbol("kError"),xQ=Symbol("kMessage"),WQ=Symbol("kReason"),mc=Symbol("kTarget"),OQ=Symbol("kType"),jQ=Symbol("kWasClean"),tn=class{constructor(t){this[mc]=null,this[OQ]=t}get target(){return this[mc]}get type(){return this[OQ]}};Object.defineProperty(tn.prototype,"target",{enumerable:!0});Object.defineProperty(tn.prototype,"type",{enumerable:!0});var Bi=class extends tn{constructor(t,r={}){super(t),this[CQ]=r.code===void 0?0:r.code,this[WQ]=r.reason===void 0?"":r.reason,this[jQ]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[CQ]}get reason(){return this[WQ]}get wasClean(){return this[jQ]}};Object.defineProperty(Bi.prototype,"code",{enumerable:!0});Object.defineProperty(Bi.prototype,"reason",{enumerable:!0});Object.defineProperty(Bi.prototype,"wasClean",{enumerable:!0});var gc=class extends tn{constructor(t,r={}){super(t),this[vQ]=r.error===void 0?null:r.error,this[xQ]=r.message===void 0?"":r.message}get error(){return this[vQ]}get message(){return this[xQ]}};Object.defineProperty(gc.prototype,"error",{enumerable:!0});Object.defineProperty(gc.prototype,"message",{enumerable:!0});var og=class extends tn{constructor(t,r={}){super(t),this[LQ]=r.data===void 0?null:r.data}get data(){return this[LQ]}};Object.defineProperty(og.prototype,"data",{enumerable:!0});var TAe={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[rg]&&n[_M]===t&&!n[rg])return;let o;if(e==="message")o=function(s,i){let a=new og("message",{data:i?s:s.toString()});a[mc]=this,cb(t,this,a)};else if(e==="close")o=function(s,i){let a=new Bi("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[mc]=this,cb(t,this,a)};else if(e==="error")o=function(s){let i=new gc("error",{error:s,message:s.message});i[mc]=this,cb(t,this,i)};else if(e==="open")o=function(){let s=new tn("open");s[mc]=this,cb(t,this,s)};else return;o[rg]=!!r[rg],o[_M]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[_M]===t&&!r[rg]){this.removeListener(e,r);break}}};MQ.exports={CloseEvent:Bi,ErrorEvent:gc,Event:tn,EventTarget:TAe,MessageEvent:og};function cb(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var db=T((Byt,DQ)=>{"use strict";var{tokenChars:ng}=dc();function uo(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function IAe(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,p=-1,m=0;for(;m<e.length;m++)if(d=e.charCodeAt(m),i===void 0)if(p===-1&&ng[d]===1)c===-1&&(c=m);else if(m!==0&&(d===32||d===9))p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let y=e.slice(c,p);d===44?(uo(t,y,r),r=Object.create(null)):i=y,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);else if(a===void 0)if(p===-1&&ng[d]===1)c===-1&&(c=m);else if(d===32||d===9)p===-1&&c!==-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m),uo(r,e.slice(c,p),!0),d===44&&(uo(t,i,r),r=Object.create(null),i=void 0),c=p=-1}else if(d===61&&c!==-1&&p===-1)a=e.slice(c,m),c=p=-1;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(n){if(ng[d]!==1)throw new SyntaxError(`Unexpected character at index ${m}`);c===-1?c=m:o||(o=!0),n=!1}else if(s)if(ng[d]===1)c===-1&&(c=m);else if(d===34&&c!==-1)s=!1,p=m;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${m}`);else if(d===34&&e.charCodeAt(m-1)===61)s=!0;else if(p===-1&&ng[d]===1)c===-1&&(c=m);else if(c!==-1&&(d===32||d===9))p===-1&&(p=m);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${m}`);p===-1&&(p=m);let y=e.slice(c,p);o&&(y=y.replace(/\\/g,""),o=!1),uo(r,a,y),d===44&&(uo(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=p=-1}else throw new SyntaxError(`Unexpected character at index ${m}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");p===-1&&(p=m);let g=e.slice(c,p);return i===void 0?uo(t,g,r):(a===void 0?uo(r,g,!0):o?uo(r,a,g.replace(/\\/g,"")):uo(r,a,g),uo(t,i,r)),t}function CAe(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}DQ.exports={format:CAe,parse:IAe}});var gb=T((Vyt,YQ)=>{"use strict";var LAe=require("events"),vAe=require("https"),xAe=require("http"),$Q=require("net"),WAe=require("tls"),{randomBytes:OAe,createHash:jAe}=require("crypto"),{Duplex:Gyt,Readable:Kyt}=require("stream"),{URL:bM}=require("url"),Zn=cc(),MAe=hM(),NAe=AM(),{isBlob:DAe}=dc(),{BINARY_TYPES:HQ,CLOSE_TIMEOUT:HAe,EMPTY_BUFFER:pb,GUID:FAe,kForOnEventAttribute:RM,kListener:$Ae,kStatusCode:zAe,kWebSocket:qe,NOOP:zQ}=Qo(),{EventTarget:{addEventListener:UAe,removeEventListener:BAe}}=NQ(),{format:GAe,parse:KAe}=db(),{toBuffer:VAe}=eg(),UQ=Symbol("kAborted"),kM=[8,13],rn=["CONNECTING","OPEN","CLOSING","CLOSED"],qAe=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,fe=class e extends LAe{constructor(t,r,o){super(),this._binaryType=HQ[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=pb,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),BQ(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){HQ.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new MAe({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new NAe(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[qe]=this,s[qe]=this,t[qe]=this,n.on("conclude",XAe),n.on("drain",ZAe),n.on("error",QAe),n.on("message",e_e),n.on("ping",t_e),n.on("pong",r_e),s.onerror=o_e,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",VQ),t.on("data",mb),t.on("end",qQ),t.on("error",JQ),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[Zn.extensionName]&&this._extensions[Zn.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ut(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,KQ(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){wM(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||pb,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){wM(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||pb,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){wM(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[Zn.extensionName]||(n.compress=!1),this._sender.send(t||pb,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ut(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(fe,"CONNECTING",{enumerable:!0,value:rn.indexOf("CONNECTING")});Object.defineProperty(fe.prototype,"CONNECTING",{enumerable:!0,value:rn.indexOf("CONNECTING")});Object.defineProperty(fe,"OPEN",{enumerable:!0,value:rn.indexOf("OPEN")});Object.defineProperty(fe.prototype,"OPEN",{enumerable:!0,value:rn.indexOf("OPEN")});Object.defineProperty(fe,"CLOSING",{enumerable:!0,value:rn.indexOf("CLOSING")});Object.defineProperty(fe.prototype,"CLOSING",{enumerable:!0,value:rn.indexOf("CLOSING")});Object.defineProperty(fe,"CLOSED",{enumerable:!0,value:rn.indexOf("CLOSED")});Object.defineProperty(fe.prototype,"CLOSED",{enumerable:!0,value:rn.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(fe.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(fe.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[RM])return t[$Ae];return null},set(t){for(let r of this.listeners(e))if(r[RM]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[RM]:!0})}})});fe.prototype.addEventListener=UAe;fe.prototype.removeEventListener=BAe;YQ.exports=fe;function BQ(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:HAe,protocolVersion:kM[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!kM.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${kM.join(", ")})`);let s;if(t instanceof bM)s=t;else try{s=new bM(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let A=new SyntaxError(c);if(e._redirects===0)throw A;ub(e,A);return}let d=i?443:80,p=OAe(16).toString("base64"),m=i?vAe.request:xAe.request,g=new Set,y;if(n.createConnection=n.createConnection||(i?YAe:JAe),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":p,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(y=new Zn({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=GAe({[Zn.extensionName]:y.offer()})),r.length){for(let A of r){if(typeof A!="string"||!qAe.test(A)||g.has(A))throw new SyntaxError("An invalid or duplicated subprotocol was specified");g.add(A)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let A=n.path.split(":");n.socketPath=A[0],n.path=A[1]}let S;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let A=o&&o.headers;if(o={...o,headers:{}},A)for(let[E,I]of Object.entries(A))o.headers[E.toLowerCase()]=I}else if(e.listenerCount("redirect")===0){let A=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!A||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,A||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),S=e._req=m(n),e._redirects&&e.emit("redirect",e.url,S)}else S=e._req=m(n);n.timeout&&S.on("timeout",()=>{Ut(e,S,"Opening handshake has timed out")}),S.on("error",A=>{S===null||S[UQ]||(S=e._req=null,ub(e,A))}),S.on("response",A=>{let E=A.headers.location,I=A.statusCode;if(E&&n.followRedirects&&I>=300&&I<400){if(++e._redirects>n.maxRedirects){Ut(e,S,"Maximum redirects exceeded");return}S.abort();let f;try{f=new bM(E,t)}catch{let _=new SyntaxError(`Invalid URL: ${E}`);ub(e,_);return}BQ(e,f,r,o)}else e.emit("unexpected-response",S,A)||Ut(e,S,`Unexpected server response: ${A.statusCode}`)}),S.on("upgrade",(A,E,I)=>{if(e.emit("upgrade",A),e.readyState!==fe.CONNECTING)return;S=e._req=null;let f=A.headers.upgrade;if(f===void 0||f.toLowerCase()!=="websocket"){Ut(e,E,"Invalid Upgrade header");return}let P=jAe("sha1").update(p+FAe).digest("base64");if(A.headers["sec-websocket-accept"]!==P){Ut(e,E,"Invalid Sec-WebSocket-Accept header");return}let _=A.headers["sec-websocket-protocol"],h;if(_!==void 0?g.size?g.has(_)||(h="Server sent an invalid subprotocol"):h="Server sent a subprotocol but none was requested":g.size&&(h="Server sent no subprotocol"),h){Ut(e,E,h);return}_&&(e._protocol=_);let b=A.headers["sec-websocket-extensions"];if(b!==void 0){if(!y){Ut(e,E,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let C;try{C=KAe(b)}catch{Ut(e,E,"Invalid Sec-WebSocket-Extensions header");return}let H=Object.keys(C);if(H.length!==1||H[0]!==Zn.extensionName){Ut(e,E,"Server indicated an extension that was not requested");return}try{y.accept(C[Zn.extensionName])}catch{Ut(e,E,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[Zn.extensionName]=y}e.setSocket(E,I,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(S,e):S.end()}function ub(e,t){e._readyState=fe.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function JAe(e){return e.path=e.socketPath,$Q.connect(e)}function YAe(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=$Q.isIP(e.host)?"":e.host),WAe.connect(e)}function Ut(e,t,r){e._readyState=fe.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Ut),t.setHeader?(t[UQ]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(ub,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function wM(e,t,r){if(t){let o=DAe(t)?t.size:VAe(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${rn[e.readyState]})`);process.nextTick(r,o)}}function XAe(e,t){let r=this[qe];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[qe]!==void 0&&(r._socket.removeListener("data",mb),process.nextTick(GQ,r._socket),e===1005?r.close():r.close(e,t))}function ZAe(){let e=this[qe];e.isPaused||e._socket.resume()}function QAe(e){let t=this[qe];t._socket[qe]!==void 0&&(t._socket.removeListener("data",mb),process.nextTick(GQ,t._socket),t.close(e[zAe])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function FQ(){this[qe].emitClose()}function e_e(e,t){this[qe].emit("message",e,t)}function t_e(e){let t=this[qe];t._autoPong&&t.pong(e,!this._isServer,zQ),t.emit("ping",e)}function r_e(e){this[qe].emit("pong",e)}function GQ(e){e.resume()}function o_e(e){let t=this[qe];t.readyState!==fe.CLOSED&&(t.readyState===fe.OPEN&&(t._readyState=fe.CLOSING,KQ(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function KQ(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function VQ(){let e=this[qe];if(this.removeListener("close",VQ),this.removeListener("data",mb),this.removeListener("end",qQ),e._readyState=fe.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[qe]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",FQ),e._receiver.on("finish",FQ))}function mb(e){this[qe]._receiver.write(e)||this.pause()}function qQ(){let e=this[qe];e._readyState=fe.CLOSING,e._receiver.end(),this.end()}function JQ(){let e=this[qe];this.removeListener("error",JQ),this.on("error",zQ),e&&(e._readyState=fe.CLOSING,this.destroy())}});var eee=T((Jyt,QQ)=>{"use strict";var qyt=gb(),{Duplex:n_e}=require("stream");function XQ(e){e.emit("close")}function s_e(){!this.destroyed&&this._writableState.finished&&this.destroy()}function ZQ(e){this.removeListener("error",ZQ),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function i_e(e,t){let r=!0,o=new n_e({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(XQ,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(XQ,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",s_e),o.on("error",ZQ),o}QQ.exports=i_e});var EM=T((Yyt,tee)=>{"use strict";var{tokenChars:a_e}=dc();function l_e(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&a_e[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}tee.exports={parse:l_e}});var lee=T((Zyt,aee)=>{"use strict";var c_e=require("events"),fb=require("http"),{Duplex:Xyt}=require("stream"),{createHash:d_e}=require("crypto"),ree=db(),Gi=cc(),p_e=EM(),u_e=gb(),{CLOSE_TIMEOUT:m_e,GUID:g_e,kWebSocket:f_e}=Qo(),y_e=/^[+/0-9A-Za-z]{22}==$/,oee=0,nee=1,iee=2,TM=class extends c_e{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:m_e,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:u_e,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=fb.createServer((o,n)=>{let s=fb.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=h_e(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=oee}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===iee){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(sg,this);return}if(t&&this.once("close",t),this._state!==nee)if(this._state=nee,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(sg,this):process.nextTick(sg,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{sg(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",see);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Ki(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Ki(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!y_e.test(s)){Ki(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Ki(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){ig(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=p_e.parse(c)}catch{Ki(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let p=t.headers["sec-websocket-extensions"],m={};if(this.options.perMessageDeflate&&p!==void 0){let g=new Gi({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=ree.parse(p);y[Gi.extensionName]&&(g.accept(y[Gi.extensionName]),m[Gi.extensionName]=g)}catch{Ki(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let g={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(g,(y,S,A,E)=>{if(!y)return ig(r,S||401,A,E);this.completeUpgrade(m,s,d,t,r,o,n)});return}if(!this.options.verifyClient(g))return ig(r,401)}this.completeUpgrade(m,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[f_e])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>oee)return ig(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${d_e("sha1").update(r+g_e).digest("base64")}`],p=new this.options.WebSocket(null,void 0,this.options);if(o.size){let m=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;m&&(d.push(`Sec-WebSocket-Protocol: ${m}`),p._protocol=m)}if(t[Gi.extensionName]){let m=t[Gi.extensionName].params,g=ree.format({[Gi.extensionName]:[m]});d.push(`Sec-WebSocket-Extensions: ${g}`),p._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",see),p.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(p),p.on("close",()=>{this.clients.delete(p),this._shouldEmitClose&&!this.clients.size&&process.nextTick(sg,this)})),a(p,n)}};aee.exports=TM;function h_e(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function sg(e){e._state=iee,e.emit("close")}function see(){this.destroy()}function ig(e,t,r,o){r=r||fb.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${fb.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Ki(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Ki),e.emit("wsClientError",i,r,t)}else ig(r,o,n,s)}});var S_e,P_e,A_e,__e,b_e,R_e,cee,k_e,fc,dee=l(()=>{S_e=u(eee(),1),P_e=u(db(),1),A_e=u(cc(),1),__e=u(hM(),1),b_e=u(AM(),1),R_e=u(EM(),1),cee=u(gb(),1),k_e=u(lee(),1),fc=cee.default});var IM,pee=l(()=>{"use strict";IM=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var w_e,CM,uee=l(()=>{"use strict";wy();pee();w_e=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",CM=(e={})=>{let t=e.env??process.env,r=IM(t[Ry]),o=IM(t[ky]);return{mode:w_e(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var mee=l(()=>{"use strict";wy()});var gee=l(()=>{"use strict";uee();mee()});var E_e,fee,yee=l(()=>{"use strict";te();St();ft();E_e={isPaused:_o,loadFolders:hI,resolveFolder:yI},fee=async(e,t=E_e)=>{if(t.isPaused(e.config.layout.configPath))return{ok:!1,code:de.CODING_TOOLS_PAUSED};if(e.requestedFolderPath===null)return{ok:!1,code:de.FOLDER_REQUIRED};let r=await t.loadFolders({wsUrl:e.config.wsUrl,pairingToken:e.config.pairingToken});return t.resolveFolder({...e.projectId!==void 0?{projectId:e.projectId}:{},requestedFolderPath:e.requestedFolderPath,registeredFolders:r,managedProjectsDir:e.config.layout.projectsDir,defaultFolderPath:e.defaultFolderPath})}});var LM=l(()=>{"use strict"});var yc,Vi,hee,I_e,vM,xM,See,Pee,WM,Aee,ag,OM=l(()=>{"use strict";yc=u(require("node:fs")),Vi=u(require("node:os")),hee=u(require("node:path"));LM();_a();I_e=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vM=(e=Vi.default.hostname())=>hee.default.join(Vi.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),xM=e=>{if(!yc.default.existsSync(e))return null;try{let t=JSON.parse(yc.default.readFileSync(e,"utf8"));return!I_e(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},See=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},Pee=(e,t)=>{yc.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},WM=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??vM(),o=xM(r);if(o!==null&&o.pid!==process.pid&&qt(o.pid)&&See(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Vi.default.hostname(),macOsUsername:Vi.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return Pee(r,n),{ok:!0}},Aee=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??vM(),o=xM(r);return o!==null&&o.pid!==process.pid&&qt(o.pid)&&See(o)?{ok:!1}:(Pee(r,{hostname:Vi.default.hostname(),macOsUsername:Vi.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},ag=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??vM();xM(r)?.pid===process.pid&&yc.default.existsSync(r)&&yc.default.unlinkSync(r)}});var jM,lg,C_e,L_e,v_e,x_e,MM,_ee=l(()=>{"use strict";jM=require("node:child_process"),lg=u(require("node:path"));_a();iy();C_e=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),L_e=(e,t)=>{if(C_e(e)||!/\bnode\b/.test(e))return!1;let r=lg.default.resolve(t),o=lg.default.join(r,"app",nd),n=lg.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===nd||i==="agent-witch.ts")return e.includes(r);try{let a=lg.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},v_e=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,jM.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},x_e=(e,t,r)=>{let o=v_e(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||L_e(d,t)&&n.push(c)}return n},MM=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,jM.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=x_e(r,e.installDir,t),n=[];for(let s of o)if(qt(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var cg,dg,bee,W_e,NM,Ree=l(()=>{"use strict";cg=u(require("node:fs")),dg=u(require("node:path"));it();bee=(e,t)=>{!cg.default.existsSync(e)||cg.default.existsSync(t)||(cg.default.mkdirSync(dg.default.dirname(t),{recursive:!0}),cg.default.renameSync(e,t))},W_e=e=>{if(e.profileEmail===null)return;let t=dg.default.join(e.installDir,dr);bee(dg.default.join(t,ts),e.mainLogPath),bee(dg.default.join(t,rs),e.errorLogPath)},NM=e=>{let t=z();e!==void 0&&t.installDir!==e||W_e(t)}});var kee=l(()=>{"use strict";Bp();YS();YS();!Ot()&&ys(__agentWitchImportMetaUrl)&&(async()=>{Wt("agent-witch-wake-server");let e=await Xs(),t=So(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var wee=l(()=>{"use strict";kee()});var Eee=l(()=>{"use strict";Lp()});var DM,Tee=l(()=>{"use strict";LM();wee();OM();Eee();DM=async(e={})=>{let t=e.skipInProcessBridge?null:await JS();LS();let r=setInterval(()=>{LS()},6e4),o=setInterval(()=>{if(!Aee().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var pg,yb,M_e,Iee,Cee,hb,Lee,vee,HM,xee,Sb,Wee=l(()=>{"use strict";pg=u(require("node:fs")),yb=u(require("node:path")),M_e="pending-run-inputs.json",Iee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cee=e=>{let t=e.profileEmail?yb.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return yb.default.join(t,M_e)},hb=e=>{let t=Cee(e);if(!pg.default.existsSync(t))return{};try{let r=JSON.parse(pg.default.readFileSync(t,"utf8"));return Iee(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!Iee(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},Lee=(e,t)=>{let r=Cee(e);pg.default.mkdirSync(yb.default.dirname(r),{recursive:!0}),pg.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},vee=e=>Object.values(hb(e)),HM=(e,t)=>hb(e)[t]!==void 0,xee=(e,t)=>{let r=hb(e);r[t.agentRunId]=t,Lee(e,r)},Sb=(e,t)=>{let r=hb(e);delete r[t],Lee(e,r)}});var Pb=l(()=>{"use strict";te()});var Oee=l(()=>{"use strict";te()});var Ab=l(()=>{"use strict";te()});var _b=l(()=>{"use strict";te()});var ug=l(()=>{"use strict";te()});var N_e,D_e,mg,FM=l(()=>{"use strict";fr();Pb();Oee();Ab();_b();ug();N_e={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},D_e={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},mg=e=>{if(!Oe(e.writerAgent))return"the selected writer";let t=jt(e.writerAgent);if(at(e.writerExecutionBackend)==="api"&&t!==null){let r=Rt(Ze(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Dd(t,r.model);return`${D_e[t]} model ${o}`}}return N_e[e.writerAgent]}});var H_e,F_e,jee,Mee,Nee=l(()=>{"use strict";H_e=/"input_tokens"\s*:\s*(\d+)/,F_e=/"output_tokens"\s*:\s*(\d+)/,jee=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},Mee=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=jee(H_e.exec(t)),o=jee(F_e.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var gg,bb,$_e,Dee,$M,Hee,Fee,zM,UM,Rb=l(()=>{"use strict";gg=u(require("node:fs")),bb=u(require("node:path"));te();BM();$_e="pending-run-result-deliveries.json",Dee=e=>{let t=e.profileEmail?bb.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return bb.default.join(t,$_e)},$M=e=>{let t=Dee(e);if(!gg.default.existsSync(t))return[];try{let r=JSON.parse(gg.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.createdAt=="string"&&typeof o.resultMessage=="object"):[]}catch{return[]}},Hee=(e,t)=>{let r=Dee(e);gg.default.mkdirSync(bb.default.dirname(r),{recursive:!0}),gg.default.writeFileSync(r,JSON.stringify(t,null,2),"utf8")},Fee=(e,t)=>{if(fg(e,t.runId))return;let r=[...$M(e).filter(o=>o.runId!==t.runId),t];Hee(e,r)},zM=(e,t)=>{Hee(e,$M(e).filter(r=>r.runId!==t))},UM=e=>{for(let t of $M(e.layout)){if(fg(e.layout,t.runId)){zM(e.layout,t.runId);continue}e.send(Br(t.resultMessage)),t.terminalEndMessage!==void 0&&e.send(Br(t.terminalEndMessage))}}});var kb=l(()=>{"use strict";St()});var Qn,yg,z_e,Uee,KM,GM,Bee,U_e,fg,VM,Gee,$ee,Kee,B_e,zee,qM,BM=l(()=>{"use strict";Qn=u(require("node:fs")),yg=u(require("node:path"));ft();te();Rb();kb();z_e="run-completion-outbox.json",Uee="run-completion-posted.json",KM=(e,t)=>{let r=e.profileEmail?yg.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return yg.default.join(r,t)},GM=e=>KM(e,z_e),Bee=e=>{try{let t=JSON.parse(Qn.default.readFileSync(KM(e,Uee),"utf8"));return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]}catch{return[]}},U_e=(e,t)=>{let r=KM(e,Uee);Qn.default.mkdirSync(yg.default.dirname(r),{recursive:!0}),Qn.default.writeFileSync(r,JSON.stringify(rh(Bee(e),t)),"utf8")},fg=(e,t)=>Bee(e).includes(t),VM=e=>{let t=GM(e);if(!Qn.default.existsSync(t))return[];try{let r=JSON.parse(Qn.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},Gee=(e,t)=>{Qn.default.mkdirSync(yg.default.dirname(GM(e)),{recursive:!0}),Qn.default.writeFileSync(GM(e),JSON.stringify(t,null,2),"utf8")},$ee=(e,t)=>{Gee(e,VM(e).filter(r=>r.runId!==t))},Kee=(e,t)=>{if(fg(e,t.runId))return;let r={...t,output:Wd(t.output,va("secretHidden"))},o=[...VM(e).filter(n=>n.runId!==t.runId),r];Gee(e,o)},B_e=async e=>{for(let t of VM(e.layout)){if(fg(e.layout,t.runId)){$ee(e.layout,t.runId);continue}await hp(e.cloudApi,t.runId,t.exitCode,t.output,{estimateSeconds:t.estimateSeconds,actualSeconds:t.actualSeconds})&&(U_e(e.layout,t.runId),zM(e.layout,t.runId),$ee(e.layout,t.runId))}},zee={chain:Promise.resolve()},qM=e=>{let t=e.cloudApi;if(t===null)return Promise.resolve();let r=zee.chain.then(()=>B_e({layout:e.layout,cloudApi:t}));return zee.chain=r.catch(()=>{}),r}});var Vee=l(()=>{"use strict"});var JM,hg,K_e,qi,qee=l(()=>{"use strict";te();Vee();JM=new Map,hg=e=>{let t=JM.get(e);t!==void 0&&(clearInterval(t),JM.delete(e))},K_e=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify(Br({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}})))},qi=(e,t,r,o={})=>{hg(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){hg(t);return}let i=o.onTick?.()??{};K_e(e,t,n,i)};s(),JM.set(t,setInterval(s,15e3))}});var Jee=l(()=>{"use strict";St()});var Yee,Xee=l(()=>{"use strict";Jee();Yee=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:je(t)}});var YM,Sg,on,XM,mo,Zee,wb=l(()=>{"use strict";YM=new Set,Sg=new Map,on=(e,t)=>{if(t.length===0)return;let r=Sg.get(e)??[];r.push(t),Sg.set(e,r)},XM=e=>{YM.add(e);let t=Sg.get(e)??[];return Sg.delete(e),t},mo=e=>YM.has(e),Zee=e=>{YM.delete(e),Sg.delete(e)}});var Qee,ete=l(()=>{"use strict";Qee=e=>e==null||!Number.isFinite(e)||e<=0?null:{limitSeconds:Math.floor(e)}});var tte,ZM,Eb,rte,Pg,V_e,ote,q_e,nte,QM=l(()=>{"use strict";ete();Dy();tte=Qee(Od.maxMinutes*60)??{limitSeconds:1800},ZM=5e3,Eb=new Map,rte=(e,t,r=tte)=>{Pg(e);let o=setTimeout(()=>{Eb.delete(e),t()},r.limitSeconds*1e3);o.unref?.(),Eb.set(e,o)},Pg=e=>{let t=Eb.get(e);t!==void 0&&(clearTimeout(t),Eb.delete(e))},V_e=(e=tte)=>`You've hit your session limit on this computer: the run was stopped after ${Math.round(e.limitSeconds/60)} minutes.`,ote=e=>{let t=V_e(),r=e.trim();return r.length>0?`${r}

${t}`:t},q_e=e=>e.exitCode===null&&e.signalCode===null,nte=(e,t=ZM)=>{let r=n=>{let s=e.pid;if(typeof s=="number"&&process.platform!=="win32")try{process.kill(-s,n);return}catch{}try{e.kill(n)}catch{}};r("SIGTERM"),setTimeout(()=>{q_e(e)&&r("SIGKILL")},t).unref?.()}});var hc,ste,ite,ate=l(()=>{"use strict";hc=u(require("node:path")),ste=require("node:url");fs();ite=()=>{if(Ot()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?hc.default.dirname(hc.default.resolve(e)):hc.default.dirname(hc.default.resolve(__filename))}return hc.default.dirname((0,ste.fileURLToPath)(__agentWitchImportMetaUrl))}});var lte,cte,dte,pte,Lt,Sc,ute,mte,Pc,eN,tN,rN,gte,oN,fte,Tb=l(()=>{"use strict";lte=require("node:crypto"),cte=u(require("node:fs")),dte=u(require("node:path")),pte=require("node:url");_a();QM();fs();ate();Lt=new Map,ute=async()=>{if(Sc!==void 0)return Sc;try{if(Ot()){let e=ite(),t=dte.default.join(e,"deps","node-pty","lib","index.js");if(cte.default.existsSync(t)){let r=await import((0,pte.pathToFileURL)(t).href);return Sc=r,r}}return Sc=await import("node-pty"),Sc}catch{return Sc=null,null}},mte=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},Pc=(e,t,r)=>{let o=Lt.get(e);if(o!==void 0){Lt.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},eN=(e,t)=>{let r=Lt.get(e);return r===void 0?!1:(r.pty.write(t),!0)},tN=(e,t,r)=>{let o=Lt.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},rN=e=>{for(let t of Lt.values())if(!(t.mode!=="agent"||t.runId!==e))return qt(t.pty.pid);return!1},gte=e=>{for(let[t,r]of Lt.entries()){if(r.mode!=="agent"||r.runId!==e)continue;Lt.delete(t);let o=r.pty.pid;try{r.pty.kill()}catch{}return setTimeout(()=>{if(qt(o))try{process.kill(o,"SIGKILL")}catch{}},ZM).unref(),!0}return!1},oN=async e=>{let t=await ute();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this computer. Install AgentWitch deps again.\r
`},requestId:e.requestId}),!1;Lt.get(e.shellSessionId)!==void 0&&Pc(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return Lt.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{mte(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{Lt.get(e.shellSessionId)?.pty===n&&(Lt.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},fte=async e=>{let t=e.shellSessionId??(0,lte.randomUUID)(),r=await ute();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return Lt.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{mte(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{Lt.get(t)?.pty===o&&(Lt.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var Ib,yte,hte=l(()=>{"use strict";Ib="[[AWAITING_INPUT]]",yte=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",Ib,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var Ag,Ste,Cb=l(()=>{"use strict";hte();Ag=e=>{let t=e.indexOf(Ib);if(t<0)return null;let o=e.slice(t+Ib.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},Ste=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",yte].join(`
`)});var Pte,Ate=l(()=>{"use strict";wb();Tb();Cb();Pte=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(mo(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}on(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await fte({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=Ag(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var bte,Rte,kte,_te,nn,Lb=l(()=>{"use strict";bte=require("node:child_process"),Rte=u(require("node:fs")),kte=u(require("node:path"));iy();_te=12e4,nn=(e,t)=>{let r=kte.default.join(e,"app",NF,"ensure-writer.sh");return Rte.default.existsSync(r)?new Promise((o,n)=>{let s=(0,bte.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(_te/1e3)}s`))},_te);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var wte,Ji,bg,vb,nN,_g,xb,Wb,sN,iN,J_e,Ac,Y_e,X_e,aN,lN=l(()=>{"use strict";wte=require("node:child_process");fr();Lb();Ab();Pb();ug();_b();Ji=new Map,bg=e=>e==="cursor"||e==="antigravity",vb=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",nN=e=>Ji.get(e)?.warmed===!0,_g=e=>{let t=Ji.get(e);Ji.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},xb=e=>Ji.get(e)?.conversationStarted===!0,Wb=e=>{let t=Ji.get(e);Ji.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},sN=e=>{Ji.delete(e)},iN=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",J_e={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Ac=e=>`${J_e[e]} is ready on your computer.
Send a task from the box below when you are ready.
`,Y_e=(e,t,r,o)=>new Promise(n=>{let s=Fy(t,r),i=[],a=(0,wte.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let p=d.toString("utf8");i.push(p),o?.(p)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),X_e=(e,t)=>{let r=Ac(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},aN=async e=>{if(!Oe(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&at(e.runConfig.writerExecutionBackend)==="api"){let r=jt(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Ze(e.runConfig.layout.configPath);return Rt(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this computer (no local CLI).
`),_g(e.writerAgent),{exitCode:0,output:Ac(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your computer\u2026
`),await nn(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}bg(e.writerAgent)&&_g(e.writerAgent);let t=await Y_e(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?X_e(e.writerAgent,t.output):Ac(e.writerAgent)}}});var _c,Ete=l(()=>{"use strict";_c={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var Tte,Ite=l(()=>{"use strict";Tte="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var Cte,Lte=l(()=>{"use strict";ft();Ite();Cte=e=>e.code===Is.SESSION_LIMIT?Tte:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var Z_e,vte,Q_e,ebe,xte,tbe,Wte,Ote=l(()=>{"use strict";Z_e=/\bauto-?denied\b/i,vte=/\bno output produced\b/i,Q_e=/headless mode cannot prompt for.*\bcommand\b.*permission/i,ebe=/\bpermissions\.allow\b/i,xte=/\bjetski:\s*no output produced\b/i,tbe=e=>{let t=e.trim();return t.length===0?!1:xte.test(t)||vte.test(t)&&(Z_e.test(t)||Q_e.test(t)||ebe.test(t))},Wte=e=>{if(tbe(e)){let t=e.split(/\r?\n/).map(r=>r.trim()).find(r=>r.length>0&&(xte.test(r)||vte.test(r)))??e.trim();return t.length>0?t:"Antigravity headless run auto-denied a tool that needs command permission."}return null}});var jte,Mte=l(()=>{"use strict";ft();Ete();Lte();Ote();jte=e=>{let t=cw(e.output);if(t!==null)return{status:_c.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:Cte(t)};let r=Wte(e.output);return r!==null?{status:_c.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:null,denialReason:r}:e.exitCode===0&&e.output.trim().length===0?{status:_c.FAILED,resultExitCode:1,resultOutcomeCode:null,denialReason:"No agent output was captured."}:{status:e.exitCode===0?_c.COMPLETED:_c.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var cN,iPt,Nte=l(()=>{"use strict";cN={OPEN:"open",APPROVAL:"approval"},iPt=cN.APPROVAL});var go,Rg=l(()=>{"use strict";go=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var bc,Ob,Dte,rbe,Hte,Fte,$te,Rc,dN,pN=l(()=>{"use strict";bc=u(require("node:fs")),Ob=u(require("node:path")),Dte="runs",rbe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Hte=e=>{let t=e.profileEmail!==null?Ob.default.join(e.installDir,"profiles",e.profileEmail,Dte):Ob.default.join(e.installDir,Dte);return bc.default.mkdirSync(t,{recursive:!0}),t},Fte=(e,t)=>Ob.default.join(Hte(e),`${t}.json`),$te=(e,t)=>{bc.default.writeFileSync(Fte(e,t.id),JSON.stringify(t,null,2))},Rc=(e,t)=>{let r=Fte(e,t);if(!bc.default.existsSync(r))return null;try{let o=JSON.parse(bc.default.readFileSync(r,"utf8"));return!rbe(o)||typeof o.id!="string"?null:o}catch{return null}},dN=e=>{let t=Hte(e),r=bc.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Rc(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var obe,zte,Ute=l(()=>{"use strict";X_();Mte();Nte();Rg();pN();obe=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=jte({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:cN.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},zte=(e,t)=>{let r=obe(t);$te(e,r);let o=t.projectId?.trim()??"";if(o.length>0){let n=go(t.originalPrompt);Ym({projectId:o,taskId:t.agentRunId,agentRunId:t.agentRunId,status:r.status,promptSummary:n,resultSummary:t.output,createdAt:r.createdAt,completedAt:r.completedAt,writerAgent:t.writerAgent??null,threadKey:null})}return r}});var Bte=l(()=>{"use strict";r_()});var Gte,Kte=l(()=>{"use strict";ft();Gte=()=>[My,`agentRunWriterExecutionBackend=${Ny}`,`agentRunWriterExecutionReasonCode=${dw}`].join(`
`)});var uN,nbe,sbe,Vte,qte=l(()=>{"use strict";uN=e=>e.toLocaleString("en-US"),nbe=e=>e<.01?e.toFixed(4):e.toFixed(3),sbe=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${nbe(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${uN(e.inputTokens)} in / ${uN(e.outputTokens)} out (${uN(e.totalTokens)} total)`,t].join(`
`)},Vte=(e,t)=>{if(t===void 0)return e;let r=sbe(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Jte=l(()=>{"use strict";te()});var Zte,kg,ke,jb,mN,Mb,Yte,Xte,ibe,abe,Qte,ere,tre,wg,gN,fN,yN,rre,lbe,cr,Eg,sn,ore,cbe,dbe,Nb,hN,SN,Tg,pbe,PN,nre=l(()=>{"use strict";Zte=require("node:child_process");te();ft();fr();Ow();Wee();dm();FM();Nee();Nd();BM();Rb();kb();qee();_a();Xee();wb();Tb();Cb();Ate();QM();Dy();lN();Ute();Bte();Kte();Rg();qte();Ra();Jte();ug();cd();Cb();kg=new Map,ke=new Map,jb=new Set,mN=new Set,Mb=new Map,Yte=Yd(),Xte=e=>{e!==void 0&&!Mb.has(e)&&Mb.set(e,Date.now())},ibe=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(mo(t)){cr(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}on(t,n)},abe=(e,t,r,o,n)=>{if(!tE(e,n))return;let s=`${Gte()}
`;ibe(t,r,o,s);let i=ke.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},Qte=130,ere=`

Stopped by user.`,tre=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:go(e)},wg=null,gN=e=>{wg=e},fN=(e,t)=>{if(wg===null)return;let r=iW(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||oT(wg,t,r)},yN=async e=>{await qM({layout:e,cloudApi:wg})},rre=e=>{let t=kg.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:qt(t.pid)},lbe=e=>Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),cr=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(Br(t)))},Eg=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=ua(s),c=ke.get(r);if(a!==null&&c!==void 0){let d=VF(a),p=rre(r)||rN(r);d!==null&&!p&&sn(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return KF(a)}}),sn=(e,t,r,o,n,s,i,a,c)=>{if(r!==void 0){if(Yte.has(r))return;Yte.add(r)}let d=xa(s,a),p=n,m=Vte(d.output,d.llmUsage);if(r!==void 0){let y=Mb.get(r);Mb.delete(r),y!==void 0&&nW({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-y)/1e3))});let S=Mee(d.llmUsage,m);S!==null&&g7({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:S})}r!==void 0&&Pg(r),r!==void 0&&mN.has(r)?(mN.delete(r),jb.delete(r),p=G$,m=ote(m.replace(/\n*Stopped by user\.$/,""))):r!==void 0&&jb.has(r)&&(jb.delete(r),p=Qte,m=m.trim().length>0&&!m.includes("Stopped by user.")?`${m.trim()}${ere}`:"Stopped by user."),m=fn(m).scrubbed;let g=r!==void 0?iW(e.layout.reportsDir,r):null;if(r!==void 0){hg(r),Vd(e.layout,r);let y=mo(r);y&&(cr(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),Zee(r));let S=ke.get(r);p7({reportsDir:e.layout.reportsDir,agentRunId:r,input:go(i),output:m,...S!==void 0?{writerLabel:mg({writerAgent:S.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),S!==void 0&&e_({layout:e.layout,writerAgent:S.writerAgent,projectFolderPath:S.projectFolderPath,userPrompt:S.userTranscriptPrompt,assistantOutput:m,agentRunId:r}),zte(e.layout,{agentRunId:r,originalPrompt:i,exitCode:p,output:m,layout:e.layout,...S!==void 0&&S.projectId!==void 0&&S.projectId.trim().length>0?{projectId:S.projectId.trim()}:{},...S!==void 0?{writerAgent:S.writerAgent}:{}}),Kee(e.layout,{runId:r,exitCode:p,output:m,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),qM({layout:e.layout,cloudApi:wg});let A={type:"command.claude.result",payload:{exitCode:p,output:m,agentRunId:r,...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{},...c!==void 0?{errorCode:c}:{}},...o!==void 0?{requestId:o}:{}};Fee(e.layout,{runId:r,resultMessage:A,...y?{terminalEndMessage:{type:"terminal.stream.end",payload:{runId:r},...o!==void 0?{requestId:o}:{}}}:{},createdAt:new Date().toISOString()}),ke.delete(r),kg.delete(r),Sb(e.layout,r)}cr(t,{type:"command.claude.result",payload:{exitCode:p,output:m,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{},...c!==void 0?{errorCode:c}:{}},requestId:o}),bd(e.layout)},ore=(e,t,r,o,n,s,i)=>{let a=ke.get(r),c=a?.accumulatedOutput??s;Pg(r),xee(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),qi(t,r,()=>HM(e.layout,r),Eg(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),cr(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},cbe=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,p=y=>{if(!(n===void 0||y.length===0)){if(mo(n)){cr(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:y},requestId:o});return}on(n,y)}};if(n!==void 0){let y=ke.get(n);kg.set(n,t),ke.set(n,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,projectId:y?.projectId,accumulatedOutput:y?.accumulatedOutput??""}),cr(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),qi(r,n,()=>rre(n),Eg(e,r,n,o,y?.projectFolderPath,y?.reportKey))}let m=a==="claude-cli",g=[];t.stdout?.on("data",y=>{let S=y.toString("utf8");if(m?g.push(S):(c.push(S),p(S)),d||n===void 0)return;let A=Ag(c.join(""));if(A!==null){d=!0,t.kill("SIGTERM");let E=ke.get(n),I=[E?.accumulatedOutput??"",A.partialOutput].filter(f=>f.length>0).join(`

`);E!==void 0&&(E.accumulatedOutput=I),kg.delete(n),ore(e,r,n,o,A.question,I,s)}}),t.stderr?.on("data",y=>{let S=y.toString("utf8");c.push(S),p(S)}),t.on("close",y=>{if(d)return;Wb(a);let S=n!==void 0?ke.get(n):void 0,A=m?xa(g.join("")):{output:c.join("").trim(),llmUsage:void 0},E=m?c.join("").trim():"",I=[A.output.trim(),E].filter(P=>P.length>0).join(`
`);m&&A.output.trim().length>0&&p(A.output);let f=S!==void 0&&S.accumulatedOutput.length>0?`${S.accumulatedOutput}

${I}`.trim():I;sn(e,r,n,o,y??-1,f,s,A.llmUsage)}),t.on("error",y=>{d||sn(e,r,n,o,-1,y.message,s)})},dbe=(e,t,r,o,n,s,i,a,c,d)=>{let p=tre(r,c);s!==void 0&&(ke.set(s,{originalPrompt:r,userTranscriptPrompt:p,writerAgent:t,projectFolderPath:i,reportKey:a,projectId:d,accumulatedOutput:""}),cr(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),qi(n,s,()=>ke.has(s),Eg(e,n,s,o,i,a))),$d(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(mo(s)){cr(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}on(s,g)}}).then(g=>{Wb(t),sn(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let y=g instanceof Error?g.message:String(g);sn(e,n,s,o,-1,y,r)})},Nb=(e,t,r,o,n,s,i,a,c,d,p,m,g)=>{let y=tre(r,p);_d(e.layout);let S=f=>{sn(e,n,s,o,-1,Ls(f),r,void 0,f)};if(_o(e.layout.configPath)){S(de.CODING_TOOLS_PAUSED);return}if(Ws(e,t)){Xte(s),dbe(e,t,r,o,n,s,c,d,y,g);return}let A=Yt(t,r,lbe(e),i);if(A===null){sn(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}if(c===void 0||c.trim().length===0){S(de.FOLDER_REQUIRED);return}Xte(s);let E=Yee({workspace:e.workspace,projectFolderPath:c}),I=()=>{Yy(t);let f=(0,Zte.spawn)(A.command,[...A.args],{cwd:E,stdio:["ignore","pipe","pipe"],env:m??process.env,detached:process.platform!=="win32"});cbe(e,f,n,o,s,r,y,t)};if(s===void 0){I();return}rte(s,()=>{pbe(e,n,s,o)}),ke.set(s,{originalPrompt:r,userTranscriptPrompt:y,writerAgent:t,projectFolderPath:c,reportKey:d,projectId:g??ke.get(s)?.projectId,accumulatedOutput:ke.get(s)?.accumulatedOutput??""}),abe(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&ld({reportKey:d,agentRunId:s,userSummary:"Task started on your computer."}),qi(n,s,()=>ke.has(s),Eg(e,n,s,o,c,d)),Pte({socket:n,sendMessage:cr,requestId:o,agentRunId:s,shellSessionId:a,command:A.command,args:A.args,cwd:E,processEnv:m,originalPrompt:r,writerAgent:t,onInputRequired:f=>{a!==void 0&&Pc(a,h=>{cr(n,h)},o);let P=ke.get(s),_=[P?.accumulatedOutput??"",f.partialOutput].filter(h=>h.length>0).join(`

`);P!==void 0&&(P.accumulatedOutput=_),ore(e,n,s,o,f.question,_,r)},onFinished:(f,P)=>{Wb(t);let _=xa(P),h=ke.get(s),b=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${_.output}`.trim():_.output;sn(e,n,s,o,f,b,r,_.llmUsage)}}).then(f=>{if(!f){I();return}qi(n,s,()=>rN(s),Eg(e,n,s,o,c,d))}).catch(f=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",f instanceof Error?f.message:f),I()})},hN=(e,t,r,o)=>{Sb(e.layout,t.agentRunId),t.shellSessionId!==void 0&&cr(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=Ste(t),s=ke.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;Nb(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt,void 0,s?.projectId)},SN=(e,t)=>{for(let r of vee(e.layout))ke.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:go(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),qi(t,r.agentRunId,()=>HM(e.layout,r.agentRunId),{awaitingInput:!0}),cr(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Tg=(e,t,r,o)=>{let n=ke.get(r);if(n===void 0)return!1;jb.add(r),hg(r),Pg(r);let s=kg.get(r);if(s!==void 0)return nte(s),!0;if(gte(r))return!0;Sb(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${ere}`:"Stopped by user.";return sn(e,t,r,o,Qte,i,n.originalPrompt),!0},pbe=(e,t,r,o)=>ke.has(r)?(mN.add(r),Tg(e,t,r,o)):!1,PN=(e,t)=>[...ke.keys()].filter(r=>Tg(e,t,r)).length});var ube,AN,sre=l(()=>{"use strict";ep();ube=()=>`http://127.0.0.1:${yr()}/restart`,AN=async()=>{try{let e=await fetch(ube(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var ire=l(()=>{"use strict";qp()});var are=l(()=>{"use strict";zW()});var _N,lre=l(()=>{"use strict";_N=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Ig,mbe,bN,RN,cre=l(()=>{"use strict";X();ye();ire();eC();are();lre();Ra();Ig=(e,t)=>{Cn(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},mbe=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ow(),rw)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},bN=e=>_N({localBundleVersion:De(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),RN=async e=>{let t=De(e.layout.installDir)?.bundleVersion??null;if(!_N({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Jt(e.layout)){Rd({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Ig(e.layout,{summary:r,action:"install-bundle-update-start"}),ho({launchAgentLabel:we(e.layout.installDir),installDir:e.layout.installDir});let o=await Vl({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Ig(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await mbe();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Ig(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Ig(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Ig(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var gbe,kN,dre=l(()=>{"use strict";gbe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kN=e=>{if(!gbe(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var wN,EN,pre=l(()=>{"use strict";II();CI();wN=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=vp({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},EN=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Oo(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var ure,fbe,ybe,hbe,kc,mre=l(()=>{"use strict";ure=u(require("node:os"));it();fbe="Default",ybe=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),hbe=e=>{let t=ure.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},kc=()=>{let e=z(),t=Kc(e),r=ybe(fbe);return`${hbe(t)}/${r.length>0?r:"project"}`}});var gre=l(()=>{"use strict";qp()});var fre,TN,yre=l(()=>{"use strict";gre();fre=!1,TN=e=>{fre||(fre=!0,process.on("uncaughtException",t=>{ei(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;ei(e,{kind:"crash",message:r,stack:o})}))}});var hre,Sbe,IN,Sre=l(()=>{"use strict";hre=require("node:child_process");Lb();fr();Ab();Pb();ug();_b();Sbe=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,hre.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},IN=async e=>{if(!Oe(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&at(e.runConfig.writerExecutionBackend)==="api"){let r=jt(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Ze(e.layout.configPath),n=Rt(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.`}}}try{await nn(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await Sbe(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var CN,Pre=l(()=>{"use strict";CN=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var Are,LN,_re=l(()=>{"use strict";Are=require("node:crypto"),LN=()=>(0,Are.randomUUID)()});var wc,bre,Db=l(()=>{"use strict";wc="[[WORKING_ESTIMATE]]",bre=(e,t,r,o="")=>["Estimate how long the following task will take on this computer, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",wc,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Rre,kre=l(()=>{"use strict";Rre=e=>e===null||e<=0?"Estimate saved locally. Starting work on your computer\u2026":e<60?`Estimated ~${e}s. Starting work on your computer\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your computer\u2026`});var Pbe,wre,Ere=l(()=>{"use strict";Db();Pbe=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,wre=e=>{if(!e.includes(wc))return null;let t=null;for(let r of e.matchAll(Pbe)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var Abe,vN,Tre=l(()=>{"use strict";Ere();Abe=/^(\d{1,6})\b/,vN=e=>{let t=wre(e);if(t!==null)return t;let r=Abe.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var _be,bbe,Rbe,Hb,xN=l(()=>{"use strict";fr();Kp();_be="http://127.0.0.1:11434",bbe=45e3,Rbe=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},Hb=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||_be,o=t===void 0?(await Rr({commands:Ae({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(bbe)});return n.ok?Rbe(await n.json()):null}catch{return null}}});var WN,ON,jN,Ire=l(()=>{"use strict";cd();Db();Rg();kre();Tre();dm();xN();WN=async e=>{let t=go(e.wrappedPrompt),r=u7(e.reportsDir);return{estimateOutput:await Hb(bre(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},ON=e=>{let t=vN(e.estimateOutput);t!==null&&VA({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},jN=e=>{let t=vN(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=Rre(t);return ad({reportKey:e.reportKey,agentRunId:e.agentRunId,status:Fr.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),VA({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var Fb,Cre,MN=l(()=>{"use strict";Fb="[[WORKING_TOKEN_ESTIMATE]]",Cre=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this computer.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Fb,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var Lre,kbe,vre,xre=l(()=>{"use strict";MN();Lre=/^(\d{1,8})\b/,kbe=e=>{let t=e.indexOf(Fb);if(t<0)return null;let r=e.slice(t+Fb.length).trim(),o=Lre.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},vre=e=>{let t=kbe(e);if(t!==null)return t;let r=Lre.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var NN,DN,Wre=l(()=>{"use strict";MN();Rg();xre();dm();xN();NN=async e=>{let t=go(e.wrappedPrompt),r=f7(e.reportsDir);return{estimateOutput:await Hb(Cre(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},DN=e=>{let t=vre(e.estimateOutput);return t===null?null:(m7({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var Ore=l(()=>{"use strict";OM();_ee();Ree();Tee();ep();nre();Lb();fr();pN();wb();sre();UI();cre();Ra();dre();pre();kb();mre();yre();Sre();ay();Pre();_re();Db();cd();Ire();Wre();FM();Kp();Tb();lN();Zk();Rb()});var jre={};vt(jre,{buildContinuationPromptWithContext:()=>Tbe});var wbe,Ebe,Tbe,Mre=l(()=>{"use strict";wbe=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Ebe=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Tbe=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=Ebe(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${wbe(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var Nre={};vt(Nre,{readHarnessExportSets:()=>Cbe});var Cg,HN,$b,Ibe,Cbe,Dre=l(()=>{"use strict";Cg=u(require("node:fs")),HN=u(require("node:path"));it();$b=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ibe=e=>{if(!Cg.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Cg.default.readFileSync(e.harnessManifestPath,"utf8"));if($b(t))return t}catch{return null}return null},Cbe=(e,t)=>{let r=z(t),o=Ibe(r);if(o===null)return[];let n=$b(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!$b(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let p of c){if(!$b(p))continue;let m=typeof p.path=="string"?p.path:void 0,g=typeof p.id=="string"?p.id:"",y=typeof p.kind=="string"?p.kind:"",S=typeof p.title=="string"?p.title:"";if(m===void 0||g.length===0||y.length===0||S.length===0)continue;let A=m.startsWith("shared/")?HN.default.join(r.harnessRootDir,m):HN.default.join(r.harnessSetsDir,i,m);Cg.default.existsSync(A)&&d.push({id:g,kind:y,title:S,content:Cg.default.readFileSync(A,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var VN,UN,Ec,Hre,Lbe,Fre,$re,FN,$N,zre,BN,GN,KN,Ure,zN,me,ee,zb,vbe,Lg,xbe,Wbe,Obe,jbe,Mbe,Nbe,Dbe,Hbe,vg,Bre=l(()=>{"use strict";VN=require("node:child_process"),UN=u(require("node:fs")),Ec=u(require("node:os"));dee();X();ye();Ts();rM();gee();te();X_();te();zr();qp();mL();tb();r_();St();bn();dC();pr();ft();yee();Ore();Hre=3e4,Lbe=3e4,Fre=new Map,$re=new Map,FN=new Map,$N=new Map,zre=e=>{try{Ym({projectId:e.projectId,taskId:e.agentRunId,agentRunId:e.agentRunId,status:e.status,...e.promptBody!==void 0?{promptBody:e.promptBody}:{},...e.resultBody!==void 0?{resultBody:e.resultBody}:{},...typeof e.writerAgent=="string"?{writerAgent:e.writerAgent}:{},...e.completedAt!==void 0?{completedAt:e.completedAt}:{completedAt:null}})}catch{}},BN=new Map,GN=new Map,KN=new Map,Ure=Yd(),zN=new Set,me=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ee=(e,t,r)=>{if(e.readyState===fc.OPEN){let o=Br(t);e.send(JSON.stringify(o)),r!==void 0&&(Cn(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),tP(r,"out",o))}},zb=e=>e,vbe=e=>{if(!UN.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(UN.default.readFileSync(e.harnessManifestPath,"utf8"));if(me(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},Lg=(e,t)=>{let r=vbe(t);r!==null&&ee(e,{type:"harness.manifest.report",payload:{hostname:Ec.default.hostname(),manifest:r}})},xbe=async(e,t,r,o,n,s,i=!1,a,c,d,p,m)=>{let g=m?.trim()??"";if(!Oe(t)){ee(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let y=mg({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),S=await Rr({commands:Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),A=s!==void 0?WN({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:S?.estimateModel,capabilityNote:S?.capabilityNote}).catch(()=>null):null,E=s!==void 0?NN({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:S?.estimateModel,capabilityNote:S?.capabilityNote}).catch(()=>null):null,I=bg(t)&&!nN(t);if(I){try{await nn(e.layout.installDir,t)}catch(M){let F=M instanceof Error?M.message:String(M);ee(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${F}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}_g(t)}else if(!bg(t))try{await nn(e.layout.installDir,t)}catch(M){let F=M instanceof Error?M.message:String(M);ee(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${F}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let f=Gd(d,kc,m);if(f===null){ee(n,Xd({code:de.FOLDER_REQUIRED,...s!==void 0?{agentRunId:s}:{},...o!==void 0?{requestId:o}:{}}));return}Mt({projectFolderPath:f,...g.length>0?{projectId:g}:{}}),i||fm(e.layout,t,f);let P=typeof c=="string"&&c.trim().length>0,_=t_({sessionContinuation:i,supportsWriterSessionContinuation:vb(t),isWriterConversationStarted:xb(t),hasSourceRunId:P}),h=i&&_==="first"?gm(e.layout,t,f):null,b=h!==null?Gl(e.layout,h):null,C=b!==null&&b.turns.length>0,H=_W({sessionContinuation:i,supportsWriterSessionContinuation:vb(t),isWriterConversationStarted:xb(t),hasSourceRunId:P,hasCanonicalTurns:C,userPromptCharacterCount:r.length}),D=r;if(H.continuationStrategy==="source_run_seed"){let M=typeof c=="string"&&c.length>0?Rc(e.layout,c):null;if(M!==null){let{buildContinuationPromptWithContext:F}=await Promise.resolve().then(()=>(Mre(),jre));D=F({priorPrompt:M.prompt,priorOutput:M.resultOutput??"",userMessage:r})}}else H.continuationStrategy==="transcript_seed"&&b!==null&&b.turns.length>0&&(D=YA({priorTurns:b.turns,userMessage:r}));let w=H.ragLimit>0?await yl({layout:e.layout,query:D,limit:H.ragLimit,minScore:H.ragMinScore,projectFolderPath:f,...g.length>0?{projectId:g}:{}}):[],k=H.ragLimit>0&&f.trim().length>0?await pL({layout:e.layout,query:D,limit:2,minScore:.32,projectFolderPath:f,...g.length>0?{projectId:g}:{}}):[],W=H.injectMemory?pW(e.layout,f,g.length>0?g:void 0):[],v=`${mW(W,H.memoryEntryLimit)}${lL(w)}${uL(k)}${D}`,j=p?.trim()??(s!==void 0&&f.trim().length>0?LN():void 0);if(s!==void 0&&j!==void 0&&j.length>0&&f.trim().length>0){ld({reportKey:j,agentRunId:s,userSummary:"Working on your computer\u2026"});let M=v;A!==null&&A.then(F=>{if(F===null)return;let oe=jN({estimateOutput:F.estimateOutput??"",reportKey:j,agentRunId:s,reportsDir:e.layout.reportsDir,task:F.task,writerLabel:F.writerLabel,embedding:F.embedding});if(oe.estimateSeconds===null)return;fN(e.layout.reportsDir,s);let xe=`${wc}
${oe.estimateSeconds}
`;if(mo(s)){ee(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:xe},requestId:o});return}on(s,xe)}).catch(()=>{}),v=CN(M),v=mk(v,{agentRunId:s,reportKey:j,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&A!==null&&A.then(M=>{M!==null&&ON({estimateOutput:M.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:M.task,writerLabel:M.writerLabel,embedding:M.embedding})}).catch(()=>{}),s!==void 0&&E!==null&&E.then(M=>{M!==null&&DN({estimateOutput:M.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:M.task,writerLabel:M.writerLabel})}).catch(()=>{});let N=s!==void 0&&KN.get(s)===!0;if(s!==void 0&&f.trim().length>0){let M=await Qh(f);GN.set(s,M),j!==void 0&&j.length>0&&BN.set(s,j)}Nb(e,t,v,o,zb(n),s,{sessionTurn:H.sessionTurn},a,f,j,r,Yw(e.layout,s,N),g.length>0?g:void 0),I&&s!==void 0&&ee(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:iN(t)},requestId:o})},Wbe=async(e,t,r,o,n)=>{let s=(i,a)=>{ee(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await aN({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:p=>{i+=p,ee(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:p},requestId:o})}}),c=Oe(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?Ac(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Obe=(e,t,r)=>new Promise(o=>{if(!Oe(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Yt(t,r,Ae({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,VN.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),jbe=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;ee(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Vr(t.bundle),s=me(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let p=Je(e.wsUrl)??xt,m=await DE({appOrigin:p,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return m.ok?m.bundle:null})();if(i===null)return ee(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=Ds({bundle:i,layout:e.layout});return ee(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&Lg(o,e.layout),!0},Mbe=async(e,t,r,o)=>{if(await jbe(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(ee(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){ee(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!Oe(n)){ee(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}if(_o(e.layout.configPath)){ee(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorCode:de.CODING_TOOLS_PAUSED,errorMessage:Xd({code:de.CODING_TOOLS_PAUSED}).payload.output},requestId:r});return}_d(e.layout);let i=await(async()=>{try{await nn(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Obe(e,n,s)})().finally(()=>{bd(e.layout)});ee(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),Lg(o,e.layout)},Nbe=e=>{let t=1e3*2**e;return Math.min(Lbe,t)},Dbe=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=f=>t.restartInFlight?"already_in_progress":Jt(e.layout)?(ba(f),console.log(`[agent-witch] Deferring local restart (${f}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${f})\u2026`),t.wakeError=`restart:${f}`,AN().then(P=>{if(P.ok){console.log("[agent-witch] Local restart completed.");return}if(!P.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",P.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=f=>{if(t.restartInFlight)return"already_in_progress";if(Jt(e.layout))return ba(f),console.log(`[agent-witch] Deferring host restart (${f}) until the active writer task finishes.`),"deferred_writer_busy";let P=De(e.layout.installDir)?.bundleVersion??"unknown";return t.restartInFlight=!0,console.log(`[agent-witch] Host restart into updated bundle requested (${f})\u2026`),wd({installDir:e.layout.installDir,bundleVersion:P}).then(_=>{_.ok||(t.wakeError=_.message,console.error(`[agent-witch] Host restart after bundle update failed: ${_.message}`))}).finally(()=>{t.restartInFlight=!1}),"accepted"},n=(f,P,_,h)=>{ee(f,{type:"device.restart.ack",payload:sE({status:_,reason:P}),...h!==void 0?{requestId:h}:{}},e.layout)},s=(f,P="system.ack")=>{if(!t.selfUpdateInFlight&&bN({installDir:e.layout.installDir,remoteBundleVersion:f})){if(Jt(e.layout)){Rd({layout:e.layout,remoteBundleVersion:f,trigger:P}),console.log(`[agent-witch] Deferring install bundle update (${f} via ${P}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,RN({layout:e.layout,remoteBundleVersion:f,trigger:P}).finally(()=>{t.selfUpdateInFlight=!1})}},i=()=>{let f=He(e.layout);f!==null&&Ye(f,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,d(),p(),A())},a=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},c=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},d=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},p=()=>{if(t.socket===void 0)return;let f=t.socket;t.socket=void 0,t.wsConnected=!1,f.removeAllListeners("open"),f.removeAllListeners("message"),f.removeAllListeners("close"),f.on("error",()=>{}),(f.readyState===fc.OPEN||f.readyState===fc.CONNECTING)&&f.close()},m=()=>{c(),t.localHealthTimer=setInterval(i,Hre)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let f=Nbe(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${f}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},f)},y=f=>{a();let P=()=>{let _=Sd(e.layout.installDir),h=yr();ee(f,{type:"agent.heartbeat",payload:{hostname:Ec.default.hostname(),macOsUsername:Ec.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:_}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};P(),t.heartbeatTimer=setInterval(P,Hre)},S=(f,P)=>{if(typeof f.type!="string")return;if(cC(f)){t.stopped=!0,a(),d(),p(),iC({layout:e.layout}).finally(()=>{ag(),process.exit(0)});return}Cn(e.layout,{direction:"in",type:f.type,summary:"inbound WS frame"}),tP(e.layout,"in",f);let _=typeof f.requestId=="string"?f.requestId:void 0;if(f.type==="device.auth.attestation"&&me(f.payload)){let h=typeof f.payload.serverPublicKey=="string"?f.payload.serverPublicKey:"",b=typeof f.payload.origin=="string"?f.payload.origin:"",C=typeof f.payload.devicePublicKey=="string"?f.payload.devicePublicKey:"",H=typeof f.payload.challenge=="string"?f.payload.challenge:"",D=typeof f.payload.serverAttestation=="string"?f.payload.serverAttestation:"";if(!tM({serverPublicKey:h,origin:b,devicePublicKey:C,challenge:H,serverAttestation:D})){t.wakeError="Server attestation verification failed",Cn(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(f.type==="writer.ensure"&&me(f.payload)){let h=typeof f.payload.writerAgent=="string"?f.payload.writerAgent:"";Cn(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),IN({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(b=>{ee(P,{type:"writer.status",payload:b},e.layout)})}if(f.type==="install.bundle.update"&&me(f.payload)){let h=typeof f.payload.bundleVersion=="string"?f.payload.bundleVersion.trim():"";h.length>0&&s(h,"install.bundle.update")}if(f.type==="system.ack"){Wy(e.layout,{wsUrl:e.wsUrl});let h=me(f.payload)?f.payload:null,b=kN(h);b!==null&&s(b)}if(f.type==="device.restart"){let h=r("cloud-device-restart");n(P,"cloud-device-restart",h,_)}if(f.type==="automations.sync"&&me(f.payload)&&wN(f.payload),f.type==="project.message.history"&&me(f.payload)){V0({payload:f.payload});return}if(f.type==="project.history.page.request"&&me(f.payload)){let h=dO({payload:f.payload});ee(P,{type:"project.history.page.result",payload:h,requestId:_});return}if(f.type==="automations.run"&&me(f.payload)&&EN(f.payload),f.type==="terminal.stream.accepted"&&me(f.payload)){let h=typeof f.payload.runId=="string"?f.payload.runId:"";if(h.length>0){let b=XM(h);for(let C of b)ee(P,{type:"terminal.stream.chunk",payload:{runId:h,chunk:C},requestId:_})}}if(f.type==="agent.agentRun.list"&&ee(P,{type:"dashboard.agentRun.list.result",payload:{runs:dN(e.layout)},requestId:_}),f.type==="agent.agentRun.get"&&me(f.payload)){let h=typeof f.payload.runId=="string"?f.payload.runId:"",b=h.length>0?Rc(e.layout,h):null;ee(P,{type:"dashboard.agentRun.get.result",payload:{run:b},requestId:_})}if(f.type==="command.claude.run"&&me(f.payload)){let h=f.payload.prompt,b=typeof f.payload.writerAgent=="string"&&Oe(f.payload.writerAgent)?f.payload.writerAgent:"claude-cli",C=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:void 0,H=f.payload.sessionContinuation===!0,D=typeof f.payload.sourceRunId=="string"?f.payload.sourceRunId:void 0,w=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:void 0,k=typeof f.payload.projectId=="string"?f.payload.projectId:void 0,W=Gd(typeof f.payload.projectFolderPath=="string"?f.payload.projectFolderPath:void 0,kc,k),v=Uw(f.payload.compositionSnapshot),j=typeof f.payload.reportKey=="string"?f.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${b} task (${H?"continue":"first"})\u2026`),C!==void 0&&(Ure.has(C)||zN.has(C)||Rc(e.layout,C)!==null)){console.log(`[agent-witch] Ignoring duplicate run ${C}.`);return}let N=F=>{ee(P,Xd({code:F,...C!==void 0?{agentRunId:C}:{},..._!==void 0?{requestId:_}:{}}))},M=F=>{if(v!==null){let oe=Gw(e.layout,v);if(oe!==null){ee(P,{type:"command.claude.result",payload:{exitCode:-1,output:oe,...C!==void 0?{agentRunId:C}:{}},requestId:_});return}if(C!==void 0){let xe=Vw(e.layout,C,v);if(!xe.ok){ee(P,{type:"command.claude.result",payload:{exitCode:-1,output:xe.errorMessage,...C!==void 0?{agentRunId:C}:{}},requestId:_});return}KN.set(C,v.entries.some(ut=>ut.scope==="run"))}}C!==void 0&&w!==void 0&&Fre.set(C,w),C!==void 0&&($re.set(C,F),k!==void 0&&k.trim().length>0&&FN.set(C,k.trim()),$N.set(C,h.trim()),k!==void 0&&k.trim().length>0&&zre({projectId:k.trim(),agentRunId:C,status:"running",promptBody:h.trim(),resultBody:null,writerAgent:b,completedAt:null}),Mt({projectFolderPath:F,...k!==void 0&&k.trim().length>0?{projectId:k.trim()}:{}})),xbe(e,b,h.trim(),_,P,C,H,w,D,F,j,k)};C!==void 0&&zN.add(C),fee({config:e,...k!==void 0?{projectId:k}:{},requestedFolderPath:W,defaultFolderPath:kc()}).catch(()=>({ok:!1,code:de.FOLDER_CHECK_UNAVAILABLE})).then(F=>{if(C!==void 0&&zN.delete(C),!F.ok){N(F.code);return}C!==void 0&&Ure.add(C),M(F.folderRealPath)}).catch(F=>{console.error("[agent-witch] Run start failed:",F instanceof Error?F.message:F)})}}if(f.type==="shell.session.open"&&me(f.payload)){let h=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",b=typeof f.payload.cols=="number"?f.payload.cols:120,C=typeof f.payload.rows=="number"?f.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),oN({shellSessionId:h,cwd:e.workspace,cols:b,rows:C,send:H=>{ee(P,H)},requestId:_}))}if(f.type==="shell.session.close"&&me(f.payload)){let h=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"";h.length>0&&Pc(h,b=>{ee(P,b)},_)}if(f.type==="shell.input"&&me(f.payload)){let h=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",b=typeof f.payload.data=="string"?f.payload.data:"";h.length>0&&b.length>0&&eN(h,b)}if(f.type==="shell.resize"&&me(f.payload)){let h=typeof f.payload.shellSessionId=="string"?f.payload.shellSessionId:"",b=typeof f.payload.cols=="number"?f.payload.cols:0,C=typeof f.payload.rows=="number"?f.payload.rows:0;h.length>0&&b>0&&C>0&&tN(h,b,C)}if(f.type==="command.writer.session.end"&&me(f.payload)){let h=f.payload.writerAgent;typeof h=="string"&&Oe(h)&&(sN(h),QA(e.layout,h))}if(f.type==="command.writer.session.start"&&me(f.payload)){let h=f.payload.writerAgent,b=typeof f.payload.writerSessionId=="string"?f.payload.writerSessionId:"";typeof h=="string"&&Oe(h)&&b.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),Wbe(e,h,b,_,P))}if(f.type==="command.claude.stop"&&me(f.payload)){let h=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),Tg(e,zb(P),h,_))}if(f.type==="command.claude.input_respond"&&me(f.payload)){let h=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:"",b=typeof f.payload.response=="string"?f.payload.response.trim():"",C=typeof f.payload.originalPrompt=="string"?f.payload.originalPrompt:"",H=typeof f.payload.partialOutput=="string"?f.payload.partialOutput:"",D=typeof f.payload.question=="string"?f.payload.question:"";h.length>0&&b.length>0&&C.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),hN(e,{agentRunId:h,originalPrompt:C,partialOutput:H,question:D,response:b,shellSessionId:Fre.get(h)},_,zb(P)))}if(f.type==="dispatch.approval.required"&&me(f.payload)){let h=typeof f.payload.requesterEmail=="string"?f.payload.requesterEmail:"A teammate",b=typeof f.payload.prompt=="string"?f.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${b}`),process.platform==="darwin"&&(0,VN.spawn)("osascript",["-e",`display notification "${b.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(f.type==="harness.request"&&me(f.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),Mbe(e,f.payload,_,P)),f.type==="harness.export.request"&&me(f.payload)){let h=typeof f.payload.borrowerUserId=="string"?f.payload.borrowerUserId:"",b=typeof f.payload.targetDeviceId=="string"?f.payload.targetDeviceId:void 0,C=Array.isArray(f.payload.setSlugs)?f.payload.setSlugs.filter(H=>typeof H=="string"):[];h.length>0&&C.length>0&&(async()=>{let{readHarnessExportSets:H}=await Promise.resolve().then(()=>(Dre(),Nre)),D=H(C,e.email);ee(P,{type:"harness.export.result",payload:{success:D.length>0,borrowerUserId:h,...b!==void 0?{targetDeviceId:b}:{},sets:D,errorMessage:D.length>0?void 0:"No readable harness sets were found on this machine."},requestId:_})})()}if(f.type==="harness.manifest.request"&&Lg(P,e.layout),f.type==="command.claude.result"&&me(f.payload)){let h=typeof f.payload.agentRunId=="string"?f.payload.agentRunId:void 0,b=typeof f.payload.output=="string"?f.payload.output:"",C=typeof f.payload.exitCode=="number"?f.payload.exitCode:null,H=Gd(h!==void 0?$re.get(h):void 0,kc),D=h!==void 0?FN.get(h):void 0,w=h!==void 0?$N.get(h)??"":"",k=wT({exitCode:C,output:b});if(k&&H!==null&&aL({layout:e.layout,text:b,source:h??"command.claude.result",projectFolderPath:H,...D!==void 0?{projectId:D}:{}}),C!=null&&C!==0&&b.trim().length>0&&H!==null&&(rL({layout:e.layout,errorText:b,projectFolderPath:H,...D!==void 0?{projectId:D}:{}}),dL({layout:e.layout,text:b,source:h??"command.claude.result.failure",projectFolderPath:H,...D!==void 0?{projectId:D}:{}})),k&&w.trim().length>0&&H!==null&&uW({layout:e.layout,projectFolderPath:H,...D!==void 0?{projectId:D}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:w,output:b,createdAt:new Date().toISOString()}}),h!==void 0&&H!==null){let v=BN.get(h),j=GN.get(h);v!==void 0&&j!==void 0&&Qh(H).then(N=>{let M=CT({before:j,after:N});gk(v,M),GN.delete(h),BN.delete(h)})}if(k&&D!==void 0&&D.trim().length>0){let v=B(),j=v===null?null:q({wsUrl:v.wsUrl,pairingToken:v.pairingToken});j!==null&&vT(j,D,{...h!==void 0?{sourceRunId:h}:{},lesson:LT({prompt:w,output:b})})}if(h!==void 0&&D!==void 0&&D.trim().length>0){let v=C==null||C===0?"completed":"failed";zre({projectId:D.trim(),agentRunId:h,status:v,promptBody:w.length>0?w:void 0,resultBody:b,completedAt:new Date().toISOString()})}h!==void 0&&(Vd(e.layout,h),KN.delete(h),FN.delete(h),$N.delete(h))}},A=()=>{if(t.stopped)return;d(),p();let f=new fc(e.wsUrl);t.socket=f,f.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),gN(q({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),yN(e.layout),UM({layout:e.layout,send:b=>{ee(f,b)}});let P=Je(e.wsUrl)??"http://localhost:3000",_=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=eM({layout:e.layout,origin:P,..._!==void 0&&_.length>0?{claimToken:_}:{}});ee(f,{type:"agent.register",payload:{role:"agent",hostname:Ec.default.hostname(),macOsUsername:Ec.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),Lg(f,e.layout),SN(e,f),y(f)}),f.on("message",P=>{let _=typeof P=="string"?P:P.toString("utf8");try{let h=JSON.parse(_);if(!me(h))return;S(h,f)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),f.on("close",(P,_)=>{a(),t.socket=void 0,t.wsConnected=!1,sw(e.layout),t.reconnectAttempt+=1;let h=typeof _=="string"?_:_.toString("utf8");ei(e.layout,{kind:"ws_close",message:"WebSocket closed",code:P,reason:h}),console.log("[agent-witch] Disconnected from server."),g()}),f.on("error",P=>{t.wakeError=P.message,ei(e.layout,{kind:"ws_error",message:P.message,stack:P.stack}),console.error(`[agent-witch] Socket error: ${P.message}`)})},E=aE(e.layout.configPath,f=>{if(!f)return;let P=PN(e,zb(t.socket??{readyState:fc.CLOSED,send:()=>{}}));console.log(`[agent-witch] Coding tools paused; stopped ${P} run(s).`)}),I=()=>{t.stopped=!0,E(),a(),c(),d(),p()};return Bk(()=>{let f=Gk();f!==null&&f.layout.installDir===e.layout.installDir&&f.layout.profileEmail===e.layout.profileEmail&&s(f.remoteBundleVersion,f.trigger);let P=Kk();if(P==="install-bundle-update"){o(P);return}P!==null&&r(P)}),{connect:A,startLocalHealthCheck:m,stop:I,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:vd(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Qm(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let f=t.socket;return!t.wsConnected||f===void 0?{ok:!1,errorMessage:"Not connected to AgentWitch \u2014 manifest saved locally only."}:(Lg(f,e.layout),{ok:!0})}}},Hbe=async()=>{Wt("agent-witch");let e=CM(),t=L();WM().ok||(process.platform==="darwin"?(await ms(t),process.stdout.write(`[agent-witch] Another AgentWitch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another AgentWitch process may already be running \u2014 exiting.
`),process.exit(0)),NM(t);let o=MM({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){ho({launchAgentLabel:we(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let E=rd({launchAgentPrefix:we(t),wakePort:qc(t)});E.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(E.length)} LaunchAgent plist(s).`)}catch(E){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${E instanceof Error?E.message:String(E)}`)}Zc()}let n=await nE(),s=n[0];s!==void 0&&TN(s.layout);for(let A of n){let E=Je(A.wsUrl)??xt;Pd(A.layout.installDir,E)}let i=n.map(A=>Dbe(A));i[0]===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),ag(),process.exit(0));let c=()=>{n.forEach((A,E)=>{let I=i[E];if(I===void 0)return;let f=He(A.layout);iw(f,{socketOpen:I.hasMacSocketOpen(),staleAfterMs:12e4})&&I.reviveWebSocket()})},d=()=>{},p=()=>{if(e.skipInProcessLive)return;let A=n[0]?.layout;A!==void 0&&(Jt(A)||Dp(A.installDir))},m=await DM({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:p,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}}),g=[];if(e.skipInProcessLive)console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE).");else for(let A=0;A<i.length;A+=1){let E=i[A],I=n[A];E===void 0||I===void 0||g.push(Zm({layout:I.layout,controllers:{getStatus:E.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:E.reportHarnessManifestIfConnected}}))}e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let A of i)A.startLocalHealthCheck(),A.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let y=So(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Qc(),d()}),S=()=>{y(),m.stop();for(let A of g)A.close();for(let A of i)A.stop();ag()};Xk(S),d=()=>{S(),console.log("[agent-witch] Shutting down."),process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},vg=Hbe});var qN=l(()=>{"use strict";Bre()});var Gre={};vt(Gre,{startAgentWitchClient:()=>vg});var Kre=l(()=>{"use strict";qN();qN();fs();fk();cy();if(!Ot()&&ys(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(ly(process.argv.slice(e))),vg()}});pk();fk();fs();cy();var YF="20.x",XF="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var ele=e=>[`Node.js ${YF} or newer is required (found ${e}).`,XF].join(" "),ZF=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${ele(process.version)}
`),process.exit(1))};hy();var Fbe=async()=>{Wt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(ow(),rw)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},$be=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(PK(),SK)),t=await e();if(t.ok){process.stdout.write(`AgentWitch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake AgentWitch. ${r}
`),process.exit(1)},zbe=async e=>{try{if(e===my){let{resolveAgentWitchLocalLayout:t}=await Promise.resolve().then(()=>(X(),XR)),{runCheckContextHookCli:r}=await Promise.resolve().then(()=>(Yr(),jG));await r({layout:t()})}else process.stderr.write(`[agent-witch] ${ya}: unknown hook ${e??"(none)"}
`)}catch(t){let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] ${ya}: ${r}
`)}await new Promise(t=>{process.stdout.write("",()=>t())}),process.exit(0)},Ube=async()=>{if(!ys(Ot()?void 0:__agentWitchImportMetaUrl))return;process.argv[2]===ya&&await zbe(process.argv[3]),ZF();let e=process.argv.indexOf("report");e>=0&&process.exit(ly(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Fbe();return}if(t==="wake"){await $be();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(kV(),RV));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(sQ(),nQ));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(X(),XR)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(rW(),r7));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(Kre(),Gre));await r()};Ube();
