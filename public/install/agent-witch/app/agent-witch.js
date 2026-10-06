#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var t9=Object.create;var ub=Object.defineProperty;var r9=Object.getOwnPropertyDescriptor;var o9=Object.getOwnPropertyNames;var n9=Object.getPrototypeOf,s9=Object.prototype.hasOwnProperty;var a=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var T=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},kt=(e,t)=>{for(var r in t)ub(e,r,{get:t[r],enumerable:!0})},i9=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of o9(t))!s9.call(e,n)&&n!==r&&ub(e,n,{get:()=>t[n],enumerable:!(o=r9(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?t9(n9(e)):{},i9(t||!e||!e.__esModule?ub(r,"default",{value:e,enumerable:!0}):r,e));var Fl,HO,FO,$l,pb,Qge,$O,Mn,Rr,ro,Cm,Lm,Pi,Ai,lt,mb,vm,Im,xm,zl,Zt,jn,Nn,Ul,Vo,gb,zO,ze=a(()=>{"use strict";Fl={production:".agent-witch",localhost:".local-agent-witch"},HO={production:47892,localhost:47893},FO={production:"com.agent-witch",localhost:"com.local-agent-witch"},$l={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},pb="app",Qge=`${pb}/agent-witch.js`,$O=`${pb}/command`,Mn={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},Rr=Fl.production,ro=Fl.localhost,Cm=HO.production,Lm=HO.localhost,Pi=FO.production,Ai=FO.localhost,lt="profiles",mb=$l.activeProfile,vm="harness",Im="sets",xm="manifest.json",zl=Mn.projectsDir,Zt=Mn.logsDir,jn="agent-witch.log",Nn="agent-witch.error.log",Ul=Mn.reportsDir,Vo=Mn.deviceKeypairJson,gb=pb,zO="agent-witch.js"});var UO=a(()=>{"use strict";ze()});var BO,Ko,Dn,Bl=a(()=>{"use strict";BO=m(require("node:path"));ze();Ko=e=>BO.default.basename(e)===ro,Dn=e=>Ko(e)?Ai:Pi});var Tr,bi=a(()=>{"use strict";Tr="agent-witch.service"});var wt,Wm,GO=a(()=>{"use strict";wt="https://www.agentwitch.com",Wm="wss://www.agentwitch.com/api/agent-witch/ws"});var Gl,jt,_i,VO=a(()=>{"use strict";Gl="127.0.0.1",jt=`http://${Gl}:43347`,_i=jt});var Rt=a(()=>{"use strict";GO();VO()});var a9,Hn,Om,KO,l9,c9,d9,u9,p9,Vl,fb=a(()=>{"use strict";bi();Rt();a9={darwin:"mac",mac:"mac",macos:"mac",linux:"linux",wsl:"linux",win32:"windows",windows:"windows"},Hn=e=>a9[(e??"").trim().toLowerCase()]??"unknown",Om=e=>`nohup "$HOME/${e}/app/command/run.sh" >/dev/null 2>&1 &`,KO=()=>`curl -sS -m 5 "http://127.0.0.1:${43347}/health" || echo "AWL still not responding \u2014 see logs:"`,l9=e=>({platform:"mac",label:"macOS",instructions:"On this computer, open Terminal, paste this command, and press Return.",command:`AW_HOME="$HOME/${e.installDirName}"
launchctl kickstart -k "gui/$(id -u)/${e.launchAgentPrefix}"
sleep 2
${KO()}
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`,note:"Paste and run the whole block so AW_HOME is set before tail. Ignore com.agent-witch-live unless you installed Live as a separate LaunchAgent."}),c9=e=>({platform:"linux",label:"Linux or WSL",instructions:"On this computer, open a terminal (on Windows, your WSL distro's terminal), paste this command, and press Enter.",command:`systemctl --user restart ${Tr}
sleep 2
${KO()}
journalctl --user -u ${Tr} -n 50 --no-pager`,note:`If systemctl is not available, the installer did not set up auto-start on this computer. Start the client by hand: ${Om(e.installDirName)}`}),d9=()=>({platform:"windows",label:"Windows (WSL)",instructions:"On this computer, open PowerShell, paste these commands, and press Enter.",command:`wsl.exe -e bash -lc 'systemctl --user restart ${Tr}'
wsl.exe -e bash -lc 'systemctl --user status ${Tr}'`,note:"AgentWitch runs inside WSL on Windows. These commands use your default WSL distro; if you installed into another distro, add -d <distro name> after wsl.exe."}),u9={mac:l9,linux:c9,windows:d9},p9=["mac","linux","windows"],Vl=e=>(e.platform==="unknown"?p9:[e.platform]).map(r=>u9[r](e))});var qO,JO,m9,g9,f9,yb,YO=a(()=>{"use strict";qO=m(require("node:path"));fb();Bl();JO=e=>e instanceof Error?e.message:String(e),m9=e=>typeof e=="object"&&e!==null&&"code"in e&&e.code==="ENOENT",g9=async(e,t)=>{try{let r=await e.kickstartLaunchAgents();return r.length>0?{ok:!0,platform:"mac",outcome:"restarted",message:`Kickstarted ${r.join(", ")}.`,manualCommand:null}:{ok:!1,platform:"mac",outcome:"failed",message:"No AgentWitch LaunchAgent was kickstarted on this computer.",manualCommand:t}}catch(r){return{ok:!1,platform:"mac",outcome:"failed",message:`LaunchAgent kickstart failed: ${JO(r)}`,manualCommand:t}}},f9=async(e,t)=>{try{return await e.restartSystemdUserService(),{ok:!0,platform:"linux",outcome:"restarted",message:"Restarted the agent-witch.service systemd user unit.",manualCommand:null}}catch(r){return m9(r)?{ok:!1,platform:"linux",outcome:"manual-step-required",message:"systemctl is not available on this computer, so the installer set up no auto-start. Start the client by hand.",manualCommand:t}:{ok:!1,platform:"linux",outcome:"failed",message:`systemd user restart failed: ${JO(r)}`,manualCommand:t}}},yb=async e=>{let t=Hn(e.platform),r=qO.default.basename(e.installDir),o=n=>Vl({platform:n,installDirName:r,launchAgentPrefix:Dn(e.installDir)})[0]?.command??null;return t==="mac"?g9(e.runners,o("mac")):t==="linux"?f9(e.runners,Om(r)):t==="windows"?{ok:!1,platform:t,outcome:"unsupported-platform",message:"AgentWitch runs inside WSL on Windows. Restart it from PowerShell with the command below.",manualCommand:o("windows")}:{ok:!1,platform:t,outcome:"unsupported-platform",message:`Restarting the AgentWitch client is not supported on ${e.platform||"this platform"}.`,manualCommand:null}}});var Kl=a(()=>{"use strict";UO();Bl();fb();YO()});var XO,hb,y9,ql,h9,S9,ZO,P9,A9,QO=a(()=>{"use strict";Kl();ze();XO=m(require("node:os")),hb=m(require("node:path")),y9=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?hb.default.resolve(e):hb.default.join(XO.default.homedir(),Rr)},ql=Dn(y9()),h9=`${ql}-wake`,S9=`${ql}-live`,ZO=`${ql}-watchdog`,P9=`${ql}-automation-scheduler`,A9=`${ql}-updater`});var ki=T(Sb=>{"use strict";Object.defineProperty(Sb,"__esModule",{value:!0});Sb.stringify=b9;function b9(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var F=T(Pb=>{"use strict";Object.defineProperty(Pb,"__esModule",{value:!0});Pb.generateTypeGuardError=_9;var eM=ki();function _9(e,t,r){return(0,eM.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,eM.stringify)(e)}) to be "${r}"`}});var qo=T(Mm=>{"use strict";Object.defineProperty(Mm,"__esModule",{value:!0});Mm.isNonNullObject=void 0;var k9=F(),w9=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,k9.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Mm.isNonNullObject=w9});var Er=T(Oe=>{"use strict";Object.defineProperty(Oe,"__esModule",{value:!0});Oe.attachTypeGuardMeta=Oe.isArrayTypeGuard=Oe.isNestedObjectTypeGuard=Oe.getTypeGuardWrapperKind=Oe.getTypeGuardInnerGuard=Oe.getTypeGuardItemGuard=Oe.getTypeGuardSchema=void 0;var R9=e=>e.schema;Oe.getTypeGuardSchema=R9;var T9=e=>e.itemGuard;Oe.getTypeGuardItemGuard=T9;var E9=e=>e.innerGuard;Oe.getTypeGuardInnerGuard=E9;var C9=e=>e.wrapperKind;Oe.getTypeGuardWrapperKind=C9;var L9=e=>{if((0,Oe.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Oe.isNestedObjectTypeGuard=L9;var v9=e=>{if((0,Oe.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Oe.isArrayTypeGuard=v9;var I9=(e,t)=>Object.assign(e,t);Oe.attachTypeGuardMeta=I9});var Jl=T(Fn=>{"use strict";Object.defineProperty(Fn,"__esModule",{value:!0});Fn.getExpectedTypeName=Fn.getTypeGuardDisplayName=void 0;var tM=Er(),x9=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Fn.getTypeGuardDisplayName=x9;var W9=e=>{let t=(0,tM.getTypeGuardWrapperKind)(e),r=(0,tM.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Fn.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Fn.getExpectedTypeName=W9});var $n=T(jm=>{"use strict";Object.defineProperty(jm,"__esModule",{value:!0});jm.createValidationResult=void 0;var O9=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});jm.createValidationResult=O9});var wi=T(Nm=>{"use strict";Object.defineProperty(Nm,"__esModule",{value:!0});Nm.createValidationError=void 0;var M9=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Nm.createValidationError=M9});var Ri=T(Dm=>{"use strict";Object.defineProperty(Dm,"__esModule",{value:!0});Dm.createTreeNode=void 0;var j9=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});Dm.createTreeNode=j9});var Yl=T(Hm=>{"use strict";Object.defineProperty(Hm,"__esModule",{value:!0});Hm.combineResults=void 0;var N9=$n(),D9=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,N9.createValidationResult)(r,o,n)};Hm.combineResults=D9});var $m=T(Fm=>{"use strict";Object.defineProperty(Fm,"__esModule",{value:!0});Fm.createSimplifiedTree=void 0;var rM=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=rM(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},H9=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=rM(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};Fm.createSimplifiedTree=H9});var Zl=T(Um=>{"use strict";Object.defineProperty(Um,"__esModule",{value:!0});Um.validateObject=void 0;var F9=qo(),Xl=$n(),$9=wi(),zm=Ri(),z9=Yl(),oM=Bm(),U9=(e,t,r)=>{let o=()=>{let i=(0,$9.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),l=(0,zm.createTreeNode)(r.path,!1,"non-null object",e);return l.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,Xl.createValidationResult)(!1,[],l):(0,Xl.createValidationResult)(!1,[i],l)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,Xl.createValidationResult)(!0,[],(0,zm.createTreeNode)(r.path,!0,"object",e));let l=c=>{let[d,...u]=c,g=d,f=t[g],y=e[g],A=(0,oM.validateProperty)(g,y,f,r);return A.valid?u.length===0?(0,Xl.createValidationResult)(!0,[],(0,zm.createTreeNode)(r.path,!0,"object",e)):l(u):A};return l(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,oM.validateProperty)(d,e[d],u,r)}),l=(0,z9.combineResults)(i,r.path),c=(0,zm.createTreeNode)(r.path,l.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,Xl.createValidationResult)(l.valid,l.errors,c)};return(0,F9.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};Um.validateObject=U9});var sM=T(Km=>{"use strict";Object.defineProperty(Km,"__esModule",{value:!0});Km.validateArray=void 0;var B9=ki(),Gm=$n(),nM=wi(),Vm=Ri(),G9=Yl(),V9=Zl(),K9=Jl(),q9=Er(),J9=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,nM.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,Vm.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,Gm.createValidationResult)(!1,[c],d)}let n=(0,q9.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,g={path:u,config:r.config||null};if(n)return(0,V9.validateObject)(c,n,g);let f=t(c,null),y=(0,K9.getExpectedTypeName)(t),A=(0,B9.stringify)(c);if(f)return(0,Gm.createValidationResult)(!0,[],(0,Vm.createTreeNode)(u,!0,y,c));let S=A.length>200?`Expected ${u} to be "${y}"`:`Expected ${u} (${A}) to be "${y}"`,P=(0,nM.createValidationError)(u,y,c,S),p=(0,Vm.createTreeNode)(u,!1,y,c);return p.errors=[P],(0,Gm.createValidationResult)(!1,[P],p)}),i=(0,G9.combineResults)(s,o),l=(0,Vm.createTreeNode)(o,i.valid,"Array",e);return l.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";l.children[d]=c.tree}}),(0,Gm.createValidationResult)(i.valid,i.errors,l)};Km.validateArray=J9});var Bm=T(Jm=>{"use strict";Object.defineProperty(Jm,"__esModule",{value:!0});Jm.validateProperty=void 0;var iM=$n(),Y9=wi(),aM=Ri(),X9=Jl(),qm=Er(),Z9=Zl(),Q9=sM(),eZ=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",l=(0,qm.getTypeGuardSchema)(r),c=(0,qm.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(l)return(0,Z9.validateObject)(t,l,s);if(c&&(0,qm.isArrayTypeGuard)(r))return(0,Q9.validateArray)(t,c,s)}let d=u=>{let g=r(t,u),f=(0,X9.getExpectedTypeName)(r);return g?(0,iM.createValidationResult)(!0,[],(0,aM.createTreeNode)(n,!0,f,t)):(()=>{let y=(0,Y9.createValidationError)(n,f,t,`Expected ${n} (${JSON.stringify(t)}) to be "${f}"`),A=(0,aM.createTreeNode)(n,!1,f,t);return A.errors=[y],(0,iM.createValidationResult)(!1,[y],A)})()};if((0,qm.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};Jm.validateProperty=eZ});var Xm=T(Ym=>{"use strict";Object.defineProperty(Ym,"__esModule",{value:!0});Ym.isNil=void 0;var tZ=F(),rZ=function(e,t){return e!=null?(t&&t.callbackOnError((0,tZ.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};Ym.isNil=rZ});var Ab=T(Zm=>{"use strict";Object.defineProperty(Zm,"__esModule",{value:!0});Zm.isDefined=void 0;var oZ=F(),nZ=Xm(),sZ=function(e,t){return(0,nZ.isNil)(e,null)?(t&&t.callbackOnError((0,oZ.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};Zm.isDefined=sZ});var bb=T(Qm=>{"use strict";Object.defineProperty(Qm,"__esModule",{value:!0});Qm.reportValidationResults=void 0;var iZ=$m(),lM=Ab(),aZ=Xm(),lZ=(e,t)=>{if(e.valid===!0||(0,aZ.isNil)(t))return;let r=t.errorMode||"multi",o=(i,l)=>{(0,lM.isDefined)(l)&&i.callbackOnError(JSON.stringify((0,iZ.createSimplifiedTree)(l),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let l=e.errors[0];l&&i.callbackOnError(l.message)}};r==="json"&&(0,lM.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};Qm.reportValidationResults=lZ});var _b=T(me=>{"use strict";Object.defineProperty(me,"__esModule",{value:!0});me.Validation=me.reportValidationResults=me.validateObject=me.validateProperty=me.createSimplifiedTree=me.combineResults=me.createTreeNode=me.createValidationError=me.createValidationResult=me.getExpectedTypeName=void 0;var cZ=Jl();Object.defineProperty(me,"getExpectedTypeName",{enumerable:!0,get:function(){return cZ.getExpectedTypeName}});var dZ=$n();Object.defineProperty(me,"createValidationResult",{enumerable:!0,get:function(){return dZ.createValidationResult}});var uZ=wi();Object.defineProperty(me,"createValidationError",{enumerable:!0,get:function(){return uZ.createValidationError}});var pZ=Ri();Object.defineProperty(me,"createTreeNode",{enumerable:!0,get:function(){return pZ.createTreeNode}});var mZ=Yl();Object.defineProperty(me,"combineResults",{enumerable:!0,get:function(){return mZ.combineResults}});var gZ=$m();Object.defineProperty(me,"createSimplifiedTree",{enumerable:!0,get:function(){return gZ.createSimplifiedTree}});var fZ=Bm();Object.defineProperty(me,"validateProperty",{enumerable:!0,get:function(){return fZ.validateProperty}});var yZ=Zl();Object.defineProperty(me,"validateObject",{enumerable:!0,get:function(){return yZ.validateObject}});var hZ=bb();Object.defineProperty(me,"reportValidationResults",{enumerable:!0,get:function(){return hZ.reportValidationResults}});var SZ=$n(),PZ=Yl(),AZ=wi(),bZ=Ri(),_Z=Bm(),kZ=Zl(),wZ=bb(),RZ=$m();me.Validation={result:SZ.createValidationResult,combine:PZ.combineResults,error:AZ.createValidationError,treeNode:bZ.createTreeNode,property:_Z.validateProperty,object:kZ.validateObject,report:wZ.reportValidationResults,createSimplifiedTree:RZ.createSimplifiedTree}});var eg=T(kb=>{"use strict";Object.defineProperty(kb,"__esModule",{value:!0});kb.isType=EZ;var cM=qo(),dM=_b(),TZ=Er();function EZ(e){if(!(0,cM.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,dM.validateObject)(r,e,s);return(0,dM.reportValidationResults)(i,o||null),i.valid}return(0,cM.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,TZ.attachTypeGuardMeta)(t,{schema:e})}});var gM=T(zn=>{"use strict";Object.defineProperty(zn,"__esModule",{value:!0});zn.isNestedType=zn.isShape=void 0;zn.isSchema=Ql;var uM=qo(),pM=_b(),mM=Er();function Ql(e){if(!(0,uM.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=LZ(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},l=(0,pM.validateObject)(o,t,i);return(0,pM.reportValidationResults)(l,n||null),l.valid}return(0,uM.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let l=t[i];return l?l(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,mM.attachTypeGuardMeta)(r,{schema:t})}function CZ(e){return typeof e=="function"?e:Array.isArray(e)?vZ(e):typeof e=="object"&&e!==null?Ql(e):e}function LZ(e){let t={};for(let[r,o]of Object.entries(e))t[r]=CZ(o);return t}function vZ(e){let t=e[0],r=Ql(t);function o(n,s){return Array.isArray(n)?n.every((i,l)=>r(i,s?{...s,identifier:`${s.identifier}[${l}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,mM.attachTypeGuardMeta)(o,{itemGuard:r})}zn.isShape=Ql;zn.isNestedType=Ql});var fM=T(wb=>{"use strict";Object.defineProperty(wb,"__esModule",{value:!0});wb.isObjectWith=xZ;var IZ=eg();function xZ(e){return(0,IZ.isType)(e)}});var yM=T(Rb=>{"use strict";Object.defineProperty(Rb,"__esModule",{value:!0});Rb.isObject=OZ;var WZ=eg();function OZ(e){return(0,WZ.isType)(e)}});var hM=T(Tb=>{"use strict";Object.defineProperty(Tb,"__esModule",{value:!0});Tb.guardWithTolerance=MZ;function MZ(e,t,r){return t(e,r),e}});var SM=T(Eb=>{"use strict";Object.defineProperty(Eb,"__esModule",{value:!0});Eb.isBranded=NZ;var jZ=F();function NZ(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,jZ.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var PM=T(tg=>{"use strict";Object.defineProperty(tg,"__esModule",{value:!0});tg.BrandSymbols=void 0;tg.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var AM=T(rg=>{"use strict";Object.defineProperty(rg,"__esModule",{value:!0});rg.isAny=void 0;var DZ=function(e){return!0};rg.isAny=DZ});var ec=T(Cb=>{"use strict";Object.defineProperty(Cb,"__esModule",{value:!0});Cb.reportTypeGuardError=FZ;var HZ=F();function FZ(e,t,r){e&&e.callbackOnError((0,HZ.generateTypeGuardError)(t,e.identifier,r))}});var bM=T(og=>{"use strict";Object.defineProperty(og,"__esModule",{value:!0});og.isBoolean=void 0;var $Z=ec(),zZ=function(t,r){return typeof t!="boolean"?((0,$Z.reportTypeGuardError)(r,t,"boolean"),!1):!0};og.isBoolean=zZ});var _M=T(ng=>{"use strict";Object.defineProperty(ng,"__esModule",{value:!0});ng.isDate=void 0;var UZ=F(),BZ=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,UZ.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};ng.isDate=BZ});var Lb=T(sg=>{"use strict";Object.defineProperty(sg,"__esModule",{value:!0});sg.isNumber=void 0;var GZ=ec(),VZ=function(t,r){return typeof t!="number"||isNaN(t)?((0,GZ.reportTypeGuardError)(r,t,"number"),!1):!0};sg.isNumber=VZ});var kM=T(ig=>{"use strict";Object.defineProperty(ig,"__esModule",{value:!0});ig.isString=void 0;var KZ=ec(),qZ=function(t,r){return typeof t!="string"?((0,KZ.reportTypeGuardError)(r,t,"string"),!1):!0};ig.isString=qZ});var wM=T(ag=>{"use strict";Object.defineProperty(ag,"__esModule",{value:!0});ag.isUnknown=void 0;var JZ=function(e){return!0};ag.isUnknown=JZ});var RM=T(lg=>{"use strict";Object.defineProperty(lg,"__esModule",{value:!0});lg.isFunction=void 0;var YZ=F(),XZ=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,YZ.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};lg.isFunction=XZ});var EM=T(cg=>{"use strict";Object.defineProperty(cg,"__esModule",{value:!0});cg.isFile=void 0;var TM=F(),ZZ=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,TM.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,TM.generateTypeGuardError)(e,t.identifier,"File")),!1)};cg.isFile=ZZ});var LM=T(dg=>{"use strict";Object.defineProperty(dg,"__esModule",{value:!0});dg.isFileList=void 0;var CM=F(),QZ=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,CM.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,CM.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};dg.isFileList=QZ});var IM=T(ug=>{"use strict";Object.defineProperty(ug,"__esModule",{value:!0});ug.isBlob=void 0;var vM=F(),eQ=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,vM.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,vM.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};ug.isBlob=eQ});var WM=T(pg=>{"use strict";Object.defineProperty(pg,"__esModule",{value:!0});pg.isFormData=void 0;var xM=F(),tQ=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,xM.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,xM.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};pg.isFormData=tQ});var MM=T(mg=>{"use strict";Object.defineProperty(mg,"__esModule",{value:!0});mg.isURL=void 0;var OM=F(),rQ=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,OM.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,OM.generateTypeGuardError)(e,t.identifier,"URL")),!1)};mg.isURL=rQ});var NM=T(gg=>{"use strict";Object.defineProperty(gg,"__esModule",{value:!0});gg.isURLSearchParams=void 0;var jM=F(),oQ=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,jM.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,jM.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};gg.isURLSearchParams=oQ});var DM=T(fg=>{"use strict";Object.defineProperty(fg,"__esModule",{value:!0});fg.isMap=void 0;var nQ=F(),sQ=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,nQ.generateTypeGuardError)(e,t.identifier,"Map")),!1)};fg.isMap=sQ});var HM=T(yg=>{"use strict";Object.defineProperty(yg,"__esModule",{value:!0});yg.isSet=void 0;var iQ=F(),aQ=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,iQ.generateTypeGuardError)(e,t.identifier,"Set")),!1)};yg.isSet=aQ});var FM=T(vb=>{"use strict";Object.defineProperty(vb,"__esModule",{value:!0});vb.isIndexSignature=cQ;var lQ=F();function cQ(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,lQ.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),l=Object.getOwnPropertySymbols(s);return[...i,...l].every((d,u)=>{let g=s[d],f=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),y=t(g,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return f&&y})}}});var $M=T(hg=>{"use strict";Object.defineProperty(hg,"__esModule",{value:!0});hg.isError=void 0;var dQ=ec(),uQ=function(t,r){return t instanceof Error?!0:((0,dQ.reportTypeGuardError)(r,t,"Error"),!1)};hg.isError=uQ});var xb=T(Ib=>{"use strict";Object.defineProperty(Ib,"__esModule",{value:!0});Ib.isArrayWithEachItem=gQ;var pQ=F(),mQ=Er();function gQ(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,pQ.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,mQ.attachTypeGuardMeta)(t,{itemGuard:e})}});var Wb=T(Sg=>{"use strict";Object.defineProperty(Sg,"__esModule",{value:!0});Sg.isNonEmptyArray=void 0;var fQ=F(),yQ=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,fQ.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Sg.isNonEmptyArray=yQ});var zM=T(Ob=>{"use strict";Object.defineProperty(Ob,"__esModule",{value:!0});Ob.isNonEmptyArrayWithEachItem=PQ;var hQ=xb(),SQ=Wb();function PQ(e){return function(t,r){return(0,hQ.isArrayWithEachItem)(e)(t,r)&&(0,SQ.isNonEmptyArray)(t,r)}}});var BM=T(Mb=>{"use strict";Object.defineProperty(Mb,"__esModule",{value:!0});Mb.isTuple=AQ;var UM=F();function AQ(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,UM.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,UM.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var GM=T(jb=>{"use strict";Object.defineProperty(jb,"__esModule",{value:!0});jb.isObjectWithEachItem=_Q;var bQ=F();function _Q(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,bQ.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var VM=T(Nb=>{"use strict";Object.defineProperty(Nb,"__esModule",{value:!0});Nb.isPartialOf=wQ;var kQ=qo();function wQ(e){return function(t,r){if(!(0,kQ.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var KM=T(Db=>{"use strict";Object.defineProperty(Db,"__esModule",{value:!0});Db.isPick=TQ;var RQ=qo();function TQ(e,...t){return function(r,o){if(!(0,RQ.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var qM=T(Hb=>{"use strict";Object.defineProperty(Hb,"__esModule",{value:!0});Hb.isOmit=CQ;var EQ=qo();function CQ(e,...t){return function(r,o){if(!(0,EQ.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let l=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),g=u.indexOf(" ("),f=g>=0?u.slice(0,g):u;if(l.has(f))return!1;let y=f.startsWith(s+".")&&f.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var JM=T(Pg=>{"use strict";Object.defineProperty(Pg,"__esModule",{value:!0});Pg.isNonEmptyString=void 0;var LQ=F(),vQ=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,LQ.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Pg.isNonEmptyString=vQ});var YM=T(Ag=>{"use strict";Object.defineProperty(Ag,"__esModule",{value:!0});Ag.isNonNegativeNumber=void 0;var IQ=F(),xQ=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,IQ.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};Ag.isNonNegativeNumber=xQ});var XM=T(bg=>{"use strict";Object.defineProperty(bg,"__esModule",{value:!0});bg.isPositiveNumber=void 0;var WQ=F(),OQ=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,WQ.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};bg.isPositiveNumber=OQ});var ZM=T(_g=>{"use strict";Object.defineProperty(_g,"__esModule",{value:!0});_g.isNonPositiveNumber=void 0;var MQ=F(),jQ=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,MQ.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};_g.isNonPositiveNumber=jQ});var QM=T(kg=>{"use strict";Object.defineProperty(kg,"__esModule",{value:!0});kg.isNegativeNumber=void 0;var NQ=F(),DQ=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,NQ.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};kg.isNegativeNumber=DQ});var ej=T(wg=>{"use strict";Object.defineProperty(wg,"__esModule",{value:!0});wg.isInteger=void 0;var HQ=F(),FQ=Lb(),$Q=function(e,t){return!(0,FQ.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,HQ.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};wg.isInteger=$Q});var tj=T(Rg=>{"use strict";Object.defineProperty(Rg,"__esModule",{value:!0});Rg.isPositiveInteger=void 0;var zQ=F(),UQ=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,zQ.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};Rg.isPositiveInteger=UQ});var rj=T(Tg=>{"use strict";Object.defineProperty(Tg,"__esModule",{value:!0});Tg.isNegativeInteger=void 0;var BQ=F(),GQ=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,BQ.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};Tg.isNegativeInteger=GQ});var oj=T(Eg=>{"use strict";Object.defineProperty(Eg,"__esModule",{value:!0});Eg.isNonNegativeInteger=void 0;var VQ=F(),KQ=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,VQ.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Eg.isNonNegativeInteger=KQ});var nj=T(Cg=>{"use strict";Object.defineProperty(Cg,"__esModule",{value:!0});Cg.isNonPositiveInteger=void 0;var qQ=F(),JQ=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,qQ.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Cg.isNonPositiveInteger=JQ});var sj=T(vg=>{"use strict";Object.defineProperty(vg,"__esModule",{value:!0});vg.isNumeric=void 0;var Lg=F(),YQ=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Lg.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Lg.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Lg.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Lg.generateTypeGuardError)(e,t.identifier,"number key")),!1};vg.isNumeric=YQ});var ij=T(Ig=>{"use strict";Object.defineProperty(Ig,"__esModule",{value:!0});Ig.isBooleanLike=void 0;var Fb=F(),XQ=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,Fb.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,Fb.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Ig.isBooleanLike=XQ});var aj=T(xg=>{"use strict";Object.defineProperty(xg,"__esModule",{value:!0});xg.isDateLike=void 0;var tc=F(),ZQ=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,tc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,tc.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,tc.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,tc.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,tc.generateTypeGuardError)(e,t.identifier,"date-like")),!1};xg.isDateLike=ZQ});var lj=T(Wg=>{"use strict";Object.defineProperty(Wg,"__esModule",{value:!0});Wg.isBigInt=void 0;var QQ=F(),eee=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,QQ.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Wg.isBigInt=eee});var zb=T($b=>{"use strict";Object.defineProperty($b,"__esModule",{value:!0});$b.isOneOf=tee;var cj=ki();function tee(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,cj.stringify)(t)}) must be one of following values ${e.map(cj.stringify).join(" | ")}`),o}}});var dj=T(Ub=>{"use strict";Object.defineProperty(Ub,"__esModule",{value:!0});Ub.isOneOfTypes=nee;var ree=ki(),oee=Jl();function nee(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,ree.stringify)(t),l=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,oee.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;l.includes(u)||l.push(u)}})),r.callbackOnError(l.join(`
`))}return n}}});var uj=T(Bb=>{"use strict";Object.defineProperty(Bb,"__esModule",{value:!0});Bb.isIntersectionOf=see;function see(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var pj=T(Gb=>{"use strict";Object.defineProperty(Gb,"__esModule",{value:!0});Gb.isExtensionOf=iee;function iee(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var mj=T(Vb=>{"use strict";Object.defineProperty(Vb,"__esModule",{value:!0});Vb.isNullOr=lee;var aee=Er();function lee(e){function t(r,o){return r===null?!0:e(r,o)}return(0,aee.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var gj=T(Kb=>{"use strict";Object.defineProperty(Kb,"__esModule",{value:!0});Kb.isUndefinedOr=dee;var cee=Er();function dee(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,cee.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var fj=T(qb=>{"use strict";Object.defineProperty(qb,"__esModule",{value:!0});qb.isNilOr=pee;var uee=Er();function pee(e){function t(r,o){return r==null?!0:e(r,o)}return(0,uee.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var yj=T(Jb=>{"use strict";Object.defineProperty(Jb,"__esModule",{value:!0});Jb.isAsserted=mee;function mee(e){return!0}});var hj=T(Yb=>{"use strict";Object.defineProperty(Yb,"__esModule",{value:!0});Yb.isEnum=fee;var gee=zb();function fee(e){return function(t,r){return(0,gee.isOneOf)(...Object.values(e))(t,r)}}});var Sj=T(Xb=>{"use strict";Object.defineProperty(Xb,"__esModule",{value:!0});Xb.isEqualTo=See;var yee=F(),hee=ki();function See(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,yee.generateTypeGuardError)(t,r.identifier,`equal to ${(0,hee.stringify)(e)}`)),!1):!0}}});var Pj=T(Og=>{"use strict";Object.defineProperty(Og,"__esModule",{value:!0});Og.isRegex=void 0;var Pee=F(),Aee=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,Pee.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Og.isRegex=Aee});var bj=T(Zb=>{"use strict";Object.defineProperty(Zb,"__esModule",{value:!0});Zb.isPattern=bee;var Aj=F();function bee(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,Aj.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,Aj.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var _j=T(Qb=>{"use strict";Object.defineProperty(Qb,"__esModule",{value:!0});Qb.by=_ee;function _ee(e){return function(t){return e(t,null)}}});var kj=T(e_=>{"use strict";Object.defineProperty(e_,"__esModule",{value:!0});e_.toNumber=kee;function kee(e){return typeof e=="number"?e:Number(e)}});var wj=T(t_=>{"use strict";Object.defineProperty(t_,"__esModule",{value:!0});t_.toDate=wee;function wee(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var Rj=T(r_=>{"use strict";Object.defineProperty(r_,"__esModule",{value:!0});r_.toBoolean=Ree;function Ree(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var Tj=T(Mg=>{"use strict";Object.defineProperty(Mg,"__esModule",{value:!0});Mg.isSymbol=void 0;var Tee=F(),Eee=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,Tee.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Mg.isSymbol=Eee});var Ti=T(k=>{"use strict";Object.defineProperty(k,"__esModule",{value:!0});k.isDateLike=k.isBooleanLike=k.isNumeric=k.isNonPositiveInteger=k.isNonNegativeInteger=k.isNegativeInteger=k.isPositiveInteger=k.isInteger=k.isNegativeNumber=k.isNonPositiveNumber=k.isPositiveNumber=k.isNonNegativeNumber=k.isNonEmptyString=k.isOmit=k.isPick=k.isPartialOf=k.isObjectWithEachItem=k.isNonNullObject=k.isTuple=k.isNonEmptyArrayWithEachItem=k.isNonEmptyArray=k.isArrayWithEachItem=k.isError=k.isIndexSignature=k.isSet=k.isMap=k.isURLSearchParams=k.isURL=k.isFormData=k.isBlob=k.isFileList=k.isFile=k.isFunction=k.isUnknown=k.isString=k.isNumber=k.isNil=k.isDefined=k.isDate=k.isBoolean=k.isAny=k.BrandSymbols=k.isBranded=k.guardWithTolerance=k.isObject=k.isObjectWith=k.isNestedType=k.isShape=k.isSchema=k.isType=void 0;k.isSymbol=k.toBoolean=k.toDate=k.toNumber=k.by=k.generateTypeGuardError=k.isPattern=k.isRegex=k.isEqualTo=k.isEnum=k.isAsserted=k.isNilOr=k.isUndefinedOr=k.isNullOr=k.isExtensionOf=k.isIntersectionOf=k.isOneOfTypes=k.isOneOf=k.isBigInt=void 0;var Cee=eg();Object.defineProperty(k,"isType",{enumerable:!0,get:function(){return Cee.isType}});var o_=gM();Object.defineProperty(k,"isSchema",{enumerable:!0,get:function(){return o_.isSchema}});Object.defineProperty(k,"isShape",{enumerable:!0,get:function(){return o_.isShape}});Object.defineProperty(k,"isNestedType",{enumerable:!0,get:function(){return o_.isNestedType}});var Lee=fM();Object.defineProperty(k,"isObjectWith",{enumerable:!0,get:function(){return Lee.isObjectWith}});var vee=yM();Object.defineProperty(k,"isObject",{enumerable:!0,get:function(){return vee.isObject}});var Iee=hM();Object.defineProperty(k,"guardWithTolerance",{enumerable:!0,get:function(){return Iee.guardWithTolerance}});var xee=SM();Object.defineProperty(k,"isBranded",{enumerable:!0,get:function(){return xee.isBranded}});var Wee=PM();Object.defineProperty(k,"BrandSymbols",{enumerable:!0,get:function(){return Wee.BrandSymbols}});var Oee=AM();Object.defineProperty(k,"isAny",{enumerable:!0,get:function(){return Oee.isAny}});var Mee=bM();Object.defineProperty(k,"isBoolean",{enumerable:!0,get:function(){return Mee.isBoolean}});var jee=_M();Object.defineProperty(k,"isDate",{enumerable:!0,get:function(){return jee.isDate}});var Nee=Ab();Object.defineProperty(k,"isDefined",{enumerable:!0,get:function(){return Nee.isDefined}});var Dee=Xm();Object.defineProperty(k,"isNil",{enumerable:!0,get:function(){return Dee.isNil}});var Hee=Lb();Object.defineProperty(k,"isNumber",{enumerable:!0,get:function(){return Hee.isNumber}});var Fee=kM();Object.defineProperty(k,"isString",{enumerable:!0,get:function(){return Fee.isString}});var $ee=wM();Object.defineProperty(k,"isUnknown",{enumerable:!0,get:function(){return $ee.isUnknown}});var zee=RM();Object.defineProperty(k,"isFunction",{enumerable:!0,get:function(){return zee.isFunction}});var Uee=EM();Object.defineProperty(k,"isFile",{enumerable:!0,get:function(){return Uee.isFile}});var Bee=LM();Object.defineProperty(k,"isFileList",{enumerable:!0,get:function(){return Bee.isFileList}});var Gee=IM();Object.defineProperty(k,"isBlob",{enumerable:!0,get:function(){return Gee.isBlob}});var Vee=WM();Object.defineProperty(k,"isFormData",{enumerable:!0,get:function(){return Vee.isFormData}});var Kee=MM();Object.defineProperty(k,"isURL",{enumerable:!0,get:function(){return Kee.isURL}});var qee=NM();Object.defineProperty(k,"isURLSearchParams",{enumerable:!0,get:function(){return qee.isURLSearchParams}});var Jee=DM();Object.defineProperty(k,"isMap",{enumerable:!0,get:function(){return Jee.isMap}});var Yee=HM();Object.defineProperty(k,"isSet",{enumerable:!0,get:function(){return Yee.isSet}});var Xee=FM();Object.defineProperty(k,"isIndexSignature",{enumerable:!0,get:function(){return Xee.isIndexSignature}});var Zee=$M();Object.defineProperty(k,"isError",{enumerable:!0,get:function(){return Zee.isError}});var Qee=xb();Object.defineProperty(k,"isArrayWithEachItem",{enumerable:!0,get:function(){return Qee.isArrayWithEachItem}});var ete=Wb();Object.defineProperty(k,"isNonEmptyArray",{enumerable:!0,get:function(){return ete.isNonEmptyArray}});var tte=zM();Object.defineProperty(k,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return tte.isNonEmptyArrayWithEachItem}});var rte=BM();Object.defineProperty(k,"isTuple",{enumerable:!0,get:function(){return rte.isTuple}});var ote=qo();Object.defineProperty(k,"isNonNullObject",{enumerable:!0,get:function(){return ote.isNonNullObject}});var nte=GM();Object.defineProperty(k,"isObjectWithEachItem",{enumerable:!0,get:function(){return nte.isObjectWithEachItem}});var ste=VM();Object.defineProperty(k,"isPartialOf",{enumerable:!0,get:function(){return ste.isPartialOf}});var ite=KM();Object.defineProperty(k,"isPick",{enumerable:!0,get:function(){return ite.isPick}});var ate=qM();Object.defineProperty(k,"isOmit",{enumerable:!0,get:function(){return ate.isOmit}});var lte=JM();Object.defineProperty(k,"isNonEmptyString",{enumerable:!0,get:function(){return lte.isNonEmptyString}});var cte=YM();Object.defineProperty(k,"isNonNegativeNumber",{enumerable:!0,get:function(){return cte.isNonNegativeNumber}});var dte=XM();Object.defineProperty(k,"isPositiveNumber",{enumerable:!0,get:function(){return dte.isPositiveNumber}});var ute=ZM();Object.defineProperty(k,"isNonPositiveNumber",{enumerable:!0,get:function(){return ute.isNonPositiveNumber}});var pte=QM();Object.defineProperty(k,"isNegativeNumber",{enumerable:!0,get:function(){return pte.isNegativeNumber}});var mte=ej();Object.defineProperty(k,"isInteger",{enumerable:!0,get:function(){return mte.isInteger}});var gte=tj();Object.defineProperty(k,"isPositiveInteger",{enumerable:!0,get:function(){return gte.isPositiveInteger}});var fte=rj();Object.defineProperty(k,"isNegativeInteger",{enumerable:!0,get:function(){return fte.isNegativeInteger}});var yte=oj();Object.defineProperty(k,"isNonNegativeInteger",{enumerable:!0,get:function(){return yte.isNonNegativeInteger}});var hte=nj();Object.defineProperty(k,"isNonPositiveInteger",{enumerable:!0,get:function(){return hte.isNonPositiveInteger}});var Ste=sj();Object.defineProperty(k,"isNumeric",{enumerable:!0,get:function(){return Ste.isNumeric}});var Pte=ij();Object.defineProperty(k,"isBooleanLike",{enumerable:!0,get:function(){return Pte.isBooleanLike}});var Ate=aj();Object.defineProperty(k,"isDateLike",{enumerable:!0,get:function(){return Ate.isDateLike}});var bte=lj();Object.defineProperty(k,"isBigInt",{enumerable:!0,get:function(){return bte.isBigInt}});var _te=zb();Object.defineProperty(k,"isOneOf",{enumerable:!0,get:function(){return _te.isOneOf}});var kte=dj();Object.defineProperty(k,"isOneOfTypes",{enumerable:!0,get:function(){return kte.isOneOfTypes}});var wte=uj();Object.defineProperty(k,"isIntersectionOf",{enumerable:!0,get:function(){return wte.isIntersectionOf}});var Rte=pj();Object.defineProperty(k,"isExtensionOf",{enumerable:!0,get:function(){return Rte.isExtensionOf}});var Tte=mj();Object.defineProperty(k,"isNullOr",{enumerable:!0,get:function(){return Tte.isNullOr}});var Ete=gj();Object.defineProperty(k,"isUndefinedOr",{enumerable:!0,get:function(){return Ete.isUndefinedOr}});var Cte=fj();Object.defineProperty(k,"isNilOr",{enumerable:!0,get:function(){return Cte.isNilOr}});var Lte=yj();Object.defineProperty(k,"isAsserted",{enumerable:!0,get:function(){return Lte.isAsserted}});var vte=hj();Object.defineProperty(k,"isEnum",{enumerable:!0,get:function(){return vte.isEnum}});var Ite=Sj();Object.defineProperty(k,"isEqualTo",{enumerable:!0,get:function(){return Ite.isEqualTo}});var xte=Pj();Object.defineProperty(k,"isRegex",{enumerable:!0,get:function(){return xte.isRegex}});var Wte=bj();Object.defineProperty(k,"isPattern",{enumerable:!0,get:function(){return Wte.isPattern}});var Ote=F();Object.defineProperty(k,"generateTypeGuardError",{enumerable:!0,get:function(){return Ote.generateTypeGuardError}});var Mte=_j();Object.defineProperty(k,"by",{enumerable:!0,get:function(){return Mte.by}});var jte=kj();Object.defineProperty(k,"toNumber",{enumerable:!0,get:function(){return jte.toNumber}});var Nte=wj();Object.defineProperty(k,"toDate",{enumerable:!0,get:function(){return Nte.toDate}});var Dte=Rj();Object.defineProperty(k,"toBoolean",{enumerable:!0,get:function(){return Dte.toBoolean}});var Hte=Tj();Object.defineProperty(k,"isSymbol",{enumerable:!0,get:function(){return Hte.isSymbol}})});var Ei,Ej,Fte,Cj,Lj=a(()=>{"use strict";Ei=m(require("node:path")),Ej=require("node:url"),Fte=()=>!0,Cj=()=>{if(Fte()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?Ei.default.dirname(Ei.default.resolve(e)):Ei.default.dirname(Ei.default.resolve(__filename))}return Ei.default.dirname((0,Ej.fileURLToPath)(__agentWitchImportMetaUrl))}});var n_,vj,$,Ij,$te,Cr,s_,L,rc,Lr,i_,oc,Un,a_,l_,c_,nc,Ae,Jo,jg,Ze,Ng,N,d_=a(()=>{"use strict";n_=m(require("node:fs")),vj=m(require("node:os")),$=m(require("node:path")),Ij=m(Ti());ze();Lj();Bl();Bl();$te=Cj(),Cr=e=>e.trim().toLowerCase(),s_=e=>Cr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),L=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return $.default.resolve(e);let t=$.default.resolve($te),r=$.default.basename(t),o=$.default.basename($.default.dirname(t));return r===gb&&(o===Rr||o===ro)?$.default.dirname(t):r===Rr||r===ro?t:$.default.join(vj.default.homedir(),Rr)},rc=(e=L())=>$.default.join(e,gb),Lr=(e=L())=>$.default.join(rc(e),zO),i_=(e,t,r)=>t!==null?$.default.join(e,lt,t,r):$.default.join(e,r),oc=e=>i_(e.installDir,e.profileEmail,zl),Un=e=>i_(e.installDir,e.profileEmail,Zt),a_=e=>$.default.join(e.logsDir,jn),l_=e=>$.default.join(e.logsDir,Nn),c_=e=>i_(e.installDir,e.profileEmail,Ul),nc=e=>e.profileEmail!==null?$.default.join(e.installDir,lt,e.profileEmail,Vo):$.default.join(e.installDir,Vo),Ae=(e=L())=>Dn(e),Jo=(e=L())=>Ko(e)?Lm:Cm,jg=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return Cr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?Cr(t):null},Ze=(e=L())=>{let t=$.default.join(e,mb);if(!n_.default.existsSync(t))return null;try{let r=JSON.parse(n_.default.readFileSync(t,"utf8"));if((0,Ij.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return Cr(r.email)}catch{return null}return null},Ng=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?Cr(r):null}let t=jg();return t!==null?t:Ze()},N=e=>{let t=L(),r=rc(t),o=Lr(t),n=Ng(e);if(n!==null){let y=$.default.join(t,lt,n),A=$.default.join(y,vm),S=$.default.join(y,zl),P=$.default.join(y,Mn.projectDataDir),p=$.default.join(y,Zt),b=$.default.join(y,Ul),C=$.default.join(y,Vo),h=$.default.join(y,Zt,jn),_=$.default.join(y,Zt,Nn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:S,projectDataDir:P,logsDir:p,mainLogPath:h,errorLogPath:_,reportsDir:b,deviceKeypairPath:C,configPath:$.default.join(y,"config.json"),harnessRootDir:A,harnessManifestPath:$.default.join(A,xm),harnessSetsDir:$.default.join(A,Im)}}let s=$.default.join(t,vm),i=$.default.join(t,zl),l=$.default.join(t,Mn.projectDataDir),c=$.default.join(t,Zt),d=$.default.join(t,Ul),u=$.default.join(t,Vo),g=$.default.join(t,Zt,jn),f=$.default.join(t,Zt,Nn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:l,logsDir:c,mainLogPath:g,errorLogPath:f,reportsDir:d,deviceKeypairPath:u,configPath:$.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:$.default.join(s,xm),harnessSetsDir:$.default.join(s,Im)}}});var Ci,u_=a(()=>{"use strict";Ci=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var zte,Li,p_=a(()=>{"use strict";zte=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},Li=e=>e.filePort??zte(e.envValue)??e.defaultPort});var m_,xj,Ute,sc,vi,Wj=a(()=>{"use strict";m_=m(require("node:fs")),xj=m(require("node:path"));ze();d_();u_();p_();Ute=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sc=e=>{let t=xj.default.join(e,$l.wakePort);if(!m_.default.existsSync(t))return null;try{let r=JSON.parse(m_.default.readFileSync(t,"utf8"));if(Ute(r)&&Ci(r.wakePort))return r.wakePort}catch{return null}return null},vi=(e=L())=>Li({filePort:sc(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Jo(e)})});var g_={};kt(g_,{isAgentWitchLocalInstallDir:()=>Ko,isValidAgentWitchWakePort:()=>Ci,readActiveProfileEmailFromFile:()=>Ze,readAgentWitchWakePortFromFile:()=>sc,resolveActiveProfileEmail:()=>Ng,resolveActiveProfileEmailFromEnv:()=>jg,resolveAgentWitchAppBundlePath:()=>Lr,resolveAgentWitchAppDir:()=>rc,resolveAgentWitchDefaultWakePort:()=>Jo,resolveAgentWitchDeviceKeypairPath:()=>nc,resolveAgentWitchErrorLogPath:()=>l_,resolveAgentWitchInstallDir:()=>L,resolveAgentWitchLaunchAgentPrefix:()=>Ae,resolveAgentWitchLocalLayout:()=>N,resolveAgentWitchLogsDir:()=>Un,resolveAgentWitchMainLogPath:()=>a_,resolveAgentWitchProjectsDir:()=>oc,resolveAgentWitchReportsDir:()=>c_,resolveAgentWitchRuntimeWakePort:()=>vi,resolveAgentWitchWakePortFromSources:()=>Li,sanitizeProfileEmailForDir:()=>Cr,sanitizeProfileEmailForLaunchAgentLabel:()=>s_});var K=a(()=>{"use strict";d_();u_();Wj();p_()});var f_,y_,Dg=a(()=>{"use strict";f_=new Set(["","loginwindow","_mbsetupuser","root"]),y_=5e3});var Oj,Bte,Mj,h_,S_=a(()=>{"use strict";Oj=require("node:child_process");Dg();Bte=e=>e.trim().toLowerCase(),Mj=e=>e==null?!1:!f_.has(Bte(e)),h_=()=>{if(process.platform!=="darwin")return null;try{let t=(0,Oj.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return Mj(t)?t:null}catch{return null}}});var Nj,jj,Qt,ic=a(()=>{"use strict";Nj=m(require("node:os"));S_();jj=e=>e.trim().toLowerCase(),Qt=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?h_():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??Nj.default.userInfo().username;return jj(r)===jj(o)}});var Dj,Hj,Bn,Fj=a(()=>{"use strict";Dj=require("node:child_process"),Hj=m(require("node:fs"));K();ic();Bn=(e=L())=>{let t=Lr(e);if(!Hj.default.existsSync(t))return{ok:!1,errorMessage:"AgentWitch install not found."};if(!Qt())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Ze(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,Dj.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var P_,Nt,Ii,$j=a(()=>{"use strict";P_="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",Nt=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[P_]==="1"},Ii=e=>`Refusing ${e} host side effects under VITEST (set ${P_}=1 to override).`});var Gn=a(()=>{"use strict";$j()});var zj,ac,Hg=a(()=>{"use strict";zj=require("node:child_process");Gn();ac=e=>{if(process.platform!=="darwin"||!Nt())return;let t=process.getuid?.();if(t!==void 0)try{(0,zj.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var Fg,A_,Uj,ge,$g,lc=a(()=>{"use strict";Fg=m(require("node:fs")),A_=m(require("node:path"));K();ze();Uj=e=>{let t=A_.default.join(e,lt);return Fg.default.existsSync(t)?Fg.default.readdirSync(t).filter(r=>Fg.default.statSync(A_.default.join(t,r)).isDirectory()).map(r=>Cr(r)).toSorted():[]},ge=(e=L())=>{let t=Ae(e),r=Uj(e);return[{profileEmail:Ze(e)??r[0]??null,launchAgentLabel:t}]},$g=(e=L())=>Uj(e)});var b_,Bj,Gj,Gte,oo,zg=a(()=>{"use strict";b_=m(require("node:fs")),Bj=m(require("node:os")),Gj=m(require("node:path"));K();lc();Gte=()=>Gj.default.join(Bj.default.homedir(),"Library","LaunchAgents"),oo=(e=L())=>{let t=Ae(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ge(e))r.add(n.launchAgentLabel);let o=Gte();if(b_.default.existsSync(o))for(let n of b_.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var Vj,cc,Kj=a(()=>{"use strict";K();Hg();zg();lc();Vj=(e=L())=>{let t=new Set(ge(e).map(r=>r.launchAgentLabel));return oo(e).filter(r=>!t.has(r))},cc=(e=L())=>{for(let t of Vj(e))ac(t)}});var dc,__=a(()=>{"use strict";K();Hg();zg();dc=(e=L())=>{for(let t of oo(e))ac(t)}});var qj,Jj,Vte,Vn,Yj=a(()=>{"use strict";qj=require("node:child_process"),Jj=require("node:util"),Vte=(0,Jj.promisify)(qj.execFile),Vn=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await Vte("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var Kn,Kte,k_,w_=a(()=>{"use strict";Kn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Kte=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,k_=e=>{let t=e.pathValue??Kte(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${Kn(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${Kn(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${Kn(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${Kn(e.homeDir)}</string>
    <key>PATH</key>
    <string>${Kn(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${Kn(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${Kn(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var Ug,R_=a(()=>{"use strict";Ug=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var uc,T_,Bg,Gg,no,Vg=a(()=>{"use strict";uc=m(require("node:fs")),T_=m(require("node:os")),Bg=m(require("node:path"));ze();K();w_();R_();Gg=(e,t=T_.default.homedir())=>Bg.default.join(t,"Library","LaunchAgents",`${e}.plist`),no=e=>{let t=e.installDir??L(),r=e.homeDir??T_.default.homedir(),o=Gg(e.launchAgentLabel,r),n=uc.default.existsSync(o)?uc.default.readFileSync(o,"utf8"):null;if(n!==null&&Ug(n))return{ok:!0,rewritten:!1,plistPath:o};let s=k_({launchAgentLabel:e.launchAgentLabel,runPath:Bg.default.join(t,$O,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??vi(t)});if(!Ug(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{uc.default.mkdirSync(Bg.default.dirname(o),{recursive:!0}),uc.default.writeFileSync(o,s,"utf8")}catch(i){let l=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:l}}return{ok:!0,rewritten:!0,plistPath:o}}});var Zj,Qj,eN,pc,qte,Jte,Xj,Qe,E_=a(()=>{"use strict";Zj=require("node:child_process"),Qj=m(require("node:fs")),eN=require("node:util");K();Gn();Vg();ic();pc=(0,eN.promisify)(Zj.execFile),qte=async e=>{try{return await pc("launchctl",["print",e]),!0}catch{return!1}},Jte=async(e,t,r)=>{await qte(t)&&await pc("launchctl",["bootout",t]).catch(()=>{}),await pc("launchctl",["bootstrap",e,r]),await pc("launchctl",["enable",t])},Xj=async e=>{try{return await pc("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Qe=async(e,t=L())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Nt())return{ok:!1,errorMessage:Ii("launchctl")};if(!Qt())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=no({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await Xj(n))return{ok:!0};let i=s.plistPath;if(!Qj.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await Jte(o,n,i),await Xj(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(l){return{ok:!1,errorMessage:l instanceof Error?l.message:"launchctl bootstrap failed."}}}});var qn,tN=a(()=>{"use strict";K();E_();lc();qn=async(e=L(),t=process.platform)=>{if(t!=="darwin")return[];let r=[];for(let o of ge(e))(await Qe(o.launchAgentLabel,e)).ok&&r.push(o.launchAgentLabel);return r}});var Kg,xi,rN,oN,nN,sN=a(()=>{"use strict";Kg=require("node:child_process"),xi=m(require("node:fs")),rN="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",oN=e=>{try{return(0,Kg.execFileSync)("plutil",["-extract",rN,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},nN=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=xi.default.statSync(e);try{xi.default.copyFileSync(e,r),(0,Kg.execFileSync)("plutil",["-replace",rN,"-string",String(t),r],{stdio:"ignore"}),(0,Kg.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),xi.default.chmodSync(r,o&4095),xi.default.renameSync(r,e)}finally{xi.default.rmSync(r,{force:!0})}}});var iN,aN=a(()=>{"use strict";K();iN=e=>Ci(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var lN,cN,Yte,mc,dN=a(()=>{"use strict";lN=m(require("node:fs")),cN=m(require("node:os"));sN();aN();Vg();Yte=(e,t)=>{let r=iN({filePort:t,plistValue:oN(e)});return r.kind!=="sync"?!1:(nN(e,r.wakePort),!0)},mc=e=>{let t=e.homeDir??cN.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>Gg(o,t)).filter(o=>lN.default.existsSync(o)).filter(o=>Yte(o,e.wakePort))}});var Tt,so,uN=a(()=>{"use strict";__();ic();Dg();Tt=e=>{Qt()||(dc(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},so=(e,t=y_)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Qt()||e()},t);return()=>{clearInterval(r)}}});var de=a(()=>{"use strict";QO();Fj();Hg();Kj();__();zg();ic();Yj();tN();E_();Vg();R_();dN();w_();lc();S_();Dg();uN()});var C_=a(()=>{"use strict";de()});var gc,pN,qg,mN,Wi,gN,fN,Yo=a(()=>{"use strict";gc=".agent-witch",pN="memory",qg="project.json",mN="chunks.ndjson",Wi="runs.ndjson",gN="reports",fN=".json"});var yN=a(()=>{"use strict";Yo()});var hN,Jg,L_=a(()=>{"use strict";hN=m(require("node:path"));yN();Jg=(e,t)=>hN.default.join(e.trim(),`${t.trim()}${fN}`)});var fc,SN,PN=a(()=>{"use strict";fc="agent-witch.js",SN="command"});var Yg=a(()=>{"use strict";PN()});var Jn,AN,bN=a(()=>{"use strict";Yg();Jn=e=>`'${e.replace(/'/g,"'\\''")}'`,AN=e=>{let t=`${e.installDir.trim()}/${"app"}/${fc}`,r=[Jn("node"),Jn(t),"report","write","--key",Jn(e.reportKey.trim()),"--agent-run-id",Jn(e.agentRunId.trim()),"--status",Jn(e.status),"--summary",Jn(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",Jn(e.details.trim())),r.join(" ")}});var vr,_N,Xte,v_,Xg=a(()=>{"use strict";L_();bN();vr={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},_N=e=>e===vr.COMPLETED||e===vr.FAILED,Xte=e=>["Maintain a machine-readable job report so the user can check status later.","AgentWitch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),v_=(e,t)=>{let r=Jg(t.reportsDir,t.reportKey),o=AN({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:vr.IN_PROGRESS,summary:"Task started on your computer."});return`${e.trim()}

---
${Xte({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var et=a(()=>{"use strict";ze();K()});var hc,wN,kN,RN,Zte,Oi,Qte,TN,Sc,Pc,I_,EN,CN,Ac=a(()=>{"use strict";hc=m(require("node:fs")),wN=m(require("node:path"));Xg();L_();et();kN=50,RN=e=>{let t=N(),r=Jg(t.reportsDir,e);return hc.default.mkdirSync(wN.default.dirname(r),{recursive:!0}),r},Zte=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},Oi=e=>{let t=RN(e);if(!hc.default.existsSync(t))return null;try{let r=JSON.parse(hc.default.readFileSync(t,"utf8"));return Zte(r)?r:null}catch{return null}},Qte=(e,t)=>{let r=[...e,t];return r.length>kN?r.slice(r.length-kN):r},TN=e=>{let t=RN(e.reportKey);hc.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Sc=e=>{let t=Oi(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:Qte(t?.history??[],o)};return TN(n),n},Pc=e=>{let t=Oi(e.reportKey);return t!==null?t:Sc({reportKey:e.reportKey,agentRunId:e.agentRunId,status:vr.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},I_=(e,t)=>{let r=t.trim();if(r.length===0)return Oi(e);let o=Oi(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return TN(s),s},EN=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},CN=e=>{if(e===null||!_N(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===vr.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var ere,tre,bc,LN,Zg,x_=a(()=>{"use strict";Xg();Ac();ere=new Set(Object.values(vr)),tre=e=>ere.has(e),bc=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},LN=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},Zg=e=>{if(e[0]!=="write")return LN(),1;let r=bc(e,"--key"),o=bc(e,"--agent-run-id"),n=bc(e,"--status"),s=bc(e,"--summary"),i=bc(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!tre(n)?(LN(),1):(Sc({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var Et,Yn=a(()=>{"use strict";Et=()=>!0});var W_,vN,Xn,Qg=a(()=>{"use strict";W_=m(require("node:path")),vN=require("node:url");Yn();Xn=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=W_.default.resolve(t);return Et()?r===W_.default.resolve(__filename):e===void 0?!1:r===(0,vN.fileURLToPath)(e)}});var O_,M_,j_,Ee,N_=a(()=>{"use strict";O_=["block","warn","info"],M_=["seed","project","retired"],j_="warn",Ee={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var D_,io,ON,MN,H_,Xo,jN=a(()=>{"use strict";N_();D_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),io=e=>typeof e=="string"?e:null,ON=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],MN=e=>{if(!D_(e))return null;let t=io(e.id)?.trim()??"",r=io(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=M_.find(d=>d===e.source)??"project",n=O_.find(d=>d===e.severity)??j_,s=D_(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",l=io(s?.value)?.trim()??"",c=io(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:io(e.cause)?.trim()??"",avoidance:io(e.avoidance)?.trim()??"",check:{kind:i,value:l.length>0?l:t},keywords:ON(e.keywords),tags:ON(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:io(e.lastSeenAt),updatedAt:io(e.updatedAt),severity:n}},H_=e=>!D_(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>MN(t)).filter(t=>t!==null),syncedAt:io(e.syncedAt)},Xo=e=>e.filter(t=>t.source!=="retired").length});var Zn,F_=a(()=>{"use strict";Zn=e=>e.replace(/\s+/g," ").trim()});var er,$_=a(()=>{"use strict";er=e=>Math.ceil(e.length/4)});var ef,NN=a(()=>{"use strict";$_();ef=(e,t)=>{if(t<=0)return"";if(er(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var _c,DN=a(()=>{"use strict";F_();_c=e=>`${Zn(e.id)}|${Zn(e.avoidance)}`});var HN=a(()=>{"use strict"});var Ct=a(()=>{"use strict";N_();jN();F_();$_();NN();DN();HN()});var Qn,Mi,ji,Ni,kc,tf,FN,$N,zN,UN,BN,wc,Rc,rf,Di,of,z_,tr=a(()=>{"use strict";Qn="agent-witch-token-saver",Mi=`# BEGIN ${Qn}`,ji=`# END ${Qn}`,Ni=`<!-- BEGIN ${Qn} -->`,kc=`<!-- END ${Qn} -->`,tf=".cursor/rules/agent-witch-check-context.mdc",FN=".cursor/mcp.json",$N=".codex/config.toml",zN=".codex/AGENTS.md",UN=".claude/settings.json",BN="declined-projects.json",wc="agent-witch",Rc="agent-witch",rf=["mcp"],Di="mcp-hook",of="check_context",z_=`${Rc} ${Di} ${of}`});var nf,sf,af,Hi,U_,Tc,lf=a(()=>{"use strict";Ct();tr();nf=Ee.symptom,sf=Ee.cause,af=Ee.avoidance,Hi=64,U_="token-saver.db",Tc=1});var cf,Fi,sre,JPe,$i=a(()=>{"use strict";cf="agent-witch.js",Fi="deps.tar.gz",sre="install.sh",JPe={mainScript:`app/${cf}`,depsArchive:`app/${Fi}`,installShell:sre}});var GN=a(()=>{"use strict";$i()});var VN=a(()=>{"use strict";$i();GN()});var Ec,G_,df,ire,Cc,Ue,Ui,Lc,vc,es,V_=a(()=>{"use strict";Ec=m(require("node:fs")),G_=m(require("node:path"));VN();K();df="install-version.json",ire=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Cc=(e=L())=>G_.default.join(e,df),Ue=(e=L())=>{let t=Cc(e);if(!Ec.default.existsSync(t))return null;try{let r=JSON.parse(Ec.default.readFileSync(t,"utf8"));return!ire(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ui=(e,t=L())=>{let r=Cc(t);Ec.default.mkdirSync(G_.default.dirname(r),{recursive:!0}),Ec.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},Lc=(e=L())=>Ue(e)?.bundleVersion??"267",vc=(e,t)=>{let r=Ue(e);if(r!==null)return r;let o={bundleVersion:"267",appOrigin:t,updatedAt:new Date().toISOString()};return Ui(o,e),o},es=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var KN,ts,K_,q_,J_,uf,Ir,rs,Y_=a(()=>{"use strict";KN=require("node:crypto"),ts=m(require("node:fs")),K_=m(require("node:path"));K();q_="self-update-log.ndjson",J_=100,uf=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Un({installDir:e,profileEmail:t.profileEmail});return K_.default.join(r,q_)},Ir=(e,t=L())=>{let r={id:(0,KN.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=uf(t);ts.default.mkdirSync(K_.default.dirname(o),{recursive:!0});let n=ts.default.existsSync(o)?ts.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-J_+1)),JSON.stringify(r)];return ts.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},rs=(e=20,t=L())=>{let r=uf(t);if(!ts.default.existsSync(r))return[];let o=ts.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var X_,pAe,Z_=a(()=>{"use strict";$i();X_="deps",pAe=`${"app"}/${Fi}`});var qN=a(()=>{"use strict";Z_()});var JN,Zo,os,YN,Q_,ek,XN=a(()=>{"use strict";JN=require("node:child_process"),Zo=m(require("node:fs")),os=m(require("node:path"));$i();Z_();YN=e=>os.default.join(e,"app",X_),Q_=e=>{let t=os.default.join(e,"app"),r=os.default.join(t,Fi);Zo.default.existsSync(r)&&(Zo.default.rmSync(YN(e),{recursive:!0,force:!0}),Zo.default.mkdirSync(t,{recursive:!0}),(0,JN.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),Zo.default.rmSync(r,{force:!0}))},ek=e=>{Zo.default.rmSync(os.default.join(e,"node_modules"),{recursive:!0,force:!0}),Zo.default.rmSync(os.default.join(e,"package.json"),{force:!0}),Zo.default.rmSync(os.default.join(e,"package-lock.json"),{force:!0})}});var ZN=a(()=>{"use strict";qN();XN()});var QN=a(()=>{"use strict";bi()});var pf,mf,gf=a(()=>{"use strict";pf="AGENT_WITCH_EXTERNAL_BRIDGE",mf="AGENT_WITCH_EXTERNAL_LIVE"});var eD=a(()=>{"use strict";gf();bi()});var tD,Ic,rD=a(()=>{"use strict";tD=require("node:child_process");bi();Ic=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,tD.spawn)("systemctl",["--user","restart",Tr],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${Tr} exited ${o??"unknown"}`))})})});var tk=a(()=>{"use strict";bi();QN();eD();rD()});var Ht,Bi=a(()=>{"use strict";Ht=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var xc,ff,oD,lre,rk,cre,nD,dre,sk,ure,ik,rr,Wc,Oc,ak,ok,nk,Mc,jc,lk,ck,Gi=a(()=>{"use strict";xc=m(require("node:fs")),ff=m(require("node:path"));Bi();oD="active-writer-work.json",lre=1440*60*1e3,rk=new Set,cre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nD=e=>e.profileEmail===null?ff.default.join(e.installDir,oD):ff.default.join(e.installDir,"profiles",e.profileEmail,oD),dre=e=>{let t=nD(e);if(!xc.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(xc.default.readFileSync(t,"utf8"));if(!cre(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},sk=(e,t)=>{let r=nD(e);xc.default.mkdirSync(ff.default.dirname(r),{recursive:!0}),xc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},ure=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??Ht;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>lre},ik=e=>{let t=dre(e);if(!ure(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{sk(e,r)}catch{}return r},rr=e=>ik(e).activeCount>0,Wc=e=>{let t=ik(e);sk(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},Oc=e=>{let t=ik(e),r=Math.max(0,t.activeCount-1);if(sk(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of rk)o()},ak=e=>(rk.add(e),()=>{rk.delete(e)}),ok=null,nk=null,Mc=e=>{ok=e},jc=e=>{nk=e},lk=()=>{let e=ok;return ok=null,e},ck=()=>{let e=nk;return nk=null,e}});var Be,yf=a(()=>{"use strict";Be=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var Vi,hf,Nc,dk=a(()=>{"use strict";Vi="qwen2.5:7b",hf="nomic-embed-text",Nc="Install Ollama from https://ollama.com/download"});var Dc,uk,Sf=a(()=>{"use strict";dk();Dc=()=>`
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
    echo "Ollama is missing. ${Nc}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${Nc}" >&2
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
  agent_witch_ensure_ollama_model "${Vi}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${hf}" "\${pull_log}"
}
`,uk=()=>`
${Dc()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. AgentWitch will continue without it." >&2
`});var sD,pre,Pf,pk=a(()=>{"use strict";sD=require("node:child_process");K();Gn();Sf();pre=e=>new Promise(t=>{if(!Nt()){t({exitCode:1,output:Ii("Ollama")});return}let r=(0,sD.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:L()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Pf=async(e=pre)=>{let t=`${Dc()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var Qo,Af,iD,mre,aD,qi,gre,fre,yre,Ki,ns,ss,lD=a(()=>{"use strict";Qo=m(require("node:fs")),Af=m(require("node:path"));ZN();tk();de();K();$i();Rt();V_();Gi();yf();Y_();pk();iD=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mre=e=>{let t=Ze(e),r=t===null?N():N(t);if(!Qo.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Qo.default.readFileSync(r.configPath,"utf8"));return!iD(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},aD=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!iD(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},qi=async e=>(await aD(e))?.bundleVersion??null,gre=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Af.default.join(t,r);Qo.default.mkdirSync(Af.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());Qo.default.writeFileSync(n,s),r.endsWith(".js")&&Qo.default.chmodSync(n,493)},fre=async()=>{if(process.platform==="linux"){try{await Ic()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}cc(),await qn()},yre=(e,t)=>e!==null?Be(e):t??wt,Ki=(e,t)=>({localBundleVersion:t,...e}),ns=async e=>{let t=L(),r=Ue(t),o=r?.bundleVersion??null,n=await Pf();Ir({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=mre(t),i=yre(s,r?.appOrigin);if(i===null){let d=Ki({ok:!1,updated:!1,message:"Could not resolve the AgentWitch app origin for updates.",remoteBundleVersion:null},o);return Ir({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let l=await aD(i);if(l===null){let d=Ki({ok:!1,updated:!1,message:"Could not fetch the remote AgentWitch install bundle.",remoteBundleVersion:null},o);return Ir({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||es(o,l.bundleVersion))){let d=Ki({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:l.bundleVersion},o);return Ir({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:l.bundleVersion}),d}try{for(let f of l.scripts)await gre(i,t,f);let d=Af.default.join(t,cf);Qo.default.existsSync(d)&&Qo.default.rmSync(d,{force:!0}),Q_(t),ek(t),Ui({bundleVersion:l.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=N(Ze(t));if(rr(u)){jc("install-bundle-update");let f=Ki({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:l.bundleVersion},l.bundleVersion);return Ir({event:"update_applied",ok:!0,message:f.message,localBundleVersion:o,remoteBundleVersion:l.bundleVersion}),f}await fre();let g=Ki({ok:!0,updated:!0,message:`Updated AgentWitch bundle ${o??"unknown"} -> ${l.bundleVersion}.`,remoteBundleVersion:l.bundleVersion},l.bundleVersion);return Ir({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:l.bundleVersion}),g}catch(d){let u=d instanceof Error?d.message:"AgentWitch self-update failed.",g=Ki({ok:!1,updated:!1,message:u,remoteBundleVersion:l.bundleVersion},o);return Ir({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:l.bundleVersion}),g}},ss=()=>{let e=L();return{local:Ue(e),logs:rs(20,e)}}});var cD={};kt(cD,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>df,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>Nc,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>hf,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>Vi,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>q_,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>J_,appendAgentWitchSelfUpdateLog:()=>Ir,buildAgentWitchEnsureOllamaShell:()=>Dc,buildAgentWitchInstallScriptOllama:()=>uk,buildAgentWitchSelfUpdateStatus:()=>ss,ensureAgentWitchInstallVersionRecorded:()=>vc,ensureAgentWitchOllamaInstalled:()=>Pf,fetchAgentWitchRemoteInstallBundleVersion:()=>qi,isRemoteAgentWitchBundleVersionNewer:()=>es,readAgentWitchInstallVersion:()=>Ue,readAgentWitchSelfUpdateLogs:()=>rs,resolveAgentWitchAppOriginFromWsUrl:()=>Be,resolveAgentWitchHeartbeatInstallBundleVersion:()=>Lc,resolveAgentWitchInstallVersionPath:()=>Cc,resolveAgentWitchSelfUpdateLogPath:()=>uf,runAgentWitchSelfUpdate:()=>ns,writeAgentWitchInstallVersion:()=>Ui});var xr=a(()=>{"use strict";V_();Y_();lD();yf();dk();Sf();pk()});var mk={};kt(mk,{buildAgentWitchSelfUpdateStatus:()=>ss,fetchAgentWitchRemoteInstallBundleVersion:()=>qi,runAgentWitchSelfUpdate:()=>ns});var gk=a(()=>{"use strict";xr()});function Ji(e){return(0,dD.createHash)("sha256").update(e.trim()).digest("hex")}var dD,bf=a(()=>{"use strict";dD=require("node:crypto")});var Yi,Hc,hre,Xi,fk,_f=a(()=>{"use strict";Yi=m(require("node:fs")),Hc=m(require("node:path"));bf();et();hre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Xi=e=>{if(!Yi.default.existsSync(e))return null;try{let t=JSON.parse(Yi.default.readFileSync(e,"utf8"));return!hre(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:Ji(t.pairingToken.trim())}catch{return null}},fk=(e=L())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(Xi(Hc.default.join(e,"config.json")));let n=Hc.default.join(e,lt);if(!Yi.default.existsSync(n))return t;for(let s of Yi.default.readdirSync(n)){let i=Hc.default.join(n,s);Yi.default.statSync(i).isDirectory()&&o(Xi(Hc.default.join(i,"config.json")))}return t}});var Zi,Fc=a(()=>{"use strict";Zi="connection-health.json"});var is,kf,Sre,$c,We,yk,wf,Ge,Rf=a(()=>{"use strict";is=m(require("node:fs")),kf=m(require("node:path"));Fc();Sre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$c=e=>e.profileEmail===null?kf.default.join(e.installDir,Zi):kf.default.join(e.installDir,"profiles",e.profileEmail,Zi),We=e=>{let t=$c(e);if(!is.default.existsSync(t))return null;try{let r=JSON.parse(is.default.readFileSync(t,"utf8"));return!Sre(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},yk=e=>{let t=$c(e);is.default.existsSync(t)&&is.default.rmSync(t,{force:!0})},wf=(e,t)=>{let r=$c(e),o=We(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};is.default.mkdirSync(kf.default.dirname(r),{recursive:!0}),is.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},Ge=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var zc,uD=a(()=>{"use strict";Fc();Rf();zc=(e,t)=>{if(!t.socketOpen)return!1;let r=We(e);return r===null?!1:!Ge(r,t.staleAfterMs??12e4,t.nowMs)}});var hk,pD=a(()=>{"use strict";Rf();hk=(e,t)=>!(e!==null&&!Ge(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var as=a(()=>{"use strict";Rf();uD();pD();Fc()});var Tf,Sk,Pre,Are,mD,gD=a(()=>{"use strict";Tf=m(require("node:fs")),Sk=m(require("node:path"));K();ze();as();_f();Pre=12e4,Are=e=>{let t=Sk.default.join(e,lt);return Tf.default.existsSync(t)?Tf.default.readdirSync(t).filter(r=>Tf.default.statSync(Sk.default.join(t,r)).isDirectory()):[]},mD=(e=L())=>{let t=null,r=-1;for(let o of Are(e)){let n=N(o),s=We(n);if(s===null||Ge(s,Pre))continue;let i=Xi(n.configPath);if(i===null)continue;let l=Date.parse(s.lastAckAt);!Number.isFinite(l)||l<=r||(r=l,t=i)}return t}});var ls,Pk=a(()=>{"use strict";ls={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var fD,bre,_re,yD,kre,Ak,hD=a(()=>{"use strict";Pk();fD=/you(?:'|')ve hit your session limit/i,bre=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],_re=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,yD=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},kre=e=>{let t=_re.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},Ak=e=>{let t=e.trim();if(t.length===0)return null;if(fD.test(t))return{code:ls.SESSION_LIMIT,resetHint:kre(t),matchedLine:yD(t,fD)};for(let r of bre)if(r.test(t))return{code:ls.PROVIDER_QUOTA,resetHint:null,matchedLine:yD(t,r)};return null}});var Ef,Cf,bk,_k=a(()=>{"use strict";Ef="[[AGENT_RUN_WRITER_EXECUTION]]",Cf="cli-writer-api-key-missing",bk="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var kk=a(()=>{"use strict";_k()});var SD=a(()=>{"use strict";kk()});var oe,wk=a(()=>{"use strict";oe={FOLDER_REQUIRED:"folder_required",FOLDER_NOT_REGISTERED:"folder_not_registered",FOLDER_NOT_FOUND:"folder_not_found",FOLDER_CHECK_UNAVAILABLE:"folder_check_unavailable",CODING_TOOLS_PAUSED:"coding_tools_paused"}});var cs,Rk=a(()=>{"use strict";cs={computerFallback:"This computer",folderNotAllowed:"Blocked: that folder isn't this project's folder on {computer}. Nothing ran.",folderMissing:"This project has no folder on {computer} yet. Set it in AgentWitch Local, then send the task again.",folderMissingReason:"Set this project's folder on {computer} first.",pauseLabel:"Pause all coding tools",pauseHint:"Running tasks stop. New tasks wait until you turn this off.",pauseStatus:"Paused",pauseReason:"Paused on {computer}. Turn it back on in AgentWitch Local.",secretHidden:"Output hidden: it looked like it had a secret. Open the report on {computer}.",folderCheckUnavailablePlaceholder:"Couldn't check this project's folder on {computer}. Nothing ran."}});var Tre,Qi,ds,PD=a(()=>{"use strict";wk();Rk();Tre={[oe.FOLDER_REQUIRED]:"folderMissing",[oe.FOLDER_NOT_FOUND]:"folderMissing",[oe.FOLDER_NOT_REGISTERED]:"folderNotAllowed",[oe.FOLDER_CHECK_UNAVAILABLE]:"folderCheckUnavailablePlaceholder",[oe.CODING_TOOLS_PAUSED]:"pauseReason"},Qi=(e,t=cs.computerFallback)=>cs[e].replace("{computer}",t),ds=(e,t)=>Qi(Tre[e],t)});var Wr,bD,AD,Ere,Tk,_D,Ek=a(()=>{"use strict";Wr="[redacted-secret]",bD="[redacted-private-key]",AD="(?!\\[redacted)",Ere="(?:[A-Z0-9]+_)*(?:KEY|APIKEY|SECRET|TOKEN|PASSWORD|PASSWD|PAT|CREDENTIALS?)(?:_[A-Z0-9]+)*",Tk=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----(?:[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----|[\s\S]*$)/g,replacement:bD},{pattern:new RegExp(`^(\\s*(?:export\\s+)?${Ere}\\s*=\\s*)${AD}(["']?)[^\\s"'#]{4,}\\2`,"gm"),replacement:`$1${Wr}`},{pattern:/("?pairing_?token"?\s*[:=]\s*"?)(?!\[redacted)[^\s",}]{6,}/gi,replacement:`$1${Wr}`},{pattern:/\bsk-[A-Za-z0-9_-]{20,}/g,replacement:Wr},{pattern:/\bgithub_pat_[A-Za-z0-9_]{20,}/g,replacement:Wr},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:Wr},{pattern:/\bxox[a-z]-[A-Za-z0-9-]{10,}/g,replacement:Wr},{pattern:/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g,replacement:Wr},{pattern:/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{8,}=*/gi,replacement:`Bearer ${Wr}`},{pattern:new RegExp(`\\b(api[_-]?key|secret|token|password|passwd|credential)(["']?\\s*[:=]\\s*)${AD}(["']?)[^\\s"'\\\\(),;]{8,}\\3`,"gi"),replacement:`$1$2${Wr}`}],_D=[/-----(?:BEGIN|END) [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[A-Za-z0-9_-]{20,}/,/\bgithub_pat_[A-Za-z0-9_]{20,}/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[a-z]-[A-Za-z0-9-]{10,}/,/\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/,/\bBearer\s+(?!\[redacted)[A-Za-z0-9\-._~+/]{12,}/i]});var Uc,en,Bc,kD=a(()=>{"use strict";Ek();Uc=e=>_D.some(t=>t.test(e)),en=e=>{let t={replacements:0},r=Tk.reduce((o,n)=>o.replace(n.pattern,(...s)=>{t.replacements+=1;let i=s.slice(1,-2).map(l=>typeof l=="string"?l:"");return n.replacement.replace(/\$(\d)/g,(l,c)=>i[Number(c)-1]??"")}),e);return{scrubbed:r,residualSecret:Uc(r),replacementCount:t.replacements}},Bc=(e,t)=>{let r=en(e);return r.residualSecret?t:r.scrubbed}});var ct=a(()=>{"use strict";Pk();hD();_k();kk();SD();wk();Rk();PD();Ek();kD()});var Gc,wD,RD,Lf=a(()=>{"use strict";Gc={maxTurns:30,maxMinutes:30,maxBudgetUsd:2},wD=["Read","Glob","Grep","Edit","Write","TodoWrite","Bash(git status *)","Bash(git diff *)","Bash(git log *)","Bash(git show *)"],RD=124});var Ck,TD,vf,Vc,Kc,Cre,Lre,vre,ED,Ce,Le,If,Ire,xre,Wre,Or,or=a(()=>{"use strict";Ck=m(require("node:fs")),TD=m(require("node:os")),vf=m(require("node:path"));Lf();Vc={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},Kc=e=>e.trim().length>0,Cre=e=>{let t=vf.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},Lre=()=>{let e=TD.default.homedir(),t=vf.default.join(e,".local","bin","agent");if(Ck.default.existsSync(t))return t;let r=vf.default.join(e,".local","bin","cursor-agent");return Ck.default.existsSync(r)?r:Vc.cursorCommand},vre=e=>{let t=e.trim();return!Kc(t)||t===Vc.cursorCommand?Lre():t},ED=(e,t)=>Cre(e)?t:["agent",...t],Ce=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Le=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:Kc(t)?t.trim():Vc.claudeCommand,codexCommand:Kc(r)?r.trim():Vc.codexCommand,cursorCommand:vre(o),antigravityCommand:Kc(n)?n.trim():Vc.antigravityCommand}},If=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:ED(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Ire=["--permission-mode","dontAsk","--allowedTools",wD.join(","),"--max-turns",String(Gc.maxTurns),"--max-budget-usd",Gc.maxBudgetUsd.toFixed(2)],xre=["-s","workspace-write","-c",'approval_policy="never"'],Wre=["--trust","--sandbox","enabled"],Or=(e,t,r,o)=>{let n=t.trim();if(!Kc(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json",...Ire,n]}:e==="codex"?{command:r.codexCommand,args:["exec",...xre,n]}:e==="cursor"?{command:r.cursorCommand,args:ED(r.cursorCommand,[...s,"-p",...Wre,n])}:{command:r.antigravityCommand,args:[...s,"--sandbox","-p",n]}}});var tn,Ore,us,Mre,ea,qc=a(()=>{"use strict";tn=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,Ore=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:tn(s.inputTokens)+tn(s.outputTokens)+tn(s.cacheReadInputTokens)+tn(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},us=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let l=i,c=tn(l.input_tokens)+tn(l.cache_creation_input_tokens)+tn(l.cache_read_input_tokens),d=tn(l.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:Ore(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},Mre=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),ea=(e,t)=>{let r=us(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??Mre(r)}}});var Lk,jre,Nre,vk,Ik=a(()=>{"use strict";Lk=e=>e.toLocaleString("en-US"),jre=e=>e<.01?e.toFixed(4):e.toFixed(3),Nre=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${jre(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Lk(e.inputTokens)} in / ${Lk(e.outputTokens)} out (${Lk(e.totalTokens)} total)`,t].join(`
`)},vk=(e,t)=>{if(t===void 0)return e;let r=Nre(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var xf,xk=a(()=>{"use strict";xf={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var ps,Wk,Wf,Ok=a(()=>{"use strict";xk();ps="auto",Wk=e=>({value:ps,label:`Auto (${xf[e]})`}),Wf={anthropic:[Wk("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[Wk("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[Wk("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ta,Jc,Of,ra=a(()=>{"use strict";xk();Ok();ta=e=>{let t=e?.trim()??"";if(!(t.length===0||t===ps))return t},Jc=(e,t)=>{let r=ta(t);return r===void 0?xf[e]:r},Of=e=>{let t=ta(e);return t===void 0?ps:t}});var Mf,Dre,Hre,jf,CD=a(()=>{"use strict";Mf={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},Dre=e=>{let t=Mf[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Mf["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Mf["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Mf["gemini-2.0-flash"]:null},Hre=(e,t,r)=>{let o=Dre(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},jf=e=>{let t=Hre(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var oa,Fre,$re,zre,Nf,LD=a(()=>{"use strict";CD();oa=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),Fre=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=oa(r.input_tokens),n=oa(r.output_tokens);return o===0&&n===0?null:jf({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},$re=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=oa(r.prompt_tokens),n=oa(r.completion_tokens);return o===0&&n===0?null:jf({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},zre=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=oa(r.promptTokenCount),n=oa(r.candidatesTokenCount);return o===0&&n===0?null:jf({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Nf=(e,t,r)=>e==="anthropic"?Fre(t,r):e==="openai"?$re(t,r):zre(t,r)});var Ure,Mk,Bre,Gre,Vre,Kre,qre,jk,Nk=a(()=>{"use strict";ra();LD();Ure=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},Mk=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Jc(e,t.model)},Bre=async e=>{let t=Mk("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=Ure(o);n.length>0&&e.onChunk?.(n);let s=Nf("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},Gre=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},Vre=async e=>{let t=Mk("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=Gre(o);n.length>0&&e.onChunk?.(n);let s=Nf("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},Kre=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},qre=async e=>{let t=Mk("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=Kre(n);s.length>0&&e.onChunk?.(s);let i=Nf("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},jk=async e=>{try{return e.provider==="anthropic"?await Bre(e):e.provider==="openai"?await Vre(e):await qre(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var Lt,Yc=a(()=>{"use strict";Lt=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var vD,Jre,Df,Dk=a(()=>{"use strict";vD=m(require("node:path")),Jre="writer-api-secrets.json",Df=e=>vD.default.join(e,Jre)});var Hk,ID,Yre,rn,mt,on=a(()=>{"use strict";Hk=m(require("node:fs"));ra();Dk();ID=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Yre=e=>{if(!ID(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=ta(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},rn=e=>{let t=Df(e);if(!Hk.default.existsSync(t))return{};try{let r=JSON.parse(Hk.default.readFileSync(t,"utf8"));if(!ID(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=Yre(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},mt=(e,t)=>rn(e)[t]??null});var tt,Xc=a(()=>{"use strict";tt=e=>e==="api"?"api":"cli"});var xD,Ke,ms,ao=a(()=>{"use strict";xD=m(require("node:path"));Yc();on();Xc();Ke=e=>xD.default.dirname(e),ms=(e,t)=>{if(tt(e.writerExecutionBackend)!=="api")return!1;let r=Lt(t);if(r===null)return!1;let o=Ke(e.layout.configPath),n=mt(o,r);return n!==null&&n.apiKey.length>0}});var Zc,Fk=a(()=>{"use strict";Ik();Nk();Yc();on();ao();Zc=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=Lt(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Ke(e.layout.configPath),l=mt(i,s);if(l===null){let d=Object.keys(rn(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in AgentWitch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await jk({provider:s,secret:l,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:vk(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Xre,WD,OD,MD=a(()=>{"use strict";Xre={paused:!1,updatedAt:null},WD={paused:!0,updatedAt:null},OD=e=>{if(e===null)return Xre;try{let t=JSON.parse(e);if(typeof t!="object"||t===null||typeof t.paused!="boolean")return WD;let r=t;return{paused:r.paused,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:null}}catch{return WD}}});var Qc,Hf,Zre,Qre,ed,eoe,gs,lo,$k,Ff=a(()=>{"use strict";Qc=m(require("node:fs")),Hf=m(require("node:path"));MD();Zre="coding-tools-pause.json",Qre="unreadable",ed=e=>Hf.default.join(Hf.default.dirname(e),Zre),eoe=e=>{try{return Qc.default.readFileSync(e,"utf8")}catch(t){return t.code==="ENOENT"?null:Qre}},gs=e=>OD(eoe(ed(e))),lo=e=>gs(e).paused,$k=(e,t,r=new Date)=>{let o=ed(e),n={paused:t,updatedAt:r.toISOString()};Qc.default.mkdirSync(Hf.default.dirname(o),{recursive:!0,mode:448});let s=`${o}.${process.pid}.tmp`;return Qc.default.writeFileSync(s,`${JSON.stringify(n)}
`,{mode:384}),Qc.default.renameSync(s,o),n}});var jD,na,zk=a(()=>{"use strict";jD=require("node:child_process");ct();or();qc();Fk();ao();Ff();na=(e,t,r)=>new Promise(o=>{if(!Ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(lo(e.layout.configPath)){o({exitCode:-1,output:ds(oe.CODING_TOOLS_PAUSED)});return}if(ms(e,t)){Zc(e,t,r).then(o);return}let n=Or(t,r,Le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,jD.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],l=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{l.push(c.toString("utf8"))}),s.on("close",c=>{let d=ea(i.join("")),u=l.join("").trim(),g=[d.output.trim(),u].filter(f=>f.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var ND=a(()=>{"use strict"});var DD=a(()=>{"use strict";Ik();zk();Nk();ND();on();ao()});var HD,FD,$D,zD=a(()=>{"use strict";HD="claude",FD="codex",$D="cursor"});var UD,toe,Uk,td,$f=a(()=>{"use strict";UD=m(require("node:path"));Rt();ze();toe="ws://localhost:3000/api/agent-witch/ws",Uk=e=>e.replace(/\/$/,""),td=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return Uk(t);let r=UD.default.basename(e.installDir);if(r===Fl.production)return Wm;let o=e.configWsUrl?.trim()??"";return r===Fl.localhost?o.length>0?Uk(o):toe:o.length>0?Uk(o):Wm}});var ooe,Bk,Gk=a(()=>{"use strict";zD();$f();Xc();ooe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Bk=e=>{if(!ooe(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=td({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??HD,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??FD,l=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??$D,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:l,antigravityCommand:c,pairingToken:d,writerExecutionBackend:tt(t.writerExecutionBackend),layout:e.layout}}}});var Vk,Kk,qk=a(()=>{"use strict";Vk=m(require("node:fs"));K();Gk();Kk=e=>{let t=N(e);if(!Vk.default.existsSync(t.configPath))return null;try{let r=JSON.parse(Vk.default.readFileSync(t.configPath,"utf8")),o=Bk({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var rd,BD=a(()=>{"use strict";rd=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var Jk,noe,Yk,GD=a(()=>{"use strict";Jk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),noe=e=>{if(!Jk(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!Jk(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",l=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||l.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(g=>{if(!Jk(g))return[];let f=typeof g.itemKey=="string"?g.itemKey.trim():"",y=typeof g.relativePath=="string"?g.relativePath:"",A=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return f.length===0||A.length===0?[]:[{itemKey:f,relativePath:y,contentSha256:A}]});return u.length===0?[]:[{componentId:i,versionId:l,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},Yk=noe});var VD,soe,zf,Xk=a(()=>{"use strict";VD=m(require("node:path")),soe=(e,t)=>{let r=t.trim();return VD.default.join(e,"components","store",r.slice(0,2),r)},zf=soe});var KD,ioe,Zk,qD=a(()=>{"use strict";KD=m(require("node:fs"));Xk();ioe=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=zf(e.installDir,n.contentSha256);KD.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this computer. Open Harness to sync, then retry.`},Zk=ioe});var od,sa,aoe,Qk,loe,ew,tw=a(()=>{"use strict";od=m(require("node:fs")),sa=m(require("node:path"));Xk();aoe=(e,t)=>sa.default.join(e.installDir,"runs",t,"overlay"),Qk=(e,t)=>sa.default.join(aoe(e,t),".cursor"),loe=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Qk(e,t);od.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let l=zf(e.installDir,i.contentSha256);if(!od.default.existsSync(l))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this computer."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?sa.default.join(n,c):sa.default.join(n,i.itemKey);od.default.mkdirSync(sa.default.dirname(d),{recursive:!0}),od.default.copyFileSync(l,d)}return{ok:!0}},ew=loe});var rw,JD,coe,nd,YD=a(()=>{"use strict";rw=m(require("node:fs")),JD=m(require("node:path")),coe=(e,t)=>{let r=JD.default.join(e.installDir,"runs",t);rw.default.existsSync(r)&&rw.default.rmSync(r,{recursive:!0,force:!0})},nd=coe});var doe,ow,XD=a(()=>{"use strict";tw();doe=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Qk(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},ow=doe});var nw,uoe,poe,moe,goe,foe,H,ZD=a(()=>{"use strict";nw=m(require("node:fs"));$f();K();Xc();uoe="claude",poe="codex",moe="cursor",goe="agy",foe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=()=>{let e=N();if(!nw.default.existsSync(e.configPath))return null;try{let t=JSON.parse(nw.default.readFileSync(e.configPath,"utf8"));if(!foe(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=td({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:tt(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:uoe,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:poe,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:moe,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:goe,pairingToken:s,layout:e}}catch{return null}}});var Uf,QD,eH=a(()=>{"use strict";Uf=m(require("node:fs"));Dk();QD=(e,t)=>{let r=Df(e);Uf.default.mkdirSync(e,{recursive:!0}),Uf.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Uf.default.chmodSync(r,384)}catch{}}});var sd,tH,Bf=a(()=>{"use strict";sd=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},tH=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===sd(t)}});var id,yoe,sw,iw,rH=a(()=>{"use strict";id=m(require("node:fs"));on();eH();Bf();ra();ao();yoe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),sw=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=tH(s,n?.apiKey)?"":s,l=i.length>0?i:n?.apiKey;if(l===void 0||l.length===0)return e;let c=o!==void 0?ta(o):n?.model;return{...e,[t]:{apiKey:l,...c!==void 0?{model:c}:{}}}},iw=e=>{let t=Ke(e.configPath),r={};if(id.default.existsSync(e.configPath))try{let n=JSON.parse(id.default.readFileSync(e.configPath,"utf8"));yoe(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,id.default.mkdirSync(t,{recursive:!0}),id.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=sw(sw(sw(rn(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);QD(t,o)}});var Gf,aw=a(()=>{"use strict";Gf={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var lw,oH=a(()=>{"use strict";Yc();on();ao();ao();lw=(e,t)=>{if(ms(e,t)||t==="antigravity")return!1;let r=Lt(t);if(r===null)return!1;let o=Ke(e.layout.configPath),n=mt(o,r);return n===null||n.apiKey.trim().length===0}});var nH,cw,dw=a(()=>{"use strict";nH=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},cw=async e=>{let t=nH(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=nH(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var hoe,uw,sH=a(()=>{"use strict";de();qk();dw();hoe=1e4,uw=()=>cw({listProfileEmails:$g,readConfig:Kk,pollIntervalMs:hoe,logWaiting:e=>{console.error(e)}})});var Soe,pw,iH=a(()=>{"use strict";Soe={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This AgentWitch Local cannot handle Connect/restart. Update from /download."},pw=e=>({status:e.status,reason:e.reason,message:Soe[e.status]})});var Poe,mw,fs,aH=a(()=>{"use strict";ct();Poe=new Set(["terminal.stream.chunk","command.claude.result","command.claude.input_required","command.writer.session.chunk","command.writer.session.ready","harness.request.result","shell.data","run.heartbeat","dashboard.agentRun.get.result","dashboard.agentRun.list.result"]),mw=(e,t)=>typeof e=="string"?Bc(e,t):Array.isArray(e)?e.map(r=>mw(r,t)):typeof e=="object"&&e!==null?Object.fromEntries(Object.entries(e).map(([r,o])=>[r,mw(o,t)])):e,fs=e=>typeof e.type!="string"||!Poe.has(e.type)||e.payload===void 0?{...e}:{...e,payload:mw(e.payload,Qi("secretHidden"))}});var gw,Aoe,fw,lH=a(()=>{"use strict";gw=m(require("node:fs"));Ff();Aoe=1e3,fw=(e,t,r=Aoe)=>{let o=ed(e),n={paused:gs(e).paused},s=()=>{let i=gs(e).paused;i!==n.paused&&(n.paused=i,t(i))};return gw.default.watchFile(o,{interval:r,persistent:!1},s),()=>{gw.default.unwatchFile(o,s)}}});var Vf,ad,cH=a(()=>{"use strict";Vf=(e,t,r=500)=>[...e.filter(o=>o!==t),t].slice(-r),ad=(e=500)=>{let t={ids:[]};return{has:r=>t.ids.includes(r),add:r=>{t.ids=Vf(t.ids,r,e)}}}});var ld,dH=a(()=>{"use strict";ct();ld=e=>({type:"command.claude.result",payload:{exitCode:-1,output:ds(e.code,e.computer),errorCode:e.code,...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{}},...e.requestId!==void 0?{requestId:e.requestId}:{}})});var X=a(()=>{"use strict";zk();DD();qk();$f();BD();GD();qD();tw();YD();XD();Xc();ZD();rH();on();ao();Bf();ra();aw();Fk();ao();oH();Yc();on();sH();Gk();dw();iH();aH();Ff();lH();cH();dH()});var uH,yw,pH=a(()=>{"use strict";uH=m(require("node:path"));K();ze();gD();bf();_f();X();yw=(e=L())=>{let t=mD(e);if(t!==null)return t;let r=Ze(e);if(r!==null){let n=Xi(uH.default.join(e,lt,r,"config.json"));if(n!==null)return n}let o=H()?.pairingToken.trim()??"";return o.length===0?null:Ji(o)}});var Kf,mH,boe,_oe,gH,qf,cd,Jf,dd=a(()=>{"use strict";Kf=m(require("node:fs")),mH=m(require("node:path")),boe="wake-port.json",_oe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gH=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,qf=e=>mH.default.join(e,boe),cd=e=>{let t=qf(e);if(!Kf.default.existsSync(t))return null;try{let r=JSON.parse(Kf.default.readFileSync(t,"utf8"));if(_oe(r)&&gH(r.wakePort))return r.wakePort}catch{return null}return null},Jf=(e,t)=>{if(!gH(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=qf(e);Kf.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var iRe,aRe,lRe,nr,fH,ud=a(()=>{"use strict";K();dd();et();dd();iRe=Jo(),aRe=`${Ae()}-wake`,lRe=Ae(),nr=()=>{let e=L();return Li({filePort:cd(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Jo(e)})},fH=e=>{let t=L();cd(t)===null&&Jf(t,e)}});var yH=a(()=>{"use strict";bf();de();_f();pH();X();ud()});var hw,pd,md,hH=a(()=>{"use strict";hw=m(require("node:os"));yH();pd=()=>{let e=ge();return{ok:!0,port:nr(),hostname:hw.default.hostname(),profileCount:e.length}},md=()=>{let e=ge(),t=yw(),r=fk();return{hostname:hw.default.hostname(),port:nr(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var Sw=a(()=>{"use strict";hH()});var SH,PH,AH,Yf,ia=a(()=>{"use strict";SH="materialization.json",PH="backups",AH=".gitignore",Yf=e=>`harness-set:${e.trim()}`});var bH,_H,Xf,kH=a(()=>{"use strict";bH=m(require("node:crypto")),_H=m(require("node:fs")),Xf=e=>{try{let t=_H.default.readFileSync(e);return bH.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var nn,ys,koe,wH,Pw,RH=a(()=>{"use strict";nn=m(require("node:fs")),ys=m(require("node:path"));kH();koe=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=ys.default.join(t,n,o);return nn.default.mkdirSync(ys.default.dirname(s),{recursive:!0}),nn.default.copyFileSync(r,s),ys.default.relative(e,s).replaceAll("\\","/")},wH=e=>{let t=ys.default.join(e.repoRoot,e.repoRelativeDestination),r=Xf(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if(nn.default.existsSync(t)){let n=Xf(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=koe(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return nn.default.mkdirSync(ys.default.dirname(t),{recursive:!0}),nn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return nn.default.mkdirSync(ys.default.dirname(t),{recursive:!0}),nn.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},Pw=e=>{let t=Xf(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var Aw,TH,aa,Zf=a(()=>{"use strict";Aw=m(require("node:fs"));ia();TH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),aa=e=>{if(!Aw.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(Aw.default.readFileSync(e,"utf8"));if(TH(t)&&t.version===1&&TH(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var sn,Qf,ey,bw=a(()=>{"use strict";sn=m(require("node:fs")),Qf=m(require("node:path"));ia();ey=e=>{let t=new Set(e.setSlugs.map(s=>Yf(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let l=Qf.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=Qf.default.join(e.repoRoot,i.backupPath);sn.default.existsSync(c)?(sn.default.mkdirSync(Qf.default.dirname(l),{recursive:!0}),sn.default.copyFileSync(c,l),o.push(s)):sn.default.existsSync(l)&&sn.default.rmSync(l,{force:!0})}else sn.default.existsSync(l)&&sn.default.rmSync(l,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var _w,la,ty=a(()=>{"use strict";_w=m(require("node:path"));ia();la=e=>({ledgerFilePath:_w.default.join(e.metaDirPath,SH),backupsDirPath:_w.default.join(e.metaDirPath,PH)})});var kw,EH,CH=a(()=>{"use strict";kw=m(require("node:path")),EH=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return kw.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return kw.default.posix.join(s,e,n)}});var ww,LH,fd,Rw=a(()=>{"use strict";ww=m(require("node:fs")),LH=m(require("node:path")),fd=(e,t)=>{ww.default.mkdirSync(LH.default.dirname(e),{recursive:!0}),ww.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Tw,woe,Me,co=a(()=>{"use strict";Tw=m(require("node:os")),woe=e=>{let t=e.trim();return t.startsWith("~/")?`${Tw.default.homedir()}${t.slice(1)}`:t==="~"?Tw.default.homedir():t},Me=woe});var ry,vH,Roe,IH,xH=a(()=>{"use strict";ry=m(require("node:fs")),vH=m(require("node:path"));ia();Yo();Roe=`*
!${qg}
`,IH=e=>{let t=vH.default.join(e,AH);ry.default.existsSync(t)||(ry.default.mkdirSync(e,{recursive:!0}),ry.default.writeFileSync(t,Roe))}});var hs,Ft,Ss=a(()=>{"use strict";hs=m(require("node:path"));Yo();co();Ft=e=>{let t=Me(e),r=hs.default.join(t,gc);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:hs.default.join(r,"rag"),memoryDirPath:hs.default.join(r,pN),reportsDirPath:hs.default.join(r,gN),metaFilePath:hs.default.join(r,qg),ragChunksFilePath:hs.default.join(r,"rag",mN)}}});var Mr,OH,Toe,Eoe,dt,oy=a(()=>{"use strict";Mr=m(require("node:fs")),OH=m(require("node:path"));Yo();xH();Ss();Toe=(e,t)=>{if(Mr.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};Mr.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},Eoe=e=>{Mr.default.existsSync(e.ragChunksFilePath)||Mr.default.writeFileSync(e.ragChunksFilePath,"");let t=OH.default.join(e.memoryDirPath,Wi);Mr.default.existsSync(t)||Mr.default.writeFileSync(t,"")},dt=e=>{let t=Ft(e.projectFolderPath);return Mr.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),Mr.default.mkdirSync(t.ragDirPath,{recursive:!0}),Mr.default.mkdirSync(t.memoryDirPath,{recursive:!0}),IH(t.metaDirPath),Toe(t,e),Eoe(t),{ok:!0,layout:t}}});var MH,jH,NH,DH,ny,sy=a(()=>{"use strict";MH="components",jH="store",NH="versions",DH="installed.json",ny=e=>`harness-set:${e.trim()}`});var Ew,HH,iy,Cw=a(()=>{"use strict";Ew=m(require("node:fs")),HH=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),iy=e=>{if(!Ew.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(Ew.default.readFileSync(e,"utf8"));if(HH(t)&&t.version===1&&HH(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var yd,ca,ay=a(()=>{"use strict";yd=m(require("node:path"));sy();ca=e=>{let t=yd.default.join(e,MH);return{componentsRootDir:t,storeDir:yd.default.join(t,jH),versionsDir:yd.default.join(t,NH),installedFilePath:yd.default.join(t,DH)}}});var Lw,FH,ly,cy,dy=a(()=>{"use strict";Lw=m(require("node:crypto")),FH=m(require("node:fs")),ly=e=>Lw.default.createHash("sha256").update(e,"utf8").digest("hex"),cy=e=>{try{let t=FH.default.readFileSync(e);return Lw.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var vw,$H,zH,UH=a(()=>{"use strict";vw=m(require("node:fs")),$H=m(require("node:path")),zH=(e,t)=>{vw.default.mkdirSync($H.default.dirname(e),{recursive:!0}),vw.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Iw,xw,BH,GH=a(()=>{"use strict";Iw=m(require("node:fs")),xw=m(require("node:path")),BH=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=xw.default.join(e,r),n=xw.default.join(o,`${t.versionId}.json`);Iw.default.mkdirSync(o,{recursive:!0}),Iw.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var uy,VH,KH,qH=a(()=>{"use strict";uy=m(require("node:fs")),VH=m(require("node:path"));dy();KH=e=>{let t=ly(e.content),r=VH.default.join(e.storeDir,t);return uy.default.existsSync(r)||(uy.default.mkdirSync(e.storeDir,{recursive:!0}),uy.default.writeFileSync(r,e.content)),t}});var Ww,JH,Coe,py,Ow=a(()=>{"use strict";Ww=m(require("node:fs")),JH=m(require("node:path"));sy();Cw();ay();dy();UH();GH();qH();Coe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),py=e=>{let t=ca(e.installDir),r=ny(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!Coe(i))continue;let l=typeof i.path=="string"?i.path.trim():"";if(l.length===0)continue;let c=JH.default.join(e.harnessRootDir,l);if(!Ww.default.existsSync(c))continue;let d=Ww.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:cy(c);if(u!==null){if(ly(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);KH({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:l,contentSha256:u})}}if(n.length===0)return;BH(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=iy(t.installedFilePath);zH(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var jw,Mw,YH,XH=a(()=>{"use strict";jw=m(require("node:fs"));Ow();Cw();ay();Mw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),YH=e=>{if(!jw.default.existsSync(e.harnessManifestPath))return;let t=ca(e.installDir),r=iy(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(jw.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!Mw(o)||o.version!==1||!Mw(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!Mw(s))continue;let i=typeof s.version=="number"?s.version:1,l=Array.isArray(s.items)?s.items:[];py({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:l}})}}});var Nw,ZH,QH,eF=a(()=>{"use strict";Nw=m(require("node:fs")),ZH=m(require("node:path")),QH=e=>{let t=e.componentId.replaceAll("/","_"),r=ZH.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!Nw.default.existsSync(r))return null;try{let o=JSON.parse(Nw.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var my,gy,tF,rF=a(()=>{"use strict";my=m(require("node:fs")),gy=m(require("node:path"));sy();XH();eF();ay();dy();tF=e=>{YH({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=ca(e.layout.installDir),r=ny(e.setSlug),o=QH({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(l=>l.id===e.manifestItemId);if(i!==void 0){let l=gy.default.join(t.storeDir,i.contentSha256);if(my.default.existsSync(l)&&cy(l)===i.contentSha256)return l}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?gy.default.join(e.layout.harnessRootDir,n):gy.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!my.default.existsSync(s))return null;try{if(!my.default.statSync(s).isFile())return null}catch{return null}return s}});var oF,Loe,Dw,jr,hd=a(()=>{"use strict";Zf();ty();Ss();oF="harness-set:",Loe=e=>{let t=e.trim();if(!t.startsWith(oF))return null;let r=t.slice(oF.length).trim();return r.length>0?r:null},Dw=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=Loe(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},jr=e=>{let t=Ft(e),{ledgerFilePath:r}=la(t),o=aa(r);return Dw(o)}});var fy,Hw,Sd,voe,uo,Pd,da=a(()=>{"use strict";fy=m(require("node:fs")),Hw=m(require("node:os")),Sd=m(require("node:path")),voe=()=>fy.default.realpathSync(Sd.default.resolve(Hw.default.homedir())),uo=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Sd.default.join(Hw.default.homedir(),t.slice(1)):t,o;try{o=fy.default.realpathSync(Sd.default.resolve(r))}catch{return null}let n=voe();return o===n||o.startsWith(`${n}${Sd.default.sep}`)?o:null},Pd=e=>{let t=uo(e);if(t===null)return null;try{if(!fy.default.statSync(t).isFile())return null}catch{return null}return t}});var Fw,$w=a(()=>{"use strict";Fw=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var hy,nF,yy,Ioe,Ad,zw=a(()=>{"use strict";hy=m(require("node:fs")),nF=m(require("node:path"));ia();RH();Zf();bw();ty();CH();Rw();co();oy();rF();hd();da();$w();yy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ioe=e=>{if(!hy.default.existsSync(e))return null;try{let t=JSON.parse(hy.default.readFileSync(e,"utf8"));if(yy(t)&&t.version===1)return t}catch{return null}return null},Ad=e=>{let t=[...new Set(e.setSlugs.map(p=>p.trim()).filter(p=>p.length>0))],r=Me(e.projectFolderPath),o=uo(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=hy.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=dt({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:l}=la(s.layout),d=jr(o).filter(p=>!t.includes(p)),u=aa(i),g=0;if(d.length>0){let p=ey({repoRoot:o,setSlugs:d,ledger:u});u=p.ledger,g=p.summary.removedPaths.length}if(t.length===0)return fd(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let f=Ioe(e.layout.harnessManifestPath);if(f===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=yy(f.sets)?f.sets:{},A=0,S=0,P=0;for(let p of t){let b=y[p];if(!yy(b))return{ok:!1,errorMessage:`Harness set "${p}" is not installed locally.`};let C=typeof b.version=="number"?String(b.version):"1",h=Yf(p),_=Array.isArray(b.items)?b.items:[];for(let w of _){if(!yy(w))continue;let R=typeof w.path=="string"?w.path.trim():"";if(R.length===0)continue;let E=Fw(R);if(E===null)continue;let x=EH(p,E),W=nF.default.posix.join(".cursor",x).replaceAll("\\","/"),z=typeof w.id=="string"?w.id.trim():"",O=tF({layout:e.layout,setSlug:p,setVersion:typeof b.version=="number"?b.version:1,manifestItemPath:R,manifestItemId:z});if(O===null)continue;let U=wH({repoRoot:o,backupsDir:l,repoRelativeDestination:W,sourceAbsolutePath:O,componentId:h,versionId:C,ledger:u});if(U.kind==="skipped_unchanged"){S+=1;continue}if(U.kind==="backed_up_user_file"){P+=1,A+=1,u={version:1,entries:{...u.entries,[W]:Pw({componentId:h,versionId:C,sourceAbsolutePath:O,backupPath:U.backupPath})}};continue}A+=1,u={version:1,entries:{...u.entries,[W]:Pw({componentId:h,versionId:C,sourceAbsolutePath:O})}}}}return A===0&&S===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(fd(i,u),{ok:!0,writtenFileCount:A,skippedFileCount:S,backedUpFileCount:P,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var sF,Sy,xoe,Woe,Ooe,Moe,joe,Noe,Doe,Hoe,Foe,bd,Py=a(()=>{"use strict";sF=m(require("node:crypto")),Sy=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},xoe=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Woe=(e,t)=>{let r=xoe(t),o=Sy(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Ooe=(e,t,r)=>{let o=Woe(t,r);return`shared/items/${e}/${o}`},Moe=["rules","skills","commands","instructions","agents"],joe=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Noe=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Doe=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Hoe=e=>sF.default.createHash("sha256").update(e,"utf8").digest("hex"),Foe=e=>({id:e.id,kind:e.kind,title:e.title,path:Ooe(e.id,e.kind,e.title),contentSha256:Hoe(e.content)}),bd=e=>{let t=new Date().toISOString(),r=e.existingManifest??joe(e.hostname,t),o=Sy(e.bundle.slug),n=Doe(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...Moe.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:l}=e.bundle.items.reduce((d,u)=>{let g=Foe(u);return{files:[...d.files,{relativePath:g.path,content:u.content}],nextItems:Noe(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:l}}},directories:s,files:i}}});var an,iF,Ay,$oe,Ps,Uw=a(()=>{"use strict";an=m(require("node:fs")),iF=m(require("node:os")),Ay=m(require("node:path"));Py();$oe=e=>{if(!an.default.existsSync(e))return null;try{let t=JSON.parse(an.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Ps=e=>{try{let t=$oe(e.layout.harnessManifestPath),r=bd({bundle:e.bundle,hostname:iF.default.hostname(),existingManifest:t});an.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)an.default.mkdirSync(Ay.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Ay.default.join(e.layout.harnessRootDir,o.relativePath);an.default.mkdirSync(Ay.default.dirname(n),{recursive:!0}),an.default.writeFileSync(n,o.content)}return an.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Bw,aF=a(()=>{"use strict";Uw();zw();Bw=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=Ps({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Ad({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var lF,cF=a(()=>{"use strict";lF=["rule","skill","command","instruction","agent"]});var dF,zoe,Uoe,Nr,Gw=a(()=>{"use strict";cF();dF=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zoe=e=>typeof e=="string"&&lF.includes(e),Uoe=e=>{if(!dF(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!zoe(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},Nr=e=>{if(!dF(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=Uoe(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var uF,Boe,Vw,pF=a(()=>{"use strict";uF=require("node:zlib");Gw();Boe="x-agent-witch-token",Vw=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[Boe]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,uF.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),l=Nr(i);return l===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:l}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var qw,Kw,Dr,mF=a(()=>{"use strict";qw=m(require("node:fs")),Kw=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dr=e=>{if(!qw.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(qw.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Kw(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=Kw(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!Kw(i))return null;let l=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:l,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:l,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var by,gF=a(()=>{"use strict";by=()=>"~"});var fF,yF,hF=a(()=>{"use strict";fF=require("node:crypto"),yF=e=>`local-${(0,fF.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Jw,SF=a(()=>{"use strict";Jw=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var _d,_y,Yw=a(()=>{"use strict";_d=m(require("node:path")),_y=e=>{let t=_d.default.dirname(e),r=_d.default.basename(t);return r==="agents"?_d.default.basename(_d.default.dirname(t)):r}});var kd,po,PF,Goe,Voe,Koe,ky,AF,Xw=a(()=>{"use strict";kd=m(require("node:fs")),po=m(require("node:path"));hF();SF();Yw();PF=new Set(["node_modules",".git","dist","build",".next","coverage"]),Goe=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Voe=(e,t)=>{let r=po.default.basename(t);if(e==="skill"){let o=t.split(po.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},Koe=e=>{let t=[],r=(n,s)=>{let i;try{i=kd.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let l of i){if(l.name.startsWith(".")||l.isDirectory()&&PF.has(l.name))continue;let c=po.default.join(n,l.name),d=s?po.default.join(s,l.name):l.name;if(l.isDirectory()){r(c,d);continue}if(!l.isFile())continue;Jw(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=po.default.join(e,n);kd.default.existsSync(s)&&r(s,n)}let o=po.default.join(e,"skills");return kd.default.existsSync(o)&&r(o,"skills"),t},ky=e=>{let t=Koe(e);if(t.length===0)return null;let r=po.default.dirname(e),o=_y(e),n=Goe(o),s=t.map(i=>{let l=Jw(i.relativePath.replaceAll("\\","/"));if(l===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:yF(i.absolutePath),kind:l,title:Voe(l,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},AF=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=kd.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let l of i){if(r())return;if(!l.isDirectory()||PF.has(l.name))continue;let c=po.default.join(n,l.name);if(l.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var bF,Zw,qoe,Qw,_F=a(()=>{"use strict";bF=m(require("node:fs")),Zw=m(require("node:path"));Xw();da();qoe=e=>{let t=uo(e.trim());if(t===null)return null;if(Zw.default.basename(t)===".cursor")return t;let r=Zw.default.join(t,".cursor");try{if(bF.default.statSync(r).isDirectory())return uo(r)}catch{return null}return null},Qw=e=>{let t=qoe(e.projectPath);if(t===null)return null;let r=ky(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,l)=>i.proposedName.localeCompare(l.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var kF,Joe,wy,eR,wF=a(()=>{"use strict";kF=m(require("node:path"));Xw();da();Yw();Joe=5,wy=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},eR=e=>{let t=uo(e.scanRoot.trim());if(t===null)return wy(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of AF(t,Joe,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=uo(s);if(i===null)continue;let l=_y(i);wy(e.response,"folder",{cursorDir:i,groupName:l,repoPath:kF.default.dirname(i)});let c=ky(i);c!==null&&(r.push(c),wy(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:l,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return wy(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var RF,TF,EF=a(()=>{"use strict";RF=m(require("node:path")),TF=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:RF.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var ut,CF,tR,Yoe,rR,oR,Ry,nR,wd,LF=a(()=>{"use strict";ut=m(require("node:fs")),CF=m(require("node:os")),tR=m(require("node:path"));Py();Ow();da();EF();Yoe=e=>{if(!ut.default.existsSync(e))return null;try{let t=JSON.parse(ut.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},rR=e=>{let t=e.hostname??CF.default.hostname(),r=Yoe(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let l=i.items.filter(u=>u.include);if(l.length===0)continue;let c=[];for(let u of l){let g=Pd(u.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let f=ut.default.readFileSync(g,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:f,setSlugs:[i.slug]})}let d=bd({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{ut.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)ut.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let l=tR.default.join(e.layout.harnessRootDir,i.relativePath);ut.default.mkdirSync(tR.default.dirname(l),{recursive:!0}),ut.default.writeFileSync(l,i.content)}ut.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=Sy(i.slug),d=r.sets[c];d!==void 0&&py({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},oR="reveal-cache.json",Ry=(e,t)=>{ut.default.mkdirSync(e.harnessRootDir,{recursive:!0}),ut.default.writeFileSync(`${e.harnessRootDir}/${oR}`,`${JSON.stringify(t,null,2)}
`)},nR=e=>{let t=`${e.harnessRootDir}/${oR}`;ut.default.existsSync(t)&&ut.default.unlinkSync(t)},wd=e=>{let t=`${e.harnessRootDir}/${oR}`;if(!ut.default.existsSync(t))return null;try{let r=JSON.parse(ut.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return TF(r)}catch{return null}return null}});var ln=a(()=>{"use strict";zw();aF();$w();Uw();pF();Gw();Py();mF();gF();_F();da();wF();LF()});var sR,vF=a(()=>{"use strict";ln();et();sR=e=>{let t=N(e.profileEmail);return Ps({bundle:e.bundle,layout:t})}});var IF=a(()=>{"use strict";vF();ln()});var Xoe,xF,Zoe,WF,As,Ty,OF=a(()=>{"use strict";Xoe=["agentwitch.com","www.agentwitch.com"],xF=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,Zoe=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},WF=e=>{let t=Zoe(e);return!!(Xoe.includes(t)||xF.test(e.trim().toLowerCase()))},As=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return WF(r)?xF.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},Ty=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:As(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Rd=a(()=>{"use strict";OF()});var mo,Td=a(()=>{"use strict";mo=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Ed,MF=a(()=>{"use strict";IF();Rd();Td();Ed=e=>{if(!mo(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Nr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!As(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=sR({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var iR=a(()=>{"use strict";MF()});var Qoe,ua,aR=a(()=>{"use strict";Qoe=e=>e==="hourly"||e==="daily"||e==="weekdays",ua=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",l=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!Qoe(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:l,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var Cd,Ey,jF,NF,lR,sr,Cy,Ly,vy,Iy,xy=a(()=>{"use strict";Cd=m(require("node:fs")),Ey=m(require("node:path"));aR();jF="automations.json",NF=e=>e.profileEmail!==null?Ey.default.join(e.installDir,"profiles",e.profileEmail,jF):Ey.default.join(e.installDir,jF),lR=()=>({version:1,automations:[]}),sr=e=>{let t=NF(e);if(!Cd.default.existsSync(t))return lR();try{let r=JSON.parse(Cd.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?lR():{version:1,automations:r.automations.flatMap(n=>{let s=ua(n);return s!==null?[s]:[]})}}catch{return lR()}},Cy=(e,t)=>{let r=NF(e);Cd.default.mkdirSync(Ey.default.dirname(r),{recursive:!0}),Cd.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Ly=(e,t)=>{Cy(e,{version:1,automations:t})},vy=(e,t)=>{let o=sr(e).automations.filter(n=>n.id!==t.id);Cy(e,{version:1,automations:[...o,t]})},Iy=(e,t)=>sr(e).automations.find(r=>r.id===t)??null});var re,gt=a(()=>{"use strict";re="x-agent-witch-token"});var cR=a(()=>{"use strict";yf();Sf()});var V,bs,dR,Ld,uR,ene,pR,_s,ks,mR,Hr=a(()=>{"use strict";gt();cR();V=e=>{let t=Be(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},bs=e=>({[re]:e,"Content-Type":"application/json"}),dR=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:bs(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",l=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||l.length===0?null:{id:i,prompt:l,writerAgent:c}}catch{return null}},Ld=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:bs(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},uR=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:bs(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},ene=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",l=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||l.length===0||r.push({id:s,name:i,folderPath:l})}return r},pR=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:bs(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",l=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||l.length===0||c.length===0?null:{id:i,name:l,folderPath:c}}catch{return null}},_s=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:bs(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return ene(r)}catch{return null}},ks=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:bs(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},mR=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:bs(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var ws,DF,HF,tne,gR,FF,fR=a(()=>{"use strict";ws=m(require("node:fs")),DF=m(require("node:path")),HF=e=>DF.default.join(e.harnessRootDir,"projects-registry.json"),tne=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),gR=e=>{let t=HF(e);if(!ws.default.existsSync(t))return[];try{let r=JSON.parse(ws.default.readFileSync(t,"utf8"));return tne(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},FF=e=>{let t=HF(e);if(!ws.default.existsSync(t))return;let r=`${t}.migrated`;if(ws.default.existsSync(r)){ws.default.unlinkSync(t);return}ws.default.renameSync(t,r)}});var $F,rne,one,zF,UF=a(()=>{"use strict";co();$F=e=>Me(e),rne=e=>new Set(e.map(t=>$F(t.folderPath))),one=e=>new Set(e.map(t=>t.id)),zF=(e,t)=>{let r=rne(t),o=one(t),n=[],s=new Set;for(let i of e){let l=$F(i.projectFolderPath);l.length!==0&&(r.has(l)||s.has(l)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(l),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var yR,hR=a(()=>{"use strict";Hr();fR();UF();yR=async(e,t)=>{let r=gR(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await _s(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=zF(r,n),i=r.length-s.length,l=0,c=0;for(let d of s)await pR(o,{name:d.name,folderPath:d.folderPath})?l+=1:c+=1;return c===0&&FF(e),{migratedCount:l,skippedCount:i,failedCount:c}}});var SR,ir,pa=a(()=>{"use strict";SR=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),ir=(e,t)=>e.find(r=>r.id===t)??null});var Fr,ma=a(()=>{"use strict";Hr();hR();pa();Fr=async(e,t)=>{t!==void 0&&await yR(t,e);let r=V({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await _s(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach AgentWitch Cloud. Check the computer connection and try again."};let n=SR(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in AgentWitch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from AgentWitch Cloud.`}}});var BF=a(()=>{"use strict"});var PR,nne,Wy,AR=a(()=>{"use strict";PR=m(require("node:fs"));Ss();nne=e=>{let t=Ft(e);if(!PR.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(PR.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Wy=nne});var bR,_R,GF=a(()=>{"use strict";bR=m(require("node:path"));co();AR();_R=e=>{let t=bR.default.resolve(Me(e)),r=o=>{let{projectId:n}=Wy(o);if(n!==null)return n;let s=bR.default.dirname(o);return s===o?null:r(s)};return r(t)}});var sne,ine,Oy,kR=a(()=>{"use strict";sne="Default",ine=e=>e.trim().toLowerCase()===sne.toLowerCase(),Oy=ine});var My,jy,Ny=a(()=>{"use strict";My={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},jy=e=>{let t=Object.entries(My).find(([,r])=>r===e);return t===void 0?null:t[0]}});var VF,be,qF,ane,wR,RR,KF,lne,cne,vd,TR,dne,une,pne,JF,YF=a(()=>{"use strict";Ct();Ny();VF="new",be=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),qF={block:"Must fix",warn:"Warning",info:"Note"},ane={seed:"Built-in",project:"This project",retired:"Retired"},wR=6e4,RR=60*wR,KF=24*RR,lne=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<wR)return"Last hit just now";if(o<RR)return`Last hit ${Math.floor(o/wR)} min ago`;if(o<KF)return`Last hit ${Math.floor(o/RR)}h ago`;let n=Math.floor(o/KF);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},cne=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},vd=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,TR=e=>e?{retired:"1"}:{},dne=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=l=>`<option value="${l}"${r===l?" selected":""}>${qF[l]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${be(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${be(t?.id??"")}" />
      <input type="hidden" name="tags" value="${be((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${Ee.symptom}" value="${be(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${Ee.avoidance}" rows="3" placeholder="What to do instead">${be(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${Ee.cause}" rows="2" placeholder="What leads to this trap">${be(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${be((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${Ee.checkValue}" value="${be(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${be(vd(e.projectId,TR(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},une=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${be(r)}" />
            <input type="hidden" name="pitfallId" value="${be(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${be(vd(r,{...TR(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,l=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>be(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${be(t.id)}">
        <p><strong>${be(t.symptom)}</strong> <span class="muted">\xB7 ${qF[t.severity]} \xB7 ${ane[t.source]}</span></p>
        <p>Fix: ${be(t.avoidance)}</p>
        ${l}
        <p class="muted">${be(lne(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${be(cne(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},pne=e=>{let t=e.postPaths??My;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this computer on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=Xo(o),s=n>=64,i=e.showRetired?o:o.filter(f=>f.source!=="retired"),l=e.editId===null?null:e.editId===VF?s?null:{item:null}:(()=>{let f=o.find(y=>y.id===e.editId&&y.source!=="retired");return f===void 0?null:{item:f}})(),c=l===null?"":dne({projectId:e.projectId,item:l.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">${64} of ${64} active. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${be(vd(e.projectId,{...TR(e.showRetired),edit:VF}))}">Add pitfall</a>`,u=e.showRetired?`<a class="btn btn-secondary" href="${be(vd(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${be(vd(e.projectId,{retired:"1"}))}">Show retired</a>`,g=i.length===0?'<p class="empty">No pitfalls for this project. Add one when you spot a mistake that keeps coming back.</p>':`<ul class="harness-installed-set-list">${i.map(f=>une({projectId:e.projectId,item:f,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      <p class="muted">${n} of ${64} active</p>
      <div class="actions">${l===null?d:""}${u}</div>
      ${c}
      ${g}
    </section>`},JF=pne});var ie,XF,mne,gne,fne,yne,hne,cn,Dy=a(()=>{"use strict";kR();Ct();YF();ie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),XF=(e,t)=>e.length===0?`<p class="empty">${ie(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${ie(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${ie(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in AgentWitch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,mne=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this computer yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,gne=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from AgentWitch Cloud.":"This project\u2019s playbook is linked in AgentWitch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${ie(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},fne=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${ie(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
          <input type="hidden" name="projectId" value="${ie(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${ie(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the profile harness on this computer \u2014 refresh from AgentWitch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${ie(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this computer if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},yne=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?fne({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?gne({project:e.project,alreadyInRepo:!1}):mne();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",l=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
            <input type="hidden" name="projectId" value="${ie(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${ie(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${ie(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${ie(c.name)}</strong> <span class="muted mono">(${ie(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${u}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${ie(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${l}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},hne=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${ie(t)} from recent runs. Review in AgentWitch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${ie(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},cn=e=>{let t=e.flashError?`<div class="alert-error">${ie(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${ie(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(f,y)=>`<a class="project-tab${e.activeTab===f?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${f}">${ie(y)}</a>`,n=e.composition?.items.filter(f=>f.kind==="workflow")??[],s=e.composition?.items.filter(f=>f.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":{let f=yne({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0}),y=e.harnessExtraHtml?.trim()??"";return y.length===0?f:`${f}${y}`}case"workflows":return XF(n,"No workflows installed for this project yet.");case"agents":return XF(s,"No agents installed for this project yet.");case"knowledge":return hne({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return JF({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),l=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${Xo(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,u=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${ie(c)}" target="_blank" rel="noopener noreferrer">Open in AgentWitch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${ie(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,g=Oy(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from AgentWitch Cloud only. The folder on this computer is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from AgentWitch Cloud? Your repo folder on this computer will stay.');">
          <input type="hidden" name="projectId" value="${ie(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${ie(e.project.name)}</h1>
      <p class="muted mono">${ie(e.project.projectFolderPath)}</p>
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
    </section>${g}`}});var Sne,Pne,ZF,QF=a(()=>{"use strict";ln();gt();Sne=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Pne=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[re]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!Sne(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=Nr(n);return s===null?[]:[s]})}catch{return null}},ZF=Pne});var e$,ER,t$=a(()=>{"use strict";X();ln();Dy();ma();QF();pa();hd();Hr();Rt();e$=e=>({kind:"page",title:e.project.name,body:cn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Dr(e.layout),linkedSetSlugs:jr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ER=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=H();if(r===null)return{kind:"not_found"};let o=await Fr(r,e.layout),n=ir(o.projects,t);if(n===null)return{kind:"not_found"};let s=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??wt,l=s===null?null:await ZF(s,n.id);if(l===null)return e$({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from AgentWitch Cloud."});let c=Bw({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:l});if(!c.ok)return e$({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await ks(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var r$,CR,o$=a(()=>{"use strict";X();ln();Rt();Hr();Dy();oy();co();ma();pa();hd();Zf();bw();ty();Rw();r$=e=>({kind:"page",title:e.project.name,body:cn({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:Dr(e.layout),linkedSetSlugs:jr(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),CR=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=H();if(n===null)return{kind:"not_found"};let s=await Fr(n,e.layout),i=ir(s.projects,r);if(i===null)return{kind:"not_found"};let l=V({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=l?.appOrigin??wt;if(o.length===0)return r$({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Me(i.projectFolderPath),u=dt({projectFolderPath:d}),{ledgerFilePath:g}=la(u.layout),f=aa(g),y=Dw(f);if(!y.includes(o))return r$({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let A=y.filter(b=>b!==o),S=ey({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:f});fd(g,S.ledger);let P=l===null?!1:await ks(l,i.id,A),p=new URLSearchParams({linked:"1",removed:o,files:String(S.summary.removedPaths.length),bindingsSynced:P?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${p.toString()}`}}});var Ane,bne,n$,_ne,kne,Id,LR=a(()=>{"use strict";Ct();gt();Ane=1e4,bne=15e3,n$=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},_ne=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},kne=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(n$(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[re]:e.pairingToken},signal:AbortSignal.timeout(Ane)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=H_(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(n$(e.appOrigin,r),{method:"PUT",headers:{[re]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(bne)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:_ne(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Id=kne});var vR,s$,wne,Rne,Tne,Ene,i$,a$=a(()=>{"use strict";Ct();vR=e=>e.replace(/\s+/g," ").trim(),s$=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=vR(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},wne=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),Rne=(e,t)=>{let r=wne(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,Ee.id).replace(/-+$/g,"")},Tne=e=>e==="block"||e==="info"?e:"warn",Ene=e=>{let{form:t}=e,r=vR(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=vR(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>Ee.symptom||o.length>Ee.avoidance||n.length>Ee.cause||s.length>Ee.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),l=i.length>0?i:Rne(r,e.randomSuffix());return{ok:!0,pitfall:{id:l,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:l},keywords:s$(t.get("keywords")??"",Ee.keywords,Ee.keyword),tags:s$(t.get("tags")??"",Ee.tags,Ee.tag),source:"project",severity:Tne(t.get("severity"))}}},i$=Ene});var c$,Cne,go,l$,Hy,Lne,vne,d$,u$=a(()=>{"use strict";c$=require("node:crypto");Ct();a$();Ny();Cne=()=>(0,c$.randomBytes)(3).toString("hex"),go=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},l$=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),Hy=new Map,Lne=async(e,t)=>{let r=Hy.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);Hy.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),Hy.get(e)===s&&Hy.delete(e)}},vne=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return Lne(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return go(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return go(o,"unavailable",s);if(e.action==="save"){let d=i$({form:e.form,randomSuffix:e.randomSuffix??Cne});if(!d.ok)return go(o,"invalid",s);let u=i.items.find(y=>y.id===d.pitfall.id);if((u===void 0||u.source==="retired")&&Xo(i.items)>=64)return go(o,"limit",s);let f=await n.upsertPitfall(o,d.pitfall);return go(o,f.ok?"saved":f.reason==="active_limit"?"limit":f.reason,s)}let l=i.items.find(d=>d.id===t);if(l===void 0)return go(o,"missing",s);if(e.action==="restore"){if(l.source==="retired"&&Xo(i.items)>=64)return go(o,"limit",s);let d=await n.upsertPitfall(o,l$(l,"project"));return go(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,l$(l,"retired"));return go(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},d$=vne});var Fy,p$,m$,IR=a(()=>{"use strict";Fy=new Map,p$=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=Fy.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&Fy.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},m$=e=>{if(e===void 0){Fy.clear();return}Fy.delete(e)}});var xR,g$=a(()=>{"use strict";X();Hr();ma();pa();LR();u$();IR();xR=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=H();if(o===null)return{kind:"not_found"};let n=await Fr(o,e.layout),s=ir(n.projects,r);if(s===null)return{kind:"not_found"};let i=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),l=e.createStore??Id,c=i===null?null:l(i),d=await d$({action:e.action,form:t,projectId:s.id,store:c});return m$(s.id),{kind:"redirect",location:d}}});var Ine,WR,f$=a(()=>{"use strict";Ine=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,WR=Ine});var y$=a(()=>{"use strict"});var h$=a(()=>{"use strict"});var S$=a(()=>{"use strict";y$();h$()});var xne,dn,P$=a(()=>{"use strict";xne=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],dn=(e=process.env)=>{let t={...e};for(let r of xne)delete t[r];return t}});var A$=a(()=>{"use strict";P$()});var OR,b$=a(()=>{"use strict";OR={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var MR=a(()=>{"use strict";b$()});var $y,jR=a(()=>{"use strict";$y={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history"}});var zy=a(()=>{"use strict";S$();A$();Rt();MR();jR()});var _$,k$,Wne,Uy,By,w$=a(()=>{"use strict";_$=require("node:child_process"),k$=require("node:util");zy();Wne=(0,k$.promisify)(_$.execFile),Uy=async(e,t)=>{try{let{stdout:r}=await Wne("git",t,{cwd:e,env:dn(),maxBuffer:1048576});return r.trim()}catch{return null}},By=async e=>{let t=await Uy(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Uy(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Uy(e,["status","--porcelain"]),n=await Uy(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var NR,R$=a(()=>{"use strict";NR=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var One,DR,T$=a(()=>{"use strict";One=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},DR=One});var Mne,jne,ar,ga=a(()=>{"use strict";ct();Mne=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,jne=e=>en(e).scrubbed.replace(Mne,"[redacted-email]"),ar=jne});var Nne,HR,E$=a(()=>{"use strict";gt();ga();Nne=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[re]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:ar(r.lesson)}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},HR=Nne});var C$,un,L$=a(()=>{"use strict";C$=require("node:child_process"),un=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,C$.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var v$=a(()=>{"use strict";ma()});var xd,I$=a(()=>{"use strict";gt();xd=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[re]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var FR,x$=a(()=>{"use strict";gt();FR=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[re]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach AgentWitch Cloud."}}}});var W$,Dne,fo,$R,zR=a(()=>{"use strict";W$=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},Dne=e=>e===""?null:e,fo=e=>e??"",$R=e=>({id:e.id,projectId:Dne(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:W$(e.keywords_json),tags:W$(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var O$,Hne,Fne,UR,fa,Gy,Wd=a(()=>{"use strict";zR();O$=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,Hne=e=>e,Fne=e=>e??null,UR=(e,t,r=t)=>Hne(e.prepare(O$).all(fo(r),fo(t))).map($R),fa=(e,t,r,o=t)=>{let n=Fne(e.prepare(`${O$} AND p.id = ?`).get(fo(o),fo(t),r));return n===null?null:$R(n)},Gy=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(fo(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var Vy,BR=a(()=>{"use strict";Ct();Vy=e=>e.map(t=>({id:Zn(t.id),avoidance:Zn(t.avoidance)}))});var Ky,M$,qy=a(()=>{"use strict";Ky=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},M$=e=>e.filter(t=>t.source!=="retired").length});var Rs,j$,Od=a(()=>{"use strict";Ct();BR();Wd();qy();Rs=(e,t={})=>{let r=t.projectId??null,o=UR(e,null,r),n=r===null||r===""?[]:UR(e,r);return Ky({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},j$=(e,t={})=>{let r=Rs(e,t);return t.format==="bot"?{format:"bot",items:Vy(r),lines:r.map(o=>_c(o))}:{format:"full",items:r}}});var Jy,GR=a(()=>{"use strict";Wd();Od();Jy=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?fa(e,null,r):Rs(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var VR=a(()=>{"use strict"});var pn,ya,N$,D$,H$=a(()=>{"use strict";pn=e=>({type:"string",description:e}),ya={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:pn("Absolute working directory for the current session."),message:pn("User prompt or task text to match."),sessionId:pn("Optional session id for first-message tracking."),projectId:pn("Optional project id when already known.")},additionalProperties:!1}},N$={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:pn("Absolute working directory."),projectId:pn("Optional project id when already known.")},additionalProperties:!1}},D$={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:pn("Project id."),q:pn("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var Ts,F$,$$,z$=a(()=>{"use strict";Ts=e=>({type:"string",description:e}),F$={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:Ts("Project id."),skillId:Ts("Skill id when known."),q:Ts("Optional search text.")},required:["projectId"],additionalProperties:!1}},$$={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:Ts("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:Ts("Pitfall id when kind is pitfall."),preflightId:Ts("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:Ts("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var U$=a(()=>{"use strict";H$();z$()});var jd,B$=a(()=>{"use strict";Ct();VR();jd=e=>{let t=ef("AgentWitch tip \xB7 check_context",120);if(er(t)>=120)return t;let r=[t],o=er(t);for(let n of e){if(r.length-1>=4)break;let s=_c(n),i=er(s);if(o+i>120){if(r.length===1){let l=120-o,c=ef(s,l);c.length>0&&(r.push(c),o+=er(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var G$=a(()=>{"use strict";Ct()});var Nd=a(()=>{"use strict";VR();U$();B$();G$()});var $ne,zne,ha,KR=a(()=>{"use strict";Nd();$ne=e=>e.toLowerCase(),zne=(e,t)=>{let r=$ne(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},ha=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:zne(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var V$,K$=a(()=>{"use strict";Od();KR();V$=(e,t)=>{let r=Rs(e,{projectId:t.projectId,includeRetired:!1});return ha({pitfalls:r,text:t.text})}});var Une,Bne,Gne,Vne,q$,Xy,J$,Zy,qR=a(()=>{"use strict";Une="22.13",Bne=e=>typeof e=="object"&&e!==null&&typeof e.DatabaseSync=="function",Gne=e=>{let t={ok:!1,reason:`Node ${e.nodeVersion} has no node:sqlite (needs Node ${Une}+)`};if(e.getBuiltinModule===null)return t;try{let r=e.getBuiltinModule("node:sqlite");return Bne(r)?{ok:!0,sqlite:r}:t}catch{return t}},Vne=()=>typeof process.getBuiltinModule=="function"?e=>process.getBuiltinModule(e):null,q$=new Map,Xy=()=>{let e=q$.get("process");if(e!==void 0)return e;let t=Gne({getBuiltinModule:Vne(),nodeVersion:process.version});return q$.set("process",t),t},J$=()=>{let e=Xy();if(!e.ok)throw new Error(`Pitfall cache unavailable: ${e.reason}`);return e.sqlite},Zy=()=>{let e=Xy();return e.ok?null:`[agent-witch] Pitfall cache (check_context) is off: ${e.reason}. Everything else runs.`}});var Y$,Dd=a(()=>{"use strict";lf();Y$=3e3});var X$,Z$=a(()=>{"use strict";Dd();X$=`
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
`});var Q$,ez,Kne,qne,tz,rz,oz=a(()=>{"use strict";Q$=m(require("node:fs")),ez=m(require("node:path"));qR();Dd();Z$();Kne=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},qne=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},tz=e=>{Q$.default.mkdirSync(ez.default.dirname(e),{recursive:!0});let{DatabaseSync:t}=J$(),r=new t(e);return r.exec(`PRAGMA busy_timeout = ${Y$}`),r.exec(X$),Kne(r)<Tc&&qne(r,Tc),r},rz=e=>{e.close()}});var nz,sz,JR=a(()=>{"use strict";zR();nz=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(fo(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},sz=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(fo(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var iz,az=a(()=>{"use strict";GR();JR();iz=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:Jy(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=nz(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var YR,Qy,XR=a(()=>{"use strict";YR=m(require("node:path"));ze();Qy=(e,t)=>e.profileEmail!==null?YR.default.join(e.installDir,lt,e.profileEmail,t):YR.default.join(e.installDir,t)});var Sa,ZR=a(()=>{"use strict";Dd();XR();Sa=e=>Qy(e,U_)});var cz,lz=a(()=>{cz=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var Yne,Xne,eh,QR=a(()=>{"use strict";lz();Yne=cz,Xne=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),eh=()=>Yne.map(Xne)});var dz,uz=a(()=>{"use strict";QR();Wd();dz=e=>eh().reduce((r,o)=>fa(e,null,o.id)!==null?r:(Gy(e,o),r+1),0)});var pz,mz,gz=a(()=>{"use strict";Dd();pz=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>nf?{kind:"field_too_long",field:"symptom",max:nf}:e.cause.length>sf?{kind:"field_too_long",field:"cause",max:sf}:e.avoidance.length>af?{kind:"field_too_long",field:"avoidance",max:af}:null,mz=e=>e.activeCountAfter>Hi?{kind:"active_cap",max:Hi}:null});var fz,yz=a(()=>{"use strict";Wd();JR();Od();qy();gz();fz=(e,t)=>{let r=pz(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=fa(e,t.projectId,o),s=sz(e,t.projectId,o),i=t.source??"project",l={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=Rs(e,{projectId:t.projectId,includeRetired:!0}).filter(f=>f.id!==l.id),u=M$([...d,l]),g=mz({activeCountAfter:u});return g!==null?{ok:!1,error:g}:(Gy(e,l),{ok:!0,pitfall:l})}});var Es,eT=a(()=>{"use strict";GR();Od();K$();oz();az();ZR();uz();yz();Es=e=>{let t=e.dbPath??(e.layout!==void 0?Sa(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=tz(t);return dz(r),{dbPath:t,listPitfalls:o=>j$(r,o),getPitfall:o=>Jy(r,o),upsertPitfall:o=>fz(r,o),recordHit:o=>iz(r,o),matchPitfalls:o=>V$(r,o),close:()=>rz(r)}}});var Zne,Qne,th,tT=a(()=>{"use strict";Nd();BR();Zne=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},Qne=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},th=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=Zne(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};Qne(e,e.registry,n,s);let i=Vy(s);return{status:"hit",projectId:n,pitfalls:i,tip:jd(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var rh,hz=a(()=>{"use strict";Nd();rh={name:ya.name,description:ya.description,inputSchema:ya.inputSchema}});var yo,Sz,Pz,ho,ese,Pa,Az,Hd=a(()=>{"use strict";yo=m(require("node:fs")),Sz=m(require("node:os")),Pz=m(require("node:path")),ho=()=>({readUtf8:e=>yo.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{yo.default.writeFileSync(e,t,"utf8")},exists:e=>yo.default.existsSync(e),mkdirp:e=>{yo.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{yo.default.renameSync(e,t)},realpath:e=>yo.default.realpathSync.native(e)}),ese=()=>({homedir:()=>Sz.default.homedir()}),Pa=()=>({...ho(),...ese()}),Az=e=>({...ho(),homedir:()=>e,realpath:r=>{let o=Pz.default.resolve(r);return yo.default.existsSync(o)?yo.default.realpathSync.native(o):o}})});var oh,bz=a(()=>{"use strict";oh=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var rT,_z=a(()=>{"use strict";XR();tr();rT=e=>Qy(e,BN)});var kz,qe,So=a(()=>{"use strict";kz=m(require("node:path")),qe=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(kz.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var nh,tse,Fd,wz,sh,ih,Aa,ah=a(()=>{"use strict";Hd();bz();_z();So();nh=()=>({byRealpath:{}}),tse=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return nh();let r=t.byRealpath;return typeof r!="object"||r===null?nh():{byRealpath:r}}catch{return nh()}},Fd=(e,t=ho())=>{let r=rT(e);return t.exists(r)?tse(t.readUtf8(r)):nh()},wz=(e,t,r)=>{qe({fs:r,filePath:rT(e),contents:`${JSON.stringify(t,null,2)}
`})},sh=e=>{let t=e.fs??ho(),r=oh(e.cwd,t),o={declinedAt:e.nowIso??new Date().toISOString(),cwd:e.cwd},n=Fd(e.layout,t);return wz(e.layout,{byRealpath:{...n.byRealpath,[r]:o}},t),o},ih=e=>{let t=e.fs??ho(),r=oh(e.cwd,t),o=Fd(e.layout,t);if(o.byRealpath[r]===void 0)return!1;let n=Object.fromEntries(Object.entries(o.byRealpath).filter(([s])=>s!==r));return wz(e.layout,{byRealpath:n},t),!0},Aa=e=>{let t=e.fs??ho(),r=oh(e.cwd,t);return Fd(e.layout,t).byRealpath[r]!==void 0}});var mn,lh,oT=a(()=>{"use strict";mn=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},lh=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...mn(t,"cwd")!==void 0?{cwd:mn(t,"cwd")}:{},...mn(t,"message")!==void 0?{message:mn(t,"message")}:{},...mn(t,"sessionId")!==void 0?{sessionId:mn(t,"sessionId")}:{},...mn(t,"projectId")!==void 0?{projectId:mn(t,"projectId")}:{}}}});var gn,ch=a(()=>{"use strict";vt();tT();eT();ah();oT();gn=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>Aa({layout:e.layout,cwd:o}));return o=>{let n=lh(o),s=null;try{return s=Es({layout:e.layout}),th({registry:s,resolveProjectId:_R,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var Rz,Tz=a(()=>{"use strict";Rz=["AgentWitch \xB7 check_context: this folder is not an AgentWitch project yet.","Ask the user once whether to add it in AgentWitch Local (Projects) so saved pitfalls show up here.","If they decline or ignore it, do not ask again this session."].join(`
`)});var rse,nT,ose,nse,sse,dh,sT=a(()=>{"use strict";Tz();rse="UserPromptSubmit",nT=(e,t)=>{let r=e[t];return typeof r=="string"&&r.trim().length>0?r:void 0},ose=e=>{let t;try{t=JSON.parse(e)}catch{return null}if(typeof t!="object"||t===null||Array.isArray(t))return null;let r=t,o=nT(r,"cwd"),n=nT(r,"prompt"),s=nT(r,"session_id");return{...o!==void 0?{cwd:o}:{},...n!==void 0?{message:n}:{},...s!==void 0?{sessionId:s}:{}}},nse=e=>{if(e.status==="hit"){let t=e.tip?.trim()??"";return t.length>0?t:null}return e.status==="none"&&e.promptCreate===!0?Rz:null},sse=e=>`${JSON.stringify({hookSpecificOutput:{hookEventName:rse,additionalContext:e}})}
`,dh=async e=>{try{let t=ose(await e.readStdin());if(t===null)return e.writeStderr(`[agent-witch] mcp-hook: stdin is not a JSON object
`),0;let r=nse(await e.runCheckContext(t));r!==null&&e.writeStdout(sse(r))}catch(t){let r=t instanceof Error?t.message:String(t);try{e.writeStderr(`[agent-witch] mcp-hook: ${r}
`)}catch{}}return 0}});var ise,ase,Ez,Cz=a(()=>{"use strict";ch();sT();ise=1500,ase=(e,t)=>new Promise(r=>{let o=[],n=!1,s=()=>{n||(n=!0,clearTimeout(i),e.removeAllListeners("data"),e.removeAllListeners("end"),e.removeAllListeners("error"),e.pause(),r(Buffer.concat(o).toString("utf8")))},i=setTimeout(s,t);e.on("data",l=>{o.push(Buffer.isBuffer(l)?l:Buffer.from(l,"utf8"))}),e.on("end",s),e.on("error",s)}),Ez=async e=>{let t=r=>{process.stderr.write(r)};return dh({readStdin:()=>ase(process.stdin,ise),writeStdout:r=>{process.stdout.write(r)},writeStderr:t,runCheckContext:gn({layout:e.layout,logError:r=>{let o=r instanceof Error?r.message:String(r);t(`[agent-witch] mcp-hook check_context: ${o}
`)}})})}});var lse,uh,Lz=a(()=>{"use strict";ch();oT();lse="/api/local/check-context",uh=async e=>{if(e.pathname!==lse)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=gn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(lh(t))),!0}});var vz,ph,cse,dse,Iz,xz=a(()=>{"use strict";vz=m(require("node:path"));tr();So();ph=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cse={hooks:[{type:"command",command:z_,timeout:3,[Qn]:!0}]},dse=e=>Array.isArray(e)&&e.some(t=>ph(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>ph(r)&&(r.command===z_||r[Qn]===!0))),Iz=e=>{let t=vz.default.join(e.io.homedir(),UN),r={};if(e.io.exists(t))try{let l=JSON.parse(e.io.readUtf8(t));ph(l)&&(r={...l})}catch{r={}}let o=ph(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(dse(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(cse),o.UserPromptSubmit=s;let{backupPath:i}=qe({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var ba,mh=a(()=>{"use strict";tr();ba=e=>{let t=e.begin??Mi,r=e.end??ji,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let u=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:u,changed:u!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,l=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${l}`;return{next:c,changed:c!==e.existing}}});var Wz,use,Oz,Mz=a(()=>{"use strict";Wz=m(require("node:path"));mh();tr();So();use=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),Oz=e=>{let t=Wz.default.join(e.io.homedir(),zN),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=ba({existing:r,blockBody:use,begin:Mi,end:ji});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=qe({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var jz,Nz,Dz=a(()=>{"use strict";jz=m(require("node:path"));mh();tr();So();Nz=e=>{let t=jz.default.join(e.io.homedir(),$N),r=rf.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${wc}]`,`command = "${Rc}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=ba({existing:n,blockBody:o,begin:Mi,end:ji});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:l}=qe({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:l}}});var Hz,iT,Fz,$z=a(()=>{"use strict";Hz=m(require("node:path"));tr();So();iT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Fz=e=>{let t=Hz.default.join(e.io.homedir(),FN),r={command:Rc,args:[...rf]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));iT(d)&&(o={...d})}catch{o={}}let n=iT(o.mcpServers)?{...o.mcpServers}:{},s=n[wc];if(iT(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[wc]=r;let l={...o,mcpServers:n},{backupPath:c}=qe({fs:e.io,filePath:t,contents:`${JSON.stringify(l,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var _a,aT=a(()=>{"use strict";Hd();xz();Mz();Dz();$z();_a=e=>{let t=e?.io??Pa();return{ok:!0,cursorMcp:Fz({io:t}),codexConfig:Nz({io:t}),codexAgents:Oz({io:t}),claudeHook:Iz({io:t})}}});var zz,Uz=a(()=>{"use strict";tr();zz=e=>{let t=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with this folder's cwd.",`projectId: ${e}`,"If status is miss or none (already declined), stay silent.","If status is hit, follow the tip. Do not dump large context."].join(`
`);return["---","description: AgentWitch check_context (token-saver)","alwaysApply: true","---","",Ni,t,kc,""].join(`
`)}});var Bz,pse,Gz,Vz=a(()=>{"use strict";Bz=m(require("node:path"));Uz();tr();mh();So();pse=e=>e.slice(e.indexOf(Ni)+Ni.length,e.indexOf(kc)).trim(),Gz=e=>{let t=Bz.default.join(e.projectRoot,tf),r=zz(e.projectId);if(!e.fs.exists(t))return qe({fs:e.fs,filePath:t,contents:r}),{ok:!0,path:t,wrote:!0};let{next:o,changed:n}=ba({existing:e.fs.readUtf8(t),blockBody:pse(r),begin:Ni,end:kc});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=qe({fs:e.fs,filePath:t,contents:o,backup:!0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var cT,lT,Kz,qz=a(()=>{"use strict";cT=m(require("node:path"));So();lT="# agent-witch-token-saver (local; never commit)",Kz=e=>{let t=cT.default.join(e.repoRoot,".git");if(!e.fs.exists(t))return{ok:!1,reason:"not a git working tree"};let r=cT.default.join(t,"info","exclude"),o=e.fs.exists(r)?e.fs.readUtf8(r):"",n=o.length>0?o.split(/\r?\n/):[],s=new Set(n.map(c=>c.trim())),i=e.relativePaths.filter(c=>!s.has(c));if(i.length===0&&s.has(lT))return{ok:!0,path:r,wrote:!1};let l=[...n];for(;l.length>0&&l[l.length-1]==="";)l.pop();s.has(lT)||l.push("",lT);for(let c of i)l.push(c);return l.push(""),qe({fs:e.fs,filePath:r,contents:l.join(`
`)}),{ok:!0,path:r,wrote:i.length>0}}});var gh,dT=a(()=>{"use strict";tr();Vz();qz();gh=e=>{let t=Gz({fs:e.fs,projectRoot:e.projectRoot,projectId:e.projectId}),r=Kz({fs:e.fs,repoRoot:e.projectRoot,relativePaths:[tf]});return{ok:!0,cursorRule:t,gitExclude:r}}});var uT,pT,fh,mT,gT=a(()=>{"use strict";uT=["pitfalls","preflight","localMcp","history","ollama","skillGen"],pT=["on","off","degraded","unavailable"],fh={pitfalls:"on",preflight:"on",localMcp:"on",history:"off",ollama:"off",skillGen:"off"},mT=()=>({...fh})});var mse,gse,fT,Jz=a(()=>{"use strict";gT();mse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gse=e=>pT.find(t=>t===e)??null,fT=e=>{if(!mse(e))return null;let t={...fh};for(let r of uT){let o=gse(e[r]);o!==null&&(t[r]=o)}return t}});var Yz=a(()=>{"use strict";gT();Jz()});var Xz,fse,yse,Zz,Qz=a(()=>{"use strict";Xz=m(require("node:path"));vt();Yz();So();fse="token-saver.json",yse=(e,t)=>{if(!e.exists(t))return null;try{return fT(JSON.parse(e.readUtf8(t)))}catch{return null}},Zz=e=>{let t=Xz.default.join(e.projectRoot,gc,fse),r=e.flags??{...mT(),...yse(e.fs,t)},o=`${JSON.stringify(r,null,2)}
`;return e.fs.exists(t)&&e.fs.readUtf8(t)===o?{ok:!0,path:t,wrote:!1}:(qe({fs:e.fs,filePath:t,contents:o}),{ok:!0,path:t,wrote:!0})}});var Po,$r,yh,yT=a(()=>{"use strict";Po=(e,t)=>{if(t==="remove")return{ok:!0,state:"Connected"};switch(e){case"Unconnected":return t==="connect"?{ok:!0,state:"SigningIn"}:$r(e,t);case"SigningIn":return t==="signInComplete"?{ok:!0,state:"Connected"}:$r(e,t);case"Connected":return t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:$r(e,t);case"GlobalTriggersWritten":return t==="decline"?{ok:!0,state:"Declined"}:t==="accept"?{ok:!0,state:"ProjectResolved"}:t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:$r(e,t);case"Declined":return t==="clearDecline"?{ok:!0,state:"GlobalTriggersWritten"}:$r(e,t);case"ProjectResolved":return t==="applyDefaults"?{ok:!0,state:"DefaultsApplied"}:$r(e,t);case"DefaultsApplied":return t==="writeProjectFragments"?{ok:!0,state:"ProjectFragmentsWritten"}:$r(e,t);case"ProjectFragmentsWritten":return t==="verify"?{ok:!0,state:"Verified"}:$r(e,t);case"Verified":return t==="accept"||t==="writeProjectFragments"?{ok:!0,state:e}:$r(e,t);default:return $r(e,t)}},$r=(e,t)=>({ok:!1,reason:`Illegal transition ${e} + ${t}`,state:e}),yh=e=>e==="Declined"});var hse,Sse,eU,tU=a(()=>{"use strict";Qz();Hd();ah();yT();aT();dT();hse="projectId required on accept",Sse=e=>{let t=e.projectId;if(e.resolveProject!==void 0)try{t=e.resolveProject(e.cwd).projectId}catch(o){return{ok:!1,reason:`project resolve failed: ${o instanceof Error?o.message:String(o)}`}}let r=t?.trim()??"";return r.length>0?{ok:!0,projectId:r}:{ok:!1,reason:hse}},eU=e=>{let t=e.fs??ho(),r=e.io??Pa(),o=e.fromState??"GlobalTriggersWritten";if(!e.accept){let d=Po(o,"decline");return d.ok?(sh({layout:e.layout,cwd:e.cwd,fs:t}),{ok:!0,state:"Declined"}):{ok:!1,state:d.state,reason:d.reason}}let n=yh(o)||Aa({layout:e.layout,cwd:e.cwd,fs:t});n&&(o="Declined");let s=Sse(e);if(!s.ok)return{ok:!1,state:o,reason:s.reason};if(n){let d=Po(o,"clearDecline");if(!d.ok)return{ok:!1,state:d.state,reason:d.reason};ih({layout:e.layout,cwd:e.cwd,fs:t}),o=d.state}_a({io:r}),o=Po(o,"writeGlobalTriggers").ok?"GlobalTriggersWritten":o;let i=Po(o,"accept");if(!i.ok)return{ok:!1,state:i.state,reason:i.reason};o=i.state;let l=Po(o,"applyDefaults");if(!l.ok)return{ok:!1,state:l.state,reason:l.reason};Zz({fs:t,projectRoot:e.cwd}),o=l.state;let c=Po(o,"writeProjectFragments");return c.ok?(gh({fs:t,projectRoot:e.cwd,projectId:s.projectId}),{ok:!0,state:c.state,projectId:s.projectId}):{ok:!1,state:c.state,reason:c.reason}}});var rU={};kt(rU,{AWL_CHECK_CONTEXT_TOOL:()=>rh,checkContext:()=>th,clearProjectDecline:()=>ih,createCheckContextRunner:()=>gn,createNodeCliIo:()=>Pa,createPitfallRegistry:()=>Es,createTempCliIo:()=>Az,declineProjectForCwd:()=>sh,describePitfallCacheAvailability:()=>Zy,isDeclinedCwd:()=>Aa,isDeclinedTerminal:()=>yh,listBundledSeedPitfalls:()=>eh,loadNodeSqlite:()=>Xy,matchPitfallsByKeywords:()=>ha,readDeclinedProjectsStore:()=>Fd,resolveTokenSaverDbPath:()=>Sa,runCheckContextHook:()=>dh,runCheckContextHookCli:()=>Ez,runSetupProject:()=>eU,shadowPitfalls:()=>Ky,transitionSetupProject:()=>Po,tryHandleTokenSaverLocalRequest:()=>uh,writeGlobalTriggers:()=>_a,writeProjectFragments:()=>gh});var ka=a(()=>{"use strict";eT();qR();ZR();KR();qy();QR();tT();hz();ch();sT();Cz();Lz();aT();dT();tU();ah();yT();Hd()});var hT,oU=a(()=>{"use strict";hT=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var nU,sU,Pse,Ase,bse,hh,ST=a(()=>{"use strict";ka();lf();oU();nU=e=>{try{return e.dbPath!==void 0?Es({dbPath:e.dbPath}):e.layout!==void 0?(Sa(e.layout),Es({layout:e.layout})):null}catch{return null}},sU=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},Pse=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},Ase=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},bse=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=nU(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(Pse(n,r,i.items),{ok:!0,items:sU(n,r,o.includeRetired).map(hT),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:sU(n,r,o.includeRetired).map(hT),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=nU(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:Ase(s.error)}finally{n.close()}}}},hh=bse});var wa,$d,PT=a(()=>{"use strict";wa=m(require("node:path")),$d=(e,t)=>{if(!wa.default.isAbsolute(e)||!wa.default.isAbsolute(t))return!1;let r=wa.default.relative(t,e);return r.length===0?!0:r!==".."&&!r.startsWith(`..${wa.default.sep}`)&&!wa.default.isAbsolute(r)}});var Sh,iU,aU=a(()=>{"use strict";ct();PT();Sh=e=>({ok:!1,code:e}),iU=e=>{let t=e.requestedLexicalPath;if(t===null)return Sh(oe.FOLDER_REQUIRED);if(e.roots===null)return Sh(oe.FOLDER_CHECK_UNAVAILABLE);let r=e.requestedRealPath;if(r===null){let n=e.roots.some(s=>$d(t,s.lexicalPath));return Sh(n?oe.FOLDER_NOT_FOUND:oe.FOLDER_NOT_REGISTERED)}return e.roots.some(n=>n.realPath!==null&&$d(r,n.realPath))?{ok:!0,folderRealPath:r}:Sh(oe.FOLDER_NOT_REGISTERED)}});var _T,lU,AT,bT,_se,kT,cU=a(()=>{"use strict";_T=m(require("node:fs")),lU=m(require("node:path"));co();aU();PT();AT=e=>lU.default.resolve(Me(e)),bT=e=>{try{return _T.default.realpathSync.native(e)}catch{return null}},_se=e=>{let t=e.projectId?.trim()??"";if(t.length>0)return e.registeredFolders===null?null:e.registeredFolders.filter(o=>o.projectId===t).map(o=>o.folderPath);let r=(e.registeredFolders??[]).map(o=>o.folderPath);return[e.defaultFolderPath,...r]},kT=e=>{let t=_se(e)?.map(AT)??null,r=e.requestedFolderPath?.trim()??"",o=r.length>0?AT(r):null;return o!==null&&bT(o)===null&&$d(o,AT(e.managedProjectsDir))&&(t??[]).includes(o)&&_T.default.mkdirSync(o,{recursive:!0}),iU({requestedLexicalPath:o,requestedRealPath:o===null?null:bT(o),roots:t?.map(n=>({lexicalPath:n,realPath:bT(n)}))??null})}});var dU,wT,uU=a(()=>{"use strict";Hr();dU=new Map,wT=async(e,t=_s)=>{let r=V(e);if(r===null)return null;let o=await t(r);if(o===null)return dU.get(r.pairingToken)??null;let n=o.map(s=>({projectId:s.id,folderPath:s.folderPath}));return dU.set(r.pairingToken,n),n}});var vt=a(()=>{"use strict";ma();pa();BF();co();oy();GF();Yo();t$();o$();g$();Ny();hd();f$();w$();R$();T$();E$();L$();v$();I$();x$();hR();fR();Hr();ST();cU();uU()});var Ph,zd,pU,RT,Cs,TT=a(()=>{"use strict";Ph=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=l=>o.find(c=>c.type===l)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},zd=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Ph(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},pU=e=>e>=1&&e<=5,RT=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Ph(t,"UTC")},Cs=e=>{let t=e.from??new Date,r=Ph(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return zd(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=zd(r,e.timeZone,o,0),s=Ph(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?zd(RT(r),e.timeZone,o,0):n;if(!i&&pU(s.weekday))return n;let l=r;for(let c=0;c<8;c+=1)if(l=RT(l),pU(l.weekday))return zd(l,e.timeZone,o,0);return zd(RT(r),e.timeZone,o,0)}});var mU,ET,Ao,CT=a(()=>{"use strict";mU=require("node:crypto");X();vt();TT();xy();ET=!1,Ao=async e=>{if(ET)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=H();if(t===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let r=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let o=Iy(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this computer."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};ET=!0;let n=(0,mU.randomUUID)();try{let s=await na(t,"claude-cli",o.prompt);await mR(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,l=Cs({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return vy(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:l.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{ET=!1}}});var Ah,gU=a(()=>{"use strict";X();CT();xy();Ah=async()=>{let e=H();if(e===null)return;let t=sr(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await Ao(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var Ud=a(()=>{"use strict";xy();gU();CT();TT()});var fU=a(()=>{"use strict";Ud()});var yU=a(()=>{"use strict";aR()});var hU=a(()=>{"use strict";yU()});var LT=a(()=>{"use strict";Ud()});var kse,wse,Bd,vT=a(()=>{"use strict";fU();hU();LT();et();kse=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),wse=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??Cs({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??Cs({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},Bd=e=>{let t=kse(e.profileEmail),r=sr(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=ua(s);return i!==null?[wse(i,o.get(i.id))]:[]});return Ly(t,n),{ok:!0,writtenCount:n.length}}});var IT=a(()=>{"use strict";Ud()});var SU=a(()=>{"use strict";X()});var PU=a(()=>{"use strict";vT();IT();LT();SU()});var AU,Gd,Vd,Kd,bU=a(()=>{"use strict";AU=m(require("node:os"));PU();Rd();Td();Gd=e=>{if(!mo(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!As(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=Bd({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},Vd=async e=>{if(!mo(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:As(t)?Ao(r):{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."}},Kd=()=>{let e=H(),t=e!==null?sr(e.layout):{version:1,automations:[]};return{ok:!0,hostname:AU.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var xT=a(()=>{"use strict";bU()});var bh=a(()=>{"use strict";de()});var _h=a(()=>{"use strict";de()});var kh,kU,wU,_U,Rse,Tse,Ra,WT=a(()=>{"use strict";kh=m(require("node:fs")),kU=m(require("node:os")),wU=m(require("node:path"));bh();_h();dd();et();_U=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},Rse=e=>wU.default.join(kU.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Tse=async e=>kh.default.existsSync(Rse(e))?(await Qe(e)).ok:!1,Ra=async(e=L())=>{let t=kh.default.existsSync(qf(e)),r=!kh.default.existsSync(Lr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=cd(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await _U(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${Ae(e)}-wake`;await Tse(i)&&s.push(i);for(let c of ge(e))(await Qe(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let l=await _U(o);return{ok:l||s.length>0,wakePortFileExists:!0,wakeReachable:l,hollowInstall:!1,kickstartedLabels:s}}});var RU=a(()=>{"use strict";de()});var OT=a(()=>{"use strict";as();de()});var MT=a(()=>{"use strict";as()});var jT=a(()=>{"use strict";de()});var EU,TU,qd,NT=a(()=>{"use strict";EU=m(require("node:fs"));Rt();bh();_h();et();TU=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},qd=async(e=L())=>{if(!EU.default.existsSync(Lr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await TU())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ge(e))(await Qe(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await TU();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var CU=a(()=>{"use strict";de()});var LU,Ls,DT,Ese,Cse,Lse,vU,vse,IU,Ta,wh=a(()=>{"use strict";LU=require("node:crypto"),Ls=m(require("node:fs")),DT=m(require("node:path"));et();Ese="watchdog-log.ndjson",Cse=200,Lse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vU=(e=L())=>{let t=N(),r=t.installDir===e?t.logsDir:Un({installDir:e,profileEmail:t.profileEmail});return DT.default.join(r,Ese)},vse=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Lse(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},IU=(e,t=L())=>{let r={id:(0,LU.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=vU(t);Ls.default.mkdirSync(DT.default.dirname(o),{recursive:!0});let n=Ls.default.existsSync(o)?Ls.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-Cse+1)),JSON.stringify(r)];return Ls.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Ta=(e=20,t=L())=>{let r=vU(t);if(!Ls.default.existsSync(r))return[];let o=Ls.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=vse(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var HT,FT,$T,zT=a(()=>{"use strict";ze();HT=$l.watchdogReinstallState,FT=900*1e3,$T=3e3});var xU=a(()=>{"use strict";zT()});var WU={};kt(WU,{verifyAgentWitchReviveAfterKickstart:()=>xse});var Ise,xse,OU=a(()=>{"use strict";xU();MT();jT();et();Ise=e=>new Promise(t=>{setTimeout(t,e)}),xse=async e=>{if(await Ise(e.verifyDelayMs??$T),!await Vn(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=We(r);return!Ge(o,e.staleAfterMs)}});var Jd,UT,Wse,MU,jU,BT,GT,VT=a(()=>{"use strict";Jd=m(require("node:fs")),UT=m(require("node:path"));K();zT();Wse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MU=e=>UT.default.join(e,HT),jU=(e=L())=>{let t=MU(e);if(!Jd.default.existsSync(t))return null;try{let r=JSON.parse(Jd.default.readFileSync(t,"utf8"));return!Wse(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},BT=(e=L(),t=Date.now())=>{let r=jU(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=FT:!0},GT=(e=L(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=MU(e);return Jd.default.mkdirSync(UT.default.dirname(o),{recursive:!0}),Jd.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var KT,NU=a(()=>{"use strict";de();VT();KT=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!BT())return{attempted:!1,ok:!1,targets:e};GT();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Qe(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var DU=a(()=>{"use strict";VT();NU()});var qT=a(()=>{"use strict";xr()});var HU=a(()=>{"use strict";xr()});var FU,Ea,$U,zU,UU,Ose,Mse,BU,jse,Nse,GU,VU=a(()=>{"use strict";FU=require("node:child_process"),Ea=m(require("node:fs")),$U=m(require("node:os")),zU=m(require("node:path")),UU=require("node:util");qT();HU();et();Ose=(0,UU.promisify)(FU.execFile),Mse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),BU=e=>{let t=Ze(e),r=t===null?N():N(t);if(!Ea.default.existsSync(r.configPath))return null;try{let o=JSON.parse(Ea.default.readFileSync(r.configPath,"utf8"));return!Mse(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},jse=e=>BU(e)?.wsUrl??null,Nse=e=>{let t=jse(e);return t!==null?Be(t):Ue(e)?.appOrigin??null},GU=async e=>{let t=e?.installDir??L(),r=BU(t),o=r!==null?Be(r.wsUrl):Nse(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=zU.default.join($U.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{Ea.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let l=e?.profileEmail??Ze(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...l===null?{}:{AGENT_WITCH_PROFILE:l}};return await Ose("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(l){return{ok:!1,errorMessage:l instanceof Error?l.message:"AgentWitch reinstall script failed."}}finally{Ea.default.existsSync(i)&&Ea.default.unlinkSync(i)}}});var KU={};kt(KU,{attemptAgentWitchWatchdogReinstall:()=>Dse});var Dse,qU=a(()=>{"use strict";DU();VU();Dse=async e=>KT(e,()=>GU())});var JU,YU,XU,Hse,Fse,$se,Yd,JT=a(()=>{"use strict";RU();OT();MT();jT();NT();WT();bh();_h();et();Gi();CU();wh();JU=e=>e===null?N():N(e),YU=async(e,t,r)=>{if(!await Vn(e))return"not_running";let n=JU(t);if(rr(n))return"healthy";let s=We(n);return Ge(s,r)?"stale_connection":"healthy"},XU=async e=>{let t=e?.staleAfterMs??12e4,r=L(),o=ge(r);return Promise.all(o.map(async n=>{let s=await YU(n.launchAgentLabel,n.profileEmail,t),i=JU(n.profileEmail),l=We(i),c=await Vn(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:l,isConnectionStale:Ge(l,t),needsRevive:s!=="healthy",reason:s}}))},Hse=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled AgentWitch from install script and retried kickstart.":t.reinstallErrorMessage??"AgentWitch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All AgentWitch WebSocket connections are healthy."},Fse=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",$se=async e=>{let t=await Qe(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(OU(),WU)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},Yd=async e=>{if(!Qt())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=L();await Ra(r),await qd(r);let o=ge(r),n=[];for(let u of o){let g=await YU(u.launchAgentLabel,u.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:g});continue}n.push(await $se({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let u=Bn();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,l,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(qU(),KU)),g=await u(n);s=g.attempted,i=g.ok,l=g.errorMessage,c=[...g.targets]}catch(u){s=!0,i=!1,l=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...l!==void 0?{reinstallErrorMessage:l}:{}}:{}};return e?.skipLog!==!0&&IU({event:Fse(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Hse(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:l}),targets:c}),d}});var ZU,Rh,QU=a(()=>{"use strict";ZU=m(require("node:os"));OT();wh();JT();Rh=async()=>{let e=await XU(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:ZU.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:Ta(1)[0]??null}}});var YT=a(()=>{"use strict";WT();JT();QU();wh()});var Xd,Zd,Qd,e1=a(()=>{"use strict";de();YT();Xd=async()=>{await Ra();let e=ge(),t=[];for(let r of e){let o=await Qe(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=Bn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},Zd=Yd,Qd=Yd});var XT=a(()=>{"use strict";e1()});var Eh,Th,t1,ZT,r1,zse,Use,Bse,Gse,Vse,Ch,o1=a(()=>{"use strict";Eh=require("node:child_process"),Th=m(require("node:fs")),t1=m(require("node:os")),ZT=m(require("node:path")),r1=require("node:util");de();K();Gn();zse=(0,r1.promisify)(Eh.execFile),Use=()=>ZT.default.join(t1.default.homedir(),"Library","LaunchAgents"),Bse=async e=>{if(!Nt())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await zse("launchctl",["bootout",r]).catch(()=>{})},Gse=e=>{let t=ZT.default.join(Use(),`${e}.plist`);Th.default.existsSync(t)&&Th.default.unlinkSync(t)},Vse=e=>{(0,Eh.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Ch=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=L();if(!Th.default.existsSync(e))return{ok:!1,message:"No local AgentWitch install directory was found.",removedLaunchAgentLabels:[]};let t=oo(e);for(let r of t)await Bse(r),Gse(r);return Vse(e),{ok:!0,message:"Local AgentWitch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var n1,Lh,s1,Ca,i1,Kse,qse,Jse,QT,Yse,eE,a1=a(()=>{"use strict";n1=require("node:child_process"),Lh=m(require("node:fs")),s1=m(require("node:os")),Ca=m(require("node:path")),i1=require("node:util");de();Gn();Kse=(0,i1.promisify)(n1.execFile),qse=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],Jse=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],QT=e=>{Lh.default.existsSync(e)&&Lh.default.rmSync(e,{force:!0})},Yse=async e=>{if(!Nt())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Kse("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},eE=async e=>{let r=(e.listLaunchAgentLabels??oo)(e.layout.installDir),o=e.launchAgentsDir??Ca.default.join(s1.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??Yse;for(let i of r)await n(i),QT(Ca.default.join(o,`${i}.plist`));let s=Ca.default.dirname(e.layout.configPath);for(let i of qse)QT(Ca.default.join(s,i));for(let i of Jse)QT(Ca.default.join(e.layout.installDir,i));return Lh.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var tE,l1=a(()=>{"use strict";tE="unknown_identity"});var rE=a(()=>{"use strict";jR();l1()});var Xse,oE,c1=a(()=>{"use strict";rE();Xse=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),oE=e=>e.type!=="system.error"||!Xse(e.payload)?!1:e.payload.errorCode===tE});var nE=a(()=>{"use strict";o1();a1();c1()});var vh=a(()=>{"use strict";de();xr();nE();YT()});var La,Ih,xh=a(()=>{"use strict";vh();La=(e=20)=>Ta(e),Ih=Rh});var Wh,va,Oh,Mh=a(()=>{"use strict";vh();Wh=ss,va=(e=20)=>rs(e),Oh=e=>ns(e)});var jh,sE=a(()=>{"use strict";vh();jh=()=>Ch()});var d1=a(()=>{"use strict";Sw();iR();xT();XT();xh();Mh();sE()});var u1={};kt(u1,{buildAgentWitchAutomationStatusFromWakeServer:()=>Kd,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>Wh,buildAgentWitchWakeHealthResponse:()=>pd,buildAgentWitchWakeIdentityResponse:()=>md,buildAgentWitchWatchdogStatus:()=>Ih,installHarnessFromWakeServer:()=>Ed,readAgentWitchSelfUpdateLogEntries:()=>va,readAgentWitchWatchdogLogEntries:()=>La,restartAgentWitchFromWakeServer:()=>Qd,reviveAgentWitchWebSocketFromWakeServer:()=>Zd,runAgentWitchSelfUpdateFromWakeServer:()=>Oh,runAgentWitchUninstallLocalFromWakeServer:()=>jh,runAutomationFromWakeServer:()=>Vd,syncAutomationsFromWakeServer:()=>Gd,wakeAgentWitchLaunchAgents:()=>Xd});var p1=a(()=>{"use strict";d1()});var m1,g1,iE,aE,f1=a(()=>{"use strict";m1=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),g1=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?m1(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?m1(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},iE=e=>{let t=e.watchdogLogs.map(g1).join(""),r=e.updateLogs.map(g1).join("");return`<!doctype html>
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
</html>`},aE=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var y1,h1,S1=a(()=>{"use strict";y1=m(require("node:net")),h1=()=>new Promise((e,t)=>{let r=y1.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var P1,Zse,Qse,lE,A1=a(()=>{"use strict";P1=m(require("node:net"));de();S1();ud();dd();et();Zse=e=>new Promise(t=>{let r=P1.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Qse=e=>new Promise(t=>{setTimeout(t,e)}),lE=async(e={})=>{let t=L(),r=nr(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await Zse(r))return fH(r),r;i<o&&await Qse(n)}let s=await h1();Jf(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{mc({launchAgentPrefix:Ae(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var eie,cE,b1=a(()=>{"use strict";eie=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cE=e=>({force:eie(e)&&e.force===!0})});var eu=a(()=>{"use strict";Rd();f1();A1();b1();C_();Qg();Yn()});var dE,G,uE,pE,tu,_1=a(()=>{"use strict";dE=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},G=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},uE=e=>{e.writeHead(403),e.end()},pE=e=>e.url?.split("?")[0]??"/",tu=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var lr=a(()=>{"use strict";_1()});var tie,k1,w1=a(()=>{"use strict";xT();lr();tie=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return G(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},k1=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return G(e.response,200,Kd(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await tie(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=Gd(t);return G(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await Vd(t);return G(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var rie,T1,R1,E1,mE,C1,gE=a(()=>{"use strict";rie=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],T1=e=>/embed|minilm|^bge-/i.test(e),R1=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),E1=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),mE=e=>e.filter(t=>t.trim().length>0&&!T1(t)),C1=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!T1(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>R1(s,o));if(n!==void 0)return n}for(let n of rie){let s=r.find(i=>R1(i,n));if(s!==void 0)return s}return r[0]??null}});var fE,I1,x1,Nh,W1,L1,v1,oie,nie,sie,iie,aie,lie,cr,ru=a(()=>{"use strict";fE=require("node:child_process"),I1=m(require("node:fs")),x1=m(require("node:os")),Nh=m(require("node:path"));xr();or();gE();W1=3e3,L1=["claude-cli","codex","cursor","antigravity"],v1={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},oie=(e,t)=>new Promise(r=>{let o=(0,fE.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},W1);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),nie=()=>{let e=x1.default.homedir();return["ollama",Nh.default.join(e,".local","bin","ollama"),Nh.default.join(e,".agent-witch","ollama","ollama"),Nh.default.join(e,".local-agent-witch","ollama","ollama")]},sie=e=>new Promise(t=>{let r=(0,fE.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},W1);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(E1(Buffer.concat(o).toString("utf8")))})}),iie=async()=>{for(let e of nie()){if(e!=="ollama"&&!I1.default.existsSync(e))continue;let t=await sie(e);if(t!==null)return t}return[]},aie=e=>{let t=e.installedWriterIds.map(s=>v1[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=Ce(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${v1[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},lie=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:Vi},cr=async e=>{let t=L1.map(i=>{let l=If(i,e.commands);return oie(l.command,l.args)}),[r,...o]=await Promise.all([iie(),...t]),n=L1.flatMap((i,l)=>o[l]===!0?[i]:[]),s=C1(r,lie());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:aie({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var cie,die,yE,O1=a(()=>{"use strict";cie="http://127.0.0.1:11434",die=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},yE=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||cie;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?die(await o.json()):null}catch{return null}}});var hE=a(()=>{"use strict";or();ru();O1();gE()});var uie,M1,j1=a(()=>{"use strict";hE();uie={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},M1=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:uie[t]})),ollamaModels:mE(e.ollamaModels)})});var pie,N1,D1=a(()=>{"use strict";hE();lr();j1();pie=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return G(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},N1=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await cr({commands:Le({})});return G(e.response,200,{ok:!0,...M1({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await pie(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await yE({model:r,prompt:o});return n===null?(G(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(G(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var mie,H1,F1=a(()=>{"use strict";iR();lr();mie=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return G(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},H1=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await mie(e);if(t===null)return!0;let r=Ed(t);return G(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var $1=a(()=>{"use strict";vt()});var SE,z1=a(()=>{"use strict";$1();Td();SE=e=>{if(!mo(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:dt({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var U1,PE,AE=a(()=>{"use strict";X();vt();Td();U1=e=>{if(!mo(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},PE=async e=>{let t=U1(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=un("Choose a folder for this AgentWitch project");if(r===null)return{ok:!1,cancelled:!0};let o=H();if(o===null)return{ok:!1,errorMessage:"AgentWitch is not configured on this computer."};let n=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve AgentWitch cloud connection."}:(dt({projectFolderPath:r}),await xd(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to AgentWitch Cloud."})}});var B1=a(()=>{"use strict";z1();AE()});var G1,V1=a(()=>{"use strict";B1();AE();lr();G1=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=SE(t);return G(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await PE(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return G(e.response,o,r,e.cors.headers),!0}return!1}});var K1,q1=a(()=>{"use strict";eu();Mh();xh();K1=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=La(50),r=va(50);return e.response.writeHead(200,aE()),e.response.end(iE({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var J1,Y1=a(()=>{"use strict";Sw();lr();J1=e=>e.request.method==="GET"&&e.pathname==="/health"?(G(e.response,200,pd(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(G(e.response,200,md(),e.cors.headers),!0):!1});var X1,Z1=a(()=>{"use strict";sE();lr();X1=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await jh();return G(e.response,t.ok?200:503,t,e.cors.headers),!0}});var Q1,eB=a(()=>{"use strict";XT();lr();Q1=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await Zd();return G(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Qd();return G(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await Xd();return G(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var tB,rB=a(()=>{"use strict";eu();Mh();lr();tB=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=Wh();return G(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=tu(e.request,"/update/logs",20,200);return G(e.response,200,{ok:!0,logs:va(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=cE(t),o=await Oh({force:r});return G(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var oB,nB=a(()=>{"use strict";xh();lr();oB=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Ih();return G(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=tu(e.request,"/watchdog/logs",20,200);return G(e.response,200,{ok:!0,logs:La(t)},e.cors.headers),!0}return!1}});var sB,iB=a(()=>{"use strict";w1();D1();F1();V1();q1();Y1();Z1();eB();rB();nB();sB=[J1,K1,oB,Q1,tB,X1,H1,G1,k1,N1]});var aB,lB=a(()=>{"use strict";iB();aB=async e=>{for(let t of sB)if(await t(e))return!0;return!1}});var gie,cB,dB=a(()=>{"use strict";Rd();lr();lB();gie=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:pE(e),readJsonBody:()=>dE(e)}),cB=async(e,t,r)=>{let o=e.headers.origin,n=Ty(o);try{if(o!==void 0&&o.length>0&&!n.allowed){uE(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=gie(e,t,r,n);if(await aB(s))return;G(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{G(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var uB,vs,Dh,Hh=a(()=>{"use strict";uB=m(require("node:http"));eu();dB();vs=async()=>{let e=await lE(),t=uB.default.createServer((r,o)=>{cB(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`AgentWitch wake server listening on http://127.0.0.1:${e}
`),t},Dh=vs});var pB={};kt(pB,{runAgentWitchBridgeCli:()=>fie});var fie,mB=a(()=>{"use strict";de();Hh();fie=async()=>{Tt("agent-witch-bridge");let e=await vs(),t=so(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var bE=a(()=>{"use strict";Rt()});var Ia,_E,gB=a(()=>{"use strict";Ia=(e,t,r)=>e===1?t:r,_E=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${Ia(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${Ia(i,"min","mins")} ago`;let l=Math.floor(o/864e5);if(l<7)return`${l} ${Ia(l,"day","days")} ago`;let c=Math.floor(l/7);if(c<5)return`${c} ${Ia(c,"week","weeks")} ago`;let d=Math.floor(l/30);if(d<12)return`${d} ${Ia(d,"month","months")} ago`;let u=Math.floor(l/365);return`${u} ${Ia(u,"year","years")} ago`}});var Is,kE,yie,hie,wE,fn,ou,RE,fB=a(()=>{"use strict";Is=m(require("node:fs")),kE=m(require("node:path")),yie="local-ws-traffic.ndjson",hie=500,wE=e=>kE.default.join(e.logsDir,yie),fn=(e,t)=>{let r=wE(e);Is.default.mkdirSync(kE.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});Is.default.appendFileSync(r,`${o}
`,"utf8")},ou=(e,t=hie)=>{let r=wE(e);if(!Is.default.existsSync(r))return[];let n=Is.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let l=JSON.parse(i);typeof l=="object"&&l!==null&&"at"in l&&"direction"in l&&"type"in l&&"summary"in l&&s.push(l)}catch{}return s.reverse()},RE=e=>{let t=wE(e);Is.default.existsSync(t)&&Is.default.writeFileSync(t,"","utf8")}});var Sie,yB,hB,SB=a(()=>{"use strict";rE();Sie=new Set(Object.values($y)),yB=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hB=e=>{if(!yB(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!Sie.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!yB(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var PB,AB=a(()=>{"use strict";PB=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Pie,Aie,bie,nu,bB=a(()=>{"use strict";AB();Pie=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Aie=e=>Pie.test(e),bie=e=>PB(e),nu=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>nu(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Aie(o)){r[o]=bie(n);continue}r[o]=nu(n)}return r}});var zr,TE,_ie,kie,wie,EE,_B,kB,wB,Rie,Fh,xs,$h,CE,RB=a(()=>{"use strict";zr=m(require("node:fs")),TE=m(require("node:path"));SB();bB();_ie="local-ws-trace.ndjson",kie=1e4,wie=1440*60*1e3,EE=e=>TE.default.join(e.logsDir,_ie),_B=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},kB=e=>{if(!zr.default.existsSync(e))return;let t=zr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-wie,n=t.filter(s=>{let i=_B(s);if(i===null)return!1;let l=Date.parse(i.at);return Number.isFinite(l)&&l>=r}).slice(-kie);zr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},wB=(e,t)=>{let r=EE(e);zr.default.mkdirSync(TE.default.dirname(r),{recursive:!0}),zr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),kB(r)},Rie=e=>e.parsed===null?{_empty:!0}:nu(e.parsed),Fh=(e,t,r)=>{let o=hB(r);wB(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Rie(o)})},xs=(e,t)=>{wB(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:nu({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},$h=(e,t=80)=>{let r=EE(e);if(kB(r),!zr.default.existsSync(r))return[];let o=zr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=_B(s);i!==null&&n.push(i)}return n.reverse()},CE=e=>{let t=EE(e);zr.default.existsSync(t)&&zr.default.writeFileSync(t,"","utf8")}});var yn,TB,Tie,LE,zh,EB=a(()=>{"use strict";yn=m(require("node:fs")),TB=m(require("node:path")),Tie=256e3,LE=e=>{yn.default.mkdirSync(TB.default.dirname(e),{recursive:!0}),yn.default.writeFileSync(e,"","utf8")},zh=(e,t=Tie)=>{if(!yn.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=yn.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),l=yn.default.openSync(e,"r");try{yn.default.readSync(l,i,0,s,n)}finally{yn.default.closeSync(l)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var su=a(()=>{"use strict";fB();RB();EB()});var vE,IE,CB=a(()=>{"use strict";vE=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IE=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${vE(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${vE(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the AgentWitch client stderr log on this computer (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${vE(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var LB=a(()=>{"use strict";CB()});var xE,WE=a(()=>{"use strict";xE=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),l=Math.floor(o%3600/60);return l>0?`${i}h ${l}m`:`${i}h`}});var OE=a(()=>{"use strict";Fc()});var ME,jE,vB=a(()=>{"use strict";OE();ME=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},jE=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var IB=a(()=>{"use strict";WE();vB()});var xB,iu,NE,au=a(()=>{"use strict";WE();xB=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iu=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=xB(e),r=xB(xE(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},NE=`(function () {
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
})();`});var Ws,Eie,DE,WB=a(()=>{"use strict";Ws=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Eie=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},DE=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${Ws(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?Ws(r.direction):Ws(r.kind),i=`trace-body-${o}`,l=Ws(Eie(r.body));return`<tr>
        <td title="${Ws(r.at)}">${Ws(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${Ws(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${l}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var OB,Cie,Uh,Lie,HE,MB=a(()=>{"use strict";Kl();ze();Rt();OB=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},Cie=e=>OB(e)===ro?Ai:Pi,Uh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lie=(e,t)=>`${t?`<h3>${Uh(e.label)}</h3>`:""}
    <p class="muted">${Uh(e.instructions)}</p>
    <pre class="sdlc-pre mono">${Uh(e.command)}</pre>
    <p class="muted">${Uh(e.note)}</p>`,HE=e=>{let t=Vl({platform:Hn(e.platform),installDirName:OB(e.installDir),launchAgentPrefix:Cie(e.installDir)}),r=t.length>1;return`<section class="card">
    <p class="eyebrow">AgentWitch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if AgentWitch Cloud cannot open Status, restart the AgentWitch client on this computer.</p>${r?`
    <p class="muted">Use the command for this computer's operating system.</p>`:""}
    ${t.map(n=>Lie(n,r)).join(`
    `)}
  </section>`}});var FE,jB=a(()=>{"use strict";Kl();FE=e=>Hn(e)==="mac"?"Revive requested. The bridge will reconnect if this Mac can reach launchd.":"Revive requested. The bridge will reconnect when this computer can reach AgentWitch Cloud."});var NB=a(()=>{"use strict";au();WB();MB();jB();au()});var DB,HB,FB,$B,zB,UB,BB,xa=a(()=>{"use strict";DB="projects",HB="knowledge",FB="chunks.ndjson",$B="lessons.ndjson",zB="error-chunks.ndjson",UB="usage-stats.json",BB="knowledge-location.json"});var Bh,vie,Gh,$E=a(()=>{"use strict";Bh=m(require("node:path"));xa();vie=(e,t)=>{let r=t.trim(),o=Bh.default.join(e.installDir,DB,r,HB);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Bh.default.join(o,FB),memoryRunsFilePath:Bh.default.join(o,$B)}},Gh=vie});var zE,Iie,GB,VB=a(()=>{"use strict";zE=m(require("node:fs"));xa();Ss();Iie=e=>{let t=Ft(e.projectFolderPath),r=`${t.metaDirPath}/${BB}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your AgentWitch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};zE.default.mkdirSync(t.metaDirPath,{recursive:!0}),zE.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},GB=Iie});var Wa,qB,KB,xie,JB,YB=a(()=>{"use strict";Wa=m(require("node:fs")),qB=m(require("node:path"));Yo();Ss();$E();VB();KB=(e,t)=>{Wa.default.existsSync(e)&&(Wa.default.existsSync(t)&&Wa.default.statSync(t).size>0||(Wa.default.mkdirSync(qB.default.dirname(t),{recursive:!0}),Wa.default.copyFileSync(e,t)))},xie=e=>{let t=Ft(e.projectFolderPath),r=Gh(e.layout,e.projectId),o=`${t.memoryDirPath}/${Wi}`;KB(t.ragChunksFilePath,r.ragChunksFilePath),KB(o,r.memoryRunsFilePath),GB({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},JB=xie});var XB,Wie,Oa,Vh=a(()=>{"use strict";XB=m(require("node:path"));Yo();Ss();YB();AR();$E();Wie=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Wy(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){JB({layout:e.layout,projectFolderPath:t,projectId:o});let s=Gh(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=Ft(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:XB.default.join(n.memoryDirPath,Wi),projectId:null}},Oa=Wie});var Kh,Mie,qh,UE=a(()=>{"use strict";Kh=m(require("node:fs"));xa();Mie=(e,t=500)=>{if(!Kh.default.existsSync(e))return;let r=Kh.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);Kh.default.writeFileSync(e,`${o.join(`
`)}
`)},qh=Mie});var Jh,jie,Os,BE=a(()=>{"use strict";Jh=m(require("node:path"));xa();Vh();jie=e=>{let t=Oa(e);if(t===null)return null;let r=Jh.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:Jh.default.join(r,UB),errorChunksFilePath:Jh.default.join(r,zB)}},Os=jie});var QB,lu,eG,ZB,GE,tG,Hie,VE,rG,KE,qE,JE,YE=a(()=>{"use strict";QB=require("node:crypto"),lu=m(require("node:fs")),eG=m(require("node:path"));ga();xa();BE();ZB=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),GE=e=>{if(!lu.default.existsSync(e))return ZB();try{let t=JSON.parse(lu.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return ZB()},tG=(e,t)=>{lu.default.mkdirSync(eG.default.dirname(e),{recursive:!0}),lu.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Hie=e=>{let t=ar(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,QB.createHash)("sha256").update(o).digest("hex").slice(0,16)},VE=e=>{let t=Os(e);return t===null?null:GE(t.usageStatsFilePath)},rG=e=>{if(e.chunkIds.length===0)return;let t=Os(e);if(t===null)return;let r=GE(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;tG(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},KE=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=Os(e);if(r===null)return null;let o=Hie(t),n=GE(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return tG(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},qE=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,JE=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var cu,oG,Fie,$ie,nG,zie,XE,du,Ma,ZE,ja,QE,eC=a(()=>{"use strict";cu=m(require("node:fs")),oG=m(require("node:path"));ga();Vh();UE();YE();Fie="http://127.0.0.1:11434",$ie="nomic-embed-text",nG=(e,t,r)=>Oa({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,zie=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let l=e[i]??0,c=t[i]??0;o+=l*c,n+=l*l,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},XE=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},du=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Fie,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||$ie;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},Ma=(e,t,r)=>{let o=nG(e,t,r);if(o===null||!cu.default.existsSync(o))return[];let n=cu.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},ZE=async e=>{let t=ar(e.text),r=XE(t);if(r.length===0)return 0;let o=nG(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;cu.default.mkdirSync(oG.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await du(s);if(i===null)continue;let l={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};cu.default.appendFileSync(o,`${JSON.stringify(l)}
`,"utf8"),n+=1}return qh(o),n},ja=async e=>{let t=await du(e.query);if(t===null)return[];let r=e.minScore??0,s=Ma(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:zie(t,i.embedding)})).filter(i=>i.score>=r).sort((i,l)=>l.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return rG({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},QE=e=>e.length===0?"":`Local knowledge (from this computer):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var uu,sG,Uie,Bie,tC,rC,oC,iG=a(()=>{"use strict";uu=m(require("node:fs")),sG=m(require("node:path"));ga();BE();UE();eC();Uie=e=>{if(!uu.default.existsSync(e))return[];let t=uu.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Bie=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let l=e[i]??0,c=t[i]??0;o+=l*c,n+=l*l,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},tC=async e=>{let t=Os(e);if(t===null)return 0;let r=ar(e.text),o=XE(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;uu.default.mkdirSync(sG.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let l=await du(i);if(l===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:l,createdAt:new Date().toISOString(),source:e.source??"run.failure"};uu.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return qh(n,200),s},rC=async e=>{let t=Os(e);if(t===null)return[];let r=await du(e.query);if(r===null)return[];let o=e.minScore??.3;return Uie(t.errorChunksFilePath).map(s=>({chunk:s,score:Bie(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},oC=e=>e.length===0?"":`Past failures on this computer (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var nC=a(()=>{"use strict";eC();YE();iG()});var je,sC,iC=a(()=>{"use strict";MR();je=OR,sC=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${je.gray50};
  --aw-zinc-100: ${je.gray100};
  --aw-zinc-200: ${je.gray200};
  --aw-zinc-400: ${je.gray400};
  --aw-zinc-500: ${je.gray500};
  --aw-zinc-600: ${je.gray600};
  --aw-zinc-700: ${je.gray700};
  --aw-zinc-800: ${je.gray900};
  --aw-zinc-900: ${je.gray900};
  --aw-brand-600: ${je.brand600};
  --aw-brand-700: ${je.brand700};
  --aw-brand-50: ${je.brand50};
  --aw-emerald-50: ${je.success50};
  --aw-emerald-700: ${je.success700};
  --aw-amber-50: ${je.warning50};
  --aw-amber-900: ${je.warning900};
  --aw-red-50: ${je.error50};
  --aw-red-700: ${je.error700};
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
  border-top-color: #1a44be;
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
`.trim()});var Gie,Vie,aC,aG,lC,lG=a(()=>{"use strict";iC();au();Gie=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Vie=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],aC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aG=(e,t)=>`<a class="${e}" href="/" aria-label="AgentWitch Local home, install bundle ${t}">${Gie}<span class="brand-text">AgentWitch<span class="brand-sub">Local(${t})</span></span></a>`,lC=e=>{let t=Vie.map(l=>{let c=l.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${l.href}"${c?' aria-current="page"':""}>${l.label}</a>`}).join(""),r=aC(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=aC(e.installBundleVersionLabel?.trim()??"unknown"),s=aG("brand brand-in-sidebar",n),i=aG("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${aC(e.title)} \xB7 AgentWitch Local</title>
  <style>${sC}</style>
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
  <script>${NE}</script>
</body>
</html>`}});var Yh,pu,Xh=a(()=>{"use strict";Yh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pu=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${Yh(e.syncMessage)}</p>`:"",o=Yh(e.manageHref),n=Yh(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${Yh(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var cC,dC,uC,cG=a(()=>{"use strict";cC=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,dC=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer AgentWitch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,uC=e=>e==="ok"?'<div class="alert-success">Update finished. This computer may restart the AgentWitch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var dG=a(()=>{"use strict";lG();Xh();cG()});var Na,pC,uG=a(()=>{"use strict";au();Na=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pC=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this computer",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this computer",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${Na(e.wakeError)}</div>`:"",l=iu(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This computer</p>
      <h1>AgentWitch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this computer.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${Na(e.installBundleVersion)}</code></span>
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
        <p class="home-card-meta">${Na(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this computer.</p>
        <p class="home-card-meta">${Na(o)}</p>
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
        <p class="home-card-meta">${Na(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this computer and the cloud bridge.</p>
        <p class="home-card-meta">${Na(n)}</p>
      </a>
    </div>`}});var pG=a(()=>{"use strict";uG()});var I,Da=a(()=>{"use strict";I=e=>e==="passed"||e==="stopped"||e==="failed"});var mG,mC,Ms,gC,Zh=a(()=>{"use strict";mG="Stopped at the round limit. The best prompt is kept.",mC="Stopped because the score stopped rising. The best prompt is kept.",Ms="Finished. The best prompt is the result.",gC="Wizard ended. Progress from finished steps is kept."});var hn,fC=a(()=>{"use strict";hn=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var Kie,qie,mu,gG,Qh=a(()=>{"use strict";Kie=/\n+|;\s+/,qie=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,mu=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(Kie).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,qie(s)]},[]);return[...t,...o]},[]),gG=e=>{let t=mu(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var _e,Ha=a(()=>{"use strict";_e=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var gu,yC=a(()=>{"use strict";Qh();Ha();gu=e=>{let t=[...e.priorRounds,e.current],r=_e(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:gG(o)}}});var hC,Jie,Yie,eS,SC=a(()=>{"use strict";hC={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},Jie=e=>{try{let t=JSON.parse(e.fragment);return{...hC,objects:[...e.objects,t]}}catch{return{...hC,objects:e.objects}}},Yie=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:Jie(r)},eS=e=>[...e].reduce(Yie,hC).objects});var Xie,PC,Zie,fG,AC=a(()=>{"use strict";SC();Xie=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},PC=e=>{let t=eS(e).filter(Xie),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},Zie=(e,t)=>({...e,passed:e.score>=t}),fG=(e,t)=>{let r=PC(e);return r===null?null:Zie(r,t)}});var bC,_C,tS=a(()=>{"use strict";bC="The judge reply needs a score and a reason.",_C="The improver reply was empty."});var yG,hG=a(()=>{"use strict";yG=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var SG,PG=a(()=>{"use strict";SG=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var eae,AG,bG=a(()=>{"use strict";hG();PG();Zh();Qh();eae=e=>{let t=mu(e);return t.length===0?mC:`${mC} Avoid: ${t.join("; ")}.`},AG=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:mG};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(yG(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:eae(SG(r))}}return null}});var Sn,tae,js,_G,rS=a(()=>{"use strict";Sn=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},tae=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,js=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",tae(e.tokens),`Delay: ${Sn(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},_G=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var rae,kG,wG=a(()=>{"use strict";AC();rae=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,kG=e=>{let r=(rae.exec(e)?.[1]??e).trim();return r.length===0||PC(r)!==null?null:r}});var RG,oS,TG=a(()=>{"use strict";rS();wG();tS();RG=e=>({type:"call",role:"judge",choice:e.choice,prompt:_G({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),oS=e=>{let t=kG(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:_C}}:{nextPrompt:t,continuation:RG({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var kC,EG=a(()=>{"use strict";fC();yC();AC();tS();Zh();bG();tS();TG();kC=e=>{let t=fG(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:bC}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(l=>({score:l.score,reasons:l.reasons})),{score:t.score,reasons:t.reasons}],s=AG({scores:n.map(l=>l.score),reasons:n.map(l=>l.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=gu({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:hn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var fu,wC=a(()=>{"use strict";fu=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var CG=a(()=>{"use strict"});var LG=a(()=>{"use strict";CG()});var Ns,vG=a(()=>{"use strict";Ns=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var oae,RC,IG=a(()=>{"use strict";rS();oae=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,RC=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",oae(e.tokens),`Delay: ${Sn(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var nae,sae,iae,TC,xG=a(()=>{"use strict";nae=/[A-Za-z0-9_./~-]{3,180}/g,sae=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,iae=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||sae.test(t)},TC=(e,t=12)=>{let r=[];for(let o of e.matchAll(nae)){let n=o[0].replace(/\.+$/,"");if(!(!iae(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var yu,WG=a(()=>{"use strict";yu=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var nS,EC,OG,hu,CC=a(()=>{"use strict";nS=e=>Math.floor(e/2),EC=e=>Math.max(nS(e)+1,e-20),OG=(e,t)=>e>=t?"passes":e>=EC(t)?"close":e>=nS(t)?"weak":"bad",hu=e=>[{band:"bad",label:`0\u2013${nS(e)-1} bad`},{band:"weak",label:`${nS(e)}\u2013${EC(e)-1} weak`},{band:"close",label:`${EC(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var sS,LC=a(()=>{"use strict";CC();sS=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${OG(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var dr,vC=a(()=>{"use strict";dr=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var MG,jG=a(()=>{"use strict";MG=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var aae,lae,NG,DG=a(()=>{"use strict";Da();LC();vC();jG();aae=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],lae=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",NG=e=>{let t=e.wizard;if(t===void 0)return[];let r=dr(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=aae.map((y,A)=>{let S=!s&&!n&&A===r?"active":"done";return{id:`wizard-${A+1}`,label:y,state:S,detail:null}}).filter((y,A)=>s?!0:A<=o),l=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=sS(e),d=c.filter(y=>y.id==="round-0"),u=MG(t)&&(!n||l)?c.filter(y=>y.id!=="round-0"):[],g=I(e.status)&&!s,f=g?[{id:"end",label:lae(e),state:"done",detail:e.errorMessage}]:[];if(g&&f.length>0){let y=Math.min(r,i.length),A=i.slice(0,y).map(S=>({...S,state:"done"}));return[...d,...A,...f,...u]}return[...d,...i,...u,...f]}});var cae,IC,HG=a(()=>{"use strict";Da();LC();DG();cae=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",IC=e=>{if(e.wizard!==void 0)return NG(e);let t=sS(e),r=I(e.status)?[{id:"end",label:cae(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Su,FG=a(()=>{"use strict";Su=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var $G=a(()=>{"use strict";Rt()});var zG,Pu,Au,$a,iS,xC,UG=a(()=>{"use strict";$G();zG="/prompt-optimizer/agent",Pu=`${jt}${zG}`,Au=`${jt}/prompt-optimizer`,$a="The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",iS=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${$a}`,xC="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var Ur=a(()=>{"use strict"});var fe,bu=a(()=>{"use strict";Ur();fe=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var WC,BG=a(()=>{"use strict";WC="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var GG,VG=a(()=>{"use strict";GG=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var _u,qG=a(()=>{"use strict";VG();Ur();_u=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:GG(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var OC,JG=a(()=>{"use strict";Ur();OC=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var MC,YG=a(()=>{"use strict";Ur();MC=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var XG,ku,ZG=a(()=>{"use strict";XG=["generalize","evaluate","separate","optimize_modules"],ku=(e,t)=>{let r=XG.indexOf(t);if(r===-1)return e;let o=XG.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var aS,jC=a(()=>{"use strict";Qh();aS=e=>{let t=mu(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var wu,QG=a(()=>{"use strict";jC();wu=e=>{let t=aS(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var uae,pae,mae,e2,t2=a(()=>{"use strict";uae=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),pae=/^\{\{[a-zA-Z0-9_-]+\}\}$/,mae=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let l=new RegExp(uae(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(l,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},e2=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>pae.test(n)?n:mae(n,r)).join("")}});var NC,r2=a(()=>{"use strict";t2();NC=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:e2(o.prompt,t)}))}))});var gae,Ru,o2=a(()=>{"use strict";Ur();jC();gae=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Ru=e=>{let t=aS(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=gae(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Tu,n2=a(()=>{"use strict";wC();Tu=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(l=>l.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(l=>l.length>0).join(`
`);return fu({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Eu,HC=a(()=>{"use strict";Ha();Eu=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=_e(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var FC,s2=a(()=>{"use strict";HC();FC=e=>{let t=Eu({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Ds,i2=a(()=>{"use strict";Ds=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var fae,yae,ue,lS=a(()=>{"use strict";bu();fae=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},yae=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,ue=e=>{let t=fe(e),r=e.modules.map((i,l)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:fae(e,l),status:i.status})),o=r.length,n=r.filter((i,l)=>yae(e.modules[l],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var a2,l2=a(()=>{"use strict";bu();lS();a2=e=>{let t=ue(e.wizard),r=fe(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var $C,c2=a(()=>{"use strict";l2();$C=e=>{let t=a2({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var hae,d2,u2=a(()=>{"use strict";hae=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},d2=e=>[...e].reduce(hae,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var Sae,p2,m2=a(()=>{"use strict";Sae=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},p2=e=>[...e].reduce(Sae,{out:"",inString:!1,escaped:!1}).out});var Pae,Aae,g2,f2=a(()=>{"use strict";u2();m2();Pae=e=>e.charCodeAt(0)===65279?e.slice(1):e,Aae=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},g2=e=>p2(d2(Aae(Pae(e))))});var bae,_ae,kae,y2,wae,za,cS=a(()=>{"use strict";SC();f2();bae=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},_ae=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},kae=e=>[...e].reduce(_ae,{out:"",inString:!1,escaped:!1}).out,y2=e=>{let t=eS(e);return t.length===0?null:t[t.length-1]},wae=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},za=e=>{let t=g2(bae(e)),r=y2(t);if(r!==null)return r;let o=kae(t),n=y2(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw wae(i)}}});var Rae,Tae,zC,h2,S2=a(()=>{"use strict";Rae=/^[a-z0-9][a-z0-9-]{0,62}$/,Tae=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return Rae.test(t)?t:""},zC=e=>e.replace(/\s+/gu," ").trim(),h2=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=Tae(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=zC(n.name),l=zC(n.description),c=zC(n.rationale);if(!(i.length===0||l.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:l,rationale:c}),o.length>=3))break}return o}});var P2,A2,b2=a(()=>{"use strict";P2=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},A2=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var UC,_2=a(()=>{"use strict";cS();S2();b2();UC=(e,t)=>{let r=(()=>{try{return za(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(P2(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(A2).filter(l=>l!==null),i=h2({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var BC,k2=a(()=>{"use strict";BC=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var GC,w2=a(()=>{"use strict";GC=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var VC,R2=a(()=>{"use strict";bu();lS();VC=e=>{let t=ue(e.wizard),r=fe(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var Cu,T2=a(()=>{"use strict";Cu=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var ur,Eae,KC,E2=a(()=>{"use strict";ur=m(Ti());cS();Eae=(0,ur.isType)({name:ur.isNonEmptyString,description:ur.isString,sampleValue:ur.isString}),KC=e=>{let t=za(e);if(!(0,ur.isType)({templatedPrompt:ur.isNonEmptyString,variables:(0,ur.isArrayWithEachItem)(Eae)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var ke,Cae,Lae,qC,C2=a(()=>{"use strict";ke=m(Ti());Ur();cS();Cae=(0,ke.isType)({id:ke.isNonEmptyString,title:ke.isNonEmptyString,prompt:ke.isNonEmptyString,order:ke.isNumber}),Lae=(0,ke.isType)({id:ke.isNonEmptyString,title:ke.isNonEmptyString,summary:ke.isString,topology:(0,ke.isOneOf)("chain","parallel"),modules:(0,ke.isArrayWithEachItem)(Cae),recommended:ke.isBoolean}),qC=e=>{let t=za(e);if(!(0,ke.isType)({options:(0,ke.isArrayWithEachItem)(Lae)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Ua,L2=a(()=>{"use strict";Ua=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var vae,JC,YC=a(()=>{"use strict";vae=/\{\{([a-zA-Z0-9_-]+)\}\}/g,JC=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(vae,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var pr,mr,v2=a(()=>{"use strict";Ha();YC();pr=e=>JC(e.templatedPrompt,e.variables),mr=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return _e(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??pr(e.wizard)}});var Iae,Hs,I2=a(()=>{"use strict";Iae=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Hs=(e,t)=>e.replace(Iae,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var xae,Fs,dS=a(()=>{"use strict";xae=/\{\{([a-zA-Z0-9_-]+)\}\}/g,Fs=e=>{let t=new Set,r=[];for(let o of e.matchAll(xae)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Lu,x2=a(()=>{"use strict";dS();Lu=e=>e.variables.length>0||Fs(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var XC,ZC=a(()=>{"use strict";Ur();XC=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var vu,W2=a(()=>{"use strict";Ha();ZC();vu=e=>{let t=e.wizard.evaluateSelectedRound??_e(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:XC(r.judgement,e.passScore)}});var Iu,O2=a(()=>{"use strict";Iu=e=>e.length===1&&e[0].modules.length===1});var QC,M2=a(()=>{"use strict";QC=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Ne,uS,xu=a(()=>{"use strict";Ne=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),uS=(e,t)=>`<p class="muted">The computer runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var j2,N2=a(()=>{"use strict";xu();j2=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Ne("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Ne("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Ne("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var D2,H2=a(()=>{"use strict";Da();xu();D2=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!I(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Ne("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this computer.</p>"),Ne("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Ne("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this computer",uS(e.writerLabel,e.folder)),Ne("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Ne("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var F2,$2=a(()=>{"use strict";xu();F2=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Ne("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Ne("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Ne("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var z2,U2=a(()=>{"use strict";xu();z2=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Ne("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Ne("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",uS(e.writerLabel,e.folder)),...r?[Ne("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var pS,B2=a(()=>{"use strict";Da();N2();H2();$2();U2();pS=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(I(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return D2(r);case"evaluate":return j2({...r,currentRound:e.currentRound});case"separate":return z2(r);case"optimize_modules":return F2({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Wu,bo,G2=a(()=>{"use strict";Wu=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),bo=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var Wae,mS,eL,V2=a(()=>{"use strict";dS();Wae="wizardParam_",mS=e=>`${Wae}${e}`,eL=e=>{let t=Fs(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=mS(n),i=e.posted.get(s),l=i!==null?i.trim():r[n]?.trim()??"";if(l.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=l}return{ok:!0,parameterValues:r}}});var xt,K2=a(()=>{"use strict";xt=["generalize","evaluate","separate","optimize_modules"]});var Ou,$s,Ba,_o=a(()=>{"use strict";Ou="Stopped because the confirmed token or spend budget was exceeded.",$s="Approaching the confirmed budget. Further trials may hard-stop.",Ba="Confirm the Step 4 token and spend budget before optimizing modules."});var ft,Ga=a(()=>{"use strict";ft=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var $t,Mu=a(()=>{"use strict";_o();$t=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var Oae,zt,ju=a(()=>{"use strict";_o();Oae={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},zt=e=>{let t=e?.trim()??"";return t.length===0?.01:Oae[t]??.01}});var gS,tL=a(()=>{"use strict";_o();ju();gS=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=zt(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var rL,Nu,yS,oL=a(()=>{"use strict";_o();Ga();Mu();tL();ju();rL=e=>{let t=gS({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??zt(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:ft({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Nu=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),yS=e=>{let t=e.existing??$t(),r=rL({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Nu(t,r)}});var zs,Va,Y2=a(()=>{"use strict";_o();Ur();Ga();Mu();oL();tL();ju();zs=e=>{let t=gS({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??zt(e.writerId),i=r*4e3,l=n*o*8e3,c=i+l;return{targetTokenBudget:c,estimatedSpendUsd:ft({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},Va=e=>{let t=e.existing??$t();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=zs({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Nu(t,r)}});var Br,X2=a(()=>{"use strict";Ga();_o();Mu();Br=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??$t(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=ft({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var sL,Ka,Z2=a(()=>{"use strict";_o();Ga();sL=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=ft({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,l=s!==null&&s>0&&o>=s;if(i||l)return{kind:"hard_stop",errorMessage:Ou,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:Ou,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:$s,costControls:{...t,softWarnFired:!0,softWarnMessage:$s}}:null},Ka=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var iL,Q2=a(()=>{"use strict";iL=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var v=a(()=>{"use strict";Da();Zh();EG();fC();rS();wC();LG();vG();IG();xG();yC();WG();Ha();HG();vC();CC();FG();UG();Ur();bu();BG();qG();JG();YG();ZG();QG();r2();o2();n2();HC();s2();i2();lS();c2();_2();k2();w2();R2();T2();E2();C2();L2();v2();YC();I2();dS();x2();W2();O2();ZC();M2();B2();G2();V2();K2();_o();Ga();Mu();oL();Y2();ju();X2();Z2();Q2()});var aL=a(()=>{"use strict";qc()});var Mae,rV,oV=a(()=>{"use strict";aL();Mae=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,rV=e=>{let t=us(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Mae)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var sV,jae,Nae,Gr,Dae,Hae,nV,SS,iV,Fae,Ut,aV,lV,cV,fr=a(()=>{"use strict";aL();oV();sV=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),jae=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,Nae=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Gr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(jae.test(e.errorMessage))return"usage_limit";if(Nae.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},Dae="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Hae="The writer waited on terminal input and did not return a prompt.",nV=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,SS=e=>{let t=e.trim();if(t.length===0||t.length>=500||!nV.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>nV.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},iV=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},Fae=e=>SS(e.stdout)??SS(e.stderr)??(iV(e.replyFile)?SS(e.replyFile):null),Ut=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Dae;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Hae:null},aV=e=>{let t=e.trim();return t.length===0?null:Ut(t)!==null?t:SS(t)??(iV(t)?t:null)},lV=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],cV=e=>{let t=e.replyFileText?.trim()??"",r=Ut([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=Fae({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Gr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=rV([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=us(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var $ae,uV,dV,Bs,PS=a(()=>{"use strict";fr();$ae=400,uV=(e,t=$ae)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},dV=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:aV(e.promptText)},Bs=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:dV(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=dV(e.revisions[n]);if(s!==null)return s.trim()}return null}});var M,zae,AS,ye,Gs,mV,pV,gV,fV,De=a(()=>{"use strict";M="manual",zae=["claude-cli","codex","cursor","antigravity"],AS={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ye=e=>e===M?"You":e in AS?AS[e]:e,Gs=e=>zae.filter(t=>e.includes(t)),mV=e=>{let t=Gs(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},pV=(e,t)=>t===M?M:e.find(r=>r===t)??null,gV=(e,t,r)=>{let o=Gs(e),n=pV(o,t),s=pV(o,r);return n===null||s===null?null:{judge:n,improver:s}},fV=(e,t,r)=>{let o=Gs(e);return t===null||t.trim()===""?r!==M?r:o[0]??null:t===M?null:o.find(n=>n===t)??null}});var yV,bS,lL,Vs,cL,Wt,ko,we,pt=a(()=>{"use strict";yV=m(require("node:fs")),bS=m(require("node:os")),lL=m(require("node:path"));co();Vs="~",cL=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Wt=e=>{let t=bS.default.homedir(),r=cL(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},ko=e=>{let t=e.trim().length===0?"~":e.trim(),r=Me(t),o=lL.default.isAbsolute(r)?cL(r):cL(lL.default.resolve(bS.default.homedir(),r));try{if(!yV.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}return{ok:!0,path:o,display:Wt(o)}},we=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:bS.default.homedir()});var yt,Pn=a(()=>{"use strict";yt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var dL,hV,Uae,SV,PV,uL=a(()=>{"use strict";v();De();pt();Pn();dL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hV=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Uae=e=>{let t=hV(e.state),r=`<h2>${dL(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${dL(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${yt}</button></div><template>${r}</template></li>`},SV=e=>{let t=e.wizard;if(t===void 0)return"";let r=pS({status:e.status,wizard:t,writerLabel:ye(e.judgeModel),runnerLabel:ye(e.runnerModel??e.judgeModel),folderDisplay:Wt(we(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this computer">${r.map(Uae).join("")}</ol>`},PV=e=>{let t=e.wizard;if(t===void 0)return"";let r=pS({status:e.status,wizard:t,writerLabel:ye(e.judgeModel),runnerLabel:ye(e.runnerModel??e.judgeModel),folderDisplay:Wt(we(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this computer</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${hV(n.state)}<span class="sdlc-pipeline-label">${dL(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var yr,AV,bV,_V,pL=a(()=>{"use strict";v();yr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AV="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",bV=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${yr(AV)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${yr(i.name)}}}</strong> \u2014 ${yr(i.description)} (sample: ${yr(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${yr(r)}</pre>`,n=pr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${yr(n)}</pre>`;return`${t}${o}${s}`},_V=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${yr(AV)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${yr(n.name)}}}</strong> \u2014 ${yr(n.description)} (sample: ${yr(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${yr(r)}</pre>`;return`${t}${o}`}});var Du,mL=a(()=>{"use strict";Du=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var kV,wV=a(()=>{"use strict";v();kV=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Ns({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=js({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var gL,Hu,fL=a(()=>{"use strict";Pn();wV();gL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Hu=e=>{let t=kV(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${gL(r)}">${yt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${gL(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${gL(t)}</pre></template>`}});var yL,Fu,hL=a(()=>{"use strict";Pn();yL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Fu=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${yL(r)}">${yt}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${yL(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${yL(t)}</pre></template>`}});var _S,qa,SL=a(()=>{"use strict";mL();fL();hL();_S=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qa=e=>{let t=Du(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",l=e.caption===void 0?"":`<p class="muted">${_S(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,u=e.cycle.revisions.map(g=>{let f=g.judgement?.score,y=f==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${f}`,A=g.judgement?.reasons?.trim()??"",S=A.length===0?"":`<br><span class="muted">${_S(A)}</span>`,P=Fu({roundLabel:d(g.roundNumber),promptText:g.promptText}),p=Hu({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run}),b=`${P}${p}`;if(e.interactive){let C=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${C}> <span class="sdlc-wizard-revision-title">${_S(y)}</span></label>${b}${S}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${_S(y)}</span>${b}${S}</li>`}).join("");return`${i}${l}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var PL,RV,TV,EV,AL=a(()=>{"use strict";PL=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),RV=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${PL(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${PL(t.prompt)}</pre></li>`).join("")}</ol>`,TV=e=>RV([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),EV=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${PL(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${RV(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var $u,Bae,kS,bL=a(()=>{"use strict";v();AL();$u=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bae=e=>{let t=e.wizard;return t===void 0?"":mr({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},kS=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Bae(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${$u(n.orchestratorSkill.fileName)}</code> \u2014 ${$u(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${$u(o)}</pre></details>`,l=t.modules.length,c=l===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${l})</h4>`,d=TV(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${$u(r)} <span class="muted">${$u(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ye,Gae,Vae,Kae,qae,wS,Jae,Yae,Xae,Zae,Qae,ele,Ja,RS=a(()=>{"use strict";v();uL();pL();SL();fL();hL();bL();Ye=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gae={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},Vae=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ye(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ye(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ye(o)}</pre></details>`;return`<h2>${Ye(e)}</h2>${n}`},Kae=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=pr(t).trim(),n=mr({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!I(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${Vae("What is being evaluated",i)}`},qae=(e,t)=>{let r=e.wizard;if(r===void 0||I(e.status))return"";let o=Gae[t];return o===void 0||r.phase!==o?"":PV(e)},wS=(e,t,r)=>{let o=qae(e,t),n=t==="wizard-2"?Kae(e):"";return`${o}${n}${r}`},Jae=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let l=i,c=l.roundNumber,d=l.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof l.score=="number"?l.score:null,passed:typeof l.passed=="boolean"?l.passed:null,reasons:typeof l.reasons=="string"?l.reasons:null})}return s.length===0?null:s},Yae=e=>{let t=e.wizard;return t===void 0?"":bV(t)},Xae=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",l=n.reasons?.trim()??"",c=l.length===0?"":`<br><span class="muted">${Ye(l)}</span>`,d=`Round ${n.roundNumber}`,u=Fu({roundLabel:d,promptText:n.promptText}),g=Hu({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ye(s)}${i}</span>${u}${g}${c}</li>`}).join("")}</ul>`,Zae=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return qa({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=Jae(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Xae(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=mr({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ye(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(l=>l.judgement!==null&&l.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,g=Fu({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),f=Hu({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ye(u)}</span>${g}${f}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ye(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},Qae=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ye(n.title)}</strong> <span class="muted">(${Ye(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ye(o.title)}</strong>${n}${Ye(s)}${kS(e,o)}</li>`}).join("")}</ul>`},ele=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,l=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ye(i)}</span> <strong>${Ye(n.title)}</strong>${Ye(l)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ye(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?qa({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ja=(e,t)=>{switch(t){case"wizard-1":return wS(e,t,Yae(e));case"wizard-2":return wS(e,t,Zae(e));case"wizard-3":return wS(e,t,Qae(e));case"wizard-4":return wS(e,t,ele(e));default:return""}}});var tle,rle,CV,LV,vV=a(()=>{"use strict";v();PS();fr();RS();tle=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},rle=e=>{let t=e.goal.trim();return t.length===0?null:t},CV=(e,t,r,o,n)=>{let s=Ut(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},LV=(e,t)=>{let r=rle(e);if(t.id.startsWith("wizard-")){let s=Ja(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Su(e,t);if(s!==null){let l=Bs(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:l,promptNote:null,bodyHtml:null}}let i=_e(e.revisions.map(l=>({roundNumber:l.roundNumber,promptText:l.promptText,score:l.judgement?.score??null,reasons:l.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:CV(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:tle(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:CV(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Ks,IV,xV=a(()=>{"use strict";Ks=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),IV=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Ks(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Ks(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Ks(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Ks(n)}</h2><pre class="mono">${Ks(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Ks(e.goal)}</dd></div></dl>`;return`<h2>${Ks(e.title)}</h2>${i}${t}${r}${o}${s}`}});var ole,WV,zu,_L,TS=a(()=>{"use strict";v();ole=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),WV=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||I(e.status))return null;let r=dr(t);return r<0||r>3?null:`wizard-${r+1}`},zu=(e,t)=>ole.has(t)?WV(e)===t:!1,_L="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var nle,ES,kL=a(()=>{"use strict";nle='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',ES=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${nle}</button>`});var qs,CS=a(()=>{"use strict";v();qs=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:gu({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:yu(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var sle,OV,ile,wL,MV,ale,lle,cle,dle,jV,NV=a(()=>{"use strict";v();CS();sle={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},OV=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},ile=e=>sle[e]??null,wL=(e,t)=>{let r=e.wizard,o=ile(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=dr(r);return o<n||o===n},MV=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},ale=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:pr(t).trim();return o.length===0?null:wu({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:OV(e,"generalize")})},lle=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=qs(e);return n===null?null:hn({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=MV(e)?.promptText.trim()??mr({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Ns({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},cle=e=>{let t=e.wizard;if(t===void 0)return null;let r=mr({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Ru({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:OV(e,"separate")})},dle=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=bo(t),s=Hs(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=qs(e);return c===null?null:hn({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=MV(e),l=i?.run;return l!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||I(e.status)&&i?.judgement!==null)?js({goal:e.goal,lookedAt:l.lookedAt??"the writer reply",evidence:l.evidence??l.output,tokens:l.tokens,delayMs:l.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Tu({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Ds(t,r).output,moduleTitle:o.title})},jV=(e,t)=>{if(!wL(e,t))return null;switch(t){case"wizard-1":return ale(e);case"wizard-2":return lle(e);case"wizard-3":return cle(e);case"wizard-4":return dle(e);default:return null}}});var ule,LS,RL=a(()=>{"use strict";v();ule=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},LS=(e,t)=>{let r=e.wizard,o=ule(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=dr(r);return o<n?"done":o===n&&I(e.status)&&e.status==="failed"?"failed":o<=n&&I(e.status)?"done":"pending"}});var ple,Ya,vS=a(()=>{"use strict";Pn();NV();RL();ple=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ya=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(LS(e,t)==="pending")return""}else if(!wL(e,t))return"";let o=jV(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${yt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${ple(o)}</pre></template>`}});var Js,wo,Xa=a(()=>{"use strict";Js=e=>e.toLocaleString("en-US"),wo=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Vr,mle,DV,IS,HV,FV,xS=a(()=>{"use strict";v();vV();xV();TS();kL();Pn();PS();uL();vS();Xa();Vr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mle=(e,t)=>{let r=Su(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?wo(t,Number(s[1])):0,l=i>0?`<span class="sdlc-node-reason">${Js(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Vr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Vr(r)}</span>`:"",d=IV(LV(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&I(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Vr(e.id)}"`:"",g=zu(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Vr(_L)}"><input type="hidden" name="cycleId" value="${Vr(t.id)}"><input type="hidden" name="wizardStepId" value="${Vr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",f=e.state==="active"&&e.id.startsWith("wizard-")?SV(t):"",y=o?"failed":e.state,A=o?Bs(t):null,S=A!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${yt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Vr(A)}</pre></template>`:"",P=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Ya(t,e.id):"";return`<li class="sdlc-node sdlc-node-${y}" data-sdlc-step-id="${Vr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${Vr(e.label)}${c}${l}</span></button><div class="sdlc-node-row-actions">${g}${P}${S}</div></div>${f}<template>${d}</template></li>`},DV=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>mle(r,t)).join("")}</ol>`,IS=e=>`<div class="sdlc-score" aria-label="What the score means">${hu(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Vr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,HV=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${ES({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,FV=`<script>
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
</script>`});var WS,OS,MS,$V,TL=a(()=>{"use strict";WS="support-reply",OS="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",MS=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),$V=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var jS,EL,CL=a(()=>{"use strict";v();xS();TL();jS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),EL=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${IS(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this computer</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${jS(OS)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${jS(MS)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${jS($V)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${jS(WS)}">Run this sample</a>
      </div>
    </section>`});var LL,NS,gle,zV,UV=a(()=>{"use strict";LL=m(require("node:fs")),NS=m(require("node:path")),gle=e=>NS.default.join(NS.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),zV=(e,t)=>{let r=gle(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;LL.default.mkdirSync(NS.default.dirname(r),{recursive:!0}),LL.default.appendFileSync(r,o,"utf8")}});var Za,BV,fle,GV,yle,VV,Kr,ne,KV,B,Ot=a(()=>{"use strict";Za=m(require("node:fs")),BV=m(require("node:path"));v();UV();fle=e=>e.wizard===void 0?e:{...e,wizard:OC(e.wizard)},GV=new Set,yle=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),VV=(e,t)=>{Za.default.mkdirSync(BV.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Za.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Za.default.renameSync(r,e)},Kr=e=>{if(!Za.default.existsSync(e))return[];try{let t=JSON.parse(Za.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(yle).map(fle):[]}catch{return[]}},ne=(e,t)=>Kr(e).find(r=>r.id===t)??null,KV=(e,t)=>{GV.add(t);let r=Kr(e).filter(o=>o.id!==t);VV(e,r)},B=(e,t)=>{if(GV.has(t.id))return;let r=Kr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];VV(e,o),zV(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var Qa,qr,Uu,qV,DS,hle,JV,YV,XV,vL=a(()=>{"use strict";Qa=m(require("node:fs")),qr=m(require("node:path")),Uu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},qV=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),DS=(e,t)=>{let r=Uu(e);return r.length>0?r:Uu(t)},hle=e=>{let t=DS(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${qV(o)}`,...n.length>0?[`description: ${qV(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},JV=e=>`.cursor/skills/${e}/SKILL.md`,YV=(e,t)=>{let r=Uu(t);if(r.length===0)return!1;let o=qr.default.resolve(e),n=qr.default.resolve(o,".cursor","skills"),s=qr.default.resolve(o,JV(r));return s.startsWith(`${n}${qr.default.sep}`)?Qa.default.existsSync(s):!1},XV=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(DS(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=qr.default.resolve(e.workingDirectory);try{if(!Qa.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=hle({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=JV(r.slug),n=qr.default.resolve(t,".cursor","skills"),s=qr.default.resolve(t,o);if(!s.startsWith(`${n}${qr.default.sep}`))return{ok:!1,errorCode:"path"};if(Qa.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{Qa.default.mkdirSync(qr.default.dirname(s),{recursive:!0}),Qa.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var Sle,ZV,QV,e5=a(()=>{"use strict";v();Ot();pt();fr();vL();Sle=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,ZV=e=>{let t=e.get("savedSkill");return t!==null&&Sle.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this computer.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this computer.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},QV=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=ne(e.storePath,t),o=l=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${l}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!I(r.status))return{kind:"redirect",location:o("skillError=working")};let n=_e(r.revisions.map(l=>({roundNumber:l.roundNumber,promptText:l.promptText,score:l.judgement?.score??null,reasons:l.judgement?.reasons??null})));if(n===null||Ut(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=XV({workingDirectory:we(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let l=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${l}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var HS,FS,Bu=a(()=>{"use strict";v();HS=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=Br({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},FS=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var An,Gu=a(()=>{"use strict";v();Bu();An=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=QC(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=yS({moduleCount:o.length,existing:e.costControls,writerId:n}),i=HS(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Wu(r.variables)},updatedAt:new Date().toISOString()}}});var bn,Vu=a(()=>{"use strict";bn=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var IL=a(()=>{"use strict";or();ru();qc()});var xL,t5,WL,r5,o5=a(()=>{"use strict";xL={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},t5=e=>e.exitCode===null&&e.signalCode===null,WL=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{l(o)},l=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{l("SIGTERM");return}if(!t5(e)){l("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!t5(e)){l(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}l("SIGKILL")},t)}),r5=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),WL(e).then(s=>{r({...xL,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var n5,Ku,s5,OL,Ple,jL,NL,Ale,ble,_le,i5,kle,ML,a5,qu,l5,wle,Rle,ht,Ys=a(()=>{"use strict";n5=require("node:child_process"),Ku=m(require("node:fs")),s5=m(require("node:os")),OL=m(require("node:path"));IL();o5();fr();Ple=["claude-cli","codex","cursor","antigravity"],jL=18e4,NL=6e5,Ale=12e4,ble=9e5,_le="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",i5="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",kle="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",ML=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},a5=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=ML(process.env[i5])??Math.max(r,NL));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:ML(process.env[kle])??ble;return Math.min(o,Math.max(Ale,r))},qu=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?ML(process.env[i5])??NL:jL,l5=e=>`The writer timed out after ${e}ms.`,wle=e=>Ple.includes(e),Rle=e=>e===!0||process.env[_le]==="1",ht=e=>new Promise(t=>{if(e.signal?.aborted){t(xL);return}if(Rle(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!wle(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this computer."});return}let r=e.writerAgent,o=Or(r,e.prompt,Le({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!Ku.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this computer."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:jL,s=OL.default.join(Ku.default.mkdtempSync(OL.default.join(s5.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=lV({writerAgent:r,baseArgs:o.args,replyPath:s}),l=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,n5.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),g=f=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(f))};r5(u,e.signal,g,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",WL(u).then(f=>{g({ok:!1,errorMessage:l5(n),errorKind:"writer_timeout",killSignal:f})})},n),u.stdout.on("data",f=>{l.push(Buffer.from(f))}),u.stderr.on("data",f=>{c.push(Buffer.from(f))}),u.on("error",()=>g({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let f=Ku.default.existsSync(s)?Ku.default.readFileSync(s,"utf8"):null,y=cV({writerAgent:r,stdout:Buffer.concat(l).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:f});if(y.ok&&d.stopReason!=="abort"){g(y);return}d.stopReason===null&&g(y)})})});var Tle,Ju,DL=a(()=>{"use strict";v();Xa();Tle=e=>{if(e.wizard!==void 0){let t=Cu(e.wizard),r=wo(e);return(t??0)+r}return wo(e)},Ju=e=>{let t=sL({costControls:e.costControls,spentTokens:Tle(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var c5,Ele,Yu,$S,zS=a(()=>{"use strict";v();De();DL();c5=e=>e===M?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},Ele=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),Yu=(e,t,r=null)=>{let o=e.revisions.find(l=>l.roundNumber===e.currentRound),n=kC({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:c5(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?iL({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:yu(e.revisions.map(l=>({roundNumber:l.roundNumber,promptText:l.promptText,score:l.judgement?.score??null,reasons:l.judgement?.reasons??null})),e.currentRound)}),s=Ele(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?Ju({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):Ju({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},$S=(e,t,r=null)=>{let o=oS({raw:t,judge:c5(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var US,HL=a(()=>{"use strict";US=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var p5,BS,GS,d5,u5,FL,Cle,m5,$L,Lle,g5,vle,Ile,f5,y5=a(()=>{"use strict";p5=require("node:child_process"),BS=m(require("node:fs")),GS=m(require("node:path"));zy();v();d5=4e3,u5=12e3,FL=(e,t)=>{let r=(0,p5.spawnSync)("git",[...t],{cwd:e,env:dn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Cle=e=>FL(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",m5=e=>{let t=FL(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},$L=(e,t)=>{let r=GS.default.resolve(e,t),o=GS.default.relative(e,r);if(o.startsWith("..")||GS.default.isAbsolute(o)||!BS.default.existsSync(r)||!BS.default.statSync(r).isFile())return null;let n=BS.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>d5?`${n.slice(0,d5)}
\u2026truncated`:n},Lle=e=>e.length>u5?`${e.slice(0,u5)}
\u2026truncated`:e,g5=e=>{let t=TC(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,$L(e.workingDirectory,n)])),o=Cle(e.workingDirectory);return{git:o,status:o?m5(e.workingDirectory):{},files:r,paths:t}},vle=(e,t)=>{let r=FL(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=$L(e,t);return o===null?`${t} is missing.`:o},Ile=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",f5=e=>{let t=e.before.git?m5(e.workingDirectory):{},r=Object.keys(t).filter(l=>t[l]!==e.before.status[l]),o=e.before.paths.map(l=>{let c=e.before.files[l]??null,d=$L(e.workingDirectory,l);return c===d?`${l} did not change.`:`${l} changed.
${d??`${l} is missing.`}`}),n=r.map(l=>vle(e.workingDirectory,l)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(l=>t[l]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(l=>l.length>0);return{lookedAt:Ile(e.before.git,e.before.paths.length>0),evidence:Lle(i.join(`

`))}}});var BL,Z,GL,Xe,h5,xle,Wle,S5,el,P5,tl,Ole,Mle,Xu,zL,UL,jle,A5,Nle,Dle,Hle,b5,Fle,_5,k5,$le,zle,w5,R5=a(()=>{"use strict";BL=require("node:child_process"),Z=m(require("node:fs")),GL=m(require("node:os")),Xe=m(require("node:path"));zy();h5=8e6,xle=16e6,Wle=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],S5=(e,t)=>{let r=(0,BL.spawnSync)("git",[...t],{cwd:e,env:dn(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},el=(e,t)=>(0,BL.spawnSync)("git",[...t],{cwd:e,env:dn(),timeout:8e3}).status===0,P5=e=>{let t=S5(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},tl=(e,t)=>{let r=Xe.default.resolve(e,t),o=Xe.default.relative(e,r);return o.startsWith("..")||Xe.default.isAbsolute(o)?null:r},Ole=(e,t)=>{let r=tl(e,t);if(r===null||!Z.default.existsSync(r))return null;let o=Z.default.statSync(r);return!o.isFile()||o.size>h5?null:Z.default.readFileSync(r)},Mle=(e,t,r)=>{let o=tl(e,t);o!==null&&(Z.default.mkdirSync(Xe.default.dirname(o),{recursive:!0}),Z.default.writeFileSync(o,r))},Xu=(e,t)=>{let r=tl(e,t);r===null||!Z.default.existsSync(r)||Z.default.rmSync(r,{recursive:!0,force:!0})},zL=(e,t)=>el(e,["cat-file","-e",`HEAD:${t}`]),UL=e=>{let t=S5(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},jle=e=>Xe.default.resolve(e)!==Xe.default.resolve(GL.default.homedir()),A5=e=>{if(!Z.default.existsSync(e))return 0;let t=Z.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?Z.default.readdirSync(e).reduce((r,o)=>r+A5(Xe.default.join(e,o)),0):0},Nle=(e,t,r)=>{let o=tl(e,r);if(o===null||!Z.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(A5(o)>xle)return{relativePath:r,existed:!0,copyDir:null};let n=Xe.default.join(t,"cache",r);return Z.default.mkdirSync(Xe.default.dirname(n),{recursive:!0}),Z.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},Dle=400,Hle=32e6,b5=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!Z.default.existsSync(s)))for(let i of Z.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let l=Xe.default.join(s,i),c=Z.default.statSync(l);if(c.isDirectory()){n(l);continue}if(!(!c.isFile()||c.size>h5)){if(t.length>=Dle||r+c.size>Hle){o=!1;return}r+=c.size,t.push(Xe.default.relative(e,l))}}};return n(e),{paths:t,complete:o}},Fle=(e,t,r)=>{let o=tl(e,r);if(o===null||!Z.default.existsSync(o))return null;let n=Ole(e,r);if(n===null)return"skip";let s=Xe.default.join(t,"files",r);return Z.default.mkdirSync(Xe.default.dirname(s),{recursive:!0}),Z.default.writeFileSync(s,n),s},_5=e=>{let t=Z.default.mkdtempSync(Xe.default.join(GL.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?P5(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:b5(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,Fle(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?UL(e.workingDirectory):null,isolateCaches:jle(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Wle.map(i=>Nle(e.workingDirectory,t,i))}},k5=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){Xu(e.workingDirectory,t);return}Mle(e.workingDirectory,t,Z.default.readFileSync(r))}},$le=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?k5(e,t):zL(e.workingDirectory,t)?el(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):Xu(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&zL(e.workingDirectory,t)&&el(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!zL(e.workingDirectory,t)&&el(e.workingDirectory,["reset","-q","HEAD","--",t])},zle=(e,t)=>{let r=tl(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){Xu(e.workingDirectory,t.relativePath),Z.default.mkdirSync(Xe.default.dirname(r),{recursive:!0}),Z.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){Xu(e.workingDirectory,t.relativePath);return}if(Z.default.existsSync(r))for(let o of Z.default.readdirSync(r)){let n=Xe.default.join(r,o);Z.default.statSync(n).mtimeMs>=e.startedMs-1e3&&Z.default.rmSync(n,{recursive:!0,force:!0})}}}},w5=e=>{try{if(e.git){if(UL(e.workingDirectory)!==e.head&&(!(e.head===null?el(e.workingDirectory,["update-ref","-d","HEAD"]):el(e.workingDirectory,["reset","--hard",e.head]))||UL(e.workingDirectory)!==e.head))throw new Error("head");let r=P5(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))$le(e,o)}else{if(e.complete)for(let t of b5(e.workingDirectory).paths)e.files[t]===void 0&&Xu(e.workingDirectory,t);for(let t of Object.keys(e.files))k5(e,t)}for(let t of e.caches)zle(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{Z.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var VS,KS,Ule,Ble,Gle,Vle,Kle,T5,qle,E5,C5=a(()=>{"use strict";v();zS();HL();y5();R5();De();pt();fr();Ys();VS=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),KS=e=>({...e,status:"stopped",errorMessage:Ms,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),Ule=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Ble=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==M?t:e.improverModel!==M?e.improverModel:null}return e.judgeModel!==M?e.judgeModel:e.improverModel!==M?e.improverModel:null},Gle=async e=>{let t=we(e.cycle),r=g5({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=_5({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Tu({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ds(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):fu({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",l=a5({promptText:e.revision.promptText,isModuleRun:i}),c=qu({isModuleRun:i,timeoutMs:l}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await ht({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),g=u.ok?f5({workingDirectory:t,before:r,writerReply:u.text}):null,f=w5(o),y={...e.cycle,revisions:e.cycle.revisions.map(A=>A.roundNumber===e.cycle.currentRound?d:A)};return u.ok?!f.ok||g===null?{ok:!1,cycle:VS(y,f.ok?"Could not put the folder back after the run.":f.errorMessage)}:{ok:!0,cycle:y,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:g.lookedAt,evidence:g.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:KS(y)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:VS(y,u.errorMessage,Gr(u))})},Vle=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:Gle({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),Kle=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),T5=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await ht({writerAgent:e.reviewer,workingDirectory:we(e.cycle),prompt:RC({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:KS(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},qle=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===M)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await ht({writerAgent:t.judgeModel,workingDirectory:we(t),prompt:Ns({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...Yu(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?KS(o):(e.onWriterFailure?.(t.judgeModel),VS(o,n.errorMessage,Gr(n)))},E5=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return qle(e);let o=Ble(t),n=await Vle({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?Ule(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===M){let u=await T5({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...Kle(s,u.text),judgePhase:void 0}}let i=await ht({writerAgent:t.judgeModel,workingDirectory:we(t),prompt:js({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?KS(s):(e.onWriterFailure?.(t.judgeModel),VS(s,i.errorMessage,Gr(i)));let l=await T5({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(l.kind==="stopped")return l.cycle;let c=i.tokens===null&&l.tokens===null?null:(i.tokens??0)+(l.tokens??0),d=Yu(s,i.text,c);return US(d,l.text)}});var qS,Jle,Yle,VL,L5=a(()=>{"use strict";v();zS();C5();CS();fr();De();DL();pt();Ys();qS=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Jle=e=>({...e,status:"stopped",errorMessage:Ms,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),Yle=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?Jle(e):(n?.(r),qS(e,t.errorMessage,Gr(t))),VL=async(e,t,r,o)=>{let n=Ju(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return qS(e,"This round has no prompt.");if(e.status==="judging")return E5({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return qS(e,"This cycle is waiting on a step this computer cannot run.");if(e.improverModel===M)return e;let i=qs(e);if(i===null)return qS(e,"The improver needs the score and the reason.");let l=await ht({writerAgent:e.improverModel,workingDirectory:we(e),prompt:hn({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:qu()}),c=Yle(e,l,e.improverModel,r,t);return c!==null?c:$S(e,l.ok?l.text:"",l.ok?l.tokens:null)}});var Zu,KL,Xle,I5,v5,Zle,Qle,JS,x5,W5,ece,tce,Xs,O5,M5,Qu=a(()=>{"use strict";v();Gu();Vu();De();pt();fr();Ys();L5();mL();Zu=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),KL=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Zu(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},Xle=e=>{let t=Gr(e);return sV(e)||t==="usage_limit"||t==="action_required"},I5=(e,t,r)=>Xle(r)?Zu(e,r.errorMessage,Gr(r)):KL(e,t,r.errorMessage),v5=e=>{let t=e.wizard;return t===void 0||Du(e).length===0?e:{...e,wizard:Ua({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},Zle=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",Qle=e=>{let t=e.wizard;if(t===void 0)return e;let r=Eu({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Ua({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},JS=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),x5=e=>e.judgeModel!==M?e.judgeModel:e.improverModel!==M?e.improverModel:null,W5=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},ece=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=x5(e);if(n===null)return Zu(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??pr(o),i=wu({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:W5(e,"generalize")}),l=await ht({writerAgent:n,prompt:i,workingDirectory:we(e),signal:t});if(!l.ok)return r?.(n),I5(e,"generalize",l);try{let c=KC(l.text),d=Ua({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Wu(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Lu(d)?Xs({...u,wizard:{...d,gate:null}}):JS(u,"generalize")}catch(c){return KL(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",l.text)}},tce=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=x5(e);if(n===null)return Zu(e,"Choose a writer to suggest splits.");let s=mr({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Ru({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:W5(e,"separate")}),l=await ht({writerAgent:n,prompt:i,workingDirectory:we(e),signal:t});if(!l.ok)return r?.(n),I5(e,"separate",l);try{let c=qC(l.text),d=NC(c,o.variables),u=Ua({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:u};return Iu(d)?An(g,d[0]):JS(g,"separate")}catch(c){return KL(e,"separate",c instanceof Error?c.message:"Could not read split options.",l.text)}},Xs=e=>{let t=e.wizard;if(t===void 0)return e;let r=pr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},O5=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Zu(e,"This module is missing.");let n=bo(r),s=Hs(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==M?e.runnerModel:e.judgeModel!==M?e.judgeModel:e.improverModel,l=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:fe(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:l}},M5=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return VL(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return ece(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return tce(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await VL(e,t,r,o);if(I(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&Du(s).length===0)return s;let l=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=_e(s.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??0,reasons:f.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;l={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&vu({revisions:l.revisions,wizard:l.wizard,passScore:l.passScore})){let u=v5(JS(l,i));return bn(u)}let c=JS(l,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=FC({wizard:{...c.wizard,modules:c.wizard.modules.map((g,f)=>f===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:Zle(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?v5(d):Qle(d)}return s}return n.phase==="complete",e}});var rl,YS=a(()=>{"use strict";v();De();rl=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:BC(r,e.judgeModel===M),updatedAt:new Date().toISOString()}}});var ol,XS=a(()=>{"use strict";ol=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Bt,j5,rce,N5=a(()=>{"use strict";v();pt();XS();fr();vL();Bt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),j5=e=>{if(!I(e.status))return"";let t=_e(e.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??null,reasons:f.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=Ut(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Bt(t.reasons.trim())}</p>`,i=e.status==="passed",l=ol(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Bt(l??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Bt(l??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${Bt(n)}</div>`:i?rce({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:we(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Bt(l??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Bt(t.promptText)}</pre></details>`,g=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${g}</h2>${d}${o}${s}${u}</section>`},rce=e=>{let t=e.sourceSkill?.fileName??Uu(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=DS(t,r),s=n.length>0&&YV(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Bt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Bt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Bt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Bt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Bt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Bt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var D5,H5=a(()=>{"use strict";D5=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var F5,oce,ZS,St,QS,qL=a(()=>{"use strict";v();De();H5();PS();fr();XS();F5=["Generalize","Evaluate","Separate","Optimize modules"],oce=e=>{let t=dr(e),r=t>=0&&t<F5.length?F5[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},ZS=(e,t)=>{let r=Bs(e),o=r===null?null:D5(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},St=(e,t)=>({title:e,detail:t,replyPreview:null}),QS=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=Bs(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:uV(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!I(e.status)){let t=e.judgeModel;return St(`${ye(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this computer.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!I(e.status)){let t=e.judgeModel;return St(`${ye(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this computer.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===M?St(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?St(`${ye(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):St(`${ye(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===M){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==M?St(`${ye(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):St(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this computer can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return St(`${ye(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=fe(t);return St(`${ye(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return St(`${ye(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=fe(t);return St(`${ye(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return St(`${ye(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===M){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return St("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return St(`${ye(e.improverModel)} is rewriting the prompt.`,"That writer is working on this computer. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>Ut(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=ue(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||I(e.status)),l=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=l?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?ZS(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=ol(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?ZS(e,{title:`${oce(r)}${s}`,detail:t.length>0?t:n}):ZS(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(I(e.status)){let t=e.errorMessage?.trim()??"";return ZS(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this computer.",detail:"This panel keeps updating.",replyPreview:null}}});var Jr,ep=a(()=>{"use strict";De();Jr=e=>{if(e.status==="improving"&&e.improverModel===M)return!0;if(e.status!=="judging"||e.judgeModel!==M)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===M}});var $5,z5=a(()=>{"use strict";$5=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var _n,nce,U5,B5=a(()=>{"use strict";v();_n=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nce=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${_n(r)}</p>`},U5=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${_n(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${_n(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),l=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${l.length===0?"":`<p class="muted">Looked at ${_n(l)}.</p>`}<pre class="mono">${_n(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${Sn(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${_n(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",g=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${_n(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${nce(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${_n(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var tp,sce,G5,V5=a(()=>{"use strict";v();fr();tp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sce=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=Ut(t.promptText),n=t.judgement?.reasons?`<p class="muted">${tp(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",l=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${tp(i)}.</p>`}<pre class="mono">${tp(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${Sn(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${tp(d)}</pre>`:`<div class="alert-error">${tp(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${l}${u}</article>`},G5=e=>e.revisions.map(t=>sce(e,t)).join("")});var K5,q5=a(()=>{"use strict";v();K5=e=>{if(I(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Yr,ice,JL,ace,lce,cce,dce,J5,Y5,YL=a(()=>{"use strict";q5();Yr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ice="Stop this run? Writers will stop and the best prompt is kept.",JL="End the wizard? Writers will stop and progress from finished steps is kept.",ace="Skip this module and pause at the step gate?",lce=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Yr(ice)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Yr(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,cce=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Yr(JL)}"><input type="hidden" name="cycleId" value="${Yr(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,dce=e=>{let t=Yr(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Yr(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Yr(ace)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Yr(JL)}">End wizard</button>
    </form>
  </div>`},J5=e=>{let t=K5(e);return t==="none"?"":t==="legacy_stop"?lce(e.id):t==="wizard_end_only"?cce(e.id):dce(e)},Y5=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Yr(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Yr(JL)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var X5,Z5=a(()=>{"use strict";v();Xa();X5=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let l=i.judgement?.score??null;return l===null?s:s===null?l:Math.max(s,l)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=ue(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,l)=>l.bestScore===null?i:i===null||i.bestScore===null||l.bestScore<i.bestScore?l:i,null),s=o.rows.reduce((i,l)=>i+(l.tokens??0),0);return n===null||n.bestScore===null?`${Js(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Js(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${fe(r)}`}return""}});var uce,pce,Q5,mce,eK,tK=a(()=>{"use strict";v();Z5();RL();RS();vS();uce=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',pce=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',Q5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mce=(e,t,r)=>{let o=Ja(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=X5(e,t),i=LS(e,t),l=uce(i),c=pce(i),d=Ya(e,t,{forOutcomeSummary:!0}),u=`${l}<span class="sdlc-wizard-outcome-step-title">${Q5(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${Q5(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",f=i==="failed"&&t!=="wizard-4"?" open":"",y=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${y}"${g}${f}><summary aria-controls="${y}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${y}-body">${o}</div></details>`},eK=e=>{let t=e.wizard;if(t===void 0||!I(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>mce(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var rK,oK,nK=a(()=>{"use strict";rK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oK=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${rK(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${rK(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var XL,sK,ZL=a(()=>{"use strict";XL=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,sK=(e,t)=>{if(XL(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var iK,aK=a(()=>{"use strict";iK=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var eP,lK,cK=a(()=>{"use strict";v();ZL();ZL();aK();eP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lK=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=ue(t),o=fe(t),n=r.terminalStatusSuggestion==="passed"?"":iK(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,y=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",A=u===void 0?c.status:sK(u,o),S=u!==void 0&&XL(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':A==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':A==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':eP(A);return`<tr${y}><td>${eP(c.title)}</td><td>${eP(g)}</td><td>${c.tokens??"\u2014"}</td><td>${S}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${eP(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Zs,tP,QL=a(()=>{"use strict";Zs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),tP=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Zs(r.fileName)}</code> \u2014 ${Zs(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Zs(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Zs(i.name)}</strong> <code>.cursor/skills/${Zs(i.fileName)}/SKILL.md</code></p><p class="muted">${Zs(i.description)}</p><p>${Zs(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var gce,dK,uK=a(()=>{"use strict";v();nK();cK();QL();gce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dK=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!I(e.status)||t.modules.length===0)return"";let r=lK(e),o=oK(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=ue(t),i=s.passedModuleCount<s.totalModules?" open":"",l=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${gce(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${tP(e)}${l}${r}${o}</section>`}});var Q,rP=a(()=>{"use strict";v();Q={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var oP,ev=a(()=>{"use strict";oP=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var pK,mK=a(()=>{"use strict";rP();ev();pK=e=>{let t=oP({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:Q.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var Ro,rp=a(()=>{"use strict";Ro=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var To,nP,tv=a(()=>{"use strict";v();xS();N5();qL();ep();z5();CS();B5();V5();YL();tK();uK();Xa();mK();pt();rp();To=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),nP=e=>{let t=!I(e.status)&&e.status!=="wizard_paused"&&!Jr(e),r=QS(e),o=DV(IC($5(e)),e),n=I(e.status)?"":J5(e),s=eK(e),i=dK(e),l=j5(e),c=e.errorMessage===null?"":`<div class="alert-error">${To(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?ue(e.wizard):null,f=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,y=!t&&e.wizard!==void 0&&I(e.status)&&(e.wizard.phase==="complete"||ue(e.wizard).passedModuleCount>0),A=y?f?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",S=y&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${To(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",P=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${To(r.replyPreview)}</pre>`,p=r.detail.length===0&&S.length===0&&P.length===0||r.detail.length===0&&P.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${To(r.detail)}${u}</p>`}${P}</div>`,b=e.revisions.find(wr=>wr.roundNumber===e.currentRound),C=e.status==="improving"?qs(e):null,h=wo(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),w=Jr(e)?U5({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:C?.promptText??b?.promptText??"",score:C?.score??b?.judgement?.score??null,reasons:C?.reasons??b?.judgement?.reasons??null,avoid:C?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:b?.run??null,minJudgeScore:_?1:0}):"",R=e.wizard!==void 0&&e.wizard.phase==="complete"&&I(e.status),E=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",x=e.wizard!==void 0&&!R&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?fe(e.wizard):e.passScore,W=E?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${IS(x)}</div>`:"",z=e.status==="failed"?pK({status:e.status,errorKind:e.errorKind}):null,O=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':I(e.status)?z!==null?`<span class="${z.badgeClass}">${z.badgeLabel}</span>`:R&&g!==null&&!f?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",U=t?d:y?f?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',pe=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${To(Wt(we(e)))}</li>`:"",h>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Js(h)} so far</li>`:""].filter(wr=>wr.length>0),j=pe.length===0?"":`<ul class="sdlc-run-meta">${pe.join("")}</ul>`,q=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,br=R?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,_r=R?"":W.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${br}</div>`:`<div class="sdlc-run-grid">${br}${W}</div>`,Go=G5(e),kr=e.wizard!==void 0&&I(e.status)&&e.revisions.every(wr=>wr.roundNumber===0&&(wr.judgement===void 0||wr.judgement===null)),cb=Go.length===0||kr?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${Go}</div></section>`,Hl=`<p class="sdlc-run-goal" title="${To(e.goal.trim())}">${To(Ro(e.goal))}</p>`,Rm=R?`${c}${i}${s}${w}${l}`:`${c}${_r}${w}${s}${l}`,Tm='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',db=R?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${To(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Tm}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${O}</div>${Hl}<div class="sdlc-run-activity${A}"${y?' role="status"':""}><div class="sdlc-run-activity-icon">${U}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${To(r.title)}</h2>${p}${S}${db}</div></div>${j}${q}</header>${Rm}</section>${cb}`}});var gK,fK=a(()=>{"use strict";v();Vu();gK=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!vu({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:bn(e)}});var yK,hK=a(()=>{"use strict";v();Qu();yK=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Lu(t)?e:Xs({...e,wizard:{...t,gate:null}})}});var SK,PK=a(()=>{"use strict";v();Gu();SK=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Iu(t.splitOptions))return e;let r=t.splitOptions[0];return An(e,r)}});var fce,Qs,sP=a(()=>{"use strict";fK();hK();PK();Ot();fce=e=>{let t=yK(e),r=gK(t);return SK(r)},Qs=(e,t)=>{let r=fce(t);return r!==t?(B(e,r),r):t}});var AK,Eo,op=a(()=>{"use strict";v();AK=e=>xt.indexOf(e),Eo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||I(e.status)?xt.length:t.gate!==null?AK(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?AK(t.phase):null}});var bK,_K=a(()=>{"use strict";bK=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var ei,kK,wK=a(()=>{"use strict";v();_K();ei=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kK=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Ds(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${ei(bK(o))}</pre></div>`:"",s=Fs(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=bo(t),l=s.map(c=>{let d=t.variables.find(A=>A.name===c),u=mS(c),g=i[c]??"",f=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${ei(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${ei(u)}">${ei(f)}</label>
        ${y}
        <input class="input" type="text" id="${ei(u)}" name="${ei(u)}" value="${ei(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${l}</div>`}});var RK,TK=a(()=>{"use strict";RK={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var np,yce,Re,kn=a(()=>{"use strict";TK();Pn();np=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yce=e=>{let t=RK[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${np(t.title)}" aria-describedby="${r}" aria-expanded="false">${yt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${np(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${np(t.example)}</span></span></button>`},Re=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${np(r)}"`}>${np(e)}</span>${yce(t)}</span>`});var Gt,EK,CK,LK=a(()=>{"use strict";v();Bu();rP();kn();Gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),EK=e=>{let t=e.costControls;if(t===void 0||Ka(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??ft({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,l=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${Gt(Q.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${Gt(t.softWarnMessage??$s)}</p>`:"",d=FS({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${Gt(Q.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,g=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${Gt(Q.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${Gt(Q.confirmLede)}</p>
  ${g}
  ${l}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${Gt(Ba)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${Gt(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${Gt(Q.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${Gt(Q.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${Gt(Q.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${Re(Q.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${Re(Q.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${Gt(Q.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${Gt(Q.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},CK=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!Ka(r)}});var hce,vK,IK=a(()=>{"use strict";Pn();hce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vK=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${yt}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${hce(t)}</pre></template>`}});var sp,xK,WK=a(()=>{"use strict";v();pL();wK();SL();YL();QL();bL();LK();IK();sp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xK=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(CK(e))return EK(e);let n=fe(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?_V(r):"",l=o==="evaluate"?tP(e):"",c=o==="evaluate"?qa({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let W=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',z=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",O=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${sp(x.id)}" required${O}> <strong>${sp(x.title)}</strong>${W}${z}</label>${kS(e,x)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],y=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",A=g?.title??"Module",S=g?.prompt??"",P=g?.status==="pending",p=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${sp(A)}</p>${P?kK({cycle:e,modulePrompt:S}):""}<p class="muted">Test run prompt preview: ${sp(Hs(S,bo(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${qa({cycle:e,interactive:!1,caption:P?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${A}\u201D (runner + judge).`})}`:"",b=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":P?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",C=Cu(r),h=C===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${C}</p>`,_=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?vK(r.lastWriterParseFailureReply??""):"",w=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",R=t?.active===!0?" sdlc-wizard-gate-active":"",E=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${w}"`:"";return`<section class="card sdlc-wizard-gate${R}"${E}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${b}</p>
    ${_}
    ${h}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${sp(e.id)}">
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
    ${Y5(e)}
  </section>`}});var Sce,OK,MK=a(()=>{"use strict";v();vS();Sce=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),OK=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||I(e.status))return"";let r=(o,n)=>{let s=Ya(e,o);return`<h2 class="sdlc-wizard-active-head">${Sce(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var rv,jK,NK,wn,DK,nl=a(()=>{"use strict";v();Ot();rv=new Map,jK=e=>{let t=new AbortController;return rv.set(e,t),t.signal},NK=e=>{rv.delete(e)},wn=e=>{rv.get(e)?.abort()},DK=(e,t)=>{let r=ne(e,t);return r===null||r.wizard!==void 0?!1:(I(r.status)||(B(e,{...r,status:"stopped",errorMessage:Ms,updatedAt:new Date().toISOString()}),wn(t)),!0)}});var HK,FK,ov,$K,nv=a(()=>{"use strict";v();op();nl();HK="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",FK=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return xt[r]??null},ov=(e,t)=>{let r=FK(t);if(r===null||e.wizard===void 0)return!1;let o=xt.indexOf(r);if(o===-1)return!1;let n=Eo(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<xt.length)},$K=(e,t)=>{let r=FK(t);if(r===null||e.wizard===void 0||!ov(e,t))return e;wn(e.id);let o=xt.slice(xt.indexOf(r)),n=ku(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(l=>!o.includes(l.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var sv,zK,UK=a(()=>{"use strict";nv();sv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zK=(e,t)=>ov(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${sv(HK)}"><input type="hidden" name="cycleId" value="${sv(e.id)}"><input type="hidden" name="wizardStepId" value="${sv(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var Pce,BK,Ace,GK,VK=a(()=>{"use strict";v();op();WK();MK();UK();RS();Pce={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},BK=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ace=(e,t,r)=>{let o=zK(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${BK(t)}">
  <summary class="sdlc-wizard-accordion-summary">${BK(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ja(e,t)}</div>
</details>`},GK=e=>{let t=e.wizard;if(t===void 0)return"";let r=Eo(e);if(r===null)return"";let o=xt.slice(0,r).map((i,l)=>Ace(e,`wizard-${l+1}`,Pce[i])),n=t.gate!==null?xK(e,{active:!0}):OK(e),s=r>=xt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var iP,iv=a(()=>{"use strict";VK();AL();v();iP=e=>{if(e===null||e.wizard!==void 0&&I(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=GK(e),r=EV(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var bce,av,KK=a(()=>{"use strict";v();De();pt();Ys();bce=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},av=async(e,t,r)=>{if(!bce(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===M)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=$C({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await ht({writerAgent:e.judgeModel,prompt:n,workingDirectory:we(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=UC(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var ip,aP,qK,lv,JK,YK,XK,lP,cv=a(()=>{"use strict";ip=m(require("node:fs")),aP=m(require("node:path")),qK=e=>aP.default.join(aP.default.dirname(e),"prompt-optimizer-writer-ready.json"),lv=e=>{let t=qK(e);if(!ip.default.existsSync(t))return{};try{let r=JSON.parse(ip.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},JK=(e,t)=>{ip.default.mkdirSync(aP.default.dirname(e),{recursive:!0}),ip.default.writeFileSync(qK(e),`${JSON.stringify(t,null,2)}
`)},YK=(e,t)=>lv(e)[t]?.message??null,XK=(e,t,r)=>{JK(e,{...lv(e),[t]:{message:r}})},lP=(e,t)=>{let r=lv(e);r[t]!==void 0&&JK(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var dv,cP,dP,ZK,He,ti=a(()=>{"use strict";v();IL();Qu();KK();ep();nl();cv();sP();Ot();dv=new Set,cP={atMs:0,ids:[]},dP=async()=>{if(Date.now()-cP.atMs<3e4)return cP.ids;let e=await cr({commands:Le({})});return cP.atMs=Date.now(),cP.ids=e.installedWriterIds,e.installedWriterIds},ZK=async(e,t,r)=>{let o=ne(e,t);if(o===null||r.aborted)return;let n=Qs(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(I(n.status)&&!s||n.status==="wizard_paused"||Jr(n))return;if(s){let c=await av(n,r,d=>{lP(e,d)});B(e,c);return}let i=await M5(n,c=>{lP(e,c)},r,c=>{ne(e,t)?.status==="stopped"||r.aborted||B(e,c)});if(!(ne(e,t)?.status==="stopped"||r.aborted)){if(B(e,i),I(i.status)){let c=await av(i,r,d=>{lP(e,d)});B(e,c);return}await ZK(e,t,r)}},He=(e,t)=>{if(dv.has(t))return;let r=ne(e,t);if(r===null)return;let o=Qs(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(I(o.status)&&!n||o.status==="wizard_paused"||Jr(o))return;dv.add(t);let s=jK(t);ZK(e,t,s).finally(()=>{dv.delete(t),NK(t)})}});var Rn,ap=a(()=>{"use strict";tv();sP();iv();ti();Rn=(e,t)=>{let r=Qs(e,t);return He(e,r.id),`${nP(r)}${iP(r)}`}});var QK,eq,tq=a(()=>{"use strict";QK=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,eq=e=>e!==null&&e>0});var _ce,kce,wce,rq,oq=a(()=>{"use strict";v();Qu();YS();Gu();Vu();nl();TS();TS();_ce=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),kce=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=_e(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},wce=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=ue(o);return rl({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},rq=(e,t)=>{if(!zu(e,t))return e;wn(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return Xs({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return bn(kce(r));if(t==="wizard-3"){let n=o.splitOptions[0]??_ce(o.templatedPrompt);return An(r,n)}return t==="wizard-4"?wce(r):e}});var uP,nq,uv=a(()=>{"use strict";v();YS();nl();uP=e=>(wn(e.id),{...rl(e,"stopped"),errorMessage:gC}),nq=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;wn(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var Rce,sq,iq,aq=a(()=>{"use strict";v();Qu();YS();Gu();Vu();ap();Ot();ti();tq();nv();oq();uv();Rce="Pick a revision scored above 0 before continuing to Separate.",sq=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),iq=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=ne(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},l=c=>{if(!r){i(c);return}let d=ne(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(Rn(e.storePath,d))};if(o==="wizard-stop-all"){let c=uP(s);return B(e.storePath,c),He(e.storePath,n),l(n),!0}if(o==="wizard-skip-module"){let c=nq(s);return B(e.storePath,c),l(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=$K(s,c);return B(e.storePath,d),l(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=rq(s,c);return B(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&He(e.storePath,n),l(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return l(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",g=MC(s.wizard,d,c);g=ku(g,d),g={...g,pendingStepInstructions:u};let f={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return B(e.storePath,f),He(e.storePath,n),l(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return l(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(f=>f.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?sq(s):Xs({...s,wizard:{...s.wizard,gate:null}});return B(e.storePath,g),He(e.storePath,n),l(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=QK(s,u??-1);if(!eq(g)){let y={...s,errorMessage:Rce,updatedAt:new Date().toISOString()};return B(e.storePath,y),l(n),!0}let f=bn({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return B(e.storePath,f),He(e.storePath,n),l(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let y=sq(s);return B(e.storePath,y),He(e.storePath,n),l(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(y=>y.id===u);if(g===void 0){let y={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return B(e.storePath,y),l(n),!0}let f=An(s,g);return B(e.storePath,f),l(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,g=d.modules[u];if(g===void 0)return l(n),!0;if(!Ka(s.costControls)){let P=t.get("confirmedTokenBudget")?.trim()??"",p=t.get("confirmedMaxSpendUsd")?.trim()??"";if(P.length===0){let C={...s,errorMessage:Ba,updatedAt:new Date().toISOString()};return B(e.storePath,C),l(n),!0}let b=Br({existing:s.costControls,confirmedTokenBudget:Number(P),confirmedMaxSpendUsd:p.length===0?null:Number(p),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!b.ok){let C={...s,errorMessage:b.errorMessage,updatedAt:new Date().toISOString()};return B(e.storePath,C),l(n),!0}s={...s,costControls:b.costControls,errorMessage:null,updatedAt:new Date().toISOString()},B(e.storePath,s)}let f=eL({wizard:d,modulePrompt:g.prompt,posted:t});if(!f.ok){let P={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return B(e.storePath,P),l(n),!0}let y={...d,parameterValues:f.parameterValues};if(g.status==="pending"){let P=O5({...s,wizard:{...y,gate:null}},u);return B(e.storePath,P),He(e.storePath,n),l(n),!0}let A=u+1;if(A>=d.modules.length){let P=ue(y),p=rl({...s,wizard:y},P.terminalStatusSuggestion);return B(e.storePath,p),He(e.storePath,n),l(n),!0}let S={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...y,gate:"optimize_modules",currentModuleIndex:A},updatedAt:new Date().toISOString()};return B(e.storePath,S),l(n),!0}}return l(n),!0}});var Tce,lq,Ece,pv,Cce,cq,dq=a(()=>{"use strict";De();nl();uv();HL();zS();ep();Ot();Tce="Add a score from 0 to 100 and the reason for it.",lq="Add a score from 1 to 100 and the reason for it.",Ece="Write the next prompt.",pv="This step is not waiting for you.",Cce=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},cq=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",l=ne(e.storePath,i);return l===null?{kind:"missing"}:l.wizard!==void 0?(B(e.storePath,uP(l)),{kind:"saved",cycleId:i}):DK(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=ne(e.storePath,r);if(o===null||!Jr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:pv};if(t==="manual-judge"){if(o.judgeModel!==M)return{kind:"invalid",cycle:o,errorMessage:pv};let i=Cce(e.posted.get("score")??""),l=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||l.length===0)return{kind:"invalid",cycle:o,errorMessage:c?lq:Tce};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:lq};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",u=US(Yu(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:l})),d);return B(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==M)return{kind:"invalid",cycle:o,errorMessage:pv};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:Ece};let s=$S(o,n);return B(e.storePath,s),{kind:"saved",cycleId:o.id}}});var uq,pq=a(()=>{"use strict";uq=`<script>
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
</script>`});var mq,gq=a(()=>{"use strict";mq=`<script>
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
</script>`});var fq,yq=a(()=>{"use strict";fq=`<script>
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
</script>`});var hq,Sq=a(()=>{"use strict";hq=`<script>
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
</script>`});var Pq,Aq=a(()=>{"use strict";v();pt();Pq=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Wt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(fe(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!I(t.status)}}});var bq,_q=a(()=>{"use strict";bq=`<script>
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
</script>`});var kq,wq=a(()=>{"use strict";v();op();XS();kq=e=>{let t=ol(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:I(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=Eo(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=ue(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=ue(e.wizard),n=o.rows.reduce((i,l)=>l.bestScore===null?i:i===null?l.bestScore:Math.min(i,l.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return I(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var Rq,Tq=a(()=>{"use strict";Rq=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var Co,Lce,vce,Eq,Cq=a(()=>{"use strict";wq();Tq();rp();Co=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lce=e=>e.wizard===void 0?"legacy":"wizard",vce=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${Co(t)}">`,o=kq(e),n=Rq(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,l=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${Co(o.badgeClass)}">${Co(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${Co(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${Co(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${Lce(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${Co(e.id)}">${Co(Ro(e.goal))}</a><p class="muted">${Co(l)}</p></div></div><div class="sdlc-history-row-actions">${u}${g}</div></li>`},Eq=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(l=>vce(l,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${Co(s)}</summary>${i}</details>`:i}});var mv,pP,Lq,Ice,xce,lp,vq,mP=a(()=>{"use strict";mv=m(require("node:fs")),pP=m(require("node:path"));pt();Lq=/^[a-z0-9-]+$/,Ice=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},xce=(e,t)=>{if(!Lq.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let l=r.indexOf(`
---`,3);if(l!==-1){let c=r.slice(3,l);s=r.slice(l+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let g=Ice(u[2]??"");u[1]==="name"&&g.length>0&&(o=g),u[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},lp=e=>{let t=ko(e);if(!t.ok)return[];let r=pP.default.resolve(t.path,".cursor","skills"),o=[];try{o=mv.default.readdirSync(r)}catch{return[]}return o.filter(n=>Lq.test(n)).flatMap(n=>{let s=pP.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${pP.default.sep}`))return[];try{let i=xce(mv.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},vq=(e,t)=>lp(e).find(r=>r.fileName===t)??null});var Iq,Wce,xq,Wq,Oq=a(()=>{"use strict";kn();Iq=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wce=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),xq=e=>{if(e.length===0)return`<div class="field">${Re("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${Iq(r.fileName)}">${Iq(r.fileName)}</option>`).join("");return`<div class="field">${Re("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${Wce(e)}</script>`},Wq=`<script>
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
</script>`});var Pt,Mq,jq=a(()=>{"use strict";v();rP();Bu();kn();Pt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mq=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=Pt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,l=zs({maxRounds:i,maxTrials:r,writerId:s}),c=l.rateUsdPer1kTokens??zt(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),g=FS({estimatedSpendUsd:l.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",f=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${Pt(Q.knobsSectionTitle)}</p>
  <p class="muted">${Pt(Q.knobsSectionLede)}</p>
  <div class="field">
    ${Re(Q.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${Re(Q.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${Pt(Q.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${Pt(Q.earlyStopLabel)}</span>
    </label>
    <p class="muted">${Pt(Q.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${Pt(Q.estimateSectionTitle)}</p>
    <p class="muted">${Pt(Q.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${Pt(Q.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${l.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${Pt(Q.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${l.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${Pt(Q.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${Pt(f)}">$${c.toFixed(4)} / 1k \xB7 ${Pt(f)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${l.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${l.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${g}>${Pt(Q.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var nt,Nq,Dq,Oce,Hq,Fq,$q,zq=a(()=>{"use strict";v();qL();De();rp();op();nt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Nq=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",Dq=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,Oce=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},Hq=e=>e===M?"You":ye(e),Fq=e=>{let t=Oce(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":ye(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${nt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${nt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${nt(Hq(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${nt(Hq(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${nt(r)}</dd></div>
    </dl>
  </details>`},$q=e=>{let t=e.wizard;if(t===void 0)return"";let r=Ro(e.goal),o=e.status==="wizard_paused",n=!I(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=QS(e),g=Dq(t),f=g===null?"":Nq(g),y=Eo(e),A=f.length===0?"":y===null||y>=4?` <strong>${nt(f)}</strong>`:` <strong>${nt(f)}</strong> (step ${y+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${nt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${nt(u.title)}${A}</p>
    <p class="muted">${nt(u.detail)}</p>
    <div class="actions">
      ${Fq(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${nt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=Dq(t),i=s===null?"Wizard":Nq(s),l=Eo(e),c=l===null||l>=4?"":` (step ${l+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${nt(r)}</h2>
    <p class="lede">Paused at <strong>${nt(i)}</strong>${nt(c)} (last updated ${nt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${Fq(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${nt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var cp,Uq,Bq=a(()=>{"use strict";kn();cp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Uq=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${cp(n.id)}"${n.id===e.runner?" selected":""}>${cp(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${cp(e.runner)}">Checking ${cp(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${Re("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Re("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${cp(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var Gq,Vq=a(()=>{"use strict";Gq=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var sl,Kq,qq,Jq,Yq,Xq=a(()=>{"use strict";kn();sl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Kq=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${sl(c.id)}"${c.id===r?" selected":""}>${sl(c.label)}</option>`).join(""),l=`<option value="manual"${r==="manual"?" selected":""}>${sl(n)}</option>`;return`<div class="field">${Re(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${l}</select></div>`},qq=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${sl(t)}">Checking ${sl(o)}\u2026</p>`},Jq=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${Re(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${sl(r)}</textarea><span class="muted">${o}</span></div></details>`,Yq=e=>{let t=`<div class="sdlc-writer">${Kq("judge","Judge",e.judge,e.writers,"I'll score it")}${qq("judge",e.judge,e.writers)}${Jq("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${Kq("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${qq("improver",e.improver,e.writers)}${Jq("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var Zq,Qq=a(()=>{"use strict";Zq=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var dp,Mce,gP,gv=a(()=>{"use strict";Qq();dp=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mce=(e,t)=>{let r=dp(e.goal),o=dp(e.label);return t===void 0?`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${r}" title="${r}">${o}</button>`:`<button type="submit" class="sdlc-goal-preset-chip" name="${dp(t)}" value="${r}" title="${r}">${o}</button>`},gP=(e={})=>{let t=e.presets??Zq,r=e.groupLabel??"Common goals",o=e.leadLabel??"Quick fill:",n=t.map(s=>Mce(s,e.submitName)).join("");return`<div class="sdlc-goal-presets" role="group" aria-label="${dp(r)}"><span class="sdlc-goal-presets-label muted">${dp(o)}</span>${n}</div>`}});var up,jce,Nce,fv,eJ=a(()=>{"use strict";v();kn();up=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jce=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},Nce=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,fv=e=>{let t=jce(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=hu(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,l=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${Re(e.label,e.fieldTipKey,l)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${up(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${up(e.inputId)}" class="sdlc-pass-range" type="range" name="${up(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${up(l)}"><span class="sdlc-pass-mark" style="left:${Nce(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${up(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var Hce,yv,Lo,hv,Sv=a(()=>{"use strict";ep();tv();pq();gq();xS();yq();Sq();Aq();_q();Cq();mP();Oq();kn();iv();jq();zq();rp();Bq();Vq();Xq();v();gv();eJ();Hce=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,yv='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',Lo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hv=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${Lo(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${Lo(e.skillNotice??"")}</div>`,o=`${HV}${FV}`,n=e.resumableWizardCycle??null,s=n===null?"":$q(n),i=iP(e.cycle),l=e.cycle===null?"":nP(e.cycle),c=e.cycle!==null&&Jr(e.cycle),d=Pq(e),u=Hce(d.goal,d.prompt,e.canRun),g=Yq({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),f=Uq({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y=`${fv({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${fv({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,A=Mq({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),S=WC,P=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",p=e.cycle!==null&&I(e.cycle.status),b=d.running&&!p,C=p||b?"":" open",h=b?" sdlc-compose-run-focus":"",w=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${p?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,R=p?(()=>{let j=e.cycle!==null?Ro(e.cycle.goal):Ro(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${Lo(j)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${w}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${w}</summary>`,E=p?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",W=c?"waiting":d.running?"running":"idle",z=d.running&&!c?' aria-busy="true"':"",O=`<section class="card sdlc-compose${E}${h}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${C}>
        ${R}
        <div class="sdlc-compose-details-body">
      <p class="lede">${S} ${Lo(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${P}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${Re("Folder","folder")}
            <input class="input" type="text" name="folder" value="${Lo(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${xq(lp(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${yv}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${Re("Goal","goal")}
            ${gP()}
            <textarea class="input textarea" name="goal" rows="4" required>${Lo(d.goal)}</textarea>
          </div>
          <div class="field">
            ${Re("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${Lo(d.prompt)}</textarea>
          </div>
          ${y}
          ${A}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${yv}
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
        ${Gq()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${yv}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${Lo(d.passScore)}; Step 4 pass \u2265 ${Lo(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
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
    </section>`,U=e.history.length>0?bq:"",pe=`${""}${hq}${uq}${mq}${fq}${Wq}${U}`;return`${t}${r}${O}${s}${l}${i}${o}${Eq(e.history,e.cycle?.id??null)}${pe}`}});var pp,Pv=a(()=>{"use strict";Sv();pp=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:hv(t)}))}});var tJ,rJ=a(()=>{"use strict";dq();ap();Pv();Ot();ti();tJ=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:cq({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=ne(e.storePath,o.cycleId);return He(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(Rn(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await pp(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:Kr(e.storePath),resumableWizardCycle:null}),!0)}});var oJ,fP,Av=a(()=>{"use strict";v();oJ=m(require("node:os")),fP=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??oJ.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??$t()}}});var nJ,il,bv,sJ,iJ,mp=a(()=>{"use strict";v();De();TL();nJ=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,il=e=>{let t=mV(e),r=Gs(e).map(s=>({id:s,label:AS[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},bv=(e,t,r)=>t===M||t!==null&&e.writers.some(o=>o.id===t)?t:r,sJ=(e,t,r,o=null)=>({judge:bv(e,t,e.judge),improver:bv(e,r,e.improver),runner:bv(e,o,e.runner)}),iJ=e=>e===WS?{goal:OS,prompt:MS}:{goal:"",prompt:""}});var _v,aJ=a(()=>{"use strict";_v=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var lJ,Fce,cJ,dJ,uJ,pJ=a(()=>{"use strict";v();lJ=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},Fce=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},cJ=(e,t)=>e.has("earlyStop")?!0:t!=="run",dJ=e=>{let t=lJ(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=Fce(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=lJ(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},uJ=e=>$t(e)});var mJ,gJ,yP,kv=a(()=>{"use strict";v();De();pt();mp();aJ();pJ();mJ=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=_v(o);return n.ok?String(n.passScore):String(r)},gJ=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return _v(n)},yP=e=>{let t=sJ(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=mJ(e.posted,"passScore",70),o=mJ(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",l=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",g=e.posted?.get("intent")??"",f=e.posted===null?!0:cJ(e.posted,g),y=(R,E)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:R,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:E,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:l,maxTrials:d,maxSpendUsd:u,earlyStop:f});if(e.posted===null)return y(e.defaultFolder??Vs,null);let A=e.posted.get("folder")??Vs;if(e.posted.get("intent")==="choose-folder"){let R=e.pickFolder();return y(R===null?A:Wt(R),null)}if((e.posted.get("intent")??"")!=="run")return y(A,null);let P=nJ(e.goal,e.prompt);if(P!==null)return y(A,P);let p=gJ(e.posted,"passScore",r);if(!p.ok)return y(A,p.errorMessage);let b=gJ(e.posted,"modulePassScore",o);if(!b.ok)return y(A,b.errorMessage);let C=gV(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(C===null)return y(A,"Choose a judge and an improver.");let h=ko(A);if(!h.ok)return y(A,h.errorMessage);let _=fV(e.installedIds,c,C.judge);if(_===null)return y(A,"Choose a runner for wizard step 4.");let w=dJ({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return w.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:C.judge,improver:C.improver,workingDirectory:h.path,passScore:p.passScore,modulePassScore:b.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:_,runnerInstructions:l,costControls:uJ(w.knobs)}:y(A,w.errorMessage)}});var al,SP,$ce,wv,fJ,hP,yJ,zce,hJ,Rv,Uce,Bce,Gce,Tv,SJ,PJ,AJ=a(()=>{"use strict";al=m(require("node:fs")),SP=m(require("node:path"));De();pt();$ce=["remember","choose-folder","run"],wv=()=>({folder:Vs,judge:"",improver:"",runner:""}),fJ=e=>SP.default.join(SP.default.dirname(e),"prompt-optimizer-preferences.json"),hP=e=>typeof e=="string"?e:"",yJ=e=>{let t=fJ(e);if(!al.default.existsSync(t))return wv();try{let r=JSON.parse(al.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return wv();let o=r,n=hP(o.folder).trim();return{folder:n.length===0?Vs:n,judge:hP(o.judge),improver:hP(o.improver),runner:hP(o.runner)}}catch{return wv()}},zce=(e,t)=>{let r=fJ(e);al.default.mkdirSync(SP.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;al.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),al.default.renameSync(o,r)},hJ=(e,t)=>e===M||Gs(t).some(r=>r===e),Rv=(e,t,r)=>e===null?t:e.length===0?"":hJ(e,r)?e:t,Uce=(e,t)=>{if(e===null)return t;let r=ko(e);return r.ok?r.display:t},Bce=e=>{let t=yJ(e.storePath),r={folder:Uce(e.folder,t.folder),judge:Rv(e.judge,t.judge,e.installedIds),improver:Rv(e.improver,t.improver,e.installedIds),runner:Rv(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||zce(e.storePath,r)},Gce=e=>{let t=ko(e);return t.ok?t.display:Vs},Tv=(e,t)=>hJ(e,t)?e:"",SJ=e=>{let t=yJ(e.storePath);return{selection:{...e.selection,judge:Tv(t.judge,e.installedIds)||e.selection.judge,improver:Tv(t.improver,e.installedIds)||e.selection.improver,runner:Tv(t.runner,e.installedIds)||e.selection.runner},defaultFolder:Gce(t.folder)}},PJ=e=>{let t=e.posted.get("intent")??"";if(!$ce.includes(t))return;let r=e.posted.get("folder");Bce({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var bJ,Vce,Kce,Ev,qce,PP,AP=a(()=>{"use strict";bJ=m(require("node:os"));De();cv();Ys();Vce="Reply with the single word ok. Do not use tools.",Kce=45e3,Ev=async(e,t)=>{if(t===M)return{ok:!0,message:"You will do this step."};let r=YK(e,t);if(r!==null)return{ok:!0,message:r};let o=await ht({writerAgent:t,prompt:Vce,workingDirectory:bJ.default.tmpdir(),timeoutMs:Kce});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${ye(t)} is ready.`;return XK(e,t,n),{ok:!0,message:n}},qce=e=>[...new Set(e.filter(t=>t.length>0))],PP=async(e,t,r,o)=>{for(let n of qce([t,r,o??""])){let s=await Ev(e,n);if(!s.ok)return s.message}return null}});var Cv,_J=a(()=>{"use strict";v();Cv=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!I(r.status)&&!(t!==null&&r.id===t))return r;return null}});var kJ,wJ=a(()=>{"use strict";vt();v();Bu();ap();Av();kv();Pv();Ot();pt();AJ();mP();AP();_J();sP();ti();kJ=async e=>{let t=e.posted===null?SJ({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=yP({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>un("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(PJ({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Wt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await PP(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await pp(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Wt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:Kr(e.route.storePath),resumableWizardCycle:Cv(Kr(e.route.storePath),null)});return}if(r.kind==="start"){let s=vq(r.workingDirectory,r.sourceSkillFile),i=HS(Va({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),l=fP({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:GC({..._u(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(B(e.route.storePath,l),He(e.route.storePath,l.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":l.id}),e.route.response.end(Rn(e.route.storePath,l));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(l.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:ne(e.route.storePath,e.cycleId);n!==null&&(n=Qs(e.route.storePath,n),He(e.route.storePath,n.id)),await pp(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:Kr(e.route.storePath),resumableWizardCycle:Cv(Kr(e.route.storePath),n?.id??null)})}});var RJ,TJ=a(()=>{"use strict";Ot();RJ=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";KV(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var EJ,CJ=a(()=>{"use strict";EJ=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let l=/name="([^"]+)"/.exec(i);if(l===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(l[1],d)}return n}return new URLSearchParams(t)}});var LJ,vJ=a(()=>{"use strict";e5();aq();rJ();wJ();TJ();mp();CJ();ti();LJ=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await dP(),o=il(r),n=e.method==="POST"?EJ(e.request.headers["content-type"],await e.readBody(e.request)):null;if(iq({posted:n,storePath:e.storePath,response:e.response})||await tJ(e,n,o))return;let s=iJ(t.searchParams.get("example")),i=RJ({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let l=QV({posted:n,storePath:e.storePath});if(l.kind==="redirect"){e.response.writeHead(303,{Location:l.location}),e.response.end();return}await kJ({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:ZV(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var Jce,IJ,xJ=a(()=>{"use strict";v();Ot();Jce=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",IJ=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=ne(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!I(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=VC({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${Jce(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var WJ,OJ=a(()=>{"use strict";ap();Ot();WJ=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:ne(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":Rn(e.storePath,o)),!0}});var Yce,MJ,jJ=a(()=>{"use strict";De();AP();Yce=["claude-cli","codex","cursor","antigravity"],MJ=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===M||Yce.includes(t)?await Ev(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var NJ,DJ=a(()=>{"use strict";v();NJ=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Pu,page:Au,context:$a,installedWriters:e,post:{method:"POST",url:Pu,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this computer",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Pu}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var bP,HJ=a(()=>{"use strict";v();ev();Xa();bP=e=>{let t=e.revisions[e.revisions.length-1]??null,r=_e(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=I(e.status),n=e.errorKind??null,s=oP({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:wo(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:$a,page:`${Au}?cycle=${encodeURIComponent(e.id)}`}}});var J,Xce,FJ,$J,zJ=a(()=>{"use strict";J=m(Ti());v();Xce=(0,J.isType)({goal:J.isString,prompt:J.isString,workingDirectory:J.isString,judge:(0,J.isUndefinedOr)(J.isString),improver:(0,J.isUndefinedOr)(J.isString),passScore:(0,J.isUndefinedOr)(J.isNumber),maxRounds:(0,J.isUndefinedOr)(J.isNumber),maxTrials:(0,J.isUndefinedOr)(J.isNumber),maxSpendUsd:(0,J.isUndefinedOr)(J.isNumber),earlyStop:(0,J.isUndefinedOr)(J.isBoolean),earlyStopFlatRounds:(0,J.isUndefinedOr)(J.isNumber),confirmedTokenBudget:(0,J.isUndefinedOr)(J.isNumber),confirmedMaxSpendUsd:(0,J.isUndefinedOr)(J.isNumber),rateUsdPer1kTokens:(0,J.isUndefinedOr)(J.isNumber)}),FJ=e=>{let t=e?.trim()??"";return t.length===0?null:t},$J=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return Xce(t)?t.workingDirectory.trim().length===0?{ok:!1,error:iS}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:FJ(t.judge),improver:FJ(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:iS}}});var vo,Zce,UJ,BJ,GJ=a(()=>{"use strict";v();vo=m(Ti()),Zce=(0,vo.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:vo.isNumber,confirmedMaxSpendUsd:(0,vo.isUndefinedOr)(vo.isNumber),rateUsdPer1kTokens:(0,vo.isUndefinedOr)(vo.isNumber)}),UJ=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:Zce(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},BJ=(e,t)=>{let r=Br({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var Qce,VJ,KJ=a(()=>{"use strict";v();De();kv();mp();Qce=e=>e.map(t=>t.id).join(", "),VJ=e=>{let t=il(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===M||n===M)return{ok:!1,error:xC,installedWriters:t.writers};if(o===null||n===null){let l=Qce(t.writers);return{ok:!1,error:l.length===0?"No reasoning writer is installed on this computer.":`Set judge and improver to installed writer ids: ${l}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=yP({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var ede,qJ,JJ=a(()=>{"use strict";v();Av();DJ();HJ();mp();zJ();GJ();KJ();Ot();ede=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},qJ=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=ne(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this computer."}}:{status:200,body:bP(u)}}let r=await e.handlers.readInstalledIds(),o=il(r);if(e.method==="GET")return{status:200,body:NJ(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=UJ(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let g=ne(e.storePath,t);if(g===null)return{status:404,body:{ok:!1,error:"That run is not on this computer."}};let f=BJ(g,u.body);return f.ok?(B(e.storePath,f.cycle),{status:200,body:bP(f.cycle)}):{status:400,body:{ok:!1,error:f.error}}}let n=ede(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=zs({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=$J(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=VJ({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let l=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(l!==null)return{status:400,body:{ok:!1,error:l,installedWriters:o.writers}};let c=Va({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:ft({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=Br({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=fP({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:_u(i.prompt),runnerModel:i.runner,costControls:c});return B(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:bP(d)}}});var YJ,XJ=a(()=>{"use strict";ti();AP();JJ();YJ=async e=>{let t=await qJ({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:dP,readWritersReady:PP,startCycle:He}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var QJ,tde,rde,ZJ,ode,e4,t4=a(()=>{"use strict";QJ=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],tde=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},rde=e=>{let t={};for(let n of e)for(let s of new Set(QJ(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},ZJ=(e,t)=>{let r=tde(QJ(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},ode=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[l,c])=>i+c*(t[l]??0),0),n=Math.sqrt(r.reduce((i,[,l])=>i+l*l,0)),s=Math.sqrt(Object.values(t).reduce((i,l)=>i+l*l,0));return n===0||s===0?0:o/(n*s)},e4=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=rde(e.map(i=>i.text)),s=ZJ(o,n);return e.map(i=>({id:i.id,score:ode(s,ZJ(i.text,n))})).filter(i=>i.score>0).toSorted((i,l)=>l.score-i.score).slice(0,r)}});var Lv,nde,sde,r4,ide,ade,lde,cde,vv,Iv=a(()=>{"use strict";Lv=m(require("node:path"));pt();t4();mP();nde=5,sde=20,r4=280,ide=e=>[e.name,e.description,e.promptText].join(`
`),ade=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=r4?t:`${t.slice(0,r4-3)}...`},lde=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),cde=e=>e===void 0||!Number.isFinite(e)?nde:Math.min(sde,Math.max(1,Math.floor(e))),vv=e=>{let t=e.query.trim(),r=cde(e.limit),o=ko(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=lp(o.path),s=e4(n.map(d=>({id:d.fileName,text:ide(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),l=Lv.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:Lv.default.join(l,u.fileName,"SKILL.md"),excerpt:ade(u),source:"filesystem"}]});return{query:t,hits:c,context:lde(c)}}});var o4,n4=a(()=>{"use strict";Iv();o4=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:vv({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var s4,i4=a(()=>{"use strict";n4();s4=async e=>{let t=o4({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var dde,xv,a4=a(()=>{"use strict";CL();vJ();xJ();OJ();jJ();XJ();i4();dde=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},xv=async e=>{let t=dde(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await YJ(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await s4(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:EL()})),!0):(await MJ({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||IJ({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||WJ({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await LJ(e),!0)}});var Wv,ude,pde,gp,_P=a(()=>{"use strict";Wv=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ude=e=>!Wv(e)||typeof e.ruleId!="string"||typeof e.title!="string"||typeof e.source!="string"||typeof e.active!="boolean"||typeof e.hitCount!="number"||!Number.isFinite(e.hitCount)||e.lastHitAt!==null&&typeof e.lastHitAt!="string"?null:{ruleId:e.ruleId,title:e.title,source:e.source,active:e.active,hitCount:e.hitCount,lastHitAt:e.lastHitAt},pde=e=>!Wv(e)||typeof e.ruleIdA!="string"||typeof e.ruleIdB!="string"||e.reason!=="duplicate"&&e.reason!=="overlap"||typeof e.score!="number"||!Number.isFinite(e.score)?null:{ruleIdA:e.ruleIdA,ruleIdB:e.ruleIdB,reason:e.reason,score:e.score},gp=e=>{if(!Wv(e)||e.ok!==!0||typeof e.projectId!="string"||e.windowDays!==null||!Array.isArray(e.rules)||!Array.isArray(e.overlaps))return null;let t=[];for(let o of e.rules){let n=ude(o);if(n===null)return null;t.push(n)}let r=[];for(let o of e.overlaps){let n=pde(o);if(n===null)return null;r.push(n)}return{ok:!0,projectId:e.projectId,windowDays:null,rules:t,overlaps:r}}});var mde,gde,Ov,Mv=a(()=>{"use strict";_P();mde=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gde=e=>gp({ok:!0,projectId:"x",windowDays:null,rules:[e],overlaps:[]})?.rules[0]??null,Ov=e=>{if(!mde(e)||e.ok!==!0||typeof e.projectId!="string"||typeof e.changed!="boolean")return null;let t=gde(e.rule);return t===null?null:{ok:!0,projectId:e.projectId,rule:t,changed:e.changed}}});var fde,l4,jv,c4=a(()=>{"use strict";_P();fde=1e4,l4=(e,t,r=30)=>{let o=new URL(`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/usage`);return o.searchParams.set("days",String(r)),o.toString()},jv=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"not_connected"};let r=e.fetchImpl??fetch;try{let o=await r(l4(e.appOrigin,e.projectId,e.days??30),{method:"GET",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(fde)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=gp(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var yde,d4,Nv,u4=a(()=>{"use strict";Mv();yde=15e3,d4=(e,t,r,o)=>`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/rules/${encodeURIComponent(r)}/${o}`,Nv=async e=>{let t=e.pairingToken.trim();if(t.length===0)return{ok:!1,reason:"unauthorized"};let r=e.fetchImpl??fetch;try{let o=await r(d4(e.appOrigin,e.projectId,e.ruleId,e.action),{method:"POST",headers:{[e.pairingHeaderName]:t},signal:AbortSignal.timeout(yde)});if(o.status===401)return{ok:!1,reason:"unauthorized"};if(o.status===403)return{ok:!1,reason:"forbidden"};if(o.status===404)return{ok:!1,reason:"not_found"};if(o.status===409)return{ok:!1,reason:"limit_exceeded"};if(!o.ok)return{ok:!1,reason:"unavailable"};let n=Ov(await o.json());return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,data:n}}catch{return{ok:!1,reason:"unavailable"}}}});var D,Io=a(()=>{"use strict";Ct();D={heading:"Compare rules",intro:"See which rules kick in for a prompt and what they add to each request.",groupLabel:"Sample prompts",lead:"Try a sample:",customLabel:"Or write your own prompt",customHint:"Use a prompt that has nothing to do with this project. Any rule that still kicks in is probably in the wrong place.",button:"Compare",emptyPrompt:"Pick a sample prompt or write your own.",noRules:"No rules kick in for this prompt.",oneRule:"1 rule kicks in for this prompt:",nRules:e=>`${e} rules kick in for this prompt:`,tokenLine:(e,t)=>`Prompt alone: ${e} tokens. Rules add ${t} tokens.`,costLine:e=>`About ${e} more per request.`,rulesUnavailable:"Rules for this project aren't available right now.",ruleUseHeading:"Rule use",ruleUseIntro:"Rules marked below may be safe to drop. You decide. Nothing is removed for you.",usedOnce:"Used 1 time",usedN:e=>`Used ${e} times`,neverUsed:"Never used",notUsedInDays:e=>`Not used in ${e} days`,sameAs:e=>`Same as ${e}`,overlapsWith:e=>`Overlaps with ${e}`,emptyRules:"No rules to check yet.",usageError:"Couldn't load rule usage. Try again.",tryAgain:"Try again",connectComputer:"Connect this computer to AgentWitch to see rule use.",ownerOnlyUsage:"Only the project owner can see rule use.",drop:"Drop",restore:"Restore",undo:"Undo",dropped:e=>`Dropped "${e}".`,ownerOnlyDrop:"Only the project owner can drop rules.",dropFailed:"Couldn't drop the rule. Try again.",restoreFailed:"Couldn't restore the rule. Try again.",limitReached:`Limit reached: ${64} active pitfalls. Retire one to add another.`}});var hde,Sde,Dv,Hv,Fv=a(()=>{"use strict";Io();hde=1440*60*1e3,Sde=(e,t)=>{let r=Date.parse(e);return Number.isFinite(r)?Math.max(0,Math.floor((t-r)/hde)):null},Dv=e=>{let t=e.nowMs??Date.now(),r=e.staleAfterDays??30,o=[];if(e.rule.hitCount===0)o.push({kind:"never_used"});else if(e.rule.lastHitAt!==null){let n=Sde(e.rule.lastHitAt,t);n!==null&&n>r&&o.push({kind:"stale",days:n})}for(let n of e.overlaps){let s=n.ruleIdA===e.rule.ruleId?n.ruleIdB:n.ruleIdB===e.rule.ruleId?n.ruleIdA:null;if(s===null)continue;let l=e.rulesById.get(s)?.title??s;n.reason==="duplicate"?o.push({kind:"same_as",ruleTitle:l}):o.push({kind:"overlaps",ruleTitle:l})}return o},Hv=e=>{switch(e.kind){case"never_used":return D.neverUsed;case"stale":return D.notUsedInDays(e.days);case"same_as":return D.sameAs(e.ruleTitle);case"overlaps":return D.overlapsWith(e.ruleTitle);default:return e}}});var p4=a(()=>{"use strict";v();v();v();v();v()});var $v,zv=a(()=>{"use strict";Ct();Nd();p4();$v=e=>{let t=er(e.prompt),r=jd(e.matched.map(s=>({id:s.id,avoidance:s.avoidance}))),o=e.matched.length===0?0:er(r),n=zt(null);return{promptTokens:t,rulesTokens:o,addedCostUsd:o/1e3*n}}});var kP=a(()=>{"use strict";a4();Iv();Ys();_P();Mv();c4();u4();Fv();zv();Io()});var Pde,Ade,bde,m4,g4=a(()=>{"use strict";X();ct();bE();Pde="/api/local/coding-tools/pause",Ade=e=>e===void 0||e===jt||e===_i,bde=e=>{try{let r=JSON.parse(e)?.paused;return typeof r=="boolean"?r:null}catch{return null}},m4=async e=>{if(e.pathname!==Pde)return!1;let t=(s,i,l)=>e.sendJson(e.response,s,{ok:!0,paused:i,updatedAt:l,label:cs.pauseLabel,hint:cs.pauseHint});if(e.method==="GET"){let s=gs(e.configPath);return t(200,s.paused,s.updatedAt),!0}if(e.method!=="POST")return e.sendJson(e.response,405,{ok:!1,error:"method_not_allowed"}),!0;let r=e.request.headers.origin;if(!Ade(typeof r=="string"?r:void 0))return e.sendJson(e.response,403,{ok:!1,error:"forbidden_origin"}),!0;let o=bde(await e.readBody(e.request));if(o===null)return e.sendJson(e.response,400,{ok:!1,error:"invalid_body"}),!0;let n=$k(e.configPath,o);return t(200,n.paused,n.updatedAt),!0}});var Uv,Bv,Gv=a(()=>{"use strict";Uv="2025-03-26",Bv={name:"agent-witch",version:"1.0.0"}});var ll,wP,f4,_de,fp,y4=a(()=>{"use strict";Gv();ll=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),wP=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),f4=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,_de=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return ll(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return ll(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return wP(e,i)}catch(i){try{r.onToolError?.(n,i)}catch{}return ll(e,-32603,`Tool ${n} failed`)}},fp=async(e,t,r)=>{let o=f4(e);if(o===null)return ll(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?ll(n,-32600,"Invalid Request"):s==="initialize"?wP(n,{protocolVersion:Uv,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?wP(n,{}):s==="tools/list"?wP(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?_de(n,f4(o.params),t,r):ll(n,-32601,"Method not found")}});var Vv,h4=a(()=>{"use strict";Vv=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var RP=a(()=>{"use strict";y4();h4();Gv()});var kde,Tn,TP=a(()=>{"use strict";ka();RP();kde=(e,t)=>{let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] mcp tool ${e} failed: ${r}
`)},Tn=e=>{let t=gn({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:Bv,tools:[{definition:rh,call:r=>Vv(JSON.stringify(t(r)))}],onToolError:e.logToolError??kde}}});var S4,wde,Rde,P4,A4=a(()=>{"use strict";RP();TP();S4=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},wde=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let l=Number.parseInt(i[1]??"0",10),c=n+4+l;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}await t(u)}},Rde=async(e,t)=>{await wde(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await fp(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&S4(t.stdout,s);return}S4(t.stdout,s)})},P4=async e=>{await Rde(Tn({layout:e.layout,isDeclined:e.isDeclined}),e.streams??{stdin:process.stdin,stdout:process.stdout})}});var Tde,EP,b4=a(()=>{"use strict";RP();TP();Tde="/mcp",EP=async e=>{if(e.pathname!==Tde)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??Tn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await fp(t,r,void 0)),!0}});var _4={};kt(_4,{createAwlMcpServer:()=>Tn,runAwlMcpStdio:()=>P4,tryHandleAwlMcpHttpRequest:()=>EP});var Kv=a(()=>{"use strict";TP();A4();b4()});var ri,yp,Ede,Cde,Lde,vde,k4,w4=a(()=>{"use strict";ri=m(require("node:fs")),yp=m(require("node:path")),Ede="prompt-optimizer-cycles.json",Cde="prompt-optimizer-preferences.json",Lde="prompt-sdlc-cycles.json",vde="prompt-sdlc-preferences.json",k4=e=>{let t=yp.default.join(e,Ede),r=yp.default.join(e,Lde);if(ri.default.existsSync(t)||!ri.default.existsSync(r))return t;try{ri.default.renameSync(r,t)}catch{return r}let o=yp.default.join(e,vde),n=yp.default.join(e,Cde);if(ri.default.existsSync(o)&&!ri.default.existsSync(n))try{ri.default.renameSync(o,n)}catch{}return t}});var cl,Ide,qv,R4=a(()=>{"use strict";cl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ide=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],qv=e=>{let t=Ide.map(i=>`<option value="${cl(i.value)}">${cl(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this computer on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${cl(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${cl(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${cl(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${cl(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var hp,C4,xde,L4,Wde,Ode,v4,LP,T4,E4,Mde,jde,xo,Sp,CP,Nde,vP,Jv,Dde,Yv,I4,Xv,x4,Hde,Fde,$de,W4,O4,M4,Pp=a(()=>{"use strict";hp=m(require("node:fs")),C4=m(require("node:path")),xde="estimate-history.ndjson",L4=100,Wde=500,Ode=2e4,v4=e=>C4.default.join(e,xde),LP=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,Wde),T4=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,Ode),E4=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,Mde=e=>({...e,estimateTokens:E4(e.estimateTokens),actualTokens:E4(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),jde=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},xo=e=>{let t=v4(e);return hp.default.existsSync(t)?hp.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return jde(n)?[Mde(n)]:[]}catch{return[]}}):[]},Sp=(e,t)=>{hp.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;hp.default.writeFileSync(v4(e),r,"utf8")},CP=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),Nde=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this computer. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${CP(o.task)} | ${CP(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},vP=e=>{let t=xo(e.reportsDir),r=LP(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Sp(e.reportsDir,[...s,n])},Jv=e=>{let t=xo(e.reportsDir),r=t.find(l=>l.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?LP(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(l=>l.id!==e.agentRunId);Sp(e.reportsDir,[...i,s])},Dde=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-L4),Yv=e=>[...xo(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),I4=e=>{let t=xo(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=T4(e.input),n=T4(e.output),s=LP(o),i=e.writerLabel?.trim()??"",l={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);Sp(e.reportsDir,[...c,l])},Xv=(e,t)=>{let r=xo(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},x4=e=>({table:Nde(Dde(xo(e))),embedding:null}),Hde=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],l=s[s.length-2];s.length>=3&&i!==void 0&&l!==void 0&&i>l*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},Fde=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-L4),$de=e=>{let t=Hde(Fde(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",l=r.get(i)??[];l.push(s.actualTokens),r.set(i,l)}let o=[...r.entries()].map(([s,i])=>{let l=Math.min(...i),c=Math.max(...i);return l===c?`${s} actuals are ${l}`:`${s} actuals are ${l}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${CP(s.task)} | ${CP(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},W4=e=>{let t=xo(e.reportsDir),r=LP(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Sp(e.reportsDir,[...s,n])},O4=e=>{let t=xo(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);Sp(e.reportsDir,[...s,n])},M4=e=>$de(xo(e))});var j4=a(()=>{"use strict";Pp()});var Wo,Zv,zde,Qv,Ude,Bde,IP,xP,Gde,eI,N4=a(()=>{"use strict";j4();kL();Wo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zv=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},zde=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Zv(-r)} under`:`${Zv(r)} over`},Qv=e=>e.toLocaleString("en-US"),Ude=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${Qv(-r)} under`:`${Qv(r)} over`},Bde=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},IP=e=>e===null?"\u2014":Zv(e),xP=e=>e===null?"\u2014":Qv(e),Gde=`(function () {
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
})();`,eI=e=>{let r=Yv(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,l=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":zde(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":Ude(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${Wo(Bde(i))}</button></td>
        <td>${Wo(c)}</td>
        <td>${IP(n.estimateSeconds)}</td>
        <td>${IP(n.actualSeconds)}</td>
        <td>${Wo(d)}</td>
        <td>${xP(n.estimateTokens)}</td>
        <td>${xP(n.actualTokens)}</td>
        <td>${Wo(u)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${Wo(c)}</p>
        <h2>Input</h2>
        <pre>${Wo(i)}</pre>
        <h2>Output</h2>
        <pre>${Wo(l)}</pre>
        <p>Time: estimated ${IP(n.estimateSeconds)} \xB7 actual ${IP(n.actualSeconds)} \xB7 ${Wo(d)}</p>
        <p>Tokens: estimated ${xP(n.estimateTokens)} \xB7 actual ${xP(n.actualTokens)} \xB7 ${Wo(u)}</p>
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
            ${ES({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${Gde}</script>`}
    </section>`}});var D4=a(()=>{"use strict";R4();N4()});var dl,Vde,Kde,tI,H4=a(()=>{"use strict";dl=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vde=(e,t,r)=>{let o=dl(t),n=dl(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},Kde=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${dl(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>Vde(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${dl(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${dl(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${dl(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},tI=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(Kde).join(""):'<section class="card"><p class="muted">No writer sessions stored on this computer yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var F4=a(()=>{"use strict";H4()});var Ap,$4,z4,rI,oI,nI,U4=a(()=>{"use strict";Ap=m(require("node:fs")),$4=m(require("node:path"));ga();Vh();z4=(e,t,r)=>Oa({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,rI=(e,t,r)=>{let o=z4(e,t,r);if(o===null)return[];if(!Ap.default.existsSync(o))return[];let n=Ap.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},oI=e=>{let t=z4(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:ar(e.entry.prompt),output:ar(e.entry.output)};Ap.default.mkdirSync($4.default.dirname(t),{recursive:!0}),Ap.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},nI=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,l=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${l}`}).join(`

`)}

---

`});var qde,Jde,bp,WP,sI=a(()=>{"use strict";qde=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Jde=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,bp=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],l=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=qde(i.assistantOutput),d=c.length>0?`Assistant: ${Jde(c,t)}`:null,u=[l,d].filter(g=>g!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},WP=e=>{let t=e.userMessage.trim(),r=bp({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Xr,_p,lI,Yde,Xde,iI,Zde,cI,OP,B4,G4,Qde,ul,dI,aI,V4,eue,K4,pl,MP,kp,tue,wp,uI,jP,NP,q4=a(()=>{"use strict";Xr=m(require("node:fs")),_p=m(require("node:path")),lI=require("node:crypto");sI();Yde="writer-sessions",Xde="active-index.json",iI=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Zde=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",cI=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},OP=e=>{let t=_p.default.join(e.installDir,Yde);return Xr.default.mkdirSync(t,{recursive:!0}),t},B4=e=>_p.default.join(OP(e),Xde),G4=(e,t)=>_p.default.join(OP(e),`${t}.canonical.json`),Qde=(e,t)=>_p.default.join(OP(e),`${t}.continuation.json`),ul=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,dI=e=>{let t=B4(e);if(!Xr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Xr.default.readFileSync(t,"utf8"));if(!iI(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!iI(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!Zde(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},aI=(e,t)=>{Xr.default.writeFileSync(B4(e),JSON.stringify(t,null,2))},V4=(e,t)=>{Xr.default.writeFileSync(G4(e,t.sessionId),JSON.stringify(t,null,2))},eue=(e,t)=>{Xr.default.writeFileSync(Qde(e,t.sessionId),JSON.stringify(t,null,2))},K4=(e,t)=>{let r=bp({turns:t.turns});eue(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},pl=(e,t)=>{let r=G4(e,t);if(!Xr.default.existsSync(r))return null;try{let o=JSON.parse(Xr.default.readFileSync(r,"utf8"));return!iI(o)||typeof o.sessionId!="string"?null:o}catch{return null}},MP=(e,t=20)=>{let r=OP(e),o=Xr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),l=pl(e,i);l!==null&&n.push(l)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},kp=(e,t,r)=>{let o=cI(r);return dI(e).entries.find(i=>ul(i)===ul({writerAgent:t,projectFolderPath:o}))?.sessionId??null},tue=(e,t,r,o)=>{let n=dI(e),s=ul({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(l=>ul(l)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];aI(e,{entries:i})},wp=(e,t,r)=>{let o=(0,lI.randomUUID)(),n=new Date().toISOString(),s=cI(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return V4(e,i),K4(e,i),tue(e,t,s,o),o},uI=(e,t,r)=>{let o=kp(e,t,r);return o!==null?o:wp(e,t,r)},jP=(e,t,r)=>{let o=cI(r),n=dI(e);if(o===null&&r===void 0){aI(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=ul({writerAgent:t,projectFolderPath:o});aI(e,{entries:n.entries.filter(i=>ul(i)!==s)})},NP=e=>{let t=uI(e.layout,e.writerAgent,e.projectFolderPath),r=pl(e.layout,t);if(r===null)return;let o={id:(0,lI.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};V4(e.layout,n),K4(e.layout,n)}});var rue,oue,DP,pI,J4=a(()=>{"use strict";rue=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",oue=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},DP=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",pI=e=>{let t=DP(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=rue(r,e.userPromptCharacterCount),n=oue({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var HP=a(()=>{"use strict";U4();q4();sI();J4()});var Y4=a(()=>{"use strict";Bf();ra();aw()});var X4=a(()=>{"use strict";Ok()});var At,sue,iue,mI,gI,fI,Z4=a(()=>{"use strict";Y4();X4();At=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sue=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},iue=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=sd(o);return`value="${At(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${At(r)}"`},mI=(e,t,r,o,n)=>{let s=Gf[t];return`<label class="field">
          <span class="field-label">${At(o)} API key \u2014 ${At(sue(e,t))} \xB7 <a class="field-link" href="${At(s.href)}" target="_blank" rel="noopener noreferrer">${At(s.label)}</a></span>
          <input class="input mono" type="password" name="${At(r)}" autocomplete="off" ${iue(e,t,n)} />
        </label>`},gI=(e,t,r,o)=>{let n=Of(e[t]?.model),s=new Set(Wf[t].map(c=>c.value)),i=Wf[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${At(c.value)}"${d}>${At(c.label)}</option>`}).join(""),l=n!==ps&&!s.has(n)?`<option value="${At(n)}" selected>${At(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${At(o)}</span>
          <select class="input mono" name="${At(r)}">${i}${l}</select>
        </label>`},fI=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${At(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${mI(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${gI(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${mI(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${gI(e.secrets,"openai","openaiModel","OpenAI model")}
        ${mI(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${gI(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var Q4=a(()=>{"use strict";Z4()});var FP,e8,t8=a(()=>{"use strict";FP=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e8=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${FP(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in AgentWitch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">Nothing installed yet. Install playbooks in AgentWitch Cloud \u2014 files land in your profile harness on this computer. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${FP(s.name)}</strong> <span class="muted mono">(${FP(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${FP(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from AgentWitch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var aue,r8,o8,n8=a(()=>{"use strict";aue=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,r8=e=>e.kind==="folder",o8=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let l=n[i];if(l===void 0)continue;if(i===n.length-1){s.children.set(l,o);continue}let d=s.children.get(l);if(d!==void 0&&r8(d)){s=d;continue}let u={kind:"folder",name:l,children:new Map};s.children.set(l,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(r8(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(aue)};return r(t)}});var s8,yI,i8=a(()=>{"use strict";s8=m(require("node:path")),yI=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${yI(r.children,t)}</ul>
            </details>
          </li>`;let o=s8.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var a8,En,lue,cue,Rp,due,hI,l8=a(()=>{"use strict";Xh();a8=m(require("node:path"));t8();n8();i8();En=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),lue=()=>`(() => {
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

})();`,cue=()=>`(() => {
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
})();`,Rp=e=>{let t=pu({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in AgentWitch Cloud",body:"Install and update playbooks in the browser; this computer keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=e8({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${En(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${En(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':due(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,l=!e.importSectionExpanded,c=l?`<section class="card">
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
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${En(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${En(s)}" />
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
    <script>${lue()}</script>
    <script>${cue()}</script>`;return`${t}${r}${o}${c}${d}`},due=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:l,setIndex:c})=>{let d=o8(l.items.map(f=>({...f,relativePath:typeof f.relativePath=="string"&&f.relativePath.length>0?f.relativePath:a8.default.relative(l.sourceRoot,f.sourcePath).replaceAll("\\","/")}))),u=yI(d,En),g=l.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${En(l.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${En(l.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${En(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},hI=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,l]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=l.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let l=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??u??l,f=t.sets[i];if(f===void 0)continue;let y=l.length>0?l:f.proposedSlug,A=g.length>0?g:f.proposedName,S=r.has(i),P=f.items.map(p=>({id:p.id,kind:p.kind,title:p.title,sourcePath:p.sourcePath,include:S}));s.push({slug:y,name:A,items:P})}return s}});var c8=a(()=>{"use strict";l8()});var uue,SI,d8=a(()=>{"use strict";gt();uue=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[re]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},SI=uue});var pue,u8,p8=a(()=>{"use strict";gt();pue=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[re]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},u8=pue});var m8,mue,g8,f8=a(()=>{"use strict";m8={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:"This project has 64 active pitfalls. Retire one, then try again."},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"AgentWitch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach AgentWitch Cloud. Check this computer on Status, then try again."}},mue=e=>e!==null&&Object.prototype.hasOwnProperty.call(m8,e)?m8[e]:null,g8=mue});var y8,h8=a(()=>{"use strict";y8=[{label:"Haiku",goal:"Write a short haiku about morning rain."},{label:"Trip plan",goal:"Plan a quiet weekend trip to a nearby lake."},{label:"Rainbows",goal:"Explain how rainbows form in simple words."},{label:"Dinner idea",goal:"Suggest a quick vegetarian dinner for two."}]});var hr,Tp,PI=a(()=>{"use strict";Io();h8();gv();hr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tp=e=>{let t=e.promptValue??"",r=gP({presets:y8,groupLabel:D.groupLabel,leadLabel:D.lead,submitName:"rulePrompt"}),o=e.promptError!==void 0&&e.promptError!==null?`<p class="alert-error">${hr(e.promptError)}</p>`:"",n=e.resultHtml!==void 0&&e.resultHtml.length>0?`<div class="stack">${e.resultHtml}</div>`:"",s=e.usageHtml!==void 0&&e.usageHtml.length>0?`<section class="stack">
          <h3>${hr(D.ruleUseHeading)}</h3>
          <p class="lede">${hr(D.ruleUseIntro)}</p>
          ${e.usageHtml}
        </section>`:"";return`<section class="stack" aria-label="${hr(D.heading)}">
      <h2>${hr(D.heading)}</h2>
      <p class="lede">${hr(D.intro)}</p>
      <form method="GET" action="/project" class="stack">
        <input type="hidden" name="id" value="${hr(e.projectId)}" />
        <input type="hidden" name="tab" value="harness" />
        ${r}
        <label class="field-label" for="rule-compare-prompt">${hr(D.customLabel)}</label>
        <p class="muted">${hr(D.customHint)}</p>
        <textarea class="input" id="rule-compare-prompt" name="rulePrompt" rows="3">${hr(t)}</textarea>
        ${o}
        <div class="actions">
          <button class="btn btn-primary" type="submit">${hr(D.button)}</button>
        </div>
      </form>
      ${n}
      ${s}
    </section>`}});var ml,AI,bI=a(()=>{"use strict";Io();ml=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AI=e=>{if(e.matched.length===0)return`<p class="empty">${ml(D.noRules)}</p>`;let t=e.matched.length===1?D.oneRule:D.nRules(e.matched.length),r=`<ul class="stack">${e.matched.map(n=>`<li><strong>${ml(n.title)}</strong> <span class="muted mono">${ml(n.id)}</span></li>`).join("")}</ul>`,o=`$${e.tokens.addedCostUsd.toFixed(4)}`;return`<div class="stack">
      <p>${ml(t)}</p>
      ${r}
      <p class="muted">${ml(D.tokenLine(e.tokens.promptTokens,e.tokens.rulesTokens))}</p>
      <p class="muted">${ml(D.costLine(o))}</p>
    </div>`}});var Vt,gue,_I,kI=a(()=>{"use strict";Fv();Io();Vt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gue=e=>e===1?D.usedOnce:D.usedN(e),_I=e=>{let t=e.flashHtml??"";if(e.rules.length===0)return`${t}<p class="empty">${Vt(D.emptyRules)}</p>`;let r=new Map(e.rules.map(n=>[n.ruleId,n])),o=e.rules.map(n=>{let i=Dv({rule:n,rulesById:r,overlaps:e.overlaps,nowMs:e.nowMs}).map(c=>`<span class="muted">${Vt(Hv(c))}</span>`).join(" \xB7 "),l=n.active?`<form method="POST" action="/project/rules/drop" class="inline-form">
            <input type="hidden" name="projectId" value="${Vt(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${Vt(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Vt(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${Vt(D.drop)}</button>
          </form>`:`<form method="POST" action="/project/rules/restore" class="inline-form">
            <input type="hidden" name="projectId" value="${Vt(e.projectId)}" />
            <input type="hidden" name="ruleId" value="${Vt(n.ruleId)}" />
            ${e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Vt(e.prompt)}" />`:""}
            <button class="btn btn-secondary btn-compact" type="submit">${Vt(D.restore)}</button>
          </form>`;return`<li class="stack">
          <p><strong>${Vt(n.title)}</strong> <span class="muted">${Vt(gue(n.hitCount))}</span></p>
          ${i?`<p>${i}</p>`:""}
          ${l}
        </li>`}).join("");return`${t}<ul class="stack">${o}</ul>`}});var Oo,S8,Mo,P8,wI=a(()=>{"use strict";Io();Oo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),S8=e=>{let t=D.dropped(e.title),r=e.prompt!==void 0&&e.prompt.length>0?`<input type="hidden" name="rulePrompt" value="${Oo(e.prompt)}" />`:"";return`<div class="alert-success actions">
      <span>${Oo(t)}</span>
      <form method="POST" action="/project/rules/restore" class="inline-form">
        <input type="hidden" name="projectId" value="${Oo(e.projectId)}" />
        <input type="hidden" name="ruleId" value="${Oo(e.ruleId)}" />
        ${r}
        <button class="btn btn-secondary btn-compact" type="submit">${Oo(D.undo)}</button>
      </form>
    </div>`},Mo=(e,t="error")=>`<p class="${t==="error"?"alert-error":"muted"}">${Oo(e)}</p>`,P8=e=>{let t=`/project?id=${encodeURIComponent(e.projectId)}&tab=harness&rulePrompt=${encodeURIComponent(e.prompt)}`;return`<p class="alert-error">${Oo(D.usageError)} <a href="${Oo(t)}">${Oo(D.tryAgain)}</a></p>`}});var fue,A8,b8=a(()=>{"use strict";Io();wI();kI();fue=(e,t)=>e.ok?"":e.reason==="forbidden"?Mo(D.ownerOnlyDrop):e.reason==="limit_exceeded"?Mo(D.limitReached):Mo(t==="restore"?D.restoreFailed:D.dropFailed),A8=e=>{if(e.usage===null)return Mo(D.connectComputer,"muted");if(!e.usage.ok)return e.usage.reason==="not_connected"?Mo(D.connectComputer,"muted"):e.usage.reason==="forbidden"?Mo(D.ownerOnlyUsage,"muted"):P8({projectId:e.projectId,prompt:e.prompt});let t="";return e.changeError!==void 0&&e.changeError!==null?t=fue(e.changeError,e.changeAction??"drop"):e.dropFlash&&(t=S8({projectId:e.projectId,ruleId:e.dropFlash.ruleId,title:e.dropFlash.title,prompt:e.prompt})),_I({projectId:e.projectId,rules:e.usage.data.rules,overlaps:e.usage.data.overlaps,flashHtml:t,prompt:e.prompt})}});var yue,$P,_8=a(()=>{"use strict";ka();zv();Io();PI();bI();b8();wI();yue=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,source:e.source,hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,severity:e.severity}),$P=e=>{let t=e.prompt?.trim()??"";if(t.length===0)return Tp({projectId:e.projectId,promptError:e.prompt!==null&&e.prompt!==void 0?D.emptyPrompt:null});if(e.rulesUnavailable||e.activeRules===null)return Tp({projectId:e.projectId,promptValue:t,resultHtml:Mo(D.rulesUnavailable,"muted")});let o=ha({pitfalls:e.activeRules.map(yue),text:t}).map(s=>({id:s.id,title:s.symptom,avoidance:s.avoidance})),n=$v({prompt:t,matched:o});return Tp({projectId:e.projectId,promptValue:t,resultHtml:AI({matched:o,tokens:n}),usageHtml:A8({projectId:e.projectId,prompt:t,usage:e.usage,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})})}});var k8=a(()=>{"use strict";CL();Sv();PI();bI();kI();_8()});var w8,R8=a(()=>{"use strict";gt();kP();k8();w8=async e=>{if(e.prompt===null)return $P({projectId:e.projectId,prompt:null,activeRules:[],usage:null});let t=e.cloudConfig===null?{ok:!1,reason:"not_connected"}:await jv({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:e.projectId,pairingHeaderName:re}),r=e.pitfalls,o=r==null||!r.ok,n=o?null:r.items.filter(s=>s.source!=="retired");return $P({projectId:e.projectId,prompt:e.prompt,activeRules:n,rulesUnavailable:o,usage:t,dropFlash:e.dropFlash,changeError:e.changeError,changeAction:e.changeAction})}});var RI,T8,E8=a(()=>{"use strict";gt();kP();RI=(e,t)=>e.get(t)?.trim()??"",T8=async e=>{let t=new URLSearchParams(e.rawBody),r=RI(t,"projectId"),o=RI(t,"ruleId"),n=RI(t,"rulePrompt");if(r.length===0||o.length===0)return{kind:"not_found"};let s=n.length>0?`&rulePrompt=${encodeURIComponent(n)}`:"",i=`/project?id=${encodeURIComponent(r)}&tab=harness${s}`;if(e.cloudConfig===null)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent("unavailable")}`};let l=await Nv({appOrigin:e.cloudConfig.appOrigin,pairingToken:e.cloudConfig.pairingToken,projectId:r,ruleId:o,action:e.action,pairingHeaderName:re});if(!l.ok)return{kind:"redirect",location:`${i}&ruleChangeError=${encodeURIComponent(l.reason)}&ruleChangeAction=${e.action}`};if(e.action==="drop"&&l.data.changed){let c=new URLSearchParams({id:r,tab:"harness",ruleDropped:l.data.rule.ruleId,ruleDroppedTitle:l.data.rule.title});return n.length>0&&c.set("rulePrompt",n),{kind:"redirect",location:`/project?${c.toString()}`}}return{kind:"redirect",location:i}}});var C8=a(()=>{"use strict"});var oi,hue,TI,L8=a(()=>{"use strict";Xh();kR();oi=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hue=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,TI=e=>{let t=e.flashError?`<div class="alert-error">${oi(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${oi(e.flashMessage)}</div>`:"",r=pu({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in AgentWitch Cloud",body:"Projects are created in the browser. This page chooses their folders on this computer and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in AgentWitch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${oi(hue(s))}</span>`:"",l=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${oi(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=Oy(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from AgentWitch Cloud? The folder on this computer stays.');">
                  <input type="hidden" name="projectId" value="${oi(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${oi(n.name)}</strong>
                  <span class="muted mono">${oi(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${l}${u}${g}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this computer</h1>
      <p class="lede">Synced from AgentWitch Cloud for this paired computer only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var v8=a(()=>{"use strict";C8();Dy();L8()});var zP,I8=a(()=>{"use strict";zP=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var x8,Sr,EI=a(()=>{"use strict";x8=m(require("node:path"));Rt();ze();K();X();cR();Sr=e=>{let t=H()?.layout.installDir??L();if(x8.default.basename(t)===Rr)return wt;let r=H(),o=r!==null?Be(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):wt}});var CI,W8=a(()=>{"use strict";xr();EI();CI=async e=>{let t=Ue(e.installDir),r=t?.bundleVersion??null,o=Sr(t);try{let n=await qi(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:es(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var LI,O8=a(()=>{"use strict";LI=e=>!e});var vI,gl,II=a(()=>{"use strict";K();vI=()=>`http://127.0.0.1:${vi()}/update/run`,gl=async e=>{try{let t=await fetch(vI(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var Sue,M8,xI,j8=a(()=>{"use strict";K();de();II();Sue=()=>{no({launchAgentLabel:Ae(),installDir:L()})},M8=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},xI=async()=>{Sue();let e=await gl({force:!0});if(e.ok)return{ok:!0,message:M8(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:M8(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(xr(),cD)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var WI=a(()=>{"use strict";iC();I8();EI();W8();O8();j8();II()});var N8,D8=a(()=>{"use strict";N8=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var H8,F8,OI,MI,$8=a(()=>{"use strict";H8=require("node:crypto"),F8=m(require("node:fs"));vt();X();X();D8();OI=!1,MI=async e=>{if(OI)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!N8(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=H();if(r===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let o=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&F8.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,H8.randomUUID)();OI=!0;try{if(await dR(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let l=await na({...r,workspace:n},e.writerAgent,t);return await Ld(o,s,l.exitCode,l.output)?{ok:l.exitCode===0,agentRunId:s,...l.exitCode===0?{}:{errorMessage:l.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{OI=!1}}});var z8=a(()=>{"use strict";$8()});var Ep,jI=a(()=>{"use strict";Ep=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var Pr,ve,Cn,ni,U8,Ln,Ie,UP,BP,B8,GP,VP,KP,NI,ae=a(()=>{"use strict";Pr="history",ve="skills",Cn="_drafts",ni="_tombstones",U8="state.json",Ln="meta.json",Ie="skillgen",UP="episodes.json",BP="budget.json",B8="metrics.jsonl",GP="SKILL.md",VP="meta.json",KP="learned-pitfalls.json",NI="flags.json"});var si,V8,bt,xe,Kt=a(()=>{"use strict";si=m(require("node:fs")),V8=m(require("node:path"));ae();bt=e=>{si.default.mkdirSync(e,{recursive:!0,mode:448});try{si.default.chmodSync(e,448)}catch{}},xe=(e,t)=>{bt(V8.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;si.default.writeFileSync(r,t,{mode:384});try{si.default.chmodSync(r,384)}catch{}si.default.renameSync(r,e);try{si.default.chmodSync(e,384)}catch{}}});var ii,ee,he,le=a(()=>{"use strict";ii=m(require("node:path"));K();jI();Kt();ae();ee=e=>{if(!Ep(e))throw new Error("invalid_project_id");let t=N();return ii.default.join(t.projectDataDir,e)},he=e=>{let t=ee(e);bt(t),bt(ii.default.join(t,Pr));let r=ii.default.join(t,ve);return bt(r),bt(ii.default.join(r,Cn)),bt(ii.default.join(r,ni)),bt(ii.default.join(t,Ie)),t}});var DI,HI,qP=a(()=>{"use strict";DI=/^[a-z0-9][a-z0-9_-]{0,63}$/,HI="sha256:"});var K8,st,Cp=a(()=>{"use strict";K8=require("node:crypto");qP();st=e=>`${HI}${(0,K8.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var ai,Lp=a(()=>{"use strict";qP();ai=e=>DI.test(e)});var vp,JP=a(()=>{"use strict";vp=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var FI,$I=a(()=>{"use strict";FI=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var zI,UI=a(()=>{"use strict";Lp();zI=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>ai(r.skillId))}catch{return[]}}});var BI,GI=a(()=>{"use strict";BI=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var VI,KI=a(()=>{"use strict";Cp();VI=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:st(t.body)===t.contentHash?t:null}catch{return null}}});var qI,JI=a(()=>{"use strict";Cp();Lp();qI=async e=>{if(!ai(e.skillId))return{ok:!1,code:"unavailable"};let t=st(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var YI,XI=a(()=>{"use strict";Lp();YI=async e=>{if(!ai(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var ZI,QI=a(()=>{"use strict";Cp();JP();KI();JI();ZI=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await VI({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(vp({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||st(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let l=await qI({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return l.ok?l.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:l.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var ex,tx=a(()=>{"use strict";JP();XI();ex=async e=>vp({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await YI({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var Ip,YP,q8=a(()=>{"use strict";$I();UI();GI();QI();tx();Ip="[project-skill-pull-mirror]",YP=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await FI({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await BI({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(Ip,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await ZI({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(u){console.warn(Ip,"skill_failed",d.skillId,u),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let l=await zI({port:t,projectId:e.projectId});for(let d of l)if(!s.has(d.skillId))try{i.push(await ex({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(u){console.warn(Ip,"orphan_tombstone_failed",d.skillId,u),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(Ip,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(Ip,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var li=a(()=>{"use strict";qP();Cp();Lp();JP();$I();UI();GI();KI();JI();XI();QI();tx();q8()});var ci,xp,Pue,Aue,ox,nx=a(()=>{"use strict";ci=m(require("node:fs")),xp=m(require("node:path"));Kt();li();ae();le();Pue=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Aue=e=>`v${String(e).padStart(4,"0")}.md`,ox=e=>{if(!Pue(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=he(e.projectId),r=xp.default.join(t,ve,e.skillId),o=xp.default.join(r,Aue(e.version)),n=xp.default.join(r,Ln),s=st(e.body);if(ci.default.existsSync(o)&&ci.default.existsSync(n))try{let l=JSON.parse(ci.default.readFileSync(n,"utf8"));if(l.version===e.version&&l.contentHash===s&&ci.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}xe(o,e.body),xe(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=xp.default.join(t,ve,ni,`${e.skillId}.json`);return ci.default.existsSync(i)&&ci.default.unlinkSync(i),{path:o,contentHash:s}}});var Wp,XP,sx,ix=a(()=>{"use strict";Wp=m(require("node:fs")),XP=m(require("node:path"));li();ae();le();sx=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=ee(e.projectId)}catch{return null}let r=XP.default.join(t,ve,e.skillId),o=XP.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=XP.default.join(r,Ln);if(!Wp.default.existsSync(o)||!Wp.default.existsSync(n))return null;try{let s=Wp.default.readFileSync(o,"utf8"),i=JSON.parse(Wp.default.readFileSync(n,"utf8")),l=typeof i.contentHash=="string"?i.contentHash:null;return l===null||i.version!==e.version||st(s)!==l?null:{body:s,contentHash:l}}catch{return null}}});var jo,vn,J8,bue,ax,lx,cx=a(()=>{"use strict";jo=m(require("node:fs")),vn=m(require("node:path"));Kt();ae();le();J8=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),bue=(e,t)=>{if(!jo.default.existsSync(e))return;let r=`.${t}.`;for(let o of jo.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=vn.default.join(e,o);try{jo.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},ax=e=>{if(!J8(e.skillId))throw new Error("invalid_project_skill_id");let t=he(e.projectId),r=vn.default.join(t,ve),o=vn.default.join(r,e.skillId),n=!1;if(jo.default.existsSync(o)){let c=vn.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{jo.default.renameSync(o,c),jo.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}bue(r,e.skillId);let s=vn.default.join(r,ni);bt(s);let i=vn.default.join(s,`${e.skillId}.json`),l={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return xe(i,`${JSON.stringify(l)}
`),{removed:n}},lx=e=>{if(!J8(e.skillId))return null;let t;try{t=ee(e.projectId)}catch{return null}let r=vn.default.join(t,ve,ni,`${e.skillId}.json`);if(!jo.default.existsSync(r))return null;try{let o=JSON.parse(jo.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var Op,dx,ux,px=a(()=>{"use strict";Op=m(require("node:fs")),dx=m(require("node:path"));ae();le();ux=e=>{let t;try{t=ee(e.projectId)}catch{return[]}let r=dx.default.join(t,ve);if(!Op.default.existsSync(r))return[];let o=[];for(let n of Op.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=dx.default.join(r,n,Ln);if(Op.default.existsSync(s))try{let i=JSON.parse(Op.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var mx,Y8,gx,fx=a(()=>{"use strict";mx=m(require("node:fs")),Y8=m(require("node:path"));Kt();ae();le();gx=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))throw new Error("invalid_message_id");let r=he(e.projectId),o=Y8.default.join(r,Pr,`${t}.json`);if(mx.default.existsSync(o))try{let s=JSON.parse(mx.default.readFileSync(o,"utf8"));if(s.messageId===t)return s}catch{}let n={messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString()};return xe(o,`${JSON.stringify(n)}
`),n}});var Mp,X8,Z8,yl,ZP,yx,hl=a(()=>{"use strict";Mp=m(require("node:fs")),X8=m(require("node:path"));Kt();ae();le();K();Z8=e=>X8.default.join(ee(e),Pr,U8),yl=e=>{try{let t=Z8(e);if(!Mp.default.existsSync(t))return null;let r=JSON.parse(Mp.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},ZP=e=>{he(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return xe(Z8(e.projectId),`${JSON.stringify(t)}
`),t},yx=()=>{let t=N().projectDataDir;if(!Mp.default.existsSync(t))return[];let r=[];for(let o of Mp.default.readdirSync(t)){if(!Ep(o))continue;let n=yl(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var Q8,e3=a(()=>{"use strict";gt();Q8=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[re]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var jp,t3,_ue,hx,r3=a(()=>{"use strict";Hr();X();hl();e3();fx();jp="[project-history-dispatch]",t3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_ue=()=>{let e=H();return e===null?null:V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},hx=async e=>{if(!t3(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!t3(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{gx({projectId:t,messageId:o,message:r}),ZP({projectId:t,state:"on_ready"})}catch(s){console.error(jp,"write_failed",t,o,s);try{ZP({projectId:t,state:"degraded"})}catch(i){console.error(jp,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?_ue():e.cloudApi;if(n===null)return console.error(jp,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await Q8({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(jp,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(jp,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var it=a(()=>{"use strict"});var Sx,Px=a(()=>{"use strict";px();hl();ix();le();cx();nx();Sx=()=>({isHistoryEnabled:e=>{let t=yl(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>ee(e),writeProjectSkillVersion:e=>ox(e),readProjectSkillVersion:e=>sx(e),tombstoneProjectSkill:e=>ax(e),readProjectSkillTombstone:e=>lx(e),listProjectSkillIds:e=>ux(e)})});var o3,Ax,bx=a(()=>{"use strict";gt();o3=e=>({[re]:e,Accept:"application/json"}),Ax=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:o3(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let l=s;return{skillId:l.skillId,publishedVersion:l.publishedVersion,contentHash:l.contentHash,...typeof l.skillRowId=="string"?{skillRowId:l.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:o3(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var _x,kx=a(()=>{"use strict";it();_x=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var wx,Rx=a(()=>{"use strict";it();wx=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(u=>u.createdAtMs)),i=n.length>=t,l=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!l&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":l?"idle":"max_interval",messageIds:n.map(u=>u.messageId)}}});var QP,Tx=a(()=>{"use strict";it();QP=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var d3,u3,wue,eA,Ex=a(()=>{"use strict";it();d3=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),u3=e=>e.trim().toLowerCase().replace(/\s+/g," "),wue=(e,t)=>{let r=new Set(e.map(u3).filter(i=>i.length>0)),o=new Set(t.map(u3).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},eA=e=>{let t=e.nearDupJaccard??.6,r=d3(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(d3(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(wue(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var Cx,Lx=a(()=>{"use strict";Cx=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var vx,Tue,Ix,Eue,xx,Wx=a(()=>{"use strict";it();vx=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},Tue=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,Ix=e=>Tue.test(e),Eue=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,xx=e=>Eue.test(e)});var Np,tA=a(()=>{"use strict";Np=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var p3,Sl,m3,Dp=a(()=>{"use strict";ct();p3=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,Sl=e=>{let t=en(e),r=t.scrubbed.match(p3)?.length??0,o=t.scrubbed.replace(p3,"[redacted-email]");return{scrubbed:o,residualSecret:Uc(o),replacementCount:t.replacementCount+r}},m3=e=>Uc(e)});var Ox,Mx,jx,Hp=a(()=>{"use strict";Ox=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],Mx={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},jx=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var Nx,Dx=a(()=>{"use strict";Hp();Nx=(e,t)=>{let r=Mx[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var Cue,Zr,Fx=a(()=>{"use strict";Dx();it();Cue=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},Zr=e=>{let t=Cue(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=Nx(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var Iue,g3,xue,Wue,$x,Fp,rA=a(()=>{"use strict";it();Dp();Iue=/^[a-z0-9][a-z0-9-]{0,63}$/,g3=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let l=i.indexOf(":");if(l<=0)continue;let c=i.slice(0,l).trim(),d=i.slice(l+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},xue=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,Wue=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},$x=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(m3(o))return{ok:!1,reason:"residual_secret"};let s=g3(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:l}=s,c=i.name??"";if(!Iue.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let u=i.version??"";if(u.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let g=Wue(i.source_message_ids??i.source_message_ids);if(g===null||g.length===0)return{ok:!1,reason:"missing_source_message_ids"};let f=xue(l);return f<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:u,sourceMessageIds:g,stepCount:f,bodyBytes:n}},Fp=e=>(((g3(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var f3,Mue,Qr,oA,nA=a(()=>{"use strict";f3=require("node:crypto");li();it();kx();Rx();Tx();Ex();Lx();Wx();tA();Dp();Fx();rA();Mue=e=>Math.ceil(e.length/4),Qr=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),oA=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??Mue,l=e.messages.map(u=>u.text).join(`
`),c=(u,g,f)=>{r.push(Np({projectId:t.projectId,episodeId:t.episodeId,fromState:u,toState:g,reason:f,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let u=0;u<16;u+=1){let g=QP({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let f=wx({messages:e.messages.map(S=>({messageId:S.messageId,createdAtMs:S.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),y=Zr({state:t.state,verdict:{kind:"close",ready:f.ready}});if(!y.ok)break;let A=t.state;t=Qr(t,y.nextState,f.ready?f.reason:null,{messageIds:f.ready?f.messageIds:t.messageIds,closedAtMs:f.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(S=>xx(S.text)),hasSuccessSignal:e.messages.some(S=>Ix(S.text))}),c(A,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(g.capReached){let S=Zr({state:t.state,verdict:{kind:"draft_cap",reached:!0}});S.ok&&(c(t.state,S.nextState,"draft_cap_reached"),t=Qr(t,S.nextState,"draft_cap_reached"));break}let f=_x({tokensUsedToday:e.tokensUsedToday+n}),y=Zr({state:t.state,verdict:{kind:"budget",ok:f.ok}});if(!y.ok)break;let A=t.state;t=Qr(t,y.nextState,f.ok?"budget_ok":f.reason),c(A,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let f=Sl(l),y=Zr({state:t.state,verdict:{kind:"scrub",residualSecret:f.residualSecret}});if(!y.ok)break;let A=t.state;t=Qr(t,y.nextState,f.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:f.scrubbed}),c(A,t.state,t.reason);continue}if(t.state==="TRIAGE"){let f=vx({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),y=Zr({state:t.state,verdict:{kind:"qualify",ok:f.ok}});if(!y.ok)break;let A=t.state;t=Qr(t,y.nextState,f.reason),c(A,t.state,t.reason);continue}if(t.state==="DEDUP"){let f=st(t.scrubbedTranscript??l),y=eA({contentHash:f,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((y.action==="create_new"||y.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let A=Zr({state:t.state,verdict:{kind:"dedup",action:y.action}});if(!A.ok)break;let S=t.state;t=Qr(t,A.nextState,y.action,{contentHash:f,mergeDraftId:y.action==="update_draft"?y.draftId:t.mergeDraftId}),c(S,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let f=t.scrubbedTranscript??"",y=Cx({estimatedInputTokens:i(f),inputTokenCap:12e3}),A=await e.deps.ownerLlm({scrubbedTranscript:f,similarDraftHints:[],mode:y});n+=A.tokensUsed;let S=Zr({state:t.state,verdict:{kind:"extract",ok:A.ok}});if(!S.ok)break;let P=t.state;A.ok&&(s=A.skillMarkdown),t=Qr(t,S.nextState,A.ok?"extract_ok":A.reason,{tokensUsed:t.tokensUsed+A.tokensUsed}),c(P,t.state,t.reason);continue}if(t.state==="VALIDATE"){let f=s??"",y=$x({skillMarkdown:f}),A=t.validateAttempts+(y.ok?0:1),S=Zr({state:t.state,verdict:{kind:"validate",ok:y.ok,attempts:y.ok?t.validateAttempts:Math.max(1,A)}});if(!S.ok)break;let P=t.state;if(y.ok){let p=st(f),b=Fp(f),C=eA({contentHash:p,name:y.name,stepLines:b,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(C.action==="skip_exact"){t=Qr(t,"SKIPPED_DEDUP","skip_exact",{contentHash:p,validateAttempts:A}),c(P,t.state,"skip_exact");break}let h=C.action==="update_draft"?C.draftId:t.mergeDraftId??(0,f3.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:h,skillMarkdown:f,episodeId:t.episodeId,sourceMessageIds:y.sourceMessageIds,name:y.name,description:y.description}),t=Qr(t,S.nextState,"validate_ok",{draftId:h,contentHash:o.contentHash,validateAttempts:A}),c(P,t.state,t.reason);break}if(S.nextState==="EXTRACT"&&(s=null),t=Qr(t,S.nextState,y.reason,{validateAttempts:A}),c(P,t.state,t.reason),S.nextState==="EXTRACT"&&A>1)break;continue}break}let d=QP({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var zx,Ux,$p,sA=a(()=>{"use strict";zx=m(require("node:fs")),Ux=m(require("node:path"));Kt();ae();le();$p=e=>{if(e.events.length===0)return;let t=he(e.projectId),r=Ux.default.join(t,Ie);bt(r);let o=Ux.default.join(r,B8),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;zx.default.appendFileSync(o,n,{mode:384});try{zx.default.chmodSync(o,384)}catch{}}});var Pl,iA=a(()=>{"use strict";Pl=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var P3,y3,h3,Nue,Due,Bx,Gx=a(()=>{"use strict";P3=require("node:crypto");it();iA();Dp();y3=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,h3=e=>e.toLowerCase().replace(/_/g," "),Nue=(e,t)=>`sha256:${(0,P3.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,Due=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},Bx=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],l=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():h3(c.state),u=Sl(d);if(u.residualSecret){l+=1;continue}let g=`Avoid repeating this history failure (${h3(c.state)}).`,f=Sl(g);if(f.residualSecret){l+=1;continue}let y=y3(u.scrubbed.replace(/\s+/g," ").trim(),120),A=y3(f.scrubbed.replace(/\s+/g," ").trim(),280);if(y.length===0||A.length===0)continue;let S=Pl(`${y}|${A}`);if(n.has(S))continue;n.add(S);let P=Nue(y,A),p=`- **${y}:** ${A}`;s.length<t&&s.push(p),i.length<r&&i.push({id:Due(c.episodeId,P),symptom:y,avoidance:A,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:P,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:l}}});var Hue,Vx,Kx=a(()=>{"use strict";iA();it();Hue=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},Vx=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?Hue(n[3]??""):[],i=new Set(s.map(g=>Pl(g))),l=[...s],c=0;for(let g of e.newPitfallLines){let f=g.trim();if(f.length===0)continue;let y=f.startsWith("- ")?f:`- ${f}`,A=Pl(y);if(!i.has(A)){if(l.length>=t)break;i.add(A),l.push(y),c+=1}}let d=l.length>0?`${l.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(f,y,A)=>`${y}${A}${d}`),appendedCount:c,totalPitfallBullets:l.length};let u=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${u}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:l.length}}});var qx,b3,A3,cA,Jx,Yx=a(()=>{"use strict";qx=m(require("node:fs")),b3=m(require("node:path"));ae();le();A3="[project-history-skillgen]",cA=()=>({items:[],updatedAt:new Date(0).toISOString()}),Jx=e=>{let t=b3.default.join(ee(e),Ie,KP);if(!qx.default.existsSync(t))return cA();try{let r=JSON.parse(qx.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(A3,"learned_pitfalls_corrupt",e),cA()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:cA().updatedAt}}catch(r){return console.error(A3,"learned_pitfalls_read_failed",e,r),cA()}}});var Fue,_3,k3=a(()=>{"use strict";Fue=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],_3=e=>Fue.includes(e)});var Xx,Zx=a(()=>{"use strict";k3();Xx=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||_3(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var Qx,zp,$ue,Up,eW,dA=a(()=>{"use strict";Qx=m(require("node:fs")),zp=m(require("node:path"));li();Kt();ae();le();$ue=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),Up=e=>{if(!$ue(e.draftId))throw new Error("invalid_draft_id");let t=he(e.projectId),r=zp.default.join(t,ve,Cn,e.draftId);bt(r);let o=zp.default.join(r,GP),n=zp.default.join(r,VP),s=st(e.skillMarkdown);return xe(o,e.skillMarkdown),xe(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},eW=e=>{let t=he(e),r=zp.default.join(t,ve,Cn);return Qx.default.existsSync(r)?Qx.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var w3,tW,rW=a(()=>{"use strict";w3=m(require("node:path"));Kt();ae();le();tW=e=>{let t=he(e.projectId),r=w3.default.join(t,Ie,KP),o={...e.file,updatedAt:new Date().toISOString()};return xe(r,`${JSON.stringify(o)}
`),o}});var R3,oW,nW=a(()=>{"use strict";R3=m(require("node:path"));Kt();ae();le();oW=e=>{let t=he(e.projectId),r=R3.default.join(t,Ie,NI),o={...e.file,updatedAt:new Date().toISOString()};return xe(r,`${JSON.stringify(o)}
`),o}});var iW,T3,sW,zue,Uue,uA,aW,lW=a(()=>{"use strict";iW=m(require("node:fs")),T3=m(require("node:path"));sA();Gx();Kx();it();Yx();tA();Zx();dA();rW();nW();sW="[project-history-skillgen]",zue=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},Uue=e=>{try{let t=JSON.parse(iW.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},uA=e=>{try{$p({projectId:e.projectId,events:[Np({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},aW=e=>{let t=new Date(e.nowMs).toISOString();try{let r=Xx({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=Bx({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=Uue(e.draftWritten.metaPath),i=iW.default.readFileSync(e.draftWritten.skillPath,"utf8"),l=Vx({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=l.appendedCount,l.skillMarkdown!==i&&Up({projectId:e.projectId,draftId:T3.default.basename(e.draftWritten.draftDir),skillMarkdown:l.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(sW,"pitfalls_draft_merge_failed",e.projectId,s),uA({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=Jx(e.projectId),i=zue(s.items,o.localEntries);return tW({projectId:e.projectId,file:{items:i,updatedAt:t}}),oW({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},updatedAt:t}}),uA({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(sW,"pitfalls_store_failed",e.projectId,s),uA({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(sW,"pitfalls_attach_failed",e.projectId,r),uA({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var Bp,pA=a(()=>{"use strict";Bp=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var E3,C3=a(()=>{"use strict";Hp();E3=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&jx.includes(o.state))return o}return null}});var cW,dW=a(()=>{"use strict";cW=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var uW,L3,Bue,pW,mW=a(()=>{"use strict";uW=m(require("node:fs")),L3=m(require("node:path"));ae();le();Bue=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},pW=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=L3.default.join(ee(e.projectId),Pr,`${t}.json`);if(!uW.default.existsSync(r))return null;try{let o=JSON.parse(uW.default.readFileSync(r,"utf8"));return Bue(o)?o:null}catch{return null}}});var gW,v3,Gp,mA=a(()=>{"use strict";gW=m(require("node:fs")),v3=m(require("node:path"));ae();mW();le();Gp=e=>{let t=v3.default.join(ee(e),Pr);if(!gW.default.existsSync(t))return[];let r=gW.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=pW({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),l=Date.parse(s.savedAt);return i!==l?i-l:n.messageId.localeCompare(s.messageId)})}});var di,gA,I3,x3=a(()=>{"use strict";di=m(require("node:fs")),gA=m(require("node:path"));ae();le();rA();I3=e=>{let t=gA.default.join(ee(e),ve,Cn);if(!di.default.existsSync(t))return[];let r=[];for(let o of di.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=gA.default.join(t,o.name,GP),s=gA.default.join(t,o.name,VP);if(di.default.existsSync(n))try{let i=di.default.readFileSync(n,"utf8"),l="",c=o.name;if(di.default.existsSync(s)){let d=JSON.parse(di.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(l=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(l.length===0)continue;r.push({id:o.name,contentHash:l,name:c,stepLines:Fp(i)})}catch{}}return r}});var Vp,fW,W3,O3=a(()=>{"use strict";Vp=m(require("node:fs")),fW=m(require("node:path"));ae();le();W3=e=>{let t=fW.default.join(ee(e),ve);if(!Vp.default.existsSync(t))return[];let r=[];for(let o of Vp.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=fW.default.join(t,o.name,Ln);if(Vp.default.existsSync(n))try{let s=JSON.parse(Vp.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var Gue,yW,hW=a(()=>{"use strict";pA();mA();Gue=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,yW=e=>{let t=Gp(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||Gue(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:Bp(o)})}return r}});var M3,j3=a(()=>{"use strict";M3=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var N3,SW,PW=a(()=>{"use strict";N3=m(require("node:path"));Kt();ae();le();SW=e=>{let t=he(e.projectId),r=N3.default.join(t,Ie,BP),o={...e.budget,updatedAt:new Date().toISOString()};return xe(r,`${JSON.stringify(o)}
`),o}});var D3,AW,bW=a(()=>{"use strict";D3=m(require("node:path"));Kt();ae();le();AW=e=>{let t=he(e.projectId),r=D3.default.join(t,Ie,UP),o={...e.file,updatedAt:new Date().toISOString()};return xe(r,`${JSON.stringify(o)}
`),o}});var H3,F3=a(()=>{"use strict";sA();j3();PW();bW();H3=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,l=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],l=t.episode.lastMessageAtMs??l),AW({projectId:n,file:{episodes:M3(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:l,updatedAt:new Date(s).toISOString()}}),SW({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),$p({projectId:n,events:t.metrics})}});var fA,_W=a(()=>{"use strict";fA=e=>new Date(e).toISOString().slice(0,10)});var yA,$3=a(()=>{"use strict";_W();yA=e=>({dayKey:fA(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var kW,U3,z3,Vue,wW,RW=a(()=>{"use strict";kW=m(require("node:fs")),U3=m(require("node:path"));$3();ae();le();_W();z3="[project-history-skillgen]",Vue=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=fA(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},wW=e=>{let t=U3.default.join(ee(e.projectId),Ie,BP);if(!kW.default.existsSync(t))return yA(e.nowMs);try{let r=JSON.parse(kW.default.readFileSync(t,"utf8")),o=Vue(r,e.nowMs);return o===null?(console.error(z3,"budget_corrupt",e.projectId),yA(e.nowMs)):o}catch(r){return console.error(z3,"budget_read_failed",e.projectId,r),yA(e.nowMs)}}});var hA,B3=a(()=>{"use strict";hA=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var TW,V3,G3,Kue,que,Jue,EW,CW=a(()=>{"use strict";TW=m(require("node:fs")),V3=m(require("node:path"));B3();Hp();ae();le();G3="[project-history-skillgen]",Kue=e=>typeof e=="string"&&Ox.includes(e),que=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&Kue(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},Jue=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(que);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},EW=e=>{let t=V3.default.join(ee(e),Ie,UP);if(!TW.default.existsSync(t))return hA();try{let r=JSON.parse(TW.default.readFileSync(t,"utf8")),o=Jue(r);return o===null?(console.error(G3,"episodes_corrupt",e),hA()):o}catch(r){return console.error(G3,"episodes_read_failed",e,r),hA()}}});var K3,Yue,Xue,LW,vW=a(()=>{"use strict";K3=require("node:crypto");nA();lW();pA();C3();dW();mA();x3();O3();hW();hl();F3();RW();CW();dA();Yue="[project-history-skillgen]",Xue=(e,t)=>{let r=new Map;for(let o of Gp(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:Bp(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},LW=(e={})=>{let t=e.ownerLlm??null,r=e.nowMs??Date.now;return async o=>{try{let n=yl(o.projectId);if(!cW(n?.state))return;let s=r(),i=EW(o.projectId),l=wW({projectId:o.projectId,nowMs:s}),c=yW({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=E3(i.episodes,o.projectId);if(d===null){if(c.length===0)return;let f=c[0],y=c[c.length-1];d={episodeId:(0,K3.randomUUID)(),projectId:o.projectId,state:"CAPTURING",messageIds:c.map(A=>A.messageId),startedAtMs:f.createdAtMs,lastMessageAtMs:y.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}}else if(d.state==="CAPTURING"&&c.length>0){let f=new Set(d.messageIds),y=[...d.messageIds],A=d.lastMessageAtMs;for(let S of c)f.has(S.messageId)||(y.push(S.messageId),f.add(S.messageId),A=Math.max(A,S.createdAtMs));d={...d,messageIds:y,lastMessageAtMs:A}}let u=Xue(o.projectId,d.messageIds);if(u.length===0)return;let g=await oA({episode:d,messages:u,tokensUsedToday:l.tokensUsedToday,lastClosedAtMs:l.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:Up,listDraftFingerprints:()=>I3(o.projectId),listPublishedFingerprints:()=>W3(o.projectId),openDraftCount:()=>eW(o.projectId)}});if(H3({projectId:o.projectId,episodesFile:i,budget:l,result:g,nowMs:s}),g.draftWritten!==null&&g.episode.state==="AWAITING_REVIEW"){let f=[...i.episodes.filter(y=>y.episodeId!==g.episode.episodeId),g.episode];aW({projectId:o.projectId,successEpisode:g.episode,episodes:f,draftWritten:g.draftWritten,nowMs:s})}}catch(n){console.error(Yue,"run_failed",o.projectId,n)}}}});var IW,xW,WW=a(()=>{"use strict";li();X();Hr();bx();Px();vW();hl();IW="[project-history-tick]",xW=async(e={})=>{let t=e.listProjectIds?.()??yx();if(t.length===0)return;let r=H(),o=e.cloudApi!==void 0?e.cloudApi:r===null?null:V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),n=Sx(),s=e.pullSkills??YP,i=e.runSkillgen??LW({ownerLlm:e.ownerLlm??null});for(let l of t){try{await i({projectId:l})}catch(c){console.error(IW,"skillgen_failed",l,c)}if(o===null){console.error(IW,"pull_skipped_no_cloud_api",l);continue}try{await s({projectId:l,deps:{history:n,awcPublished:Ax(o)}})}catch(c){console.error(IW,"pull_failed",l,c)}}}});var OW,J3=a(()=>{"use strict";it();WW();OW=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>xW());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var Y3=a(()=>{"use strict";ae();le()});var X3=a(()=>{"use strict";nA()});var Z3=a(()=>{"use strict";ae();le()});var MW=a(()=>{"use strict";jI();le();nx();ix();cx();px();fx();r3();it();Px();bx();WW();li();J3();hl();it();Rx();kx();Wx();Dp();Ex();Lx();rA();dA();Tx();tA();Y3();Dx();Fx();nA();X3();Hp();mW();mA();pA();hW();CW();bW();RW();PW();sA();vW();dW();iA();Zx();Gx();Kx();lW();Yx();rW();Z3();nW();it()});var qt,Zue,Q3,e6,jW,NW,DW,HW,FW,$W,zW=a(()=>{"use strict";qt=require("node:crypto"),Zue=Buffer.from("302a300506032b6570032100","hex"),Q3=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},e6=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,qt.createPublicKey)({key:Buffer.concat([Zue,t]),format:"der",type:"spki"})},jW=()=>{let{publicKey:e,privateKey:t}=(0,qt.generateKeyPairSync)("ed25519");return{publicKeyRaw:Q3(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},NW=e=>(0,qt.createPrivateKey)(e),DW=(e,t)=>(0,qt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),HW=(e,t,r)=>{try{let o=e6(e);return(0,qt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},FW=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,$W=()=>(0,qt.randomBytes)(32).toString("base64url")});var No,SA,t6,Que,epe,PA,UW,BW,r6=a(()=>{"use strict";No=m(require("node:fs")),SA=m(require("node:path"));zW();K();ze();t6=e=>SA.default.join(e.installDir,Vo),Que=(e,t)=>{if(e.profileEmail===null||t===t6(e)||No.default.existsSync(t))return;let r=t6(e);No.default.existsSync(r)&&(No.default.mkdirSync(SA.default.dirname(t),{recursive:!0}),No.default.renameSync(r,t))},epe=e=>{if(!No.default.existsSync(e))return null;try{let t=No.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},PA=e=>{let t=nc(e);Que(e,t);let r=epe(t);if(r!==null)return r;let o=jW();return No.default.mkdirSync(SA.default.dirname(t),{recursive:!0}),No.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},UW=e=>{let t=PA(e.layout),r=$W(),o=FW({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=NW(t.privateKeyPem),s=DW(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},BW=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return HW(e.serverPublicKey,t,e.serverAttestation)}});var GW=a(()=>{"use strict";r6();zW()});var o6,n6,s6=a(()=>{"use strict";o6=m(require("node:path")),n6=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:o6.default.basename(e.installDir)})});var i6=a(()=>{"use strict";Gn()});var d6,Kp,qW,JW,a6,rpe,VW,AA,Pe,u6,ope,KW,npe,spe,YW,Se,Fe,at,ipe,l6,c6,qp,Jp,p6=a(()=>{"use strict";d6=m(require("node:http")),Kp=m(require("node:fs")),qW=m(require("node:path"));bA();su();LB();IB();NB();as();OE();nC();dG();pG();kP();g4();ka();Kv();w4();D4();F4();HP();Q4();c8();ln();vt();gt();d8();p8();LR();ST();IR();f8();R8();E8();v8();WI();xr();z8();MW();X();GW();s6();i6();JW=e=>_E(e)??"never",a6=48e3,rpe=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,VW=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??by(),reveal:t.reveal,installed:Dr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),AA=async e=>{let t=H();return t===null?{ok:!1,projects:[],message:"Client config missing \u2014 pair this computer in AgentWitch Cloud to load projects."}:Fr(t,e)},Pe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),u6=200,ope=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',KW=e=>{let t=e.trim().slice(0,u6),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},npe=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${Pe(t)}</div>`,spe=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${Pe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',YW={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},Se=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...YW}),e.end(JSON.stringify(r))},Fe=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},at=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},ipe=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=ope(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${Pe(e.status.wakeError)}</div>`:"",n=e.revived?`<div class="alert-success">${Pe(FE(process.platform))}</div>`:"",s=LI(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for AgentWitch on this computer.</p>
      ${n}
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${iu(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${Pe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${Pe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${Pe(JW(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${Pe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},l6=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},c6=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,u6)},qp=e=>{let t=qW.default.join(e.layout.installDir,"link-code.txt"),r=()=>Ue(e.layout.installDir),o=()=>{let S=r();return{installBundleVersion:zP(S),installBundleUpdatedAt:S?.updatedAt??null,installVersion:S}},n=async S=>{let P=S.installVersion??r(),p=await i(),b=dC(p),C=S.updateFlash??null,h=uC(C),_=npe(C,S.updateError??null);return lC({title:S.title,activePath:S.activePath,body:S.body,cloudAppOrigin:Sr(P),installBundleVersionLabel:zP(P),prependBody:`${h}${_}${b}`,headerUpdateButtonHtml:cC(p)})},s=null,i=async()=>{let S=Date.now();if(s!==null&&S-s.cachedAtMs<6e4)return s.offer;let P=await CI(e.layout);return s={cachedAtMs:S,offer:P},P},l=()=>{s=null},c=!1,d=async S=>{if(l(),!(await i()).updateAvailable){S.writeHead(303,{Location:"/?update=ok"}),S.end();return}if(c){S.writeHead(303,{Location:KW("An update is already running.")}),S.end();return}c=!0;try{let p=await xI(),b=p.ok?"/?update=ok":KW(p.message);S.writeHead(303,{Location:b}),S.end()}catch(p){let b=p instanceof Error&&p.message.trim().length>0?p.message:"Install bundle update failed.";S.writeHead(303,{Location:KW(b)}),S.end()}finally{c=!1,l()}},u=async(S,P)=>{let p=P==="Project not found"?"That project is not available on this computer.":"That page does not exist on this computer.",b=o(),C=await n({title:P,activePath:P==="Project not found"?"/projects":"/",installVersion:b.installVersion,body:`<section class="card">
      <h1>${Pe(P)}</h1>
      <p>${Pe(p)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});S.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),S.end(C)},g=()=>{if(Kp.default.existsSync(t))return Kp.default.readFileSync(t,"utf8").trim();let S=Math.random().toString(36).slice(2,8).toUpperCase();return Kp.default.writeFileSync(t,S,"utf8"),S},f=Tn({layout:e.layout}),y=d6.default.createServer((S,P)=>{(async()=>{let p=S.url?.split("?")[0]??"/",b=S.method??"GET";if(b==="OPTIONS"){P.writeHead(204,YW),P.end();return}if(await xv({method:b,pathname:p,request:S,response:P,requestUrl:S.url??"/",storePath:k4(qW.default.dirname(e.layout.configPath)),readBody:at,sendHtml:Fe,renderShell:n})||await m4({method:b,pathname:p,request:S,response:P,configPath:e.layout.configPath,readBody:at,sendJson:Se})||await uh({method:b,pathname:p,request:S,response:P,layout:e.layout,readBody:at,sendJson:Se})||await EP({method:b,pathname:p,request:S,response:P,layout:e.layout,readBody:at,sendJson:Se,server:f}))return;if(b==="GET"&&p==="/health"){let h=e.controllers.getStatus(),_=o();Se(P,200,{ok:!0,...h,installBundleVersion:_.installBundleVersion,installBundleUpdatedAt:_.installBundleUpdatedAt,...n6({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(b==="GET"&&p==="/api/status"){let h=o();Se(P,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:h.installBundleVersion,installBundleUpdatedAt:h.installBundleUpdatedAt});return}if(b==="GET"&&p==="/api/traffic"){Se(P,200,{entries:ou(e.layout)});return}if(b==="DELETE"&&p==="/api/traffic"||b==="POST"&&p==="/api/traffic/clear"){if(RE(e.layout),b==="POST"){P.writeHead(303,{Location:"/traffic?cleared=1"}),P.end();return}Se(P,200,{ok:!0});return}if(b==="GET"&&p==="/api/trace"){Se(P,200,{entries:$h(e.layout)});return}if(b==="DELETE"&&p==="/api/trace"||b==="POST"&&p==="/api/trace/clear"){if(CE(e.layout),b==="POST"){P.writeHead(303,{Location:"/status"}),P.end();return}Se(P,200,{ok:!0});return}if(b==="POST"&&p==="/api/errors/clear"){LE(e.layout.errorLogPath),P.writeHead(303,{Location:"/errors?cleared=1"}),P.end();return}if(b==="GET"&&p==="/api/knowledge"){let _=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(_.length>0){let w=await ja({layout:e.layout,query:_,limit:20});Se(P,200,{chunks:w,query:_});return}Se(P,200,{chunks:Ma(e.layout).slice(-50).reverse()});return}if(b==="POST"&&p==="/api/revive"){e.controllers.reviveWebSocket(),P.writeHead(303,{Location:"/status?revived=1"}),P.end();return}if(b==="GET"&&p==="/api/update-status"){let h=await i();Se(P,200,{ok:!0,...h});return}if((b==="GET"||b==="POST")&&p==="/api/update"){await d(P);return}if(b==="GET"&&p==="/"){let h=e.controllers.getStatus(),_=o(),w=Dr(e.layout),R=zh(e.layout.errorLogPath);Fe(P,await n({title:"Home",activePath:"/",installVersion:_.installVersion,updateFlash:l6(S.url??void 0),updateError:c6(S.url??void 0),body:pC({wsConnected:h.wsConnected,lastHeartbeatAt:h.lastHeartbeatAt,installBundleVersion:_.installBundleVersion,harnessSetCount:w.sets.length,knowledgeChunkCount:Ma(e.layout).length,trafficEntryCount:ou(e.layout).length,wakeError:h.wakeError,errorLogByteSize:R.byteSize,errorLogExists:R.exists})}));return}if(b==="GET"&&p==="/task"){let h=e.controllers.getStatus(),_=o(),w=H(),R=new URL(S.url??"/",`http://127.0.0.1:${43347}`),E=R.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,x=R.searchParams.get("failed")==="1"?R.searchParams.get("error")?.trim()??"Task failed.":null,W=R.searchParams.get("runId");Fe(P,await n({title:"Task",activePath:"/task",installVersion:_.installVersion,body:qv({defaultWorkspace:w?.workspace??"",wsConnected:h.wsConnected,flashMessage:E,flashError:x,lastRunId:W})}));return}if(b==="POST"&&p==="/task/dispatch"){let h=await at(S),_=new URLSearchParams(h),w=_.get("prompt")?.trim()??"",R=_.get("writerAgent")?.trim()??"claude-cli",E=_.get("projectFolder")?.trim()??"",x=await MI({prompt:w,writerAgent:R,...E.length>0?{projectFolderPath:E}:{}}),W=new URLSearchParams;x.ok?W.set("ok","1"):(W.set("failed","1"),x.errorMessage!==void 0&&W.set("error",x.errorMessage.slice(0,240))),x.agentRunId!==void 0&&W.set("runId",x.agentRunId),P.writeHead(303,{Location:`/task?${W.toString()}`}),P.end();return}if(b==="GET"&&p==="/writer-sessions"){let h=o(),_=MP(e.layout,12);Fe(P,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:h.installVersion,updateFlash:l6(S.url??void 0),updateError:c6(S.url??void 0),body:tI({sessions:_})}));return}if(b==="GET"&&p==="/errors"){let h=o(),_=zh(e.layout.errorLogPath);Fe(P,await n({title:"Errors",activePath:"/errors",installVersion:h.installVersion,body:IE({errorLogPath:e.layout.errorLogPath,content:_.content,exists:_.exists,truncated:_.truncated,byteSize:_.byteSize,cleared:new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(b==="GET"&&p==="/status"){let h=new URL(S.url??"/",`http://127.0.0.1:${43347}`),_=e.controllers.getStatus(),w=We(e.layout),R=w!==null?Ge(w,12e4):ME(_.lastHeartbeatAt,12e4),E=jE({lastHeartbeatAt:_.lastHeartbeatAt,heartbeatIsStale:R}),x=o();Fe(P,await n({title:"Status",activePath:"/status",installVersion:x.installVersion,body:`${ipe({status:_,healthBadge:E,revived:h.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:x.installBundleVersion,installBundleUpdatedAt:x.installBundleUpdatedAt})}${HE({installDir:e.layout.installDir,platform:process.platform})}${DE({entries:$h(e.layout)})}`}));return}if(b==="GET"&&p==="/traffic"){let h=new URL(S.url??"/",`http://127.0.0.1:${43347}`),_=ou(e.layout),w=o(),R=_.map(W=>`<tr><td title="${Pe(W.at)}">${Pe(JW(W.at))}</td><td>${Pe(W.direction)}</td><td><code>${Pe(W.type)}</code></td><td>${Pe(W.summary)}</td><td>${Pe(W.action??"")}</td></tr>`).join(""),E=_.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${R}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',x=h.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Fe(P,await n({title:"Traffic",activePath:"/traffic",installVersion:w.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${x}
              ${E}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(b==="GET"&&p==="/projects"){let h=new URL(S.url??"/",`http://127.0.0.1:${43347}`),_=o(),w=Sr(_.installVersion),R=await AA(e.layout),E=h.searchParams.get("folderError")==="1"?"Could not save the selected folder to AgentWitch. Check the Mac connection and try again.":h.searchParams.get("deleteError")==="1"?"Could not delete the project in AgentWitch Cloud. Check pairing on Status.":null,x=h.searchParams.get("deleted")==="1"?"Project removed from AgentWitch Cloud. Folders on your computer were not deleted.":null,W=H(),z=W===null?null:V({wsUrl:W.wsUrl,pairingToken:W.pairingToken}),O=z===null?{}:Object.fromEntries((await Promise.all(R.projects.map(async U=>{let pe=await SI(z,U.id);return[U.id,pe?.counts??null]}))).filter(U=>U[1]!==null));Fe(P,await n({title:"Projects",activePath:"/projects",installVersion:_.installVersion,body:TI({projects:R.projects,compositionCountsByProjectId:O,cloudAppOrigin:w,syncMessage:R.message,syncOk:R.ok,flashMessage:x,flashError:E})}));return}if(b==="GET"&&p==="/projects/select-folder"){let _=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",w=H(),R=w===null?null:V({wsUrl:w.wsUrl,pairingToken:w.pairingToken}),E=_.length>0&&R!==null?un():null;if(E===null||R===null){P.writeHead(303,{Location:"/projects"}),P.end();return}if(dt({projectFolderPath:E}),!await xd(R,_,E)){P.writeHead(303,{Location:"/projects?folderError=1"}),P.end();return}P.writeHead(303,{Location:`/project?id=${encodeURIComponent(_)}&folderUpdated=1`}),P.end();return}if(b==="POST"&&p==="/projects/delete"){let h=await at(S),_=new URLSearchParams(h).get("projectId")?.trim()??"",w=H(),R=w===null?null:V({wsUrl:w.wsUrl,pairingToken:w.pairingToken});if(R===null||_.length===0){P.writeHead(303,{Location:"/projects?deleteError=1"}),P.end();return}let E=await FR(R,_);P.writeHead(303,{Location:E.ok?"/projects?deleted=1":"/projects?deleteError=1"}),P.end();return}if(b==="GET"&&p==="/project"){let h=new URL(S.url??"/",`http://127.0.0.1:${43347}`),_=h.searchParams.get("id")?.trim()??"",w=o(),R=Sr(w.installVersion),E=await AA(e.layout),x=ir(E.projects,_);if(x===null){await u(P,"Project not found");return}let W=h.searchParams.get("linked")==="1"?h.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${h.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${h.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:h.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with AgentWitch.":null,z=h.searchParams.get("knowledgePromoted"),O=z!==null?`Marked ${z} lesson(s) as promoted in AgentWitch.`:null,U=h.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,pe=h.searchParams.get("tab")?.trim()??"harness",j=pe==="workflows"||pe==="agents"||pe==="knowledge"||pe==="pitfalls"?pe:"harness",q=h.searchParams.get("retired")==="1",br=h.searchParams.get("edit")?.trim()||null,_r=g8(h.searchParams.get("pitfall")),Go=H(),kr=Go===null?null:V({wsUrl:Go.wsUrl,pairingToken:Go.pairingToken}),cb=kr===null?null:await SI(kr,x.id),Hl=0;if(kr!==null)try{let DO=await fetch(`${kr.appOrigin}/api/agent-witch/projects/${encodeURIComponent(x.id)}/knowledge`,{method:"GET",headers:{[re]:kr.pairingToken},signal:AbortSignal.timeout(1e4)});if(DO.ok){let Em=await DO.json();typeof Em=="object"&&Em!==null&&typeof Em.candidateCount=="number"&&(Hl=Em.candidateCount)}}catch{Hl=0}let Rm=h.searchParams.get("rulePrompt"),Tm=Rm!==null,db=Rm?.trim()??"",wr=h.searchParams.get("ruleDropped")?.trim()||null,MO=h.searchParams.get("ruleDroppedTitle")?.trim()||null,jO=h.searchParams.get("ruleChangeError")?.trim()||null,ZX=(h.searchParams.get("ruleChangeAction")?.trim()||null)==="restore"?"restore":"drop",QX=jO===null?null:{ok:!1,reason:jO},NO=j==="pitfalls"||j==="harness"&&Tm?await p$({store:hh({layout:e.layout,cloud:kr===null?null:Id(kr)}),projectId:x.id,includeRetired:j==="pitfalls"?q:!1}):void 0,e9=j!=="harness"?void 0:await w8({projectId:x.id,prompt:Tm?db:null,cloudConfig:kr,pitfalls:NO,dropFlash:wr!==null&&MO!==null?{ruleId:wr,title:MO}:null,changeError:QX,changeAction:ZX});Fe(P,await n({title:x.name,activePath:"/projects",installVersion:w.installVersion,body:cn({project:x,cloudAppOrigin:R,installed:Dr(e.layout),linkedSetSlugs:jr(x.projectFolderPath),composition:cb,knowledgeCandidateCount:Hl,pitfalls:NO,pitfallsShowRetired:q,pitfallsEditId:br,activeTab:j,harnessExtraHtml:e9,flashMessage:W??O??_r?.message??null,flashError:U??_r?.error??null})}));return}if(b==="POST"&&(p==="/project/rules/drop"||p==="/project/rules/restore")){let h=await at(S),_=H(),w=_===null?null:V({wsUrl:_.wsUrl,pairingToken:_.pairingToken}),R=await T8({action:p.endsWith("/drop")?"drop":"restore",rawBody:h,cloudConfig:w});if(R.kind==="not_found"){await u(P,"Project not found");return}P.writeHead(303,{Location:R.location}),P.end();return}if(b==="POST"&&p==="/projects/pull-bound-harness"){let h=await at(S),_=await ER({rawBody:h,layout:e.layout});if(_.kind==="not_found"){await u(P,"Project not found");return}if(_.kind==="redirect"){P.writeHead(303,{Location:_.location}),P.end();return}let w=o();Fe(P,await n({title:_.title,activePath:"/projects",installVersion:w.installVersion,body:_.body}));return}if(b==="POST"&&p==="/projects/link-harness"){let h=await at(S),_=new URLSearchParams(h),w=_.get("projectId")?.trim()??"",R=await AA(e.layout),E=ir(R.projects,w);if(E===null){await u(P,"Project not found");return}let x=_.getAll("applySet").map(j=>String(j)),W=Ad({layout:e.layout,projectFolderPath:E.projectFolderPath,setSlugs:x});if(!W.ok){let j=o(),q=Sr(j.installVersion);Fe(P,await n({title:E.name,activePath:"/projects",installVersion:j.installVersion,body:cn({project:E,cloudAppOrigin:q,installed:Dr(e.layout),linkedSetSlugs:jr(E.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:W.errorMessage})}));return}let z=H(),O=z===null?null:V({wsUrl:z.wsUrl,pairingToken:z.pairingToken}),U=O===null?!1:await ks(O,E.id,W.appliedSetSlugs),pe=new URLSearchParams({linked:"1",files:String(W.writtenFileCount),bindingsSynced:U?"1":"0"});P.writeHead(303,{Location:`/project?id=${encodeURIComponent(E.id)}&${pe.toString()}`}),P.end();return}if(b==="POST"&&p==="/projects/remove-harness-set"){let h=await at(S),_=await CR({rawBody:h,layout:e.layout});if(_.kind==="not_found"){await u(P,"Project not found");return}if(_.kind==="redirect"){P.writeHead(303,{Location:_.location}),P.end();return}let w=o();Fe(P,await n({title:_.title,activePath:"/projects",installVersion:w.installVersion,body:_.body}));return}if(b==="POST"&&p==="/project/knowledge/promote-all"){let h=await at(S),w=new URLSearchParams(h).get("projectId")?.trim()??"",R=await AA(e.layout),E=ir(R.projects,w);if(E===null){await u(P,"Project not found");return}let x=H(),W=x===null?null:V({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),z=W===null?{ok:!1,promotedCount:0}:await u8(W,E.id),O=new URLSearchParams({tab:"knowledge",...z.ok?{knowledgePromoted:String(z.promotedCount)}:{knowledgePromoteFailed:"1"}});P.writeHead(303,{Location:`/project?id=${encodeURIComponent(E.id)}&${O.toString()}`}),P.end();return}let C=jy(p);if(b==="POST"&&C!==null){let h=await at(S),_=await xR({rawBody:h,action:C,layout:e.layout,createStore:w=>hh({layout:e.layout,cloud:Id(w)})});if(_.kind==="not_found"){await u(P,"Project not found");return}P.writeHead(303,{Location:_.location}),P.end();return}if(b==="GET"&&p==="/harness"){let h=new URL(S.url??"/",`http://127.0.0.1:${43347}`),_=o(),w=wd(e.layout),R=h.searchParams.get("submitted")==="1",E=R?h.searchParams.get("syncFailed")==="1"?`Local harness updated (${h.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:h.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${h.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":h.searchParams.get("stopped")==="1"?`Reveal stopped. ${w?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:h.searchParams.get("revealed")==="1"?`Reveal found ${w?.sets.length??0} set(s).`:null,x=w?.scanRoots[0]??by(),W=rpe(e.layout,{reveal:w,importQuery:h.searchParams.get("import")==="1",justSubmitted:R}),z=Sr(_.installVersion);Fe(P,await n({title:"Harness",activePath:"/harness",installVersion:_.installVersion,body:Rp(VW(e.layout,{cloudAppOrigin:z,reveal:w,scanFolder:x,flashMessage:E,importSectionExpanded:W}))}));return}if(b==="POST"&&p==="/api/harness/pick-folder"){let h=un();if(h===null){Se(P,200,{cancelled:!0});return}Se(P,200,{path:h});return}if(b==="GET"&&p==="/api/harness/file-content"){let _=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",w=Pd(_);if(w===null){Se(P,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let R=Kp.default.readFileSync(w,"utf8"),E=R.length>a6?`${R.slice(0,a6)}
\u2026 (truncated)`:R;Se(P,200,{content:E})}catch{Se(P,500,{errorMessage:"Could not read file."})}return}if(b==="POST"&&p==="/api/harness/reveal/add-project"){let h=await at(S),_="";try{let E=JSON.parse(h);typeof E=="object"&&E!==null&&typeof E.projectPath=="string"&&(_=E.projectPath.trim())}catch{Se(P,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(_.length===0){Se(P,400,{ok:!1,errorMessage:"projectPath is required."});return}let w=wd(e.layout),R=Qw({reveal:w,projectPath:_});if(R===null||R.sets.length===0){Se(P,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Ry(e.layout,R),Se(P,200,{ok:!0,setCount:R.sets.length});return}if(b==="GET"&&p==="/api/harness/reveal/stream"){let _=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(_.length===0){Se(P,400,{errorMessage:"Choose a folder to scan first."});return}let w=!1;S.on("close",()=>{w=!0}),P.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...YW});let R=eR({scanRoot:_,response:P,shouldAbort:()=>w});Ry(e.layout,R),P.end();return}if(b==="POST"&&p==="/harness/reveal"){P.writeHead(410,{"Content-Type":"text/plain"}),P.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(b==="POST"&&p==="/harness/submit"){let h=wd(e.layout);if(h===null){let z=o(),O=Sr(z.installVersion);Fe(P,await n({title:"Harness",activePath:"/harness",installVersion:z.installVersion,body:Rp(VW(e.layout,{cloudAppOrigin:O,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let _=await at(S),w=new URLSearchParams(_),R=hI(w,h),E=rR({layout:e.layout,sets:R});if(!E.ok){let z=o(),O=Sr(z.installVersion);Fe(P,await n({title:"Harness",activePath:"/harness",installVersion:z.installVersion,body:Rp(VW(e.layout,{cloudAppOrigin:O,reveal:h,flashError:E.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}nR(e.layout);let W=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";P.writeHead(303,{Location:`/harness?submitted=1&count=${E.writtenItemCount??0}${W}`}),P.end();return}if(b==="GET"&&p==="/writer-api"){let h=new URL(S.url??"/",`http://127.0.0.1:${43347}`),w=H()?.writerExecutionBackend??tt(void 0),R=Ke(e.layout.configPath),E=rn(R),x=h.searchParams.get("saved")==="1"?"Writer API settings saved on this computer.":null,W=o();Fe(P,await n({title:"Writer API",activePath:"/writer-api",installVersion:W.installVersion,body:fI({writerExecutionBackend:w,secrets:E,flashMessage:x})}));return}if(b==="POST"&&p==="/writer-api"){let h=await at(S),_=new URLSearchParams(h),w=_.get("writerExecutionBackend")?.trim()??"cli";iw({configPath:e.layout.configPath,writerExecutionBackend:tt(w),anthropicApiKey:_.get("anthropicApiKey")??void 0,anthropicModel:_.get("anthropicModel")??void 0,openaiApiKey:_.get("openaiApiKey")??void 0,openaiModel:_.get("openaiModel")??void 0,googleApiKey:_.get("googleApiKey")??void 0,googleModel:_.get("googleModel")??void 0}),P.writeHead(303,{Location:"/writer-api?saved=1"}),P.end();return}if(b==="GET"&&p==="/estimates"){P.writeHead(302,{Location:"/history"}),P.end();return}if(b==="GET"&&p==="/history"){let h=o();Fe(P,await n({title:"History",activePath:"/history",installVersion:h.installVersion,body:eI({reportsDir:e.layout.reportsDir})}));return}if(b==="GET"&&p==="/knowledge"){let _=new URL(S.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",w=o(),R=VE({layout:e.layout}),E=JE(R),x=_.length>0?await ja({layout:e.layout,query:_,limit:20}):Ma(e.layout).slice(-50).reverse(),W=x.map(O=>{let U=qE(R,O.id),pe=U>0?` \xB7 used in ${U} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${Pe(O.createdAt)}">${Pe(JW(O.createdAt))}${O.source?` \xB7 ${Pe(O.source)}`:""}${pe}</div><pre>${Pe(O.text)}</pre></article>`}).join(""),z=E.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${E.map(O=>`<li><strong>P${O.priority}</strong> \u2014 ${Pe(O.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your computer.</p></section>`:"";Fe(P,await n({title:"Knowledge",activePath:"/knowledge",installVersion:w.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this computer. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${Pe(_)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${spe(_,x.length)}
            </section>${z}${W}`}));return}b==="POST"&&await at(S),await u(P,"Not found")})().catch(p=>{console.error("[agent-witch-local-app]",p),P.writeHead(500),P.end("Internal error")})});y.on("error",S=>{if(S.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",S)});let A=OW();return y.on("close",()=>{A.stop()}),y.listen(43347,"127.0.0.1",()=>{try{_a()}catch(P){let p=P instanceof Error?P.message:String(P);console.error(`[agent-witch] writeGlobalTriggers failed: ${p}`)}console.log(`[agent-witch] Local app ${jt}`);let S=Zy();S!==null&&console.warn(S)}),y},Jp=e=>PA(e).publicKeyRaw});var bA=a(()=>{"use strict";bE();gB();p6()});var g6={};kt(g6,{runAgentWitchExternalLiveCli:()=>lpe});var XW,m6,ape,lpe,f6=a(()=>{"use strict";XW=m(require("node:fs")),m6=m(require("node:path"));as();K();Kl();tk();de();bA();de();ape=e=>{let t=m6.default.join(e,"link-code.txt");if(!XW.default.existsSync(t))return null;let r=XW.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},lpe=()=>{Tt("agent-witch-live");let e=L(),t=N(),r=ape(e),o=Jp(t);qp({layout:t,controllers:{getStatus:()=>{let n=We(t);return{wsConnected:zc(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{yb({platform:process.platform,installDir:e,runners:{kickstartLaunchAgents:()=>qn(e,process.platform),restartSystemdUserService:Ic}}).then(n=>{n.ok||console.warn(`[agent-witch-live] Revive: ${n.message}`)})}}})}});var Do=T((wrt,S6)=>{"use strict";var y6=["nodebuffer","arraybuffer","fragments"],h6=typeof Blob<"u";h6&&y6.push("blob");S6.exports={BINARY_TYPES:y6,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:h6,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Yp=T((Rrt,_A)=>{"use strict";var{EMPTY_BUFFER:cpe}=Do(),ZW=Buffer[Symbol.species];function dpe(e,t){if(e.length===0)return cpe;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new ZW(r.buffer,r.byteOffset,o):r}function P6(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function A6(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function upe(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function QW(e){if(QW.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new ZW(e):ArrayBuffer.isView(e)?t=new ZW(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),QW.readOnly=!1),t}_A.exports={concat:dpe,mask:P6,toArrayBuffer:upe,toBuffer:QW,unmask:A6};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");_A.exports.mask=function(t,r,o,n,s){s<48?P6(t,r,o,n,s):e.mask(t,r,o,n,s)},_A.exports.unmask=function(t,r){t.length<32?A6(t,r):e.unmask(t,r)}}catch{}});var k6=T((Trt,_6)=>{"use strict";var b6=Symbol("kDone"),e0=Symbol("kRun"),t0=class{constructor(t){this[b6]=()=>{this.pending--,this[e0]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[e0]()}[e0](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[b6])}}};_6.exports=t0});var _l=T((Ert,E6)=>{"use strict";var Xp=require("zlib"),w6=Yp(),ppe=k6(),{kStatusCode:R6}=Do(),mpe=Buffer[Symbol.species],gpe=Buffer.from([0,0,255,255]),wA=Symbol("permessage-deflate"),Ho=Symbol("total-length"),Al=Symbol("callback"),In=Symbol("buffers"),bl=Symbol("error"),kA,r0=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!kA){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;kA=new ppe(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Al];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){kA.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){kA.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Xp.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Xp.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[wA]=this,this._inflate[Ho]=0,this._inflate[In]=[],this._inflate.on("error",ype),this._inflate.on("data",T6)}this._inflate[Al]=o,this._inflate.write(t),r&&this._inflate.write(gpe),this._inflate.flush(()=>{let s=this._inflate[bl];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=w6.concat(this._inflate[In],this._inflate[Ho]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Ho]=0,this._inflate[In]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?Xp.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Xp.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[Ho]=0,this._deflate[In]=[],this._deflate.on("data",fpe)}this._deflate[Al]=o,this._deflate.write(t),this._deflate.flush(Xp.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=w6.concat(this._deflate[In],this._deflate[Ho]);r&&(s=new mpe(s.buffer,s.byteOffset,s.length-4)),this._deflate[Al]=null,this._deflate[Ho]=0,this._deflate[In]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};E6.exports=r0;function fpe(e){this[In].push(e),this[Ho]+=e.length}function T6(e){if(this[Ho]+=e.length,this[wA]._maxPayload<1||this[Ho]<=this[wA]._maxPayload){this[In].push(e);return}this[bl]=new RangeError("Max payload size exceeded"),this[bl].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[bl][R6]=1009,this.removeListener("data",T6),this.reset()}function ype(e){if(this[wA]._inflate=null,this[bl]){this[Al](this[bl]);return}e[R6]=1007,this[Al](e)}});var kl=T((Crt,RA)=>{"use strict";var{isUtf8:C6}=require("buffer"),{hasBlob:hpe}=Do(),Spe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function Ppe(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function o0(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function Ape(e){return hpe&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}RA.exports={isBlob:Ape,isValidStatusCode:Ppe,isValidUTF8:o0,tokenChars:Spe};if(C6)RA.exports.isValidUTF8=function(e){return e.length<24?o0(e):C6(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");RA.exports.isValidUTF8=function(t){return t.length<32?o0(t):e(t)}}catch{}});var l0=T((Lrt,M6)=>{"use strict";var{Writable:bpe}=require("stream"),L6=_l(),{BINARY_TYPES:_pe,EMPTY_BUFFER:v6,kStatusCode:kpe,kWebSocket:wpe}=Do(),{concat:n0,toArrayBuffer:Rpe,unmask:Tpe}=Yp(),{isValidStatusCode:Epe,isValidUTF8:I6}=kl(),TA=Buffer[Symbol.species],Jt=0,x6=1,W6=2,O6=3,s0=4,i0=5,EA=6,a0=class extends bpe{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||_pe[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[wpe]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Jt}_write(t,r,o){if(this._opcode===8&&this._state==Jt)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new TA(o.buffer,o.byteOffset+t,o.length-t),new TA(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new TA(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Jt:this.getInfo(t);break;case x6:this.getPayloadLength16(t);break;case W6:this.getPayloadLength64(t);break;case O6:this.getMask();break;case s0:this.getData(t);break;case i0:case EA:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[L6.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=x6:this._payloadLength===127?this._state=W6:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=O6:this._state=s0}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=s0}getData(t){let r=v6;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&Tpe(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=i0,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[L6.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Jt&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Jt;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=n0(o,r):this._binaryType==="arraybuffer"?n=Rpe(n0(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=Jt):(this._state=EA,setImmediate(()=>{this.emit("message",n,!0),this._state=Jt,this.startLoop(t)}))}else{let n=n0(o,r);if(!this._skipUTF8Validation&&!I6(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===i0||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=Jt):(this._state=EA,setImmediate(()=>{this.emit("message",n,!1),this._state=Jt,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,v6),this.end();else{let o=t.readUInt16BE(0);if(!Epe(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new TA(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!I6(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=Jt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Jt):(this._state=EA,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Jt,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[kpe]=n,i}};M6.exports=a0});var u0=T((Irt,D6)=>{"use strict";var{Duplex:vrt}=require("stream"),{randomFillSync:Cpe}=require("crypto"),{types:{isUint8Array:Lpe}}=require("util"),j6=_l(),{EMPTY_BUFFER:vpe,kWebSocket:Ipe,NOOP:xpe}=Do(),{isBlob:wl,isValidStatusCode:Wpe}=kl(),{mask:N6,toBuffer:ui}=Yp(),Yt=Symbol("kByteLength"),Ope=Buffer.alloc(4),CA=8*1024,pi,Rl=CA,Ar=0,Mpe=1,jpe=2,c0=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Ar,this.onerror=xpe,this[Ipe]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||Ope,r.generateMask?r.generateMask(o):(Rl===CA&&(pi===void 0&&(pi=Buffer.alloc(CA)),Cpe(pi,0,CA),Rl=0),o[0]=pi[Rl++],o[1]=pi[Rl++],o[2]=pi[Rl++],o[3]=pi[Rl++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let l;typeof t=="string"?(!r.mask||i)&&r[Yt]!==void 0?l=r[Yt]:(t=Buffer.from(t),l=t.length):(l=t.length,n=r.mask&&r.readOnly&&!i);let c=l;l>=65536?(s+=8,c=127):l>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?l+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(l,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(l,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(N6(t,o,d,s,l),[d]):(N6(t,o,t,0,l),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=vpe;else{if(typeof t!="number"||!Wpe(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let l=Buffer.byteLength(r);if(l>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+l),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(Lpe(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Yt]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Ar?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):wl(t)?(n=t.size,s=!1):(t=ui(t),n=t.length,s=ui.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Yt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};wl(t)?this._state!==Ar?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ar?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):wl(t)?(n=t.size,s=!1):(t=ui(t),n=t.length,s=ui.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Yt]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};wl(t)?this._state!==Ar?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==Ar?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[j6.extensionName],s=r.binary?2:1,i=r.compress,l,c;typeof t=="string"?(l=Buffer.byteLength(t),c=!1):wl(t)?(l=t.size,c=!1):(t=ui(t),l=t.length,c=ui.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=l>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Yt]:l,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};wl(t)?this._state!==Ar?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==Ar?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Yt],this._state=jpe,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let l=new Error("The socket was closed while the blob was being read");process.nextTick(d0,this,l,n);return}this._bufferedBytes-=o[Yt];let i=ui(s);r?this.dispatch(i,r,o,n):(this._state=Ar,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(Npe,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[j6.extensionName];this._bufferedBytes+=o[Yt],this._state=Mpe,s.compress(t,o.fin,(i,l)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");d0(this,c,n);return}this._bufferedBytes-=o[Yt],this._state=Ar,o.readOnly=!1,this.sendFrame(e.frame(l,o),n),this.dequeue()})}dequeue(){for(;this._state===Ar&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Yt],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Yt],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};D6.exports=c0;function d0(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function Npe(e,t,r){d0(e,t,r),e.onerror(t)}});var K6=T((xrt,V6)=>{"use strict";var{kForOnEventAttribute:Zp,kListener:p0}=Do(),H6=Symbol("kCode"),F6=Symbol("kData"),$6=Symbol("kError"),z6=Symbol("kMessage"),U6=Symbol("kReason"),Tl=Symbol("kTarget"),B6=Symbol("kType"),G6=Symbol("kWasClean"),Fo=class{constructor(t){this[Tl]=null,this[B6]=t}get target(){return this[Tl]}get type(){return this[B6]}};Object.defineProperty(Fo.prototype,"target",{enumerable:!0});Object.defineProperty(Fo.prototype,"type",{enumerable:!0});var mi=class extends Fo{constructor(t,r={}){super(t),this[H6]=r.code===void 0?0:r.code,this[U6]=r.reason===void 0?"":r.reason,this[G6]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[H6]}get reason(){return this[U6]}get wasClean(){return this[G6]}};Object.defineProperty(mi.prototype,"code",{enumerable:!0});Object.defineProperty(mi.prototype,"reason",{enumerable:!0});Object.defineProperty(mi.prototype,"wasClean",{enumerable:!0});var El=class extends Fo{constructor(t,r={}){super(t),this[$6]=r.error===void 0?null:r.error,this[z6]=r.message===void 0?"":r.message}get error(){return this[$6]}get message(){return this[z6]}};Object.defineProperty(El.prototype,"error",{enumerable:!0});Object.defineProperty(El.prototype,"message",{enumerable:!0});var Qp=class extends Fo{constructor(t,r={}){super(t),this[F6]=r.data===void 0?null:r.data}get data(){return this[F6]}};Object.defineProperty(Qp.prototype,"data",{enumerable:!0});var Dpe={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[Zp]&&n[p0]===t&&!n[Zp])return;let o;if(e==="message")o=function(s,i){let l=new Qp("message",{data:i?s:s.toString()});l[Tl]=this,LA(t,this,l)};else if(e==="close")o=function(s,i){let l=new mi("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});l[Tl]=this,LA(t,this,l)};else if(e==="error")o=function(s){let i=new El("error",{error:s,message:s.message});i[Tl]=this,LA(t,this,i)};else if(e==="open")o=function(){let s=new Fo("open");s[Tl]=this,LA(t,this,s)};else return;o[Zp]=!!r[Zp],o[p0]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[p0]===t&&!r[Zp]){this.removeListener(e,r);break}}};V6.exports={CloseEvent:mi,ErrorEvent:El,Event:Fo,EventTarget:Dpe,MessageEvent:Qp};function LA(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var vA=T((Wrt,q6)=>{"use strict";var{tokenChars:em}=kl();function eo(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Hpe(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,l,c=-1,d=-1,u=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(u===-1&&em[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(c,u);d===44?(eo(t,y,r),r=Object.create(null)):i=y,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(l===void 0)if(u===-1&&em[d]===1)c===-1&&(c=g);else if(d===32||d===9)u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g),eo(r,e.slice(c,u),!0),d===44&&(eo(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)l=e.slice(c,g),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(em[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(em[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,u=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(u===-1&&em[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))u===-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(c,u);o&&(y=y.replace(/\\/g,""),o=!1),eo(r,l,y),d===44&&(eo(t,i,r),r=Object.create(null),i=void 0),l=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=g);let f=e.slice(c,u);return i===void 0?eo(t,f,r):(l===void 0?eo(r,f,!0):o?eo(r,l,f.replace(/\\/g,"")):eo(r,l,f),eo(t,i,r)),t}function Fpe(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}q6.exports={format:Fpe,parse:Hpe}});var OA=T((jrt,iY)=>{"use strict";var $pe=require("events"),zpe=require("https"),Upe=require("http"),X6=require("net"),Bpe=require("tls"),{randomBytes:Gpe,createHash:Vpe}=require("crypto"),{Duplex:Ort,Readable:Mrt}=require("stream"),{URL:m0}=require("url"),xn=_l(),Kpe=l0(),qpe=u0(),{isBlob:Jpe}=kl(),{BINARY_TYPES:J6,CLOSE_TIMEOUT:Ype,EMPTY_BUFFER:IA,GUID:Xpe,kForOnEventAttribute:g0,kListener:Zpe,kStatusCode:Qpe,kWebSocket:$e,NOOP:Z6}=Do(),{EventTarget:{addEventListener:eme,removeEventListener:tme}}=K6(),{format:rme,parse:ome}=vA(),{toBuffer:nme}=Yp(),Q6=Symbol("kAborted"),f0=[8,13],$o=["CONNECTING","OPEN","CLOSING","CLOSED"],sme=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,ce=class e extends $pe{constructor(t,r,o){super(),this._binaryType=J6[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=IA,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),eY(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){J6.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new Kpe({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new qpe(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[$e]=this,s[$e]=this,t[$e]=this,n.on("conclude",lme),n.on("drain",cme),n.on("error",dme),n.on("message",ume),n.on("ping",pme),n.on("pong",mme),s.onerror=gme,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",oY),t.on("data",WA),t.on("end",nY),t.on("error",sY),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[xn.extensionName]&&this._extensions[xn.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Mt(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,rY(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){y0(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||IA,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){y0(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||IA,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){y0(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[xn.extensionName]||(n.compress=!1),this._sender.send(t||IA,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Mt(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(ce,"CONNECTING",{enumerable:!0,value:$o.indexOf("CONNECTING")});Object.defineProperty(ce.prototype,"CONNECTING",{enumerable:!0,value:$o.indexOf("CONNECTING")});Object.defineProperty(ce,"OPEN",{enumerable:!0,value:$o.indexOf("OPEN")});Object.defineProperty(ce.prototype,"OPEN",{enumerable:!0,value:$o.indexOf("OPEN")});Object.defineProperty(ce,"CLOSING",{enumerable:!0,value:$o.indexOf("CLOSING")});Object.defineProperty(ce.prototype,"CLOSING",{enumerable:!0,value:$o.indexOf("CLOSING")});Object.defineProperty(ce,"CLOSED",{enumerable:!0,value:$o.indexOf("CLOSED")});Object.defineProperty(ce.prototype,"CLOSED",{enumerable:!0,value:$o.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(ce.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(ce.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[g0])return t[Zpe];return null},set(t){for(let r of this.listeners(e))if(r[g0]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[g0]:!0})}})});ce.prototype.addEventListener=eme;ce.prototype.removeEventListener=tme;iY.exports=ce;function eY(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Ype,protocolVersion:f0[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!f0.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${f0.join(", ")})`);let s;if(t instanceof m0)s=t;else try{s=new m0(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",l=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!l?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:l&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let S=new SyntaxError(c);if(e._redirects===0)throw S;xA(e,S);return}let d=i?443:80,u=Gpe(16).toString("base64"),g=i?zpe.request:Upe.request,f=new Set,y;if(n.createConnection=n.createConnection||(i?ame:ime),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(y=new xn({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=rme({[xn.extensionName]:y.offer()})),r.length){for(let S of r){if(typeof S!="string"||!sme.test(S)||f.has(S))throw new SyntaxError("An invalid or duplicated subprotocol was specified");f.add(S)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),l){let S=n.path.split(":");n.socketPath=S[0],n.path=S[1]}let A;if(n.followRedirects){if(e._redirects===0){e._originalIpc=l,e._originalSecure=i,e._originalHostOrSocketPath=l?n.socketPath:s.host;let S=o&&o.headers;if(o={...o,headers:{}},S)for(let[P,p]of Object.entries(S))o.headers[P.toLowerCase()]=p}else if(e.listenerCount("redirect")===0){let S=l?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!S||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,S||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),A=e._req=g(n),e._redirects&&e.emit("redirect",e.url,A)}else A=e._req=g(n);n.timeout&&A.on("timeout",()=>{Mt(e,A,"Opening handshake has timed out")}),A.on("error",S=>{A===null||A[Q6]||(A=e._req=null,xA(e,S))}),A.on("response",S=>{let P=S.headers.location,p=S.statusCode;if(P&&n.followRedirects&&p>=300&&p<400){if(++e._redirects>n.maxRedirects){Mt(e,A,"Maximum redirects exceeded");return}A.abort();let b;try{b=new m0(P,t)}catch{let h=new SyntaxError(`Invalid URL: ${P}`);xA(e,h);return}eY(e,b,r,o)}else e.emit("unexpected-response",A,S)||Mt(e,A,`Unexpected server response: ${S.statusCode}`)}),A.on("upgrade",(S,P,p)=>{if(e.emit("upgrade",S),e.readyState!==ce.CONNECTING)return;A=e._req=null;let b=S.headers.upgrade;if(b===void 0||b.toLowerCase()!=="websocket"){Mt(e,P,"Invalid Upgrade header");return}let C=Vpe("sha1").update(u+Xpe).digest("base64");if(S.headers["sec-websocket-accept"]!==C){Mt(e,P,"Invalid Sec-WebSocket-Accept header");return}let h=S.headers["sec-websocket-protocol"],_;if(h!==void 0?f.size?f.has(h)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":f.size&&(_="Server sent no subprotocol"),_){Mt(e,P,_);return}h&&(e._protocol=h);let w=S.headers["sec-websocket-extensions"];if(w!==void 0){if(!y){Mt(e,P,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let R;try{R=ome(w)}catch{Mt(e,P,"Invalid Sec-WebSocket-Extensions header");return}let E=Object.keys(R);if(E.length!==1||E[0]!==xn.extensionName){Mt(e,P,"Server indicated an extension that was not requested");return}try{y.accept(R[xn.extensionName])}catch{Mt(e,P,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[xn.extensionName]=y}e.setSocket(P,p,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(A,e):A.end()}function xA(e,t){e._readyState=ce.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function ime(e){return e.path=e.socketPath,X6.connect(e)}function ame(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=X6.isIP(e.host)?"":e.host),Bpe.connect(e)}function Mt(e,t,r){e._readyState=ce.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Mt),t.setHeader?(t[Q6]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(xA,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function y0(e,t,r){if(t){let o=Jpe(t)?t.size:nme(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${$o[e.readyState]})`);process.nextTick(r,o)}}function lme(e,t){let r=this[$e];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[$e]!==void 0&&(r._socket.removeListener("data",WA),process.nextTick(tY,r._socket),e===1005?r.close():r.close(e,t))}function cme(){let e=this[$e];e.isPaused||e._socket.resume()}function dme(e){let t=this[$e];t._socket[$e]!==void 0&&(t._socket.removeListener("data",WA),process.nextTick(tY,t._socket),t.close(e[Qpe])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function Y6(){this[$e].emitClose()}function ume(e,t){this[$e].emit("message",e,t)}function pme(e){let t=this[$e];t._autoPong&&t.pong(e,!this._isServer,Z6),t.emit("ping",e)}function mme(e){this[$e].emit("pong",e)}function tY(e){e.resume()}function gme(e){let t=this[$e];t.readyState!==ce.CLOSED&&(t.readyState===ce.OPEN&&(t._readyState=ce.CLOSING,rY(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function rY(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function oY(){let e=this[$e];if(this.removeListener("close",oY),this.removeListener("data",WA),this.removeListener("end",nY),e._readyState=ce.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[$e]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",Y6),e._receiver.on("finish",Y6))}function WA(e){this[$e]._receiver.write(e)||this.pause()}function nY(){let e=this[$e];e._readyState=ce.CLOSING,e._receiver.end(),this.end()}function sY(){let e=this[$e];this.removeListener("error",sY),this.on("error",Z6),e&&(e._readyState=ce.CLOSING,this.destroy())}});var dY=T((Drt,cY)=>{"use strict";var Nrt=OA(),{Duplex:fme}=require("stream");function aY(e){e.emit("close")}function yme(){!this.destroyed&&this._writableState.finished&&this.destroy()}function lY(e){this.removeListener("error",lY),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function hme(e,t){let r=!0,o=new fme({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let l=!i&&o._readableState.objectMode?s.toString():s;o.push(l)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(aY,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(aY,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",yme),o.on("error",lY),o}cY.exports=hme});var h0=T((Hrt,uY)=>{"use strict";var{tokenChars:Sme}=kl();function Pme(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&Sme[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let l=e.slice(r,o);if(t.has(l))throw new SyntaxError(`The "${l}" subprotocol is duplicated`);t.add(l),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}uY.exports={parse:Pme}});var SY=T(($rt,hY)=>{"use strict";var Ame=require("events"),MA=require("http"),{Duplex:Frt}=require("stream"),{createHash:bme}=require("crypto"),pY=vA(),gi=_l(),_me=h0(),kme=OA(),{CLOSE_TIMEOUT:wme,GUID:Rme,kWebSocket:Tme}=Do(),Eme=/^[+/0-9A-Za-z]{22}==$/,mY=0,gY=1,yY=2,S0=class extends Ame{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:wme,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:kme,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=MA.createServer((o,n)=>{let s=MA.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=Cme(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=mY}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===yY){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(tm,this);return}if(t&&this.once("close",t),this._state!==gY)if(this._state=gY,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(tm,this):process.nextTick(tm,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{tm(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",fY);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,l=+t.headers["sec-websocket-version"];if(t.method!=="GET"){fi(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){fi(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!Eme.test(s)){fi(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(l!==13&&l!==8){fi(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){rm(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=_me.parse(c)}catch{fi(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&u!==void 0){let f=new gi({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=pY.parse(u);y[gi.extensionName]&&(f.accept(y[gi.extensionName]),g[gi.extensionName]=f)}catch{fi(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let f={origin:t.headers[`${l===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(f,(y,A,S,P)=>{if(!y)return rm(r,A||401,S,P);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(f))return rm(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,l){if(!s.readable||!s.writable)return s.destroy();if(s[Tme])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>mY)return rm(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${bme("sha1").update(r+Rme).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),u._protocol=g)}if(t[gi.extensionName]){let g=t[gi.extensionName].params,f=pY.format({[gi.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${f}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",fY),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(tm,this)})),l(u,n)}};hY.exports=S0;function Cme(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function tm(e){e._state=yY,e.emit("close")}function fY(){this.destroy()}function rm(e,t,r,o){r=r||MA.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${MA.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function fi(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,fi),e.emit("wsClientError",i,r,t)}else rm(r,o,n,s)}});var Lme,vme,Ime,xme,Wme,Ome,PY,Mme,Cl,AY=a(()=>{Lme=m(dY(),1),vme=m(vA(),1),Ime=m(_l(),1),xme=m(l0(),1),Wme=m(u0(),1),Ome=m(h0(),1),PY=m(OA(),1),Mme=m(SY(),1),Cl=PY.default});var P0,bY=a(()=>{"use strict";P0=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var jme,A0,_Y=a(()=>{"use strict";gf();bY();jme=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",A0=(e={})=>{let t=e.env??process.env,r=P0(t[pf]),o=P0(t[mf]);return{mode:jme(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var kY=a(()=>{"use strict";gf()});var wY=a(()=>{"use strict";_Y();kY()});var Nme,RY,TY=a(()=>{"use strict";X();vt();ct();Nme={isPaused:lo,loadFolders:wT,resolveFolder:kT},RY=async(e,t=Nme)=>{if(t.isPaused(e.config.layout.configPath))return{ok:!1,code:oe.CODING_TOOLS_PAUSED};if(e.requestedFolderPath===null)return{ok:!1,code:oe.FOLDER_REQUIRED};let r=await t.loadFolders({wsUrl:e.config.wsUrl,pairingToken:e.config.pairingToken});return t.resolveFolder({...e.projectId!==void 0?{projectId:e.projectId}:{},requestedFolderPath:e.requestedFolderPath,registeredFolders:r,managedProjectsDir:e.config.layout.projectsDir,defaultFolderPath:e.defaultFolderPath})}});var b0=a(()=>{"use strict"});var Ll,yi,EY,Hme,_0,k0,CY,LY,w0,vY,om,R0=a(()=>{"use strict";Ll=m(require("node:fs")),yi=m(require("node:os")),EY=m(require("node:path"));b0();Bi();Hme=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_0=(e=yi.default.hostname())=>EY.default.join(yi.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),k0=e=>{if(!Ll.default.existsSync(e))return null;try{let t=JSON.parse(Ll.default.readFileSync(e,"utf8"));return!Hme(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},CY=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},LY=(e,t)=>{Ll.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},w0=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??_0(),o=k0(r);if(o!==null&&o.pid!==process.pid&&Ht(o.pid)&&CY(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:yi.default.hostname(),macOsUsername:yi.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return LY(r,n),{ok:!0}},vY=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??_0(),o=k0(r);return o!==null&&o.pid!==process.pid&&Ht(o.pid)&&CY(o)?{ok:!1}:(LY(r,{hostname:yi.default.hostname(),macOsUsername:yi.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},om=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??_0();k0(r)?.pid===process.pid&&Ll.default.existsSync(r)&&Ll.default.unlinkSync(r)}});var T0,nm,Fme,$me,zme,Ume,E0,IY=a(()=>{"use strict";T0=require("node:child_process"),nm=m(require("node:path"));Bi();Yg();Fme=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),$me=(e,t)=>{if(Fme(e)||!/\bnode\b/.test(e))return!1;let r=nm.default.resolve(t),o=nm.default.join(r,"app",fc),n=nm.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===fc||i==="agent-witch.ts")return e.includes(r);try{let l=nm.default.resolve(i);return l===o||l===n}catch{return i===o||i===n}})},zme=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,T0.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Ume=(e,t,r)=>{let o=zme(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let l=/^(\d+)\s+(.+)$/.exec(i);if(l===null)continue;let c=Number.parseInt(l[1]??"",10),d=l[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||$me(d,t)&&n.push(c)}return n},E0=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,T0.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=Ume(r,e.installDir,t),n=[];for(let s of o)if(Ht(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var sm,im,xY,Bme,C0,WY=a(()=>{"use strict";sm=m(require("node:fs")),im=m(require("node:path"));et();xY=(e,t)=>{!sm.default.existsSync(e)||sm.default.existsSync(t)||(sm.default.mkdirSync(im.default.dirname(t),{recursive:!0}),sm.default.renameSync(e,t))},Bme=e=>{if(e.profileEmail===null)return;let t=im.default.join(e.installDir,Zt);xY(im.default.join(t,jn),e.mainLogPath),xY(im.default.join(t,Nn),e.errorLogPath)},C0=e=>{let t=N();e!==void 0&&t.installDir!==e||Bme(t)}});var OY=a(()=>{"use strict";eu();Hh();Hh();!Et()&&Xn(__agentWitchImportMetaUrl)&&(async()=>{Tt("agent-witch-wake-server");let e=await vs(),t=so(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var MY=a(()=>{"use strict";OY()});var jY=a(()=>{"use strict";Ud()});var L0,NY=a(()=>{"use strict";b0();MY();R0();jY();L0=async(e={})=>{let t=e.skipInProcessBridge?null:await Dh();Ah();let r=setInterval(()=>{Ah()},6e4),o=setInterval(()=>{if(!vY().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var am,jA,Kme,DY,HY,NA,FY,$Y,v0,zY,DA,UY=a(()=>{"use strict";am=m(require("node:fs")),jA=m(require("node:path")),Kme="pending-run-inputs.json",DY=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),HY=e=>{let t=e.profileEmail?jA.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return jA.default.join(t,Kme)},NA=e=>{let t=HY(e);if(!am.default.existsSync(t))return{};try{let r=JSON.parse(am.default.readFileSync(t,"utf8"));return DY(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!DY(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",l=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||l.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:l,accumulatedOutput:c}]]})):{}}catch{return{}}},FY=(e,t)=>{let r=HY(e);am.default.mkdirSync(jA.default.dirname(r),{recursive:!0}),am.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},$Y=e=>Object.values(NA(e)),v0=(e,t)=>NA(e)[t]!==void 0,zY=(e,t)=>{let r=NA(e);r[t.agentRunId]=t,FY(e,r)},DA=(e,t)=>{let r=NA(e);delete r[t],FY(e,r)}});var HA=a(()=>{"use strict";X()});var BY=a(()=>{"use strict";X()});var FA=a(()=>{"use strict";X()});var $A=a(()=>{"use strict";X()});var lm=a(()=>{"use strict";X()});var qme,Jme,cm,I0=a(()=>{"use strict";or();HA();BY();FA();$A();lm();qme={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Jme={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},cm=e=>{if(!Ce(e.writerAgent))return"the selected writer";let t=Lt(e.writerAgent);if(tt(e.writerExecutionBackend)==="api"&&t!==null){let r=mt(Ke(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Jc(t,r.model);return`${Jme[t]} model ${o}`}}return qme[e.writerAgent]}});var Yme,Xme,GY,VY,KY=a(()=>{"use strict";Yme=/"input_tokens"\s*:\s*(\d+)/,Xme=/"output_tokens"\s*:\s*(\d+)/,GY=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},VY=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=GY(Yme.exec(t)),o=GY(Xme.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var zA=a(()=>{"use strict";vt()});var Wn,dm,Zme,YY,W0,x0,XY,Qme,ZY,O0,QY,qY,e7,ege,JY,M0,t7=a(()=>{"use strict";Wn=m(require("node:fs")),dm=m(require("node:path"));ct();X();zA();Zme="run-completion-outbox.json",YY="run-completion-posted.json",W0=(e,t)=>{let r=e.profileEmail?dm.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return dm.default.join(r,t)},x0=e=>W0(e,Zme),XY=e=>{try{let t=JSON.parse(Wn.default.readFileSync(W0(e,YY),"utf8"));return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]}catch{return[]}},Qme=(e,t)=>{let r=W0(e,YY);Wn.default.mkdirSync(dm.default.dirname(r),{recursive:!0}),Wn.default.writeFileSync(r,JSON.stringify(Vf(XY(e),t)),"utf8")},ZY=(e,t)=>XY(e).includes(t),O0=e=>{let t=x0(e);if(!Wn.default.existsSync(t))return[];try{let r=JSON.parse(Wn.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},QY=(e,t)=>{Wn.default.mkdirSync(dm.default.dirname(x0(e)),{recursive:!0}),Wn.default.writeFileSync(x0(e),JSON.stringify(t,null,2),"utf8")},qY=(e,t)=>{QY(e,O0(e).filter(r=>r.runId!==t))},e7=(e,t)=>{if(ZY(e,t.runId))return;let r={...t,output:Bc(t.output,Qi("secretHidden"))},o=[...O0(e).filter(n=>n.runId!==t.runId),r];QY(e,o)},ege=async e=>{for(let t of O0(e.layout)){if(ZY(e.layout,t.runId)){qY(e.layout,t.runId);continue}await Ld(e.cloudApi,t.runId,t.exitCode,t.output,{estimateSeconds:t.estimateSeconds,actualSeconds:t.actualSeconds})&&(Qme(e.layout,t.runId),qY(e.layout,t.runId))}},JY={chain:Promise.resolve()},M0=e=>{let t=e.cloudApi;if(t===null)return Promise.resolve();let r=JY.chain.then(()=>ege({layout:e.layout,cloudApi:t}));return JY.chain=r.catch(()=>{}),r}});var r7=a(()=>{"use strict"});var j0,um,rge,hi,o7=a(()=>{"use strict";X();r7();j0=new Map,um=e=>{let t=j0.get(e);t!==void 0&&(clearInterval(t),j0.delete(e))},rge=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify(fs({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}})))},hi=(e,t,r,o={})=>{um(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){um(t);return}let i=o.onTick?.()??{};rge(e,t,n,i)};s(),j0.set(t,setInterval(s,15e3))}});var n7=a(()=>{"use strict";vt()});var s7,i7=a(()=>{"use strict";n7();s7=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Me(t)}});var N0,pm,zo,D0,to,a7,UA=a(()=>{"use strict";N0=new Set,pm=new Map,zo=(e,t)=>{if(t.length===0)return;let r=pm.get(e)??[];r.push(t),pm.set(e,r)},D0=e=>{N0.add(e);let t=pm.get(e)??[];return pm.delete(e),t},to=e=>N0.has(e),a7=e=>{N0.delete(e),pm.delete(e)}});var l7,c7=a(()=>{"use strict";l7=e=>e==null||!Number.isFinite(e)||e<=0?null:{limitSeconds:Math.floor(e)}});var d7,H0,BA,u7,mm,oge,p7,nge,m7,F0=a(()=>{"use strict";c7();Lf();d7=l7(Gc.maxMinutes*60)??{limitSeconds:1800},H0=5e3,BA=new Map,u7=(e,t,r=d7)=>{mm(e);let o=setTimeout(()=>{BA.delete(e),t()},r.limitSeconds*1e3);o.unref?.(),BA.set(e,o)},mm=e=>{let t=BA.get(e);t!==void 0&&(clearTimeout(t),BA.delete(e))},oge=(e=d7)=>`You've hit your session limit on this computer: the run was stopped after ${Math.round(e.limitSeconds/60)} minutes.`,p7=e=>{let t=oge(),r=e.trim();return r.length>0?`${r}

${t}`:t},nge=e=>e.exitCode===null&&e.signalCode===null,m7=(e,t=H0)=>{let r=n=>{let s=e.pid;if(typeof s=="number"&&process.platform!=="win32")try{process.kill(-s,n);return}catch{}try{e.kill(n)}catch{}};r("SIGTERM"),setTimeout(()=>{nge(e)&&r("SIGKILL")},t).unref?.()}});var vl,g7,f7,y7=a(()=>{"use strict";vl=m(require("node:path")),g7=require("node:url");Yn();f7=()=>{if(Et()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?vl.default.dirname(vl.default.resolve(e)):vl.default.dirname(vl.default.resolve(__filename))}return vl.default.dirname((0,g7.fileURLToPath)(__agentWitchImportMetaUrl))}});var h7,S7,P7,A7,_t,Il,b7,_7,xl,$0,z0,U0,k7,B0,w7,GA=a(()=>{"use strict";h7=require("node:crypto"),S7=m(require("node:fs")),P7=m(require("node:path")),A7=require("node:url");Bi();F0();Yn();y7();_t=new Map,b7=async()=>{if(Il!==void 0)return Il;try{if(Et()){let e=f7(),t=P7.default.join(e,"deps","node-pty","lib","index.js");if(S7.default.existsSync(t)){let r=await import((0,A7.pathToFileURL)(t).href);return Il=r,r}}return Il=await import("node-pty"),Il}catch{return Il=null,null}},_7=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},xl=(e,t,r)=>{let o=_t.get(e);if(o!==void 0){_t.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},$0=(e,t)=>{let r=_t.get(e);return r===void 0?!1:(r.pty.write(t),!0)},z0=(e,t,r)=>{let o=_t.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},U0=e=>{for(let t of _t.values())if(!(t.mode!=="agent"||t.runId!==e))return Ht(t.pty.pid);return!1},k7=e=>{for(let[t,r]of _t.entries()){if(r.mode!=="agent"||r.runId!==e)continue;_t.delete(t);let o=r.pty.pid;try{r.pty.kill()}catch{}return setTimeout(()=>{if(Ht(o))try{process.kill(o,"SIGKILL")}catch{}},H0).unref(),!0}return!1},B0=async e=>{let t=await b7();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this computer. Install AgentWitch deps again.\r
`},requestId:e.requestId}),!1;_t.get(e.shellSessionId)!==void 0&&xl(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return _t.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{_7(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{_t.get(e.shellSessionId)?.pty===n&&(_t.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},w7=async e=>{let t=e.shellSessionId??(0,h7.randomUUID)(),r=await b7();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return _t.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{_7(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{_t.get(t)?.pty===o&&(_t.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var VA,R7,T7=a(()=>{"use strict";VA="[[AWAITING_INPUT]]",R7=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",VA,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var gm,E7,KA=a(()=>{"use strict";T7();gm=e=>{let t=e.indexOf(VA);if(t<0)return null;let o=e.slice(t+VA.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},E7=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",R7].join(`
`)});var C7,L7=a(()=>{"use strict";UA();GA();KA();C7=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(to(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}zo(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await w7({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=gm(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var I7,x7,W7,v7,Uo,qA=a(()=>{"use strict";I7=require("node:child_process"),x7=m(require("node:fs")),W7=m(require("node:path"));Yg();v7=12e4,Uo=(e,t)=>{let r=W7.default.join(e,"app",SN,"ensure-writer.sh");return x7.default.existsSync(r)?new Promise((o,n)=>{let s=(0,I7.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},l=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(v7/1e3)}s`))},v7);s.on("error",c=>{clearTimeout(l),n(c)}),s.on("close",c=>{if(clearTimeout(l),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var O7,Si,ym,JA,G0,fm,YA,XA,V0,K0,sge,Wl,ige,age,q0,J0=a(()=>{"use strict";O7=require("node:child_process");or();qA();FA();HA();lm();$A();Si=new Map,ym=e=>e==="cursor"||e==="antigravity",JA=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",G0=e=>Si.get(e)?.warmed===!0,fm=e=>{let t=Si.get(e);Si.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},YA=e=>Si.get(e)?.conversationStarted===!0,XA=e=>{let t=Si.get(e);Si.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},V0=e=>{Si.delete(e)},K0=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",sge={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},Wl=e=>`${sge[e]} is ready on your computer.
Send a task from the box below when you are ready.
`,ige=(e,t,r,o)=>new Promise(n=>{let s=If(t,r),i=[],l=(0,O7.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};l.stdout?.on("data",c),l.stderr?.on("data",c),l.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),l.on("error",d=>{n({exitCode:-1,output:d.message})})}),age=(e,t)=>{let r=Wl(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},q0=async e=>{if(!Ce(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&tt(e.runConfig.writerExecutionBackend)==="api"){let r=Lt(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Ke(e.runConfig.layout.configPath);return mt(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this computer (no local CLI).
`),fm(e.writerAgent),{exitCode:0,output:Wl(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your computer\u2026
`),await Uo(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}ym(e.writerAgent)&&fm(e.writerAgent);let t=await ige(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?age(e.writerAgent,t.output):Wl(e.writerAgent)}}});var ZA,M7=a(()=>{"use strict";ZA={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var j7,N7=a(()=>{"use strict";j7="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var D7,H7=a(()=>{"use strict";ct();N7();D7=e=>e.code===ls.SESSION_LIMIT?j7:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var F7,$7=a(()=>{"use strict";ct();M7();H7();F7=e=>{let t=Ak(e.output);return t!==null?{status:ZA.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:D7(t)}:{status:e.exitCode===0?ZA.COMPLETED:ZA.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var Y0,Unt,z7=a(()=>{"use strict";Y0={OPEN:"open",APPROVAL:"approval"},Unt=Y0.APPROVAL});var Ol,QA,U7,lge,B7,G7,V7,Ml,X0,Z0=a(()=>{"use strict";Ol=m(require("node:fs")),QA=m(require("node:path")),U7="runs",lge=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),B7=e=>{let t=e.profileEmail!==null?QA.default.join(e.installDir,"profiles",e.profileEmail,U7):QA.default.join(e.installDir,U7);return Ol.default.mkdirSync(t,{recursive:!0}),t},G7=(e,t)=>QA.default.join(B7(e),`${t}.json`),V7=(e,t)=>{Ol.default.writeFileSync(G7(e,t.id),JSON.stringify(t,null,2))},Ml=(e,t)=>{let r=G7(e,t);if(!Ol.default.existsSync(r))return null;try{let o=JSON.parse(Ol.default.readFileSync(r,"utf8"));return!lge(o)||typeof o.id!="string"?null:o}catch{return null}},X0=e=>{let t=B7(e),r=Ol.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Ml(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var cge,K7,q7=a(()=>{"use strict";$7();z7();Z0();cge=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=F7({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:Y0.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},K7=(e,t)=>{let r=cge(t);return V7(e,r),r}});var J7=a(()=>{"use strict";HP()});var Y7,X7=a(()=>{"use strict";ct();Y7=()=>[Ef,`agentRunWriterExecutionBackend=${Cf}`,`agentRunWriterExecutionReasonCode=${bk}`].join(`
`)});var On,eb=a(()=>{"use strict";On=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var Q0,dge,uge,Z7,Q7=a(()=>{"use strict";Q0=e=>e.toLocaleString("en-US"),dge=e=>e<.01?e.toFixed(4):e.toFixed(3),uge=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${dge(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${Q0(e.inputTokens)} in / ${Q0(e.outputTokens)} out (${Q0(e.totalTokens)} total)`,t].join(`
`)},Z7=(e,t)=>{if(t===void 0)return e;let r=uge(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var eX=a(()=>{"use strict";X()});var oX,hm,Te,tb,eO,rb,tX,rX,pge,mge,nX,sX,iX,Sm,tO,rO,oO,aX,gge,Xt,Pm,Bo,lX,fge,yge,ob,nO,sO,Am,hge,iO,cX=a(()=>{"use strict";oX=require("node:child_process");X();ct();or();UY();Pp();I0();KY();qc();t7();zA();o7();Bi();i7();UA();GA();KA();L7();F0();Lf();J0();q7();J7();X7();eb();Q7();Gi();eX();lm();Ac();KA();hm=new Map,Te=new Map,tb=new Set,eO=new Set,rb=new Map,tX=ad(),rX=e=>{e!==void 0&&!rb.has(e)&&rb.set(e,Date.now())},pge=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(to(t)){Xt(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}zo(t,n)},mge=(e,t,r,o,n)=>{if(!lw(e,n))return;let s=`${Y7()}
`;pge(t,r,o,s);let i=Te.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},nX=130,sX=`

Stopped by user.`,iX=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:On(e)},Sm=null,tO=e=>{Sm=e},rO=(e,t)=>{if(Sm===null)return;let r=Xv(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||uR(Sm,t,r)},oO=async e=>{await M0({layout:e,cloudApi:Sm})},aX=e=>{let t=hm.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Ht(t.pid)},gge=e=>Le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),Xt=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(fs(t)))},Pm=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let l=Oi(s),c=Te.get(r);if(l!==null&&c!==void 0){let d=CN(l),u=aX(r)||U0(r);d!==null&&!u&&Bo(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return EN(l)}}),Bo=(e,t,r,o,n,s,i,l,c)=>{if(r!==void 0){if(tX.has(r))return;tX.add(r)}let d=ea(s,l),u=n,g=Z7(d.output,d.llmUsage);if(r!==void 0){let y=rb.get(r);rb.delete(r),y!==void 0&&Jv({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-y)/1e3))});let A=VY(d.llmUsage,g);A!==null&&O4({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:A})}r!==void 0&&mm(r),r!==void 0&&eO.has(r)?(eO.delete(r),tb.delete(r),u=RD,g=p7(g.replace(/\n*Stopped by user\.$/,""))):r!==void 0&&tb.has(r)&&(tb.delete(r),u=nX,g=g.trim().length>0&&!g.includes("Stopped by user.")?`${g.trim()}${sX}`:"Stopped by user."),g=en(g).scrubbed;let f=r!==void 0?Xv(e.layout.reportsDir,r):null;if(r!==void 0){um(r),nd(e.layout,r),to(r)&&(Xt(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),a7(r));let y=Te.get(r);I4({reportsDir:e.layout.reportsDir,agentRunId:r,input:On(i),output:g,...y!==void 0?{writerLabel:cm({writerAgent:y.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),y!==void 0&&NP({layout:e.layout,writerAgent:y.writerAgent,projectFolderPath:y.projectFolderPath,userPrompt:y.userTranscriptPrompt,assistantOutput:g,agentRunId:r}),K7(e.layout,{agentRunId:r,originalPrompt:i,exitCode:u,output:g,layout:e.layout}),e7(e.layout,{runId:r,exitCode:u,output:g,createdAt:new Date().toISOString(),...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{}}),M0({layout:e.layout,cloudApi:Sm}),Te.delete(r),hm.delete(r),DA(e.layout,r)}Xt(t,{type:"command.claude.result",payload:{exitCode:u,output:g,...r!==void 0?{agentRunId:r}:{},...typeof f?.estimateSeconds=="number"?{estimateSeconds:f.estimateSeconds}:{},...typeof f?.actualSeconds=="number"?{actualSeconds:f.actualSeconds}:{},...l!==void 0?{llmUsage:l}:{},...c!==void 0?{errorCode:c}:{}},requestId:o}),Oc(e.layout)},lX=(e,t,r,o,n,s,i)=>{let l=Te.get(r),c=l?.accumulatedOutput??s;mm(r),zY(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),hi(t,r,()=>v0(e.layout,r),Pm(e,t,r,o,l?.projectFolderPath,l?.reportKey,!0)),Xt(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},fge=(e,t,r,o,n,s,i,l)=>{let c=[],d=!1,u=y=>{if(!(n===void 0||y.length===0)){if(to(n)){Xt(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:y},requestId:o});return}zo(n,y)}};if(n!==void 0){let y=Te.get(n);hm.set(n,t),Te.set(n,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:l,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,accumulatedOutput:y?.accumulatedOutput??""}),Xt(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),hi(r,n,()=>aX(n),Pm(e,r,n,o,y?.projectFolderPath,y?.reportKey))}let g=l==="claude-cli",f=[];t.stdout?.on("data",y=>{let A=y.toString("utf8");if(g?f.push(A):(c.push(A),u(A)),d||n===void 0)return;let S=gm(c.join(""));if(S!==null){d=!0,t.kill("SIGTERM");let P=Te.get(n),p=[P?.accumulatedOutput??"",S.partialOutput].filter(b=>b.length>0).join(`

`);P!==void 0&&(P.accumulatedOutput=p),hm.delete(n),lX(e,r,n,o,S.question,p,s)}}),t.stderr?.on("data",y=>{let A=y.toString("utf8");c.push(A),u(A)}),t.on("close",y=>{if(d)return;XA(l);let A=n!==void 0?Te.get(n):void 0,S=g?ea(f.join("")):{output:c.join("").trim(),llmUsage:void 0},P=g?c.join("").trim():"",p=[S.output.trim(),P].filter(C=>C.length>0).join(`
`);g&&S.output.trim().length>0&&u(S.output);let b=A!==void 0&&A.accumulatedOutput.length>0?`${A.accumulatedOutput}

${p}`.trim():p;Bo(e,r,n,o,y??-1,b,s,S.llmUsage)}),t.on("error",y=>{d||Bo(e,r,n,o,-1,y.message,s)})},yge=(e,t,r,o,n,s,i,l,c)=>{let d=iX(r,c);s!==void 0&&(Te.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:l,accumulatedOutput:""}),Xt(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),hi(n,s,()=>Te.has(s),Pm(e,n,s,o,i,l))),Zc(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(to(s)){Xt(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}zo(s,g)}}).then(g=>{XA(t),Bo(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let f=g instanceof Error?g.message:String(g);Bo(e,n,s,o,-1,f,r)})},ob=(e,t,r,o,n,s,i,l,c,d,u,g)=>{let f=iX(r,u);Wc(e.layout);let y=p=>{Bo(e,n,s,o,-1,ds(p),r,void 0,p)};if(lo(e.layout.configPath)){y(oe.CODING_TOOLS_PAUSED);return}if(ms(e,t)){rX(s),yge(e,t,r,o,n,s,c,d,f);return}let A=Or(t,r,gge(e),i);if(A===null){Bo(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}if(c===void 0||c.trim().length===0){y(oe.FOLDER_REQUIRED);return}rX(s);let S=s7({workspace:e.workspace,projectFolderPath:c}),P=()=>{let p=(0,oX.spawn)(A.command,[...A.args],{cwd:S,stdio:["ignore","pipe","pipe"],env:g??process.env,detached:process.platform!=="win32"});fge(e,p,n,o,s,r,f,t)};if(s===void 0){P();return}u7(s,()=>{hge(e,n,s,o)}),Te.set(s,{originalPrompt:r,userTranscriptPrompt:f,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Te.get(s)?.accumulatedOutput??""}),mge(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Pc({reportKey:d,agentRunId:s,userSummary:"Task started on your computer."}),hi(n,s,()=>Te.has(s),Pm(e,n,s,o,c,d)),C7({socket:n,sendMessage:Xt,requestId:o,agentRunId:s,shellSessionId:l,command:A.command,args:A.args,cwd:S,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:p=>{l!==void 0&&xl(l,h=>{Xt(n,h)},o);let b=Te.get(s),C=[b?.accumulatedOutput??"",p.partialOutput].filter(h=>h.length>0).join(`

`);b!==void 0&&(b.accumulatedOutput=C),lX(e,n,s,o,p.question,C,r)},onFinished:(p,b)=>{XA(t);let C=ea(b),h=Te.get(s),_=h!==void 0&&h.accumulatedOutput.length>0?`${h.accumulatedOutput}

${C.output}`.trim():C.output;Bo(e,n,s,o,p,_,r,C.llmUsage)}}).then(p=>{if(!p){P();return}hi(n,s,()=>U0(s),Pm(e,n,s,o,c,d))}).catch(p=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",p instanceof Error?p.message:p),P()})},nO=(e,t,r,o)=>{DA(e.layout,t.agentRunId),t.shellSessionId!==void 0&&Xt(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=E7(t),s=Te.get(t.agentRunId),i=s?.writerAgent??"claude-cli",l=s?.projectFolderPath,c=s?.reportKey;ob(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,l,c,s?.userTranscriptPrompt)},sO=(e,t)=>{for(let r of $Y(e.layout))Te.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:On(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),hi(t,r.agentRunId,()=>v0(e.layout,r.agentRunId),{awaitingInput:!0}),Xt(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},Am=(e,t,r,o)=>{let n=Te.get(r);if(n===void 0)return!1;tb.add(r),um(r),mm(r);let s=hm.get(r);if(s!==void 0)return m7(s),!0;if(k7(r))return!0;DA(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${sX}`:"Stopped by user.";return Bo(e,t,r,o,nX,i,n.originalPrompt),!0},hge=(e,t,r,o)=>Te.has(r)?(eO.add(r),Am(e,t,r,o)):!1,iO=(e,t)=>[...Te.keys()].filter(r=>Am(e,t,r)).length});var Sge,aO,dX=a(()=>{"use strict";ud();Sge=()=>`http://127.0.0.1:${nr()}/restart`,aO=async()=>{try{let e=await fetch(Sge(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var uX=a(()=>{"use strict";su()});var pX=a(()=>{"use strict";WI()});var lO,mX=a(()=>{"use strict";lO=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var bm,Pge,cO,dO,gX=a(()=>{"use strict";K();de();uX();qT();pX();mX();Gi();bm=(e,t)=>{fn(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},Pge=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(gk(),mk)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},cO=e=>lO({localBundleVersion:Ue(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),dO=async e=>{let t=Ue(e.layout.installDir)?.bundleVersion??null;if(!lO({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(rr(e.layout)){Mc({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),bm(e.layout,{summary:r,action:"install-bundle-update-start"}),no({launchAgentLabel:Ae(e.layout.installDir),installDir:e.layout.installDir});let o=await gl({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),bm(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await Pge();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),bm(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),bm(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),bm(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var Age,uO,fX=a(()=>{"use strict";Age=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),uO=e=>{if(!Age(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var pO,mO,yX=a(()=>{"use strict";vT();IT();pO=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=Bd({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},mO=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await Ao(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var hX,bge,_ge,kge,jl,SX=a(()=>{"use strict";hX=m(require("node:os"));et();bge="Default",_ge=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),kge=e=>{let t=hX.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},jl=()=>{let e=N(),t=oc(e),r=_ge(bge);return`${kge(t)}/${r.length>0?r:"project"}`}});var PX=a(()=>{"use strict";su()});var AX,gO,bX=a(()=>{"use strict";PX();AX=!1,gO=e=>{AX||(AX=!0,process.on("uncaughtException",t=>{xs(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;xs(e,{kind:"crash",message:r,stack:o})}))}});var _X,wge,fO,kX=a(()=>{"use strict";_X=require("node:child_process");qA();or();FA();HA();lm();$A();wge=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,_X.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},fO=async e=>{if(!Ce(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&tt(e.runConfig.writerExecutionBackend)==="api"){let r=Lt(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Ke(e.layout.configPath),n=mt(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.`}}}try{await Uo(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await wge(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var yO,wX=a(()=>{"use strict";yO=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var RX,hO,TX=a(()=>{"use strict";RX=require("node:crypto"),hO=()=>(0,RX.randomUUID)()});var Nl,EX,nb=a(()=>{"use strict";Nl="[[WORKING_ESTIMATE]]",EX=(e,t,r,o="")=>["Estimate how long the following task will take on this computer, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",Nl,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var CX,LX=a(()=>{"use strict";CX=e=>e===null||e<=0?"Estimate saved locally. Starting work on your computer\u2026":e<60?`Estimated ~${e}s. Starting work on your computer\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your computer\u2026`});var Rge,vX,IX=a(()=>{"use strict";nb();Rge=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,vX=e=>{if(!e.includes(Nl))return null;let t=null;for(let r of e.matchAll(Rge)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var Tge,SO,xX=a(()=>{"use strict";IX();Tge=/^(\d{1,6})\b/,SO=e=>{let t=vX(e);if(t!==null)return t;let r=Tge.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var Ege,Cge,Lge,sb,PO=a(()=>{"use strict";or();ru();Ege="http://127.0.0.1:11434",Cge=45e3,Lge=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},sb=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Ege,o=t===void 0?(await cr({commands:Le({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(Cge)});return n.ok?Lge(await n.json()):null}catch{return null}}});var AO,bO,_O,WX=a(()=>{"use strict";Ac();nb();eb();LX();xX();Pp();PO();AO=async e=>{let t=On(e.wrappedPrompt),r=x4(e.reportsDir);return{estimateOutput:await sb(EX(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},bO=e=>{let t=SO(e.estimateOutput);t!==null&&vP({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},_O=e=>{let t=SO(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=CX(t);return Sc({reportKey:e.reportKey,agentRunId:e.agentRunId,status:vr.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),vP({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var ib,OX,kO=a(()=>{"use strict";ib="[[WORKING_TOKEN_ESTIMATE]]",OX=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this computer.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",ib,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var MX,vge,jX,NX=a(()=>{"use strict";kO();MX=/^(\d{1,8})\b/,vge=e=>{let t=e.indexOf(ib);if(t<0)return null;let r=e.slice(t+ib.length).trim(),o=MX.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},jX=e=>{let t=vge(e);if(t!==null)return t;let r=MX.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var wO,RO,DX=a(()=>{"use strict";kO();eb();NX();Pp();PO();wO=async e=>{let t=On(e.wrappedPrompt),r=M4(e.reportsDir);return{estimateOutput:await sb(OX(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},RO=e=>{let t=jX(e.estimateOutput);return t===null?null:(W4({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var HX=a(()=>{"use strict";R0();IY();WY();NY();ud();cX();qA();or();Z0();UA();dX();NT();gX();Gi();fX();yX();zA();SX();bX();kX();Xg();wX();TX();nb();Ac();WX();DX();I0();ru();GA();J0()});var FX={};kt(FX,{buildContinuationPromptWithContext:()=>Wge});var Ige,xge,Wge,$X=a(()=>{"use strict";Ige=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,xge=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Wge=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=xge(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${Ige(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var zX={};kt(zX,{readHarnessExportSets:()=>Mge});var _m,TO,ab,Oge,Mge,UX=a(()=>{"use strict";_m=m(require("node:fs")),TO=m(require("node:path"));et();ab=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Oge=e=>{if(!_m.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(_m.default.readFileSync(e.harnessManifestPath,"utf8"));if(ab(t))return t}catch{return null}return null},Mge=(e,t)=>{let r=N(t),o=Oge(r);if(o===null)return[];let n=ab(o.sets)?o.sets:{},s=[];for(let i of e){let l=n[i];if(!ab(l)||typeof l.name!="string")continue;let c=Array.isArray(l.items)?l.items:[],d=[];for(let u of c){if(!ab(u))continue;let g=typeof u.path=="string"?u.path:void 0,f=typeof u.id=="string"?u.id:"",y=typeof u.kind=="string"?u.kind:"",A=typeof u.title=="string"?u.title:"";if(g===void 0||f.length===0||y.length===0||A.length===0)continue;let S=g.startsWith("shared/")?TO.default.join(r.harnessRootDir,g):TO.default.join(r.harnessSetsDir,i,g);_m.default.existsSync(S)&&d.push({id:f,kind:y,title:A,content:_m.default.readFileSync(S,"utf8")})}d.length>0&&s.push({name:l.name,slug:i,items:d})}return s}});var WO,LO,Dl,BX,jge,GX,VX,EO,KX,vO,IO,xO,qX,CO,se,Y,lb,Nge,km,Dge,Hge,Fge,$ge,zge,Uge,Bge,Gge,wm,JX=a(()=>{"use strict";WO=require("node:child_process"),LO=m(require("node:fs")),Dl=m(require("node:os"));AY();K();de();as();GW();wY();X();MW();X();xr();su();nC();bA();HP();vt();ln();nE();Rt();ct();TY();HX();BX=3e4,jge=3e4,GX=new Map,VX=new Map,EO=new Map,KX=new Map,vO=new Map,IO=new Map,xO=new Map,qX=ad(),CO=new Set,se=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Y=(e,t,r)=>{if(e.readyState===Cl.OPEN){let o=fs(t);e.send(JSON.stringify(o)),r!==void 0&&(fn(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Fh(r,"out",o))}},lb=e=>e,Nge=e=>{if(!LO.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(LO.default.readFileSync(e.harnessManifestPath,"utf8"));if(se(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},km=(e,t)=>{let r=Nge(t);r!==null&&Y(e,{type:"harness.manifest.report",payload:{hostname:Dl.default.hostname(),manifest:r}})},Dge=async(e,t,r,o,n,s,i=!1,l,c,d,u,g)=>{let f=g?.trim()??"";if(!Ce(t)){Y(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let y=cm({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),A=await cr({commands:Le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),S=s!==void 0?AO({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:A?.estimateModel,capabilityNote:A?.capabilityNote}).catch(()=>null):null,P=s!==void 0?wO({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:A?.estimateModel,capabilityNote:A?.capabilityNote}).catch(()=>null):null,p=ym(t)&&!G0(t);if(p){try{await Uo(e.layout.installDir,t)}catch(j){let q=j instanceof Error?j.message:String(j);Y(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${q}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}fm(t)}else if(!ym(t))try{await Uo(e.layout.installDir,t)}catch(j){let q=j instanceof Error?j.message:String(j);Y(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${q}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let b=rd(d,jl,g);if(b===null){Y(n,ld({code:oe.FOLDER_REQUIRED,...s!==void 0?{agentRunId:s}:{},...o!==void 0?{requestId:o}:{}}));return}dt({projectFolderPath:b,...f.length>0?{projectId:f}:{}}),i||wp(e.layout,t,b);let C=DP({sessionContinuation:i,supportsWriterSessionContinuation:JA(t),isWriterConversationStarted:YA(t)}),h=i&&C==="first"?kp(e.layout,t,b):null,_=h!==null?pl(e.layout,h):null,w=_!==null&&_.turns.length>0,R=pI({sessionContinuation:i,supportsWriterSessionContinuation:JA(t),isWriterConversationStarted:YA(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:w,userPromptCharacterCount:r.length}),E=r;if(R.continuationStrategy==="source_run_seed"){let j=typeof c=="string"&&c.length>0?Ml(e.layout,c):null;if(j!==null){let{buildContinuationPromptWithContext:q}=await Promise.resolve().then(()=>($X(),FX));E=q({priorPrompt:j.prompt,priorOutput:j.resultOutput??"",userMessage:r})}}else R.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(E=WP({priorTurns:_.turns,userMessage:r}));let x=R.ragLimit>0?await ja({layout:e.layout,query:E,limit:R.ragLimit,minScore:R.ragMinScore,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],W=R.ragLimit>0&&b.trim().length>0?await rC({layout:e.layout,query:E,limit:2,minScore:.32,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],z=R.injectMemory?rI(e.layout,b,f.length>0?f:void 0):[],O=`${nI(z,R.memoryEntryLimit)}${QE(x)}${oC(W)}${E}`,U=u?.trim()??(s!==void 0&&b.trim().length>0?hO():void 0);if(s!==void 0&&U!==void 0&&U.length>0&&b.trim().length>0){Pc({reportKey:U,agentRunId:s,userSummary:"Working on your computer\u2026"});let j=O;S!==null&&S.then(q=>{if(q===null)return;let br=_O({estimateOutput:q.estimateOutput??"",reportKey:U,agentRunId:s,reportsDir:e.layout.reportsDir,task:q.task,writerLabel:q.writerLabel,embedding:q.embedding});if(br.estimateSeconds===null)return;rO(e.layout.reportsDir,s);let _r=`${Nl}
${br.estimateSeconds}
`;if(to(s)){Y(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:_r},requestId:o});return}zo(s,_r)}).catch(()=>{}),O=yO(j),O=v_(O,{agentRunId:s,reportKey:U,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&S!==null&&S.then(j=>{j!==null&&bO({estimateOutput:j.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:j.task,writerLabel:j.writerLabel,embedding:j.embedding})}).catch(()=>{}),s!==void 0&&P!==null&&P.then(j=>{j!==null&&RO({estimateOutput:j.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:j.task,writerLabel:j.writerLabel})}).catch(()=>{});let pe=s!==void 0&&xO.get(s)===!0;if(s!==void 0&&b.trim().length>0){let j=await By(b);IO.set(s,j),U!==void 0&&U.length>0&&vO.set(s,U)}ob(e,t,O,o,lb(n),s,{sessionTurn:R.sessionTurn},l,b,U,r,ow(e.layout,s,pe)),p&&s!==void 0&&Y(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:K0(t)},requestId:o})},Hge=async(e,t,r,o,n)=>{let s=(i,l)=>{Y(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:l},requestId:o})};try{let i="",l=await q0({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,Y(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=Ce(t)?t:"claude-cli",d=l.exitCode!==0?l.output:i.length>0?Wl(c):l.output;s(d,l.exitCode)}catch(i){let l=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",l),s(`Failed to start ${t} session: ${l}
`,-1)}},Fge=(e,t,r)=>new Promise(o=>{if(!Ce(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Or(t,r,Le({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,WO.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",l=>{s.push(l.toString("utf8"))}),i.stderr?.on("data",l=>{s.push(l.toString("utf8"))}),i.on("close",l=>{o({exitCode:l??-1,output:s.join("").trim()})}),i.on("error",l=>{o({exitCode:-1,output:l.message})})}),$ge=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;Y(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=Nr(t.bundle),s=se(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=Be(e.wsUrl)??wt,g=await Vw({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return Y(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let l=Ps({bundle:i,layout:e.layout});return Y(o,{type:"harness.request.result",payload:{success:l.ok,writerAgent:"deterministic",exitCode:l.ok?0:1,output:l.ok?`Installed harness set "${i.slug}" (${l.writtenItemCount??0} files).`:l.errorMessage??"Harness install failed.",...l.ok?{}:{errorMessage:l.errorMessage??"Harness install failed."}},requestId:r}),l.ok&&km(o,e.layout),!0},zge=async(e,t,r,o)=>{if(await $ge(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(Y(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){Y(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!Ce(n)){Y(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}if(lo(e.layout.configPath)){Y(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorCode:oe.CODING_TOOLS_PAUSED,errorMessage:ld({code:oe.CODING_TOOLS_PAUSED}).payload.output},requestId:r});return}Wc(e.layout);let i=await(async()=>{try{await Uo(e.layout.installDir,n)}catch(l){let c=l instanceof Error?l.message:String(l);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Fge(e,n,s)})().finally(()=>{Oc(e.layout)});Y(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),km(o,e.layout)},Uge=e=>{let t=1e3*2**e;return Math.min(jge,t)},Bge=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>t.restartInFlight?"already_in_progress":rr(e.layout)?(jc(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,aO().then(b=>{if(b.ok){console.log("[agent-witch] Local restart completed.");return}if(!b.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",b.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=(p,b,C,h)=>{Y(p,{type:"device.restart.ack",payload:pw({status:C,reason:b}),...h!==void 0?{requestId:h}:{}},e.layout)},n=(p,b="system.ack")=>{if(!t.selfUpdateInFlight&&cO({installDir:e.layout.installDir,remoteBundleVersion:p})){if(rr(e.layout)){Mc({layout:e.layout,remoteBundleVersion:p,trigger:b}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${b}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,dO({layout:e.layout,remoteBundleVersion:p,trigger:b}).finally(()=>{t.selfUpdateInFlight=!1})}},s=()=>{let p=We(e.layout);p!==null&&Ge(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,c(),d(),A())},i=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},l=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},c=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},d=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===Cl.OPEN||p.readyState===Cl.CONNECTING)&&p.close()},u=()=>{l(),t.localHealthTimer=setInterval(s,BX)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=Uge(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,A()},p)},f=p=>{i();let b=()=>{let C=Lc(e.layout.installDir),h=nr();Y(p,{type:"agent.heartbeat",payload:{hostname:Dl.default.hostname(),macOsUsername:Dl.default.userInfo().username,wakeError:t.wakeError,wakePort:h,...e.email!==null?{email:e.email}:{},installBundleVersion:C}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};b(),t.heartbeatTimer=setInterval(b,BX)},y=(p,b)=>{if(typeof p.type!="string")return;if(oE(p)){t.stopped=!0,i(),c(),d(),eE({layout:e.layout}).finally(()=>{om(),process.exit(0)});return}fn(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),Fh(e.layout,"in",p);let C=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&se(p.payload)){let h=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",_=typeof p.payload.origin=="string"?p.payload.origin:"",w=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",R=typeof p.payload.challenge=="string"?p.payload.challenge:"",E=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!BW({serverPublicKey:h,origin:_,devicePublicKey:w,challenge:R,serverAttestation:E})){t.wakeError="Server attestation verification failed",fn(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&se(p.payload)){let h=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";fn(e.layout,{direction:"local",type:"writer.ensure",summary:h,action:"ensure-writer"}),fO({layout:e.layout,writerAgent:h,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(_=>{Y(b,{type:"writer.status",payload:_},e.layout)})}if(p.type==="install.bundle.update"&&se(p.payload)){let h=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";h.length>0&&n(h,"install.bundle.update")}if(p.type==="system.ack"){wf(e.layout,{wsUrl:e.wsUrl});let h=se(p.payload)?p.payload:null,_=uO(h);_!==null&&n(_)}if(p.type==="device.restart"){let h=r("cloud-device-restart");o(b,"cloud-device-restart",h,C)}if(p.type==="automations.sync"&&se(p.payload)&&pO(p.payload),p.type==="project.message.history"&&se(p.payload)){hx({payload:p.payload});return}if(p.type==="automations.run"&&se(p.payload)&&mO(p.payload),p.type==="terminal.stream.accepted"&&se(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"";if(h.length>0){let _=D0(h);for(let w of _)Y(b,{type:"terminal.stream.chunk",payload:{runId:h,chunk:w},requestId:C})}}if(p.type==="agent.agentRun.list"&&Y(b,{type:"dashboard.agentRun.list.result",payload:{runs:X0(e.layout)},requestId:C}),p.type==="agent.agentRun.get"&&se(p.payload)){let h=typeof p.payload.runId=="string"?p.payload.runId:"",_=h.length>0?Ml(e.layout,h):null;Y(b,{type:"dashboard.agentRun.get.result",payload:{run:_},requestId:C})}if(p.type==="command.claude.run"&&se(p.payload)){let h=p.payload.prompt,_=typeof p.payload.writerAgent=="string"&&Ce(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",w=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,R=p.payload.sessionContinuation===!0,E=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,x=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,W=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,z=rd(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,jl,W),O=Yk(p.payload.compositionSnapshot),U=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof h=="string"&&h.trim().length>0){if(console.log(`[agent-witch] Running ${_} task (${R?"continue":"first"})\u2026`),w!==void 0&&(qX.has(w)||CO.has(w)||Ml(e.layout,w)!==null)){console.log(`[agent-witch] Ignoring duplicate run ${w}.`);return}let pe=q=>{Y(b,ld({code:q,...w!==void 0?{agentRunId:w}:{},...C!==void 0?{requestId:C}:{}}))},j=q=>{if(O!==null){let br=Zk(e.layout,O);if(br!==null){Y(b,{type:"command.claude.result",payload:{exitCode:-1,output:br,...w!==void 0?{agentRunId:w}:{}},requestId:C});return}if(w!==void 0){let _r=ew(e.layout,w,O);if(!_r.ok){Y(b,{type:"command.claude.result",payload:{exitCode:-1,output:_r.errorMessage,...w!==void 0?{agentRunId:w}:{}},requestId:C});return}xO.set(w,O.entries.some(Go=>Go.scope==="run"))}}w!==void 0&&x!==void 0&&GX.set(w,x),w!==void 0&&(VX.set(w,q),W!==void 0&&W.trim().length>0&&EO.set(w,W.trim()),KX.set(w,h.trim()),dt({projectFolderPath:q,...W!==void 0&&W.trim().length>0?{projectId:W.trim()}:{}})),Dge(e,_,h.trim(),C,b,w,R,x,E,q,U,W)};w!==void 0&&CO.add(w),RY({config:e,...W!==void 0?{projectId:W}:{},requestedFolderPath:z,defaultFolderPath:jl()}).catch(()=>({ok:!1,code:oe.FOLDER_CHECK_UNAVAILABLE})).then(q=>{if(w!==void 0&&CO.delete(w),!q.ok){pe(q.code);return}w!==void 0&&qX.add(w),j(q.folderRealPath)}).catch(q=>{console.error("[agent-witch] Run start failed:",q instanceof Error?q.message:q)})}}if(p.type==="shell.session.open"&&se(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",_=typeof p.payload.cols=="number"?p.payload.cols:120,w=typeof p.payload.rows=="number"?p.payload.rows:32;h.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),B0({shellSessionId:h,cwd:e.workspace,cols:_,rows:w,send:R=>{Y(b,R)},requestId:C}))}if(p.type==="shell.session.close"&&se(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";h.length>0&&xl(h,_=>{Y(b,_)},C)}if(p.type==="shell.input"&&se(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",_=typeof p.payload.data=="string"?p.payload.data:"";h.length>0&&_.length>0&&$0(h,_)}if(p.type==="shell.resize"&&se(p.payload)){let h=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",_=typeof p.payload.cols=="number"?p.payload.cols:0,w=typeof p.payload.rows=="number"?p.payload.rows:0;h.length>0&&_>0&&w>0&&z0(h,_,w)}if(p.type==="command.writer.session.end"&&se(p.payload)){let h=p.payload.writerAgent;typeof h=="string"&&Ce(h)&&(V0(h),jP(e.layout,h))}if(p.type==="command.writer.session.start"&&se(p.payload)){let h=p.payload.writerAgent,_=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof h=="string"&&Ce(h)&&_.length>0&&(console.log(`[agent-witch] Starting ${h} session\u2026`),Hge(e,h,_,C,b))}if(p.type==="command.claude.stop"&&se(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";h.length>0&&(console.log(`[agent-witch] Stopping run ${h}\u2026`),Am(e,lb(b),h,C))}if(p.type==="command.claude.input_respond"&&se(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",_=typeof p.payload.response=="string"?p.payload.response.trim():"",w=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",R=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",E=typeof p.payload.question=="string"?p.payload.question:"";h.length>0&&_.length>0&&w.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),nO(e,{agentRunId:h,originalPrompt:w,partialOutput:R,question:E,response:_,shellSessionId:GX.get(h)},C,lb(b)))}if(p.type==="dispatch.approval.required"&&se(p.payload)){let h=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",_=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${h}: ${_}`),process.platform==="darwin"&&(0,WO.spawn)("osascript",["-e",`display notification "${_.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${h.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&se(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),zge(e,p.payload,C,b)),p.type==="harness.export.request"&&se(p.payload)){let h=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",_=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,w=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(R=>typeof R=="string"):[];h.length>0&&w.length>0&&(async()=>{let{readHarnessExportSets:R}=await Promise.resolve().then(()=>(UX(),zX)),E=R(w,e.email);Y(b,{type:"harness.export.result",payload:{success:E.length>0,borrowerUserId:h,..._!==void 0?{targetDeviceId:_}:{},sets:E,errorMessage:E.length>0?void 0:"No readable harness sets were found on this machine."},requestId:C})})()}if(p.type==="harness.manifest.request"&&km(b,e.layout),p.type==="command.claude.result"&&se(p.payload)){let h=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,_=typeof p.payload.output=="string"?p.payload.output:"",w=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,R=rd(h!==void 0?VX.get(h):void 0,jl),E=h!==void 0?EO.get(h):void 0,x=h!==void 0?KX.get(h)??"":"",W=WR({exitCode:w,output:_});if(W&&R!==null&&ZE({layout:e.layout,text:_,source:h??"command.claude.result",projectFolderPath:R,...E!==void 0?{projectId:E}:{}}),w!=null&&w!==0&&_.trim().length>0&&R!==null&&(KE({layout:e.layout,errorText:_,projectFolderPath:R,...E!==void 0?{projectId:E}:{}}),tC({layout:e.layout,text:_,source:h??"command.claude.result.failure",projectFolderPath:R,...E!==void 0?{projectId:E}:{}})),W&&x.trim().length>0&&R!==null&&oI({layout:e.layout,projectFolderPath:R,...E!==void 0?{projectId:E}:{},entry:{id:`${Date.now()}-${h??"run"}`,...h!==void 0?{agentRunId:h}:{},prompt:x,output:_,createdAt:new Date().toISOString()}}),h!==void 0&&R!==null){let O=vO.get(h),U=IO.get(h);O!==void 0&&U!==void 0&&By(R).then(pe=>{let j=NR({before:U,after:pe});I_(O,j),IO.delete(h),vO.delete(h)})}if(W&&E!==void 0&&E.trim().length>0){let O=H(),U=O===null?null:V({wsUrl:O.wsUrl,pairingToken:O.pairingToken});U!==null&&HR(U,E,{...h!==void 0?{sourceRunId:h}:{},lesson:DR({prompt:x,output:_})})}h!==void 0&&(nd(e.layout,h),xO.delete(h),EO.delete(h))}},A=()=>{if(t.stopped)return;c(),d();let p=new Cl(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),tO(V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),oO(e.layout);let b=Be(e.wsUrl)??"http://localhost:3000",C=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),h=UW({layout:e.layout,origin:b,...C!==void 0&&C.length>0?{claimToken:C}:{}});Y(p,{type:"agent.register",payload:{role:"agent",hostname:Dl.default.hostname(),macOsUsername:Dl.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...h}},e.layout),km(p,e.layout),sO(e,p),f(p)}),p.on("message",b=>{let C=typeof b=="string"?b:b.toString("utf8");try{let h=JSON.parse(C);if(!se(h))return;y(h,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(b,C)=>{i(),t.socket=void 0,t.wsConnected=!1,yk(e.layout),t.reconnectAttempt+=1;let h=typeof C=="string"?C:C.toString("utf8");xs(e.layout,{kind:"ws_close",message:"WebSocket closed",code:b,reason:h}),console.log("[agent-witch] Disconnected from server."),g()}),p.on("error",b=>{t.wakeError=b.message,xs(e.layout,{kind:"ws_error",message:b.message,stack:b.stack}),console.error(`[agent-witch] Socket error: ${b.message}`)})},S=fw(e.layout.configPath,p=>{if(!p)return;let b=iO(e,lb(t.socket??{readyState:Cl.CLOSED,send:()=>{}}));console.log(`[agent-witch] Coding tools paused; stopped ${b} run(s).`)}),P=()=>{t.stopped=!0,S(),i(),l(),c(),d()};return ak(()=>{let p=lk();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&n(p.remoteBundleVersion,p.trigger);let b=ck();b!==null&&r(b)}),{connect:A,startLocalHealthCheck:u,stop:P,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:zc(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:Jp(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,A()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to AgentWitch \u2014 manifest saved locally only."}:(km(p,e.layout),{ok:!0})}}},Gge=async()=>{Tt("agent-witch");let e=A0(),t=L();w0().ok||(process.platform==="darwin"?(await qn(t),process.stdout.write(`[agent-witch] Another AgentWitch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another AgentWitch process may already be running \u2014 exiting.
`),process.exit(0)),C0(t);let o=E0({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){no({launchAgentLabel:Ae(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let A=mc({launchAgentPrefix:Ae(t),wakePort:sc(t)});A.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(A.length)} LaunchAgent plist(s).`)}catch(A){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${A instanceof Error?A.message:String(A)}`)}cc()}let n=await uw(),s=n[0];s!==void 0&&gO(s.layout);for(let y of n){let A=Be(y.wsUrl)??wt;vc(y.layout.installDir,A)}let i=n.map(y=>Bge(y)),l=i[0];l===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),om(),process.exit(0));let c=()=>{n.forEach((y,A)=>{let S=i[A];if(S===void 0)return;let P=We(y.layout);hk(P,{socketOpen:S.hasMacSocketOpen(),staleAfterMs:12e4})&&S.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let y=n[0]?.layout;y!==void 0&&(rr(y)||qd(y.installDir))},g=await L0({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):qp({layout:n[0].layout,controllers:{getStatus:l.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:l.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let y of i)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let f=so(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),dc(),d()});d=()=>{f(),g.stop(),om(),console.log("[agent-witch] Shutting down.");for(let y of i)y.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},wm=Gge});var OO=a(()=>{"use strict";JX()});var YX={};kt(YX,{startAgentWitchClient:()=>wm});var XX=a(()=>{"use strict";OO();OO();Yn();x_();Qg();if(!Et()&&Xn(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(Zg(process.argv.slice(e))),wm()}});C_();x_();Yn();Qg();var IN="20.x",xN="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var ore=e=>[`Node.js ${IN} or newer is required (found ${e}).`,xN].join(" "),WN=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${ore(process.version)}
`),process.exit(1))};lf();var Vge=async()=>{Tt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(gk(),mk)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},Kge=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(p1(),u1)),t=await e();if(t.ok){process.stdout.write(`AgentWitch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake AgentWitch. ${r}
`),process.exit(1)},qge=async e=>{try{if(e===of){let{resolveAgentWitchLocalLayout:t}=await Promise.resolve().then(()=>(K(),g_)),{runCheckContextHookCli:r}=await Promise.resolve().then(()=>(ka(),rU));await r({layout:t()})}else process.stderr.write(`[agent-witch] ${Di}: unknown hook ${e??"(none)"}
`)}catch(t){let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] ${Di}: ${r}
`)}await new Promise(t=>{process.stdout.write("",()=>t())}),process.exit(0)},Jge=async()=>{if(!Xn(Et()?void 0:__agentWitchImportMetaUrl))return;process.argv[2]===Di&&await qge(process.argv[3]),WN();let e=process.argv.indexOf("report");e>=0&&process.exit(Zg(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Vge();return}if(t==="wake"){await Kge();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(mB(),pB));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(f6(),g6));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(K(),g_)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(Kv(),_4));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(XX(),YX));await r()};Jge();
