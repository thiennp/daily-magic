#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var wY=Object.create;var hA=Object.defineProperty;var TY=Object.getOwnPropertyDescriptor;var EY=Object.getOwnPropertyNames;var RY=Object.getPrototypeOf,vY=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var R=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)hA(e,r,{get:t[r],enumerable:!0})},CY=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of EY(t))!vY.call(e,n)&&n!==r&&hA(e,n,{get:()=>t[n],enumerable:!(o=TY(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?wY(RY(e)):{},CY(t||!e||!e.__esModule?hA(r,"default",{value:e,enumerable:!0}):r,e));var ml,r0,o0,gl,SA,Nue,n0,_n,ur,$r,Bp,Gp,ri,oi,st,PA,Vp,Kp,qp,fl,zt,kn,wn,yl,Co,AA,s0,He=l(()=>{"use strict";ml={production:".agent-witch",localhost:".local-agent-witch"},r0={production:47892,localhost:47893},o0={production:"com.agent-witch",localhost:"com.local-agent-witch"},gl={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},SA="app",Nue=`${SA}/agent-witch.js`,n0=`${SA}/command`,_n={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},ur=ml.production,$r=ml.localhost,Bp=r0.production,Gp=r0.localhost,ri=o0.production,oi=o0.localhost,st="profiles",PA=gl.activeProfile,Vp="harness",Kp="sets",qp="manifest.json",fl=_n.projectsDir,zt=_n.logsDir,kn="agent-witch.log",wn="agent-witch.error.log",yl=_n.reportsDir,Co=_n.deviceKeypairJson,AA=SA,s0="agent-witch.js"});var i0=l(()=>{"use strict";He()});var a0,Lo,Tn,hl=l(()=>{"use strict";a0=m(require("node:path"));He();Lo=e=>a0.default.basename(e)===$r,Tn=e=>Lo(e)?oi:ri});var pr,ni=l(()=>{"use strict";pr="agent-witch.service"});var Pt,Jp,l0=l(()=>{"use strict";Pt="https://www.agentwitch.com",Jp="wss://www.agentwitch.com/api/agent-witch/ws"});var Sl,zr,c0=l(()=>{"use strict";Sl="127.0.0.1",zr=`http://${Sl}:43347`});var At=l(()=>{"use strict";l0();c0()});var LY,En,Yp,d0,xY,IY,WY,OY,MY,Pl,_A=l(()=>{"use strict";ni();At();LY={darwin:"mac",mac:"mac",macos:"mac",linux:"linux",wsl:"linux",win32:"windows",windows:"windows"},En=e=>LY[(e??"").trim().toLowerCase()]??"unknown",Yp=e=>`nohup "$HOME/${e}/app/command/run.sh" >/dev/null 2>&1 &`,d0=()=>`curl -sS -m 5 "http://127.0.0.1:${43347}/health" || echo "AWL still not responding \u2014 see logs:"`,xY=e=>({platform:"mac",label:"macOS",instructions:"On this computer, open Terminal, paste this command, and press Return.",command:`AW_HOME="$HOME/${e.installDirName}"
launchctl kickstart -k "gui/$(id -u)/${e.launchAgentPrefix}"
sleep 2
${d0()}
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`,note:"Paste and run the whole block so AW_HOME is set before tail. Ignore com.agent-witch-live unless you installed Live as a separate LaunchAgent."}),IY=e=>({platform:"linux",label:"Linux or WSL",instructions:"On this computer, open a terminal (on Windows, your WSL distro's terminal), paste this command, and press Enter.",command:`systemctl --user restart ${pr}
sleep 2
${d0()}
journalctl --user -u ${pr} -n 50 --no-pager`,note:`If systemctl is not available, the installer did not set up auto-start on this computer. Start the client by hand: ${Yp(e.installDirName)}`}),WY=()=>({platform:"windows",label:"Windows (WSL)",instructions:"On this computer, open PowerShell, paste these commands, and press Enter.",command:`wsl.exe -e bash -lc 'systemctl --user restart ${pr}'
wsl.exe -e bash -lc 'systemctl --user status ${pr}'`,note:"Agent Witch runs inside WSL on Windows. These commands use your default WSL distro; if you installed into another distro, add -d <distro name> after wsl.exe."}),OY={mac:xY,linux:IY,windows:WY},MY=["mac","linux","windows"],Pl=e=>(e.platform==="unknown"?MY:[e.platform]).map(r=>OY[r](e))});var u0,p0,jY,NY,DY,kA,m0=l(()=>{"use strict";u0=m(require("node:path"));_A();hl();p0=e=>e instanceof Error?e.message:String(e),jY=e=>typeof e=="object"&&e!==null&&"code"in e&&e.code==="ENOENT",NY=async(e,t)=>{try{let r=await e.kickstartLaunchAgents();return r.length>0?{ok:!0,platform:"mac",outcome:"restarted",message:`Kickstarted ${r.join(", ")}.`,manualCommand:null}:{ok:!1,platform:"mac",outcome:"failed",message:"No Agent Witch LaunchAgent was kickstarted on this computer.",manualCommand:t}}catch(r){return{ok:!1,platform:"mac",outcome:"failed",message:`LaunchAgent kickstart failed: ${p0(r)}`,manualCommand:t}}},DY=async(e,t)=>{try{return await e.restartSystemdUserService(),{ok:!0,platform:"linux",outcome:"restarted",message:"Restarted the agent-witch.service systemd user unit.",manualCommand:null}}catch(r){return jY(r)?{ok:!1,platform:"linux",outcome:"manual-step-required",message:"systemctl is not available on this computer, so the installer set up no auto-start. Start the client by hand.",manualCommand:t}:{ok:!1,platform:"linux",outcome:"failed",message:`systemd user restart failed: ${p0(r)}`,manualCommand:t}}},kA=async e=>{let t=En(e.platform),r=u0.default.basename(e.installDir),o=n=>Pl({platform:n,installDirName:r,launchAgentPrefix:Tn(e.installDir)})[0]?.command??null;return t==="mac"?NY(e.runners,o("mac")):t==="linux"?DY(e.runners,Yp(r)):t==="windows"?{ok:!1,platform:t,outcome:"unsupported-platform",message:"Agent Witch runs inside WSL on Windows. Restart it from PowerShell with the command below.",manualCommand:o("windows")}:{ok:!1,platform:t,outcome:"unsupported-platform",message:`Restarting the Agent Witch client is not supported on ${e.platform||"this platform"}.`,manualCommand:null}}});var Al=l(()=>{"use strict";i0();hl();_A();m0()});var g0,wA,HY,bl,FY,$Y,f0,zY,UY,y0=l(()=>{"use strict";Al();He();g0=m(require("node:os")),wA=m(require("node:path")),HY=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?wA.default.resolve(e):wA.default.join(g0.default.homedir(),ur)},bl=Tn(HY()),FY=`${bl}-wake`,$Y=`${bl}-live`,f0=`${bl}-watchdog`,zY=`${bl}-automation-scheduler`,UY=`${bl}-updater`});var si=R(TA=>{"use strict";Object.defineProperty(TA,"__esModule",{value:!0});TA.stringify=BY;function BY(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var H=R(EA=>{"use strict";Object.defineProperty(EA,"__esModule",{value:!0});EA.generateTypeGuardError=GY;var h0=si();function GY(e,t,r){return(0,h0.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,h0.stringify)(e)}) to be "${r}"`}});var xo=R(Xp=>{"use strict";Object.defineProperty(Xp,"__esModule",{value:!0});Xp.isNonNullObject=void 0;var VY=H(),KY=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,VY.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Xp.isNonNullObject=KY});var mr=R(Ie=>{"use strict";Object.defineProperty(Ie,"__esModule",{value:!0});Ie.attachTypeGuardMeta=Ie.isArrayTypeGuard=Ie.isNestedObjectTypeGuard=Ie.getTypeGuardWrapperKind=Ie.getTypeGuardInnerGuard=Ie.getTypeGuardItemGuard=Ie.getTypeGuardSchema=void 0;var qY=e=>e.schema;Ie.getTypeGuardSchema=qY;var JY=e=>e.itemGuard;Ie.getTypeGuardItemGuard=JY;var YY=e=>e.innerGuard;Ie.getTypeGuardInnerGuard=YY;var XY=e=>e.wrapperKind;Ie.getTypeGuardWrapperKind=XY;var ZY=e=>{if((0,Ie.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ie.isNestedObjectTypeGuard=ZY;var QY=e=>{if((0,Ie.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ie.isArrayTypeGuard=QY;var e7=(e,t)=>Object.assign(e,t);Ie.attachTypeGuardMeta=e7});var _l=R(Rn=>{"use strict";Object.defineProperty(Rn,"__esModule",{value:!0});Rn.getExpectedTypeName=Rn.getTypeGuardDisplayName=void 0;var S0=mr(),t7=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Rn.getTypeGuardDisplayName=t7;var r7=e=>{let t=(0,S0.getTypeGuardWrapperKind)(e),r=(0,S0.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Rn.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Rn.getExpectedTypeName=r7});var vn=R(Zp=>{"use strict";Object.defineProperty(Zp,"__esModule",{value:!0});Zp.createValidationResult=void 0;var o7=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Zp.createValidationResult=o7});var ii=R(Qp=>{"use strict";Object.defineProperty(Qp,"__esModule",{value:!0});Qp.createValidationError=void 0;var n7=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Qp.createValidationError=n7});var ai=R(em=>{"use strict";Object.defineProperty(em,"__esModule",{value:!0});em.createTreeNode=void 0;var s7=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});em.createTreeNode=s7});var kl=R(tm=>{"use strict";Object.defineProperty(tm,"__esModule",{value:!0});tm.combineResults=void 0;var i7=vn(),a7=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,i7.createValidationResult)(r,o,n)};tm.combineResults=a7});var om=R(rm=>{"use strict";Object.defineProperty(rm,"__esModule",{value:!0});rm.createSimplifiedTree=void 0;var P0=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=P0(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},l7=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=P0(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};rm.createSimplifiedTree=l7});var Tl=R(sm=>{"use strict";Object.defineProperty(sm,"__esModule",{value:!0});sm.validateObject=void 0;var c7=xo(),wl=vn(),d7=ii(),nm=ai(),u7=kl(),A0=im(),p7=(e,t,r)=>{let o=()=>{let i=(0,d7.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,nm.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,wl.createValidationResult)(!1,[],a):(0,wl.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,wl.createValidationResult)(!0,[],(0,nm.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,g=d,f=t[g],y=e[g],P=(0,A0.validateProperty)(g,y,f,r);return P.valid?u.length===0?(0,wl.createValidationResult)(!0,[],(0,nm.createTreeNode)(r.path,!0,"object",e)):a(u):P};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,A0.validateProperty)(d,e[d],u,r)}),a=(0,u7.combineResults)(i,r.path),c=(0,nm.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,wl.createValidationResult)(a.valid,a.errors,c)};return(0,c7.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};sm.validateObject=p7});var _0=R(cm=>{"use strict";Object.defineProperty(cm,"__esModule",{value:!0});cm.validateArray=void 0;var m7=si(),am=vn(),b0=ii(),lm=ai(),g7=kl(),f7=Tl(),y7=_l(),h7=mr(),S7=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,b0.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,lm.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,am.createValidationResult)(!1,[c],d)}let n=(0,h7.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,g={path:u,config:r.config||null};if(n)return(0,f7.validateObject)(c,n,g);let f=t(c,null),y=(0,y7.getExpectedTypeName)(t),P=(0,m7.stringify)(c);if(f)return(0,am.createValidationResult)(!0,[],(0,lm.createTreeNode)(u,!0,y,c));let h=P.length>200?`Expected ${u} to be "${y}"`:`Expected ${u} (${P}) to be "${y}"`,p=(0,b0.createValidationError)(u,y,c,h),S=(0,lm.createTreeNode)(u,!1,y,c);return S.errors=[p],(0,am.createValidationResult)(!1,[p],S)}),i=(0,g7.combineResults)(s,o),a=(0,lm.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,am.createValidationResult)(i.valid,i.errors,a)};cm.validateArray=S7});var im=R(um=>{"use strict";Object.defineProperty(um,"__esModule",{value:!0});um.validateProperty=void 0;var k0=vn(),P7=ii(),w0=ai(),A7=_l(),dm=mr(),b7=Tl(),_7=_0(),k7=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,dm.getTypeGuardSchema)(r),c=(0,dm.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,b7.validateObject)(t,a,s);if(c&&(0,dm.isArrayTypeGuard)(r))return(0,_7.validateArray)(t,c,s)}let d=u=>{let g=r(t,u),f=(0,A7.getExpectedTypeName)(r);return g?(0,k0.createValidationResult)(!0,[],(0,w0.createTreeNode)(n,!0,f,t)):(()=>{let y=(0,P7.createValidationError)(n,f,t,`Expected ${n} (${JSON.stringify(t)}) to be "${f}"`),P=(0,w0.createTreeNode)(n,!1,f,t);return P.errors=[y],(0,k0.createValidationResult)(!1,[y],P)})()};if((0,dm.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};um.validateProperty=k7});var mm=R(pm=>{"use strict";Object.defineProperty(pm,"__esModule",{value:!0});pm.isNil=void 0;var w7=H(),T7=function(e,t){return e!=null?(t&&t.callbackOnError((0,w7.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};pm.isNil=T7});var RA=R(gm=>{"use strict";Object.defineProperty(gm,"__esModule",{value:!0});gm.isDefined=void 0;var E7=H(),R7=mm(),v7=function(e,t){return(0,R7.isNil)(e,null)?(t&&t.callbackOnError((0,E7.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};gm.isDefined=v7});var vA=R(fm=>{"use strict";Object.defineProperty(fm,"__esModule",{value:!0});fm.reportValidationResults=void 0;var C7=om(),T0=RA(),L7=mm(),x7=(e,t)=>{if(e.valid===!0||(0,L7.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,T0.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,C7.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,T0.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};fm.reportValidationResults=x7});var CA=R(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.Validation=de.reportValidationResults=de.validateObject=de.validateProperty=de.createSimplifiedTree=de.combineResults=de.createTreeNode=de.createValidationError=de.createValidationResult=de.getExpectedTypeName=void 0;var I7=_l();Object.defineProperty(de,"getExpectedTypeName",{enumerable:!0,get:function(){return I7.getExpectedTypeName}});var W7=vn();Object.defineProperty(de,"createValidationResult",{enumerable:!0,get:function(){return W7.createValidationResult}});var O7=ii();Object.defineProperty(de,"createValidationError",{enumerable:!0,get:function(){return O7.createValidationError}});var M7=ai();Object.defineProperty(de,"createTreeNode",{enumerable:!0,get:function(){return M7.createTreeNode}});var j7=kl();Object.defineProperty(de,"combineResults",{enumerable:!0,get:function(){return j7.combineResults}});var N7=om();Object.defineProperty(de,"createSimplifiedTree",{enumerable:!0,get:function(){return N7.createSimplifiedTree}});var D7=im();Object.defineProperty(de,"validateProperty",{enumerable:!0,get:function(){return D7.validateProperty}});var H7=Tl();Object.defineProperty(de,"validateObject",{enumerable:!0,get:function(){return H7.validateObject}});var F7=vA();Object.defineProperty(de,"reportValidationResults",{enumerable:!0,get:function(){return F7.reportValidationResults}});var $7=vn(),z7=kl(),U7=ii(),B7=ai(),G7=im(),V7=Tl(),K7=vA(),q7=om();de.Validation={result:$7.createValidationResult,combine:z7.combineResults,error:U7.createValidationError,treeNode:B7.createTreeNode,property:G7.validateProperty,object:V7.validateObject,report:K7.reportValidationResults,createSimplifiedTree:q7.createSimplifiedTree}});var ym=R(LA=>{"use strict";Object.defineProperty(LA,"__esModule",{value:!0});LA.isType=Y7;var E0=xo(),R0=CA(),J7=mr();function Y7(e){if(!(0,E0.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,R0.validateObject)(r,e,s);return(0,R0.reportValidationResults)(i,o||null),i.valid}return(0,E0.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,J7.attachTypeGuardMeta)(t,{schema:e})}});var x0=R(Cn=>{"use strict";Object.defineProperty(Cn,"__esModule",{value:!0});Cn.isNestedType=Cn.isShape=void 0;Cn.isSchema=El;var v0=xo(),C0=CA(),L0=mr();function El(e){if(!(0,v0.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=Z7(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,C0.validateObject)(o,t,i);return(0,C0.reportValidationResults)(a,n||null),a.valid}return(0,v0.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,L0.attachTypeGuardMeta)(r,{schema:t})}function X7(e){return typeof e=="function"?e:Array.isArray(e)?Q7(e):typeof e=="object"&&e!==null?El(e):e}function Z7(e){let t={};for(let[r,o]of Object.entries(e))t[r]=X7(o);return t}function Q7(e){let t=e[0],r=El(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,L0.attachTypeGuardMeta)(o,{itemGuard:r})}Cn.isShape=El;Cn.isNestedType=El});var I0=R(xA=>{"use strict";Object.defineProperty(xA,"__esModule",{value:!0});xA.isObjectWith=tX;var eX=ym();function tX(e){return(0,eX.isType)(e)}});var W0=R(IA=>{"use strict";Object.defineProperty(IA,"__esModule",{value:!0});IA.isObject=oX;var rX=ym();function oX(e){return(0,rX.isType)(e)}});var O0=R(WA=>{"use strict";Object.defineProperty(WA,"__esModule",{value:!0});WA.guardWithTolerance=nX;function nX(e,t,r){return t(e,r),e}});var M0=R(OA=>{"use strict";Object.defineProperty(OA,"__esModule",{value:!0});OA.isBranded=iX;var sX=H();function iX(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,sX.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var j0=R(hm=>{"use strict";Object.defineProperty(hm,"__esModule",{value:!0});hm.BrandSymbols=void 0;hm.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var N0=R(Sm=>{"use strict";Object.defineProperty(Sm,"__esModule",{value:!0});Sm.isAny=void 0;var aX=function(e){return!0};Sm.isAny=aX});var Rl=R(MA=>{"use strict";Object.defineProperty(MA,"__esModule",{value:!0});MA.reportTypeGuardError=cX;var lX=H();function cX(e,t,r){e&&e.callbackOnError((0,lX.generateTypeGuardError)(t,e.identifier,r))}});var D0=R(Pm=>{"use strict";Object.defineProperty(Pm,"__esModule",{value:!0});Pm.isBoolean=void 0;var dX=Rl(),uX=function(t,r){return typeof t!="boolean"?((0,dX.reportTypeGuardError)(r,t,"boolean"),!1):!0};Pm.isBoolean=uX});var H0=R(Am=>{"use strict";Object.defineProperty(Am,"__esModule",{value:!0});Am.isDate=void 0;var pX=H(),mX=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,pX.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Am.isDate=mX});var jA=R(bm=>{"use strict";Object.defineProperty(bm,"__esModule",{value:!0});bm.isNumber=void 0;var gX=Rl(),fX=function(t,r){return typeof t!="number"||isNaN(t)?((0,gX.reportTypeGuardError)(r,t,"number"),!1):!0};bm.isNumber=fX});var F0=R(_m=>{"use strict";Object.defineProperty(_m,"__esModule",{value:!0});_m.isString=void 0;var yX=Rl(),hX=function(t,r){return typeof t!="string"?((0,yX.reportTypeGuardError)(r,t,"string"),!1):!0};_m.isString=hX});var $0=R(km=>{"use strict";Object.defineProperty(km,"__esModule",{value:!0});km.isUnknown=void 0;var SX=function(e){return!0};km.isUnknown=SX});var z0=R(wm=>{"use strict";Object.defineProperty(wm,"__esModule",{value:!0});wm.isFunction=void 0;var PX=H(),AX=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,PX.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};wm.isFunction=AX});var B0=R(Tm=>{"use strict";Object.defineProperty(Tm,"__esModule",{value:!0});Tm.isFile=void 0;var U0=H(),bX=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,U0.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,U0.generateTypeGuardError)(e,t.identifier,"File")),!1)};Tm.isFile=bX});var V0=R(Em=>{"use strict";Object.defineProperty(Em,"__esModule",{value:!0});Em.isFileList=void 0;var G0=H(),_X=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,G0.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,G0.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Em.isFileList=_X});var q0=R(Rm=>{"use strict";Object.defineProperty(Rm,"__esModule",{value:!0});Rm.isBlob=void 0;var K0=H(),kX=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,K0.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,K0.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Rm.isBlob=kX});var Y0=R(vm=>{"use strict";Object.defineProperty(vm,"__esModule",{value:!0});vm.isFormData=void 0;var J0=H(),wX=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,J0.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,J0.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};vm.isFormData=wX});var Z0=R(Cm=>{"use strict";Object.defineProperty(Cm,"__esModule",{value:!0});Cm.isURL=void 0;var X0=H(),TX=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,X0.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,X0.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Cm.isURL=TX});var eO=R(Lm=>{"use strict";Object.defineProperty(Lm,"__esModule",{value:!0});Lm.isURLSearchParams=void 0;var Q0=H(),EX=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,Q0.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,Q0.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Lm.isURLSearchParams=EX});var tO=R(xm=>{"use strict";Object.defineProperty(xm,"__esModule",{value:!0});xm.isMap=void 0;var RX=H(),vX=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,RX.generateTypeGuardError)(e,t.identifier,"Map")),!1)};xm.isMap=vX});var rO=R(Im=>{"use strict";Object.defineProperty(Im,"__esModule",{value:!0});Im.isSet=void 0;var CX=H(),LX=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,CX.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Im.isSet=LX});var oO=R(NA=>{"use strict";Object.defineProperty(NA,"__esModule",{value:!0});NA.isIndexSignature=IX;var xX=H();function IX(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,xX.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let g=s[d],f=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),y=t(g,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return f&&y})}}});var nO=R(Wm=>{"use strict";Object.defineProperty(Wm,"__esModule",{value:!0});Wm.isError=void 0;var WX=Rl(),OX=function(t,r){return t instanceof Error?!0:((0,WX.reportTypeGuardError)(r,t,"Error"),!1)};Wm.isError=OX});var HA=R(DA=>{"use strict";Object.defineProperty(DA,"__esModule",{value:!0});DA.isArrayWithEachItem=NX;var MX=H(),jX=mr();function NX(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,MX.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,jX.attachTypeGuardMeta)(t,{itemGuard:e})}});var FA=R(Om=>{"use strict";Object.defineProperty(Om,"__esModule",{value:!0});Om.isNonEmptyArray=void 0;var DX=H(),HX=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,DX.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Om.isNonEmptyArray=HX});var sO=R($A=>{"use strict";Object.defineProperty($A,"__esModule",{value:!0});$A.isNonEmptyArrayWithEachItem=zX;var FX=HA(),$X=FA();function zX(e){return function(t,r){return(0,FX.isArrayWithEachItem)(e)(t,r)&&(0,$X.isNonEmptyArray)(t,r)}}});var aO=R(zA=>{"use strict";Object.defineProperty(zA,"__esModule",{value:!0});zA.isTuple=UX;var iO=H();function UX(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,iO.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,iO.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var lO=R(UA=>{"use strict";Object.defineProperty(UA,"__esModule",{value:!0});UA.isObjectWithEachItem=GX;var BX=H();function GX(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,BX.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var cO=R(BA=>{"use strict";Object.defineProperty(BA,"__esModule",{value:!0});BA.isPartialOf=KX;var VX=xo();function KX(e){return function(t,r){if(!(0,VX.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var dO=R(GA=>{"use strict";Object.defineProperty(GA,"__esModule",{value:!0});GA.isPick=JX;var qX=xo();function JX(e,...t){return function(r,o){if(!(0,qX.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var uO=R(VA=>{"use strict";Object.defineProperty(VA,"__esModule",{value:!0});VA.isOmit=XX;var YX=xo();function XX(e,...t){return function(r,o){if(!(0,YX.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),g=u.indexOf(" ("),f=g>=0?u.slice(0,g):u;if(a.has(f))return!1;let y=f.startsWith(s+".")&&f.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var pO=R(Mm=>{"use strict";Object.defineProperty(Mm,"__esModule",{value:!0});Mm.isNonEmptyString=void 0;var ZX=H(),QX=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,ZX.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Mm.isNonEmptyString=QX});var mO=R(jm=>{"use strict";Object.defineProperty(jm,"__esModule",{value:!0});jm.isNonNegativeNumber=void 0;var e9=H(),t9=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,e9.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};jm.isNonNegativeNumber=t9});var gO=R(Nm=>{"use strict";Object.defineProperty(Nm,"__esModule",{value:!0});Nm.isPositiveNumber=void 0;var r9=H(),o9=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,r9.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Nm.isPositiveNumber=o9});var fO=R(Dm=>{"use strict";Object.defineProperty(Dm,"__esModule",{value:!0});Dm.isNonPositiveNumber=void 0;var n9=H(),s9=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,n9.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Dm.isNonPositiveNumber=s9});var yO=R(Hm=>{"use strict";Object.defineProperty(Hm,"__esModule",{value:!0});Hm.isNegativeNumber=void 0;var i9=H(),a9=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,i9.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Hm.isNegativeNumber=a9});var hO=R(Fm=>{"use strict";Object.defineProperty(Fm,"__esModule",{value:!0});Fm.isInteger=void 0;var l9=H(),c9=jA(),d9=function(e,t){return!(0,c9.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,l9.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Fm.isInteger=d9});var SO=R($m=>{"use strict";Object.defineProperty($m,"__esModule",{value:!0});$m.isPositiveInteger=void 0;var u9=H(),p9=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,u9.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};$m.isPositiveInteger=p9});var PO=R(zm=>{"use strict";Object.defineProperty(zm,"__esModule",{value:!0});zm.isNegativeInteger=void 0;var m9=H(),g9=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,m9.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};zm.isNegativeInteger=g9});var AO=R(Um=>{"use strict";Object.defineProperty(Um,"__esModule",{value:!0});Um.isNonNegativeInteger=void 0;var f9=H(),y9=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,f9.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Um.isNonNegativeInteger=y9});var bO=R(Bm=>{"use strict";Object.defineProperty(Bm,"__esModule",{value:!0});Bm.isNonPositiveInteger=void 0;var h9=H(),S9=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,h9.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Bm.isNonPositiveInteger=S9});var _O=R(Vm=>{"use strict";Object.defineProperty(Vm,"__esModule",{value:!0});Vm.isNumeric=void 0;var Gm=H(),P9=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Gm.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Gm.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Gm.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Gm.generateTypeGuardError)(e,t.identifier,"number key")),!1};Vm.isNumeric=P9});var kO=R(Km=>{"use strict";Object.defineProperty(Km,"__esModule",{value:!0});Km.isBooleanLike=void 0;var KA=H(),A9=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,KA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,KA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Km.isBooleanLike=A9});var wO=R(qm=>{"use strict";Object.defineProperty(qm,"__esModule",{value:!0});qm.isDateLike=void 0;var vl=H(),b9=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1};qm.isDateLike=b9});var TO=R(Jm=>{"use strict";Object.defineProperty(Jm,"__esModule",{value:!0});Jm.isBigInt=void 0;var _9=H(),k9=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,_9.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Jm.isBigInt=k9});var JA=R(qA=>{"use strict";Object.defineProperty(qA,"__esModule",{value:!0});qA.isOneOf=w9;var EO=si();function w9(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,EO.stringify)(t)}) must be one of following values ${e.map(EO.stringify).join(" | ")}`),o}}});var RO=R(YA=>{"use strict";Object.defineProperty(YA,"__esModule",{value:!0});YA.isOneOfTypes=R9;var T9=si(),E9=_l();function R9(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,T9.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,E9.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var vO=R(XA=>{"use strict";Object.defineProperty(XA,"__esModule",{value:!0});XA.isIntersectionOf=v9;function v9(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var CO=R(ZA=>{"use strict";Object.defineProperty(ZA,"__esModule",{value:!0});ZA.isExtensionOf=C9;function C9(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var LO=R(QA=>{"use strict";Object.defineProperty(QA,"__esModule",{value:!0});QA.isNullOr=x9;var L9=mr();function x9(e){function t(r,o){return r===null?!0:e(r,o)}return(0,L9.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var xO=R(eb=>{"use strict";Object.defineProperty(eb,"__esModule",{value:!0});eb.isUndefinedOr=W9;var I9=mr();function W9(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,I9.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var IO=R(tb=>{"use strict";Object.defineProperty(tb,"__esModule",{value:!0});tb.isNilOr=M9;var O9=mr();function M9(e){function t(r,o){return r==null?!0:e(r,o)}return(0,O9.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var WO=R(rb=>{"use strict";Object.defineProperty(rb,"__esModule",{value:!0});rb.isAsserted=j9;function j9(e){return!0}});var OO=R(ob=>{"use strict";Object.defineProperty(ob,"__esModule",{value:!0});ob.isEnum=D9;var N9=JA();function D9(e){return function(t,r){return(0,N9.isOneOf)(...Object.values(e))(t,r)}}});var MO=R(nb=>{"use strict";Object.defineProperty(nb,"__esModule",{value:!0});nb.isEqualTo=$9;var H9=H(),F9=si();function $9(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,H9.generateTypeGuardError)(t,r.identifier,`equal to ${(0,F9.stringify)(e)}`)),!1):!0}}});var jO=R(Ym=>{"use strict";Object.defineProperty(Ym,"__esModule",{value:!0});Ym.isRegex=void 0;var z9=H(),U9=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,z9.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Ym.isRegex=U9});var DO=R(sb=>{"use strict";Object.defineProperty(sb,"__esModule",{value:!0});sb.isPattern=B9;var NO=H();function B9(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,NO.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,NO.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var HO=R(ib=>{"use strict";Object.defineProperty(ib,"__esModule",{value:!0});ib.by=G9;function G9(e){return function(t){return e(t,null)}}});var FO=R(ab=>{"use strict";Object.defineProperty(ab,"__esModule",{value:!0});ab.toNumber=V9;function V9(e){return typeof e=="number"?e:Number(e)}});var $O=R(lb=>{"use strict";Object.defineProperty(lb,"__esModule",{value:!0});lb.toDate=K9;function K9(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var zO=R(cb=>{"use strict";Object.defineProperty(cb,"__esModule",{value:!0});cb.toBoolean=q9;function q9(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var UO=R(Xm=>{"use strict";Object.defineProperty(Xm,"__esModule",{value:!0});Xm.isSymbol=void 0;var J9=H(),Y9=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,J9.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Xm.isSymbol=Y9});var li=R(w=>{"use strict";Object.defineProperty(w,"__esModule",{value:!0});w.isDateLike=w.isBooleanLike=w.isNumeric=w.isNonPositiveInteger=w.isNonNegativeInteger=w.isNegativeInteger=w.isPositiveInteger=w.isInteger=w.isNegativeNumber=w.isNonPositiveNumber=w.isPositiveNumber=w.isNonNegativeNumber=w.isNonEmptyString=w.isOmit=w.isPick=w.isPartialOf=w.isObjectWithEachItem=w.isNonNullObject=w.isTuple=w.isNonEmptyArrayWithEachItem=w.isNonEmptyArray=w.isArrayWithEachItem=w.isError=w.isIndexSignature=w.isSet=w.isMap=w.isURLSearchParams=w.isURL=w.isFormData=w.isBlob=w.isFileList=w.isFile=w.isFunction=w.isUnknown=w.isString=w.isNumber=w.isNil=w.isDefined=w.isDate=w.isBoolean=w.isAny=w.BrandSymbols=w.isBranded=w.guardWithTolerance=w.isObject=w.isObjectWith=w.isNestedType=w.isShape=w.isSchema=w.isType=void 0;w.isSymbol=w.toBoolean=w.toDate=w.toNumber=w.by=w.generateTypeGuardError=w.isPattern=w.isRegex=w.isEqualTo=w.isEnum=w.isAsserted=w.isNilOr=w.isUndefinedOr=w.isNullOr=w.isExtensionOf=w.isIntersectionOf=w.isOneOfTypes=w.isOneOf=w.isBigInt=void 0;var X9=ym();Object.defineProperty(w,"isType",{enumerable:!0,get:function(){return X9.isType}});var db=x0();Object.defineProperty(w,"isSchema",{enumerable:!0,get:function(){return db.isSchema}});Object.defineProperty(w,"isShape",{enumerable:!0,get:function(){return db.isShape}});Object.defineProperty(w,"isNestedType",{enumerable:!0,get:function(){return db.isNestedType}});var Z9=I0();Object.defineProperty(w,"isObjectWith",{enumerable:!0,get:function(){return Z9.isObjectWith}});var Q9=W0();Object.defineProperty(w,"isObject",{enumerable:!0,get:function(){return Q9.isObject}});var eZ=O0();Object.defineProperty(w,"guardWithTolerance",{enumerable:!0,get:function(){return eZ.guardWithTolerance}});var tZ=M0();Object.defineProperty(w,"isBranded",{enumerable:!0,get:function(){return tZ.isBranded}});var rZ=j0();Object.defineProperty(w,"BrandSymbols",{enumerable:!0,get:function(){return rZ.BrandSymbols}});var oZ=N0();Object.defineProperty(w,"isAny",{enumerable:!0,get:function(){return oZ.isAny}});var nZ=D0();Object.defineProperty(w,"isBoolean",{enumerable:!0,get:function(){return nZ.isBoolean}});var sZ=H0();Object.defineProperty(w,"isDate",{enumerable:!0,get:function(){return sZ.isDate}});var iZ=RA();Object.defineProperty(w,"isDefined",{enumerable:!0,get:function(){return iZ.isDefined}});var aZ=mm();Object.defineProperty(w,"isNil",{enumerable:!0,get:function(){return aZ.isNil}});var lZ=jA();Object.defineProperty(w,"isNumber",{enumerable:!0,get:function(){return lZ.isNumber}});var cZ=F0();Object.defineProperty(w,"isString",{enumerable:!0,get:function(){return cZ.isString}});var dZ=$0();Object.defineProperty(w,"isUnknown",{enumerable:!0,get:function(){return dZ.isUnknown}});var uZ=z0();Object.defineProperty(w,"isFunction",{enumerable:!0,get:function(){return uZ.isFunction}});var pZ=B0();Object.defineProperty(w,"isFile",{enumerable:!0,get:function(){return pZ.isFile}});var mZ=V0();Object.defineProperty(w,"isFileList",{enumerable:!0,get:function(){return mZ.isFileList}});var gZ=q0();Object.defineProperty(w,"isBlob",{enumerable:!0,get:function(){return gZ.isBlob}});var fZ=Y0();Object.defineProperty(w,"isFormData",{enumerable:!0,get:function(){return fZ.isFormData}});var yZ=Z0();Object.defineProperty(w,"isURL",{enumerable:!0,get:function(){return yZ.isURL}});var hZ=eO();Object.defineProperty(w,"isURLSearchParams",{enumerable:!0,get:function(){return hZ.isURLSearchParams}});var SZ=tO();Object.defineProperty(w,"isMap",{enumerable:!0,get:function(){return SZ.isMap}});var PZ=rO();Object.defineProperty(w,"isSet",{enumerable:!0,get:function(){return PZ.isSet}});var AZ=oO();Object.defineProperty(w,"isIndexSignature",{enumerable:!0,get:function(){return AZ.isIndexSignature}});var bZ=nO();Object.defineProperty(w,"isError",{enumerable:!0,get:function(){return bZ.isError}});var _Z=HA();Object.defineProperty(w,"isArrayWithEachItem",{enumerable:!0,get:function(){return _Z.isArrayWithEachItem}});var kZ=FA();Object.defineProperty(w,"isNonEmptyArray",{enumerable:!0,get:function(){return kZ.isNonEmptyArray}});var wZ=sO();Object.defineProperty(w,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return wZ.isNonEmptyArrayWithEachItem}});var TZ=aO();Object.defineProperty(w,"isTuple",{enumerable:!0,get:function(){return TZ.isTuple}});var EZ=xo();Object.defineProperty(w,"isNonNullObject",{enumerable:!0,get:function(){return EZ.isNonNullObject}});var RZ=lO();Object.defineProperty(w,"isObjectWithEachItem",{enumerable:!0,get:function(){return RZ.isObjectWithEachItem}});var vZ=cO();Object.defineProperty(w,"isPartialOf",{enumerable:!0,get:function(){return vZ.isPartialOf}});var CZ=dO();Object.defineProperty(w,"isPick",{enumerable:!0,get:function(){return CZ.isPick}});var LZ=uO();Object.defineProperty(w,"isOmit",{enumerable:!0,get:function(){return LZ.isOmit}});var xZ=pO();Object.defineProperty(w,"isNonEmptyString",{enumerable:!0,get:function(){return xZ.isNonEmptyString}});var IZ=mO();Object.defineProperty(w,"isNonNegativeNumber",{enumerable:!0,get:function(){return IZ.isNonNegativeNumber}});var WZ=gO();Object.defineProperty(w,"isPositiveNumber",{enumerable:!0,get:function(){return WZ.isPositiveNumber}});var OZ=fO();Object.defineProperty(w,"isNonPositiveNumber",{enumerable:!0,get:function(){return OZ.isNonPositiveNumber}});var MZ=yO();Object.defineProperty(w,"isNegativeNumber",{enumerable:!0,get:function(){return MZ.isNegativeNumber}});var jZ=hO();Object.defineProperty(w,"isInteger",{enumerable:!0,get:function(){return jZ.isInteger}});var NZ=SO();Object.defineProperty(w,"isPositiveInteger",{enumerable:!0,get:function(){return NZ.isPositiveInteger}});var DZ=PO();Object.defineProperty(w,"isNegativeInteger",{enumerable:!0,get:function(){return DZ.isNegativeInteger}});var HZ=AO();Object.defineProperty(w,"isNonNegativeInteger",{enumerable:!0,get:function(){return HZ.isNonNegativeInteger}});var FZ=bO();Object.defineProperty(w,"isNonPositiveInteger",{enumerable:!0,get:function(){return FZ.isNonPositiveInteger}});var $Z=_O();Object.defineProperty(w,"isNumeric",{enumerable:!0,get:function(){return $Z.isNumeric}});var zZ=kO();Object.defineProperty(w,"isBooleanLike",{enumerable:!0,get:function(){return zZ.isBooleanLike}});var UZ=wO();Object.defineProperty(w,"isDateLike",{enumerable:!0,get:function(){return UZ.isDateLike}});var BZ=TO();Object.defineProperty(w,"isBigInt",{enumerable:!0,get:function(){return BZ.isBigInt}});var GZ=JA();Object.defineProperty(w,"isOneOf",{enumerable:!0,get:function(){return GZ.isOneOf}});var VZ=RO();Object.defineProperty(w,"isOneOfTypes",{enumerable:!0,get:function(){return VZ.isOneOfTypes}});var KZ=vO();Object.defineProperty(w,"isIntersectionOf",{enumerable:!0,get:function(){return KZ.isIntersectionOf}});var qZ=CO();Object.defineProperty(w,"isExtensionOf",{enumerable:!0,get:function(){return qZ.isExtensionOf}});var JZ=LO();Object.defineProperty(w,"isNullOr",{enumerable:!0,get:function(){return JZ.isNullOr}});var YZ=xO();Object.defineProperty(w,"isUndefinedOr",{enumerable:!0,get:function(){return YZ.isUndefinedOr}});var XZ=IO();Object.defineProperty(w,"isNilOr",{enumerable:!0,get:function(){return XZ.isNilOr}});var ZZ=WO();Object.defineProperty(w,"isAsserted",{enumerable:!0,get:function(){return ZZ.isAsserted}});var QZ=OO();Object.defineProperty(w,"isEnum",{enumerable:!0,get:function(){return QZ.isEnum}});var eQ=MO();Object.defineProperty(w,"isEqualTo",{enumerable:!0,get:function(){return eQ.isEqualTo}});var tQ=jO();Object.defineProperty(w,"isRegex",{enumerable:!0,get:function(){return tQ.isRegex}});var rQ=DO();Object.defineProperty(w,"isPattern",{enumerable:!0,get:function(){return rQ.isPattern}});var oQ=H();Object.defineProperty(w,"generateTypeGuardError",{enumerable:!0,get:function(){return oQ.generateTypeGuardError}});var nQ=HO();Object.defineProperty(w,"by",{enumerable:!0,get:function(){return nQ.by}});var sQ=FO();Object.defineProperty(w,"toNumber",{enumerable:!0,get:function(){return sQ.toNumber}});var iQ=$O();Object.defineProperty(w,"toDate",{enumerable:!0,get:function(){return iQ.toDate}});var aQ=zO();Object.defineProperty(w,"toBoolean",{enumerable:!0,get:function(){return aQ.toBoolean}});var lQ=UO();Object.defineProperty(w,"isSymbol",{enumerable:!0,get:function(){return lQ.isSymbol}})});var ci,BO,cQ,GO,VO=l(()=>{"use strict";ci=m(require("node:path")),BO=require("node:url"),cQ=()=>!0,GO=()=>{if(cQ()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ci.default.dirname(ci.default.resolve(e)):ci.default.dirname(ci.default.resolve(__filename))}return ci.default.dirname((0,BO.fileURLToPath)(__agentWitchImportMetaUrl))}});var ub,KO,F,qO,dQ,gr,pb,v,Cl,fr,mb,Ll,Ln,gb,fb,yb,xl,ye,Io,Zm,Je,Qm,N,hb=l(()=>{"use strict";ub=m(require("node:fs")),KO=m(require("node:os")),F=m(require("node:path")),qO=m(li());He();VO();hl();hl();dQ=GO(),gr=e=>e.trim().toLowerCase(),pb=e=>gr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),v=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return F.default.resolve(e);let t=F.default.resolve(dQ),r=F.default.basename(t),o=F.default.basename(F.default.dirname(t));return r===AA&&(o===ur||o===$r)?F.default.dirname(t):r===ur||r===$r?t:F.default.join(KO.default.homedir(),ur)},Cl=(e=v())=>F.default.join(e,AA),fr=(e=v())=>F.default.join(Cl(e),s0),mb=(e,t,r)=>t!==null?F.default.join(e,st,t,r):F.default.join(e,r),Ll=e=>mb(e.installDir,e.profileEmail,fl),Ln=e=>mb(e.installDir,e.profileEmail,zt),gb=e=>F.default.join(e.logsDir,kn),fb=e=>F.default.join(e.logsDir,wn),yb=e=>mb(e.installDir,e.profileEmail,yl),xl=e=>e.profileEmail!==null?F.default.join(e.installDir,st,e.profileEmail,Co):F.default.join(e.installDir,Co),ye=(e=v())=>Tn(e),Io=(e=v())=>Lo(e)?Gp:Bp,Zm=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return gr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?gr(t):null},Je=(e=v())=>{let t=F.default.join(e,PA);if(!ub.default.existsSync(t))return null;try{let r=JSON.parse(ub.default.readFileSync(t,"utf8"));if((0,qO.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return gr(r.email)}catch{return null}return null},Qm=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?gr(r):null}let t=Zm();return t!==null?t:Je()},N=e=>{let t=v(),r=Cl(t),o=fr(t),n=Qm(e);if(n!==null){let y=F.default.join(t,st,n),P=F.default.join(y,Vp),h=F.default.join(y,fl),p=F.default.join(y,_n.projectDataDir),S=F.default.join(y,zt),b=F.default.join(y,yl),k=F.default.join(y,Co),A=F.default.join(y,zt,kn),_=F.default.join(y,zt,wn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:h,projectDataDir:p,logsDir:S,mainLogPath:A,errorLogPath:_,reportsDir:b,deviceKeypairPath:k,configPath:F.default.join(y,"config.json"),harnessRootDir:P,harnessManifestPath:F.default.join(P,qp),harnessSetsDir:F.default.join(P,Kp)}}let s=F.default.join(t,Vp),i=F.default.join(t,fl),a=F.default.join(t,_n.projectDataDir),c=F.default.join(t,zt),d=F.default.join(t,yl),u=F.default.join(t,Co),g=F.default.join(t,zt,kn),f=F.default.join(t,zt,wn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:g,errorLogPath:f,reportsDir:d,deviceKeypairPath:u,configPath:F.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:F.default.join(s,qp),harnessSetsDir:F.default.join(s,Kp)}}});var di,Sb=l(()=>{"use strict";di=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var uQ,ui,Pb=l(()=>{"use strict";uQ=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},ui=e=>e.filePort??uQ(e.envValue)??e.defaultPort});var Ab,JO,pQ,Il,pi,YO=l(()=>{"use strict";Ab=m(require("node:fs")),JO=m(require("node:path"));He();hb();Sb();Pb();pQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Il=e=>{let t=JO.default.join(e,gl.wakePort);if(!Ab.default.existsSync(t))return null;try{let r=JSON.parse(Ab.default.readFileSync(t,"utf8"));if(pQ(r)&&di(r.wakePort))return r.wakePort}catch{return null}return null},pi=(e=v())=>ui({filePort:Il(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Io(e)})});var bb={};St(bb,{isAgentWitchLocalInstallDir:()=>Lo,isValidAgentWitchWakePort:()=>di,readActiveProfileEmailFromFile:()=>Je,readAgentWitchWakePortFromFile:()=>Il,resolveActiveProfileEmail:()=>Qm,resolveActiveProfileEmailFromEnv:()=>Zm,resolveAgentWitchAppBundlePath:()=>fr,resolveAgentWitchAppDir:()=>Cl,resolveAgentWitchDefaultWakePort:()=>Io,resolveAgentWitchDeviceKeypairPath:()=>xl,resolveAgentWitchErrorLogPath:()=>fb,resolveAgentWitchInstallDir:()=>v,resolveAgentWitchLaunchAgentPrefix:()=>ye,resolveAgentWitchLocalLayout:()=>N,resolveAgentWitchLogsDir:()=>Ln,resolveAgentWitchMainLogPath:()=>gb,resolveAgentWitchProjectsDir:()=>Ll,resolveAgentWitchReportsDir:()=>yb,resolveAgentWitchRuntimeWakePort:()=>pi,resolveAgentWitchWakePortFromSources:()=>ui,sanitizeProfileEmailForDir:()=>gr,sanitizeProfileEmailForLaunchAgentLabel:()=>pb});var G=l(()=>{"use strict";hb();Sb();YO();Pb()});var _b,kb,eg=l(()=>{"use strict";_b=new Set(["","loginwindow","_mbsetupuser","root"]),kb=5e3});var XO,mQ,ZO,wb,Tb=l(()=>{"use strict";XO=require("node:child_process");eg();mQ=e=>e.trim().toLowerCase(),ZO=e=>e==null?!1:!_b.has(mQ(e)),wb=()=>{if(process.platform!=="darwin")return null;try{let t=(0,XO.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return ZO(t)?t:null}catch{return null}}});var eM,QO,Ut,Wl=l(()=>{"use strict";eM=m(require("node:os"));Tb();QO=e=>e.trim().toLowerCase(),Ut=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?wb():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??eM.default.userInfo().username;return QO(r)===QO(o)}});var tM,rM,xn,oM=l(()=>{"use strict";tM=require("node:child_process"),rM=m(require("node:fs"));G();Wl();xn=(e=v())=>{let t=fr(e);if(!rM.default.existsSync(t))return{ok:!1,errorMessage:"Agent Witch install not found."};if(!Ut())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Je(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,tM.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var Eb,Lt,mi,nM=l(()=>{"use strict";Eb="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",Lt=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[Eb]==="1"},mi=e=>`Refusing ${e} host side effects under VITEST (set ${Eb}=1 to override).`});var In=l(()=>{"use strict";nM()});var sM,Ol,tg=l(()=>{"use strict";sM=require("node:child_process");In();Ol=e=>{if(process.platform!=="darwin"||!Lt())return;let t=process.getuid?.();if(t!==void 0)try{(0,sM.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var rg,Rb,iM,ue,og,Ml=l(()=>{"use strict";rg=m(require("node:fs")),Rb=m(require("node:path"));G();He();iM=e=>{let t=Rb.default.join(e,st);return rg.default.existsSync(t)?rg.default.readdirSync(t).filter(r=>rg.default.statSync(Rb.default.join(t,r)).isDirectory()).map(r=>gr(r)).toSorted():[]},ue=(e=v())=>{let t=ye(e),r=iM(e);return[{profileEmail:Je(e)??r[0]??null,launchAgentLabel:t}]},og=(e=v())=>iM(e)});var vb,aM,lM,gQ,Ur,ng=l(()=>{"use strict";vb=m(require("node:fs")),aM=m(require("node:os")),lM=m(require("node:path"));G();Ml();gQ=()=>lM.default.join(aM.default.homedir(),"Library","LaunchAgents"),Ur=(e=v())=>{let t=ye(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ue(e))r.add(n.launchAgentLabel);let o=gQ();if(vb.default.existsSync(o))for(let n of vb.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var cM,jl,dM=l(()=>{"use strict";G();tg();ng();Ml();cM=(e=v())=>{let t=new Set(ue(e).map(r=>r.launchAgentLabel));return Ur(e).filter(r=>!t.has(r))},jl=(e=v())=>{for(let t of cM(e))Ol(t)}});var Nl,Cb=l(()=>{"use strict";G();tg();ng();Nl=(e=v())=>{for(let t of Ur(e))Ol(t)}});var uM,pM,fQ,Wn,mM=l(()=>{"use strict";uM=require("node:child_process"),pM=require("node:util"),fQ=(0,pM.promisify)(uM.execFile),Wn=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await fQ("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var On,yQ,Lb,xb=l(()=>{"use strict";On=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),yQ=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Lb=e=>{let t=e.pathValue??yQ(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${On(e.launchAgentLabel)}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${On(e.runPath)}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${On(e.installDir)}</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key>
    <string>${On(e.homeDir)}</string>
    <key>PATH</key>
    <string>${On(t)}</string>
    <key>AGENT_WITCH_HOME</key>
    <string>${On(e.installDir)}</string>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>${On(String(e.wakePort))}</string>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>ThrottleInterval</key>
  <integer>10</integer>
</dict>
</plist>
`}});var sg,Ib=l(()=>{"use strict";sg=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Dl,Wb,ig,ag,Br,lg=l(()=>{"use strict";Dl=m(require("node:fs")),Wb=m(require("node:os")),ig=m(require("node:path"));He();G();xb();Ib();ag=(e,t=Wb.default.homedir())=>ig.default.join(t,"Library","LaunchAgents",`${e}.plist`),Br=e=>{let t=e.installDir??v(),r=e.homeDir??Wb.default.homedir(),o=ag(e.launchAgentLabel,r),n=Dl.default.existsSync(o)?Dl.default.readFileSync(o,"utf8"):null;if(n!==null&&sg(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Lb({launchAgentLabel:e.launchAgentLabel,runPath:ig.default.join(t,n0,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??pi(t)});if(!sg(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Dl.default.mkdirSync(ig.default.dirname(o),{recursive:!0}),Dl.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var fM,yM,hM,Hl,hQ,SQ,gM,Ye,Ob=l(()=>{"use strict";fM=require("node:child_process"),yM=m(require("node:fs")),hM=require("node:util");G();In();lg();Wl();Hl=(0,hM.promisify)(fM.execFile),hQ=async e=>{try{return await Hl("launchctl",["print",e]),!0}catch{return!1}},SQ=async(e,t,r)=>{await hQ(t)&&await Hl("launchctl",["bootout",t]).catch(()=>{}),await Hl("launchctl",["bootstrap",e,r]),await Hl("launchctl",["enable",t])},gM=async e=>{try{return await Hl("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ye=async(e,t=v())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Lt())return{ok:!1,errorMessage:mi("launchctl")};if(!Ut())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Br({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await gM(n))return{ok:!0};let i=s.plistPath;if(!yM.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await SQ(o,n,i),await gM(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Mn,SM=l(()=>{"use strict";G();Ob();Ml();Mn=async(e=v(),t=process.platform)=>{if(t!=="darwin")return[];let r=[];for(let o of ue(e))(await Ye(o.launchAgentLabel,e)).ok&&r.push(o.launchAgentLabel);return r}});var cg,gi,PM,AM,bM,_M=l(()=>{"use strict";cg=require("node:child_process"),gi=m(require("node:fs")),PM="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",AM=e=>{try{return(0,cg.execFileSync)("plutil",["-extract",PM,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},bM=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=gi.default.statSync(e);try{gi.default.copyFileSync(e,r),(0,cg.execFileSync)("plutil",["-replace",PM,"-string",String(t),r],{stdio:"ignore"}),(0,cg.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),gi.default.chmodSync(r,o&4095),gi.default.renameSync(r,e)}finally{gi.default.rmSync(r,{force:!0})}}});var kM,wM=l(()=>{"use strict";G();kM=e=>di(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var TM,EM,PQ,Fl,RM=l(()=>{"use strict";TM=m(require("node:fs")),EM=m(require("node:os"));_M();wM();lg();PQ=(e,t)=>{let r=kM({filePort:t,plistValue:AM(e)});return r.kind!=="sync"?!1:(bM(e,r.wakePort),!0)},Fl=e=>{let t=e.homeDir??EM.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>ag(o,t)).filter(o=>TM.default.existsSync(o)).filter(o=>PQ(o,e.wakePort))}});var bt,Gr,vM=l(()=>{"use strict";Cb();Wl();eg();bt=e=>{Ut()||(Nl(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Gr=(e,t=kb)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Ut()||e()},t);return()=>{clearInterval(r)}}});var ae=l(()=>{"use strict";y0();oM();tg();dM();Cb();ng();Wl();mM();SM();Ob();lg();Ib();RM();xb();Ml();Tb();eg();vM()});var Mb=l(()=>{"use strict";ae()});var $l,CM,dg,LM,fi,xM,IM,Wo=l(()=>{"use strict";$l=".agent-witch",CM="memory",dg="project.json",LM="chunks.ndjson",fi="runs.ndjson",xM="reports",IM=".json"});var WM=l(()=>{"use strict";Wo()});var OM,ug,jb=l(()=>{"use strict";OM=m(require("node:path"));WM();ug=(e,t)=>OM.default.join(e.trim(),`${t.trim()}${IM}`)});var zl,MM,jM=l(()=>{"use strict";zl="agent-witch.js",MM="command"});var pg=l(()=>{"use strict";jM()});var jn,NM,DM=l(()=>{"use strict";pg();jn=e=>`'${e.replace(/'/g,"'\\''")}'`,NM=e=>{let t=`${e.installDir.trim()}/${"app"}/${zl}`,r=[jn("node"),jn(t),"report","write","--key",jn(e.reportKey.trim()),"--agent-run-id",jn(e.agentRunId.trim()),"--status",jn(e.status),"--summary",jn(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",jn(e.details.trim())),r.join(" ")}});var yr,HM,AQ,Nb,mg=l(()=>{"use strict";jb();DM();yr={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},HM=e=>e===yr.COMPLETED||e===yr.FAILED,AQ=e=>["Maintain a machine-readable job report so the user can check status later.","Agent Witch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Nb=(e,t)=>{let r=ug(t.reportsDir,t.reportKey),o=NM({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:yr.IN_PROGRESS,summary:"Task started on your computer."});return`${e.trim()}

---
${AQ({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Xe=l(()=>{"use strict";He();G()});var Bl,$M,FM,zM,bQ,yi,_Q,UM,Gl,Vl,Db,BM,GM,Kl=l(()=>{"use strict";Bl=m(require("node:fs")),$M=m(require("node:path"));mg();jb();Xe();FM=50,zM=e=>{let t=N(),r=ug(t.reportsDir,e);return Bl.default.mkdirSync($M.default.dirname(r),{recursive:!0}),r},bQ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},yi=e=>{let t=zM(e);if(!Bl.default.existsSync(t))return null;try{let r=JSON.parse(Bl.default.readFileSync(t,"utf8"));return bQ(r)?r:null}catch{return null}},_Q=(e,t)=>{let r=[...e,t];return r.length>FM?r.slice(r.length-FM):r},UM=e=>{let t=zM(e.reportKey);Bl.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Gl=e=>{let t=yi(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:_Q(t?.history??[],o)};return UM(n),n},Vl=e=>{let t=yi(e.reportKey);return t!==null?t:Gl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:yr.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Db=(e,t)=>{let r=t.trim();if(r.length===0)return yi(e);let o=yi(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return UM(s),s},BM=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},GM=e=>{if(e===null||!HM(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===yr.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var kQ,wQ,ql,VM,gg,Hb=l(()=>{"use strict";mg();Kl();kQ=new Set(Object.values(yr)),wQ=e=>kQ.has(e),ql=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},VM=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},gg=e=>{if(e[0]!=="write")return VM(),1;let r=ql(e,"--key"),o=ql(e,"--agent-run-id"),n=ql(e,"--status"),s=ql(e,"--summary"),i=ql(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!wQ(n)?(VM(),1):(Gl({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var _t,Nn=l(()=>{"use strict";_t=()=>!0});var Fb,KM,Dn,fg=l(()=>{"use strict";Fb=m(require("node:path")),KM=require("node:url");Nn();Dn=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=Fb.default.resolve(t);return _t()?r===Fb.default.resolve(__filename):e===void 0?!1:r===(0,KM.fileURLToPath)(e)}});var $b,zb,Ub,ke,Bb=l(()=>{"use strict";$b=["block","warn","info"],zb=["seed","project","retired"],Ub="warn",ke={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var Gb,Vr,XM,ZM,Vb,Oo,QM=l(()=>{"use strict";Bb();Gb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vr=e=>typeof e=="string"?e:null,XM=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],ZM=e=>{if(!Gb(e))return null;let t=Vr(e.id)?.trim()??"",r=Vr(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=zb.find(d=>d===e.source)??"project",n=$b.find(d=>d===e.severity)??Ub,s=Gb(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=Vr(s?.value)?.trim()??"",c=Vr(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:Vr(e.cause)?.trim()??"",avoidance:Vr(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:XM(e.keywords),tags:XM(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:Vr(e.lastSeenAt),updatedAt:Vr(e.updatedAt),severity:n}},Vb=e=>!Gb(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>ZM(t)).filter(t=>t!==null),syncedAt:Vr(e.syncedAt)},Oo=e=>e.filter(t=>t.source!=="retired").length});var Hn,Kb=l(()=>{"use strict";Hn=e=>e.replace(/\s+/g," ").trim()});var Mo,qb=l(()=>{"use strict";Mo=e=>Math.ceil(e.length/4)});var yg,ej=l(()=>{"use strict";qb();yg=(e,t)=>{if(t<=0)return"";if(Mo(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var Jl,tj=l(()=>{"use strict";Kb();Jl=e=>`${Hn(e.id)}|${Hn(e.avoidance)}`});var rj=l(()=>{"use strict"});var Bt=l(()=>{"use strict";Bb();QM();Kb();qb();ej();tj();rj()});var Fn,hi,Si,Pi,Yl,hg,oj,nj,sj,ij,aj,Xl,Zl,Sg,Ai,Pg,Jb,Gt=l(()=>{"use strict";Fn="agent-witch-token-saver",hi=`# BEGIN ${Fn}`,Si=`# END ${Fn}`,Pi=`<!-- BEGIN ${Fn} -->`,Yl=`<!-- END ${Fn} -->`,hg=".cursor/rules/agent-witch-check-context.mdc",oj=".cursor/mcp.json",nj=".codex/config.toml",sj=".codex/AGENTS.md",ij=".claude/settings.json",aj="declined-projects.json",Xl="agent-witch",Zl="agent-witch",Sg=["mcp"],Ai="mcp-hook",Pg="check_context",Jb=`${Zl} ${Ai} ${Pg}`});var Ag,bg,_g,bi,Yb,Ql,kg=l(()=>{"use strict";Bt();Gt();Ag=ke.symptom,bg=ke.cause,_g=ke.avoidance,bi=64,Yb="token-saver.db",Ql=1});var wg,_i,vQ,Wye,ki=l(()=>{"use strict";wg="agent-witch.js",_i="deps.tar.gz",vQ="install.sh",Wye={mainScript:`app/${wg}`,depsArchive:`app/${_i}`,installShell:vQ}});var lj=l(()=>{"use strict";ki()});var cj=l(()=>{"use strict";ki();lj()});var ec,Zb,Tg,CQ,tc,Fe,Ti,rc,oc,$n,Qb=l(()=>{"use strict";ec=m(require("node:fs")),Zb=m(require("node:path"));cj();G();Tg="install-version.json",CQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tc=(e=v())=>Zb.default.join(e,Tg),Fe=(e=v())=>{let t=tc(e);if(!ec.default.existsSync(t))return null;try{let r=JSON.parse(ec.default.readFileSync(t,"utf8"));return!CQ(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ti=(e,t=v())=>{let r=tc(t);ec.default.mkdirSync(Zb.default.dirname(r),{recursive:!0}),ec.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},rc=(e=v())=>Fe(e)?.bundleVersion??"265",oc=(e,t)=>{let r=Fe(e);if(r!==null)return r;let o={bundleVersion:"265",appOrigin:t,updatedAt:new Date().toISOString()};return Ti(o,e),o},$n=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var dj,zn,e_,t_,r_,Eg,Sr,Un,o_=l(()=>{"use strict";dj=require("node:crypto"),zn=m(require("node:fs")),e_=m(require("node:path"));G();t_="self-update-log.ndjson",r_=100,Eg=(e=v())=>{let t=N(),r=t.installDir===e?t.logsDir:Ln({installDir:e,profileEmail:t.profileEmail});return e_.default.join(r,t_)},Sr=(e,t=v())=>{let r={id:(0,dj.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Eg(t);zn.default.mkdirSync(e_.default.dirname(o),{recursive:!0});let n=zn.default.existsSync(o)?zn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-r_+1)),JSON.stringify(r)];return zn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Un=(e=20,t=v())=>{let r=Eg(t);if(!zn.default.existsSync(r))return[];let o=zn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var n_,Yye,s_=l(()=>{"use strict";ki();n_="deps",Yye=`${"app"}/${_i}`});var uj=l(()=>{"use strict";s_()});var pj,jo,Bn,mj,i_,a_,gj=l(()=>{"use strict";pj=require("node:child_process"),jo=m(require("node:fs")),Bn=m(require("node:path"));ki();s_();mj=e=>Bn.default.join(e,"app",n_),i_=e=>{let t=Bn.default.join(e,"app"),r=Bn.default.join(t,_i);jo.default.existsSync(r)&&(jo.default.rmSync(mj(e),{recursive:!0,force:!0}),jo.default.mkdirSync(t,{recursive:!0}),(0,pj.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),jo.default.rmSync(r,{force:!0}))},a_=e=>{jo.default.rmSync(Bn.default.join(e,"node_modules"),{recursive:!0,force:!0}),jo.default.rmSync(Bn.default.join(e,"package.json"),{force:!0}),jo.default.rmSync(Bn.default.join(e,"package-lock.json"),{force:!0})}});var fj=l(()=>{"use strict";uj();gj()});var yj=l(()=>{"use strict";ni()});var Rg,vg,Cg=l(()=>{"use strict";Rg="AGENT_WITCH_EXTERNAL_BRIDGE",vg="AGENT_WITCH_EXTERNAL_LIVE"});var hj=l(()=>{"use strict";Cg();ni()});var Sj,nc,Pj=l(()=>{"use strict";Sj=require("node:child_process");ni();nc=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,Sj.spawn)("systemctl",["--user","restart",pr],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${pr} exited ${o??"unknown"}`))})})});var l_=l(()=>{"use strict";ni();yj();hj();Pj()});var Vt,Ei=l(()=>{"use strict";Vt=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var sc,Lg,Aj,xQ,c_,IQ,bj,WQ,p_,OQ,m_,Kt,ic,ac,g_,d_,u_,lc,cc,f_,y_,Ri=l(()=>{"use strict";sc=m(require("node:fs")),Lg=m(require("node:path"));Ei();Aj="active-writer-work.json",xQ=1440*60*1e3,c_=new Set,IQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),bj=e=>e.profileEmail===null?Lg.default.join(e.installDir,Aj):Lg.default.join(e.installDir,"profiles",e.profileEmail,Aj),WQ=e=>{let t=bj(e);if(!sc.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(sc.default.readFileSync(t,"utf8"));if(!IQ(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},p_=(e,t)=>{let r=bj(e);sc.default.mkdirSync(Lg.default.dirname(r),{recursive:!0}),sc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},OQ=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??Vt;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>xQ},m_=e=>{let t=WQ(e);if(!OQ(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{p_(e,r)}catch{}return r},Kt=e=>m_(e).activeCount>0,ic=e=>{let t=m_(e);p_(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},ac=e=>{let t=m_(e),r=Math.max(0,t.activeCount-1);if(p_(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of c_)o()},g_=e=>(c_.add(e),()=>{c_.delete(e)}),d_=null,u_=null,lc=e=>{d_=e},cc=e=>{u_=e},f_=()=>{let e=d_;return d_=null,e},y_=()=>{let e=u_;return u_=null,e}});var $e,xg=l(()=>{"use strict";$e=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var vi,Ig,dc,h_=l(()=>{"use strict";vi="qwen2.5:7b",Ig="nomic-embed-text",dc="Install Ollama from https://ollama.com/download"});var uc,S_,Wg=l(()=>{"use strict";h_();uc=()=>`
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
    echo "Ollama is missing. ${dc}" >&2
    return 1
  fi
  local ollama_home archive bin
  ollama_home="\${AGENT_WITCH_HOME:-\${HOME}/.agent-witch}"
  archive="\${ollama_home}/ollama-darwin.tgz"
  mkdir -p "\${ollama_home}/ollama" "\${HOME}/.local/bin"
  echo "Downloading Ollama for macOS\u2026"
  if ! curl -fL --retry 3 -o "\${archive}" https://github.com/ollama/ollama/releases/latest/download/ollama-darwin.tgz; then
    echo "Could not download Ollama. ${dc}" >&2
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
  agent_witch_ensure_ollama_model "${vi}" "\${pull_log}"
  agent_witch_ensure_ollama_model "${Ig}" "\${pull_log}"
}
`,S_=()=>`
${uc()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. Agent Witch will continue without it." >&2
`});var _j,MQ,Og,P_=l(()=>{"use strict";_j=require("node:child_process");G();In();Wg();MQ=e=>new Promise(t=>{if(!Lt()){t({exitCode:1,output:mi("Ollama")});return}let r=(0,_j.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:v()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Og=async(e=MQ)=>{let t=`${uc()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var No,Mg,kj,jQ,wj,Li,NQ,DQ,HQ,Ci,Gn,Vn,Tj=l(()=>{"use strict";No=m(require("node:fs")),Mg=m(require("node:path"));fj();l_();ae();G();ki();At();Qb();Ri();xg();o_();P_();kj=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),jQ=e=>{let t=Je(e),r=t===null?N():N(t);if(!No.default.existsSync(r.configPath))return null;try{let o=JSON.parse(No.default.readFileSync(r.configPath,"utf8"));return!kj(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},wj=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!kj(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Li=async e=>(await wj(e))?.bundleVersion??null,NQ=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Mg.default.join(t,r);No.default.mkdirSync(Mg.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());No.default.writeFileSync(n,s),r.endsWith(".js")&&No.default.chmodSync(n,493)},DQ=async()=>{if(process.platform==="linux"){try{await nc()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}jl(),await Mn()},HQ=(e,t)=>e!==null?$e(e):t??Pt,Ci=(e,t)=>({localBundleVersion:t,...e}),Gn=async e=>{let t=v(),r=Fe(t),o=r?.bundleVersion??null,n=await Og();Sr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=jQ(t),i=HQ(s,r?.appOrigin);if(i===null){let d=Ci({ok:!1,updated:!1,message:"Could not resolve the Agent Witch app origin for updates.",remoteBundleVersion:null},o);return Sr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await wj(i);if(a===null){let d=Ci({ok:!1,updated:!1,message:"Could not fetch the remote Agent Witch install bundle.",remoteBundleVersion:null},o);return Sr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||$n(o,a.bundleVersion))){let d=Ci({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Sr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let f of a.scripts)await NQ(i,t,f);let d=Mg.default.join(t,wg);No.default.existsSync(d)&&No.default.rmSync(d,{force:!0}),i_(t),a_(t),Ti({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=N(Je(t));if(Kt(u)){cc("install-bundle-update");let f=Ci({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Sr({event:"update_applied",ok:!0,message:f.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),f}await DQ();let g=Ci({ok:!0,updated:!0,message:`Updated Agent Witch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Sr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let u=d instanceof Error?d.message:"Agent Witch self-update failed.",g=Ci({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Sr({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},Vn=()=>{let e=v();return{local:Fe(e),logs:Un(20,e)}}});var Ej={};St(Ej,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Tg,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>dc,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Ig,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>vi,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>t_,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>r_,appendAgentWitchSelfUpdateLog:()=>Sr,buildAgentWitchEnsureOllamaShell:()=>uc,buildAgentWitchInstallScriptOllama:()=>S_,buildAgentWitchSelfUpdateStatus:()=>Vn,ensureAgentWitchInstallVersionRecorded:()=>oc,ensureAgentWitchOllamaInstalled:()=>Og,fetchAgentWitchRemoteInstallBundleVersion:()=>Li,isRemoteAgentWitchBundleVersionNewer:()=>$n,readAgentWitchInstallVersion:()=>Fe,readAgentWitchSelfUpdateLogs:()=>Un,resolveAgentWitchAppOriginFromWsUrl:()=>$e,resolveAgentWitchHeartbeatInstallBundleVersion:()=>rc,resolveAgentWitchInstallVersionPath:()=>tc,resolveAgentWitchSelfUpdateLogPath:()=>Eg,runAgentWitchSelfUpdate:()=>Gn,writeAgentWitchInstallVersion:()=>Ti});var Pr=l(()=>{"use strict";Qb();o_();Tj();xg();h_();Wg();P_()});var A_={};St(A_,{buildAgentWitchSelfUpdateStatus:()=>Vn,fetchAgentWitchRemoteInstallBundleVersion:()=>Li,runAgentWitchSelfUpdate:()=>Gn});var b_=l(()=>{"use strict";Pr()});function xi(e){return(0,Rj.createHash)("sha256").update(e.trim()).digest("hex")}var Rj,jg=l(()=>{"use strict";Rj=require("node:crypto")});var Ii,pc,FQ,Wi,__,Ng=l(()=>{"use strict";Ii=m(require("node:fs")),pc=m(require("node:path"));jg();Xe();FQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wi=e=>{if(!Ii.default.existsSync(e))return null;try{let t=JSON.parse(Ii.default.readFileSync(e,"utf8"));return!FQ(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:xi(t.pairingToken.trim())}catch{return null}},__=(e=v())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(Wi(pc.default.join(e,"config.json")));let n=pc.default.join(e,st);if(!Ii.default.existsSync(n))return t;for(let s of Ii.default.readdirSync(n)){let i=pc.default.join(n,s);Ii.default.statSync(i).isDirectory()&&o(Wi(pc.default.join(i,"config.json")))}return t}});var Oi,mc=l(()=>{"use strict";Oi="connection-health.json"});var Kn,Dg,$Q,gc,Ce,k_,Hg,ze,Fg=l(()=>{"use strict";Kn=m(require("node:fs")),Dg=m(require("node:path"));mc();$Q=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gc=e=>e.profileEmail===null?Dg.default.join(e.installDir,Oi):Dg.default.join(e.installDir,"profiles",e.profileEmail,Oi),Ce=e=>{let t=gc(e);if(!Kn.default.existsSync(t))return null;try{let r=JSON.parse(Kn.default.readFileSync(t,"utf8"));return!$Q(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},k_=e=>{let t=gc(e);Kn.default.existsSync(t)&&Kn.default.rmSync(t,{force:!0})},Hg=(e,t)=>{let r=gc(e),o=Ce(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Kn.default.mkdirSync(Dg.default.dirname(r),{recursive:!0}),Kn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ze=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var fc,vj=l(()=>{"use strict";mc();Fg();fc=(e,t)=>{if(!t.socketOpen)return!1;let r=Ce(e);return r===null?!1:!ze(r,t.staleAfterMs??12e4,t.nowMs)}});var w_,Cj=l(()=>{"use strict";Fg();w_=(e,t)=>!(e!==null&&!ze(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var qn=l(()=>{"use strict";Fg();vj();Cj();mc()});var $g,T_,zQ,UQ,Lj,xj=l(()=>{"use strict";$g=m(require("node:fs")),T_=m(require("node:path"));G();He();qn();Ng();zQ=12e4,UQ=e=>{let t=T_.default.join(e,st);return $g.default.existsSync(t)?$g.default.readdirSync(t).filter(r=>$g.default.statSync(T_.default.join(t,r)).isDirectory()):[]},Lj=(e=v())=>{let t=null,r=-1;for(let o of UQ(e)){let n=N(o),s=Ce(n);if(s===null||ze(s,zQ))continue;let i=Wi(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var E_,Ij,zg,yc,hc,BQ,GQ,VQ,Wj,we,Te,Ug,Ar,qt=l(()=>{"use strict";E_=m(require("node:fs")),Ij=m(require("node:os")),zg=m(require("node:path")),yc={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},hc=e=>e.trim().length>0,BQ=e=>{let t=zg.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},GQ=()=>{let e=Ij.default.homedir(),t=zg.default.join(e,".local","bin","agent");if(E_.default.existsSync(t))return t;let r=zg.default.join(e,".local","bin","cursor-agent");return E_.default.existsSync(r)?r:yc.cursorCommand},VQ=e=>{let t=e.trim();return!hc(t)||t===yc.cursorCommand?GQ():t},Wj=(e,t)=>BQ(e)?t:["agent",...t],we=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Te=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:hc(t)?t.trim():yc.claudeCommand,codexCommand:hc(r)?r.trim():yc.codexCommand,cursorCommand:VQ(o),antigravityCommand:hc(n)?n.trim():yc.antigravityCommand}},Ug=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:Wj(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Ar=(e,t,r,o)=>{let n=t.trim();if(!hc(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:Wj(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var Do,KQ,Jn,qQ,Mi,Sc=l(()=>{"use strict";Do=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,KQ=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Do(s.inputTokens)+Do(s.outputTokens)+Do(s.cacheReadInputTokens)+Do(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Jn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Do(a.input_tokens)+Do(a.cache_creation_input_tokens)+Do(a.cache_read_input_tokens),d=Do(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:KQ(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},qQ=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Mi=(e,t)=>{let r=Jn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??qQ(r)}}});var R_,JQ,YQ,v_,C_=l(()=>{"use strict";R_=e=>e.toLocaleString("en-US"),JQ=e=>e<.01?e.toFixed(4):e.toFixed(3),YQ=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${JQ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${R_(e.inputTokens)} in / ${R_(e.outputTokens)} out (${R_(e.totalTokens)} total)`,t].join(`
`)},v_=(e,t)=>{if(t===void 0)return e;let r=YQ(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Bg,L_=l(()=>{"use strict";Bg={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Yn,x_,Gg,I_=l(()=>{"use strict";L_();Yn="auto",x_=e=>({value:Yn,label:`Auto (${Bg[e]})`}),Gg={anthropic:[x_("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[x_("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[x_("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ji,Pc,Vg,Ni=l(()=>{"use strict";L_();I_();ji=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Yn))return t},Pc=(e,t)=>{let r=ji(t);return r===void 0?Bg[e]:r},Vg=e=>{let t=ji(e);return t===void 0?Yn:t}});var Kg,XQ,ZQ,qg,Oj=l(()=>{"use strict";Kg={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},XQ=e=>{let t=Kg[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Kg["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Kg["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Kg["gemini-2.0-flash"]:null},ZQ=(e,t,r)=>{let o=XQ(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},qg=e=>{let t=ZQ(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Di,QQ,eee,tee,Jg,Mj=l(()=>{"use strict";Oj();Di=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),QQ=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Di(r.input_tokens),n=Di(r.output_tokens);return o===0&&n===0?null:qg({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},eee=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Di(r.prompt_tokens),n=Di(r.completion_tokens);return o===0&&n===0?null:qg({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},tee=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Di(r.promptTokenCount),n=Di(r.candidatesTokenCount);return o===0&&n===0?null:qg({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Jg=(e,t,r)=>e==="anthropic"?QQ(t,r):e==="openai"?eee(t,r):tee(t,r)});var ree,W_,oee,nee,see,iee,aee,O_,M_=l(()=>{"use strict";Ni();Mj();ree=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},W_=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Pc(e,t.model)},oee=async e=>{let t=W_("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=ree(o);n.length>0&&e.onChunk?.(n);let s=Jg("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},nee=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},see=async e=>{let t=W_("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=nee(o);n.length>0&&e.onChunk?.(n);let s=Jg("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},iee=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},aee=async e=>{let t=W_("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=iee(n);s.length>0&&e.onChunk?.(s);let i=Jg("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},O_=async e=>{try{return e.provider==="anthropic"?await oee(e):e.provider==="openai"?await see(e):await aee(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var kt,Ac=l(()=>{"use strict";kt=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var jj,lee,Yg,j_=l(()=>{"use strict";jj=m(require("node:path")),lee="writer-api-secrets.json",Yg=e=>jj.default.join(e,lee)});var N_,Nj,cee,Ho,ct,Fo=l(()=>{"use strict";N_=m(require("node:fs"));Ni();j_();Nj=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),cee=e=>{if(!Nj(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=ji(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Ho=e=>{let t=Yg(e);if(!N_.default.existsSync(t))return{};try{let r=JSON.parse(N_.default.readFileSync(t,"utf8"));if(!Nj(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=cee(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},ct=(e,t)=>Ho(e)[t]??null});var Ze,bc=l(()=>{"use strict";Ze=e=>e==="api"?"api":"cli"});var Dj,Be,Xn,Kr=l(()=>{"use strict";Dj=m(require("node:path"));Ac();Fo();bc();Be=e=>Dj.default.dirname(e),Xn=(e,t)=>{if(Ze(e.writerExecutionBackend)!=="api")return!1;let r=kt(t);if(r===null)return!1;let o=Be(e.layout.configPath),n=ct(o,r);return n!==null&&n.apiKey.length>0}});var _c,D_=l(()=>{"use strict";C_();M_();Ac();Fo();Kr();_c=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=kt(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Be(e.layout.configPath),a=ct(i,s);if(a===null){let d=Object.keys(Ho(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in Agent Witch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await O_({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:v_(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var Hj,Hi,H_=l(()=>{"use strict";Hj=require("node:child_process");qt();Sc();D_();Kr();Hi=(e,t,r)=>new Promise(o=>{if(!we(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Xn(e,t)){_c(e,t,r).then(o);return}let n=Ar(t,r,Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,Hj.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Mi(i.join("")),u=a.join("").trim(),g=[d.output.trim(),u].filter(f=>f.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var Fj=l(()=>{"use strict"});var $j=l(()=>{"use strict";C_();H_();M_();Fj();Fo();Kr()});var zj,Uj,Bj,Gj=l(()=>{"use strict";zj="claude",Uj="codex",Bj="cursor"});var Vj,dee,F_,kc,Xg=l(()=>{"use strict";Vj=m(require("node:path"));At();He();dee="ws://localhost:3000/api/agent-witch/ws",F_=e=>e.replace(/\/$/,""),kc=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return F_(t);let r=Vj.default.basename(e.installDir);if(r===ml.production)return Jp;let o=e.configWsUrl?.trim()??"";return r===ml.localhost?o.length>0?F_(o):dee:o.length>0?F_(o):Jp}});var pee,$_,z_=l(()=>{"use strict";Gj();Xg();bc();pee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$_=e=>{if(!pee(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=kc({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??zj,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??Uj,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??Bj,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Ze(t.writerExecutionBackend),layout:e.layout}}}});var U_,B_,G_=l(()=>{"use strict";U_=m(require("node:fs"));G();z_();B_=e=>{let t=N(e);if(!U_.default.existsSync(t.configPath))return null;try{let r=JSON.parse(U_.default.readFileSync(t.configPath,"utf8")),o=$_({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var wc,Kj=l(()=>{"use strict";wc=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var V_,mee,K_,qj=l(()=>{"use strict";V_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mee=e=>{if(!V_(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!V_(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(g=>{if(!V_(g))return[];let f=typeof g.itemKey=="string"?g.itemKey.trim():"",y=typeof g.relativePath=="string"?g.relativePath:"",P=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return f.length===0||P.length===0?[]:[{itemKey:f,relativePath:y,contentSha256:P}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},K_=mee});var Jj,gee,Zg,q_=l(()=>{"use strict";Jj=m(require("node:path")),gee=(e,t)=>{let r=t.trim();return Jj.default.join(e,"components","store",r.slice(0,2),r)},Zg=gee});var Yj,fee,J_,Xj=l(()=>{"use strict";Yj=m(require("node:fs"));q_();fee=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Zg(e.installDir,n.contentSha256);Yj.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this computer. Open Harness to sync, then retry.`},J_=fee});var Tc,Fi,yee,Y_,hee,X_,Z_=l(()=>{"use strict";Tc=m(require("node:fs")),Fi=m(require("node:path"));q_();yee=(e,t)=>Fi.default.join(e.installDir,"runs",t,"overlay"),Y_=(e,t)=>Fi.default.join(yee(e,t),".cursor"),hee=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Y_(e,t);Tc.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Zg(e.installDir,i.contentSha256);if(!Tc.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this computer."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Fi.default.join(n,c):Fi.default.join(n,i.itemKey);Tc.default.mkdirSync(Fi.default.dirname(d),{recursive:!0}),Tc.default.copyFileSync(a,d)}return{ok:!0}},X_=hee});var Q_,Zj,See,Ec,Qj=l(()=>{"use strict";Q_=m(require("node:fs")),Zj=m(require("node:path")),See=(e,t)=>{let r=Zj.default.join(e.installDir,"runs",t);Q_.default.existsSync(r)&&Q_.default.rmSync(r,{recursive:!0,force:!0})},Ec=See});var Pee,ek,eN=l(()=>{"use strict";Z_();Pee=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Y_(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},ek=Pee});var tk,Aee,bee,_ee,kee,wee,$,tN=l(()=>{"use strict";tk=m(require("node:fs"));Xg();G();bc();Aee="claude",bee="codex",_ee="cursor",kee="agy",wee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=N();if(!tk.default.existsSync(e.configPath))return null;try{let t=JSON.parse(tk.default.readFileSync(e.configPath,"utf8"));if(!wee(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=kc({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Ze(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:Aee,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:bee,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:_ee,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:kee,pairingToken:s,layout:e}}catch{return null}}});var Qg,rN,oN=l(()=>{"use strict";Qg=m(require("node:fs"));j_();rN=(e,t)=>{let r=Yg(e);Qg.default.mkdirSync(e,{recursive:!0}),Qg.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Qg.default.chmodSync(r,384)}catch{}}});var Rc,nN,ef=l(()=>{"use strict";Rc=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},nN=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Rc(t)}});var vc,Tee,rk,ok,sN=l(()=>{"use strict";vc=m(require("node:fs"));Fo();oN();ef();Ni();Kr();Tee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),rk=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=nN(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?ji(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},ok=e=>{let t=Be(e.configPath),r={};if(vc.default.existsSync(e.configPath))try{let n=JSON.parse(vc.default.readFileSync(e.configPath,"utf8"));Tee(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,vc.default.mkdirSync(t,{recursive:!0}),vc.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=rk(rk(rk(Ho(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);rN(t,o)}});var tf,nk=l(()=>{"use strict";tf={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var sk,iN=l(()=>{"use strict";Ac();Fo();Kr();Kr();sk=(e,t)=>{if(Xn(e,t)||t==="antigravity")return!1;let r=kt(t);if(r===null)return!1;let o=Be(e.layout.configPath),n=ct(o,r);return n===null||n.apiKey.trim().length===0}});var aN,ik,ak=l(()=>{"use strict";aN=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},ik=async e=>{let t=aN(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=aN(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var Eee,lk,lN=l(()=>{"use strict";ae();G_();ak();Eee=1e4,lk=()=>ik({listProfileEmails:og,readConfig:B_,pollIntervalMs:Eee,logWaiting:e=>{console.error(e)}})});var Ree,ck,cN=l(()=>{"use strict";Ree={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This Agent Witch Local cannot handle Connect/restart. Update from /download."},ck=e=>({status:e.status,reason:e.reason,message:Ree[e.status]})});var ee=l(()=>{"use strict";H_();$j();G_();Xg();Kj();qj();Xj();Z_();Qj();eN();bc();tN();sN();Fo();Kr();ef();Ni();nk();D_();Kr();iN();Ac();Fo();lN();z_();ak();cN()});var dN,dk,uN=l(()=>{"use strict";dN=m(require("node:path"));G();He();xj();jg();Ng();ee();dk=(e=v())=>{let t=Lj(e);if(t!==null)return t;let r=Je(e);if(r!==null){let n=Wi(dN.default.join(e,st,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:xi(o)}});var rf,pN,vee,Cee,mN,of,Cc,nf,Lc=l(()=>{"use strict";rf=m(require("node:fs")),pN=m(require("node:path")),vee="wake-port.json",Cee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mN=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,of=e=>pN.default.join(e,vee),Cc=e=>{let t=of(e);if(!rf.default.existsSync(t))return null;try{let r=JSON.parse(rf.default.readFileSync(t,"utf8"));if(Cee(r)&&mN(r.wakePort))return r.wakePort}catch{return null}return null},nf=(e,t)=>{if(!mN(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=of(e);rf.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var YAe,XAe,ZAe,Jt,gN,xc=l(()=>{"use strict";G();Lc();Xe();Lc();YAe=Io(),XAe=`${ye()}-wake`,ZAe=ye(),Jt=()=>{let e=v();return ui({filePort:Cc(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Io(e)})},gN=e=>{let t=v();Cc(t)===null&&nf(t,e)}});var fN=l(()=>{"use strict";jg();ae();Ng();uN();ee();xc()});var uk,Ic,Wc,yN=l(()=>{"use strict";uk=m(require("node:os"));fN();Ic=()=>{let e=ue();return{ok:!0,port:Jt(),hostname:uk.default.hostname(),profileCount:e.length}},Wc=()=>{let e=ue(),t=dk(),r=__();return{hostname:uk.default.hostname(),port:Jt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var pk=l(()=>{"use strict";yN()});var hN,SN,PN,sf,$i=l(()=>{"use strict";hN="materialization.json",SN="backups",PN=".gitignore",sf=e=>`harness-set:${e.trim()}`});var AN,bN,af,_N=l(()=>{"use strict";AN=m(require("node:crypto")),bN=m(require("node:fs")),af=e=>{try{let t=bN.default.readFileSync(e);return AN.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var $o,Zn,Lee,kN,mk,wN=l(()=>{"use strict";$o=m(require("node:fs")),Zn=m(require("node:path"));_N();Lee=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Zn.default.join(t,n,o);return $o.default.mkdirSync(Zn.default.dirname(s),{recursive:!0}),$o.default.copyFileSync(r,s),Zn.default.relative(e,s).replaceAll("\\","/")},kN=e=>{let t=Zn.default.join(e.repoRoot,e.repoRelativeDestination),r=af(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if($o.default.existsSync(t)){let n=af(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=Lee(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return $o.default.mkdirSync(Zn.default.dirname(t),{recursive:!0}),$o.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return $o.default.mkdirSync(Zn.default.dirname(t),{recursive:!0}),$o.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},mk=e=>{let t=af(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var gk,TN,zi,lf=l(()=>{"use strict";gk=m(require("node:fs"));$i();TN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zi=e=>{if(!gk.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(gk.default.readFileSync(e,"utf8"));if(TN(t)&&t.version===1&&TN(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var zo,cf,df,fk=l(()=>{"use strict";zo=m(require("node:fs")),cf=m(require("node:path"));$i();df=e=>{let t=new Set(e.setSlugs.map(s=>sf(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=cf.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=cf.default.join(e.repoRoot,i.backupPath);zo.default.existsSync(c)?(zo.default.mkdirSync(cf.default.dirname(a),{recursive:!0}),zo.default.copyFileSync(c,a),o.push(s)):zo.default.existsSync(a)&&zo.default.rmSync(a,{force:!0})}else zo.default.existsSync(a)&&zo.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var yk,Ui,uf=l(()=>{"use strict";yk=m(require("node:path"));$i();Ui=e=>({ledgerFilePath:yk.default.join(e.metaDirPath,hN),backupsDirPath:yk.default.join(e.metaDirPath,SN)})});var hk,EN,RN=l(()=>{"use strict";hk=m(require("node:path")),EN=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return hk.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return hk.default.posix.join(s,e,n)}});var Sk,vN,Mc,Pk=l(()=>{"use strict";Sk=m(require("node:fs")),vN=m(require("node:path")),Mc=(e,t)=>{Sk.default.mkdirSync(vN.default.dirname(e),{recursive:!0}),Sk.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Ak,xee,Qe,Uo=l(()=>{"use strict";Ak=m(require("node:os")),xee=e=>{let t=e.trim();return t.startsWith("~/")?`${Ak.default.homedir()}${t.slice(1)}`:t==="~"?Ak.default.homedir():t},Qe=xee});var pf,CN,Iee,LN,xN=l(()=>{"use strict";pf=m(require("node:fs")),CN=m(require("node:path"));$i();Wo();Iee=`*
!${dg}
`,LN=e=>{let t=CN.default.join(e,PN);pf.default.existsSync(t)||(pf.default.mkdirSync(e,{recursive:!0}),pf.default.writeFileSync(t,Iee))}});var Qn,xt,es=l(()=>{"use strict";Qn=m(require("node:path"));Wo();Uo();xt=e=>{let t=Qe(e),r=Qn.default.join(t,$l);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Qn.default.join(r,"rag"),memoryDirPath:Qn.default.join(r,CM),reportsDirPath:Qn.default.join(r,xM),metaFilePath:Qn.default.join(r,dg),ragChunksFilePath:Qn.default.join(r,"rag",LM)}}});var br,WN,Wee,Oee,it,mf=l(()=>{"use strict";br=m(require("node:fs")),WN=m(require("node:path"));Wo();xN();es();Wee=(e,t)=>{if(br.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};br.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},Oee=e=>{br.default.existsSync(e.ragChunksFilePath)||br.default.writeFileSync(e.ragChunksFilePath,"");let t=WN.default.join(e.memoryDirPath,fi);br.default.existsSync(t)||br.default.writeFileSync(t,"")},it=e=>{let t=xt(e.projectFolderPath);return br.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),br.default.mkdirSync(t.ragDirPath,{recursive:!0}),br.default.mkdirSync(t.memoryDirPath,{recursive:!0}),LN(t.metaDirPath),Wee(t,e),Oee(t),{ok:!0,layout:t}}});var ON,MN,jN,NN,gf,ff=l(()=>{"use strict";ON="components",MN="store",jN="versions",NN="installed.json",gf=e=>`harness-set:${e.trim()}`});var bk,DN,yf,_k=l(()=>{"use strict";bk=m(require("node:fs")),DN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yf=e=>{if(!bk.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(bk.default.readFileSync(e,"utf8"));if(DN(t)&&t.version===1&&DN(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var jc,Bi,hf=l(()=>{"use strict";jc=m(require("node:path"));ff();Bi=e=>{let t=jc.default.join(e,ON);return{componentsRootDir:t,storeDir:jc.default.join(t,MN),versionsDir:jc.default.join(t,jN),installedFilePath:jc.default.join(t,NN)}}});var kk,HN,Sf,Pf,Af=l(()=>{"use strict";kk=m(require("node:crypto")),HN=m(require("node:fs")),Sf=e=>kk.default.createHash("sha256").update(e,"utf8").digest("hex"),Pf=e=>{try{let t=HN.default.readFileSync(e);return kk.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var wk,FN,$N,zN=l(()=>{"use strict";wk=m(require("node:fs")),FN=m(require("node:path")),$N=(e,t)=>{wk.default.mkdirSync(FN.default.dirname(e),{recursive:!0}),wk.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Tk,Ek,UN,BN=l(()=>{"use strict";Tk=m(require("node:fs")),Ek=m(require("node:path")),UN=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=Ek.default.join(e,r),n=Ek.default.join(o,`${t.versionId}.json`);Tk.default.mkdirSync(o,{recursive:!0}),Tk.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var bf,GN,VN,KN=l(()=>{"use strict";bf=m(require("node:fs")),GN=m(require("node:path"));Af();VN=e=>{let t=Sf(e.content),r=GN.default.join(e.storeDir,t);return bf.default.existsSync(r)||(bf.default.mkdirSync(e.storeDir,{recursive:!0}),bf.default.writeFileSync(r,e.content)),t}});var Rk,qN,Mee,_f,vk=l(()=>{"use strict";Rk=m(require("node:fs")),qN=m(require("node:path"));ff();_k();hf();Af();zN();BN();KN();Mee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_f=e=>{let t=Bi(e.installDir),r=gf(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!Mee(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=qN.default.join(e.harnessRootDir,a);if(!Rk.default.existsSync(c))continue;let d=Rk.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Pf(c);if(u!==null){if(Sf(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);VN({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;UN(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=yf(t.installedFilePath);$N(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var Lk,Ck,JN,YN=l(()=>{"use strict";Lk=m(require("node:fs"));vk();_k();hf();Ck=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),JN=e=>{if(!Lk.default.existsSync(e.harnessManifestPath))return;let t=Bi(e.installDir),r=yf(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(Lk.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!Ck(o)||o.version!==1||!Ck(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!Ck(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];_f({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var xk,XN,ZN,QN=l(()=>{"use strict";xk=m(require("node:fs")),XN=m(require("node:path")),ZN=e=>{let t=e.componentId.replaceAll("/","_"),r=XN.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!xk.default.existsSync(r))return null;try{let o=JSON.parse(xk.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var kf,wf,eD,tD=l(()=>{"use strict";kf=m(require("node:fs")),wf=m(require("node:path"));ff();YN();QN();hf();Af();eD=e=>{JN({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Bi(e.layout.installDir),r=gf(e.setSlug),o=ZN({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=wf.default.join(t.storeDir,i.contentSha256);if(kf.default.existsSync(a)&&Pf(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?wf.default.join(e.layout.harnessRootDir,n):wf.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!kf.default.existsSync(s))return null;try{if(!kf.default.statSync(s).isFile())return null}catch{return null}return s}});var rD,jee,Ik,_r,Nc=l(()=>{"use strict";lf();uf();es();rD="harness-set:",jee=e=>{let t=e.trim();if(!t.startsWith(rD))return null;let r=t.slice(rD.length).trim();return r.length>0?r:null},Ik=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=jee(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},_r=e=>{let t=xt(e),{ledgerFilePath:r}=Ui(t),o=zi(r);return Ik(o)}});var Tf,Wk,Dc,Nee,qr,Hc,Gi=l(()=>{"use strict";Tf=m(require("node:fs")),Wk=m(require("node:os")),Dc=m(require("node:path")),Nee=()=>Tf.default.realpathSync(Dc.default.resolve(Wk.default.homedir())),qr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Dc.default.join(Wk.default.homedir(),t.slice(1)):t,o;try{o=Tf.default.realpathSync(Dc.default.resolve(r))}catch{return null}let n=Nee();return o===n||o.startsWith(`${n}${Dc.default.sep}`)?o:null},Hc=e=>{let t=qr(e);if(t===null)return null;try{if(!Tf.default.statSync(t).isFile())return null}catch{return null}return t}});var Ok,Mk=l(()=>{"use strict";Ok=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Rf,oD,Ef,Dee,Fc,jk=l(()=>{"use strict";Rf=m(require("node:fs")),oD=m(require("node:path"));$i();wN();lf();fk();uf();RN();Pk();Uo();mf();tD();Nc();Gi();Mk();Ef=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Dee=e=>{if(!Rf.default.existsSync(e))return null;try{let t=JSON.parse(Rf.default.readFileSync(e,"utf8"));if(Ef(t)&&t.version===1)return t}catch{return null}return null},Fc=e=>{let t=[...new Set(e.setSlugs.map(S=>S.trim()).filter(S=>S.length>0))],r=Qe(e.projectFolderPath),o=qr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Rf.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=it({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Ui(s.layout),d=_r(o).filter(S=>!t.includes(S)),u=zi(i),g=0;if(d.length>0){let S=df({repoRoot:o,setSlugs:d,ledger:u});u=S.ledger,g=S.summary.removedPaths.length}if(t.length===0)return Mc(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let f=Dee(e.layout.harnessManifestPath);if(f===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=Ef(f.sets)?f.sets:{},P=0,h=0,p=0;for(let S of t){let b=y[S];if(!Ef(b))return{ok:!1,errorMessage:`Harness set "${S}" is not installed locally.`};let k=typeof b.version=="number"?String(b.version):"1",A=sf(S),_=Array.isArray(b.items)?b.items:[];for(let E of _){if(!Ef(E))continue;let T=typeof E.path=="string"?E.path.trim():"";if(T.length===0)continue;let C=Ok(T);if(C===null)continue;let x=EN(S,C),W=oD.default.posix.join(".cursor",x).replaceAll("\\","/"),j=typeof E.id=="string"?E.id.trim():"",M=eD({layout:e.layout,setSlug:S,setVersion:typeof b.version=="number"?b.version:1,manifestItemPath:T,manifestItemId:j});if(M===null)continue;let B=kN({repoRoot:o,backupsDir:a,repoRelativeDestination:W,sourceAbsolutePath:M,componentId:A,versionId:k,ledger:u});if(B.kind==="skipped_unchanged"){h+=1;continue}if(B.kind==="backed_up_user_file"){p+=1,P+=1,u={version:1,entries:{...u.entries,[W]:mk({componentId:A,versionId:k,sourceAbsolutePath:M,backupPath:B.backupPath})}};continue}P+=1,u={version:1,entries:{...u.entries,[W]:mk({componentId:A,versionId:k,sourceAbsolutePath:M})}}}}return P===0&&h===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Mc(i,u),{ok:!0,writtenFileCount:P,skippedFileCount:h,backedUpFileCount:p,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var nD,vf,Hee,Fee,$ee,zee,Uee,Bee,Gee,Vee,Kee,$c,Cf=l(()=>{"use strict";nD=m(require("node:crypto")),vf=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Hee=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Fee=(e,t)=>{let r=Hee(t),o=vf(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},$ee=(e,t,r)=>{let o=Fee(t,r);return`shared/items/${e}/${o}`},zee=["rules","skills","commands","instructions","agents"],Uee=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),Bee=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Gee=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Vee=e=>nD.default.createHash("sha256").update(e,"utf8").digest("hex"),Kee=e=>({id:e.id,kind:e.kind,title:e.title,path:$ee(e.id,e.kind,e.title),contentSha256:Vee(e.content)}),$c=e=>{let t=new Date().toISOString(),r=e.existingManifest??Uee(e.hostname,t),o=vf(e.bundle.slug),n=Gee(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...zee.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let g=Kee(u);return{files:[...d.files,{relativePath:g.path,content:u.content}],nextItems:Bee(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Bo,sD,Lf,qee,ts,Nk=l(()=>{"use strict";Bo=m(require("node:fs")),sD=m(require("node:os")),Lf=m(require("node:path"));Cf();qee=e=>{if(!Bo.default.existsSync(e))return null;try{let t=JSON.parse(Bo.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},ts=e=>{try{let t=qee(e.layout.harnessManifestPath),r=$c({bundle:e.bundle,hostname:sD.default.hostname(),existingManifest:t});Bo.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Bo.default.mkdirSync(Lf.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Lf.default.join(e.layout.harnessRootDir,o.relativePath);Bo.default.mkdirSync(Lf.default.dirname(n),{recursive:!0}),Bo.default.writeFileSync(n,o.content)}return Bo.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Dk,iD=l(()=>{"use strict";Nk();jk();Dk=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=ts({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Fc({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var aD,lD=l(()=>{"use strict";aD=["rule","skill","command","instruction","agent"]});var cD,Jee,Yee,kr,Hk=l(()=>{"use strict";lD();cD=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jee=e=>typeof e=="string"&&aD.includes(e),Yee=e=>{if(!cD(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Jee(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},kr=e=>{if(!cD(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=Yee(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var dD,Xee,Fk,uD=l(()=>{"use strict";dD=require("node:zlib");Hk();Xee="x-agent-witch-token",Fk=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[Xee]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,dD.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=kr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var zk,$k,wr,pD=l(()=>{"use strict";zk=m(require("node:fs")),$k=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wr=e=>{if(!zk.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(zk.default.readFileSync(e.harnessManifestPath,"utf8"));if(!$k(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=$k(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!$k(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var xf,mD=l(()=>{"use strict";xf=()=>"~"});var gD,fD,yD=l(()=>{"use strict";gD=require("node:crypto"),fD=e=>`local-${(0,gD.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Uk,hD=l(()=>{"use strict";Uk=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var zc,If,Bk=l(()=>{"use strict";zc=m(require("node:path")),If=e=>{let t=zc.default.dirname(e),r=zc.default.basename(t);return r==="agents"?zc.default.basename(zc.default.dirname(t)):r}});var Uc,Jr,SD,Zee,Qee,ete,Wf,PD,Gk=l(()=>{"use strict";Uc=m(require("node:fs")),Jr=m(require("node:path"));yD();hD();Bk();SD=new Set(["node_modules",".git","dist","build",".next","coverage"]),Zee=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Qee=(e,t)=>{let r=Jr.default.basename(t);if(e==="skill"){let o=t.split(Jr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},ete=e=>{let t=[],r=(n,s)=>{let i;try{i=Uc.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&SD.has(a.name))continue;let c=Jr.default.join(n,a.name),d=s?Jr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Uk(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Jr.default.join(e,n);Uc.default.existsSync(s)&&r(s,n)}let o=Jr.default.join(e,"skills");return Uc.default.existsSync(o)&&r(o,"skills"),t},Wf=e=>{let t=ete(e);if(t.length===0)return null;let r=Jr.default.dirname(e),o=If(e),n=Zee(o),s=t.map(i=>{let a=Uk(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:fD(i.absolutePath),kind:a,title:Qee(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},PD=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Uc.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||SD.has(a.name))continue;let c=Jr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var AD,Vk,tte,Kk,bD=l(()=>{"use strict";AD=m(require("node:fs")),Vk=m(require("node:path"));Gk();Gi();tte=e=>{let t=qr(e.trim());if(t===null)return null;if(Vk.default.basename(t)===".cursor")return t;let r=Vk.default.join(t,".cursor");try{if(AD.default.statSync(r).isDirectory())return qr(r)}catch{return null}return null},Kk=e=>{let t=tte(e.projectPath);if(t===null)return null;let r=Wf(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var _D,rte,Of,qk,kD=l(()=>{"use strict";_D=m(require("node:path"));Gk();Gi();Bk();rte=5,Of=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},qk=e=>{let t=qr(e.scanRoot.trim());if(t===null)return Of(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of PD(t,rte,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=qr(s);if(i===null)continue;let a=If(i);Of(e.response,"folder",{cursorDir:i,groupName:a,repoPath:_D.default.dirname(i)});let c=Wf(i);c!==null&&(r.push(c),Of(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Of(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var wD,TD,ED=l(()=>{"use strict";wD=m(require("node:path")),TD=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:wD.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var at,RD,Jk,ote,Yk,Xk,Mf,Zk,Bc,vD=l(()=>{"use strict";at=m(require("node:fs")),RD=m(require("node:os")),Jk=m(require("node:path"));Cf();vk();Gi();ED();ote=e=>{if(!at.default.existsSync(e))return null;try{let t=JSON.parse(at.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Yk=e=>{let t=e.hostname??RD.default.hostname(),r=ote(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let g=Hc(u.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let f=at.default.readFileSync(g,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:f,setSlugs:[i.slug]})}let d=$c({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{at.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)at.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Jk.default.join(e.layout.harnessRootDir,i.relativePath);at.default.mkdirSync(Jk.default.dirname(a),{recursive:!0}),at.default.writeFileSync(a,i.content)}at.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=vf(i.slug),d=r.sets[c];d!==void 0&&_f({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Xk="reveal-cache.json",Mf=(e,t)=>{at.default.mkdirSync(e.harnessRootDir,{recursive:!0}),at.default.writeFileSync(`${e.harnessRootDir}/${Xk}`,`${JSON.stringify(t,null,2)}
`)},Zk=e=>{let t=`${e.harnessRootDir}/${Xk}`;at.default.existsSync(t)&&at.default.unlinkSync(t)},Bc=e=>{let t=`${e.harnessRootDir}/${Xk}`;if(!at.default.existsSync(t))return null;try{let r=JSON.parse(at.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return TD(r)}catch{return null}return null}});var Go=l(()=>{"use strict";jk();iD();Mk();Nk();uD();Hk();Cf();pD();mD();bD();Gi();kD();vD()});var Qk,CD=l(()=>{"use strict";Go();Xe();Qk=e=>{let t=N(e.profileEmail);return ts({bundle:e.bundle,layout:t})}});var LD=l(()=>{"use strict";CD();Go()});var nte,xD,ste,ID,rs,jf,WD=l(()=>{"use strict";nte=["agentwitch.com","www.agentwitch.com"],xD=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,ste=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},ID=e=>{let t=ste(e);return!!(nte.includes(t)||xD.test(e.trim().toLowerCase()))},rs=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return ID(r)?xD.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},jf=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:rs(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Gc=l(()=>{"use strict";WD()});var Yr,Vc=l(()=>{"use strict";Yr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Kc,OD=l(()=>{"use strict";LD();Gc();Vc();Kc=e=>{if(!Yr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=kr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!rs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=Qk({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var ew=l(()=>{"use strict";OD()});var ite,Vi,tw=l(()=>{"use strict";ite=e=>e==="hourly"||e==="daily"||e==="weekdays",Vi=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!ite(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var qc,Nf,MD,jD,rw,Yt,Df,Hf,Ff,$f,zf=l(()=>{"use strict";qc=m(require("node:fs")),Nf=m(require("node:path"));tw();MD="automations.json",jD=e=>e.profileEmail!==null?Nf.default.join(e.installDir,"profiles",e.profileEmail,MD):Nf.default.join(e.installDir,MD),rw=()=>({version:1,automations:[]}),Yt=e=>{let t=jD(e);if(!qc.default.existsSync(t))return rw();try{let r=JSON.parse(qc.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?rw():{version:1,automations:r.automations.flatMap(n=>{let s=Vi(n);return s!==null?[s]:[]})}}catch{return rw()}},Df=(e,t)=>{let r=jD(e);qc.default.mkdirSync(Nf.default.dirname(r),{recursive:!0}),qc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Hf=(e,t)=>{Df(e,{version:1,automations:t})},Ff=(e,t)=>{let o=Yt(e).automations.filter(n=>n.id!==t.id);Df(e,{version:1,automations:[...o,t]})},$f=(e,t)=>Yt(e).automations.find(r=>r.id===t)??null});var le,It=l(()=>{"use strict";le="x-agent-witch-token"});var ow=l(()=>{"use strict";xg();Wg()});var V,os,nw,Jc,sw,ate,iw,Yc,ns,aw,Xr=l(()=>{"use strict";It();ow();V=e=>{let t=$e(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},os=e=>({[le]:e,"Content-Type":"application/json"}),nw=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Jc=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},sw=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},ate=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},iw=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Yc=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:os(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return ate(r)}catch{return null}},ns=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:os(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},aw=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var ss,ND,DD,lte,lw,HD,cw=l(()=>{"use strict";ss=m(require("node:fs")),ND=m(require("node:path")),DD=e=>ND.default.join(e.harnessRootDir,"projects-registry.json"),lte=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),lw=e=>{let t=DD(e);if(!ss.default.existsSync(t))return[];try{let r=JSON.parse(ss.default.readFileSync(t,"utf8"));return lte(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},HD=e=>{let t=DD(e);if(!ss.default.existsSync(t))return;let r=`${t}.migrated`;if(ss.default.existsSync(r)){ss.default.unlinkSync(t);return}ss.default.renameSync(t,r)}});var FD,cte,dte,$D,zD=l(()=>{"use strict";Uo();FD=e=>Qe(e),cte=e=>new Set(e.map(t=>FD(t.folderPath))),dte=e=>new Set(e.map(t=>t.id)),$D=(e,t)=>{let r=cte(t),o=dte(t),n=[],s=new Set;for(let i of e){let a=FD(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var dw,uw=l(()=>{"use strict";Xr();cw();zD();dw=async(e,t)=>{let r=lw(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Yc(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=$D(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await iw(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&HD(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var pw,Xt,Ki=l(()=>{"use strict";pw=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Xt=(e,t)=>e.find(r=>r.id===t)??null});var Tr,qi=l(()=>{"use strict";Xr();uw();Ki();Tr=async(e,t)=>{t!==void 0&&await dw(t,e);let r=V({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Yc(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach Agent Witch Cloud. Check the computer connection and try again."};let n=pw(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in Agent Witch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from Agent Witch Cloud.`}}});var UD=l(()=>{"use strict"});var mw,ute,Uf,gw=l(()=>{"use strict";mw=m(require("node:fs"));es();ute=e=>{let t=xt(e);if(!mw.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(mw.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Uf=ute});var fw,yw,BD=l(()=>{"use strict";fw=m(require("node:path"));Uo();gw();yw=e=>{let t=fw.default.resolve(Qe(e)),r=o=>{let{projectId:n}=Uf(o);if(n!==null)return n;let s=fw.default.dirname(o);return s===o?null:r(s)};return r(t)}});var pte,mte,Bf,hw=l(()=>{"use strict";pte="Default",mte=e=>e.trim().toLowerCase()===pte.toLowerCase(),Bf=mte});var Gf,Vf,Kf=l(()=>{"use strict";Gf={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},Vf=e=>{let t=Object.entries(Gf).find(([,r])=>r===e);return t===void 0?null:t[0]}});var GD,he,KD,gte,Sw,Pw,VD,fte,yte,Xc,Aw,hte,Ste,Pte,qD,JD=l(()=>{"use strict";Bt();Kf();GD="new",he=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),KD={block:"Must fix",warn:"Warning",info:"Note"},gte={seed:"Built-in",project:"This project",retired:"Retired"},Sw=6e4,Pw=60*Sw,VD=24*Pw,fte=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<Sw)return"Last hit just now";if(o<Pw)return`Last hit ${Math.floor(o/Sw)} min ago`;if(o<VD)return`Last hit ${Math.floor(o/Pw)}h ago`;let n=Math.floor(o/VD);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},yte=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},Xc=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,Aw=e=>e?{retired:"1"}:{},hte=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${KD[a]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
      <p class="field-label">${n}</p>
      ${s}
      <input type="hidden" name="projectId" value="${he(e.projectId)}" />
      <input type="hidden" name="pitfallId" value="${he(t?.id??"")}" />
      <input type="hidden" name="tags" value="${he((t?.tags??[]).join(", "))}" />
      ${e.showRetired?'<input type="hidden" name="showRetired" value="1" />':""}
      <label class="stack">
        <span>Title</span>
        <input type="text" name="symptom" required maxlength="${ke.symptom}" value="${he(t?.symptom??"")}" placeholder="What goes wrong, in one line" />
      </label>
      <label class="stack">
        <span>Fix</span>
        <textarea name="avoidance" required maxlength="${ke.avoidance}" rows="3" placeholder="What to do instead">${he(t?.avoidance??"")}</textarea>
      </label>
      <label class="stack">
        <span>Why it happens</span>
        <textarea name="cause" required maxlength="${ke.cause}" rows="2" placeholder="What leads to this trap">${he(t?.cause??"")}</textarea>
      </label>
      <label class="stack">
        <span>Triggers</span>
        <input type="text" name="keywords" value="${he((t?.keywords??[]).join(", "))}" placeholder="Words that point to this trap, separated by commas" />
      </label>
      <label class="stack">
        <span>How to check <span class="muted">(optional)</span></span>
        <input type="text" name="checkCommand" class="mono" maxlength="${ke.checkValue}" value="${he(o)}" placeholder="A command that shows the trap, like npm run lint" />
      </label>
      <label class="stack">
        <span>How serious</span>
        <select name="severity">${i("block")}${i("warn")}${i("info")}</select>
      </label>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Save pitfall</button>
        <a class="btn btn-secondary" href="${he(Xc(e.projectId,Aw(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},Ste=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${he(r)}" />
            <input type="hidden" name="pitfallId" value="${he(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${he(Xc(r,{...Aw(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>he(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${he(t.id)}">
        <p><strong>${he(t.symptom)}</strong> <span class="muted">\xB7 ${KD[t.severity]} \xB7 ${gte[t.source]}</span></p>
        <p>Fix: ${he(t.avoidance)}</p>
        ${a}
        <p class="muted">${he(fte(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${he(yte(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},Pte=e=>{let t=e.postPaths??Gf;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this computer on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=Oo(o),s=n>=64,i=e.showRetired?o:o.filter(f=>f.source!=="retired"),a=e.editId===null?null:e.editId===GD?s?null:{item:null}:(()=>{let f=o.find(y=>y.id===e.editId&&y.source!=="retired");return f===void 0?null:{item:f}})(),c=a===null?"":hte({projectId:e.projectId,item:a.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">${64} of ${64} active. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${he(Xc(e.projectId,{...Aw(e.showRetired),edit:GD}))}">Add pitfall</a>`,u=e.showRetired?`<a class="btn btn-secondary" href="${he(Xc(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${he(Xc(e.projectId,{retired:"1"}))}">Show retired</a>`,g=i.length===0?'<p class="empty">No pitfalls for this project. Add one when you spot a mistake that keeps coming back.</p>':`<ul class="harness-installed-set-list">${i.map(f=>Ste({projectId:e.projectId,item:f,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      <p class="muted">${n} of ${64} active</p>
      <div class="actions">${a===null?d:""}${u}</div>
      ${c}
      ${g}
    </section>`},qD=Pte});var re,YD,Ate,bte,_te,kte,wte,Vo,qf=l(()=>{"use strict";hw();Bt();JD();re=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YD=(e,t)=>e.length===0?`<p class="empty">${re(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${re(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${re(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in Agent Witch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,Ate=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this computer yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,bte=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from Agent Witch Cloud.":"This project\u2019s playbook is linked in Agent Witch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${re(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},_te=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${re(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
          <input type="hidden" name="projectId" value="${re(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${re(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the profile harness on this computer \u2014 refresh from Agent Witch Cloud only if you need an update.</p>
        ${t}
        <form method="POST" action="/projects/pull-bound-harness" class="actions">
          <input type="hidden" name="projectId" value="${re(e.project.id)}" />
          <button class="btn btn-secondary" type="submit">Refresh in repo\u2026</button>
        </form>
      </div>`:`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Open Harness to install playbooks on this computer if you want to change them.</p>
        ${t}
        <div class="actions">
          <a class="btn btn-secondary" href="/harness">Open Harness</a>
        </div>
      </div>`},kte=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?_te({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?bte({project:e.project,alreadyInRepo:!1}):Ate();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
            <input type="hidden" name="projectId" value="${re(e.project.id)}" />
            <input type="hidden" name="setSlug" value="${re(c.slug)}" />
            <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
          </form>`:"";return`<li class="harness-installed-set">
          <label class="check-row">
            <input form="link-harness-form" type="checkbox" name="applySet" value="${re(c.slug)}"${t.size===0||d?" checked":""} />
            <span><strong>${re(c.name)}</strong> <span class="muted mono">(${re(c.slug)})</span></span>
          </label>
          <p class="muted">${c.itemCount} item(s)${d?' \xB7 <span class="muted">in repo</span>':""}</p>
          ${u}
        </li>`}).join("")}</ul>`;return`<div class="stack">
        <form id="link-harness-form" method="POST" action="/projects/link-harness">
          <input type="hidden" name="projectId" value="${re(e.project.id)}" />
          <p class="field-label">Installed</p>
          <p class="lede">${n}</p>
        </form>
        ${a}
        <div class="actions">
          <button form="link-harness-form" class="${i}" type="submit">${s}</button>
        </div>
      </div>`},wte=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${re(t)} from recent runs. Review in Agent Witch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${re(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Vo=e=>{let t=e.flashError?`<div class="alert-error">${re(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${re(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(f,y)=>`<a class="project-tab${e.activeTab===f?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${f}">${re(y)}</a>`,n=e.composition?.items.filter(f=>f.kind==="workflow")??[],s=e.composition?.items.filter(f=>f.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":return kte({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0});case"workflows":return YD(n,"No workflows installed for this project yet.");case"agents":return YD(s,"No agents installed for this project yet.");case"knowledge":return wte({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return qD({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${Oo(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,u=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${re(c)}" target="_blank" rel="noopener noreferrer">Open in Agent Witch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${re(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,g=Bf(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from Agent Witch Cloud only. The folder on this computer is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from Agent Witch Cloud? Your repo folder on this computer will stay.');">
          <input type="hidden" name="projectId" value="${re(e.project.id)}" />
          <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
      </section>`;return`${t}<section class="card">
      <p class="eyebrow"><a href="/projects">Projects</a></p>
      <h1>${re(e.project.name)}</h1>
      <p class="muted mono">${re(e.project.projectFolderPath)}</p>
      ${u}
      <div class="actions"><a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(e.project.id)}">Change folder\u2026</a></div>
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
    </section>${g}`}});var Tte,Ete,XD,ZD=l(()=>{"use strict";Go();It();Tte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Ete=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!Tte(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=kr(n);return s===null?[]:[s]})}catch{return null}},XD=Ete});var QD,bw,eH=l(()=>{"use strict";ee();Go();qf();qi();ZD();Ki();Nc();Xr();At();QD=e=>({kind:"page",title:e.project.name,body:Vo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:wr(e.layout),linkedSetSlugs:_r(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),bw=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await Tr(r,e.layout),n=Xt(o.projects,t);if(n===null)return{kind:"not_found"};let s=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??Pt,a=s===null?null:await XD(s,n.id);if(a===null)return QD({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from Agent Witch Cloud."});let c=Dk({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return QD({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await ns(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var tH,_w,rH=l(()=>{"use strict";ee();Go();At();Xr();qf();mf();Uo();qi();Ki();Nc();lf();fk();uf();Pk();tH=e=>({kind:"page",title:e.project.name,body:Vo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:wr(e.layout),linkedSetSlugs:_r(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),_w=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await Tr(n,e.layout),i=Xt(s.projects,r);if(i===null)return{kind:"not_found"};let a=V({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??Pt;if(o.length===0)return tH({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Qe(i.projectFolderPath),u=it({projectFolderPath:d}),{ledgerFilePath:g}=Ui(u.layout),f=zi(g),y=Ik(f);if(!y.includes(o))return tH({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let P=y.filter(b=>b!==o),h=df({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:f});Mc(g,h.ledger);let p=a===null?!1:await ns(a,i.id,P),S=new URLSearchParams({linked:"1",removed:o,files:String(h.summary.removedPaths.length),bindingsSynced:p?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${S.toString()}`}}});var Rte,vte,oH,Cte,Lte,Zc,kw=l(()=>{"use strict";Bt();It();Rte=1e4,vte=15e3,oH=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},Cte=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},Lte=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(oH(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(Rte)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=Vb(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(oH(e.appOrigin,r),{method:"PUT",headers:{[le]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(vte)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:Cte(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Zc=Lte});var ww,nH,xte,Ite,Wte,Ote,sH,iH=l(()=>{"use strict";Bt();ww=e=>e.replace(/\s+/g," ").trim(),nH=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=ww(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},xte=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),Ite=(e,t)=>{let r=xte(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,ke.id).replace(/-+$/g,"")},Wte=e=>e==="block"||e==="info"?e:"warn",Ote=e=>{let{form:t}=e,r=ww(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=ww(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>ke.symptom||o.length>ke.avoidance||n.length>ke.cause||s.length>ke.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:Ite(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:nH(t.get("keywords")??"",ke.keywords,ke.keyword),tags:nH(t.get("tags")??"",ke.tags,ke.tag),source:"project",severity:Wte(t.get("severity"))}}},sH=Ote});var lH,Mte,Zr,aH,Jf,jte,Nte,cH,dH=l(()=>{"use strict";lH=require("node:crypto");Bt();iH();Kf();Mte=()=>(0,lH.randomBytes)(3).toString("hex"),Zr=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},aH=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),Jf=new Map,jte=async(e,t)=>{let r=Jf.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);Jf.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),Jf.get(e)===s&&Jf.delete(e)}},Nte=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return jte(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return Zr(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return Zr(o,"unavailable",s);if(e.action==="save"){let d=sH({form:e.form,randomSuffix:e.randomSuffix??Mte});if(!d.ok)return Zr(o,"invalid",s);let u=i.items.find(y=>y.id===d.pitfall.id);if((u===void 0||u.source==="retired")&&Oo(i.items)>=64)return Zr(o,"limit",s);let f=await n.upsertPitfall(o,d.pitfall);return Zr(o,f.ok?"saved":f.reason==="active_limit"?"limit":f.reason,s)}let a=i.items.find(d=>d.id===t);if(a===void 0)return Zr(o,"missing",s);if(e.action==="restore"){if(a.source==="retired"&&Oo(i.items)>=64)return Zr(o,"limit",s);let d=await n.upsertPitfall(o,aH(a,"project"));return Zr(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,aH(a,"retired"));return Zr(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},cH=Nte});var Yf,uH,pH,Tw=l(()=>{"use strict";Yf=new Map,uH=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=Yf.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&Yf.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},pH=e=>{if(e===void 0){Yf.clear();return}Yf.delete(e)}});var Ew,mH=l(()=>{"use strict";ee();Xr();qi();Ki();kw();dH();Tw();Ew=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=$();if(o===null)return{kind:"not_found"};let n=await Tr(o,e.layout),s=Xt(n.projects,r);if(s===null)return{kind:"not_found"};let i=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),a=e.createStore??Zc,c=i===null?null:a(i),d=await cH({action:e.action,form:t,projectId:s.id,store:c});return pH(s.id),{kind:"redirect",location:d}}});var Dte,Rw,gH=l(()=>{"use strict";Dte=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Rw=Dte});var fH=l(()=>{"use strict"});var yH=l(()=>{"use strict"});var hH=l(()=>{"use strict";fH();yH()});var Hte,Ko,SH=l(()=>{"use strict";Hte=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],Ko=(e=process.env)=>{let t={...e};for(let r of Hte)delete t[r];return t}});var PH=l(()=>{"use strict";SH()});var vw,AH=l(()=>{"use strict";vw={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var Cw=l(()=>{"use strict";AH()});var Xf,Lw=l(()=>{"use strict";Xf={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history"}});var Zf=l(()=>{"use strict";hH();PH();At();Cw();Lw()});var bH,_H,Fte,Qf,ey,kH=l(()=>{"use strict";bH=require("node:child_process"),_H=require("node:util");Zf();Fte=(0,_H.promisify)(bH.execFile),Qf=async(e,t)=>{try{let{stdout:r}=await Fte("git",t,{cwd:e,env:Ko(),maxBuffer:1048576});return r.trim()}catch{return null}},ey=async e=>{let t=await Qf(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Qf(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Qf(e,["status","--porcelain"]),n=await Qf(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var xw,wH=l(()=>{"use strict";xw=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var $te,Iw,TH=l(()=>{"use strict";$te=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},Iw=$te});var zte,Ww,EH=l(()=>{"use strict";It();zte=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[le]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Ww=zte});var RH,qo,vH=l(()=>{"use strict";RH=require("node:child_process"),qo=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,RH.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var CH=l(()=>{"use strict";qi()});var Qc,LH=l(()=>{"use strict";It();Qc=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[le]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var Ow,xH=l(()=>{"use strict";It();Ow=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach Agent Witch Cloud."}}}});var IH,Ute,Qr,Mw,jw=l(()=>{"use strict";IH=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},Ute=e=>e===""?null:e,Qr=e=>e??"",Mw=e=>({id:e.id,projectId:Ute(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:IH(e.keywords_json),tags:IH(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var WH,Bte,Gte,Nw,Ji,ty,ed=l(()=>{"use strict";jw();WH=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,Bte=e=>e,Gte=e=>e??null,Nw=(e,t,r=t)=>Bte(e.prepare(WH).all(Qr(r),Qr(t))).map(Mw),Ji=(e,t,r,o=t)=>{let n=Gte(e.prepare(`${WH} AND p.id = ?`).get(Qr(o),Qr(t),r));return n===null?null:Mw(n)},ty=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Qr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var ry,Dw=l(()=>{"use strict";Bt();ry=e=>e.map(t=>({id:Hn(t.id),avoidance:Hn(t.avoidance)}))});var oy,OH,ny=l(()=>{"use strict";oy=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},OH=e=>e.filter(t=>t.source!=="retired").length});var is,MH,td=l(()=>{"use strict";Bt();Dw();ed();ny();is=(e,t={})=>{let r=t.projectId??null,o=Nw(e,null,r),n=r===null||r===""?[]:Nw(e,r);return oy({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},MH=(e,t={})=>{let r=is(e,t);return t.format==="bot"?{format:"bot",items:ry(r),lines:r.map(o=>Jl(o))}:{format:"full",items:r}}});var sy,Hw=l(()=>{"use strict";ed();td();sy=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?Ji(e,null,r):is(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var Fw=l(()=>{"use strict"});var Jo,Yi,jH,NH,DH=l(()=>{"use strict";Jo=e=>({type:"string",description:e}),Yi={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Jo("Absolute working directory for the current session."),message:Jo("User prompt or task text to match."),sessionId:Jo("Optional session id for first-message tracking."),projectId:Jo("Optional project id when already known.")},additionalProperties:!1}},jH={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Jo("Absolute working directory."),projectId:Jo("Optional project id when already known.")},additionalProperties:!1}},NH={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Jo("Project id."),q:Jo("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var as,HH,FH,$H=l(()=>{"use strict";as=e=>({type:"string",description:e}),HH={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:as("Project id."),skillId:as("Skill id when known."),q:as("Optional search text.")},required:["projectId"],additionalProperties:!1}},FH={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:as("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:as("Pitfall id when kind is pitfall."),preflightId:as("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:as("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var zH=l(()=>{"use strict";DH();$H()});var $w,UH=l(()=>{"use strict";Bt();Fw();$w=e=>{let t=yg("Agent Witch tip \xB7 check_context",120);if(Mo(t)>=120)return t;let r=[t],o=Mo(t);for(let n of e){if(r.length-1>=4)break;let s=Jl(n),i=Mo(s);if(o+i>120){if(r.length===1){let a=120-o,c=yg(s,a);c.length>0&&(r.push(c),o+=Mo(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var BH=l(()=>{"use strict";Bt()});var ay=l(()=>{"use strict";Fw();zH();UH();BH()});var Vte,Kte,ly,zw=l(()=>{"use strict";ay();Vte=e=>e.toLowerCase(),Kte=(e,t)=>{let r=Vte(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},ly=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:Kte(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var GH,VH=l(()=>{"use strict";td();zw();GH=(e,t)=>{let r=is(e,{projectId:t.projectId,includeRetired:!1});return ly({pitfalls:r,text:t.text})}});var KH,od=l(()=>{"use strict";kg();KH=3e3});var qH,JH=l(()=>{"use strict";od();qH=`
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
`});var YH,XH,ZH,qte,Jte,QH,eF,tF=l(()=>{"use strict";YH=m(require("node:fs")),XH=m(require("node:path")),ZH=require("node:sqlite");od();JH();qte=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},Jte=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},QH=e=>{YH.default.mkdirSync(XH.default.dirname(e),{recursive:!0});let t=new ZH.DatabaseSync(e);return t.exec(`PRAGMA busy_timeout = ${KH}`),t.exec(qH),qte(t)<Ql&&Jte(t,Ql),t},eF=e=>{e.close()}});var rF,oF,Uw=l(()=>{"use strict";jw();rF=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Qr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},oF=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Qr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var nF,sF=l(()=>{"use strict";Hw();Uw();nF=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:sy(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=rF(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var Bw,cy,Gw=l(()=>{"use strict";Bw=m(require("node:path"));He();cy=(e,t)=>e.profileEmail!==null?Bw.default.join(e.installDir,st,e.profileEmail,t):Bw.default.join(e.installDir,t)});var Xi,Vw=l(()=>{"use strict";od();Gw();Xi=e=>cy(e,Yb)});var aF,iF=l(()=>{aF=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var Xte,Zte,dy,Kw=l(()=>{"use strict";iF();Xte=aF,Zte=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),dy=()=>Xte.map(Zte)});var lF,cF=l(()=>{"use strict";Kw();ed();lF=e=>dy().reduce((r,o)=>Ji(e,null,o.id)!==null?r:(ty(e,o),r+1),0)});var dF,uF,pF=l(()=>{"use strict";od();dF=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>Ag?{kind:"field_too_long",field:"symptom",max:Ag}:e.cause.length>bg?{kind:"field_too_long",field:"cause",max:bg}:e.avoidance.length>_g?{kind:"field_too_long",field:"avoidance",max:_g}:null,uF=e=>e.activeCountAfter>bi?{kind:"active_cap",max:bi}:null});var mF,gF=l(()=>{"use strict";ed();Uw();td();ny();pF();mF=(e,t)=>{let r=dF(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=Ji(e,t.projectId,o),s=oF(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=is(e,{projectId:t.projectId,includeRetired:!0}).filter(f=>f.id!==a.id),u=OH([...d,a]),g=uF({activeCountAfter:u});return g!==null?{ok:!1,error:g}:(ty(e,a),{ok:!0,pitfall:a})}});var ls,qw=l(()=>{"use strict";Hw();td();VH();tF();sF();Vw();cF();gF();ls=e=>{let t=e.dbPath??(e.layout!==void 0?Xi(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=QH(t);return lF(r),{dbPath:t,listPitfalls:o=>MH(r,o),getPitfall:o=>sy(r,o),upsertPitfall:o=>mF(r,o),recordHit:o=>nF(r,o),matchPitfalls:o=>GH(r,o),close:()=>eF(r)}}});var Qte,ere,uy,Jw=l(()=>{"use strict";ay();Dw();Qte=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},ere=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},uy=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=Qte(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};ere(e,e.registry,n,s);let i=ry(s);return{status:"hit",projectId:n,pitfalls:i,tip:$w(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var py,fF=l(()=>{"use strict";ay();py={name:Yi.name,description:Yi.description,inputSchema:Yi.inputSchema}});var eo,yF,hF,to,tre,Zi,SF,nd=l(()=>{"use strict";eo=m(require("node:fs")),yF=m(require("node:os")),hF=m(require("node:path")),to=()=>({readUtf8:e=>eo.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{eo.default.writeFileSync(e,t,"utf8")},exists:e=>eo.default.existsSync(e),mkdirp:e=>{eo.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{eo.default.renameSync(e,t)},realpath:e=>eo.default.realpathSync.native(e)}),tre=()=>({homedir:()=>yF.default.homedir()}),Zi=()=>({...to(),...tre()}),SF=e=>({...to(),homedir:()=>e,realpath:r=>{let o=hF.default.resolve(r);return eo.default.existsSync(o)?eo.default.realpathSync.native(o):o}})});var my,PF=l(()=>{"use strict";my=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var Yw,AF=l(()=>{"use strict";Gw();Gt();Yw=e=>cy(e,aj)});var bF,Ge,ro=l(()=>{"use strict";bF=m(require("node:path")),Ge=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(bF.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var gy,rre,sd,_F,fy,yy,Qi,hy=l(()=>{"use strict";nd();PF();AF();ro();gy=()=>({byRealpath:{}}),rre=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return gy();let r=t.byRealpath;return typeof r!="object"||r===null?gy():{byRealpath:r}}catch{return gy()}},sd=(e,t=to())=>{let r=Yw(e);return t.exists(r)?rre(t.readUtf8(r)):gy()},_F=(e,t,r)=>{Ge({fs:r,filePath:Yw(e),contents:`${JSON.stringify(t,null,2)}
`})},fy=e=>{let t=e.fs??to(),r=my(e.cwd,t),o={declinedAt:e.nowIso??new Date().toISOString(),cwd:e.cwd},n=sd(e.layout,t);return _F(e.layout,{byRealpath:{...n.byRealpath,[r]:o}},t),o},yy=e=>{let t=e.fs??to(),r=my(e.cwd,t),o=sd(e.layout,t);if(o.byRealpath[r]===void 0)return!1;let n=Object.fromEntries(Object.entries(o.byRealpath).filter(([s])=>s!==r));return _F(e.layout,{byRealpath:n},t),!0},Qi=e=>{let t=e.fs??to(),r=my(e.cwd,t);return sd(e.layout,t).byRealpath[r]!==void 0}});var Yo,Sy,Xw=l(()=>{"use strict";Yo=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},Sy=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Yo(t,"cwd")!==void 0?{cwd:Yo(t,"cwd")}:{},...Yo(t,"message")!==void 0?{message:Yo(t,"message")}:{},...Yo(t,"sessionId")!==void 0?{sessionId:Yo(t,"sessionId")}:{},...Yo(t,"projectId")!==void 0?{projectId:Yo(t,"projectId")}:{}}}});var Xo,Py=l(()=>{"use strict";Wt();Jw();qw();hy();Xw();Xo=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>Qi({layout:e.layout,cwd:o}));return o=>{let n=Sy(o),s=null;try{return s=ls({layout:e.layout}),uy({registry:s,resolveProjectId:yw,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var kF,wF=l(()=>{"use strict";kF=["Agent Witch \xB7 check_context: this folder is not an Agent Witch project yet.","Ask the user once whether to add it in Agent Witch Local (Projects) so saved pitfalls show up here.","If they decline or ignore it, do not ask again this session."].join(`
`)});var ore,Zw,nre,sre,ire,Ay,Qw=l(()=>{"use strict";wF();ore="UserPromptSubmit",Zw=(e,t)=>{let r=e[t];return typeof r=="string"&&r.trim().length>0?r:void 0},nre=e=>{let t;try{t=JSON.parse(e)}catch{return null}if(typeof t!="object"||t===null||Array.isArray(t))return null;let r=t,o=Zw(r,"cwd"),n=Zw(r,"prompt"),s=Zw(r,"session_id");return{...o!==void 0?{cwd:o}:{},...n!==void 0?{message:n}:{},...s!==void 0?{sessionId:s}:{}}},sre=e=>{if(e.status==="hit"){let t=e.tip?.trim()??"";return t.length>0?t:null}return e.status==="none"&&e.promptCreate===!0?kF:null},ire=e=>`${JSON.stringify({hookSpecificOutput:{hookEventName:ore,additionalContext:e}})}
`,Ay=async e=>{try{let t=nre(await e.readStdin());if(t===null)return e.writeStderr(`[agent-witch] mcp-hook: stdin is not a JSON object
`),0;let r=sre(await e.runCheckContext(t));r!==null&&e.writeStdout(ire(r))}catch(t){let r=t instanceof Error?t.message:String(t);try{e.writeStderr(`[agent-witch] mcp-hook: ${r}
`)}catch{}}return 0}});var are,lre,TF,EF=l(()=>{"use strict";Py();Qw();are=1500,lre=(e,t)=>new Promise(r=>{let o=[],n=!1,s=()=>{n||(n=!0,clearTimeout(i),e.removeAllListeners("data"),e.removeAllListeners("end"),e.removeAllListeners("error"),e.pause(),r(Buffer.concat(o).toString("utf8")))},i=setTimeout(s,t);e.on("data",a=>{o.push(Buffer.isBuffer(a)?a:Buffer.from(a,"utf8"))}),e.on("end",s),e.on("error",s)}),TF=async e=>{let t=r=>{process.stderr.write(r)};return Ay({readStdin:()=>lre(process.stdin,are),writeStdout:r=>{process.stdout.write(r)},writeStderr:t,runCheckContext:Xo({layout:e.layout,logError:r=>{let o=r instanceof Error?r.message:String(r);t(`[agent-witch] mcp-hook check_context: ${o}
`)}})})}});var cre,by,RF=l(()=>{"use strict";Py();Xw();cre="/api/local/check-context",by=async e=>{if(e.pathname!==cre)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=Xo({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(Sy(t))),!0}});var vF,_y,dre,ure,CF,LF=l(()=>{"use strict";vF=m(require("node:path"));Gt();ro();_y=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dre={hooks:[{type:"command",command:Jb,timeout:3,[Fn]:!0}]},ure=e=>Array.isArray(e)&&e.some(t=>_y(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>_y(r)&&(r.command===Jb||r[Fn]===!0))),CF=e=>{let t=vF.default.join(e.io.homedir(),ij),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));_y(a)&&(r={...a})}catch{r={}}let o=_y(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(ure(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(dre),o.UserPromptSubmit=s;let{backupPath:i}=Ge({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var ea,ky=l(()=>{"use strict";Gt();ea=e=>{let t=e.begin??hi,r=e.end??Si,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let u=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:u,changed:u!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var xF,pre,IF,WF=l(()=>{"use strict";xF=m(require("node:path"));ky();Gt();ro();pre=["On the first user message of a session, call the Agent Witch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),IF=e=>{let t=xF.default.join(e.io.homedir(),sj),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=ea({existing:r,blockBody:pre,begin:hi,end:Si});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Ge({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var OF,MF,jF=l(()=>{"use strict";OF=m(require("node:path"));ky();Gt();ro();MF=e=>{let t=OF.default.join(e.io.homedir(),nj),r=Sg.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${Xl}]`,`command = "${Zl}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=ea({existing:n,blockBody:o,begin:hi,end:Si});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=Ge({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var NF,eT,DF,HF=l(()=>{"use strict";NF=m(require("node:path"));Gt();ro();eT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),DF=e=>{let t=NF.default.join(e.io.homedir(),oj),r={command:Zl,args:[...Sg]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));eT(d)&&(o={...d})}catch{o={}}let n=eT(o.mcpServers)?{...o.mcpServers}:{},s=n[Xl];if(eT(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[Xl]=r;let a={...o,mcpServers:n},{backupPath:c}=Ge({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var ta,tT=l(()=>{"use strict";nd();LF();WF();jF();HF();ta=e=>{let t=e?.io??Zi();return{ok:!0,cursorMcp:DF({io:t}),codexConfig:MF({io:t}),codexAgents:IF({io:t}),claudeHook:CF({io:t})}}});var FF,$F=l(()=>{"use strict";Gt();FF=e=>{let t=["On the first user message of a session, call the Agent Witch MCP tool","`check_context` with this folder's cwd.",`projectId: ${e}`,"If status is miss or none (already declined), stay silent.","If status is hit, follow the tip. Do not dump large context."].join(`
`);return["---","description: Agent Witch check_context (token-saver)","alwaysApply: true","---","",Pi,t,Yl,""].join(`
`)}});var zF,mre,UF,BF=l(()=>{"use strict";zF=m(require("node:path"));$F();Gt();ky();ro();mre=e=>e.slice(e.indexOf(Pi)+Pi.length,e.indexOf(Yl)).trim(),UF=e=>{let t=zF.default.join(e.projectRoot,hg),r=FF(e.projectId);if(!e.fs.exists(t))return Ge({fs:e.fs,filePath:t,contents:r}),{ok:!0,path:t,wrote:!0};let{next:o,changed:n}=ea({existing:e.fs.readUtf8(t),blockBody:mre(r),begin:Pi,end:Yl});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Ge({fs:e.fs,filePath:t,contents:o,backup:!0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var oT,rT,GF,VF=l(()=>{"use strict";oT=m(require("node:path"));ro();rT="# agent-witch-token-saver (local; never commit)",GF=e=>{let t=oT.default.join(e.repoRoot,".git");if(!e.fs.exists(t))return{ok:!1,reason:"not a git working tree"};let r=oT.default.join(t,"info","exclude"),o=e.fs.exists(r)?e.fs.readUtf8(r):"",n=o.length>0?o.split(/\r?\n/):[],s=new Set(n.map(c=>c.trim())),i=e.relativePaths.filter(c=>!s.has(c));if(i.length===0&&s.has(rT))return{ok:!0,path:r,wrote:!1};let a=[...n];for(;a.length>0&&a[a.length-1]==="";)a.pop();s.has(rT)||a.push("",rT);for(let c of i)a.push(c);return a.push(""),Ge({fs:e.fs,filePath:r,contents:a.join(`
`)}),{ok:!0,path:r,wrote:i.length>0}}});var wy,nT=l(()=>{"use strict";Gt();BF();VF();wy=e=>{let t=UF({fs:e.fs,projectRoot:e.projectRoot,projectId:e.projectId}),r=GF({fs:e.fs,repoRoot:e.projectRoot,relativePaths:[hg]});return{ok:!0,cursorRule:t,gitExclude:r}}});var sT,iT,Ty,aT,lT=l(()=>{"use strict";sT=["pitfalls","preflight","localMcp","history","ollama","skillGen"],iT=["on","off","degraded","unavailable"],Ty={pitfalls:"on",preflight:"on",localMcp:"on",history:"off",ollama:"off",skillGen:"off"},aT=()=>({...Ty})});var gre,fre,cT,KF=l(()=>{"use strict";lT();gre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),fre=e=>iT.find(t=>t===e)??null,cT=e=>{if(!gre(e))return null;let t={...Ty};for(let r of sT){let o=fre(e[r]);o!==null&&(t[r]=o)}return t}});var qF=l(()=>{"use strict";lT();KF()});var JF,yre,hre,YF,XF=l(()=>{"use strict";JF=m(require("node:path"));Wt();qF();ro();yre="token-saver.json",hre=(e,t)=>{if(!e.exists(t))return null;try{return cT(JSON.parse(e.readUtf8(t)))}catch{return null}},YF=e=>{let t=JF.default.join(e.projectRoot,$l,yre),r=e.flags??{...aT(),...hre(e.fs,t)},o=`${JSON.stringify(r,null,2)}
`;return e.fs.exists(t)&&e.fs.readUtf8(t)===o?{ok:!0,path:t,wrote:!1}:(Ge({fs:e.fs,filePath:t,contents:o}),{ok:!0,path:t,wrote:!0})}});var oo,Er,Ey,dT=l(()=>{"use strict";oo=(e,t)=>{if(t==="remove")return{ok:!0,state:"Connected"};switch(e){case"Unconnected":return t==="connect"?{ok:!0,state:"SigningIn"}:Er(e,t);case"SigningIn":return t==="signInComplete"?{ok:!0,state:"Connected"}:Er(e,t);case"Connected":return t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Er(e,t);case"GlobalTriggersWritten":return t==="decline"?{ok:!0,state:"Declined"}:t==="accept"?{ok:!0,state:"ProjectResolved"}:t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Er(e,t);case"Declined":return t==="clearDecline"?{ok:!0,state:"GlobalTriggersWritten"}:Er(e,t);case"ProjectResolved":return t==="applyDefaults"?{ok:!0,state:"DefaultsApplied"}:Er(e,t);case"DefaultsApplied":return t==="writeProjectFragments"?{ok:!0,state:"ProjectFragmentsWritten"}:Er(e,t);case"ProjectFragmentsWritten":return t==="verify"?{ok:!0,state:"Verified"}:Er(e,t);case"Verified":return t==="accept"||t==="writeProjectFragments"?{ok:!0,state:e}:Er(e,t);default:return Er(e,t)}},Er=(e,t)=>({ok:!1,reason:`Illegal transition ${e} + ${t}`,state:e}),Ey=e=>e==="Declined"});var Sre,Pre,ZF,QF=l(()=>{"use strict";XF();nd();hy();dT();tT();nT();Sre="projectId required on accept",Pre=e=>{let t=e.projectId;if(e.resolveProject!==void 0)try{t=e.resolveProject(e.cwd).projectId}catch(o){return{ok:!1,reason:`project resolve failed: ${o instanceof Error?o.message:String(o)}`}}let r=t?.trim()??"";return r.length>0?{ok:!0,projectId:r}:{ok:!1,reason:Sre}},ZF=e=>{let t=e.fs??to(),r=e.io??Zi(),o=e.fromState??"GlobalTriggersWritten";if(!e.accept){let d=oo(o,"decline");return d.ok?(fy({layout:e.layout,cwd:e.cwd,fs:t}),{ok:!0,state:"Declined"}):{ok:!1,state:d.state,reason:d.reason}}let n=Ey(o)||Qi({layout:e.layout,cwd:e.cwd,fs:t});n&&(o="Declined");let s=Pre(e);if(!s.ok)return{ok:!1,state:o,reason:s.reason};if(n){let d=oo(o,"clearDecline");if(!d.ok)return{ok:!1,state:d.state,reason:d.reason};yy({layout:e.layout,cwd:e.cwd,fs:t}),o=d.state}ta({io:r}),o=oo(o,"writeGlobalTriggers").ok?"GlobalTriggersWritten":o;let i=oo(o,"accept");if(!i.ok)return{ok:!1,state:i.state,reason:i.reason};o=i.state;let a=oo(o,"applyDefaults");if(!a.ok)return{ok:!1,state:a.state,reason:a.reason};YF({fs:t,projectRoot:e.cwd}),o=a.state;let c=oo(o,"writeProjectFragments");return c.ok?(wy({fs:t,projectRoot:e.cwd,projectId:s.projectId}),{ok:!0,state:c.state,projectId:s.projectId}):{ok:!1,state:c.state,reason:c.reason}}});var e$={};St(e$,{AWL_CHECK_CONTEXT_TOOL:()=>py,checkContext:()=>uy,clearProjectDecline:()=>yy,createCheckContextRunner:()=>Xo,createNodeCliIo:()=>Zi,createPitfallRegistry:()=>ls,createTempCliIo:()=>SF,declineProjectForCwd:()=>fy,isDeclinedCwd:()=>Qi,isDeclinedTerminal:()=>Ey,listBundledSeedPitfalls:()=>dy,matchPitfallsByKeywords:()=>ly,readDeclinedProjectsStore:()=>sd,resolveTokenSaverDbPath:()=>Xi,runCheckContextHook:()=>Ay,runCheckContextHookCli:()=>TF,runSetupProject:()=>ZF,shadowPitfalls:()=>oy,transitionSetupProject:()=>oo,tryHandleTokenSaverLocalRequest:()=>by,writeGlobalTriggers:()=>ta,writeProjectFragments:()=>wy});var id=l(()=>{"use strict";qw();Vw();zw();ny();Kw();Jw();fF();Py();Qw();EF();RF();tT();nT();QF();hy();dT();nd()});var uT,t$=l(()=>{"use strict";uT=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var r$,o$,Are,bre,_re,Ry,pT=l(()=>{"use strict";id();kg();t$();r$=e=>{try{return e.dbPath!==void 0?ls({dbPath:e.dbPath}):e.layout!==void 0?(Xi(e.layout),ls({layout:e.layout})):null}catch{return null}},o$=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},Are=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},bre=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},_re=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=r$(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(Are(n,r,i.items),{ok:!0,items:o$(n,r,o.includeRetired).map(uT),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:o$(n,r,o.includeRetired).map(uT),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=r$(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:bre(s.error)}finally{n.close()}}}},Ry=_re});var Wt=l(()=>{"use strict";qi();Ki();UD();Uo();mf();BD();Wo();eH();rH();mH();Kf();Nc();gH();kH();wH();TH();EH();vH();CH();LH();xH();uw();cw();Xr();pT()});var vy,ad,n$,mT,cs,gT=l(()=>{"use strict";vy=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},ad=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=vy(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},n$=e=>e>=1&&e<=5,mT=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return vy(t,"UTC")},cs=e=>{let t=e.from??new Date,r=vy(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return ad(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=ad(r,e.timeZone,o,0),s=vy(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?ad(mT(r),e.timeZone,o,0):n;if(!i&&n$(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=mT(a),n$(a.weekday))return ad(a,e.timeZone,o,0);return ad(mT(r),e.timeZone,o,0)}});var s$,fT,no,yT=l(()=>{"use strict";s$=require("node:crypto");ee();Wt();gT();zf();fT=!1,no=async e=>{if(fT)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let r=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let o=$f(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this computer."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};fT=!0;let n=(0,s$.randomUUID)();try{let s=await Hi(t,"claude-cli",o.prompt);await aw(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=cs({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Ff(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{fT=!1}}});var Cy,i$=l(()=>{"use strict";ee();yT();zf();Cy=async()=>{let e=$();if(e===null)return;let t=Yt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await no(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var ld=l(()=>{"use strict";zf();i$();yT();gT()});var a$=l(()=>{"use strict";ld()});var l$=l(()=>{"use strict";tw()});var c$=l(()=>{"use strict";l$()});var hT=l(()=>{"use strict";ld()});var kre,wre,cd,ST=l(()=>{"use strict";a$();c$();hT();Xe();kre=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),wre=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??cs({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??cs({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},cd=e=>{let t=kre(e.profileEmail),r=Yt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Vi(s);return i!==null?[wre(i,o.get(i.id))]:[]});return Hf(t,n),{ok:!0,writtenCount:n.length}}});var PT=l(()=>{"use strict";ld()});var d$=l(()=>{"use strict";ee()});var u$=l(()=>{"use strict";ST();PT();hT();d$()});var p$,dd,ud,pd,m$=l(()=>{"use strict";p$=m(require("node:os"));u$();Gc();Vc();dd=e=>{if(!Yr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!rs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=cd({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},ud=async e=>{if(!Yr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:rs(t)?no(r):{ok:!1,errorMessage:"appOrigin is not an allowed Agent Witch site."}},pd=()=>{let e=$(),t=e!==null?Yt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:p$.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var AT=l(()=>{"use strict";m$()});var Ly=l(()=>{"use strict";ae()});var xy=l(()=>{"use strict";ae()});var Iy,f$,y$,g$,Tre,Ere,ra,bT=l(()=>{"use strict";Iy=m(require("node:fs")),f$=m(require("node:os")),y$=m(require("node:path"));Ly();xy();Lc();Xe();g$=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},Tre=e=>y$.default.join(f$.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Ere=async e=>Iy.default.existsSync(Tre(e))?(await Ye(e)).ok:!1,ra=async(e=v())=>{let t=Iy.default.existsSync(of(e)),r=!Iy.default.existsSync(fr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Cc(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await g$(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ye(e)}-wake`;await Ere(i)&&s.push(i);for(let c of ue(e))(await Ye(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await g$(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var h$=l(()=>{"use strict";ae()});var _T=l(()=>{"use strict";qn();ae()});var kT=l(()=>{"use strict";qn()});var wT=l(()=>{"use strict";ae()});var P$,S$,md,TT=l(()=>{"use strict";P$=m(require("node:fs"));At();Ly();xy();Xe();S$=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},md=async(e=v())=>{if(!P$.default.existsSync(fr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await S$())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ue(e))(await Ye(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await S$();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var A$=l(()=>{"use strict";ae()});var b$,ds,ET,Rre,vre,Cre,_$,Lre,k$,oa,Wy=l(()=>{"use strict";b$=require("node:crypto"),ds=m(require("node:fs")),ET=m(require("node:path"));Xe();Rre="watchdog-log.ndjson",vre=200,Cre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_$=(e=v())=>{let t=N(),r=t.installDir===e?t.logsDir:Ln({installDir:e,profileEmail:t.profileEmail});return ET.default.join(r,Rre)},Lre=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Cre(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},k$=(e,t=v())=>{let r={id:(0,b$.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=_$(t);ds.default.mkdirSync(ET.default.dirname(o),{recursive:!0});let n=ds.default.existsSync(o)?ds.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-vre+1)),JSON.stringify(r)];return ds.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},oa=(e=20,t=v())=>{let r=_$(t);if(!ds.default.existsSync(r))return[];let o=ds.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=Lre(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var RT,vT,CT,LT=l(()=>{"use strict";He();RT=gl.watchdogReinstallState,vT=900*1e3,CT=3e3});var w$=l(()=>{"use strict";LT()});var T$={};St(T$,{verifyAgentWitchReviveAfterKickstart:()=>Ire});var xre,Ire,E$=l(()=>{"use strict";w$();kT();wT();Xe();xre=e=>new Promise(t=>{setTimeout(t,e)}),Ire=async e=>{if(await xre(e.verifyDelayMs??CT),!await Wn(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=Ce(r);return!ze(o,e.staleAfterMs)}});var gd,xT,Wre,R$,v$,IT,WT,OT=l(()=>{"use strict";gd=m(require("node:fs")),xT=m(require("node:path"));G();LT();Wre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),R$=e=>xT.default.join(e,RT),v$=(e=v())=>{let t=R$(e);if(!gd.default.existsSync(t))return null;try{let r=JSON.parse(gd.default.readFileSync(t,"utf8"));return!Wre(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},IT=(e=v(),t=Date.now())=>{let r=v$(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=vT:!0},WT=(e=v(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=R$(e);return gd.default.mkdirSync(xT.default.dirname(o),{recursive:!0}),gd.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var MT,C$=l(()=>{"use strict";ae();OT();MT=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!IT())return{attempted:!1,ok:!1,targets:e};WT();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ye(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var L$=l(()=>{"use strict";OT();C$()});var jT=l(()=>{"use strict";Pr()});var x$=l(()=>{"use strict";Pr()});var I$,na,W$,O$,M$,Ore,Mre,j$,jre,Nre,N$,D$=l(()=>{"use strict";I$=require("node:child_process"),na=m(require("node:fs")),W$=m(require("node:os")),O$=m(require("node:path")),M$=require("node:util");jT();x$();Xe();Ore=(0,M$.promisify)(I$.execFile),Mre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),j$=e=>{let t=Je(e),r=t===null?N():N(t);if(!na.default.existsSync(r.configPath))return null;try{let o=JSON.parse(na.default.readFileSync(r.configPath,"utf8"));return!Mre(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},jre=e=>j$(e)?.wsUrl??null,Nre=e=>{let t=jre(e);return t!==null?$e(t):Fe(e)?.appOrigin??null},N$=async e=>{let t=e?.installDir??v(),r=j$(t),o=r!==null?$e(r.wsUrl):Nre(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=O$.default.join(W$.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{na.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Je(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await Ore("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"Agent Witch reinstall script failed."}}finally{na.default.existsSync(i)&&na.default.unlinkSync(i)}}});var H$={};St(H$,{attemptAgentWitchWatchdogReinstall:()=>Dre});var Dre,F$=l(()=>{"use strict";L$();D$();Dre=async e=>MT(e,()=>N$())});var $$,z$,U$,Hre,Fre,$re,fd,NT=l(()=>{"use strict";h$();_T();kT();wT();TT();bT();Ly();xy();Xe();Ri();A$();Wy();$$=e=>e===null?N():N(e),z$=async(e,t,r)=>{if(!await Wn(e))return"not_running";let n=$$(t);if(Kt(n))return"healthy";let s=Ce(n);return ze(s,r)?"stale_connection":"healthy"},U$=async e=>{let t=e?.staleAfterMs??12e4,r=v(),o=ue(r);return Promise.all(o.map(async n=>{let s=await z$(n.launchAgentLabel,n.profileEmail,t),i=$$(n.profileEmail),a=Ce(i),c=await Wn(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:ze(a,t),needsRevive:s!=="healthy",reason:s}}))},Hre=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled Agent Witch from install script and retried kickstart.":t.reinstallErrorMessage??"Agent Witch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All Agent Witch WebSocket connections are healthy."},Fre=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",$re=async e=>{let t=await Ye(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(E$(),T$)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},fd=async e=>{if(!Ut())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=v();await ra(r),await md(r);let o=ue(r),n=[];for(let u of o){let g=await z$(u.launchAgentLabel,u.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:g});continue}n.push(await $re({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let u=xn();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(F$(),H$)),g=await u(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&k$({event:Fre(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Hre(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var B$,Oy,G$=l(()=>{"use strict";B$=m(require("node:os"));_T();Wy();NT();Oy=async()=>{let e=await U$(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:B$.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:oa(1)[0]??null}}});var DT=l(()=>{"use strict";bT();NT();G$();Wy()});var yd,hd,Sd,V$=l(()=>{"use strict";ae();DT();yd=async()=>{await ra();let e=ue(),t=[];for(let r of e){let o=await Ye(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=xn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},hd=fd,Sd=fd});var HT=l(()=>{"use strict";V$()});var jy,My,K$,FT,q$,zre,Ure,Bre,Gre,Vre,Ny,J$=l(()=>{"use strict";jy=require("node:child_process"),My=m(require("node:fs")),K$=m(require("node:os")),FT=m(require("node:path")),q$=require("node:util");ae();G();In();zre=(0,q$.promisify)(jy.execFile),Ure=()=>FT.default.join(K$.default.homedir(),"Library","LaunchAgents"),Bre=async e=>{if(!Lt())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await zre("launchctl",["bootout",r]).catch(()=>{})},Gre=e=>{let t=FT.default.join(Ure(),`${e}.plist`);My.default.existsSync(t)&&My.default.unlinkSync(t)},Vre=e=>{(0,jy.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Ny=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=v();if(!My.default.existsSync(e))return{ok:!1,message:"No local Agent Witch install directory was found.",removedLaunchAgentLabels:[]};let t=Ur(e);for(let r of t)await Bre(r),Gre(r);return Vre(e),{ok:!0,message:"Local Agent Witch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var Y$,Dy,X$,sa,Z$,Kre,qre,Jre,$T,Yre,zT,Q$=l(()=>{"use strict";Y$=require("node:child_process"),Dy=m(require("node:fs")),X$=m(require("node:os")),sa=m(require("node:path")),Z$=require("node:util");ae();In();Kre=(0,Z$.promisify)(Y$.execFile),qre=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],Jre=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],$T=e=>{Dy.default.existsSync(e)&&Dy.default.rmSync(e,{force:!0})},Yre=async e=>{if(!Lt())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await Kre("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},zT=async e=>{let r=(e.listLaunchAgentLabels??Ur)(e.layout.installDir),o=e.launchAgentsDir??sa.default.join(X$.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??Yre;for(let i of r)await n(i),$T(sa.default.join(o,`${i}.plist`));let s=sa.default.dirname(e.layout.configPath);for(let i of qre)$T(sa.default.join(s,i));for(let i of Jre)$T(sa.default.join(e.layout.installDir,i));return Dy.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var UT,ez=l(()=>{"use strict";UT="unknown_identity"});var BT=l(()=>{"use strict";Lw();ez()});var Xre,GT,tz=l(()=>{"use strict";BT();Xre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GT=e=>e.type!=="system.error"||!Xre(e.payload)?!1:e.payload.errorCode===UT});var VT=l(()=>{"use strict";J$();Q$();tz()});var Hy=l(()=>{"use strict";ae();Pr();VT();DT()});var ia,Fy,$y=l(()=>{"use strict";Hy();ia=(e=20)=>oa(e),Fy=Oy});var zy,aa,Uy,By=l(()=>{"use strict";Hy();zy=Vn,aa=(e=20)=>Un(e),Uy=e=>Gn(e)});var Gy,KT=l(()=>{"use strict";Hy();Gy=()=>Ny()});var rz=l(()=>{"use strict";pk();ew();AT();HT();$y();By();KT()});var oz={};St(oz,{buildAgentWitchAutomationStatusFromWakeServer:()=>pd,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>zy,buildAgentWitchWakeHealthResponse:()=>Ic,buildAgentWitchWakeIdentityResponse:()=>Wc,buildAgentWitchWatchdogStatus:()=>Fy,installHarnessFromWakeServer:()=>Kc,readAgentWitchSelfUpdateLogEntries:()=>aa,readAgentWitchWatchdogLogEntries:()=>ia,restartAgentWitchFromWakeServer:()=>Sd,reviveAgentWitchWebSocketFromWakeServer:()=>hd,runAgentWitchSelfUpdateFromWakeServer:()=>Uy,runAgentWitchUninstallLocalFromWakeServer:()=>Gy,runAutomationFromWakeServer:()=>ud,syncAutomationsFromWakeServer:()=>dd,wakeAgentWitchLaunchAgents:()=>yd});var nz=l(()=>{"use strict";rz()});var sz,iz,qT,JT,az=l(()=>{"use strict";sz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),iz=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?sz(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?sz(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},qT=e=>{let t=e.watchdogLogs.map(iz).join(""),r=e.updateLogs.map(iz).join("");return`<!doctype html>
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
</html>`},JT=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var lz,cz,dz=l(()=>{"use strict";lz=m(require("node:net")),cz=()=>new Promise((e,t)=>{let r=lz.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var uz,Zre,Qre,YT,pz=l(()=>{"use strict";uz=m(require("node:net"));ae();dz();xc();Lc();Xe();Zre=e=>new Promise(t=>{let r=uz.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),Qre=e=>new Promise(t=>{setTimeout(t,e)}),YT=async(e={})=>{let t=v(),r=Jt(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await Zre(r))return gN(r),r;i<o&&await Qre(n)}let s=await cz();nf(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{Fl({launchAgentPrefix:ye(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var eoe,XT,mz=l(()=>{"use strict";eoe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),XT=e=>({force:eoe(e)&&e.force===!0})});var Pd=l(()=>{"use strict";Gc();az();pz();mz();Mb();fg();Nn()});var ZT,U,QT,eE,Ad,gz=l(()=>{"use strict";ZT=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},U=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},QT=e=>{e.writeHead(403),e.end()},eE=e=>e.url?.split("?")[0]??"/",Ad=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Zt=l(()=>{"use strict";gz()});var toe,fz,yz=l(()=>{"use strict";AT();Zt();toe=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},fz=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return U(e.response,200,pd(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await toe(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=dd(t);return U(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await ud(t);return U(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var roe,Sz,hz,Pz,tE,Az,rE=l(()=>{"use strict";roe=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],Sz=e=>/embed|minilm|^bge-/i.test(e),hz=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),Pz=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),tE=e=>e.filter(t=>t.trim().length>0&&!Sz(t)),Az=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!Sz(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>hz(s,o));if(n!==void 0)return n}for(let n of roe){let s=r.find(i=>hz(i,n));if(s!==void 0)return s}return r[0]??null}});var oE,kz,wz,Vy,Tz,bz,_z,ooe,noe,soe,ioe,aoe,loe,Qt,bd=l(()=>{"use strict";oE=require("node:child_process"),kz=m(require("node:fs")),wz=m(require("node:os")),Vy=m(require("node:path"));Pr();qt();rE();Tz=3e3,bz=["claude-cli","codex","cursor","antigravity"],_z={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},ooe=(e,t)=>new Promise(r=>{let o=(0,oE.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Tz);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),noe=()=>{let e=wz.default.homedir();return["ollama",Vy.default.join(e,".local","bin","ollama"),Vy.default.join(e,".agent-witch","ollama","ollama"),Vy.default.join(e,".local-agent-witch","ollama","ollama")]},soe=e=>new Promise(t=>{let r=(0,oE.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Tz);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(Pz(Buffer.concat(o).toString("utf8")))})}),ioe=async()=>{for(let e of noe()){if(e!=="ollama"&&!kz.default.existsSync(e))continue;let t=await soe(e);if(t!==null)return t}return[]},aoe=e=>{let t=e.installedWriterIds.map(s=>_z[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=we(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${_z[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},loe=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:vi},Qt=async e=>{let t=bz.map(i=>{let a=Ug(i,e.commands);return ooe(a.command,a.args)}),[r,...o]=await Promise.all([ioe(),...t]),n=bz.flatMap((i,a)=>o[a]===!0?[i]:[]),s=Az(r,loe());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:aoe({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var coe,doe,nE,Ez=l(()=>{"use strict";coe="http://127.0.0.1:11434",doe=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},nE=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||coe;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?doe(await o.json()):null}catch{return null}}});var sE=l(()=>{"use strict";qt();bd();Ez();rE()});var uoe,Rz,vz=l(()=>{"use strict";sE();uoe={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},Rz=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:uoe[t]})),ollamaModels:tE(e.ollamaModels)})});var poe,Cz,Lz=l(()=>{"use strict";sE();Zt();vz();poe=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Cz=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Qt({commands:Te({})});return U(e.response,200,{ok:!0,...Rz({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await poe(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await nE({model:r,prompt:o});return n===null?(U(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(U(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var moe,xz,Iz=l(()=>{"use strict";ew();Zt();moe=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},xz=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await moe(e);if(t===null)return!0;let r=Kc(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Wz=l(()=>{"use strict";Wt()});var iE,Oz=l(()=>{"use strict";Wz();Vc();iE=e=>{if(!Yr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:it({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Mz,aE,lE=l(()=>{"use strict";ee();Wt();Vc();Mz=e=>{if(!Yr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},aE=async e=>{let t=Mz(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=qo("Choose a folder for this Agent Witch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"Agent Witch is not configured on this computer."};let n=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve Agent Witch cloud connection."}:(it({projectFolderPath:r}),await Qc(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to Agent Witch Cloud."})}});var jz=l(()=>{"use strict";Oz();lE()});var Nz,Dz=l(()=>{"use strict";jz();lE();Zt();Nz=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=iE(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await aE(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return U(e.response,o,r,e.cors.headers),!0}return!1}});var Hz,Fz=l(()=>{"use strict";Pd();By();$y();Hz=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=ia(50),r=aa(50);return e.response.writeHead(200,JT()),e.response.end(qT({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var $z,zz=l(()=>{"use strict";pk();Zt();$z=e=>e.request.method==="GET"&&e.pathname==="/health"?(U(e.response,200,Ic(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(U(e.response,200,Wc(),e.cors.headers),!0):!1});var Uz,Bz=l(()=>{"use strict";KT();Zt();Uz=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Gy();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}});var Gz,Vz=l(()=>{"use strict";HT();Zt();Gz=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await hd();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Sd();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await yd();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var Kz,qz=l(()=>{"use strict";Pd();By();Zt();Kz=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=zy();return U(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Ad(e.request,"/update/logs",20,200);return U(e.response,200,{ok:!0,logs:aa(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=XT(t),o=await Uy({force:r});return U(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var Jz,Yz=l(()=>{"use strict";$y();Zt();Jz=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await Fy();return U(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Ad(e.request,"/watchdog/logs",20,200);return U(e.response,200,{ok:!0,logs:ia(t)},e.cors.headers),!0}return!1}});var Xz,Zz=l(()=>{"use strict";yz();Lz();Iz();Dz();Fz();zz();Bz();Vz();qz();Yz();Xz=[$z,Hz,Jz,Gz,Kz,Uz,xz,Nz,fz,Cz]});var Qz,eU=l(()=>{"use strict";Zz();Qz=async e=>{for(let t of Xz)if(await t(e))return!0;return!1}});var goe,tU,rU=l(()=>{"use strict";Gc();Zt();eU();goe=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:eE(e),readJsonBody:()=>ZT(e)}),tU=async(e,t,r)=>{let o=e.headers.origin,n=jf(o);try{if(o!==void 0&&o.length>0&&!n.allowed){QT(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=goe(e,t,r,n);if(await Qz(s))return;U(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{U(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var oU,us,Ky,qy=l(()=>{"use strict";oU=m(require("node:http"));Pd();rU();us=async()=>{let e=await YT(),t=oU.default.createServer((r,o)=>{tU(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`Agent Witch wake server listening on http://127.0.0.1:${e}
`),t},Ky=us});var nU={};St(nU,{runAgentWitchBridgeCli:()=>foe});var foe,sU=l(()=>{"use strict";ae();qy();foe=async()=>{bt("agent-witch-bridge");let e=await us(),t=Gr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var iU=l(()=>{"use strict";At()});var la,cE,aU=l(()=>{"use strict";la=(e,t,r)=>e===1?t:r,cE=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${la(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${la(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${la(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${la(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${la(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${la(u,"year","years")} ago`}});var ps,dE,yoe,hoe,uE,Zo,_d,pE,lU=l(()=>{"use strict";ps=m(require("node:fs")),dE=m(require("node:path")),yoe="local-ws-traffic.ndjson",hoe=500,uE=e=>dE.default.join(e.logsDir,yoe),Zo=(e,t)=>{let r=uE(e);ps.default.mkdirSync(dE.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});ps.default.appendFileSync(r,`${o}
`,"utf8")},_d=(e,t=hoe)=>{let r=uE(e);if(!ps.default.existsSync(r))return[];let n=ps.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},pE=e=>{let t=uE(e);ps.default.existsSync(t)&&ps.default.writeFileSync(t,"","utf8")}});var Soe,cU,dU,uU=l(()=>{"use strict";BT();Soe=new Set(Object.values(Xf)),cU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),dU=e=>{if(!cU(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!Soe.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!cU(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var pU,mU=l(()=>{"use strict";pU=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Poe,Aoe,boe,kd,gU=l(()=>{"use strict";mU();Poe=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,Aoe=e=>Poe.test(e),boe=e=>pU(e),kd=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>kd(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&Aoe(o)){r[o]=boe(n);continue}r[o]=kd(n)}return r}});var Rr,mE,_oe,koe,woe,gE,fU,yU,hU,Toe,Jy,ms,Yy,fE,SU=l(()=>{"use strict";Rr=m(require("node:fs")),mE=m(require("node:path"));uU();gU();_oe="local-ws-trace.ndjson",koe=1e4,woe=1440*60*1e3,gE=e=>mE.default.join(e.logsDir,_oe),fU=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},yU=e=>{if(!Rr.default.existsSync(e))return;let t=Rr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-woe,n=t.filter(s=>{let i=fU(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-koe);Rr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},hU=(e,t)=>{let r=gE(e);Rr.default.mkdirSync(mE.default.dirname(r),{recursive:!0}),Rr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),yU(r)},Toe=e=>e.parsed===null?{_empty:!0}:kd(e.parsed),Jy=(e,t,r)=>{let o=dU(r);hU(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Toe(o)})},ms=(e,t)=>{hU(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:kd({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Yy=(e,t=80)=>{let r=gE(e);if(yU(r),!Rr.default.existsSync(r))return[];let o=Rr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=fU(s);i!==null&&n.push(i)}return n.reverse()},fE=e=>{let t=gE(e);Rr.default.existsSync(t)&&Rr.default.writeFileSync(t,"","utf8")}});var Qo,PU,Eoe,yE,Xy,AU=l(()=>{"use strict";Qo=m(require("node:fs")),PU=m(require("node:path")),Eoe=256e3,yE=e=>{Qo.default.mkdirSync(PU.default.dirname(e),{recursive:!0}),Qo.default.writeFileSync(e,"","utf8")},Xy=(e,t=Eoe)=>{if(!Qo.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Qo.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Qo.default.openSync(e,"r");try{Qo.default.readSync(a,i,0,s,n)}finally{Qo.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var wd=l(()=>{"use strict";lU();SU();AU()});var hE,SE,bU=l(()=>{"use strict";hE=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SE=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${hE(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${hE(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the Agent Witch client stderr log on this computer (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${hE(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var _U=l(()=>{"use strict";bU()});var PE,AE=l(()=>{"use strict";PE=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var bE=l(()=>{"use strict";mc()});var _E,kE,kU=l(()=>{"use strict";bE();_E=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},kE=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var wU=l(()=>{"use strict";AE();kU()});var TU,Td,wE,Ed=l(()=>{"use strict";AE();TU=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Td=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=TU(e),r=TU(PE(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},wE=`(function () {
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
})();`});var gs,Roe,TE,EU=l(()=>{"use strict";gs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Roe=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},TE=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${gs(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?gs(r.direction):gs(r.kind),i=`trace-body-${o}`,a=gs(Roe(r.body));return`<tr>
        <td title="${gs(r.at)}">${gs(r.at.slice(11,19))}</td>
        <td>${s}</td>
        <td><code>${gs(r.command)}</code></td>
        <td>${n}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-compact" onclick="const el=document.getElementById('${i}'); if(el){el.hidden=!el.hidden;}">body</button>
          <pre id="${i}" class="trace-body-pre" hidden>${a}</pre>
        </td>
      </tr>`}).join("")}</tbody>
        </table>
      </div>
    </section>`});var RU,voe,Zy,Coe,EE,vU=l(()=>{"use strict";Al();He();At();RU=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},voe=e=>RU(e)===$r?oi:ri,Zy=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Coe=(e,t)=>`${t?`<h3>${Zy(e.label)}</h3>`:""}
    <p class="muted">${Zy(e.instructions)}</p>
    <pre class="sdlc-pre mono">${Zy(e.command)}</pre>
    <p class="muted">${Zy(e.note)}</p>`,EE=e=>{let t=Pl({platform:En(e.platform),installDirName:RU(e.installDir),launchAgentPrefix:voe(e.installDir)}),r=t.length>1;return`<section class="card">
    <p class="eyebrow">Agent Witch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if Agent Witch Cloud cannot open Status, restart the Agent Witch client on this computer.</p>${r?`
    <p class="muted">Use the command for this computer's operating system.</p>`:""}
    ${t.map(n=>Coe(n,r)).join(`
    `)}
  </section>`}});var RE,CU=l(()=>{"use strict";Al();RE=e=>En(e)==="mac"?"Revive requested. The bridge will reconnect if this Mac can reach launchd.":"Revive requested. The bridge will reconnect when this computer can reach Agent Witch Cloud."});var LU=l(()=>{"use strict";Ed();EU();vU();CU();Ed()});var Loe,so,Rd=l(()=>{"use strict";Loe=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),so=Loe});var xU,IU,WU,OU,MU,jU,NU,ca=l(()=>{"use strict";xU="projects",IU="knowledge",WU="chunks.ndjson",OU="lessons.ndjson",MU="error-chunks.ndjson",jU="usage-stats.json",NU="knowledge-location.json"});var Qy,xoe,eh,vE=l(()=>{"use strict";Qy=m(require("node:path"));ca();xoe=(e,t)=>{let r=t.trim(),o=Qy.default.join(e.installDir,xU,r,IU);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:Qy.default.join(o,WU),memoryRunsFilePath:Qy.default.join(o,OU)}},eh=xoe});var CE,Ioe,DU,HU=l(()=>{"use strict";CE=m(require("node:fs"));ca();es();Ioe=e=>{let t=xt(e.projectFolderPath),r=`${t.metaDirPath}/${NU}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your Agent Witch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};CE.default.mkdirSync(t.metaDirPath,{recursive:!0}),CE.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},DU=Ioe});var da,$U,FU,Woe,zU,UU=l(()=>{"use strict";da=m(require("node:fs")),$U=m(require("node:path"));Wo();es();vE();HU();FU=(e,t)=>{da.default.existsSync(e)&&(da.default.existsSync(t)&&da.default.statSync(t).size>0||(da.default.mkdirSync($U.default.dirname(t),{recursive:!0}),da.default.copyFileSync(e,t)))},Woe=e=>{let t=xt(e.projectFolderPath),r=eh(e.layout,e.projectId),o=`${t.memoryDirPath}/${fi}`;FU(t.ragChunksFilePath,r.ragChunksFilePath),FU(o,r.memoryRunsFilePath),DU({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},zU=Woe});var BU,Ooe,ua,th=l(()=>{"use strict";BU=m(require("node:path"));Wo();es();UU();gw();vE();Ooe=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Uf(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){zU({layout:e.layout,projectFolderPath:t,projectId:o});let s=eh(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=xt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:BU.default.join(n.memoryDirPath,fi),projectId:null}},ua=Ooe});var rh,joe,oh,LE=l(()=>{"use strict";rh=m(require("node:fs"));ca();joe=(e,t=500)=>{if(!rh.default.existsSync(e))return;let r=rh.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);rh.default.writeFileSync(e,`${o.join(`
`)}
`)},oh=joe});var nh,Noe,fs,xE=l(()=>{"use strict";nh=m(require("node:path"));ca();th();Noe=e=>{let t=ua(e);if(t===null)return null;let r=nh.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:nh.default.join(r,jU),errorChunksFilePath:nh.default.join(r,MU)}},fs=Noe});var VU,vd,KU,GU,IE,qU,Foe,WE,JU,OE,ME,jE,NE=l(()=>{"use strict";VU=require("node:crypto"),vd=m(require("node:fs")),KU=m(require("node:path"));Rd();ca();xE();GU=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),IE=e=>{if(!vd.default.existsSync(e))return GU();try{let t=JSON.parse(vd.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return GU()},qU=(e,t)=>{vd.default.mkdirSync(KU.default.dirname(e),{recursive:!0}),vd.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},Foe=e=>{let t=so(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,VU.createHash)("sha256").update(o).digest("hex").slice(0,16)},WE=e=>{let t=fs(e);return t===null?null:IE(t.usageStatsFilePath)},JU=e=>{if(e.chunkIds.length===0)return;let t=fs(e);if(t===null)return;let r=IE(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;qU(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},OE=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=fs(e);if(r===null)return null;let o=Foe(t),n=IE(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return qU(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},ME=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,jE=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Cd,YU,$oe,zoe,XU,Uoe,DE,Ld,pa,HE,ma,FE,$E=l(()=>{"use strict";Cd=m(require("node:fs")),YU=m(require("node:path"));Rd();th();LE();NE();$oe="http://127.0.0.1:11434",zoe="nomic-embed-text",XU=(e,t,r)=>ua({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,Uoe=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},DE=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Ld=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||$oe,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||zoe;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},pa=(e,t,r)=>{let o=XU(e,t,r);if(o===null||!Cd.default.existsSync(o))return[];let n=Cd.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},HE=async e=>{let t=so(e.text),r=DE(t);if(r.length===0)return 0;let o=XU(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Cd.default.mkdirSync(YU.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Ld(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Cd.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return oh(o),n},ma=async e=>{let t=await Ld(e.query);if(t===null)return[];let r=e.minScore??0,s=pa(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:Uoe(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return JU({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},FE=e=>e.length===0?"":`Local knowledge (from this computer):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var xd,ZU,Boe,Goe,zE,UE,BE,QU=l(()=>{"use strict";xd=m(require("node:fs")),ZU=m(require("node:path"));Rd();xE();LE();$E();Boe=e=>{if(!xd.default.existsSync(e))return[];let t=xd.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Goe=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},zE=async e=>{let t=fs(e);if(t===null)return 0;let r=so(e.text),o=DE(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;xd.default.mkdirSync(ZU.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Ld(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};xd.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return oh(n,200),s},UE=async e=>{let t=fs(e);if(t===null)return[];let r=await Ld(e.query);if(r===null)return[];let o=e.minScore??.3;return Boe(t.errorChunksFilePath).map(s=>({chunk:s,score:Goe(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},BE=e=>e.length===0?"":`Past failures on this computer (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var GE=l(()=>{"use strict";$E();NE();QU()});var We,VE,KE=l(()=>{"use strict";Cw();We=vw,VE=`
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

:root {
  color-scheme: light;
  --aw-zinc-50: ${We.gray50};
  --aw-zinc-100: ${We.gray100};
  --aw-zinc-200: ${We.gray200};
  --aw-zinc-400: ${We.gray400};
  --aw-zinc-500: ${We.gray500};
  --aw-zinc-600: ${We.gray600};
  --aw-zinc-700: ${We.gray700};
  --aw-zinc-800: ${We.gray900};
  --aw-zinc-900: ${We.gray900};
  --aw-brand-600: ${We.brand600};
  --aw-brand-700: ${We.brand700};
  --aw-brand-50: ${We.brand50};
  --aw-emerald-50: ${We.success50};
  --aw-emerald-700: ${We.success700};
  --aw-amber-50: ${We.warning50};
  --aw-amber-900: ${We.warning900};
  --aw-red-50: ${We.error50};
  --aw-red-700: ${We.error700};
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
`.trim()});var Voe,Koe,qE,e1,JE,t1=l(()=>{"use strict";KE();Ed();Voe=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,Koe=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],qE=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),e1=(e,t)=>`<a class="${e}" href="/" aria-label="Agent Witch Local home, install bundle ${t}">${Voe}<span class="brand-text">Agent Witch<span class="brand-sub">Local(${t})</span></span></a>`,JE=e=>{let t=Koe.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=qE(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=qE(e.installBundleVersionLabel?.trim()??"unknown"),s=e1("brand brand-in-sidebar",n),i=e1("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${qE(e.title)} \xB7 Agent Witch Local</title>
  <style>${VE}</style>
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
        <a class="btn btn-secondary cloud-open-link" href="${r}" target="_blank" rel="noopener noreferrer" aria-label="Open Agent Witch cloud at ${r}">Open cloud \u2197</a>
      </div>
    </div>
  </header>
  <main class="site-main">${e.prependBody??""}${e.body}</main>
  <script>${wE}</script>
</body>
</html>`}});var sh,Id,ih=l(()=>{"use strict";sh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Id=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${sh(e.syncMessage)}</p>`:"",o=sh(e.manageHref),n=sh(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${sh(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var YE,XE,ZE,r1=l(()=>{"use strict";YE=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,XE=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,ZE=e=>e==="ok"?'<div class="alert-success">Update finished. This computer may restart the Agent Witch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var o1=l(()=>{"use strict";t1();ih();r1()});var ga,QE,n1=l(()=>{"use strict";Ed();ga=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QE=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this computer",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this computer",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${ga(e.wakeError)}</div>`:"",a=Td(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This computer</p>
      <h1>Agent Witch local</h1>
      <p class="lede">Your on-machine control panel: bridge health, harness, run memory, and traffic \u2014 only on this computer.</p>
      <div class="home-hero-badges">
        ${t}
        <span class="muted">Install bundle <code>${ga(e.installBundleVersion)}</code></span>
        <span class="muted">Last heartbeat \xB7 ${a}</span>
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
        <p class="home-card-meta">${ga(r)}</p>
      </a>
      <a class="home-card" href="/knowledge">
        <p class="home-card-eyebrow">Memory</p>
        <h2 class="home-card-title">Knowledge</h2>
        <p class="home-card-lede">Browse and search local RAG chunks written after agent runs on this computer.</p>
        <p class="home-card-meta">${ga(o)}</p>
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
        <p class="home-card-meta">${ga(s)}</p>
      </a>
      <a class="home-card" href="/traffic">
        <p class="home-card-eyebrow">Debug</p>
        <h2 class="home-card-title">Traffic</h2>
        <p class="home-card-lede">See frames sent and received between this computer and the cloud bridge.</p>
        <p class="home-card-meta">${ga(n)}</p>
      </a>
    </div>`}});var s1=l(()=>{"use strict";n1()});var L,fa=l(()=>{"use strict";L=e=>e==="passed"||e==="stopped"||e==="failed"});var i1,eR,ys,tR,ah=l(()=>{"use strict";i1="Stopped at the round limit. The best prompt is kept.",eR="Stopped because the score stopped rising. The best prompt is kept.",ys="Finished. The best prompt is the result.",tR="Wizard ended. Progress from finished steps is kept."});var en,rR=l(()=>{"use strict";en=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var qoe,Joe,Wd,a1,lh=l(()=>{"use strict";qoe=/\n+|;\s+/,Joe=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Wd=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(qoe).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,Joe(s)]},[]);return[...t,...o]},[]),a1=e=>{let t=Wd(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var Se,ya=l(()=>{"use strict";Se=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Od,oR=l(()=>{"use strict";lh();ya();Od=e=>{let t=[...e.priorRounds,e.current],r=Se(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:a1(o)}}});var nR,Yoe,Xoe,ch,sR=l(()=>{"use strict";nR={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},Yoe=e=>{try{let t=JSON.parse(e.fragment);return{...nR,objects:[...e.objects,t]}}catch{return{...nR,objects:e.objects}}},Xoe=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:Yoe(r)},ch=e=>[...e].reduce(Xoe,nR).objects});var Zoe,iR,Qoe,l1,aR=l(()=>{"use strict";sR();Zoe=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},iR=e=>{let t=ch(e).filter(Zoe),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},Qoe=(e,t)=>({...e,passed:e.score>=t}),l1=(e,t)=>{let r=iR(e);return r===null?null:Qoe(r,t)}});var lR,cR,dh=l(()=>{"use strict";lR="The judge reply needs a score and a reason.",cR="The improver reply was empty."});var c1,d1=l(()=>{"use strict";c1=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var u1,p1=l(()=>{"use strict";u1=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var tne,m1,g1=l(()=>{"use strict";d1();p1();ah();lh();tne=e=>{let t=Wd(e);return t.length===0?eR:`${eR} Avoid: ${t.join("; ")}.`},m1=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:i1};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(c1(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:tne(u1(r))}}return null}});var tn,rne,hs,f1,uh=l(()=>{"use strict";tn=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},rne=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,hs=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",rne(e.tokens),`Delay: ${tn(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},f1=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var one,y1,h1=l(()=>{"use strict";aR();one=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,y1=e=>{let r=(one.exec(e)?.[1]??e).trim();return r.length===0||iR(r)!==null?null:r}});var S1,ph,P1=l(()=>{"use strict";uh();h1();dh();S1=e=>({type:"call",role:"judge",choice:e.choice,prompt:f1({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),ph=e=>{let t=y1(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:cR}}:{nextPrompt:t,continuation:S1({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var dR,A1=l(()=>{"use strict";rR();oR();aR();dh();ah();g1();dh();P1();dR=e=>{let t=l1(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:lR}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=m1({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Od({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:en({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Md,uR=l(()=>{"use strict";Md=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var b1=l(()=>{"use strict"});var _1=l(()=>{"use strict";b1()});var Ss,k1=l(()=>{"use strict";Ss=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var nne,pR,w1=l(()=>{"use strict";uh();nne=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,pR=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",nne(e.tokens),`Delay: ${tn(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var sne,ine,ane,mR,T1=l(()=>{"use strict";sne=/[A-Za-z0-9_./~-]{3,180}/g,ine=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,ane=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||ine.test(t)},mR=(e,t=12)=>{let r=[];for(let o of e.matchAll(sne)){let n=o[0].replace(/\.+$/,"");if(!(!ane(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var jd,E1=l(()=>{"use strict";jd=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var mh,gR,R1,Nd,fR=l(()=>{"use strict";mh=e=>Math.floor(e/2),gR=e=>Math.max(mh(e)+1,e-20),R1=(e,t)=>e>=t?"passes":e>=gR(t)?"close":e>=mh(t)?"weak":"bad",Nd=e=>[{band:"bad",label:`0\u2013${mh(e)-1} bad`},{band:"weak",label:`${mh(e)}\u2013${gR(e)-1} weak`},{band:"close",label:`${gR(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var gh,yR=l(()=>{"use strict";fR();gh=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${R1(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var er,hR=l(()=>{"use strict";er=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var v1,C1=l(()=>{"use strict";v1=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var lne,cne,L1,x1=l(()=>{"use strict";fa();yR();hR();C1();lne=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],cne=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",L1=e=>{let t=e.wizard;if(t===void 0)return[];let r=er(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=lne.map((y,P)=>{let h=!s&&!n&&P===r?"active":"done";return{id:`wizard-${P+1}`,label:y,state:h,detail:null}}).filter((y,P)=>s?!0:P<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=gh(e),d=c.filter(y=>y.id==="round-0"),u=v1(t)&&(!n||a)?c.filter(y=>y.id!=="round-0"):[],g=L(e.status)&&!s,f=g?[{id:"end",label:cne(e),state:"done",detail:e.errorMessage}]:[];if(g&&f.length>0){let y=Math.min(r,i.length),P=i.slice(0,y).map(h=>({...h,state:"done"}));return[...d,...P,...f,...u]}return[...d,...i,...u,...f]}});var dne,SR,I1=l(()=>{"use strict";fa();yR();x1();dne=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",SR=e=>{if(e.wizard!==void 0)return L1(e);let t=gh(e),r=L(e.status)?[{id:"end",label:dne(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Dd,W1=l(()=>{"use strict";Dd=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var O1=l(()=>{"use strict";At()});var M1,Hd,Fd,Sa,fh,PR,j1=l(()=>{"use strict";O1();M1="/prompt-optimizer/agent",Hd=`${zr}${M1}`,Fd=`${zr}/prompt-optimizer`,Sa="The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",fh=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${Sa}`,PR="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var vr=l(()=>{"use strict"});var pe,$d=l(()=>{"use strict";vr();pe=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var AR,N1=l(()=>{"use strict";AR="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var D1,H1=l(()=>{"use strict";D1=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var zd,$1=l(()=>{"use strict";H1();vr();zd=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:D1(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var bR,z1=l(()=>{"use strict";vr();bR=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var _R,U1=l(()=>{"use strict";vr();_R=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var B1,Ud,G1=l(()=>{"use strict";B1=["generalize","evaluate","separate","optimize_modules"],Ud=(e,t)=>{let r=B1.indexOf(t);if(r===-1)return e;let o=B1.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var yh,kR=l(()=>{"use strict";lh();yh=e=>{let t=Wd(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Bd,V1=l(()=>{"use strict";kR();Bd=e=>{let t=yh(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var pne,mne,gne,K1,q1=l(()=>{"use strict";pne=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),mne=/^\{\{[a-zA-Z0-9_-]+\}\}$/,gne=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(pne(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},K1=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>mne.test(n)?n:gne(n,r)).join("")}});var wR,J1=l(()=>{"use strict";q1();wR=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:K1(o.prompt,t)}))}))});var fne,Gd,Y1=l(()=>{"use strict";vr();kR();fne=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Gd=e=>{let t=yh(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=fne(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Vd,X1=l(()=>{"use strict";uR();Vd=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Md({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Kd,ER=l(()=>{"use strict";ya();Kd=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=Se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var RR,Z1=l(()=>{"use strict";ER();RR=e=>{let t=Kd({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Ps,Q1=l(()=>{"use strict";Ps=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var yne,hne,ce,hh=l(()=>{"use strict";$d();yne=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},hne=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,ce=e=>{let t=pe(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:yne(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>hne(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var eB,tB=l(()=>{"use strict";$d();hh();eB=e=>{let t=ce(e.wizard),r=pe(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var vR,rB=l(()=>{"use strict";tB();vR=e=>{let t=eB({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var Sne,oB,nB=l(()=>{"use strict";Sne=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},oB=e=>[...e].reduce(Sne,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var Pne,sB,iB=l(()=>{"use strict";Pne=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},sB=e=>[...e].reduce(Pne,{out:"",inString:!1,escaped:!1}).out});var Ane,bne,aB,lB=l(()=>{"use strict";nB();iB();Ane=e=>e.charCodeAt(0)===65279?e.slice(1):e,bne=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},aB=e=>sB(oB(bne(Ane(e))))});var _ne,kne,wne,cB,Tne,Pa,Sh=l(()=>{"use strict";sR();lB();_ne=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},kne=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},wne=e=>[...e].reduce(kne,{out:"",inString:!1,escaped:!1}).out,cB=e=>{let t=ch(e);return t.length===0?null:t[t.length-1]},Tne=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Pa=e=>{let t=aB(_ne(e)),r=cB(t);if(r!==null)return r;let o=wne(t),n=cB(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Tne(i)}}});var Ene,Rne,CR,dB,uB=l(()=>{"use strict";Ene=/^[a-z0-9][a-z0-9-]{0,62}$/,Rne=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return Ene.test(t)?t:""},CR=e=>e.replace(/\s+/gu," ").trim(),dB=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=Rne(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=CR(n.name),a=CR(n.description),c=CR(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var pB,mB,gB=l(()=>{"use strict";pB=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},mB=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var LR,fB=l(()=>{"use strict";Sh();uB();gB();LR=(e,t)=>{let r=(()=>{try{return Pa(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(pB(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(mB).filter(a=>a!==null),i=dB({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var xR,yB=l(()=>{"use strict";xR=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var IR,hB=l(()=>{"use strict";IR=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var WR,SB=l(()=>{"use strict";$d();hh();WR=e=>{let t=ce(e.wizard),r=pe(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var qd,PB=l(()=>{"use strict";qd=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var tr,vne,OR,AB=l(()=>{"use strict";tr=m(li());Sh();vne=(0,tr.isType)({name:tr.isNonEmptyString,description:tr.isString,sampleValue:tr.isString}),OR=e=>{let t=Pa(e);if(!(0,tr.isType)({templatedPrompt:tr.isNonEmptyString,variables:(0,tr.isArrayWithEachItem)(vne)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var Pe,Cne,Lne,MR,bB=l(()=>{"use strict";Pe=m(li());vr();Sh();Cne=(0,Pe.isType)({id:Pe.isNonEmptyString,title:Pe.isNonEmptyString,prompt:Pe.isNonEmptyString,order:Pe.isNumber}),Lne=(0,Pe.isType)({id:Pe.isNonEmptyString,title:Pe.isNonEmptyString,summary:Pe.isString,topology:(0,Pe.isOneOf)("chain","parallel"),modules:(0,Pe.isArrayWithEachItem)(Cne),recommended:Pe.isBoolean}),MR=e=>{let t=Pa(e);if(!(0,Pe.isType)({options:(0,Pe.isArrayWithEachItem)(Lne)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Aa,_B=l(()=>{"use strict";Aa=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var xne,jR,NR=l(()=>{"use strict";xne=/\{\{([a-zA-Z0-9_-]+)\}\}/g,jR=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(xne,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var rr,or,kB=l(()=>{"use strict";ya();NR();rr=e=>jR(e.templatedPrompt,e.variables),or=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return Se(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??rr(e.wizard)}});var Ine,As,wB=l(()=>{"use strict";Ine=/\{\{([a-zA-Z0-9_-]+)\}\}/g,As=(e,t)=>e.replace(Ine,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var Wne,bs,Ph=l(()=>{"use strict";Wne=/\{\{([a-zA-Z0-9_-]+)\}\}/g,bs=e=>{let t=new Set,r=[];for(let o of e.matchAll(Wne)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Jd,TB=l(()=>{"use strict";Ph();Jd=e=>e.variables.length>0||bs(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var DR,HR=l(()=>{"use strict";vr();DR=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Yd,EB=l(()=>{"use strict";ya();HR();Yd=e=>{let t=e.wizard.evaluateSelectedRound??Se(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:DR(r.judgement,e.passScore)}});var Xd,RB=l(()=>{"use strict";Xd=e=>e.length===1&&e[0].modules.length===1});var FR,vB=l(()=>{"use strict";FR=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Oe,Ah,Zd=l(()=>{"use strict";Oe=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),Ah=(e,t)=>`<p class="muted">The computer runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var CB,LB=l(()=>{"use strict";Zd();CB=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Oe("awl","Connected on this computer (Agent Witch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Oe("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Oe("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var xB,IB=l(()=>{"use strict";fa();Zd();xB=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!L(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Oe("awl","Connected on this computer (Agent Witch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this computer.</p>"),Oe("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Oe("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this computer",Ah(e.writerLabel,e.folder)),Oe("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Oe("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var WB,OB=l(()=>{"use strict";Zd();WB=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Oe("awl","Connected on this computer (Agent Witch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Oe("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Oe("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var MB,jB=l(()=>{"use strict";Zd();MB=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Oe("awl","Connected on this computer (Agent Witch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Oe("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",Ah(e.writerLabel,e.folder)),...r?[Oe("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var bh,NB=l(()=>{"use strict";fa();LB();IB();OB();jB();bh=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(L(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return xB(r);case"evaluate":return CB({...r,currentRound:e.currentRound});case"separate":return MB(r);case"optimize_modules":return WB({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Qd,io,DB=l(()=>{"use strict";Qd=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),io=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var One,_h,$R,HB=l(()=>{"use strict";Ph();One="wizardParam_",_h=e=>`${One}${e}`,$R=e=>{let t=bs(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=_h(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Tt,FB=l(()=>{"use strict";Tt=["generalize","evaluate","separate","optimize_modules"]});var eu,_s,ba,ao=l(()=>{"use strict";eu="Stopped because the confirmed token or spend budget was exceeded.",_s="Approaching the confirmed budget. Further trials may hard-stop.",ba="Confirm the Step 4 token and spend budget before optimizing modules."});var Et,_a=l(()=>{"use strict";Et=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var sr,tu=l(()=>{"use strict";ao();sr=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var Mne,lo,ru=l(()=>{"use strict";ao();Mne={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},lo=e=>{let t=e?.trim()??"";return t.length===0?.01:Mne[t]??.01}});var kh,zR=l(()=>{"use strict";ao();ru();kh=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=lo(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var $B,Th,UR,BR=l(()=>{"use strict";ao();_a();tu();zR();ru();$B=e=>{let t=kh({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??lo(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:Et({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Th=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),UR=e=>{let t=e.existing??sr(),r=$B({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Th(t,r)}});var ka,ou,BB=l(()=>{"use strict";ao();vr();_a();tu();BR();zR();ru();ka=e=>{let t=kh({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??lo(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:Et({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},ou=e=>{let t=e.existing??sr();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=ka({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Th(t,r)}});var co,GB=l(()=>{"use strict";_a();ao();tu();co=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??sr(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=Et({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var VR,wa,VB=l(()=>{"use strict";ao();_a();VR=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=Et({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:eu,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:eu,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:_s,costControls:{...t,softWarnFired:!0,softWarnMessage:_s}}:null},wa=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var KR,KB=l(()=>{"use strict";KR=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var I=l(()=>{"use strict";fa();ah();A1();rR();uh();uR();_1();k1();w1();T1();oR();E1();ya();I1();hR();fR();W1();j1();vr();$d();N1();$1();z1();U1();G1();V1();J1();Y1();X1();ER();Z1();Q1();hh();rB();fB();yB();hB();SB();PB();AB();bB();_B();kB();NR();wB();Ph();TB();EB();RB();HR();vB();NB();DB();HB();FB();ao();_a();tu();BR();BB();ru();GB();VB();KB()});var qR=l(()=>{"use strict";Sc()});var jne,YB,XB=l(()=>{"use strict";qR();jne=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,YB=e=>{let t=Jn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(jne)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var QB,Nne,Dne,Cr,Hne,Fne,ZB,Rh,eG,$ne,Ot,tG,rG,oG,ir=l(()=>{"use strict";qR();XB();QB=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),Nne=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,Dne=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Cr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(Nne.test(e.errorMessage))return"usage_limit";if(Dne.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},Hne="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",Fne="The writer waited on terminal input and did not return a prompt.",ZB=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Rh=e=>{let t=e.trim();if(t.length===0||t.length>=500||!ZB.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>ZB.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},eG=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},$ne=e=>Rh(e.stdout)??Rh(e.stderr)??(eG(e.replyFile)?Rh(e.replyFile):null),Ot=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Hne;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?Fne:null},tG=e=>{let t=e.trim();return t.length===0?null:Ot(t)!==null?t:Rh(t)??(eG(t)?t:null)},rG=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],oG=e=>{let t=e.replyFileText?.trim()??"",r=Ot([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=$ne({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Cr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=YB([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Jn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var zne,sG,nG,ws,vh=l(()=>{"use strict";ir();zne=400,sG=(e,t=zne)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},nG=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:tG(e.promptText)},ws=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:nG(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=nG(e.revisions[n]);if(s!==null)return s.trim()}return null}});var O,Une,Ch,me,Ts,aG,iG,lG,cG,Me=l(()=>{"use strict";O="manual",Une=["claude-cli","codex","cursor","antigravity"],Ch={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},me=e=>e===O?"You":e in Ch?Ch[e]:e,Ts=e=>Une.filter(t=>e.includes(t)),aG=e=>{let t=Ts(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},iG=(e,t)=>t===O?O:e.find(r=>r===t)??null,lG=(e,t,r)=>{let o=Ts(e),n=iG(o,t),s=iG(o,r);return n===null||s===null?null:{judge:n,improver:s}},cG=(e,t,r)=>{let o=Ts(e);return t===null||t.trim()===""?r!==O?r:o[0]??null:t===O?null:o.find(n=>n===t)??null}});var dG,Lh,JR,Es,YR,Rt,uo,Ae,lt=l(()=>{"use strict";dG=m(require("node:fs")),Lh=m(require("node:os")),JR=m(require("node:path"));Uo();Es="~",YR=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Rt=e=>{let t=Lh.default.homedir(),r=YR(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},uo=e=>{let t=e.trim().length===0?"~":e.trim(),r=Qe(t),o=JR.default.isAbsolute(r)?YR(r):YR(JR.default.resolve(Lh.default.homedir(),r));try{if(!dG.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}return{ok:!0,path:o,display:Rt(o)}},Ae=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Lh.default.homedir()});var dt,rn=l(()=>{"use strict";dt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var XR,uG,Bne,pG,mG,ZR=l(()=>{"use strict";I();Me();lt();rn();XR=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),uG=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Bne=e=>{let t=uG(e.state),r=`<h2>${XR(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${XR(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${dt}</button></div><template>${r}</template></li>`},pG=e=>{let t=e.wizard;if(t===void 0)return"";let r=bh({status:e.status,wizard:t,writerLabel:me(e.judgeModel),runnerLabel:me(e.runnerModel??e.judgeModel),folderDisplay:Rt(Ae(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this computer">${r.map(Bne).join("")}</ol>`},mG=e=>{let t=e.wizard;if(t===void 0)return"";let r=bh({status:e.status,wizard:t,writerLabel:me(e.judgeModel),runnerLabel:me(e.runnerModel??e.judgeModel),folderDisplay:Rt(Ae(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this computer</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${uG(n.state)}<span class="sdlc-pipeline-label">${XR(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var ar,gG,fG,yG,QR=l(()=>{"use strict";I();ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gG="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",fG=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${ar(gG)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${ar(i.name)}}}</strong> \u2014 ${ar(i.description)} (sample: ${ar(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${ar(r)}</pre>`,n=rr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${ar(n)}</pre>`;return`${t}${o}${s}`},yG=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${ar(gG)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${ar(n.name)}}}</strong> \u2014 ${ar(n.description)} (sample: ${ar(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${ar(r)}</pre>`;return`${t}${o}`}});var nu,ev=l(()=>{"use strict";nu=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var hG,SG=l(()=>{"use strict";I();hG=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Ss({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=hs({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var tv,su,rv=l(()=>{"use strict";rn();SG();tv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),su=e=>{let t=hG(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${tv(r)}">${dt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${tv(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${tv(t)}</pre></template>`}});var ov,iu,nv=l(()=>{"use strict";rn();ov=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iu=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${ov(r)}">${dt}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${ov(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${ov(t)}</pre></template>`}});var xh,Ta,sv=l(()=>{"use strict";ev();rv();nv();xh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ta=e=>{let t=nu(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${xh(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,u=e.cycle.revisions.map(g=>{let f=g.judgement?.score,y=f==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${f}`,P=g.judgement?.reasons?.trim()??"",h=P.length===0?"":`<br><span class="muted">${xh(P)}</span>`,p=iu({roundLabel:d(g.roundNumber),promptText:g.promptText}),S=su({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run}),b=`${p}${S}`;if(e.interactive){let k=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${k}> <span class="sdlc-wizard-revision-title">${xh(y)}</span></label>${b}${h}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${xh(y)}</span>${b}${h}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var iv,PG,AG,bG,av=l(()=>{"use strict";iv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),PG=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${iv(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${iv(t.prompt)}</pre></li>`).join("")}</ol>`,AG=e=>PG([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),bG=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${iv(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${PG(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var au,Gne,Ih,lv=l(()=>{"use strict";I();av();au=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Gne=e=>{let t=e.wizard;return t===void 0?"":or({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Ih=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Gne(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${au(n.orchestratorSkill.fileName)}</code> \u2014 ${au(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${au(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=AG(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${au(r)} <span class="muted">${au(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ke,Vne,Kne,qne,Jne,Wh,Yne,Xne,Zne,Qne,ese,tse,Ea,Oh=l(()=>{"use strict";I();ZR();QR();sv();rv();nv();lv();Ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Vne={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},Kne=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ke(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ke(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ke(o)}</pre></details>`;return`<h2>${Ke(e)}</h2>${n}`},qne=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=rr(t).trim(),n=or({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!L(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${Kne("What is being evaluated",i)}`},Jne=(e,t)=>{let r=e.wizard;if(r===void 0||L(e.status))return"";let o=Vne[t];return o===void 0||r.phase!==o?"":mG(e)},Wh=(e,t,r)=>{let o=Jne(e,t),n=t==="wizard-2"?qne(e):"";return`${o}${n}${r}`},Yne=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},Xne=e=>{let t=e.wizard;return t===void 0?"":fG(t)},Zne=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Ke(a)}</span>`,d=`Round ${n.roundNumber}`,u=iu({roundLabel:d,promptText:n.promptText}),g=su({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ke(s)}${i}</span>${u}${g}${c}</li>`}).join("")}</ul>`,Qne=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Ta({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=Yne(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${Zne(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=or({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ke(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,g=iu({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),f=su({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ke(u)}</span>${g}${f}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ke(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},ese=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ke(n.title)}</strong> <span class="muted">(${Ke(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ke(o.title)}</strong>${n}${Ke(s)}${Ih(e,o)}</li>`}).join("")}</ul>`},tse=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ke(i)}</span> <strong>${Ke(n.title)}</strong>${Ke(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ke(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Ta({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ea=(e,t)=>{switch(t){case"wizard-1":return Wh(e,t,Xne(e));case"wizard-2":return Wh(e,t,Qne(e));case"wizard-3":return Wh(e,t,ese(e));case"wizard-4":return Wh(e,t,tse(e));default:return""}}});var rse,ose,_G,kG,wG=l(()=>{"use strict";I();vh();ir();Oh();rse=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},ose=e=>{let t=e.goal.trim();return t.length===0?null:t},_G=(e,t,r,o,n)=>{let s=Ot(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},kG=(e,t)=>{let r=ose(e);if(t.id.startsWith("wizard-")){let s=Ea(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Dd(e,t);if(s!==null){let a=ws(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=Se(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:_G(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:rse(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:_G(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Rs,TG,EG=l(()=>{"use strict";Rs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TG=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Rs(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Rs(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Rs(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Rs(n)}</h2><pre class="mono">${Rs(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Rs(e.goal)}</dd></div></dl>`;return`<h2>${Rs(e.title)}</h2>${i}${t}${r}${o}${s}`}});var nse,RG,lu,cv,Mh=l(()=>{"use strict";I();nse=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),RG=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||L(e.status))return null;let r=er(t);return r<0||r>3?null:`wizard-${r+1}`},lu=(e,t)=>nse.has(t)?RG(e)===t:!1,cv="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var sse,jh,dv=l(()=>{"use strict";sse='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',jh=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${sse}</button>`});var vs,Nh=l(()=>{"use strict";I();vs=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Od({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:jd(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var ise,vG,ase,uv,CG,lse,cse,dse,use,LG,xG=l(()=>{"use strict";I();Nh();ise={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},vG=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},ase=e=>ise[e]??null,uv=(e,t)=>{let r=e.wizard,o=ase(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=er(r);return o<n||o===n},CG=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},lse=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:rr(t).trim();return o.length===0?null:Bd({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:vG(e,"generalize")})},cse=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=vs(e);return n===null?null:en({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=CG(e)?.promptText.trim()??or({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Ss({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},dse=e=>{let t=e.wizard;if(t===void 0)return null;let r=or({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Gd({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:vG(e,"separate")})},use=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=io(t),s=As(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=vs(e);return c===null?null:en({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=CG(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||L(e.status)&&i?.judgement!==null)?hs({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Vd({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Ps(t,r).output,moduleTitle:o.title})},LG=(e,t)=>{if(!uv(e,t))return null;switch(t){case"wizard-1":return lse(e);case"wizard-2":return cse(e);case"wizard-3":return dse(e);case"wizard-4":return use(e);default:return null}}});var pse,Dh,pv=l(()=>{"use strict";I();pse=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Dh=(e,t)=>{let r=e.wizard,o=pse(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=er(r);return o<n?"done":o===n&&L(e.status)&&e.status==="failed"?"failed":o<=n&&L(e.status)?"done":"pending"}});var mse,Ra,Hh=l(()=>{"use strict";rn();xG();pv();mse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ra=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Dh(e,t)==="pending")return""}else if(!uv(e,t))return"";let o=LG(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${dt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${mse(o)}</pre></template>`}});var Cs,po,va=l(()=>{"use strict";Cs=e=>e.toLocaleString("en-US"),po=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Lr,gse,IG,Fh,WG,OG,$h=l(()=>{"use strict";I();wG();EG();Mh();dv();rn();vh();ZR();Hh();va();Lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gse=(e,t)=>{let r=Dd(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?po(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Cs(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Lr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Lr(r)}</span>`:"",d=TG(kG(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&L(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Lr(e.id)}"`:"",g=lu(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Lr(cv)}"><input type="hidden" name="cycleId" value="${Lr(t.id)}"><input type="hidden" name="wizardStepId" value="${Lr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",f=e.state==="active"&&e.id.startsWith("wizard-")?pG(t):"",y=o?"failed":e.state,P=o?ws(t):null,h=P!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${dt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Lr(P)}</pre></template>`:"",p=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Ra(t,e.id):"";return`<li class="sdlc-node sdlc-node-${y}" data-sdlc-step-id="${Lr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${Lr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${p}${h}</div></div>${f}<template>${d}</template></li>`},IG=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>gse(r,t)).join("")}</ol>`,Fh=e=>`<div class="sdlc-score" aria-label="What the score means">${Nd(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Lr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,WG=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${jh({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,OG=`<script>
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
</script>`});var zh,Uh,Bh,MG,mv=l(()=>{"use strict";zh="support-reply",Uh="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Bh=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),MG=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Gh,jG,NG=l(()=>{"use strict";I();$h();mv();Gh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jG=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${Fh(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this computer</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Gh(Uh)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Gh(Bh)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Gh(MG)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Gh(zh)}">Run this sample</a>
      </div>
    </section>`});var gv,Vh,fse,DG,HG=l(()=>{"use strict";gv=m(require("node:fs")),Vh=m(require("node:path")),fse=e=>Vh.default.join(Vh.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),DG=(e,t)=>{let r=fse(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;gv.default.mkdirSync(Vh.default.dirname(r),{recursive:!0}),gv.default.appendFileSync(r,o,"utf8")}});var Ca,FG,yse,$G,hse,zG,xr,Q,UG,z,vt=l(()=>{"use strict";Ca=m(require("node:fs")),FG=m(require("node:path"));I();HG();yse=e=>e.wizard===void 0?e:{...e,wizard:bR(e.wizard)},$G=new Set,hse=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),zG=(e,t)=>{Ca.default.mkdirSync(FG.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Ca.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Ca.default.renameSync(r,e)},xr=e=>{if(!Ca.default.existsSync(e))return[];try{let t=JSON.parse(Ca.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(hse).map(yse):[]}catch{return[]}},Q=(e,t)=>xr(e).find(r=>r.id===t)??null,UG=(e,t)=>{$G.add(t);let r=xr(e).filter(o=>o.id!==t);zG(e,r)},z=(e,t)=>{if($G.has(t.id))return;let r=xr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];zG(e,o),DG(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var La,Ir,cu,BG,Kh,Sse,GG,VG,KG,fv=l(()=>{"use strict";La=m(require("node:fs")),Ir=m(require("node:path")),cu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},BG=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Kh=(e,t)=>{let r=cu(e);return r.length>0?r:cu(t)},Sse=e=>{let t=Kh(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${BG(o)}`,...n.length>0?[`description: ${BG(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},GG=e=>`.cursor/skills/${e}/SKILL.md`,VG=(e,t)=>{let r=cu(t);if(r.length===0)return!1;let o=Ir.default.resolve(e),n=Ir.default.resolve(o,".cursor","skills"),s=Ir.default.resolve(o,GG(r));return s.startsWith(`${n}${Ir.default.sep}`)?La.default.existsSync(s):!1},KG=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Kh(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ir.default.resolve(e.workingDirectory);try{if(!La.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Sse({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=GG(r.slug),n=Ir.default.resolve(t,".cursor","skills"),s=Ir.default.resolve(t,o);if(!s.startsWith(`${n}${Ir.default.sep}`))return{ok:!1,errorCode:"path"};if(La.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{La.default.mkdirSync(Ir.default.dirname(s),{recursive:!0}),La.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var Pse,qG,JG,YG=l(()=>{"use strict";I();vt();lt();ir();fv();Pse=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,qG=e=>{let t=e.get("savedSkill");return t!==null&&Pse.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this computer.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this computer.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},JG=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Q(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!L(r.status))return{kind:"redirect",location:o("skillError=working")};let n=Se(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||Ot(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=KG({workingDirectory:Ae(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var qh,Jh,du=l(()=>{"use strict";I();qh=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=co({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},Jh=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var on,uu=l(()=>{"use strict";I();du();on=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=FR(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=UR({moduleCount:o.length,existing:e.costControls,writerId:n}),i=qh(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Qd(r.variables)},updatedAt:new Date().toISOString()}}});var nn,pu=l(()=>{"use strict";nn=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var yv=l(()=>{"use strict";qt();bd();Sc()});var hv,XG,Sv,ZG,QG=l(()=>{"use strict";hv={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},XG=e=>e.exitCode===null&&e.signalCode===null,Sv=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!XG(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!XG(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),ZG=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),Sv(e).then(s=>{r({...hv,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var e2,mu,t2,Pv,Ase,bv,_v,bse,_se,kse,r2,wse,Av,o2,gu,n2,Tse,Ese,ut,Ls=l(()=>{"use strict";e2=require("node:child_process"),mu=m(require("node:fs")),t2=m(require("node:os")),Pv=m(require("node:path"));yv();QG();ir();Ase=["claude-cli","codex","cursor","antigravity"],bv=18e4,_v=6e5,bse=12e4,_se=9e5,kse="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",r2="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",wse="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",Av=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},o2=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=Av(process.env[r2])??Math.max(r,_v));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:Av(process.env[wse])??_se;return Math.min(o,Math.max(bse,r))},gu=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?Av(process.env[r2])??_v:bv,n2=e=>`The writer timed out after ${e}ms.`,Tse=e=>Ase.includes(e),Ese=e=>e===!0||process.env[kse]==="1",ut=e=>new Promise(t=>{if(e.signal?.aborted){t(hv);return}if(Ese(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!Tse(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this computer."});return}let r=e.writerAgent,o=Ar(r,e.prompt,Te({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!mu.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this computer."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:bv,s=Pv.default.join(mu.default.mkdtempSync(Pv.default.join(t2.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=rG({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,e2.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),g=f=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(f))};ZG(u,e.signal,g,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",Sv(u).then(f=>{g({ok:!1,errorMessage:n2(n),errorKind:"writer_timeout",killSignal:f})})},n),u.stdout.on("data",f=>{a.push(Buffer.from(f))}),u.stderr.on("data",f=>{c.push(Buffer.from(f))}),u.on("error",()=>g({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let f=mu.default.existsSync(s)?mu.default.readFileSync(s,"utf8"):null,y=oG({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:f});if(y.ok&&d.stopReason!=="abort"){g(y);return}d.stopReason===null&&g(y)})})});var Rse,fu,kv=l(()=>{"use strict";I();va();Rse=e=>{if(e.wizard!==void 0){let t=qd(e.wizard),r=po(e);return(t??0)+r}return po(e)},fu=e=>{let t=VR({costControls:e.costControls,spentTokens:Rse(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var s2,vse,yu,Yh,Xh=l(()=>{"use strict";I();Me();kv();s2=e=>e===O?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},vse=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),yu=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=dR({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:s2(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?KR({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:jd(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=vse(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?fu({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):fu({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Yh=(e,t,r=null)=>{let o=ph({raw:t,judge:s2(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var Zh,wv=l(()=>{"use strict";Zh=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var l2,Qh,eS,i2,a2,Tv,Cse,c2,Ev,Lse,d2,xse,Ise,u2,p2=l(()=>{"use strict";l2=require("node:child_process"),Qh=m(require("node:fs")),eS=m(require("node:path"));Zf();I();i2=4e3,a2=12e3,Tv=(e,t)=>{let r=(0,l2.spawnSync)("git",[...t],{cwd:e,env:Ko(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Cse=e=>Tv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",c2=e=>{let t=Tv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Ev=(e,t)=>{let r=eS.default.resolve(e,t),o=eS.default.relative(e,r);if(o.startsWith("..")||eS.default.isAbsolute(o)||!Qh.default.existsSync(r)||!Qh.default.statSync(r).isFile())return null;let n=Qh.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>i2?`${n.slice(0,i2)}
\u2026truncated`:n},Lse=e=>e.length>a2?`${e.slice(0,a2)}
\u2026truncated`:e,d2=e=>{let t=mR(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Ev(e.workingDirectory,n)])),o=Cse(e.workingDirectory);return{git:o,status:o?c2(e.workingDirectory):{},files:r,paths:t}},xse=(e,t)=>{let r=Tv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Ev(e,t);return o===null?`${t} is missing.`:o},Ise=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",u2=e=>{let t=e.before.git?c2(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Ev(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>xse(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Ise(e.before.git,e.before.paths.length>0),evidence:Lse(i.join(`

`))}}});var Cv,q,Lv,qe,m2,Wse,Ose,g2,xa,f2,Ia,Mse,jse,hu,Rv,vv,Nse,y2,Dse,Hse,Fse,h2,$se,S2,P2,zse,Use,A2,b2=l(()=>{"use strict";Cv=require("node:child_process"),q=m(require("node:fs")),Lv=m(require("node:os")),qe=m(require("node:path"));Zf();m2=8e6,Wse=16e6,Ose=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],g2=(e,t)=>{let r=(0,Cv.spawnSync)("git",[...t],{cwd:e,env:Ko(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},xa=(e,t)=>(0,Cv.spawnSync)("git",[...t],{cwd:e,env:Ko(),timeout:8e3}).status===0,f2=e=>{let t=g2(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Ia=(e,t)=>{let r=qe.default.resolve(e,t),o=qe.default.relative(e,r);return o.startsWith("..")||qe.default.isAbsolute(o)?null:r},Mse=(e,t)=>{let r=Ia(e,t);if(r===null||!q.default.existsSync(r))return null;let o=q.default.statSync(r);return!o.isFile()||o.size>m2?null:q.default.readFileSync(r)},jse=(e,t,r)=>{let o=Ia(e,t);o!==null&&(q.default.mkdirSync(qe.default.dirname(o),{recursive:!0}),q.default.writeFileSync(o,r))},hu=(e,t)=>{let r=Ia(e,t);r===null||!q.default.existsSync(r)||q.default.rmSync(r,{recursive:!0,force:!0})},Rv=(e,t)=>xa(e,["cat-file","-e",`HEAD:${t}`]),vv=e=>{let t=g2(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},Nse=e=>qe.default.resolve(e)!==qe.default.resolve(Lv.default.homedir()),y2=e=>{if(!q.default.existsSync(e))return 0;let t=q.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?q.default.readdirSync(e).reduce((r,o)=>r+y2(qe.default.join(e,o)),0):0},Dse=(e,t,r)=>{let o=Ia(e,r);if(o===null||!q.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(y2(o)>Wse)return{relativePath:r,existed:!0,copyDir:null};let n=qe.default.join(t,"cache",r);return q.default.mkdirSync(qe.default.dirname(n),{recursive:!0}),q.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},Hse=400,Fse=32e6,h2=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!q.default.existsSync(s)))for(let i of q.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=qe.default.join(s,i),c=q.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>m2)){if(t.length>=Hse||r+c.size>Fse){o=!1;return}r+=c.size,t.push(qe.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},$se=(e,t,r)=>{let o=Ia(e,r);if(o===null||!q.default.existsSync(o))return null;let n=Mse(e,r);if(n===null)return"skip";let s=qe.default.join(t,"files",r);return q.default.mkdirSync(qe.default.dirname(s),{recursive:!0}),q.default.writeFileSync(s,n),s},S2=e=>{let t=q.default.mkdtempSync(qe.default.join(Lv.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?f2(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:h2(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,$se(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?vv(e.workingDirectory):null,isolateCaches:Nse(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:Ose.map(i=>Dse(e.workingDirectory,t,i))}},P2=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){hu(e.workingDirectory,t);return}jse(e.workingDirectory,t,q.default.readFileSync(r))}},zse=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?P2(e,t):Rv(e.workingDirectory,t)?xa(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):hu(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Rv(e.workingDirectory,t)&&xa(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Rv(e.workingDirectory,t)&&xa(e.workingDirectory,["reset","-q","HEAD","--",t])},Use=(e,t)=>{let r=Ia(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){hu(e.workingDirectory,t.relativePath),q.default.mkdirSync(qe.default.dirname(r),{recursive:!0}),q.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){hu(e.workingDirectory,t.relativePath);return}if(q.default.existsSync(r))for(let o of q.default.readdirSync(r)){let n=qe.default.join(r,o);q.default.statSync(n).mtimeMs>=e.startedMs-1e3&&q.default.rmSync(n,{recursive:!0,force:!0})}}}},A2=e=>{try{if(e.git){if(vv(e.workingDirectory)!==e.head&&(!(e.head===null?xa(e.workingDirectory,["update-ref","-d","HEAD"]):xa(e.workingDirectory,["reset","--hard",e.head]))||vv(e.workingDirectory)!==e.head))throw new Error("head");let r=f2(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))zse(e,o)}else{if(e.complete)for(let t of h2(e.workingDirectory).paths)e.files[t]===void 0&&hu(e.workingDirectory,t);for(let t of Object.keys(e.files))P2(e,t)}for(let t of e.caches)Use(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{q.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var tS,rS,Bse,Gse,Vse,Kse,qse,_2,Jse,k2,w2=l(()=>{"use strict";I();Xh();wv();p2();b2();Me();lt();ir();Ls();tS=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),rS=e=>({...e,status:"stopped",errorMessage:ys,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),Bse=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Gse=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==O?t:e.improverModel!==O?e.improverModel:null}return e.judgeModel!==O?e.judgeModel:e.improverModel!==O?e.improverModel:null},Vse=async e=>{let t=Ae(e.cycle),r=d2({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=S2({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Vd({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ps(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Md({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=o2({promptText:e.revision.promptText,isModuleRun:i}),c=gu({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await ut({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),g=u.ok?u2({workingDirectory:t,before:r,writerReply:u.text}):null,f=A2(o),y={...e.cycle,revisions:e.cycle.revisions.map(P=>P.roundNumber===e.cycle.currentRound?d:P)};return u.ok?!f.ok||g===null?{ok:!1,cycle:tS(y,f.ok?"Could not put the folder back after the run.":f.errorMessage)}:{ok:!0,cycle:y,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:g.lookedAt,evidence:g.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:rS(y)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:tS(y,u.errorMessage,Cr(u))})},Kse=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:Vse({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),qse=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),_2=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await ut({writerAgent:e.reviewer,workingDirectory:Ae(e.cycle),prompt:pR({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:rS(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},Jse=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===O)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await ut({writerAgent:t.judgeModel,workingDirectory:Ae(t),prompt:Ss({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...yu(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?rS(o):(e.onWriterFailure?.(t.judgeModel),tS(o,n.errorMessage,Cr(n)))},k2=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return Jse(e);let o=Gse(t),n=await Kse({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?Bse(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===O){let u=await _2({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...qse(s,u.text),judgePhase:void 0}}let i=await ut({writerAgent:t.judgeModel,workingDirectory:Ae(t),prompt:hs({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?rS(s):(e.onWriterFailure?.(t.judgeModel),tS(s,i.errorMessage,Cr(i)));let a=await _2({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=yu(s,i.text,c);return Zh(d,a.text)}});var oS,Yse,Xse,xv,T2=l(()=>{"use strict";I();Xh();w2();Nh();ir();Me();kv();lt();Ls();oS=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Yse=e=>({...e,status:"stopped",errorMessage:ys,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),Xse=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?Yse(e):(n?.(r),oS(e,t.errorMessage,Cr(t))),xv=async(e,t,r,o)=>{let n=fu(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return oS(e,"This round has no prompt.");if(e.status==="judging")return k2({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return oS(e,"This cycle is waiting on a step this computer cannot run.");if(e.improverModel===O)return e;let i=vs(e);if(i===null)return oS(e,"The improver needs the score and the reason.");let a=await ut({writerAgent:e.improverModel,workingDirectory:Ae(e),prompt:en({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:gu()}),c=Xse(e,a,e.improverModel,r,t);return c!==null?c:Yh(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Su,Iv,Zse,R2,E2,Qse,eie,nS,v2,C2,tie,rie,xs,L2,x2,Pu=l(()=>{"use strict";I();uu();pu();Me();lt();ir();Ls();T2();ev();Su=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Iv=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Su(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},Zse=e=>{let t=Cr(e);return QB(e)||t==="usage_limit"||t==="action_required"},R2=(e,t,r)=>Zse(r)?Su(e,r.errorMessage,Cr(r)):Iv(e,t,r.errorMessage),E2=e=>{let t=e.wizard;return t===void 0||nu(e).length===0?e:{...e,wizard:Aa({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},Qse=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",eie=e=>{let t=e.wizard;if(t===void 0)return e;let r=Kd({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Aa({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},nS=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),v2=e=>e.judgeModel!==O?e.judgeModel:e.improverModel!==O?e.improverModel:null,C2=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},tie=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=v2(e);if(n===null)return Su(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??rr(o),i=Bd({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:C2(e,"generalize")}),a=await ut({writerAgent:n,prompt:i,workingDirectory:Ae(e),signal:t});if(!a.ok)return r?.(n),R2(e,"generalize",a);try{let c=OR(a.text),d=Aa({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Qd(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Jd(d)?xs({...u,wizard:{...d,gate:null}}):nS(u,"generalize")}catch(c){return Iv(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},rie=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=v2(e);if(n===null)return Su(e,"Choose a writer to suggest splits.");let s=or({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Gd({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:C2(e,"separate")}),a=await ut({writerAgent:n,prompt:i,workingDirectory:Ae(e),signal:t});if(!a.ok)return r?.(n),R2(e,"separate",a);try{let c=MR(a.text),d=wR(c,o.variables),u=Aa({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:u};return Xd(d)?on(g,d[0]):nS(g,"separate")}catch(c){return Iv(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},xs=e=>{let t=e.wizard;if(t===void 0)return e;let r=rr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},L2=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Su(e,"This module is missing.");let n=io(r),s=As(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==O?e.runnerModel:e.judgeModel!==O?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:pe(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},x2=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return xv(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return tie(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return rie(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await xv(e,t,r,o);if(L(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&nu(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=Se(s.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??0,reasons:f.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&Yd({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=E2(nS(a,i));return nn(u)}let c=nS(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=RR({wizard:{...c.wizard,modules:c.wizard.modules.map((g,f)=>f===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:Qse(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?E2(d):eie(d)}return s}return n.phase==="complete",e}});var Wa,sS=l(()=>{"use strict";I();Me();Wa=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:xR(r,e.judgeModel===O),updatedAt:new Date().toISOString()}}});var Oa,iS=l(()=>{"use strict";Oa=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Mt,I2,oie,W2=l(()=>{"use strict";I();lt();iS();ir();fv();Mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I2=e=>{if(!L(e.status))return"";let t=Se(e.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??null,reasons:f.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=Ot(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Mt(t.reasons.trim())}</p>`,i=e.status==="passed",a=Oa(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Mt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Mt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${Mt(n)}</div>`:i?oie({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Ae(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Mt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Mt(t.promptText)}</pre></details>`,g=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${g}</h2>${d}${o}${s}${u}</section>`},oie=e=>{let t=e.sourceSkill?.fileName??cu(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Kh(t,r),s=n.length>0&&VG(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Mt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Mt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Mt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Mt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Mt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Mt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var O2,M2=l(()=>{"use strict";O2=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var j2,nie,aS,pt,lS,Wv=l(()=>{"use strict";I();Me();M2();vh();ir();iS();j2=["Generalize","Evaluate","Separate","Optimize modules"],nie=e=>{let t=er(e),r=t>=0&&t<j2.length?j2[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},aS=(e,t)=>{let r=ws(e),o=r===null?null:O2(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},pt=(e,t)=>({title:e,detail:t,replyPreview:null}),lS=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=ws(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:sG(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!L(e.status)){let t=e.judgeModel;return pt(`${me(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this computer.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!L(e.status)){let t=e.judgeModel;return pt(`${me(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this computer.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===O?pt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?pt(`${me(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):pt(`${me(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===O){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==O?pt(`${me(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):pt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this computer can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return pt(`${me(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=pe(t);return pt(`${me(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return pt(`${me(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=pe(t);return pt(`${me(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return pt(`${me(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===O){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return pt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return pt(`${me(e.improverModel)} is rewriting the prompt.`,"That writer is working on this computer. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>Ot(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=ce(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||L(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?aS(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=Oa(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?aS(e,{title:`${nie(r)}${s}`,detail:t.length>0?t:n}):aS(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(L(e.status)){let t=e.errorMessage?.trim()??"";return aS(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this computer.",detail:"This panel keeps updating.",replyPreview:null}}});var Wr,Au=l(()=>{"use strict";Me();Wr=e=>{if(e.status==="improving"&&e.improverModel===O)return!0;if(e.status!=="judging"||e.judgeModel!==O)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===O}});var N2,D2=l(()=>{"use strict";N2=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var sn,sie,H2,F2=l(()=>{"use strict";I();sn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sie=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${sn(r)}</p>`},H2=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${sn(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${sn(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${sn(a)}.</p>`}<pre class="mono">${sn(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${tn(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${sn(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",g=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${sn(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${sie(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${sn(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var bu,iie,$2,z2=l(()=>{"use strict";I();ir();bu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iie=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=Ot(t.promptText),n=t.judgement?.reasons?`<p class="muted">${bu(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${bu(i)}.</p>`}<pre class="mono">${bu(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${tn(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${bu(d)}</pre>`:`<div class="alert-error">${bu(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},$2=e=>e.revisions.map(t=>iie(e,t)).join("")});var U2,B2=l(()=>{"use strict";I();U2=e=>{if(L(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Or,aie,Ov,lie,cie,die,uie,G2,V2,Mv=l(()=>{"use strict";B2();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),aie="Stop this run? Writers will stop and the best prompt is kept.",Ov="End the wizard? Writers will stop and progress from finished steps is kept.",lie="Skip this module and pause at the step gate?",cie=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Or(aie)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Or(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,die=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Or(Ov)}"><input type="hidden" name="cycleId" value="${Or(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,uie=e=>{let t=Or(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Or(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Or(lie)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Or(Ov)}">End wizard</button>
    </form>
  </div>`},G2=e=>{let t=U2(e);return t==="none"?"":t==="legacy_stop"?cie(e.id):t==="wizard_end_only"?die(e.id):uie(e)},V2=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Or(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Or(Ov)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var K2,q2=l(()=>{"use strict";I();va();K2=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=ce(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Cs(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Cs(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${pe(r)}`}return""}});var pie,mie,J2,gie,Y2,X2=l(()=>{"use strict";I();q2();pv();Oh();Hh();pie=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',mie=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',J2=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gie=(e,t,r)=>{let o=Ea(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=K2(e,t),i=Dh(e,t),a=pie(i),c=mie(i),d=Ra(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${J2(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${J2(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",f=i==="failed"&&t!=="wizard-4"?" open":"",y=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${y}"${g}${f}><summary aria-controls="${y}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${y}-body">${o}</div></details>`},Y2=e=>{let t=e.wizard;if(t===void 0||!L(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>gie(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var Z2,Q2,e5=l(()=>{"use strict";Z2=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Q2=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${Z2(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Z2(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var jv,t5,Nv=l(()=>{"use strict";jv=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,t5=(e,t)=>{if(jv(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var r5,o5=l(()=>{"use strict";r5=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var cS,n5,s5=l(()=>{"use strict";I();Nv();Nv();o5();cS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n5=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=ce(t),o=pe(t),n=r.terminalStatusSuggestion==="passed"?"":r5(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,y=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",P=u===void 0?c.status:t5(u,o),h=u!==void 0&&jv(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':P==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':P==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':cS(P);return`<tr${y}><td>${cS(c.title)}</td><td>${cS(g)}</td><td>${c.tokens??"\u2014"}</td><td>${h}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${cS(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Is,dS,Dv=l(()=>{"use strict";Is=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),dS=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Is(r.fileName)}</code> \u2014 ${Is(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Is(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Is(i.name)}</strong> <code>.cursor/skills/${Is(i.fileName)}/SKILL.md</code></p><p class="muted">${Is(i.description)}</p><p>${Is(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var fie,i5,a5=l(()=>{"use strict";I();e5();s5();Dv();fie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),i5=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!L(e.status)||t.modules.length===0)return"";let r=n5(e),o=Q2(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=ce(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${fie(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${dS(e)}${a}${r}${o}</section>`}});var Y,uS=l(()=>{"use strict";I();Y={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var pS,Hv=l(()=>{"use strict";pS=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var l5,c5=l(()=>{"use strict";uS();Hv();l5=e=>{let t=pS({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:Y.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var mo,_u=l(()=>{"use strict";mo=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var go,mS,Fv=l(()=>{"use strict";I();$h();W2();Wv();Au();D2();Nh();F2();z2();Mv();X2();a5();va();c5();lt();_u();go=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mS=e=>{let t=!L(e.status)&&e.status!=="wizard_paused"&&!Wr(e),r=lS(e),o=IG(SR(N2(e)),e),n=L(e.status)?"":G2(e),s=Y2(e),i=i5(e),a=I2(e),c=e.errorMessage===null?"":`<div class="alert-error">${go(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?ce(e.wizard):null,f=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,y=!t&&e.wizard!==void 0&&L(e.status)&&(e.wizard.phase==="complete"||ce(e.wizard).passedModuleCount>0),P=y?f?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",h=y&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${go(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",p=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${go(r.replyPreview)}</pre>`,S=r.detail.length===0&&h.length===0&&p.length===0||r.detail.length===0&&p.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${go(r.detail)}${u}</p>`}${p}</div>`,b=e.revisions.find(bn=>bn.roundNumber===e.currentRound),k=e.status==="improving"?vs(e):null,A=po(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),E=Wr(e)?H2({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:k?.promptText??b?.promptText??"",score:k?.score??b?.judgement?.score??null,reasons:k?.reasons??b?.judgement?.reasons??null,avoid:k?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:b?.run??null,minJudgeScore:_?1:0}):"",T=e.wizard!==void 0&&e.wizard.phase==="complete"&&L(e.status),C=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",x=e.wizard!==void 0&&!T&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?pe(e.wizard):e.passScore,W=C?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${Fh(x)}</div>`:"",j=e.status==="failed"?l5({status:e.status,errorKind:e.errorKind}):null,M=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':L(e.status)?j!==null?`<span class="${j.badgeClass}">${j.badgeLabel}</span>`:T&&g!==null&&!f?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",B=t?d:y?f?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',ie=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${go(Rt(Ae(e)))}</li>`:"",A>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Cs(A)} so far</li>`:""].filter(bn=>bn.length>0),D=ie.length===0?"":`<ul class="sdlc-run-meta">${ie.join("")}</ul>`,xe=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Pn=T?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,An=T?"":W.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Pn}</div>`:`<div class="sdlc-run-grid">${Pn}${W}</div>`,ei=$2(e),Fr=e.wizard!==void 0&&L(e.status)&&e.revisions.every(bn=>bn.roundNumber===0&&(bn.judgement===void 0||bn.judgement===null)),fA=ei.length===0||Fr?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${ei}</div></section>`,pl=`<p class="sdlc-run-goal" title="${go(e.goal.trim())}">${go(mo(e.goal))}</p>`,yA=T?`${c}${i}${s}${E}${a}`:`${c}${An}${E}${s}${a}`,Up='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',ti=T?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${go(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Up}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${M}</div>${pl}<div class="sdlc-run-activity${P}"${y?' role="status"':""}><div class="sdlc-run-activity-icon">${B}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${go(r.title)}</h2>${S}${h}${ti}</div></div>${D}${xe}</header>${yA}</section>${fA}`}});var d5,u5=l(()=>{"use strict";I();pu();d5=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Yd({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:nn(e)}});var p5,m5=l(()=>{"use strict";I();Pu();p5=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Jd(t)?e:xs({...e,wizard:{...t,gate:null}})}});var g5,f5=l(()=>{"use strict";I();uu();g5=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Xd(t.splitOptions))return e;let r=t.splitOptions[0];return on(e,r)}});var yie,Ws,gS=l(()=>{"use strict";u5();m5();f5();vt();yie=e=>{let t=p5(e),r=d5(t);return g5(r)},Ws=(e,t)=>{let r=yie(t);return r!==t?(z(e,r),r):t}});var y5,fo,ku=l(()=>{"use strict";I();y5=e=>Tt.indexOf(e),fo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||L(e.status)?Tt.length:t.gate!==null?y5(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?y5(t.phase):null}});var h5,S5=l(()=>{"use strict";h5=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Os,P5,A5=l(()=>{"use strict";I();S5();Os=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),P5=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Ps(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Os(h5(o))}</pre></div>`:"",s=bs(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=io(t),a=s.map(c=>{let d=t.variables.find(P=>P.name===c),u=_h(c),g=i[c]??"",f=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Os(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Os(u)}">${Os(f)}</label>
        ${y}
        <input class="input" type="text" id="${Os(u)}" name="${Os(u)}" value="${Os(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var b5,_5=l(()=>{"use strict";b5={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var wu,hie,be,an=l(()=>{"use strict";_5();rn();wu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),hie=e=>{let t=b5[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${wu(t.title)}" aria-describedby="${r}" aria-expanded="false">${dt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${wu(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${wu(t.example)}</span></span></button>`},be=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${wu(r)}"`}>${wu(e)}</span>${hie(t)}</span>`});var jt,k5,w5,T5=l(()=>{"use strict";I();du();uS();an();jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k5=e=>{let t=e.costControls;if(t===void 0||wa(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??Et({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${jt(Y.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${jt(t.softWarnMessage??_s)}</p>`:"",d=Jh({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${jt(Y.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,g=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
  <p class="eyebrow">Prompt optimizer</p>
  <h2>${jt(Y.confirmTitle)}</h2>
  <p class="sdlc-wizard-gate-lede">${jt(Y.confirmLede)}</p>
  ${g}
  ${a}
  ${c}
  ${d}
  <p class="muted sdlc-cost-confirm-required" hidden>${jt(ba)}</p>
  <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback sdlc-cost-confirm-form" id="sdlc-wizard-cost-confirm-form">
    <input type="hidden" name="cycleId" value="${jt(e.id)}">
    <input type="hidden" name="targetTokenBudget" value="${r}">
    <input type="hidden" name="proposedTokenBudget" value="${r}">
    <input type="hidden" name="estimatedSpendUsd" value="${n}">
    <input type="hidden" name="rateUsdPer1kTokens" value="${o}" data-sdlc-cost-rate>
    <dl class="sdlc-cost-proposal">
      <div><dt>${jt(Y.proposedTokenLabel)}</dt><dd data-sdlc-proposed-tokens data-sdlc-target-tokens>${r.toLocaleString("en-US")}</dd></div>
      <div><dt>${jt(Y.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${n.toFixed(4)}</dd></div>
      <div><dt>${jt(Y.rateLabel)}</dt><dd>$${o.toFixed(4)}</dd></div>
    </dl>
    <div class="field">
      ${be(Y.confirmedTokenLabel,"confirmedTokenBudget")}
      <input class="input" type="number" name="confirmedTokenBudget" id="sdlc-confirmed-token-budget" min="1" step="1" value="${s}" required data-sdlc-confirmed-token-budget>
    </div>
    <div class="field">
      ${be(Y.confirmedSpendLabel,"confirmedMaxSpendUsd")}
      <input class="input" type="number" name="confirmedMaxSpendUsd" id="sdlc-confirmed-max-spend" min="0" step="0.0001" value="${i}" data-sdlc-confirmed-max-spend>
    </div>
    <div class="sdlc-wizard-actions">
      <button class="btn btn-primary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-approve>${jt(Y.approveLabel)}</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-continue" data-sdlc-cost-confirm-edit>${jt(Y.confirmEditLabel)}</button>
    </div>
  </form>
</section>`},w5=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!wa(r)}});var Sie,E5,R5=l(()=>{"use strict";rn();Sie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),E5=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${dt}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${Sie(t)}</pre></template>`}});var Tu,v5,C5=l(()=>{"use strict";I();QR();A5();sv();Mv();Dv();lv();T5();R5();Tu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),v5=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(w5(e))return k5(e);let n=pe(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?yG(r):"",a=o==="evaluate"?dS(e):"",c=o==="evaluate"?Ta({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let W=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',j=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",M=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Tu(x.id)}" required${M}> <strong>${Tu(x.title)}</strong>${W}${j}</label>${Ih(e,x)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],y=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",P=g?.title??"Module",h=g?.prompt??"",p=g?.status==="pending",S=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Tu(P)}</p>${p?P5({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${Tu(As(h,io(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${Ta({cycle:e,interactive:!1,caption:p?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${P}\u201D (runner + judge).`})}`:"",b=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":p?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",k=qd(r),A=k===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${k}</p>`,_=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?E5(r.lastWriterParseFailureReply??""):"",E=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",T=t?.active===!0?" sdlc-wizard-gate-active":"",C=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${E}"`:"";return`<section class="card sdlc-wizard-gate${T}"${C}>
    <p class="eyebrow">Prompt optimizer</p>
    <h2>${s}</h2>
    <p class="sdlc-wizard-gate-lede">${b}</p>
    ${_}
    ${A}
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-feedback" id="sdlc-wizard-gate-form">
      <input type="hidden" name="cycleId" value="${Tu(e.id)}">
    ${i}
    ${a}
    ${c}
    ${u}
    ${S}
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
    ${V2(e)}
  </section>`}});var Pie,L5,x5=l(()=>{"use strict";I();Hh();Pie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),L5=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||L(e.status))return"";let r=(o,n)=>{let s=Ra(e,o);return`<h2 class="sdlc-wizard-active-head">${Pie(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var $v,I5,W5,ln,O5,Ma=l(()=>{"use strict";I();vt();$v=new Map,I5=e=>{let t=new AbortController;return $v.set(e,t),t.signal},W5=e=>{$v.delete(e)},ln=e=>{$v.get(e)?.abort()},O5=(e,t)=>{let r=Q(e,t);return r===null||r.wizard!==void 0?!1:(L(r.status)||(z(e,{...r,status:"stopped",errorMessage:ys,updatedAt:new Date().toISOString()}),ln(t)),!0)}});var M5,j5,zv,N5,Uv=l(()=>{"use strict";I();ku();Ma();M5="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",j5=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Tt[r]??null},zv=(e,t)=>{let r=j5(t);if(r===null||e.wizard===void 0)return!1;let o=Tt.indexOf(r);if(o===-1)return!1;let n=fo(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Tt.length)},N5=(e,t)=>{let r=j5(t);if(r===null||e.wizard===void 0||!zv(e,t))return e;ln(e.id);let o=Tt.slice(Tt.indexOf(r)),n=Ud(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var Bv,D5,H5=l(()=>{"use strict";Uv();Bv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),D5=(e,t)=>zv(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${Bv(M5)}"><input type="hidden" name="cycleId" value="${Bv(e.id)}"><input type="hidden" name="wizardStepId" value="${Bv(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var Aie,F5,bie,$5,z5=l(()=>{"use strict";I();ku();C5();x5();H5();Oh();Aie={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},F5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bie=(e,t,r)=>{let o=D5(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${F5(t)}">
  <summary class="sdlc-wizard-accordion-summary">${F5(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ea(e,t)}</div>
</details>`},$5=e=>{let t=e.wizard;if(t===void 0)return"";let r=fo(e);if(r===null)return"";let o=Tt.slice(0,r).map((i,a)=>bie(e,`wizard-${a+1}`,Aie[i])),n=t.gate!==null?v5(e,{active:!0}):L5(e),s=r>=Tt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var fS,Gv=l(()=>{"use strict";z5();av();I();fS=e=>{if(e===null||e.wizard!==void 0&&L(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=$5(e),r=bG(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var _ie,Vv,U5=l(()=>{"use strict";I();Me();lt();Ls();_ie=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},Vv=async(e,t,r)=>{if(!_ie(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===O)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=vR({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await ut({writerAgent:e.judgeModel,prompt:n,workingDirectory:Ae(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=LR(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Eu,yS,B5,Kv,G5,V5,K5,hS,qv=l(()=>{"use strict";Eu=m(require("node:fs")),yS=m(require("node:path")),B5=e=>yS.default.join(yS.default.dirname(e),"prompt-optimizer-writer-ready.json"),Kv=e=>{let t=B5(e);if(!Eu.default.existsSync(t))return{};try{let r=JSON.parse(Eu.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},G5=(e,t)=>{Eu.default.mkdirSync(yS.default.dirname(e),{recursive:!0}),Eu.default.writeFileSync(B5(e),`${JSON.stringify(t,null,2)}
`)},V5=(e,t)=>Kv(e)[t]?.message??null,K5=(e,t,r)=>{G5(e,{...Kv(e),[t]:{message:r}})},hS=(e,t)=>{let r=Kv(e);r[t]!==void 0&&G5(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Jv,SS,PS,q5,je,Ms=l(()=>{"use strict";I();yv();Pu();U5();Au();Ma();qv();gS();vt();Jv=new Set,SS={atMs:0,ids:[]},PS=async()=>{if(Date.now()-SS.atMs<3e4)return SS.ids;let e=await Qt({commands:Te({})});return SS.atMs=Date.now(),SS.ids=e.installedWriterIds,e.installedWriterIds},q5=async(e,t,r)=>{let o=Q(e,t);if(o===null||r.aborted)return;let n=Ws(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(L(n.status)&&!s||n.status==="wizard_paused"||Wr(n))return;if(s){let c=await Vv(n,r,d=>{hS(e,d)});z(e,c);return}let i=await x2(n,c=>{hS(e,c)},r,c=>{Q(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(Q(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),L(i.status)){let c=await Vv(i,r,d=>{hS(e,d)});z(e,c);return}await q5(e,t,r)}},je=(e,t)=>{if(Jv.has(t))return;let r=Q(e,t);if(r===null)return;let o=Ws(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(L(o.status)&&!n||o.status==="wizard_paused"||Wr(o))return;Jv.add(t);let s=I5(t);q5(e,t,s).finally(()=>{Jv.delete(t),W5(t)})}});var cn,Ru=l(()=>{"use strict";Fv();gS();Gv();Ms();cn=(e,t)=>{let r=Ws(e,t);return je(e,r.id),`${mS(r)}${fS(r)}`}});var J5,Y5,X5=l(()=>{"use strict";J5=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,Y5=e=>e!==null&&e>0});var kie,wie,Tie,Z5,Q5=l(()=>{"use strict";I();Pu();sS();uu();pu();Ma();Mh();Mh();kie=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),wie=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=Se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},Tie=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=ce(o);return Wa({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},Z5=(e,t)=>{if(!lu(e,t))return e;ln(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return xs({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return nn(wie(r));if(t==="wizard-3"){let n=o.splitOptions[0]??kie(o.templatedPrompt);return on(r,n)}return t==="wizard-4"?Tie(r):e}});var AS,eV,Yv=l(()=>{"use strict";I();sS();Ma();AS=e=>(ln(e.id),{...Wa(e,"stopped"),errorMessage:tR}),eV=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;ln(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var Eie,tV,rV,oV=l(()=>{"use strict";I();Pu();sS();uu();pu();Ru();vt();Ms();X5();Uv();Q5();Yv();Eie="Pick a revision scored above 0 before continuing to Separate.",tV=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),rV=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Q(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Q(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(cn(e.storePath,d))};if(o==="wizard-stop-all"){let c=AS(s);return z(e.storePath,c),je(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=eV(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=N5(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=Z5(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&je(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",g=_R(s.wizard,d,c);g=Ud(g,d),g={...g,pendingStepInstructions:u};let f={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,f),je(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(f=>f.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?tV(s):xs({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,g),je(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=J5(s,u??-1);if(!Y5(g)){let y={...s,errorMessage:Eie,updatedAt:new Date().toISOString()};return z(e.storePath,y),a(n),!0}let f=nn({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return z(e.storePath,f),je(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let y=tV(s);return z(e.storePath,y),je(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(y=>y.id===u);if(g===void 0){let y={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,y),a(n),!0}let f=on(s,g);return z(e.storePath,f),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,g=d.modules[u];if(g===void 0)return a(n),!0;if(!wa(s.costControls)){let p=t.get("confirmedTokenBudget")?.trim()??"",S=t.get("confirmedMaxSpendUsd")?.trim()??"";if(p.length===0){let k={...s,errorMessage:ba,updatedAt:new Date().toISOString()};return z(e.storePath,k),a(n),!0}let b=co({existing:s.costControls,confirmedTokenBudget:Number(p),confirmedMaxSpendUsd:S.length===0?null:Number(S),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!b.ok){let k={...s,errorMessage:b.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,k),a(n),!0}s={...s,costControls:b.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let f=$R({wizard:d,modulePrompt:g.prompt,posted:t});if(!f.ok){let p={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,p),a(n),!0}let y={...d,parameterValues:f.parameterValues};if(g.status==="pending"){let p=L2({...s,wizard:{...y,gate:null}},u);return z(e.storePath,p),je(e.storePath,n),a(n),!0}let P=u+1;if(P>=d.modules.length){let p=ce(y),S=Wa({...s,wizard:y},p.terminalStatusSuggestion);return z(e.storePath,S),je(e.storePath,n),a(n),!0}let h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...y,gate:"optimize_modules",currentModuleIndex:P},updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}}return a(n),!0}});var Rie,nV,vie,Xv,Cie,sV,iV=l(()=>{"use strict";Me();Ma();Yv();wv();Xh();Au();vt();Rie="Add a score from 0 to 100 and the reason for it.",nV="Add a score from 1 to 100 and the reason for it.",vie="Write the next prompt.",Xv="This step is not waiting for you.",Cie=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},sV=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Q(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,AS(a)),{kind:"saved",cycleId:i}):O5(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Q(e.storePath,r);if(o===null||!Wr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:Xv};if(t==="manual-judge"){if(o.judgeModel!==O)return{kind:"invalid",cycle:o,errorMessage:Xv};let i=Cie(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?nV:Rie};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:nV};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",u=Zh(yu(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==O)return{kind:"invalid",cycle:o,errorMessage:Xv};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:vie};let s=Yh(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var aV,lV=l(()=>{"use strict";aV=`<script>
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
</script>`});var cV,dV=l(()=>{"use strict";cV=`<script>
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
</script>`});var uV,pV=l(()=>{"use strict";uV=`<script>
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
</script>`});var mV,gV=l(()=>{"use strict";mV=`<script>
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
</script>`});var fV,yV=l(()=>{"use strict";I();lt();fV=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Rt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(pe(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!L(t.status)}}});var hV,SV=l(()=>{"use strict";hV=`<script>
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
</script>`});var PV,AV=l(()=>{"use strict";I();ku();iS();PV=e=>{let t=Oa(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=fo(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=ce(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=ce(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var bV,_V=l(()=>{"use strict";bV=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var yo,Lie,xie,kV,wV=l(()=>{"use strict";AV();_V();_u();yo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Lie=e=>e.wizard===void 0?"legacy":"wizard",xie=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${yo(t)}">`,o=PV(e),n=bV(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${yo(o.badgeClass)}">${yo(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${yo(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${yo(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${Lie(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${yo(e.id)}">${yo(mo(e.goal))}</a><p class="muted">${yo(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${g}</div></li>`},kV=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>xie(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${yo(s)}</summary>${i}</details>`:i}});var Zv,bS,TV,Iie,Wie,vu,EV,_S=l(()=>{"use strict";Zv=m(require("node:fs")),bS=m(require("node:path"));lt();TV=/^[a-z0-9-]+$/,Iie=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},Wie=(e,t)=>{if(!TV.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let g=Iie(u[2]??"");u[1]==="name"&&g.length>0&&(o=g),u[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},vu=e=>{let t=uo(e);if(!t.ok)return[];let r=bS.default.resolve(t.path,".cursor","skills"),o=[];try{o=Zv.default.readdirSync(r)}catch{return[]}return o.filter(n=>TV.test(n)).flatMap(n=>{let s=bS.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${bS.default.sep}`))return[];try{let i=Wie(Zv.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},EV=(e,t)=>vu(e).find(r=>r.fileName===t)??null});var RV,Oie,vV,CV,LV=l(()=>{"use strict";an();RV=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Oie=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),vV=e=>{if(e.length===0)return`<div class="field">${be("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${RV(r.fileName)}">${RV(r.fileName)}</option>`).join("");return`<div class="field">${be("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${Oie(e)}</script>`},CV=`<script>
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
</script>`});var mt,xV,IV=l(()=>{"use strict";I();uS();du();an();mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),xV=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=mt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=ka({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??lo(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),g=Jh({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",f=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
  <p class="sdlc-block-title">${mt(Y.knobsSectionTitle)}</p>
  <p class="muted">${mt(Y.knobsSectionLede)}</p>
  <div class="field">
    ${be(Y.maxTrialsLabel,"maxTrials")}
    <input class="input" type="number" name="maxTrials" id="sdlc-max-trials" min="1" max="${30}" step="1" value="${r}" data-sdlc-max-trials>
  </div>
  <div class="field">
    ${be(Y.maxSpendUsdLabel,"maxSpendUsd")}
    <input class="input" type="number" name="maxSpendUsd" id="sdlc-max-spend-usd" min="0" step="0.01" value="${o}" placeholder="Optional" data-sdlc-max-spend-usd>
    <p class="muted">${mt(Y.autoConfirmHint)}</p>
  </div>
  <div class="field sdlc-cost-early-stop">
    <label class="sdlc-checkbox-label">
      <input type="checkbox" name="earlyStop" value="on" id="sdlc-early-stop" data-sdlc-early-stop${n}>
      <span>${mt(Y.earlyStopLabel)}</span>
    </label>
    <p class="muted">${mt(Y.earlyStopHint)}</p>
  </div>
  <div class="sdlc-cost-estimate" data-sdlc-cost-estimate>
    <p class="sdlc-block-title">${mt(Y.estimateSectionTitle)}</p>
    <p class="muted">${mt(Y.estimateSectionLede)}</p>
    <dl class="sdlc-cost-proposal sdlc-cost-estimate-proposal">
      <div><dt>${mt(Y.targetTokenLabel)}</dt><dd data-sdlc-target-tokens data-sdlc-proposed-tokens>${a.targetTokenBudget.toLocaleString("en-US")}</dd></div>
      <div><dt>${mt(Y.estimatedSpendLabel)}</dt><dd data-sdlc-estimated-spend>$${a.estimatedSpendUsd.toFixed(4)}</dd></div>
      <div><dt>${mt(Y.rateChipLabel)}</dt><dd><span class="sdlc-cost-rate-chip" data-sdlc-writer-rate-chip data-writer-id="${mt(f)}">$${c.toFixed(4)} / 1k \xB7 ${mt(f)}</span></dd></div>
    </dl>
    <input type="hidden" name="targetTokenBudget" value="${a.targetTokenBudget}" data-sdlc-target-token-budget-input>
    <input type="hidden" name="estimatedSpendUsd" value="${a.estimatedSpendUsd}" data-sdlc-estimated-spend-input>
    <input type="hidden" name="rateUsdPer1kTokens" value="${c}" data-sdlc-cost-rate>
    <p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling${g}>${mt(Y.estimateOverCeilingWarn)}</p>
  </div>
</div>`}});var rt,WV,OV,Mie,MV,jV,NV,DV=l(()=>{"use strict";I();Wv();Me();_u();ku();rt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),WV=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",OV=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,Mie=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},MV=e=>e===O?"You":me(e),jV=e=>{let t=Mie(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":me(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${rt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${rt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${rt(MV(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${rt(MV(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${rt(r)}</dd></div>
    </dl>
  </details>`},NV=e=>{let t=e.wizard;if(t===void 0)return"";let r=mo(e.goal),o=e.status==="wizard_paused",n=!L(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=lS(e),g=OV(t),f=g===null?"":WV(g),y=fo(e),P=f.length===0?"":y===null||y>=4?` <strong>${rt(f)}</strong>`:` <strong>${rt(f)}</strong> (step ${y+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${rt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${rt(u.title)}${P}</p>
    <p class="muted">${rt(u.detail)}</p>
    <div class="actions">
      ${jV(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${rt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=OV(t),i=s===null?"Wizard":WV(s),a=fo(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${rt(r)}</h2>
    <p class="lede">Paused at <strong>${rt(i)}</strong>${rt(c)} (last updated ${rt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${jV(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${rt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Cu,HV,FV=l(()=>{"use strict";an();Cu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),HV=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Cu(n.id)}"${n.id===e.runner?" selected":""}>${Cu(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Cu(e.runner)}">Checking ${Cu(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${be("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${be("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Cu(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var $V,zV=l(()=>{"use strict";$V=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var ja,UV,BV,GV,VV,KV=l(()=>{"use strict";an();ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UV=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${ja(c.id)}"${c.id===r?" selected":""}>${ja(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${ja(n)}</option>`;return`<div class="field">${be(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},BV=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${ja(t)}">Checking ${ja(o)}\u2026</p>`},GV=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${be(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${ja(r)}</textarea><span class="muted">${o}</span></div></details>`,VV=e=>{let t=`<div class="sdlc-writer">${UV("judge","Judge",e.judge,e.writers,"I'll score it")}${BV("judge",e.judge,e.writers)}${GV("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${UV("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${BV("improver",e.improver,e.writers)}${GV("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var qV,JV=l(()=>{"use strict";qV=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var Qv,YV,XV=l(()=>{"use strict";JV();Qv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),YV=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${qV.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${Qv(t.goal)}" title="${Qv(t.goal)}">${Qv(t.label)}</button>`).join("")}</div>`});var Lu,jie,Nie,eC,ZV=l(()=>{"use strict";I();an();Lu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),jie=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},Nie=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,eC=e=>{let t=jie(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Nd(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${be(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Lu(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Lu(e.inputId)}" class="sdlc-pass-range" type="range" name="${Lu(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Lu(a)}"><span class="sdlc-pass-mark" style="left:${Nie(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Lu(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var Hie,tC,ho,QV,eK=l(()=>{"use strict";Au();Fv();lV();dV();$h();pV();gV();yV();SV();wV();_S();LV();an();Gv();IV();DV();_u();FV();zV();KV();I();XV();ZV();Hie=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,tC='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',ho=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QV=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${ho(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${ho(e.skillNotice??"")}</div>`,o=`${WG}${OG}`,n=e.resumableWizardCycle??null,s=n===null?"":NV(n),i=fS(e.cycle),a=e.cycle===null?"":mS(e.cycle),c=e.cycle!==null&&Wr(e.cycle),d=fV(e),u=Hie(d.goal,d.prompt,e.canRun),g=VV({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),f=HV({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y=`${eC({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${eC({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,P=xV({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),h=AR,p=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&L(e.cycle.status),b=d.running&&!S,k=S||b?"":" open",A=b?" sdlc-compose-run-focus":"",E=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,T=S?(()=>{let D=e.cycle!==null?mo(e.cycle.goal):mo(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${ho(D)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${E}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${E}</summary>`,C=S?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",W=c?"waiting":d.running?"running":"idle",j=d.running&&!c?' aria-busy="true"':"",M=`<section class="card sdlc-compose${C}${A}" id="prompt-optimizer-compose">
      <form class="sdlc-form" method="POST" action="/prompt-optimizer" enctype="application/x-www-form-urlencoded">
      <details class="sdlc-compose-details" id="prompt-optimizer-compose-details"${k}>
        ${T}
        <div class="sdlc-compose-details-body">
      <p class="lede">${h} ${ho(e.modelNote)}</p>
        <ol class="sdlc-compose-stepper" aria-label="Compose steps" data-sdlc-compose-stepper>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="1" aria-current="step"><span class="sdlc-compose-stepper-index">1</span><span class="sdlc-compose-stepper-label">Project</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="2"><span class="sdlc-compose-stepper-index">2</span><span class="sdlc-compose-stepper-label">Prompt and goal</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="3"><span class="sdlc-compose-stepper-index">3</span><span class="sdlc-compose-stepper-label">CLI</span></li>
          <li class="sdlc-compose-stepper-item" data-sdlc-stepper-item="4"><span class="sdlc-compose-stepper-index">4</span><span class="sdlc-compose-stepper-label">Summary</span></li>
        </ol>
        <fieldset class="sdlc-fields"${d.running?" disabled":""}>
        ${p}
        <p class="alert-error sdlc-compose-step-error" data-sdlc-compose-step-error hidden role="alert"></p>
        <div class="sdlc-compose-step" data-sdlc-compose-step="1" id="sdlc-compose-step-1">
          <h3 class="sdlc-compose-step-title">Project</h3>
          <p class="muted sdlc-compose-step-lede">Choose the folder writers run in and optionally load a skill into the prompt on the next step.</p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="sdlc-folder">
          <div class="field">
            ${be("Folder","folder")}
            <input class="input" type="text" name="folder" value="${ho(d.folder)}" required onkeydown="if (event.key === 'Enter') event.preventDefault()">
          </div>
          <button class="btn btn-secondary" type="submit" name="intent" value="choose-folder" formnovalidate>Choose folder\u2026</button>
        </div>
        ${vV(vu(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${tC}
            <button type="button" class="btn btn-primary" data-sdlc-compose-continue>Continue</button>
          </div>
        </div>
        <input type="hidden" name="orchestratorSkillFile" value="" data-orchestrator-skill-file>
        <div class="sdlc-compose-step" data-sdlc-compose-step="2" id="sdlc-compose-step-2" hidden>
          <h3 class="sdlc-compose-step-title">Prompt and goal</h3>
          <p class="muted sdlc-compose-orchestrator-note" data-orchestrator-skill-note hidden></p>
          <div class="sdlc-block sdlc-block-flush">
          <div class="field">
            ${be("Goal","goal")}
            ${YV()}
            <textarea class="input textarea" name="goal" rows="4" required>${ho(d.goal)}</textarea>
          </div>
          <div class="field">
            ${be("Prompt","prompt")}
            <textarea class="input textarea" name="prompt" rows="10" required>${ho(d.prompt)}</textarea>
          </div>
          ${y}
          ${P}
        </div>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${tC}
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
        ${$V()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${tC}
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
          <p class="muted sdlc-wizard-limits-callout" data-sdlc-wizard-limits-callout">Wizard: Step 2 pass \u2265 ${ho(d.passScore)}; Step 4 pass \u2265 ${ho(d.modulePassScore)}; up to ${5} scored revisions in Step 2; Step 4 runs one trial per module.</p>
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            <button class="btn btn-primary sdlc-run-wizard-btn" type="submit" name="intent" value="run" data-sdlc-run data-sdlc-run-wizard data-sdlc-run-state="${W}" data-can-run="${u?"true":"false"}"${j}${d.running?" disabled":""}>${x}</button>
          </div>
        </div>
        </div>
        </fieldset>
        </div>
      </details>
      </form>
    </section>`,B=e.history.length>0?hV:"",ie=`${""}${mV}${aV}${cV}${uV}${CV}${B}`;return`${t}${r}${M}${s}${a}${i}${o}${kV(e.history,e.cycle?.id??null)}${ie}`}});var xu,rC=l(()=>{"use strict";eK();xu=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:QV(t)}))}});var tK,rK=l(()=>{"use strict";iV();Ru();rC();vt();Ms();tK=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:sV({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Q(e.storePath,o.cycleId);return je(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(cn(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await xu(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:xr(e.storePath),resumableWizardCycle:null}),!0)}});var oK,kS,oC=l(()=>{"use strict";I();oK=m(require("node:os")),kS=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??oK.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??sr()}}});var nK,Na,nC,sK,iK,Iu=l(()=>{"use strict";I();Me();mv();nK=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Na=e=>{let t=aG(e),r=Ts(e).map(s=>({id:s,label:Ch[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},nC=(e,t,r)=>t===O||t!==null&&e.writers.some(o=>o.id===t)?t:r,sK=(e,t,r,o=null)=>({judge:nC(e,t,e.judge),improver:nC(e,r,e.improver),runner:nC(e,o,e.runner)}),iK=e=>e===zh?{goal:Uh,prompt:Bh}:{goal:"",prompt:""}});var sC,aK=l(()=>{"use strict";sC=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var lK,Fie,cK,dK,uK,pK=l(()=>{"use strict";I();lK=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},Fie=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},cK=(e,t)=>e.has("earlyStop")?!0:t!=="run",dK=e=>{let t=lK(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=Fie(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=lK(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},uK=e=>sr(e)});var mK,gK,wS,iC=l(()=>{"use strict";I();Me();lt();Iu();aK();pK();mK=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=sC(o);return n.ok?String(n.passScore):String(r)},gK=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return sC(n)},wS=e=>{let t=sK(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=mK(e.posted,"passScore",70),o=mK(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",g=e.posted?.get("intent")??"",f=e.posted===null?!0:cK(e.posted,g),y=(T,C)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:T,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:C,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:f});if(e.posted===null)return y(e.defaultFolder??Es,null);let P=e.posted.get("folder")??Es;if(e.posted.get("intent")==="choose-folder"){let T=e.pickFolder();return y(T===null?P:Rt(T),null)}if((e.posted.get("intent")??"")!=="run")return y(P,null);let p=nK(e.goal,e.prompt);if(p!==null)return y(P,p);let S=gK(e.posted,"passScore",r);if(!S.ok)return y(P,S.errorMessage);let b=gK(e.posted,"modulePassScore",o);if(!b.ok)return y(P,b.errorMessage);let k=lG(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(k===null)return y(P,"Choose a judge and an improver.");let A=uo(P);if(!A.ok)return y(P,A.errorMessage);let _=cG(e.installedIds,c,k.judge);if(_===null)return y(P,"Choose a runner for wizard step 4.");let E=dK({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return E.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:k.judge,improver:k.improver,workingDirectory:A.path,passScore:S.passScore,modulePassScore:b.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:_,runnerInstructions:a,costControls:uK(E.knobs)}:y(P,E.errorMessage)}});var Da,ES,$ie,aC,fK,TS,yK,zie,hK,lC,Uie,Bie,Gie,cC,SK,PK,AK=l(()=>{"use strict";Da=m(require("node:fs")),ES=m(require("node:path"));Me();lt();$ie=["remember","choose-folder","run"],aC=()=>({folder:Es,judge:"",improver:"",runner:""}),fK=e=>ES.default.join(ES.default.dirname(e),"prompt-optimizer-preferences.json"),TS=e=>typeof e=="string"?e:"",yK=e=>{let t=fK(e);if(!Da.default.existsSync(t))return aC();try{let r=JSON.parse(Da.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return aC();let o=r,n=TS(o.folder).trim();return{folder:n.length===0?Es:n,judge:TS(o.judge),improver:TS(o.improver),runner:TS(o.runner)}}catch{return aC()}},zie=(e,t)=>{let r=fK(e);Da.default.mkdirSync(ES.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Da.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Da.default.renameSync(o,r)},hK=(e,t)=>e===O||Ts(t).some(r=>r===e),lC=(e,t,r)=>e===null?t:e.length===0?"":hK(e,r)?e:t,Uie=(e,t)=>{if(e===null)return t;let r=uo(e);return r.ok?r.display:t},Bie=e=>{let t=yK(e.storePath),r={folder:Uie(e.folder,t.folder),judge:lC(e.judge,t.judge,e.installedIds),improver:lC(e.improver,t.improver,e.installedIds),runner:lC(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||zie(e.storePath,r)},Gie=e=>{let t=uo(e);return t.ok?t.display:Es},cC=(e,t)=>hK(e,t)?e:"",SK=e=>{let t=yK(e.storePath);return{selection:{...e.selection,judge:cC(t.judge,e.installedIds)||e.selection.judge,improver:cC(t.improver,e.installedIds)||e.selection.improver,runner:cC(t.runner,e.installedIds)||e.selection.runner},defaultFolder:Gie(t.folder)}},PK=e=>{let t=e.posted.get("intent")??"";if(!$ie.includes(t))return;let r=e.posted.get("folder");Bie({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var bK,Vie,Kie,dC,qie,RS,vS=l(()=>{"use strict";bK=m(require("node:os"));Me();qv();Ls();Vie="Reply with the single word ok. Do not use tools.",Kie=45e3,dC=async(e,t)=>{if(t===O)return{ok:!0,message:"You will do this step."};let r=V5(e,t);if(r!==null)return{ok:!0,message:r};let o=await ut({writerAgent:t,prompt:Vie,workingDirectory:bK.default.tmpdir(),timeoutMs:Kie});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${me(t)} is ready.`;return K5(e,t,n),{ok:!0,message:n}},qie=e=>[...new Set(e.filter(t=>t.length>0))],RS=async(e,t,r,o)=>{for(let n of qie([t,r,o??""])){let s=await dC(e,n);if(!s.ok)return s.message}return null}});var uC,_K=l(()=>{"use strict";I();uC=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!L(r.status)&&!(t!==null&&r.id===t))return r;return null}});var kK,wK=l(()=>{"use strict";Wt();I();du();Ru();oC();iC();rC();vt();lt();AK();_S();vS();_K();gS();Ms();kK=async e=>{let t=e.posted===null?SK({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=wS({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>qo("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(PK({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Rt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await RS(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await xu(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Rt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:xr(e.route.storePath),resumableWizardCycle:uC(xr(e.route.storePath),null)});return}if(r.kind==="start"){let s=EV(r.workingDirectory,r.sourceSkillFile),i=qh(ou({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=kS({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:IR({...zd(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,a),je(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(cn(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Q(e.route.storePath,e.cycleId);n!==null&&(n=Ws(e.route.storePath,n),je(e.route.storePath,n.id)),await xu(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:xr(e.route.storePath),resumableWizardCycle:uC(xr(e.route.storePath),n?.id??null)})}});var TK,EK=l(()=>{"use strict";vt();TK=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";UG(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var RK,vK=l(()=>{"use strict";RK=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var CK,LK=l(()=>{"use strict";YG();oV();rK();wK();EK();Iu();vK();Ms();CK=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await PS(),o=Na(r),n=e.method==="POST"?RK(e.request.headers["content-type"],await e.readBody(e.request)):null;if(rV({posted:n,storePath:e.storePath,response:e.response})||await tK(e,n,o))return;let s=iK(t.searchParams.get("example")),i=TK({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=JG({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await kK({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:qG(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var Jie,xK,IK=l(()=>{"use strict";I();vt();Jie=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",xK=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Q(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!L(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=WR({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${Jie(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var WK,OK=l(()=>{"use strict";Ru();vt();WK=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Q(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":cn(e.storePath,o)),!0}});var Yie,MK,jK=l(()=>{"use strict";Me();vS();Yie=["claude-cli","codex","cursor","antigravity"],MK=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===O||Yie.includes(t)?await dC(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var NK,DK=l(()=>{"use strict";I();NK=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Hd,page:Fd,context:Sa,installedWriters:e,post:{method:"POST",url:Hd,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this computer",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Hd}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var CS,HK=l(()=>{"use strict";I();Hv();va();CS=e=>{let t=e.revisions[e.revisions.length-1]??null,r=Se(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=L(e.status),n=e.errorKind??null,s=pS({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:po(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Sa,page:`${Fd}?cycle=${encodeURIComponent(e.id)}`}}});var K,Xie,FK,$K,zK=l(()=>{"use strict";K=m(li());I();Xie=(0,K.isType)({goal:K.isString,prompt:K.isString,workingDirectory:K.isString,judge:(0,K.isUndefinedOr)(K.isString),improver:(0,K.isUndefinedOr)(K.isString),passScore:(0,K.isUndefinedOr)(K.isNumber),maxRounds:(0,K.isUndefinedOr)(K.isNumber),maxTrials:(0,K.isUndefinedOr)(K.isNumber),maxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),earlyStop:(0,K.isUndefinedOr)(K.isBoolean),earlyStopFlatRounds:(0,K.isUndefinedOr)(K.isNumber),confirmedTokenBudget:(0,K.isUndefinedOr)(K.isNumber),confirmedMaxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),rateUsdPer1kTokens:(0,K.isUndefinedOr)(K.isNumber)}),FK=e=>{let t=e?.trim()??"";return t.length===0?null:t},$K=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return Xie(t)?t.workingDirectory.trim().length===0?{ok:!1,error:fh}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:FK(t.judge),improver:FK(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:fh}}});var So,Zie,UK,BK,GK=l(()=>{"use strict";I();So=m(li()),Zie=(0,So.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:So.isNumber,confirmedMaxSpendUsd:(0,So.isUndefinedOr)(So.isNumber),rateUsdPer1kTokens:(0,So.isUndefinedOr)(So.isNumber)}),UK=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:Zie(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},BK=(e,t)=>{let r=co({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var Qie,VK,KK=l(()=>{"use strict";I();Me();iC();Iu();Qie=e=>e.map(t=>t.id).join(", "),VK=e=>{let t=Na(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===O||n===O)return{ok:!1,error:PR,installedWriters:t.writers};if(o===null||n===null){let a=Qie(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this computer.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=wS({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var eae,qK,JK=l(()=>{"use strict";I();oC();DK();HK();Iu();zK();GK();KK();vt();eae=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},qK=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Q(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this computer."}}:{status:200,body:CS(u)}}let r=await e.handlers.readInstalledIds(),o=Na(r);if(e.method==="GET")return{status:200,body:NK(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=UK(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let g=Q(e.storePath,t);if(g===null)return{status:404,body:{ok:!1,error:"That run is not on this computer."}};let f=BK(g,u.body);return f.ok?(z(e.storePath,f.cycle),{status:200,body:CS(f.cycle)}):{status:400,body:{ok:!1,error:f.error}}}let n=eae(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=ka({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=$K(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=VK({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=ou({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:Et({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=co({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=kS({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:zd(i.prompt),runnerModel:i.runner,costControls:c});return z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:CS(d)}}});var YK,XK=l(()=>{"use strict";Ms();vS();JK();YK=async e=>{let t=await qK({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:PS,readWritersReady:RS,startCycle:je}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var QK,tae,rae,ZK,oae,eq,tq=l(()=>{"use strict";QK=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],tae=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},rae=e=>{let t={};for(let n of e)for(let s of new Set(QK(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},ZK=(e,t)=>{let r=tae(QK(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},oae=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},eq=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=rae(e.map(i=>i.text)),s=ZK(o,n);return e.map(i=>({id:i.id,score:oae(s,ZK(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var pC,nae,sae,rq,iae,aae,lae,cae,mC,gC=l(()=>{"use strict";pC=m(require("node:path"));lt();tq();_S();nae=5,sae=20,rq=280,iae=e=>[e.name,e.description,e.promptText].join(`
`),aae=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=rq?t:`${t.slice(0,rq-3)}...`},lae=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),cae=e=>e===void 0||!Number.isFinite(e)?nae:Math.min(sae,Math.max(1,Math.floor(e))),mC=e=>{let t=e.query.trim(),r=cae(e.limit),o=uo(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=vu(o.path),s=eq(n.map(d=>({id:d.fileName,text:iae(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=pC.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:pC.default.join(a,u.fileName,"SKILL.md"),excerpt:aae(u),source:"filesystem"}]});return{query:t,hits:c,context:lae(c)}}});var oq,nq=l(()=>{"use strict";gC();oq=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:mC({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var sq,iq=l(()=>{"use strict";nq();sq=async e=>{let t=oq({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var dae,fC,aq=l(()=>{"use strict";NG();LK();IK();OK();jK();XK();iq();dae=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},fC=async e=>{let t=dae(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await YK(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await sq(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:jG()})),!0):(await MK({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||xK({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||WK({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await CK(e),!0)}});var lq=l(()=>{"use strict";aq();gC();Ls()});var yC,hC,SC=l(()=>{"use strict";yC="2025-03-26",hC={name:"agent-witch",version:"1.0.0"}});var Ha,LS,cq,uae,Wu,dq=l(()=>{"use strict";SC();Ha=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),LS=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),cq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,uae=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return Ha(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return Ha(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return LS(e,i)}catch(i){try{r.onToolError?.(n,i)}catch{}return Ha(e,-32603,`Tool ${n} failed`)}},Wu=async(e,t,r)=>{let o=cq(e);if(o===null)return Ha(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?Ha(n,-32600,"Invalid Request"):s==="initialize"?LS(n,{protocolVersion:yC,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?LS(n,{}):s==="tools/list"?LS(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?uae(n,cq(o.params),t,r):Ha(n,-32601,"Method not found")}});var PC,uq=l(()=>{"use strict";PC=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var xS=l(()=>{"use strict";dq();uq();SC()});var pae,dn,IS=l(()=>{"use strict";id();xS();pae=(e,t)=>{let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] mcp tool ${e} failed: ${r}
`)},dn=e=>{let t=Xo({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:hC,tools:[{definition:py,call:r=>PC(JSON.stringify(t(r)))}],onToolError:e.logToolError??pae}}});var pq,mae,gae,mq,gq=l(()=>{"use strict";xS();IS();pq=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},mae=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}await t(u)}},gae=async(e,t)=>{await mae(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await Wu(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&pq(t.stdout,s);return}pq(t.stdout,s)})},mq=async e=>{await gae(dn({layout:e.layout,isDeclined:e.isDeclined}),e.streams??{stdin:process.stdin,stdout:process.stdout})}});var fae,WS,fq=l(()=>{"use strict";xS();IS();fae="/mcp",WS=async e=>{if(e.pathname!==fae)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??dn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await Wu(t,r,void 0)),!0}});var yq={};St(yq,{createAwlMcpServer:()=>dn,runAwlMcpStdio:()=>mq,tryHandleAwlMcpHttpRequest:()=>WS});var AC=l(()=>{"use strict";IS();gq();fq()});var js,Ou,yae,hae,Sae,Pae,hq,Sq=l(()=>{"use strict";js=m(require("node:fs")),Ou=m(require("node:path")),yae="prompt-optimizer-cycles.json",hae="prompt-optimizer-preferences.json",Sae="prompt-sdlc-cycles.json",Pae="prompt-sdlc-preferences.json",hq=e=>{let t=Ou.default.join(e,yae),r=Ou.default.join(e,Sae);if(js.default.existsSync(t)||!js.default.existsSync(r))return t;try{js.default.renameSync(r,t)}catch{return r}let o=Ou.default.join(e,Pae),n=Ou.default.join(e,hae);if(js.default.existsSync(o)&&!js.default.existsSync(n))try{js.default.renameSync(o,n)}catch{}return t}});var Fa,Aae,bC,Pq=l(()=>{"use strict";Fa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Aae=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],bC=e=>{let t=Aae.map(i=>`<option value="${Fa(i.value)}">${Fa(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this computer on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Fa(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Fa(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Fa(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
          <input class="input mono" type="text" name="projectFolder" value="${Fa(e.defaultWorkspace)}" placeholder="/path/to/repo" />
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
    </section>`}});var Mu,_q,bae,kq,_ae,kae,wq,MS,Aq,bq,wae,Tae,Po,ju,OS,Eae,jS,_C,Rae,kC,Tq,wC,Eq,vae,Cae,Lae,Rq,vq,Cq,Nu=l(()=>{"use strict";Mu=m(require("node:fs")),_q=m(require("node:path")),bae="estimate-history.ndjson",kq=100,_ae=500,kae=2e4,wq=e=>_q.default.join(e,bae),MS=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,_ae),Aq=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,kae),bq=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,wae=e=>({...e,estimateTokens:bq(e.estimateTokens),actualTokens:bq(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),Tae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Po=e=>{let t=wq(e);return Mu.default.existsSync(t)?Mu.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return Tae(n)?[wae(n)]:[]}catch{return[]}}):[]},ju=(e,t)=>{Mu.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Mu.default.writeFileSync(wq(e),r,"utf8")},OS=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),Eae=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this computer. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${OS(o.task)} | ${OS(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},jS=e=>{let t=Po(e.reportsDir),r=MS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);ju(e.reportsDir,[...s,n])},_C=e=>{let t=Po(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?MS(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);ju(e.reportsDir,[...i,s])},Rae=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-kq),kC=e=>[...Po(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),Tq=e=>{let t=Po(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=Aq(e.input),n=Aq(e.output),s=MS(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);ju(e.reportsDir,[...c,a])},wC=(e,t)=>{let r=Po(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},Eq=e=>({table:Eae(Rae(Po(e))),embedding:null}),vae=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},Cae=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-kq),Lae=e=>{let t=vae(Cae(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${OS(s.task)} | ${OS(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},Rq=e=>{let t=Po(e.reportsDir),r=MS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);ju(e.reportsDir,[...s,n])},vq=e=>{let t=Po(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);ju(e.reportsDir,[...s,n])},Cq=e=>Lae(Po(e))});var Lq=l(()=>{"use strict";Nu()});var Ao,TC,xae,EC,Iae,Wae,NS,DS,Oae,RC,xq=l(()=>{"use strict";Lq();dv();Ao=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),TC=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},xae=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${TC(-r)} under`:`${TC(r)} over`},EC=e=>e.toLocaleString("en-US"),Iae=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${EC(-r)} under`:`${EC(r)} over`},Wae=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},NS=e=>e===null?"\u2014":TC(e),DS=e=>e===null?"\u2014":EC(e),Oae=`(function () {
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
})();`,RC=e=>{let r=kC(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":xae(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":Iae(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${Ao(Wae(i))}</button></td>
        <td>${Ao(c)}</td>
        <td>${NS(n.estimateSeconds)}</td>
        <td>${NS(n.actualSeconds)}</td>
        <td>${Ao(d)}</td>
        <td>${DS(n.estimateTokens)}</td>
        <td>${DS(n.actualTokens)}</td>
        <td>${Ao(u)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${Ao(c)}</p>
        <h2>Input</h2>
        <pre>${Ao(i)}</pre>
        <h2>Output</h2>
        <pre>${Ao(a)}</pre>
        <p>Time: estimated ${NS(n.estimateSeconds)} \xB7 actual ${NS(n.actualSeconds)} \xB7 ${Ao(d)}</p>
        <p>Tokens: estimated ${DS(n.estimateTokens)} \xB7 actual ${DS(n.actualTokens)} \xB7 ${Ao(u)}</p>
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
            ${jh({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${Oae}</script>`}
    </section>`}});var Iq=l(()=>{"use strict";Pq();xq()});var $a,Mae,jae,vC,Wq=l(()=>{"use strict";$a=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Mae=(e,t,r)=>{let o=$a(t),n=$a(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},jae=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${$a(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>Mae(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${$a(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${$a(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${$a(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},vC=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(jae).join(""):'<section class="card"><p class="muted">No writer sessions stored on this computer yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var Oq=l(()=>{"use strict";Wq()});var Du,Mq,jq,CC,LC,xC,Nq=l(()=>{"use strict";Du=m(require("node:fs")),Mq=m(require("node:path"));Rd();th();jq=(e,t,r)=>ua({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,CC=(e,t,r)=>{let o=jq(e,t,r);if(o===null)return[];if(!Du.default.existsSync(o))return[];let n=Du.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},LC=e=>{let t=jq(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:so(e.entry.prompt),output:so(e.entry.output)};Du.default.mkdirSync(Mq.default.dirname(t),{recursive:!0}),Du.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},xC=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Nae,Dae,Hu,HS,IC=l(()=>{"use strict";Nae=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Dae=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Hu=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=Nae(i.assistantOutput),d=c.length>0?`Assistant: ${Dae(c,t)}`:null,u=[a,d].filter(g=>g!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},HS=e=>{let t=e.userMessage.trim(),r=Hu({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Mr,Fu,MC,Hae,Fae,WC,$ae,jC,FS,Dq,Hq,zae,za,NC,OC,Fq,Uae,$q,Ua,$S,$u,Bae,zu,DC,zS,US,zq=l(()=>{"use strict";Mr=m(require("node:fs")),Fu=m(require("node:path")),MC=require("node:crypto");IC();Hae="writer-sessions",Fae="active-index.json",WC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$ae=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",jC=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},FS=e=>{let t=Fu.default.join(e.installDir,Hae);return Mr.default.mkdirSync(t,{recursive:!0}),t},Dq=e=>Fu.default.join(FS(e),Fae),Hq=(e,t)=>Fu.default.join(FS(e),`${t}.canonical.json`),zae=(e,t)=>Fu.default.join(FS(e),`${t}.continuation.json`),za=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,NC=e=>{let t=Dq(e);if(!Mr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Mr.default.readFileSync(t,"utf8"));if(!WC(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!WC(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!$ae(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},OC=(e,t)=>{Mr.default.writeFileSync(Dq(e),JSON.stringify(t,null,2))},Fq=(e,t)=>{Mr.default.writeFileSync(Hq(e,t.sessionId),JSON.stringify(t,null,2))},Uae=(e,t)=>{Mr.default.writeFileSync(zae(e,t.sessionId),JSON.stringify(t,null,2))},$q=(e,t)=>{let r=Hu({turns:t.turns});Uae(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ua=(e,t)=>{let r=Hq(e,t);if(!Mr.default.existsSync(r))return null;try{let o=JSON.parse(Mr.default.readFileSync(r,"utf8"));return!WC(o)||typeof o.sessionId!="string"?null:o}catch{return null}},$S=(e,t=20)=>{let r=FS(e),o=Mr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ua(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},$u=(e,t,r)=>{let o=jC(r);return NC(e).entries.find(i=>za(i)===za({writerAgent:t,projectFolderPath:o}))?.sessionId??null},Bae=(e,t,r,o)=>{let n=NC(e),s=za({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>za(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];OC(e,{entries:i})},zu=(e,t,r)=>{let o=(0,MC.randomUUID)(),n=new Date().toISOString(),s=jC(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return Fq(e,i),$q(e,i),Bae(e,t,s,o),o},DC=(e,t,r)=>{let o=$u(e,t,r);return o!==null?o:zu(e,t,r)},zS=(e,t,r)=>{let o=jC(r),n=NC(e);if(o===null&&r===void 0){OC(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=za({writerAgent:t,projectFolderPath:o});OC(e,{entries:n.entries.filter(i=>za(i)!==s)})},US=e=>{let t=DC(e.layout,e.writerAgent,e.projectFolderPath),r=Ua(e.layout,t);if(r===null)return;let o={id:(0,MC.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};Fq(e.layout,n),$q(e.layout,n)}});var Gae,Vae,BS,HC,Uq=l(()=>{"use strict";Gae=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",Vae=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},BS=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",HC=e=>{let t=BS(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=Gae(r,e.userPromptCharacterCount),n=Vae({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var GS=l(()=>{"use strict";Nq();zq();IC();Uq()});var Bq=l(()=>{"use strict";ef();Ni();nk()});var Gq=l(()=>{"use strict";I_()});var gt,qae,Jae,FC,$C,zC,Vq=l(()=>{"use strict";Bq();Gq();gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qae=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},Jae=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Rc(o);return`value="${gt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${gt(r)}"`},FC=(e,t,r,o,n)=>{let s=tf[t];return`<label class="field">
          <span class="field-label">${gt(o)} API key \u2014 ${gt(qae(e,t))} \xB7 <a class="field-link" href="${gt(s.href)}" target="_blank" rel="noopener noreferrer">${gt(s.label)}</a></span>
          <input class="input mono" type="password" name="${gt(r)}" autocomplete="off" ${Jae(e,t,n)} />
        </label>`},$C=(e,t,r,o)=>{let n=Vg(e[t]?.model),s=new Set(Gg[t].map(c=>c.value)),i=Gg[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${gt(c.value)}"${d}>${gt(c.label)}</option>`}).join(""),a=n!==Yn&&!s.has(n)?`<option value="${gt(n)}" selected>${gt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${gt(o)}</span>
          <select class="input mono" name="${gt(r)}">${i}${a}</select>
        </label>`},zC=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${gt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
      <p class="eyebrow">Writer</p>
      <h1>API keys (optional)</h1>
      <p class="lede">Run Claude, Codex, or Antigravity tasks with provider HTTP APIs instead of installing their CLIs on this computer. Keys stay in <span class="mono">writer-api-secrets.json</span> on this machine only.</p>
      <form class="task-form" method="POST" action="/writer-api">
        <fieldset class="field">
          <span class="field-label">Execution</span>
          <label><input type="radio" name="writerExecutionBackend" value="cli"${r} /> Local CLI (default)</label>
          <label><input type="radio" name="writerExecutionBackend" value="api"${o} /> API key + Agent Witch script</label>
        </fieldset>
        <p class="muted">Maps: Claude \u2192 Anthropic, Codex \u2192 OpenAI, Antigravity \u2192 Google Gemini. Cursor still requires CLI or Cursor Cloud on the website.</p>
        ${FC(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${$C(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${FC(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${$C(e.secrets,"openai","openaiModel","OpenAI model")}
        ${FC(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${$C(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var Kq=l(()=>{"use strict";Vq()});var VS,qq,Jq=l(()=>{"use strict";VS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qq=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${VS(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in Agent Witch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">Nothing installed yet. Install playbooks in Agent Witch Cloud \u2014 files land in your profile harness on this computer. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${VS(s.name)}</strong> <span class="muted mono">(${VS(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${VS(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from Agent Witch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var Yae,Yq,Xq,Zq=l(()=>{"use strict";Yae=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,Yq=e=>e.kind==="folder",Xq=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&Yq(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(Yq(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(Yae)};return r(t)}});var Qq,UC,eJ=l(()=>{"use strict";Qq=m(require("node:path")),UC=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${UC(r.children,t)}</ul>
            </details>
          </li>`;let o=Qq.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var tJ,un,Xae,Zae,Uu,Qae,BC,rJ=l(()=>{"use strict";ih();tJ=m(require("node:path"));Jq();Zq();eJ();un=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Xae=()=>`(() => {
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
      "Folder picker is only available on the computer that runs Agent Witch. Type the folder path instead.";
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

})();`,Zae=()=>`(() => {
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
})();`,Uu=e=>{let t=Id({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in Agent Witch Cloud",body:"Install and update playbooks in the browser; this computer keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=qq({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${un(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${un(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':Qae(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
        <p class="muted">Advanced: pull rules from an existing folder on disk (does not replace installing from Agent Witch Cloud).</p>
        <div class="actions">
          <a class="btn btn-secondary" href="/harness?import=1">Import from folder\u2026</a>
        </div>
      </section>`:"",d=a?"":`<section class="card">
      <p class="eyebrow">Advanced</p>
      <h1>Import from disk</h1>
      <p class="lede">Scan a folder for existing <code>.cursor</code> rules and copy them into the profile harness on this computer. Prefer installing playbooks from Agent Witch Cloud when possible.</p>
      <div class="stack">
        <label class="field">
          <span class="field-label">Scan folder (required)</span>
          <input class="input" id="scanFolder" name="scanFolder" type="text" value="${un(e.scanFolder)}" placeholder="~" autocomplete="off" data-last-reveal-scan="${un(s)}" />
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
    <script>${Xae()}</script>
    <script>${Zae()}</script>`;return`${t}${r}${o}${c}${d}`},Qae=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=Xq(a.items.map(f=>({...f,relativePath:typeof f.relativePath=="string"&&f.relativePath.length>0?f.relativePath:tJ.default.relative(a.sourceRoot,f.sourcePath).replaceAll("\\","/")}))),u=UC(d,un),g=a.items.length;return`<div class="harness-set-block">
              <label class="check-row harness-set-include">
                <input type="checkbox" name="includeSet" value="${c}" />
                Include in submit
              </label>
              <input type="hidden" name="setSlug-${c}" value="${un(a.proposedSlug)}" />
              <input type="hidden" name="setGroupIndex-${c}" value="${s}" />
              <p class="muted mono">${un(a.sourceRoot)}</p>
              <details class="harness-tree-root">
                <summary class="harness-tree-root-summary">${g} file(s)</summary>
                <ul class="harness-tree harness-tree-root-list">${u}</ul>
              </details>
            </div>`}).join("");return`<section class="card harness-group">
          <label class="field harness-group-name-field">
            <span class="field-label">Name before upload</span>
            <input class="input harness-group-title-input" type="text" name="groupLabel-${s}" value="${un(o)}" autocomplete="off" />
          </label>
          ${i}
        </section>`}).join("");return`<form method="POST" action="/harness/submit">
      <input type="hidden" name="setCount" value="${e.sets.length}" />
      ${r}
      <p class="muted">Click a file path to expand its contents (view only). Check <strong>Include in submit</strong> on the sets you want. After submit, your manifest is reported to cloud when the bridge is connected.</p>
      <div class="actions">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>`},BC=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??u??a,f=t.sets[i];if(f===void 0)continue;let y=a.length>0?a:f.proposedSlug,P=g.length>0?g:f.proposedName,h=r.has(i),p=f.items.map(S=>({id:S.id,kind:S.kind,title:S.title,sourcePath:S.sourcePath,include:h}));s.push({slug:y,name:P,items:p})}return s}});var oJ=l(()=>{"use strict";rJ()});var ele,GC,nJ=l(()=>{"use strict";It();ele=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},GC=ele});var tle,sJ,iJ=l(()=>{"use strict";It();tle=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},sJ=tle});var aJ,rle,lJ,cJ=l(()=>{"use strict";aJ={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:"This project has 64 active pitfalls. Retire one, then try again."},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"Agent Witch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach Agent Witch Cloud. Check this computer on Status, then try again."}},rle=e=>e!==null&&Object.prototype.hasOwnProperty.call(aJ,e)?aJ[e]:null,lJ=rle});var dJ=l(()=>{"use strict"});var Ns,ole,VC,uJ=l(()=>{"use strict";ih();hw();Ns=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ole=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,VC=e=>{let t=e.flashError?`<div class="alert-error">${Ns(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ns(e.flashMessage)}</div>`:"",r=Id({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in Agent Witch Cloud",body:"Projects are created in the browser. This page chooses their folders on this computer and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in Agent Witch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Ns(ole(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Ns(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=Bf(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from Agent Witch Cloud? The folder on this computer stays.');">
                  <input type="hidden" name="projectId" value="${Ns(n.id)}" />
                  <button class="btn btn-danger btn-compact" type="submit">Delete</button>
                </form>`;return`<li class="project-list-item">
                <a class="project-list-link" href="/project?id=${encodeURIComponent(n.id)}">
                  <strong>${Ns(n.name)}</strong>
                  <span class="muted mono">${Ns(n.projectFolderPath)}</span>
                  ${i}
                </a>
                <div class="actions">${c}${a}${u}${g}</div>
              </li>`}).join("")}</ul>`;return`${t}${r}<section class="card">
      <p class="eyebrow">Repositories</p>
      <h1>Projects on this computer</h1>
      <p class="lede">Synced from Agent Witch Cloud for this paired computer only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var pJ=l(()=>{"use strict";dJ();qf();uJ()});var KS,mJ=l(()=>{"use strict";KS=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var gJ,lr,KC=l(()=>{"use strict";gJ=m(require("node:path"));At();He();G();ee();ow();lr=e=>{let t=$()?.layout.installDir??v();if(gJ.default.basename(t)===ur)return Pt;let r=$(),o=r!==null?$e(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Pt}});var qC,fJ=l(()=>{"use strict";Pr();KC();qC=async e=>{let t=Fe(e.installDir),r=t?.bundleVersion??null,o=lr(t);try{let n=await Li(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:$n(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var JC,yJ=l(()=>{"use strict";JC=e=>!e});var YC,Ba,XC=l(()=>{"use strict";G();YC=()=>`http://127.0.0.1:${pi()}/update/run`,Ba=async e=>{try{let t=await fetch(YC(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var nle,hJ,ZC,SJ=l(()=>{"use strict";G();ae();XC();nle=()=>{Br({launchAgentLabel:ye(),installDir:v()})},hJ=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},ZC=async()=>{nle();let e=await Ba({force:!0});if(e.ok)return{ok:!0,message:hJ(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:hJ(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Pr(),Ej)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var QC=l(()=>{"use strict";KE();mJ();KC();fJ();yJ();SJ();XC()});var PJ,AJ=l(()=>{"use strict";PJ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var bJ,_J,eL,tL,kJ=l(()=>{"use strict";bJ=require("node:crypto"),_J=m(require("node:fs"));Wt();ee();ee();AJ();eL=!1,tL=async e=>{if(eL)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!PJ(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"Agent Witch is not configured."};let o=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&_J.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,bJ.randomUUID)();eL=!0;try{if(await nw(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Hi({...r,workspace:n},e.writerAgent,t);return await Jc(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{eL=!1}}});var wJ=l(()=>{"use strict";kJ()});var Bu,rL=l(()=>{"use strict";Bu=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var cr,Ee,pn,Ds,TJ,mn,Re,qS,JS,EJ,YS,XS,ZS,oL,oe=l(()=>{"use strict";cr="history",Ee="skills",pn="_drafts",Ds="_tombstones",TJ="state.json",mn="meta.json",Re="skillgen",qS="episodes.json",JS="budget.json",EJ="metrics.jsonl",YS="SKILL.md",XS="meta.json",ZS="learned-pitfalls.json",oL="flags.json"});var Hs,vJ,ft,ve,Nt=l(()=>{"use strict";Hs=m(require("node:fs")),vJ=m(require("node:path"));oe();ft=e=>{Hs.default.mkdirSync(e,{recursive:!0,mode:448});try{Hs.default.chmodSync(e,448)}catch{}},ve=(e,t)=>{ft(vJ.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;Hs.default.writeFileSync(r,t,{mode:384});try{Hs.default.chmodSync(r,384)}catch{}Hs.default.renameSync(r,e);try{Hs.default.chmodSync(e,384)}catch{}}});var Fs,X,ge,ne=l(()=>{"use strict";Fs=m(require("node:path"));G();rL();Nt();oe();X=e=>{if(!Bu(e))throw new Error("invalid_project_id");let t=N();return Fs.default.join(t.projectDataDir,e)},ge=e=>{let t=X(e);ft(t),ft(Fs.default.join(t,cr));let r=Fs.default.join(t,Ee);return ft(r),ft(Fs.default.join(r,pn)),ft(Fs.default.join(r,Ds)),ft(Fs.default.join(t,Re)),t}});var nL,sL,QS=l(()=>{"use strict";nL=/^[a-z0-9][a-z0-9_-]{0,63}$/,sL="sha256:"});var CJ,ot,Gu=l(()=>{"use strict";CJ=require("node:crypto");QS();ot=e=>`${sL}${(0,CJ.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var $s,Vu=l(()=>{"use strict";QS();$s=e=>nL.test(e)});var Ku,eP=l(()=>{"use strict";Ku=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var iL,aL=l(()=>{"use strict";iL=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var lL,cL=l(()=>{"use strict";Vu();lL=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>$s(r.skillId))}catch{return[]}}});var dL,uL=l(()=>{"use strict";dL=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var pL,mL=l(()=>{"use strict";Gu();pL=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:ot(t.body)===t.contentHash?t:null}catch{return null}}});var gL,fL=l(()=>{"use strict";Gu();Vu();gL=async e=>{if(!$s(e.skillId))return{ok:!1,code:"unavailable"};let t=ot(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var yL,hL=l(()=>{"use strict";Vu();yL=async e=>{if(!$s(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var SL,PL=l(()=>{"use strict";Gu();eP();mL();fL();SL=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await pL({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(Ku({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||ot(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await gL({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var AL,bL=l(()=>{"use strict";eP();hL();AL=async e=>Ku({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await yL({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var qu,tP,LJ=l(()=>{"use strict";aL();cL();uL();PL();bL();qu="[project-skill-pull-mirror]",tP=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await iL({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await dL({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(qu,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await SL({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(u){console.warn(qu,"skill_failed",d.skillId,u),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await lL({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await AL({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(u){console.warn(qu,"orphan_tombstone_failed",d.skillId,u),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(qu,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(qu,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var zs=l(()=>{"use strict";QS();Gu();Vu();eP();aL();cL();uL();mL();fL();hL();PL();bL();LJ()});var Us,Ju,sle,ile,kL,wL=l(()=>{"use strict";Us=m(require("node:fs")),Ju=m(require("node:path"));Nt();zs();oe();ne();sle=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),ile=e=>`v${String(e).padStart(4,"0")}.md`,kL=e=>{if(!sle(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=ge(e.projectId),r=Ju.default.join(t,Ee,e.skillId),o=Ju.default.join(r,ile(e.version)),n=Ju.default.join(r,mn),s=ot(e.body);if(Us.default.existsSync(o)&&Us.default.existsSync(n))try{let a=JSON.parse(Us.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&Us.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}ve(o,e.body),ve(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=Ju.default.join(t,Ee,Ds,`${e.skillId}.json`);return Us.default.existsSync(i)&&Us.default.unlinkSync(i),{path:o,contentHash:s}}});var Yu,rP,TL,EL=l(()=>{"use strict";Yu=m(require("node:fs")),rP=m(require("node:path"));zs();oe();ne();TL=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=X(e.projectId)}catch{return null}let r=rP.default.join(t,Ee,e.skillId),o=rP.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=rP.default.join(r,mn);if(!Yu.default.existsSync(o)||!Yu.default.existsSync(n))return null;try{let s=Yu.default.readFileSync(o,"utf8"),i=JSON.parse(Yu.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||ot(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var bo,gn,xJ,ale,RL,vL,CL=l(()=>{"use strict";bo=m(require("node:fs")),gn=m(require("node:path"));Nt();oe();ne();xJ=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),ale=(e,t)=>{if(!bo.default.existsSync(e))return;let r=`.${t}.`;for(let o of bo.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=gn.default.join(e,o);try{bo.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},RL=e=>{if(!xJ(e.skillId))throw new Error("invalid_project_skill_id");let t=ge(e.projectId),r=gn.default.join(t,Ee),o=gn.default.join(r,e.skillId),n=!1;if(bo.default.existsSync(o)){let c=gn.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{bo.default.renameSync(o,c),bo.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}ale(r,e.skillId);let s=gn.default.join(r,Ds);ft(s);let i=gn.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return ve(i,`${JSON.stringify(a)}
`),{removed:n}},vL=e=>{if(!xJ(e.skillId))return null;let t;try{t=X(e.projectId)}catch{return null}let r=gn.default.join(t,Ee,Ds,`${e.skillId}.json`);if(!bo.default.existsSync(r))return null;try{let o=JSON.parse(bo.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var Xu,LL,xL,IL=l(()=>{"use strict";Xu=m(require("node:fs")),LL=m(require("node:path"));oe();ne();xL=e=>{let t;try{t=X(e.projectId)}catch{return[]}let r=LL.default.join(t,Ee);if(!Xu.default.existsSync(r))return[];let o=[];for(let n of Xu.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=LL.default.join(r,n,mn);if(Xu.default.existsSync(s))try{let i=JSON.parse(Xu.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var WL,IJ,OL,ML=l(()=>{"use strict";WL=m(require("node:fs")),IJ=m(require("node:path"));Nt();oe();ne();OL=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))throw new Error("invalid_message_id");let r=ge(e.projectId),o=IJ.default.join(r,cr,`${t}.json`);if(WL.default.existsSync(o))try{let s=JSON.parse(WL.default.readFileSync(o,"utf8"));if(s.messageId===t)return s}catch{}let n={messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString()};return ve(o,`${JSON.stringify(n)}
`),n}});var Zu,WJ,OJ,Va,oP,jL,Ka=l(()=>{"use strict";Zu=m(require("node:fs")),WJ=m(require("node:path"));Nt();oe();ne();G();OJ=e=>WJ.default.join(X(e),cr,TJ),Va=e=>{try{let t=OJ(e);if(!Zu.default.existsSync(t))return null;let r=JSON.parse(Zu.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},oP=e=>{ge(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return ve(OJ(e.projectId),`${JSON.stringify(t)}
`),t},jL=()=>{let t=N().projectDataDir;if(!Zu.default.existsSync(t))return[];let r=[];for(let o of Zu.default.readdirSync(t)){if(!Bu(o))continue;let n=Va(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var MJ,jJ=l(()=>{"use strict";It();MJ=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[le]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var Qu,NJ,lle,NL,DJ=l(()=>{"use strict";Xr();ee();Ka();jJ();ML();Qu="[project-history-dispatch]",NJ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),lle=()=>{let e=$();return e===null?null:V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},NL=async e=>{if(!NJ(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!NJ(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{OL({projectId:t,messageId:o,message:r}),oP({projectId:t,state:"on_ready"})}catch(s){console.error(Qu,"write_failed",t,o,s);try{oP({projectId:t,state:"degraded"})}catch(i){console.error(Qu,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?lle():e.cloudApi;if(n===null)return console.error(Qu,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await MJ({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(Qu,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(Qu,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var nt=l(()=>{"use strict"});var DL,HL=l(()=>{"use strict";IL();Ka();EL();ne();CL();wL();DL=()=>({isHistoryEnabled:e=>{let t=Va(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>X(e),writeProjectSkillVersion:e=>kL(e),readProjectSkillVersion:e=>TL(e),tombstoneProjectSkill:e=>RL(e),readProjectSkillTombstone:e=>vL(e),listProjectSkillIds:e=>xL(e)})});var HJ,FL,$L=l(()=>{"use strict";It();HJ=e=>({[le]:e,Accept:"application/json"}),FL=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:HJ(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:HJ(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var zL,UL=l(()=>{"use strict";nt();zL=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var BL,GL=l(()=>{"use strict";nt();BL=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(u=>u.createdAtMs)),i=n.length>=t,a=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!a&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":a?"idle":"max_interval",messageIds:n.map(u=>u.messageId)}}});var nP,VL=l(()=>{"use strict";nt();nP=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var VJ,KJ,dle,sP,KL=l(()=>{"use strict";nt();VJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),KJ=e=>e.trim().toLowerCase().replace(/\s+/g," "),dle=(e,t)=>{let r=new Set(e.map(KJ).filter(i=>i.length>0)),o=new Set(t.map(KJ).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},sP=e=>{let t=e.nearDupJaccard??.6,r=VJ(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(VJ(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(dle(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var qL,JL=l(()=>{"use strict";qL=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var YL,ple,XL,mle,ZL,QL=l(()=>{"use strict";nt();YL=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},ple=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,XL=e=>ple.test(e),mle=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,ZL=e=>mle.test(e)});var ep,iP=l(()=>{"use strict";ep=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var gle,qJ,qa,JJ,tp=l(()=>{"use strict";gle=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g,replacement:"[redacted-private-key]"},{pattern:/\bsk-[a-zA-Z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bAKIA[0-9A-Z]{16}\b/g,replacement:"[redacted-secret]"},{pattern:/\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/gi,replacement:"Bearer [redacted-secret]"},{pattern:/\b(?:api[_-]?key|secret|token|password|passwd|credential)\s*[:=]\s*["']?[^\s"'\\]{8,}["']?/gi,replacement:"[redacted-secret]"},{pattern:/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,replacement:"[redacted-email]"}],qJ=[/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[a-zA-Z0-9]{20,}\b/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,/\bAKIA[0-9A-Z]{16}\b/,/\bBearer\s+[A-Za-z0-9\-._~+/]{12,}/i],qa=e=>{let t=e,r=0;for(let n of gle)t=t.replace(n.pattern,()=>(r+=1,n.replacement));let o=qJ.some(n=>n.test(t));return{scrubbed:t,residualSecret:o,replacementCount:r}},JJ=e=>qJ.some(t=>t.test(e))});var ex,tx,rx,rp=l(()=>{"use strict";ex=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],tx={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},rx=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var ox,nx=l(()=>{"use strict";rp();ox=(e,t)=>{let r=tx[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var fle,jr,ix=l(()=>{"use strict";nx();nt();fle=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},jr=e=>{let t=fle(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=ox(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var Sle,YJ,Ple,Ale,ax,op,aP=l(()=>{"use strict";nt();tp();Sle=/^[a-z0-9][a-z0-9-]{0,63}$/,YJ=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let a=i.indexOf(":");if(a<=0)continue;let c=i.slice(0,a).trim(),d=i.slice(a+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},Ple=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,Ale=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},ax=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(JJ(o))return{ok:!1,reason:"residual_secret"};let s=YJ(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:a}=s,c=i.name??"";if(!Sle.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let u=i.version??"";if(u.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let g=Ale(i.source_message_ids??i.source_message_ids);if(g===null||g.length===0)return{ok:!1,reason:"missing_source_message_ids"};let f=Ple(a);return f<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:u,sourceMessageIds:g,stepCount:f,bodyBytes:n}},op=e=>(((YJ(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var XJ,_le,Nr,lP,cP=l(()=>{"use strict";XJ=require("node:crypto");zs();nt();UL();GL();VL();KL();JL();QL();iP();tp();ix();aP();_le=e=>Math.ceil(e.length/4),Nr=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),lP=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??_le,a=e.messages.map(u=>u.text).join(`
`),c=(u,g,f)=>{r.push(ep({projectId:t.projectId,episodeId:t.episodeId,fromState:u,toState:g,reason:f,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let u=0;u<16;u+=1){let g=nP({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let f=BL({messages:e.messages.map(h=>({messageId:h.messageId,createdAtMs:h.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),y=jr({state:t.state,verdict:{kind:"close",ready:f.ready}});if(!y.ok)break;let P=t.state;t=Nr(t,y.nextState,f.ready?f.reason:null,{messageIds:f.ready?f.messageIds:t.messageIds,closedAtMs:f.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(h=>ZL(h.text)),hasSuccessSignal:e.messages.some(h=>XL(h.text))}),c(P,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(g.capReached){let h=jr({state:t.state,verdict:{kind:"draft_cap",reached:!0}});h.ok&&(c(t.state,h.nextState,"draft_cap_reached"),t=Nr(t,h.nextState,"draft_cap_reached"));break}let f=zL({tokensUsedToday:e.tokensUsedToday+n}),y=jr({state:t.state,verdict:{kind:"budget",ok:f.ok}});if(!y.ok)break;let P=t.state;t=Nr(t,y.nextState,f.ok?"budget_ok":f.reason),c(P,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let f=qa(a),y=jr({state:t.state,verdict:{kind:"scrub",residualSecret:f.residualSecret}});if(!y.ok)break;let P=t.state;t=Nr(t,y.nextState,f.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:f.scrubbed}),c(P,t.state,t.reason);continue}if(t.state==="TRIAGE"){let f=YL({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),y=jr({state:t.state,verdict:{kind:"qualify",ok:f.ok}});if(!y.ok)break;let P=t.state;t=Nr(t,y.nextState,f.reason),c(P,t.state,t.reason);continue}if(t.state==="DEDUP"){let f=ot(t.scrubbedTranscript??a),y=sP({contentHash:f,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((y.action==="create_new"||y.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let P=jr({state:t.state,verdict:{kind:"dedup",action:y.action}});if(!P.ok)break;let h=t.state;t=Nr(t,P.nextState,y.action,{contentHash:f,mergeDraftId:y.action==="update_draft"?y.draftId:t.mergeDraftId}),c(h,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let f=t.scrubbedTranscript??"",y=qL({estimatedInputTokens:i(f),inputTokenCap:12e3}),P=await e.deps.ownerLlm({scrubbedTranscript:f,similarDraftHints:[],mode:y});n+=P.tokensUsed;let h=jr({state:t.state,verdict:{kind:"extract",ok:P.ok}});if(!h.ok)break;let p=t.state;P.ok&&(s=P.skillMarkdown),t=Nr(t,h.nextState,P.ok?"extract_ok":P.reason,{tokensUsed:t.tokensUsed+P.tokensUsed}),c(p,t.state,t.reason);continue}if(t.state==="VALIDATE"){let f=s??"",y=ax({skillMarkdown:f}),P=t.validateAttempts+(y.ok?0:1),h=jr({state:t.state,verdict:{kind:"validate",ok:y.ok,attempts:y.ok?t.validateAttempts:Math.max(1,P)}});if(!h.ok)break;let p=t.state;if(y.ok){let S=ot(f),b=op(f),k=sP({contentHash:S,name:y.name,stepLines:b,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(k.action==="skip_exact"){t=Nr(t,"SKIPPED_DEDUP","skip_exact",{contentHash:S,validateAttempts:P}),c(p,t.state,"skip_exact");break}let A=k.action==="update_draft"?k.draftId:t.mergeDraftId??(0,XJ.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:A,skillMarkdown:f,episodeId:t.episodeId,sourceMessageIds:y.sourceMessageIds,name:y.name,description:y.description}),t=Nr(t,h.nextState,"validate_ok",{draftId:A,contentHash:o.contentHash,validateAttempts:P}),c(p,t.state,t.reason);break}if(h.nextState==="EXTRACT"&&(s=null),t=Nr(t,h.nextState,y.reason,{validateAttempts:P}),c(p,t.state,t.reason),h.nextState==="EXTRACT"&&P>1)break;continue}break}let d=nP({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var lx,cx,np,dP=l(()=>{"use strict";lx=m(require("node:fs")),cx=m(require("node:path"));Nt();oe();ne();np=e=>{if(e.events.length===0)return;let t=ge(e.projectId),r=cx.default.join(t,Re);ft(r);let o=cx.default.join(r,EJ),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;lx.default.appendFileSync(o,n,{mode:384});try{lx.default.chmodSync(o,384)}catch{}}});var Ja,uP=l(()=>{"use strict";Ja=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var t4,ZJ,QJ,wle,Tle,dx,ux=l(()=>{"use strict";t4=require("node:crypto");nt();uP();tp();ZJ=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,QJ=e=>e.toLowerCase().replace(/_/g," "),wle=(e,t)=>`sha256:${(0,t4.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,Tle=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},dx=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],a=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():QJ(c.state),u=qa(d);if(u.residualSecret){a+=1;continue}let g=`Avoid repeating this history failure (${QJ(c.state)}).`,f=qa(g);if(f.residualSecret){a+=1;continue}let y=ZJ(u.scrubbed.replace(/\s+/g," ").trim(),120),P=ZJ(f.scrubbed.replace(/\s+/g," ").trim(),280);if(y.length===0||P.length===0)continue;let h=Ja(`${y}|${P}`);if(n.has(h))continue;n.add(h);let p=wle(y,P),S=`- **${y}:** ${P}`;s.length<t&&s.push(S),i.length<r&&i.push({id:Tle(c.episodeId,p),symptom:y,avoidance:P,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:p,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:a}}});var Ele,px,mx=l(()=>{"use strict";uP();nt();Ele=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},px=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?Ele(n[3]??""):[],i=new Set(s.map(g=>Ja(g))),a=[...s],c=0;for(let g of e.newPitfallLines){let f=g.trim();if(f.length===0)continue;let y=f.startsWith("- ")?f:`- ${f}`,P=Ja(y);if(!i.has(P)){if(a.length>=t)break;i.add(P),a.push(y),c+=1}}let d=a.length>0?`${a.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(f,y,P)=>`${y}${P}${d}`),appendedCount:c,totalPitfallBullets:a.length};let u=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${u}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:a.length}}});var gx,o4,r4,gP,fx,yx=l(()=>{"use strict";gx=m(require("node:fs")),o4=m(require("node:path"));oe();ne();r4="[project-history-skillgen]",gP=()=>({items:[],updatedAt:new Date(0).toISOString()}),fx=e=>{let t=o4.default.join(X(e),Re,ZS);if(!gx.default.existsSync(t))return gP();try{let r=JSON.parse(gx.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(r4,"learned_pitfalls_corrupt",e),gP()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:gP().updatedAt}}catch(r){return console.error(r4,"learned_pitfalls_read_failed",e,r),gP()}}});var Rle,n4,s4=l(()=>{"use strict";Rle=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],n4=e=>Rle.includes(e)});var hx,Sx=l(()=>{"use strict";s4();hx=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||n4(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var Px,sp,vle,ip,Ax,fP=l(()=>{"use strict";Px=m(require("node:fs")),sp=m(require("node:path"));zs();Nt();oe();ne();vle=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),ip=e=>{if(!vle(e.draftId))throw new Error("invalid_draft_id");let t=ge(e.projectId),r=sp.default.join(t,Ee,pn,e.draftId);ft(r);let o=sp.default.join(r,YS),n=sp.default.join(r,XS),s=ot(e.skillMarkdown);return ve(o,e.skillMarkdown),ve(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},Ax=e=>{let t=ge(e),r=sp.default.join(t,Ee,pn);return Px.default.existsSync(r)?Px.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var i4,bx,_x=l(()=>{"use strict";i4=m(require("node:path"));Nt();oe();ne();bx=e=>{let t=ge(e.projectId),r=i4.default.join(t,Re,ZS),o={...e.file,updatedAt:new Date().toISOString()};return ve(r,`${JSON.stringify(o)}
`),o}});var a4,kx,wx=l(()=>{"use strict";a4=m(require("node:path"));Nt();oe();ne();kx=e=>{let t=ge(e.projectId),r=a4.default.join(t,Re,oL),o={...e.file,updatedAt:new Date().toISOString()};return ve(r,`${JSON.stringify(o)}
`),o}});var Ex,l4,Tx,Cle,Lle,yP,Rx,vx=l(()=>{"use strict";Ex=m(require("node:fs")),l4=m(require("node:path"));dP();ux();mx();nt();yx();iP();Sx();fP();_x();wx();Tx="[project-history-skillgen]",Cle=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},Lle=e=>{try{let t=JSON.parse(Ex.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},yP=e=>{try{np({projectId:e.projectId,events:[ep({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},Rx=e=>{let t=new Date(e.nowMs).toISOString();try{let r=hx({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=dx({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=Lle(e.draftWritten.metaPath),i=Ex.default.readFileSync(e.draftWritten.skillPath,"utf8"),a=px({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=a.appendedCount,a.skillMarkdown!==i&&ip({projectId:e.projectId,draftId:l4.default.basename(e.draftWritten.draftDir),skillMarkdown:a.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(Tx,"pitfalls_draft_merge_failed",e.projectId,s),yP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=fx(e.projectId),i=Cle(s.items,o.localEntries);return bx({projectId:e.projectId,file:{items:i,updatedAt:t}}),kx({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},updatedAt:t}}),yP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(Tx,"pitfalls_store_failed",e.projectId,s),yP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(Tx,"pitfalls_attach_failed",e.projectId,r),yP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var ap,hP=l(()=>{"use strict";ap=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var c4,d4=l(()=>{"use strict";rp();c4=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&rx.includes(o.state))return o}return null}});var Cx,Lx=l(()=>{"use strict";Cx=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var xx,u4,xle,Ix,Wx=l(()=>{"use strict";xx=m(require("node:fs")),u4=m(require("node:path"));oe();ne();xle=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},Ix=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=u4.default.join(X(e.projectId),cr,`${t}.json`);if(!xx.default.existsSync(r))return null;try{let o=JSON.parse(xx.default.readFileSync(r,"utf8"));return xle(o)?o:null}catch{return null}}});var Ox,p4,lp,SP=l(()=>{"use strict";Ox=m(require("node:fs")),p4=m(require("node:path"));oe();Wx();ne();lp=e=>{let t=p4.default.join(X(e),cr);if(!Ox.default.existsSync(t))return[];let r=Ox.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=Ix({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),a=Date.parse(s.savedAt);return i!==a?i-a:n.messageId.localeCompare(s.messageId)})}});var Bs,PP,m4,g4=l(()=>{"use strict";Bs=m(require("node:fs")),PP=m(require("node:path"));oe();ne();aP();m4=e=>{let t=PP.default.join(X(e),Ee,pn);if(!Bs.default.existsSync(t))return[];let r=[];for(let o of Bs.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=PP.default.join(t,o.name,YS),s=PP.default.join(t,o.name,XS);if(Bs.default.existsSync(n))try{let i=Bs.default.readFileSync(n,"utf8"),a="",c=o.name;if(Bs.default.existsSync(s)){let d=JSON.parse(Bs.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(a=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(a.length===0)continue;r.push({id:o.name,contentHash:a,name:c,stepLines:op(i)})}catch{}}return r}});var cp,Mx,f4,y4=l(()=>{"use strict";cp=m(require("node:fs")),Mx=m(require("node:path"));oe();ne();f4=e=>{let t=Mx.default.join(X(e),Ee);if(!cp.default.existsSync(t))return[];let r=[];for(let o of cp.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=Mx.default.join(t,o.name,mn);if(cp.default.existsSync(n))try{let s=JSON.parse(cp.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var Ile,jx,Nx=l(()=>{"use strict";hP();SP();Ile=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,jx=e=>{let t=lp(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||Ile(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:ap(o)})}return r}});var h4,S4=l(()=>{"use strict";h4=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var P4,Dx,Hx=l(()=>{"use strict";P4=m(require("node:path"));Nt();oe();ne();Dx=e=>{let t=ge(e.projectId),r=P4.default.join(t,Re,JS),o={...e.budget,updatedAt:new Date().toISOString()};return ve(r,`${JSON.stringify(o)}
`),o}});var A4,Fx,$x=l(()=>{"use strict";A4=m(require("node:path"));Nt();oe();ne();Fx=e=>{let t=ge(e.projectId),r=A4.default.join(t,Re,qS),o={...e.file,updatedAt:new Date().toISOString()};return ve(r,`${JSON.stringify(o)}
`),o}});var b4,_4=l(()=>{"use strict";dP();S4();Hx();$x();b4=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,a=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],a=t.episode.lastMessageAtMs??a),Fx({projectId:n,file:{episodes:h4(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:a,updatedAt:new Date(s).toISOString()}}),Dx({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),np({projectId:n,events:t.metrics})}});var AP,zx=l(()=>{"use strict";AP=e=>new Date(e).toISOString().slice(0,10)});var bP,k4=l(()=>{"use strict";zx();bP=e=>({dayKey:AP(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var Ux,T4,w4,Wle,Bx,Gx=l(()=>{"use strict";Ux=m(require("node:fs")),T4=m(require("node:path"));k4();oe();ne();zx();w4="[project-history-skillgen]",Wle=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=AP(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},Bx=e=>{let t=T4.default.join(X(e.projectId),Re,JS);if(!Ux.default.existsSync(t))return bP(e.nowMs);try{let r=JSON.parse(Ux.default.readFileSync(t,"utf8")),o=Wle(r,e.nowMs);return o===null?(console.error(w4,"budget_corrupt",e.projectId),bP(e.nowMs)):o}catch(r){return console.error(w4,"budget_read_failed",e.projectId,r),bP(e.nowMs)}}});var _P,E4=l(()=>{"use strict";_P=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var Vx,v4,R4,Ole,Mle,jle,Kx,qx=l(()=>{"use strict";Vx=m(require("node:fs")),v4=m(require("node:path"));E4();rp();oe();ne();R4="[project-history-skillgen]",Ole=e=>typeof e=="string"&&ex.includes(e),Mle=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&Ole(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},jle=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(Mle);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},Kx=e=>{let t=v4.default.join(X(e),Re,qS);if(!Vx.default.existsSync(t))return _P();try{let r=JSON.parse(Vx.default.readFileSync(t,"utf8")),o=jle(r);return o===null?(console.error(R4,"episodes_corrupt",e),_P()):o}catch(r){return console.error(R4,"episodes_read_failed",e,r),_P()}}});var C4,Nle,Dle,Jx,Yx=l(()=>{"use strict";C4=require("node:crypto");cP();vx();hP();d4();Lx();SP();g4();y4();Nx();Ka();_4();Gx();qx();fP();Nle="[project-history-skillgen]",Dle=(e,t)=>{let r=new Map;for(let o of lp(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:ap(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},Jx=(e={})=>{let t=e.ownerLlm??null,r=e.nowMs??Date.now;return async o=>{try{let n=Va(o.projectId);if(!Cx(n?.state))return;let s=r(),i=Kx(o.projectId),a=Bx({projectId:o.projectId,nowMs:s}),c=jx({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=c4(i.episodes,o.projectId);if(d===null){if(c.length===0)return;let f=c[0],y=c[c.length-1];d={episodeId:(0,C4.randomUUID)(),projectId:o.projectId,state:"CAPTURING",messageIds:c.map(P=>P.messageId),startedAtMs:f.createdAtMs,lastMessageAtMs:y.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}}else if(d.state==="CAPTURING"&&c.length>0){let f=new Set(d.messageIds),y=[...d.messageIds],P=d.lastMessageAtMs;for(let h of c)f.has(h.messageId)||(y.push(h.messageId),f.add(h.messageId),P=Math.max(P,h.createdAtMs));d={...d,messageIds:y,lastMessageAtMs:P}}let u=Dle(o.projectId,d.messageIds);if(u.length===0)return;let g=await lP({episode:d,messages:u,tokensUsedToday:a.tokensUsedToday,lastClosedAtMs:a.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:ip,listDraftFingerprints:()=>m4(o.projectId),listPublishedFingerprints:()=>f4(o.projectId),openDraftCount:()=>Ax(o.projectId)}});if(b4({projectId:o.projectId,episodesFile:i,budget:a,result:g,nowMs:s}),g.draftWritten!==null&&g.episode.state==="AWAITING_REVIEW"){let f=[...i.episodes.filter(y=>y.episodeId!==g.episode.episodeId),g.episode];Rx({projectId:o.projectId,successEpisode:g.episode,episodes:f,draftWritten:g.draftWritten,nowMs:s})}}catch(n){console.error(Nle,"run_failed",o.projectId,n)}}}});var Xx,Zx,Qx=l(()=>{"use strict";zs();ee();Xr();$L();HL();Yx();Ka();Xx="[project-history-tick]",Zx=async(e={})=>{let t=e.listProjectIds?.()??jL();if(t.length===0)return;let r=$(),o=e.cloudApi!==void 0?e.cloudApi:r===null?null:V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),n=DL(),s=e.pullSkills??tP,i=e.runSkillgen??Jx({ownerLlm:e.ownerLlm??null});for(let a of t){try{await i({projectId:a})}catch(c){console.error(Xx,"skillgen_failed",a,c)}if(o===null){console.error(Xx,"pull_skipped_no_cloud_api",a);continue}try{await s({projectId:a,deps:{history:n,awcPublished:FL(o)}})}catch(c){console.error(Xx,"pull_failed",a,c)}}}});var eI,x4=l(()=>{"use strict";nt();Qx();eI=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>Zx());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var I4=l(()=>{"use strict";oe();ne()});var W4=l(()=>{"use strict";cP()});var O4=l(()=>{"use strict";oe();ne()});var tI=l(()=>{"use strict";rL();ne();wL();EL();CL();IL();ML();DJ();nt();HL();$L();Qx();zs();x4();Ka();nt();GL();UL();QL();tp();KL();JL();aP();fP();VL();iP();I4();nx();ix();cP();W4();rp();Wx();SP();hP();Nx();qx();$x();Gx();Hx();dP();Yx();Lx();uP();Sx();ux();mx();vx();yx();_x();O4();wx();nt()});var Dt,Hle,M4,j4,rI,oI,nI,sI,iI,aI,lI=l(()=>{"use strict";Dt=require("node:crypto"),Hle=Buffer.from("302a300506032b6570032100","hex"),M4=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},j4=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Dt.createPublicKey)({key:Buffer.concat([Hle,t]),format:"der",type:"spki"})},rI=()=>{let{publicKey:e,privateKey:t}=(0,Dt.generateKeyPairSync)("ed25519");return{publicKeyRaw:M4(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},oI=e=>(0,Dt.createPrivateKey)(e),nI=(e,t)=>(0,Dt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),sI=(e,t,r)=>{try{let o=j4(e);return(0,Dt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},iI=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,aI=()=>(0,Dt.randomBytes)(32).toString("base64url")});var _o,kP,N4,Fle,$le,wP,cI,dI,D4=l(()=>{"use strict";_o=m(require("node:fs")),kP=m(require("node:path"));lI();G();He();N4=e=>kP.default.join(e.installDir,Co),Fle=(e,t)=>{if(e.profileEmail===null||t===N4(e)||_o.default.existsSync(t))return;let r=N4(e);_o.default.existsSync(r)&&(_o.default.mkdirSync(kP.default.dirname(t),{recursive:!0}),_o.default.renameSync(r,t))},$le=e=>{if(!_o.default.existsSync(e))return null;try{let t=_o.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},wP=e=>{let t=xl(e);Fle(e,t);let r=$le(t);if(r!==null)return r;let o=rI();return _o.default.mkdirSync(kP.default.dirname(t),{recursive:!0}),_o.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},cI=e=>{let t=wP(e.layout),r=aI(),o=iI({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=oI(t.privateKeyPem),s=nI(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},dI=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return sI(e.serverPublicKey,t,e.serverAttestation)}});var uI=l(()=>{"use strict";D4();lI()});var H4,F4,$4=l(()=>{"use strict";H4=m(require("node:path")),F4=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:H4.default.basename(e.installDir)})});var z4=l(()=>{"use strict";In()});var V4,dp,gI,fI,U4,Ule,pI,TP,fe,K4,Ble,mI,Gle,Vle,yI,_e,Ne,yt,Kle,B4,G4,up,pp,q4=l(()=>{"use strict";V4=m(require("node:http")),dp=m(require("node:fs")),gI=m(require("node:path"));EP();wd();_U();wU();LU();qn();bE();GE();o1();s1();lq();id();AC();Sq();Iq();Oq();GS();Kq();oJ();Go();Wt();It();nJ();iJ();kw();pT();Tw();cJ();pJ();QC();Pr();wJ();tI();ee();uI();$4();z4();fI=e=>cE(e)??"never",U4=48e3,Ule=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,pI=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??xf(),reveal:t.reveal,installed:wr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),TP=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Client config missing \u2014 pair this computer in Agent Witch Cloud to load projects."}:Tr(t,e)},fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),K4=200,Ble=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',mI=e=>{let t=e.trim().slice(0,K4),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},Gle=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${fe(t)}</div>`,Vle=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${fe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',yI={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},_e=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...yI}),e.end(JSON.stringify(r))},Ne=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},yt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},Kle=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=Ble(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${fe(e.status.wakeError)}</div>`:"",n=e.revived?`<div class="alert-success">${fe(RE(process.platform))}</div>`:"",s=JC(e.status.wsConnected)?`<div class="actions">
        <form method="POST" action="/api/revive">
          <button class="btn btn-primary" type="submit">Revive WebSocket</button>
        </form>
      </div>`:"";return`<section class="card">
      <p class="eyebrow">Local bridge</p>
      <h1>Status</h1>
      <p class="lede">Connection and pairing details for Agent Witch on this computer.</p>
      ${n}
      <div class="meta-grid">
        <div class="meta-item"><span class="meta-label">WebSocket</span><span class="meta-value">${t}</span></div>
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Td(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${fe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${fe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${fe(fI(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${fe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},B4=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},G4=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,K4)},up=e=>{let t=gI.default.join(e.layout.installDir,"link-code.txt"),r=()=>Fe(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:KS(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let p=h.installVersion??r(),S=await i(),b=XE(S),k=h.updateFlash??null,A=ZE(k),_=Gle(k,h.updateError??null);return JE({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:lr(p),installBundleVersionLabel:KS(p),prependBody:`${A}${_}${b}`,headerUpdateButtonHtml:YE(S)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let p=await qC(e.layout);return s={cachedAtMs:h,offer:p},p},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:mI("An update is already running.")}),h.end();return}c=!0;try{let S=await ZC(),b=S.ok?"/?update=ok":mI(S.message);h.writeHead(303,{Location:b}),h.end()}catch(S){let b=S instanceof Error&&S.message.trim().length>0?S.message:"Install bundle update failed.";h.writeHead(303,{Location:mI(b)}),h.end()}finally{c=!1,a()}},u=async(h,p)=>{let S=p==="Project not found"?"That project is not available on this computer.":"That page does not exist on this computer.",b=o(),k=await n({title:p,activePath:p==="Project not found"?"/projects":"/",installVersion:b.installVersion,body:`<section class="card">
      <h1>${fe(p)}</h1>
      <p>${fe(S)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(k)},g=()=>{if(dp.default.existsSync(t))return dp.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return dp.default.writeFileSync(t,h,"utf8"),h},f=dn({layout:e.layout}),y=V4.default.createServer((h,p)=>{(async()=>{let S=h.url?.split("?")[0]??"/",b=h.method??"GET";if(b==="OPTIONS"){p.writeHead(204,yI),p.end();return}if(await fC({method:b,pathname:S,request:h,response:p,requestUrl:h.url??"/",storePath:hq(gI.default.dirname(e.layout.configPath)),readBody:yt,sendHtml:Ne,renderShell:n})||await by({method:b,pathname:S,request:h,response:p,layout:e.layout,readBody:yt,sendJson:_e})||await WS({method:b,pathname:S,request:h,response:p,layout:e.layout,readBody:yt,sendJson:_e,server:f}))return;if(b==="GET"&&S==="/health"){let A=e.controllers.getStatus(),_=o();_e(p,200,{ok:!0,...A,installBundleVersion:_.installBundleVersion,installBundleUpdatedAt:_.installBundleUpdatedAt,...F4({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(b==="GET"&&S==="/api/status"){let A=o();_e(p,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(b==="GET"&&S==="/api/traffic"){_e(p,200,{entries:_d(e.layout)});return}if(b==="DELETE"&&S==="/api/traffic"||b==="POST"&&S==="/api/traffic/clear"){if(pE(e.layout),b==="POST"){p.writeHead(303,{Location:"/traffic?cleared=1"}),p.end();return}_e(p,200,{ok:!0});return}if(b==="GET"&&S==="/api/trace"){_e(p,200,{entries:Yy(e.layout)});return}if(b==="DELETE"&&S==="/api/trace"||b==="POST"&&S==="/api/trace/clear"){if(fE(e.layout),b==="POST"){p.writeHead(303,{Location:"/status"}),p.end();return}_e(p,200,{ok:!0});return}if(b==="POST"&&S==="/api/errors/clear"){yE(e.layout.errorLogPath),p.writeHead(303,{Location:"/errors?cleared=1"}),p.end();return}if(b==="GET"&&S==="/api/knowledge"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(_.length>0){let E=await ma({layout:e.layout,query:_,limit:20});_e(p,200,{chunks:E,query:_});return}_e(p,200,{chunks:pa(e.layout).slice(-50).reverse()});return}if(b==="POST"&&S==="/api/revive"){e.controllers.reviveWebSocket(),p.writeHead(303,{Location:"/status?revived=1"}),p.end();return}if(b==="GET"&&S==="/api/update-status"){let A=await i();_e(p,200,{ok:!0,...A});return}if((b==="GET"||b==="POST")&&S==="/api/update"){await d(p);return}if(b==="GET"&&S==="/"){let A=e.controllers.getStatus(),_=o(),E=wr(e.layout),T=Xy(e.layout.errorLogPath);Ne(p,await n({title:"Home",activePath:"/",installVersion:_.installVersion,updateFlash:B4(h.url??void 0),updateError:G4(h.url??void 0),body:QE({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:_.installBundleVersion,harnessSetCount:E.sets.length,knowledgeChunkCount:pa(e.layout).length,trafficEntryCount:_d(e.layout).length,wakeError:A.wakeError,errorLogByteSize:T.byteSize,errorLogExists:T.exists})}));return}if(b==="GET"&&S==="/task"){let A=e.controllers.getStatus(),_=o(),E=$(),T=new URL(h.url??"/",`http://127.0.0.1:${43347}`),C=T.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,x=T.searchParams.get("failed")==="1"?T.searchParams.get("error")?.trim()??"Task failed.":null,W=T.searchParams.get("runId");Ne(p,await n({title:"Task",activePath:"/task",installVersion:_.installVersion,body:bC({defaultWorkspace:E?.workspace??"",wsConnected:A.wsConnected,flashMessage:C,flashError:x,lastRunId:W})}));return}if(b==="POST"&&S==="/task/dispatch"){let A=await yt(h),_=new URLSearchParams(A),E=_.get("prompt")?.trim()??"",T=_.get("writerAgent")?.trim()??"claude-cli",C=_.get("projectFolder")?.trim()??"",x=await tL({prompt:E,writerAgent:T,...C.length>0?{projectFolderPath:C}:{}}),W=new URLSearchParams;x.ok?W.set("ok","1"):(W.set("failed","1"),x.errorMessage!==void 0&&W.set("error",x.errorMessage.slice(0,240))),x.agentRunId!==void 0&&W.set("runId",x.agentRunId),p.writeHead(303,{Location:`/task?${W.toString()}`}),p.end();return}if(b==="GET"&&S==="/writer-sessions"){let A=o(),_=$S(e.layout,12);Ne(p,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:B4(h.url??void 0),updateError:G4(h.url??void 0),body:vC({sessions:_})}));return}if(b==="GET"&&S==="/errors"){let A=o(),_=Xy(e.layout.errorLogPath);Ne(p,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:SE({errorLogPath:e.layout.errorLogPath,content:_.content,exists:_.exists,truncated:_.truncated,byteSize:_.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(b==="GET"&&S==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=e.controllers.getStatus(),E=Ce(e.layout),T=E!==null?ze(E,12e4):_E(_.lastHeartbeatAt,12e4),C=kE({lastHeartbeatAt:_.lastHeartbeatAt,heartbeatIsStale:T}),x=o();Ne(p,await n({title:"Status",activePath:"/status",installVersion:x.installVersion,body:`${Kle({status:_,healthBadge:C,revived:A.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:x.installBundleVersion,installBundleUpdatedAt:x.installBundleUpdatedAt})}${EE({installDir:e.layout.installDir,platform:process.platform})}${TE({entries:Yy(e.layout)})}`}));return}if(b==="GET"&&S==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=_d(e.layout),E=o(),T=_.map(W=>`<tr><td title="${fe(W.at)}">${fe(fI(W.at))}</td><td>${fe(W.direction)}</td><td><code>${fe(W.type)}</code></td><td>${fe(W.summary)}</td><td>${fe(W.action??"")}</td></tr>`).join(""),C=_.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${T}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',x=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ne(p,await n({title:"Traffic",activePath:"/traffic",installVersion:E.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${x}
              ${C}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(b==="GET"&&S==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=o(),E=lr(_.installVersion),T=await TP(e.layout),C=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to Agent Witch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in Agent Witch Cloud. Check pairing on Status.":null,x=A.searchParams.get("deleted")==="1"?"Project removed from Agent Witch Cloud. Folders on your computer were not deleted.":null,W=$(),j=W===null?null:V({wsUrl:W.wsUrl,pairingToken:W.pairingToken}),M=j===null?{}:Object.fromEntries((await Promise.all(T.projects.map(async B=>{let ie=await GC(j,B.id);return[B.id,ie?.counts??null]}))).filter(B=>B[1]!==null));Ne(p,await n({title:"Projects",activePath:"/projects",installVersion:_.installVersion,body:VC({projects:T.projects,compositionCountsByProjectId:M,cloudAppOrigin:E,syncMessage:T.message,syncOk:T.ok,flashMessage:x,flashError:C})}));return}if(b==="GET"&&S==="/projects/select-folder"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",E=$(),T=E===null?null:V({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),C=_.length>0&&T!==null?qo():null;if(C===null||T===null){p.writeHead(303,{Location:"/projects"}),p.end();return}if(it({projectFolderPath:C}),!await Qc(T,_,C)){p.writeHead(303,{Location:"/projects?folderError=1"}),p.end();return}p.writeHead(303,{Location:`/project?id=${encodeURIComponent(_)}&folderUpdated=1`}),p.end();return}if(b==="POST"&&S==="/projects/delete"){let A=await yt(h),_=new URLSearchParams(A).get("projectId")?.trim()??"",E=$(),T=E===null?null:V({wsUrl:E.wsUrl,pairingToken:E.pairingToken});if(T===null||_.length===0){p.writeHead(303,{Location:"/projects?deleteError=1"}),p.end();return}let C=await Ow(T,_);p.writeHead(303,{Location:C.ok?"/projects?deleted=1":"/projects?deleteError=1"}),p.end();return}if(b==="GET"&&S==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=A.searchParams.get("id")?.trim()??"",E=o(),T=lr(E.installVersion),C=await TP(e.layout),x=Xt(C.projects,_);if(x===null){await u(p,"Project not found");return}let W=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with Agent Witch.":null,j=A.searchParams.get("knowledgePromoted"),M=j!==null?`Marked ${j} lesson(s) as promoted in Agent Witch.`:null,B=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,ie=A.searchParams.get("tab")?.trim()??"harness",D=ie==="workflows"||ie==="agents"||ie==="knowledge"||ie==="pitfalls"?ie:"harness",xe=A.searchParams.get("retired")==="1",Pn=A.searchParams.get("edit")?.trim()||null,An=lJ(A.searchParams.get("pitfall")),ei=$(),Fr=ei===null?null:V({wsUrl:ei.wsUrl,pairingToken:ei.pairingToken}),fA=Fr===null?null:await GC(Fr,x.id),pl=0;if(Fr!==null)try{let Up=await fetch(`${Fr.appOrigin}/api/agent-witch/projects/${encodeURIComponent(x.id)}/knowledge`,{method:"GET",headers:{[le]:Fr.pairingToken},signal:AbortSignal.timeout(1e4)});if(Up.ok){let ti=await Up.json();typeof ti=="object"&&ti!==null&&typeof ti.candidateCount=="number"&&(pl=ti.candidateCount)}}catch{pl=0}let yA=D!=="pitfalls"?void 0:await uH({store:Ry({layout:e.layout,cloud:Fr===null?null:Zc(Fr)}),projectId:x.id,includeRetired:xe});Ne(p,await n({title:x.name,activePath:"/projects",installVersion:E.installVersion,body:Vo({project:x,cloudAppOrigin:T,installed:wr(e.layout),linkedSetSlugs:_r(x.projectFolderPath),composition:fA,knowledgeCandidateCount:pl,pitfalls:yA,pitfallsShowRetired:xe,pitfallsEditId:Pn,activeTab:D,flashMessage:W??M??An?.message??null,flashError:B??An?.error??null})}));return}if(b==="POST"&&S==="/projects/pull-bound-harness"){let A=await yt(h),_=await bw({rawBody:A,layout:e.layout});if(_.kind==="not_found"){await u(p,"Project not found");return}if(_.kind==="redirect"){p.writeHead(303,{Location:_.location}),p.end();return}let E=o();Ne(p,await n({title:_.title,activePath:"/projects",installVersion:E.installVersion,body:_.body}));return}if(b==="POST"&&S==="/projects/link-harness"){let A=await yt(h),_=new URLSearchParams(A),E=_.get("projectId")?.trim()??"",T=await TP(e.layout),C=Xt(T.projects,E);if(C===null){await u(p,"Project not found");return}let x=_.getAll("applySet").map(D=>String(D)),W=Fc({layout:e.layout,projectFolderPath:C.projectFolderPath,setSlugs:x});if(!W.ok){let D=o(),xe=lr(D.installVersion);Ne(p,await n({title:C.name,activePath:"/projects",installVersion:D.installVersion,body:Vo({project:C,cloudAppOrigin:xe,installed:wr(e.layout),linkedSetSlugs:_r(C.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:W.errorMessage})}));return}let j=$(),M=j===null?null:V({wsUrl:j.wsUrl,pairingToken:j.pairingToken}),B=M===null?!1:await ns(M,C.id,W.appliedSetSlugs),ie=new URLSearchParams({linked:"1",files:String(W.writtenFileCount),bindingsSynced:B?"1":"0"});p.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${ie.toString()}`}),p.end();return}if(b==="POST"&&S==="/projects/remove-harness-set"){let A=await yt(h),_=await _w({rawBody:A,layout:e.layout});if(_.kind==="not_found"){await u(p,"Project not found");return}if(_.kind==="redirect"){p.writeHead(303,{Location:_.location}),p.end();return}let E=o();Ne(p,await n({title:_.title,activePath:"/projects",installVersion:E.installVersion,body:_.body}));return}if(b==="POST"&&S==="/project/knowledge/promote-all"){let A=await yt(h),E=new URLSearchParams(A).get("projectId")?.trim()??"",T=await TP(e.layout),C=Xt(T.projects,E);if(C===null){await u(p,"Project not found");return}let x=$(),W=x===null?null:V({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),j=W===null?{ok:!1,promotedCount:0}:await sJ(W,C.id),M=new URLSearchParams({tab:"knowledge",...j.ok?{knowledgePromoted:String(j.promotedCount)}:{knowledgePromoteFailed:"1"}});p.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${M.toString()}`}),p.end();return}let k=Vf(S);if(b==="POST"&&k!==null){let A=await yt(h),_=await Ew({rawBody:A,action:k,layout:e.layout,createStore:E=>Ry({layout:e.layout,cloud:Zc(E)})});if(_.kind==="not_found"){await u(p,"Project not found");return}p.writeHead(303,{Location:_.location}),p.end();return}if(b==="GET"&&S==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=o(),E=Bc(e.layout),T=A.searchParams.get("submitted")==="1",C=T?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${E?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${E?.sets.length??0} set(s).`:null,x=E?.scanRoots[0]??xf(),W=Ule(e.layout,{reveal:E,importQuery:A.searchParams.get("import")==="1",justSubmitted:T}),j=lr(_.installVersion);Ne(p,await n({title:"Harness",activePath:"/harness",installVersion:_.installVersion,body:Uu(pI(e.layout,{cloudAppOrigin:j,reveal:E,scanFolder:x,flashMessage:C,importSectionExpanded:W}))}));return}if(b==="POST"&&S==="/api/harness/pick-folder"){let A=qo();if(A===null){_e(p,200,{cancelled:!0});return}_e(p,200,{path:A});return}if(b==="GET"&&S==="/api/harness/file-content"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",E=Hc(_);if(E===null){_e(p,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let T=dp.default.readFileSync(E,"utf8"),C=T.length>U4?`${T.slice(0,U4)}
\u2026 (truncated)`:T;_e(p,200,{content:C})}catch{_e(p,500,{errorMessage:"Could not read file."})}return}if(b==="POST"&&S==="/api/harness/reveal/add-project"){let A=await yt(h),_="";try{let C=JSON.parse(A);typeof C=="object"&&C!==null&&typeof C.projectPath=="string"&&(_=C.projectPath.trim())}catch{_e(p,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(_.length===0){_e(p,400,{ok:!1,errorMessage:"projectPath is required."});return}let E=Bc(e.layout),T=Kk({reveal:E,projectPath:_});if(T===null||T.sets.length===0){_e(p,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Mf(e.layout,T),_e(p,200,{ok:!0,setCount:T.sets.length});return}if(b==="GET"&&S==="/api/harness/reveal/stream"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(_.length===0){_e(p,400,{errorMessage:"Choose a folder to scan first."});return}let E=!1;h.on("close",()=>{E=!0}),p.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...yI});let T=qk({scanRoot:_,response:p,shouldAbort:()=>E});Mf(e.layout,T),p.end();return}if(b==="POST"&&S==="/harness/reveal"){p.writeHead(410,{"Content-Type":"text/plain"}),p.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(b==="POST"&&S==="/harness/submit"){let A=Bc(e.layout);if(A===null){let j=o(),M=lr(j.installVersion);Ne(p,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:Uu(pI(e.layout,{cloudAppOrigin:M,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let _=await yt(h),E=new URLSearchParams(_),T=BC(E,A),C=Yk({layout:e.layout,sets:T});if(!C.ok){let j=o(),M=lr(j.installVersion);Ne(p,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:Uu(pI(e.layout,{cloudAppOrigin:M,reveal:A,flashError:C.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}Zk(e.layout);let W=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";p.writeHead(303,{Location:`/harness?submitted=1&count=${C.writtenItemCount??0}${W}`}),p.end();return}if(b==="GET"&&S==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),E=$()?.writerExecutionBackend??Ze(void 0),T=Be(e.layout.configPath),C=Ho(T),x=A.searchParams.get("saved")==="1"?"Writer API settings saved on this computer.":null,W=o();Ne(p,await n({title:"Writer API",activePath:"/writer-api",installVersion:W.installVersion,body:zC({writerExecutionBackend:E,secrets:C,flashMessage:x})}));return}if(b==="POST"&&S==="/writer-api"){let A=await yt(h),_=new URLSearchParams(A),E=_.get("writerExecutionBackend")?.trim()??"cli";ok({configPath:e.layout.configPath,writerExecutionBackend:Ze(E),anthropicApiKey:_.get("anthropicApiKey")??void 0,anthropicModel:_.get("anthropicModel")??void 0,openaiApiKey:_.get("openaiApiKey")??void 0,openaiModel:_.get("openaiModel")??void 0,googleApiKey:_.get("googleApiKey")??void 0,googleModel:_.get("googleModel")??void 0}),p.writeHead(303,{Location:"/writer-api?saved=1"}),p.end();return}if(b==="GET"&&S==="/estimates"){p.writeHead(302,{Location:"/history"}),p.end();return}if(b==="GET"&&S==="/history"){let A=o();Ne(p,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:RC({reportsDir:e.layout.reportsDir})}));return}if(b==="GET"&&S==="/knowledge"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",E=o(),T=WE({layout:e.layout}),C=jE(T),x=_.length>0?await ma({layout:e.layout,query:_,limit:20}):pa(e.layout).slice(-50).reverse(),W=x.map(M=>{let B=ME(T,M.id),ie=B>0?` \xB7 used in ${B} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${fe(M.createdAt)}">${fe(fI(M.createdAt))}${M.source?` \xB7 ${fe(M.source)}`:""}${ie}</div><pre>${fe(M.text)}</pre></article>`}).join(""),j=C.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${C.map(M=>`<li><strong>P${M.priority}</strong> \u2014 ${fe(M.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your computer.</p></section>`:"";Ne(p,await n({title:"Knowledge",activePath:"/knowledge",installVersion:E.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this computer. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${fe(_)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${Vle(_,x.length)}
            </section>${j}${W}`}));return}b==="POST"&&await yt(h),await u(p,"Not found")})().catch(S=>{console.error("[agent-witch-local-app]",S),p.writeHead(500),p.end("Internal error")})});y.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)});let P=eI();return y.on("close",()=>{P.stop()}),y.listen(43347,"127.0.0.1",()=>{try{ta()}catch(h){let p=h instanceof Error?h.message:String(h);console.error(`[agent-witch] writeGlobalTriggers failed: ${p}`)}console.log(`[agent-witch] Local app ${zr}`)}),y},pp=e=>wP(e).publicKeyRaw});var EP=l(()=>{"use strict";iU();aU();q4()});var Y4={};St(Y4,{runAgentWitchExternalLiveCli:()=>Jle});var hI,J4,qle,Jle,X4=l(()=>{"use strict";hI=m(require("node:fs")),J4=m(require("node:path"));qn();G();Al();l_();ae();EP();ae();qle=e=>{let t=J4.default.join(e,"link-code.txt");if(!hI.default.existsSync(t))return null;let r=hI.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},Jle=()=>{bt("agent-witch-live");let e=v(),t=N(),r=qle(e),o=pp(t);up({layout:t,controllers:{getStatus:()=>{let n=Ce(t);return{wsConnected:fc(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{kA({platform:process.platform,installDir:e,runners:{kickstartLaunchAgents:()=>Mn(e,process.platform),restartSystemdUserService:nc}}).then(n=>{n.ok||console.warn(`[agent-witch-live] Revive: ${n.message}`)})}}})}});var ko=R((CXe,e8)=>{"use strict";var Z4=["nodebuffer","arraybuffer","fragments"],Q4=typeof Blob<"u";Q4&&Z4.push("blob");e8.exports={BINARY_TYPES:Z4,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:Q4,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var mp=R((LXe,RP)=>{"use strict";var{EMPTY_BUFFER:Yle}=ko(),SI=Buffer[Symbol.species];function Xle(e,t){if(e.length===0)return Yle;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new SI(r.buffer,r.byteOffset,o):r}function t8(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function r8(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function Zle(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function PI(e){if(PI.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new SI(e):ArrayBuffer.isView(e)?t=new SI(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),PI.readOnly=!1),t}RP.exports={concat:Xle,mask:t8,toArrayBuffer:Zle,toBuffer:PI,unmask:r8};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");RP.exports.mask=function(t,r,o,n,s){s<48?t8(t,r,o,n,s):e.mask(t,r,o,n,s)},RP.exports.unmask=function(t,r){t.length<32?r8(t,r):e.unmask(t,r)}}catch{}});var s8=R((xXe,n8)=>{"use strict";var o8=Symbol("kDone"),AI=Symbol("kRun"),bI=class{constructor(t){this[o8]=()=>{this.pending--,this[AI]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[AI]()}[AI](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[o8])}}};n8.exports=bI});var Za=R((IXe,c8)=>{"use strict";var gp=require("zlib"),i8=mp(),Qle=s8(),{kStatusCode:a8}=ko(),ece=Buffer[Symbol.species],tce=Buffer.from([0,0,255,255]),CP=Symbol("permessage-deflate"),wo=Symbol("total-length"),Ya=Symbol("callback"),fn=Symbol("buffers"),Xa=Symbol("error"),vP,_I=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!vP){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;vP=new Qle(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ya];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){vP.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){vP.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?gp.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=gp.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[CP]=this,this._inflate[wo]=0,this._inflate[fn]=[],this._inflate.on("error",oce),this._inflate.on("data",l8)}this._inflate[Ya]=o,this._inflate.write(t),r&&this._inflate.write(tce),this._inflate.flush(()=>{let s=this._inflate[Xa];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=i8.concat(this._inflate[fn],this._inflate[wo]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[wo]=0,this._inflate[fn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?gp.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=gp.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[wo]=0,this._deflate[fn]=[],this._deflate.on("data",rce)}this._deflate[Ya]=o,this._deflate.write(t),this._deflate.flush(gp.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=i8.concat(this._deflate[fn],this._deflate[wo]);r&&(s=new ece(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ya]=null,this._deflate[wo]=0,this._deflate[fn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};c8.exports=_I;function rce(e){this[fn].push(e),this[wo]+=e.length}function l8(e){if(this[wo]+=e.length,this[CP]._maxPayload<1||this[wo]<=this[CP]._maxPayload){this[fn].push(e);return}this[Xa]=new RangeError("Max payload size exceeded"),this[Xa].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Xa][a8]=1009,this.removeListener("data",l8),this.reset()}function oce(e){if(this[CP]._inflate=null,this[Xa]){this[Ya](this[Xa]);return}e[a8]=1007,this[Ya](e)}});var Qa=R((WXe,LP)=>{"use strict";var{isUtf8:d8}=require("buffer"),{hasBlob:nce}=ko(),sce=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function ice(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function kI(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function ace(e){return nce&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}LP.exports={isBlob:ace,isValidStatusCode:ice,isValidUTF8:kI,tokenChars:sce};if(d8)LP.exports.isValidUTF8=function(e){return e.length<24?kI(e):d8(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");LP.exports.isValidUTF8=function(t){return t.length<32?kI(t):e(t)}}catch{}});var vI=R((OXe,h8)=>{"use strict";var{Writable:lce}=require("stream"),u8=Za(),{BINARY_TYPES:cce,EMPTY_BUFFER:p8,kStatusCode:dce,kWebSocket:uce}=ko(),{concat:wI,toArrayBuffer:pce,unmask:mce}=mp(),{isValidStatusCode:gce,isValidUTF8:m8}=Qa(),xP=Buffer[Symbol.species],Ht=0,g8=1,f8=2,y8=3,TI=4,EI=5,IP=6,RI=class extends lce{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||cce[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[uce]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Ht}_write(t,r,o){if(this._opcode===8&&this._state==Ht)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new xP(o.buffer,o.byteOffset+t,o.length-t),new xP(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new xP(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Ht:this.getInfo(t);break;case g8:this.getPayloadLength16(t);break;case f8:this.getPayloadLength64(t);break;case y8:this.getMask();break;case TI:this.getData(t);break;case EI:case IP:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[u8.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=g8:this._payloadLength===127?this._state=f8:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=y8:this._state=TI}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=TI}getData(t){let r=p8;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&mce(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=EI,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[u8.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Ht&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Ht;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=wI(o,r):this._binaryType==="arraybuffer"?n=pce(wI(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=Ht):(this._state=IP,setImmediate(()=>{this.emit("message",n,!0),this._state=Ht,this.startLoop(t)}))}else{let n=wI(o,r);if(!this._skipUTF8Validation&&!m8(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===EI||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=Ht):(this._state=IP,setImmediate(()=>{this.emit("message",n,!1),this._state=Ht,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,p8),this.end();else{let o=t.readUInt16BE(0);if(!gce(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new xP(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!m8(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=Ht;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Ht):(this._state=IP,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Ht,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[dce]=n,i}};h8.exports=RI});var xI=R((jXe,A8)=>{"use strict";var{Duplex:MXe}=require("stream"),{randomFillSync:fce}=require("crypto"),{types:{isUint8Array:yce}}=require("util"),S8=Za(),{EMPTY_BUFFER:hce,kWebSocket:Sce,NOOP:Pce}=ko(),{isBlob:el,isValidStatusCode:Ace}=Qa(),{mask:P8,toBuffer:Gs}=mp(),Ft=Symbol("kByteLength"),bce=Buffer.alloc(4),WP=8*1024,Vs,tl=WP,dr=0,_ce=1,kce=2,CI=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=dr,this.onerror=Pce,this[Sce]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||bce,r.generateMask?r.generateMask(o):(tl===WP&&(Vs===void 0&&(Vs=Buffer.alloc(WP)),fce(Vs,0,WP),tl=0),o[0]=Vs[tl++],o[1]=Vs[tl++],o[2]=Vs[tl++],o[3]=Vs[tl++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Ft]!==void 0?a=r[Ft]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(P8(t,o,d,s,a),[d]):(P8(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=hce;else{if(typeof t!="number"||!Ace(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(yce(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Ft]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==dr?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):el(t)?(n=t.size,s=!1):(t=Gs(t),n=t.length,s=Gs.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ft]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};el(t)?this._state!==dr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==dr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):el(t)?(n=t.size,s=!1):(t=Gs(t),n=t.length,s=Gs.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ft]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};el(t)?this._state!==dr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==dr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[S8.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):el(t)?(a=t.size,c=!1):(t=Gs(t),a=t.length,c=Gs.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Ft]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};el(t)?this._state!==dr?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==dr?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Ft],this._state=kce,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(LI,this,a,n);return}this._bufferedBytes-=o[Ft];let i=Gs(s);r?this.dispatch(i,r,o,n):(this._state=dr,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(wce,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[S8.extensionName];this._bufferedBytes+=o[Ft],this._state=_ce,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");LI(this,c,n);return}this._bufferedBytes-=o[Ft],this._state=dr,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===dr&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Ft],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Ft],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};A8.exports=CI;function LI(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function wce(e,t,r){LI(e,t,r),e.onerror(t)}});var C8=R((NXe,v8)=>{"use strict";var{kForOnEventAttribute:fp,kListener:II}=ko(),b8=Symbol("kCode"),_8=Symbol("kData"),k8=Symbol("kError"),w8=Symbol("kMessage"),T8=Symbol("kReason"),rl=Symbol("kTarget"),E8=Symbol("kType"),R8=Symbol("kWasClean"),To=class{constructor(t){this[rl]=null,this[E8]=t}get target(){return this[rl]}get type(){return this[E8]}};Object.defineProperty(To.prototype,"target",{enumerable:!0});Object.defineProperty(To.prototype,"type",{enumerable:!0});var Ks=class extends To{constructor(t,r={}){super(t),this[b8]=r.code===void 0?0:r.code,this[T8]=r.reason===void 0?"":r.reason,this[R8]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[b8]}get reason(){return this[T8]}get wasClean(){return this[R8]}};Object.defineProperty(Ks.prototype,"code",{enumerable:!0});Object.defineProperty(Ks.prototype,"reason",{enumerable:!0});Object.defineProperty(Ks.prototype,"wasClean",{enumerable:!0});var ol=class extends To{constructor(t,r={}){super(t),this[k8]=r.error===void 0?null:r.error,this[w8]=r.message===void 0?"":r.message}get error(){return this[k8]}get message(){return this[w8]}};Object.defineProperty(ol.prototype,"error",{enumerable:!0});Object.defineProperty(ol.prototype,"message",{enumerable:!0});var yp=class extends To{constructor(t,r={}){super(t),this[_8]=r.data===void 0?null:r.data}get data(){return this[_8]}};Object.defineProperty(yp.prototype,"data",{enumerable:!0});var Tce={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[fp]&&n[II]===t&&!n[fp])return;let o;if(e==="message")o=function(s,i){let a=new yp("message",{data:i?s:s.toString()});a[rl]=this,OP(t,this,a)};else if(e==="close")o=function(s,i){let a=new Ks("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[rl]=this,OP(t,this,a)};else if(e==="error")o=function(s){let i=new ol("error",{error:s,message:s.message});i[rl]=this,OP(t,this,i)};else if(e==="open")o=function(){let s=new To("open");s[rl]=this,OP(t,this,s)};else return;o[fp]=!!r[fp],o[II]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[II]===t&&!r[fp]){this.removeListener(e,r);break}}};v8.exports={CloseEvent:Ks,ErrorEvent:ol,Event:To,EventTarget:Tce,MessageEvent:yp};function OP(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var MP=R((DXe,L8)=>{"use strict";var{tokenChars:hp}=Qa();function Dr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Ece(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(u===-1&&hp[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(c,u);d===44?(Dr(t,y,r),r=Object.create(null)):i=y,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(u===-1&&hp[d]===1)c===-1&&(c=g);else if(d===32||d===9)u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g),Dr(r,e.slice(c,u),!0),d===44&&(Dr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,g),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(hp[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(hp[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,u=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(u===-1&&hp[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))u===-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(c,u);o&&(y=y.replace(/\\/g,""),o=!1),Dr(r,a,y),d===44&&(Dr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=g);let f=e.slice(c,u);return i===void 0?Dr(t,f,r):(a===void 0?Dr(r,f,!0):o?Dr(r,a,f.replace(/\\/g,"")):Dr(r,a,f),Dr(t,i,r)),t}function Rce(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}L8.exports={format:Rce,parse:Ece}});var HP=R(($Xe,z8)=>{"use strict";var vce=require("events"),Cce=require("https"),Lce=require("http"),W8=require("net"),xce=require("tls"),{randomBytes:Ice,createHash:Wce}=require("crypto"),{Duplex:HXe,Readable:FXe}=require("stream"),{URL:WI}=require("url"),yn=Za(),Oce=vI(),Mce=xI(),{isBlob:jce}=Qa(),{BINARY_TYPES:x8,CLOSE_TIMEOUT:Nce,EMPTY_BUFFER:jP,GUID:Dce,kForOnEventAttribute:OI,kListener:Hce,kStatusCode:Fce,kWebSocket:De,NOOP:O8}=ko(),{EventTarget:{addEventListener:$ce,removeEventListener:zce}}=C8(),{format:Uce,parse:Bce}=MP(),{toBuffer:Gce}=mp(),M8=Symbol("kAborted"),MI=[8,13],Eo=["CONNECTING","OPEN","CLOSING","CLOSED"],Vce=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,se=class e extends vce{constructor(t,r,o){super(),this._binaryType=x8[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=jP,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),j8(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){x8.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new Oce({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new Mce(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[De]=this,s[De]=this,t[De]=this,n.on("conclude",Jce),n.on("drain",Yce),n.on("error",Xce),n.on("message",Zce),n.on("ping",Qce),n.on("pong",ede),s.onerror=tde,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",H8),t.on("data",DP),t.on("end",F8),t.on("error",$8),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[yn.extensionName]&&this._extensions[yn.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ct(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,D8(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){jI(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||jP,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){jI(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||jP,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){jI(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[yn.extensionName]||(n.compress=!1),this._sender.send(t||jP,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ct(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(se,"CONNECTING",{enumerable:!0,value:Eo.indexOf("CONNECTING")});Object.defineProperty(se.prototype,"CONNECTING",{enumerable:!0,value:Eo.indexOf("CONNECTING")});Object.defineProperty(se,"OPEN",{enumerable:!0,value:Eo.indexOf("OPEN")});Object.defineProperty(se.prototype,"OPEN",{enumerable:!0,value:Eo.indexOf("OPEN")});Object.defineProperty(se,"CLOSING",{enumerable:!0,value:Eo.indexOf("CLOSING")});Object.defineProperty(se.prototype,"CLOSING",{enumerable:!0,value:Eo.indexOf("CLOSING")});Object.defineProperty(se,"CLOSED",{enumerable:!0,value:Eo.indexOf("CLOSED")});Object.defineProperty(se.prototype,"CLOSED",{enumerable:!0,value:Eo.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(se.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(se.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[OI])return t[Hce];return null},set(t){for(let r of this.listeners(e))if(r[OI]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[OI]:!0})}})});se.prototype.addEventListener=$ce;se.prototype.removeEventListener=zce;z8.exports=se;function j8(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Nce,protocolVersion:MI[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!MI.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${MI.join(", ")})`);let s;if(t instanceof WI)s=t;else try{s=new WI(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let h=new SyntaxError(c);if(e._redirects===0)throw h;NP(e,h);return}let d=i?443:80,u=Ice(16).toString("base64"),g=i?Cce.request:Lce.request,f=new Set,y;if(n.createConnection=n.createConnection||(i?qce:Kce),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(y=new yn({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=Uce({[yn.extensionName]:y.offer()})),r.length){for(let h of r){if(typeof h!="string"||!Vce.test(h)||f.has(h))throw new SyntaxError("An invalid or duplicated subprotocol was specified");f.add(h)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let h=n.path.split(":");n.socketPath=h[0],n.path=h[1]}let P;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let h=o&&o.headers;if(o={...o,headers:{}},h)for(let[p,S]of Object.entries(h))o.headers[p.toLowerCase()]=S}else if(e.listenerCount("redirect")===0){let h=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!h||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,h||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),P=e._req=g(n),e._redirects&&e.emit("redirect",e.url,P)}else P=e._req=g(n);n.timeout&&P.on("timeout",()=>{Ct(e,P,"Opening handshake has timed out")}),P.on("error",h=>{P===null||P[M8]||(P=e._req=null,NP(e,h))}),P.on("response",h=>{let p=h.headers.location,S=h.statusCode;if(p&&n.followRedirects&&S>=300&&S<400){if(++e._redirects>n.maxRedirects){Ct(e,P,"Maximum redirects exceeded");return}P.abort();let b;try{b=new WI(p,t)}catch{let A=new SyntaxError(`Invalid URL: ${p}`);NP(e,A);return}j8(e,b,r,o)}else e.emit("unexpected-response",P,h)||Ct(e,P,`Unexpected server response: ${h.statusCode}`)}),P.on("upgrade",(h,p,S)=>{if(e.emit("upgrade",h),e.readyState!==se.CONNECTING)return;P=e._req=null;let b=h.headers.upgrade;if(b===void 0||b.toLowerCase()!=="websocket"){Ct(e,p,"Invalid Upgrade header");return}let k=Wce("sha1").update(u+Dce).digest("base64");if(h.headers["sec-websocket-accept"]!==k){Ct(e,p,"Invalid Sec-WebSocket-Accept header");return}let A=h.headers["sec-websocket-protocol"],_;if(A!==void 0?f.size?f.has(A)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":f.size&&(_="Server sent no subprotocol"),_){Ct(e,p,_);return}A&&(e._protocol=A);let E=h.headers["sec-websocket-extensions"];if(E!==void 0){if(!y){Ct(e,p,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let T;try{T=Bce(E)}catch{Ct(e,p,"Invalid Sec-WebSocket-Extensions header");return}let C=Object.keys(T);if(C.length!==1||C[0]!==yn.extensionName){Ct(e,p,"Server indicated an extension that was not requested");return}try{y.accept(T[yn.extensionName])}catch{Ct(e,p,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[yn.extensionName]=y}e.setSocket(p,S,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(P,e):P.end()}function NP(e,t){e._readyState=se.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function Kce(e){return e.path=e.socketPath,W8.connect(e)}function qce(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=W8.isIP(e.host)?"":e.host),xce.connect(e)}function Ct(e,t,r){e._readyState=se.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Ct),t.setHeader?(t[M8]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(NP,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function jI(e,t,r){if(t){let o=jce(t)?t.size:Gce(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Eo[e.readyState]})`);process.nextTick(r,o)}}function Jce(e,t){let r=this[De];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[De]!==void 0&&(r._socket.removeListener("data",DP),process.nextTick(N8,r._socket),e===1005?r.close():r.close(e,t))}function Yce(){let e=this[De];e.isPaused||e._socket.resume()}function Xce(e){let t=this[De];t._socket[De]!==void 0&&(t._socket.removeListener("data",DP),process.nextTick(N8,t._socket),t.close(e[Fce])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function I8(){this[De].emitClose()}function Zce(e,t){this[De].emit("message",e,t)}function Qce(e){let t=this[De];t._autoPong&&t.pong(e,!this._isServer,O8),t.emit("ping",e)}function ede(e){this[De].emit("pong",e)}function N8(e){e.resume()}function tde(e){let t=this[De];t.readyState!==se.CLOSED&&(t.readyState===se.OPEN&&(t._readyState=se.CLOSING,D8(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function D8(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function H8(){let e=this[De];if(this.removeListener("close",H8),this.removeListener("data",DP),this.removeListener("end",F8),e._readyState=se.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[De]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",I8),e._receiver.on("finish",I8))}function DP(e){this[De]._receiver.write(e)||this.pause()}function F8(){let e=this[De];e._readyState=se.CLOSING,e._receiver.end(),this.end()}function $8(){let e=this[De];this.removeListener("error",$8),this.on("error",O8),e&&(e._readyState=se.CLOSING,this.destroy())}});var V8=R((UXe,G8)=>{"use strict";var zXe=HP(),{Duplex:rde}=require("stream");function U8(e){e.emit("close")}function ode(){!this.destroyed&&this._writableState.finished&&this.destroy()}function B8(e){this.removeListener("error",B8),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function nde(e,t){let r=!0,o=new rde({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(U8,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(U8,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",ode),o.on("error",B8),o}G8.exports=nde});var NI=R((BXe,K8)=>{"use strict";var{tokenChars:sde}=Qa();function ide(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&sde[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}K8.exports={parse:ide}});var e3=R((VXe,Q8)=>{"use strict";var ade=require("events"),FP=require("http"),{Duplex:GXe}=require("stream"),{createHash:lde}=require("crypto"),q8=MP(),qs=Za(),cde=NI(),dde=HP(),{CLOSE_TIMEOUT:ude,GUID:pde,kWebSocket:mde}=ko(),gde=/^[+/0-9A-Za-z]{22}==$/,J8=0,Y8=1,Z8=2,DI=class extends ade{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:ude,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:dde,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=FP.createServer((o,n)=>{let s=FP.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=fde(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=J8}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===Z8){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Sp,this);return}if(t&&this.once("close",t),this._state!==Y8)if(this._state=Y8,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Sp,this):process.nextTick(Sp,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Sp(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",X8);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Js(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Js(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!gde.test(s)){Js(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Js(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Pp(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=cde.parse(c)}catch{Js(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&u!==void 0){let f=new qs({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=q8.parse(u);y[qs.extensionName]&&(f.accept(y[qs.extensionName]),g[qs.extensionName]=f)}catch{Js(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let f={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(f,(y,P,h,p)=>{if(!y)return Pp(r,P||401,h,p);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(f))return Pp(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[mde])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>J8)return Pp(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${lde("sha1").update(r+pde).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),u._protocol=g)}if(t[qs.extensionName]){let g=t[qs.extensionName].params,f=q8.format({[qs.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${f}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",X8),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Sp,this)})),a(u,n)}};Q8.exports=DI;function fde(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Sp(e){e._state=Z8,e.emit("close")}function X8(){this.destroy()}function Pp(e,t,r,o){r=r||FP.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${FP.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Js(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Js),e.emit("wsClientError",i,r,t)}else Pp(r,o,n,s)}});var yde,hde,Sde,Pde,Ade,bde,t3,_de,Ap,r3=l(()=>{yde=m(V8(),1),hde=m(MP(),1),Sde=m(Za(),1),Pde=m(vI(),1),Ade=m(xI(),1),bde=m(NI(),1),t3=m(HP(),1),_de=m(e3(),1),Ap=t3.default});var HI,o3=l(()=>{"use strict";HI=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var kde,FI,n3=l(()=>{"use strict";Cg();o3();kde=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",FI=(e={})=>{let t=e.env??process.env,r=HI(t[Rg]),o=HI(t[vg]);return{mode:kde(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var s3=l(()=>{"use strict";Cg()});var i3=l(()=>{"use strict";n3();s3()});var $I=l(()=>{"use strict"});var nl,Ys,a3,Tde,zI,UI,l3,c3,BI,d3,bp,GI=l(()=>{"use strict";nl=m(require("node:fs")),Ys=m(require("node:os")),a3=m(require("node:path"));$I();Ei();Tde=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zI=(e=Ys.default.hostname())=>a3.default.join(Ys.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),UI=e=>{if(!nl.default.existsSync(e))return null;try{let t=JSON.parse(nl.default.readFileSync(e,"utf8"));return!Tde(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},l3=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},c3=(e,t)=>{nl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},BI=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??zI(),o=UI(r);if(o!==null&&o.pid!==process.pid&&Vt(o.pid)&&l3(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Ys.default.hostname(),macOsUsername:Ys.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return c3(r,n),{ok:!0}},d3=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??zI(),o=UI(r);return o!==null&&o.pid!==process.pid&&Vt(o.pid)&&l3(o)?{ok:!1}:(c3(r,{hostname:Ys.default.hostname(),macOsUsername:Ys.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},bp=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??zI();UI(r)?.pid===process.pid&&nl.default.existsSync(r)&&nl.default.unlinkSync(r)}});var VI,_p,Ede,Rde,vde,Cde,KI,u3=l(()=>{"use strict";VI=require("node:child_process"),_p=m(require("node:path"));Ei();pg();Ede=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Rde=(e,t)=>{if(Ede(e)||!/\bnode\b/.test(e))return!1;let r=_p.default.resolve(t),o=_p.default.join(r,"app",zl),n=_p.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===zl||i==="agent-witch.ts")return e.includes(r);try{let a=_p.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},vde=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,VI.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Cde=(e,t,r)=>{let o=vde(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||Rde(d,t)&&n.push(c)}return n},KI=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,VI.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=Cde(r,e.installDir,t),n=[];for(let s of o)if(Vt(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var kp,wp,p3,Lde,qI,m3=l(()=>{"use strict";kp=m(require("node:fs")),wp=m(require("node:path"));Xe();p3=(e,t)=>{!kp.default.existsSync(e)||kp.default.existsSync(t)||(kp.default.mkdirSync(wp.default.dirname(t),{recursive:!0}),kp.default.renameSync(e,t))},Lde=e=>{if(e.profileEmail===null)return;let t=wp.default.join(e.installDir,zt);p3(wp.default.join(t,kn),e.mainLogPath),p3(wp.default.join(t,wn),e.errorLogPath)},qI=e=>{let t=N();e!==void 0&&t.installDir!==e||Lde(t)}});var g3=l(()=>{"use strict";Pd();qy();qy();!_t()&&Dn(__agentWitchImportMetaUrl)&&(async()=>{bt("agent-witch-wake-server");let e=await us(),t=Gr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var f3=l(()=>{"use strict";g3()});var y3=l(()=>{"use strict";ld()});var JI,h3=l(()=>{"use strict";$I();f3();GI();y3();JI=async(e={})=>{let t=e.skipInProcessBridge?null:await Ky();Cy();let r=setInterval(()=>{Cy()},6e4),o=setInterval(()=>{if(!d3().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Tp,$P,Wde,S3,P3,zP,A3,b3,YI,_3,UP,k3=l(()=>{"use strict";Tp=m(require("node:fs")),$P=m(require("node:path")),Wde="pending-run-inputs.json",S3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),P3=e=>{let t=e.profileEmail?$P.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return $P.default.join(t,Wde)},zP=e=>{let t=P3(e);if(!Tp.default.existsSync(t))return{};try{let r=JSON.parse(Tp.default.readFileSync(t,"utf8"));return S3(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!S3(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},A3=(e,t)=>{let r=P3(e);Tp.default.mkdirSync($P.default.dirname(r),{recursive:!0}),Tp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},b3=e=>Object.values(zP(e)),YI=(e,t)=>zP(e)[t]!==void 0,_3=(e,t)=>{let r=zP(e);r[t.agentRunId]=t,A3(e,r)},UP=(e,t)=>{let r=zP(e);delete r[t],A3(e,r)}});var BP=l(()=>{"use strict";ee()});var w3=l(()=>{"use strict";ee()});var GP=l(()=>{"use strict";ee()});var VP=l(()=>{"use strict";ee()});var Ep=l(()=>{"use strict";ee()});var Ode,Mde,Rp,XI=l(()=>{"use strict";qt();BP();w3();GP();VP();Ep();Ode={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Mde={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Rp=e=>{if(!we(e.writerAgent))return"the selected writer";let t=kt(e.writerAgent);if(Ze(e.writerExecutionBackend)==="api"&&t!==null){let r=ct(Be(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Pc(t,r.model);return`${Mde[t]} model ${o}`}}return Ode[e.writerAgent]}});var jde,Nde,T3,E3,R3=l(()=>{"use strict";jde=/"input_tokens"\s*:\s*(\d+)/,Nde=/"output_tokens"\s*:\s*(\d+)/,T3=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},E3=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=T3(jde.exec(t)),o=T3(Nde.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var KP=l(()=>{"use strict";Wt()});var vp,qP,Dde,ZI,v3,C3,L3,QI,x3=l(()=>{"use strict";vp=m(require("node:fs")),qP=m(require("node:path"));KP();Dde="run-completion-outbox.json",ZI=e=>{let t=e.profileEmail?qP.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return qP.default.join(t,Dde)},v3=e=>{let t=ZI(e);if(!vp.default.existsSync(t))return[];try{let r=JSON.parse(vp.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},C3=(e,t)=>{vp.default.mkdirSync(qP.default.dirname(ZI(e)),{recursive:!0}),vp.default.writeFileSync(ZI(e),JSON.stringify(t,null,2),"utf8")},L3=(e,t)=>{let r=[...v3(e).filter(o=>o.runId!==t.runId),t];C3(e,r)},QI=async e=>{if(e.cloudApi===null)return;let t=v3(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Jc(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);C3(e.layout,r)}});var I3=l(()=>{"use strict"});var eW,Cp,Fde,Xs,W3=l(()=>{"use strict";I3();eW=new Map,Cp=e=>{let t=eW.get(e);t!==void 0&&(clearInterval(t),eW.delete(e))},Fde=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Xs=(e,t,r,o={})=>{Cp(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Cp(t);return}let i=o.onTick?.()??{};Fde(e,t,n,i)};s(),eW.set(t,setInterval(s,15e3))}});var O3=l(()=>{"use strict";Wt()});var M3,j3=l(()=>{"use strict";O3();M3=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Qe(t)}});var tW,Lp,Ro,rW,Hr,N3,JP=l(()=>{"use strict";tW=new Set,Lp=new Map,Ro=(e,t)=>{if(t.length===0)return;let r=Lp.get(e)??[];r.push(t),Lp.set(e,r)},rW=e=>{tW.add(e);let t=Lp.get(e)??[];return Lp.delete(e),t},Hr=e=>tW.has(e),N3=e=>{tW.delete(e),Lp.delete(e)}});var sl,D3,H3,F3=l(()=>{"use strict";sl=m(require("node:path")),D3=require("node:url");Nn();H3=()=>{if(_t()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?sl.default.dirname(sl.default.resolve(e)):sl.default.dirname(sl.default.resolve(__filename))}return sl.default.dirname((0,D3.fileURLToPath)(__agentWitchImportMetaUrl))}});var $3,z3,U3,B3,ht,il,G3,V3,al,oW,nW,sW,K3,iW,q3,YP=l(()=>{"use strict";$3=require("node:crypto"),z3=m(require("node:fs")),U3=m(require("node:path")),B3=require("node:url");Ei();Nn();F3();ht=new Map,G3=async()=>{if(il!==void 0)return il;try{if(_t()){let e=H3(),t=U3.default.join(e,"deps","node-pty","lib","index.js");if(z3.default.existsSync(t)){let r=await import((0,B3.pathToFileURL)(t).href);return il=r,r}}return il=await import("node-pty"),il}catch{return il=null,null}},V3=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},al=(e,t,r)=>{let o=ht.get(e);if(o!==void 0){ht.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},oW=(e,t)=>{let r=ht.get(e);return r===void 0?!1:(r.pty.write(t),!0)},nW=(e,t,r)=>{let o=ht.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},sW=e=>{for(let t of ht.values())if(!(t.mode!=="agent"||t.runId!==e))return Vt(t.pty.pid);return!1},K3=e=>{for(let[t,r]of ht.entries())if(!(r.mode!=="agent"||r.runId!==e)){ht.delete(t);try{r.pty.kill()}catch{}return!0}return!1},iW=async e=>{let t=await G3();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this computer. Install Agent Witch deps again.\r
`},requestId:e.requestId}),!1;ht.get(e.shellSessionId)!==void 0&&al(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return ht.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{V3(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{ht.get(e.shellSessionId)?.pty===n&&(ht.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},q3=async e=>{let t=e.shellSessionId??(0,$3.randomUUID)(),r=await G3();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return ht.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{V3(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{ht.get(t)?.pty===o&&(ht.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var XP,J3,Y3=l(()=>{"use strict";XP="[[AWAITING_INPUT]]",J3=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",XP,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var xp,X3,ZP=l(()=>{"use strict";Y3();xp=e=>{let t=e.indexOf(XP);if(t<0)return null;let o=e.slice(t+XP.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},X3=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",J3].join(`
`)});var Z3,Q3=l(()=>{"use strict";JP();YP();ZP();Z3=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Hr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Ro(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await q3({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=xp(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var t6,r6,o6,e6,vo,QP=l(()=>{"use strict";t6=require("node:child_process"),r6=m(require("node:fs")),o6=m(require("node:path"));pg();e6=12e4,vo=(e,t)=>{let r=o6.default.join(e,"app",MM,"ensure-writer.sh");return r6.default.existsSync(r)?new Promise((o,n)=>{let s=(0,t6.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(e6/1e3)}s`))},e6);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var n6,Zs,Wp,eA,aW,Ip,tA,rA,lW,cW,$de,ll,zde,Ude,dW,uW=l(()=>{"use strict";n6=require("node:child_process");qt();QP();GP();BP();Ep();VP();Zs=new Map,Wp=e=>e==="cursor"||e==="antigravity",eA=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",aW=e=>Zs.get(e)?.warmed===!0,Ip=e=>{let t=Zs.get(e);Zs.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},tA=e=>Zs.get(e)?.conversationStarted===!0,rA=e=>{let t=Zs.get(e);Zs.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},lW=e=>{Zs.delete(e)},cW=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",$de={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ll=e=>`${$de[e]} is ready on your computer.
Send a task from the box below when you are ready.
`,zde=(e,t,r,o)=>new Promise(n=>{let s=Ug(t,r),i=[],a=(0,n6.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Ude=(e,t)=>{let r=ll(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},dW=async e=>{if(!we(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Ze(e.runConfig.writerExecutionBackend)==="api"){let r=kt(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Be(e.runConfig.layout.configPath);return ct(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this computer (no local CLI).
`),Ip(e.writerAgent),{exitCode:0,output:ll(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your computer\u2026
`),await vo(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Wp(e.writerAgent)&&Ip(e.writerAgent);let t=await zde(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Ude(e.writerAgent,t.output):ll(e.writerAgent)}}});var Qs,pW=l(()=>{"use strict";Qs={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var s6,Bde,Gde,i6,Vde,mW,a6=l(()=>{"use strict";pW();s6=/you(?:'|')ve hit your session limit/i,Bde=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Gde=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,i6=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},Vde=e=>{let t=Gde.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},mW=e=>{let t=e.trim();if(t.length===0)return null;if(s6.test(t))return{code:Qs.SESSION_LIMIT,resetHint:Vde(t),matchedLine:i6(t,s6)};for(let r of Bde)if(r.test(t))return{code:Qs.PROVIDER_QUOTA,resetHint:null,matchedLine:i6(t,r)};return null}});var oA,nA,gW,fW=l(()=>{"use strict";oA="[[AGENT_RUN_WRITER_EXECUTION]]",nA="cli-writer-api-key-missing",gW="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var yW=l(()=>{"use strict";fW()});var l6=l(()=>{"use strict";yW()});var sA=l(()=>{"use strict";pW();a6();fW();yW();l6()});var iA,c6=l(()=>{"use strict";iA={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var d6,u6=l(()=>{"use strict";d6="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var p6,m6=l(()=>{"use strict";sA();u6();p6=e=>e.code===Qs.SESSION_LIMIT?d6:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var g6,f6=l(()=>{"use strict";sA();c6();m6();g6=e=>{let t=mW(e.output);return t!==null?{status:iA.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:p6(t)}:{status:e.exitCode===0?iA.COMPLETED:iA.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var hW,ZZe,y6=l(()=>{"use strict";hW={OPEN:"open",APPROVAL:"approval"},ZZe=hW.APPROVAL});var cl,aA,h6,Jde,S6,P6,A6,Op,SW,PW=l(()=>{"use strict";cl=m(require("node:fs")),aA=m(require("node:path")),h6="runs",Jde=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),S6=e=>{let t=e.profileEmail!==null?aA.default.join(e.installDir,"profiles",e.profileEmail,h6):aA.default.join(e.installDir,h6);return cl.default.mkdirSync(t,{recursive:!0}),t},P6=(e,t)=>aA.default.join(S6(e),`${t}.json`),A6=(e,t)=>{cl.default.writeFileSync(P6(e,t.id),JSON.stringify(t,null,2))},Op=(e,t)=>{let r=P6(e,t);if(!cl.default.existsSync(r))return null;try{let o=JSON.parse(cl.default.readFileSync(r,"utf8"));return!Jde(o)||typeof o.id!="string"?null:o}catch{return null}},SW=e=>{let t=S6(e),r=cl.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Op(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var Yde,b6,_6=l(()=>{"use strict";f6();y6();PW();Yde=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=g6({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:hW.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},b6=(e,t)=>{let r=Yde(t);return A6(e,r),r}});var k6=l(()=>{"use strict";GS()});var w6,T6=l(()=>{"use strict";sA();w6=()=>[oA,`agentRunWriterExecutionBackend=${nA}`,`agentRunWriterExecutionReasonCode=${gW}`].join(`
`)});var hn,lA=l(()=>{"use strict";hn=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var AW,Xde,Zde,E6,R6=l(()=>{"use strict";AW=e=>e.toLocaleString("en-US"),Xde=e=>e<.01?e.toFixed(4):e.toFixed(3),Zde=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${Xde(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 Agent Witch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${AW(e.inputTokens)} in / ${AW(e.outputTokens)} out (${AW(e.totalTokens)} total)`,t].join(`
`)},E6=(e,t)=>{if(t===void 0)return e;let r=Zde(t);if(e.includes("\u2014 Agent Witch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var v6=l(()=>{"use strict";ee()});var L6,Mp,Le,bW,cA,C6,Qde,eue,x6,I6,W6,jp,_W,kW,wW,O6,tue,$t,Np,Sn,M6,rue,oue,dA,TW,EW,RW,j6=l(()=>{"use strict";L6=require("node:child_process");ee();qt();k3();Nu();XI();R3();Sc();x3();KP();W3();Ei();j3();JP();YP();ZP();Q3();uW();_6();k6();T6();lA();R6();Ri();v6();Ep();Kl();ZP();Mp=new Map,Le=new Map,bW=new Set,cA=new Map,C6=e=>{e!==void 0&&!cA.has(e)&&cA.set(e,Date.now())},Qde=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Hr(t)){$t(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Ro(t,n)},eue=(e,t,r,o,n)=>{if(!sk(e,n))return;let s=`${w6()}
`;Qde(t,r,o,s);let i=Le.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},x6=130,I6=`

Stopped by user.`,W6=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:hn(e)},jp=null,_W=e=>{jp=e},kW=(e,t)=>{if(jp===null)return;let r=wC(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||sw(jp,t,r)},wW=async e=>{await QI({layout:e,cloudApi:jp})},O6=e=>{let t=Mp.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Vt(t.pid)},tue=e=>Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),$t=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Np=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=yi(s),c=Le.get(r);if(a!==null&&c!==void 0){let d=GM(a),u=O6(r)||sW(r);d!==null&&!u&&Sn(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return BM(a)}}),Sn=(e,t,r,o,n,s,i,a)=>{let c=Mi(s,a),d=n,u=E6(c.output,c.llmUsage);if(r!==void 0){let f=cA.get(r);cA.delete(r),f!==void 0&&_C({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-f)/1e3))});let y=E3(c.llmUsage,u);y!==null&&vq({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:y})}r!==void 0&&bW.has(r)&&(bW.delete(r),d=x6,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${I6}`:"Stopped by user.");let g=r!==void 0?wC(e.layout.reportsDir,r):null;if(r!==void 0){Cp(r),Ec(e.layout,r),Hr(r)&&($t(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),N3(r));let f=Le.get(r);Tq({reportsDir:e.layout.reportsDir,agentRunId:r,input:hn(i),output:u,...f!==void 0?{writerLabel:Rp({writerAgent:f.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),f!==void 0&&US({layout:e.layout,writerAgent:f.writerAgent,projectFolderPath:f.projectFolderPath,userPrompt:f.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),b6(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),L3(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),QI({layout:e.layout,cloudApi:jp}),Le.delete(r),Mp.delete(r),UP(e.layout,r)}$t(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),ac(e.layout)},M6=(e,t,r,o,n,s,i)=>{let a=Le.get(r),c=a?.accumulatedOutput??s;_3(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Xs(t,r,()=>YI(e.layout,r),Np(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),$t(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},rue=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=y=>{if(!(n===void 0||y.length===0)){if(Hr(n)){$t(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:y},requestId:o});return}Ro(n,y)}};if(n!==void 0){let y=Le.get(n);Mp.set(n,t),Le.set(n,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,accumulatedOutput:y?.accumulatedOutput??""}),$t(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Xs(r,n,()=>O6(n),Np(e,r,n,o,y?.projectFolderPath,y?.reportKey))}let g=a==="claude-cli",f=[];t.stdout?.on("data",y=>{let P=y.toString("utf8");if(g?f.push(P):(c.push(P),u(P)),d||n===void 0)return;let h=xp(c.join(""));if(h!==null){d=!0,t.kill("SIGTERM");let p=Le.get(n),S=[p?.accumulatedOutput??"",h.partialOutput].filter(b=>b.length>0).join(`

`);p!==void 0&&(p.accumulatedOutput=S),Mp.delete(n),M6(e,r,n,o,h.question,S,s)}}),t.stderr?.on("data",y=>{let P=y.toString("utf8");c.push(P),u(P)}),t.on("close",y=>{if(d)return;rA(a);let P=n!==void 0?Le.get(n):void 0,h=g?Mi(f.join("")):{output:c.join("").trim(),llmUsage:void 0},p=g?c.join("").trim():"",S=[h.output.trim(),p].filter(k=>k.length>0).join(`
`);g&&h.output.trim().length>0&&u(h.output);let b=P!==void 0&&P.accumulatedOutput.length>0?`${P.accumulatedOutput}

${S}`.trim():S;Sn(e,r,n,o,y??-1,b,s,h.llmUsage)}),t.on("error",y=>{d||Sn(e,r,n,o,-1,y.message,s)})},oue=(e,t,r,o,n,s,i,a,c)=>{let d=W6(r,c);s!==void 0&&(Le.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),$t(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Xs(n,s,()=>Le.has(s),Np(e,n,s,o,i,a))),_c(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Hr(s)){$t(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}Ro(s,g)}}).then(g=>{rA(t),Sn(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let f=g instanceof Error?g.message:String(g);Sn(e,n,s,o,-1,f,r)})},dA=(e,t,r,o,n,s,i,a,c,d,u,g)=>{let f=W6(r,u);if(ic(e.layout),Xn(e,t)){C6(s),oue(e,t,r,o,n,s,c,d,f);return}let y=Ar(t,r,tue(e),i);if(y===null){Sn(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}C6(s);let P=M3({workspace:e.workspace,projectFolderPath:c}),h=()=>{let p=(0,L6.spawn)(y.command,[...y.args],{cwd:P,stdio:["ignore","pipe","pipe"],env:g??process.env});rue(e,p,n,o,s,r,f,t)};if(s===void 0){h();return}Le.set(s,{originalPrompt:r,userTranscriptPrompt:f,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Le.get(s)?.accumulatedOutput??""}),eue(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Vl({reportKey:d,agentRunId:s,userSummary:"Task started on your computer."}),Xs(n,s,()=>Le.has(s),Np(e,n,s,o,c,d)),Z3({socket:n,sendMessage:$t,requestId:o,agentRunId:s,shellSessionId:a,command:y.command,args:y.args,cwd:P,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:p=>{a!==void 0&&al(a,k=>{$t(n,k)},o);let S=Le.get(s),b=[S?.accumulatedOutput??"",p.partialOutput].filter(k=>k.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=b),M6(e,n,s,o,p.question,b,r)},onFinished:(p,S)=>{rA(t);let b=Mi(S),k=Le.get(s),A=k!==void 0&&k.accumulatedOutput.length>0?`${k.accumulatedOutput}

${b.output}`.trim():b.output;Sn(e,n,s,o,p,A,r,b.llmUsage)}}).then(p=>{if(!p){h();return}Xs(n,s,()=>sW(s),Np(e,n,s,o,c,d))}).catch(p=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",p instanceof Error?p.message:p),h()})},TW=(e,t,r,o)=>{UP(e.layout,t.agentRunId),t.shellSessionId!==void 0&&$t(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=X3(t),s=Le.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;dA(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},EW=(e,t)=>{for(let r of b3(e.layout))Le.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:hn(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Xs(t,r.agentRunId,()=>YI(e.layout,r.agentRunId),{awaitingInput:!0}),$t(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},RW=(e,t,r,o)=>{let n=Le.get(r);if(n===void 0)return!1;bW.add(r),Cp(r);let s=Mp.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(K3(r))return!0;UP(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${I6}`:"Stopped by user.";return Sn(e,t,r,o,x6,i,n.originalPrompt),!0}});var nue,vW,N6=l(()=>{"use strict";xc();nue=()=>`http://127.0.0.1:${Jt()}/restart`,vW=async()=>{try{let e=await fetch(nue(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var D6=l(()=>{"use strict";wd()});var H6=l(()=>{"use strict";QC()});var CW,F6=l(()=>{"use strict";CW=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Dp,sue,LW,xW,$6=l(()=>{"use strict";G();ae();D6();jT();H6();F6();Ri();Dp=(e,t)=>{Zo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},sue=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(b_(),A_)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},LW=e=>CW({localBundleVersion:Fe(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),xW=async e=>{let t=Fe(e.layout.installDir)?.bundleVersion??null;if(!CW({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Kt(e.layout)){lc({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Dp(e.layout,{summary:r,action:"install-bundle-update-start"}),Br({launchAgentLabel:ye(e.layout.installDir),installDir:e.layout.installDir});let o=await Ba({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Dp(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await sue();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Dp(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Dp(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Dp(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var iue,IW,z6=l(()=>{"use strict";iue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),IW=e=>{if(!iue(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var WW,OW,U6=l(()=>{"use strict";ST();PT();WW=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=cd({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},OW=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await no(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var B6,aue,lue,cue,Hp,G6=l(()=>{"use strict";B6=m(require("node:os"));Xe();aue="Default",lue=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),cue=e=>{let t=B6.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Hp=()=>{let e=N(),t=Ll(e),r=lue(aue);return`${cue(t)}/${r.length>0?r:"project"}`}});var V6=l(()=>{"use strict";wd()});var K6,MW,q6=l(()=>{"use strict";V6();K6=!1,MW=e=>{K6||(K6=!0,process.on("uncaughtException",t=>{ms(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;ms(e,{kind:"crash",message:r,stack:o})}))}});var J6,due,jW,Y6=l(()=>{"use strict";J6=require("node:child_process");QP();qt();GP();BP();Ep();VP();due=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,J6.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},jW=async e=>{if(!we(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Ze(e.runConfig.writerExecutionBackend)==="api"){let r=kt(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Be(e.layout.configPath),n=ct(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in Agent Witch Local \u2192 Writer API.`}}}try{await vo(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await due(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var NW,X6=l(()=>{"use strict";NW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var Z6,DW,Q6=l(()=>{"use strict";Z6=require("node:crypto"),DW=()=>(0,Z6.randomUUID)()});var dl,eY,uA=l(()=>{"use strict";dl="[[WORKING_ESTIMATE]]",eY=(e,t,r,o="")=>["Estimate how long the following task will take on this computer, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",dl,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var tY,rY=l(()=>{"use strict";tY=e=>e===null||e<=0?"Estimate saved locally. Starting work on your computer\u2026":e<60?`Estimated ~${e}s. Starting work on your computer\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your computer\u2026`});var uue,oY,nY=l(()=>{"use strict";uA();uue=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,oY=e=>{if(!e.includes(dl))return null;let t=null;for(let r of e.matchAll(uue)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var pue,HW,sY=l(()=>{"use strict";nY();pue=/^(\d{1,6})\b/,HW=e=>{let t=oY(e);if(t!==null)return t;let r=pue.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var mue,gue,fue,pA,FW=l(()=>{"use strict";qt();bd();mue="http://127.0.0.1:11434",gue=45e3,fue=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},pA=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||mue,o=t===void 0?(await Qt({commands:Te({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(gue)});return n.ok?fue(await n.json()):null}catch{return null}}});var $W,zW,UW,iY=l(()=>{"use strict";Kl();uA();lA();rY();sY();Nu();FW();$W=async e=>{let t=hn(e.wrappedPrompt),r=Eq(e.reportsDir);return{estimateOutput:await pA(eY(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},zW=e=>{let t=HW(e.estimateOutput);t!==null&&jS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},UW=e=>{let t=HW(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=tY(t);return Gl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:yr.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),jS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var mA,aY,BW=l(()=>{"use strict";mA="[[WORKING_TOKEN_ESTIMATE]]",aY=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this computer.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",mA,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var lY,yue,cY,dY=l(()=>{"use strict";BW();lY=/^(\d{1,8})\b/,yue=e=>{let t=e.indexOf(mA);if(t<0)return null;let r=e.slice(t+mA.length).trim(),o=lY.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},cY=e=>{let t=yue(e);if(t!==null)return t;let r=lY.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var GW,VW,uY=l(()=>{"use strict";BW();lA();dY();Nu();FW();GW=async e=>{let t=hn(e.wrappedPrompt),r=Cq(e.reportsDir);return{estimateOutput:await pA(aY(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},VW=e=>{let t=cY(e.estimateOutput);return t===null?null:(Rq({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var pY=l(()=>{"use strict";GI();u3();m3();h3();xc();j6();QP();qt();PW();JP();N6();TT();$6();Ri();z6();U6();KP();G6();q6();Y6();mg();X6();Q6();uA();Kl();iY();uY();XI();bd();YP();uW()});var mY={};St(mY,{buildContinuationPromptWithContext:()=>Pue});var hue,Sue,Pue,gY=l(()=>{"use strict";hue=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Sue=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Pue=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=Sue(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${hue(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var fY={};St(fY,{readHarnessExportSets:()=>bue});var Fp,KW,gA,Aue,bue,yY=l(()=>{"use strict";Fp=m(require("node:fs")),KW=m(require("node:path"));Xe();gA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Aue=e=>{if(!Fp.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Fp.default.readFileSync(e.harnessManifestPath,"utf8"));if(gA(t))return t}catch{return null}return null},bue=(e,t)=>{let r=N(t),o=Aue(r);if(o===null)return[];let n=gA(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!gA(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!gA(u))continue;let g=typeof u.path=="string"?u.path:void 0,f=typeof u.id=="string"?u.id:"",y=typeof u.kind=="string"?u.kind:"",P=typeof u.title=="string"?u.title:"";if(g===void 0||f.length===0||y.length===0||P.length===0)continue;let h=g.startsWith("shared/")?KW.default.join(r.harnessRootDir,g):KW.default.join(r.harnessSetsDir,i,g);Fp.default.existsSync(h)&&d.push({id:f,kind:y,title:P,content:Fp.default.readFileSync(h,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var e0,JW,ul,hY,_ue,SY,PY,qW,AY,YW,XW,ZW,te,J,QW,kue,$p,wue,Tue,Eue,Rue,vue,Cue,Lue,xue,zp,bY=l(()=>{"use strict";e0=require("node:child_process"),JW=m(require("node:fs")),ul=m(require("node:os"));r3();G();ae();qn();uI();i3();ee();tI();ee();Pr();wd();GE();EP();GS();Wt();Go();VT();At();pY();hY=3e4,_ue=3e4,SY=new Map,PY=new Map,qW=new Map,AY=new Map,YW=new Map,XW=new Map,ZW=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===Ap.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Zo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Jy(r,"out",t)))},QW=e=>e,kue=e=>{if(!JW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(JW.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},$p=(e,t)=>{let r=kue(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:ul.default.hostname(),manifest:r}})},wue=async(e,t,r,o,n,s,i=!1,a,c,d,u,g)=>{let f=g?.trim()??"";if(!we(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let y=Rp({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),P=await Qt({commands:Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),h=s!==void 0?$W({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:P?.estimateModel,capabilityNote:P?.capabilityNote}).catch(()=>null):null,p=s!==void 0?GW({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:P?.estimateModel,capabilityNote:P?.capabilityNote}).catch(()=>null):null,S=Wp(t)&&!aW(t);if(S){try{await vo(e.layout.installDir,t)}catch(D){let xe=D instanceof Error?D.message:String(D);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${xe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ip(t)}else if(!Wp(t))try{await vo(e.layout.installDir,t)}catch(D){let xe=D instanceof Error?D.message:String(D);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${xe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let b=wc(d,Hp,g);if(b===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this computer yet. Open Agent Witch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}it({projectFolderPath:b,...f.length>0?{projectId:f}:{}}),i||zu(e.layout,t,b);let k=BS({sessionContinuation:i,supportsWriterSessionContinuation:eA(t),isWriterConversationStarted:tA(t)}),A=i&&k==="first"?$u(e.layout,t,b):null,_=A!==null?Ua(e.layout,A):null,E=_!==null&&_.turns.length>0,T=HC({sessionContinuation:i,supportsWriterSessionContinuation:eA(t),isWriterConversationStarted:tA(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:E,userPromptCharacterCount:r.length}),C=r;if(T.continuationStrategy==="source_run_seed"){let D=typeof c=="string"&&c.length>0?Op(e.layout,c):null;if(D!==null){let{buildContinuationPromptWithContext:xe}=await Promise.resolve().then(()=>(gY(),mY));C=xe({priorPrompt:D.prompt,priorOutput:D.resultOutput??"",userMessage:r})}}else T.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(C=HS({priorTurns:_.turns,userMessage:r}));let x=T.ragLimit>0?await ma({layout:e.layout,query:C,limit:T.ragLimit,minScore:T.ragMinScore,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],W=T.ragLimit>0&&b.trim().length>0?await UE({layout:e.layout,query:C,limit:2,minScore:.32,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],j=T.injectMemory?CC(e.layout,b,f.length>0?f:void 0):[],M=`${xC(j,T.memoryEntryLimit)}${FE(x)}${BE(W)}${C}`,B=u?.trim()??(s!==void 0&&b.trim().length>0?DW():void 0);if(s!==void 0&&B!==void 0&&B.length>0&&b.trim().length>0){Vl({reportKey:B,agentRunId:s,userSummary:"Working on your computer\u2026"});let D=M;h!==null&&h.then(xe=>{if(xe===null)return;let Pn=UW({estimateOutput:xe.estimateOutput??"",reportKey:B,agentRunId:s,reportsDir:e.layout.reportsDir,task:xe.task,writerLabel:xe.writerLabel,embedding:xe.embedding});if(Pn.estimateSeconds===null)return;kW(e.layout.reportsDir,s);let An=`${dl}
${Pn.estimateSeconds}
`;if(Hr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:An},requestId:o});return}Ro(s,An)}).catch(()=>{}),M=NW(D),M=Nb(M,{agentRunId:s,reportKey:B,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&h!==null&&h.then(D=>{D!==null&&zW({estimateOutput:D.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:D.task,writerLabel:D.writerLabel,embedding:D.embedding})}).catch(()=>{}),s!==void 0&&p!==null&&p.then(D=>{D!==null&&VW({estimateOutput:D.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:D.task,writerLabel:D.writerLabel})}).catch(()=>{});let ie=s!==void 0&&ZW.get(s)===!0;if(s!==void 0&&b.trim().length>0){let D=await ey(b);XW.set(s,D),B!==void 0&&B.length>0&&YW.set(s,B)}dA(e,t,M,o,QW(n),s,{sessionTurn:T.sessionTurn},a,b,B,r,ek(e.layout,s,ie)),S&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:cW(t)},requestId:o})},Tue=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await dW({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=we(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?ll(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Eue=(e,t,r)=>new Promise(o=>{if(!we(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Ar(t,r,Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,e0.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),Rue=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=kr(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=$e(e.wsUrl)??Pt,g=await Fk({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=ts({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&$p(o,e.layout),!0},vue=async(e,t,r,o)=>{if(await Rue(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!we(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}ic(e.layout);let i=await(async()=>{try{await vo(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Eue(e,n,s)})().finally(()=>{ac(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),$p(o,e.layout)},Cue=e=>{let t=1e3*2**e;return Math.min(_ue,t)},Lue=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>t.restartInFlight?"already_in_progress":Kt(e.layout)?(cc(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,vW().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=(p,S,b,k)=>{J(p,{type:"device.restart.ack",payload:ck({status:b,reason:S}),...k!==void 0?{requestId:k}:{}},e.layout)},n=(p,S="system.ack")=>{if(!t.selfUpdateInFlight&&LW({installDir:e.layout.installDir,remoteBundleVersion:p})){if(Kt(e.layout)){lc({layout:e.layout,remoteBundleVersion:p,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,xW({layout:e.layout,remoteBundleVersion:p,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},s=()=>{let p=Ce(e.layout);p!==null&&ze(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,c(),d(),P())},i=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},c=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},d=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===Ap.OPEN||p.readyState===Ap.CONNECTING)&&p.close()},u=()=>{a(),t.localHealthTimer=setInterval(s,hY)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=Cue(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,P()},p)},f=p=>{i();let S=()=>{let b=rc(e.layout.installDir),k=Jt();J(p,{type:"agent.heartbeat",payload:{hostname:ul.default.hostname(),macOsUsername:ul.default.userInfo().username,wakeError:t.wakeError,wakePort:k,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,hY)},y=(p,S)=>{if(typeof p.type!="string")return;if(GT(p)){t.stopped=!0,i(),c(),d(),zT({layout:e.layout}).finally(()=>{bp(),process.exit(0)});return}Zo(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),Jy(e.layout,"in",p);let b=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&te(p.payload)){let k=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",A=typeof p.payload.origin=="string"?p.payload.origin:"",_=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",E=typeof p.payload.challenge=="string"?p.payload.challenge:"",T=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!dI({serverPublicKey:k,origin:A,devicePublicKey:_,challenge:E,serverAttestation:T})){t.wakeError="Server attestation verification failed",Zo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&te(p.payload)){let k=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";Zo(e.layout,{direction:"local",type:"writer.ensure",summary:k,action:"ensure-writer"}),jW({layout:e.layout,writerAgent:k,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(A=>{J(S,{type:"writer.status",payload:A},e.layout)})}if(p.type==="install.bundle.update"&&te(p.payload)){let k=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";k.length>0&&n(k,"install.bundle.update")}if(p.type==="system.ack"){Hg(e.layout,{wsUrl:e.wsUrl});let k=te(p.payload)?p.payload:null,A=IW(k);A!==null&&n(A)}if(p.type==="device.restart"){let k=r("cloud-device-restart");o(S,"cloud-device-restart",k,b)}if(p.type==="automations.sync"&&te(p.payload)&&WW(p.payload),p.type==="project.message.history"&&te(p.payload)){NL({payload:p.payload});return}if(p.type==="automations.run"&&te(p.payload)&&OW(p.payload),p.type==="terminal.stream.accepted"&&te(p.payload)){let k=typeof p.payload.runId=="string"?p.payload.runId:"";if(k.length>0){let A=rW(k);for(let _ of A)J(S,{type:"terminal.stream.chunk",payload:{runId:k,chunk:_},requestId:b})}}if(p.type==="agent.agentRun.list"&&J(S,{type:"dashboard.agentRun.list.result",payload:{runs:SW(e.layout)},requestId:b}),p.type==="agent.agentRun.get"&&te(p.payload)){let k=typeof p.payload.runId=="string"?p.payload.runId:"",A=k.length>0?Op(e.layout,k):null;J(S,{type:"dashboard.agentRun.get.result",payload:{run:A},requestId:b})}if(p.type==="command.claude.run"&&te(p.payload)){let k=p.payload.prompt,A=typeof p.payload.writerAgent=="string"&&we(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",_=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,E=p.payload.sessionContinuation===!0,T=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,C=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,x=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,W=wc(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,Hp,x),j=K_(p.payload.compositionSnapshot),M=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof k=="string"&&k.trim().length>0){if(console.log(`[agent-witch] Running ${A} task (${E?"continue":"first"})\u2026`),W===null){J(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this computer yet. Open Agent Witch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(j!==null){let B=J_(e.layout,j);if(B!==null){J(S,{type:"command.claude.result",payload:{exitCode:-1,output:B,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let ie=X_(e.layout,_,j);if(!ie.ok){J(S,{type:"command.claude.result",payload:{exitCode:-1,output:ie.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}ZW.set(_,j.entries.some(D=>D.scope==="run"))}}_!==void 0&&C!==void 0&&SY.set(_,C),_!==void 0&&(PY.set(_,W),x!==void 0&&x.trim().length>0&&qW.set(_,x.trim()),AY.set(_,k.trim()),it({projectFolderPath:W,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),wue(e,A,k.trim(),b,S,_,E,C,T,W,M,x)}}if(p.type==="shell.session.open"&&te(p.payload)){let k=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",A=typeof p.payload.cols=="number"?p.payload.cols:120,_=typeof p.payload.rows=="number"?p.payload.rows:32;k.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),iW({shellSessionId:k,cwd:e.workspace,cols:A,rows:_,send:E=>{J(S,E)},requestId:b}))}if(p.type==="shell.session.close"&&te(p.payload)){let k=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";k.length>0&&al(k,A=>{J(S,A)},b)}if(p.type==="shell.input"&&te(p.payload)){let k=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",A=typeof p.payload.data=="string"?p.payload.data:"";k.length>0&&A.length>0&&oW(k,A)}if(p.type==="shell.resize"&&te(p.payload)){let k=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",A=typeof p.payload.cols=="number"?p.payload.cols:0,_=typeof p.payload.rows=="number"?p.payload.rows:0;k.length>0&&A>0&&_>0&&nW(k,A,_)}if(p.type==="command.writer.session.end"&&te(p.payload)){let k=p.payload.writerAgent;typeof k=="string"&&we(k)&&(lW(k),zS(e.layout,k))}if(p.type==="command.writer.session.start"&&te(p.payload)){let k=p.payload.writerAgent,A=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof k=="string"&&we(k)&&A.length>0&&(console.log(`[agent-witch] Starting ${k} session\u2026`),Tue(e,k,A,b,S))}if(p.type==="command.claude.stop"&&te(p.payload)){let k=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";k.length>0&&(console.log(`[agent-witch] Stopping run ${k}\u2026`),RW(e,QW(S),k,b))}if(p.type==="command.claude.input_respond"&&te(p.payload)){let k=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",A=typeof p.payload.response=="string"?p.payload.response.trim():"",_=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",E=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",T=typeof p.payload.question=="string"?p.payload.question:"";k.length>0&&A.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),TW(e,{agentRunId:k,originalPrompt:_,partialOutput:E,question:T,response:A,shellSessionId:SY.get(k)},b,QW(S)))}if(p.type==="dispatch.approval.required"&&te(p.payload)){let k=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",A=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${k}: ${A}`),process.platform==="darwin"&&(0,e0.spawn)("osascript",["-e",`display notification "${A.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${k.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&te(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),vue(e,p.payload,b,S)),p.type==="harness.export.request"&&te(p.payload)){let k=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",A=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,_=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(E=>typeof E=="string"):[];k.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:E}=await Promise.resolve().then(()=>(yY(),fY)),T=E(_,e.email);J(S,{type:"harness.export.result",payload:{success:T.length>0,borrowerUserId:k,...A!==void 0?{targetDeviceId:A}:{},sets:T,errorMessage:T.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(p.type==="harness.manifest.request"&&$p(S,e.layout),p.type==="command.claude.result"&&te(p.payload)){let k=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,A=typeof p.payload.output=="string"?p.payload.output:"",_=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,E=wc(k!==void 0?PY.get(k):void 0,Hp),T=k!==void 0?qW.get(k):void 0,C=k!==void 0?AY.get(k)??"":"",x=Rw({exitCode:_,output:A});if(x&&E!==null&&HE({layout:e.layout,text:A,source:k??"command.claude.result",projectFolderPath:E,...T!==void 0?{projectId:T}:{}}),_!=null&&_!==0&&A.trim().length>0&&E!==null&&(OE({layout:e.layout,errorText:A,projectFolderPath:E,...T!==void 0?{projectId:T}:{}}),zE({layout:e.layout,text:A,source:k??"command.claude.result.failure",projectFolderPath:E,...T!==void 0?{projectId:T}:{}})),x&&C.trim().length>0&&E!==null&&LC({layout:e.layout,projectFolderPath:E,...T!==void 0?{projectId:T}:{},entry:{id:`${Date.now()}-${k??"run"}`,...k!==void 0?{agentRunId:k}:{},prompt:C,output:A,createdAt:new Date().toISOString()}}),k!==void 0&&E!==null){let j=YW.get(k),M=XW.get(k);j!==void 0&&M!==void 0&&ey(E).then(B=>{let ie=xw({before:M,after:B});Db(j,ie),XW.delete(k),YW.delete(k)})}if(x&&T!==void 0&&T.trim().length>0){let j=$(),M=j===null?null:V({wsUrl:j.wsUrl,pairingToken:j.pairingToken});M!==null&&Ww(M,T,{...k!==void 0?{sourceRunId:k}:{},lesson:Iw({prompt:C,output:A})})}k!==void 0&&(Ec(e.layout,k),ZW.delete(k),qW.delete(k))}},P=()=>{if(t.stopped)return;c(),d();let p=new Ap(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),_W(V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),wW(e.layout);let S=$e(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),k=cI({layout:e.layout,origin:S,...b!==void 0&&b.length>0?{claimToken:b}:{}});J(p,{type:"agent.register",payload:{role:"agent",hostname:ul.default.hostname(),macOsUsername:ul.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...k}},e.layout),$p(p,e.layout),EW(e,p),f(p)}),p.on("message",S=>{let b=typeof S=="string"?S:S.toString("utf8");try{let k=JSON.parse(b);if(!te(k))return;y(k,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(S,b)=>{i(),t.socket=void 0,t.wsConnected=!1,k_(e.layout),t.reconnectAttempt+=1;let k=typeof b=="string"?b:b.toString("utf8");ms(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:k}),console.log("[agent-witch] Disconnected from server."),g()}),p.on("error",S=>{t.wakeError=S.message,ms(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},h=()=>{t.stopped=!0,i(),a(),c(),d()};return g_(()=>{let p=f_();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&n(p.remoteBundleVersion,p.trigger);let S=y_();S!==null&&r(S)}),{connect:P,startLocalHealthCheck:u,stop:h,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:fc(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:pp(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,P()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to Agent Witch \u2014 manifest saved locally only."}:($p(p,e.layout),{ok:!0})}}},xue=async()=>{bt("agent-witch");let e=FI(),t=v();BI().ok||(process.platform==="darwin"?(await Mn(t),process.stdout.write(`[agent-witch] Another Agent Witch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another Agent Witch process may already be running \u2014 exiting.
`),process.exit(0)),qI(t);let o=KI({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){Br({launchAgentLabel:ye(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let P=Fl({launchAgentPrefix:ye(t),wakePort:Il(t)});P.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(P.length)} LaunchAgent plist(s).`)}catch(P){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${P instanceof Error?P.message:String(P)}`)}jl()}let n=await lk(),s=n[0];s!==void 0&&MW(s.layout);for(let y of n){let P=$e(y.wsUrl)??Pt;oc(y.layout.installDir,P)}let i=n.map(y=>Lue(y)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),bp(),process.exit(0));let c=()=>{n.forEach((y,P)=>{let h=i[P];if(h===void 0)return;let p=Ce(y.layout);w_(p,{socketOpen:h.hasMacSocketOpen(),staleAfterMs:12e4})&&h.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let y=n[0]?.layout;y!==void 0&&(Kt(y)||md(y.installDir))},g=await JI({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):up({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let y of i)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let f=Gr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Nl(),d()});d=()=>{f(),g.stop(),bp(),console.log("[agent-witch] Shutting down.");for(let y of i)y.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},zp=xue});var t0=l(()=>{"use strict";bY()});var _Y={};St(_Y,{startAgentWitchClient:()=>zp});var kY=l(()=>{"use strict";t0();t0();Nn();Hb();fg();if(!_t()&&Dn(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(gg(process.argv.slice(e))),zp()}});Mb();Hb();Nn();fg();var qM="20.x",JM="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var EQ=e=>[`Node.js ${qM} or newer is required (found ${e}).`,JM].join(" "),YM=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${EQ(process.version)}
`),process.exit(1))};kg();var Iue=async()=>{bt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(b_(),A_)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},Wue=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(nz(),oz)),t=await e();if(t.ok){process.stdout.write(`Agent Witch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake Agent Witch. ${r}
`),process.exit(1)},Oue=async e=>{try{if(e===Pg){let{resolveAgentWitchLocalLayout:t}=await Promise.resolve().then(()=>(G(),bb)),{runCheckContextHookCli:r}=await Promise.resolve().then(()=>(id(),e$));await r({layout:t()})}else process.stderr.write(`[agent-witch] ${Ai}: unknown hook ${e??"(none)"}
`)}catch(t){let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] ${Ai}: ${r}
`)}await new Promise(t=>{process.stdout.write("",()=>t())}),process.exit(0)},Mue=async()=>{if(!Dn(_t()?void 0:__agentWitchImportMetaUrl))return;process.argv[2]===Ai&&await Oue(process.argv[3]),YM();let e=process.argv.indexOf("report");e>=0&&process.exit(gg(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Iue();return}if(t==="wake"){await Wue();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(sU(),nU));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(X4(),Y4));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(G(),bb)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(AC(),yq));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(kY(),_Y));await r()};Mue();
