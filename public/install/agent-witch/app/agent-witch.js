#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var vY=Object.create;var PA=Object.defineProperty;var CY=Object.getOwnPropertyDescriptor;var LY=Object.getOwnPropertyNames;var xY=Object.getPrototypeOf,IY=Object.prototype.hasOwnProperty;var l=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(o){throw r=[o],o}};var R=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}},St=(e,t)=>{for(var r in t)PA(e,r,{get:t[r],enumerable:!0})},WY=(e,t,r,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of LY(t))!IY.call(e,n)&&n!==r&&PA(e,n,{get:()=>t[n],enumerable:!(o=CY(t,n))||o.enumerable});return e};var m=(e,t,r)=>(r=e!=null?vY(xY(e)):{},WY(t||!e||!e.__esModule?PA(r,"default",{value:e,enumerable:!0}):r,e));var ml,s0,i0,gl,AA,Gue,a0,_n,ur,$r,Bp,Gp,ri,oi,st,bA,Vp,Kp,qp,fl,zt,kn,wn,yl,Co,_A,l0,He=l(()=>{"use strict";ml={production:".agent-witch",localhost:".local-agent-witch"},s0={production:47892,localhost:47893},i0={production:"com.agent-witch",localhost:"com.local-agent-witch"},gl={activeProfile:"active-profile.json",installVersion:"install-version.json",wakePort:"wake-port.json",linkCode:"link-code.txt",watchdogReinstallState:"watchdog-reinstall-state.json"},AA="app",Gue=`${AA}/agent-witch.js`,a0=`${AA}/command`,_n={configJson:"config.json",deviceKeypairJson:"device-keypair.json",connectionHealthJson:"connection-health.json",writerApiSecretsJson:"writer-api-secrets.json",automationsJson:"automations.json",pendingRunInputsJson:"pending-run-inputs.json",runCompletionOutboxJson:"run-completion-outbox.json",logsDir:"logs",reportsDir:"reports",runsDir:"runs",projectsDir:"projects",projectDataDir:"project-data",harnessDir:"harness"},ur=ml.production,$r=ml.localhost,Bp=s0.production,Gp=s0.localhost,ri=i0.production,oi=i0.localhost,st="profiles",bA=gl.activeProfile,Vp="harness",Kp="sets",qp="manifest.json",fl=_n.projectsDir,zt=_n.logsDir,kn="agent-witch.log",wn="agent-witch.error.log",yl=_n.reportsDir,Co=_n.deviceKeypairJson,_A=AA,l0="agent-witch.js"});var c0=l(()=>{"use strict";He()});var d0,Lo,Tn,hl=l(()=>{"use strict";d0=m(require("node:path"));He();Lo=e=>d0.default.basename(e)===$r,Tn=e=>Lo(e)?oi:ri});var pr,ni=l(()=>{"use strict";pr="agent-witch.service"});var Pt,Jp,u0=l(()=>{"use strict";Pt="https://www.agentwitch.com",Jp="wss://www.agentwitch.com/api/agent-witch/ws"});var Sl,zr,p0=l(()=>{"use strict";Sl="127.0.0.1",zr=`http://${Sl}:43347`});var At=l(()=>{"use strict";u0();p0()});var OY,En,Yp,m0,MY,jY,NY,DY,HY,Pl,wA=l(()=>{"use strict";ni();At();OY={darwin:"mac",mac:"mac",macos:"mac",linux:"linux",wsl:"linux",win32:"windows",windows:"windows"},En=e=>OY[(e??"").trim().toLowerCase()]??"unknown",Yp=e=>`nohup "$HOME/${e}/app/command/run.sh" >/dev/null 2>&1 &`,m0=()=>`curl -sS -m 5 "http://127.0.0.1:${43347}/health" || echo "AWL still not responding \u2014 see logs:"`,MY=e=>({platform:"mac",label:"macOS",instructions:"On this computer, open Terminal, paste this command, and press Return.",command:`AW_HOME="$HOME/${e.installDirName}"
launchctl kickstart -k "gui/$(id -u)/${e.launchAgentPrefix}"
sleep 2
${m0()}
tail -20 "$AW_HOME/agent-witch.error.log" 2>/dev/null || true`,note:"Paste and run the whole block so AW_HOME is set before tail. Ignore com.agent-witch-live unless you installed Live as a separate LaunchAgent."}),jY=e=>({platform:"linux",label:"Linux or WSL",instructions:"On this computer, open a terminal (on Windows, your WSL distro's terminal), paste this command, and press Enter.",command:`systemctl --user restart ${pr}
sleep 2
${m0()}
journalctl --user -u ${pr} -n 50 --no-pager`,note:`If systemctl is not available, the installer did not set up auto-start on this computer. Start the client by hand: ${Yp(e.installDirName)}`}),NY=()=>({platform:"windows",label:"Windows (WSL)",instructions:"On this computer, open PowerShell, paste these commands, and press Enter.",command:`wsl.exe -e bash -lc 'systemctl --user restart ${pr}'
wsl.exe -e bash -lc 'systemctl --user status ${pr}'`,note:"AgentWitch runs inside WSL on Windows. These commands use your default WSL distro; if you installed into another distro, add -d <distro name> after wsl.exe."}),DY={mac:MY,linux:jY,windows:NY},HY=["mac","linux","windows"],Pl=e=>(e.platform==="unknown"?HY:[e.platform]).map(r=>DY[r](e))});var g0,f0,FY,$Y,zY,TA,y0=l(()=>{"use strict";g0=m(require("node:path"));wA();hl();f0=e=>e instanceof Error?e.message:String(e),FY=e=>typeof e=="object"&&e!==null&&"code"in e&&e.code==="ENOENT",$Y=async(e,t)=>{try{let r=await e.kickstartLaunchAgents();return r.length>0?{ok:!0,platform:"mac",outcome:"restarted",message:`Kickstarted ${r.join(", ")}.`,manualCommand:null}:{ok:!1,platform:"mac",outcome:"failed",message:"No AgentWitch LaunchAgent was kickstarted on this computer.",manualCommand:t}}catch(r){return{ok:!1,platform:"mac",outcome:"failed",message:`LaunchAgent kickstart failed: ${f0(r)}`,manualCommand:t}}},zY=async(e,t)=>{try{return await e.restartSystemdUserService(),{ok:!0,platform:"linux",outcome:"restarted",message:"Restarted the agent-witch.service systemd user unit.",manualCommand:null}}catch(r){return FY(r)?{ok:!1,platform:"linux",outcome:"manual-step-required",message:"systemctl is not available on this computer, so the installer set up no auto-start. Start the client by hand.",manualCommand:t}:{ok:!1,platform:"linux",outcome:"failed",message:`systemd user restart failed: ${f0(r)}`,manualCommand:t}}},TA=async e=>{let t=En(e.platform),r=g0.default.basename(e.installDir),o=n=>Pl({platform:n,installDirName:r,launchAgentPrefix:Tn(e.installDir)})[0]?.command??null;return t==="mac"?$Y(e.runners,o("mac")):t==="linux"?zY(e.runners,Yp(r)):t==="windows"?{ok:!1,platform:t,outcome:"unsupported-platform",message:"AgentWitch runs inside WSL on Windows. Restart it from PowerShell with the command below.",manualCommand:o("windows")}:{ok:!1,platform:t,outcome:"unsupported-platform",message:`Restarting the AgentWitch client is not supported on ${e.platform||"this platform"}.`,manualCommand:null}}});var Al=l(()=>{"use strict";c0();hl();wA();y0()});var h0,EA,UY,bl,BY,GY,S0,VY,KY,P0=l(()=>{"use strict";Al();He();h0=m(require("node:os")),EA=m(require("node:path")),UY=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();return e!==void 0&&e.length>0?EA.default.resolve(e):EA.default.join(h0.default.homedir(),ur)},bl=Tn(UY()),BY=`${bl}-wake`,GY=`${bl}-live`,S0=`${bl}-watchdog`,VY=`${bl}-automation-scheduler`,KY=`${bl}-updater`});var si=R(RA=>{"use strict";Object.defineProperty(RA,"__esModule",{value:!0});RA.stringify=qY;function qY(e){return e===void 0?"undefined":e instanceof Date?isNaN(e.getTime())?"Invalid Date":e.toISOString():typeof e=="function"?"function":e instanceof Error?"Error":typeof e=="number"&&isNaN(e)?"NaN":e===1/0?"Infinity":e===-1/0?"-Infinity":JSON.stringify(e,null,2)}});var H=R(vA=>{"use strict";Object.defineProperty(vA,"__esModule",{value:!0});vA.generateTypeGuardError=JY;var A0=si();function JY(e,t,r){return(0,A0.stringify)(e).length>200?`Expected ${t} to be "${r}"`:`Expected ${t} (${(0,A0.stringify)(e)}) to be "${r}"`}});var xo=R(Xp=>{"use strict";Object.defineProperty(Xp,"__esModule",{value:!0});Xp.isNonNullObject=void 0;var YY=H(),XY=function(e,t){let r=typeof e=="object"&&e!==null&&!Array.isArray(e);return!r&&t&&t.callbackOnError((0,YY.generateTypeGuardError)(e,t.identifier,"non-null object")),r};Xp.isNonNullObject=XY});var mr=R(Ie=>{"use strict";Object.defineProperty(Ie,"__esModule",{value:!0});Ie.attachTypeGuardMeta=Ie.isArrayTypeGuard=Ie.isNestedObjectTypeGuard=Ie.getTypeGuardWrapperKind=Ie.getTypeGuardInnerGuard=Ie.getTypeGuardItemGuard=Ie.getTypeGuardSchema=void 0;var ZY=e=>e.schema;Ie.getTypeGuardSchema=ZY;var QY=e=>e.itemGuard;Ie.getTypeGuardItemGuard=QY;var e7=e=>e.innerGuard;Ie.getTypeGuardInnerGuard=e7;var t7=e=>e.wrapperKind;Ie.getTypeGuardWrapperKind=t7;var r7=e=>{if((0,Ie.getTypeGuardSchema)(e))return!0;let t=e.name;return t==="isTypeGuard"||t==="isSchemaGuard"};Ie.isNestedObjectTypeGuard=r7;var o7=e=>{if((0,Ie.getTypeGuardItemGuard)(e))return!0;let t=e.name;return t==="isArray"||t==="isArrayGuard"};Ie.isArrayTypeGuard=o7;var n7=(e,t)=>Object.assign(e,t);Ie.attachTypeGuardMeta=n7});var _l=R(Rn=>{"use strict";Object.defineProperty(Rn,"__esModule",{value:!0});Rn.getExpectedTypeName=Rn.getTypeGuardDisplayName=void 0;var b0=mr(),s7=e=>{let t=e.name;return t?t.endsWith("Guard")?t.slice(0,-5):t:"isType"};Rn.getTypeGuardDisplayName=s7;var i7=e=>{let t=(0,b0.getTypeGuardWrapperKind)(e),r=(0,b0.getTypeGuardInnerGuard)(e);if(t&&r){let n=(0,Rn.getExpectedTypeName)(r);if(t==="undefinedOr")return`${n} | undefined`;if(t==="nullOr")return`${n} | null`;if(t==="nilOr")return`${n} | null | undefined`}let o=e.name;if(o.startsWith("is")){let n=o.slice(2);return n.endsWith("Guard")&&(n=n.slice(0,-5)),n==="Type"||n==="Schema"?"object":n==="Array"?"Array":n.toLowerCase()}return"unknown"};Rn.getExpectedTypeName=i7});var vn=R(Zp=>{"use strict";Object.defineProperty(Zp,"__esModule",{value:!0});Zp.createValidationResult=void 0;var a7=(e,t=[],r)=>({valid:e,errors:Array.isArray(t)?[...t]:[],...r&&{tree:{...r}}});Zp.createValidationResult=a7});var ii=R(Qp=>{"use strict";Object.defineProperty(Qp,"__esModule",{value:!0});Qp.createValidationError=void 0;var l7=(e,t,r,o)=>({path:e,expectedType:t,actualValue:r,message:o});Qp.createValidationError=l7});var ai=R(em=>{"use strict";Object.defineProperty(em,"__esModule",{value:!0});em.createTreeNode=void 0;var c7=(e,t,r,o)=>({valid:t,path:e,...r&&{expectedType:r},...o!==void 0&&{actualValue:o},children:{},errors:[]});em.createTreeNode=c7});var kl=R(tm=>{"use strict";Object.defineProperty(tm,"__esModule",{value:!0});tm.combineResults=void 0;var d7=vn(),u7=(e,t)=>{let r=e.every(s=>s.valid),o=e.flatMap(s=>s.errors),n={valid:r,path:t||"root",children:{},errors:o};return e.forEach(s=>{if(s.tree){let i=s.tree.path.split(".").pop()||"unknown";n.children[i]=s.tree}}),(0,d7.createValidationResult)(r,o,n)};tm.combineResults=u7});var om=R(rm=>{"use strict";Object.defineProperty(rm,"__esModule",{value:!0});rm.createSimplifiedTree=void 0;var _0=e=>{if(e.children&&Object.keys(e.children).length>0){let t={};return Object.entries(e.children).forEach(([r,o])=>{t[r]=_0(o)}),{valid:e.valid,value:t,...e.expectedType&&{expectedType:e.expectedType}}}return{valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}}},p7=e=>{let t=e.path.split(".").pop()||"root",r={};if(e.children&&Object.keys(e.children).length){let o={};Object.entries(e.children).forEach(([n,s])=>{o[n]=_0(s)}),r[t]={valid:e.valid,value:o}}else r[t]={valid:e.valid,value:e.actualValue,...e.expectedType&&{expectedType:e.expectedType}};return r};rm.createSimplifiedTree=p7});var Tl=R(sm=>{"use strict";Object.defineProperty(sm,"__esModule",{value:!0});sm.validateObject=void 0;var m7=xo(),wl=vn(),g7=ii(),nm=ai(),f7=kl(),k0=im(),y7=(e,t,r)=>{let o=()=>{let i=(0,g7.createValidationError)(r.path,"non-null object",e,`Expected ${r.path} (${JSON.stringify(e)}) to be "non-null object"`),a=(0,nm.createTreeNode)(r.path,!1,"non-null object",e);return a.errors=[i],(r.config?.errorMode||"multi")==="json"?(0,wl.createValidationResult)(!1,[],a):(0,wl.createValidationResult)(!1,[i],a)},n=()=>{let i=Object.keys(t);if(i.length===0)return(0,wl.createValidationResult)(!0,[],(0,nm.createTreeNode)(r.path,!0,"object",e));let a=c=>{let[d,...u]=c,g=d,f=t[g],y=e[g],P=(0,k0.validateProperty)(g,y,f,r);return P.valid?u.length===0?(0,wl.createValidationResult)(!0,[],(0,nm.createTreeNode)(r.path,!0,"object",e)):a(u):P};return a(i)},s=()=>{let i=Object.keys(t).map(d=>{let u=t[d];return(0,k0.validateProperty)(d,e[d],u,r)}),a=(0,f7.combineResults)(i,r.path),c=(0,nm.createTreeNode)(r.path,a.valid,"object",e);return c.children={},i.forEach(d=>{if(d.tree){let u=d.tree.path.split(".").pop()||"unknown";c.children[u]=d.tree}}),(0,wl.createValidationResult)(a.valid,a.errors,c)};return(0,m7.isNonNullObject)(e,null)?(r.config?.errorMode||"multi")==="single"?n():s():o()};sm.validateObject=y7});var T0=R(cm=>{"use strict";Object.defineProperty(cm,"__esModule",{value:!0});cm.validateArray=void 0;var h7=si(),am=vn(),w0=ii(),lm=ai(),S7=kl(),P7=Tl(),A7=_l(),b7=mr(),_7=(e,t,r)=>{let o=r.path;if(!Array.isArray(e)){let c=(0,w0.createValidationError)(o,"Array",e,`Expected ${o} (${JSON.stringify(e)}) to be "Array"`),d=(0,lm.createTreeNode)(o,!1,"Array",e);return d.errors=[c],(0,am.createValidationResult)(!1,[c],d)}let n=(0,b7.getTypeGuardSchema)(t),s=e.map((c,d)=>{let u=`${o}[${d}]`,g={path:u,config:r.config||null};if(n)return(0,P7.validateObject)(c,n,g);let f=t(c,null),y=(0,A7.getExpectedTypeName)(t),P=(0,h7.stringify)(c);if(f)return(0,am.createValidationResult)(!0,[],(0,lm.createTreeNode)(u,!0,y,c));let h=P.length>200?`Expected ${u} to be "${y}"`:`Expected ${u} (${P}) to be "${y}"`,p=(0,w0.createValidationError)(u,y,c,h),S=(0,lm.createTreeNode)(u,!1,y,c);return S.errors=[p],(0,am.createValidationResult)(!1,[p],S)}),i=(0,S7.combineResults)(s,o),a=(0,lm.createTreeNode)(o,i.valid,"Array",e);return a.children={},s.forEach(c=>{if(c.tree){let d=c.tree.path.match(/\[(\d+)\]$/)?.[1]??"unknown";a.children[d]=c.tree}}),(0,am.createValidationResult)(i.valid,i.errors,a)};cm.validateArray=_7});var im=R(um=>{"use strict";Object.defineProperty(um,"__esModule",{value:!0});um.validateProperty=void 0;var E0=vn(),k7=ii(),R0=ai(),w7=_l(),dm=mr(),T7=Tl(),E7=T0(),R7=(e,t,r,o)=>{let n=`${o.path}.${e}`,s={path:n,config:o.config||null,...o.parentTree&&{parentTree:o.parentTree}},i=o.config?.errorMode||"multi",a=(0,dm.getTypeGuardSchema)(r),c=(0,dm.getTypeGuardItemGuard)(r);if(i==="multi"||i==="json"){if(a)return(0,T7.validateObject)(t,a,s);if(c&&(0,dm.isArrayTypeGuard)(r))return(0,E7.validateArray)(t,c,s)}let d=u=>{let g=r(t,u),f=(0,w7.getExpectedTypeName)(r);return g?(0,E0.createValidationResult)(!0,[],(0,R0.createTreeNode)(n,!0,f,t)):(()=>{let y=(0,k7.createValidationError)(n,f,t,`Expected ${n} (${JSON.stringify(t)}) to be "${f}"`),P=(0,R0.createTreeNode)(n,!1,f,t);return P.errors=[y],(0,E0.createValidationResult)(!1,[y],P)})()};if((0,dm.isNestedObjectTypeGuard)(r)){let u=o.config?{...o.config,identifier:n}:null;return d(u)}return d(null)};um.validateProperty=R7});var mm=R(pm=>{"use strict";Object.defineProperty(pm,"__esModule",{value:!0});pm.isNil=void 0;var v7=H(),C7=function(e,t){return e!=null?(t&&t.callbackOnError((0,v7.generateTypeGuardError)(e,t.identifier,"null | undefined")),!1):!0};pm.isNil=C7});var CA=R(gm=>{"use strict";Object.defineProperty(gm,"__esModule",{value:!0});gm.isDefined=void 0;var L7=H(),x7=mm(),I7=function(e,t){return(0,x7.isNil)(e,null)?(t&&t.callbackOnError((0,L7.generateTypeGuardError)(e,t.identifier,"isDefined")),!1):!0};gm.isDefined=I7});var LA=R(fm=>{"use strict";Object.defineProperty(fm,"__esModule",{value:!0});fm.reportValidationResults=void 0;var W7=om(),v0=CA(),O7=mm(),M7=(e,t)=>{if(e.valid===!0||(0,O7.isNil)(t))return;let r=t.errorMode||"multi",o=(i,a)=>{(0,v0.isDefined)(a)&&i.callbackOnError(JSON.stringify((0,W7.createSimplifiedTree)(a),null,2))},n=i=>{if(e.errors&&Array.isArray(e.errors)){let c=e.errors.map(d=>d.message).join("; ");i.callbackOnError(c)}},s=i=>{if(e.errors&&Array.isArray(e.errors)&&e.errors.length>0){let a=e.errors[0];a&&i.callbackOnError(a.message)}};r==="json"&&(0,v0.isDefined)(e.tree)?o(t,e.tree):r==="multi"?n(t):s(t)};fm.reportValidationResults=M7});var xA=R(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.Validation=de.reportValidationResults=de.validateObject=de.validateProperty=de.createSimplifiedTree=de.combineResults=de.createTreeNode=de.createValidationError=de.createValidationResult=de.getExpectedTypeName=void 0;var j7=_l();Object.defineProperty(de,"getExpectedTypeName",{enumerable:!0,get:function(){return j7.getExpectedTypeName}});var N7=vn();Object.defineProperty(de,"createValidationResult",{enumerable:!0,get:function(){return N7.createValidationResult}});var D7=ii();Object.defineProperty(de,"createValidationError",{enumerable:!0,get:function(){return D7.createValidationError}});var H7=ai();Object.defineProperty(de,"createTreeNode",{enumerable:!0,get:function(){return H7.createTreeNode}});var F7=kl();Object.defineProperty(de,"combineResults",{enumerable:!0,get:function(){return F7.combineResults}});var $7=om();Object.defineProperty(de,"createSimplifiedTree",{enumerable:!0,get:function(){return $7.createSimplifiedTree}});var z7=im();Object.defineProperty(de,"validateProperty",{enumerable:!0,get:function(){return z7.validateProperty}});var U7=Tl();Object.defineProperty(de,"validateObject",{enumerable:!0,get:function(){return U7.validateObject}});var B7=LA();Object.defineProperty(de,"reportValidationResults",{enumerable:!0,get:function(){return B7.reportValidationResults}});var G7=vn(),V7=kl(),K7=ii(),q7=ai(),J7=im(),Y7=Tl(),X7=LA(),Z7=om();de.Validation={result:G7.createValidationResult,combine:V7.combineResults,error:K7.createValidationError,treeNode:q7.createTreeNode,property:J7.validateProperty,object:Y7.validateObject,report:X7.reportValidationResults,createSimplifiedTree:Z7.createSimplifiedTree}});var ym=R(IA=>{"use strict";Object.defineProperty(IA,"__esModule",{value:!0});IA.isType=eX;var C0=xo(),L0=xA(),Q7=mr();function eX(e){if(!(0,C0.isNonNullObject)(e,null))throw new TypeError("propsTypesToCheck must be a non-null object");function t(r,o){let n=o?.errorMode||"multi";if(n==="multi"||n==="json"){let s={path:o?.identifier||"root",config:o||null},i=(0,L0.validateObject)(r,e,s);return(0,L0.reportValidationResults)(i,o||null),i.valid}return(0,C0.isNonNullObject)(r,o)?Object.keys(e).every(function(s){let i=e[s];return i(r[s],o?{...o,identifier:`${o.identifier}.${s}`}:null)}):!1}return(0,Q7.attachTypeGuardMeta)(t,{schema:e})}});var O0=R(Cn=>{"use strict";Object.defineProperty(Cn,"__esModule",{value:!0});Cn.isNestedType=Cn.isShape=void 0;Cn.isSchema=El;var x0=xo(),I0=xA(),W0=mr();function El(e){if(!(0,x0.isNonNullObject)(e,null))throw new TypeError("schema must be a non-null object");let t=rX(e);function r(o,n){let s=n?.errorMode||"multi";if(s==="multi"||s==="json"){let i={path:n?.identifier||"root",config:n||null},a=(0,I0.validateObject)(o,t,i);return(0,I0.reportValidationResults)(a,n||null),a.valid}return(0,x0.isNonNullObject)(o,n)?Object.keys(t).every(function(i){let a=t[i];return a?a(o[i],n?{...n,identifier:`${n.identifier}.${i}`}:null):!1}):!1}return(0,W0.attachTypeGuardMeta)(r,{schema:t})}function tX(e){return typeof e=="function"?e:Array.isArray(e)?oX(e):typeof e=="object"&&e!==null?El(e):e}function rX(e){let t={};for(let[r,o]of Object.entries(e))t[r]=tX(o);return t}function oX(e){let t=e[0],r=El(t);function o(n,s){return Array.isArray(n)?n.every((i,a)=>r(i,s?{...s,identifier:`${s.identifier}[${a}]`}:null)):(s&&s.callbackOnError(`Expected ${s.identifier} to be an array`),!1)}return(0,W0.attachTypeGuardMeta)(o,{itemGuard:r})}Cn.isShape=El;Cn.isNestedType=El});var M0=R(WA=>{"use strict";Object.defineProperty(WA,"__esModule",{value:!0});WA.isObjectWith=sX;var nX=ym();function sX(e){return(0,nX.isType)(e)}});var j0=R(OA=>{"use strict";Object.defineProperty(OA,"__esModule",{value:!0});OA.isObject=aX;var iX=ym();function aX(e){return(0,iX.isType)(e)}});var N0=R(MA=>{"use strict";Object.defineProperty(MA,"__esModule",{value:!0});MA.guardWithTolerance=lX;function lX(e,t,r){return t(e,r),e}});var D0=R(jA=>{"use strict";Object.defineProperty(jA,"__esModule",{value:!0});jA.isBranded=dX;var cX=H();function dX(e){return function(t,r){return e(t)?!0:(r&&r.callbackOnError((0,cX.generateTypeGuardError)(t,r.identifier,"branded type validation")),!1)}}});var H0=R(hm=>{"use strict";Object.defineProperty(hm,"__esModule",{value:!0});hm.BrandSymbols=void 0;hm.BrandSymbols={UserId:Symbol("UserId"),Email:Symbol("Email"),Password:Symbol("Password"),Age:Symbol("Age"),PhoneNumber:Symbol("PhoneNumber"),URL:Symbol("URL"),UUID:Symbol("UUID"),Timestamp:Symbol("Timestamp"),PositiveNumber:Symbol("PositiveNumber"),NonEmptyString:Symbol("NonEmptyString"),ApiResponse:Symbol("ApiResponse"),DatabaseId:Symbol("DatabaseId"),SessionToken:Symbol("SessionToken"),FilePath:Symbol("FilePath"),Currency:Symbol("Currency")}});var F0=R(Sm=>{"use strict";Object.defineProperty(Sm,"__esModule",{value:!0});Sm.isAny=void 0;var uX=function(e){return!0};Sm.isAny=uX});var Rl=R(NA=>{"use strict";Object.defineProperty(NA,"__esModule",{value:!0});NA.reportTypeGuardError=mX;var pX=H();function mX(e,t,r){e&&e.callbackOnError((0,pX.generateTypeGuardError)(t,e.identifier,r))}});var $0=R(Pm=>{"use strict";Object.defineProperty(Pm,"__esModule",{value:!0});Pm.isBoolean=void 0;var gX=Rl(),fX=function(t,r){return typeof t!="boolean"?((0,gX.reportTypeGuardError)(r,t,"boolean"),!1):!0};Pm.isBoolean=fX});var z0=R(Am=>{"use strict";Object.defineProperty(Am,"__esModule",{value:!0});Am.isDate=void 0;var yX=H(),hX=function(e,t){return!(e instanceof Date)||isNaN(e.getTime())?(t&&t.callbackOnError((0,yX.generateTypeGuardError)(e,t.identifier,"Date")),!1):!0};Am.isDate=hX});var DA=R(bm=>{"use strict";Object.defineProperty(bm,"__esModule",{value:!0});bm.isNumber=void 0;var SX=Rl(),PX=function(t,r){return typeof t!="number"||isNaN(t)?((0,SX.reportTypeGuardError)(r,t,"number"),!1):!0};bm.isNumber=PX});var U0=R(_m=>{"use strict";Object.defineProperty(_m,"__esModule",{value:!0});_m.isString=void 0;var AX=Rl(),bX=function(t,r){return typeof t!="string"?((0,AX.reportTypeGuardError)(r,t,"string"),!1):!0};_m.isString=bX});var B0=R(km=>{"use strict";Object.defineProperty(km,"__esModule",{value:!0});km.isUnknown=void 0;var _X=function(e){return!0};km.isUnknown=_X});var G0=R(wm=>{"use strict";Object.defineProperty(wm,"__esModule",{value:!0});wm.isFunction=void 0;var kX=H(),wX=function(e,t){return typeof e!="function"?(t&&t.callbackOnError((0,kX.generateTypeGuardError)(e,t.identifier,"Function")),!1):!0};wm.isFunction=wX});var K0=R(Tm=>{"use strict";Object.defineProperty(Tm,"__esModule",{value:!0});Tm.isFile=void 0;var V0=H(),TX=function(e,t){return typeof File>"u"?(t&&t.callbackOnError((0,V0.generateTypeGuardError)(e,t.identifier,"File (not available in this environment)")),!1):e instanceof File?!0:(t&&t.callbackOnError((0,V0.generateTypeGuardError)(e,t.identifier,"File")),!1)};Tm.isFile=TX});var J0=R(Em=>{"use strict";Object.defineProperty(Em,"__esModule",{value:!0});Em.isFileList=void 0;var q0=H(),EX=function(e,t){let r=globalThis.FileList;return typeof r>"u"?(t&&t.callbackOnError((0,q0.generateTypeGuardError)(e,t.identifier,"FileList (not available in this environment)")),!1):e instanceof r?!0:(t&&t.callbackOnError((0,q0.generateTypeGuardError)(e,t.identifier,"FileList")),!1)};Em.isFileList=EX});var X0=R(Rm=>{"use strict";Object.defineProperty(Rm,"__esModule",{value:!0});Rm.isBlob=void 0;var Y0=H(),RX=function(e,t){return typeof Blob>"u"?(t&&t.callbackOnError((0,Y0.generateTypeGuardError)(e,t.identifier,"Blob (not available in this environment)")),!1):e instanceof Blob?!0:(t&&t.callbackOnError((0,Y0.generateTypeGuardError)(e,t.identifier,"Blob")),!1)};Rm.isBlob=RX});var Q0=R(vm=>{"use strict";Object.defineProperty(vm,"__esModule",{value:!0});vm.isFormData=void 0;var Z0=H(),vX=function(e,t){return typeof FormData>"u"?(t&&t.callbackOnError((0,Z0.generateTypeGuardError)(e,t.identifier,"FormData (not available in this environment)")),!1):e instanceof FormData?!0:(t&&t.callbackOnError((0,Z0.generateTypeGuardError)(e,t.identifier,"FormData")),!1)};vm.isFormData=vX});var tO=R(Cm=>{"use strict";Object.defineProperty(Cm,"__esModule",{value:!0});Cm.isURL=void 0;var eO=H(),CX=function(e,t){return typeof URL>"u"?(t&&t.callbackOnError((0,eO.generateTypeGuardError)(e,t.identifier,"URL (not available in this environment)")),!1):e instanceof URL?!0:(t&&t.callbackOnError((0,eO.generateTypeGuardError)(e,t.identifier,"URL")),!1)};Cm.isURL=CX});var oO=R(Lm=>{"use strict";Object.defineProperty(Lm,"__esModule",{value:!0});Lm.isURLSearchParams=void 0;var rO=H(),LX=function(e,t){return typeof URLSearchParams>"u"?(t&&t.callbackOnError((0,rO.generateTypeGuardError)(e,t.identifier,"URLSearchParams (not available in this environment)")),!1):e instanceof URLSearchParams?!0:(t&&t.callbackOnError((0,rO.generateTypeGuardError)(e,t.identifier,"URLSearchParams")),!1)};Lm.isURLSearchParams=LX});var nO=R(xm=>{"use strict";Object.defineProperty(xm,"__esModule",{value:!0});xm.isMap=void 0;var xX=H(),IX=function(e,t){return e instanceof Map?!0:(t&&t.callbackOnError((0,xX.generateTypeGuardError)(e,t.identifier,"Map")),!1)};xm.isMap=IX});var sO=R(Im=>{"use strict";Object.defineProperty(Im,"__esModule",{value:!0});Im.isSet=void 0;var WX=H(),OX=function(e,t){return e instanceof Set?!0:(t&&t.callbackOnError((0,WX.generateTypeGuardError)(e,t.identifier,"Set")),!1)};Im.isSet=OX});var iO=R(HA=>{"use strict";Object.defineProperty(HA,"__esModule",{value:!0});HA.isIndexSignature=jX;var MX=H();function jX(e,t){return function(r,o){if(!(typeof r=="object"&&r!==null&&!Array.isArray(r)&&r.constructor===Object))return o&&o.callbackOnError((0,MX.generateTypeGuardError)(r,o.identifier,"Object")),!1;let s=r,i=Object.getOwnPropertyNames(s),a=Object.getOwnPropertySymbols(s);return[...i,...a].every((d,u)=>{let g=s[d],f=e(d,o?{...o,identifier:`${o.identifier}[key:${u}]`}:null),y=t(g,o?{...o,identifier:`${o.identifier}[value:${u}]`}:null);return f&&y})}}});var aO=R(Wm=>{"use strict";Object.defineProperty(Wm,"__esModule",{value:!0});Wm.isError=void 0;var NX=Rl(),DX=function(t,r){return t instanceof Error?!0:((0,NX.reportTypeGuardError)(r,t,"Error"),!1)};Wm.isError=DX});var $A=R(FA=>{"use strict";Object.defineProperty(FA,"__esModule",{value:!0});FA.isArrayWithEachItem=$X;var HX=H(),FX=mr();function $X(e){let t=function(r,o){return Array.isArray(r)?r.every((n,s)=>e(n,o?{...o,identifier:`${o.identifier}[${s}]`}:null)):(o&&o.callbackOnError((0,HX.generateTypeGuardError)(r,o.identifier,"Array")),!1)};return Object.defineProperty(t,"name",{value:"isArray",writable:!1,configurable:!0}),(0,FX.attachTypeGuardMeta)(t,{itemGuard:e})}});var zA=R(Om=>{"use strict";Object.defineProperty(Om,"__esModule",{value:!0});Om.isNonEmptyArray=void 0;var zX=H(),UX=function(e,t){return!Array.isArray(e)||e.length===0?(t&&t.callbackOnError((0,zX.generateTypeGuardError)(e,t.identifier,"NonEmptyArray")),!1):!0};Om.isNonEmptyArray=UX});var lO=R(UA=>{"use strict";Object.defineProperty(UA,"__esModule",{value:!0});UA.isNonEmptyArrayWithEachItem=VX;var BX=$A(),GX=zA();function VX(e){return function(t,r){return(0,BX.isArrayWithEachItem)(e)(t,r)&&(0,GX.isNonEmptyArray)(t,r)}}});var dO=R(BA=>{"use strict";Object.defineProperty(BA,"__esModule",{value:!0});BA.isTuple=KX;var cO=H();function KX(...e){return function(t,r){return Array.isArray(t)?t.length!==e.length?(r&&r.callbackOnError((0,cO.generateTypeGuardError)(t,r.identifier,`tuple of length ${e.length}, but got length ${t.length}`)),!1):e.every((o,n)=>o(t[n],r?{...r,identifier:`${r.identifier}[${n}]`}:null)):(r&&r.callbackOnError((0,cO.generateTypeGuardError)(t,r.identifier,"array")),!1)}}});var uO=R(GA=>{"use strict";Object.defineProperty(GA,"__esModule",{value:!0});GA.isObjectWithEachItem=JX;var qX=H();function JX(e){return function(t,r){return typeof t=="object"&&t!==null&&!Array.isArray(t)&&t.constructor===Object?Object.values(t).every((s,i)=>e(s,r?{...r,identifier:`${r.identifier}[${i}]`}:null)):(r&&r.callbackOnError((0,qX.generateTypeGuardError)(t,r.identifier,"Object")),!1)}}});var pO=R(VA=>{"use strict";Object.defineProperty(VA,"__esModule",{value:!0});VA.isPartialOf=XX;var YX=xo();function XX(e){return function(t,r){if(!(0,YX.isNonNullObject)(t,r))return!1;for(let o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&Object.prototype.hasOwnProperty.call(t,o)){let n=e[o],s=t[o];if(n&&!n(s,r?{...r,identifier:`${r.identifier}.${o}`}:null))return!1}return!0}}});var mO=R(KA=>{"use strict";Object.defineProperty(KA,"__esModule",{value:!0});KA.isPick=QX;var ZX=xo();function QX(e,...t){return function(r,o){if(!(0,ZX.isNonNullObject)(r,o))return!1;for(let n of t)if(!Object.prototype.hasOwnProperty.call(r,n))return o&&e(r,o),!1;return!0}}});var gO=R(qA=>{"use strict";Object.defineProperty(qA,"__esModule",{value:!0});qA.isOmit=t9;var e9=xo();function t9(e,...t){return function(r,o){if(!(0,e9.isNonNullObject)(r,o))return!1;let n=[],s=o?.identifier||"root",i=o?{...o,callbackOnError:d=>n.push(d)}:{identifier:s,callbackOnError:d=>n.push(d)};e(r,i);let a=new Set(t.map(d=>`${s}.${String(d)}`)),c=n.filter(d=>{let u=d.slice(9),g=u.indexOf(" ("),f=g>=0?u.slice(0,g):u;if(a.has(f))return!1;let y=f.startsWith(s+".")&&f.slice(s.length+1).split(".")[0]||"";return!(y&&!Object.prototype.hasOwnProperty.call(r,y))});if(o&&c.length>0)for(let d of c)o.callbackOnError(d);return c.length===0}}});var fO=R(Mm=>{"use strict";Object.defineProperty(Mm,"__esModule",{value:!0});Mm.isNonEmptyString=void 0;var r9=H(),o9=function(e,t){return typeof e!="string"||e.trim().length===0?(t&&t.callbackOnError((0,r9.generateTypeGuardError)(e,t.identifier,"NonEmptyString")),!1):!0};Mm.isNonEmptyString=o9});var yO=R(jm=>{"use strict";Object.defineProperty(jm,"__esModule",{value:!0});jm.isNonNegativeNumber=void 0;var n9=H(),s9=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)?(t&&t.callbackOnError((0,n9.generateTypeGuardError)(e,t.identifier,"NonNegativeNumber")),!1):!0};jm.isNonNegativeNumber=s9});var hO=R(Nm=>{"use strict";Object.defineProperty(Nm,"__esModule",{value:!0});Nm.isPositiveNumber=void 0;var i9=H(),a9=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)?(t&&t.callbackOnError((0,i9.generateTypeGuardError)(e,t.identifier,"PositiveNumber")),!1):!0};Nm.isPositiveNumber=a9});var SO=R(Dm=>{"use strict";Object.defineProperty(Dm,"__esModule",{value:!0});Dm.isNonPositiveNumber=void 0;var l9=H(),c9=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)?(t&&t.callbackOnError((0,l9.generateTypeGuardError)(e,t.identifier,"NonPositiveNumber")),!1):!0};Dm.isNonPositiveNumber=c9});var PO=R(Hm=>{"use strict";Object.defineProperty(Hm,"__esModule",{value:!0});Hm.isNegativeNumber=void 0;var d9=H(),u9=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)?(t&&t.callbackOnError((0,d9.generateTypeGuardError)(e,t.identifier,"NegativeNumber")),!1):!0};Hm.isNegativeNumber=u9});var AO=R(Fm=>{"use strict";Object.defineProperty(Fm,"__esModule",{value:!0});Fm.isInteger=void 0;var p9=H(),m9=DA(),g9=function(e,t){return!(0,m9.isNumber)(e,null)||!Number.isInteger(e)?(t&&t.callbackOnError((0,p9.generateTypeGuardError)(e,t.identifier,"integer")),!1):!0};Fm.isInteger=g9});var bO=R($m=>{"use strict";Object.defineProperty($m,"__esModule",{value:!0});$m.isPositiveInteger=void 0;var f9=H(),y9=function(e,t){return typeof e!="number"||isNaN(e)||e<=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,f9.generateTypeGuardError)(e,t.identifier,"PositiveInteger")),!1):!0};$m.isPositiveInteger=y9});var _O=R(zm=>{"use strict";Object.defineProperty(zm,"__esModule",{value:!0});zm.isNegativeInteger=void 0;var h9=H(),S9=function(e,t){return typeof e!="number"||isNaN(e)||e>=0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,h9.generateTypeGuardError)(e,t.identifier,"NegativeInteger")),!1):!0};zm.isNegativeInteger=S9});var kO=R(Um=>{"use strict";Object.defineProperty(Um,"__esModule",{value:!0});Um.isNonNegativeInteger=void 0;var P9=H(),A9=function(e,t){return typeof e!="number"||isNaN(e)||e<0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,P9.generateTypeGuardError)(e,t.identifier,"NonNegativeInteger")),!1):!0};Um.isNonNegativeInteger=A9});var wO=R(Bm=>{"use strict";Object.defineProperty(Bm,"__esModule",{value:!0});Bm.isNonPositiveInteger=void 0;var b9=H(),_9=function(e,t){return typeof e!="number"||isNaN(e)||e>0||!isFinite(e)||!Number.isInteger(e)?(t&&t.callbackOnError((0,b9.generateTypeGuardError)(e,t.identifier,"NonPositiveInteger")),!1):!0};Bm.isNonPositiveInteger=_9});var TO=R(Vm=>{"use strict";Object.defineProperty(Vm,"__esModule",{value:!0});Vm.isNumeric=void 0;var Gm=H(),k9=function(e,t){if(typeof e=="number")return isNaN(e)?(t&&t.callbackOnError((0,Gm.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0;if(typeof e=="string"){if(e===""||e===" "||e==="NaN"||e==="+0")return t&&t.callbackOnError((0,Gm.generateTypeGuardError)(e,t.identifier,"number key")),!1;let r=Number(e);return isNaN(r)?(t&&t.callbackOnError((0,Gm.generateTypeGuardError)(e,t.identifier,"number key")),!1):!0}return t&&t.callbackOnError((0,Gm.generateTypeGuardError)(e,t.identifier,"number key")),!1};Vm.isNumeric=k9});var EO=R(Km=>{"use strict";Object.defineProperty(Km,"__esModule",{value:!0});Km.isBooleanLike=void 0;var JA=H(),w9=function(e,t){if(typeof e=="boolean")return!0;if(typeof e=="string"){let r=e.toLowerCase();return r==="true"||r==="false"||r==="1"||r==="0"?!0:(t&&t.callbackOnError((0,JA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)}return typeof e=="number"&&(e===1||e===0)?!0:(t&&t.callbackOnError((0,JA.generateTypeGuardError)(e,t.identifier,"boolean-like")),!1)};Km.isBooleanLike=w9});var RO=R(qm=>{"use strict";Object.defineProperty(qm,"__esModule",{value:!0});qm.isDateLike=void 0;var vl=H(),T9=function(e,t){if(e instanceof Date)return isNaN(e.getTime())?(t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0;if(typeof e=="string"){if(e.trim()==="")return t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1;let r=new Date(e);return isNaN(r.getTime())?(t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1):!0}if(typeof e=="number"){if(e>=0&&e<864e13){let r=new Date(e);if(!isNaN(r.getTime()))return!0}return t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1}return t&&t.callbackOnError((0,vl.generateTypeGuardError)(e,t.identifier,"date-like")),!1};qm.isDateLike=T9});var vO=R(Jm=>{"use strict";Object.defineProperty(Jm,"__esModule",{value:!0});Jm.isBigInt=void 0;var E9=H(),R9=function(e,t){return typeof e!="bigint"?(t&&t.callbackOnError((0,E9.generateTypeGuardError)(e,t.identifier,"bigint")),!1):!0};Jm.isBigInt=R9});var XA=R(YA=>{"use strict";Object.defineProperty(YA,"__esModule",{value:!0});YA.isOneOf=v9;var CO=si();function v9(...e){return function(t,r){let o=e.some(function(n){return t===n});return!o&&r&&r.callbackOnError(`${r.identifier} (${(0,CO.stringify)(t)}) must be one of following values ${e.map(CO.stringify).join(" | ")}`),o}}});var LO=R(ZA=>{"use strict";Object.defineProperty(ZA,"__esModule",{value:!0});ZA.isOneOfTypes=x9;var C9=si(),L9=_l();function x9(...e){return function(t,r){let o=e.map(s=>({typeGuard:s,isValid:s(t,null)})),n=o.some(s=>s.isValid);if(!n&&r){let s=(0,C9.stringify)(t),a=[`Expected ${s.length>200?r.identifier:`${r.identifier} (${s})`} type to match one of "${e.map(c=>(0,L9.getTypeGuardDisplayName)(c)).join(" | ")}"`];o.forEach(({typeGuard:c})=>c(t,{...r,callbackOnError:d=>{let u=`- ${d}`;a.includes(u)||a.push(u)}})),r.callbackOnError(a.join(`
`))}return n}}});var xO=R(QA=>{"use strict";Object.defineProperty(QA,"__esModule",{value:!0});QA.isIntersectionOf=I9;function I9(...e){return function(t,r){for(let o of e)if(!o(t,r))return!1;return!0}}});var IO=R(eb=>{"use strict";Object.defineProperty(eb,"__esModule",{value:!0});eb.isExtensionOf=W9;function W9(e,t){return function(r,o){return e(r,o)?t(r,o):!1}}});var WO=R(tb=>{"use strict";Object.defineProperty(tb,"__esModule",{value:!0});tb.isNullOr=M9;var O9=mr();function M9(e){function t(r,o){return r===null?!0:e(r,o)}return(0,O9.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nullOr"})}});var OO=R(rb=>{"use strict";Object.defineProperty(rb,"__esModule",{value:!0});rb.isUndefinedOr=N9;var j9=mr();function N9(e){function t(r,o){return r===void 0?!0:e(r,o)}return(0,j9.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"undefinedOr"})}});var MO=R(ob=>{"use strict";Object.defineProperty(ob,"__esModule",{value:!0});ob.isNilOr=H9;var D9=mr();function H9(e){function t(r,o){return r==null?!0:e(r,o)}return(0,D9.attachTypeGuardMeta)(t,{innerGuard:e,wrapperKind:"nilOr"})}});var jO=R(nb=>{"use strict";Object.defineProperty(nb,"__esModule",{value:!0});nb.isAsserted=F9;function F9(e){return!0}});var NO=R(sb=>{"use strict";Object.defineProperty(sb,"__esModule",{value:!0});sb.isEnum=z9;var $9=XA();function z9(e){return function(t,r){return(0,$9.isOneOf)(...Object.values(e))(t,r)}}});var DO=R(ib=>{"use strict";Object.defineProperty(ib,"__esModule",{value:!0});ib.isEqualTo=G9;var U9=H(),B9=si();function G9(e){return function(t,r){return t!==e?(r&&r.callbackOnError((0,U9.generateTypeGuardError)(t,r.identifier,`equal to ${(0,B9.stringify)(e)}`)),!1):!0}}});var HO=R(Ym=>{"use strict";Object.defineProperty(Ym,"__esModule",{value:!0});Ym.isRegex=void 0;var V9=H(),K9=function(e,t){return e instanceof RegExp?!0:(t&&t.callbackOnError((0,V9.generateTypeGuardError)(e,t.identifier,"RegExp")),!1)};Ym.isRegex=K9});var $O=R(ab=>{"use strict";Object.defineProperty(ab,"__esModule",{value:!0});ab.isPattern=q9;var FO=H();function q9(e){let t=typeof e=="string"?new RegExp(e):e;return function(r,o){return typeof r!="string"?(o&&o.callbackOnError((0,FO.generateTypeGuardError)(r,o.identifier,"string")),!1):t.test(r)?!0:(o&&o.callbackOnError((0,FO.generateTypeGuardError)(r,o.identifier,`string matching pattern ${t.toString()}`)),!1)}}});var zO=R(lb=>{"use strict";Object.defineProperty(lb,"__esModule",{value:!0});lb.by=J9;function J9(e){return function(t){return e(t,null)}}});var UO=R(cb=>{"use strict";Object.defineProperty(cb,"__esModule",{value:!0});cb.toNumber=Y9;function Y9(e){return typeof e=="number"?e:Number(e)}});var BO=R(db=>{"use strict";Object.defineProperty(db,"__esModule",{value:!0});db.toDate=X9;function X9(e){return e instanceof Date?e:typeof e=="number"?e<1e10?new Date(e*1e3):new Date(e):new Date(e)}});var GO=R(ub=>{"use strict";Object.defineProperty(ub,"__esModule",{value:!0});ub.toBoolean=Z9;function Z9(e){if(typeof e=="boolean")return e;if(typeof e=="string"){let t=e.toLowerCase().trim();return t==="true"||t==="1"}return e===1}});var VO=R(Xm=>{"use strict";Object.defineProperty(Xm,"__esModule",{value:!0});Xm.isSymbol=void 0;var Q9=H(),eZ=function(e,t){return typeof e!="symbol"?(t&&t.callbackOnError((0,Q9.generateTypeGuardError)(e,t.identifier,"symbol")),!1):!0};Xm.isSymbol=eZ});var li=R(w=>{"use strict";Object.defineProperty(w,"__esModule",{value:!0});w.isDateLike=w.isBooleanLike=w.isNumeric=w.isNonPositiveInteger=w.isNonNegativeInteger=w.isNegativeInteger=w.isPositiveInteger=w.isInteger=w.isNegativeNumber=w.isNonPositiveNumber=w.isPositiveNumber=w.isNonNegativeNumber=w.isNonEmptyString=w.isOmit=w.isPick=w.isPartialOf=w.isObjectWithEachItem=w.isNonNullObject=w.isTuple=w.isNonEmptyArrayWithEachItem=w.isNonEmptyArray=w.isArrayWithEachItem=w.isError=w.isIndexSignature=w.isSet=w.isMap=w.isURLSearchParams=w.isURL=w.isFormData=w.isBlob=w.isFileList=w.isFile=w.isFunction=w.isUnknown=w.isString=w.isNumber=w.isNil=w.isDefined=w.isDate=w.isBoolean=w.isAny=w.BrandSymbols=w.isBranded=w.guardWithTolerance=w.isObject=w.isObjectWith=w.isNestedType=w.isShape=w.isSchema=w.isType=void 0;w.isSymbol=w.toBoolean=w.toDate=w.toNumber=w.by=w.generateTypeGuardError=w.isPattern=w.isRegex=w.isEqualTo=w.isEnum=w.isAsserted=w.isNilOr=w.isUndefinedOr=w.isNullOr=w.isExtensionOf=w.isIntersectionOf=w.isOneOfTypes=w.isOneOf=w.isBigInt=void 0;var tZ=ym();Object.defineProperty(w,"isType",{enumerable:!0,get:function(){return tZ.isType}});var pb=O0();Object.defineProperty(w,"isSchema",{enumerable:!0,get:function(){return pb.isSchema}});Object.defineProperty(w,"isShape",{enumerable:!0,get:function(){return pb.isShape}});Object.defineProperty(w,"isNestedType",{enumerable:!0,get:function(){return pb.isNestedType}});var rZ=M0();Object.defineProperty(w,"isObjectWith",{enumerable:!0,get:function(){return rZ.isObjectWith}});var oZ=j0();Object.defineProperty(w,"isObject",{enumerable:!0,get:function(){return oZ.isObject}});var nZ=N0();Object.defineProperty(w,"guardWithTolerance",{enumerable:!0,get:function(){return nZ.guardWithTolerance}});var sZ=D0();Object.defineProperty(w,"isBranded",{enumerable:!0,get:function(){return sZ.isBranded}});var iZ=H0();Object.defineProperty(w,"BrandSymbols",{enumerable:!0,get:function(){return iZ.BrandSymbols}});var aZ=F0();Object.defineProperty(w,"isAny",{enumerable:!0,get:function(){return aZ.isAny}});var lZ=$0();Object.defineProperty(w,"isBoolean",{enumerable:!0,get:function(){return lZ.isBoolean}});var cZ=z0();Object.defineProperty(w,"isDate",{enumerable:!0,get:function(){return cZ.isDate}});var dZ=CA();Object.defineProperty(w,"isDefined",{enumerable:!0,get:function(){return dZ.isDefined}});var uZ=mm();Object.defineProperty(w,"isNil",{enumerable:!0,get:function(){return uZ.isNil}});var pZ=DA();Object.defineProperty(w,"isNumber",{enumerable:!0,get:function(){return pZ.isNumber}});var mZ=U0();Object.defineProperty(w,"isString",{enumerable:!0,get:function(){return mZ.isString}});var gZ=B0();Object.defineProperty(w,"isUnknown",{enumerable:!0,get:function(){return gZ.isUnknown}});var fZ=G0();Object.defineProperty(w,"isFunction",{enumerable:!0,get:function(){return fZ.isFunction}});var yZ=K0();Object.defineProperty(w,"isFile",{enumerable:!0,get:function(){return yZ.isFile}});var hZ=J0();Object.defineProperty(w,"isFileList",{enumerable:!0,get:function(){return hZ.isFileList}});var SZ=X0();Object.defineProperty(w,"isBlob",{enumerable:!0,get:function(){return SZ.isBlob}});var PZ=Q0();Object.defineProperty(w,"isFormData",{enumerable:!0,get:function(){return PZ.isFormData}});var AZ=tO();Object.defineProperty(w,"isURL",{enumerable:!0,get:function(){return AZ.isURL}});var bZ=oO();Object.defineProperty(w,"isURLSearchParams",{enumerable:!0,get:function(){return bZ.isURLSearchParams}});var _Z=nO();Object.defineProperty(w,"isMap",{enumerable:!0,get:function(){return _Z.isMap}});var kZ=sO();Object.defineProperty(w,"isSet",{enumerable:!0,get:function(){return kZ.isSet}});var wZ=iO();Object.defineProperty(w,"isIndexSignature",{enumerable:!0,get:function(){return wZ.isIndexSignature}});var TZ=aO();Object.defineProperty(w,"isError",{enumerable:!0,get:function(){return TZ.isError}});var EZ=$A();Object.defineProperty(w,"isArrayWithEachItem",{enumerable:!0,get:function(){return EZ.isArrayWithEachItem}});var RZ=zA();Object.defineProperty(w,"isNonEmptyArray",{enumerable:!0,get:function(){return RZ.isNonEmptyArray}});var vZ=lO();Object.defineProperty(w,"isNonEmptyArrayWithEachItem",{enumerable:!0,get:function(){return vZ.isNonEmptyArrayWithEachItem}});var CZ=dO();Object.defineProperty(w,"isTuple",{enumerable:!0,get:function(){return CZ.isTuple}});var LZ=xo();Object.defineProperty(w,"isNonNullObject",{enumerable:!0,get:function(){return LZ.isNonNullObject}});var xZ=uO();Object.defineProperty(w,"isObjectWithEachItem",{enumerable:!0,get:function(){return xZ.isObjectWithEachItem}});var IZ=pO();Object.defineProperty(w,"isPartialOf",{enumerable:!0,get:function(){return IZ.isPartialOf}});var WZ=mO();Object.defineProperty(w,"isPick",{enumerable:!0,get:function(){return WZ.isPick}});var OZ=gO();Object.defineProperty(w,"isOmit",{enumerable:!0,get:function(){return OZ.isOmit}});var MZ=fO();Object.defineProperty(w,"isNonEmptyString",{enumerable:!0,get:function(){return MZ.isNonEmptyString}});var jZ=yO();Object.defineProperty(w,"isNonNegativeNumber",{enumerable:!0,get:function(){return jZ.isNonNegativeNumber}});var NZ=hO();Object.defineProperty(w,"isPositiveNumber",{enumerable:!0,get:function(){return NZ.isPositiveNumber}});var DZ=SO();Object.defineProperty(w,"isNonPositiveNumber",{enumerable:!0,get:function(){return DZ.isNonPositiveNumber}});var HZ=PO();Object.defineProperty(w,"isNegativeNumber",{enumerable:!0,get:function(){return HZ.isNegativeNumber}});var FZ=AO();Object.defineProperty(w,"isInteger",{enumerable:!0,get:function(){return FZ.isInteger}});var $Z=bO();Object.defineProperty(w,"isPositiveInteger",{enumerable:!0,get:function(){return $Z.isPositiveInteger}});var zZ=_O();Object.defineProperty(w,"isNegativeInteger",{enumerable:!0,get:function(){return zZ.isNegativeInteger}});var UZ=kO();Object.defineProperty(w,"isNonNegativeInteger",{enumerable:!0,get:function(){return UZ.isNonNegativeInteger}});var BZ=wO();Object.defineProperty(w,"isNonPositiveInteger",{enumerable:!0,get:function(){return BZ.isNonPositiveInteger}});var GZ=TO();Object.defineProperty(w,"isNumeric",{enumerable:!0,get:function(){return GZ.isNumeric}});var VZ=EO();Object.defineProperty(w,"isBooleanLike",{enumerable:!0,get:function(){return VZ.isBooleanLike}});var KZ=RO();Object.defineProperty(w,"isDateLike",{enumerable:!0,get:function(){return KZ.isDateLike}});var qZ=vO();Object.defineProperty(w,"isBigInt",{enumerable:!0,get:function(){return qZ.isBigInt}});var JZ=XA();Object.defineProperty(w,"isOneOf",{enumerable:!0,get:function(){return JZ.isOneOf}});var YZ=LO();Object.defineProperty(w,"isOneOfTypes",{enumerable:!0,get:function(){return YZ.isOneOfTypes}});var XZ=xO();Object.defineProperty(w,"isIntersectionOf",{enumerable:!0,get:function(){return XZ.isIntersectionOf}});var ZZ=IO();Object.defineProperty(w,"isExtensionOf",{enumerable:!0,get:function(){return ZZ.isExtensionOf}});var QZ=WO();Object.defineProperty(w,"isNullOr",{enumerable:!0,get:function(){return QZ.isNullOr}});var eQ=OO();Object.defineProperty(w,"isUndefinedOr",{enumerable:!0,get:function(){return eQ.isUndefinedOr}});var tQ=MO();Object.defineProperty(w,"isNilOr",{enumerable:!0,get:function(){return tQ.isNilOr}});var rQ=jO();Object.defineProperty(w,"isAsserted",{enumerable:!0,get:function(){return rQ.isAsserted}});var oQ=NO();Object.defineProperty(w,"isEnum",{enumerable:!0,get:function(){return oQ.isEnum}});var nQ=DO();Object.defineProperty(w,"isEqualTo",{enumerable:!0,get:function(){return nQ.isEqualTo}});var sQ=HO();Object.defineProperty(w,"isRegex",{enumerable:!0,get:function(){return sQ.isRegex}});var iQ=$O();Object.defineProperty(w,"isPattern",{enumerable:!0,get:function(){return iQ.isPattern}});var aQ=H();Object.defineProperty(w,"generateTypeGuardError",{enumerable:!0,get:function(){return aQ.generateTypeGuardError}});var lQ=zO();Object.defineProperty(w,"by",{enumerable:!0,get:function(){return lQ.by}});var cQ=UO();Object.defineProperty(w,"toNumber",{enumerable:!0,get:function(){return cQ.toNumber}});var dQ=BO();Object.defineProperty(w,"toDate",{enumerable:!0,get:function(){return dQ.toDate}});var uQ=GO();Object.defineProperty(w,"toBoolean",{enumerable:!0,get:function(){return uQ.toBoolean}});var pQ=VO();Object.defineProperty(w,"isSymbol",{enumerable:!0,get:function(){return pQ.isSymbol}})});var ci,KO,mQ,qO,JO=l(()=>{"use strict";ci=m(require("node:path")),KO=require("node:url"),mQ=()=>!0,qO=()=>{if(mQ()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?ci.default.dirname(ci.default.resolve(e)):ci.default.dirname(ci.default.resolve(__filename))}return ci.default.dirname((0,KO.fileURLToPath)(__agentWitchImportMetaUrl))}});var mb,YO,F,XO,gQ,gr,gb,v,Cl,fr,fb,Ll,Ln,yb,hb,Sb,xl,ye,Io,Zm,Je,Qm,N,Pb=l(()=>{"use strict";mb=m(require("node:fs")),YO=m(require("node:os")),F=m(require("node:path")),XO=m(li());He();JO();hl();hl();gQ=qO(),gr=e=>e.trim().toLowerCase(),gb=e=>gr(e).replace(/@/g,"-at-").replace(/\./g,"-").replace(/[^a-z0-9-]+/g,"-").replace(/^-+|-+$/g,""),v=()=>{let e=process.env.AGENT_WITCH_HOME?.trim();if(e!==void 0&&e.length>0)return F.default.resolve(e);let t=F.default.resolve(gQ),r=F.default.basename(t),o=F.default.basename(F.default.dirname(t));return r===_A&&(o===ur||o===$r)?F.default.dirname(t):r===ur||r===$r?t:F.default.join(YO.default.homedir(),ur)},Cl=(e=v())=>F.default.join(e,_A),fr=(e=v())=>F.default.join(Cl(e),l0),fb=(e,t,r)=>t!==null?F.default.join(e,st,t,r):F.default.join(e,r),Ll=e=>fb(e.installDir,e.profileEmail,fl),Ln=e=>fb(e.installDir,e.profileEmail,zt),yb=e=>F.default.join(e.logsDir,kn),hb=e=>F.default.join(e.logsDir,wn),Sb=e=>fb(e.installDir,e.profileEmail,yl),xl=e=>e.profileEmail!==null?F.default.join(e.installDir,st,e.profileEmail,Co):F.default.join(e.installDir,Co),ye=(e=v())=>Tn(e),Io=(e=v())=>Lo(e)?Gp:Bp,Zm=()=>{let e=process.env.AGENT_WITCH_PROFILE?.trim();if(e!==void 0&&e.length>0)return gr(e);let t=process.env.AGENT_WITCH_EMAIL?.trim();return t!==void 0&&t.length>0?gr(t):null},Je=(e=v())=>{let t=F.default.join(e,bA);if(!mb.default.existsSync(t))return null;try{let r=JSON.parse(mb.default.readFileSync(t,"utf8"));if((0,XO.isNonNullObject)(r)&&typeof r.email=="string"&&r.email.trim().length>0)return gr(r.email)}catch{return null}return null},Qm=e=>{if(e!==void 0){if(e===null)return null;let r=e.trim();return r.length>0?gr(r):null}let t=Zm();return t!==null?t:Je()},N=e=>{let t=v(),r=Cl(t),o=fr(t),n=Qm(e);if(n!==null){let y=F.default.join(t,st,n),P=F.default.join(y,Vp),h=F.default.join(y,fl),p=F.default.join(y,_n.projectDataDir),S=F.default.join(y,zt),b=F.default.join(y,yl),k=F.default.join(y,Co),A=F.default.join(y,zt,kn),_=F.default.join(y,zt,wn);return{profileEmail:n,installDir:t,appDir:r,appBundlePath:o,projectsDir:h,projectDataDir:p,logsDir:S,mainLogPath:A,errorLogPath:_,reportsDir:b,deviceKeypairPath:k,configPath:F.default.join(y,"config.json"),harnessRootDir:P,harnessManifestPath:F.default.join(P,qp),harnessSetsDir:F.default.join(P,Kp)}}let s=F.default.join(t,Vp),i=F.default.join(t,fl),a=F.default.join(t,_n.projectDataDir),c=F.default.join(t,zt),d=F.default.join(t,yl),u=F.default.join(t,Co),g=F.default.join(t,zt,kn),f=F.default.join(t,zt,wn);return{profileEmail:null,installDir:t,appDir:r,appBundlePath:o,projectsDir:i,projectDataDir:a,logsDir:c,mainLogPath:g,errorLogPath:f,reportsDir:d,deviceKeypairPath:u,configPath:F.default.join(t,"config.json"),harnessRootDir:s,harnessManifestPath:F.default.join(s,qp),harnessSetsDir:F.default.join(s,Kp)}}});var di,Ab=l(()=>{"use strict";di=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535});var fQ,ui,bb=l(()=>{"use strict";fQ=e=>{let t=e?.trim();if(t===void 0||!/^\d+$/.test(t))return null;let r=Number.parseInt(t,10);return r>0&&r<=65535?r:null},ui=e=>e.filePort??fQ(e.envValue)??e.defaultPort});var _b,ZO,yQ,Il,pi,QO=l(()=>{"use strict";_b=m(require("node:fs")),ZO=m(require("node:path"));He();Pb();Ab();bb();yQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Il=e=>{let t=ZO.default.join(e,gl.wakePort);if(!_b.default.existsSync(t))return null;try{let r=JSON.parse(_b.default.readFileSync(t,"utf8"));if(yQ(r)&&di(r.wakePort))return r.wakePort}catch{return null}return null},pi=(e=v())=>ui({filePort:Il(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Io(e)})});var kb={};St(kb,{isAgentWitchLocalInstallDir:()=>Lo,isValidAgentWitchWakePort:()=>di,readActiveProfileEmailFromFile:()=>Je,readAgentWitchWakePortFromFile:()=>Il,resolveActiveProfileEmail:()=>Qm,resolveActiveProfileEmailFromEnv:()=>Zm,resolveAgentWitchAppBundlePath:()=>fr,resolveAgentWitchAppDir:()=>Cl,resolveAgentWitchDefaultWakePort:()=>Io,resolveAgentWitchDeviceKeypairPath:()=>xl,resolveAgentWitchErrorLogPath:()=>hb,resolveAgentWitchInstallDir:()=>v,resolveAgentWitchLaunchAgentPrefix:()=>ye,resolveAgentWitchLocalLayout:()=>N,resolveAgentWitchLogsDir:()=>Ln,resolveAgentWitchMainLogPath:()=>yb,resolveAgentWitchProjectsDir:()=>Ll,resolveAgentWitchReportsDir:()=>Sb,resolveAgentWitchRuntimeWakePort:()=>pi,resolveAgentWitchWakePortFromSources:()=>ui,sanitizeProfileEmailForDir:()=>gr,sanitizeProfileEmailForLaunchAgentLabel:()=>gb});var G=l(()=>{"use strict";Pb();Ab();QO();bb()});var wb,Tb,eg=l(()=>{"use strict";wb=new Set(["","loginwindow","_mbsetupuser","root"]),Tb=5e3});var eM,hQ,tM,Eb,Rb=l(()=>{"use strict";eM=require("node:child_process");eg();hQ=e=>e.trim().toLowerCase(),tM=e=>e==null?!1:!wb.has(hQ(e)),Eb=()=>{if(process.platform!=="darwin")return null;try{let t=(0,eM.execFileSync)("stat",["-f","%Su","/dev/console"],{encoding:"utf8"}).trim();return tM(t)?t:null}catch{return null}}});var oM,rM,Ut,Wl=l(()=>{"use strict";oM=m(require("node:os"));Rb();rM=e=>e.trim().toLowerCase(),Ut=e=>{if((e?.platform??process.platform)!=="darwin")return!0;let r=e?.consoleUsername===void 0?Eb():e.consoleUsername;if(r===null)return!1;let o=e?.currentUsername??oM.default.userInfo().username;return rM(r)===rM(o)}});var nM,sM,xn,iM=l(()=>{"use strict";nM=require("node:child_process"),sM=m(require("node:fs"));G();Wl();xn=(e=v())=>{let t=fr(e);if(!sM.default.existsSync(t))return{ok:!1,errorMessage:"AgentWitch install not found."};if(!Ut())return{ok:!1,errorMessage:"Skipping spawn \u2014 this macOS account is not the active console user."};let r=Je(e),o={...process.env};return r!==null&&(o.AGENT_WITCH_PROFILE=r),(0,nM.spawn)(process.execPath,[t],{cwd:e,detached:!0,stdio:"ignore",env:o}).unref(),{ok:!0}}});var vb,Lt,mi,aM=l(()=>{"use strict";vb="AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS",Lt=(e=process.env)=>{let t=e.VITEST;return t===void 0||t.length===0?!0:e[vb]==="1"},mi=e=>`Refusing ${e} host side effects under VITEST (set ${vb}=1 to override).`});var In=l(()=>{"use strict";aM()});var lM,Ol,tg=l(()=>{"use strict";lM=require("node:child_process");In();Ol=e=>{if(process.platform!=="darwin"||!Lt())return;let t=process.getuid?.();if(t!==void 0)try{(0,lM.execFileSync)("launchctl",["bootout",`gui/${t}/${e}`],{stdio:"ignore"})}catch{}}});var rg,Cb,cM,ue,og,Ml=l(()=>{"use strict";rg=m(require("node:fs")),Cb=m(require("node:path"));G();He();cM=e=>{let t=Cb.default.join(e,st);return rg.default.existsSync(t)?rg.default.readdirSync(t).filter(r=>rg.default.statSync(Cb.default.join(t,r)).isDirectory()).map(r=>gr(r)).toSorted():[]},ue=(e=v())=>{let t=ye(e),r=cM(e);return[{profileEmail:Je(e)??r[0]??null,launchAgentLabel:t}]},og=(e=v())=>cM(e)});var Lb,dM,uM,SQ,Ur,ng=l(()=>{"use strict";Lb=m(require("node:fs")),dM=m(require("node:os")),uM=m(require("node:path"));G();Ml();SQ=()=>uM.default.join(dM.default.homedir(),"Library","LaunchAgents"),Ur=(e=v())=>{let t=ye(e),r=new Set([`${t}-wake`,`${t}-live`,`${t}-watchdog`,`${t}-updater`,`${t}-automation-scheduler`]);for(let n of ue(e))r.add(n.launchAgentLabel);let o=SQ();if(Lb.default.existsSync(o))for(let n of Lb.default.readdirSync(o)){if(!n.endsWith(".plist"))continue;let s=n.slice(0,-6);(s===t||s.startsWith(`${t}.`)||s.startsWith(`${t}-`))&&r.add(s)}return[...r]}});var pM,jl,mM=l(()=>{"use strict";G();tg();ng();Ml();pM=(e=v())=>{let t=new Set(ue(e).map(r=>r.launchAgentLabel));return Ur(e).filter(r=>!t.has(r))},jl=(e=v())=>{for(let t of pM(e))Ol(t)}});var Nl,xb=l(()=>{"use strict";G();tg();ng();Nl=(e=v())=>{for(let t of Ur(e))Ol(t)}});var gM,fM,PQ,Wn,yM=l(()=>{"use strict";gM=require("node:child_process"),fM=require("node:util"),PQ=(0,fM.promisify)(gM.execFile),Wn=async e=>{if(process.platform!=="darwin")return!1;let t=process.getuid?.();if(t===void 0)return!1;try{let{stdout:r}=await PQ("launchctl",["print",`gui/${t}/${e}`]);return r.includes("state = running")}catch{return!1}}});var On,AQ,Ib,Wb=l(()=>{"use strict";On=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),AQ=e=>`${e}/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin`,Ib=e=>{let t=e.pathValue??AQ(e.homeDir);return`<?xml version="1.0" encoding="UTF-8"?>
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
`}});var sg,Ob=l(()=>{"use strict";sg=e=>{let t=e.trim();return!(!t.startsWith("<?xml")||!t.includes("</plist>")||!t.includes("<key>Label</key>")||t.includes("agent_witch_is_truthy_env")||t.includes("AWI_PROCESS_HOST_ENV")||t.includes("cat <<"))}});var Dl,Mb,ig,ag,Br,lg=l(()=>{"use strict";Dl=m(require("node:fs")),Mb=m(require("node:os")),ig=m(require("node:path"));He();G();Wb();Ob();ag=(e,t=Mb.default.homedir())=>ig.default.join(t,"Library","LaunchAgents",`${e}.plist`),Br=e=>{let t=e.installDir??v(),r=e.homeDir??Mb.default.homedir(),o=ag(e.launchAgentLabel,r),n=Dl.default.existsSync(o)?Dl.default.readFileSync(o,"utf8"):null;if(n!==null&&sg(n))return{ok:!0,rewritten:!1,plistPath:o};let s=Ib({launchAgentLabel:e.launchAgentLabel,runPath:ig.default.join(t,a0,"run.sh"),installDir:t,homeDir:r,wakePort:e.wakePort??pi(t)});if(!sg(s))return{ok:!1,rewritten:!1,plistPath:o,errorMessage:"Generated LaunchAgent plist failed XML validation."};try{Dl.default.mkdirSync(ig.default.dirname(o),{recursive:!0}),Dl.default.writeFileSync(o,s,"utf8")}catch(i){let a=i instanceof Error?i.message:"Could not write LaunchAgent plist.";return{ok:!1,rewritten:!1,plistPath:o,errorMessage:a}}return{ok:!0,rewritten:!0,plistPath:o}}});var SM,PM,AM,Hl,bQ,_Q,hM,Ye,jb=l(()=>{"use strict";SM=require("node:child_process"),PM=m(require("node:fs")),AM=require("node:util");G();In();lg();Wl();Hl=(0,AM.promisify)(SM.execFile),bQ=async e=>{try{return await Hl("launchctl",["print",e]),!0}catch{return!1}},_Q=async(e,t,r)=>{await bQ(t)&&await Hl("launchctl",["bootout",t]).catch(()=>{}),await Hl("launchctl",["bootstrap",e,r]),await Hl("launchctl",["enable",t])},hM=async e=>{try{return await Hl("launchctl",["kickstart","-k",e]),!0}catch{return!1}},Ye=async(e,t=v())=>{if(process.platform!=="darwin")return{ok:!1,errorMessage:"launchctl kickstart is only supported on macOS."};if(!Lt())return{ok:!1,errorMessage:mi("launchctl")};if(!Ut())return{ok:!1,errorMessage:"Skipping kickstart \u2014 this macOS account is not the active console user."};let r=process.getuid?.();if(r===void 0)return{ok:!1,errorMessage:"Could not resolve the current user id for launchctl."};let o=`gui/${r}`,n=`${o}/${e}`,s=Br({launchAgentLabel:e,installDir:t});if(!s.ok)return{ok:!1,errorMessage:s.errorMessage??`Could not repair LaunchAgent plist for ${e}.`};if(!s.rewritten&&await hM(n))return{ok:!0};let i=s.plistPath;if(!PM.default.existsSync(i))return{ok:!1,errorMessage:`LaunchAgent plist not found for ${e}.`};try{return await _Q(o,n,i),await hM(n)?{ok:!0}:{ok:!1,errorMessage:`launchctl kickstart failed for ${e}.`}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"launchctl bootstrap failed."}}}});var Mn,bM=l(()=>{"use strict";G();jb();Ml();Mn=async(e=v(),t=process.platform)=>{if(t!=="darwin")return[];let r=[];for(let o of ue(e))(await Ye(o.launchAgentLabel,e)).ok&&r.push(o.launchAgentLabel);return r}});var cg,gi,_M,kM,wM,TM=l(()=>{"use strict";cg=require("node:child_process"),gi=m(require("node:fs")),_M="EnvironmentVariables.AGENT_WITCH_WAKE_PORT",kM=e=>{try{return(0,cg.execFileSync)("plutil",["-extract",_M,"raw","-o","-",e],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}},wM=(e,t)=>{let r=`${e}.${String(process.pid)}.wake-port.tmp`,{mode:o}=gi.default.statSync(e);try{gi.default.copyFileSync(e,r),(0,cg.execFileSync)("plutil",["-replace",_M,"-string",String(t),r],{stdio:"ignore"}),(0,cg.execFileSync)("plutil",["-lint","-s",r],{stdio:"ignore"}),gi.default.chmodSync(r,o&4095),gi.default.renameSync(r,e)}finally{gi.default.rmSync(r,{force:!0})}}});var EM,RM=l(()=>{"use strict";G();EM=e=>di(e.filePort)?e.plistValue===null?{kind:"skip-no-entry"}:e.plistValue.trim()===String(e.filePort)?{kind:"noop"}:{kind:"sync",wakePort:e.filePort}:{kind:"skip-invalid"}});var vM,CM,kQ,Fl,LM=l(()=>{"use strict";vM=m(require("node:fs")),CM=m(require("node:os"));TM();RM();lg();kQ=(e,t)=>{let r=EM({filePort:t,plistValue:kM(e)});return r.kind!=="sync"?!1:(wM(e,r.wakePort),!0)},Fl=e=>{let t=e.homeDir??CM.default.homedir();return[e.launchAgentPrefix,`${e.launchAgentPrefix}-wake`,`${e.launchAgentPrefix}-live`].map(o=>ag(o,t)).filter(o=>vM.default.existsSync(o)).filter(o=>kQ(o,e.wakePort))}});var bt,Gr,xM=l(()=>{"use strict";xb();Wl();eg();bt=e=>{Ut()||(Nl(),process.stdout.write(`[${e}] Skipping \u2014 this macOS account is not the active console user.
`),process.exit(0))},Gr=(e,t=Tb)=>{if(process.platform!=="darwin")return()=>{};let r=setInterval(()=>{Ut()||e()},t);return()=>{clearInterval(r)}}});var ae=l(()=>{"use strict";P0();iM();tg();mM();xb();ng();Wl();yM();bM();jb();lg();Ob();LM();Wb();Ml();Rb();eg();xM()});var Nb=l(()=>{"use strict";ae()});var $l,IM,dg,WM,fi,OM,MM,Wo=l(()=>{"use strict";$l=".agent-witch",IM="memory",dg="project.json",WM="chunks.ndjson",fi="runs.ndjson",OM="reports",MM=".json"});var jM=l(()=>{"use strict";Wo()});var NM,ug,Db=l(()=>{"use strict";NM=m(require("node:path"));jM();ug=(e,t)=>NM.default.join(e.trim(),`${t.trim()}${MM}`)});var zl,DM,HM=l(()=>{"use strict";zl="agent-witch.js",DM="command"});var pg=l(()=>{"use strict";HM()});var jn,FM,$M=l(()=>{"use strict";pg();jn=e=>`'${e.replace(/'/g,"'\\''")}'`,FM=e=>{let t=`${e.installDir.trim()}/${"app"}/${zl}`,r=[jn("node"),jn(t),"report","write","--key",jn(e.reportKey.trim()),"--agent-run-id",jn(e.agentRunId.trim()),"--status",jn(e.status),"--summary",jn(e.summary.trim())];return e.details!==void 0&&e.details.trim().length>0&&r.push("--details",jn(e.details.trim())),r.join(" ")}});var yr,zM,wQ,Hb,mg=l(()=>{"use strict";Db();$M();yr={IN_PROGRESS:"in_progress",COMPLETED:"completed",FAILED:"failed",BLOCKED:"blocked"},zM=e=>e===yr.COMPLETED||e===yr.FAILED,wQ=e=>["Maintain a machine-readable job report so the user can check status later.","AgentWitch records the initial time estimate in this report before the main task starts.",`Report key: ${e.reportKey}`,`Report file: ${e.reportFilePath}`,"","After every meaningful step and on finish, run this exact shell command (update --status and --summary each time):",e.reportWriteCommand,"","Valid --status values: in_progress, completed, failed, blocked.","Use plain-language --summary text the user can read without opening logs.","Optional --details for longer notes.",`Always include agentRunId ${e.agentRunId} via --agent-run-id (already in the command above).`].join(`
`),Hb=(e,t)=>{let r=ug(t.reportsDir,t.reportKey),o=FM({installDir:t.installDir,reportKey:t.reportKey,agentRunId:t.agentRunId,status:yr.IN_PROGRESS,summary:"Task started on your computer."});return`${e.trim()}

---
${wQ({agentRunId:t.agentRunId,reportKey:t.reportKey,reportFilePath:r,reportWriteCommand:o})}`}});var Xe=l(()=>{"use strict";He();G()});var Bl,BM,UM,GM,TQ,yi,EQ,VM,Gl,Vl,Fb,KM,qM,Kl=l(()=>{"use strict";Bl=m(require("node:fs")),BM=m(require("node:path"));mg();Db();Xe();UM=50,GM=e=>{let t=N(),r=ug(t.reportsDir,e);return Bl.default.mkdirSync(BM.default.dirname(r),{recursive:!0}),r},TQ=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.reportKey=="string"&&typeof t.agentRunId=="string"&&typeof t.status=="string"&&typeof t.updatedAt=="string"&&typeof t.userSummary=="string"&&Array.isArray(t.history)},yi=e=>{let t=GM(e);if(!Bl.default.existsSync(t))return null;try{let r=JSON.parse(Bl.default.readFileSync(t,"utf8"));return TQ(r)?r:null}catch{return null}},EQ=(e,t)=>{let r=[...e,t];return r.length>UM?r.slice(r.length-UM):r},VM=e=>{let t=GM(e.reportKey);Bl.default.writeFileSync(t,`${JSON.stringify(e,null,2)}
`,"utf8")},Gl=e=>{let t=yi(e.reportKey),r=new Date().toISOString(),o={at:r,status:e.status,summary:e.userSummary.trim()},n={reportKey:e.reportKey,agentRunId:e.agentRunId,status:e.status,updatedAt:r,userSummary:e.userSummary.trim(),...e.estimateSeconds!==void 0?{estimateSeconds:e.estimateSeconds}:{},...e.details!==void 0&&e.details.trim().length>0?{details:e.details.trim()}:{},history:EQ(t?.history??[],o)};return VM(n),n},Vl=e=>{let t=yi(e.reportKey);return t!==null?t:Gl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:yr.IN_PROGRESS,userSummary:e.userSummary?.trim()??"Task started; waiting for the agent."})},Fb=(e,t)=>{let r=t.trim();if(r.length===0)return yi(e);let o=yi(e);if(o===null)return null;let n=o.details!==void 0&&o.details.trim().length>0?`${o.details.trim()}
${r}`:r,s={...o,updatedAt:new Date().toISOString(),details:n};return VM(s),s},KM=e=>{if(e===null)return{};let t=e.userSummary.trim();return{reportStatus:e.status,...t.length>0?{reportSummary:t}:{},...e.history.length>0?{reportHistory:e.history}:{}}},qM=e=>{if(e===null||!zM(e.status))return null;let t=[e.userSummary.trim()];return e.details!==void 0&&e.details.trim().length>0&&t.push(e.details.trim()),{exitCode:e.status===yr.COMPLETED?0:1,output:t.filter(r=>r.length>0).join(`

`)}}});var RQ,vQ,ql,JM,gg,$b=l(()=>{"use strict";mg();Kl();RQ=new Set(Object.values(yr)),vQ=e=>RQ.has(e),ql=(e,t)=>{let r=e.indexOf(t);if(r<0)return;let o=e[r+1];return typeof o=="string"&&o.trim().length>0?o.trim():void 0},JM=()=>{process.stdout.write(["Usage: agent-witch report write \\","  --key <report-key> \\","  --agent-run-id <run-id> \\","  --status in_progress|completed|failed|blocked \\","  --summary <plain-language status> \\","  [--details <optional notes>]",""].join(`
`))},gg=e=>{if(e[0]!=="write")return JM(),1;let r=ql(e,"--key"),o=ql(e,"--agent-run-id"),n=ql(e,"--status"),s=ql(e,"--summary"),i=ql(e,"--details");return r===void 0||o===void 0||n===void 0||s===void 0||!vQ(n)?(JM(),1):(Gl({reportKey:r,agentRunId:o,status:n,userSummary:s,details:i}),0)}});var _t,Nn=l(()=>{"use strict";_t=()=>!0});var zb,YM,Dn,fg=l(()=>{"use strict";zb=m(require("node:path")),YM=require("node:url");Nn();Dn=e=>{let t=process.argv[1];if(t===void 0)return!1;let r=zb.default.resolve(t);return _t()?r===zb.default.resolve(__filename):e===void 0?!1:r===(0,YM.fileURLToPath)(e)}});var Ub,Bb,Gb,ke,Vb=l(()=>{"use strict";Ub=["block","warn","info"],Bb=["seed","project","retired"],Gb="warn",ke={symptom:120,cause:200,avoidance:280,checkValue:280,keyword:40,keywords:24,tag:32,tags:12,id:64}});var Kb,Vr,ej,tj,qb,Oo,rj=l(()=>{"use strict";Vb();Kb=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Vr=e=>typeof e=="string"?e:null,ej=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[],tj=e=>{if(!Kb(e))return null;let t=Vr(e.id)?.trim()??"",r=Vr(e.symptom)?.trim()??"";if(t.length===0||r.length===0)return null;let o=Bb.find(d=>d===e.source)??"project",n=Ub.find(d=>d===e.severity)??Gb,s=Kb(e.check)?e.check:null,i=s?.kind==="command"?"command":"id",a=Vr(s?.value)?.trim()??"",c=Vr(e.projectId)?.trim()??null;return{id:t,projectId:c!==null&&c.length>0?c:null,symptom:r,cause:Vr(e.cause)?.trim()??"",avoidance:Vr(e.avoidance)?.trim()??"",check:{kind:i,value:a.length>0?a:t},keywords:ej(e.keywords),tags:ej(e.tags),source:o,overridesSeed:e.overridesSeed===!0,hitCount:typeof e.hitCount=="number"&&Number.isFinite(e.hitCount)?Math.max(0,Math.floor(e.hitCount)):0,lastSeenAt:Vr(e.lastSeenAt),updatedAt:Vr(e.updatedAt),severity:n}},qb=e=>!Kb(e)||!Array.isArray(e.pitfalls)?null:{items:e.pitfalls.map(t=>tj(t)).filter(t=>t!==null),syncedAt:Vr(e.syncedAt)},Oo=e=>e.filter(t=>t.source!=="retired").length});var Hn,Jb=l(()=>{"use strict";Hn=e=>e.replace(/\s+/g," ").trim()});var Mo,Yb=l(()=>{"use strict";Mo=e=>Math.ceil(e.length/4)});var yg,oj=l(()=>{"use strict";Yb();yg=(e,t)=>{if(t<=0)return"";if(Mo(e)<=t)return e;let r=t*4;return e.slice(0,r).trimEnd()}});var Jl,nj=l(()=>{"use strict";Jb();Jl=e=>`${Hn(e.id)}|${Hn(e.avoidance)}`});var sj=l(()=>{"use strict"});var Bt=l(()=>{"use strict";Vb();rj();Jb();Yb();oj();nj();sj()});var Fn,hi,Si,Pi,Yl,hg,ij,aj,lj,cj,dj,Xl,Zl,Sg,Ai,Pg,Xb,Gt=l(()=>{"use strict";Fn="agent-witch-token-saver",hi=`# BEGIN ${Fn}`,Si=`# END ${Fn}`,Pi=`<!-- BEGIN ${Fn} -->`,Yl=`<!-- END ${Fn} -->`,hg=".cursor/rules/agent-witch-check-context.mdc",ij=".cursor/mcp.json",aj=".codex/config.toml",lj=".codex/AGENTS.md",cj=".claude/settings.json",dj="declined-projects.json",Xl="agent-witch",Zl="agent-witch",Sg=["mcp"],Ai="mcp-hook",Pg="check_context",Xb=`${Zl} ${Ai} ${Pg}`});var Ag,bg,_g,bi,Zb,Ql,kg=l(()=>{"use strict";Bt();Gt();Ag=ke.symptom,bg=ke.cause,_g=ke.avoidance,bi=64,Zb="token-saver.db",Ql=1});var wg,_i,IQ,$ye,ki=l(()=>{"use strict";wg="agent-witch.js",_i="deps.tar.gz",IQ="install.sh",$ye={mainScript:`app/${wg}`,depsArchive:`app/${_i}`,installShell:IQ}});var uj=l(()=>{"use strict";ki()});var pj=l(()=>{"use strict";ki();uj()});var ec,e_,Tg,WQ,tc,Fe,Ti,rc,oc,$n,t_=l(()=>{"use strict";ec=m(require("node:fs")),e_=m(require("node:path"));pj();G();Tg="install-version.json",WQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),tc=(e=v())=>e_.default.join(e,Tg),Fe=(e=v())=>{let t=tc(e);if(!ec.default.existsSync(t))return null;try{let r=JSON.parse(ec.default.readFileSync(t,"utf8"));return!WQ(r)||typeof r.bundleVersion!="string"||typeof r.appOrigin!="string"||typeof r.updatedAt!="string"?null:{bundleVersion:r.bundleVersion,appOrigin:r.appOrigin,updatedAt:r.updatedAt}}catch{return null}},Ti=(e,t=v())=>{let r=tc(t);ec.default.mkdirSync(e_.default.dirname(r),{recursive:!0}),ec.default.writeFileSync(r,`${JSON.stringify(e,null,2)}
`,"utf8")},rc=(e=v())=>Fe(e)?.bundleVersion??"266",oc=(e,t)=>{let r=Fe(e);if(r!==null)return r;let o={bundleVersion:"266",appOrigin:t,updatedAt:new Date().toISOString()};return Ti(o,e),o},$n=(e,t)=>{if(e===null)return!0;let r=Number.parseInt(e,10),o=Number.parseInt(t,10);return Number.isFinite(r)&&Number.isFinite(o)?o>r:e!==t}});var mj,zn,r_,o_,n_,Eg,Sr,Un,s_=l(()=>{"use strict";mj=require("node:crypto"),zn=m(require("node:fs")),r_=m(require("node:path"));G();o_="self-update-log.ndjson",n_=100,Eg=(e=v())=>{let t=N(),r=t.installDir===e?t.logsDir:Ln({installDir:e,profileEmail:t.profileEmail});return r_.default.join(r,o_)},Sr=(e,t=v())=>{let r={id:(0,mj.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,localBundleVersion:e.localBundleVersion,remoteBundleVersion:e.remoteBundleVersion},o=Eg(t);zn.default.mkdirSync(r_.default.dirname(o),{recursive:!0});let n=zn.default.existsSync(o)?zn.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-n_+1)),JSON.stringify(r)];return zn.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},Un=(e=20,t=v())=>{let r=Eg(t);if(!zn.default.existsSync(r))return[];let o=zn.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=n.trim();if(s.length===0)return[];try{return[JSON.parse(s)]}catch{return[]}});return o.slice(Math.max(0,o.length-e))}});var i_,nhe,a_=l(()=>{"use strict";ki();i_="deps",nhe=`${"app"}/${_i}`});var gj=l(()=>{"use strict";a_()});var fj,jo,Bn,yj,l_,c_,hj=l(()=>{"use strict";fj=require("node:child_process"),jo=m(require("node:fs")),Bn=m(require("node:path"));ki();a_();yj=e=>Bn.default.join(e,"app",i_),l_=e=>{let t=Bn.default.join(e,"app"),r=Bn.default.join(t,_i);jo.default.existsSync(r)&&(jo.default.rmSync(yj(e),{recursive:!0,force:!0}),jo.default.mkdirSync(t,{recursive:!0}),(0,fj.execFileSync)("tar",["-xzf",r,"-C",t],{stdio:"pipe"}),jo.default.rmSync(r,{force:!0}))},c_=e=>{jo.default.rmSync(Bn.default.join(e,"node_modules"),{recursive:!0,force:!0}),jo.default.rmSync(Bn.default.join(e,"package.json"),{force:!0}),jo.default.rmSync(Bn.default.join(e,"package-lock.json"),{force:!0})}});var Sj=l(()=>{"use strict";gj();hj()});var Pj=l(()=>{"use strict";ni()});var Rg,vg,Cg=l(()=>{"use strict";Rg="AGENT_WITCH_EXTERNAL_BRIDGE",vg="AGENT_WITCH_EXTERNAL_LIVE"});var Aj=l(()=>{"use strict";Cg();ni()});var bj,nc,_j=l(()=>{"use strict";bj=require("node:child_process");ni();nc=()=>new Promise((e,t)=>{if(process.platform!=="linux"){e();return}let r=(0,bj.spawn)("systemctl",["--user","restart",pr],{stdio:"ignore"});r.on("error",o=>{t(o)}),r.on("close",o=>{if(o===0){e();return}t(new Error(`systemctl --user restart ${pr} exited ${o??"unknown"}`))})})});var d_=l(()=>{"use strict";ni();Pj();Aj();_j()});var Vt,Ei=l(()=>{"use strict";Vt=e=>{if(!Number.isInteger(e)||e<=0)return!1;try{return process.kill(e,0),!0}catch{return!1}}});var sc,Lg,kj,MQ,u_,jQ,wj,NQ,g_,DQ,f_,Kt,ic,ac,y_,p_,m_,lc,cc,h_,S_,Ri=l(()=>{"use strict";sc=m(require("node:fs")),Lg=m(require("node:path"));Ei();kj="active-writer-work.json",MQ=1440*60*1e3,u_=new Set,jQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wj=e=>e.profileEmail===null?Lg.default.join(e.installDir,kj):Lg.default.join(e.installDir,"profiles",e.profileEmail,kj),NQ=e=>{let t=wj(e);if(!sc.default.existsSync(t))return{activeCount:0,updatedAt:new Date(0).toISOString()};try{let r=JSON.parse(sc.default.readFileSync(t,"utf8"));if(!jQ(r)||typeof r.activeCount!="number"||typeof r.updatedAt!="string")return{activeCount:0,updatedAt:new Date(0).toISOString()};let o=Math.max(0,Math.floor(r.activeCount)),n=typeof r.ownerPid=="number"&&Number.isInteger(r.ownerPid)?r.ownerPid:void 0;return{activeCount:o,updatedAt:r.updatedAt,...n!==void 0?{ownerPid:n}:{}}}catch{return{activeCount:0,updatedAt:new Date(0).toISOString()}}},g_=(e,t)=>{let r=wj(e);sc.default.mkdirSync(Lg.default.dirname(r),{recursive:!0}),sc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},DQ=(e,t={})=>{if(e.activeCount<=0)return!1;let r=t.isPidAlive??Vt;if(e.ownerPid!==void 0&&!r(e.ownerPid))return!0;let o=Date.parse(e.updatedAt);return Number.isNaN(o)?!0:(t.nowMs??Date.now())-o>MQ},f_=e=>{let t=NQ(e);if(!DQ(t))return t;let r={activeCount:0,updatedAt:new Date().toISOString()};try{g_(e,r)}catch{}return r},Kt=e=>f_(e).activeCount>0,ic=e=>{let t=f_(e);g_(e,{activeCount:t.activeCount+1,updatedAt:new Date().toISOString(),ownerPid:process.pid})},ac=e=>{let t=f_(e),r=Math.max(0,t.activeCount-1);if(g_(e,{activeCount:r,updatedAt:new Date().toISOString(),ownerPid:process.pid}),r===0)for(let o of u_)o()},y_=e=>(u_.add(e),()=>{u_.delete(e)}),p_=null,m_=null,lc=e=>{p_=e},cc=e=>{m_=e},h_=()=>{let e=p_;return p_=null,e},S_=()=>{let e=m_;return m_=null,e}});var $e,xg=l(()=>{"use strict";$e=e=>{try{let t=new URL(e);return t.protocol=t.protocol==="wss:"?"https:":"http:",t.pathname="",t.search="",t.hash="",t.toString().replace(/\/$/,"")}catch{return null}}});var vi,Ig,dc,P_=l(()=>{"use strict";vi="qwen2.5:7b",Ig="nomic-embed-text",dc="Install Ollama from https://ollama.com/download"});var uc,A_,Wg=l(()=>{"use strict";P_();uc=()=>`
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
`,A_=()=>`
${uc()}
agent_witch_ensure_ollama || echo "Task time estimates need Ollama. AgentWitch will continue without it." >&2
`});var Tj,HQ,Og,b_=l(()=>{"use strict";Tj=require("node:child_process");G();In();Wg();HQ=e=>new Promise(t=>{if(!Lt()){t({exitCode:1,output:mi("Ollama")});return}let r=(0,Tj.spawn)("bash",["-c",e],{env:{...process.env,AGENT_WITCH_HOME:v()}}),o=[];r.stdout.on("data",n=>{o.push(n)}),r.stderr.on("data",n=>{o.push(n)}),r.on("error",n=>{t({exitCode:1,output:n.message})}),r.on("close",n=>{t({exitCode:n??1,output:Buffer.concat(o).toString("utf8").trim()})})}),Og=async(e=HQ)=>{let t=`${uc()}
agent_witch_ensure_ollama
`,r=await e(t);return r.exitCode===0?{ok:!0,message:r.output.length>0?r.output:"Ollama is ready."}:{ok:!1,message:r.output.length>0?r.output:"Could not install Ollama."}}});var No,Mg,Ej,FQ,Rj,Li,$Q,zQ,UQ,Ci,Gn,Vn,vj=l(()=>{"use strict";No=m(require("node:fs")),Mg=m(require("node:path"));Sj();d_();ae();G();ki();At();t_();Ri();xg();s_();b_();Ej=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),FQ=e=>{let t=Je(e),r=t===null?N():N(t);if(!No.default.existsSync(r.configPath))return null;try{let o=JSON.parse(No.default.readFileSync(r.configPath,"utf8"));return!Ej(o)||typeof o.wsUrl!="string"?null:o.wsUrl}catch{return null}},Rj=async e=>{let t=await fetch(`${e}/install/agent-witch/version`,{signal:AbortSignal.timeout(1e4)});if(!t.ok)return null;let r=await t.json();if(!Ej(r)||typeof r.bundleVersion!="string"||!Array.isArray(r.scripts))return null;let o=r.scripts.filter(n=>typeof n=="string");return{bundleVersion:r.bundleVersion,scripts:o}},Li=async e=>(await Rj(e))?.bundleVersion??null,$Q=async(e,t,r)=>{let o=await fetch(`${e}/install/agent-witch/${r}`,{signal:AbortSignal.timeout(6e4)});if(!o.ok)throw new Error(`Failed to download ${r}.`);let n=Mg.default.join(t,r);No.default.mkdirSync(Mg.default.dirname(n),{recursive:!0});let s=Buffer.from(await o.arrayBuffer());No.default.writeFileSync(n,s),r.endsWith(".js")&&No.default.chmodSync(n,493)},zQ=async()=>{if(process.platform==="linux"){try{await nc()}catch(e){let t=e instanceof Error?e.message:String(e);console.warn(`[agent-witch-self-update] Linux service restart skipped: ${t}`)}return}jl(),await Mn()},UQ=(e,t)=>e!==null?$e(e):t??Pt,Ci=(e,t)=>({localBundleVersion:t,...e}),Gn=async e=>{let t=v(),r=Fe(t),o=r?.bundleVersion??null,n=await Og();Sr({event:"check_complete",ok:n.ok,message:n.message,localBundleVersion:o,remoteBundleVersion:null});let s=FQ(t),i=UQ(s,r?.appOrigin);if(i===null){let d=Ci({ok:!1,updated:!1,message:"Could not resolve the AgentWitch app origin for updates.",remoteBundleVersion:null},o);return Sr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}let a=await Rj(i);if(a===null){let d=Ci({ok:!1,updated:!1,message:"Could not fetch the remote AgentWitch install bundle.",remoteBundleVersion:null},o);return Sr({event:"update_failed",ok:!1,message:d.message,localBundleVersion:o,remoteBundleVersion:null}),d}if(!(e?.force===!0||$n(o,a.bundleVersion))){let d=Ci({ok:!0,updated:!1,message:"Install bundle is up to date.",remoteBundleVersion:a.bundleVersion},o);return Sr({event:"check_complete",ok:!0,message:d.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),d}try{for(let f of a.scripts)await $Q(i,t,f);let d=Mg.default.join(t,wg);No.default.existsSync(d)&&No.default.rmSync(d,{force:!0}),l_(t),c_(t),Ti({bundleVersion:a.bundleVersion,appOrigin:i,updatedAt:new Date().toISOString()});let u=N(Je(t));if(Kt(u)){cc("install-bundle-update");let f=Ci({ok:!0,updated:!1,message:"Install bundle files updated; service restart deferred until the active writer task finishes.",remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Sr({event:"update_applied",ok:!0,message:f.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),f}await zQ();let g=Ci({ok:!0,updated:!0,message:`Updated AgentWitch bundle ${o??"unknown"} -> ${a.bundleVersion}.`,remoteBundleVersion:a.bundleVersion},a.bundleVersion);return Sr({event:"update_applied",ok:!0,message:g.message,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}catch(d){let u=d instanceof Error?d.message:"AgentWitch self-update failed.",g=Ci({ok:!1,updated:!1,message:u,remoteBundleVersion:a.bundleVersion},o);return Sr({event:"update_failed",ok:!1,message:u,localBundleVersion:o,remoteBundleVersion:a.bundleVersion}),g}},Vn=()=>{let e=v();return{local:Fe(e),logs:Un(20,e)}}});var Cj={};St(Cj,{AGENT_WITCH_INSTALL_VERSION_FILE_NAME:()=>Tg,AGENT_WITCH_OLLAMA_DOWNLOAD_HINT:()=>dc,AGENT_WITCH_OLLAMA_EMBED_MODEL:()=>Ig,AGENT_WITCH_OLLAMA_ESTIMATE_MODEL:()=>vi,AGENT_WITCH_SELF_UPDATE_LOG_FILE_NAME:()=>o_,AGENT_WITCH_SELF_UPDATE_LOG_MAX_ENTRIES:()=>n_,appendAgentWitchSelfUpdateLog:()=>Sr,buildAgentWitchEnsureOllamaShell:()=>uc,buildAgentWitchInstallScriptOllama:()=>A_,buildAgentWitchSelfUpdateStatus:()=>Vn,ensureAgentWitchInstallVersionRecorded:()=>oc,ensureAgentWitchOllamaInstalled:()=>Og,fetchAgentWitchRemoteInstallBundleVersion:()=>Li,isRemoteAgentWitchBundleVersionNewer:()=>$n,readAgentWitchInstallVersion:()=>Fe,readAgentWitchSelfUpdateLogs:()=>Un,resolveAgentWitchAppOriginFromWsUrl:()=>$e,resolveAgentWitchHeartbeatInstallBundleVersion:()=>rc,resolveAgentWitchInstallVersionPath:()=>tc,resolveAgentWitchSelfUpdateLogPath:()=>Eg,runAgentWitchSelfUpdate:()=>Gn,writeAgentWitchInstallVersion:()=>Ti});var Pr=l(()=>{"use strict";t_();s_();vj();xg();P_();Wg();b_()});var __={};St(__,{buildAgentWitchSelfUpdateStatus:()=>Vn,fetchAgentWitchRemoteInstallBundleVersion:()=>Li,runAgentWitchSelfUpdate:()=>Gn});var k_=l(()=>{"use strict";Pr()});function xi(e){return(0,Lj.createHash)("sha256").update(e.trim()).digest("hex")}var Lj,jg=l(()=>{"use strict";Lj=require("node:crypto")});var Ii,pc,BQ,Wi,w_,Ng=l(()=>{"use strict";Ii=m(require("node:fs")),pc=m(require("node:path"));jg();Xe();BQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Wi=e=>{if(!Ii.default.existsSync(e))return null;try{let t=JSON.parse(Ii.default.readFileSync(e,"utf8"));return!BQ(t)||typeof t.pairingToken!="string"||t.pairingToken.trim().length===0?null:xi(t.pairingToken.trim())}catch{return null}},w_=(e=v())=>{let t=[],r=new Set,o=s=>{s===null||r.has(s)||(r.add(s),t.push(s))};o(Wi(pc.default.join(e,"config.json")));let n=pc.default.join(e,st);if(!Ii.default.existsSync(n))return t;for(let s of Ii.default.readdirSync(n)){let i=pc.default.join(n,s);Ii.default.statSync(i).isDirectory()&&o(Wi(pc.default.join(i,"config.json")))}return t}});var Oi,mc=l(()=>{"use strict";Oi="connection-health.json"});var Kn,Dg,GQ,gc,Ce,T_,Hg,ze,Fg=l(()=>{"use strict";Kn=m(require("node:fs")),Dg=m(require("node:path"));mc();GQ=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gc=e=>e.profileEmail===null?Dg.default.join(e.installDir,Oi):Dg.default.join(e.installDir,"profiles",e.profileEmail,Oi),Ce=e=>{let t=gc(e);if(!Kn.default.existsSync(t))return null;try{let r=JSON.parse(Kn.default.readFileSync(t,"utf8"));return!GQ(r)||typeof r.lastAckAt!="string"?null:{lastAckAt:r.lastAckAt,wsUrl:typeof r.wsUrl=="string"?r.wsUrl:null,connectedAt:typeof r.connectedAt=="string"?r.connectedAt:null}}catch{return null}},T_=e=>{let t=gc(e);Kn.default.existsSync(t)&&Kn.default.rmSync(t,{force:!0})},Hg=(e,t)=>{let r=gc(e),o=Ce(e),n=new Date().toISOString(),s={lastAckAt:n,wsUrl:t.wsUrl,connectedAt:t.connectedAt??o?.connectedAt??n};Kn.default.mkdirSync(Dg.default.dirname(r),{recursive:!0}),Kn.default.writeFileSync(r,`${JSON.stringify(s,null,2)}
`,"utf8")},ze=(e,t,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e.lastAckAt);return Number.isNaN(o)?!0:r-o>t}});var fc,xj=l(()=>{"use strict";mc();Fg();fc=(e,t)=>{if(!t.socketOpen)return!1;let r=Ce(e);return r===null?!1:!ze(r,t.staleAfterMs??12e4,t.nowMs)}});var E_,Ij=l(()=>{"use strict";Fg();E_=(e,t)=>!(e!==null&&!ze(e,t.staleAfterMs,t.nowMs)||e===null&&t.socketOpen)});var qn=l(()=>{"use strict";Fg();xj();Ij();mc()});var $g,R_,VQ,KQ,Wj,Oj=l(()=>{"use strict";$g=m(require("node:fs")),R_=m(require("node:path"));G();He();qn();Ng();VQ=12e4,KQ=e=>{let t=R_.default.join(e,st);return $g.default.existsSync(t)?$g.default.readdirSync(t).filter(r=>$g.default.statSync(R_.default.join(t,r)).isDirectory()):[]},Wj=(e=v())=>{let t=null,r=-1;for(let o of KQ(e)){let n=N(o),s=Ce(n);if(s===null||ze(s,VQ))continue;let i=Wi(n.configPath);if(i===null)continue;let a=Date.parse(s.lastAckAt);!Number.isFinite(a)||a<=r||(r=a,t=i)}return t}});var v_,Mj,zg,yc,hc,qQ,JQ,YQ,jj,we,Te,Ug,Ar,qt=l(()=>{"use strict";v_=m(require("node:fs")),Mj=m(require("node:os")),zg=m(require("node:path")),yc={claudeCommand:"claude",codexCommand:"codex",cursorCommand:"cursor",antigravityCommand:"agy"},hc=e=>e.trim().length>0,qQ=e=>{let t=zg.default.basename(e.trim()).toLowerCase();return t==="agent"||t==="cursor-agent"},JQ=()=>{let e=Mj.default.homedir(),t=zg.default.join(e,".local","bin","agent");if(v_.default.existsSync(t))return t;let r=zg.default.join(e,".local","bin","cursor-agent");return v_.default.existsSync(r)?r:yc.cursorCommand},YQ=e=>{let t=e.trim();return!hc(t)||t===yc.cursorCommand?JQ():t},jj=(e,t)=>qQ(e)?t:["agent",...t],we=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",Te=e=>{let t=e.claudeCommand??"",r=e.codexCommand??"",o=e.cursorCommand??"",n=e.antigravityCommand??"";return{claudeCommand:hc(t)?t.trim():yc.claudeCommand,codexCommand:hc(r)?r.trim():yc.codexCommand,cursorCommand:YQ(o),antigravityCommand:hc(n)?n.trim():yc.antigravityCommand}},Ug=(e,t)=>e==="claude-cli"?{command:t.claudeCommand,args:["-v"]}:e==="codex"?{command:t.codexCommand,args:["--version"]}:e==="cursor"?{command:t.cursorCommand,args:jj(t.cursorCommand,["-v"])}:{command:t.antigravityCommand,args:["--version"]},Ar=(e,t,r,o)=>{let n=t.trim();if(!hc(n))return null;let s=o?.sessionTurn==="continue"?["--continue"]:[];return e==="claude-cli"?{command:r.claudeCommand,args:[...s,"-p","--output-format","json","--dangerously-skip-permissions",n]}:e==="codex"?{command:r.codexCommand,args:["exec","-s","danger-full-access",n]}:e==="cursor"?{command:r.cursorCommand,args:jj(r.cursorCommand,[...s,"-p","--force","--trust","--sandbox","disabled",n])}:{command:r.antigravityCommand,args:[...s,"--dangerously-skip-permissions","-p",n]}}});var Do,XQ,Jn,ZQ,Mi,Sc=l(()=>{"use strict";Do=e=>typeof e=="number"&&Number.isFinite(e)&&e>=0?Math.floor(e):0,XQ=e=>{if(typeof e!="object"||e===null)return"claude";let r=[...Object.entries(e).map(([o,n])=>{if(typeof n!="object"||n===null)return{name:o,total:0};let s=n;return{name:o,total:Do(s.inputTokens)+Do(s.outputTokens)+Do(s.cacheReadInputTokens)+Do(s.cacheCreationInputTokens)}})].sort((o,n)=>n.total-o.total)[0];return r!==void 0&&r.name.length>0?r.name:"claude"},Jn=e=>{let t=e.trim(),r=t.indexOf("{"),o=t.lastIndexOf("}");if(r<0||o<=r)return null;let n;try{n=JSON.parse(t.slice(r,o+1))}catch{return null}if(typeof n!="object"||n===null)return null;let s=n;if(s.type!=="result"||typeof s.result!="string")return null;let i=s.usage;if(typeof i!="object"||i===null)return null;let a=i,c=Do(a.input_tokens)+Do(a.cache_creation_input_tokens)+Do(a.cache_read_input_tokens),d=Do(a.output_tokens),u=c+d;return u<1?null:{text:s.result,inputTokens:c,outputTokens:d,totalTokens:u,model:XQ(s.modelUsage),costUsd:typeof s.total_cost_usd=="number"?s.total_cost_usd:null}},ZQ=e=>({provider:"anthropic",model:e.model,inputTokens:e.inputTokens,outputTokens:e.outputTokens,totalTokens:e.totalTokens,estimatedCostUsd:e.costUsd,estimateIsApproximate:!1}),Mi=(e,t)=>{let r=Jn(e);return r===null?{output:e,...t!==void 0?{llmUsage:t}:{}}:{output:r.text,llmUsage:t??ZQ(r)}}});var C_,QQ,eee,L_,x_=l(()=>{"use strict";C_=e=>e.toLocaleString("en-US"),QQ=e=>e<.01?e.toFixed(4):e.toFixed(3),eee=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${QQ(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${C_(e.inputTokens)} in / ${C_(e.outputTokens)} out (${C_(e.totalTokens)} total)`,t].join(`
`)},L_=(e,t)=>{if(t===void 0)return e;let r=eee(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var Bg,I_=l(()=>{"use strict";Bg={anthropic:"claude-sonnet-4-20250514",openai:"gpt-4.1-mini",google:"gemini-2.0-flash"}});var Yn,W_,Gg,O_=l(()=>{"use strict";I_();Yn="auto",W_=e=>({value:Yn,label:`Auto (${Bg[e]})`}),Gg={anthropic:[W_("anthropic"),{value:"claude-sonnet-4-20250514",label:"claude-sonnet-4-20250514"},{value:"claude-3-5-sonnet-20241022",label:"claude-3-5-sonnet-20241022"},{value:"claude-3-5-haiku-20241022",label:"claude-3-5-haiku-20241022"}],openai:[W_("openai"),{value:"gpt-4.1-mini",label:"gpt-4.1-mini"},{value:"gpt-4.1",label:"gpt-4.1"},{value:"gpt-4o-mini",label:"gpt-4o-mini"}],google:[W_("google"),{value:"gemini-2.0-flash",label:"gemini-2.0-flash"},{value:"gemini-2.5-flash",label:"gemini-2.5-flash"},{value:"gemini-2.5-pro",label:"gemini-2.5-pro"}]}});var ji,Pc,Vg,Ni=l(()=>{"use strict";I_();O_();ji=e=>{let t=e?.trim()??"";if(!(t.length===0||t===Yn))return t},Pc=(e,t)=>{let r=ji(t);return r===void 0?Bg[e]:r},Vg=e=>{let t=ji(e);return t===void 0?Yn:t}});var Kg,tee,ree,qg,Nj=l(()=>{"use strict";Kg={"claude-sonnet-4-20250514":{inputUsd:3,outputUsd:15},"claude-3-5-sonnet-20241022":{inputUsd:3,outputUsd:15},"gpt-4.1-mini":{inputUsd:.4,outputUsd:1.6},"gpt-4.1":{inputUsd:2,outputUsd:8},"gpt-4o-mini":{inputUsd:.15,outputUsd:.6},"gemini-2.0-flash":{inputUsd:.1,outputUsd:.4},"gemini-2.5-flash":{inputUsd:.15,outputUsd:.6}},tee=e=>{let t=Kg[e];if(t!==void 0)return t;let r=e.toLowerCase();return r.includes("sonnet")?Kg["claude-sonnet-4-20250514"]:r.includes("gpt-4.1-mini")?Kg["gpt-4.1-mini"]:r.includes("gemini")&&r.includes("flash")?Kg["gemini-2.0-flash"]:null},ree=(e,t,r)=>{let o=tee(e);if(o===null)return null;let n=t/1e6*o.inputUsd,s=r/1e6*o.outputUsd;return n+s},qg=e=>{let t=ree(e.model,e.inputTokens,e.outputTokens);return{...e,estimatedCostUsd:t,estimateIsApproximate:!0}}});var Di,oee,nee,see,Jg,Dj=l(()=>{"use strict";Nj();Di=e=>typeof e!="number"||!Number.isFinite(e)||e<0?0:Math.floor(e),oee=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Di(r.input_tokens),n=Di(r.output_tokens);return o===0&&n===0?null:qg({provider:"anthropic",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},nee=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usage;if(typeof r!="object"||r===null)return null;let o=Di(r.prompt_tokens),n=Di(r.completion_tokens);return o===0&&n===0?null:qg({provider:"openai",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},see=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e.usageMetadata;if(typeof r!="object"||r===null)return null;let o=Di(r.promptTokenCount),n=Di(r.candidatesTokenCount);return o===0&&n===0?null:qg({provider:"google",model:t,inputTokens:o,outputTokens:n,totalTokens:o+n})},Jg=(e,t,r)=>e==="anthropic"?oee(t,r):e==="openai"?nee(t,r):see(t,r)});var iee,M_,aee,lee,cee,dee,uee,j_,N_=l(()=>{"use strict";Ni();Dj();iee=e=>{if(typeof e!="object"||e===null)return"";let t=e.content;return Array.isArray(t)?t.map(r=>{if(typeof r!="object"||r===null)return"";let o=r;return o.type==="text"&&typeof o.text=="string"?o.text:""}).join(""):""},M_=(e,t,r)=>{let o=r?.trim()??"";return o.length>0?o:Pc(e,t.model)},aee=async e=>{let t=M_("anthropic",e.secret,e.modelOverride),r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":e.secret.apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:t,max_tokens:8192,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`Anthropic API error (${String(r.status)})`};let n=iee(o);n.length>0&&e.onChunk?.(n);let s=Jg("anthropic",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},lee=e=>{if(typeof e!="object"||e===null)return"";let t=e.choices;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.message;return typeof o?.content=="string"?o.content:""},cee=async e=>{let t=M_("openai",e.secret,e.modelOverride),r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${e.secret.apiKey}`},body:JSON.stringify({model:t,messages:[{role:"user",content:e.prompt}]})}),o=await r.json().catch(()=>null);if(!r.ok)return{exitCode:1,output:typeof o=="object"&&o!==null&&"error"in o&&typeof o.error?.message=="string"?o.error.message:`OpenAI API error (${String(r.status)})`};let n=lee(o);n.length>0&&e.onChunk?.(n);let s=Jg("openai",o,t);return{exitCode:0,output:n,...s!==null?{llmUsage:s}:{}}},dee=e=>{if(typeof e!="object"||e===null)return"";let t=e.candidates;if(!Array.isArray(t)||t.length===0)return"";let r=t[0];if(typeof r!="object"||r===null)return"";let o=r.content?.parts;return Array.isArray(o)?o.map(n=>{if(typeof n!="object"||n===null)return"";let s=n.text;return typeof s=="string"?s:""}).join(""):""},uee=async e=>{let t=M_("google",e.secret,e.modelOverride),r=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(t)}:generateContent?key=${encodeURIComponent(e.secret.apiKey)}`,o=await fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:e.prompt}]}]})}),n=await o.json().catch(()=>null);if(!o.ok)return{exitCode:1,output:typeof n=="object"&&n!==null&&"error"in n&&typeof n.error?.message=="string"?n.error.message:`Google API error (${String(o.status)})`};let s=dee(n);s.length>0&&e.onChunk?.(s);let i=Jg("google",n,t);return{exitCode:0,output:s,...i!==null?{llmUsage:i}:{}}},j_=async e=>{try{return e.provider==="anthropic"?await aee(e):e.provider==="openai"?await cee(e):await uee(e)}catch(t){return{exitCode:-1,output:t instanceof Error?t.message:String(t)}}}});var kt,Ac=l(()=>{"use strict";kt=e=>e==="claude-cli"?"anthropic":e==="codex"?"openai":e==="antigravity"?"google":null});var Hj,pee,Yg,D_=l(()=>{"use strict";Hj=m(require("node:path")),pee="writer-api-secrets.json",Yg=e=>Hj.default.join(e,pee)});var H_,Fj,mee,Ho,ct,Fo=l(()=>{"use strict";H_=m(require("node:fs"));Ni();D_();Fj=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),mee=e=>{if(!Fj(e))return null;let t=typeof e.apiKey=="string"?e.apiKey.trim():"";if(t.length===0)return null;let r=typeof e.model=="string"?e.model:void 0,o=ji(r);return{apiKey:t,...o!==void 0?{model:o}:{}}},Ho=e=>{let t=Yg(e);if(!H_.default.existsSync(t))return{};try{let r=JSON.parse(H_.default.readFileSync(t,"utf8"));if(!Fj(r))return{};let o={},n=["anthropic","openai","google"];for(let s of n){let i=mee(r[s]);i!==null&&(o[s]=i)}return o}catch{return{}}},ct=(e,t)=>Ho(e)[t]??null});var Ze,bc=l(()=>{"use strict";Ze=e=>e==="api"?"api":"cli"});var $j,Be,Xn,Kr=l(()=>{"use strict";$j=m(require("node:path"));Ac();Fo();bc();Be=e=>$j.default.dirname(e),Xn=(e,t)=>{if(Ze(e.writerExecutionBackend)!=="api")return!1;let r=kt(t);if(r===null)return!1;let o=Be(e.layout.configPath),n=ct(o,r);return n!==null&&n.apiKey.length>0}});var _c,F_=l(()=>{"use strict";x_();N_();Ac();Fo();Kr();_c=async(e,t,r,o)=>{let n=r.trim();if(n.length===0)return{exitCode:-1,output:"Writer instruction must be a non-empty string."};let s=kt(t);if(s===null)return{exitCode:-1,output:`${t} does not support API-key mode. Use CLI or pick Claude, Codex, or Antigravity.`};let i=Be(e.layout.configPath),a=ct(i,s);if(a===null){let d=Object.keys(Ho(i));return{exitCode:-1,output:`No API key saved for ${s}. Add one in AgentWitch Local \u2192 Writer API (${d.length===0?"writer-api-secrets.json is empty":`have keys for: ${d.join(", ")}`}).`}}let c=await j_({provider:s,secret:a,prompt:n,onChunk:o});return{exitCode:c.exitCode,output:L_(c.output,c.llmUsage),...c.llmUsage!==void 0?{llmUsage:c.llmUsage}:{}}}});var zj,Hi,$_=l(()=>{"use strict";zj=require("node:child_process");qt();Sc();F_();Kr();Hi=(e,t,r)=>new Promise(o=>{if(!we(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}if(Xn(e,t)){_c(e,t,r).then(o);return}let n=Ar(t,r,Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=(0,zj.spawn)(n.command,n.args,{cwd:e.workspace,env:process.env,stdio:["ignore","pipe","pipe"]}),i=[],a=[];s.stdout?.on("data",c=>{i.push(c.toString("utf8"))}),s.stderr?.on("data",c=>{a.push(c.toString("utf8"))}),s.on("close",c=>{let d=Mi(i.join("")),u=a.join("").trim(),g=[d.output.trim(),u].filter(f=>f.length>0).join(`
`);o({exitCode:c??-1,output:g})}),s.on("error",c=>{o({exitCode:-1,output:c.message})})})});var Uj=l(()=>{"use strict"});var Bj=l(()=>{"use strict";x_();$_();N_();Uj();Fo();Kr()});var Gj,Vj,Kj,qj=l(()=>{"use strict";Gj="claude",Vj="codex",Kj="cursor"});var Jj,gee,z_,kc,Xg=l(()=>{"use strict";Jj=m(require("node:path"));At();He();gee="ws://localhost:3000/api/agent-witch/ws",z_=e=>e.replace(/\/$/,""),kc=e=>{let t=process.env.AGENT_WITCH_WS_URL?.trim();if(t!==void 0&&t.length>0)return z_(t);let r=Jj.default.basename(e.installDir);if(r===ml.production)return Jp;let o=e.configWsUrl?.trim()??"";return r===ml.localhost?o.length>0?z_(o):gee:o.length>0?z_(o):Jp}});var yee,U_,B_=l(()=>{"use strict";qj();Xg();bc();yee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),U_=e=>{if(!yee(e.parsed))return{ok:!1,reason:"not_object"};let t=e.parsed,r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=kc({installDir:e.layout.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:e.cwd,s=typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:e.env.CLAUDE_COMMAND??Gj,i=typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:e.env.CODEX_COMMAND??Vj,a=typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:e.env.CURSOR_COMMAND??Kj,c=typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:e.env.ANTIGRAVITY_COMMAND??"agy",d=typeof t.pairingToken=="string"&&t.pairingToken.length>0?t.pairingToken.trim():"",u=typeof t.email=="string"&&t.email.trim().length>0?t.email.trim().toLowerCase():e.layout.profileEmail;return d.length===0?{ok:!1,reason:"missing_pairing_token"}:{ok:!0,config:{email:u,wsUrl:o,workspace:n,claudeCommand:s,codexCommand:i,cursorCommand:a,antigravityCommand:c,pairingToken:d,writerExecutionBackend:Ze(t.writerExecutionBackend),layout:e.layout}}}});var G_,V_,K_=l(()=>{"use strict";G_=m(require("node:fs"));G();B_();V_=e=>{let t=N(e);if(!G_.default.existsSync(t.configPath))return null;try{let r=JSON.parse(G_.default.readFileSync(t.configPath,"utf8")),o=U_({parsed:r,layout:t,env:{CLAUDE_COMMAND:process.env.CLAUDE_COMMAND,CODEX_COMMAND:process.env.CODEX_COMMAND,CURSOR_COMMAND:process.env.CURSOR_COMMAND,ANTIGRAVITY_COMMAND:process.env.ANTIGRAVITY_COMMAND},cwd:process.cwd()});if(!o.ok){if(o.reason==="not_object")throw new Error("Config must be a JSON object.");return console.error(`[agent-witch] Missing pairingToken in ${t.configPath}. Re-run the install script.`),null}return o.config}catch(r){let o=r instanceof Error?r.message:"Unknown config error";return console.error(`[agent-witch] Invalid config at ${t.configPath}: ${o}`),null}}});var wc,Yj=l(()=>{"use strict";wc=(e,t,r)=>{let o=r?.trim()??"",n=e?.trim()??"";return o.length>0?n.length>0?n:null:n.length>0?n:t()}});var q_,hee,J_,Xj=l(()=>{"use strict";q_=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),hee=e=>{if(!q_(e))return null;let t=typeof e.id=="string"?e.id.trim():"",r=typeof e.projectId=="string"?e.projectId.trim():"",o=typeof e.digest=="string"?e.digest.trim():"";if(t.length===0||r.length===0||o.length===0||!Array.isArray(e.entries))return null;let n=e.entries.flatMap(s=>{if(!q_(s))return[];let i=typeof s.componentId=="string"?s.componentId.trim():"",a=typeof s.versionId=="string"?s.versionId.trim():"",c=s.kind,d=s.scope;if(i.length===0||a.length===0||c!=="harness"&&c!=="workflow"&&c!=="agent"||d!=="project"&&d!=="run")return[];if(!Array.isArray(s.items))return[];let u=s.items.flatMap(g=>{if(!q_(g))return[];let f=typeof g.itemKey=="string"?g.itemKey.trim():"",y=typeof g.relativePath=="string"?g.relativePath:"",P=typeof g.contentSha256=="string"?g.contentSha256.trim():"";return f.length===0||P.length===0?[]:[{itemKey:f,relativePath:y,contentSha256:P}]});return u.length===0?[]:[{componentId:i,versionId:a,kind:c,scope:d,items:u}]});return{id:t,projectId:r,digest:o,entries:n}},J_=hee});var Zj,See,Zg,Y_=l(()=>{"use strict";Zj=m(require("node:path")),See=(e,t)=>{let r=t.trim();return Zj.default.join(e,"components","store",r.slice(0,2),r)},Zg=See});var Qj,Pee,X_,eN=l(()=>{"use strict";Qj=m(require("node:fs"));Y_();Pee=(e,t)=>{let r=[];for(let o of t.entries)for(let n of o.items){let s=Zg(e.installDir,n.contentSha256);Qj.default.existsSync(s)||r.push(n.contentSha256.slice(0,12))}return r.length===0?null:`Missing ${r.length} component blob(s) on this computer. Open Harness to sync, then retry.`},X_=Pee});var Tc,Fi,Aee,Z_,bee,Q_,ek=l(()=>{"use strict";Tc=m(require("node:fs")),Fi=m(require("node:path"));Y_();Aee=(e,t)=>Fi.default.join(e.installDir,"runs",t,"overlay"),Z_=(e,t)=>Fi.default.join(Aee(e,t),".cursor"),bee=(e,t,r)=>{let o=r.entries.filter(s=>s.scope==="run");if(o.length===0)return{ok:!0};let n=Z_(e,t);Tc.default.mkdirSync(n,{recursive:!0});for(let s of o)for(let i of s.items){let a=Zg(e.installDir,i.contentSha256);if(!Tc.default.existsSync(a))return{ok:!1,errorMessage:"Run overlay materialization failed \u2014 component blob missing on this computer."};let c=i.relativePath.trim().replace(/^\/+/,""),d=c.length>0?Fi.default.join(n,c):Fi.default.join(n,i.itemKey);Tc.default.mkdirSync(Fi.default.dirname(d),{recursive:!0}),Tc.default.copyFileSync(a,d)}return{ok:!0}},Q_=bee});var tk,tN,_ee,Ec,rN=l(()=>{"use strict";tk=m(require("node:fs")),tN=m(require("node:path")),_ee=(e,t)=>{let r=tN.default.join(e.installDir,"runs",t);tk.default.existsSync(r)&&tk.default.rmSync(r,{recursive:!0,force:!0})},Ec=_ee});var kee,rk,oN=l(()=>{"use strict";ek();kee=(e,t,r)=>{if(t===void 0||!r||t.trim().length===0)return process.env;let o=Z_(e,t);return{...process.env,AGENT_WITCH_CURSOR_OVERLAY_DIR:o}},rk=kee});var ok,wee,Tee,Eee,Ree,vee,$,nN=l(()=>{"use strict";ok=m(require("node:fs"));Xg();G();bc();wee="claude",Tee="codex",Eee="cursor",Ree="agy",vee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),$=()=>{let e=N();if(!ok.default.existsSync(e.configPath))return null;try{let t=JSON.parse(ok.default.readFileSync(e.configPath,"utf8"));if(!vee(t))return null;let r=typeof t.wsUrl=="string"?t.wsUrl.trim():"",o=kc({installDir:e.installDir,configWsUrl:r}),n=typeof t.workspace=="string"&&t.workspace.length>0?t.workspace:process.cwd(),s=typeof t.pairingToken=="string"?t.pairingToken.trim():"";return{email:e.profileEmail,wsUrl:o,workspace:n,writerExecutionBackend:Ze(t.writerExecutionBackend),claudeCommand:typeof t.claudeCommand=="string"&&t.claudeCommand.length>0?t.claudeCommand:wee,codexCommand:typeof t.codexCommand=="string"&&t.codexCommand.length>0?t.codexCommand:Tee,cursorCommand:typeof t.cursorCommand=="string"&&t.cursorCommand.length>0?t.cursorCommand:Eee,antigravityCommand:typeof t.antigravityCommand=="string"&&t.antigravityCommand.length>0?t.antigravityCommand:Ree,pairingToken:s,layout:e}}catch{return null}}});var Qg,sN,iN=l(()=>{"use strict";Qg=m(require("node:fs"));D_();sN=(e,t)=>{let r=Yg(e);Qg.default.mkdirSync(e,{recursive:!0}),Qg.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,{encoding:"utf8",mode:384});try{Qg.default.chmodSync(r,384)}catch{}}});var Rc,aN,ef=l(()=>{"use strict";Rc=e=>{let t=e.trim();if(t.length===0)return"";if(t.length<=8)return"\u2022".repeat(Math.min(t.length,12));let r=t.slice(0,4),o=t.slice(-4);return`${r}${"\u2022".repeat(12)}${o}`},aN=(e,t)=>{let r=e.trim();return r.length===0||t===void 0?!1:r===Rc(t)}});var vc,Cee,nk,sk,lN=l(()=>{"use strict";vc=m(require("node:fs"));Fo();iN();ef();Ni();Kr();Cee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),nk=(e,t,r,o)=>{let n=e[t],s=r?.trim()??"",i=aN(s,n?.apiKey)?"":s,a=i.length>0?i:n?.apiKey;if(a===void 0||a.length===0)return e;let c=o!==void 0?ji(o):n?.model;return{...e,[t]:{apiKey:a,...c!==void 0?{model:c}:{}}}},sk=e=>{let t=Be(e.configPath),r={};if(vc.default.existsSync(e.configPath))try{let n=JSON.parse(vc.default.readFileSync(e.configPath,"utf8"));Cee(n)&&(r={...n})}catch{r={}}r.writerExecutionBackend=e.writerExecutionBackend,vc.default.mkdirSync(t,{recursive:!0}),vc.default.writeFileSync(e.configPath,`${JSON.stringify(r,null,2)}
`,"utf8");let o=nk(nk(nk(Ho(t),"anthropic",e.anthropicApiKey,e.anthropicModel),"openai",e.openaiApiKey,e.openaiModel),"google",e.googleApiKey,e.googleModel);sN(t,o)}});var tf,ik=l(()=>{"use strict";tf={anthropic:{href:"https://console.anthropic.com/settings/keys",label:"Get key"},openai:{href:"https://platform.openai.com/api-keys",label:"Get key"},google:{href:"https://aistudio.google.com/apikey",label:"Get key"}}});var ak,cN=l(()=>{"use strict";Ac();Fo();Kr();Kr();ak=(e,t)=>{if(Xn(e,t)||t==="antigravity")return!1;let r=kt(t);if(r===null)return!1;let o=Be(e.layout.configPath),n=ct(o,r);return n===null||n.apiKey.trim().length===0}});var dN,lk,ck=l(()=>{"use strict";dN=e=>{let t=e.listProfileEmails();if(t.length===0){let r=e.readConfig(null);return r===null?[]:[r]}return t.flatMap(r=>{let o=e.readConfig(r);return o===null?[]:[o]})},lk=async e=>{let t=dN(e);return t.length>0?t:(e.logWaiting("[agent-witch] Waiting for valid config\u2026"),new Promise(r=>{let o=()=>{let n=dN(e);if(n.length>0){r(n);return}setTimeout(o,e.pollIntervalMs)};o()}))}});var Lee,dk,uN=l(()=>{"use strict";ae();K_();ck();Lee=1e4,dk=()=>lk({listProfileEmails:og,readConfig:V_,pollIntervalMs:Lee,logWaiting:e=>{console.error(e)}})});var xee,uk,pN=l(()=>{"use strict";xee={accepted:"Restart accepted; Local is restarting.",already_in_progress:"Restart already in progress.",deferred_writer_busy:"Restart deferred until the active writer task finishes.",unsupported:"This AgentWitch Local cannot handle Connect/restart. Update from /download."},uk=e=>({status:e.status,reason:e.reason,message:xee[e.status]})});var ee=l(()=>{"use strict";$_();Bj();K_();Xg();Yj();Xj();eN();ek();rN();oN();bc();nN();lN();Fo();Kr();ef();Ni();ik();F_();Kr();cN();Ac();Fo();uN();B_();ck();pN()});var mN,pk,gN=l(()=>{"use strict";mN=m(require("node:path"));G();He();Oj();jg();Ng();ee();pk=(e=v())=>{let t=Wj(e);if(t!==null)return t;let r=Je(e);if(r!==null){let n=Wi(mN.default.join(e,st,r,"config.json"));if(n!==null)return n}let o=$()?.pairingToken.trim()??"";return o.length===0?null:xi(o)}});var rf,fN,Iee,Wee,yN,of,Cc,nf,Lc=l(()=>{"use strict";rf=m(require("node:fs")),fN=m(require("node:path")),Iee="wake-port.json",Wee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yN=e=>typeof e=="number"&&Number.isInteger(e)&&e>0&&e<=65535,of=e=>fN.default.join(e,Iee),Cc=e=>{let t=of(e);if(!rf.default.existsSync(t))return null;try{let r=JSON.parse(rf.default.readFileSync(t,"utf8"));if(Wee(r)&&yN(r.wakePort))return r.wakePort}catch{return null}return null},nf=(e,t)=>{if(!yN(t))throw new Error(`Invalid wake port: ${String(t)}`);let r=of(e);rf.default.writeFileSync(r,`${JSON.stringify({wakePort:t},null,2)}
`,"utf8")}});var nbe,sbe,ibe,Jt,hN,xc=l(()=>{"use strict";G();Lc();Xe();Lc();nbe=Io(),sbe=`${ye()}-wake`,ibe=ye(),Jt=()=>{let e=v();return ui({filePort:Cc(e),envValue:process.env.AGENT_WITCH_WAKE_PORT,defaultPort:Io(e)})},hN=e=>{let t=v();Cc(t)===null&&nf(t,e)}});var SN=l(()=>{"use strict";jg();ae();Ng();gN();ee();xc()});var mk,Ic,Wc,PN=l(()=>{"use strict";mk=m(require("node:os"));SN();Ic=()=>{let e=ue();return{ok:!0,port:Jt(),hostname:mk.default.hostname(),profileCount:e.length}},Wc=()=>{let e=ue(),t=pk(),r=w_();return{hostname:mk.default.hostname(),port:Jt(),tokenHash:t,tokenHashes:r.length>0?r:t!==null?[t]:[],profiles:e.map(o=>({email:o.profileEmail,launchAgentLabel:o.launchAgentLabel}))}}});var gk=l(()=>{"use strict";PN()});var AN,bN,_N,sf,$i=l(()=>{"use strict";AN="materialization.json",bN="backups",_N=".gitignore",sf=e=>`harness-set:${e.trim()}`});var kN,wN,af,TN=l(()=>{"use strict";kN=m(require("node:crypto")),wN=m(require("node:fs")),af=e=>{try{let t=wN.default.readFileSync(e);return kN.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var $o,Zn,Oee,EN,fk,RN=l(()=>{"use strict";$o=m(require("node:fs")),Zn=m(require("node:path"));TN();Oee=(e,t,r,o)=>{let n=new Date().toISOString().replaceAll(":","-"),s=Zn.default.join(t,n,o);return $o.default.mkdirSync(Zn.default.dirname(s),{recursive:!0}),$o.default.copyFileSync(r,s),Zn.default.relative(e,s).replaceAll("\\","/")},EN=e=>{let t=Zn.default.join(e.repoRoot,e.repoRelativeDestination),r=af(e.sourceAbsolutePath);if(r===null)throw new Error("Could not read harness source file.");let o=e.ledger.entries[e.repoRelativeDestination];if($o.default.existsSync(t)){let n=af(t);if(n===r)return{kind:"skipped_unchanged"};if(!(o!==void 0&&o.componentId===e.componentId)&&n!==null){let i=Oee(e.repoRoot,e.backupsDir,t,e.repoRelativeDestination);return $o.default.mkdirSync(Zn.default.dirname(t),{recursive:!0}),$o.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"backed_up_user_file",backupPath:i}}}return $o.default.mkdirSync(Zn.default.dirname(t),{recursive:!0}),$o.default.copyFileSync(e.sourceAbsolutePath,t),{kind:"written"}},fk=e=>{let t=af(e.sourceAbsolutePath);if(t===null)throw new Error("Could not hash harness source file.");return{componentId:e.componentId,versionId:e.versionId,sha256:t,mode:"managed",writtenAt:new Date().toISOString(),...e.backupPath!==void 0?{backupPath:e.backupPath}:{}}}});var yk,vN,zi,lf=l(()=>{"use strict";yk=m(require("node:fs"));$i();vN=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zi=e=>{if(!yk.default.existsSync(e))return{version:1,entries:{}};try{let t=JSON.parse(yk.default.readFileSync(e,"utf8"));if(vN(t)&&t.version===1&&vN(t.entries))return{version:1,entries:t.entries}}catch{return{version:1,entries:{}}}return{version:1,entries:{}}}});var zo,cf,df,hk=l(()=>{"use strict";zo=m(require("node:fs")),cf=m(require("node:path"));$i();df=e=>{let t=new Set(e.setSlugs.map(s=>sf(s))),r=[],o=[],n={};for(let[s,i]of Object.entries(e.ledger.entries)){if(!t.has(i.componentId)){n[s]=i;continue}let a=cf.default.join(e.repoRoot,s);if(i.backupPath!==void 0){let c=cf.default.join(e.repoRoot,i.backupPath);zo.default.existsSync(c)?(zo.default.mkdirSync(cf.default.dirname(a),{recursive:!0}),zo.default.copyFileSync(c,a),o.push(s)):zo.default.existsSync(a)&&zo.default.rmSync(a,{force:!0})}else zo.default.existsSync(a)&&zo.default.rmSync(a,{force:!0});r.push(s)}return{ledger:{version:1,entries:n},summary:{removedPaths:r,restoredPaths:o}}}});var Sk,Ui,uf=l(()=>{"use strict";Sk=m(require("node:path"));$i();Ui=e=>({ledgerFilePath:Sk.default.join(e.metaDirPath,AN),backupsDirPath:Sk.default.join(e.metaDirPath,bN)})});var Pk,CN,LN=l(()=>{"use strict";Pk=m(require("node:path")),CN=(e,t)=>{let o=t.replaceAll("\\","/").trim().split("/").filter(i=>i.length>0);if(o.length===0)return Pk.default.posix.join("rules",e,"file");let n=o[o.length-1]??"file",s=o[0]??"rules";return Pk.default.posix.join(s,e,n)}});var Ak,xN,Mc,bk=l(()=>{"use strict";Ak=m(require("node:fs")),xN=m(require("node:path")),Mc=(e,t)=>{Ak.default.mkdirSync(xN.default.dirname(e),{recursive:!0}),Ak.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var _k,Mee,Qe,Uo=l(()=>{"use strict";_k=m(require("node:os")),Mee=e=>{let t=e.trim();return t.startsWith("~/")?`${_k.default.homedir()}${t.slice(1)}`:t==="~"?_k.default.homedir():t},Qe=Mee});var pf,IN,jee,WN,ON=l(()=>{"use strict";pf=m(require("node:fs")),IN=m(require("node:path"));$i();Wo();jee=`*
!${dg}
`,WN=e=>{let t=IN.default.join(e,_N);pf.default.existsSync(t)||(pf.default.mkdirSync(e,{recursive:!0}),pf.default.writeFileSync(t,jee))}});var Qn,xt,es=l(()=>{"use strict";Qn=m(require("node:path"));Wo();Uo();xt=e=>{let t=Qe(e),r=Qn.default.join(t,$l);return{projectFolderPath:e,resolvedProjectFolderPath:t,metaDirPath:r,ragDirPath:Qn.default.join(r,"rag"),memoryDirPath:Qn.default.join(r,IM),reportsDirPath:Qn.default.join(r,OM),metaFilePath:Qn.default.join(r,dg),ragChunksFilePath:Qn.default.join(r,"rag",WM)}}});var br,jN,Nee,Dee,it,mf=l(()=>{"use strict";br=m(require("node:fs")),jN=m(require("node:path"));Wo();ON();es();Nee=(e,t)=>{if(br.default.existsSync(e.metaFilePath))return;let r={projectFolderPath:e.projectFolderPath,...t.projectId!==void 0?{projectId:t.projectId}:{},...t.projectName!==void 0?{name:t.projectName}:{},createdAt:new Date().toISOString()};br.default.writeFileSync(e.metaFilePath,`${JSON.stringify(r,null,2)}
`)},Dee=e=>{br.default.existsSync(e.ragChunksFilePath)||br.default.writeFileSync(e.ragChunksFilePath,"");let t=jN.default.join(e.memoryDirPath,fi);br.default.existsSync(t)||br.default.writeFileSync(t,"")},it=e=>{let t=xt(e.projectFolderPath);return br.default.mkdirSync(t.resolvedProjectFolderPath,{recursive:!0}),br.default.mkdirSync(t.ragDirPath,{recursive:!0}),br.default.mkdirSync(t.memoryDirPath,{recursive:!0}),WN(t.metaDirPath),Nee(t,e),Dee(t),{ok:!0,layout:t}}});var NN,DN,HN,FN,gf,ff=l(()=>{"use strict";NN="components",DN="store",HN="versions",FN="installed.json",gf=e=>`harness-set:${e.trim()}`});var kk,$N,yf,wk=l(()=>{"use strict";kk=m(require("node:fs")),$N=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yf=e=>{if(!kk.default.existsSync(e))return{version:1,components:{}};try{let t=JSON.parse(kk.default.readFileSync(e,"utf8"));if($N(t)&&t.version===1&&$N(t.components))return{version:1,components:t.components}}catch{return{version:1,components:{}}}return{version:1,components:{}}}});var jc,Bi,hf=l(()=>{"use strict";jc=m(require("node:path"));ff();Bi=e=>{let t=jc.default.join(e,NN);return{componentsRootDir:t,storeDir:jc.default.join(t,DN),versionsDir:jc.default.join(t,HN),installedFilePath:jc.default.join(t,FN)}}});var Tk,zN,Sf,Pf,Af=l(()=>{"use strict";Tk=m(require("node:crypto")),zN=m(require("node:fs")),Sf=e=>Tk.default.createHash("sha256").update(e,"utf8").digest("hex"),Pf=e=>{try{let t=zN.default.readFileSync(e);return Tk.default.createHash("sha256").update(t).digest("hex")}catch{return null}}});var Ek,UN,BN,GN=l(()=>{"use strict";Ek=m(require("node:fs")),UN=m(require("node:path")),BN=(e,t)=>{Ek.default.mkdirSync(UN.default.dirname(e),{recursive:!0}),Ek.default.writeFileSync(e,`${JSON.stringify(t,null,2)}
`)}});var Rk,vk,VN,KN=l(()=>{"use strict";Rk=m(require("node:fs")),vk=m(require("node:path")),VN=(e,t)=>{let r=t.componentId.replaceAll("/","_"),o=vk.default.join(e,r),n=vk.default.join(o,`${t.versionId}.json`);Rk.default.mkdirSync(o,{recursive:!0}),Rk.default.writeFileSync(n,`${JSON.stringify(t,null,2)}
`)}});var bf,qN,JN,YN=l(()=>{"use strict";bf=m(require("node:fs")),qN=m(require("node:path"));Af();JN=e=>{let t=Sf(e.content),r=qN.default.join(e.storeDir,t);return bf.default.existsSync(r)||(bf.default.mkdirSync(e.storeDir,{recursive:!0}),bf.default.writeFileSync(r,e.content)),t}});var Ck,XN,Hee,_f,Lk=l(()=>{"use strict";Ck=m(require("node:fs")),XN=m(require("node:path"));ff();wk();hf();Af();GN();KN();YN();Hee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_f=e=>{let t=Bi(e.installDir),r=gf(e.setSlug),o=String(e.setEntry.version),n=[];for(let i of e.setEntry.items){if(!Hee(i))continue;let a=typeof i.path=="string"?i.path.trim():"";if(a.length===0)continue;let c=XN.default.join(e.harnessRootDir,a);if(!Ck.default.existsSync(c))continue;let d=Ck.default.readFileSync(c,"utf8"),u=typeof i.contentSha256=="string"&&i.contentSha256.length>0?i.contentSha256:Pf(c);if(u!==null){if(Sf(d)!==u)throw new Error(`Harness item "${i.id}" failed content hash verification.`);JN({storeDir:t.storeDir,content:d}),n.push({id:String(i.id),kind:String(i.kind),title:String(i.title),harnessItemPath:a,contentSha256:u})}}if(n.length===0)return;VN(t.versionsDir,{version:1,componentId:r,versionId:o,items:n,createdAt:new Date().toISOString()});let s=yf(t.installedFilePath);BN(t.installedFilePath,{version:1,components:{...s.components,[r]:{versionId:o,installedAt:new Date().toISOString()}}})}});var Ik,xk,ZN,QN=l(()=>{"use strict";Ik=m(require("node:fs"));Lk();wk();hf();xk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ZN=e=>{if(!Ik.default.existsSync(e.harnessManifestPath))return;let t=Bi(e.installDir),r=yf(t.installedFilePath);if(Object.keys(r.components).length>0)return;let o;try{o=JSON.parse(Ik.default.readFileSync(e.harnessManifestPath,"utf8"))}catch{return}if(!(!xk(o)||o.version!==1||!xk(o.sets)))for(let[n,s]of Object.entries(o.sets)){if(!xk(s))continue;let i=typeof s.version=="number"?s.version:1,a=Array.isArray(s.items)?s.items:[];_f({installDir:e.installDir,harnessRootDir:e.harnessRootDir,setSlug:n,setEntry:{version:i,items:a}})}}});var Wk,eD,tD,rD=l(()=>{"use strict";Wk=m(require("node:fs")),eD=m(require("node:path")),tD=e=>{let t=e.componentId.replaceAll("/","_"),r=eD.default.join(e.versionsDir,t,`${e.versionId}.json`);if(!Wk.default.existsSync(r))return null;try{let o=JSON.parse(Wk.default.readFileSync(r,"utf8"));if(typeof o=="object"&&o!==null&&o.version===1)return o}catch{return null}return null}});var kf,wf,oD,nD=l(()=>{"use strict";kf=m(require("node:fs")),wf=m(require("node:path"));ff();QN();rD();hf();Af();oD=e=>{ZN({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,harnessManifestPath:e.layout.harnessManifestPath});let t=Bi(e.layout.installDir),r=gf(e.setSlug),o=tD({versionsDir:t.versionsDir,componentId:r,versionId:String(e.setVersion)});if(o!==null){let i=o.items.find(a=>a.id===e.manifestItemId);if(i!==void 0){let a=wf.default.join(t.storeDir,i.contentSha256);if(kf.default.existsSync(a)&&Pf(a)===i.contentSha256)return a}}let n=e.manifestItemPath.trim();if(n.length===0)return null;let s=n.startsWith("shared/")?wf.default.join(e.layout.harnessRootDir,n):wf.default.join(e.layout.harnessSetsDir,e.setSlug,n);if(!kf.default.existsSync(s))return null;try{if(!kf.default.statSync(s).isFile())return null}catch{return null}return s}});var sD,Fee,Ok,_r,Nc=l(()=>{"use strict";lf();uf();es();sD="harness-set:",Fee=e=>{let t=e.trim();if(!t.startsWith(sD))return null;let r=t.slice(sD.length).trim();return r.length>0?r:null},Ok=e=>{let t=new Set;for(let r of Object.values(e.entries)){let o=Fee(r.componentId);o!==null&&t.add(o)}return[...t].sort((r,o)=>r.localeCompare(o))},_r=e=>{let t=xt(e),{ledgerFilePath:r}=Ui(t),o=zi(r);return Ok(o)}});var Tf,Mk,Dc,$ee,qr,Hc,Gi=l(()=>{"use strict";Tf=m(require("node:fs")),Mk=m(require("node:os")),Dc=m(require("node:path")),$ee=()=>Tf.default.realpathSync(Dc.default.resolve(Mk.default.homedir())),qr=e=>{let t=e.trim();if(t.length===0)return null;let r=t.startsWith("~")?Dc.default.join(Mk.default.homedir(),t.slice(1)):t,o;try{o=Tf.default.realpathSync(Dc.default.resolve(r))}catch{return null}let n=$ee();return o===n||o.startsWith(`${n}${Dc.default.sep}`)?o:null},Hc=e=>{let t=qr(e);if(t===null)return null;try{if(!Tf.default.statSync(t).isFile())return null}catch{return null}return t}});var jk,Nk=l(()=>{"use strict";jk=e=>{let t=e.trim();if(t.length===0)return null;let r=/^shared\/items\/[^/]+\/(.+)$/.exec(t);return r!==null&&typeof r[1]=="string"?r[1]:t.startsWith("rules/")||t.startsWith("skills/")||t.startsWith("commands/")||t.startsWith("agents/")||t.startsWith("instructions/")?t:null}});var Rf,iD,Ef,zee,Fc,Dk=l(()=>{"use strict";Rf=m(require("node:fs")),iD=m(require("node:path"));$i();RN();lf();hk();uf();LN();bk();Uo();mf();nD();Nc();Gi();Nk();Ef=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zee=e=>{if(!Rf.default.existsSync(e))return null;try{let t=JSON.parse(Rf.default.readFileSync(e,"utf8"));if(Ef(t)&&t.version===1)return t}catch{return null}return null},Fc=e=>{let t=[...new Set(e.setSlugs.map(S=>S.trim()).filter(S=>S.length>0))],r=Qe(e.projectFolderPath),o=qr(r);if(o===null)return{ok:!1,errorMessage:"Project folder must exist under your home directory."};let n;try{n=Rf.default.statSync(o)}catch{return{ok:!1,errorMessage:"Project folder could not be read."}}if(!n.isDirectory())return{ok:!1,errorMessage:"Project path must be a folder (repo root)."};let s=it({projectFolderPath:o}),{ledgerFilePath:i,backupsDirPath:a}=Ui(s.layout),d=_r(o).filter(S=>!t.includes(S)),u=zi(i),g=0;if(d.length>0){let S=df({repoRoot:o,setSlugs:d,ledger:u});u=S.ledger,g=S.summary.removedPaths.length}if(t.length===0)return Mc(i,u),{ok:!0,writtenFileCount:0,skippedFileCount:0,backedUpFileCount:0,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:[]};let f=zee(e.layout.harnessManifestPath);if(f===null)return{ok:!1,errorMessage:"No local harness manifest found. Submit a harness first."};let y=Ef(f.sets)?f.sets:{},P=0,h=0,p=0;for(let S of t){let b=y[S];if(!Ef(b))return{ok:!1,errorMessage:`Harness set "${S}" is not installed locally.`};let k=typeof b.version=="number"?String(b.version):"1",A=sf(S),_=Array.isArray(b.items)?b.items:[];for(let E of _){if(!Ef(E))continue;let T=typeof E.path=="string"?E.path.trim():"";if(T.length===0)continue;let C=jk(T);if(C===null)continue;let x=CN(S,C),W=iD.default.posix.join(".cursor",x).replaceAll("\\","/"),j=typeof E.id=="string"?E.id.trim():"",M=oD({layout:e.layout,setSlug:S,setVersion:typeof b.version=="number"?b.version:1,manifestItemPath:T,manifestItemId:j});if(M===null)continue;let B=EN({repoRoot:o,backupsDir:a,repoRelativeDestination:W,sourceAbsolutePath:M,componentId:A,versionId:k,ledger:u});if(B.kind==="skipped_unchanged"){h+=1;continue}if(B.kind==="backed_up_user_file"){p+=1,P+=1,u={version:1,entries:{...u.entries,[W]:fk({componentId:A,versionId:k,sourceAbsolutePath:M,backupPath:B.backupPath})}};continue}P+=1,u={version:1,entries:{...u.entries,[W]:fk({componentId:A,versionId:k,sourceAbsolutePath:M})}}}}return P===0&&h===0&&g===0?{ok:!1,errorMessage:"No harness files were written. Check that selected sets contain items on disk."}:(Mc(i,u),{ok:!0,writtenFileCount:P,skippedFileCount:h,backedUpFileCount:p,removedLedgerPathCount:g,projectFolderPath:o,appliedSetSlugs:t})}});var aD,vf,Uee,Bee,Gee,Vee,Kee,qee,Jee,Yee,Xee,$c,Cf=l(()=>{"use strict";aD=m(require("node:crypto")),vf=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},Uee=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"item"},Bee=(e,t)=>{let r=Uee(t),o=vf(t);return e==="rule"?`rules/${r}.mdc`:e==="skill"?`skills/${o}/SKILL.md`:e==="command"?`commands/${r}.md`:e==="agent"?`agents/${r}.md`:`instructions/${r}.md`},Gee=(e,t,r)=>{let o=Bee(t,r);return`shared/items/${e}/${o}`},Vee=["rules","skills","commands","instructions","agents"],Kee=(e,t)=>({version:1,hostname:e,updatedAt:t,activeSetSlugs:[],sets:{}}),qee=(e,t)=>[...e.filter(o=>o.id!==t.id),t],Jee=(e,t,r)=>{let o=e.sets[t.slug];return o!==void 0?{...o,name:t.name,version:o.version+1,updatedAt:r}:{slug:t.slug,name:t.name,version:1,updatedAt:r,items:[]}},Yee=e=>aD.default.createHash("sha256").update(e,"utf8").digest("hex"),Xee=e=>({id:e.id,kind:e.kind,title:e.title,path:Gee(e.id,e.kind,e.title),contentSha256:Yee(e.content)}),$c=e=>{let t=new Date().toISOString(),r=e.existingManifest??Kee(e.hostname,t),o=vf(e.bundle.slug),n=Jee(r,{...e.bundle,slug:o},t),s=[`sets/${o}`,...Vee.map(d=>`sets/${o}/${d}`),"shared/items"],{files:i,nextItems:a}=e.bundle.items.reduce((d,u)=>{let g=Xee(u);return{files:[...d.files,{relativePath:g.path,content:u.content}],nextItems:qee(d.nextItems,g)}},{files:[],nextItems:n.items}),c=r.activeSetSlugs.includes(o)?r.activeSetSlugs:[...r.activeSetSlugs,o];return{manifest:{version:1,hostname:e.hostname,updatedAt:t,activeSetSlugs:c,sets:{...r.sets,[o]:{...n,items:a}}},directories:s,files:i}}});var Bo,lD,Lf,Zee,ts,Hk=l(()=>{"use strict";Bo=m(require("node:fs")),lD=m(require("node:os")),Lf=m(require("node:path"));Cf();Zee=e=>{if(!Bo.default.existsSync(e))return null;try{let t=JSON.parse(Bo.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},ts=e=>{try{let t=Zee(e.layout.harnessManifestPath),r=$c({bundle:e.bundle,hostname:lD.default.hostname(),existingManifest:t});Bo.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let o of r.directories)Bo.default.mkdirSync(Lf.default.join(e.layout.harnessRootDir,o),{recursive:!0});for(let o of r.files){let n=Lf.default.join(e.layout.harnessRootDir,o.relativePath);Bo.default.mkdirSync(Lf.default.dirname(n),{recursive:!0}),Bo.default.writeFileSync(n,o.content)}return Bo.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r.manifest,null,2)}
`),{ok:!0,writtenItemCount:r.files.length}}catch(t){return{ok:!1,errorMessage:t instanceof Error?t.message:"Harness install failed."}}}});var Fk,cD=l(()=>{"use strict";Hk();Dk();Fk=e=>{if(e.bundles.length===0)return{ok:!1,errorMessage:"No playbook files are linked to this project."};for(let t of e.bundles){let r=ts({bundle:t,layout:e.layout});if(!r.ok)return{ok:!1,errorMessage:r.errorMessage??"Could not store playbook files on this computer."}}return Fc({layout:e.layout,projectFolderPath:e.projectFolderPath,setSlugs:e.bundles.map(t=>t.slug)})}});var dD,uD=l(()=>{"use strict";dD=["rule","skill","command","instruction","agent"]});var pD,Qee,ete,kr,$k=l(()=>{"use strict";uD();pD=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Qee=e=>typeof e=="string"&&dD.includes(e),ete=e=>{if(!pD(e))return null;let t=e.setSlugs,r=Array.isArray(t)?t.flatMap(o=>typeof o=="string"&&o.trim().length>0?[o.trim()]:[]):[];return typeof e.id!="string"||e.id.trim().length===0||!Qee(e.kind)||typeof e.title!="string"||e.title.trim().length===0||typeof e.content!="string"||r.length===0?null:{id:e.id.trim(),kind:e.kind,title:e.title.trim(),content:e.content,setSlugs:r}},kr=e=>{if(!pD(e))return null;let t=typeof e.name=="string"?e.name.trim():"",r=typeof e.slug=="string"?e.slug.trim():"",o=Array.isArray(e.items)?e.items:[];if(t.length===0||r.length===0)return null;let n=o.flatMap(s=>{let i=ete(s);return i===null?[]:[i]});return{name:t,slug:r,items:n}}});var mD,tte,zk,gD=l(()=>{"use strict";mD=require("node:zlib");$k();tte="x-agent-witch-token",zk=async e=>{let t=`${e.appOrigin.replace(/\/$/,"")}/api/agent-witch/harness-install-artifacts/${encodeURIComponent(e.artifactId)}`;try{let r=await fetch(t,{headers:{[tte]:e.pairingToken}});if(!r.ok){let c=await r.text();return{ok:!1,errorMessage:c.length>0?c.slice(0,500):`Harness artifact download failed (${r.status}).`}}let o=r.headers.get("x-content-sha256")?.trim()??"";if(o.length>0&&o!==e.expectedContentSha256)return{ok:!1,errorMessage:"Harness artifact checksum mismatch."};let n=Buffer.from(await r.arrayBuffer()),s=(0,mD.gunzipSync)(n).toString("utf8"),i=JSON.parse(s),a=kr(i);return a===null?{ok:!1,errorMessage:"Harness artifact payload is not a valid bundle."}:{ok:!0,bundle:a}}catch(r){return{ok:!1,errorMessage:r instanceof Error?r.message:"Harness artifact download failed."}}}});var Bk,Uk,wr,fD=l(()=>{"use strict";Bk=m(require("node:fs")),Uk=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),wr=e=>{if(!Bk.default.existsSync(e.harnessManifestPath))return{manifestUpdatedAt:null,sets:[]};try{let t=JSON.parse(Bk.default.readFileSync(e.harnessManifestPath,"utf8"));if(!Uk(t)||t.version!==1)return{manifestUpdatedAt:null,sets:[]};let r=typeof t.updatedAt=="string"?t.updatedAt:null,o=Uk(t.sets)?t.sets:{},n=Object.entries(o).map(([s,i])=>{if(!Uk(i))return null;let a=typeof i.slug=="string"&&i.slug.length>0?i.slug:s,c=typeof i.name=="string"&&i.name.length>0?i.name:a,d=typeof i.updatedAt=="string"?i.updatedAt:"",u=Array.isArray(i.items)?i.items:[];return{slug:a,name:c,itemCount:u.length,updatedAt:d}}).filter(s=>s!==null).toSorted((s,i)=>s.name.localeCompare(i.name));return{manifestUpdatedAt:r,sets:n}}catch{return{manifestUpdatedAt:null,sets:[]}}}});var xf,yD=l(()=>{"use strict";xf=()=>"~"});var hD,SD,PD=l(()=>{"use strict";hD=require("node:crypto"),SD=e=>`local-${(0,hD.createHash)("sha256").update(e).digest("hex").slice(0,12)}`});var Gk,AD=l(()=>{"use strict";Gk=e=>{let t=e.replaceAll("\\","/");return t.startsWith("rules/")&&t.endsWith(".mdc")?"rule":t.startsWith("commands/")&&t.endsWith(".md")?"command":t.startsWith("agents/")&&t.endsWith(".md")?"agent":t.startsWith("skills/")&&t.endsWith("/SKILL.md")?"skill":t.startsWith("instructions/")&&t.endsWith(".md")?"instruction":null}});var zc,If,Vk=l(()=>{"use strict";zc=m(require("node:path")),If=e=>{let t=zc.default.dirname(e),r=zc.default.basename(t);return r==="agents"?zc.default.basename(zc.default.dirname(t)):r}});var Uc,Jr,bD,rte,ote,nte,Wf,_D,Kk=l(()=>{"use strict";Uc=m(require("node:fs")),Jr=m(require("node:path"));PD();AD();Vk();bD=new Set(["node_modules",".git","dist","build",".next","coverage"]),rte=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");return t.length>0?t:"harness-set"},ote=(e,t)=>{let r=Jr.default.basename(t);if(e==="skill"){let o=t.split(Jr.default.sep),n=o.indexOf("skills");if(n>=0&&o[n+1]!==void 0)return o[n+1]??r}return r.replace(/\.(mdc|md)$/i,"")},nte=e=>{let t=[],r=(n,s)=>{let i;try{i=Uc.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(a.name.startsWith(".")||a.isDirectory()&&bD.has(a.name))continue;let c=Jr.default.join(n,a.name),d=s?Jr.default.join(s,a.name):a.name;if(a.isDirectory()){r(c,d);continue}if(!a.isFile())continue;Gk(d.replaceAll("\\","/"))!==null&&t.push({relativePath:d,absolutePath:c})}};for(let n of["rules","commands","agents","instructions"]){let s=Jr.default.join(e,n);Uc.default.existsSync(s)&&r(s,n)}let o=Jr.default.join(e,"skills");return Uc.default.existsSync(o)&&r(o,"skills"),t},Wf=e=>{let t=nte(e);if(t.length===0)return null;let r=Jr.default.dirname(e),o=If(e),n=rte(o),s=t.map(i=>{let a=Gk(i.relativePath.replaceAll("\\","/"));if(a===null)throw new Error(`Unexpected harness file: ${i.relativePath}`);return{id:SD(i.absolutePath),kind:a,title:ote(a,i.relativePath),sourcePath:i.absolutePath,relativePath:i.relativePath.replaceAll("\\","/"),selected:!0}});return{proposedSlug:n,proposedName:o,sourceRoot:e,repoPath:r,items:s}},_D=function*(e,t,r){let o=function*(n,s){if(r()||s>t)return;let i;try{i=Uc.default.readdirSync(n,{withFileTypes:!0})}catch{return}for(let a of i){if(r())return;if(!a.isDirectory()||bD.has(a.name))continue;let c=Jr.default.join(n,a.name);if(a.name===".cursor"){yield c;continue}yield*o(c,s+1)}};yield*o(e,0)}});var kD,qk,ste,Jk,wD=l(()=>{"use strict";kD=m(require("node:fs")),qk=m(require("node:path"));Kk();Gi();ste=e=>{let t=qr(e.trim());if(t===null)return null;if(qk.default.basename(t)===".cursor")return t;let r=qk.default.join(t,".cursor");try{if(kD.default.statSync(r).isDirectory())return qr(r)}catch{return null}return null},Jk=e=>{let t=ste(e.projectPath);if(t===null)return null;let r=Wf(t);if(r===null)return null;let o=e.reveal??{scanRoots:[],sets:[]},s=[...o.sets.filter(i=>i.sourceRoot!==r.sourceRoot),r].toSorted((i,a)=>i.proposedName.localeCompare(a.proposedName));return{scanRoots:o.scanRoots,sets:s}}});var TD,ite,Of,Yk,ED=l(()=>{"use strict";TD=m(require("node:path"));Kk();Gi();Vk();ite=5,Of=(e,t,r)=>{e.write(`event: ${t}
`),e.write(`data: ${JSON.stringify(r)}

`)},Yk=e=>{let t=qr(e.scanRoot.trim());if(t===null)return Of(e.response,"error",{errorMessage:"Choose a folder under your home directory."}),{scanRoots:[],sets:[]};let r=[],o=!1;for(let s of _D(t,ite,e.shouldAbort)){if(e.shouldAbort()){o=!0;break}let i=qr(s);if(i===null)continue;let a=If(i);Of(e.response,"folder",{cursorDir:i,groupName:a,repoPath:TD.default.dirname(i)});let c=Wf(i);c!==null&&(r.push(c),Of(e.response,"set",{proposedSlug:c.proposedSlug,proposedName:c.proposedName,groupName:a,itemCount:c.items.length,sourceRoot:c.sourceRoot,tree:c.items.map(d=>d.relativePath)}))}e.shouldAbort()&&(o=!0);let n={scanRoots:[t],sets:r.toSorted((s,i)=>s.proposedName.localeCompare(i.proposedName))};return Of(e.response,o?"stopped":"done",{setCount:n.sets.length,stopped:o}),n}});var RD,vD,CD=l(()=>{"use strict";RD=m(require("node:path")),vD=e=>({scanRoots:e.scanRoots,sets:e.sets.map(t=>({...t,items:t.items.map(r=>{let o=typeof r.relativePath=="string"&&r.relativePath.length>0?r.relativePath:RD.default.relative(t.sourceRoot,r.sourcePath).replaceAll("\\","/");return{...r,relativePath:o,selected:r.selected??!0}})}))})});var at,LD,Xk,ate,Zk,Qk,Mf,ew,Bc,xD=l(()=>{"use strict";at=m(require("node:fs")),LD=m(require("node:os")),Xk=m(require("node:path"));Cf();Lk();Gi();CD();ate=e=>{if(!at.default.existsSync(e))return null;try{let t=JSON.parse(at.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.version===1)return t}catch{return null}return null},Zk=e=>{let t=e.hostname??LD.default.hostname(),r=ate(e.layout.harnessManifestPath),o=0,n=new Set,s=[];for(let i of e.sets){let a=i.items.filter(u=>u.include);if(a.length===0)continue;let c=[];for(let u of a){let g=Hc(u.sourcePath);if(g===null)return{ok:!1,errorMessage:`Source file is not readable under your home folder: ${u.sourcePath}`};let f=at.default.readFileSync(g,"utf8");c.push({id:u.id,kind:u.kind,title:u.title,content:f,setSlugs:[i.slug]})}let d=$c({bundle:{name:i.name,slug:i.slug,items:c},hostname:t,existingManifest:r});r=d.manifest;for(let u of d.directories)n.add(u);for(let u of d.files)s.push(u),o+=1}if(r===null||o===0)return{ok:!1,errorMessage:"Select at least one harness item to submit."};try{at.default.mkdirSync(e.layout.harnessRootDir,{recursive:!0});for(let i of n)at.default.mkdirSync(`${e.layout.harnessRootDir}/${i}`,{recursive:!0});for(let i of s){let a=Xk.default.join(e.layout.harnessRootDir,i.relativePath);at.default.mkdirSync(Xk.default.dirname(a),{recursive:!0}),at.default.writeFileSync(a,i.content)}at.default.writeFileSync(e.layout.harnessManifestPath,`${JSON.stringify(r,null,2)}
`);for(let i of e.sets){if(!i.items.some(u=>u.include))continue;let c=vf(i.slug),d=r.sets[c];d!==void 0&&_f({installDir:e.layout.installDir,harnessRootDir:e.layout.harnessRootDir,setSlug:c,setEntry:d})}return{ok:!0,writtenItemCount:o,manifestPath:e.layout.harnessManifestPath}}catch(i){return{ok:!1,errorMessage:i instanceof Error?i.message:"Harness submit failed."}}},Qk="reveal-cache.json",Mf=(e,t)=>{at.default.mkdirSync(e.harnessRootDir,{recursive:!0}),at.default.writeFileSync(`${e.harnessRootDir}/${Qk}`,`${JSON.stringify(t,null,2)}
`)},ew=e=>{let t=`${e.harnessRootDir}/${Qk}`;at.default.existsSync(t)&&at.default.unlinkSync(t)},Bc=e=>{let t=`${e.harnessRootDir}/${Qk}`;if(!at.default.existsSync(t))return null;try{let r=JSON.parse(at.default.readFileSync(t,"utf8"));if(typeof r=="object"&&r!==null&&"sets"in r&&Array.isArray(r.sets))return vD(r)}catch{return null}return null}});var Go=l(()=>{"use strict";Dk();cD();Nk();Hk();gD();$k();Cf();fD();yD();wD();Gi();ED();xD()});var tw,ID=l(()=>{"use strict";Go();Xe();tw=e=>{let t=N(e.profileEmail);return ts({bundle:e.bundle,layout:t})}});var WD=l(()=>{"use strict";ID();Go()});var lte,OD,cte,MD,rs,jf,jD=l(()=>{"use strict";lte=["agentwitch.com","www.agentwitch.com"],OD=/^(localhost|127\.0\.0\.1)(:\d+)?$/i,cte=e=>{let t=e.trim().toLowerCase(),r=t.split(":")[0]??t;return r.startsWith("www."),r},MD=e=>{let t=cte(e);return!!(lte.includes(t)||OD.test(e.trim().toLowerCase()))},rs=e=>{try{let t=new URL(e),r=t.host.trim().toLowerCase();return MD(r)?OD.test(r)?t.protocol==="http:":t.protocol==="https:":!1}catch{return!1}},jf=e=>{let t={"Access-Control-Allow-Methods":"GET, POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Private-Network":"true","Content-Type":"application/json; charset=utf-8"};return e===void 0||e.length===0?{headers:{...t},allowed:!0}:rs(e)?{headers:{...t,"Access-Control-Allow-Origin":e,Vary:"Origin"},allowed:!0}:{headers:{},allowed:!1}}});var Gc=l(()=>{"use strict";jD()});var Yr,Vc=l(()=>{"use strict";Yr=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)});var Kc,ND=l(()=>{"use strict";WD();Gc();Vc();Kc=e=>{if(!Yr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=kr(e.bundle);if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!rs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"bundle.name, bundle.slug, and bundle.items are required."};let n=tw({bundle:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenItemCount:n.writtenItemCount}:{ok:!1,errorMessage:n.errorMessage??"Harness install failed."}}});var rw=l(()=>{"use strict";ND()});var dte,Vi,ow=l(()=>{"use strict";dte=e=>e==="hourly"||e==="daily"||e==="weekdays",Vi=e=>{if(typeof e!="object"||e===null)return null;let t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.name=="string"?t.name.trim():"",n=typeof t.capabilityId=="string"?t.capabilityId.trim():"",s=typeof t.prompt=="string"?t.prompt:"",i=typeof t.schedulePreset=="string"?t.schedulePreset:"",a=typeof t.scheduleTimezone=="string"&&t.scheduleTimezone.length>0?t.scheduleTimezone:"UTC";return r.length===0||o.length===0||n.length===0||s.trim().length===0||!dte(i)?null:{id:r,name:o,capabilityId:n,prompt:s.trim(),schedulePreset:i,scheduleHour:typeof t.scheduleHour=="number"?t.scheduleHour:null,scheduleTimezone:a,enabled:t.enabled!==!1,nextRunAt:typeof t.nextRunAt=="string"&&t.nextRunAt.length>0?t.nextRunAt:null,lastRunAt:typeof t.lastRunAt=="string"&&t.lastRunAt.length>0?t.lastRunAt:null,lastRunStatus:t.lastRunStatus==="ok"||t.lastRunStatus==="failed"?t.lastRunStatus:null,lastError:typeof t.lastError=="string"&&t.lastError.length>0?t.lastError:null}}});var qc,Nf,DD,HD,nw,Yt,Df,Hf,Ff,$f,zf=l(()=>{"use strict";qc=m(require("node:fs")),Nf=m(require("node:path"));ow();DD="automations.json",HD=e=>e.profileEmail!==null?Nf.default.join(e.installDir,"profiles",e.profileEmail,DD):Nf.default.join(e.installDir,DD),nw=()=>({version:1,automations:[]}),Yt=e=>{let t=HD(e);if(!qc.default.existsSync(t))return nw();try{let r=JSON.parse(qc.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.automations)?nw():{version:1,automations:r.automations.flatMap(n=>{let s=Vi(n);return s!==null?[s]:[]})}}catch{return nw()}},Df=(e,t)=>{let r=HD(e);qc.default.mkdirSync(Nf.default.dirname(r),{recursive:!0}),qc.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},Hf=(e,t)=>{Df(e,{version:1,automations:t})},Ff=(e,t)=>{let o=Yt(e).automations.filter(n=>n.id!==t.id);Df(e,{version:1,automations:[...o,t]})},$f=(e,t)=>Yt(e).automations.find(r=>r.id===t)??null});var le,It=l(()=>{"use strict";le="x-agent-witch-token"});var sw=l(()=>{"use strict";xg();Wg()});var V,os,iw,Jc,aw,ute,lw,Yc,ns,cw,Xr=l(()=>{"use strict";It();sw();V=e=>{let t=$e(e.wsUrl);return t===null||e.pairingToken.trim().length===0?null:{appOrigin:t,pairingToken:e.pairingToken.trim()}},os=e=>({[le]:e,"Content-Type":"application/json"}),iw=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/runs/local-self-dispatch`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify(t),signal:AbortSignal.timeout(3e4)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o.run;if(typeof n!="object"||n===null)return null;let s=n,i=typeof s.id=="string"?s.id:"",a=typeof s.prompt=="string"?s.prompt:"",c=typeof s.writerAgent=="string"?s.writerAgent:"claude-cli";return i.length===0||a.length===0?null:{id:i,prompt:a,writerAgent:c}}catch{return null}},Jc=async(e,t,r,o,n)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify({exitCode:r,output:o,...typeof n?.estimateSeconds=="number"?{estimateSeconds:n.estimateSeconds}:{},...typeof n?.actualSeconds=="number"?{actualSeconds:n.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},aw=async(e,t,r)=>{if(typeof r.estimateSeconds!="number"&&typeof r.actualSeconds!="number")return!1;try{return(await fetch(`${e.appOrigin}/api/agent-witch/runs/${encodeURIComponent(t)}/complete`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify({...typeof r.estimateSeconds=="number"?{estimateSeconds:r.estimateSeconds}:{},...typeof r.actualSeconds=="number"?{actualSeconds:r.actualSeconds}:{}}),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}},ute=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(t.ok!==!0||!Array.isArray(t.projects))return null;let r=[];for(let o of t.projects){if(typeof o!="object"||o===null)continue;let n=o,s=typeof n.id=="string"?n.id.trim():"",i=typeof n.name=="string"?n.name.trim():"",a=typeof n.folderPath=="string"?n.folderPath.trim():"";s.length===0||i.length===0||a.length===0||r.push({id:s,name:i,folderPath:a})}return r},lw=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify({name:t.name,folderPath:t.folderPath}),signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null)return null;let n=o;if(n.ok!==!0||typeof n.project!="object")return null;let s=n.project,i=typeof s.id=="string"?s.id.trim():"",a=typeof s.name=="string"?s.name.trim():"",c=typeof s.folderPath=="string"?s.folderPath.trim():"";return i.length===0||a.length===0||c.length===0?null:{id:i,name:a,folderPath:c}}catch{return null}},Yc=async e=>{try{let t=await fetch(`${e.appOrigin}/api/agent-witch/projects`,{method:"GET",headers:os(e.pairingToken),signal:AbortSignal.timeout(15e3)});if(!t.ok)return null;let r=await t.json();return ute(r)}catch{return null}},ns=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/components`,{method:"PUT",headers:os(e.pairingToken),body:JSON.stringify({harnessSetSlugs:[...r]}),signal:AbortSignal.timeout(3e4)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},cw=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/automations/${encodeURIComponent(t)}/local-run`,{method:"POST",headers:os(e.pairingToken),body:JSON.stringify(r),signal:AbortSignal.timeout(3e4)})).ok}catch{return!1}}});var ss,FD,$D,pte,dw,zD,uw=l(()=>{"use strict";ss=m(require("node:fs")),FD=m(require("node:path")),$D=e=>FD.default.join(e.harnessRootDir,"projects-registry.json"),pte=e=>typeof e=="object"&&e!==null&&e.version===1&&Array.isArray(e.projects),dw=e=>{let t=$D(e);if(!ss.default.existsSync(t))return[];try{let r=JSON.parse(ss.default.readFileSync(t,"utf8"));return pte(r)?r.projects.filter(o=>typeof o.id=="string"&&typeof o.name=="string"&&typeof o.projectFolderPath=="string").map(o=>({id:o.id,name:o.name,projectFolderPath:o.projectFolderPath,addedAt:typeof o.addedAt=="string"?o.addedAt:new Date().toISOString(),...typeof o.cloudProjectId=="string"&&o.cloudProjectId.length>0?{cloudProjectId:o.cloudProjectId}:{}})):[]}catch{return[]}},zD=e=>{let t=$D(e);if(!ss.default.existsSync(t))return;let r=`${t}.migrated`;if(ss.default.existsSync(r)){ss.default.unlinkSync(t);return}ss.default.renameSync(t,r)}});var UD,mte,gte,BD,GD=l(()=>{"use strict";Uo();UD=e=>Qe(e),mte=e=>new Set(e.map(t=>UD(t.folderPath))),gte=e=>new Set(e.map(t=>t.id)),BD=(e,t)=>{let r=mte(t),o=gte(t),n=[],s=new Set;for(let i of e){let a=UD(i.projectFolderPath);a.length!==0&&(r.has(a)||s.has(a)||i.cloudProjectId!==void 0&&o.has(i.cloudProjectId)||(s.add(a),n.push({name:i.name.trim(),folderPath:i.projectFolderPath.trim()})))}return n}});var pw,mw=l(()=>{"use strict";Xr();uw();GD();pw=async(e,t)=>{let r=dw(e);if(r.length===0)return{migratedCount:0,skippedCount:0,failedCount:0};let o=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(o===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let n=await Yc(o);if(n===null)return{migratedCount:0,skippedCount:r.length,failedCount:0};let s=BD(r,n),i=r.length-s.length,a=0,c=0;for(let d of s)await lw(o,{name:d.name,folderPath:d.folderPath})?a+=1:c+=1;return c===0&&zD(e),{migratedCount:a,skippedCount:i,failedCount:c}}});var gw,Xt,Ki=l(()=>{"use strict";gw=e=>e.map(t=>({id:t.id,name:t.name,projectFolderPath:t.folderPath})),Xt=(e,t)=>e.find(r=>r.id===t)??null});var Tr,qi=l(()=>{"use strict";Xr();mw();Ki();Tr=async(e,t)=>{t!==void 0&&await pw(t,e);let r=V({wsUrl:e.wsUrl,pairingToken:e.pairingToken});if(r===null)return{ok:!1,projects:[],message:"Could not load projects \u2014 check pairing token and wsUrl in config.json."};let o=await Yc(r);if(o===null)return{ok:!1,projects:[],message:"Could not reach AgentWitch Cloud. Check the computer connection and try again."};let n=gw(o);return{ok:!0,projects:n,message:n.length===0?"No projects yet \u2014 create one in AgentWitch Cloud, then refresh this page.":`Loaded ${n.length} project${n.length===1?"":"s"} from AgentWitch Cloud.`}}});var VD=l(()=>{"use strict"});var fw,fte,Uf,yw=l(()=>{"use strict";fw=m(require("node:fs"));es();fte=e=>{let t=xt(e);if(!fw.default.existsSync(t.metaFilePath))return{projectId:null,projectFolderPath:t.projectFolderPath};try{let r=JSON.parse(fw.default.readFileSync(t.metaFilePath,"utf8"));if(typeof r!="object"||r===null)return{projectId:null,projectFolderPath:t.projectFolderPath};let o=r;return{projectId:typeof o.projectId=="string"&&o.projectId.trim().length>0?o.projectId.trim():null,projectFolderPath:t.projectFolderPath}}catch{return{projectId:null,projectFolderPath:t.projectFolderPath}}},Uf=fte});var hw,Sw,KD=l(()=>{"use strict";hw=m(require("node:path"));Uo();yw();Sw=e=>{let t=hw.default.resolve(Qe(e)),r=o=>{let{projectId:n}=Uf(o);if(n!==null)return n;let s=hw.default.dirname(o);return s===o?null:r(s)};return r(t)}});var yte,hte,Bf,Pw=l(()=>{"use strict";yte="Default",hte=e=>e.trim().toLowerCase()===yte.toLowerCase(),Bf=hte});var Gf,Vf,Kf=l(()=>{"use strict";Gf={save:"/project/pitfalls/save",retire:"/project/pitfalls/retire",restore:"/project/pitfalls/restore"},Vf=e=>{let t=Object.entries(Gf).find(([,r])=>r===e);return t===void 0?null:t[0]}});var qD,he,YD,Ste,Aw,bw,JD,Pte,Ate,Xc,_w,bte,_te,kte,XD,ZD=l(()=>{"use strict";Bt();Kf();qD="new",he=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),YD={block:"Must fix",warn:"Warning",info:"Note"},Ste={seed:"Built-in",project:"This project",retired:"Retired"},Aw=6e4,bw=60*Aw,JD=24*bw,Pte=(e,t)=>{if(e===null)return"Never hit";let r=new Date(e).getTime();if(Number.isNaN(r))return"Never hit";let o=Math.max(0,t-r);if(o<Aw)return"Last hit just now";if(o<bw)return`Last hit ${Math.floor(o/Aw)} min ago`;if(o<JD)return`Last hit ${Math.floor(o/bw)}h ago`;let n=Math.floor(o/JD);return n<30?`Last hit ${n} ${n===1?"day":"days"} ago`:`Last hit ${new Date(r).toISOString().slice(0,10)}`},Ate=e=>{if(e===null)return"Not updated yet";let t=new Date(e).getTime();return Number.isNaN(t)?"Not updated yet":`Updated ${new Date(t).toISOString().slice(0,10)}`},Xc=(e,t)=>`/project?${new URLSearchParams({id:e,tab:"pitfalls",...t}).toString()}`,_w=e=>e?{retired:"1"}:{},bte=e=>{let{item:t}=e,r=t?.severity??"warn",o=t?.check.kind==="command"?t.check.value:"",n=t===null?"Add pitfall":"Edit pitfall",s=t?.source==="seed"?'<p class="muted">This is a built-in pitfall. Your changes apply to this project only.</p>':"",i=a=>`<option value="${a}"${r===a?" selected":""}>${YD[a]}</option>`;return`<form method="POST" action="${e.postPaths.save}" class="stack pitfall-form" aria-label="${n}" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
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
        <a class="btn btn-secondary" href="${he(Xc(e.projectId,_w(e.showRetired)))}">Cancel</a>
      </div>
    </form>`},_te=e=>{let{item:t,projectId:r,showRetired:o}=e,n=t.source==="retired",s=`<input type="hidden" name="projectId" value="${he(r)}" />
            <input type="hidden" name="pitfallId" value="${he(t.id)}" />
            ${o?'<input type="hidden" name="showRetired" value="1" />':""}`,i=n?`<form method="POST" action="${e.postPaths.restore}" class="inline-form" onsubmit="this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-secondary btn-compact" type="submit">Bring back</button>
          </form>`:`<a class="btn btn-secondary btn-compact" href="${he(Xc(r,{..._w(o),edit:t.id}))}">Edit</a>
          <form method="POST" action="${e.postPaths.retire}" class="inline-form" onsubmit="if(!confirm('Retire this pitfall? You can bring it back later.'))return false;this.querySelectorAll('button').forEach(function(b){b.disabled=true});">
            ${s}
            <button class="btn btn-danger btn-compact" type="submit">Retire</button>
          </form>`,a=t.keywords.length>0?`<p class="muted">Triggers: ${t.keywords.map(c=>he(c)).join(", ")}</p>`:"";return`<li class="harness-installed-set pitfall-row${n?" pitfall-row-retired":""}" data-pitfall-id="${he(t.id)}">
        <p><strong>${he(t.symptom)}</strong> <span class="muted">\xB7 ${YD[t.severity]} \xB7 ${Ste[t.source]}</span></p>
        <p>Fix: ${he(t.avoidance)}</p>
        ${a}
        <p class="muted">${he(Pte(t.lastSeenAt,e.nowMs))}</p>
        <p class="muted">${he(Ate(t.updatedAt))}</p>
        <div class="actions">${i}</div>
      </li>`},kte=e=>{let t=e.postPaths??Gf;if(e.list===null||!e.list.ok)return'<p class="empty">Could not load pitfalls. Check this computer on Status, then reload.</p>';let r=e.nowMs??Date.now(),o=e.list.items,n=Oo(o),s=n>=64,i=e.showRetired?o:o.filter(f=>f.source!=="retired"),a=e.editId===null?null:e.editId===qD?s?null:{item:null}:(()=>{let f=o.find(y=>y.id===e.editId&&y.source!=="retired");return f===void 0?null:{item:f}})(),c=a===null?"":bte({projectId:e.projectId,item:a.item,showRetired:e.showRetired,postPaths:t}),d=s?`<p class="muted">${64} of ${64} active. Retire one to add another.</p>`:`<a class="btn btn-primary" href="${he(Xc(e.projectId,{..._w(e.showRetired),edit:qD}))}">Add pitfall</a>`,u=e.showRetired?`<a class="btn btn-secondary" href="${he(Xc(e.projectId,{}))}">Hide retired</a>`:`<a class="btn btn-secondary" href="${he(Xc(e.projectId,{retired:"1"}))}">Show retired</a>`,g=i.length===0?'<p class="empty">No pitfalls for this project. Add one when you spot a mistake that keeps coming back.</p>':`<ul class="harness-installed-set-list">${i.map(f=>_te({projectId:e.projectId,item:f,showRetired:e.showRetired,nowMs:r,postPaths:t})).join("")}</ul>`;return`<section class="stack">
      <p class="lede">Pitfalls are known traps in this project. Each one says what goes wrong and how to avoid it.</p>
      <p class="muted">${n} of ${64} active</p>
      <div class="actions">${a===null?d:""}${u}</div>
      ${c}
      ${g}
    </section>`},XD=kte});var re,QD,wte,Tte,Ete,Rte,vte,Vo,qf=l(()=>{"use strict";Pw();Bt();ZD();re=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),QD=(e,t)=>e.length===0?`<p class="empty">${re(t)}</p>`:`<ul class="harness-installed-set-list">${e.map(r=>`<li class="harness-installed-set">
        <p><strong>${re(r.name)}</strong>${r.versionLabel?` <span class="muted mono">v${re(r.versionLabel)}</span>`:""}</p>
        <p class="muted">Bound in AgentWitch Cloud \u2014 materialize from the Playbooks tab or pull into repo (coming soon).</p>
      </li>`).join("")}</ul>`,wte=()=>`<div class="stack">
        <p class="field-label">Installed</p>
        <p class="empty" id="harness-empty">No playbook on this computer yet. Install from the Harness page, then return here to write it into this repo.</p>
        <div class="actions">
          <a class="btn btn-primary" href="/harness" aria-describedby="harness-empty">Pull into repo</a>
        </div>
      </div>`,Tte=e=>{let t=e.alreadyInRepo?"This repo already has playbook files in <code>.cursor</code> (tracked in <code>.agent-witch/materialization.json</code>). Pull again only if you want to refresh them from AgentWitch Cloud.":"This project\u2019s playbook is linked in AgentWitch Cloud. Pull writes those files into this repo\u2019s <code>.cursor</code> tree.",r=e.alreadyInRepo?"Refresh in repo\u2026":"Pull into repo",o=e.alreadyInRepo?"btn btn-secondary":"btn btn-primary";return`<form method="POST" action="/projects/pull-bound-harness" class="stack">
        <input type="hidden" name="projectId" value="${re(e.project.id)}" />
        <p class="lede">${t}</p>
        <div class="actions">
          <button class="${o}" type="submit">${r}</button>
        </div>
      </form>`},Ete=e=>{let t=`<ul class="harness-installed-set-list">${e.linkedSetSlugs.map(r=>`<li class="harness-installed-set">
        <p><strong>${re(r)}</strong> <span class="muted">already in this repo</span></p>
        <form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
          <input type="hidden" name="projectId" value="${re(e.project.id)}" />
          <input type="hidden" name="setSlug" value="${re(r)}" />
          <button class="btn btn-danger btn-compact" type="submit">Remove from repo</button>
        </form>
      </li>`).join("")}</ul>`;return e.boundHarnessCount>0?`<div class="stack">
        <p class="field-label">In this repo</p>
        <p class="lede">This project\u2019s playbook is already in this repo\u2019s <code>.cursor</code> tree. Nothing is installed in the profile harness on this computer \u2014 refresh from AgentWitch Cloud only if you need an update.</p>
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
      </div>`},Rte=e=>{let t=new Set(e.linkedSetSlugs);if(e.installed.sets.length===0)return t.size>0?Ete({project:e.project,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.boundHarnessCount}):e.boundHarnessCount>0?Tte({project:e.project,alreadyInRepo:!1}):wte();let o=e.installed.sets.filter(c=>t.has(c.slug)).length>0,n=o?"These playbooks are already in this repo\u2019s <code>.cursor</code> tree (see <code>.agent-witch/materialization.json</code>). Refresh only if you need an update. Use Remove from repo on a playbook to delete only the files that ledger recorded.":"Check the playbooks to write into this repo&apos;s <code>.cursor</code> tree, then pull.",s=o?"Refresh in repo\u2026":"Pull into repo",i=o?"btn btn-secondary":"btn btn-primary",a=`<ul class="harness-installed-set-list">${e.installed.sets.map(c=>{let d=t.has(c.slug),u=d?`<form method="POST" action="/projects/remove-harness-set" class="inline-form" onsubmit="return confirm('Remove this playbook from the repo? Files stay installed on this computer.');">
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
      </div>`},vte=e=>{if(e.candidateCount===0)return'<p class="empty">No lessons ready to promote. Successful runs distill candidates here.</p>';let t=e.candidateCount===1?"1 lesson ready to promote":`${e.candidateCount} lessons ready to promote`;return`<section class="stack">
      <p class="lede">${re(t)} from recent runs. Review in AgentWitch Cloud or promote below.</p>
      <form method="POST" action="/project/knowledge/promote-all" class="actions">
        <input type="hidden" name="projectId" value="${re(e.projectId)}" />
        <button class="btn btn-secondary" type="submit">Mark all as promoted (metadata)</button>
      </form>
      <p class="muted">Full catalog publish still happens in Console after you edit the lesson body.</p>
    </section>`},Vo=e=>{let t=e.flashError?`<div class="alert-error">${re(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${re(e.flashMessage)}</div>`:"",r=e.composition?.counts??{harness:e.linkedSetSlugs.length,workflow:0,agent:0},o=(f,y)=>`<a class="project-tab${e.activeTab===f?" project-tab-active":""}" href="/project?id=${encodeURIComponent(e.project.id)}&tab=${f}">${re(y)}</a>`,n=e.composition?.items.filter(f=>f.kind==="workflow")??[],s=e.composition?.items.filter(f=>f.kind==="agent")??[],i=(()=>{switch(e.activeTab){case"harness":return Rte({project:e.project,installed:e.installed,linkedSetSlugs:e.linkedSetSlugs,boundHarnessCount:e.composition?.counts.harness??0});case"workflows":return QD(n,"No workflows installed for this project yet.");case"agents":return QD(s,"No agents installed for this project yet.");case"knowledge":return vte({projectId:e.project.id,candidateCount:e.knowledgeCandidateCount});case"pitfalls":return XD({projectId:e.project.id,list:e.pitfalls??null,showRetired:e.pitfallsShowRetired??!1,editId:e.pitfallsEditId??null});default:return e.activeTab}})(),a=e.pitfalls!==void 0&&e.pitfalls!==null&&e.pitfalls.ok?`Pitfalls (${Oo(e.pitfalls.items)})`:"Pitfalls",c=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(e.project.id)}`,d=`${c}?rename=1`,u=`<div class="actions project-cloud-actions">
      <a class="btn btn-secondary" href="${re(c)}" target="_blank" rel="noopener noreferrer">Open in AgentWitch Cloud</a>
      <a class="btn btn-secondary btn-compact" href="${re(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>
    </div>`,g=Bf(e.project.name)?"":`<section class="danger-zone stack">
        <p class="field-label">Danger zone</p>
        <p class="muted">Removes this project from AgentWitch Cloud only. The folder on this computer is not deleted.</p>
        <form method="POST" action="/projects/delete" class="actions" onsubmit="return confirm('Delete this project from AgentWitch Cloud? Your repo folder on this computer will stay.');">
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
    </section>${g}`}});var Cte,Lte,eH,tH=l(()=>{"use strict";Go();It();Cte=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Lte=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/bound-harness`,{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();return!Cte(o)||o.ok!==!0||!Array.isArray(o.bundles)?null:o.bundles.flatMap(n=>{let s=kr(n);return s===null?[]:[s]})}catch{return null}},eH=Lte});var rH,kw,oH=l(()=>{"use strict";ee();Go();qf();qi();tH();Ki();Nc();Xr();At();rH=e=>({kind:"page",title:e.project.name,body:Vo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:wr(e.layout),linkedSetSlugs:_r(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),kw=async e=>{let t=new URLSearchParams(e.rawBody).get("projectId")?.trim()??"",r=$();if(r===null)return{kind:"not_found"};let o=await Tr(r,e.layout),n=Xt(o.projects,t);if(n===null)return{kind:"not_found"};let s=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),i=s?.appOrigin??Pt,a=s===null?null:await eH(s,n.id);if(a===null)return rH({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:"Could not load the linked playbook from AgentWitch Cloud."});let c=Fk({layout:e.layout,projectFolderPath:n.projectFolderPath,bundles:a});if(!c.ok)return rH({layout:e.layout,cloudAppOrigin:i,project:n,errorMessage:c.errorMessage});let d=s===null?!1:await ns(s,n.id,c.appliedSetSlugs),u=new URLSearchParams({linked:"1",files:String(c.writtenFileCount),bindingsSynced:d?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(n.id)}&${u.toString()}`}}});var nH,ww,sH=l(()=>{"use strict";ee();Go();At();Xr();qf();mf();Uo();qi();Ki();Nc();lf();hk();uf();bk();nH=e=>({kind:"page",title:e.project.name,body:Vo({project:e.project,cloudAppOrigin:e.cloudAppOrigin,installed:wr(e.layout),linkedSetSlugs:_r(e.project.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:e.errorMessage})}),ww=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=t.get("setSlug")?.trim()??"",n=$();if(n===null)return{kind:"not_found"};let s=await Tr(n,e.layout),i=Xt(s.projects,r);if(i===null)return{kind:"not_found"};let a=V({wsUrl:n.wsUrl,pairingToken:n.pairingToken}),c=a?.appOrigin??Pt;if(o.length===0)return nH({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:"Choose a harness set to remove from this repo."});let d=Qe(i.projectFolderPath),u=it({projectFolderPath:d}),{ledgerFilePath:g}=Ui(u.layout),f=zi(g),y=Ok(f);if(!y.includes(o))return nH({layout:e.layout,cloudAppOrigin:c,project:i,errorMessage:`Harness set "${o}" is not materialized in this repo.`});let P=y.filter(b=>b!==o),h=df({repoRoot:u.layout.resolvedProjectFolderPath,setSlugs:[o],ledger:f});Mc(g,h.ledger);let p=a===null?!1:await ns(a,i.id,P),S=new URLSearchParams({linked:"1",removed:o,files:String(h.summary.removedPaths.length),bindingsSynced:p?"1":"0"});return{kind:"redirect",location:`/project?id=${encodeURIComponent(i.id)}&${S.toString()}`}}});var xte,Ite,iH,Wte,Ote,Zc,Tw=l(()=>{"use strict";Bt();It();xte=1e4,Ite=15e3,iH=(e,t,r)=>{let o=`${e.replace(/\/$/,"")}/api/agent-witch/projects/${encodeURIComponent(t)}/pitfalls`;return r===void 0?o:`${o}/${encodeURIComponent(r)}`},Wte=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return t.errorMessage==="limit_exceeded"||t.code==="limit_exceeded"},Ote=(e,t=fetch)=>({listPitfalls:async(r,o)=>{try{let n=new URL(iH(e.appOrigin,r));n.searchParams.set("includeRetired",o.includeRetired?"1":"0");let s=await t(n.toString(),{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(xte)});if(!s.ok)return{ok:!1,reason:"unavailable"};let i=qb(await s.json());return i===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:i.items,syncedAt:i.syncedAt}}catch{return{ok:!1,reason:"unavailable"}}},upsertPitfall:async(r,o)=>{try{let n=await t(iH(e.appOrigin,r),{method:"PUT",headers:{[le]:e.pairingToken,"content-type":"application/json"},body:JSON.stringify(o),signal:AbortSignal.timeout(Ite)});if(n.ok)return{ok:!0};if(n.status===409){let s=await n.json().catch(()=>null);return{ok:!1,reason:Wte(s)?"active_limit":"rejected"}}return n.status===400?{ok:!1,reason:"rejected"}:{ok:!1,reason:n.status>=500?"unavailable":"rejected"}}catch{return{ok:!1,reason:"unavailable"}}}}),Zc=Ote});var Ew,aH,Mte,jte,Nte,Dte,lH,cH=l(()=>{"use strict";Bt();Ew=e=>e.replace(/\s+/g," ").trim(),aH=(e,t,r)=>{let o=new Set,n=[];for(let s of e.split(/[,\n]/)){let i=Ew(s).slice(0,r).toLowerCase();i.length>0&&!o.has(i)&&(o.add(i),n.push(i))}return n.slice(0,t)},Mte=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40).replace(/-+$/g,""),jte=(e,t)=>{let r=Mte(e);return`project-${r.length>0?r:"pitfall"}-${t}`.slice(0,ke.id).replace(/-+$/g,"")},Nte=e=>e==="block"||e==="info"?e:"warn",Dte=e=>{let{form:t}=e,r=Ew(t.get("symptom")??""),o=(t.get("avoidance")??"").trim(),n=(t.get("cause")??"").trim(),s=Ew(t.get("checkCommand")??"");if(r.length===0||o.length===0||n.length===0||r.length>ke.symptom||o.length>ke.avoidance||n.length>ke.cause||s.length>ke.checkValue)return{ok:!1};let i=(t.get("pitfallId")??"").trim(),a=i.length>0?i:jte(r,e.randomSuffix());return{ok:!0,pitfall:{id:a,symptom:r,cause:n,avoidance:o,check:s.length>0?{kind:"command",value:s}:{kind:"id",value:a},keywords:aH(t.get("keywords")??"",ke.keywords,ke.keyword),tags:aH(t.get("tags")??"",ke.tags,ke.tag),source:"project",severity:Nte(t.get("severity"))}}},lH=Dte});var uH,Hte,Zr,dH,Jf,Fte,$te,pH,mH=l(()=>{"use strict";uH=require("node:crypto");Bt();cH();Kf();Hte=()=>(0,uH.randomBytes)(3).toString("hex"),Zr=(e,t,r={})=>{let o=new URLSearchParams({tab:"pitfalls",...r,pitfall:t});return`/project?id=${encodeURIComponent(e)}&${o.toString()}`},dH=(e,t)=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:t}),Jf=new Map,Fte=async(e,t)=>{let r=Jf.get(e)??Promise.resolve(),o,n=new Promise(i=>{o=i}),s=r.catch(()=>{}).then(()=>n);Jf.set(e,s),await r.catch(()=>{});try{return await t()}finally{o(),Jf.get(e)===s&&Jf.delete(e)}},$te=async e=>{let t=(e.form.get("pitfallId")??"").trim(),r=`${e.projectId}:${t||"__new__"}`;return Fte(r,async()=>{let{projectId:o,store:n}=e,s=e.form.get("showRetired")==="1"?{retired:"1"}:{};if(n===null)return Zr(o,"unavailable",s);let i=await n.listPitfalls(o,{includeRetired:!0});if(!i.ok)return Zr(o,"unavailable",s);if(e.action==="save"){let d=lH({form:e.form,randomSuffix:e.randomSuffix??Hte});if(!d.ok)return Zr(o,"invalid",s);let u=i.items.find(y=>y.id===d.pitfall.id);if((u===void 0||u.source==="retired")&&Oo(i.items)>=64)return Zr(o,"limit",s);let f=await n.upsertPitfall(o,d.pitfall);return Zr(o,f.ok?"saved":f.reason==="active_limit"?"limit":f.reason,s)}let a=i.items.find(d=>d.id===t);if(a===void 0)return Zr(o,"missing",s);if(e.action==="restore"){if(a.source==="retired"&&Oo(i.items)>=64)return Zr(o,"limit",s);let d=await n.upsertPitfall(o,dH(a,"project"));return Zr(o,d.ok?"restored":d.reason==="active_limit"?"limit":d.reason,s)}let c=await n.upsertPitfall(o,dH(a,"retired"));return Zr(o,c.ok?"retired":c.reason==="active_limit"?"limit":c.reason,s)})},pH=$te});var Yf,gH,fH,Rw=l(()=>{"use strict";Yf=new Map,gH=async e=>{let t=e.nowMs??Date.now(),r=e.ttlMs??3e4,o=Yf.get(e.projectId);if(o!==void 0&&o.includeRetired===e.includeRetired&&t-o.fetchedAtMs<r)return o.result;let n=await e.store.listPitfalls(e.projectId,{includeRetired:e.includeRetired});return n.ok&&Yf.set(e.projectId,{result:n,includeRetired:e.includeRetired,fetchedAtMs:t}),n},fH=e=>{if(e===void 0){Yf.clear();return}Yf.delete(e)}});var vw,yH=l(()=>{"use strict";ee();Xr();qi();Ki();Tw();mH();Rw();vw=async e=>{let t=new URLSearchParams(e.rawBody),r=t.get("projectId")?.trim()??"",o=$();if(o===null)return{kind:"not_found"};let n=await Tr(o,e.layout),s=Xt(n.projects,r);if(s===null)return{kind:"not_found"};let i=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken}),a=e.createStore??Zc,c=i===null?null:a(i),d=await pH({action:e.action,form:t,projectId:s.id,store:c});return fH(s.id),{kind:"redirect",location:d}}});var zte,Cw,hH=l(()=>{"use strict";zte=e=>e.exitCode!==void 0&&e.exitCode!==null&&e.exitCode!==0?!1:e.output.trim().length>0,Cw=zte});var SH=l(()=>{"use strict"});var PH=l(()=>{"use strict"});var AH=l(()=>{"use strict";SH();PH()});var Ute,Ko,bH=l(()=>{"use strict";Ute=["GIT_DIR","GIT_WORK_TREE","GIT_INDEX_FILE","GIT_OBJECT_DIRECTORY","GIT_ALTERNATE_OBJECT_DIRECTORIES","GIT_PREFIX","GIT_EXEC_PATH","GIT_QUARANTINE_PATH","GIT_REFLOG_ACTION","GIT_TEMPLATE_DIR","GIT_CEILING_DIRECTORIES","GIT_COMMON_DIR"],Ko=(e=process.env)=>{let t={...e};for(let r of Ute)delete t[r];return t}});var _H=l(()=>{"use strict";bH()});var Lw,kH=l(()=>{"use strict";Lw={brand50:"#eaf0fe",brand100:"#d6e1fc",brand600:"#1a44be",brand700:"#15359c",gray50:"#f9fafb",gray100:"#f2f4f7",gray200:"#e4e7ec",gray400:"#98a2b3",gray500:"#667085",gray600:"#475467",gray700:"#344054",gray900:"#101828",gray950:"#0c111d",white:"#ffffff",success50:"#ecfdf3",success700:"#027a48",warning50:"#fffbeb",warning900:"#78350f",error50:"#fef3f2",error700:"#b42318"}});var xw=l(()=>{"use strict";kH()});var Xf,Iw=l(()=>{"use strict";Xf={AGENT_REGISTER:"agent.register",AGENT_HEARTBEAT:"agent.heartbeat",RUN_HEARTBEAT:"run.heartbeat",COMMAND_CLAUDE_RUN:"command.claude.run",COMMAND_CLAUDE_RESULT:"command.claude.result",COMMAND_CLAUDE_INPUT_REQUIRED:"command.claude.input_required",COMMAND_CLAUDE_INPUT_RESPOND:"command.claude.input_respond",COMMAND_CLAUDE_STOP:"command.claude.stop",COMMAND_WRITER_SESSION_END:"command.writer.session.end",COMMAND_WRITER_SESSION_START:"command.writer.session.start",COMMAND_WRITER_SESSION_READY:"command.writer.session.ready",COMMAND_WRITER_SESSION_CHUNK:"command.writer.session.chunk",DISPATCH_APPROVAL_REQUIRED:"dispatch.approval.required",DISPATCH_APPROVAL_RESPOND:"dispatch.approval.respond",DISPATCH_APPROVAL_RESULT:"dispatch.approval.result",WORKFLOW_HUMAN_STEP_REQUIRED:"workflow.human_step.required",WORKFLOW_STEP_FAILED:"workflow.step.failed",HARNESS_REQUEST:"harness.request",HARNESS_REQUEST_ACK:"harness.request.ack",HARNESS_REQUEST_RESULT:"harness.request.result",HARNESS_MANIFEST_REPORT:"harness.manifest.report",HARNESS_MANIFEST_REQUEST:"harness.manifest.request",HARNESS_BORROW_EXPORT:"harness.borrow.export",HARNESS_EXPORT_REQUEST:"harness.export.request",HARNESS_EXPORT_RESULT:"harness.export.result",AGENT_PAIR:"agent.pair",AGENT_RUN_RECORD:"agent.run.record",TERMINAL_STREAM_START:"terminal.stream.start",TERMINAL_STREAM_ACCEPTED:"terminal.stream.accepted",TERMINAL_STREAM_REJECTED:"terminal.stream.rejected",TERMINAL_STREAM_CHUNK:"terminal.stream.chunk",TERMINAL_STREAM_END:"terminal.stream.end",SHELL_SESSION_OPEN:"shell.session.open",SHELL_SESSION_OPENED:"shell.session.opened",SHELL_SESSION_CLOSE:"shell.session.close",SHELL_SESSION_CLOSED:"shell.session.closed",SHELL_SUBSCRIBE:"shell.subscribe",SHELL_DATA:"shell.data",SHELL_INPUT:"shell.input",SHELL_RESIZE:"shell.resize",DASHBOARD_TERMINAL_SUBSCRIBE:"dashboard.terminal.subscribe",DASHBOARD_AGENT_RUN_LIST:"dashboard.agentRun.list",DASHBOARD_AGENT_RUN_LIST_RESULT:"dashboard.agentRun.list.result",DASHBOARD_AGENT_RUN_GET:"dashboard.agentRun.get",DASHBOARD_AGENT_RUN_GET_RESULT:"dashboard.agentRun.get.result",AGENT_AGENT_RUN_LIST:"agent.agentRun.list",AGENT_AGENT_RUN_GET:"agent.agentRun.get",SYSTEM_ACK:"system.ack",SYSTEM_ERROR:"system.error",DEVICE_AUTH_ATTESTATION:"device.auth.attestation",DEVICE_HEALTH_LOG:"device.health.log",DEVICE_RESTART:"device.restart",DEVICE_RESTART_ACK:"device.restart.ack",INSTALL_BUNDLE_UPDATE:"install.bundle.update",ACCOUNT_LINK:"account.link",AUTOMATIONS_SYNC:"automations.sync",AUTOMATIONS_RUN:"automations.run",WRITER_ENSURE:"writer.ensure",WRITER_STATUS:"writer.status",PROJECT_MESSAGE_HISTORY:"project.message.history"}});var Zf=l(()=>{"use strict";AH();_H();At();xw();Iw()});var wH,TH,Bte,Qf,ey,EH=l(()=>{"use strict";wH=require("node:child_process"),TH=require("node:util");Zf();Bte=(0,TH.promisify)(wH.execFile),Qf=async(e,t)=>{try{let{stdout:r}=await Bte("git",t,{cwd:e,env:Ko(),maxBuffer:1048576});return r.trim()}catch{return null}},ey=async e=>{let t=await Qf(e,["rev-parse","--git-dir"]);if(t===null||t.length===0)return{isGitRepo:!1,branch:null,porcelainLineCount:0,shortstat:null};let r=await Qf(e,["rev-parse","--abbrev-ref","HEAD"]),o=await Qf(e,["status","--porcelain"]),n=await Qf(e,["diff","--shortstat","HEAD"]),s=o===null||o.length===0?0:o.split(`
`).filter(i=>i.trim().length>0).length;return{isGitRepo:!0,branch:r,porcelainLineCount:s,shortstat:n===null||n.length===0?null:n}}});var Ww,RH=l(()=>{"use strict";Ww=e=>{if(!e.before.isGitRepo&&!e.after.isGitRepo)return"Git: not a repository (no worktree verdict).";if(!e.before.isGitRepo||!e.after.isGitRepo)return"Git: repository state changed during the run (unexpected).";let t=e.before.branch??"unknown",r=e.after.branch??"unknown",o=t===r?`branch ${r}`:`branch ${t} \u2192 ${r}`,n=e.before.porcelainLineCount>0?`${e.before.porcelainLineCount} dirty path(s) before run`:"clean before run",s=e.after.porcelainLineCount>0?`${e.after.porcelainLineCount} dirty path(s) after run`:"clean after run",i=[];return e.after.shortstat!==null?i.push(`diff vs HEAD: ${e.after.shortstat}`):i.push("diff vs HEAD: (no tracked changes)"),`Git verdict: ${o}; ${n}; ${s}; ${i.join("; ")}.`}});var Gte,Ow,vH=l(()=>{"use strict";Gte=e=>{let t=e.prompt.trim().split(`
`)[0]?.trim()??"",r=e.output.trim().split(`
`)[0]?.trim()??"",o=r.length>0?r:t.length>0?t:"Lesson from completed run";return o.length<=280?o:`${o.slice(0,277)}\u2026`},Ow=Gte});var Vte,Mw,CH=l(()=>{"use strict";It();Vte=async(e,t,r)=>{try{let o=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge`,{method:"POST",headers:{"Content-Type":"application/json",[le]:e.pairingToken},body:JSON.stringify({sourceRunId:r.sourceRunId,lesson:r.lesson}),signal:AbortSignal.timeout(15e3)});if(!o.ok)return!1;let n=await o.json();return typeof n=="object"&&n!==null&&n.ok===!0}catch{return!1}},Mw=Vte});var LH,qo,xH=l(()=>{"use strict";LH=require("node:child_process"),qo=(e="Choose a folder to scan for .cursor harness files")=>{if(process.platform!=="darwin")return null;let t=e.replaceAll("\\","\\\\").replaceAll('"','\\"');try{let r=`POSIX path of (choose folder with prompt "${t}")`,o=(0,LH.execFileSync)("/usr/bin/osascript",["-e",r],{encoding:"utf8",stdio:["ignore","pipe","pipe"]}).trim();return o.length>0?o:null}catch{return null}}});var IH=l(()=>{"use strict";qi()});var Qc,WH=l(()=>{"use strict";It();Qc=async(e,t,r)=>{try{return(await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json",[le]:e.pairingToken},body:JSON.stringify({folderPath:r}),signal:AbortSignal.timeout(15e3)})).ok}catch{return!1}}});var jw,OH=l(()=>{"use strict";It();jw=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}`,{method:"DELETE",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(r.ok)return{ok:!0,errorMessage:null};let o=await r.json().catch(()=>null);return{ok:!1,errorMessage:typeof o=="object"&&o!==null&&typeof o.errorMessage=="string"?o.errorMessage:`Delete failed (${r.status})`}}catch{return{ok:!1,errorMessage:"Could not reach AgentWitch Cloud."}}}});var MH,Kte,Qr,Nw,Dw=l(()=>{"use strict";MH=e=>{let t=JSON.parse(e);return Array.isArray(t)?t.filter(r=>typeof r=="string"):[]},Kte=e=>e===""?null:e,Qr=e=>e??"",Nw=e=>({id:e.id,projectId:Kte(e.project_id),symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:{kind:e.check_kind,value:e.check_value},keywords:MH(e.keywords_json),tags:MH(e.tags_json),source:e.source,hitCount:e.hit_count,lastSeenAt:e.last_seen_at,severity:e.severity})});var jH,qte,Jte,Hw,Ji,ty,ed=l(()=>{"use strict";Dw();jH=`
  SELECT p.project_id, p.id, p.symptom, p.cause, p.avoidance,
    p.check_kind, p.check_value, p.keywords_json, p.tags_json,
    p.source, p.severity,
    COALESCE(h.hit_count, 0) AS hit_count,
    h.last_seen_at AS last_seen_at
  FROM pitfalls p
  LEFT JOIN pitfall_hits h
    ON h.project_id = ? AND h.pitfall_id = p.id
  WHERE p.project_id = ?`,qte=e=>e,Jte=e=>e??null,Hw=(e,t,r=t)=>qte(e.prepare(jH).all(Qr(r),Qr(t))).map(Nw),Ji=(e,t,r,o=t)=>{let n=Jte(e.prepare(`${jH} AND p.id = ?`).get(Qr(o),Qr(t),r));return n===null?null:Nw(n)},ty=(e,t)=>{e.prepare(`INSERT INTO pitfalls (
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
      severity = excluded.severity`).run(Qr(t.projectId),t.id,t.symptom,t.cause,t.avoidance,t.check.kind,t.check.value,JSON.stringify(t.keywords),JSON.stringify(t.tags),t.source,t.severity)}});var ry,Fw=l(()=>{"use strict";Bt();ry=e=>e.map(t=>({id:Hn(t.id),avoidance:Hn(t.avoidance)}))});var oy,NH,ny=l(()=>{"use strict";oy=e=>{let t=new Map;e.seeds.forEach(o=>{t.set(o.id,o)}),e.projectRows.forEach(o=>{t.set(o.id,o)});let r=[...t.values()];return e.includeRetired===!0?r:r.filter(o=>o.source!=="retired")},NH=e=>e.filter(t=>t.source!=="retired").length});var is,DH,td=l(()=>{"use strict";Bt();Fw();ed();ny();is=(e,t={})=>{let r=t.projectId??null,o=Hw(e,null,r),n=r===null||r===""?[]:Hw(e,r);return oy({seeds:o,projectRows:n,includeRetired:t.includeRetired===!0})},DH=(e,t={})=>{let r=is(e,t);return t.format==="bot"?{format:"bot",items:ry(r),lines:r.map(o=>Jl(o))}:{format:"full",items:r}}});var sy,$w=l(()=>{"use strict";ed();td();sy=(e,t)=>{let r=t.id.trim();if(r.length===0)return null;let o=t.projectId??null;return o===null||o===""?Ji(e,null,r):is(e,{projectId:o,includeRetired:!0}).find(s=>s.id===r)??null}});var zw=l(()=>{"use strict"});var Jo,Yi,HH,FH,$H=l(()=>{"use strict";Jo=e=>({type:"string",description:e}),Yi={name:"check_context",description:"Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",inputSchema:{type:"object",properties:{cwd:Jo("Absolute working directory for the current session."),message:Jo("User prompt or task text to match."),sessionId:Jo("Optional session id for first-message tracking."),projectId:Jo("Optional project id when already known.")},additionalProperties:!1}},HH={name:"get_context",description:"Compact project briefing: id, folder, and feature flags. Not a full docs dump.",inputSchema:{type:"object",properties:{cwd:Jo("Absolute working directory."),projectId:Jo("Optional project id when already known.")},additionalProperties:!1}},FH={name:"get_pitfalls",description:"List or search project pitfalls in a short bot-friendly form.",inputSchema:{type:"object",properties:{projectId:Jo("Project id."),q:Jo("Optional search text."),limit:{type:"number",description:"Max rows to return."}},additionalProperties:!1}}});var as,zH,UH,BH=l(()=>{"use strict";as=e=>({type:"string",description:e}),zH={name:"get_skill",description:"Read one project skill by id or search. Same idea as the cloud skill tools.",inputSchema:{type:"object",properties:{projectId:as("Project id."),skillId:as("Skill id when known."),q:as("Optional search text.")},required:["projectId"],additionalProperties:!1}},UH={name:"record_outcome",description:"Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",inputSchema:{type:"object",properties:{projectId:as("Project id."),kind:{type:"string",description:"pitfall | preflight | other"},pitfallId:as("Pitfall id when kind is pitfall."),preflightId:as("Preflight check id when kind is preflight."),ok:{type:"boolean",description:"Whether the step helped."},notes:as("Optional short note. No secret values.")},required:["projectId","kind","ok"],additionalProperties:!1}}});var GH=l(()=>{"use strict";$H();BH()});var Uw,VH=l(()=>{"use strict";Bt();zw();Uw=e=>{let t=yg("AgentWitch tip \xB7 check_context",120);if(Mo(t)>=120)return t;let r=[t],o=Mo(t);for(let n of e){if(r.length-1>=4)break;let s=Jl(n),i=Mo(s);if(o+i>120){if(r.length===1){let a=120-o,c=yg(s,a);c.length>0&&(r.push(c),o+=Mo(c));continue}continue}r.push(s),o+=i}return r.join(`
`)}});var KH=l(()=>{"use strict";Bt()});var ay=l(()=>{"use strict";zw();GH();VH();KH()});var Yte,Xte,ly,Bw=l(()=>{"use strict";ay();Yte=e=>e.toLowerCase(),Xte=(e,t)=>{let r=Yte(e);return t.reduce((o,n)=>{let s=n.trim().toLowerCase();return s.length===0?o:r.includes(s)?o+1:o},0)},ly=e=>{let t=e.pitfalls.map(r=>({pitfall:r,score:Xte(e.text,r.keywords)})).filter(r=>r.score>0).sort((r,o)=>o.score-r.score||r.pitfall.id.localeCompare(o.pitfall.id));return t.length===0?[]:t.slice(0,4).map(r=>r.pitfall)}});var qH,JH=l(()=>{"use strict";td();Bw();qH=(e,t)=>{let r=is(e,{projectId:t.projectId,includeRetired:!1});return ly({pitfalls:r,text:t.text})}});var Zte,Qte,ere,tre,YH,cy,XH,dy,Gw=l(()=>{"use strict";Zte="22.13",Qte=e=>typeof e=="object"&&e!==null&&typeof e.DatabaseSync=="function",ere=e=>{let t={ok:!1,reason:`Node ${e.nodeVersion} has no node:sqlite (needs Node ${Zte}+)`};if(e.getBuiltinModule===null)return t;try{let r=e.getBuiltinModule("node:sqlite");return Qte(r)?{ok:!0,sqlite:r}:t}catch{return t}},tre=()=>typeof process.getBuiltinModule=="function"?e=>process.getBuiltinModule(e):null,YH=new Map,cy=()=>{let e=YH.get("process");if(e!==void 0)return e;let t=ere({getBuiltinModule:tre(),nodeVersion:process.version});return YH.set("process",t),t},XH=()=>{let e=cy();if(!e.ok)throw new Error(`Pitfall cache unavailable: ${e.reason}`);return e.sqlite},dy=()=>{let e=cy();return e.ok?null:`[agent-witch] Pitfall cache (check_context) is off: ${e.reason}. Everything else runs.`}});var ZH,od=l(()=>{"use strict";kg();ZH=3e3});var QH,eF=l(()=>{"use strict";od();QH=`
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
`});var tF,rF,rre,ore,oF,nF,sF=l(()=>{"use strict";tF=m(require("node:fs")),rF=m(require("node:path"));Gw();od();eF();rre=e=>{let t=e.prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'").get();if(t===void 0)return 0;let r=Number.parseInt(t.value,10);return Number.isFinite(r)?r:0},ore=(e,t)=>{e.prepare(`INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`).run(String(t))},oF=e=>{tF.default.mkdirSync(rF.default.dirname(e),{recursive:!0});let{DatabaseSync:t}=XH(),r=new t(e);return r.exec(`PRAGMA busy_timeout = ${ZH}`),r.exec(QH),rre(r)<Ql&&ore(r,Ql),r},nF=e=>{e.close()}});var iF,aF,Vw=l(()=>{"use strict";Dw();iF=(e,t,r,o)=>{let n=e.prepare(`INSERT INTO pitfall_hits (project_id, pitfall_id, hit_count, last_seen_at)
       VALUES (?, ?, 1, ?)
       ON CONFLICT(project_id, pitfall_id) DO UPDATE SET
         hit_count = pitfall_hits.hit_count + 1,
         last_seen_at = excluded.last_seen_at
       RETURNING hit_count, last_seen_at`).get(Qr(t),r,o);return{hitCount:n.hit_count,lastSeenAt:n.last_seen_at}},aF=(e,t,r)=>{let o=e.prepare(`SELECT hit_count, last_seen_at FROM pitfall_hits
       WHERE project_id = ? AND pitfall_id = ?`).get(Qr(t),r);return o===void 0?{hitCount:0,lastSeenAt:null}:{hitCount:o.hit_count,lastSeenAt:o.last_seen_at}}});var lF,cF=l(()=>{"use strict";$w();Vw();lF=(e,t)=>{let r=t.id.trim(),o=r.length===0?null:sy(e,{projectId:t.projectId,id:r});if(o===null)return{ok:!1,reason:"not_found"};let n=t.nowIso??new Date().toISOString(),s=iF(e,t.projectId,o.id,n);return{ok:!0,pitfall:{...o,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt}}}});var Kw,uy,qw=l(()=>{"use strict";Kw=m(require("node:path"));He();uy=(e,t)=>e.profileEmail!==null?Kw.default.join(e.installDir,st,e.profileEmail,t):Kw.default.join(e.installDir,t)});var Xi,Jw=l(()=>{"use strict";od();qw();Xi=e=>uy(e,Zb)});var uF,dF=l(()=>{uF=[{id:"arch-max-lines",symptom:"ci:architecture fails at land (handler >100 / test >100 effective lines)",cause:"Max-effective-lines=100 only enforced late",avoidance:"Run `npm run ci:architecture` before tipping Arch",check:{kind:"command",value:"npm run ci:architecture"},keywords:["architecture","land","ci:architecture","max-effective","lines"],tags:["architecture","ci"]},{id:"symlink-node-modules",symptom:'Turbopack: "points out of the filesystem root"',cause:"Mac worktree with symlinked node_modules",avoidance:"APFS clone: `cp -Rc` (not symlink) into worktree",check:{kind:"id",value:"pit.symlink-node-modules"},keywords:["build","turbopack","symlink","node_modules","filesystem root"],tags:["build"]},{id:"install-bundle-clobber",symptom:"Missing/broken public/install/agent-witch/app/deps.tar.gz or agent-witch.js after build",cause:"Build overwrites install bundle artifacts",avoidance:"Restore those two paths after `build`",check:{kind:"command",value:"test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js"},keywords:["build","deps.tar.gz","agent-witch.js","install bundle","clobber"],tags:["build","awi"]},{id:"stale-next",symptom:"Typecheck fails spuriously",cause:"Stale .next",avoidance:"`rm -rf .next` then typecheck",check:{kind:"id",value:"pit.stale-next"},keywords:["build","typecheck",".next","stale","turbopack"],tags:["build"]},{id:"main-moved-rebase",symptom:"FF/SHIP fails; main advanced",cause:"main moved between SHIP and FF",avoidance:"`git fetch`; pure-rebase onto new `-rN` branch; **never** force-push",check:{kind:"id",value:"pit.main-moved-rebase"},keywords:["ship","ff","push","rebase","main moved","force-push"],tags:["git"]},{id:"health-lag",symptom:"Declare done on exit 0 / HTTP 200 too early",cause:"Deploy health lags ~1\u20132 min after push",avoidance:"Poll until health `commitSha` == main tip + smoke",check:{kind:"id",value:"pf.health-matches-main"},keywords:["ship","ff","push","health","commitSha","deploy"],tags:["deploy"]},{id:"dirty-home-checkout",symptom:"Accidental reset/clean of ~/daily-magic",cause:"Home checkout left dirty",avoidance:"Use `/tmp` worktrees; never reset/clean home",check:{kind:"id",value:"pit.dirty-home-checkout"},keywords:["reset","clean","home checkout","daily-magic","worktree"],tags:["git"]},{id:"box-no-gh-auth",symptom:"Push from box fails",cause:"Box git has no GitHub auth",avoidance:"Push from the Mac",check:{kind:"id",value:"pit.box-no-gh-auth"},keywords:["ship","ff","push","box","github","auth"],tags:["git"]},{id:"ci-yml-main-only",symptom:"Expecting GH Actions on non-main push",cause:"Old ci.yml push trigger covered only main; CI being removed \u2014 gate is local suite",avoidance:"Run local `npm run ci` (or suite subset); do not wait on Actions",check:{kind:"id",value:"pit.local-suite-gate"},keywords:["ci","actions","github actions","npm run ci","main only"],tags:["ci"]},{id:"secrets-in-logs",symptom:"Secrets printed in logs/CLI",cause:"Verbose dump of env/files",avoidance:"Print existence / path / fingerprint only",check:{kind:"id",value:"pit.secrets-in-logs"},keywords:["secrets","logs","token","keypair","env","fingerprint"],tags:["secrets"]},{id:"no-prs-daily-magic",symptom:"PR windows opened in Mac Chrome",cause:"Habit from other repos",avoidance:"No PRs for daily-magic; never open PR UI",check:{kind:"id",value:"pit.no-prs"},keywords:["pr","pull request","chrome","daily-magic"],tags:["git"]}]});var sre,ire,py,Yw=l(()=>{"use strict";dF();sre=uF,ire=e=>({id:e.id,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags??[],projectId:null,source:"seed",hitCount:0,lastSeenAt:null,severity:"warn"}),py=()=>sre.map(ire)});var pF,mF=l(()=>{"use strict";Yw();ed();pF=e=>py().reduce((r,o)=>Ji(e,null,o.id)!==null?r:(ty(e,o),r+1),0)});var gF,fF,yF=l(()=>{"use strict";od();gF=e=>e.id.trim().length===0?{kind:"empty_id"}:e.projectId.trim().length===0?{kind:"empty_project_id"}:e.symptom.length>Ag?{kind:"field_too_long",field:"symptom",max:Ag}:e.cause.length>bg?{kind:"field_too_long",field:"cause",max:bg}:e.avoidance.length>_g?{kind:"field_too_long",field:"avoidance",max:_g}:null,fF=e=>e.activeCountAfter>bi?{kind:"active_cap",max:bi}:null});var hF,SF=l(()=>{"use strict";ed();Vw();td();ny();yF();hF=(e,t)=>{let r=gF(t);if(r!==null)return{ok:!1,error:r};let o=t.id.trim(),n=Ji(e,t.projectId,o),s=aF(e,t.projectId,o),i=t.source??"project",a={id:o,projectId:t.projectId,symptom:t.symptom,cause:t.cause,avoidance:t.avoidance,check:t.check,keywords:t.keywords,tags:t.tags??[],source:i,hitCount:s.hitCount,lastSeenAt:s.lastSeenAt,severity:t.severity??n?.severity??"warn"},d=is(e,{projectId:t.projectId,includeRetired:!0}).filter(f=>f.id!==a.id),u=NH([...d,a]),g=fF({activeCountAfter:u});return g!==null?{ok:!1,error:g}:(ty(e,a),{ok:!0,pitfall:a})}});var ls,Xw=l(()=>{"use strict";$w();td();JH();sF();cF();Jw();mF();SF();ls=e=>{let t=e.dbPath??(e.layout!==void 0?Xi(e.layout):(()=>{throw new Error("createPitfallRegistry requires dbPath or layout")})()),r=oF(t);return pF(r),{dbPath:t,listPitfalls:o=>DH(r,o),getPitfall:o=>sy(r,o),upsertPitfall:o=>hF(r,o),recordHit:o=>lF(r,o),matchPitfalls:o=>qH(r,o),close:()=>nF(r)}}});var are,lre,my,Zw=l(()=>{"use strict";ay();Fw();are=(e,t,r)=>{let o=t.projectId?.trim();return o!==void 0&&o.length>0?o:r===null||e.resolveProjectId===void 0?null:e.resolveProjectId(r)},lre=(e,t,r,o)=>{for(let n of o)try{t.recordHit({projectId:r,id:n.id})}catch(s){e.logError?.(s)}},my=(e,t)=>{try{let r=t.cwd?.trim()??"",o=r.length>0?r:null;if(o!==null&&e.isDeclined?.(o)===!0)return{status:"none"};let n=are(e,t,o);if(n===null||e.registry===null)return{status:"none",promptCreate:o!==null};let s=e.registry.matchPitfalls({projectId:n,text:t.message??""});if(s.length===0)return{status:"miss",projectId:n};lre(e,e.registry,n,s);let i=ry(s);return{status:"hit",projectId:n,pitfalls:i,tip:Uw(i)}}catch(r){return e.logError?.(r),{status:"none"}}}});var gy,PF=l(()=>{"use strict";ay();gy={name:Yi.name,description:Yi.description,inputSchema:Yi.inputSchema}});var eo,AF,bF,to,cre,Zi,_F,nd=l(()=>{"use strict";eo=m(require("node:fs")),AF=m(require("node:os")),bF=m(require("node:path")),to=()=>({readUtf8:e=>eo.default.readFileSync(e,"utf8"),writeUtf8:(e,t)=>{eo.default.writeFileSync(e,t,"utf8")},exists:e=>eo.default.existsSync(e),mkdirp:e=>{eo.default.mkdirSync(e,{recursive:!0})},rename:(e,t)=>{eo.default.renameSync(e,t)},realpath:e=>eo.default.realpathSync.native(e)}),cre=()=>({homedir:()=>AF.default.homedir()}),Zi=()=>({...to(),...cre()}),_F=e=>({...to(),homedir:()=>e,realpath:r=>{let o=bF.default.resolve(r);return eo.default.existsSync(o)?eo.default.realpathSync.native(o):o}})});var fy,kF=l(()=>{"use strict";fy=(e,t)=>{let r=e.trim();if(r.length===0)return r;try{return t.exists(r)?t.realpath(r):r}catch{return r}}});var Qw,wF=l(()=>{"use strict";qw();Gt();Qw=e=>uy(e,dj)});var TF,Ge,ro=l(()=>{"use strict";TF=m(require("node:path")),Ge=e=>{let{fs:t,filePath:r,contents:o}=e;t.mkdirp(TF.default.dirname(r));let n;e.backup===!0&&t.exists(r)&&(n=`${r}.aw-bak.${new Date().toISOString().replaceAll(":","-")}`,t.writeUtf8(n,t.readUtf8(r)));let s=`${r}.aw-tmp`;return t.writeUtf8(s,o),t.rename(s,r),n!==void 0?{backupPath:n}:{}}});var yy,dre,sd,EF,hy,Sy,Qi,Py=l(()=>{"use strict";nd();kF();wF();ro();yy=()=>({byRealpath:{}}),dre=e=>{try{let t=JSON.parse(e);if(typeof t!="object"||t===null)return yy();let r=t.byRealpath;return typeof r!="object"||r===null?yy():{byRealpath:r}}catch{return yy()}},sd=(e,t=to())=>{let r=Qw(e);return t.exists(r)?dre(t.readUtf8(r)):yy()},EF=(e,t,r)=>{Ge({fs:r,filePath:Qw(e),contents:`${JSON.stringify(t,null,2)}
`})},hy=e=>{let t=e.fs??to(),r=fy(e.cwd,t),o={declinedAt:e.nowIso??new Date().toISOString(),cwd:e.cwd},n=sd(e.layout,t);return EF(e.layout,{byRealpath:{...n.byRealpath,[r]:o}},t),o},Sy=e=>{let t=e.fs??to(),r=fy(e.cwd,t),o=sd(e.layout,t);if(o.byRealpath[r]===void 0)return!1;let n=Object.fromEntries(Object.entries(o.byRealpath).filter(([s])=>s!==r));return EF(e.layout,{byRealpath:n},t),!0},Qi=e=>{let t=e.fs??to(),r=fy(e.cwd,t);return sd(e.layout,t).byRealpath[r]!==void 0}});var Yo,Ay,eT=l(()=>{"use strict";Yo=(e,t)=>{let r=e[t];if(typeof r!="string")return;let o=r.trim();return o.length>0?o:void 0},Ay=e=>{if(typeof e!="object"||e===null||Array.isArray(e))return{};let t=e;return{...Yo(t,"cwd")!==void 0?{cwd:Yo(t,"cwd")}:{},...Yo(t,"message")!==void 0?{message:Yo(t,"message")}:{},...Yo(t,"sessionId")!==void 0?{sessionId:Yo(t,"sessionId")}:{},...Yo(t,"projectId")!==void 0?{projectId:Yo(t,"projectId")}:{}}}});var Xo,by=l(()=>{"use strict";Wt();Zw();Xw();Py();eT();Xo=e=>{let t=e.logError??(o=>{let n=o instanceof Error?o.message:String(o);console.error(`[agent-witch] check_context: ${n}`)}),r=e.isDeclined??(o=>Qi({layout:e.layout,cwd:o}));return o=>{let n=Ay(o),s=null;try{return s=ls({layout:e.layout}),my({registry:s,resolveProjectId:Sw,isDeclined:r,logError:t},n)}catch(i){return t(i),{status:"none"}}finally{s?.close()}}}});var RF,vF=l(()=>{"use strict";RF=["AgentWitch \xB7 check_context: this folder is not an AgentWitch project yet.","Ask the user once whether to add it in AgentWitch Local (Projects) so saved pitfalls show up here.","If they decline or ignore it, do not ask again this session."].join(`
`)});var ure,tT,pre,mre,gre,_y,rT=l(()=>{"use strict";vF();ure="UserPromptSubmit",tT=(e,t)=>{let r=e[t];return typeof r=="string"&&r.trim().length>0?r:void 0},pre=e=>{let t;try{t=JSON.parse(e)}catch{return null}if(typeof t!="object"||t===null||Array.isArray(t))return null;let r=t,o=tT(r,"cwd"),n=tT(r,"prompt"),s=tT(r,"session_id");return{...o!==void 0?{cwd:o}:{},...n!==void 0?{message:n}:{},...s!==void 0?{sessionId:s}:{}}},mre=e=>{if(e.status==="hit"){let t=e.tip?.trim()??"";return t.length>0?t:null}return e.status==="none"&&e.promptCreate===!0?RF:null},gre=e=>`${JSON.stringify({hookSpecificOutput:{hookEventName:ure,additionalContext:e}})}
`,_y=async e=>{try{let t=pre(await e.readStdin());if(t===null)return e.writeStderr(`[agent-witch] mcp-hook: stdin is not a JSON object
`),0;let r=mre(await e.runCheckContext(t));r!==null&&e.writeStdout(gre(r))}catch(t){let r=t instanceof Error?t.message:String(t);try{e.writeStderr(`[agent-witch] mcp-hook: ${r}
`)}catch{}}return 0}});var fre,yre,CF,LF=l(()=>{"use strict";by();rT();fre=1500,yre=(e,t)=>new Promise(r=>{let o=[],n=!1,s=()=>{n||(n=!0,clearTimeout(i),e.removeAllListeners("data"),e.removeAllListeners("end"),e.removeAllListeners("error"),e.pause(),r(Buffer.concat(o).toString("utf8")))},i=setTimeout(s,t);e.on("data",a=>{o.push(Buffer.isBuffer(a)?a:Buffer.from(a,"utf8"))}),e.on("end",s),e.on("error",s)}),CF=async e=>{let t=r=>{process.stderr.write(r)};return _y({readStdin:()=>yre(process.stdin,fre),writeStdout:r=>{process.stdout.write(r)},writeStderr:t,runCheckContext:Xo({layout:e.layout,logError:r=>{let o=r instanceof Error?r.message:String(r);t(`[agent-witch] mcp-hook check_context: ${o}
`)}})})}});var hre,ky,xF=l(()=>{"use strict";by();eT();hre="/api/local/check-context",ky=async e=>{if(e.pathname!==hre)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t={};try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{return e.sendJson(e.response,400,{status:"none"}),!0}let r=Xo({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,r(Ay(t))),!0}});var IF,wy,Sre,Pre,WF,OF=l(()=>{"use strict";IF=m(require("node:path"));Gt();ro();wy=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Sre={hooks:[{type:"command",command:Xb,timeout:3,[Fn]:!0}]},Pre=e=>Array.isArray(e)&&e.some(t=>wy(t)&&Array.isArray(t.hooks)&&t.hooks.some(r=>wy(r)&&(r.command===Xb||r[Fn]===!0))),WF=e=>{let t=IF.default.join(e.io.homedir(),cj),r={};if(e.io.exists(t))try{let a=JSON.parse(e.io.readUtf8(t));wy(a)&&(r={...a})}catch{r={}}let o=wy(r.hooks)?{...r.hooks}:{},n=o.UserPromptSubmit;if(Pre(n))return{ok:!0,path:t,wrote:!1};let s=Array.isArray(n)?[...n]:[];s.push(Sre),o.UserPromptSubmit=s;let{backupPath:i}=Ge({fs:e.io,filePath:t,contents:`${JSON.stringify({...r,hooks:o},null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:i}}});var ea,Ty=l(()=>{"use strict";Gt();ea=e=>{let t=e.begin??hi,r=e.end??Si,o=`${t}
${e.blockBody.trimEnd()}
${r}
`,n=e.existing.indexOf(t);if(n<0){let u=`${e.existing.length===0||e.existing.endsWith(`
`)?e.existing:`${e.existing}
`}${o}`;return{next:u,changed:u!==e.existing}}let s=e.existing.indexOf(r,n);if(s<0){let d=`${e.existing.slice(0,n)}${o}`;return{next:d,changed:d!==e.existing}}let i=s+r.length,a=e.existing.slice(i).replace(/^\n/,""),c=`${e.existing.slice(0,n)}${o}${a}`;return{next:c,changed:c!==e.existing}}});var MF,Are,jF,NF=l(()=>{"use strict";MF=m(require("node:path"));Ty();Gt();ro();Are=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with the current cwd.","If status is miss or none (declined), stay silent. If hit, follow the tip."].join(`
`),jF=e=>{let t=MF.default.join(e.io.homedir(),lj),r=e.io.exists(t)?e.io.readUtf8(t):"",{next:o,changed:n}=ea({existing:r,blockBody:Are,begin:hi,end:Si});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Ge({fs:e.io,filePath:t,contents:o,backup:r.length>0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var DF,HF,FF=l(()=>{"use strict";DF=m(require("node:path"));Ty();Gt();ro();HF=e=>{let t=DF.default.join(e.io.homedir(),aj),r=Sg.map(c=>`"${c}"`).join(", "),o=[`[mcp_servers.${Xl}]`,`command = "${Zl}"`,`args = [${r}]`].join(`
`),n=e.io.exists(t)?e.io.readUtf8(t):"",{next:s,changed:i}=ea({existing:n,blockBody:o,begin:hi,end:Si});if(!i)return{ok:!0,path:t,wrote:!1};let{backupPath:a}=Ge({fs:e.io,filePath:t,contents:s,backup:n.length>0});return{ok:!0,path:t,wrote:!0,backupPath:a}}});var $F,oT,zF,UF=l(()=>{"use strict";$F=m(require("node:path"));Gt();ro();oT=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),zF=e=>{let t=$F.default.join(e.io.homedir(),ij),r={command:Zl,args:[...Sg]},o={};if(e.io.exists(t))try{let d=JSON.parse(e.io.readUtf8(t));oT(d)&&(o={...d})}catch{o={}}let n=oT(o.mcpServers)?{...o.mcpServers}:{},s=n[Xl];if(oT(s)&&s.command===r.command&&Array.isArray(s.args)&&JSON.stringify(s.args)===JSON.stringify(r.args))return{ok:!0,path:t,wrote:!1};n[Xl]=r;let a={...o,mcpServers:n},{backupPath:c}=Ge({fs:e.io,filePath:t,contents:`${JSON.stringify(a,null,2)}
`,backup:e.io.exists(t)});return{ok:!0,path:t,wrote:!0,backupPath:c}}});var ta,nT=l(()=>{"use strict";nd();OF();NF();FF();UF();ta=e=>{let t=e?.io??Zi();return{ok:!0,cursorMcp:zF({io:t}),codexConfig:HF({io:t}),codexAgents:jF({io:t}),claudeHook:WF({io:t})}}});var BF,GF=l(()=>{"use strict";Gt();BF=e=>{let t=["On the first user message of a session, call the AgentWitch MCP tool","`check_context` with this folder's cwd.",`projectId: ${e}`,"If status is miss or none (already declined), stay silent.","If status is hit, follow the tip. Do not dump large context."].join(`
`);return["---","description: AgentWitch check_context (token-saver)","alwaysApply: true","---","",Pi,t,Yl,""].join(`
`)}});var VF,bre,KF,qF=l(()=>{"use strict";VF=m(require("node:path"));GF();Gt();Ty();ro();bre=e=>e.slice(e.indexOf(Pi)+Pi.length,e.indexOf(Yl)).trim(),KF=e=>{let t=VF.default.join(e.projectRoot,hg),r=BF(e.projectId);if(!e.fs.exists(t))return Ge({fs:e.fs,filePath:t,contents:r}),{ok:!0,path:t,wrote:!0};let{next:o,changed:n}=ea({existing:e.fs.readUtf8(t),blockBody:bre(r),begin:Pi,end:Yl});if(!n)return{ok:!0,path:t,wrote:!1};let{backupPath:s}=Ge({fs:e.fs,filePath:t,contents:o,backup:!0});return{ok:!0,path:t,wrote:!0,backupPath:s}}});var iT,sT,JF,YF=l(()=>{"use strict";iT=m(require("node:path"));ro();sT="# agent-witch-token-saver (local; never commit)",JF=e=>{let t=iT.default.join(e.repoRoot,".git");if(!e.fs.exists(t))return{ok:!1,reason:"not a git working tree"};let r=iT.default.join(t,"info","exclude"),o=e.fs.exists(r)?e.fs.readUtf8(r):"",n=o.length>0?o.split(/\r?\n/):[],s=new Set(n.map(c=>c.trim())),i=e.relativePaths.filter(c=>!s.has(c));if(i.length===0&&s.has(sT))return{ok:!0,path:r,wrote:!1};let a=[...n];for(;a.length>0&&a[a.length-1]==="";)a.pop();s.has(sT)||a.push("",sT);for(let c of i)a.push(c);return a.push(""),Ge({fs:e.fs,filePath:r,contents:a.join(`
`)}),{ok:!0,path:r,wrote:i.length>0}}});var Ey,aT=l(()=>{"use strict";Gt();qF();YF();Ey=e=>{let t=KF({fs:e.fs,projectRoot:e.projectRoot,projectId:e.projectId}),r=JF({fs:e.fs,repoRoot:e.projectRoot,relativePaths:[hg]});return{ok:!0,cursorRule:t,gitExclude:r}}});var lT,cT,Ry,dT,uT=l(()=>{"use strict";lT=["pitfalls","preflight","localMcp","history","ollama","skillGen"],cT=["on","off","degraded","unavailable"],Ry={pitfalls:"on",preflight:"on",localMcp:"on",history:"off",ollama:"off",skillGen:"off"},dT=()=>({...Ry})});var _re,kre,pT,XF=l(()=>{"use strict";uT();_re=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),kre=e=>cT.find(t=>t===e)??null,pT=e=>{if(!_re(e))return null;let t={...Ry};for(let r of lT){let o=kre(e[r]);o!==null&&(t[r]=o)}return t}});var ZF=l(()=>{"use strict";uT();XF()});var QF,wre,Tre,e$,t$=l(()=>{"use strict";QF=m(require("node:path"));Wt();ZF();ro();wre="token-saver.json",Tre=(e,t)=>{if(!e.exists(t))return null;try{return pT(JSON.parse(e.readUtf8(t)))}catch{return null}},e$=e=>{let t=QF.default.join(e.projectRoot,$l,wre),r=e.flags??{...dT(),...Tre(e.fs,t)},o=`${JSON.stringify(r,null,2)}
`;return e.fs.exists(t)&&e.fs.readUtf8(t)===o?{ok:!0,path:t,wrote:!1}:(Ge({fs:e.fs,filePath:t,contents:o}),{ok:!0,path:t,wrote:!0})}});var oo,Er,vy,mT=l(()=>{"use strict";oo=(e,t)=>{if(t==="remove")return{ok:!0,state:"Connected"};switch(e){case"Unconnected":return t==="connect"?{ok:!0,state:"SigningIn"}:Er(e,t);case"SigningIn":return t==="signInComplete"?{ok:!0,state:"Connected"}:Er(e,t);case"Connected":return t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Er(e,t);case"GlobalTriggersWritten":return t==="decline"?{ok:!0,state:"Declined"}:t==="accept"?{ok:!0,state:"ProjectResolved"}:t==="writeGlobalTriggers"?{ok:!0,state:"GlobalTriggersWritten"}:Er(e,t);case"Declined":return t==="clearDecline"?{ok:!0,state:"GlobalTriggersWritten"}:Er(e,t);case"ProjectResolved":return t==="applyDefaults"?{ok:!0,state:"DefaultsApplied"}:Er(e,t);case"DefaultsApplied":return t==="writeProjectFragments"?{ok:!0,state:"ProjectFragmentsWritten"}:Er(e,t);case"ProjectFragmentsWritten":return t==="verify"?{ok:!0,state:"Verified"}:Er(e,t);case"Verified":return t==="accept"||t==="writeProjectFragments"?{ok:!0,state:e}:Er(e,t);default:return Er(e,t)}},Er=(e,t)=>({ok:!1,reason:`Illegal transition ${e} + ${t}`,state:e}),vy=e=>e==="Declined"});var Ere,Rre,r$,o$=l(()=>{"use strict";t$();nd();Py();mT();nT();aT();Ere="projectId required on accept",Rre=e=>{let t=e.projectId;if(e.resolveProject!==void 0)try{t=e.resolveProject(e.cwd).projectId}catch(o){return{ok:!1,reason:`project resolve failed: ${o instanceof Error?o.message:String(o)}`}}let r=t?.trim()??"";return r.length>0?{ok:!0,projectId:r}:{ok:!1,reason:Ere}},r$=e=>{let t=e.fs??to(),r=e.io??Zi(),o=e.fromState??"GlobalTriggersWritten";if(!e.accept){let d=oo(o,"decline");return d.ok?(hy({layout:e.layout,cwd:e.cwd,fs:t}),{ok:!0,state:"Declined"}):{ok:!1,state:d.state,reason:d.reason}}let n=vy(o)||Qi({layout:e.layout,cwd:e.cwd,fs:t});n&&(o="Declined");let s=Rre(e);if(!s.ok)return{ok:!1,state:o,reason:s.reason};if(n){let d=oo(o,"clearDecline");if(!d.ok)return{ok:!1,state:d.state,reason:d.reason};Sy({layout:e.layout,cwd:e.cwd,fs:t}),o=d.state}ta({io:r}),o=oo(o,"writeGlobalTriggers").ok?"GlobalTriggersWritten":o;let i=oo(o,"accept");if(!i.ok)return{ok:!1,state:i.state,reason:i.reason};o=i.state;let a=oo(o,"applyDefaults");if(!a.ok)return{ok:!1,state:a.state,reason:a.reason};e$({fs:t,projectRoot:e.cwd}),o=a.state;let c=oo(o,"writeProjectFragments");return c.ok?(Ey({fs:t,projectRoot:e.cwd,projectId:s.projectId}),{ok:!0,state:c.state,projectId:s.projectId}):{ok:!1,state:c.state,reason:c.reason}}});var n$={};St(n$,{AWL_CHECK_CONTEXT_TOOL:()=>gy,checkContext:()=>my,clearProjectDecline:()=>Sy,createCheckContextRunner:()=>Xo,createNodeCliIo:()=>Zi,createPitfallRegistry:()=>ls,createTempCliIo:()=>_F,declineProjectForCwd:()=>hy,describePitfallCacheAvailability:()=>dy,isDeclinedCwd:()=>Qi,isDeclinedTerminal:()=>vy,listBundledSeedPitfalls:()=>py,loadNodeSqlite:()=>cy,matchPitfallsByKeywords:()=>ly,readDeclinedProjectsStore:()=>sd,resolveTokenSaverDbPath:()=>Xi,runCheckContextHook:()=>_y,runCheckContextHookCli:()=>CF,runSetupProject:()=>r$,shadowPitfalls:()=>oy,transitionSetupProject:()=>oo,tryHandleTokenSaverLocalRequest:()=>ky,writeGlobalTriggers:()=>ta,writeProjectFragments:()=>Ey});var id=l(()=>{"use strict";Xw();Gw();Jw();Bw();ny();Yw();Zw();PF();by();rT();LF();xF();nT();aT();o$();Py();mT();nd()});var gT,s$=l(()=>{"use strict";gT=e=>({id:e.id,projectId:e.projectId,symptom:e.symptom,cause:e.cause,avoidance:e.avoidance,check:e.check,keywords:e.keywords,tags:e.tags,severity:e.severity,source:e.source,overridesSeed:e.source!=="seed",hitCount:e.hitCount,lastSeenAt:e.lastSeenAt,updatedAt:null})});var i$,a$,vre,Cre,Lre,Cy,fT=l(()=>{"use strict";id();kg();s$();i$=e=>{try{return e.dbPath!==void 0?ls({dbPath:e.dbPath}):e.layout!==void 0?(Xi(e.layout),ls({layout:e.layout})):null}catch{return null}},a$=(e,t,r)=>{let o=e.listPitfalls({projectId:t,includeRetired:r,format:"full"});return o.format==="full"?o.items:[]},vre=(e,t,r)=>{for(let o of r)o.source!=="seed"&&e.upsertPitfall({id:o.id,projectId:t,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source==="retired"?"retired":"project"})},Cre=e=>e.kind==="active_cap"?{ok:!1,reason:"active_limit"}:{ok:!1,reason:"rejected"},Lre=e=>{let t=e.cloud??null;return{listPitfalls:async(r,o)=>{let n=i$(e);try{if(t!==null){let i=await t.listPitfalls(r,o);if(i.ok)return n!==null?(vre(n,r,i.items),{ok:!0,items:a$(n,r,o.includeRetired).map(gT),syncedAt:i.syncedAt}):i}return n===null?{ok:!1,reason:"unavailable"}:{ok:!0,items:a$(n,r,o.includeRetired).map(gT),syncedAt:null}}finally{n?.close()}},upsertPitfall:async(r,o)=>{if(t!==null){let s=await t.upsertPitfall(r,o);if(!s.ok)return s}let n=i$(e);if(n===null)return t!==null?{ok:!0}:{ok:!1,reason:"unavailable"};try{let s=n.upsertPitfall({id:o.id,projectId:r,symptom:o.symptom,cause:o.cause,avoidance:o.avoidance,check:o.check,keywords:o.keywords,tags:o.tags,severity:o.severity,source:o.source});return s.ok?{ok:!0}:Cre(s.error)}finally{n.close()}}}},Cy=Lre});var Wt=l(()=>{"use strict";qi();Ki();VD();Uo();mf();KD();Wo();oH();sH();yH();Kf();Nc();hH();EH();RH();vH();CH();xH();IH();WH();OH();mw();uw();Xr();fT()});var Ly,ad,l$,yT,cs,hT=l(()=>{"use strict";Ly=(e,t)=>{let o=new Intl.DateTimeFormat("en-US",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1,weekday:"short"}).formatToParts(e),n=a=>o.find(c=>c.type===a)?.value??"0",s=n("weekday"),i={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};return{year:Number(n("year")),month:Number(n("month")),day:Number(n("day")),hour:Number(n("hour")),minute:Number(n("minute")),weekday:i[s]??0}},ad=(e,t,r,o)=>{let n=new Date(Date.UTC(e.year,e.month-1,e.day,r,o,0,0)),s=Ly(n,t),i=(s.hour-r)*60+(s.minute-o)+(s.day-e.day)*24*60;return new Date(n.getTime()-i*6e4)},l$=e=>e>=1&&e<=5,yT=e=>{let t=new Date(Date.UTC(e.year,e.month-1,e.day+1));return Ly(t,"UTC")},cs=e=>{let t=e.from??new Date,r=Ly(t,e.timeZone);if(e.preset==="hourly"){let c=r.minute>=0?r.hour+1:r.hour;return ad(r,e.timeZone,c,0)}let o=e.scheduleHour??9,n=ad(r,e.timeZone,o,0),s=Ly(n,e.timeZone),i=t.getTime()>=n.getTime();if(e.preset==="daily")return i?ad(yT(r),e.timeZone,o,0):n;if(!i&&l$(s.weekday))return n;let a=r;for(let c=0;c<8;c+=1)if(a=yT(a),l$(a.weekday))return ad(a,e.timeZone,o,0);return ad(yT(r),e.timeZone,o,0)}});var c$,ST,no,PT=l(()=>{"use strict";c$=require("node:crypto");ee();Wt();hT();zf();ST=!1,no=async e=>{if(ST)return{ok:!1,errorMessage:"Another scheduled automation is already running."};let t=$();if(t===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let r=V({wsUrl:t.wsUrl,pairingToken:t.pairingToken});if(r===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let o=$f(t.layout,e);if(o===null)return{ok:!1,errorMessage:"Automation not found on this computer."};if(!o.enabled)return{ok:!1,errorMessage:"Automation is paused."};ST=!0;let n=(0,c$.randomUUID)();try{let s=await Hi(t,"claude-cli",o.prompt);await cw(r,o.id,{agentRunId:n,exitCode:s.exitCode,output:s.output,prompt:o.prompt});let i=new Date,a=cs({preset:o.schedulePreset,scheduleHour:o.scheduleHour,timeZone:o.scheduleTimezone,from:i});return Ff(t.layout,{...o,lastRunAt:i.toISOString(),lastRunStatus:s.exitCode===0?"ok":"failed",lastError:s.exitCode===0?null:s.output.slice(0,500)||"Run failed.",nextRunAt:a.toISOString()}),{ok:s.exitCode===0,...s.exitCode===0?{}:{errorMessage:s.output.slice(0,500)||"Run failed."}}}finally{ST=!1}}});var xy,d$=l(()=>{"use strict";ee();PT();zf();xy=async()=>{let e=$();if(e===null)return;let t=Yt(e.layout),r=Date.now();for(let o of t.automations){if(!o.enabled||o.nextRunAt===null||new Date(o.nextRunAt).getTime()>r)continue;let n=await no(o.id);n.ok||process.stderr.write(`[agent-witch] automation ${o.name}: ${n.errorMessage??"run failed"}
`)}}});var ld=l(()=>{"use strict";zf();d$();PT();hT()});var u$=l(()=>{"use strict";ld()});var p$=l(()=>{"use strict";ow()});var m$=l(()=>{"use strict";p$()});var AT=l(()=>{"use strict";ld()});var xre,Ire,cd,bT=l(()=>{"use strict";u$();m$();AT();Xe();xre=e=>e!==void 0&&e.trim().length>0?N(e.trim()):N(),Ire=(e,t)=>t===void 0?{...e,nextRunAt:e.nextRunAt??cs({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:null,lastRunStatus:null,lastError:null}:{...e,nextRunAt:t.nextRunAt??e.nextRunAt??cs({preset:e.schedulePreset,scheduleHour:e.scheduleHour,timeZone:e.scheduleTimezone}).toISOString(),lastRunAt:t.lastRunAt,lastRunStatus:t.lastRunStatus,lastError:t.lastError},cd=e=>{let t=xre(e.profileEmail),r=Yt(t),o=new Map(r.automations.map(s=>[s.id,s])),n=e.automations.flatMap(s=>{let i=Vi(s);return i!==null?[Ire(i,o.get(i.id))]:[]});return Hf(t,n),{ok:!0,writtenCount:n.length}}});var _T=l(()=>{"use strict";ld()});var g$=l(()=>{"use strict";ee()});var f$=l(()=>{"use strict";bT();_T();AT();g$()});var y$,dd,ud,pd,h$=l(()=>{"use strict";y$=m(require("node:os"));f$();Gc();Vc();dd=e=>{if(!Yr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.profileEmail=="string"?e.profileEmail.trim():"",o=Array.isArray(e.automations)?e.automations:null;if(t.length===0)return{ok:!1,errorMessage:"appOrigin is required."};if(!rs(t))return{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."};if(o===null)return{ok:!1,errorMessage:"automations must be an array."};let n=cd({automations:o,...r.length>0?{profileEmail:r}:{}});return n.ok?{ok:!0,writtenCount:n.writtenCount}:{ok:!1,errorMessage:n.errorMessage??"Automation sync failed."}},ud=async e=>{if(!Yr(e))return{ok:!1,errorMessage:"Request body must be a JSON object."};let t=typeof e.appOrigin=="string"?e.appOrigin.trim():"",r=typeof e.automationId=="string"?e.automationId.trim():"";return t.length===0||r.length===0?{ok:!1,errorMessage:"appOrigin and automationId are required."}:rs(t)?no(r):{ok:!1,errorMessage:"appOrigin is not an allowed AgentWitch site."}},pd=()=>{let e=$(),t=e!==null?Yt(e.layout):{version:1,automations:[]};return{ok:!0,hostname:y$.default.hostname(),automationCount:t.automations.length,enabledCount:t.automations.filter(r=>r.enabled).length}}});var kT=l(()=>{"use strict";h$()});var Iy=l(()=>{"use strict";ae()});var Wy=l(()=>{"use strict";ae()});var Oy,P$,A$,S$,Wre,Ore,ra,wT=l(()=>{"use strict";Oy=m(require("node:fs")),P$=m(require("node:os")),A$=m(require("node:path"));Iy();Wy();Lc();Xe();S$=async(e,t=1500)=>{try{return(await fetch(`http://127.0.0.1:${e}/health`,{signal:AbortSignal.timeout(t)})).ok}catch{return!1}},Wre=e=>A$.default.join(P$.default.homedir(),"Library","LaunchAgents",`${e}.plist`),Ore=async e=>Oy.default.existsSync(Wre(e))?(await Ye(e)).ok:!1,ra=async(e=v())=>{let t=Oy.default.existsSync(of(e)),r=!Oy.default.existsSync(fr(e));if(!t)return{ok:!0,wakePortFileExists:!1,wakeReachable:!1,hollowInstall:r,kickstartedLabels:[]};if(r)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!0,kickstartedLabels:[]};let o=Cc(e);if(o===null)return{ok:!1,wakePortFileExists:!0,wakeReachable:!1,hollowInstall:!1,kickstartedLabels:[]};if(await S$(o))return{ok:!0,wakePortFileExists:!0,wakeReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let s=[],i=`${ye(e)}-wake`;await Ore(i)&&s.push(i);for(let c of ue(e))(await Ye(c.launchAgentLabel)).ok&&s.push(c.launchAgentLabel);let a=await S$(o);return{ok:a||s.length>0,wakePortFileExists:!0,wakeReachable:a,hollowInstall:!1,kickstartedLabels:s}}});var b$=l(()=>{"use strict";ae()});var TT=l(()=>{"use strict";qn();ae()});var ET=l(()=>{"use strict";qn()});var RT=l(()=>{"use strict";ae()});var k$,_$,md,vT=l(()=>{"use strict";k$=m(require("node:fs"));At();Iy();Wy();Xe();_$=async(e=1500)=>{try{return(await fetch(`http://127.0.0.1:${43347}/health`,{signal:AbortSignal.timeout(e)})).ok}catch{return!1}},md=async(e=v())=>{if(!k$.default.existsSync(fr(e)))return{ok:!1,liveReachable:!1,hollowInstall:!0,kickstartedLabels:[]};if(await _$())return{ok:!0,liveReachable:!0,hollowInstall:!1,kickstartedLabels:[]};let o=[];for(let s of ue(e))(await Ye(s.launchAgentLabel)).ok&&o.push(s.launchAgentLabel);let n=await _$();return{ok:n||o.length>0,liveReachable:n,hollowInstall:!1,kickstartedLabels:o}}});var w$=l(()=>{"use strict";ae()});var T$,ds,CT,Mre,jre,Nre,E$,Dre,R$,oa,My=l(()=>{"use strict";T$=require("node:crypto"),ds=m(require("node:fs")),CT=m(require("node:path"));Xe();Mre="watchdog-log.ndjson",jre=200,Nre=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),E$=(e=v())=>{let t=N(),r=t.installDir===e?t.logsDir:Ln({installDir:e,profileEmail:t.profileEmail});return CT.default.join(r,Mre)},Dre=e=>{let t=e.trim();if(t.length===0)return null;try{let r=JSON.parse(t);return!Nre(r)||typeof r.id!="string"||typeof r.recordedAt!="string"||typeof r.event!="string"||typeof r.ok!="boolean"||typeof r.message!="string"||!Array.isArray(r.targets)?null:{id:r.id,recordedAt:r.recordedAt,event:r.event,ok:r.ok,message:r.message,targets:r.targets}}catch{return null}},R$=(e,t=v())=>{let r={id:(0,T$.randomUUID)(),recordedAt:e.recordedAt??new Date().toISOString(),event:e.event,ok:e.ok,message:e.message,targets:e.targets},o=E$(t);ds.default.mkdirSync(CT.default.dirname(o),{recursive:!0});let n=ds.default.existsSync(o)?ds.default.readFileSync(o,"utf8").split(`
`).filter(i=>i.trim().length>0):[],s=[...n.slice(Math.max(0,n.length-jre+1)),JSON.stringify(r)];return ds.default.writeFileSync(o,`${s.join(`
`)}
`,"utf8"),r},oa=(e=20,t=v())=>{let r=E$(t);if(!ds.default.existsSync(r))return[];let o=ds.default.readFileSync(r,"utf8").split(`
`).flatMap(n=>{let s=Dre(n);return s===null?[]:[s]});return o.slice(Math.max(0,o.length-e))}});var LT,xT,IT,WT=l(()=>{"use strict";He();LT=gl.watchdogReinstallState,xT=900*1e3,IT=3e3});var v$=l(()=>{"use strict";WT()});var C$={};St(C$,{verifyAgentWitchReviveAfterKickstart:()=>Fre});var Hre,Fre,L$=l(()=>{"use strict";v$();ET();RT();Xe();Hre=e=>new Promise(t=>{setTimeout(t,e)}),Fre=async e=>{if(await Hre(e.verifyDelayMs??IT),!await Wn(e.launchAgentLabel))return!1;let r=e.profileEmail===null?N():N(e.profileEmail),o=Ce(r);return!ze(o,e.staleAfterMs)}});var gd,OT,$re,x$,I$,MT,jT,NT=l(()=>{"use strict";gd=m(require("node:fs")),OT=m(require("node:path"));G();WT();$re=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),x$=e=>OT.default.join(e,LT),I$=(e=v())=>{let t=x$(e);if(!gd.default.existsSync(t))return null;try{let r=JSON.parse(gd.default.readFileSync(t,"utf8"));return!$re(r)||typeof r.lastAttemptAt!="string"||r.lastAttemptAt.length===0?null:{lastAttemptAt:r.lastAttemptAt}}catch{return null}},MT=(e=v(),t=Date.now())=>{let r=I$(e);if(r===null)return!0;let o=Date.parse(r.lastAttemptAt);return Number.isFinite(o)?t-o>=xT:!0},jT=(e=v(),t=new Date().toISOString())=>{let r={lastAttemptAt:t},o=x$(e);return gd.default.mkdirSync(OT.default.dirname(o),{recursive:!0}),gd.default.writeFileSync(o,`${JSON.stringify(r,null,2)}
`,"utf8"),r}});var DT,W$=l(()=>{"use strict";ae();NT();DT=async(e,t)=>{if(e.filter(s=>s.reason!=="healthy"&&!s.revived).length===0||!MT())return{attempted:!1,ok:!1,targets:e};jT();let o=await t();if(!o.ok)return{attempted:!0,ok:!1,errorMessage:o.errorMessage,targets:e};let n=await Promise.all(e.map(async s=>{if(s.reason==="healthy"||s.revived)return s;let i=await Ye(s.launchAgentLabel);return{...s,revived:i.ok,...i.errorMessage!==void 0?{errorMessage:i.errorMessage}:{}}}));return{attempted:!0,ok:n.some(s=>s.revived||s.reason==="healthy"),targets:n}}});var O$=l(()=>{"use strict";NT();W$()});var HT=l(()=>{"use strict";Pr()});var M$=l(()=>{"use strict";Pr()});var j$,na,N$,D$,H$,zre,Ure,F$,Bre,Gre,$$,z$=l(()=>{"use strict";j$=require("node:child_process"),na=m(require("node:fs")),N$=m(require("node:os")),D$=m(require("node:path")),H$=require("node:util");HT();M$();Xe();zre=(0,H$.promisify)(j$.execFile),Ure=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),F$=e=>{let t=Je(e),r=t===null?N():N(t);if(!na.default.existsSync(r.configPath))return null;try{let o=JSON.parse(na.default.readFileSync(r.configPath,"utf8"));return!Ure(o)||typeof o.wsUrl!="string"||typeof o.pairingToken!="string"||o.pairingToken.trim().length===0?null:{wsUrl:o.wsUrl,pairingToken:o.pairingToken.trim(),email:typeof o.email=="string"&&o.email.trim().length>0?o.email.trim().toLowerCase():t??void 0}}catch{return null}},Bre=e=>F$(e)?.wsUrl??null,Gre=e=>{let t=Bre(e);return t!==null?$e(t):Fe(e)?.appOrigin??null},$$=async e=>{let t=e?.installDir??v(),r=F$(t),o=r!==null?$e(r.wsUrl):Gre(t);if(o===null||r===null)return{ok:!1,errorMessage:"Could not resolve the linked Mac identity for reinstall. Run the install command from Home first."};let n=new URL(`${o}/install/agent-witch.sh`);n.searchParams.set("token",r.pairingToken),r.email!==void 0&&n.searchParams.set("email",r.email);let s=await fetch(n.toString(),{signal:AbortSignal.timeout(3e4)});if(!s.ok)return{ok:!1,errorMessage:`Failed to download install script (${s.status}).`};let i=D$.default.join(N$.default.tmpdir(),`agent-witch-reinstall-${process.pid}-${Date.now()}.sh`);try{na.default.writeFileSync(i,await s.text(),{encoding:"utf8",mode:448});let a=e?.profileEmail??Je(t),c={...process.env,AGENT_WITCH_SKIP_OPEN_HOME:"1",AGENT_WITCH_WATCHDOG_REINSTALL:"1",...a===null?{}:{AGENT_WITCH_PROFILE:a}};return await zre("bash",[i],{env:c,timeout:18e4,maxBuffer:4*1024*1024}),{ok:!0}}catch(a){return{ok:!1,errorMessage:a instanceof Error?a.message:"AgentWitch reinstall script failed."}}finally{na.default.existsSync(i)&&na.default.unlinkSync(i)}}});var U$={};St(U$,{attemptAgentWitchWatchdogReinstall:()=>Vre});var Vre,B$=l(()=>{"use strict";O$();z$();Vre=async e=>DT(e,()=>$$())});var G$,V$,K$,Kre,qre,Jre,fd,FT=l(()=>{"use strict";b$();TT();ET();RT();vT();wT();Iy();Wy();Xe();Ri();w$();My();G$=e=>e===null?N():N(e),V$=async(e,t,r)=>{if(!await Wn(e))return"not_running";let n=G$(t);if(Kt(n))return"healthy";let s=Ce(n);return ze(s,r)?"stale_connection":"healthy"},K$=async e=>{let t=e?.staleAfterMs??12e4,r=v(),o=ue(r);return Promise.all(o.map(async n=>{let s=await V$(n.launchAgentLabel,n.profileEmail,t),i=G$(n.profileEmail),a=Ce(i),c=await Wn(n.launchAgentLabel);return{launchAgentLabel:n.launchAgentLabel,profileEmail:n.profileEmail,isLaunchAgentRunning:c,connectionHealth:a,isConnectionStale:ze(a,t),needsRevive:s!=="healthy",reason:s}}))},Kre=(e,t)=>{let r=e.filter(n=>n.revived);if(r.length>0)return`Revived ${r.map(n=>n.launchAgentLabel).join(", ")}`;if(t?.reinstallAttempted===!0)return t.reinstallOk===!0?"Reinstalled AgentWitch from install script and retried kickstart.":t.reinstallErrorMessage??"AgentWitch reinstall from install script failed.";let o=e.filter(n=>n.reason!=="healthy"&&!n.revived);return o.length>0?o.map(n=>n.errorMessage??n.launchAgentLabel).join("; "):"All AgentWitch WebSocket connections are healthy."},qre=(e,t,r)=>r?.reinstallAttempted===!0?r.reinstallOk===!0?"reinstall_triggered":"reinstall_failed":e.some(o=>o.revived)?"revive_triggered":t?"check_complete":"revive_failed",Jre=async e=>{let t=await Ye(e.launchAgentLabel),r=t.ok,o=t.errorMessage;if(r)try{let{verifyAgentWitchReviveAfterKickstart:n}=await Promise.resolve().then(()=>(L$(),C$)),s=await n({launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,staleAfterMs:e.staleAfterMs});r=s,s||(o="Connection still stale after kickstart.")}catch{}return{launchAgentLabel:e.launchAgentLabel,profileEmail:e.profileEmail,revived:r,reason:e.reason,...o!==void 0?{errorMessage:o}:{}}},fd=async e=>{if(!Ut())return{ok:!0,targets:[]};let t=e?.staleAfterMs??12e4,r=v();await ra(r),await md(r);let o=ue(r),n=[];for(let u of o){let g=await V$(u.launchAgentLabel,u.profileEmail,t);if(g==="healthy"){n.push({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,revived:!1,reason:g});continue}n.push(await Jre({launchAgentLabel:u.launchAgentLabel,profileEmail:u.profileEmail,reason:g,staleAfterMs:t}))}if(n.length===0){let u=xn();n.push({launchAgentLabel:"direct-spawn",profileEmail:null,revived:u.ok,reason:"not_running",...u.errorMessage!==void 0?{errorMessage:u.errorMessage}:{}})}let s=!1,i=!1,a,c=n;if(n.some(u=>u.reason!=="healthy"&&!u.revived))try{let{attemptAgentWitchWatchdogReinstall:u}=await Promise.resolve().then(()=>(B$(),U$)),g=await u(n);s=g.attempted,i=g.ok,a=g.errorMessage,c=[...g.targets]}catch(u){s=!0,i=!1,a=u instanceof Error?u.message:"Watchdog reinstall helper is unavailable."}let d={ok:c.some(u=>u.revived||u.reason==="healthy"),targets:c,...s?{reinstallAttempted:s,reinstallOk:i,...a!==void 0?{reinstallErrorMessage:a}:{}}:{}};return e?.skipLog!==!0&&R$({event:qre(c,d.ok,{reinstallAttempted:s,reinstallOk:i}),ok:d.ok,message:Kre(c,{reinstallAttempted:s,reinstallOk:i,reinstallErrorMessage:a}),targets:c}),d}});var q$,jy,J$=l(()=>{"use strict";q$=m(require("node:os"));TT();My();FT();jy=async()=>{let e=await K$(),t=e.filter(r=>!r.needsRevive).length;return{ok:t===e.length,hostname:q$.default.hostname(),checkedAt:new Date().toISOString(),staleAfterMs:12e4,healthyProfileCount:t,profiles:e,lastLog:oa(1)[0]??null}}});var $T=l(()=>{"use strict";wT();FT();J$();My()});var yd,hd,Sd,Y$=l(()=>{"use strict";ae();$T();yd=async()=>{await ra();let e=ue(),t=[];for(let r of e){let o=await Ye(r.launchAgentLabel);t.push({launchAgentLabel:r.launchAgentLabel,profileEmail:r.profileEmail,ok:o.ok,...o.errorMessage!==void 0?{errorMessage:o.errorMessage}:{}})}if(!t.some(r=>r.ok)){let r=xn();t.push({launchAgentLabel:"direct-spawn",profileEmail:null,ok:r.ok,...r.errorMessage!==void 0?{errorMessage:r.errorMessage}:{}})}return{ok:t.some(r=>r.ok),kicked:t}},hd=fd,Sd=fd});var zT=l(()=>{"use strict";Y$()});var Dy,Ny,X$,UT,Z$,Yre,Xre,Zre,Qre,eoe,Hy,Q$=l(()=>{"use strict";Dy=require("node:child_process"),Ny=m(require("node:fs")),X$=m(require("node:os")),UT=m(require("node:path")),Z$=require("node:util");ae();G();In();Yre=(0,Z$.promisify)(Dy.execFile),Xre=()=>UT.default.join(X$.default.homedir(),"Library","LaunchAgents"),Zre=async e=>{if(!Lt())return;let t=process.getuid?.();if(t===void 0)return;let r=`gui/${t}/${e}`;await Yre("launchctl",["bootout",r]).catch(()=>{})},Qre=e=>{let t=UT.default.join(Xre(),`${e}.plist`);Ny.default.existsSync(t)&&Ny.default.unlinkSync(t)},eoe=e=>{(0,Dy.spawn)("sh",["-c",`sleep 2 && rm -rf ${JSON.stringify(e)}`],{detached:!0,stdio:"ignore"}).unref()},Hy=async()=>{if(process.platform!=="darwin")return{ok:!1,message:"Local uninstall is only supported on macOS.",removedLaunchAgentLabels:[]};let e=v();if(!Ny.default.existsSync(e))return{ok:!1,message:"No local AgentWitch install directory was found.",removedLaunchAgentLabels:[]};let t=Ur(e);for(let r of t)await Zre(r),Qre(r);return eoe(e),{ok:!0,message:"Local AgentWitch uninstall started. LaunchAgents were stopped and the install folder will be removed shortly.",removedLaunchAgentLabels:t}}});var ez,Fy,tz,sa,rz,toe,roe,ooe,BT,noe,GT,oz=l(()=>{"use strict";ez=require("node:child_process"),Fy=m(require("node:fs")),tz=m(require("node:os")),sa=m(require("node:path")),rz=require("node:util");ae();In();toe=(0,rz.promisify)(ez.execFile),roe=["config.json","device-keypair.json","connection-health.json","pending-run-inputs.json","run-completion-outbox.json"],ooe=["active-profile.json","install-version.json","wake-port.json","link-code.txt","watchdog-reinstall-state.json"],BT=e=>{Fy.default.existsSync(e)&&Fy.default.rmSync(e,{force:!0})},noe=async e=>{if(!Lt())return;let t=process.getuid?.();t===void 0||process.platform!=="darwin"||await toe("launchctl",["bootout",`gui/${t}/${e}`]).catch(()=>{})},GT=async e=>{let r=(e.listLaunchAgentLabels??Ur)(e.layout.installDir),o=e.launchAgentsDir??sa.default.join(tz.default.homedir(),"Library","LaunchAgents"),n=e.bootoutLaunchAgent??noe;for(let i of r)await n(i),BT(sa.default.join(o,`${i}.plist`));let s=sa.default.dirname(e.layout.configPath);for(let i of roe)BT(sa.default.join(s,i));for(let i of ooe)BT(sa.default.join(e.layout.installDir,i));return Fy.default.rmSync(e.layout.appDir,{recursive:!0,force:!0}),{removedLaunchAgentLabels:r}}});var VT,nz=l(()=>{"use strict";VT="unknown_identity"});var KT=l(()=>{"use strict";Iw();nz()});var soe,qT,sz=l(()=>{"use strict";KT();soe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),qT=e=>e.type!=="system.error"||!soe(e.payload)?!1:e.payload.errorCode===VT});var JT=l(()=>{"use strict";Q$();oz();sz()});var $y=l(()=>{"use strict";ae();Pr();JT();$T()});var ia,zy,Uy=l(()=>{"use strict";$y();ia=(e=20)=>oa(e),zy=jy});var By,aa,Gy,Vy=l(()=>{"use strict";$y();By=Vn,aa=(e=20)=>Un(e),Gy=e=>Gn(e)});var Ky,YT=l(()=>{"use strict";$y();Ky=()=>Hy()});var iz=l(()=>{"use strict";gk();rw();kT();zT();Uy();Vy();YT()});var az={};St(az,{buildAgentWitchAutomationStatusFromWakeServer:()=>pd,buildAgentWitchSelfUpdateStatusFromWakeServer:()=>By,buildAgentWitchWakeHealthResponse:()=>Ic,buildAgentWitchWakeIdentityResponse:()=>Wc,buildAgentWitchWatchdogStatus:()=>zy,installHarnessFromWakeServer:()=>Kc,readAgentWitchSelfUpdateLogEntries:()=>aa,readAgentWitchWatchdogLogEntries:()=>ia,restartAgentWitchFromWakeServer:()=>Sd,reviveAgentWitchWebSocketFromWakeServer:()=>hd,runAgentWitchSelfUpdateFromWakeServer:()=>Gy,runAgentWitchUninstallLocalFromWakeServer:()=>Ky,runAutomationFromWakeServer:()=>ud,syncAutomationsFromWakeServer:()=>dd,wakeAgentWitchLaunchAgents:()=>yd});var lz=l(()=>{"use strict";iz()});var cz,dz,XT,ZT,uz=l(()=>{"use strict";cz=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),dz=e=>{let t=typeof e.timestamp=="string"&&e.timestamp.length>0?cz(e.timestamp):"",r=typeof e.message=="string"&&e.message.length>0?cz(e.message):"";return`<li><time>${t}</time><pre>${r}</pre></li>`},XT=e=>{let t=e.watchdogLogs.map(dz).join(""),r=e.updateLogs.map(dz).join("");return`<!doctype html>
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
</html>`},ZT=()=>({"Content-Type":"text/html; charset=utf-8","Content-Security-Policy":"frame-ancestors 'self' https://agentwitch.com https://www.agentwitch.com http://localhost:* http://127.0.0.1:*"})});var pz,mz,gz=l(()=>{"use strict";pz=m(require("node:net")),mz=()=>new Promise((e,t)=>{let r=pz.default.createServer();r.listen(0,"127.0.0.1",()=>{let o=r.address();if(o===null||typeof o=="string"){r.close(()=>{t(new Error("Failed to allocate wake port."))});return}let n=o.port;r.close(s=>{if(s!==void 0){t(s);return}e(n)})}),r.on("error",t)})});var fz,ioe,aoe,QT,yz=l(()=>{"use strict";fz=m(require("node:net"));ae();gz();xc();Lc();Xe();ioe=e=>new Promise(t=>{let r=fz.default.createServer();r.once("error",()=>{t(!1)}),r.listen(e,"127.0.0.1",()=>{r.close(()=>{t(!0)})})}),aoe=e=>new Promise(t=>{setTimeout(t,e)}),QT=async(e={})=>{let t=v(),r=Jt(),o=Math.max(1,e.attempts??10),n=e.retryDelayMs??500;for(let i=1;i<=o;i+=1){if(await ioe(r))return hN(r),r;i<o&&await aoe(n)}let s=await mz();nf(t,s),process.env.AGENT_WITCH_WAKE_PORT=String(s);try{Fl({launchAgentPrefix:ye(t),wakePort:s})}catch(i){console.error(`[agent-witch] Could not update LaunchAgent wake port: ${i instanceof Error?i.message:String(i)}`)}return s}});var loe,eE,hz=l(()=>{"use strict";loe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),eE=e=>({force:loe(e)&&e.force===!0})});var Pd=l(()=>{"use strict";Gc();uz();yz();hz();Nb();fg();Nn()});var tE,U,rE,oE,Ad,Sz=l(()=>{"use strict";tE=async e=>{let t=[];for await(let r of e)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return{}}},U=(e,t,r,o)=>{e.writeHead(t,o),e.end(JSON.stringify(r))},rE=e=>{e.writeHead(403),e.end()},oE=e=>e.url?.split("?")[0]??"/",Ad=(e,t,r=20,o=200)=>{let n=new URL(e.url??t,"http://127.0.0.1"),s=Number.parseInt(n.searchParams.get("limit")??String(r),10);return Number.isFinite(s)&&s>0?Math.min(s,o):r}});var Zt=l(()=>{"use strict";Sz()});var coe,Pz,Az=l(()=>{"use strict";kT();Zt();coe=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Pz=async e=>{if(e.request.method==="GET"&&e.pathname==="/automations/status")return U(e.response,200,pd(),e.cors.headers),!0;if(e.request.method==="POST"&&(e.pathname==="/automations/sync"||e.pathname==="/automations/run")){let t=await coe(e);if(t===null)return!0;if(e.pathname==="/automations/sync"){let o=dd(t);return U(e.response,o.ok?200:400,o,e.cors.headers),!0}let r=await ud(t);return U(e.response,r.ok?200:503,r,e.cors.headers),!0}return!1}});var doe,_z,bz,kz,nE,wz,sE=l(()=>{"use strict";doe=["qwen2.5:7b","qwen2.5:14b","qwen2.5:32b","qwen2.5:3b","llama3.1:8b","llama3.3","llama3.2","mistral","gemma2","phi4","phi3"],_z=e=>/embed|minilm|^bge-/i.test(e),bz=(e,t)=>e===t||e.startsWith(`${t}:`)||e.startsWith(`${t}-`),kz=e=>e.split(`
`).map(t=>t.trim().split(/\s+/)[0]??"").filter(t=>t.length>0&&t!=="NAME"),nE=e=>e.filter(t=>t.trim().length>0&&!_z(t)),wz=(e,t)=>{let r=e.filter(n=>n.trim().length>0&&!_z(n)),o=t?.trim()??"";if(o.length>0){let n=r.find(s=>bz(s,o));if(n!==void 0)return n}for(let n of doe){let s=r.find(i=>bz(i,n));if(s!==void 0)return s}return r[0]??null}});var iE,Rz,vz,qy,Cz,Tz,Ez,uoe,poe,moe,goe,foe,yoe,Qt,bd=l(()=>{"use strict";iE=require("node:child_process"),Rz=m(require("node:fs")),vz=m(require("node:os")),qy=m(require("node:path"));Pr();qt();sE();Cz=3e3,Tz=["claude-cli","codex","cursor","antigravity"],Ez={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},uoe=(e,t)=>new Promise(r=>{let o=(0,iE.spawn)(e,[...t],{stdio:"ignore"}),n=setTimeout(()=>{o.kill("SIGTERM"),r(!1)},Cz);o.on("error",()=>{clearTimeout(n),r(!1)}),o.on("close",s=>{clearTimeout(n),r(s===0)})}),poe=()=>{let e=vz.default.homedir();return["ollama",qy.default.join(e,".local","bin","ollama"),qy.default.join(e,".agent-witch","ollama","ollama"),qy.default.join(e,".local-agent-witch","ollama","ollama")]},moe=e=>new Promise(t=>{let r=(0,iE.spawn)(e,["list"],{stdio:["ignore","pipe","ignore"]}),o=[],n=setTimeout(()=>{r.kill("SIGTERM"),t(null)},Cz);r.stdout.on("data",s=>{o.push(s)}),r.on("error",()=>{clearTimeout(n),t(null)}),r.on("close",s=>{if(clearTimeout(n),s!==0){t(null);return}t(kz(Buffer.concat(o).toString("utf8")))})}),goe=async()=>{for(let e of poe()){if(e!=="ollama"&&!Rz.default.existsSync(e))continue;let t=await moe(e);if(t!==null)return t}return[]},foe=e=>{let t=e.installedWriterIds.map(s=>Ez[s]),r=t.length===0?"No writer CLI is installed.":`Writer CLIs installed: ${t.join(", ")}.`,o=we(e.writerAgent)&&!e.installedWriterIds.includes(e.writerAgent)?`Selected writer ${Ez[e.writerAgent]} is not installed.`:"",n=e.estimateModel===null?"No local chat model is installed.":`Local estimate model: ${e.estimateModel}.`;return[o,r,n].filter(s=>s.length>0).join(" ")},yoe=()=>{let e=process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim()??"";return e.length>0?e:vi},Qt=async e=>{let t=Tz.map(i=>{let a=Ug(i,e.commands);return uoe(a.command,a.args)}),[r,...o]=await Promise.all([goe(),...t]),n=Tz.flatMap((i,a)=>o[a]===!0?[i]:[]),s=wz(r,yoe());return{ollamaModels:r,estimateModel:s,installedWriterIds:n,capabilityNote:foe({writerAgent:e.writerAgent??"",installedWriterIds:n,estimateModel:s})}}});var hoe,Soe,aE,Lz=l(()=>{"use strict";hoe="http://127.0.0.1:11434",Soe=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},aE=async e=>{let t=e.model.trim();if(t.length===0||e.prompt.trim().length===0)return null;let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||hoe;try{let o=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,stream:!1,messages:[{role:"user",content:e.prompt}],options:{temperature:0,num_predict:1200}}),signal:AbortSignal.timeout(12e4)});return o.ok?Soe(await o.json()):null}catch{return null}}});var lE=l(()=>{"use strict";qt();bd();Lz();sE()});var Poe,xz,Iz=l(()=>{"use strict";lE();Poe={"claude-cli":"Claude (terminal)",codex:"Codex (ChatGPT)",cursor:"Cursor",antigravity:"Antigravity"},xz=e=>({writers:e.installedWriterIds.map(t=>({id:t,label:Poe[t]})),ollamaModels:nE(e.ollamaModels)})});var Aoe,Wz,Oz=l(()=>{"use strict";lE();Zt();Iz();Aoe=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Wz=async e=>{if(e.request.method==="GET"&&e.pathname==="/prompt-optimizer/models"){let t=await Qt({commands:Te({})});return U(e.response,200,{ok:!0,...xz({installedWriterIds:t.installedWriterIds,ollamaModels:t.ollamaModels})},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/prompt-optimizer/chat"){let t=await Aoe(e);if(t===null)return!0;let r=typeof t=="object"&&t!==null&&"model"in t&&typeof t.model=="string"?t.model:"",o=typeof t=="object"&&t!==null&&"prompt"in t&&typeof t.prompt=="string"?t.prompt:"",n=await aE({model:r,prompt:o});return n===null?(U(e.response,502,{ok:!1,errorMessage:"Ollama did not reply."},e.cors.headers),!0):(U(e.response,200,{ok:!0,text:n},e.cors.headers),!0)}return!1}});var boe,Mz,jz=l(()=>{"use strict";rw();Zt();boe=async e=>{let t=[];for await(let r of e.request)t.push(Buffer.from(r));if(t.length===0)return{};try{return JSON.parse(Buffer.concat(t).toString("utf8"))}catch{return U(e.response,400,{ok:!1,errorMessage:"Invalid JSON body."},e.cors.headers),null}},Mz=async e=>{if(e.request.method==="POST"&&(e.pathname==="/harness/install"||e.pathname==="/harness/borrow")){let t=await boe(e);if(t===null)return!0;let r=Kc(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}return!1}});var Nz=l(()=>{"use strict";Wt()});var cE,Dz=l(()=>{"use strict";Nz();Vc();cE=e=>{if(!Yr(e))return{ok:!1,errorMessage:"Invalid JSON body."};let t=typeof e.projectFolderPath=="string"?e.projectFolderPath.trim():"";return t.length===0?{ok:!1,errorMessage:"projectFolderPath is required."}:{ok:!0,projectFolderPath:it({projectFolderPath:t,...typeof e.projectId=="string"?{projectId:e.projectId}:{},...typeof e.projectName=="string"?{projectName:e.projectName}:{}}).layout.projectFolderPath}}});var Hz,dE,uE=l(()=>{"use strict";ee();Wt();Vc();Hz=e=>{if(!Yr(e))return null;let t=typeof e.projectId=="string"?e.projectId.trim():"";return t.length===0?null:{projectId:t}},dE=async e=>{let t=Hz(e);if(t===null)return{ok:!1,errorMessage:"projectId is required."};if(process.platform!=="darwin")return{ok:!1,errorMessage:"Folder picker is only available on macOS."};let r=qo("Choose a folder for this AgentWitch project");if(r===null)return{ok:!1,cancelled:!0};let o=$();if(o===null)return{ok:!1,errorMessage:"AgentWitch is not configured on this computer."};let n=V({wsUrl:o.wsUrl,pairingToken:o.pairingToken});return n===null?{ok:!1,errorMessage:"Could not resolve AgentWitch cloud connection."}:(it({projectFolderPath:r}),await Qc(n,t.projectId,r)?{ok:!0,project:{id:t.projectId,folderPath:r}}:{ok:!1,errorMessage:"Could not save the folder to AgentWitch Cloud."})}});var Fz=l(()=>{"use strict";Dz();uE()});var $z,zz=l(()=>{"use strict";Fz();uE();Zt();$z=async e=>{if(e.request.method!=="POST")return!1;if(e.pathname==="/projects/ensure"){let t=await e.readJsonBody(),r=cE(t);return U(e.response,r.ok?200:400,r,e.cors.headers),!0}if(e.pathname==="/projects/select-folder"){let t=await e.readJsonBody(),r=await dE(t),o=r.ok||"cancelled"in r&&r.cancelled?200:400;return U(e.response,o,r,e.cors.headers),!0}return!1}});var Uz,Bz=l(()=>{"use strict";Pd();Vy();Uy();Uz=e=>{if(e.request.method!=="GET"||e.pathname!=="/local")return!1;let t=ia(50),r=aa(50);return e.response.writeHead(200,ZT()),e.response.end(XT({port:e.wakePort,watchdogLogs:t,updateLogs:r})),!0}});var Gz,Vz=l(()=>{"use strict";gk();Zt();Gz=e=>e.request.method==="GET"&&e.pathname==="/health"?(U(e.response,200,Ic(),e.cors.headers),!0):e.request.method==="GET"&&e.pathname==="/identity"?(U(e.response,200,Wc(),e.cors.headers),!0):!1});var Kz,qz=l(()=>{"use strict";YT();Zt();Kz=async e=>{if(e.request.method!=="POST"||e.pathname!=="/install/delete")return!1;let t=await Ky();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}});var Jz,Yz=l(()=>{"use strict";zT();Zt();Jz=async e=>{if(e.request.method==="POST"&&e.pathname==="/watchdog/revive"){let t=await hd();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/restart"){let t=await Sd();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/wake"){let t=await yd();return U(e.response,t.ok?200:503,t,e.cors.headers),!0}return!1}});var Xz,Zz=l(()=>{"use strict";Pd();Vy();Zt();Xz=async e=>{if(e.request.method==="GET"&&e.pathname==="/update/status"){let t=By();return U(e.response,200,{ok:!0,...t},e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/update/logs"){let t=Ad(e.request,"/update/logs",20,200);return U(e.response,200,{ok:!0,logs:aa(t)},e.cors.headers),!0}if(e.request.method==="POST"&&e.pathname==="/update/run"){let t=await e.readJsonBody(),{force:r}=eE(t),o=await Gy({force:r});return U(e.response,o.ok?200:503,o,e.cors.headers),!0}return!1}});var Qz,eU=l(()=>{"use strict";Uy();Zt();Qz=async e=>{if(e.request.method==="GET"&&e.pathname==="/watchdog/status"){let t=await zy();return U(e.response,200,t,e.cors.headers),!0}if(e.request.method==="GET"&&e.pathname==="/watchdog/logs"){let t=Ad(e.request,"/watchdog/logs",20,200);return U(e.response,200,{ok:!0,logs:ia(t)},e.cors.headers),!0}return!1}});var tU,rU=l(()=>{"use strict";Az();Oz();jz();zz();Bz();Vz();qz();Yz();Zz();eU();tU=[Gz,Uz,Qz,Jz,Xz,Kz,Mz,$z,Pz,Wz]});var oU,nU=l(()=>{"use strict";rU();oU=async e=>{for(let t of tU)if(await t(e))return!0;return!1}});var _oe,sU,iU=l(()=>{"use strict";Gc();Zt();nU();_oe=(e,t,r,o)=>({request:e,response:t,wakePort:r,cors:o,pathname:oE(e),readJsonBody:()=>tE(e)}),sU=async(e,t,r)=>{let o=e.headers.origin,n=jf(o);try{if(o!==void 0&&o.length>0&&!n.allowed){rE(t);return}if(e.method==="OPTIONS"){t.writeHead(204,n.headers),t.end();return}let s=_oe(e,t,r,n);if(await oU(s))return;U(t,404,{ok:!1,errorMessage:"Not found."},n.headers)}catch{U(t,500,{ok:!1,errorMessage:"Wake server error."},n.headers)}}});var aU,us,Jy,Yy=l(()=>{"use strict";aU=m(require("node:http"));Pd();iU();us=async()=>{let e=await QT(),t=aU.default.createServer((r,o)=>{sU(r,o,e)});return await new Promise((r,o)=>{t.once("error",o),t.listen(e,"127.0.0.1",()=>{r()})}),process.stdout.write(`AgentWitch wake server listening on http://127.0.0.1:${e}
`),t},Jy=us});var lU={};St(lU,{runAgentWitchBridgeCli:()=>koe});var koe,cU=l(()=>{"use strict";ae();Yy();koe=async()=>{bt("agent-witch-bridge");let e=await us(),t=Gr(()=>{process.stdout.write(`[agent-witch-bridge] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)}});var dU=l(()=>{"use strict";At()});var la,pE,uU=l(()=>{"use strict";la=(e,t,r)=>e===1?t:r,pE=(e,t=Date.now())=>{if(e===null)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let o=Math.max(0,t-r);if(o<6e4)return"just now";let n=Math.floor(o/6e4);if(n<60)return`${n} ${la(n,"min","mins")} ago`;let s=Math.floor(o/36e5),i=Math.floor(o%36e5/6e4);if(s<24)return i===0?`${s}h ago`:`${s}h ${i} ${la(i,"min","mins")} ago`;let a=Math.floor(o/864e5);if(a<7)return`${a} ${la(a,"day","days")} ago`;let c=Math.floor(a/7);if(c<5)return`${c} ${la(c,"week","weeks")} ago`;let d=Math.floor(a/30);if(d<12)return`${d} ${la(d,"month","months")} ago`;let u=Math.floor(a/365);return`${u} ${la(u,"year","years")} ago`}});var ps,mE,woe,Toe,gE,Zo,_d,fE,pU=l(()=>{"use strict";ps=m(require("node:fs")),mE=m(require("node:path")),woe="local-ws-traffic.ndjson",Toe=500,gE=e=>mE.default.join(e.logsDir,woe),Zo=(e,t)=>{let r=gE(e);ps.default.mkdirSync(mE.default.dirname(r),{recursive:!0});let o=JSON.stringify({at:t.at??new Date().toISOString(),direction:t.direction,type:t.type,summary:t.summary,...t.action!==void 0?{action:t.action}:{}});ps.default.appendFileSync(r,`${o}
`,"utf8")},_d=(e,t=Toe)=>{let r=gE(e);if(!ps.default.existsSync(r))return[];let n=ps.default.readFileSync(r,"utf8").split(`
`).filter(Boolean).slice(-t),s=[];for(let i of n)try{let a=JSON.parse(i);typeof a=="object"&&a!==null&&"at"in a&&"direction"in a&&"type"in a&&"summary"in a&&s.push(a)}catch{}return s.reverse()},fE=e=>{let t=gE(e);ps.default.existsSync(t)&&ps.default.writeFileSync(t,"","utf8")}});var Eoe,mU,gU,fU=l(()=>{"use strict";KT();Eoe=new Set(Object.values(Xf)),mU=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),gU=e=>{if(!mU(e))return{formatOk:!1,formatError:"not_object",command:"<invalid>",type:"<invalid>",requestId:null,parsed:null};let t=e.type;if(typeof t!="string")return{formatOk:!1,formatError:"missing_type",command:"<invalid>",type:"<invalid>",requestId:null,parsed:e};if(!Eoe.has(t))return{formatOk:!1,formatError:"unknown_type",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.payload!==void 0&&!mU(e.payload))return{formatOk:!1,formatError:"invalid_payload",command:t,type:t,requestId:typeof e.requestId=="string"?e.requestId:null,parsed:e};if(e.requestId!==void 0&&typeof e.requestId!="string")return{formatOk:!1,formatError:"invalid_request_id",command:t,type:t,requestId:null,parsed:e};let r=typeof e.requestId=="string"?e.requestId:null;return{formatOk:!0,formatError:null,command:t,type:t,requestId:r,parsed:e}}});var yU,hU=l(()=>{"use strict";yU=(e,t=4,r=4)=>{let o=e.length;return o===0?"***":o<=t+r?`${e.slice(0,t)}***`:`${e.slice(0,t)}***${e.slice(o-r)}`}});var Roe,voe,Coe,kd,SU=l(()=>{"use strict";hU();Roe=/(token|secret|password|authorization|apikey|api_key|cookie|attestation|signature|privatekey|private_key|pairing)/i,voe=e=>Roe.test(e),Coe=e=>yU(e),kd=e=>{if(e==null||typeof e=="string")return e;if(Array.isArray(e))return e.map(o=>kd(o));if(typeof e!="object")return e;let t=e,r={};for(let[o,n]of Object.entries(t)){if(typeof n=="string"&&voe(o)){r[o]=Coe(n);continue}r[o]=kd(n)}return r}});var Rr,yE,Loe,xoe,Ioe,hE,PU,AU,bU,Woe,Xy,ms,Zy,SE,_U=l(()=>{"use strict";Rr=m(require("node:fs")),yE=m(require("node:path"));fU();SU();Loe="local-ws-trace.ndjson",xoe=1e4,Ioe=1440*60*1e3,hE=e=>yE.default.join(e.logsDir,Loe),PU=e=>{try{let t=JSON.parse(e);return typeof t!="object"||t===null||!("at"in t)||!("direction"in t)||!("command"in t)?null:t}catch{return null}},AU=e=>{if(!Rr.default.existsSync(e))return;let t=Rr.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=Date.now()-Ioe,n=t.filter(s=>{let i=PU(s);if(i===null)return!1;let a=Date.parse(i.at);return Number.isFinite(a)&&a>=r}).slice(-xoe);Rr.default.writeFileSync(e,n.length>0?`${n.join(`
`)}
`:"","utf8")},bU=(e,t)=>{let r=hE(e);Rr.default.mkdirSync(yE.default.dirname(r),{recursive:!0}),Rr.default.appendFileSync(r,`${JSON.stringify(t)}
`,"utf8"),AU(r)},Woe=e=>e.parsed===null?{_empty:!0}:kd(e.parsed),Xy=(e,t,r)=>{let o=gU(r);bU(e,{at:new Date().toISOString(),direction:t,kind:"ws_message",command:o.command,type:o.type,requestId:o.requestId,formatOk:o.formatOk,formatError:o.formatError,body:Woe(o)})},ms=(e,t)=>{bU(e,{at:new Date().toISOString(),direction:"local",kind:t.kind,command:t.kind,type:t.kind,requestId:null,formatOk:!0,formatError:null,body:kd({message:t.message,...t.stack!==void 0?{stack:t.stack}:{},...t.code!==void 0?{code:t.code}:{},...t.reason!==void 0?{reason:t.reason}:{}})})},Zy=(e,t=80)=>{let r=hE(e);if(AU(r),!Rr.default.existsSync(r))return[];let o=Rr.default.readFileSync(r,"utf8").split(`
`).filter(Boolean),n=[];for(let s of o.slice(-t)){let i=PU(s);i!==null&&n.push(i)}return n.reverse()},SE=e=>{let t=hE(e);Rr.default.existsSync(t)&&Rr.default.writeFileSync(t,"","utf8")}});var Qo,kU,Ooe,PE,Qy,wU=l(()=>{"use strict";Qo=m(require("node:fs")),kU=m(require("node:path")),Ooe=256e3,PE=e=>{Qo.default.mkdirSync(kU.default.dirname(e),{recursive:!0}),Qo.default.writeFileSync(e,"","utf8")},Qy=(e,t=Ooe)=>{if(!Qo.default.existsSync(e))return{content:"",exists:!1,truncated:!1,byteSize:0};let r=Qo.default.statSync(e);if(!r.isFile())return{content:"",exists:!1,truncated:!1,byteSize:0};let o=r.size;if(o===0)return{content:"",exists:!0,truncated:!1,byteSize:0};let n=Math.max(0,o-t),s=o-n,i=Buffer.alloc(s),a=Qo.default.openSync(e,"r");try{Qo.default.readSync(a,i,0,s,n)}finally{Qo.default.closeSync(a)}let c=i.toString("utf8");if(n>0){let d=c.indexOf(`
`);d>=0&&(c=c.slice(d+1))}return{content:c,exists:!0,truncated:n>0,byteSize:o}}});var wd=l(()=>{"use strict";pU();_U();wU()});var AE,bE,TU=l(()=>{"use strict";AE=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),bE=e=>{let t=e.truncated?'<p class="alert-warn">Showing the last portion of a large log file.</p>':"",r=e.cleared===!0?'<div class="alert-success">Error log cleared.</div>':"",o=e.exists&&e.content.length>0?`<pre class="error-log-view">${AE(e.content)}</pre>`:e.exists?'<p class="empty">Error log exists but is empty.</p>':`<p class="empty">No error log yet. When the Mac client crashes or writes stderr, entries appear in <code>${AE(e.errorLogPath)}</code>.</p>`;return`${r}<section class="card">
      <p class="eyebrow">Diagnostics</p>
      <h1>Error log</h1>
      <p class="lede">Tail of the AgentWitch client stderr log on this computer (newest lines at the bottom). New entries are prefixed with a UTC timestamp (<code>YYYY-MM-DDTHH:MM:SSZ</code>).</p>
      <p class="muted mono">${AE(e.errorLogPath)} \xB7 ${e.byteSize.toLocaleString("en-US")} bytes</p>
      ${t}
      ${o}
      <form method="POST" action="/api/errors/clear" class="actions" style="margin-bottom:12px">
        <button class="btn btn-ghost" type="submit">Clear error log</button>
      </form>
      <div class="actions">
        <a class="btn btn-secondary" href="/">\u2190 Home</a>
        <a class="btn btn-secondary" href="/errors">Refresh</a>
      </div>
    </section>`}});var EU=l(()=>{"use strict";TU()});var _E,kE=l(()=>{"use strict";_E=(e,t=Date.now())=>{if(e===null)return"never";let r=new Date(e).getTime();if(Number.isNaN(r))return"unknown";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return`${o}s`;let n=Math.floor(o/60),s=o%60;if(n<60)return s>0?`${n}m ${s}s`:`${n}m`;let i=Math.floor(o/3600),a=Math.floor(o%3600/60);return a>0?`${i}h ${a}m`:`${i}h`}});var wE=l(()=>{"use strict";mc()});var TE,EE,RU=l(()=>{"use strict";wE();TE=(e,t=12e4,r=Date.now())=>{if(e===null)return!0;let o=Date.parse(e);return Number.isNaN(o)?!0:r-o>t},EE=e=>e.lastHeartbeatAt===null?"No heartbeat yet":e.heartbeatIsStale?"Stale":"Fresh"});var vU=l(()=>{"use strict";kE();RU()});var CU,Td,RE,Ed=l(()=>{"use strict";kE();CU=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Td=e=>{if(e===null)return'<span class="js-heartbeat-elapsed">never</span>';let t=CU(e),r=CU(_E(e));return`<span class="js-heartbeat-elapsed" data-heartbeat-at="${t}">${r}</span>`},RE=`(function () {
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
})();`});var gs,Moe,vE,LU=l(()=>{"use strict";gs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Moe=e=>{try{return JSON.stringify(e,null,2)}catch{return String(e)}},vE=e=>e.entries.length===0?`<section class="card">
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
          <tbody>${e.entries.map((r,o)=>{let n=r.formatOk?'<span class="badge badge-online">OK</span>':`<span class="badge badge-warn">${gs(r.formatError??"bad")}</span>`,s=r.kind==="ws_message"?gs(r.direction):gs(r.kind),i=`trace-body-${o}`,a=gs(Moe(r.body));return`<tr>
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
    </section>`});var xU,joe,eh,Noe,CE,IU=l(()=>{"use strict";Al();He();At();xU=e=>{let t=e.replace(/\/$/,""),r=t.lastIndexOf("/");return r===-1?t:t.slice(r+1)},joe=e=>xU(e)===$r?oi:ri,eh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Noe=(e,t)=>`${t?`<h3>${eh(e.label)}</h3>`:""}
    <p class="muted">${eh(e.instructions)}</p>
    <pre class="sdlc-pre mono">${eh(e.command)}</pre>
    <p class="muted">${eh(e.note)}</p>`,CE=e=>{let t=Pl({platform:En(e.platform),installDirName:xU(e.installDir),launchAgentPrefix:joe(e.installDir)}),r=t.length>1;return`<section class="card">
    <p class="eyebrow">AgentWitch Local</p>
    <h2>Revive local app (:${43347})</h2>
    <p class="lede muted">If this page loaded but the prompt optimizer or other Live pages fail, or if AgentWitch Cloud cannot open Status, restart the AgentWitch client on this computer.</p>${r?`
    <p class="muted">Use the command for this computer's operating system.</p>`:""}
    ${t.map(n=>Noe(n,r)).join(`
    `)}
  </section>`}});var LE,WU=l(()=>{"use strict";Al();LE=e=>En(e)==="mac"?"Revive requested. The bridge will reconnect if this Mac can reach launchd.":"Revive requested. The bridge will reconnect when this computer can reach AgentWitch Cloud."});var OU=l(()=>{"use strict";Ed();LU();IU();WU();Ed()});var Doe,so,Rd=l(()=>{"use strict";Doe=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]"),so=Doe});var MU,jU,NU,DU,HU,FU,$U,ca=l(()=>{"use strict";MU="projects",jU="knowledge",NU="chunks.ndjson",DU="lessons.ndjson",HU="error-chunks.ndjson",FU="usage-stats.json",$U="knowledge-location.json"});var th,Hoe,rh,xE=l(()=>{"use strict";th=m(require("node:path"));ca();Hoe=(e,t)=>{let r=t.trim(),o=th.default.join(e.installDir,MU,r,jU);return{projectId:r,knowledgeDirPath:o,ragChunksFilePath:th.default.join(o,NU),memoryRunsFilePath:th.default.join(o,DU)}},rh=Hoe});var IE,Foe,zU,UU=l(()=>{"use strict";IE=m(require("node:fs"));ca();es();Foe=e=>{let t=xt(e.projectFolderPath),r=`${t.metaDirPath}/${$U}`,o={schemaVersion:1,projectId:e.projectId,message:"Project knowledge (RAG + memory) is stored under your AgentWitch profile, keyed by projectId.",profileKnowledgePath:`projects/${e.projectId}/knowledge`};IE.default.mkdirSync(t.metaDirPath,{recursive:!0}),IE.default.writeFileSync(r,`${JSON.stringify(o,null,2)}
`)},zU=Foe});var da,GU,BU,$oe,VU,KU=l(()=>{"use strict";da=m(require("node:fs")),GU=m(require("node:path"));Wo();es();xE();UU();BU=(e,t)=>{da.default.existsSync(e)&&(da.default.existsSync(t)&&da.default.statSync(t).size>0||(da.default.mkdirSync(GU.default.dirname(t),{recursive:!0}),da.default.copyFileSync(e,t)))},$oe=e=>{let t=xt(e.projectFolderPath),r=rh(e.layout,e.projectId),o=`${t.memoryDirPath}/${fi}`;BU(t.ragChunksFilePath,r.ragChunksFilePath),BU(o,r.memoryRunsFilePath),zU({projectFolderPath:e.projectFolderPath,projectId:e.projectId})},VU=$oe});var qU,zoe,ua,oh=l(()=>{"use strict";qU=m(require("node:path"));Wo();es();KU();yw();xE();zoe=e=>{let t=e.projectFolderPath?.trim()??"";if(t.length===0)return null;let r=Uf(t),o=e.projectId?.trim()||r.projectId?.trim()||"";if(o.length>0){VU({layout:e.layout,projectFolderPath:t,projectId:o});let s=rh(e.layout,o);return{ragChunksFilePath:s.ragChunksFilePath,memoryRunsFilePath:s.memoryRunsFilePath,projectId:o}}let n=xt(t);return{ragChunksFilePath:n.ragChunksFilePath,memoryRunsFilePath:qU.default.join(n.memoryDirPath,fi),projectId:null}},ua=zoe});var nh,Boe,sh,WE=l(()=>{"use strict";nh=m(require("node:fs"));ca();Boe=(e,t=500)=>{if(!nh.default.existsSync(e))return;let r=nh.default.readFileSync(e,"utf8").split(`
`).filter(Boolean);if(r.length<=t)return;let o=r.slice(r.length-t);nh.default.writeFileSync(e,`${o.join(`
`)}
`)},sh=Boe});var ih,Goe,fs,OE=l(()=>{"use strict";ih=m(require("node:path"));ca();oh();Goe=e=>{let t=ua(e);if(t===null)return null;let r=ih.default.dirname(t.ragChunksFilePath);return{knowledgeDirPath:r,usageStatsFilePath:ih.default.join(r,FU),errorChunksFilePath:ih.default.join(r,HU)}},fs=Goe});var YU,vd,XU,JU,ME,ZU,qoe,jE,QU,NE,DE,HE,FE=l(()=>{"use strict";YU=require("node:crypto"),vd=m(require("node:fs")),XU=m(require("node:path"));Rd();ca();OE();JU=()=>({schemaVersion:1,chunkRetrievalCounts:{},errorOccurrences:{},linkedToolByChunkId:{}}),ME=e=>{if(!vd.default.existsSync(e))return JU();try{let t=JSON.parse(vd.default.readFileSync(e,"utf8"));if(typeof t=="object"&&t!==null&&t.schemaVersion===1){let r=t;return{schemaVersion:1,chunkRetrievalCounts:r.chunkRetrievalCounts??{},errorOccurrences:r.errorOccurrences??{},linkedToolByChunkId:r.linkedToolByChunkId??{}}}}catch{}return JU()},ZU=(e,t)=>{vd.default.mkdirSync(XU.default.dirname(e),{recursive:!0}),vd.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},qoe=e=>{let t=so(e).trim(),o=(t.split(`
`)[0]?.trim()??t).slice(0,500);return(0,YU.createHash)("sha256").update(o).digest("hex").slice(0,16)},jE=e=>{let t=fs(e);return t===null?null:ME(t.usageStatsFilePath)},QU=e=>{if(e.chunkIds.length===0)return;let t=fs(e);if(t===null)return;let r=ME(t.usageStatsFilePath),o={...r.chunkRetrievalCounts};for(let n of e.chunkIds)o[n]=(o[n]??0)+1;ZU(t.usageStatsFilePath,{...r,chunkRetrievalCounts:o})},NE=e=>{let t=e.errorText.trim();if(t.length===0)return null;let r=fs(e);if(r===null)return null;let o=qoe(t),n=ME(r.usageStatsFilePath),s=n.errorOccurrences[o],i=t.split(`
`)[0]?.trim().slice(0,200)??t.slice(0,200);return ZU(r.usageStatsFilePath,{...n,errorOccurrences:{...n.errorOccurrences,[o]:{count:(s?.count??0)+1,lastSeenAt:new Date().toISOString(),preview:i}}}),o},DE=(e,t)=>e===null?0:e.chunkRetrievalCounts[t]??0,HE=e=>{if(e===null)return[];let t=[];for(let[r,o]of Object.entries(e.chunkRetrievalCounts))o<10||e.linkedToolByChunkId[r]===void 0&&t.push({kind:"frequent_rag_without_tool",priority:1,hitCount:o,chunkId:r,message:`Knowledge chunk "${r}" was injected ${o} times without a dedicated tool. Consider generating a capability tool and wiring the workflow to call it (saves repeated context).`});for(let[r,o]of Object.entries(e.errorOccurrences))o.count<3||(t.push({kind:"recurring_error_tool",priority:1,hitCount:o.count,errorFingerprint:r,message:`Error "${o.preview}" occurred ${o.count} times. First priority: add a tool or capability step that prevents it.`}),t.push({kind:"recurring_error_rule",priority:2,hitCount:o.count,errorFingerprint:r,message:`Same error (${o.count}\xD7): if a tool is not feasible, add a harness rule or workflow guard so the agent stops repeating it.`}));return t.sort((r,o)=>r.priority-o.priority||o.hitCount-r.hitCount)}});var Cd,e1,Joe,Yoe,t1,Xoe,$E,Ld,pa,zE,ma,UE,BE=l(()=>{"use strict";Cd=m(require("node:fs")),e1=m(require("node:path"));Rd();oh();WE();FE();Joe="http://127.0.0.1:11434",Yoe="nomic-embed-text",t1=(e,t,r)=>ua({layout:e,projectFolderPath:t,projectId:r})?.ragChunksFilePath??null,Xoe=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},$E=(e,t=800)=>{let r=e.trim();if(r.length===0)return[];let o=[],n=0;for(;n<r.length;)o.push(r.slice(n,n+t)),n+=t;return o},Ld=async e=>{let t=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||Joe,r=process.env.AGENT_WITCH_EMBED_MODEL?.trim()||Yoe;try{let o=await fetch(`${t}/api/embeddings`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:r,prompt:e})});if(!o.ok)return null;let n=await o.json();return typeof n=="object"&&n!==null&&"embedding"in n&&Array.isArray(n.embedding)?n.embedding:null}catch{return null}},pa=(e,t,r)=>{let o=t1(e,t,r);if(o===null||!Cd.default.existsSync(o))return[];let n=Cd.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},zE=async e=>{let t=so(e.text),r=$E(t);if(r.length===0)return 0;let o=t1(e.layout,e.projectFolderPath,e.projectId);if(o===null)return 0;Cd.default.mkdirSync(e1.default.dirname(o),{recursive:!0});let n=0;for(let s of r){let i=await Ld(s);if(i===null)continue;let a={id:`${Date.now()}-${n}`,text:s,embedding:i,createdAt:new Date().toISOString(),...e.source!==void 0?{source:e.source}:{}};Cd.default.appendFileSync(o,`${JSON.stringify(a)}
`,"utf8"),n+=1}return sh(o),n},ma=async e=>{let t=await Ld(e.query);if(t===null)return[];let r=e.minScore??0,s=pa(e.layout,e.projectFolderPath,e.projectId).map(i=>({chunk:i,score:Xoe(t,i.embedding)})).filter(i=>i.score>=r).sort((i,a)=>a.score-i.score).slice(0,e.limit??5).map(i=>i.chunk);return QU({layout:e.layout,chunkIds:s.map(i=>i.id),projectFolderPath:e.projectFolderPath,projectId:e.projectId}),s},UE=e=>e.length===0?"":`Local knowledge (from this computer):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var xd,r1,Zoe,Qoe,GE,VE,KE,o1=l(()=>{"use strict";xd=m(require("node:fs")),r1=m(require("node:path"));Rd();OE();WE();BE();Zoe=e=>{if(!xd.default.existsSync(e))return[];let t=xd.default.readFileSync(e,"utf8").split(`
`).filter(Boolean),r=[];for(let o of t)try{r.push(JSON.parse(o))}catch{}return r},Qoe=(e,t)=>{let r=Math.min(e.length,t.length),o=0,n=0,s=0;for(let i=0;i<r;i+=1){let a=e[i]??0,c=t[i]??0;o+=a*c,n+=a*a,s+=c*c}return n===0||s===0?0:o/(Math.sqrt(n)*Math.sqrt(s))},GE=async e=>{let t=fs(e);if(t===null)return 0;let r=so(e.text),o=$E(r,600);if(o.length===0)return 0;let n=t.errorChunksFilePath;xd.default.mkdirSync(r1.default.dirname(n),{recursive:!0});let s=0;for(let i of o.slice(0,3)){let a=await Ld(i);if(a===null)continue;let c={id:`err-${Date.now()}-${s}`,text:i,embedding:a,createdAt:new Date().toISOString(),source:e.source??"run.failure"};xd.default.appendFileSync(n,`${JSON.stringify(c)}
`,"utf8"),s+=1}return sh(n,200),s},VE=async e=>{let t=fs(e);if(t===null)return[];let r=await Ld(e.query);if(r===null)return[];let o=e.minScore??.3;return Zoe(t.errorChunksFilePath).map(s=>({chunk:s,score:Qoe(r,s.embedding)})).filter(s=>s.score>=o).sort((s,i)=>i.score-s.score).slice(0,e.limit??3).map(s=>s.chunk)},KE=e=>e.length===0?"":`Past failures on this computer (avoid repeating):

${e.map((r,o)=>`[${o+1}] ${r.text}`).join(`

`)}

---

`});var qE=l(()=>{"use strict";BE();FE();o1()});var We,JE,YE=l(()=>{"use strict";xw();We=Lw,JE=`
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
`.trim()});var ene,tne,XE,n1,ZE,s1=l(()=>{"use strict";YE();Ed();ene=`<svg class="brand-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="brand-mark-outline" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-fill" d="M12 2L2 12l10 10 10-10L12 2z" />
  <path class="brand-mark-cross" d="M12 6v12m-6-6h12" stroke-linecap="round" />
  <path class="brand-mark-slash" d="M15.5 8.5l-7 7" stroke-linecap="round" />
</svg>`,tne=[{href:"/",label:"Home"},{href:"/task",label:"Task"},{href:"/prompt-optimizer",label:"Prompt optimizer"},{href:"/status",label:"Status"},{href:"/projects",label:"Projects"},{href:"/harness",label:"Harness"},{href:"/writer-api",label:"Writer API"},{href:"/knowledge",label:"Knowledge"},{href:"/history",label:"History"},{href:"/writer-sessions",label:"Transcripts"},{href:"/errors",label:"Errors"},{href:"/traffic",label:"Traffic"}],XE=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),n1=(e,t)=>`<a class="${e}" href="/" aria-label="AgentWitch Local home, install bundle ${t}">${ene}<span class="brand-text">AgentWitch<span class="brand-sub">Local(${t})</span></span></a>`,ZE=e=>{let t=tne.map(a=>{let c=a.href===e.activePath;return`<a class="nav-link${c?" is-active":""}" href="${a.href}"${c?' aria-current="page"':""}>${a.label}</a>`}).join(""),r=XE(e.cloudAppOrigin),o=e.headerUpdateButtonHtml??"",n=XE(e.installBundleVersionLabel?.trim()??"unknown"),s=n1("brand brand-in-sidebar",n),i=n1("brand brand-in-header",n);return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <title>${XE(e.title)} \xB7 AgentWitch Local</title>
  <style>${JE}</style>
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
  <script>${RE}</script>
</body>
</html>`}});var ah,Id,lh=l(()=>{"use strict";ah=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Id=e=>{let t=e.syncOk===!1?"local-cloud-banner local-cloud-banner-warn":"local-cloud-banner",r=e.syncMessage!==void 0&&e.syncMessage!==null&&e.syncMessage.length>0?`<p class="local-cloud-banner-sync">${ah(e.syncMessage)}</p>`:"",o=ah(e.manageHref),n=ah(e.manageLabel);return`<div class="${t}">
      <p class="local-cloud-banner-lede">${ah(e.body)}</p>
      ${r}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${o}" target="_blank" rel="noopener noreferrer">${n} \u2197</a></p>
    </div>`}});var QE,eR,tR,i1=l(()=>{"use strict";QE=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`,eR=e=>!e.updateAvailable||e.remoteBundleVersion===null?"":`<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer AgentWitch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`,tR=e=>e==="ok"?'<div class="alert-success">Update finished. This computer may restart the AgentWitch client.</div>':e==="started"?'<div class="alert-success">Install bundle update started. This page may disconnect briefly while the Mac client restarts.</div>':e==="failed"?'<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>':""});var a1=l(()=>{"use strict";s1();lh();i1()});var ga,rR,l1=l(()=>{"use strict";Ed();ga=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rR=e=>{let t=e.wsConnected?'<span class="badge badge-online">Connected to cloud</span>':'<span class="badge badge-offline">Not connected</span>',r=e.harnessSetCount>0?`${e.harnessSetCount} set(s) installed \u2014 apply to a project or import more`:"Scan local .cursor folders and install rules on this computer",o=e.knowledgeChunkCount>0?`${e.knowledgeChunkCount} embedded chunk(s) from past runs`:"Search what your agents remembered on this computer",n=e.trafficEntryCount>0?`${e.trafficEntryCount} recent frame(s) logged`:"Inspect WebSocket frames when debugging",s=e.errorLogExists?e.errorLogByteSize>0?`${e.errorLogByteSize.toLocaleString("en-US")} bytes in agent-witch.error.log`:"Error log file is empty":"No error log file yet",i=e.wakeError?`<div class="alert-error">${ga(e.wakeError)}</div>`:"",a=Td(e.lastHeartbeatAt);return`${i}<section class="card home-hero">
      <p class="eyebrow">This computer</p>
      <h1>AgentWitch local</h1>
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
    </div>`}});var c1=l(()=>{"use strict";l1()});var L,fa=l(()=>{"use strict";L=e=>e==="passed"||e==="stopped"||e==="failed"});var d1,oR,ys,nR,ch=l(()=>{"use strict";d1="Stopped at the round limit. The best prompt is kept.",oR="Stopped because the score stopped rising. The best prompt is kept.",ys="Finished. The best prompt is the result.",nR="Wizard ended. Progress from finished steps is kept."});var en,sR=l(()=>{"use strict";en=e=>{let t=e.avoid?.trim()??"",r=t.length===0?[]:["","Avoid:",t,"","Do not repeat anything in Avoid."],o=e.instructions?.trim()??"",n=o.length===0?[]:["","Instructions:",o];return["You improve prompts.","Do not edit files. Do not run tools. Do not score the prompt.","Reply with only the improved prompt text, no commentary.","","Goal:",e.goal.trim(),...n,"","Current prompt:","This is the highest scoring version so far. Start from it.",e.promptText.trim(),"",`Judge score: ${e.score}`,"Judge reasons:",e.reasons.trim(),...r,"","The score describes the changes, the tokens used, and the delay. A token review may say how to spend less. Change the prompt so the next run does better.",o.length===0?"Write the next prompt.":"Write the next prompt. Follow the goal and the instructions."].join(`
`)}});var rne,one,Wd,u1,dh=l(()=>{"use strict";rne=/\n+|;\s+/,one=e=>e.length>280?`${e.slice(0,279)}\u2026`:e,Wd=e=>e.reduce((t,r)=>{if(t.length>=12)return t;let o=r.split(rne).map(n=>n.replace(/^[-*]\s*/,"").trim()).filter(n=>n.length>0).reduce((n,s)=>{if(t.length+n.length>=12)return n;let i=s.toLowerCase();return[...t,...n].some(c=>c.toLowerCase()===i)?n:[...n,one(s)]},[]);return[...t,...o]},[]),u1=e=>{let t=Wd(e);return t.length===0?null:t.map(r=>`- ${r}`).join(`
`)}});var Se,ya=l(()=>{"use strict";Se=e=>{let t=e.flatMap(n=>n.score===null?[]:[{roundNumber:n.roundNumber,promptText:n.promptText,score:n.score,reasons:n.reasons}]),[r,...o]=t;return r===void 0?null:o.reduce((n,s)=>s.score>n.score||s.score===n.score&&s.roundNumber>n.roundNumber?s:n,r)}});var Od,iR=l(()=>{"use strict";dh();ya();Od=e=>{let t=[...e.priorRounds,e.current],r=Se(t)??{roundNumber:e.current.roundNumber,promptText:e.current.promptText,score:e.current.score,reasons:e.current.reasons},o=[...t].filter(n=>n.score<r.score).sort((n,s)=>s.roundNumber-n.roundNumber).map(n=>n.reasons);return{promptText:r.promptText,score:r.score,reasons:r.reasons??e.current.reasons,avoid:u1(o)}}});var aR,nne,sne,uh,lR=l(()=>{"use strict";aR={objects:[],depth:0,inString:!1,escaped:!1,fragment:""},nne=e=>{try{let t=JSON.parse(e.fragment);return{...aR,objects:[...e.objects,t]}}catch{return{...aR,objects:e.objects}}},sne=(e,t)=>{if(e.inString){let o=`${e.fragment}${t}`;return e.escaped?{...e,escaped:!1,fragment:o}:t==="\\"?{...e,escaped:!0,fragment:o}:t==='"'?{...e,inString:!1,fragment:o}:{...e,fragment:o}}if(t==='"')return e.depth===0?e:{...e,inString:!0,fragment:`${e.fragment}${t}`};if(t==="{")return{...e,depth:e.depth+1,fragment:`${e.fragment}${t}`};if(t!=="}"||e.depth===0)return e.depth===0?e:{...e,fragment:`${e.fragment}${t}`};let r={...e,depth:e.depth-1,fragment:`${e.fragment}${t}`};return r.depth>0?r:nne(r)},uh=e=>[...e].reduce(sne,aR).objects});var ine,cR,ane,p1,dR=l(()=>{"use strict";lR();ine=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score!="number"||!Number.isFinite(t.score)||t.score<0||t.score>100||Math.round(t.score)!==t.score?!1:typeof t.passed=="boolean"&&typeof t.reasons=="string"&&t.reasons.trim().length>0},cR=e=>{let t=uh(e).filter(ine),r=t[t.length-1];return r===void 0?null:{score:r.score,passed:r.passed,reasons:r.reasons.trim()}},ane=(e,t)=>({...e,passed:e.score>=t}),p1=(e,t)=>{let r=cR(e);return r===null?null:ane(r,t)}});var uR,pR,ph=l(()=>{"use strict";uR="The judge reply needs a score and a reason.",pR="The improver reply was empty."});var m1,g1=l(()=>{"use strict";m1=e=>{let[t,...r]=e;return t===void 0?0:r.reduce((o,n)=>n>o.best?{best:n,stall:0}:{best:o.best,stall:o.stall+1},{best:t,stall:0}).stall}});var f1,y1=l(()=>{"use strict";f1=e=>{let[t,...r]=e;return t===void 0?[]:r.reduce((o,n)=>n.score>o.best?{best:n.score,reasons:[]}:{best:o.best,reasons:[...o.reasons,n.reasons]},{best:t.score,reasons:[]}).reasons}});var cne,h1,S1=l(()=>{"use strict";g1();y1();ch();dh();cne=e=>{let t=Wd(e);return t.length===0?oR:`${oR} Avoid: ${t.join("; ")}.`},h1=e=>{if(e.round+1>=e.maxRounds)return{type:"stopped",errorMessage:d1};let t=e.earlyStopFlat!==void 0&&e.earlyStopFlat!==null&&Number.isFinite(e.earlyStopFlat)&&e.earlyStopFlat>=1?Math.floor(e.earlyStopFlat):3;if(m1(e.scores)>=t){let r=e.scores.map((o,n)=>({score:o,reasons:e.reasons?.[n]??""}));return{type:"stopped",errorMessage:cne(f1(r))}}return null}});var tn,dne,hs,P1,mh=l(()=>{"use strict";tn=e=>{let t=Math.max(0,Math.round(e));if(t<1e3)return`${t} ms`;let r=t/1e3;return r>=10?`${Math.round(r)}s`:`${r.toFixed(1)}s`},dne=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,hs=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the changes from 0 to 100 for how well they achieve the goal.":"Score the changes from 0 to 100 for how well they achieve the goal and follow the instructions.";return["You score the result of a prompt run.","Do not edit files. Do not run tools. Do not rewrite the prompt.","Do not score the wording of the prompt.","Score only the evidence below. Do not guess a result that is not in the evidence.","A printed reply is not the result when the evidence has file or git changes.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Looked at:",e.lookedAt.trim(),"","Evidence:",e.evidence.trim(),"",dne(e.tokens),`Delay: ${tn(e.delayMs)}`,"",o,"Weigh the evidence, the tokens used, and the delay.","A slower or more expensive run scores lower when the changes are otherwise equal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","Mention the changes, the tokens, and the delay.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)},P1=e=>["You are a prompt judge.","Run the prompt below, then score only the changes.","If the folder is a git repo, score the git changes.","If the prompt names a file, score that file.","Do not guess a result that was only printed.","Do not edit files after the run. Do not rewrite the prompt.","Do not score the wording of the prompt.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),"","Prompt:",e.promptText.trim(),"","Score the changes from 0 to 100.","Weigh the changes, the tokens used, and the delay.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)});var une,A1,b1=l(()=>{"use strict";dR();une=/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/,A1=e=>{let r=(une.exec(e)?.[1]??e).trim();return r.length===0||cR(r)!==null?null:r}});var _1,gh,k1=l(()=>{"use strict";mh();b1();ph();_1=e=>({type:"call",role:"judge",choice:e.choice,prompt:P1({goal:e.goal,promptText:e.promptText,passScore:e.passScore})}),gh=e=>{let t=A1(e.raw);return t===null?{nextPrompt:null,continuation:{type:"failed",errorMessage:pR}}:{nextPrompt:t,continuation:_1({goal:e.goal,promptText:t,passScore:e.passScore,choice:e.judge})}}});var mR,w1=l(()=>{"use strict";sR();iR();dR();ph();ch();S1();ph();k1();mR=e=>{let t=p1(e.raw,e.passScore);if(t===null)return{verdict:null,continuation:{type:"failed",errorMessage:uR}};if(t.passed)return{verdict:t,continuation:{type:"passed"}};let r=e.priorRounds??[],o=e.round??r.length,n=[...r.map(a=>({score:a.score,reasons:a.reasons})),{score:t.score,reasons:t.reasons}],s=h1({scores:n.map(a=>a.score),reasons:n.map(a=>a.reasons),round:o,maxRounds:e.maxRounds??10,earlyStopFlat:e.earlyStopFlat});if(s!==null)return{verdict:t,continuation:s};let i=Od({current:{roundNumber:o,promptText:e.promptText,score:t.score,reasons:t.reasons},priorRounds:r});return{verdict:t,continuation:{type:"call",role:"improve",choice:e.improver,prompt:en({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid})}}}});var Md,gR=l(()=>{"use strict";Md=e=>{let t=e.instructions?.trim()??"",r=t.length===0?["Input:","No separate input. Follow the prompt as written."]:["Input:",t,"","If the prompt needs an input, use the input above."];return["Do the task in the prompt below.","Work in this folder. Change the files the prompt names.","Do not score the work. Do not rewrite the prompt. Do not explain the prompt.","","Prompt:",e.promptText.trim(),"",...r].join(`
`)}});var T1=l(()=>{"use strict"});var E1=l(()=>{"use strict";T1()});var Ss,R1=l(()=>{"use strict";Ss=e=>{let t=e.instructions?.trim()??"",r=t.length===0?[]:["","Instructions:",t],o=t.length===0?"Score the prompt text from 1 to 100 for how well it achieves the goal.":"Score the prompt text from 1 to 100 for how well it achieves the goal and follows the instructions.";return["You score a prompt for wizard step 2 (evaluate revisions).","Do not edit files. Do not run tools. Do not execute the prompt in a folder.","Score only the prompt text below. Do not score hypothetical run output.","Reply with one JSON object only, no markdown.","","Goal:",e.goal.trim(),...r,"","Prompt:",e.promptText.trim(),"",o,"Weigh clarity, completeness, safety, and fit for the goal.",`Set passed to true only when the score is at least ${e.passScore}.`,"reasons is required and explains the score.","A score without a reason is not a verdict.","",'{"score": 0, "passed": false, "reasons": "why"}'].join(`
`)}});var pne,fR,v1=l(()=>{"use strict";mh();pne=e=>e===null?"Tokens used: not reported":`Tokens used: ${e}`,fR=e=>["You review the token spend of a prompt run.","Do not edit files. Do not rewrite the prompt. Do not score the result.","Reply with one short suggestion for the person who will rewrite the prompt.","If the spend is reasonable, say the spend is reasonable and why.","If the spend is high, say what to cut.","",pne(e.tokens),`Delay: ${tn(e.delayMs)}`,`Prompt length: ${e.promptText.trim().length} characters`,`Evidence length: ${e.evidence.length} characters`,"","Evidence:",e.evidence.slice(0,2e3)].join(`
`)});var mne,gne,fne,yR,C1=l(()=>{"use strict";mne=/[A-Za-z0-9_./~-]{3,180}/g,gne=/\.(?:ts|tsx|js|jsx|mjs|cjs|md|json|css|html|py|go|rs|sql|yml|yaml|toml|txt|sh)$/i,fne=e=>{if(e.includes("://")||e.startsWith("http"))return!1;let t=e.replace(/^[~./]+/,"");if(t.length===0||t.includes(".."))return!1;let r=t.split("/")[0]??"";return t.includes("/")&&r.includes(".")?!1:t.includes("/")||gne.test(t)},yR=(e,t=12)=>{let r=[];for(let o of e.matchAll(mne)){let n=o[0].replace(/\.+$/,"");if(!(!fne(n)||r.includes(n))&&(r.push(n),r.length>=t))break}return r}});var jd,L1=l(()=>{"use strict";jd=(e,t)=>e.flatMap(r=>{let o=r.reasons?.trim()??"";return r.roundNumber>=t||r.score===null||o.length===0?[]:[{roundNumber:r.roundNumber,promptText:r.promptText,score:r.score,reasons:o}]}).sort((r,o)=>r.roundNumber-o.roundNumber)});var fh,hR,x1,Nd,SR=l(()=>{"use strict";fh=e=>Math.floor(e/2),hR=e=>Math.max(fh(e)+1,e-20),x1=(e,t)=>e>=t?"passes":e>=hR(t)?"close":e>=fh(t)?"weak":"bad",Nd=e=>[{band:"bad",label:`0\u2013${fh(e)-1} bad`},{band:"weak",label:`${fh(e)}\u2013${hR(e)-1} weak`},{band:"close",label:`${hR(e)}\u2013${e-1} close`},{band:"passes",label:`${e}\u2013100 passes`}]});var yh,PR=l(()=>{"use strict";SR();yh=e=>{let t=e.status==="judging"||e.status==="awaiting_local"&&e.pendingLocal?.role==="judge",r=e.status==="improving"||e.status==="awaiting_local"&&e.pendingLocal?.role==="improve",o=e.revisions.flatMap(s=>{let i={id:`round-${s.roundNumber}`,label:s.roundNumber===0?"Source prompt saved":`Revision ${s.roundNumber} saved`,state:"done",detail:null};return s.judgement!==null&&s.judgement.score!==null?[i,{id:`score-${s.roundNumber}`,label:`Judge scored round ${s.roundNumber}: ${s.judgement.score} / 100 (${x1(s.judgement.score,e.passScore)})`,state:"done",detail:s.judgement.reasons}]:t&&e.currentRound===s.roundNumber?[i,{id:`score-${s.roundNumber}`,label:`score for round ${s.roundNumber}...`,state:"active",detail:e.judgeModel}]:[i]}),n=r?[{id:"rewrite",label:`revision ${e.currentRound+1}...`,state:"active",detail:e.improverModel}]:[];return[...o,...n]}});var er,AR=l(()=>{"use strict";er=e=>e.gate!==null?e.gate==="generalize"?0:e.gate==="evaluate"?1:e.gate==="separate"?2:3:e.phase==="generalize"?0:e.phase==="evaluate"?1:e.phase==="separate"?2:e.phase==="optimize_modules"?3:4});var I1,W1=l(()=>{"use strict";I1=e=>e.phase==="evaluate"||e.gate==="evaluate"||e.phase==="optimize_modules"||e.gate==="optimize_modules"});var yne,hne,O1,M1=l(()=>{"use strict";fa();PR();AR();W1();yne=["Step 1 \u2014 Generalize","Step 2 \u2014 Evaluate","Step 3 \u2014 Separate","Step 4 \u2014 Optimize modules"],hne=e=>e.wizard!==void 0&&e.wizard.phase==="complete"?"Finished":e.status==="passed"?"Passed":e.status==="stopped"?e.wizard?.phase==="complete"||(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",O1=e=>{let t=e.wizard;if(t===void 0)return[];let r=er(t),o=Math.max(r,t.phase==="optimize_modules"||t.gate==="optimize_modules"?3:r),n=e.status==="wizard_paused",s=t.phase==="complete",i=yne.map((y,P)=>{let h=!s&&!n&&P===r?"active":"done";return{id:`wizard-${P+1}`,label:y,state:h,detail:null}}).filter((y,P)=>s?!0:P<=o),a=n&&(t.gate==="evaluate"||t.gate==="optimize_modules"),c=yh(e),d=c.filter(y=>y.id==="round-0"),u=I1(t)&&(!n||a)?c.filter(y=>y.id!=="round-0"):[],g=L(e.status)&&!s,f=g?[{id:"end",label:hne(e),state:"done",detail:e.errorMessage}]:[];if(g&&f.length>0){let y=Math.min(r,i.length),P=i.slice(0,y).map(h=>({...h,state:"done"}));return[...d,...P,...f,...u]}return[...d,...i,...u,...f]}});var Sne,bR,j1=l(()=>{"use strict";fa();PR();M1();Sne=e=>e.status==="passed"?"Passed":e.status==="stopped"?(e.errorMessage??"").startsWith("Finished")?"Finished":"Stopped":"Failed",bR=e=>{if(e.wizard!==void 0)return O1(e);let t=yh(e),r=L(e.status)?[{id:"end",label:Sne(e),state:"done",detail:e.errorMessage}]:[];return[...t,...r]}});var Dd,N1=l(()=>{"use strict";Dd=(e,t)=>{if(t.id!=="end"||e.status!=="failed")return null;let r=e.errorMessage?.trim()??"";if(r.length>0)return r;let o=t.detail?.trim()??"";return o.length>0?o:null}});var D1=l(()=>{"use strict";At()});var H1,Hd,Fd,Sa,hh,_R,F1=l(()=>{"use strict";D1();H1="/prompt-optimizer/agent",Hd=`${zr}${H1}`,Fd=`${zr}/prompt-optimizer`,Sa="The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.",hh=`goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${Sa}`,_R="This API runs installed writers. Score or rewrite by hand on the prompt optimizer page."});var vr=l(()=>{"use strict"});var pe,$d=l(()=>{"use strict";vr();pe=e=>{let t=e?.modulePassScore;return typeof t=="number"&&t>=1&&t<=100?t:90}});var kR,$1=l(()=>{"use strict";kR="Set the goal and the prompt, then choose who scores, who rewrites, and who runs step 4. Run starts the wizard (generalize \u2192 evaluate \u2192 separate \u2192 optimize modules). Instructions are optional."});var z1,U1=l(()=>{"use strict";z1=()=>({generalize:[],evaluate:[],separate:[],optimize_modules:[]})});var zd,G1=l(()=>{"use strict";U1();vr();zd=e=>({schemaVersion:5,phase:"generalize",gate:null,variables:[],templatedPrompt:e.trim(),attempts:[],avoidByStep:z1(),evaluateSelectedRound:null,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null,modules:[],currentModuleIndex:0,runnerInstructions:"",pendingStepInstructions:"",parameterValues:{},modulePassScore:90,orchestratorSkill:null,additionalSkillSuggestions:[],additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestionsSummary:null,lastWriterParseFailureReply:null})});var wR,V1=l(()=>{"use strict";vr();wR=e=>({...e,modulePassScore:e.modulePassScore??90,parameterValues:e.parameterValues??{},pendingStepInstructions:e.pendingStepInstructions??"",selectedSplitTopology:e.selectedSplitTopology??null,modules:e.modules.map(t=>({...t,statistics:t.statistics??null})),orchestratorSkill:e.orchestratorSkill??null,additionalSkillSuggestions:e.additionalSkillSuggestions??[],additionalSkillSuggestionsStatus:e.additionalSkillSuggestionsStatus??"idle",additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsSummary??null,lastWriterParseFailureReply:e.lastWriterParseFailureReply??null})});var TR,K1=l(()=>{"use strict";vr();TR=(e,t,r)=>{let o=r.trim();if(o.length===0)return e;let n=e.avoidByStep[t]??[],s=[o,...n].slice(0,12);return{...e,avoidByStep:{...e.avoidByStep,[t]:s},gate:null}}});var q1,Ud,J1=l(()=>{"use strict";q1=["generalize","evaluate","separate","optimize_modules"],Ud=(e,t)=>{let r=q1.indexOf(t);if(r===-1)return e;let o=q1.slice(r+1);return o.length===0?{...e,gate:null}:{...e,gate:null,evaluateSelectedRound:o.includes("evaluate")?null:e.evaluateSelectedRound,splitOptions:o.includes("separate")?[]:e.splitOptions,selectedSplitOptionId:o.includes("separate")?null:e.selectedSplitOptionId,selectedSplitTopology:o.includes("separate")?null:e.selectedSplitTopology,modules:o.includes("optimize_modules")?[]:e.modules,currentModuleIndex:o.includes("optimize_modules")?0:e.currentModuleIndex,parameterValues:o.includes("optimize_modules")?{}:e.parameterValues,phase:t==="generalize"?"generalize":t==="evaluate"?"evaluate":t==="separate"?"separate":"optimize_modules"}}});var Sh,ER=l(()=>{"use strict";dh();Sh=e=>{let t=Wd(e);return t.length===0?"":["Avoid:",...t.map(r=>`- ${r}`)].join(`
`)}});var Bd,Y1=l(()=>{"use strict";ER();Bd=e=>{let t=Sh(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`;return["Generalize the prompt below for reuse as a skill or template.","Pull concrete values (names, paths, IDs, component names) into variables.","Use placeholders {{variableName}} in the templated prompt (camelCase names).","Keep the same intent as the goal.","",`Goal:
${e.goal.trim()}`,"",`Source prompt:
${e.sourcePrompt.trim()}`,"",r,o,t,"","Reply with JSON only, no markdown fences:",'{"templatedPrompt":"...","variables":[{"name":"...","description":"...","sampleValue":"..."}]}'].filter(n=>n.length>0).join(`
`)}});var Ane,bne,_ne,X1,Z1=l(()=>{"use strict";Ane=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),bne=/^\{\{[a-zA-Z0-9_-]+\}\}$/,_ne=(e,t)=>{let{masked:r,tokens:o}=t.reduce((n,s)=>{let i=s.sampleValue.trim();if(i.length===0)return n;let a=new RegExp(Ane(i),"g"),c=[...n.tokens];return{masked:n.masked.replace(a,()=>{let u=`\0PO${c.length}\0`;return c.push(`{{${s.name}}}`),u}),tokens:c}},{masked:e,tokens:[]});return o.reduce((n,s,i)=>n.replace(`\0PO${i}\0`,s),r)},X1=(e,t)=>{let r=[...t].sort((n,s)=>s.sampleValue.length-n.sampleValue.length);return e.split(/(\{\{[a-zA-Z0-9_-]+\}\})/g).map(n=>bne.test(n)?n:_ne(n,r)).join("")}});var RR,Q1=l(()=>{"use strict";Z1();RR=(e,t)=>e.map(r=>({...r,modules:r.modules.map(o=>({...o,prompt:X1(o.prompt,t)}))}))});var kne,Gd,eB=l(()=>{"use strict";vr();ER();kne=e=>e.length===0?"":["Variables (every module prompt must use {{name}} placeholders; do not paste sample values):",...e.map(r=>`- {{${r.name}}}: ${r.description.trim()} (sample: ${r.sampleValue.trim()})`),""].join(`
`),Gd=e=>{let t=Sh(e.avoid),r=e.stepInstructions.trim().length===0?"":`Extra instructions:
${e.stepInstructions.trim()}
`,o=e.lastAttemptSummary.trim().length===0?"":`Last attempt (fix this):
${e.lastAttemptSummary.trim()}
`,n=e.evaluatedPromptReference.trim().length===0?"":`Evaluated wording reference (structure only; module prompts must still use {{placeholders}}, not literals from this text):
${e.evaluatedPromptReference.trim()}
`,s=kne(e.variables);return["Suggest ways to split this prompt into smaller modules for maintenance and faster evaluation.","Split the templated prompt below. Keep every {{variableName}} placeholder in each module prompt.","Do not substitute sample values or concrete paths, file names, or IDs into module prompts.",`Return at most ${3} options.`,"Mark exactly one option recommended:true (best accuracy per token).","topology is chain or parallel.","Each module needs id, title, prompt, order (0-based).","",`Goal:
${e.goal.trim()}`,"",s,`Templated prompt:
${e.templatedPrompt.trim()}`,"",n,r,o,t,"","Reply with JSON only:",'{"options":[{"id":"opt-1","title":"...","summary":"...","topology":"chain","recommended":true,"modules":[{"id":"m1","title":"...","prompt":"...","order":0}]}]}'].filter(i=>i.length>0).join(`
`)}});var Vd,tB=l(()=>{"use strict";gR();Vd=e=>{let t=e.chainPriorOutput?.trim()??"",r=e.moduleTitle?.trim()??"",o=["Run only this module step in order.","Do not run later chain modules in this execution.",r.length>0?`Current module: ${r}.`:""].filter(a=>a.length>0),n=t.length===0?[]:["","Prior module output (use as input where this prompt needs it):",t],s=e.runnerInstructions?.trim()??"",i=[...o,s].filter(a=>a.length>0).join(`
`);return Md({promptText:e.promptText,instructions:`${i}${n.join(`
`)}`})}});var Kd,CR=l(()=>{"use strict";ya();Kd=e=>{let t=e.revisions.map(n=>({roundNumber:n.roundNumber,score:n.judgement?.score??null,passed:n.judgement?.passed??null,runOutput:n.run?.output??null,tokens:n.run?.tokens??null})),r=Se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:null}))),o=r===null?null:e.revisions.find(n=>n.roundNumber===r.roundNumber);return{bestScore:r?.score??null,bestRound:r?.roundNumber??null,bestRunOutput:o?.run?.output??null,rounds:t}}});var LR,rB=l(()=>{"use strict";CR();LR=e=>{let t=Kd({revisions:e.revisions}),r=e.cycleStatus==="passed"?"passed":e.cycleStatus==="failed"?"failed":"stopped";return{...e.wizard,modules:e.wizard.modules.map((o,n)=>n===e.moduleIndex?{...o,status:r,selectedRevisionRound:t.bestRound,statistics:t}:o)}}});var Ps,oB=l(()=>{"use strict";Ps=(e,t)=>{if(e.selectedSplitTopology!=="chain")return{output:null,nullReason:"not-chain"};if(t<=0)return{output:null,nullReason:"first-module"};let r=e.modules[t-1];if(r===void 0)return{output:null,nullReason:"prior-missing"};if(r.status==="stopped")return{output:null,nullReason:"prior-skipped"};let o=r.statistics?.bestRunOutput?.trim()??"";return o.length>0?{output:o,nullReason:null}:{output:null,nullReason:"prior-no-output"}}});var wne,Tne,ce,Ph=l(()=>{"use strict";$d();wne=(e,t)=>{let r=e.modules[t]?.statistics;if(r==null)return null;let o=r.rounds.reduce((n,s)=>n+(s.tokens??0),0);return o>0?o:null},Tne=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,ce=e=>{let t=pe(e),r=e.modules.map((i,a)=>({moduleId:i.moduleId,title:i.title,bestScore:i.statistics?.bestScore??null,tokens:wne(e,a),status:i.status})),o=r.length,n=r.filter((i,a)=>Tne(e.modules[a],t)).length,s=o>0&&n===o?"passed":"stopped";return{passedModuleCount:n,totalModules:o,terminalStatusSuggestion:s,rows:r}}});var nB,sB=l(()=>{"use strict";$d();Ph();nB=e=>{let t=ce(e.wizard),r=pe(e.wizard),o=[`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","Module results:",...t.rows.map(s=>`- ${s.title}: best score ${s.bestScore??"\u2014"}, status ${s.status}`)];e.wizard.templatedPrompt.trim().length>0&&o.push("","Generalized template:",e.wizard.templatedPrompt.trim());let n=e.wizard.attempts.find(s=>s.step==="evaluate");return n!==void 0&&o.push("","Step 2 evaluate snapshot:",JSON.stringify(n.output)),o.join(`
`)}});var xR,iB=l(()=>{"use strict";sB();xR=e=>{let t=nB({goal:e.goal,cycleStatus:e.cycleStatus,wizard:e.wizard});return["You suggest additional Cursor harness skills for a finished prompt optimizer wizard run.","Do not edit files. Do not run tools.","Read the run summary and recommend extra skills that would help the orchestrator skill succeed.","Never suggest replacing the orchestrator skill or reusing its fileName.","Reply with one JSON object only, no markdown.","",e.orchestratorSkill===null?"No orchestrator skill was loaded at compose time.":["Orchestrator skill (keep this role; do not replace or rename it):",`fileName: ${e.orchestratorSkill.fileName}`,`name: ${e.orchestratorSkill.name}`,`description: ${e.orchestratorSkill.description}`].join(`
`),"","Run summary:",t,"","summary: one short paragraph on what the run shows.","suggestions: up to 3 additional skills (not the orchestrator).","Each suggestion needs fileName (kebab-case slug), name, description, rationale.","",'{"summary":"...","suggestions":[{"fileName":"verify-output","name":"Verify output","description":"...","rationale":"..."}]}'].join(`
`)}});var Ene,aB,lB=l(()=>{"use strict";Ene=(e,t)=>e.inDouble?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inDouble:t!=='"'}:e.inSingle?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!1}:t==='"'?{...e,out:`${e.out}\\"`}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inDouble:!0}:t==="'"?{...e,out:`${e.out}"`,inSingle:!0}:{...e,out:`${e.out}${t}`},aB=e=>[...e].reduce(Ene,{out:"",inDouble:!1,inSingle:!1,escaped:!1}).out});var Rne,cB,dB=l(()=>{"use strict";Rne=(e,t)=>{if(e.inString)return e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:{...e,out:`${e.out}${t}`,inString:t!=='"'};if(t==='"')return{...e,out:`${e.out}${t}`,inString:!0};if(t===",")return{...e,out:`${e.out}${t}`,escaped:!1};if(t==="}"||t==="]"){let r=e.out.replace(/,\s*$/,"");return{...e,out:`${r}${t}`}}return{...e,out:`${e.out}${t}`}},cB=e=>[...e].reduce(Rne,{out:"",inString:!1,escaped:!1}).out});var vne,Cne,uB,pB=l(()=>{"use strict";lB();dB();vne=e=>e.charCodeAt(0)===65279?e.slice(1):e,Cne=e=>{let t=e.trim();return t.match(/^json\s*([\s\S]*)$/i)?.[1]?.trim()??t},uB=e=>cB(aB(Cne(vne(e))))});var Lne,xne,Ine,mB,Wne,Pa,Ah=l(()=>{"use strict";lR();pB();Lne=e=>{let t=e.trim();return t.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1]?.trim()??t},xne=(e,t)=>e.inString?e.escaped?{...e,out:`${e.out}${t}`,escaped:!1}:t==="\\"?{...e,out:`${e.out}${t}`,escaped:!0}:t==='"'?{...e,out:`${e.out}${t}`,inString:!1}:t===`
`?{...e,out:`${e.out}\\n`}:t==="\r"?e:{...e,out:`${e.out}${t}`}:t==='"'?{...e,out:`${e.out}${t}`,inString:!0}:{...e,out:`${e.out}${t}`},Ine=e=>[...e].reduce(xne,{out:"",inString:!1,escaped:!1}).out,mB=e=>{let t=uh(e);return t.length===0?null:t[t.length-1]},Wne=e=>{let t=e instanceof Error?e.message:"Invalid JSON in writer reply.",r=/unterminated string/i.test(t)||/unexpected end of json/i.test(t)||/bad control character/i.test(t)?"The writer JSON was cut off or had unescaped line breaks or quotes in text fields. Run the step again, or add step instructions to reply with compact single-line JSON.":/Expected property name or '}'/i.test(t)||/Expected double-quoted property name/i.test(t)?"The writer reply was not strict JSON (often single-quoted keys or trailing commas). Run the step again, or add step instructions to reply with compact single-line JSON using double quotes.":"The writer reply was not valid JSON.";return new Error(`${r} (${t})`)},Pa=e=>{let t=uB(Lne(e)),r=mB(t);if(r!==null)return r;let o=Ine(t),n=mB(o);if(n!==null)return n;let s=t.indexOf("{");if(s===-1)throw new Error("No JSON object in reply.");try{return JSON.parse(t.slice(s))}catch(i){throw Wne(i)}}});var One,Mne,IR,gB,fB=l(()=>{"use strict";One=/^[a-z0-9][a-z0-9-]{0,62}$/,Mne=e=>{let t=e.toLowerCase().replace(/[^a-z0-9]+/gu,"-").replace(/^-+|-+$/gu,"").slice(0,63);return One.test(t)?t:""},IR=e=>e.replace(/\s+/gu," ").trim(),gB=e=>{let t=e.orchestratorFileName?.trim().toLowerCase()??"",r=new Set,o=[];for(let n of e.suggestions){let s=Mne(n.fileName.trim());if(s.length===0||t.length>0&&s===t||r.has(s))continue;let i=IR(n.name),a=IR(n.description),c=IR(n.rationale);if(!(i.length===0||a.length===0||c.length===0)&&(r.add(s),o.push({fileName:s,name:i,description:a,rationale:c}),o.length>=3))break}return o}});var yB,hB,SB=l(()=>{"use strict";yB=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.score=="number"&&typeof t.passed=="boolean"&&typeof t.reasons=="string"},hB=e=>{if(typeof e!="object"||e===null)return null;let t=e;return typeof t.fileName!="string"||typeof t.name!="string"||typeof t.description!="string"||typeof t.rationale!="string"?null:{fileName:t.fileName,name:t.name,description:t.description,rationale:t.rationale}}});var WR,PB=l(()=>{"use strict";Ah();fB();SB();WR=(e,t)=>{let r=(()=>{try{return Pa(e)}catch{return null}})();if(r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};if(yB(r))return{ok:!1,errorMessage:"The judge returned a score instead of skill suggestions."};if(typeof r!="object"||r===null)return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let o=r,n=typeof o.summary=="string"?o.summary.replace(/\s+/gu," ").trim():"";if(!Array.isArray(o.suggestions))return{ok:!1,errorMessage:"The judge did not return skill suggestions."};let s=o.suggestions.map(hB).filter(a=>a!==null),i=gB({suggestions:s,orchestratorFileName:t});return i.length===0?{ok:!1,errorMessage:"No usable additional skill suggestions came back."}:{ok:!0,summary:n,suggestions:i}}});var OR,AB=l(()=>{"use strict";OR=(e,t)=>({...e,gate:null,phase:"complete",additionalSkillSuggestionsStatus:t?"skipped":"pending",additionalSkillSuggestions:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:e.additionalSkillSuggestionsStatus==="ready"?e.additionalSkillSuggestionsSummary:null})});var MR,bB=l(()=>{"use strict";MR=(e,t)=>t===null?e.orchestratorSkill===null?e:{...e,orchestratorSkill:null}:e.orchestratorSkill?.fileName===t.fileName&&e.orchestratorSkill.name===t.name&&e.orchestratorSkill.description===t.description?e:{...e,orchestratorSkill:t}});var jR,_B=l(()=>{"use strict";$d();Ph();jR=e=>{let t=ce(e.wizard),r=pe(e.wizard),o=["# Prompt optimizer \u2014 wizard result","",`Goal: ${e.goal.trim()}`,`Run status: ${e.cycleStatus}`,`Modules passed: ${t.passedModuleCount} / ${t.totalModules} (pass \u2265 ${r})`,"","## Modules","","| Module | Best score | Tokens | Status |","| --- | ---: | ---: | --- |",...t.rows.map(n=>`| ${n.title.replaceAll("|","\\|")} | ${n.bestScore??"\u2014"} | ${n.tokens??"\u2014"} | ${n.status} |`)];return e.wizard.templatedPrompt.trim().length>0&&o.push("","## Generalized template","","```",e.wizard.templatedPrompt.trim(),"```"),e.wizard.modules.forEach((n,s)=>{let i=n.statistics?.bestRunOutput?.trim();i===void 0||i.length===0||o.push("",`## Module ${s+1}: ${n.title}`,"","```",i,"```")}),`${o.join(`
`)}
`}});var qd,kB=l(()=>{"use strict";qd=e=>{let t=e.modules.reduce((r,o)=>{let n=o.statistics?.rounds.reduce((s,i)=>s+(i.tokens??0),0)??0;return r+n},0);return t>0?t:null}});var tr,jne,NR,wB=l(()=>{"use strict";tr=m(li());Ah();jne=(0,tr.isType)({name:tr.isNonEmptyString,description:tr.isString,sampleValue:tr.isString}),NR=e=>{let t=Pa(e);if(!(0,tr.isType)({templatedPrompt:tr.isNonEmptyString,variables:(0,tr.isArrayWithEachItem)(jne)})(t))throw new Error("Generalize reply did not match the expected shape.");return t}});var Pe,Nne,Dne,DR,TB=l(()=>{"use strict";Pe=m(li());vr();Ah();Nne=(0,Pe.isType)({id:Pe.isNonEmptyString,title:Pe.isNonEmptyString,prompt:Pe.isNonEmptyString,order:Pe.isNumber}),Dne=(0,Pe.isType)({id:Pe.isNonEmptyString,title:Pe.isNonEmptyString,summary:Pe.isString,topology:(0,Pe.isOneOf)("chain","parallel"),modules:(0,Pe.isArrayWithEachItem)(Nne),recommended:Pe.isBoolean}),DR=e=>{let t=Pa(e);if(!(0,Pe.isType)({options:(0,Pe.isArrayWithEachItem)(Dne)})(t))throw new Error("Separate reply did not match the expected shape.");let r=t.options.slice(0,3),o=r.filter(n=>n.recommended).length;if(r.length===0)throw new Error("Separate reply had no options.");return o!==1?r.map((s,i)=>({...s,recommended:i===0})):r}});var Aa,EB=l(()=>{"use strict";Aa=e=>{let t=e.wizard.attempts.filter(o=>o.step===e.step),r={id:crypto.randomUUID(),step:e.step,attemptNumber:t.length+1,userFeedback:e.userFeedback,stepInstructions:e.stepInstructions,createdAt:new Date().toISOString(),output:e.output};return{...e.wizard,pendingStepInstructions:"",attempts:[...e.wizard.attempts,r]}}});var Hne,HR,FR=l(()=>{"use strict";Hne=/\{\{([a-zA-Z0-9_-]+)\}\}/g,HR=(e,t)=>{let r=new Map(t.map(o=>[o.name,o.sampleValue]));return e.replace(Hne,(o,n)=>{let s=r.get(n);return s===void 0?o:s})}});var rr,or,RB=l(()=>{"use strict";ya();FR();rr=e=>HR(e.templatedPrompt,e.variables),or=e=>{if(e.wizard.evaluateSelectedRound!==null){let r=e.revisions.find(o=>o.roundNumber===e.wizard.evaluateSelectedRound);if(r!==void 0)return r.promptText}return Se(e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.score??0,reasons:""})))?.promptText??rr(e.wizard)}});var Fne,As,vB=l(()=>{"use strict";Fne=/\{\{([a-zA-Z0-9_-]+)\}\}/g,As=(e,t)=>e.replace(Fne,(r,o)=>{let n=t[o];return n===void 0||n.trim()===""?r:n})});var $ne,bs,bh=l(()=>{"use strict";$ne=/\{\{([a-zA-Z0-9_-]+)\}\}/g,bs=e=>{let t=new Set,r=[];for(let o of e.matchAll($ne)){let n=o[1];t.has(n)||(t.add(n),r.push(n))}return r}});var Jd,CB=l(()=>{"use strict";bh();Jd=e=>e.variables.length>0||bs(e.templatedPrompt).length>0?!1:e.templatedPrompt.trim().length>0});var $R,zR=l(()=>{"use strict";vr();$R=(e,t=70)=>{let r=e?.score;return!(r==null||r<t||e?.passed===!1)}});var Yd,LB=l(()=>{"use strict";ya();zR();Yd=e=>{let t=e.wizard.evaluateSelectedRound??Se(e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score??null,reasons:null})))?.roundNumber;if(t===void 0)return!1;let r=e.revisions.find(o=>o.roundNumber===t);return r===void 0?!1:$R(r.judgement,e.passScore)}});var Xd,xB=l(()=>{"use strict";Xd=e=>e.length===1&&e[0].modules.length===1});var UR,IB=l(()=>{"use strict";UR=e=>[...e.modules].sort((t,r)=>t.order-r.order).map(t=>({moduleId:t.id,title:t.title,prompt:t.prompt,status:"pending",selectedRevisionRound:null,statistics:null}))});var Oe,_h,Zd=l(()=>{"use strict";Oe=(e,t,r,o,n)=>({id:e,label:t,state:r,infoTitle:o,infoBodyHtml:n}),_h=(e,t)=>`<p class="muted">The computer runs a non-interactive ${e} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${t}
$ ${e.toLowerCase()} \u2026

{"templatedPrompt":"\u2026","variables":[\u2026]}</pre>`});var WB,OB=l(()=>{"use strict";Zd();WB=e=>{let t=e.status==="wizard_paused"&&e.wizard.gate==="evaluate",r=e.status==="judging"&&e.wizard.gate===null&&!t;return[Oe("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 2 scores prompt text only (no folder run).</p>"),Oe("cli",`${e.writerLabel} \u2014 score round ${e.currentRound+1}`,r?"active":"done","Judge scores prompt text",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.writerLabel.toLowerCase()} \u2026

{"score":72,"passed":true,"reasons":"\u2026"}</pre>`),...t?[Oe("gate","Pick a revision or continue","active","Step 2 gate","<p>Choose a revision for Separate, or Skip.</p>")]:[]]}});var MB,jB=l(()=>{"use strict";fa();Zd();MB=e=>{let t=e.wizard.attempts.some(i=>i.step==="generalize"),r=e.status==="wizard_paused"&&e.wizard.gate==="generalize",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!L(e.status),n=r||t?"done":o?"active":"pending",s=t||r?"done":"pending";return[Oe("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this computer.</p>"),Oe("folder",`Run folder: ${e.folder}`,"done","Working directory",`<p>Writers use this folder as cwd.</p><pre class="mono">${e.folder}</pre>`),Oe("cli",`${e.writerLabel} CLI \u2014 generalize`,n,"Writer on this computer",_h(e.writerLabel,e.folder)),Oe("parse","Parse templated prompt",s,"Structured reply","<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>"),...r?[Oe("gate","Review Step 1 output","active","Paused at gate","<p>Continue, Skip, or rerun with feedback.</p>")]:[]]}});var NB,DB=l(()=>{"use strict";Zd();NB=e=>{let t=e.wizard.currentModuleIndex+1,r=e.wizard.modules.length,o=e.status==="wizard_paused"&&e.wizard.gate==="optimize_modules",n=e.status==="judging"&&!o;return[Oe("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Step 4 runs the module in your folder, then scores output.</p>"),Oe("cli",`${e.runnerLabel} \u2014 module ${t} of ${r}`,n?"active":"done","Runner + judge",`<pre class="mono sdlc-pipeline-terminal">$ cd ${e.folder}
$ ${e.runnerLabel.toLowerCase()} \u2026

\u2026runner output\u2026</pre>`),...o?[Oe("gate","Module parameters or review","active","Step 4 gate","<p>Fill placeholders or continue after scored rounds.</p>")]:[]]}});var HB,FB=l(()=>{"use strict";Zd();HB=e=>{let t=e.wizard.splitOptions.length>0,r=e.status==="wizard_paused"&&e.wizard.gate==="separate",o=e.status==="judging"&&e.wizard.gate===null&&!t&&!r;return[Oe("awl","Connected on this computer (AgentWitch Local)","done","Local app","<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>"),Oe("cli",`${e.writerLabel} CLI \u2014 suggest splits`,t||r?"done":o?"active":"pending","Split writer",_h(e.writerLabel,e.folder)),...r?[Oe("gate","Choose a split option","active","Step 3 gate","<p>Pick chain or parallel, or Skip.</p>")]:[]]}});var kh,$B=l(()=>{"use strict";fa();OB();jB();DB();FB();kh=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete")return[];if(L(e.status))return[];let r={writerLabel:e.writerLabel,folder:e.folderDisplay,status:e.status,wizard:t};switch(t.phase){case"generalize":return MB(r);case"evaluate":return WB({...r,currentRound:e.currentRound});case"separate":return HB(r);case"optimize_modules":return NB({runnerLabel:e.runnerLabel,folder:e.folderDisplay,status:e.status,wizard:t});default:return[]}}});var Qd,io,zB=l(()=>{"use strict";Qd=e=>Object.fromEntries(e.map(t=>[t.name,t.sampleValue])),io=e=>{let t={...e.parameterValues};for(let r of e.variables)(t[r.name]===void 0||t[r.name].trim()==="")&&(t[r.name]=r.sampleValue);return t}});var zne,wh,BR,UB=l(()=>{"use strict";bh();zne="wizardParam_",wh=e=>`${zne}${e}`,BR=e=>{let t=bs(e.modulePrompt),r={...e.wizard.parameterValues},o=new Set(e.wizard.variables.map(n=>n.name));for(let n of t){let s=wh(n),i=e.posted.get(s),a=i!==null?i.trim():r[n]?.trim()??"";if(a.length===0)return{ok:!1,errorMessage:o.has(n)?`Fill in {{${n}}} before running this module.`:`Fill in {{${n}}} (not listed in Step 1) before running this module.`};r[n]=a}return{ok:!0,parameterValues:r}}});var Tt,BB=l(()=>{"use strict";Tt=["generalize","evaluate","separate","optimize_modules"]});var eu,_s,ba,ao=l(()=>{"use strict";eu="Stopped because the confirmed token or spend budget was exceeded.",_s="Approaching the confirmed budget. Further trials may hard-stop.",ba="Confirm the Step 4 token and spend budget before optimizing modules."});var Et,_a=l(()=>{"use strict";Et=e=>!Number.isFinite(e.tokens)||!Number.isFinite(e.rateUsdPer1kTokens)||e.tokens<0||e.rateUsdPer1kTokens<0?0:Math.round(e.tokens/1e3*e.rateUsdPer1kTokens*1e4)/1e4});var sr,tu=l(()=>{"use strict";ao();sr=e=>({maxTrials:e?.maxTrials??1,maxSpendUsd:e?.maxSpendUsd??null,earlyStop:e?.earlyStop??!0,earlyStopFlatRounds:e?.earlyStopFlatRounds??3,targetTokenBudget:null,estimatedSpendUsd:null,rateUsdPer1kTokens:.01,proposalStub:!0,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,budgetConfirmed:!1,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1})});var Une,lo,ru=l(()=>{"use strict";ao();Une={"claude-cli":.009,codex:.008,cursor:.01,"cursor-cloud":.01,antigravity:.01},lo=e=>{let t=e?.trim()??"";return t.length===0?.01:Une[t]??.01}});var Th,GR=l(()=>{"use strict";ao();ru();Th=e=>{let t=e.fromJudge;if(t==null||typeof t.targetTokenBudget!="number"||!Number.isFinite(t.targetTokenBudget)||t.targetTokenBudget<=0||typeof t.estimatedSpendUsd!="number"||!Number.isFinite(t.estimatedSpendUsd)||t.estimatedSpendUsd<0)return null;let r=lo(e.writerId),o=t.rateUsdPer1kTokens??e.rateUsdPer1kTokens??r??(e.fallbackDefaultRate===!0?.01:r);return{targetTokenBudget:Math.round(t.targetTokenBudget),estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:o,stub:!1}}});var GB,Rh,VR,KR=l(()=>{"use strict";ao();_a();tu();GR();ru();GB=e=>{let t=Th({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId,fallbackDefaultRate:!0});if(t!==null)return t;let r=Math.max(1,Math.floor(e.moduleCount)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=e.rateUsdPer1kTokens??lo(e.writerId)??.01,s=r*o*8e3;return{targetTokenBudget:s,estimatedSpendUsd:Et({tokens:s,rateUsdPer1kTokens:n}),rateUsdPer1kTokens:n,stub:!0}},Rh=(e,t)=>({...e,targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.rateUsdPer1kTokens,proposalStub:t.stub===!0,budgetConfirmed:!1,confirmedTokenBudget:null,confirmedMaxSpendUsd:null,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}),VR=e=>{let t=e.existing??sr(),r=GB({moduleCount:e.moduleCount,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId,fromJudge:t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null&&t.proposalStub===!1?{targetTokenBudget:t.targetTokenBudget,estimatedSpendUsd:t.estimatedSpendUsd,rateUsdPer1kTokens:t.rateUsdPer1kTokens}:null,existing:t});return Rh(t,r)}});var ka,ou,qB=l(()=>{"use strict";ao();vr();_a();tu();KR();GR();ru();ka=e=>{let t=Th({fromJudge:e.fromJudge,rateUsdPer1kTokens:e.rateUsdPer1kTokens,writerId:e.writerId});if(t!==null)return t;let r=Math.max(1,Math.floor(e.maxRounds??5)),o=Math.max(1,Math.floor(e.maxTrials??1)),n=Math.max(1,Math.floor(e.previewModuleCount??2)),s=e.rateUsdPer1kTokens??lo(e.writerId),i=r*4e3,a=n*o*8e3,c=i+a;return{targetTokenBudget:c,estimatedSpendUsd:Et({tokens:c,rateUsdPer1kTokens:s}),rateUsdPer1kTokens:s,stub:!0}},ou=e=>{let t=e.existing??sr();if(t.proposalStub===!1&&t.targetTokenBudget!==null&&t.estimatedSpendUsd!==null)return t;let r=ka({maxRounds:e.maxRounds,maxTrials:t.maxTrials,rateUsdPer1kTokens:t.rateUsdPer1kTokens,writerId:e.writerId});return Rh(t,r)}});var co,JB=l(()=>{"use strict";_a();ao();tu();co=e=>{let t=Number(e.confirmedTokenBudget);if(!Number.isFinite(t)||t<1||!Number.isInteger(t))return{ok:!1,errorMessage:"confirmedTokenBudget must be a whole number \u2265 1."};let r=e.existing??sr(),o=e.rateUsdPer1kTokens??r.rateUsdPer1kTokens??.01,n=e.confirmedMaxSpendUsd;return n==null&&(n=Et({tokens:t,rateUsdPer1kTokens:o})),!Number.isFinite(n)||n<0?{ok:!1,errorMessage:"confirmedMaxSpendUsd must be zero or a positive number."}:{ok:!0,costControls:{...r,targetTokenBudget:r.targetTokenBudget??t,estimatedSpendUsd:r.estimatedSpendUsd??n,rateUsdPer1kTokens:o,confirmedTokenBudget:t,confirmedMaxSpendUsd:Math.round(n*1e4)/1e4,budgetConfirmed:!0,softWarnFired:!1,softWarnMessage:null,budgetExceeded:!1}}}});var JR,wa,YB=l(()=>{"use strict";ao();_a();JR=e=>{let t=e.costControls;if(t==null||!t.budgetConfirmed)return null;let r=t.rateUsdPer1kTokens??0,o=Et({tokens:e.spentTokens,rateUsdPer1kTokens:r}),n=t.confirmedTokenBudget,s=t.confirmedMaxSpendUsd,i=n!==null&&n>0&&e.spentTokens>=n,a=s!==null&&s>0&&o>=s;if(i||a)return{kind:"hard_stop",errorMessage:eu,errorKind:"budget_exceeded",costControls:{...t,softWarnFired:!0,softWarnMessage:eu,budgetExceeded:!0}};let c=.8,d=n!==null&&n>0&&e.spentTokens>=n*c,u=s!==null&&s>0&&o>=s*c;return(d||u)&&!t.softWarnFired?{kind:"soft_warn",softWarnMessage:_s,costControls:{...t,softWarnFired:!0,softWarnMessage:_s}}:null},wa=e=>e?.budgetConfirmed===!0&&e.confirmedTokenBudget!==null});var YR,XB=l(()=>{"use strict";YR=e=>{let t=e.costControls;if(t?.budgetConfirmed!==!0)return e.maxRounds;let r=t.maxTrials;return r!=null&&Number.isFinite(r)&&r>=1?Math.min(e.maxRounds,Math.floor(r)):e.maxRounds}});var I=l(()=>{"use strict";fa();ch();w1();sR();mh();gR();E1();R1();v1();C1();iR();L1();ya();j1();AR();SR();N1();F1();vr();$d();$1();G1();V1();K1();J1();Y1();Q1();eB();tB();CR();rB();oB();Ph();iB();PB();AB();bB();_B();kB();wB();TB();EB();RB();FR();vB();bh();CB();LB();xB();zR();IB();$B();zB();UB();BB();ao();_a();tu();KR();qB();ru();JB();YB();XB()});var XR=l(()=>{"use strict";Sc()});var Bne,eG,tG=l(()=>{"use strict";XR();Bne=/"(?:input_tokens|inputTokens)"\s*:\s*(\d+)[\s\S]{0,240}?"(?:output_tokens|outputTokens)"\s*:\s*(\d+)/g,eG=e=>{let t=Jn(e);if(t!==null)return t.totalTokens;let r=[...e.matchAll(Bne)],o=r[r.length-1];if(o===void 0)return null;let n=Number(o[1])+Number(o[2]);return Number.isFinite(n)&&n>=1?n:null}});var oG,Gne,Vne,Cr,Kne,qne,rG,Ch,nG,Jne,Ot,sG,iG,aG,ir=l(()=>{"use strict";XR();tG();oG=e=>e.errorKind==="writer_timeout"||/timed out after/i.test(e.errorMessage),Gne=/usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i,Vne=/ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i,Cr=e=>{if(e.errorKind!==void 0)return e.errorKind;if(e.stopped===!0)return"writer_interrupted";if(/timed out after/i.test(e.errorMessage))return"writer_timeout";if(/did not reply/i.test(e.errorMessage))return"writer_no_reply";if(Gne.test(e.errorMessage))return"usage_limit";if(Vne.test(e.errorMessage))return"action_required";if(/budget[_ ]?exceeded|token budget|spend ceiling|max spend/i.test(e.errorMessage))return"budget_exceeded"},Kne="Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.",qne="The writer waited on terminal input and did not return a prompt.",rG=/authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i,Ch=e=>{let t=e.trim();if(t.length===0||t.length>=500||!rG.test(t))return null;let r=t.split(`
`).map(o=>o.trim()).find(o=>rG.test(o))??t;return r.length>280?`${r.slice(0,277)}...`:r},nG=e=>{let t=e.trim();return t.length===0||t.length>=500?!1:/^(Error|Warning|Fatal|✖)/i.test(t)?!0:/authentication required|please run .+login|not logged in|login required/i.test(t)},Jne=e=>Ch(e.stdout)??Ch(e.stderr)??(nG(e.replyFile)?Ch(e.replyFile):null),Ot=e=>{if(/not inside a trusted directory|skip-git-repo-check/i.test(e))return Kne;let t=e.trim();return t.startsWith("Reading additional input from stdin...")&&t.length<500?qne:null},sG=e=>{let t=e.trim();return t.length===0?null:Ot(t)!==null?t:Ch(t)??(nG(t)?t:null)},iG=e=>e.writerAgent!=="codex"?e.baseArgs:["exec","--skip-git-repo-check","--ephemeral","--color","never","--json","--output-last-message",e.replyPath,...e.baseArgs.slice(1)],aG=e=>{let t=e.replyFileText?.trim()??"",r=Ot([t,e.stdout,e.stderr].join(`
`));if(r!==null)return{ok:!1,errorMessage:r};let o=Jne({replyFile:t,stdout:e.stdout,stderr:e.stderr});if(o!==null){let i=Cr({errorMessage:o});return i===void 0?{ok:!1,errorMessage:o}:{ok:!1,errorMessage:o,errorKind:i}}let n=eG([e.stdout,e.stderr,t].join(`
`));if(t.length>0)return{ok:!0,text:t,tokens:n};if(e.writerAgent==="claude-cli"){let i=Jn(e.stdout);if(i!==null&&i.text.trim().length>0)return{ok:!0,text:i.text,tokens:i.totalTokens}}let s=e.stdout.trim().length>0?e.stdout.trim():e.stderr.trim();return s.length>0?{ok:!0,text:s,tokens:n}:{ok:!1,errorMessage:"The writer did not reply.",errorKind:"writer_no_reply"}}});var Yne,cG,lG,ws,Lh=l(()=>{"use strict";ir();Yne=400,cG=(e,t=Yne)=>{let r=e.trim();return r.length<=t?r:`${r.slice(0,t)}\u2026`},lG=e=>{let t=e.judgement?.rawReply?.trim()??"";return t.length>0?t:sG(e.promptText)},ws=e=>{let t=e.wizard?.lastWriterParseFailureReply?.trim()??"";if(t.length>0)return t;let r=e.revisions.find(n=>n.roundNumber===e.currentRound),o=r===void 0?null:lG(r);if(o!==null)return o.trim();for(let n=e.revisions.length-1;n>=0;n-=1){let s=lG(e.revisions[n]);if(s!==null)return s.trim()}return null}});var O,Xne,xh,me,Ts,uG,dG,pG,mG,Me=l(()=>{"use strict";O="manual",Xne=["claude-cli","codex","cursor","antigravity"],xh={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},me=e=>e===O?"You":e in xh?xh[e]:e,Ts=e=>Xne.filter(t=>e.includes(t)),uG=e=>{let t=Ts(e),r=t[0];return r===void 0?null:{judge:r,improver:t[1]??r}},dG=(e,t)=>t===O?O:e.find(r=>r===t)??null,pG=(e,t,r)=>{let o=Ts(e),n=dG(o,t),s=dG(o,r);return n===null||s===null?null:{judge:n,improver:s}},mG=(e,t,r)=>{let o=Ts(e);return t===null||t.trim()===""?r!==O?r:o[0]??null:t===O?null:o.find(n=>n===t)??null}});var gG,Ih,ZR,Es,QR,Rt,uo,Ae,lt=l(()=>{"use strict";gG=m(require("node:fs")),Ih=m(require("node:os")),ZR=m(require("node:path"));Uo();Es="~",QR=e=>e.length>1&&e.endsWith("/")?e.slice(0,-1):e,Rt=e=>{let t=Ih.default.homedir(),r=QR(e);return r===t?"~":r.startsWith(`${t}/`)?`~${r.slice(t.length)}`:r},uo=e=>{let t=e.trim().length===0?"~":e.trim(),r=Qe(t),o=ZR.default.isAbsolute(r)?QR(r):QR(ZR.default.resolve(Ih.default.homedir(),r));try{if(!gG.default.statSync(o).isDirectory())return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}catch{return{ok:!1,errorMessage:"Choose a folder that exists on this computer."}}return{ok:!0,path:o,display:Rt(o)}},Ae=e=>e.workingDirectory!==void 0&&e.workingDirectory.length>0?e.workingDirectory:Ih.default.homedir()});var dt,rn=l(()=>{"use strict";dt='<svg class="sdlc-tip-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.15V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="5.15" r="0.75" fill="currentColor"/></svg>'});var ev,fG,Zne,yG,hG,tv=l(()=>{"use strict";I();Me();lt();rn();ev=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fG=e=>e==="active"?'<span class="sdlc-spin sdlc-pipeline-mark" aria-hidden="true"></span>':e==="done"?'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-done" aria-hidden="true">\u2713</span>':'<span class="sdlc-pipeline-mark sdlc-pipeline-mark-pending" aria-hidden="true"></span>',Zne=e=>{let t=fG(e.state),r=`<h2>${ev(e.infoTitle)}</h2>${e.infoBodyHtml}`;return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${e.state}"><div class="sdlc-pipeline-row">${t}<span class="sdlc-pipeline-label">${ev(e.label)}</span><button type="button" class="sdlc-field-info" data-sdlc-pipeline-info aria-label="About this step">${dt}</button></div><template>${r}</template></li>`},yG=e=>{let t=e.wizard;if(t===void 0)return"";let r=kh({status:e.status,wizard:t,writerLabel:me(e.judgeModel),runnerLabel:me(e.runnerModel??e.judgeModel),folderDisplay:Rt(Ae(e)),currentRound:e.currentRound});return r.length===0?"":`<ol class="sdlc-pipeline" aria-label="What is happening on this computer">${r.map(Zne).join("")}</ol>`},hG=e=>{let t=e.wizard;if(t===void 0)return"";let r=kh({status:e.status,wizard:t,writerLabel:me(e.judgeModel),runnerLabel:me(e.runnerModel??e.judgeModel),folderDisplay:Rt(Ae(e)),currentRound:e.currentRound});return r.length===0?"":`<h2>Sub-steps on this computer</h2><ol class="sdlc-pipeline sdlc-pipeline-modal" aria-label="Pipeline sub-steps">${r.map(n=>{let s=n.state==="active"?' <span class="sdlc-pipeline-now muted">(now)</span>':"";return`<li class="sdlc-pipeline-step sdlc-pipeline-step-${n.state}"><div class="sdlc-pipeline-row">${fG(n.state)}<span class="sdlc-pipeline-label">${ev(n.label)}${s}</span></div></li>`}).join("")}</ol>`}});var ar,SG,PG,AG,rv=l(()=>{"use strict";I();ar=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),SG="Generalize has not produced template variables yet \u2014 your source prompt is unchanged. Run or review Step 1 in the gate below when you are ready.",PG=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${ar(SG)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(i=>`<li><strong>{{${ar(i.name)}}}</strong> \u2014 ${ar(i.description)} (sample: ${ar(i.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?'<p class="muted">No templated prompt text was saved.</p>':`<h2>Templated prompt</h2><pre class="sdlc-pre">${ar(r)}</pre>`,n=rr(e).trim(),s=n.length===0||n===r?"":`<h2>Sample with variables filled</h2><pre class="sdlc-pre">${ar(n)}</pre>`;return`${t}${o}${s}`},AG=e=>{if(e.variables.length===0)return`<p class="muted sdlc-wizard-generalize-empty">${ar(SG)}</p>`;let t=`<ul class="sdlc-wizard-vars">${e.variables.map(n=>`<li><strong>{{${ar(n.name)}}}</strong> \u2014 ${ar(n.description)} (sample: ${ar(n.sampleValue)})</li>`).join("")}</ul>`,r=e.templatedPrompt.trim(),o=r.length===0?"":`<pre class="sdlc-pre">${ar(r)}</pre>`;return`${t}${o}`}});var nu,ov=l(()=>{"use strict";nu=e=>e.revisions.filter(t=>t.judgement?.score!==null&&t.judgement?.score!==void 0)});var bG,_G=l(()=>{"use strict";I();bG=(e,t)=>{if(e.judgePromptTextOnly===!0){let n=Ss({goal:e.goal,promptText:t.promptText,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return n.length===0?null:n}let r=t.run;if(r===void 0)return null;let o=hs({goal:e.goal,lookedAt:r.lookedAt??"the writer reply",evidence:r.evidence??r.output,tokens:r.tokens,delayMs:r.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}).trim();return o.length===0?null:o}});var nv,su,sv=l(()=>{"use strict";rn();_G();nv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),su=e=>{let t=bG(e.cycle,{promptText:e.promptText,run:e.run});if(t===null)return"";let r=`Round ${e.roundNumber}`;return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-judge-info" data-sdlc-revision-judge-prompt-info aria-label="View judge prompt for ${nv(r)}">${dt}</button><template data-sdlc-revision-judge-prompt><h2>Judge prompt \u2014 ${nv(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${nv(t)}</pre></template>`}});var iv,iu,av=l(()=>{"use strict";rn();iv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),iu=e=>{let t=e.promptText.trim();if(t.length===0)return"";let r=e.roundLabel.trim();return`<button type="button" class="sdlc-field-info sdlc-wizard-revision-prompt-info" data-sdlc-revision-round-prompt-info aria-label="View prompt for ${iv(r)}">${dt}</button><template data-sdlc-revision-round-prompt><h2>Prompt \u2014 ${iv(r)}</h2><pre class="mono sdlc-exact-prompt-pre">${iv(t)}</pre></template>`}});var Wh,Ta,lv=l(()=>{"use strict";ov();sv();av();Wh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ta=e=>{let t=nu(e.cycle),r=e.cycle.wizard,n=(r!==void 0&&(r.gate==="optimize_modules"||r.phase==="optimize_modules")?r.modules[r.currentModuleIndex]:void 0)?.statistics?.bestScore,s=n!=null;if(t.length===0&&e.cycle.revisions.length===0)return"";let i=t.length===0&&!s?`<div class="alert-error">No scored revisions yet. ${e.interactive?"Check the run error above, then rerun this step with feedback or restart evaluate from Step 1.":"Wait for runner and judge to finish this module."}</div>`:"",a=e.caption===void 0?"":`<p class="muted">${Wh(e.caption)}</p>`,c=e.cycle.wizard?.gate==="optimize_modules"||e.cycle.wizard?.phase==="optimize_modules",d=g=>c&&g===0?"Trial run":`Round ${g}`,u=e.cycle.revisions.map(g=>{let f=g.judgement?.score,y=f==null?`${d(g.roundNumber)} \u2014 not scored`:`${d(g.roundNumber)} \u2014 ${f}`,P=g.judgement?.reasons?.trim()??"",h=P.length===0?"":`<br><span class="muted">${Wh(P)}</span>`,p=iu({roundLabel:d(g.roundNumber),promptText:g.promptText}),S=su({cycle:e.cycle,roundNumber:g.roundNumber,promptText:g.promptText,run:g.run}),b=`${p}${S}`;if(e.interactive){let k=e.selectedRound===g.roundNumber?" checked":"";return`<li class="sdlc-wizard-revision-row"><label class="sdlc-wizard-revision-label"><input type="radio" name="wizardRevisionRound" value="${g.roundNumber}"${k}> <span class="sdlc-wizard-revision-title">${Wh(y)}</span></label>${b}${h}</li>`}return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Wh(y)}</span>${b}${h}</li>`}).join("");return`${i}${a}<ul class="sdlc-wizard-revisions sdlc-wizard-module-rounds">${u}</ul>`}});var cv,kG,wG,TG,dv=l(()=>{"use strict";cv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),kG=e=>e.length===0?"":`<ol class="sdlc-wizard-chunks">${e.map(t=>`<li class="sdlc-wizard-chunk"><strong>${cv(t.title)}</strong><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${cv(t.prompt)}</pre></li>`).join("")}</ol>`,wG=e=>kG([...e.modules].sort((t,r)=>t.order-r.order).map(t=>({title:t.title,prompt:t.prompt}))),TG=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0||t.phase!=="optimize_modules"&&t.gate!=="optimize_modules")return"";let r=t.selectedSplitOptionId===null?null:t.splitOptions.find(n=>n.id===t.selectedSplitOptionId)?.title;return`<section class="card sdlc-wizard-separated-summary" aria-label="Separated modules">
    <p class="eyebrow">Step 3 \u2014 Separate</p>
    <h2>${r==null?"Separated modules":`Separated modules (${cv(r)})`}</h2>
    <p class="muted">These chunks carry into module optimization.</p>
    ${kG(t.modules.map(n=>({title:n.title,prompt:n.prompt})))}
  </section>`}});var au,Qne,Oh,uv=l(()=>{"use strict";I();dv();au=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qne=e=>{let t=e.wizard;return t===void 0?"":or({wizard:t,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score}))}).trim()},Oh=(e,t)=>{let r=t.topology==="chain"?"Chain orchestration: modules run in order; each module\u2019s runner can read the previous module\u2019s output when building context.":"Parallel orchestration: modules are independent; runners do not see other modules\u2019 output (faster, but wording may overlap).",o=Qne(e),n=e.wizard,s=n?.orchestratorSkill===null||n?.orchestratorSkill===void 0?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${au(n.orchestratorSkill.fileName)}</code> \u2014 ${au(n.orchestratorSkill.name)}.</p>`,i=o.length===0?"":`<details class="sdlc-wizard-split-parent-details"><summary class="sdlc-wizard-split-parent-summary">Step 2 parent prompt this split derives from</summary>${s}<pre class="sdlc-pre sdlc-wizard-parent-prompt-body">${au(o)}</pre></details>`,a=t.modules.length,c=a===0?"":`<h4 class="sdlc-wizard-split-modules-heading">Separated module prompts (${a})</h4>`,d=wG(t);return`<div class="sdlc-wizard-split-option-detail">
    <p class="sdlc-wizard-split-orchestration"><strong>Orchestration for this option:</strong> ${au(r)} <span class="muted">${au(t.summary)}</span></p>
    ${i}
    ${c}
    ${d}
  </div>`}});var Ke,ese,tse,rse,ose,Mh,nse,sse,ise,ase,lse,cse,Ea,jh=l(()=>{"use strict";I();tv();rv();lv();sv();av();uv();Ke=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ese={"wizard-1":"generalize","wizard-2":"evaluate","wizard-3":"separate","wizard-4":"optimize_modules"},tse=(e,t,r=320)=>{let o=t.trim();if(o.length===0)return"";let n=o.length<=r?`<pre class="sdlc-pre">${Ke(o)}</pre>`:`<p class="sdlc-pre-preview mono">${Ke(o.slice(0,r))}\u2026</p><details class="sdlc-pre-expand"><summary>Show full text</summary><pre class="sdlc-pre">${Ke(o)}</pre></details>`;return`<h2>${Ke(e)}</h2>${n}`},rse=e=>{let t=e.wizard;if(t===void 0||t.phase!=="evaluate")return"";let r=t.templatedPrompt.trim(),o=rr(t).trim(),n=or({wizard:t,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}).trim(),i=t.gate===null&&!L(e.status)&&o.length>0?o:n.length>0?n:r;return i.length===0?'<h2>What is being evaluated</h2><p class="muted">Generalized prompt text will appear here once step 1 finishes.</p>':`${n.length>0?'<p class="muted">Prompt-text judge scores this revision (no folder run).</p>':'<p class="muted">Prompt-text judge scores templated prompt revisions.</p>'}${tse("What is being evaluated",i)}`},ose=(e,t)=>{let r=e.wizard;if(r===void 0||L(e.status))return"";let o=ese[t];return o===void 0||r.phase!==o?"":hG(e)},Mh=(e,t,r)=>{let o=ose(e,t),n=t==="wizard-2"?rse(e):"";return`${o}${n}${r}`},nse=e=>{let t=e.wizard;if(t===void 0)return null;let o=t.attempts.filter(i=>i.step==="evaluate").at(-1);if(o===void 0||typeof o.output!="object"||o.output===null)return null;let n=o.output.revisions;if(!Array.isArray(n))return null;let s=[];for(let i of n){if(typeof i!="object"||i===null)continue;let a=i,c=a.roundNumber,d=a.promptText;typeof c!="number"||typeof d!="string"||s.push({roundNumber:c,promptText:d,score:typeof a.score=="number"?a.score:null,passed:typeof a.passed=="boolean"?a.passed:null,reasons:typeof a.reasons=="string"?a.reasons:null})}return s.length===0?null:s},sse=e=>{let t=e.wizard;return t===void 0?"":PG(t)},ise=(e,t,r)=>`<ul class="sdlc-wizard-revisions">${t.map(n=>{let s=n.score===null?`Round ${n.roundNumber} \u2014 not scored`:`Round ${n.roundNumber} \u2014 ${n.score}`,i=r===n.roundNumber?" (selected)":"",a=n.reasons?.trim()??"",c=a.length===0?"":`<br><span class="muted">${Ke(a)}</span>`,d=`Round ${n.roundNumber}`,u=iu({roundLabel:d,promptText:n.promptText}),g=su({cycle:e,roundNumber:n.roundNumber,promptText:n.promptText});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ke(s)}${i}</span>${u}${g}${c}</li>`}).join("")}</ul>`,ase=e=>{let t=e.wizard;if(t===void 0)return"";if(t.phase==="evaluate"||t.gate==="evaluate")return Ta({cycle:e,interactive:!1,selectedRound:t.evaluateSelectedRound,caption:"Scored revisions from prompt-text judge (no folder run)."});let o=nse(e);if(o!==null)return`<p class="muted">Scored revisions from step 2 evaluate.</p>${ise(e,o,t.evaluateSelectedRound)}`;if(t.evaluateSelectedRound!==null){let s=or({wizard:t,revisions:e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score}))});return`<p class="muted">Selected round ${t.evaluateSelectedRound} (concrete reference for step 3; split options use {{placeholders}} from the generalized template).</p><h2>Evaluated prompt</h2><pre class="mono">${Ke(s)}</pre>`}if(t.phase==="complete"||t.gate===null&&t.modules.length>0){let s=e.revisions.filter(a=>a.judgement!==null&&a.judgement!==void 0);if(s.length>0)return`<p class="muted">Evaluate finished \u2014 scored prompt revisions before module optimization.</p><ul class="sdlc-wizard-revisions">${s.map(c=>{let d=c.judgement?.score??"\u2014",u=`Round ${c.roundNumber} \u2014 score ${d}`,g=iu({roundLabel:`Round ${c.roundNumber}`,promptText:c.promptText}),f=su({cycle:e,roundNumber:c.roundNumber,promptText:c.promptText,run:c.run});return`<li class="sdlc-wizard-revision-row"><span class="sdlc-wizard-revision-title">${Ke(u)}</span>${g}${f}</li>`}).join("")}</ul>`;let i=t.templatedPrompt.trim();return i.length>0?`<p class="muted">Evaluate finished. Prompt-text scoring completed before module optimization.</p><h2>Generalized template</h2><pre class="sdlc-pre">${Ke(i)}</pre>`:'<p class="muted">Evaluate finished. Scoring details were not stored in this run export.</p>'}return'<p class="muted">Evaluate has not run yet.</p>'},lse=e=>{let t=e.wizard;if(t===void 0)return"";if(t.splitOptions.length===0){if(t.modules.length>0){let o=t.modules.map(n=>`<li><strong>${Ke(n.title)}</strong> <span class="muted">(${Ke(n.status)})</span></li>`).join("");return`<p class="muted">Separate finished \u2014 ${t.modules.length} module${t.modules.length===1?"":"s"} defined for step 4.</p><ul class="sdlc-wizard-chunks">${o}</ul>`}return'<p class="muted">No split options yet.</p>'}return`<ul class="sdlc-wizard-splits">${t.splitOptions.map(o=>{let n=o.recommended?' <span class="sdlc-badge">Recommended</span>':"",s=t.selectedSplitOptionId===o.id?" (selected)":"";return`<li class="sdlc-wizard-split-option"><strong>${Ke(o.title)}</strong>${n}${Ke(s)}${Oh(e,o)}</li>`}).join("")}</ul>`},cse=e=>{let t=e.wizard;if(t===void 0)return"";if(t.modules.length===0)return'<p class="muted">No modules yet. Complete separate first.</p>';let r=t.modules.map((n,s)=>{let i=`Module ${s+1} of ${t.modules.length}`,a=t.phase!=="complete"&&s===t.currentModuleIndex?" \u2014 in progress":"";return`<li class="sdlc-wizard-module-prompt"><span class="muted">${Ke(i)}</span> <strong>${Ke(n.title)}</strong>${Ke(a)}<pre class="sdlc-pre sdlc-wizard-chunk-prompt">${Ke(n.prompt)}</pre></li>`}).join(""),o=t.phase==="optimize_modules"||t.gate==="optimize_modules"?Ta({cycle:e,interactive:!1,caption:"Scored rounds for the current module (runner + judge)."}):"";return`<ul class="sdlc-wizard-chunks">${r}</ul>${o}`},Ea=(e,t)=>{switch(t){case"wizard-1":return Mh(e,t,sse(e));case"wizard-2":return Mh(e,t,ase(e));case"wizard-3":return Mh(e,t,lse(e));case"wizard-4":return Mh(e,t,cse(e));default:return""}}});var dse,use,EG,RG,vG=l(()=>{"use strict";I();Lh();ir();jh();dse=e=>{let t=/^(?:round|score)-(\d+)$/.exec(e);if(t===null)return null;let r=Number(t[1]);return Number.isInteger(r)?r:null},use=e=>{let t=e.goal.trim();return t.length===0?null:t},EG=(e,t,r,o,n)=>{let s=Ot(t);return{title:e,goal:n,scoreLabel:r===null?null:`Score ${r} / 100`,feedback:o,promptText:s===null?t:null,promptNote:s,bodyHtml:null}},RG=(e,t)=>{let r=use(e);if(t.id.startsWith("wizard-")){let s=Ea(e,t.id);return{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:s.trim().length===0?null:s}}if(t.id==="end"){let s=Dd(e,t);if(s!==null){let a=ws(e);return{title:t.label,goal:r,scoreLabel:null,feedback:s,promptText:a,promptNote:null,bodyHtml:null}}let i=Se(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));return i===null?{title:t.label,goal:r,scoreLabel:null,feedback:e.errorMessage,promptText:null,promptNote:null,bodyHtml:null}:EG(t.label,i.promptText,i.score,i.reasons,r)}let o=t.id==="rewrite"?e.currentRound:dse(t.id),n=o===null?void 0:e.revisions.find(s=>s.roundNumber===o);return n===void 0?{title:t.label,goal:r,scoreLabel:null,feedback:t.detail,promptText:null,promptNote:null,bodyHtml:null}:EG(t.label,n.promptText,n.judgement?.score??null,n.judgement?.reasons??t.detail,r)}});var Rs,CG,LG=l(()=>{"use strict";Rs=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),CG=e=>{let t=e.bodyHtml!==null?"":e.scoreLabel===null?e.feedback===null||e.feedback.trim().length===0?'<p class="muted">Not scored yet.</p>':"":`<p class="muted">${Rs(e.scoreLabel)}</p>`,r=e.bodyHtml===null?"":`<div class="sdlc-wizard-step-modal">${e.bodyHtml}</div>`,o=e.feedback===null||e.feedback.trim().length===0?"":`<h2>Feedback</h2><p>${Rs(e.feedback.trim())}</p>`,n=e.title==="Failed"&&e.promptText!==null?"Model reply":"Saved prompt",s=e.promptNote!==null?`<div class="alert-error">${Rs(e.promptNote)}</div>`:e.promptText===null?"":`<h2>${Rs(n)}</h2><pre class="mono">${Rs(e.promptText)}</pre>`,i=e.goal===null?"":`<dl class="sdlc-wizard-resume-inputs-list sdlc-node-dialog-goal"><div><dt>Goal</dt><dd>${Rs(e.goal)}</dd></div></dl>`;return`<h2>${Rs(e.title)}</h2>${i}${t}${r}${o}${s}`}});var pse,xG,lu,pv,Nh=l(()=>{"use strict";I();pse=new Set(["wizard-1","wizard-2","wizard-3","wizard-4"]),xG=e=>{let t=e.wizard;if(t===void 0||t.phase==="complete"||L(e.status))return null;let r=er(t);return r<0||r>3?null:`wizard-${r+1}`},lu=(e,t)=>pse.has(t)?xG(e)===t:!1,pv="Skip this wizard step and move on? Running writers stop. You may skip review gates."});var mse,Dh,mv=l(()=>{"use strict";mse='<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',Dh=e=>`<button${e.id===void 0?"":` id="${e.id.replaceAll('"',"&quot;")}"`} type="${e.type}" class="history-dialog-close" aria-label="Close">${mse}</button>`});var vs,Hh=l(()=>{"use strict";I();vs=e=>{let t=e.revisions.find(n=>n.roundNumber===e.currentRound),r=t?.judgement?.score,o=t?.judgement?.reasons?.trim()??"";return t===void 0||r===null||r===void 0||o.length===0?null:Od({current:{roundNumber:t.roundNumber,promptText:t.promptText,score:r,reasons:o},priorRounds:jd(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??null,reasons:n.judgement?.reasons??null})),e.currentRound)})}});var gse,IG,fse,gv,WG,yse,hse,Sse,Pse,OG,MG=l(()=>{"use strict";I();Hh();gse={"wizard-1":0,"wizard-2":1,"wizard-3":2,"wizard-4":3},IG=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},fse=e=>gse[e]??null,gv=(e,t)=>{let r=e.wizard,o=fse(t);if(r===void 0||o===null)return!1;if(r.phase==="complete")return!0;let n=er(r);return o<n||o===n},WG=e=>{let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return t!==void 0?t:e.revisions.length===0?null:e.revisions.at(-1)??null},yse=e=>{let t=e.wizard;if(t===void 0)return null;let r=e.revisions[0]?.promptText.trim()??"",o=r.length>0?r:rr(t).trim();return o.length===0?null:Bd({goal:e.goal,sourcePrompt:o,avoid:t.avoidByStep.generalize,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:IG(e,"generalize")})},hse=e=>{let t=e.wizard;if(t===void 0)return null;if(e.status==="improving"){let n=vs(e);return n===null?null:en({goal:e.goal,promptText:n.promptText,score:n.score,reasons:n.reasons,avoid:n.avoid,instructions:e.improverInstructions})}let o=WG(e)?.promptText.trim()??or({wizard:t,revisions:e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score}))}).trim();return o.length===0?null:Ss({goal:e.goal,promptText:o,passScore:e.passScore,instructions:e.judgeInstructions})},Sse=e=>{let t=e.wizard;if(t===void 0)return null;let r=or({wizard:t,revisions:e.revisions.map(o=>({roundNumber:o.roundNumber,promptText:o.promptText,score:o.judgement?.score}))});return t.templatedPrompt.trim().length===0?null:Gd({goal:e.goal,templatedPrompt:t.templatedPrompt,variables:t.variables,evaluatedPromptReference:r,avoid:t.avoidByStep.separate,stepInstructions:t.pendingStepInstructions,lastAttemptSummary:IG(e,"separate")})},Pse=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return null;let r=t.phase==="complete"?Math.max(0,t.modules.length-1):t.currentModuleIndex,o=t.modules[r];if(o===void 0)return null;let n=io(t),s=As(o.prompt,n).trim();if(s.length===0)return null;if(e.status==="improving"){let c=vs(e);return c===null?null:en({goal:e.goal,promptText:c.promptText,score:c.score,reasons:c.reasons,avoid:c.avoid,instructions:e.improverInstructions})}let i=WG(e),a=i?.run;return a!==void 0&&(e.judgePhase==="scoring"||e.status==="judging"||L(e.status)&&i?.judgement!==null)?hs({goal:e.goal,lookedAt:a.lookedAt??"the writer reply",evidence:a.evidence??a.output,tokens:a.tokens,delayMs:a.delayMs,passScore:e.passScore,instructions:e.judgeInstructions}):Vd({promptText:s,runnerInstructions:t.runnerInstructions??e.judgeInstructions??null,chainPriorOutput:Ps(t,r).output,moduleTitle:o.title})},OG=(e,t)=>{if(!gv(e,t))return null;switch(t){case"wizard-1":return yse(e);case"wizard-2":return hse(e);case"wizard-3":return Sse(e);case"wizard-4":return Pse(e);default:return null}}});var Ase,Fh,fv=l(()=>{"use strict";I();Ase=e=>{let t=/^wizard-([1-4])$/.exec(e);return t===null?null:Number(t[1])-1},Fh=(e,t)=>{let r=e.wizard,o=Ase(t);if(r===void 0||o===null)return"pending";if(r.phase==="complete")return"done";let n=er(r);return o<n?"done":o===n&&L(e.status)&&e.status==="failed"?"failed":o<=n&&L(e.status)?"done":"pending"}});var bse,Ra,$h=l(()=>{"use strict";rn();MG();fv();bse=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Ra=(e,t,r)=>{if(r?.forOutcomeSummary===!0){if(Fh(e,t)==="pending")return""}else if(!gv(e,t))return"";let o=OG(e,t);return o===null||o.trim().length===0?"":`<button type="button" class="sdlc-field-info sdlc-wizard-step-prompt-info" data-sdlc-wizard-step-prompt-info aria-label="View exact prompt sent to the writer">${dt}</button><template data-sdlc-wizard-step-prompt><h2>Exact prompt</h2><pre class="mono sdlc-exact-prompt-pre">${bse(o)}</pre></template>`}});var Cs,po,va=l(()=>{"use strict";Cs=e=>e.toLocaleString("en-US"),po=(e,t)=>e.revisions.reduce((r,o)=>t!==void 0&&o.roundNumber>t?r:r+(o.writerTokens??0)+(o.run?.tokens??0)+(o.judgement?.tokens??0),0)});var Lr,_se,jG,zh,NG,DG,Uh=l(()=>{"use strict";I();vG();LG();Nh();mv();rn();Lh();tv();$h();va();Lr=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_se=(e,t)=>{let r=Dd(t,e),o=r!==null,n=e.state==="active"?'<span class="sdlc-spin" aria-hidden="true"></span>':o?'<span class="sdlc-node-mark sdlc-node-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-node-mark" aria-hidden="true"></span>',s=/^score-(\d+)$/.exec(e.id),i=e.state==="done"&&s!==null?po(t,Number(s[1])):0,a=i>0?`<span class="sdlc-node-reason">${Cs(i)} tokens so far</span>`:"",c=e.state==="done"&&e.id.startsWith("score-")&&e.detail?`<span class="sdlc-node-reason">${Lr(e.detail)}</span>`:o&&r!==null?`<span class="sdlc-node-reason sdlc-node-reason-failed">${Lr(r)}</span>`:"",d=CG(RG(t,e)),u=t.wizard!==void 0&&t.wizard.phase==="complete"&&L(t.status)&&/^wizard-[1-4]$/.test(e.id)?` data-sdlc-outcome-step="${Lr(e.id)}"`:"",g=lu(t,e.id)?`<form method="POST" action="/prompt-optimizer" class="sdlc-node-skip sdlc-live-post" data-confirm-message="${Lr(pv)}"><input type="hidden" name="cycleId" value="${Lr(t.id)}"><input type="hidden" name="wizardStepId" value="${Lr(e.id)}"><button class="btn btn-link sdlc-node-skip-link" type="submit" name="intent" value="wizard-skip-step">Skip</button></form>`:"",f=e.state==="active"&&e.id.startsWith("wizard-")?yG(t):"",y=o?"failed":e.state,P=o?ws(t):null,h=P!==null?`<button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View model reply">${dt}</button><template data-sdlc-failure-reply><h2>Model reply</h2><pre class="mono">${Lr(P)}</pre></template>`:"",p=e.id.startsWith("wizard-")&&(e.state==="done"||e.state==="active"||o)?Ra(t,e.id):"";return`<li class="sdlc-node sdlc-node-${y}" data-sdlc-step-id="${Lr(e.id)}"><div class="sdlc-node-row"><button type="button" class="sdlc-node-open"${u} data-sdlc-node>${n}<span class="sdlc-node-label">${Lr(e.label)}${c}${a}</span></button><div class="sdlc-node-row-actions">${g}${p}${h}</div></div>${f}<template>${d}</template></li>`},jG=(e,t)=>`<ol class="sdlc-tree">${e.map(r=>_se(r,t)).join("")}</ol>`,zh=e=>`<div class="sdlc-score" aria-label="What the score means">${Nd(e).map(r=>`<span class="sdlc-band sdlc-band-${r.band}">${Lr(r.label)}</span>`).join("")}</div><p class="muted">${e} or higher passes. The score is how well the changes achieve the goal, including the tokens and the delay.</p>`,NG=`<dialog id="sdlc-node-dialog" class="history-dialog"><div class="history-dialog-bar"><form method="dialog">${Dh({type:"submit"})}</form></div><div class="history-dialog-body" data-sdlc-dialog-body></div></dialog>`,DG=`<script>
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
</script>`});var Bh,Gh,Vh,HG,yv=l(()=>{"use strict";Bh="support-reply",Gh="When this prompt is used on a customer email, the reply answers the question they asked, uses only facts present in the thread, and offers a refund only when the policy text allows that exact case.",Vh=["You are a support agent. Read the customer's email and write a helpful, professional reply.","Solve their problem. If they ask for a refund, follow the refund policy.","Keep the tone warm."].join(`
`),HG=["Write the one reply the customer will read.","","You will be given:","- CUSTOMER_MESSAGE","- ORDER_FACTS, the only facts that exist","- REFUND_POLICY, the only rules that exist","","Steps:","1. Name the question they actually asked, in one sentence inside the reply.","2. Answer from ORDER_FACTS. When a needed fact is absent, say it is not in the thread and ask for that one fact.","3. Offer a refund only by quoting the REFUND_POLICY rule that matches this case. Otherwise say a refund is not available under the policy you were given.","","Reply text only. Leave out your reasoning and any restatement of these steps."].join(`
`)});var Kh,FG,$G=l(()=>{"use strict";I();Uh();yv();Kh=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),FG=()=>`<section class="card">
      <p class="eyebrow">Prompt optimizer</p>
      <h1>How the prompt optimizer works</h1>
      <p class="lede"><strong>Run</strong> starts the four-step wizard: (1) generalize the prompt with <span class="mono">{{variables}}</span>, (2) evaluate revisions, (3) separate into modules, (4) optimize each module\u2014the <strong>runner</strong> executes and the judge scores only. Pause at each gate to continue or rerun with feedback. Wizard evaluate defaults use pass score <strong>${70}</strong> and up to <strong>${5}</strong> scored revisions in step 2. Click a timeline step to see the score, feedback, and saved prompt. Skills in the chosen folder fill the prompt field.</p>
      <p><a href="/prompt-optimizer">Back to the prompt optimizer</a></p>
      <h2>Goal and prompt</h2>
      <p>The goal is the outcome of using the prompt. The prompt is the instruction the model will follow. A stronger prompt changes the slots, the decision order, and when the model must stop. Pasting the goal onto the old prompt does not do that.</p>
      <h2>Score</h2>
      <p>Wizard step 2 and step 4 use pass score ${70}. A score includes the reason for that score. You can score it yourself, or let a writer score it.</p>
      ${zh(70)}
      <h2>Writers and folder</h2>
      <p>You choose the judge, the improver, and the runner for step 4. Each one has an optional instructions field, used with the goal. In step 4 the runner executes the module prompt in the folder you chose; the judge scores the changes only. If the prompt needs an input, put that input in the judge or runner instructions. After a score is saved, folder edits are put back so the next trial starts clean. Hover the info icon on a field for a best practice and an example. I'll score it and I'll rewrite it mean you do that step. A writer runs in the folder you choose, so it can read the harness and the code there. The next visit fills in the folder, judge, improver, and runner you last chose. The first visit uses your home directory and leaves those roles blank. Choose the project folder when the prompt is about that code. An optimizer that runs somewhere else cannot see that folder, so its score is not about this project. A writer that is not signed in stays blocked until its status says it is ready. Run this sample asks you to choose both roles first.</p>
      <h2>A bot on this computer</h2>
      <p>A bot starts the same wizard before it sends a Task. It does not ask you to paste the prompt into a different optimizer. GET <span class="mono">/prompt-optimizer/agent</span> lists the installed writers. POST JSON with goal, prompt, and workingDirectory starts a wizard run in that folder (pass ${70}, up to ${5} evaluate rounds). When only one writer is installed, that writer fills judge and improver. GET the same path with <span class="mono">?cycle=</span> until done is true, then use bestPrompt when status is passed or stopped. Do not use the prompt when status is failed. totalTokens is the reported writer tokens so far. The steps are also on the agent guideline.</p>
      <h2>Example</h2>
      <p>This sample is a support reply. The weak prompt can still invent a refund or skip the question the customer asked.</p>
      <h3>Goal</h3>
      <p>${Kh(Gh)}</p>
      <h3>Prompt the sample runs</h3>
      <pre class="mono">${Kh(Vh)}</pre>
      <h3>What a better prompt changes</h3>
      <pre class="mono">${Kh(HG)}</pre>
      <div class="actions">
        <a class="btn btn-primary" href="/prompt-optimizer?example=${Kh(Bh)}">Run this sample</a>
      </div>
    </section>`});var hv,qh,kse,zG,UG=l(()=>{"use strict";hv=m(require("node:fs")),qh=m(require("node:path")),kse=e=>qh.default.join(qh.default.dirname(e),"prompt-optimizer-wizard.log.jsonl"),zG=(e,t)=>{let r=kse(e),o=`${JSON.stringify({ts:new Date().toISOString(),...t})}
`;hv.default.mkdirSync(qh.default.dirname(r),{recursive:!0}),hv.default.appendFileSync(r,o,"utf8")}});var Ca,BG,wse,GG,Tse,VG,xr,Q,KG,z,vt=l(()=>{"use strict";Ca=m(require("node:fs")),BG=m(require("node:path"));I();UG();wse=e=>e.wizard===void 0?e:{...e,wizard:wR(e.wizard)},GG=new Set,Tse=e=>typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"&&"revisions"in e&&Array.isArray(e.revisions),VG=(e,t)=>{Ca.default.mkdirSync(BG.default.dirname(e),{recursive:!0});let r=`${e}.tmp`;Ca.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`),Ca.default.renameSync(r,e)},xr=e=>{if(!Ca.default.existsSync(e))return[];try{let t=JSON.parse(Ca.default.readFileSync(e,"utf8"));return Array.isArray(t)?t.filter(Tse).map(wse):[]}catch{return[]}},Q=(e,t)=>xr(e).find(r=>r.id===t)??null,KG=(e,t)=>{GG.add(t);let r=xr(e).filter(o=>o.id!==t);VG(e,r)},z=(e,t)=>{if(GG.has(t.id))return;let r=xr(e),o=r.some(n=>n.id===t.id)?r.map(n=>n.id===t.id?t:n):[t,...r];VG(e,o),zG(e,{cycleId:t.id,kind:"cycle_saved",phase:t.wizard?.phase,detail:t.status})}});var La,Ir,cu,qG,Jh,Ese,JG,YG,XG,Sv=l(()=>{"use strict";La=m(require("node:fs")),Ir=m(require("node:path")),cu=e=>{let t=e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60).replace(/-+$/g,"");return t.length>0?t:""},qG=e=>JSON.stringify(e.replace(/\s+/g," ").trim().slice(0,240)),Jh=(e,t)=>{let r=cu(e);return r.length>0?r:cu(t)},Ese=e=>{let t=Jh(e.fileName,e.name),r=e.promptText.trim(),o=e.name.trim();if(t.length===0||r.length===0||o.length===0)return null;let n=e.description.replace(/\s+/g," ").trim(),s=["---",`name: ${qG(o)}`,...n.length>0?[`description: ${qG(n)}`]:[],"---"];return{slug:t,document:[...s,"",r,""].join(`
`)}},JG=e=>`.cursor/skills/${e}/SKILL.md`,YG=(e,t)=>{let r=cu(t);if(r.length===0)return!1;let o=Ir.default.resolve(e),n=Ir.default.resolve(o,".cursor","skills"),s=Ir.default.resolve(o,JG(r));return s.startsWith(`${n}${Ir.default.sep}`)?La.default.existsSync(s):!1},XG=e=>{if(e.name.trim().length===0)return{ok:!1,errorCode:"name"};if(Jh(e.fileName??"",e.name).length===0)return{ok:!1,errorCode:"name"};if(e.promptText.trim().length===0)return{ok:!1,errorCode:"prompt"};let t=Ir.default.resolve(e.workingDirectory);try{if(!La.default.statSync(t).isDirectory())return{ok:!1,errorCode:"folder"}}catch{return{ok:!1,errorCode:"folder"}}let r=Ese({name:e.name,description:e.description,promptText:e.promptText,fileName:e.fileName??""});if(r===null)return{ok:!1,errorCode:"prompt"};let o=JG(r.slug),n=Ir.default.resolve(t,".cursor","skills"),s=Ir.default.resolve(t,o);if(!s.startsWith(`${n}${Ir.default.sep}`))return{ok:!1,errorCode:"path"};if(La.default.existsSync(s)&&e.overwrite!==!0)return{ok:!1,errorCode:"overwrite"};try{La.default.mkdirSync(Ir.default.dirname(s),{recursive:!0}),La.default.writeFileSync(s,r.document,"utf8")}catch{return{ok:!1,errorCode:"folder"}}return{ok:!0,relativePath:o}}});var Rse,ZG,QG,e2=l(()=>{"use strict";I();vt();lt();ir();Sv();Rse=/^\.cursor\/skills\/[a-z0-9-]+\/SKILL\.md$/,ZG=e=>{let t=e.get("savedSkill");return t!==null&&Rse.test(t)?`Saved the best prompt to ${t} in the selected folder.`:e.get("skillError")==="working"?"The run is still working.":e.get("skillError")==="missing"?"That run is not on this computer.":e.get("skillError")==="empty"?"This run has no scored prompt to save.":e.get("skillError")==="folder"?"The selected folder is not on this computer.":e.get("skillError")==="name"?"Use a name with letters or numbers.":e.get("skillError")==="prompt"?"Enter the prompt to save.":e.get("skillError")==="overwrite"?"That skill file already exists. Check Replace, then save again.":null},QG=e=>{if(e.posted?.get("intent")!=="save-skill")return{kind:"ignored"};let t=e.posted.get("cycleId")??"",r=Q(e.storePath,t),o=a=>`/prompt-optimizer?cycle=${encodeURIComponent(t)}&${a}`;if(r===null)return{kind:"redirect",location:"/prompt-optimizer?skillError=missing"};if(!L(r.status))return{kind:"redirect",location:o("skillError=working")};let n=Se(r.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})));if(n===null||Ot(n.promptText)!==null)return{kind:"redirect",location:o("skillError=empty")};let s=e.posted.get("skillPrompt")?.trim()??"",i=XG({workingDirectory:Ae(r),name:e.posted.get("skillName")??r.sourceSkill?.name??"",description:e.posted.get("skillDescription")??r.sourceSkill?.description??"",promptText:s.length>0?s:n.promptText,fileName:e.posted.get("skillFileName")??r.sourceSkill?.fileName??"",overwrite:e.posted.get("skillOverwrite")==="yes"});if(!i.ok){let a=i.errorCode==="path"?"folder":i.errorCode;return{kind:"redirect",location:o(`skillError=${a}`)}}return{kind:"redirect",location:o(`savedSkill=${encodeURIComponent(i.relativePath)}`)}}});var Yh,Xh,du=l(()=>{"use strict";I();Yh=e=>{if(e.budgetConfirmed===!0||e.maxSpendUsd===null||e.maxSpendUsd===void 0)return e;let t=e.targetTokenBudget;if(t==null||!Number.isFinite(t)||t<1)return e;let r=co({existing:e,confirmedTokenBudget:Math.round(t),confirmedMaxSpendUsd:e.maxSpendUsd,rateUsdPer1kTokens:e.rateUsdPer1kTokens});return r.ok?r.costControls:e},Xh=e=>{let t=e.estimatedSpendUsd,r=e.maxSpendUsd;return t==null||r===null||r===void 0?!1:t>r}});var on,uu=l(()=>{"use strict";I();du();on=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=UR(t),n=e.judgeModel==="manual"?null:e.judgeModel,s=VR({moduleCount:o.length,existing:e.costControls,writerId:n}),i=Yh(s);return{...e,status:"wizard_paused",errorMessage:null,errorKind:void 0,revisions:[],costControls:i,wizard:{...r,gate:"optimize_modules",selectedSplitOptionId:t.id,selectedSplitTopology:t.topology,modules:o,phase:"optimize_modules",currentModuleIndex:0,parameterValues:Object.keys(r.parameterValues??{}).length>0?r.parameterValues??{}:Qd(r.variables)},updatedAt:new Date().toISOString()}}});var nn,pu=l(()=>{"use strict";nn=e=>{let t=e.wizard;return t===void 0?e:{...e,status:"judging",judgePromptTextOnly:!1,errorMessage:null,wizard:{...t,gate:null,phase:"separate",splitOptions:[]},updatedAt:new Date().toISOString()}}});var Pv=l(()=>{"use strict";qt();bd();Sc()});var Av,t2,bv,r2,o2=l(()=>{"use strict";Av={ok:!1,errorMessage:"Stopped.",stopped:!0,errorKind:"writer_interrupted"},t2=e=>e.exitCode===null&&e.signalCode===null,bv=(e,t=2500)=>new Promise(r=>{let o="SIGTERM",n=!1,s={},i=()=>{a(o)},a=c=>{n||(n=!0,s.escalate!==void 0&&clearTimeout(s.escalate),e.removeListener("exit",i),r(c))};try{e.kill("SIGTERM")}catch{a("SIGTERM");return}if(!t2(e)){a("SIGTERM");return}e.once("exit",i),s.escalate=setTimeout(()=>{if(!t2(e)){a(o);return}o="SIGKILL";try{e.kill("SIGKILL")}catch{}a("SIGKILL")},t)}),r2=(e,t,r,o)=>{if(t===void 0)return;let n=()=>{o?.(),bv(e).then(s=>{r({...Av,killSignal:s})})};if(t.aborted){n();return}t.addEventListener("abort",n,{once:!0})}});var n2,mu,s2,_v,vse,wv,Tv,Cse,Lse,xse,i2,Ise,kv,a2,gu,l2,Wse,Ose,ut,Ls=l(()=>{"use strict";n2=require("node:child_process"),mu=m(require("node:fs")),s2=m(require("node:os")),_v=m(require("node:path"));Pv();o2();ir();vse=["claude-cli","codex","cursor","antigravity"],wv=18e4,Tv=6e5,Cse=12e4,Lse=9e5,xse="AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN",i2="AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS",Ise="AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS",kv=e=>{if(e===void 0||e.trim().length===0)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null},a2=e=>{let t=e.promptText.length,r;t<2e3?r=18e4:t<6e3?r=3e5:t<12e3?r=45e4:r=6e5,e.isModuleRun===!0&&(r=kv(process.env[i2])??Math.max(r,Tv));let o=e.ceilingMs!==void 0&&Number.isFinite(e.ceilingMs)&&e.ceilingMs>0?e.ceilingMs:kv(process.env[Ise])??Lse;return Math.min(o,Math.max(Cse,r))},gu=e=>e?.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:e?.isModuleRun===!0?kv(process.env[i2])??Tv:wv,l2=e=>`The writer timed out after ${e}ms.`,Wse=e=>vse.includes(e),Ose=e=>e===!0||process.env[xse]==="1",ut=e=>new Promise(t=>{if(e.signal?.aborted){t(Av);return}if(Ose(e.dryRun)){t({ok:!0,text:"[dry-run] Writer spawn skipped.",tokens:null});return}if(!Wse(e.writerAgent)){t({ok:!1,errorMessage:"The writer is not supported on this computer."});return}let r=e.writerAgent,o=Ar(r,e.prompt,Te({}));if(o===null){t({ok:!1,errorMessage:"The writer CLI is not available."});return}if(!mu.default.existsSync(e.workingDirectory)){t({ok:!1,errorMessage:"Choose a folder that exists on this computer."});return}let n=e.timeoutMs!==void 0&&Number.isFinite(e.timeoutMs)&&e.timeoutMs>0?e.timeoutMs:wv,s=_v.default.join(mu.default.mkdtempSync(_v.default.join(s2.default.tmpdir(),"prompt-sdlc-")),"reply.txt"),i=iG({writerAgent:r,baseArgs:o.args,replyPath:s}),a=[],c=[],d={settled:!1,stopReason:null,timer:void 0},u=(0,n2.spawn)(o.command,[...i],{cwd:e.workingDirectory,stdio:["ignore","pipe","pipe"]}),g=f=>{d.settled||(d.settled=!0,clearTimeout(d.timer),t(f))};r2(u,e.signal,g,()=>{d.stopReason="abort"}),d.timer=setTimeout(()=>{d.stopReason="timeout",bv(u).then(f=>{g({ok:!1,errorMessage:l2(n),errorKind:"writer_timeout",killSignal:f})})},n),u.stdout.on("data",f=>{a.push(Buffer.from(f))}),u.stderr.on("data",f=>{c.push(Buffer.from(f))}),u.on("error",()=>g({ok:!1,errorMessage:"The writer failed to start."})),u.on("close",()=>{if(d.settled)return;let f=mu.default.existsSync(s)?mu.default.readFileSync(s,"utf8"):null,y=aG({writerAgent:r,stdout:Buffer.concat(a).toString("utf8"),stderr:Buffer.concat(c).toString("utf8"),replyFileText:f});if(y.ok&&d.stopReason!=="abort"){g(y);return}d.stopReason===null&&g(y)})})});var Mse,fu,Ev=l(()=>{"use strict";I();va();Mse=e=>{if(e.wizard!==void 0){let t=qd(e.wizard),r=po(e);return(t??0)+r}return po(e)},fu=e=>{let t=JR({costControls:e.costControls,spentTokens:Mse(e)});return t===null?e:t.kind==="soft_warn"?{...e,costControls:t.costControls,updatedAt:new Date().toISOString()}:{...e,status:"failed",errorMessage:t.errorMessage,errorKind:t.errorKind,costControls:t.costControls,judgePhase:void 0,updatedAt:new Date().toISOString()}}});var c2,jse,yu,Zh,Qh=l(()=>{"use strict";I();Me();Ev();c2=e=>e===O?{kind:"writer",writerAgent:"claude-cli"}:{kind:"writer",writerAgent:e},jse=(e,t,r,o,n,s)=>e.revisions.map(i=>i.roundNumber===e.currentRound?{...i,judgement:{score:r,passed:o,reasons:n,rawReply:t,tokens:s}}:i),yu=(e,t,r=null)=>{let o=e.revisions.find(a=>a.roundNumber===e.currentRound),n=mR({raw:t,passScore:e.passScore,goal:e.goal,promptText:o?.promptText??"",improver:c2(e.improverModel),round:e.currentRound,maxRounds:e.wizard?.phase==="optimize_modules"?YR({maxRounds:e.maxRounds,costControls:e.costControls}):e.maxRounds,earlyStopFlat:e.costControls?.earlyStop===!1?1e6:e.costControls?.earlyStopFlatRounds,priorRounds:jd(e.revisions.map(a=>({roundNumber:a.roundNumber,promptText:a.promptText,score:a.judgement?.score??null,reasons:a.judgement?.reasons??null})),e.currentRound)}),s=jse(e,t,n.verdict?.score??null,n.verdict?.passed??null,n.verdict?.reasons??null,r),i=new Date().toISOString();return n.continuation.type==="call"?fu({...e,revisions:s,status:"improving",judgePhase:void 0,updatedAt:i}):fu({...e,revisions:s,judgePhase:void 0,status:n.continuation.type,errorMessage:n.continuation.type==="passed"?null:n.continuation.errorMessage,updatedAt:i})},Zh=(e,t,r=null)=>{let o=gh({raw:t,judge:c2(e.judgeModel),goal:e.goal,passScore:e.passScore}),n=new Date().toISOString();return o.nextPrompt===null?{...e,status:"failed",errorMessage:o.continuation.type==="failed"?o.continuation.errorMessage:"The improver reply was empty.",updatedAt:n}:{...e,status:"judging",currentRound:e.currentRound+1,revisions:[...e.revisions,{roundNumber:e.currentRound+1,promptText:o.nextPrompt,judgement:null,writerTokens:r}],updatedAt:n}}});var eS,Rv=l(()=>{"use strict";eS=(e,t)=>{let r=t.trim().replace(/^Token review:\s*/i,"");if(r.length===0)return e;let o=`Token review: ${r}`;return{...e,revisions:e.revisions.map(n=>{if(n.roundNumber!==e.currentRound)return n;let s=n.judgement?.reasons?.trim()??"";return{...n,run:n.run===void 0?n.run:{...n.run,tokenReview:r},judgement:n.judgement===null?n.judgement:{...n.judgement,reasons:s.length===0?o:`${s}

${o}`}}})}}});var p2,tS,rS,d2,u2,vv,Nse,m2,Cv,Dse,g2,Hse,Fse,f2,y2=l(()=>{"use strict";p2=require("node:child_process"),tS=m(require("node:fs")),rS=m(require("node:path"));Zf();I();d2=4e3,u2=12e3,vv=(e,t)=>{let r=(0,p2.spawnSync)("git",[...t],{cwd:e,env:Ko(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},Nse=e=>vv(e,["rev-parse","--is-inside-work-tree"])?.trim()==="true",m2=e=>{let t=vv(e,["status","--porcelain=v1","-uall"]);if(t===null)return{};let r=t.split(`
`).flatMap(o=>{if(o.length<4)return[];let n=o.slice(3).trim();return[[(n.includes(" -> ")?n.split(" -> ").at(-1)??n:n).replaceAll('"',""),o]]});return Object.fromEntries(r)},Cv=(e,t)=>{let r=rS.default.resolve(e,t),o=rS.default.relative(e,r);if(o.startsWith("..")||rS.default.isAbsolute(o)||!tS.default.existsSync(r)||!tS.default.statSync(r).isFile())return null;let n=tS.default.readFileSync(r,"utf8");return n.includes("\0")?"(binary file)":n.length>d2?`${n.slice(0,d2)}
\u2026truncated`:n},Dse=e=>e.length>u2?`${e.slice(0,u2)}
\u2026truncated`:e,g2=e=>{let t=yR(`${e.promptText}
${e.instructions??""}`),r=Object.fromEntries(t.map(n=>[n,Cv(e.workingDirectory,n)])),o=Nse(e.workingDirectory);return{git:o,status:o?m2(e.workingDirectory):{},files:r,paths:t}},Hse=(e,t)=>{let r=vv(e,["diff","--no-ext-diff","--unified=3","HEAD","--",t]);if(r!==null&&r.trim().length>0)return r;let o=Cv(e,t);return o===null?`${t} is missing.`:o},Fse=(e,t)=>e&&t?"git changes in this folder, and files named in the prompt":e?"git changes in this folder":t?"files named in the prompt":"the writer reply, because this folder is not a git repo and the prompt names no file",f2=e=>{let t=e.before.git?m2(e.workingDirectory):{},r=Object.keys(t).filter(a=>t[a]!==e.before.status[a]),o=e.before.paths.map(a=>{let c=e.before.files[a]??null,d=Cv(e.workingDirectory,a);return c===d?`${a} did not change.`:`${a} changed.
${d??`${a} is missing.`}`}),n=r.map(a=>Hse(e.workingDirectory,a)),s=e.writerReply.trim(),i=[e.before.git?`Git paths that changed during the run:
${r.map(a=>t[a]).join(`
`)||"(no git changes)"}`:"",n.length>0?`Changes since the run started:
${n.join(`
`)}`:"",o.length>0?`Files named in the prompt:
${o.join(`

`)}`:"",s.length>0?`Writer reply:
${s}`:"The writer printed nothing. Use the changes above."].filter(a=>a.length>0);return{lookedAt:Fse(e.before.git,e.before.paths.length>0),evidence:Dse(i.join(`

`))}}});var Iv,q,Wv,qe,h2,$se,zse,S2,xa,P2,Ia,Use,Bse,hu,Lv,xv,Gse,A2,Vse,Kse,qse,b2,Jse,_2,k2,Yse,Xse,w2,T2=l(()=>{"use strict";Iv=require("node:child_process"),q=m(require("node:fs")),Wv=m(require("node:os")),qe=m(require("node:path"));Zf();h2=8e6,$se=16e6,zse=["node_modules/.cache",".next/cache",".turbo",".cache",".swc",".parcel-cache"],S2=(e,t)=>{let r=(0,Iv.spawnSync)("git",[...t],{cwd:e,env:Ko(),encoding:"utf8",timeout:8e3});return r.status!==0||typeof r.stdout!="string"?null:r.stdout},xa=(e,t)=>(0,Iv.spawnSync)("git",[...t],{cwd:e,env:Ko(),timeout:8e3}).status===0,P2=e=>{let t=S2(e,["status","--porcelain=v1","-uall"]);return t===null?{}:Object.fromEntries(t.split(`
`).flatMap(r=>{if(r.length<4)return[];let o=r.slice(3).trim().replaceAll('"',"");return(o.includes(" -> ")?o.split(" -> "):[o]).map(s=>[s.trim(),r])}))},Ia=(e,t)=>{let r=qe.default.resolve(e,t),o=qe.default.relative(e,r);return o.startsWith("..")||qe.default.isAbsolute(o)?null:r},Use=(e,t)=>{let r=Ia(e,t);if(r===null||!q.default.existsSync(r))return null;let o=q.default.statSync(r);return!o.isFile()||o.size>h2?null:q.default.readFileSync(r)},Bse=(e,t,r)=>{let o=Ia(e,t);o!==null&&(q.default.mkdirSync(qe.default.dirname(o),{recursive:!0}),q.default.writeFileSync(o,r))},hu=(e,t)=>{let r=Ia(e,t);r===null||!q.default.existsSync(r)||q.default.rmSync(r,{recursive:!0,force:!0})},Lv=(e,t)=>xa(e,["cat-file","-e",`HEAD:${t}`]),xv=e=>{let t=S2(e,["rev-parse","HEAD"]);return t===null?null:t.trim()},Gse=e=>qe.default.resolve(e)!==qe.default.resolve(Wv.default.homedir()),A2=e=>{if(!q.default.existsSync(e))return 0;let t=q.default.statSync(e);return t.isFile()?t.size:t.isDirectory()?q.default.readdirSync(e).reduce((r,o)=>r+A2(qe.default.join(e,o)),0):0},Vse=(e,t,r)=>{let o=Ia(e,r);if(o===null||!q.default.existsSync(o))return{relativePath:r,existed:!1,copyDir:null};if(A2(o)>$se)return{relativePath:r,existed:!0,copyDir:null};let n=qe.default.join(t,"cache",r);return q.default.mkdirSync(qe.default.dirname(n),{recursive:!0}),q.default.cpSync(o,n,{recursive:!0}),{relativePath:r,existed:!0,copyDir:n}},Kse=400,qse=32e6,b2=e=>{let t=[],r=0,o=!0,n=s=>{if(!(!o||!q.default.existsSync(s)))for(let i of q.default.readdirSync(s)){if(!o||i===".git"||i==="node_modules")continue;let a=qe.default.join(s,i),c=q.default.statSync(a);if(c.isDirectory()){n(a);continue}if(!(!c.isFile()||c.size>h2)){if(t.length>=Kse||r+c.size>qse){o=!1;return}r+=c.size,t.push(qe.default.relative(e,a))}}};return n(e),{paths:t,complete:o}},Jse=(e,t,r)=>{let o=Ia(e,r);if(o===null||!q.default.existsSync(o))return null;let n=Use(e,r);if(n===null)return"skip";let s=qe.default.join(t,"files",r);return q.default.mkdirSync(qe.default.dirname(s),{recursive:!0}),q.default.writeFileSync(s,n),s},_2=e=>{let t=q.default.mkdtempSync(qe.default.join(Wv.default.tmpdir(),"prompt-sdlc-revert-")),r=e.git?P2(e.workingDirectory):{},o=e.git?{paths:[],complete:!0}:b2(e.workingDirectory),n=e.git?[...Object.keys(r),...e.namedPaths]:[...o.paths,...e.namedPaths],s=Object.fromEntries([...new Set(n)].map(i=>[i,Jse(e.workingDirectory,t,i)]));return{workingDirectory:e.workingDirectory,git:e.git,head:e.git?xv(e.workingDirectory):null,isolateCaches:Gse(e.workingDirectory),complete:o.complete,startedMs:Date.now(),tempDir:t,beforeStatus:r,files:s,caches:zse.map(i=>Vse(e.workingDirectory,t,i))}},k2=(e,t)=>{let r=e.files[t];if(!(r===void 0||r==="skip")){if(r===null){hu(e.workingDirectory,t);return}Bse(e.workingDirectory,t,q.default.readFileSync(r))}},Yse=(e,t)=>{e.files[t]!==void 0&&e.files[t]!=="skip"?k2(e,t):Lv(e.workingDirectory,t)?xa(e.workingDirectory,["restore","--source=HEAD","--worktree","--staged","--",t]):hu(e.workingDirectory,t);let r=e.beforeStatus[t]??"  ",o=r.startsWith(" ")||r.startsWith("?");o&&Lv(e.workingDirectory,t)&&xa(e.workingDirectory,["restore","--staged","--source=HEAD","--",t]),o&&!Lv(e.workingDirectory,t)&&xa(e.workingDirectory,["reset","-q","HEAD","--",t])},Xse=(e,t)=>{let r=Ia(e.workingDirectory,t.relativePath);if(r!==null){if(t.copyDir!==null){hu(e.workingDirectory,t.relativePath),q.default.mkdirSync(qe.default.dirname(r),{recursive:!0}),q.default.cpSync(t.copyDir,r,{recursive:!0});return}if(e.isolateCaches){if(!t.existed){hu(e.workingDirectory,t.relativePath);return}if(q.default.existsSync(r))for(let o of q.default.readdirSync(r)){let n=qe.default.join(r,o);q.default.statSync(n).mtimeMs>=e.startedMs-1e3&&q.default.rmSync(n,{recursive:!0,force:!0})}}}},w2=e=>{try{if(e.git){if(xv(e.workingDirectory)!==e.head&&(!(e.head===null?xa(e.workingDirectory,["update-ref","-d","HEAD"]):xa(e.workingDirectory,["reset","--hard",e.head]))||xv(e.workingDirectory)!==e.head))throw new Error("head");let r=P2(e.workingDirectory);for(let o of new Set([...Object.keys(e.beforeStatus),...Object.keys(r),...Object.keys(e.files)]))Yse(e,o)}else{if(e.complete)for(let t of b2(e.workingDirectory).paths)e.files[t]===void 0&&hu(e.workingDirectory,t);for(let t of Object.keys(e.files))k2(e,t)}for(let t of e.caches)Xse(e,t);return{ok:!0}}catch{return{ok:!1,errorMessage:"Could not put the folder back after the run."}}finally{q.default.rmSync(e.tempDir,{recursive:!0,force:!0})}}});var oS,nS,Zse,Qse,eie,tie,rie,E2,oie,R2,v2=l(()=>{"use strict";I();Qh();Rv();y2();T2();Me();lt();ir();Ls();oS=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,judgePhase:void 0,updatedAt:new Date().toISOString()}),nS=e=>({...e,status:"stopped",errorMessage:ys,errorKind:"writer_interrupted",judgePhase:void 0,updatedAt:new Date().toISOString()}),Zse=(e,t)=>({...e,judgePhase:"scoring",updatedAt:new Date().toISOString(),revisions:e.revisions.map(r=>r.roundNumber===e.currentRound?{...r,run:t}:r)}),Qse=e=>{if(e.judgePromptTextOnly===!0)return null;if(e.judgeScoresOnly===!0){let t=e.runnerModel;return t!==void 0&&t!==O?t:e.improverModel!==O?e.improverModel:null}return e.judgeModel!==O?e.judgeModel:e.improverModel!==O?e.improverModel:null},eie=async e=>{let t=Ae(e.cycle),r=g2({workingDirectory:t,promptText:e.revision.promptText,instructions:e.cycle.judgeInstructions}),o=_2({workingDirectory:t,git:r.git,namedPaths:r.paths}),n=Date.now(),s=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules"?Vd({promptText:e.revision.promptText,runnerInstructions:e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions,chainPriorOutput:Ps(e.cycle.wizard,e.cycle.wizard.currentModuleIndex).output,moduleTitle:e.cycle.wizard.modules[e.cycle.wizard.currentModuleIndex]?.title??null}):Md({promptText:e.revision.promptText,instructions:e.cycle.judgeScoresOnly===!0?e.cycle.wizard?.runnerInstructions??e.cycle.judgeInstructions:e.cycle.judgeInstructions}),i=e.cycle.judgeScoresOnly===!0&&e.cycle.wizard?.phase==="optimize_modules",a=a2({promptText:e.revision.promptText,isModuleRun:i}),c=gu({isModuleRun:i,timeoutMs:a}),d={...e.revision,timeoutBudgetMs:c,timeoutSource:"recommended"},u=await ut({writerAgent:e.runner,workingDirectory:t,prompt:s,signal:e.signal,timeoutMs:c}),g=u.ok?f2({workingDirectory:t,before:r,writerReply:u.text}):null,f=w2(o),y={...e.cycle,revisions:e.cycle.revisions.map(P=>P.roundNumber===e.cycle.currentRound?d:P)};return u.ok?!f.ok||g===null?{ok:!1,cycle:oS(y,f.ok?"Could not put the folder back after the run.":f.errorMessage)}:{ok:!0,cycle:y,run:{output:u.text.trim(),tokens:u.tokens,delayMs:Date.now()-n,lookedAt:g.lookedAt,evidence:g.evidence}}:u.stopped===!0||e.signal?.aborted===!0?{ok:!1,cycle:nS(y)}:(e.onWriterFailure?.(e.runner),{ok:!1,cycle:oS(y,u.errorMessage,Cr(u))})},tie=async e=>e.revision.run!==void 0?{ok:!0,run:e.revision.run,cycle:e.cycle}:e.runner===null?null:eie({cycle:e.cycle,revision:e.revision,runner:e.runner,signal:e.signal,onWriterFailure:e.onWriterFailure}),rie=(e,t)=>({...e,revisions:e.revisions.map(r=>r.roundNumber!==e.currentRound||r.run===void 0?r:{...r,run:{...r.run,tokenReview:t}})}),E2=async e=>{let t=e.run.tokenReview?.trim()??"";if(t.length>0||e.reviewer===null)return{kind:"suggestion",text:t,tokens:null};let r={...e.cycle,judgePhase:"reviewing"};e.onProgress?.(r);let o=await ut({writerAgent:e.reviewer,workingDirectory:Ae(e.cycle),prompt:fR({tokens:e.run.tokens,delayMs:e.run.delayMs,promptText:e.promptText,evidence:e.run.evidence??e.run.output}),signal:e.signal});return o.ok?{kind:"suggestion",text:o.text.trim(),tokens:o.tokens}:o.stopped===!0||e.signal?.aborted===!0?{kind:"stopped",cycle:nS(e.cycle)}:{kind:"suggestion",text:"",tokens:null}},oie=async e=>{let{cycle:t,revision:r}=e;if(t.judgeModel===O)return t;let o={...t,judgePhase:"scoring"};e.onProgress?.(o);let n=await ut({writerAgent:t.judgeModel,workingDirectory:Ae(t),prompt:Ss({goal:t.goal,promptText:r.promptText,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});return n.ok?{...yu(o,n.text,n.tokens),judgePhase:void 0}:n.stopped===!0||e.signal?.aborted===!0?nS(o):(e.onWriterFailure?.(t.judgeModel),oS(o,n.errorMessage,Cr(n)))},R2=async e=>{let{cycle:t,revision:r}=e;if(t.judgePromptTextOnly===!0)return oie(e);let o=Qse(t),n=await tie({cycle:t,revision:r,runner:o,signal:e.signal,onWriterFailure:e.onWriterFailure});if(n===null)return t;if(!n.ok)return n.cycle;let s=r.run===void 0?Zse(n.cycle,n.run):n.cycle;if(r.run===void 0&&e.onProgress?.(s),t.judgeModel===O){let u=await E2({cycle:s,run:n.run,promptText:r.promptText,reviewer:o,signal:e.signal,onProgress:e.onProgress});return u.kind==="stopped"?u.cycle:{...rie(s,u.text),judgePhase:void 0}}let i=await ut({writerAgent:t.judgeModel,workingDirectory:Ae(t),prompt:hs({goal:t.goal,lookedAt:n.run.lookedAt??"the writer reply",evidence:n.run.evidence??n.run.output,tokens:n.run.tokens,delayMs:n.run.delayMs,passScore:t.passScore,instructions:t.judgeInstructions}),signal:e.signal});if(!i.ok)return i.stopped===!0||e.signal?.aborted===!0?nS(s):(e.onWriterFailure?.(t.judgeModel),oS(s,i.errorMessage,Cr(i)));let a=await E2({cycle:s,run:n.run,promptText:r.promptText,reviewer:t.judgeModel,signal:e.signal,onProgress:e.onProgress});if(a.kind==="stopped")return a.cycle;let c=i.tokens===null&&a.tokens===null?null:(i.tokens??0)+(a.tokens??0),d=yu(s,i.text,c);return eS(d,a.text)}});var sS,nie,sie,Ov,C2=l(()=>{"use strict";I();Qh();v2();Hh();ir();Me();Ev();lt();Ls();sS=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),nie=e=>({...e,status:"stopped",errorMessage:ys,errorKind:"writer_interrupted",updatedAt:new Date().toISOString()}),sie=(e,t,r,o,n)=>t.ok?null:t.stopped===!0||o?.aborted===!0?nie(e):(n?.(r),sS(e,t.errorMessage,Cr(t))),Ov=async(e,t,r,o)=>{let n=fu(e);if(n.status==="failed"&&n.errorKind==="budget_exceeded")return n;e=n;let s=e.revisions.find(d=>d.roundNumber===e.currentRound);if(s===void 0)return sS(e,"This round has no prompt.");if(e.status==="judging")return R2({cycle:e,revision:s,onWriterFailure:t,signal:r,onProgress:o});if(e.status!=="improving")return sS(e,"This cycle is waiting on a step this computer cannot run.");if(e.improverModel===O)return e;let i=vs(e);if(i===null)return sS(e,"The improver needs the score and the reason.");let a=await ut({writerAgent:e.improverModel,workingDirectory:Ae(e),prompt:en({goal:e.goal,promptText:i.promptText,score:i.score,reasons:i.reasons,avoid:i.avoid,instructions:e.improverInstructions}),signal:r,timeoutMs:gu()}),c=sie(e,a,e.improverModel,r,t);return c!==null?c:Zh(e,a.ok?a.text:"",a.ok?a.tokens:null)}});var Su,Mv,iie,x2,L2,aie,lie,iS,I2,W2,cie,die,xs,O2,M2,Pu=l(()=>{"use strict";I();uu();pu();Me();lt();ir();Ls();C2();ov();Su=(e,t,r)=>({...e,status:"failed",errorMessage:t,errorKind:r,updatedAt:new Date().toISOString()}),Mv=(e,t,r,o)=>{if(e.wizard===void 0||t===null)return Su(e,r);let n=o?.trim()??"";return{...e,status:"wizard_paused",errorMessage:r,wizard:{...e.wizard,gate:t,lastWriterParseFailureReply:n.length>0?n:e.wizard.lastWriterParseFailureReply},updatedAt:new Date().toISOString()}},iie=e=>{let t=Cr(e);return oG(e)||t==="usage_limit"||t==="action_required"},x2=(e,t,r)=>iie(r)?Su(e,r.errorMessage,Cr(r)):Mv(e,t,r.errorMessage),L2=e=>{let t=e.wizard;return t===void 0||nu(e).length===0?e:{...e,wizard:Aa({wizard:t,step:"evaluate",output:{selectedRound:t.evaluateSelectedRound,revisions:e.revisions.map(r=>({roundNumber:r.roundNumber,promptText:r.promptText,score:r.judgement?.score??null,passed:r.judgement?.passed??null,reasons:r.judgement?.reasons??null}))},userFeedback:null,stepInstructions:null})}},aie=e=>e==="passed"?"passed":e==="failed"?"failed":"stopped",lie=e=>{let t=e.wizard;if(t===void 0)return e;let r=Kd({revisions:e.revisions});if(r.rounds.length===0)return e;let o=t.modules[t.currentModuleIndex];return{...e,wizard:Aa({wizard:t,step:"optimize_modules",output:{moduleId:o?.moduleId??null,moduleIndex:t.currentModuleIndex,statistics:r},userFeedback:null,stepInstructions:null})}},iS=(e,t)=>({...e,status:"wizard_paused",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:t},updatedAt:new Date().toISOString()}),I2=e=>e.judgeModel!==O?e.judgeModel:e.improverModel!==O?e.improverModel:null,W2=(e,t)=>{let r=e.wizard;if(r===void 0)return"";let n=r.attempts.filter(s=>s.step===t).at(-1);return n===void 0?"":JSON.stringify(n.output)},cie=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=I2(e);if(n===null)return Su(e,"Choose a writer to run generalization.");let s=e.revisions[0]?.promptText??rr(o),i=Bd({goal:e.goal,sourcePrompt:s,avoid:o.avoidByStep.generalize,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:W2(e,"generalize")}),a=await ut({writerAgent:n,prompt:i,workingDirectory:Ae(e),signal:t});if(!a.ok)return r?.(n),x2(e,"generalize",a);try{let c=NR(a.text),d=Aa({wizard:{...o,lastWriterParseFailureReply:null,templatedPrompt:c.templatedPrompt,variables:c.variables,parameterValues:Qd(c.variables)},step:"generalize",output:c,userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),u={...e,wizard:d};return Jd(d)?xs({...u,wizard:{...d,gate:null}}):iS(u,"generalize")}catch(c){return Mv(e,"generalize",c instanceof Error?c.message:"Could not read generalization.",a.text)}},die=async(e,t,r)=>{let o=e.wizard;if(o===void 0)return e;let n=I2(e);if(n===null)return Su(e,"Choose a writer to suggest splits.");let s=or({wizard:o,revisions:e.revisions.map(c=>({roundNumber:c.roundNumber,promptText:c.promptText,score:c.judgement?.score}))}),i=Gd({goal:e.goal,templatedPrompt:o.templatedPrompt,variables:o.variables,evaluatedPromptReference:s,avoid:o.avoidByStep.separate,stepInstructions:o.pendingStepInstructions,lastAttemptSummary:W2(e,"separate")}),a=await ut({writerAgent:n,prompt:i,workingDirectory:Ae(e),signal:t});if(!a.ok)return r?.(n),x2(e,"separate",a);try{let c=DR(a.text),d=RR(c,o.variables),u=Aa({wizard:{...o,lastWriterParseFailureReply:null,splitOptions:d},step:"separate",output:{options:d},userFeedback:null,stepInstructions:o.pendingStepInstructions.trim().length===0?null:o.pendingStepInstructions}),g={...e,wizard:u};return Xd(d)?on(g,d[0]):iS(g,"separate")}catch(c){return Mv(e,"separate",c instanceof Error?c.message:"Could not read split options.",a.text)}},xs=e=>{let t=e.wizard;if(t===void 0)return e;let r=rr(t),o=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!1,judgePromptTextOnly:!0,currentRound:0,passScore:e.passScore,maxRounds:5,errorMessage:null,revisions:[{roundNumber:0,promptText:r,judgement:null}],wizard:{...t,phase:"evaluate",gate:null},updatedAt:o}},O2=(e,t)=>{let r=e.wizard;if(r===void 0)return e;let o=r.modules[t];if(o===void 0)return Su(e,"This module is missing.");let n=io(r),s=As(o.prompt,n),i=e.runnerModel!==void 0&&e.runnerModel!==O?e.runnerModel:e.judgeModel!==O?e.judgeModel:e.improverModel,a=new Date().toISOString();return{...e,status:"judging",judgeScoresOnly:!0,judgePromptTextOnly:!1,runnerModel:i,currentRound:0,passScore:pe(r),errorMessage:null,revisions:[{roundNumber:0,promptText:s,judgement:null}],wizard:{...r,phase:"optimize_modules",gate:null,currentModuleIndex:t,modules:r.modules.map((c,d)=>d===t?{...c,status:"running"}:c)},updatedAt:a}},M2=async(e,t,r,o)=>{let n=e.wizard;if(n===void 0)return Ov(e,t,r,o);if(n.gate!==null||e.status==="wizard_paused")return e;if(n.phase==="generalize")return cie(e,r,t);if(n.phase==="separate"&&n.splitOptions.length===0)return die(e,r,t);if(n.phase==="evaluate"||n.phase==="optimize_modules"){let s=await Ov(e,t,r,o);if(L(s.status)&&s.wizard!==void 0&&s.wizard.gate===null){let i=s.wizard.phase==="optimize_modules"?"optimize_modules":"evaluate";if(s.status==="failed"||(i==="evaluate"||i==="optimize_modules")&&nu(s).length===0)return s;let a=s;if(i==="evaluate"&&s.wizard.evaluateSelectedRound===null){let g=Se(s.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??0,reasons:f.judgement?.reasons??""})))?.roundNumber??s.revisions.at(-1)?.roundNumber??0;a={...s,wizard:{...s.wizard,evaluateSelectedRound:g}}}if(i==="evaluate"&&Yd({revisions:a.revisions,wizard:a.wizard,passScore:a.passScore})){let u=L2(iS(a,i));return nn(u)}let c=iS(a,i),d=i==="optimize_modules"&&c.wizard!==void 0?(()=>{let u=LR({wizard:{...c.wizard,modules:c.wizard.modules.map((g,f)=>f===c.wizard.currentModuleIndex&&g.status==="running"?{...g,status:"paused"}:g)},moduleIndex:c.wizard.currentModuleIndex,revisions:c.revisions,cycleStatus:aie(s.status)});return{...c,wizard:u}})():c;return i==="evaluate"?L2(d):lie(d)}return s}return n.phase==="complete",e}});var Wa,aS=l(()=>{"use strict";I();Me();Wa=(e,t)=>{let r=e.wizard;return r===void 0?{...e,status:t,updatedAt:new Date().toISOString()}:{...e,status:t,wizard:OR(r,e.judgeModel===O),updatedAt:new Date().toISOString()}}});var Oa,lS=l(()=>{"use strict";Oa=e=>{if(e==null)return null;if(e==="usage_limit")return"Usage limit";if(e==="action_required")return"Action required";if(e==="budget_exceeded")return"Budget exceeded";let t=String(e).replace(/^writer_/,"");return t==="timeout"?"Timeout":t==="interrupted"||t==="interrupt"?"Interrupt":t==="no_reply"?"No reply":null}});var Mt,j2,uie,N2=l(()=>{"use strict";I();lt();lS();ir();Sv();Mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),j2=e=>{if(!L(e.status))return"";let t=Se(e.revisions.map(f=>({roundNumber:f.roundNumber,promptText:f.promptText,score:f.judgement?.score??null,reasons:f.judgement?.reasons??null})));if(t===null)return"";let r=e.wizard?.modules.length??0,o=r>1?'<p class="muted sdlc-wizard-best-warning">This best prompt is from the last module\u2019s trial run. Open the wizard outcome table for every module\u2019s score and prompt.</p>':"",n=Ot(t.promptText),s=t.reasons===null||t.reasons.trim().length===0?"":`<p>${Mt(t.reasons.trim())}</p>`,i=e.status==="passed",a=Oa(e.errorKind),c=e.status==="passed"?'<span class="sdlc-outcome-badge sdlc-outcome-badge-passed">Passed</span>':e.status==="failed"?`<span class="sdlc-outcome-badge sdlc-outcome-badge-failed">${Mt(a??"Failed")}</span>`:`<span class="sdlc-outcome-badge sdlc-outcome-badge-stopped">${Mt(a??"Stopped")}</span>`,d='<p class="muted sdlc-timeout-tip" title="Module writers use a fail-clean timeout budget (~600s). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL.">Fail-clean: timeout / interrupt / no_reply \u2260 success. useThisPrompt only when passed.</p>',u=n!==null?`<div class="alert-error">${Mt(n)}</div>`:i?uie({cycleId:e.id,goal:e.goal,promptText:t.promptText,workingDirectory:Ae(e),sourceSkill:e.sourceSkill}):`<div class="alert-error">Do not use this prompt as a passed outcome (${Mt(a??e.status)}). Save-as-skill is available only when status is passed.</div><details class="sdlc-best-readonly"><summary>View best prompt text</summary><pre class="sdlc-pre">${Mt(t.promptText)}</pre></details>`,g=e.wizard!==void 0&&r>0?`Trial run \xB7 Score ${t.score} / 100`:`Round ${t.roundNumber} \xB7 Score ${t.score} / 100`;return`<section class="card" id="prompt-optimizer-best"><p class="eyebrow">Best prompt</p><div class="sdlc-best-outcome-row">${c}</div><h2>${g}</h2>${d}${o}${s}${u}</section>`},uie=e=>{let t=e.sourceSkill?.fileName??cu(e.goal),r=e.sourceSkill?.name??t,o=e.sourceSkill?.description??e.goal,n=Jh(t,r),s=n.length>0&&YG(e.workingDirectory,n),i=s?`<label class="check-row"><input type="checkbox" name="skillOverwrite" value="yes"> Replace .cursor/skills/${Mt(n)}/SKILL.md</label>`:"";return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="save-skill"><input type="hidden" name="cycleId" value="${Mt(e.cycleId)}"><label class="field"><span class="field-label">Name</span><input class="input" type="text" name="skillName" value="${Mt(r)}" required></label><label class="field"><span class="field-label">Description</span><textarea class="input textarea" name="skillDescription" rows="3">${Mt(o)}</textarea><span class="muted">Optional.</span></label><label class="field"><span class="field-label">File name</span><input class="input" type="text" name="skillFileName" value="${Mt(t)}" required><span class="muted">This is the skill folder under .cursor/skills/.</span></label><label class="field"><span class="field-label">Prompt</span><textarea class="input textarea" name="skillPrompt" rows="10" required>${Mt(e.promptText)}</textarea></label>${i}<div class="actions"><button class="btn btn-primary" type="submit">${s?"Replace skill":"Save as a skill"}</button></div><p class="muted">Saves this prompt at .cursor/skills/ in the folder for this run. You can change the name, the description, the file name, and the prompt before saving.</p></form>`}});var D2,H2=l(()=>{"use strict";D2=e=>{let t=e.trim();if(t.length===0)return null;if(t.includes("Ignoring malformed agent role definition:")){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);return`Codex did not run the judge prompt \u2014 it failed while loading project agent config (${r===null?t:r[1].replaceAll("\\n",`
`).replaceAll('\\"','"')}). Fix or remove the broken entry under .codex/ in your working folder (or ~/.codex), then retry.`}if(t.includes('"type":"error"')||t.includes('"type": "error"')){let r=t.match(/"message"\s*:\s*"((?:\\.|[^"\\])*)"/);if(r!==null){let o=r[1].replaceAll("\\n",`
`).replaceAll('\\"','"');return o.includes("not supported when using Codex with a ChatGPT account")?`Codex could not run the judge \u2014 your default model in ~/.codex/config.toml is not available on a ChatGPT login (for example gpt-6.1-sol). Set model = "gpt-5.5" in that file, or run codex with -m gpt-5.5, then retry Step 2. API error: ${o}`:`The judge CLI returned an error instead of a score: ${o}`}return"The judge CLI returned an error event instead of a score JSON object."}return t.startsWith("{")&&!t.includes('"score"')?"The judge reply was not score JSON (expected an object with score and reasons).":null}});var F2,pie,cS,pt,dS,jv=l(()=>{"use strict";I();Me();H2();Lh();ir();lS();F2=["Generalize","Evaluate","Separate","Optimize modules"],pie=e=>{let t=er(e),r=t>=0&&t<F2.length?F2[t]:null;return r===null?"Wizard failed.":`Step ${t+1} \u2014 ${r} failed`},cS=(e,t)=>{let r=ws(e),o=r===null?null:D2(r),n=o===null?t.detail:t.detail.length===0?o:`${t.detail} ${o}`;return{title:t.title,detail:n,replyPreview:r}},pt=(e,t)=>({title:e,detail:t,replyPreview:null}),dS=e=>{if(e.status==="wizard_paused"){let t=e.errorMessage?.trim()??"",r=ws(e);return{title:"Wizard paused.",detail:t.length>0?t:"Review the step above, then Continue or rerun with feedback.",replyPreview:r===null?null:cG(r)}}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="separate"&&e.wizard.splitOptions.length===0&&!L(e.status)){let t=e.judgeModel;return pt(`${me(t)} is suggesting module splits.`,"This panel keeps updating while the writer works on this computer.")}if(e.wizard!==void 0&&e.wizard.gate===null&&e.wizard.phase==="generalize"&&!L(e.status)){let t=e.judgeModel;return pt(`${me(t)} is generalizing your prompt.`,"This panel keeps updating while the writer works on this computer.")}if(e.status==="judging"&&e.judgePromptTextOnly===!0)return e.judgeModel===O?pt(`Score the prompt text for round ${e.currentRound+1}.`,"Wizard step 2 scores the prompt wording only. The runner executes modules in step 4."):e.judgePhase==="scoring"?pt(`${me(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"No folder run in step 2. This panel keeps updating, so the page is not stuck."):pt(`${me(e.judgeModel)} is scoring the prompt text for round ${e.currentRound+1}.`,"Wizard evaluate revises prompt wording before the runner executes in step 4.");if(e.status==="judging"&&e.judgeModel===O){let t=e.revisions.some(r=>r.roundNumber===e.currentRound&&r.run!==void 0);return!t&&e.improverModel!==O?pt(`${me(e.improverModel)} is running the prompt for round ${e.currentRound+1}.`,"You score the changes after this run."):pt(`Score the changes from round ${e.currentRound+1}.`,t?"Score the changes below. Weigh the tokens and the delay.":"Choose a writer as the judge so this computer can run the prompt.")}if(e.status==="judging"&&e.judgePhase==="reviewing")return pt(`${me(e.judgeModel)} is checking the tokens for round ${e.currentRound+1}.`,"A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.");if(e.status==="judging"&&e.judgePhase==="scoring"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=pe(t);return pt(`${me(r)} is scoring module ${o} of ${n}.`,`Step 4 runs one trial per module (pass \u2265 ${s}). This panel keeps updating.`)}return pt(`${me(e.judgeModel)} is scoring the changes from round ${e.currentRound+1}.`,"The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.")}if(e.status==="judging"){let t=e.wizard;if(t!==void 0&&(t.gate==="optimize_modules"||t.phase==="optimize_modules")){let r=e.runnerModel??e.judgeModel,o=t.currentModuleIndex+1,n=t.modules.length,s=pe(t);return pt(`${me(r)} is running module ${o} of ${n}.`,`The runner executes the module prompt; the judge scores output (pass \u2265 ${s}). This panel keeps updating.`)}return pt(`${me(e.judgeModel)} is running the prompt for round ${e.currentRound+1}.`,"The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.")}if(e.status==="improving"&&e.improverModel===O){let t=e.revisions.find(o=>o.roundNumber===e.currentRound)?.judgement,r=t?.reasons?.trim()??"";return pt("Rewrite the prompt.",t?.score===null||t?.score===void 0||r.length===0?"Write the next prompt yourself.":`Score ${t.score} / 100. ${r}`)}if(e.status==="improving")return pt(`${me(e.improverModel)} is rewriting the prompt.`,"That writer is working on this computer. This panel keeps updating, so the page is not stuck.");if(e.status==="passed")return{title:"This prompt passed.",detail:"",replyPreview:null};if(e.status==="stopped"){let t=e.revisions.some(s=>Ot(s.promptText)!==null),r=e.errorMessage?.trim()??"";if(e.wizard!==void 0){let s=ce(e.wizard),i=s.totalModules>0&&(e.wizard.phase==="complete"||s.passedModuleCount>0||L(e.status)),a=e.wizard.additionalSkillSuggestionsStatus==="pending",c=i&&s.totalModules>0?`Wizard finished \u2014 ${s.passedModuleCount}/${s.totalModules} modules passed`:"Wizard stopped before all steps finished",d=a?"The judge is reading the run summary and suggesting additional skills.":"";return{title:c,detail:r.length>0?r:d.length>0?d:i?"":"Progress from finished steps is kept.",replyPreview:null}}let o=(e.errorMessage??"").startsWith("Finished"),n=r.length>0?r:t?"The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History.":"The best prompt is kept.";return t?cS(e,{title:o?"Finished.":"Stopped.",detail:n}):{title:o?"Finished.":"Stopped.",detail:n,replyPreview:null}}if(e.status==="failed"){let t=e.errorMessage?.trim()??"",r=e.wizard,o=Oa(e.errorKind),n="A writer or judge reply could not be used. Start a new run after fixing the issue.",s=o===null?"":` (${o} \u2014 not success)`;return r!==void 0?cS(e,{title:`${pie(r)}${s}`,detail:t.length>0?t:n}):cS(e,{title:o!==null?`This run failed \u2014 ${o}.`:"This run failed.",detail:t.length>0?t:"A writer or judge reply could not be used."})}if(L(e.status)){let t=e.errorMessage?.trim()??"";return cS(e,{title:"This run stopped because a reply could not be used.",detail:t.length>0?t:"A writer or judge reply could not be used."})}return{title:"Working on this computer.",detail:"This panel keeps updating.",replyPreview:null}}});var Wr,Au=l(()=>{"use strict";Me();Wr=e=>{if(e.status==="improving"&&e.improverModel===O)return!0;if(e.status!=="judging"||e.judgeModel!==O)return!1;let t=e.revisions.find(r=>r.roundNumber===e.currentRound);return e.judgePromptTextOnly===!0||t?.run!==void 0?!0:e.improverModel===O}});var $2,z2=l(()=>{"use strict";$2=e=>({id:e.id,goal:e.goal,judgeModel:e.judgeModel,improverModel:e.improverModel,status:e.status,currentRound:e.currentRound,maxRounds:e.maxRounds,passScore:e.passScore,errorMessage:e.errorMessage,activeRunId:null,activeRunStatus:null,pendingLocal:null,...e.wizard===void 0?{}:{wizard:{phase:e.wizard.phase,gate:e.wizard.gate}},revisions:e.revisions.map(t=>({id:`${e.id}-${t.roundNumber}`,roundNumber:t.roundNumber,promptText:t.promptText,judgement:t.judgement===null?null:{score:t.judgement.score,passed:t.judgement.passed,reasons:t.judgement.reasons,rawReply:t.judgement.rawReply,judgeModel:e.judgeModel}}))})});var sn,mie,U2,B2=l(()=>{"use strict";I();sn=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),mie=(e,t)=>{let r=t?.trim()??"";return e===null||r.length===0?"":`<p class="sdlc-manual-verdict">Score ${e} / 100. ${sn(r)}</p>`},U2=e=>{let t=e.minJudgeScore??0,r=`<input type="hidden" name="cycleId" value="${sn(e.cycleId)}">`,o=e.instructions?.trim()??"",n=o.length===0?"":`<p class="muted">Instructions</p><p>${sn(o)}</p>`,s=e.run??null,i=(s?.evidence??s?.output??"").trim(),a=s?.lookedAt?.trim()??"",c=s?.tokenReview?.trim()??"",d=s===null?"":`${a.length===0?"":`<p class="muted">Looked at ${sn(a)}.</p>`}<pre class="mono">${sn(i.length===0?s.output:i)}</pre><p class="muted">Tokens used: ${s.tokens===null?"not reported":String(s.tokens)}. Delay: ${tn(s.delayMs)}.</p>${c.length===0?"":`<p class="muted">Token review: ${sn(c)}</p>`}`;if(e.role==="judge")return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-judge">${r}${n}${d}<label class="field"><span class="field-label">Score</span><input class="input sdlc-manual-score" type="number" name="score" min="${t}" max="100" step="1" required></label><label class="field"><span class="field-label">Reason</span><textarea class="input textarea" name="reasons" rows="4" required></textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save score</button></div></form>`;let u=e.avoid?.trim()??"",g=u.length===0?"":`<p class="muted">Avoid</p><pre class="mono">${sn(u)}</pre>`;return`<form class="sdlc-manual" method="POST" action="/prompt-optimizer"><input type="hidden" name="intent" value="manual-improve">${r}${n}${mie(e.score,e.reasons)}${g}<label class="field"><span class="field-label">Rewritten prompt</span><textarea class="input textarea" name="prompt" rows="8" required>${sn(e.promptText)}</textarea></label><div class="actions"><button class="btn btn-primary" type="submit">Save revision</button></div></form>`}});var bu,gie,G2,V2=l(()=>{"use strict";I();ir();bu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),gie=(e,t)=>{let r=t.judgement?.score===null||t.judgement===null?"Not scored yet":`Score ${t.judgement.score}`,o=Ot(t.promptText),n=t.judgement?.reasons?`<p class="muted">${bu(t.judgement.reasons)}</p>`:"",s=(t.run?.evidence??t.run?.output??"").trim(),i=t.run?.lookedAt?.trim()??"",a=t.run===void 0?"":`${i.length===0?"":`<p class="muted">Looked at ${bu(i)}.</p>`}<pre class="mono">${bu(s.length===0?t.run.output:s)}</pre><p class="muted">Tokens used: ${t.run.tokens===null?"not reported":String(t.run.tokens)}. Delay: ${tn(t.run.delayMs)}.</p>`,c=t.roundNumber===0?"Source prompt":`Revision ${t.roundNumber}`,d=t.roundNumber===0&&e.wizard!==void 0&&e.wizard.templatedPrompt.trim().length>0?e.wizard.templatedPrompt:t.promptText,u=o===null?`<pre class="mono">${bu(d)}</pre>`:`<div class="alert-error">${bu(o)}</div>`;return`<article class="card sdlc-run-prompt-card"><h3 class="sdlc-run-prompt-card-title">${c}</h3><p class="muted sdlc-run-prompt-card-score">${r}</p>${n}${a}${u}</article>`},G2=e=>e.revisions.map(t=>gie(e,t)).join("")});var K2,q2=l(()=>{"use strict";I();K2=e=>{if(L(e.status))return"none";let t=e.wizard;return t===void 0?"legacy_stop":e.status==="wizard_paused"?"none":t.phase==="optimize_modules"&&t.gate===null?"wizard_module_interrupt":"wizard_end_only"}});var Or,fie,Nv,yie,hie,Sie,Pie,J2,Y2,Dv=l(()=>{"use strict";q2();Or=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fie="Stop this run? Writers will stop and the best prompt is kept.",Nv="End the wizard? Writers will stop and progress from finished steps is kept.",yie="Skip this module and pause at the step gate?",hie=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-live-post" data-confirm-message="${Or(fie)}"><input type="hidden" name="intent" value="stop"><input type="hidden" name="cycleId" value="${Or(e)}"><button class="btn btn-secondary" type="submit">Stop run</button><span class="muted">Stops the writers and keeps the best prompt. This run is marked complete.</span></form>`,Sie=e=>`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-end-actions sdlc-live-post" data-confirm-message="${Or(Nv)}"><input type="hidden" name="cycleId" value="${Or(e)}"><button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Stops all writers and closes the wizard. You keep progress from finished steps.</span></form>`,Pie=e=>{let t=Or(e.id);return`<div class="sdlc-wizard-interrupt">
    <p class="muted">Optimizing <strong>${Or(e.wizard?.modules[e.wizard.currentModuleIndex]?.title??"this module")}</strong>. Skip this module or end the whole wizard.</p>
    <form method="POST" action="/prompt-optimizer" class="sdlc-wizard-interrupt-actions sdlc-live-post">
      <input type="hidden" name="cycleId" value="${t}">
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-skip-module" data-confirm-message="${Or(yie)}">Skip module</button>
      <button class="btn btn-secondary" type="submit" name="intent" value="wizard-stop-all" data-confirm-message="${Or(Nv)}">End wizard</button>
    </form>
  </div>`},J2=e=>{let t=K2(e);return t==="none"?"":t==="legacy_stop"?hie(e.id):t==="wizard_end_only"?Sie(e.id):Pie(e)},Y2=e=>{if(e.wizard===void 0||e.status!=="wizard_paused")return"";let t=Or(e.id);return`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-gate-end sdlc-live-post" data-confirm-message="${Or(Nv)}"><input type="hidden" name="cycleId" value="${t}"><button class="btn btn-link" type="submit" name="intent" value="wizard-stop-all">End wizard</button><span class="muted">Close the wizard without finishing later steps.</span></form>`}});var X2,Z2=l(()=>{"use strict";I();va();X2=(e,t)=>{let r=e.wizard;if(r===void 0)return"No wizard data";if(t==="wizard-1"){let o=r.variables.length;return r.templatedPrompt.trim().length>0?o>0?`Templated prompt \xB7 ${o} variable${o===1?"":"s"}`:"Templated prompt ready":o>0?`${o} variable${o===1?"":"s"} captured`:"Generalize finished"}if(t==="wizard-2"){let o=e.revisions.filter(n=>n.judgement!==null&&n.judgement!==void 0).length;if(o>0){let n=e.revisions.reduce((s,i)=>{let a=i.judgement?.score??null;return a===null?s:s===null?a:Math.max(s,a)},null);return n===null?`${o} scored revision${o===1?"":"s"}`:`Best score ${n} \xB7 ${o} revision${o===1?"":"s"}`}return r.phase==="complete"||r.gate===null?"Evaluate finished":"Evaluate not run yet"}if(t==="wizard-3"){let o=r.modules.length>0?r.modules.length:r.splitOptions.length;return o>0?`${o} module${o===1?"":"s"} defined`:r.phase==="complete"?"Separate finished":"Separate not run yet"}if(t==="wizard-4"){if(r.modules.length===0)return"No module trials yet";let o=ce(r);if(o.terminalStatusSuggestion==="passed"&&o.passedModuleCount===o.totalModules){let n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null||i.bestScore===null||a.bestScore<i.bestScore?a:i,null),s=o.rows.reduce((i,a)=>i+(a.tokens??0),0);return n===null||n.bestScore===null?`${Cs(s)} tokens total`:`Lowest: ${n.title} (${n.bestScore}) \xB7 ${Cs(s)} tokens`}return`${o.passedModuleCount}/${o.totalModules} passed \xB7 \u2265 ${pe(r)}`}return""}});var Aie,bie,Q2,_ie,e5,t5=l(()=>{"use strict";I();Z2();fv();jh();$h();Aie=e=>e==="done"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-done" aria-hidden="true"></span>':e==="failed"?'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-failed" aria-hidden="true"></span>':'<span class="sdlc-wizard-outcome-mark sdlc-wizard-outcome-mark-pending" aria-hidden="true"></span>',bie=e=>e==="done"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-done">Finished</span>':e==="failed"?'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-failed">Stopped here</span>':'<span class="sdlc-wizard-outcome-status sdlc-wizard-outcome-status-pending">Not reached</span>',Q2=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),_ie=(e,t,r)=>{let o=Ea(e,t);if(o.trim().length===0)return"";let n=t==="wizard-1"?"Step 1 \u2014 Generalize":t==="wizard-2"?"Step 2 \u2014 Evaluate":t==="wizard-3"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",s=X2(e,t),i=Fh(e,t),a=Aie(i),c=bie(i),d=Ra(e,t,{forOutcomeSummary:!0}),u=`${a}<span class="sdlc-wizard-outcome-step-title">${Q2(n)}</span>${d}${c}<span class="muted sdlc-wizard-outcome-step-hint">${Q2(s)}</span>`,g=t==="wizard-4"&&r.phase==="complete"?" open":"",f=i==="failed"&&t!=="wizard-4"?" open":"",y=`prompt-optimizer-wizard-outcome-${t}`;return`<details class="sdlc-wizard-outcome-step sdlc-wizard-outcome-step-${i}" id="${y}"${g}${f}><summary aria-controls="${y}-body">${u}</summary><div class="sdlc-wizard-outcome-step-body" id="${y}-body">${o}</div></details>`},e5=e=>{let t=e.wizard;if(t===void 0||!L(e.status))return"";let r=t.phase==="complete",n=(r?["wizard-1","wizard-2","wizard-3"]:["wizard-1","wizard-2","wizard-3","wizard-4"]).map(d=>_ie(e,d,t)).join(""),s='<div class="sdlc-wizard-outcome-head-actions"><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-expand-all>Expand all</button><button type="button" class="btn btn-secondary sdlc-wizard-outcome-toggle" data-sdlc-outcome-collapse-all>Collapse all</button></div>',i=r?`<div class="sdlc-wizard-process-details-body">${n}</div>`:n;return`<div class="sdlc-run-panel sdlc-wizard-outcome" id="prompt-optimizer-wizard-outcome"><div class="sdlc-wizard-outcome-head"><h3 class="sdlc-run-panel-title">${r?"Pipeline \xB7 steps 1\u20133 (Step 4 in Module results)":"Step details"}</h3>${s}</div>${r?'<p class="muted sdlc-wizard-outcome-step4-note">Step 4 \u2014 Optimize modules is summarized in <a href="#prompt-optimizer-wizard-module-results">Module results</a> above.</p>':""}${i}</div>`}});var r5,o5,n5=l(()=>{"use strict";r5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),o5=e=>{let t=e.wizard;return t===void 0||t.modules.length===0?"":`<ul class="sdlc-wizard-chunks sdlc-wizard-module-prompt-list">${t.modules.map(o=>`<li class="sdlc-wizard-module-prompt"><strong>${r5(o.title)}</strong><div class="sdlc-wizard-module-prompt-row"><pre class="sdlc-pre sdlc-wizard-chunk-prompt">${r5(o.prompt)}</pre><button type="button" class="btn btn-secondary sdlc-wizard-copy-one sdlc-copy-feedback-btn" data-sdlc-copy-module-prompt>Copy prompt</button></div></li>`).join("")}</ul>`}});var Hv,s5,Fv=l(()=>{"use strict";Hv=(e,t)=>e.status==="passed"&&(e.statistics?.bestScore??0)>=t,s5=(e,t)=>{if(Hv(e,t))return"Passed";if(e.status==="failed")return"Failed";if(e.status==="stopped")return"Stopped";if(e.status==="running")return"Running";if(e.status==="paused")return"Paused";if(e.status==="pending")return"Pending";let r=e.statistics?.bestScore;return r!=null&&r<t?`Below pass (${r})`:e.status}});var i5,a5=l(()=>{"use strict";i5=(e,t)=>{if(e.terminalStatusSuggestion==="passed")return"";let r=e.rows.filter(o=>o.bestScore!==null&&o.bestScore<t).length;return r>0&&r===e.totalModules-e.passedModuleCount?`${e.passedModuleCount} of ${e.totalModules} modules passed. ${r} module${r===1?"":"s"} scored below ${t}.`:`${e.passedModuleCount} of ${e.totalModules} modules passed. Some modules were skipped, stopped, or below ${t}.`}});var uS,l5,c5=l(()=>{"use strict";I();Fv();Fv();a5();uS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),l5=e=>{let t=e.wizard;if(t===void 0||t.modules.length===0)return"";let r=ce(t),o=pe(t),n=r.terminalStatusSuggestion==="passed"?"":i5(r,o),s=o-10,i=r.rows.map((c,d)=>{let u=t.modules[d],g=c.bestScore===null?"\u2014":`${c.bestScore} / \u2265${o}`,y=c.bestScore!==null&&c.bestScore>=s&&c.bestScore<o?' class="sdlc-score-near-pass"':"",P=u===void 0?c.status:s5(u,o),h=u!==void 0&&Hv(u,o)?'<span class="sdlc-module-status sdlc-module-status-passed" aria-label="Passed">Passed</span>':P==="Failed"?'<span class="sdlc-module-status sdlc-module-status-failed" aria-label="Failed">Failed</span>':P==="Stopped"?'<span class="sdlc-module-status sdlc-module-status-stopped" aria-label="Stopped">Stopped</span>':uS(P);return`<tr${y}><td>${uS(c.title)}</td><td>${uS(g)}</td><td>${c.tokens??"\u2014"}</td><td>${h}</td></tr>`}).join("");return`<div class="sdlc-wizard-outcome-module-table">${n.length===0?"":`<p class="muted">${uS(n)}</p>`}<table class="sdlc-wizard-outcome-table"><caption class="sdlc-sr-only">Module scores</caption><thead><tr><th>Module</th><th title="Score compared to pass threshold">Score / pass</th><th title="Runner tokens for best trial">Tokens</th><th>Status</th></tr></thead><tbody>${i}</tbody></table></div>`}});var Is,pS,$v=l(()=>{"use strict";Is=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),pS=e=>{let t=e.wizard;if(t===void 0)return"";let r=t.orchestratorSkill,o=r===null?"":`<p class="sdlc-wizard-orchestrator-skill"><strong>Orchestrator skill:</strong> <code>${Is(r.fileName)}</code> \u2014 ${Is(r.name)}. <span class="muted">Prompt text may change in Step 2; this skill keeps the orchestrator role.</span></p>`;if(t.additionalSkillSuggestionsStatus==="pending")return`<div class="sdlc-wizard-skill-suggestions sdlc-wizard-skill-suggestions-pending">${o}<p class="muted">The judge is reading the run summary and suggesting additional skills\u2026</p></div>`;if(t.additionalSkillSuggestionsStatus==="skipped")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;if(t.additionalSkillSuggestionsStatus!=="ready")return o.length===0?"":`<div class="sdlc-wizard-skill-suggestions">${o}</div>`;let n=t.additionalSkillSuggestionsSummary===null||t.additionalSkillSuggestionsSummary.trim().length===0?"":`<p class="sdlc-wizard-skill-summary">${Is(t.additionalSkillSuggestionsSummary.trim())}</p>`;if(t.additionalSkillSuggestions.length===0){let i=n.length>0?n:'<p class="muted">The judge had no additional skill suggestions for this run.</p>';return`<div class="sdlc-wizard-skill-suggestions">${o}${i}</div>`}let s=t.additionalSkillSuggestions.map(i=>`<li class="sdlc-wizard-skill-suggestion"><p><strong>${Is(i.name)}</strong> <code>.cursor/skills/${Is(i.fileName)}/SKILL.md</code></p><p class="muted">${Is(i.description)}</p><p>${Is(i.rationale)}</p></li>`).join("");return`<div class="sdlc-wizard-skill-suggestions" id="prompt-optimizer-wizard-skill-suggestions"><h4 class="sdlc-wizard-skill-suggestions-title">Suggested additional skills</h4>${o}${n}<p class="muted">Add these beside your orchestrator in <code>.cursor/skills/</code> \u2014 do not replace the orchestrator skill.</p><ul class="sdlc-wizard-skill-suggestion-list">${s}</ul></div>`}});var kie,d5,u5=l(()=>{"use strict";I();n5();c5();$v();kie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),d5=e=>{let t=e.wizard;if(t===void 0||t.phase!=="complete"||!L(e.status)||t.modules.length===0)return"";let r=l5(e),o=o5(e);if(r.length===0&&o.length===0)return"";let n=(e.revisions[0]?.promptText??"").trim(),s=ce(t),i=s.passedModuleCount<s.totalModules?" open":"",a=n.length===0?"":`<details class="sdlc-wizard-source-compare"${i}><summary>Compare original prompt</summary><pre class="sdlc-pre sdlc-wizard-source-prompt">${kie(n)}</pre></details>`;return`<section class="sdlc-run-panel sdlc-wizard-module-results" id="prompt-optimizer-wizard-module-results" tabindex="-1"><div class="sdlc-wizard-module-results-head"><div><h3 class="sdlc-run-panel-title">Module results</h3><p class="muted sdlc-wizard-module-results-sub">Optimized module prompts \xB7 copy all as Markdown sections</p></div><button type="button" class="btn btn-secondary sdlc-copy-feedback-btn" data-sdlc-copy-wizard-modules>Copy all prompts (Markdown)</button></div>${pS(e)}${a}${r}${o}</section>`}});var Y,mS=l(()=>{"use strict";I();Y={knobsSectionTitle:"Cost controls",knobsSectionLede:"Cap trials and spend before Step 4. Soft warn near the ceiling; hard stop fails with budget_exceeded (never useThisPrompt). Flat early-stop stays a clean stopped outcome.",maxTrialsLabel:"Max trials",maxSpendUsdLabel:"Max spend (USD)",earlyStopLabel:"Early-stop when scores flat",earlyStopHint:"Stop when judged scores stop rising. That is a clean stopped outcome \u2014 not budget_exceeded.",estimateSectionTitle:"Estimated run cost",estimateSectionLede:"Live heuristic before Run (proposePromptSdlcRunCostBudget). Updates when trials or judge writer change. Agent dry-run: intent estimate_budget.",targetTokenLabel:"Estimated token budget",estimatedSpendLabel:"Estimated spend (USD)",rateChipLabel:"Writer rate",rateLabel:"Rate (USD / 1k tokens)",autoConfirmHint:"Max spend filled \u2192 Run auto-confirms that ceiling (no extra panel). Leave empty to confirm explicitly at Step 4.",estimateOverCeilingWarn:"Estimate is above max spend. Run still auto-confirms the ceiling you set; the hard stop may fire earlier.",confirmTitle:"Confirm Step 4 cost ceiling",confirmLede:"Review the judge-proposed token target (targetTokenBudget) and estimated dollar budget. Approve or edit, then Step 4 runs under this hard ceiling.",proposedTokenLabel:"Proposed token budget (targetTokenBudget)",confirmedTokenLabel:"Confirmed token budget",confirmedSpendLabel:"Confirmed max spend (USD)",stubProposalNote:"Proposal uses targetTokenBudget + estimatedSpendUsd (stub heuristic until the judge fills them).",approveLabel:"Approve and start Step 4",confirmEditLabel:"Confirm edited ceiling",softWarnLabel:"Approaching budget",budgetExceededBadge:"Budget exceeded",budgetExceededFailedLabel:"Failed \xB7 budget exceeded",budgetExceededMessage:"Stopped: token or dollar budget exceeded (budget_exceeded). The best prompt so far is kept. useThisPrompt stays false."}});var gS,zv=l(()=>{"use strict";gS=e=>e.status==="passed"?"passed":e.errorKind==="writer_timeout"?"timeout":e.errorKind==="writer_interrupted"?"interrupt":e.errorKind==="writer_no_reply"?"no_reply":e.errorKind==="usage_limit"?"usage_limit":e.errorKind==="action_required"?"action_required":e.errorKind==="budget_exceeded"?"budget_exceeded":e.status==="failed"?"failed":e.status==="stopped"?"stopped":e.status});var p5,m5=l(()=>{"use strict";mS();zv();p5=e=>{let t=gS({status:e.status,errorKind:e.errorKind??void 0});return t==="budget_exceeded"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed sdlc-run-badge-budget",badgeLabel:Y.budgetExceededBadge,outcome:t}:t==="failed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Failed",outcome:t}:t==="timeout"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Timed out",outcome:t}:t==="interrupt"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Interrupted",outcome:t}:t==="no_reply"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"No reply",outcome:t}:t==="usage_limit"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Usage limit",outcome:t}:t==="action_required"?{badgeClass:"sdlc-run-badge sdlc-run-badge-failed",badgeLabel:"Action required",outcome:t}:t==="passed"?{badgeClass:"sdlc-run-badge sdlc-run-badge-done",badgeLabel:"Passed",outcome:t}:t==="stopped"?{badgeClass:"sdlc-run-badge sdlc-run-badge-finished",badgeLabel:"Finished",outcome:t}:{badgeClass:"sdlc-run-badge",badgeLabel:t.replaceAll("_"," "),outcome:t}}});var mo,_u=l(()=>{"use strict";mo=e=>{let r=e.trim().replaceAll(/\s+/g," ").split(/[,.!?]/)[0]?.trim()??"",o=r.length>0?r:"Untitled run";return o.length<=72?o:`${o.slice(0,71).trimEnd()}\u2026`}});var go,fS,Uv=l(()=>{"use strict";I();Uh();N2();jv();Au();z2();Hh();B2();V2();Dv();t5();u5();va();m5();lt();_u();go=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),fS=e=>{let t=!L(e.status)&&e.status!=="wizard_paused"&&!Wr(e),r=dS(e),o=jG(bR($2(e)),e),n=L(e.status)?"":J2(e),s=e5(e),i=d5(e),a=j2(e),c=e.errorMessage===null?"":`<div class="alert-error">${go(e.errorMessage)}</div>`,d=t?'<span class="sdlc-spin" aria-hidden="true"></span>':"",u=t?" Working for <span data-elapsed>0s</span>.":"",g=e.wizard!==void 0&&e.wizard.phase==="complete"?ce(e.wizard):null,f=g!==null&&g.totalModules>0&&g.passedModuleCount===g.totalModules,y=!t&&e.wizard!==void 0&&L(e.status)&&(e.wizard.phase==="complete"||ce(e.wizard).passedModuleCount>0),P=y?f?" sdlc-run-activity-success":" sdlc-run-activity-partial":"",h=y&&e.wizard!==void 0?`<p class="sdlc-run-success-actions"><a class="btn btn-primary" href="/prompt-optimizer?cycle=${go(e.id)}&amp;export=wizard-markdown">Download report (.md)</a><a class="btn btn-secondary" href="#prompt-optimizer-wizard-module-results" data-sdlc-view-module-results hidden>Jump to module table</a><button type="button" class="btn btn-secondary" data-sdlc-rerun-same title="Open compose with your last folder, models, and pass score">Re-run same settings</button></p><p class="muted sdlc-rerun-hint">Re-run keeps settings \xB7 New prompt clears the form.</p>`:"",p=r.replyPreview===null||r.replyPreview.length===0?"":`<p class="muted sdlc-run-reply-preview-label">Reply preview:</p><pre class="mono sdlc-run-reply-preview">${go(r.replyPreview)}</pre>`,S=r.detail.length===0&&h.length===0&&p.length===0||r.detail.length===0&&p.length===0?"":`<div class="sdlc-run-detail-block">${r.detail.length===0?"":`<p class="sdlc-run-detail muted">${go(r.detail)}${u}</p>`}${p}</div>`,b=e.revisions.find(bn=>bn.roundNumber===e.currentRound),k=e.status==="improving"?vs(e):null,A=po(e),_=e.wizard!==void 0&&e.status==="judging"&&(e.wizard.phase==="evaluate"||e.wizard.gate==="evaluate"),E=Wr(e)?U2({role:e.status==="judging"?"judge":"improve",cycleId:e.id,promptText:k?.promptText??b?.promptText??"",score:k?.score??b?.judgement?.score??null,reasons:k?.reasons??b?.judgement?.reasons??null,avoid:k?.avoid??null,instructions:e.status==="judging"?e.judgeInstructions:e.improverInstructions,run:b?.run??null,minJudgeScore:_?1:0}):"",T=e.wizard!==void 0&&e.wizard.phase==="complete"&&L(e.status),C=e.wizard===void 0||e.wizard.phase==="evaluate"||e.wizard.phase==="optimize_modules"||e.wizard.gate==="evaluate"||e.wizard.gate==="optimize_modules",x=e.wizard!==void 0&&!T&&(e.wizard.phase==="optimize_modules"||e.wizard.gate==="optimize_modules")?pe(e.wizard):e.passScore,W=C?`<div class="sdlc-run-panel sdlc-run-panel-scoring"><h3 class="sdlc-run-panel-title">Scoring guide</h3>${zh(x)}</div>`:"",j=e.status==="failed"?p5({status:e.status,errorKind:e.errorKind}):null,M=t?'<span class="sdlc-run-badge sdlc-run-badge-live">In progress</span>':e.status==="wizard_paused"?'<span class="sdlc-run-badge sdlc-run-badge-paused">Paused</span>':L(e.status)?j!==null?`<span class="${j.badgeClass}">${j.badgeLabel}</span>`:T&&g!==null&&!f?'<span class="sdlc-run-badge sdlc-run-badge-finished">Finished</span>':'<span class="sdlc-run-badge sdlc-run-badge-done">Complete</span>':"",B=t?d:y?f?'<span class="sdlc-run-status-dot sdlc-run-status-dot-success" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot sdlc-run-status-dot-partial" aria-hidden="true"></span>':'<span class="sdlc-run-status-dot" aria-hidden="true"></span>',ie=[typeof e.workingDirectory=="string"&&e.workingDirectory.length>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Folder</span> ${go(Rt(Ae(e)))}</li>`:"",A>0?`<li class="sdlc-run-meta-item"><span class="sdlc-run-meta-label">Tokens</span> ${Cs(A)} so far</li>`:""].filter(bn=>bn.length>0),D=ie.length===0?"":`<ul class="sdlc-run-meta">${ie.join("")}</ul>`,xe=n.length===0?"":`<div class="sdlc-run-actions">${n}</div>`,Pn=T?"":`<div class="sdlc-run-panel sdlc-run-panel-timeline"><h3 class="sdlc-run-panel-title">Progress</h3>${o}</div>`,An=T?"":W.length===0?`<div class="sdlc-run-grid sdlc-run-grid-single">${Pn}</div>`:`<div class="sdlc-run-grid">${Pn}${W}</div>`,ei=G2(e),Fr=e.wizard!==void 0&&L(e.status)&&e.revisions.every(bn=>bn.roundNumber===0&&(bn.judgement===void 0||bn.judgement===null)),hA=ei.length===0||Fr?"":`<section class="sdlc-run-prompts" aria-labelledby="sdlc-run-prompts-heading"><h2 id="sdlc-run-prompts-heading" class="sdlc-run-prompts-heading">Prompt history</h2><div class="sdlc-run-prompts-list">${ei}</div></section>`,pl=`<p class="sdlc-run-goal" title="${go(e.goal.trim())}">${go(mo(e.goal))}</p>`,SA=T?`${c}${i}${s}${E}${a}`:`${c}${An}${E}${s}${a}`,Up='<div id="sdlc-run-live-region" class="sdlc-sr-only" aria-live="polite" aria-atomic="true"></div><div id="sdlc-run-toast" class="sdlc-run-toast" role="status" aria-live="polite" hidden></div>',ti=T?'<p class="muted sdlc-run-complete-note">4/4 wizard steps complete \xB7 Step 4 scores live in Module results.</p>':"";return`<section class="card sdlc-run" id="prompt-optimizer-run" data-live="${t?"true":"false"}" data-since="${go(e.updatedAt)}" aria-busy="${t?"true":"false"}">${Up}<header class="sdlc-run-head"><div class="sdlc-run-head-top"><p class="eyebrow">This run</p>${M}</div>${pl}<div class="sdlc-run-activity${P}"${y?' role="status"':""}><div class="sdlc-run-activity-icon">${B}</div><div class="sdlc-run-activity-copy"><h2 class="sdlc-run-title">${go(r.title)}</h2>${S}${h}${ti}</div></div>${D}${xe}</header>${SA}</section>${hA}`}});var g5,f5=l(()=>{"use strict";I();pu();g5=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="evaluate"||!Yd({revisions:e.revisions,wizard:t,passScore:e.passScore})?e:nn(e)}});var y5,h5=l(()=>{"use strict";I();Pu();y5=e=>{let t=e.wizard;return e.status!=="wizard_paused"||t===void 0||t.gate!=="generalize"||!Jd(t)?e:xs({...e,wizard:{...t,gate:null}})}});var S5,P5=l(()=>{"use strict";I();uu();S5=e=>{let t=e.wizard;if(e.status!=="wizard_paused"||t===void 0||t.gate!=="separate"||!Xd(t.splitOptions))return e;let r=t.splitOptions[0];return on(e,r)}});var wie,Ws,yS=l(()=>{"use strict";f5();h5();P5();vt();wie=e=>{let t=y5(e),r=g5(t);return S5(r)},Ws=(e,t)=>{let r=wie(t);return r!==t?(z(e,r),r):t}});var A5,fo,ku=l(()=>{"use strict";I();A5=e=>Tt.indexOf(e),fo=e=>{let t=e.wizard;return t===void 0?null:t.phase==="complete"||L(e.status)?Tt.length:t.gate!==null?A5(t.gate):e.status==="wizard_paused"?null:t.phase==="generalize"||t.phase==="evaluate"||t.phase==="separate"||t.phase==="optimize_modules"?A5(t.phase):null}});var b5,_5=l(()=>{"use strict";b5=e=>e.output!==null?e.output:e.nullReason==="not-chain"?"Parallel split: modules do not receive prior output.":e.nullReason==="first-module"?"First module in the chain: no prior output.":e.nullReason==="prior-skipped"?"Prior module was skipped; no chain handoff.":e.nullReason==="prior-no-output"?"Prior module finished without runner output.":e.nullReason==="prior-missing"?"Prior module is missing from this split.":"No prior output."});var Os,k5,w5=l(()=>{"use strict";I();_5();Os=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),k5=e=>{let t=e.cycle.wizard;if(t===void 0)return"";let r=t.currentModuleIndex,o=Ps(t,r),n=r>0||t.selectedSplitTopology==="chain"?`<div class="sdlc-wizard-chain-handoff"><h4>Chain handoff preview</h4><p class="muted">Runner instructions for this module can include the prior module\u2019s output when topology is chain.</p><pre class="sdlc-pre sdlc-chain-prior-preview">${Os(b5(o))}</pre></div>`:"",s=bs(e.modulePrompt);if(s.length===0)return n.length>0?`<div class="sdlc-wizard-module-params">${n}</div>`:"";let i=io(t),a=s.map(c=>{let d=t.variables.find(P=>P.name===c),u=wh(c),g=i[c]??"",f=d===void 0?`{{${c}}}`:`{{${c}}} \u2014 ${d.description}`,y=d===void 0?'<p class="muted">This placeholder was not listed in Step 1. Enter a value for the test run.</p>':`<p class="muted">Step 1 sample: ${Os(d.sampleValue)}</p>`;return`<div class="field">
        <label class="field-label" for="${Os(u)}">${Os(f)}</label>
        ${y}
        <input class="input" type="text" id="${Os(u)}" name="${Os(u)}" value="${Os(g)}" required>
      </div>`}).join("");return`<div class="sdlc-wizard-module-params"><h3>Parameters for this module run</h3>${n}${a}</div>`}});var T5,E5=l(()=>{"use strict";T5={goal:{title:"Goal",practice:"Write the outcome a reader can check. Run uses the text in this field.",example:"Reply to a support ticket using only facts in the ticket."},prompt:{title:"Prompt",practice:"Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",example:"Update replies/latest.md for the customer. Use only facts from the ticket."},folder:{title:"Folder",practice:"Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",example:"~/work/support-bot"},skill:{title:"Skill",practice:"Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",example:"support-reply"},judge:{title:"Judge",practice:"Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",example:"Claude"},judgeInstructions:{title:"Instructions for the judge",practice:"Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",example:`Input: Where is my refund?
Check: replies/latest.md
Wanted: The ticket has no refund.
Mark down: A file that invents a refund amount.`},improver:{title:"Improver",practice:"Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",example:"Codex"},improverInstructions:{title:"Instructions for the improver",practice:"Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",example:`Keep the reply under four sentences.
Input: Where is my refund?
Wanted output: The ticket has no refund. Ask which order.`},passScore:{title:"Step 2 pass score",practice:"Wizard Step 2 (evaluate) passes when the judge scores the templated prompt at or above this value. Default 70.",example:"70"},modulePassScore:{title:"Step 4 pass score",practice:"Wizard Step 4 (optimize modules) passes each module trial when the judge scores the run output at or above this value. Default 90.",example:"90"},runner:{title:"Runner",practice:"In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",example:"Claude"},runnerInstructions:{title:"Runner instructions",practice:"Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",example:"Write only to module-output.md in the project root."},maxTrials:{title:"Max trials",practice:"Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",example:"1"},maxSpendUsd:{title:"Max spend (USD)",practice:"Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",example:"2.50"},confirmedTokenBudget:{title:"Confirmed token budget",practice:"Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",example:"24000"},confirmedMaxSpendUsd:{title:"Confirmed max spend (USD)",practice:"Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",example:"0.24"}}});var wu,Tie,be,an=l(()=>{"use strict";E5();rn();wu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Tie=e=>{let t=T5[e],r=`sdlc-tip-${e}`;return`<button type="button" class="sdlc-tip" aria-label="How to use ${wu(t.title)}" aria-describedby="${r}" aria-expanded="false">${dt}<span class="sdlc-tip-panel" id="${r}" role="tooltip"><span class="sdlc-tip-kicker">Best practice</span><span class="sdlc-tip-copy">${wu(t.practice)}</span><span class="sdlc-tip-kicker">Example</span><span class="sdlc-tip-example">${wu(t.example)}</span></span></button>`},be=(e,t,r)=>`<span class="field-label-row"><span class="field-label"${r===void 0?"":` id="${wu(r)}"`}>${wu(e)}</span>${Tie(t)}</span>`});var jt,R5,v5,C5=l(()=>{"use strict";I();du();mS();an();jt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),R5=e=>{let t=e.costControls;if(t===void 0||wa(t))return"";let r=t.targetTokenBudget??0,o=t.rateUsdPer1kTokens??(r>0&&t.estimatedSpendUsd!==null?t.estimatedSpendUsd*1e3/r:.01),n=t.estimatedSpendUsd??Et({tokens:r,rateUsdPer1kTokens:o}),s=t.confirmedTokenBudget??r,i=t.confirmedMaxSpendUsd??t.maxSpendUsd??n,a=t.proposalStub===!0?`<p class="muted sdlc-cost-stub-note" data-sdlc-cost-stub-note>${jt(Y.stubProposalNote)}</p>`:"",c=t.softWarnFired===!0?`<p class="alert-warn sdlc-cost-soft-warn" data-sdlc-cost-soft-warn>${jt(t.softWarnMessage??_s)}</p>`:"",d=Xh({estimatedSpendUsd:n,maxSpendUsd:t.maxSpendUsd})?`<p class="alert-warn sdlc-cost-estimate-over" data-sdlc-estimate-over-ceiling>${jt(Y.estimateOverCeilingWarn)}</p>`:"",u=e.wizard?.modules.length??0,g=u>0?`<p class="muted">Step 4 will optimize ${u} module${u===1?"":"s"} (maxTrials ${t.maxTrials}).</p>`:"";return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active sdlc-cost-confirm" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-4-confirm" data-sdlc-cost-confirm>
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
</section>`},v5=e=>{let t=e.wizard,r=e.costControls;return t!==void 0&&t.gate==="optimize_modules"&&r!==void 0&&!wa(r)}});var Eie,L5,x5=l(()=>{"use strict";rn();Eie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),L5=e=>{let t=e.trim();return t.length===0?"":`<p class="sdlc-wizard-parse-failure muted">Writer reply could not be parsed as JSON. <button type="button" class="sdlc-field-info sdlc-node-failure-info" data-sdlc-failure-reply-info aria-label="View writer reply">${dt}</button></p><template data-sdlc-failure-reply><h2>Writer reply</h2><pre class="mono sdlc-exact-prompt-pre">${Eie(t)}</pre></template>`}});var Tu,I5,W5=l(()=>{"use strict";I();rv();w5();lv();Dv();$v();uv();C5();x5();Tu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),I5=(e,t)=>{let r=e.wizard;if(r===void 0||r.gate===null)return"";let o=r.gate;if(v5(e))return R5(e);let n=pe(r),s=o==="generalize"?"Step 1 \u2014 Generalize":o==="evaluate"?"Step 2 \u2014 Evaluate":o==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",i=o==="generalize"?AG(r):"",a=o==="evaluate"?pS(e):"",c=o==="evaluate"?Ta({cycle:e,interactive:!0,selectedRound:r.evaluateSelectedRound}):"",u=o==="separate"?`${o==="separate"?'<p class="muted sdlc-topology-explainer"><strong>Chain</strong> runs modules in order; each module\u2019s runner can see the previous module\u2019s output. <strong>Parallel</strong> modules are independent.</p>':""}<ul class="sdlc-wizard-splits">${r.splitOptions.map(x=>{let W=x.topology==="chain"?' <span class="sdlc-badge sdlc-badge-chain">Chain</span>':' <span class="sdlc-badge sdlc-badge-parallel">Parallel</span>',j=x.recommended?' <span class="sdlc-badge">Recommended</span>':"",M=r.selectedSplitOptionId===x.id||r.selectedSplitOptionId===null&&x.recommended?" checked":"";return`<li class="sdlc-wizard-split-option"><label class="sdlc-wizard-split-option-label"><input type="radio" name="wizardSplitOptionId" value="${Tu(x.id)}" required${M}> <strong>${Tu(x.title)}</strong>${W}${j}</label>${Oh(e,x)}</li>`}).join("")}</ul>`:"",g=r.modules[r.currentModuleIndex],y=o==="optimize_modules"&&g?.status==="running"&&(e.status==="judging"||e.status==="improving")?" disabled":"",P=g?.title??"Module",h=g?.prompt??"",p=g?.status==="pending",S=o==="optimize_modules"?`<p>Module ${r.currentModuleIndex+1} of ${r.modules.length}: ${Tu(P)}</p>${p?k5({cycle:e,modulePrompt:h}):""}<p class="muted">Test run prompt preview: ${Tu(As(h,io(r)))}</p>${g?.statistics===null||g?.statistics===void 0?"":`<p class="muted">Module stats: best ${g.statistics.bestScore??"\u2014"} / \u2265${n} (round ${g.statistics.bestRound??"\u2014"}).</p>`}${Ta({cycle:e,interactive:!1,caption:p?"After you continue, the runner and judge score this module.":`Scored rounds for \u201C${P}\u201D (runner + judge).`})}`:"",b=o==="generalize"?"Review the templated prompt and variables. Continue to evaluate, or rerun this step with feedback.":o==="evaluate"?"Pick which revision to carry into the separate step, then continue. Rerun with feedback to judge again.":o==="separate"?"Choose a module split, then continue to optimize each module. Rerun with feedback to propose new options.":p?"Set parameters for this module\u2019s test run, then continue. Rerun with feedback to adjust the module prompt.":"Review progress on this module. Continue when ready, or rerun with feedback.",k=qd(r),A=k===null?"":`<p class="muted sdlc-wizard-cumulative-tokens">Wizard tokens so far (reported): ${k}</p>`,_=e.errorMessage!==null&&(r.lastWriterParseFailureReply?.trim().length??0)>0?L5(r.lastWriterParseFailureReply??""):"",E=o==="generalize"?"wizard-1":o==="evaluate"?"wizard-2":o==="separate"?"wizard-3":"wizard-4",T=t?.active===!0?" sdlc-wizard-gate-active":"",C=t?.active===!0?` id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="${E}"`:"";return`<section class="card sdlc-wizard-gate${T}"${C}>
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
    ${Y2(e)}
  </section>`}});var Rie,O5,M5=l(()=>{"use strict";I();$h();Rie=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),O5=e=>{let t=e.wizard;if(t===void 0||t.gate!==null||e.status==="wizard_paused"||L(e.status))return"";let r=(o,n)=>{let s=Ra(e,o);return`<h2 class="sdlc-wizard-active-head">${Rie(n)}${s}</h2>`};if(t.phase==="separate"&&t.splitOptions.length===0)return`<section class="card sdlc-wizard-gate sdlc-wizard-gate-active" id="prompt-optimizer-wizard-active-step" data-sdlc-step-id="wizard-3">
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
  </section>`:""}});var Bv,j5,N5,ln,D5,Ma=l(()=>{"use strict";I();vt();Bv=new Map,j5=e=>{let t=new AbortController;return Bv.set(e,t),t.signal},N5=e=>{Bv.delete(e)},ln=e=>{Bv.get(e)?.abort()},D5=(e,t)=>{let r=Q(e,t);return r===null||r.wizard!==void 0?!1:(L(r.status)||(z(e,{...r,status:"stopped",errorMessage:ys,updatedAt:new Date().toISOString()}),ln(t)),!0)}});var H5,F5,Gv,$5,Vv=l(()=>{"use strict";I();ku();Ma();H5="Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.",F5=e=>{let t=/^wizard-([1-4])$/.exec(e);if(t===null)return null;let r=Number(t[1])-1;return Tt[r]??null},Gv=(e,t)=>{let r=F5(t);if(r===null||e.wizard===void 0)return!1;let o=Tt.indexOf(r);if(o===-1)return!1;let n=fo(e);return!(n===null||n<=o||e.status==="judging"&&e.wizard.gate===null&&n<Tt.length)},$5=(e,t)=>{let r=F5(t);if(r===null||e.wizard===void 0||!Gv(e,t))return e;ln(e.id);let o=Tt.slice(Tt.indexOf(r)),n=Ud(e.wizard,r),s=e.revisions[0]?.promptText.trim()??n.templatedPrompt;n={...n,gate:r,phase:r,pendingStepInstructions:"",attempts:n.attempts.filter(a=>!o.includes(a.step)),additionalSkillSuggestionsStatus:"idle",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:null},o.includes("generalize")&&(n={...n,variables:[],templatedPrompt:s}),o.includes("evaluate")&&(n={...n,evaluateSelectedRound:null}),o.includes("separate")&&(n={...n,splitOptions:[],selectedSplitOptionId:null,selectedSplitTopology:null}),o.includes("optimize_modules")&&(n={...n,modules:[],currentModuleIndex:0,parameterValues:{}});let i=o.includes("evaluate")?[]:o.includes("generalize")?[{roundNumber:0,promptText:s,judgement:null}]:e.revisions;return{...e,status:"wizard_paused",errorMessage:null,currentRound:0,revisions:i,...r==="evaluate"?{judgePromptTextOnly:!0}:{},wizard:n,updatedAt:new Date().toISOString()}}});var Kv,z5,U5=l(()=>{"use strict";Vv();Kv=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),z5=(e,t)=>Gv(e,t)?`<form method="POST" action="/prompt-optimizer" class="sdlc-wizard-step-retry sdlc-live-post" data-confirm-message="${Kv(H5)}"><input type="hidden" name="cycleId" value="${Kv(e.id)}"><input type="hidden" name="wizardStepId" value="${Kv(t)}"><button class="btn btn-link sdlc-wizard-step-retry-btn" type="submit" name="intent" value="wizard-retry-step">Retry this step</button></form>`:""});var vie,B5,Cie,G5,V5=l(()=>{"use strict";I();ku();W5();M5();U5();jh();vie={generalize:"Step 1 \u2014 Generalize",evaluate:"Step 2 \u2014 Evaluate",separate:"Step 3 \u2014 Separate",optimize_modules:"Step 4 \u2014 Optimize modules"},B5=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Cie=(e,t,r)=>{let o=z5(e,t);return`<details class="sdlc-wizard-accordion-item" data-sdlc-wizard-accordion-step="${B5(t)}">
  <summary class="sdlc-wizard-accordion-summary">${B5(r)}</summary>
  <div class="sdlc-wizard-accordion-body">${o}${Ea(e,t)}</div>
</details>`},G5=e=>{let t=e.wizard;if(t===void 0)return"";let r=fo(e);if(r===null)return"";let o=Tt.slice(0,r).map((i,a)=>Cie(e,`wizard-${a+1}`,vie[i])),n=t.gate!==null?I5(e,{active:!0}):O5(e),s=r>=Tt.length?"":n;return`<div class="sdlc-wizard-accordion" id="prompt-optimizer-wizard-accordion">${o.join("")}${s}</div>`}});var hS,qv=l(()=>{"use strict";V5();dv();I();hS=e=>{if(e===null||e.wizard!==void 0&&L(e.status))return'<div id="prompt-optimizer-wizard-gate-slot"></div>';let t=G5(e),r=TG(e);return`<div id="prompt-optimizer-wizard-gate-slot">${t}${r}</div>`}});var Lie,Jv,K5=l(()=>{"use strict";I();Me();lt();Ls();Lie=e=>{let t=e.wizard;return t!==void 0&&t.phase==="complete"&&t.additionalSkillSuggestionsStatus==="pending"},Jv=async(e,t,r)=>{if(!Lie(e))return e;let o=e.wizard;if(o===void 0)return e;if(e.judgeModel===O)return{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let n=xR({goal:e.goal,cycleStatus:e.status,wizard:o,orchestratorSkill:o.orchestratorSkill}),s=await ut({writerAgent:e.judgeModel,prompt:n,workingDirectory:Ae(e),signal:t});if(!s.ok)return r?.(e.judgeModel),{...e,wizard:{...o,additionalSkillSuggestionsStatus:"skipped"},updatedAt:new Date().toISOString()};let i=WR(s.text,o.orchestratorSkill?.fileName??null);return i.ok?{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:i.suggestions,additionalSkillSuggestionsSummary:i.summary.length>0?i.summary:null},updatedAt:new Date().toISOString()}:{...e,wizard:{...o,additionalSkillSuggestionsStatus:"ready",additionalSkillSuggestions:[],additionalSkillSuggestionsSummary:i.errorMessage},updatedAt:new Date().toISOString()}}});var Eu,SS,q5,Yv,J5,Y5,X5,PS,Xv=l(()=>{"use strict";Eu=m(require("node:fs")),SS=m(require("node:path")),q5=e=>SS.default.join(SS.default.dirname(e),"prompt-optimizer-writer-ready.json"),Yv=e=>{let t=q5(e);if(!Eu.default.existsSync(t))return{};try{let r=JSON.parse(Eu.default.readFileSync(t,"utf8"));return typeof r=="object"&&r!==null?r:{}}catch{return{}}},J5=(e,t)=>{Eu.default.mkdirSync(SS.default.dirname(e),{recursive:!0}),Eu.default.writeFileSync(q5(e),`${JSON.stringify(t,null,2)}
`)},Y5=(e,t)=>Yv(e)[t]?.message??null,X5=(e,t,r)=>{J5(e,{...Yv(e),[t]:{message:r}})},PS=(e,t)=>{let r=Yv(e);r[t]!==void 0&&J5(e,Object.fromEntries(Object.entries(r).filter(([o])=>o!==t)))}});var Zv,AS,bS,Z5,je,Ms=l(()=>{"use strict";I();Pv();Pu();K5();Au();Ma();Xv();yS();vt();Zv=new Set,AS={atMs:0,ids:[]},bS=async()=>{if(Date.now()-AS.atMs<3e4)return AS.ids;let e=await Qt({commands:Te({})});return AS.atMs=Date.now(),AS.ids=e.installedWriterIds,e.installedWriterIds},Z5=async(e,t,r)=>{let o=Q(e,t);if(o===null||r.aborted)return;let n=Ws(e,o),s=n.wizard?.phase==="complete"&&n.wizard.additionalSkillSuggestionsStatus==="pending";if(L(n.status)&&!s||n.status==="wizard_paused"||Wr(n))return;if(s){let c=await Jv(n,r,d=>{PS(e,d)});z(e,c);return}let i=await M2(n,c=>{PS(e,c)},r,c=>{Q(e,t)?.status==="stopped"||r.aborted||z(e,c)});if(!(Q(e,t)?.status==="stopped"||r.aborted)){if(z(e,i),L(i.status)){let c=await Jv(i,r,d=>{PS(e,d)});z(e,c);return}await Z5(e,t,r)}},je=(e,t)=>{if(Zv.has(t))return;let r=Q(e,t);if(r===null)return;let o=Ws(e,r),n=o.wizard?.phase==="complete"&&o.wizard.additionalSkillSuggestionsStatus==="pending";if(L(o.status)&&!n||o.status==="wizard_paused"||Wr(o))return;Zv.add(t);let s=j5(t);Z5(e,t,s).finally(()=>{Zv.delete(t),N5(t)})}});var cn,Ru=l(()=>{"use strict";Uv();yS();qv();Ms();cn=(e,t)=>{let r=Ws(e,t);return je(e,r.id),`${fS(r)}${hS(r)}`}});var Q5,eV,tV=l(()=>{"use strict";Q5=(e,t)=>e.revisions.find(o=>o.roundNumber===t)?.judgement?.score??null,eV=e=>e!==null&&e>0});var xie,Iie,Wie,rV,oV=l(()=>{"use strict";I();Pu();aS();uu();pu();Ma();Nh();Nh();xie=e=>({id:"timeline-skip-single-module",title:"Single module",summary:"Skipped separate \u2014 one module from the generalized template.",topology:"parallel",recommended:!0,modules:[{id:"module-1",title:"Module 1",prompt:e,order:0}]}),Iie=e=>{let t=e.wizard;if(t===void 0||t.evaluateSelectedRound!==null)return e;let o=Se(e.revisions.map(n=>({roundNumber:n.roundNumber,promptText:n.promptText,score:n.judgement?.score??0,reasons:n.judgement?.reasons??""})))?.roundNumber??e.revisions.at(-1)?.roundNumber??0;return{...e,wizard:{...t,evaluateSelectedRound:o}}},Wie=e=>{let t=e.wizard;if(t===void 0)return e;let r=t.modules.map(s=>s.status==="passed"?s:{...s,status:"stopped"}),o={...t,modules:r,gate:null},n=ce(o);return Wa({...e,errorMessage:null,wizard:o},n.terminalStatusSuggestion)},rV=(e,t)=>{if(!lu(e,t))return e;ln(e.id);let r={...e,errorMessage:null},o=r.wizard;if(o===void 0)return e;if(t==="wizard-1")return xs({...r,wizard:{...o,gate:null}});if(t==="wizard-2")return nn(Iie(r));if(t==="wizard-3"){let n=o.splitOptions[0]??xie(o.templatedPrompt);return on(r,n)}return t==="wizard-4"?Wie(r):e}});var _S,nV,Qv=l(()=>{"use strict";I();aS();Ma();_S=e=>(ln(e.id),{...Wa(e,"stopped"),errorMessage:nR}),nV=e=>{let t=e.wizard;if(t===void 0||t.phase!=="optimize_modules")return e;ln(e.id);let r=t.currentModuleIndex,o=t.modules.map((n,s)=>s===r?{...n,status:"stopped"}:n);return{...e,status:"wizard_paused",errorMessage:null,wizard:{...t,modules:o,gate:"optimize_modules"},updatedAt:new Date().toISOString()}}});var Oie,sV,iV,aV=l(()=>{"use strict";I();Pu();aS();uu();pu();Ru();vt();Ms();tV();Vv();oV();Qv();Oie="Pick a revision scored above 0 before continuing to Separate.",sV=e=>({...e,status:"judging",errorMessage:null,wizard:e.wizard===void 0?void 0:{...e.wizard,gate:null},updatedAt:new Date().toISOString()}),iV=e=>{let t=e.posted;if(t===null)return!1;let r=t.get("liveFragment")==="1",o=t.get("intent")??"";if(!o.startsWith("wizard-"))return!1;let n=t.get("cycleId")?.trim()??"",s=Q(e.storePath,n);if(s===null||s.wizard===void 0)return e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0;let i=c=>{e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(c)}`}),e.response.end()},a=c=>{if(!r){i(c);return}let d=Q(e.storePath,c);if(d===null){e.response.writeHead(404,{}),e.response.end();return}e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(cn(e.storePath,d))};if(o==="wizard-stop-all"){let c=_S(s);return z(e.storePath,c),je(e.storePath,n),a(n),!0}if(o==="wizard-skip-module"){let c=nV(s);return z(e.storePath,c),a(n),!0}if(o==="wizard-retry-step"){let c=t.get("wizardStepId")?.trim()??"",d=$5(s,c);return z(e.storePath,d),a(n),!0}if(o==="wizard-skip-step"){let c=t.get("wizardStepId")?.trim()??"",d=rV(s,c);return z(e.storePath,d),(d.status==="judging"||d.wizard?.additionalSkillSuggestionsStatus==="pending")&&je(e.storePath,n),a(n),!0}if(o==="wizard-feedback-rerun"){let c=t.get("wizardFeedback")?.trim()??"",d=s.wizard.gate;if(d===null||c.length===0)return a(n),!0;let u=t.get("wizardStepInstructions")?.trim()??"",g=TR(s.wizard,d,c);g=Ud(g,d),g={...g,pendingStepInstructions:u};let f={...s,status:"judging",errorMessage:null,wizard:{...g,gate:null},updatedAt:new Date().toISOString()};return z(e.storePath,f),je(e.storePath,n),a(n),!0}if(o==="wizard-continue"){let c=s.wizard.gate;if(c===null)return a(n),!0;if(c==="generalize"){let d=s.wizard.attempts.some(f=>f.step==="generalize"),g=(s.errorMessage?.trim().length??0)>0&&!d?sV(s):xs({...s,wizard:{...s.wizard,gate:null}});return z(e.storePath,g),je(e.storePath,n),a(n),!0}if(c==="evaluate"){let d=t.get("wizardRevisionRound"),u=d===null||d===""?s.wizard.evaluateSelectedRound:Number(d),g=Q5(s,u??-1);if(!eV(g)){let y={...s,errorMessage:Oie,updatedAt:new Date().toISOString()};return z(e.storePath,y),a(n),!0}let f=nn({...s,wizard:{...s.wizard,evaluateSelectedRound:u}});return z(e.storePath,f),je(e.storePath,n),a(n),!0}if(c==="separate"){if((s.errorMessage?.trim().length??0)>0&&s.wizard.splitOptions.length===0){let y=sV(s);return z(e.storePath,y),je(e.storePath,n),a(n),!0}let u=t.get("wizardSplitOptionId")?.trim()??"",g=s.wizard.splitOptions.find(y=>y.id===u);if(g===void 0){let y={...s,errorMessage:u.length===0?"Choose one split option before continuing to Step 4.":"That split option is no longer available. Pick another option or rerun Separate.",updatedAt:new Date().toISOString()};return z(e.storePath,y),a(n),!0}let f=on(s,g);return z(e.storePath,f),a(n),!0}if(c==="optimize_modules"){let d=s.wizard,u=d.currentModuleIndex,g=d.modules[u];if(g===void 0)return a(n),!0;if(!wa(s.costControls)){let p=t.get("confirmedTokenBudget")?.trim()??"",S=t.get("confirmedMaxSpendUsd")?.trim()??"";if(p.length===0){let k={...s,errorMessage:ba,updatedAt:new Date().toISOString()};return z(e.storePath,k),a(n),!0}let b=co({existing:s.costControls,confirmedTokenBudget:Number(p),confirmedMaxSpendUsd:S.length===0?null:Number(S),rateUsdPer1kTokens:s.costControls?.rateUsdPer1kTokens});if(!b.ok){let k={...s,errorMessage:b.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,k),a(n),!0}s={...s,costControls:b.costControls,errorMessage:null,updatedAt:new Date().toISOString()},z(e.storePath,s)}let f=BR({wizard:d,modulePrompt:g.prompt,posted:t});if(!f.ok){let p={...s,errorMessage:f.errorMessage,updatedAt:new Date().toISOString()};return z(e.storePath,p),a(n),!0}let y={...d,parameterValues:f.parameterValues};if(g.status==="pending"){let p=O2({...s,wizard:{...y,gate:null}},u);return z(e.storePath,p),je(e.storePath,n),a(n),!0}let P=u+1;if(P>=d.modules.length){let p=ce(y),S=Wa({...s,wizard:y},p.terminalStatusSuggestion);return z(e.storePath,S),je(e.storePath,n),a(n),!0}let h={...s,status:"wizard_paused",errorMessage:null,revisions:[],wizard:{...y,gate:"optimize_modules",currentModuleIndex:P},updatedAt:new Date().toISOString()};return z(e.storePath,h),a(n),!0}}return a(n),!0}});var Mie,lV,jie,eC,Nie,cV,dV=l(()=>{"use strict";Me();Ma();Qv();Rv();Qh();Au();vt();Mie="Add a score from 0 to 100 and the reason for it.",lV="Add a score from 1 to 100 and the reason for it.",jie="Write the next prompt.",eC="This step is not waiting for you.",Nie=e=>{let t=Number(e);return/^\d{1,3}$/.test(e)&&t>=0&&t<=100?t:null},cV=e=>{let t=e.posted.get("intent");if(t==="stop"){let i=e.posted.get("cycleId")??"",a=Q(e.storePath,i);return a===null?{kind:"missing"}:a.wizard!==void 0?(z(e.storePath,_S(a)),{kind:"saved",cycleId:i}):D5(e.storePath,i)?{kind:"saved",cycleId:i}:{kind:"missing"}}if(t!=="manual-judge"&&t!=="manual-improve")return{kind:"ignored"};let r=e.posted.get("cycleId")??"",o=Q(e.storePath,r);if(o===null||!Wr(o))return o===null?{kind:"missing"}:{kind:"invalid",cycle:o,errorMessage:eC};if(t==="manual-judge"){if(o.judgeModel!==O)return{kind:"invalid",cycle:o,errorMessage:eC};let i=Nie(e.posted.get("score")??""),a=(e.posted.get("reasons")??"").trim(),c=o.wizard!==void 0&&(o.wizard.phase==="evaluate"||o.wizard.gate==="evaluate");if(i===null||a.length===0)return{kind:"invalid",cycle:o,errorMessage:c?lV:Mie};if(c&&i===0)return{kind:"invalid",cycle:o,errorMessage:lV};let d=o.revisions.find(g=>g.roundNumber===o.currentRound)?.run?.tokenReview??"",u=eS(yu(o,JSON.stringify({score:i,passed:i>=o.passScore,reasons:a})),d);return z(e.storePath,u),{kind:"saved",cycleId:o.id}}if(o.improverModel!==O)return{kind:"invalid",cycle:o,errorMessage:eC};let n=(e.posted.get("prompt")??"").trim();if(n.length===0)return{kind:"invalid",cycle:o,errorMessage:jie};let s=Zh(o,n);return z(e.storePath,s),{kind:"saved",cycleId:o.id}}});var uV,pV=l(()=>{"use strict";uV=`<script>
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
</script>`});var mV,gV=l(()=>{"use strict";mV=`<script>
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
</script>`});var fV,yV=l(()=>{"use strict";fV=`<script>
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
</script>`});var hV,SV=l(()=>{"use strict";hV=`<script>
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
</script>`});var PV,AV=l(()=>{"use strict";I();lt();PV=e=>{let t=e.cycle;if(t===null)return{goal:e.goal,prompt:e.prompt,folder:e.folder,passScore:e.passScore,modulePassScore:e.modulePassScore??String(90),maxRounds:e.maxRounds??String(10),maxTrials:e.maxTrials??String(1),maxSpendUsd:e.maxSpendUsd??"",earlyStop:e.earlyStop??!0,judge:e.judge,improver:e.improver,judgeInstructions:e.judgeInstructions??"",improverInstructions:e.improverInstructions??"",runner:e.runner??"",runnerInstructions:e.runnerInstructions??"",running:!1};let r=t.revisions.find(s=>s.roundNumber===0),o=t.wizard?.templatedPrompt.trim()??"",n=o.length>0?o:r?.promptText??e.prompt;return{goal:t.goal,prompt:n,folder:t.workingDirectory===void 0?e.folder:Rt(t.workingDirectory),passScore:String(t.passScore),modulePassScore:String(pe(t.wizard)),maxRounds:String(t.maxRounds),maxTrials:String(t.costControls?.maxTrials??1),maxSpendUsd:t.costControls?.maxSpendUsd===null||t.costControls?.maxSpendUsd===void 0?"":String(t.costControls.maxSpendUsd),earlyStop:t.costControls?.earlyStop??!0,judge:t.judgeModel,improver:t.improverModel,judgeInstructions:t.judgeInstructions??"",improverInstructions:t.improverInstructions??"",runner:t.runnerModel===void 0||t.runnerModel==="manual"?"":t.runnerModel,runnerInstructions:t.wizard?.runnerInstructions??"",running:!L(t.status)}}});var bV,_V=l(()=>{"use strict";bV=`<script>
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
</script>`});var kV,wV=l(()=>{"use strict";I();ku();lS();kV=e=>{let t=Oa(e.errorKind);if(e.wizard===void 0)return e.status==="passed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="failed"?{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:e.status==="stopped"?{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Classic \xB7 revision round ${e.currentRound}`}:L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:`Legacy \xB7 revision round ${e.currentRound}`}:{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Legacy \xB7 revision round ${e.currentRound}`};let r=fo(e);if(e.status==="wizard_paused"&&r!==null&&r<4)return{badgeClass:"sdlc-history-badge sdlc-history-badge-paused",badgeLabel:"Paused",subtitle:`Wizard \xB7 step ${r+1} of 4`};if(e.status==="passed"){let o=ce(e.wizard);return{badgeClass:"sdlc-history-badge sdlc-history-badge-passed",badgeLabel:"Passed",subtitle:`Wizard${o.totalModules>0?` \xB7 ${o.passedModuleCount}/${o.totalModules} modules`:""}`}}if(e.status==="failed")return{badgeClass:"sdlc-history-badge sdlc-history-badge-failed",badgeLabel:t??"Failed",subtitle:"Wizard \xB7 fail-clean (not success)"};if(e.status==="stopped"){if(e.wizard.phase==="complete"){let o=ce(e.wizard),n=o.rows.reduce((i,a)=>a.bestScore===null?i:i===null?a.bestScore:Math.min(i,a.bestScore),null),s=n===null?"":` \xB7 lowest ${n}`;return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:`Wizard \xB7 ${o.passedModuleCount}/${o.totalModules} modules${s}`}}return{badgeClass:"sdlc-history-badge sdlc-history-badge-stopped",badgeLabel:t??"Stopped",subtitle:"Wizard \xB7 incomplete"}}return L(e.status)?{badgeClass:"sdlc-history-badge sdlc-history-badge-done",badgeLabel:"Complete",subtitle:"Wizard \xB7 all steps finished"}:r!==null&&r<4?{badgeClass:"sdlc-history-badge sdlc-history-badge-live",badgeLabel:"In progress",subtitle:`Wizard \xB7 step ${r+1} of 4`}:{badgeClass:"sdlc-history-badge",badgeLabel:"Wizard",subtitle:e.status.replaceAll("_"," ")}}});var TV,EV=l(()=>{"use strict";TV=(e,t=Date.now())=>{let r=Date.parse(e);if(Number.isNaN(r))return"";let o=Math.max(0,Math.floor((t-r)/1e3));if(o<60)return"Just now";let n=Math.floor(o/60);if(n<60)return`${n} min ago`;let s=Math.floor(n/60);return s<48?`${s} h ago`:`${Math.floor(s/24)} d ago`}});var yo,Die,Hie,RV,vV=l(()=>{"use strict";wV();EV();_u();yo=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Die=e=>e.wizard===void 0?"legacy":"wizard",Hie=(e,t)=>{let r=t===null?"":`<input type="hidden" name="openCycleId" value="${yo(t)}">`,o=kV(e),n=TV(e.updatedAt),s=t!==null&&e.id===t,i=s?`${o.subtitle} \xB7 Shown above`:o.subtitle,a=n.length===0?i:`${i} \xB7 ${n}`,c=s?'<span class="sdlc-history-badge sdlc-history-badge-viewing">Viewing</span>':"",d=s?"":`<span class="${yo(o.badgeClass)}">${yo(o.badgeLabel)}</span>`,u=e.status==="wizard_paused"?`<a class="btn btn-secondary sdlc-history-resume" href="/prompt-optimizer?cycle=${yo(e.id)}">Resume</a>`:"",g=s?"":`<form method="POST" action="/prompt-optimizer" onsubmit="return confirm('Delete this run from history?');"><input type="hidden" name="intent" value="delete-history"><input type="hidden" name="cycleId" value="${yo(e.id)}">${r}<button class="btn btn-link sdlc-history-delete" type="submit">Delete</button></form>`;return`<li class="sdlc-history-item${t===e.id?" sdlc-history-item-viewing":""}" data-sdlc-history-kind="${Die(e)}"><div class="sdlc-history-row-main">${c}${d}<div class="sdlc-history-row-copy"><a href="/prompt-optimizer?cycle=${yo(e.id)}">${yo(mo(e.goal))}</a><p class="muted">${yo(a)}</p></div></div><div class="sdlc-history-row-actions">${u}${g}</div></li>`},RV=(e,t)=>{if(e.length===0)return'<section class="card"><h2>History</h2><p class="muted">No runs yet.</p></section>';let r=e.slice(0,20).map(a=>Hie(a,t)).join(""),o=`<div class="sdlc-history-filter" role="group" aria-label="Filter history">
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="all" aria-pressed="true">All</button>
    <button type="button" class="btn btn-secondary" data-sdlc-history-filter="wizard" aria-pressed="false">Wizard</button>
  </div>`,n=Math.min(e.length,20),s=n===e.length?`History \xB7 ${e.length}`:`History \xB7 ${n} of ${e.length}`,i=`<section class="card sdlc-history-card"><h2 class="sdlc-history-heading">History</h2>${o}<ul class="sdlc-history">${r}</ul></section>`;return t!==null?`<details class="sdlc-history-details" id="prompt-optimizer-history" aria-labelledby="prompt-optimizer-history-summary"><summary class="sdlc-history-details-summary" id="prompt-optimizer-history-summary"><span class="eyebrow">Past runs</span> ${yo(s)}</summary>${i}</details>`:i}});var tC,kS,CV,Fie,$ie,vu,LV,wS=l(()=>{"use strict";tC=m(require("node:fs")),kS=m(require("node:path"));lt();CV=/^[a-z0-9-]+$/,Fie=e=>{let t=e.trim();if(t.length===0)return"";try{let r=JSON.parse(t);if(typeof r=="string")return r.trim()}catch{}return t.replace(/^["']|["']$/g,"").trim()},$ie=(e,t)=>{if(!CV.test(t))return null;let r=e.replace(/^\uFEFF/,""),o=t,n="",s=r;if(r.startsWith("---")){let a=r.indexOf(`
---`,3);if(a!==-1){let c=r.slice(3,a);s=r.slice(a+4).replace(/^\r?\n/,"");for(let d of c.split(`
`)){let u=/^(name|description):\s*(.*)$/.exec(d.trim());if(u===null)continue;let g=Fie(u[2]??"");u[1]==="name"&&g.length>0&&(o=g),u[1]==="description"&&(n=g)}}}let i=s.trim();return i.length===0?null:{fileName:t,name:o,description:n,promptText:i}},vu=e=>{let t=uo(e);if(!t.ok)return[];let r=kS.default.resolve(t.path,".cursor","skills"),o=[];try{o=tC.default.readdirSync(r)}catch{return[]}return o.filter(n=>CV.test(n)).flatMap(n=>{let s=kS.default.resolve(r,n,"SKILL.md");if(!s.startsWith(`${r}${kS.default.sep}`))return[];try{let i=$ie(tC.default.readFileSync(s,"utf8"),n);return i===null?[]:[i]}catch{return[]}}).toSorted((n,s)=>n.fileName.localeCompare(s.fileName))},LV=(e,t)=>vu(e).find(r=>r.fileName===t)??null});var xV,zie,IV,WV,OV=l(()=>{"use strict";an();xV=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),zie=e=>JSON.stringify(e.map(t=>({fileName:t.fileName,promptText:t.promptText}))).replaceAll("<","\\u003c"),IV=e=>{if(e.length===0)return`<div class="field">${be("Skill","skill")}<span class="muted">No skills in .cursor/skills for this folder.</span></div>`;let t=e.map(r=>`<option value="${xV(r.fileName)}">${xV(r.fileName)}</option>`).join("");return`<div class="field">${be("Skill","skill")}<select class="input" name="skillFile" data-skill-select><option value="">Choose a skill in this folder</option>${t}</select><span class="muted">Fills the prompt from that skill.</span></div><script type="application/json" id="prompt-optimizer-skill-catalog">${zie(e)}</script>`},WV=`<script>
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
</script>`});var mt,MV,jV=l(()=>{"use strict";I();mS();du();an();mt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),MV=e=>{let t=Number(e.maxTrials),r=Number.isInteger(t)&&t>=1&&t<=30?t:1,o=mt(e.maxSpendUsd),n=e.earlyStop?" checked":"",s=e.writerId?.trim()||null,i=e.maxRounds??5,a=ka({maxRounds:i,maxTrials:r,writerId:s}),c=a.rateUsdPer1kTokens??lo(s),d=e.maxSpendUsd.trim().length===0?null:Number(e.maxSpendUsd),g=Xh({estimatedSpendUsd:a.estimatedSpendUsd,maxSpendUsd:d!==null&&Number.isFinite(d)?d:null})?"":" hidden",f=s===null||s.length===0?"default":s;return`<div class="sdlc-block sdlc-cost-controls" data-sdlc-cost-controls>
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
</div>`}});var rt,NV,DV,Uie,HV,FV,$V,zV=l(()=>{"use strict";I();jv();Me();_u();ku();rt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),NV=e=>e==="generalize"?"Step 1 \u2014 Generalize":e==="evaluate"?"Step 2 \u2014 Evaluate":e==="separate"?"Step 3 \u2014 Separate":"Step 4 \u2014 Optimize modules",DV=e=>e.gate!==null?e.gate:e.phase==="generalize"||e.phase==="evaluate"||e.phase==="separate"||e.phase==="optimize_modules"?e.phase:null,Uie=e=>{let t=e.wizard?.templatedPrompt.trim()??"";return t.length>0?t:e.revisions.find(o=>o.roundNumber===0)?.promptText??""},HV=e=>e===O?"You":me(e),FV=e=>{let t=Uie(e),r=e.runnerModel===void 0||e.runnerModel==="manual"?"\u2014":me(e.runnerModel);return`<details class="sdlc-wizard-resume-inputs">
    <summary class="btn btn-secondary">View inputs</summary>
    <dl class="sdlc-wizard-resume-inputs-list">
      <div><dt>Goal</dt><dd>${rt(e.goal)}</dd></div>
      <div><dt>Prompt</dt><dd class="mono">${rt(t)}</dd></div>
      <div><dt>Judge</dt><dd>${rt(HV(e.judgeModel))}</dd></div>
      <div><dt>Improver</dt><dd>${rt(HV(e.improverModel))}</dd></div>
      <div><dt>Runner</dt><dd>${rt(r)}</dd></div>
    </dl>
  </details>`},$V=e=>{let t=e.wizard;if(t===void 0)return"";let r=mo(e.goal),o=e.status==="wizard_paused",n=!L(e.status)&&e.status!=="wizard_paused";if(!o&&!n)return"";if(n){let u=dS(e),g=DV(t),f=g===null?"":NV(g),y=fo(e),P=f.length===0?"":y===null||y>=4?` <strong>${rt(f)}</strong>`:` <strong>${rt(f)}</strong> (step ${y+1} of 4)`;return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-active" role="status" aria-live="polite">
    <p class="eyebrow">Wizard running</p>
    <h2>${rt(r)}</h2>
    <p class="lede"><span class="sdlc-spin" aria-hidden="true"></span> ${rt(u.title)}${P}</p>
    <p class="muted">${rt(u.detail)}</p>
    <div class="actions">
      ${FV(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${rt(e.id)}">Open this run</a>
    </div>
  </section>`}let s=DV(t),i=s===null?"Wizard":NV(s),a=fo(e),c=a===null||a>=4?"":` (step ${a+1} of 4)`,d=new Date(e.updatedAt).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"});return`<section class="card sdlc-wizard-resume sdlc-wizard-resume-paused" role="status">
    <p class="eyebrow">Wizard in progress</p>
    <h2>Resume ${rt(r)}</h2>
    <p class="lede">Paused at <strong>${rt(i)}</strong>${rt(c)} (last updated ${rt(d)}). Continue where you left off or open another run below.</p>
    <div class="actions">
      ${FV(e)}
      <a class="btn btn-primary" href="/prompt-optimizer?cycle=${rt(e.id)}">Resume wizard</a>
    </div>
  </section>`}});var Cu,UV,BV=l(()=>{"use strict";an();Cu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),UV=e=>{let t=`<option value=""${e.runner===""?" selected":""}>Choose</option>`,r=e.writers.map(n=>`<option value="${Cu(n.id)}"${n.id===e.runner?" selected":""}>${Cu(n.label)}</option>`).join(""),o=e.runner.length===0?'<p class="muted" data-writer-status="runner" data-writer="">Choose who runs step 4.</p>':`<p class="muted" data-writer-status="runner" data-writer="${Cu(e.runner)}">Checking ${Cu(e.writers.find(n=>n.id===e.runner)?.label??e.runner)}\u2026</p>`;return`<div class="sdlc-block sdlc-runner-block" data-sdlc-wizard-only>
    <p class="sdlc-block-title">Module runner</p>
    <p class="muted">Wizard step 4 only: the runner executes each module prompt; the judge scores only.</p>
    <div class="sdlc-writer">
      <div class="field">${be("Runner","runner")}<select class="input" name="runner" data-writer-select="runner" required>${t}${r}</select>${o}</div>
      <details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${be("Runner instructions","runnerInstructions")}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="runnerInstructions" rows="3">${Cu(e.runnerInstructions)}</textarea><span class="muted">Optional. Passed when the runner executes module prompts.</span></div></details>
    </div>
  </div>`}});var GV,VV=l(()=>{"use strict";GV=()=>'<table class="sdlc-role-step-table"><caption class="muted">Who does what in the wizard</caption><thead><tr><th>Role</th><th>Wizard steps</th></tr></thead><tbody><tr><td>Judge</td><td>Steps 2 and 4 (scores only)</td></tr><tr><td>Improver</td><td>\u2014</td></tr><tr><td>Runner</td><td>Step 4 (executes module prompts)</td></tr></tbody></table>'});var ja,KV,qV,JV,YV,XV=l(()=>{"use strict";an();ja=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),KV=(e,t,r,o,n)=>{let s=`<option value=""${r===""?" selected":""}>Choose</option>`,i=o.map(c=>`<option value="${ja(c.id)}"${c.id===r?" selected":""}>${ja(c.label)}</option>`).join(""),a=`<option value="manual"${r==="manual"?" selected":""}>${ja(n)}</option>`;return`<div class="field">${be(t,e==="judge"?"judge":"improver")}<select class="input" name="${e}" data-writer-select="${e}">${s}${i}${a}</select></div>`},qV=(e,t,r)=>{if(t.length===0)return`<p class="muted" data-writer-status="${e}" data-writer="">Choose who does this step.</p>`;if(t==="manual")return`<p class="muted" data-writer-status="${e}" data-writer="manual" data-ready="true">You will do this step.</p>`;let o=r.find(n=>n.id===t)?.label??t;return`<p class="muted" data-writer-status="${e}" data-writer="${ja(t)}">Checking ${ja(o)}\u2026</p>`},JV=(e,t,r,o,n)=>`<details class="sdlc-instruction-details"><summary class="sdlc-instruction-summary">${be(t,n)}</summary><div class="field"><textarea class="input textarea sdlc-instruction" name="${e}" rows="3">${ja(r)}</textarea><span class="muted">${o}</span></div></details>`,YV=e=>{let t=`<div class="sdlc-writer">${KV("judge","Judge",e.judge,e.writers,"I'll score it")}${qV("judge",e.judge,e.writers)}${JV("judgeInstructions","Instructions for the judge",e.judgeInstructions??"","Optional. Used with the goal when scoring.","judgeInstructions")}</div>`,r=`<div class="sdlc-writer">${KV("improver","Improver",e.improver,e.writers,"I'll rewrite it")}${qV("improver",e.improver,e.writers)}${JV("improverInstructions","Instructions for the improver",e.improverInstructions??"","Optional. Used with the goal when rewriting.","improverInstructions")}</div>`;return`<div class="sdlc-writers">${t}${r}</div>`}});var ZV,QV=l(()=>{"use strict";ZV=[{label:"Save tokens",goal:"Save tokens while keeping the same output and behavior."},{label:"Shorter prompt",goal:"Make the prompt shorter without losing required behavior or safety constraints."},{label:"Clearer instructions",goal:"Make instructions clearer and easier for the model to follow on the first try."},{label:"Add guardrails",goal:"Add explicit guardrails, constraints, and failure modes so the model stays on scope."},{label:"Template variables",goal:"Turn this into a reusable template with named {{variables}} and sample values for each."},{label:"Raise judge score",goal:"Improve the prompt so judge scores rise: tighter scope, checkable outcomes, and less ambiguity."}]});var rC,eK,tK=l(()=>{"use strict";QV();rC=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),eK=()=>`<div class="sdlc-goal-presets" role="group" aria-label="Common goals"><span class="sdlc-goal-presets-label muted">Quick fill:</span>${ZV.map(t=>`<button type="button" class="sdlc-goal-preset-chip" data-sdlc-goal-preset="${rC(t.goal)}" title="${rC(t.goal)}">${rC(t.label)}</button>`).join("")}</div>`});var Lu,Bie,Gie,oC,rK=l(()=>{"use strict";I();an();Lu=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Bie=(e,t)=>{let r=Number(e);return/^\d{1,3}$/.test(e)&&r>=1&&r<=100?r:t},Gie=e=>`calc((${e-1} / 99) * (100% - 1.15rem) + 0.575rem)`,oC=e=>{let t=Bie(e.passScore,e.defaultScore),r=Math.floor(t/2),o=Math.max(r+1,t-20),n=Nd(t).map(c=>c.label).join(" \xB7 "),s=e.usualMark??90,i=`--sdlc-weak:${r}%;--sdlc-close:${o}%;--sdlc-pass:${t}%`,a=`${e.inputId}-label`;return`<div class="field sdlc-pass" data-sdlc-pass-group><div class="sdlc-pass-head">${be(e.label,e.fieldTipKey,a)}<output class="sdlc-pass-value" data-sdlc-pass-value for="${Lu(e.inputId)}">${t}</output></div><div class="sdlc-pass-scale" style="${i}"><span class="sdlc-pass-bar" aria-hidden="true"></span><input id="${Lu(e.inputId)}" class="sdlc-pass-range" type="range" name="${Lu(e.inputName)}" min="1" max="100" step="1" value="${t}" data-sdlc-pass aria-labelledby="${Lu(a)}"><span class="sdlc-pass-mark" style="left:${Gie(s)}" aria-hidden="true"><span class="sdlc-pass-mark-label">${s}</span></span></div><p class="sdlc-pass-legend" data-sdlc-pass-legend>${Lu(n)}</p><p class="muted">The bar fades from weak to pass. The mark is the usual ${s}.</p></div>`}});var Kie,nC,ho,oK,nK=l(()=>{"use strict";Au();Uv();pV();gV();Uh();yV();SV();AV();_V();vV();wS();OV();an();qv();jV();zV();_u();BV();VV();XV();I();tK();rK();Kie=(e,t,r)=>r&&e.trim().length>0&&t.trim().length>0,nC='<button type="button" class="btn btn-link sdlc-compose-skip-summary" data-sdlc-compose-skip-to-summary>Skip to summary</button>',ho=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),oK=e=>{let t=e.errorMessage===null?"":`<div class="alert-error">${ho(e.errorMessage)}</div>`,r=(e.skillNotice??null)===null?"":`<div class="alert-success">${ho(e.skillNotice??"")}</div>`,o=`${NG}${DG}`,n=e.resumableWizardCycle??null,s=n===null?"":$V(n),i=hS(e.cycle),a=e.cycle===null?"":fS(e.cycle),c=e.cycle!==null&&Wr(e.cycle),d=PV(e),u=Kie(d.goal,d.prompt,e.canRun),g=YV({writers:e.writers,judge:d.judge,improver:d.improver,judgeInstructions:d.judgeInstructions,improverInstructions:d.improverInstructions}),f=UV({writers:e.writers,runner:d.runner,runnerInstructions:d.runnerInstructions}),y=`${oC({fieldTipKey:"passScore",label:"Step 2 pass score",inputName:"passScore",inputId:"sdlc-pass-step2",passScore:d.passScore,defaultScore:70,usualMark:70})}${oC({fieldTipKey:"modulePassScore",label:"Step 4 pass score",inputName:"modulePassScore",inputId:"sdlc-pass-step4",passScore:d.modulePassScore,defaultScore:90,usualMark:90})}`,P=MV({maxTrials:d.maxTrials,maxSpendUsd:d.maxSpendUsd,earlyStop:d.earlyStop,writerId:d.judge==="manual"?null:d.judge,maxRounds:5}),h=kR,p=d.running?'<p class="sdlc-locked" data-sdlc-locked>This run is using these choices.</p>':"",S=e.cycle!==null&&L(e.cycle.status),b=d.running&&!S,k=S||b?"":" open",A=b?" sdlc-compose-run-focus":"",E=`<span class="sdlc-form-head-actions" data-sdlc-compose-head-actions>${S?'<button type="button" class="btn btn-primary" data-sdlc-start-new-run title="Clear the form and set a new goal">New prompt</button>':'<a class="btn btn-secondary" href="/prompt-optimizer/guide">Instructions and example</a>'}</span>`,T=S?(()=>{let D=e.cycle!==null?mo(e.cycle.goal):mo(d.goal);return`<summary class="sdlc-compose-summary sdlc-compose-summary-collapsed sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="sdlc-compose-summary-chevron" aria-hidden="true">\u25B8</span><span class="sdlc-compose-summary-copy"><span class="eyebrow">Compose</span><span class="sdlc-compose-summary-title">Review settings</span><span class="muted sdlc-compose-summary-preview">${ho(D)}</span><span class="muted sdlc-compose-summary-hint">Expand to edit fields \u2014 does not start a run. Use New prompt or Re-run below.</span></span></span>${E}</summary>`})():`<summary class="sdlc-compose-summary sdlc-compose-head"><span class="sdlc-compose-summary-leading"><span class="eyebrow">Prompt optimizer</span> Optimize a prompt</span>${E}</summary>`,C=S?" sdlc-compose-viewing-finished":"",x=c||d.running?c?"Waiting for you":'<span class="sdlc-spin" aria-hidden="true"></span> Running\u2026':"Run",W=c?"waiting":d.running?"running":"idle",j=d.running&&!c?' aria-busy="true"':"",M=`<section class="card sdlc-compose${C}${A}" id="prompt-optimizer-compose">
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
        ${IV(vu(d.folder))}
        </div>
          <div class="sdlc-compose-step-actions">
            ${nC}
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
            ${eK()}
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
            ${nC}
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
        ${GV()}
          <div class="sdlc-compose-step-actions">
            <button type="button" class="btn btn-secondary" data-sdlc-compose-back>Back</button>
            ${nC}
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
    </section>`,B=e.history.length>0?bV:"",ie=`${""}${hV}${uV}${mV}${fV}${WV}${B}`;return`${t}${r}${M}${s}${a}${i}${o}${RV(e.history,e.cycle?.id??null)}${ie}`}});var xu,sC=l(()=>{"use strict";nK();xu=async(e,t)=>{e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:oK(t)}))}});var sK,iK=l(()=>{"use strict";dV();Ru();sC();vt();Ms();sK=async(e,t,r)=>{let o=t===null?{kind:"ignored"}:cV({posted:t,storePath:e.storePath});if(o.kind==="ignored")return!1;if(o.kind==="saved"){let n=Q(e.storePath,o.cycleId);return je(e.storePath,o.cycleId),t?.get("liveFragment")==="1"&&n!==null?(e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":n.id}),e.response.end(cn(e.storePath,n)),!0):(e.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(o.cycleId)}`}),e.response.end(),!0)}return o.kind==="missing"?(e.response.writeHead(303,{Location:"/prompt-optimizer"}),e.response.end(),!0):(await xu(e,{goal:"",prompt:"",modelNote:r.note,writers:r.writers,judge:o.cycle.judgeModel,improver:o.cycle.improverModel,folder:"~",passScore:String(o.cycle.passScore),maxRounds:String(o.cycle.maxRounds),canRun:r.canRun,errorMessage:o.errorMessage,skillNotice:null,cycle:o.cycle,history:xr(e.storePath),resumableWizardCycle:null}),!0)}});var aK,TS,iC=l(()=>{"use strict";I();aK=m(require("node:os")),TS=e=>{let t=new Date().toISOString();return{id:crypto.randomUUID(),goal:e.goal.trim(),judgeModel:e.judgeModel,improverModel:e.improverModel,workingDirectory:e.workingDirectory??aK.default.homedir(),status:"judging",currentRound:0,passScore:e.passScore??(e.wizard!==void 0?70:90),maxRounds:e.maxRounds??10,errorMessage:null,createdAt:t,updatedAt:t,revisions:[{roundNumber:0,promptText:e.sourcePrompt.trim(),judgement:null}],...e.sourceSkill===void 0?{}:{sourceSkill:e.sourceSkill},...e.judgeInstructions===void 0?{}:{judgeInstructions:e.judgeInstructions},...e.improverInstructions===void 0?{}:{improverInstructions:e.improverInstructions},...e.wizard===void 0?{}:{wizard:e.wizard},...e.runnerModel===void 0?{}:{runnerModel:e.runnerModel},costControls:e.costControls??sr()}}});var lK,Na,aC,cK,dK,Iu=l(()=>{"use strict";I();Me();yv();lK=(e,t)=>e.trim().length===0||t.trim().length===0?"Add a goal and a prompt.":e.trim().length>2e3||t.trim().length>2e4?"The goal or prompt is too long.":null,Na=e=>{let t=uG(e),r=Ts(e).map(s=>({id:s,label:xh[s]})),o=r.length===0?"No reasoning model is installed. You can score and rewrite the prompt yourself.":`Installed: ${r.map(s=>s.label).join(", ")}.`,n=t?.judge??"";return{note:o,canRun:!0,models:t,writers:r,judge:n,improver:t?.improver??n,runner:n}},aC=(e,t,r)=>t===O||t!==null&&e.writers.some(o=>o.id===t)?t:r,cK=(e,t,r,o=null)=>({judge:aC(e,t,e.judge),improver:aC(e,r,e.improver),runner:aC(e,o,e.runner)}),dK=e=>e===Bh?{goal:Gh,prompt:Vh}:{goal:"",prompt:""}});var lC,uK=l(()=>{"use strict";lC=e=>{let t=e.trim(),r=Number(t);return!/^\d{1,3}$/.test(t)||r<1||r>100?{ok:!1,errorMessage:"Pass score must be a whole number from 1 to 100."}:{ok:!0,passScore:r}}});var pK,qie,mK,gK,fK,yK=l(()=>{"use strict";I();pK=(e,t)=>{let r=e?.trim()??"";if(r.length===0)return t;if(!/^\d{1,3}$/.test(r))return null;let o=Number(r);return!Number.isInteger(o)||o<1||o>30?null:o},qie=e=>{let t=e?.trim()??"";if(t.length===0)return{ok:!0,value:null};let r=Number(t);return!Number.isFinite(r)||r<0?{ok:!1}:{ok:!0,value:Math.round(r*1e4)/1e4}},mK=(e,t)=>e.has("earlyStop")?!0:t!=="run",gK=e=>{let t=pK(e.maxTrials,1);if(t===null)return{ok:!1,errorMessage:`Max trials must be a whole number from 1 to ${30}.`};let r=qie(e.maxSpendUsd);if(!r.ok)return{ok:!1,errorMessage:"Max spend (USD) must be empty or a non-negative number."};let o=e.earlyStop?.trim().toLowerCase()??"on",n=o==="on"||o==="true"||o==="1"||o==="yes",s=pK(e.earlyStopFlatRounds,3);return s===null?{ok:!1,errorMessage:"Early-stop flat rounds must be a whole number from 1 to 30."}:{ok:!0,knobs:{maxTrials:t,maxSpendUsd:r.value,earlyStop:n,earlyStopFlatRounds:s}}},fK=e=>sr(e)});var hK,SK,ES,cC=l(()=>{"use strict";I();Me();lt();Iu();uK();yK();hK=(e,t,r)=>{let o=e?.get(t)?.trim()??"";if(o.length===0)return String(r);let n=lC(o);return n.ok?String(n.passScore):String(r)},SK=(e,t,r)=>{let o=e.get(t)?.trim()??"",n=o.length===0?r:o;return lC(n)},ES=e=>{let t=cK(e.selection,e.posted?.get("judge")??null,e.posted?.get("improver")??null,e.posted?.get("runner")??null),r=hK(e.posted,"passScore",70),o=hK(e.posted,"modulePassScore",90),n=String(5),s=e.posted?.get("judgeInstructions")?.trim()??"",i=e.posted?.get("improverInstructions")?.trim()??"",a=e.posted?.get("runnerInstructions")?.trim()??"",c=e.posted?.get("runner")??null,d=e.posted?.get("maxTrials")?.trim()||String(1),u=e.posted?.get("maxSpendUsd")?.trim()??"",g=e.posted?.get("intent")??"",f=e.posted===null?!0:mK(e.posted,g),y=(T,C)=>({kind:"form",goal:e.goal,prompt:e.prompt,folder:T,passScore:r,modulePassScore:o,maxRounds:n,errorMessage:C,judge:t.judge,improver:t.improver,judgeInstructions:s,improverInstructions:i,runner:t.runner,runnerInstructions:a,maxTrials:d,maxSpendUsd:u,earlyStop:f});if(e.posted===null)return y(e.defaultFolder??Es,null);let P=e.posted.get("folder")??Es;if(e.posted.get("intent")==="choose-folder"){let T=e.pickFolder();return y(T===null?P:Rt(T),null)}if((e.posted.get("intent")??"")!=="run")return y(P,null);let p=lK(e.goal,e.prompt);if(p!==null)return y(P,p);let S=SK(e.posted,"passScore",r);if(!S.ok)return y(P,S.errorMessage);let b=SK(e.posted,"modulePassScore",o);if(!b.ok)return y(P,b.errorMessage);let k=pG(e.installedIds,e.posted.get("judge"),e.posted.get("improver"));if(k===null)return y(P,"Choose a judge and an improver.");let A=uo(P);if(!A.ok)return y(P,A.errorMessage);let _=mG(e.installedIds,c,k.judge);if(_===null)return y(P,"Choose a runner for wizard step 4.");let E=gK({maxTrials:e.posted.get("maxTrials"),maxSpendUsd:e.posted.get("maxSpendUsd"),earlyStop:e.posted.has("earlyStop")?"on":"off",earlyStopFlatRounds:e.posted.get("earlyStopFlatRounds")});return E.ok?{kind:"start",goal:e.goal,prompt:e.prompt,judge:k.judge,improver:k.improver,workingDirectory:A.path,passScore:S.passScore,modulePassScore:b.passScore,maxRounds:5,sourceSkillFile:e.posted.get("skillFile")?.trim()??e.posted.get("orchestratorSkillFile")?.trim()??"",judgeInstructions:s,improverInstructions:i,runner:_,runnerInstructions:a,costControls:fK(E.knobs)}:y(P,E.errorMessage)}});var Da,vS,Jie,dC,PK,RS,AK,Yie,bK,uC,Xie,Zie,Qie,pC,_K,kK,wK=l(()=>{"use strict";Da=m(require("node:fs")),vS=m(require("node:path"));Me();lt();Jie=["remember","choose-folder","run"],dC=()=>({folder:Es,judge:"",improver:"",runner:""}),PK=e=>vS.default.join(vS.default.dirname(e),"prompt-optimizer-preferences.json"),RS=e=>typeof e=="string"?e:"",AK=e=>{let t=PK(e);if(!Da.default.existsSync(t))return dC();try{let r=JSON.parse(Da.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null)return dC();let o=r,n=RS(o.folder).trim();return{folder:n.length===0?Es:n,judge:RS(o.judge),improver:RS(o.improver),runner:RS(o.runner)}}catch{return dC()}},Yie=(e,t)=>{let r=PK(e);Da.default.mkdirSync(vS.default.dirname(e),{recursive:!0});let o=`${r}.tmp`;Da.default.writeFileSync(o,`${JSON.stringify(t,null,2)}
`),Da.default.renameSync(o,r)},bK=(e,t)=>e===O||Ts(t).some(r=>r===e),uC=(e,t,r)=>e===null?t:e.length===0?"":bK(e,r)?e:t,Xie=(e,t)=>{if(e===null)return t;let r=uo(e);return r.ok?r.display:t},Zie=e=>{let t=AK(e.storePath),r={folder:Xie(e.folder,t.folder),judge:uC(e.judge,t.judge,e.installedIds),improver:uC(e.improver,t.improver,e.installedIds),runner:uC(e.runner,t.runner,e.installedIds)};r.folder===t.folder&&r.judge===t.judge&&r.improver===t.improver&&r.runner===t.runner||Yie(e.storePath,r)},Qie=e=>{let t=uo(e);return t.ok?t.display:Es},pC=(e,t)=>bK(e,t)?e:"",_K=e=>{let t=AK(e.storePath);return{selection:{...e.selection,judge:pC(t.judge,e.installedIds)||e.selection.judge,improver:pC(t.improver,e.installedIds)||e.selection.improver,runner:pC(t.runner,e.installedIds)||e.selection.runner},defaultFolder:Qie(t.folder)}},kK=e=>{let t=e.posted.get("intent")??"";if(!Jie.includes(t))return;let r=e.posted.get("folder");Zie({storePath:e.storePath,installedIds:e.installedIds,folder:t==="remember"?r:r===null?null:e.folder,judge:e.posted.get("judge"),improver:e.posted.get("improver"),runner:e.posted.get("runner")})}});var TK,eae,tae,mC,rae,CS,LS=l(()=>{"use strict";TK=m(require("node:os"));Me();Xv();Ls();eae="Reply with the single word ok. Do not use tools.",tae=45e3,mC=async(e,t)=>{if(t===O)return{ok:!0,message:"You will do this step."};let r=Y5(e,t);if(r!==null)return{ok:!0,message:r};let o=await ut({writerAgent:t,prompt:eae,workingDirectory:TK.default.tmpdir(),timeoutMs:tae});if(!o.ok)return{ok:!1,message:o.errorMessage};let n=`${me(t)} is ready.`;return X5(e,t,n),{ok:!0,message:n}},rae=e=>[...new Set(e.filter(t=>t.length>0))],CS=async(e,t,r,o)=>{for(let n of rae([t,r,o??""])){let s=await mC(e,n);if(!s.ok)return s.message}return null}});var gC,EK=l(()=>{"use strict";I();gC=(e,t)=>{for(let r of e)if(r.wizard!==void 0&&!L(r.status)&&!(t!==null&&r.id===t))return r;return null}});var RK,vK=l(()=>{"use strict";Wt();I();du();Ru();iC();cC();sC();vt();lt();wK();wS();LS();EK();yS();Ms();RK=async e=>{let t=e.posted===null?_K({storePath:e.route.storePath,installedIds:e.installedIds,selection:e.selection}):null,r=ES({posted:e.posted,installedIds:e.installedIds,selection:t?.selection??e.selection,goal:e.goal,prompt:e.prompt,pickFolder:()=>qo("Choose the folder this prompt should run in"),...t===null?{}:{defaultFolder:t.defaultFolder}});if(e.posted!==null&&(kK({storePath:e.route.storePath,installedIds:e.installedIds,posted:e.posted,folder:r.kind==="start"?Rt(r.workingDirectory):r.folder}),e.posted.get("intent")==="remember")){e.route.response.writeHead(204),e.route.response.end();return}let o=r.kind==="start"?await CS(e.route.storePath,r.judge,r.improver,r.runner):null;if(r.kind==="start"&&o!==null){await xu(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,folder:Rt(r.workingDirectory),passScore:String(r.passScore),modulePassScore:String(r.modulePassScore),maxRounds:String(r.maxRounds),maxTrials:String(r.costControls.maxTrials),maxSpendUsd:r.costControls.maxSpendUsd===null?"":String(r.costControls.maxSpendUsd),earlyStop:r.costControls.earlyStop,canRun:!0,errorMessage:o,skillNotice:e.skillNotice,cycle:null,history:xr(e.route.storePath),resumableWizardCycle:gC(xr(e.route.storePath),null)});return}if(r.kind==="start"){let s=LV(r.workingDirectory,r.sourceSkillFile),i=Yh(ou({existing:r.costControls,maxRounds:r.maxRounds,writerId:r.judge==="manual"?null:r.judge})),a=TS({goal:r.goal,sourcePrompt:r.prompt,judgeModel:r.judge,improverModel:r.improver,workingDirectory:r.workingDirectory,passScore:r.passScore,maxRounds:r.maxRounds,costControls:i,wizard:MR({...zd(r.prompt),modulePassScore:r.modulePassScore,runnerInstructions:r.runnerInstructions},s===null?null:{fileName:s.fileName,name:s.name,description:s.description}),runnerModel:r.runner,...r.judgeInstructions.length===0?{}:{judgeInstructions:r.judgeInstructions},...r.improverInstructions.length===0?{}:{improverInstructions:r.improverInstructions},...s===null?{}:{sourceSkill:{fileName:s.fileName,name:s.name,description:s.description}}});if(z(e.route.storePath,a),je(e.route.storePath,a.id),e.posted!==null&&e.posted.get("liveFragment")==="1"){e.route.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store","X-Prompt-Sdlc-Cycle-Id":a.id}),e.route.response.end(cn(e.route.storePath,a));return}e.route.response.writeHead(303,{Location:`/prompt-optimizer?cycle=${encodeURIComponent(a.id)}`}),e.route.response.end();return}let n=e.cycleId===null?null:Q(e.route.storePath,e.cycleId);n!==null&&(n=Ws(e.route.storePath,n),je(e.route.storePath,n.id)),await xu(e.route,{goal:r.goal,prompt:r.prompt,modelNote:e.selection.note,writers:e.selection.writers,judge:r.judge,improver:r.improver,judgeInstructions:r.judgeInstructions,improverInstructions:r.improverInstructions,runner:r.runner,runnerInstructions:r.runnerInstructions,folder:r.folder,passScore:r.passScore,modulePassScore:r.modulePassScore,maxRounds:r.maxRounds,maxTrials:r.maxTrials,maxSpendUsd:r.maxSpendUsd,earlyStop:r.earlyStop,canRun:e.selection.canRun,errorMessage:r.errorMessage,skillNotice:e.skillNotice,cycle:n,history:xr(e.route.storePath),resumableWizardCycle:gC(xr(e.route.storePath),n?.id??null)})}});var CK,LK=l(()=>{"use strict";vt();CK=e=>{if(e.posted?.get("intent")!=="delete-history")return null;let t=e.posted.get("cycleId")??"";KG(e.storePath,t);let r=e.openCycleId??e.posted.get("openCycleId");return r===null||r.length===0||r===t?"/prompt-optimizer":`/prompt-optimizer?cycle=${encodeURIComponent(r)}`}});var xK,IK=l(()=>{"use strict";xK=(e,t)=>{if(e?.includes("application/x-www-form-urlencoded"))return new URLSearchParams(t);if(e?.includes("multipart/form-data")){let r=/boundary=([^;\s]+)/i.exec(e);if(r===null)return new URLSearchParams;let o=r[1].replace(/^"|"$/g,""),n=new URLSearchParams,s=t.split(`--${o}`);for(let i of s){if(!i.includes("Content-Disposition"))continue;let a=/name="([^"]+)"/.exec(i);if(a===null)continue;let c=i.indexOf(`\r
\r
`);if(c<0)continue;let d=i.slice(c+4);d=d.replace(/\r\n--\s*$/u,"").replace(/\r\n$/u,""),n.append(a[1],d)}return n}return new URLSearchParams(t)}});var WK,OK=l(()=>{"use strict";e2();aV();iK();vK();LK();Iu();IK();Ms();WK=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1"),r=await bS(),o=Na(r),n=e.method==="POST"?xK(e.request.headers["content-type"],await e.readBody(e.request)):null;if(iV({posted:n,storePath:e.storePath,response:e.response})||await sK(e,n,o))return;let s=dK(t.searchParams.get("example")),i=CK({posted:n,storePath:e.storePath,openCycleId:t.searchParams.get("cycle")});if(i!==null){e.response.writeHead(303,{Location:i}),e.response.end();return}let a=QG({posted:n,storePath:e.storePath});if(a.kind==="redirect"){e.response.writeHead(303,{Location:a.location}),e.response.end();return}await RK({route:e,posted:n,installedIds:r,selection:o,goal:n?.get("goal")??s.goal,prompt:n?.get("prompt")??s.prompt,skillNotice:ZG(t.searchParams),cycleId:t.searchParams.get("cycle")})}});var oae,MK,jK=l(()=>{"use strict";I();vt();oae=e=>e.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,"-").replaceAll(/^-+|-+$/g,"").slice(0,48)||"wizard-result",MK=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("export")!=="wizard-markdown")return!1;let r=t.searchParams.get("cycle");if(r===null||r.trim().length===0)return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Missing cycle id."),!0;let o=Q(e.storePath,r);if(o===null)return e.response.writeHead(404,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Run not found."),!0;if(o.wizard===void 0||!L(o.status))return e.response.writeHead(400,{"content-type":"text/plain; charset=utf-8"}),e.response.end("Wizard is not finished yet."),!0;let n=jR({goal:o.goal,cycleStatus:o.status,wizard:o.wizard}),s=`prompt-optimizer-wizard-${oae(o.goal)}.md`;return e.response.writeHead(200,{"content-type":"text/markdown; charset=utf-8","content-disposition":`attachment; filename="${s}"`}),e.response.end(n),!0}});var NK,DK=l(()=>{"use strict";Ru();vt();NK=e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1");if(t.searchParams.get("fragment")!=="run")return!1;let r=t.searchParams.get("cycle"),o=r===null?null:Q(e.storePath,r);return e.response.writeHead(200,{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}),e.response.end(o===null?"":cn(e.storePath,o)),!0}});var nae,HK,FK=l(()=>{"use strict";Me();LS();nae=["claude-cli","codex","cursor","antigravity"],HK=async e=>{if(e.method!=="GET")return!1;let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("writer-check");if(t===null)return!1;let o=t===O||nae.includes(t)?await mC(e.storePath,t):{ok:!1,message:"This writer is not available."};return e.response.writeHead(200,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(o)),!0}});var $K,zK=l(()=>{"use strict";I();$K=e=>{let t=e.length===1?e[0].id:null;return{ok:!0,url:Hd,page:Fd,context:Sa,installedWriters:e,post:{method:"POST",url:Hd,body:{goal:"what a good result is",prompt:"the prompt to score and rewrite",workingDirectory:"absolute project folder on this computer",judge:t??"installed writer id",improver:t??"installed writer id",passScore:70,maxRounds:5}},poll:`GET ${Hd}?cycle=<cycleId> until done is true.`,writers:t===null?"Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles.":`Only ${t} is installed. Omit judge and improver and both roles use it.`}}});var xS,UK=l(()=>{"use strict";I();zv();va();xS=e=>{let t=e.revisions[e.revisions.length-1]??null,r=Se(e.revisions.map(i=>({roundNumber:i.roundNumber,promptText:i.promptText,score:i.judgement?.score??null,reasons:i.judgement?.reasons??null}))),o=L(e.status),n=e.errorKind??null,s=gS({status:e.status,errorKind:n});return{ok:!0,cycleId:e.id,status:e.status,outcome:s,done:o,useThisPrompt:e.status==="passed",totalTokens:po(e),prompt:t?.promptText??"",bestPrompt:r?.promptText??null,bestScore:r?.score??null,bestRound:r?.roundNumber??null,score:t?.judgement?.score??null,passed:t?.judgement?.passed??null,goal:e.goal,judge:e.judgeModel,improver:e.improverModel,workingDirectory:e.workingDirectory??null,passScore:e.passScore,round:e.currentRound,errorMessage:e.errorMessage,errorKind:n,costControls:e.costControls?{maxTrials:e.costControls.maxTrials,maxSpendUsd:e.costControls.maxSpendUsd,earlyStop:e.costControls.earlyStop,earlyStopFlatRounds:e.costControls.earlyStopFlatRounds,targetTokenBudget:e.costControls.targetTokenBudget,proposedTokenBudget:e.costControls.targetTokenBudget,estimatedSpendUsd:e.costControls.estimatedSpendUsd,rateUsdPer1kTokens:e.costControls.rateUsdPer1kTokens,proposalStub:e.costControls.proposalStub,confirmedTokenBudget:e.costControls.confirmedTokenBudget,confirmedMaxSpendUsd:e.costControls.confirmedMaxSpendUsd,budgetConfirmed:e.costControls.budgetConfirmed,confirmationRequired:!e.costControls.budgetConfirmed,softWarnFired:e.costControls.softWarnFired,softWarnMessage:e.costControls.softWarnMessage,budgetExceeded:e.costControls.budgetExceeded}:null,context:Sa,page:`${Fd}?cycle=${encodeURIComponent(e.id)}`}}});var K,sae,BK,GK,VK=l(()=>{"use strict";K=m(li());I();sae=(0,K.isType)({goal:K.isString,prompt:K.isString,workingDirectory:K.isString,judge:(0,K.isUndefinedOr)(K.isString),improver:(0,K.isUndefinedOr)(K.isString),passScore:(0,K.isUndefinedOr)(K.isNumber),maxRounds:(0,K.isUndefinedOr)(K.isNumber),maxTrials:(0,K.isUndefinedOr)(K.isNumber),maxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),earlyStop:(0,K.isUndefinedOr)(K.isBoolean),earlyStopFlatRounds:(0,K.isUndefinedOr)(K.isNumber),confirmedTokenBudget:(0,K.isUndefinedOr)(K.isNumber),confirmedMaxSpendUsd:(0,K.isUndefinedOr)(K.isNumber),rateUsdPer1kTokens:(0,K.isUndefinedOr)(K.isNumber)}),BK=e=>{let t=e?.trim()??"";return t.length===0?null:t},GK=e=>{let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:"Send a JSON object."}}return sae(t)?t.workingDirectory.trim().length===0?{ok:!1,error:hh}:{ok:!0,body:{goal:t.goal,prompt:t.prompt,workingDirectory:t.workingDirectory.trim(),judge:BK(t.judge),improver:BK(t.improver),passScore:t.passScore===void 0?null:String(t.passScore),maxRounds:t.maxRounds===void 0?null:String(t.maxRounds),maxTrials:t.maxTrials??null,maxSpendUsd:t.maxSpendUsd??null,earlyStop:t.earlyStop??null,earlyStopFlatRounds:t.earlyStopFlatRounds??null,confirmedTokenBudget:t.confirmedTokenBudget??null,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??null}}:{ok:!1,error:hh}}});var So,iae,KK,qK,JK=l(()=>{"use strict";I();So=m(li()),iae=(0,So.isType)({intent:e=>e==="confirm_budget",confirmedTokenBudget:So.isNumber,confirmedMaxSpendUsd:(0,So.isUndefinedOr)(So.isNumber),rateUsdPer1kTokens:(0,So.isUndefinedOr)(So.isNumber)}),KK=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}return typeof t!="object"||t===null||!("intent"in t)||t.intent!=="confirm_budget"?{kind:"other"}:iae(t)?{kind:"confirm",body:t}:{kind:"invalid",error:"confirm_budget requires confirmedTokenBudget (number) and optional confirmedMaxSpendUsd."}},qK=(e,t)=>{let r=co({existing:e.costControls,confirmedTokenBudget:t.confirmedTokenBudget,confirmedMaxSpendUsd:t.confirmedMaxSpendUsd??null,rateUsdPer1kTokens:t.rateUsdPer1kTokens??e.costControls?.rateUsdPer1kTokens});return r.ok?{ok:!0,cycle:{...e,costControls:r.costControls,errorMessage:null,updatedAt:new Date().toISOString()}}:{ok:!1,error:r.errorMessage}}});var aae,YK,XK=l(()=>{"use strict";I();Me();cC();Iu();aae=e=>e.map(t=>t.id).join(", "),YK=e=>{let t=Na(e.installedIds),r=t.writers.length===1?t.writers[0].id:null,o=e.body.judge??r,n=e.body.improver??r;if(o===O||n===O)return{ok:!1,error:_R,installedWriters:t.writers};if(o===null||n===null){let a=aae(t.writers);return{ok:!1,error:a.length===0?"No reasoning writer is installed on this computer.":`Set judge and improver to installed writer ids: ${a}.`,installedWriters:t.writers}}let s=new URLSearchParams({intent:"run",goal:e.body.goal,prompt:e.body.prompt,folder:e.body.workingDirectory,judge:o,improver:n,runner:o});e.body.maxTrials!=null&&s.set("maxTrials",String(e.body.maxTrials)),e.body.maxSpendUsd!=null&&s.set("maxSpendUsd",String(e.body.maxSpendUsd)),e.body.earlyStop!==!1&&s.set("earlyStop","on"),e.body.earlyStopFlatRounds!=null&&s.set("earlyStopFlatRounds",String(e.body.earlyStopFlatRounds));let i=ES({posted:s,installedIds:e.installedIds,selection:t,goal:e.body.goal,prompt:e.body.prompt,pickFolder:()=>null});return i.kind==="form"?{ok:!1,error:i.errorMessage??t.note,installedWriters:t.writers}:{ok:!0,goal:i.goal,prompt:i.prompt,judge:i.judge,improver:i.improver,runner:i.runner,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,costControls:i.costControls}}});var lae,ZK,QK=l(()=>{"use strict";I();iC();zK();UK();Iu();VK();JK();XK();vt();lae=e=>{let t;try{t=JSON.parse(e)}catch{return{kind:"invalid",error:"Send a JSON object."}}if(typeof t!="object"||t===null||!("intent"in t)||t.intent!=="estimate_budget")return{kind:"other"};let r=t,o=s=>typeof s=="number"&&Number.isFinite(s)?s:void 0,n=s=>typeof s=="string"&&s.trim().length>0?s.trim():void 0;return{kind:"estimate",maxTrials:o(r.maxTrials),maxRounds:o(r.maxRounds),writerId:n(r.writerId)??n(r.judge),rateUsdPer1kTokens:o(r.rateUsdPer1kTokens),previewModuleCount:o(r.previewModuleCount)}},ZK=async e=>{let t=new URL(e.requestUrl,"http://127.0.0.1").searchParams.get("cycle");if(e.method==="GET"&&t!==null){let u=Q(e.storePath,t);return u===null?{status:404,body:{ok:!1,error:"That run is not on this computer."}}:{status:200,body:xS(u)}}let r=await e.handlers.readInstalledIds(),o=Na(r);if(e.method==="GET")return{status:200,body:$K(o.writers)};if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use GET or POST."}};if(t!==null){let u=KK(e.rawBody);if(u.kind==="other")return{status:400,body:{ok:!1,error:"POST ?cycle= expects intent confirm_budget with confirmedTokenBudget."}};if(u.kind==="invalid")return{status:400,body:{ok:!1,error:u.error}};let g=Q(e.storePath,t);if(g===null)return{status:404,body:{ok:!1,error:"That run is not on this computer."}};let f=qK(g,u.body);return f.ok?(z(e.storePath,f.cycle),{status:200,body:xS(f.cycle)}):{status:400,body:{ok:!1,error:f.error}}}let n=lae(e.rawBody);if(n.kind==="invalid")return{status:400,body:{ok:!1,error:n.error}};if(n.kind==="estimate"){let u=ka({maxRounds:n.maxRounds,maxTrials:n.maxTrials,writerId:n.writerId,rateUsdPer1kTokens:n.rateUsdPer1kTokens,previewModuleCount:n.previewModuleCount});return{status:200,body:{ok:!0,intent:"estimate_budget",targetTokenBudget:u.targetTokenBudget,proposedTokenBudget:u.targetTokenBudget,estimatedSpendUsd:u.estimatedSpendUsd,rateUsdPer1kTokens:u.rateUsdPer1kTokens??null,proposalStub:u.stub===!0,confirmationRequired:!0}}}let s=GK(e.rawBody);if(!s.ok)return{status:400,body:{ok:!1,error:s.error,installedWriters:o.writers}};let i=YK({body:s.body,installedIds:r});if(!i.ok)return{status:400,body:{ok:!1,error:i.error,installedWriters:i.installedWriters}};let a=await e.handlers.readWritersReady(e.storePath,i.judge,i.improver,i.runner);if(a!==null)return{status:400,body:{ok:!1,error:a,installedWriters:o.writers}};let c=ou({existing:{...i.costControls,...s.body.rateUsdPer1kTokens==null?{}:{rateUsdPer1kTokens:s.body.rateUsdPer1kTokens}},maxRounds:i.maxRounds,writerId:i.judge==="manual"?null:i.judge});if(s.body.rateUsdPer1kTokens!=null&&c.targetTokenBudget!==null&&(c={...c,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens,estimatedSpendUsd:Et({tokens:c.targetTokenBudget,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens})}),s.body.confirmedTokenBudget!=null){let u=co({existing:c,confirmedTokenBudget:s.body.confirmedTokenBudget,confirmedMaxSpendUsd:s.body.confirmedMaxSpendUsd,rateUsdPer1kTokens:s.body.rateUsdPer1kTokens??c.rateUsdPer1kTokens});if(!u.ok)return{status:400,body:{ok:!1,error:u.errorMessage}};c=u.costControls}let d=TS({goal:i.goal,sourcePrompt:i.prompt,judgeModel:i.judge,improverModel:i.improver,workingDirectory:i.workingDirectory,passScore:i.passScore,maxRounds:i.maxRounds,wizard:zd(i.prompt),runnerModel:i.runner,costControls:c});return z(e.storePath,d),e.handlers.startCycle(e.storePath,d.id),{status:200,body:xS(d)}}});var eq,tq=l(()=>{"use strict";Ms();LS();QK();eq=async e=>{let t=await ZK({method:e.method,requestUrl:e.requestUrl,rawBody:e.method==="POST"?await e.readBody(e.request):"",storePath:e.storePath,handlers:{readInstalledIds:bS,readWritersReady:CS,startCycle:je}});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var oq,cae,dae,rq,uae,nq,sq=l(()=>{"use strict";oq=e=>e.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g)??[],cae=e=>{let t={};for(let n of e)t[n]=(t[n]??0)+1;let r=Math.max(...Object.values(t),1),o={};for(let[n,s]of Object.entries(t))o[n]=s/r;return o},dae=e=>{let t={};for(let n of e)for(let s of new Set(oq(n)))t[s]=(t[s]??0)+1;let r=Math.max(e.length,1),o={};for(let[n,s]of Object.entries(t))o[n]=Math.log((r+1)/(s+1))+1;return o},rq=(e,t)=>{let r=cae(oq(e)),o={};for(let[n,s]of Object.entries(r))o[n]=s*(t[n]??1);return o},uae=(e,t)=>{let r=Object.entries(e),o=r.reduce((i,[a,c])=>i+c*(t[a]??0),0),n=Math.sqrt(r.reduce((i,[,a])=>i+a*a,0)),s=Math.sqrt(Object.values(t).reduce((i,a)=>i+a*a,0));return n===0||s===0?0:o/(n*s)},nq=(e,t,r)=>{let o=t.trim();if(o.length===0||e.length===0||r<=0)return[];let n=dae(e.map(i=>i.text)),s=rq(o,n);return e.map(i=>({id:i.id,score:uae(s,rq(i.text,n))})).filter(i=>i.score>0).toSorted((i,a)=>a.score-i.score).slice(0,r)}});var fC,pae,mae,iq,gae,fae,yae,hae,yC,hC=l(()=>{"use strict";fC=m(require("node:path"));lt();sq();wS();pae=5,mae=20,iq=280,gae=e=>[e.name,e.description,e.promptText].join(`
`),fae=e=>{let t=e.promptText.trim();return t.length===0?e.description.trim():t.length<=iq?t:`${t.slice(0,iq-3)}...`},yae=e=>e.length===0?"No matching folder skills under .cursor/skills for that workingDirectory.":e.map((t,r)=>`### ${r+1}. ${t.name} (${t.skillId})
Score: ${t.score.toFixed(3)}
Path: ${t.sourcePath}
`+(t.description.length>0?`Description: ${t.description}
`:"")+`
${t.excerpt}`).join(`

---

`),hae=e=>e===void 0||!Number.isFinite(e)?pae:Math.min(mae,Math.max(1,Math.floor(e))),yC=e=>{let t=e.query.trim(),r=hae(e.limit),o=uo(e.workingDirectory);if(!o.ok)return{query:t,hits:[],context:o.errorMessage};let n=vu(o.path),s=nq(n.map(d=>({id:d.fileName,text:gae(d)})),t,r),i=new Map(n.map(d=>[d.fileName,d])),a=fC.default.resolve(o.path,".cursor","skills"),c=s.flatMap(d=>{let u=i.get(d.id);return u===void 0?[]:[{skillId:u.fileName,name:u.name,description:u.description,score:d.score,sourcePath:fC.default.join(a,u.fileName,"SKILL.md"),excerpt:fae(u),source:"filesystem"}]});return{query:t,hits:c,context:yae(c)}}});var aq,lq=l(()=>{"use strict";hC();aq=e=>{if(e.method!=="POST")return{status:405,body:{ok:!1,error:"Use POST."}};let t;try{t=JSON.parse(e.rawBody.length===0?"{}":e.rawBody)}catch{return{status:400,body:{ok:!1,error:"Body must be JSON."}}}if(t===null||typeof t!="object"||Array.isArray(t))return{status:400,body:{ok:!1,error:"Body must be a JSON object."}};let r=t,o=typeof r.workingDirectory=="string"?r.workingDirectory.trim():"",n=typeof r.query=="string"?r.query:"",s=typeof r.limit=="number"?r.limit:typeof r.limit=="string"&&r.limit.trim().length>0?Number(r.limit):void 0;return o.length===0?{status:400,body:{ok:!1,error:"workingDirectory is required (folder with .cursor/skills)."}}:typeof n!="string"||n.trim().length===0?{status:400,body:{ok:!1,error:"query is required."}}:{status:200,body:yC({workingDirectory:o,query:n,limit:Number.isFinite(s)?s:void 0})}}});var cq,dq=l(()=>{"use strict";lq();cq=async e=>{let t=aq({method:e.method,rawBody:e.method==="POST"?await e.readBody(e.request):""});e.response.writeHead(t.status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),e.response.end(JSON.stringify(t.body))}});var Sae,SC,uq=l(()=>{"use strict";$G();OK();jK();DK();FK();tq();dq();Sae=(e,t)=>{if(e==="/prompt-sdlc")return"/prompt-optimizer";if(e==="/prompt-sdlc/guide")return"/prompt-optimizer/guide";if(e==="/prompt-sdlc/agent")return"/prompt-optimizer/agent";if(!e.startsWith("/prompt-sdlc"))return null;let r=new URL(t,"http://127.0.0.1");return r.pathname=e.replace(/^\/prompt-sdlc/,"/prompt-optimizer"),`${r.pathname}${r.search}`},SC=async e=>{let t=Sae(e.pathname,e.requestUrl);return t!==null?(e.response.writeHead(308,{Location:t}),e.response.end(),!0):e.pathname!=="/prompt-optimizer"&&e.pathname!=="/prompt-optimizer/guide"&&e.pathname!=="/prompt-optimizer/agent"&&e.pathname!=="/prompt-optimizer/skills/query"?!1:e.method!=="GET"&&e.method!=="POST"?(e.response.writeHead(405),e.response.end(),!0):e.pathname==="/prompt-optimizer/agent"?(await eq(e),!0):e.pathname==="/prompt-optimizer/skills/query"?(await cq(e),!0):e.pathname==="/prompt-optimizer/guide"?(e.sendHtml(e.response,await e.renderShell({title:"Prompt optimizer",activePath:"/prompt-optimizer",body:FG()})),!0):(await HK({method:e.method,requestUrl:e.requestUrl,response:e.response,storePath:e.storePath})||MK({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||NK({method:e.method,requestUrl:e.requestUrl,storePath:e.storePath,response:e.response})||await WK(e),!0)}});var pq=l(()=>{"use strict";uq();hC();Ls()});var PC,AC,bC=l(()=>{"use strict";PC="2025-03-26",AC={name:"agent-witch",version:"1.0.0"}});var Ha,IS,mq,Pae,Wu,gq=l(()=>{"use strict";bC();Ha=(e,t,r)=>({jsonrpc:"2.0",id:e??null,error:{code:t,message:r}}),IS=(e,t)=>({jsonrpc:"2.0",id:e??null,result:t}),mq=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?e:null,Pae=async(e,t,r,o)=>{let n=t?.name;if(typeof n!="string")return Ha(e,-32602,"tool name is required");let s=r.tools.find(i=>i.definition.name===n);if(s===void 0)return Ha(e,-32602,`Unknown tool: ${n}`);try{let i=await s.call(t?.arguments??{},o);return IS(e,i)}catch(i){try{r.onToolError?.(n,i)}catch{}return Ha(e,-32603,`Tool ${n} failed`)}},Wu=async(e,t,r)=>{let o=mq(e);if(o===null)return Ha(null,-32700,"Parse error");let n=o.id??null,s=o.method;return typeof s!="string"?Ha(n,-32600,"Invalid Request"):s==="initialize"?IS(n,{protocolVersion:PC,capabilities:{tools:{listChanged:!1}},serverInfo:t.serverInfo}):s==="ping"||s==="notifications/initialized"?IS(n,{}):s==="tools/list"?IS(n,{tools:t.tools.map(i=>i.definition)}):s==="tools/call"?Pae(n,mq(o.params),t,r):Ha(n,-32601,"Method not found")}});var _C,fq=l(()=>{"use strict";_C=(e,t)=>({content:[{type:"text",text:e}],...t===!0?{isError:!0}:{}})});var WS=l(()=>{"use strict";gq();fq();bC()});var Aae,dn,OS=l(()=>{"use strict";id();WS();Aae=(e,t)=>{let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] mcp tool ${e} failed: ${r}
`)},dn=e=>{let t=Xo({layout:e.layout,isDeclined:e.isDeclined});return{serverInfo:AC,tools:[{definition:gy,call:r=>_C(JSON.stringify(t(r)))}],onToolError:e.logToolError??Aae}}});var yq,bae,_ae,hq,Sq=l(()=>{"use strict";WS();OS();yq=(e,t)=>{let r=JSON.stringify(t);e.write(`Content-Length: ${Buffer.byteLength(r,"utf8")}\r
\r
${r}`)},bae=async(e,t)=>{let r=Buffer.alloc(0);for await(let o of e.stdin)for(r=Buffer.concat([r,Buffer.isBuffer(o)?o:Buffer.from(String(o),"utf8")]);;){let n=r.indexOf(`\r
\r
`);if(n<0)break;let s=r.subarray(0,n).toString("utf8"),i=/Content-Length:\s*(\d+)/i.exec(s);if(i===null){r=r.subarray(n+4);continue}let a=Number.parseInt(i[1]??"0",10),c=n+4+a;if(r.length<c)break;let d=r.subarray(n+4,c).toString("utf8");r=r.subarray(c);let u;try{u=JSON.parse(d)}catch{u=null}await t(u)}},_ae=async(e,t)=>{await bae(t,async r=>{let o=typeof r=="object"&&r!==null?r:null,n=o?.method,s=await Wu(r,e,void 0);if(typeof n=="string"&&n.startsWith("notifications/")){o?.id!==void 0&&yq(t.stdout,s);return}yq(t.stdout,s)})},hq=async e=>{await _ae(dn({layout:e.layout,isDeclined:e.isDeclined}),e.streams??{stdin:process.stdin,stdout:process.stdout})}});var kae,MS,Pq=l(()=>{"use strict";WS();OS();kae="/mcp",MS=async e=>{if(e.pathname!==kae)return!1;if(e.method!=="POST")return e.response.writeHead(405),e.response.end(),!0;let t=null;try{let o=await e.readBody(e.request);t=o.length>0?JSON.parse(o):{}}catch{t=null}let r=e.server??dn({layout:e.layout,isDeclined:e.isDeclined});return e.sendJson(e.response,200,await Wu(t,r,void 0)),!0}});var Aq={};St(Aq,{createAwlMcpServer:()=>dn,runAwlMcpStdio:()=>hq,tryHandleAwlMcpHttpRequest:()=>MS});var kC=l(()=>{"use strict";OS();Sq();Pq()});var js,Ou,wae,Tae,Eae,Rae,bq,_q=l(()=>{"use strict";js=m(require("node:fs")),Ou=m(require("node:path")),wae="prompt-optimizer-cycles.json",Tae="prompt-optimizer-preferences.json",Eae="prompt-sdlc-cycles.json",Rae="prompt-sdlc-preferences.json",bq=e=>{let t=Ou.default.join(e,wae),r=Ou.default.join(e,Eae);if(js.default.existsSync(t)||!js.default.existsSync(r))return t;try{js.default.renameSync(r,t)}catch{return r}let o=Ou.default.join(e,Rae),n=Ou.default.join(e,Tae);if(js.default.existsSync(o)&&!js.default.existsSync(n))try{js.default.renameSync(o,n)}catch{}return t}});var Fa,vae,wC,kq=l(()=>{"use strict";Fa=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vae=[{value:"claude-cli",label:"Claude CLI"},{value:"codex",label:"Codex"},{value:"cursor",label:"Cursor"},{value:"antigravity",label:"Antigravity"}],wC=e=>{let t=vae.map(i=>`<option value="${Fa(i.value)}">${Fa(i.label)}</option>`).join(""),r=e.wsConnected?'<p class="muted">Bridge is connected \u2014 cloud job history will show run status when the task finishes.</p>':'<div class="alert-error">Not connected to cloud. Link this computer on the cloud dashboard before delegating.</div>',o=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${Fa(e.flashMessage)}</div>`:"",n=e.flashError!==void 0&&e.flashError!==null&&e.flashError.length>0?`<div class="alert-error">${Fa(e.flashError)}</div>`:"",s=e.lastRunId!==void 0&&e.lastRunId!==null&&e.lastRunId.length>0?`<p class="muted mono">Last run id: ${Fa(e.lastRunId)}</p>`:"";return`${o}${n}<section class="card">
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
    </section>`}});var Mu,Eq,Cae,Rq,Lae,xae,vq,NS,wq,Tq,Iae,Wae,Po,ju,jS,Oae,DS,TC,Mae,EC,Cq,RC,Lq,jae,Nae,Dae,xq,Iq,Wq,Nu=l(()=>{"use strict";Mu=m(require("node:fs")),Eq=m(require("node:path")),Cae="estimate-history.ndjson",Rq=100,Lae=500,xae=2e4,vq=e=>Eq.default.join(e,Cae),NS=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").replace(/\s+/g," ").trim().slice(0,Lae),wq=e=>e.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,"[redacted-email]").replace(/\bsk-[a-zA-Z0-9]{20,}\b/g,"[redacted-secret]").trim().slice(0,xae),Tq=e=>typeof e=="number"&&Number.isFinite(e)&&e>=1?Math.round(e):null,Iae=e=>({...e,estimateTokens:Tq(e.estimateTokens),actualTokens:Tq(e.actualTokens),input:typeof e.input=="string"?e.input:"",output:typeof e.output=="string"?e.output:""}),Wae=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.id=="string"&&typeof t.task=="string"&&typeof t.writerLabel=="string"&&Array.isArray(t.embedding)},Po=e=>{let t=vq(e);return Mu.default.existsSync(t)?Mu.default.readFileSync(t,"utf8").split(`
`).flatMap(r=>{let o=r.trim();if(o.length===0)return[];try{let n=JSON.parse(o);return Wae(n)?[Iae(n)]:[]}catch{return[]}}):[]},ju=(e,t)=>{Mu.default.mkdirSync(e,{recursive:!0});let r=t.length===0?"":`${t.map(o=>JSON.stringify(o)).join(`
`)}
`;Mu.default.writeFileSync(vq(e),r,"utf8")},jS=e=>e.replace(/\|/g,"/").replace(/\s+/g," ").slice(0,80),Oae=e=>{let t=e.filter(o=>o.actualSeconds!==null&&o.estimateSeconds!==null&&o.task.length>0);return t.length===0?"No finished tasks with a recorded duration yet.":["Latest finished tasks on this computer. Use estimated vs actual seconds to calibrate:","| Task | Writer | Estimated seconds | Actual seconds |","| --- | --- | --- | --- |",...t.map(o=>`| ${jS(o.task)} | ${jS(o.writerLabel)} | ${o.estimateSeconds} | ${o.actualSeconds} |`)].join(`
`)},DS=e=>{let t=Po(e.reportsDir),r=NS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel,estimateSeconds:e.estimateSeconds,actualSeconds:o?.actualSeconds??null,estimateTokens:o?.estimateTokens??null,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:e.embedding!==null&&e.embedding.length>0?e.embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);ju(e.reportsDir,[...s,n])},TC=e=>{let t=Po(e.reportsDir),r=t.find(a=>a.id===e.agentRunId),o=new Date().toISOString(),n=e.task!==void 0?NS(e.task):"",s={id:e.agentRunId,task:n.length>0?n:r?.task??"",writerLabel:e.writerLabel??r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:e.actualSeconds,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:o,embedding:r?.embedding??[]},i=t.filter(a=>a.id!==e.agentRunId);ju(e.reportsDir,[...i,s])},Mae=e=>e.filter(t=>t.actualSeconds!==null&&t.estimateSeconds!==null).slice(-Rq),EC=e=>[...Po(e)].filter(t=>t.task.trim().length>0||t.input.trim().length>0||t.output.trim().length>0).reverse(),Cq=e=>{let t=Po(e.reportsDir),r=t.find(d=>d.id===e.agentRunId),o=wq(e.input),n=wq(e.output),s=NS(o),i=e.writerLabel?.trim()??"",a={id:e.agentRunId,task:s.length>0?s:r?.task??"",writerLabel:i.length>0?i:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:r?.actualTokens??null,input:o.length>0?o:r?.input??"",output:n.length>0?n:r?.output??"",startedAt:r?.startedAt??new Date().toISOString(),completedAt:r?.completedAt??new Date().toISOString(),embedding:r?.embedding??[]},c=t.filter(d=>d.id!==e.agentRunId);ju(e.reportsDir,[...c,a])},RC=(e,t)=>{let r=Po(e).find(o=>o.id===t);return r===void 0?null:{estimateSeconds:r.estimateSeconds,actualSeconds:r.actualSeconds}},Lq=e=>({table:Oae(Mae(Po(e))),embedding:null}),jae=e=>{let t=new Map;for(let o of e){if(o.actualTokens===null)continue;let n=o.writerLabel.trim()||"Writer",s=t.get(n)??[];s.push(o.actualTokens),t.set(n,s)}let r=new Set;for(let[o,n]of t){let s=[...n].sort((c,d)=>c-d),i=s[s.length-1],a=s[s.length-2];s.length>=3&&i!==void 0&&a!==void 0&&i>a*1.5&&r.add(`${o}:${i}`)}return e.filter(o=>{let n=o.writerLabel.trim()||"Writer";return!r.has(`${n}:${o.actualTokens}`)})},Nae=e=>e.filter(t=>t.estimateTokens!==null&&t.actualTokens!==null&&t.task.length>0).slice(-Rq),Dae=e=>{let t=jae(Nae(e));if(t.length===0)return"No finished tasks with a recorded token count yet.";let r=new Map;for(let s of t){if(s.actualTokens===null)continue;let i=s.writerLabel.trim()||"Writer",a=r.get(i)??[];a.push(s.actualTokens),r.set(i,a)}let o=[...r.entries()].map(([s,i])=>{let a=Math.min(...i),c=Math.max(...i);return a===c?`${s} actuals are ${a}`:`${s} actuals are ${a}\u2013${c}`});return["Actual tokens are the writer-reported total, including cache. Match the row with the closest task length, then use that row's actual:",o.join(". ")+(o.length>0?".":""),"| Task | Writer | Task chars | Actual tokens |","| --- | --- | --- | --- |",...t.map(s=>{let i=s.input.length>0?s.input.length:s.task.length;return`| ${jS(s.task)} | ${jS(s.writerLabel)} | ${i} | ${s.actualTokens} |`})].join(`
`)},xq=e=>{let t=Po(e.reportsDir),r=NS(e.task),o=t.find(i=>i.id===e.agentRunId),n={id:e.agentRunId,task:r.length>0?r:o?.task??"",writerLabel:e.writerLabel.length>0?e.writerLabel:o?.writerLabel??"",estimateSeconds:o?.estimateSeconds??null,actualSeconds:o?.actualSeconds??null,estimateTokens:e.estimateTokens,actualTokens:o?.actualTokens??null,input:o?.input??"",output:o?.output??"",startedAt:o?.startedAt??new Date().toISOString(),completedAt:o?.completedAt??null,embedding:o?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);ju(e.reportsDir,[...s,n])},Iq=e=>{let t=Po(e.reportsDir),r=t.find(i=>i.id===e.agentRunId),o=new Date().toISOString(),n={id:e.agentRunId,task:r?.task??"",writerLabel:r?.writerLabel??"",estimateSeconds:r?.estimateSeconds??null,actualSeconds:r?.actualSeconds??null,estimateTokens:r?.estimateTokens??null,actualTokens:e.actualTokens,input:r?.input??"",output:r?.output??"",startedAt:r?.startedAt??o,completedAt:r?.completedAt??o,embedding:r?.embedding??[]},s=t.filter(i=>i.id!==e.agentRunId);ju(e.reportsDir,[...s,n])},Wq=e=>Dae(Po(e))});var Oq=l(()=>{"use strict";Nu()});var Ao,vC,Hae,CC,Fae,$ae,HS,FS,zae,LC,Mq=l(()=>{"use strict";Oq();mv();Ao=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),vC=e=>{if(e<60)return`${e}s`;let t=Math.floor(e/60),r=e%60;if(t<60)return r===0?`${t} min`:`${t} min ${r}s`;let o=Math.floor(t/60),n=t%60;return n===0?`${o} hr`:`${o} hr ${n} min`},Hae=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${vC(-r)} under`:`${vC(r)} over`},CC=e=>e.toLocaleString("en-US"),Fae=(e,t)=>{let r=t-e;return r===0?"on estimate":r<0?`${CC(-r)} under`:`${CC(r)} over`},$ae=e=>{let t=e.replace(/\s+/g," ").trim();return t.length>80?`${t.slice(0,77)}\u2026`:t},HS=e=>e===null?"\u2014":vC(e),FS=e=>e===null?"\u2014":CC(e),zae=`(function () {
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
})();`,LC=e=>{let r=EC(e.reportsDir).map((n,s)=>{let i=n.input.trim().length>0?n.input:n.task,a=n.output.trim().length>0?n.output:"\u2014",c=n.writerLabel.trim().length>0?n.writerLabel:"Writer",d=n.estimateSeconds===null||n.actualSeconds===null?"no estimate":Hae(n.estimateSeconds,n.actualSeconds),u=n.estimateTokens===null||n.actualTokens===null?"no estimate":Fae(n.estimateTokens,n.actualTokens),g=`history-detail-source-${s}`;return{row:`<tr class="history-row" data-history-detail="${g}">
        <td><button type="button" class="history-open">${Ao($ae(i))}</button></td>
        <td>${Ao(c)}</td>
        <td>${HS(n.estimateSeconds)}</td>
        <td>${HS(n.actualSeconds)}</td>
        <td>${Ao(d)}</td>
        <td>${FS(n.estimateTokens)}</td>
        <td>${FS(n.actualTokens)}</td>
        <td>${Ao(u)}</td>
      </tr>`,template:`<template id="${g}">
        <p class="eyebrow">${Ao(c)}</p>
        <h2>Input</h2>
        <pre>${Ao(i)}</pre>
        <h2>Output</h2>
        <pre>${Ao(a)}</pre>
        <p>Time: estimated ${HS(n.estimateSeconds)} \xB7 actual ${HS(n.actualSeconds)} \xB7 ${Ao(d)}</p>
        <p>Tokens: estimated ${FS(n.estimateTokens)} \xB7 actual ${FS(n.actualTokens)} \xB7 ${Ao(u)}</p>
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
            ${Dh({type:"button",id:"history-detail-close"})}
          </div>
          <div class="history-dialog-body" id="history-detail-body"></div>
        </dialog>
        <script>${zae}</script>`}
    </section>`}});var jq=l(()=>{"use strict";kq();Mq()});var $a,Uae,Bae,xC,Nq=l(()=>{"use strict";$a=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Uae=(e,t,r)=>{let o=$a(t),n=$a(r);return`<article class="transcript-turn">
  <p class="eyebrow">Turn ${e+1}</p>
  <h3 class="transcript-role">User</h3>
  <pre class="transcript-body">${o}</pre>
  <h3 class="transcript-role">Assistant</h3>
  <pre class="transcript-body">${n}</pre>
</article>`},Bae=e=>{let t=e.projectFolderPath!==null?`<p class="muted mono">${$a(e.projectFolderPath)}</p>`:'<p class="muted">No project folder</p>',r=e.turns.length>0?e.turns.map((o,n)=>Uae(n,o.userPrompt,o.assistantOutput)).join(""):'<p class="muted">No turns recorded yet.</p>';return`<section class="card transcript-session">
    <p class="eyebrow">${$a(e.writerAgent)}</p>
    <h2 class="transcript-session-title">Session ${$a(e.sessionId.slice(0,8))}\u2026</h2>
    <p class="muted">Updated ${$a(e.updatedAt)}</p>
    ${t}
    ${r}
  </section>`},xC=e=>`<section class="card">
      <p class="eyebrow">Memory</p>
      <h1>Writer session transcripts</h1>
      <p class="lede">Canonical prompts and outputs from local writer runs. A separate compressed bundle on disk is used when the CLI thread is cold but you continue the conversation.</p>
    </section>
    ${e.sessions.length>0?e.sessions.map(Bae).join(""):'<section class="card"><p class="muted">No writer sessions stored on this computer yet. Delegate tasks from the cloud or run a task locally \u2014 full transcripts appear here after each finished turn.</p></section>'}`});var Dq=l(()=>{"use strict";Nq()});var Du,Hq,Fq,IC,WC,OC,$q=l(()=>{"use strict";Du=m(require("node:fs")),Hq=m(require("node:path"));Rd();oh();Fq=(e,t,r)=>ua({layout:e,projectFolderPath:t,projectId:r})?.memoryRunsFilePath??null,IC=(e,t,r)=>{let o=Fq(e,t,r);if(o===null)return[];if(!Du.default.existsSync(o))return[];let n=Du.default.readFileSync(o,"utf8").split(`
`).filter(Boolean),s=[];for(let i of n)try{s.push(JSON.parse(i))}catch{}return s},WC=e=>{let t=Fq(e.layout,e.projectFolderPath,e.projectId);if(t===null)return;let r={...e.entry,prompt:so(e.entry.prompt),output:so(e.entry.output)};Du.default.mkdirSync(Hq.default.dirname(t),{recursive:!0}),Du.default.appendFileSync(t,`${JSON.stringify(r)}
`,"utf8")},OC=(e,t=5)=>e.length===0?"":`Recent project memory:

${e.slice(-t).reverse().map((n,s)=>{let i=n.prompt.length>240?`${n.prompt.slice(0,240)}\u2026`:n.prompt,a=n.output.length>400?`${n.output.slice(0,400)}\u2026`:n.output;return`[${s+1}] Prompt: ${i}
Result: ${a}`}).join(`

`)}

---

`});var Gae,Vae,Hu,$S,MC=l(()=>{"use strict";Gae=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Vae=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Hu=e=>{let t=e.maxOutputCharsPerTurn??4e3,r=e.maxTotalChars??12e3;if(e.turns.length===0)return"";let o=[],n=0;for(let s=e.turns.length-1;s>=0;s-=1){let i=e.turns[s],a=i.userPrompt.trim().length>0?`User: ${i.userPrompt.trim()}`:null,c=Gae(i.assistantOutput),d=c.length>0?`Assistant: ${Vae(c,t)}`:null,u=[a,d].filter(g=>g!==null).join(`

`);if(u.length!==0){if(n+u.length>r&&o.length>0)break;o.unshift(u),n+=u.length}}return o.join(`

`)},$S=e=>{let t=e.userMessage.trim(),r=Hu({turns:e.priorTurns,maxOutputCharsPerTurn:e.maxOutputCharsPerTurn,maxTotalChars:e.maxTotalChars});return r.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",r,"</prior_context>","","New message:",t].join(`
`)}});var Mr,Fu,DC,Kae,qae,jC,Jae,HC,zS,zq,Uq,Yae,za,FC,NC,Bq,Xae,Gq,Ua,US,$u,Zae,zu,$C,BS,GS,Vq=l(()=>{"use strict";Mr=m(require("node:fs")),Fu=m(require("node:path")),DC=require("node:crypto");MC();Kae="writer-sessions",qae="active-index.json",jC=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Jae=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity",HC=e=>{if(e===void 0)return null;let t=e.trim();return t.length>0?t:null},zS=e=>{let t=Fu.default.join(e.installDir,Kae);return Mr.default.mkdirSync(t,{recursive:!0}),t},zq=e=>Fu.default.join(zS(e),qae),Uq=(e,t)=>Fu.default.join(zS(e),`${t}.canonical.json`),Yae=(e,t)=>Fu.default.join(zS(e),`${t}.continuation.json`),za=e=>`${e.writerAgent}\0${e.projectFolderPath??""}`,FC=e=>{let t=zq(e);if(!Mr.default.existsSync(t))return{entries:[]};try{let r=JSON.parse(Mr.default.readFileSync(t,"utf8"));if(!jC(r)||!Array.isArray(r.entries))return{entries:[]};let o=[];for(let n of r.entries){if(!jC(n)||typeof n.sessionId!="string")continue;let s=typeof n.writerAgent=="string"?n.writerAgent:"";if(!Jae(s))continue;let i=typeof n.projectFolderPath=="string"?n.projectFolderPath:(n.projectFolderPath===null,null);o.push({writerAgent:s,projectFolderPath:i,sessionId:n.sessionId})}return{entries:o}}catch{return{entries:[]}}},NC=(e,t)=>{Mr.default.writeFileSync(zq(e),JSON.stringify(t,null,2))},Bq=(e,t)=>{Mr.default.writeFileSync(Uq(e,t.sessionId),JSON.stringify(t,null,2))},Xae=(e,t)=>{Mr.default.writeFileSync(Yae(e,t.sessionId),JSON.stringify(t,null,2))},Gq=(e,t)=>{let r=Hu({turns:t.turns});Xae(e,{sessionId:t.sessionId,injectionBody:r,updatedAt:t.updatedAt})},Ua=(e,t)=>{let r=Uq(e,t);if(!Mr.default.existsSync(r))return null;try{let o=JSON.parse(Mr.default.readFileSync(r,"utf8"));return!jC(o)||typeof o.sessionId!="string"?null:o}catch{return null}},US=(e,t=20)=>{let r=zS(e),o=Mr.default.readdirSync(r,{withFileTypes:!0}).filter(s=>s.isFile()&&s.name.endsWith(".canonical.json")),n=[];for(let s of o){let i=s.name.replace(/\.canonical\.json$/,""),a=Ua(e,i);a!==null&&n.push(a)}return n.toSorted((s,i)=>i.updatedAt.localeCompare(s.updatedAt)).slice(0,t)},$u=(e,t,r)=>{let o=HC(r);return FC(e).entries.find(i=>za(i)===za({writerAgent:t,projectFolderPath:o}))?.sessionId??null},Zae=(e,t,r,o)=>{let n=FC(e),s=za({writerAgent:t,projectFolderPath:r}),i=[...n.entries.filter(a=>za(a)!==s),{writerAgent:t,projectFolderPath:r,sessionId:o}];NC(e,{entries:i})},zu=(e,t,r)=>{let o=(0,DC.randomUUID)(),n=new Date().toISOString(),s=HC(r),i={sessionId:o,writerAgent:t,projectFolderPath:s,turns:[],createdAt:n,updatedAt:n};return Bq(e,i),Gq(e,i),Zae(e,t,s,o),o},$C=(e,t,r)=>{let o=$u(e,t,r);return o!==null?o:zu(e,t,r)},BS=(e,t,r)=>{let o=HC(r),n=FC(e);if(o===null&&r===void 0){NC(e,{entries:n.entries.filter(i=>i.writerAgent!==t)});return}let s=za({writerAgent:t,projectFolderPath:o});NC(e,{entries:n.entries.filter(i=>za(i)!==s)})},GS=e=>{let t=$C(e.layout,e.writerAgent,e.projectFolderPath),r=Ua(e.layout,t);if(r===null)return;let o={id:(0,DC.randomUUID)(),...e.agentRunId!==void 0?{agentRunId:e.agentRunId}:{},userPrompt:e.userPrompt,assistantOutput:e.assistantOutput,createdAt:new Date().toISOString()},n={...r,turns:[...r.turns,o],updatedAt:o.createdAt};Bq(e.layout,n),Gq(e.layout,n)}});var Qae,ele,VS,zC,Kq=l(()=>{"use strict";Qae=(e,t)=>e==="cli_continue"?"minimal":t>3500?"full":e==="source_run_seed"||e==="transcript_seed"||t<80?"standard":"full",ele=e=>{if(e.contextBudget==="minimal")return{injectMemory:!1,memoryEntryLimit:0,ragLimit:0,ragMinScore:1};if(e.contextBudget==="standard"){let t=e.continuationStrategy==="none"&&e.userPromptCharacterCount<80;return{injectMemory:!0,memoryEntryLimit:3,ragLimit:t?2:3,ragMinScore:t?.4:.35}}return{injectMemory:!0,memoryEntryLimit:e.userPromptCharacterCount>3500?8:5,ragLimit:5,ragMinScore:.25}},VS=e=>e.sessionContinuation&&e.supportsWriterSessionContinuation&&e.isWriterConversationStarted?"continue":"first",zC=e=>{let t=VS(e),r=t==="continue"?"cli_continue":e.sessionContinuation&&e.hasSourceRunId?"source_run_seed":e.sessionContinuation&&e.hasCanonicalTurns?"transcript_seed":"none",o=Qae(r,e.userPromptCharacterCount),n=ele({contextBudget:o,continuationStrategy:r,userPromptCharacterCount:e.userPromptCharacterCount});return{sessionTurn:t,continuationStrategy:r,contextBudget:o,...n}}});var KS=l(()=>{"use strict";$q();Vq();MC();Kq()});var qq=l(()=>{"use strict";ef();Ni();ik()});var Jq=l(()=>{"use strict";O_()});var gt,rle,ole,UC,BC,GC,Yq=l(()=>{"use strict";qq();Jq();gt=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),rle=(e,t)=>{let r=e[t]?.apiKey;return r!==void 0&&r.length>0?"Saved":"Not set"},ole=(e,t,r)=>{let o=e[t]?.apiKey;if(o!==void 0&&o.length>0){let n=Rc(o);return`value="${gt(n)}" placeholder="Paste a new key to replace"`}return`placeholder="${gt(r)}"`},UC=(e,t,r,o,n)=>{let s=tf[t];return`<label class="field">
          <span class="field-label">${gt(o)} API key \u2014 ${gt(rle(e,t))} \xB7 <a class="field-link" href="${gt(s.href)}" target="_blank" rel="noopener noreferrer">${gt(s.label)}</a></span>
          <input class="input mono" type="password" name="${gt(r)}" autocomplete="off" ${ole(e,t,n)} />
        </label>`},BC=(e,t,r,o)=>{let n=Vg(e[t]?.model),s=new Set(Gg[t].map(c=>c.value)),i=Gg[t].map(c=>{let d=c.value===n?" selected":"";return`<option value="${gt(c.value)}"${d}>${gt(c.label)}</option>`}).join(""),a=n!==Yn&&!s.has(n)?`<option value="${gt(n)}" selected>${gt(n)} (saved)</option>`:"";return`<label class="field">
          <span class="field-label">${gt(o)}</span>
          <select class="input mono" name="${gt(r)}">${i}${a}</select>
        </label>`},GC=e=>{let t=e.flashMessage!==void 0&&e.flashMessage!==null&&e.flashMessage.length>0?`<div class="alert-success">${gt(e.flashMessage)}</div>`:"",r=e.writerExecutionBackend==="cli"?" checked":"",o=e.writerExecutionBackend==="api"?" checked":"";return`${t}<section class="card">
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
        ${UC(e.secrets,"anthropic","anthropicApiKey","Anthropic","sk-ant-\u2026")}
        ${BC(e.secrets,"anthropic","anthropicModel","Anthropic model")}
        ${UC(e.secrets,"openai","openaiApiKey","OpenAI","sk-\u2026")}
        ${BC(e.secrets,"openai","openaiModel","OpenAI model")}
        ${UC(e.secrets,"google","googleApiKey","Google","AI\u2026")}
        ${BC(e.secrets,"google","googleModel","Gemini model")}
        <div class="actions">
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </section>`}});var Xq=l(()=>{"use strict";Yq()});var qS,Zq,Qq=l(()=>{"use strict";qS=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Zq=e=>{let t=`${e.cloudAppOrigin.replace(/\/$/,"")}/marketplace`,r=`<a class="field-link" href="${qS(t)}" target="_blank" rel="noopener noreferrer">Browse playbooks in AgentWitch Cloud</a>`;if(e.installed.sets.length===0)return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">Nothing installed yet. Install playbooks in AgentWitch Cloud \u2014 files land in your profile harness on this computer. ${r}</p>
    </section>`;let o=e.installed.sets.map(s=>`<li class="harness-installed-set">
          <span><strong>${qS(s.name)}</strong> <span class="muted mono">(${qS(s.slug)})</span></span>
          <p class="muted">${s.itemCount} item(s)</p>
        </li>`).join(""),n=e.installed.manifestUpdatedAt!==null?`<p class="muted">Manifest updated ${qS(e.installed.manifestUpdatedAt)}</p>`:"";return`<section class="card harness-installed">
      <p class="eyebrow">Playbooks</p>
      <h2>Installed on this computer</h2>
      <p class="lede">${e.installed.sets.length} set(s) installed from AgentWitch Cloud. Link them to a repository under <a href="/projects">Projects</a>. ${r}</p>
      ${n}
      <ul class="harness-installed-set-list">${o}</ul>
    </section>`}});var nle,eJ,tJ,rJ=l(()=>{"use strict";nle=(e,t)=>e.type==="folder"&&t.type==="folder"?e.name.localeCompare(t.name):e.type==="file"&&t.type==="file"?e.item.relativePath.localeCompare(t.item.relativePath):e.type==="folder"?-1:1,eJ=e=>e.kind==="folder",tJ=e=>{let t={kind:"folder",name:"",children:new Map};for(let o of e){let n=o.relativePath.split("/"),s=t;for(let i=0;i<n.length;i+=1){let a=n[i];if(a===void 0)continue;if(i===n.length-1){s.children.set(a,o);continue}let d=s.children.get(a);if(d!==void 0&&eJ(d)){s=d;continue}let u={kind:"folder",name:a,children:new Map};s.children.set(a,u),s=u}}let r=o=>{let n=[];for(let s of o.children.values()){if(eJ(s)){n.push({type:"folder",name:s.name,children:r(s)});continue}n.push({type:"file",item:s})}return n.toSorted(nle)};return r(t)}});var oJ,VC,nJ=l(()=>{"use strict";oJ=m(require("node:path")),VC=(e,t)=>e.map(r=>{if(r.type==="folder")return`<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${t(r.name)}</span>
              </summary>
              <ul class="harness-tree">${VC(r.children,t)}</ul>
            </details>
          </li>`;let o=oJ.default.basename(r.item.relativePath);return`<li class="harness-tree-file">
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
        </li>`}).join("")});var sJ,un,sle,ile,Uu,ale,KC,iJ=l(()=>{"use strict";lh();sJ=m(require("node:path"));Qq();rJ();nJ();un=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),sle=()=>`(() => {
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

})();`,ile=()=>`(() => {
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
})();`,Uu=e=>{let t=Id({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/marketplace`,manageLabel:"Install playbooks in AgentWitch Cloud",body:"Install and update playbooks in the browser; this computer keeps a copy under your profile harness. Use Projects to link sets into a repo\u2019s .cursor tree."}),r=Zq({installed:e.installed,cloudAppOrigin:e.cloudAppOrigin}),o=e.flashError?`<div class="alert-error">${un(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${un(e.flashMessage)}</div>`:"",n=e.reveal===null||e.reveal.sets.length===0?'<p class="empty">No harness candidates yet. Choose a folder and run reveal to scan for <code>.cursor</code> rules, commands, skills, and agents.</p>':ale(e.reveal),s=e.reveal?.scanRoots[0]?.trim()??"",i=s.length>0&&e.scanFolder.trim()===s,a=!e.importSectionExpanded,c=a?`<section class="card">
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
    <script>${sle()}</script>
    <script>${ile()}</script>`;return`${t}${r}${o}${c}${d}`},ale=e=>{let t=new Map;e.sets.forEach((o,n)=>{let s=o.proposedName,i=t.get(s)??{sets:[]};t.set(s,{sets:[...i.sets,{set:o,setIndex:n}]})});let r=[...t.entries()].toSorted(([o],[n])=>o.localeCompare(n)).map(([o,n],s)=>{let i=n.sets.map(({set:a,setIndex:c})=>{let d=tJ(a.items.map(f=>({...f,relativePath:typeof f.relativePath=="string"&&f.relativePath.length>0?f.relativePath:sJ.default.relative(a.sourceRoot,f.sourcePath).replaceAll("\\","/")}))),u=VC(d,un),g=a.items.length;return`<div class="harness-set-block">
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
    </form>`},KC=(e,t)=>{let r=new Set(e.getAll("includeSet").map(i=>Number.parseInt(String(i),10)).filter(i=>Number.isFinite(i))),o=Number.parseInt(e.get("setCount")??"0",10),n=new Map;for(let[i,a]of e.entries()){let c=/^groupLabel-(\d+)$/.exec(i);if(c===null)continue;let d=Number.parseInt(c[1]??"",10),u=a.trim();Number.isFinite(d)&&u.length>0&&n.set(d,u)}let s=[];for(let i=0;i<o;i+=1){let a=e.get(`setSlug-${i}`)?.trim()??"",c=e.get(`setGroupIndex-${i}`),d=c===null?null:Number.parseInt(c,10),u=d!==null&&Number.isFinite(d)?n.get(d):void 0,g=e.get(`setName-${i}`)?.trim()??u??a,f=t.sets[i];if(f===void 0)continue;let y=a.length>0?a:f.proposedSlug,P=g.length>0?g:f.proposedName,h=r.has(i),p=f.items.map(S=>({id:S.id,kind:S.kind,title:S.title,sourcePath:S.sourcePath,include:h}));s.push({slug:y,name:P,items:p})}return s}});var aJ=l(()=>{"use strict";iJ()});var lle,qC,lJ=l(()=>{"use strict";It();lle=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/composition`,{method:"GET",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return null;let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0)return null;let n=o;return{counts:{harness:Number(n.counts?.harness??0),workflow:Number(n.counts?.workflow??0),agent:Number(n.counts?.agent??0)},items:Array.isArray(n.items)?n.items:[]}}catch{return null}},qC=lle});var cle,cJ,dJ=l(()=>{"use strict";It();cle=async(e,t)=>{try{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/knowledge/promote-all`,{method:"POST",headers:{[le]:e.pairingToken},signal:AbortSignal.timeout(15e3)});if(!r.ok)return{ok:!1,promotedCount:0};let o=await r.json();return typeof o!="object"||o===null||o.ok!==!0?{ok:!1,promotedCount:0}:{ok:!0,promotedCount:typeof o.promotedCount=="number"?o.promotedCount:0}}catch{return{ok:!1,promotedCount:0}}},cJ=cle});var uJ,dle,pJ,mJ=l(()=>{"use strict";uJ={saved:{message:"Pitfall saved.",error:null},retired:{message:"Pitfall retired. Turn on Show retired to see it again.",error:null},restored:{message:"Pitfall is active again.",error:null},invalid:{message:null,error:"Add a title, why it happens, and a fix. Keep them short, then save again."},limit:{message:null,error:"This project has 64 active pitfalls. Retire one, then try again."},missing:{message:null,error:"That pitfall is gone. Reload the page and try again."},rejected:{message:null,error:"AgentWitch Cloud did not accept this change. Check the fields and try again."},unavailable:{message:null,error:"Could not reach AgentWitch Cloud. Check this computer on Status, then try again."}},dle=e=>e!==null&&Object.prototype.hasOwnProperty.call(uJ,e)?uJ[e]:null,pJ=dle});var gJ=l(()=>{"use strict"});var Ns,ule,JC,fJ=l(()=>{"use strict";lh();Pw();Ns=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),ule=e=>`${e.harness} ${e.harness===1?"Playbook":"Playbooks"} \xB7 ${e.workflow} ${e.workflow===1?"Workflow":"Workflows"} \xB7 ${e.agent} ${e.agent===1?"Agent":"Agents"}`,JC=e=>{let t=e.flashError?`<div class="alert-error">${Ns(e.flashError)}</div>`:e.flashMessage?`<div class="alert-success">${Ns(e.flashMessage)}</div>`:"",r=Id({cloudAppOrigin:e.cloudAppOrigin,manageHref:`${e.cloudAppOrigin}/projects`,manageLabel:"Manage projects in AgentWitch Cloud",body:"Projects are created in the browser. This page chooses their folders on this computer and links playbooks into each repo\u2019s .cursor tree.",syncMessage:e.syncMessage,syncOk:e.syncOk}),o=e.projects.length===0?'<p class="empty">No projects loaded yet. Create one in AgentWitch Cloud, then refresh this page.</p>':`<ul class="project-list">${e.projects.map(n=>{let s=e.compositionCountsByProjectId?.[n.id],i=s!==void 0?`<span class="muted">${Ns(ule(s))}</span>`:"",a=`<a class="btn btn-secondary" href="/projects/select-folder?projectId=${encodeURIComponent(n.id)}">Choose folder\u2026</a>`,c=`<a class="btn btn-primary btn-compact" href="/project?id=${encodeURIComponent(n.id)}">Open project \u2192</a>`,d=`${e.cloudAppOrigin.replace(/\/$/,"")}/projects/${encodeURIComponent(n.id)}?rename=1`,u=`<a class="btn btn-secondary btn-compact" href="${Ns(d)}" target="_blank" rel="noopener noreferrer">Rename\u2026</a>`,g=Bf(n.name)?"":`<form method="POST" action="/projects/delete" class="inline-form" onsubmit="return confirm('Delete this project from AgentWitch Cloud? The folder on this computer stays.');">
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
      <p class="lede">Synced from AgentWitch Cloud for this paired computer only. Choose a folder per project, then pull playbooks into each repo\u2019s <code>.cursor</code> tree (tracked in <code>.agent-witch/materialization.json</code>).</p>
      ${o}
    </section>`}});var yJ=l(()=>{"use strict";gJ();qf();fJ()});var JS,hJ=l(()=>{"use strict";JS=e=>{let t=e?.bundleVersion?.trim();return t!==void 0&&t.length>0?t:"unknown"}});var SJ,lr,YC=l(()=>{"use strict";SJ=m(require("node:path"));At();He();G();ee();sw();lr=e=>{let t=$()?.layout.installDir??v();if(SJ.default.basename(t)===ur)return Pt;let r=$(),o=r!==null?$e(r.wsUrl):null;if(o!==null&&o.length>0)return o;let n=e?.appOrigin?.trim();return n!==void 0&&n.length>0?n.replace(/\/$/,""):Pt}});var XC,PJ=l(()=>{"use strict";Pr();YC();XC=async e=>{let t=Fe(e.installDir),r=t?.bundleVersion??null,o=lr(t);try{let n=await Li(o);return n===null?{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Could not fetch remote install bundle version."}:{updateAvailable:$n(r,n),localBundleVersion:r,remoteBundleVersion:n,checkError:null}}catch{return{updateAvailable:!1,localBundleVersion:r,remoteBundleVersion:null,checkError:"Install bundle update check failed."}}}});var ZC,AJ=l(()=>{"use strict";ZC=e=>!e});var QC,Ba,eL=l(()=>{"use strict";G();QC=()=>`http://127.0.0.1:${pi()}/update/run`,Ba=async e=>{try{let t=await fetch(QC(),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({force:e?.force===!0}),signal:AbortSignal.timeout(18e4)}),r=null;try{r=await t.json()}catch{r=null}return{ok:t.ok,reachable:!0,payload:r}}catch{return{ok:!1,reachable:!1,payload:null}}}});var ple,bJ,tL,_J=l(()=>{"use strict";G();ae();eL();ple=()=>{Br({launchAgentLabel:ye(),installDir:v()})},bJ=e=>{if(typeof e!="object"||e===null)return null;let t=e.message;return typeof t=="string"&&t.length>0?t:null},tL=async()=>{ple();let e=await Ba({force:!0});if(e.ok)return{ok:!0,message:bJ(e.payload)??"Install bundle update finished."};if(e.reachable)return{ok:!1,message:bJ(e.payload)??"Install bundle update failed."};let{runAgentWitchSelfUpdate:t}=await Promise.resolve().then(()=>(Pr(),Cj)),r=await t({force:!0});return{ok:r.ok&&(r.updated||r.ok),message:r.message}}});var rL=l(()=>{"use strict";YE();hJ();YC();PJ();AJ();_J();eL()});var kJ,wJ=l(()=>{"use strict";kJ=e=>e==="claude-cli"||e==="codex"||e==="cursor"||e==="antigravity"});var TJ,EJ,oL,nL,RJ=l(()=>{"use strict";TJ=require("node:crypto"),EJ=m(require("node:fs"));Wt();ee();ee();wJ();oL=!1,nL=async e=>{if(oL)return{ok:!1,errorMessage:"Another local task is already running."};let t=e.prompt.trim();if(t.length===0)return{ok:!1,errorMessage:"Task prompt is required."};if(!kJ(e.writerAgent))return{ok:!1,errorMessage:`Unsupported writer agent: ${e.writerAgent}`};let r=$();if(r===null)return{ok:!1,errorMessage:"AgentWitch is not configured."};let o=V({wsUrl:r.wsUrl,pairingToken:r.pairingToken});if(o===null)return{ok:!1,errorMessage:"Pairing token is missing. Re-link this computer."};let n=e.projectFolderPath!==void 0&&e.projectFolderPath.trim().length>0&&EJ.default.existsSync(e.projectFolderPath.trim())?e.projectFolderPath.trim():r.workspace,s=(0,TJ.randomUUID)();oL=!0;try{if(await iw(o,{agentRunId:s,prompt:t,writerAgent:e.writerAgent})===null)return{ok:!1,errorMessage:"Could not register the run on cloud."};let a=await Hi({...r,workspace:n},e.writerAgent,t);return await Jc(o,s,a.exitCode,a.output)?{ok:a.exitCode===0,agentRunId:s,...a.exitCode===0?{}:{errorMessage:a.output.slice(0,500)||"Task failed."}}:{ok:!1,agentRunId:s,errorMessage:"Task finished locally but cloud status was not updated."}}finally{oL=!1}}});var vJ=l(()=>{"use strict";RJ()});var Bu,sL=l(()=>{"use strict";Bu=e=>{if(typeof e!="string")return!1;let t=e.trim();return t.length===0||t.startsWith(".")||t.includes("/")||t.includes("\\")||t.includes("..")?!1:t===e}});var cr,Ee,pn,Ds,CJ,mn,Re,YS,XS,LJ,ZS,QS,eP,iL,oe=l(()=>{"use strict";cr="history",Ee="skills",pn="_drafts",Ds="_tombstones",CJ="state.json",mn="meta.json",Re="skillgen",YS="episodes.json",XS="budget.json",LJ="metrics.jsonl",ZS="SKILL.md",QS="meta.json",eP="learned-pitfalls.json",iL="flags.json"});var Hs,IJ,ft,ve,Nt=l(()=>{"use strict";Hs=m(require("node:fs")),IJ=m(require("node:path"));oe();ft=e=>{Hs.default.mkdirSync(e,{recursive:!0,mode:448});try{Hs.default.chmodSync(e,448)}catch{}},ve=(e,t)=>{ft(IJ.default.dirname(e));let r=`${e}.${process.pid}.${Date.now()}.tmp`;Hs.default.writeFileSync(r,t,{mode:384});try{Hs.default.chmodSync(r,384)}catch{}Hs.default.renameSync(r,e);try{Hs.default.chmodSync(e,384)}catch{}}});var Fs,X,ge,ne=l(()=>{"use strict";Fs=m(require("node:path"));G();sL();Nt();oe();X=e=>{if(!Bu(e))throw new Error("invalid_project_id");let t=N();return Fs.default.join(t.projectDataDir,e)},ge=e=>{let t=X(e);ft(t),ft(Fs.default.join(t,cr));let r=Fs.default.join(t,Ee);return ft(r),ft(Fs.default.join(r,pn)),ft(Fs.default.join(r,Ds)),ft(Fs.default.join(t,Re)),t}});var aL,lL,tP=l(()=>{"use strict";aL=/^[a-z0-9][a-z0-9_-]{0,63}$/,lL="sha256:"});var WJ,ot,Gu=l(()=>{"use strict";WJ=require("node:crypto");tP();ot=e=>`${lL}${(0,WJ.createHash)("sha256").update(Buffer.from(e,"utf8")).digest("hex")}`});var $s,Vu=l(()=>{"use strict";tP();$s=e=>aL.test(e)});var Ku,rP=l(()=>{"use strict";Ku=e=>e.onPublishedSet?e.localContentHash===e.expectedHash?"skip":"fetch_write":"remove"});var cL,dL=l(()=>{"use strict";cL=async e=>{try{return await e.port.isHistoryEnabled(e.projectId)===!0}catch{return!1}}});var uL,pL=l(()=>{"use strict";Vu();uL=async e=>{try{return(await e.port.listProjectSkillIds({projectId:e.projectId})).filter(r=>$s(r.skillId))}catch{return[]}}});var mL,gL=l(()=>{"use strict";mL=async e=>{try{let t=await e.awc.listPublished(e.projectId);return Array.isArray(t)?{ok:!0,published:t}:{ok:!1}}catch{return{ok:!1}}}});var fL,yL=l(()=>{"use strict";Gu();fL=async e=>{try{let t=await e.port.readProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version});return t===null?null:ot(t.body)===t.contentHash?t:null}catch{return null}}});var hL,SL=l(()=>{"use strict";Gu();Vu();hL=async e=>{if(!$s(e.skillId))return{ok:!1,code:"unavailable"};let t=ot(e.body);try{let r=await e.port.writeProjectSkillVersion({projectId:e.projectId,skillId:e.skillId,version:e.version,body:e.body});return r.contentHash===t?{ok:!0,path:r.path,contentHash:r.contentHash}:{ok:!1,code:"hash_mismatch"}}catch{return{ok:!1,code:"unavailable"}}}});var PL,AL=l(()=>{"use strict";Vu();PL=async e=>{if(!$s(e.skillId))throw new Error("invalid_project_skill_id");return e.port.tombstoneProjectSkill({projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}})}});var bL,_L=l(()=>{"use strict";Gu();rP();yL();SL();bL=async e=>{let{meta:t,projectId:r}=e,o={skillId:t.skillId,version:t.publishedVersion},n=await fL({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion});if(Ku({onPublishedSet:!0,expectedHash:t.contentHash,localContentHash:n?.contentHash??null})==="skip")return{...o,action:"skipped"};let i=await e.awc.getPublishedBody({projectId:r,skillId:t.skillId,version:t.publishedVersion,skillRowId:t.skillRowId});if(i===null)return{...o,action:"missing_awc"};if(i.contentHash!==t.contentHash||ot(i.body)!==t.contentHash)return{...o,action:"hash_mismatch"};let a=await hL({port:e.port,projectId:r,skillId:t.skillId,version:t.publishedVersion,body:i.body});return a.ok?a.contentHash===t.contentHash?{...o,action:"mirrored"}:{...o,action:"hash_mismatch"}:{...o,action:a.code==="hash_mismatch"?"hash_mismatch":"unavailable"}}});var kL,wL=l(()=>{"use strict";rP();AL();kL=async e=>Ku({onPublishedSet:!1})!=="remove"?{skillId:e.skillId,version:0,action:"unavailable"}:(await PL({port:e.port,projectId:e.projectId,skillId:e.skillId,lastContentHash:e.lastContentHash,...e.revokedAt!==void 0?{revokedAt:e.revokedAt}:{}}),{skillId:e.skillId,version:0,action:"removed"})});var qu,oP,OJ=l(()=>{"use strict";dL();pL();gL();_L();wL();qu="[project-skill-pull-mirror]",oP=async e=>{let t=e.deps.history,r=e.deps.awcPublished;try{if(!await cL({port:t,projectId:e.projectId}))return{ok:!0,skipped:!0,skills:[]};let n=await mL({awc:r,projectId:e.projectId});if(!n.ok)return console.warn(qu,"list_failed",e.projectId),{ok:!1,skipped:!1,skills:[]};let s=new Set(n.published.map(d=>d.skillId)),i=[];for(let d of n.published)try{i.push(await bL({projectId:e.projectId,meta:d,port:t,awc:r}))}catch(u){console.warn(qu,"skill_failed",d.skillId,u),i.push({skillId:d.skillId,version:d.publishedVersion,action:"unavailable"})}let a=await uL({port:t,projectId:e.projectId});for(let d of a)if(!s.has(d.skillId))try{i.push(await kL({projectId:e.projectId,skillId:d.skillId,lastContentHash:d.contentHash,port:t}))}catch(u){console.warn(qu,"orphan_tombstone_failed",d.skillId,u),i.push({skillId:d.skillId,version:0,action:"unavailable"})}let c=i.some(d=>d.action==="unavailable"||d.action==="hash_mismatch"||d.action==="missing_awc");return c&&console.warn(qu,"partial_failure",e.projectId,i),{ok:!c,skipped:!1,skills:i}}catch(o){return console.warn(qu,"tick_failed",e.projectId,o),{ok:!1,skipped:!1,skills:[]}}}});var zs=l(()=>{"use strict";tP();Gu();Vu();rP();dL();pL();gL();yL();SL();AL();_L();wL();OJ()});var Us,Ju,mle,gle,EL,RL=l(()=>{"use strict";Us=m(require("node:fs")),Ju=m(require("node:path"));Nt();zs();oe();ne();mle=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),gle=e=>`v${String(e).padStart(4,"0")}.md`,EL=e=>{if(!mle(e.skillId))throw new Error("invalid_project_skill_id");if(!Number.isInteger(e.version)||e.version<1)throw new Error("invalid_project_skill_version");let t=ge(e.projectId),r=Ju.default.join(t,Ee,e.skillId),o=Ju.default.join(r,gle(e.version)),n=Ju.default.join(r,mn),s=ot(e.body);if(Us.default.existsSync(o)&&Us.default.existsSync(n))try{let a=JSON.parse(Us.default.readFileSync(n,"utf8"));if(a.version===e.version&&a.contentHash===s&&Us.default.readFileSync(o,"utf8")===e.body)return{path:o,contentHash:s}}catch{}ve(o,e.body),ve(n,`${JSON.stringify({skillId:e.skillId,version:e.version,contentHash:s,updatedAt:new Date().toISOString()})}
`);let i=Ju.default.join(t,Ee,Ds,`${e.skillId}.json`);return Us.default.existsSync(i)&&Us.default.unlinkSync(i),{path:o,contentHash:s}}});var Yu,nP,vL,CL=l(()=>{"use strict";Yu=m(require("node:fs")),nP=m(require("node:path"));zs();oe();ne();vL=e=>{if(e.skillId.length===0||e.skillId.startsWith("_")||e.skillId.includes("/")||e.skillId.includes("\\"))return null;let t;try{t=X(e.projectId)}catch{return null}let r=nP.default.join(t,Ee,e.skillId),o=nP.default.join(r,`v${String(e.version).padStart(4,"0")}.md`),n=nP.default.join(r,mn);if(!Yu.default.existsSync(o)||!Yu.default.existsSync(n))return null;try{let s=Yu.default.readFileSync(o,"utf8"),i=JSON.parse(Yu.default.readFileSync(n,"utf8")),a=typeof i.contentHash=="string"?i.contentHash:null;return a===null||i.version!==e.version||ot(s)!==a?null:{body:s,contentHash:a}}catch{return null}}});var bo,gn,MJ,fle,LL,xL,IL=l(()=>{"use strict";bo=m(require("node:fs")),gn=m(require("node:path"));Nt();oe();ne();MJ=e=>e.length>0&&!e.startsWith("_")&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),fle=(e,t)=>{if(!bo.default.existsSync(e))return;let r=`.${t}.`;for(let o of bo.default.readdirSync(e)){if(!o.startsWith(r))continue;let n=gn.default.join(e,o);try{bo.default.rmSync(n,{recursive:!0,force:!0})}catch{}}},LL=e=>{if(!MJ(e.skillId))throw new Error("invalid_project_skill_id");let t=ge(e.projectId),r=gn.default.join(t,Ee),o=gn.default.join(r,e.skillId),n=!1;if(bo.default.existsSync(o)){let c=gn.default.join(r,`.${e.skillId}.${process.pid}.${Date.now()}`);try{bo.default.renameSync(o,c),bo.default.rmSync(c,{recursive:!0,force:!0}),n=!0}catch{}}fle(r,e.skillId);let s=gn.default.join(r,Ds);ft(s);let i=gn.default.join(s,`${e.skillId}.json`),a={skillId:e.skillId,revokedAt:e.revokedAt??new Date().toISOString(),lastContentHash:e.lastContentHash};return ve(i,`${JSON.stringify(a)}
`),{removed:n}},xL=e=>{if(!MJ(e.skillId))return null;let t;try{t=X(e.projectId)}catch{return null}let r=gn.default.join(t,Ee,Ds,`${e.skillId}.json`);if(!bo.default.existsSync(r))return null;try{let o=JSON.parse(bo.default.readFileSync(r,"utf8"));if(typeof o!="object"||o===null||typeof o.skillId!="string"||typeof o.revokedAt!="string"||typeof o.lastContentHash!="string")return null;let n=o;return{skillId:n.skillId,revokedAt:n.revokedAt,lastContentHash:n.lastContentHash}}catch{return null}}});var Xu,WL,OL,ML=l(()=>{"use strict";Xu=m(require("node:fs")),WL=m(require("node:path"));oe();ne();OL=e=>{let t;try{t=X(e.projectId)}catch{return[]}let r=WL.default.join(t,Ee);if(!Xu.default.existsSync(r))return[];let o=[];for(let n of Xu.default.readdirSync(r)){if(n.startsWith("_")||n.startsWith("."))continue;let s=WL.default.join(r,n,mn);if(Xu.default.existsSync(s))try{let i=JSON.parse(Xu.default.readFileSync(s,"utf8"));if(typeof i.contentHash!="string")continue;o.push({skillId:n,contentHash:i.contentHash})}catch{continue}}return o}});var jL,jJ,NL,DL=l(()=>{"use strict";jL=m(require("node:fs")),jJ=m(require("node:path"));Nt();oe();ne();NL=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))throw new Error("invalid_message_id");let r=ge(e.projectId),o=jJ.default.join(r,cr,`${t}.json`);if(jL.default.existsSync(o))try{let s=JSON.parse(jL.default.readFileSync(o,"utf8"));if(s.messageId===t)return s}catch{}let n={messageId:t,projectId:e.projectId,message:e.message,savedAt:new Date().toISOString()};return ve(o,`${JSON.stringify(n)}
`),n}});var Zu,NJ,DJ,Va,sP,HL,Ka=l(()=>{"use strict";Zu=m(require("node:fs")),NJ=m(require("node:path"));Nt();oe();ne();G();DJ=e=>NJ.default.join(X(e),cr,CJ),Va=e=>{try{let t=DJ(e);if(!Zu.default.existsSync(t))return null;let r=JSON.parse(Zu.default.readFileSync(t,"utf8"));if(typeof r!="object"||r===null||typeof r.state!="string"||typeof r.updatedAt!="string")return null;let o=r.state;return o!=="on_ready"&&o!=="degraded"&&o!=="on_configuring"&&o!=="off"?null:{state:o,updatedAt:r.updatedAt}}catch{return null}},sP=e=>{ge(e.projectId);let t={state:e.state,updatedAt:new Date().toISOString()};return ve(DJ(e.projectId),`${JSON.stringify(t)}
`),t},HL=()=>{let t=N().projectDataDir;if(!Zu.default.existsSync(t))return[];let r=[];for(let o of Zu.default.readdirSync(t)){if(!Bu(o))continue;let n=Va(o);n!==null&&(n.state==="on_ready"||n.state==="degraded")&&r.push(o)}return r}});var HJ,FJ=l(()=>{"use strict";It();HJ=async e=>{let t=await fetch(`${e.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(e.projectId)}/computer-history/acks`,{method:"POST",headers:{[le]:e.cloudApi.pairingToken,"Content-Type":"application/json"},body:JSON.stringify({messageId:e.messageId}),signal:AbortSignal.timeout(3e4)});return{ok:t.ok,status:t.status}}});var Qu,$J,yle,FL,zJ=l(()=>{"use strict";Xr();ee();Ka();FJ();DL();Qu="[project-history-dispatch]",$J=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),yle=()=>{let e=$();return e===null?null:V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})},FL=async e=>{if(!$J(e.payload))return{ok:!1,reason:"invalid_payload"};let t=typeof e.payload.projectId=="string"?e.payload.projectId.trim():"",r=e.payload.message;if(t.length===0||!$J(r))return{ok:!1,reason:"invalid_payload"};let o=typeof r.messageId=="string"?r.messageId.trim():"";if(o.length===0)return{ok:!1,reason:"missing_message_id"};try{NL({projectId:t,messageId:o,message:r}),sP({projectId:t,state:"on_ready"})}catch(s){console.error(Qu,"write_failed",t,o,s);try{sP({projectId:t,state:"degraded"})}catch(i){console.error(Qu,"degraded_mark_failed",t,i)}return{ok:!1,reason:"write_failed"}}let n=e.cloudApi===void 0?yle():e.cloudApi;if(n===null)return console.error(Qu,"ack_skipped_no_cloud_api",t,o),{ok:!0,messageId:o,acked:!1};try{let s=await HJ({cloudApi:n,projectId:t,messageId:o});return s.ok?{ok:!0,messageId:o,acked:!0}:(console.error(Qu,"ack_http_failed",t,o,s.status),{ok:!0,messageId:o,acked:!1})}catch(s){return console.error(Qu,"ack_failed",t,o,s),{ok:!0,messageId:o,acked:!1}}}});var nt=l(()=>{"use strict"});var $L,zL=l(()=>{"use strict";ML();Ka();CL();ne();IL();RL();$L=()=>({isHistoryEnabled:e=>{let t=Va(e);return t?.state==="on_ready"||t?.state==="degraded"},resolveProjectDataDir:e=>X(e),writeProjectSkillVersion:e=>EL(e),readProjectSkillVersion:e=>vL(e),tombstoneProjectSkill:e=>LL(e),readProjectSkillTombstone:e=>xL(e),listProjectSkillIds:e=>OL(e)})});var UJ,UL,BL=l(()=>{"use strict";It();UJ=e=>({[le]:e,Accept:"application/json"}),UL=e=>({listPublished:async t=>{let r=await fetch(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t)}/skills/published`,{method:"GET",headers:UJ(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(!r.ok)throw new Error(`listPublished http ${r.status}`);let o=await r.json();if(typeof o!="object"||o===null||o.ok!==!0||!Array.isArray(o.skills))throw new Error("listPublished malformed body");return o.skills.map((s,i)=>{if(typeof s!="object"||s===null||typeof s.skillId!="string"||typeof s.publishedVersion!="number"||typeof s.contentHash!="string")throw new Error(`listPublished row ${i} missing version/contentHash`);let a=s;return{skillId:a.skillId,publishedVersion:a.publishedVersion,contentHash:a.contentHash,...typeof a.skillRowId=="string"?{skillRowId:a.skillRowId}:{}}})},getPublishedBody:async t=>{let r=new URL(`${e.appOrigin}/api/agent-witch/projects/${encodeURIComponent(t.projectId)}/skills/published/${encodeURIComponent(t.skillId)}`);r.searchParams.set("version",String(t.version));let o=await fetch(r.toString(),{method:"GET",headers:UJ(e.pairingToken),signal:AbortSignal.timeout(3e4)});if(o.status===404)return null;if(!o.ok)throw new Error(`getPublishedBody http ${o.status}`);let n=await o.json();if(typeof n!="object"||n===null||n.ok!==!0||typeof n.body!="string"||typeof n.contentHash!="string")throw new Error("getPublishedBody malformed body");return{body:n.body,contentHash:n.contentHash}}})});var GL,VL=l(()=>{"use strict";nt();GL=e=>{let t=e.runCap??3e4,r=e.dayCap??1e5,o=Math.max(0,e.tokensUsedToday),n=Math.max(0,r-o),s=Math.max(0,e.estimatedRunTokens??0);return n<=0?{ok:!1,reason:"day_cap",remainingToday:0}:s>t?{ok:!1,reason:"run_cap",remainingToday:n}:s>n?{ok:!1,reason:"day_cap",remainingToday:n}:{ok:!0,remainingToday:n,runCap:Math.min(t,n)}}});var KL,qL=l(()=>{"use strict";nt();KL=e=>{let t=e.messageCountCap??20,r=e.idleMs??18e5,o=e.maxIntervalMs??864e5,n=e.messages;if(n.length===0)return{ready:!1,reason:"empty"};let s=Math.max(...n.map(u=>u.createdAtMs)),i=n.length>=t,a=e.nowMs-s>=r,c=e.lastClosedAtMs===null||e.nowMs-e.lastClosedAtMs>=o;return!i&&!a&&!c?{ready:!1,reason:"below_triggers"}:{ready:!0,reason:i?"count":a?"idle":"max_interval",messageIds:n.map(u=>u.messageId)}}});var iP,JL=l(()=>{"use strict";nt();iP=e=>{let t=e.maxOpenDrafts??20,r=Math.max(0,e.openDraftCount),o=r>=t;return{draftWaitingCount:r,capReached:o,miningPaused:o}}});var YJ,XJ,Sle,aP,YL=l(()=>{"use strict";nt();YJ=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""),XJ=e=>e.trim().toLowerCase().replace(/\s+/g," "),Sle=(e,t)=>{let r=new Set(e.map(XJ).filter(i=>i.length>0)),o=new Set(t.map(XJ).filter(i=>i.length>0));if(r.size===0||o.size===0)return 0;let n=0;for(let i of r)o.has(i)&&(n+=1);let s=r.size+o.size-n;return s===0?0:n/s},aP=e=>{let t=e.nearDupJaccard??.6,r=YJ(e.name);for(let o of e.existingPublished)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"published",matchId:o.id};for(let o of e.existingDrafts)if(o.contentHash===e.contentHash)return{action:"skip_exact",matchKind:"draft",matchId:o.id};for(let o of e.existingDrafts){if(YJ(o.name)===r&&r.length>0)return{action:"update_draft",draftId:o.id,reason:"same_name"};if(Sle(e.stepLines,o.stepLines)>=t)return{action:"update_draft",draftId:o.id,reason:"similar_steps"}}return{action:"create_new"}}});var XL,ZL=l(()=>{"use strict";XL=e=>e.estimatedInputTokens>e.inputTokenCap?"reflect_then_write":"write"});var QL,Ale,ex,ble,tx,rx=l(()=>{"use strict";nt();QL=e=>{let t=e.minMessages??3,r=Math.max(0,e.messageCount);return e.ownerMarkedSaveAsSkill?r<1?{ok:!1,reason:"too_short"}:{ok:!0,reason:"owner_mark"}:r<t?{ok:!1,reason:"too_short"}:e.hasSuccessSignal?{ok:!0,reason:"success_signal"}:{ok:!1,reason:"no_success_signal"}},Ale=/\b(done|landed|tests?\s+green|thumbs?\s*-?\s*up|all\s+tests?\s+pass(?:ed)?|shipped)\b/i,ex=e=>Ale.test(e),ble=/\b(save\s+as\s+skill|mark\s+as\s+skill|promote\s+to\s+skill)\b/i,tx=e=>ble.test(e)});var ep,lP=l(()=>{"use strict";ep=e=>({at:e.nowIso??new Date().toISOString(),projectId:e.projectId,episodeId:e.episodeId,fromState:e.fromState,toState:e.toState,reason:e.reason??null,tokensUsed:Math.max(0,e.tokensUsed??0),openDraftCount:Math.max(0,e.openDraftCount??0)})});var _le,ZJ,qa,QJ,tp=l(()=>{"use strict";_le=[{pattern:/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g,replacement:"[redacted-private-key]"},{pattern:/\bsk-[a-zA-Z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g,replacement:"[redacted-secret]"},{pattern:/\bAKIA[0-9A-Z]{16}\b/g,replacement:"[redacted-secret]"},{pattern:/\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/gi,replacement:"Bearer [redacted-secret]"},{pattern:/\b(?:api[_-]?key|secret|token|password|passwd|credential)\s*[:=]\s*["']?[^\s"'\\]{8,}["']?/gi,replacement:"[redacted-secret]"},{pattern:/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,replacement:"[redacted-email]"}],ZJ=[/-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/,/\bsk-[a-zA-Z0-9]{20,}\b/,/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/,/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,/\bAKIA[0-9A-Z]{16}\b/,/\bBearer\s+[A-Za-z0-9\-._~+/]{12,}/i],qa=e=>{let t=e,r=0;for(let n of _le)t=t.replace(n.pattern,()=>(r+=1,n.replacement));let o=ZJ.some(n=>n.test(t));return{scrubbed:t,residualSecret:o,replacementCount:r}},QJ=e=>ZJ.some(t=>t.test(e))});var ox,nx,sx,rp=l(()=>{"use strict";ox=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE","AWAITING_REVIEW","PUBLISHED","SKIPPED_COST","SKIPPED_FILTER","SKIPPED_DEDUP","QUARANTINED","FAILED_EXTRACT","FAILED_VALIDATE","REJECTED"],nx={CAPTURING:{episode_closed:"EPISODE_READY"},EPISODE_READY:{budget_ok:"SCRUBBING",budget_exceeded:"SKIPPED_COST",draft_cap_reached:"EPISODE_READY"},SCRUBBING:{scrub_ok:"TRIAGE",scrub_quarantine:"QUARANTINED"},TRIAGE:{qualify_ok:"DEDUP",qualify_reject:"SKIPPED_FILTER"},DEDUP:{dedup_novel:"EXTRACT",dedup_merge:"EXTRACT",dedup_skip:"SKIPPED_DEDUP"},EXTRACT:{extract_ok:"VALIDATE",extract_fail:"FAILED_EXTRACT"},VALIDATE:{validate_ok:"AWAITING_REVIEW",validate_retry:"EXTRACT",validate_fail:"FAILED_VALIDATE"},AWAITING_REVIEW:{owner_publish:"PUBLISHED",owner_discard:"REJECTED"},PUBLISHED:{},SKIPPED_COST:{},SKIPPED_FILTER:{},SKIPPED_DEDUP:{},QUARANTINED:{},FAILED_EXTRACT:{},FAILED_VALIDATE:{},REJECTED:{}},sx=["CAPTURING","EPISODE_READY","SCRUBBING","TRIAGE","DEDUP","EXTRACT","VALIDATE"]});var ix,ax=l(()=>{"use strict";rp();ix=(e,t)=>{let r=nx[e][t];return r===void 0?{ok:!1,from:e,event:t}:{ok:!0,state:r}}});var kle,jr,cx=l(()=>{"use strict";ax();nt();kle=(e,t)=>{switch(t.kind){case"close":return e==="CAPTURING"&&t.ready?"episode_closed":null;case"draft_cap":return e==="EPISODE_READY"&&t.reached?"draft_cap_reached":null;case"budget":return e!=="EPISODE_READY"?null:t.ok?"budget_ok":"budget_exceeded";case"scrub":return e!=="SCRUBBING"?null:t.residualSecret?"scrub_quarantine":"scrub_ok";case"qualify":return e!=="TRIAGE"?null:t.ok?"qualify_ok":"qualify_reject";case"dedup":return e!=="DEDUP"?null:t.action==="skip_exact"?"dedup_skip":t.action==="update_draft"||t.action==="create_new"?t.action==="update_draft"?"dedup_merge":"dedup_novel":null;case"extract":return e!=="EXTRACT"?null:t.ok?"extract_ok":"extract_fail";case"validate":return e!=="VALIDATE"?null:t.ok?"validate_ok":t.attempts<=1?"validate_retry":"validate_fail";case"owner":return e!=="AWAITING_REVIEW"?null:t.decision==="publish"?"owner_publish":"owner_discard";default:return t}},jr=e=>{let t=kle(e.state,e.verdict);if(t===null)return{ok:!1,reason:e.verdict.kind==="close"&&!e.verdict.ready?"not_ready":"no_transition",state:e.state};let r=ix(e.state,t);return r.ok?{ok:!0,event:t,nextState:r.state}:{ok:!1,reason:"illegal_event",state:e.state,event:t}}});var Ele,e4,Rle,vle,dx,op,cP=l(()=>{"use strict";nt();tp();Ele=/^[a-z0-9][a-z0-9-]{0,63}$/,e4=e=>{let t=e.replace(/^\uFEFF/,"");if(!t.startsWith("---"))return null;let r=t.indexOf(`
---`,3);if(r<0)return null;let o=t.slice(3,r).replace(/^\r?\n/,""),n=t.slice(r+4).replace(/^\r?\n/,""),s={};for(let i of o.split(/\r?\n/)){let a=i.indexOf(":");if(a<=0)continue;let c=i.slice(0,a).trim(),d=i.slice(a+1).trim().replace(/^["']|["']$/g,"");c.length>0&&(s[c]=d)}return{fm:s,body:n}},Rle=e=>(e.match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??e).match(/^\s*(?:\d+\.|[-*])\s+\S+/gm)?.length??0,vle=e=>{if(e===void 0||e.trim().length===0)return null;let t=e.trim();if(t.startsWith("["))try{let r=JSON.parse(t.replace(/'/g,'"'));return Array.isArray(r)?r.filter(o=>typeof o=="string"):null}catch{return t.replace(/^\[|\]$/g,"").split(",").map(r=>r.trim().replace(/^["']|["']$/g,"")).filter(r=>r.length>0)}return t.split(",").map(r=>r.trim()).filter(r=>r.length>0)},dx=e=>{let t=e.minSteps??2,r=e.maxBodyBytes??65536,o=e.skillMarkdown;if(o.trim().length===0)return{ok:!1,reason:"empty"};let n=Buffer.byteLength(o,"utf8");if(n>r)return{ok:!1,reason:"body_too_large"};if(QJ(o))return{ok:!1,reason:"residual_secret"};let s=e4(o);if(s===null)return{ok:!1,reason:"missing_frontmatter"};let{fm:i,body:a}=s,c=i.name??"";if(!Ele.test(c))return{ok:!1,reason:"invalid_name"};let d=i.description??"";if(d.trim().length===0)return{ok:!1,reason:"missing_description"};let u=i.version??"";if(u.trim().length===0)return{ok:!1,reason:"missing_version"};if((i.status??"").trim()!=="draft")return{ok:!1,reason:"missing_status_draft"};let g=vle(i.source_message_ids??i.source_message_ids);if(g===null||g.length===0)return{ok:!1,reason:"missing_source_message_ids"};let f=Rle(a);return f<t?{ok:!1,reason:"too_few_steps"}:{ok:!0,name:c,description:d,version:u,sourceMessageIds:g,stepCount:f,bodyBytes:n}},op=e=>(((e4(e)?.body??e).match(/(?:^|\n)##?\s*Steps?\s*\n([\s\S]*?)(?=\n##?\s+\S|$)/i)?.[1]??"").match(/^\s*(?:\d+\.|[-*])\s+(.+)$/gm)??[]).map(i=>i.replace(/^\s*(?:\d+\.|[-*])\s+/,"").trim())});var t4,Lle,Nr,dP,uP=l(()=>{"use strict";t4=require("node:crypto");zs();nt();VL();qL();JL();YL();ZL();rx();lP();tp();cx();cP();Lle=e=>Math.ceil(e.length/4),Nr=(e,t,r,o={})=>({...e,...o,state:t,reason:r}),dP=async e=>{let t=e.episode,r=[],o=null,n=0,s=null,i=e.deps.estimateTokens??Lle,a=e.messages.map(u=>u.text).join(`
`),c=(u,g,f)=>{r.push(ep({projectId:t.projectId,episodeId:t.episodeId,fromState:u,toState:g,reason:f,tokensUsed:n,openDraftCount:e.deps.openDraftCount(),nowIso:new Date(e.nowMs).toISOString()}))};for(let u=0;u<16;u+=1){let g=iP({openDraftCount:e.deps.openDraftCount()});if(t.state==="CAPTURING"){let f=KL({messages:e.messages.map(h=>({messageId:h.messageId,createdAtMs:h.createdAtMs})),nowMs:e.nowMs,lastClosedAtMs:e.lastClosedAtMs}),y=jr({state:t.state,verdict:{kind:"close",ready:f.ready}});if(!y.ok)break;let P=t.state;t=Nr(t,y.nextState,f.ready?f.reason:null,{messageIds:f.ready?f.messageIds:t.messageIds,closedAtMs:f.ready?e.nowMs:t.closedAtMs,ownerMarkedSaveAsSkill:e.messages.some(h=>tx(h.text)),hasSuccessSignal:e.messages.some(h=>ex(h.text))}),c(P,t.state,t.reason);continue}if(t.state==="EPISODE_READY"){if(g.capReached){let h=jr({state:t.state,verdict:{kind:"draft_cap",reached:!0}});h.ok&&(c(t.state,h.nextState,"draft_cap_reached"),t=Nr(t,h.nextState,"draft_cap_reached"));break}let f=GL({tokensUsedToday:e.tokensUsedToday+n}),y=jr({state:t.state,verdict:{kind:"budget",ok:f.ok}});if(!y.ok)break;let P=t.state;t=Nr(t,y.nextState,f.ok?"budget_ok":f.reason),c(P,t.state,t.reason);continue}if(t.state==="SCRUBBING"){let f=qa(a),y=jr({state:t.state,verdict:{kind:"scrub",residualSecret:f.residualSecret}});if(!y.ok)break;let P=t.state;t=Nr(t,y.nextState,f.residualSecret?"scrub_quarantine":"scrub_ok",{scrubbedTranscript:f.scrubbed}),c(P,t.state,t.reason);continue}if(t.state==="TRIAGE"){let f=QL({messageCount:t.messageIds.length,ownerMarkedSaveAsSkill:t.ownerMarkedSaveAsSkill,hasSuccessSignal:t.hasSuccessSignal}),y=jr({state:t.state,verdict:{kind:"qualify",ok:f.ok}});if(!y.ok)break;let P=t.state;t=Nr(t,y.nextState,f.reason),c(P,t.state,t.reason);continue}if(t.state==="DEDUP"){let f=ot(t.scrubbedTranscript??a),y=aP({contentHash:f,name:"",stepLines:[],existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if((y.action==="create_new"||y.action==="update_draft")&&e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let P=jr({state:t.state,verdict:{kind:"dedup",action:y.action}});if(!P.ok)break;let h=t.state;t=Nr(t,P.nextState,y.action,{contentHash:f,mergeDraftId:y.action==="update_draft"?y.draftId:t.mergeDraftId}),c(h,t.state,t.reason);continue}if(t.state==="EXTRACT"){if(e.deps.ownerLlm===null){c(t.state,t.state,"owner_llm_unconfigured");break}let f=t.scrubbedTranscript??"",y=XL({estimatedInputTokens:i(f),inputTokenCap:12e3}),P=await e.deps.ownerLlm({scrubbedTranscript:f,similarDraftHints:[],mode:y});n+=P.tokensUsed;let h=jr({state:t.state,verdict:{kind:"extract",ok:P.ok}});if(!h.ok)break;let p=t.state;P.ok&&(s=P.skillMarkdown),t=Nr(t,h.nextState,P.ok?"extract_ok":P.reason,{tokensUsed:t.tokensUsed+P.tokensUsed}),c(p,t.state,t.reason);continue}if(t.state==="VALIDATE"){let f=s??"",y=dx({skillMarkdown:f}),P=t.validateAttempts+(y.ok?0:1),h=jr({state:t.state,verdict:{kind:"validate",ok:y.ok,attempts:y.ok?t.validateAttempts:Math.max(1,P)}});if(!h.ok)break;let p=t.state;if(y.ok){let S=ot(f),b=op(f),k=aP({contentHash:S,name:y.name,stepLines:b,existingDrafts:e.deps.listDraftFingerprints(),existingPublished:e.deps.listPublishedFingerprints()});if(k.action==="skip_exact"){t=Nr(t,"SKIPPED_DEDUP","skip_exact",{contentHash:S,validateAttempts:P}),c(p,t.state,"skip_exact");break}let A=k.action==="update_draft"?k.draftId:t.mergeDraftId??(0,t4.randomUUID)();o=e.deps.writeDraft({projectId:t.projectId,draftId:A,skillMarkdown:f,episodeId:t.episodeId,sourceMessageIds:y.sourceMessageIds,name:y.name,description:y.description}),t=Nr(t,h.nextState,"validate_ok",{draftId:A,contentHash:o.contentHash,validateAttempts:P}),c(p,t.state,t.reason);break}if(h.nextState==="EXTRACT"&&(s=null),t=Nr(t,h.nextState,y.reason,{validateAttempts:P}),c(p,t.state,t.reason),h.nextState==="EXTRACT"&&P>1)break;continue}break}let d=iP({openDraftCount:e.deps.openDraftCount()});return{episode:t,metrics:r,reviewFlag:d,draftWritten:o,tokensSpent:n}}});var ux,px,np,pP=l(()=>{"use strict";ux=m(require("node:fs")),px=m(require("node:path"));Nt();oe();ne();np=e=>{if(e.events.length===0)return;let t=ge(e.projectId),r=px.default.join(t,Re);ft(r);let o=px.default.join(r,LJ),n=`${e.events.map(s=>JSON.stringify(s)).join(`
`)}
`;ux.default.appendFileSync(o,n,{mode:384});try{ux.default.chmodSync(o,384)}catch{}}});var Ja,mP=l(()=>{"use strict";Ja=e=>e.trim().toLowerCase().replace(/\s+/g," ").replace(/[.,;:!?]+$/g,"")});var s4,r4,o4,Ile,Wle,mx,gx=l(()=>{"use strict";s4=require("node:crypto");nt();mP();tp();r4=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-1)).trimEnd()}\u2026`,o4=e=>e.toLowerCase().replace(/_/g," "),Ile=(e,t)=>`sha256:${(0,s4.createHash)("sha256").update(`${e}
${t}`,"utf8").digest("hex")}`,Wle=(e,t)=>{let r=t.replace(/^sha256:/,"").slice(0,12);return`hist-${e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40)||"ep"}-${r}`.slice(0,64)},mx=e=>{let t=e.maxPerDraft??8,r=e.maxStored??64,o=e.nowIso??new Date().toISOString(),n=new Set,s=[],i=[],a=0;for(let c of e.failures){let d=c.reason!==null&&c.reason.trim().length>0?c.reason.trim():o4(c.state),u=qa(d);if(u.residualSecret){a+=1;continue}let g=`Avoid repeating this history failure (${o4(c.state)}).`,f=qa(g);if(f.residualSecret){a+=1;continue}let y=r4(u.scrubbed.replace(/\s+/g," ").trim(),120),P=r4(f.scrubbed.replace(/\s+/g," ").trim(),280);if(y.length===0||P.length===0)continue;let h=Ja(`${y}|${P}`);if(n.has(h))continue;n.add(h);let p=Ile(y,P),S=`- **${y}:** ${P}`;s.length<t&&s.push(S),i.length<r&&i.push({id:Wle(c.episodeId,p),symptom:y,avoidance:P,sourceEpisodeId:c.episodeId,sourceState:c.state,contentHash:p,createdAt:o})}return{skillPitfallLines:s,localEntries:i,skippedSecretCount:a}}});var Ole,fx,yx=l(()=>{"use strict";mP();nt();Ole=e=>{let t=[];for(let r of e.split(/\r?\n/)){let o=r.trim();/^[-*]\s+\S/.test(o)?t.push(o.replace(/^\*\s+/,"- ")):/^\d+\.\s+\S/.test(o)&&t.push(o.replace(/^\d+\.\s+/,"- "))}return t},fx=e=>{let t=e.maxBullets??8,r=e.skillMarkdown,o=/(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i,n=r.match(o),s=n?Ole(n[3]??""):[],i=new Set(s.map(g=>Ja(g))),a=[...s],c=0;for(let g of e.newPitfallLines){let f=g.trim();if(f.length===0)continue;let y=f.startsWith("- ")?f:`- ${f}`,P=Ja(y);if(!i.has(P)){if(a.length>=t)break;i.add(P),a.push(y),c+=1}}let d=a.length>0?`${a.join(`
`)}
`:`(none yet)
`;if(n)return{skillMarkdown:r.replace(o,(f,y,P)=>`${y}${P}${d}`),appendedCount:c,totalPitfallBullets:a.length};let u=r.endsWith(`
`)?"":`
`;return{skillMarkdown:`${r}${u}
## Pitfalls
${d}`,appendedCount:c,totalPitfallBullets:a.length}}});var hx,a4,i4,yP,Sx,Px=l(()=>{"use strict";hx=m(require("node:fs")),a4=m(require("node:path"));oe();ne();i4="[project-history-skillgen]",yP=()=>({items:[],updatedAt:new Date(0).toISOString()}),Sx=e=>{let t=a4.default.join(X(e),Re,eP);if(!hx.default.existsSync(t))return yP();try{let r=JSON.parse(hx.default.readFileSync(t,"utf8"));return typeof r!="object"||r===null||!Array.isArray(r.items)?(console.error(i4,"learned_pitfalls_corrupt",e),yP()):{items:r.items,updatedAt:typeof r.updatedAt=="string"?r.updatedAt:yP().updatedAt}}catch(r){return console.error(i4,"learned_pitfalls_read_failed",e,r),yP()}}});var Mle,l4,c4=l(()=>{"use strict";Mle=["FAILED_EXTRACT","FAILED_VALIDATE","QUARANTINED","SKIPPED_FILTER"],l4=e=>Mle.includes(e)});var Ax,bx=l(()=>{"use strict";c4();Ax=e=>{let t=[];for(let r of e.episodes)e.excludeEpisodeId!==void 0&&e.excludeEpisodeId!==null&&r.episodeId===e.excludeEpisodeId||l4(r.state)&&t.push({episodeId:r.episodeId,state:r.state,reason:r.reason});return t}});var _x,sp,jle,ip,kx,hP=l(()=>{"use strict";_x=m(require("node:fs")),sp=m(require("node:path"));zs();Nt();oe();ne();jle=e=>e.length>0&&!e.includes("/")&&!e.includes("\\")&&!e.includes(".."),ip=e=>{if(!jle(e.draftId))throw new Error("invalid_draft_id");let t=ge(e.projectId),r=sp.default.join(t,Ee,pn,e.draftId);ft(r);let o=sp.default.join(r,ZS),n=sp.default.join(r,QS),s=ot(e.skillMarkdown);return ve(o,e.skillMarkdown),ve(n,`${JSON.stringify({draftId:e.draftId,episodeId:e.episodeId,name:e.name,description:e.description,sourceMessageIds:e.sourceMessageIds,contentHash:s,status:"draft",updatedAt:new Date().toISOString()})}
`),{draftDir:r,skillPath:o,metaPath:n,contentHash:s}},kx=e=>{let t=ge(e),r=sp.default.join(t,Ee,pn);return _x.default.existsSync(r)?_x.default.readdirSync(r,{withFileTypes:!0}).filter(o=>o.isDirectory()&&!o.name.startsWith(".")).length:0}});var d4,wx,Tx=l(()=>{"use strict";d4=m(require("node:path"));Nt();oe();ne();wx=e=>{let t=ge(e.projectId),r=d4.default.join(t,Re,eP),o={...e.file,updatedAt:new Date().toISOString()};return ve(r,`${JSON.stringify(o)}
`),o}});var u4,Ex,Rx=l(()=>{"use strict";u4=m(require("node:path"));Nt();oe();ne();Ex=e=>{let t=ge(e.projectId),r=u4.default.join(t,Re,iL),o={...e.file,updatedAt:new Date().toISOString()};return ve(r,`${JSON.stringify(o)}
`),o}});var Cx,p4,vx,Nle,Dle,SP,Lx,xx=l(()=>{"use strict";Cx=m(require("node:fs")),p4=m(require("node:path"));pP();gx();yx();nt();Px();lP();bx();hP();Tx();Rx();vx="[project-history-skillgen]",Nle=(e,t)=>{let r=new Map;for(let o of e)r.set(o.contentHash,o);for(let o of t)r.set(o.contentHash,o);return[...r.values()].slice(-64)},Dle=e=>{try{let t=JSON.parse(Cx.default.readFileSync(e,"utf8"));return{name:typeof t.name=="string"?t.name:"draft",description:typeof t.description=="string"?t.description:"",sourceMessageIds:Array.isArray(t.sourceMessageIds)?t.sourceMessageIds.filter(r=>typeof r=="string"):[]}}catch{return{name:"draft",description:"",sourceMessageIds:[]}}},SP=e=>{try{np({projectId:e.projectId,events:[ep({projectId:e.projectId,episodeId:e.episodeId,fromState:e.state,toState:e.state,reason:e.reason,tokensUsed:0,nowIso:e.nowIso})]})}catch{}},Lx=e=>{let t=new Date(e.nowMs).toISOString();try{let r=Ax({episodes:e.episodes,excludeEpisodeId:e.successEpisode.episodeId}),o=mx({failures:r,nowIso:t});if(o.skillPitfallLines.length===0&&o.localEntries.length===0)return{appendedCount:0,storedCount:0,ok:!0};let n=0;try{let s=Dle(e.draftWritten.metaPath),i=Cx.default.readFileSync(e.draftWritten.skillPath,"utf8"),a=fx({skillMarkdown:i,newPitfallLines:o.skillPitfallLines});n=a.appendedCount,a.skillMarkdown!==i&&ip({projectId:e.projectId,draftId:p4.default.basename(e.draftWritten.draftDir),skillMarkdown:a.skillMarkdown,episodeId:e.successEpisode.episodeId,sourceMessageIds:s.sourceMessageIds,name:s.name,description:s.description})}catch(s){console.error(vx,"pitfalls_draft_merge_failed",e.projectId,s),SP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_draft_merge_failed",nowIso:t})}try{let s=Sx(e.projectId),i=Nle(s.items,o.localEntries);return wx({projectId:e.projectId,file:{items:i,updatedAt:t}}),Ex({projectId:e.projectId,file:{historyLearnedPitfalls:i.length===0?null:{active:!0,count:i.length,updatedAt:t,summary:`${i.length} recent pitfalls from project history (local)`},updatedAt:t}}),SP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attached",nowIso:t}),{appendedCount:n,storedCount:i.length,ok:!0}}catch(s){return console.error(vx,"pitfalls_store_failed",e.projectId,s),SP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_store_failed",nowIso:t}),{appendedCount:n,storedCount:0,ok:!1}}}catch(r){return console.error(vx,"pitfalls_attach_failed",e.projectId,r),SP({projectId:e.projectId,episodeId:e.successEpisode.episodeId,state:e.successEpisode.state,reason:"pitfalls_attach_failed",nowIso:t}),{appendedCount:0,storedCount:0,ok:!1}}}});var ap,PP=l(()=>{"use strict";ap=e=>{let t=e.message;for(let r of["summary","text","body","content"]){let o=t[r];if(typeof o=="string"&&o.trim().length>0)return o}return""}});var m4,g4=l(()=>{"use strict";rp();m4=(e,t)=>{for(let r=e.length-1;r>=0;r-=1){let o=e[r];if(o.projectId===t&&sx.includes(o.state))return o}return null}});var Ix,Wx=l(()=>{"use strict";Ix=e=>e==="on_ready"||e==="degraded"||e==="on_configuring"});var Ox,f4,Hle,Mx,jx=l(()=>{"use strict";Ox=m(require("node:fs")),f4=m(require("node:path"));oe();ne();Hle=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.messageId=="string"&&typeof t.projectId=="string"&&typeof t.savedAt=="string"&&typeof t.message=="object"&&t.message!==null&&!Array.isArray(t.message)},Mx=e=>{let t=e.messageId.trim();if(t.length===0||t.includes("/")||t.includes("\\")||t.includes(".."))return null;let r=f4.default.join(X(e.projectId),cr,`${t}.json`);if(!Ox.default.existsSync(r))return null;try{let o=JSON.parse(Ox.default.readFileSync(r,"utf8"));return Hle(o)?o:null}catch{return null}}});var Nx,y4,lp,AP=l(()=>{"use strict";Nx=m(require("node:fs")),y4=m(require("node:path"));oe();jx();ne();lp=e=>{let t=y4.default.join(X(e),cr);if(!Nx.default.existsSync(t))return[];let r=Nx.default.readdirSync(t).filter(n=>n.endsWith(".json")&&n!=="state.json").map(n=>n.slice(0,-5)),o=[];for(let n of r){let s=Mx({projectId:e,messageId:n});s!==null&&o.push(s)}return o.sort((n,s)=>{let i=Date.parse(n.savedAt),a=Date.parse(s.savedAt);return i!==a?i-a:n.messageId.localeCompare(s.messageId)})}});var Bs,bP,h4,S4=l(()=>{"use strict";Bs=m(require("node:fs")),bP=m(require("node:path"));oe();ne();cP();h4=e=>{let t=bP.default.join(X(e),Ee,pn);if(!Bs.default.existsSync(t))return[];let r=[];for(let o of Bs.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("."))continue;let n=bP.default.join(t,o.name,ZS),s=bP.default.join(t,o.name,QS);if(Bs.default.existsSync(n))try{let i=Bs.default.readFileSync(n,"utf8"),a="",c=o.name;if(Bs.default.existsSync(s)){let d=JSON.parse(Bs.default.readFileSync(s,"utf8"));typeof d.contentHash=="string"&&(a=d.contentHash),typeof d.name=="string"&&d.name.length>0&&(c=d.name)}if(a.length===0)continue;r.push({id:o.name,contentHash:a,name:c,stepLines:op(i)})}catch{}}return r}});var cp,Dx,P4,A4=l(()=>{"use strict";cp=m(require("node:fs")),Dx=m(require("node:path"));oe();ne();P4=e=>{let t=Dx.default.join(X(e),Ee);if(!cp.default.existsSync(t))return[];let r=[];for(let o of cp.default.readdirSync(t,{withFileTypes:!0})){if(!o.isDirectory()||o.name.startsWith("_"))continue;let n=Dx.default.join(t,o.name,mn);if(cp.default.existsSync(n))try{let s=JSON.parse(cp.default.readFileSync(n,"utf8"));if(typeof s.contentHash!="string")continue;r.push({id:o.name,contentHash:s.contentHash,name:typeof s.skillId=="string"?s.skillId:o.name,stepLines:[]})}catch{}}return r}});var Fle,Hx,Fx=l(()=>{"use strict";PP();AP();Fle=(e,t,r,o)=>r===null||e>r?!0:e<r?!1:o===null?!0:t.localeCompare(o)>0,Hx=e=>{let t=lp(e.projectId),r=[];for(let o of t){let n=Date.parse(o.savedAt);Number.isNaN(n)||Fle(n,o.messageId,e.cursorSavedAtMs,e.cursorMessageId)&&r.push({messageId:o.messageId,createdAtMs:n,text:ap(o)})}return r}});var b4,_4=l(()=>{"use strict";b4=(e,t)=>{let r=e.findIndex(o=>o.episodeId===t.episodeId);return r<0?[...e,t]:e.map((o,n)=>n===r?t:o)}});var k4,$x,zx=l(()=>{"use strict";k4=m(require("node:path"));Nt();oe();ne();$x=e=>{let t=ge(e.projectId),r=k4.default.join(t,Re,XS),o={...e.budget,updatedAt:new Date().toISOString()};return ve(r,`${JSON.stringify(o)}
`),o}});var w4,Ux,Bx=l(()=>{"use strict";w4=m(require("node:path"));Nt();oe();ne();Ux=e=>{let t=ge(e.projectId),r=w4.default.join(t,Re,YS),o={...e.file,updatedAt:new Date().toISOString()};return ve(r,`${JSON.stringify(o)}
`),o}});var T4,E4=l(()=>{"use strict";pP();_4();zx();Bx();T4=e=>{let{result:t,episodesFile:r,budget:o,projectId:n,nowMs:s}=e,i=r.cursorMessageId,a=r.cursorSavedAtMs;t.episode.state!=="CAPTURING"&&t.episode.messageIds.length>0&&(i=t.episode.messageIds[t.episode.messageIds.length-1],a=t.episode.lastMessageAtMs??a),Ux({projectId:n,file:{episodes:b4(r.episodes,t.episode),cursorMessageId:i,cursorSavedAtMs:a,updatedAt:new Date(s).toISOString()}}),$x({projectId:n,budget:{dayKey:o.dayKey,tokensUsedToday:o.tokensUsedToday+t.tokensSpent,lastClosedAtMs:t.episode.closedAtMs??o.lastClosedAtMs,updatedAt:new Date(s).toISOString()}}),np({projectId:n,events:t.metrics})}});var _P,Gx=l(()=>{"use strict";_P=e=>new Date(e).toISOString().slice(0,10)});var kP,R4=l(()=>{"use strict";Gx();kP=e=>({dayKey:_P(e),tokensUsedToday:0,lastClosedAtMs:null,updatedAt:new Date(e).toISOString()})});var Vx,C4,v4,$le,Kx,qx=l(()=>{"use strict";Vx=m(require("node:fs")),C4=m(require("node:path"));R4();oe();ne();Gx();v4="[project-history-skillgen]",$le=(e,t)=>{if(typeof e!="object"||e===null)return null;let r=e;if(typeof r.dayKey!="string"||typeof r.tokensUsedToday!="number"||!(r.lastClosedAtMs===null||typeof r.lastClosedAtMs=="number")||typeof r.updatedAt!="string")return null;let o=_P(t);return r.dayKey!==o?{dayKey:o,tokensUsedToday:0,lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}:{dayKey:r.dayKey,tokensUsedToday:Math.max(0,r.tokensUsedToday),lastClosedAtMs:r.lastClosedAtMs,updatedAt:r.updatedAt}},Kx=e=>{let t=C4.default.join(X(e.projectId),Re,XS);if(!Vx.default.existsSync(t))return kP(e.nowMs);try{let r=JSON.parse(Vx.default.readFileSync(t,"utf8")),o=$le(r,e.nowMs);return o===null?(console.error(v4,"budget_corrupt",e.projectId),kP(e.nowMs)):o}catch(r){return console.error(v4,"budget_read_failed",e.projectId,r),kP(e.nowMs)}}});var wP,L4=l(()=>{"use strict";wP=(e=new Date(0).toISOString())=>({episodes:[],cursorMessageId:null,cursorSavedAtMs:null,updatedAt:e})});var Jx,I4,x4,zle,Ule,Ble,Yx,Xx=l(()=>{"use strict";Jx=m(require("node:fs")),I4=m(require("node:path"));L4();rp();oe();ne();x4="[project-history-skillgen]",zle=e=>typeof e=="string"&&ox.includes(e),Ule=e=>{if(typeof e!="object"||e===null)return!1;let t=e;return typeof t.episodeId=="string"&&typeof t.projectId=="string"&&zle(t.state)&&Array.isArray(t.messageIds)&&typeof t.startedAtMs=="number"&&typeof t.lastMessageAtMs=="number"},Ble=e=>{if(typeof e!="object"||e===null)return null;let t=e;if(!Array.isArray(t.episodes))return null;let r=t.episodes.filter(Ule);if(r.length!==t.episodes.length||typeof t.updatedAt!="string")return null;let o=t.cursorMessageId===null||typeof t.cursorMessageId=="string"?t.cursorMessageId:null,n=t.cursorSavedAtMs===null||typeof t.cursorSavedAtMs=="number"?t.cursorSavedAtMs:null;return{episodes:r,cursorMessageId:o,cursorSavedAtMs:n,updatedAt:t.updatedAt}},Yx=e=>{let t=I4.default.join(X(e),Re,YS);if(!Jx.default.existsSync(t))return wP();try{let r=JSON.parse(Jx.default.readFileSync(t,"utf8")),o=Ble(r);return o===null?(console.error(x4,"episodes_corrupt",e),wP()):o}catch(r){return console.error(x4,"episodes_read_failed",e,r),wP()}}});var W4,Gle,Vle,Zx,Qx=l(()=>{"use strict";W4=require("node:crypto");uP();xx();PP();g4();Wx();AP();S4();A4();Fx();Ka();E4();qx();Xx();hP();Gle="[project-history-skillgen]",Vle=(e,t)=>{let r=new Map;for(let o of lp(e)){let n=Date.parse(o.savedAt);Number.isNaN(n)||r.set(o.messageId,{messageId:o.messageId,createdAtMs:n,text:ap(o)})}return t.map(o=>r.get(o)).filter(o=>o!==void 0)},Zx=(e={})=>{let t=e.ownerLlm??null,r=e.nowMs??Date.now;return async o=>{try{let n=Va(o.projectId);if(!Ix(n?.state))return;let s=r(),i=Yx(o.projectId),a=Kx({projectId:o.projectId,nowMs:s}),c=Hx({projectId:o.projectId,cursorMessageId:i.cursorMessageId,cursorSavedAtMs:i.cursorSavedAtMs}),d=m4(i.episodes,o.projectId);if(d===null){if(c.length===0)return;let f=c[0],y=c[c.length-1];d={episodeId:(0,W4.randomUUID)(),projectId:o.projectId,state:"CAPTURING",messageIds:c.map(P=>P.messageId),startedAtMs:f.createdAtMs,lastMessageAtMs:y.createdAtMs,closedAtMs:null,reason:null,scrubbedTranscript:null,ownerMarkedSaveAsSkill:!1,hasSuccessSignal:!1,validateAttempts:0,draftId:null,contentHash:null,mergeDraftId:null,tokensUsed:0}}else if(d.state==="CAPTURING"&&c.length>0){let f=new Set(d.messageIds),y=[...d.messageIds],P=d.lastMessageAtMs;for(let h of c)f.has(h.messageId)||(y.push(h.messageId),f.add(h.messageId),P=Math.max(P,h.createdAtMs));d={...d,messageIds:y,lastMessageAtMs:P}}let u=Vle(o.projectId,d.messageIds);if(u.length===0)return;let g=await dP({episode:d,messages:u,tokensUsedToday:a.tokensUsedToday,lastClosedAtMs:a.lastClosedAtMs,nowMs:s,deps:{ownerLlm:t,writeDraft:ip,listDraftFingerprints:()=>h4(o.projectId),listPublishedFingerprints:()=>P4(o.projectId),openDraftCount:()=>kx(o.projectId)}});if(T4({projectId:o.projectId,episodesFile:i,budget:a,result:g,nowMs:s}),g.draftWritten!==null&&g.episode.state==="AWAITING_REVIEW"){let f=[...i.episodes.filter(y=>y.episodeId!==g.episode.episodeId),g.episode];Lx({projectId:o.projectId,successEpisode:g.episode,episodes:f,draftWritten:g.draftWritten,nowMs:s})}}catch(n){console.error(Gle,"run_failed",o.projectId,n)}}}});var eI,tI,rI=l(()=>{"use strict";zs();ee();Xr();BL();zL();Qx();Ka();eI="[project-history-tick]",tI=async(e={})=>{let t=e.listProjectIds?.()??HL();if(t.length===0)return;let r=$(),o=e.cloudApi!==void 0?e.cloudApi:r===null?null:V({wsUrl:r.wsUrl,pairingToken:r.pairingToken}),n=$L(),s=e.pullSkills??oP,i=e.runSkillgen??Zx({ownerLlm:e.ownerLlm??null});for(let a of t){try{await i({projectId:a})}catch(c){console.error(eI,"skillgen_failed",a,c)}if(o===null){console.error(eI,"pull_skipped_no_cloud_api",a);continue}try{await s({projectId:a,deps:{history:n,awcPublished:UL(o)}})}catch(c){console.error(eI,"pull_failed",a,c)}}}});var oI,M4=l(()=>{"use strict";nt();rI();oI=e=>{let t=e?.intervalMs??6e4,r=e?.tick??(()=>tI());r();let o=setInterval(()=>{r()},t);return{stop:()=>{clearInterval(o)}}}});var j4=l(()=>{"use strict";oe();ne()});var N4=l(()=>{"use strict";uP()});var D4=l(()=>{"use strict";oe();ne()});var nI=l(()=>{"use strict";sL();ne();RL();CL();IL();ML();DL();zJ();nt();zL();BL();rI();zs();M4();Ka();nt();qL();VL();rx();tp();YL();ZL();cP();hP();JL();lP();j4();ax();cx();uP();N4();rp();jx();AP();PP();Fx();Xx();Bx();qx();zx();pP();Qx();Wx();mP();bx();gx();yx();xx();Px();Tx();D4();Rx();nt()});var Dt,Kle,H4,F4,sI,iI,aI,lI,cI,dI,uI=l(()=>{"use strict";Dt=require("node:crypto"),Kle=Buffer.from("302a300506032b6570032100","hex"),H4=e=>{let t=e.export({type:"spki",format:"der"});return t.subarray(t.length-32).toString("base64url")},F4=e=>{let t=Buffer.from(e,"base64url");if(t.length!==32)throw new Error("Ed25519 public key must be 32 bytes");return(0,Dt.createPublicKey)({key:Buffer.concat([Kle,t]),format:"der",type:"spki"})},sI=()=>{let{publicKey:e,privateKey:t}=(0,Dt.generateKeyPairSync)("ed25519");return{publicKeyRaw:H4(e),privateKeyPem:t.export({type:"pkcs8",format:"pem"}).toString()}},iI=e=>(0,Dt.createPrivateKey)(e),aI=(e,t)=>(0,Dt.sign)(null,Buffer.from(t,"utf8"),e).toString("base64url"),lI=(e,t,r)=>{try{let o=F4(e);return(0,Dt.verify)(null,Buffer.from(t,"utf8"),o,Buffer.from(r,"base64url"))}catch{return!1}},cI=e=>`${e.origin}
${e.publicKeyRaw}
${e.nonce}`,dI=()=>(0,Dt.randomBytes)(32).toString("base64url")});var _o,TP,$4,qle,Jle,EP,pI,mI,z4=l(()=>{"use strict";_o=m(require("node:fs")),TP=m(require("node:path"));uI();G();He();$4=e=>TP.default.join(e.installDir,Co),qle=(e,t)=>{if(e.profileEmail===null||t===$4(e)||_o.default.existsSync(t))return;let r=$4(e);_o.default.existsSync(r)&&(_o.default.mkdirSync(TP.default.dirname(t),{recursive:!0}),_o.default.renameSync(r,t))},Jle=e=>{if(!_o.default.existsSync(e))return null;try{let t=_o.default.readFileSync(e,"utf8"),r=JSON.parse(t);if(typeof r=="object"&&r!==null&&"publicKeyRaw"in r&&"privateKeyPem"in r&&typeof r.publicKeyRaw=="string"&&typeof r.privateKeyPem=="string")return r}catch{return null}return null},EP=e=>{let t=xl(e);qle(e,t);let r=Jle(t);if(r!==null)return r;let o=sI();return _o.default.mkdirSync(TP.default.dirname(t),{recursive:!0}),_o.default.writeFileSync(t,JSON.stringify(o,null,2),{mode:384}),o},pI=e=>{let t=EP(e.layout),r=dI(),o=cI({nonce:r,origin:e.origin,publicKeyRaw:t.publicKeyRaw}),n=iI(t.privateKeyPem),s=aI(n,o);return{devicePublicKey:t.publicKeyRaw,nonce:r,signature:s,origin:e.origin,...e.claimToken!==void 0?{claimToken:e.claimToken}:{}}},mI=e=>{let t=`${e.origin}
${e.devicePublicKey}
${e.challenge}`;return lI(e.serverPublicKey,t,e.serverAttestation)}});var gI=l(()=>{"use strict";z4();uI()});var U4,B4,G4=l(()=>{"use strict";U4=m(require("node:path")),B4=e=>({osUid:typeof e.uid=="number"&&Number.isInteger(e.uid)&&e.uid>=0?e.uid:null,installRootName:U4.default.basename(e.installDir)})});var V4=l(()=>{"use strict";In()});var Y4,dp,hI,SI,K4,Xle,fI,RP,fe,X4,Zle,yI,Qle,ece,PI,_e,Ne,yt,tce,q4,J4,up,pp,Z4=l(()=>{"use strict";Y4=m(require("node:http")),dp=m(require("node:fs")),hI=m(require("node:path"));vP();wd();EU();vU();OU();qn();wE();qE();a1();c1();pq();id();kC();_q();jq();Dq();KS();Xq();aJ();Go();Wt();It();lJ();dJ();Tw();fT();Rw();mJ();yJ();rL();Pr();vJ();nI();ee();gI();G4();V4();SI=e=>pE(e)??"never",K4=48e3,Xle=(e,t)=>t.importQuery?!0:t.justSubmitted?!1:t.reveal!==null&&t.reveal.sets.length>0,fI=(e,t)=>({scanFolder:t.scanFolder??t.reveal?.scanRoots[0]??xf(),reveal:t.reveal,installed:wr(e),cloudAppOrigin:t.cloudAppOrigin,flashMessage:t.flashMessage,flashError:t.flashError,importSectionExpanded:t.importSectionExpanded}),RP=async e=>{let t=$();return t===null?{ok:!1,projects:[],message:"Client config missing \u2014 pair this computer in AgentWitch Cloud to load projects."}:Tr(t,e)},fe=e=>e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),X4=200,Zle=e=>e==="Fresh"?'<span class="badge badge-online">Fresh</span>':e==="Stale"?'<span class="badge badge-warn">Stale</span>':'<span class="badge badge-offline">No heartbeat yet</span>',yI=e=>{let t=e.trim().slice(0,X4),r=new URLSearchParams({update:"failed"});return t.length>0&&r.set("error",t),`/?${r.toString()}`},Qle=(e,t)=>e!=="failed"||t===null||t.length===0?"":`<div class="alert-error">${fe(t)}</div>`,ece=(e,t)=>t>0?"":e.length>0?`<p class="empty">No matches for "${fe(e)}".</p>`:'<p class="empty">No chunks yet. Finish an agent turn to index.</p>',PI={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Access-Control-Request-Private-Network","Access-Control-Allow-Private-Network":"true"},_e=(e,t,r)=>{e.writeHead(t,{"Content-Type":"application/json",...PI}),e.end(JSON.stringify(r))},Ne=(e,t)=>{e.writeHead(200,{"Content-Type":"text/html; charset=utf-8"}),e.end(t)},yt=async e=>{let t=[];for await(let r of e)t.push(Buffer.isBuffer(r)?r:Buffer.from(r));return Buffer.concat(t).toString("utf8")},tce=e=>{let t=e.status.wsConnected?'<span class="badge badge-online">Connected</span>':'<span class="badge badge-offline">Disconnected</span>',r=Zle(e.healthBadge),o=e.status.wakeError?`<div class="alert-error">${fe(e.status.wakeError)}</div>`:"",n=e.revived?`<div class="alert-success">${fe(LE(process.platform))}</div>`:"",s=ZC(e.status.wsConnected)?`<div class="actions">
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
        <div class="meta-item"><span class="meta-label">Last heartbeat</span><span class="meta-value">${Td(e.status.lastHeartbeatAt)}</span></div>
        <div class="meta-item"><span class="meta-label">Health file</span><span class="meta-value">${r}</span></div>
        <div class="meta-item"><span class="meta-label">Link code</span><span class="meta-value"><code>${fe(e.linkCode)}</code></span></div>
        <div class="meta-item"><span class="meta-label">Install bundle</span><span class="meta-value"><code>${fe(e.installBundleVersion)}</code>${e.installBundleUpdatedAt!==null?` <span class="muted">\xB7 ${fe(SI(e.installBundleUpdatedAt))}</span>`:""}</span></div>
        <div class="meta-item"><span class="meta-label">Public key</span><span class="meta-value muted mono">${fe(e.status.publicKeyRaw.slice(0,24))}\u2026</span></div>
      </div>
      ${o}
      ${s}
    </section>`},q4=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("update");return r==="ok"?"ok":r==="failed"?"failed":r==="started"?"started":null},J4=e=>{let r=new URL(e??"/",`http://127.0.0.1:${43347}`).searchParams.get("error")?.trim()??"";return r.length===0?null:r.slice(0,X4)},up=e=>{let t=hI.default.join(e.layout.installDir,"link-code.txt"),r=()=>Fe(e.layout.installDir),o=()=>{let h=r();return{installBundleVersion:JS(h),installBundleUpdatedAt:h?.updatedAt??null,installVersion:h}},n=async h=>{let p=h.installVersion??r(),S=await i(),b=eR(S),k=h.updateFlash??null,A=tR(k),_=Qle(k,h.updateError??null);return ZE({title:h.title,activePath:h.activePath,body:h.body,cloudAppOrigin:lr(p),installBundleVersionLabel:JS(p),prependBody:`${A}${_}${b}`,headerUpdateButtonHtml:QE(S)})},s=null,i=async()=>{let h=Date.now();if(s!==null&&h-s.cachedAtMs<6e4)return s.offer;let p=await XC(e.layout);return s={cachedAtMs:h,offer:p},p},a=()=>{s=null},c=!1,d=async h=>{if(a(),!(await i()).updateAvailable){h.writeHead(303,{Location:"/?update=ok"}),h.end();return}if(c){h.writeHead(303,{Location:yI("An update is already running.")}),h.end();return}c=!0;try{let S=await tL(),b=S.ok?"/?update=ok":yI(S.message);h.writeHead(303,{Location:b}),h.end()}catch(S){let b=S instanceof Error&&S.message.trim().length>0?S.message:"Install bundle update failed.";h.writeHead(303,{Location:yI(b)}),h.end()}finally{c=!1,a()}},u=async(h,p)=>{let S=p==="Project not found"?"That project is not available on this computer.":"That page does not exist on this computer.",b=o(),k=await n({title:p,activePath:p==="Project not found"?"/projects":"/",installVersion:b.installVersion,body:`<section class="card">
      <h1>${fe(p)}</h1>
      <p>${fe(S)}</p>
      <div class="actions"><a class="btn btn-secondary" href="/">Home</a></div>
    </section>`});h.writeHead(404,{"Content-Type":"text/html; charset=utf-8"}),h.end(k)},g=()=>{if(dp.default.existsSync(t))return dp.default.readFileSync(t,"utf8").trim();let h=Math.random().toString(36).slice(2,8).toUpperCase();return dp.default.writeFileSync(t,h,"utf8"),h},f=dn({layout:e.layout}),y=Y4.default.createServer((h,p)=>{(async()=>{let S=h.url?.split("?")[0]??"/",b=h.method??"GET";if(b==="OPTIONS"){p.writeHead(204,PI),p.end();return}if(await SC({method:b,pathname:S,request:h,response:p,requestUrl:h.url??"/",storePath:bq(hI.default.dirname(e.layout.configPath)),readBody:yt,sendHtml:Ne,renderShell:n})||await ky({method:b,pathname:S,request:h,response:p,layout:e.layout,readBody:yt,sendJson:_e})||await MS({method:b,pathname:S,request:h,response:p,layout:e.layout,readBody:yt,sendJson:_e,server:f}))return;if(b==="GET"&&S==="/health"){let A=e.controllers.getStatus(),_=o();_e(p,200,{ok:!0,...A,installBundleVersion:_.installBundleVersion,installBundleUpdatedAt:_.installBundleUpdatedAt,...B4({uid:process.getuid?.(),installDir:e.layout.installDir})});return}if(b==="GET"&&S==="/api/status"){let A=o();_e(p,200,{...e.controllers.getStatus(),linkCode:g(),installBundleVersion:A.installBundleVersion,installBundleUpdatedAt:A.installBundleUpdatedAt});return}if(b==="GET"&&S==="/api/traffic"){_e(p,200,{entries:_d(e.layout)});return}if(b==="DELETE"&&S==="/api/traffic"||b==="POST"&&S==="/api/traffic/clear"){if(fE(e.layout),b==="POST"){p.writeHead(303,{Location:"/traffic?cleared=1"}),p.end();return}_e(p,200,{ok:!0});return}if(b==="GET"&&S==="/api/trace"){_e(p,200,{entries:Zy(e.layout)});return}if(b==="DELETE"&&S==="/api/trace"||b==="POST"&&S==="/api/trace/clear"){if(SE(e.layout),b==="POST"){p.writeHead(303,{Location:"/status"}),p.end();return}_e(p,200,{ok:!0});return}if(b==="POST"&&S==="/api/errors/clear"){PE(e.layout.errorLogPath),p.writeHead(303,{Location:"/errors?cleared=1"}),p.end();return}if(b==="GET"&&S==="/api/knowledge"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"";if(_.length>0){let E=await ma({layout:e.layout,query:_,limit:20});_e(p,200,{chunks:E,query:_});return}_e(p,200,{chunks:pa(e.layout).slice(-50).reverse()});return}if(b==="POST"&&S==="/api/revive"){e.controllers.reviveWebSocket(),p.writeHead(303,{Location:"/status?revived=1"}),p.end();return}if(b==="GET"&&S==="/api/update-status"){let A=await i();_e(p,200,{ok:!0,...A});return}if((b==="GET"||b==="POST")&&S==="/api/update"){await d(p);return}if(b==="GET"&&S==="/"){let A=e.controllers.getStatus(),_=o(),E=wr(e.layout),T=Qy(e.layout.errorLogPath);Ne(p,await n({title:"Home",activePath:"/",installVersion:_.installVersion,updateFlash:q4(h.url??void 0),updateError:J4(h.url??void 0),body:rR({wsConnected:A.wsConnected,lastHeartbeatAt:A.lastHeartbeatAt,installBundleVersion:_.installBundleVersion,harnessSetCount:E.sets.length,knowledgeChunkCount:pa(e.layout).length,trafficEntryCount:_d(e.layout).length,wakeError:A.wakeError,errorLogByteSize:T.byteSize,errorLogExists:T.exists})}));return}if(b==="GET"&&S==="/task"){let A=e.controllers.getStatus(),_=o(),E=$(),T=new URL(h.url??"/",`http://127.0.0.1:${43347}`),C=T.searchParams.get("ok")==="1"?"Task finished \u2014 status reported to cloud.":null,x=T.searchParams.get("failed")==="1"?T.searchParams.get("error")?.trim()??"Task failed.":null,W=T.searchParams.get("runId");Ne(p,await n({title:"Task",activePath:"/task",installVersion:_.installVersion,body:wC({defaultWorkspace:E?.workspace??"",wsConnected:A.wsConnected,flashMessage:C,flashError:x,lastRunId:W})}));return}if(b==="POST"&&S==="/task/dispatch"){let A=await yt(h),_=new URLSearchParams(A),E=_.get("prompt")?.trim()??"",T=_.get("writerAgent")?.trim()??"claude-cli",C=_.get("projectFolder")?.trim()??"",x=await nL({prompt:E,writerAgent:T,...C.length>0?{projectFolderPath:C}:{}}),W=new URLSearchParams;x.ok?W.set("ok","1"):(W.set("failed","1"),x.errorMessage!==void 0&&W.set("error",x.errorMessage.slice(0,240))),x.agentRunId!==void 0&&W.set("runId",x.agentRunId),p.writeHead(303,{Location:`/task?${W.toString()}`}),p.end();return}if(b==="GET"&&S==="/writer-sessions"){let A=o(),_=US(e.layout,12);Ne(p,await n({title:"Writer sessions",activePath:"/writer-sessions",installVersion:A.installVersion,updateFlash:q4(h.url??void 0),updateError:J4(h.url??void 0),body:xC({sessions:_})}));return}if(b==="GET"&&S==="/errors"){let A=o(),_=Qy(e.layout.errorLogPath);Ne(p,await n({title:"Errors",activePath:"/errors",installVersion:A.installVersion,body:bE({errorLogPath:e.layout.errorLogPath,content:_.content,exists:_.exists,truncated:_.truncated,byteSize:_.byteSize,cleared:new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("cleared")==="1"})}));return}if(b==="GET"&&S==="/status"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=e.controllers.getStatus(),E=Ce(e.layout),T=E!==null?ze(E,12e4):TE(_.lastHeartbeatAt,12e4),C=EE({lastHeartbeatAt:_.lastHeartbeatAt,heartbeatIsStale:T}),x=o();Ne(p,await n({title:"Status",activePath:"/status",installVersion:x.installVersion,body:`${tce({status:_,healthBadge:C,revived:A.searchParams.get("revived")==="1",linkCode:g(),installBundleVersion:x.installBundleVersion,installBundleUpdatedAt:x.installBundleUpdatedAt})}${CE({installDir:e.layout.installDir,platform:process.platform})}${vE({entries:Zy(e.layout)})}`}));return}if(b==="GET"&&S==="/traffic"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=_d(e.layout),E=o(),T=_.map(W=>`<tr><td title="${fe(W.at)}">${fe(SI(W.at))}</td><td>${fe(W.direction)}</td><td><code>${fe(W.type)}</code></td><td>${fe(W.summary)}</td><td>${fe(W.action??"")}</td></tr>`).join(""),C=_.length>0?`<div class="table-wrap"><table><thead><tr><th>At</th><th>Dir</th><th>Type</th><th>Summary</th><th>Action</th></tr></thead><tbody>${T}</tbody></table></div>`:'<p class="empty">No traffic yet. Frames appear here when the bridge is active.</p>',x=A.searchParams.get("cleared")==="1"?'<div class="alert-success">Traffic log cleared.</div>':"";Ne(p,await n({title:"Traffic",activePath:"/traffic",installVersion:E.installVersion,body:`<section class="card">
              <p class="eyebrow">Diagnostics</p>
              <h1>WS traffic log</h1>
              <p class="lede">Frames sent and received, plus local bridge actions.</p>
              ${x}
              ${C}
              <form method="POST" action="/api/traffic/clear" class="actions" style="margin-bottom:12px">
                <button class="btn btn-ghost" type="submit">Clear traffic</button>
              </form>
            </section>`}));return}if(b==="GET"&&S==="/projects"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=o(),E=lr(_.installVersion),T=await RP(e.layout),C=A.searchParams.get("folderError")==="1"?"Could not save the selected folder to AgentWitch. Check the Mac connection and try again.":A.searchParams.get("deleteError")==="1"?"Could not delete the project in AgentWitch Cloud. Check pairing on Status.":null,x=A.searchParams.get("deleted")==="1"?"Project removed from AgentWitch Cloud. Folders on your computer were not deleted.":null,W=$(),j=W===null?null:V({wsUrl:W.wsUrl,pairingToken:W.pairingToken}),M=j===null?{}:Object.fromEntries((await Promise.all(T.projects.map(async B=>{let ie=await qC(j,B.id);return[B.id,ie?.counts??null]}))).filter(B=>B[1]!==null));Ne(p,await n({title:"Projects",activePath:"/projects",installVersion:_.installVersion,body:JC({projects:T.projects,compositionCountsByProjectId:M,cloudAppOrigin:E,syncMessage:T.message,syncOk:T.ok,flashMessage:x,flashError:C})}));return}if(b==="GET"&&S==="/projects/select-folder"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("projectId")?.trim()??"",E=$(),T=E===null?null:V({wsUrl:E.wsUrl,pairingToken:E.pairingToken}),C=_.length>0&&T!==null?qo():null;if(C===null||T===null){p.writeHead(303,{Location:"/projects"}),p.end();return}if(it({projectFolderPath:C}),!await Qc(T,_,C)){p.writeHead(303,{Location:"/projects?folderError=1"}),p.end();return}p.writeHead(303,{Location:`/project?id=${encodeURIComponent(_)}&folderUpdated=1`}),p.end();return}if(b==="POST"&&S==="/projects/delete"){let A=await yt(h),_=new URLSearchParams(A).get("projectId")?.trim()??"",E=$(),T=E===null?null:V({wsUrl:E.wsUrl,pairingToken:E.pairingToken});if(T===null||_.length===0){p.writeHead(303,{Location:"/projects?deleteError=1"}),p.end();return}let C=await jw(T,_);p.writeHead(303,{Location:C.ok?"/projects?deleted=1":"/projects?deleteError=1"}),p.end();return}if(b==="GET"&&S==="/project"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=A.searchParams.get("id")?.trim()??"",E=o(),T=lr(E.installVersion),C=await RP(e.layout),x=Xt(C.projects,_);if(x===null){await u(p,"Project not found");return}let W=A.searchParams.get("linked")==="1"?A.searchParams.get("bindingsSynced")==="0"?`Harness linked locally (${A.searchParams.get("files")??"0"} file(s)). Cloud composition sync failed \u2014 check WS connection on Status.`:`Harness linked (${A.searchParams.get("files")??"0"} file(s) written) and composition synced to cloud.`:A.searchParams.get("folderUpdated")==="1"?"Project folder updated and synced with AgentWitch.":null,j=A.searchParams.get("knowledgePromoted"),M=j!==null?`Marked ${j} lesson(s) as promoted in AgentWitch.`:null,B=A.searchParams.get("knowledgePromoteFailed")==="1"?"Could not promote lessons \u2014 check Mac pairing and cloud connection on Status.":null,ie=A.searchParams.get("tab")?.trim()??"harness",D=ie==="workflows"||ie==="agents"||ie==="knowledge"||ie==="pitfalls"?ie:"harness",xe=A.searchParams.get("retired")==="1",Pn=A.searchParams.get("edit")?.trim()||null,An=pJ(A.searchParams.get("pitfall")),ei=$(),Fr=ei===null?null:V({wsUrl:ei.wsUrl,pairingToken:ei.pairingToken}),hA=Fr===null?null:await qC(Fr,x.id),pl=0;if(Fr!==null)try{let Up=await fetch(`${Fr.appOrigin}/api/agent-witch/projects/${encodeURIComponent(x.id)}/knowledge`,{method:"GET",headers:{[le]:Fr.pairingToken},signal:AbortSignal.timeout(1e4)});if(Up.ok){let ti=await Up.json();typeof ti=="object"&&ti!==null&&typeof ti.candidateCount=="number"&&(pl=ti.candidateCount)}}catch{pl=0}let SA=D!=="pitfalls"?void 0:await gH({store:Cy({layout:e.layout,cloud:Fr===null?null:Zc(Fr)}),projectId:x.id,includeRetired:xe});Ne(p,await n({title:x.name,activePath:"/projects",installVersion:E.installVersion,body:Vo({project:x,cloudAppOrigin:T,installed:wr(e.layout),linkedSetSlugs:_r(x.projectFolderPath),composition:hA,knowledgeCandidateCount:pl,pitfalls:SA,pitfallsShowRetired:xe,pitfallsEditId:Pn,activeTab:D,flashMessage:W??M??An?.message??null,flashError:B??An?.error??null})}));return}if(b==="POST"&&S==="/projects/pull-bound-harness"){let A=await yt(h),_=await kw({rawBody:A,layout:e.layout});if(_.kind==="not_found"){await u(p,"Project not found");return}if(_.kind==="redirect"){p.writeHead(303,{Location:_.location}),p.end();return}let E=o();Ne(p,await n({title:_.title,activePath:"/projects",installVersion:E.installVersion,body:_.body}));return}if(b==="POST"&&S==="/projects/link-harness"){let A=await yt(h),_=new URLSearchParams(A),E=_.get("projectId")?.trim()??"",T=await RP(e.layout),C=Xt(T.projects,E);if(C===null){await u(p,"Project not found");return}let x=_.getAll("applySet").map(D=>String(D)),W=Fc({layout:e.layout,projectFolderPath:C.projectFolderPath,setSlugs:x});if(!W.ok){let D=o(),xe=lr(D.installVersion);Ne(p,await n({title:C.name,activePath:"/projects",installVersion:D.installVersion,body:Vo({project:C,cloudAppOrigin:xe,installed:wr(e.layout),linkedSetSlugs:_r(C.projectFolderPath),composition:null,knowledgeCandidateCount:0,activeTab:"harness",flashError:W.errorMessage})}));return}let j=$(),M=j===null?null:V({wsUrl:j.wsUrl,pairingToken:j.pairingToken}),B=M===null?!1:await ns(M,C.id,W.appliedSetSlugs),ie=new URLSearchParams({linked:"1",files:String(W.writtenFileCount),bindingsSynced:B?"1":"0"});p.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${ie.toString()}`}),p.end();return}if(b==="POST"&&S==="/projects/remove-harness-set"){let A=await yt(h),_=await ww({rawBody:A,layout:e.layout});if(_.kind==="not_found"){await u(p,"Project not found");return}if(_.kind==="redirect"){p.writeHead(303,{Location:_.location}),p.end();return}let E=o();Ne(p,await n({title:_.title,activePath:"/projects",installVersion:E.installVersion,body:_.body}));return}if(b==="POST"&&S==="/project/knowledge/promote-all"){let A=await yt(h),E=new URLSearchParams(A).get("projectId")?.trim()??"",T=await RP(e.layout),C=Xt(T.projects,E);if(C===null){await u(p,"Project not found");return}let x=$(),W=x===null?null:V({wsUrl:x.wsUrl,pairingToken:x.pairingToken}),j=W===null?{ok:!1,promotedCount:0}:await cJ(W,C.id),M=new URLSearchParams({tab:"knowledge",...j.ok?{knowledgePromoted:String(j.promotedCount)}:{knowledgePromoteFailed:"1"}});p.writeHead(303,{Location:`/project?id=${encodeURIComponent(C.id)}&${M.toString()}`}),p.end();return}let k=Vf(S);if(b==="POST"&&k!==null){let A=await yt(h),_=await vw({rawBody:A,action:k,layout:e.layout,createStore:E=>Cy({layout:e.layout,cloud:Zc(E)})});if(_.kind==="not_found"){await u(p,"Project not found");return}p.writeHead(303,{Location:_.location}),p.end();return}if(b==="GET"&&S==="/harness"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),_=o(),E=Bc(e.layout),T=A.searchParams.get("submitted")==="1",C=T?A.searchParams.get("syncFailed")==="1"?`Local harness updated (${A.searchParams.get("count")??"0"} items). Cloud sync failed \u2014 check WS connection on Status.`:A.searchParams.get("synced")==="1"?`Local harness updated and manifest reported to cloud (${A.searchParams.get("count")??"0"} items).`:"Local harness updated from your selection.":A.searchParams.get("stopped")==="1"?`Reveal stopped. ${E?.sets.length??0} set(s) saved \u2014 you can submit or scan again.`:A.searchParams.get("revealed")==="1"?`Reveal found ${E?.sets.length??0} set(s).`:null,x=E?.scanRoots[0]??xf(),W=Xle(e.layout,{reveal:E,importQuery:A.searchParams.get("import")==="1",justSubmitted:T}),j=lr(_.installVersion);Ne(p,await n({title:"Harness",activePath:"/harness",installVersion:_.installVersion,body:Uu(fI(e.layout,{cloudAppOrigin:j,reveal:E,scanFolder:x,flashMessage:C,importSectionExpanded:W}))}));return}if(b==="POST"&&S==="/api/harness/pick-folder"){let A=qo();if(A===null){_e(p,200,{cancelled:!0});return}_e(p,200,{path:A});return}if(b==="GET"&&S==="/api/harness/file-content"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("path")?.trim()??"",E=Hc(_);if(E===null){_e(p,404,{errorMessage:"File not found or not readable under your home folder."});return}try{let T=dp.default.readFileSync(E,"utf8"),C=T.length>K4?`${T.slice(0,K4)}
\u2026 (truncated)`:T;_e(p,200,{content:C})}catch{_e(p,500,{errorMessage:"Could not read file."})}return}if(b==="POST"&&S==="/api/harness/reveal/add-project"){let A=await yt(h),_="";try{let C=JSON.parse(A);typeof C=="object"&&C!==null&&typeof C.projectPath=="string"&&(_=C.projectPath.trim())}catch{_e(p,400,{ok:!1,errorMessage:"Invalid JSON body."});return}if(_.length===0){_e(p,400,{ok:!1,errorMessage:"projectPath is required."});return}let E=Bc(e.layout),T=Jk({reveal:E,projectPath:_});if(T===null||T.sets.length===0){_e(p,400,{ok:!1,errorMessage:"No .cursor folder with harness files found under that path."});return}Mf(e.layout,T),_e(p,200,{ok:!0,setCount:T.sets.length});return}if(b==="GET"&&S==="/api/harness/reveal/stream"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("scanRoot")?.trim()??"";if(_.length===0){_e(p,400,{errorMessage:"Choose a folder to scan first."});return}let E=!1;h.on("close",()=>{E=!0}),p.writeHead(200,{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive",...PI});let T=Yk({scanRoot:_,response:p,shouldAbort:()=>E});Mf(e.layout,T),p.end();return}if(b==="POST"&&S==="/harness/reveal"){p.writeHead(410,{"Content-Type":"text/plain"}),p.end("Use GET /api/harness/reveal/stream with a scan folder.");return}if(b==="POST"&&S==="/harness/submit"){let A=Bc(e.layout);if(A===null){let j=o(),M=lr(j.installVersion);Ne(p,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:Uu(fI(e.layout,{cloudAppOrigin:M,reveal:null,flashError:"Run reveal before submit.",importSectionExpanded:!0}))}));return}let _=await yt(h),E=new URLSearchParams(_),T=KC(E,A),C=Zk({layout:e.layout,sets:T});if(!C.ok){let j=o(),M=lr(j.installVersion);Ne(p,await n({title:"Harness",activePath:"/harness",installVersion:j.installVersion,body:Uu(fI(e.layout,{cloudAppOrigin:M,reveal:A,flashError:C.errorMessage??"Submit failed.",importSectionExpanded:!0}))}));return}ew(e.layout);let W=e.controllers.reportHarnessManifestIfConnected?.()?.ok===!0?"&synced=1":"&syncFailed=1";p.writeHead(303,{Location:`/harness?submitted=1&count=${C.writtenItemCount??0}${W}`}),p.end();return}if(b==="GET"&&S==="/writer-api"){let A=new URL(h.url??"/",`http://127.0.0.1:${43347}`),E=$()?.writerExecutionBackend??Ze(void 0),T=Be(e.layout.configPath),C=Ho(T),x=A.searchParams.get("saved")==="1"?"Writer API settings saved on this computer.":null,W=o();Ne(p,await n({title:"Writer API",activePath:"/writer-api",installVersion:W.installVersion,body:GC({writerExecutionBackend:E,secrets:C,flashMessage:x})}));return}if(b==="POST"&&S==="/writer-api"){let A=await yt(h),_=new URLSearchParams(A),E=_.get("writerExecutionBackend")?.trim()??"cli";sk({configPath:e.layout.configPath,writerExecutionBackend:Ze(E),anthropicApiKey:_.get("anthropicApiKey")??void 0,anthropicModel:_.get("anthropicModel")??void 0,openaiApiKey:_.get("openaiApiKey")??void 0,openaiModel:_.get("openaiModel")??void 0,googleApiKey:_.get("googleApiKey")??void 0,googleModel:_.get("googleModel")??void 0}),p.writeHead(303,{Location:"/writer-api?saved=1"}),p.end();return}if(b==="GET"&&S==="/estimates"){p.writeHead(302,{Location:"/history"}),p.end();return}if(b==="GET"&&S==="/history"){let A=o();Ne(p,await n({title:"History",activePath:"/history",installVersion:A.installVersion,body:LC({reportsDir:e.layout.reportsDir})}));return}if(b==="GET"&&S==="/knowledge"){let _=new URL(h.url??"/",`http://127.0.0.1:${43347}`).searchParams.get("q")?.trim()??"",E=o(),T=jE({layout:e.layout}),C=HE(T),x=_.length>0?await ma({layout:e.layout,query:_,limit:20}):pa(e.layout).slice(-50).reverse(),W=x.map(M=>{let B=DE(T,M.id),ie=B>0?` \xB7 used in ${B} dispatch(es)`:"";return`<article class="card"><div class="muted" title="${fe(M.createdAt)}">${fe(SI(M.createdAt))}${M.source?` \xB7 ${fe(M.source)}`:""}${ie}</div><pre>${fe(M.text)}</pre></article>`}).join(""),j=C.length>0?`<section class="card"><p class="eyebrow">Suggestions</p><h2>Save context as tools or rules</h2><ul>${C.map(M=>`<li><strong>P${M.priority}</strong> \u2014 ${fe(M.message)}</li>`).join("")}</ul><p class="muted">Accepting a cloud capability improvement still requires review in AWC \u2014 these hints are local on your computer.</p></section>`:"";Ne(p,await n({title:"Knowledge",activePath:"/knowledge",installVersion:E.installVersion,body:`<section class="card stack">
              <p class="eyebrow">Local RAG</p>
              <h1>Knowledge</h1>
              <p class="lede">Indexed chunks from finished agent turns on this computer. Retrieval counts update when dispatch injects a chunk into the next writer prompt.</p>
              <form class="search-row" method="GET" action="/knowledge">
                <input class="input" name="q" value="${fe(_)}" placeholder="Search local knowledge" aria-label="Search local knowledge" />
                <button class="btn btn-primary" type="submit">Search</button>
              </form>
              ${ece(_,x.length)}
            </section>${j}${W}`}));return}b==="POST"&&await yt(h),await u(p,"Not found")})().catch(S=>{console.error("[agent-witch-local-app]",S),p.writeHead(500),p.end("Internal error")})});y.on("error",h=>{if(h.code==="EADDRINUSE"){console.error(`[agent-witch] Local app port ${43347} already in use \u2014 skipping bind.`);return}console.error("[agent-witch] Local app server error:",h)});let P=oI();return y.on("close",()=>{P.stop()}),y.listen(43347,"127.0.0.1",()=>{try{ta()}catch(p){let S=p instanceof Error?p.message:String(p);console.error(`[agent-witch] writeGlobalTriggers failed: ${S}`)}console.log(`[agent-witch] Local app ${zr}`);let h=dy();h!==null&&console.warn(h)}),y},pp=e=>EP(e).publicKeyRaw});var vP=l(()=>{"use strict";dU();uU();Z4()});var e8={};St(e8,{runAgentWitchExternalLiveCli:()=>oce});var AI,Q4,rce,oce,t8=l(()=>{"use strict";AI=m(require("node:fs")),Q4=m(require("node:path"));qn();G();Al();d_();ae();vP();ae();rce=e=>{let t=Q4.default.join(e,"link-code.txt");if(!AI.default.existsSync(t))return null;let r=AI.default.readFileSync(t,"utf8").trim();return r.length>0?r:null},oce=()=>{bt("agent-witch-live");let e=v(),t=N(),r=rce(e),o=pp(t);up({layout:t,controllers:{getStatus:()=>{let n=Ce(t);return{wsConnected:fc(t,{socketOpen:!0}),lastHeartbeatAt:n?.lastAckAt??null,wakeError:null,linkCode:r,publicKeyRaw:o}},reviveWebSocket:()=>{TA({platform:process.platform,installDir:e,runners:{kickstartLaunchAgents:()=>Mn(e,process.platform),restartSystemdUserService:nc}}).then(n=>{n.ok||console.warn(`[agent-witch-live] Revive: ${n.message}`)})}}})}});var ko=R((FXe,n8)=>{"use strict";var r8=["nodebuffer","arraybuffer","fragments"],o8=typeof Blob<"u";o8&&r8.push("blob");n8.exports={BINARY_TYPES:r8,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:o8,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var mp=R(($Xe,CP)=>{"use strict";var{EMPTY_BUFFER:nce}=ko(),bI=Buffer[Symbol.species];function sce(e,t){if(e.length===0)return nce;if(e.length===1)return e[0];let r=Buffer.allocUnsafe(t),o=0;for(let n=0;n<e.length;n++){let s=e[n];r.set(s,o),o+=s.length}return o<t?new bI(r.buffer,r.byteOffset,o):r}function s8(e,t,r,o,n){for(let s=0;s<n;s++)r[o+s]=e[s]^t[s&3]}function i8(e,t){for(let r=0;r<e.length;r++)e[r]^=t[r&3]}function ice(e){return e.length===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.length)}function _I(e){if(_I.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=new bI(e):ArrayBuffer.isView(e)?t=new bI(e.buffer,e.byteOffset,e.byteLength):(t=Buffer.from(e),_I.readOnly=!1),t}CP.exports={concat:sce,mask:s8,toArrayBuffer:ice,toBuffer:_I,unmask:i8};if(!process.env.WS_NO_BUFFER_UTIL)try{let e=require("bufferutil");CP.exports.mask=function(t,r,o,n,s){s<48?s8(t,r,o,n,s):e.mask(t,r,o,n,s)},CP.exports.unmask=function(t,r){t.length<32?i8(t,r):e.unmask(t,r)}}catch{}});var c8=R((zXe,l8)=>{"use strict";var a8=Symbol("kDone"),kI=Symbol("kRun"),wI=class{constructor(t){this[a8]=()=>{this.pending--,this[kI]()},this.concurrency=t||1/0,this.jobs=[],this.pending=0}add(t){this.jobs.push(t),this[kI]()}[kI](){if(this.pending!==this.concurrency&&this.jobs.length){let t=this.jobs.shift();this.pending++,t(this[a8])}}};l8.exports=wI});var Za=R((UXe,m8)=>{"use strict";var gp=require("zlib"),d8=mp(),ace=c8(),{kStatusCode:u8}=ko(),lce=Buffer[Symbol.species],cce=Buffer.from([0,0,255,255]),xP=Symbol("permessage-deflate"),wo=Symbol("total-length"),Ya=Symbol("callback"),fn=Symbol("buffers"),Xa=Symbol("error"),LP,TI=class{constructor(t){if(this._options=t||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!LP){let r=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;LP=new ace(r)}}static get extensionName(){return"permessage-deflate"}offer(){let t={};return this._options.serverNoContextTakeover&&(t.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(t.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(t.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?t.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(t.client_max_window_bits=!0),t}accept(t){return t=this.normalizeParams(t),this.params=this._isServer?this.acceptAsServer(t):this.acceptAsClient(t),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let t=this._deflate[Ya];this._deflate.close(),this._deflate=null,t&&t(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(t){let r=this._options,o=t.find(n=>!(r.serverNoContextTakeover===!1&&n.server_no_context_takeover||n.server_max_window_bits&&(r.serverMaxWindowBits===!1||typeof r.serverMaxWindowBits=="number"&&r.serverMaxWindowBits>n.server_max_window_bits)||typeof r.clientMaxWindowBits=="number"&&(typeof n.client_max_window_bits=="number"?r.clientMaxWindowBits>n.client_max_window_bits:!n.client_max_window_bits)));if(!o)throw new Error("None of the extension offers can be accepted");return r.serverNoContextTakeover&&(o.server_no_context_takeover=!0),r.clientNoContextTakeover&&(o.client_no_context_takeover=!0),typeof r.serverMaxWindowBits=="number"&&(o.server_max_window_bits=r.serverMaxWindowBits),typeof r.clientMaxWindowBits=="number"?o.client_max_window_bits=r.clientMaxWindowBits:(o.client_max_window_bits===!0||r.clientMaxWindowBits===!1)&&delete o.client_max_window_bits,o}acceptAsClient(t){let r=t[0];if(this._options.clientNoContextTakeover===!1&&r.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!r.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(r.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&r.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return r}normalizeParams(t){return t.forEach(r=>{Object.keys(r).forEach(o=>{let n=r[o];if(n.length>1)throw new Error(`Parameter "${o}" must have only a single value`);if(n=n[0],o==="client_max_window_bits"){if(n!==!0){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else if(o==="server_max_window_bits"){let s=+n;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${o}": ${n}`);n=s}else if(o==="client_no_context_takeover"||o==="server_no_context_takeover"){if(n!==!0)throw new TypeError(`Invalid value for parameter "${o}": ${n}`)}else throw new Error(`Unknown parameter "${o}"`);r[o]=n})}),t}decompress(t,r,o){LP.add(n=>{this._decompress(t,r,(s,i)=>{n(),o(s,i)})})}compress(t,r,o){LP.add(n=>{this._compress(t,r,(s,i)=>{n(),o(s,i)})})}_decompress(t,r,o){let n=this._isServer?"client":"server";if(!this._inflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?gp.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=gp.createInflateRaw({...this._options.zlibInflateOptions,windowBits:i}),this._inflate[xP]=this,this._inflate[wo]=0,this._inflate[fn]=[],this._inflate.on("error",uce),this._inflate.on("data",p8)}this._inflate[Ya]=o,this._inflate.write(t),r&&this._inflate.write(cce),this._inflate.flush(()=>{let s=this._inflate[Xa];if(s){this._inflate.close(),this._inflate=null,o(s);return}let i=d8.concat(this._inflate[fn],this._inflate[wo]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[wo]=0,this._inflate[fn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._inflate.reset()),o(null,i)})}_compress(t,r,o){let n=this._isServer?"server":"client";if(!this._deflate){let s=`${n}_max_window_bits`,i=typeof this.params[s]!="number"?gp.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=gp.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:i}),this._deflate[wo]=0,this._deflate[fn]=[],this._deflate.on("data",dce)}this._deflate[Ya]=o,this._deflate.write(t),this._deflate.flush(gp.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=d8.concat(this._deflate[fn],this._deflate[wo]);r&&(s=new lce(s.buffer,s.byteOffset,s.length-4)),this._deflate[Ya]=null,this._deflate[wo]=0,this._deflate[fn]=[],r&&this.params[`${n}_no_context_takeover`]&&this._deflate.reset(),o(null,s)})}};m8.exports=TI;function dce(e){this[fn].push(e),this[wo]+=e.length}function p8(e){if(this[wo]+=e.length,this[xP]._maxPayload<1||this[wo]<=this[xP]._maxPayload){this[fn].push(e);return}this[Xa]=new RangeError("Max payload size exceeded"),this[Xa].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[Xa][u8]=1009,this.removeListener("data",p8),this.reset()}function uce(e){if(this[xP]._inflate=null,this[Xa]){this[Ya](this[Xa]);return}e[u8]=1007,this[Ya](e)}});var Qa=R((BXe,IP)=>{"use strict";var{isUtf8:g8}=require("buffer"),{hasBlob:pce}=ko(),mce=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function gce(e){return e>=1e3&&e<=1014&&e!==1004&&e!==1005&&e!==1006||e>=3e3&&e<=4999}function EI(e){let t=e.length,r=0;for(;r<t;)if((e[r]&128)===0)r++;else if((e[r]&224)===192){if(r+1===t||(e[r+1]&192)!==128||(e[r]&254)===192)return!1;r+=2}else if((e[r]&240)===224){if(r+2>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||e[r]===224&&(e[r+1]&224)===128||e[r]===237&&(e[r+1]&224)===160)return!1;r+=3}else if((e[r]&248)===240){if(r+3>=t||(e[r+1]&192)!==128||(e[r+2]&192)!==128||(e[r+3]&192)!==128||e[r]===240&&(e[r+1]&240)===128||e[r]===244&&e[r+1]>143||e[r]>244)return!1;r+=4}else return!1;return!0}function fce(e){return pce&&typeof e=="object"&&typeof e.arrayBuffer=="function"&&typeof e.type=="string"&&typeof e.stream=="function"&&(e[Symbol.toStringTag]==="Blob"||e[Symbol.toStringTag]==="File")}IP.exports={isBlob:fce,isValidStatusCode:gce,isValidUTF8:EI,tokenChars:mce};if(g8)IP.exports.isValidUTF8=function(e){return e.length<24?EI(e):g8(e)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let e=require("utf-8-validate");IP.exports.isValidUTF8=function(t){return t.length<32?EI(t):e(t)}}catch{}});var xI=R((GXe,b8)=>{"use strict";var{Writable:yce}=require("stream"),f8=Za(),{BINARY_TYPES:hce,EMPTY_BUFFER:y8,kStatusCode:Sce,kWebSocket:Pce}=ko(),{concat:RI,toArrayBuffer:Ace,unmask:bce}=mp(),{isValidStatusCode:_ce,isValidUTF8:h8}=Qa(),WP=Buffer[Symbol.species],Ht=0,S8=1,P8=2,A8=3,vI=4,CI=5,OP=6,LI=class extends yce{constructor(t={}){super(),this._allowSynchronousEvents=t.allowSynchronousEvents!==void 0?t.allowSynchronousEvents:!0,this._binaryType=t.binaryType||hce[0],this._extensions=t.extensions||{},this._isServer=!!t.isServer,this._maxBufferedChunks=t.maxBufferedChunks|0,this._maxFragments=t.maxFragments|0,this._maxPayload=t.maxPayload|0,this._skipUTF8Validation=!!t.skipUTF8Validation,this[Pce]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=Ht}_write(t,r,o){if(this._opcode===8&&this._state==Ht)return o();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){o(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=t.length,this._buffers.push(t),this.startLoop(o)}consume(t){if(this._bufferedBytes-=t,t===this._buffers[0].length)return this._buffers.shift();if(t<this._buffers[0].length){let o=this._buffers[0];return this._buffers[0]=new WP(o.buffer,o.byteOffset+t,o.length-t),new WP(o.buffer,o.byteOffset,t)}let r=Buffer.allocUnsafe(t);do{let o=this._buffers[0],n=r.length-t;t>=o.length?r.set(this._buffers.shift(),n):(r.set(new Uint8Array(o.buffer,o.byteOffset,t),n),this._buffers[0]=new WP(o.buffer,o.byteOffset+t,o.length-t)),t-=o.length}while(t>0);return r}startLoop(t){this._loop=!0;do switch(this._state){case Ht:this.getInfo(t);break;case S8:this.getPayloadLength16(t);break;case P8:this.getPayloadLength64(t);break;case A8:this.getMask();break;case vI:this.getData(t);break;case CI:case OP:this._loop=!1;return}while(this._loop);this._errored||t()}getInfo(t){if(this._bufferedBytes<2){this._loop=!1;return}let r=this.consume(2);if((r[0]&48)!==0){let n=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");t(n);return}let o=(r[0]&64)===64;if(o&&!this._extensions[f8.extensionName]){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._fin=(r[0]&128)===128,this._opcode=r[0]&15,this._payloadLength=r[1]&127,this._opcode===0){if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(!this._fragmented){let n=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}this._compressed=o}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let n=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");t(n);return}if(o){let n=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");t(n);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let n=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");t(n);return}}else{let n=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");t(n);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(r[1]&128)===128,this._isServer){if(!this._masked){let n=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");t(n);return}}else if(this._masked){let n=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");t(n);return}this._payloadLength===126?this._state=S8:this._payloadLength===127?this._state=P8:this.haveLength(t)}getPayloadLength16(t){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(t)}getPayloadLength64(t){if(this._bufferedBytes<8){this._loop=!1;return}let r=this.consume(8),o=r.readUInt32BE(0);if(o>Math.pow(2,21)-1){let n=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");t(n);return}this._payloadLength=o*Math.pow(2,32)+r.readUInt32BE(4),this.haveLength(t)}haveLength(t){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let r=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(r);return}this._masked?this._state=A8:this._state=vI}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=vI}getData(t){let r=y8;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}r=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&bce(r,this._mask)}if(this._opcode>7){this.controlMessage(r,t);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let o=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");t(o);return}if(this._compressed){this._state=CI,this.decompress(r,t);return}r.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(r)),this.dataMessage(t)}decompress(t,r){this._extensions[f8.extensionName].decompress(t,this._fin,(n,s)=>{if(n)return r(n);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let i=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");r(i);return}this._fragments.push(s)}this.dataMessage(r),this._state===Ht&&this.startLoop(r)})}dataMessage(t){if(!this._fin){this._state=Ht;return}let r=this._messageLength,o=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let n;this._binaryType==="nodebuffer"?n=RI(o,r):this._binaryType==="arraybuffer"?n=Ace(RI(o,r)):this._binaryType==="blob"?n=new Blob(o):n=o,this._allowSynchronousEvents?(this.emit("message",n,!0),this._state=Ht):(this._state=OP,setImmediate(()=>{this.emit("message",n,!0),this._state=Ht,this.startLoop(t)}))}else{let n=RI(o,r);if(!this._skipUTF8Validation&&!h8(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._state===CI||this._allowSynchronousEvents?(this.emit("message",n,!1),this._state=Ht):(this._state=OP,setImmediate(()=>{this.emit("message",n,!1),this._state=Ht,this.startLoop(t)}))}}controlMessage(t,r){if(this._opcode===8){if(t.length===0)this._loop=!1,this.emit("conclude",1005,y8),this.end();else{let o=t.readUInt16BE(0);if(!_ce(o)){let s=this.createError(RangeError,`invalid status code ${o}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");r(s);return}let n=new WP(t.buffer,t.byteOffset+2,t.length-2);if(!this._skipUTF8Validation&&!h8(n)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");r(s);return}this._loop=!1,this.emit("conclude",o,n),this.end()}this._state=Ht;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",t),this._state=Ht):(this._state=OP,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",t),this._state=Ht,this.startLoop(r)}))}createError(t,r,o,n,s){this._loop=!1,this._errored=!0;let i=new t(o?`Invalid WebSocket frame: ${r}`:r);return Error.captureStackTrace(i,this.createError),i.code=s,i[Sce]=n,i}};b8.exports=LI});var OI=R((KXe,w8)=>{"use strict";var{Duplex:VXe}=require("stream"),{randomFillSync:kce}=require("crypto"),{types:{isUint8Array:wce}}=require("util"),_8=Za(),{EMPTY_BUFFER:Tce,kWebSocket:Ece,NOOP:Rce}=ko(),{isBlob:el,isValidStatusCode:vce}=Qa(),{mask:k8,toBuffer:Gs}=mp(),Ft=Symbol("kByteLength"),Cce=Buffer.alloc(4),MP=8*1024,Vs,tl=MP,dr=0,Lce=1,xce=2,II=class e{constructor(t,r,o){this._extensions=r||{},o&&(this._generateMask=o,this._maskBuffer=Buffer.alloc(4)),this._socket=t,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=dr,this.onerror=Rce,this[Ece]=void 0}static frame(t,r){let o,n=!1,s=2,i=!1;r.mask&&(o=r.maskBuffer||Cce,r.generateMask?r.generateMask(o):(tl===MP&&(Vs===void 0&&(Vs=Buffer.alloc(MP)),kce(Vs,0,MP),tl=0),o[0]=Vs[tl++],o[1]=Vs[tl++],o[2]=Vs[tl++],o[3]=Vs[tl++]),i=(o[0]|o[1]|o[2]|o[3])===0,s=6);let a;typeof t=="string"?(!r.mask||i)&&r[Ft]!==void 0?a=r[Ft]:(t=Buffer.from(t),a=t.length):(a=t.length,n=r.mask&&r.readOnly&&!i);let c=a;a>=65536?(s+=8,c=127):a>125&&(s+=2,c=126);let d=Buffer.allocUnsafe(n?a+s:s);return d[0]=r.fin?r.opcode|128:r.opcode,r.rsv1&&(d[0]|=64),d[1]=c,c===126?d.writeUInt16BE(a,2):c===127&&(d[2]=d[3]=0,d.writeUIntBE(a,4,6)),r.mask?(d[1]|=128,d[s-4]=o[0],d[s-3]=o[1],d[s-2]=o[2],d[s-1]=o[3],i?[d,t]:n?(k8(t,o,d,s,a),[d]):(k8(t,o,t,0,a),[d,t])):[d,t]}close(t,r,o,n){let s;if(t===void 0)s=Tce;else{if(typeof t!="number"||!vce(t))throw new TypeError("First argument must be a valid error code number");if(r===void 0||!r.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(t,0);else{let a=Buffer.byteLength(r);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(t,0),typeof r=="string")s.write(r,2);else if(wce(r))s.set(r,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let i={[Ft]:s.length,fin:!0,generateMask:this._generateMask,mask:o,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==dr?this.enqueue([this.dispatch,s,!1,i,n]):this.sendFrame(e.frame(s,i),n)}ping(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):el(t)?(n=t.size,s=!1):(t=Gs(t),n=t.length,s=Gs.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ft]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};el(t)?this._state!==dr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==dr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}pong(t,r,o){let n,s;if(typeof t=="string"?(n=Buffer.byteLength(t),s=!1):el(t)?(n=t.size,s=!1):(t=Gs(t),n=t.length,s=Gs.readOnly),n>125)throw new RangeError("The data size must not be greater than 125 bytes");let i={[Ft]:n,fin:!0,generateMask:this._generateMask,mask:r,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};el(t)?this._state!==dr?this.enqueue([this.getBlobData,t,!1,i,o]):this.getBlobData(t,!1,i,o):this._state!==dr?this.enqueue([this.dispatch,t,!1,i,o]):this.sendFrame(e.frame(t,i),o)}send(t,r,o){let n=this._extensions[_8.extensionName],s=r.binary?2:1,i=r.compress,a,c;typeof t=="string"?(a=Buffer.byteLength(t),c=!1):el(t)?(a=t.size,c=!1):(t=Gs(t),a=t.length,c=Gs.readOnly),this._firstFragment?(this._firstFragment=!1,i&&n&&n.params[n._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(i=a>=n._threshold),this._compress=i):(i=!1,s=0),r.fin&&(this._firstFragment=!0);let d={[Ft]:a,fin:r.fin,generateMask:this._generateMask,mask:r.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:c,rsv1:i};el(t)?this._state!==dr?this.enqueue([this.getBlobData,t,this._compress,d,o]):this.getBlobData(t,this._compress,d,o):this._state!==dr?this.enqueue([this.dispatch,t,this._compress,d,o]):this.dispatch(t,this._compress,d,o)}getBlobData(t,r,o,n){this._bufferedBytes+=o[Ft],this._state=xce,t.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(WI,this,a,n);return}this._bufferedBytes-=o[Ft];let i=Gs(s);r?this.dispatch(i,r,o,n):(this._state=dr,this.sendFrame(e.frame(i,o),n),this.dequeue())}).catch(s=>{process.nextTick(Ice,this,s,n)})}dispatch(t,r,o,n){if(!r){this.sendFrame(e.frame(t,o),n);return}let s=this._extensions[_8.extensionName];this._bufferedBytes+=o[Ft],this._state=Lce,s.compress(t,o.fin,(i,a)=>{if(this._socket.destroyed){let c=new Error("The socket was closed while data was being compressed");WI(this,c,n);return}this._bufferedBytes-=o[Ft],this._state=dr,o.readOnly=!1,this.sendFrame(e.frame(a,o),n),this.dequeue()})}dequeue(){for(;this._state===dr&&this._queue.length;){let t=this._queue.shift();this._bufferedBytes-=t[3][Ft],Reflect.apply(t[0],this,t.slice(1))}}enqueue(t){this._bufferedBytes+=t[3][Ft],this._queue.push(t)}sendFrame(t,r){t.length===2?(this._socket.cork(),this._socket.write(t[0]),this._socket.write(t[1],r),this._socket.uncork()):this._socket.write(t[0],r)}};w8.exports=II;function WI(e,t,r){typeof r=="function"&&r(t);for(let o=0;o<e._queue.length;o++){let n=e._queue[o],s=n[n.length-1];typeof s=="function"&&s(t)}}function Ice(e,t,r){WI(e,t,r),e.onerror(t)}});var W8=R((qXe,I8)=>{"use strict";var{kForOnEventAttribute:fp,kListener:MI}=ko(),T8=Symbol("kCode"),E8=Symbol("kData"),R8=Symbol("kError"),v8=Symbol("kMessage"),C8=Symbol("kReason"),rl=Symbol("kTarget"),L8=Symbol("kType"),x8=Symbol("kWasClean"),To=class{constructor(t){this[rl]=null,this[L8]=t}get target(){return this[rl]}get type(){return this[L8]}};Object.defineProperty(To.prototype,"target",{enumerable:!0});Object.defineProperty(To.prototype,"type",{enumerable:!0});var Ks=class extends To{constructor(t,r={}){super(t),this[T8]=r.code===void 0?0:r.code,this[C8]=r.reason===void 0?"":r.reason,this[x8]=r.wasClean===void 0?!1:r.wasClean}get code(){return this[T8]}get reason(){return this[C8]}get wasClean(){return this[x8]}};Object.defineProperty(Ks.prototype,"code",{enumerable:!0});Object.defineProperty(Ks.prototype,"reason",{enumerable:!0});Object.defineProperty(Ks.prototype,"wasClean",{enumerable:!0});var ol=class extends To{constructor(t,r={}){super(t),this[R8]=r.error===void 0?null:r.error,this[v8]=r.message===void 0?"":r.message}get error(){return this[R8]}get message(){return this[v8]}};Object.defineProperty(ol.prototype,"error",{enumerable:!0});Object.defineProperty(ol.prototype,"message",{enumerable:!0});var yp=class extends To{constructor(t,r={}){super(t),this[E8]=r.data===void 0?null:r.data}get data(){return this[E8]}};Object.defineProperty(yp.prototype,"data",{enumerable:!0});var Wce={addEventListener(e,t,r={}){for(let n of this.listeners(e))if(!r[fp]&&n[MI]===t&&!n[fp])return;let o;if(e==="message")o=function(s,i){let a=new yp("message",{data:i?s:s.toString()});a[rl]=this,jP(t,this,a)};else if(e==="close")o=function(s,i){let a=new Ks("close",{code:s,reason:i.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[rl]=this,jP(t,this,a)};else if(e==="error")o=function(s){let i=new ol("error",{error:s,message:s.message});i[rl]=this,jP(t,this,i)};else if(e==="open")o=function(){let s=new To("open");s[rl]=this,jP(t,this,s)};else return;o[fp]=!!r[fp],o[MI]=t,r.once?this.once(e,o):this.on(e,o)},removeEventListener(e,t){for(let r of this.listeners(e))if(r[MI]===t&&!r[fp]){this.removeListener(e,r);break}}};I8.exports={CloseEvent:Ks,ErrorEvent:ol,Event:To,EventTarget:Wce,MessageEvent:yp};function jP(e,t,r){typeof e=="object"&&e.handleEvent?e.handleEvent.call(e,r):e.call(t,r)}});var NP=R((JXe,O8)=>{"use strict";var{tokenChars:hp}=Qa();function Dr(e,t,r){e[t]===void 0?e[t]=[r]:e[t].push(r)}function Oce(e){let t=Object.create(null),r=Object.create(null),o=!1,n=!1,s=!1,i,a,c=-1,d=-1,u=-1,g=0;for(;g<e.length;g++)if(d=e.charCodeAt(g),i===void 0)if(u===-1&&hp[d]===1)c===-1&&(c=g);else if(g!==0&&(d===32||d===9))u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(c,u);d===44?(Dr(t,y,r),r=Object.create(null)):i=y,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);else if(a===void 0)if(u===-1&&hp[d]===1)c===-1&&(c=g);else if(d===32||d===9)u===-1&&c!==-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g),Dr(r,e.slice(c,u),!0),d===44&&(Dr(t,i,r),r=Object.create(null),i=void 0),c=u=-1}else if(d===61&&c!==-1&&u===-1)a=e.slice(c,g),c=u=-1;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(n){if(hp[d]!==1)throw new SyntaxError(`Unexpected character at index ${g}`);c===-1?c=g:o||(o=!0),n=!1}else if(s)if(hp[d]===1)c===-1&&(c=g);else if(d===34&&c!==-1)s=!1,u=g;else if(d===92)n=!0;else throw new SyntaxError(`Unexpected character at index ${g}`);else if(d===34&&e.charCodeAt(g-1)===61)s=!0;else if(u===-1&&hp[d]===1)c===-1&&(c=g);else if(c!==-1&&(d===32||d===9))u===-1&&(u=g);else if(d===59||d===44){if(c===-1)throw new SyntaxError(`Unexpected character at index ${g}`);u===-1&&(u=g);let y=e.slice(c,u);o&&(y=y.replace(/\\/g,""),o=!1),Dr(r,a,y),d===44&&(Dr(t,i,r),r=Object.create(null),i=void 0),a=void 0,c=u=-1}else throw new SyntaxError(`Unexpected character at index ${g}`);if(c===-1||s||d===32||d===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=g);let f=e.slice(c,u);return i===void 0?Dr(t,f,r):(a===void 0?Dr(r,f,!0):o?Dr(r,a,f.replace(/\\/g,"")):Dr(r,a,f),Dr(t,i,r)),t}function Mce(e){return Object.keys(e).map(t=>{let r=e[t];return Array.isArray(r)||(r=[r]),r.map(o=>[t].concat(Object.keys(o).map(n=>{let s=o[n];return Array.isArray(s)||(s=[s]),s.map(i=>i===!0?n:`${n}=${i}`).join("; ")})).join("; ")).join(", ")}).join(", ")}O8.exports={format:Mce,parse:Oce}});var $P=R((ZXe,V8)=>{"use strict";var jce=require("events"),Nce=require("https"),Dce=require("http"),N8=require("net"),Hce=require("tls"),{randomBytes:Fce,createHash:$ce}=require("crypto"),{Duplex:YXe,Readable:XXe}=require("stream"),{URL:jI}=require("url"),yn=Za(),zce=xI(),Uce=OI(),{isBlob:Bce}=Qa(),{BINARY_TYPES:M8,CLOSE_TIMEOUT:Gce,EMPTY_BUFFER:DP,GUID:Vce,kForOnEventAttribute:NI,kListener:Kce,kStatusCode:qce,kWebSocket:De,NOOP:D8}=ko(),{EventTarget:{addEventListener:Jce,removeEventListener:Yce}}=W8(),{format:Xce,parse:Zce}=NP(),{toBuffer:Qce}=mp(),H8=Symbol("kAborted"),DI=[8,13],Eo=["CONNECTING","OPEN","CLOSING","CLOSED"],ede=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,se=class e extends jce{constructor(t,r,o){super(),this._binaryType=M8[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=DP,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=e.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,t!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,r===void 0?!o||o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]:Array.isArray(r)||(typeof r=="object"&&r!==null?(o=r,o.protocols===void 0?r=[]:Array.isArray(o.protocols)?r=o.protocols:r=[o.protocols]):r=[r]),F8(this,t,r,o)):(this._autoPong=o.autoPong,this._closeTimeout=o.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(t){M8.includes(t)&&(this._binaryType=t,this._receiver&&(this._receiver._binaryType=t))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(t,r,o){let n=new zce({allowSynchronousEvents:o.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:o.maxBufferedChunks,maxFragments:o.maxFragments,maxPayload:o.maxPayload,skipUTF8Validation:o.skipUTF8Validation}),s=new Uce(t,this._extensions,o.generateMask);this._receiver=n,this._sender=s,this._socket=t,n[De]=this,s[De]=this,t[De]=this,n.on("conclude",ode),n.on("drain",nde),n.on("error",sde),n.on("message",ide),n.on("ping",ade),n.on("pong",lde),s.onerror=cde,t.setTimeout&&t.setTimeout(0),t.setNoDelay&&t.setNoDelay(),r.length>0&&t.unshift(r),t.on("close",U8),t.on("data",FP),t.on("end",B8),t.on("error",G8),this._readyState=e.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[yn.extensionName]&&this._extensions[yn.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=e.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(t,r){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ct(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===e.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._sender.close(t,r,!this._isServer,o=>{o||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),this._readyState=e.CLOSING,z8(this)}}pause(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!0,this._socket.pause())}ping(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){HI(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.ping(t||DP,r,o)}pong(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"?(o=t,t=r=void 0):typeof r=="function"&&(o=r,r=void 0),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){HI(this,t,o);return}r===void 0&&(r=!this._isServer),this._sender.pong(t||DP,r,o)}resume(){this.readyState===e.CONNECTING||this.readyState===e.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(t,r,o){if(this.readyState===e.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof r=="function"&&(o=r,r={}),typeof t=="number"&&(t=t.toString()),this.readyState!==e.OPEN){HI(this,t,o);return}let n={binary:typeof t!="string",mask:!this._isServer,compress:!0,fin:!0,...r};this._extensions[yn.extensionName]||(n.compress=!1),this._sender.send(t||DP,n,o)}terminate(){if(this.readyState!==e.CLOSED){if(this.readyState===e.CONNECTING){Ct(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=e.CLOSING,this._socket.destroy())}}};Object.defineProperty(se,"CONNECTING",{enumerable:!0,value:Eo.indexOf("CONNECTING")});Object.defineProperty(se.prototype,"CONNECTING",{enumerable:!0,value:Eo.indexOf("CONNECTING")});Object.defineProperty(se,"OPEN",{enumerable:!0,value:Eo.indexOf("OPEN")});Object.defineProperty(se.prototype,"OPEN",{enumerable:!0,value:Eo.indexOf("OPEN")});Object.defineProperty(se,"CLOSING",{enumerable:!0,value:Eo.indexOf("CLOSING")});Object.defineProperty(se.prototype,"CLOSING",{enumerable:!0,value:Eo.indexOf("CLOSING")});Object.defineProperty(se,"CLOSED",{enumerable:!0,value:Eo.indexOf("CLOSED")});Object.defineProperty(se.prototype,"CLOSED",{enumerable:!0,value:Eo.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(e=>{Object.defineProperty(se.prototype,e,{enumerable:!0})});["open","error","close","message"].forEach(e=>{Object.defineProperty(se.prototype,`on${e}`,{enumerable:!0,get(){for(let t of this.listeners(e))if(t[NI])return t[Kce];return null},set(t){for(let r of this.listeners(e))if(r[NI]){this.removeListener(e,r);break}typeof t=="function"&&this.addEventListener(e,t,{[NI]:!0})}})});se.prototype.addEventListener=Jce;se.prototype.removeEventListener=Yce;V8.exports=se;function F8(e,t,r,o){let n={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:Gce,protocolVersion:DI[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...o,socketPath:void 0,hostname:void 0,protocol:void 0,protocols:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(e._autoPong=n.autoPong,e._closeTimeout=n.closeTimeout,!DI.includes(n.protocolVersion))throw new RangeError(`Unsupported protocol version: ${n.protocolVersion} (supported versions: ${DI.join(", ")})`);let s;if(t instanceof jI)s=t;else try{s=new jI(t)}catch{throw new SyntaxError(`Invalid URL: ${t}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),e._url=s.href;let i=s.protocol==="wss:",a=s.protocol==="ws+unix:",c;if(s.protocol!=="ws:"&&!i&&!a?c=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?c="The URL's pathname is empty":s.hash&&(c="The URL contains a fragment identifier"),c){let h=new SyntaxError(c);if(e._redirects===0)throw h;HP(e,h);return}let d=i?443:80,u=Fce(16).toString("base64"),g=i?Nce.request:Dce.request,f=new Set,y;if(n.createConnection=n.createConnection||(i?rde:tde),n.defaultPort=n.defaultPort||d,n.port=s.port||d,n.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,n.headers={...n.headers,"Sec-WebSocket-Version":n.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},n.path=s.pathname+s.search,n.timeout=n.handshakeTimeout,n.perMessageDeflate&&(y=new yn({...n.perMessageDeflate,isServer:!1,maxPayload:n.maxPayload}),n.headers["Sec-WebSocket-Extensions"]=Xce({[yn.extensionName]:y.offer()})),r.length){for(let h of r){if(typeof h!="string"||!ede.test(h)||f.has(h))throw new SyntaxError("An invalid or duplicated subprotocol was specified");f.add(h)}n.headers["Sec-WebSocket-Protocol"]=r.join(",")}if(n.origin&&(n.protocolVersion<13?n.headers["Sec-WebSocket-Origin"]=n.origin:n.headers.Origin=n.origin),(s.username||s.password)&&(n.auth=`${s.username}:${s.password}`),a){let h=n.path.split(":");n.socketPath=h[0],n.path=h[1]}let P;if(n.followRedirects){if(e._redirects===0){e._originalIpc=a,e._originalSecure=i,e._originalHostOrSocketPath=a?n.socketPath:s.host;let h=o&&o.headers;if(o={...o,headers:{}},h)for(let[p,S]of Object.entries(h))o.headers[p.toLowerCase()]=S}else if(e.listenerCount("redirect")===0){let h=a?e._originalIpc?n.socketPath===e._originalHostOrSocketPath:!1:e._originalIpc?!1:s.host===e._originalHostOrSocketPath;(!h||e._originalSecure&&!i)&&(delete n.headers.authorization,delete n.headers.cookie,h||delete n.headers.host,n.auth=void 0)}n.auth&&!o.headers.authorization&&(o.headers.authorization="Basic "+Buffer.from(n.auth).toString("base64")),P=e._req=g(n),e._redirects&&e.emit("redirect",e.url,P)}else P=e._req=g(n);n.timeout&&P.on("timeout",()=>{Ct(e,P,"Opening handshake has timed out")}),P.on("error",h=>{P===null||P[H8]||(P=e._req=null,HP(e,h))}),P.on("response",h=>{let p=h.headers.location,S=h.statusCode;if(p&&n.followRedirects&&S>=300&&S<400){if(++e._redirects>n.maxRedirects){Ct(e,P,"Maximum redirects exceeded");return}P.abort();let b;try{b=new jI(p,t)}catch{let A=new SyntaxError(`Invalid URL: ${p}`);HP(e,A);return}F8(e,b,r,o)}else e.emit("unexpected-response",P,h)||Ct(e,P,`Unexpected server response: ${h.statusCode}`)}),P.on("upgrade",(h,p,S)=>{if(e.emit("upgrade",h),e.readyState!==se.CONNECTING)return;P=e._req=null;let b=h.headers.upgrade;if(b===void 0||b.toLowerCase()!=="websocket"){Ct(e,p,"Invalid Upgrade header");return}let k=$ce("sha1").update(u+Vce).digest("base64");if(h.headers["sec-websocket-accept"]!==k){Ct(e,p,"Invalid Sec-WebSocket-Accept header");return}let A=h.headers["sec-websocket-protocol"],_;if(A!==void 0?f.size?f.has(A)||(_="Server sent an invalid subprotocol"):_="Server sent a subprotocol but none was requested":f.size&&(_="Server sent no subprotocol"),_){Ct(e,p,_);return}A&&(e._protocol=A);let E=h.headers["sec-websocket-extensions"];if(E!==void 0){if(!y){Ct(e,p,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let T;try{T=Zce(E)}catch{Ct(e,p,"Invalid Sec-WebSocket-Extensions header");return}let C=Object.keys(T);if(C.length!==1||C[0]!==yn.extensionName){Ct(e,p,"Server indicated an extension that was not requested");return}try{y.accept(T[yn.extensionName])}catch{Ct(e,p,"Invalid Sec-WebSocket-Extensions header");return}e._extensions[yn.extensionName]=y}e.setSocket(p,S,{allowSynchronousEvents:n.allowSynchronousEvents,generateMask:n.generateMask,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation})}),n.finishRequest?n.finishRequest(P,e):P.end()}function HP(e,t){e._readyState=se.CLOSING,e._errorEmitted=!0,e.emit("error",t),e.emitClose()}function tde(e){return e.path=e.socketPath,N8.connect(e)}function rde(e){return e.path=void 0,!e.servername&&e.servername!==""&&(e.servername=N8.isIP(e.host)?"":e.host),Hce.connect(e)}function Ct(e,t,r){e._readyState=se.CLOSING;let o=new Error(r);Error.captureStackTrace(o,Ct),t.setHeader?(t[H8]=!0,t.abort(),t.socket&&!t.socket.destroyed&&t.socket.destroy(),process.nextTick(HP,e,o)):(t.destroy(o),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function HI(e,t,r){if(t){let o=Bce(t)?t.size:Qce(t).length;e._socket?e._sender._bufferedBytes+=o:e._bufferedAmount+=o}if(r){let o=new Error(`WebSocket is not open: readyState ${e.readyState} (${Eo[e.readyState]})`);process.nextTick(r,o)}}function ode(e,t){let r=this[De];r._closeFrameReceived=!0,r._closeMessage=t,r._closeCode=e,r._socket[De]!==void 0&&(r._socket.removeListener("data",FP),process.nextTick($8,r._socket),e===1005?r.close():r.close(e,t))}function nde(){let e=this[De];e.isPaused||e._socket.resume()}function sde(e){let t=this[De];t._socket[De]!==void 0&&(t._socket.removeListener("data",FP),process.nextTick($8,t._socket),t.close(e[qce])),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e))}function j8(){this[De].emitClose()}function ide(e,t){this[De].emit("message",e,t)}function ade(e){let t=this[De];t._autoPong&&t.pong(e,!this._isServer,D8),t.emit("ping",e)}function lde(e){this[De].emit("pong",e)}function $8(e){e.resume()}function cde(e){let t=this[De];t.readyState!==se.CLOSED&&(t.readyState===se.OPEN&&(t._readyState=se.CLOSING,z8(t)),this._socket.end(),t._errorEmitted||(t._errorEmitted=!0,t.emit("error",e)))}function z8(e){e._closeTimer=setTimeout(e._socket.destroy.bind(e._socket),e._closeTimeout)}function U8(){let e=this[De];if(this.removeListener("close",U8),this.removeListener("data",FP),this.removeListener("end",B8),e._readyState=se.CLOSING,!this._readableState.endEmitted&&!e._closeFrameReceived&&!e._receiver._writableState.errorEmitted&&this._readableState.length!==0){let t=this.read(this._readableState.length);e._receiver.write(t)}e._receiver.end(),this[De]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",j8),e._receiver.on("finish",j8))}function FP(e){this[De]._receiver.write(e)||this.pause()}function B8(){let e=this[De];e._readyState=se.CLOSING,e._receiver.end(),this.end()}function G8(){let e=this[De];this.removeListener("error",G8),this.on("error",D8),e&&(e._readyState=se.CLOSING,this.destroy())}});var Y8=R((e9e,J8)=>{"use strict";var QXe=$P(),{Duplex:dde}=require("stream");function K8(e){e.emit("close")}function ude(){!this.destroyed&&this._writableState.finished&&this.destroy()}function q8(e){this.removeListener("error",q8),this.destroy(),this.listenerCount("error")===0&&this.emit("error",e)}function pde(e,t){let r=!0,o=new dde({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",function(s,i){let a=!i&&o._readableState.objectMode?s.toString():s;o.push(a)||e.pause()}),e.once("error",function(s){o.destroyed||(r=!1,o.destroy(s))}),e.once("close",function(){o.destroyed||o.push(null)}),o._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(K8,o);return}let i=!1;e.once("error",function(c){i=!0,s(c)}),e.once("close",function(){i||s(n),process.nextTick(K8,o)}),r&&e.terminate()},o._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){o._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),o._readableState.endEmitted&&o.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},o._read=function(){e.isPaused&&e.resume()},o._write=function(n,s,i){if(e.readyState===e.CONNECTING){e.once("open",function(){o._write(n,s,i)});return}e.send(n,i)},o.on("end",ude),o.on("error",q8),o}J8.exports=pde});var FI=R((t9e,X8)=>{"use strict";var{tokenChars:mde}=Qa();function gde(e){let t=new Set,r=-1,o=-1,n=0;for(n;n<e.length;n++){let i=e.charCodeAt(n);if(o===-1&&mde[i]===1)r===-1&&(r=n);else if(n!==0&&(i===32||i===9))o===-1&&r!==-1&&(o=n);else if(i===44){if(r===-1)throw new SyntaxError(`Unexpected character at index ${n}`);o===-1&&(o=n);let a=e.slice(r,o);if(t.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);t.add(a),r=o=-1}else throw new SyntaxError(`Unexpected character at index ${n}`)}if(r===-1||o!==-1)throw new SyntaxError("Unexpected end of input");let s=e.slice(r,n);if(t.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return t.add(s),t}X8.exports={parse:gde}});var n3=R((o9e,o3)=>{"use strict";var fde=require("events"),zP=require("http"),{Duplex:r9e}=require("stream"),{createHash:yde}=require("crypto"),Z8=NP(),qs=Za(),hde=FI(),Sde=$P(),{CLOSE_TIMEOUT:Pde,GUID:Ade,kWebSocket:bde}=ko(),_de=/^[+/0-9A-Za-z]{22}==$/,Q8=0,e3=1,r3=2,$I=class extends fde{constructor(t,r){if(super(),t={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:Pde,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:Sde,...t},t.port==null&&!t.server&&!t.noServer||t.port!=null&&(t.server||t.noServer)||t.server&&t.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(t.port!=null?(this._server=zP.createServer((o,n)=>{let s=zP.STATUS_CODES[426];n.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),n.end(s)}),this._server.listen(t.port,t.host,t.backlog,r)):t.server&&(this._server=t.server),this._server){let o=this.emit.bind(this,"connection");this._removeListeners=kde(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(n,s,i)=>{this.handleUpgrade(n,s,i,o)}})}t.perMessageDeflate===!0&&(t.perMessageDeflate={}),t.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=t,this._state=Q8}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(t){if(this._state===r3){t&&this.once("close",()=>{t(new Error("The server is not running"))}),process.nextTick(Sp,this);return}if(t&&this.once("close",t),this._state!==e3)if(this._state=e3,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Sp,this):process.nextTick(Sp,this);else{let r=this._server;this._removeListeners(),this._removeListeners=this._server=null,r.close(()=>{Sp(this)})}}shouldHandle(t){if(this.options.path){let r=t.url.indexOf("?");if((r!==-1?t.url.slice(0,r):t.url)!==this.options.path)return!1}return!0}handleUpgrade(t,r,o,n){r.on("error",t3);let s=t.headers["sec-websocket-key"],i=t.headers.upgrade,a=+t.headers["sec-websocket-version"];if(t.method!=="GET"){Js(this,t,r,405,"Invalid HTTP method");return}if(i===void 0||i.toLowerCase()!=="websocket"){Js(this,t,r,400,"Invalid Upgrade header");return}if(s===void 0||!_de.test(s)){Js(this,t,r,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Js(this,t,r,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(t)){Pp(r,400);return}let c=t.headers["sec-websocket-protocol"],d=new Set;if(c!==void 0)try{d=hde.parse(c)}catch{Js(this,t,r,400,"Invalid Sec-WebSocket-Protocol header");return}let u=t.headers["sec-websocket-extensions"],g={};if(this.options.perMessageDeflate&&u!==void 0){let f=new qs({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let y=Z8.parse(u);y[qs.extensionName]&&(f.accept(y[qs.extensionName]),g[qs.extensionName]=f)}catch{Js(this,t,r,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let f={origin:t.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(t.socket.authorized||t.socket.encrypted),req:t};if(this.options.verifyClient.length===2){this.options.verifyClient(f,(y,P,h,p)=>{if(!y)return Pp(r,P||401,h,p);this.completeUpgrade(g,s,d,t,r,o,n)});return}if(!this.options.verifyClient(f))return Pp(r,401)}this.completeUpgrade(g,s,d,t,r,o,n)}completeUpgrade(t,r,o,n,s,i,a){if(!s.readable||!s.writable)return s.destroy();if(s[bde])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>Q8)return Pp(s,503);let d=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${yde("sha1").update(r+Ade).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(o.size){let g=this.options.handleProtocols?this.options.handleProtocols(o,n):o.values().next().value;g&&(d.push(`Sec-WebSocket-Protocol: ${g}`),u._protocol=g)}if(t[qs.extensionName]){let g=t[qs.extensionName].params,f=Z8.format({[qs.extensionName]:[g]});d.push(`Sec-WebSocket-Extensions: ${f}`),u._extensions=t}this.emit("headers",d,n),s.write(d.concat(`\r
`).join(`\r
`)),s.removeListener("error",t3),u.setSocket(s,i,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Sp,this)})),a(u,n)}};o3.exports=$I;function kde(e,t){for(let r of Object.keys(t))e.on(r,t[r]);return function(){for(let o of Object.keys(t))e.removeListener(o,t[o])}}function Sp(e){e._state=r3,e.emit("close")}function t3(){this.destroy()}function Pp(e,t,r,o){r=r||zP.STATUS_CODES[t],o={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(r),...o},e.once("finish",e.destroy),e.end(`HTTP/1.1 ${t} ${zP.STATUS_CODES[t]}\r
`+Object.keys(o).map(n=>`${n}: ${o[n]}`).join(`\r
`)+`\r
\r
`+r)}function Js(e,t,r,o,n,s){if(e.listenerCount("wsClientError")){let i=new Error(n);Error.captureStackTrace(i,Js),e.emit("wsClientError",i,r,t)}else Pp(r,o,n,s)}});var wde,Tde,Ede,Rde,vde,Cde,s3,Lde,Ap,i3=l(()=>{wde=m(Y8(),1),Tde=m(NP(),1),Ede=m(Za(),1),Rde=m(xI(),1),vde=m(OI(),1),Cde=m(FI(),1),s3=m($P(),1),Lde=m(n3(),1),Ap=s3.default});var zI,a3=l(()=>{"use strict";zI=e=>{if(e===void 0)return!1;let t=e.trim().toLowerCase();return t==="1"||t==="true"||t==="yes"||t==="on"}});var xde,UI,l3=l(()=>{"use strict";Cg();a3();xde=(e,t)=>e&&!t?"bridge-external":t&&!e?"live-external":e&&t?"bridge-external":"monolith",UI=(e={})=>{let t=e.env??process.env,r=zI(t[Rg]),o=zI(t[vg]);return{mode:xde(r,o),skipInProcessBridge:r,skipInProcessLive:o}}});var c3=l(()=>{"use strict";Cg()});var d3=l(()=>{"use strict";l3();c3()});var BI=l(()=>{"use strict"});var nl,Ys,u3,Wde,GI,VI,p3,m3,KI,g3,bp,qI=l(()=>{"use strict";nl=m(require("node:fs")),Ys=m(require("node:os")),u3=m(require("node:path"));BI();Ei();Wde=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),GI=(e=Ys.default.hostname())=>u3.default.join(Ys.default.tmpdir(),`com.agent-witch.${e.trim().toLowerCase()}.lease.json`),VI=e=>{if(!nl.default.existsSync(e))return null;try{let t=JSON.parse(nl.default.readFileSync(e,"utf8"));return!Wde(t)||typeof t.hostname!="string"||typeof t.macOsUsername!="string"||typeof t.pid!="number"||typeof t.claimedAt!="string"?null:{hostname:t.hostname,macOsUsername:t.macOsUsername,pid:t.pid,claimedAt:t.claimedAt}}catch{return null}},p3=e=>{let t=Date.parse(e.claimedAt);return Number.isNaN(t)?!1:Date.now()-t<=12e4},m3=(e,t)=>{nl.default.writeFileSync(e,`${JSON.stringify(t)}
`,"utf8")},KI=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??GI(),o=VI(r);if(o!==null&&o.pid!==process.pid&&Vt(o.pid)&&p3(o))return{ok:!1,reason:"held_by_other_process"};let n={hostname:Ys.default.hostname(),macOsUsername:Ys.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()};return m3(r,n),{ok:!0}},g3=e=>{if((e?.platform??process.platform)!=="darwin")return{ok:!0};let r=e?.leasePath??GI(),o=VI(r);return o!==null&&o.pid!==process.pid&&Vt(o.pid)&&p3(o)?{ok:!1}:(m3(r,{hostname:Ys.default.hostname(),macOsUsername:Ys.default.userInfo().username,pid:process.pid,claimedAt:new Date().toISOString()}),{ok:!0})},bp=e=>{if((e?.platform??process.platform)!=="darwin")return;let r=e?.leasePath??GI();VI(r)?.pid===process.pid&&nl.default.existsSync(r)&&nl.default.unlinkSync(r)}});var JI,_p,Ode,Mde,jde,Nde,YI,f3=l(()=>{"use strict";JI=require("node:child_process"),_p=m(require("node:path"));Ei();pg();Ode=e=>/(^|\s)(zsh|bash|sh|fish|dash)(\s|$)/.test(e),Mde=(e,t)=>{if(Ode(e)||!/\bnode\b/.test(e))return!1;let r=_p.default.resolve(t),o=_p.default.join(r,"app",zl),n=_p.default.join(r,"agent-witch.ts");return e.split(/\s+/).filter(i=>i.length>0).some(i=>{if(i===zl||i==="agent-witch.ts")return e.includes(r);try{let a=_p.default.resolve(i);return a===o||a===n}catch{return i===o||i===n}})},jde=e=>{let t=new Set,r=e;for(let o=0;o<32;o+=1){let n="";try{n=(0,JI.execFileSync)("ps",["-o","ppid=","-p",String(r)],{encoding:"utf8"}).trim()}catch{break}let s=Number.parseInt(n,10);if(!Number.isInteger(s)||s<=1||t.has(s))break;t.add(s),r=s}return t},Nde=(e,t,r)=>{let o=jde(r),n=[];for(let s of e.split(`
`)){let i=s.trim();if(i.length===0)continue;let a=/^(\d+)\s+(.+)$/.exec(i);if(a===null)continue;let c=Number.parseInt(a[1]??"",10),d=a[2]??"";!Number.isInteger(c)||c<=0||c===r||o.has(c)||Mde(d,t)&&n.push(c)}return n},YI=e=>{let t=e.selfPid??process.pid,r="";try{r=(0,JI.execFileSync)("ps",["-axo","pid=,command="],{encoding:"utf8"})}catch{return[]}let o=Nde(r,e.installDir,t),n=[];for(let s of o)if(Vt(s))try{process.kill(s,"SIGTERM"),n.push(s)}catch{}return n}});var kp,wp,y3,Dde,XI,h3=l(()=>{"use strict";kp=m(require("node:fs")),wp=m(require("node:path"));Xe();y3=(e,t)=>{!kp.default.existsSync(e)||kp.default.existsSync(t)||(kp.default.mkdirSync(wp.default.dirname(t),{recursive:!0}),kp.default.renameSync(e,t))},Dde=e=>{if(e.profileEmail===null)return;let t=wp.default.join(e.installDir,zt);y3(wp.default.join(t,kn),e.mainLogPath),y3(wp.default.join(t,wn),e.errorLogPath)},XI=e=>{let t=N();e!==void 0&&t.installDir!==e||Dde(t)}});var S3=l(()=>{"use strict";Pd();Yy();Yy();!_t()&&Dn(__agentWitchImportMetaUrl)&&(async()=>{bt("agent-witch-wake-server");let e=await us(),t=Gr(()=>{process.stdout.write(`[agent-witch-wake-server] Active macOS console user changed \u2014 shutting down.
`),e.close(()=>{process.exit(0)})}),r=()=>{t(),e.close(()=>{process.exit(0)})};process.on("SIGINT",r),process.on("SIGTERM",r)})()});var P3=l(()=>{"use strict";S3()});var A3=l(()=>{"use strict";ld()});var ZI,b3=l(()=>{"use strict";BI();P3();qI();A3();ZI=async(e={})=>{let t=e.skipInProcessBridge?null:await Jy();xy();let r=setInterval(()=>{xy()},6e4),o=setInterval(()=>{if(!g3().ok){e.onLostMachineLease?.();return}e.reconnectWebSockets?.(),e.ensureLiveAppReachable?.()},6e4);return{wakeServer:t,stop:()=>{clearInterval(r),clearInterval(o),t?.close()}}}});var Tp,UP,$de,_3,k3,BP,w3,T3,QI,E3,GP,R3=l(()=>{"use strict";Tp=m(require("node:fs")),UP=m(require("node:path")),$de="pending-run-inputs.json",_3=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),k3=e=>{let t=e.profileEmail?UP.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return UP.default.join(t,$de)},BP=e=>{let t=k3(e);if(!Tp.default.existsSync(t))return{};try{let r=JSON.parse(Tp.default.readFileSync(t,"utf8"));return _3(r)?Object.fromEntries(Object.entries(r).flatMap(([o,n])=>{if(!_3(n))return[];let s=typeof n.originalPrompt=="string"?n.originalPrompt:"",i=typeof n.partialOutput=="string"?n.partialOutput:"",a=typeof n.question=="string"?n.question:"",c=typeof n.accumulatedOutput=="string"?n.accumulatedOutput:i;return s.length===0||a.length===0?[]:[[o,{agentRunId:o,originalPrompt:s,partialOutput:i,question:a,accumulatedOutput:c}]]})):{}}catch{return{}}},w3=(e,t)=>{let r=k3(e);Tp.default.mkdirSync(UP.default.dirname(r),{recursive:!0}),Tp.default.writeFileSync(r,`${JSON.stringify(t,null,2)}
`,"utf8")},T3=e=>Object.values(BP(e)),QI=(e,t)=>BP(e)[t]!==void 0,E3=(e,t)=>{let r=BP(e);r[t.agentRunId]=t,w3(e,r)},GP=(e,t)=>{let r=BP(e);delete r[t],w3(e,r)}});var VP=l(()=>{"use strict";ee()});var v3=l(()=>{"use strict";ee()});var KP=l(()=>{"use strict";ee()});var qP=l(()=>{"use strict";ee()});var Ep=l(()=>{"use strict";ee()});var zde,Ude,Rp,eW=l(()=>{"use strict";qt();VP();v3();KP();qP();Ep();zde={"claude-cli":"Claude CLI",codex:"Codex CLI",cursor:"Cursor agent CLI",antigravity:"Antigravity CLI"},Ude={anthropic:"Anthropic API",openai:"OpenAI API",google:"Google API"},Rp=e=>{if(!we(e.writerAgent))return"the selected writer";let t=kt(e.writerAgent);if(Ze(e.writerExecutionBackend)==="api"&&t!==null){let r=ct(Be(e.configPath),t);if(r!==null&&r.apiKey.length>0){let o=Pc(t,r.model);return`${Ude[t]} model ${o}`}}return zde[e.writerAgent]}});var Bde,Gde,C3,L3,x3=l(()=>{"use strict";Bde=/"input_tokens"\s*:\s*(\d+)/,Gde=/"output_tokens"\s*:\s*(\d+)/,C3=e=>{if(e===null)return null;let t=Number.parseInt(e[1]??"",10);return Number.isFinite(t)&&t>=0?t:null},L3=(e,t)=>{if(e!==void 0&&e.totalTokens>=1)return e.totalTokens;let r=C3(Bde.exec(t)),o=C3(Gde.exec(t));if(r===null||o===null)return null;let n=r+o;return n>=1?n:null}});var JP=l(()=>{"use strict";Wt()});var vp,YP,Vde,tW,I3,W3,O3,rW,M3=l(()=>{"use strict";vp=m(require("node:fs")),YP=m(require("node:path"));JP();Vde="run-completion-outbox.json",tW=e=>{let t=e.profileEmail?YP.default.join(e.installDir,"profiles",e.profileEmail):e.installDir;return YP.default.join(t,Vde)},I3=e=>{let t=tW(e);if(!vp.default.existsSync(t))return[];try{let r=JSON.parse(vp.default.readFileSync(t,"utf8"));return Array.isArray(r)?r.filter(o=>typeof o=="object"&&o!==null&&typeof o.runId=="string"&&typeof o.exitCode=="number"&&typeof o.output=="string"&&typeof o.createdAt=="string"):[]}catch{return[]}},W3=(e,t)=>{vp.default.mkdirSync(YP.default.dirname(tW(e)),{recursive:!0}),vp.default.writeFileSync(tW(e),JSON.stringify(t,null,2),"utf8")},O3=(e,t)=>{let r=[...I3(e).filter(o=>o.runId!==t.runId),t];W3(e,r)},rW=async e=>{if(e.cloudApi===null)return;let t=I3(e.layout);if(t.length===0)return;let r=[];for(let o of t)await Jc(e.cloudApi,o.runId,o.exitCode,o.output,{estimateSeconds:o.estimateSeconds,actualSeconds:o.actualSeconds})||r.push(o);W3(e.layout,r)}});var j3=l(()=>{"use strict"});var oW,Cp,qde,Xs,N3=l(()=>{"use strict";j3();oW=new Map,Cp=e=>{let t=oW.get(e);t!==void 0&&(clearInterval(t),oW.delete(e))},qde=(e,t,r,o={})=>{e.readyState===1&&e.send(JSON.stringify({type:"run.heartbeat",payload:{agentRunId:t,...r?{awaitingInput:!0}:{},...o}}))},Xs=(e,t,r,o={})=>{Cp(t);let n=o.awaitingInput===!0,s=()=>{if(!r()){Cp(t);return}let i=o.onTick?.()??{};qde(e,t,n,i)};s(),oW.set(t,setInterval(s,15e3))}});var D3=l(()=>{"use strict";Wt()});var H3,F3=l(()=>{"use strict";D3();H3=e=>{let t=e.projectFolderPath?.trim()??"";return t.length===0?e.workspace:Qe(t)}});var nW,Lp,Ro,sW,Hr,$3,XP=l(()=>{"use strict";nW=new Set,Lp=new Map,Ro=(e,t)=>{if(t.length===0)return;let r=Lp.get(e)??[];r.push(t),Lp.set(e,r)},sW=e=>{nW.add(e);let t=Lp.get(e)??[];return Lp.delete(e),t},Hr=e=>nW.has(e),$3=e=>{nW.delete(e),Lp.delete(e)}});var sl,z3,U3,B3=l(()=>{"use strict";sl=m(require("node:path")),z3=require("node:url");Nn();U3=()=>{if(_t()){let e=process.argv[1];return e!==void 0&&e.trim().length>0?sl.default.dirname(sl.default.resolve(e)):sl.default.dirname(sl.default.resolve(__filename))}return sl.default.dirname((0,z3.fileURLToPath)(__agentWitchImportMetaUrl))}});var G3,V3,K3,q3,ht,il,J3,Y3,al,iW,aW,lW,X3,cW,Z3,ZP=l(()=>{"use strict";G3=require("node:crypto"),V3=m(require("node:fs")),K3=m(require("node:path")),q3=require("node:url");Ei();Nn();B3();ht=new Map,J3=async()=>{if(il!==void 0)return il;try{if(_t()){let e=U3(),t=K3.default.join(e,"deps","node-pty","lib","index.js");if(V3.default.existsSync(t)){let r=await import((0,q3.pathToFileURL)(t).href);return il=r,r}}return il=await import("node-pty"),il}catch{return il=null,null}},Y3=(e,t,r,o)=>{r.length!==0&&e({type:"shell.data",payload:{shellSessionId:t,chunk:r},requestId:o})},al=(e,t,r)=>{let o=ht.get(e);if(o!==void 0){ht.delete(e);try{o.pty.kill()}catch{}t({type:"shell.session.closed",payload:{shellSessionId:e},requestId:r})}},iW=(e,t)=>{let r=ht.get(e);return r===void 0?!1:(r.pty.write(t),!0)},aW=(e,t,r)=>{let o=ht.get(e);return o===void 0?!1:(o.pty.resize(Math.max(t,20),Math.max(r,5)),!0)},lW=e=>{for(let t of ht.values())if(!(t.mode!=="agent"||t.runId!==e))return Vt(t.pty.pid);return!1},X3=e=>{for(let[t,r]of ht.entries())if(!(r.mode!=="agent"||r.runId!==e)){ht.delete(t);try{r.pty.kill()}catch{}return!0}return!1},cW=async e=>{let t=await J3();if(t===null)return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`node-pty is not available on this computer. Install AgentWitch deps again.\r
`},requestId:e.requestId}),!1;ht.get(e.shellSessionId)!==void 0&&al(e.shellSessionId,e.send,e.requestId);let o=process.env.SHELL?.trim()||"/bin/zsh",n;try{n=t.spawn(o,["-l"],{name:"xterm-256color",cols:e.cols,rows:e.rows,cwd:e.cwd,env:process.env})}catch(s){let i=s instanceof Error?s.message:String(s);return e.send({type:"shell.data",payload:{shellSessionId:e.shellSessionId,chunk:`Could not open a live Mac PTY (${i}).\r
`},requestId:e.requestId}),!1}return ht.set(e.shellSessionId,{shellSessionId:e.shellSessionId,pty:n,mode:"interactive",runId:null}),e.send({type:"shell.session.opened",payload:{shellSessionId:e.shellSessionId,mode:"interactive"},requestId:e.requestId}),n.onData(s=>{Y3(e.send,e.shellSessionId,s,e.requestId)}),n.onExit(()=>{ht.get(e.shellSessionId)?.pty===n&&(ht.delete(e.shellSessionId),e.send({type:"shell.session.closed",payload:{shellSessionId:e.shellSessionId},requestId:e.requestId}))}),!0},Z3=async e=>{let t=e.shellSessionId??(0,G3.randomUUID)(),r=await J3();if(r===null)return{shellSessionId:t,usedPty:!1};let o;try{o=r.spawn(e.command,[...e.args],{name:"xterm-256color",cols:120,rows:32,cwd:e.cwd,env:e.env??process.env})}catch(n){return console.error("[agent-witch] PTY spawn failed; falling back to pipe:",n instanceof Error?n.message:n),{shellSessionId:t,usedPty:!1}}return ht.set(t,{shellSessionId:t,pty:o,mode:"agent",runId:e.runId}),e.send({type:"shell.session.opened",payload:{shellSessionId:t,mode:"agent",runId:e.runId},requestId:e.requestId}),o.onData(n=>{Y3(e.send,t,n,e.requestId),e.onData(n)}),o.onExit(({exitCode:n})=>{ht.get(t)?.pty===o&&(ht.delete(t),e.send({type:"shell.session.closed",payload:{shellSessionId:t},requestId:e.requestId})),e.onExit(n??-1)}),{shellSessionId:t,usedPty:!0}}});var QP,Q3,e6=l(()=>{"use strict";QP="[[AWAITING_INPUT]]",Q3=["When you need a human decision before continuing, pause and ask using this exact format:","1. Put the marker on its own line:",QP,"2. Put your single clear question on the next line.","3. Do not invent answers. Wait for the browser response before continuing.","4. Ask only one question per pause."].join(`
`)});var xp,t6,eA=l(()=>{"use strict";e6();xp=e=>{let t=e.indexOf(QP);if(t<0)return null;let o=e.slice(t+QP.length).trim().split(`
`)[0]?.trim()??"";return o.length===0?null:{question:o,partialOutput:e.slice(0,t).trim()}},t6=e=>["Continue the task using the user's answer.","","Original task:",e.originalPrompt,"","Output so far:",e.partialOutput,"","You asked:",e.question,"","User answer:",e.response,"",Q3].join(`
`)});var r6,o6=l(()=>{"use strict";XP();ZP();eA();r6=async e=>{let t=[],r=!1,o=s=>{if(s.length!==0){if(Hr(e.agentRunId)){e.sendMessage(e.socket,{type:"terminal.stream.chunk",payload:{runId:e.agentRunId,chunk:s},requestId:e.requestId});return}Ro(e.agentRunId,s)}};return e.sendMessage(e.socket,{type:"terminal.stream.start",payload:{runId:e.agentRunId,...e.shellSessionId!==void 0?{shellSessionId:e.shellSessionId}:{}},requestId:e.requestId}),(await Z3({shellSessionId:e.shellSessionId,runId:e.agentRunId,command:e.command,args:e.args,cwd:e.cwd,env:e.processEnv,send:s=>{e.sendMessage(e.socket,s)},requestId:e.requestId,onData:s=>{if(t.push(s),o(s),r)return;let i=xp(t.join(""));i!==null&&(r=!0,e.onInputRequired(i))},onExit:s=>{r||e.onFinished(s,t.join("").trim())}})).usedPty}});var s6,i6,a6,n6,vo,tA=l(()=>{"use strict";s6=require("node:child_process"),i6=m(require("node:fs")),a6=m(require("node:path"));pg();n6=12e4,vo=(e,t)=>{let r=a6.default.join(e,"app",DM,"ensure-writer.sh");return i6.default.existsSync(r)?new Promise((o,n)=>{let s=(0,s6.spawn)("bash",[r,t],{stdio:["ignore","pipe","pipe"],detached:process.platform!=="win32"});s.stdout?.resume(),s.stderr?.resume();let i=()=>{if(s.pid!==void 0){if(process.platform==="win32"){s.kill("SIGTERM");return}try{process.kill(-s.pid,"SIGTERM")}catch{s.kill("SIGTERM")}}},a=setTimeout(()=>{i(),n(new Error(`ensure-writer.sh timed out after ${String(n6/1e3)}s`))},n6);s.on("error",c=>{clearTimeout(a),n(c)}),s.on("close",c=>{if(clearTimeout(a),c===0){o();return}n(new Error(`ensure-writer.sh exited with code ${String(c??-1)}`))})}):Promise.resolve()}});var l6,Zs,Wp,rA,dW,Ip,oA,nA,uW,pW,Jde,ll,Yde,Xde,mW,gW=l(()=>{"use strict";l6=require("node:child_process");qt();tA();KP();VP();Ep();qP();Zs=new Map,Wp=e=>e==="cursor"||e==="antigravity",rA=e=>e==="claude-cli"||e==="cursor"||e==="antigravity",dW=e=>Zs.get(e)?.warmed===!0,Ip=e=>{let t=Zs.get(e);Zs.set(e,{warmed:!0,conversationStarted:t?.conversationStarted??!1})},oA=e=>Zs.get(e)?.conversationStarted===!0,nA=e=>{let t=Zs.get(e);Zs.set(e,{warmed:t?.warmed??!0,conversationStarted:!0})},uW=e=>{Zs.delete(e)},pW=e=>e==="cursor"?`Preparing Cursor for this session\u2026
`:e==="antigravity"?`Preparing Antigravity for this session\u2026
`:"",Jde={"claude-cli":"Claude",codex:"Codex",cursor:"Cursor",antigravity:"Antigravity"},ll=e=>`${Jde[e]} is ready on your computer.
Send a task from the box below when you are ready.
`,Yde=(e,t,r,o)=>new Promise(n=>{let s=Ug(t,r),i=[],a=(0,l6.spawn)(s.command,[...s.args],{cwd:e,stdio:["ignore","pipe","pipe"],env:process.env}),c=d=>{let u=d.toString("utf8");i.push(u),o?.(u)};a.stdout?.on("data",c),a.stderr?.on("data",c),a.on("close",d=>{n({exitCode:d??-1,output:i.join("").trim()})}),a.on("error",d=>{n({exitCode:-1,output:d.message})})}),Xde=(e,t)=>{let r=ll(e);if(t.length===0)return r;let o=t.endsWith(`
`)?"":`
`;return`${t}${o}${r}`},mW=async e=>{if(!we(e.writerAgent))return{exitCode:-1,output:`Unsupported writer agent: ${e.writerAgent}
`};if(e.runConfig!==void 0&&Ze(e.runConfig.writerExecutionBackend)==="api"){let r=kt(e.writerAgent);if(r===null)return{exitCode:-1,output:`API-key mode is not available for Cursor. Switch to CLI mode or use Cursor Cloud from the website.
`};let o=Be(e.runConfig.layout.configPath);return ct(o,r)===null?{exitCode:-1,output:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.
`}:(e.onChunk?.(`Using ${r} API on this computer (no local CLI).
`),Ip(e.writerAgent),{exitCode:0,output:ll(e.writerAgent)})}try{e.onChunk?.(`Preparing ${e.writerAgent} CLI on your computer\u2026
`),await vo(e.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{exitCode:-1,output:`Failed to prepare ${e.writerAgent}: ${o}
`}}Wp(e.writerAgent)&&Ip(e.writerAgent);let t=await Yde(e.workspace,e.writerAgent,e.commands,e.onChunk);if(t.exitCode!==0){let r=t.output.length>0?`${t.output}
`:"";return{exitCode:t.exitCode,output:`${r}Failed to start ${e.writerAgent} CLI.
`}}return{exitCode:0,output:t.output.length>0?Xde(e.writerAgent,t.output):ll(e.writerAgent)}}});var Qs,fW=l(()=>{"use strict";Qs={SESSION_LIMIT:"session_limit",PROVIDER_QUOTA:"provider_quota"}});var c6,Zde,Qde,d6,eue,yW,u6=l(()=>{"use strict";fW();c6=/you(?:'|')ve hit your session limit/i,Zde=[/\brate limit(?:ed)?\b/i,/\busage limit\b/i,/\bquota exceeded\b/i,/\bexceeded your .* quota\b/i],Qde=/session limit[^.\n]*\s+resets?\s+([^\n]+)/i,d6=(e,t)=>{for(let r of e.split(/\r?\n/)){let o=r.trim();if(o.length>0&&t.test(o))return o}return t.test(e)?e.trim().split(/\r?\n/)[0]?.trim()??null:null},eue=e=>{let t=Qde.exec(e);if(t===null)return null;let r=t[1]?.trim()??"";return r.length>0?r:null},yW=e=>{let t=e.trim();if(t.length===0)return null;if(c6.test(t))return{code:Qs.SESSION_LIMIT,resetHint:eue(t),matchedLine:d6(t,c6)};for(let r of Zde)if(r.test(t))return{code:Qs.PROVIDER_QUOTA,resetHint:null,matchedLine:d6(t,r)};return null}});var sA,iA,hW,SW=l(()=>{"use strict";sA="[[AGENT_RUN_WRITER_EXECUTION]]",iA="cli-writer-api-key-missing",hW="MARKETPLACE_PLAN_ESTIMATE_MISSING_ANTHROPIC_WRITER_API_KEY"});var PW=l(()=>{"use strict";SW()});var p6=l(()=>{"use strict";PW()});var aA=l(()=>{"use strict";fW();u6();SW();PW();p6()});var lA,m6=l(()=>{"use strict";lA={PENDING_APPROVAL:"pending_approval",RUNNING:"running",COMPLETED:"completed",FAILED:"failed",DENIED:"denied",EXPIRED:"expired"}});var g6,f6=l(()=>{"use strict";g6="This run stopped at the session limit. That is a hard stop \u2014 not a missed estimate."});var y6,h6=l(()=>{"use strict";aA();f6();y6=e=>e.code===Qs.SESSION_LIMIT?g6:"This run stopped at a provider usage limit. That is a hard stop \u2014 not a missed estimate."});var S6,P6=l(()=>{"use strict";aA();m6();h6();S6=e=>{let t=yW(e.output);return t!==null?{status:lA.FAILED,resultExitCode:e.exitCode===0?1:e.exitCode,resultOutcomeCode:t.code,denialReason:y6(t)}:{status:e.exitCode===0?lA.COMPLETED:lA.FAILED,resultExitCode:e.exitCode,resultOutcomeCode:null,denialReason:null}}});var AW,cQe,A6=l(()=>{"use strict";AW={OPEN:"open",APPROVAL:"approval"},cQe=AW.APPROVAL});var cl,cA,b6,oue,_6,k6,w6,Op,bW,_W=l(()=>{"use strict";cl=m(require("node:fs")),cA=m(require("node:path")),b6="runs",oue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),_6=e=>{let t=e.profileEmail!==null?cA.default.join(e.installDir,"profiles",e.profileEmail,b6):cA.default.join(e.installDir,b6);return cl.default.mkdirSync(t,{recursive:!0}),t},k6=(e,t)=>cA.default.join(_6(e),`${t}.json`),w6=(e,t)=>{cl.default.writeFileSync(k6(e,t.id),JSON.stringify(t,null,2))},Op=(e,t)=>{let r=k6(e,t);if(!cl.default.existsSync(r))return null;try{let o=JSON.parse(cl.default.readFileSync(r,"utf8"));return!oue(o)||typeof o.id!="string"?null:o}catch{return null}},bW=e=>{let t=_6(e),r=cl.default.readdirSync(t,{withFileTypes:!0}),o=[];for(let n of r){if(!n.isFile()||!n.name.endsWith(".json"))continue;let s=n.name.replace(/\.json$/,""),i=Op(e,s);i!==null&&o.push(i)}return o.toSorted((n,s)=>s.createdAt.localeCompare(n.createdAt))}});var nue,T6,E6=l(()=>{"use strict";P6();A6();_W();nue=e=>{let t=new Date().toISOString(),r=e.layout.profileEmail??"local-agent",o=S6({exitCode:e.exitCode,output:e.output});return{id:e.agentRunId,groupId:null,requesterUserId:r,executorUserId:r,prompt:e.originalPrompt,status:o.status,dispatchPolicy:AW.OPEN,resultOutput:e.output,resultExitCode:o.resultExitCode,resultOutcomeCode:o.resultOutcomeCode,denialReason:o.denialReason,createdAt:t,updatedAt:t,startedAt:t,completedAt:t,approvalExpiresAt:null,capabilityId:null,capabilityVersionId:null}},T6=(e,t)=>{let r=nue(t);return w6(e,r),r}});var R6=l(()=>{"use strict";KS()});var v6,C6=l(()=>{"use strict";aA();v6=()=>[sA,`agentRunWriterExecutionBackend=${iA}`,`agentRunWriterExecutionReasonCode=${hW}`].join(`
`)});var hn,dA=l(()=>{"use strict";hn=e=>{let t=e.trim();return t.length===0?"":t.split(`

---
`)[0]?.trim()??t}});var kW,sue,iue,L6,x6=l(()=>{"use strict";kW=e=>e.toLocaleString("en-US"),sue=e=>e<.01?e.toFixed(4):e.toFixed(3),iue=e=>{let t=e.estimatedCostUsd===null?"Est. cost: unavailable (model not in local price table)":`Est. cost: ~$${sue(e.estimatedCostUsd)} USD${e.estimateIsApproximate?" (approximate list price)":""}`;return["","\u2014 AgentWitch usage \u2014",`Model: ${e.model} (${e.provider})`,`Tokens: ${kW(e.inputTokens)} in / ${kW(e.outputTokens)} out (${kW(e.totalTokens)} total)`,t].join(`
`)},L6=(e,t)=>{if(t===void 0)return e;let r=iue(t);if(e.includes("\u2014 AgentWitch usage \u2014"))return e;let o=e.trimEnd();return o.length>0?`${o}
${r}`:r}});var I6=l(()=>{"use strict";ee()});var O6,Mp,Le,wW,uA,W6,aue,lue,M6,j6,N6,jp,TW,EW,RW,D6,cue,$t,Np,Sn,H6,due,uue,pA,vW,CW,LW,F6=l(()=>{"use strict";O6=require("node:child_process");ee();qt();R3();Nu();eW();x3();Sc();M3();JP();N3();Ei();F3();XP();ZP();eA();o6();gW();E6();R6();C6();dA();x6();Ri();I6();Ep();Kl();eA();Mp=new Map,Le=new Map,wW=new Set,uA=new Map,W6=e=>{e!==void 0&&!uA.has(e)&&uA.set(e,Date.now())},aue=(e,t,r,o)=>{let n=o.endsWith(`
`)?o:`${o}
`;if(Hr(t)){$t(e,{type:"terminal.stream.chunk",payload:{runId:t,chunk:n},requestId:r});return}Ro(t,n)},lue=(e,t,r,o,n)=>{if(!ak(e,n))return;let s=`${v6()}
`;aue(t,r,o,s);let i=Le.get(r);i!==void 0&&(i.accumulatedOutput=i.accumulatedOutput.length>0?`${i.accumulatedOutput}

${s}`.trim():s)},M6=130,j6=`

Stopped by user.`,N6=(e,t)=>{let r=t?.trim()??"";return r.length>0?r:hn(e)},jp=null,TW=e=>{jp=e},EW=(e,t)=>{if(jp===null)return;let r=RC(e,t);r===null||r.estimateSeconds===null&&r.actualSeconds===null||aw(jp,t,r)},RW=async e=>{await rW({layout:e,cloudApi:jp})},D6=e=>{let t=Mp.get(e);return t===void 0||t.killed||t.exitCode!==null||typeof t.pid!="number"?!1:Vt(t.pid)},cue=e=>Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),$t=(e,t)=>{e.readyState===1&&e.send(JSON.stringify(t))},Np=(e,t,r,o,n,s,i=!1)=>({awaitingInput:i,onTick:()=>{if(n===void 0||n.trim().length===0||s===void 0||s.trim().length===0)return{};let a=yi(s),c=Le.get(r);if(a!==null&&c!==void 0){let d=qM(a),u=D6(r)||lW(r);d!==null&&!u&&Sn(e,t,r,o,d.exitCode,d.output,c.originalPrompt)}return KM(a)}}),Sn=(e,t,r,o,n,s,i,a)=>{let c=Mi(s,a),d=n,u=L6(c.output,c.llmUsage);if(r!==void 0){let f=uA.get(r);uA.delete(r),f!==void 0&&TC({reportsDir:e.layout.reportsDir,agentRunId:r,actualSeconds:Math.max(1,Math.round((Date.now()-f)/1e3))});let y=L3(c.llmUsage,u);y!==null&&Iq({reportsDir:e.layout.reportsDir,agentRunId:r,actualTokens:y})}r!==void 0&&wW.has(r)&&(wW.delete(r),d=M6,u=u.trim().length>0&&!u.includes("Stopped by user.")?`${u.trim()}${j6}`:"Stopped by user.");let g=r!==void 0?RC(e.layout.reportsDir,r):null;if(r!==void 0){Cp(r),Ec(e.layout,r),Hr(r)&&($t(t,{type:"terminal.stream.end",payload:{runId:r},requestId:o}),$3(r));let f=Le.get(r);Cq({reportsDir:e.layout.reportsDir,agentRunId:r,input:hn(i),output:u,...f!==void 0?{writerLabel:Rp({writerAgent:f.writerAgent,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath})}:{}}),f!==void 0&&GS({layout:e.layout,writerAgent:f.writerAgent,projectFolderPath:f.projectFolderPath,userPrompt:f.userTranscriptPrompt,assistantOutput:u,agentRunId:r}),T6(e.layout,{agentRunId:r,originalPrompt:i,exitCode:d,output:u,layout:e.layout}),O3(e.layout,{runId:r,exitCode:d,output:u,createdAt:new Date().toISOString(),...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{}}),rW({layout:e.layout,cloudApi:jp}),Le.delete(r),Mp.delete(r),GP(e.layout,r)}$t(t,{type:"command.claude.result",payload:{exitCode:d,output:u,...r!==void 0?{agentRunId:r}:{},...typeof g?.estimateSeconds=="number"?{estimateSeconds:g.estimateSeconds}:{},...typeof g?.actualSeconds=="number"?{actualSeconds:g.actualSeconds}:{},...a!==void 0?{llmUsage:a}:{}},requestId:o}),ac(e.layout)},H6=(e,t,r,o,n,s,i)=>{let a=Le.get(r),c=a?.accumulatedOutput??s;E3(e.layout,{agentRunId:r,originalPrompt:i,partialOutput:s,question:n,accumulatedOutput:c}),Xs(t,r,()=>QI(e.layout,r),Np(e,t,r,o,a?.projectFolderPath,a?.reportKey,!0)),$t(t,{type:"command.claude.input_required",payload:{agentRunId:r,question:n,partialOutput:c},requestId:o})},due=(e,t,r,o,n,s,i,a)=>{let c=[],d=!1,u=y=>{if(!(n===void 0||y.length===0)){if(Hr(n)){$t(r,{type:"terminal.stream.chunk",payload:{runId:n,chunk:y},requestId:o});return}Ro(n,y)}};if(n!==void 0){let y=Le.get(n);Mp.set(n,t),Le.set(n,{originalPrompt:s,userTranscriptPrompt:y?.userTranscriptPrompt??i,writerAgent:a,projectFolderPath:y?.projectFolderPath,reportKey:y?.reportKey,accumulatedOutput:y?.accumulatedOutput??""}),$t(r,{type:"terminal.stream.start",payload:{runId:n},requestId:o}),Xs(r,n,()=>D6(n),Np(e,r,n,o,y?.projectFolderPath,y?.reportKey))}let g=a==="claude-cli",f=[];t.stdout?.on("data",y=>{let P=y.toString("utf8");if(g?f.push(P):(c.push(P),u(P)),d||n===void 0)return;let h=xp(c.join(""));if(h!==null){d=!0,t.kill("SIGTERM");let p=Le.get(n),S=[p?.accumulatedOutput??"",h.partialOutput].filter(b=>b.length>0).join(`

`);p!==void 0&&(p.accumulatedOutput=S),Mp.delete(n),H6(e,r,n,o,h.question,S,s)}}),t.stderr?.on("data",y=>{let P=y.toString("utf8");c.push(P),u(P)}),t.on("close",y=>{if(d)return;nA(a);let P=n!==void 0?Le.get(n):void 0,h=g?Mi(f.join("")):{output:c.join("").trim(),llmUsage:void 0},p=g?c.join("").trim():"",S=[h.output.trim(),p].filter(k=>k.length>0).join(`
`);g&&h.output.trim().length>0&&u(h.output);let b=P!==void 0&&P.accumulatedOutput.length>0?`${P.accumulatedOutput}

${S}`.trim():S;Sn(e,r,n,o,y??-1,b,s,h.llmUsage)}),t.on("error",y=>{d||Sn(e,r,n,o,-1,y.message,s)})},uue=(e,t,r,o,n,s,i,a,c)=>{let d=N6(r,c);s!==void 0&&(Le.set(s,{originalPrompt:r,userTranscriptPrompt:d,writerAgent:t,projectFolderPath:i,reportKey:a,accumulatedOutput:""}),$t(n,{type:"terminal.stream.start",payload:{runId:s},requestId:o}),Xs(n,s,()=>Le.has(s),Np(e,n,s,o,i,a))),_c(e,t,r,g=>{if(!(s===void 0||g.length===0)){if(Hr(s)){$t(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:g},requestId:o});return}Ro(s,g)}}).then(g=>{nA(t),Sn(e,n,s,o,g.exitCode,g.output,r,g.llmUsage)}).catch(g=>{let f=g instanceof Error?g.message:String(g);Sn(e,n,s,o,-1,f,r)})},pA=(e,t,r,o,n,s,i,a,c,d,u,g)=>{let f=N6(r,u);if(ic(e.layout),Xn(e,t)){W6(s),uue(e,t,r,o,n,s,c,d,f);return}let y=Ar(t,r,cue(e),i);if(y===null){Sn(e,n,s,o,-1,"Writer instruction must be a non-empty string.",r);return}W6(s);let P=H3({workspace:e.workspace,projectFolderPath:c}),h=()=>{let p=(0,O6.spawn)(y.command,[...y.args],{cwd:P,stdio:["ignore","pipe","pipe"],env:g??process.env});due(e,p,n,o,s,r,f,t)};if(s===void 0){h();return}Le.set(s,{originalPrompt:r,userTranscriptPrompt:f,writerAgent:t,projectFolderPath:c,reportKey:d,accumulatedOutput:Le.get(s)?.accumulatedOutput??""}),lue(e,n,s,o,t),c!==void 0&&c.trim().length>0&&d!==void 0&&d.trim().length>0&&Vl({reportKey:d,agentRunId:s,userSummary:"Task started on your computer."}),Xs(n,s,()=>Le.has(s),Np(e,n,s,o,c,d)),r6({socket:n,sendMessage:$t,requestId:o,agentRunId:s,shellSessionId:a,command:y.command,args:y.args,cwd:P,processEnv:g,originalPrompt:r,writerAgent:t,onInputRequired:p=>{a!==void 0&&al(a,k=>{$t(n,k)},o);let S=Le.get(s),b=[S?.accumulatedOutput??"",p.partialOutput].filter(k=>k.length>0).join(`

`);S!==void 0&&(S.accumulatedOutput=b),H6(e,n,s,o,p.question,b,r)},onFinished:(p,S)=>{nA(t);let b=Mi(S),k=Le.get(s),A=k!==void 0&&k.accumulatedOutput.length>0?`${k.accumulatedOutput}

${b.output}`.trim():b.output;Sn(e,n,s,o,p,A,r,b.llmUsage)}}).then(p=>{if(!p){h();return}Xs(n,s,()=>lW(s),Np(e,n,s,o,c,d))}).catch(p=>{console.error("[agent-witch] Writer PTY path failed; falling back to pipe:",p instanceof Error?p.message:p),h()})},vW=(e,t,r,o)=>{GP(e.layout,t.agentRunId),t.shellSessionId!==void 0&&$t(o,{type:"shell.data",payload:{shellSessionId:t.shellSessionId,chunk:`\r
[checkpoint answer] ${t.response}\r
`},requestId:r});let n=t6(t),s=Le.get(t.agentRunId),i=s?.writerAgent??"claude-cli",a=s?.projectFolderPath,c=s?.reportKey;pA(e,i,n,r,o,t.agentRunId,void 0,t.shellSessionId,a,c,s?.userTranscriptPrompt)},CW=(e,t)=>{for(let r of T3(e.layout))Le.set(r.agentRunId,{originalPrompt:r.originalPrompt,userTranscriptPrompt:hn(r.originalPrompt),writerAgent:"claude-cli",accumulatedOutput:r.accumulatedOutput}),Xs(t,r.agentRunId,()=>QI(e.layout,r.agentRunId),{awaitingInput:!0}),$t(t,{type:"command.claude.input_required",payload:{agentRunId:r.agentRunId,question:r.question,partialOutput:r.accumulatedOutput}})},LW=(e,t,r,o)=>{let n=Le.get(r);if(n===void 0)return!1;wW.add(r),Cp(r);let s=Mp.get(r);if(s!==void 0)return s.kill("SIGTERM"),!0;if(X3(r))return!0;GP(e.layout,r);let i=n.accumulatedOutput.trim().length>0?`${n.accumulatedOutput.trim()}${j6}`:"Stopped by user.";return Sn(e,t,r,o,M6,i,n.originalPrompt),!0}});var pue,xW,$6=l(()=>{"use strict";xc();pue=()=>`http://127.0.0.1:${Jt()}/restart`,xW=async()=>{try{let e=await fetch(pue(),{method:"POST",signal:AbortSignal.timeout(12e4)}),t=null;try{t=await e.json()}catch{t=null}return{ok:e.ok,reachable:!0,payload:t}}catch{return{ok:!1,reachable:!1,payload:null}}}});var z6=l(()=>{"use strict";wd()});var U6=l(()=>{"use strict";rL()});var IW,B6=l(()=>{"use strict";IW=e=>{if(e.remoteBundleVersion===null||e.remoteBundleVersion.trim().length===0)return!1;let t=e.remoteBundleVersion.trim();return(e.localBundleVersion?.trim()??"")!==t}});var Dp,mue,WW,OW,G6=l(()=>{"use strict";G();ae();z6();HT();U6();B6();Ri();Dp=(e,t)=>{Zo(e,{direction:"local",type:"install.bundle.update",summary:t.summary,action:t.action})},mue=async()=>{try{let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(k_(),__)),t=await e({force:!0});return{ok:t.ok&&(t.updated||t.ok),message:t.message}}catch(e){return{ok:!1,message:e instanceof Error?e.message:String(e)}}},WW=e=>IW({localBundleVersion:Fe(e.installDir)?.bundleVersion??null,remoteBundleVersion:e.remoteBundleVersion}),OW=async e=>{let t=Fe(e.layout.installDir)?.bundleVersion??null;if(!IW({localBundleVersion:t,remoteBundleVersion:e.remoteBundleVersion}))return;if(Kt(e.layout)){lc({layout:e.layout,remoteBundleVersion:e.remoteBundleVersion,trigger:e.trigger}),console.log(`[agent-witch] Deferring install bundle update (${e.remoteBundleVersion} via ${e.trigger}) until the active writer task finishes.`);return}let r=`Install bundle mismatch (local=${t??"none"} remote=${e.remoteBundleVersion}); updating from ${e.trigger}\u2026`;console.log(`[agent-witch] ${r}`),Dp(e.layout,{summary:r,action:"install-bundle-update-start"}),Br({launchAgentLabel:ye(e.layout.installDir),installDir:e.layout.installDir});let o=await Ba({force:!0});if(o.ok){console.log(`[agent-witch] Install bundle update finished (remote ${e.remoteBundleVersion}).`,o.payload),Dp(e.layout,{summary:`Install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-ok"});return}if(!o.reachable){let n=await mue();if(n.ok){console.log(`[agent-witch] Direct install bundle update finished (remote ${e.remoteBundleVersion}).`),Dp(e.layout,{summary:`Direct install bundle update ok \u2192 ${e.remoteBundleVersion}`,action:"install-bundle-update-direct-ok"});return}console.error("[agent-witch] Install bundle update failed: wake API unreachable and direct update failed.",n.message),Dp(e.layout,{summary:`Install bundle update failed: ${n.message}`,action:"install-bundle-update-error"});return}console.error("[agent-witch] Install bundle update failed.",o.payload),Dp(e.layout,{summary:"Install bundle update failed",action:"install-bundle-update-error"})}});var gue,MW,V6=l(()=>{"use strict";gue=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),MW=e=>{if(!gue(e))return null;let t=e.installBundleVersion;if(typeof t!="string")return null;let r=t.trim();return r.length>0?r:null}});var jW,NW,K6=l(()=>{"use strict";bT();_T();jW=e=>{let t=Array.isArray(e.automations)?e.automations:null;if(t===null){console.error("[agent-witch] automations.sync missing automations array.");return}let r=cd({automations:t});if(!r.ok){console.error(`[agent-witch] automations.sync failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Synced ${r.writtenCount??t.length} automations.`)},NW=async e=>{let t=typeof e.automationId=="string"?e.automationId.trim():"";if(t.length===0){console.error("[agent-witch] automations.run missing automationId.");return}let r=await no(t);if(!r.ok){console.error(`[agent-witch] automations.run failed: ${r.errorMessage??"unknown"}`);return}console.log(`[agent-witch] Ran automation ${t}.`)}});var q6,fue,yue,hue,Hp,J6=l(()=>{"use strict";q6=m(require("node:os"));Xe();fue="Default",yue=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,64),hue=e=>{let t=q6.default.homedir();return e.startsWith(t)?`~${e.slice(t.length)}`:e},Hp=()=>{let e=N(),t=Ll(e),r=yue(fue);return`${hue(t)}/${r.length>0?r:"project"}`}});var Y6=l(()=>{"use strict";wd()});var X6,DW,Z6=l(()=>{"use strict";Y6();X6=!1,DW=e=>{X6||(X6=!0,process.on("uncaughtException",t=>{ms(e,{kind:"crash",message:t.message,stack:t.stack})}),process.on("unhandledRejection",t=>{let r=t instanceof Error?t.message:typeof t=="string"?t:"Unhandled promise rejection",o=t instanceof Error?t.stack:void 0;ms(e,{kind:"crash",message:r,stack:o})}))}});var Q6,Sue,HW,eY=l(()=>{"use strict";Q6=require("node:child_process");tA();qt();KP();VP();Ep();qP();Sue=async(e,t)=>{let o={"claude-cli":t.claudeCommand,codex:t.codexCommand,cursor:t.cursorCommand,antigravity:t.antigravityCommand}[e];return await new Promise(n=>{let s=(0,Q6.spawn)(o,["--version"],{stdio:["ignore","ignore","ignore"]});s.on("error",()=>{n(!1)}),s.on("close",i=>{n(i===0)})})},HW=async e=>{if(!we(e.writerAgent))return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:`Unsupported writer: ${e.writerAgent}`};if(e.runConfig!==void 0&&Ze(e.runConfig.writerExecutionBackend)==="api"){let r=kt(e.writerAgent);if(r===null)return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:"API-key mode is not available for Cursor. Use CLI login or Cursor Cloud from the website."};let o=Be(e.layout.configPath),n=ct(o,r),s=n!==null&&n.apiKey.length>0;return{writerAgent:e.writerAgent,installed:!0,loggedIn:s,...s?{}:{errorMessage:`Add a ${r} API key in AgentWitch Local \u2192 Writer API.`}}}try{await vo(e.layout.installDir,e.writerAgent)}catch(r){let o=r instanceof Error?r.message:String(r);return{writerAgent:e.writerAgent,installed:!1,loggedIn:!1,errorMessage:o}}let t=await Sue(e.writerAgent,e.commands);return{writerAgent:e.writerAgent,installed:!0,loggedIn:t,...t?{}:{errorMessage:"Writer is installed but not logged in yet. Complete login in the browser if prompted."}}}});var FW,tY=l(()=>{"use strict";FW=e=>[e.trim(),"","---",["A local Ollama sidecar is estimating this task in parallel.","That estimate is recorded outside this conversation and shown in the UI.","Proceed with the task immediately.","Do not emit [[WORKING_ESTIMATE]] before you start.","Do not use [[AWAITING_INPUT]] to ask the operator to confirm an estimate."].join(`
`)].join(`
`)});var rY,$W,oY=l(()=>{"use strict";rY=require("node:crypto"),$W=()=>(0,rY.randomUUID)()});var dl,nY,mA=l(()=>{"use strict";dl="[[WORKING_ESTIMATE]]",nY=(e,t,r,o="")=>["Estimate how long the following task will take on this computer, in seconds.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Factor in that writer's typical speed and the latest finished tasks below.","Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",dl,"<integer seconds>","",r.trim(),"","Task:",e.trim()].join(`
`)});var sY,iY=l(()=>{"use strict";sY=e=>e===null||e<=0?"Estimate saved locally. Starting work on your computer\u2026":e<60?`Estimated ~${e}s. Starting work on your computer\u2026`:`Estimated ~${Math.max(1,Math.round(e/60))} min. Starting work on your computer\u2026`});var Pue,aY,lY=l(()=>{"use strict";mA();Pue=/\[\[WORKING_ESTIMATE\]\]\s*(?:\r?\n|\s+)(\d+)\b/gi,aY=e=>{if(!e.includes(dl))return null;let t=null;for(let r of e.matchAll(Pue)){let o=Number.parseInt(r[1]??"",10);Number.isFinite(o)&&o>0&&(t=o)}return t}});var Aue,zW,cY=l(()=>{"use strict";lY();Aue=/^(\d{1,6})\b/,zW=e=>{let t=aY(e);if(t!==null)return t;let r=Aue.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return!Number.isFinite(o)||o<=0?null:o}});var bue,_ue,kue,gA,UW=l(()=>{"use strict";qt();bd();bue="http://127.0.0.1:11434",_ue=45e3,kue=e=>{if(typeof e!="object"||e===null||!("message"in e))return null;let t=e.message;if(typeof t!="object"||t===null||!("content"in t))return null;let r=t.content;return typeof r!="string"||r.trim().length===0?null:r},gA=async(e,t)=>{let r=process.env.AGENT_WITCH_OLLAMA_URL?.trim()||bue,o=t===void 0?(await Qt({commands:Te({})})).estimateModel:t;if(o===null||o.trim().length===0)return null;try{let n=await fetch(`${r}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,stream:!1,messages:[{role:"user",content:e}],options:{temperature:0,num_predict:80}}),signal:AbortSignal.timeout(_ue)});return n.ok?kue(await n.json()):null}catch{return null}}});var BW,GW,VW,dY=l(()=>{"use strict";Kl();mA();dA();iY();cY();Nu();UW();BW=async e=>{let t=hn(e.wrappedPrompt),r=Lq(e.reportsDir);return{estimateOutput:await gA(nY(t,e.writerLabel,r.table,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel,embedding:r.embedding}},GW=e=>{let t=zW(e.estimateOutput);t!==null&&DS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding})},VW=e=>{let t=zW(e.estimateOutput);if(t===null)return{estimateSeconds:null,estimateSummary:"",estimateOutput:e.estimateOutput,marketplacePlanEstimate:null};let r=sY(t);return Gl({reportKey:e.reportKey,agentRunId:e.agentRunId,status:yr.IN_PROGRESS,userSummary:r,details:e.estimateOutput.trim(),estimateSeconds:t}),DS({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateSeconds:t,embedding:e.embedding}),{estimateSeconds:t,estimateSummary:r,estimateOutput:e.estimateOutput,marketplacePlanEstimate:null}}});var fA,uY,KW=l(()=>{"use strict";fA="[[WORKING_TOKEN_ESTIMATE]]",uY=(e,t,r,o="")=>["Estimate the writer-reported token total for the following task on this computer.","The total is input tokens + output tokens + cache read + cache write.","The writer's fixed context makes a short task large. Match the actual range, not the length of the task text.","Ignore any earlier estimates near 100 or 1000. Those were wrong.","The integer you reply with must sit inside the actual range for this writer.","Use the history row whose task length is closest to this task. Copy that row's actual tokens.",`The task is already starting in parallel on this writer: ${t}.`,...o.trim().length>0?[o.trim()]:[],"Do not run the task. Do not ask questions.","Reply with exactly two lines and nothing else:",fA,"<integer tokens>","",r.trim(),"","Task:",e.trim()].join(`
`)});var pY,wue,mY,gY=l(()=>{"use strict";KW();pY=/^(\d{1,8})\b/,wue=e=>{let t=e.indexOf(fA);if(t<0)return null;let r=e.slice(t+fA.length).trim(),o=pY.exec(r);if(o===null)return null;let n=Number.parseInt(o[1]??"",10);return Number.isFinite(n)&&n>=1?n:null},mY=e=>{let t=wue(e);if(t!==null)return t;let r=pY.exec(e.trim());if(r===null)return null;let o=Number.parseInt(r[1]??"",10);return Number.isFinite(o)&&o>=1?o:null}});var qW,JW,fY=l(()=>{"use strict";KW();dA();gY();Nu();UW();qW=async e=>{let t=hn(e.wrappedPrompt),r=Wq(e.reportsDir);return{estimateOutput:await gA(uY(t,e.writerLabel,r,e.capabilityNote??""),e.estimateModel),task:t,writerLabel:e.writerLabel}},JW=e=>{let t=mY(e.estimateOutput);return t===null?null:(xq({reportsDir:e.reportsDir,agentRunId:e.agentRunId,task:e.task,writerLabel:e.writerLabel,estimateTokens:t}),t)}});var yY=l(()=>{"use strict";qI();f3();h3();b3();xc();F6();tA();qt();_W();XP();$6();vT();G6();Ri();V6();K6();JP();J6();Z6();eY();mg();tY();oY();mA();Kl();dY();fY();eW();bd();ZP();gW()});var hY={};St(hY,{buildContinuationPromptWithContext:()=>Rue});var Tue,Eue,Rue,SY=l(()=>{"use strict";Tue=(e,t)=>e.length<=t?e:`\u2026${e.slice(-t)}`,Eue=e=>e.replace(/\[\[PROGRESS\]\][\s\S]*?(?=\n\[\[|\n*$)/g,"").replace(/\[\[NEXT_ACTIONS\]\][\s\S]*$/g,"").replace(/\r\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),Rue=e=>{let t=e.userMessage.trim(),r=e.priorPrompt.trim(),o=Eue(e.priorOutput),n=e.maxContextChars??12e3;return r.length===0&&o.length===0?t:["Continue the same task on this computer using the prior conversation as context.","","<prior_context>",[r.length>0?`User: ${r}`:null,o.length>0?`Assistant: ${Tue(o,n)}`:null].filter(i=>i!==null).join(`

`),"</prior_context>","","New message:",t].join(`
`)}});var PY={};St(PY,{readHarnessExportSets:()=>Cue});var Fp,YW,yA,vue,Cue,AY=l(()=>{"use strict";Fp=m(require("node:fs")),YW=m(require("node:path"));Xe();yA=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),vue=e=>{if(!Fp.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(Fp.default.readFileSync(e.harnessManifestPath,"utf8"));if(yA(t))return t}catch{return null}return null},Cue=(e,t)=>{let r=N(t),o=vue(r);if(o===null)return[];let n=yA(o.sets)?o.sets:{},s=[];for(let i of e){let a=n[i];if(!yA(a)||typeof a.name!="string")continue;let c=Array.isArray(a.items)?a.items:[],d=[];for(let u of c){if(!yA(u))continue;let g=typeof u.path=="string"?u.path:void 0,f=typeof u.id=="string"?u.id:"",y=typeof u.kind=="string"?u.kind:"",P=typeof u.title=="string"?u.title:"";if(g===void 0||f.length===0||y.length===0||P.length===0)continue;let h=g.startsWith("shared/")?YW.default.join(r.harnessRootDir,g):YW.default.join(r.harnessSetsDir,i,g);Fp.default.existsSync(h)&&d.push({id:f,kind:y,title:P,content:Fp.default.readFileSync(h,"utf8")})}d.length>0&&s.push({name:a.name,slug:i,items:d})}return s}});var o0,ZW,ul,bY,Lue,_Y,kY,XW,wY,QW,e0,t0,te,J,r0,xue,$p,Iue,Wue,Oue,Mue,jue,Nue,Due,Hue,zp,TY=l(()=>{"use strict";o0=require("node:child_process"),ZW=m(require("node:fs")),ul=m(require("node:os"));i3();G();ae();qn();gI();d3();ee();nI();ee();Pr();wd();qE();vP();KS();Wt();Go();JT();At();yY();bY=3e4,Lue=3e4,_Y=new Map,kY=new Map,XW=new Map,wY=new Map,QW=new Map,e0=new Map,t0=new Map,te=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),J=(e,t,r)=>{e.readyState===Ap.OPEN&&(e.send(JSON.stringify(t)),r!==void 0&&(Zo(r,{direction:"out",type:String(t.type??"unknown"),summary:"outbound WS frame"}),Xy(r,"out",t)))},r0=e=>e,xue=e=>{if(!ZW.default.existsSync(e.harnessManifestPath))return null;try{let t=JSON.parse(ZW.default.readFileSync(e.harnessManifestPath,"utf8"));if(te(t))return t}catch{console.error("[agent-witch] Could not parse harness manifest.")}return null},$p=(e,t)=>{let r=xue(t);r!==null&&J(e,{type:"harness.manifest.report",payload:{hostname:ul.default.hostname(),manifest:r}})},Iue=async(e,t,r,o,n,s,i=!1,a,c,d,u,g)=>{let f=g?.trim()??"";if(!we(t)){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Unsupported writer agent: ${t}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let y=Rp({writerAgent:t,writerExecutionBackend:e.writerExecutionBackend,configPath:e.layout.configPath}),P=await Qt({commands:Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),writerAgent:t}).catch(()=>null),h=s!==void 0?BW({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:P?.estimateModel,capabilityNote:P?.capabilityNote}).catch(()=>null):null,p=s!==void 0?qW({wrappedPrompt:r,writerLabel:y,reportsDir:e.layout.reportsDir,estimateModel:P?.estimateModel,capabilityNote:P?.capabilityNote}).catch(()=>null):null,S=Wp(t)&&!dW(t);if(S){try{await vo(e.layout.installDir,t)}catch(D){let xe=D instanceof Error?D.message:String(D);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${xe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}Ip(t)}else if(!Wp(t))try{await vo(e.layout.installDir,t)}catch(D){let xe=D instanceof Error?D.message:String(D);J(n,{type:"command.claude.result",payload:{exitCode:-1,output:`Failed to prepare ${t}: ${xe}`,...s!==void 0?{agentRunId:s}:{}},requestId:o});return}let b=wc(d,Hp,g);if(b===null){J(n,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this computer yet. Open AgentWitch Local and set the project folder before running tasks.",...s!==void 0?{agentRunId:s}:{}},requestId:o});return}it({projectFolderPath:b,...f.length>0?{projectId:f}:{}}),i||zu(e.layout,t,b);let k=VS({sessionContinuation:i,supportsWriterSessionContinuation:rA(t),isWriterConversationStarted:oA(t)}),A=i&&k==="first"?$u(e.layout,t,b):null,_=A!==null?Ua(e.layout,A):null,E=_!==null&&_.turns.length>0,T=zC({sessionContinuation:i,supportsWriterSessionContinuation:rA(t),isWriterConversationStarted:oA(t),hasSourceRunId:typeof c=="string"&&c.trim().length>0,hasCanonicalTurns:E,userPromptCharacterCount:r.length}),C=r;if(T.continuationStrategy==="source_run_seed"){let D=typeof c=="string"&&c.length>0?Op(e.layout,c):null;if(D!==null){let{buildContinuationPromptWithContext:xe}=await Promise.resolve().then(()=>(SY(),hY));C=xe({priorPrompt:D.prompt,priorOutput:D.resultOutput??"",userMessage:r})}}else T.continuationStrategy==="transcript_seed"&&_!==null&&_.turns.length>0&&(C=$S({priorTurns:_.turns,userMessage:r}));let x=T.ragLimit>0?await ma({layout:e.layout,query:C,limit:T.ragLimit,minScore:T.ragMinScore,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],W=T.ragLimit>0&&b.trim().length>0?await VE({layout:e.layout,query:C,limit:2,minScore:.32,projectFolderPath:b,...f.length>0?{projectId:f}:{}}):[],j=T.injectMemory?IC(e.layout,b,f.length>0?f:void 0):[],M=`${OC(j,T.memoryEntryLimit)}${UE(x)}${KE(W)}${C}`,B=u?.trim()??(s!==void 0&&b.trim().length>0?$W():void 0);if(s!==void 0&&B!==void 0&&B.length>0&&b.trim().length>0){Vl({reportKey:B,agentRunId:s,userSummary:"Working on your computer\u2026"});let D=M;h!==null&&h.then(xe=>{if(xe===null)return;let Pn=VW({estimateOutput:xe.estimateOutput??"",reportKey:B,agentRunId:s,reportsDir:e.layout.reportsDir,task:xe.task,writerLabel:xe.writerLabel,embedding:xe.embedding});if(Pn.estimateSeconds===null)return;EW(e.layout.reportsDir,s);let An=`${dl}
${Pn.estimateSeconds}
`;if(Hr(s)){J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:An},requestId:o});return}Ro(s,An)}).catch(()=>{}),M=FW(D),M=Hb(M,{agentRunId:s,reportKey:B,reportsDir:e.layout.reportsDir,installDir:e.layout.installDir})}s!==void 0&&h!==null&&h.then(D=>{D!==null&&GW({estimateOutput:D.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:D.task,writerLabel:D.writerLabel,embedding:D.embedding})}).catch(()=>{}),s!==void 0&&p!==null&&p.then(D=>{D!==null&&JW({estimateOutput:D.estimateOutput??"",agentRunId:s,reportsDir:e.layout.reportsDir,task:D.task,writerLabel:D.writerLabel})}).catch(()=>{});let ie=s!==void 0&&t0.get(s)===!0;if(s!==void 0&&b.trim().length>0){let D=await ey(b);e0.set(s,D),B!==void 0&&B.length>0&&QW.set(s,B)}pA(e,t,M,o,r0(n),s,{sessionTurn:T.sessionTurn},a,b,B,r,rk(e.layout,s,ie)),S&&s!==void 0&&J(n,{type:"terminal.stream.chunk",payload:{runId:s,chunk:pW(t)},requestId:o})},Wue=async(e,t,r,o,n)=>{let s=(i,a)=>{J(n,{type:"command.writer.session.ready",payload:{writerAgent:t,writerSessionId:r,output:i,exitCode:a},requestId:o})};try{let i="",a=await mW({installDir:e.layout.installDir,workspace:e.workspace,writerAgent:t,runConfig:e,commands:Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}),onChunk:u=>{i+=u,J(n,{type:"command.writer.session.chunk",payload:{writerAgent:t,writerSessionId:r,chunk:u},requestId:o})}}),c=we(t)?t:"claude-cli",d=a.exitCode!==0?a.output:i.length>0?ll(c):a.output;s(d,a.exitCode)}catch(i){let a=i instanceof Error?i.message:String(i);console.error("[agent-witch] Writer session start failed:",a),s(`Failed to start ${t} session: ${a}
`,-1)}},Oue=(e,t,r)=>new Promise(o=>{if(!we(t)){o({exitCode:-1,output:`Unsupported writer agent: ${t}`});return}let n=Ar(t,r,Te({claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}));if(n===null){o({exitCode:-1,output:"Writer instruction must be a non-empty string."});return}let s=[],i=(0,o0.spawn)(n.command,[...n.args],{cwd:e.workspace,stdio:["ignore","pipe","pipe"],env:process.env});i.stdout?.on("data",a=>{s.push(a.toString("utf8"))}),i.stderr?.on("data",a=>{s.push(a.toString("utf8"))}),i.on("close",a=>{o({exitCode:a??-1,output:s.join("").trim()})}),i.on("error",a=>{o({exitCode:-1,output:a.message})})}),Mue=async(e,t,r,o)=>{if(t.installMethod!=="deterministic-bundle")return!1;J(o,{type:"harness.request.ack",payload:{writerAgent:"deterministic",status:"dispatching"},requestId:r});let n=kr(t.bundle),s=te(t.bundleFetch)?t.bundleFetch:null,i=await(async()=>{if(n!==null)return n;if(s===null)return null;let c=typeof s.artifactId=="string"?s.artifactId.trim():"",d=typeof s.contentSha256=="string"?s.contentSha256.trim():"";if(c.length===0||d.length===0)return null;let u=$e(e.wsUrl)??Pt,g=await zk({appOrigin:u,pairingToken:e.pairingToken,artifactId:c,expectedContentSha256:d});return g.ok?g.bundle:null})();if(i===null)return J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:"deterministic",errorMessage:"deterministic-bundle requires inline bundle or valid bundleFetch."},requestId:r}),!0;let a=ts({bundle:i,layout:e.layout});return J(o,{type:"harness.request.result",payload:{success:a.ok,writerAgent:"deterministic",exitCode:a.ok?0:1,output:a.ok?`Installed harness set "${i.slug}" (${a.writtenItemCount??0} files).`:a.errorMessage??"Harness install failed.",...a.ok?{}:{errorMessage:a.errorMessage??"Harness install failed."}},requestId:r}),a.ok&&$p(o,e.layout),!0},jue=async(e,t,r,o)=>{if(await Mue(e,t,r,o))return;let n=typeof t.writerAgent=="string"?t.writerAgent:"",s=typeof t.instruction=="string"?t.instruction.trim():"";if(J(o,{type:"harness.request.ack",payload:{writerAgent:n,status:"dispatching"},requestId:r}),s.length===0){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:"harness.request requires a non-empty instruction."},requestId:r});return}if(!we(n)){J(o,{type:"harness.request.result",payload:{success:!1,writerAgent:n,errorMessage:`Unsupported writer agent: ${n}`},requestId:r});return}ic(e.layout);let i=await(async()=>{try{await vo(e.layout.installDir,n)}catch(a){let c=a instanceof Error?a.message:String(a);return{exitCode:-1,output:`Failed to prepare ${n}: ${c}`}}return Oue(e,n,s)})().finally(()=>{ac(e.layout)});J(o,{type:"harness.request.result",payload:{success:i.exitCode===0,writerAgent:n,exitCode:i.exitCode,output:i.output},requestId:r}),$p(o,e.layout)},Nue=e=>{let t=1e3*2**e;return Math.min(Lue,t)},Due=e=>{let t={reconnectAttempt:0,stopped:!1,wsConnected:!1,lastHeartbeatAt:null,wakeError:null,restartInFlight:!1,selfUpdateInFlight:!1},r=p=>t.restartInFlight?"already_in_progress":Kt(e.layout)?(cc(p),console.log(`[agent-witch] Deferring local restart (${p}) until the active writer task finishes.`),"deferred_writer_busy"):(t.restartInFlight=!0,console.log(`[agent-witch] Local restart requested (${p})\u2026`),t.wakeError=`restart:${p}`,xW().then(S=>{if(S.ok){console.log("[agent-witch] Local restart completed.");return}if(!S.reachable){t.wakeError="Local restart API unreachable \u2014 is the wake server running?",console.error(`[agent-witch] ${t.wakeError}`);return}t.wakeError="Local restart failed",console.error("[agent-witch] Local restart failed.",S.payload)}).finally(()=>{t.restartInFlight=!1}),"accepted"),o=(p,S,b,k)=>{J(p,{type:"device.restart.ack",payload:uk({status:b,reason:S}),...k!==void 0?{requestId:k}:{}},e.layout)},n=(p,S="system.ack")=>{if(!t.selfUpdateInFlight&&WW({installDir:e.layout.installDir,remoteBundleVersion:p})){if(Kt(e.layout)){lc({layout:e.layout,remoteBundleVersion:p,trigger:S}),console.log(`[agent-witch] Deferring install bundle update (${p} via ${S}) until the active writer task finishes.`);return}t.selfUpdateInFlight=!0,OW({layout:e.layout,remoteBundleVersion:p,trigger:S}).finally(()=>{t.selfUpdateInFlight=!1})}},s=()=>{let p=Ce(e.layout);p!==null&&ze(p,12e4)&&(console.log("[agent-witch] Connection health stale \u2014 reconnecting WebSocket\u2026"),t.reconnectAttempt=0,c(),d(),P())},i=()=>{t.heartbeatTimer!==void 0&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=void 0)},a=()=>{t.localHealthTimer!==void 0&&(clearInterval(t.localHealthTimer),t.localHealthTimer=void 0)},c=()=>{t.reconnectTimer!==void 0&&(clearTimeout(t.reconnectTimer),t.reconnectTimer=void 0)},d=()=>{if(t.socket===void 0)return;let p=t.socket;t.socket=void 0,t.wsConnected=!1,p.removeAllListeners("open"),p.removeAllListeners("message"),p.removeAllListeners("close"),p.on("error",()=>{}),(p.readyState===Ap.OPEN||p.readyState===Ap.CONNECTING)&&p.close()},u=()=>{a(),t.localHealthTimer=setInterval(s,bY)},g=()=>{if(t.stopped||t.reconnectTimer!==void 0)return;let p=Nue(t.reconnectAttempt);console.log(`[agent-witch] Reconnecting in ${p}ms\u2026`),t.reconnectTimer=setTimeout(()=>{t.reconnectTimer=void 0,P()},p)},f=p=>{i();let S=()=>{let b=rc(e.layout.installDir),k=Jt();J(p,{type:"agent.heartbeat",payload:{hostname:ul.default.hostname(),macOsUsername:ul.default.userInfo().username,wakeError:t.wakeError,wakePort:k,...e.email!==null?{email:e.email}:{},installBundleVersion:b}},e.layout),t.lastHeartbeatAt=new Date().toISOString()};S(),t.heartbeatTimer=setInterval(S,bY)},y=(p,S)=>{if(typeof p.type!="string")return;if(qT(p)){t.stopped=!0,i(),c(),d(),GT({layout:e.layout}).finally(()=>{bp(),process.exit(0)});return}Zo(e.layout,{direction:"in",type:p.type,summary:"inbound WS frame"}),Xy(e.layout,"in",p);let b=typeof p.requestId=="string"?p.requestId:void 0;if(p.type==="device.auth.attestation"&&te(p.payload)){let k=typeof p.payload.serverPublicKey=="string"?p.payload.serverPublicKey:"",A=typeof p.payload.origin=="string"?p.payload.origin:"",_=typeof p.payload.devicePublicKey=="string"?p.payload.devicePublicKey:"",E=typeof p.payload.challenge=="string"?p.payload.challenge:"",T=typeof p.payload.serverAttestation=="string"?p.payload.serverAttestation:"";if(!mI({serverPublicKey:k,origin:A,devicePublicKey:_,challenge:E,serverAttestation:T})){t.wakeError="Server attestation verification failed",Zo(e.layout,{direction:"local",type:"device.auth.attestation",summary:t.wakeError,action:"auth-failed"}),t.socket!==void 0&&t.socket.close();return}t.wakeError=null}if(p.type==="writer.ensure"&&te(p.payload)){let k=typeof p.payload.writerAgent=="string"?p.payload.writerAgent:"";Zo(e.layout,{direction:"local",type:"writer.ensure",summary:k,action:"ensure-writer"}),HW({layout:e.layout,writerAgent:k,runConfig:e,commands:{claudeCommand:e.claudeCommand,codexCommand:e.codexCommand,cursorCommand:e.cursorCommand,antigravityCommand:e.antigravityCommand}}).then(A=>{J(S,{type:"writer.status",payload:A},e.layout)})}if(p.type==="install.bundle.update"&&te(p.payload)){let k=typeof p.payload.bundleVersion=="string"?p.payload.bundleVersion.trim():"";k.length>0&&n(k,"install.bundle.update")}if(p.type==="system.ack"){Hg(e.layout,{wsUrl:e.wsUrl});let k=te(p.payload)?p.payload:null,A=MW(k);A!==null&&n(A)}if(p.type==="device.restart"){let k=r("cloud-device-restart");o(S,"cloud-device-restart",k,b)}if(p.type==="automations.sync"&&te(p.payload)&&jW(p.payload),p.type==="project.message.history"&&te(p.payload)){FL({payload:p.payload});return}if(p.type==="automations.run"&&te(p.payload)&&NW(p.payload),p.type==="terminal.stream.accepted"&&te(p.payload)){let k=typeof p.payload.runId=="string"?p.payload.runId:"";if(k.length>0){let A=sW(k);for(let _ of A)J(S,{type:"terminal.stream.chunk",payload:{runId:k,chunk:_},requestId:b})}}if(p.type==="agent.agentRun.list"&&J(S,{type:"dashboard.agentRun.list.result",payload:{runs:bW(e.layout)},requestId:b}),p.type==="agent.agentRun.get"&&te(p.payload)){let k=typeof p.payload.runId=="string"?p.payload.runId:"",A=k.length>0?Op(e.layout,k):null;J(S,{type:"dashboard.agentRun.get.result",payload:{run:A},requestId:b})}if(p.type==="command.claude.run"&&te(p.payload)){let k=p.payload.prompt,A=typeof p.payload.writerAgent=="string"&&we(p.payload.writerAgent)?p.payload.writerAgent:"claude-cli",_=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,E=p.payload.sessionContinuation===!0,T=typeof p.payload.sourceRunId=="string"?p.payload.sourceRunId:void 0,C=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:void 0,x=typeof p.payload.projectId=="string"?p.payload.projectId:void 0,W=wc(typeof p.payload.projectFolderPath=="string"?p.payload.projectFolderPath:void 0,Hp,x),j=J_(p.payload.compositionSnapshot),M=typeof p.payload.reportKey=="string"?p.payload.reportKey:void 0;if(typeof k=="string"&&k.trim().length>0){if(console.log(`[agent-witch] Running ${A} task (${E?"continue":"first"})\u2026`),W===null){J(S,{type:"command.claude.result",payload:{exitCode:-1,output:"This project has no folder on this computer yet. Open AgentWitch Local and set the project folder before running tasks.",..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(j!==null){let B=X_(e.layout,j);if(B!==null){J(S,{type:"command.claude.result",payload:{exitCode:-1,output:B,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}if(_!==void 0){let ie=Q_(e.layout,_,j);if(!ie.ok){J(S,{type:"command.claude.result",payload:{exitCode:-1,output:ie.errorMessage,..._!==void 0?{agentRunId:_}:{}},requestId:b});return}t0.set(_,j.entries.some(D=>D.scope==="run"))}}_!==void 0&&C!==void 0&&_Y.set(_,C),_!==void 0&&(kY.set(_,W),x!==void 0&&x.trim().length>0&&XW.set(_,x.trim()),wY.set(_,k.trim()),it({projectFolderPath:W,...x!==void 0&&x.trim().length>0?{projectId:x.trim()}:{}})),Iue(e,A,k.trim(),b,S,_,E,C,T,W,M,x)}}if(p.type==="shell.session.open"&&te(p.payload)){let k=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",A=typeof p.payload.cols=="number"?p.payload.cols:120,_=typeof p.payload.rows=="number"?p.payload.rows:32;k.length>0&&(console.log("[agent-witch] Opening interactive Mac shell\u2026"),cW({shellSessionId:k,cwd:e.workspace,cols:A,rows:_,send:E=>{J(S,E)},requestId:b}))}if(p.type==="shell.session.close"&&te(p.payload)){let k=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"";k.length>0&&al(k,A=>{J(S,A)},b)}if(p.type==="shell.input"&&te(p.payload)){let k=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",A=typeof p.payload.data=="string"?p.payload.data:"";k.length>0&&A.length>0&&iW(k,A)}if(p.type==="shell.resize"&&te(p.payload)){let k=typeof p.payload.shellSessionId=="string"?p.payload.shellSessionId:"",A=typeof p.payload.cols=="number"?p.payload.cols:0,_=typeof p.payload.rows=="number"?p.payload.rows:0;k.length>0&&A>0&&_>0&&aW(k,A,_)}if(p.type==="command.writer.session.end"&&te(p.payload)){let k=p.payload.writerAgent;typeof k=="string"&&we(k)&&(uW(k),BS(e.layout,k))}if(p.type==="command.writer.session.start"&&te(p.payload)){let k=p.payload.writerAgent,A=typeof p.payload.writerSessionId=="string"?p.payload.writerSessionId:"";typeof k=="string"&&we(k)&&A.length>0&&(console.log(`[agent-witch] Starting ${k} session\u2026`),Wue(e,k,A,b,S))}if(p.type==="command.claude.stop"&&te(p.payload)){let k=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"";k.length>0&&(console.log(`[agent-witch] Stopping run ${k}\u2026`),LW(e,r0(S),k,b))}if(p.type==="command.claude.input_respond"&&te(p.payload)){let k=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:"",A=typeof p.payload.response=="string"?p.payload.response.trim():"",_=typeof p.payload.originalPrompt=="string"?p.payload.originalPrompt:"",E=typeof p.payload.partialOutput=="string"?p.payload.partialOutput:"",T=typeof p.payload.question=="string"?p.payload.question:"";k.length>0&&A.length>0&&_.length>0&&(console.log("[agent-witch] Continuing Claude task after user input\u2026"),vW(e,{agentRunId:k,originalPrompt:_,partialOutput:E,question:T,response:A,shellSessionId:_Y.get(k)},b,r0(S)))}if(p.type==="dispatch.approval.required"&&te(p.payload)){let k=typeof p.payload.requesterEmail=="string"?p.payload.requesterEmail:"A teammate",A=typeof p.payload.prompt=="string"?p.payload.prompt.slice(0,120):"agent task";console.log(`[agent-witch] Approval required from ${k}: ${A}`),process.platform==="darwin"&&(0,o0.spawn)("osascript",["-e",`display notification "${A.replace(/"/g,'\\"')}" with title "Agent dispatch approval" subtitle "${k.replace(/"/g,'\\"')}"`],{stdio:"ignore"})}if(p.type==="harness.request"&&te(p.payload)&&(console.log("[agent-witch] Dispatching harness request\u2026"),jue(e,p.payload,b,S)),p.type==="harness.export.request"&&te(p.payload)){let k=typeof p.payload.borrowerUserId=="string"?p.payload.borrowerUserId:"",A=typeof p.payload.targetDeviceId=="string"?p.payload.targetDeviceId:void 0,_=Array.isArray(p.payload.setSlugs)?p.payload.setSlugs.filter(E=>typeof E=="string"):[];k.length>0&&_.length>0&&(async()=>{let{readHarnessExportSets:E}=await Promise.resolve().then(()=>(AY(),PY)),T=E(_,e.email);J(S,{type:"harness.export.result",payload:{success:T.length>0,borrowerUserId:k,...A!==void 0?{targetDeviceId:A}:{},sets:T,errorMessage:T.length>0?void 0:"No readable harness sets were found on this machine."},requestId:b})})()}if(p.type==="harness.manifest.request"&&$p(S,e.layout),p.type==="command.claude.result"&&te(p.payload)){let k=typeof p.payload.agentRunId=="string"?p.payload.agentRunId:void 0,A=typeof p.payload.output=="string"?p.payload.output:"",_=typeof p.payload.exitCode=="number"?p.payload.exitCode:null,E=wc(k!==void 0?kY.get(k):void 0,Hp),T=k!==void 0?XW.get(k):void 0,C=k!==void 0?wY.get(k)??"":"",x=Cw({exitCode:_,output:A});if(x&&E!==null&&zE({layout:e.layout,text:A,source:k??"command.claude.result",projectFolderPath:E,...T!==void 0?{projectId:T}:{}}),_!=null&&_!==0&&A.trim().length>0&&E!==null&&(NE({layout:e.layout,errorText:A,projectFolderPath:E,...T!==void 0?{projectId:T}:{}}),GE({layout:e.layout,text:A,source:k??"command.claude.result.failure",projectFolderPath:E,...T!==void 0?{projectId:T}:{}})),x&&C.trim().length>0&&E!==null&&WC({layout:e.layout,projectFolderPath:E,...T!==void 0?{projectId:T}:{},entry:{id:`${Date.now()}-${k??"run"}`,...k!==void 0?{agentRunId:k}:{},prompt:C,output:A,createdAt:new Date().toISOString()}}),k!==void 0&&E!==null){let j=QW.get(k),M=e0.get(k);j!==void 0&&M!==void 0&&ey(E).then(B=>{let ie=Ww({before:M,after:B});Fb(j,ie),e0.delete(k),QW.delete(k)})}if(x&&T!==void 0&&T.trim().length>0){let j=$(),M=j===null?null:V({wsUrl:j.wsUrl,pairingToken:j.pairingToken});M!==null&&Mw(M,T,{...k!==void 0?{sourceRunId:k}:{},lesson:Ow({prompt:C,output:A})})}k!==void 0&&(Ec(e.layout,k),t0.delete(k),XW.delete(k))}},P=()=>{if(t.stopped)return;c(),d();let p=new Ap(e.wsUrl);t.socket=p,p.on("open",()=>{t.reconnectAttempt=0,t.wsConnected=!0,t.wakeError=null,console.log(`[agent-witch] Connected to ${e.wsUrl}`),e.email!==null&&console.log(`[agent-witch] Profile: ${e.email}`),TW(V({wsUrl:e.wsUrl,pairingToken:e.pairingToken})),RW(e.layout);let S=$e(e.wsUrl)??"http://localhost:3000",b=process.env.AGENT_WITCH_CLAIM_TOKEN?.trim(),k=pI({layout:e.layout,origin:S,...b!==void 0&&b.length>0?{claimToken:b}:{}});J(p,{type:"agent.register",payload:{role:"agent",hostname:ul.default.hostname(),macOsUsername:ul.default.userInfo().username,platform:process.platform==="linux"?"linux":"mac",pairingToken:e.pairingToken,...e.email!==null?{email:e.email}:{},...k}},e.layout),$p(p,e.layout),CW(e,p),f(p)}),p.on("message",S=>{let b=typeof S=="string"?S:S.toString("utf8");try{let k=JSON.parse(b);if(!te(k))return;y(k,p)}catch{console.error("[agent-witch] Failed to parse inbound message.")}}),p.on("close",(S,b)=>{i(),t.socket=void 0,t.wsConnected=!1,T_(e.layout),t.reconnectAttempt+=1;let k=typeof b=="string"?b:b.toString("utf8");ms(e.layout,{kind:"ws_close",message:"WebSocket closed",code:S,reason:k}),console.log("[agent-witch] Disconnected from server."),g()}),p.on("error",S=>{t.wakeError=S.message,ms(e.layout,{kind:"ws_error",message:S.message,stack:S.stack}),console.error(`[agent-witch] Socket error: ${S.message}`)})},h=()=>{t.stopped=!0,i(),a(),c(),d()};return y_(()=>{let p=h_();p!==null&&p.layout.installDir===e.layout.installDir&&p.layout.profileEmail===e.layout.profileEmail&&n(p.remoteBundleVersion,p.trigger);let S=S_();S!==null&&r(S)}),{connect:P,startLocalHealthCheck:u,stop:h,hasMacSocketOpen:()=>t.wsConnected,getStatus:()=>({wsConnected:fc(e.layout,{socketOpen:t.wsConnected}),lastHeartbeatAt:t.lastHeartbeatAt,wakeError:t.wakeError,linkCode:null,publicKeyRaw:pp(e.layout)}),reviveWebSocket:()=>{t.reconnectAttempt=0,P()},reportHarnessManifestIfConnected:()=>{let p=t.socket;return!t.wsConnected||p===void 0?{ok:!1,errorMessage:"Not connected to AgentWitch \u2014 manifest saved locally only."}:($p(p,e.layout),{ok:!0})}}},Hue=async()=>{bt("agent-witch");let e=UI(),t=v();KI().ok||(process.platform==="darwin"?(await Mn(t),process.stdout.write(`[agent-witch] Another AgentWitch process already owns this Mac user lease \u2014 kickstarted LaunchAgent and exiting.
`)):process.stdout.write(`[agent-witch] Another AgentWitch process may already be running \u2014 exiting.
`),process.exit(0)),XI(t);let o=YI({installDir:t});if(o.length>0&&console.log(`[agent-witch] Stopped ${o.length} sibling process(es): ${o.join(", ")}`),process.platform==="darwin"){Br({launchAgentLabel:ye(t),installDir:t}).rewritten&&console.log("[agent-witch] Repaired LaunchAgent plist (AGENT-067).");try{let P=Fl({launchAgentPrefix:ye(t),wakePort:Il(t)});P.length>0&&console.log(`[agent-witch] Synced AGENT_WITCH_WAKE_PORT to wake-port.json in ${String(P.length)} LaunchAgent plist(s).`)}catch(P){console.error(`[agent-witch] Could not sync LaunchAgent wake port: ${P instanceof Error?P.message:String(P)}`)}jl()}let n=await dk(),s=n[0];s!==void 0&&DW(s.layout);for(let y of n){let P=$e(y.wsUrl)??Pt;oc(y.layout.installDir,P)}let i=n.map(y=>Due(y)),a=i[0];a===void 0&&(process.stdout.write(`[agent-witch] No profile configs found \u2014 exiting.
`),bp(),process.exit(0));let c=()=>{n.forEach((y,P)=>{let h=i[P];if(h===void 0)return;let p=Ce(y.layout);E_(p,{socketOpen:h.hasMacSocketOpen(),staleAfterMs:12e4})&&h.reviveWebSocket()})},d=()=>{},u=()=>{if(e.skipInProcessLive)return;let y=n[0]?.layout;y!==void 0&&(Kt(y)||md(y.installDir))},g=await ZI({skipInProcessBridge:e.skipInProcessBridge,reconnectWebSockets:c,ensureLiveAppReachable:u,onLostMachineLease:()=>{console.log("[agent-witch] Lost machine lease to another process \u2014 shutting down."),d()}});e.skipInProcessLive?console.log("[agent-witch] Skipping in-process AWL (AGENT_WITCH_EXTERNAL_LIVE)."):up({layout:n[0].layout,controllers:{getStatus:a.getStatus,reviveWebSocket:c,reportHarnessManifestIfConnected:a.reportHarnessManifestIfConnected}}),e.skipInProcessBridge&&console.log("[agent-witch] Skipping in-process AWB wake server (AGENT_WITCH_EXTERNAL_BRIDGE).");for(let y of i)y.startLocalHealthCheck(),y.connect();console.log(`[agent-witch] Host mode ${e.mode}; bridging ${i.length} account profile(s) in one process.`);let f=Gr(()=>{console.log("[agent-witch] Active macOS console user changed \u2014 shutting down."),Nl(),d()});d=()=>{f(),g.stop(),bp(),console.log("[agent-witch] Shutting down.");for(let y of i)y.stop();process.exit(0)},process.on("SIGINT",()=>{d()}),process.on("SIGTERM",()=>{d()})},zp=Hue});var n0=l(()=>{"use strict";TY()});var EY={};St(EY,{startAgentWitchClient:()=>zp});var RY=l(()=>{"use strict";n0();n0();Nn();$b();fg();if(!_t()&&Dn(__agentWitchImportMetaUrl)){let e=process.argv.indexOf("report");e>=0&&process.exit(gg(process.argv.slice(e))),zp()}});Nb();$b();Nn();fg();var XM="20.x",ZM="Install Node.js from https://nodejs.org/en/download or, on macOS with Homebrew: brew install node@22";var LQ=e=>[`Node.js ${XM} or newer is required (found ${e}).`,ZM].join(" "),QM=()=>{let e=Number.parseInt(process.version.slice(1).split(".")[0]??"",10);(Number.isNaN(e)||e<20)&&(process.stderr.write(`[agent-witch] ${LQ(process.version)}
`),process.exit(1))};kg();var Fue=async()=>{bt("agent-witch-self-update");let{runAgentWitchSelfUpdate:e}=await Promise.resolve().then(()=>(k_(),__)),t=await e();if(t.updated){process.stdout.write(`[agent-witch-self-update] ${t.message}
`);return}if(t.ok){process.stdout.write(`[agent-witch-self-update] ${t.message} (bundle ${t.remoteBundleVersion??"unknown"})
`);return}process.stderr.write(`[agent-witch-self-update] ${t.message}
`),process.exit(1)},$ue=async()=>{let{wakeAgentWitchLaunchAgents:e}=await Promise.resolve().then(()=>(lz(),az)),t=await e();if(t.ok){process.stdout.write(`AgentWitch is waking up.
`);return}let r=t.kicked.filter(o=>!o.ok).map(o=>o.errorMessage??o.launchAgentLabel).join("; ");process.stderr.write(`Could not wake AgentWitch. ${r}
`),process.exit(1)},zue=async e=>{try{if(e===Pg){let{resolveAgentWitchLocalLayout:t}=await Promise.resolve().then(()=>(G(),kb)),{runCheckContextHookCli:r}=await Promise.resolve().then(()=>(id(),n$));await r({layout:t()})}else process.stderr.write(`[agent-witch] ${Ai}: unknown hook ${e??"(none)"}
`)}catch(t){let r=t instanceof Error?t.message:String(t);process.stderr.write(`[agent-witch] ${Ai}: ${r}
`)}await new Promise(t=>{process.stdout.write("",()=>t())}),process.exit(0)},Uue=async()=>{if(!Dn(_t()?void 0:__agentWitchImportMetaUrl))return;process.argv[2]===Ai&&await zue(process.argv[3]),QM();let e=process.argv.indexOf("report");e>=0&&process.exit(gg(process.argv.slice(e)));let t=process.argv[2];if(t==="self-update"){await Fue();return}if(t==="wake"){await $ue();return}if(t==="bridge"){let{runAgentWitchBridgeCli:o}=await Promise.resolve().then(()=>(cU(),lU));await o();return}if(t==="local-app"){let{runAgentWitchExternalLiveCli:o}=await Promise.resolve().then(()=>(t8(),e8));o();return}if(t==="mcp"){let{resolveAgentWitchLocalLayout:o}=await Promise.resolve().then(()=>(G(),kb)),{runAwlMcpStdio:n}=await Promise.resolve().then(()=>(kC(),Aq));await n({layout:o()});return}let{startAgentWitchClient:r}=await Promise.resolve().then(()=>(RY(),EY));await r()};Uue();
